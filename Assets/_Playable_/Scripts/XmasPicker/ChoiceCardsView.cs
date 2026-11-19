using System;
using TMPro;
using UnityEngine;

namespace Playable
{
    // Bottom panel: title + two cards + hand hint. Knows nothing about what a choice does.
    public class ChoiceCardsView : MonoBehaviour
    {
        [SerializeField] private CanvasGroup _group;
        [SerializeField] private TMP_Text _title;
        [SerializeField] private ChoiceCard _left;
        [SerializeField] private ChoiceCard _right;
        [SerializeField] private PingPongHandHint _hand;

        public event Action<int> Chosen;

        private void Awake()
        {
            _left.Clicked += OnLeft;
            _right.Clicked += OnRight;
            SetVisible(false);
        }

        private void OnDestroy()
        {
            _left.Clicked -= OnLeft;
            _right.Clicked -= OnRight;
        }

        public void Show(PickerStep step)
        {
            _title.text = step.Title;
            _left.Bind(step.Get(PickerStep.Left).Icon);
            _right.Bind(step.Get(PickerStep.Right).Icon);
            SetInteractable(true);
            SetVisible(true);
            _hand.Play((RectTransform)_left.transform, (RectTransform)_right.transform);
        }

        public void Hide()
        {
            _hand.Stop();
            SetInteractable(false);
            SetVisible(false);
        }

        private void SetVisible(bool visible)
        {
            _group.alpha = visible ? 1f : 0f;
            _group.blocksRaycasts = visible;
        }

        private void SetInteractable(bool value)
        {
            _left.SetInteractable(value);
            _right.SetInteractable(value);
        }

        private void OnLeft()
        {
            Raise(PickerStep.Left);
        }

        private void OnRight()
        {
            Raise(PickerStep.Right);
        }

        private void Raise(int side)
        {
            if (Chosen != null) Chosen(side);
        }
    }
}
