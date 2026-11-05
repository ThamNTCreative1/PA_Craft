using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public sealed class HeroSelectionPanel : MonoBehaviour
    {
        [SerializeField] private HeroCardView[] _cards;
        [SerializeField] private GridLayoutGroup _grid;
        private bool _chosen;
        public event Action<HeroId> HeroChosen;
        private void OnEnable()
        {
            foreach (var card in _cards) card.Clicked += OnChosen;
            RefreshLayout();
        }
        private void OnDisable()
        {
            foreach (var card in _cards) card.Clicked -= OnChosen;
        }
        public void Show(HeroRoster.HeroEntry[] entries)
        {
            if (entries == null || entries.Length != 4 || _cards.Length != 4)
                throw new ArgumentException("Hero selection requires exactly four cards.");
            _chosen = false;
            for (int i = 0; i < 4; i++) _cards[i].Bind(entries[i]);
            gameObject.SetActive(true);
            RefreshLayout();
        }
        public void Hide() { gameObject.SetActive(false); }
        private void OnChosen(HeroCardView card)
        {
            if (_chosen) return;
            _chosen = true;
            HeroChosen?.Invoke(card.Id);
        }
        private void OnRectTransformDimensionsChange() { RefreshLayout(); }
        private void RefreshLayout()
        {
            if (_grid == null) return;
            var rect = ((RectTransform)_grid.transform).rect;
            int columns = Screen.width >= Screen.height ? 4 : 2;
            int rows = 4 / columns;
            float width = Mathf.Max(1f, (rect.width - _grid.spacing.x * (columns - 1)) / columns);
            float height = Mathf.Max(1f, (rect.height - _grid.spacing.y * (rows - 1)) / rows);
            _grid.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
            _grid.constraintCount = columns;
            _grid.cellSize = new Vector2(width, Mathf.Min(height, width * 1.5f));
        }
    }
}
