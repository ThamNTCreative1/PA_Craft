# Luna Scene Budget — Hard Limit 4.5 MB

Áp dụng khi toàn bộ playable/Luna scene phải nằm dưới 4.5 MB. Đây là ngân sách build/package đo được, không phải tổng dung lượng file nguồn trong `Assets/`.

## Budget gates

- **Green:** build đo được ≤ 3.8 MB.
- **Warning:** 3.8–4.2 MB; không thêm asset nếu chưa bù ngân sách.
- **Critical:** 4.2–4.5 MB; chỉ sửa lỗi hoặc tối ưu.
- **Fail:** > 4.5 MB.

Không sử dụng estimate để tuyên bố đạt chuẩn. Estimate chỉ dùng trước import; kết luận cuối dựa trên Luna build/report thực tế.

## Default allocation

| Category | Target | Hard sub-budget |
|---|---:|---:|
| Compiled scripts/runtime | 1.30 MB | 1.50 MB |
| Textures/UI/sprites | 0.90 MB | 1.10 MB |
| Meshes/model data | 0.40 MB | 0.55 MB |
| Audio | 0.25 MB | 0.35 MB |
| Animation/rig | 0.15 MB | 0.22 MB |
| Materials/shaders/other | 0.20 MB | 0.28 MB |
| Reserved headroom | 0.60 MB | 0.50 MB minimum before finalization |
| **Total** | **3.80 MB** | **4.50 MB** |

Có thể chuyển ngân sách giữa category nhưng không được dùng hết headroom trước final build. Nếu compiled scripts đã gần 1.5 MB, asset art phải giảm tương ứng.

## Required asset ledger

Mỗi project nên duy trì bảng với các cột:

```text
Asset,Source,Category,Triangles,Vertices,Materials,Textures,SourceBytes,ImportedBytes,BuildBytes,Status,Notes
```

Phân biệt:

- `SourceBytes`: kích thước `.blend`, FBX, PNG, WAV nguồn.
- `ImportedBytes`: kích thước sau Unity import.
- `BuildBytes`: đóng góp đo được trong build/package.

Chỉ `BuildBytes` được dùng cho hard limit.

## Review frequency

- Đo sau khi thêm character/environment lớn.
- Đo sau thay đổi texture atlas, audio, shader hoặc package.
- Đo trước khi polish.
- Đo lại ở final Luna build.

Nếu build vượt Warning gate, task mới phải nêu rõ asset nào sẽ được giảm hoặc loại bỏ để bù ngân sách.
