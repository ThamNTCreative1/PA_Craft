using UnityEngine;
using UnityEngine.UI;
namespace Playable
{
    [ExecuteAlways]
    public sealed class StealEggsLayout : MonoBehaviour
    {
        public CanvasScaler Scaler;
        public Camera View;
        public RectTransform Egg, Footer, CardContent;
        private int _width, _height;
        private void Update()
        {
            if (Scaler == null || View == null || Egg == null || Footer == null || CardContent == null) return;
            if (_width == Screen.width && _height == Screen.height) return;
            Apply(Screen.width, Screen.height);
        }
        public void Apply(int width, int height)
        {
            _width = width; _height = height;
            bool portrait = height > width;
            Scaler.referenceResolution = portrait ? new Vector2(1080,1920) : new Vector2(1920,1080);
            Scaler.matchWidthOrHeight = .5f;
            Egg.anchorMin = Egg.anchorMax = new Vector2(1,0);
            Egg.anchoredPosition = portrait ? new Vector2(-185,360) : new Vector2(-295,300);
            Egg.sizeDelta = new Vector2(230,230);
            Footer.anchorMin = new Vector2(0,0); Footer.anchorMax = new Vector2(1,0);
            Footer.anchoredPosition = new Vector2(0,portrait ? 120 : 100);
            Footer.sizeDelta = new Vector2(-60,portrait ? 180 : 100);
            CardContent.localScale = Vector3.one * (portrait ? .9f : 1f);
            View.fieldOfView = portrait ? 64 : 48;
        }
    }
}
