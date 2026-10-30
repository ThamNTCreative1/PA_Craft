using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable.TempleRun.EditorTools
{
    public static class RunnerUISetup
    {
        private const string Root = "Assets/_Playable_/TempleRun/UI/Sprites/";
        private static TMP_FontAsset Font => AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset");
        private const string Trimmed = "Assets/_Playable_/TempleRun/UI/Trimmed/";
        private static Sprite Sprite(string name) => AssetDatabase.LoadAssetAtPath<Sprite>(Trimmed + name + ".asset");

        [MenuItem("Tools/Temple Run/Apply Responsive UI")]
        public static void Apply()
        {
            if (!AssetDatabase.IsValidFolder(Trimmed.TrimEnd('/')))
                AssetDatabase.CreateFolder("Assets/_Playable_/TempleRun/UI", "Trimmed");
            foreach (string guid in AssetDatabase.FindAssets("t:Texture2D", new[] { Root.TrimEnd('/') }))
            {
                var importer = (TextureImporter)AssetImporter.GetAtPath(AssetDatabase.GUIDToAssetPath(guid));
                importer.textureType = TextureImporterType.Sprite;
                // Trim transparent padding in sprite metadata, keeping source PNGs intact.
                var pixels = new Texture2D(2, 2);
                ImageConversion.LoadImage(pixels, System.IO.File.ReadAllBytes(importer.assetPath));
                Color32[] colors = pixels.GetPixels32();
                int x0 = pixels.width, y0 = pixels.height, x1 = 0, y1 = 0;
                for (int y = 0; y < pixels.height; y++)
                    for (int x = 0; x < pixels.width; x++)
                        if (colors[y * pixels.width + x].a > 24)
                        {
                            x0 = Mathf.Min(x0, x); x1 = Mathf.Max(x1, x);
                            y0 = Mathf.Min(y0, y); y1 = Mathf.Max(y1, y);
                        }
                importer.spriteImportMode = SpriteImportMode.Single;
                Object.DestroyImmediate(pixels);
                importer.alphaIsTransparency = true;
                importer.mipmapEnabled = false;
                importer.maxTextureSize = 2048;
                importer.textureCompression = TextureImporterCompression.Compressed;
                importer.filterMode = FilterMode.Bilinear;
                importer.SaveAndReimport();
                var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(importer.assetPath);
                var sprite = UnityEngine.Sprite.Create(texture, new Rect(x0, y0, x1-x0+1, y1-y0+1),
                    new Vector2(0.5f, 0.5f), 100f, 0, SpriteMeshType.FullRect);
                sprite.name = System.IO.Path.GetFileNameWithoutExtension(importer.assetPath);
                string path = Trimmed + sprite.name + ".asset";
                var existing = AssetDatabase.LoadAssetAtPath<UnityEngine.Sprite>(path);
                if (existing == null) AssetDatabase.CreateAsset(sprite, path);
                else { EditorUtility.CopySerialized(sprite, existing); Object.DestroyImmediate(sprite); }
            }
            var gm = Object.FindObjectOfType<RunnerGameManager>();
            var ui = gm.ui;
            for (int i = ui.transform.childCount - 1; i >= 0; i--)
                Undo.DestroyObjectImmediate(ui.transform.GetChild(i).gameObject);
            var scaler = ui.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080, 1920);
            scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.Expand;
            var safe = Rect("SafeArea", ui.transform, Vector2.zero, Vector2.zero);
            Stretch(safe);
            ui.safeRoot = safe;
            var counter = Picture("CoinCounter", safe, "counter-panel", new Vector2(260, 90), Vector2.zero, false);
            ui.hudCounter = counter.rectTransform;
            var coin = Picture("CoinIcon", counter.transform, "coin", new Vector2(66, 70), new Vector2(-78, 0));
            ui.coinIcon = coin.rectTransform;
            ui.coinText = Text("CoinText", counter.transform, "0", 48, new Vector2(140, 70), new Vector2(35, 0));
            ui.distanceText = Text("DistanceText", safe, "0 M", 48, new Vector2(250, 90), Vector2.zero);
            ui.moveHandRoot = Tutorial(safe, false, out ui.moveContent, out ui.moveHand);
            ui.jumpHandRoot = Tutorial(safe, true, out ui.jumpContent, out ui.jumpHand);
            ui.moveHandRange = 90;
            ui.jumpHandRange = 70;
            var overlay = Rect("ResultsOverlay", ui.transform, Vector2.zero, Vector2.zero);
            Stretch(overlay);
            var shade = overlay.gameObject.AddComponent<Image>();
            shade.color = new Color(0.01f, 0.035f, 0.04f, 0.72f);
            shade.raycastTarget = true;
            ui.endPanel = overlay.gameObject;
            var resultSafe = Rect("ResultSafeArea", overlay, Vector2.zero, Vector2.zero);
            Stretch(resultSafe);
            ui.resultSafeRoot = resultSafe;
            var card = Picture("ResultCard", resultSafe, "panel-success", new Vector2(760, 1080), Vector2.zero, false);
            card.type = Image.Type.Simple;
            ui.endCard = card.rectTransform;
            ui.endCardImage = card;
            var badge = Picture("ResultBadge", card.transform, "trophy", new Vector2(210, 210), new Vector2(0,480));
            ui.endBadge = badge.rectTransform;
            ui.endBadgeImage = badge;
            ui.endTitleText = Text("ResultTitle", card.transform, "GREAT RUN!", 76, new Vector2(650,130), Vector2.zero);
            ui.endTitleText.gameObject.SetActive(false);
            ui.endTitleImage = Picture("ResultHeading", card.transform, "title-great-run", new Vector2(700,270), new Vector2(0,305));
            ui.winTitleSprite = Sprite("title-great-run");
            ui.failTitleSprite = Sprite("title-caught");
            ui.endDistanceText = Text("ResultDistance", card.transform, "0", 160, new Vector2(600,180), Vector2.zero);
            ui.endMetersText = Text("Meters", card.transform, "METERS", 44, new Vector2(500,65), Vector2.zero);
            var rewards = Picture("RewardCounter", card.transform, "counter-panel", new Vector2(380,110), Vector2.zero,false);
            rewards.enabled = false;
            ui.endCounter = rewards.rectTransform;
            Picture("RewardCoin", rewards.transform, "coin", new Vector2(80,80),new Vector2(-80,0));
            ui.endCoinsText = Text("RewardValue", rewards.transform, "0",64,new Vector2(210,90),new Vector2(45,0));
            ui.retryCountText = Text("RetriesRemaining",card.transform,"",32,new Vector2(580,60),Vector2.zero);
            ui.retryCountText.gameObject.SetActive(false);
            var retry = Picture("TryAgain",card.transform,"button-try-again",new Vector2(590,220),Vector2.zero,false);
            retry.raycastTarget = true;
            ui.retryButton = retry.gameObject.AddComponent<Button>();
            var cta = Rect("PlayNow",card.transform,new Vector2(590,150),Vector2.zero);
            var ctaImage = cta.gameObject.AddComponent<Image>();
            ctaImage.sprite = Sprite("counter-panel");
            ctaImage.type = Image.Type.Simple;
            ctaImage.preserveAspect = true;
            ui.endCtaButton = cta.gameObject.AddComponent<Button>();
            var ctaText = Text("Label",cta,"PLAY NOW",60,new Vector2(530,120),Vector2.zero);
            Stretch(ctaText.rectTransform);
            ctaText.rectTransform.offsetMin = new Vector2(36, 12);
            ctaText.rectTransform.offsetMax = new Vector2(-36, -12);
            ctaText.color = new Color(1f,0.84f,0.25f);
            ui.endBackgroundButton = null;
            ui.countdownRoot = null;
            ui.countdownText = null;
            ui.winPanelSprite = Sprite("panel-success");
            ui.failPanelSprite = Sprite("panel-caught");
            ui.winBadgeSprite = Sprite("trophy");
            ui.failBadgeSprite = Sprite("caught-badge");
            ui.RefreshLayout();
            ui.moveHandRoot.SetActive(false);
            ui.jumpHandRoot.SetActive(false);
            ui.endPanel.SetActive(false);
            EditorUtility.SetDirty(ui);
            EditorSceneManager.MarkSceneDirty(ui.gameObject.scene);
            EditorSceneManager.SaveScene(ui.gameObject.scene);
        }

        private static GameObject Tutorial(Transform parent, bool jump, out RectTransform content, out RectTransform hand)
        {
            content = Rect(jump ? "TutorialJump" : "TutorialMove",parent,new Vector2(760,500),Vector2.zero);
            Picture("Instruction",content,jump ? "tutorial-swipe-jump" : "tutorial-swipe-move",new Vector2(jump ? 700 : 650,230),new Vector2(0,150));
            hand = Picture("Hand",content,"hand",new Vector2(160,190),new Vector2(jump ? 150 : 0,-155)).rectTransform;
            if (jump)
                Picture("ArrowUp",content,"arrow-up",new Vector2(100,140),new Vector2(0,-25));
            else
            {
                Picture("ArrowLeft",content,"arrow-left",new Vector2(130,100),new Vector2(-205,-130));
                Picture("ArrowRight",content,"arrow-right",new Vector2(130,100),new Vector2(205,-130));
            }
            return content.gameObject;
        }

        private static RectTransform Rect(string name, Transform parent, Vector2 size, Vector2 pos)
        {
            var go = new GameObject(name,typeof(RectTransform));
            go.transform.SetParent(parent,false);
            var rt = (RectTransform)go.transform;
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f,0.5f);
            rt.sizeDelta = size;
            rt.anchoredPosition = pos;
            return rt;
        }
        private static void Stretch(RectTransform rt)
        {
            rt.anchorMin = Vector2.zero; rt.anchorMax = Vector2.one;
            rt.offsetMin = rt.offsetMax = Vector2.zero;
        }
        private static Image Picture(string name, Transform parent, string sprite, Vector2 size, Vector2 pos, bool aspect = true)
        {
            var image = Rect(name,parent,size,pos).gameObject.AddComponent<Image>();
            image.sprite = Sprite(sprite);
            image.preserveAspect = true;
            image.raycastTarget = false;
            return image;
        }
        private static TMP_Text Text(string name, Transform parent, string value, float size, Vector2 rect, Vector2 pos)
        {
            var text = Rect(name,parent,rect,pos).gameObject.AddComponent<TextMeshProUGUI>();
            text.font = Font;
            text.fontSharedMaterial = AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable_/TempleRun/Generated/Materials/TR_FontLuna.mat") ?? Font.material;
            text.fontStyle = FontStyles.Bold;
            text.text = value;
            text.fontSize = text.fontSizeMax = size;
            text.fontSizeMin = size * 0.5f;
            text.enableAutoSizing = true;
            text.alignment = TextAlignmentOptions.Center;
            text.textWrappingMode = TextWrappingModes.NoWrap;
            text.raycastTarget = false;
            return text;
        }
    }
}
