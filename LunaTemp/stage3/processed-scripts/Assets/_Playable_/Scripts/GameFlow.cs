using System.Collections;
using UnityEngine;
using UnityEngine.UI;

// Luồng: Intro (5s) -> Chọn màu -> Xây (góc nhìn thứ 3) -> End card.
public class GameFlow : MonoBehaviour
{
    public enum State { Intro, Choose, Build, End }
    public State state;

    public Camera cam;
    public IntroSequence intro;
    public ThirdPersonController player;   // nhân vật skin ref
    public BlockPlacer placer;
    public TreeRecolor trees;
    public ColorChoiceUI choiceUI;
    public GameObject gameplayUI;
    public TutorialHud tutorial;
    public Image houseThumb;
    public Sprite pinkThumb, blueThumb;
    public CtaOverlay cta;               // nút CTA trong suốt toàn màn hình khi hết lượt / hết giờ
    public GameObject[] npcs;              // nhân vật đi lại
    public AudioSource bgm;
    public CanvasGroup flash;
    public Vector3 overviewOffset = new Vector3(0f, 4.5f, -7f);

    float buildTimer;

    void Start()
    {
        var cfg = PlayableConfig.I;
        BrightnessApplier.ApplyAll();
        if (bgm != null && cfg != null)
        {
            if (cfg.bgmClip != null) bgm.clip = cfg.bgmClip;
            bgm.volume = cfg.bgmVolume; bgm.loop = true;
            if (cfg.bgmOn && bgm.clip != null) bgm.Play();
        }
        choiceUI.gameObject.SetActive(false);
        gameplayUI.SetActive(false);
        cta.gameObject.SetActive(false);
        choiceUI.OnChosen += OnColorChosen;
        placer.OnPlaced += OnPlaced;
        placer.inputEnabled = false;

        // intro chỉ hiện nhân vật chính
        for (int i = 0; i < npcs.Length; i++)
        {
            npcs[i].SetActive(false);
            var w = npcs[i].GetComponent<NpcWander>(); if (w != null) w.enabled = false;
        }
        state = State.Intro;
        intro.Play(cam);
        StartCoroutine(IntroThenChoose(cfg != null ? cfg.introDuration : 5f));
    }

    IEnumerator IntroThenChoose(float dur)
    {
        yield return new WaitForSeconds(dur);
        intro.Finish();
        yield return Flash(0.25f, true);

        // bật NPC, rải quanh phía trước nhân vật
        int n = PlayableConfig.I != null ? Mathf.Clamp(PlayableConfig.I.npcCount, 0, npcs.Length) : npcs.Length;
        Vector3 pp = player.transform.position;
        Vector3 fwd = player.transform.forward; fwd.y = 0; fwd.Normalize();
        for (int i = 0; i < npcs.Length; i++)
        {
            bool on = i < n;
            npcs[i].SetActive(on);
            if (!on) continue;
            Vector3 p = pp + Quaternion.Euler(0, -50f + 50f * i, 0) * fwd * (4.5f + i);
            p.y = pp.y;
            npcs[i].transform.position = p;
            BrightnessApplier.ApplyTo(npcs[i]);
            var w = npcs[i].GetComponent<NpcWander>();
            if (w != null) { w.player = player.transform; w.view = cam.transform; w.enabled = true; }
        }

        // camera toàn cảnh phía sau nhân vật
        Quaternion yr = Quaternion.LookRotation(fwd);
        Vector3 camPos = pp + yr * overviewOffset;
        cam.transform.SetPositionAndRotation(camPos, Quaternion.LookRotation(pp + fwd * 4f - camPos));
        yield return Flash(0.25f, false);
        state = State.Choose;
        choiceUI.Show();
    }

    void OnColorChosen(bool pink)
    {
        if (state != State.Choose) return;
        StartCoroutine(ToBuild(pink));
    }

    IEnumerator ToBuild(bool pink)
    {
        yield return new WaitForSeconds(0.3f);
        trees.Apply(pink);
        Sfx.Extra();
        placer.SetPalette(pink);
        if (houseThumb != null) houseThumb.sprite = pink ? pinkThumb : blueThumb;
        yield return new WaitForSeconds(0.6f);
        // camera bay về sau lưng nhân vật
        Vector3 p0 = cam.transform.position; Quaternion r0 = cam.transform.rotation;
        Vector3 p1; Quaternion r1;
        player.GetCameraPose(out p1, out r1);
        float t = 0f, dur = 0.8f;
        while (t < 1f)
        {
            t += Time.deltaTime / dur;
            float k = Mathf.SmoothStep(0f, 1f, t);
            cam.transform.SetPositionAndRotation(Vector3.Lerp(p0, p1, k), Quaternion.Slerp(r0, r1, k));
            yield return null;
        }
        player.BeginControl();
        state = State.Build;
        gameplayUI.SetActive(true);
        tutorial.Begin();
        placer.inputEnabled = true;
        buildTimer = 0f;
    }

    void OnPlaced(int count)
    {
        var cfg = PlayableConfig.I;
        if (cfg != null && cfg.placeCountToEnd > 0 && count >= cfg.placeCountToEnd) StartCoroutine(EndAfter(0.6f));
    }

    void Update()
    {
        if (state == State.Build)
        {
            buildTimer += Time.deltaTime;
            var cfg = PlayableConfig.I;
            if (cfg != null && cfg.timeToStore > 0f && buildTimer >= cfg.timeToStore) ShowEnd();
        }
    }

    IEnumerator EndAfter(float d) { yield return new WaitForSeconds(d); ShowEnd(); }

    void ShowEnd()
    {
        if (state == State.End) return;
        state = State.End;
        player.EndControl(); placer.inputEnabled = false;
        // không hiện end card: giữ nguyên màn chơi, phủ 1 nút CTA trong suốt
        cta.Activate();
    }

    IEnumerator Flash(float dur, bool fadeIn)
    {
        if (flash == null) yield break;
        flash.gameObject.SetActive(true);
        float t = 0f;
        while (t < 1f) { t += Time.deltaTime / dur; flash.alpha = fadeIn ? t : 1f - t; yield return null; }
        flash.alpha = fadeIn ? 1f : 0f;
        if (!fadeIn) flash.gameObject.SetActive(false);
    }
}
