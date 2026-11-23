using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening;

namespace Playable.PetRescue
{
    /// Top HUD: centered countdown and, below it, the heart bar (one slot per required heart).
    public sealed class RescueHudView : MonoBehaviour
    {
        public const float WarningSeconds = 5;
        [SerializeField] private TMP_Text _timer;
        [SerializeField] private Image[] _slots;
        [SerializeField] private Color _emptyColor = new Color(.12f, .12f, .12f, .55f), _fullColor = Color.white;
        [SerializeField] private Color _timerColor = Color.white, _warningColor = new Color(1, .25f, .2f);
        [SerializeField] private RectTransform _topUiRoot;
        [SerializeField] private Canvas _canvas;
        private int _seconds = -1;
        private bool[] _filled;
        private Tween _timerPulse;

        public int SlotCount { get { return _slots.Length; } }

        private void LateUpdate()
        {
            ApplyScreenLayout(Screen.width, Screen.height, Screen.safeArea);
        }

        public void ApplyScreenLayout(int width, int height, Rect safeArea)
        {
            if (_topUiRoot == null || _canvas == null) return;
            // Top labels are authored 112 units above their anchors; cancel that in every orientation.
            float inset = Mathf.Max(0, height - safeArea.yMax) + height * (height > width ? .035f : .02f);
            var shift = Vector2.down * 110;
            var offset = shift + new Vector2(0, -inset / Mathf.Max(.001f, _canvas.scaleFactor));
            if (_topUiRoot.offsetMin != shift) _topUiRoot.offsetMin = shift;
            if (_topUiRoot.offsetMax != offset) _topUiRoot.offsetMax = offset;
            // Landscape draws the top cluster (timer, hearts, toast) larger, growing down from the top-center.
            if (_topUiRoot.pivot != new Vector2(.5f, 1)) { _topUiRoot.pivot = new Vector2(.5f, 1); _topUiRoot.offsetMin = shift; _topUiRoot.offsetMax = offset; }
            float ui = RescueControlsView.UiScale(width, height);
            if (_topUiRoot.localScale.x != ui) _topUiRoot.localScale = new Vector3(ui, ui, 1);
        }

        public void Refresh(int hearts, float remaining)
        {
            EnsureSlots();
            // Progress is shown by the heart slots only (filled by FillSlot as each heart lands).
            int seconds = Mathf.CeilToInt(remaining);
            if (_seconds != seconds)
            {
                _seconds = seconds;
                _timer.text = seconds.ToString();
                bool warning = seconds > 0 && seconds <= WarningSeconds;
                _timer.color = warning ? _warningColor : _timerColor;
                if (warning && Application.isPlaying)
                {
                    // Plain Kill (no complete): the complete path is not needed and may be stripped from Luna builds.
                    if (_timerPulse != null) _timerPulse.Kill();
                    _timer.rectTransform.localScale = Vector3.one;
                    _timerPulse = _timer.rectTransform.DOPunchScale(Vector3.one * .3f, .35f, 6, .5f).SetUpdate(true);
                }
            }
        }

        /// Fills one heart slot (idempotent) with a pop.
        public void FillSlot(int index)
        {
            EnsureSlots();
            if (index < 0 || index >= _slots.Length || _filled[index]) return;
            _filled[index] = true;
            _slots[index].color = _fullColor;
            if (!Application.isPlaying) return;
            var rect = _slots[index].rectTransform;
            rect.DOKill(); rect.localScale = Vector3.one;
            rect.DOPunchScale(Vector3.one * .45f, .35f, 6, .6f).SetUpdate(true);
        }

        public bool IsFilled(int index) { EnsureSlots(); return _filled[index]; }
        public RectTransform SlotRect(int index) { return _slots[index].rectTransform; }

        private void EnsureSlots()
        {
            if (_filled != null) return;
            if (_timer == null || _slots == null || _slots.Length == 0)
                throw new System.InvalidOperationException("Pet Rescue HUD references are incomplete.");
            _filled = new bool[_slots.Length];
            for (int i = 0; i < _slots.Length; i++) _slots[i].color = _emptyColor;
        }

        private void OnDisable()
        {
            if (_timerPulse != null) { _timerPulse.Kill(); _timerPulse = null; }
        }
    }
}
