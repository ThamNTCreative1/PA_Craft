# Troubleshooting & Debugging Luna Playable Ads

Common pitfalls, bridge errors, and debugging strategies for Unity Luna Playable Ads.

---

## 1. Common Errors & Quick Solutions

### Issue 1: "Bridge Error: Method / Property Not Implemented"
* **Cause**: You called a Unity API or .NET method that Luna's C# to JS Bridge does not support (e.g., `System.IO.File`, `Thread.Sleep`, reflection, unsupported physics/animation methods).
* **Fix**:
  1. Check browser DevTools console (F12 -> Console) to see the exact missing method name.
  2. Replace with standard Unity component alternatives or Coroutines.
  3. If the code is only needed in Unity Editor, wrap it in `#if UNITY_EDITOR`:
     ```csharp
     #if UNITY_EDITOR
     Debug.Log("Editor-only logic");
     #endif
     ```

### Issue 2: Black Screen on Playable Launch
* **Cause**:
  - Unsupported shader (e.g., custom surface shader, Standard PBR with unsupported passes).
  - Camera missing `Clear Flags` or pointing away from scene.
  - Unhandled exception in `Awake()` or `Start()` halting WebGL script execution.
* **Fix**:
  - Check browser console for JavaScript exceptions.
  - Switch material shaders to `Luna/Unlit`, `Mobile/Unlit`, or `UI/Default`.
  - Ensure main camera has `Solid Color` or `Skybox` clear flags and culling mask is correct.

### Issue 3: Size Exceeds Ad Network Limit (> 3MB / > 5MB)
* **Diagnosis**:
  - Inspect the build output in `LunaTemp/` or the Luna Develop window build report.
* **Fix**:
  - Textures: Lower max resolution of sprites from 1024/2048 to 256/512.
  - Textures: Enable WebP / Crunch compression in Luna project settings.
  - Audio: Force all audio clips to Mono and override sample rate to 22,050 Hz.
  - Fonts: Remove full TTF/OTF font assets; use TextMeshPro stripped ASCII font assets.
  - Excludes: Check `luna.json` -> `excludes` array to ensure editor and unused third-party SDKs are excluded from the build.

### Issue 4: No Audio on First Play
* **Cause**: Modern browsers (Chrome, Safari iOS) block Web Audio context until the user performs a gesture.
* **Fix**:
  - Do not auto-play audio in `Awake()` or `Start()`.
  - Unmute/resume `AudioListener` or call `.Play()` inside your first click/touch event handler (e.g., `OnPointerDown`).

### Issue 5: Touch / Drag Input Lag or Missed Clicks
* **Cause**:
  - Multiple overlapping Canvas raycasters.
  - Missing `GraphicRaycaster` on UI Canvas, or `Raycast Target` enabled on full-screen transparent images blocking touches.
* **Fix**:
  - Turn off `Raycast Target` on all decorative images, text, and icons.
  - Keep `Raycast Target` enabled only on interactive buttons and drag areas.

---

## 2. Debugging Workflow in Browser

1. **Open Luna Develop**:
   - In Unity: `Window > Luna > Develop`.
   - Click **Run in Browser** to test in local Chrome.
2. **Inspect with DevTools (F12)**:
   - **Console**: Inspect JS errors, call stacks, and Luna bridge logs.
   - **Network**: Filter by `WS` or `Fetch` to see file loading times and asset sizes.
   - **Device Toolbar (Ctrl + Shift + M)**: Test responsive layout in:
     - iPhone SE (375x667 - compact portrait)
     - iPhone 14 Pro Max (430x932 - tall portrait)
     - iPad Mini (768x1024 - square-ish tablet)
     - Landscape (e.g. 1920x1080 and 800x600)
3. **Test Network Throttling**:
   - In DevTools Network tab, select **Fast 3G** or **Slow 3G** to simulate poor mobile connection and ensure smooth loading.
