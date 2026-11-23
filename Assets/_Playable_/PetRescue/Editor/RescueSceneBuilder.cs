using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using TMPro;

namespace Playable.PetRescue.Editor
{
    public static class RescueSceneBuilder
    {
        public const string Root = "Assets/_Playable_/PetRescue";
        public const string ScenePath = "Assets/_Playable_/Scenes/PetRescue.unity";
        private const int RoadStartZ = -8, RoadEndZ = 130;
        private const string SourceAssets = "D:/Source/minecraft/Assets/";
        private const string BlockSource = SourceAssets + "ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/";
        private const string Source = "D:/Source/minecraft/Assets/Game/Models/Animals/";

        [MenuItem("Playable/Pet Rescue/Build Approved Scene")]
        public static void Build()
        {
            if (EditorApplication.isPlaying || SceneManagerDirty()) throw new InvalidOperationException("Stop Play Mode and save the current scene first.");
            Material selectedSkybox = RenderSettings.skybox;
            foreach (string dir in new[] { "Models", "Textures", "Materials", "Animation", "Prefabs", "Textures/Blocks", "Shaders/Source/VoxelPlay", "Meshes" }) Directory.CreateDirectory(Root + "/" + dir);
            string[] species = { "Dog", "Duck", "Rabbit", "Pig", "Sheep", "Fox" };
            foreach (string name in species)
            {
                string modelSource = Source + (name == "Dog" ? "dog" : name) + ".fbx";
                string textureSource = Source + name + ".png";
                if (!File.Exists(modelSource) || !File.Exists(textureSource)) throw new FileNotFoundException("Missing approved pet visual: " + name);
                CopyNew(modelSource, Root + "/Models/" + name + ".fbx");
                CopyNew(textureSource, Root + "/Textures/" + name + ".png");
            }
            AssetDatabase.Refresh();
            ImportOriginalVisualAssets();
            var mats = new Dictionary<string, Material>();
            string[] colors = { "Grass", "Dirt", "Stone", "Wood", "Pit", "TntRed", "TntWhite", "TntInk", "Gate", "Burst" };
            Color[] values = { new Color(.38f,.66f,.19f), new Color(.38f,.24f,.12f), new Color(.38f,.42f,.43f), new Color(.48f,.29f,.12f), new Color(.07f,.08f,.1f), new Color(.85f,.12f,.06f), new Color(.95f,.9f,.75f), new Color(.1f,.08f,.06f), new Color(.25f,.95f,.6f), new Color(1,.64f,.08f) };
            for (int i = 0; i < colors.Length; i++) mats[colors[i]] = Solid(colors[i], values[i]);
            Material heroMat = Textured("Hero", AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/GameAsset/Model/Character/Player/Base_Character.png"));
            foreach (string name in species) ConfigurePet(name);
            PreservePixelTexture("Assets/GameAsset/Model/Character/Player/Base_Character.png");
            mats["Grass"] = Textured("Grass", BlockTexture("grass_block_top"));
            mats["Dirt"] = Textured("Dirt", BlockTexture("dirt"));
            mats["Pit"] = Textured("Pit", BlockTexture("stone"));
            mats["Stone"] = Textured("Stone", BlockTexture("jungle_door_top"));
            mats["Stone"].shader = Shader.Find("Unlit/Transparent Cutout");
            mats["Wood"] = Textured("Wood", BlockTexture("oak_planks"));
            mats["GrassSide"] = Textured("GrassSide", BlockTexture("jungle_grass_block_side"));
            mats["LogSide"] = Textured("LogSide", BlockTexture("oak_log"));
            mats["LogTop"] = Textured("LogTop", BlockTexture("oak_log_top"));
            mats["Leaves"] = Textured("Leaves", BlockTexture("oak_leaves"));
            mats["Leaves"].shader = Shader.Find("Unlit/Transparent Cutout");
            mats["StoneBricks"] = Textured("StoneBricks", BlockTexture("stone_bricks"));
            mats["MossyStoneBricks"] = Textured("MossyStoneBricks", BlockTexture("mossy_stone_bricks"));
            Mesh grassMesh = BlockMesh("GrassBlock"); Mesh logMesh = BlockMesh("LogBlock");

            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
            RenderSettings.skybox = selectedSkybox; RenderSettings.fog = false;
            var world = new GameObject("World").transform;
            var tiles = new List<GameObject>();
            for (int z = RoadStartZ; z < RoadEndZ; z++) for (int x = -3; x < 3; x++)
            {
                var tile = new GameObject("Tile " + x + " " + z); tile.transform.SetParent(world);
                tile.transform.position = new Vector3(x + .5f, 0, z + .5f); tiles.Add(tile);
                Block("Grass", tile.transform, new Vector3(0,-.5f,0), Vector3.one, grassMesh, mats["GrassSide"], mats["Grass"], mats["Dirt"]);
                Cube("Earth", tile.transform, new Vector3(0,-2.15f,0), new Vector3(1,2.3f,1), mats["Dirt"]);
            }
            BuildScenery(world, grassMesh, logMesh, mats);
            Cube("Pit floor", world, new Vector3(0,-3.4f,(RoadStartZ+RoadEndZ)*.5f), new Vector3(6,.2f,RoadEndZ-RoadStartZ), mats["Pit"]);
            for (int side = -1; side <= 1; side += 2)
            {
                for (int z = RoadStartZ; z < RoadEndZ; z++)
                    Cube("Boundary", world, new Vector3(side * 3.3f,.1f,z+.5f), new Vector3(.5f,.5f,1), mats["Stone"]);
                for (int z = -5; z < RoadEndZ; z += 5)
                    Cube("Fence post", world, new Vector3(side * 3.4f,.8f,z), new Vector3(.3f,1.6f,.3f), mats["Wood"]);
            }
            for (int side = -1; side <= 1; side += 2)
                Cube("Gate pillar", world, new Vector3(side * 2.8f,2,65), new Vector3(.55f,4,.7f), mats["Wood"]);
            Cube("Gate lintel", world, new Vector3(0,4,65), new Vector3(6.2f,.7f,.7f), mats["Wood"]);
            Cube("Safe threshold", world, new Vector3(0,.03f,65), new Vector3(5.1f,.06f,1), mats["Gate"]);

            var hero = new GameObject("Hero"); var motor = hero.AddComponent<RescueHeroMotor>();
            var heroModel = UnityEngine.Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/GameAsset/Model/Character/Player/Character.fbx"), hero.transform);
            heroModel.name = "Hero Visual"; Normalize(heroModel, 1.8f, heroMat);
            var heroAnimator = heroModel.GetComponent<Animator>();
            if (heroAnimator == null) heroAnimator = heroModel.AddComponent<Animator>();
            ConfigureHeroAnimator(heroAnimator); Set(motor,"_animator",heroAnimator);
            PrefabUtility.SaveAsPrefabAsset(hero, Root + "/Prefabs/Hero.prefab");

            var petsRoot = new GameObject("Pets").transform;
            var pets = new List<UnityEngine.Object>();
            Vector3[] offsets = { new Vector3(-.55f,0,-.85f), new Vector3(.50f,0,-1.15f), new Vector3(-.05f,0,-1.65f), new Vector3(.75f,0,-2.3f), new Vector3(-.8f,0,-2.1f), new Vector3(.05f,0,-2.85f) };
            for (int index = 0; index < species.Length; index++)
            {
                string name = species[index];
                var pet = new GameObject(name); pet.transform.SetParent(petsRoot);
                var model = UnityEngine.Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(Root + "/Models/" + name + ".fbx"), pet.transform);
                model.name = name + " Visual";
                // Preserve all authored node transforms/UVs; scale only the gameplay parent.
                var renderers = model.GetComponentsInChildren<Renderer>(true);
                Bounds bounds = renderers[0].bounds;
                foreach (var renderer in renderers)
                {
                    bounds.Encapsulate(renderer.bounds);
                    var materials = new Material[renderer.sharedMaterials.Length];
                    for (int slot = 0; slot < materials.Length; slot++) materials[slot] = AssetDatabase.LoadAssetAtPath<Material>(Root + "/Materials/" + name + ".mat");
                    renderer.sharedMaterials = materials;
                }
                float height = name == "Dog" ? .65f : name == "Sheep" ? .7f : name == "Fox" ? .6f : name == "Pig" ? .55f : .5f;
                pet.transform.localScale = Vector3.one * (height / Mathf.Max(.001f, bounds.size.y));
                var animator = model.GetComponent<Animator>(); if (animator == null) animator = model.AddComponent<Animator>();
                animator.runtimeAnimatorController = AssetDatabase.LoadAssetAtPath<AnimatorController>(Root + "/Animation/" + name + ".controller");
                animator.applyRootMotion = false;
                var follower = pet.AddComponent<RescuePetFollower>();
                Set(follower, "_animator", animator); SetVector(follower, "_offset", offsets[index]);
                pet.transform.position = offsets[index];
                PrefabUtility.SaveAsPrefabAsset(pet, Root + "/Prefabs/" + name + ".prefab");
                pets.Add(follower);
            }
            var tntsRoot = new GameObject("TNTs").transform;
            var hazards = new List<UnityEngine.Object>();
            float[] xs = { -1.8f,1.8f,0,-1.8f,1.8f,0,-1.8f,1.8f,0 };
            float[] zs = { 12,19,26,33,40,47,54,59,62 };
            for (int i = 0; i < xs.Length; i++)
            {
                var tnt = new GameObject("TNT " + (i + 1)); tnt.transform.SetParent(tntsRoot); tnt.transform.position = new Vector3(xs[i],0,zs[i]);
                var visual = new GameObject("Visual"); visual.transform.SetParent(tnt.transform, false);
                Cube("Source TNT cube", visual.transform, new Vector3(0,.5f,0), Vector3.one, AssetDatabase.LoadAssetAtPath<Material>(Root + "/Materials/TNT.mat"));
                var effectPrefab = AssetDatabase.LoadAssetAtPath<GameObject>(Root + "/VFX/tnt_explosion.prefab");
                if (effectPrefab == null) throw new InvalidOperationException("Source TNT VFX prefab is missing.");
                var burst = UnityEngine.Object.Instantiate(effectPrefab,tnt.transform); burst.name = "Source TNT Explosion";
                burst.transform.localPosition = new Vector3(0,.5f,0); burst.SetActive(false);
                var hazard = tnt.AddComponent<RescueTntHazard>(); Set(hazard,"_visual",visual); Set(hazard,"_burst",burst);
                SetArray(hazard,"_particles",burst.GetComponentsInChildren<ParticleSystem>(true));
                if (i == 0) PrefabUtility.SaveAsPrefabAsset(tnt, Root + "/Prefabs/TNT.prefab");
                hazards.Add(hazard);
            }
            var cameraObject = new GameObject("Main Camera"); cameraObject.tag = "MainCamera";
            var camera = cameraObject.AddComponent<Camera>(); camera.clearFlags = CameraClearFlags.Skybox; camera.backgroundColor = new Color(.43f,.65f,1); camera.fieldOfView = 55; camera.farClipPlane = 120;
            cameraObject.AddComponent<AudioListener>(); var follow = cameraObject.AddComponent<RescueCameraFollow>(); Set(follow,"_camera",camera);
            cameraObject.transform.position = new Vector3(0,3,-4.5f); cameraObject.transform.LookAt(new Vector3(0,.8f,1.5f));
            var light = new GameObject("Directional Light").AddComponent<Light>(); light.type = LightType.Directional; light.transform.rotation = Quaternion.Euler(45,-30,0);

            var canvasObject = new GameObject("Canvas", typeof(RectTransform), typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            var canvas = canvasObject.GetComponent<Canvas>(); canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasObject.GetComponent<CanvasScaler>(); scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize; scaler.referenceResolution = new Vector2(1080,1920); scaler.matchWidthOrHeight = .5f;
            var canvasRect = (RectTransform)canvasObject.transform;
            var hud = canvasObject.AddComponent<RescueHudView>();
            var topUi = new GameObject("Top UI",typeof(RectTransform));
            var topUiRect = (RectTransform)topUi.transform; topUiRect.SetParent(canvasRect,false);
            topUiRect.anchorMin = Vector2.zero; topUiRect.anchorMax = Vector2.one;
            topUiRect.offsetMin = topUiRect.offsetMax = Vector2.zero;
            var counter = Label("Rescue count",topUiRect,"0/3",56,new Vector2(.04f,.90f),new Vector2(.28f,.97f));
            counter.alignment = TextAlignmentOptions.MidlineLeft;
            var timer = Label("Countdown",topUiRect,"15",56,new Vector2(.40f,.90f),new Vector2(.60f,.97f));
            var tutorialPanel = Panel("Tutorial",canvasRect,Color.clear,new Vector2(.08f,.05f),new Vector2(.92f,.35f));
            var prompt = Label("Prompt",topUiRect,"LEAD THE HERD",56,new Vector2(.12f,.79f),new Vector2(.88f,.88f));
            counter.rectTransform.anchoredPosition=timer.rectTransform.anchoredPosition=prompt.rectTransform.anchoredPosition=new Vector2(0,112);
            Label("Goal hint",tutorialPanel,"YOUR PETS RUN WITH YOU\nBRING 3+ TO THE GATE!",44,new Vector2(.04f,.01f),new Vector2(.96f,.42f));
            var handObject = new GameObject("Swipe Hand",typeof(RectTransform),typeof(Image));
            var handRect = (RectTransform)handObject.transform; handRect.SetParent(tutorialPanel,false);
            handRect.anchorMin=new Vector2(.5f,.48f); handRect.anchorMax=new Vector2(.5f,.98f); handRect.sizeDelta=new Vector2(184,0);
            var handImage=handObject.GetComponent<Image>(); handImage.sprite=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/Game/Textures/UI/Common/icon_hand.png");
            if(handImage.sprite==null) throw new InvalidOperationException("Existing tutorial hand sprite is missing.");
            handImage.preserveAspect=true; handImage.raycastTarget=false;
            var leftArrow=Label("Swipe left",tutorialPanel,"<<",44,new Vector2(.5f,.73f),new Vector2(.5f,.73f));
            var rightArrow=Label("Swipe right",tutorialPanel,">>",44,new Vector2(.5f,.73f),new Vector2(.5f,.73f));
            leftArrow.rectTransform.sizeDelta=rightArrow.rectTransform.sizeDelta=new Vector2(68,60);
            var tutorial = canvasObject.AddComponent<RescueTutorialView>(); Set(tutorial,"_group",tutorialPanel.gameObject); Set(tutorial,"_prompt",prompt); Set(tutorial,"_cue",handRect);
            Set(tutorial,"_leftArrow",leftArrow.rectTransform); Set(tutorial,"_rightArrow",rightArrow.rectTransform);
            Canvas.ForceUpdateCanvases(); tutorial.ShowSwipe();
            Set(hud,"_counter",counter); Set(hud,"_timer",timer);
            Set(hud,"_topUiRoot",topUiRect); Set(hud,"_canvas",canvas);
            hud.ApplyScreenLayout(Screen.width,Screen.height,Screen.safeArea);
            var endcard = ConfigureEndcard(canvasRect);
            new GameObject("EventSystem",typeof(EventSystem),typeof(StandaloneInputModule));
            var audio = ConfigureAudio();
            var flowObject = new GameObject("RescueFlow"); var pointer = flowObject.AddComponent<RescuePointerInput>(); var flow = flowObject.AddComponent<RescueGameFlow>();
            Set(flow,"_pointer",pointer); Set(flow,"_hero",motor); Set(flow,"_heroVisual",heroModel.transform); Set(flow,"_camera",follow); Set(flow,"_hud",hud); Set(flow,"_audio",audio); Set(flow,"_endcard",endcard); Set(flow,"_tutorial",tutorial); Set(flow,"_gameplayRect",canvasRect);
            SetArray(flow,"_pets",pets.ToArray()); SetArray(flow,"_hazards",hazards.ToArray());
            RescueRound2Patch.Patch(scene,Environment.TickCount & 0x7fffffff);
            EditorSceneManager.SaveScene(scene,ScenePath);
            var buildScenes = new List<EditorBuildSettingsScene>();
            foreach (var entry in EditorBuildSettings.scenes) if (entry.path != ScenePath) buildScenes.Add(new EditorBuildSettingsScene(entry.path,false));
            buildScenes.Insert(0,new EditorBuildSettingsScene(ScenePath,true)); EditorBuildSettings.scenes = buildScenes.ToArray();
            AssetDatabase.SaveAssets(); Debug.Log("Pet Rescue scene created with six distinct pets and nine TNT hazards.");
        }

        private static RescueEndcardView ConfigureEndcard(RectTransform canvas)
        {
            var overlay = Panel("Endcard",canvas,new Color(0,0,0,.58f),Vector2.zero,Vector2.one);
            overlay.GetComponent<Image>().raycastTarget=true;
            var card = new GameObject("Endcard panel",typeof(RectTransform)).GetComponent<RectTransform>();
            card.SetParent(overlay,false);card.anchorMin=card.anchorMax=new Vector2(.5f,.5f);card.sizeDelta=new Vector2(860,500);
            var shadow=Panel("Panel shadow",card,new Color(.16f,.13f,.13f,1),Vector2.zero,Vector2.one);
            shadow.offsetMin=new Vector2(14,-18);shadow.offsetMax=new Vector2(14,-18);
            Panel("Panel border",card,new Color(.35f,.30f,.29f,1),Vector2.zero,Vector2.one);
            Panel("Panel highlight",card,new Color(.81f,.78f,.74f,1),new Vector2(0,.025f),Vector2.one);
            var face=Panel("Panel face",card,new Color(.65f,.61f,.58f,1),new Vector2(.018f,.05f),new Vector2(.982f,.975f));
            var title=Label("Endcard title",face,"HERD LOST!",60,new Vector2(.05f,.66f),new Vector2(.95f,.93f));
            title.color=Color.white;
            var message=Label("Endcard message",face,"Too few made it - lead them all in the full game.",32,new Vector2(.07f,.43f),new Vector2(.93f,.68f));
            message.color=Color.white;
            var border=Panel("Button border",face,new Color(.255f,.239f,.204f,1),new Vector2(.1f,.12f),new Vector2(.9f,.42f));
            Panel("Button bevel",border,new Color(.859f,.831f,.8f,1),new Vector2(0,.065f),Vector2.one);
            var buttonFace=Panel("Install button",border,new Color(.081f,.906f,.086f,1),new Vector2(.018f,.1f),new Vector2(.982f,.94f));
            var image=buttonFace.GetComponent<Image>();image.raycastTarget=true;
            var button=buttonFace.gameObject.AddComponent<Button>();button.targetGraphic=image;
            var colors=button.colors;colors.highlightedColor=Color.white;colors.pressedColor=new Color(.8f,.8f,.8f,1);button.colors=colors;
            var navigation=button.navigation;navigation.mode=Navigation.Mode.None;button.navigation=navigation;
            var installLabel=Label("Install label",buttonFace,"INSTALL NOW",54,new Vector2(.03f,.05f),new Vector2(.97f,.95f));
            installLabel.rectTransform.anchoredPosition=new Vector2(0,-10.6f);
            var view=overlay.gameObject.AddComponent<RescueEndcardView>();
            Set(view,"_card",card);Set(view,"_viewport",canvas);Set(view,"_title",title);Set(view,"_message",message);Set(view,"_installButton",button);
            overlay.gameObject.SetActive(false);
            return view;
        }
        private static RescueAudioView ConfigureAudio()
        {
            var root = new GameObject("Rescue Audio");
            var music = root.AddComponent<AudioSource>(); var effects = root.AddComponent<AudioSource>();
            var steps = root.AddComponent<AudioSource>(); var voices = root.AddComponent<AudioSource>();
            foreach(var source in new[]{music,effects,steps,voices})
            { source.playOnAwake=false; source.spatialBlend=0; source.loop=false; }
            music.clip=AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/Sound/Go Up Music.mp3");
            if(music.clip==null)throw new InvalidOperationException("Go Up Music background clip is missing.");
            music.loop=true; music.volume=.14f;
            var audio=root.AddComponent<RescueAudioView>();
            Set(audio,"_music",music);Set(audio,"_effects",effects);Set(audio,"_steps",steps);Set(audio,"_voices",voices);
            foreach(string name in new[]{"Start","Explosion","PetLost","Rescue","Win","Lose","Warning"})
                Set(audio,"_"+char.ToLowerInvariant(name[0])+name.Substring(1),AudioClipAsset(name));
            SetArray(audio,"_footsteps",new UnityEngine.Object[]{AudioClipAsset("Step1"),AudioClipAsset("Step2")});
            SetArray(audio,"_petCalls",new UnityEngine.Object[]{AudioClipAsset("Dog"),AudioClipAsset("Duck"),AudioClipAsset("Rabbit"),AudioClipAsset("Pig"),AudioClipAsset("Sheep"),AudioClipAsset("Fox")});
            return audio;
        }
        private static AudioClip AudioClipAsset(string name)
        {
            var clip=AssetDatabase.LoadAssetAtPath<AudioClip>(Root+"/Audio/"+name+".ogg");
            if(clip==null)throw new InvalidOperationException("Missing PetRescue sound: "+name);
            return clip;
        }
        private static Texture2D BlockTexture(string name) { return AssetDatabase.LoadAssetAtPath<Texture2D>(Root + "/Textures/Blocks/" + name + ".png"); }

        private static void ImportOriginalVisualAssets()
        {
            string[] blocks = { "grass_block_top", "grass_block_side", "jungle_door_top", "jungle_grass_block_side", "dirt", "stone", "stone_bricks", "mossy_stone_bricks", "oak_log", "oak_log_top", "oak_leaves", "oak_planks", "tnt_side", "tnt_top", "tnt_bottom" };
            var copies = new Dictionary<string,string>();
            foreach (string block in blocks) copies.Add(BlockSource + block + ".png", Root + "/Textures/Blocks/" + block + ".png");
            string[] shaderFiles = { "VPCommon.cginc", "VPCommonBevel.cginc", "VPCommonCore.cginc", "VPCommonInput.cginc", "VPCommonOptions.cginc", "VPCommonSeeThrough.cginc", "VPCommonSky.cginc", "VPCommonURP.cginc", "VPCommonURPSSAO.cginc", "VPCommonVertexModifier.cginc", "VPModel.cginc", "VPModelShadows.cginc", "VPModelShadowsURP.cginc", "VPModelTexture.shader", "VPVoxelTriangleDepthNormalsURP.cginc", "VPVoxelTriangleDepthOnlyURP.cginc", "VPVoxelTriangleOpaque.shader", "VPVoxelTriangleOpaquePass.cginc", "VPVoxelTriangleShadows.cginc", "VPVoxelTriangleShadowsURP.cginc" };
            foreach (string file in shaderFiles) copies.Add(SourceAssets + "Voxel Play/Resources/VoxelPlay/Shaders/" + file, Root + "/Shaders/Source/VoxelPlay/" + file);
            copies.Add(SourceAssets + "Voxel Play/Resources/VoxelPlay/Shaders/VPModelTextureCutoutDoubleSided.shader", Root + "/Shaders/Source/VoxelPlay/VPModelTextureCutoutDoubleSided.shader");
            copies.Add(SourceAssets + "Game/Shaders/CubeSurfaceShader.shader", Root + "/Shaders/Source/CubeSurfaceShader.shader");
            foreach (var pair in copies) CopyNew(pair.Key,pair.Value);
            AssetDatabase.Refresh();
            var guids = new Dictionary<string,string>();
            foreach (var pair in copies) guids[SourceGuid(pair.Key)] = AssetDatabase.AssetPathToGUID(pair.Value);
            foreach (string name in new[] { "Dog", "Duck", "Rabbit", "Pig", "Sheep", "Fox" }) guids[SourceGuid(Source + name + ".png")] = AssetDatabase.AssetPathToGUID(Root + "/Textures/" + name + ".png");
            foreach (string name in new[] { "Dog", "Duck", "Rabbit", "Pig", "Sheep", "Fox", "TNT" })
            {
                string sourcePath = name == "TNT" ? SourceAssets + "Game/Materials/TNT.mat" : Source + name + ".mat";
                string material = File.ReadAllText(sourcePath);
                foreach (var pair in guids) material = material.Replace("guid: " + pair.Key, "guid: " + pair.Value);
                string destination = Root + "/Materials/" + name + ".mat";
                File.WriteAllText(destination,material);
                AssetDatabase.ImportAsset(destination,ImportAssetOptions.ForceUpdate);
            }
            foreach (string block in blocks)
            {
                var importer = (TextureImporter)AssetImporter.GetAtPath(Root + "/Textures/Blocks/" + block + ".png");
                importer.filterMode = FilterMode.Point; importer.mipmapEnabled = false; importer.wrapMode = TextureWrapMode.Repeat; importer.textureCompression = TextureImporterCompression.Uncompressed;
                importer.alphaSource = TextureImporterAlphaSource.FromInput;
                importer.SaveAndReimport();
                PreservePixelTexture(Root + "/Textures/Blocks/" + block + ".png");
            }
        }
        private static string SourceGuid(string path)
        {
            var match = Regex.Match(File.ReadAllText(path + ".meta"), @"guid: ([a-f0-9]{32})");
            if (!match.Success) throw new InvalidOperationException("Source GUID missing: " + path);
            return match.Groups[1].Value;
        }
        private static Mesh BlockMesh(string name)
        {
            string path = Root + "/Meshes/" + name + ".asset";
            var existing = AssetDatabase.LoadAssetAtPath<Mesh>(path); if (existing != null) return existing;
            // Four side faces, top, bottom: each face retains one complete source texture.
            Vector3[] vertices = {
                new Vector3(-.5f,-.5f,-.5f),new Vector3(-.5f,.5f,-.5f),new Vector3(.5f,.5f,-.5f),new Vector3(.5f,-.5f,-.5f),
                new Vector3(.5f,-.5f,.5f),new Vector3(.5f,.5f,.5f),new Vector3(-.5f,.5f,.5f),new Vector3(-.5f,-.5f,.5f),
                new Vector3(-.5f,-.5f,.5f),new Vector3(-.5f,.5f,.5f),new Vector3(-.5f,.5f,-.5f),new Vector3(-.5f,-.5f,-.5f),
                new Vector3(.5f,-.5f,-.5f),new Vector3(.5f,.5f,-.5f),new Vector3(.5f,.5f,.5f),new Vector3(.5f,-.5f,.5f),
                new Vector3(-.5f,.5f,-.5f),new Vector3(-.5f,.5f,.5f),new Vector3(.5f,.5f,.5f),new Vector3(.5f,.5f,-.5f),
                new Vector3(-.5f,-.5f,.5f),new Vector3(-.5f,-.5f,-.5f),new Vector3(.5f,-.5f,-.5f),new Vector3(.5f,-.5f,.5f) };
            var uv = new Vector2[24]; var sides = new List<int>();
            for (int face=0;face<6;face++)
            {
                int v=face*4; uv[v]=new Vector2(0,0);uv[v+1]=new Vector2(0,1);uv[v+2]=new Vector2(1,1);uv[v+3]=new Vector2(1,0);
                if(face<4) sides.AddRange(new[]{v,v+1,v+2,v,v+2,v+3});
            }
            var mesh=new Mesh {name=name,vertices=vertices,uv=uv,subMeshCount=3};
            mesh.SetTriangles(sides.ToArray(),0);mesh.SetTriangles(new[]{16,17,18,16,18,19},1);mesh.SetTriangles(new[]{20,21,22,20,22,23},2);mesh.RecalculateNormals();mesh.RecalculateBounds();
            AssetDatabase.CreateAsset(mesh,path);return mesh;
        }
        private static GameObject Block(string name,Transform parent,Vector3 position,Vector3 scale,Mesh mesh,Material side,Material top,Material bottom)
        {
            var go=new GameObject(name,typeof(MeshFilter),typeof(MeshRenderer));go.transform.SetParent(parent,false);go.transform.localPosition=position;go.transform.localScale=scale;
            go.GetComponent<MeshFilter>().sharedMesh=mesh;go.GetComponent<Renderer>().sharedMaterials=new[]{side,top,bottom};return go;
        }
        private static void BuildScenery(Transform world,Mesh grass,Mesh log,Dictionary<string,Material> mats)
        {
            var scenery=new GameObject("Scenery").transform;scenery.SetParent(world,false);
            for(int side=-1;side<=1;side+=2)
            {
                for(int x=3;x<10;x++) for(int z=RoadStartZ;z<RoadEndZ;z++)
                    Block("Bank block",scenery,new Vector3(side*(x+.5f),-.5f,z+.5f),Vector3.one,grass,mats["GrassSide"],mats["Grass"],mats["Dirt"]);
                for(int index=0;index<6;index++)
                {
                    var tree=new GameObject("Tree " + side + " " + index).transform;tree.SetParent(scenery,false);tree.localPosition=new Vector3(side*6.5f,0,2+index*12);
                    for(int level=0;level<4;level++) Block("Oak trunk",tree,new Vector3(0,level+.5f,0),Vector3.one,log,mats["LogSide"],mats["LogTop"],mats["LogTop"]);
                    for(int layer=0;layer<3;layer++)
                    {
                        int radius=layer==2?1:2;
                        for(int x=-radius;x<=radius;x++) for(int z=-radius;z<=radius;z++)
                            if(Mathf.Abs(x)+Mathf.Abs(z)<=radius+1) Cube("Leaves",tree,new Vector3(x,3.5f+layer,z),Vector3.one,mats["Leaves"]);
                    }
                }
                for(int index=0;index<3;index++)
                {
                    var pillar=new GameObject("Stone pillar " + side + " " + index).transform;pillar.SetParent(scenery,false);pillar.localPosition=new Vector3(side*4.6f,0,8+index*24);
                    var material=mats[index%2==0?"StoneBricks":"MossyStoneBricks"];
                    for(int level=0;level<3;level++) Cube("Pillar block",pillar,new Vector3(0,(level+.5f)*.833333f,0),new Vector3(.8f,.833333f,.8f),material);
                    Cube("Pillar cap",pillar,new Vector3(0,2.6f,0),new Vector3(1,.2f,1),material);
                }
            }
        }
        private static bool SceneManagerDirty() { return EditorSceneManager.GetActiveScene().isDirty; }
        private static void CopyNew(string from,string to) { if (!File.Exists(to)) File.Copy(from,to); }
        private static Material Solid(string name,Color color)
        {
            string path = Root + "/Materials/" + name + ".mat";
            var material = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (material == null) { material = new Material(Shader.Find("Unlit/Color")); AssetDatabase.CreateAsset(material,path); }
            material.shader = Shader.Find("Unlit/Color"); material.color = color; EditorUtility.SetDirty(material); return material;
        }
        private static Material Textured(string name,Texture texture)
        {
            if (texture == null) throw new InvalidOperationException("Missing texture: " + name);
            string path = Root + "/Materials/" + name + ".mat";
            var material = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (material == null) { material = new Material(Shader.Find("Unlit/Texture")); AssetDatabase.CreateAsset(material,path); }
            material.shader = Shader.Find("Unlit/Texture"); material.mainTexture = texture; EditorUtility.SetDirty(material); return material;
        }
        private static void PreservePixelTexture(string path)
        {
            var importer=(TextureImporter)AssetImporter.GetAtPath(path);
            importer.alphaSource=TextureImporterAlphaSource.FromInput;
            importer.textureCompression=TextureImporterCompression.Uncompressed;
            var settings=importer.GetDefaultPlatformTextureSettings();
            settings.format=TextureImporterFormat.RGBA32;settings.textureCompression=TextureImporterCompression.Uncompressed;
            importer.SetPlatformTextureSettings(settings);importer.SaveAndReimport();
        }
        private static void ConfigurePet(string name)
        {
            string path = Root + "/Models/" + name + ".fbx";
            var importer = (ModelImporter)AssetImporter.GetAtPath(path);
            importer.materialImportMode = ModelImporterMaterialImportMode.None; importer.importCameras = false; importer.importLights = false;
            importer.animationType = ModelImporterAnimationType.Generic; importer.importAnimation = true;
            var clips = new List<ModelImporterClipAnimation>();
            foreach (var clip in importer.defaultClipAnimations)
                if (clip.name.EndsWith("|Idle") || clip.name.EndsWith("|Run")) { clip.loopTime = true; clip.events = new AnimationEvent[0]; clips.Add(clip); }
            if (clips.Count != 2) throw new InvalidOperationException("Expected Idle/Run takes in " + path);
            importer.clipAnimations = clips.ToArray(); importer.SaveAndReimport();
            var textureImporter = (TextureImporter)AssetImporter.GetAtPath(Root + "/Textures/" + name + ".png");
            textureImporter.maxTextureSize = 2048; textureImporter.mipmapEnabled = false; textureImporter.filterMode = FilterMode.Point; textureImporter.alphaSource = TextureImporterAlphaSource.FromInput; textureImporter.SaveAndReimport();
            PreservePixelTexture(Root + "/Textures/" + name + ".png");
            string materialSlot = name == "Dog" ? "Dog_tex.001" : name == "Duck" ? "m_f378cc63-01d3-d9c1-e4af-ea87570c1e79" : name == "Rabbit" ? "m_e15724db-19b0-40ff-c98d-aab5e20ab905" : name;
            importer.AddRemap(new AssetImporter.SourceAssetIdentifier(typeof(Material), materialSlot), AssetDatabase.LoadAssetAtPath<Material>(Root + "/Materials/" + name + ".mat"));
            importer.SaveAndReimport();
            string controllerPath = Root + "/Animation/" + name + ".controller";
            var controller = AssetDatabase.LoadAssetAtPath<AnimatorController>(controllerPath);
            if (controller != null) return;
            controller = AnimatorController.CreateAnimatorControllerAtPath(controllerPath); controller.AddParameter("Running",AnimatorControllerParameterType.Bool);
            AnimationClip idle = null, run = null;
            foreach (var asset in AssetDatabase.LoadAllAssetsAtPath(path))
                if (asset is AnimationClip && !asset.name.StartsWith("__preview__"))
                { if (asset.name.EndsWith("|Idle")) idle = (AnimationClip)asset; if (asset.name.EndsWith("|Run")) run = (AnimationClip)asset; }
            if (idle == null || run == null) throw new InvalidOperationException("Missing pet clips after import: " + name);
            var machine = controller.layers[0].stateMachine;
            var idleState = machine.AddState("Idle"); idleState.motion = idle; machine.defaultState = idleState;
            var runState = machine.AddState("Run"); runState.motion = run;
            var start = idleState.AddTransition(runState); start.hasExitTime = false; start.duration = .1f; start.AddCondition(AnimatorConditionMode.If,0,"Running");
            var stop = runState.AddTransition(idleState); stop.hasExitTime = false; stop.duration = .1f; stop.AddCondition(AnimatorConditionMode.IfNot,0,"Running");
        }
        private static void ConfigureHeroAnimator(Animator animator)
        {
            string path = Root + "/Animation/Hero.controller";
            var controller = AssetDatabase.LoadAssetAtPath<AnimatorController>(path);
            if (controller == null)
            {
                AnimationClip pose = null, run = null;
                foreach (var asset in AssetDatabase.LoadAllAssetsAtPath("Assets/GameAsset/Model/Character/Player/Character.fbx"))
                    if (asset is AnimationClip && asset.name == "Pose") pose = (AnimationClip)asset;
                foreach (var asset in AssetDatabase.LoadAllAssetsAtPath("Assets/GameAsset/Model/Character/NPCAnim/run+walk.fbx"))
                    if (asset is AnimationClip && asset.name == "run") run = (AnimationClip)asset;
                if (pose == null || run == null) throw new InvalidOperationException("Hero Pose/run clips are missing.");
                controller = AnimatorController.CreateAnimatorControllerAtPath(path);
                controller.AddParameter("Running",AnimatorControllerParameterType.Bool);
                var machine = controller.layers[0].stateMachine;
                var idleState = machine.AddState("Idle"); idleState.motion = pose; machine.defaultState = idleState;
                var runState = machine.AddState("Run"); runState.motion = run;
                var start = idleState.AddTransition(runState); start.hasExitTime = false; start.duration = .08f;
                start.AddCondition(AnimatorConditionMode.If,0,"Running");
                var stop = runState.AddTransition(idleState); stop.hasExitTime = false; stop.duration = .08f;
                stop.AddCondition(AnimatorConditionMode.IfNot,0,"Running");
            }
            animator.runtimeAnimatorController = controller; animator.applyRootMotion = false;
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        }
        private static void Normalize(GameObject visual,float height,Material material)
        {
            visual.transform.localPosition = Vector3.zero; visual.transform.localRotation = Quaternion.identity; visual.transform.localScale = Vector3.one;
            var renderers = visual.GetComponentsInChildren<Renderer>(true);
            if (renderers.Length == 0) throw new InvalidOperationException("Model has no renderers: " + visual.name);
            Bounds bounds = renderers[0].bounds;
            foreach (var renderer in renderers) { bounds.Encapsulate(renderer.bounds); var slots = new Material[renderer.sharedMaterials.Length]; for (int i=0;i<slots.Length;i++) slots[i]=material; renderer.sharedMaterials=slots; }
            float scale = height / Mathf.Max(.001f,bounds.size.y); visual.transform.localScale = Vector3.one * scale;
            Vector3 offset = bounds.center - visual.transform.parent.position; offset.y = bounds.min.y - visual.transform.parent.position.y;
            visual.transform.localPosition = -offset * scale;
        }
        private static GameObject Cube(string name,Transform parent,Vector3 position,Vector3 scale,Material material)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube); go.name = name; go.transform.SetParent(parent,false); go.transform.localPosition=position; go.transform.localScale=scale;
            UnityEngine.Object.DestroyImmediate(go.GetComponent<Collider>()); go.GetComponent<Renderer>().sharedMaterial=material; return go;
        }
        private static RectTransform Panel(string name,Transform parent,Color color,Vector2 min,Vector2 max)
        {
            var go = new GameObject(name,typeof(RectTransform),typeof(Image)); var rect=(RectTransform)go.transform; rect.SetParent(parent,false); rect.anchorMin=min; rect.anchorMax=max; rect.offsetMin=rect.offsetMax=Vector2.zero;
            var image=go.GetComponent<Image>(); image.color=color; image.raycastTarget=false; return rect;
        }
        private static TextMeshProUGUI Label(string name,Transform parent,string value,int size,Vector2 min,Vector2 max)
        {
            var go=new GameObject(name,typeof(RectTransform),typeof(TextMeshProUGUI)); var rect=(RectTransform)go.transform; rect.SetParent(parent,false); rect.anchorMin=min; rect.anchorMax=max; rect.offsetMin=rect.offsetMax=Vector2.zero;
            var text=go.GetComponent<TextMeshProUGUI>(); text.font=AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/Game/Fonts/FFFFORWA SDF.asset"); if(text.font==null) throw new InvalidOperationException("FFFFORWA SDF font is missing.");
            var outline=AssetDatabase.LoadAssetAtPath<Material>("Assets/Game/Fonts/FFFFORWA Atlas Material Outline.mat"); if(outline==null) throw new InvalidOperationException("FFFFORWA outline material is missing.");
            text.fontSharedMaterial=outline; text.fontSize=size; text.enableAutoSizing=true; text.fontSizeMin=24; text.fontSizeMax=size; text.text=value; text.color=Color.white; text.alignment=TextAlignmentOptions.Center; text.raycastTarget=false; return text;
        }
        private static void Set(UnityEngine.Object target,string name,UnityEngine.Object value) { var so=new SerializedObject(target); so.FindProperty(name).objectReferenceValue=value; so.ApplyModifiedPropertiesWithoutUndo(); }
        private static void SetVector(UnityEngine.Object target,string name,Vector3 value) { var so=new SerializedObject(target); so.FindProperty(name).vector3Value=value; so.ApplyModifiedPropertiesWithoutUndo(); }
        private static void SetArray(UnityEngine.Object target,string name,UnityEngine.Object[] values)
        { var so=new SerializedObject(target); var p=so.FindProperty(name); p.arraySize=values.Length; for(int i=0;i<values.Length;i++) p.GetArrayElementAtIndex(i).objectReferenceValue=values[i]; so.ApplyModifiedPropertiesWithoutUndo(); }
    }
}
