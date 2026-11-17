"""Vẽ icon mặt cười vàng (128px, viền tối) cho HUD đếm nhân vật cứu được."""
import sys
from PIL import Image, ImageDraw

S = 512
img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
d.ellipse((16, 16, S - 16, S - 16), fill=(40, 30, 20, 255))
d.ellipse((44, 44, S - 44, S - 44), fill=(255, 205, 40, 255))
d.ellipse((80, 70, S - 120, S - 150), fill=(255, 228, 110, 255))   # sáng phía trên-trái
d.ellipse((44, 44, S - 44, S - 44), outline=(40, 30, 20, 255), width=6)
d.ellipse((150, 160, 210, 250), fill=(40, 30, 20, 255))            # mắt trái
d.ellipse((302, 160, 362, 250), fill=(40, 30, 20, 255))            # mắt phải
d.arc((130, 190, 382, 400), start=20, end=160, fill=(40, 30, 20, 255), width=26)   # miệng cười
img = img.resize((128, 128), Image.LANCZOS)
img.save(sys.argv[1])
print('wrote', sys.argv[1])
