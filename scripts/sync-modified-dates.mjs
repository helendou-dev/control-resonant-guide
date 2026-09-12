#!/usr/bin/env node
/**
 * sync-modified-dates.mjs
 * ---------------------------------------------------------------------------
 * Writes each page's true last-modified date (derived from git) into its
 * frontmatter `modifiedDate` field.
 *
 * WHY THIS EXISTS
 *   lib/content.ts falls back to `publishDate` whenever `modifiedDate` is
 *   absent:
 *       sitemap <lastmod>          <- modifiedDate || publishDate || date
 *       Article schema dateModified <- modifiedDate || publishDate
 *   So without this field, every content update after publication is invisible
 *   to Google — the sitemap keeps claiming the original publish date forever.
 *
 * HOW THE DATE IS DERIVED
 *   base  = date of the last commit that touched the file
 *   if the working tree has uncommitted changes for the file -> use the file's
 *   mtime instead (that is the edit you have not committed yet)
 *   result = whichever is later
 *
 * A `modifiedDate` is only written when it differs from `publishDate`; pages
 * that were never touched after publication are left alone so the diff stays
 * clean. The script is idempotent — running it twice changes nothing.
 *
 * !!! DO NOT WIRE THIS INTO `prebuild` !!!
 *   Vercel clones shallowly, so `git log` returns the clone date for every
 *   file and all dates collapse to build day. Run it locally, then commit.
 *
 * Usage:
 *   node scripts/sync-modified-dates.mjs            # apply
 *   node scripts/sync-modified-dates.mjs --dry-run  # preview only
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const DRY_RUN = process.argv.includes('--dry-run');

const GRAY = '\x1b[90m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function collectPageFiles(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...collectPageFiles(full));
    else if (entry.name === 'page.mdx') found.push(full);
  }
  return found.sort();
}

const git = (args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

const toISODate = (d) => new Date(d).toISOString().slice(0, 10);

function lastCommitDate(rel) {
  try {
    return git(['log', '-1', '--format=%ad', '--date=short', '--', rel]) || null;
  } catch {
    return null;
  }
}

const stripModifiedDate = (src) => src.replace(/^modifiedDate:.*\r?\n?/m, '');
const normalize = (src) => stripModifiedDate(src).replace(/\r\n/g, '\n');

/**
 * True only when the working tree differs from HEAD in some way OTHER than the
 * `modifiedDate` line itself. This is what keeps the script idempotent: after a
 * run the files are technically "dirty", but that dirtiness is just our own
 * field — without this check every subsequent run would see the mtime and
 * collapse every date to today.
 */
function hasRealContentEdits(rel) {
  try {
    const committed = execFileSync('git', ['show', `HEAD:${rel}`], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const current = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    return normalize(current) !== normalize(committed);
  } catch {
    return true; // untracked file or no HEAD yet — treat as freshly written
  }
}

function resolveLastModified(file) {
  const rel = path.relative(ROOT, file);
  const committed = lastCommitDate(rel);
  let working = null;
  if (hasRealContentEdits(rel)) {
    const stat = fs.statSync(file);
    working = toISODate(Math.min(stat.mtime.getTime(), Date.now()));
  }
  const candidates = [committed, working].filter(Boolean).sort();
  return candidates.length ? candidates[candidates.length - 1] : null;
}

/** Split "---\n<fm>\n---\n<body>" into its three parts. */
function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  return {
    fmBlock: match[0],
    fm: match[1],
    body: raw.slice(match[0].length),
  };
}

const readField = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!m) return null;
  return m[1].trim().replace(/^['"]|['"]$/g, '');
};

function upsertModifiedDate(fm, value) {
  const line = `modifiedDate: '${value}'`;
  if (/^modifiedDate:/m.test(fm)) return fm.replace(/^modifiedDate:.*$/m, line);
  // Insert right after publishDate (or date) to keep the date cluster together.
  if (/^publishDate:/m.test(fm)) return fm.replace(/^(publishDate:.*)$/m, `$1\n${line}`);
  if (/^date:/m.test(fm)) return fm.replace(/^(date:.*)$/m, `$1\n${line}`);
  return `${fm}\n${line}`;
}

function removeModifiedDate(fm) {
  return fm.replace(/^modifiedDate:.*\r?\n?/m, '');
}

const rows = [];
let changed = 0;

for (const file of collectPageFiles(CONTENT_DIR)) {
  const raw = fs.readFileSync(file, 'utf8');
  const parts = splitFrontmatter(raw);
  if (!parts) continue;

  const slug = path.basename(path.dirname(file));
  const publish = readField(parts.fm, 'publishDate') || readField(parts.fm, 'date');
  const existing = readField(parts.fm, 'modifiedDate');
  const lastModified = resolveLastModified(file);

  if (!lastModified) {
    rows.push({ slug, status: 'skip (no git history)', from: existing || publish || '-', to: '-' });
    continue;
  }

  // Nothing to record if the page was never touched after publication.
  const shouldWrite = publish ? lastModified > publish : true;
  const nextFm = shouldWrite ? upsertModifiedDate(parts.fm, lastModified) : removeModifiedDate(parts.fm);

  if (nextFm === parts.fm) {
    rows.push({ slug, status: 'ok', from: existing || publish || '-', to: existing || '-' });
    continue;
  }

  if (!DRY_RUN) {
    fs.writeFileSync(file, parts.fmBlock.replace(parts.fm, nextFm) + parts.body, 'utf8');
  }
  changed += 1;
  rows.push({
    slug,
    status: shouldWrite ? (existing ? 'updated' : 'added') : 'cleared',
    from: existing || publish || '-',
    to: lastModified,
  });
}

const pad = Math.max(...rows.map((r) => r.slug.length), 4);
console.log(`\n${CYAN}sync-modified-dates${DRY_RUN ? ' (dry run)' : ''}${RESET} — ${rows.length} pages scanned\n`);
for (const r of rows) {
  const tone = r.status === 'ok' ? GRAY : r.status === 'skip (no git history)' ? YELLOW : GREEN;
  console.log(`  ${tone}${r.slug.padEnd(pad)}${RESET}  ${r.from.padEnd(12)} → ${r.to.padEnd(12)} ${GRAY}${r.status}${RESET}`);
}
console.log(`\n${changed === 0 ? GRAY + 'No changes needed.' + RESET : GREEN + `${changed} file(s) ${DRY_RUN ? 'would be' : ''} written.` + RESET}\n`);
if (!DRY_RUN && changed > 0) {
  console.log(`${GRAY}Next: review the diff, then commit. Do NOT run this on a shallow clone.${RESET}\n`);
}
