using System.Collections;
using UnityEngine;
using UnityEngine.UI;

#if UNITY_EDITOR || LUNA
using Luna.Unity;
#endif

/// <summary>
/// Điều khiển bàn tay hướng dẫn (Tutorial Hand) trong giao diện UI (uGUI):
/// - Lần lượt di chuyển qua từng ảnh (Card 1 -> Card 2 -> Card 3 -> Card 4...).
/// - Tại MỖI ẢNH: Dừng lại và thực hiện hành động CLICK (nhấn xuống, card nảy nhẹ, nhả lên, dừng lại).
/// - Tự động lặp lại chu trình tuần hoàn nếu người chơi chưa chạm vào màn hình.
/// Tối ưu hóa chuẩn cho Unity Luna Playable Ads.
/// </summary>
[RequireComponent(typeof(RectTransform))]
public class HandTutorialUI : MonoBehaviour
{
    public static HandTutorialUI Instance { get; private set; }

    [Header("--- Cards Reference ---")]
    [Tooltip("Danh sách các Card UI (RectTransform) theo thứ tự Card 1, 2, 3, 4")]
    [SerializeField] private RectTransform[] cards;

    [Header("--- Sequence & Movement ---")]
    [Tooltip("Chỉ số card bắt đầu tutorial (0 tương ứng Card 1 / Ảnh 1)")]
    [SerializeField] private int startCardIndex = 0;

    [Tooltip("Khoảng cách lệch từ tâm Card đến bàn tay (để đầu ngón trỏ chỉ chuẩn vào tâm card)")]
    [SerializeField] private Vector2 handOffset = new Vector2(40f, -100f);

    [Tooltip("Có di chuyển mượt mà từ vị trí ban đầu đến Card đầu tiên không?")]
    [SerializeField] private bool smoothMoveToTarget = true;

    [Tooltip("Thời gian di chuyển ban đầu đến Card đầu tiên (giây)")]
    [SerializeField] private float moveDuration = 0.35f;

    [Tooltip("Độ trễ trước khi bắt đầu tutorial khi vừa vào game (giây)")]
    [SerializeField] private float startDelay = 0.2f;

    [Tooltip("Thời gian lướt di chuyển giữa các card (giây)")]
    [SerializeField] private float moveBetweenCardsDuration = 0.45f;

    [Tooltip("Thời gian dừng lại ở card trước khi click (giây)")]
    [SerializeField] private float pauseBeforeClick = 0.15f;

    [Tooltip("Thời gian dừng lại ở card sau khi click xong (giây)")]
    [SerializeField] private float pauseAfterClick = 0.2f;

    [Header("--- Click / Tap Animation ---")]
    [Tooltip("Số lần click tại MỖI ảnh (mặc định = 1)")]
    [SerializeField] private int clicksPerCard = 1;

    [Tooltip("Tỉ lệ scale khi ngón tay nhấn xuống (ví dụ 0.82)")]
    [SerializeField] private float clickScaleMultiplier = 0.82f;

    [Tooltip("Thời gian ngón tay nhấn xuống (giây)")]
    [SerializeField] private float pressDuration = 0.15f;

    [Tooltip("Thời gian ngón tay nhả lên (giây)")]
    [SerializeField] private float releaseDuration = 0.15f;

    [Tooltip("Thời gian nghỉ giữa các lần click nếu clicksPerCard > 1")]
    [SerializeField] private float delayBetweenClicks = 0.25f;

    [Header("--- Card Reaction (Juice) ---")]
    [Tooltip("Card có nảy nhẹ (scale punch) theo nhịp click của bàn tay không?")]
    [SerializeField] private bool punchCardOnTap = true;

    [Tooltip("Tỉ lệ co của card khi được click")]
    [SerializeField] private float cardPunchScale = 0.95f;

    [Header("--- Loop & Control ---")]
    [Tooltip("Tự động lặp lại chu trình nếu người chơi chưa chạm")]
    [SerializeField] private bool loopSequence = true;

    [Tooltip("Thời gian chờ trước khi bắt đầu vòng lặp mới (giây)")]
    [SerializeField] private float loopDelay = 0.35f;

    [Tooltip("Tự động chạy tutorial khi game khởi động")]
    [SerializeField] private bool playOnStart = true;

    [Tooltip("Tự động ẩn bàn tay khi người chơi chạm/click vào màn hình")]
    [SerializeField] private bool hideOnTouch = true;

    // Runtime state
    private RectTransform _rectTransform;
    private Vector3 _initialHandScale = Vector3.one;
    private Vector3[] _initialCardScales;
    private Coroutine _tutorialCoroutine;
    private RectTransform _currentTargetCard;
    private bool _isPlaying = false;
    private int _selectedCardIndex = -1;

    public int SelectedCardIndex => _selectedCardIndex;
    public RectTransform CurrentTargetCard => _currentTargetCard;
    public bool IsPlaying => _isPlaying;

#if UNITY_EDITOR
    private void OnValidate()
    {
        if (moveBetweenCardsDuration <= 0f) moveBetweenCardsDuration = 0.45f;
        if (pauseBeforeClick <= 0f) pauseBeforeClick = 0.15f;
        if (pauseAfterClick <= 0f) pauseAfterClick = 0.2f;
        if (clicksPerCard <= 0) clicksPerCard = 1;
        if (pressDuration <= 0f) pressDuration = 0.15f;
        if (releaseDuration <= 0f) releaseDuration = 0.15f;
        if (moveDuration <= 0f) moveDuration = 0.35f;
        if (clickScaleMultiplier <= 0f) clickScaleMultiplier = 0.82f;
        if (cardPunchScale <= 0f) cardPunchScale = 0.95f;
    }
#endif

    private void Awake()
    {
        if (Instance == null) Instance = this;
        _rectTransform = GetComponent<RectTransform>();
        _initialHandScale = _rectTransform.localScale;

        CacheCardScales();
    }

    private void Start()
    {
        if (playOnStart)
        {
            PlayTutorial();
        }
    }

    private void Update()
    {
        if (!_isPlaying) return;

        // Tự động ẩn tutorial khi người chơi chạm/click vào màn hình
        if (hideOnTouch)
        {
            if (Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began))
            {
                HideTutorial();
            }
        }
    }

    /// <summary>
    /// Ghi nhớ scale gốc của tất cả card để phục hồi chuẩn xác khi cần.
    /// </summary>
    private void CacheCardScales()
    {
        if (cards == null || cards.Length == 0) return;

        _initialCardScales = new Vector3[cards.Length];
        for (int i = 0; i < cards.Length; i++)
        {
            if (cards[i] != null)
                _initialCardScales[i] = cards[i].localScale;
            else
                _initialCardScales[i] = Vector3.one;
        }
    }

    /// <summary>
    /// Bắt đầu tutorial: Di chuyển lần lượt qua các ảnh, dừng lại và click ở mỗi ảnh.
    /// </summary>
    public void PlayTutorial()
    {
        PlayTutorialFromCard(startCardIndex);
    }

    /// <summary>
    /// Bắt đầu tutorial xuất phát từ một card chỉ định.
    /// </summary>
    public void PlayTutorialFromCard(int startIndex)
    {
        if (cards == null || cards.Length == 0)
        {
            Debug.LogWarning("[HandTutorialUI] Chưa gán Card nào trong mảng Cards!");
            return;
        }

        if (startIndex < 0 || startIndex >= cards.Length)
        {
            startIndex = 0;
        }

        startCardIndex = startIndex;
        gameObject.SetActive(true);

        if (_tutorialCoroutine != null)
        {
            StopCoroutine(_tutorialCoroutine);
        }

        _tutorialCoroutine = StartCoroutine(TutorialRoutine());
    }

    /// <summary>
    /// Chu trình chính: Di chuyển tuần tự qua từng ảnh, dừng lại và click ở MỖI ẢNH -> Lặp lại.
    /// </summary>
    private IEnumerator TutorialRoutine()
    {
        _isPlaying = true;
        _rectTransform.localScale = _initialHandScale;

        if (startDelay > 0f)
        {
            yield return new WaitForSeconds(startDelay);
        }

        if (cards == null || cards.Length == 0) yield break;

        int firstIndex = Mathf.Clamp(startCardIndex, 0, cards.Length - 1);
        RectTransform firstCard = cards[firstIndex];
        if (firstCard == null) yield break;

        float moveDur = moveDuration > 0.01f ? moveDuration : 0.35f;
        float moveBetweenDur = moveBetweenCardsDuration > 0.01f ? moveBetweenCardsDuration : 0.45f;
        float pauseBefore = pauseBeforeClick > 0.01f ? pauseBeforeClick : 0.15f;
        float pauseAfter = pauseAfterClick > 0.01f ? pauseAfterClick : 0.2f;
        int clickCount = clicksPerCard > 0 ? clicksPerCard : 1;

        // 1. Di chuyển ban đầu đến card đầu tiên (Ảnh 1)
        if (smoothMoveToTarget && moveDur > 0f)
        {
            yield return MoveToCardRoutine(firstCard, moveDur);
        }
        else
        {
            _currentTargetCard = firstCard;
            _rectTransform.localPosition = CalculateTargetLocalPosition(firstCard);
        }

        bool isFirstStep = true;

        // 2. Vòng lặp tuần tự qua TẤT CẢ các ảnh
        while (_isPlaying)
        {
            for (int i = 0; i < cards.Length; i++)
            {
                if (!_isPlaying) yield break;

                int cardIndex = (firstIndex + i) % cards.Length;
                RectTransform targetCard = cards[cardIndex];
                if (targetCard == null) continue;

                _selectedCardIndex = cardIndex;

                // Nếu không phải là bước đầu tiên (đã đứng sẵn ở card đầu), thì di chuyển mượt sang targetCard
                if (!isFirstStep)
                {
                    yield return MoveToCardRoutine(targetCard, moveBetweenDur);
                }
                isFirstStep = false;

                // 2.1. DỪNG LẠI một nhịp trước khi click
                if (pauseBefore > 0f)
                {
                    yield return new WaitForSeconds(pauseBefore);
                }

                // 2.2. THỰC HIỆN HÀNH ĐỘNG CLICK TẠI ẢNH NÀY
                for (int c = 0; c < clickCount; c++)
                {
                    if (!_isPlaying) yield break;
                    yield return PlayClickRoutine(targetCard, cardIndex);

                    if (c < clickCount - 1 && delayBetweenClicks > 0f)
                    {
                        yield return new WaitForSeconds(delayBetweenClicks);
                    }
                }

                // 2.3. DỪNG LẠI một nhịp sau khi click xong
                if (pauseAfter > 0f)
                {
                    yield return new WaitForSeconds(pauseAfter);
                }
            }

            // Kết thúc 1 vòng chu trình qua tất cả các ảnh
            if (!loopSequence)
            {
                break;
            }

            float loopWait = loopDelay > 0f ? loopDelay : 0.35f;
            yield return new WaitForSeconds(loopWait);
        }
    }

    /// <summary>
    /// Di chuyển mượt mà bàn tay đến vị trí của targetCard bằng SmoothStep easing.
    /// </summary>
    private IEnumerator MoveToCardRoutine(RectTransform targetCard, float duration)
    {
        if (targetCard == null) yield break;

        _currentTargetCard = targetCard;
        Vector3 startLocalPos = _rectTransform.localPosition;
        float elapsed = 0f;

        while (elapsed < duration)
        {
            if (!_isPlaying) yield break;

            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / duration);
            float smoothT = Mathf.SmoothStep(0f, 1f, t);

            Vector3 targetLocalPos = CalculateTargetLocalPosition(targetCard);
            _rectTransform.localPosition = Vector3.Lerp(startLocalPos, targetLocalPos, smoothT);
            yield return null;
        }

        _rectTransform.localPosition = CalculateTargetLocalPosition(targetCard);
    }

    /// <summary>
    /// Thực hiện hiệu ứng click: Bàn tay nhấn xuống, card nảy nhẹ (scale punch), giữ đầm rồi nhả lên.
    /// </summary>
    private IEnumerator PlayClickRoutine(RectTransform targetCard, int cardIndex)
    {
        if (targetCard == null) yield break;

        _currentTargetCard = targetCard;

        Vector3 cardBaseScale = (cardIndex >= 0 && _initialCardScales != null && cardIndex < _initialCardScales.Length)
            ? _initialCardScales[cardIndex]
            : targetCard.localScale;

        float pDuration = pressDuration > 0.01f ? pressDuration : 0.15f;
        float rDuration = releaseDuration > 0.01f ? releaseDuration : 0.15f;
        float scaleMultiplier = clickScaleMultiplier > 0.01f ? clickScaleMultiplier : 0.82f;
        float punchScale = cardPunchScale > 0.01f ? cardPunchScale : 0.95f;

        Vector3 pressedHandScale = _initialHandScale * scaleMultiplier;
        Vector3 pressedCardScale = cardBaseScale * punchScale;

        // Giai đoạn 1: Ngón tay nhấn xuống (Press)
        float pressElapsed = 0f;
        while (pressElapsed < pDuration)
        {
            if (!_isPlaying) yield break;

            pressElapsed += Time.deltaTime;
            float t = Mathf.Clamp01(pressElapsed / pDuration);

            _rectTransform.localScale = Vector3.Lerp(_initialHandScale, pressedHandScale, t);

            if (punchCardOnTap)
            {
                targetCard.localScale = Vector3.Lerp(cardBaseScale, pressedCardScale, t);
            }
            yield return null;
        }

        // Giữ lại 1 khoảnh khắc nhỏ tạo độ đầm thực tế
        yield return new WaitForSeconds(0.06f);

        // Giai đoạn 2: Ngón tay nhả lên (Release)
        float releaseElapsed = 0f;
        while (releaseElapsed < rDuration)
        {
            if (!_isPlaying) yield break;

            releaseElapsed += Time.deltaTime;
            float t = Mathf.Clamp01(releaseElapsed / rDuration);

            _rectTransform.localScale = Vector3.Lerp(pressedHandScale, _initialHandScale, t);

            if (punchCardOnTap)
            {
                targetCard.localScale = Vector3.Lerp(pressedCardScale, cardBaseScale, t);
            }
            yield return null;
        }

        // Trả về scale chuẩn
        _rectTransform.localScale = _initialHandScale;
        targetCard.localScale = cardBaseScale;
    }

    /// <summary>
    /// Tính toán tọa độ LocalPosition của bàn tay trong parent để khớp chuẩn xác với tâm card + handOffset.
    /// Tương thích tự động với Canvas Render Mode (Overlay / Camera / World Space) và xoay màn hình.
    /// </summary>
    private Vector3 CalculateTargetLocalPosition(RectTransform target)
    {
        if (target == null) return _rectTransform.localPosition;

        Vector3 cardWorldPos = target.position;

        if (_rectTransform.parent != null)
        {
            Vector3 localInParent = _rectTransform.parent.InverseTransformPoint(cardWorldPos);
            return localInParent + new Vector3(handOffset.x, handOffset.y, 0f);
        }

        return cardWorldPos + new Vector3(handOffset.x, handOffset.y, 0f);
    }

    /// <summary>
    /// Khôi phục toàn bộ scale của các card về ban đầu (tránh lỗi kẹt scale khi bị ngắt đột ngột).
    /// </summary>
    private void ResetAllCardsScale()
    {
        if (cards == null || _initialCardScales == null) return;

        for (int i = 0; i < cards.Length; i++)
        {
            if (cards[i] != null && i < _initialCardScales.Length)
            {
                cards[i].localScale = _initialCardScales[i];
            }
        }
    }

    /// <summary>
    /// Ẩn tutorial hand ngay lập tức và dừng animation.
    /// </summary>
    public void HideTutorial()
    {
        if (!_isPlaying && !gameObject.activeSelf) return;

        _isPlaying = false;

        if (_tutorialCoroutine != null)
        {
            StopCoroutine(_tutorialCoroutine);
            _tutorialCoroutine = null;
        }

        // Reset scale của hand và toàn bộ cards
        _rectTransform.localScale = _initialHandScale;
        ResetAllCardsScale();

        gameObject.SetActive(false);
    }

    private void OnDisable()
    {
        if (_tutorialCoroutine != null)
        {
            StopCoroutine(_tutorialCoroutine);
            _tutorialCoroutine = null;
        }
        _isPlaying = false;
        ResetAllCardsScale();
    }
}
