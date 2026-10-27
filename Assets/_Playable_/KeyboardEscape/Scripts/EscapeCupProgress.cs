using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.KeyboardEscape
{
    public sealed class EscapeCupProgress : MonoBehaviour
    {
        public EscapeGame game;
        public Image fill;
        public Image gainIcon;
        public TMP_Text totalLabel, progressLabel, levelLabel, gainLabel;
        public RectTransform canvasRect;
        // Defaults from the source Keyborad Escape Speed Config.asset.
        public float baseRequirement = 100f;
        public float requirementMultiplier = 1.118f;
        public int TotalCups { get; private set; }
        public int CurrentCups { get; private set; }
        public int Level { get; private set; } = 1;
        public float RequiredCups { get { return baseRequirement * Mathf.Pow(requirementMultiplier, Level - 1); } }
        private sealed class GainPopup
        {
            public TMP_Text label;
            public Image icon;
            public float until;
            public Vector2 origin;
            public float horizontalDrift;
        }
        private GainPopup[] popups;
        private int popupSequence;
        private const float PopupDuration = .65f;

        private void Start() { RefreshUI(); InitializePopups(); }
        public void ResetProgress()
        {
            TotalCups = CurrentCups = popupSequence = 0;
            Level = 1;
            OnDisable();
            RefreshUI();
        }
        private void InitializePopups()
        {
            if (popups != null) return;
            gainLabel.gameObject.SetActive(false);
            popups = new GainPopup[16];
            popups[0] = new GainPopup { label = gainLabel, icon = gainIcon };
            for (int i = 1; i < popups.Length; i++) popups[i] = CreatePopup();
        }
        private GainPopup CreatePopup()
        {
            var clone = Instantiate(gainLabel.gameObject, gainLabel.transform.parent);
            clone.name = "Cup Gain Pooled";
            clone.SetActive(false);
            return new GainPopup { label = clone.GetComponent<TMP_Text>(), icon = clone.GetComponentInChildren<Image>(true) };
        }
        private GainPopup GetPopup()
        {
            InitializePopups();
            for (int i = 0; i < popups.Length; i++)
                if (popups[i].until <= Time.unscaledTime) return popups[i];
            // Grow only for an unusually dense burst; never interrupt a visible popup.
            var expanded = new GainPopup[popups.Length + 8];
            for (int i = 0; i < popups.Length; i++) expanded[i] = popups[i];
            for (int i = popups.Length; i < expanded.Length; i++) expanded[i] = CreatePopup();
            var available = expanded[popups.Length];
            popups = expanded;
            return available;
        }
        public void AddKeyboardCup()
        {
            if (!game.IsRunning || !game.player.canMove || game.manager.HasEnded) return;
            TotalCups++;
            CurrentCups++;
            if (CurrentCups >= RequiredCups)
            {
                Level++;
                CurrentCups = 0; // Matches the source Profile.LevelUp flow.
            }
            RefreshUI();
            Vector3 screen = game.viewCamera.WorldToScreenPoint(game.player.transform.position + Vector3.up * 2.8f);
            if (screen.z <= 0) return;
            var popup = GetPopup();
            RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect, screen, null, out popup.origin);
            // Keep consecutive awards slightly separated while all travel up-right.
            float lane = popupSequence % 3;
            popupSequence = (popupSequence + 1) % 3;
            popup.origin += Vector2.right * (lane * 10f);
            popup.horizontalDrift = 40f + lane * 8f;
            popup.until = Time.unscaledTime + PopupDuration;
            popup.label.text = "+1";
            popup.label.color = new Color(1, .85f, .15f, 1);
            popup.icon.color = Color.white;
            popup.label.rectTransform.anchoredPosition = popup.origin;
            popup.label.transform.SetAsLastSibling();
            popup.label.gameObject.SetActive(true);
        }
        private void RefreshUI()
        {
            totalLabel.text = TotalCups.ToString();
            if (progressLabel) progressLabel.text = CurrentCups + "/" + Mathf.RoundToInt(RequiredCups);
            if (levelLabel) levelLabel.text = "Level: " + Level;
            if (fill) fill.fillAmount = Mathf.Clamp01(CurrentCups / RequiredCups);
        }
        private void Update()
        {
            if (popups == null) return;
            for (int i = 0; i < popups.Length; i++)
            {
                var popup = popups[i];
                if (!popup.label.gameObject.activeSelf) continue;
                float remaining = popup.until - Time.unscaledTime;
                if (remaining <= 0 || game.manager.HasEnded)
                {
                    popup.until = 0;
                    popup.label.gameObject.SetActive(false);
                    continue;
                }
                float phase = 1 - remaining / PopupDuration;
                popup.label.rectTransform.anchoredPosition = popup.origin + new Vector2(popup.horizontalDrift * phase, phase * 70);
                popup.label.color = new Color(1, .85f, .15f, Mathf.Min(1, remaining * 4));
                popup.icon.color = new Color(1, 1, 1, Mathf.Min(1, remaining * 4));
            }
        }
        private void OnDisable()
        {
            if (popups == null) return;
            for (int i = 0; i < popups.Length; i++)
            {
                popups[i].until = 0;
                if (popups[i].label) popups[i].label.gameObject.SetActive(false);
            }
        }
    }
}
