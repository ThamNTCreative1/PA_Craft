using System;
using System.Collections.Generic;
using DG.Tweening;
using Playable.MonsterArmy.Core;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    /// <summary>Responsive monster selection with tap, placement drag and vertical scrolling.</summary>
    public sealed class MonsterHotbar : MonoBehaviour, IPointerDownHandler
    {
        [SerializeField] private RectTransform _slotRoot;
        [SerializeField] private HotbarSlot[] _slots;
        [SerializeField] private CombatAudio _audio;

        [Header("Responsive")]
        [SerializeField] private float _slotSize = 112f;
        [SerializeField] private float _pitch = 120f;
        [SerializeField] private int _portraitColumns = 4;
        [SerializeField] private float _landscapeAspect = 1f;

        private readonly List<Tween> _pulses = new List<Tween>();
        private int _laidOutColumns = -1;
        private Vector2 _screenSize;
        private Rect _safeArea;
        private RectTransform _startButtonRect;
        private RectTransform _content;
        private ScrollRect _scroll;
        [SerializeField] private Material _clipMaterial;
        private Material _runtimeClipMaterial;
        private readonly Vector3[] _corners = new Vector3[4];

        /// <summary>Người chơi bắt đầu kéo một ô.</summary>
        public event Action<MonsterSpecies> OnSlotDragBegin;
        public event Action<MonsterSpecies> OnSlotTapped;
        public event Action OnSelectionTouched;

        public void OnPointerDown(PointerEventData eventData) => OnSelectionTouched?.Invoke();

        public RectTransform SlotRoot => _slotRoot;
        public int SlotCount => _slots?.Length ?? 0;

        public static MonsterSpecies SpeciesAt(int index)
        {
            return (MonsterSpecies)Mathf.Clamp(index, 0, MonsterRoster.Count - 1);
        }

        private void Awake()
        {
            if (_slots == null) return;
            EnsureScroll();

            for (int i = 0; i < _slots.Length; i++)
            {
                if (_slots[i] == null) continue;
                _slots[i].Bind(i, HandleDragBegin, HandleTap, HandleTouch, _scroll);
            }

            Relayout();
        }

        private void Start()
        {
            _laidOutColumns = -1;
            Relayout();
        }

        private void LateUpdate()
        {
            Relayout();
            UpdateClipRect();
        }

        private void UpdateClipRect()
        {
            if (_runtimeClipMaterial == null) return;
            _slotRoot.GetWorldCorners(_corners);
            Vector2 min = RectTransformUtility.WorldToScreenPoint(null, _corners[0]);
            Vector2 max = RectTransformUtility.WorldToScreenPoint(null, _corners[2]);
            _runtimeClipMaterial.SetVector("_HotbarClip", new Vector4(min.x / Screen.width, min.y / Screen.height, max.x / Screen.width, max.y / Screen.height));
        }

        /// <summary>Portrait grid or two scrollable landscape columns, using uniform icon scale.</summary>
        public void Relayout()
        {
            if (_slots == null || _slots.Length == 0 || _slotRoot == null || Screen.height <= 0) return;

            float aspect = (float)Screen.width / Screen.height;
            bool portrait = aspect < _landscapeAspect;
            int columns = portrait ? Mathf.Max(1, _portraitColumns) : 2;
            Vector2 screenSize = new Vector2(Screen.width, Screen.height);
            if (columns == _laidOutColumns && _screenSize == screenSize && _safeArea == Screen.safeArea) return;
            _screenSize = screenSize;
            _safeArea = Screen.safeArea;
            var safeRoot = _slotRoot.parent as RectTransform;
            if (safeRoot != null)
            {
                Rect safe = Screen.safeArea;
                if (safe.width <= 0 || safe.height <= 0) safe = new Rect(0, 0, Screen.width, Screen.height);
                safeRoot.anchorMin = new Vector2(safe.xMin / Screen.width, safe.yMin / Screen.height);
                safeRoot.anchorMax = new Vector2(safe.xMax / Screen.width, safe.yMax / Screen.height);
                safeRoot.offsetMin = safeRoot.offsetMax = Vector2.zero;
                Canvas.ForceUpdateCanvases();
            }

            EnsureScroll();
            _scroll.StopMovement();
            _scroll.enabled = !portrait;
            _laidOutColumns = columns;
            int rows = Mathf.CeilToInt(_slots.Length / (float)columns);
            _slotRoot.pivot = new Vector2(0.5f, 0.5f);
            _slotRoot.localRotation = Quaternion.identity;
            _slotRoot.sizeDelta = new Vector2(columns * _pitch + 16f, rows * _pitch + 16f);

            if (safeRoot != null)
            {
                float scale = portrait
                    ? Mathf.Min(safeRoot.rect.width * 0.60f / _slotRoot.sizeDelta.x,
                        safeRoot.rect.height * 0.32f / _slotRoot.sizeDelta.y)
                    : Mathf.Min(1f, safeRoot.rect.height * 0.17f / _pitch,
                        safeRoot.rect.width * 0.24f / _slotRoot.sizeDelta.x);
                if (!portrait) _slotRoot.sizeDelta = new Vector2(_slotRoot.sizeDelta.x, safeRoot.rect.height * 0.70f / scale);
                _content.sizeDelta = new Vector2(_slotRoot.sizeDelta.x, rows * _pitch + 16f);
                _content.anchoredPosition = Vector2.zero;
                _slotRoot.localScale = Vector3.one * scale;
                // Leave extra room at the landscape edge for the device notch/frame.
                float landscapeInset = Mathf.Max(16f, safeRoot.rect.width * 0.06f);
                _slotRoot.anchorMin = _slotRoot.anchorMax = portrait ? new Vector2(0.5f, 0f) : new Vector2(0f, 0.5f);
                _slotRoot.anchoredPosition = portrait
                    ? new Vector2(0f, 12f + _slotRoot.sizeDelta.y * scale * 0.5f)
                    : new Vector2(landscapeInset + _slotRoot.sizeDelta.x * scale * 0.5f, 0f);
                float contentCenter = portrait ? 0.5f : Mathf.Lerp(0.5f, 1f,
                    Mathf.Clamp01((landscapeInset + 16f + _slotRoot.sizeDelta.x * scale) / safeRoot.rect.width));
                float panelWidth = _slotRoot.sizeDelta.x * scale;
                float panelHeight = _slotRoot.sizeDelta.y * scale;
                float startHeight = Mathf.Min(100f, safeRoot.rect.height * (portrait ? 0.065f : 0.10f));
                float startWidth = portrait ? safeRoot.rect.width * 0.25f : panelWidth * 0.9f;
                var startGraphic = safeRoot.Find("Start Button").GetComponent<Image>();
                if (startGraphic != null && startGraphic.sprite != null)
                {
                    float aspectRatio = startGraphic.sprite.rect.width / startGraphic.sprite.rect.height;
                    startWidth = Mathf.Min(startWidth, startHeight * aspectRatio);
                    startHeight = startWidth / aspectRatio;
                }
                float startX = portrait ? 0.5f
                    : _slotRoot.anchoredPosition.x / safeRoot.rect.width;
                float startY = portrait
                    ? (12f + panelHeight + safeRoot.rect.height * 0.008f + startHeight * 0.5f) / safeRoot.rect.height
                    : 0.5f - (panelHeight + startHeight) * 0.5f / safeRoot.rect.height - 0.025f;
                PlaceHud(safeRoot, "Start Button", new Vector2(startX, startY), new Vector2(startWidth, startHeight));
                _startButtonRect = safeRoot.Find("Start Button") as RectTransform;
                PlaceHud(safeRoot, "Tutorial/Prompt", new Vector2(0.5f, portrait ? 0.925f : 0.94f), new Vector2(safeRoot.rect.width * 0.88f, Mathf.Min(90f, safeRoot.rect.height * 0.065f)));
                PlaceHud(safeRoot, "Danger", new Vector2(contentCenter, 0.82f), new Vector2(safeRoot.rect.width * 0.65f, Mathf.Min(65f, safeRoot.rect.height * 0.06f)));
                PlaceHud(safeRoot, "Combo", portrait ? new Vector2(0.15f, startY) : new Vector2(startX, 0.04f), new Vector2(safeRoot.rect.width * (portrait ? 0.24f : 0.6f), Mathf.Min(65f, safeRoot.rect.height * 0.055f)));
                var hand = safeRoot.Find("Tutorial/Hand") as RectTransform;
                if (hand != null) hand.sizeDelta = Vector2.one * Mathf.Min(150f, safeRoot.rect.height * 0.12f);
            }

            for (int i = 0; i < _slots.Length; i++)
            {
                if (_slots[i] == null) continue;

                int column = i % columns;
                int row = i / columns;
                var rect = (RectTransform)_slots[i].transform;
                rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 1f);
                rect.pivot = new Vector2(0.5f, 0.5f);
                rect.localRotation = Quaternion.identity;
                rect.localScale = Vector3.one;
                rect.sizeDelta = new Vector2(_slotSize, _slotSize);
                var icon = rect.Find("Icon") as RectTransform;
                if (icon != null)
                {
                    icon.anchorMin = icon.anchorMax = icon.pivot = new Vector2(0.5f, 0.5f);
                    icon.anchoredPosition = Vector2.zero;
                    icon.localScale = Vector3.one;
                    icon.sizeDelta = Vector2.one * (_slotSize - 14f);
                    var image = icon.GetComponent<Image>();
                    if (image != null && image.sprite != null)
                    {
                        // All heads share one height; keep each sprite's original proportions.
                        float height = _slotSize * 0.68f;
                        float ratio = image.sprite.rect.width / image.sprite.rect.height;
                        icon.sizeDelta = new Vector2(height * ratio, height);
                        image.preserveAspect = false;
                    }
                }
                rect.anchoredPosition = new Vector2(
                    (column - (columns - 1) * 0.5f) * _pitch,
                    -8f - (row + 0.5f) * _pitch);
            }
        }

        /// <summary>Bề ngang thanh chọn chiếm, tính theo tỉ lệ khung tham chiếu 1080.</summary>
        private void EnsureScroll()
        {
            if (_content != null) return;
            _content = new GameObject("Scroll Content", typeof(RectTransform)).GetComponent<RectTransform>();
            _content.SetParent(_slotRoot, false);
            _content.anchorMin = _content.anchorMax = new Vector2(0.5f, 1f);
            _content.pivot = new Vector2(0.5f, 1f);
            foreach (HotbarSlot slot in _slots)
                if (slot != null) slot.transform.SetParent(_content, false);
            if (_clipMaterial != null)
            {
                _runtimeClipMaterial = new Material(_clipMaterial);
                foreach (Image image in _content.GetComponentsInChildren<Image>(true))
                    image.material = _runtimeClipMaterial;
            }
            _scroll = _slotRoot.gameObject.AddComponent<ScrollRect>();
            _scroll.viewport = _slotRoot;
            _scroll.content = _content;
            _scroll.horizontal = false;
            _scroll.vertical = true;
            _scroll.movementType = ScrollRect.MovementType.Clamped;
            _scroll.scrollSensitivity = 45f;
            _scroll.inertia = false;
        }

        public void ResetScrollForHint()
        {
            if (_scroll == null || !_scroll.enabled) return;
            _scroll.StopMovement();
            _content.anchoredPosition = Vector2.zero;
        }

        public float WidthFraction
        {
            get
            {
                if (Screen.height > Screen.width) return 0f;
                if (_slotRoot == null || Screen.width <= 0) return 0.24f;
                _slotRoot.GetWorldCorners(_corners);
                return Mathf.Clamp01((RectTransformUtility.WorldToScreenPoint(null, _corners[2]).x + 12f) / Screen.width);
            }
        }

        public float TopFraction
        {
            get
            {
                if (_slotRoot == null || Screen.height <= 0 || Screen.width >= Screen.height) return 0f;
                _slotRoot.GetWorldCorners(_corners);
                float top = RectTransformUtility.WorldToScreenPoint(null, _corners[2]).y;
                if (_startButtonRect != null)
                {
                    _startButtonRect.GetWorldCorners(_corners);
                    top = Mathf.Max(top, RectTransformUtility.WorldToScreenPoint(null, _corners[2]).y);
                }
                return top / Screen.height;
            }
        }

        private static void PlaceHud(RectTransform parent, string path, Vector2 anchor, Vector2 size)
        {
            var rect = parent.Find(path) as RectTransform;
            if (rect == null) return;
            rect.anchorMin = rect.anchorMax = anchor;
            rect.pivot = new Vector2(0.5f, 0.5f);
            rect.anchoredPosition = Vector2.zero;
            rect.sizeDelta = size;
            var childLabel = rect.Find(path == "Boss Health" ? "Percent" : "Label") as RectTransform;
            if (childLabel != null)
            {
                childLabel.anchorMin = Vector2.zero;
                childLabel.anchorMax = Vector2.one;
                childLabel.offsetMin = childLabel.offsetMax = Vector2.zero;
                var text = childLabel.GetComponent<TMPro.TMP_Text>();
                if (text != null) { text.enableAutoSizing = true; text.fontSizeMin = 14f; text.fontSizeMax = 64f; }
            }
            var label = rect.GetComponent<TMPro.TMP_Text>();
            if (label != null) { label.enableAutoSizing = true; label.fontSizeMin = 18f; label.fontSizeMax = 48f; }
        }

        public RectTransform SlotTransform(int index)
        {
            if (_slots == null || index < 0 || index >= _slots.Length || _slots[index] == null) return null;
            return (RectTransform)_slots[index].transform;
        }

        public void PulseSlot(int index, bool on)
        {
            RectTransform slot = SlotTransform(index);
            if (slot == null) return;

            slot.DOKill();
            slot.localScale = Vector3.one;
            if (!on) return;

            Tween pulse = slot.DOScale(1.12f, 0.45f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
            _pulses.Add(pulse);
        }

        /// <summary>Lưới đầy: rung thanh và phát âm báo thay vì im lặng nuốt thao tác.</summary>
        public void RejectDrop()
        {
            _audio?.PlayError();
            if (_slotRoot == null) return;

            _slotRoot.DOKill(true);
            _slotRoot.DOShakeAnchorPos(0.35f, new Vector2(14f, 0f), 18).SetEase(Ease.OutQuad);
        }

        private void HandleTouch() => OnSelectionTouched?.Invoke();

        private void HandleTap(int index)
        {
            _audio?.PlayClick();
            OnSlotTapped?.Invoke(SpeciesAt(index));
        }

        private void HandleDragBegin(int index)
        {
            OnSelectionTouched?.Invoke();
            _audio?.PlayClick();
            OnSlotDragBegin?.Invoke(SpeciesAt(index));
        }

        private void OnDestroy()
        {
            foreach (Tween pulse in _pulses) pulse?.Kill();
            _pulses.Clear();
            if (_runtimeClipMaterial != null) Destroy(_runtimeClipMaterial);
        }
    }

}
