#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = '/tmp/control-logo/favicon-official.png'
OUT_DIR = '/Users/Zhuanz/WorkBuddy/ControlResonant/website/app'
PUBLIC_DIR = '/Users/Zhuanz/WorkBuddy/ControlResonant/website/public'
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

src = Image.open(SRC).convert('RGBA')

# Helper: make white triangle on dark background (Control Brutalist style)
BG_DARK = (10, 10, 14, 255)

def make_icon(size: int, padding: float = 0.12):
    white = src.copy()
    # Invert to white: any non-transparent pixel -> white
    pixels = white.load()
    for y in range(white.height):
        for x in range(white.width):
            r, g, b, a = pixels[x, y]
            if a > 10:
                pixels[x, y] = (255, 255, 255, a)
    
    avail = int(size * (1 - padding * 2))
    white.thumbnail((avail, avail), Image.LANCZOS)
    
    bg = Image.new('RGBA', (size, size), BG_DARK)
    x = (size - white.width) // 2
    y = (size - white.height) // 2
    bg.paste(white, (x, y), white)
    return bg

# 1. favicon.ico: white triangle on dark background (visible in Google search results)
make_icon(256, padding=0.08).save(os.path.join(OUT_DIR, 'favicon.ico'), format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])

# 2. app/icon.png (180x180)
make_icon(180).save(os.path.join(OUT_DIR, 'icon.png'))

# 3. app/apple-icon.png (180x180)
make_icon(180).save(os.path.join(OUT_DIR, 'apple-icon.png'))

# 4. app/icon32.png
make_icon(32).save(os.path.join(OUT_DIR, 'icon32.png'))

# 5. public/favicon.png (512 for manifest/PWA + Google favicon service)
make_icon(512).save(os.path.join(PUBLIC_DIR, 'favicon.png'))

# 6. public/favicon-48.png (Google recommended 48x48 for search results)
make_icon(48, padding=0.06).save(os.path.join(PUBLIC_DIR, 'favicon-48.png'))

print('Generated favicon.ico, icon.png, apple-icon.png, icon32.png, public/favicon.png, public/favicon-48.png')
