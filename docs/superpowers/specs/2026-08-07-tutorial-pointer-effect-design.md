# Tutorial Pointer Effect — Design

Date: 2026-08-07
Author: HuyNQ (via Claude Code)
Related files: `Assets/_Playable_/Scripts/MapController.cs`, new `Assets/_Playable_/Scripts/TutorialPointer.cs`

## Bối cảnh

`MapController` hiện có logic tutorial nội bộ: di chuyển `_targetImage` + `_hand` tới từng
`_spawnPoints[i]`, chạy pulse scale/yoyo cho `_hand` bằng 1 `Tween` đơn (`PlayHandPulse`).
Người dùng cung cấp sẵn 1 class mẫu `TutorialPointer` (dùng `DOTween.Sequence`, di chuyển tay
theo local offset rồi pulse scale+rotate, loop restart vô hạn) và muốn:

1. Chuyển toàn bộ animation "bàn tay hướng dẫn" từ `MapController` sang component
   `TutorialPointer` riêng, gắn trên object `pointer` (theo hierarchy mẫu:
   `pointer > hand > efx, icon`).
2. Trong lúc tay di chuyển/pulse, 1 object `efx` (con của `hand`) chạy scale liên tục
   **0 → 1**, và **restart cùng lúc** mỗi khi cả vòng lặp hand-pulse restart.
3. Có 1 lớp ảnh blur/tối để cô lập UI, hiển thị/ẩn theo **từng spawn point** — không phải
   theo suốt phase tutorial.

## 1. `TutorialPointer.cs` (component mới)

Giữ nguyên interface public đã có trong code mẫu: `Show()`, `Stop()`, `IsPlaying`.

```csharp
public class TutorialPointer : MonoBehaviour
{
    [SerializeField] private RectTransform hand;
    [SerializeField] private RectTransform efx;

    [Header("Hand Move")]
    [SerializeField] private Vector3 handStartOffset = new Vector3(25, -50, 0);
    [SerializeField] private float moveDuration = 0.7f;

    [Header("Hand Pulse")]
    [SerializeField] private float pulseScale = 0.85f;
    [SerializeField] private float pulseDuration = 0.4f;
    [SerializeField] private float pulseRotationZ = 7.5f;
    [SerializeField] private float delayBeforePulse = 0.5f;
    [SerializeField] private float holdAfterPulse = 1f;

    [Header("Efx")]
    [SerializeField] private float efxScaleFrom = 0f;
    [SerializeField] private float efxScaleTo = 1f;
    [SerializeField] private Ease efxEase = Ease.Linear;

    private Sequence animSequence;

    public bool IsPlaying => gameObject.activeSelf;

    public void Show()
    {
        gameObject.SetActive(true);

        animSequence?.Kill();
        animSequence = DOTween.Sequence();

        transform.localScale = Vector3.one;
        transform.localRotation = Quaternion.identity;
        hand.localPosition = handStartOffset;
        hand.localRotation = Quaternion.identity;
        hand.localScale = Vector3.one;

        Sequence handSequence = DOTween.Sequence();
        handSequence.Append(hand.DOLocalMove(Vector3.zero, moveDuration));
        handSequence.AppendInterval(delayBeforePulse).Append(hand.DOScale(pulseScale, pulseDuration));
        handSequence.Join(hand.DOLocalRotate(new Vector3(0, 0, pulseRotationZ), pulseDuration));
        handSequence.AppendInterval(holdAfterPulse);
        handSequence.Append(hand.DOScale(1f, pulseDuration));

        animSequence.Append(handSequence);

        if (efx != null)
        {
            efx.localScale = Vector3.one * efxScaleFrom;
            animSequence.Insert(
                0,
                efx.DOScale(efxScaleTo, handSequence.Duration())
                    .From(efxScaleFrom)
                    .SetEase(efxEase));
        }

        animSequence.SetLoops(-1, LoopType.Restart);
    }

    public void Stop()
    {
        animSequence?.Kill();
        animSequence = null;
        gameObject.SetActive(false);
    }
}
```

Ghi chú:
- `efx` tween được `Insert(0, ...)` vào cùng `animSequence` (không phải sequence con), nên khi
  `animSequence` loop `Restart`, `efx` tự reset và chạy lại đồng bộ với `handSequence` mà không
  cần logic loop riêng.
- Thời lượng `efx` tween = `handSequence.Duration()`, luôn khớp 1 vòng lặp hand, không hard-code
  số giây riêng — đổi timing hand không cần sửa efx.
- `efx == null` thì bỏ qua (không bắt buộc phải có efx).

## 2. Tích hợp vào `MapController.cs`

**Xóa** khỏi `MapController`: field `_hand`, `_handPulseScale`, `_handPulseDuration`,
`_handPulseEase`, `_handBaseScale`, `_handTween`, method `PlayHandPulse()`.

**Thêm**: `[SerializeField] private TutorialPointer _tutorialPointer;`

Thay đổi hành vi:
- `MoveTargetToPoint`: giữ nguyên phần set `_targetImage`; phần set vị trí tay đổi từ
  `_hand.position = ...` sang `_tutorialPointer.transform.position = ...` (+ áp `_handOffset`
  qua `anchoredPosition` của `(RectTransform)_tutorialPointer.transform`, như cách cũ áp cho
  `_hand`).
- `ShowTutorialPoint`: `PlayHandPulse()` → `_tutorialPointer.Show()`.
- `EnterGameplay`: `_handTween?.Kill(); _handTween = null;` → `_tutorialPointer.Stop();`.
- `ShowTutorialUI(false)`: bỏ nhánh toggle `_hand.gameObject`, thay bằng gọi
  `_tutorialPointer.Stop()` nếu đang `IsPlaying` (đủ để tắt cả gameobject + animation).
- `OnDestroy`: bỏ `_handTween?.Kill()`, thay bằng `_tutorialPointer?.Stop()` để dọn sequence khi
  scene unload.

## 3. Blur theo từng spawn point

**Thêm**: `[SerializeField] private List<GameObject> _tutorialBlurs;` — song song index với
`_spawnPoints` (point thứ *i* dùng `_tutorialBlurs[i]`). Không đổi cấu trúc `_spawnPoints` hiện
có để tránh phải gán lại dữ liệu Inspector đã setup.

Hành vi:
- `ShowTutorialPoint(index)`: bật `_tutorialBlurs[index]` (bỏ qua an toàn nếu index vượt quá
  size list hoặc phần tử null — dùng helper `GetBlur(index)` tương tự `GetSpawnPoint(index)`).
- `HandleTutorialTap`: ngay khi xác định tap trúng target (trước khi gọi `TrySpawnMonster` /
  `AdvanceTutorial`), tắt `_tutorialBlurs[_currentSpawnIndex]` ngay lập tức.
- `AdvanceTutorial` → `ShowTutorialPoint(next)` bật blur của point kế tiếp (đã tắt blur cũ ở
  bước tap phía trên, không bị chồng 2 blur).
- `EnterGameplay`: tắt toàn bộ blur còn active trong `_tutorialBlurs` (phòng trường hợp thoát
  tutorial giữa chừng, ví dụ có nút Skip trong tương lai).

## Data flow tổng quát (1 spawn point)

```
SelectMonster (lần đầu)
  → BeginTutorial → ShowTutorialPoint(0)
        → raycast ground, ShowVfx
        → MoveTargetToPoint (targetImage + pointer position)
        → _tutorialPointer.Show()   // hand move+pulse, efx scale 0→1, loop restart
        → bật _tutorialBlurs[0]
  → player tap trúng target
        → tắt _tutorialBlurs[0]
        → TrySpawnMonster
        → AdvanceTutorial → ShowTutorialPoint(1) → ... lặp lại
  → hết _spawnPoints → EnterGameplay
        → _tutorialPointer.Stop()
        → tắt hết _tutorialBlurs còn active
        → ShowTutorialUI(false)
```

## Error handling

- Thiếu `_tutorialPointer` trong Inspector: các lệnh gọi `_tutorialPointer.Show()/Stop()` sẽ
  NullReferenceException — chấp nhận rủi ro này giống các field bắt buộc khác trong
  `MapController` hiện tại (`_prefabMonster`, `_targetImage`...) không có null-check, giữ nhất
  quán style code hiện có thay vì thêm defensive check khắp nơi.
- `_tutorialBlurs` ngắn hơn `_spawnPoints` hoặc phần tử `null`: bỏ qua, không log warning (tương
  tự cách `GetSpawnPoint` xử lý index ngoài range).
- `efx == null` trong `TutorialPointer`: bỏ qua tween efx, phần hand vẫn chạy bình thường.

## Testing

Đây là animation/UI logic phụ thuộc DOTween + UGUI runtime, không có unit test tự động trong
project. Kiểm thử thủ công trong Editor:

1. Play scene có tutorial, chọn quái → xác nhận tay di chuyển, pulse, `efx` scale 0→1 lặp lại
   đúng nhịp với tay (quan sát bằng mắt qua Scene/Game view khi Time.timeScale giảm nếu cần soi
   kỹ).
2. Tap trúng target → blur point hiện tại tắt ngay, point kế tiếp lộ blur mới, không bị chồng 2
   blur cùng lúc.
3. Tap hết toàn bộ `_spawnPoints` → vào `Phase.Gameplay`, `_tutorialPointer` dừng hẳn
   (`gameObject.activeSelf == false`), không còn blur nào active.
4. Trường hợp `_spawnPoints.Count == 0` (bỏ qua tutorial ngay từ `Start`) → không có blur/tay
   nào xuất hiện, vào thẳng gameplay như hành vi cũ.
