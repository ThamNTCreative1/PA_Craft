using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    // "Tap to build": tapping any material ends the game (store); the end card shows on any game end.
    public class TapToBuildFlow : MonoBehaviour
    {
        [SerializeField] private Button[] _materials;
        [SerializeField] private EndCardView _endCard;
        [SerializeField] private GameObject _hint;
        [SerializeField] private AudioClip _clickSfx;

        private void Start()
        {
            foreach (var b in _materials) b.onClick.AddListener(OnMaterialClicked);
            if (GameManager.Instance != null) GameManager.Instance.Ended += OnEnded;
        }

        private void OnDestroy()
        {
            foreach (var b in _materials) if (b != null) b.onClick.RemoveListener(OnMaterialClicked);
            if (GameManager.Instance != null) GameManager.Instance.Ended -= OnEnded;
        }

        private void OnMaterialClicked()
        {
            if (_clickSfx != null && AudioManager.Instance != null) AudioManager.Instance.PlaySound(_clickSfx);
            if (GameManager.Instance != null) GameManager.Instance.EndGame();
        }

        private void OnEnded()
        {
            if (_hint != null) _hint.SetActive(false);
            foreach (var b in _materials) b.interactable = false;
            _endCard.Show();
        }
    }
}
