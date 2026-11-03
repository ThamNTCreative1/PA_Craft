using UnityEditor;
using UnityEngine;
using UnityEngine.UI;
namespace Playable.TempleRun.EditorTools
{
    public static class HideSeekCapture
    {
        public static void Capture(int width,int height,string name)
        {
            var intro=Object.FindFirstObjectByType<RunnerDemoIntro>();
            var canvas=intro.view.GetComponent<Canvas>();var scaler=canvas.GetComponent<CanvasScaler>();var cam=intro.introCamera;
            var rt=new RenderTexture(width,height,24);var oldMode=canvas.renderMode;var oldScale=scaler.uiScaleMode;var oldFactor=scaler.scaleFactor;
            cam.targetTexture=rt;canvas.renderMode=RenderMode.ScreenSpaceCamera;canvas.worldCamera=cam;canvas.planeDistance=0.5f;
            scaler.uiScaleMode=CanvasScaler.ScaleMode.ConstantPixelSize;scaler.scaleFactor=Mathf.Min(width/1920f,height/1080f);canvas.scaleFactor=scaler.scaleFactor;
            intro.view.safeRoot.anchorMin=Vector2.zero;intro.view.safeRoot.anchorMax=Vector2.one;
            // The portrait canvas has 1080 design units across, matching runtime Expand.
            if(height>width){scaler.scaleFactor=width/1080f;canvas.scaleFactor=scaler.scaleFactor;}
            intro.view.ApplyOrientation(height>width);
            Canvas.ForceUpdateCanvases();foreach(var text in intro.view.GetComponentsInChildren<TMPro.TMP_Text>(true))text.ForceMeshUpdate(true);
            cam.Render();var old=RenderTexture.active;RenderTexture.active=rt;var tex=new Texture2D(width,height,TextureFormat.RGB24,false);
            tex.ReadPixels(new Rect(0,0,width,height),0,0);tex.Apply();System.IO.Directory.CreateDirectory("Temp/HideSeek");System.IO.File.WriteAllBytes("Temp/HideSeek/"+name+".png",tex.EncodeToPNG());
            RenderTexture.active=old;cam.targetTexture=null;canvas.renderMode=oldMode;scaler.uiScaleMode=oldScale;scaler.scaleFactor=oldFactor;
            Object.DestroyImmediate(rt);Object.DestroyImmediate(tex);
        }
    }
}
