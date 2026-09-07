# Size Optimization Guide for Luna Playable Ads

Playable ads have strict size limits imposed by ad networks (typically **2MB to 5MB zipped**). An unoptimized build will be rejected by networks such as AppLovin, IronSource, Unity Ads, Mintegral, and Google Ads.

---

## 1. Network Size Limits Breakdown

| Ad Network | Maximum Zip Size | Recommended Target |
| :--- | :---: | :---: |
| **IronSource** | 2MB – 3MB | **< 2.5MB** |
| **AppLovin / Mintegral** | 3MB – 5MB | **< 3MB** |
| **Unity Ads** | 5MB | **< 3MB** |
| **TikTok / Pangle** | 2MB – 5MB | **< 2MB** |
| **Google Ads** | 5MB | **< 4MB** |

> [!IMPORTANT]
> Always aim for **under 2.5MB** total zip size to ensure universal compatibility across all major ad networks.

---

## 2. Textures & 2D Sprites (Biggest Size Factor: ~60% of build)

1. **Max Size Cap**:
   - Backgrounds: **512x512** (rarely 1024x1024, use 9-slice or tiling where possible).
   - Characters / Main Cards: **256x256**.
   - Icons / Buttons / VFX: **64x64** or **128x128**.
2. **Power of Two (POT)**:
   - Always ensure dimensions are powers of 2 (e.g., 64, 128, 256, 512) to enable hardware GPU compression.
3. **Sprite Atlas**:
   - Pack all UI sprites and gameplay icons into 1 or 2 atlases.
   - Reduces WebGL draw calls and file headers.
4. **Compression Format**:
   - In Luna settings, enable **WebP** compression or **Crunch** format.
   - Set compression quality to 70–80% (virtually indistinguishable on mobile screens).
5. **Alpha Channel**:
   - If an image doesn't need transparency (e.g., solid background), save it as 24-bit RGB (no Alpha channel) to save 25% size.

---

## 3. Audio Optimization (~15% of build)

1. **Force to Mono**:
   - Mobile speakers rarely deliver true stereo. Checking **Force to Mono** immediately cuts uncompressed audio size by **50%**.
2. **Sample Rate**:
   - Set **Sample Rate Setting** to `Override Sample Rate` -> **22050 Hz** (or 32000 Hz).
3. **Format & Bitrate**:
   - SFX: Compressed (Vorbis / MP3 / AAC), Quality 50–70% (~32–48 kbps).
   - BGM: Keep to a short 10–15 second seamless loop.
   - Total audio files: Maximum 4–6 SFX and 1 BGM.

---

## 4. Fonts & Text (TextMeshPro)

- **Do NOT include full TTF/OTF files**: A standard CJK or multi-lingual font file can easily be 5MB–15MB by itself!
- **TextMeshPro Character Stripping**:
  - In Font Asset Creator, choose **Character Set: Custom Characters**.
  - Provide only the ASCII characters needed:
    ```text
    0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?,.:;+-*/()'"%$
    ```
- **Bitmap / Sprite Fonts**: For game titles or big numbers ("+100", "LEVEL 1"), prefer using sprites rather than embedding a font.

---

## 5. 3D Models & Meshes

1. **Polycount**: Keep entire scene below **5,000 – 15,000 triangles**.
2. **Import Settings**:
   - Uncheck `Import BlendShapes` (unless facial animations are strictly needed).
   - Uncheck `Import Cameras` and `Import Lights`.
   - Set `Mesh Compression` to **Medium** or **High**.
3. **Rig & Animation**:
   - Keep bone counts low (max 15–25 bones per character).
   - Optimize keyframe reduction in animation clip settings.

---

## 6. Shaders & Rendering

1. **Use Luna Compatible Shaders**:
   - Use `Luna/Unlit`, `Mobile/Unlit`, or simple single-pass shaders.
2. **Avoid Heavy Features**:
   - No Standard PBR with metallic/roughness maps (adds multiple heavy textures and complex WebGL shader programs).
   - No post-processing stacks (Bloom, Depth of Field, etc.).
   - No real-time shadows: Use baked shadow blobs (projector or simple transparent quad beneath objects).
