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
        public RectTransform completedDemo;
        public Vector2 landscapeLogoSize = new Vector2(.3137764f,.08171281f);
        public Vector2 landscapeLogoTopCenter = new Vector2(.146597549f,.97f);
        public Vector2 landscapePreviewSize = new Vector2(.218385234f,.2244768f);
        public Vector2 landscapePreviewTopCenter = new Vector2(.12963672f,.865759f);
        public LunaTextOutline[] textOutlines;
        public RectTransform movePad;
        public bool firstPersonMode=false;
        [HideInInspector] public bool preserveCameraView=false;
        public Vector3 lookTarget = new Vector3(.15f,.95f,-.65f);
        public Vector3 viewOffset = new Vector3(4.84f,5.2f,-14.08f);
        public bool respectSafeArea = true;
        [Min(1)] public int catalogItemCount = 12;
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
            Place(stats,new Vector2(.76f,.88f),new Vector2(.975f,.92f));
            Place(catalog,new Vector2(.025f,.025f),new Vector2(.975f,.225f));
            Place(prompt,new Vector2(.08f,.755f),new Vector2(.92f,.81f));
            Place(progress,new Vector2(.35f,.23f),new Vector2(.65f,.238f));
            Place(movePad,new Vector2(.045f,.30f),new Vector2(.29f,.43f));
            grid.constraintCount=catalogItemCount<=6?3:6;
            if(wide)
            {
                Place(header,new Vector2(.025f,.82f),new Vector2(.35f,.98f));
                Place(stats,new Vector2(.85f,.90f),new Vector2(.98f,.98f));
                Place(catalog,new Vector2(.025f,.025f),new Vector2(.975f,.205f));
                Place(prompt,new Vector2(.3f,.72f),new Vector2(.7f,.80f));
                Place(movePad,new Vector2(.035f,.29f),new Vector2(.155f,.51f));
                grid.constraintCount=Mathf.Min(12,catalogItemCount);
            }
            else if(tablet)
            {
                Place(catalog,new Vector2(.08f,.025f),new Vector2(.92f,.30f));
                Place(prompt,new Vector2(.2f,.755f),new Vector2(.8f,.815f));
            }
            // Six garden items use square cards, with two rows in portrait.
            bool gardenCatalog = catalogItemCount >= 6 && catalogItemCount <= 9;
            bool gardenLandscape = aspect >= 1f;
            if(gardenCatalog)
            {
                grid.constraintCount=gardenLandscape?catalogItemCount:3;
                grid.spacing=new Vector2(12,12);
                grid.padding=new RectOffset(16,16,14,14);
                grid.childAlignment=TextAnchor.MiddleCenter;
                Place(catalog,new Vector2(.025f,.025f),new Vector2(.975f,gardenLandscape ? 0.245f : (catalogItemCount>6 ? .34f : .255f)));
            }
            if(completedDemo!=null)
            {
                bool landscape=aspect>=1f;
                // Use the short screen edge so rotating preserves the size of both images.
                float width=.24f/Mathf.Max(1f,aspect);
                const float landscapeColumnX=.13f;
                float left=landscape ? landscapeColumnX-width*.5f : .04f;
                float logoTop=landscape ? .97f : .925f;
                float logoAspect=3.84f;
                var logoImage=header!=null ? header.GetComponent<Image>() : null;
                if(logoImage!=null&&logoImage.sprite!=null)
                    logoAspect=logoImage.sprite.rect.width/logoImage.sprite.rect.height;
                float logoBottom=logoTop-width*aspect/logoAspect;
                Place(header,new Vector2(left,logoBottom),new Vector2(left+width,logoTop));
                float top=logoBottom-.02f;
                if(landscape)
                {
                    Place(movePad,new Vector2(landscapeColumnX-.06f,.29f),new Vector2(landscapeColumnX+.06f,.51f));
                }
                Place(completedDemo,new Vector2(left,top-width*aspect),new Vector2(left+width,top));
                if(landscape)
                {
                    // Preserve the sizes and positions authored in the scene for landscape.
                    Vector2 logoSize=landscapeLogoSize/new Vector2(aspect,1f);
                    Vector2 previewSize=landscapePreviewSize/new Vector2(aspect,1f);
                    Place(header,new Vector2(landscapeLogoTopCenter.x-logoSize.x*.5f,landscapeLogoTopCenter.y-logoSize.y),new Vector2(landscapeLogoTopCenter.x+logoSize.x*.5f,landscapeLogoTopCenter.y));
                    Place(completedDemo,new Vector2(landscapePreviewTopCenter.x-previewSize.x*.5f,landscapePreviewTopCenter.y-previewSize.y),new Vector2(landscapePreviewTopCenter.x+previewSize.x*.5f,landscapePreviewTopCenter.y));
                    float promptCenter=landscapePreviewTopCenter.y-previewSize.y*.5f;
                    Place(prompt,new Vector2(.27f,promptCenter-.035f),new Vector2(.80f,promptCenter+.035f));
                }
                else
                {
                    float portraitLogoWidth=width*1.5f;
                    Place(header,new Vector2(left,logoTop-portraitLogoWidth*aspect/logoAspect),new Vector2(left+portraitLogoWidth,logoTop));
                    float promptTop=top-width*aspect-.025f;
                    Place(prompt,new Vector2(.08f,promptTop-.055f),new Vector2(.92f,promptTop));
                }
                if(!landscape)Place(movePad,new Vector2(.045f,.36f),new Vector2(.28f,.49f));
            }
            Canvas.ForceUpdateCanvases();
            int rows=Mathf.CeilToInt((float)catalogItemCount/grid.constraintCount);
            float cellWidth=(catalog.rect.width-grid.padding.horizontal-(grid.constraintCount-1)*grid.spacing.x)/grid.constraintCount;
            float cellHeight=(catalog.rect.height-grid.padding.vertical-(rows-1)*grid.spacing.y)/rows;
            float cell=Mathf.Max(35f,Mathf.Min(cellWidth,cellHeight));
            grid.cellSize=Vector2.one*cell;
            if(gardenCatalog)
            {
                catalog.pivot=new Vector2(.5f,0);
                catalog.anchorMin=catalog.anchorMax=new Vector2(.5f,safeMin.y+.025f*(safeMax.y-safeMin.y));
                catalog.anchoredPosition=Vector2.zero;
                catalog.sizeDelta=new Vector2(cell*grid.constraintCount+grid.padding.horizontal+(grid.constraintCount-1)*grid.spacing.x,cell*rows+grid.padding.vertical+(rows-1)*grid.spacing.y);
            }
            if(movePad!=null){float size=Mathf.Min(movePad.rect.width,movePad.rect.height);movePad.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal,size);movePad.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical,size);}
            if(!preserveCameraView)
            {
                roomCamera.rect=new Rect(0,0,1,1);roomCamera.orthographic=false;
                roomCamera.fieldOfView=firstPersonMode?(wide?65f:78f):(wide?48f:53f);
                float fit=wide ? 0.75f : (tablet ? 0.9f : Mathf.Max(1f,0.5625f/aspect));
                if(!firstPersonMode){roomCamera.transform.position=lookTarget+viewOffset*fit;roomCamera.transform.LookAt(lookTarget);}
            }
            if(textOutlines!=null)for(int i=0;i<textOutlines.Length;i++)
                if(textOutlines[i]!=null&&textOutlines[i].isActiveAndEnabled)textOutlines[i].Refresh();
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
