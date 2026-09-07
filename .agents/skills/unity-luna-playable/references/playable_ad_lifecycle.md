# Playable Ad Lifecycle, UX Flow & Screen Adaptation

High-converting playable ads combine rapid onboarding, rewarding micro-interactions, responsive orientation handling, and a clear Call to Action (CTA).

---

## 1. The 15-30 Second Playable Ad Funnel

```
[0s - 3s] Hook & Tutorial Hand
  └─ Player sees immediate question / prompt ("Pick a weapon!", "Help him escape!")
  └─ Animated pointer hand shows where to tap/drag.

[3s - 12s] Gameplay Core Loop (1-3 Choices)
  └─ Low cognitive load, instant juice (scale punch, confetti, chime).
  └─ Player feels smart / successful.
  └─ Idle detection: After 5s without input -> shake tutorial hand.

[12s - 18s] Climax / Teaser
  └─ "Level Complete!" or "Great Choice!"
  └─ Quick transition into the final offer.

[18s+] End Card & CTA
  └─ Clear App Icon, Star Rating (4.8★), Game Title.
  └─ Pulsing "INSTALL NOW" button linked to `Playable.InstallFullGame()`.
  └─ Fail-safe timeout: If player is idle for 20s, auto-trigger End Card.
```

---

## 2. Inactivity / Idle Controller Pattern

```csharp
using System.Collections;
using UnityEngine;

public class IdleHintController : MonoBehaviour
{
    [SerializeField] private GameObject tutorialHand;
    [SerializeField] private float idleTimeout = 5.0f;
    [SerializeField] private float autoCtaTimeout = 20.0f;

    private float _timeSinceLastInput = 0f;
    private bool _gameFinished = false;

    void Update()
    {
        if (_gameFinished) return;

        _timeSinceLastInput += Time.deltaTime;

        // Show tutorial hand if player hasn't interacted
        if (_timeSinceLastInput >= idleTimeout && !tutorialHand.activeSelf)
        {
            tutorialHand.SetActive(true);
        }

        // Auto progress to End Card if player is completely inactive
        if (_timeSinceLastInput >= autoCtaTimeout)
        {
            TriggerAutoCta();
        }

        // Detect player touch/click
        if (Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began))
        {
            ResetIdleTimer();
        }
    }

    public void ResetIdleTimer()
    {
        _timeSinceLastInput = 0f;
        if (tutorialHand != null) tutorialHand.SetActive(false);
    }

    private void TriggerAutoCta()
    {
        _gameFinished = true;
        // Call your End Card Manager here
    }
}
```

---

## 3. Dynamic Orientation Handling (Portrait vs Landscape)

Playable ads run on varied device shapes (iPads, folded phones, landscape tablets, portrait smartphones). The UI must dynamically adapt without clipping.

### Orientation Adapter Script
Attach this to your main Canvas:

```csharp
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(CanvasScaler))]
public class ResponsiveCanvasAdapter : MonoBehaviour
{
    private CanvasScaler _scaler;
    private int _lastWidth;
    private int _lastHeight;

    [Header("Elements to reposition/reorient")]
    [SerializeField] private GameObject portraitLayout;
    [SerializeField] private GameObject landscapeLayout;

    void Awake()
    {
        _scaler = GetComponent<CanvasScaler>();
        UpdateLayout();
    }

    void Update()
    {
        if (Screen.width != _lastWidth || Screen.height != _lastHeight)
        {
            UpdateLayout();
        }
    }

    private void UpdateLayout()
    {
        _lastWidth = Screen.width;
        _lastHeight = Screen.height;

        bool isPortrait = Screen.height >= Screen.width;

        // Adjust Canvas Scaler match
        // In Portrait: Match Width (0) so content fits horizontally
        // In Landscape: Match Height (1) so UI doesn't blow out of top/bottom
        _scaler.matchWidthOrHeight = isPortrait ? 0f : 1f;

        if (portraitLayout != null) portraitLayout.SetActive(isPortrait);
        if (landscapeLayout != null) landscapeLayout.SetActive(!isPortrait);
    }
}
```

---

## 4. Web Audio Unlock Pattern

Browsers block audio until the user interacts with the page:

```csharp
using UnityEngine;

public class WebAudioUnlocker : MonoBehaviour
{
    private bool _audioUnlocked = false;

    void Update()
    {
        if (_audioUnlocked) return;

        if (Input.GetMouseButtonDown(0) || Input.touchCount > 0)
        {
            UnlockAudio();
        }
    }

    private void UnlockAudio()
    {
        _audioUnlocked = true;
        AudioListener.pause = false;
        // Optionally start background music here
    }
}
```
