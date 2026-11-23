using System.Collections.Generic;
using NUnit.Framework;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;

namespace Playable.PetRescue.Tests
{
    public class RescueSceneTests
    {
        private Scene _scene;
        [SetUp] public void Open() { _scene = EditorSceneManager.OpenPreviewScene("Assets/_Playable_/Scenes/PetRescue.unity"); }
        [TearDown] public void Close() { EditorSceneManager.ClosePreviewScene(_scene); }
        private T[] All<T>() where T : Component
        {
            var values = new List<T>();
            foreach (var root in _scene.GetRootGameObjects()) values.AddRange(root.GetComponentsInChildren<T>(true));
            return values.ToArray();
        }
        [Test] public void SceneHasExactlyTheApprovedActorsAndNoLegacyManager()
        {
            Assert.AreEqual(6, All<RescuePetFollower>().Length); Assert.AreEqual(9, All<RescueTntHazard>().Length);
            var names = new HashSet<string>(); foreach(var pet in All<RescuePetFollower>()) names.Add(pet.name);
            CollectionAssert.AreEquivalent(new[]{"Dog","Duck","Rabbit","Pig","Sheep","Fox"},names);
            Assert.AreEqual(1, All<RescueGameFlow>().Length); Assert.AreEqual(1, All<Camera>().Length);
            Assert.AreEqual(1, All<EventSystem>().Length); Assert.AreEqual(1, All<StandaloneInputModule>().Length);
            Assert.AreEqual(0, All<Playable.GameManager>().Length);
        }
        [Test] public void FlowReferencesAndActorArraysAreComplete()
        {
            var so = new SerializedObject(All<RescueGameFlow>()[0]);
            foreach (string name in new[] { "_pointer", "_hero", "_heroVisual", "_camera", "_hud", "_audio", "_endcard", "_tutorial", "_gameplayRect" })
                Assert.IsNotNull(so.FindProperty(name).objectReferenceValue,name);
            foreach (string name in new[] { "_pets", "_hazards" })
            {
                var p=so.FindProperty(name);
                for(int i=0;i<p.arraySize;i++) Assert.IsNotNull(p.GetArrayElementAtIndex(i).objectReferenceValue,name);
            }
            float duration=so.FindProperty("_duration").floatValue;
            float speed=new SerializedObject(All<RescueHeroMotor>()[0]).FindProperty("_speed").floatValue;
            Assert.AreEqual(3.5f,speed,"User requested half speed and explicitly retained route/timer");
            Assert.AreEqual(1,All<Button>().Length,"One endcard install CTA");
            Assert.AreEqual(15,duration);
            Assert.AreEqual(30,so.FindProperty("_endGameTime").floatValue,"Global EndGame limit is independent of the gameplay countdown");
        }
        [Test] public void RenderersUseApprovedSourceShadersAndPetAnimationsExist()
        {
            var shaders=new HashSet<string>{"Unlit/Color","Unlit/Texture","Unlit/Transparent Cutout","Particles/Standard Unlit","Voxel Play/Models/Texture/Opaque","Voxel Play/Models/Texture/Cutout Double Sided","Custom/CubeSurfaceShader"};
            foreach(var r in All<Renderer>()) foreach(var m in r.sharedMaterials)
            { Assert.IsNotNull(m,r.name); Assert.IsTrue(shaders.Contains(m.shader.name),r.name + ": " + m.shader.name); }
            foreach(var pet in All<RescuePetFollower>())
            {
                var animator=pet.GetComponentInChildren<Animator>(); Assert.IsNotNull(animator.runtimeAnimatorController);
                Assert.IsFalse(animator.applyRootMotion);
                foreach(var clip in animator.runtimeAnimatorController.animationClips) Assert.AreEqual(0,AnimationUtility.GetAnimationEvents(clip).Length);
            }
        }
        [Test] public void SixSpeciesFormCloseFrontAndRearClustersAndFreezeDuringRecovery()
        {
            var pets=All<RescuePetFollower>(); var hero=All<RescueHeroMotor>()[0].transform; var course=All<RescueCourse>()[0];
            for(int i=0;i<pets.Length;i++) pets[i].Initialize(i,hero,pets);
            var before=pets[0].transform.position;
            for(int step=0;step<100;step++) for(int i=0;i<pets.Length;i++) pets[i].Advance(.02f,false,course);
            Assert.Greater(Vector3.Distance(before,pets[0].transform.position),.03f);
            foreach(var pet in pets)
            {
                Assert.Less(Vector3.Distance(hero.position,pet.transform.position),3.6f);
                Assert.Less(pet.transform.position.z,hero.position.z);
                var p=pet.transform.position; var q=pet.transform.rotation;
                pet.Advance(2,true,course);Assert.AreEqual(p,pet.transform.position);Assert.AreEqual(q,pet.transform.rotation);
                pet.Stop();pet.Advance(2,false,course);Assert.AreEqual(p,pet.transform.position);
            }
            for(int a=0;a<pets.Length;a++)for(int b=a+1;b<pets.Length;b++)Assert.Greater(Vector3.Distance(pets[a].transform.position,pets[b].transform.position),.35f);
        }
        [Test] public void AddedSpeciesKeepTheirSourceMaterialsTexturesAndActiveFloats()
        {
            const string root="Assets/_Playable_/PetRescue/";
            const string source="D:/Source/minecraft/Assets/Game/Models/Animals/";
            int rearCount=0;
            foreach(var pet in All<RescuePetFollower>())
            {
                var expected=AssetDatabase.LoadAssetAtPath<Material>(root+"Materials/"+pet.name+".mat");
                Assert.IsNotNull(expected,pet.name);Assert.IsTrue(expected.shader.isSupported,pet.name);
                foreach(var renderer in pet.GetComponentsInChildren<Renderer>(true))foreach(var material in renderer.sharedMaterials)Assert.AreEqual(expected,material,pet.name+" material slot");
                if(pet.name!="Pig"&&pet.name!="Sheep"&&pet.name!="Fox")continue;
                rearCount++;
                Assert.Less(new SerializedObject(pet).FindProperty("_offset").vector3Value.z,-1.4f,"Rear cluster, pulled in 30% for the closer camera");
                Assert.AreEqual(pet.name,expected.mainTexture.name);
                Assert.AreEqual(pet.name=="Pig"?"Voxel Play/Models/Texture/Cutout Double Sided":"Voxel Play/Models/Texture/Opaque",expected.shader.name);
                CollectionAssert.AreEqual(System.IO.File.ReadAllBytes(source+pet.name+".png"),System.IO.File.ReadAllBytes(root+"Textures/"+pet.name+".png"),pet.name+" original pixels");
                CollectionAssert.AreEqual(System.IO.File.ReadAllBytes(source+pet.name+".fbx"),System.IO.File.ReadAllBytes(root+"Models/"+pet.name+".fbx"),pet.name+" original model");
                var sourceText=System.IO.File.ReadAllText(source+pet.name+".mat");
                for(int index=0;index<ShaderUtil.GetPropertyCount(expected.shader);index++)
                {
                    var type=ShaderUtil.GetPropertyType(expected.shader,index);
                    if(type!=ShaderUtil.ShaderPropertyType.Float&&type!=ShaderUtil.ShaderPropertyType.Range)continue;
                    string name=ShaderUtil.GetPropertyName(expected.shader,index);
                    var match=System.Text.RegularExpressions.Regex.Match(sourceText,@"- "+System.Text.RegularExpressions.Regex.Escape(name)+@": ([^\r\n]+)");
                    if(match.Success)Assert.AreEqual(float.Parse(match.Groups[1].Value,System.Globalization.CultureInfo.InvariantCulture),expected.GetFloat(name),.00001f,pet.name+" "+name);
                }
                Assert.AreEqual(Color.white,expected.GetColor("_Color"));
            }
            Assert.AreEqual(3,rearCount);
            CollectionAssert.AreEqual(System.IO.File.ReadAllBytes("D:/Source/minecraft/Assets/Voxel Play/Resources/VoxelPlay/Shaders/VPModelTextureCutoutDoubleSided.shader"),System.IO.File.ReadAllBytes(root+"Shaders/Source/VoxelPlay/VPModelTextureCutoutDoubleSided.shader"));
        }
        [Test] public void TreesPillarsAndNativeTexturePixelsArePreserved()
        {
            int trees=0,pillars=0;
            foreach(var t in All<Transform>())
            {
                if(t.name.StartsWith("Tree ")) trees++;
                if(t.name.StartsWith("Stone pillar "))
                { pillars++;Assert.Greater(Mathf.Abs(t.position.x),3.5f);Assert.AreEqual(0,t.GetComponentsInChildren<Collider>().Length); }
            }
            Assert.AreEqual(12,trees);Assert.AreEqual(6,pillars);
            const string root="Assets/_Playable_/PetRescue/";
            const string source="D:/Source/minecraft/Assets/ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/";
            foreach(string name in new[]{"grass_block_top","grass_block_side","dirt","stone_bricks","mossy_stone_bricks","oak_log","oak_leaves","tnt_side","tnt_top","tnt_bottom"})
                CollectionAssert.AreEqual(System.IO.File.ReadAllBytes(source+name+".png"),System.IO.File.ReadAllBytes(root+"Textures/Blocks/"+name+".png"),name);
            var tnt=AssetDatabase.LoadAssetAtPath<Material>(root+"Materials/TNT.mat");
            Assert.AreEqual("Custom/CubeSurfaceShader",tnt.shader.name);
            Assert.AreEqual("tnt_top",tnt.GetTexture("_TopTex").name);Assert.AreEqual("tnt_bottom",tnt.GetTexture("_BottomTex").name);
            Assert.AreEqual("tnt_side",tnt.GetTexture("_ForwardTex").name);Assert.AreEqual(0,tnt.GetFloat("_Glow"));
        }
        [Test] public void HudShowsCompactCounterCenteredTimerAndSwipeTutorial()
        {
            var font=AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/Game/Fonts/FFFFORWA SDF.asset");Assert.IsNotNull(font);
            Assert.AreEqual(0,All<Text>().Length,"All PetRescue labels use TMP");
            Assert.AreEqual(9,All<TMP_Text>().Length);
            foreach(var text in All<TMP_Text>())
            { Assert.AreEqual(font,text.font,text.name);Assert.IsFalse(text.text.Contains("TAP"),text.name);
                Assert.AreEqual(Color.black,text.fontSharedMaterial.GetColor("_OutlineColor"),text.name);
                Assert.Greater(text.fontSharedMaterial.GetFloat("_OutlineWidth"),0,text.name); }
            Assert.IsFalse(All<RescueEndcardView>()[0].gameObject.activeSelf,"Endcard starts hidden");
            var tutorial=All<RescueTutorialView>()[0];var so=new SerializedObject(tutorial);
            var cue=(RectTransform)so.FindProperty("_cue").objectReferenceValue;
            var hand=cue.GetComponent<Image>();Assert.IsNotNull(hand);Assert.IsNotNull(hand.sprite);
            Assert.AreEqual("Assets/Game/Textures/UI/Common/icon_hand.png",AssetDatabase.GetAssetPath(hand.sprite));
            Assert.IsFalse(hand.raycastTarget);Assert.IsTrue(hand.preserveAspect);
            tutorial.ShowSwipe();Assert.IsTrue(cue.gameObject.activeInHierarchy);
            Assert.AreEqual("LEAD THE HERD",((TMP_Text)so.FindProperty("_prompt").objectReferenceValue).text);
            var title=(TMP_Text)so.FindProperty("_prompt").objectReferenceValue;
            Assert.Greater(title.rectTransform.anchorMin.y,.75f,"Headline is near the screen top below HUD");
            Assert.AreEqual(Vector3.one,title.rectTransform.localScale,"EditMode previews do not start runtime-only tweens");
            var left=(RectTransform)so.FindProperty("_leftArrow").objectReferenceValue;
            var right=(RectTransform)so.FindProperty("_rightArrow").objectReferenceValue;
            Assert.AreEqual(cue.parent,left.parent);Assert.AreEqual(cue.parent,right.parent);
            Assert.Less(Mathf.Abs(left.anchoredPosition.x),220);Assert.Less(Mathf.Abs(right.anchoredPosition.x),220);
            var leftPosition=left.anchoredPosition;var rightPosition=right.anchoredPosition;
            cue.anchoredPosition+=Vector2.right*20;tutorial.Tick(.1f);
            Assert.AreEqual(leftPosition,left.anchoredPosition);Assert.AreEqual(rightPosition,right.anchoredPosition);
            Assert.AreEqual(Quaternion.identity,left.localRotation);Assert.AreEqual(Quaternion.identity,right.localRotation);
            foreach(var text in All<TMP_Text>())if(text.name=="Goal hint")Assert.GreaterOrEqual(text.fontSize,20);
            var hud=All<RescueHudView>()[0];var hudSo=new SerializedObject(hud);
            var counter=(TMP_Text)hudSo.FindProperty("_counter").objectReferenceValue;
            var timer=(TMP_Text)hudSo.FindProperty("_timer").objectReferenceValue;
            hud.Refresh(0,15);Assert.AreEqual("0/3",counter.text);Assert.AreEqual("15",timer.text);
            hud.Refresh(2,12.4f);Assert.AreEqual("2/3",counter.text);Assert.AreEqual("13",timer.text);
            Assert.AreEqual(.5f,(timer.rectTransform.anchorMin.x+timer.rectTransform.anchorMax.x)*.5f,.001f);
            int timerCount=0;foreach(var text in All<TMP_Text>())if(text.name=="Countdown")timerCount++;
            Assert.AreEqual(1,timerCount);
            tutorial.OnSteered();Assert.IsFalse(cue.gameObject.activeInHierarchy);
            Assert.IsFalse(title.gameObject.activeInHierarchy,"Headline hides with the tutorial");
            Assert.AreEqual(Vector3.one,title.rectTransform.localScale);
        }
        [TestCase(false,"HERD LOST!")]
        [TestCase(true,"HERD SAVED!")]
        public void LossEndcardAutoOpensOnceAndEveryTapCanRequestStore(bool won,string expected)
        {
            var view=All<RescueEndcardView>()[0];var so=new SerializedObject(view);
            var button=(Button)so.FindProperty("_installButton").objectReferenceValue;
            var title=(TMP_Text)so.FindProperty("_title").objectReferenceValue;
            int automatic=0,gestures=0;
            view.Initialize(()=>automatic++,()=>gestures++);view.Initialize(()=>automatic++,()=>gestures++);
            Assert.IsFalse(view.gameObject.activeSelf);button.onClick.Invoke();Assert.AreEqual(0,automatic);Assert.AreEqual(0,gestures);
            view.Show(won);Assert.IsTrue(view.gameObject.activeSelf);Assert.AreEqual(expected,title.text);
            Assert.AreEqual(won?0:1,automatic,"Loss automatically requests store once");
            view.Show(!won);Assert.AreEqual(expected,title.text);Assert.AreEqual(won?0:1,automatic,"Repeated show cannot repeat automatic request");
            var click=new PointerEventData(All<EventSystem>()[0]);click.button=PointerEventData.InputButton.Left;
            view.OnPointerClick(click);view.OnPointerClick(click);Assert.AreEqual(won?0:2,gestures,"Loss backdrop/card taps can retry store");
            click.button=PointerEventData.InputButton.Right;view.OnPointerClick(click);Assert.AreEqual(won?0:2,gestures);
            button.onClick.Invoke();button.onClick.Invoke();Assert.AreEqual(won?1:4,gestures);
            Assert.AreEqual(!won,button.interactable,"Loss CTA remains available for another user tap");
            Assert.IsTrue(view.GetComponent<Image>().raycastTarget);
        }
        [Test] public void SweptHitAndInclusiveBlastBoundaryAreCorrect()
        {
            var tnt=All<RescueTntHazard>()[0]; var p=tnt.transform.position;
            Assert.IsTrue(tnt.TryHit(p+Vector3.back*10,p+Vector3.forward*10));
            Assert.IsFalse(tnt.TryHit(p+new Vector3(2,0,-10),p+new Vector3(2,0,10)));
            Assert.IsTrue(tnt.ContainsBlast(p+Vector3.right*1.6f));
            Assert.IsFalse(tnt.ContainsBlast(p+Vector3.right*1.61f));
            tnt.Explode(); Assert.IsFalse(tnt.TryHit(p,p));
        }
        [Test] public void JungleTextureBindingsAndGroundContinueBeyondTheGate()
        {
            const string root="Assets/_Playable_/PetRescue/";
            const string source="D:/Source/minecraft/Assets/ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/";
            foreach(string name in new[]{"jungle_door_top","jungle_grass_block_side"})
                CollectionAssert.AreEqual(System.IO.File.ReadAllBytes(source+name+".png"),System.IO.File.ReadAllBytes(root+"Textures/Blocks/"+name+".png"),name);
            Assert.AreEqual("jungle_door_top",AssetDatabase.LoadAssetAtPath<Material>(root+"Materials/Stone.mat").mainTexture.name);
            Assert.AreEqual("jungle_grass_block_side",AssetDatabase.LoadAssetAtPath<Material>(root+"Materials/GrassSide.mat").mainTexture.name);
            var tiles=new HashSet<string>();foreach(var t in All<Transform>())if(t.name.StartsWith("Tile "))tiles.Add(t.name);
            foreach(int z in new[]{65,80,100,129})for(int x=-3;x<3;x++)Assert.IsTrue(tiles.Contains("Tile "+x+" "+z),"Missing ground through/beyond gate at "+x+","+z);
        }
        [Test] public void HalfSpeedHeroKeepsGroundHeightAndSteeringAfterExplosion()
        {
            var hero=All<RescueHeroMotor>()[0];var flow=new SerializedObject(All<RescueGameFlow>()[0]);
            hero.Initialize((Transform)flow.FindProperty("_heroVisual").objectReferenceValue);
            var course=All<RescueCourse>()[0];
            var start=hero.transform.position;var hazard=All<RescueTntHazard>()[0];hazard.Explode();
            hero.Advance(1,.01f,course);
            Assert.AreEqual(start.z+3.5f,hero.transform.position.z,.001f);Assert.AreEqual(start.y,hero.transform.position.y);
            Assert.Greater(hero.transform.position.x,start.x);
            var position=hero.transform.position;hero.Stop();hero.Advance(3,1,course);Assert.AreEqual(position,hero.transform.position);
        }
        [Test] public void TntExplosionOpensSteppedCraterOnceAndOverlapsNeverRaise()
        {
            var course=All<RescueCourse>()[0];
            var stone=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable_/PetRescue/Materials/Pit.mat");
            foreach(var hazard in All<RescueTntHazard>())
            {
                var crater=(RescueCrater)new SerializedObject(hazard).FindProperty("_crater").objectReferenceValue;
                Assert.IsNotNull(crater,hazard.name);Assert.That(crater.TileCount,Is.InRange(6,24),hazard.name);
                Vector3 c=hazard.transform.position;Assert.AreEqual(0,course.HeightAt(c.x,c.z));
                hazard.Explode();Assert.IsTrue(hazard.CraterPending);hazard.TickEffect(.016f);Assert.IsTrue(crater.IsOpen,"Ground collapses right after the blast");
                Assert.AreEqual(-1.5f,course.HeightAt(c.x,c.z),.001f,"Stone floor under the TNT");
                var tile=course.Tile(course.TileIndex(c.x,c.z));foreach(var m in tile.Find("Grass").GetComponent<Renderer>().sharedMaterials)Assert.AreEqual(stone,m);
                var depths=new HashSet<float>();var d=new SerializedObject(crater).FindProperty("_depths");
                for(int i=0;i<d.arraySize;i++)depths.Add(d.GetArrayElementAtIndex(i).floatValue);
                Assert.IsTrue(depths.Contains(1.5f)&&depths.Contains(.5f),hazard.name+" has floor and upper terrace");
                crater.Open();hazard.Explode();hazard.TickEffect(1);Assert.AreEqual(-1.5f,course.HeightAt(c.x,c.z),.001f,"Second open is ignored");
            }
        }
        [Test] public void OverlappingCraterOnlyDeepens()
        {
            var course=All<RescueCourse>()[0];var hazard=All<RescueTntHazard>()[0];Vector3 c=hazard.transform.position;
            var tile=course.Tile(course.TileIndex(c.x,c.z));tile.position=new Vector3(tile.position.x,-3,tile.position.z);
            hazard.Explode();hazard.TickEffect(1);Assert.AreEqual(-3,tile.position.y,.001f,"A deeper tile is never raised");
        }
        [Test] public void HeroSinksStandsStillAndOnlySwipeUpJumpsBackToTheRoad()
        {
            var hero=All<RescueHeroMotor>()[0];var course=All<RescueCourse>()[0];var flow=new SerializedObject(All<RescueGameFlow>()[0]);
            hero.Initialize((Transform)flow.FindProperty("_heroVisual").objectReferenceValue);
            Assert.IsFalse(hero.TryJump(course),"No jump on the road");
            foreach(var h in All<RescueTntHazard>())
            {
                Vector3 c=h.transform.position;h.Explode();h.TickEffect(1);
                hero.transform.position=new Vector3(c.x,0,c.z-.5f);
                for(int i=0;i<40;i++)hero.Advance(.02f,0,course);
                Assert.IsTrue(hero.InPit,h.name);Assert.Less(hero.transform.position.y,-.25f);
                var stuck=hero.transform.position;
                for(int i=0;i<100;i++)hero.Advance(.02f,.05f,course);
                Assert.AreEqual(stuck,hero.transform.position,"Stuck hero stands still: no forward, no steering");
                Assert.IsTrue(hero.TryJump(course));Assert.IsFalse(hero.TryJump(course),"No double jump");
                bool landed=false;
                for(int i=0;i<200&&!landed;i++){hero.Advance(.02f,0,course);landed=hero.Landed;}
                Assert.IsTrue(landed,h.name);Assert.AreEqual(0,hero.transform.position.y,.001f,h.name+" lands on the road beyond the rim");
                Assert.IsFalse(hero.InPit);Assert.Greater(hero.transform.position.z,stuck.z);
            }
        }
        [Test] public void JumpEscapesTheCraterAtLowFrameRates([Values(.05f,.1f,.333f)] float dt)
        {
            var hero=All<RescueHeroMotor>()[0];var course=All<RescueCourse>()[0];var flow=new SerializedObject(All<RescueGameFlow>()[0]);
            hero.Initialize((Transform)flow.FindProperty("_heroVisual").objectReferenceValue);
            foreach(var h in All<RescueTntHazard>())
            {
                Vector3 c=h.transform.position;h.Explode();h.TickEffect(1);hero.transform.position=new Vector3(c.x,0,c.z-.5f);
                for(int i=0;i<40;i++)hero.Advance(.02f,0,course);
                Assert.IsTrue(hero.InPit,h.name);Assert.IsTrue(hero.TryJump(course));
                bool landed=false;for(int i=0;i<60&&!landed;i++){hero.Advance(dt,0,course);landed=hero.Landed;}
                Assert.IsTrue(landed);Assert.AreEqual(0,hero.transform.position.y,.001f,h.name+" escapes at dt "+dt);
            }
        }
        [Test] public void JumpHintKeepsHeadlineAndShowsSmallTextBelowHandWithUpArrow()
        {
            var tutorial=All<RescueTutorialView>()[0];var so=new SerializedObject(tutorial);
            var prompt=(TMP_Text)so.FindProperty("_prompt").objectReferenceValue;
            var cue=(RectTransform)so.FindProperty("_cue").objectReferenceValue;
            var left=(RectTransform)so.FindProperty("_leftArrow").objectReferenceValue;
            var right=(RectTransform)so.FindProperty("_rightArrow").objectReferenceValue;
            var hint=((GameObject)so.FindProperty("_goalHint").objectReferenceValue).GetComponent<TMP_Text>();
            string goal=hint.text;
            tutorial.ShowSwipe();var swipeArrow=right.anchoredPosition;tutorial.OnSteered();
            Assert.IsFalse(prompt.gameObject.activeSelf);
            tutorial.ShowJump();tutorial.Tick(.1f);
            Assert.IsFalse(prompt.gameObject.activeSelf,"Headline is not reused for the jump hint");Assert.AreEqual("LEAD THE HERD",prompt.text);
            Assert.IsTrue(hint.gameObject.activeInHierarchy);Assert.AreEqual("SWIPE UP TO JUMP!",hint.text);
            Assert.Less(hint.rectTransform.anchorMax.y,((RectTransform)cue).anchorMin.y+.001f,"Hint text sits below the hand");
            Assert.IsFalse(left.gameObject.activeSelf);Assert.IsTrue(right.gameObject.activeInHierarchy);
            Assert.AreEqual(90,right.localEulerAngles.z,.01f,"Arrow points up");
            Assert.Greater(right.anchoredPosition.y,cue.anchoredPosition.y+cue.rect.height*.5f,"Arrow above the hand");
            tutorial.HideJump();
            Assert.AreEqual(goal,hint.text);Assert.AreEqual(Quaternion.identity,right.localRotation);Assert.AreEqual(swipeArrow,right.anchoredPosition);
            Assert.IsFalse(cue.gameObject.activeInHierarchy);
        }
        [Test] public void HeroDropsAtTheBlastAndRunsAlongThePitFloorUntilTheWall()
        {
            var hero=All<RescueHeroMotor>()[0];var course=All<RescueCourse>()[0];var flow=new SerializedObject(All<RescueGameFlow>()[0]);
            hero.Initialize((Transform)flow.FindProperty("_heroVisual").objectReferenceValue);
            RescueTntHazard h=null;foreach(var x in All<RescueTntHazard>())if(x.transform.position.z==26)h=x;
            Vector3 c=h.transform.position;hero.transform.position=new Vector3(c.x,0,c.z-.65f);
            h.Explode();h.TickEffect(.016f);
            for(int i=0;i<10;i++)hero.Advance(.02f,0,course);
            Assert.Less(hero.transform.position.y,-.1f,"Drops right away");
            float z=hero.transform.position.z;bool ranInPit=false;
            for(int i=0;i<10;i++){hero.Advance(.02f,0,course);if(hero.InPit&&hero.RunningOnGround&&hero.transform.position.z>z+.01f)ranInPit=true;z=hero.transform.position.z;}
            Assert.IsTrue(ranInPit,"Keeps running along the pit floor");
            for(int i=0;i<100;i++)hero.Advance(.02f,.05f,course);
            var stuck=hero.transform.position;
            Assert.IsTrue(hero.InPit);Assert.IsFalse(hero.RunningOnGround,"Stopped by the crater wall, footsteps off");
            Assert.AreEqual(c.x,stuck.x,.001f,"No steering in the pit");
            hero.Advance(.5f,.05f,course);Assert.AreEqual(stuck,hero.transform.position);
        }
        [Test] public void CraterOpeningUnderTheLastStepBeforeTheRimStillSinksTheHero()
        {
            var hero=All<RescueHeroMotor>()[0];var course=All<RescueCourse>()[0];var flow=new SerializedObject(All<RescueGameFlow>()[0]);
            hero.Initialize((Transform)flow.FindProperty("_heroVisual").objectReferenceValue);
            foreach(var h in All<RescueTntHazard>())
            {
                Vector3 c=h.transform.position;h.Explode();h.TickEffect(1);
                float x=Mathf.Clamp(c.x,-2.5f,2.5f),z=c.z;
                while(course.HeightAt(x,z+.05f)<-.01f)z+=.05f;   // last spot inside the crater before its far rim
                foreach(var t in new[]{z-.1f,z})
                {
                    // Simulate the hero standing on the surface as the ground drops away beneath.
                    var tile=course.Tile(course.TileIndex(x,t));float floor=tile.position.y;
                    hero.transform.position=new Vector3(x,0,t);
                    var motorGrounded=typeof(RescueHeroMotor).GetField("_grounded",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic);
                    motorGrounded.SetValue(hero,true);
                    for(int i=0;i<60;i++)hero.Advance(.02f,0,course);
                    Assert.IsTrue(hero.InPit,h.name+" skipped the crater from z "+t);Assert.AreEqual(floor,hero.transform.position.y,.001f);
                }
            }
        }
        [Test] public void SwipeUpTutorialAppearsOnlyForTheFirstPit()
        {
            var flow=All<RescueGameFlow>()[0];var hero=All<RescueHeroMotor>()[0];var pets=All<RescuePetFollower>();var tutorial=All<RescueTutorialView>()[0];
            var flowSo=new SerializedObject(flow);hero.Initialize((Transform)flowSo.FindProperty("_heroVisual").objectReferenceValue);
            for(int i=0;i<pets.Length;i++)pets[i].Initialize(i,hero.transform,pets);
            var rules=new RescueRules(15,3,pets.Length);rules.Start();
            typeof(RescueGameFlow).GetField("<Rules>k__BackingField",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic).SetValue(flow,rules);
            var advance=typeof(RescueGameFlow).GetMethod("Advance",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic);
            tutorial.ShowSwipe();tutorial.OnSteered();
            int pit=0;
            foreach(var h in All<RescueTntHazard>())
            {
                if(h.transform.position.z!=26&&h.transform.position.z!=47)continue;
                Vector3 c=h.transform.position;h.Explode();h.TickEffect(.016f);
                hero.transform.position=new Vector3(c.x,0,c.z-.3f);
                for(int i=0;i<40;i++)advance.Invoke(flow,new object[]{.02f,0f,false});
                Assert.IsTrue(hero.InPit);
                Assert.AreEqual(pit==0,tutorial.JumpVisible,pit==0?"First pit shows the swipe-up tutorial":"Later pits do not");
                advance.Invoke(flow,new object[]{.02f,0f,true});
                for(int i=0;i<100&&!hero.Landed;i++)advance.Invoke(flow,new object[]{.02f,0f,false});
                Assert.IsFalse(hero.InPit);Assert.IsFalse(tutorial.JumpVisible);
                pit++;
            }
            Assert.AreEqual(2,pit);
        }
        [Test] public void HeroKeepsRunAnimationInThePitWithoutFootsteps()
        {
            var hero=All<RescueHeroMotor>()[0];var course=All<RescueCourse>()[0];
            var animator=(Animator)new SerializedObject(hero).FindProperty("_animator").objectReferenceValue;hero.Initialize(animator.transform);
            RescueTntHazard h=null;foreach(var x in All<RescueTntHazard>())if(x.transform.position.z==26)h=x;
            Vector3 c=h.transform.position;h.Explode();h.TickEffect(.016f);hero.transform.position=new Vector3(c.x,0,c.z-.3f);
            for(int i=0;i<100;i++)hero.Advance(.02f,0,course);
            Assert.IsTrue(hero.InPit);Assert.IsFalse(hero.RunningOnGround,"No footsteps at the crater wall");
            Assert.IsTrue((bool)typeof(RescueHeroMotor).GetField("_running",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic).GetValue(hero),"Run cycle continues in the pit");
        }
        [Test] public void InstallButtonIsGreen()
        {
            foreach(var image in All<Image>())
            {
                if(image.name!="Install button")continue;   // face colour as tuned by the user; border/bevel stay neutral
                Assert.Greater(image.color.g,image.color.r+.15f,image.name);Assert.Greater(image.color.g,image.color.b+.15f,image.name);
            }
        }
        [Test] public void PetsWaitForStuckHeroThenJumpWithHim()
        {
            var hero=All<RescueHeroMotor>()[0];var course=All<RescueCourse>()[0];var pets=All<RescuePetFollower>();
            for(int i=0;i<pets.Length;i++)pets[i].Initialize(i,hero.transform,pets);
            var p=pets[0].transform.position;pets[0].Advance(.5f,true,course);Assert.AreEqual(p,pets[0].transform.position);
            pets[0].Jump(9.5f);pets[0].Advance(.05f,true,course);Assert.Greater(pets[0].transform.position.y,p.y,"Pet jumps with the hero");
            float maxY=0;for(int i=0;i<100;i++){pets[0].Advance(.02f,false,course);maxY=Mathf.Max(maxY,pets[0].transform.position.y);}
            Assert.AreEqual(0,pets[0].transform.position.y,.001f,"Pet lands back on the road");Assert.Greater(maxY,.3f);
        }
        [Test] public void WallsBlockForwardRunAndLeaveAFreeCorridorEverywhere()
        {
            var course=All<RescueCourse>()[0];var walls=All<RescueWallObstacle>();var hazards=All<RescueTntHazard>();
            Assert.GreaterOrEqual(walls.Length,4,"Random walls were placed");
            foreach(var wall in walls)
            {
                var renderers=wall.GetComponentsInChildren<Renderer>();Assert.GreaterOrEqual(renderers.Length,2);
                foreach(var r in renderers){Assert.AreEqual("Cobblestone",r.sharedMaterial.name);Assert.AreEqual("Unlit/Texture",r.sharedMaterial.shader.name);}
                Assert.AreEqual(0,wall.GetComponentsInChildren<Collider>().Length,"No physics colliders");
                Assert.Less(wall.transform.position.z,58,"Gate approach stays clear");
                foreach(var h in hazards)
                {
                    var crater=(RescueCrater)new SerializedObject(h).FindProperty("_crater").objectReferenceValue;
                    var tiles=new SerializedObject(crater).FindProperty("_tiles");
                    for(int i=0;i<tiles.arraySize;i++)
                    {
                        float gap=course.Tile(tiles.GetArrayElementAtIndex(i).intValue).position.z-wall.transform.position.z;
                        Assert.GreaterOrEqual(gap>0?gap:-gap,gap>0?1.24f:2.49f,wall.name+" too close to crater of "+h.name);
                    }
                }
            }
            for(float z=0;z<60;z+=.25f)
            {
                float run=0,best=0;
                // Free road width (road spans x -3..3).
                for(float x=-2.975f;x<3;x+=.05f){ if(course.HitsWall(x,z,.025f))run=0;else{run+=.05f;best=Mathf.Max(best,run);} }
                Assert.GreaterOrEqual(best,1.6f,"Corridor at z="+z);
            }
            var hero=All<RescueHeroMotor>()[0];var flow=new SerializedObject(All<RescueGameFlow>()[0]);
            hero.Initialize((Transform)flow.FindProperty("_heroVisual").objectReferenceValue);
            var w=walls[0];hero.transform.position=new Vector3(Mathf.Clamp(w.transform.position.x,-2.5f,2.5f),0,w.transform.position.z-1.5f);
            for(int i=0;i<100;i++)hero.Advance(.02f,0,course);
            Assert.Less(hero.transform.position.z,w.transform.position.z-.5f,"Blocked by the wall");
            Assert.IsTrue((bool)typeof(RescueHeroMotor).GetField("_running",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic).GetValue(hero),"Run cycle continues against the wall");
            Assert.IsFalse(hero.RunningOnGround,"No footsteps while pressed against the wall");
            var blocked=hero.transform.position.z;
            for(int i=0;i<80;i++)hero.Advance(.02f,w.transform.position.x>0?-.02f:.02f,course);
            Assert.Greater(hero.transform.position.z,blocked+.5f,"Steering away frees the run");
        }
        [Test] public void LandscapeAndPortraitTopLabelsStayOnScreenWithoutOverlap()
        {
            var hud=All<RescueHudView>()[0];var so=new SerializedObject(hud);
            var root=(RectTransform)so.FindProperty("_topUiRoot").objectReferenceValue;
            var canvasComponent=(Canvas)so.FindProperty("_canvas").objectReferenceValue;
            var labels=new List<RectTransform>();foreach(Transform child in root)labels.Add((RectTransform)child);
            Assert.AreEqual(3,labels.Count);
            foreach(var size in new[]{new Vector2(960,540),new Vector2(540,960),new Vector2(2340,1080),new Vector2(1080,2340)})
            {
                // Mirror CanvasScaler (1080x1920, match .5) for this screen size.
                float scale=Mathf.Pow(2,Mathf.Lerp(Mathf.Log(size.x/1080,2),Mathf.Log(size.y/1920,2),.5f));
                Vector2 canvas=size/scale;
                canvasComponent.scaleFactor=scale;
                hud.ApplyScreenLayout((int)size.x,(int)size.y,new Rect(0,0,size.x,size.y));
                float rootMin=root.offsetMin.y,rootMax=canvas.y+root.offsetMax.y,h=rootMax-rootMin;
                var rects=new List<Rect>();
                foreach(var label in labels)
                {
                    float yMin=rootMin+label.anchorMin.y*h+label.offsetMin.y;
                    float yMax=rootMin+label.anchorMax.y*h+label.offsetMax.y;
                    Rect r=new Rect(label.anchorMin.x*canvas.x,yMin,(label.anchorMax.x-label.anchorMin.x)*canvas.x,yMax-yMin);
                    Assert.LessOrEqual(r.yMax,canvas.y+.01f,label.name+" off the top at "+size);
                    Assert.GreaterOrEqual(r.yMin,0,label.name+" at "+size);
                    foreach(var other in rects)Assert.IsFalse(r.Overlaps(other),label.name+" overlaps at "+size);
                    rects.Add(r);
                }
            }
        }
        [Test] public void SourceTntVfxIsPreloadedAndOriginalExplosionSoundIsBound()
        {
            var original=AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/PetRescue/VFX/tnt_explosion.prefab");
            Assert.IsNotNull(original);Assert.AreEqual(4,original.GetComponentsInChildren<ParticleSystem>(true).Length);
            foreach(var hazard in All<RescueTntHazard>())
            {
                var so=new SerializedObject(hazard);var burst=(GameObject)so.FindProperty("_burst").objectReferenceValue;
                Assert.IsFalse(burst.activeSelf);Assert.AreEqual(4,so.FindProperty("_particles").arraySize);
                Assert.AreEqual(0,burst.GetComponentsInChildren<AudioSource>(true).Length,"Explosion sound is dispatched once through existing audio view");
                Assert.AreEqual(0,burst.GetComponentsInChildren<MonoBehaviour>(true).Length,"Source audio/pool scripts excluded");
                foreach(var ps in burst.GetComponentsInChildren<ParticleSystem>(true))
                { Assert.IsFalse(ps.main.loop);Assert.IsFalse(ps.main.playOnAwake);Assert.AreEqual(ParticleSystemStopAction.None,ps.main.stopAction); }
                foreach(var r in burst.GetComponentsInChildren<ParticleSystemRenderer>(true))
                {Assert.AreEqual("Particles/Standard Unlit",r.sharedMaterial.shader.name);Assert.IsNotNull(r.sharedMaterial.mainTexture);Assert.IsTrue(r.sharedMaterial.shader.isSupported);}
            }
            var first=All<RescueTntHazard>()[0];var state=new SerializedObject(first);
            var effect=(GameObject)state.FindProperty("_burst").objectReferenceValue;var systems=effect.GetComponentsInChildren<ParticleSystem>(true);
            first.Explode();foreach(var ps in systems)ps.Simulate(.18f,false,true,true);first.TickEffect(.18f);
            Assert.IsTrue(effect.activeSelf,"VFX stays visible while particles are present");
            foreach(var ps in systems)ps.Simulate(5,false,false,true);first.TickEffect(5);
            Assert.IsFalse(effect.activeSelf,"VFX deactivates after its final particle");
            first.Explode();Assert.IsFalse(effect.activeSelf,"Spent TNT cannot replay its VFX");
            CollectionAssert.AreEqual(System.IO.File.ReadAllBytes("D:/Source/minecraft/Assets/Game/Audios/SoundFX/random/explode1.ogg"),System.IO.File.ReadAllBytes("Assets/_Playable_/PetRescue/Audio/Explosion.ogg"));
            var audio=new SerializedObject(All<RescueAudioView>()[0]);
            Assert.AreEqual("Assets/_Playable_/PetRescue/Audio/Explosion.ogg",AssetDatabase.GetAssetPath(audio.FindProperty("_explosion").objectReferenceValue));
            var music=(AudioSource)audio.FindProperty("_music").objectReferenceValue;Assert.IsTrue(music.loop);Assert.AreEqual(.14f,music.volume,.001f);Assert.AreEqual("Assets/Sound/Go Up Music.mp3",AssetDatabase.GetAssetPath(music.clip));
        }
        [Test] public void AudioHasAllCuesAndWaitsForInteraction()
        {
            var views=All<RescueAudioView>();Assert.AreEqual(1,views.Length);var so=new SerializedObject(views[0]);
            foreach(var field in new[]{"_music","_effects","_steps","_voices","_start","_explosion","_petLost","_rescue","_win","_lose","_warning","_jump","_land"})
                Assert.IsNotNull(so.FindProperty(field).objectReferenceValue,field);
            foreach(var pair in new[]{new[]{"_footsteps","2"},new[]{"_petCalls","6"}})
            {var array=so.FindProperty(pair[0]);Assert.AreEqual(int.Parse(pair[1]),array.arraySize);for(int i=0;i<array.arraySize;i++)Assert.IsNotNull(array.GetArrayElementAtIndex(i).objectReferenceValue);}
            foreach(var source in All<AudioSource>()){Assert.IsFalse(source.playOnAwake);Assert.AreEqual(0,source.spatialBlend);Assert.IsFalse(source.isPlaying);}
            Assert.AreEqual(1,All<AudioListener>().Length);
        }
        [Test] public void CameraUsesApprovedFixedOffsetAndPitch()
        {
            var camera=All<RescueCameraFollow>()[0];var hero=All<RescueHeroMotor>()[0];
            var so=new SerializedObject(camera);Assert.AreEqual(new Vector3(0,2.6f,-4.5f),so.FindProperty("_offset").vector3Value);
            Assert.AreEqual(new Vector3(25,0,0),so.FindProperty("_angles").vector3Value);
            camera.Initialize(hero.transform);var unityCamera=All<Camera>()[0];
            Assert.AreEqual(CameraClearFlags.Skybox,unityCamera.clearFlags,"Use the scene sky material");
            Assert.AreEqual(hero.transform.position.y*.5f+2.6f,camera.transform.position.y,.001f);
            Assert.AreEqual(hero.transform.position.z-4.5f,camera.transform.position.z,.001f);
            Assert.AreEqual(25,camera.transform.eulerAngles.x,.01f);Assert.AreEqual(0,camera.transform.eulerAngles.y,.01f);
        }
        [Test] public void HeroUsesLoopingHumanoidRunWithRootMotionDisabled()
        {
            var hero=All<RescueHeroMotor>()[0];
            var animator=(Animator)new SerializedObject(hero).FindProperty("_animator").objectReferenceValue;
            Assert.IsNotNull(animator);Assert.IsTrue(animator.avatar.isValid);Assert.IsTrue(animator.avatar.isHuman);
            Assert.IsFalse(animator.applyRootMotion);
            hero.Initialize(animator.transform);Assert.AreEqual(1,animator.speed,"Animation stays at original speed while movement is halved");
            bool run=false;
            foreach(var clip in animator.runtimeAnimatorController.animationClips)
                if(clip.name=="run") { run=true;Assert.IsTrue(clip.isLooping);Assert.IsTrue(clip.humanMotion); }
            Assert.IsTrue(run,"Actual run clip must be present");
        }
        [Test] public void PetCanDetonateTntWhileHeroMissesAndLaterCraterSinksHero()
        {
            var flow=All<RescueGameFlow>()[0]; var hero=All<RescueHeroMotor>()[0];var pets=All<RescuePetFollower>();
            var flowSo=new SerializedObject(flow);
            hero.Initialize((Transform)flowSo.FindProperty("_heroVisual").objectReferenceValue);
            hero.transform.position=new Vector3(0,0,18);
            for(int i=0;i<pets.Length;i++)pets[i].Initialize(i,hero.transform,pets);
            RescueTntHazard hazard=null;foreach(var h in All<RescueTntHazard>())if(h.transform.position.z==12)hazard=h;
            Assert.IsNotNull(hazard);
            var rules=new RescueRules(15,3,pets.Length);rules.Start();
            typeof(RescueGameFlow).GetField("<Rules>k__BackingField",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic).SetValue(flow,rules);
            pets[0].transform.position=hazard.transform.position+Vector3.back*.7f;
            var advance=typeof(RescueGameFlow).GetMethod("Advance",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic);
            advance.Invoke(flow,new object[]{.1f,0f,false});
            Assert.IsFalse(hazard.Armed);Assert.IsFalse(pets[0].IsFollowing);
            Assert.AreEqual(RescueRules.PetState.Lost,rules.GetPetState(0));Assert.AreEqual(5,rules.Alive);
            Assert.AreEqual(0,hero.transform.position.y,"Blast does not make hero fall");
            hazard.Explode();Assert.AreEqual(5,rules.Alive,"Spent TNT cannot cause another loss");hazard.TickEffect(1);
            hero.transform.position=hazard.transform.position;
            for(int i=0;i<40;i++)advance.Invoke(flow,new object[]{.02f,0f,false});
            Assert.IsTrue(hero.InPit,"Walking into the opened crater sinks the hero");
        }
    }
}
