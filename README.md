# Control Resonant Guide

An unofficial, fan-made guide hub for **Control Resonant**, Remedy Entertainment's paranatural action RPG sequel.

Live site: **https://www.controlresonantguide.com**

## Stack

- Next.js 14.2 + TypeScript
- Tailwind CSS
- MDX content pipeline (`content/games/<game>/<slug>/page.mdx`)
- Vercel (Git-linked automatic deployments)

## Content types

- Deep guides with FAQ schema
- Hot-take / news-style articles
- Single-game wiki hub layout inspired by fan wiki sites

## Local development

```bash
cd website
npm install
npm run dev
# Site runs on http://localhost:3457
```

## Deployment

Pushes to `main` are automatically deployed to Vercel and aliased to `https://www.controlresonantguide.com`.
