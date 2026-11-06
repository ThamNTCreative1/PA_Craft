# Implementation report
Approved by: user, "oke", following the two-file texture/material proposal.

Changed assets:
- Assets/GameAsset/Sprites/SkinCharacter/NPC_5.png: filled exactly 64 formerly transparent pixels inside the back/underside arm UV face rectangles using adjacent opaque clothing colors. All other RGBA pixels are identical to the backup. Source stays 64x64 RGBA; import settings, point filtering, mipmap setting and alpha import remain unchanged. PNG size 2121 -> 1942 bytes.
- Assets/GameAsset/Model/Character/Skin/Materials/NPC_5.mat: existing Particles/Standard Unlit shader retained; Cutout mode 1, _ALPHATEST_ON, cutoff 0.5, RenderType TransparentCutout, queue 2450, One/Zero blending, ZWrite enabled.

Verification:
- Pixel-buffer comparison passed: exactly 64 changed pixels, all approved arm pixels with alpha changed from transparent to 255; dimensions unchanged.
- Unity material readback confirms mode, alpha-test keyword and render queue.
- Idle_Gun and Run_Gun clips sampled on a temporary clone in a preview scene. Rendered each from three angles to Temp/Npc5Cutout/. Inspected front/back idle/run previews: formerly missing arm strips are filled with black clothing under Cutout.
- Temporary preview clone/camera/render targets removed; live scene/model/rig/animation unchanged.
- Model has six renderers, 1726 triangles; no meshes edited, renderer slots or material counts added.
- Unity Console: zero error entries after verification.

No runtime C# changes or new shaders/materials/assets were introduced. No fresh Luna build/browser test or total package-size measurement was run. Asset contribution decreased by 179 source PNG bytes; no claim is made about final package compression or total size.
