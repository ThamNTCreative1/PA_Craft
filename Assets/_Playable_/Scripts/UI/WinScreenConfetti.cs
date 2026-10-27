using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    // Normalized screen coordinates keep both launchers at the edges in either orientation.
    public sealed class WinScreenConfetti : MonoBehaviour
    {
        [SerializeField] private RectTransform _area;
        private const int Count = 160;
        private const float Duration = 4.5f;
        private RawImage[] _pieces;
        private Vector2[] _positions, _velocities;
        private float[] _delays, _spin, _fallDrift, _flipSpeed, _flipPhase;
        private Color[] _colors;
        private float _elapsed;
        private bool _playing;

        public void Play()
        {
            if (_pieces == null)
            {
                _pieces = new RawImage[Count];
                _positions = new Vector2[Count];
                _velocities = new Vector2[Count];
                _delays = new float[Count];
                _spin = new float[Count];
                _fallDrift = new float[Count];
                _flipSpeed = new float[Count];
                _flipPhase = new float[Count];
                _colors = new Color[Count];
                for (int i = 0; i < Count; i++)
                {
                    var piece = new GameObject("Confetti", typeof(RectTransform), typeof(CanvasRenderer), typeof(RawImage));
                    piece.transform.SetParent(_area, false);
                    _pieces[i] = piece.GetComponent<RawImage>();
                    _pieces[i].raycastTarget = false;
                    _pieces[i].texture = Texture2D.whiteTexture;
                    _pieces[i].rectTransform.anchorMin = _pieces[i].rectTransform.anchorMax = Vector2.zero;
                }
            }
            _elapsed = 0;
            _playing = true;
            for (int i = 0; i < Count; i++)
            {
                bool left = i % 2 == 0;
                float launchHeight = Screen.height > Screen.width ? .5f : .2f;
                _positions[i] = new Vector2(left ? -.015f : 1.015f, launchHeight);
                _velocities[i] = new Vector2((left ? 1 : -1) * Random.Range(.3f, .55f), Random.Range(1.3f, 1.65f));
                _delays[i] = (i / 2) * .008f;
                _spin[i] = Random.Range(150f, 420f) * (Random.value < .5f ? -1f : 1f);
                _flipSpeed[i] = Random.Range(5f, 10f);
                _flipPhase[i] = Random.Range(0f, Mathf.PI * 2f);
                // Each launcher fans out in both directions during descent.
                _fallDrift[i] = Random.Range(-.4f, .4f);
                _colors[i] = Color.HSVToRGB(Random.value, .95f, .9f);
                _pieces[i].color = _colors[i];
                _pieces[i].rectTransform.sizeDelta = Vector2.one * Random.Range(36f, 72f);
                _pieces[i].rectTransform.localRotation = Quaternion.Euler(0, 0, Random.Range(0, 360));
                _pieces[i].rectTransform.localScale = Vector3.one;
                _pieces[i].gameObject.SetActive(false);
            }
        }

        public void Clear()
        {
            _playing = false;
            if (_pieces == null) return;
            for (int i = 0; i < Count; i++) _pieces[i].gameObject.SetActive(false);
        }

        private void Update()
        {
            if (!_playing) return;
            float dt = Time.unscaledDeltaTime;
            _elapsed += dt;
            if (_elapsed >= Duration) { Clear(); return; }
            Vector2 size = _area.rect.size;
            // Measure vertical travel against the short screen edge, as in landscape.
            float verticalTravelScale = Mathf.Min(1f, size.x / Mathf.Max(1f, size.y));
            for (int i = 0; i < Count; i++)
            {
                if (_elapsed < _delays[i]) continue;
                float step = Mathf.Min(dt, _elapsed - _delays[i]);
                // Keep the fast launch, then restore the original falling gravity.
                if (_velocities[i].y > 0)
                    _velocities[i].y = Mathf.Max(0, _velocities[i].y - 2.1f * step);
                else
                {
                    _velocities[i].y -= .85f * step;
                    _velocities[i].x = Mathf.MoveTowards(_velocities[i].x, _fallDrift[i], 1.5f * step);
                }
                _positions[i] += new Vector2(_velocities[i].x, _velocities[i].y * verticalTravelScale) * step;
                var piece = _pieces[i];
                piece.gameObject.SetActive(true);
                piece.rectTransform.anchoredPosition = Vector2.Scale(_positions[i], size);
                float age = _elapsed - _delays[i];
                float flip = age * _flipSpeed[i] + _flipPhase[i];
                piece.rectTransform.Rotate(0, 0, _spin[i] * (1f + .2f * Mathf.Sin(flip)) * step);
                // Project a tumbling square onto the UI plane without negative scale or back-face culling.
                float edge = Mathf.Lerp(.08f, 1f, Mathf.Abs(Mathf.Cos(flip)));
                float tilt = Mathf.Lerp(.75f, 1f, .5f + .5f * Mathf.Sin(flip * .7f));
                piece.rectTransform.localScale = i % 2 == 0
                    ? new Vector3(edge, tilt, 1f)
                    : new Vector3(tilt, edge, 1f);
                // Stagger brief white glints so the squares shimmer independently.
                float wave = .5f + .5f * Mathf.Sin((_elapsed - _delays[i]) * (14f + i % 5) + i * 2.4f);
                float glint = wave * wave * wave * wave;
                Color color = Color.Lerp(_colors[i], Color.white, glint * .35f);
                color.a = Mathf.Lerp(.9f, 1f, wave) * Mathf.Clamp01((Duration - _elapsed) / .5f);
                piece.color = color;
            }
        }

        private void OnDisable() { Clear(); }
    }
}
