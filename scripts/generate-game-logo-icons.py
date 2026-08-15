#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = '/tmp/control-logo/favicon-official.png'
OUT_DIR = '/Users/Zhuanz/WorkBuddy/ControlResonant/website/app'
PUBLIC_DIR = '/Users/Zhuanz/WorkBuddy/ControlResonant/website/public'
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

src = Image.open(SRC).convert('RGBA')

# 1. favicon.ico: black triangle on transparent (official look)
src.resize((256, 256), Image.LANCZOS).save(os.path.join(OUT_DIR, 'favicon.ico'), format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])

# Helper: make white triangle on dark background
BG_DARK = (10, 10, 14, 255)

def make_icon(size: int, padding: float = 0.12):
    # Resize source to fit within size - padding
    white = src.copy()
    # Invert to white: any non-transparent pixel -> white
    pixels = white.load()
    for y in range(white.height):
        for x in range(white.width):
            r, g, b, a = pixels[x, y]
            if a > 10:
                pixels[x, y] = (255, 255, 255, a)
    
    # Compute scaled size preserving aspect
    avail = int(size * (1 - padding * 2))
    white.thumbnail((avail, avail), Image.LANCZOS)
    
    bg = Image.new('RGBA', (size, size), BG_DARK)
    # Center paste
    x = (size - white.width) // 2
    y = (size - white.height) // 2
    bg.paste(white, (x, y), white)
    return bg

# 2. app/icon.png (180x180 typical)
make_icon(180).save(os.path.join(OUT_DIR, 'icon.png'))

# 3. app/apple-icon.png (180x180)
make_icon(180).save(os.path.join(OUT_DIR, 'apple-icon.png'))

# 4. app/icon32.png
make_icon(32).save(os.path.join(OUT_DIR, 'icon32.png'))

# 5. public/favicon.png (512 for manifest/PWA)
make_icon(512).save(os.path.join(PUBLIC_DIR, 'favicon.png'))

print('Generated favicon.ico, icon.png, apple-icon.png, icon32.png, public/favicon.png')
