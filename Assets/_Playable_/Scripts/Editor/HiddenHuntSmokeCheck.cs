using System;
using System.Reflection;
using System.Text;
using UnityEditor;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable.Editor
{
    // Runs only inside the Editor; exercises the authored scene through its UI input handlers.
    public static class HiddenHuntSmokeCheck
    {
        public static string Result = "Not run";
        private static HiddenHuntGame _game;
        private static GameManager _manager;
        private static HuntPlayer _player;
        private static Button _fire, _block;
        private static Joystick _joystick;
        private static double _due;
        private static int _step, _threshold, _nextTarget;
        private static bool _timerOnly;
        private static float _remaining;
        private static readonly StringBuilder Report = new StringBuilder();
        private static PointerEventData _joystickEvent;

        public static void Begin(int threshold, bool timerOnly = false)
        {
            if (!Application.isPlaying) throw new InvalidOperationException("Enter play mode first.");
            EditorApplication.update -= Tick;
            Time.timeScale = 1; EditorApplication.isPaused = false;
            _game = GameObject.Find("HiddenHunt").GetComponent<HiddenHuntGame>();
            _manager = GameObject.Find("GameManager").GetComponent<GameManager>();
            _player = GameObject.Find("FPS Player").GetComponent<HuntPlayer>();
            _fire = GameObject.Find("Fire").GetComponent<Button>();
            _joystick = GameObject.Find("Move Joystick").GetComponent<Joystick>();
            _block = (Button)new SerializedObject(_manager).FindProperty("_btnBlock").objectReferenceValue;
            _threshold = threshold; _timerOnly = timerOnly; _step = 0; _nextTarget = 1;
            Report.Length = 0; Result = "Running";
            var so = new SerializedObject(_manager); so.FindProperty("_totalEvent").intValue = threshold;
            if (timerOnly) so.FindProperty("_endTime").intValue = 1;
            so.ApplyModifiedPropertiesWithoutUndo();
            if (timerOnly) _manager.CountdownEndGame();
            _remaining = _manager.RemainingTime;
            _due = EditorApplication.timeSinceStartup + 0.12;
            EditorApplication.update += Tick;
        }
        private static void Check(bool condition, string message)
        {
            if (!condition) throw new Exception(message);
            Report.AppendLine("PASS " + message);
        }
        private static void Wait(float seconds) { _due = EditorApplication.timeSinceStartup + seconds; }
        private static void Tick()
        {
            if (!Application.isPlaying) { Finish("ABORTED"); return; }
            if (EditorApplication.timeSinceStartup < _due) return;
            try
            {
                if (_timerOnly) { TimerTick(); return; }
                switch (_step)
                {
                    case 0:
                        Check(_game.Stage == HiddenHuntGame.HuntStage.Shoot && _game.Kills == 0, "Initial shoot tutorial and zero kills");
                        Check(_manager.RemainingTime < _remaining, "Countdown runs from game start");
                        Check(!_player.CanLook && !_player.CanMove, "Opening shot stays aligned");
                        RaycastHit firstHit;
                        Check(Physics.Raycast(_player.ViewCamera.ViewportPointToRay(new Vector3(.5f,.5f)), out firstHit, 70, ~(1 << 2 | 1 << 30)) && firstHit.collider.name == "Hidden 01", "Opening crosshair hits hidden 01");
                        _fire.onClick.Invoke();
                        Check(_game.Kills == 1 && _game.Stage == HiddenHuntGame.HuntStage.Turning, "Fire button kills and starts guided turn");
                        Check(!GameObject.Find("Hidden 01").GetComponent<HiddenHuntTarget>().Hit(), "Dead target cannot count twice");
                        Check(GameObject.Find("Hidden 01").GetComponentInChildren<ParticleSystem>().isPlaying, "Square firework burst starts");
                        Check(GameObject.Find("Count").GetComponent<TMPro.TMP_Text>().text == "1/5", "Counter increments with fixed /5 denominator");
                        ScreenCapture.CaptureScreenshot("Temp/MapReview/hunt-first-kill.png");
                        _step++; Wait(1.05f); break;
                    case 1:
                        Check(_game.Stage == HiddenHuntGame.HuntStage.Look && _player.CanLook && _player.CanMove, "Guided turn enables free look and movement");
                        Check(Vector3.Angle(_player.ViewCamera.transform.forward, GameObject.Find("Hidden 02").GetComponent<HiddenHuntTarget>().AimPoint - _player.ViewCamera.transform.position) < .5f, "Guided turn faces hidden 02");
                        ScreenCapture.CaptureScreenshot("Temp/MapReview/hunt-look-tutorial.png");
                        var look = GameObject.Find("Full Screen Look");
                        var pointer = new PointerEventData(EventSystem.current) { pointerId = 8, position = new Vector2(Screen.width * .45f, Screen.height * .5f) };
                        ExecuteEvents.Execute(look, pointer, ExecuteEvents.pointerDownHandler);
                        pointer.position += new Vector2(Screen.height * .13f, 0);
                        ExecuteEvents.Execute(look, pointer, ExecuteEvents.dragHandler);
                        ExecuteEvents.Execute(look, pointer, ExecuteEvents.pointerUpHandler);
                        Check(_game.Stage == HiddenHuntGame.HuntStage.Move, "Camera swipe advances to movement tutorial");
                        _step++; Wait(.15f); break;
                    case 2:
                        ScreenCapture.CaptureScreenshot("Temp/MapReview/hunt-move-tutorial.png");
                        _joystickEvent = new PointerEventData(EventSystem.current) { pointerId = 9, position = RectTransformUtility.WorldToScreenPoint(null, _joystick.transform.position) };
                        ExecuteEvents.Execute(_joystick.gameObject, _joystickEvent, ExecuteEvents.pointerDownHandler);
                        _joystickEvent.position += new Vector2(0, 70);
                        ExecuteEvents.Execute(_joystick.gameObject, _joystickEvent, ExecuteEvents.dragHandler);
                        _step++; Wait(.25f); break;
                    case 3:
                        ExecuteEvents.Execute(_joystick.gameObject, _joystickEvent, ExecuteEvents.pointerUpHandler);
                        Check(_game.Stage == HiddenHuntGame.HuntStage.Free, "Joystick movement completes tutorial");
                        Check(_player.CanStand(_player.transform.position), "Player stays on dry land");
                        _player.AimAt(new Vector3(-8,9.2f,8), 0);
                        int before = _game.Kills; _fire.onClick.Invoke();
                        Check(_game.Kills == before, "Shooting a house does not kill a hidden through it");
                        _step++; Wait(.3f); break;
                    case 4:
                        if (_nextTarget == 3)
                        {
                            // The small fourth hidden is behind the chair from the starting area.
                            // Approach along the dry path before testing the shot, just as a player must.
                            var approach = new Vector3(-3, 7.02f, 1);
                            Check(_player.CanStand(approach), "Fourth target approach is on dry land");
                            _player.GetComponent<CharacterController>().Move(approach - _player.transform.position);
                            Physics.SyncTransforms();
                        }
                        var target = GameObject.Find("Hidden 0" + (_nextTarget + 1)).GetComponent<HiddenHuntTarget>();
                        _player.AimAt(target.AimPoint, 0);
                        _fire.onClick.Invoke();
                        Check(_game.Kills == _nextTarget + 1, "Aimed shot hits target " + (_nextTarget + 1));
                        _nextTarget++;
                        if (_nextTarget >= _threshold) { _step++; Wait(.15f); }
                        else { Check(!_manager.HasEnded, "No end before configured threshold"); Wait(.3f); }
                        break;
                    case 5:
                        Check(_manager.HasEnded && _game.Stage == HiddenHuntGame.HuntStage.Ended, "Endgame occurs at _totalEvent=" + _threshold);
                        Check(_block.gameObject.activeInHierarchy && !_player.CanMove && !_player.CanLook && !_fire.interactable, "Full-screen block and input lock active");
                        Check(!CtaShown(), "CTA waits for delay");
                        _remaining = _manager.RemainingTime;
                        _fire.onClick.Invoke(); Check(_game.Kills == _threshold, "Post-end fire ignored");
                        _step++; Wait(1.15f); break;
                    case 6:
                        Check(CtaShown(), "CTA invoked after one-second delay");
                        Check(Mathf.Approximately(_remaining, _manager.RemainingTime), "Countdown stops at endgame");
                        CheckBlockRaycast();
                        Finish("PASS"); break;
                }
            }
            catch (Exception e) { Finish("FAIL " + e.Message); }
        }
        private static void TimerTick()
        {
            if (_step == 0) { Check(!_manager.HasEnded, "Timer run starts active"); _step++; Wait(1.1f); return; }
            if (_step == 1)
            {
                Check(_manager.HasEnded && _manager.RemainingTime == 0, "Timeout ends gameplay at zero");
                Check(_game.Kills == 0 && _block.gameObject.activeInHierarchy, "Timeout activates block without kills");
                Check(!_player.CanLook && !_player.CanMove, "Timeout stops controls");
                _step++; Wait(1.1f); return;
            }
            Check(CtaShown(), "Timeout also invokes delayed CTA"); CheckBlockRaycast(); Finish("PASS");
        }
        private static bool CtaShown() => (bool)typeof(GameManager).GetField("_ctaShown", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(_manager);
        private static void CheckBlockRaycast()
        {
            var results = new System.Collections.Generic.List<RaycastResult>();
            EventSystem.current.RaycastAll(new PointerEventData(EventSystem.current) { position = new Vector2(Screen.width * .5f, Screen.height * .5f) }, results);
            Check(results.Count > 0 && results[0].gameObject == _block.gameObject, "Endgame button receives screen-center input before look surface");
        }
        private static void Finish(string status)
        {
            EditorApplication.update -= Tick;
            Result = status + "\n" + Report;
            System.IO.File.WriteAllText("Temp/MapReview/hunt-smoke-" + (_timerOnly ? "timeout" : _threshold.ToString()) + ".txt", Result);
            Debug.Log(Result);
        }
    }
}
