using UnityEngine;
using UnityEngine.UI;

// Nút CTA trong suốt phủ toàn màn hình. Bật khi đủ số block hoặc hết giờ;
// người chơi chạm vào bất kỳ đâu -> kết thúc game và mở store.
public class CtaOverlay : MonoBehaviour
{
    public Button button;
    bool ended;

    void Awake()
    {
        if (button == null) button = GetComponent<Button>();
        button.onClick.AddListener(OnTap);
    }

    public void Activate()
    {
        gameObject.SetActive(true);
        transform.SetAsLastSibling();
    }

    void OnTap()
    {
        Sfx.Click();
        if (!ended)
        {
            ended = true;
            Luna.Unity.LifeCycle.GameEnded();
        }
        Luna.Unity.Playable.InstallFullGame();
    }
}
