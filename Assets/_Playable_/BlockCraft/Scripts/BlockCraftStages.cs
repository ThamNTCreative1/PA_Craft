using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class BlockCraftStages : MonoBehaviour
    {
        [SerializeField] private GameObject _buildStage;
        [SerializeField] private GameObject _castleStage;
        [SerializeField] private Image _fade;
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private Button _download;
        [SerializeField] private AudioSource _buttonAudio;
        [SerializeField] private Button[] _weapons;
        [SerializeField] private RectTransform _hand;
        [SerializeField] private RectTransform _ring;
        [SerializeField] private Animator _castleMonster;
        public bool CastleVisible => _castleStage.activeSelf;
        public Animator CastleMonster => _castleMonster;
        public int SelectedWeapon { get; private set; } = -1;

        private void Awake()
        {
            _buildStage.SetActive(true);
            _castleStage.SetActive(false);
            _fade.gameObject.SetActive(false);
            if (_download != null) _download.onClick.AddListener(() => _gameManager.ShowCTA());
            for (int i = 0; i < _weapons.Length; i++)
            {
                int index = i;
                _weapons[i].onClick.AddListener(() => SelectWeapon(index));
            }
        }

        private void Update()
        {
            if (!CastleVisible || !_hand.gameObject.activeSelf) return;
            if (_gameManager.HasEnded)
            {
                _hand.gameObject.SetActive(false);
                return;
            }
        }

        public void SelectWeapon(int index)
        {
            if (!CastleVisible || index < 0 || index >= _weapons.Length || _gameManager.HasEnded) return;
            SelectedWeapon = index;
            if (_buttonAudio != null) _buttonAudio.PlayOneShot(_buttonAudio.clip);
            _hand.gameObject.SetActive(false);
            if (_ring != null) _ring.gameObject.SetActive(false);
            for (int i = 0; i < _weapons.Length; i++)
                _weapons[i].interactable = false;
            _gameManager.EndGame();
            StartCoroutine(ShowCtaAfterSelection());
        }

        private IEnumerator ShowCtaAfterSelection()
        {
            yield return new WaitForSecondsRealtime(1f);
            _gameManager.ShowCTA();
        }

        public IEnumerator ShowCastle()
        {
            if (CastleVisible) yield break;
            _fade.gameObject.SetActive(true);
            _fade.transform.SetAsLastSibling();
            for (float t = 0; t < 0.25f; t += Time.unscaledDeltaTime)
            {
                _fade.color = new Color(0, 0, 0, t / 0.25f);
                yield return null;
            }
            _buildStage.SetActive(false);
            _castleStage.SetActive(true);
            for (float t = 0; t < 0.3f; t += Time.unscaledDeltaTime)
            {
                _fade.color = new Color(0, 0, 0, 1 - t / 0.3f);
                yield return null;
            }
            _fade.gameObject.SetActive(false);
        }
    }
}
