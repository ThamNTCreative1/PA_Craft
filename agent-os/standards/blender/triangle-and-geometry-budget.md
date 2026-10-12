# Blender Triangle and Geometry Budget

Triangle budget kiểm soát runtime rendering và thường giúp giảm mesh data, nhưng không quyết định trực tiếp tổng MB. Texture, audio và compiled scripts thường chiếm nhiều hơn.

## Count the exported result

- Đánh giá **triangles sau modifier và triangulation**, không dùng số face/quad trong Edit Mode.
- Trong Blender bật Statistics và kiểm tra scene ở trạng thái export.
- Modifier như Subdivision, Mirror, Solidify, Bevel và Geometry Nodes phải được tính theo output cuối.
- Kiểm tra riêng vertices sau split bởi hard edges, UV seams, material boundaries và tangents; vertex count trong Unity có thể cao hơn Blender.

## Default scene budgets

Các mức sau là điểm bắt đầu cho một playable có camera tương đối cố định, không phải luật tuyệt đối:

| Asset class | Preferred triangles | Review threshold |
|---|---:|---:|
| Hero character / main interactive object | 6k–15k | >20k |
| Secondary character | 3k–8k | >12k |
| Large environment centerpiece | 5k–15k | >20k |
| Medium prop | 500–3k | >5k |
| Small repeated prop | 50–800 | >1.5k |
| Full visible scene, static + skinned | 35k–70k | >100k |

Nếu asset chỉ chiếm ít pixel trên màn hình, dùng phần thấp của khoảng. Chỉ vượt threshold khi silhouette, deformation hoặc camera close-up chứng minh cần thiết.

## Optimization order

1. Xóa hidden/interior faces và geometry trùng.
2. Giảm subdivision/bevel segments ở vùng không ảnh hưởng silhouette.
3. Dissolve edge loop trên bề mặt gần phẳng.
4. Decimate có kiểm soát cho background/organic mesh.
5. Retopology cho hero/skinned mesh nếu Decimate phá deformation.
6. Merge static meshes dùng cùng material và luôn render cùng nhau.
7. Loại LOD không mang lợi ích trong camera path thực tế.

Không giảm tris bằng cách phá silhouette, UV, normal, animation deformation hoặc vùng người chơi tương tác gần camera.

## Vertex attribute budget

Mỗi attribute làm tăng mesh data:

- Position: bắt buộc.
- Normal: giữ khi lighting cần.
- UV0: giữ khi texture cần.
- Tangent: chỉ giữ khi shader/normal map cần.
- Vertex color: chỉ giữ nếu shader dùng.
- UV1/UV2+: xóa nếu không dùng lightmap/effect.
- Bone weights/indices: chỉ có trên skinned mesh.
- Blend shapes: chỉ giữ shape xuất hiện trong playable.

Một mesh 20k tris với nhiều UV, tangent, color, skinning và blend shape có thể lớn hơn đáng kể mesh nhiều tris hơn nhưng attribute tối giản.

## Collider budget

- Không duplicate render mesh chỉ để làm collider.
- Dùng box/sphere/capsule hoặc compound primitives.
- Với collision đặc biệt, tạo low-poly proxy collider riêng.
- Không export Blender collision helper nếu Unity sẽ tạo collider primitive thủ công.
