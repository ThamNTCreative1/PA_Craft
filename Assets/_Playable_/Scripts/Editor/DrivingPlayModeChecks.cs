using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
using UnityEngine.EventSystems;
using Playable;

// Opt-in integration checks; no test objects or runtime settings are saved to the scene.
[InitializeOnLoad]
public static class DrivingPlayModeChecks
{
    const string Folder = "Temp/DrivingSetup/";
    static readonly List<string> Results = new List<string>();
    static PlayerController player;
    static MotorbikeController bike;
    static CameraController camera;
    static UltimateJoystick joystick;
    static Vector3 start;
    static float stageStart, yaw;
    static int stage;
    static GameObject wall;
    static DrivingPlayModeChecks() { EditorApplication.playModeStateChanged += OnState; }
    [MenuItem("Playable/Checks/Walking and Motorbike")]
    public static void Run()
    {
        Directory.CreateDirectory(Folder);
        SessionState.SetBool("DrivingChecks.Run", true);
        EditorApplication.isPlaying = true;
    }
    static void OnState(PlayModeStateChange state)
    {
        if (state == PlayModeStateChange.EnteredPlayMode && SessionState.GetBool("DrivingChecks.Car", false))
        {
            SessionState.SetBool("DrivingChecks.Car", false);
            EditorApplication.update += CarTick;
        }
        if (state == PlayModeStateChange.ExitingPlayMode) EditorApplication.update -= CarTick;
        if (state == PlayModeStateChange.EnteredPlayMode && SessionState.GetBool("DrivingChecks.Run", false))
        {
            SessionState.SetBool("DrivingChecks.Run", false);
            Results.Clear(); stage = 0; stageStart = Time.time;
            EditorApplication.update += Tick;
        }
        if (state == PlayModeStateChange.ExitingPlayMode) EditorApplication.update -= Tick;
    }
    static void Check(bool pass, string message)
    {
        Results.Add((pass ? "PASS " : "FAIL ") + message);
        File.WriteAllLines(Folder + "checks.txt", Results);
    }
    static void Next() { stage++; stageStart = Time.time; }
    [MenuItem("Playable/Checks/Car Curbs")]
    public static void RunCarCurbs()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Start checks in Edit Mode.");
        Directory.CreateDirectory(Folder);
        SessionState.SetBool("DrivingChecks.Car", true);
        EditorApplication.isPlaying = true;
    }

    static void CarTick()
    {
        if (!EditorApplication.isPlaying || Time.timeSinceLevelLoad < 1f) return;
        EditorApplication.update -= CarTick;
        var previousSimulation = Physics.simulationMode;
        GameObject floor = null, curb = null, ceiling = null;
        try
        {
            Results.Clear();
            var car = UnityEngine.Object.FindFirstObjectByType<CarController>(FindObjectsInactive.Include);
            var rider = UnityEngine.Object.FindFirstObjectByType<PlayerController>(FindObjectsInactive.Include);
            if (car == null || rider == null) throw new Exception("Car/player missing.");
            for (var parent = car.transform; parent != null; parent = parent.parent) parent.gameObject.SetActive(true);
            for (var parent = rider.transform; parent != null; parent = parent.parent) parent.gameObject.SetActive(true);
            rider.IsWorking = true;
            Check(car.TryMount(rider, true), "Car mounts for curb checks");
            var body = car.GetComponent<Rigidbody>();
            var flags = System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic;
            var type = typeof(CarController);
            var fixedUpdate = type.GetMethod("FixedUpdate", flags);
            var lateUpdate = type.GetMethod("LateUpdate", flags);
            floor = GameObject.CreatePrimitive(PrimitiveType.Cube);
            floor.name = "Temporary car check road";
            floor.transform.position = new Vector3(1000, 99.5f, 0);
            floor.transform.localScale = new Vector3(100, 1, 100);
            curb = GameObject.CreatePrimitive(PrimitiveType.Cube);
            curb.name = "Temporary car check curb";
            ceiling = GameObject.CreatePrimitive(PrimitiveType.Cube);
            ceiling.name = "Temporary car check ceiling";
            Physics.simulationMode = SimulationMode.Script;
            for (int scenario = 0; scenario < 13; scenario++)
            {
                bool reverse = scenario == 3, fast = scenario == 4 || scenario == 9, diagonal = scenario == 5;
                bool tall = scenario == 6, overhead = scenario == 7, brake = scenario == 8;
                bool release = scenario == 10;
                bool singleSide = scenario == 11, landing = scenario == 12;
                float height = scenario == 0 ? 0.04f : scenario == 1 ? 0.2f : tall ? 0.8f : 0.54f;
                curb.transform.position = new Vector3(singleSide ? 1000.75f : 1000, 100 + height * 0.5f, landing ? 30 : 4);
                curb.transform.localScale = new Vector3(singleSide ? 1.1f : 40, height, 8);
                ceiling.transform.position = new Vector3(1000, overhead ? 101.65f : 120, 0);
                ceiling.transform.localScale = new Vector3(40, 0.2f, 10);
                body.position = new Vector3(1000, 100.02f, -6);
                body.rotation = Quaternion.Euler(0, reverse ? 180 : diagonal ? 20 : 0, 0);
                body.linearVelocity = Vector3.zero;
                body.angularVelocity = Vector3.zero;
                type.GetField("_maxForwardSpeed", flags).SetValue(car, fast ? 13f : 2f);
                type.GetField("_maxReverseSpeed", flags).SetValue(car, 2f);
                type.GetField("_input", flags).SetValue(car, new Vector2(0, reverse ? -1 : 1));
                type.GetField("_handbrake", flags).SetValue(car, false);
                Physics.SyncTransforms();
                type.GetField("_input", flags).SetValue(car, Vector2.zero);
                for (int settle = 0; settle < 100; settle++)
                {
                    fixedUpdate.Invoke(car, null);
                    Physics.Simulate(Time.fixedDeltaTime);
                }
                type.GetField("_input", flags).SetValue(car, new Vector2(0, reverse ? -1 : 1));
                if (scenario == 9) body.linearVelocity = Vector3.forward * 13;
                if (landing)
                {
                    body.position += Vector3.up * 2;
                    type.GetField("_input", flags).SetValue(car, Vector2.zero);
                    Physics.SyncTransforms();
                }
                float maxRise = 0, maxHeight = body.position.y, minSpeed = float.PositiveInfinity;
                float minUp = 1;
                bool crossed = false, brakeApplied = false;
                var trajectory = new List<string>();
                for (int tick = 0; tick < 400; tick++)
                {
                    if ((brake || release) && body.position.z > -2.2f)
                    {
                        if (brake) type.GetField("_handbrake", flags).SetValue(car, true);
                        if (release) type.GetField("_input", flags).SetValue(car, Vector2.zero);
                        brakeApplied = true;
                    }
                    float before = body.position.y;
                    fixedUpdate.Invoke(car, null);
                    string command = body.linearVelocity.ToString("F3");
                    Physics.Simulate(Time.fixedDeltaTime);
                    lateUpdate.Invoke(car, null);
                    if (scenario == 9) trajectory.Add(tick + " p=" + body.position.ToString("F3") + " command=" + command + " v=" + body.linearVelocity.ToString("F3") + " up=" + car.transform.up.ToString("F3"));
                    maxRise = Mathf.Max(maxRise, body.position.y - before);
                    maxHeight = Mathf.Max(maxHeight, body.position.y);
                    minUp = Mathf.Min(minUp, car.transform.up.y);
                    if (body.position.z > -2 && body.position.z < 1) minSpeed = Mathf.Min(minSpeed, car.Speed);
                    if (body.position.z > 2) { crossed = true; break; }
                }
                bool shouldCross = !tall && !overhead && !brake && !release && !landing;
                if (scenario == 9) File.WriteAllLines(Folder + "car-fast-trajectory.txt", trajectory);
                Check(crossed == shouldCross && maxRise < 0.09f && (!(brake || release) || brakeApplied) &&
                    minUp > 0.7f && (!landing || (car.IsGrounded && Mathf.Abs(body.position.y - 100) < 0.1f && body.linearVelocity.magnitude < 0.2f)) &&
                    (!shouldCross || (minSpeed > (fast ? 3f : 0.1f) && maxHeight < 100 + height + 0.35f)),
                    "Car scenario=" + scenario + " curb=" + height + " crossed=" + crossed +
                    " maxTickRise=" + maxRise.ToString("F4") + " maxY=" + maxHeight.ToString("F3") + " minSpeed=" + minSpeed.ToString("F3") + " minUp=" + minUp.ToString("F3"));
            }
            var wheelPhysics = (WheelCollider[])type.GetField("_wheelColliders", flags).GetValue(car);
            var wheelModels = (Transform[])type.GetField("_wheels", flags).GetValue(car);
            bool posesMatch = true;
            for (int i = 0; i < 4; i++)
            {
                wheelPhysics[i].GetWorldPose(out Vector3 position, out Quaternion rotation);
                posesMatch &= Vector3.Distance(position, wheelModels[i].position) < 0.001f;
            }
            Check(posesMatch, "Wheel graphics follow suspension poses");
            car.RequestDismount();
            type.GetMethod("Update", flags).Invoke(car, null);
            bool anyAssistance = false;
            foreach (bool value in (bool[])type.GetField("_assisting", flags).GetValue(car)) anyAssistance |= value;
            Check(!car.IsDriven && !rider.IsRiding && body.isKinematic && !anyAssistance, "Dismount clears wheel assistance and restores player");
            File.WriteAllLines(Folder + "car-curb-checks.txt", Results);
        }
        catch (Exception error)
        {
            Check(false, error.ToString());
            File.WriteAllLines(Folder + "car-curb-checks.txt", Results);
        }
        finally
        {
            Physics.simulationMode = previousSimulation;
            if (floor != null) UnityEngine.Object.DestroyImmediate(floor);
            if (curb != null) UnityEngine.Object.DestroyImmediate(curb);
            if (ceiling != null) UnityEngine.Object.DestroyImmediate(ceiling);
            EditorApplication.isPlaying = false;
        }
    }
    static void Input(Vector2 value)
    {
        var data = new PointerEventData(EventSystem.current) { pointerId = -1 };
        if (player.IsRiding)
        {
            var so = new SerializedObject(player);
            var up = (DriveHoldButton)so.FindProperty("_forwardButton").objectReferenceValue;
            var down = (DriveHoldButton)so.FindProperty("_reverseButton").objectReferenceValue;
            var left = (DriveHoldButton)so.FindProperty("_leftButton").objectReferenceValue;
            var right = (DriveHoldButton)so.FindProperty("_rightButton").objectReferenceValue;
            up.Release(); down.Release(); left.Release(); right.Release();
            if(value.y > 0) up.OnPointerDown(data);
            if(value.y < 0) down.OnPointerDown(data);
            if(value.x < 0) left.OnPointerDown(data);
            if(value.x > 0) right.OnPointerDown(data);
            return;
        }
        if (value == Vector2.zero) { joystick.OnPointerUp(data); return; }
        var canvas = joystick.GetComponentInParent<Canvas>();
        var uiCamera = canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : canvas.worldCamera;
        Vector2 center = RectTransformUtility.WorldToScreenPoint(uiCamera, joystick.JoystickBase.position);
        data.position = center;
        if (!joystick.InputActive) joystick.OnPointerDown(data);
        data.position = center + value * 80f;
        joystick.OnDrag(data);
    }
    static void Tick()
    {
        if (!EditorApplication.isPlaying || EditorApplication.isPaused) return;
        try
        {
            float elapsed = Time.time - stageStart;
            if (stage == 0 && elapsed > 1)
            {
                if (GameManager.Instance != null) GameManager.Instance.StopAllCoroutines();
                if (GameController.Instance != null)
                {
                    GameController.Instance.StopAllCoroutines();
                }
                camera = UnityEngine.Object.FindFirstObjectByType<CameraController>();
                player = camera.Target; joystick = player.MoveJoystick;
                bike = UnityEngine.Object.FindFirstObjectByType<MotorbikeController>();
                Check(player.IsGrounded && player.transform.position.y > 10, "Player starts grounded above city road: " + player.transform.position);
                Check(camera.OutputCamera != null && joystick != null, "Camera and joystick assigned");
                Check(player.name == "Player" && GameObject.Find("Gojo") == null && GameObject.Find("Nigga") == null, "Existing Player replaces obsolete actors");
                var playerAnimator = player.GetComponentInChildren<Animator>();
                Check(!playerAnimator.isHuman && playerAnimator.runtimeAnimatorController != null,
                    "Player uses the baked Generic animation controller");
                Check(UIObject("_playerUI").activeInHierarchy && !UIObject("_motorbikeUI").activeSelf, "Only player UI visible at start");
                Check(UIObject("_startTutorial").activeInHierarchy, "Start tutorial visible");
                UnityEngine.Object.FindFirstObjectByType<GameController>().DismissStartTutorial();
                Check(!UIObject("_startTutorial").activeSelf && !UIObject("_moveTutorial").activeSelf, "Initial tutorial hints dismiss together");
                Check(GameObject.Find("Ride Motorbike") == null, "No ride button remains");
                Check(ObjectArrow().gameObject.activeInHierarchy, "Guide arrow visible before mounting");
                Capture("guide.png");
                start = player.transform.position;
                Input(Vector2.up); Next();
            }
            else if (stage == 1 && elapsed > 1)
            {
                Check(Vector3.Distance(start, player.transform.position) > 1, "Joystick moves player: " + Vector3.Distance(start, player.transform.position));
                Input(Vector2.zero); Next();
            }
            else if (stage == 2 && elapsed > 0.6f)
            {
                Check(Vector3.ProjectOnPlane(player.Velocity, Vector3.up).magnitude < 0.15f, "Releasing joystick stops walking");
                start = player.transform.position; player.OnJumpButtonPressed(); Next();
            }
            else if (stage == 3 && elapsed > 0.25f)
            {
                Check(player.transform.position.y - start.y > 0.2f, "Jump rises above ground"); Next();
            }
            else if (stage == 4 && elapsed > 1.5f)
            {
                Check(player.IsGrounded, "Player lands after jumping");
                player.Teleport(bike.transform.position + Vector3.right * 6f + Vector3.up * 0.08f, Quaternion.identity);
                camera.SnapToTarget(); camera.LookAtPoint(bike.transform.position + Vector3.up * 0.6f);
                Physics.SyncTransforms();
                var screen = (Vector2)camera.OutputCamera.WorldToScreenPoint(bike.transform.position + Vector3.up * 0.6f);
                UIObject("_startTutorial").SetActive(true);
                UIObject("_moveTutorial").SetActive(true);
                player.IsWorking = false;
                typeof(GameController).GetMethod("HandleStartTutorialPress", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
                    .Invoke(GameController.Instance, new object[] { screen });
                Check(bike.Rider == player && player.IsWorking, "Tutorial press immediately mounts and unlocks player outside normal interaction range");
                Check(!UIObject("_startTutorial").activeSelf && !UIObject("_moveTutorial").activeSelf, "Mount dismisses opening tutorials");
                Check(Mathf.Abs(Mathf.DeltaAngle(camera.Yaw, 0)) < 0.01f, "Mount resets camera yaw to zero");
                Check(!ObjectArrow().gameObject.activeSelf, "Guide arrow hides immediately on mount");
                camera.AddLookInput(new Vector2(Mathf.DeltaAngle(camera.Yaw, 0) / 0.18f, 0));
                Check(player.IsRiding && player.GetComponent<Rigidbody>().isKinematic && !player.GetComponent<CapsuleCollider>().enabled,
                    "Rider locomotion and collider disabled while seated");
                Check(!joystick.gameObject.activeSelf, "Joystick hidden while riding");
                var rideAnimator = player.GetComponentInChildren<Animator>();
                Check(rideAnimator.runtimeAnimatorController.name == "MotorbikeRider", "Rider pose controller applied");
                Capture("seated.png");
                Check(!UIObject("_playerUI").activeSelf && UIObject("_motorbikeUI").activeInHierarchy, "Mount swaps entire UI groups");
                Check(UIObject("_drivingTutorial").activeInHierarchy, "First ride shows driving tutorial");
                stage = 40; stageStart = Time.time;
            }
            else if (stage == 40 && elapsed > 0.6f)
            {
                Check(UIObject("_drivingTutorial").activeInHierarchy, "Driving tutorial stays while motorcycle is stationary");
                Capture("driving-tutorial.png");
                start = bike.transform.position; Input(Vector2.up); stage = 5; stageStart = Time.time;
            }
            else if (stage == 5 && elapsed > 1.3f)
            {
                Check(Vector3.Distance(player.transform.position, player.transform.parent.position) < 0.03f, "Rider remains attached to the moving seat");
                Check(!UIObject("_drivingTutorial").activeSelf, "Driving movement dismisses tutorial");
                Capture("driving.png");
                var hips = player.GetComponentInChildren<Animator>().transform.Find("Armature.001/mixamorig:Hips");
                File.AppendAllText(Folder + "camera-debug.txt", "Rider hips above bike=" + (hips.position.y - bike.transform.position.y) + "\n");
                Check(bike.Speed > 2 && bike.Speed < bike.MaxSpeed, "Bike accelerates progressively: " + bike.Speed);
                Check(Vector3.Distance(start, bike.transform.position) > 1, "Bike drives forward");
                yaw = bike.transform.eulerAngles.y;
                camera.AddLookInput(new Vector2(-250, 0)); Input(Vector2.up);
                stage = 50; stageStart = Time.time;
            }
            else if (stage == 50 && elapsed > 0.4f)
            {
                Check(Mathf.Abs(Mathf.DeltaAngle(yaw, bike.transform.eulerAngles.y)) < 1f, "Orbiting the camera does not steer the bike");
                Input(new Vector2(-1, 1));
                stage = 6; stageStart = Time.time;
            }
            else if (stage == 6 && elapsed > 1.7f)
            {
                Check(Mathf.DeltaAngle(yaw, bike.transform.eulerAngles.y) < -3, "Left button steers motorcycle: yaw=" + bike.transform.eulerAngles.y + " speed=" + bike.Speed);
                Check(Vector3.Dot(bike.transform.up, Vector3.up) > 0.99f, "Bike physics remains upright while visual leans");
                Check(Mathf.Abs(Mathf.DeltaAngle(camera.Yaw, 315f)) < 0.1f, "Camera keeps chosen heading without auto-follow");
                var so = new SerializedObject(player);
                var up = (DriveHoldButton)so.FindProperty("_forwardButton").objectReferenceValue;
                var down = (DriveHoldButton)so.FindProperty("_reverseButton").objectReferenceValue;
                var left = (DriveHoldButton)so.FindProperty("_leftButton").objectReferenceValue;
                var right = (DriveHoldButton)so.FindProperty("_rightButton").objectReferenceValue;
                right.OnPointerDown(new PointerEventData(EventSystem.current) { pointerId = 3 });
                Check(player.ReadSteerInput() == 0, "Simultaneous left/right buttons cancel");
                left.Release();
                Check(player.ReadSteerInput() == 1, "Right button supplies positive steering");
                down.OnPointerDown(new PointerEventData(EventSystem.current) { pointerId = 2 });
                Check(player.ReadDriveInput() == 0, "Simultaneous throttle buttons cancel");
                down.OnPointerUp(new PointerEventData(EventSystem.current) { pointerId = 99 });
                Check(down.IsHeld, "Unrelated pointer cannot release throttle");
                Input(Vector2.zero);
                var action = player.GetComponent<PlayerAction>();
                var exit = (UnityEngine.UI.Button)new SerializedObject(action).FindProperty("_exitButton").objectReferenceValue;
                Check(exit.gameObject.activeInHierarchy && up.gameObject.activeInHierarchy, "Driving buttons and exit visible");
                Check(HitControl(up.transform), "Forward button receives UI raycasts");
                Check(HitControl(down.transform), "Reverse button receives UI raycasts");
                Check(HitControl(left.transform) && HitControl(right.transform), "Both steering buttons receive UI raycasts");
                Check(HitControl(exit.transform), "Exit button receives UI raycasts");
                exit.onClick.Invoke(); Next();
            }
            else if (stage == 7 && elapsed > 2)
            {
                Check(!player.IsRiding && !bike.IsDriven, "Bike brakes and safely dismounts");
                Check(player.GetComponent<CapsuleCollider>().enabled && !player.GetComponent<Rigidbody>().isKinematic, "On-foot physics restored");
                Check(player.IsGrounded, "Player stands on ground after dismount");
                Check(ObjectArrow().gameObject.activeInHierarchy, "Guide arrow returns after dismount");
                Check(Vector3.ProjectOnPlane(ObjectArrow().transform.position - bike.transform.position, Vector3.up).magnitude < 0.05f, "Guide follows parked motorcycle position");
                Check(player.GetComponentInChildren<Animator>().runtimeAnimatorController.name == "Player city", "On-foot animations restored");
                Check(joystick.gameObject.activeSelf, "Joystick restored on foot");
                Check(UIObject("_playerUI").activeInHierarchy && !UIObject("_motorbikeUI").activeSelf, "Dismount restores player UI only");
                Check(!UIObject("_startTutorial").activeSelf, "Initial tutorial does not return after dismount");
                Check(Mathf.Abs(bike.transform.InverseTransformPoint(player.transform.position).x) > 1f, "Player exits beside motorcycle");
                Capture("onfoot.png");
                // Place a wall between the player and the desired third-person camera position.
                camera.SnapToTarget();
                wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
                wall.name = "Temporary camera wall";
                var back = Quaternion.Euler(0, camera.Yaw, 0) * Vector3.back;
                wall.transform.position = player.transform.position + back * 2 + Vector3.up * 1.5f;
                wall.transform.rotation = Quaternion.Euler(0, camera.Yaw, 0);
                wall.transform.localScale = new Vector3(5, 4, 0.25f);
                Physics.SyncTransforms(); Next();
            }
            else if (stage == 8 && elapsed > 0.4f)
            {
                Check(Vector3.Distance(player.transform.position + Vector3.up * 1.32f, camera.OutputCamera.transform.position) < 2.1f,
                    "Camera pulls in before an obstructing wall");
                UnityEngine.Object.Destroy(wall); Capture("walking.png");
                var body = bike.GetComponent<Rigidbody>();
                body.position = new Vector3(-9, 13.54f, 3); body.rotation = Quaternion.identity;
                bike.transform.SetPositionAndRotation(body.position, body.rotation);
                player.Teleport(body.position + Vector3.right * 1.8f + Vector3.up * 0.08f, Quaternion.identity);
                player.GetComponent<PlayerAction>().UseMotorbike();
                Check(bike.Rider == player, "Remount after dismount");
                Check(!UIObject("_drivingTutorial").activeSelf, "Subsequent rides never repeat driving tutorial");
                wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
                wall.name = "Temporary driving wall";
                wall.transform.position = bike.transform.position + Vector3.forward * 7 + Vector3.up * 1.5f;
                wall.transform.localScale = new Vector3(6, 3, 0.3f);
                camera.AddLookInput(new Vector2(Mathf.DeltaAngle(camera.Yaw, 0) / 0.18f, 0));
                Physics.SyncTransforms(); Input(Vector2.up); Next();
            }
            else if (stage == 9 && elapsed > 2.5f)
            {
                Check(bike.transform.position.z < wall.transform.position.z - 1f, "Motorbike cannot drive through a wall");
                Check(bike.Speed < 1f, "Collision stops acceleration instead of storing launch speed");
                UnityEngine.Object.Destroy(wall); start = bike.transform.position;
                Input(Vector2.down); Next();
            }
            else if (stage == 10 && elapsed > 1.2f)
            {
                Check(Vector3.Dot(bike.GetComponent<Rigidbody>().linearVelocity, bike.transform.forward) < -0.5f,
                    "Down button brakes then reverses");
                Input(Vector2.zero); bike.RequestDismount(); Next();
            }
            else if (stage == 11 && elapsed > 2)
            {
                Check(!player.IsRiding && player.IsGrounded, "Repeated mount/drive/dismount cycle restores grounded walking");
                var body = bike.GetComponent<Rigidbody>();
                body.position = new Vector3(-9, 13.54f, 3); body.rotation = Quaternion.identity;
                bike.transform.SetPositionAndRotation(body.position, body.rotation);
                player.Teleport(body.position + Vector3.right * 1.8f + Vector3.up * 0.08f, Quaternion.identity);
                player.GetComponent<PlayerAction>().UseMotorbike();
                Physics.SyncTransforms();
                Vector3 curbPosition = bike.transform.position + Vector3.forward * 4f;
                if (!Physics.Raycast(curbPosition + Vector3.up * 2, Vector3.down, out RaycastHit road, 6, ~0, QueryTriggerInteraction.Ignore))
                    throw new Exception("No road found for curb regression check");
                wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
                wall.name = "Temporary 20cm driving curb";
                wall.transform.position = new Vector3(curbPosition.x, road.point.y + 0.1f, curbPosition.z);
                wall.transform.localScale = new Vector3(6, 0.2f, 0.5f);
                start = bike.transform.position;
                Physics.SyncTransforms(); Input(Vector2.up); Next();
            }
            else if (stage == 12 && elapsed > 2.2f)
            {
                Check(bike.transform.position.z > wall.transform.position.z + 1.5f, "Bike clears a 20cm curb");
                Check(Mathf.Abs(Mathf.DeltaAngle(bike.transform.eulerAngles.y, 0)) < 3f, "Curb impact does not spin bike yaw");
                Check(Mathf.Abs(bike.transform.position.x - start.x) < 0.3f, "Curb impact does not slide bike sideways");
                Input(Vector2.zero);
                UnityEngine.Object.Destroy(wall);
                Check(true, "Integration check completed");
                EditorApplication.update -= Tick;
                EditorApplication.isPlaying = false;
            }
        }
        catch (Exception e)
        {
            Check(false, e.ToString());
            EditorApplication.update -= Tick;
            EditorApplication.isPlaying = false;
        }
    }
    static GameObject UIObject(string field)
    {
        return (GameObject)new SerializedObject(UnityEngine.Object.FindFirstObjectByType<GameController>()).FindProperty(field).objectReferenceValue;
    }
    static Arrow ObjectArrow()
    {
        return (Arrow)new SerializedObject(player.GetComponent<PlayerAction>()).FindProperty("_motorbikeArrow").objectReferenceValue;
    }
    static bool HitControl(Transform target)
    {
        Canvas.ForceUpdateCanvases();
        var canvas = target.GetComponentInParent<Canvas>();
        var data = new PointerEventData(EventSystem.current) { position = RectTransformUtility.WorldToScreenPoint(canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : canvas.worldCamera, target.position) };
        var hits = new List<RaycastResult>(); EventSystem.current.RaycastAll(data, hits);
        return hits.Count > 0 && (hits[0].gameObject.transform == target || hits[0].gameObject.transform.IsChildOf(target));
    }
    static void Capture(string file)
    {
        ScreenCapture.CaptureScreenshot(Folder + "ui-" + file);
        var cam = camera.OutputCamera;
        var rt = new RenderTexture(450, 800, 24);
        var previous = RenderTexture.active; var previousTarget = cam.targetTexture;
        var texture = new Texture2D(450, 800, TextureFormat.RGB24, false);
        try
        {
            cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt;
            texture.ReadPixels(new Rect(0, 0, 450, 800), 0, 0); texture.Apply();
            File.WriteAllBytes(Folder + file, texture.EncodeToPNG());
            File.AppendAllText(Folder + "camera-debug.txt", file + " camera=" + cam.transform.position + " player=" + player.transform.position +
                " viewport=" + cam.WorldToViewportPoint(player.transform.position + Vector3.up) + "\n");
        }
        finally
        {
            cam.targetTexture = previousTarget; RenderTexture.active = previous;
            UnityEngine.Object.DestroyImmediate(texture); UnityEngine.Object.DestroyImmediate(rt);
        }
    }
}
