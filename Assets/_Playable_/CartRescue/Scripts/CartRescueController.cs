using DG.Tweening;
using Playable.CartRescue.Core;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CartRescue
{
    /// <summary>
    /// Luồng playable "Cart Rescue":
    ///   HangDrop  — kéo nhân vật treo dưới drone xuống sàn xe.
    ///   Balance   — xe nghiêng, nhân vật trượt; kéo xe trái/phải (ở bất kỳ đâu trên màn hình) để quán tính đẩy họ về.
    ///   StartReady— cân xong (mỗi người một ô) → nút START bật ra ngay.
    ///   Driving   — xe tự chạy, camera bám theo; tới đích → Win: camera dừng ở cột cờ, xe chạy tiếp ra khỏi khung,
    ///               màn Win (nền đen, chữ WIN, nút PLAY NOW) + GameManager.ShowWinPanel().
    /// Nhân vật bật khỏi ô (giật xe mạnh) thì quay về Balance.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class CartRescueController : MonoBehaviour
    {
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private PointerInput _input;
        [SerializeField] private CartBody _cart;
        [SerializeField] private DeckRiderView[] _riders;
        [SerializeField] private float[] _initialSlots = { -1f, 0f, 1f };
        [SerializeField] private DeckRiderView _hangRider;
        [SerializeField] private RopeHangView _rope;
        [SerializeField] private TutorialHand _hand;
        [SerializeField] private WorldArrow _pushArrow;
        [SerializeField] private CartRescueCamera _camera;
        [SerializeField] private Button _startButton;
        [SerializeField] private RectTransform _winText;
        // Nền đen phủ màn Win (alpha 0 → _winOverlayAlpha).
        [SerializeField] private Image _winOverlay;
        [SerializeField] private float _winOverlayAlpha = 0.7f;
        // Chữ hướng dẫn bước kéo dây ("DRAG THE ROPE / TO THE CART!"): pop-in lúc mở, phập phồng, ẩn khi thả xuống xe.
        [SerializeField] private RectTransform _ropeHint;
        [SerializeField] private PointerArrow _ropeArrow;
        // Chữ "KEEP YOUR BALANCE!": hiện suốt bước cân xe, ẩn khi cân xong (START hiện).
        [SerializeField] private RectTransform _balanceHint;
        // Nút PLAY NOW ở màn Win: phập phồng + vệt sáng chéo (con của nút, bị Mask theo hình nút) quét ngang lặp lại.
        [SerializeField] private Button _playNow;
        [SerializeField] private RectTransform _playNowShine;
        [SerializeField] private CartEngineAudio _engine;
        [SerializeField] private float _finishX = 40f;
        [SerializeField] private float _finishFlagX = 43.2f;
        [SerializeField] private float _driveSpeed = 7f;
        [SerializeField] private float _dropTargetS = 1.6f;
        [SerializeField] private float _dropBlendTime = 0.2f;
        [SerializeField] private float _dropKick = 1.5f;
        [SerializeField] private float _handHeight = 1f;
        [SerializeField] private float _arrowHeight = 3f;
        [SerializeField] private float _balanceHandTravel = 2f;
        [SerializeField] private AudioSource _sfx;
        [SerializeField] private AudioClip _landClip;
        [SerializeField] private AudioClip _buttonClip;
        [SerializeField] private AudioClip _winClip;

        private CartFlow _flow;
        private bool _grabbingRope;
        private bool _draggingCart;
        private Tween _startPulse;
        private float _dragStartScreenX;
        private float _dragStartWorldX;
        private float _balanceDir = 1f;

        private Vector3 ArrowPoint() => _cart.DeckPointWorld(0f) + Vector3.up * _arrowHeight;

        private void Start()
        {
            for (int i = 0; i < _riders.Length; i++)
            {
                int index = _cart.Deck.Add(_initialSlots[i], 0f, _riders[i].HalfWidth);
                _riders[i].Bind(_cart, index);
            }
            _hangRider.enabled = false;

            _flow = new CartFlow(_finishX);
            _flow.Changed += OnPhase;

            _startButton.onClick.AddListener(OnStartClicked);
            _startButton.gameObject.SetActive(false);
            _winText.gameObject.SetActive(false);
            if (_winOverlay != null) _winOverlay.gameObject.SetActive(false);
            if (_balanceHint != null) _balanceHint.gameObject.SetActive(false);
            if (_playNow != null)
            {
                _playNow.onClick.AddListener(_gameManager.ShowCTA);
                _playNow.gameObject.SetActive(false);
            }
            ShowRopeHint();

            _hand.ShowDrag(() => _rope.RiderCenter, () => _cart.DeckPointWorld(_dropTargetS) + Vector3.up * _handHeight, tapEffect: true);
        }

        private void OnDestroy()
        {
            if (_flow != null) _flow.Changed -= OnPhase;
            _startPulse?.Kill();
            _ropeHintPulse?.Kill();
            _balanceHintPulse?.Kill();
            _playNowPulse?.Kill();
            _shineLoop?.Kill();
        }

        private void Update()
        {
            _input.Poll();
            if (_input.Down || _input.Held) _hand.Touch();

            if (_flow.Phase == CartPhase.HangDrop) HandleRope();
            if (_flow.CartDraggable) HandleCartDrag();
            else if (_draggingCart)
            {
                _draggingCart = false;
                _cart.EndDrag();
            }

            DeckEvent evt = _cart.Simulate(Time.deltaTime);
            // Hướng cần kéo để cân: về phía thấp. Giữ hướng cũ khi xe gần nằm ngang để tay/mũi tên không nhảy qua lại.
            float tilt = _cart.Tilt.Angle * Mathf.Rad2Deg;
            if (Mathf.Abs(tilt) > 1.5f) _balanceDir = tilt > 0f ? 1f : -1f;
            _flow.Tick(_cart.Deck.IsSettled, evt == DeckEvent.Unlocked, _cart.X);
        }

        private void HandleRope()
        {
            if (_input.Down && !_input.OverUI) _grabbingRope = _rope.TryGrab(_input.WorldPos);
            else if (_input.Held && _grabbingRope) _rope.DragTo(_input.WorldPos);

            if (!_input.Up || !_grabbingRope) return;
            _grabbingRope = false;
            if (_rope.Release(_cart, _cart.DeckHalfLength, _hangRider.HalfWidth, out float s)) Drop(s);
        }

        private void Drop(float s)
        {
            int index = _cart.Deck.Add(s, Mathf.Sign(s) * _dropKick, _hangRider.HalfWidth);
            _hangRider.enabled = true;
            _hangRider.Bind(_cart, index);
            _hangRider.BlendIn(_dropBlendTime);
            DOVirtual.DelayedCall(_dropBlendTime, () =>
            {
                _hangRider.PlayLand();
                Play(_landClip);
            });
            _rope.FlyAway();
            HideRopeHint();
            _flow.OnDropped();
        }

        private void HandleCartDrag()
        {
            // Kéo theo quãng di chuyển của ngón tay trên màn hình (không theo toạ độ world qua camera đang bám xe —
            // nếu không, giữ ngón tay đứng yên ở màn dọc sẽ làm xe trôi mãi như cần điều khiển).
            if (_input.Down && !_input.OverUI)
            {
                _draggingCart = true;
                _dragStartScreenX = _input.ScreenPos.x;
                _dragStartWorldX = _input.WorldPos.x;
                _cart.BeginDrag(_dragStartWorldX);
            }
            else if (_input.Held && _draggingCart)
                _cart.Drag(ScreenDrag.WorldX(_dragStartWorldX, _dragStartScreenX, _input.ScreenPos.x, _input.OrthoSize, Screen.height));
            else if (_input.Up && _draggingCart)
            {
                _draggingCart = false;
                _cart.EndDrag();
            }
        }

        private void OnPhase(CartPhase phase)
        {
            if (phase != CartPhase.StartReady) HideStart();
            if (_pushArrow != null)
            {
                if (phase == CartPhase.Balance) _pushArrow.Show(ArrowPoint, () => _balanceDir);
                else _pushArrow.Hide();
            }
            if (phase == CartPhase.Balance) ShowHintText(_balanceHint, ref _balanceHintPulse, 0.35f);
            else HideHintText(_balanceHint, ref _balanceHintPulse);

            switch (phase)
            {
                case CartPhase.Balance:
                    // Hướng dẫn cân xe: kéo xe về phía đang chúc xuống (hướng đổi theo góc nghiêng thực tế).
                    _hand.ShowDrag(
                        () => _cart.DeckPointWorld(0f) + Vector3.up * _handHeight,
                        () => _cart.DeckPointWorld(0f) + new Vector3(_balanceDir * _balanceHandTravel, _handHeight, 0f));
                    break;
                case CartPhase.StartReady:
                    ShowStart();
                    _hand.ShowTap((RectTransform)_startButton.transform);
                    break;
                case CartPhase.Driving:
                    _hand.Hide();
                    Play(_buttonClip);
                    _gameManager.DeferCountdownUntilGameplay();
                    _cart.Drive(_driveSpeed);
                    _camera.Follow(_cart.transform);
                    break;
                case CartPhase.Win:
                    // Camera dừng ở cột cờ đích, xe vẫn chạy tiếp ra khỏi khung hình; tiếng máy nhỏ dần.
                    _camera.HoldAt(_finishFlagX);
                    if (_engine != null) _engine.FadeOut(1.5f);
                    Play(_winClip);
                    _hand.Hide();
                    if (_pushArrow != null) _pushArrow.Hide();
                    ShowWin();
                    _gameManager.ShowWinPanel();
                    break;
            }
        }

        private void OnStartClicked() => _flow.PressStart();


        /// <summary>Màn Win: nền đen mờ dần lên, chữ WIN bật lên ngay (không animation), nút PLAY NOW bật ra.</summary>
        private void ShowWin()
        {
            if (_winOverlay != null)
            {
                _winOverlay.gameObject.SetActive(true);
                Color c = _winOverlay.color;
                c.a = 0f;
                _winOverlay.color = c;
                _winOverlay.DOFade(_winOverlayAlpha, 0.35f).SetEase(Ease.OutQuad);
            }
            _winText.gameObject.SetActive(true);
            ShowPlayNow(0.2f);
        }

        private Tween _playNowPulse;
        private Tween _shineLoop;

        /// <summary>Nút PLAY NOW: bật ra, phập phồng lặp; vệt sáng chéo quét từ trái sang phải, nghỉ rồi lặp lại.</summary>
        private void ShowPlayNow(float delay)
        {
            if (_playNow == null) return;
            var t = (RectTransform)_playNow.transform;
            _playNow.gameObject.SetActive(true);
            t.DOKill();
            t.localScale = Vector3.zero;
            t.DOScale(1f, 0.4f).SetDelay(delay).SetEase(Ease.OutBack).OnComplete(() =>
                _playNowPulse = t.DOScale(1.1f, 0.55f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine));

            if (_playNowShine == null) return;
            float half = t.rect.width * 0.5f + _playNowShine.rect.width * 2f;
            _playNowShine.anchoredPosition = new Vector2(-half, 0f);
            _shineLoop = DOTween.Sequence()
                .AppendInterval(0.5f)
                .Append(_playNowShine.DOAnchorPosX(half, 0.65f).SetEase(Ease.InOutSine))
                .AppendInterval(0.6f)
                .SetDelay(delay + 0.4f)
                .SetLoops(-1, LoopType.Restart)
                .SetTarget(_playNowShine);
        }

        private Tween _ropeHintPulse;

        private Tween _balanceHintPulse;

        private void ShowRopeHint()
        {
            if (_ropeArrow != null) _ropeArrow.Show(() => _rope.RiderCenter + Vector3.up * 0.4f);
            ShowHintText(_ropeHint, ref _ropeHintPulse, 0.2f);
        }

        private void HideRopeHint()
        {
            if (_ropeArrow != null) _ropeArrow.Hide();
            HideHintText(_ropeHint, ref _ropeHintPulse);
        }

        /// <summary>Chữ hướng dẫn: bật ra (OutBack) rồi phập phồng lặp.</summary>
        private static void ShowHintText(RectTransform hint, ref Tween pulse, float delay)
        {
            if (hint == null || (hint.gameObject.activeSelf && pulse != null && pulse.IsActive())) return;
            pulse?.Kill();
            hint.DOKill();
            hint.gameObject.SetActive(true);
            hint.localScale = Vector3.zero;
            Tween loop = hint.DOScale(1.06f, 0.5f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine).Pause();
            pulse = loop;
            hint.DOScale(1f, 0.4f).SetDelay(delay).SetEase(Ease.OutBack).OnComplete(() => loop.Play());
        }

        private static void HideHintText(RectTransform hint, ref Tween pulse)
        {
            if (hint == null || !hint.gameObject.activeSelf) return;
            pulse?.Kill();
            pulse = null;
            hint.DOKill();
            hint.DOScale(0f, 0.2f).SetEase(Ease.InBack).OnComplete(() => hint.gameObject.SetActive(false));
        }

        private void ShowStart()
        {
            Transform t = _startButton.transform;
            _startButton.gameObject.SetActive(true);
            t.DOKill();
            _startPulse?.Kill();
            t.localScale = Vector3.zero;
            t.DOScale(1f, 0.35f).SetEase(Ease.OutBack).OnComplete(() =>
                _startPulse = t.DOScale(1.08f, 0.5f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine));
        }

        private void HideStart()
        {
            _startPulse?.Kill();
            _startButton.transform.DOKill();
            _startButton.gameObject.SetActive(false);
        }

        private void Play(AudioClip clip)
        {
            if (_sfx != null && clip != null) _sfx.PlayOneShot(clip);
        }
    }
}
