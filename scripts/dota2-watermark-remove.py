#!/usr/bin/env python3
"""Dota 2 watermark removal + rename to versioned JPG filenames."""
from PIL import Image, ImageDraw, ImageFilter
import os
import sys
from datetime import datetime

DATE = "20260811"
WORKSPACE = "/Users/Zhuanz/WorkBuddy/2026-07-22-16-15-01/gaming-hotwords/website"
IMG_DIR = os.path.join(WORKSPACE, "public/images/games")

# Source files (output of ImageGen)
SOURCES = {
    "header": f"{IMG_DIR}/Dota_2_esports_arena_atmospher_2026-08-11T06-57-19.png",
    "ss1":    f"{IMG_DIR}/Dota_2_hero_close_up__a_legend_2026-08-11T06-57-19.png",
}
# Target files
TARGETS = {
    "header": f"{IMG_DIR}/dota-2-header-v{DATE}.jpg",
    "ss1":    f"{IMG_DIR}/dota-2-ss1-v{DATE}.jpg",
}


def remove_watermark(src_path: str, dst_path: str) -> None:
    """Inpaint the bottom-right watermark area with cloned texture + feathered mask."""
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    # Watermark is roughly 130x45 at bottom-right (Hunyuan default)
    wm_w, wm_h = 130, 45
    pad_bottom = 4
    left = w - wm_w
    top = h - wm_h - pad_bottom

    # Source texture: a 130x45 block from the LEFT of the watermark (no overlap),
    # at the same vertical position. This works because the watermark is in
    # the bottom-right corner and the original image has continuous texture
    # across the bottom strip in most cases.
    src_left = left - wm_w
    src_top = top
    src_right = left
    src_bottom = h - pad_bottom
    if src_left < 0:
        # Fallback: copy from above the watermark
        src_left, src_top, src_right, src_bottom = left, top - wm_h, w, top

    texture = img.crop((src_left, src_top, src_right, src_bottom))
    texture = texture.filter(ImageFilter.GaussianBlur(radius=2.5))

    # Build a feathered alpha mask (left edge fades in over 20px)
    mask = Image.new("L", (wm_w, wm_h), 255)
    draw = ImageDraw.Draw(mask)
    feather = 20
    for x in range(feather):
        alpha = int(255 * ((x + 1) / feather))
        draw.line([(x, 0), (x, wm_h)], fill=alpha, width=1)

    # Paste texture over watermark
    img.paste(texture, (left, top), mask)

    # Convert RGBA -> RGB and save as JPG
    rgb_img = Image.new("RGB", img.size, (255, 255, 255))
    rgb_img.paste(img, mask=img.split()[3])
    rgb_img.save(dst_path, "JPEG", quality=80, optimize=True, progressive=True)
    print(f"  -> {os.path.basename(dst_path)} ({os.path.getsize(dst_path)} bytes)")


def main() -> int:
    print("== Dota 2 watermark removal ==")
    for name, src in SOURCES.items():
        if not os.path.exists(src):
            print(f"  ! missing source: {src}")
            return 1
        # Clean up any old versioned file with the same name
        dst = TARGETS[name]
        if os.path.exists(dst):
            os.remove(dst)
        print(f"[{name}] {os.path.basename(src)}")
        remove_watermark(src, dst)

    # Remove the original PNGs to keep public/ clean
    for src in SOURCES.values():
        if os.path.exists(src):
            os.remove(src)
            print(f"  cleanup: {os.path.basename(src)}")

    print("== done ==")
    return 0


if __name__ == "__main__":
    sys.exit(main())
