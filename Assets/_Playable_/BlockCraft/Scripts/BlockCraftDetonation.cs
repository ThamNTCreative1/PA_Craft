using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class BlockCraftDetonation : MonoBehaviour
    {
        [SerializeField] private Sprite _tnt;
        [SerializeField] private Image _flash;
        [SerializeField] private Image[] _fire;
        [SerializeField] private AudioSource _audio;
        [SerializeField] private GameObject _monster;
        [SerializeField] private BlockCraftStages _stages;
        [SerializeField, Min(0.1f)] private float _fuseDuration = 1.1f;
        [SerializeField, Min(0.1f)] private float _debrisDuration = 1.5f;
        public bool HasSpawned { get; private set; }
        public bool HasExploded { get; private set; }
        public bool IsFinished { get; private set; }

        public IEnumerator Play(Image[] cells, int builtRows)
        {
            if (HasSpawned) yield break;
            HasSpawned = true;
            int first = builtRows * 7;
            // The reserved sixth row is TNT, never another player-selected material.
            for (float elapsed = 0; elapsed < 0.7f; elapsed += Time.deltaTime)
            {
                for (int col = 0; col < 7; col++)
                {
                    Image cell = cells[first + col];
                    cell.sprite = _tnt;
                    cell.color = Color.white;
                    cell.gameObject.SetActive(elapsed >= col * 0.04f);
                    float t = Mathf.Clamp01((elapsed - col * 0.04f) / 0.42f);
                    cell.rectTransform.anchoredPosition = BlockCraftBuildController.CellPosition(builtRows, col)
                        + Vector2.up * (300 * (1 - t * t));
                }
                yield return null;
            }
            for (int col = 0; col < 7; col++)
            {
                cells[first + col].gameObject.SetActive(true);
                cells[first + col].rectTransform.anchoredPosition = BlockCraftBuildController.CellPosition(builtRows, col);
            }
            for (float elapsed = 0; elapsed < _fuseDuration; elapsed += Time.deltaTime)
            {
                float pulse = (Mathf.Sin(elapsed * 26) + 1) * 0.5f;
                for (int col = 0; col < 7; col++)
                {
                    cells[first + col].color = Color.Lerp(Color.white, new Color(1, 0.35f, 0.2f), pulse);
                    cells[first + col].rectTransform.localScale = Vector3.one * (1 + pulse * 0.06f);
                }
                yield return null;
            }
            HasExploded = true;
            if (_monster != null) _monster.SetActive(false);
            if (_audio != null) _audio.Play();
            var origins = new Vector2[cells.Length];
            var velocities = new Vector2[cells.Length];
            for (int i = 0; i < cells.Length; i++)
            {
                origins[i] = cells[i].rectTransform.anchoredPosition;
                int col = i % 7;
                velocities[i] = new Vector2((col - 3) * 210f + (i % 3 - 1) * 80f,
                    260f + (i / 7) * 60f + (i % 4) * 70f);
                cells[i].color = Color.white;
                cells[i].rectTransform.localScale = Vector3.one;
            }
            _flash.gameObject.SetActive(true);
            for (int i = 0; i < _fire.Length; i++) _fire[i].gameObject.SetActive(true);
            for (float elapsed = 0; elapsed < _debrisDuration; elapsed += Time.deltaTime)
            {
                float progress = elapsed / _debrisDuration;
                _flash.color = new Color(1, 0.65f, 0.24f, Mathf.Clamp01(1 - elapsed / 0.28f));
                for (int i = 0; i < _fire.Length; i++)
                {
                    float t = Mathf.Clamp01((elapsed - i * 0.025f) / 0.9f);
                    _fire[i].rectTransform.localScale = Vector3.one * Mathf.Lerp(0.25f, 3.4f, t);
                    _fire[i].color = Color.Lerp(new Color(1, 0.95f, 0.6f, 1),
                        new Color(0.6f, 0.12f, 0.02f, 0), t);
                }
                for (int i = 0; i < cells.Length; i++)
                {
                    cells[i].rectTransform.anchoredPosition = origins[i] + velocities[i] * elapsed
                        + Vector2.down * (650f * elapsed * elapsed);
                    cells[i].rectTransform.localRotation = Quaternion.Euler(0, 0, elapsed * (i % 2 == 0 ? 240 : -210));
                    cells[i].color = new Color(1, 1, 1, 1 - Mathf.InverseLerp(0.55f, 1, progress));
                }
                yield return null;
            }
            for (int i = 0; i < cells.Length; i++) cells[i].gameObject.SetActive(false);
            for (int i = 0; i < _fire.Length; i++) _fire[i].gameObject.SetActive(false);
            _flash.gameObject.SetActive(false);
            IsFinished = true;
            if (_stages != null) yield return _stages.ShowCastle();
        }
    }
}
