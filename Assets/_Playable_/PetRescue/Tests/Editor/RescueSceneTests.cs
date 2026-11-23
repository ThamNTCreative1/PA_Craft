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
        private T One<T>() where T : Component { var all = All<T>(); Assert.AreEqual(1, all.Length, typeof(T).Name); return all[0]; }
        private static T Ref<T>(Object owner, string field) where T : Object { return (T)new SerializedObject(owner).FindProperty(field).objectReferenceValue; }

        private RescueGameFlow StartedFlow()
        {
            var flow = One<RescueGameFlow>(); flow.Initialize();
            flow.Step(.016f, true, Vector2.zero);
            Assert.AreEqual(RescueRules.Phase.Running, flow.Rules.State);
            return flow;
        }

        // ---------- scene content ----------

        [Test] public void SceneHasTheApprovedOpenFieldActors()
        {
            var names = new HashSet<string>(); foreach (var pet in All<RescuePetFollower>()) names.Add(pet.name);
            CollectionAssert.AreEquivalent(new[] { "Dog", "Duck", "Rabbit", "Pig", "Sheep", "Fox" }, names);
            Assert.AreEqual(8, All<RescueTntHazard>().Length);
            One<RescueGameFlow>(); One<RescueArena>(); One<RescueHeartFeedback>(); One<Camera>(); One<EventSystem>(); One<StandaloneInputModule>();
            Assert.AreEqual(0, All<Playable.GameManager>().Length);
            foreach (var t in All<Transform>())
                Assert.IsFalse(t.name.StartsWith("Tile ") || t.name.StartsWith("Bank") || t.name.StartsWith("Gate") || t.name.StartsWith("Pit"), "Runner geometry left: " + t.name);
            foreach (var root in _scene.GetRootGameObjects())
                foreach (var t in root.GetComponentsInChildren<Transform>(true))
                    Assert.AreEqual(0, GameObjectUtility.GetMonoBehavioursWithMissingScriptCount(t.gameObject), t.name);
            int trees = 0; foreach (var t in All<Transform>()) if (t.name.StartsWith("Tree ")) trees++;
            Assert.AreEqual(12, trees);
        }

        [Test] public void FlowReferencesAndSettingsMatchTheApprovedScenario()
        {
            var flow = One<RescueGameFlow>(); var so = new SerializedObject(flow);
            foreach (string name in new[] { "_pointer", "_hero", "_heroVisual", "_arena", "_camera", "_hud", "_audio", "_endcard", "_tutorial", "_feedback", "_controls" })
                Assert.IsNotNull(so.FindProperty(name).objectReferenceValue, name);
            foreach (string name in new[] { "_pets", "_hazards" })
            {
                var p = so.FindProperty(name); Assert.Greater(p.arraySize, 0, name);
                for (int i = 0; i < p.arraySize; i++) Assert.IsNotNull(p.GetArrayElementAtIndex(i).objectReferenceValue, name);
            }
            Assert.AreEqual(15, so.FindProperty("_duration").floatValue);
            Assert.AreEqual(5, so.FindProperty("_required").intValue);
            Assert.AreEqual(30, so.FindProperty("_endGameTime").floatValue, "Global End Time → store is kept");
            Assert.AreEqual(1.6f, so.FindProperty("_attractRadius").floatValue, .001f);
            Assert.AreEqual(1, All<Button>().Length, "Only the endcard install button (no HUD download / jump)");
        }

        [Test] public void RenderersUseApprovedUnlitShaders()
        {
            var shaders = new HashSet<string> { "Unlit/Color", "Unlit/Texture", "Unlit/Transparent Cutout", "Particles/Standard Unlit", "Voxel Play/Models/Texture/Opaque", "Voxel Play/Models/Texture/Cutout Double Sided", "Custom/CubeSurfaceShader" };
            foreach (var r in All<Renderer>()) foreach (var m in r.sharedMaterials)
                { Assert.IsNotNull(m, r.name); Assert.IsTrue(shaders.Contains(m.shader.name), r.name + ": " + m.shader.name); }
            foreach (var r in All<Collider>()) Assert.Fail("No physics colliders: " + r.name);
        }

        [Test] public void PetsAndTntStartInsideTheArenaAwayFromHeroAndWalls()
        {
            var arena = One<RescueArena>(); var hero = One<RescueHeroMotor>().transform.position;
            foreach (var pet in All<RescuePetFollower>())
            {
                var p = pet.transform.position; float d = Vector2.Distance(new Vector2(p.x, p.z), new Vector2(hero.x, hero.z));
                Assert.IsTrue(arena.IsFree(p.x, p.z, .3f), pet.name);
                Assert.That(d, Is.InRange(3f, 13f), pet.name + " distance from hero");
            }
            foreach (var tnt in All<RescueTntHazard>())
            {
                var p = tnt.transform.position; Assert.IsTrue(arena.IsFree(p.x, p.z, .6f), tnt.name);
                Assert.Greater(Vector2.Distance(new Vector2(p.x, p.z), new Vector2(hero.x, hero.z)), RescueGameFlowDefaults.WarningDistance, tnt.name + " must not warn at spawn");
                foreach (var pet in All<RescuePetFollower>()) Assert.Greater(Vector3.Distance(pet.transform.position, p), 1.8f, tnt.name + "/" + pet.name);
            }
        }

        // ---------- actors ----------

        [Test] public void HeroMovesAlongTheStickTurnsAndStopsAtTheBorder()
        {
            var hero = One<RescueHeroMotor>(); var arena = One<RescueArena>();
            hero.Initialize(Ref<Transform>(One<RescueGameFlow>(), "_heroVisual"));
            hero.transform.position = Vector3.zero;
            for (int i = 0; i < 50; i++) hero.Move(.02f, Vector2.right, arena);
            Assert.Greater(hero.transform.position.x, 3.5f); Assert.AreEqual(0, hero.transform.position.z, .001f);
            Assert.Greater(Vector3.Dot(hero.transform.forward, Vector3.right), .9f, "Faces the move direction");
            Assert.IsTrue(hero.Moving);
            hero.Move(.02f, Vector2.zero, arena); Assert.IsFalse(hero.Moving, "Dead zone → idle");
            hero.Move(.02f, Vector2.right * .05f, arena); Assert.IsFalse(hero.Moving);
            for (int i = 0; i < 400; i++) hero.Move(.02f, Vector2.right, arena);
            Assert.LessOrEqual(hero.transform.position.x, arena.Max.x - hero.Radius + .001f, "Border holds");
        }

        [Test] public void KnockbackPushesAwayAndStunIgnoresInput()
        {
            var hero = One<RescueHeroMotor>(); var arena = One<RescueArena>();
            hero.Initialize(Ref<Transform>(One<RescueGameFlow>(), "_heroVisual"));
            hero.transform.position = Vector3.zero;
            hero.Knockback(new Vector3(0, 0, 1));
            Assert.IsTrue(hero.Stunned);
            float t = 0;
            while (hero.Stunned && t < 2) { hero.Move(.02f, Vector2.up, arena); t += .02f; }
            Assert.AreEqual(hero.StunTime, t, .03f, "Stun lasts 0.8 s");
            Assert.AreEqual(-hero.KnockbackDistance, hero.transform.position.z, .05f, "Pushed away from the blast, input ignored");
            hero.Move(.02f, Vector2.up, arena); Assert.IsTrue(hero.Moving, "Control returns after the stun");
        }

        [Test] public void WanderingPetStaysNearHomeAndInsideTheArena()
        {
            var pets = All<RescuePetFollower>(); var hero = One<RescueHeroMotor>().transform; var arena = One<RescueArena>();
            for (int i = 0; i < pets.Length; i++) pets[i].Initialize(i, hero, pets, arena, 100 + i);
            var start = pets[0].transform.position; bool moved = false;
            for (int step = 0; step < 1000; step++)
                foreach (var pet in pets)
                {
                    pet.Tick(.02f);
                    var p = pet.transform.position;
                    Assert.IsTrue(arena.Contains(p.x, p.z, .2f), pet.name);
                    Assert.LessOrEqual(Vector3.Distance(p, pet.Home), pet.RoamRange + .8f, pet.name);
                }
            moved = Vector3.Distance(start, pets[0].transform.position) > .05f;
            Assert.IsTrue(moved, "Pets roam");
        }

        [Test] public void CollectedPetsTrailBehindTheHero()
        {
            var pets = All<RescuePetFollower>(); var heroMotor = One<RescueHeroMotor>(); var hero = heroMotor.transform; var arena = One<RescueArena>();
            for (int i = 0; i < pets.Length; i++) pets[i].Initialize(i, hero, pets, arena, i);
            hero.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
            pets[0].Collect(0); pets[1].Collect(1);
            for (int i = 0; i < 200; i++) { pets[0].Tick(.02f); pets[1].Tick(.02f); }
            foreach (var pet in new[] { pets[0], pets[1] })
            {
                Assert.Less(pet.transform.position.z, -.5f, pet.name + " behind the hero");
                Assert.Less(Vector3.Distance(pet.transform.position, hero.position), 2.5f, pet.name);
            }
            Assert.Greater(Vector3.Distance(pets[0].transform.position, pets[1].transform.position), .4f, "Followers do not stack");
        }

        // ---------- flow ----------

        [Test] public void TimerWaitsForFirstTouchAndPetsRoamMeanwhile()
        {
            var flow = One<RescueGameFlow>(); flow.Initialize();
            var pets = All<RescuePetFollower>(); var start = new Vector3[pets.Length];
            for (int i = 0; i < pets.Length; i++) start[i] = pets[i].transform.position;
            for (int i = 0; i < 300; i++) flow.Step(.02f, false, Vector2.zero);
            Assert.AreEqual(RescueRules.Phase.Waiting, flow.Rules.State); Assert.AreEqual(15, flow.Rules.Remaining);
            Assert.IsTrue(flow.Tutorial.DragVisible && flow.Tutorial.TitleVisible, "SWIPE TO MOVE hint waits");
            bool anyMoved = false; for (int i = 0; i < pets.Length; i++) anyMoved |= Vector3.Distance(start[i], pets[i].transform.position) > .1f;
            Assert.IsTrue(anyMoved, "Pets roam before the first touch");
        }

        [Test] public void PetIsCollectedOnlyInsideTheAttractRadius()
        {
            var flow = StartedFlow(); var hero = One<RescueHeroMotor>().transform;
            var pets = PetsOf(flow);
            var target = pets[0];
            hero.position = target.transform.position + new Vector3(1.9f, 0, 0);
            flow.Step(.001f, false, Vector2.zero);
            Assert.IsFalse(target.Collected); Assert.AreEqual(0, flow.Rules.Rescued);
            hero.position = target.transform.position + new Vector3(1.2f, 0, 0);
            flow.Step(.001f, false, Vector2.zero);
            Assert.IsTrue(target.Collected); Assert.AreEqual(1, flow.Rules.Rescued);
            flow.Step(.001f, false, Vector2.zero); Assert.AreEqual(1, flow.Rules.Rescued, "Each pet gives one heart");
            Assert.IsTrue(One<RescueHudView>().IsFilled(0)); Assert.IsFalse(One<RescueHudView>().IsFilled(1));
        }

        [Test] public void FiveHeartsWinFillTheBarAndShowTheWinEndcard()
        {
            var flow = StartedFlow(); var hero = One<RescueHeroMotor>().transform; var pets = PetsOf(flow);
            var endcard = One<RescueEndcardView>();
            for (int i = 0; i < 5; i++)
            {
                hero.position = pets[i].transform.position;
                flow.Step(.001f, false, Vector2.zero);
            }
            Assert.AreEqual(RescueRules.Phase.Won, flow.Rules.State);
            Assert.IsTrue(endcard.gameObject.activeSelf); Assert.AreEqual(RescueEndcardView.WinTitle, Ref<TMP_Text>(endcard, "_title").text);
            var hud = One<RescueHudView>(); for (int i = 0; i < 5; i++) Assert.IsTrue(hud.IsFilled(i), "slot " + i);
            Assert.IsFalse(flow.Tutorial.DragVisible || flow.Tutorial.PetPointerVisible || flow.Tutorial.TntWarningVisible);
        }

        [Test] public void TimeUpShowsTheTimeUpEndcardWithoutWinning()
        {
            var flow = StartedFlow(); var endcard = One<RescueEndcardView>();
            for (int i = 0; i < 16; i++) flow.Step(1, false, Vector2.zero);
            Assert.AreEqual(RescueRules.Phase.Lost, flow.Rules.State);
            Assert.IsTrue(endcard.gameObject.activeSelf); Assert.AreEqual(RescueEndcardView.TimeUpTitle, Ref<TMP_Text>(endcard, "_title").text);
            Assert.AreEqual(RescueEndcardView.TimeUpMessage, Ref<TMP_Text>(endcard, "_message").text);
        }

        [Test] public void TntHitExplodesKnocksBackAndKeepsHearts()
        {
            var flow = StartedFlow(); var heroMotor = One<RescueHeroMotor>(); var hero = heroMotor.transform; var pets = PetsOf(flow);
            hero.position = pets[0].transform.position; flow.Step(.001f, false, Vector2.zero);
            Assert.AreEqual(1, flow.Rules.Rescued);
            var tnt = All<RescueTntHazard>()[0]; var p = tnt.transform.position;
            hero.position = p + Vector3.back * 1.2f;
            for (int i = 0; i < 20 && tnt.Armed; i++) flow.Step(.02f, false, Vector2.up);
            Assert.IsFalse(tnt.Armed, "Walking into TNT detonates it");
            Assert.IsTrue(heroMotor.Stunned);
            Assert.AreEqual(1, flow.Rules.Rescued, "No heart lost");
            Assert.IsTrue(flow.Tutorial.TntWarningVisible, "First TNT contact shows the warning");
            for (int i = 0; i < 20; i++) flow.Step(.02f, false, Vector2.up);
            Assert.Less(hero.position.z, p.z - 1.2f, "Pushed back away from the blast");
        }

        [Test] public void EndcardOpensStoreOnlyFromTaps()
        {
            var view = One<RescueEndcardView>(); var button = Ref<Button>(view, "_installButton");
            int gestures = 0; view.Initialize(() => gestures++); view.Initialize(() => gestures++);
            Assert.IsFalse(view.gameObject.activeSelf); button.onClick.Invoke(); Assert.AreEqual(0, gestures, "Hidden card is inert");
            view.Show(false); Assert.AreEqual(0, gestures, "Time up never auto-opens the store");
            var click = new PointerEventData(One<EventSystem>()) { button = PointerEventData.InputButton.Left };
            view.OnPointerClick(click); Assert.AreEqual(1, gestures);
            button.onClick.Invoke(); button.onClick.Invoke(); Assert.AreEqual(3, gestures, "Every tap can retry the store");
            click.button = PointerEventData.InputButton.Right; view.OnPointerClick(click); Assert.AreEqual(3, gestures);
            view.Show(true); Assert.AreEqual(RescueEndcardView.TimeUpTitle, Ref<TMP_Text>(view, "_title").text, "First outcome wins");
        }

        [Test] public void InstallButtonStaysGreenWithInstallNowLabel()
        {
            foreach (var image in All<Image>())
            {
                if (image.name != "Install button") continue;
                Assert.Greater(image.color.g, image.color.r + .15f); Assert.Greater(image.color.g, image.color.b + .15f);
                Assert.AreEqual("INSTALL NOW", image.GetComponentInChildren<TMP_Text>(true).text);
            }
        }

        // ---------- UI ----------

        [Test] public void HudHasCenteredTimerAndFiveHeartSlots()
        {
            var hud = One<RescueHudView>(); Assert.AreEqual(5, hud.SlotCount);
            var font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/Game/Fonts/FFFFORWA SDF.asset");
            foreach (var text in All<TMP_Text>()) Assert.AreEqual(font, text.font, text.name);
            Assert.AreEqual(0, All<Text>().Length, "All labels use TMP");
            foreach (var text in All<TMP_Text>()) Assert.IsFalse(System.Text.RegularExpressions.Regex.IsMatch(text.text, @"^\d+/\d+$"), "No x/5 counter text: " + text.name);
            Assert.AreEqual(5, hud.SlotRect(0).parent.childCount, "Heart bar holds only the 5 slots");
            var timer = Ref<TMP_Text>(hud, "_timer");
            hud.Refresh(0, 15); Assert.AreEqual("15", timer.text);
            hud.Refresh(3, 4.2f); Assert.AreEqual("5", timer.text);
            Assert.AreNotEqual(Color.white, timer.color, "Last 5 s turn the timer red");
            Assert.AreEqual(.5f, timer.rectTransform.anchorMin.x, .001f); Assert.AreEqual(.5f, timer.rectTransform.anchorMax.x, .001f);
            hud.FillSlot(0); hud.FillSlot(0); Assert.IsTrue(hud.IsFilled(0)); Assert.IsFalse(hud.IsFilled(1));
            var heart = AssetDatabase.LoadAssetAtPath<Sprite>("Assets/_Playable_/PetRescue/Textures/UI/heart_pixel.png");
            for (int i = 0; i < 5; i++) Assert.AreEqual(heart, hud.SlotRect(i).GetComponent<Image>().sprite);
        }

        [Test] public void TutorialUsesDragRingHandAndShortTexts()
        {
            var view = One<RescueTutorialView>();
            var title = Ref<TMP_Text>(view, "_title");
            Assert.AreEqual("SWIPE TO MOVE", title.text);
            var hand = Ref<RectTransform>(view, "_hand").GetComponent<Image>();
            Assert.AreEqual("Assets/Game/Textures/UI/Common/icon_hand.png", AssetDatabase.GetAssetPath(hand.sprite)); Assert.IsFalse(hand.raycastTarget);
            Assert.AreEqual("Assets/_Playable_/2D Texture/UI/Joystick/AllAxis_Outline_Arrows.png", AssetDatabase.GetAssetPath(Ref<RectTransform>(view, "_ring").GetComponent<Image>().sprite));
            var knob = Ref<RectTransform>(view, "_knob");
            Assert.AreEqual("Assets/_Playable_/2D Texture/UI/Joystick/AllAxis_Plain_Arrows.png", AssetDatabase.GetAssetPath(knob.GetComponent<Image>().sprite));
            Assert.Less(knob.rect.width, Ref<RectTransform>(view, "_ring").rect.width, "Knob sits inside the base");
            Assert.Less(knob.GetSiblingIndex(), hand.transform.GetSiblingIndex(), "Hand draws over the knob");
            view.SetHint(true, true); Assert.IsTrue(title.gameObject.activeSelf); Assert.AreEqual(RescueTutorialView.DragText, title.text); Assert.AreEqual(Vector3.one, title.rectTransform.localScale, "No tweens in EditMode");
            view.SetHint(true, false); Assert.IsFalse(title.gameObject.activeSelf, "Idle re-prompt shows the hand only");
            Assert.IsTrue(Ref<RectTransform>(view, "_group").gameObject.activeSelf);
            view.Hide(); Assert.IsFalse(Ref<RectTransform>(view, "_group").gameObject.activeSelf);
            foreach (var t in All<TMP_Text>()) if (t.gameObject.activeInHierarchy) Assert.IsFalse(t.text.Contains("LOOK") || t.text.Contains("GATE"), t.name);
        }

        [Test] public void ControlsUseApprovedSpritesInTheirCorners()
        {
            var view = One<RescueControlsView>(); view.ApplyScreenLayout(1080, 1920, new Rect(0, 0, 1080, 1920), 1);
            var stick = Ref<RectTransform>(view, "_stickBase"); var jump = Ref<RectTransform>(view, "_jumpButton");
            Assert.AreEqual("Assets/_Playable_/2D Texture/UI/Joystick/AllAxis_Outline_Arrows.png", AssetDatabase.GetAssetPath(stick.GetComponent<Image>().sprite));
            Assert.AreEqual("Assets/_Playable_/2D Texture/UI/Joystick/AllAxis_Plain_Arrows.png", AssetDatabase.GetAssetPath(Ref<RectTransform>(view, "_stickKnob").GetComponent<Image>().sprite));
            Assert.AreEqual("Assets/Game/Textures/UI/Ingame/btn_jump.png", AssetDatabase.GetAssetPath(jump.GetComponent<Image>().sprite));
            Assert.AreEqual(Vector2.zero, stick.anchorMin, "Joystick bottom-left"); Assert.AreEqual(Vector2.right, jump.anchorMin, "Jump bottom-right");
            Assert.IsNull(Ref<RectTransform>(view, "_root").Find("Camera hint"), "Camera-swipe hint removed");
            foreach (var image in Ref<RectTransform>(view, "_root").GetComponentsInChildren<Image>(true)) Assert.IsFalse(image.raycastTarget, image.name);
            Assert.AreEqual(1, All<Button>().Length, "Jump is handled by the input router, not a UI Button");
            Assert.Less(Ref<RectTransform>(view, "_root").GetSiblingIndex(), One<RescueEndcardView>().transform.GetSiblingIndex());
            Assert.Less(Ref<RectTransform>(view, "_root").GetSiblingIndex(), Ref<RectTransform>(One<RescueTutorialView>(), "_group").GetSiblingIndex(), "Tutorial hand draws over the controls");
            Assert.AreEqual(stick, Ref<RectTransform>(One<RescueTutorialView>(), "_stickTarget"));
        }

        [Test] public void TapToJumpHintShowsHandOnTheButtonAndLabelAbove()
        {
            var flow = StartedFlow(); var view = One<RescueTutorialView>();
            var hint = Ref<RectTransform>(view, "_jumpHint"); var label = Ref<TMP_Text>(view, "_jumpLabel"); var hand = Ref<RectTransform>(view, "_jumpHand");
            Assert.IsFalse(hint.gameObject.activeSelf, "Hidden during the joystick step");
            for (int i = 0; i < 25; i++) flow.Step(.02f, false, Vector2.up);
            Assert.IsTrue(hint.gameObject.activeSelf); Assert.AreEqual("TAP TO JUMP", label.text);
            Assert.AreEqual("Assets/Game/Textures/UI/Common/icon_hand.png", AssetDatabase.GetAssetPath(hand.GetComponent<Image>().sprite));
            Assert.AreEqual(Ref<RectTransform>(One<RescueControlsView>(), "_jumpButton"), Ref<RectTransform>(view, "_jumpTarget"));
            foreach (var image in hint.GetComponentsInChildren<Image>(true)) Assert.IsFalse(image.raycastTarget, image.name);
            flow.Step(.02f, false, Vector2.zero, 0, true);
            Assert.IsFalse(hint.gameObject.activeSelf, "Tapping Jump completes the step");
            Assert.AreEqual(RescueTutorialFlow.Step.FindPet, flow.Tutorial.Current);
        }

        [Test] public void SwipeRotatesTheCameraAndTheStickFollowsTheView()
        {
            var flow = StartedFlow(); var follow = One<RescueCameraFollow>(); var hero = One<RescueHeroMotor>().transform;
            hero.position = new Vector3(0, 0, -10);
            flow.Step(.02f, false, Vector2.zero, .45f);
            Assert.AreEqual(.45f * 200, follow.Yaw, .01f);
            var world = RescueGameFlow.ToWorld(Vector2.up, 90); Assert.AreEqual(1, world.x, .001f); Assert.AreEqual(0, world.y, .001f);
            follow.Tick(0); Assert.AreEqual(follow.Yaw, follow.transform.eulerAngles.y, .01f, "Camera looks along its yaw");
            var before = hero.position; follow.AddYaw(90 - follow.Yaw);
            for (int i = 0; i < 10; i++) flow.Step(.02f, false, Vector2.up);
            Assert.Greater(hero.position.x - before.x, .5f, "Stick up walks where the camera looks");
        }

        [Test] public void JumpClearsTntAndCollectedPetsHop()
        {
            var flow = StartedFlow(); var heroMotor = One<RescueHeroMotor>(); var hero = heroMotor.transform; var pets = PetsOf(flow);
            hero.position = pets[0].transform.position; flow.Step(.001f, false, Vector2.zero);
            var tnt = All<RescueTntHazard>()[0]; var p = tnt.transform.position;
            hero.position = p + Vector3.back * 1.3f; pets[0].transform.position = hero.position + Vector3.back;
            flow.Step(.02f, false, Vector2.zero, 0, true);
            Assert.IsTrue(heroMotor.Airborne);
            float petPeak = 0, heroPeak = 0;
            for (int i = 0; i < 40; i++) { flow.Step(.02f, false, Vector2.up); petPeak = Mathf.Max(petPeak, pets[0].transform.position.y); heroPeak = Mathf.Max(heroPeak, hero.position.y); }
            Assert.IsTrue(tnt.Armed, "Jumped over the TNT"); Assert.IsFalse(heroMotor.Stunned);
            Assert.Greater(hero.position.z, p.z + .65f, "Landed past it"); Assert.AreEqual(0, hero.position.y, .001f);
            Assert.Greater(heroPeak, 1); Assert.Greater(petPeak, .5f, "Collected pet hops with the hero");
            flow.Step(.02f, false, Vector2.zero, 0, true); Assert.IsTrue(heroMotor.Airborne, "Can jump again after landing");
        }

        [Test] public void PetPointerStaysOnAfterACollectUntilNoPetIsLeft()
        {
            var flow = StartedFlow(); var hero = One<RescueHeroMotor>().transform; var pets = PetsOf(flow);
            for (int i = 0; i < 25; i++) flow.Step(.02f, false, Vector2.up);
            Assert.AreEqual(RescueTutorialFlow.Step.Jump, flow.Tutorial.Current);
            flow.Step(.02f, false, Vector2.zero, 0, true);                       // TAP TO JUMP
            for (int i = 0; i < 40; i++) flow.Step(.02f, false, Vector2.zero);    // land
            hero.position = pets[0].transform.position; flow.Step(.001f, false, Vector2.zero);
            Assert.AreEqual(1, flow.Rules.Rescued);
            var pointer = Ref<RectTransform>(One<RescueTutorialView>(), "_petPointer");
            Assert.IsTrue(pointer.gameObject.activeSelf, "Arrow guides to the remaining pets after a collect");
        }

        [Test] public void PointerClampsToTheSafeEdgeTowardOffscreenTargets()
        {
            var rect = RescueTutorialView.Inset(new Rect(-500, -1000, 1000, 2000), .1f);
            Assert.AreEqual(new Rect(-400, -800, 800, 1600), rect);
            var right = RescueTutorialView.ClampToRectEdge(rect, new Vector2(10, 0)); Assert.AreEqual(new Vector2(400, 0), right);
            var top = RescueTutorialView.ClampToRectEdge(rect, new Vector2(1, 10)); Assert.AreEqual(800, top.y, .001f); Assert.Less(Mathf.Abs(top.x), 400);
        }

        [TestCase(1080, 1920, 0)] [TestCase(1080, 2340, 0)] [TestCase(1920, 1080, 0)] [TestCase(2340, 1080, 0)] [TestCase(1024, 768, 0)]
        [TestCase(2532, 1170, 141)] [TestCase(2340, 1080, 120)] [TestCase(2400, 1080, 0)]   // notch reported / landscape fallback margin
        public void HudToastAndTutorialStayOnScreenWithoutOverlap(int width, int height, int notch)
        {
            var hud = One<RescueHudView>(); var canvasComponent = Ref<Canvas>(hud, "_canvas");
            float aspect = (float)width / height; float match = aspect <= .7f ? 0 : aspect >= 1.3f ? 1 : .5f;
            float scale = Mathf.Pow(2, Mathf.Lerp(Mathf.Log(width / 1080f, 2), Mathf.Log(height / 1920f, 2), match));
            var canvas = new Rect(0, 0, width / scale, height / scale);
            canvasComponent.scaleFactor = scale;
            hud.ApplyScreenLayout(width, height, new Rect(0, 0, width, height));
            // Same order as RescueGameFlow.Update: controls first, then the text block that sits on the joystick.
            var safeArea = new Rect(notch, 0, width - notch, height);
            var controls = One<RescueControlsView>(); controls.ApplyScreenLayout(width, height, safeArea, scale);
            var view = One<RescueTutorialView>(); view.ApplyScreenLayout(width, height, controls.LeftInset, controls.RightInset);
            // Everything must stay clear of the notch on either side (the phone can be rotated both ways).
            // When the runtime reports no safe area, landscape still keeps the fallback margin (a typical notch is ~7%).
            float side = width > height ? Mathf.Max(notch, width * RescueControlsView.LandscapeMinInset) : notch;
            var safe = new Rect(side / scale, 0, canvas.width - 2 * side / scale, canvas.height);
            var root = (RectTransform)Ref<RectTransform>(hud, "_topUiRoot");
            var rootRect = Resolve(root, canvas);
            // The top root scales around its top-center pivot in landscape; map child boxes through that scale.
            float ui = RescueControlsView.UiScale(width, height);
            Vector2 topPivot = new Vector2(rootRect.center.x, rootRect.yMax);
            System.Func<Rect, Rect> top = r => new Rect(topPivot + (r.min - topPivot) * ui, r.size * ui);
            Assert.AreEqual(ui, root.localScale.x, .001f, "Top cluster scale");
            var timer = top(Resolve(Ref<TMP_Text>(hud, "_timer").rectTransform, rootRect));
            var bar = top(Resolve((RectTransform)hud.SlotRect(0).parent, rootRect));
            var toast = top(Resolve(Ref<TMP_Text>(One<RescueHeartFeedback>(), "_toast").rectTransform, rootRect));
            var group = Ref<RectTransform>(view, "_group");
            var tutorial = Scaled(Resolve(group, canvas), group.localScale.x, group.pivot);
            var stick = Resolve(Ref<RectTransform>(controls, "_stickBase"), canvas);
            var jump = Resolve(Ref<RectTransform>(controls, "_jumpButton"), canvas);
            var jumpLabelRect = Ref<TMP_Text>(view, "_jumpLabel").rectTransform;
            var jumpLabel = Scaled(Resolve(jumpLabelRect, canvas), jumpLabelRect.localScale.x, jumpLabelRect.pivot);
            Assert.AreEqual(ui, group.localScale.x, .001f); Assert.AreEqual(ui, jumpLabelRect.localScale.x, .001f);
            var boxes = new[] { timer, bar, toast, tutorial, stick, jump, jumpLabel };
            var names = new[] { "timer", "heart bar", "toast", "tutorial", "joystick", "jump", "TAP TO JUMP" };
            Assert.AreEqual(jump.yMax + RescueTutorialView.TextGap, jumpLabel.yMin, 1, "TAP TO JUMP sits right above the Jump button");
            Assert.AreEqual(stick.yMax + RescueTutorialView.TextGap, tutorial.yMin, 1, "SWIPE TO MOVE sits right above the joystick");
            Assert.LessOrEqual(Mathf.Abs(tutorial.center.x - stick.center.x), RescueTutorialView.TextWidth * ui * .5f, "Text is over the joystick");
            if (width > height) Assert.AreEqual(320 * RescueControlsView.LandscapeUiScale, stick.width, .01f, "Landscape controls are larger");
            for (int i = 0; i < boxes.Length; i++)
            {
                Assert.IsTrue(Inside(canvas, boxes[i]), names[i] + " off screen at " + width + "x" + height + " " + boxes[i]);
                Assert.IsTrue(Inside(safe, boxes[i]), names[i] + " under the notch at " + width + "x" + height + " notch " + notch + " " + boxes[i]);
                for (int j = i + 1; j < boxes.Length; j++) Assert.IsFalse(boxes[i].Overlaps(boxes[j]), names[i] + " overlaps " + names[j] + " at " + width + "x" + height);
            }
            foreach (RectTransform slot in hud.SlotRect(0).parent)
                Assert.IsTrue(Inside(bar, Resolve(slot, bar)), slot.name + " inside the heart bar");
        }

        [Test] public void LunaUnusedCodeStrippingKeepsAllPetRescueAndDOTweenMethods()
        {
            // Luna's unused-method list (luna.json) strips methods a profiling session never hit. Stripped gameplay
            // methods crash only on the paths that session missed (time up, TNT knockback, jump...), so none may be excluded.
            string json = System.IO.File.ReadAllText("luna.json");
            var blocks = System.Text.RegularExpressions.Regex.Split(json, @"""className""\s*:\s*""");
            var stripped = new List<string>();
            foreach (var block in blocks)
            {
                int end = block.IndexOf('"'); if (end <= 0) continue;
                string cls = block.Substring(0, end);
                if (!cls.StartsWith("Playable.PetRescue.") && !cls.StartsWith("DG.Tweening") && cls != "UnityEngine.Rect") continue;
                foreach (System.Text.RegularExpressions.Match m in System.Text.RegularExpressions.Regex.Matches(block, @"""name""\s*:\s*""([^""]+)""\s*,\s*""excluded""\s*:\s*true"))
                    stripped.Add(cls + "." + m.Groups[1].Value);
            }
            CollectionAssert.IsEmpty(stripped, "Methods stripped from the Luna build: " + string.Join(", ", stripped.ToArray()));
        }

        [Test] public void GeneratedUiSpritesAreTinyUncompressedSprites()
        {
            foreach (var path in new[] { "heart_pixel", "pointer_arrow" })
            {
                string full = "Assets/_Playable_/PetRescue/Textures/UI/" + path + ".png";
                var importer = (TextureImporter)AssetImporter.GetAtPath(full);
                Assert.AreEqual(TextureImporterType.Sprite, importer.textureType, path); Assert.IsFalse(importer.mipmapEnabled, path);
                Assert.Less(new System.IO.FileInfo(full).Length, 8 * 1024, path);
            }
            Assert.AreEqual(FilterMode.Point, ((TextureImporter)AssetImporter.GetAtPath("Assets/_Playable_/PetRescue/Textures/UI/heart_pixel.png")).filterMode);
        }

        // ---------- kept from the runner ----------

        [Test] public void SourceTntVfxIsPreloadedAndPlaysOnce()
        {
            foreach (var hazard in All<RescueTntHazard>())
            {
                var so = new SerializedObject(hazard); var burst = (GameObject)so.FindProperty("_burst").objectReferenceValue;
                Assert.IsFalse(burst.activeSelf); Assert.AreEqual(4, so.FindProperty("_particles").arraySize);
                foreach (var ps in burst.GetComponentsInChildren<ParticleSystem>(true)) { Assert.IsFalse(ps.main.loop); Assert.IsFalse(ps.main.playOnAwake); }
            }
            var first = All<RescueTntHazard>()[0]; var effect = Ref<GameObject>(first, "_burst"); var p = first.transform.position;
            Assert.IsTrue(first.TryHit(p + Vector3.back * 10, p + Vector3.forward * 10));
            Assert.IsFalse(first.TryHit(p + new Vector3(2, 0, -10), p + new Vector3(2, 0, 10)));
            Assert.IsTrue(first.ContainsBlast(p + Vector3.right * 1.6f)); Assert.IsFalse(first.ContainsBlast(p + Vector3.right * 1.61f));
            first.Explode(); Assert.IsTrue(effect.activeSelf); Assert.IsFalse(first.TryHit(p, p));
            foreach (var ps in effect.GetComponentsInChildren<ParticleSystem>(true)) ps.Simulate(5, false, false, true);
            first.TickEffect(5); Assert.IsFalse(effect.activeSelf, "VFX deactivates after its final particle");
        }

        [Test] public void AudioHasAllCuesAndWaitsForInteraction()
        {
            var so = new SerializedObject(One<RescueAudioView>());
            foreach (var field in new[] { "_music", "_effects", "_steps", "_voices", "_start", "_explosion", "_rescue", "_win", "_lose", "_warning", "_land" })
                Assert.IsNotNull(so.FindProperty(field).objectReferenceValue, field);
            foreach (var source in All<AudioSource>()) { Assert.IsFalse(source.playOnAwake); Assert.IsFalse(source.isPlaying); }
            Assert.AreEqual(1, All<AudioListener>().Length);
        }

        [Test] public void CameraHasOrientationProfilesAndStartsBehindTheHero()
        {
            var follow = One<RescueCameraFollow>(); var so = new SerializedObject(follow);
            Assert.IsNotNull(so.FindProperty("_camera").objectReferenceValue);
            Assert.Greater(so.FindProperty("_portraitOffset").vector3Value.y, so.FindProperty("_landscapeOffset").vector3Value.y, "Portrait frames higher");
            follow.Initialize(One<RescueHeroMotor>().transform);
            Assert.AreEqual(0, follow.transform.eulerAngles.y, .01f);
            Assert.IsTrue(RescueCameraFollow.IsLandscape(1920, 1080)); Assert.IsFalse(RescueCameraFollow.IsLandscape(1080, 1920));
        }

        [Test] public void HeroAnimatorHasRunWithRootMotionDisabled()
        {
            var hero = One<RescueHeroMotor>(); var animator = Ref<Animator>(hero, "_animator");
            Assert.IsTrue(animator.avatar.isHuman); hero.Initialize(animator.transform); Assert.IsFalse(animator.applyRootMotion);
            bool run = false; foreach (var clip in animator.runtimeAnimatorController.animationClips) if (clip.name == "run") run = clip.isLooping;
            Assert.IsTrue(run);
        }

        // ---------- helpers ----------

        private static RescuePetFollower[] PetsOf(RescueGameFlow flow)
        {
            var p = new SerializedObject(flow).FindProperty("_pets"); var pets = new RescuePetFollower[p.arraySize];
            for (int i = 0; i < pets.Length; i++) pets[i] = (RescuePetFollower)p.GetArrayElementAtIndex(i).objectReferenceValue;
            return pets;
        }

        /// Resolves a RectTransform's rect in its parent's space (parent rect given), from anchors/pivot/offsets.
        private static Rect Resolve(RectTransform rect, Rect parent)
        {
            Vector2 aMin = parent.min + Vector2.Scale(rect.anchorMin, parent.size), aMax = parent.min + Vector2.Scale(rect.anchorMax, parent.size);
            Vector2 size = aMax - aMin + rect.sizeDelta;
            Vector2 pivotPoint = new Vector2(Mathf.Lerp(aMin.x, aMax.x, rect.pivot.x), Mathf.Lerp(aMin.y, aMax.y, rect.pivot.y)) + rect.anchoredPosition;
            return new Rect(pivotPoint - Vector2.Scale(size, rect.pivot), size);
        }

        /// Scale a rect around its pivot (as RectTransform.localScale does).
        private static Rect Scaled(Rect r, float s, Vector2 pivot)
        { Vector2 p = r.min + Vector2.Scale(r.size, pivot), size = r.size * s; return new Rect(p - Vector2.Scale(size, pivot), size); }
        private static bool Inside(Rect outer, Rect inner)
        { return inner.xMin >= outer.xMin - .5f && inner.yMin >= outer.yMin - .5f && inner.xMax <= outer.xMax + .5f && inner.yMax <= outer.yMax + .5f; }
    }

    internal static class RescueGameFlowDefaults { public const float WarningDistance = 3; }
}
