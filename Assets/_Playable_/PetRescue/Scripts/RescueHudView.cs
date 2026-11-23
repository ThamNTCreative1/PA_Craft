using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable.PetRescue
{
    public sealed class RescueHudView : MonoBehaviour
    {
        [SerializeField] private TMP_Text _counter, _timer;
        [SerializeField] private RectTransform _topUiRoot;
        [SerializeField] private Canvas _canvas;
        private int _rescued = -1, _seconds = -1;

        private void LateUpdate()
        {
            ApplyScreenLayout(Screen.width, Screen.height, Screen.safeArea);
        }

        public void ApplyScreenLayout(int width, int height, Rect safeArea)
        {
            if (_topUiRoot == null || _canvas == null) return;
            // Top labels are authored 112 units above their anchors; cancel that in every orientation.
            float inset = Mathf.Max(0, height - safeArea.yMax) + height * (height > width ? .035f : .02f);
            var shift = Vector2.down * 110;
            var offset = shift + new Vector2(0, -inset / Mathf.Max(.001f, _canvas.scaleFactor));
            if (_topUiRoot.offsetMin != shift) _topUiRoot.offsetMin = shift;
            if (_topUiRoot.offsetMax != offset) _topUiRoot.offsetMax = offset;
        }

        public void Refresh(int rescued, float remaining)
        {
            if (_rescued != rescued)
            {
                _rescued = rescued;
                _counter.text = rescued + "/3";
            }
            int seconds = Mathf.CeilToInt(remaining);
            if (_seconds != seconds)
            {
                _seconds = seconds;
                _timer.text = seconds.ToString();
            }
        }
    }
}
