using UnityEngine;
using UnityEngine.UI;

namespace Playable.TempleRun
{
    /// <summary>Presentation-only inventory strip; the runner has no item-use mechanic.</summary>
    public class RunnerHotbar : MonoBehaviour
    {
        public RectTransform selection;
        public RectTransform[] slots;
        public Button[] buttons;
        public RunnerUI runnerUI;
        public GameObject content;
        public int selectedIndex = 3;

        private void Awake()
        {
            for (int i = 0; i < buttons.Length; i++)
            {
                int index = i;
                buttons[i].onClick.AddListener(() => Select(index));
            }
            Select(selectedIndex);
        }

        public void Select(int index)
        {
            if (slots == null || index < 0 || index >= slots.Length || selection == null) return;
            selectedIndex = index;
            selection.anchoredPosition = slots[index].anchoredPosition;
        }

        private void Update()
        {
            bool show = runnerUI == null ||
                ((runnerUI.endPanel == null || !runnerUI.endPanel.activeSelf) &&
                 (runnerUI.failPanel == null || !runnerUI.failPanel.activeSelf));
            if (content != null && content.activeSelf != show) content.SetActive(show);
            if (!show) return;
            for (int i = 0; i < slots.Length; i++)
                if (Input.GetKeyDown((KeyCode)((int)KeyCode.Alpha1 + i))) Select(i);
        }
    }
}
