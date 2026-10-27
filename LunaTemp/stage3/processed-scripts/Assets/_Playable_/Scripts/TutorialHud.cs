using UnityEngine;
using UnityEngine.UI;

// Tutorial:
//  B1: kéo joystick để di chuyển ("Move to find a spot!") - tay kéo trên joystick
//  B2: vuốt màn hình để xoay góc nhìn ("Swipe to look around!") - tay vuốt ngang giữa màn hình
//  B3: chọn 1 block bất kỳ trong túi đồ ("Tap to pick up a block")
// Chọn block xong: tắt chữ + lớp phủ, chỉ còn 1 bàn tay nhấn vào nút PLACE cho tới khi đặt block đầu tiên.
// Tutorial chỉ chạy 1 lần.
public class TutorialHud : MonoBehaviour
{
    public BlockPlacer placer;
    public HotbarUI hotbar;
    public ThirdPersonController player;
    public RectTransform joystick;
    public RectTransform placeButton;
    public RectTransform hand;
    public Text hint;
    public Text moveLabel;
    public Image dim;                   // lớp phủ đen toàn màn hình (không chặn chạm)
    public RectTransform tutorialLayer; // chứa Hint + Hand, luôn nằm trên lớp phủ
    public float moveDistanceToPass = 1.5f;
    public float lookAngleToPass = 35f;

    enum Step { Move, Look, Select, PlaceHand, Done }
    Step step = Step.Done;
    RectTransform target;
    Vector3 startPos;
    float startYaw;
    bool hooked;
    static bool shownOnce;

    public void Begin()
    {
        var cfg = PlayableConfig.I;
        if (moveLabel != null && cfg != null) moveLabel.text = cfg.moveText;
        if (!hooked) { placer.OnSelected += OnSelected; placer.OnPlaced += OnPlaced; hooked = true; }
        if (shownOnce) { Finish(); return; }
        shownOnce = true;
        hand.gameObject.SetActive(true);
        GoMove();
    }

    void GoMove()
    {
        step = Step.Move;
        startPos = player != null ? player.transform.position : Vector3.zero;
        target = joystick;
        var cfg = PlayableConfig.I;
        SetHint(cfg != null ? cfg.moveHintText : "Move to find a spot!");
        Highlight(joystick);
    }

    void GoLook()
    {
        step = Step.Look;
        startYaw = player != null ? player.Yaw : 0f;
        target = null;
        var cfg = PlayableConfig.I;
        SetHint(cfg != null ? cfg.lookHintText : "Swipe to look around!");
        Highlight(null); // chỉ tối nền, không nổi phần nào
    }

    void GoSelect()
    {
        step = Step.Select;
        target = hotbar.Slot(0);
        var cfg = PlayableConfig.I;
        SetHint(cfg != null ? cfg.selectHintText : "Tap to pick up a block");
        Highlight(hotbar.transform as RectTransform);
    }

    void Finish()
    {
        step = Step.Done;
        hand.gameObject.SetActive(false);
        HideDim();
        if (hint != null) hint.gameObject.SetActive(false);
    }

    // Đưa phần tử cấp cao nhất chứa t lên trên lớp phủ (t = null: chỉ bật lớp phủ)
    void Highlight(RectTransform t)
    {
        if (dim == null) return;
        dim.gameObject.SetActive(true);
        dim.transform.SetAsLastSibling();
        if (t != null)
        {
            Transform top = t;
            while (top != null && top.parent != transform) top = top.parent;
            if (top != null) top.SetAsLastSibling();
        }
        if (tutorialLayer != null) tutorialLayer.SetAsLastSibling();
    }

    void HideDim() { if (dim != null) dim.gameObject.SetActive(false); }

    void SetHint(string s) { if (hint != null) { hint.text = s; hint.gameObject.SetActive(true); } }

    // Hết tutorial: tắt chữ + lớp phủ, tay chuyển sang nhấn nút PLACE
    void GoPlaceHand()
    {
        step = Step.PlaceHand;
        target = placeButton;
        HideDim();
        if (hint != null) hint.gameObject.SetActive(false);
        hand.gameObject.SetActive(true);
    }

    void OnSelected(int i)
    {
        if (step == Step.Move || step == Step.Look || step == Step.Select) GoPlaceHand();
    }

    void OnPlaced(int n)
    {
        Finish();
    }

    void Update()
    {
        if (step == Step.Done) return;

        if (step == Step.Move && player != null)
        {
            Vector3 d = player.transform.position - startPos; d.y = 0f;
            if (d.magnitude >= moveDistanceToPass) GoLook();
        }
        else if (step == Step.Look && player != null)
        {
            if (Mathf.Abs(Mathf.DeltaAngle(startYaw, player.Yaw)) >= lookAngleToPass) GoSelect();
        }

        if (!hand.gameObject.activeSelf) return;
        float u = hand.parent != null ? hand.parent.lossyScale.x : 1f;
        if (step == Step.Move && target != null)
        {
            // tay kéo từ tâm joystick lên trên rồi quay lại
            float k = Mathf.SmoothStep(0f, 1f, Mathf.PingPong(Time.time * 1.4f, 1f));
            hand.position = target.position + new Vector3(20f, -40f + 90f * k, 0f) * u;
            hand.localScale = Vector3.one * 0.95f;
        }
        else if (step == Step.Look)
        {
            // tay vuốt ngang qua giữa màn hình
            var area = hand.parent as RectTransform;
            Vector3 center = area != null ? area.position : new Vector3(Screen.width * 0.5f, Screen.height * 0.5f, 0f);
            float k = Mathf.SmoothStep(0f, 1f, Mathf.PingPong(Time.time * 0.9f, 1f));
            hand.position = center + new Vector3(Mathf.Lerp(-220f, 220f, k), -60f, 0f) * u;
            hand.localScale = Vector3.one * 0.95f;
        }
        else if (target != null)
        {
            // tay nhấn nhấn vào ô block / nút PLACE
            float k = Mathf.Abs(Mathf.Sin(Time.time * 4f));
            hand.position = target.position + new Vector3(25f, -55f + 18f * k, 0f) * u;
            hand.localScale = Vector3.one * (1f - 0.08f * (1f - k));
        }
    }
}
