using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
namespace CEBB.Playable
{
    // Virtual joystick + move-tutorial demo.
    // Note: the thumb field must NOT be called "handle" - in Luna builds that name resolved to null.
    public sealed class RoomMovePad:MonoBehaviour,IPointerDownHandler,IInitializePotentialDragHandler,IDragHandler,IPointerUpHandler
    {
        [UnityEngine.Serialization.FormerlySerializedAs("handle")]
        public RectTransform thumbRect;
        [Tooltip("Move tutorial: the thumb is pulled up, then released, in a loop until the player moves.")]
        public bool demo;
        [Range(.1f,1f)] public float demoPull=.8f;
        [Min(.3f)] public float demoCycleSeconds=1.3f;
        private RectTransform padRect;private int pointer=-999;
        public Vector2 Value {get;private set;}
        public bool Pressed {get{return pointer!=-999;}}
        private void Awake()
        {
            padRect=GetComponent<RectTransform>();
            if(thumbRect==null){var t=transform.Find("Thumb");if(t!=null)thumbRect=t as RectTransform;}
            if(thumbRect!=null){thumbRect.anchorMin=thumbRect.anchorMax=thumbRect.pivot=new Vector2(.5f,.5f);var g=thumbRect.GetComponent<Graphic>();if(g!=null)g.raycastTarget=false;}
            SetThumb(Vector2.zero);
        }
        private float Radius {get{return Mathf.Max(10f,Mathf.Min(padRect.rect.width,padRect.rect.height)*.38f);}}
        public void OnPointerDown(PointerEventData e){if(pointer!=-999)return;pointer=e.pointerId;Track(e);}
        public void OnInitializePotentialDrag(PointerEventData e){e.useDragThreshold=false;}
        public void OnDrag(PointerEventData e){if(e.pointerId==pointer)Track(e);}
        public void OnPointerUp(PointerEventData e){if(e.pointerId==pointer){pointer=-999;Value=Vector2.zero;SetThumb(Vector2.zero);}}
        private void Track(PointerEventData e)
        {
            Vector2 local;
            if(!RectTransformUtility.ScreenPointToLocalPointInRectangle(padRect,e.position,e.pressEventCamera,out local))return;
            local-=padRect.rect.center;float r=Radius;Value=Vector2.ClampMagnitude(local/r,1);SetThumb(Value*r);
        }
        private void SetThumb(Vector2 offset){if(thumbRect!=null)thumbRect.anchoredPosition=offset;}
        private void Update()
        {
            if(thumbRect!=null){float s=Mathf.Min(padRect.rect.width,padRect.rect.height)*.4f;if(Mathf.Abs(thumbRect.sizeDelta.x-s)>.5f)thumbRect.sizeDelta=new Vector2(s,s);}
            if(Pressed)return;
            if(!demo){SetThumb(Vector2.zero);return;}
            // 0-45%: ease up, 45-65%: hold, 65-75%: snap back (released), rest: idle.
            float t=(Time.unscaledTime%demoCycleSeconds)/demoCycleSeconds,k;
            if(t<.45f){float u=t/.45f;k=1f-(1f-u)*(1f-u);}
            else if(t<.65f)k=1f;
            else if(t<.75f){float u=(t-.65f)/.1f;k=1f-u*u*(3f-2f*u);}
            else k=0f;
            SetThumb(new Vector2(0,Radius*demoPull*k));
        }
        private void OnDisable(){pointer=-999;Value=Vector2.zero;SetThumb(Vector2.zero);}
    }
}
