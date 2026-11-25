using UnityEngine;
using UnityEngine.EventSystems;
namespace CEBB.Playable
{
    // Full-screen transparent panel: drag = look around, short tap = build the guide block (when tapped on / near it).
    public sealed class RocketLookSurface:MonoBehaviour,IPointerDownHandler,IDragHandler,IPointerUpHandler
    {
        public RocketPlayer player;
        private int pointer=-999;private Vector2 start;private float downTime;private bool dragged;
        public void OnPointerDown(PointerEventData e)
        {
            if(pointer!=-999||player.game.Frozen)return;
            pointer=e.pointerId;start=e.position;downTime=Time.unscaledTime;dragged=false;player.game.NotifyFirstInput();player.game.NotifyInput();player.game.NotifyScreenTouch();
        }
        public void OnDrag(PointerEventData e)
        {
            if(e.pointerId!=pointer)return;player.game.NotifyInput();
            // finger wobble during a tap must not turn the view
            if(!dragged){float limit=Mathf.Max(12f,Screen.height*.015f);if((e.position-start).sqrMagnitude<limit*limit)return;dragged=true;player.ApplyLook(e.position-start);return;}
            player.ApplyLook(e.delta);
        }
        public void OnPointerUp(PointerEventData e)
        {
            if(e.pointerId!=pointer)return;pointer=-999;
            if(!dragged&&Time.unscaledTime-downTime<.5f)player.game.TapAt(e.position);
        }
        private void OnDisable(){pointer=-999;}
    }
}
