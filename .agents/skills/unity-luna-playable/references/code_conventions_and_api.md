# C# Code Conventions & Luna Bridge API Reference

Luna translates C# code to JavaScript and WebGL. Understanding the boundary of Luna's C# Bridge is crucial to avoid compilation errors and runtime crashes.

---

## 1. Supported vs Unsupported C# Features

| Feature | Supported in Luna? | Recommended Alternative |
| :--- | :---: | :--- |
| **Coroutines** (`IEnumerator`) | ✅ **Full** | Preferred mechanism for sequences, timers, and animations. |
| **Standard Events / Action / Func** | ✅ **Yes** | Use standard C# delegates and events for decoupling. |
| **Structs & Enums** | ✅ **Yes** | Use simple value types to prevent heap allocations. |
| **`System.IO` (File, Directory)** | ❌ **No** | Use `PlayerPrefs` or static configuration assets. |
| **`System.Threading` (Thread, Mutex)** | ❌ **No** | JavaScript runtime is single-threaded. Use Coroutines. |
| **`async / await` (Tasks)** | ⚠️ **Partial / Discouraged** | Adds state machine overhead and JS code weight. Stick to Coroutines. |
| **Reflection (`Type.GetType`, `Invoke`)** | ❌ **No** | Use direct references, interfaces, or switch-case patterns. |
| **Heavy LINQ (`.Where().Select().ToList()`)** | ⚠️ **Avoid in Loops** | Generates garbage collection (GC) and code bloat. Use standard `for` loops. |
| **Dynamic Code Generation (Emit, Expression Trees)** | ❌ **No** | Strictly prohibited. |

---

## 2. Essential Luna API Methods

### 2.1 Call to Action (CTA) & App Store Redirect
Always invoke this when the user taps on "Download", "Install Now", or at the end of the playable:
```csharp
using Luna.Unity;

public void OnInstallClicked()
{
    // Redirects user to the target app store (Google Play / App Store)
    Playable.InstallFullGame();
}
```

### 2.2 Game Lifecycle Tracking
Ad networks track gameplay start and completion rates:
```csharp
using Luna.Unity;

void Start()
{
    // Optional, signals ad impression start
    LifeCycle.GameStarted();
}

public void EndGame()
{
    // Signals gameplay end before showing the final CTA card
    LifeCycle.GameEnded();
}
```

### 2.3 Luna Playground Fields (`[LunaPlaygroundField]`)
Luna allows marketing teams to change game text, speeds, colors, and URLs without rebuilding Unity code. Expose them with attributes:

```csharp
using UnityEngine;
#if UNITY_EDITOR || LUNA
using Luna.Unity;
#endif

public class GameConfig : MonoBehaviour
{
    [Header("Marketing Config")]
    [LunaPlaygroundField("Gameplay", "Player Speed", 5.0f)]
    public float playerSpeed = 5.0f;

    [LunaPlaygroundField("Gameplay", "Total Moves Allowed", 3)]
    public int maxMoves = 3;

    [LunaPlaygroundField("UI", "Header Message", "Choose Your Hero!")]
    public string headerText = "Choose Your Hero!";

    [LunaPlaygroundField("UI", "Enable Fail End Card", true)]
    public bool enableFailState = true;
}
```

---

## 3. Input Handling Best Practices

Ad networks run in varied web views across iOS and Android. Input should be robust and immediate:

1. **Use Unity UI Event Interfaces** on UI elements:
   - `IPointerDownHandler`, `IPointerUpHandler`, `IPointerClickHandler`, `IDragHandler`.
2. **First Touch Audio Policy**:
   - Web browsers block audio playback until the first user gesture.
   - On the first pointer down/click, initialize or resume audio listeners:
   ```csharp
   public void OnPointerDown(PointerEventData eventData)
   {
       AudioListener.pause = false;
   }
   ```
3. **Avoid the New Input System Package**:
   - The new `com.unity.inputsystem` adds significant package size and may have web polyfill overhead.
   - Legacy input (`Input.mousePosition`, `Input.GetMouseButtonDown(0)`, or UI EventSystem) is faster, leaner, and 100% reliable in Luna.

---

## 4. Lightweight Animation & Tweening

Avoid heavy external tweening engines if only a few animations are needed. Use lightweight Coroutine helpers:

```csharp
using System.Collections;
using UnityEngine;

public static class TweenHelper
{
    public static IEnumerator ScalePunch(Transform target, Vector3 punchScale, float duration)
    {
        Vector3 initial = target.localScale;
        Vector3 peak = initial + punchScale;
        float half = duration * 0.5f;

        // Scale Up
        for (float t = 0; t < half; t += Time.deltaTime)
        {
            target.localScale = Vector3.Lerp(initial, peak, t / half);
            yield return null;
        }

        // Scale Down
        for (float t = 0; t < half; t += Time.deltaTime)
        {
            target.localScale = Vector3.Lerp(peak, initial, t / half);
            yield return null;
        }

        target.localScale = initial;
    }
}
```
