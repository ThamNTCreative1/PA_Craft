using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable.BrainrotPlayground
{
    /// <summary>Vùng bắt chạm toàn màn hình (Image trong suốt, raycastTarget = true); báo vị trí chạm.</summary>
    [DisallowMultipleComponent]
    public sealed class TapCatcher : MonoBehaviour, IPointerClickHandler
    {
        public event Action<Vector2> Tapped;

        public void OnPointerClick(PointerEventData eventData)
        {
            Tapped?.Invoke(eventData.position);
        }
    }
}
