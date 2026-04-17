from PIL import Image, ImageDraw

def crop_circle(infile, outfile):
    try:
        img = Image.open(infile).convert("RGBA")
        
        # Center crop to square exactly by edge
        size = min(img.size)
        left = (img.size[0] - size) / 2
        top = (img.size[1] - size) / 2
        right = (img.size[0] + size) / 2
        bottom = (img.size[1] + size) / 2
        img = img.crop((left, top, right, bottom))
        
        # High quality smooth edge masking
        mask_size = size * 3
        mask = Image.new('L', (mask_size, mask_size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, mask_size, mask_size), fill=255)
        mask = mask.resize((size, size), Image.Resampling.LANCZOS)
        
        out = img.copy()
        out.putalpha(mask)
        out.save(outfile, "PNG")
        print("CROP_SUCCESS")
    except Exception as e:
        print(f"CROP_FAIL: {e}")

crop_circle("favicon.png", "favicon_round.png")
