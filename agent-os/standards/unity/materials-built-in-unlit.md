# Built-in Unlit Materials for Luna

## Render pipeline

- Project phải dùng **Unity Built-in Render Pipeline**.
- Không chuyển sang URP hoặc HDRP.
- Không dùng Shader Graph.
- Không tạo hoặc import custom shader, surface shader hoặc shader package nếu chưa có ngoại lệ được phê duyệt trong spec.
- Mọi material runtime phải dùng shader Unlit có sẵn và được phép trong tài liệu này.

Lưu ý: Unity material luôn cần một shader. Cụm từ “không dùng shader” trong project này được hiểu là **không dùng custom shader; chỉ dùng built-in Unlit shader**.

## Approved shader allowlist

| Use case | Approved built-in shader | Brightness/tint method |
|---|---|---|
| Solid-color 3D mesh | `Unlit/Color` | Material `_Color` |
| Opaque textured 3D mesh | `Unlit/Texture` | Bake brightness into texture/material variant |
| Transparent textured 3D mesh | `Unlit/Transparent` hoặc `Unlit/Transparent Cutout` | Bake brightness into texture; use only when transparency is required |
| SpriteRenderer | `Sprites/Default` | `SpriteRenderer.color` hoặc `_Color` |
| Unity UI Graphic/Image | `UI/Default` | `Graphic.color` |
| Particle-only effect | Built-in unlit particle shader already supported by the project | Particle color/module; do not introduce extra shader variants unnecessarily |

Không dùng `Standard`, Lit shader, URP Lit/Unlit, HDRP shader hoặc shader do Blender/material exporter tự tạo.

## Brightness and darkness

### Solid color

Với `Unlit/Color`, lưu base color và áp dụng hệ số:

```text
darkenedColor = baseColor × brightness
```

- `brightness = 1`: màu gốc.
- `0 < brightness < 1`: tối hơn.
- Không dùng giá trị âm.
- Giá trị lớn hơn 1 chỉ được coi là sáng hơn nếu color space/output thực tế giữ được kết quả; không dựa vào HDR/bloom.

### Sprite and UI

- Dùng `SpriteRenderer.color` hoặc `Graphic.color` để tint/tối màu.
- Không tạo material riêng cho mỗi sprite/UI element chỉ để đổi brightness.
- Giữ alpha độc lập nếu chỉ muốn đổi sáng/tối: nhân RGB, không vô tình thay alpha.

### Textured 3D mesh

`Unlit/Texture` built-in không được giả định có property tint/brightness tương thích. Nếu material không expose `_Color`, không gọi `material.color` hoặc `SetColor` và giả định nó có tác dụng.

Khi textured mesh cần nhiều mức sáng/tối mà vẫn cấm custom shader, dùng một trong các cách:

1. Bake brightness vào texture nguồn.
2. Tạo số lượng nhỏ texture/material variant đã được duyệt.
3. Chuyển visual sang `Unlit/Color` nếu không cần texture detail.
4. Với sprite/UI, dùng hệ thống tint native thay vì mesh material.

Không duplicate texture variant hàng loạt vì có thể phá budget 4.5 MB. Nếu cần brightness thay đổi liên tục trên textured 3D mesh, đây là mâu thuẫn với quy tắc “no custom shader”; agent phải dừng và yêu cầu quyết định thay vì tự tạo shader.

## Material ownership and runtime changes

- Ưu tiên shared material để giảm material count và draw call.
- Không truy cập `renderer.material` lặp lại vì Unity có thể instantiate material riêng.
- Nếu built-in shader có property cần thay đổi theo renderer, ưu tiên `MaterialPropertyBlock` và cache property ID.
- Trước khi set property, kiểm tra shader/material có property đó bằng `HasProperty` trong validation/development path.
- Không tạo material mới trong `Update()` hoặc input callback.
- Material variant phải có mục đích rõ ràng và được tính vào asset/build budget.

## Blender to Unity

- Blender material/node graph chỉ là nguồn authoring; không được import như một runtime shader graph.
- Bake procedural color, lighting stylization, AO hoặc gradient cần thiết vào texture/vertex data phù hợp trước export.
- Sau import, thay material tự sinh bằng approved built-in Unlit material.
- Không giữ normal, metallic, roughness hoặc emission map nếu approved shader không sử dụng chúng.
- Xóa material slot không dùng và merge mesh/material khi không phá animation hoặc gameplay.

## Lighting assumptions

- Unlit material không nhận ánh sáng scene theo cách Lit shader làm.
- Độ sáng/tối phải đến từ base color, texture đã bake, sprite/UI tint hoặc approved material variant.
- Không thêm realtime light, shadow hoặc post-processing chỉ để bù cho Unlit visual.
- Nếu art cần chiều sâu, bake gradient/AO/highlight vào texture hoặc vertex color chỉ khi approved shader thực sự sử dụng dữ liệu đó.

## Verification

- Quét toàn bộ material được đưa vào build và báo shader ngoài allowlist.
- Kiểm tra project vẫn dùng Built-in Render Pipeline.
- Kiểm tra không có Shader Graph/custom shader/URP/HDRP dependency trong Luna build path.
- Kiểm tra mọi brightness control thực sự thay đổi output trên Unity và Luna build, không chỉ thay property không tồn tại.
- Kiểm tra số material, texture variant, shader variant và ảnh hưởng đến budget 4.5 MB.
- Kiểm tra transparent material về overdraw và chỉ giữ transparency khi cần.
