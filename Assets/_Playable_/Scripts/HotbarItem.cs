using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class HotbarItem : MonoBehaviour
    {
        [SerializeField] private Monster _prefab;
        [SerializeField] private Button _button;
        [SerializeField] private GameObject _selectedIndicator;
        [SerializeField] private Canvas _canvas;

        [Tooltip("SortingOrder khi hotbar được tutorial highlight (nổi lên trên màn blur). " +
                 "Lúc không highlight thì Canvas trở về thứ tự của Canvas cha, nằm dưới màn blur.")]
        [SerializeField]
        private int _highlightSortingOrder = 3;

        private IMonsterSelector _selector;

        public RectTransform ButtonRect => _button != null ? (RectTransform)_button.transform : null;

        private void Start()
        {
            _button.onClick.AddListener(OnClick);
        }

        public void Init(IMonsterSelector selector)
        {
            _selector = selector;
            TurnOnCanvas(false);
        }

        private void OnClick()
        {
            // Không tự bật _selectedIndicator ở đây nữa - MapController.SelectMonster() làm chủ toàn bộ
            // trạng thái chọn/bỏ chọn (kể cả case bấm lại đúng hotbar đang chọn để bỏ chọn), gọi lại qua
            // SetSelected(). Tự bật true ở đây sẽ đè mất quyết định bỏ chọn của MapController.
            _selector.SelectMonster(_prefab, this);
        }

        public void SetSelected(bool selected)
        {
            _selectedIndicator.SetActive(selected);
        }

        public void TurnOnCanvas(bool active)
        {
            if (_canvas == null)
            {
                _canvas = GetComponent<Canvas>();
            }

            if (_canvas == null)
            {
                return;
            }

            _canvas.overrideSorting = active;
            _canvas.sortingOrder = active ? _highlightSortingOrder : 0;
        }
    }
}
