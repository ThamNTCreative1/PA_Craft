using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.BrainrotPlayground
{
    /// <summary>
    /// Luồng playable "Brainrot Playground":
    ///   Sân chơi top-down với các Brainrot đi lang thang + bảng chọn nhân vật; bàn tay hướng dẫn bấm vào 1 ô.
    ///   Người chơi chạm bất kỳ đâu trên màn hình → nhân vật (ô được chạm, hoặc ô hướng dẫn) rơi xuống sân
    ///   và mở store ngay trong lần chạm đó. Các lần chạm sau (nút chặn của GameManager) tiếp tục mở store.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class BrainrotPlaygroundController : MonoBehaviour
    {
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private PlaygroundCamera _camera;
        [SerializeField] private PlaygroundHudLayout _layout;
        [SerializeField] private TapCatcher _tapCatcher;

        [SerializeField] private RectTransform[] _slots;
        [SerializeField] private Image[] _slotFrames;
        [SerializeField] private Sprite _slotNormal;
        [SerializeField] private Sprite _slotSelected;

        [SerializeField] private RectTransform _title;
        [SerializeField] private RectTransform _subtitle;
        [SerializeField] private RectTransform _arrow;
        // Ảnh mũi tên (con của _arrow, anchor phủ kín khung). Layout đặt vị trí/xoay khung _arrow; ở đây chỉ trượt
        // ảnh con theo anchor (tỉ lệ kích thước) nên đổi hướng màn hình / độ phân giải không lệch.
        [SerializeField] private RectTransform _arrowBody;
        [SerializeField] private float _arrowTravel = 0.3f;
        [SerializeField] private float _arrowTime = 0.4f;
        [SerializeField] private RectTransform _hand;
        // Hiệu ứng nhấn của bàn tay hướng dẫn: vòng sóng + các vạch sáng toả ra từ đầu ngón tay.
        [SerializeField] private RectTransform _tapFx;
        [SerializeField] private Image _tapRing;
        [SerializeField] private Image[] _tapRays;

        // Mỗi ô có sẵn 1 nhân vật ẩn (song song với _slots); chọn ô nào thì bật nhân vật đó.
        [SerializeField] private BrainrotWalker[] _spawns;

        [SerializeField] private AudioSource _audio;
        [SerializeField] private AudioClip _click;
        [SerializeField] private AudioClip _spawnClip;

        private bool _chosen;
        private Sequence _handLoop;
        private Tween _arrowLoop;
        private const float TextPulse = 1.08f;
        private const float TextPulseTime = 0.5f;

        private Tween _subtitleLoop;
        private Tween _slotLoop;

        private void Start()
        {
            if (_tapCatcher != null) _tapCatcher.Tapped += OnTapped;
            if (_spawns != null)
                for (int i = 0; i < _spawns.Length; i++)
                    if (_spawns[i] != null) _spawns[i].gameObject.SetActive(false);

            int target = TargetIndex();
            if (_slotFrames != null && target < _slotFrames.Length && _slotFrames[target] != null)
                _slotFrames[target].sprite = _slotSelected;

            PopIn(_title, 0.1f);
            PopIn(_subtitle, 0.25f);
            // Chỉ "TAP HERE!" phập phồng; tiêu đề đứng yên sau khi pop-in.
            _subtitleLoop = _subtitle.DOScale(TextPulse, TextPulseTime).SetDelay(0.7f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
            _arrowLoop = ArrowNudge();
            StartHand();
        }

        private void OnDestroy()
        {
            if (_tapCatcher != null) _tapCatcher.Tapped -= OnTapped;
            KillLoops();
        }

        // ------------------------------------------------------------------ tutorial

        /// <summary>
        /// Bàn tay nhấn 2 lần liên tiếp rồi nghỉ. Mỗi lần nhấn: tay co lại + nghiêng nhẹ, đúng lúc chạm thì
        /// bung hiệu ứng (vòng sóng lan ra + các vạch sáng vàng toả quanh đầu ngón tay) và ô được nhấn nảy nhẹ.
        /// </summary>
        private void StartHand()
        {
            _hand.gameObject.SetActive(true);
            HideTapFx();
            _handLoop = DOTween.Sequence();
            for (int i = 0; i < 2; i++)
            {
                _handLoop.Append(_hand.DOScale(0.8f, 0.16f).SetEase(Ease.OutQuad))
                    .Join(_hand.DOLocalRotate(new Vector3(0f, 0f, 8f), 0.16f).SetEase(Ease.OutQuad))
                    .AppendCallback(PlayTapFx)
                    .AppendInterval(0.06f)
                    .Append(_hand.DOScale(1f, 0.22f).SetEase(Ease.OutBack))
                    .Join(_hand.DOLocalRotate(Vector3.zero, 0.22f).SetEase(Ease.OutQuad))
                    .AppendInterval(i == 0 ? 0.12f : 0.7f);
            }
            _handLoop.SetLoops(-1);
        }

        private void PlayTapFx()
        {
            if (_tapFx == null) return;
            _tapFx.gameObject.SetActive(true);
            if (_tapRing != null)
            {
                RectTransform ring = _tapRing.rectTransform;
                ring.DOKill();
                _tapRing.DOKill();
                ring.localScale = Vector3.one * 0.25f;
                _tapRing.color = WithAlpha(_tapRing.color, 0.9f);
                ring.DOScale(1.25f, 0.45f).SetEase(Ease.OutCubic);
                _tapRing.DOFade(0f, 0.45f).SetEase(Ease.InQuad);
            }
            if (_tapRays != null)
                for (int i = 0; i < _tapRays.Length; i++)
                {
                    Image ray = _tapRays[i];
                    if (ray == null) continue;
                    RectTransform rect = ray.rectTransform;
                    rect.DOKill();
                    ray.DOKill();
                    rect.localScale = new Vector3(1f, 0f, 1f);
                    ray.color = WithAlpha(ray.color, 1f);
                    DOTween.Sequence()
                        .Append(rect.DOScaleY(1f, 0.12f).SetEase(Ease.OutBack))
                        .AppendInterval(0.12f)
                        // Thu vạch lại (không fade vì viền Outline không mờ theo màu Image).
                        .Append(rect.DOScaleY(0f, 0.18f).SetEase(Ease.InQuad))
                        .SetTarget(rect);
                }
            int target = TargetIndex();
            if (target < _slots.Length && !_chosen)
            {
                _slotLoop?.Kill();
                _slots[target].localScale = Vector3.one;
                _slotLoop = _slots[target].DOPunchScale(Vector3.one * -0.08f, 0.25f, 6, 0.5f);
            }
        }

        private void HideTapFx()
        {
            if (_tapFx != null) _tapFx.gameObject.SetActive(false);
        }

        private static Color WithAlpha(Color c, float a)
        {
            c.a = a;
            return c;
        }

        /// <summary>
        /// Mũi tên trượt tới-lui về phía bảng chọn. Ảnh gốc chỉ sang trái (-X cục bộ); khung đã xoay theo hướng màn
        /// hình nên dời anchor về -X luôn là "đi vào bảng" (ngang: sang trái, dọc: xuống dưới).
        /// </summary>
        private Tween ArrowNudge()
        {
            if (_arrowBody == null) return null;
            return DOVirtual.Float(0f, _arrowTravel, _arrowTime, v =>
                {
                    _arrowBody.anchorMin = new Vector2(-v, 0f);
                    _arrowBody.anchorMax = new Vector2(1f - v, 1f);
                })
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .SetTarget(_arrowBody);
        }

        private void KillLoops()
        {
            HideTapFx();
            _handLoop?.Kill();
            _arrowLoop?.Kill();
            _subtitleLoop?.Kill();
            _slotLoop?.Kill();
        }

        // ------------------------------------------------------------------ input

        private void OnTapped(Vector2 screen)
        {
            if (_chosen)
            {
                if (_gameManager != null) _gameManager.ShowCTA();
                return;
            }
            _chosen = true;

            int index = SlotAt(screen);
            if (index < 0) index = TargetIndex();
            Choose(index);

            // Mở store ngay trong lần chạm (giữ "user gesture" cho mạng quảng cáo chặn popup).
            if (_gameManager != null)
            {
                _gameManager.EndGame();
                _gameManager.ShowCTA();
            }
        }

        private void Choose(int index)
        {
            KillLoops();
            Play(_click, 0.9f);

            for (int i = 0; i < _slots.Length; i++) _slots[i].localScale = Vector3.one;
            if (_slotFrames != null)
                for (int i = 0; i < _slotFrames.Length; i++)
                    if (_slotFrames[i] != null) _slotFrames[i].sprite = i == index ? _slotSelected : _slotNormal;
            if (index < _slots.Length) _slots[index].DOPunchScale(Vector3.one * 0.2f, 0.35f, 8, 0.6f);

            _hand.gameObject.SetActive(false);
            Fade(_arrow);
            Fade(_title);
            Fade(_subtitle);

            SpawnBrainrot(index);
        }

        private void SpawnBrainrot(int index)
        {
            if (_spawns == null || _spawns.Length == 0) return;
            BrainrotWalker spawn = _spawns[Mathf.Clamp(index, 0, _spawns.Length - 1)];
            if (spawn == null) return;

            Vector2 viewport = _layout != null ? _layout.PlayViewportCenter : new Vector2(0.5f, 0.5f);
            Camera cam = _camera != null ? _camera.Camera : Camera.main;
            Vector3 world = cam.ViewportToWorldPoint(new Vector3(viewport.x, viewport.y, 10f));
            spawn.transform.position = new Vector3(world.x, world.y, 0f);
            spawn.gameObject.SetActive(true);
            spawn.PlayDrop();
            DOVirtual.DelayedCall(0.35f, () => Play(_spawnClip, 1f), false);
        }

        private int SlotAt(Vector2 screen)
        {
            for (int i = 0; i < _slots.Length; i++)
                if (_slots[i] != null && RectTransformUtility.RectangleContainsScreenPoint(_slots[i], screen, null))
                    return i;
            return -1;
        }

        private int TargetIndex()
        {
            int target = _layout != null ? _layout.TargetSlot : 0;
            return Mathf.Clamp(target, 0, Mathf.Max(0, _slots.Length - 1));
        }

        // ------------------------------------------------------------------ helpers

        private void Play(AudioClip clip, float volume)
        {
            if (_audio == null || clip == null) return;
            _audio.PlayOneShot(clip, volume);
        }

        private static void PopIn(RectTransform rect, float delay)
        {
            if (rect == null) return;
            rect.localScale = Vector3.zero;
            rect.DOScale(1f, 0.4f).SetDelay(delay).SetEase(Ease.OutBack);
        }

        private static void Fade(RectTransform rect)
        {
            if (rect == null) return;
            rect.DOKill();
            rect.DOScale(0f, 0.2f).SetEase(Ease.InBack).OnComplete(() => rect.gameObject.SetActive(false));
        }
    }
}
