using UnityEngine;
using UnityEngine.EventSystems;
namespace Playable.TempleRun
{
    public class HideSeekTapSurface : MonoBehaviour, IPointerDownHandler
    {
        public RunnerDemoIntro intro;
        public void OnPointerDown(PointerEventData eventData)
        {
            if (intro.HasSelected && !intro.HasEnded) intro.ShowCTA();
        }
    }
}
