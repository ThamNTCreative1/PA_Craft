using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    // Vehicle -> Pet picker. Vehicle drops into the yard; choosing a pet (or tapping anywhere
    // on the pet screen) ends the game and opens the store via GameManager.
    public class XmasPickerFlow : MonoBehaviour
    {
        [SerializeField] private PickerStep[] _steps;
        [SerializeField] private Transform _landPoint;
        [SerializeField] private ChoiceCardsView _cards;
        [SerializeField] private DropPresenter _drop;
        [SerializeField] private Button _anyTapCatcher;
        [SerializeField] private AudioClip _clickSfx;
        [SerializeField] private float _startDelay = 0.3f;
        [SerializeField] private float _nextStepDelay = 0.5f;

        private PickerSequence _sequence;

        private void Awake()
        {
            _cards.Chosen += OnChosen;
            _anyTapCatcher.onClick.AddListener(EndGame);
            _anyTapCatcher.gameObject.SetActive(false);
            foreach (var step in _steps)
            {
                HideDisplay(step.Get(PickerStep.Left));
                HideDisplay(step.Get(PickerStep.Right));
            }
        }

        private IEnumerator Start()
        {
            _sequence = new PickerSequence(_steps);
            yield return new WaitForSeconds(_startDelay);
            ShowCurrent();
        }

        private void OnDestroy()
        {
            _cards.Chosen -= OnChosen;
            _anyTapCatcher.onClick.RemoveListener(EndGame);
        }

        private void ShowCurrent()
        {
            if (_sequence.IsFinished) return;
            PickerStep step = _sequence.Current;
            _cards.Show(step);
            _anyTapCatcher.gameObject.SetActive(step.EndsGame);
        }

        private void OnChosen(int side)
        {
            PickerOption option;
            if (!_sequence.TryChoose(side, out option)) return;
            _drop.Play(_clickSfx);

            if (_sequence.Current.EndsGame)
            {
                _drop.Play(option.VoiceSfx);
                EndGame();
                return;
            }

            _cards.Hide();
            _drop.Drop(option, _landPoint, OnLanded);
        }

        private void OnLanded()
        {
            _sequence.Advance();
            StartCoroutine(ShowNextAfterDelay());
        }

        private IEnumerator ShowNextAfterDelay()
        {
            yield return new WaitForSeconds(_nextStepDelay);
            ShowCurrent();
        }

        private void EndGame()
        {
            if (GameManager.Instance != null) GameManager.Instance.EndGame();
        }

        private static void HideDisplay(PickerOption option)
        {
            if (option != null && option.Display != null) option.Display.SetActive(false);
        }
    }
}
