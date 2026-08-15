#!/usr/bin/env python3
"""Generate Control Resonant brand favicon and icon files."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = "/Users/Zhuanz/WorkBuddy/ControlResonant/website/public"
os.makedirs(BASE_DIR, exist_ok=True)

BG_COLOR = (10, 10, 18)          # #0a0a12 brand bg
ACCENT_PURPLE = (239, 68, 68)   # #8b5cf6
ACCENT_BLUE = (249, 115, 22)     # #3b82f6
TEXT_COLOR = (240, 240, 245)     # #f0f0f5 text-primary

def create_icon(size, is_apple=False):
    """Create a brand icon at given size."""
    img = Image.new('RGBA', (size, size), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img)
    
    # Draw a subtle gradient glow ring (outer)
    ring_padding = int(size * 0.06)
    ring_box = [ring_padding, ring_padding, size - ring_padding, size - ring_padding]
    
    # Create gradient ring using overlay
    ring_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ring_draw = ImageDraw.Draw(ring_layer)
    ring_draw.ellipse(ring_box, outline=ACCENT_PURPLE + (80,), width=max(2, size // 64))
    
    # Second ring (inner, blue)
    inner_padding = int(size * 0.10)
    inner_box = [inner_padding, inner_padding, size - inner_padding, size - inner_padding]
    ring_draw.ellipse(inner_box, outline=ACCENT_BLUE + (60,), width=max(1, size // 96))
    
    img = Image.alpha_composite(img, ring_layer)
    draw = ImageDraw.Draw(img)
    
    # Draw "G" letter centered
    font_size = int(size * 0.55)
    try:
        # Try system fonts, fall back to default
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()
    
    text = "C"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (size - text_w) // 2
    y = (size - text_h) // 2 - int(size * 0.03)  # slight optical adjustment
    
    # Shadow for depth
    shadow_offset = max(1, size // 64)
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill=(0, 0, 0, 80))
    # Main text
    draw.text((x, y), text, font=font, fill=TEXT_COLOR + (255,))
    
    # Apple icon gets rounded corners mask
    if is_apple:
        mask = Image.new('L', (size, size), 0)
        mask_draw = ImageDraw.Draw(mask)
        radius = int(size * 0.22)
        mask_draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=255)
        img.putalpha(mask)
    
    return img

def create_favicon_ico():
    """Create multi-size favicon.ico."""
    sizes = [(16, 16), (32, 32), (48, 48)]
    images = []
    for w, h in sizes:
        img = create_icon(w)
        # Convert to RGB for ICO
        rgb_img = Image.new('RGB', (w, h), BG_COLOR)
        rgb_img.paste(img, mask=img.split()[3])
        images.append(rgb_img)
    
    ico_path = os.path.join(BASE_DIR, "favicon.ico")
    images[0].save(ico_path, format='ICO', sizes=sizes, append_images=images[1:])
    print(f"Created: {ico_path}")

def main():
    # icon.png (512x512) — used by Organization schema and browsers
    icon = create_icon(512)
    icon_path = os.path.join(BASE_DIR, "icon.png")
    icon.save(icon_path, 'PNG')
    print(f"Created: {icon_path} ({icon.size[0]}x{icon.size[1]})")
    
    # apple-icon.png (180x180)
    apple = create_icon(180, is_apple=True)
    apple_path = os.path.join(BASE_DIR, "apple-icon.png")
    apple.save(apple_path, 'PNG')
    print(f"Created: {apple_path} ({apple.size[0]}x{apple.size[1]})")
    
    # favicon.ico (multi-size)
    create_favicon_ico()
    
    print("\nAll brand icons generated successfully.")

if __name__ == "__main__":
    main()
