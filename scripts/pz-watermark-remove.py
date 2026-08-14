#!/usr/bin/env python3
"""Project Zomboid Build 42 image: watermark removal + rename to versioned JPG."""
from PIL import Image, ImageDraw, ImageFilter
import os
import sys

DATE = "20260811"
WORKSPACE = "/Users/Zhuanz/WorkBuddy/2026-07-22-16-15-01/gaming-hotwords/website"
IMG_DIR = os.path.join(WORKSPACE, "public/images/games")

SRC = f"{IMG_DIR}/Project_Zomboid_post_apocalypt_2026-08-11T08-33-19.png"
DST = f"{IMG_DIR}/project-zomboid-ss2-v{DATE}.jpg"


def remove_watermark(src_path: str, dst_path: str) -> None:
    """Inpaint the bottom-right watermark area with cloned texture + feathered mask."""
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    # Watermark is roughly 130x45 at bottom-right (Hunyuan default)
    wm_w, wm_h = 130, 45
    pad_bottom = 4
    left = w - wm_w
    top = h - wm_h - pad_bottom

    # Source texture: a 130x45 block from the LEFT of the watermark (no overlap)
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
    print("== Project Zomboid Build 42 watermark removal ==")
    if not os.path.exists(SRC):
        print(f"  ! missing source: {SRC}")
        return 1
    if os.path.exists(DST):
        os.remove(DST)
    print(f"[ss2] {os.path.basename(SRC)}")
    remove_watermark(SRC, DST)

    # Remove the original PNG to keep public/ clean
    if os.path.exists(SRC):
        os.remove(SRC)
        print(f"  cleanup: {os.path.basename(SRC)}")

    print("== done ==")
    return 0


if __name__ == "__main__":
    sys.exit(main())
