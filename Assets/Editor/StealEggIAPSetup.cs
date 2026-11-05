using System;
using System.Linq;
using TMPro;
using UnityEditor;
using UnityEditor.Events;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

// The original IAP shop (SAE_IAPShop) as a scene popup for LunaController: built once from the prefab, then left to
// hand edits (running it again only re-binds the references).
public static class StealEggIAPSetup
{
    const string Prefab="Assets/MiniGames/StealAnEgg/Prefabs/UI/IAPShop/SAE_IAPShop.prefab";
    public const string RootName="IAP Popup";
    const string Offer="Panel/popup/Container_Content/Scroll View/Viewport/Content/[Frame] VIPEgg/Content/";
    // The offer as the live game shows it (the prefab's own texts are placeholders the original filled at runtime).
    static readonly string[] Rates={"39%","24%","18%","11%","6.5%","0.5%","1%"};

    [MenuItem("Steal Egg/Build IAP popup")]
    static void Menu(){StealEggGame game=UnityEngine.Object.FindFirstObjectByType<StealEggGame>();Apply(game);EditorSceneManager.SaveScene(game.gameObject.scene);}

    public static void Apply(StealEggGame game)
    {
        var scene=game.gameObject.scene;
        GameObject root=scene.GetRootGameObjects().FirstOrDefault(r=>r.name==RootName);
        if(!root)root=Build(game);
        Transform offer=root.transform.Find(Offer);
        if(!offer)throw new Exception(RootName+" has no Mecha Egg offer at "+Offer);
        IAPPopupView view=root.GetComponent<IAPPopupView>();if(!view)view=root.AddComponent<IAPPopupView>();
        Transform b10=offer.Find("Buttons/Button_Buy_10"),b1=offer.Find("Buttons/Button_Buy_1");
        view.buy10=b10.GetComponent<Button>();view.buy1=b1.GetComponent<Button>();
        view.label10=b10.Find("Text_Price").GetComponent<TMP_Text>();view.label1=b1.Find("Text_Price").GetComponent<TMP_Text>();
        view.caption10=b10.Find("Text_Amount").gameObject;view.caption1=b1.Find("Text_Amount").gameObject;
        view.hint10=b10.Find(StealEggGame.TapHintName).GetComponent<TapHintView>();view.hint1=b1.Find(StealEggGame.TapHintName).GetComponent<TapHintView>();
        // Popup sounds like the game's other panels (StealEggGame plays them at volume 0.65).
        AudioSource sound=root.GetComponent<AudioSource>();if(!sound)sound=root.AddComponent<AudioSource>();
        sound.playOnAwake=false;sound.loop=false;sound.spatialBlend=0;sound.volume=.65f;
        view.sound=sound;view.openSound=game.popupSound;view.clickSound=game.clickSound;
        if(!view.openSound || !view.clickSound)throw new Exception("StealEggGame popupSound/clickSound not assigned.");
        EditorUtility.SetDirty(view);
        LunaController luna=UnityEngine.Object.FindFirstObjectByType<LunaController>();
        if(luna){var so=new SerializedObject(luna);so.FindProperty("iapPopup").objectReferenceValue=view;so.ApplyModifiedPropertiesWithoutUndo();}
        root.SetActive(false);
        EditorSceneManager.MarkSceneDirty(scene);
        Debug.Log(RootName+" bound to LunaController.");
    }

    static GameObject Build(StealEggGame game)
    {
        var prefab=AssetDatabase.LoadAssetAtPath<GameObject>(Prefab);
        if(!prefab)throw new Exception("Missing "+Prefab);
        var root=(GameObject)PrefabUtility.InstantiatePrefab(prefab,game.gameObject.scene);
        PrefabUtility.UnpackPrefabInstance(root,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);
        root.name=RootName;
        // Original scripts (IAP, DOTween, sounds) are not in the playable; their button events go too.
        foreach(Transform t in root.GetComponentsInChildren<Transform>(true))GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        foreach(Button b in root.GetComponentsInChildren<Button>(true))for(int i=b.onClick.GetPersistentEventCount()-1;i>=0;i--)UnityEventTools.RemovePersistentListener(b.onClick,i);
        // Above the game UI (panels 10-60), under the Overlay UI (end card, 100).
        Canvas canvas=root.GetComponent<Canvas>();canvas.renderMode=RenderMode.ScreenSpaceOverlay;canvas.sortingOrder=95;
        // Cannot be closed.
        Transform close=root.transform.Find("Panel/popup/Button_Close");if(close)close.gameObject.SetActive(false);
        // UI particles need the original UIParticle script; without it they would draw in world space.
        foreach(ParticleSystem ps in root.GetComponentsInChildren<ParticleSystem>(true))ps.gameObject.SetActive(false);
        Transform offer=root.transform.Find(Offer);
        Transform pets=offer.Find("Pets Info");
        for(int i=0;i<pets.childCount && i<Rates.Length;i++){TMP_Text rate=pets.GetChild(i).Find("Text_Content").GetComponent<TMP_Text>();rate.text=Rates[i];}
        TMP_Text tag=offer.Find("Tag").GetComponentInChildren<TMP_Text>(true);if(tag)tag.text="Trend";
        offer.Find("Buttons/Button_Buy_10/Text_Price").GetComponent<TMP_Text>().text="$7.99";
        offer.Find("Buttons/Button_Buy_1/Text_Price").GetComponent<TMP_Text>().text="$0.99";
        // Tutorial hand: a copy of the scene's tap hint on each buy button (placed by hand afterwards if needed).
        SerializedObject so=new SerializedObject(game);
        SerializedProperty hud=so.FindProperty("hudUI");
        var source=(TapHintView)hud.FindPropertyRelative("incubateTapHint").objectReferenceValue;
        if(!source)throw new Exception("hudUI.incubateTapHint is not assigned (template for the IAP tap hints).");
        foreach(string button in new[]{"Buttons/Button_Buy_10","Buttons/Button_Buy_1"})
        {
            Transform parent=offer.Find(button);
            var hint=(RectTransform)UnityEngine.Object.Instantiate(source.gameObject,parent,false).transform;
            hint.name=StealEggGame.TapHintName;hint.SetAsLastSibling();hint.gameObject.SetActive(false);
            hint.localScale=Vector3.one*2.2f;  // this canvas is scaled for 1920x1080
        }
        Style(offer);
        Freeze(root);
        return root;
    }

    // ---- The offer as the live game shows it, from the original sprites ----
    const string UIs="Assets/MiniGames/StealAnEgg/Sprites/UIs/";
    // SAE_UIImageArrayDisplayment's sprite list on the featured slot of SAE_IAPShop.
    static readonly string[] FeaturedSprites={"4c8a6eaf68ddcf84a8ddf54927005baa","9fdc120becf0bdd42a65d4ac03b9f285","3d2b7c45b8178cf4bab46cb2f7d4c845","9d91bc9ef3beb204698951510e6b2dea","ccb83eaad6c744a469e6eb720fd154c7","40d2e1cd38d88f24fa16dc0c9afc5a71"};
    static Sprite UISprite(string file){Sprite s=AssetDatabase.LoadAssetAtPath<Sprite>(UIs+file);if(!s)throw new Exception("Missing sprite "+UIs+file);return s;}
    static void Style(Transform offer)
    {
        // Corner ribbon (TrendRibbon.png, the tag's red as a band across the top-left corner) with the tag text turned
        // 45 degrees on it. No mask: Luna clipped the rotated text away inside a RectMask2D.
        Transform oldTag=offer.Find("Tag");
        TMP_Text tagText=oldTag.GetComponentInChildren<TMP_Text>(true);
        var ribbon=new GameObject("Trend Ribbon",typeof(RectTransform),typeof(Image)).GetComponent<RectTransform>();
        ribbon.SetParent(offer,false);ribbon.anchorMin=ribbon.anchorMax=ribbon.pivot=new Vector2(0,1);ribbon.anchoredPosition=Vector2.zero;ribbon.sizeDelta=new Vector2(220,220);
        Image ribbonImage=ribbon.GetComponent<Image>();ribbonImage.sprite=RibbonSprite();ribbonImage.raycastTarget=false;
        tagText.transform.SetParent(ribbon,false);
        var textRect=(RectTransform)tagText.transform;textRect.anchorMin=textRect.anchorMax=new Vector2(0,1);
        // The band's centre line runs 136/256 of the size from the corner along both edges.
        float mid=220*(136f/256)*.5f;textRect.anchoredPosition=new Vector2(mid,-mid);textRect.sizeDelta=new Vector2(200,56);textRect.localRotation=Quaternion.Euler(0,0,45);
        tagText.fontSize=38;tagText.enableAutoSizing=false;tagText.alignment=TextAlignmentOptions.Center;
        tagText.gameObject.AddComponent<PlayableUIPulse>();  // the tag's DOTweenAnimation (scale 1.1, 0.6 s, yoyo)
        UnityEngine.Object.DestroyImmediate(oldTag.gameObject);
        ribbon.SetAsLastSibling();

        // Buy buttons: larger, the egg count above each button; the pet row moves up to make room for the counts.
        // 10 eggs first by sibling order (Luna ignores the layout's reverseArrangement).
        offer.Find("Buttons/Button_Buy_10").SetAsFirstSibling();
        offer.Find("Buttons").GetComponent<HorizontalLayoutGroup>().reverseArrangement=false;
        ((RectTransform)offer.Find("Buttons")).anchoredPosition+=new Vector2(0,-28);
        ((RectTransform)offer.Find("Pets Info")).anchoredPosition+=new Vector2(0,40);
        foreach(string name in new[]{"Buttons/Button_Buy_10","Buttons/Button_Buy_1"})
        {
            var button=(RectTransform)offer.Find(name);button.sizeDelta=new Vector2(360,112);
            var price=button.Find("Text_Price").GetComponent<TMP_Text>();((RectTransform)price.transform).sizeDelta=new Vector2(360,112);price.fontSize=78;
            var amount=(RectTransform)button.Find("Text_Amount");amount.anchoredPosition=new Vector2(0,80);amount.GetComponent<TMP_Text>().fontSize=40;
        }

        // Pet slots: a rarity-coloured border (original rarity quads) under the dark slot; rates in the bottom-right corner.
        Transform pets=offer.Find("Pets Info");
        var borders=new System.Collections.Generic.Dictionary<int,string>{{4,"Sae_Quad5.png"},{5,"Sae_Quad6.png"},{6,"Sae_Quad4.png"}};
        for(int i=0;i<pets.childCount;i++)
        {
            Transform slot=pets.GetChild(i);
            var rate=slot.Find("Text_Content").GetComponent<TMP_Text>();
            rate.fontSize=i==6?52:44;rate.alignment=TextAlignmentOptions.BottomRight;
            var rateRect=(RectTransform)rate.transform;rateRect.anchorMin=Vector2.zero;rateRect.anchorMax=Vector2.one;rateRect.offsetMin=new Vector2(6,8);rateRect.offsetMax=new Vector2(-10,-6);
            if(!borders.TryGetValue(i,out string quad))continue;
            Image slotImage=slot.GetComponent<Image>();
            var inner=new GameObject("Slot",typeof(RectTransform),typeof(Image)).GetComponent<RectTransform>();
            inner.SetParent(slot,false);inner.SetAsFirstSibling();inner.anchorMin=Vector2.zero;inner.anchorMax=Vector2.one;inner.offsetMin=new Vector2(7,7);inner.offsetMax=new Vector2(-7,-7);
            // The slot sprite is see-through: a dark fill inside the border, like the live game's cards.
            Image innerImage=inner.GetComponent<Image>();innerImage.sprite=null;innerImage.color=new Color(.09f,.1f,.14f,1);innerImage.raycastTarget=false;
            slotImage.sprite=UISprite(quad);slotImage.type=Image.Type.Simple;slotImage.color=Color.white;
        }
        // Featured slot: the original slideshow of its sprite list.
        Transform featured=pets.GetChild(pets.childCount-1);
        var cycle=featured.gameObject.AddComponent<PlayableImageCycle>();
        cycle.image=featured.Find("Thumbnail").GetComponent<Image>();
        cycle.sprites=FeaturedSprites.Select(g=>AssetDatabase.LoadAssetAtPath<Sprite>(AssetDatabase.GUIDToAssetPath(g))).Where(sp=>sp).ToArray();
        if(cycle.sprites.Length==0)throw new Exception("Featured pet sprites missing.");

        // Lucky_ui sparkles on the four rarest slots, at the original FX scales; sun rays on the featured one only.
        // Sprite copies of the particle textures (VFX_Blick_5, SunShines4): Luna draws Images, not these RawImages.
        Sprite star=GeneratedSprite("SparkleStar.png"),rays=GeneratedSprite("SparkleRays.png");
        float[] fxScale={1.25f,1.5f,1.75f,2f};
        for(int k=0;k<fxScale.Length;k++)
        {
            Transform slot=pets.GetChild(pets.childCount-fxScale.Length+k);
            float cell=((RectTransform)slot).rect.width,s=fxScale[k]/1.5f;
            bool featuredSlot=k==fxScale.Length-1;
            var sparkle=slot.gameObject.AddComponent<PlayableUISparkle>();
            sparkle.radius=cell*.38f;sparkle.minSize=cell*.12f*s;sparkle.maxSize=cell*.3f*s;sparkle.raySize=cell*1.35f;
            Transform thumb=slot.Find("Thumbnail");
            // Fixed rect sizes saved in the scene; the sparkle only scales, turns and fades them.
            if(featuredSlot)sparkle.rays=Enumerable.Range(0,2).Select(i=>Effect(slot,"Rays "+i,rays,thumb.GetSiblingIndex(),sparkle.raySize)).ToArray();
            sparkle.stars=Enumerable.Range(0,8).Select(i=>Effect(slot,"Star "+i,star,thumb.GetSiblingIndex()+1,sparkle.maxSize)).ToArray();
        }
    }
    // Static layout: laid out once here, then every layout group, fitter, scroll view and mask goes. Luna computed these
    // differently (the offer came out wider than the window and clipped). The popup does not scroll.
    static void Freeze(GameObject root)
    {
        var rect=(RectTransform)root.transform;
        for(int i=0;i<3;i++){Canvas.ForceUpdateCanvases();LayoutRebuilder.ForceRebuildLayoutImmediate(rect);}
        foreach(var c in root.GetComponentsInChildren<ContentSizeFitter>(true))UnityEngine.Object.DestroyImmediate(c);
        foreach(var c in root.GetComponentsInChildren<LayoutGroup>(true))UnityEngine.Object.DestroyImmediate(c);
        foreach(var c in root.GetComponentsInChildren<ScrollRect>(true))UnityEngine.Object.DestroyImmediate(c);
        foreach(var c in root.GetComponentsInChildren<Mask>(true)){Image g=c.GetComponent<Image>();UnityEngine.Object.DestroyImmediate(c);if(g)g.enabled=false;}
        foreach(var c in root.GetComponentsInChildren<RectMask2D>(true))UnityEngine.Object.DestroyImmediate(c);
        Transform scroll=root.transform.Find("Panel/popup/Container_Content/Scroll View");
        scroll.Find("Scrollbar Vertical").gameObject.SetActive(false);
        scroll.Find("Viewport/Content/[Frame] Passes").gameObject.SetActive(false);
        // The scroll view used to hold its content at the top: pin it there.
        var content=(RectTransform)scroll.Find("Viewport/Content");
        Vector3 top=content.TransformPoint(new Vector3(0,content.rect.yMax,0));
        content.pivot=new Vector2(content.pivot.x,1);content.anchoredPosition=new Vector2(content.anchoredPosition.x,0);
    }
    static Sprite RibbonSprite(){return GeneratedSprite("TrendRibbon.png");}
    static Sprite GeneratedSprite(string file)
    {
        string RibbonPath="Assets/PlayableGenerated/UI/"+file;
        AssetDatabase.ImportAsset(RibbonPath);
        var importer=(TextureImporter)AssetImporter.GetAtPath(RibbonPath);
        if(!importer)throw new Exception("Missing "+RibbonPath);
        if(importer.textureType!=TextureImporterType.Sprite || importer.spriteImportMode!=SpriteImportMode.Single)
        {importer.textureType=TextureImporterType.Sprite;importer.spriteImportMode=SpriteImportMode.Single;importer.mipmapEnabled=false;importer.SaveAndReimport();}
        Sprite sprite=AssetDatabase.LoadAssetAtPath<Sprite>(RibbonPath);
        if(!sprite)throw new Exception(RibbonPath+" is not a sprite.");
        return sprite;
    }
    // A scene Image the sparkle animates (no raycasts), inserted at the given sibling index.
    static Image Effect(Transform parent,string name,Sprite sprite,int sibling,float size)
    {
        var t=new GameObject(name,typeof(RectTransform),typeof(Image)).GetComponent<RectTransform>();
        t.SetParent(parent,false);t.SetSiblingIndex(sibling);t.anchorMin=t.anchorMax=new Vector2(.5f,.5f);t.sizeDelta=new Vector2(size,size);t.localScale=Vector3.zero;
        Image image=t.GetComponent<Image>();image.sprite=sprite;image.raycastTarget=false;image.color=new Color(1,1,1,0);
        return image;
    }
}
