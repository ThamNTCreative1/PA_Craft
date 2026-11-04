using DG.Tweening;
using Playable.MonsterArmy.Core;
using TMPro;
using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>Hand and text hints for dragging a monster and pressing START.</summary>
    [DefaultExecutionOrder(100)]
    public sealed class TutorialDirector : MonoBehaviour
    {
        [SerializeField] private RectTransform _hand;
        // Legacy scene references are hidden; new scenes only create the hand.
        [SerializeField] private RectTransform _handRing;
        [SerializeField] private TMP_Text _prompt;
        [SerializeField] private MonsterHotbar _hotbar;
        [SerializeField] private DragPlacer _dragPlacer;
        [SerializeField] private ArenaGrid _grid;
        [SerializeField] private Camera _worldCamera;
        [SerializeField] private int _demoColumn = 1;
        [SerializeField] private int _demoRow = 2;

        private TutorialFlow _flow;
        private bool _dragHintDismissed, _startHintDismissed;
        private float _selectionIdleSeconds;
        private TutorialStep _shownStep = (TutorialStep)(-1);
        private Tween _handTween;
        private Tween _promptTween;
        private RectTransform _startButton;
        private Vector2 _hintScreen;
        private Rect _hintSafeArea;
        private readonly Vector3[] _corners = new Vector3[4];

        public bool IsFinished => _flow != null && _flow.Current == TutorialStep.Done;
        public TutorialStep Current => _flow?.Current ?? TutorialStep.DragToPlace;
        public bool ShowStartButton => _flow != null && _flow.ShowStartButton;

        private void Awake()
        {
            HideLegacyDecorations();
            if (_prompt != null)
            {
                _prompt.fontStyle = FontStyles.Bold;
                _prompt.enableAutoSizing = true;
                _prompt.fontSizeMin = 18f;
                _prompt.fontSizeMax = 54f;
                _prompt.raycastTarget = false;
            }
            if (_hand != null)
            {
                // Position animations refer to the index fingertip, rather than the palm.
                _hand.pivot = new Vector2(0.4f, 0.96f);
                _hand.localScale = Vector3.one;
            }
        }

        private void HideLegacyDecorations()
        {
            if (_handRing != null) _handRing.gameObject.SetActive(false);
            if (_prompt != null) { _prompt.text = string.Empty; _prompt.gameObject.SetActive(false); }
        }

        public void Begin(RectTransform startButton)
        {
            _startButton = startButton;
            _flow = new TutorialFlow();
            _dragHintDismissed = _startHintDismissed = false;
            _selectionIdleSeconds = 0f;
            _shownStep = (TutorialStep)(-1);
            HideLegacyDecorations();
            if (_hotbar != null) _hotbar.PulseSlot(0, false);
        }

        public void NotifySelectionTouched()
        {
            _selectionIdleSeconds = 0f;
            if (Current == TutorialStep.DragToPlace) _dragHintDismissed = true;
            else if (Current == TutorialStep.PressStart) _startHintDismissed = true;
            _handTween?.Kill();
            ShowHand(false);
            HideLegacyDecorations();
        }

        public void NotifyActivity()
        {
            _selectionIdleSeconds = 0f;
            _flow?.NotifyActivity();
        }

        public void NotifyMonsterPlaced()
        {
            _selectionIdleSeconds = 0f;
            _flow?.NotifyMonsterPlaced();
        }
        public void NotifyStartPressed() => _flow?.NotifyStartPressed();

        private void Update()
        {
            if (_flow == null) return;
            _flow.IsInteractionInProgress = _dragPlacer != null && _dragPlacer.IsDragging;
            _flow.Tick(Time.deltaTime);
            if (_flow.IsInteractionInProgress) _selectionIdleSeconds = 0f;
            else if (_flow.Current == TutorialStep.DragToPlace && _dragHintDismissed)
            {
                _selectionIdleSeconds += Time.deltaTime;
                if (_selectionIdleSeconds >= 3f)
                {
                    _dragHintDismissed = false;
                    ApplyStep(TutorialStep.DragToPlace);
                }
            }
            if (_flow.Current != _shownStep)
            {
                _shownStep = _flow.Current;
                ApplyStep(_shownStep);
            }
        }

        private void LateUpdate()
        {
            if (_flow == null) return;
            Vector2 screen = new Vector2(Screen.width, Screen.height);
            if (_hintScreen == screen && _hintSafeArea == Screen.safeArea) return;
            _hintScreen = screen;
            _hintSafeArea = Screen.safeArea;
            Canvas.ForceUpdateCanvases();
            ApplyStep(_flow.Current);
        }

        private void ApplyStep(TutorialStep step)
        {
            _handTween?.Kill();
            HideLegacyDecorations();
            if (_hotbar != null) _hotbar.PulseSlot(0, false);
            if (_hand != null) { _hand.localScale = Vector3.one; _hand.localRotation = Quaternion.identity; }
            if (step == TutorialStep.DragToPlace && !_dragHintDismissed) ShowDragHint();
            else if (step == TutorialStep.PressStart && !_startHintDismissed) PointHandAtStart();
            else ShowHand(false);
        }

        private void PointHandAtStart()
        {
            if (_hand == null || _startButton == null) { ShowHand(false); return; }
            _startButton.GetWorldCorners(_corners);
            Vector3 rightCenter = (_corners[2] + _corners[3]) * 0.5f;
            Vector3 gap = _startButton.TransformVector(Vector3.right * 8f);
            Vector3 from = rightCenter + gap;
            _hand.localRotation = Quaternion.Euler(0f, 0f, 90f);
            ShowHand(true);
            _hand.position = from;
            // Point left from the right edge; the palm stays outside START and inside the screen.
            _handTween = _hand.DOMove(from + _startButton.TransformVector(Vector3.right * 12f), 0.5f)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        private void ShowDragHint()
        {
            if (_hotbar != null) _hotbar.ResetScrollForHint();
            RectTransform slot = _hotbar != null ? _hotbar.SlotTransform(0) : null;
            if (_hand == null || _grid == null || _worldCamera == null || slot == null)
            { ShowHand(false); return; }
            RectTransform icon = slot.Find("Icon") as RectTransform;
            Vector3 from = icon != null ? icon.position : slot.position;
            Vector2 screenTarget = _worldCamera.WorldToScreenPoint(_grid.CellToWorld(_demoColumn, _demoRow));
            Canvas canvas = _hand.GetComponentInParent<Canvas>();
            Camera uiCamera = canvas != null && canvas.renderMode != RenderMode.ScreenSpaceOverlay ? canvas.worldCamera : null;
            Vector3 to;
            if (!RectTransformUtility.ScreenPointToWorldPointInRectangle(_hand.parent as RectTransform, screenTarget, uiCamera, out to)) return;
            ShowHand(true);
            _hand.position = from;
            _handTween = DOTween.Sequence().AppendInterval(0.35f)
                .Append(_hand.DOMove(to, 1.1f).SetEase(Ease.InOutSine))
                .AppendInterval(0.2f).SetLoops(-1, LoopType.Restart);
        }

        private void ShowHand(bool visible)
        {
            if (_hand != null) _hand.gameObject.SetActive(visible);
            if (_prompt != null)
            {
                _promptTween?.Kill();
                _prompt.rectTransform.localScale = Vector3.one;
                _prompt.text = Current == TutorialStep.PressStart ? "Press Start and Fight!" : "Tap to add, drag to place!";
                _prompt.gameObject.SetActive(visible);
                if (visible)
                    _promptTween = _prompt.rectTransform.DOScale(1.06f, 0.55f)
                        .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
            }
        }

        public void StopHints()
        {
            _handTween?.Kill();
            ShowHand(false);
            HideLegacyDecorations();
            enabled = false;
        }

        private void OnDestroy()
        {
            _handTween?.Kill();
            _promptTween?.Kill();
        }
    }
}
