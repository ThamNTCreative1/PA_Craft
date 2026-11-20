if ( TRACE ) { TRACE( JSON.parse( '["BillboardGroup#LateUpdate","BotController#init","BotController#Start","BotController#PickWanderPoint","BotController#Release","BotController#FindFreeNest","BotController#Update","BotController#Animate","FirstClickCta#OnPointerDown","FirstClickCta#OnPointerClick","GridAgent#HasDestination#get","GridAgent#Destination#get","GridAgent#Grid#get","GridAgent#RemainingDistance#get","GridAgent#init","GridAgent#Start","GridAgent#SetDestination","GridAgent#Stop","GridAgent#Arrived","GridAgent#Repath","GridAgent#Update","GridAgent#FaceTowards","GuideLine#init","GuideLine#SetTarget","GuideLine#LateUpdate","JumpButton#OnPointerDown","LunaController#Ended#get","LunaController#init","LunaController#Start","LunaController#SendGameEnded","LunaController#ShowEndUI","LunaController#ShowEndCard","LunaController#FirstClick","LunaController#OnEggStolen","LunaController#GoToStore","LunaController#ClickCTA","LunaController#EndAfterTime","Monster#IsHome#get","Monster#IsChasing#get","Monster#Target#get","Monster#ChaseSpeed#get","Monster#ChaseSpeed#set","Monster#ReturnSpeed#get","Monster#ReturnSpeed#set","Monster#init","Monster#SetAnimator","Monster#ResetToNest","Monster#Start","Monster#StartChase","Monster#GiveUp","Monster#GoHome","Monster#Update","NavGrid#init","NavGrid#Ready#get","NavGrid#init","NavGrid#Awake","NavGrid#CellX","NavGrid#CellZ","NavGrid#Inside","NavGrid#Walk","NavGrid#Center","NavGrid#Height","NavGrid#IsWalkable","NavGrid#HeightAt","NavGrid#NearestWalkable","NavGrid#ClosestWalkable","NavGrid#RandomPointNear","NavGrid#LineWalkable","NavGrid#H","NavGrid#Push","NavGrid#Pop","NavGrid#FindPath","NavGridData#init","Nest#Monster#get","Nest#HasEggs#get","Nest#Position#get","Nest#CanSteal#get","Nest#init","Nest#Start","Nest#TakeEggs","Nest#ReturnEggs","Nest#OnMonsterHome","Nest#Update","PlayableJoystick#init","PlayableJoystick#Awake","PlayableJoystick#OnPointerDown","PlayableJoystick#OnDrag","PlayableJoystick#OnPointerUp","PlayableJoystick#ResetInput","PlayableJoystick#OnDisable","PlayerMotor#Flat","PlayerMotor#Speed#get","PlayerMotor#IsGrounded#get","PlayerMotor#RunSpeed#get","PlayerMotor#RunSpeed#set","PlayerMotor#JumpImpulse#get","PlayerMotor#JumpImpulse#set","PlayerMotor#RunAnimSpeed#get","PlayerMotor#RunAnimSpeed#set","PlayerMotor#InputEnabled#get","PlayerMotor#AutoMoving#get","PlayerMotor#init","PlayerMotor#SetAnimator","PlayerMotor#Jump","PlayerMotor#WalkTo","PlayerMotor#StopWalk","PlayerMotor#Teleport","PlayerMotor#ReadMoveInput","PlayerMotor#Update","PlayerMotor#UpdateFootsteps","PlayerMotor#ClipByWalls","PlayerMotor#StepUp","PulseScale#init","PulseScale#Awake","PulseScale#OnEnable","PulseScale#Update","ScreenDeltaInputSystem#init","ScreenDeltaInputSystem#OnPointerDown","ScreenDeltaInputSystem#OnDrag","ScreenDeltaInputSystem#OnPointerUp","ScreenDeltaInputSystem#ConsumeDelta","ScreenDeltaInputSystem#OnDisable","SettingsPanel#init","SettingsPanel#Start","SettingsPanel#Open","SettingsPanel#Close","SettingsPanel#OnSensitivity","SettingsPanel#OnVolume","SettingsPanel#OnMusic","SkyDome#LateUpdate","StealEggTutorial#Show","StealEggTutorial#Done#get","StealEggTutorial#init","StealEggTutorial#Start","StealEggTutorial#Update","StealEggTutorial#Refresh","StealEggTutorial#LateUpdate","StealEggTutorial#UpdateJumpHand","StealPrompt#init","StealPrompt#Show","StealPrompt#Hide","StealPrompt#OnPointerDown","StealPrompt#OnPointerUp","StealPrompt#OnPointerExit","StealPrompt#OnDisable","Thief#IsPlayer#get","Thief#CarryingFrom#get","Thief#IsCarrying#get","Thief#SurviveLeft#get","Thief#IsKnocked#get","Thief#CanMove#get","Thief#init","Thief#Start","Thief#Steal","Thief#Caught","Thief#Deliver","Thief#SetKnockTimes","Thief#SetVisuals","Thief#ResetState","Thief#Escape","Thief#Update","ThirdPersonCamera#Yaw#get","ThirdPersonCamera#Pitch#get","ThirdPersonCamera#init","ThirdPersonCamera#Shake","ThirdPersonCamera#Start","ThirdPersonCamera#SetView","ThirdPersonCamera#LateUpdate","ThirdPersonCamera#UpdateCamera","TutorialHints#Show","TutorialHints#init","TutorialHints#Start","TutorialHints#Update","TutorialHints#Refresh","UpgradeController#SpeedPrice#get","UpgradeController#JumpPrice#get","UpgradeController#init","UpgradeController#Start","UpgradeController#Open","UpgradeController#Close","UpgradeController#BuySpeed","UpgradeController#BuyJump","UpgradeController#Bought","UpgradeController#Apply","UpgradeController#Refresh","UpgradeController#Update","UpgradeController#Play","GameController#SurviveTime#get","GameController#init","GameController#Start","GameController#ApplyCharacters","GameController#ApplySpeeds","GameController#StartRound","GameController#UpdateGoal","GameController#Update","GameController#UpdateSteal","GameController#InHome","GameController#OnSteal","GameController#OnCaught","GameController#OnEscaped","GameController#Win","GameController#UpdateDelivery","GameController#NextStep","GameController#StartEggFlight","GameController#TurnCameraToNest","GameController#GetUp","GameController#UpdateFlash","GameController#SetFlash","HuntGameController#SurviveTime#get","HuntGameController#Coins#get","HuntGameController#init","HuntGameController#Start","HuntGameController#TutorialNest","HuntGameController#Update","HuntGameController#UpdateSteal","HuntGameController#OnSteal","HuntGameController#OnCaught","HuntGameController#OnEscaped","HuntGameController#AddCoins","HuntGameController#TrySpend","HuntGameController#UpdateCoins","HuntGameController#CloseReward","HuntGameController#DoubleReward"]' ) ); }
/**
 * @version 1.0.9820.18638
 * @copyright anton
 * @compiler Bridge.NET 17.9.42-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*BillboardGroup start.*/
    Bridge.define("BillboardGroup", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            cameraTransform: null,
            items: null
        },
        methods: {
            /*BillboardGroup.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "BillboardGroup#LateUpdate", this ); }

                if (UnityEngine.Component.op_Equality(this.cameraTransform, null)) {
                    return;
                }
                var r = this.cameraTransform.rotation.$clone();
                for (var i = 0; i < this.items.length; i = (i + 1) | 0) {
                    if (UnityEngine.Object.op_Implicit(this.items[i]) && this.items[i].gameObject.activeInHierarchy) {
                        this.items[i].rotation = r.$clone();
                    }
                }
            },
            /*BillboardGroup.LateUpdate end.*/


        }
    });
    /*BillboardGroup end.*/

    /*BotController start.*/
    Bridge.define("BotController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            agent: null,
            thief: null,
            animator: null,
            nests: null,
            minSpeed: 0,
            maxSpeed: 0,
            runAwayDistance: 0,
            runAwayUpdateInterval: 0,
            nestApproachDistance: 0,
            minRestTime: 0,
            maxRestTime: 0,
            minWanderBeforeNest: 0,
            maxWanderBeforeNest: 0,
            wanderRadius: 0,
            restProbability: 0,
            runAnimSpeed: 0,
            state: 0,
            timer: 0,
            runAwayTimer: 0,
            targetNest: null,
            speed: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BotController#init", this ); }

                this.minSpeed = 6.0;
                this.maxSpeed = 7.5;
                this.runAwayDistance = 50.0;
                this.runAwayUpdateInterval = 1.0;
                this.nestApproachDistance = 1.2;
                this.minRestTime = 2.0;
                this.maxRestTime = 5.0;
                this.minWanderBeforeNest = 5.0;
                this.maxWanderBeforeNest = 15.0;
                this.wanderRadius = 25.0;
                this.restProbability = 0.25;
                this.runAnimSpeed = 1.1;
                this.state = BotController.State.Wander;
            }
        },
        methods: {
            /*BotController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "BotController#Start", this ); }

                this.speed = UnityEngine.Random.Range$1(this.minSpeed, this.maxSpeed);
                this.agent.Speed = this.speed;
                this.timer = UnityEngine.Random.Range$1(this.minWanderBeforeNest, this.maxWanderBeforeNest);
                this.PickWanderPoint();
            },
            /*BotController.Start end.*/

            /*BotController.PickWanderPoint start.*/
            PickWanderPoint: function () {
if ( TRACE ) { TRACE( "BotController#PickWanderPoint", this ); }

                if (UnityEngine.Object.op_Implicit(this.agent.Grid)) {
                    this.agent.SetDestination(this.agent.Grid.RandomPointNear(this.transform.position, this.wanderRadius), true);
                }
            },
            /*BotController.PickWanderPoint end.*/

            /*BotController.Release start.*/
            Release: function () {
if ( TRACE ) { TRACE( "BotController#Release", this ); }

                if (UnityEngine.Object.op_Implicit(this.targetNest) && UnityEngine.MonoBehaviour.op_Equality(this.targetNest.reservedBy, this.thief)) {
                    this.targetNest.reservedBy = null;
                }
                this.targetNest = null;
            },
            /*BotController.Release end.*/

            /*BotController.FindFreeNest start.*/
            FindFreeNest: function () {
if ( TRACE ) { TRACE( "BotController#FindFreeNest", this ); }

                var best = null;
                var bestScore = 3.40282347E+38;
                for (var i = 0; i < this.nests.length; i = (i + 1) | 0) {
                    var n = this.nests[i];
                    if (UnityEngine.MonoBehaviour.op_Equality(n, null) || !n.CanSteal || UnityEngine.MonoBehaviour.op_Inequality(n.reservedBy, null)) {
                        continue;
                    }
                    var score = (n.Position.$clone().sub( this.transform.position )).lengthSq() * UnityEngine.Random.Range$1(0.6, 1.4);
                    if (score < bestScore) {
                        bestScore = score;
                        best = n;
                    }
                }
                return best;
            },
            /*BotController.FindFreeNest end.*/

            /*BotController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BotController#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                if (!this.thief.CanMove) {
                    this.agent.Stop();
                    this.Release();
                    this.state = BotController.State.Wander;
                    this.timer = UnityEngine.Random.Range$1(this.minWanderBeforeNest, this.maxWanderBeforeNest);
                    this.Animate();
                    return;
                }

                if (this.thief.IsCarrying) {
                    // Run away from the chasing monster
                    this.agent.Speed = this.speed;
                    this.runAwayTimer -= dt;
                    if (this.runAwayTimer <= 0 || this.agent.Arrived(1.0)) {
                        this.runAwayTimer = this.runAwayUpdateInterval;
                        var m = this.thief.CarryingFrom.Monster;
                        var away = this.transform.position.$clone().sub( (UnityEngine.Object.op_Implicit(m) ? m.transform.position.$clone() : this.thief.CarryingFrom.Position.$clone()) );
                        away.y = 0;
                        if (away.lengthSq() < 0.01) {
                            away = this.transform.forward.$clone();
                        }
                        var goal = this.transform.position.$clone().add( away.clone().normalize().$clone().clone().scale( this.runAwayDistance ) );
                        if (UnityEngine.Object.op_Implicit(this.agent.Grid) && !this.agent.Grid.IsWalkable(goal)) {
                            goal = this.agent.Grid.RandomPointNear(this.transform.position.$clone().add( away.clone().normalize().$clone().clone().scale( this.runAwayDistance ).clone().scale( 0.5 ) ), this.runAwayDistance * 0.5);
                        }
                        this.agent.SetDestination(goal, true);
                    }
                    this.Animate();
                    return;
                }

                switch (this.state) {
                    case BotController.State.Wander: 
                        this.agent.Speed = this.speed * 0.6;
                        this.timer -= dt;
                        if (this.agent.Arrived(1.0) || !this.agent.HasDestination) {
                            if (UnityEngine.Random.value < this.restProbability) {
                                this.state = BotController.State.Rest;
                                this.agent.Stop();
                                this.runAwayTimer = UnityEngine.Random.Range$1(this.minRestTime, this.maxRestTime);
                            } else {
                                this.PickWanderPoint();
                            }
                        }
                        if (this.timer <= 0) {
                            var n = this.FindFreeNest();
                            if (UnityEngine.MonoBehaviour.op_Inequality(n, null)) {
                                this.targetNest = n;
                                n.reservedBy = this.thief;
                                this.state = BotController.State.GoToNest;
                                this.agent.Speed = this.speed;
                                this.agent.SetDestination(n.Position, true);
                            } else {
                                this.timer = 3.0;
                            }
                        }
                        break;
                    case BotController.State.Rest: 
                        this.runAwayTimer -= dt;
                        if (this.runAwayTimer <= 0) {
                            this.state = BotController.State.Wander;
                            this.PickWanderPoint();
                        }
                        break;
                    case BotController.State.GoToNest: 
                        if (UnityEngine.MonoBehaviour.op_Equality(this.targetNest, null) || !this.targetNest.CanSteal) {
                            this.Release();
                            this.state = BotController.State.Wander;
                            this.timer = UnityEngine.Random.Range$1(this.minWanderBeforeNest, this.maxWanderBeforeNest);
                            this.PickWanderPoint();
                            break;
                        }
                        this.agent.Speed = this.speed;
                        this.agent.SetDestination(this.targetNest.Position, false);
                        if (this.agent.Arrived(this.nestApproachDistance)) {
                            var n1 = this.targetNest;
                            this.Release();
                            this.agent.Stop();
                            this.thief.Steal(n1);
                            this.state = BotController.State.Wander;
                            this.timer = UnityEngine.Random.Range$1(this.minWanderBeforeNest, this.maxWanderBeforeNest);
                        }
                        break;
                }
                this.Animate();
            },
            /*BotController.Update end.*/

            /*BotController.Animate start.*/
            Animate: function () {
if ( TRACE ) { TRACE( "BotController#Animate", this ); }

                if (UnityEngine.Component.op_Equality(this.animator, null)) {
                    return;
                }
                var s = this.agent.CurrentSpeed;
                this.animator.SetFloat$1("Speed", s > 0.2 ? 1.0 : 0.0);
                this.animator.SetFloat$1("RunAnimSpeed", Math.max(0.5, Math.min(s / UnityEngine.Mathf.Max(0.1, this.speed), 1.2)) * this.runAnimSpeed);
                this.animator.SetBool$1("Grounded", true);
            },
            /*BotController.Animate end.*/


        }
    });
    /*BotController end.*/

    /*BotController+State start.*/
    Bridge.define("BotController.State", {
        $kind: 1006,
        statics: {
            fields: {
                Wander: 0,
                Rest: 1,
                GoToNest: 2
            }
        }
    });
    /*BotController+State end.*/

    /*FirstClickCta start.*/
    Bridge.define("FirstClickCta", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IPointerClickHandler],
        fields: {
            luna: null
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnPointerClick", "UnityEngine$EventSystems$IPointerClickHandler$OnPointerClick"
        ],
        methods: {
            /*FirstClickCta.OnPointerDown start.*/
            OnPointerDown: function (eventData) {
if ( TRACE ) { TRACE( "FirstClickCta#OnPointerDown", this ); }
 },
            /*FirstClickCta.OnPointerDown end.*/

            /*FirstClickCta.OnPointerClick start.*/
            OnPointerClick: function (eventData) {
if ( TRACE ) { TRACE( "FirstClickCta#OnPointerClick", this ); }

                if (UnityEngine.Object.op_Implicit(this.luna)) {
                    this.luna.FirstClick();
                }
            },
            /*FirstClickCta.OnPointerClick end.*/


        }
    });
    /*FirstClickCta end.*/

    /*ThiefGame start.*/
    Bridge.define("ThiefGame", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*ThiefGame end.*/

    /*GameController+Phase start.*/
    Bridge.define("GameController.Phase", {
        $kind: 1006,
        statics: {
            fields: {
                GoToEgg: 0,
                Escaping: 1,
                Caught: 2,
                Delivering: 3,
                Won: 4
            }
        }
    });
    /*GameController+Phase end.*/

    /*GridAgent start.*/
    Bridge.define("GridAgent", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            grid: null,
            repathInterval: 0,
            turnSpeed: 0,
            heightFollow: 0,
            cornerTolerance: 0,
            Speed: 0,
            CurrentSpeed: 0,
            path: null,
            index: 0,
            destination: null,
            hasDestination: false,
            repathTimer: 0
        },
        props: {
            HasDestination: {
                get: function () {
if ( TRACE ) { TRACE( "GridAgent#HasDestination#get", this ); }

                    return this.hasDestination;
                }
            },
            Destination: {
                get: function () {
if ( TRACE ) { TRACE( "GridAgent#Destination#get", this ); }

                    return this.destination.$clone();
                }
            },
            Grid: {
                get: function () {
if ( TRACE ) { TRACE( "GridAgent#Grid#get", this ); }

                    return this.grid;
                }
            },
            RemainingDistance: {
                get: function () {
if ( TRACE ) { TRACE( "GridAgent#RemainingDistance#get", this ); }

                    var d = this.destination.$clone().sub( this.transform.position );
                    d.y = 0;
                    return d.length();
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "GridAgent#init", this ); }

                this.destination = new UnityEngine.Vector3();
                this.repathInterval = 0.5;
                this.turnSpeed = 540.0;
                this.heightFollow = 12.0;
                this.cornerTolerance = 0.3;
                this.Speed = 3.0;
                this.path = new (System.Collections.Generic.List$1(UnityEngine.Vector3)).ctor();
            }
        },
        methods: {
            /*GridAgent.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "GridAgent#Start", this ); }

                this.repathTimer = UnityEngine.Random.Range$1(0.0, this.repathInterval);
            },
            /*GridAgent.Start end.*/

            /*GridAgent.SetDestination start.*/
            SetDestination: function (target, repathNow) {
if ( TRACE ) { TRACE( "GridAgent#SetDestination", this ); }

                this.destination = target.$clone();
                this.hasDestination = true;
                if (repathNow || this.path.Count === 0) {
                    this.Repath();
                }
            },
            /*GridAgent.SetDestination end.*/

            /*GridAgent.Stop start.*/
            Stop: function () {
if ( TRACE ) { TRACE( "GridAgent#Stop", this ); }

                this.hasDestination = false;
                this.path.clear();
                this.CurrentSpeed = 0;
            },
            /*GridAgent.Stop end.*/

            /*GridAgent.Arrived start.*/
            Arrived: function (tolerance) {
if ( TRACE ) { TRACE( "GridAgent#Arrived", this ); }

                var d = this.destination.$clone().sub( this.transform.position );
                d.y = 0;
                return d.lengthSq() <= tolerance * tolerance;
            },
            /*GridAgent.Arrived end.*/

            /*GridAgent.Repath start.*/
            Repath: function () {
if ( TRACE ) { TRACE( "GridAgent#Repath", this ); }

                this.repathTimer = this.repathInterval;
                this.index = 0;
                if (UnityEngine.MonoBehaviour.op_Equality(this.grid, null) || !this.grid.FindPath(this.transform.position, this.destination, this.path)) {
                    this.path.clear();
                    this.path.add(this.destination.$clone());
                }
            },
            /*GridAgent.Repath end.*/

            /*GridAgent.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "GridAgent#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                if (dt <= 0) {
                    return;
                }
                if (!this.hasDestination) {
                    this.CurrentSpeed = 0;
                    return;
                }
                this.repathTimer -= dt;
                if (this.repathTimer <= 0) {
                    this.Repath();
                }

                var pos = this.transform.position.$clone();
                var stepLeft = this.Speed * dt;
                var moveDir = pc.Vec3.ZERO.clone();
                while (stepLeft > 0 && this.index < this.path.Count) {
                    var corner = this.path.getItem(this.index).$clone();
                    var d = corner.$clone().sub( pos );
                    d.y = 0;
                    var dist = d.length();
                    if (dist <= this.cornerTolerance && this.index < ((this.path.Count - 1) | 0)) {
                        this.index = (this.index + 1) | 0;
                        continue;
                    }
                    if (dist < 0.0001) {
                        this.index = (this.index + 1) | 0;
                        continue;
                    }
                    var m = UnityEngine.Mathf.Min(stepLeft, dist);
                    moveDir = d.$clone().scale( 1.0 / ( dist ) );
                    pos = pos.$clone().add( moveDir.$clone().clone().scale( m ) );
                    stepLeft -= m;
                    if (m >= dist) {
                        this.index = (this.index + 1) | 0;
                    }
                }
                var moved = this.Speed * dt - stepLeft;
                this.CurrentSpeed = moved / dt;
                if (UnityEngine.Object.op_Implicit(this.grid)) {
                    pos.y = pc.math.lerp(this.transform.position.y, this.grid.HeightAt(pos), Math.max(0, Math.min(1, this.heightFollow * dt)));
                }
                this.transform.position = pos.$clone();
                if (moveDir.lengthSq() > 0.0001) {
                    this.transform.rotation = pc.Quat.rotateTowards( this.transform.rotation.$clone(), new pc.Quat().lookRotation( moveDir, pc.Vec3.UP.clone() ), this.turnSpeed * dt );
                }
            },
            /*GridAgent.Update end.*/

            /*GridAgent.FaceTowards start.*/
            FaceTowards: function (point, dt) {
if ( TRACE ) { TRACE( "GridAgent#FaceTowards", this ); }

                var d = point.$clone().sub( this.transform.position );
                d.y = 0;
                if (d.lengthSq() > 0.0001) {
                    this.transform.rotation = pc.Quat.rotateTowards( this.transform.rotation.$clone(), new pc.Quat().lookRotation( d.clone().normalize(), pc.Vec3.UP.clone() ), this.turnSpeed * dt );
                }
            },
            /*GridAgent.FaceTowards end.*/


        }
    });
    /*GridAgent end.*/

    /*GuideLine start.*/
    Bridge.define("GuideLine", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            line: null,
            from: null,
            heightOffset: 0,
            hideDistance: 0,
            drawFromTarget: false,
            target: null,
            points: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "GuideLine#init", this ); }

                this.heightOffset = 0.15;
                this.hideDistance = 2.0;
                this.drawFromTarget = false;
                this.points = System.Array.init(2, function (){
                    return new UnityEngine.Vector3();
                }, UnityEngine.Vector3);
            }
        },
        methods: {
            /*GuideLine.SetTarget start.*/
            SetTarget: function (newTarget) {
if ( TRACE ) { TRACE( "GuideLine#SetTarget", this ); }

                this.target = newTarget;
                if (UnityEngine.Object.op_Implicit(this.line)) {
                    this.line.enabled = UnityEngine.Component.op_Inequality(this.target, null);
                }
            },
            /*GuideLine.SetTarget end.*/

            /*GuideLine.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "GuideLine#LateUpdate", this ); }

                if (UnityEngine.Component.op_Equality(this.line, null)) {
                    return;
                }
                if (UnityEngine.Component.op_Equality(this.target, null) || UnityEngine.Component.op_Equality(this.from, null)) {
                    if (this.line.enabled) {
                        this.line.enabled = false;
                    }
                    return;
                }

                var start = this.from.position.$clone();
                var end = this.target.position.$clone();
                // The target pivot can be above the ground: keep the line at the player's feet height.
                end.y = start.y;
                var d = end.$clone().sub( start );
                var show = d.length() > this.hideDistance;
                if (this.line.enabled !== show) {
                    this.line.enabled = show;
                }
                if (!show) {
                    return;
                }

                var up = pc.Vec3.UP.clone().clone().scale( this.heightOffset );
                this.points[this.drawFromTarget ? 1 : 0] = start.$clone().add( up );
                this.points[this.drawFromTarget ? 0 : 1] = end.$clone().add( up );
                this.line.positionCount = 2;
                this.line.SetPositions(this.points);
            },
            /*GuideLine.LateUpdate end.*/


        }
    });
    /*GuideLine end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*JumpButton start.*/
    Bridge.define("JumpButton", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler],
        fields: {
            motor: null
        },
        alias: ["OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown"],
        methods: {
            /*JumpButton.OnPointerDown start.*/
            OnPointerDown: function (eventData) {
if ( TRACE ) { TRACE( "JumpButton#OnPointerDown", this ); }

                if (UnityEngine.Object.op_Implicit(this.motor)) {
                    this.motor.Jump();
                }
            },
            /*JumpButton.OnPointerDown end.*/


        }
    });
    /*JumpButton end.*/

    /*LunaController start.*/
    Bridge.define("LunaController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            LimitTimePlay: false,
            TimePlay: 0,
            BGM: null,
            TypePlayer: 0,
            TypeSpooky: 0,
            PlayerSpeed: 0,
            SpookySpeed: 0,
            PlayerResetCount: 0,
            CtaMode: 0,
            musicSource: null,
            musicVolume: 0,
            CTA: null,
            endUI: null,
            endCard: null,
            firstClickZone: null,
            ended: false,
            gameEndedSent: false
        },
        props: {
            Ended: {
                get: function () {
if ( TRACE ) { TRACE( "LunaController#Ended#get", this ); }

                    return this.ended;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "LunaController#init", this ); }

                this.TimePlay = 60;
                this.TypePlayer = 0;
                this.TypeSpooky = 0;
                this.PlayerSpeed = 0;
                this.SpookySpeed = 0;
                this.PlayerResetCount = 3;
                this.CtaMode = 0;
                this.musicVolume = 0.5;
                this.CTA = new (System.Collections.Generic.List$1(UnityEngine.UI.Button)).ctor();
            }
        },
        methods: {
            /*LunaController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "LunaController#Start", this ); }

                var $t;
                if (UnityEngine.Object.op_Implicit(this.BGM) && UnityEngine.Object.op_Implicit(this.musicSource)) {
                    this.musicSource.clip = this.BGM;
                    this.musicSource.loop = true;
                    this.musicSource.volume = this.musicVolume;
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
                if (UnityEngine.Object.op_Implicit(this.endUI)) {
                    this.endUI.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.endCard)) {
                    this.endCard.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.firstClickZone)) {
                    this.firstClickZone.SetActive(this.CtaMode === 1);
                }
                this.StartCoroutine$1(this.EndAfterTime());
            },
            /*LunaController.Start end.*/

            /*LunaController.SendGameEnded start.*/
            SendGameEnded: function () {
if ( TRACE ) { TRACE( "LunaController#SendGameEnded", this ); }

                if (this.gameEndedSent) {
                    return;
                }
                this.gameEndedSent = true;
                Luna.Unity.LifeCycle.GameEnded();
            },
            /*LunaController.SendGameEnded end.*/

            /*LunaController.ShowEndUI start.*/
            ShowEndUI: function () {
if ( TRACE ) { TRACE( "LunaController#ShowEndUI", this ); }

                this.ended = true;
                if (UnityEngine.Object.op_Implicit(this.endUI)) {
                    this.endUI.SetActive(true);
                }
                if (UnityEngine.Object.op_Implicit(this.endCard)) {
                    this.endCard.SetActive(true);
                }
            },
            /*LunaController.ShowEndUI end.*/

            /*LunaController.ShowEndCard start.*/
            ShowEndCard: function () {
if ( TRACE ) { TRACE( "LunaController#ShowEndCard", this ); }

                this.ended = true;
                if (UnityEngine.Object.op_Implicit(this.endCard)) {
                    this.endCard.SetActive(true);
                }
            },
            /*LunaController.ShowEndCard end.*/

            /*LunaController.FirstClick start.*/
            FirstClick: function () {
if ( TRACE ) { TRACE( "LunaController#FirstClick", this ); }

                if (UnityEngine.Object.op_Implicit(this.firstClickZone)) {
                    this.firstClickZone.SetActive(false);
                }
                this.GoToStore();
            },
            /*LunaController.FirstClick end.*/

            /*LunaController.OnEggStolen start.*/
            OnEggStolen: function () {
if ( TRACE ) { TRACE( "LunaController#OnEggStolen", this ); }

                if (this.CtaMode === 2) {
                    this.GoToStore();
                }
            },
            /*LunaController.OnEggStolen end.*/

            /*LunaController.GoToStore start.*/
            GoToStore: function () {
if ( TRACE ) { TRACE( "LunaController#GoToStore", this ); }

                this.ShowEndCard();
                this.ClickCTA();
            },
            /*LunaController.GoToStore end.*/

            /*LunaController.ClickCTA start.*/
            ClickCTA: function () {
if ( TRACE ) { TRACE( "LunaController#ClickCTA", this ); }

                Luna.Unity.Playable.InstallFullGame();
            },
            /*LunaController.ClickCTA end.*/

            /*LunaController.EndAfterTime start.*/
            EndAfterTime: function () {
if ( TRACE ) { TRACE( "LunaController#EndAfterTime", this ); }

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
                                    this.SendGameEnded();
                                        if (this.LimitTimePlay && !this.ended) {
                                            this.ShowEndUI();
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
            /*LunaController.EndAfterTime end.*/


        }
    });
    /*LunaController end.*/

    /*Monster start.*/
    Bridge.define("Monster", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            agent: null,
            animator: null,
            nest: null,
            exclamation: null,
            audioSource: null,
            angryClips: null,
            ambientClips: null,
            minSoundDelay: 0,
            maxSoundDelay: 0,
            ambientVolume: 0,
            listener: null,
            hearDistance: 0,
            angerDelay: 0,
            minIdleTime: 0,
            maxIdleTime: 0,
            minWalkTime: 0,
            maxWalkTime: 0,
            wanderRadius: 0,
            walkSpeed: 0,
            chaseSpeed: 0,
            returnSpeed: 0,
            catchDistance: 0,
            homeRadius: 0,
            state: 0,
            timer: 0,
            soundTimer: 0,
            ambientEndTime: 0,
            angerTimer: 0,
            target: null
        },
        props: {
            IsHome: {
                get: function () {
if ( TRACE ) { TRACE( "Monster#IsHome#get", this ); }

                    if (this.state === Monster.State.Chase || this.state === Monster.State.Return) {
                        return false;
                    }
                    var d = this.transform.position.$clone().sub( this.nest.Position );
                    d.y = 0;
                    return d.length() <= this.homeRadius;
                }
            },
            IsChasing: {
                get: function () {
if ( TRACE ) { TRACE( "Monster#IsChasing#get", this ); }

                    return this.state === Monster.State.Chase;
                }
            },
            Target: {
                get: function () {
if ( TRACE ) { TRACE( "Monster#Target#get", this ); }

                    return this.target;
                }
            },
            ChaseSpeed: {
                get: function () {
if ( TRACE ) { TRACE( "Monster#ChaseSpeed#get", this ); }

                    return this.chaseSpeed;
                },
                set: function (value) {
if ( TRACE ) { TRACE( "Monster#ChaseSpeed#set", this ); }

                    this.chaseSpeed = value;
                }
            },
            ReturnSpeed: {
                get: function () {
if ( TRACE ) { TRACE( "Monster#ReturnSpeed#get", this ); }

                    return this.returnSpeed;
                },
                set: function (value) {
if ( TRACE ) { TRACE( "Monster#ReturnSpeed#set", this ); }

                    this.returnSpeed = value;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "Monster#init", this ); }

                this.minSoundDelay = 1.5;
                this.maxSoundDelay = 1.5;
                this.ambientVolume = 0.5;
                this.hearDistance = 25.0;
                this.angerDelay = 1.0;
                this.minIdleTime = 2;
                this.maxIdleTime = 5;
                this.minWalkTime = 3;
                this.maxWalkTime = 7;
                this.wanderRadius = 5;
                this.walkSpeed = 2.0;
                this.chaseSpeed = 7.2;
                this.returnSpeed = 4.0;
                this.catchDistance = 1.4;
                this.homeRadius = 7.0;
                this.state = Monster.State.Idle;
            }
        },
        methods: {
            /*Monster.SetAnimator start.*/
            SetAnimator: function (newAnimator) {
if ( TRACE ) { TRACE( "Monster#SetAnimator", this ); }

                this.animator = newAnimator;
            },
            /*Monster.SetAnimator end.*/

            /*Monster.ResetToNest start.*/
            ResetToNest: function (position, rotation) {
if ( TRACE ) { TRACE( "Monster#ResetToNest", this ); }

                this.target = null;
                this.agent.Stop();
                this.transform.position = position.$clone();
                this.transform.rotation = rotation.$clone();
                this.state = Monster.State.Idle;
                this.timer = UnityEngine.Random.Range$1(this.minIdleTime, this.maxIdleTime);
                if (UnityEngine.Object.op_Implicit(this.exclamation)) {
                    this.exclamation.SetActive(false);
                }
            },
            /*Monster.ResetToNest end.*/

            /*Monster.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "Monster#Start", this ); }

                if (UnityEngine.Object.op_Implicit(this.exclamation)) {
                    this.exclamation.SetActive(false);
                }
                this.timer = UnityEngine.Random.Range$1(this.minIdleTime, this.maxIdleTime);
                this.soundTimer = UnityEngine.Random.Range$1(this.minSoundDelay, this.maxSoundDelay);
            },
            /*Monster.Start end.*/

            /*Monster.StartChase start.*/
            StartChase: function (thief) {
if ( TRACE ) { TRACE( "Monster#StartChase", this ); }

                this.target = thief;
                this.state = Monster.State.Chase;
                this.angerTimer = this.angerDelay;
                this.agent.Stop();
                if (UnityEngine.Object.op_Implicit(this.exclamation)) {
                    this.exclamation.SetActive(true);
                }
                var near = UnityEngine.Component.op_Equality(this.listener, null) || (this.listener.position.$clone().sub( this.transform.position )).lengthSq() <= this.hearDistance * this.hearDistance;
                if (near && UnityEngine.Object.op_Implicit(this.audioSource) && this.angryClips != null && this.angryClips.length > 0) {
                    this.audioSource.PlayOneShot(this.angryClips[UnityEngine.Random.Range(0, this.angryClips.length)]);
                }
            },
            /*Monster.StartChase end.*/

            /*Monster.GiveUp start.*/
            GiveUp: function () {
if ( TRACE ) { TRACE( "Monster#GiveUp", this ); }

                this.target = null;
                this.GoHome();
            },
            /*Monster.GiveUp end.*/

            /*Monster.GoHome start.*/
            GoHome: function () {
if ( TRACE ) { TRACE( "Monster#GoHome", this ); }

                this.state = Monster.State.Return;
                this.agent.Speed = this.returnSpeed;
                this.agent.SetDestination(this.nest.Position, true);
            },
            /*Monster.GoHome end.*/

            /*Monster.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "Monster#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                switch (this.state) {
                    case Monster.State.Chase: 
                        if (UnityEngine.MonoBehaviour.op_Equality(this.target, null) || UnityEngine.MonoBehaviour.op_Inequality(this.target.CarryingFrom, this.nest)) {
                            this.GiveUp();
                            break;
                        }
                        if (this.angerTimer > 0) {
                            this.angerTimer -= dt;
                            this.agent.FaceTowards(this.target.transform.position.$clone(), dt);
                            if (this.angerTimer > 0) {
                                break;
                            }
                            this.agent.Speed = this.chaseSpeed;
                            this.agent.SetDestination(this.target.transform.position, true);
                        }
                        this.agent.SetDestination(this.target.transform.position, false);
                        var d = this.target.transform.position.$clone().sub( this.transform.position );
                        d.y = 0;
                        if (d.length() <= this.catchDistance) {
                            var caught = this.target;
                            this.target = null;
                            caught.Caught();
                            this.GoHome();
                        }
                        break;
                    case Monster.State.Return: 
                        if (this.agent.Arrived(0.6)) {
                            this.agent.Stop();
                            this.state = Monster.State.Idle;
                            this.timer = UnityEngine.Random.Range$1(this.minIdleTime, this.maxIdleTime);
                            if (UnityEngine.Object.op_Implicit(this.exclamation)) {
                                this.exclamation.SetActive(false);
                            }
                            this.nest.OnMonsterHome();
                        }
                        break;
                    case Monster.State.Idle: 
                        this.timer -= dt;
                        if (this.timer <= 0) {
                            this.state = Monster.State.Wander;
                            this.timer = UnityEngine.Random.Range$1(this.minWalkTime, this.maxWalkTime);
                            this.agent.Speed = this.walkSpeed;
                            this.agent.SetDestination(UnityEngine.Object.op_Implicit(this.agent.Grid) ? this.agent.Grid.RandomPointNear(this.nest.Position, this.wanderRadius) : this.nest.Position.$clone(), true);
                        }
                        break;
                    case Monster.State.Wander: 
                        this.timer -= dt;
                        if (this.agent.Arrived(0.4) && this.timer > 0) {
                            this.agent.SetDestination(UnityEngine.Object.op_Implicit(this.agent.Grid) ? this.agent.Grid.RandomPointNear(this.nest.Position, this.wanderRadius) : this.nest.Position.$clone(), true);
                        }
                        if (this.timer <= 0) {
                            this.agent.Stop();
                            this.state = Monster.State.Idle;
                            this.timer = UnityEngine.Random.Range$1(this.minIdleTime, this.maxIdleTime);
                        }
                        break;
                }
                if (UnityEngine.Object.op_Implicit(this.animator)) {
                    this.animator.SetFloat$1("Speed", this.agent.CurrentSpeed);
                }

                // Ambient calls: one at a time (also while chasing)
                if (UnityEngine.Time.time < this.ambientEndTime) {
                    return;
                }
                this.soundTimer -= dt;
                if (this.soundTimer <= 0) {
                    this.soundTimer = UnityEngine.Random.Range$1(this.minSoundDelay, this.maxSoundDelay);
                    var near = UnityEngine.Component.op_Equality(this.listener, null) || (this.listener.position.$clone().sub( this.transform.position )).lengthSq() <= this.hearDistance * this.hearDistance;
                    if (near && UnityEngine.Object.op_Implicit(this.audioSource) && this.ambientClips != null && this.ambientClips.length > 0) {
                        var clip = this.ambientClips[UnityEngine.Random.Range(0, this.ambientClips.length)];
                        if (UnityEngine.Object.op_Implicit(clip)) {
                            this.audioSource.PlayOneShot$1(clip, this.ambientVolume);
                            this.ambientEndTime = UnityEngine.Time.time + clip.length;
                        }
                    }
                }
            },
            /*Monster.Update end.*/


        }
    });
    /*Monster end.*/

    /*Monster+State start.*/
    Bridge.define("Monster.State", {
        $kind: 1006,
        statics: {
            fields: {
                Idle: 0,
                Wander: 1,
                Chase: 2,
                Return: 3
            }
        }
    });
    /*Monster+State end.*/

    /*NavGrid start.*/
    Bridge.define("NavGrid", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                DX: null,
                DZ: null
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "NavGrid#init", this ); }

                    this.DX = System.Array.init([
                        1, 
                        -1, 
                        0, 
                        0, 
                        1, 
                        1, 
                        -1, 
                        -1
                    ], System.Int32);
                    this.DZ = System.Array.init([
                        0, 
                        0, 
                        1, 
                        -1, 
                        1, 
                        -1, 
                        1, 
                        -1
                    ], System.Int32);
                }
            }
        },
        fields: {
            data: null,
            maxExpanded: 0,
            sizeX: 0,
            sizeZ: 0,
            count: 0,
            cell: 0,
            origin: null,
            g: null,
            parent: null,
            seen: null,
            closed: null,
            stamp: 0,
            heap: null,
            heapF: null,
            heapCount: 0,
            cellPath: null
        },
        props: {
            Ready: {
                get: function () {
if ( TRACE ) { TRACE( "NavGrid#Ready#get", this ); }

                    return this.count > 0;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "NavGrid#init", this ); }

                this.origin = new UnityEngine.Vector3();
                this.maxExpanded = 6000;
                this.cellPath = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            }
        },
        methods: {
            /*NavGrid.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "NavGrid#Awake", this ); }

                if (this.data == null || this.data.walkable == null) {
                    return;
                }
                this.sizeX = this.data.sizeX;
                this.sizeZ = this.data.sizeZ;
                this.count = Bridge.Int.mul(this.sizeX, this.sizeZ);
                this.cell = this.data.cellSize;
                this.origin = this.data.origin.$clone();
                this.g = System.Array.init(this.count, 0, System.Single);
                this.parent = System.Array.init(this.count, 0, System.Int32);
                this.seen = System.Array.init(this.count, 0, System.Int32);
                this.closed = System.Array.init(this.count, 0, System.Int32);
                this.heap = System.Array.init(((Bridge.Int.mul(this.count, 2) + 16) | 0), 0, System.Int32);
                this.heapF = System.Array.init(((Bridge.Int.mul(this.count, 2) + 16) | 0), 0, System.Single);
            },
            /*NavGrid.Awake end.*/

            /*NavGrid.CellX start.*/
            CellX: function (x) {
if ( TRACE ) { TRACE( "NavGrid#CellX", this ); }

                return Math.floor((x - this.origin.x) / this.cell);
            },
            /*NavGrid.CellX end.*/

            /*NavGrid.CellZ start.*/
            CellZ: function (z) {
if ( TRACE ) { TRACE( "NavGrid#CellZ", this ); }

                return Math.floor((z - this.origin.z) / this.cell);
            },
            /*NavGrid.CellZ end.*/

            /*NavGrid.Inside start.*/
            Inside: function (x, z) {
if ( TRACE ) { TRACE( "NavGrid#Inside", this ); }

                return x >= 0 && z >= 0 && x < this.sizeX && z < this.sizeZ;
            },
            /*NavGrid.Inside end.*/

            /*NavGrid.Walk start.*/
            Walk: function (x, z) {
if ( TRACE ) { TRACE( "NavGrid#Walk", this ); }

                var $t;
                return this.Inside(x, z) && ($t = this.data.walkable)[((Bridge.Int.mul(z, this.sizeX) + x) | 0)] !== 0;
            },
            /*NavGrid.Walk end.*/

            /*NavGrid.Center start.*/
            Center: function (index) {
if ( TRACE ) { TRACE( "NavGrid#Center", this ); }

                var x = index % this.sizeX, z = (Bridge.Int.div(index, this.sizeX)) | 0;
                return new pc.Vec3( this.origin.x + (x + 0.5) * this.cell, this.Height(index), this.origin.z + (z + 0.5) * this.cell );
            },
            /*NavGrid.Center end.*/

            /*NavGrid.Height start.*/
            Height: function (index) {
if ( TRACE ) { TRACE( "NavGrid#Height", this ); }

                var $t, $t1;
                var lo = ($t = this.data.heights)[Bridge.Int.mul(index, 2)], hi = ($t1 = this.data.heights)[((Bridge.Int.mul(index, 2) + 1) | 0)];
                return this.data.minHeight + (lo | (hi << 8)) * this.data.heightStep;
            },
            /*NavGrid.Height end.*/

            /*NavGrid.IsWalkable start.*/
            IsWalkable: function (p) {
if ( TRACE ) { TRACE( "NavGrid#IsWalkable", this ); }

                return this.Ready && this.Walk(this.CellX(p.x), this.CellZ(p.z));
            },
            /*NavGrid.IsWalkable end.*/

            /*NavGrid.HeightAt start.*/
            HeightAt: function (p) {
if ( TRACE ) { TRACE( "NavGrid#HeightAt", this ); }

                if (!this.Ready) {
                    return p.y;
                }
                var x = this.CellX(p.x), z = this.CellZ(p.z);
                if (this.Walk(x, z)) {
                    return this.Height(((Bridge.Int.mul(z, this.sizeX) + x) | 0));
                }
                var n = this.NearestWalkable(x, z, 4);
                return n >= 0 ? this.Height(n) : p.y;
            },
            /*NavGrid.HeightAt end.*/

            /*NavGrid.NearestWalkable start.*/
            NearestWalkable: function (x, z, radius) {
if ( TRACE ) { TRACE( "NavGrid#NearestWalkable", this ); }

                if (this.Walk(x, z)) {
                    return ((Bridge.Int.mul(z, this.sizeX) + x) | 0);
                }
                for (var r = 1; r <= radius; r = (r + 1) | 0) {
                    for (var i = (-r) | 0; i <= r; i = (i + 1) | 0) {
                        if (this.Walk(((x + i) | 0), ((z - r) | 0))) {
                            return ((((Bridge.Int.mul((((z - r) | 0)), this.sizeX) + x) | 0) + i) | 0);
                        }
                        if (this.Walk(((x + i) | 0), ((z + r) | 0))) {
                            return ((((Bridge.Int.mul((((z + r) | 0)), this.sizeX) + x) | 0) + i) | 0);
                        }
                        if (this.Walk(((x - r) | 0), ((z + i) | 0))) {
                            return ((((Bridge.Int.mul((((z + i) | 0)), this.sizeX) + x) | 0) - r) | 0);
                        }
                        if (this.Walk(((x + r) | 0), ((z + i) | 0))) {
                            return ((((Bridge.Int.mul((((z + i) | 0)), this.sizeX) + x) | 0) + r) | 0);
                        }
                    }
                }
                return -1;
            },
            /*NavGrid.NearestWalkable end.*/

            /*NavGrid.ClosestWalkable start.*/
            ClosestWalkable: function (p, radiusCells) {
if ( TRACE ) { TRACE( "NavGrid#ClosestWalkable", this ); }

                if (!this.Ready) {
                    return p.$clone();
                }
                var n = this.NearestWalkable(this.CellX(p.x), this.CellZ(p.z), radiusCells);
                if (n < 0) {
                    return p.$clone();
                }
                if (n === ((Bridge.Int.mul(this.CellZ(p.z), this.sizeX) + this.CellX(p.x)) | 0)) {
                    return new pc.Vec3( p.x, this.Height(n), p.z );
                }
                return this.Center(n);
            },
            /*NavGrid.ClosestWalkable end.*/

            /*NavGrid.RandomPointNear start.*/
            RandomPointNear: function (center, radius) {
if ( TRACE ) { TRACE( "NavGrid#RandomPointNear", this ); }

                for (var i = 0; i < 12; i = (i + 1) | 0) {
                    var r = UnityEngine.Random.insideUnitCircle.$clone().scale( radius );
                    var p = new pc.Vec3( center.x + r.x, center.y, center.z + r.y );
                    if (this.IsWalkable(p)) {
                        return new pc.Vec3( p.x, this.HeightAt(p), p.z );
                    }
                }
                return this.ClosestWalkable(center, 6);
            },
            /*NavGrid.RandomPointNear end.*/

            /*NavGrid.LineWalkable start.*/
            LineWalkable: function (a, b) {
if ( TRACE ) { TRACE( "NavGrid#LineWalkable", this ); }

                var d = b.$clone().sub( a );
                d.y = 0;
                var len = d.length();
                var steps = Math.ceil(len / (this.cell * 0.5));
                for (var i = 0; i <= steps; i = (i + 1) | 0) {
                    var p = steps > 0 ? a.$clone().add( d.$clone().clone().scale( (i / steps) ) ) : a.$clone();
                    if (!this.Walk(this.CellX(p.x), this.CellZ(p.z))) {
                        return false;
                    }
                }
                return true;
            },
            /*NavGrid.LineWalkable end.*/

            /*NavGrid.H start.*/
            H: function (a, b) {
if ( TRACE ) { TRACE( "NavGrid#H", this ); }

                var ax = a % this.sizeX, az = (Bridge.Int.div(a, this.sizeX)) | 0, bx = b % this.sizeX, bz = (Bridge.Int.div(b, this.sizeX)) | 0;
                var dx = Math.abs(((ax - bx) | 0)), dz = Math.abs(((az - bz) | 0));
                return dx > dz ? dx + 0.4142 * dz : dz + 0.4142 * dx;
            },
            /*NavGrid.H end.*/

            /*NavGrid.Push start.*/
            Push: function (i, f) {
if ( TRACE ) { TRACE( "NavGrid#Push", this ); }

                if (this.heapCount >= this.heap.length) {
                    return;
                }
                var k = Bridge.identity(this.heapCount, ((this.heapCount = (this.heapCount + 1) | 0)));
                while (k > 0) {
                    var p = (((k - 1) | 0)) >> 1;
                    if (this.heapF[p] <= f) {
                        break;
                    }
                    this.heap[k] = this.heap[p];
                    this.heapF[k] = this.heapF[p];
                    k = p;
                }
                this.heap[k] = i;
                this.heapF[k] = f;
            },
            /*NavGrid.Push end.*/

            /*NavGrid.Pop start.*/
            Pop: function () {
if ( TRACE ) { TRACE( "NavGrid#Pop", this ); }

                var top = this.heap[0];
                this.heapCount = (this.heapCount - 1) | 0;
                if (this.heapCount > 0) {
                    var last = this.heap[this.heapCount];
                    var lf = this.heapF[this.heapCount];
                    var k = 0;
                    while (true) {
                        var c = (Bridge.Int.mul(k, 2) + 1) | 0;
                        if (c >= this.heapCount) {
                            break;
                        }
                        if (((c + 1) | 0) < this.heapCount && this.heapF[((c + 1) | 0)] < this.heapF[c]) {
                            c = (c + 1) | 0;
                        }
                        if (this.heapF[c] >= lf) {
                            break;
                        }
                        this.heap[k] = this.heap[c];
                        this.heapF[k] = this.heapF[c];
                        k = c;
                    }
                    this.heap[k] = last;
                    this.heapF[k] = lf;
                }
                return top;
            },
            /*NavGrid.Pop end.*/

            /*NavGrid.FindPath start.*/
            FindPath: function (from, to, path) {
if ( TRACE ) { TRACE( "NavGrid#FindPath", this ); }

                path.clear();
                if (!this.Ready) {
                    path.add(to.$clone());
                    return true;
                }
                var s = this.NearestWalkable(this.CellX(from.x), this.CellZ(from.z), 6);
                var goal = this.NearestWalkable(this.CellX(to.x), this.CellZ(to.z), 8);
                if (s < 0 || goal < 0) {
                    return false;
                }
                if (s === goal || this.LineWalkable(from.$clone(), to.$clone())) {
                    path.add(new pc.Vec3( to.x, this.HeightAt(to), to.z ));
                    return true;
                }

                this.stamp = (this.stamp + 1) | 0;
                this.heapCount = 0;
                this.g[s] = 0;
                this.parent[s] = -1;
                this.seen[s] = this.stamp;
                this.Push(s, this.H(s, goal));
                var best = s;
                var bestH = this.H(s, goal);
                var expanded = 0;
                var found = false;
                while (this.heapCount > 0) {
                    var cur = this.Pop();
                    if (this.closed[cur] === this.stamp) {
                        continue;
                    }
                    this.closed[cur] = this.stamp;
                    if (cur === goal) {
                        found = true;
                        break;
                    }
                    var h = this.H(cur, goal);
                    if (h < bestH) {
                        bestH = h;
                        best = cur;
                    }
                    if (((expanded = (expanded + 1) | 0)) > this.maxExpanded) {
                        break;
                    }
                    var cx = cur % this.sizeX, cz = (Bridge.Int.div(cur, this.sizeX)) | 0;
                    for (var k = 0; k < 8; k = (k + 1) | 0) {
                        var nx = (cx + NavGrid.DX[k]) | 0, nz = (cz + NavGrid.DZ[k]) | 0;
                        if (!this.Walk(nx, nz)) {
                            continue;
                        }
                        if (k >= 4 && (!this.Walk(((cx + NavGrid.DX[k]) | 0), cz) || !this.Walk(cx, ((cz + NavGrid.DZ[k]) | 0)))) {
                            continue;
                        }
                        var n = (Bridge.Int.mul(nz, this.sizeX) + nx) | 0;
                        if (this.closed[n] === this.stamp) {
                            continue;
                        }
                        var ng = this.g[cur] + (k >= 4 ? 1.4142 : 1.0);
                        if (this.seen[n] !== this.stamp || ng < this.g[n]) {
                            this.seen[n] = this.stamp;
                            this.g[n] = ng;
                            this.parent[n] = cur;
                            this.Push(n, ng + this.H(n, goal));
                        }
                    }
                }
                var end = found ? goal : best;

                this.cellPath.clear();
                for (var c = end; c >= 0; c = this.parent[c]) {
                    this.cellPath.add(c);
                    if (c === s) {
                        break;
                    }
                }
                this.cellPath.Reverse();

                // String pulling: keep only the cells where the straight line breaks
                var anchor = from.$clone();
                for (var i = 1; i < this.cellPath.Count; i = (i + 1) | 0) {
                    var next = this.Center(this.cellPath.getItem(i));
                    if (!this.LineWalkable(anchor.$clone(), next.$clone())) {
                        var corner = this.Center(this.cellPath.getItem(((i - 1) | 0)));
                        path.add(corner.$clone());
                        anchor = corner.$clone();
                    }
                }
                var last = found && this.IsWalkable(to) ? new pc.Vec3( to.x, this.HeightAt(to), to.z ) : this.Center(end);
                path.add(last.$clone());
                return true;
            },
            /*NavGrid.FindPath end.*/


        }
    });
    /*NavGrid end.*/

    /*NavGridData start.*/
    Bridge.define("NavGridData", {
        inherits: [UnityEngine.ScriptableObject],
        fields: {
            origin: null,
            cellSize: 0,
            sizeX: 0,
            sizeZ: 0,
            minHeight: 0,
            heightStep: 0,
            walkable: null,
            heights: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "NavGridData#init", this ); }

                this.origin = new UnityEngine.Vector3();
                this.cellSize = 1.0;
                this.heightStep = 0.01;
            }
        }
    });
    /*NavGridData end.*/

    /*Nest start.*/
    Bridge.define("Nest", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            eggs: null,
            monster: null,
            refillDelay: 0,
            tutorialNest: false,
            hasEggs: false,
            refillTimer: 0,
            reservedBy: null
        },
        props: {
            Monster: {
                get: function () {
if ( TRACE ) { TRACE( "Nest#Monster#get", this ); }

                    return this.monster;
                }
            },
            HasEggs: {
                get: function () {
if ( TRACE ) { TRACE( "Nest#HasEggs#get", this ); }

                    return this.hasEggs;
                }
            },
            Position: {
                get: function () {
if ( TRACE ) { TRACE( "Nest#Position#get", this ); }

                    return this.transform.position.$clone();
                }
            },
            CanSteal: {
                get: function () {
if ( TRACE ) { TRACE( "Nest#CanSteal#get", this ); }

                    return this.hasEggs && UnityEngine.MonoBehaviour.op_Inequality(this.monster, null) && this.monster.IsHome;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "Nest#init", this ); }

                this.refillDelay = 4.0;
                this.hasEggs = true;
                this.refillTimer = -1;
            }
        },
        methods: {
            /*Nest.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "Nest#Start", this ); }

                if (UnityEngine.Object.op_Implicit(this.eggs)) {
                    this.eggs.SetActive(true);
                }
            },
            /*Nest.Start end.*/

            /*Nest.TakeEggs start.*/
            TakeEggs: function () {
if ( TRACE ) { TRACE( "Nest#TakeEggs", this ); }

                this.hasEggs = false;
                this.refillTimer = -1;
                if (UnityEngine.Object.op_Implicit(this.eggs)) {
                    this.eggs.SetActive(false);
                }
            },
            /*Nest.TakeEggs end.*/

            /*Nest.ReturnEggs start.*/
            ReturnEggs: function () {
if ( TRACE ) { TRACE( "Nest#ReturnEggs", this ); }

                this.hasEggs = true;
                this.refillTimer = -1;
                if (UnityEngine.Object.op_Implicit(this.eggs)) {
                    this.eggs.SetActive(true);
                }
            },
            /*Nest.ReturnEggs end.*/

            /*Nest.OnMonsterHome start.*/
            OnMonsterHome: function () {
if ( TRACE ) { TRACE( "Nest#OnMonsterHome", this ); }

                if (!this.hasEggs && this.refillTimer < 0) {
                    this.refillTimer = this.refillDelay;
                }
            },
            /*Nest.OnMonsterHome end.*/

            /*Nest.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "Nest#Update", this ); }

                if (this.refillTimer < 0) {
                    return;
                }
                this.refillTimer -= UnityEngine.Time.deltaTime;
                if (this.refillTimer <= 0) {
                    this.ReturnEggs();
                }
            },
            /*Nest.Update end.*/


        }
    });
    /*Nest end.*/

    /*PlayableJoystick start.*/
    Bridge.define("PlayableJoystick", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            handleRange: 0,
            deadZone: 0,
            floating: false,
            area: null,
            background: null,
            knob: null,
            Value: null,
            initialBackgroundPosition: null,
            pointerId: 0
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
                this.initialBackgroundPosition = new UnityEngine.Vector2();
                this.handleRange = 1;
                this.deadZone = 0;
                this.floating = false;
                this.pointerId = -2147483648;
            }
        },
        methods: {
            /*PlayableJoystick.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PlayableJoystick#Awake", this ); }

                if (UnityEngine.Object.op_Implicit(this.background)) {
                    this.initialBackgroundPosition = this.background.anchoredPosition.$clone();
                }
            },
            /*PlayableJoystick.Awake end.*/

            /*PlayableJoystick.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "PlayableJoystick#OnPointerDown", this ); }

                if (this.pointerId !== -2147483648 || UnityEngine.Component.op_Equality(this.background, null)) {
                    return;
                }
                this.pointerId = e.pointerId;
                var world = { v : new UnityEngine.Vector3() };
                if (this.floating && UnityEngine.Object.op_Implicit(this.area) && UnityEngine.RectTransformUtility.ScreenPointToWorldPointInRectangle(this.area, e.position, e.pressEventCamera, world)) {
                    var centerOffset = this.background.TransformPoint$1(UnityEngine.Vector3.FromVector2(this.background.rect.center)).sub( this.background.position );
                    this.background.position = world.v.$clone().sub( centerOffset );
                }
                this.OnDrag(e);
            },
            /*PlayableJoystick.OnPointerDown end.*/

            /*PlayableJoystick.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "PlayableJoystick#OnDrag", this ); }

                if (e.pointerId !== this.pointerId || UnityEngine.Component.op_Equality(this.background, null)) {
                    return;
                }
                var local = { v : new UnityEngine.Vector2() };
                if (!UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.background, e.position, e.pressEventCamera, local)) {
                    return;
                }
                var radius = this.background.rect.size.$clone().scale( 0.5 );
                var center = this.background.rect.center.$clone();
                var input = new pc.Vec2( (local.v.x - center.x) / UnityEngine.Mathf.Max(1, radius.x), (local.v.y - center.y) / UnityEngine.Mathf.Max(1, radius.y) );
                if (input.length() < this.deadZone) {
                    input = pc.Vec2.ZERO.clone();
                } else {
                    if (input.length() > 1) {
                        input.normalize();
                    }
                }
                this.Value = input.$clone();
                if (UnityEngine.Object.op_Implicit(this.knob)) {
                    this.knob.anchoredPosition = new pc.Vec2( input.x * radius.x, input.y * radius.y ).scale( this.handleRange );
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
                if (UnityEngine.Object.op_Implicit(this.background) && this.floating) {
                    this.background.anchoredPosition = this.initialBackgroundPosition.$clone();
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

    /*PlayerMotor start.*/
    Bridge.define("PlayerMotor", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*PlayerMotor.Flat:static start.*/
                Flat: function (v) {
if ( TRACE ) { TRACE( "PlayerMotor#Flat", this ); }

                    v.y = 0;
                    return v.$clone();
                },
                /*PlayerMotor.Flat:static end.*/


            }
        },
        fields: {
            controller: null,
            animator: null,
            thief: null,
            cameraTransform: null,
            joystick: null,
            audioSource: null,
            jumpClip: null,
            footstepClips: null,
            footstepInterval: 0,
            footstepVolume: 0,
            footstepPitchJitter: 0,
            footstepSource: null,
            runSpeed: 0,
            rotationRate: 0,
            jumpImpulse: 0,
            gravity: 0,
            runAnimSpeed: 0,
            stepHeight: 0,
            wallNormalY: 0,
            killHeight: 0,
            respawnPoint: null,
            wallHeights: null,
            footstepTimer: 0,
            lastFootstep: 0,
            horizontalVelocity: null,
            runDirection: null,
            verticalSpeed: 0,
            grounded: false,
            jumpQueued: false,
            Frozen: false,
            JumpCount: 0,
            autoMove: false,
            autoTarget: null,
            autoSpeed: 0
        },
        props: {
            Speed: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#Speed#get", this ); }

                    return this.horizontalVelocity.length();
                }
            },
            IsGrounded: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#IsGrounded#get", this ); }

                    return this.grounded;
                }
            },
            RunSpeed: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#RunSpeed#get", this ); }

                    return this.runSpeed;
                },
                set: function (value) {
if ( TRACE ) { TRACE( "PlayerMotor#RunSpeed#set", this ); }

                    this.runSpeed = value;
                }
            },
            JumpImpulse: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#JumpImpulse#get", this ); }

                    return this.jumpImpulse;
                },
                set: function (value) {
if ( TRACE ) { TRACE( "PlayerMotor#JumpImpulse#set", this ); }

                    this.jumpImpulse = value;
                }
            },
            RunAnimSpeed: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#RunAnimSpeed#get", this ); }

                    return this.runAnimSpeed;
                },
                set: function (value) {
if ( TRACE ) { TRACE( "PlayerMotor#RunAnimSpeed#set", this ); }

                    this.runAnimSpeed = value;
                }
            },
            InputEnabled: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#InputEnabled#get", this ); }

                    return !this.Frozen && (UnityEngine.MonoBehaviour.op_Equality(this.thief, null) || this.thief.CanMove);
                }
            },
            AutoMoving: {
                get: function () {
if ( TRACE ) { TRACE( "PlayerMotor#AutoMoving#get", this ); }

                    return this.autoMove;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayerMotor#init", this ); }

                this.horizontalVelocity = new UnityEngine.Vector3();
                this.runDirection = new UnityEngine.Vector3();
                this.autoTarget = new UnityEngine.Vector3();
                this.footstepInterval = 0.2;
                this.footstepVolume = 0.6;
                this.footstepPitchJitter = 0.08;
                this.runSpeed = 8.0;
                this.rotationRate = 900.0;
                this.jumpImpulse = 13.0;
                this.gravity = 39.24;
                this.runAnimSpeed = 1.2;
                this.stepHeight = 0.5;
                this.wallNormalY = 0.7;
                this.killHeight = -10.0;
                this.wallHeights = System.Array.init(3, 0, System.Single);
                this.lastFootstep = -1;
                this.grounded = true;
            }
        },
        methods: {
            /*PlayerMotor.SetAnimator start.*/
            SetAnimator: function (newAnimator) {
if ( TRACE ) { TRACE( "PlayerMotor#SetAnimator", this ); }

                this.animator = newAnimator;
            },
            /*PlayerMotor.SetAnimator end.*/

            /*PlayerMotor.Jump start.*/
            Jump: function () {
if ( TRACE ) { TRACE( "PlayerMotor#Jump", this ); }

                if (this.InputEnabled) {
                    this.jumpQueued = true;
                }
            },
            /*PlayerMotor.Jump end.*/

            /*PlayerMotor.WalkTo start.*/
            WalkTo: function (point, speed) {
if ( TRACE ) { TRACE( "PlayerMotor#WalkTo", this ); }

                this.autoTarget = point.$clone();
                this.autoSpeed = speed;
                this.autoMove = true;
            },
            /*PlayerMotor.WalkTo end.*/

            /*PlayerMotor.StopWalk start.*/
            StopWalk: function () {
if ( TRACE ) { TRACE( "PlayerMotor#StopWalk", this ); }

                this.autoMove = false;
            },
            /*PlayerMotor.StopWalk end.*/

            /*PlayerMotor.Teleport start.*/
            Teleport: function (position, rotation) {
if ( TRACE ) { TRACE( "PlayerMotor#Teleport", this ); }

                this.controller.enabled = false;
                this.transform.position = position.$clone();
                this.transform.rotation = rotation.$clone();
                this.controller.enabled = true;
                this.verticalSpeed = 0;
                this.horizontalVelocity = pc.Vec3.ZERO.clone();
                this.runDirection = pc.Vec3.ZERO.clone();
            },
            /*PlayerMotor.Teleport end.*/

            /*PlayerMotor.ReadMoveInput start.*/
            ReadMoveInput: function () {
if ( TRACE ) { TRACE( "PlayerMotor#ReadMoveInput", this ); }

                if (!this.InputEnabled) {
                    return pc.Vec2.ZERO.clone();
                }
                var value = UnityEngine.Object.op_Implicit(this.joystick) ? this.joystick.Value.$clone() : pc.Vec2.ZERO.clone();
                if (value.lengthSq() < 0.0001) {
                    var h = 0, v = 0;
                    if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.A) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.LeftArrow)) {
                        h -= 1;
                    }
                    if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.D) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.RightArrow)) {
                        h += 1;
                    }
                    if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.S) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.DownArrow)) {
                        v -= 1;
                    }
                    if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.W) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.UpArrow)) {
                        v += 1;
                    }
                    value = pc.Vec2.lengthClamp( new pc.Vec2( h, v ), 1 );
                }
                return value.$clone();
            },
            /*PlayerMotor.ReadMoveInput end.*/

            /*PlayerMotor.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PlayerMotor#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                if (dt <= 0) {
                    return;
                }
                if (this.InputEnabled && UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.Space)) {
                    this.jumpQueued = true;
                }
                if (!this.InputEnabled && UnityEngine.Object.op_Implicit(this.joystick)) {
                    this.joystick.ResetInput();
                }

                // Camera-relative input on the ground plane
                var input = this.ReadMoveInput();
                var forward = new pc.Vec3( 0, 0, 1 );
                if (UnityEngine.Object.op_Implicit(this.cameraTransform)) {
                    forward = pc.Vec3.projectOnPlane( this.cameraTransform.forward, pc.Vec3.UP.clone() );
                    if (forward.lengthSq() < 0.0001) {
                        forward = pc.Vec3.projectOnPlane( this.cameraTransform.up, pc.Vec3.UP.clone() );
                    }
                }
                forward.normalize();
                var right = new pc.Vec3().cross( pc.Vec3.UP.clone(), forward );
                var moveDirection = pc.Vec3.clampMagnitude( forward.$clone().clone().scale( input.y ).add( right.$clone().clone().scale( input.x ) ), 1 );
                var autoLeft = -1;
                if (this.autoMove) {
                    var to = PlayerMotor.Flat(this.autoTarget.$clone().sub( this.transform.position ));
                    autoLeft = to.length();
                    if (autoLeft < 0.1) {
                        this.autoMove = false;
                        moveDirection = pc.Vec3.ZERO.clone();
                        autoLeft = -1;
                    } else {
                        moveDirection = to.$clone().scale( 1.0 / ( autoLeft ) ).clone().scale( Math.max(0, Math.min(1, this.autoSpeed / UnityEngine.Mathf.Max(0.01, this.runSpeed))) );
                    }
                }

                if (moveDirection.lengthSq() > 0.0001) {
                    var target = moveDirection.clone().normalize().$clone();
                    if (this.runDirection.lengthSq() < 0.0001) {
                        this.runDirection = this.transform.forward.$clone();
                    }
                    this.runDirection = pc.Vec3.projectOnPlane( this.runDirection, pc.Vec3.UP.clone() );
                    if (this.runDirection.lengthSq() < 0.0001) {
                        this.runDirection = target.$clone();
                    }
                    this.runDirection.normalize();
                    var angle = pc.Vec3.signedAngle( this.runDirection, target, pc.Vec3.UP.clone() );
                    if (Math.abs(angle) > 179.5) {
                        angle = 180.0;
                    }
                    var turn = Math.max(-this.rotationRate * dt, Math.min(angle, this.rotationRate * dt));
                    this.runDirection = (new pc.Quat().setFromAxisAngle( pc.Vec3.UP.clone(), turn ).transformVector( this.runDirection )).clone().normalize().$clone();
                    this.horizontalVelocity = this.runDirection.$clone().clone().scale( (moveDirection.length() * this.runSpeed) );
                    // Scripted walk: don't step past the point
                    if (autoLeft > 0 && this.horizontalVelocity.length() * dt > autoLeft) {
                        this.horizontalVelocity = this.horizontalVelocity.clone().normalize().$clone().clone().scale( (autoLeft / dt) );
                    }
                } else {
                    this.runDirection = pc.Vec3.ZERO.clone();
                    this.horizontalVelocity = pc.Vec3.ZERO.clone();
                }

                // Jump and gravity
                if (this.grounded && this.verticalSpeed < 0) {
                    this.verticalSpeed = -2.0;
                }
                if (this.jumpQueued && this.grounded) {
                    this.verticalSpeed = this.jumpImpulse;
                    this.JumpCount = (this.JumpCount + 1) | 0;
                    this.grounded = false;
                    if (UnityEngine.Object.op_Implicit(this.audioSource) && UnityEngine.Object.op_Implicit(this.jumpClip)) {
                        this.audioSource.PlayOneShot(this.jumpClip);
                    }
                }
                this.jumpQueued = false;
                this.verticalSpeed -= this.gravity * dt;

                var wasGrounded = this.grounded;
                var start = this.transform.position.$clone();
                var step = this.ClipByWalls(this.horizontalVelocity.$clone().clone().scale( dt ));
                var expected = this.verticalSpeed * dt;
                this.controller.Move(step.$clone().add( pc.Vec3.UP.clone().clone().scale( expected ) ));
                var moved = this.transform.position.y - start.y;
                this.grounded = this.controller.isGrounded || (this.verticalSpeed <= 0 && moved > expected * 0.5);
                if (this.verticalSpeed > 0 && moved < expected * 0.5) {
                    this.verticalSpeed = 0;
                }
                if (wasGrounded && this.verticalSpeed <= 0 && step.lengthSq() > 1E-06 && PlayerMotor.Flat(this.transform.position.$clone().sub( start )).length() < step.length() * 0.5) {
                    if (this.StepUp(step)) {
                        this.grounded = true;
                    }
                }

                if (this.transform.position.y < this.killHeight && UnityEngine.Object.op_Implicit(this.respawnPoint)) {
                    this.Teleport(this.respawnPoint.position, this.respawnPoint.rotation);
                }

                // Face the run direction
                var face = this.runDirection.lengthSq() > 0.0001 ? this.runDirection.$clone() : this.transform.forward.$clone();
                face = pc.Vec3.projectOnPlane( face, pc.Vec3.UP.clone() );
                if (face.lengthSq() > 0.0001) {
                    this.transform.rotation = new pc.Quat().lookRotation( face.clone().normalize(), pc.Vec3.UP.clone() );
                }

                this.UpdateFootsteps(dt);

                if (UnityEngine.Object.op_Implicit(this.animator)) {
                    var s = this.runSpeed > 0 ? Math.max(0, Math.min(1, this.Speed / this.runSpeed)) : 0;
                    this.animator.SetFloat$1("Speed", s);
                    this.animator.SetFloat$1("RunAnimSpeed", UnityEngine.Mathf.Max(0.5, s) * this.runAnimSpeed);
                    this.animator.SetBool$1("Grounded", this.grounded);
                    this.animator.SetFloat$1("VelY", this.verticalSpeed);
                }
            },
            /*PlayerMotor.Update end.*/

            /*PlayerMotor.UpdateFootsteps start.*/
            UpdateFootsteps: function (dt) {
if ( TRACE ) { TRACE( "PlayerMotor#UpdateFootsteps", this ); }

                if (UnityEngine.Component.op_Equality(this.footstepSource, null) || this.footstepClips == null || this.footstepClips.length === 0) {
                    return;
                }
                // footstepTimer = seconds since the last step; the step interval follows the CURRENT speed every frame
                // (a slow start must not hold back the steps once running).
                if (!this.grounded || this.Speed < 0.5) {
                    this.footstepTimer = 1000.0;
                    return;
                }
                this.footstepTimer += dt;
                var k = this.runSpeed > 0 ? Math.max(0.3, Math.min(this.Speed / this.runSpeed, 1.0)) : 1.0;
                if (this.footstepTimer < this.footstepInterval / k) {
                    return;
                }
                this.footstepTimer = 0;
                var i = UnityEngine.Random.Range(0, this.footstepClips.length);
                if (i === this.lastFootstep && this.footstepClips.length > 1) {
                    i = (((i + 1) | 0)) % this.footstepClips.length;
                }
                this.lastFootstep = i;
                this.footstepSource.pitch = 1.0 + UnityEngine.Random.Range$1(-this.footstepPitchJitter, this.footstepPitchJitter);
                if (UnityEngine.Object.op_Implicit(this.footstepClips[i])) {
                    this.footstepSource.PlayOneShot$1(this.footstepClips[i], this.footstepVolume);
                }
            },
            /*PlayerMotor.UpdateFootsteps end.*/

            /*PlayerMotor.ClipByWalls start.*/
            ClipByWalls: function (step) {
if ( TRACE ) { TRACE( "PlayerMotor#ClipByWalls", this ); }

                var flat = PlayerMotor.Flat(step.$clone());
                if (flat.lengthSq() < 1E-08 || UnityEngine.Component.op_Equality(this.controller, null)) {
                    return step.$clone();
                }
                var radius = this.controller.radius;
                var feet = this.transform.position.$clone().add( this.controller.center ).sub( pc.Vec3.UP.clone().clone().scale( (this.controller.height * 0.5) ) );
                this.wallHeights[0] = this.stepHeight + 0.15;
                this.wallHeights[1] = this.controller.height * 0.5;
                this.wallHeights[2] = this.controller.height - 0.3;
                for (var pass = 0; pass < 2; pass = (pass + 1) | 0) {
                    var len = flat.length();
                    if (len < 1E-05) {
                        break;
                    }
                    var dir = flat.$clone().scale( 1.0 / ( len ) );
                    var nearest = 3.40282347E+38;
                    var normal = pc.Vec3.ZERO.clone();
                    for (var h = 0; h < this.wallHeights.length; h = (h + 1) | 0) {
                        var hits = UnityEngine.Physics.RaycastAll$2(feet.$clone().add( pc.Vec3.UP.clone().clone().scale( this.wallHeights[h] ) ), dir, radius + len + 0.1);
                        for (var i = 0; i < hits.length; i = (i + 1) | 0) {
                            var c = hits[i].collider;
                            if (UnityEngine.Component.op_Equality(c, null) || c.isTrigger || c.transform.IsChildOf(this.transform)) {
                                continue;
                            }
                            if (hits[i].normal.y > this.wallNormalY) {
                                continue;
                            }
                            if (hits[i].distance < nearest) {
                                nearest = hits[i].distance;
                                normal = hits[i].normal.$clone();
                            }
                        }
                    }
                    if (nearest === 3.40282347E+38) {
                        break;
                    }
                    var n = PlayerMotor.Flat(normal.$clone());
                    n = n.lengthSq() > 1E-06 ? n.clone().normalize().$clone() : dir.$clone().scale( -1 );
                    var free = UnityEngine.Mathf.Max(0.0, nearest - radius - 0.02);
                    var toWall = dir.$clone().clone().scale( UnityEngine.Mathf.Min(len, free) );
                    var rest = flat.$clone().sub( toWall );
                    var into = rest.dot( n );
                    if (into < 0) {
                        rest = rest.$clone().sub( n.$clone().clone().scale( into ) );
                    }
                    flat = toWall.$clone().add( rest );
                }
                return new pc.Vec3( flat.x, step.y, flat.z );
            },
            /*PlayerMotor.ClipByWalls end.*/

            /*PlayerMotor.StepUp start.*/
            StepUp: function (step) {
if ( TRACE ) { TRACE( "PlayerMotor#StepUp", this ); }

                var before = this.transform.position.$clone();
                this.controller.Move(pc.Vec3.UP.clone().clone().scale( this.stepHeight ));
                var rose = this.transform.position.y - before.y;
                if (rose > 0.01) {
                    var mid = this.transform.position.$clone();
                    this.controller.Move(step);
                    var across = PlayerMotor.Flat(this.transform.position.$clone().sub( mid )).length();
                    var top = this.transform.position.$clone();
                    this.controller.Move(pc.Vec3.DOWN.clone().clone().scale( (rose + 0.05) ));
                    var landed = this.transform.position.y > top.y - rose - 0.04;
                    if (across > step.length() * 0.5 && landed) {
                        return true;
                    }
                }
                this.controller.enabled = false;
                this.transform.position = before.$clone();
                this.controller.enabled = true;
                return false;
            },
            /*PlayerMotor.StepUp end.*/


        }
    });
    /*PlayerMotor end.*/

    /*PulseScale start.*/
    Bridge.define("PulseScale", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            minScale: 0,
            maxScale: 0,
            period: 0,
            baseScale: null,
            startTime: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PulseScale#init", this ); }

                this.baseScale = new UnityEngine.Vector3();
                this.minScale = 0.9;
                this.maxScale = 1.1;
                this.period = 0.8;
            }
        },
        methods: {
            /*PulseScale.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PulseScale#Awake", this ); }

                this.baseScale = this.transform.localScale.$clone();
            },
            /*PulseScale.Awake end.*/

            /*PulseScale.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "PulseScale#OnEnable", this ); }

                this.startTime = UnityEngine.Time.unscaledTime;
            },
            /*PulseScale.OnEnable end.*/

            /*PulseScale.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PulseScale#Update", this ); }

                var k = 0.5 + 0.5 * Math.sin((UnityEngine.Time.unscaledTime - this.startTime) / UnityEngine.Mathf.Max(0.05, this.period) * UnityEngine.Mathf.PI * 2.0);
                this.transform.localScale = this.baseScale.$clone().clone().scale( pc.math.lerp(this.minScale, this.maxScale, k) );
            },
            /*PulseScale.Update end.*/


        }
    });
    /*PulseScale end.*/

    /*ScreenDeltaInputSystem start.*/
    Bridge.define("ScreenDeltaInputSystem", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            delta: null,
            pointerId: 0
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "ScreenDeltaInputSystem#init", this ); }

                this.delta = new UnityEngine.Vector2();
                this.pointerId = -2147483648;
            }
        },
        methods: {
            /*ScreenDeltaInputSystem.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "ScreenDeltaInputSystem#OnPointerDown", this ); }

                if (this.pointerId === -2147483648) {
                    this.pointerId = e.pointerId;
                }
            },
            /*ScreenDeltaInputSystem.OnPointerDown end.*/

            /*ScreenDeltaInputSystem.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "ScreenDeltaInputSystem#OnDrag", this ); }

                if (e.pointerId === this.pointerId) {
                    this.delta = this.delta.$clone().add( e.delta.$clone() );
                }
            },
            /*ScreenDeltaInputSystem.OnDrag end.*/

            /*ScreenDeltaInputSystem.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "ScreenDeltaInputSystem#OnPointerUp", this ); }

                if (e.pointerId === this.pointerId) {
                    this.pointerId = -2147483648;
                }
            },
            /*ScreenDeltaInputSystem.OnPointerUp end.*/

            /*ScreenDeltaInputSystem.ConsumeDelta start.*/
            ConsumeDelta: function () {
if ( TRACE ) { TRACE( "ScreenDeltaInputSystem#ConsumeDelta", this ); }

                var d = this.delta.$clone();
                this.delta = pc.Vec2.ZERO.clone();
                return d.$clone();
            },
            /*ScreenDeltaInputSystem.ConsumeDelta end.*/

            /*ScreenDeltaInputSystem.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "ScreenDeltaInputSystem#OnDisable", this ); }

                this.pointerId = -2147483648;
                this.delta = pc.Vec2.ZERO.clone();
            },
            /*ScreenDeltaInputSystem.OnDisable end.*/


        }
    });
    /*ScreenDeltaInputSystem end.*/

    /*SettingsPanel start.*/
    Bridge.define("SettingsPanel", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            panel: null,
            openButton: null,
            closeButtons: null,
            sensitivitySlider: null,
            volumeSlider: null,
            musicSlider: null,
            cameraRig: null,
            defaultSensitivity: 0,
            musicSources: null,
            musicBaseVolumes: null,
            sfx: null,
            clickClip: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "SettingsPanel#init", this ); }

                this.defaultSensitivity = 200.0;
            }
        },
        methods: {
            /*SettingsPanel.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "SettingsPanel#Start", this ); }

                if (UnityEngine.Object.op_Implicit(this.panel)) {
                    this.panel.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.openButton)) {
                    this.openButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.Open));
                }
                for (var i = 0; i < this.closeButtons.length; i = (i + 1) | 0) {
                    if (UnityEngine.Object.op_Implicit(this.closeButtons[i])) {
                        this.closeButtons[i].onClick.AddListener(Bridge.fn.cacheBind(this, this.Close));
                    }
                }
                if (UnityEngine.Object.op_Implicit(this.sensitivitySlider)) {
                    this.sensitivitySlider.value = this.defaultSensitivity;
                    this.sensitivitySlider.onValueChanged.AddListener(Bridge.fn.cacheBind(this, this.OnSensitivity));
                }
                if (UnityEngine.Object.op_Implicit(this.volumeSlider)) {
                    this.volumeSlider.value = 1.0;
                    this.volumeSlider.onValueChanged.AddListener(Bridge.fn.cacheBind(this, this.OnVolume));
                }
                if (UnityEngine.Object.op_Implicit(this.musicSlider)) {
                    this.musicSlider.value = 1.0;
                    this.musicSlider.onValueChanged.AddListener(Bridge.fn.cacheBind(this, this.OnMusic));
                }
            },
            /*SettingsPanel.Start end.*/

            /*SettingsPanel.Open start.*/
            Open: function () {
if ( TRACE ) { TRACE( "SettingsPanel#Open", this ); }

                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.clickClip)) {
                    this.sfx.PlayOneShot(this.clickClip);
                }
                if (UnityEngine.Object.op_Implicit(this.panel)) {
                    this.panel.SetActive(true);
                }
            },
            /*SettingsPanel.Open end.*/

            /*SettingsPanel.Close start.*/
            Close: function () {
if ( TRACE ) { TRACE( "SettingsPanel#Close", this ); }

                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.clickClip)) {
                    this.sfx.PlayOneShot(this.clickClip);
                }
                if (UnityEngine.Object.op_Implicit(this.panel)) {
                    this.panel.SetActive(false);
                }
            },
            /*SettingsPanel.Close end.*/

            /*SettingsPanel.OnSensitivity start.*/
            OnSensitivity: function (v) {
if ( TRACE ) { TRACE( "SettingsPanel#OnSensitivity", this ); }

                if (UnityEngine.Object.op_Implicit(this.cameraRig)) {
                    this.cameraRig.SensitivityScale = v / UnityEngine.Mathf.Max(1.0, this.defaultSensitivity);
                }
            },
            /*SettingsPanel.OnSensitivity end.*/

            /*SettingsPanel.OnVolume start.*/
            OnVolume: function (v) {
if ( TRACE ) { TRACE( "SettingsPanel#OnVolume", this ); }

                UnityEngine.AudioListener.volume = v;
            },
            /*SettingsPanel.OnVolume end.*/

            /*SettingsPanel.OnMusic start.*/
            OnMusic: function (v) {
if ( TRACE ) { TRACE( "SettingsPanel#OnMusic", this ); }

                for (var i = 0; i < this.musicSources.length; i = (i + 1) | 0) {
                    if (UnityEngine.Component.op_Equality(this.musicSources[i], null)) {
                        continue;
                    }
                    var baseVolume = this.musicBaseVolumes != null && i < this.musicBaseVolumes.length ? this.musicBaseVolumes[i] : 1.0;
                    this.musicSources[i].volume = baseVolume * v;
                }
            },
            /*SettingsPanel.OnMusic end.*/


        }
    });
    /*SettingsPanel end.*/

    /*SkyDome start.*/
    Bridge.define("SkyDome", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            cameraTransform: null
        },
        methods: {
            /*SkyDome.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "SkyDome#LateUpdate", this ); }

                if (UnityEngine.Object.op_Implicit(this.cameraTransform)) {
                    this.transform.position = this.cameraTransform.position.$clone();
                }
            },
            /*SkyDome.LateUpdate end.*/


        }
    });
    /*SkyDome end.*/

    /*StealEggTutorial start.*/
    Bridge.define("StealEggTutorial", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*StealEggTutorial.Show:static start.*/
                Show: function (go, on) {
if ( TRACE ) { TRACE( "StealEggTutorial#Show", this ); }

                    if (UnityEngine.Object.op_Implicit(go) && go.activeSelf !== on) {
                        go.SetActive(on);
                    }
                },
                /*StealEggTutorial.Show:static end.*/


            }
        },
        fields: {
            motor: null,
            cameraRig: null,
            luna: null,
            cameraHint: null,
            cameraHand: null,
            swipeDistance: 0,
            swipeTime: 0,
            cameraText: null,
            turnNeeded: 0,
            moveHint: null,
            moveHand: null,
            moveRadius: 0,
            moveText: null,
            moveNeeded: 0,
            jumpText: null,
            jumpHand: null,
            jumpHandTarget: null,
            title: null,
            runBanner: null,
            stealHand: null,
            stealButton: null,
            stealHandTarget: null,
            movedTime: 0,
            moved: false,
            turned: false,
            jumped: false
        },
        props: {
            Done: {
                get: function () {
if ( TRACE ) { TRACE( "StealEggTutorial#Done#get", this ); }

                    return this.moved && this.turned && this.jumped;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealEggTutorial#init", this ); }

                this.swipeDistance = 160.0;
                this.swipeTime = 1.2;
                this.turnNeeded = 45.0;
                this.moveRadius = 70.0;
                this.moveNeeded = 0.5;
            }
        },
        methods: {
            /*StealEggTutorial.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "StealEggTutorial#Start", this ); }

                this.Refresh();
            },
            /*StealEggTutorial.Start end.*/

            /*StealEggTutorial.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "StealEggTutorial#Update", this ); }

                if (!this.moved && UnityEngine.Object.op_Implicit(this.motor) && this.motor.Speed > 0.1) {
                    this.movedTime += UnityEngine.Time.deltaTime;
                    if (this.movedTime >= this.moveNeeded) {
                        this.moved = true;
                    }
                }
                if (!this.turned && UnityEngine.Object.op_Implicit(this.cameraRig) && this.cameraRig.TurnedDegrees >= this.turnNeeded) {
                    this.turned = true;
                }
                if (!this.jumped && UnityEngine.Object.op_Implicit(this.motor) && this.motor.JumpCount > 0) {
                    this.jumped = true;
                }
                this.Refresh();
            },
            /*StealEggTutorial.Update end.*/

            /*StealEggTutorial.Refresh start.*/
            Refresh: function () {
if ( TRACE ) { TRACE( "StealEggTutorial#Refresh", this ); }

                var step1 = !this.turned, step2 = this.turned && !this.moved, step3 = this.turned && this.moved && !this.jumped;
                StealEggTutorial.Show(this.cameraHint, step1);
                StealEggTutorial.Show(this.cameraText, step1);
                StealEggTutorial.Show(this.moveHint, step2);
                StealEggTutorial.Show(this.moveText, step2);
                StealEggTutorial.Show(this.jumpText, step3);
                if (UnityEngine.Object.op_Implicit(this.jumpHand)) {
                    StealEggTutorial.Show(this.jumpHand.gameObject, step3);
                }

                var t = UnityEngine.Time.time;
                if (step1 && UnityEngine.Object.op_Implicit(this.cameraHand)) {
                    var k = pc.math.smoothstep(0.0, 1.0, UnityEngine.Mathf.PingPong(t / UnityEngine.Mathf.Max(0.1, this.swipeTime) * 2.0, 1.0));
                    this.cameraHand.anchoredPosition = new pc.Vec2( pc.math.lerp(-this.swipeDistance, this.swipeDistance, k), 0 );
                }
                if (step2 && UnityEngine.Object.op_Implicit(this.moveHand)) {
                    this.moveHand.anchoredPosition = new pc.Vec2( Math.sin(t * 2.5), Math.cos(t * 2.5) ).scale( this.moveRadius );
                }

                if (UnityEngine.Object.op_Implicit(this.title) && this.title.gameObject.activeInHierarchy) {
                    this.title.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.1 + 0.1 * Math.sin(t * UnityEngine.Mathf.PI * 2.0)) );
                }
                if (UnityEngine.Object.op_Implicit(this.runBanner) && this.runBanner.gameObject.activeInHierarchy) {
                    this.runBanner.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.0 + 0.06 * Math.sin(t * 10.0)) );
                }
            },
            /*StealEggTutorial.Refresh end.*/

            /*StealEggTutorial.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "StealEggTutorial#LateUpdate", this ); }

                var t = UnityEngine.Time.time;
                this.UpdateJumpHand(t);
                if (UnityEngine.Object.op_Implicit(this.stealHand)) {
                    var show = UnityEngine.Object.op_Implicit(this.stealButton) && this.stealButton.activeInHierarchy;
                    StealEggTutorial.Show(this.stealHand.gameObject, show);
                    if (show && UnityEngine.Object.op_Implicit(this.stealHandTarget)) {
                        // Press: the hand moves in onto the ring, stays, and comes back (position only, no scale)
                        var p = t - Math.floor(t / 1.2) * 1.2;
                        var down = p < 0.2 ? p / 0.2 : p < 0.9 ? 1.0 : p < 1.1 ? 1.0 - (p - 0.9) / 0.2 : 0.0;
                        this.stealHand.position = this.stealHandTarget.position.$clone();
                        this.stealHand.anchoredPosition = this.stealHand.anchoredPosition.$clone().add( new pc.Vec2( 18.0, -22.0 ).scale( (1.0 - down) ) );
                    }
                }
            },
            /*StealEggTutorial.LateUpdate end.*/

            /*StealEggTutorial.UpdateJumpHand start.*/
            UpdateJumpHand: function (t) {
if ( TRACE ) { TRACE( "StealEggTutorial#UpdateJumpHand", this ); }

                if (UnityEngine.Component.op_Equality(this.jumpHand, null) || UnityEngine.Component.op_Equality(this.jumpHandTarget, null) || !this.jumpHand.gameObject.activeSelf) {
                    return;
                }
                var p = t - Math.floor(t / 1.0) * 1.0;
                var down = p < 0.15 ? p / 0.15 : p < 0.45 ? 1.0 : p < 0.6 ? 1.0 - (p - 0.45) / 0.15 : 0.0;
                this.jumpHand.position = this.jumpHandTarget.position.$clone();
                this.jumpHand.anchoredPosition = this.jumpHand.anchoredPosition.$clone().add( new pc.Vec2( 22.0, -26.0 ).scale( (1.0 - down) ) );
            },
            /*StealEggTutorial.UpdateJumpHand end.*/


        }
    });
    /*StealEggTutorial end.*/

    /*StealPrompt start.*/
    Bridge.define("StealPrompt", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IPointerUpHandler,UnityEngine.EventSystems.IPointerExitHandler],
        fields: {
            rect: null,
            canvasRect: null,
            worldCamera: null,
            fill: null,
            worldOffset: null,
            IsHeld: false
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp",
            "OnPointerExit", "UnityEngine$EventSystems$IPointerExitHandler$OnPointerExit"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "StealPrompt#init", this ); }

                this.worldOffset = new UnityEngine.Vector3();
                this.worldOffset = new pc.Vec3( 0, 2.5, 0 );
            }
        },
        methods: {
            /*StealPrompt.Show start.*/
            Show: function (target, progress) {
if ( TRACE ) { TRACE( "StealPrompt#Show", this ); }

                if (!this.gameObject.activeSelf) {
                    this.gameObject.SetActive(true);
                }
                if (UnityEngine.Object.op_Implicit(this.fill)) {
                    this.fill.fillAmount = progress;
                }
                if (UnityEngine.Object.op_Implicit(this.worldCamera) && UnityEngine.Object.op_Implicit(this.canvasRect) && UnityEngine.Object.op_Implicit(this.rect) && UnityEngine.Object.op_Implicit(target)) {
                    var screen = this.worldCamera.WorldToScreenPoint(target.position.$clone().add( this.worldOffset ));
                    var local = { v : new UnityEngine.Vector2() };
                    if (screen.z > 0 && UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.canvasRect, UnityEngine.Vector2.FromVector3(screen), null, local)) {
                        this.rect.anchoredPosition = local.v.$clone();
                    }
                }
            },
            /*StealPrompt.Show end.*/

            /*StealPrompt.Hide start.*/
            Hide: function () {
if ( TRACE ) { TRACE( "StealPrompt#Hide", this ); }

                if (this.gameObject.activeSelf) {
                    this.gameObject.SetActive(false);
                }
            },
            /*StealPrompt.Hide end.*/

            /*StealPrompt.OnPointerDown start.*/
            OnPointerDown: function (eventData) {
if ( TRACE ) { TRACE( "StealPrompt#OnPointerDown", this ); }

                this.IsHeld = true;
            },
            /*StealPrompt.OnPointerDown end.*/

            /*StealPrompt.OnPointerUp start.*/
            OnPointerUp: function (eventData) {
if ( TRACE ) { TRACE( "StealPrompt#OnPointerUp", this ); }

                this.IsHeld = false;
            },
            /*StealPrompt.OnPointerUp end.*/

            /*StealPrompt.OnPointerExit start.*/
            OnPointerExit: function (eventData) {
if ( TRACE ) { TRACE( "StealPrompt#OnPointerExit", this ); }

                this.IsHeld = false;
            },
            /*StealPrompt.OnPointerExit end.*/

            /*StealPrompt.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "StealPrompt#OnDisable", this ); }

                this.IsHeld = false;
            },
            /*StealPrompt.OnDisable end.*/


        }
    });
    /*StealPrompt end.*/

    /*Thief start.*/
    Bridge.define("Thief", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            isPlayer: false,
            game: null,
            animator: null,
            eggsVisual: null,
            audioSource: null,
            deathClips: null,
            knockTime: 0,
            standUpTime: 0,
            carryingFrom: null,
            surviveLeft: 0,
            knocked: false,
            knockTimer: 0,
            standTimer: 0
        },
        props: {
            IsPlayer: {
                get: function () {
if ( TRACE ) { TRACE( "Thief#IsPlayer#get", this ); }

                    return this.isPlayer;
                }
            },
            CarryingFrom: {
                get: function () {
if ( TRACE ) { TRACE( "Thief#CarryingFrom#get", this ); }

                    return this.carryingFrom;
                }
            },
            IsCarrying: {
                get: function () {
if ( TRACE ) { TRACE( "Thief#IsCarrying#get", this ); }

                    return UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null);
                }
            },
            SurviveLeft: {
                get: function () {
if ( TRACE ) { TRACE( "Thief#SurviveLeft#get", this ); }

                    return this.surviveLeft;
                }
            },
            IsKnocked: {
                get: function () {
if ( TRACE ) { TRACE( "Thief#IsKnocked#get", this ); }

                    return this.knocked || this.standTimer > 0;
                }
            },
            CanMove: {
                get: function () {
if ( TRACE ) { TRACE( "Thief#CanMove#get", this ); }

                    return !this.knocked && this.standTimer <= 0;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "Thief#init", this ); }

                this.knockTime = 1.5;
                this.standUpTime = 1.5;
            }
        },
        methods: {
            /*Thief.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "Thief#Start", this ); }

                if (UnityEngine.Object.op_Implicit(this.eggsVisual)) {
                    this.eggsVisual.SetActive(false);
                }
            },
            /*Thief.Start end.*/

            /*Thief.Steal start.*/
            Steal: function (nest) {
if ( TRACE ) { TRACE( "Thief#Steal", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(nest, null) || !nest.CanSteal || UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null) || !this.CanMove) {
                    return;
                }
                nest.TakeEggs();
                nest.reservedBy = null;
                this.carryingFrom = nest;
                this.surviveLeft = UnityEngine.Object.op_Implicit(this.game) ? this.game.SurviveTime : 10.0;
                if (UnityEngine.Object.op_Implicit(this.eggsVisual)) {
                    this.eggsVisual.SetActive(true);
                }
                if (UnityEngine.Object.op_Implicit(this.animator)) {
                    this.animator.SetBool$1("Carry", true);
                }
                if (UnityEngine.Object.op_Implicit(nest.Monster)) {
                    nest.Monster.StartChase(this);
                }
                if (UnityEngine.Object.op_Implicit(this.game)) {
                    this.game.OnSteal(this);
                }
            },
            /*Thief.Steal end.*/

            /*Thief.Caught start.*/
            Caught: function () {
if ( TRACE ) { TRACE( "Thief#Caught", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null)) {
                    this.carryingFrom.ReturnEggs();
                }
                this.carryingFrom = null;
                if (UnityEngine.Object.op_Implicit(this.eggsVisual)) {
                    this.eggsVisual.SetActive(false);
                }
                this.knocked = true;
                this.knockTimer = this.knockTime;
                if (UnityEngine.Object.op_Implicit(this.animator)) {
                    this.animator.SetBool$1("Carry", false);
                    this.animator.SetBool$1("Knocked", true);
                }
                if (UnityEngine.Object.op_Implicit(this.audioSource) && this.deathClips != null && this.deathClips.length > 0) {
                    this.audioSource.PlayOneShot(this.deathClips[UnityEngine.Random.Range(0, this.deathClips.length)]);
                }
                if (UnityEngine.Object.op_Implicit(this.game)) {
                    this.game.OnCaught(this);
                }
            },
            /*Thief.Caught end.*/

            /*Thief.Deliver start.*/
            Deliver: function () {
if ( TRACE ) { TRACE( "Thief#Deliver", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null)) {
                    this.Escape();
                }
            },
            /*Thief.Deliver end.*/

            /*Thief.SetKnockTimes start.*/
            SetKnockTimes: function (lying, standUp) {
if ( TRACE ) { TRACE( "Thief#SetKnockTimes", this ); }

                this.knockTime = lying;
                this.standUpTime = standUp;
            },
            /*Thief.SetKnockTimes end.*/

            /*Thief.SetVisuals start.*/
            SetVisuals: function (newAnimator, newEggsVisual) {
if ( TRACE ) { TRACE( "Thief#SetVisuals", this ); }

                if (UnityEngine.Object.op_Implicit(this.eggsVisual) && UnityEngine.GameObject.op_Inequality(this.eggsVisual, newEggsVisual)) {
                    this.eggsVisual.SetActive(false);
                }
                this.animator = newAnimator;
                this.eggsVisual = newEggsVisual;
                if (UnityEngine.Object.op_Implicit(this.eggsVisual)) {
                    this.eggsVisual.SetActive(UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null));
                }
            },
            /*Thief.SetVisuals end.*/

            /*Thief.ResetState start.*/
            ResetState: function () {
if ( TRACE ) { TRACE( "Thief#ResetState", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null)) {
                    this.carryingFrom.ReturnEggs();
                }
                this.carryingFrom = null;
                this.knocked = false;
                this.knockTimer = 0;
                this.standTimer = 0;
                if (UnityEngine.Object.op_Implicit(this.eggsVisual)) {
                    this.eggsVisual.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.animator)) {
                    this.animator.SetBool$1("Carry", false);
                    this.animator.SetBool$1("Knocked", false);
                }
            },
            /*Thief.ResetState end.*/

            /*Thief.Escape start.*/
            Escape: function () {
if ( TRACE ) { TRACE( "Thief#Escape", this ); }

                var nest = this.carryingFrom;
                this.carryingFrom = null;
                if (UnityEngine.Object.op_Implicit(this.eggsVisual)) {
                    this.eggsVisual.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.animator)) {
                    this.animator.SetBool$1("Carry", false);
                }
                if (UnityEngine.Object.op_Implicit(nest) && UnityEngine.Object.op_Implicit(nest.Monster)) {
                    nest.Monster.GiveUp();
                }
                if (UnityEngine.Object.op_Implicit(this.game)) {
                    this.game.OnEscaped(this);
                }
            },
            /*Thief.Escape end.*/

            /*Thief.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "Thief#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                if (this.knocked) {
                    this.knockTimer -= dt;
                    if (this.knockTimer <= 0) {
                        this.knocked = false;
                        this.standTimer = this.standUpTime;
                        if (UnityEngine.Object.op_Implicit(this.animator)) {
                            this.animator.SetBool$1("Knocked", false);
                        }
                    }
                    return;
                }
                if (this.standTimer > 0) {
                    this.standTimer -= dt;
                    return;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.carryingFrom, null)) {
                    this.surviveLeft -= dt;
                    if (this.surviveLeft <= 0) {
                        this.Escape();
                    }
                }
            },
            /*Thief.Update end.*/


        }
    });
    /*Thief end.*/

    /*ThirdPersonCamera start.*/
    Bridge.define("ThirdPersonCamera", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            cam: null,
            followTarget: null,
            player: null,
            motor: null,
            lookArea: null,
            cameraDistance: 0,
            minDistance: 0,
            cameraRadius: 0,
            cameraReturnSpeed: 0,
            minPitch: 0,
            maxPitch: 0,
            defaultPitch: 0,
            lookSensitivity: null,
            mouseSensitivity: 0,
            autoReturn: false,
            autoReturnDelay: 0,
            autoReturnSpeed: 0,
            yaw: 0,
            pitch: 0,
            currentDistance: 0,
            lastLookTime: 0,
            shakeTime: 0,
            shakeDuration: 0,
            shakeStrength: 0,
            shakeFrequency: 0,
            useStartView: false,
            startYaw: 0,
            startPitch: 0,
            SensitivityScale: 0,
            TurnedDegrees: 0
        },
        props: {
            Yaw: {
                get: function () {
if ( TRACE ) { TRACE( "ThirdPersonCamera#Yaw#get", this ); }

                    return this.yaw;
                }
            },
            Pitch: {
                get: function () {
if ( TRACE ) { TRACE( "ThirdPersonCamera#Pitch#get", this ); }

                    return this.pitch;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "ThirdPersonCamera#init", this ); }

                this.lookSensitivity = new UnityEngine.Vector2();
                this.cameraDistance = 7.0;
                this.minDistance = 1.5;
                this.cameraRadius = 0.2;
                this.cameraReturnSpeed = 12.0;
                this.minPitch = -20.0;
                this.maxPitch = 70.0;
                this.defaultPitch = 12.0;
                this.lookSensitivity = new pc.Vec2( 0.25, 0.15 );
                this.mouseSensitivity = 4.0;
                this.autoReturn = false;
                this.autoReturnDelay = 1.5;
                this.autoReturnSpeed = 1.5;
                this.currentDistance = -1;
                this.shakeFrequency = 25.0;
                this.useStartView = false;
                this.startYaw = 0.0;
                this.startPitch = 12.0;
                this.SensitivityScale = 1.0;
            }
        },
        methods: {
            /*ThirdPersonCamera.Shake start.*/
            Shake: function (strength, duration) {
if ( TRACE ) { TRACE( "ThirdPersonCamera#Shake", this ); }

                this.shakeStrength = strength;
                this.shakeDuration = UnityEngine.Mathf.Max(0.01, duration);
                this.shakeTime = this.shakeDuration;
            },
            /*ThirdPersonCamera.Shake end.*/

            /*ThirdPersonCamera.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "ThirdPersonCamera#Start", this ); }

                this.yaw = this.useStartView ? this.startYaw : (UnityEngine.Object.op_Implicit(this.player) ? this.player.eulerAngles.y : 0);
                this.pitch = this.useStartView ? Math.max(this.minPitch, Math.min(this.startPitch, this.maxPitch)) : this.defaultPitch;
                this.UpdateCamera();
            },
            /*ThirdPersonCamera.Start end.*/

            /*ThirdPersonCamera.SetView start.*/
            SetView: function (newYaw, newPitch) {
if ( TRACE ) { TRACE( "ThirdPersonCamera#SetView", this ); }

                this.yaw = newYaw;
                this.pitch = Math.max(this.minPitch, Math.min(newPitch, this.maxPitch));
                this.lastLookTime = UnityEngine.Time.time;
                this.UpdateCamera();
            },
            /*ThirdPersonCamera.SetView end.*/

            /*ThirdPersonCamera.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "ThirdPersonCamera#LateUpdate", this ); }

                var $t;
                var look = UnityEngine.Object.op_Implicit(this.lookArea) ? this.lookArea.ConsumeDelta() : pc.Vec2.ZERO.clone();
                if (pc.Vec2.equals( look, pc.Vec2.ZERO.clone() ) && UnityEngine.Input.GetMouseButton(1)) {
                    look = new pc.Vec2( UnityEngine.Input.GetAxis("Mouse X"), UnityEngine.Input.GetAxis("Mouse Y") ).scale( this.mouseSensitivity ).scale( 1.0 / ( UnityEngine.Mathf.Max(0.0001, this.lookSensitivity.x) ) );
                }
                if (look.lengthSq() > 0) {
                    this.TurnedDegrees += Math.abs(look.x * this.lookSensitivity.x * this.SensitivityScale) + Math.abs(look.y * this.lookSensitivity.y * this.SensitivityScale);
                    this.yaw = ($t = this.yaw + look.x * this.lookSensitivity.x * this.SensitivityScale + 180.0, $t - Math.floor($t / 360.0) * 360.0) - 180.0;
                    this.pitch = Math.max(this.minPitch, Math.min(this.pitch - look.y * this.lookSensitivity.y * this.SensitivityScale, this.maxPitch));
                    this.lastLookTime = UnityEngine.Time.time;
                } else if (this.autoReturn && UnityEngine.Object.op_Implicit(this.player) && UnityEngine.Object.op_Implicit(this.motor) && this.motor.Speed > 0.1 && UnityEngine.Time.time - this.lastLookTime > this.autoReturnDelay) {
                    // Swing back behind the running player (not when running towards the camera)
                    var s = this.autoReturnSpeed * UnityEngine.Time.deltaTime;
                    var camFwd = new pc.Quat().setFromEulerAngles_Unity( 0, this.yaw, 0 ).transformVector( new pc.Vec3( 0, 0, 1 ) );
                    var facing = (pc.Vec3.projectOnPlane( this.player.forward, pc.Vec3.UP.clone() ).clone().normalize().dot( camFwd ) + 1.0) * 0.5;
                    this.yaw = UnityEngine.Mathf.LerpAngle(this.yaw, this.player.eulerAngles.y, s * facing);
                    this.pitch = pc.math.lerp(this.pitch, this.defaultPitch, s);
                }
                this.UpdateCamera();
            },
            /*ThirdPersonCamera.LateUpdate end.*/

            /*ThirdPersonCamera.UpdateCamera start.*/
            UpdateCamera: function () {
if ( TRACE ) { TRACE( "ThirdPersonCamera#UpdateCamera", this ); }

                if (UnityEngine.Component.op_Equality(this.followTarget, null) || UnityEngine.Component.op_Equality(this.cam, null)) {
                    return;
                }
                var rotation = new pc.Quat().setFromEulerAngles_Unity( this.pitch, this.yaw, 0 );
                var pivot = this.followTarget.position.$clone();
                var back = rotation.transformVector( new pc.Vec3( 0, 0, -1 ) );
                var distance = this.cameraDistance;
                if (this.currentDistance < 0 || distance < this.currentDistance) {
                    this.currentDistance = distance;
                } else {
                    this.currentDistance = UnityEngine.Mathf.MoveTowards(this.currentDistance, distance, this.cameraReturnSpeed * UnityEngine.Time.deltaTime);
                }
                this.cam.position = pivot.$clone().add( back.$clone().clone().scale( this.currentDistance ) );
                this.cam.rotation = rotation.$clone();
                if (this.shakeTime > 0) {
                    this.shakeTime -= UnityEngine.Time.deltaTime;
                    var fade = Math.max(0, Math.min(1, this.shakeTime / this.shakeDuration));
                    // Irregular shake from mixed sines (no PerlinNoise: keep to basic Mathf for Luna)
                    var n = UnityEngine.Time.time * this.shakeFrequency;
                    var x = Math.sin(n * 1.0) * 0.6 + Math.sin(n * 2.3 + 1.7) * 0.4;
                    var y = Math.sin(n * 1.3 + 0.9) * 0.6 + Math.sin(n * 2.9 + 2.3) * 0.4;
                    var offset = new pc.Vec3( x, y, 0 ).clone().scale( this.shakeStrength ).clone().scale( fade ).clone().scale( fade );
                    this.cam.position = this.cam.position.$clone().add( rotation.transformVector( offset ) );
                }
            },
            /*ThirdPersonCamera.UpdateCamera end.*/


        }
    });
    /*ThirdPersonCamera end.*/

    /*TutorialHints start.*/
    Bridge.define("TutorialHints", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*TutorialHints.Show:static start.*/
                Show: function (go, on) {
if ( TRACE ) { TRACE( "TutorialHints#Show", this ); }

                    if (UnityEngine.Object.op_Implicit(go) && go.activeSelf !== on) {
                        go.SetActive(on);
                    }
                },
                /*TutorialHints.Show:static end.*/


            }
        },
        fields: {
            motor: null,
            cameraRig: null,
            player: null,
            moveHint: null,
            moveHand: null,
            moveRadius: 0,
            moveText: null,
            moveNeeded: 0,
            cameraHint: null,
            cameraHand: null,
            swipeDistance: 0,
            cameraText: null,
            turnNeeded: 0,
            goText: null,
            holdHand: null,
            movedTime: 0,
            moved: false,
            turned: false,
            stole: false,
            holdHandStart: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "TutorialHints#init", this ); }

                this.holdHandStart = new UnityEngine.Vector2();
                this.moveRadius = 70.0;
                this.moveNeeded = 0.5;
                this.swipeDistance = 160.0;
                this.turnNeeded = 45.0;
            }
        },
        methods: {
            /*TutorialHints.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "TutorialHints#Start", this ); }

                if (UnityEngine.Object.op_Implicit(this.holdHand)) {
                    this.holdHandStart = this.holdHand.anchoredPosition.$clone();
                }
                this.Refresh();
            },
            /*TutorialHints.Start end.*/

            /*TutorialHints.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "TutorialHints#Update", this ); }

                if (!this.moved && UnityEngine.Object.op_Implicit(this.motor) && this.motor.Speed > 0.1) {
                    this.movedTime += UnityEngine.Time.deltaTime;
                    if (this.movedTime >= this.moveNeeded) {
                        this.moved = true;
                    }
                }
                if (this.moved && !this.turned && UnityEngine.Object.op_Implicit(this.cameraRig) && this.cameraRig.TurnedDegrees >= this.turnNeeded) {
                    this.turned = true;
                }
                if (!this.stole && UnityEngine.Object.op_Implicit(this.player) && this.player.IsCarrying) {
                    this.stole = true;
                }
                this.Refresh();
            },
            /*TutorialHints.Update end.*/

            /*TutorialHints.Refresh start.*/
            Refresh: function () {
if ( TRACE ) { TRACE( "TutorialHints#Refresh", this ); }

                var step1 = !this.moved, step2 = this.moved && !this.turned, step3 = this.moved && this.turned && !this.stole;
                TutorialHints.Show(this.moveHint, step1);
                TutorialHints.Show(this.moveText, step1);
                TutorialHints.Show(this.cameraHint, step2);
                TutorialHints.Show(this.cameraText, step2);
                TutorialHints.Show(this.goText, step3);

                var t = UnityEngine.Time.time;
                if (step1 && UnityEngine.Object.op_Implicit(this.moveHand)) {
                    this.moveHand.anchoredPosition = new pc.Vec2( Math.sin(t * 2.5), Math.cos(t * 2.5) ).scale( this.moveRadius );
                }
                if (step2 && UnityEngine.Object.op_Implicit(this.cameraHand)) {
                    this.cameraHand.anchoredPosition = new pc.Vec2( pc.math.lerp(-this.swipeDistance, this.swipeDistance, UnityEngine.Mathf.PingPong(t * 0.8, 1.0)), 0 );
                }
                if (step3 && UnityEngine.Object.op_Implicit(this.goText)) {
                    this.goText.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.0 + 0.12 * Math.sin(t * 5.0)) );
                }

                if (UnityEngine.Object.op_Implicit(this.holdHand)) {
                    // Press and hold: down, stay, back up (until the first steal)
                    var p = this.stole ? 0.0 : t - Math.floor(t / 1.2) * 1.2;
                    var down = p < 0.2 ? p / 0.2 : p < 0.9 ? 1.0 : p < 1.1 ? 1.0 - (p - 0.9) / 0.2 : 0.0;
                    this.holdHand.anchoredPosition = this.holdHandStart.$clone().add( new pc.Vec2( -6.0, -10.0 ).scale( down ) );
                    this.holdHand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.0 - 0.1 * down) );
                }
            },
            /*TutorialHints.Refresh end.*/


        }
    });
    /*TutorialHints end.*/

    /*UpgradeController start.*/
    Bridge.define("UpgradeController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            game: null,
            motor: null,
            panel: null,
            openButton: null,
            closeButton: null,
            speedButton: null,
            speedTitle: null,
            speedPrice: null,
            jumpButton: null,
            jumpTitle: null,
            jumpPrice: null,
            speedTitleFormat: null,
            jumpTitleFormat: null,
            hudSpeed: null,
            hudJump: null,
            hudFormat: null,
            canUpgradeIcon: null,
            upgradeVfx: null,
            speedMultiply: 0,
            baseSpeedFactor: 0,
            jumpMultiply: 0,
            baseJumpFactor: 0,
            priceMultiply: 0,
            sfx: null,
            buyClip: null,
            errorClip: null,
            clickClip: null,
            speedLevel: 0,
            jumpLevel: 0,
            baseRunSpeed: 0,
            baseJumpImpulse: 0,
            shownCoins: 0
        },
        props: {
            SpeedPrice: {
                get: function () {
if ( TRACE ) { TRACE( "UpgradeController#SpeedPrice#get", this ); }

                    return Bridge.Int.mul(this.speedLevel, this.priceMultiply);
                }
            },
            JumpPrice: {
                get: function () {
if ( TRACE ) { TRACE( "UpgradeController#JumpPrice#get", this ); }

                    return Bridge.Int.mul(this.jumpLevel, this.priceMultiply);
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "UpgradeController#init", this ); }

                this.speedTitleFormat = "Speed:\n<color=#FFE100>Level {0}</color>";
                this.jumpTitleFormat = "Jump height:\n<color=#FFE100>Level: {0}</color>";
                this.hudFormat = "Level {0}";
                this.speedMultiply = 0.4;
                this.baseSpeedFactor = 1.5;
                this.jumpMultiply = 0.4;
                this.baseJumpFactor = 5.0;
                this.priceMultiply = 100;
                this.speedLevel = 1;
                this.jumpLevel = 1;
                this.shownCoins = -1;
            }
        },
        methods: {
            /*UpgradeController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "UpgradeController#Start", this ); }

                this.baseRunSpeed = this.motor.RunSpeed;
                this.baseJumpImpulse = this.motor.JumpImpulse;
                if (UnityEngine.Object.op_Implicit(this.panel)) {
                    this.panel.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.openButton)) {
                    this.openButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.Open));
                }
                if (UnityEngine.Object.op_Implicit(this.closeButton)) {
                    this.closeButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.Close));
                }
                if (UnityEngine.Object.op_Implicit(this.speedButton)) {
                    this.speedButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.BuySpeed));
                }
                if (UnityEngine.Object.op_Implicit(this.jumpButton)) {
                    this.jumpButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.BuyJump));
                }
                if (UnityEngine.Object.op_Implicit(this.upgradeVfx)) {
                    this.upgradeVfx.gameObject.SetActive(true);
                    this.upgradeVfx.Stop();
                }
                this.Apply();
                this.Refresh();
            },
            /*UpgradeController.Start end.*/

            /*UpgradeController.Open start.*/
            Open: function () {
if ( TRACE ) { TRACE( "UpgradeController#Open", this ); }

                this.Play(this.clickClip);
                this.Refresh();
                if (UnityEngine.Object.op_Implicit(this.panel)) {
                    this.panel.SetActive(true);
                }
            },
            /*UpgradeController.Open end.*/

            /*UpgradeController.Close start.*/
            Close: function () {
if ( TRACE ) { TRACE( "UpgradeController#Close", this ); }

                this.Play(this.clickClip);
                if (UnityEngine.Object.op_Implicit(this.panel)) {
                    this.panel.SetActive(false);
                }
            },
            /*UpgradeController.Close end.*/

            /*UpgradeController.BuySpeed start.*/
            BuySpeed: function () {
if ( TRACE ) { TRACE( "UpgradeController#BuySpeed", this ); }

                if (!this.game.TrySpend(this.SpeedPrice)) {
                    this.Play(this.errorClip);
                    return;
                }
                this.speedLevel = (this.speedLevel + 1) | 0;
                this.Bought();
            },
            /*UpgradeController.BuySpeed end.*/

            /*UpgradeController.BuyJump start.*/
            BuyJump: function () {
if ( TRACE ) { TRACE( "UpgradeController#BuyJump", this ); }

                if (!this.game.TrySpend(this.JumpPrice)) {
                    this.Play(this.errorClip);
                    return;
                }
                this.jumpLevel = (this.jumpLevel + 1) | 0;
                this.Bought();
            },
            /*UpgradeController.BuyJump end.*/

            /*UpgradeController.Bought start.*/
            Bought: function () {
if ( TRACE ) { TRACE( "UpgradeController#Bought", this ); }

                this.Play(this.buyClip);
                if (UnityEngine.Object.op_Implicit(this.upgradeVfx)) {
                    this.upgradeVfx.Play();
                }
                this.Apply();
                this.Refresh();
            },
            /*UpgradeController.Bought end.*/

            /*UpgradeController.Apply start.*/
            Apply: function () {
if ( TRACE ) { TRACE( "UpgradeController#Apply", this ); }

                this.motor.RunSpeed = this.baseRunSpeed * (this.baseSpeedFactor + this.speedMultiply * (((this.speedLevel - 1) | 0))) / this.baseSpeedFactor;
                this.motor.JumpImpulse = this.baseJumpImpulse * (this.baseJumpFactor + this.jumpMultiply * (((this.jumpLevel - 1) | 0))) / this.baseJumpFactor;
            },
            /*UpgradeController.Apply end.*/

            /*UpgradeController.Refresh start.*/
            Refresh: function () {
if ( TRACE ) { TRACE( "UpgradeController#Refresh", this ); }

                if (UnityEngine.Object.op_Implicit(this.speedTitle)) {
                    this.speedTitle.text = System.String.format(this.speedTitleFormat, [Bridge.box(this.speedLevel, System.Int32)]);
                }
                if (UnityEngine.Object.op_Implicit(this.jumpTitle)) {
                    this.jumpTitle.text = System.String.format(this.jumpTitleFormat, [Bridge.box(this.jumpLevel, System.Int32)]);
                }
                if (UnityEngine.Object.op_Implicit(this.speedPrice)) {
                    this.speedPrice.text = Bridge.toString(this.SpeedPrice);
                }
                if (UnityEngine.Object.op_Implicit(this.jumpPrice)) {
                    this.jumpPrice.text = Bridge.toString(this.JumpPrice);
                }
                if (UnityEngine.Object.op_Implicit(this.hudSpeed)) {
                    this.hudSpeed.text = System.String.format(this.hudFormat, [Bridge.box(this.speedLevel, System.Int32)]);
                }
                if (UnityEngine.Object.op_Implicit(this.hudJump)) {
                    this.hudJump.text = System.String.format(this.hudFormat, [Bridge.box(this.jumpLevel, System.Int32)]);
                }
                this.shownCoins = this.game.Coins;
                if (UnityEngine.Object.op_Implicit(this.canUpgradeIcon)) {
                    var can = this.game.Coins >= UnityEngine.Mathf.Min(this.SpeedPrice, this.JumpPrice);
                    if (this.canUpgradeIcon.activeSelf !== can) {
                        this.canUpgradeIcon.SetActive(can);
                    }
                }
            },
            /*UpgradeController.Refresh end.*/

            /*UpgradeController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "UpgradeController#Update", this ); }

                if (this.game.Coins !== this.shownCoins) {
                    this.Refresh();
                }
            },
            /*UpgradeController.Update end.*/

            /*UpgradeController.Play start.*/
            Play: function (clip) {
if ( TRACE ) { TRACE( "UpgradeController#Play", this ); }

                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(clip)) {
                    this.sfx.PlayOneShot(clip);
                }
            },
            /*UpgradeController.Play end.*/


        }
    });
    /*UpgradeController end.*/

    /*GameController start.*/
    Bridge.define("GameController", {
        inherits: [ThiefGame],
        fields: {
            luna: null,
            player: null,
            motor: null,
            nest: null,
            spooky: null,
            guide: null,
            stealPrompt: null,
            tutorial: null,
            cameraRig: null,
            caughtShakeStrength: 0,
            caughtShakeTime: 0,
            homeArea: null,
            homeSize: null,
            homeTarget: null,
            homeEggs: null,
            homeNest: null,
            homeEgg: null,
            playerEggItems: null,
            standDistance: 0,
            walkSpeed: 0,
            walkTimeout: 0,
            turnTime: 0,
            placeTime: 0,
            placeArcHeight: 0,
            endUIDelay: 0,
            winConfetti: null,
            deliverCameraPitch: 0,
            deliverCameraSide: 0,
            deliverCameraTurn: 0,
            stealRadius: 0,
            stealHoldTime: 0,
            playerModels: null,
            playerAnimators: null,
            playerEggs: null,
            playerRunAnimAt8: null,
            playerLyingTime: null,
            playerStandUpTime: null,
            spookyModels: null,
            spookyAnimators: null,
            title: null,
            runBanner: null,
            caughtFlash: null,
            caughtFlashAlpha: 0,
            sfx: null,
            stealClip: null,
            winClip: null,
            winWowClip: null,
            caughtClip: null,
            chaseMusic: null,
            phase: 0,
            stealProgress: 0,
            deliverStep: 0,
            deliverTimer: 0,
            turnFrom: null,
            turnTo: null,
            eggFromPos: null,
            eggToPos: null,
            eggToLocal: null,
            eggFromScale: null,
            eggToScale: null,
            eggFromRot: null,
            eggToRot: null,
            flashTime: 0,
            resets: 0,
            goalShown: false
        },
        props: {
            SurviveTime: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#SurviveTime#get", this ); }

                    return 1E+09;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "GameController#init", this ); }

                this.homeSize = new UnityEngine.Vector2();
                this.turnFrom = new UnityEngine.Quaternion();
                this.turnTo = new UnityEngine.Quaternion();
                this.eggFromPos = new UnityEngine.Vector3();
                this.eggToPos = new UnityEngine.Vector3();
                this.eggToLocal = new UnityEngine.Vector3();
                this.eggFromScale = new UnityEngine.Vector3();
                this.eggToScale = new UnityEngine.Vector3();
                this.eggFromRot = new UnityEngine.Quaternion();
                this.eggToRot = new UnityEngine.Quaternion();
                this.caughtShakeStrength = 0.25;
                this.caughtShakeTime = 0.45;
                this.homeSize = new pc.Vec2( 10, 8 );
                this.standDistance = 1.4;
                this.walkSpeed = 6.0;
                this.walkTimeout = 2.5;
                this.turnTime = 0.3;
                this.placeTime = 0.55;
                this.placeArcHeight = 0.8;
                this.endUIDelay = 1.5;
                this.deliverCameraPitch = 32.0;
                this.deliverCameraSide = 55.0;
                this.deliverCameraTurn = 3.0;
                this.stealRadius = 2.5;
                this.stealHoldTime = 1.0;
                this.playerRunAnimAt8 = System.Array.init([1.2, 1.2], System.Single);
                this.playerLyingTime = System.Array.init([1.5, 1.0], System.Single);
                this.playerStandUpTime = System.Array.init([1.5, 0.5], System.Single);
                this.caughtFlashAlpha = 0.55;
                this.phase = GameController.Phase.GoToEgg;
                this.flashTime = -1;
            }
        },
        methods: {
            /*GameController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "GameController#Start", this ); }

                this.ApplyCharacters();
                this.ApplySpeeds();
                if (UnityEngine.Object.op_Implicit(this.homeEggs)) {
                    this.homeEggs.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.caughtFlash)) {
                    this.SetFlash(0);
                }
                this.StartRound();
            },
            /*GameController.Start end.*/

            /*GameController.ApplyCharacters start.*/
            ApplyCharacters: function () {
if ( TRACE ) { TRACE( "GameController#ApplyCharacters", this ); }

                var p = UnityEngine.Object.op_Implicit(this.luna) ? Math.max(0, Math.min(this.luna.TypePlayer, ((this.playerModels.length - 1) | 0))) : 0;
                for (var i = 0; i < this.playerModels.length; i = (i + 1) | 0) {
                    if (UnityEngine.Object.op_Implicit(this.playerModels[i])) {
                        this.playerModels[i].SetActive(i === p);
                    }
                }
                this.player.SetVisuals(this.playerAnimators[p], this.playerEggs[p]);
                if (p < this.playerLyingTime.length && p < this.playerStandUpTime.length) {
                    this.player.SetKnockTimes(this.playerLyingTime[p], this.playerStandUpTime[p]);
                }
                this.motor.SetAnimator(this.playerAnimators[p]);

                var s = UnityEngine.Object.op_Implicit(this.luna) ? Math.max(0, Math.min(this.luna.TypeSpooky, ((this.spookyModels.length - 1) | 0))) : 0;
                for (var i1 = 0; i1 < this.spookyModels.length; i1 = (i1 + 1) | 0) {
                    if (UnityEngine.Object.op_Implicit(this.spookyModels[i1])) {
                        this.spookyModels[i1].SetActive(i1 === s);
                    }
                }
                this.spooky.SetAnimator(this.spookyAnimators[s]);
            },
            /*GameController.ApplyCharacters end.*/

            /*GameController.ApplySpeeds start.*/
            ApplySpeeds: function () {
if ( TRACE ) { TRACE( "GameController#ApplySpeeds", this ); }

                if (UnityEngine.Object.op_Implicit(this.luna) && this.luna.PlayerSpeed > 0) {
                    this.motor.RunSpeed = this.luna.PlayerSpeed;
                }
                if (UnityEngine.Object.op_Implicit(this.luna) && this.luna.SpookySpeed > 0) {
                    this.spooky.ChaseSpeed = this.luna.SpookySpeed;
                    this.spooky.ReturnSpeed = this.luna.SpookySpeed;
                }
                var p = UnityEngine.Object.op_Implicit(this.luna) ? Math.max(0, Math.min(this.luna.TypePlayer, ((this.playerRunAnimAt8.length - 1) | 0))) : 0;
                this.motor.RunAnimSpeed = this.playerRunAnimAt8[p] * UnityEngine.Mathf.Max(1.0, this.motor.RunSpeed / 8.0);
            },
            /*GameController.ApplySpeeds end.*/

            /*GameController.StartRound start.*/
            StartRound: function () {
if ( TRACE ) { TRACE( "GameController#StartRound", this ); }

                this.phase = GameController.Phase.GoToEgg;
                this.stealProgress = 0;
                if (UnityEngine.Object.op_Implicit(this.runBanner)) {
                    this.runBanner.SetActive(false);
                }
                this.goalShown = false;
                if (UnityEngine.Object.op_Implicit(this.title)) {
                    this.title.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.guide)) {
                    this.guide.SetTarget(null);
                }
                this.UpdateGoal();
            },
            /*GameController.StartRound end.*/

            /*GameController.UpdateGoal start.*/
            UpdateGoal: function () {
if ( TRACE ) { TRACE( "GameController#UpdateGoal", this ); }

                if (this.goalShown || (UnityEngine.Object.op_Implicit(this.tutorial) && !this.tutorial.Done)) {
                    return;
                }
                this.goalShown = true;
                if (UnityEngine.Object.op_Implicit(this.title)) {
                    this.title.SetActive(true);
                }
                if (UnityEngine.Object.op_Implicit(this.guide)) {
                    this.guide.SetTarget(this.nest.transform);
                }
            },
            /*GameController.UpdateGoal end.*/

            /*GameController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "GameController#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                switch (this.phase) {
                    case GameController.Phase.GoToEgg: 
                        this.UpdateGoal();
                        this.UpdateSteal(dt);
                        break;
                    case GameController.Phase.Escaping: 
                        if (this.InHome(this.player.transform.position)) {
                            this.Win();
                        }
                        break;
                    case GameController.Phase.Caught: 
                        // Lying, then standing up (Thief knock + stand-up times): play on once the player can move again
                        if (this.player.CanMove) {
                            this.GetUp();
                        }
                        break;
                    case GameController.Phase.Delivering: 
                        this.UpdateDelivery(dt);
                        break;
                }
                if (UnityEngine.Object.op_Implicit(this.chaseMusic)) {
                    var chase = this.phase === GameController.Phase.Escaping;
                    if (chase && !this.chaseMusic.isPlaying) {
                        this.chaseMusic.Play();
                    } else {
                        if (!chase && this.chaseMusic.isPlaying) {
                            this.chaseMusic.Stop();
                        }
                    }
                }
                this.UpdateFlash(dt);
            },
            /*GameController.Update end.*/

            /*GameController.UpdateSteal start.*/
            UpdateSteal: function (dt) {
if ( TRACE ) { TRACE( "GameController#UpdateSteal", this ); }

                var near = false;
                if (!this.player.IsCarrying && this.player.CanMove && this.nest.CanSteal) {
                    var d = this.nest.Position.$clone().sub( this.player.transform.position );
                    d.y = 0;
                    near = d.lengthSq() <= this.stealRadius * this.stealRadius;
                }
                if (!near) {
                    this.stealProgress = 0;
                    if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                        this.stealPrompt.Hide();
                    }
                    return;
                }
                var held = (UnityEngine.Object.op_Implicit(this.stealPrompt) && this.stealPrompt.IsHeld) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.E);
                this.stealProgress = held ? this.stealProgress + dt / UnityEngine.Mathf.Max(0.01, this.stealHoldTime) : 0;
                if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                    this.stealPrompt.Show(this.nest.transform, Math.max(0, Math.min(1, this.stealProgress)));
                }
                if (this.stealProgress >= 1.0) {
                    this.stealProgress = 0;
                    if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                        this.stealPrompt.Hide();
                    }
                    this.player.Steal(this.nest);
                }
            },
            /*GameController.UpdateSteal end.*/

            /*GameController.InHome start.*/
            InHome: function (p) {
if ( TRACE ) { TRACE( "GameController#InHome", this ); }

                if (UnityEngine.Component.op_Equality(this.homeArea, null)) {
                    return false;
                }
                var local = this.homeArea.rotation.clone().invert().transformVector( (p.$clone().sub( this.homeArea.position )) );
                return Math.abs(local.x) <= this.homeSize.x * 0.5 && Math.abs(local.z) <= this.homeSize.y * 0.5;
            },
            /*GameController.InHome end.*/

            /*GameController.OnSteal start.*/
            OnSteal: function (thief) {
if ( TRACE ) { TRACE( "GameController#OnSteal", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(thief, this.player)) {
                    return;
                }
                this.phase = GameController.Phase.Escaping;
                this.stealProgress = 0;
                if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                    this.stealPrompt.Hide();
                }
                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.stealClip)) {
                    this.sfx.PlayOneShot(this.stealClip);
                }
                if (UnityEngine.Object.op_Implicit(this.title)) {
                    this.title.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.runBanner)) {
                    this.runBanner.SetActive(true);
                }
                if (UnityEngine.Object.op_Implicit(this.guide)) {
                    this.guide.SetTarget(this.homeTarget);
                }
                if (UnityEngine.Object.op_Implicit(this.luna)) {
                    this.luna.OnEggStolen();
                }
            },
            /*GameController.OnSteal end.*/

            /*GameController.OnCaught start.*/
            OnCaught: function (thief) {
if ( TRACE ) { TRACE( "GameController#OnCaught", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(thief, this.player) || this.phase !== GameController.Phase.Escaping) {
                    return;
                }
                this.phase = GameController.Phase.Caught;
                if (UnityEngine.Object.op_Implicit(this.runBanner)) {
                    this.runBanner.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.guide)) {
                    this.guide.SetTarget(null);
                }
                this.flashTime = 0;
                if (UnityEngine.Object.op_Implicit(this.cameraRig)) {
                    this.cameraRig.Shake(this.caughtShakeStrength, this.caughtShakeTime);
                }
                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.caughtClip)) {
                    this.sfx.PlayOneShot(this.caughtClip);
                }
            },
            /*GameController.OnCaught end.*/

            /*GameController.OnEscaped start.*/
            OnEscaped: function (thief) {
if ( TRACE ) { TRACE( "GameController#OnEscaped", this ); }
 },
            /*GameController.OnEscaped end.*/

            /*GameController.Win start.*/
            Win: function () {
if ( TRACE ) { TRACE( "GameController#Win", this ); }

                this.phase = GameController.Phase.Delivering;
                this.motor.Frozen = true;
                this.spooky.GiveUp();
                if (UnityEngine.Object.op_Implicit(this.runBanner)) {
                    this.runBanner.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.guide)) {
                    this.guide.SetTarget(null);
                }
                var away = this.player.transform.position.$clone().sub( this.homeNest.position );
                away.y = 0;
                if (away.lengthSq() < 0.01) {
                    away = new pc.Vec3( 0, 0, 1 );
                }
                var stand = this.homeNest.position.$clone().add( away.clone().normalize().$clone().clone().scale( this.standDistance ) );
                stand.y = this.player.transform.position.y;
                this.motor.WalkTo(stand, this.walkSpeed);
                this.deliverStep = 0;
                this.deliverTimer = 0;
            },
            /*GameController.Win end.*/

            /*GameController.UpdateDelivery start.*/
            UpdateDelivery: function (dt) {
if ( TRACE ) { TRACE( "GameController#UpdateDelivery", this ); }

                this.deliverTimer += dt;
                this.TurnCameraToNest(dt);
                switch (this.deliverStep) {
                    case 0:  // walk to the nest
                        if (!this.motor.AutoMoving || this.deliverTimer >= this.walkTimeout) {
                            this.motor.StopWalk();
                            var look = this.homeNest.position.$clone().sub( this.player.transform.position );
                            look.y = 0;
                            this.turnFrom = this.player.transform.rotation.$clone();
                            this.turnTo = look.lengthSq() > 0.0001 ? new pc.Quat().lookRotation( look.clone().normalize(), pc.Vec3.UP.clone() ) : this.turnFrom.$clone();
                            this.NextStep();
                        }
                        break;
                    case 1:  // face the nest
                        {
                            var k = Math.max(0, Math.min(1, this.deliverTimer / UnityEngine.Mathf.Max(0.01, this.turnTime)));
                            this.motor.Teleport(this.player.transform.position, new pc.Quat().slerpUnclamped( this.turnFrom, this.turnTo, pc.math.clamp( pc.math.smoothstep(0.0, 1.0, k), 0, 1 ) ));
                            if (k >= 1.0) {
                                this.StartEggFlight();
                                this.NextStep();
                            }
                            break;
                        }
                    case 2:  // the egg flies from the hands into the nest
                        {
                            var k1 = Math.max(0, Math.min(1, this.deliverTimer / UnityEngine.Mathf.Max(0.01, this.placeTime)));
                            var e = pc.math.smoothstep(0.0, 1.0, k1);
                            var p = new pc.Vec3().lerp( this.eggFromPos, this.eggToPos, e );
                            p.y += this.placeArcHeight * 4.0 * e * (1.0 - e);
                            this.homeEgg.position = p.$clone();
                            this.homeEgg.rotation = new pc.Quat().slerpUnclamped( this.eggFromRot, this.eggToRot, pc.math.clamp( e, 0, 1 ) );
                            this.homeEgg.localScale = new pc.Vec3().lerp( this.eggFromScale, this.eggToScale, e );
                            if (k1 >= 1.0) {
                                this.homeEgg.localPosition = this.eggToLocal.$clone();
                                this.homeEgg.rotation = this.eggToRot.$clone();
                                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.winClip)) {
                                    this.sfx.PlayOneShot(this.winClip);
                                }
                                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.winWowClip)) {
                                    this.sfx.PlayOneShot(this.winWowClip);
                                }
                                if (UnityEngine.Object.op_Implicit(this.winConfetti)) {
                                    this.winConfetti.SetActive(true);
                                }
                                this.NextStep();
                            }
                            break;
                        }
                    case 3:  // landed: a small bounce, then the End UI
                        {
                            var b = Math.max(0, Math.min(1, this.deliverTimer / 0.25));
                            this.homeEgg.localScale = this.eggToScale.$clone().clone().scale( (1.0 + 0.18 * Math.sin(b * UnityEngine.Mathf.PI)) );
                            if (this.deliverTimer >= this.endUIDelay) {
                                this.phase = GameController.Phase.Won;
                                if (UnityEngine.Object.op_Implicit(this.luna)) {
                                    this.luna.ShowEndUI();
                                }
                            }
                            break;
                        }
                }
            },
            /*GameController.UpdateDelivery end.*/

            /*GameController.NextStep start.*/
            NextStep: function () {
if ( TRACE ) { TRACE( "GameController#NextStep", this ); }

                this.deliverStep = (this.deliverStep + 1) | 0;
                this.deliverTimer = 0;
            },
            /*GameController.NextStep end.*/

            /*GameController.StartEggFlight start.*/
            StartEggFlight: function () {
if ( TRACE ) { TRACE( "GameController#StartEggFlight", this ); }

                if (UnityEngine.Object.op_Implicit(this.homeEggs)) {
                    this.homeEggs.SetActive(true);
                }
                this.eggToLocal = this.homeEgg.localPosition.$clone();
                this.eggToPos = this.homeEgg.position.$clone();
                this.eggToRot = this.homeEgg.rotation.$clone();
                this.eggToScale = this.homeEgg.localScale.$clone();
                var p = UnityEngine.Object.op_Implicit(this.luna) ? Math.max(0, Math.min(this.luna.TypePlayer, ((this.playerEggItems.length - 1) | 0))) : 0;
                var held = this.playerEggItems.length > 0 ? this.playerEggItems[p] : null;
                var parentScale = UnityEngine.Object.op_Implicit(this.homeEgg.parent) ? this.homeEgg.parent.lossyScale.$clone() : new pc.Vec3( 1, 1, 1 );
                if (UnityEngine.Object.op_Implicit(held)) {
                    this.eggFromPos = held.position.$clone();
                    this.eggFromRot = held.rotation.$clone();
                    var hs = held.lossyScale.$clone();
                    this.eggFromScale = new pc.Vec3( hs.x / parentScale.x, hs.y / parentScale.y, hs.z / parentScale.z );
                } else {
                    this.eggFromPos = this.eggToPos.$clone().add( pc.Vec3.UP.clone() );
                    this.eggFromRot = this.eggToRot.$clone();
                    this.eggFromScale = this.eggToScale.$clone();
                }
                this.homeEgg.position = this.eggFromPos.$clone();
                this.homeEgg.rotation = this.eggFromRot.$clone();
                this.homeEgg.localScale = this.eggFromScale.$clone();
                this.player.Deliver();
            },
            /*GameController.StartEggFlight end.*/

            /*GameController.TurnCameraToNest start.*/
            TurnCameraToNest: function (dt) {
if ( TRACE ) { TRACE( "GameController#TurnCameraToNest", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.cameraRig, null)) {
                    return;
                }
                var d = this.homeNest.position.$clone().sub( this.player.transform.position );
                d.y = 0;
                if (d.lengthSq() < 0.0001) {
                    return;
                }
                var targetYaw = Math.atan2(d.x, d.z) * UnityEngine.Mathf.Rad2Deg + this.deliverCameraSide;
                var k = 1.0 - UnityEngine.Mathf.Exp(-this.deliverCameraTurn * dt);
                this.cameraRig.SetView(UnityEngine.Mathf.LerpAngle(this.cameraRig.Yaw, targetYaw, k), pc.math.lerp(this.cameraRig.Pitch, this.deliverCameraPitch, k));
            },
            /*GameController.TurnCameraToNest end.*/

            /*GameController.GetUp start.*/
            GetUp: function () {
if ( TRACE ) { TRACE( "GameController#GetUp", this ); }

                this.resets = (this.resets + 1) | 0;
                var limit = UnityEngine.Object.op_Implicit(this.luna) ? this.luna.PlayerResetCount : -1;
                // Over the limit: the End Card shows (transparent, every tap = store); the game itself goes on as usual behind it.
                if (limit >= 0 && this.resets > limit && UnityEngine.Object.op_Implicit(this.luna) && !this.luna.Ended) {
                    this.luna.ShowEndCard();
                }
                this.StartRound();
            },
            /*GameController.GetUp end.*/

            /*GameController.UpdateFlash start.*/
            UpdateFlash: function (dt) {
if ( TRACE ) { TRACE( "GameController#UpdateFlash", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.caughtFlash, null) || this.flashTime < 0) {
                    return;
                }
                this.flashTime += dt;
                var fadeIn = 0.12, fadeOut = 0.6;
                var a = this.flashTime < fadeIn ? this.flashTime / fadeIn : 1.0 - (this.flashTime - fadeIn) / fadeOut;
                if (this.flashTime >= 0.72) {
                    a = 0;
                    this.flashTime = -1;
                }
                this.SetFlash(Math.max(0, Math.min(1, a)) * this.caughtFlashAlpha);
            },
            /*GameController.UpdateFlash end.*/

            /*GameController.SetFlash start.*/
            SetFlash: function (alpha) {
if ( TRACE ) { TRACE( "GameController#SetFlash", this ); }

                var c = this.caughtFlash.color.$clone();
                c.a = alpha;
                this.caughtFlash.color = c.$clone();
                var on = alpha > 0.001;
                if (this.caughtFlash.gameObject.activeSelf !== on) {
                    this.caughtFlash.gameObject.SetActive(on);
                }
            },
            /*GameController.SetFlash end.*/


        }
    });
    /*GameController end.*/

    /*HuntGameController start.*/
    Bridge.define("HuntGameController", {
        inherits: [ThiefGame],
        fields: {
            luna: null,
            player: null,
            nests: null,
            stealPrompt: null,
            guide: null,
            stealRadius: 0,
            stealHoldTime: 0,
            surviveTime: 0,
            reward: 0,
            startCoins: 0,
            coinsText: null,
            runMessage: null,
            runMessageTime: 0,
            timerText: null,
            timerFormat: null,
            rewardPopup: null,
            rewardClose: null,
            rewardDouble: null,
            sfx: null,
            stealClip: null,
            rewardClip: null,
            chaseMusic: null,
            coins: 0,
            shownCoins: 0,
            stealProgress: 0,
            promptNest: null,
            runMessageTimer: 0,
            firstStealDone: false
        },
        props: {
            SurviveTime: {
                get: function () {
if ( TRACE ) { TRACE( "HuntGameController#SurviveTime#get", this ); }

                    return this.surviveTime;
                }
            },
            Coins: {
                get: function () {
if ( TRACE ) { TRACE( "HuntGameController#Coins#get", this ); }

                    return this.coins;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "HuntGameController#init", this ); }

                this.stealRadius = 2.5;
                this.stealHoldTime = 1.0;
                this.surviveTime = 10.0;
                this.reward = 500;
                this.startCoins = 0;
                this.runMessageTime = 2.0;
                this.timerFormat = "Survive: {0}";
                this.runMessageTimer = -1;
            }
        },
        methods: {
            /*HuntGameController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "HuntGameController#Start", this ); }

                this.coins = this.startCoins;
                this.shownCoins = this.coins;
                this.UpdateCoins();
                if (UnityEngine.Object.op_Implicit(this.rewardPopup)) {
                    this.rewardPopup.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.timerText)) {
                    this.timerText.gameObject.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.runMessage)) {
                    this.runMessage.gameObject.SetActive(false);
                }
                if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                    this.stealPrompt.Hide();
                }
                if (UnityEngine.Object.op_Implicit(this.rewardClose)) {
                    this.rewardClose.onClick.AddListener(Bridge.fn.cacheBind(this, this.CloseReward));
                }
                if (UnityEngine.Object.op_Implicit(this.rewardDouble)) {
                    this.rewardDouble.onClick.AddListener(Bridge.fn.cacheBind(this, this.DoubleReward));
                }
                if (UnityEngine.Object.op_Implicit(this.guide)) {
                    this.guide.SetTarget(this.TutorialNest());
                }
            },
            /*HuntGameController.Start end.*/

            /*HuntGameController.TutorialNest start.*/
            TutorialNest: function () {
if ( TRACE ) { TRACE( "HuntGameController#TutorialNest", this ); }

                var best = null;
                var bestD = 3.40282347E+38;
                for (var i = 0; i < this.nests.length; i = (i + 1) | 0) {
                    if (UnityEngine.MonoBehaviour.op_Equality(this.nests[i], null)) {
                        continue;
                    }
                    if (this.nests[i].tutorialNest) {
                        return this.nests[i].transform;
                    }
                    var d = (this.nests[i].Position.$clone().sub( this.player.transform.position )).lengthSq();
                    if (d < bestD) {
                        bestD = d;
                        best = this.nests[i];
                    }
                }
                return UnityEngine.Object.op_Implicit(best) ? best.transform : null;
            },
            /*HuntGameController.TutorialNest end.*/

            /*HuntGameController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "HuntGameController#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                this.UpdateSteal(dt);

                if (UnityEngine.Object.op_Implicit(this.chaseMusic)) {
                    if (this.player.IsCarrying && !this.chaseMusic.isPlaying) {
                        this.chaseMusic.Play();
                    } else {
                        if (!this.player.IsCarrying && this.chaseMusic.isPlaying) {
                            this.chaseMusic.Stop();
                        }
                    }
                }

                if (UnityEngine.Object.op_Implicit(this.timerText)) {
                    var show = this.player.IsCarrying;
                    if (this.timerText.gameObject.activeSelf !== show) {
                        this.timerText.gameObject.SetActive(show);
                    }
                    if (show) {
                        this.timerText.text = System.String.format(this.timerFormat, [Bridge.box(Math.ceil(this.player.SurviveLeft), System.Int32)]);
                    }
                }

                if (this.runMessageTimer >= 0) {
                    this.runMessageTimer -= dt;
                    if (this.runMessageTimer < 0 && UnityEngine.Object.op_Implicit(this.runMessage)) {
                        this.runMessage.SetTrigger$1("Hide");
                    }
                }

                if (Math.abs(this.shownCoins - this.coins) > 0.5) {
                    this.shownCoins = UnityEngine.Mathf.MoveTowards(this.shownCoins, this.coins, UnityEngine.Mathf.Max(50.0, Math.abs(this.coins - this.shownCoins) * 3.0) * dt);
                    this.UpdateCoins();
                }
            },
            /*HuntGameController.Update end.*/

            /*HuntGameController.UpdateSteal start.*/
            UpdateSteal: function (dt) {
if ( TRACE ) { TRACE( "HuntGameController#UpdateSteal", this ); }

                var near = null;
                if (!this.player.IsCarrying && this.player.CanMove) {
                    var best = this.stealRadius * this.stealRadius;
                    for (var i = 0; i < this.nests.length; i = (i + 1) | 0) {
                        var n = this.nests[i];
                        if (UnityEngine.MonoBehaviour.op_Equality(n, null) || !n.CanSteal) {
                            continue;
                        }
                        var d = n.Position.$clone().sub( this.player.transform.position );
                        d.y = 0;
                        if (d.lengthSq() <= best) {
                            best = d.lengthSq();
                            near = n;
                        }
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(near, this.promptNest)) {
                    this.promptNest = near;
                    this.stealProgress = 0;
                }
                if (UnityEngine.MonoBehaviour.op_Equality(near, null)) {
                    if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                        this.stealPrompt.Hide();
                    }
                    return;
                }
                var held = (UnityEngine.Object.op_Implicit(this.stealPrompt) && this.stealPrompt.IsHeld) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.E);
                this.stealProgress = held ? this.stealProgress + dt / UnityEngine.Mathf.Max(0.01, this.stealHoldTime) : 0;
                if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                    this.stealPrompt.Show(near.transform, Math.max(0, Math.min(1, this.stealProgress)));
                }
                if (this.stealProgress >= 1.0) {
                    this.stealProgress = 0;
                    this.promptNest = null;
                    if (UnityEngine.Object.op_Implicit(this.stealPrompt)) {
                        this.stealPrompt.Hide();
                    }
                    this.player.Steal(near);
                }
            },
            /*HuntGameController.UpdateSteal end.*/

            /*HuntGameController.OnSteal start.*/
            OnSteal: function (thief) {
if ( TRACE ) { TRACE( "HuntGameController#OnSteal", this ); }

                if (!thief.IsPlayer) {
                    return;
                }
                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.stealClip)) {
                    this.sfx.PlayOneShot(this.stealClip);
                }
                if (UnityEngine.Object.op_Implicit(this.runMessage)) {
                    this.runMessage.gameObject.SetActive(true);
                    this.runMessage.SetTrigger$1("Show");
                    this.runMessageTimer = this.runMessageTime;
                }
                if (!this.firstStealDone) {
                    this.firstStealDone = true;
                    if (UnityEngine.Object.op_Implicit(this.guide)) {
                        this.guide.SetTarget(null);
                    }
                }
            },
            /*HuntGameController.OnSteal end.*/

            /*HuntGameController.OnCaught start.*/
            OnCaught: function (thief) {
if ( TRACE ) { TRACE( "HuntGameController#OnCaught", this ); }
 },
            /*HuntGameController.OnCaught end.*/

            /*HuntGameController.OnEscaped start.*/
            OnEscaped: function (thief) {
if ( TRACE ) { TRACE( "HuntGameController#OnEscaped", this ); }

                if (!thief.IsPlayer) {
                    return;
                }
                this.AddCoins(this.reward);
                if (UnityEngine.Object.op_Implicit(this.sfx) && UnityEngine.Object.op_Implicit(this.rewardClip)) {
                    this.sfx.PlayOneShot(this.rewardClip);
                }
                if (UnityEngine.Object.op_Implicit(this.rewardPopup)) {
                    this.rewardPopup.SetActive(true);
                }
            },
            /*HuntGameController.OnEscaped end.*/

            /*HuntGameController.AddCoins start.*/
            AddCoins: function (amount) {
if ( TRACE ) { TRACE( "HuntGameController#AddCoins", this ); }

                this.coins = (this.coins + amount) | 0;
            },
            /*HuntGameController.AddCoins end.*/

            /*HuntGameController.TrySpend start.*/
            TrySpend: function (amount) {
if ( TRACE ) { TRACE( "HuntGameController#TrySpend", this ); }

                if (amount > this.coins) {
                    return false;
                }
                this.coins = (this.coins - amount) | 0;
                return true;
            },
            /*HuntGameController.TrySpend end.*/

            /*HuntGameController.UpdateCoins start.*/
            UpdateCoins: function () {
if ( TRACE ) { TRACE( "HuntGameController#UpdateCoins", this ); }

                if (UnityEngine.Object.op_Implicit(this.coinsText)) {
                    this.coinsText.text = Bridge.toString(Math.round(this.shownCoins));
                }
            },
            /*HuntGameController.UpdateCoins end.*/

            /*HuntGameController.CloseReward start.*/
            CloseReward: function () {
if ( TRACE ) { TRACE( "HuntGameController#CloseReward", this ); }

                if (UnityEngine.Object.op_Implicit(this.rewardPopup)) {
                    this.rewardPopup.SetActive(false);
                }
            },
            /*HuntGameController.CloseReward end.*/

            /*HuntGameController.DoubleReward start.*/
            DoubleReward: function () {
if ( TRACE ) { TRACE( "HuntGameController#DoubleReward", this ); }

                this.AddCoins(this.reward);
                this.CloseReward();
            },
            /*HuntGameController.DoubleReward end.*/


        }
    });
    /*HuntGameController end.*/

    if ( MODULE_reflection ) {
    var $m = Bridge.setMetadata,
        $n = ["System","UnityEngine","UnityEngine.UI","System.Collections.Generic","TMPro","System.Collections","UnityEngine.EventSystems"];

    /*BillboardGroup start.*/
    $m("BillboardGroup", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraTransform","t":4,"rt":$n[1].Transform,"sn":"cameraTransform"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"items","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"items"}]}; }, $n);
    /*BillboardGroup end.*/

    /*BotController start.*/
    $m("BotController", function () { return {"nested":[BotController.State],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Animate","t":8,"sn":"Animate","rt":$n[0].Void},{"a":1,"n":"FindFreeNest","t":8,"sn":"FindFreeNest","rt":Nest},{"a":1,"n":"PickWanderPoint","t":8,"sn":"PickWanderPoint","rt":$n[0].Void},{"a":1,"n":"Release","t":8,"sn":"Release","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"agent","t":4,"rt":GridAgent,"sn":"agent"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxRestTime","t":4,"rt":$n[0].Single,"sn":"maxRestTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxSpeed","t":4,"rt":$n[0].Single,"sn":"maxSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxWanderBeforeNest","t":4,"rt":$n[0].Single,"sn":"maxWanderBeforeNest","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minRestTime","t":4,"rt":$n[0].Single,"sn":"minRestTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Source NPC_Chicken values"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minSpeed","t":4,"rt":$n[0].Single,"sn":"minSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minWanderBeforeNest","t":4,"rt":$n[0].Single,"sn":"minWanderBeforeNest","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"nestApproachDistance","t":4,"rt":$n[0].Single,"sn":"nestApproachDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"nests","t":4,"rt":System.Array.type(Nest),"sn":"nests"},{"at":[new UnityEngine.TooltipAttribute("Chance per wander point to rest instead of going on."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"restProbability","t":4,"rt":$n[0].Single,"sn":"restProbability","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Run animation speed at the bot's run speed."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runAnimSpeed","t":4,"rt":$n[0].Single,"sn":"runAnimSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runAwayDistance","t":4,"rt":$n[0].Single,"sn":"runAwayDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"runAwayTimer","t":4,"rt":$n[0].Single,"sn":"runAwayTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runAwayUpdateInterval","t":4,"rt":$n[0].Single,"sn":"runAwayUpdateInterval","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"speed","t":4,"rt":$n[0].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"state","t":4,"rt":BotController.State,"sn":"state","box":function ($v) { return Bridge.box($v, BotController.State, System.Enum.toStringFn(BotController.State));}},{"a":1,"n":"targetNest","t":4,"rt":Nest,"sn":"targetNest"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"thief","t":4,"rt":Thief,"sn":"thief"},{"a":1,"n":"timer","t":4,"rt":$n[0].Single,"sn":"timer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"wanderRadius","t":4,"rt":$n[0].Single,"sn":"wanderRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*BotController end.*/

    /*BotController+State start.*/
    $m("BotController.State", function () { return {"td":BotController,"att":259,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"GoToNest","is":true,"t":4,"rt":BotController.State,"sn":"GoToNest","box":function ($v) { return Bridge.box($v, BotController.State, System.Enum.toStringFn(BotController.State));}},{"a":2,"n":"Rest","is":true,"t":4,"rt":BotController.State,"sn":"Rest","box":function ($v) { return Bridge.box($v, BotController.State, System.Enum.toStringFn(BotController.State));}},{"a":2,"n":"Wander","is":true,"t":4,"rt":BotController.State,"sn":"Wander","box":function ($v) { return Bridge.box($v, BotController.State, System.Enum.toStringFn(BotController.State));}}]}; }, $n);
    /*BotController+State end.*/

    /*GameController start.*/
    $m("GameController", function () { return {"nested":[GameController.Phase],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"ApplyCharacters","t":8,"sn":"ApplyCharacters","rt":$n[0].Void},{"a":1,"n":"ApplySpeeds","t":8,"sn":"ApplySpeeds","rt":$n[0].Void},{"a":1,"n":"GetUp","t":8,"sn":"GetUp","rt":$n[0].Void},{"a":1,"n":"InHome","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"InHome","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"NextStep","t":8,"sn":"NextStep","rt":$n[0].Void},{"ov":true,"a":2,"n":"OnCaught","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnCaught","rt":$n[0].Void,"p":[Thief]},{"ov":true,"a":2,"n":"OnEscaped","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnEscaped","rt":$n[0].Void,"p":[Thief]},{"ov":true,"a":2,"n":"OnSteal","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnSteal","rt":$n[0].Void,"p":[Thief]},{"a":1,"n":"SetFlash","t":8,"pi":[{"n":"alpha","pt":$n[0].Single,"ps":0}],"sn":"SetFlash","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"StartEggFlight","t":8,"sn":"StartEggFlight","rt":$n[0].Void},{"a":1,"n":"StartRound","t":8,"sn":"StartRound","rt":$n[0].Void},{"a":1,"n":"TurnCameraToNest","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"TurnCameraToNest","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateDelivery","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"UpdateDelivery","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"UpdateFlash","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"UpdateFlash","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"UpdateGoal","t":8,"sn":"UpdateGoal","rt":$n[0].Void},{"a":1,"n":"UpdateSteal","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"UpdateSteal","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"Win","t":8,"sn":"Win","rt":$n[0].Void},{"ov":true,"a":2,"n":"SurviveTime","t":16,"rt":$n[0].Single,"g":{"ov":true,"a":2,"n":"get_SurviveTime","t":8,"rt":$n[0].Single,"fg":"SurviveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"SurviveTime"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraRig","t":4,"rt":ThirdPersonCamera,"sn":"cameraRig"},{"at":[new UnityEngine.TooltipAttribute("Played every time the player is caught (\"ugh\")."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"caughtClip","t":4,"rt":$n[1].AudioClip,"sn":"caughtClip"},{"at":[new UnityEngine.TooltipAttribute("Full-screen red image flashed when caught."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"caughtFlash","t":4,"rt":$n[2].Image,"sn":"caughtFlash"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"caughtFlashAlpha","t":4,"rt":$n[0].Single,"sn":"caughtFlashAlpha","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Light camera shake when caught: strength (m) and duration (s)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"caughtShakeStrength","t":4,"rt":$n[0].Single,"sn":"caughtShakeStrength","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"caughtShakeTime","t":4,"rt":$n[0].Single,"sn":"caughtShakeTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"chaseMusic","t":4,"rt":$n[1].AudioSource,"sn":"chaseMusic"},{"at":[new UnityEngine.TooltipAttribute("Camera pitch while the egg is put in."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"deliverCameraPitch","t":4,"rt":$n[0].Single,"sn":"deliverCameraPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Camera yaw from straight behind the player (degrees): from the side, so the nest is not hidden by the body."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"deliverCameraSide","t":4,"rt":$n[0].Single,"sn":"deliverCameraSide","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"deliverCameraTurn","t":4,"rt":$n[0].Single,"sn":"deliverCameraTurn","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"deliverStep","t":4,"rt":$n[0].Int32,"sn":"deliverStep","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"deliverTimer","t":4,"rt":$n[0].Single,"sn":"deliverTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"eggFromPos","t":4,"rt":$n[1].Vector3,"sn":"eggFromPos"},{"a":1,"n":"eggFromRot","t":4,"rt":$n[1].Quaternion,"sn":"eggFromRot"},{"a":1,"n":"eggFromScale","t":4,"rt":$n[1].Vector3,"sn":"eggFromScale"},{"a":1,"n":"eggToLocal","t":4,"rt":$n[1].Vector3,"sn":"eggToLocal"},{"a":1,"n":"eggToPos","t":4,"rt":$n[1].Vector3,"sn":"eggToPos"},{"a":1,"n":"eggToRot","t":4,"rt":$n[1].Quaternion,"sn":"eggToRot"},{"a":1,"n":"eggToScale","t":4,"rt":$n[1].Vector3,"sn":"eggToScale"},{"at":[new UnityEngine.TooltipAttribute("Seconds from the egg landing to the End UI."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"endUIDelay","t":4,"rt":$n[0].Single,"sn":"endUIDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"flashTime","t":4,"rt":$n[0].Single,"sn":"flashTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"goalShown","t":4,"rt":$n[0].Boolean,"sn":"goalShown","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"guide","t":4,"rt":GuideLine,"sn":"guide"},{"at":[new UnityEngine.HeaderAttribute("Places"),new UnityEngine.TooltipAttribute("Home coop area: centre (this transform) and size (x, z) \u2014 carrying the eggs inside it wins."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeArea","t":4,"rt":$n[1].Transform,"sn":"homeArea"},{"at":[new UnityEngine.TooltipAttribute("The egg in the home nest (under homeEggs): flies there from the hands."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeEgg","t":4,"rt":$n[1].Transform,"sn":"homeEgg"},{"at":[new UnityEngine.TooltipAttribute("Eggs shown in the coop once they are brought home."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeEggs","t":4,"rt":$n[1].GameObject,"sn":"homeEggs"},{"at":[new UnityEngine.HeaderAttribute("Putting the egg in the home nest"),new UnityEngine.TooltipAttribute("The home nest (centre)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeNest","t":4,"rt":$n[1].Transform,"sn":"homeNest"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeSize","t":4,"rt":$n[1].Vector2,"sn":"homeSize"},{"at":[new UnityEngine.TooltipAttribute("Where the arrow line leads while running home."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeTarget","t":4,"rt":$n[1].Transform,"sn":"homeTarget"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"luna","t":4,"rt":LunaController,"sn":"luna"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"motor","t":4,"rt":PlayerMotor,"sn":"motor"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"nest","t":4,"rt":Nest,"sn":"nest"},{"a":1,"n":"phase","t":4,"rt":GameController.Phase,"sn":"phase","box":function ($v) { return Bridge.box($v, GameController.Phase, System.Enum.toStringFn(GameController.Phase));}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"placeArcHeight","t":4,"rt":$n[0].Single,"sn":"placeArcHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"placeTime","t":4,"rt":$n[0].Single,"sn":"placeTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"player","t":4,"rt":Thief,"sn":"player"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerAnimators","t":4,"rt":System.Array.type(UnityEngine.Animator),"sn":"playerAnimators"},{"at":[new UnityEngine.TooltipAttribute("The held egg of each player model (the visible baby under its EggsObject): where the flight starts."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerEggItems","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"playerEggItems"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerEggs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"playerEggs"},{"at":[new UnityEngine.TooltipAttribute("Seconds lying down after a catch, per player model."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerLyingTime","t":4,"rt":$n[0].Array.type(System.Single),"sn":"playerLyingTime"},{"at":[new UnityEngine.HeaderAttribute("Characters (Luna TypePlayer / TypeSpooky)"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerModels","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"playerModels"},{"at":[new UnityEngine.TooltipAttribute("Run clip speed of each player model at 8 m/s (scaled with the run speed)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerRunAnimAt8","t":4,"rt":$n[0].Array.type(System.Single),"sn":"playerRunAnimAt8"},{"at":[new UnityEngine.TooltipAttribute("Seconds from standing up starting to control back, per player model (match the StandUp state speed)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerStandUpTime","t":4,"rt":$n[0].Array.type(System.Single),"sn":"playerStandUpTime"},{"a":1,"n":"resets","t":4,"rt":$n[0].Int32,"sn":"resets","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("\"RUN!!\" banner while carrying the eggs."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runBanner","t":4,"rt":$n[1].GameObject,"sn":"runBanner"},{"at":[new UnityEngine.HeaderAttribute("Audio"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"sfx","t":4,"rt":$n[1].AudioSource,"sn":"sfx"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"spooky","t":4,"rt":Monster,"sn":"spooky"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"spookyAnimators","t":4,"rt":System.Array.type(UnityEngine.Animator),"sn":"spookyAnimators"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"spookyModels","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"spookyModels"},{"at":[new UnityEngine.TooltipAttribute("The player stops this far from the nest centre."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"standDistance","t":4,"rt":$n[0].Single,"sn":"standDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealClip","t":4,"rt":$n[1].AudioClip,"sn":"stealClip"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealHoldTime","t":4,"rt":$n[0].Single,"sn":"stealHoldTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"stealProgress","t":4,"rt":$n[0].Single,"sn":"stealProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealPrompt","t":4,"rt":StealPrompt,"sn":"stealPrompt"},{"at":[new UnityEngine.HeaderAttribute("Rules"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealRadius","t":4,"rt":$n[0].Single,"sn":"stealRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("UI"),new UnityEngine.TooltipAttribute("\"Steal an egg\" title (until the eggs are taken)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"title","t":4,"rt":$n[1].GameObject,"sn":"title"},{"a":1,"n":"turnFrom","t":4,"rt":$n[1].Quaternion,"sn":"turnFrom"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"turnTime","t":4,"rt":$n[0].Single,"sn":"turnTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"turnTo","t":4,"rt":$n[1].Quaternion,"sn":"turnTo"},{"at":[new UnityEngine.TooltipAttribute("Start tutorial (turn camera, joystick): the \"Steal an egg\" title and the arrow show once it is done."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"tutorial","t":4,"rt":StealEggTutorial,"sn":"tutorial"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"walkSpeed","t":4,"rt":$n[0].Single,"sn":"walkSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Walking gives up after this long (blocked): the egg is put in from where the player is."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"walkTimeout","t":4,"rt":$n[0].Single,"sn":"walkTimeout","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"winClip","t":4,"rt":$n[1].AudioClip,"sn":"winClip"},{"at":[new UnityEngine.TooltipAttribute("Confetti (particle systems, play on awake) switched on when the egg lands in the home nest."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"winConfetti","t":4,"rt":$n[1].GameObject,"sn":"winConfetti"},{"at":[new UnityEngine.TooltipAttribute("Played with winClip when the egg lands in the home nest (\"wow\")."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"winWowClip","t":4,"rt":$n[1].AudioClip,"sn":"winWowClip"}]}; }, $n);
    /*GameController end.*/

    /*GameController+Phase start.*/
    $m("GameController.Phase", function () { return {"td":GameController,"att":259,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Caught","is":true,"t":4,"rt":GameController.Phase,"sn":"Caught","box":function ($v) { return Bridge.box($v, GameController.Phase, System.Enum.toStringFn(GameController.Phase));}},{"a":2,"n":"Delivering","is":true,"t":4,"rt":GameController.Phase,"sn":"Delivering","box":function ($v) { return Bridge.box($v, GameController.Phase, System.Enum.toStringFn(GameController.Phase));}},{"a":2,"n":"Escaping","is":true,"t":4,"rt":GameController.Phase,"sn":"Escaping","box":function ($v) { return Bridge.box($v, GameController.Phase, System.Enum.toStringFn(GameController.Phase));}},{"a":2,"n":"GoToEgg","is":true,"t":4,"rt":GameController.Phase,"sn":"GoToEgg","box":function ($v) { return Bridge.box($v, GameController.Phase, System.Enum.toStringFn(GameController.Phase));}},{"a":2,"n":"Won","is":true,"t":4,"rt":GameController.Phase,"sn":"Won","box":function ($v) { return Bridge.box($v, GameController.Phase, System.Enum.toStringFn(GameController.Phase));}}]}; }, $n);
    /*GameController+Phase end.*/

    /*GridAgent start.*/
    $m("GridAgent", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Arrived","t":8,"pi":[{"n":"tolerance","pt":$n[0].Single,"ps":0}],"sn":"Arrived","rt":$n[0].Boolean,"p":[$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"FaceTowards","t":8,"pi":[{"n":"point","pt":$n[1].Vector3,"ps":0},{"n":"dt","pt":$n[0].Single,"ps":1}],"sn":"FaceTowards","rt":$n[0].Void,"p":[$n[1].Vector3,$n[0].Single]},{"a":1,"n":"Repath","t":8,"sn":"Repath","rt":$n[0].Void},{"a":2,"n":"SetDestination","t":8,"pi":[{"n":"target","pt":$n[1].Vector3,"ps":0},{"n":"repathNow","pt":$n[0].Boolean,"ps":1}],"sn":"SetDestination","rt":$n[0].Void,"p":[$n[1].Vector3,$n[0].Boolean]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"Stop","t":8,"sn":"Stop","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"CurrentSpeed","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_CurrentSpeed","t":8,"rt":$n[0].Single,"fg":"CurrentSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":1,"n":"set_CurrentSpeed","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"CurrentSpeed"},"fn":"CurrentSpeed"},{"a":2,"n":"Destination","t":16,"rt":$n[1].Vector3,"g":{"a":2,"n":"get_Destination","t":8,"rt":$n[1].Vector3,"fg":"Destination"},"fn":"Destination"},{"a":2,"n":"Grid","t":16,"rt":NavGrid,"g":{"a":2,"n":"get_Grid","t":8,"rt":NavGrid,"fg":"Grid"},"fn":"Grid"},{"a":2,"n":"HasDestination","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_HasDestination","t":8,"rt":$n[0].Boolean,"fg":"HasDestination","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"HasDestination"},{"a":2,"n":"RemainingDistance","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_RemainingDistance","t":8,"rt":$n[0].Single,"fg":"RemainingDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"RemainingDistance"},{"a":2,"n":"Speed","t":4,"rt":$n[0].Single,"sn":"Speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Corner reached at this distance."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cornerTolerance","t":4,"rt":$n[0].Single,"sn":"cornerTolerance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"destination","t":4,"rt":$n[1].Vector3,"sn":"destination"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"grid","t":4,"rt":NavGrid,"sn":"grid"},{"a":1,"n":"hasDestination","t":4,"rt":$n[0].Boolean,"sn":"hasDestination","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"heightFollow","t":4,"rt":$n[0].Single,"sn":"heightFollow","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"index","t":4,"rt":$n[0].Int32,"sn":"index","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"path","t":4,"rt":$n[3].List$1(UnityEngine.Vector3),"sn":"path","ro":true},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"repathInterval","t":4,"rt":$n[0].Single,"sn":"repathInterval","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"repathTimer","t":4,"rt":$n[0].Single,"sn":"repathTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"turnSpeed","t":4,"rt":$n[0].Single,"sn":"turnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"backing":true,"n":"<CurrentSpeed>k__BackingField","t":4,"rt":$n[0].Single,"sn":"CurrentSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*GridAgent end.*/

    /*GuideLine start.*/
    $m("GuideLine", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":2,"n":"SetTarget","t":8,"pi":[{"n":"newTarget","pt":$n[1].Transform,"ps":0}],"sn":"SetTarget","rt":$n[0].Void,"p":[$n[1].Transform]},{"at":[new UnityEngine.TooltipAttribute("Draw target -> player (texture anchored at the target: arrows don't slide)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"drawFromTarget","t":4,"rt":$n[0].Boolean,"sn":"drawFromTarget","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"from","t":4,"rt":$n[1].Transform,"sn":"from"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"heightOffset","t":4,"rt":$n[0].Single,"sn":"heightOffset","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Hide the line when the player is this close to the target."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hideDistance","t":4,"rt":$n[0].Single,"sn":"hideDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"line","t":4,"rt":$n[1].LineRenderer,"sn":"line"},{"a":1,"n":"points","t":4,"rt":System.Array.type(UnityEngine.Vector3),"sn":"points","ro":true},{"a":1,"n":"target","t":4,"rt":$n[1].Transform,"sn":"target"}]}; }, $n);
    /*GuideLine end.*/

    /*HuntGameController start.*/
    $m("HuntGameController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AddCoins","t":8,"pi":[{"n":"amount","pt":$n[0].Int32,"ps":0}],"sn":"AddCoins","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":2,"n":"CloseReward","t":8,"sn":"CloseReward","rt":$n[0].Void},{"a":2,"n":"DoubleReward","t":8,"sn":"DoubleReward","rt":$n[0].Void},{"ov":true,"a":2,"n":"OnCaught","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnCaught","rt":$n[0].Void,"p":[Thief]},{"ov":true,"a":2,"n":"OnEscaped","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnEscaped","rt":$n[0].Void,"p":[Thief]},{"ov":true,"a":2,"n":"OnSteal","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnSteal","rt":$n[0].Void,"p":[Thief]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"TrySpend","t":8,"pi":[{"n":"amount","pt":$n[0].Int32,"ps":0}],"sn":"TrySpend","rt":$n[0].Boolean,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"TutorialNest","t":8,"sn":"TutorialNest","rt":$n[1].Transform},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateCoins","t":8,"sn":"UpdateCoins","rt":$n[0].Void},{"a":1,"n":"UpdateSteal","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"UpdateSteal","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"Coins","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Coins","t":8,"rt":$n[0].Int32,"fg":"Coins","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"Coins"},{"ov":true,"a":2,"n":"SurviveTime","t":16,"rt":$n[0].Single,"g":{"ov":true,"a":2,"n":"get_SurviveTime","t":8,"rt":$n[0].Single,"fg":"SurviveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"SurviveTime"},{"at":[new UnityEngine.TooltipAttribute("Looping chase music (Intense Chase) while the player carries eggs."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"chaseMusic","t":4,"rt":$n[1].AudioSource,"sn":"chaseMusic"},{"a":1,"n":"coins","t":4,"rt":$n[0].Int32,"sn":"coins","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("HUD"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"coinsText","t":4,"rt":$n[4].TMP_Text,"sn":"coinsText"},{"a":1,"n":"firstStealDone","t":4,"rt":$n[0].Boolean,"sn":"firstStealDone","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"guide","t":4,"rt":GuideLine,"sn":"guide"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"luna","t":4,"rt":LunaController,"sn":"luna"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"nests","t":4,"rt":System.Array.type(Nest),"sn":"nests"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"player","t":4,"rt":Thief,"sn":"player"},{"a":1,"n":"promptNest","t":4,"rt":Nest,"sn":"promptNest"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"reward","t":4,"rt":$n[0].Int32,"sn":"reward","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rewardClip","t":4,"rt":$n[1].AudioClip,"sn":"rewardClip"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rewardClose","t":4,"rt":$n[2].Button,"sn":"rewardClose"},{"at":[new UnityEngine.TooltipAttribute("The x2 button (watch-ad button in the source)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rewardDouble","t":4,"rt":$n[2].Button,"sn":"rewardDouble"},{"at":[new UnityEngine.HeaderAttribute("Reward popup (Canvas/RewardX2)"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rewardPopup","t":4,"rt":$n[1].GameObject,"sn":"rewardPopup"},{"at":[new UnityEngine.TooltipAttribute("Canvas/RunMessage (\"It's time to run!\"), Animator with Show/Hide triggers."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runMessage","t":4,"rt":$n[1].Animator,"sn":"runMessage"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runMessageTime","t":4,"rt":$n[0].Single,"sn":"runMessageTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"runMessageTimer","t":4,"rt":$n[0].Single,"sn":"runMessageTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Audio"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"sfx","t":4,"rt":$n[1].AudioSource,"sn":"sfx"},{"a":1,"n":"shownCoins","t":4,"rt":$n[0].Single,"sn":"shownCoins","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"startCoins","t":4,"rt":$n[0].Int32,"sn":"startCoins","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealClip","t":4,"rt":$n[1].AudioClip,"sn":"stealClip"},{"at":[new UnityEngine.TooltipAttribute("Seconds the Steal button must be held to fill the ring."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealHoldTime","t":4,"rt":$n[0].Single,"sn":"stealHoldTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"stealProgress","t":4,"rt":$n[0].Single,"sn":"stealProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealPrompt","t":4,"rt":StealPrompt,"sn":"stealPrompt"},{"at":[new UnityEngine.HeaderAttribute("Rules"),new UnityEngine.TooltipAttribute("Distance from the nest at which stealing starts."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealRadius","t":4,"rt":$n[0].Single,"sn":"stealRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Run timer after stealing (survive it to keep the eggs)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"surviveTime","t":4,"rt":$n[0].Single,"sn":"surviveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"timerFormat","t":4,"rt":$n[0].String,"sn":"timerFormat"},{"at":[new UnityEngine.TooltipAttribute("Canvas/TimerSurvival."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"timerText","t":4,"rt":$n[4].TMP_Text,"sn":"timerText"}]}; }, $n);
    /*HuntGameController end.*/

    /*Monster start.*/
    $m("Monster", function () { return {"nested":[Monster.State],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"GiveUp","t":8,"sn":"GiveUp","rt":$n[0].Void},{"a":1,"n":"GoHome","t":8,"sn":"GoHome","rt":$n[0].Void},{"a":2,"n":"ResetToNest","t":8,"pi":[{"n":"position","pt":$n[1].Vector3,"ps":0},{"n":"rotation","pt":$n[1].Quaternion,"ps":1}],"sn":"ResetToNest","rt":$n[0].Void,"p":[$n[1].Vector3,$n[1].Quaternion]},{"a":2,"n":"SetAnimator","t":8,"pi":[{"n":"newAnimator","pt":$n[1].Animator,"ps":0}],"sn":"SetAnimator","rt":$n[0].Void,"p":[$n[1].Animator]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"StartChase","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"StartChase","rt":$n[0].Void,"p":[Thief]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"ChaseSpeed","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_ChaseSpeed","t":8,"rt":$n[0].Single,"fg":"ChaseSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":2,"n":"set_ChaseSpeed","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"ChaseSpeed"},"fn":"ChaseSpeed"},{"a":2,"n":"IsChasing","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsChasing","t":8,"rt":$n[0].Boolean,"fg":"IsChasing","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsChasing"},{"a":2,"n":"IsHome","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsHome","t":8,"rt":$n[0].Boolean,"fg":"IsHome","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsHome"},{"a":2,"n":"ReturnSpeed","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_ReturnSpeed","t":8,"rt":$n[0].Single,"fg":"ReturnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":2,"n":"set_ReturnSpeed","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"ReturnSpeed"},"fn":"ReturnSpeed"},{"a":2,"n":"Target","t":16,"rt":Thief,"g":{"a":2,"n":"get_Target","t":8,"rt":Thief,"fg":"Target"},"fn":"Target"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"agent","t":4,"rt":GridAgent,"sn":"agent"},{"at":[new UnityEngine.TooltipAttribute("Source RandomAudioPlayer: one of these every minDelay..maxDelay seconds."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"ambientClips","t":4,"rt":System.Array.type(UnityEngine.AudioClip),"sn":"ambientClips"},{"a":1,"n":"ambientEndTime","t":4,"rt":$n[0].Single,"sn":"ambientEndTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.RangeAttribute(0.0, 1.0)],"a":1,"n":"ambientVolume","t":4,"rt":$n[0].Single,"sn":"ambientVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Source StartAgry: the monster shows the \"!\" and waits this long before it starts chasing."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"angerDelay","t":4,"rt":$n[0].Single,"sn":"angerDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"angerTimer","t":4,"rt":$n[0].Single,"sn":"angerTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"angryClips","t":4,"rt":System.Array.type(UnityEngine.AudioClip),"sn":"angryClips"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"audioSource","t":4,"rt":$n[1].AudioSource,"sn":"audioSource"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"catchDistance","t":4,"rt":$n[0].Single,"sn":"catchDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Source defaultSpeed 6 x (1 + speedMultiply 0.2)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"chaseSpeed","t":4,"rt":$n[0].Single,"sn":"chaseSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"exclamation","t":4,"rt":$n[1].GameObject,"sn":"exclamation"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hearDistance","t":4,"rt":$n[0].Single,"sn":"hearDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Home = within this distance of the nest (eggs can only be stolen then)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"homeRadius","t":4,"rt":$n[0].Single,"sn":"homeRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Ambient sounds only when the player is this close (2D audio in Luna)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"listener","t":4,"rt":$n[1].Transform,"sn":"listener"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxIdleTime","t":4,"rt":$n[0].Single,"sn":"maxIdleTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxSoundDelay","t":4,"rt":$n[0].Single,"sn":"maxSoundDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxWalkTime","t":4,"rt":$n[0].Single,"sn":"maxWalkTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Source Chicken values"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minIdleTime","t":4,"rt":$n[0].Single,"sn":"minIdleTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Pause between two ambient sounds (counted from the END of the previous one)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minSoundDelay","t":4,"rt":$n[0].Single,"sn":"minSoundDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minWalkTime","t":4,"rt":$n[0].Single,"sn":"minWalkTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"nest","t":4,"rt":Nest,"sn":"nest"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"returnSpeed","t":4,"rt":$n[0].Single,"sn":"returnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"soundTimer","t":4,"rt":$n[0].Single,"sn":"soundTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"state","t":4,"rt":Monster.State,"sn":"state","box":function ($v) { return Bridge.box($v, Monster.State, System.Enum.toStringFn(Monster.State));}},{"a":1,"n":"target","t":4,"rt":Thief,"sn":"target"},{"a":1,"n":"timer","t":4,"rt":$n[0].Single,"sn":"timer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"walkSpeed","t":4,"rt":$n[0].Single,"sn":"walkSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"wanderRadius","t":4,"rt":$n[0].Single,"sn":"wanderRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*Monster end.*/

    /*Monster+State start.*/
    $m("Monster.State", function () { return {"td":Monster,"att":259,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Chase","is":true,"t":4,"rt":Monster.State,"sn":"Chase","box":function ($v) { return Bridge.box($v, Monster.State, System.Enum.toStringFn(Monster.State));}},{"a":2,"n":"Idle","is":true,"t":4,"rt":Monster.State,"sn":"Idle","box":function ($v) { return Bridge.box($v, Monster.State, System.Enum.toStringFn(Monster.State));}},{"a":2,"n":"Return","is":true,"t":4,"rt":Monster.State,"sn":"Return","box":function ($v) { return Bridge.box($v, Monster.State, System.Enum.toStringFn(Monster.State));}},{"a":2,"n":"Wander","is":true,"t":4,"rt":Monster.State,"sn":"Wander","box":function ($v) { return Bridge.box($v, Monster.State, System.Enum.toStringFn(Monster.State));}}]}; }, $n);
    /*Monster+State end.*/

    /*NavGrid start.*/
    $m("NavGrid", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"CellX","t":8,"pi":[{"n":"x","pt":$n[0].Single,"ps":0}],"sn":"CellX","rt":$n[0].Int32,"p":[$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"CellZ","t":8,"pi":[{"n":"z","pt":$n[0].Single,"ps":0}],"sn":"CellZ","rt":$n[0].Int32,"p":[$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Center","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"Center","rt":$n[1].Vector3,"p":[$n[0].Int32]},{"a":2,"n":"ClosestWalkable","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0},{"n":"radiusCells","pt":$n[0].Int32,"ps":1}],"sn":"ClosestWalkable","rt":$n[1].Vector3,"p":[$n[1].Vector3,$n[0].Int32]},{"a":2,"n":"FindPath","t":8,"pi":[{"n":"from","pt":$n[1].Vector3,"ps":0},{"n":"to","pt":$n[1].Vector3,"ps":1},{"n":"path","pt":$n[3].List$1(UnityEngine.Vector3),"ps":2}],"sn":"FindPath","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3,$n[3].List$1(UnityEngine.Vector3)],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"H","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0},{"n":"b","pt":$n[0].Int32,"ps":1}],"sn":"H","rt":$n[0].Single,"p":[$n[0].Int32,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Height","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"Height","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"HeightAt","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"HeightAt","rt":$n[0].Single,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Inside","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"z","pt":$n[0].Int32,"ps":1}],"sn":"Inside","rt":$n[0].Boolean,"p":[$n[0].Int32,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"IsWalkable","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"IsWalkable","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"LineWalkable","t":8,"pi":[{"n":"a","pt":$n[1].Vector3,"ps":0},{"n":"b","pt":$n[1].Vector3,"ps":1}],"sn":"LineWalkable","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"NearestWalkable","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"z","pt":$n[0].Int32,"ps":1},{"n":"radius","pt":$n[0].Int32,"ps":2}],"sn":"NearestWalkable","rt":$n[0].Int32,"p":[$n[0].Int32,$n[0].Int32,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Pop","t":8,"sn":"Pop","rt":$n[0].Int32,"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Push","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0},{"n":"f","pt":$n[0].Single,"ps":1}],"sn":"Push","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Single]},{"a":2,"n":"RandomPointNear","t":8,"pi":[{"n":"center","pt":$n[1].Vector3,"ps":0},{"n":"radius","pt":$n[0].Single,"ps":1}],"sn":"RandomPointNear","rt":$n[1].Vector3,"p":[$n[1].Vector3,$n[0].Single]},{"a":1,"n":"Walk","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"z","pt":$n[0].Int32,"ps":1}],"sn":"Walk","rt":$n[0].Boolean,"p":[$n[0].Int32,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Ready","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Ready","t":8,"rt":$n[0].Boolean,"fg":"Ready","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Ready"},{"a":1,"n":"DX","is":true,"t":4,"rt":$n[0].Array.type(System.Int32),"sn":"DX","ro":true},{"a":1,"n":"DZ","is":true,"t":4,"rt":$n[0].Array.type(System.Int32),"sn":"DZ","ro":true},{"a":1,"n":"cell","t":4,"rt":$n[0].Single,"sn":"cell","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"cellPath","t":4,"rt":$n[3].List$1(System.Int32),"sn":"cellPath","ro":true},{"a":1,"n":"closed","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"closed"},{"a":1,"n":"count","t":4,"rt":$n[0].Int32,"sn":"count","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"data","t":4,"rt":NavGridData,"sn":"data"},{"a":1,"n":"g","t":4,"rt":$n[0].Array.type(System.Single),"sn":"g"},{"a":1,"n":"heap","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"heap"},{"a":1,"n":"heapCount","t":4,"rt":$n[0].Int32,"sn":"heapCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"heapF","t":4,"rt":$n[0].Array.type(System.Single),"sn":"heapF"},{"at":[new UnityEngine.TooltipAttribute("A* gives up after this many expanded cells and returns the path to the closest cell reached."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxExpanded","t":4,"rt":$n[0].Int32,"sn":"maxExpanded","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"origin","t":4,"rt":$n[1].Vector3,"sn":"origin"},{"a":1,"n":"parent","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"parent"},{"a":1,"n":"seen","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"seen"},{"a":1,"n":"sizeX","t":4,"rt":$n[0].Int32,"sn":"sizeX","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"sizeZ","t":4,"rt":$n[0].Int32,"sn":"sizeZ","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"stamp","t":4,"rt":$n[0].Int32,"sn":"stamp","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*NavGrid end.*/

    /*NavGridData start.*/
    $m("NavGridData", function () { return {"att":1048577,"a":2,"at":[Bridge.apply(new UnityEngine.CreateAssetMenuAttribute(), {
        menuName: "STSM/Nav Grid Data"
    } )],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"cellSize","t":4,"rt":$n[0].Single,"sn":"cellSize","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"heightStep","t":4,"rt":$n[0].Single,"sn":"heightStep","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"heights","t":4,"rt":$n[0].Array.type(System.Byte),"sn":"heights"},{"a":2,"n":"minHeight","t":4,"rt":$n[0].Single,"sn":"minHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"origin","t":4,"rt":$n[1].Vector3,"sn":"origin"},{"a":2,"n":"sizeX","t":4,"rt":$n[0].Int32,"sn":"sizeX","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"sizeZ","t":4,"rt":$n[0].Int32,"sn":"sizeZ","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"walkable","t":4,"rt":$n[0].Array.type(System.Byte),"sn":"walkable"}]}; }, $n);
    /*NavGridData end.*/

    /*Nest start.*/
    $m("Nest", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"OnMonsterHome","t":8,"sn":"OnMonsterHome","rt":$n[0].Void},{"a":2,"n":"ReturnEggs","t":8,"sn":"ReturnEggs","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"TakeEggs","t":8,"sn":"TakeEggs","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"CanSteal","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_CanSteal","t":8,"rt":$n[0].Boolean,"fg":"CanSteal","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanSteal"},{"a":2,"n":"HasEggs","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_HasEggs","t":8,"rt":$n[0].Boolean,"fg":"HasEggs","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"HasEggs"},{"a":2,"n":"Monster","t":16,"rt":Monster,"g":{"a":2,"n":"get_Monster","t":8,"rt":Monster,"fg":"Monster"},"fn":"Monster"},{"a":2,"n":"Position","t":16,"rt":$n[1].Vector3,"g":{"a":2,"n":"get_Position","t":8,"rt":$n[1].Vector3,"fg":"Position"},"fn":"Position"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"eggs","t":4,"rt":$n[1].GameObject,"sn":"eggs"},{"a":1,"n":"hasEggs","t":4,"rt":$n[0].Boolean,"sn":"hasEggs","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"monster","t":4,"rt":Monster,"sn":"monster"},{"at":[new UnityEngine.TooltipAttribute("Eggs reappear this long after the monster is back home (after a theft)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"refillDelay","t":4,"rt":$n[0].Single,"sn":"refillDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"refillTimer","t":4,"rt":$n[0].Single,"sn":"refillTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"reservedBy","t":4,"rt":Thief,"sn":"reservedBy"},{"at":[new UnityEngine.TooltipAttribute("Source Nest.tutorialNest: the guide line leads here first.")],"a":2,"n":"tutorialNest","t":4,"rt":$n[0].Boolean,"sn":"tutorialNest","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*Nest end.*/

    /*PlayerMotor start.*/
    $m("PlayerMotor", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"ClipByWalls","t":8,"pi":[{"n":"step","pt":$n[1].Vector3,"ps":0}],"sn":"ClipByWalls","rt":$n[1].Vector3,"p":[$n[1].Vector3]},{"a":1,"n":"Flat","is":true,"t":8,"pi":[{"n":"v","pt":$n[1].Vector3,"ps":0}],"sn":"Flat","rt":$n[1].Vector3,"p":[$n[1].Vector3]},{"a":2,"n":"Jump","t":8,"sn":"Jump","rt":$n[0].Void},{"a":1,"n":"ReadMoveInput","t":8,"sn":"ReadMoveInput","rt":$n[1].Vector2},{"a":2,"n":"SetAnimator","t":8,"pi":[{"n":"newAnimator","pt":$n[1].Animator,"ps":0}],"sn":"SetAnimator","rt":$n[0].Void,"p":[$n[1].Animator]},{"a":1,"n":"StepUp","t":8,"pi":[{"n":"step","pt":$n[1].Vector3,"ps":0}],"sn":"StepUp","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"StopWalk","t":8,"sn":"StopWalk","rt":$n[0].Void},{"a":2,"n":"Teleport","t":8,"pi":[{"n":"position","pt":$n[1].Vector3,"ps":0},{"n":"rotation","pt":$n[1].Quaternion,"ps":1}],"sn":"Teleport","rt":$n[0].Void,"p":[$n[1].Vector3,$n[1].Quaternion]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateFootsteps","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"UpdateFootsteps","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"WalkTo","t":8,"pi":[{"n":"point","pt":$n[1].Vector3,"ps":0},{"n":"speed","pt":$n[0].Single,"ps":1}],"sn":"WalkTo","rt":$n[0].Void,"p":[$n[1].Vector3,$n[0].Single]},{"a":2,"n":"AutoMoving","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_AutoMoving","t":8,"rt":$n[0].Boolean,"fg":"AutoMoving","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"AutoMoving"},{"a":1,"n":"InputEnabled","t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_InputEnabled","t":8,"rt":$n[0].Boolean,"fg":"InputEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"InputEnabled"},{"a":2,"n":"IsGrounded","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsGrounded","t":8,"rt":$n[0].Boolean,"fg":"IsGrounded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsGrounded"},{"a":2,"n":"JumpCount","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_JumpCount","t":8,"rt":$n[0].Int32,"fg":"JumpCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_JumpCount","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"JumpCount"},"fn":"JumpCount"},{"a":2,"n":"JumpImpulse","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_JumpImpulse","t":8,"rt":$n[0].Single,"fg":"JumpImpulse","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":2,"n":"set_JumpImpulse","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"JumpImpulse"},"fn":"JumpImpulse"},{"a":2,"n":"RunAnimSpeed","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_RunAnimSpeed","t":8,"rt":$n[0].Single,"fg":"RunAnimSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":2,"n":"set_RunAnimSpeed","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"RunAnimSpeed"},"fn":"RunAnimSpeed"},{"a":2,"n":"RunSpeed","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_RunSpeed","t":8,"rt":$n[0].Single,"fg":"RunSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":2,"n":"set_RunSpeed","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"RunSpeed"},"fn":"RunSpeed"},{"a":2,"n":"Speed","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Speed","t":8,"rt":$n[0].Single,"fg":"Speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Speed"},{"a":2,"n":"Frozen","t":4,"rt":$n[0].Boolean,"sn":"Frozen","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"audioSource","t":4,"rt":$n[1].AudioSource,"sn":"audioSource"},{"a":1,"n":"autoMove","t":4,"rt":$n[0].Boolean,"sn":"autoMove","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"autoSpeed","t":4,"rt":$n[0].Single,"sn":"autoSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"autoTarget","t":4,"rt":$n[1].Vector3,"sn":"autoTarget"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraTransform","t":4,"rt":$n[1].Transform,"sn":"cameraTransform"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"controller","t":4,"rt":$n[1].CharacterController,"sn":"controller"},{"at":[new UnityEngine.HeaderAttribute("Footsteps"),new UnityEngine.TooltipAttribute("One of these (random, not the same twice) per step while running on the ground."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"footstepClips","t":4,"rt":System.Array.type(UnityEngine.AudioClip),"sn":"footstepClips"},{"at":[new UnityEngine.TooltipAttribute("Seconds between steps at full run speed (slower running = longer)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"footstepInterval","t":4,"rt":$n[0].Single,"sn":"footstepInterval","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Random pitch +- this per step."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"footstepPitchJitter","t":4,"rt":$n[0].Single,"sn":"footstepPitchJitter","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Separate source for the steps (its pitch is varied), so the jump sound keeps its pitch."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"footstepSource","t":4,"rt":$n[1].AudioSource,"sn":"footstepSource"},{"a":1,"n":"footstepTimer","t":4,"rt":$n[0].Single,"sn":"footstepTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.RangeAttribute(0.0, 1.0)],"a":1,"n":"footstepVolume","t":4,"rt":$n[0].Single,"sn":"footstepVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Source WorldCharacteristic.WORLD_GRAVITY."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"gravity","t":4,"rt":$n[0].Single,"sn":"gravity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"grounded","t":4,"rt":$n[0].Boolean,"sn":"grounded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"horizontalVelocity","t":4,"rt":$n[1].Vector3,"sn":"horizontalVelocity"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"joystick","t":4,"rt":PlayableJoystick,"sn":"joystick"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpClip","t":4,"rt":$n[1].AudioClip,"sn":"jumpClip"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpImpulse","t":4,"rt":$n[0].Single,"sn":"jumpImpulse","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"jumpQueued","t":4,"rt":$n[0].Boolean,"sn":"jumpQueued","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.TooltipAttribute("Below this height the player is put back at the respawn point (source TriggerDeath + TeleportToSpawn)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"killHeight","t":4,"rt":$n[0].Single,"sn":"killHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"lastFootstep","t":4,"rt":$n[0].Int32,"sn":"lastFootstep","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"respawnPoint","t":4,"rt":$n[1].Transform,"sn":"respawnPoint"},{"at":[new UnityEngine.TooltipAttribute("Degrees per second the run direction swings round to the input direction."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rotationRate","t":4,"rt":$n[0].Single,"sn":"rotationRate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Run animation speed at full run speed (Running clip played faster/slower)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runAnimSpeed","t":4,"rt":$n[0].Single,"sn":"runAnimSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"runDirection","t":4,"rt":$n[1].Vector3,"sn":"runDirection"},{"at":[new UnityEngine.HeaderAttribute("Movement"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runSpeed","t":4,"rt":$n[0].Single,"sn":"runSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Highest step climbed when walking (Luna ignores CharacterController.stepOffset)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stepHeight","t":4,"rt":$n[0].Single,"sn":"stepHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"thief","t":4,"rt":Thief,"sn":"thief"},{"a":1,"n":"verticalSpeed","t":4,"rt":$n[0].Single,"sn":"verticalSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"wallHeights","t":4,"rt":$n[0].Array.type(System.Single),"sn":"wallHeights","ro":true},{"at":[new UnityEngine.TooltipAttribute("Hits with a normal steeper than this (normal.y below it) count as walls."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"wallNormalY","t":4,"rt":$n[0].Single,"sn":"wallNormalY","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"backing":true,"n":"<JumpCount>k__BackingField","t":4,"rt":$n[0].Int32,"sn":"JumpCount","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*PlayerMotor end.*/

    /*SkyDome start.*/
    $m("SkyDome", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraTransform","t":4,"rt":$n[1].Transform,"sn":"cameraTransform"}]}; }, $n);
    /*SkyDome end.*/

    /*Thief start.*/
    $m("Thief", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Caught","t":8,"sn":"Caught","rt":$n[0].Void},{"a":2,"n":"Deliver","t":8,"sn":"Deliver","rt":$n[0].Void},{"a":1,"n":"Escape","t":8,"sn":"Escape","rt":$n[0].Void},{"a":2,"n":"ResetState","t":8,"sn":"ResetState","rt":$n[0].Void},{"a":2,"n":"SetKnockTimes","t":8,"pi":[{"n":"lying","pt":$n[0].Single,"ps":0},{"n":"standUp","pt":$n[0].Single,"ps":1}],"sn":"SetKnockTimes","rt":$n[0].Void,"p":[$n[0].Single,$n[0].Single]},{"a":2,"n":"SetVisuals","t":8,"pi":[{"n":"newAnimator","pt":$n[1].Animator,"ps":0},{"n":"newEggsVisual","pt":$n[1].GameObject,"ps":1}],"sn":"SetVisuals","rt":$n[0].Void,"p":[$n[1].Animator,$n[1].GameObject]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"Steal","t":8,"pi":[{"n":"nest","pt":Nest,"ps":0}],"sn":"Steal","rt":$n[0].Void,"p":[Nest]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"CanMove","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_CanMove","t":8,"rt":$n[0].Boolean,"fg":"CanMove","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanMove"},{"a":2,"n":"CarryingFrom","t":16,"rt":Nest,"g":{"a":2,"n":"get_CarryingFrom","t":8,"rt":Nest,"fg":"CarryingFrom"},"fn":"CarryingFrom"},{"a":2,"n":"IsCarrying","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsCarrying","t":8,"rt":$n[0].Boolean,"fg":"IsCarrying","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsCarrying"},{"a":2,"n":"IsKnocked","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsKnocked","t":8,"rt":$n[0].Boolean,"fg":"IsKnocked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsKnocked"},{"a":2,"n":"IsPlayer","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsPlayer","t":8,"rt":$n[0].Boolean,"fg":"IsPlayer","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsPlayer"},{"a":2,"n":"SurviveLeft","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_SurviveLeft","t":8,"rt":$n[0].Single,"fg":"SurviveLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"SurviveLeft"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"audioSource","t":4,"rt":$n[1].AudioSource,"sn":"audioSource"},{"a":1,"n":"carryingFrom","t":4,"rt":Nest,"sn":"carryingFrom"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"deathClips","t":4,"rt":System.Array.type(UnityEngine.AudioClip),"sn":"deathClips"},{"at":[new UnityEngine.TooltipAttribute("The eggs held in front of the chest (source EggsObject)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"eggsVisual","t":4,"rt":$n[1].GameObject,"sn":"eggsVisual"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"game","t":4,"rt":ThiefGame,"sn":"game"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"isPlayer","t":4,"rt":$n[0].Boolean,"sn":"isPlayer","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"knockTime","t":4,"rt":$n[0].Single,"sn":"knockTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"knockTimer","t":4,"rt":$n[0].Single,"sn":"knockTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"knocked","t":4,"rt":$n[0].Boolean,"sn":"knocked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"standTimer","t":4,"rt":$n[0].Single,"sn":"standTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Control comes back this long after standing up starts: source BackStandUp event OnStandingUpAnimationEnded at 3.00 s, clip speed 2."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"standUpTime","t":4,"rt":$n[0].Single,"sn":"standUpTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"surviveLeft","t":4,"rt":$n[0].Single,"sn":"surviveLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*Thief end.*/

    /*ThiefGame start.*/
    $m("ThiefGame", function () { return {"att":1048705,"a":2,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ab":true,"a":2,"n":"OnCaught","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnCaught","rt":$n[0].Void,"p":[Thief]},{"ab":true,"a":2,"n":"OnEscaped","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnEscaped","rt":$n[0].Void,"p":[Thief]},{"ab":true,"a":2,"n":"OnSteal","t":8,"pi":[{"n":"thief","pt":Thief,"ps":0}],"sn":"OnSteal","rt":$n[0].Void,"p":[Thief]},{"ab":true,"a":2,"n":"SurviveTime","t":16,"rt":$n[0].Single,"g":{"ab":true,"a":2,"n":"get_SurviveTime","t":8,"rt":$n[0].Single,"fg":"SurviveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"SurviveTime"},{"a":1,"backing":true,"n":"<SurviveTime>k__BackingField","t":4,"rt":$n[0].Single,"sn":"SurviveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*ThiefGame end.*/

    /*ThirdPersonCamera start.*/
    $m("ThirdPersonCamera", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":2,"n":"SetView","t":8,"pi":[{"n":"newYaw","pt":$n[0].Single,"ps":0},{"n":"newPitch","pt":$n[0].Single,"ps":1}],"sn":"SetView","rt":$n[0].Void,"p":[$n[0].Single,$n[0].Single]},{"a":2,"n":"Shake","t":8,"pi":[{"n":"strength","pt":$n[0].Single,"ps":0},{"n":"duration","pt":$n[0].Single,"ps":1}],"sn":"Shake","rt":$n[0].Void,"p":[$n[0].Single,$n[0].Single]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"UpdateCamera","t":8,"sn":"UpdateCamera","rt":$n[0].Void},{"a":2,"n":"Pitch","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Pitch","t":8,"rt":$n[0].Single,"fg":"Pitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Pitch"},{"a":2,"n":"TurnedDegrees","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_TurnedDegrees","t":8,"rt":$n[0].Single,"fg":"TurnedDegrees","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":1,"n":"set_TurnedDegrees","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"TurnedDegrees"},"fn":"TurnedDegrees"},{"a":2,"n":"Yaw","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Yaw","t":8,"rt":$n[0].Single,"fg":"Yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Yaw"},{"a":2,"n":"SensitivityScale","t":4,"rt":$n[0].Single,"sn":"SensitivityScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Swing the camera back behind the running player. Off: the camera turns only when the player drags."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"autoReturn","t":4,"rt":$n[0].Boolean,"sn":"autoReturn","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"autoReturnDelay","t":4,"rt":$n[0].Single,"sn":"autoReturnDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"autoReturnSpeed","t":4,"rt":$n[0].Single,"sn":"autoReturnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cam","t":4,"rt":$n[1].Transform,"sn":"cam"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraDistance","t":4,"rt":$n[0].Single,"sn":"cameraDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraRadius","t":4,"rt":$n[0].Single,"sn":"cameraRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraReturnSpeed","t":4,"rt":$n[0].Single,"sn":"cameraReturnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"currentDistance","t":4,"rt":$n[0].Single,"sn":"currentDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"defaultPitch","t":4,"rt":$n[0].Single,"sn":"defaultPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Player/Center (source FixCameraPoint)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"followTarget","t":4,"rt":$n[1].Transform,"sn":"followTarget"},{"a":1,"n":"lastLookTime","t":4,"rt":$n[0].Single,"sn":"lastLookTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"lookArea","t":4,"rt":ScreenDeltaInputSystem,"sn":"lookArea"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"lookSensitivity","t":4,"rt":$n[1].Vector2,"sn":"lookSensitivity"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxPitch","t":4,"rt":$n[0].Single,"sn":"maxPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minDistance","t":4,"rt":$n[0].Single,"sn":"minDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minPitch","t":4,"rt":$n[0].Single,"sn":"minPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"motor","t":4,"rt":PlayerMotor,"sn":"motor"},{"at":[new UnityEngine.TooltipAttribute("Degrees per pixel for the right mouse button drag."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"mouseSensitivity","t":4,"rt":$n[0].Single,"sn":"mouseSensitivity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"pitch","t":4,"rt":$n[0].Single,"sn":"pitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"player","t":4,"rt":$n[1].Transform,"sn":"player"},{"a":1,"n":"shakeDuration","t":4,"rt":$n[0].Single,"sn":"shakeDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Shake"),new UnityEngine.TooltipAttribute("Shakes per second (smooth noise)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"shakeFrequency","t":4,"rt":$n[0].Single,"sn":"shakeFrequency","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"shakeStrength","t":4,"rt":$n[0].Single,"sn":"shakeStrength","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"shakeTime","t":4,"rt":$n[0].Single,"sn":"shakeTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"startPitch","t":4,"rt":$n[0].Single,"sn":"startPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"startYaw","t":4,"rt":$n[0].Single,"sn":"startYaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Start view"),new UnityEngine.TooltipAttribute("Start with startYaw / startPitch instead of behind the player (player yaw, defaultPitch)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"useStartView","t":4,"rt":$n[0].Boolean,"sn":"useStartView","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"yaw","t":4,"rt":$n[0].Single,"sn":"yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"backing":true,"n":"<TurnedDegrees>k__BackingField","t":4,"rt":$n[0].Single,"sn":"TurnedDegrees","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*ThirdPersonCamera end.*/

    /*UpgradeController start.*/
    $m("UpgradeController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Apply","t":8,"sn":"Apply","rt":$n[0].Void},{"a":1,"n":"Bought","t":8,"sn":"Bought","rt":$n[0].Void},{"a":1,"n":"BuyJump","t":8,"sn":"BuyJump","rt":$n[0].Void},{"a":1,"n":"BuySpeed","t":8,"sn":"BuySpeed","rt":$n[0].Void},{"a":2,"n":"Close","t":8,"sn":"Close","rt":$n[0].Void},{"a":2,"n":"Open","t":8,"sn":"Open","rt":$n[0].Void},{"a":1,"n":"Play","t":8,"pi":[{"n":"clip","pt":$n[1].AudioClip,"ps":0}],"sn":"Play","rt":$n[0].Void,"p":[$n[1].AudioClip]},{"a":1,"n":"Refresh","t":8,"sn":"Refresh","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"JumpPrice","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_JumpPrice","t":8,"rt":$n[0].Int32,"fg":"JumpPrice","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"JumpPrice"},{"a":1,"n":"SpeedPrice","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_SpeedPrice","t":8,"rt":$n[0].Int32,"fg":"SpeedPrice","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"SpeedPrice"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"baseJumpFactor","t":4,"rt":$n[0].Single,"sn":"baseJumpFactor","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"baseJumpImpulse","t":4,"rt":$n[0].Single,"sn":"baseJumpImpulse","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"baseRunSpeed","t":4,"rt":$n[0].Single,"sn":"baseRunSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"baseSpeedFactor","t":4,"rt":$n[0].Single,"sn":"baseSpeedFactor","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"buyClip","t":4,"rt":$n[1].AudioClip,"sn":"buyClip"},{"at":[new UnityEngine.TooltipAttribute("The red \"!\" on the Upgrade button: shown when an upgrade can be paid."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"canUpgradeIcon","t":4,"rt":$n[1].GameObject,"sn":"canUpgradeIcon"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"clickClip","t":4,"rt":$n[1].AudioClip,"sn":"clickClip"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"closeButton","t":4,"rt":$n[2].Button,"sn":"closeButton"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"errorClip","t":4,"rt":$n[1].AudioClip,"sn":"errorClip"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"game","t":4,"rt":HuntGameController,"sn":"game"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hudFormat","t":4,"rt":$n[0].String,"sn":"hudFormat"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hudJump","t":4,"rt":$n[4].TMP_Text,"sn":"hudJump"},{"at":[new UnityEngine.HeaderAttribute("HUD"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hudSpeed","t":4,"rt":$n[4].TMP_Text,"sn":"hudSpeed"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpButton","t":4,"rt":$n[2].Button,"sn":"jumpButton"},{"a":1,"n":"jumpLevel","t":4,"rt":$n[0].Int32,"sn":"jumpLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpMultiply","t":4,"rt":$n[0].Single,"sn":"jumpMultiply","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpPrice","t":4,"rt":$n[4].TMP_Text,"sn":"jumpPrice"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpTitle","t":4,"rt":$n[4].TMP_Text,"sn":"jumpTitle"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpTitleFormat","t":4,"rt":$n[0].String,"sn":"jumpTitleFormat"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"motor","t":4,"rt":PlayerMotor,"sn":"motor"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"openButton","t":4,"rt":$n[2].Button,"sn":"openButton"},{"at":[new UnityEngine.HeaderAttribute("Popup"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"panel","t":4,"rt":$n[1].GameObject,"sn":"panel"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"priceMultiply","t":4,"rt":$n[0].Int32,"sn":"priceMultiply","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Audio"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"sfx","t":4,"rt":$n[1].AudioSource,"sn":"sfx"},{"a":1,"n":"shownCoins","t":4,"rt":$n[0].Int32,"sn":"shownCoins","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Rows"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"speedButton","t":4,"rt":$n[2].Button,"sn":"speedButton"},{"a":1,"n":"speedLevel","t":4,"rt":$n[0].Int32,"sn":"speedLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Source UpgradeManager values"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"speedMultiply","t":4,"rt":$n[0].Single,"sn":"speedMultiply","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"speedPrice","t":4,"rt":$n[4].TMP_Text,"sn":"speedPrice"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"speedTitle","t":4,"rt":$n[4].TMP_Text,"sn":"speedTitle"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"speedTitleFormat","t":4,"rt":$n[0].String,"sn":"speedTitleFormat"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"upgradeVfx","t":4,"rt":$n[1].ParticleSystem,"sn":"upgradeVfx"}]}; }, $n);
    /*UpgradeController end.*/

    /*LunaController start.*/
    $m("LunaController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ClickCTA","t":8,"sn":"ClickCTA","rt":$n[0].Void},{"a":1,"n":"EndAfterTime","t":8,"sn":"EndAfterTime","rt":$n[5].IEnumerator},{"a":2,"n":"FirstClick","t":8,"sn":"FirstClick","rt":$n[0].Void},{"a":1,"n":"GoToStore","t":8,"sn":"GoToStore","rt":$n[0].Void},{"a":2,"n":"OnEggStolen","t":8,"sn":"OnEggStolen","rt":$n[0].Void},{"a":1,"n":"SendGameEnded","t":8,"sn":"SendGameEnded","rt":$n[0].Void},{"a":2,"n":"ShowEndCard","t":8,"sn":"ShowEndCard","rt":$n[0].Void},{"a":2,"n":"ShowEndUI","t":8,"sn":"ShowEndUI","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"Ended","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Ended","t":8,"rt":$n[0].Boolean,"fg":"Ended","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Ended"},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("BGM", 0, null)],"a":2,"n":"BGM","t":4,"rt":$n[1].AudioClip,"sn":"BGM"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"CTA","t":4,"rt":$n[3].List$1(UnityEngine.UI.Button),"sn":"CTA"},{"at":[new UnityEngine.TooltipAttribute("0 = play the whole game; 1 = the first click anywhere goes to the store (end card at once); 2 = going to the store as soon as the egg is stolen."),new UnityEngine.LunaPlaygroundFieldAttribute("CTA Mode: 0 Play all, 1 First click, 2 After steal", -1, null, false, null)],"a":2,"n":"CtaMode","t":4,"rt":$n[0].Int32,"sn":"CtaMode","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Limit Time Play?", -1, null, false, null)],"a":2,"n":"LimitTimePlay","t":4,"rt":$n[0].Boolean,"sn":"LimitTimePlay","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.TooltipAttribute("How many times the player may be caught and start over; the next catch shows the end card. -1 = unlimited."),new UnityEngine.LunaPlaygroundFieldAttribute("Player Reset Count", -1, null, false, null)],"a":2,"n":"PlayerResetCount","t":4,"rt":$n[0].Int32,"sn":"PlayerResetCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("Player run speed (0 = keep the scene value)."),new UnityEngine.LunaPlaygroundFieldAttribute("Player Speed", -1, null, false, null)],"a":2,"n":"PlayerSpeed","t":4,"rt":$n[0].Single,"sn":"PlayerSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Spooky chase speed (0 = keep the scene value)."),new UnityEngine.LunaPlaygroundFieldAttribute("Spooky Speed", -1, null, false, null)],"a":2,"n":"SpookySpeed","t":4,"rt":$n[0].Single,"sn":"SpookySpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Time Play", -1, null, false, null)],"a":2,"n":"TimePlay","t":4,"rt":$n[0].Single,"sn":"TimePlay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Steal Egg scene: 0 = human (game player), 1 = gugugaga."),new UnityEngine.LunaPlaygroundFieldAttribute("Type Player: 0 Human, 1 Gugugaga", -1, null, false, null)],"a":2,"n":"TypePlayer","t":4,"rt":$n[0].Int32,"sn":"TypePlayer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("Steal Egg scene: which Spooky guards the egg (0..8)."),new UnityEngine.LunaPlaygroundFieldAttribute("Type Spooky: 0 -> 8", -1, null, false, null)],"a":2,"n":"TypeSpooky","t":4,"rt":$n[0].Int32,"sn":"TypeSpooky","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("End Card: the PLAY NOW button."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"endCard","t":4,"rt":$n[1].GameObject,"sn":"endCard"},{"at":[new UnityEngine.TooltipAttribute("End UI: the end display (background, title). Shown with the End Card when the game ends."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"endUI","t":4,"rt":$n[1].GameObject,"sn":"endUI"},{"a":1,"n":"ended","t":4,"rt":$n[0].Boolean,"sn":"ended","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.TooltipAttribute("Full-screen invisible click catcher on top of the UI, active only in CTA Mode 1."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"firstClickZone","t":4,"rt":$n[1].GameObject,"sn":"firstClickZone"},{"a":1,"n":"gameEndedSent","t":4,"rt":$n[0].Boolean,"sn":"gameEndedSent","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicSource","t":4,"rt":$n[1].AudioSource,"sn":"musicSource"},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.RangeAttribute(0.0, 1.0)],"a":1,"n":"musicVolume","t":4,"rt":$n[0].Single,"sn":"musicVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*LunaController end.*/

    /*FirstClickCta start.*/
    $m("FirstClickCta", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"OnPointerClick","t":8,"pi":[{"n":"eventData","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerClick","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"eventData","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"luna","t":4,"rt":LunaController,"sn":"luna"}]}; }, $n);
    /*FirstClickCta end.*/

    /*JumpButton start.*/
    $m("JumpButton", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"eventData","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"motor","t":4,"rt":PlayerMotor,"sn":"motor"}]}; }, $n);
    /*JumpButton end.*/

    /*PlayableJoystick start.*/
    $m("PlayableJoystick", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"ResetInput","t":8,"sn":"ResetInput","rt":$n[0].Void},{"a":2,"n":"Value","t":16,"rt":$n[1].Vector2,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[1].Vector2,"fg":"Value"},"s":{"a":1,"n":"set_Value","t":8,"p":[$n[1].Vector2],"rt":$n[0].Void,"fs":"Value"},"fn":"Value"},{"at":[new UnityEngine.TooltipAttribute("This touch area (the object this script is on)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"area","t":4,"rt":$n[1].RectTransform,"sn":"area"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"background","t":4,"rt":$n[1].RectTransform,"sn":"background"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"deadZone","t":4,"rt":$n[0].Single,"sn":"deadZone","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Off: fixed joystick (ring stays in place). On: the ring jumps to the touch point while held."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"floating","t":4,"rt":$n[0].Boolean,"sn":"floating","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"handleRange","t":4,"rt":$n[0].Single,"sn":"handleRange","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"initialBackgroundPosition","t":4,"rt":$n[1].Vector2,"sn":"initialBackgroundPosition"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"knob","t":4,"rt":$n[1].RectTransform,"sn":"knob"},{"a":1,"n":"pointerId","t":4,"rt":$n[0].Int32,"sn":"pointerId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"backing":true,"n":"<Value>k__BackingField","t":4,"rt":$n[1].Vector2,"sn":"Value"}]}; }, $n);
    /*PlayableJoystick end.*/

    /*PulseScale start.*/
    $m("PulseScale", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"baseScale","t":4,"rt":$n[1].Vector3,"sn":"baseScale"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"maxScale","t":4,"rt":$n[0].Single,"sn":"maxScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"minScale","t":4,"rt":$n[0].Single,"sn":"minScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Seconds for one small -> big -> small cycle."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"period","t":4,"rt":$n[0].Single,"sn":"period","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"startTime","t":4,"rt":$n[0].Single,"sn":"startTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*PulseScale end.*/

    /*ScreenDeltaInputSystem start.*/
    $m("ScreenDeltaInputSystem", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ConsumeDelta","t":8,"sn":"ConsumeDelta","rt":$n[1].Vector2},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":1,"n":"delta","t":4,"rt":$n[1].Vector2,"sn":"delta"},{"a":1,"n":"pointerId","t":4,"rt":$n[0].Int32,"sn":"pointerId","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*ScreenDeltaInputSystem end.*/

    /*SettingsPanel start.*/
    $m("SettingsPanel", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Close","t":8,"sn":"Close","rt":$n[0].Void},{"a":1,"n":"OnMusic","t":8,"pi":[{"n":"v","pt":$n[0].Single,"ps":0}],"sn":"OnMusic","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"OnSensitivity","t":8,"pi":[{"n":"v","pt":$n[0].Single,"ps":0}],"sn":"OnSensitivity","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"OnVolume","t":8,"pi":[{"n":"v","pt":$n[0].Single,"ps":0}],"sn":"OnVolume","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"Open","t":8,"sn":"Open","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraRig","t":4,"rt":ThirdPersonCamera,"sn":"cameraRig"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"clickClip","t":4,"rt":$n[1].AudioClip,"sn":"clickClip"},{"at":[new UnityEngine.TooltipAttribute("The X button and the dark full-screen background."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"closeButtons","t":4,"rt":System.Array.type(UnityEngine.UI.Button),"sn":"closeButtons"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"defaultSensitivity","t":4,"rt":$n[0].Single,"sn":"defaultSensitivity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicBaseVolumes","t":4,"rt":$n[0].Array.type(System.Single),"sn":"musicBaseVolumes"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicSlider","t":4,"rt":$n[2].Slider,"sn":"musicSlider"},{"at":[new UnityEngine.TooltipAttribute("Music sources (BGM, chase music) and their volume at Music volume = 1."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicSources","t":4,"rt":System.Array.type(UnityEngine.AudioSource),"sn":"musicSources"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"openButton","t":4,"rt":$n[2].Button,"sn":"openButton"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"panel","t":4,"rt":$n[1].GameObject,"sn":"panel"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"sensitivitySlider","t":4,"rt":$n[2].Slider,"sn":"sensitivitySlider"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"sfx","t":4,"rt":$n[1].AudioSource,"sn":"sfx"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"volumeSlider","t":4,"rt":$n[2].Slider,"sn":"volumeSlider"}]}; }, $n);
    /*SettingsPanel end.*/

    /*StealEggTutorial start.*/
    $m("StealEggTutorial", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"Refresh","t":8,"sn":"Refresh","rt":$n[0].Void},{"a":1,"n":"Show","is":true,"t":8,"pi":[{"n":"go","pt":$n[1].GameObject,"ps":0},{"n":"on","pt":$n[0].Boolean,"ps":1}],"sn":"Show","rt":$n[0].Void,"p":[$n[1].GameObject,$n[0].Boolean]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateJumpHand","t":8,"pi":[{"n":"t","pt":$n[0].Single,"ps":0}],"sn":"UpdateJumpHand","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"Done","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Done","t":8,"rt":$n[0].Boolean,"fg":"Done","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Done"},{"at":[new UnityEngine.TooltipAttribute("Hand under cameraHint: swipes left and right."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraHand","t":4,"rt":$n[1].RectTransform,"sn":"cameraHand"},{"at":[new UnityEngine.HeaderAttribute("Step 1: turn the camera"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraHint","t":4,"rt":$n[1].GameObject,"sn":"cameraHint"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraRig","t":4,"rt":ThirdPersonCamera,"sn":"cameraRig"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraText","t":4,"rt":$n[1].GameObject,"sn":"cameraText"},{"at":[new UnityEngine.TooltipAttribute("Hand pressing the Jump button (a Canvas object, raycast off); its fingertip goes to jumpHandTarget."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpHand","t":4,"rt":$n[1].RectTransform,"sn":"jumpHand"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpHandTarget","t":4,"rt":$n[1].RectTransform,"sn":"jumpHandTarget"},{"at":[new UnityEngine.HeaderAttribute("Step 3: jump"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"jumpText","t":4,"rt":$n[1].GameObject,"sn":"jumpText"},{"a":1,"n":"jumped","t":4,"rt":$n[0].Boolean,"sn":"jumped","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.TooltipAttribute("Once the game has ended (End Card shown) all hints are hidden."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"luna","t":4,"rt":LunaController,"sn":"luna"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"motor","t":4,"rt":PlayerMotor,"sn":"motor"},{"at":[new UnityEngine.TooltipAttribute("Hand under moveHint: its fingertip circles at this radius (the joystick ring)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveHand","t":4,"rt":$n[1].RectTransform,"sn":"moveHand"},{"at":[new UnityEngine.HeaderAttribute("Step 2: joystick"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveHint","t":4,"rt":$n[1].GameObject,"sn":"moveHint"},{"at":[new UnityEngine.TooltipAttribute("Seconds of running needed to count as moved."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveNeeded","t":4,"rt":$n[0].Single,"sn":"moveNeeded","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveRadius","t":4,"rt":$n[0].Single,"sn":"moveRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveText","t":4,"rt":$n[1].GameObject,"sn":"moveText"},{"a":1,"n":"moved","t":4,"rt":$n[0].Boolean,"sn":"moved","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"movedTime","t":4,"rt":$n[0].Single,"sn":"movedTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"runBanner","t":4,"rt":$n[1].Transform,"sn":"runBanner"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealButton","t":4,"rt":$n[1].GameObject,"sn":"stealButton"},{"at":[new UnityEngine.TooltipAttribute("Hand pressing the Steal button: a separate Canvas object (not scaled by the button pulse); its fingertip follows stealHandTarget while the button shows."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealHand","t":4,"rt":$n[1].RectTransform,"sn":"stealHand"},{"at":[new UnityEngine.TooltipAttribute("Point of the button the fingertip presses (the ring icon)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stealHandTarget","t":4,"rt":$n[1].RectTransform,"sn":"stealHandTarget"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"swipeDistance","t":4,"rt":$n[0].Single,"sn":"swipeDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"swipeTime","t":4,"rt":$n[0].Single,"sn":"swipeTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Pulses"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"title","t":4,"rt":$n[1].Transform,"sn":"title"},{"at":[new UnityEngine.TooltipAttribute("Degrees of camera turn needed."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"turnNeeded","t":4,"rt":$n[0].Single,"sn":"turnNeeded","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"turned","t":4,"rt":$n[0].Boolean,"sn":"turned","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*StealEggTutorial end.*/

    /*StealPrompt start.*/
    $m("StealPrompt", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Hide","t":8,"sn":"Hide","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"eventData","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerExit","t":8,"pi":[{"n":"eventData","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerExit","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"eventData","pt":$n[6].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[6].PointerEventData]},{"a":2,"n":"Show","t":8,"pi":[{"n":"target","pt":$n[1].Transform,"ps":0},{"n":"progress","pt":$n[0].Single,"ps":1}],"sn":"Show","rt":$n[0].Void,"p":[$n[1].Transform,$n[0].Single]},{"a":2,"n":"IsHeld","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsHeld","t":8,"rt":$n[0].Boolean,"fg":"IsHeld","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_IsHeld","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"IsHeld"},"fn":"IsHeld"},{"at":[new UnityEngine.TooltipAttribute("The canvas RectTransform this prompt is placed in (screen space overlay)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"canvasRect","t":4,"rt":$n[1].RectTransform,"sn":"canvasRect"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"fill","t":4,"rt":$n[2].Image,"sn":"fill"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"rect","t":4,"rt":$n[1].RectTransform,"sn":"rect"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"worldCamera","t":4,"rt":$n[1].Camera,"sn":"worldCamera"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"worldOffset","t":4,"rt":$n[1].Vector3,"sn":"worldOffset"},{"a":1,"backing":true,"n":"<IsHeld>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"IsHeld","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*StealPrompt end.*/

    /*TutorialHints start.*/
    $m("TutorialHints", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Refresh","t":8,"sn":"Refresh","rt":$n[0].Void},{"a":1,"n":"Show","is":true,"t":8,"pi":[{"n":"go","pt":$n[1].GameObject,"ps":0},{"n":"on","pt":$n[0].Boolean,"ps":1}],"sn":"Show","rt":$n[0].Void,"p":[$n[1].GameObject,$n[0].Boolean]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraHand","t":4,"rt":$n[1].RectTransform,"sn":"cameraHand"},{"at":[new UnityEngine.HeaderAttribute("Step 2: turn the camera"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraHint","t":4,"rt":$n[1].GameObject,"sn":"cameraHint"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraRig","t":4,"rt":ThirdPersonCamera,"sn":"cameraRig"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraText","t":4,"rt":$n[1].GameObject,"sn":"cameraText"},{"at":[new UnityEngine.HeaderAttribute("Step 3: go to the eggs"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"goText","t":4,"rt":$n[1].GameObject,"sn":"goText"},{"at":[new UnityEngine.HeaderAttribute("Steal button"),new UnityEngine.TooltipAttribute("The hand on the Steal the eggs button (NestSelector/Icon/MobileInput)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"holdHand","t":4,"rt":$n[1].RectTransform,"sn":"holdHand"},{"a":1,"n":"holdHandStart","t":4,"rt":$n[1].Vector2,"sn":"holdHandStart"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"motor","t":4,"rt":PlayerMotor,"sn":"motor"},{"at":[new UnityEngine.TooltipAttribute("Hand image under moveHint; its fingertip circles at this radius (the joystick ring)."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveHand","t":4,"rt":$n[1].RectTransform,"sn":"moveHand"},{"at":[new UnityEngine.HeaderAttribute("Step 1: move"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveHint","t":4,"rt":$n[1].GameObject,"sn":"moveHint"},{"at":[new UnityEngine.TooltipAttribute("Seconds of running needed to count as moved."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveNeeded","t":4,"rt":$n[0].Single,"sn":"moveNeeded","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveRadius","t":4,"rt":$n[0].Single,"sn":"moveRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveText","t":4,"rt":$n[1].GameObject,"sn":"moveText"},{"a":1,"n":"moved","t":4,"rt":$n[0].Boolean,"sn":"moved","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"movedTime","t":4,"rt":$n[0].Single,"sn":"movedTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"player","t":4,"rt":Thief,"sn":"player"},{"a":1,"n":"stole","t":4,"rt":$n[0].Boolean,"sn":"stole","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"swipeDistance","t":4,"rt":$n[0].Single,"sn":"swipeDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.TooltipAttribute("Degrees of camera turn needed."),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"turnNeeded","t":4,"rt":$n[0].Single,"sn":"turnNeeded","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"turned","t":4,"rt":$n[0].Boolean,"sn":"turned","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*TutorialHints end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    }});
