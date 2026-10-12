# Luna UI outline/aliasing audit
Status: RESEARCH READY
Read-only investigation of user screenshot; no source, font, material, scene or export settings changed.

Confirmed:
- Visible UI is TextMeshPro Distance Field. Tutorial SWIPE TO MOVE, camera tutorial and TAP TO DRIVE use Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset. HUD uses Assets/Game/Fonts/FredokaOne-Regular SDF.asset.
- Unity font atlases are 1024x1024 with Bilinear filtering. luna.json explicit texture overrides cap these fonts (and journal fonts) at 512x512; format png32, compression none.
- Actual export confirms reduction: LunaTemp/stage1/assets/textures/42760.png, 43018.png, 43776.png and 44398.png are 1024x1024; corresponding stage2 PNGs are 512x512 RGBA. These are respectively tutorial FFFFORWA, HUD Fredoka, journal Fredoka, Game FFFFORWA.
- Stage2 material 42758 retains _OutlineWidth 0.415; 43016 retains 0.2. Both retain _TextureWidth/_TextureHeight 1024 and _GradientScale 10. Thus outline values are exported, not zeroed/removed. Texture metadata/shader properties differing after optimization is a risk indicator, not independently proven shader failure.
- Font-specific overrides already disable compression. Default quantization is not evidence that these font atlases were quantized.
- UI is small in the screenshot (630x302 including phone frame). Editor UI scale inspected around 0.42 at 800x450; TAP TO DRIVE font size 30, HUD 30-40. Small rendered pixel sizes compound detail loss. Screenshot/browser rescaling and actual device pixel ratio remain unknown.
- Journal-specific Fredoka materials additionally use outline softness 1.0 / 0.7, which can soften edges, but journal is not shown in the supplied screenshot and this does not explain all labels.

Diagnosis:
Leading supported cause is aggressive font atlas downsampling (half each axis, one quarter the samples) combined with small on-screen text. Do not claim fully proven until A/B rendered at the same viewport and device pixel ratio. Black outline still visibly exists on large tutorial labels. No evidence MissingScriptCleanerWindow.cs causes this problem. Standard Unity UI Outline limitation is not the direct explanation for these TMP materials.

Smallest next verification:
Keep relevant font atlas exports at their native 1024 dimensions and compression none; rebuild assets, compare before/after at identical native viewport. Do not enlarge all textures or change shader/outline width as a first step. Check final playable size under 4.5 MB; source font styles/materials can be reviewed afterward if artifacts persist. User approval needed before changing settings. No A/B build performed in this audit.
