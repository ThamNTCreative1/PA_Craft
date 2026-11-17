using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CartRescue
{
    /// <summary>
    /// Luồng "chọn map" đặt trước màn chơi:
    ///   1. Bảng CHOOSE YOUR MAP (4 thẻ). Bàn tay hướng dẫn lần lượt chạm vào từng thẻ, thẻ được chỉ sáng viền vàng.
    ///   2. Chạm một thẻ → ẩn bảng, bật bối cảnh map đó, hiện màn chơi tĩnh (xe, nhân vật, drone, cổng GOAL) + chữ
    ///      RESCUE THEM ALL! / DRAG • DROP • MOVE + 2 khung chú thích; bàn tay hướng dẫn kéo nhân vật vào xe.
    ///   3. Chạm bất kỳ đâu → mở store (GameManager.ShowCTA). Đồng hồ HUD đếm ngược GameManager.EndTime (30s) từ lúc vào
    ///      màn chơi; hết giờ GameManager tự mở store (_storeOnEndTime). Nếu chưa chọn map, bộ đếm từ lúc mở game vẫn chạy.
    /// CartRescueController chạy ở chế độ showcase (chỉ dựng xe/nhân vật, không nhận thao tác).
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class MapSelectFlow : MonoBehaviour
    {
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private Camera _camera;
        [SerializeField] private CartRescueCamera _cameraFit;
        [SerializeField] private Light _light;
        [SerializeField] private GameObject _room;
        [SerializeField] private MapTheme[] _themes;
        [SerializeField] private CanvasGroup _selectPanel;
        [SerializeField] private Button[] _cards;
        [SerializeField] private Image[] _cardFrames;
        [SerializeField] private Color _frameNormal = Color.white;
        [SerializeField] private Color _frameHighlight = new Color(1f, 0.82f, 0.1f);
        [SerializeField] private TutorialHand _hand;
        [SerializeField] private RopeHangView _rope;
        [SerializeField] private CartBody _cart;
        [SerializeField] private float _dropTargetS = 1.6f;
        [SerializeField] private RectTransform[] _showcaseUi;
        // Ô số đồng hồ trên HUD (đếm ngược từ GameManager.EndTime về 0).
        [SerializeField] private TMP_Text _timerText;
        [SerializeField] private float _cardHintInterval = 1f;
        [SerializeField] private Rect _showcaseFocus = new Rect(-11.3f, -1f, 27f, 14f);
        [SerializeField] private Rect _showcasePortraitFocus = new Rect(-5f, -1f, 18.5f, 14f);

        private int _hintIndex = -1;
        private float _hintTimer;
        private bool _chosen;
        private float _ctaArmedAt = float.MaxValue;
        private float _countdownEnd = -1f;
        private int _shownSeconds = -1;

        private void Start()
        {
            foreach (MapTheme t in _themes)
                if (t != null) t.gameObject.SetActive(false);
            if (_room != null) _room.SetActive(true);
            else if (_themes.Length > 0) _themes[0].Apply(_camera, _light);   // nền sau bảng chọn = map đầu tiên
            _cameraFit.Showcase(_showcaseFocus, _showcasePortraitFocus);
            foreach (RectTransform r in _showcaseUi)
                if (r != null) r.gameObject.SetActive(false);
            _selectPanel.gameObject.SetActive(true);
            _selectPanel.alpha = 1f;
            for (int i = 0; i < _cards.Length; i++)
            {
                int index = i;
                _cards[i].onClick.AddListener(() => Choose(index));
            }
            for (int i = 0; i < _cardFrames.Length; i++) _cardFrames[i].color = _frameNormal;
            NextCardHint();
        }

        private void Update()
        {
            if (!_chosen)
            {
                _hintTimer += Time.deltaTime;
                if (_hintTimer >= _cardHintInterval) NextCardHint();
                return;
            }
            UpdateTimer();
            if (Time.time >= _ctaArmedAt && Input.GetMouseButtonDown(0)) OpenStore();
        }

        /// <summary>Kết thúc game (Luna GameEnded) rồi mới mở store — đúng thứ tự Luna yêu cầu.</summary>
        private void OpenStore()
        {
            if (!_gameManager.HasEnded) _gameManager.EndGame();
            _gameManager.ShowCTA();
        }

        /// <summary>Hiển thị số giây còn lại (làm tròn lên, dừng ở 0) — chỉ cập nhật chữ khi số giây đổi.</summary>
        private void UpdateTimer()
        {
            if (_timerText == null || _countdownEnd < 0f) return;
            int seconds = Mathf.Max(0, Mathf.CeilToInt(_countdownEnd - Time.time));
            if (seconds == _shownSeconds) return;
            _shownSeconds = seconds;
            _timerText.text = seconds.ToString();
        }

        /// <summary>
        /// Bàn tay chuyển sang thẻ kế tiếp và chạm vào với hiệu ứng tap. Viền vàng KHÔNG đổi ở bước hướng dẫn — chỉ khi
        /// người chơi thật sự chọn thẻ (Choose).
        /// </summary>
        private void NextCardHint()
        {
            _hintTimer = 0f;
            _hintIndex = (_hintIndex + 1) % _cards.Length;
            _hand.ShowTap((RectTransform)_cards[_hintIndex].transform, tapEffect: true);
        }

        private void Choose(int index)
        {
            if (_chosen) return;
            _chosen = true;
            for (int i = 0; i < _cardFrames.Length; i++)
                _cardFrames[i].color = i == index ? _frameHighlight : _frameNormal;
            _hand.Hide();
            Transform card = _cards[index].transform;
            card.DOKill();
            card.DOScale(1.08f, 0.15f).SetLoops(2, LoopType.Yoyo);

            _selectPanel.blocksRaycasts = false;
            _selectPanel.DOFade(0f, 0.3f).SetDelay(0.2f).OnComplete(() =>
            {
                _selectPanel.gameObject.SetActive(false);
                ShowGameplay(index);
            });
        }

        private void ShowGameplay(int index)
        {
            if (_room != null) _room.SetActive(false);
            for (int i = 0; i < _themes.Length; i++)
                if (_themes[i] != null && i != index) _themes[i].gameObject.SetActive(false);
            _themes[index].Apply(_camera, _light);
            _cameraFit.Showcase(_showcaseFocus, _showcasePortraitFocus);

            for (int i = 0; i < _showcaseUi.Length; i++)
            {
                RectTransform r = _showcaseUi[i];
                if (r == null) continue;
                r.gameObject.SetActive(true);
                r.DOKill();
                r.localScale = Vector3.zero;
                r.DOScale(1f, 0.35f).SetDelay(0.1f + i * 0.12f).SetEase(Ease.OutBack);
            }
            _hand.ShowDrag(() => _rope.RiderCenter, () => _cart.DeckPointWorld(_dropTargetS) + Vector3.up, tapEffect: true);
            _ctaArmedAt = Time.time + 0.4f;

            // Bắt đầu đếm ngược 30s kể từ lúc vào màn chơi (khởi động lại bộ đếm của GameManager → hết giờ mở store).
            _gameManager.BeginGameplayCountdown();
            _countdownEnd = Time.time + _gameManager.EndTime;
            UpdateTimer();
        }
    }
}
