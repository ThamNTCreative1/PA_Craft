#if UNITY_EDITOR
using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

// Authoring only: the playable controls (camera drag, joystick, jump) are saved in the scene before export.
// The game HUD and panels are the original prefabs, baked by StealEggFullGameBaker.
public partial class StealEggGame
{
    public void BakeUI()
    {
        if(safeUI)throw new InvalidOperationException("UI already exists in this scene.");
        if(!FindFirstObjectByType<EventSystem>())new GameObject("EventSystem",typeof(EventSystem),typeof(StandaloneInputModule));
        GameObject go=new GameObject("Playable UI",typeof(Canvas),typeof(CanvasScaler),typeof(GraphicRaycaster));
        Canvas canvas=go.GetComponent<Canvas>();canvas.renderMode=RenderMode.ScreenSpaceOverlay;canvas.sortingOrder=0;
        CanvasScaler scaler=go.GetComponent<CanvasScaler>();scaler.uiScaleMode=CanvasScaler.ScaleMode.ScaleWithScreenSize;scaler.referenceResolution=new Vector2(1920,864);scaler.matchWidthOrHeight=1;
        safeUI=Rect("Safe area",go.transform,Vector2.zero,Vector2.one);
        RectTransform cameraInput=Rect("Camera drag",safeUI,Vector2.zero,Vector2.one);
        cameraInput.gameObject.AddComponent<Image>().color=Color.clear;
        cameraInput.gameObject.AddComponent<PlayableCameraDrag>().cameraController=CameraController.ConfigureFor(this);
        RectTransform pad=Rect("Joystick",safeUI,Vector2.zero,Vector2.zero);
        RectTransform knob=Rect("Knob",pad,Vector2.zero,Vector2.zero);
        joystick=pad.gameObject.AddComponent<PlayableJoystick>();joystick.knob=knob;
        jumpButton=Rect("Jump",safeUI,Vector2.zero,Vector2.zero).gameObject.AddComponent<Button>();
        ConfigureControls();
    }
    // Original joystick and jump art; both sit on their own canvas below the game panels.
    public void ConfigureControls()
    {
        RectTransform pad=(RectTransform)joystick.transform;
        Place(pad,new Vector2(.126f,.34f),new Vector2(200,200));
        Image padImage=pad.GetComponent<Image>();if(!padImage)padImage=pad.gameObject.AddComponent<Image>();
        padImage.sprite=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/MiniGames/Commons/Textures/Ellipse 127.png");padImage.color=new Color(1,1,1,.65f);
        Place(joystick.knob,new Vector2(.5f,.5f),new Vector2(116,116));
        Image knobImage=joystick.knob.GetComponent<Image>();if(!knobImage)knobImage=joystick.knob.gameObject.AddComponent<Image>();
        knobImage.sprite=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/MiniGames/Commons/Textures/Group 857.png");knobImage.color=Color.white;knobImage.raycastTarget=false;
        if(hintHand)hintHand.gameObject.SetActive(false);
        RectTransform jump=(RectTransform)jumpButton.transform;
        Place(jump,new Vector2(.9f,.32f),new Vector2(145,145));
        Image jumpImage=jump.GetComponent<Image>();if(!jumpImage)jumpImage=jump.gameObject.AddComponent<Image>();
        jumpImage.sprite=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/MiniGames/Commons/Textures/Ellipse 127.png");jumpImage.type=Image.Type.Simple;jumpImage.color=new Color(1,1,1,.7f);
        jumpButton.targetGraphic=jumpImage;
        Transform icon=jump.Find("Icon");
        if(!icon){RectTransform rt=Rect("Icon",jump,Vector2.zero,Vector2.zero);rt.gameObject.AddComponent<Image>();icon=rt;}
        Image iconImage=icon.GetComponent<Image>();iconImage.sprite=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/MiniGames/Commons/Textures/jump.png");iconImage.raycastTarget=false;iconImage.preserveAspect=true;
        Place((RectTransform)icon,new Vector2(.5f,.5f),new Vector2(106,106));
        Transform label=jump.Find("Label");if(label)label.gameObject.SetActive(false);
        foreach(Transform control in new Transform[]{pad,jump})
        {
            Canvas canvas=control.GetComponent<Canvas>();if(!canvas)canvas=control.gameObject.AddComponent<Canvas>();
            canvas.overrideSorting=true;canvas.sortingOrder=15;
            if(!control.GetComponent<GraphicRaycaster>())control.gameObject.AddComponent<GraphicRaycaster>();
        }
        EditorUtility.SetDirty(this);
    }
    private static void Place(RectTransform rt,Vector2 anchor,Vector2 size)
    {rt.anchorMin=rt.anchorMax=anchor;rt.pivot=new Vector2(.5f,.5f);rt.anchoredPosition=Vector2.zero;rt.sizeDelta=size;rt.localScale=Vector3.one;}
    private static RectTransform Rect(string name,Transform parent,Vector2 min,Vector2 max)
    {RectTransform rt=new GameObject(name,typeof(RectTransform)).GetComponent<RectTransform>();rt.SetParent(parent,false);rt.anchorMin=min;rt.anchorMax=max;rt.offsetMin=Vector2.zero;rt.offsetMax=Vector2.zero;return rt;}
}
#endif
