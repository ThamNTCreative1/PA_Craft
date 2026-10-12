# Blender Asset Size Estimation for Luna

## Principle

Không thể suy ra chính xác Luna build size chỉ từ `.blend` hoặc FBX. Blender estimate dùng để quyết định trước import; Unity import report và Luna build là nguồn xác nhận.

## Mesh estimate

Ước tính raw mesh payload:

```text
vertex bytes ≈ exported vertices × bytes per vertex
index bytes  ≈ triangles × 3 × index size
raw mesh     ≈ vertex bytes + index bytes + skin/blend-shape data
```

Typical bytes per vertex trước compression:

| Attributes | Approximate bytes/vertex |
|---|---:|
| Position + normal + UV0 | 32 |
| Add tangent | +16 |
| Add vertex color | +4 |
| Add second UV | +8 |
| Add skin weights/indices | +16–32 |

Index size thường là 2 bytes khi mesh section phù hợp 16-bit indices, và 4 bytes khi cần 32-bit. Đây chỉ là raw estimate; FBX/glTF overhead, Unity mesh compression và Luna packaging làm kết quả thực tế khác đi.

### Example

Mesh export có 12,000 vertices, 20,000 triangles, position + normal + UV + tangent, 16-bit indices:

```text
vertex bytes ≈ 12,000 × 48 = 576,000
index bytes  ≈ 20,000 × 3 × 2 = 120,000
raw estimate ≈ 696,000 bytes trước compression/overhead
```

Nếu bỏ tangent vì shader không cần normal map:

```text
saved raw bytes ≈ 12,000 × 16 = 192,000 bytes
```

## Texture estimate

Đánh giá texture theo kích thước import thực tế, format, alpha và mipmap; không dùng kích thước PNG/JPG nguồn làm build estimate.

Raw reference:

```text
RGB24  = width × height × 3
RGBA32 = width × height × 4
Mipmaps add approximately one third before platform compression.
```

Format block-compressed và Luna packaging có kết quả khác raw reference. Luôn kiểm tra imported/build size.

Ưu tiên:

- Atlas 512/1024 thay vì nhiều texture nhỏ nếu giảm overhead/draw call.
- Không alpha khi không cần.
- Không normal map/tangent khi phong cách hình ảnh không cần.
- Không dùng texture 2K cho asset chỉ hiển thị nhỏ.

## Animation estimate

Animation size tăng theo:

- Số bone.
- Số clip.
- Độ dài clip.
- Số property curve.
- Mật độ keyframe.
- Blend shape animation.

Chỉ export clip được dùng; cắt frame thừa, bake rồi reduce keys với tolerance đã kiểm tra deformation.

## Pre-import acceptance

Trước khi bàn giao asset Blender:

- Ghi tris và exported vertices sau modifier.
- Ghi material slot, texture và resolution.
- Ghi bone, clip, duration và blend-shape count.
- Ghi kích thước FBX/glTF và texture nguồn nhưng đánh dấu là estimate.
- Nêu attribute nào có thể loại bỏ trong Unity.
- Nêu target sub-budget trong `scene-budget-4_5mb.md`.

## Post-import acceptance

Sau Unity import:

1. Kiểm tra imported mesh/texture/animation size.
2. Áp dụng Mesh Compression và Optimize Mesh Data.
3. Tắt Read/Write, mipmap, alpha và attribute không cần.
4. Build Luna và ghi `BuildBytes` vào asset ledger.
5. Nếu tổng build >3.8 MB, tối ưu trước khi tiếp tục polish.
6. Nếu tổng build >4.5 MB, feature/build chưa đạt acceptance criteria.
