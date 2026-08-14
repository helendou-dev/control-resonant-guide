from PIL import Image, ImageDraw, ImageFilter
import os

# Ensure output dir exists
out_dir = '/Users/Zhuanz/WorkBuddy/2026-07-22-16-15-01/gaming-hotwords/website/public/images/games'
os.makedirs(out_dir, exist_ok=True)

def remove_watermark(img):
    """Remove Hunyuan AI watermark from bottom-right corner using texture clone + blur + feather."""
    w, h = img.size
    wm_w, wm_h = 130, 45
    pad_bottom = 4
    left = w - wm_w
    top = h - wm_h - pad_bottom

    # Prefer copying texture from left of watermark
    src_left = left - wm_w
    src_top = top
    src_right = left
    src_bottom = h - pad_bottom
    if src_left < 0:
        src_left, src_top, src_right, src_bottom = left, top - wm_h, w, top

    texture = img.crop((src_left, src_top, src_right, src_bottom))
    texture = texture.filter(ImageFilter.GaussianBlur(radius=2.5))

    mask = Image.new('L', (wm_w, wm_h), 255)
    draw = ImageDraw.Draw(mask)
    feather = 20
    for x in range(feather):
        alpha = int(255 * ((x + 1) / feather))
        draw.line([(x, 0), (x, wm_h)], fill=alpha, width=1)

    img.paste(texture, (left, top), mask)
    return img

def process_image(src_path, out_name):
    # Open and convert
    img = Image.open(src_path).convert('RGBA')

    # Center crop to 1408x704
    target_w, target_h = 1408, 704
    w, h = img.size
    left = (w - target_w) // 2
    top = (h - target_h) // 2
    img = img.crop((left, top, left + target_w, top + target_h))

    # Remove watermark
    img = remove_watermark(img)

    # Convert to RGB and save as JPEG
    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
    rgb_img.paste(img, mask=img.split()[3])

    out_path = os.path.join(out_dir, out_name)
    rgb_img.save(out_path, 'JPEG', quality=80, optimize=True, progressive=True)
    print(f'Saved: {out_path} ({os.path.getsize(out_path)} bytes)')

# Process header
process_image(
    '/Users/Zhuanz/WorkBuddy/2026-07-22-16-15-01/gaming-hotwords/website/generated-images/GRAIN_ROT_scorched_underground_2026-08-10T06-59-05.png',
    'grain-rot-header-v20260810.jpg'
)

# Process ss1
process_image(
    '/Users/Zhuanz/WorkBuddy/2026-07-22-16-15-01/gaming-hotwords/website/generated-images/GRAIN_ROT_close_up_of_fragile__2026-08-10T06-58-27.png',
    'grain-rot-ss1-v20260810.jpg'
)
