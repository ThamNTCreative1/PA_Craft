"""Sinh tiếng động cơ xe nhỏ lặp liền mạch (2s, mono 22050Hz, WAV 16-bit).

Thành phần: ù nền (răng cưa mềm 48Hz + hài), nhịp nổ piston 12Hz (đường bao tấn công nhanh), tiếng rung lọc thấp.
Mọi tần số tuần hoàn là bội của 0.5Hz → chu kỳ khớp tròn 2s; nhiễu được tạo vòng (lọc 2 lượt, lấy lượt sau) và
crossfade đầu/cuối để không có tiếng "tách" khi lặp.
"""
import math
import random
import struct
import sys
import wave

SR = 22050
DUR = 2.0
N = int(SR * DUR)
random.seed(7)

base = 48.0
fire = 12.0


def saw_soft(phase):
    # răng cưa làm mềm bằng 6 hài đầu
    return sum(math.sin(phase * k) / k for k in range(1, 7))


# nhiễu lọc thấp, chạy 2 vòng để trạng thái bộ lọc ổn định → vòng 2 liền với chính nó
noise = [0.0] * N
y = 0.0
for _ in range(2):
    for i in range(N):
        y += 0.08 * (random.uniform(-1, 1) - y)
        noise[i] = y

out = []
for i in range(N):
    t = i / SR
    hum = saw_soft(2 * math.pi * base * t) * 0.35 + math.sin(2 * math.pi * base * 0.5 * t) * 0.25
    ph = (t * fire) % 1.0
    putt = math.exp(-ph * 9.0)                     # mỗi lần nổ: tấn công nhanh, tắt dần
    knock = math.sin(2 * math.pi * 96.0 * t) * putt * 0.45
    rattle = noise[i] * (0.5 + 0.5 * putt) * 2.2
    v = hum * (0.55 + 0.45 * putt) + knock + rattle
    out.append(v)

# crossfade 60ms đầu/cuối
cf = int(0.06 * SR)
for i in range(cf):
    w = i / cf
    a = out[i]
    b = out[N - cf + i]
    out[i] = a * w + b * (1 - w)
out = out[:N - cf]

peak = max(abs(v) for v in out)
scale = 0.85 * 32767 / peak
path = sys.argv[1]
with wave.open(path, 'wb') as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(b''.join(struct.pack('<h', int(v * scale)) for v in out))
print('wrote', path, len(out) / SR, 's')
