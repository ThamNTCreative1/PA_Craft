"""Làm sạch 2 icon nút HUD (trắng, nền trong suốt) và đưa về 256x256.

- Icon người: chỉ cắt sát + thu nhỏ.
- Icon bảng màu: ảnh gốc có đốm nhiễu trắng đặc bên trong vòng tròn. Giữ (a) vòng tròn viền theo dải bán kính,
  (b) bảng màu + cọ bằng phép mở hình thái học (MinFilter rồi MaxFilter) để xoá đốm nhỏ, rồi chỉ giữ thành phần
  liên thông lớn nhất (bảng màu + cọ).
"""
import sys
from collections import deque
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]


def square(im, size=256):
    bbox = im.getchannel('A').point(lambda a: 255 if a > 40 else 0).getbbox()
    im = im.crop(bbox)
    w, h = im.size
    s = max(w, h)
    sq = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    sq.paste(im, ((s - w) // 2, (s - h) // 2))
    return sq.resize((size, size), Image.LANCZOS)


person = Image.open(src + 'exec-7db2723a-e6b1-49b4-bb6b-82194521699e.png').convert('RGBA')
square(person).save(out + 'HUD_BtnCharacter.png')

pal = Image.open(src + 'exec-d9f7f4d4-78a5-4cc8-ba99-0f77f7ac4733.png').convert('RGBA')
W, H = pal.size
alpha = pal.getchannel('A').point(lambda a: 255 if a > 128 else 0)
bbox = alpha.getbbox()
cx, cy = (bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2
r_out = (bbox[2] - bbox[0]) / 2

# (a) vòng tròn: dải bán kính sát mép ngoài — dò bán kính vòng thật theo tia ngang
ring = Image.new('L', (W, H), 0)
rp, ap = ring.load(), alpha.load()
r_ring = None
for x in range(int(cx + r_out * 0.95), int(cx + r_out * 0.6), -1):
    pass
# vòng thật nằm ở ~0.86*r_out (nhiễu lan ra ngoài vòng) → dò cụm trắng liên tục quanh 0.8..0.95 r_out theo nhiều tia
import math
radii = []
for k in range(36):
    t = k * math.pi * 2 / 36
    run = []
    for rr in range(int(r_out * 0.75), int(r_out * 1.0)):
        x, y = int(cx + rr * math.cos(t)), int(cy + rr * math.sin(t))
        if 0 <= x < W and 0 <= y < H and ap[x, y]:
            run.append(rr)
    if run:
        radii.append(run)
# bán kính vòng = trung vị của điểm trắng ngoài cùng-có-cặp (đơn giản: lấy giá trị xuất hiện nhiều nhất)
from collections import Counter
cnt = Counter(r for run in radii for r in run)
r_ring = max(range(int(r_out * 0.8), int(r_out * 0.97)), key=lambda r: sum(cnt.get(r + d, 0) for d in range(-3, 4)))
band = 9
for y in range(H):
    for x in range(W):
        d = math.hypot(x - cx, y - cy)
        if abs(d - r_ring) <= band and ap[x, y]:
            rp[x, y] = 255

# (b) bảng màu + cọ: mở hình thái học rồi giữ thành phần lớn nhất bên trong vòng
inner = Image.new('L', (W, H), 0)
ip = inner.load()
for y in range(H):
    for x in range(W):
        if ap[x, y] and math.hypot(x - cx, y - cy) < r_ring - band - 4:
            ip[x, y] = 255
opened = inner.filter(ImageFilter.MinFilter(11)).filter(ImageFilter.MaxFilter(11))
op = opened.load()
seen = bytearray(W * H)
best = []
for y in range(H):
    for x in range(W):
        if op[x, y] and not seen[y * W + x]:
            comp, q = [], deque([(x, y)])
            seen[y * W + x] = 1
            while q:
                a, b = q.popleft()
                comp.append((a, b))
                for na, nb in ((a + 1, b), (a - 1, b), (a, b + 1), (a, b - 1)):
                    if 0 <= na < W and 0 <= nb < H and op[na, nb] and not seen[nb * W + na]:
                        seen[nb * W + na] = 1
                        q.append((na, nb))
            if len(comp) > 4000:   # bảng màu, cọ — đốm nhiễu còn sót sau phép mở đều nhỏ hơn nhiều
                best.extend(comp)
shape = Image.new('L', (W, H), 0)
sp = shape.load()
for a, b in best:
    sp[a, b] = 255
# lấy lại chi tiết gốc (viền lỗ màu, đầu cọ) trong vùng shape giãn nhẹ
grown = shape.filter(ImageFilter.MaxFilter(7))
gp = grown.load()
mask = Image.new('L', (W, H), 0)
mp = mask.load()
for y in range(H):
    for x in range(W):
        if rp[x, y] or (gp[x, y] and ap[x, y]):
            mp[x, y] = 255
clean = Image.new('RGBA', (W, H), (255, 255, 255, 0))
clean.putalpha(mask.filter(ImageFilter.GaussianBlur(0.8)))
square(clean).save(out + 'HUD_BtnPaint.png')
print('ring r =', r_ring, 'shape px =', len(best))
