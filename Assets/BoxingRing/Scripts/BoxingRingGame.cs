using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Tap-to-build boxing ring. Same flow/timings as the reference Block Craft playable:
// tap 1 = ring floor, tap 2 = 4 corner posts, tap 3 = ropes -> payoff -> CTA.
public class BoxingRingGame : MonoBehaviour
{
    public enum Ease { Linear, ElasticOut05, ElasticOut04, BackOut17, BackOut15, Power1InOut }

    [Header("Scene")]
    public Camera cam;
    public Transform ringRoot;
    public GameObject placeholder;
    public Transform[] parts;          // 0 floor, 1 posts, 2 ropes (tap order)
    public Transform[] critters;
    public Transform friend;
    [SerializeField] GameObject[] fighters = new GameObject[0];
    public float friendScale = 0.5f;
    public Transform[] trees;
    public Transform[] bushes;

    [Header("UI")]
    public Text instruction;
    Text[] instructionLayers = new Text[0];
    public RectTransform hand;
    public CanvasGroup handGroup;
    public RectTransform cta;
    public CanvasGroup ctaGroup;
    public RectTransform playButton;
    [SerializeField] RectTransform landscapePlayButton;
    public float cssPx = 2.77f;        // 1 CSS px of the reference ≈ this many canvas units (1080x1920)

    [Header("FX")]
    public Sprite heartSprite;
    public AudioSource sfx;
    [SerializeField] LunaController lunaController;
    public AudioClip[] tapClips;
    public string startText = "TAP TO BUILD A RING!";
    public string keepText = "KEEP GOING!";

    int stage;
    bool happy;
    float clock;
    float[] critterBaseY;
    Vector2 instrBase, ctaBase;
    Vector2 downPos;
    bool downValid;

    class Particle
    {
        public Transform t;
        public SpriteRenderer sr;
        public Vector3 v;
        public float life;
    }
    readonly List<Particle> live = new List<Particle>();
    readonly Stack<Particle> pool = new Stack<Particle>();

    void Awake()
    {
        if (cam == null) cam = Camera.main;
        for (int i = 0; i < parts.Length; i++)
        {
            parts[i].localScale = Vector3.one * 0.01f;
            parts[i].gameObject.SetActive(false);
        }
        if (placeholder != null) placeholder.SetActive(true);
        if (friend != null) { friend.localScale = Vector3.zero; friend.gameObject.SetActive(false); }
        for (int i = 0; i < bushes.Length; i++) bushes[i].localScale = Vector3.zero;
        critterBaseY = new float[critters.Length];
        for (int i = 0; i < critters.Length; i++) critterBaseY[i] = critters[i].localScale.y;
        if (cta != null) { ctaBase = cta.anchoredPosition; cta.gameObject.SetActive(false); }
        if (instruction != null)
        {
            CreateInstructionLayers();
            SetInstruction(startText);
            instrBase = instruction.rectTransform.anchoredPosition;
        }
        foreach (GameObject fighter in fighters)
            if (fighter != null) fighter.SetActive(false);
    }

    // ---------------- input ----------------
    void Update()
    {
        float dt = Time.deltaTime;
        clock += dt;

        bool canBuild = lunaController == null || !lunaController.IsCtaReady;
        if (canBuild && Input.GetMouseButtonDown(0)) { downPos = Input.mousePosition; downValid = true; }
        if (Input.GetMouseButtonUp(0) && downValid)
        {
            downValid = false;
            Vector2 up = Input.mousePosition;
            float th = 10f * Mathf.Max(1f, Screen.height / 800f);
            if (canBuild && Mathf.Abs(up.x - downPos.x) < th && Mathf.Abs(up.y - downPos.y) < th && HitsBuildGrid(up)) HandleTap();
        }

        AnimateUI();
        AnimateCritters(dt);
        UpdateParticles(dt);
    }

    bool HitsBuildGrid(Vector2 screenPoint)
    {
        if (landscapePlayButton != null && landscapePlayButton.gameObject.activeInHierarchy &&
            RectTransformUtility.RectangleContainsScreenPoint(landscapePlayButton, screenPoint)) return false;
        if (placeholder == null || cam == null) return true;
        Transform grid = placeholder.transform;
        Vector3 center = BuildTarget();
        Ray ray = cam.ScreenPointToRay(screenPoint);
        Plane plane = new Plane(grid.forward, center);
        float distance;
        if (!plane.Raycast(ray, out distance)) return false;
        Vector3 local = grid.InverseTransformVector(ray.GetPoint(distance) - center);
        return Mathf.Abs(local.x) <= 0.5f && Mathf.Abs(local.y) <= 0.5f;
    }

    Vector3 BuildTarget()
    {
        Vector3 center = placeholder.transform.position;
        if (stage > 0) center.y = ringRoot.TransformPoint(Vector3.up).y;
        return center;
    }

    void HandleTap()
    {
        if (lunaController != null) lunaController.RegisterClick();
        if (stage >= parts.Length) return;
        if (stage == 0)
        {
            if (hand != null) hand.gameObject.SetActive(false);
            if (placeholder != null) placeholder.SetActive(false);
            SetInstruction(keepText);
        }
        PlayTapSound(stage);
        stage++;
        Transform p = parts[stage - 1];
        p.gameObject.SetActive(true);
        StartCoroutine(Scale(p, Vector3.one * 0.01f, Vector3.one, 0.8f, Ease.ElasticOut05, 0f));
        StartCoroutine(Scale(ringRoot, new Vector3(1.05f, 0.9f, 1.05f), Vector3.one, 0.4f, Ease.BackOut17, 0f));
        SpawnParticles(ringRoot.position + new Vector3(0f, stage * 1f, 0f));
        if (stage == parts.Length) StartCoroutine(Payoff());
    }

    void CreateInstructionLayers()
    {
        instructionLayers = new Text[9];
        for (int i = 0; i < instructionLayers.Length; i++)
        {
            bool foreground = i == 8;
            GameObject layerObject = new GameObject(foreground ? "Instruction Fill" : "Instruction Border",
                typeof(RectTransform), typeof(Text));
            RectTransform rect = (RectTransform)layerObject.transform;
            rect.SetParent(instruction.rectTransform, false);
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.sizeDelta = Vector2.zero;
            if (!foreground)
            {
                float angle = i * Mathf.PI / 4f;
                rect.anchoredPosition = new Vector2(Mathf.Cos(angle), Mathf.Sin(angle)) * (1.8f * cssPx);
            }

            Text layer = layerObject.GetComponent<Text>();
            layer.font = instruction.font;
            layer.fontSize = instruction.fontSize;
            layer.fontStyle = instruction.fontStyle;
            layer.alignment = instruction.alignment;
            layer.horizontalOverflow = instruction.horizontalOverflow;
            layer.verticalOverflow = instruction.verticalOverflow;
            layer.resizeTextForBestFit = instruction.resizeTextForBestFit;
            layer.resizeTextMinSize = instruction.resizeTextMinSize;
            layer.resizeTextMaxSize = instruction.resizeTextMaxSize;
            layer.color = foreground ? instruction.color : Color.black;
            layer.raycastTarget = false;
            instructionLayers[i] = layer;
        }
        instruction.enabled = false;
    }

    void SetInstruction(string text)
    {
        if (instruction != null) instruction.text = text;
        foreach (Text layer in instructionLayers) layer.text = text;
    }

    void PlayTapSound(int i)
    {
        if (sfx == null || tapClips == null || tapClips.Length == 0) return;
        sfx.PlayOneShot(tapClips[Mathf.Min(i, tapClips.Length - 1)]);
    }

    IEnumerator Payoff()
    {
        yield return new WaitForSeconds(0.8f);
        foreach (GameObject fighter in fighters)
            if (fighter != null) fighter.SetActive(true);
        happy = true;
        if (instruction != null) instruction.gameObject.SetActive(false);

        for (int i = 0; i < trees.Length; i++)
            StartCoroutine(Scale(trees[i], new Vector3(1.1f, 0.8f, 1.1f), Vector3.one, 1f, Ease.ElasticOut04, 0.1f * i));
        for (int i = 0; i < bushes.Length; i++)
            StartCoroutine(Scale(bushes[i], Vector3.zero, Vector3.one, 1f, Ease.ElasticOut05, 0.2f + 0.1f * i));

        if (friend != null)
        {
            friend.gameObject.SetActive(true);
            StartCoroutine(Scale(friend, Vector3.zero, Vector3.one * friendScale, 1f, Ease.ElasticOut04, 0f));
            StartCoroutine(Bounce(friend, 3.5f, 0.3f, 4));
        }
        for (int i = 0; i < critters.Length; i++)
        {
            StartCoroutine(Bounce(critters[i], 2f, 0.3f, 4));
            SpawnParticles(critters[i].position);
        }
        SpawnParticles(ringRoot.position + new Vector3(0f, 4f, 0f));

        yield return new WaitForSeconds(1f);
        if (cta != null)
        {
            cta.gameObject.SetActive(true);
            StartCoroutine(ShowCta());
        }
    }

    IEnumerator ShowCta()
    {
        float t = 0f, d = 0.5f;
        while (t < d)
        {
            t += Time.deltaTime;
            float k = Mathf.Clamp01(t / d);
            float e = Evaluate(Ease.BackOut15, k);
            cta.anchoredPosition = ctaBase + new Vector2(0f, -50f * cssPx * (1f - e));
            if (ctaGroup != null) ctaGroup.alpha = Mathf.Clamp01(e);
            yield return null;
        }
        cta.anchoredPosition = ctaBase;
        if (ctaGroup != null) ctaGroup.alpha = 1f;
    }

    public void OnPlayClicked()
    {
        if (lunaController != null) lunaController.OpenCta();
    }

    // ---------------- animation ----------------
    void ApplyLayout(bool landscape)
    {
        if (cta != null) cta.localScale = Vector3.one * (landscape ? 1.65f : 1f);
        if (landscapePlayButton != null && landscapePlayButton.gameObject.activeSelf != landscape)
            landscapePlayButton.gameObject.SetActive(landscape);
    }

    void LateUpdate()
    {
        ApplyLayout(Screen.width > Screen.height);
        if (hand == null || !hand.gameObject.activeSelf || cam == null || placeholder == null) return;
        RectTransform parent = (RectTransform)hand.parent;
        Vector2 point;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(
            parent, cam.WorldToScreenPoint(BuildTarget()), null, out point);
        float press = 0.5f - 0.5f * Mathf.Cos(clock * (2f * Mathf.PI / 1.2f));
        hand.localScale = Vector3.one * (1f - 0.1f * press);
        hand.localPosition = point + new Vector2(7f, -9f) * cssPx * (1f - press);
    }

    void AnimateUI()
    {
        if (instruction != null && instruction.gameObject.activeSelf)
        {
            // css: bounce 1s infinite alternate, translateY(0 -> -10px)
            float ph = Mathf.PingPong(clock, 1f);
            float e = ph * ph * (3f - 2f * ph);
            instruction.rectTransform.anchoredPosition = instrBase + new Vector2(0f, 10f * cssPx * e);
        }
        if (playButton != null && cta != null && cta.gameObject.activeSelf)
        {
            float ph = (clock % 1.5f) / 1.5f;
            float s = 1f + 0.05f * (0.5f - 0.5f * Mathf.Cos(ph * 2f * Mathf.PI));
            playButton.localScale = Vector3.one * s;
        }
    }

    void AnimateCritters(float dt)
    {
        for (int i = 0; i < critters.Length; i++)
        {
            Transform c = critters[i];
            Vector3 s = c.localScale;
            if (happy)
            {
                s.y = critterBaseY[i];
                c.Rotate(0f, 2f * dt * Mathf.Rad2Deg, 0f, Space.World);
                Transform head = c.Find("head");
                if (head != null) head.localEulerAngles = new Vector3((0.1f * Mathf.Sin(5f * clock + i) - 0.1f) * Mathf.Rad2Deg, 0f, 0f);
            }
            else
            {
                s.y = critterBaseY[i] + 0.02f * Mathf.Sin(3f * clock + i);
            }
            c.localScale = s;
        }
        if (friend != null && happy)
        {
            friend.Rotate(0f, -2f * dt * Mathf.Rad2Deg, 0f, Space.World);
            Transform head = friend.Find("head");
            if (head != null) head.localEulerAngles = new Vector3((0.1f * Mathf.Sin(6f * clock) - 0.1f) * Mathf.Rad2Deg, 0f, 0f);
            Transform tail = friend.Find("tail");
            if (tail != null) tail.localEulerAngles = new Vector3(0f, -45f + 0.2f * Mathf.Sin(10f * clock) * Mathf.Rad2Deg, 0f);
        }
    }

    IEnumerator Scale(Transform t, Vector3 from, Vector3 to, float dur, Ease ease, float delay)
    {
        if (delay > 0f) yield return new WaitForSeconds(delay);
        float time = 0f;
        t.localScale = from;
        while (time < dur)
        {
            time += Time.deltaTime;
            float e = Evaluate(ease, Mathf.Clamp01(time / dur));
            t.localScale = from + (to - from) * e;
            yield return null;
        }
        t.localScale = to;
    }

    // gsap.to(pos, {y: peak, duration: d, yoyo: true, repeat: halves-1, ease: power1.inOut})
    IEnumerator Bounce(Transform t, float peak, float dur, int halves)
    {
        float baseY = t.localPosition.y;
        for (int h = 0; h < halves; h++)
        {
            float time = 0f;
            bool up = (h % 2) == 0;
            while (time < dur)
            {
                time += Time.deltaTime;
                float e = Evaluate(Ease.Power1InOut, Mathf.Clamp01(time / dur));
                float k = up ? e : 1f - e;
                Vector3 p = t.localPosition;
                p.y = baseY + (peak - baseY) * k;
                t.localPosition = p;
                yield return null;
            }
        }
        Vector3 end = t.localPosition; end.y = baseY; t.localPosition = end;
    }

    public static float Evaluate(Ease ease, float p)
    {
        switch (ease)
        {
            case Ease.ElasticOut05: return Elastic(p, 1f, 0.5f);
            case Ease.ElasticOut04: return Elastic(p, 1f, 0.4f);
            case Ease.BackOut17: return Back(p, 1.7f);
            case Ease.BackOut15: return Back(p, 1.5f);
            case Ease.Power1InOut: return p < 0.5f ? 2f * p * p : 1f - 2f * (1f - p) * (1f - p);
        }
        return p;
    }

    // GSAP elastic.out(amplitude, period)
    static float Elastic(float p, float amplitude, float period)
    {
        if (p >= 1f) return 1f;
        float p1 = amplitude >= 1f ? amplitude : 1f;
        float p2 = period / (amplitude < 1f ? amplitude : 1f);
        float p3 = p2 / (2f * Mathf.PI) * Mathf.Asin(1f / p1);
        return p1 * Mathf.Pow(2f, -10f * p) * Mathf.Sin((p - p3) * (2f * Mathf.PI / p2)) + 1f;
    }

    // GSAP back.out(overshoot)
    static float Back(float p, float o)
    {
        p -= 1f;
        return p * p * ((o + 1f) * p + o) + 1f;
    }

    // ---------------- heart particles ----------------
    void SpawnParticles(Vector3 at)
    {
        if (heartSprite == null) return;
        for (int i = 0; i < 15; i++)
        {
            Particle p = pool.Count > 0 ? pool.Pop() : CreateParticle();
            p.t.gameObject.SetActive(true);
            p.t.position = at + new Vector3(Random.value - 0.5f, Random.value - 0.5f, Random.value - 0.5f);
            float s = 0.3f + 0.4f * Random.value;
            p.t.localScale = new Vector3(s, s, s);
            p.sr.color = Color.white;
            p.v = new Vector3(6f * (Random.value - 0.5f), 5f * Random.value + 3f, 6f * (Random.value - 0.5f));
            p.life = 1f;
            live.Add(p);
        }
    }

    Particle CreateParticle()
    {
        GameObject go = new GameObject("Heart");
        go.transform.SetParent(transform, false);
        SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
        sr.sprite = heartSprite;
        Particle p = new Particle();
        p.t = go.transform;
        p.sr = sr;
        return p;
    }

    void UpdateParticles(float dt)
    {
        Quaternion face = cam != null ? cam.transform.rotation : Quaternion.identity;
        for (int i = live.Count - 1; i >= 0; i--)
        {
            Particle p = live[i];
            p.v.y -= 9.8f * dt;
            p.t.position += p.v * dt;
            p.t.rotation = face;
            p.life -= dt;
            if (p.life < 0.5f)
            {
                p.sr.color = new Color(1f, 1f, 1f, Mathf.Clamp01(2f * p.life));
                p.t.localScale *= Mathf.Pow(0.95f, dt * 60f);
            }
            if (p.life <= 0f || p.t.position.y < 0f)
            {
                p.t.gameObject.SetActive(false);
                live.RemoveAt(i);
                pool.Push(p);
            }
        }
    }
}
