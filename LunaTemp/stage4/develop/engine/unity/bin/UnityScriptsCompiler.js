if ( TRACE ) { TRACE( JSON.parse( '["CameraController#init","CameraController#Awake","CameraController#ResetAngles","CameraController#Start","CameraController#LateUpdate","CameraController#Orbit","CameraController#UpdateTransform","IAPPopupView#init","IAPPopupView#Show","LunaController#EndCardVisible#get","LunaController#IAPVisible#get","LunaController#init","LunaController#Awake","LunaController#Start","LunaController#OnDestroy","LunaController#Update","LunaController#CountClick","LunaController#EggIncubated","LunaController#EggHatched","LunaController#PlayerWalked","LunaController#ShowEndCard","LunaController#ClickCTA","LunaController#EndGame","PlayableCameraDrag#init","PlayableCameraDrag#OnPointerDown","PlayableCameraDrag#OnDrag","PlayableCameraDrag#OnPointerUp","PlayableCameraDrag#OnDisable","PlayableEggRules#Pick","PlayableEggRules#RollSize","PlayableHoldButton#init","PlayableHoldButton#OnPointerDown","PlayableHoldButton#OnPointerUp","PlayableHoldButton#OnPointerExit","PlayableHoldButton#Cancel","PlayableHoldButton#OnDisable","PlayableHoldButton#Update","PlayableImageCycle#init","PlayableImageCycle#OnEnable","PlayableImageCycle#Update","PlayableImageCycle#SetAlpha","PlayableJoystick#Radius#get","PlayableJoystick#init","PlayableJoystick#OnPointerDown","PlayableJoystick#OnDrag","PlayableJoystick#OnPointerUp","PlayableJoystick#ResetInput","PlayableJoystick#OnDisable","PlayableRagdoll#init","PlayableRagdoll#Begin","PlayableRagdoll#Follow","PlayableRagdoll#Recover","PlayableRagdoll#OnDestroy","PlayableSpatialAudio#init","PlayableSpatialAudio#Awake","PlayableSpatialAudio#LateUpdate","PlayableSpatialAudio#Apply","PlayableUIPulse#init","PlayableUIPulse#Awake","PlayableUIPulse#Update","PlayableUISparkle#init","PlayableUISparkle#OnEnable","PlayableUISparkle#Respawn","PlayableUISparkle#RespawnRay","PlayableUISparkle#Update","PlayableUISparkle#Set","StealEggGame#init","StealEggGame#MotionFor","StealEggGame#SetAnimatorState","StealEggGame#SetLoop","StealEggGame#ReturnToNest","StealEggGame#FlatDistance","StealEggGame#Num","StealEggGame#Clock","StealEggGame#DisablePhysics","StealEggGame#SetVisualSize","StealEggGame#SetAnimatorMovement","StealEggGame#TopOf","StealEggGame#InsideBox","StealEggGame#ChildText","StealEggGame#BonePose","StealEggGame#HeadBone","StealEggGame#Slot","StealEggGame#RandomOf","StealEggGame#WearMaterial","StealEggGame#SetText","StealEggGame#SetImage","StealEggGame#Show$1","StealEggGame#Show","StealEggGame#ShowMark","StealEggGame#FightActive#get","StealEggGame#TutorialCompleted#get","StealEggGame#IsCarrying#get","StealEggGame#EndCardVisible#get","StealEggGame#carried#get","StealEggGame#carried#set","StealEggGame#IsKnockedDown#get","StealEggGame#Blocked#get","StealEggGame#IsInputBlocked#get","StealEggGame#MyHouse#get","StealEggGame#MaxSlots#get","StealEggGame#MaxCoopLevel#get","StealEggGame#MaxTreadmillLevel#get","StealEggGame#IncubateTick#get","StealEggGame#InsideMyCoop#get","StealEggGame#CoopCenter#get","StealEggGame#NearTreadmill#get","StealEggGame#AnyIncubatorReady#get","StealEggGame#QuickSlotCount#get","StealEggGame#CanUseInventory#get","StealEggGame#StationPanels#get","StealEggGame#InputBlocked#get","StealEggGame#PhaseLeft#get","StealEggGame#IndexClaimable#get","StealEggGame#init","StealEggGame#UpdatePlayerAnimation","StealEggGame#SetNpcAnimation","StealEggGame#Attack","StealEggGame#UpdateCombat","StealEggGame#ApplyBatSwing","StealEggGame#Start","StealEggGame#DisableTriggers","StealEggGame#PlaySound","StealEggGame#UpdateFootsteps","StealEggGame#NotifyCameraTurned","StealEggGame#Update","StealEggGame#LateUpdate","StealEggGame#MovePlayer","StealEggGame#Jump","StealEggGame#WalkSpeed","StealEggGame#SpeedPowerFor","StealEggGame#AddMoney","StealEggGame#AddSpeedPower","StealEggGame#SpendMoney","StealEggGame#SpawnNestEgg","StealEggGame#ResetZoneEggs","StealEggGame#EggWeight","StealEggGame#InZone","StealEggGame#TakeEgg","StealEggGame#ReleaseEgg","StealEggGame#FetchNext","StealEggGame#HideForRevive","StealEggGame#LoseEgg","StealEggGame#DropEgg","StealEggGame#GatherEgg","StealEggGame#ClearStolenEggUI","StealEggGame#RetargetGuardian","StealEggGame#UpdateGuardians","StealEggGame#EndFetch","StealEggGame#CatchThief","StealEggGame#BeginKnockdown","StealEggGame#UpdateKnockdown","StealEggGame#EndKnockdown","StealEggGame#Respawn","StealEggGame#TeleportPlayer","StealEggGame#SetStep","StealEggGame#UpdateGuide","StealEggGame#Rule","StealEggGame#RollEgg","StealEggGame#UpdateSafeArea","StealEggGame#BindSceneUI","StealEggGame#BindSceneButton","StealEggGame#SlotsAt","StealEggGame#Price","StealEggGame#StartHome","StealEggGame#RollPetSize","StealEggGame#RollSmallPetSize","StealEggGame#LargestPetSize","StealEggGame#MaxPetSize","StealEggGame#ShowCoopModel","StealEggGame#ShowTreadmill","StealEggGame#RandomInCoop","StealEggGame#SpawnCoopPet","StealEggGame#ShowPetInfo","StealEggGame#UpdatePetInfos","StealEggGame#MoveCoopPet","StealEggGame#UpdateHome","StealEggGame#IncubateHand","StealEggGame#IncubateFromBag","StealEggGame#StartIncubation","StealEggGame#UpdateIncubator","StealEggGame#Hatch","StealEggGame#RollPet","StealEggGame#CompleteHatch","StealEggGame#UpdateFlyingPet","StealEggGame#NearestIncubator","StealEggGame#EquipPetToCoop","StealEggGame#EquipHandPet","StealEggGame#UnequipCoopPet","StealEggGame#EquipBest","StealEggGame#BeginTraining","StealEggGame#UpdateTraining","StealEggGame#BindHomeUI","StealEggGame#UpgradeCoop","StealEggGame#UpgradeTreadmill","StealEggGame#RefreshPads","StealEggGame#SetPad","StealEggGame#RefreshPetsPopup","StealEggGame#RefreshIncubatePopup","StealEggGame#AddItem","StealEggGame#RemoveItem","StealEggGame#PetItem","StealEggGame#ItemRule","StealEggGame#ItemIcon","StealEggGame#ItemName","StealEggGame#ItemModel","StealEggGame#EquipHand","StealEggGame#UnequipHand","StealEggGame#UpdateHandVisual","StealEggGame#BindInventoryUI","StealEggGame#TapQuickSlot","StealEggGame#ToggleBag","StealEggGame#RefreshInventoryUI","StealEggGame#RefreshBag","StealEggGame#EggWeightOf","StealEggGame#StartNpcs","StealEggGame#GroundAt","StealEggGame#UpdateNpcs","StealEggGame#ThinkNpc","StealEggGame#TryStartSteal","StealEggGame#MoveNpc","StealEggGame#SetNpcMove","StealEggGame#KnockNpc","StealEggGame#UpdateNpcDown","StealEggGame#InLobby","StealEggGame#LobbyTeleport","StealEggGame#SendEveryoneToLobby","StealEggGame#FollowBone","StealEggGame#UpdateBoneFollowers","StealEggGame#StartOutfits","StealEggGame#DressRandom","StealEggGame#WearHair","StealEggGame#IsStationPanel","StealEggGame#BindOriginalUI","StealEggGame#UpdateTutorialHints","StealEggGame#UpdateTapHint","StealEggGame#UpdateTapHint$1","StealEggGame#UpdateInteraction","StealEggGame#DoAction","StealEggGame#PressPrimaryAction","StealEggGame#UpdateStations","StealEggGame#Station","StealEggGame#NearStation","StealEggGame#OpenModal","StealEggGame#CloseModal","StealEggGame#UpdateHud","StealEggGame#LateUpdateUI","StealEggGame#RefreshSpeedToggle","StealEggGame#PulseSpeedIcon","StealEggGame#ShowWarning","StealEggGame#ShowDialog","StealEggGame#UpdateZoneBanner","StealEggGame#ShowReward","StealEggGame#IncomePopup","StealEggGame#FloatText","StealEggGame#Bind","StealEggGame#RarityName","StealEggGame#RarityColor","StealEggGame#SetRarityText","StealEggGame#BoostMultiplier","StealEggGame#StartWorld","StealEggGame#UpdateWorld","StealEggGame#UpdateDayNight","StealEggGame#AddBoost","StealEggGame#UpdateBoosts","StealEggGame#UpdateFrog","StealEggGame#UpdateLuckyEggs","StealEggGame#NearestLuckyEgg","StealEggGame#OpenLuckyEgg","StealEggGame#OpenTrailShop","StealEggGame#RegisterIndex","StealEggGame#IndexMoney","StealEggGame#IndexSpeed","StealEggGame#BindIndexUI","StealEggGame#OpenIndex","StealEggGame#RefreshIndex","StealEggGame#AddIndexReward","StealEggGame#ClaimIndexReward","StealEggGame.Actor#Down#get","StealEggGame.Actor#init","StealEggGame.BoneFollower#init","StealEggGame.CoopPet#init","StealEggGame.Egg#Available#get","StealEggGame.Egg#init","StealEggGame.FlyingPet#init","StealEggGame.House#Coop#get","StealEggGame.House#TrainSlot#get","StealEggGame.House#init","StealEggGame.Incubator#init","StealEggGame.Item#init","StealEggGame.LuckyEgg#init","StealEggGame.Popup#init","StealEggGame.Zone#init","TapHintView#Update"]' ) ); }
/**
 * @version 1.0.9804.20951
 * @copyright anton
 * @compiler Bridge.NET 17.9.42-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*BagCellView start.*/
    Bridge.define("BagCellView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            button: null,
            thumbnail: null,
            highlight: null,
            exposeMark: null,
            amount: null
        }
    });
    /*BagCellView end.*/

    /*CameraController start.*/
    /**
     * Independent camera orbit, zoom and follow, updated before gameplay's world-space UI.
     *
     * @public
     * @class CameraController
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("CameraController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            target: null,
            controlledCamera: null,
            cameraManager: null,
            game: null,
            distance: 0,
            initialVerticalAngle: 0,
            initialHorizontalAngle: 0,
            horizontalAngle: 0,
            verticalAngle: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CameraController#init", this ); }

                this.distance = 9;
                this.initialVerticalAngle = 5.4;
                this.initialHorizontalAngle = 3.3;
            }
        },
        methods: {
            /*CameraController.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CameraController#Awake", this ); }

                if (!UnityEngine.Object.op_Implicit(this.controlledCamera)) {
                    this.controlledCamera = UnityEngine.Object.op_Implicit(this.game) ? this.game.gameCamera : this.GetComponentInChildren(UnityEngine.Camera);
                }
                this.ResetAngles();
            },
            /*CameraController.Awake end.*/

            /*CameraController.ResetAngles start.*/
            ResetAngles: function () {
if ( TRACE ) { TRACE( "CameraController#ResetAngles", this ); }

                this.horizontalAngle = this.initialHorizontalAngle;
                this.verticalAngle = this.initialVerticalAngle;
            },
            /*CameraController.ResetAngles end.*/

            /*CameraController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "CameraController#Start", this ); }

                this.UpdateTransform();
            },
            /*CameraController.Start end.*/

            /*CameraController.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "CameraController#LateUpdate", this ); }

                if (!UnityEngine.Object.op_Implicit(this.target) || UnityEngine.Time.timeScale === 0) {
                    return;
                }
                if (UnityEngine.Input.GetMouseButton(1)) {
                    this.horizontalAngle += UnityEngine.Input.GetAxis("Mouse X") * 3;
                }
                this.distance = Math.max(9, Math.min(this.distance - UnityEngine.Input.GetAxis("Mouse ScrollWheel") * 1000 * UnityEngine.Time.deltaTime, 30));
                this.UpdateTransform();
            },
            /*CameraController.LateUpdate end.*/

            /*CameraController.Orbit start.*/
            Orbit: function (delta) {
if ( TRACE ) { TRACE( "CameraController#Orbit", this ); }

                if (!this.isActiveAndEnabled || (UnityEngine.Object.op_Implicit(this.game) && this.game.IsInputBlocked)) {
                    return;
                }
                if (delta.lengthSq() > 4 && UnityEngine.Object.op_Implicit(this.game)) {
                    this.game.NotifyCameraTurned();
                }
                this.horizontalAngle += delta.x * 0.15;
                this.verticalAngle = Math.max(-10, Math.min(this.verticalAngle - delta.y * 0.15, 75));
            },
            /*CameraController.Orbit end.*/

            /*CameraController.UpdateTransform start.*/
            UpdateTransform: function () {
if ( TRACE ) { TRACE( "CameraController#UpdateTransform", this ); }

                if (!UnityEngine.Object.op_Implicit(this.target) || !UnityEngine.Object.op_Implicit(this.controlledCamera)) {
                    return;
                }
                var focus = this.target.position.$clone().add( pc.Vec3.UP.clone().clone().scale( 1.65 ) );
                if (UnityEngine.Object.op_Implicit(this.cameraManager) && UnityEngine.Component.op_Inequality(this.cameraManager, this.controlledCamera.transform)) {
                    this.cameraManager.position = focus.$clone();
                }
                this.controlledCamera.transform.position = focus.$clone().add( new pc.Quat().setFromEulerAngles_Unity( this.verticalAngle, this.horizontalAngle, 0 ).transformVector( new pc.Vec3( 0, 0, -1 ) ).clone().scale( this.distance ) );
                this.controlledCamera.transform.LookAt$2(focus);
            },
            /*CameraController.UpdateTransform end.*/


        }
    });
    /*CameraController end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*IAPPopupView start.*/
    Bridge.define("IAPPopupView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            buy10: null,
            buy1: null,
            label10: null,
            label1: null,
            caption10: null,
            caption1: null,
            hint10: null,
            hint1: null,
            price10: null,
            price1: null,
            eggs10: null,
            eggs1: null,
            sound: null,
            openSound: null,
            clickSound: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "IAPPopupView#init", this ); }

                this.price10 = "$7.99";
                this.price1 = "$0.99";
                this.eggs10 = "10 eggs";
                this.eggs1 = "1 egg";
            }
        },
        methods: {
            /*IAPPopupView.Show start.*/
            Show: function (version, onBuy) {
if ( TRACE ) { TRACE( "IAPPopupView#Show", this ); }

                var $t;
                var eggText = version >= 3, handOn10 = version === 1 || version === 3;
                if (UnityEngine.Object.op_Implicit(this.label10)) {
                    this.label10.text = eggText ? this.eggs10 : this.price10;
                }
                if (UnityEngine.Object.op_Implicit(this.label1)) {
                    this.label1.text = eggText ? this.eggs1 : this.price1;
                }
                if (UnityEngine.Object.op_Implicit(this.caption10)) {
                    this.caption10.SetActive(!eggText);
                }
                if (UnityEngine.Object.op_Implicit(this.caption1)) {
                    this.caption1.SetActive(!eggText);
                }
                if (UnityEngine.Object.op_Implicit(this.hint10)) {
                    this.hint10.gameObject.SetActive(handOn10);
                }
                if (UnityEngine.Object.op_Implicit(this.hint1)) {
                    this.hint1.gameObject.SetActive(!handOn10);
                }
                $t = Bridge.getEnumerator(System.Array.init([this.buy10, this.buy1], UnityEngine.UI.Button));
                try {
                    while ($t.moveNext()) {
                        var b = $t.Current;
                        if (!UnityEngine.Object.op_Implicit(b)) {
                            continue;
                        }
                        b.onClick.RemoveAllListeners();
                        b.onClick.AddListener(Bridge.fn.bind(this, function () {
                            if (UnityEngine.Object.op_Implicit(this.sound) && UnityEngine.Object.op_Implicit(this.clickSound)) {
                                this.sound.PlayOneShot(this.clickSound);
                            }
                        }));
                        b.onClick.AddListener(onBuy);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.gameObject.SetActive(true);
                if (UnityEngine.Object.op_Implicit(this.sound) && UnityEngine.Object.op_Implicit(this.openSound)) {
                    this.sound.PlayOneShot(this.openSound);
                }
            },
            /*IAPPopupView.Show end.*/


        }
    });
    /*IAPPopupView end.*/

    /*IconAmountView start.*/
    Bridge.define("IconAmountView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            icon: null,
            amount: null
        }
    });
    /*IconAmountView end.*/

    /*IncubateRowView start.*/
    Bridge.define("IncubateRowView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            thumbnail: null,
            progressFill: null,
            content: null,
            open: null,
            opening: null
        }
    });
    /*IncubateRowView end.*/

    /*IndexPetCellView start.*/
    Bridge.define("IndexPetCellView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            button: null,
            frame: null,
            thumbnail: null,
            petName: null,
            selected: null,
            mark: null
        }
    });
    /*IndexPetCellView end.*/

    /*IndexZoneView start.*/
    Bridge.define("IndexZoneView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            zoneName: null,
            progress: null,
            thumbnail: null,
            progressFill: null,
            petContent: null,
            petTemplate: null
        }
    });
    /*IndexZoneView end.*/

    /*LunaController start.*/
    Bridge.define("LunaController", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                Instance: null
            }
        },
        fields: {
            LimitTimePlay: false,
            TimePlay: 0,
            BGM: null,
            LimitCountClick: false,
            MaxCountClick: 0,
            LimitCountIncubate: false,
            MaxCountIncubate: 0,
            LimitCountHatch: false,
            MaxCountHatch: 0,
            IAPVersion: 0,
            IAPDistance: 0,
            musicSource: null,
            CTA: null,
            endCard: null,
            iapPopup: null,
            clicks: 0,
            incubates: 0,
            hatches: 0,
            iapShown: false
        },
        props: {
            EndCardVisible: {
                get: function () {
if ( TRACE ) { TRACE( "LunaController#EndCardVisible#get", this ); }

                    return UnityEngine.Object.op_Implicit(this.endCard) && this.endCard.activeSelf;
                }
            },
            IAPVisible: {
                get: function () {
if ( TRACE ) { TRACE( "LunaController#IAPVisible#get", this ); }

                    return UnityEngine.Object.op_Implicit(this.iapPopup) && this.iapPopup.gameObject.activeSelf;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "LunaController#init", this ); }

                this.IAPVersion = 1;
                this.IAPDistance = 6;
            }
        },
        methods: {
            /*LunaController.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "LunaController#Awake", this ); }

                LunaController.Instance = this;
            },
            /*LunaController.Awake end.*/

            /*LunaController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "LunaController#Start", this ); }

                var $t;
                if (UnityEngine.Object.op_Implicit(this.BGM) && UnityEngine.Object.op_Implicit(this.musicSource)) {
                    this.musicSource.clip = this.BGM;
                    this.musicSource.loop = true;
                    this.musicSource.Play();
                }
                $t = Bridge.getEnumerator(this.CTA);
                try {
                    while ($t.moveNext()) {
                        var b = $t.Current;
                        if (UnityEngine.Object.op_Implicit(b)) {
                            b.onClick.AddListener(Bridge.fn.cacheBind(this, this.ClickCTA));
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (UnityEngine.Object.op_Implicit(this.endCard)) {
                    this.endCard.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.iapPopup)) {
                    this.iapPopup.gameObject.SetActive(false);
                }
                this.StartCoroutine$1(this.EndGame());
            },
            /*LunaController.Start end.*/

            /*LunaController.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "LunaController#OnDestroy", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(LunaController.Instance, this)) {
                    LunaController.Instance = null;
                }
            },
            /*LunaController.OnDestroy end.*/

            /*LunaController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "LunaController#Update", this ); }

                if (UnityEngine.Input.GetMouseButtonDown(0)) {
                    this.CountClick();
                }
            },
            /*LunaController.Update end.*/

            /*LunaController.CountClick start.*/
            CountClick: function () {
if ( TRACE ) { TRACE( "LunaController#CountClick", this ); }

                if (!this.LimitCountClick) {
                    return;
                }
                this.clicks = (this.clicks + 1) | 0;
                if (this.clicks >= this.MaxCountClick) {
                    this.ClickCTA();
                }
            },
            /*LunaController.CountClick end.*/

            /*LunaController.EggIncubated start.*/
            EggIncubated: function () {
if ( TRACE ) { TRACE( "LunaController#EggIncubated", this ); }

                this.incubates = (this.incubates + 1) | 0;
                if (this.LimitCountIncubate && this.incubates >= this.MaxCountIncubate) {
                    this.ClickCTA();
                }
            },
            /*LunaController.EggIncubated end.*/

            /*LunaController.EggHatched start.*/
            EggHatched: function () {
if ( TRACE ) { TRACE( "LunaController#EggHatched", this ); }

                this.hatches = (this.hatches + 1) | 0;
                if (this.LimitCountHatch && this.hatches >= this.MaxCountHatch) {
                    this.ClickCTA();
                }
            },
            /*LunaController.EggHatched end.*/

            /*LunaController.PlayerWalked start.*/
            PlayerWalked: function (distance) {
if ( TRACE ) { TRACE( "LunaController#PlayerWalked", this ); }

                if (this.iapShown || this.IAPVersion <= 0 || !UnityEngine.Object.op_Implicit(this.iapPopup) || distance < this.IAPDistance) {
                    return;
                }
                this.iapShown = true;
                this.iapPopup.Show(this.IAPVersion, Bridge.fn.cacheBind(this, this.ClickCTA));
            },
            /*LunaController.PlayerWalked end.*/

            /*LunaController.ShowEndCard start.*/
            ShowEndCard: function () {
if ( TRACE ) { TRACE( "LunaController#ShowEndCard", this ); }

                if (UnityEngine.Object.op_Implicit(this.endCard)) {
                    this.endCard.SetActive(true);
                }
            },
            /*LunaController.ShowEndCard end.*/

            /*LunaController.ClickCTA start.*/
            ClickCTA: function () {
if ( TRACE ) { TRACE( "LunaController#ClickCTA", this ); }

                Luna.Unity.Playable.InstallFullGame();
            },
            /*LunaController.ClickCTA end.*/

            /*LunaController.EndGame start.*/
            EndGame: function () {
if ( TRACE ) { TRACE( "LunaController#EndGame", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(this.TimePlay);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    Luna.Unity.LifeCycle.GameEnded();
                                        if (this.LimitTimePlay) {
                                            this.ShowEndCard();
                                        }

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*LunaController.EndGame end.*/


        }
    });
    /*LunaController end.*/

    /*PetRowView start.*/
    Bridge.define("PetRowView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            content: null,
            thumbnail: null,
            unequip: null
        }
    });
    /*PetRowView end.*/

    /*PlayableCameraDrag start.*/
    Bridge.define("PlayableCameraDrag", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            cameraController: null,
            pointer: 0
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableCameraDrag#init", this ); }

                this.pointer = -2147483648;
            }
        },
        methods: {
            /*PlayableCameraDrag.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "PlayableCameraDrag#OnPointerDown", this ); }

                if (this.pointer === -2147483648) {
                    this.pointer = e.pointerId;
                }
            },
            /*PlayableCameraDrag.OnPointerDown end.*/

            /*PlayableCameraDrag.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "PlayableCameraDrag#OnDrag", this ); }

                if (e.pointerId === this.pointer && UnityEngine.Object.op_Implicit(this.cameraController)) {
                    this.cameraController.Orbit(e.delta);
                }
            },
            /*PlayableCameraDrag.OnDrag end.*/

            /*PlayableCameraDrag.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "PlayableCameraDrag#OnPointerUp", this ); }

                if (e.pointerId === this.pointer) {
                    this.pointer = -2147483648;
                }
            },
            /*PlayableCameraDrag.OnPointerUp end.*/

            /*PlayableCameraDrag.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "PlayableCameraDrag#OnDisable", this ); }

                this.pointer = -2147483648;
            },
            /*PlayableCameraDrag.OnDisable end.*/


        }
    });
    /*PlayableCameraDrag end.*/

    /*PlayableEggRules start.*/
    Bridge.define("PlayableEggRules", {
        statics: {
            methods: {
                /*PlayableEggRules.Pick:static start.*/
                Pick: function (weights, count) {
if ( TRACE ) { TRACE( "PlayableEggRules#Pick", this ); }

                    if (count <= 0) {
                        return 0;
                    }
                    var sum = 0;
                    for (var i = 0; i < count; i = (i + 1) | 0) {
                        sum += weights != null && i < weights.length ? UnityEngine.Mathf.Max(0, weights[i]) : 1;
                    }
                    if (sum <= 0) {
                        return 0;
                    }
                    var value = UnityEngine.Random.value * sum;
                    for (var i1 = 0; i1 < count; i1 = (i1 + 1) | 0) {
                        value -= weights != null && i1 < weights.length ? UnityEngine.Mathf.Max(0, weights[i1]) : 1;
                        if (value <= 0) {
                            return i1;
                        }
                    }
                    return ((count - 1) | 0);
                },
                /*PlayableEggRules.Pick:static end.*/


            }
        },
        fields: {
            name: null,
            thumbnail: null,
            petIds: null,
            spawnWeight: 0,
            incubationTime: 0,
            sizeRanges: null,
            sizeWeights: null,
            pets: null,
            petWeights: null,
            petIncome: null
        },
        methods: {
            /*PlayableEggRules.RollSize start.*/
            RollSize: function () {
if ( TRACE ) { TRACE( "PlayableEggRules#RollSize", this ); }

                if (this.sizeRanges == null || this.sizeRanges.length === 0) {
                    return 1;
                }
                var range = this.sizeRanges[PlayableEggRules.Pick(this.sizeWeights, this.sizeRanges.length)].$clone();
                return UnityEngine.Random.Range$1(range.x, range.y);
            },
            /*PlayableEggRules.RollSize end.*/


        }
    });
    /*PlayableEggRules end.*/

    /*PlayableHoldButton start.*/
    Bridge.define("PlayableHoldButton", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IPointerUpHandler,UnityEngine.EventSystems.IPointerExitHandler],
        fields: {
            duration: 0,
            fill: null,
            onHold: null,
            holding: false,
            clock: 0
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp",
            "OnPointerExit", "UnityEngine$EventSystems$IPointerExitHandler$OnPointerExit"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableHoldButton#init", this ); }

                this.duration = 0.6;
            }
        },
        methods: {
            /*PlayableHoldButton.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "PlayableHoldButton#OnPointerDown", this ); }

                this.holding = true;
                this.clock = 0;
            },
            /*PlayableHoldButton.OnPointerDown end.*/

            /*PlayableHoldButton.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "PlayableHoldButton#OnPointerUp", this ); }

                this.Cancel();
            },
            /*PlayableHoldButton.OnPointerUp end.*/

            /*PlayableHoldButton.OnPointerExit start.*/
            OnPointerExit: function (e) {
if ( TRACE ) { TRACE( "PlayableHoldButton#OnPointerExit", this ); }

                this.Cancel();
            },
            /*PlayableHoldButton.OnPointerExit end.*/

            /*PlayableHoldButton.Cancel start.*/
            Cancel: function () {
if ( TRACE ) { TRACE( "PlayableHoldButton#Cancel", this ); }

                this.holding = false;
                this.clock = 0;
                if (UnityEngine.Object.op_Implicit(this.fill)) {
                    this.fill.fillAmount = 0;
                }
            },
            /*PlayableHoldButton.Cancel end.*/

            /*PlayableHoldButton.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "PlayableHoldButton#OnDisable", this ); }

                this.Cancel();
            },
            /*PlayableHoldButton.OnDisable end.*/

            /*PlayableHoldButton.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PlayableHoldButton#Update", this ); }

                if (!this.holding) {
                    return;
                }
                this.clock += UnityEngine.Time.deltaTime;
                if (UnityEngine.Object.op_Implicit(this.fill)) {
                    this.fill.fillAmount = Math.max(0, Math.min(1, this.clock / this.duration));
                }
                if (this.clock >= this.duration) {
                    this.Cancel();
                    if (!Bridge.staticEquals(this.onHold, null)) {
                        this.onHold();
                    }
                }
            },
            /*PlayableHoldButton.Update end.*/


        }
    });
    /*PlayableHoldButton end.*/

    /*PlayableImageCycle start.*/
    Bridge.define("PlayableImageCycle", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            image: null,
            transitionDuration: 0,
            showDuration: 0,
            sprites: null,
            index: 0,
            clock: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableImageCycle#init", this ); }

                this.transitionDuration = 0.25;
                this.showDuration = 1;
            }
        },
        methods: {
            /*PlayableImageCycle.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "PlayableImageCycle#OnEnable", this ); }

                this.index = 0;
                this.clock = 0;
                if (UnityEngine.Object.op_Implicit(this.image) && this.sprites != null && this.sprites.length > 0) {
                    this.image.sprite = this.sprites[0];
                }
                this.SetAlpha(1);
            },
            /*PlayableImageCycle.OnEnable end.*/

            /*PlayableImageCycle.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PlayableImageCycle#Update", this ); }

                if (!UnityEngine.Object.op_Implicit(this.image) || this.sprites == null || this.sprites.length < 2) {
                    return;
                }
                this.clock += UnityEngine.Time.unscaledDeltaTime;
                var t = this.clock - this.showDuration;
                if (t < 0) {
                    this.SetAlpha(1);
                    return;
                }
                if (t < this.transitionDuration) {
                    this.SetAlpha(1 - t / this.transitionDuration);
                    return;
                }
                if (t < this.transitionDuration * 2) {
                    var next = (((this.index + 1) | 0)) % this.sprites.length;
                    if (!Bridge.referenceEquals(this.image.sprite, this.sprites[next])) {
                        this.image.sprite = this.sprites[next];
                    }
                    this.SetAlpha((t - this.transitionDuration) / this.transitionDuration);
                    return;
                }
                this.index = (((this.index + 1) | 0)) % this.sprites.length;
                this.clock = 0;
                this.SetAlpha(1);
            },
            /*PlayableImageCycle.Update end.*/

            /*PlayableImageCycle.SetAlpha start.*/
            SetAlpha: function (a) {
if ( TRACE ) { TRACE( "PlayableImageCycle#SetAlpha", this ); }

                var c = this.image.color.$clone();
                c.a = Math.max(0, Math.min(1, a));
                this.image.color = c.$clone();
            },
            /*PlayableImageCycle.SetAlpha end.*/


        }
    });
    /*PlayableImageCycle end.*/

    /*PlayableJoystick start.*/
    Bridge.define("PlayableJoystick", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            knob: null,
            Value: null,
            pointerId: 0
        },
        props: {
            Radius: {
                get: function () {
if ( TRACE ) { TRACE( "PlayableJoystick#Radius#get", this ); }

                    var ring = Bridge.cast(this.transform, UnityEngine.RectTransform).rect.$clone();
                    return UnityEngine.Mathf.Min(ring.width, ring.height) * 0.5;
                }
            }
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableJoystick#init", this ); }

                this.Value = new UnityEngine.Vector2();
                this.pointerId = -2147483648;
            }
        },
        methods: {
            /*PlayableJoystick.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "PlayableJoystick#OnPointerDown", this ); }

                if (this.pointerId !== -2147483648) {
                    return;
                }
                this.pointerId = e.pointerId;
                this.OnDrag(e);
            },
            /*PlayableJoystick.OnPointerDown end.*/

            /*PlayableJoystick.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "PlayableJoystick#OnDrag", this ); }

                if (e.pointerId !== this.pointerId) {
                    return;
                }
                var area = Bridge.cast(this.transform, UnityEngine.RectTransform);
                var point = { v : new UnityEngine.Vector2() };
                if (UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(area, e.position, e.pressEventCamera, point)) {
                    // Measured from the ring's centre (any pivot).
                    var radius = UnityEngine.Mathf.Max(1, this.Radius);
                    this.Value = pc.Vec2.lengthClamp( (point.v.$clone().sub( area.rect.center )).scale( 1.0 / ( radius ) ), 1 );
                    this.knob.anchoredPosition = this.Value.$clone().scale( radius );
                }
            },
            /*PlayableJoystick.OnDrag end.*/

            /*PlayableJoystick.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "PlayableJoystick#OnPointerUp", this ); }

                if (e.pointerId === this.pointerId) {
                    this.ResetInput();
                }
            },
            /*PlayableJoystick.OnPointerUp end.*/

            /*PlayableJoystick.ResetInput start.*/
            ResetInput: function () {
if ( TRACE ) { TRACE( "PlayableJoystick#ResetInput", this ); }

                this.pointerId = -2147483648;
                this.Value = pc.Vec2.ZERO.clone();
                if (UnityEngine.Object.op_Implicit(this.knob)) {
                    this.knob.anchoredPosition = pc.Vec2.ZERO.clone();
                }
            },
            /*PlayableJoystick.ResetInput end.*/

            /*PlayableJoystick.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "PlayableJoystick#OnDisable", this ); }

                this.ResetInput();
            },
            /*PlayableJoystick.OnDisable end.*/


        }
    });
    /*PlayableJoystick end.*/

    /*PlayableRagdoll start.*/
    Bridge.define("PlayableRagdoll", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            player: null,
            animator: null,
            hips: null,
            bodies: null,
            bodyColliders: null,
            bones: null,
            positions: null,
            rotations: null,
            modelPosition: null,
            modelRotation: null,
            active: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableRagdoll#init", this ); }

                this.modelPosition = new UnityEngine.Vector3();
                this.modelRotation = new UnityEngine.Quaternion();
            }
        },
        methods: {
            /*PlayableRagdoll.Begin start.*/
            Begin: function (force) {
if ( TRACE ) { TRACE( "PlayableRagdoll#Begin", this ); }

                var $t, $t1;
                if (this.active || !UnityEngine.Object.op_Implicit(this.hips)) {
                    return;
                }
                this.bones = this.animator.GetComponentsInChildren$1(UnityEngine.Transform, true);
                this.positions = System.Array.init(this.bones.length, function (){
                    return new UnityEngine.Vector3();
                }, UnityEngine.Vector3);
                this.rotations = System.Array.init(this.bones.length, function (){
                    return new UnityEngine.Quaternion();
                }, UnityEngine.Quaternion);
                for (var i = 0; i < this.bones.length; i = (i + 1) | 0) {
                    this.positions[i] = this.bones[i].localPosition.$clone();
                    this.rotations[i] = this.bones[i].localRotation.$clone();
                }
                this.modelPosition = this.animator.transform.localPosition.$clone();
                this.modelRotation = this.animator.transform.localRotation.$clone();
                this.animator.enabled = false;
                this.animator.transform.SetParent(null, true);
                $t = Bridge.getEnumerator(this.bodyColliders);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        c.enabled = true;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                for (var i1 = 0; i1 < this.bodyColliders.length; i1 = (i1 + 1) | 0) {
                    for (var j = (i1 + 1) | 0; j < this.bodyColliders.length; j = (j + 1) | 0) {
                        UnityEngine.Physics.IgnoreCollision(this.bodyColliders[i1], this.bodyColliders[j], true);
                    }
                }
                $t1 = Bridge.getEnumerator(this.bodies);
                try {
                    while ($t1.moveNext()) {
                        var body = $t1.Current;
                        body.isKinematic = false;
                        body.useGravity = true;
                        body.linearDamping = 0.05;
                        body.angularDamping = 0.05;
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                this.hips.AddForce$1(force, UnityEngine.ForceMode.Impulse);
                this.active = true;
            },
            /*PlayableRagdoll.Begin end.*/

            /*PlayableRagdoll.Follow start.*/
            Follow: function () {
if ( TRACE ) { TRACE( "PlayableRagdoll#Follow", this ); }

                if (!this.active) {
                    return;
                }
                // The mesh is detached, so moving the character root cannot drag the ragdoll bones.
                this.player.position = new pc.Vec3( this.hips.position.x, this.player.position.y, this.hips.position.z );
            },
            /*PlayableRagdoll.Follow end.*/

            /*PlayableRagdoll.Recover start.*/
            Recover: function () {
if ( TRACE ) { TRACE( "PlayableRagdoll#Recover", this ); }

                var $t, $t1;
                if (!this.active) {
                    return;
                }
                var ground = this.hips.position.$clone();
                $t = Bridge.getEnumerator(this.bodies);
                try {
                    while ($t.moveNext()) {
                        var body = $t.Current;
                        body.linearVelocity = pc.Vec3.ZERO.clone();
                        body.angularVelocity = pc.Vec3.ZERO.clone();
                        body.isKinematic = true;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                $t1 = Bridge.getEnumerator(this.bodyColliders);
                try {
                    while ($t1.moveNext()) {
                        var c = $t1.Current;
                        c.enabled = false;
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                var hit = { v : new UnityEngine.RaycastHit() };
                if (UnityEngine.Physics.Raycast$3(ground.$clone().add( pc.Vec3.UP.clone().clone().scale( 2 ) ), pc.Vec3.DOWN.clone(), hit, 20)) {
                    ground.y = hit.v.point.y;
                } else {
                    ground.y = this.player.position.y;
                }
                this.player.position = ground.$clone();
                this.animator.transform.SetParent(this.player, false);
                this.animator.transform.localPosition = this.modelPosition.$clone();
                this.animator.transform.localRotation = this.modelRotation.$clone();
                for (var i = 1; i < this.bones.length; i = (i + 1) | 0) {
                    this.bones[i].localPosition = this.positions[i].$clone();
                    this.bones[i].localRotation = this.rotations[i].$clone();
                }
                this.animator.enabled = true;
                this.active = false;
            },
            /*PlayableRagdoll.Recover end.*/

            /*PlayableRagdoll.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "PlayableRagdoll#OnDestroy", this ); }

                if (this.active && UnityEngine.Object.op_Implicit(this.animator)) {
                    UnityEngine.MonoBehaviour.Destroy(this.animator.gameObject);
                }
            },
            /*PlayableRagdoll.OnDestroy end.*/


        }
    });
    /*PlayableRagdoll end.*/

    /*PlayableSpatialAudio start.*/
    Bridge.define("PlayableSpatialAudio", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            listener: null,
            source: null,
            volume: 0,
            minDistance: 0,
            maxDistance: 0,
            linear: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableSpatialAudio#init", this ); }

                this.volume = 1;
                this.minDistance = 1;
                this.maxDistance = 50;
                this.linear = true;
            }
        },
        methods: {
            /*PlayableSpatialAudio.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PlayableSpatialAudio#Awake", this ); }

                if (!UnityEngine.Object.op_Implicit(this.source)) {
                    this.source = this.GetComponent(UnityEngine.AudioSource);
                }
                // The Editor plays it 2D too, so it sounds the same as the Luna build (where spatialBlend is an unsupported stub).
                if (UnityEngine.Application.isEditor) {
                    this.source.spatialBlend = 0;
                }
                this.Apply();
            },
            /*PlayableSpatialAudio.Awake end.*/

            /*PlayableSpatialAudio.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "PlayableSpatialAudio#LateUpdate", this ); }

                this.Apply();
            },
            /*PlayableSpatialAudio.LateUpdate end.*/

            /*PlayableSpatialAudio.Apply start.*/
            Apply: function () {
if ( TRACE ) { TRACE( "PlayableSpatialAudio#Apply", this ); }

                if (!UnityEngine.Object.op_Implicit(this.source) || !UnityEngine.Object.op_Implicit(this.listener)) {
                    return;
                }
                var d = pc.Vec3.distance( this.listener.position, this.transform.position );
                var gain;
                if (this.linear) {
                    gain = 1 - Math.max(0, Math.min(1, (d - this.minDistance) / UnityEngine.Mathf.Max(0.01, this.maxDistance - this.minDistance)));
                } else {
                    gain = d <= this.minDistance ? 1 : d >= this.maxDistance ? 0 : this.minDistance / d;
                }
                this.source.volume = this.volume * gain;
            },
            /*PlayableSpatialAudio.Apply end.*/


        }
    });
    /*PlayableSpatialAudio end.*/

    /*PlayableUIPulse start.*/
    Bridge.define("PlayableUIPulse", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            scale: 0,
            duration: 0,
            baseScale: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableUIPulse#init", this ); }

                this.baseScale = new UnityEngine.Vector3();
                this.scale = 1.1;
                this.duration = 0.6;
            }
        },
        methods: {
            /*PlayableUIPulse.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PlayableUIPulse#Awake", this ); }

                this.baseScale = this.transform.localScale.$clone();
            },
            /*PlayableUIPulse.Awake end.*/

            /*PlayableUIPulse.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PlayableUIPulse#Update", this ); }

                var t = UnityEngine.Mathf.PingPong(UnityEngine.Time.unscaledTime / this.duration, 1);
                var eased = 1 - (1 - t) * (1 - t); // OutQuad
                this.transform.localScale = this.baseScale.$clone().clone().scale( pc.math.lerp(1, this.scale, eased) );
            },
            /*PlayableUIPulse.Update end.*/


        }
    });
    /*PlayableUIPulse end.*/

    /*PlayableUISparkle start.*/
    Bridge.define("PlayableUISparkle", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            stars: null,
            rays: null,
            color: null,
            radius: 0,
            minSize: 0,
            maxSize: 0,
            minLife: 0,
            maxLife: 0,
            spin: 0,
            rayLife: 0,
            raySize: 0,
            age: null,
            life: null,
            size: null,
            turn: null,
            rayAge: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableUISparkle#init", this ); }

                this.color = new UnityEngine.Color();
                this.color = new pc.Color( 1, 0.93, 0.1, 1 );
                this.radius = 60;
                this.minSize = 20;
                this.maxSize = 50;
                this.minLife = 0.25;
                this.maxLife = 0.5;
                this.spin = 180;
                this.rayLife = 2.5;
                this.raySize = 260;
            }
        },
        methods: {
            /*PlayableUISparkle.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "PlayableUISparkle#OnEnable", this ); }

                var $t, $t1;
                var n = this.stars != null ? this.stars.length : 0;
                $t = Bridge.getEnumerator(this.stars || System.Array.init(0, null, UnityEngine.UI.Image));
                try {
                    while ($t.moveNext()) {
                        var star = $t.Current;
                        if (UnityEngine.Object.op_Implicit(star)) {
                            star.rectTransform.sizeDelta = new pc.Vec2( this.maxSize, this.maxSize );
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                $t1 = Bridge.getEnumerator(this.rays || System.Array.init(0, null, UnityEngine.UI.Image));
                try {
                    while ($t1.moveNext()) {
                        var ray = $t1.Current;
                        if (UnityEngine.Object.op_Implicit(ray)) {
                            ray.rectTransform.sizeDelta = new pc.Vec2( this.raySize, this.raySize );
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                this.age = System.Array.init(n, 0, System.Single);
                this.life = System.Array.init(n, 0, System.Single);
                this.size = System.Array.init(n, 0, System.Single);
                this.turn = System.Array.init(n, 0, System.Single);
                // Spread the first births so the stars do not all pop together.
                for (var i = 0; i < n; i = (i + 1) | 0) {
                    this.Respawn(i);
                    this.age[i] = -UnityEngine.Random.Range$1(0, this.maxLife);
                }
                var r = this.rays != null ? this.rays.length : 0;
                this.rayAge = System.Array.init(r, 0, System.Single);
                for (var i1 = 0; i1 < r; i1 = (i1 + 1) | 0) {
                    this.rayAge[i1] = this.rayLife * i1 / UnityEngine.Mathf.Max(1, r);
                    this.RespawnRay(i1);
                }
            },
            /*PlayableUISparkle.OnEnable end.*/

            /*PlayableUISparkle.Respawn start.*/
            Respawn: function (i) {
if ( TRACE ) { TRACE( "PlayableUISparkle#Respawn", this ); }

                this.age[i] = 0;
                this.life[i] = UnityEngine.Random.Range$1(this.minLife, this.maxLife);
                this.size[i] = UnityEngine.Random.Range$1(this.minSize, this.maxSize);
                this.turn[i] = UnityEngine.Random.Range$1(-this.spin, this.spin);
                var t = this.stars[i].rectTransform;
                t.anchoredPosition = UnityEngine.Random.insideUnitCircle.$clone().scale( this.radius );
                t.localRotation = new pc.Quat().setFromEulerAngles_Unity( 0, 0, UnityEngine.Random.Range$1(0, 360.0) );
            },
            /*PlayableUISparkle.Respawn end.*/

            /*PlayableUISparkle.RespawnRay start.*/
            RespawnRay: function (i) {
if ( TRACE ) { TRACE( "PlayableUISparkle#RespawnRay", this ); }

                this.rays[i].rectTransform.localRotation = new pc.Quat().setFromEulerAngles_Unity( 0, 0, UnityEngine.Random.Range$1(0, 360.0) );
            },
            /*PlayableUISparkle.RespawnRay end.*/

            /*PlayableUISparkle.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PlayableUISparkle#Update", this ); }

                var dt = UnityEngine.Time.unscaledDeltaTime;
                for (var i = 0; i < this.age.length; i = (i + 1) | 0) {
                    var star = this.stars[i];
                    if (!UnityEngine.Object.op_Implicit(star)) {
                        continue;
                    }
                    this.age[i] += dt;
                    if (this.age[i] < 0) {
                        this.Set(star, 0, 0);
                        continue;
                    }
                    if (this.age[i] >= this.life[i]) {
                        this.Respawn(i);
                    }
                    var k = this.age[i] / this.life[i];
                    // Size over lifetime: up to full size at the middle of its life, back to nothing at the end.
                    this.Set(star, this.size[i] / this.maxSize * Math.sin(k * UnityEngine.Mathf.PI), 1);
                    star.rectTransform.localRotation = star.rectTransform.localRotation.$clone().clone().mul( new pc.Quat().setFromEulerAngles_Unity( 0, 0, this.turn[i] * dt ) );
                }
                for (var i1 = 0; i1 < this.rayAge.length; i1 = (i1 + 1) | 0) {
                    var ray = this.rays[i1];
                    if (!UnityEngine.Object.op_Implicit(ray)) {
                        continue;
                    }
                    this.rayAge[i1] += dt;
                    if (this.rayAge[i1] >= this.rayLife) {
                        this.rayAge[i1] -= this.rayLife;
                        this.RespawnRay(i1);
                    }
                    var k1 = this.rayAge[i1] / this.rayLife;
                    this.Set(ray, 0.8 + 0.2 * k1, Math.sin(k1 * UnityEngine.Mathf.PI) * 0.8);
                }
            },
            /*PlayableUISparkle.Update end.*/

            /*PlayableUISparkle.Set start.*/
            Set: function (image, scale, alpha) {
if ( TRACE ) { TRACE( "PlayableUISparkle#Set", this ); }

                image.rectTransform.localScale = new pc.Vec3( scale, scale, 1 );
                var c = this.color.$clone();
                c.a *= alpha;
                image.color = c.$clone();
            },
            /*PlayableUISparkle.Set end.*/


        }
    });
    /*PlayableUISparkle end.*/

    /*QuickSlotView start.*/
    Bridge.define("QuickSlotView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            button: null,
            thumbnail: null,
            highlight: null,
            content: null
        }
    });
    /*QuickSlotView end.*/

    /*StealEggGame start.*/
    Bridge.define("StealEggGame", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                AnimSet: null,
                AnimMotion: null,
                SetPlain: 0,
                SetCarry: 0,
                SetHold: 0,
                SetFight: 0,
                MotionIdle: 0,
                MotionWalk: 0,
                MotionRun: 0,
                MotionJump: 0,
                MotionFall: 0,
                FightDuration: 0,
                QuickSlotName: null,
                NpcRest: 0,
                NpcWander: 0,
                NpcGoTrain: 0,
                NpcTrain: 0,
                NpcGoEgg: 0,
                NpcTakeEgg: 0,
                NpcGoHome: 0,
                SkinnedHairName: null,
                LockedContent: null,
                LockedZone: null,
                PlayNowButton: null,
                TapHintName: null,
                RarityNames: null,
                rarityColors: null
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "StealEggGame#init", this ); }

                    this.AnimSet = "Set";
                    this.AnimMotion = "Motion";
                    this.SetPlain = 0;
                    this.SetCarry = 1;
                    this.SetHold = 2;
                    this.SetFight = 3;
                    this.MotionIdle = 0;
                    this.MotionWalk = 1;
                    this.MotionRun = 2;
                    this.MotionJump = 3;
                    this.MotionFall = 4;
                    this.FightDuration = 1.22;
                    this.QuickSlotName = "Quick Slot ";
                    this.NpcRest = 0;
                    this.NpcWander = 1;
                    this.NpcGoTrain = 2;
                    this.NpcTrain = 3;
                    this.NpcGoEgg = 4;
                    this.NpcTakeEgg = 5;
                    this.NpcGoHome = 6;
                    this.SkinnedHairName = "Hair (skinned)";
                    this.LockedContent = "[Locked] Full Game";
                    this.LockedZone = "[Locked] Zone";
                    this.PlayNowButton = "[Button] Play Now";
                    this.TapHintName = "Tap hint";
                    this.RarityNames = System.Array.init([
                        "Common", 
                        "Uncommon", 
                        "Rare", 
                        "Epic", 
                        "Legendary", 
                        "Mythic", 
                        "Cosmic", 
                        "Secret", 
                        "Eternal", 
                        "Divine", 
                        "Hacked", 
                        "OG", 
                        "Celestial"
                    ], System.String);
                    this.rarityColors = System.Array.init([
                        new pc.Color( 0.8, 0.8, 0.8, 1 ), 
                        new pc.Color( 0.3, 0.9, 0.3, 1 ), 
                        new pc.Color( 0.2, 0.6, 1, 1 ), 
                        new pc.Color( 0.7, 0.3, 1, 1 ), 
                        new pc.Color( 1, 0.7, 0.1, 1 ), 
                        new pc.Color( 1, 0.25, 0.25, 1 ), 
                        new pc.Color( 1, 0.4, 0.9, 1 ), 
                        new pc.Color( 0.15, 0.15, 0.15, 1 ), 
                        new pc.Color( 0.3, 1, 1, 1 ), 
                        new pc.Color( 1, 1, 0.4, 1 ), 
                        new pc.Color( 0.4, 1, 0.2, 1 ), 
                        new pc.Color( 0.7, 0.45, 0.2, 1 ), 
                        new pc.Color( 0.6, 0.85, 1, 1 )
                    ], UnityEngine.Color);
                }
            },
            methods: {
                /*StealEggGame.MotionFor:static start.*/
                MotionFor: function (forward, grounded, vertical) {
if ( TRACE ) { TRACE( "StealEggGame#MotionFor", this ); }

                    if (!grounded) {
                        return vertical > -4 ? StealEggGame.MotionJump : StealEggGame.MotionFall;
                    }
                    return forward > 0.75 ? StealEggGame.MotionRun : forward > 0.15 ? StealEggGame.MotionWalk : StealEggGame.MotionIdle;
                },
                /*StealEggGame.MotionFor:static end.*/

                /*StealEggGame.SetAnimatorState:static start.*/
                SetAnimatorState: function (a, set, motion) {
if ( TRACE ) { TRACE( "StealEggGame#SetAnimatorState", this ); }

                    if (!UnityEngine.Object.op_Implicit(a) || !a.isActiveAndEnabled || !UnityEngine.Object.op_Implicit(a.runtimeAnimatorController)) {
                        return;
                    }
                    // By name: in Luna the hash overload missed the parameters (they are keyed by name there, and a static
                    // StringToHash field came out undefined), which left the player stuck in Idle.
                    a.SetInteger$1(StealEggGame.AnimSet, set);
                    a.SetInteger$1(StealEggGame.AnimMotion, motion);
                },
                /*StealEggGame.SetAnimatorState:static end.*/

                /*StealEggGame.SetLoop:static start.*/
                SetLoop: function (source, on) {
if ( TRACE ) { TRACE( "StealEggGame#SetLoop", this ); }

                    if (!UnityEngine.Object.op_Implicit(source)) {
                        return;
                    }
                    if (on && !source.isPlaying) {
                        source.Play();
                    } else {
                        if (!on && source.isPlaying) {
                            source.Stop();
                        }
                    }
                },
                /*StealEggGame.SetLoop:static end.*/

                /*StealEggGame.ReturnToNest:static start.*/
                ReturnToNest: function (egg) {
if ( TRACE ) { TRACE( "StealEggGame#ReturnToNest", this ); }

                    egg.hidden = false;
                    egg.onGround = false;
                    egg.transform.SetParent(null);
                    egg.transform.position = egg.origin.$clone();
                    egg.transform.rotation = egg.rotation.$clone();
                    egg.transform.localScale = egg.scale.$clone();
                    egg.transform.gameObject.SetActive(true);
                },
                /*StealEggGame.ReturnToNest:static end.*/

                /*StealEggGame.FlatDistance:static start.*/
                FlatDistance: function (a, b) {
if ( TRACE ) { TRACE( "StealEggGame#FlatDistance", this ); }

                    a.y = 0;
                    b.y = 0;
                    return pc.Vec3.distance( a, b );
                },
                /*StealEggGame.FlatDistance:static end.*/

                /*StealEggGame.Num:static start.*/
                Num: function (value) {
if ( TRACE ) { TRACE( "StealEggGame#Num", this ); }

                    var suffix = System.Array.init([
                        "", 
                        "K", 
                        "M", 
                        "B", 
                        "T", 
                        "Qa", 
                        "Qi", 
                        "Sx"
                    ], System.String);
                    var i = 0;
                    while (Math.abs(value) >= 1000 && i < ((suffix.length - 1) | 0)) {
                        value /= 1000;
                        i = (i + 1) | 0;
                    }
                    return (System.Double.format(Bridge.Math.round(value, 1, 6), "0.#") || "") + (suffix[i] || "");
                },
                /*StealEggGame.Num:static end.*/

                /*StealEggGame.Clock:static start.*/
                Clock: function (seconds) {
if ( TRACE ) { TRACE( "StealEggGame#Clock", this ); }

                    var s = UnityEngine.Mathf.Max(0, Math.ceil(seconds)), h = (Bridge.Int.div(s, 3600)) | 0, m = (Bridge.Int.div(s % 3600, 60)) | 0;
                    s = s % 60;
                    if (h > 0) {
                        return h + "h:" + m + "m";
                    }
                    if (m > 0) {
                        return m + "m:" + s + "s";
                    }
                    return s + "s";
                },
                /*StealEggGame.Clock:static end.*/

                /*StealEggGame.DisablePhysics:static start.*/
                DisablePhysics: function (obj) {
if ( TRACE ) { TRACE( "StealEggGame#DisablePhysics", this ); }

                    var $t, $t1, $t2, $t3;
                    $t = Bridge.getEnumerator(obj.GetComponentsInChildren(UnityEngine.Collider, true));
                    try {
                        while ($t.moveNext()) {
                            var c = $t.Current;
                            c.enabled = false;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    $t1 = Bridge.getEnumerator(obj.GetComponentsInChildren(UnityEngine.Rigidbody, true));
                    try {
                        while ($t1.moveNext()) {
                            var body = $t1.Current;
                            body.isKinematic = true;
                            body.useGravity = false;
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                    $t2 = Bridge.getEnumerator(obj.GetComponentsInChildren(UnityEngine.Transform, true));
                    try {
                        while ($t2.moveNext()) {
                            var t = $t2.Current;
                            if (System.String.contains(t.name.toLowerCase(),"highlight")) {
                                t.gameObject.SetActive(false);
                            }
                        }
                    } finally {
                        if (Bridge.is($t2, System.IDisposable)) {
                            $t2.System$IDisposable$Dispose();
                        }
                    }
                    $t3 = Bridge.getEnumerator(obj.GetComponentsInChildren(TMPro.TMP_Text, true));
                    try {
                        while ($t3.moveNext()) {
                            var label = $t3.Current;
                            label.gameObject.SetActive(false);
                        }
                    } finally {
                        if (Bridge.is($t3, System.IDisposable)) {
                            $t3.System$IDisposable$Dispose();
                        }
                    }
                },
                /*StealEggGame.DisablePhysics:static end.*/

                /*StealEggGame.SetVisualSize:static start.*/
                SetVisualSize: function (obj, height) {
if ( TRACE ) { TRACE( "StealEggGame#SetVisualSize", this ); }

                    var $t;
                    var found = false;
                    var bounds = new pc.BoundingBox.ctor();
                    $t = Bridge.getEnumerator(obj.GetComponentsInChildren(UnityEngine.Renderer));
                    try {
                        while ($t.moveNext()) {
                            var r = $t.Current;
                            if (!(Bridge.is(r, UnityEngine.ParticleSystemRenderer)) && !(Bridge.is(r, UnityEngine.LineRenderer))) {
                                if (!found) {
                                    bounds = new pc.BoundingBox( r.bounds.center.$clone(), r.bounds.halfExtents.$clone().scale( 2 ).$clone().scale( 0.5 ) );
                                    found = true;
                                } else {
                                    bounds.add( r.bounds );
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    if (found && bounds.halfExtents.$clone().scale( 2 ).y > 0.01) {
                        obj.transform.localScale = obj.transform.localScale.$clone().clone().scale( height / bounds.halfExtents.$clone().scale( 2 ).y );
                    }
                },
                /*StealEggGame.SetVisualSize:static end.*/

                /*StealEggGame.SetAnimatorMovement:static start.*/
                SetAnimatorMovement: function (a, value) {
if ( TRACE ) { TRACE( "StealEggGame#SetAnimatorMovement", this ); }

                    if (UnityEngine.Object.op_Implicit(a) && a.isActiveAndEnabled && UnityEngine.Object.op_Implicit(a.runtimeAnimatorController)) {
                        a.SetFloat$1("Forward", value);
                    }
                },
                /*StealEggGame.SetAnimatorMovement:static end.*/

                /*StealEggGame.TopOf:static start.*/
                TopOf: function (t) {
if ( TRACE ) { TRACE( "StealEggGame#TopOf", this ); }

                    var $t;
                    var top = t.position.y;
                    $t = Bridge.getEnumerator(t.GetComponentsInChildren(UnityEngine.Renderer));
                    try {
                        while ($t.moveNext()) {
                            var r = $t.Current;
                            if (r.enabled && !(Bridge.is(r, UnityEngine.ParticleSystemRenderer)) && !(Bridge.is(r, UnityEngine.LineRenderer))) {
                                top = UnityEngine.Mathf.Max(top, r.bounds.max.y);
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return top;
                },
                /*StealEggGame.TopOf:static end.*/

                /*StealEggGame.InsideBox:static start.*/
                InsideBox: function (box, point, margin) {
if ( TRACE ) { TRACE( "StealEggGame#InsideBox", this ); }

                    if (!UnityEngine.Object.op_Implicit(box)) {
                        return false;
                    }
                    var local = box.transform.InverseTransformPoint(point).sub( box.center );
                    var half = new pc.Vec3().mul2( box.size.$clone().clone().scale( 0.5 ), new pc.Vec3( 1, 1, 1 ) );
                    return Math.abs(local.x) < half.x - margin && Math.abs(local.z) < half.z - margin && Math.abs(local.y) <= half.y + 0.2;
                },
                /*StealEggGame.InsideBox:static end.*/

                /*StealEggGame.ChildText:static start.*/
                ChildText: function (root, name) {
if ( TRACE ) { TRACE( "StealEggGame#ChildText", this ); }

                    var t = root.Find(name);
                    return UnityEngine.Object.op_Implicit(t) ? t.GetComponent(TMPro.TMP_Text) : null;
                },
                /*StealEggGame.ChildText:static end.*/

                /*StealEggGame.BonePose:static start.*/
                BonePose: function (bone, root, position, rotation) {
if ( TRACE ) { TRACE( "StealEggGame#BonePose", this ); }

                    position.v = bone.localPosition.$clone();
                    rotation.v = bone.localRotation.$clone();
                    var t = bone.parent;
                    for (; UnityEngine.Object.op_Implicit(t) && UnityEngine.Component.op_Inequality(t, root); t = t.parent) {
                        position.v = t.localPosition.$clone().add( t.localRotation.transformVector( new pc.Vec3().mul2( t.localScale, position.v ) ) );
                        rotation.v = t.localRotation.clone().mul( rotation.v );
                    }
                    if (!UnityEngine.Object.op_Implicit(t)) {
                        return;
                    }
                    position.v = root.position.$clone().add( root.rotation.transformVector( new pc.Vec3().mul2( root.lossyScale, position.v ) ) );
                    rotation.v = root.rotation.clone().mul( rotation.v );
                },
                /*StealEggGame.BonePose:static end.*/

                /*StealEggGame.HeadBone:static start.*/
                HeadBone: function (character) {
if ( TRACE ) { TRACE( "StealEggGame#HeadBone", this ); }

                    var $t;
                    var animator = character.GetComponentInChildren(UnityEngine.Animator, true);
                    var head = UnityEngine.Object.op_Implicit(animator) && animator.isHuman ? animator.GetBoneTransform(UnityEngine.HumanBodyBones.Head) : null;
                    if (UnityEngine.Object.op_Implicit(head)) {
                        return head;
                    }
                    $t = Bridge.getEnumerator(character.GetComponentsInChildren$1(UnityEngine.Transform, true));
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            if (Bridge.referenceEquals(t.name, "mixamorig:Head")) {
                                return t;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return null;
                },
                /*StealEggGame.HeadBone:static end.*/

                /*StealEggGame.Slot:static start.*/
                Slot: function (character) {
if ( TRACE ) { TRACE( "StealEggGame#Slot", this ); }

                    var $t;
                    if (!UnityEngine.Object.op_Implicit(character)) {
                        return null;
                    }
                    $t = Bridge.getEnumerator(character.GetComponentsInChildren$1(UnityEngine.Transform, true));
                    try {
                        while ($t.moveNext()) {
                            var t = $t.Current;
                            if (Bridge.referenceEquals(t.name, "HairSlot")) {
                                return t;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return null;
                },
                /*StealEggGame.Slot:static end.*/

                /*StealEggGame.RandomOf:static start.*/
                RandomOf: function (T, items) {
if ( TRACE ) { TRACE( "StealEggGame#RandomOf", this ); }

                    return items != null && items.length > 0 ? Bridge.rValue(items[UnityEngine.Random.Range(0, items.length)]) : null;
                },
                /*StealEggGame.RandomOf:static end.*/

                /*StealEggGame.WearMaterial:static start.*/
                WearMaterial: function (character, material, parts) {
if ( TRACE ) { TRACE( "StealEggGame#WearMaterial", this ); }

                    var $t;
                    if (parts === void 0) { parts = []; }
                    if (!UnityEngine.Object.op_Implicit(material)) {
                        return;
                    }
                    $t = Bridge.getEnumerator(character.GetComponentsInChildren$1(UnityEngine.SkinnedMeshRenderer, true));
                    try {
                        while ($t.moveNext()) {
                            var renderer = $t.Current;
                            if (System.Array.indexOfT(parts, renderer.name) < 0) {
                                continue;
                            }
                            var materials = System.Array.init(renderer.sharedMaterials.length, null, UnityEngine.Material);
                            for (var i = 0; i < materials.length; i = (i + 1) | 0) {
                                materials[i] = material;
                            }
                            renderer.sharedMaterials = materials;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                },
                /*StealEggGame.WearMaterial:static end.*/

                /*StealEggGame.SetText:static start.*/
                SetText: function (label, value) {
if ( TRACE ) { TRACE( "StealEggGame#SetText", this ); }

                    if (UnityEngine.Object.op_Implicit(label) && !Bridge.referenceEquals(label.text, value)) {
                        label.text = value;
                    }
                },
                /*StealEggGame.SetText:static end.*/

                /*StealEggGame.SetImage:static start.*/
                SetImage: function (image, sprite) {
if ( TRACE ) { TRACE( "StealEggGame#SetImage", this ); }

                    if (UnityEngine.Object.op_Implicit(image) && UnityEngine.Object.op_Implicit(sprite)) {
                        image.sprite = sprite;
                    }
                },
                /*StealEggGame.SetImage:static end.*/

                /*StealEggGame.Show$1:static start.*/
                Show$1: function (obj, visible) {
if ( TRACE ) { TRACE( "StealEggGame#Show$1", this ); }

                    if (UnityEngine.Object.op_Implicit(obj) && obj.activeSelf !== visible) {
                        obj.SetActive(visible);
                    }
                },
                /*StealEggGame.Show$1:static end.*/

                /*StealEggGame.Show:static start.*/
                Show: function (c, visible) {
if ( TRACE ) { TRACE( "StealEggGame#Show", this ); }

                    if (UnityEngine.Object.op_Implicit(c)) {
                        StealEggGame.Show$1(c.gameObject, visible);
                    }
                },
                /*StealEggGame.Show:static end.*/

                /*StealEggGame.ShowMark:static start.*/
                ShowMark: function (mark, visible) {
if ( TRACE ) { TRACE( "StealEggGame#ShowMark", this ); }

                    if (!UnityEngine.Object.op_Implicit(mark)) {
                        return;
                    }
                    StealEggGame.Show$1(mark.gameObject, visible);
                    if (mark.enabled !== visible) {
                        mark.enabled = visible;
                    }
                },
                /*StealEggGame.ShowMark:static end.*/


            }
        },
        fields: {
            playerForward: 0,
            fightMotion: 0,
            attackReadyAt: 0,
            attackHitAt: 0,
            attackHitEnd: 0,
            swingStart: 0,
            fightStart: 0,
            zones: null,
            player: null,
            home: null,
            safePoint: null,
            rightHandSlot: null,
            playerCoopArea: null,
            trainingPoint: null,
            gameCamera: null,
            playerAnimator: null,
            ragdoll: null,
            uiFont: null,
            guideMaterial: null,
            roundedSprite: null,
            circleSprite: null,
            moneyIcon: null,
            speedIcon: null,
            stealSound: null,
            deliverSound: null,
            hatchSound: null,
            caughtSound: null,
            eggBreakEffect: null,
            sourceHud: null,
            capturesForEndCard: 0,
            moveSpeed: 0,
            incubationSeconds: 0,
            jumpHeight: 0,
            gravity: 0,
            baseMoveSpeed: 0,
            speedPowerMultiplier: 0,
            trainingPowerPerTick: 0,
            startingMoney: 0,
            slowMode: false,
            Money: 0,
            SpeedPower: 0,
            Step: 0,
            eggs: null,
            playerActor: null,
            nearby: null,
            hitWindup: 0,
            knockdownDuration: 0,
            getUpDuration: 0,
            hitZone: null,
            hitByBat: false,
            hitClock: 0,
            hitApplied: false,
            hitDirection: null,
            modelPosition: null,
            modelRotation: null,
            attackerRotation: null,
            motor: null,
            carryPoint: null,
            carryHand: null,
            spawn: null,
            spawnRotation: null,
            verticalSpeed: 0,
            catchCooldown: 0,
            firstInput: false,
            training: false,
            endCardShown: false,
            trainingClock: 0,
            guide: null,
            jumpButton: null,
            safeUI: null,
            hintHand: null,
            cameraHint: null,
            jumpHint: null,
            tutorialText: null,
            cameraTurned: false,
            jumped: false,
            stoleEgg: false,
            joystick: null,
            sound: null,
            triggerBounds: null,
            stepLeft: 0,
            walked: 0,
            petCatalog: null,
            trails: null,
            luckyEggRewards: null,
            playerHair: null,
            outfitHairs: null,
            outfitFaces: null,
            outfitShirts: null,
            outfitPants: null,
            rarityMaterials: null,
            rarityWorldMaterials: null,
            rarityFont: null,
            rarityFrames: null,
            batIcon: null,
            nightIcon: null,
            dayIcon: null,
            trainBoostIcon: null,
            incubateBoostIcon: null,
            batPrefab: null,
            luckyEggPrefab: null,
            incubateTimerPrefab: null,
            floatingTextPrefab: null,
            npcTemplate: null,
            footstepSound: null,
            clickSound: null,
            closeSound: null,
            rewardSound: null,
            upgradeSound: null,
            trainSound: null,
            equipSound: null,
            fuseSound: null,
            frogSound: null,
            progressSound: null,
            warningSound: null,
            crackSound: null,
            popupSound: null,
            coopPrices: null,
            coopModelByLevel: null,
            coopBaseSlots: 0,
            treadmillPrices: null,
            treadmillTrainValues: null,
            priceMultiplier: 0,
            dayDuration: 0,
            nightDuration: 0,
            nightIncubateMultiplier: 0,
            dayLightIntensity: 0,
            lightTransition: 0,
            incomeMultiplierBySize: 0,
            sellPriceMultiplier: 0,
            luckyFrogFeedMultiplier: 0,
            trainTick: 0,
            hatchDuration: 0,
            luckyEggOpenDuration: 0,
            fuseDuration: 0,
            npcCount: 0,
            npcCoopSmallPets: 0,
            npcCoopBigPetSize: 0,
            npcMinSpeed: 0,
            npcMaxSpeed: 0,
            batCooldown: 0,
            batForce: 0,
            houses: null,
            fuseMachine: null,
            exchangeShop: null,
            luckyFrog: null,
            luckyEggSpawn: null,
            luckyEggTarget: null,
            teleportPoint: null,
            lobbyCenter: null,
            originalUI: null,
            lobbySize: null,
            combatArea: null,
            nightGraphic: null,
            nightText: null,
            sun: null,
            npcModels: null,
            coopPets: null,
            decorPets: null,
            incubators: null,
            flying: null,
            coopLevel: 0,
            treadmillLevel: 0,
            petRows: null,
            incubateRows: null,
            petInfos: null,
            items: null,
            quick: null,
            hand: null,
            bagSelection: null,
            handVisual: null,
            bagCells: null,
            npcs: null,
            boneFollowers: null,
            modal: null,
            actionTarget: null,
            functionsHome: null,
            actions: null,
            currentAction: null,
            speedPulse: 0,
            rewardRows: null,
            zoneGraphics: null,
            zoneAlphas: null,
            dialogUntil: 0,
            zoneClock: 0,
            zoneInside: 0,
            popups: null,
            insideStation: null,
            hudUI: null,
            petsUI: null,
            incubateUI: null,
            inventoryUI: null,
            rewardUI: null,
            dialogUI: null,
            warningPanel: null,
            treadmillUI: null,
            indexUI: null,
            settingsUI: null,
            coopUI: null,
            fuseUI: null,
            frogUI: null,
            shopUI: null,
            trailUI: null,
            night: false,
            phaseClock: 0,
            boosts: null,
            luckyEggs: null,
            frogPunch: 0,
            eggSpawnAt: 0,
            frogScale: null,
            indexRows: null,
            collected: null,
            claimed: null,
            indexSelection: 0,
            indexRewardRows: null
        },
        props: {
            FightActive: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#FightActive#get", this ); }

                    if (this.fightStart >= 0 && UnityEngine.Time.time - this.fightStart >= StealEggGame.FightDuration) {
                        this.fightStart = -1;
                    }
                    return this.fightStart >= 0;
                }
            },
            TutorialCompleted: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#TutorialCompleted#get", this ); }

                    return this.Step === StealEggGame.TutorialStep.Done;
                }
            },
            IsCarrying: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#IsCarrying#get", this ); }

                    return this.carried != null;
                }
            },
            EndCardVisible: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#EndCardVisible#get", this ); }

                    return UnityEngine.Object.op_Implicit(LunaController.Instance) && (LunaController.Instance.EndCardVisible || LunaController.Instance.IAPVisible);
                }
            },
            carried: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#carried#get", this ); }

                    return this.playerActor.carried;
                },
                set: function (value) {
if ( TRACE ) { TRACE( "StealEggGame#carried#set", this ); }

                    this.playerActor.carried = value;
                }
            },
            IsKnockedDown: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#IsKnockedDown#get", this ); }

                    return this.hitZone != null || this.hitByBat;
                }
            },
            Blocked: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#Blocked#get", this ); }

                    return this.EndCardVisible || this.InputBlocked;
                }
            },
            IsInputBlocked: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#IsInputBlocked#get", this ); }

                    return this.Blocked;
                }
            },
            MyHouse: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#MyHouse#get", this ); }

                    return this.houses[0];
                }
            },
            MaxSlots: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#MaxSlots#get", this ); }

                    return this.SlotsAt(this.coopLevel);
                }
            },
            MaxCoopLevel: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#MaxCoopLevel#get", this ); }

                    return this.coopPrices.length;
                }
            },
            MaxTreadmillLevel: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#MaxTreadmillLevel#get", this ); }

                    return UnityEngine.Mathf.Min(this.treadmillPrices.length, this.MyHouse.treadmills.length);
                }
            },
            IncubateTick: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#IncubateTick#get", this ); }

                    return (this.night ? this.nightIncubateMultiplier : 1) * this.BoostMultiplier(1);
                }
            },
            InsideMyCoop: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#InsideMyCoop#get", this ); }

                    return StealEggGame.InsideBox(this.MyHouse.Coop, this.player.position, 0.35);
                }
            },
            CoopCenter: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#CoopCenter#get", this ); }

                    var c = this.MyHouse.Coop;
                    return c.transform.TransformPoint$1(c.center);
                }
            },
            NearTreadmill: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#NearTreadmill#get", this ); }

                    return !this.training && StealEggGame.FlatDistance(this.player.position.$clone(), this.MyHouse.TrainSlot.position.$clone()) < 2.2;
                }
            },
            AnyIncubatorReady: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#AnyIncubatorReady#get", this ); }

                    var $t;
                    $t = Bridge.getEnumerator(this.incubators);
                    try {
                        while ($t.moveNext()) {
                            var incubator = $t.Current;
                            if (incubator.ready && !incubator.opening) {
                                return true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return false;
                }
            },
            QuickSlotCount: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#QuickSlotCount#get", this ); }

                    return this.inventoryUI.quickSlots != null ? this.inventoryUI.quickSlots.length : 0;
                }
            },
            CanUseInventory: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#CanUseInventory#get", this ); }

                    return !this.IsKnockedDown && !this.training && !this.EndCardVisible && !this.IsCarrying;
                }
            },
            StationPanels: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#StationPanels#get", this ); }

                    return System.Array.init([this.coopUI.root, this.treadmillUI.root, this.fuseUI.root, this.shopUI.root, this.frogUI.root], UnityEngine.GameObject);
                }
            },
            InputBlocked: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#InputBlocked#get", this ); }

                    return (UnityEngine.GameObject.op_Inequality(this.modal, null) && !this.IsStationPanel(this.modal)) || (UnityEngine.Object.op_Implicit(this.rewardUI.root) && this.rewardUI.root.activeSelf);
                }
            },
            PhaseLeft: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#PhaseLeft#get", this ); }

                    return (this.night ? this.nightDuration : this.dayDuration) - this.phaseClock;
                }
            },
            IndexClaimable: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame#IndexClaimable#get", this ); }

                    var $t;
                    $t = Bridge.getEnumerator(this.collected);
                    try {
                        while ($t.moveNext()) {
                            var pet = $t.Current;
                            if (!this.claimed.contains(pet)) {
                                return true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return false;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame#init", this ); }

                this.hitDirection = new UnityEngine.Vector3();
                this.modelPosition = new UnityEngine.Vector3();
                this.modelRotation = new UnityEngine.Quaternion();
                this.attackerRotation = new UnityEngine.Quaternion();
                this.spawn = new UnityEngine.Vector3();
                this.spawnRotation = new UnityEngine.Quaternion();
                this.lobbySize = new UnityEngine.Vector3();
                this.functionsHome = new UnityEngine.Vector2();
                this.frogScale = new UnityEngine.Vector3();
                this.attackHitAt = -1;
                this.swingStart = -1;
                this.fightStart = -1;
                this.capturesForEndCard = 3;
                this.moveSpeed = 9;
                this.incubationSeconds = 5;
                this.jumpHeight = 2.5;
                this.gravity = 25.0;
                this.baseMoveSpeed = 8;
                this.speedPowerMultiplier = 0.05;
                this.trainingPowerPerTick = 10;
                this.startingMoney = 100;
                this.eggs = new (System.Collections.Generic.List$1(StealEggGame.Egg)).ctor();
                this.playerActor = new StealEggGame.Actor();
                this.hitWindup = 0.25;
                this.knockdownDuration = 1.6;
                this.getUpDuration = 0.5;
                this.triggerBounds = new (System.Collections.Generic.Dictionary$2(UnityEngine.Collider,UnityEngine.Bounds)).ctor();
                this.stepLeft = 1;
                this.coopPrices = System.Array.init([
                    0, 
                    2000, 
                    21000, 
                    138000, 
                    1400000.0, 
                    12500000.0, 
                    166000000.0, 
                    2700000000.0, 
                    33000000000.0, 
                    295000000000.0, 
                    3400000000000.0, 
                    22200000000000.0, 
                    310000000000000.0
                ], System.Double);
                this.coopModelByLevel = System.Array.init([
                    1, 
                    1, 
                    2, 
                    2, 
                    3, 
                    3, 
                    4, 
                    4, 
                    5, 
                    5, 
                    6, 
                    6, 
                    7
                ], System.Int32);
                this.coopBaseSlots = 4;
                this.treadmillPrices = System.Array.init([
                    0, 
                    15000, 
                    250000, 
                    5000000.0, 
                    120000000.0, 
                    3000000000.0, 
                    75000000000.0, 
                    3000000000000.0, 
                    50000000000000.0, 
                    1E+18
                ], System.Double);
                this.treadmillTrainValues = System.Array.init([
                    2, 
                    5, 
                    12, 
                    30, 
                    80, 
                    100, 
                    200, 
                    500, 
                    1000, 
                    2000
                ], System.Single);
                this.priceMultiplier = 1;
                this.dayDuration = 180;
                this.nightDuration = 10;
                this.nightIncubateMultiplier = 30;
                this.dayLightIntensity = 1.1;
                this.lightTransition = 2;
                this.incomeMultiplierBySize = 1.1;
                this.sellPriceMultiplier = 10;
                this.luckyFrogFeedMultiplier = 3;
                this.trainTick = 0.5;
                this.hatchDuration = 3;
                this.luckyEggOpenDuration = 3;
                this.fuseDuration = 1.8;
                this.npcCount = 4;
                this.npcCoopSmallPets = 2;
                this.npcCoopBigPetSize = 3.5;
                this.npcMinSpeed = 8;
                this.npcMaxSpeed = 100;
                this.batCooldown = 2;
                this.batForce = 300;
                this.lobbySize = new pc.Vec3( 60, 20, 60 );
                this.coopPets = new (System.Collections.Generic.List$1(StealEggGame.CoopPet)).ctor();
                this.decorPets = new (System.Collections.Generic.List$1(StealEggGame.CoopPet)).ctor();
                this.incubators = new (System.Collections.Generic.List$1(StealEggGame.Incubator)).ctor();
                this.flying = new (System.Collections.Generic.List$1(StealEggGame.FlyingPet)).ctor();
                this.coopLevel = 1;
                this.treadmillLevel = 1;
                this.petRows = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
                this.incubateRows = new (System.Collections.Generic.List$1(IncubateRowView)).ctor();
                this.petInfos = new (System.Collections.Generic.List$1(UnityEngine.Transform)).ctor();
                this.items = new (System.Collections.Generic.List$1(StealEggGame.Item)).ctor();
                this.quick = new (System.Collections.Generic.List$1(StealEggGame.Item)).ctor();
                this.bagCells = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
                this.npcs = new (System.Collections.Generic.List$1(StealEggGame.Actor)).ctor();
                this.boneFollowers = new (System.Collections.Generic.List$1(StealEggGame.BoneFollower)).ctor();
                this.actions = new (System.Collections.Generic.Dictionary$2(System.String,UnityEngine.GameObject)).ctor();
                this.currentAction = "";
                this.speedPulse = -1;
                this.rewardRows = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
                this.zoneClock = -1;
                this.zoneInside = -1;
                this.popups = new (System.Collections.Generic.List$1(StealEggGame.Popup)).ctor();
                this.insideStation = System.Array.init(5, false, System.Boolean);
                this.boosts = new (System.Collections.Generic.List$1(StealEggGame.ActiveBoost)).ctor();
                this.luckyEggs = new (System.Collections.Generic.List$1(StealEggGame.LuckyEgg)).ctor();
                this.frogPunch = -1;
                this.eggSpawnAt = -1;
                this.indexRows = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
                this.collected = new (System.Collections.Generic.HashSet$1(System.Int32)).ctor();
                this.claimed = new (System.Collections.Generic.HashSet$1(System.Int32)).ctor();
                this.indexSelection = -1;
                this.indexRewardRows = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
            }
        },
        methods: {
            /*StealEggGame.UpdatePlayerAnimation start.*/
            UpdatePlayerAnimation: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdatePlayerAnimation", this ); }

                if (!UnityEngine.Object.op_Implicit(this.playerAnimator) || this.IsKnockedDown) {
                    return;
                }
                if (this.FightActive) {
                    StealEggGame.SetAnimatorState(this.playerAnimator, StealEggGame.SetFight, this.fightMotion);
                    return;
                }
                this.fightMotion = this.playerForward > 0.15 ? StealEggGame.MotionRun : StealEggGame.MotionIdle;
                var grounded = this.training || !UnityEngine.Object.op_Implicit(this.motor) || this.motor.isGrounded;
                var set = this.IsCarrying ? StealEggGame.SetCarry : this.hand != null && this.hand.kind !== StealEggGame.ItemKind.Bat ? StealEggGame.SetHold : StealEggGame.SetPlain;
                StealEggGame.SetAnimatorState(this.playerAnimator, set, StealEggGame.MotionFor(this.playerForward, grounded, this.verticalSpeed));
            },
            /*StealEggGame.UpdatePlayerAnimation end.*/

            /*StealEggGame.SetNpcAnimation start.*/
            SetNpcAnimation: function (npc, forward) {
if ( TRACE ) { TRACE( "StealEggGame#SetNpcAnimation", this ); }

                StealEggGame.SetAnimatorState(npc.animator, npc.carried != null ? StealEggGame.SetCarry : StealEggGame.SetPlain, StealEggGame.MotionFor(forward, true, 0));
            },
            /*StealEggGame.SetNpcAnimation end.*/

            /*StealEggGame.Attack start.*/
            Attack: function () {
if ( TRACE ) { TRACE( "StealEggGame#Attack", this ); }

                if (this.hand == null || this.hand.kind !== StealEggGame.ItemKind.Bat || this.IsCarrying || this.IsKnockedDown || this.training || this.Blocked) {
                    return;
                }
                if (UnityEngine.Time.time < this.attackReadyAt) {
                    return;
                }
                this.attackReadyAt = UnityEngine.Time.time + this.batCooldown;
                this.attackHitAt = UnityEngine.Time.time + 0.3;
                this.attackHitEnd = UnityEngine.Time.time + 0.5;
                if (UnityEngine.Object.op_Implicit(this.playerAnimator) && UnityEngine.Object.op_Implicit(this.playerAnimator.runtimeAnimatorController)) {
                    this.fightStart = UnityEngine.Time.time;
                } else {
                    this.swingStart = UnityEngine.Time.time;
                }
            },
            /*StealEggGame.Attack end.*/

            /*StealEggGame.UpdateCombat start.*/
            UpdateCombat: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateCombat", this ); }

                var $t;
                if (this.attackHitAt < 0 || UnityEngine.Time.time < this.attackHitAt) {
                    return;
                }
                var center = this.player.position.$clone().add( this.player.forward.$clone().clone().scale( 1.2 ) ).add( pc.Vec3.UP.clone() );
                $t = Bridge.getEnumerator(this.npcs);
                try {
                    while ($t.moveNext()) {
                        var npc = $t.Current;
                        if (npc.Down || pc.Vec3.distance( center, npc.root.position.$clone().add( pc.Vec3.UP.clone() ) ) > 1.6) {
                            continue;
                        }
                        if (UnityEngine.Object.op_Implicit(this.combatArea) && !StealEggGame.InsideBox(this.combatArea, npc.root.position, 0)) {
                            continue;
                        }
                        var force = (npc.root.position.$clone().sub( this.player.position ).add( pc.Vec3.UP.clone() )).clone().normalize().$clone().clone().scale( this.batForce );
                        if (npc.carried != null) {
                            this.ReleaseEgg(npc, false);
                        }
                        this.KnockNpc(npc, force.$clone());
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (UnityEngine.Time.time >= this.attackHitEnd) {
                    this.attackHitAt = -1;
                }
            },
            /*StealEggGame.UpdateCombat end.*/

            /*StealEggGame.ApplyBatSwing start.*/
            ApplyBatSwing: function () {
if ( TRACE ) { TRACE( "StealEggGame#ApplyBatSwing", this ); }

                if (this.swingStart < 0 || !UnityEngine.Object.op_Implicit(this.carryPoint)) {
                    return;
                }
                var t = (UnityEngine.Time.time - this.swingStart) / 0.5;
                if (t >= 1) {
                    this.swingStart = -1;
                    return;
                }
                this.carryPoint.rotation = this.carryPoint.rotation.clone().mul( new pc.Quat().setFromEulerAngles_Unity( -110 * Math.sin(t * UnityEngine.Mathf.PI), 0, 0 ) );
            },
            /*StealEggGame.ApplyBatSwing end.*/

            /*StealEggGame.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "StealEggGame#Start", this ); }

                var $t, $t1, $t2;
                this.DisableTriggers();
                this.spawn = this.player.position.$clone();
                this.spawnRotation = this.player.rotation.$clone();
                this.Money = this.startingMoney;
                this.sound = this.gameObject.AddComponent(UnityEngine.AudioSource);
                this.sound.playOnAwake = false;
                this.sound.volume = 0.65;
                this.motor = this.player.GetComponent(UnityEngine.CharacterController);
                if (!UnityEngine.Object.op_Implicit(this.motor)) {
                    this.motor = this.player.gameObject.AddComponent(UnityEngine.CharacterController);
                }
                this.motor.height = 2;
                this.motor.radius = 0.4;
                this.motor.center = pc.Vec3.UP.clone();
                this.carryPoint = new UnityEngine.GameObject.$ctor2("Carried egg").transform;
                this.carryPoint.SetParent(this.player, false);
                this.carryPoint.localPosition = new pc.Vec3( 0, 1.5, 1.1 );
                if (UnityEngine.Object.op_Implicit(this.playerAnimator) && this.playerAnimator.isHuman) {
                    this.carryHand = this.playerAnimator.GetBoneTransform(UnityEngine.HumanBodyBones.RightHand);
                }
                // The weapon slot hangs under RightHand_end, which Luna leaves stale: drive it from the hand bone (see BoneFollower).
                if (UnityEngine.Object.op_Implicit(this.rightHandSlot) && UnityEngine.Object.op_Implicit(this.carryHand)) {
                    this.rightHandSlot.SetParent(this.player, true);
                    this.FollowBone(this.rightHandSlot, this.carryHand, this.player);
                }
                this.playerActor.isPlayer = true;
                this.playerActor.root = this.player;
                this.playerActor.animator = this.playerAnimator;
                this.playerActor.stealSlot = this.carryPoint;
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        zone.thieves = new (System.Collections.Generic.List$1(StealEggGame.Actor)).ctor();
                        zone.revive = new (System.Collections.Generic.List$1(StealEggGame.Egg)).ctor();
                        zone.state = StealEggGame.GuardState.Idle;
                        if (!UnityEngine.Object.op_Implicit(zone.bounds) && UnityEngine.Object.op_Implicit(zone.root)) {
                            zone.bounds = zone.root.GetComponent(UnityEngine.BoxCollider);
                        }
                        if (UnityEngine.Object.op_Implicit(zone.guardian)) {
                            zone.guardianHome = zone.guardian.position.$clone();
                            zone.guardianRotation = zone.guardian.rotation.$clone();
                            zone.animator = zone.guardian.GetComponentInChildren(UnityEngine.Animator);
                        }
                        $t1 = Bridge.getEnumerator(zone.guardian.GetComponentsInChildren$1(UnityEngine.Transform, true));
                        try {
                            while ($t1.moveNext()) {
                                var t = $t1.Current;
                                if (Bridge.referenceEquals(t.name, "Exclamation_mark")) {
                                    zone.warningMark = t.gameObject;
                                }
                                if (Bridge.referenceEquals(t.name, "[VFX] Sleeping")) {
                                    zone.sleepingEffect = t.gameObject;
                                }
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                        $t2 = Bridge.getEnumerator(zone.root.GetComponentsInChildren$1(TMPro.TMP_Text, true));
                        try {
                            while ($t2.moveNext()) {
                                var label = $t2.Current;
                                if (Bridge.referenceEquals(label.name, "Text_Speed")) {
                                    label.text = StealEggGame.Num(this.SpeedPowerFor(zone.guardianSpeed));
                                }
                            }
                        } finally {
                            if (Bridge.is($t2, System.IDisposable)) {
                                $t2.System$IDisposable$Dispose();
                            }
                        }
                        for (var n = 0; n < zone.nests.length; n = (n + 1) | 0) {
                            this.SpawnNestEgg(zone, n);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.BindSceneUI();
                this.BindOriginalUI();
                this.StartHome();
                this.StartNpcs();
                this.StartWorld();
                this.StartOutfits();
                this.SetStep(StealEggGame.TutorialStep.Steal);
            },
            /*StealEggGame.Start end.*/

            /*StealEggGame.DisableTriggers start.*/
            DisableTriggers: function () {
if ( TRACE ) { TRACE( "StealEggGame#DisableTriggers", this ); }

                var $t, $t1;
                $t = Bridge.getEnumerator(this.gameObject.scene.getRootGameObjects());
                try {
                    while ($t.moveNext()) {
                        var root = $t.Current;
                        $t1 = Bridge.getEnumerator(root.GetComponentsInChildren(UnityEngine.Collider, true));
                        try {
                            while ($t1.moveNext()) {
                                var c = $t1.Current;
                                if (!c.isTrigger) {
                                    continue;
                                }
                                // A copy: Luna's Bounds is a reference type and collider bounds are live objects.
                                if (c.enabled && c.gameObject.activeInHierarchy) {
                                    this.triggerBounds.setItem(c, new pc.BoundingBox( c.bounds.center.$clone(), c.bounds.halfExtents.$clone().scale( 2 ).$clone().scale( 0.5 ) ));
                                }
                                c.enabled = false;
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*StealEggGame.DisableTriggers end.*/

            /*StealEggGame.PlaySound start.*/
            PlaySound: function (clip, volume) {
if ( TRACE ) { TRACE( "StealEggGame#PlaySound", this ); }

                if (volume === void 0) { volume = 1.0; }
                if (UnityEngine.Object.op_Implicit(this.sound) && UnityEngine.Object.op_Implicit(clip)) {
                    this.sound.PlayOneShot$1(clip, volume);
                }
            },
            /*StealEggGame.PlaySound end.*/

            /*StealEggGame.UpdateFootsteps start.*/
            UpdateFootsteps: function (speed) {
if ( TRACE ) { TRACE( "StealEggGame#UpdateFootsteps", this ); }

                if (speed <= 0.01) {
                    this.stepLeft = 1;
                    return;
                }
                this.stepLeft -= Math.max(0, Math.min(speed, 30)) * UnityEngine.Time.deltaTime * 0.5;
                if (this.stepLeft <= 0) {
                    this.stepLeft = 1;
                    this.PlaySound(this.footstepSound, 0.8);
                }
            },
            /*StealEggGame.UpdateFootsteps end.*/

            /*StealEggGame.NotifyCameraTurned start.*/
            NotifyCameraTurned: function () {
if ( TRACE ) { TRACE( "StealEggGame#NotifyCameraTurned", this ); }

                this.cameraTurned = true;
            },
            /*StealEggGame.NotifyCameraTurned end.*/

            /*StealEggGame.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "StealEggGame#Update", this ); }

                if (!UnityEngine.Object.op_Implicit(this.player) || UnityEngine.Time.timeScale === 0) {
                    return;
                }
                this.UpdateSafeArea();
                this.moveSpeed = this.slowMode ? this.baseMoveSpeed : this.WalkSpeed(this.SpeedPower);
                this.playerActor.speed = this.moveSpeed;
                if (!this.Blocked) {
                    if (this.IsKnockedDown) {
                        this.UpdateKnockdown();
                    } else {
                        if (this.training) {
                            this.UpdateTraining();
                        } else {
                            this.MovePlayer();
                        }
                    }
                    if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.E)) {
                        this.PressPrimaryAction();
                    }
                    if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.Q)) {
                        this.DropEgg();
                    }
                    if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.F)) {
                        this.Attack();
                    }
                } else {
                    this.playerForward = 0;
                    // A popup over the joystick never sends its pointer up: drop the held input.
                    if (this.EndCardVisible) {
                        this.joystick.ResetInput();
                    }
                }
                this.UpdatePlayerAnimation();
                this.UpdateInteraction();
                this.UpdateGuardians();
                this.UpdateNpcs();
                this.UpdateHome();
                this.UpdateWorld();
                this.UpdateCombat();
                this.UpdateGuide();
                this.UpdateHud();
                this.UpdateTutorialHints();
            },
            /*StealEggGame.Update end.*/

            /*StealEggGame.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "StealEggGame#LateUpdate", this ); }

                if (!UnityEngine.Object.op_Implicit(this.player) || UnityEngine.Time.timeScale === 0) {
                    return;
                }
                this.UpdateBoneFollowers();
                this.UpdateHandVisual();
                this.LateUpdateUI();
            },
            /*StealEggGame.LateUpdate end.*/

            /*StealEggGame.MovePlayer start.*/
            MovePlayer: function () {
if ( TRACE ) { TRACE( "StealEggGame#MovePlayer", this ); }

                if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.Space)) {
                    this.Jump();
                }
                var input = pc.Vec2.lengthClamp( this.joystick.Value.$clone().add( new pc.Vec2( UnityEngine.Input.GetAxisRaw("Horizontal"), UnityEngine.Input.GetAxisRaw("Vertical") ) ), 1 );
                if (input.lengthSq() > 0.01 && !this.firstInput) {
                    this.firstInput = true;
                }
                var forward = this.gameCamera.transform.forward.$clone();
                forward.y = 0;
                forward.normalize();
                var right = this.gameCamera.transform.right.$clone();
                right.y = 0;
                right.normalize();
                var direction = forward.$clone().clone().scale( input.y ).add( right.$clone().clone().scale( input.x ) );
                if (direction.lengthSq() > 0.01) {
                    this.player.rotation = new pc.Quat().slerpUnclamped( this.player.rotation, new pc.Quat().lookRotation( direction, pc.Vec3.UP ), pc.math.clamp( UnityEngine.Time.deltaTime * 14, 0, 1 ) );
                }
                if (this.motor.isGrounded && this.verticalSpeed < 0) {
                    this.verticalSpeed = -2;
                }
                this.verticalSpeed -= this.gravity * UnityEngine.Time.deltaTime;
                // Ceiling check from the actual rise: Luna numbers CollisionFlags 0..3 (Below=3), so "& Above" held on the ground
                // and cancelled every jump on its first frame.
                var startPosition = this.player.position.$clone();
                var startY = startPosition.y;
                this.motor.Move((direction.$clone().clone().scale( this.moveSpeed ).add( pc.Vec3.UP.clone().clone().scale( this.verticalSpeed ) )).clone().scale( UnityEngine.Time.deltaTime ));
                if (this.verticalSpeed > 0 && this.player.position.y - startY < this.verticalSpeed * UnityEngine.Time.deltaTime * 0.5) {
                    this.verticalSpeed = 0;
                }
                if (this.player.position.y < -12) {
                    this.Respawn();
                }
                this.playerForward = input.length();
                this.UpdateFootsteps(this.motor.isGrounded ? direction.length() * this.moveSpeed : 0);
                // Distance actually walked (horizontal), for LunaController's IAP popup.
                var step = this.player.position.$clone().sub( startPosition );
                step.y = 0;
                if (step.lengthSq() > 0) {
                    this.walked += step.length();
                    if (UnityEngine.Object.op_Implicit(LunaController.Instance)) {
                        LunaController.Instance.PlayerWalked(this.walked);
                    }
                }
            },
            /*StealEggGame.MovePlayer end.*/

            /*StealEggGame.Jump start.*/
            Jump: function () {
if ( TRACE ) { TRACE( "StealEggGame#Jump", this ); }

                if (this.IsKnockedDown || this.training || this.Blocked) {
                    return;
                }
                if (!UnityEngine.Object.op_Implicit(this.motor) || !this.motor.enabled || !this.motor.isGrounded || this.verticalSpeed > 0) {
                    return;
                }
                this.verticalSpeed = Math.sqrt(2 * UnityEngine.Mathf.Max(0.01, this.gravity) * UnityEngine.Mathf.Max(0.1, this.jumpHeight));
                this.jumped = true;
            },
            /*StealEggGame.Jump end.*/

            /*StealEggGame.WalkSpeed start.*/
            WalkSpeed: function (power) {
if ( TRACE ) { TRACE( "StealEggGame#WalkSpeed", this ); }

                return this.baseMoveSpeed + Math.sqrt(power) * this.speedPowerMultiplier;
            },
            /*StealEggGame.WalkSpeed end.*/

            /*StealEggGame.SpeedPowerFor start.*/
            SpeedPowerFor: function (speed) {
if ( TRACE ) { TRACE( "StealEggGame#SpeedPowerFor", this ); }

                if (speed <= this.baseMoveSpeed) {
                    return 0;
                }
                return Math.pow((speed - this.baseMoveSpeed) / this.speedPowerMultiplier, 2);
            },
            /*StealEggGame.SpeedPowerFor end.*/

            /*StealEggGame.AddMoney start.*/
            AddMoney: function (amount) {
if ( TRACE ) { TRACE( "StealEggGame#AddMoney", this ); }

                this.Money += amount;
            },
            /*StealEggGame.AddMoney end.*/

            /*StealEggGame.AddSpeedPower start.*/
            AddSpeedPower: function (amount) {
if ( TRACE ) { TRACE( "StealEggGame#AddSpeedPower", this ); }

                this.SpeedPower += amount;
                this.PulseSpeedIcon();
            },
            /*StealEggGame.AddSpeedPower end.*/

            /*StealEggGame.SpendMoney start.*/
            SpendMoney: function (price) {
if ( TRACE ) { TRACE( "StealEggGame#SpendMoney", this ); }

                if (this.Money < price) {
                    this.ShowDialog("You do not have enough moneys");
                    return false;
                }
                this.Money -= price;
                return true;
            },
            /*StealEggGame.SpendMoney end.*/

            /*StealEggGame.SpawnNestEgg start.*/
            SpawnNestEgg: function (zone, n) {
if ( TRACE ) { TRACE( "StealEggGame#SpawnNestEgg", this ); }

                if (zone.eggPrefabs.length === 0) {
                    return;
                }
                var variant = this.RollEgg(zone);
                var obj = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, zone.eggPrefabs[variant], zone.nests[n].position, new pc.Quat().setFromEulerAngles_Unity( 0, UnityEngine.Random.Range(0, 180), 0 ));
                obj.name = (zone.name || "") + " Egg " + (((n + 1) | 0));
                StealEggGame.DisablePhysics(obj);
                var egg = new StealEggGame.Egg();
                egg.transform = obj.transform;
                egg.origin = obj.transform.position.$clone();
                egg.rotation = obj.transform.rotation.$clone();
                egg.zone = zone;
                egg.variant = variant;
                egg.nest = n;
                var rule = this.Rule(zone, variant);
                egg.size = rule != null ? rule.RollSize() : 1;
                obj.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( Math.max(1, Math.min(egg.size / 5, 6)) );
                egg.scale = obj.transform.localScale.$clone();
                this.eggs.add(egg);
            },
            /*StealEggGame.SpawnNestEgg end.*/

            /*StealEggGame.ResetZoneEggs start.*/
            ResetZoneEggs: function () {
if ( TRACE ) { TRACE( "StealEggGame#ResetZoneEggs", this ); }

                var $t;
                for (var i = (this.eggs.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var egg = this.eggs.getItem(i);
                    if (egg.holder != null) {
                        if (Bridge.referenceEquals(egg.holder, this.playerActor)) {
                            this.ClearStolenEggUI();
                        }
                        egg.holder.carried = null;
                        egg.holder = null;
                    }
                    if (UnityEngine.Object.op_Implicit(egg.transform)) {
                        UnityEngine.MonoBehaviour.Destroy(egg.transform.gameObject);
                    }
                }
                this.eggs.clear();
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        zone.thieves.clear();
                        zone.revive.clear();
                        zone.target = (zone.pending = null);
                        zone.fetching = null;
                        zone.state = StealEggGame.GuardState.Idle;
                        if (UnityEngine.Object.op_Implicit(zone.guardian)) {
                            zone.guardian.position = zone.guardianHome.$clone();
                            zone.guardian.rotation = zone.guardianRotation.$clone();
                        }
                        for (var n = 0; n < zone.nests.length; n = (n + 1) | 0) {
                            this.SpawnNestEgg(zone, n);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*StealEggGame.ResetZoneEggs end.*/

            /*StealEggGame.EggWeight start.*/
            EggWeight: function (egg) {
if ( TRACE ) { TRACE( "StealEggGame#EggWeight", this ); }

                var rule = egg != null ? this.Rule(egg.zone, egg.variant) : null;
                return rule != null ? rule.incubationTime : 10;
            },
            /*StealEggGame.EggWeight end.*/

            /*StealEggGame.InZone start.*/
            InZone: function (zone, point) {
if ( TRACE ) { TRACE( "StealEggGame#InZone", this ); }

                if (!UnityEngine.Object.op_Implicit(zone.bounds)) {
                    return false;
                }
                var local = zone.bounds.transform.InverseTransformPoint(point).sub( zone.bounds.center ), half = zone.bounds.size.$clone().clone().scale( 0.5 );
                return Math.abs(local.x) <= half.x && Math.abs(local.z) <= half.z;
            },
            /*StealEggGame.InZone end.*/

            /*StealEggGame.TakeEgg start.*/
            TakeEgg: function (thief, egg) {
if ( TRACE ) { TRACE( "StealEggGame#TakeEgg", this ); }

                thief.carried = egg;
                egg.holder = thief;
                egg.onGround = false;
                egg.transform.SetParent(thief.stealSlot, false);
                egg.transform.localPosition = pc.Vec3.ZERO.clone();
                egg.transform.localRotation = pc.Quat.IDENTITY.clone();
                var zone = egg.zone;
                if (!zone.thieves.contains(thief)) {
                    zone.thieves.add(thief);
                }
                this.RetargetGuardian(zone, 0.75);
                if (thief.isPlayer) {
                    this.UnequipHand();
                    this.ShowWarning(true);
                    this.PlaySound(this.stealSound, 0.7);
                    this.stoleEgg = true;
                    if (this.Step === StealEggGame.TutorialStep.Steal) {
                        this.SetStep(StealEggGame.TutorialStep.BringHome);
                    }
                }
            },
            /*StealEggGame.TakeEgg end.*/

            /*StealEggGame.ReleaseEgg start.*/
            ReleaseEgg: function (thief, hideForRevive) {
if ( TRACE ) { TRACE( "StealEggGame#ReleaseEgg", this ); }

                var egg = thief.carried;
                if (egg == null) {
                    return;
                }
                thief.carried = null;
                egg.holder = null;
                egg.transform.SetParent(null);
                if (thief.isPlayer) {
                    this.ClearStolenEggUI();
                    if (this.Step === StealEggGame.TutorialStep.BringHome) {
                        this.SetStep(StealEggGame.TutorialStep.Steal);
                    }
                }
                var zone = egg.zone;
                zone.thieves.remove(thief);
                if (hideForRevive) {
                    this.HideForRevive(egg);
                    this.RetargetGuardian(zone, 0.75);
                    return;
                }
                // A dropped egg (manual drop, bat hit) lands in front of the thief; the guardian leaves the thieves, walks to it,
                // picks it up (it disappears) and puts it back in its nest once home (UpdateGuardians).
                var point = thief.root.position.$clone().add( thief.root.forward.$clone().clone().scale( 1.2 ) );
                var hit = { v : new UnityEngine.RaycastHit() };
                if (UnityEngine.Physics.Raycast$3(point.$clone().add( pc.Vec3.UP.clone().clone().scale( 2 ) ), pc.Vec3.DOWN.clone(), hit, 10, -1, UnityEngine.QueryTriggerInteraction.Ignore) && !hit.v.transform.IsChildOf(thief.root)) {
                    point.y = hit.v.point.y;
                } else {
                    point.y = thief.root.position.y;
                }
                egg.transform.position = point.$clone();
                egg.transform.rotation = egg.rotation.$clone();
                egg.transform.localScale = egg.scale.$clone();
                egg.onGround = true;
                this.FetchNext(zone);
            },
            /*StealEggGame.ReleaseEgg end.*/

            /*StealEggGame.FetchNext start.*/
            FetchNext: function (zone) {
if ( TRACE ) { TRACE( "StealEggGame#FetchNext", this ); }

                var $t;
                var next = null;
                var best = 3.40282347E+38;
                $t = Bridge.getEnumerator(this.eggs);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (!Bridge.referenceEquals(e.zone, zone) || !e.onGround || e.holder != null || e.hidden) {
                            continue;
                        }
                        var d = StealEggGame.FlatDistance(zone.guardian.position.$clone(), e.transform.position.$clone());
                        if (d < best) {
                            best = d;
                            next = e;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (next == null) {
                    zone.fetching = null;
                    zone.state = StealEggGame.GuardState.Return;
                    this.RetargetGuardian(zone, 0);
                    return;
                }
                zone.fetching = next;
                zone.target = (zone.pending = null);
                zone.state = StealEggGame.GuardState.Fetch;
            },
            /*StealEggGame.FetchNext end.*/

            /*StealEggGame.HideForRevive start.*/
            HideForRevive: function (egg) {
if ( TRACE ) { TRACE( "StealEggGame#HideForRevive", this ); }

                egg.hidden = true;
                egg.onGround = false;
                egg.transform.gameObject.SetActive(false);
                if (!egg.zone.revive.contains(egg)) {
                    egg.zone.revive.add(egg);
                }
            },
            /*StealEggGame.HideForRevive end.*/

            /*StealEggGame.LoseEgg start.*/
            LoseEgg: function (thief) {
if ( TRACE ) { TRACE( "StealEggGame#LoseEgg", this ); }

                var egg = thief.carried;
                if (egg == null) {
                    return;
                }
                thief.carried = null;
                egg.holder = null;
                egg.gone = true;
                var zone = egg.zone;
                zone.thieves.remove(thief);
                this.eggs.remove(egg);
                if (UnityEngine.Object.op_Implicit(egg.transform)) {
                    UnityEngine.MonoBehaviour.Destroy(egg.transform.gameObject);
                }
                this.RetargetGuardian(zone, 1);
            },
            /*StealEggGame.LoseEgg end.*/

            /*StealEggGame.DropEgg start.*/
            DropEgg: function () {
if ( TRACE ) { TRACE( "StealEggGame#DropEgg", this ); }

                if (!this.IsCarrying || this.Blocked) {
                    return;
                }
                this.ReleaseEgg(this.playerActor, false);
            },
            /*StealEggGame.DropEgg end.*/

            /*StealEggGame.GatherEgg start.*/
            GatherEgg: function () {
if ( TRACE ) { TRACE( "StealEggGame#GatherEgg", this ); }

                var egg = this.carried;
                var item = new StealEggGame.Item();
                item.kind = StealEggGame.ItemKind.Egg;
                item.zone = egg.zone;
                item.variant = egg.variant;
                item.size = egg.size;
                this.LoseEgg(this.playerActor);
                this.ClearStolenEggUI();
                this.AddItem(item, true);
                this.PlaySound(this.deliverSound);
                if (this.Step === StealEggGame.TutorialStep.BringHome) {
                    this.SetStep(StealEggGame.TutorialStep.Incubate);
                }
            },
            /*StealEggGame.GatherEgg end.*/

            /*StealEggGame.ClearStolenEggUI start.*/
            ClearStolenEggUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#ClearStolenEggUI", this ); }

                this.ShowWarning(false);
            },
            /*StealEggGame.ClearStolenEggUI end.*/

            /*StealEggGame.RetargetGuardian start.*/
            RetargetGuardian: function (zone, delay) {
if ( TRACE ) { TRACE( "StealEggGame#RetargetGuardian", this ); }

                var $t;
                var best = null;
                var weight = -1;
                $t = Bridge.getEnumerator(zone.thieves);
                try {
                    while ($t.moveNext()) {
                        var thief = $t.Current;
                        var w = this.EggWeight(thief.carried);
                        if (w > weight) {
                            weight = w;
                            best = thief;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                // A dropped egg comes first: the guardian picks it up before chasing anyone (FetchNext retargets after).
                if (zone.state === StealEggGame.GuardState.Fetch) {
                    return;
                }
                if (best == null) {
                    zone.target = (zone.pending = null);
                    zone.state = StealEggGame.GuardState.Return;
                    return;
                }
                zone.pending = best;
                zone.target = null;
                zone.stateAt = UnityEngine.Time.time + delay;
                zone.state = StealEggGame.GuardState.Wait;
            },
            /*StealEggGame.RetargetGuardian end.*/

            /*StealEggGame.UpdateGuardians start.*/
            UpdateGuardians: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateGuardians", this ); }

                var $t, $t1;
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        if (!UnityEngine.Object.op_Implicit(zone.guardian) || Bridge.referenceEquals(this.hitZone, zone)) {
                            continue;
                        }
                        var maxSpeed = zone.guardianSpeed;
                        var destination = zone.guardianHome.$clone();
                        var speed = 0;
                        if (zone.state === StealEggGame.GuardState.Wait && UnityEngine.Time.time >= zone.stateAt) {
                            if (zone.pending != null && zone.thieves.contains(zone.pending)) {
                                zone.target = zone.pending;
                                zone.state = StealEggGame.GuardState.Chase;
                            } else {
                                this.RetargetGuardian(zone, 0);
                            }
                        }
                        if (zone.state === StealEggGame.GuardState.Chase) {
                            var target = zone.target;
                            if (target == null || target.carried == null || !Bridge.referenceEquals(target.carried.zone, zone) || target.Down) {
                                this.RetargetGuardian(zone, 0.75);
                                continue;
                            }
                            destination = target.root.position.$clone();
                            var distance = StealEggGame.FlatDistance(zone.guardian.position.$clone(), destination.$clone());
                            speed = target.speed < maxSpeed || distance > zone.attackDistance * 2.83 ? maxSpeed * 2 : target.speed;
                            if (distance <= zone.attackDistance && UnityEngine.Time.time > this.catchCooldown) {
                                this.CatchThief(zone, target);
                                continue;
                            }
                        } else if (zone.state === StealEggGame.GuardState.Fetch) {
                            var egg = zone.fetching;
                            if (egg == null || !egg.onGround || egg.holder != null) {
                                this.EndFetch(zone);
                                continue;
                            }
                            destination = egg.transform.position.$clone();
                            speed = maxSpeed * 2;
                            if (StealEggGame.FlatDistance(zone.guardian.position.$clone(), destination.$clone()) <= 1) {
                                this.HideForRevive(egg);
                                this.EndFetch(zone);
                                continue;
                            }
                        } else if (zone.state === StealEggGame.GuardState.Return) {
                            speed = maxSpeed * 4;
                            if (StealEggGame.FlatDistance(zone.guardian.position.$clone(), zone.guardianHome.$clone()) <= 0.3) {
                                zone.guardian.position = zone.guardianHome.$clone();
                                zone.guardian.rotation = zone.guardianRotation.$clone();
                                zone.state = StealEggGame.GuardState.Idle;
                                $t1 = Bridge.getEnumerator(zone.revive);
                                try {
                                    while ($t1.moveNext()) {
                                        var egg1 = $t1.Current;
                                        if (UnityEngine.Object.op_Implicit(egg1.transform)) {
                                            StealEggGame.ReturnToNest(egg1);
                                        }
                                    }
                                } finally {
                                    if (Bridge.is($t1, System.IDisposable)) {
                                        $t1.System$IDisposable$Dispose();
                                    }
                                }
                                zone.revive.clear();
                                speed = 0;
                            }
                        }
                        destination.y = zone.guardian.position.y;
                        if (speed > 0 && StealEggGame.FlatDistance(zone.guardian.position.$clone(), destination.$clone()) > 0.05) {
                            zone.guardian.rotation = new pc.Quat().slerpUnclamped( zone.guardian.rotation, new pc.Quat().lookRotation( destination.$clone().sub( zone.guardian.position ), pc.Vec3.UP ), pc.math.clamp( UnityEngine.Time.deltaTime * 6, 0, 1 ) );
                            zone.guardian.position = pc.Vec3.moveTowards( zone.guardian.position, destination, speed * UnityEngine.Time.deltaTime );
                        } else {
                            speed = 0;
                        }
                        if (UnityEngine.Object.op_Implicit(zone.warningMark)) {
                            zone.warningMark.SetActive(zone.state === StealEggGame.GuardState.Chase);
                        }
                        if (UnityEngine.Object.op_Implicit(zone.sleepingEffect)) {
                            zone.sleepingEffect.SetActive(zone.state === StealEggGame.GuardState.Idle);
                        }
                        if (UnityEngine.Object.op_Implicit(zone.animator)) {
                            StealEggGame.SetAnimatorMovement(zone.animator, speed > 0 ? Math.max(0.5, Math.min(speed / UnityEngine.Mathf.Max(1, maxSpeed), 4)) : 0);
                        }
                        StealEggGame.SetLoop(zone.sleepSound, speed <= 0);
                        StealEggGame.SetLoop(zone.runSound, speed > 0);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*StealEggGame.UpdateGuardians end.*/

            /*StealEggGame.EndFetch start.*/
            EndFetch: function (zone) {
if ( TRACE ) { TRACE( "StealEggGame#EndFetch", this ); }

                this.FetchNext(zone);
            },
            /*StealEggGame.EndFetch end.*/

            /*StealEggGame.CatchThief start.*/
            CatchThief: function (zone, thief) {
if ( TRACE ) { TRACE( "StealEggGame#CatchThief", this ); }

                var revive = this.InZone(zone, thief.carried.transform.position) || !this.TutorialCompleted;
                var direction = thief.root.position.$clone().sub( zone.guardian.position );
                direction.y = 0;
                if (direction.lengthSq() < 0.01) {
                    direction = zone.guardian.forward.$clone();
                }
                var force = direction.clone().normalize().$clone().clone().scale( Math.max(1, Math.min(zone.guardianSpeed, 30)) ).clone().scale( 50 );
                this.ReleaseEgg(thief, revive);
                if (UnityEngine.Object.op_Implicit(zone.catchSound)) {
                    zone.catchSound.Play();
                }
                // Original: only the player has a death sound.
                if (thief.isPlayer) {
                    this.BeginKnockdown(zone, force.$clone());
                    this.PlaySound(this.caughtSound);
                } else {
                    this.KnockNpc(thief, force.$clone());
                }
            },
            /*StealEggGame.CatchThief end.*/

            /*StealEggGame.BeginKnockdown start.*/
            BeginKnockdown: function (zone, force) {
if ( TRACE ) { TRACE( "StealEggGame#BeginKnockdown", this ); }

                this.hitZone = zone;
                this.hitByBat = false;
                this.hitClock = 0;
                this.hitApplied = false;
                this.training = false;
                this.joystick.ResetInput();
                this.hitDirection = force.$clone();
                this.hitDirection.y = 0;
                this.hitDirection.normalize();
                zone.guardian.rotation = new pc.Quat().lookRotation( this.hitDirection, pc.Vec3.UP );
                this.attackerRotation = zone.guardian.rotation.$clone();
                if (UnityEngine.Object.op_Implicit(this.playerAnimator)) {
                    this.modelPosition = this.playerAnimator.transform.localPosition.$clone();
                    this.modelRotation = this.playerAnimator.transform.localRotation.$clone();
                }
                this.playerForward = 0;
                this.playerActor.downUntil = 1;
            },
            /*StealEggGame.BeginKnockdown end.*/

            /*StealEggGame.UpdateKnockdown start.*/
            UpdateKnockdown: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateKnockdown", this ); }

                this.hitClock += UnityEngine.Time.deltaTime;
                // The source guardian only has locomotion clips: use a short strike lean for the attack.
                var strike = Math.sin(Math.max(0, Math.min(1, this.hitClock / (this.hitWindup + 0.2))) * UnityEngine.Mathf.PI) * 24;
                if (this.hitZone != null) {
                    this.hitZone.guardian.rotation = this.attackerRotation.clone().mul( new pc.Quat().setFromEulerAngles_Unity( strike, 0, 0 ) );
                }
                if (this.hitClock < this.hitWindup) {
                    return;
                }
                if (!this.hitApplied) {
                    this.hitApplied = true;
                    if (UnityEngine.Object.op_Implicit(this.ragdoll)) {
                        this.motor.enabled = false;
                        this.ragdoll.Begin(this.hitDirection.$clone().clone().scale( Math.max(1, Math.min(this.hitZone != null ? this.hitZone.guardianSpeed : 6, 30)) ).clone().scale( 50 ));
                    }
                    if (UnityEngine.Object.op_Implicit(this.playerAnimator)) {
                        this.playerAnimator.enabled = false;
                    }
                    this.verticalSpeed = 3;
                }
                var elapsed = this.hitClock - this.hitWindup;
                if (UnityEngine.Object.op_Implicit(this.ragdoll)) {
                    this.ragdoll.Follow();
                    if (elapsed >= this.knockdownDuration) {
                        this.ragdoll.Recover();
                        this.motor.enabled = true;
                        this.EndKnockdown();
                    }
                    return;
                }
                var rise = Math.max(0, Math.min(1, (elapsed - this.knockdownDuration) / this.getUpDuration));
                var fall = Math.max(0, Math.min(1, elapsed / 0.25)) * (1 - rise);
                if (UnityEngine.Object.op_Implicit(this.playerAnimator)) {
                    var localDirection = this.player.InverseTransformDirection(this.hitDirection);
                    var axis = new pc.Vec3().cross( pc.Vec3.UP.clone(), localDirection );
                    this.playerAnimator.transform.localRotation = new pc.Quat().setFromAxisAngle( axis, 85 * fall ).clone().mul( this.modelRotation );
                    this.playerAnimator.transform.localPosition = this.modelPosition.$clone().add( pc.Vec3.UP.clone().clone().scale( (0.3 * fall) ) );
                }
                if (this.motor.isGrounded && this.verticalSpeed < 0) {
                    this.verticalSpeed = -2;
                }
                this.verticalSpeed -= 20 * UnityEngine.Time.deltaTime;
                this.motor.Move((this.hitDirection.$clone().clone().scale( (elapsed < 0.4 ? 5 * (1 - elapsed / 0.4) : 0) ).add( pc.Vec3.UP.clone().clone().scale( this.verticalSpeed ) )).clone().scale( UnityEngine.Time.deltaTime ));
                if (rise >= 1) {
                    if (UnityEngine.Object.op_Implicit(this.playerAnimator)) {
                        this.playerAnimator.transform.localPosition = this.modelPosition.$clone();
                        this.playerAnimator.transform.localRotation = this.modelRotation.$clone();
                        this.playerAnimator.enabled = true;
                    }
                    this.EndKnockdown();
                }
            },
            /*StealEggGame.UpdateKnockdown end.*/

            /*StealEggGame.EndKnockdown start.*/
            EndKnockdown: function () {
if ( TRACE ) { TRACE( "StealEggGame#EndKnockdown", this ); }

                if (this.hitZone != null) {
                    this.hitZone.guardian.rotation = this.attackerRotation.$clone();
                }
                this.hitZone = null;
                this.hitByBat = false;
                this.playerActor.downUntil = 0;
                this.catchCooldown = UnityEngine.Time.time + 2;
                this.verticalSpeed = 0;
                // Preserve player position: recovering from a hit never teleports to spawn.
            },
            /*StealEggGame.EndKnockdown end.*/

            /*StealEggGame.Respawn start.*/
            Respawn: function () {
if ( TRACE ) { TRACE( "StealEggGame#Respawn", this ); }

                this.motor.enabled = false;
                this.player.position = this.spawn.$clone();
                this.player.rotation = this.spawnRotation.$clone();
                this.motor.enabled = true;
                this.verticalSpeed = 0;
                if (this.IsCarrying) {
                    this.ReleaseEgg(this.playerActor, true);
                }
            },
            /*StealEggGame.Respawn end.*/

            /*StealEggGame.TeleportPlayer start.*/
            TeleportPlayer: function (point) {
if ( TRACE ) { TRACE( "StealEggGame#TeleportPlayer", this ); }

                this.motor.enabled = false;
                this.player.position = point.$clone();
                this.motor.enabled = true;
                this.verticalSpeed = 0;
            },
            /*StealEggGame.TeleportPlayer end.*/

            /*StealEggGame.SetStep start.*/
            SetStep: function (step) {
if ( TRACE ) { TRACE( "StealEggGame#SetStep", this ); }

                var completing = step === StealEggGame.TutorialStep.Done && this.Step !== StealEggGame.TutorialStep.Done;
                this.Step = step;
                if (completing) {
                    var bat = new StealEggGame.Item();
                    bat.kind = StealEggGame.ItemKind.Bat;
                    this.AddItem(bat, true);
                    this.ShowReward("Tutorial Completed", System.Array.init([this.batIcon], UnityEngine.Sprite), System.Array.init(["1"], System.String));
                }
            },
            /*StealEggGame.SetStep end.*/

            /*StealEggGame.UpdateGuide start.*/
            UpdateGuide: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateGuide", this ); }

                var $t;
                var target = this.player.position.$clone();
                var show = !this.TutorialCompleted && !this.IsKnockedDown && !this.Blocked;
                if (this.Step === StealEggGame.TutorialStep.Steal) {
                    var first = null;
                    $t = Bridge.getEnumerator(this.eggs);
                    try {
                        while ($t.moveNext()) {
                            var egg = $t.Current;
                            if (Bridge.referenceEquals(egg.zone, this.zones[0]) && egg.Available) {
                                first = egg;
                                break;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    if (first != null) {
                        target = first.transform.position.$clone();
                    } else {
                        show = false;
                    }
                } else if (this.Step === StealEggGame.TutorialStep.BringHome) {
                    target = this.CoopCenter.$clone();
                } else {
                    if (this.Step === StealEggGame.TutorialStep.Incubate) {
                        target = this.CoopCenter.$clone();
                    } else {
                        if (this.Step === StealEggGame.TutorialStep.Hatch) {
                            target = this.incubators.Count > 0 && UnityEngine.Object.op_Implicit(this.incubators.getItem(0).obj) ? this.incubators.getItem(0).obj.position.$clone() : this.CoopCenter.$clone();
                        } else {
                            if (this.Step === StealEggGame.TutorialStep.Equip) {
                                target = this.CoopCenter.$clone();
                            } else {
                                if (this.Step === StealEggGame.TutorialStep.Train) {
                                    target = this.MyHouse.TrainSlot.position.$clone();
                                }
                            }
                        }
                    }
                }
                this.guide.enabled = show;
                this.guide.SetPosition(0, this.player.position.$clone().add( pc.Vec3.UP.clone().clone().scale( 0.1 ) ));
                this.guide.SetPosition(1, new pc.Vec3( target.x, this.player.position.y + 0.1, target.z ));
            },
            /*StealEggGame.UpdateGuide end.*/

            /*StealEggGame.Rule start.*/
            Rule: function (zone, variant) {
if ( TRACE ) { TRACE( "StealEggGame#Rule", this ); }

                return zone.eggRules != null && variant < zone.eggRules.length ? zone.eggRules[variant] : null;
            },
            /*StealEggGame.Rule end.*/

            /*StealEggGame.RollEgg start.*/
            RollEgg: function (zone) {
if ( TRACE ) { TRACE( "StealEggGame#RollEgg", this ); }

                if (zone.eggRules == null || zone.eggRules.length === 0) {
                    return UnityEngine.Random.Range(0, zone.eggPrefabs.length);
                }
                var weights = System.Array.init(zone.eggRules.length, 0, System.Single);
                for (var i = 0; i < weights.length; i = (i + 1) | 0) {
                    weights[i] = zone.eggRules[i].spawnWeight;
                }
                return PlayableEggRules.Pick(weights, weights.length);
            },
            /*StealEggGame.RollEgg end.*/

            /*StealEggGame.UpdateSafeArea start.*/
            UpdateSafeArea: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateSafeArea", this ); }

                if (!UnityEngine.Object.op_Implicit(this.safeUI) || UnityEngine.Screen.width === 0 || UnityEngine.Screen.height === 0) {
                    return;
                }
                var s = UnityEngine.Screen.safeArea.$clone();
                this.safeUI.anchorMin = new pc.Vec2( s.xMin / UnityEngine.Screen.width, s.yMin / UnityEngine.Screen.height );
                this.safeUI.anchorMax = new pc.Vec2( s.xMax / UnityEngine.Screen.width, s.yMax / UnityEngine.Screen.height );
            },
            /*StealEggGame.UpdateSafeArea end.*/

            /*StealEggGame.BindSceneUI start.*/
            BindSceneUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#BindSceneUI", this ); }

                if (!UnityEngine.Object.op_Implicit(this.safeUI) || !UnityEngine.Object.op_Implicit(this.joystick)) {
                    throw new System.InvalidOperationException.$ctor1("Scene UI is missing. Bake the UI in the Unity Editor before playing.");
                }
                if (UnityEngine.Object.op_Implicit(this.jumpButton)) {
                    this.BindSceneButton(this.jumpButton.transform, Bridge.fn.cacheBind(this, this.Jump));
                }
                this.UpdateSafeArea();
            },
            /*StealEggGame.BindSceneUI end.*/

            /*StealEggGame.BindSceneButton start.*/
            BindSceneButton: function (target, action) {
if ( TRACE ) { TRACE( "StealEggGame#BindSceneButton", this ); }

                if (!UnityEngine.Object.op_Implicit(target)) {
                    return;
                }
                var button = target.GetComponent(UnityEngine.UI.Button);
                if (!UnityEngine.Object.op_Implicit(button)) {
                    throw new System.InvalidOperationException.$ctor1("Missing scene Button: " + (target.name || ""));
                }
                button.onClick.RemoveAllListeners();
                button.onClick.AddListener(action);
            },
            /*StealEggGame.BindSceneButton end.*/

            /*StealEggGame.SlotsAt start.*/
            SlotsAt: function (level) {
if ( TRACE ) { TRACE( "StealEggGame#SlotsAt", this ); }

                return ((((this.coopBaseSlots + level) | 0) - 1) | 0);
            },
            /*StealEggGame.SlotsAt end.*/

            /*StealEggGame.Price start.*/
            Price: function (value) {
if ( TRACE ) { TRACE( "StealEggGame#Price", this ); }

                return value * this.priceMultiplier;
            },
            /*StealEggGame.Price end.*/

            /*StealEggGame.StartHome start.*/
            StartHome: function () {
if ( TRACE ) { TRACE( "StealEggGame#StartHome", this ); }

                var bigPetHouse = UnityEngine.Random.Range(1, this.houses.length);
                var largestPetSize = 0;
                for (var p = 0; p < this.petCatalog.length; p = (p + 1) | 0) {
                    largestPetSize = UnityEngine.Mathf.Max(largestPetSize, this.MaxPetSize(p));
                }
                for (var h = 0; h < this.houses.length; h = (h + 1) | 0) {
                    var house = this.houses[h];
                    if (h === 0) {
                        this.ShowCoopModel(house, this.coopModelByLevel[0]);
                        this.ShowTreadmill(house, 1);
                        continue;
                    }
                    this.ShowCoopModel(house, UnityEngine.Random.Range(1, ((house.coopModels.length + 1) | 0)));
                    this.ShowTreadmill(house, UnityEngine.Random.Range(1, ((house.treadmills.length + 1) | 0)));
                    // One random NPC coop shows a single pet at the largest size any pet can reach; the others hold two small ones.
                    var big = h === bigPetHouse;
                    var pool = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    for (var p1 = 0; p1 < this.petCatalog.length; p1 = (p1 + 1) | 0) {
                        if (!big || this.MaxPetSize(p1) >= largestPetSize) {
                            pool.add(p1);
                        }
                    }
                    for (var i = 0; i < (big ? 1 : this.npcCoopSmallPets) && pool.Count > 0; i = (i + 1) | 0) {
                        var pet = pool.getItem(UnityEngine.Random.Range(0, pool.Count));
                        var decor = this.SpawnCoopPet(this.PetItem(pet, big ? this.LargestPetSize(pet) : this.RollSmallPetSize(pet)), house.Coop, house.petContainer);
                        if (decor != null) {
                            this.decorPets.add(decor);
                        }
                    }
                }
                this.playerCoopArea = this.MyHouse.Coop;
                this.trainingPoint = this.MyHouse.TrainSlot;
                this.RefreshPads();
            },
            /*StealEggGame.StartHome end.*/

            /*StealEggGame.RollPetSize start.*/
            RollPetSize: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#RollPetSize", this ); }

                var $t, $t1, $t2;
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        $t1 = Bridge.getEnumerator(zone.eggRules);
                        try {
                            while ($t1.moveNext()) {
                                var rule = $t1.Current;
                                if (rule.petIds != null) {
                                    $t2 = Bridge.getEnumerator(rule.petIds);
                                    try {
                                        while ($t2.moveNext()) {
                                            var id = $t2.Current;
                                            if (id === pet) {
                                                return rule.RollSize();
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t2, System.IDisposable)) {
                                            $t2.System$IDisposable$Dispose();
                                        }
                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return 1;
            },
            /*StealEggGame.RollPetSize end.*/

            /*StealEggGame.RollSmallPetSize start.*/
            RollSmallPetSize: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#RollSmallPetSize", this ); }

                for (var i = 0; i < 64; i = (i + 1) | 0) {
                    var size = this.RollPetSize(pet);
                    if (size < this.npcCoopBigPetSize) {
                        return size;
                    }
                }
                return 1;
            },
            /*StealEggGame.RollSmallPetSize end.*/

            /*StealEggGame.LargestPetSize start.*/
            LargestPetSize: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#LargestPetSize", this ); }

                var $t, $t1, $t2;
                var top = pc.Vec2.ONE.clone();
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        $t1 = Bridge.getEnumerator(zone.eggRules);
                        try {
                            while ($t1.moveNext()) {
                                var rule = $t1.Current;
                                if (rule.petIds != null && System.Array.indexOfT(rule.petIds, pet) >= 0 && rule.sizeRanges != null) {
                                    $t2 = Bridge.getEnumerator(rule.sizeRanges);
                                    try {
                                        while ($t2.moveNext()) {
                                            var range = $t2.Current.$clone();
                                            if (UnityEngine.Mathf.Max(range.x, range.y) > UnityEngine.Mathf.Max(top.x, top.y)) {
                                                top = range.$clone();
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t2, System.IDisposable)) {
                                            $t2.System$IDisposable$Dispose();
                                        }
                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return UnityEngine.Random.Range$1(UnityEngine.Mathf.Min(top.x, top.y), UnityEngine.Mathf.Max(top.x, top.y));
            },
            /*StealEggGame.LargestPetSize end.*/

            /*StealEggGame.MaxPetSize start.*/
            MaxPetSize: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#MaxPetSize", this ); }

                var $t, $t1, $t2;
                var max = 1;
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        $t1 = Bridge.getEnumerator(zone.eggRules);
                        try {
                            while ($t1.moveNext()) {
                                var rule = $t1.Current;
                                if (rule.petIds != null && System.Array.indexOfT(rule.petIds, pet) >= 0 && rule.sizeRanges != null) {
                                    $t2 = Bridge.getEnumerator(rule.sizeRanges);
                                    try {
                                        while ($t2.moveNext()) {
                                            var range = $t2.Current.$clone();
                                            max = UnityEngine.Mathf.Max(max, range.x, range.y);
                                        }
                                    } finally {
                                        if (Bridge.is($t2, System.IDisposable)) {
                                            $t2.System$IDisposable$Dispose();
                                        }
                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return max;
            },
            /*StealEggGame.MaxPetSize end.*/

            /*StealEggGame.ShowCoopModel start.*/
            ShowCoopModel: function (house, id) {
if ( TRACE ) { TRACE( "StealEggGame#ShowCoopModel", this ); }

                house.coopModel = id;
                for (var i = 0; i < house.coopModels.length; i = (i + 1) | 0) {
                    if (UnityEngine.Object.op_Implicit(house.coopModels[i])) {
                        house.coopModels[i].gameObject.SetActive(i === ((id - 1) | 0));
                    }
                }
            },
            /*StealEggGame.ShowCoopModel end.*/

            /*StealEggGame.ShowTreadmill start.*/
            ShowTreadmill: function (house, level) {
if ( TRACE ) { TRACE( "StealEggGame#ShowTreadmill", this ); }

                house.treadmill = level;
                for (var i = 0; i < house.treadmills.length; i = (i + 1) | 0) {
                    if (UnityEngine.Object.op_Implicit(house.treadmills[i])) {
                        house.treadmills[i].gameObject.SetActive(i === ((level - 1) | 0));
                    }
                }
            },
            /*StealEggGame.ShowTreadmill end.*/

            /*StealEggGame.RandomInCoop start.*/
            RandomInCoop: function (box) {
if ( TRACE ) { TRACE( "StealEggGame#RandomInCoop", this ); }

                var half = box.size.$clone().clone().scale( 0.5 );
                var local = box.center.$clone().add( new pc.Vec3( UnityEngine.Random.Range$1(-half.x, half.x) * 0.75, -half.y, UnityEngine.Random.Range$1(-half.z, half.z) * 0.75 ) );
                var point = box.transform.TransformPoint$1(local);
                var hit = { v : new UnityEngine.RaycastHit() };
                if (UnityEngine.Physics.Raycast$3(point.$clone().add( pc.Vec3.UP.clone().clone().scale( 3 ) ), pc.Vec3.DOWN.clone(), hit, 8, -1, UnityEngine.QueryTriggerInteraction.Ignore)) {
                    point.y = hit.v.point.y;
                }
                return point.$clone();
            },
            /*StealEggGame.RandomInCoop end.*/

            /*StealEggGame.SpawnCoopPet start.*/
            SpawnCoopPet: function (item, coop, parent) {
if ( TRACE ) { TRACE( "StealEggGame#SpawnCoopPet", this ); }

                var prefab = this.petCatalog[item.pet].prefab;
                if (!UnityEngine.Object.op_Implicit(prefab)) {
                    return null;
                }
                var obj = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, prefab, this.RandomInCoop(coop), new pc.Quat().setFromEulerAngles_Unity( 0, UnityEngine.Random.Range(0, 360), 0 ));
                StealEggGame.DisablePhysics(obj);
                obj.transform.localScale = obj.transform.localScale.$clone().clone().scale( item.size );
                if (UnityEngine.Object.op_Implicit(parent)) {
                    obj.transform.SetParent(parent, true);
                }
                this.ShowPetInfo(obj.transform, item);
                var pet = new StealEggGame.CoopPet();
                pet.item = item;
                pet.obj = obj.transform;
                pet.coop = coop;
                pet.animator = obj.GetComponentInChildren(UnityEngine.Animator);
                pet.target = obj.transform.position.$clone();
                pet.nextMove = UnityEngine.Time.time + UnityEngine.Random.Range$1(1.0, 4.0);
                return pet;
            },
            /*StealEggGame.SpawnCoopPet end.*/

            /*StealEggGame.ShowPetInfo start.*/
            ShowPetInfo: function (model, item) {
if ( TRACE ) { TRACE( "StealEggGame#ShowPetInfo", this ); }

                var $t;
                var content = model.Find("UI_Info/Content");
                if (!UnityEngine.Object.op_Implicit(content)) {
                    return;
                }
                // DisablePhysics hides every label on a spawned model; the info labels are wanted here.
                $t = Bridge.getEnumerator(content.GetComponentsInChildren$1(TMPro.TMP_Text, true));
                try {
                    while ($t.moveNext()) {
                        var label = $t.Current;
                        label.gameObject.SetActive(true);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                StealEggGame.SetText(StealEggGame.ChildText(content, "Name"), System.String.replaceAll(this.petCatalog[item.pet].name, String.fromCharCode(95), String.fromCharCode(32)));
                this.SetRarityText(StealEggGame.ChildText(content, "Rarity"), this.petCatalog[item.pet].rarity);
                StealEggGame.SetText(StealEggGame.ChildText(content, "Income"), "$" + (StealEggGame.Num(item.income) || "") + "/s");
                this.petInfos.add(content);
            },
            /*StealEggGame.ShowPetInfo end.*/

            /*StealEggGame.UpdatePetInfos start.*/
            UpdatePetInfos: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdatePetInfos", this ); }

                var eye = this.gameCamera.transform.position.$clone();
                for (var i = (this.petInfos.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var info = this.petInfos.getItem(i);
                    if (!UnityEngine.Object.op_Implicit(info)) {
                        this.petInfos.removeAt(i);
                        continue;
                    }
                    var range = 50 * UnityEngine.Mathf.Max(1, info.lossyScale.x / 3);
                    var direction = info.position.$clone().sub( eye );
                    if (direction.lengthSq() <= range * range && direction.lengthSq() > 0.0001) {
                        info.rotation = new pc.Quat().lookRotation( direction, pc.Vec3.UP );
                    }
                }
            },
            /*StealEggGame.UpdatePetInfos end.*/

            /*StealEggGame.MoveCoopPet start.*/
            MoveCoopPet: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#MoveCoopPet", this ); }

                if (!UnityEngine.Object.op_Implicit(pet.obj)) {
                    return;
                }
                if (UnityEngine.Time.time >= pet.nextMove) {
                    pet.target = this.RandomInCoop(pet.coop);
                    pet.nextMove = UnityEngine.Time.time + UnityEngine.Random.Range$1(8.0, 12.0);
                }
                var to = pet.target.$clone().sub( pet.obj.position );
                to.y = 0;
                var moving = to.length() > 0.2;
                if (moving) {
                    pet.obj.rotation = new pc.Quat().slerpUnclamped( pet.obj.rotation, new pc.Quat().lookRotation( to, pc.Vec3.UP ), pc.math.clamp( UnityEngine.Time.deltaTime * 4, 0, 1 ) );
                    var next = pc.Vec3.moveTowards( pet.obj.position, new pc.Vec3( pet.target.x, pet.obj.position.y, pet.target.z ), 2 * UnityEngine.Time.deltaTime );
                    pet.obj.position = next.$clone();
                }
                if (UnityEngine.Object.op_Implicit(pet.animator)) {
                    StealEggGame.SetAnimatorMovement(pet.animator, moving ? 1 : 0);
                }
            },
            /*StealEggGame.MoveCoopPet end.*/

            /*StealEggGame.UpdateHome start.*/
            UpdateHome: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateHome", this ); }

                var $t, $t1;
                $t = Bridge.getEnumerator(this.coopPets);
                try {
                    while ($t.moveNext()) {
                        var pet = $t.Current;
                        this.MoveCoopPet(pet);
                        pet.incomeClock += UnityEngine.Time.deltaTime;
                        if (pet.incomeClock >= 1) {
                            pet.incomeClock -= 1;
                            this.AddMoney(pet.item.income);
                            this.IncomePopup(pet.obj.position, pet.item.income);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                $t1 = Bridge.getEnumerator(this.decorPets);
                try {
                    while ($t1.moveNext()) {
                        var pet1 = $t1.Current;
                        this.MoveCoopPet(pet1);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                for (var i = (this.incubators.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    this.UpdateIncubator(this.incubators.getItem(i));
                }
                for (var i1 = (this.flying.Count - 1) | 0; i1 >= 0; i1 = (i1 - 1) | 0) {
                    this.UpdateFlyingPet(this.flying.getItem(i1));
                }
                if (UnityEngine.Object.op_Implicit(this.incubateUI.root) && this.incubateUI.root.activeSelf) {
                    this.RefreshIncubatePopup(false);
                }
            },
            /*StealEggGame.UpdateHome end.*/

            /*StealEggGame.IncubateHand start.*/
            IncubateHand: function () {
if ( TRACE ) { TRACE( "StealEggGame#IncubateHand", this ); }

                if (this.hand == null || this.hand.kind !== StealEggGame.ItemKind.Egg || !this.InsideMyCoop) {
                    return;
                }
                var item = this.hand;
                this.RemoveItem(item);
                this.StartIncubation(item, this.player.position.$clone().add( this.player.forward ), new pc.Quat().lookRotation( this.player.forward, pc.Vec3.UP ));
            },
            /*StealEggGame.IncubateHand end.*/

            /*StealEggGame.IncubateFromBag start.*/
            IncubateFromBag: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#IncubateFromBag", this ); }

                this.RemoveItem(item);
                this.StartIncubation(item, this.RandomInCoop(this.MyHouse.Coop), pc.Quat.IDENTITY.clone());
            },
            /*StealEggGame.IncubateFromBag end.*/

            /*StealEggGame.StartIncubation start.*/
            StartIncubation: function (item, point, rotation) {
if ( TRACE ) { TRACE( "StealEggGame#StartIncubation", this ); }

                var $t, $t1;
                var incubator = new StealEggGame.Incubator();
                incubator.item = item;
                var obj = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t = item.zone.eggPrefabs)[item.variant], point, rotation);
                StealEggGame.DisablePhysics(obj);
                var hit = { v : new UnityEngine.RaycastHit() };
                if (UnityEngine.Physics.Raycast$3(point.$clone().add( pc.Vec3.UP.clone().clone().scale( 2 ) ), pc.Vec3.DOWN.clone(), hit, 6, -1, UnityEngine.QueryTriggerInteraction.Ignore) && !hit.v.transform.IsChildOf(this.player)) {
                    obj.transform.position = hit.v.point.$clone();
                }
                incubator.obj = obj.transform;
                incubator.rotation = obj.transform.rotation.$clone();
                incubator.startScale = new pc.Vec3( 1, 1, 1 );
                incubator.endScale = new pc.Vec3( 1, 1, 1 ).clone().scale( Math.max(1, Math.min(item.size / 5, 6)) );
                obj.transform.localScale = incubator.startScale.$clone();
                var rule = this.ItemRule(item);
                incubator.duration = !this.TutorialCompleted ? 3 : rule != null ? rule.incubationTime : this.incubationSeconds;
                if (UnityEngine.Object.op_Implicit(this.incubateTimerPrefab)) {
                    var timer = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.incubateTimerPrefab);
                    $t1 = Bridge.getEnumerator(timer.GetComponentsInChildren(UnityEngine.Collider, true));
                    try {
                        while ($t1.moveNext()) {
                            var c = $t1.Current;
                            c.enabled = false;
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                    incubator.timer = timer.transform;
                    incubator.label = timer.GetComponentInChildren(TMPro.TMP_Text, true);
                }
                this.incubators.add(incubator);
                this.PlaySound(this.equipSound);
                if (UnityEngine.Object.op_Implicit(LunaController.Instance)) {
                    LunaController.Instance.EggIncubated();
                }
                if (this.Step === StealEggGame.TutorialStep.Incubate) {
                    this.SetStep(StealEggGame.TutorialStep.Hatch);
                }
            },
            /*StealEggGame.StartIncubation end.*/

            /*StealEggGame.UpdateIncubator start.*/
            UpdateIncubator: function (incubator) {
if ( TRACE ) { TRACE( "StealEggGame#UpdateIncubator", this ); }

                if (!UnityEngine.Object.op_Implicit(incubator.obj)) {
                    return;
                }
                if (incubator.opening) {
                    if (UnityEngine.Object.op_Implicit(incubator.timer)) {
                        UnityEngine.MonoBehaviour.Destroy(incubator.timer.gameObject);
                        incubator.timer = null;
                    }
                    incubator.openClock += UnityEngine.Time.deltaTime;
                    var progress = Math.max(0, Math.min(1, incubator.openClock / UnityEngine.Mathf.Max(0.1, this.hatchDuration)));
                    incubator.obj.rotation = incubator.rotation.clone().mul( new pc.Quat().setFromEulerAngles_Unity( 0, 0, Math.sin(progress * 42) * pc.math.lerp(4, 22, progress) ) );
                    if (progress >= 1) {
                        this.CompleteHatch(incubator);
                    }
                    return;
                }
                if (!incubator.ready) {
                    incubator.clock += UnityEngine.Time.deltaTime * this.IncubateTick;
                    var ratio = Math.max(0, Math.min(1, incubator.clock / incubator.duration));
                    incubator.obj.localScale = new pc.Vec3().lerp( incubator.startScale, incubator.endScale, ratio );
                    if (ratio >= 1) {
                        incubator.ready = true;
                    }
                }
                if (UnityEngine.Object.op_Implicit(incubator.timer)) {
                    incubator.timer.position = new pc.Vec3( incubator.obj.position.x, StealEggGame.TopOf(incubator.obj) + 0.6, incubator.obj.position.z );
                    incubator.timer.rotation = this.gameCamera.transform.rotation.$clone();
                    // Ready to hatch: the label above the egg reads "Open" until the egg is opened.
                    if (UnityEngine.Object.op_Implicit(incubator.label)) {
                        incubator.label.text = incubator.ready ? "Open" : StealEggGame.Clock(incubator.duration - incubator.clock);
                    }
                }
            },
            /*StealEggGame.UpdateIncubator end.*/

            /*StealEggGame.Hatch start.*/
            Hatch: function (incubator) {
if ( TRACE ) { TRACE( "StealEggGame#Hatch", this ); }

                if (incubator == null || !incubator.ready || incubator.opening) {
                    return;
                }
                incubator.opening = true;
                incubator.openClock = 0;
                this.PlaySound(this.crackSound);
                if (UnityEngine.Object.op_Implicit(LunaController.Instance)) {
                    LunaController.Instance.EggHatched();
                }
            },
            /*StealEggGame.Hatch end.*/

            /*StealEggGame.RollPet start.*/
            RollPet: function (rule, zone, variant) {
if ( TRACE ) { TRACE( "StealEggGame#RollPet", this ); }

                if (rule != null && rule.petIds != null && rule.petIds.length > 0) {
                    return rule.petIds[PlayableEggRules.Pick(rule.petWeights, rule.petIds.length)];
                }
                var prefab = rule != null && rule.pets.length > 0 ? rule.pets[PlayableEggRules.Pick(rule.petWeights, rule.pets.length)] : zone.petPrefabs.length > 0 ? zone.petPrefabs[variant % zone.petPrefabs.length] : null;
                for (var i = 0; i < this.petCatalog.length; i = (i + 1) | 0) {
                    if (UnityEngine.GameObject.op_Equality(this.petCatalog[i].prefab, prefab)) {
                        return i;
                    }
                }
                return this.petCatalog.length > 0 ? 0 : -1;
            },
            /*StealEggGame.RollPet end.*/

            /*StealEggGame.CompleteHatch start.*/
            CompleteHatch: function (incubator) {
if ( TRACE ) { TRACE( "StealEggGame#CompleteHatch", this ); }

                var $t;
                this.incubators.remove(incubator);
                var position = incubator.obj.position.$clone();
                if (UnityEngine.Object.op_Implicit(this.eggBreakEffect)) {
                    var effect = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.eggBreakEffect, position, pc.Quat.IDENTITY.clone());
                    effect.transform.localScale = incubator.obj.localScale.$clone();
                    effect.SetActive(true);
                    $t = Bridge.getEnumerator(effect.GetComponentsInChildren(UnityEngine.ParticleSystem, true));
                    try {
                        while ($t.moveNext()) {
                            var particles = $t.Current;
                            particles.Play();
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    this.Destroy(effect, 4);
                }
                this.PlaySound(this.hatchSound);
                var egg = incubator.item;
                var pet = this.RollPet(this.ItemRule(egg), egg.zone, egg.variant);
                UnityEngine.MonoBehaviour.Destroy(incubator.obj.gameObject);
                if (UnityEngine.Object.op_Implicit(incubator.timer)) {
                    UnityEngine.MonoBehaviour.Destroy(incubator.timer.gameObject);
                }
                if (pet < 0) {
                    return;
                }
                var item = this.PetItem(pet, egg.size);
                this.RegisterIndex(pet);
                var model = UnityEngine.Object.op_Implicit(this.petCatalog[pet].prefab) ? UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.petCatalog[pet].prefab, position, new pc.Quat().lookRotation( pc.Vec3.equals( this.player.position.$clone().sub( position ), pc.Vec3.ZERO.clone() ) ? new pc.Vec3( 0, 0, 1 ) : pc.Vec3.projectOnPlane( this.player.position.$clone().sub( position ), pc.Vec3.UP.clone() ), pc.Vec3.UP )) : null;
                if (UnityEngine.Object.op_Implicit(model)) {
                    StealEggGame.DisablePhysics(model);
                    model.transform.localScale = model.transform.localScale.$clone().clone().scale( egg.size );
                    this.ShowPetInfo(model.transform, item);
                }
                var fly = new StealEggGame.FlyingPet();
                fly.item = item;
                fly.obj = UnityEngine.Object.op_Implicit(model) ? model.transform : null;
                fly.from = position.$clone();
                fly.scale = UnityEngine.Object.op_Implicit(model) ? model.transform.localScale.$clone() : new pc.Vec3( 1, 1, 1 );
                this.flying.add(fly);
                if (this.Step === StealEggGame.TutorialStep.Hatch) {
                    this.SetStep(StealEggGame.TutorialStep.Equip);
                }
            },
            /*StealEggGame.CompleteHatch end.*/

            /*StealEggGame.UpdateFlyingPet start.*/
            UpdateFlyingPet: function (fly) {
if ( TRACE ) { TRACE( "StealEggGame#UpdateFlyingPet", this ); }

                fly.clock += UnityEngine.Time.deltaTime;
                var t = Math.max(0, Math.min(1, (fly.clock - 3) / 1));
                if (UnityEngine.Object.op_Implicit(fly.obj) && t > 0) {
                    var target = this.player.position.$clone().add( pc.Vec3.UP.clone() );
                    var p = new pc.Vec3().lerp( fly.from, target, t );
                    p.y += Math.sin(t * UnityEngine.Mathf.PI) * 3;
                    fly.obj.position = p.$clone();
                    fly.obj.localScale = new pc.Vec3().lerp( fly.scale, pc.Vec3.ZERO.clone(), t );
                }
                if (t < 1) {
                    return;
                }
                this.flying.remove(fly);
                if (UnityEngine.Object.op_Implicit(fly.obj)) {
                    UnityEngine.MonoBehaviour.Destroy(fly.obj.gameObject);
                }
                this.AddItem(fly.item, true);
                if (!this.IsCarrying) {
                    this.EquipHand(fly.item);
                }
            },
            /*StealEggGame.UpdateFlyingPet end.*/

            /*StealEggGame.NearestIncubator start.*/
            NearestIncubator: function (readyOnly) {
if ( TRACE ) { TRACE( "StealEggGame#NearestIncubator", this ); }

                var $t;
                var best = null;
                var distance = 2.5;
                $t = Bridge.getEnumerator(this.incubators);
                try {
                    while ($t.moveNext()) {
                        var incubator = $t.Current;
                        if (!UnityEngine.Object.op_Implicit(incubator.obj) || incubator.opening || (readyOnly && !incubator.ready)) {
                            continue;
                        }
                        var d = StealEggGame.FlatDistance(this.player.position.$clone(), incubator.obj.position.$clone());
                        if (d < distance) {
                            distance = d;
                            best = incubator;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return best;
            },
            /*StealEggGame.NearestIncubator end.*/

            /*StealEggGame.EquipPetToCoop start.*/
            EquipPetToCoop: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#EquipPetToCoop", this ); }

                if (item == null || item.kind !== StealEggGame.ItemKind.Pet) {
                    return false;
                }
                if (this.coopPets.Count >= this.MaxSlots) {
                    this.ShowDialog("you do not have enough slots");
                    return false;
                }
                this.RemoveItem(item);
                var pet = this.SpawnCoopPet(item, this.MyHouse.Coop, this.MyHouse.petContainer);
                if (pet != null) {
                    this.coopPets.add(pet);
                }
                this.PlaySound(this.equipSound);
                this.RefreshPetsPopup();
                if (this.Step === StealEggGame.TutorialStep.Equip) {
                    this.SetStep(StealEggGame.TutorialStep.Train);
                }
                if (this.TutorialCompleted && !this.endCardShown && this.capturesForEndCard > 0 && this.coopPets.Count >= this.capturesForEndCard) {
                    this.endCardShown = true;
                }
                return true;
            },
            /*StealEggGame.EquipPetToCoop end.*/

            /*StealEggGame.EquipHandPet start.*/
            EquipHandPet: function () {
if ( TRACE ) { TRACE( "StealEggGame#EquipHandPet", this ); }

                if (this.hand != null && this.hand.kind === StealEggGame.ItemKind.Pet && this.InsideMyCoop) {
                    this.EquipPetToCoop(this.hand);
                }
            },
            /*StealEggGame.EquipHandPet end.*/

            /*StealEggGame.UnequipCoopPet start.*/
            UnequipCoopPet: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#UnequipCoopPet", this ); }

                this.coopPets.remove(pet);
                if (UnityEngine.Object.op_Implicit(pet.obj)) {
                    UnityEngine.MonoBehaviour.Destroy(pet.obj.gameObject);
                }
                this.AddItem(pet.item, true);
                this.RefreshPetsPopup();
            },
            /*StealEggGame.UnequipCoopPet end.*/

            /*StealEggGame.EquipBest start.*/
            EquipBest: function () {
if ( TRACE ) { TRACE( "StealEggGame#EquipBest", this ); }

                var $t, $t1, $t2;
                $t = Bridge.getEnumerator(this.coopPets);
                try {
                    while ($t.moveNext()) {
                        var pet = $t.Current;
                        if (UnityEngine.Object.op_Implicit(pet.obj)) {
                            UnityEngine.MonoBehaviour.Destroy(pet.obj.gameObject);
                        }
                        this.items.add(pet.item);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.coopPets.clear();
                var pets = new (System.Collections.Generic.List$1(StealEggGame.Item)).ctor();
                $t1 = Bridge.getEnumerator(this.items);
                try {
                    while ($t1.moveNext()) {
                        var item = $t1.Current;
                        if (item.kind === StealEggGame.ItemKind.Pet) {
                            pets.add(item);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                pets.Sort$2(function (a, b) {
                    return Bridge.compare(b.income, a.income);
                });
                for (var i = 0; i < pets.Count && i < this.MaxSlots; i = (i + 1) | 0) {
                    this.items.remove(pets.getItem(i));
                    this.quick.remove(pets.getItem(i));
                    if (Bridge.referenceEquals(this.hand, pets.getItem(i))) {
                        this.UnequipHand();
                    }
                    var pet1 = this.SpawnCoopPet(pets.getItem(i), this.MyHouse.Coop, this.MyHouse.petContainer);
                    if (pet1 != null) {
                        this.coopPets.add(pet1);
                    }
                }
                $t2 = Bridge.getEnumerator(this.items);
                try {
                    while ($t2.moveNext()) {
                        var item1 = $t2.Current;
                        if (item1.kind === StealEggGame.ItemKind.Pet && !this.quick.contains(item1) && this.quick.Count < this.QuickSlotCount) {
                            this.quick.add(item1);
                        }
                    }
                } finally {
                    if (Bridge.is($t2, System.IDisposable)) {
                        $t2.System$IDisposable$Dispose();
                    }
                }
                this.PlaySound(this.equipSound);
                this.RefreshInventoryUI();
                this.RefreshPetsPopup();
            },
            /*StealEggGame.EquipBest end.*/

            /*StealEggGame.BeginTraining start.*/
            BeginTraining: function () {
if ( TRACE ) { TRACE( "StealEggGame#BeginTraining", this ); }

                var slot = this.MyHouse.TrainSlot;
                this.training = true;
                this.trainingClock = 0;
                this.motor.enabled = false;
                this.player.position = slot.position.$clone();
                this.player.rotation = slot.rotation.$clone();
                this.motor.enabled = true;
                this.joystick.ResetInput();
                if (this.Step === StealEggGame.TutorialStep.Train) {
                    this.SetStep(StealEggGame.TutorialStep.Done);
                }
            },
            /*StealEggGame.BeginTraining end.*/

            /*StealEggGame.UpdateTraining start.*/
            UpdateTraining: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateTraining", this ); }

                if (this.joystick.Value.lengthSq() > 0.05 || UnityEngine.Input.GetAxisRaw("Horizontal") !== 0 || UnityEngine.Input.GetAxisRaw("Vertical") !== 0) {
                    this.training = false;
                    return;
                }
                this.playerForward = 1;
                this.trainingClock += UnityEngine.Time.deltaTime;
                if (this.trainingClock < this.trainTick) {
                    return;
                }
                this.trainingClock -= this.trainTick;
                var gain = this.treadmillTrainValues[Math.max(0, Math.min(((this.MyHouse.treadmill - 1) | 0), ((this.treadmillTrainValues.length - 1) | 0)))] * this.BoostMultiplier(0);
                this.AddSpeedPower(gain);
                this.PlaySound(this.trainSound);
                this.FloatText(this.player.position.$clone().add( this.player.right.$clone().clone().scale( 2 ) ).add( pc.Vec3.UP.clone().clone().scale( 2 ) ), "+" + (StealEggGame.Num(gain) || ""), this.speedIcon);
            },
            /*StealEggGame.UpdateTraining end.*/

            /*StealEggGame.BindHomeUI start.*/
            BindHomeUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#BindHomeUI", this ); }

                this.Bind(this.treadmillUI.close, Bridge.fn.cacheBind(this, this.CloseModal), true);
                this.Bind(this.treadmillUI.upgrade, Bridge.fn.cacheBind(this, this.UpgradeTreadmill));
                StealEggGame.Show$1(this.treadmillUI.root, false);
                this.Bind(this.petsUI.close, Bridge.fn.cacheBind(this, this.CloseModal), true);
                this.Bind(this.petsUI.equipBest, Bridge.fn.cacheBind(this, this.EquipBest));
                this.Bind(this.petsUI.upgradeSlot, Bridge.fn.cacheBind(this, this.UpgradeCoop));
                this.Bind(this.incubateUI.close, Bridge.fn.cacheBind(this, this.CloseModal), true);
                this.Bind(this.hudUI.equipMonster, Bridge.fn.bind(this, function () {
                    if (!this.TutorialCompleted) {
                        this.ShowDialog("You must finish tutorial first");
                        return;
                    }
                    this.OpenModal(this.petsUI.root);
                    this.RefreshPetsPopup();
                }));
                this.Bind(this.hudUI.incubateEgg, Bridge.fn.bind(this, function () {
                    if (!this.TutorialCompleted) {
                        this.ShowDialog("You must finish tutorial first");
                        return;
                    }
                    this.OpenModal(this.incubateUI.root);
                    this.RefreshIncubatePopup(true);
                }));
                StealEggGame.Show$1(this.petsUI.root, false);
                StealEggGame.Show$1(this.incubateUI.root, false);
            },
            /*StealEggGame.BindHomeUI end.*/

            /*StealEggGame.UpgradeCoop start.*/
            UpgradeCoop: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpgradeCoop", this ); }

                var $t;
                if (this.coopLevel >= this.MaxCoopLevel) {
                    return;
                }
                if (!this.SpendMoney(this.Price(this.coopPrices[this.coopLevel]))) {
                    return;
                }
                this.coopLevel = (this.coopLevel + 1) | 0;
                this.ShowCoopModel(this.MyHouse, this.coopModelByLevel[((UnityEngine.Mathf.Min(this.coopLevel, this.coopModelByLevel.length) - 1) | 0)]);
                var coop = this.MyHouse.Coop;
                this.playerCoopArea = coop;
                $t = Bridge.getEnumerator(this.coopPets);
                try {
                    while ($t.moveNext()) {
                        var pet = $t.Current;
                        pet.coop = coop;
                        pet.nextMove = 0;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.PlaySound(this.upgradeSound);
                this.RefreshPads();
                this.RefreshPetsPopup();
            },
            /*StealEggGame.UpgradeCoop end.*/

            /*StealEggGame.UpgradeTreadmill start.*/
            UpgradeTreadmill: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpgradeTreadmill", this ); }

                if (this.treadmillLevel >= this.MaxTreadmillLevel) {
                    return;
                }
                if (!this.SpendMoney(this.Price(this.treadmillPrices[this.treadmillLevel]))) {
                    return;
                }
                this.treadmillLevel = (this.treadmillLevel + 1) | 0;
                this.ShowTreadmill(this.MyHouse, this.treadmillLevel);
                this.trainingPoint = this.MyHouse.TrainSlot;
                this.PlaySound(this.upgradeSound);
                this.RefreshPads();
            },
            /*StealEggGame.UpgradeTreadmill end.*/

            /*StealEggGame.RefreshPads start.*/
            RefreshPads: function () {
if ( TRACE ) { TRACE( "StealEggGame#RefreshPads", this ); }

                this.SetPad(this.MyHouse.coopPad, this.coopLevel, this.MaxCoopLevel, this.coopLevel < this.MaxCoopLevel ? this.Price(this.coopPrices[this.coopLevel]) : 0);
                this.SetPad(this.MyHouse.treadmillPad, this.treadmillLevel, this.MaxTreadmillLevel, this.treadmillLevel < this.MaxTreadmillLevel ? this.Price(this.treadmillPrices[this.treadmillLevel]) : 0);
                if (UnityEngine.Object.op_Implicit(this.treadmillUI.root)) {
                    var max = this.treadmillLevel >= this.MaxTreadmillLevel;
                    StealEggGame.SetText(this.treadmillUI.level, max ? "" : "Level " + this.treadmillLevel + " -> " + (((this.treadmillLevel + 1) | 0)));
                    StealEggGame.SetText(this.treadmillUI.train, max ? "" : "Up to " + (StealEggGame.Num(this.treadmillTrainValues[UnityEngine.Mathf.Min(this.treadmillLevel, ((this.treadmillTrainValues.length - 1) | 0))]) || "") + "/step");
                    StealEggGame.Show$1(this.treadmillUI.max, max);
                    StealEggGame.Show(this.treadmillUI.upgrade, !max);
                    if (!max) {
                        StealEggGame.SetText(this.treadmillUI.price, "$" + (StealEggGame.Num(this.Price(this.treadmillPrices[this.treadmillLevel])) || ""));
                    }
                }
            },
            /*StealEggGame.RefreshPads end.*/

            /*StealEggGame.SetPad start.*/
            SetPad: function (pad, level, max, price) {
if ( TRACE ) { TRACE( "StealEggGame#SetPad", this ); }

                var $t;
                if (!UnityEngine.Object.op_Implicit(pad)) {
                    return;
                }
                $t = Bridge.getEnumerator(pad.GetComponentsInChildren$1(TMPro.TMP_Text, true));
                try {
                    while ($t.moveNext()) {
                        var label = $t.Current;
                        if (Bridge.referenceEquals(label.name, "Text_Price")) {
                            label.text = "$" + (StealEggGame.Num(price) || "");
                            label.gameObject.SetActive(level < max);
                        }
                        if (Bridge.referenceEquals(label.name, "Level")) {
                            label.text = level < max ? "Lv" + level + "->Lv" + (((level + 1) | 0)) : "MAXIMUM";
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*StealEggGame.SetPad end.*/

            /*StealEggGame.RefreshPetsPopup start.*/
            RefreshPetsPopup: function () {
if ( TRACE ) { TRACE( "StealEggGame#RefreshPetsPopup", this ); }

                var $t, $t1;
                if (!UnityEngine.Object.op_Implicit(this.petsUI.root) || !this.petsUI.root.activeSelf) {
                    return;
                }
                $t = Bridge.getEnumerator(this.petRows);
                try {
                    while ($t.moveNext()) {
                        var row = $t.Current;
                        UnityEngine.MonoBehaviour.Destroy(row);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.petRows.clear();
                $t1 = Bridge.getEnumerator(this.coopPets);
                try {
                    while ($t1.moveNext()) {
                        var pet = $t1.Current;
                        var captured = { v : pet };
                        var row1 = UnityEngine.Object.Instantiate$1(PetRowView, this.petsUI.template, this.petsUI.content, false);
                        row1.gameObject.SetActive(true);
                        this.petRows.add(row1.gameObject);
                        StealEggGame.SetText(row1.content, (this.petCatalog[pet.item.pet].name || "") + " - $" + (StealEggGame.Num(pet.item.income) || "") + "/s");
                        StealEggGame.SetImage(row1.thumbnail, this.petCatalog[pet.item.pet].thumbnail);
                        this.Bind(row1.unequip, (function ($me, captured) {
                            return Bridge.fn.bind($me, function () {
                                this.UnequipCoopPet(captured.v);
                            });
                        })(this, captured));
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                StealEggGame.SetText(this.petsUI.slots, "Slot: " + this.coopPets.Count + "/" + this.MaxSlots);
                var max = this.coopLevel >= this.MaxCoopLevel;
                StealEggGame.Show(this.petsUI.upgradeSlot, !max);
                if (!max) {
                    var price = this.Price(this.coopPrices[this.coopLevel]);
                    StealEggGame.SetText(this.petsUI.upgradePrice, "$" + (StealEggGame.Num(price) || ""));
                    StealEggGame.Show$1(this.petsUI.upgradeUnavailable, this.Money < price);
                }
            },
            /*StealEggGame.RefreshPetsPopup end.*/

            /*StealEggGame.RefreshIncubatePopup start.*/
            RefreshIncubatePopup: function (rebuild) {
if ( TRACE ) { TRACE( "StealEggGame#RefreshIncubatePopup", this ); }

                var $t, $t1;
                if (rebuild || this.incubateRows.Count !== this.incubators.Count) {
                    $t = Bridge.getEnumerator(this.incubateRows);
                    try {
                        while ($t.moveNext()) {
                            var row = $t.Current;
                            UnityEngine.MonoBehaviour.Destroy(row.gameObject);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    this.incubateRows.clear();
                    $t1 = Bridge.getEnumerator(this.incubators);
                    try {
                        while ($t1.moveNext()) {
                            var incubator = $t1.Current;
                            var captured = { v : incubator };
                            var row1 = UnityEngine.Object.Instantiate$1(IncubateRowView, this.incubateUI.template, this.incubateUI.content, false);
                            row1.gameObject.SetActive(true);
                            this.incubateRows.add(row1);
                            StealEggGame.SetImage(row1.thumbnail, this.ItemIcon(incubator.item));
                            this.Bind(row1.open, (function ($me, captured) {
                                return Bridge.fn.bind($me, function () {
                                    this.Hatch(captured.v);
                                    this.RefreshIncubatePopup(true);
                                });
                            })(this, captured));
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                }
                for (var i = 0; i < this.incubateRows.Count && i < this.incubators.Count; i = (i + 1) | 0) {
                    var row2 = this.incubateRows.getItem(i);
                    var incubator1 = this.incubators.getItem(i);
                    if (UnityEngine.Object.op_Implicit(row2.progressFill)) {
                        row2.progressFill.fillAmount = Math.max(0, Math.min(1, incubator1.clock / incubator1.duration));
                    }
                    StealEggGame.SetText(row2.content, incubator1.ready ? "" : StealEggGame.Clock(incubator1.duration - incubator1.clock));
                    StealEggGame.Show(row2.open, incubator1.ready && !incubator1.opening);
                    StealEggGame.Show$1(row2.opening, incubator1.opening);
                }
            },
            /*StealEggGame.RefreshIncubatePopup end.*/

            /*StealEggGame.AddItem start.*/
            AddItem: function (item, expose) {
if ( TRACE ) { TRACE( "StealEggGame#AddItem", this ); }

                this.items.add(item);
                if (expose && this.quick.Count < this.QuickSlotCount) {
                    this.quick.add(item);
                }
                if (item.kind === StealEggGame.ItemKind.Egg && !this.IsCarrying && this.hand == null) {
                    this.EquipHand(item);
                }
                this.RefreshInventoryUI();
            },
            /*StealEggGame.AddItem end.*/

            /*StealEggGame.RemoveItem start.*/
            RemoveItem: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#RemoveItem", this ); }

                this.items.remove(item);
                this.quick.remove(item);
                if (Bridge.referenceEquals(this.hand, item)) {
                    this.UnequipHand();
                }
                if (Bridge.referenceEquals(this.bagSelection, item)) {
                    this.bagSelection = null;
                }
                this.RefreshInventoryUI();
            },
            /*StealEggGame.RemoveItem end.*/

            /*StealEggGame.PetItem start.*/
            PetItem: function (pet, size) {
if ( TRACE ) { TRACE( "StealEggGame#PetItem", this ); }

                var item = new StealEggGame.Item();
                item.kind = StealEggGame.ItemKind.Pet;
                item.pet = pet;
                item.size = size;
                item.income = Math.max(1, Math.floor(this.petCatalog[pet].income * Math.pow(this.incomeMultiplierBySize, size)));
                return item;
            },
            /*StealEggGame.PetItem end.*/

            /*StealEggGame.ItemRule start.*/
            ItemRule: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#ItemRule", this ); }

                return item.kind === StealEggGame.ItemKind.Egg ? this.Rule(item.zone, item.variant) : null;
            },
            /*StealEggGame.ItemRule end.*/

            /*StealEggGame.ItemIcon start.*/
            ItemIcon: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#ItemIcon", this ); }

                if (item == null) {
                    return null;
                }
                if (item.kind === StealEggGame.ItemKind.Bat) {
                    return this.batIcon;
                }
                if (item.kind === StealEggGame.ItemKind.Pet) {
                    return this.petCatalog[item.pet].thumbnail;
                }
                var rule = this.ItemRule(item);
                return rule != null ? rule.thumbnail : null;
            },
            /*StealEggGame.ItemIcon end.*/

            /*StealEggGame.ItemName start.*/
            ItemName: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#ItemName", this ); }

                if (item.kind === StealEggGame.ItemKind.Bat) {
                    return "Ballbat";
                }
                if (item.kind === StealEggGame.ItemKind.Pet) {
                    return this.petCatalog[item.pet].name;
                }
                var rule = this.ItemRule(item);
                return rule != null ? System.String.replaceAll(rule.name, String.fromCharCode(95), String.fromCharCode(32)) : "Egg";
            },
            /*StealEggGame.ItemName end.*/

            /*StealEggGame.ItemModel start.*/
            ItemModel: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#ItemModel", this ); }

                var $t;
                var obj = null;
                if (item.kind === StealEggGame.ItemKind.Bat && UnityEngine.Object.op_Implicit(this.batPrefab)) {
                    obj = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.batPrefab);
                } else {
                    if (item.kind === StealEggGame.ItemKind.Pet && UnityEngine.Object.op_Implicit(this.petCatalog[item.pet].prefab)) {
                        obj = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.petCatalog[item.pet].prefab);
                        obj.transform.localScale = obj.transform.localScale.$clone().clone().scale( item.size );
                    } else if (item.kind === StealEggGame.ItemKind.Egg) {
                        obj = UnityEngine.Object.Instantiate(UnityEngine.GameObject, ($t = item.zone.eggPrefabs)[item.variant]);
                        obj.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( Math.max(1, Math.min(item.size / 5, 6)) );
                    }
                }
                if (UnityEngine.Object.op_Implicit(obj)) {
                    StealEggGame.DisablePhysics(obj);
                }
                if (UnityEngine.Object.op_Implicit(obj) && item.kind === StealEggGame.ItemKind.Pet) {
                    this.ShowPetInfo(obj.transform, item);
                }
                return obj;
            },
            /*StealEggGame.ItemModel end.*/

            /*StealEggGame.EquipHand start.*/
            EquipHand: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#EquipHand", this ); }

                if (this.IsCarrying || item == null) {
                    return;
                }
                this.UnequipHand();
                this.hand = item;
                this.handVisual = this.ItemModel(item);
                if (UnityEngine.Object.op_Implicit(this.handVisual)) {
                    this.handVisual.transform.SetParent(this.carryPoint, false);
                    this.handVisual.transform.localPosition = pc.Vec3.ZERO.clone();
                    this.handVisual.transform.localRotation = pc.Quat.IDENTITY.clone();
                    if (item.kind === StealEggGame.ItemKind.Pet) {
                        this.handVisual.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( 0.5 );
                    }
                }
                this.PlaySound(this.equipSound);
                this.RefreshInventoryUI();
            },
            /*StealEggGame.EquipHand end.*/

            /*StealEggGame.UnequipHand start.*/
            UnequipHand: function () {
if ( TRACE ) { TRACE( "StealEggGame#UnequipHand", this ); }

                if (UnityEngine.Object.op_Implicit(this.handVisual)) {
                    UnityEngine.MonoBehaviour.Destroy(this.handVisual);
                }
                this.hand = null;
                this.handVisual = null;
                this.RefreshInventoryUI();
            },
            /*StealEggGame.UnequipHand end.*/

            /*StealEggGame.UpdateHandVisual start.*/
            UpdateHandVisual: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateHandVisual", this ); }

                if (UnityEngine.Object.op_Implicit(this.rightHandSlot) && this.hand != null && this.hand.kind === StealEggGame.ItemKind.Bat && !this.IsCarrying) {
                    this.carryPoint.SetPositionAndRotation(this.rightHandSlot.position, this.rightHandSlot.rotation);
                } else {
                    if (UnityEngine.Object.op_Implicit(this.carryHand) && this.hand != null && !this.IsCarrying) {
                        var handPosition = { v : new UnityEngine.Vector3() };
                        var handRotation = { v : new UnityEngine.Quaternion() };
                        StealEggGame.BonePose(this.carryHand, this.player, handPosition, handRotation);
                        this.carryPoint.position = handPosition.v.$clone().add( pc.Vec3.UP.clone().clone().scale( 0.1 ) ).add( this.player.forward.$clone().clone().scale( 0.1 ) );
                        this.carryPoint.rotation = this.player.rotation.$clone();
                    } else if (UnityEngine.Object.op_Implicit(this.carryPoint)) {
                        this.carryPoint.localPosition = new pc.Vec3( 0, 1.5, 1.1 );
                        this.carryPoint.localRotation = pc.Quat.IDENTITY.clone();
                    }
                }
                this.ApplyBatSwing();
            },
            /*StealEggGame.UpdateHandVisual end.*/

            /*StealEggGame.BindInventoryUI start.*/
            BindInventoryUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#BindInventoryUI", this ); }

                var ui = this.inventoryUI;
                for (var i = 0; i < this.QuickSlotCount; i = (i + 1) | 0) {
                    var index = { v : i };
                    this.Bind(ui.quickSlots[i].button, (function ($me, index) {
                        return Bridge.fn.bind($me, function () {
                            this.TapQuickSlot(index.v);
                        });
                    })(this, index));
                    StealEggGame.Show(ui.quickSlots[i], false);
                }
                this.Bind(ui.bag, Bridge.fn.cacheBind(this, this.ToggleBag));
                this.Bind(ui.petEquip, Bridge.fn.bind(this, function () {
                    if (this.bagSelection != null && this.EquipPetToCoop(this.bagSelection)) {
                        this.RefreshBag();
                    }
                }));
                this.Bind(ui.petDrop, Bridge.fn.bind(this, function () {
                    if (this.bagSelection != null) {
                        this.RemoveItem(this.bagSelection);
                        this.RefreshBag();
                    }
                }));
                this.Bind(ui.eggIncubate, Bridge.fn.bind(this, function () {
                    if (this.bagSelection != null) {
                        this.IncubateFromBag(this.bagSelection);
                        this.RefreshBag();
                    }
                }));
                this.Bind(ui.eggDrop, Bridge.fn.bind(this, function () {
                    if (this.bagSelection != null) {
                        this.RemoveItem(this.bagSelection);
                        this.RefreshBag();
                    }
                }));
                this.Bind(ui.bagClose, Bridge.fn.cacheBind(this, this.CloseModal), true);
                StealEggGame.Show$1(ui.bagPopup, false);
            },
            /*StealEggGame.BindInventoryUI end.*/

            /*StealEggGame.TapQuickSlot start.*/
            TapQuickSlot: function (index) {
if ( TRACE ) { TRACE( "StealEggGame#TapQuickSlot", this ); }

                if (!this.TutorialCompleted) {
                    this.ShowDialog("You must finish tutorial first");
                    return;
                }
                if (index >= this.quick.Count || !this.CanUseInventory) {
                    return;
                }
                var item = this.quick.getItem(index);
                if (Bridge.referenceEquals(this.hand, item)) {
                    this.UnequipHand();
                } else {
                    this.EquipHand(item);
                }
            },
            /*StealEggGame.TapQuickSlot end.*/

            /*StealEggGame.ToggleBag start.*/
            ToggleBag: function () {
if ( TRACE ) { TRACE( "StealEggGame#ToggleBag", this ); }

                if (!this.TutorialCompleted) {
                    this.ShowDialog("You must finish tutorial first");
                    return;
                }
                if (UnityEngine.GameObject.op_Equality(this.modal, this.inventoryUI.bagPopup)) {
                    this.CloseModal();
                    return;
                }
                this.bagSelection = null;
                this.OpenModal(this.inventoryUI.bagPopup);
                this.RefreshBag();
            },
            /*StealEggGame.ToggleBag end.*/

            /*StealEggGame.RefreshInventoryUI start.*/
            RefreshInventoryUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#RefreshInventoryUI", this ); }

                var $t;
                for (var i = 0; i < this.QuickSlotCount; i = (i + 1) | 0) {
                    var slot = ($t = this.inventoryUI.quickSlots)[i];
                    var item = i < this.quick.Count ? this.quick.getItem(i) : null;
                    StealEggGame.Show(slot, item != null);
                    if (item == null) {
                        continue;
                    }
                    StealEggGame.SetImage(slot.thumbnail, this.ItemIcon(item));
                    StealEggGame.ShowMark(slot.highlight, Bridge.referenceEquals(item, this.hand));
                    StealEggGame.SetText(slot.content, "");
                }
                StealEggGame.Show(this.hudUI.attack, this.hand != null && this.hand.kind === StealEggGame.ItemKind.Bat && !this.IsCarrying);
            },
            /*StealEggGame.RefreshInventoryUI end.*/

            /*StealEggGame.RefreshBag start.*/
            RefreshBag: function () {
if ( TRACE ) { TRACE( "StealEggGame#RefreshBag", this ); }

                var $t, $t1;
                var ui = this.inventoryUI;
                if (!UnityEngine.Object.op_Implicit(ui.bagPopup) || !ui.bagPopup.activeSelf) {
                    return;
                }
                $t = Bridge.getEnumerator(this.bagCells);
                try {
                    while ($t.moveNext()) {
                        var cell = $t.Current;
                        UnityEngine.MonoBehaviour.Destroy(cell);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.bagCells.clear();
                $t1 = Bridge.getEnumerator(this.items);
                try {
                    while ($t1.moveNext()) {
                        var item = $t1.Current;
                        var captured = { v : item };
                        var cell1 = UnityEngine.Object.Instantiate$1(BagCellView, ui.bagTemplate, ui.bagContent, false);
                        cell1.gameObject.SetActive(true);
                        this.bagCells.add(cell1.gameObject);
                        StealEggGame.SetImage(cell1.thumbnail, this.ItemIcon(item));
                        StealEggGame.SetText(cell1.amount, "");
                        StealEggGame.ShowMark(cell1.highlight, Bridge.referenceEquals(item, this.bagSelection));
                        StealEggGame.ShowMark(cell1.exposeMark, this.quick.contains(item));
                        this.Bind(cell1.button, (function ($me, captured) {
                            return Bridge.fn.bind($me, function () {
                                this.bagSelection = captured.v;
                                this.RefreshBag();
                            });
                        })(this, captured));
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                var pet = this.bagSelection != null && this.bagSelection.kind === StealEggGame.ItemKind.Pet, egg = this.bagSelection != null && this.bagSelection.kind === StealEggGame.ItemKind.Egg;
                StealEggGame.Show$1(ui.petInfo, pet);
                StealEggGame.Show$1(ui.eggInfo, egg);
                if (pet) {
                    var info = this.petCatalog[this.bagSelection.pet];
                    StealEggGame.SetImage(ui.petThumbnail, info.thumbnail);
                    StealEggGame.SetText(ui.petName, info.name);
                    StealEggGame.SetText(ui.petIncome, "$" + (StealEggGame.Num(this.bagSelection.income) || "") + "/s");
                    this.SetRarityText(ui.petRarity, info.rarity);
                }
                if (egg) {
                    StealEggGame.SetImage(ui.eggThumbnail, this.ItemIcon(this.bagSelection));
                    StealEggGame.SetText(ui.eggName, this.ItemName(this.bagSelection));
                    StealEggGame.SetText(ui.eggWeight, (StealEggGame.Num(this.EggWeightOf(this.bagSelection)) || "") + "kg");
                }
            },
            /*StealEggGame.RefreshBag end.*/

            /*StealEggGame.EggWeightOf start.*/
            EggWeightOf: function (item) {
if ( TRACE ) { TRACE( "StealEggGame#EggWeightOf", this ); }

                var rule = this.ItemRule(item);
                return rule != null ? rule.incubationTime : 10;
            },
            /*StealEggGame.EggWeightOf end.*/

            /*StealEggGame.StartNpcs start.*/
            StartNpcs: function () {
if ( TRACE ) { TRACE( "StealEggGame#StartNpcs", this ); }

                if (this.npcModels == null) {
                    return;
                }
                for (var i = 0; i < this.npcModels.length; i = (i + 1) | 0) {
                    var root = this.npcModels[i];
                    if (!UnityEngine.Object.op_Implicit(root)) {
                        continue;
                    }
                    var npc = new StealEggGame.Actor();
                    npc.root = root;
                    npc.animator = root.GetComponentInChildren(UnityEngine.Animator);
                    npc.model = UnityEngine.Object.op_Implicit(npc.animator) ? npc.animator.transform : root;
                    npc.house = Math.max(0, Math.min(((i + 1) | 0), ((this.houses.length - 1) | 0)));
                    npc.speed = UnityEngine.Random.Range$1(this.npcMinSpeed, this.npcMaxSpeed);
                    npc.stealSlot = new UnityEngine.GameObject.$ctor2("Steal slot").transform;
                    npc.stealSlot.SetParent(root, false);
                    npc.stealSlot.localPosition = new pc.Vec3( 0, 1.5, 1.1 );
                    var house = this.houses[npc.house].root;
                    root.position = this.GroundAt(house.position.$clone().add( house.forward.$clone().clone().scale( 3 ) ));
                    root.rotation = house.rotation.$clone();
                    if (this.trails != null && this.trails.length > 0) {
                        var trail = this.trails[UnityEngine.Random.Range(0, this.trails.length)];
                        if (UnityEngine.Object.op_Implicit(trail.prefab)) {
                            var t = UnityEngine.Object.Instantiate$1(UnityEngine.GameObject, trail.prefab, root, false);
                            t.transform.localPosition = pc.Vec3.UP.clone().clone().scale( 0.2 );
                        }
                    }
                    npc.state = StealEggGame.NpcRest;
                    npc.until = UnityEngine.Time.time + UnityEngine.Random.Range$1(2.0, 6.0);
                    this.npcs.add(npc);
                }
            },
            /*StealEggGame.StartNpcs end.*/

            /*StealEggGame.GroundAt start.*/
            GroundAt: function (point) {
if ( TRACE ) { TRACE( "StealEggGame#GroundAt", this ); }

                var hit = { v : new UnityEngine.RaycastHit() };
                if (UnityEngine.Physics.Raycast$3(point.$clone().add( pc.Vec3.UP.clone().clone().scale( 1.5 ) ), pc.Vec3.DOWN.clone(), hit, 8, -1, UnityEngine.QueryTriggerInteraction.Ignore)) {
                    point.y = hit.v.point.y;
                }
                return point.$clone();
            },
            /*StealEggGame.GroundAt end.*/

            /*StealEggGame.UpdateNpcs start.*/
            UpdateNpcs: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateNpcs", this ); }

                var $t;
                $t = Bridge.getEnumerator(this.npcs);
                try {
                    while ($t.moveNext()) {
                        var npc = $t.Current;
                        if (npc.Down) {
                            this.UpdateNpcDown(npc);
                            continue;
                        }
                        switch (npc.state) {
                            case StealEggGame.NpcRest: 
                                this.SetNpcMove(npc, 0, 1);
                                if (UnityEngine.Time.time >= npc.until) {
                                    this.ThinkNpc(npc);
                                }
                                break;
                            case StealEggGame.NpcWander: 
                                if (this.MoveNpc(npc, npc.dest.$clone(), 1) || UnityEngine.Time.time >= npc.deadline) {
                                    this.ThinkNpc(npc);
                                }
                                break;
                            case StealEggGame.NpcGoTrain: 
                                {
                                    var slot = this.houses[npc.house].TrainSlot;
                                    if (this.MoveNpc(npc, slot.position.$clone(), 0.3)) {
                                        npc.root.position = slot.position.$clone();
                                        npc.root.rotation = slot.rotation.$clone();
                                        npc.state = StealEggGame.NpcTrain;
                                        npc.until = UnityEngine.Time.time + UnityEngine.Random.Range$1(10.0, 20.0);
                                    } else if (UnityEngine.Time.time >= npc.deadline) {
                                        this.ThinkNpc(npc);
                                    }
                                    break;
                                }
                            case StealEggGame.NpcTrain: 
                                this.SetNpcMove(npc, 1, Math.max(1, Math.min(npc.speed / this.baseMoveSpeed, 10)));
                                if (UnityEngine.Time.time >= npc.until || UnityEngine.Time.time >= npc.deadline) {
                                    this.ThinkNpc(npc);
                                }
                                break;
                            case StealEggGame.NpcGoEgg: 
                                if (npc.targetEgg == null || !npc.targetEgg.Available || npc.targetEgg.onGround) {
                                    this.ThinkNpc(npc);
                                    break;
                                }
                                if (this.MoveNpc(npc, npc.targetEgg.transform.position.$clone(), 0.3)) {
                                    npc.state = StealEggGame.NpcTakeEgg;
                                    npc.until = UnityEngine.Time.time + 0.5;
                                }
                                break;
                            case StealEggGame.NpcTakeEgg: 
                                this.SetNpcMove(npc, 0, 1);
                                if (UnityEngine.Time.time < npc.until) {
                                    break;
                                }
                                if (npc.targetEgg != null && npc.targetEgg.Available && !npc.targetEgg.onGround) {
                                    this.TakeEgg(npc, npc.targetEgg);
                                    npc.state = StealEggGame.NpcGoHome;
                                } else {
                                    this.ThinkNpc(npc);
                                }
                                break;
                            case StealEggGame.NpcGoHome: 
                                if (npc.carried != null && npc.root.position.z <= this.safePoint.position.z) {
                                    this.LoseEgg(npc);
                                    npc.targetEgg = null;
                                }
                                if (npc.carried == null && npc.targetEgg != null) {
                                    this.ThinkNpc(npc);
                                    break;
                                }
                                if (this.MoveNpc(npc, this.houses[npc.house].root.position.$clone(), 1.5)) {
                                    this.ThinkNpc(npc);
                                }
                                break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*StealEggGame.UpdateNpcs end.*/

            /*StealEggGame.ThinkNpc start.*/
            ThinkNpc: function (npc) {
if ( TRACE ) { TRACE( "StealEggGame#ThinkNpc", this ); }

                npc.targetEgg = null;
                var roll = UnityEngine.Random.value;
                if (this.TutorialCompleted && roll < 0.09 && this.TryStartSteal(npc)) {
                    return;
                }
                if (roll < 0.15) {
                    npc.state = StealEggGame.NpcGoTrain;
                    npc.deadline = UnityEngine.Time.time + 30;
                    return;
                }
                if (roll < 0.4) {
                    var offset = new pc.Vec3( UnityEngine.Random.Range$1(-30.0, 30.0), 0, UnityEngine.Random.Range$1(-30.0, 30.0) );
                    var hit = { v : new UnityEngine.RaycastHit() };
                    if (UnityEngine.Physics.Raycast$3(npc.root.position.$clone().add( offset ).add( pc.Vec3.UP.clone() ), pc.Vec3.DOWN.clone(), hit, 2, -1, UnityEngine.QueryTriggerInteraction.Ignore)) {
                        npc.dest = hit.v.point.$clone();
                        npc.state = StealEggGame.NpcWander;
                        npc.deadline = UnityEngine.Time.time + 10;
                        return;
                    }
                }
                npc.state = StealEggGame.NpcRest;
                npc.until = UnityEngine.Time.time + UnityEngine.Random.Range$1(2.0, 6.0);
            },
            /*StealEggGame.ThinkNpc end.*/

            /*StealEggGame.TryStartSteal start.*/
            TryStartSteal: function (npc) {
if ( TRACE ) { TRACE( "StealEggGame#TryStartSteal", this ); }

                var $t, $t1;
                var reachable = new (System.Collections.Generic.List$1(StealEggGame.Zone)).ctor();
                $t = Bridge.getEnumerator(this.zones);
                try {
                    while ($t.moveNext()) {
                        var zone = $t.Current;
                        if (zone.guardianSpeed < npc.speed) {
                            reachable.add(zone);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (reachable.Count === 0) {
                    return false;
                }
                var target = reachable.getItem(UnityEngine.Random.Range(0, reachable.Count));
                var available = new (System.Collections.Generic.List$1(StealEggGame.Egg)).ctor();
                $t1 = Bridge.getEnumerator(this.eggs);
                try {
                    while ($t1.moveNext()) {
                        var egg = $t1.Current;
                        if (Bridge.referenceEquals(egg.zone, target) && egg.Available && !egg.onGround) {
                            available.add(egg);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                if (available.Count === 0) {
                    return false;
                }
                npc.targetEgg = available.getItem(UnityEngine.Random.Range(0, available.Count));
                npc.state = StealEggGame.NpcGoEgg;
                return true;
            },
            /*StealEggGame.TryStartSteal end.*/

            /*StealEggGame.MoveNpc start.*/
            MoveNpc: function (npc, target, stop) {
if ( TRACE ) { TRACE( "StealEggGame#MoveNpc", this ); }

                var position = npc.root.position.$clone(), to = target.$clone().sub( position );
                to.y = 0;
                var distance = to.length();
                if (distance <= stop) {
                    this.SetNpcMove(npc, 0, 1);
                    return true;
                }
                var next = position.$clone().add( to.$clone().scale( 1.0 / ( distance ) ).clone().scale( UnityEngine.Mathf.Min(distance, npc.speed * UnityEngine.Time.deltaTime) ) );
                var hit = { v : new UnityEngine.RaycastHit() };
                if (UnityEngine.Physics.Raycast$3(next.$clone().add( pc.Vec3.UP.clone().clone().scale( 1.5 ) ), pc.Vec3.DOWN.clone(), hit, 6, -1, UnityEngine.QueryTriggerInteraction.Ignore)) {
                    next.y = hit.v.point.y;
                }
                npc.root.position = next.$clone();
                npc.root.rotation = new pc.Quat().slerpUnclamped( npc.root.rotation, new pc.Quat().lookRotation( to, pc.Vec3.UP ), pc.math.clamp( UnityEngine.Time.deltaTime * 10, 0, 1 ) );
                this.SetNpcMove(npc, 1, Math.max(1, Math.min(npc.speed / this.baseMoveSpeed, 10)));
                return false;
            },
            /*StealEggGame.MoveNpc end.*/

            /*StealEggGame.SetNpcMove start.*/
            SetNpcMove: function (npc, forward, speed) {
if ( TRACE ) { TRACE( "StealEggGame#SetNpcMove", this ); }

                this.SetNpcAnimation(npc, forward);
            },
            /*StealEggGame.SetNpcMove end.*/

            /*StealEggGame.KnockNpc start.*/
            KnockNpc: function (npc, force) {
if ( TRACE ) { TRACE( "StealEggGame#KnockNpc", this ); }

                if (npc.Down) {
                    return;
                }
                npc.downTotal = UnityEngine.Mathf.Max(0.8, force.length() / 100);
                npc.downUntil = UnityEngine.Time.time + npc.downTotal;
                npc.downDirection = force.$clone();
                npc.downDirection.y = 0;
                if (npc.downDirection.lengthSq() < 0.01) {
                    npc.downDirection = npc.root.forward.$clone().scale( -1 );
                }
                npc.downDirection.normalize();
                npc.modelPosition = npc.model.localPosition.$clone();
                npc.modelRotation = npc.model.localRotation.$clone();
                npc.targetEgg = null;
                npc.state = StealEggGame.NpcRest;
                this.SetNpcMove(npc, 0, 1);
            },
            /*StealEggGame.KnockNpc end.*/

            /*StealEggGame.UpdateNpcDown start.*/
            UpdateNpcDown: function (npc) {
if ( TRACE ) { TRACE( "StealEggGame#UpdateNpcDown", this ); }

                var elapsed = npc.downTotal - (npc.downUntil - UnityEngine.Time.time);
                var rise = Math.max(0, Math.min(1, (elapsed - (npc.downTotal - 0.5)) / 0.5));
                var fall = Math.max(0, Math.min(1, elapsed / 0.25)) * (1 - rise);
                var axis = new pc.Vec3().cross( pc.Vec3.UP.clone(), npc.root.InverseTransformDirection(npc.downDirection) );
                npc.model.localRotation = new pc.Quat().setFromAxisAngle( axis, 85 * fall ).clone().mul( npc.modelRotation );
                npc.model.localPosition = npc.modelPosition.$clone().add( pc.Vec3.UP.clone().clone().scale( (0.3 * fall) ) );
                if (elapsed < 0.4) {
                    npc.root.position = this.GroundAt(npc.root.position.$clone().add( npc.downDirection.$clone().clone().scale( 5 ).clone().scale( (1 - elapsed / 0.4) ).clone().scale( UnityEngine.Time.deltaTime ) ));
                }
                if (UnityEngine.Time.time < npc.downUntil) {
                    return;
                }
                npc.model.localRotation = npc.modelRotation.$clone();
                npc.model.localPosition = npc.modelPosition.$clone();
                npc.downUntil = 0;
                npc.state = StealEggGame.NpcRest;
                npc.until = UnityEngine.Time.time + UnityEngine.Random.Range$1(0.5, 2.0);
            },
            /*StealEggGame.UpdateNpcDown end.*/

            /*StealEggGame.InLobby start.*/
            InLobby: function (point) {
if ( TRACE ) { TRACE( "StealEggGame#InLobby", this ); }

                if (!UnityEngine.Object.op_Implicit(this.lobbyCenter)) {
                    return true;
                }
                var c = this.lobbyCenter.position.$clone();
                return point.x >= c.x - this.lobbySize.x / 2 && point.x <= c.x + this.lobbySize.x / 2 && point.z >= c.z - this.lobbySize.z / 2 && point.z <= c.z + this.lobbySize.z / 2;
            },
            /*StealEggGame.InLobby end.*/

            /*StealEggGame.LobbyTeleport start.*/
            LobbyTeleport: function () {
if ( TRACE ) { TRACE( "StealEggGame#LobbyTeleport", this ); }

                var p = UnityEngine.Object.op_Implicit(this.teleportPoint) ? this.teleportPoint.position.$clone() : this.spawn.$clone();
                p.x += UnityEngine.Random.Range$1(-10.0, 10.0);
                return this.GroundAt(p.$clone());
            },
            /*StealEggGame.LobbyTeleport end.*/

            /*StealEggGame.SendEveryoneToLobby start.*/
            SendEveryoneToLobby: function () {
if ( TRACE ) { TRACE( "StealEggGame#SendEveryoneToLobby", this ); }

                var $t;
                $t = Bridge.getEnumerator(this.npcs);
                try {
                    while ($t.moveNext()) {
                        var npc = $t.Current;
                        if (npc.Down) {
                            npc.model.localRotation = npc.modelRotation.$clone();
                            npc.model.localPosition = npc.modelPosition.$clone();
                            npc.downUntil = 0;
                        }
                        if (!this.InLobby(npc.root.position)) {
                            npc.root.position = this.LobbyTeleport();
                        }
                        npc.targetEgg = null;
                        npc.state = StealEggGame.NpcRest;
                        npc.until = UnityEngine.Time.time + UnityEngine.Random.Range$1(2.0, 6.0);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (!this.InLobby(this.player.position)) {
                    if (this.IsKnockedDown && UnityEngine.Object.op_Implicit(this.ragdoll)) {
                        this.ragdoll.Recover();
                        this.motor.enabled = true;
                    }
                    if (this.IsKnockedDown && UnityEngine.Object.op_Implicit(this.playerAnimator)) {
                        this.playerAnimator.transform.localPosition = this.modelPosition.$clone();
                        this.playerAnimator.transform.localRotation = this.modelRotation.$clone();
                        this.playerAnimator.enabled = true;
                    }
                    if (this.IsKnockedDown) {
                        this.EndKnockdown();
                    }
                    this.training = false;
                    this.TeleportPlayer(this.LobbyTeleport());
                }
            },
            /*StealEggGame.SendEveryoneToLobby end.*/

            /*StealEggGame.FollowBone start.*/
            FollowBone: function (follower, bone, root) {
if ( TRACE ) { TRACE( "StealEggGame#FollowBone", this ); }

                var f = new StealEggGame.BoneFollower();
                f.follower = follower;
                f.bone = bone;
                f.root = root;
                var position = { v : new UnityEngine.Vector3() };
                var rotation = { v : new UnityEngine.Quaternion() };
                StealEggGame.BonePose(bone, root, position, rotation);
                f.position = rotation.v.clone().invert().transformVector( (follower.position.$clone().sub( position.v )) );
                f.rotation = rotation.v.clone().invert().clone().mul( follower.rotation );
                this.boneFollowers.add(f);
                return f;
            },
            /*StealEggGame.FollowBone end.*/

            /*StealEggGame.UpdateBoneFollowers start.*/
            UpdateBoneFollowers: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateBoneFollowers", this ); }

                for (var i = (this.boneFollowers.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var f = this.boneFollowers.getItem(i);
                    if (!UnityEngine.Object.op_Implicit(f.follower) || !UnityEngine.Object.op_Implicit(f.bone)) {
                        this.boneFollowers.removeAt(i);
                        continue;
                    }
                    var position = { v : new UnityEngine.Vector3() };
                    var rotation = { v : new UnityEngine.Quaternion() };
                    StealEggGame.BonePose(f.bone, f.root, position, rotation);
                    f.follower.SetPositionAndRotation(position.v.$clone().add( rotation.v.transformVector( f.position ) ), rotation.v.clone().mul( f.rotation ));
                }
            },
            /*StealEggGame.UpdateBoneFollowers end.*/

            /*StealEggGame.StartOutfits start.*/
            StartOutfits: function () {
if ( TRACE ) { TRACE( "StealEggGame#StartOutfits", this ); }

                var $t;
                this.WearHair(this.player, this.playerHair);
                if (this.npcModels != null) {
                    $t = Bridge.getEnumerator(this.npcModels);
                    try {
                        while ($t.moveNext()) {
                            var npc = $t.Current;
                            this.DressRandom(npc);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
                this.DressRandom(this.exchangeShop);
            },
            /*StealEggGame.StartOutfits end.*/

            /*StealEggGame.DressRandom start.*/
            DressRandom: function (character) {
if ( TRACE ) { TRACE( "StealEggGame#DressRandom", this ); }

                if (!UnityEngine.Object.op_Implicit(StealEggGame.Slot(character))) {
                    return;
                }
                this.WearHair(character, StealEggGame.RandomOf(UnityEngine.GameObject, this.outfitHairs));
                StealEggGame.WearMaterial(character, StealEggGame.RandomOf(UnityEngine.Material, this.outfitFaces), ["Head"]);
                StealEggGame.WearMaterial(character, StealEggGame.RandomOf(UnityEngine.Material, this.outfitShirts), ["Body", "Hips", "Arm", "Arm.001"]);
                StealEggGame.WearMaterial(character, StealEggGame.RandomOf(UnityEngine.Material, this.outfitPants), ["Leg", "Leg.001"]);
            },
            /*StealEggGame.DressRandom end.*/

            /*StealEggGame.WearHair start.*/
            WearHair: function (character, hair) {
if ( TRACE ) { TRACE( "StealEggGame#WearHair", this ); }

                var $t;
                var slot = StealEggGame.Slot(character);
                if (!UnityEngine.Object.op_Implicit(slot) || !UnityEngine.Object.op_Implicit(hair)) {
                    return;
                }
                // The bake binds the hair to the head bone as a skinned mesh (StealEggFullGameBaker.BakeSkinnedHair).
                $t = Bridge.getEnumerator(character);
                try {
                    while ($t.moveNext()) {
                        var child = Bridge.cast($t.Current, UnityEngine.Transform);
                        if (Bridge.referenceEquals(child.name, StealEggGame.SkinnedHairName)) {
                            return;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                for (var i = (slot.childCount - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    UnityEngine.MonoBehaviour.Destroy(slot.GetChild(i).gameObject);
                }
                var created = UnityEngine.Object.Instantiate(UnityEngine.GameObject, hair, slot);
                created.transform.localPosition = pc.Vec3.ZERO.clone();
                StealEggGame.DisablePhysics(created);
                var head = StealEggGame.HeadBone(character);
                if (UnityEngine.Object.op_Implicit(head)) {
                    created.transform.SetParent(character, true);
                    this.FollowBone(created.transform, head, character);
                }
            },
            /*StealEggGame.WearHair end.*/

            /*StealEggGame.IsStationPanel start.*/
            IsStationPanel: function (panel) {
if ( TRACE ) { TRACE( "StealEggGame#IsStationPanel", this ); }

                return UnityEngine.Object.op_Implicit(panel) && System.Array.indexOfT(this.StationPanels, panel) >= 0;
            },
            /*StealEggGame.IsStationPanel end.*/

            /*StealEggGame.BindOriginalUI start.*/
            BindOriginalUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#BindOriginalUI", this ); }

                var $t, $t1;
                if (!UnityEngine.Object.op_Implicit(this.hudUI.functions)) {
                    throw new System.InvalidOperationException.$ctor1("Original UI references are missing. Run Steal Egg/Bind UI references in the Unity Editor.");
                }
                this.functionsHome = this.hudUI.functions.anchoredPosition.$clone();
                $t = Bridge.getEnumerator(this.hudUI.actionButtons);
                try {
                    while ($t.moveNext()) {
                        var button = $t.Current;
                        var key = { v : button.name };
                        this.actions.setItem(key.v, button);
                        button.SetActive(false);
                        var hold = button.GetComponent(PlayableHoldButton);
                        if (UnityEngine.Object.op_Implicit(hold)) {
                            hold.onHold = (function ($me, key) {
                                return Bridge.fn.bind($me, function () {
                                    this.DoAction(key.v);
                                });
                            })(this, key);
                        } else {
                            this.Bind(button.GetComponent(UnityEngine.UI.Button), (function ($me, key) {
                                return Bridge.fn.bind($me, function () {
                                    this.DoAction(key.v);
                                });
                            })(this, key));
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.Bind(this.hudUI.attack, Bridge.fn.cacheBind(this, this.Attack));
                StealEggGame.Show(this.hudUI.attack, false);
                this.Bind(this.hudUI.settings, Bridge.fn.bind(this, function () {
                    this.OpenModal(this.settingsUI.root);
                }));
                this.Bind(this.hudUI.trailShop, Bridge.fn.cacheBind(this, this.OpenTrailShop));
                this.Bind(this.hudUI.index, Bridge.fn.cacheBind(this, this.OpenIndex));
                this.Bind(this.hudUI.speedMode, Bridge.fn.bind(this, function () {
                    this.slowMode = !this.slowMode;
                    this.RefreshSpeedToggle();
                }));
                this.RefreshSpeedToggle();
                StealEggGame.SetImage(this.hudUI.moneyIcon, this.moneyIcon);
                StealEggGame.SetImage(this.hudUI.speedIcon, this.speedIcon);
                if (UnityEngine.Object.op_Implicit(this.hudUI.zoneFrame)) {
                    this.zoneGraphics = this.hudUI.zoneFrame.GetComponentsInChildren$1(UnityEngine.UI.Graphic, true);
                    this.zoneAlphas = System.Array.init(this.zoneGraphics.length, 0, System.Single);
                    for (var i = 0; i < this.zoneGraphics.length; i = (i + 1) | 0) {
                        this.zoneAlphas[i] = this.zoneGraphics[i].color.a;
                    }
                }
                StealEggGame.Show$1(this.hudUI.zoneBanner, false);
                this.BindInventoryUI();
                StealEggGame.Show$1(this.warningPanel, false);
                StealEggGame.Show$1(this.dialogUI.root, false);
                this.Bind(this.rewardUI.close, Bridge.fn.bind(this, function () {
                    this.rewardUI.root.SetActive(false);
                }), true);
                this.Bind(this.rewardUI.tapToClose, Bridge.fn.bind(this, function () {
                    this.rewardUI.root.SetActive(false);
                }), true);
                StealEggGame.Show$1(this.rewardUI.root, false);
                $t1 = Bridge.getEnumerator(System.Array.init([this.settingsUI, this.coopUI, this.fuseUI, this.frogUI, this.shopUI, this.trailUI], StealEggGame.LockedPanelUI));
                try {
                    while ($t1.moveNext()) {
                        var locked = $t1.Current;
                        this.Bind(locked.close, Bridge.fn.cacheBind(this, this.CloseModal), true);
                        StealEggGame.Show$1(locked.root, false);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                this.BindHomeUI();
                this.BindIndexUI();
                this.RefreshInventoryUI();
            },
            /*StealEggGame.BindOriginalUI end.*/

            /*StealEggGame.UpdateTutorialHints start.*/
            UpdateTutorialHints: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateTutorialHints", this ); }

                var free = !this.Blocked && !this.IsKnockedDown && !this.training;
                // Joystick: until the first move.
                var drag = free && !this.firstInput && UnityEngine.Object.op_Implicit(this.hintHand);
                if (UnityEngine.Object.op_Implicit(this.hintHand) && this.hintHand.gameObject.activeSelf !== drag) {
                    this.hintHand.gameObject.SetActive(drag);
                }
                // The fingertip circles along the handle's path: the edge of the joystick background (size set in the scene).
                if (drag) {
                    var r = this.joystick.Radius;
                    this.hintHand.anchoredPosition = new pc.Vec2( Math.sin(UnityEngine.Time.time * 2.5) * r, Math.cos(UnityEngine.Time.time * 2.5) * r );
                }
                // Each hint follows as soon as the previous one is done: move -> turn the camera -> jump.
                var swipe = free && UnityEngine.Object.op_Implicit(this.cameraHint) && this.firstInput && !this.cameraTurned;
                if (UnityEngine.Object.op_Implicit(this.cameraHint) && this.cameraHint.gameObject.activeSelf !== swipe) {
                    this.cameraHint.gameObject.SetActive(swipe);
                }
                if (swipe) {
                    this.cameraHint.anchoredPosition = new pc.Vec2( pc.math.lerp(-160, 160, UnityEngine.Mathf.PingPong(UnityEngine.Time.time * 0.8, 1)), 0 );
                }
                var jump = free && UnityEngine.Object.op_Implicit(this.jumpHint) && this.cameraTurned && !this.jumped;
                if (UnityEngine.Object.op_Implicit(this.jumpHint) && this.jumpHint.gameObject.activeSelf !== jump) {
                    this.jumpHint.gameObject.SetActive(jump);
                }
                if (UnityEngine.Object.op_Implicit(this.tutorialText)) {
                    // After the three control hints, "Steal An Egg" pulses until the first egg is taken (then never again).
                    var steal = free && this.jumped && !this.stoleEgg;
                    var text = drag ? "Use the joystick to move" : swipe ? "Swipe to turn the camera" : jump ? "Tap to jump" : steal ? "Steal An Egg" : "";
                    var showText = !Bridge.referenceEquals(text, "");
                    if (this.tutorialText.gameObject.activeSelf !== showText) {
                        this.tutorialText.gameObject.SetActive(showText);
                    }
                    if (showText) {
                        if (!Bridge.referenceEquals(this.tutorialText.text, text)) {
                            this.tutorialText.text = text;
                        }
                        this.tutorialText.transform$1.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (steal ? 1 + 0.12 * Math.sin(UnityEngine.Time.time * 5) : 1) );
                    }
                }
                this.UpdateTapHint();
            },
            /*StealEggGame.UpdateTutorialHints end.*/

            /*StealEggGame.UpdateTapHint start.*/
            UpdateTapHint: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateTapHint", this ); }

                this.UpdateTapHint$1(this.hudUI.incubateTapHint, StealEggGame.TutorialStep.Incubate, "[Button] Incubate");
                this.UpdateTapHint$1(this.hudUI.hatchTapHint, StealEggGame.TutorialStep.Hatch, "[Button] Hatch");
                this.UpdateTapHint$1(this.hudUI.equipTapHint, StealEggGame.TutorialStep.Equip, "[Button] Equip Monster");
                this.UpdateTapHint$1(this.hudUI.trainTapHint, StealEggGame.TutorialStep.Train, "[Button] Use Treadmil");
            },
            /*StealEggGame.UpdateTapHint end.*/

            /*StealEggGame.UpdateTapHint$1 start.*/
            UpdateTapHint$1: function (hint, step, action) {
if ( TRACE ) { TRACE( "StealEggGame#UpdateTapHint$1", this ); }

                if (!UnityEngine.Object.op_Implicit(hint)) {
                    return;
                }
                var show = !this.Blocked && !this.IsKnockedDown && this.Step === step && Bridge.referenceEquals(this.currentAction, action);
                // The hint animates itself (TapHintView) while it is shown.
                StealEggGame.Show$1(hint.gameObject, show);
            },
            /*StealEggGame.UpdateTapHint$1 end.*/

            /*StealEggGame.UpdateInteraction start.*/
            UpdateInteraction: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateInteraction", this ); }

                var $t, $t1;
                if (this.IsCarrying && this.player.position.z <= this.safePoint.position.z) {
                    this.GatherEgg();
                }
                var action = "";
                var target = null;
                this.nearby = null;
                if (!this.Blocked && !this.training && !this.IsKnockedDown) {
                    if (this.IsCarrying) {
                        action = "[Button] DropStealingEgg";
                    } else {
                        var ready = this.NearestIncubator(true);
                        var lucky = this.NearestLuckyEgg();
                        if (this.hand != null && this.hand.kind === StealEggGame.ItemKind.Egg && this.InsideMyCoop) {
                            action = "[Button] Incubate";
                        } else {
                            if (this.hand != null && this.hand.kind === StealEggGame.ItemKind.Pet && this.InsideMyCoop) {
                                action = "[Button] Equip Monster";
                            } else {
                                if (ready != null) {
                                    action = "[Button] Hatch";
                                    target = ready.obj;
                                } else if (lucky != null) {
                                    action = "[Button] Open Lucky Egg";
                                    target = lucky.obj;
                                } else if (this.NearTreadmill) {
                                    action = "[Button] Use Treadmil";
                                    target = this.MyHouse.TrainSlot;
                                } else if (this.TutorialCompleted || this.Step === StealEggGame.TutorialStep.Steal) {
                                    var best = 3.4;
                                    $t = Bridge.getEnumerator(this.eggs);
                                    try {
                                        while ($t.moveNext()) {
                                            var egg = $t.Current;
                                            if (egg.Available) {
                                                var d = StealEggGame.FlatDistance(this.player.position.$clone(), egg.transform.position.$clone());
                                                if (d < best) {
                                                    best = d;
                                                    this.nearby = egg;
                                                }
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t, System.IDisposable)) {
                                            $t.System$IDisposable$Dispose();
                                        }
                                    }
                                    if (this.nearby != null) {
                                        action = "[Button] Steal";
                                        target = this.nearby.transform;
                                    }
                                }
                            }
                        }
                    }
                }
                if (!Bridge.referenceEquals(action, this.currentAction)) {
                    $t1 = Bridge.getEnumerator(this.actions);
                    try {
                        while ($t1.moveNext()) {
                            var pair = $t1.Current;
                            pair.value.SetActive(Bridge.referenceEquals(pair.key, action));
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                }
                this.currentAction = action;
                this.actionTarget = target;
                if (!this.IsKnockedDown && !this.training) {
                    this.UpdateStations();
                }
            },
            /*StealEggGame.UpdateInteraction end.*/

            /*StealEggGame.DoAction start.*/
            DoAction: function (key) {
if ( TRACE ) { TRACE( "StealEggGame#DoAction", this ); }

                if (this.Blocked || this.IsKnockedDown || !Bridge.referenceEquals(key, this.currentAction)) {
                    return;
                }
                if (Bridge.referenceEquals(key, "[Button] Steal") && this.nearby != null && this.nearby.Available) {
                    this.TakeEgg(this.playerActor, this.nearby);
                } else {
                    if (Bridge.referenceEquals(key, "[Button] DropStealingEgg")) {
                        this.DropEgg();
                    } else {
                        if (Bridge.referenceEquals(key, "[Button] Incubate")) {
                            this.IncubateHand();
                        } else {
                            if (Bridge.referenceEquals(key, "[Button] Equip Monster")) {
                                this.EquipHandPet();
                            } else {
                                if (Bridge.referenceEquals(key, "[Button] Hatch")) {
                                    this.Hatch(this.NearestIncubator(true));
                                } else {
                                    if (Bridge.referenceEquals(key, "[Button] Use Treadmil")) {
                                        this.BeginTraining();
                                    } else {
                                        if (Bridge.referenceEquals(key, "[Button] Open Lucky Egg")) {
                                            this.OpenLuckyEgg(this.NearestLuckyEgg());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            /*StealEggGame.DoAction end.*/

            /*StealEggGame.PressPrimaryAction start.*/
            PressPrimaryAction: function () {
if ( TRACE ) { TRACE( "StealEggGame#PressPrimaryAction", this ); }

                if (!Bridge.referenceEquals(this.currentAction, "")) {
                    this.DoAction(this.currentAction);
                }
            },
            /*StealEggGame.PressPrimaryAction end.*/

            /*StealEggGame.UpdateStations start.*/
            UpdateStations: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateStations", this ); }

                this.Station(0, this.MyHouse.coopPad, this.coopUI.root, null);
                this.Station(1, this.MyHouse.treadmillPad, this.treadmillUI.root, Bridge.fn.cacheBind(this, this.RefreshPads));
                this.Station(2, this.fuseMachine, this.fuseUI.root, null);
                this.Station(3, this.exchangeShop, this.shopUI.root, null);
                this.Station(4, this.luckyFrog, this.frogUI.root, null);
            },
            /*StealEggGame.UpdateStations end.*/

            /*StealEggGame.Station start.*/
            Station: function (index, station, panel, onOpen) {
if ( TRACE ) { TRACE( "StealEggGame#Station", this ); }

                if (!UnityEngine.Object.op_Implicit(station) || !UnityEngine.Object.op_Implicit(panel)) {
                    return;
                }
                var inside = this.NearStation(station);
                if (inside && !this.insideStation[index] && !this.Blocked) {
                    this.OpenModal(panel);
                    if (!Bridge.staticEquals(onOpen, null)) {
                        onOpen();
                    }
                }
                if (!inside && this.insideStation[index] && UnityEngine.GameObject.op_Equality(this.modal, panel)) {
                    this.CloseModal();
                }
                this.insideStation[index] = inside;
            },
            /*StealEggGame.Station end.*/

            /*StealEggGame.NearStation start.*/
            NearStation: function (station) {
if ( TRACE ) { TRACE( "StealEggGame#NearStation", this ); }

                var c = station.GetComponent(UnityEngine.Collider);
                var b = { v : new pc.BoundingBox.ctor() };
                if (UnityEngine.Object.op_Implicit(c) && !this.triggerBounds.tryGetValue(c, b) && c.enabled) {
                    b.v = c.bounds;
                }
                // Read-only test (no Expand): in Luna, Bounds is a reference type and expanding grew the stored station volume every frame.
                if (!pc.Vec3.equals( b.v.halfExtents.$clone().scale( 2 ), pc.Vec3.ZERO.clone() )) {
                    var p = this.player.position.$clone(), min = b.v.min.$clone(), max = b.v.max.$clone();
                    return p.x >= min.x - 0.5 && p.x <= max.x + 0.5 && p.z >= min.z - 0.5 && p.z <= max.z + 0.5;
                }
                return StealEggGame.FlatDistance(this.player.position.$clone(), station.position.$clone()) < 2.5;
            },
            /*StealEggGame.NearStation end.*/

            /*StealEggGame.OpenModal start.*/
            OpenModal: function (panel) {
if ( TRACE ) { TRACE( "StealEggGame#OpenModal", this ); }

                if (!UnityEngine.Object.op_Implicit(panel)) {
                    return;
                }
                if (UnityEngine.Object.op_Implicit(this.modal) && UnityEngine.GameObject.op_Inequality(this.modal, panel)) {
                    this.modal.SetActive(false);
                }
                this.modal = panel;
                panel.SetActive(true);
                if (!this.IsStationPanel(panel)) {
                    this.joystick.ResetInput();
                }
                this.PlaySound(this.popupSound);
                StealEggGame.Show$1(this.hudUI.right, UnityEngine.GameObject.op_Inequality(panel, this.petsUI.root) && UnityEngine.GameObject.op_Inequality(panel, this.incubateUI.root));
            },
            /*StealEggGame.OpenModal end.*/

            /*StealEggGame.CloseModal start.*/
            CloseModal: function () {
if ( TRACE ) { TRACE( "StealEggGame#CloseModal", this ); }

                if (UnityEngine.Object.op_Implicit(this.modal)) {
                    this.modal.SetActive(false);
                }
                this.modal = null;
                StealEggGame.Show$1(this.hudUI.right, true);
            },
            /*StealEggGame.CloseModal end.*/

            /*StealEggGame.UpdateHud start.*/
            UpdateHud: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateHud", this ); }

                StealEggGame.SetText(this.hudUI.money, "$" + (StealEggGame.Num(this.Money) || ""));
                StealEggGame.SetText(this.hudUI.speed, StealEggGame.Num(this.SpeedPower));
                if (UnityEngine.Object.op_Implicit(this.hudUI.speedIcon)) {
                    var t = this.speedPulse < 0 ? 1 : (UnityEngine.Time.time - this.speedPulse) / 0.2;
                    this.hudUI.speedIcon.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (t < 1 ? 1 + 0.11 * Math.sin(t * UnityEngine.Mathf.PI) : 1) );
                }
                // The day/night clock starts with the end of the tutorial; until then the label keeps its scene text.
                if (UnityEngine.Object.op_Implicit(this.hudUI.time) && this.TutorialCompleted) {
                    var s = Math.ceil(this.PhaseLeft), m = (Bridge.Int.div(s, 60)) | 0;
                    s = s % 60;
                    StealEggGame.SetText(this.hudUI.time, ((m > 0 ? m + "m" : "") || "") + s + "s");
                }
                StealEggGame.SetImage(this.hudUI.timeIcon, this.night ? this.dayIcon : this.nightIcon);
                StealEggGame.Show$1(this.hudUI.indexHighlight, this.IndexClaimable);
                StealEggGame.Show$1(this.hudUI.incubateHighlight, this.AnyIncubatorReady);
                if (UnityEngine.Object.op_Implicit(this.dialogUI.root) && this.dialogUI.root.activeSelf && UnityEngine.Time.time > this.dialogUntil) {
                    this.dialogUI.root.SetActive(false);
                }
                this.UpdateZoneBanner();
            },
            /*StealEggGame.UpdateHud end.*/

            /*StealEggGame.LateUpdateUI start.*/
            LateUpdateUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#LateUpdateUI", this ); }

                this.UpdatePetInfos();
                var container = this.hudUI.functions;
                if (UnityEngine.Object.op_Implicit(this.actionTarget) && !Bridge.referenceEquals(this.currentAction, "")) {
                    var screen = this.gameCamera.WorldToScreenPoint(new pc.Vec3( this.actionTarget.position.x, StealEggGame.TopOf(this.actionTarget) + 0.25, this.actionTarget.position.z ));
                    if (screen.z > 0) {
                        container.position = screen.$clone();
                    }
                } else {
                    container.anchoredPosition = this.functionsHome.$clone();
                }
                for (var i = (this.popups.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var p = this.popups.getItem(i);
                    p.clock += UnityEngine.Time.deltaTime;
                    if (p.clock >= 1) {
                        p.t.gameObject.SetActive(false);
                        if (!p.screen) {
                            UnityEngine.MonoBehaviour.Destroy(p.t.gameObject);
                        }
                        this.popups.removeAt(i);
                        continue;
                    }
                    if (p.screen) {
                        var screen1 = this.gameCamera.WorldToScreenPoint(p.world);
                        p.t.position = screen1.$clone().add( pc.Vec3.UP.clone().clone().scale( 100 ).clone().scale( p.clock ) );
                        p.t.gameObject.SetActive(screen1.z > 0);
                    } else {
                        p.t.position = p.world.$clone().add( pc.Vec3.UP.clone().clone().scale( p.clock ) );
                        p.t.rotation = this.gameCamera.transform.rotation.$clone();
                    }
                }
            },
            /*StealEggGame.LateUpdateUI end.*/

            /*StealEggGame.RefreshSpeedToggle start.*/
            RefreshSpeedToggle: function () {
if ( TRACE ) { TRACE( "StealEggGame#RefreshSpeedToggle", this ); }

                StealEggGame.Show$1(this.hudUI.speedOn, this.slowMode);
                StealEggGame.Show$1(this.hudUI.speedOff, !this.slowMode);
            },
            /*StealEggGame.RefreshSpeedToggle end.*/

            /*StealEggGame.PulseSpeedIcon start.*/
            PulseSpeedIcon: function () {
if ( TRACE ) { TRACE( "StealEggGame#PulseSpeedIcon", this ); }

                this.speedPulse = UnityEngine.Time.time;
            },
            /*StealEggGame.PulseSpeedIcon end.*/

            /*StealEggGame.ShowWarning start.*/
            ShowWarning: function (on) {
if ( TRACE ) { TRACE( "StealEggGame#ShowWarning", this ); }

                if (!UnityEngine.Object.op_Implicit(this.warningPanel)) {
                    return;
                }
                if (on && !this.warningPanel.activeSelf) {
                    this.PlaySound(this.warningSound);
                }
                this.warningPanel.SetActive(on);
            },
            /*StealEggGame.ShowWarning end.*/

            /*StealEggGame.ShowDialog start.*/
            ShowDialog: function (message) {
if ( TRACE ) { TRACE( "StealEggGame#ShowDialog", this ); }

                if (!UnityEngine.Object.op_Implicit(this.dialogUI.root)) {
                    return;
                }
                StealEggGame.SetText(this.dialogUI.message, message);
                this.dialogUI.root.SetActive(true);
                this.dialogUntil = UnityEngine.Time.time + 1;
            },
            /*StealEggGame.ShowDialog end.*/

            /*StealEggGame.UpdateZoneBanner start.*/
            UpdateZoneBanner: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateZoneBanner", this ); }

                var inside = -1;
                for (var i = 0; i < this.zones.length; i = (i + 1) | 0) {
                    if (this.InZone(this.zones[i], this.player.position)) {
                        inside = i;
                        break;
                    }
                }
                if (inside !== this.zoneInside && inside >= 0) {
                    StealEggGame.SetText(this.hudUI.zoneName, this.zones[inside].name);
                    StealEggGame.Show$1(this.hudUI.zoneBanner, true);
                    this.zoneClock = 0;
                }
                this.zoneInside = inside;
                var zoneFrame = this.hudUI.zoneFrame;
                if (this.zoneClock < 0 || !UnityEngine.Object.op_Implicit(zoneFrame)) {
                    return;
                }
                this.zoneClock += UnityEngine.Time.deltaTime;
                var t = this.zoneClock;
                var alpha = t < 0.25 ? t / 0.25 : t < 0.75 ? 1 : Math.max(0, Math.min(1, (1 - t) / 0.25));
                for (var i1 = 0; i1 < this.zoneGraphics.length; i1 = (i1 + 1) | 0) {
                    var c = this.zoneGraphics[i1].color.$clone();
                    c.a = this.zoneAlphas[i1] * alpha;
                    this.zoneGraphics[i1].color = c.$clone();
                }
                zoneFrame.anchoredPosition = new pc.Vec2( zoneFrame.anchoredPosition.x, t < 0.25 ? pc.math.lerp(100, 0, t / 0.25) : 0 );
                if (t >= 1) {
                    this.zoneClock = -1;
                    StealEggGame.Show$1(this.hudUI.zoneBanner, false);
                }
            },
            /*StealEggGame.UpdateZoneBanner end.*/

            /*StealEggGame.ShowReward start.*/
            ShowReward: function (title, icons, amounts) {
if ( TRACE ) { TRACE( "StealEggGame#ShowReward", this ); }

                var $t;
                if (!UnityEngine.Object.op_Implicit(this.rewardUI.root)) {
                    return;
                }
                StealEggGame.SetText(this.rewardUI.title, title);
                $t = Bridge.getEnumerator(this.rewardRows);
                try {
                    while ($t.moveNext()) {
                        var row = $t.Current;
                        UnityEngine.MonoBehaviour.Destroy(row);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.rewardRows.clear();
                for (var i = 0; i < icons.length; i = (i + 1) | 0) {
                    var row1 = UnityEngine.Object.Instantiate$1(IconAmountView, this.rewardUI.template, this.rewardUI.content, false);
                    row1.gameObject.SetActive(true);
                    this.rewardRows.add(row1.gameObject);
                    StealEggGame.SetImage(row1.icon, icons[i]);
                    StealEggGame.SetText(row1.amount, i < amounts.length ? amounts[i] : "");
                }
                this.rewardUI.root.SetActive(true);
                this.joystick.ResetInput();
                this.PlaySound(this.rewardSound);
            },
            /*StealEggGame.ShowReward end.*/

            /*StealEggGame.IncomePopup start.*/
            IncomePopup: function (world, amount) {
if ( TRACE ) { TRACE( "StealEggGame#IncomePopup", this ); }

                var $t;
                var incomeTemplate = this.hudUI.incomeTemplate;
                if (!UnityEngine.Object.op_Implicit(incomeTemplate) || StealEggGame.FlatDistance(world.$clone(), this.player.position.$clone()) > 50) {
                    return;
                }
                if (this.gameCamera.transform.forward.dot( world.$clone().sub( this.player.position ) ) <= 0) {
                    return;
                }
                var popup = null;
                $t = Bridge.getEnumerator(incomeTemplate.parent);
                try {
                    while ($t.moveNext()) {
                        var t = Bridge.cast($t.Current, UnityEngine.Transform);
                        if (UnityEngine.Component.op_Inequality(t, incomeTemplate) && Bridge.referenceEquals(t.name, "Income") && !t.gameObject.activeSelf) {
                            popup = new StealEggGame.Popup();
                            popup.t = t;
                            break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (popup == null) {
                    popup = new StealEggGame.Popup();
                    popup.t = UnityEngine.Object.Instantiate$1(UnityEngine.GameObject, incomeTemplate.gameObject, incomeTemplate.parent, false).transform;
                    popup.t.name = "Income";
                }
                popup.world = world.$clone().add( pc.Vec3.UP.clone().clone().scale( 2 ) );
                popup.screen = true;
                popup.clock = 0;
                var label = popup.t.GetComponentInChildren(TMPro.TMP_Text, true);
                if (UnityEngine.Object.op_Implicit(label)) {
                    label.text = "+$" + (StealEggGame.Num(amount) || "");
                }
                popup.t.gameObject.SetActive(true);
                this.popups.add(popup);
            },
            /*StealEggGame.IncomePopup end.*/

            /*StealEggGame.FloatText start.*/
            FloatText: function (world, text, icon) {
if ( TRACE ) { TRACE( "StealEggGame#FloatText", this ); }

                if (!UnityEngine.Object.op_Implicit(this.floatingTextPrefab)) {
                    return;
                }
                var obj = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.floatingTextPrefab, world, this.gameCamera.transform.rotation);
                var label = obj.GetComponentInChildren(TMPro.TMP_Text, true);
                if (UnityEngine.Object.op_Implicit(label)) {
                    label.text = text;
                }
                // World-space prefab (not scene UI): its icon is looked up on the spawned instance.
                var iconNode = obj.transform.Find("Canvas/Icon");
                if (UnityEngine.Object.op_Implicit(iconNode)) {
                    StealEggGame.SetImage(iconNode.GetComponent(UnityEngine.UI.Image), icon);
                }
                var canvas = obj.GetComponentInChildren(UnityEngine.Canvas, true);
                if (UnityEngine.Object.op_Implicit(canvas)) {
                    canvas.worldCamera = this.gameCamera;
                }
                var popup = new StealEggGame.Popup();
                popup.t = obj.transform;
                popup.world = world.$clone();
                this.popups.add(popup);
            },
            /*StealEggGame.FloatText end.*/

            /*StealEggGame.Bind start.*/
            Bind: function (button, action, close) {
if ( TRACE ) { TRACE( "StealEggGame#Bind", this ); }

                if (close === void 0) { close = false; }
                if (!UnityEngine.Object.op_Implicit(button)) {
                    return;
                }
                button.onClick = new UnityEngine.UI.Button.ButtonClickedEvent();
                button.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.PlaySound(close ? this.closeSound : this.clickSound);
                    action();
                }));
            },
            /*StealEggGame.Bind end.*/

            /*StealEggGame.RarityName start.*/
            RarityName: function (rarity) {
if ( TRACE ) { TRACE( "StealEggGame#RarityName", this ); }

                return StealEggGame.RarityNames[Math.max(0, Math.min(rarity, ((StealEggGame.RarityNames.length - 1) | 0)))];
            },
            /*StealEggGame.RarityName end.*/

            /*StealEggGame.RarityColor start.*/
            RarityColor: function (rarity) {
if ( TRACE ) { TRACE( "StealEggGame#RarityColor", this ); }

                return StealEggGame.rarityColors[Math.max(0, Math.min(rarity, ((StealEggGame.rarityColors.length - 1) | 0)))].$clone();
            },
            /*StealEggGame.RarityColor end.*/

            /*StealEggGame.SetRarityText start.*/
            SetRarityText: function (label, rarity) {
if ( TRACE ) { TRACE( "StealEggGame#SetRarityText", this ); }

                if (!UnityEngine.Object.op_Implicit(label)) {
                    return;
                }
                label.text = this.RarityName(rarity);
                var set = Bridge.is(label, TMPro.TextMeshPro) && this.rarityWorldMaterials != null && this.rarityWorldMaterials.length > 0 ? this.rarityWorldMaterials : this.rarityMaterials;
                if (set != null && rarity < set.length && UnityEngine.Object.op_Implicit(set[rarity])) {
                    if (UnityEngine.Object.op_Implicit(this.rarityFont)) {
                        label.font = this.rarityFont;
                    }
                    label.fontSharedMaterial = set[rarity];
                }
            },
            /*StealEggGame.SetRarityText end.*/

            /*StealEggGame.BoostMultiplier start.*/
            BoostMultiplier: function (type) {
if ( TRACE ) { TRACE( "StealEggGame#BoostMultiplier", this ); }

                var $t;
                var sum = 0;
                var any = false;
                $t = Bridge.getEnumerator(this.boosts);
                try {
                    while ($t.moveNext()) {
                        var boost = $t.Current;
                        if (boost.info.type === type) {
                            sum += boost.info.value;
                            any = true;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return any ? Math.max(1, Math.min(sum, 9999)) : 1;
            },
            /*StealEggGame.BoostMultiplier end.*/

            /*StealEggGame.StartWorld start.*/
            StartWorld: function () {
if ( TRACE ) { TRACE( "StealEggGame#StartWorld", this ); }

                if (UnityEngine.Object.op_Implicit(this.sun)) {
                    this.sun.intensity = this.dayLightIntensity;
                }
                if (UnityEngine.Object.op_Implicit(this.nightGraphic)) {
                    this.nightGraphic.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.luckyFrog)) {
                    this.frogScale = this.luckyFrog.localScale.$clone();
                }
            },
            /*StealEggGame.StartWorld end.*/

            /*StealEggGame.UpdateWorld start.*/
            UpdateWorld: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateWorld", this ); }

                this.UpdateDayNight();
                this.UpdateBoosts();
                this.UpdateLuckyEggs();
                this.UpdateFrog();
            },
            /*StealEggGame.UpdateWorld end.*/

            /*StealEggGame.UpdateDayNight start.*/
            UpdateDayNight: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateDayNight", this ); }

                if (!this.TutorialCompleted) {
                    return;
                }
                this.phaseClock += UnityEngine.Time.deltaTime;
                var left = this.PhaseLeft;
                if (UnityEngine.Object.op_Implicit(this.sun)) {
                    var t = Math.max(0, Math.min(1, left / UnityEngine.Mathf.Max(0.01, this.lightTransition)));
                    this.sun.intensity = this.night ? (left < this.lightTransition ? pc.math.lerp(this.dayLightIntensity, 0, t) : 0) : (left < this.lightTransition ? pc.math.lerp(0, this.dayLightIntensity, t) : this.dayLightIntensity);
                }
                if (this.night && UnityEngine.Object.op_Implicit(this.nightText)) {
                    this.nightText.text = Math.ceil(left) + "s";
                }
                if (left > 0) {
                    return;
                }
                this.night = !this.night;
                this.phaseClock = 0;
                if (this.night) {
                    this.SendEveryoneToLobby();
                    this.ResetZoneEggs();
                }
                if (UnityEngine.Object.op_Implicit(this.nightGraphic)) {
                    this.nightGraphic.SetActive(this.night);
                }
            },
            /*StealEggGame.UpdateDayNight end.*/

            /*StealEggGame.AddBoost start.*/
            AddBoost: function (info) {
if ( TRACE ) { TRACE( "StealEggGame#AddBoost", this ); }

                var $t;
                $t = Bridge.getEnumerator(this.boosts);
                try {
                    while ($t.moveNext()) {
                        var active = $t.Current;
                        if (Bridge.referenceEquals(active.info, info)) {
                            active.left += info.duration;
                            return;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                var boost = new StealEggGame.ActiveBoost();
                boost.info = info;
                boost.left = info.duration;
                if (UnityEngine.Object.op_Implicit(this.hudUI.boostTemplate)) {
                    boost.view = UnityEngine.Object.Instantiate$1(IconAmountView, this.hudUI.boostTemplate, this.hudUI.boostContainer, false);
                    boost.view.gameObject.SetActive(true);
                    StealEggGame.SetImage(boost.view.icon, info.icon);
                }
                this.boosts.add(boost);
            },
            /*StealEggGame.AddBoost end.*/

            /*StealEggGame.UpdateBoosts start.*/
            UpdateBoosts: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateBoosts", this ); }

                for (var i = (this.boosts.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var boost = this.boosts.getItem(i);
                    boost.left -= UnityEngine.Time.deltaTime;
                    if (boost.left <= 0) {
                        if (UnityEngine.Object.op_Implicit(boost.view)) {
                            UnityEngine.MonoBehaviour.Destroy(boost.view.gameObject);
                        }
                        this.boosts.removeAt(i);
                        continue;
                    }
                    if (UnityEngine.Object.op_Implicit(boost.view)) {
                        var s = Math.ceil(boost.left);
                        StealEggGame.SetText(boost.view.amount, s >= 3600 ? ((Bridge.Int.div(s, 3600)) | 0) + "h" : s >= 60 ? ((Bridge.Int.div(s, 60)) | 0) + "mins" : (System.Int32.format(s, "00") || "") + "s");
                    }
                }
            },
            /*StealEggGame.UpdateBoosts end.*/

            /*StealEggGame.UpdateFrog start.*/
            UpdateFrog: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateFrog", this ); }

                if (UnityEngine.Object.op_Implicit(this.luckyFrog) && this.frogPunch > 0) {
                    var t = (UnityEngine.Time.time - this.frogPunch) / 0.25;
                    if (t >= 0) {
                        this.luckyFrog.localScale = this.frogScale.$clone().clone().scale( (1 + 0.25 * Math.sin(Math.max(0, Math.min(1, t)) * UnityEngine.Mathf.PI)) );
                    }
                    if (t >= 1) {
                        this.luckyFrog.localScale = this.frogScale.$clone();
                        this.frogPunch = -1;
                    }
                }
                if (this.eggSpawnAt > 0 && UnityEngine.Time.time >= this.eggSpawnAt) {
                    this.eggSpawnAt = -1;
                    this.PlaySound(this.deliverSound);
                    if (UnityEngine.Object.op_Implicit(this.luckyEggPrefab)) {
                        var obj = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.luckyEggPrefab);
                        StealEggGame.DisablePhysics(obj);
                        var egg = new StealEggGame.LuckyEgg();
                        egg.obj = obj.transform;
                        egg.from = UnityEngine.Object.op_Implicit(this.luckyEggSpawn) ? this.luckyEggSpawn.position.$clone() : this.luckyFrog.position.$clone();
                        egg.to = UnityEngine.Object.op_Implicit(this.luckyEggTarget) ? this.luckyEggTarget.position.$clone() : egg.from.$clone().add( new pc.Vec3( 0, 0, -1 ).clone().scale( 3 ) );
                        obj.transform.position = egg.from.$clone();
                        egg.rotation = obj.transform.rotation.$clone();
                        this.luckyEggs.add(egg);
                    }
                }
            },
            /*StealEggGame.UpdateFrog end.*/

            /*StealEggGame.UpdateLuckyEggs start.*/
            UpdateLuckyEggs: function () {
if ( TRACE ) { TRACE( "StealEggGame#UpdateLuckyEggs", this ); }

                for (var i = (this.luckyEggs.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var egg = this.luckyEggs.getItem(i);
                    if (!UnityEngine.Object.op_Implicit(egg.obj)) {
                        this.luckyEggs.removeAt(i);
                        continue;
                    }
                    if (!egg.landed) {
                        egg.clock += UnityEngine.Time.deltaTime;
                        var t = Math.max(0, Math.min(1, egg.clock));
                        var p = new pc.Vec3().lerp( egg.from, egg.to, t );
                        p.y += Math.sin(t * UnityEngine.Mathf.PI) * 3;
                        egg.obj.position = p.$clone();
                        if (t >= 1) {
                            egg.landed = true;
                            egg.rotation = egg.obj.rotation.$clone();
                        }
                        continue;
                    }
                    if (!egg.opening) {
                        continue;
                    }
                    egg.openClock += UnityEngine.Time.deltaTime;
                    var progress = egg.openClock / UnityEngine.Mathf.Max(0.1, this.luckyEggOpenDuration);
                    egg.obj.rotation = egg.rotation.clone().mul( new pc.Quat().setFromEulerAngles_Unity( 0, 0, Math.sin(egg.openClock * 25) * 0.26 * 30 ) );
                    if (progress < 1) {
                        continue;
                    }
                    this.luckyEggs.removeAt(i);
                    UnityEngine.MonoBehaviour.Destroy(egg.obj.gameObject);
                    if (this.luckyEggRewards == null || this.luckyEggRewards.length === 0) {
                        continue;
                    }
                    var weights = System.Array.init(this.luckyEggRewards.length, 0, System.Single);
                    for (var w = 0; w < weights.length; w = (w + 1) | 0) {
                        weights[w] = this.luckyEggRewards[w].weight;
                    }
                    var reward = this.luckyEggRewards[PlayableEggRules.Pick(weights, weights.length)];
                    this.AddBoost(reward);
                    this.ShowReward("Lucky Egg Reward", System.Array.init([reward.icon], UnityEngine.Sprite), System.Array.init(["1"], System.String));
                }
            },
            /*StealEggGame.UpdateLuckyEggs end.*/

            /*StealEggGame.NearestLuckyEgg start.*/
            NearestLuckyEgg: function () {
if ( TRACE ) { TRACE( "StealEggGame#NearestLuckyEgg", this ); }

                var $t;
                $t = Bridge.getEnumerator(this.luckyEggs);
                try {
                    while ($t.moveNext()) {
                        var egg = $t.Current;
                        if (egg.landed && !egg.opening && UnityEngine.Object.op_Implicit(egg.obj) && StealEggGame.FlatDistance(this.player.position.$clone(), egg.obj.position.$clone()) < 2.5) {
                            return egg;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return null;
            },
            /*StealEggGame.NearestLuckyEgg end.*/

            /*StealEggGame.OpenLuckyEgg start.*/
            OpenLuckyEgg: function (egg) {
if ( TRACE ) { TRACE( "StealEggGame#OpenLuckyEgg", this ); }

                if (egg == null || egg.opening) {
                    return;
                }
                egg.opening = true;
                egg.openClock = 0;
                this.PlaySound(this.crackSound);
            },
            /*StealEggGame.OpenLuckyEgg end.*/

            /*StealEggGame.OpenTrailShop start.*/
            OpenTrailShop: function () {
if ( TRACE ) { TRACE( "StealEggGame#OpenTrailShop", this ); }

                if (!this.TutorialCompleted) {
                    this.ShowDialog("You must finish tutorial first");
                    return;
                }
                this.OpenModal(this.trailUI.root);
            },
            /*StealEggGame.OpenTrailShop end.*/

            /*StealEggGame.RegisterIndex start.*/
            RegisterIndex: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#RegisterIndex", this ); }

                if (pet >= 0) {
                    this.collected.add(pet);
                }
            },
            /*StealEggGame.RegisterIndex end.*/

            /*StealEggGame.IndexMoney start.*/
            IndexMoney: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#IndexMoney", this ); }

                return 110 * this.petCatalog[pet].income;
            },
            /*StealEggGame.IndexMoney end.*/

            /*StealEggGame.IndexSpeed start.*/
            IndexSpeed: function (pet) {
if ( TRACE ) { TRACE( "StealEggGame#IndexSpeed", this ); }

                return 25 * Math.max(1, Math.min(this.petCatalog[pet].income * 0.001, 10000));
            },
            /*StealEggGame.IndexSpeed end.*/

            /*StealEggGame.BindIndexUI start.*/
            BindIndexUI: function () {
if ( TRACE ) { TRACE( "StealEggGame#BindIndexUI", this ); }

                this.Bind(this.indexUI.close, Bridge.fn.cacheBind(this, this.CloseModal), true);
                this.Bind(this.indexUI.claim, Bridge.fn.cacheBind(this, this.ClaimIndexReward));
                StealEggGame.Show$1(this.indexUI.root, false);
            },
            /*StealEggGame.BindIndexUI end.*/

            /*StealEggGame.OpenIndex start.*/
            OpenIndex: function () {
if ( TRACE ) { TRACE( "StealEggGame#OpenIndex", this ); }

                if (!this.TutorialCompleted) {
                    this.ShowDialog("You must finish tutorial first");
                    return;
                }
                this.indexSelection = -1;
                this.OpenModal(this.indexUI.root);
                this.RefreshIndex();
            },
            /*StealEggGame.OpenIndex end.*/

            /*StealEggGame.RefreshIndex start.*/
            RefreshIndex: function () {
if ( TRACE ) { TRACE( "StealEggGame#RefreshIndex", this ); }

                var $t, $t1;
                var ui = this.indexUI;
                $t = Bridge.getEnumerator(this.indexRows);
                try {
                    while ($t.moveNext()) {
                        var row = $t.Current;
                        UnityEngine.MonoBehaviour.Destroy(row);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.indexRows.clear();
                var total = 0;
                for (var z = 0; z < this.zones.length; z = (z + 1) | 0) {
                    var view = UnityEngine.Object.Instantiate$1(IndexZoneView, ui.zoneTemplate, ui.zones, false);
                    view.gameObject.SetActive(true);
                    this.indexRows.add(view.gameObject);
                    StealEggGame.SetText(view.zoneName, this.zones[z].name);
                    StealEggGame.SetImage(view.thumbnail, this.zones[z].thumbnail);
                    var count = 0, found = 0;
                    for (var p = 0; p < this.petCatalog.length; p = (p + 1) | 0) {
                        if (this.petCatalog[p].zone !== z) {
                            continue;
                        }
                        count = (count + 1) | 0;
                        var have = this.collected.contains(p);
                        if (have) {
                            found = (found + 1) | 0;
                        }
                        var pet = { v : p };
                        var cell = UnityEngine.Object.Instantiate$1(IndexPetCellView, view.petTemplate, view.petContent, false);
                        cell.gameObject.SetActive(true);
                        if (UnityEngine.Object.op_Implicit(cell.frame) && this.rarityFrames != null && this.petCatalog[p].rarity < this.rarityFrames.length) {
                            StealEggGame.SetImage(cell.frame, this.rarityFrames[this.petCatalog[p].rarity]);
                        }
                        StealEggGame.SetImage(cell.thumbnail, this.petCatalog[p].thumbnail);
                        if (UnityEngine.Object.op_Implicit(cell.thumbnail)) {
                            cell.thumbnail.color = have ? new pc.Color( 1, 1, 1, 1 ) : new pc.Color( 0, 0, 0, 1 );
                        }
                        StealEggGame.SetText(cell.petName, this.petCatalog[p].name);
                        StealEggGame.Show(cell.petName, have);
                        StealEggGame.Show$1(cell.selected, p === this.indexSelection);
                        StealEggGame.Show$1(cell.mark, have && !this.claimed.contains(p));
                        this.Bind(cell.button, (function ($me, pet) {
                            return Bridge.fn.bind($me, function () {
                                this.indexSelection = pet.v;
                                this.RefreshIndex();
                            });
                        })(this, pet));
                    }
                    total = (total + count) | 0;
                    if (UnityEngine.Object.op_Implicit(view.progressFill)) {
                        view.progressFill.fillAmount = count > 0 ? found / count : 0;
                    }
                    StealEggGame.SetText(view.progress, found + "/" + count);
                }
                // The full-game placeholder stays after the zone rows created above.
                if (UnityEngine.Object.op_Implicit(ui.lockedZone)) {
                    ui.lockedZone.SetAsLastSibling();
                    ui.lockedZone.gameObject.SetActive(true);
                }
                if (UnityEngine.Object.op_Implicit(ui.progressFill)) {
                    ui.progressFill.fillAmount = total > 0 ? this.collected.Count / total : 0;
                }
                StealEggGame.SetText(ui.progress, this.collected.Count + "/" + total);
                var selected = this.indexSelection >= 0, known = selected && this.collected.contains(this.indexSelection);
                StealEggGame.Show$1(ui.information, selected);
                StealEggGame.Show$1(ui.rewardFrame, selected);
                if (!selected) {
                    return;
                }
                var data = this.petCatalog[this.indexSelection];
                StealEggGame.SetImage(ui.infoImage, data.thumbnail);
                if (UnityEngine.Object.op_Implicit(ui.infoImage)) {
                    ui.infoImage.color = known ? new pc.Color( 1, 1, 1, 1 ) : new pc.Color( 0, 0, 0, 1 );
                }
                StealEggGame.SetText(ui.infoName, known ? data.name : "???");
                StealEggGame.SetText(ui.infoIncome, known ? "$" + (StealEggGame.Num(data.income) || "") + "/s" : "???");
                this.SetRarityText(ui.infoRarity, data.rarity);
                StealEggGame.Show(ui.claim, known && !this.claimed.contains(this.indexSelection));
                StealEggGame.Show$1(ui.claimed, this.claimed.contains(this.indexSelection));
                $t1 = Bridge.getEnumerator(this.indexRewardRows);
                try {
                    while ($t1.moveNext()) {
                        var row1 = $t1.Current;
                        UnityEngine.MonoBehaviour.Destroy(row1);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                this.indexRewardRows.clear();
                if (UnityEngine.Object.op_Implicit(ui.rewardTemplate)) {
                    this.AddIndexReward(this.moneyIcon, "+" + (StealEggGame.Num(this.IndexMoney(this.indexSelection)) || ""));
                    this.AddIndexReward(this.speedIcon, "+" + (StealEggGame.Num(this.IndexSpeed(this.indexSelection)) || ""));
                }
            },
            /*StealEggGame.RefreshIndex end.*/

            /*StealEggGame.AddIndexReward start.*/
            AddIndexReward: function (icon, amount) {
if ( TRACE ) { TRACE( "StealEggGame#AddIndexReward", this ); }

                var row = UnityEngine.Object.Instantiate$1(IconAmountView, this.indexUI.rewardTemplate, this.indexUI.rewardContent, false);
                row.gameObject.SetActive(true);
                this.indexRewardRows.add(row.gameObject);
                StealEggGame.SetImage(row.icon, icon);
                StealEggGame.SetText(row.amount, amount);
            },
            /*StealEggGame.AddIndexReward end.*/

            /*StealEggGame.ClaimIndexReward start.*/
            ClaimIndexReward: function () {
if ( TRACE ) { TRACE( "StealEggGame#ClaimIndexReward", this ); }

                if (this.indexSelection < 0 || !this.collected.contains(this.indexSelection) || this.claimed.contains(this.indexSelection)) {
                    return;
                }
                this.claimed.add(this.indexSelection);
                var money = this.IndexMoney(this.indexSelection), speed = this.IndexSpeed(this.indexSelection);
                this.AddMoney(money);
                this.AddSpeedPower(speed);
                this.ShowReward("You was claimed rewards!", System.Array.init([this.moneyIcon, this.speedIcon], UnityEngine.Sprite), System.Array.init([StealEggGame.Num(money), StealEggGame.Num(speed)], System.String));
                this.RefreshIndex();
            },
            /*StealEggGame.ClaimIndexReward end.*/


        },
        overloads: {
            "UpdateTapHint(TapHintView, TutorialStep, string)": "UpdateTapHint$1"
        }
    });
    /*StealEggGame end.*/

    /*StealEggGame+ActiveBoost start.*/
    Bridge.define("StealEggGame.ActiveBoost", {
        $kind: 1002,
        fields: {
            info: null,
            left: 0,
            view: null
        }
    });
    /*StealEggGame+ActiveBoost end.*/

    /*StealEggGame+Actor start.*/
    Bridge.define("StealEggGame.Actor", {
        $kind: 1002,
        fields: {
            isPlayer: false,
            root: null,
            model: null,
            stealSlot: null,
            animator: null,
            carried: null,
            speed: 0,
            house: 0,
            state: 0,
            until: 0,
            deadline: 0,
            downUntil: 0,
            downTotal: 0,
            dest: null,
            downDirection: null,
            modelPosition: null,
            modelRotation: null,
            targetEgg: null
        },
        props: {
            Down: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame.Actor#Down#get", this ); }

                    return this.downUntil > 0;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.Actor#init", this ); }

                this.dest = new UnityEngine.Vector3();
                this.downDirection = new UnityEngine.Vector3();
                this.modelPosition = new UnityEngine.Vector3();
                this.modelRotation = new UnityEngine.Quaternion();
            }
        }
    });
    /*StealEggGame+Actor end.*/

    /*StealEggGame+BoneFollower start.*/
    Bridge.define("StealEggGame.BoneFollower", {
        $kind: 1002,
        fields: {
            follower: null,
            bone: null,
            root: null,
            position: null,
            rotation: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.BoneFollower#init", this ); }

                this.position = new UnityEngine.Vector3();
                this.rotation = new UnityEngine.Quaternion();
            }
        }
    });
    /*StealEggGame+BoneFollower end.*/

    /*StealEggGame+BoostInfo start.*/
    Bridge.define("StealEggGame.BoostInfo", {
        $kind: 1002,
        fields: {
            name: null,
            type: 0,
            value: 0,
            duration: 0,
            weight: 0,
            icon: null
        }
    });
    /*StealEggGame+BoostInfo end.*/

    /*StealEggGame+CoopPet start.*/
    Bridge.define("StealEggGame.CoopPet", {
        $kind: 1002,
        fields: {
            item: null,
            obj: null,
            animator: null,
            coop: null,
            target: null,
            nextMove: 0,
            incomeClock: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.CoopPet#init", this ); }

                this.target = new UnityEngine.Vector3();
            }
        }
    });
    /*StealEggGame+CoopPet end.*/

    /*StealEggGame+DialogUI start.*/
    Bridge.define("StealEggGame.DialogUI", {
        $kind: 1002,
        fields: {
            root: null,
            message: null
        }
    });
    /*StealEggGame+DialogUI end.*/

    /*StealEggGame+Egg start.*/
    Bridge.define("StealEggGame.Egg", {
        $kind: 1002,
        fields: {
            transform: null,
            origin: null,
            scale: null,
            rotation: null,
            zone: null,
            variant: 0,
            nest: 0,
            size: 0,
            holder: null,
            onGround: false,
            hidden: false,
            gone: false
        },
        props: {
            Available: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame.Egg#Available#get", this ); }

                    return UnityEngine.Object.op_Implicit(this.transform) && !this.gone && !this.hidden && this.holder == null;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.Egg#init", this ); }

                this.origin = new UnityEngine.Vector3();
                this.scale = new UnityEngine.Vector3();
                this.rotation = new UnityEngine.Quaternion();
                this.size = 1;
            }
        }
    });
    /*StealEggGame+Egg end.*/

    /*StealEggGame+FlyingPet start.*/
    Bridge.define("StealEggGame.FlyingPet", {
        $kind: 1002,
        fields: {
            item: null,
            obj: null,
            from: null,
            scale: null,
            clock: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.FlyingPet#init", this ); }

                this.from = new UnityEngine.Vector3();
                this.scale = new UnityEngine.Vector3();
            }
        }
    });
    /*StealEggGame+FlyingPet end.*/

    /*StealEggGame+GuardState start.*/
    Bridge.define("StealEggGame.GuardState", {
        $kind: 1006,
        statics: {
            fields: {
                Idle: 0,
                Wait: 1,
                Chase: 2,
                Fetch: 3,
                Return: 4
            }
        }
    });
    /*StealEggGame+GuardState end.*/

    /*StealEggGame+House start.*/
    Bridge.define("StealEggGame.House", {
        $kind: 1002,
        fields: {
            root: null,
            coopPad: null,
            treadmillPad: null,
            petContainer: null,
            coopModels: null,
            treadmills: null,
            coopModel: 0,
            treadmill: 0
        },
        props: {
            Coop: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame.House#Coop#get", this ); }

                    var $t;
                    $t = Bridge.getEnumerator(this.coopModels);
                    try {
                        while ($t.moveNext()) {
                            var c = $t.Current;
                            if (UnityEngine.Object.op_Implicit(c) && c.gameObject.activeSelf) {
                                return c;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return this.coopModels[0];
                }
            },
            TrainSlot: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggGame.House#TrainSlot#get", this ); }

                    var t = this.treadmills[Math.max(0, Math.min(((this.treadmill - 1) | 0), ((this.treadmills.length - 1) | 0)))];
                    var slot = t.Find("TrainSlot");
                    return UnityEngine.Object.op_Implicit(slot) ? slot : t;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.House#init", this ); }

                this.coopModel = 1;
                this.treadmill = 1;
            }
        }
    });
    /*StealEggGame+House end.*/

    /*StealEggGame+HudUI start.*/
    Bridge.define("StealEggGame.HudUI", {
        $kind: 1002,
        fields: {
            functions: null,
            actionButtons: null,
            incubateTapHint: null,
            hatchTapHint: null,
            equipTapHint: null,
            trainTapHint: null,
            attack: null,
            settings: null,
            trailShop: null,
            index: null,
            speedMode: null,
            speedOn: null,
            speedOff: null,
            money: null,
            speed: null,
            time: null,
            moneyIcon: null,
            speedIcon: null,
            timeIcon: null,
            indexHighlight: null,
            incubateHighlight: null,
            right: null,
            equipMonster: null,
            incubateEgg: null,
            boostContainer: null,
            boostTemplate: null,
            zoneBanner: null,
            zoneFrame: null,
            zoneName: null,
            incomeTemplate: null
        }
    });
    /*StealEggGame+HudUI end.*/

    /*StealEggGame+IncubatePopupUI start.*/
    Bridge.define("StealEggGame.IncubatePopupUI", {
        $kind: 1002,
        fields: {
            root: null,
            content: null,
            template: null,
            close: null
        }
    });
    /*StealEggGame+IncubatePopupUI end.*/

    /*StealEggGame+Incubator start.*/
    Bridge.define("StealEggGame.Incubator", {
        $kind: 1002,
        fields: {
            item: null,
            obj: null,
            timer: null,
            label: null,
            clock: 0,
            duration: 0,
            openClock: 0,
            ready: false,
            opening: false,
            startScale: null,
            endScale: null,
            rotation: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.Incubator#init", this ); }

                this.startScale = new UnityEngine.Vector3();
                this.endScale = new UnityEngine.Vector3();
                this.rotation = new UnityEngine.Quaternion();
            }
        }
    });
    /*StealEggGame+Incubator end.*/

    /*StealEggGame+IndexUI start.*/
    Bridge.define("StealEggGame.IndexUI", {
        $kind: 1002,
        fields: {
            root: null,
            close: null,
            claim: null,
            zones: null,
            zoneTemplate: null,
            lockedZone: null,
            progressFill: null,
            progress: null,
            information: null,
            rewardFrame: null,
            claimed: null,
            infoImage: null,
            infoName: null,
            infoIncome: null,
            infoRarity: null,
            rewardContent: null,
            rewardTemplate: null
        }
    });
    /*StealEggGame+IndexUI end.*/

    /*StealEggGame+InventoryUI start.*/
    Bridge.define("StealEggGame.InventoryUI", {
        $kind: 1002,
        fields: {
            quickSlots: null,
            bag: null,
            bagClose: null,
            bagPopup: null,
            bagContent: null,
            bagTemplate: null,
            petInfo: null,
            petThumbnail: null,
            petName: null,
            petIncome: null,
            petRarity: null,
            petEquip: null,
            petDrop: null,
            eggInfo: null,
            eggThumbnail: null,
            eggName: null,
            eggWeight: null,
            eggIncubate: null,
            eggDrop: null
        }
    });
    /*StealEggGame+InventoryUI end.*/

    /*StealEggGame+Item start.*/
    Bridge.define("StealEggGame.Item", {
        $kind: 1002,
        fields: {
            kind: 0,
            zone: null,
            variant: 0,
            pet: 0,
            size: 0,
            income: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.Item#init", this ); }

                this.size = 1;
            }
        }
    });
    /*StealEggGame+Item end.*/

    /*StealEggGame+ItemKind start.*/
    Bridge.define("StealEggGame.ItemKind", {
        $kind: 1006,
        statics: {
            fields: {
                Egg: 0,
                Pet: 1,
                Bat: 2
            }
        }
    });
    /*StealEggGame+ItemKind end.*/

    /*StealEggGame+LockedPanelUI start.*/
    Bridge.define("StealEggGame.LockedPanelUI", {
        $kind: 1002,
        fields: {
            root: null,
            close: null
        }
    });
    /*StealEggGame+LockedPanelUI end.*/

    /*StealEggGame+LuckyEgg start.*/
    Bridge.define("StealEggGame.LuckyEgg", {
        $kind: 1002,
        fields: {
            obj: null,
            from: null,
            to: null,
            clock: 0,
            openClock: 0,
            landed: false,
            opening: false,
            rotation: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.LuckyEgg#init", this ); }

                this.from = new UnityEngine.Vector3();
                this.to = new UnityEngine.Vector3();
                this.rotation = new UnityEngine.Quaternion();
            }
        }
    });
    /*StealEggGame+LuckyEgg end.*/

    /*StealEggGame+PetInfo start.*/
    Bridge.define("StealEggGame.PetInfo", {
        $kind: 1002,
        fields: {
            name: null,
            rarity: 0,
            zone: 0,
            income: 0,
            thumbnail: null,
            prefab: null
        }
    });
    /*StealEggGame+PetInfo end.*/

    /*StealEggGame+PetsPopupUI start.*/
    Bridge.define("StealEggGame.PetsPopupUI", {
        $kind: 1002,
        fields: {
            root: null,
            content: null,
            template: null,
            close: null,
            equipBest: null,
            upgradeSlot: null,
            slots: null,
            upgradePrice: null,
            upgradeUnavailable: null
        }
    });
    /*StealEggGame+PetsPopupUI end.*/

    /*StealEggGame+Popup start.*/
    Bridge.define("StealEggGame.Popup", {
        $kind: 1002,
        fields: {
            t: null,
            world: null,
            clock: 0,
            screen: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.Popup#init", this ); }

                this.world = new UnityEngine.Vector3();
            }
        }
    });
    /*StealEggGame+Popup end.*/

    /*StealEggGame+RewardUI start.*/
    Bridge.define("StealEggGame.RewardUI", {
        $kind: 1002,
        fields: {
            root: null,
            title: null,
            content: null,
            template: null,
            close: null,
            tapToClose: null
        }
    });
    /*StealEggGame+RewardUI end.*/

    /*StealEggGame+TrailInfo start.*/
    Bridge.define("StealEggGame.TrailInfo", {
        $kind: 1002,
        fields: {
            name: null,
            rarity: 0,
            multiplier: 0,
            price: 0,
            thumbnail: null,
            frame: null,
            prefab: null
        }
    });
    /*StealEggGame+TrailInfo end.*/

    /*StealEggGame+TreadmillPanelUI start.*/
    Bridge.define("StealEggGame.TreadmillPanelUI", {
        $kind: 1002,
        fields: {
            root: null,
            close: null,
            upgrade: null,
            level: null,
            train: null,
            price: null,
            max: null
        }
    });
    /*StealEggGame+TreadmillPanelUI end.*/

    /*StealEggGame+TutorialStep start.*/
    Bridge.define("StealEggGame.TutorialStep", {
        $kind: 1006,
        statics: {
            fields: {
                Steal: 0,
                BringHome: 1,
                Incubate: 2,
                Hatch: 3,
                Equip: 4,
                Train: 5,
                Done: 6
            }
        }
    });
    /*StealEggGame+TutorialStep end.*/

    /*StealEggGame+Zone start.*/
    Bridge.define("StealEggGame.Zone", {
        $kind: 1002,
        fields: {
            name: null,
            root: null,
            guardian: null,
            nests: null,
            eggPrefabs: null,
            petPrefabs: null,
            eggRules: null,
            bounds: null,
            thumbnail: null,
            attackDistance: 0,
            guardianSpeed: 0,
            sleepSound: null,
            runSound: null,
            catchSound: null,
            guardianHome: null,
            guardianRotation: null,
            animator: null,
            warningMark: null,
            sleepingEffect: null,
            thieves: null,
            revive: null,
            target: null,
            pending: null,
            fetching: null,
            state: 0,
            stateAt: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggGame.Zone#init", this ); }

                this.guardianHome = new UnityEngine.Vector3();
                this.guardianRotation = new UnityEngine.Quaternion();
                this.attackDistance = 3;
                this.guardianSpeed = 7;
            }
        }
    });
    /*StealEggGame+Zone end.*/

    /*TapHintView start.*/
    Bridge.define("TapHintView", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            hand: null,
            shine: null,
            shineGraphic: null
        },
        methods: {
            /*TapHintView.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "TapHintView#Update", this ); }

                var $t;
                var t = ($t = UnityEngine.Time.unscaledTime, $t - Math.floor($t / 0.667) * 0.667);
                var lift = t < 0.2 ? t / 0.2 : t < 0.33 ? 1 - (t - 0.2) / 0.13 * 1.5 : t < 0.667 ? -0.5 * (1 - (t - 0.33) / 0.337) : 0;
                if (UnityEngine.Object.op_Implicit(this.hand)) {
                    this.hand.localPosition = new pc.Vec3( lift * 10, lift * 12, 0 );
                    this.hand.localRotation = new pc.Quat().setFromEulerAngles_Unity( 0, 0, 8 * UnityEngine.Mathf.Max(0, lift) );
                }
                if (UnityEngine.Object.op_Implicit(this.shine)) {
                    var flash = t >= 0.3 && t < 0.667 ? 1 - Math.abs((t - 0.467) / 0.2) : 0;
                    if (UnityEngine.Object.op_Implicit(this.shineGraphic)) {
                        var c = this.shineGraphic.color.$clone();
                        c.a = Math.max(0, Math.min(1, flash));
                        this.shineGraphic.color = c.$clone();
                    }
                    this.shine.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (0.6 + 0.6 * Math.max(0, Math.min(1, (t - 0.3) / 0.37))) );
                }
            },
            /*TapHintView.Update end.*/


        }
    });
    /*TapHintView end.*/

    if ( MODULE_reflection ) {
    var $m = Bridge.setMetadata,
        $n = ["System","UnityEngine","UnityEngine.UI","TMPro","System.Collections.Generic","System.Collections","UnityEngine.EventSystems"];

    /*CameraController start.*/
    $m("CameraController", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.DisallowMultipleComponent(),new UnityEngine.DefaultExecutionOrder(-10)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":2,"n":"Orbit","t":8,"pi":[{"n":"delta","pt":$n[1].Vector2,"ps":0}],"sn":"Orbit","rt":$n[0].Void,"p":[$n[1].Vector2]},{"a":1,"n":"ResetAngles","t":8,"sn":"ResetAngles","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"UpdateTransform","t":8,"sn":"UpdateTransform","rt":$n[0].Void},{"a":2,"n":"cameraManager","t":4,"rt":$n[1].Transform,"sn":"cameraManager"},{"a":2,"n":"controlledCamera","t":4,"rt":$n[1].Camera,"sn":"controlledCamera"},{"a":2,"n":"distance","t":4,"rt":$n[0].Single,"sn":"distance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"game","t":4,"rt":StealEggGame,"sn":"game"},{"a":1,"n":"horizontalAngle","t":4,"rt":$n[0].Single,"sn":"horizontalAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"initialHorizontalAngle","t":4,"rt":$n[0].Single,"sn":"initialHorizontalAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.Serialization.FormerlySerializedAsAttribute("defaultYaw"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"initialVerticalAngle","t":4,"rt":$n[0].Single,"sn":"initialVerticalAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"target","t":4,"rt":$n[1].Transform,"sn":"target"},{"a":1,"n":"verticalAngle","t":4,"rt":$n[0].Single,"sn":"verticalAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CameraController end.*/

    /*StealEggGame start.*/
    $m("StealEggGame", function () { return {"nested":[StealEggGame.Zone,StealEggGame.GuardState,StealEggGame.TutorialStep,StealEggGame.Egg,StealEggGame.Actor,StealEggGame.PetInfo,StealEggGame.TrailInfo,StealEggGame.BoostInfo,StealEggGame.House,StealEggGame.CoopPet,StealEggGame.Incubator,StealEggGame.FlyingPet,StealEggGame.ItemKind,StealEggGame.Item,StealEggGame.BoneFollower,StealEggGame.Popup,StealEggGame.HudUI,StealEggGame.PetsPopupUI,StealEggGame.IncubatePopupUI,StealEggGame.InventoryUI,StealEggGame.RewardUI,StealEggGame.DialogUI,StealEggGame.LockedPanelUI,StealEggGame.TreadmillPanelUI,StealEggGame.IndexUI,StealEggGame.ActiveBoost,StealEggGame.LuckyEgg],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AddBoost","t":8,"pi":[{"n":"info","pt":StealEggGame.BoostInfo,"ps":0}],"sn":"AddBoost","rt":$n[0].Void,"p":[StealEggGame.BoostInfo]},{"a":1,"n":"AddIndexReward","t":8,"pi":[{"n":"icon","pt":$n[1].Sprite,"ps":0},{"n":"amount","pt":$n[0].String,"ps":1}],"sn":"AddIndexReward","rt":$n[0].Void,"p":[$n[1].Sprite,$n[0].String]},{"a":1,"n":"AddItem","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0},{"n":"expose","pt":$n[0].Boolean,"ps":1}],"sn":"AddItem","rt":$n[0].Void,"p":[StealEggGame.Item,$n[0].Boolean]},{"a":2,"n":"AddMoney","t":8,"pi":[{"n":"amount","pt":$n[0].Double,"ps":0}],"sn":"AddMoney","rt":$n[0].Void,"p":[$n[0].Double]},{"a":2,"n":"AddSpeedPower","t":8,"pi":[{"n":"amount","pt":$n[0].Double,"ps":0}],"sn":"AddSpeedPower","rt":$n[0].Void,"p":[$n[0].Double]},{"a":1,"n":"ApplyBatSwing","t":8,"sn":"ApplyBatSwing","rt":$n[0].Void},{"a":2,"n":"Attack","t":8,"sn":"Attack","rt":$n[0].Void},{"a":1,"n":"BeginKnockdown","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0},{"n":"force","pt":$n[1].Vector3,"ps":1}],"sn":"BeginKnockdown","rt":$n[0].Void,"p":[StealEggGame.Zone,$n[1].Vector3]},{"a":1,"n":"BeginTraining","t":8,"sn":"BeginTraining","rt":$n[0].Void},{"a":1,"n":"Bind","t":8,"pi":[{"n":"button","pt":$n[2].Button,"ps":0},{"n":"action","pt":Function,"ps":1},{"n":"close","dv":false,"o":true,"pt":$n[0].Boolean,"ps":2}],"sn":"Bind","rt":$n[0].Void,"p":[$n[2].Button,Function,$n[0].Boolean]},{"a":1,"n":"BindHomeUI","t":8,"sn":"BindHomeUI","rt":$n[0].Void},{"a":1,"n":"BindIndexUI","t":8,"sn":"BindIndexUI","rt":$n[0].Void},{"a":1,"n":"BindInventoryUI","t":8,"sn":"BindInventoryUI","rt":$n[0].Void},{"a":1,"n":"BindOriginalUI","t":8,"sn":"BindOriginalUI","rt":$n[0].Void},{"a":1,"n":"BindSceneButton","t":8,"pi":[{"n":"target","pt":$n[1].Transform,"ps":0},{"n":"action","pt":Function,"ps":1}],"sn":"BindSceneButton","rt":$n[0].Void,"p":[$n[1].Transform,Function]},{"a":1,"n":"BindSceneUI","t":8,"sn":"BindSceneUI","rt":$n[0].Void},{"a":1,"n":"BonePose","is":true,"t":8,"pi":[{"n":"bone","pt":$n[1].Transform,"ps":0},{"n":"root","pt":$n[1].Transform,"ps":1},{"n":"position","out":true,"pt":$n[1].Vector3,"ps":2},{"n":"rotation","out":true,"pt":$n[1].Quaternion,"ps":3}],"sn":"BonePose","rt":$n[0].Void,"p":[$n[1].Transform,$n[1].Transform,$n[1].Vector3,$n[1].Quaternion]},{"a":1,"n":"BoostMultiplier","t":8,"pi":[{"n":"type","pt":$n[0].Int32,"ps":0}],"sn":"BoostMultiplier","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"CatchThief","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0},{"n":"thief","pt":StealEggGame.Actor,"ps":1}],"sn":"CatchThief","rt":$n[0].Void,"p":[StealEggGame.Zone,StealEggGame.Actor]},{"a":1,"n":"ChildText","is":true,"t":8,"pi":[{"n":"root","pt":$n[1].Transform,"ps":0},{"n":"name","pt":$n[0].String,"ps":1}],"sn":"ChildText","rt":$n[3].TMP_Text,"p":[$n[1].Transform,$n[0].String]},{"a":1,"n":"ClaimIndexReward","t":8,"sn":"ClaimIndexReward","rt":$n[0].Void},{"a":1,"n":"ClearStolenEggUI","t":8,"sn":"ClearStolenEggUI","rt":$n[0].Void},{"a":2,"n":"Clock","is":true,"t":8,"pi":[{"n":"seconds","pt":$n[0].Single,"ps":0}],"sn":"Clock","rt":$n[0].String,"p":[$n[0].Single]},{"a":1,"n":"CloseModal","t":8,"sn":"CloseModal","rt":$n[0].Void},{"a":1,"n":"CompleteHatch","t":8,"pi":[{"n":"incubator","pt":StealEggGame.Incubator,"ps":0}],"sn":"CompleteHatch","rt":$n[0].Void,"p":[StealEggGame.Incubator]},{"a":2,"n":"DisablePhysics","is":true,"t":8,"pi":[{"n":"obj","pt":$n[1].GameObject,"ps":0}],"sn":"DisablePhysics","rt":$n[0].Void,"p":[$n[1].GameObject]},{"a":1,"n":"DisableTriggers","t":8,"sn":"DisableTriggers","rt":$n[0].Void},{"a":1,"n":"DoAction","t":8,"pi":[{"n":"key","pt":$n[0].String,"ps":0}],"sn":"DoAction","rt":$n[0].Void,"p":[$n[0].String]},{"a":1,"n":"DressRandom","t":8,"pi":[{"n":"character","pt":$n[1].Transform,"ps":0}],"sn":"DressRandom","rt":$n[0].Void,"p":[$n[1].Transform]},{"a":2,"n":"DropEgg","t":8,"sn":"DropEgg","rt":$n[0].Void},{"a":1,"n":"EggWeight","t":8,"pi":[{"n":"egg","pt":StealEggGame.Egg,"ps":0}],"sn":"EggWeight","rt":$n[0].Single,"p":[StealEggGame.Egg],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"EggWeightOf","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"EggWeightOf","rt":$n[0].Single,"p":[StealEggGame.Item],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"EndFetch","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0}],"sn":"EndFetch","rt":$n[0].Void,"p":[StealEggGame.Zone]},{"a":1,"n":"EndKnockdown","t":8,"sn":"EndKnockdown","rt":$n[0].Void},{"a":1,"n":"EquipBest","t":8,"sn":"EquipBest","rt":$n[0].Void},{"a":1,"n":"EquipHand","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"EquipHand","rt":$n[0].Void,"p":[StealEggGame.Item]},{"a":1,"n":"EquipHandPet","t":8,"sn":"EquipHandPet","rt":$n[0].Void},{"a":1,"n":"EquipPetToCoop","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"EquipPetToCoop","rt":$n[0].Boolean,"p":[StealEggGame.Item],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"FetchNext","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0}],"sn":"FetchNext","rt":$n[0].Void,"p":[StealEggGame.Zone]},{"a":1,"n":"FlatDistance","is":true,"t":8,"pi":[{"n":"a","pt":$n[1].Vector3,"ps":0},{"n":"b","pt":$n[1].Vector3,"ps":1}],"sn":"FlatDistance","rt":$n[0].Single,"p":[$n[1].Vector3,$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"FloatText","t":8,"pi":[{"n":"world","pt":$n[1].Vector3,"ps":0},{"n":"text","pt":$n[0].String,"ps":1},{"n":"icon","pt":$n[1].Sprite,"ps":2}],"sn":"FloatText","rt":$n[0].Void,"p":[$n[1].Vector3,$n[0].String,$n[1].Sprite]},{"a":1,"n":"FollowBone","t":8,"pi":[{"n":"follower","pt":$n[1].Transform,"ps":0},{"n":"bone","pt":$n[1].Transform,"ps":1},{"n":"root","pt":$n[1].Transform,"ps":2}],"sn":"FollowBone","rt":StealEggGame.BoneFollower,"p":[$n[1].Transform,$n[1].Transform,$n[1].Transform]},{"a":1,"n":"GatherEgg","t":8,"sn":"GatherEgg","rt":$n[0].Void},{"a":1,"n":"GroundAt","t":8,"pi":[{"n":"point","pt":$n[1].Vector3,"ps":0}],"sn":"GroundAt","rt":$n[1].Vector3,"p":[$n[1].Vector3]},{"a":1,"n":"Hatch","t":8,"pi":[{"n":"incubator","pt":StealEggGame.Incubator,"ps":0}],"sn":"Hatch","rt":$n[0].Void,"p":[StealEggGame.Incubator]},{"a":1,"n":"HeadBone","is":true,"t":8,"pi":[{"n":"character","pt":$n[1].Transform,"ps":0}],"sn":"HeadBone","rt":$n[1].Transform,"p":[$n[1].Transform]},{"a":1,"n":"HideForRevive","t":8,"pi":[{"n":"egg","pt":StealEggGame.Egg,"ps":0}],"sn":"HideForRevive","rt":$n[0].Void,"p":[StealEggGame.Egg]},{"a":1,"n":"InLobby","t":8,"pi":[{"n":"point","pt":$n[1].Vector3,"ps":0}],"sn":"InLobby","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"InZone","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0},{"n":"point","pt":$n[1].Vector3,"ps":1}],"sn":"InZone","rt":$n[0].Boolean,"p":[StealEggGame.Zone,$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"IncomePopup","t":8,"pi":[{"n":"world","pt":$n[1].Vector3,"ps":0},{"n":"amount","pt":$n[0].Double,"ps":1}],"sn":"IncomePopup","rt":$n[0].Void,"p":[$n[1].Vector3,$n[0].Double]},{"a":1,"n":"IncubateFromBag","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"IncubateFromBag","rt":$n[0].Void,"p":[StealEggGame.Item]},{"a":1,"n":"IncubateHand","t":8,"sn":"IncubateHand","rt":$n[0].Void},{"a":1,"n":"IndexMoney","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"IndexMoney","rt":$n[0].Double,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"n":"IndexSpeed","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"IndexSpeed","rt":$n[0].Double,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"n":"InsideBox","is":true,"t":8,"pi":[{"n":"box","pt":$n[1].BoxCollider,"ps":0},{"n":"point","pt":$n[1].Vector3,"ps":1},{"n":"margin","pt":$n[0].Single,"ps":2}],"sn":"InsideBox","rt":$n[0].Boolean,"p":[$n[1].BoxCollider,$n[1].Vector3,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"IsStationPanel","t":8,"pi":[{"n":"panel","pt":$n[1].GameObject,"ps":0}],"sn":"IsStationPanel","rt":$n[0].Boolean,"p":[$n[1].GameObject],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"ItemIcon","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"ItemIcon","rt":$n[1].Sprite,"p":[StealEggGame.Item]},{"a":1,"n":"ItemModel","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"ItemModel","rt":$n[1].GameObject,"p":[StealEggGame.Item]},{"a":1,"n":"ItemName","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"ItemName","rt":$n[0].String,"p":[StealEggGame.Item]},{"a":1,"n":"ItemRule","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"ItemRule","rt":PlayableEggRules,"p":[StealEggGame.Item]},{"a":2,"n":"Jump","t":8,"sn":"Jump","rt":$n[0].Void},{"a":1,"n":"KnockNpc","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0},{"n":"force","pt":$n[1].Vector3,"ps":1}],"sn":"KnockNpc","rt":$n[0].Void,"p":[StealEggGame.Actor,$n[1].Vector3]},{"a":1,"n":"LargestPetSize","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"LargestPetSize","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"LateUpdateUI","t":8,"sn":"LateUpdateUI","rt":$n[0].Void},{"a":1,"n":"LobbyTeleport","t":8,"sn":"LobbyTeleport","rt":$n[1].Vector3},{"a":1,"n":"LoseEgg","t":8,"pi":[{"n":"thief","pt":StealEggGame.Actor,"ps":0}],"sn":"LoseEgg","rt":$n[0].Void,"p":[StealEggGame.Actor]},{"a":1,"n":"MaxPetSize","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"MaxPetSize","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"MotionFor","is":true,"t":8,"pi":[{"n":"forward","pt":$n[0].Single,"ps":0},{"n":"grounded","pt":$n[0].Boolean,"ps":1},{"n":"vertical","pt":$n[0].Single,"ps":2}],"sn":"MotionFor","rt":$n[0].Int32,"p":[$n[0].Single,$n[0].Boolean,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"MoveCoopPet","t":8,"pi":[{"n":"pet","pt":StealEggGame.CoopPet,"ps":0}],"sn":"MoveCoopPet","rt":$n[0].Void,"p":[StealEggGame.CoopPet]},{"a":1,"n":"MoveNpc","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0},{"n":"target","pt":$n[1].Vector3,"ps":1},{"n":"stop","pt":$n[0].Single,"ps":2}],"sn":"MoveNpc","rt":$n[0].Boolean,"p":[StealEggGame.Actor,$n[1].Vector3,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"MovePlayer","t":8,"sn":"MovePlayer","rt":$n[0].Void},{"a":1,"n":"NearStation","t":8,"pi":[{"n":"station","pt":$n[1].Transform,"ps":0}],"sn":"NearStation","rt":$n[0].Boolean,"p":[$n[1].Transform],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"NearestIncubator","t":8,"pi":[{"n":"readyOnly","pt":$n[0].Boolean,"ps":0}],"sn":"NearestIncubator","rt":StealEggGame.Incubator,"p":[$n[0].Boolean]},{"a":1,"n":"NearestLuckyEgg","t":8,"sn":"NearestLuckyEgg","rt":StealEggGame.LuckyEgg},{"a":2,"n":"NotifyCameraTurned","t":8,"sn":"NotifyCameraTurned","rt":$n[0].Void},{"a":2,"n":"Num","is":true,"t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"Num","rt":$n[0].String,"p":[$n[0].Double]},{"a":1,"n":"OpenIndex","t":8,"sn":"OpenIndex","rt":$n[0].Void},{"a":1,"n":"OpenLuckyEgg","t":8,"pi":[{"n":"egg","pt":StealEggGame.LuckyEgg,"ps":0}],"sn":"OpenLuckyEgg","rt":$n[0].Void,"p":[StealEggGame.LuckyEgg]},{"a":1,"n":"OpenModal","t":8,"pi":[{"n":"panel","pt":$n[1].GameObject,"ps":0}],"sn":"OpenModal","rt":$n[0].Void,"p":[$n[1].GameObject]},{"a":1,"n":"OpenTrailShop","t":8,"sn":"OpenTrailShop","rt":$n[0].Void},{"a":1,"n":"PetItem","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0},{"n":"size","pt":$n[0].Single,"ps":1}],"sn":"PetItem","rt":StealEggGame.Item,"p":[$n[0].Int32,$n[0].Single]},{"a":1,"n":"PlaySound","t":8,"pi":[{"n":"clip","pt":$n[1].AudioClip,"ps":0},{"n":"volume","dv":1.0,"o":true,"pt":$n[0].Single,"ps":1}],"sn":"PlaySound","rt":$n[0].Void,"p":[$n[1].AudioClip,$n[0].Single]},{"a":1,"n":"PressPrimaryAction","t":8,"sn":"PressPrimaryAction","rt":$n[0].Void},{"a":1,"n":"Price","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"Price","rt":$n[0].Double,"p":[$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"n":"PulseSpeedIcon","t":8,"sn":"PulseSpeedIcon","rt":$n[0].Void},{"a":1,"n":"RandomInCoop","t":8,"pi":[{"n":"box","pt":$n[1].BoxCollider,"ps":0}],"sn":"RandomInCoop","rt":$n[1].Vector3,"p":[$n[1].BoxCollider]},{"a":1,"n":"RandomOf","is":true,"t":8,"pi":[{"n":"items","pt":System.Array.type(System.Object),"ps":0}],"tpc":1,"tprm":["T"],"sn":"RandomOf","rt":System.Object,"p":[System.Array.type(System.Object)]},{"a":1,"n":"RarityColor","t":8,"pi":[{"n":"rarity","pt":$n[0].Int32,"ps":0}],"sn":"RarityColor","rt":$n[1].Color,"p":[$n[0].Int32]},{"a":1,"n":"RarityName","t":8,"pi":[{"n":"rarity","pt":$n[0].Int32,"ps":0}],"sn":"RarityName","rt":$n[0].String,"p":[$n[0].Int32]},{"a":1,"n":"RefreshBag","t":8,"sn":"RefreshBag","rt":$n[0].Void},{"a":1,"n":"RefreshIncubatePopup","t":8,"pi":[{"n":"rebuild","pt":$n[0].Boolean,"ps":0}],"sn":"RefreshIncubatePopup","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"RefreshIndex","t":8,"sn":"RefreshIndex","rt":$n[0].Void},{"a":1,"n":"RefreshInventoryUI","t":8,"sn":"RefreshInventoryUI","rt":$n[0].Void},{"a":1,"n":"RefreshPads","t":8,"sn":"RefreshPads","rt":$n[0].Void},{"a":1,"n":"RefreshPetsPopup","t":8,"sn":"RefreshPetsPopup","rt":$n[0].Void},{"a":1,"n":"RefreshSpeedToggle","t":8,"sn":"RefreshSpeedToggle","rt":$n[0].Void},{"a":1,"n":"RegisterIndex","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"RegisterIndex","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"ReleaseEgg","t":8,"pi":[{"n":"thief","pt":StealEggGame.Actor,"ps":0},{"n":"hideForRevive","pt":$n[0].Boolean,"ps":1}],"sn":"ReleaseEgg","rt":$n[0].Void,"p":[StealEggGame.Actor,$n[0].Boolean]},{"a":1,"n":"RemoveItem","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0}],"sn":"RemoveItem","rt":$n[0].Void,"p":[StealEggGame.Item]},{"a":1,"n":"ResetZoneEggs","t":8,"sn":"ResetZoneEggs","rt":$n[0].Void},{"a":1,"n":"Respawn","t":8,"sn":"Respawn","rt":$n[0].Void},{"a":1,"n":"RetargetGuardian","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0},{"n":"delay","pt":$n[0].Single,"ps":1}],"sn":"RetargetGuardian","rt":$n[0].Void,"p":[StealEggGame.Zone,$n[0].Single]},{"a":1,"n":"ReturnToNest","is":true,"t":8,"pi":[{"n":"egg","pt":StealEggGame.Egg,"ps":0}],"sn":"ReturnToNest","rt":$n[0].Void,"p":[StealEggGame.Egg]},{"a":1,"n":"RollEgg","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0}],"sn":"RollEgg","rt":$n[0].Int32,"p":[StealEggGame.Zone],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"RollPet","t":8,"pi":[{"n":"rule","pt":PlayableEggRules,"ps":0},{"n":"zone","pt":StealEggGame.Zone,"ps":1},{"n":"variant","pt":$n[0].Int32,"ps":2}],"sn":"RollPet","rt":$n[0].Int32,"p":[PlayableEggRules,StealEggGame.Zone,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"RollPetSize","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"RollPetSize","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"RollSmallPetSize","t":8,"pi":[{"n":"pet","pt":$n[0].Int32,"ps":0}],"sn":"RollSmallPetSize","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Rule","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0},{"n":"variant","pt":$n[0].Int32,"ps":1}],"sn":"Rule","rt":PlayableEggRules,"p":[StealEggGame.Zone,$n[0].Int32]},{"a":1,"n":"SendEveryoneToLobby","t":8,"sn":"SendEveryoneToLobby","rt":$n[0].Void},{"a":1,"n":"SetAnimatorMovement","is":true,"t":8,"pi":[{"n":"a","pt":$n[1].Animator,"ps":0},{"n":"value","pt":$n[0].Single,"ps":1}],"sn":"SetAnimatorMovement","rt":$n[0].Void,"p":[$n[1].Animator,$n[0].Single]},{"a":1,"n":"SetAnimatorState","is":true,"t":8,"pi":[{"n":"a","pt":$n[1].Animator,"ps":0},{"n":"set","pt":$n[0].Int32,"ps":1},{"n":"motion","pt":$n[0].Int32,"ps":2}],"sn":"SetAnimatorState","rt":$n[0].Void,"p":[$n[1].Animator,$n[0].Int32,$n[0].Int32]},{"a":1,"n":"SetImage","is":true,"t":8,"pi":[{"n":"image","pt":$n[2].Image,"ps":0},{"n":"sprite","pt":$n[1].Sprite,"ps":1}],"sn":"SetImage","rt":$n[0].Void,"p":[$n[2].Image,$n[1].Sprite]},{"a":1,"n":"SetLoop","is":true,"t":8,"pi":[{"n":"source","pt":$n[1].AudioSource,"ps":0},{"n":"on","pt":$n[0].Boolean,"ps":1}],"sn":"SetLoop","rt":$n[0].Void,"p":[$n[1].AudioSource,$n[0].Boolean]},{"a":1,"n":"SetNpcAnimation","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0},{"n":"forward","pt":$n[0].Single,"ps":1}],"sn":"SetNpcAnimation","rt":$n[0].Void,"p":[StealEggGame.Actor,$n[0].Single]},{"a":1,"n":"SetNpcMove","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0},{"n":"forward","pt":$n[0].Single,"ps":1},{"n":"speed","pt":$n[0].Single,"ps":2}],"sn":"SetNpcMove","rt":$n[0].Void,"p":[StealEggGame.Actor,$n[0].Single,$n[0].Single]},{"a":1,"n":"SetPad","t":8,"pi":[{"n":"pad","pt":$n[1].Transform,"ps":0},{"n":"level","pt":$n[0].Int32,"ps":1},{"n":"max","pt":$n[0].Int32,"ps":2},{"n":"price","pt":$n[0].Double,"ps":3}],"sn":"SetPad","rt":$n[0].Void,"p":[$n[1].Transform,$n[0].Int32,$n[0].Int32,$n[0].Double]},{"a":1,"n":"SetRarityText","t":8,"pi":[{"n":"label","pt":$n[3].TMP_Text,"ps":0},{"n":"rarity","pt":$n[0].Int32,"ps":1}],"sn":"SetRarityText","rt":$n[0].Void,"p":[$n[3].TMP_Text,$n[0].Int32]},{"a":1,"n":"SetStep","t":8,"pi":[{"n":"step","pt":StealEggGame.TutorialStep,"ps":0}],"sn":"SetStep","rt":$n[0].Void,"p":[StealEggGame.TutorialStep]},{"a":1,"n":"SetText","is":true,"t":8,"pi":[{"n":"label","pt":$n[3].TMP_Text,"ps":0},{"n":"value","pt":$n[0].String,"ps":1}],"sn":"SetText","rt":$n[0].Void,"p":[$n[3].TMP_Text,$n[0].String]},{"a":2,"n":"SetVisualSize","is":true,"t":8,"pi":[{"n":"obj","pt":$n[1].GameObject,"ps":0},{"n":"height","pt":$n[0].Single,"ps":1}],"sn":"SetVisualSize","rt":$n[0].Void,"p":[$n[1].GameObject,$n[0].Single]},{"a":1,"n":"Show","is":true,"t":8,"pi":[{"n":"c","pt":$n[1].Component,"ps":0},{"n":"visible","pt":$n[0].Boolean,"ps":1}],"sn":"Show","rt":$n[0].Void,"p":[$n[1].Component,$n[0].Boolean]},{"a":1,"n":"Show","is":true,"t":8,"pi":[{"n":"obj","pt":$n[1].GameObject,"ps":0},{"n":"visible","pt":$n[0].Boolean,"ps":1}],"sn":"Show$1","rt":$n[0].Void,"p":[$n[1].GameObject,$n[0].Boolean]},{"a":1,"n":"ShowCoopModel","t":8,"pi":[{"n":"house","pt":StealEggGame.House,"ps":0},{"n":"id","pt":$n[0].Int32,"ps":1}],"sn":"ShowCoopModel","rt":$n[0].Void,"p":[StealEggGame.House,$n[0].Int32]},{"a":1,"n":"ShowDialog","t":8,"pi":[{"n":"message","pt":$n[0].String,"ps":0}],"sn":"ShowDialog","rt":$n[0].Void,"p":[$n[0].String]},{"a":1,"n":"ShowMark","is":true,"t":8,"pi":[{"n":"mark","pt":$n[2].Graphic,"ps":0},{"n":"visible","pt":$n[0].Boolean,"ps":1}],"sn":"ShowMark","rt":$n[0].Void,"p":[$n[2].Graphic,$n[0].Boolean]},{"a":1,"n":"ShowPetInfo","t":8,"pi":[{"n":"model","pt":$n[1].Transform,"ps":0},{"n":"item","pt":StealEggGame.Item,"ps":1}],"sn":"ShowPetInfo","rt":$n[0].Void,"p":[$n[1].Transform,StealEggGame.Item]},{"a":1,"n":"ShowReward","t":8,"pi":[{"n":"title","pt":$n[0].String,"ps":0},{"n":"icons","pt":System.Array.type(UnityEngine.Sprite),"ps":1},{"n":"amounts","pt":$n[0].Array.type(System.String),"ps":2}],"sn":"ShowReward","rt":$n[0].Void,"p":[$n[0].String,System.Array.type(UnityEngine.Sprite),$n[0].Array.type(System.String)]},{"a":1,"n":"ShowTreadmill","t":8,"pi":[{"n":"house","pt":StealEggGame.House,"ps":0},{"n":"level","pt":$n[0].Int32,"ps":1}],"sn":"ShowTreadmill","rt":$n[0].Void,"p":[StealEggGame.House,$n[0].Int32]},{"a":1,"n":"ShowWarning","t":8,"pi":[{"n":"on","pt":$n[0].Boolean,"ps":0}],"sn":"ShowWarning","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"Slot","is":true,"t":8,"pi":[{"n":"character","pt":$n[1].Transform,"ps":0}],"sn":"Slot","rt":$n[1].Transform,"p":[$n[1].Transform]},{"a":1,"n":"SlotsAt","t":8,"pi":[{"n":"level","pt":$n[0].Int32,"ps":0}],"sn":"SlotsAt","rt":$n[0].Int32,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"SpawnCoopPet","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0},{"n":"coop","pt":$n[1].BoxCollider,"ps":1},{"n":"parent","pt":$n[1].Transform,"ps":2}],"sn":"SpawnCoopPet","rt":StealEggGame.CoopPet,"p":[StealEggGame.Item,$n[1].BoxCollider,$n[1].Transform]},{"a":1,"n":"SpawnNestEgg","t":8,"pi":[{"n":"zone","pt":StealEggGame.Zone,"ps":0},{"n":"n","pt":$n[0].Int32,"ps":1}],"sn":"SpawnNestEgg","rt":$n[0].Void,"p":[StealEggGame.Zone,$n[0].Int32]},{"a":2,"n":"SpeedPowerFor","t":8,"pi":[{"n":"speed","pt":$n[0].Single,"ps":0}],"sn":"SpeedPowerFor","rt":$n[0].Double,"p":[$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"n":"SpendMoney","t":8,"pi":[{"n":"price","pt":$n[0].Double,"ps":0}],"sn":"SpendMoney","rt":$n[0].Boolean,"p":[$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"StartHome","t":8,"sn":"StartHome","rt":$n[0].Void},{"a":1,"n":"StartIncubation","t":8,"pi":[{"n":"item","pt":StealEggGame.Item,"ps":0},{"n":"point","pt":$n[1].Vector3,"ps":1},{"n":"rotation","pt":$n[1].Quaternion,"ps":2}],"sn":"StartIncubation","rt":$n[0].Void,"p":[StealEggGame.Item,$n[1].Vector3,$n[1].Quaternion]},{"a":1,"n":"StartNpcs","t":8,"sn":"StartNpcs","rt":$n[0].Void},{"a":1,"n":"StartOutfits","t":8,"sn":"StartOutfits","rt":$n[0].Void},{"a":1,"n":"StartWorld","t":8,"sn":"StartWorld","rt":$n[0].Void},{"a":1,"n":"Station","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"station","pt":$n[1].Transform,"ps":1},{"n":"panel","pt":$n[1].GameObject,"ps":2},{"n":"onOpen","pt":Function,"ps":3}],"sn":"Station","rt":$n[0].Void,"p":[$n[0].Int32,$n[1].Transform,$n[1].GameObject,Function]},{"a":1,"n":"TakeEgg","t":8,"pi":[{"n":"thief","pt":StealEggGame.Actor,"ps":0},{"n":"egg","pt":StealEggGame.Egg,"ps":1}],"sn":"TakeEgg","rt":$n[0].Void,"p":[StealEggGame.Actor,StealEggGame.Egg]},{"a":1,"n":"TapQuickSlot","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"TapQuickSlot","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"TeleportPlayer","t":8,"pi":[{"n":"point","pt":$n[1].Vector3,"ps":0}],"sn":"TeleportPlayer","rt":$n[0].Void,"p":[$n[1].Vector3]},{"a":1,"n":"ThinkNpc","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0}],"sn":"ThinkNpc","rt":$n[0].Void,"p":[StealEggGame.Actor]},{"a":1,"n":"ToggleBag","t":8,"sn":"ToggleBag","rt":$n[0].Void},{"a":1,"n":"TopOf","is":true,"t":8,"pi":[{"n":"t","pt":$n[1].Transform,"ps":0}],"sn":"TopOf","rt":$n[0].Single,"p":[$n[1].Transform],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"TryStartSteal","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0}],"sn":"TryStartSteal","rt":$n[0].Boolean,"p":[StealEggGame.Actor],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"UnequipCoopPet","t":8,"pi":[{"n":"pet","pt":StealEggGame.CoopPet,"ps":0}],"sn":"UnequipCoopPet","rt":$n[0].Void,"p":[StealEggGame.CoopPet]},{"a":1,"n":"UnequipHand","t":8,"sn":"UnequipHand","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateBoneFollowers","t":8,"sn":"UpdateBoneFollowers","rt":$n[0].Void},{"a":1,"n":"UpdateBoosts","t":8,"sn":"UpdateBoosts","rt":$n[0].Void},{"a":1,"n":"UpdateCombat","t":8,"sn":"UpdateCombat","rt":$n[0].Void},{"a":1,"n":"UpdateDayNight","t":8,"sn":"UpdateDayNight","rt":$n[0].Void},{"a":1,"n":"UpdateFlyingPet","t":8,"pi":[{"n":"fly","pt":StealEggGame.FlyingPet,"ps":0}],"sn":"UpdateFlyingPet","rt":$n[0].Void,"p":[StealEggGame.FlyingPet]},{"a":1,"n":"UpdateFootsteps","t":8,"pi":[{"n":"speed","pt":$n[0].Single,"ps":0}],"sn":"UpdateFootsteps","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"UpdateFrog","t":8,"sn":"UpdateFrog","rt":$n[0].Void},{"a":1,"n":"UpdateGuardians","t":8,"sn":"UpdateGuardians","rt":$n[0].Void},{"a":1,"n":"UpdateGuide","t":8,"sn":"UpdateGuide","rt":$n[0].Void},{"a":1,"n":"UpdateHandVisual","t":8,"sn":"UpdateHandVisual","rt":$n[0].Void},{"a":1,"n":"UpdateHome","t":8,"sn":"UpdateHome","rt":$n[0].Void},{"a":1,"n":"UpdateHud","t":8,"sn":"UpdateHud","rt":$n[0].Void},{"a":1,"n":"UpdateIncubator","t":8,"pi":[{"n":"incubator","pt":StealEggGame.Incubator,"ps":0}],"sn":"UpdateIncubator","rt":$n[0].Void,"p":[StealEggGame.Incubator]},{"a":1,"n":"UpdateInteraction","t":8,"sn":"UpdateInteraction","rt":$n[0].Void},{"a":1,"n":"UpdateKnockdown","t":8,"sn":"UpdateKnockdown","rt":$n[0].Void},{"a":1,"n":"UpdateLuckyEggs","t":8,"sn":"UpdateLuckyEggs","rt":$n[0].Void},{"a":1,"n":"UpdateNpcDown","t":8,"pi":[{"n":"npc","pt":StealEggGame.Actor,"ps":0}],"sn":"UpdateNpcDown","rt":$n[0].Void,"p":[StealEggGame.Actor]},{"a":1,"n":"UpdateNpcs","t":8,"sn":"UpdateNpcs","rt":$n[0].Void},{"a":1,"n":"UpdatePetInfos","t":8,"sn":"UpdatePetInfos","rt":$n[0].Void},{"a":1,"n":"UpdatePlayerAnimation","t":8,"sn":"UpdatePlayerAnimation","rt":$n[0].Void},{"a":1,"n":"UpdateSafeArea","t":8,"sn":"UpdateSafeArea","rt":$n[0].Void},{"a":1,"n":"UpdateStations","t":8,"sn":"UpdateStations","rt":$n[0].Void},{"a":1,"n":"UpdateTapHint","t":8,"sn":"UpdateTapHint","rt":$n[0].Void},{"a":1,"n":"UpdateTapHint","t":8,"pi":[{"n":"hint","pt":TapHintView,"ps":0},{"n":"step","pt":StealEggGame.TutorialStep,"ps":1},{"n":"action","pt":$n[0].String,"ps":2}],"sn":"UpdateTapHint$1","rt":$n[0].Void,"p":[TapHintView,StealEggGame.TutorialStep,$n[0].String]},{"a":1,"n":"UpdateTraining","t":8,"sn":"UpdateTraining","rt":$n[0].Void},{"a":1,"n":"UpdateTutorialHints","t":8,"sn":"UpdateTutorialHints","rt":$n[0].Void},{"a":1,"n":"UpdateWorld","t":8,"sn":"UpdateWorld","rt":$n[0].Void},{"a":1,"n":"UpdateZoneBanner","t":8,"sn":"UpdateZoneBanner","rt":$n[0].Void},{"a":1,"n":"UpgradeCoop","t":8,"sn":"UpgradeCoop","rt":$n[0].Void},{"a":1,"n":"UpgradeTreadmill","t":8,"sn":"UpgradeTreadmill","rt":$n[0].Void},{"a":2,"n":"WalkSpeed","t":8,"pi":[{"n":"power","pt":$n[0].Double,"ps":0}],"sn":"WalkSpeed","rt":$n[0].Single,"p":[$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WearHair","t":8,"pi":[{"n":"character","pt":$n[1].Transform,"ps":0},{"n":"hair","pt":$n[1].GameObject,"ps":1}],"sn":"WearHair","rt":$n[0].Void,"p":[$n[1].Transform,$n[1].GameObject]},{"a":1,"n":"WearMaterial","is":true,"t":8,"pi":[{"n":"character","pt":$n[1].Transform,"ps":0},{"n":"material","pt":$n[1].Material,"ps":1},{"n":"parts","ip":true,"pt":$n[0].Array.type(System.String),"ps":2}],"sn":"WearMaterial","rt":$n[0].Void,"p":[$n[1].Transform,$n[1].Material,$n[0].Array.type(System.String)]},{"a":1,"n":"AnyIncubatorReady","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_AnyIncubatorReady","t":8,"rt":$n[0].Boolean,"fg":"AnyIncubatorReady","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"AnyIncubatorReady"},{"a":1,"n":"Blocked","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_Blocked","t":8,"rt":$n[0].Boolean,"fg":"Blocked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Blocked"},{"a":1,"n":"CanUseInventory","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_CanUseInventory","t":8,"rt":$n[0].Boolean,"fg":"CanUseInventory","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanUseInventory"},{"a":1,"n":"CoopCenter","t":16,"rt":$n[1].Vector3,"g":{"a":1,"n":"get_CoopCenter","t":8,"rt":$n[1].Vector3,"fg":"CoopCenter"},"fn":"CoopCenter"},{"a":2,"n":"EndCardVisible","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_EndCardVisible","t":8,"rt":$n[0].Boolean,"fg":"EndCardVisible","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"EndCardVisible"},{"a":1,"n":"FightActive","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_FightActive","t":8,"rt":$n[0].Boolean,"fg":"FightActive","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"FightActive"},{"a":1,"n":"IncubateTick","t":16,"rt":$n[0].Single,"g":{"a":1,"n":"get_IncubateTick","t":8,"rt":$n[0].Single,"fg":"IncubateTick","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"IncubateTick"},{"a":1,"n":"IndexClaimable","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_IndexClaimable","t":8,"rt":$n[0].Boolean,"fg":"IndexClaimable","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IndexClaimable"},{"a":1,"n":"InputBlocked","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_InputBlocked","t":8,"rt":$n[0].Boolean,"fg":"InputBlocked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"InputBlocked"},{"a":1,"n":"InsideMyCoop","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_InsideMyCoop","t":8,"rt":$n[0].Boolean,"fg":"InsideMyCoop","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"InsideMyCoop"},{"a":2,"n":"IsCarrying","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsCarrying","t":8,"rt":$n[0].Boolean,"fg":"IsCarrying","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsCarrying"},{"a":2,"n":"IsInputBlocked","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsInputBlocked","t":8,"rt":$n[0].Boolean,"fg":"IsInputBlocked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsInputBlocked"},{"a":2,"n":"IsKnockedDown","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsKnockedDown","t":8,"rt":$n[0].Boolean,"fg":"IsKnockedDown","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsKnockedDown"},{"a":1,"n":"MaxCoopLevel","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_MaxCoopLevel","t":8,"rt":$n[0].Int32,"fg":"MaxCoopLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"MaxCoopLevel"},{"a":1,"n":"MaxSlots","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_MaxSlots","t":8,"rt":$n[0].Int32,"fg":"MaxSlots","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"MaxSlots"},{"a":1,"n":"MaxTreadmillLevel","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_MaxTreadmillLevel","t":8,"rt":$n[0].Int32,"fg":"MaxTreadmillLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"MaxTreadmillLevel"},{"a":2,"n":"Money","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Money","t":8,"rt":$n[0].Double,"fg":"Money","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},"s":{"a":1,"n":"set_Money","t":8,"p":[$n[0].Double],"rt":$n[0].Void,"fs":"Money"},"fn":"Money"},{"a":1,"n":"MyHouse","t":16,"rt":StealEggGame.House,"g":{"a":1,"n":"get_MyHouse","t":8,"rt":StealEggGame.House,"fg":"MyHouse"},"fn":"MyHouse"},{"a":1,"n":"NearTreadmill","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_NearTreadmill","t":8,"rt":$n[0].Boolean,"fg":"NearTreadmill","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"NearTreadmill"},{"a":1,"n":"PhaseLeft","t":16,"rt":$n[0].Single,"g":{"a":1,"n":"get_PhaseLeft","t":8,"rt":$n[0].Single,"fg":"PhaseLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"PhaseLeft"},{"a":1,"n":"QuickSlotCount","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_QuickSlotCount","t":8,"rt":$n[0].Int32,"fg":"QuickSlotCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"QuickSlotCount"},{"a":2,"n":"SpeedPower","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_SpeedPower","t":8,"rt":$n[0].Double,"fg":"SpeedPower","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},"s":{"a":1,"n":"set_SpeedPower","t":8,"p":[$n[0].Double],"rt":$n[0].Void,"fs":"SpeedPower"},"fn":"SpeedPower"},{"a":1,"n":"StationPanels","t":16,"rt":System.Array.type(UnityEngine.GameObject),"g":{"a":1,"n":"get_StationPanels","t":8,"rt":System.Array.type(UnityEngine.GameObject),"fg":"StationPanels"},"fn":"StationPanels"},{"a":2,"n":"Step","t":16,"rt":StealEggGame.TutorialStep,"g":{"a":2,"n":"get_Step","t":8,"rt":StealEggGame.TutorialStep,"fg":"Step","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},"s":{"a":1,"n":"set_Step","t":8,"p":[StealEggGame.TutorialStep],"rt":$n[0].Void,"fs":"Step"},"fn":"Step"},{"a":2,"n":"TutorialCompleted","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_TutorialCompleted","t":8,"rt":$n[0].Boolean,"fg":"TutorialCompleted","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"TutorialCompleted"},{"a":1,"n":"carried","t":16,"rt":StealEggGame.Egg,"g":{"a":1,"n":"get_carried","t":8,"rt":StealEggGame.Egg,"fg":"carried"},"s":{"a":1,"n":"set_carried","t":8,"p":[StealEggGame.Egg],"rt":$n[0].Void,"fs":"carried"},"fn":"carried"},{"a":2,"n":"AnimMotion","is":true,"t":4,"rt":$n[0].String,"sn":"AnimMotion"},{"a":2,"n":"AnimSet","is":true,"t":4,"rt":$n[0].String,"sn":"AnimSet"},{"a":1,"n":"FightDuration","is":true,"t":4,"rt":$n[0].Single,"sn":"FightDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"LockedContent","is":true,"t":4,"rt":$n[0].String,"sn":"LockedContent"},{"a":2,"n":"LockedZone","is":true,"t":4,"rt":$n[0].String,"sn":"LockedZone"},{"a":2,"n":"MotionFall","is":true,"t":4,"rt":$n[0].Int32,"sn":"MotionFall","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"MotionIdle","is":true,"t":4,"rt":$n[0].Int32,"sn":"MotionIdle","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"MotionJump","is":true,"t":4,"rt":$n[0].Int32,"sn":"MotionJump","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"MotionRun","is":true,"t":4,"rt":$n[0].Int32,"sn":"MotionRun","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"MotionWalk","is":true,"t":4,"rt":$n[0].Int32,"sn":"MotionWalk","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcGoEgg","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcGoEgg","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcGoHome","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcGoHome","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcGoTrain","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcGoTrain","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcRest","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcRest","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcTakeEgg","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcTakeEgg","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcTrain","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcTrain","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"NpcWander","is":true,"t":4,"rt":$n[0].Int32,"sn":"NpcWander","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"PlayNowButton","is":true,"t":4,"rt":$n[0].String,"sn":"PlayNowButton"},{"a":2,"n":"QuickSlotName","is":true,"t":4,"rt":$n[0].String,"sn":"QuickSlotName"},{"a":2,"n":"RarityNames","is":true,"t":4,"rt":$n[0].Array.type(System.String),"sn":"RarityNames","ro":true},{"a":2,"n":"SetCarry","is":true,"t":4,"rt":$n[0].Int32,"sn":"SetCarry","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"SetFight","is":true,"t":4,"rt":$n[0].Int32,"sn":"SetFight","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"SetHold","is":true,"t":4,"rt":$n[0].Int32,"sn":"SetHold","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"SetPlain","is":true,"t":4,"rt":$n[0].Int32,"sn":"SetPlain","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"SkinnedHairName","is":true,"t":4,"rt":$n[0].String,"sn":"SkinnedHairName"},{"a":2,"n":"TapHintName","is":true,"t":4,"rt":$n[0].String,"sn":"TapHintName"},{"a":1,"n":"actionTarget","t":4,"rt":$n[1].Transform,"sn":"actionTarget"},{"a":1,"n":"actions","t":4,"rt":$n[4].Dictionary$2(System.String,UnityEngine.GameObject),"sn":"actions","ro":true},{"a":1,"n":"attackHitAt","t":4,"rt":$n[0].Single,"sn":"attackHitAt","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"attackHitEnd","t":4,"rt":$n[0].Single,"sn":"attackHitEnd","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"attackReadyAt","t":4,"rt":$n[0].Single,"sn":"attackReadyAt","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"attackerRotation","t":4,"rt":$n[1].Quaternion,"sn":"attackerRotation"},{"a":1,"n":"bagCells","t":4,"rt":$n[4].List$1(UnityEngine.GameObject),"sn":"bagCells","ro":true},{"a":1,"n":"bagSelection","t":4,"rt":StealEggGame.Item,"sn":"bagSelection"},{"a":2,"n":"baseMoveSpeed","t":4,"rt":$n[0].Single,"sn":"baseMoveSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"batCooldown","t":4,"rt":$n[0].Single,"sn":"batCooldown","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"batForce","t":4,"rt":$n[0].Single,"sn":"batForce","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"batIcon","t":4,"rt":$n[1].Sprite,"sn":"batIcon"},{"a":2,"n":"batPrefab","t":4,"rt":$n[1].GameObject,"sn":"batPrefab"},{"a":1,"n":"boneFollowers","t":4,"rt":$n[4].List$1(StealEggGame.BoneFollower),"sn":"boneFollowers","ro":true},{"a":1,"n":"boosts","t":4,"rt":$n[4].List$1(StealEggGame.ActiveBoost),"sn":"boosts","ro":true},{"at":[new UnityEngine.TooltipAttribute("Scene object (Playable UI/Safe area/Camera hint, child Hand): a hand swiping sideways until the player turns the camera."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraHint","t":4,"rt":$n[1].RectTransform,"sn":"cameraHint"},{"a":1,"n":"cameraTurned","t":4,"rt":$n[0].Boolean,"sn":"cameraTurned","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"capturesForEndCard","t":4,"rt":$n[0].Int32,"sn":"capturesForEndCard","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"carryHand","t":4,"rt":$n[1].Transform,"sn":"carryHand"},{"a":1,"n":"carryPoint","t":4,"rt":$n[1].Transform,"sn":"carryPoint"},{"a":1,"n":"catchCooldown","t":4,"rt":$n[0].Single,"sn":"catchCooldown","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"caughtSound","t":4,"rt":$n[1].AudioClip,"sn":"caughtSound"},{"a":2,"n":"circleSprite","t":4,"rt":$n[1].Sprite,"sn":"circleSprite"},{"a":1,"n":"claimed","t":4,"rt":$n[4].HashSet$1(System.Int32),"sn":"claimed","ro":true},{"a":2,"n":"clickSound","t":4,"rt":$n[1].AudioClip,"sn":"clickSound"},{"a":2,"n":"closeSound","t":4,"rt":$n[1].AudioClip,"sn":"closeSound"},{"a":1,"n":"collected","t":4,"rt":$n[4].HashSet$1(System.Int32),"sn":"collected","ro":true},{"a":2,"n":"combatArea","t":4,"rt":$n[1].BoxCollider,"sn":"combatArea"},{"a":2,"n":"coopBaseSlots","t":4,"rt":$n[0].Int32,"sn":"coopBaseSlots","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"coopLevel","t":4,"rt":$n[0].Int32,"sn":"coopLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"coopModelByLevel","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"coopModelByLevel"},{"a":1,"n":"coopPets","t":4,"rt":$n[4].List$1(StealEggGame.CoopPet),"sn":"coopPets","ro":true},{"at":[new UnityEngine.HeaderAttribute("Original balance")],"a":2,"n":"coopPrices","t":4,"rt":$n[0].Array.type(System.Double),"sn":"coopPrices"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"coopUI","t":4,"rt":StealEggGame.LockedPanelUI,"sn":"coopUI"},{"a":2,"n":"crackSound","t":4,"rt":$n[1].AudioClip,"sn":"crackSound"},{"a":1,"n":"currentAction","t":4,"rt":$n[0].String,"sn":"currentAction"},{"a":2,"n":"dayDuration","t":4,"rt":$n[0].Single,"sn":"dayDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"dayIcon","t":4,"rt":$n[1].Sprite,"sn":"dayIcon"},{"a":2,"n":"dayLightIntensity","t":4,"rt":$n[0].Single,"sn":"dayLightIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"decorPets","t":4,"rt":$n[4].List$1(StealEggGame.CoopPet),"sn":"decorPets","ro":true},{"a":2,"n":"deliverSound","t":4,"rt":$n[1].AudioClip,"sn":"deliverSound"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"dialogUI","t":4,"rt":StealEggGame.DialogUI,"sn":"dialogUI"},{"a":1,"n":"dialogUntil","t":4,"rt":$n[0].Single,"sn":"dialogUntil","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"eggBreakEffect","t":4,"rt":$n[1].GameObject,"sn":"eggBreakEffect"},{"a":1,"n":"eggSpawnAt","t":4,"rt":$n[0].Single,"sn":"eggSpawnAt","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"eggs","t":4,"rt":$n[4].List$1(StealEggGame.Egg),"sn":"eggs","ro":true},{"a":1,"n":"endCardShown","t":4,"rt":$n[0].Boolean,"sn":"endCardShown","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"equipSound","t":4,"rt":$n[1].AudioClip,"sn":"equipSound"},{"a":2,"n":"exchangeShop","t":4,"rt":$n[1].Transform,"sn":"exchangeShop"},{"a":1,"n":"fightMotion","t":4,"rt":$n[0].Int32,"sn":"fightMotion","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"fightStart","t":4,"rt":$n[0].Single,"sn":"fightStart","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"firstInput","t":4,"rt":$n[0].Boolean,"sn":"firstInput","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"floatingTextPrefab","t":4,"rt":$n[1].GameObject,"sn":"floatingTextPrefab"},{"a":1,"n":"flying","t":4,"rt":$n[4].List$1(StealEggGame.FlyingPet),"sn":"flying","ro":true},{"a":2,"n":"footstepSound","t":4,"rt":$n[1].AudioClip,"sn":"footstepSound"},{"a":1,"n":"frogPunch","t":4,"rt":$n[0].Single,"sn":"frogPunch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"frogScale","t":4,"rt":$n[1].Vector3,"sn":"frogScale"},{"a":2,"n":"frogSound","t":4,"rt":$n[1].AudioClip,"sn":"frogSound"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"frogUI","t":4,"rt":StealEggGame.LockedPanelUI,"sn":"frogUI"},{"a":1,"n":"functionsHome","t":4,"rt":$n[1].Vector2,"sn":"functionsHome"},{"a":2,"n":"fuseDuration","t":4,"rt":$n[0].Single,"sn":"fuseDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"fuseMachine","t":4,"rt":$n[1].Transform,"sn":"fuseMachine"},{"a":2,"n":"fuseSound","t":4,"rt":$n[1].AudioClip,"sn":"fuseSound"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"fuseUI","t":4,"rt":StealEggGame.LockedPanelUI,"sn":"fuseUI"},{"a":2,"n":"gameCamera","t":4,"rt":$n[1].Camera,"sn":"gameCamera"},{"a":2,"n":"getUpDuration","t":4,"rt":$n[0].Single,"sn":"getUpDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"gravity","t":4,"rt":$n[0].Single,"sn":"gravity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"guide","t":4,"rt":$n[1].LineRenderer,"sn":"guide"},{"a":2,"n":"guideMaterial","t":4,"rt":$n[1].Material,"sn":"guideMaterial"},{"a":1,"n":"hand","t":4,"rt":StealEggGame.Item,"sn":"hand"},{"a":1,"n":"handVisual","t":4,"rt":$n[1].GameObject,"sn":"handVisual"},{"a":2,"n":"hatchDuration","t":4,"rt":$n[0].Single,"sn":"hatchDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"hatchSound","t":4,"rt":$n[1].AudioClip,"sn":"hatchSound"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hintHand","t":4,"rt":$n[1].RectTransform,"sn":"hintHand"},{"a":1,"n":"hitApplied","t":4,"rt":$n[0].Boolean,"sn":"hitApplied","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"hitByBat","t":4,"rt":$n[0].Boolean,"sn":"hitByBat","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"hitClock","t":4,"rt":$n[0].Single,"sn":"hitClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"hitDirection","t":4,"rt":$n[1].Vector3,"sn":"hitDirection"},{"a":2,"n":"hitWindup","t":4,"rt":$n[0].Single,"sn":"hitWindup","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"hitZone","t":4,"rt":StealEggGame.Zone,"sn":"hitZone"},{"a":2,"n":"home","t":4,"rt":$n[1].Transform,"sn":"home"},{"at":[new UnityEngine.HeaderAttribute("Original scene")],"a":2,"n":"houses","t":4,"rt":System.Array.type(StealEggGame.House),"sn":"houses"},{"at":[new UnityEngine.HeaderAttribute("Original UI (scene references)"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hudUI","t":4,"rt":StealEggGame.HudUI,"sn":"hudUI"},{"a":2,"n":"incomeMultiplierBySize","t":4,"rt":$n[0].Single,"sn":"incomeMultiplierBySize","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"incubateBoostIcon","t":4,"rt":$n[1].Sprite,"sn":"incubateBoostIcon"},{"a":1,"n":"incubateRows","t":4,"rt":$n[4].List$1(IncubateRowView),"sn":"incubateRows","ro":true},{"a":2,"n":"incubateTimerPrefab","t":4,"rt":$n[1].GameObject,"sn":"incubateTimerPrefab"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"incubateUI","t":4,"rt":StealEggGame.IncubatePopupUI,"sn":"incubateUI"},{"a":2,"n":"incubationSeconds","t":4,"rt":$n[0].Single,"sn":"incubationSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"incubators","t":4,"rt":$n[4].List$1(StealEggGame.Incubator),"sn":"incubators","ro":true},{"a":1,"n":"indexRewardRows","t":4,"rt":$n[4].List$1(UnityEngine.GameObject),"sn":"indexRewardRows","ro":true},{"a":1,"n":"indexRows","t":4,"rt":$n[4].List$1(UnityEngine.GameObject),"sn":"indexRows","ro":true},{"a":1,"n":"indexSelection","t":4,"rt":$n[0].Int32,"sn":"indexSelection","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"indexUI","t":4,"rt":StealEggGame.IndexUI,"sn":"indexUI"},{"a":1,"n":"insideStation","t":4,"rt":$n[0].Array.type(System.Boolean),"sn":"insideStation","ro":true},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"inventoryUI","t":4,"rt":StealEggGame.InventoryUI,"sn":"inventoryUI"},{"a":1,"n":"items","t":4,"rt":$n[4].List$1(StealEggGame.Item),"sn":"items","ro":true},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"joystick","t":4,"rt":PlayableJoystick,"sn":"joystick"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpButton","t":4,"rt":$n[2].Button,"sn":"jumpButton"},{"a":2,"n":"jumpHeight","t":4,"rt":$n[0].Single,"sn":"jumpHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Scene object (child \"Jump hint\" of the jump button, children Hand and Shine): tap hand on the jump button until the first jump."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpHint","t":4,"rt":TapHintView,"sn":"jumpHint"},{"a":1,"n":"jumped","t":4,"rt":$n[0].Boolean,"sn":"jumped","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"knockdownDuration","t":4,"rt":$n[0].Single,"sn":"knockdownDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"lightTransition","t":4,"rt":$n[0].Single,"sn":"lightTransition","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"lobbyCenter","t":4,"rt":$n[1].Transform,"sn":"lobbyCenter"},{"a":2,"n":"lobbySize","t":4,"rt":$n[1].Vector3,"sn":"lobbySize"},{"a":2,"n":"luckyEggOpenDuration","t":4,"rt":$n[0].Single,"sn":"luckyEggOpenDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"luckyEggPrefab","t":4,"rt":$n[1].GameObject,"sn":"luckyEggPrefab"},{"a":2,"n":"luckyEggRewards","t":4,"rt":System.Array.type(StealEggGame.BoostInfo),"sn":"luckyEggRewards"},{"a":2,"n":"luckyEggSpawn","t":4,"rt":$n[1].Transform,"sn":"luckyEggSpawn"},{"a":2,"n":"luckyEggTarget","t":4,"rt":$n[1].Transform,"sn":"luckyEggTarget"},{"a":1,"n":"luckyEggs","t":4,"rt":$n[4].List$1(StealEggGame.LuckyEgg),"sn":"luckyEggs","ro":true},{"a":2,"n":"luckyFrog","t":4,"rt":$n[1].Transform,"sn":"luckyFrog"},{"a":2,"n":"luckyFrogFeedMultiplier","t":4,"rt":$n[0].Single,"sn":"luckyFrogFeedMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"modal","t":4,"rt":$n[1].GameObject,"sn":"modal"},{"a":1,"n":"modelPosition","t":4,"rt":$n[1].Vector3,"sn":"modelPosition"},{"a":1,"n":"modelRotation","t":4,"rt":$n[1].Quaternion,"sn":"modelRotation"},{"a":2,"n":"moneyIcon","t":4,"rt":$n[1].Sprite,"sn":"moneyIcon"},{"a":1,"n":"motor","t":4,"rt":$n[1].CharacterController,"sn":"motor"},{"a":2,"n":"moveSpeed","t":4,"rt":$n[0].Single,"sn":"moveSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"nearby","t":4,"rt":StealEggGame.Egg,"sn":"nearby"},{"a":1,"n":"night","t":4,"rt":$n[0].Boolean,"sn":"night","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"nightDuration","t":4,"rt":$n[0].Single,"sn":"nightDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"nightGraphic","t":4,"rt":$n[1].GameObject,"sn":"nightGraphic"},{"a":2,"n":"nightIcon","t":4,"rt":$n[1].Sprite,"sn":"nightIcon"},{"a":2,"n":"nightIncubateMultiplier","t":4,"rt":$n[0].Single,"sn":"nightIncubateMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"nightText","t":4,"rt":$n[3].TMP_Text,"sn":"nightText"},{"a":2,"n":"npcCoopBigPetSize","t":4,"rt":$n[0].Single,"sn":"npcCoopBigPetSize","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("NPC coops hold npcCoopSmallPets pets under npcCoopBigPetSize (model scale), except one random coop with a single pet at the largest size.")],"a":2,"n":"npcCoopSmallPets","t":4,"rt":$n[0].Int32,"sn":"npcCoopSmallPets","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"npcCount","t":4,"rt":$n[0].Int32,"sn":"npcCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"npcMaxSpeed","t":4,"rt":$n[0].Single,"sn":"npcMaxSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"npcMinSpeed","t":4,"rt":$n[0].Single,"sn":"npcMinSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"npcModels","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"npcModels"},{"a":2,"n":"npcTemplate","t":4,"rt":$n[1].GameObject,"sn":"npcTemplate"},{"a":1,"n":"npcs","t":4,"rt":$n[4].List$1(StealEggGame.Actor),"sn":"npcs","ro":true},{"a":2,"n":"originalUI","t":4,"rt":$n[1].Transform,"sn":"originalUI"},{"a":2,"n":"outfitFaces","t":4,"rt":System.Array.type(UnityEngine.Material),"sn":"outfitFaces"},{"a":2,"n":"outfitHairs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"outfitHairs"},{"a":2,"n":"outfitPants","t":4,"rt":System.Array.type(UnityEngine.Material),"sn":"outfitPants"},{"a":2,"n":"outfitShirts","t":4,"rt":System.Array.type(UnityEngine.Material),"sn":"outfitShirts"},{"at":[new UnityEngine.HeaderAttribute("Original data")],"a":2,"n":"petCatalog","t":4,"rt":System.Array.type(StealEggGame.PetInfo),"sn":"petCatalog"},{"a":1,"n":"petInfos","t":4,"rt":$n[4].List$1(UnityEngine.Transform),"sn":"petInfos","ro":true},{"a":1,"n":"petRows","t":4,"rt":$n[4].List$1(UnityEngine.GameObject),"sn":"petRows","ro":true},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"petsUI","t":4,"rt":StealEggGame.PetsPopupUI,"sn":"petsUI"},{"a":1,"n":"phaseClock","t":4,"rt":$n[0].Single,"sn":"phaseClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"player","t":4,"rt":$n[1].Transform,"sn":"player"},{"a":1,"n":"playerActor","t":4,"rt":StealEggGame.Actor,"sn":"playerActor","ro":true},{"a":2,"n":"playerAnimator","t":4,"rt":$n[1].Animator,"sn":"playerAnimator"},{"a":2,"n":"playerCoopArea","t":4,"rt":$n[1].BoxCollider,"sn":"playerCoopArea"},{"a":1,"n":"playerForward","t":4,"rt":$n[0].Single,"sn":"playerForward","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"playerHair","t":4,"rt":$n[1].GameObject,"sn":"playerHair"},{"a":2,"n":"popupSound","t":4,"rt":$n[1].AudioClip,"sn":"popupSound"},{"a":1,"n":"popups","t":4,"rt":$n[4].List$1(StealEggGame.Popup),"sn":"popups","ro":true},{"at":[new UnityEngine.TooltipAttribute("Scales every upgrade and shop price. 1 = original game.")],"a":2,"n":"priceMultiplier","t":4,"rt":$n[0].Single,"sn":"priceMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"progressSound","t":4,"rt":$n[1].AudioClip,"sn":"progressSound"},{"a":1,"n":"quick","t":4,"rt":$n[4].List$1(StealEggGame.Item),"sn":"quick","ro":true},{"a":2,"n":"ragdoll","t":4,"rt":PlayableRagdoll,"sn":"ragdoll"},{"a":1,"n":"rarityColors","is":true,"t":4,"rt":System.Array.type(UnityEngine.Color),"sn":"rarityColors","ro":true},{"a":2,"n":"rarityFont","t":4,"rt":$n[3].TMP_FontAsset,"sn":"rarityFont"},{"a":2,"n":"rarityFrames","t":4,"rt":System.Array.type(UnityEngine.Sprite),"sn":"rarityFrames"},{"a":2,"n":"rarityMaterials","t":4,"rt":System.Array.type(UnityEngine.Material),"sn":"rarityMaterials"},{"a":2,"n":"rarityWorldMaterials","t":4,"rt":System.Array.type(UnityEngine.Material),"sn":"rarityWorldMaterials"},{"a":1,"n":"rewardRows","t":4,"rt":$n[4].List$1(UnityEngine.GameObject),"sn":"rewardRows","ro":true},{"a":2,"n":"rewardSound","t":4,"rt":$n[1].AudioClip,"sn":"rewardSound"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rewardUI","t":4,"rt":StealEggGame.RewardUI,"sn":"rewardUI"},{"at":[new UnityEngine.TooltipAttribute("Original RightHandSlot as SAE_Player Variant sets it (under mixamorig:RightHand_end): the bat follows it so the swing turns it.")],"a":2,"n":"rightHandSlot","t":4,"rt":$n[1].Transform,"sn":"rightHandSlot"},{"a":2,"n":"roundedSprite","t":4,"rt":$n[1].Sprite,"sn":"roundedSprite"},{"a":2,"n":"safePoint","t":4,"rt":$n[1].Transform,"sn":"safePoint"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"safeUI","t":4,"rt":$n[1].RectTransform,"sn":"safeUI"},{"a":2,"n":"sellPriceMultiplier","t":4,"rt":$n[0].Single,"sn":"sellPriceMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"settingsUI","t":4,"rt":StealEggGame.LockedPanelUI,"sn":"settingsUI"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"shopUI","t":4,"rt":StealEggGame.LockedPanelUI,"sn":"shopUI"},{"a":2,"n":"slowMode","t":4,"rt":$n[0].Boolean,"sn":"slowMode","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"sound","t":4,"rt":$n[1].AudioSource,"sn":"sound"},{"a":2,"n":"sourceHud","t":4,"rt":$n[1].GameObject,"sn":"sourceHud"},{"a":1,"n":"spawn","t":4,"rt":$n[1].Vector3,"sn":"spawn"},{"a":1,"n":"spawnRotation","t":4,"rt":$n[1].Quaternion,"sn":"spawnRotation"},{"a":2,"n":"speedIcon","t":4,"rt":$n[1].Sprite,"sn":"speedIcon"},{"a":2,"n":"speedPowerMultiplier","t":4,"rt":$n[0].Single,"sn":"speedPowerMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"speedPulse","t":4,"rt":$n[0].Single,"sn":"speedPulse","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"startingMoney","t":4,"rt":$n[0].Int32,"sn":"startingMoney","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"stealSound","t":4,"rt":$n[1].AudioClip,"sn":"stealSound"},{"a":1,"n":"stepLeft","t":4,"rt":$n[0].Single,"sn":"stepLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"stoleEgg","t":4,"rt":$n[0].Boolean,"sn":"stoleEgg","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"sun","t":4,"rt":$n[1].Light,"sn":"sun"},{"a":1,"n":"swingStart","t":4,"rt":$n[0].Single,"sn":"swingStart","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"teleportPoint","t":4,"rt":$n[1].Transform,"sn":"teleportPoint"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"trailUI","t":4,"rt":StealEggGame.LockedPanelUI,"sn":"trailUI"},{"a":2,"n":"trails","t":4,"rt":System.Array.type(StealEggGame.TrailInfo),"sn":"trails"},{"a":2,"n":"trainBoostIcon","t":4,"rt":$n[1].Sprite,"sn":"trainBoostIcon"},{"a":2,"n":"trainSound","t":4,"rt":$n[1].AudioClip,"sn":"trainSound"},{"a":2,"n":"trainTick","t":4,"rt":$n[0].Single,"sn":"trainTick","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"training","t":4,"rt":$n[0].Boolean,"sn":"training","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"trainingClock","t":4,"rt":$n[0].Single,"sn":"trainingClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"trainingPoint","t":4,"rt":$n[1].Transform,"sn":"trainingPoint"},{"a":2,"n":"trainingPowerPerTick","t":4,"rt":$n[0].Single,"sn":"trainingPowerPerTick","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"treadmillLevel","t":4,"rt":$n[0].Int32,"sn":"treadmillLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"treadmillPrices","t":4,"rt":$n[0].Array.type(System.Double),"sn":"treadmillPrices"},{"a":2,"n":"treadmillTrainValues","t":4,"rt":$n[0].Array.type(System.Single),"sn":"treadmillTrainValues"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"treadmillUI","t":4,"rt":StealEggGame.TreadmillPanelUI,"sn":"treadmillUI"},{"a":1,"n":"triggerBounds","t":4,"rt":$n[4].Dictionary$2(UnityEngine.Collider,UnityEngine.Bounds),"sn":"triggerBounds","ro":true},{"at":[new UnityEngine.TooltipAttribute("Scene text (Playable UI/Safe area/Tutorial text): the instruction for the current hint, then \"Steal An Egg\" (pulsing) until the first egg is stolen."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"tutorialText","t":4,"rt":$n[3].TMP_Text,"sn":"tutorialText"},{"a":2,"n":"uiFont","t":4,"rt":$n[1].Font,"sn":"uiFont"},{"a":2,"n":"upgradeSound","t":4,"rt":$n[1].AudioClip,"sn":"upgradeSound"},{"a":1,"n":"verticalSpeed","t":4,"rt":$n[0].Single,"sn":"verticalSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"walked","t":4,"rt":$n[0].Single,"sn":"walked","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"warningPanel","t":4,"rt":$n[1].GameObject,"sn":"warningPanel"},{"a":2,"n":"warningSound","t":4,"rt":$n[1].AudioClip,"sn":"warningSound"},{"a":1,"n":"zoneAlphas","t":4,"rt":$n[0].Array.type(System.Single),"sn":"zoneAlphas"},{"a":1,"n":"zoneClock","t":4,"rt":$n[0].Single,"sn":"zoneClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"zoneGraphics","t":4,"rt":System.Array.type(UnityEngine.UI.Graphic),"sn":"zoneGraphics"},{"a":1,"n":"zoneInside","t":4,"rt":$n[0].Int32,"sn":"zoneInside","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"zones","t":4,"rt":System.Array.type(StealEggGame.Zone),"sn":"zones"},{"a":1,"backing":true,"n":"<Money>k__BackingField","t":4,"rt":$n[0].Double,"sn":"Money","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"backing":true,"n":"<SpeedPower>k__BackingField","t":4,"rt":$n[0].Double,"sn":"SpeedPower","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"backing":true,"n":"<Step>k__BackingField","t":4,"rt":StealEggGame.TutorialStep,"sn":"Step","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}}]}; }, $n);
    /*StealEggGame end.*/

    /*StealEggGame+Zone start.*/
    $m("StealEggGame.Zone", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"a":2,"n":"attackDistance","t":4,"rt":$n[0].Single,"sn":"attackDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"bounds","t":4,"rt":$n[1].BoxCollider,"sn":"bounds"},{"at":[new UnityEngine.TooltipAttribute("Played by the guardian when it catches a thief (original catchedSound).")],"a":2,"n":"catchSound","t":4,"rt":$n[1].AudioSource,"sn":"catchSound"},{"a":2,"n":"eggPrefabs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"eggPrefabs"},{"a":2,"n":"eggRules","t":4,"rt":System.Array.type(PlayableEggRules),"sn":"eggRules"},{"a":2,"n":"fetching","t":4,"rt":StealEggGame.Egg,"sn":"fetching"},{"a":2,"n":"guardian","t":4,"rt":$n[1].Transform,"sn":"guardian"},{"a":2,"n":"guardianHome","t":4,"rt":$n[1].Vector3,"sn":"guardianHome"},{"a":2,"n":"guardianRotation","t":4,"rt":$n[1].Quaternion,"sn":"guardianRotation"},{"a":2,"n":"guardianSpeed","t":4,"rt":$n[0].Single,"sn":"guardianSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"nests","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"nests"},{"a":2,"n":"pending","t":4,"rt":StealEggGame.Actor,"sn":"pending"},{"a":2,"n":"petPrefabs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"petPrefabs"},{"a":2,"n":"revive","t":4,"rt":$n[4].List$1(StealEggGame.Egg),"sn":"revive"},{"a":2,"n":"root","t":4,"rt":$n[1].Transform,"sn":"root"},{"at":[new UnityEngine.TooltipAttribute("Guardian loops (original SAE_ProtectEggMonster): snoring while it stands still, running while it moves.")],"a":2,"n":"runSound","t":4,"rt":$n[1].AudioSource,"sn":"runSound"},{"at":[new UnityEngine.TooltipAttribute("Guardian loops (original SAE_ProtectEggMonster): snoring while it stands still, running while it moves.")],"a":2,"n":"sleepSound","t":4,"rt":$n[1].AudioSource,"sn":"sleepSound"},{"a":2,"n":"sleepingEffect","t":4,"rt":$n[1].GameObject,"sn":"sleepingEffect"},{"a":2,"n":"state","t":4,"rt":StealEggGame.GuardState,"sn":"state","box":function ($v) { return Bridge.box($v, StealEggGame.GuardState, System.Enum.toStringFn(StealEggGame.GuardState));}},{"a":2,"n":"stateAt","t":4,"rt":$n[0].Single,"sn":"stateAt","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"target","t":4,"rt":StealEggGame.Actor,"sn":"target"},{"a":2,"n":"thieves","t":4,"rt":$n[4].List$1(StealEggGame.Actor),"sn":"thieves"},{"a":2,"n":"thumbnail","t":4,"rt":$n[1].Sprite,"sn":"thumbnail"},{"a":2,"n":"warningMark","t":4,"rt":$n[1].GameObject,"sn":"warningMark"}]}; }, $n);
    /*StealEggGame+Zone end.*/

    /*StealEggGame+GuardState start.*/
    $m("StealEggGame.GuardState", function () { return {"td":StealEggGame,"att":258,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Chase","is":true,"t":4,"rt":StealEggGame.GuardState,"sn":"Chase","box":function ($v) { return Bridge.box($v, StealEggGame.GuardState, System.Enum.toStringFn(StealEggGame.GuardState));}},{"a":2,"n":"Fetch","is":true,"t":4,"rt":StealEggGame.GuardState,"sn":"Fetch","box":function ($v) { return Bridge.box($v, StealEggGame.GuardState, System.Enum.toStringFn(StealEggGame.GuardState));}},{"a":2,"n":"Idle","is":true,"t":4,"rt":StealEggGame.GuardState,"sn":"Idle","box":function ($v) { return Bridge.box($v, StealEggGame.GuardState, System.Enum.toStringFn(StealEggGame.GuardState));}},{"a":2,"n":"Return","is":true,"t":4,"rt":StealEggGame.GuardState,"sn":"Return","box":function ($v) { return Bridge.box($v, StealEggGame.GuardState, System.Enum.toStringFn(StealEggGame.GuardState));}},{"a":2,"n":"Wait","is":true,"t":4,"rt":StealEggGame.GuardState,"sn":"Wait","box":function ($v) { return Bridge.box($v, StealEggGame.GuardState, System.Enum.toStringFn(StealEggGame.GuardState));}}]}; }, $n);
    /*StealEggGame+GuardState end.*/

    /*StealEggGame+TutorialStep start.*/
    $m("StealEggGame.TutorialStep", function () { return {"td":StealEggGame,"att":258,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"BringHome","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"BringHome","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},{"a":2,"n":"Done","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"Done","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},{"a":2,"n":"Equip","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"Equip","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},{"a":2,"n":"Hatch","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"Hatch","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},{"a":2,"n":"Incubate","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"Incubate","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},{"a":2,"n":"Steal","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"Steal","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}},{"a":2,"n":"Train","is":true,"t":4,"rt":StealEggGame.TutorialStep,"sn":"Train","box":function ($v) { return Bridge.box($v, StealEggGame.TutorialStep, System.Enum.toStringFn(StealEggGame.TutorialStep));}}]}; }, $n);
    /*StealEggGame+TutorialStep end.*/

    /*StealEggGame+Egg start.*/
    $m("StealEggGame.Egg", function () { return {"td":StealEggGame,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Available","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Available","t":8,"rt":$n[0].Boolean,"fg":"Available","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Available"},{"a":2,"n":"gone","t":4,"rt":$n[0].Boolean,"sn":"gone","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"hidden","t":4,"rt":$n[0].Boolean,"sn":"hidden","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"holder","t":4,"rt":StealEggGame.Actor,"sn":"holder"},{"a":2,"n":"nest","t":4,"rt":$n[0].Int32,"sn":"nest","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"onGround","t":4,"rt":$n[0].Boolean,"sn":"onGround","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"origin","t":4,"rt":$n[1].Vector3,"sn":"origin"},{"a":2,"n":"rotation","t":4,"rt":$n[1].Quaternion,"sn":"rotation"},{"a":2,"n":"scale","t":4,"rt":$n[1].Vector3,"sn":"scale"},{"a":2,"n":"size","t":4,"rt":$n[0].Single,"sn":"size","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"transform","t":4,"rt":$n[1].Transform,"sn":"transform"},{"a":2,"n":"variant","t":4,"rt":$n[0].Int32,"sn":"variant","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"zone","t":4,"rt":StealEggGame.Zone,"sn":"zone"}]}; }, $n);
    /*StealEggGame+Egg end.*/

    /*StealEggGame+Actor start.*/
    $m("StealEggGame.Actor", function () { return {"td":StealEggGame,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Down","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Down","t":8,"rt":$n[0].Boolean,"fg":"Down","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Down"},{"a":2,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"a":2,"n":"carried","t":4,"rt":StealEggGame.Egg,"sn":"carried"},{"a":2,"n":"deadline","t":4,"rt":$n[0].Single,"sn":"deadline","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"dest","t":4,"rt":$n[1].Vector3,"sn":"dest"},{"a":2,"n":"downDirection","t":4,"rt":$n[1].Vector3,"sn":"downDirection"},{"a":2,"n":"downTotal","t":4,"rt":$n[0].Single,"sn":"downTotal","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"downUntil","t":4,"rt":$n[0].Single,"sn":"downUntil","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"house","t":4,"rt":$n[0].Int32,"sn":"house","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"isPlayer","t":4,"rt":$n[0].Boolean,"sn":"isPlayer","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"model","t":4,"rt":$n[1].Transform,"sn":"model"},{"a":2,"n":"modelPosition","t":4,"rt":$n[1].Vector3,"sn":"modelPosition"},{"a":2,"n":"modelRotation","t":4,"rt":$n[1].Quaternion,"sn":"modelRotation"},{"a":2,"n":"root","t":4,"rt":$n[1].Transform,"sn":"root"},{"a":2,"n":"speed","t":4,"rt":$n[0].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"state","t":4,"rt":$n[0].Int32,"sn":"state","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"stealSlot","t":4,"rt":$n[1].Transform,"sn":"stealSlot"},{"a":2,"n":"targetEgg","t":4,"rt":StealEggGame.Egg,"sn":"targetEgg"},{"a":2,"n":"until","t":4,"rt":$n[0].Single,"sn":"until","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*StealEggGame+Actor end.*/

    /*StealEggGame+PetInfo start.*/
    $m("StealEggGame.PetInfo", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"income","t":4,"rt":$n[0].Single,"sn":"income","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"prefab","t":4,"rt":$n[1].GameObject,"sn":"prefab"},{"a":2,"n":"rarity","t":4,"rt":$n[0].Int32,"sn":"rarity","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"thumbnail","t":4,"rt":$n[1].Sprite,"sn":"thumbnail"},{"a":2,"n":"zone","t":4,"rt":$n[0].Int32,"sn":"zone","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*StealEggGame+PetInfo end.*/

    /*StealEggGame+TrailInfo start.*/
    $m("StealEggGame.TrailInfo", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"frame","t":4,"rt":$n[1].Sprite,"sn":"frame"},{"a":2,"n":"multiplier","t":4,"rt":$n[0].Single,"sn":"multiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"prefab","t":4,"rt":$n[1].GameObject,"sn":"prefab"},{"a":2,"n":"price","t":4,"rt":$n[0].Double,"sn":"price","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":2,"n":"rarity","t":4,"rt":$n[0].Int32,"sn":"rarity","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"thumbnail","t":4,"rt":$n[1].Sprite,"sn":"thumbnail"}]}; }, $n);
    /*StealEggGame+TrailInfo end.*/

    /*StealEggGame+BoostInfo start.*/
    $m("StealEggGame.BoostInfo", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"duration","t":4,"rt":$n[0].Single,"sn":"duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"icon","t":4,"rt":$n[1].Sprite,"sn":"icon"},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"type","t":4,"rt":$n[0].Int32,"sn":"type","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"value","t":4,"rt":$n[0].Single,"sn":"value","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"weight","t":4,"rt":$n[0].Single,"sn":"weight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*StealEggGame+BoostInfo end.*/

    /*StealEggGame+House start.*/
    $m("StealEggGame.House", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Coop","t":16,"rt":$n[1].BoxCollider,"g":{"a":2,"n":"get_Coop","t":8,"rt":$n[1].BoxCollider,"fg":"Coop"},"fn":"Coop"},{"a":2,"n":"TrainSlot","t":16,"rt":$n[1].Transform,"g":{"a":2,"n":"get_TrainSlot","t":8,"rt":$n[1].Transform,"fg":"TrainSlot"},"fn":"TrainSlot"},{"a":2,"n":"coopModel","t":4,"rt":$n[0].Int32,"sn":"coopModel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"coopModels","t":4,"rt":System.Array.type(UnityEngine.BoxCollider),"sn":"coopModels"},{"a":2,"n":"coopPad","t":4,"rt":$n[1].Transform,"sn":"coopPad"},{"a":2,"n":"petContainer","t":4,"rt":$n[1].Transform,"sn":"petContainer"},{"a":2,"n":"root","t":4,"rt":$n[1].Transform,"sn":"root"},{"a":2,"n":"treadmill","t":4,"rt":$n[0].Int32,"sn":"treadmill","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"treadmillPad","t":4,"rt":$n[1].Transform,"sn":"treadmillPad"},{"a":2,"n":"treadmills","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"treadmills"}]}; }, $n);
    /*StealEggGame+House end.*/

    /*StealEggGame+CoopPet start.*/
    $m("StealEggGame.CoopPet", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"a":2,"n":"coop","t":4,"rt":$n[1].BoxCollider,"sn":"coop"},{"a":2,"n":"incomeClock","t":4,"rt":$n[0].Single,"sn":"incomeClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"item","t":4,"rt":StealEggGame.Item,"sn":"item"},{"a":2,"n":"nextMove","t":4,"rt":$n[0].Single,"sn":"nextMove","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"obj","t":4,"rt":$n[1].Transform,"sn":"obj"},{"a":2,"n":"target","t":4,"rt":$n[1].Vector3,"sn":"target"}]}; }, $n);
    /*StealEggGame+CoopPet end.*/

    /*StealEggGame+Incubator start.*/
    $m("StealEggGame.Incubator", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"duration","t":4,"rt":$n[0].Single,"sn":"duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"endScale","t":4,"rt":$n[1].Vector3,"sn":"endScale"},{"a":2,"n":"item","t":4,"rt":StealEggGame.Item,"sn":"item"},{"a":2,"n":"label","t":4,"rt":$n[3].TMP_Text,"sn":"label"},{"a":2,"n":"obj","t":4,"rt":$n[1].Transform,"sn":"obj"},{"a":2,"n":"openClock","t":4,"rt":$n[0].Single,"sn":"openClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"opening","t":4,"rt":$n[0].Boolean,"sn":"opening","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"ready","t":4,"rt":$n[0].Boolean,"sn":"ready","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"rotation","t":4,"rt":$n[1].Quaternion,"sn":"rotation"},{"a":2,"n":"startScale","t":4,"rt":$n[1].Vector3,"sn":"startScale"},{"a":2,"n":"timer","t":4,"rt":$n[1].Transform,"sn":"timer"}]}; }, $n);
    /*StealEggGame+Incubator end.*/

    /*StealEggGame+FlyingPet start.*/
    $m("StealEggGame.FlyingPet", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"from","t":4,"rt":$n[1].Vector3,"sn":"from"},{"a":2,"n":"item","t":4,"rt":StealEggGame.Item,"sn":"item"},{"a":2,"n":"obj","t":4,"rt":$n[1].Transform,"sn":"obj"},{"a":2,"n":"scale","t":4,"rt":$n[1].Vector3,"sn":"scale"}]}; }, $n);
    /*StealEggGame+FlyingPet end.*/

    /*StealEggGame+ItemKind start.*/
    $m("StealEggGame.ItemKind", function () { return {"td":StealEggGame,"att":258,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Bat","is":true,"t":4,"rt":StealEggGame.ItemKind,"sn":"Bat","box":function ($v) { return Bridge.box($v, StealEggGame.ItemKind, System.Enum.toStringFn(StealEggGame.ItemKind));}},{"a":2,"n":"Egg","is":true,"t":4,"rt":StealEggGame.ItemKind,"sn":"Egg","box":function ($v) { return Bridge.box($v, StealEggGame.ItemKind, System.Enum.toStringFn(StealEggGame.ItemKind));}},{"a":2,"n":"Pet","is":true,"t":4,"rt":StealEggGame.ItemKind,"sn":"Pet","box":function ($v) { return Bridge.box($v, StealEggGame.ItemKind, System.Enum.toStringFn(StealEggGame.ItemKind));}}]}; }, $n);
    /*StealEggGame+ItemKind end.*/

    /*StealEggGame+Item start.*/
    $m("StealEggGame.Item", function () { return {"td":StealEggGame,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"income","t":4,"rt":$n[0].Double,"sn":"income","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":2,"n":"kind","t":4,"rt":StealEggGame.ItemKind,"sn":"kind","box":function ($v) { return Bridge.box($v, StealEggGame.ItemKind, System.Enum.toStringFn(StealEggGame.ItemKind));}},{"a":2,"n":"pet","t":4,"rt":$n[0].Int32,"sn":"pet","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"size","t":4,"rt":$n[0].Single,"sn":"size","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"variant","t":4,"rt":$n[0].Int32,"sn":"variant","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"zone","t":4,"rt":StealEggGame.Zone,"sn":"zone"}]}; }, $n);
    /*StealEggGame+Item end.*/

    /*StealEggGame+BoneFollower start.*/
    $m("StealEggGame.BoneFollower", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"bone","t":4,"rt":$n[1].Transform,"sn":"bone"},{"a":2,"n":"follower","t":4,"rt":$n[1].Transform,"sn":"follower"},{"a":2,"n":"position","t":4,"rt":$n[1].Vector3,"sn":"position"},{"a":2,"n":"root","t":4,"rt":$n[1].Transform,"sn":"root"},{"a":2,"n":"rotation","t":4,"rt":$n[1].Quaternion,"sn":"rotation"}]}; }, $n);
    /*StealEggGame+BoneFollower end.*/

    /*StealEggGame+Popup start.*/
    $m("StealEggGame.Popup", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"screen","t":4,"rt":$n[0].Boolean,"sn":"screen","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"t","t":4,"rt":$n[1].Transform,"sn":"t"},{"a":2,"n":"world","t":4,"rt":$n[1].Vector3,"sn":"world"}]}; }, $n);
    /*StealEggGame+Popup end.*/

    /*StealEggGame+HudUI start.*/
    $m("StealEggGame.HudUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"at":[new UnityEngine.TooltipAttribute("Context buttons under functions; the GameObject name is the action key.")],"a":2,"n":"actionButtons","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"actionButtons"},{"a":2,"n":"attack","t":4,"rt":$n[2].Button,"sn":"attack"},{"a":2,"n":"boostContainer","t":4,"rt":$n[1].Transform,"sn":"boostContainer"},{"a":2,"n":"boostTemplate","t":4,"rt":IconAmountView,"sn":"boostTemplate"},{"a":2,"n":"equipMonster","t":4,"rt":$n[2].Button,"sn":"equipMonster"},{"a":2,"n":"equipTapHint","t":4,"rt":TapHintView,"sn":"equipTapHint"},{"a":2,"n":"functions","t":4,"rt":$n[1].RectTransform,"sn":"functions"},{"a":2,"n":"hatchTapHint","t":4,"rt":TapHintView,"sn":"hatchTapHint"},{"a":2,"n":"incomeTemplate","t":4,"rt":$n[1].Transform,"sn":"incomeTemplate"},{"a":2,"n":"incubateEgg","t":4,"rt":$n[2].Button,"sn":"incubateEgg"},{"a":2,"n":"incubateHighlight","t":4,"rt":$n[1].GameObject,"sn":"incubateHighlight"},{"a":2,"n":"incubateTapHint","t":4,"rt":TapHintView,"sn":"incubateTapHint"},{"a":2,"n":"index","t":4,"rt":$n[2].Button,"sn":"index"},{"a":2,"n":"indexHighlight","t":4,"rt":$n[1].GameObject,"sn":"indexHighlight"},{"a":2,"n":"money","t":4,"rt":$n[3].TMP_Text,"sn":"money"},{"a":2,"n":"moneyIcon","t":4,"rt":$n[2].Image,"sn":"moneyIcon"},{"a":2,"n":"right","t":4,"rt":$n[1].GameObject,"sn":"right"},{"a":2,"n":"settings","t":4,"rt":$n[2].Button,"sn":"settings"},{"a":2,"n":"speed","t":4,"rt":$n[3].TMP_Text,"sn":"speed"},{"a":2,"n":"speedIcon","t":4,"rt":$n[2].Image,"sn":"speedIcon"},{"a":2,"n":"speedMode","t":4,"rt":$n[2].Button,"sn":"speedMode"},{"a":2,"n":"speedOff","t":4,"rt":$n[1].GameObject,"sn":"speedOff"},{"a":2,"n":"speedOn","t":4,"rt":$n[1].GameObject,"sn":"speedOn"},{"a":2,"n":"time","t":4,"rt":$n[3].TMP_Text,"sn":"time"},{"a":2,"n":"timeIcon","t":4,"rt":$n[2].Image,"sn":"timeIcon"},{"a":2,"n":"trailShop","t":4,"rt":$n[2].Button,"sn":"trailShop"},{"a":2,"n":"trainTapHint","t":4,"rt":TapHintView,"sn":"trainTapHint"},{"a":2,"n":"zoneBanner","t":4,"rt":$n[1].GameObject,"sn":"zoneBanner"},{"a":2,"n":"zoneFrame","t":4,"rt":$n[1].RectTransform,"sn":"zoneFrame"},{"a":2,"n":"zoneName","t":4,"rt":$n[3].TMP_Text,"sn":"zoneName"}]}; }, $n);
    /*StealEggGame+HudUI end.*/

    /*StealEggGame+PetsPopupUI start.*/
    $m("StealEggGame.PetsPopupUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"close","t":4,"rt":$n[2].Button,"sn":"close"},{"a":2,"n":"content","t":4,"rt":$n[1].Transform,"sn":"content"},{"a":2,"n":"equipBest","t":4,"rt":$n[2].Button,"sn":"equipBest"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"},{"a":2,"n":"slots","t":4,"rt":$n[3].TMP_Text,"sn":"slots"},{"a":2,"n":"template","t":4,"rt":PetRowView,"sn":"template"},{"a":2,"n":"upgradePrice","t":4,"rt":$n[3].TMP_Text,"sn":"upgradePrice"},{"a":2,"n":"upgradeSlot","t":4,"rt":$n[2].Button,"sn":"upgradeSlot"},{"a":2,"n":"upgradeUnavailable","t":4,"rt":$n[1].GameObject,"sn":"upgradeUnavailable"}]}; }, $n);
    /*StealEggGame+PetsPopupUI end.*/

    /*StealEggGame+IncubatePopupUI start.*/
    $m("StealEggGame.IncubatePopupUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"close","t":4,"rt":$n[2].Button,"sn":"close"},{"a":2,"n":"content","t":4,"rt":$n[1].Transform,"sn":"content"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"},{"a":2,"n":"template","t":4,"rt":IncubateRowView,"sn":"template"}]}; }, $n);
    /*StealEggGame+IncubatePopupUI end.*/

    /*StealEggGame+InventoryUI start.*/
    $m("StealEggGame.InventoryUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"bag","t":4,"rt":$n[2].Button,"sn":"bag"},{"a":2,"n":"bagClose","t":4,"rt":$n[2].Button,"sn":"bagClose"},{"a":2,"n":"bagContent","t":4,"rt":$n[1].Transform,"sn":"bagContent"},{"a":2,"n":"bagPopup","t":4,"rt":$n[1].GameObject,"sn":"bagPopup"},{"a":2,"n":"bagTemplate","t":4,"rt":BagCellView,"sn":"bagTemplate"},{"a":2,"n":"eggDrop","t":4,"rt":$n[2].Button,"sn":"eggDrop"},{"a":2,"n":"eggIncubate","t":4,"rt":$n[2].Button,"sn":"eggIncubate"},{"a":2,"n":"eggInfo","t":4,"rt":$n[1].GameObject,"sn":"eggInfo"},{"a":2,"n":"eggName","t":4,"rt":$n[3].TMP_Text,"sn":"eggName"},{"a":2,"n":"eggThumbnail","t":4,"rt":$n[2].Image,"sn":"eggThumbnail"},{"a":2,"n":"eggWeight","t":4,"rt":$n[3].TMP_Text,"sn":"eggWeight"},{"a":2,"n":"petDrop","t":4,"rt":$n[2].Button,"sn":"petDrop"},{"a":2,"n":"petEquip","t":4,"rt":$n[2].Button,"sn":"petEquip"},{"a":2,"n":"petIncome","t":4,"rt":$n[3].TMP_Text,"sn":"petIncome"},{"a":2,"n":"petInfo","t":4,"rt":$n[1].GameObject,"sn":"petInfo"},{"a":2,"n":"petName","t":4,"rt":$n[3].TMP_Text,"sn":"petName"},{"a":2,"n":"petRarity","t":4,"rt":$n[3].TMP_Text,"sn":"petRarity"},{"a":2,"n":"petThumbnail","t":4,"rt":$n[2].Image,"sn":"petThumbnail"},{"a":2,"n":"quickSlots","t":4,"rt":System.Array.type(QuickSlotView),"sn":"quickSlots"}]}; }, $n);
    /*StealEggGame+InventoryUI end.*/

    /*StealEggGame+RewardUI start.*/
    $m("StealEggGame.RewardUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"close","t":4,"rt":$n[2].Button,"sn":"close"},{"a":2,"n":"content","t":4,"rt":$n[1].Transform,"sn":"content"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"},{"a":2,"n":"tapToClose","t":4,"rt":$n[2].Button,"sn":"tapToClose"},{"a":2,"n":"template","t":4,"rt":IconAmountView,"sn":"template"},{"a":2,"n":"title","t":4,"rt":$n[3].TMP_Text,"sn":"title"}]}; }, $n);
    /*StealEggGame+RewardUI end.*/

    /*StealEggGame+DialogUI start.*/
    $m("StealEggGame.DialogUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"message","t":4,"rt":$n[3].TMP_Text,"sn":"message"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"}]}; }, $n);
    /*StealEggGame+DialogUI end.*/

    /*StealEggGame+LockedPanelUI start.*/
    $m("StealEggGame.LockedPanelUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"close","t":4,"rt":$n[2].Button,"sn":"close"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"}]}; }, $n);
    /*StealEggGame+LockedPanelUI end.*/

    /*StealEggGame+TreadmillPanelUI start.*/
    $m("StealEggGame.TreadmillPanelUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"close","t":4,"rt":$n[2].Button,"sn":"close"},{"a":2,"n":"level","t":4,"rt":$n[3].TMP_Text,"sn":"level"},{"a":2,"n":"max","t":4,"rt":$n[1].GameObject,"sn":"max"},{"a":2,"n":"price","t":4,"rt":$n[3].TMP_Text,"sn":"price"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"},{"a":2,"n":"train","t":4,"rt":$n[3].TMP_Text,"sn":"train"},{"a":2,"n":"upgrade","t":4,"rt":$n[2].Button,"sn":"upgrade"}]}; }, $n);
    /*StealEggGame+TreadmillPanelUI end.*/

    /*StealEggGame+IndexUI start.*/
    $m("StealEggGame.IndexUI", function () { return {"td":StealEggGame,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"claim","t":4,"rt":$n[2].Button,"sn":"claim"},{"a":2,"n":"claimed","t":4,"rt":$n[1].GameObject,"sn":"claimed"},{"a":2,"n":"close","t":4,"rt":$n[2].Button,"sn":"close"},{"a":2,"n":"infoImage","t":4,"rt":$n[2].Image,"sn":"infoImage"},{"a":2,"n":"infoIncome","t":4,"rt":$n[3].TMP_Text,"sn":"infoIncome"},{"a":2,"n":"infoName","t":4,"rt":$n[3].TMP_Text,"sn":"infoName"},{"a":2,"n":"infoRarity","t":4,"rt":$n[3].TMP_Text,"sn":"infoRarity"},{"a":2,"n":"information","t":4,"rt":$n[1].GameObject,"sn":"information"},{"at":[new UnityEngine.TooltipAttribute("Placeholder row for the zones of the full game, kept after the playable's zones.")],"a":2,"n":"lockedZone","t":4,"rt":$n[1].Transform,"sn":"lockedZone"},{"a":2,"n":"progress","t":4,"rt":$n[3].TMP_Text,"sn":"progress"},{"a":2,"n":"progressFill","t":4,"rt":$n[2].Image,"sn":"progressFill"},{"a":2,"n":"rewardContent","t":4,"rt":$n[1].Transform,"sn":"rewardContent"},{"a":2,"n":"rewardFrame","t":4,"rt":$n[1].GameObject,"sn":"rewardFrame"},{"a":2,"n":"rewardTemplate","t":4,"rt":IconAmountView,"sn":"rewardTemplate"},{"a":2,"n":"root","t":4,"rt":$n[1].GameObject,"sn":"root"},{"a":2,"n":"zoneTemplate","t":4,"rt":IndexZoneView,"sn":"zoneTemplate"},{"a":2,"n":"zones","t":4,"rt":$n[1].Transform,"sn":"zones"}]}; }, $n);
    /*StealEggGame+IndexUI end.*/

    /*StealEggGame+ActiveBoost start.*/
    $m("StealEggGame.ActiveBoost", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"info","t":4,"rt":StealEggGame.BoostInfo,"sn":"info"},{"a":2,"n":"left","t":4,"rt":$n[0].Single,"sn":"left","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"view","t":4,"rt":IconAmountView,"sn":"view"}]}; }, $n);
    /*StealEggGame+ActiveBoost end.*/

    /*StealEggGame+LuckyEgg start.*/
    $m("StealEggGame.LuckyEgg", function () { return {"td":StealEggGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"from","t":4,"rt":$n[1].Vector3,"sn":"from"},{"a":2,"n":"landed","t":4,"rt":$n[0].Boolean,"sn":"landed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"obj","t":4,"rt":$n[1].Transform,"sn":"obj"},{"a":2,"n":"openClock","t":4,"rt":$n[0].Single,"sn":"openClock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"opening","t":4,"rt":$n[0].Boolean,"sn":"opening","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"rotation","t":4,"rt":$n[1].Quaternion,"sn":"rotation"},{"a":2,"n":"to","t":4,"rt":$n[1].Vector3,"sn":"to"}]}; }, $n);
    /*StealEggGame+LuckyEgg end.*/

    /*LunaController start.*/
    $m("LunaController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":2,"n":"ClickCTA","t":8,"sn":"ClickCTA","rt":$n[0].Void},{"a":1,"n":"CountClick","t":8,"sn":"CountClick","rt":$n[0].Void},{"a":2,"n":"EggHatched","t":8,"sn":"EggHatched","rt":$n[0].Void},{"a":2,"n":"EggIncubated","t":8,"sn":"EggIncubated","rt":$n[0].Void},{"a":1,"n":"EndGame","t":8,"sn":"EndGame","rt":$n[5].IEnumerator},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":2,"n":"PlayerWalked","t":8,"pi":[{"n":"distance","pt":$n[0].Single,"ps":0}],"sn":"PlayerWalked","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"ShowEndCard","t":8,"sn":"ShowEndCard","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"EndCardVisible","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_EndCardVisible","t":8,"rt":$n[0].Boolean,"fg":"EndCardVisible","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"EndCardVisible"},{"a":2,"n":"IAPVisible","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IAPVisible","t":8,"rt":$n[0].Boolean,"fg":"IAPVisible","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IAPVisible"},{"a":2,"n":"Instance","is":true,"t":16,"rt":LunaController,"g":{"a":2,"n":"get_Instance","t":8,"rt":LunaController,"fg":"Instance","is":true},"s":{"a":1,"n":"set_Instance","t":8,"p":[LunaController],"rt":$n[0].Void,"fs":"Instance","is":true},"fn":"Instance"},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("BGM", 0, null)],"a":2,"n":"BGM","t":4,"rt":$n[1].AudioClip,"sn":"BGM"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"CTA","t":4,"rt":$n[4].List$1(UnityEngine.UI.Button),"sn":"CTA"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("IAP Distance", -1, null, false, null)],"a":2,"n":"IAPDistance","t":4,"rt":$n[0].Single,"sn":"IAPDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("IAP Version", -1, null, false, null)],"a":2,"n":"IAPVersion","t":4,"rt":$n[0].Int32,"sn":"IAPVersion","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Limit Count Click?", -1, null, false, null)],"a":2,"n":"LimitCountClick","t":4,"rt":$n[0].Boolean,"sn":"LimitCountClick","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Limit Count Hatch?", -1, null, false, null)],"a":2,"n":"LimitCountHatch","t":4,"rt":$n[0].Boolean,"sn":"LimitCountHatch","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Limit Count Incubate?", -1, null, false, null)],"a":2,"n":"LimitCountIncubate","t":4,"rt":$n[0].Boolean,"sn":"LimitCountIncubate","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Limit Time Play?", -1, null, false, null)],"a":2,"n":"LimitTimePlay","t":4,"rt":$n[0].Boolean,"sn":"LimitTimePlay","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Count Click", -1, null, false, null)],"a":2,"n":"MaxCountClick","t":4,"rt":$n[0].Int32,"sn":"MaxCountClick","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Count Hatch", -1, null, false, null)],"a":2,"n":"MaxCountHatch","t":4,"rt":$n[0].Int32,"sn":"MaxCountHatch","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Count Incubate", -1, null, false, null)],"a":2,"n":"MaxCountIncubate","t":4,"rt":$n[0].Int32,"sn":"MaxCountIncubate","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Time Play", -1, null, false, null)],"a":2,"n":"TimePlay","t":4,"rt":$n[0].Single,"sn":"TimePlay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"clicks","t":4,"rt":$n[0].Int32,"sn":"clicks","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"endCard","t":4,"rt":$n[1].GameObject,"sn":"endCard"},{"a":1,"n":"hatches","t":4,"rt":$n[0].Int32,"sn":"hatches","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"iapPopup","t":4,"rt":IAPPopupView,"sn":"iapPopup"},{"a":1,"n":"iapShown","t":4,"rt":$n[0].Boolean,"sn":"iapShown","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"incubates","t":4,"rt":$n[0].Int32,"sn":"incubates","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicSource","t":4,"rt":$n[1].AudioSource,"sn":"musicSource"},{"a":1,"backing":true,"n":"<Instance>k__BackingField","is":true,"t":4,"rt":LunaController,"sn":"Instance"}]}; }, $n);
    /*LunaController end.*/

    /*PlayableCameraDrag start.*/
    $m("PlayableCameraDrag", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"cameraController","t":4,"rt":CameraController,"sn":"cameraController"},{"a":1,"n":"pointer","t":4,"rt":$n[0].Int32,"sn":"pointer","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*PlayableCameraDrag end.*/

    /*PlayableHoldButton start.*/
    $m("PlayableHoldButton", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Cancel","t":8,"sn":"Cancel","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerExit","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerExit","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"duration","t":4,"rt":$n[0].Single,"sn":"duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"fill","t":4,"rt":$n[2].Image,"sn":"fill"},{"a":1,"n":"holding","t":4,"rt":$n[0].Boolean,"sn":"holding","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"onHold","t":4,"rt":Function,"sn":"onHold"}]}; }, $n);
    /*PlayableHoldButton end.*/

    /*PlayableJoystick start.*/
    $m("PlayableJoystick", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"ResetInput","t":8,"sn":"ResetInput","rt":$n[0].Void},{"a":2,"n":"Radius","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Radius","t":8,"rt":$n[0].Single,"fg":"Radius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Radius"},{"a":2,"n":"Value","t":16,"rt":$n[1].Vector2,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[1].Vector2,"fg":"Value"},"s":{"a":1,"n":"set_Value","t":8,"p":[$n[1].Vector2],"rt":$n[0].Void,"fs":"Value"},"fn":"Value"},{"a":2,"n":"knob","t":4,"rt":$n[1].RectTransform,"sn":"knob"},{"a":1,"n":"pointerId","t":4,"rt":$n[0].Int32,"sn":"pointerId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"backing":true,"n":"<Value>k__BackingField","t":4,"rt":$n[1].Vector2,"sn":"Value"}]}; }, $n);
    /*PlayableJoystick end.*/

    /*PlayableRagdoll start.*/
    $m("PlayableRagdoll", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Begin","t":8,"pi":[{"n":"force","pt":$n[1].Vector3,"ps":0}],"sn":"Begin","rt":$n[0].Void,"p":[$n[1].Vector3]},{"a":2,"n":"Follow","t":8,"sn":"Follow","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":2,"n":"Recover","t":8,"sn":"Recover","rt":$n[0].Void},{"a":1,"n":"active","t":4,"rt":$n[0].Boolean,"sn":"active","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"a":2,"n":"bodies","t":4,"rt":System.Array.type(UnityEngine.Rigidbody),"sn":"bodies"},{"a":2,"n":"bodyColliders","t":4,"rt":System.Array.type(UnityEngine.Collider),"sn":"bodyColliders"},{"a":1,"n":"bones","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"bones"},{"a":2,"n":"hips","t":4,"rt":$n[1].Rigidbody,"sn":"hips"},{"a":1,"n":"modelPosition","t":4,"rt":$n[1].Vector3,"sn":"modelPosition"},{"a":1,"n":"modelRotation","t":4,"rt":$n[1].Quaternion,"sn":"modelRotation"},{"a":2,"n":"player","t":4,"rt":$n[1].Transform,"sn":"player"},{"a":1,"n":"positions","t":4,"rt":System.Array.type(UnityEngine.Vector3),"sn":"positions"},{"a":1,"n":"rotations","t":4,"rt":System.Array.type(UnityEngine.Quaternion),"sn":"rotations"}]}; }, $n);
    /*PlayableRagdoll end.*/

    /*PlayableEggRules start.*/
    $m("PlayableEggRules", function () { return {"att":1056769,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Pick","is":true,"t":8,"pi":[{"n":"weights","pt":$n[0].Array.type(System.Single),"ps":0},{"n":"count","pt":$n[0].Int32,"ps":1}],"sn":"Pick","rt":$n[0].Int32,"p":[$n[0].Array.type(System.Single),$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"RollSize","t":8,"sn":"RollSize","rt":$n[0].Single,"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"incubationTime","t":4,"rt":$n[0].Single,"sn":"incubationTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"petIds","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"petIds"},{"a":2,"n":"petIncome","t":4,"rt":$n[0].Array.type(System.Single),"sn":"petIncome"},{"a":2,"n":"petWeights","t":4,"rt":$n[0].Array.type(System.Single),"sn":"petWeights"},{"a":2,"n":"pets","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"pets"},{"a":2,"n":"sizeRanges","t":4,"rt":System.Array.type(UnityEngine.Vector2),"sn":"sizeRanges"},{"a":2,"n":"sizeWeights","t":4,"rt":$n[0].Array.type(System.Single),"sn":"sizeWeights"},{"a":2,"n":"spawnWeight","t":4,"rt":$n[0].Single,"sn":"spawnWeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"thumbnail","t":4,"rt":$n[1].Sprite,"sn":"thumbnail"}]}; }, $n);
    /*PlayableEggRules end.*/

    /*PlayableSpatialAudio start.*/
    $m("PlayableSpatialAudio", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.AudioSource)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Apply","t":8,"sn":"Apply","rt":$n[0].Void},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":2,"n":"linear","t":4,"rt":$n[0].Boolean,"sn":"linear","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.TooltipAttribute("The AudioListener the distance is measured from (Main Camera).")],"a":2,"n":"listener","t":4,"rt":$n[1].Transform,"sn":"listener"},{"a":2,"n":"maxDistance","t":4,"rt":$n[0].Single,"sn":"maxDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minDistance","t":4,"rt":$n[0].Single,"sn":"minDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"source","t":4,"rt":$n[1].AudioSource,"sn":"source"},{"at":[new UnityEngine.TooltipAttribute("Volume inside minDistance, copied from the AudioSource.")],"a":2,"n":"volume","t":4,"rt":$n[0].Single,"sn":"volume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*PlayableSpatialAudio end.*/

    /*BagCellView start.*/
    $m("BagCellView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"amount","t":4,"rt":$n[3].TMP_Text,"sn":"amount"},{"a":2,"n":"button","t":4,"rt":$n[2].Button,"sn":"button"},{"a":2,"n":"exposeMark","t":4,"rt":$n[2].Image,"sn":"exposeMark"},{"a":2,"n":"highlight","t":4,"rt":$n[2].Image,"sn":"highlight"},{"a":2,"n":"thumbnail","t":4,"rt":$n[2].Image,"sn":"thumbnail"}]}; }, $n);
    /*BagCellView end.*/

    /*IAPPopupView start.*/
    $m("IAPPopupView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Show","t":8,"pi":[{"n":"version","pt":$n[0].Int32,"ps":0},{"n":"onBuy","pt":Function,"ps":1}],"sn":"Show","rt":$n[0].Void,"p":[$n[0].Int32,Function]},{"a":2,"n":"buy1","t":4,"rt":$n[2].Button,"sn":"buy1"},{"a":2,"n":"buy10","t":4,"rt":$n[2].Button,"sn":"buy10"},{"at":[new UnityEngine.TooltipAttribute("The '10 eggs' / '1 egg' captions above the buttons (hidden when the buttons themselves say it).")],"a":2,"n":"caption1","t":4,"rt":$n[1].GameObject,"sn":"caption1"},{"at":[new UnityEngine.TooltipAttribute("The '10 eggs' / '1 egg' captions above the buttons (hidden when the buttons themselves say it).")],"a":2,"n":"caption10","t":4,"rt":$n[1].GameObject,"sn":"caption10"},{"a":2,"n":"clickSound","t":4,"rt":$n[1].AudioClip,"sn":"clickSound"},{"a":2,"n":"eggs1","t":4,"rt":$n[0].String,"sn":"eggs1"},{"a":2,"n":"eggs10","t":4,"rt":$n[0].String,"sn":"eggs10"},{"a":2,"n":"hint1","t":4,"rt":TapHintView,"sn":"hint1"},{"a":2,"n":"hint10","t":4,"rt":TapHintView,"sn":"hint10"},{"a":2,"n":"label1","t":4,"rt":$n[3].TMP_Text,"sn":"label1"},{"a":2,"n":"label10","t":4,"rt":$n[3].TMP_Text,"sn":"label10"},{"a":2,"n":"openSound","t":4,"rt":$n[1].AudioClip,"sn":"openSound"},{"a":2,"n":"price1","t":4,"rt":$n[0].String,"sn":"price1"},{"a":2,"n":"price10","t":4,"rt":$n[0].String,"sn":"price10"},{"at":[new UnityEngine.TooltipAttribute("Same sounds as the game's other popups: opening (sae_PopupSound) and button press (SAE_ButtonSelected).")],"a":2,"n":"sound","t":4,"rt":$n[1].AudioSource,"sn":"sound"}]}; }, $n);
    /*IAPPopupView end.*/

    /*IconAmountView start.*/
    $m("IconAmountView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"amount","t":4,"rt":$n[3].TMP_Text,"sn":"amount"},{"a":2,"n":"icon","t":4,"rt":$n[2].Image,"sn":"icon"}]}; }, $n);
    /*IconAmountView end.*/

    /*IncubateRowView start.*/
    $m("IncubateRowView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"content","t":4,"rt":$n[3].TMP_Text,"sn":"content"},{"a":2,"n":"open","t":4,"rt":$n[2].Button,"sn":"open"},{"a":2,"n":"opening","t":4,"rt":$n[1].GameObject,"sn":"opening"},{"a":2,"n":"progressFill","t":4,"rt":$n[2].Image,"sn":"progressFill"},{"a":2,"n":"thumbnail","t":4,"rt":$n[2].Image,"sn":"thumbnail"}]}; }, $n);
    /*IncubateRowView end.*/

    /*IndexPetCellView start.*/
    $m("IndexPetCellView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"button","t":4,"rt":$n[2].Button,"sn":"button"},{"a":2,"n":"frame","t":4,"rt":$n[2].Image,"sn":"frame"},{"a":2,"n":"mark","t":4,"rt":$n[1].GameObject,"sn":"mark"},{"a":2,"n":"petName","t":4,"rt":$n[3].TMP_Text,"sn":"petName"},{"a":2,"n":"selected","t":4,"rt":$n[1].GameObject,"sn":"selected"},{"a":2,"n":"thumbnail","t":4,"rt":$n[2].Image,"sn":"thumbnail"}]}; }, $n);
    /*IndexPetCellView end.*/

    /*IndexZoneView start.*/
    $m("IndexZoneView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"petContent","t":4,"rt":$n[1].Transform,"sn":"petContent"},{"a":2,"n":"petTemplate","t":4,"rt":IndexPetCellView,"sn":"petTemplate"},{"a":2,"n":"progress","t":4,"rt":$n[3].TMP_Text,"sn":"progress"},{"a":2,"n":"progressFill","t":4,"rt":$n[2].Image,"sn":"progressFill"},{"a":2,"n":"thumbnail","t":4,"rt":$n[2].Image,"sn":"thumbnail"},{"a":2,"n":"zoneName","t":4,"rt":$n[3].TMP_Text,"sn":"zoneName"}]}; }, $n);
    /*IndexZoneView end.*/

    /*PetRowView start.*/
    $m("PetRowView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"content","t":4,"rt":$n[3].TMP_Text,"sn":"content"},{"a":2,"n":"thumbnail","t":4,"rt":$n[2].Image,"sn":"thumbnail"},{"a":2,"n":"unequip","t":4,"rt":$n[2].Button,"sn":"unequip"}]}; }, $n);
    /*PetRowView end.*/

    /*PlayableImageCycle start.*/
    $m("PlayableImageCycle", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"SetAlpha","t":8,"pi":[{"n":"a","pt":$n[0].Single,"ps":0}],"sn":"SetAlpha","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"image","t":4,"rt":$n[2].Image,"sn":"image"},{"a":1,"n":"index","t":4,"rt":$n[0].Int32,"sn":"index","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"showDuration","t":4,"rt":$n[0].Single,"sn":"showDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"sprites","t":4,"rt":System.Array.type(UnityEngine.Sprite),"sn":"sprites"},{"a":2,"n":"transitionDuration","t":4,"rt":$n[0].Single,"sn":"transitionDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*PlayableImageCycle end.*/

    /*PlayableUIPulse start.*/
    $m("PlayableUIPulse", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"baseScale","t":4,"rt":$n[1].Vector3,"sn":"baseScale"},{"a":2,"n":"duration","t":4,"rt":$n[0].Single,"sn":"duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"scale","t":4,"rt":$n[0].Single,"sn":"scale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*PlayableUIPulse end.*/

    /*PlayableUISparkle start.*/
    $m("PlayableUISparkle", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"Respawn","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"Respawn","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"RespawnRay","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"RespawnRay","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"Set","t":8,"pi":[{"n":"image","pt":$n[2].Image,"ps":0},{"n":"scale","pt":$n[0].Single,"ps":1},{"n":"alpha","pt":$n[0].Single,"ps":2}],"sn":"Set","rt":$n[0].Void,"p":[$n[2].Image,$n[0].Single,$n[0].Single]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"age","t":4,"rt":$n[0].Array.type(System.Single),"sn":"age"},{"a":2,"n":"color","t":4,"rt":$n[1].Color,"sn":"color"},{"a":1,"n":"life","t":4,"rt":$n[0].Array.type(System.Single),"sn":"life"},{"a":2,"n":"maxLife","t":4,"rt":$n[0].Single,"sn":"maxLife","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"maxSize","t":4,"rt":$n[0].Single,"sn":"maxSize","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minLife","t":4,"rt":$n[0].Single,"sn":"minLife","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minSize","t":4,"rt":$n[0].Single,"sn":"minSize","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"radius","t":4,"rt":$n[0].Single,"sn":"radius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"rayAge","t":4,"rt":$n[0].Array.type(System.Single),"sn":"rayAge"},{"a":2,"n":"rayLife","t":4,"rt":$n[0].Single,"sn":"rayLife","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"raySize","t":4,"rt":$n[0].Single,"sn":"raySize","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Optional sun rays (Lucky child, SunShines4): fade in and out, turned at random each cycle.")],"a":2,"n":"rays","t":4,"rt":System.Array.type(UnityEngine.UI.Image),"sn":"rays"},{"a":1,"n":"size","t":4,"rt":$n[0].Array.type(System.Single),"sn":"size"},{"a":2,"n":"spin","t":4,"rt":$n[0].Single,"sn":"spin","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"stars","t":4,"rt":System.Array.type(UnityEngine.UI.Image),"sn":"stars"},{"a":1,"n":"turn","t":4,"rt":$n[0].Array.type(System.Single),"sn":"turn"}]}; }, $n);
    /*PlayableUISparkle end.*/

    /*QuickSlotView start.*/
    $m("QuickSlotView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"button","t":4,"rt":$n[2].Button,"sn":"button"},{"a":2,"n":"content","t":4,"rt":$n[3].TMP_Text,"sn":"content"},{"a":2,"n":"highlight","t":4,"rt":$n[2].Image,"sn":"highlight"},{"a":2,"n":"thumbnail","t":4,"rt":$n[2].Image,"sn":"thumbnail"}]}; }, $n);
    /*QuickSlotView end.*/

    /*TapHintView start.*/
    $m("TapHintView", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"a":2,"n":"shine","t":4,"rt":$n[1].RectTransform,"sn":"shine"},{"a":2,"n":"shineGraphic","t":4,"rt":$n[2].Graphic,"sn":"shineGraphic"}]}; }, $n);
    /*TapHintView end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    }});
