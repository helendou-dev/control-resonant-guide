#!/usr/bin/env python3
"""Generate GameMetaHub favicon set: favicon.ico, icon.png, apple-icon.png"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

APP_DIR = os.path.join(os.path.dirname(__file__), '..', 'app')
os.makedirs(APP_DIR, exist_ok=True)

# Colors matching the footer brand gradient
COLOR_START = (239, 68, 68)   # #8b5cf6 violet-500
COLOR_END = (99, 102, 241)     # #6366f1 indigo-500
WHITE = (255, 255, 255)
BG_DARK = (15, 23, 42)         # #0f172a slate-900


def make_gradient(size, start, end, corner_radius_ratio=0.22):
    """Create a rounded-rectangle gradient image."""
    w, h = size
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw rounded rect as mask
    r = int(min(w, h) * corner_radius_ratio)
    mask = Image.new('L', (w, h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, w - 1, h - 1], radius=r, fill=255)

    # Build gradient pixels
    pixels = []
    for y in range(h):
        t = y / (h - 1) if h > 1 else 0
        r_val = int(start[0] + (end[0] - start[0]) * t)
        g_val = int(start[1] + (end[1] - start[1]) * t)
        b_val = int(start[2] + (end[2] - start[2]) * t)
        pixels.extend([r_val, g_val, b_val, 255] * w)

    grad = Image.frombytes('RGBA', (w, h), bytes(pixels))
    grad.putalpha(mask)
    return grad


def draw_g_letter(draw, size, font_path=None):
    """Draw a bold white 'G' centered in the image."""
    w, h = size
    # Try to load a bold font, fall back to default
    font = None
    if font_path and os.path.exists(font_path):
        for pt in range(int(h * 0.75), int(h * 0.4), -2):
            try:
                font = ImageFont.truetype(font_path, pt)
                bbox = draw.textbbox((0, 0), "G", font=font)
                tw = bbox[2] - bbox[0]
                th = bbox[3] - bbox[1]
                if tw <= w * 0.65 and th <= h * 0.75:
                    break
            except Exception:
                continue

    if font is None:
        # Use default font (bitmap, small) — only for emergency
        font = ImageFont.load_default()
        bbox = draw.textbbox((0, 0), "G", font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
    else:
        bbox = draw.textbbox((0, 0), "G", font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]

    x = (w - tw) // 2
    y = (h - th) // 2 - int(h * 0.02)  # slight optical lift
    draw.text((x, y), "G", font=font, fill=WHITE)


def generate_icon(size, font_path=None):
    """Generate a single icon image at the given size."""
    img = Image.new('RGBA', size, BG_DARK)

    # Draw gradient background with slight padding for border effect
    pad = max(1, size[0] // 32)
    bg = make_gradient((size[0] - pad * 2, size[1] - pad * 2), COLOR_START, COLOR_END)
    img.paste(bg, (pad, pad), bg)

    # Draw G letter
    draw = ImageDraw.Draw(img)
    draw_g_letter(draw, (size[0] - pad * 2, size[1] - pad * 2), font_path)

    return img


def main():
    # Find a suitable bold font
    font_candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/ArialHB.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Avenir.ttc",
        "/System/Library/Fonts/Avenir Next.ttc",
        "/System/Library/Fonts/Georgia.ttf",
        "/System/Library/Fonts/Courier.ttc",
    ]
    font_path = None
    for f in font_candidates:
        if os.path.exists(f):
            font_path = f
            break

    print(f"Using font: {font_path}")

    # 1. Generate high-res master, then scale down for crispness
    master_size = 512
    master = generate_icon((master_size, master_size), font_path)

    # Save icon.png (192x192) — PWA / browser icon
    icon_192 = master.resize((192, 192), Image.LANCZOS)
    icon_192.save(os.path.join(APP_DIR, "icon.png"), "PNG")
    print("Saved app/icon.png (192x192)")

    # Save apple-icon.png (180x180) — Apple touch icon
    apple_180 = master.resize((180, 180), Image.LANCZOS)
    apple_180.save(os.path.join(APP_DIR, "apple-icon.png"), "PNG")
    print("Saved app/apple-icon.png (180x180)")

    # Save favicon.ico with multiple sizes
    sizes = [(48, 48), (32, 32), (16, 16)]
    ico_images = []
    for s in sizes:
        ico_img = master.resize(s, Image.LANCZOS)
        # Convert to RGBA then to P mode with transparency for ICO
        ico_images.append(ico_img)

    # PIL ICO save: first image is the default, list them largest-first
    ico_images[0].save(
        os.path.join(APP_DIR, "favicon.ico"),
        format="ICO",
        sizes=[(48, 48), (32, 32), (16, 16)],
        append_images=ico_images[1:]
    )
    print("Saved app/favicon.ico (48x48, 32x32, 16x16)")

    # Also generate a 32x32 PNG for older browsers that prefer PNG favicon
    icon_32 = master.resize((32, 32), Image.LANCZOS)
    icon_32.save(os.path.join(APP_DIR, "icon32.png"), "PNG")
    print("Saved app/icon32.png (32x32)")

    print("\nDone! All favicon files generated.")


if __name__ == "__main__":
    main()
