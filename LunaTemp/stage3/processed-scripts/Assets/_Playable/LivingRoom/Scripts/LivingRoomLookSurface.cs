using UnityEngine;
using UnityEngine.EventSystems;
namespace CEBB.Playable
{
    // Full-screen transparent panel: drag = look around, short tap = build at the ghost / remove the tapped item.
    public sealed class LivingRoomLookSurface:MonoBehaviour,IPointerDownHandler,IDragHandler,IPointerUpHandler
    {
        public LivingRoomPlayer player;
        private int pointer=-999;private Vector2 start;private float downTime;private bool dragged;
        public void OnPointerDown(PointerEventData e)
        {
            if(pointer!=-999||player.game.EndOverlayArmed)return;
            pointer=e.pointerId;start=e.position;downTime=Time.unscaledTime;dragged=false;player.game.NotifyFirstInput();player.game.NotifyScreenTouch();
        }
        public void OnDrag(PointerEventData e)
        {
            if(e.pointerId!=pointer)return;
            // A tap must not turn the view: the finger always wobbles a few pixels, which used to rotate the camera,
            // move the ghost to the next grid cell and build there instead of where the ghost was when the finger went down.
            // The view only turns once the finger has really moved (then the whole movement so far is applied at once).
            if(!dragged)
            {
                float limit=Mathf.Max(12f,Screen.height*.015f);
                if((e.position-start).sqrMagnitude<limit*limit)return;
                dragged=true;player.ApplyLook(e.position-start);return;
            }
            player.ApplyLook(e.delta);
        }
        public void OnPointerUp(PointerEventData e)
        {
            if(e.pointerId!=pointer)return;pointer=-999;
            if(!dragged&&Time.unscaledTime-downTime<.5f)player.game.TapAt(e.position);else player.game.ClearIgnoredTap();
        }
        private void OnDisable(){pointer=-999;}
    }
}
