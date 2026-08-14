"""Process 4 generated game images: watermark removal + rename + crop + convert to JPG"""
import os, sys
from PIL import Image, ImageFilter
import numpy as np

OUTPUT_DIR = "/Users/Zhuanz/WorkBuddy/2026-07-22-16-15-01/gaming-hotwords/website/public/images/games"
SRC_DIR = OUTPUT_DIR

# Mapping: generated filename -> target filename, crop dimensions
MAPPINGS = [
    ("Marvel_Tokon_Fighting_Souls__a_2026-08-07T02-20-30.png", "marvel-tokon-header-v20260807.jpg", True),  # header -> 1408x704
    ("Marvel_Tokon_Fighting_Souls__C_2026-08-07T02-20-30.png", "marvel-tokon-ss1-v20260807.jpg", False),     # ss1 -> keep size
    ("Apex_Legends_Bloodhound_charac_2026-08-07T02-20-30.png", "apex-legends-header-v20260807.jpg", True),  # header -> 1408x704
    ("Apex_Legends_diverse_squad_fea_2026-08-07T02-20-40.png", "apex-legends-ss1-v20260807.jpg", False),    # ss1 -> keep size
]

def remove_watermark(img):
    """Texture clone watermark removal - clone from area above watermark region"""
    w, h = img.size
    # Watermark is typically in bottom-right ~130x45px area
    wm_w, wm_h = 130, 45
    wm_left = w - wm_w
    wm_top = h - wm_h
    
    # Clone texture from above the watermark
    clone_region = img.crop((wm_left, wm_top - wm_h, wm_left + wm_w, wm_top))
    
    # Apply subtle blur to avoid obvious repetition
    clone_region = clone_region.filter(ImageFilter.GaussianBlur(radius=2.5))
    
    # Create feathered mask
    mask = Image.new('L', (wm_w, wm_h), 255)
    pixels = mask.load()
    feather = 20
    for y in range(wm_h):
        for x in range(wm_w):
            dist_top = min(y, feather) / feather
            dist_left = min(x, feather) / feather
            dist_right = min(wm_w - 1 - x, feather) / feather
            dist_bottom = min(wm_h - 1 - y, feather) / feather
            alpha = min(dist_top, dist_left, dist_right, dist_bottom)
            pixels[x, y] = int(alpha * 255)
    
    img.paste(clone_region, (wm_left, wm_top), mask)
    return img

for src_name, target_name, is_header in MAPPINGS:
    src_path = os.path.join(SRC_DIR, src_name)
    target_path = os.path.join(OUTPUT_DIR, target_name)
    
    print(f"Processing: {src_name} -> {target_name}")
    
    img = Image.open(src_path)
    print(f"  Original: {img.size}, mode={img.mode}")
    
    # Remove watermark
    img = remove_watermark(img)
    
    if is_header:
        # Crop to 1408x704 (16:10 aspect ratio suitable for headers)
        w, h = img.size
        target_w, target_h = 1408, 704
        target_ratio = target_w / target_h
        
        # Calculate crop dimensions
        if w / h > target_ratio:
            # Image is wider - crop sides
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        else:
            # Image is taller - crop top/bottom
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        
        img = img.resize((target_w, target_h), Image.LANCZOS)
        print(f"  Cropped to: {img.size}")
    
    # Convert RGBA to RGB if needed
    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Save as JPG
    img.save(target_path, 'JPEG', quality=80, progressive=True)
    size_kb = os.path.getsize(target_path) / 1024
    print(f"  Saved: {target_path} ({size_kb:.0f} KB)")
    
    # Clean up PNG
    os.remove(src_path)
    print(f"  Removed source PNG")

print("\nDone! All 4 images processed.")
