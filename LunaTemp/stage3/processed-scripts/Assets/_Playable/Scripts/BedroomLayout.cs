using UnityEngine;
using UnityEngine.UI;
namespace CEBB.Playable
{
    [ExecuteAlways]
    public sealed class BedroomLayout : MonoBehaviour
    {
        public Camera roomCamera;
        public Canvas canvas;
        public RectTransform catalog;
        public GridLayoutGroup grid;
        public RectTransform header;
        public RectTransform prompt;
        public RectTransform cta;
        public RectTransform progress;
        public RectTransform stats;
        public RectTransform movePad;
        public bool firstPersonMode=false;
        public Vector3 lookTarget = new Vector3(.15f,.95f,-.65f);
        public Vector3 viewOffset = new Vector3(4.84f,5.2f,-14.08f);
        public bool respectSafeArea = true;
        private float lastAspect=-1f;
        private Vector2 safeMin=Vector2.zero,safeMax=Vector2.one;
        private Rect lastSafeArea;
        public void ApplyLayout(float aspect)
        {
            if(roomCamera==null||canvas==null||catalog==null||grid==null)return;
            safeMin=Vector2.zero;safeMax=Vector2.one;
            bool capture=roomCamera.targetTexture!=null;
            if(respectSafeArea&&!capture&&Mathf.Abs(aspect-(float)Screen.width/Mathf.Max(1,Screen.height))<.01f)
            {
                Rect area=Screen.safeArea;
                if(area.width>0&&area.height>0){safeMin=new Vector2(area.xMin/Screen.width,area.yMin/Screen.height);safeMax=new Vector2(area.xMax/Screen.width,area.yMax/Screen.height);}
            }
            bool wide=aspect>=1.55f;
            bool tablet=aspect>1.05f&&!wide;
            // Logo kept smaller and below the top edge so the notch / status bar (not reported by Luna's safe area) doesn't cover it.
            Place(header,new Vector2(.04f,.845f),new Vector2(.46f,.925f));
            Place(stats,new Vector2(.76f,.85f),new Vector2(.975f,.92f));
            Place(catalog,new Vector2(.025f,.025f),new Vector2(.975f,.225f));
            Place(prompt,new Vector2(.08f,.755f),new Vector2(.92f,.81f));
            Place(progress,new Vector2(.35f,.23f),new Vector2(.65f,.238f));
            Place(movePad,new Vector2(.045f,.30f),new Vector2(.29f,.43f));
            grid.constraintCount=6;
            if(wide)
            {
                Place(header,new Vector2(.025f,.82f),new Vector2(.35f,.98f));
                Place(stats,new Vector2(.85f,.86f),new Vector2(.98f,.98f));
                Place(catalog,new Vector2(.025f,.025f),new Vector2(.975f,.205f));
                Place(prompt,new Vector2(.3f,.72f),new Vector2(.7f,.80f));
                Place(movePad,new Vector2(.035f,.29f),new Vector2(.155f,.51f));
                grid.constraintCount=12;
            }
            else if(tablet)
            {
                Place(catalog,new Vector2(.08f,.025f),new Vector2(.92f,.30f));
                Place(prompt,new Vector2(.2f,.755f),new Vector2(.8f,.815f));
            }
            Canvas.ForceUpdateCanvases();
            int rows=Mathf.CeilToInt(12f/grid.constraintCount);
            float cell=Mathf.Min((catalog.rect.width-grid.padding.horizontal-(grid.constraintCount-1)*grid.spacing.x)/grid.constraintCount,(catalog.rect.height-grid.padding.vertical-(rows-1)*grid.spacing.y)/rows);
            grid.cellSize=Vector2.one*Mathf.Max(35f,cell);
            if(movePad!=null){float size=Mathf.Min(movePad.rect.width,movePad.rect.height);movePad.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal,size);movePad.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical,size);}
            roomCamera.rect=new Rect(0,0,1,1);roomCamera.orthographic=false;
            roomCamera.fieldOfView=firstPersonMode?(wide?65f:78f):(wide?48f:53f);
            float fit=wide ? 0.75f : (tablet ? 0.9f : Mathf.Max(1f,0.5625f/aspect));
            if(!firstPersonMode){roomCamera.transform.position=lookTarget+viewOffset*fit;roomCamera.transform.LookAt(lookTarget);}
            lastAspect=aspect;lastSafeArea=Screen.safeArea;
        }
        private void Place(RectTransform rt,[Bridge.Ref] Vector2 min,[Bridge.Ref] Vector2 max)
        {
            if(rt==null)return;
            rt.anchorMin=safeMin+Vector2.Scale(min,safeMax-safeMin);
            rt.anchorMax=safeMin+Vector2.Scale(max,safeMax-safeMin);
            rt.offsetMin=rt.offsetMax=Vector2.zero;
        }
        private void Update()
        {float aspect=(float)Screen.width/Mathf.Max(1,Screen.height);if(Mathf.Abs(aspect-lastAspect)>.002f||lastSafeArea!=Screen.safeArea)ApplyLayout(aspect);}
        private void OnPreCull()
        {var camera=GetComponent<Camera>();if(camera!=null&&camera.targetTexture!=null)ApplyLayout((float)camera.targetTexture.width/camera.targetTexture.height);}
    }
}
