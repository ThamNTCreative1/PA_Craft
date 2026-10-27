if ( TRACE ) { TRACE( JSON.parse( '["BlockDef#init","BlockPlacer#HasSelection#get","BlockPlacer#CanPlace#get","BlockPlacer#Selected#get","BlockPlacer#init","BlockPlacer#SetPalette","BlockPlacer#Select","BlockPlacer#Snap","BlockPlacer#Update","BlockPlacer#IsFree","BlockPlacer#PlaceAtTarget","BrightnessApplier#Value#get","BrightnessApplier#init","BrightnessApplier#ApplyAll","BrightnessApplier#ApplyTo","BrightnessApplier#Apply","ColorChoiceUI#Back","ColorChoiceUI#init","ColorChoiceUI#Awake","ColorChoiceUI#Show","ColorChoiceUI#FitOneLine","ColorChoiceUI#OnRectTransformDimensionsChange","ColorChoiceUI#Choose","ColorChoiceUI#Update","CtaOverlay#Awake","CtaOverlay#Activate","CtaOverlay#OnTap","CharacterWalker#IsMoving#get","CharacterWalker#Target#get","CharacterWalker#init","CharacterWalker#Awake","CharacterWalker#CollectLimbs","CharacterWalker#MoveTo","CharacterWalker#Stop","CharacterWalker#FaceTowards","CharacterWalker#Update","CharacterWalker#LateUpdate","CharacterWalker#Animate","CharacterWalker.Limb#init","GameFlow#init","GameFlow#Start","GameFlow#IntroThenChoose","GameFlow#OnColorChosen","GameFlow#ToBuild","GameFlow#OnPlaced","GameFlow#Update","GameFlow#EndAfter","GameFlow#ShowEnd","GameFlow#Flash","HotbarUI#init","HotbarUI#Slot","HotbarUI#Setup","HotbarUI#SetSelected","HotbarUI#Nudge","HotbarUI#Update","IntroSequence#init","IntroSequence#Play","IntroSequence#Update","IntroSequence#Finish","LunaController#init","LunaController#ApplyTexture","LunaController#ApplyCard","LunaController#Awake","NpcWander#init","NpcWander#Flat","NpcWander#Ignore","NpcWander#init","NpcWander#Awake","NpcWander#OnEnable","NpcWander#OnDisable","NpcWander#Update","NpcWander#Repath","NpcWander#PickPoint","NpcWander#Blocked","NpcWander#GroundAt","NpcWander#FarFromOthers","OrientationLayout#OnEnable","OrientationLayout#Update","OrientationLayout#Apply","OrientationLayout.Entry#init","PlaceButton#init","PlaceButton#Awake","PlaceButton#OnPress","PlaceButton#Update","PlayableConfig#init","PlayableConfig#Awake","PopIn#init","PopIn#Awake","PopIn#Update","Sfx#SfxEnabled#get","Sfx#Vol#get","Sfx#Play","Sfx#Click","Sfx#Extra","Sfx#Place","Sfx#init","Sfx#Awake","TextBorder#init","TextBorder#Awake","TextBorder#Build","TextBorder#OnEnable","TextBorder#OnDisable","TextBorder#OnDestroy","TextBorder#SetCopiesActive","TextBorder#LateUpdate","TextBorder#Sync","TouchArea#init","TouchArea#OnPointerDown","TouchArea#OnDrag","TouchArea#OnPointerUp","TutorialHud#init","TutorialHud#Begin","TutorialHud#GoMove","TutorialHud#GoLook","TutorialHud#GoSelect","TutorialHud#Finish","TutorialHud#Highlight","TutorialHud#HideDim","TutorialHud#SetHint","TutorialHud#GoPlaceHand","TutorialHud#OnSelected","TutorialHud#OnPlaced","TutorialHud#Update","ThirdPersonController#IgnoreForCamera","ThirdPersonController#Yaw#get","ThirdPersonController#init","ThirdPersonController#Awake","ThirdPersonController#BeginControl","ThirdPersonController#EndControl","ThirdPersonController#GetCameraPose","ThirdPersonController#AddLook","ThirdPersonController#Update","ThirdPersonController#TryMove","ThirdPersonController#FindGround","ThirdPersonController#LateUpdate","TreeRecolor#Apply","VirtualJoystick#init","VirtualJoystick#OnPointerDown","VirtualJoystick#OnDrag","VirtualJoystick#OnPointerUp","VirtualJoystick#OnDisable"]' ) ); }
/**
 * @version 1.0.9796.19214
 * @copyright anton
 * @compiler Bridge.NET 17.9.42-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*BlockDef start.*/
    Bridge.define("BlockDef", {
        fields: {
            name: null,
            displayName: null,
            prefab: null,
            icon: null,
            heightCells: 0,
            lengthCells: 0,
            faceCamera: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BlockDef#init", this ); }

                this.heightCells = 1;
                this.lengthCells = 1;
            }
        }
    });
    /*BlockDef end.*/

    /*BlockPlacer start.*/
    Bridge.define("BlockPlacer", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            cam: null,
            player: null,
            blocksRoot: null,
            preview: null,
            hotbar: null,
            pinkBlocks: null,
            blueBlocks: null,
            reach: 0,
            cell: 0,
            gridOrigin: null,
            placeMask: null,
            sfx: null,
            placeFx: null,
            inputEnabled: false,
            PlacedCount: 0,
            active: null,
            selected: 0,
            hasTarget: false,
            targetCell: null,
            targetRot: null
        },
        events: {
            OnPlaced: null,
            OnSelected: null
        },
        props: {
            HasSelection: {
                get: function () {
if ( TRACE ) { TRACE( "BlockPlacer#HasSelection#get", this ); }

                    return this.selected >= 0;
                }
            },
            CanPlace: {
                get: function () {
if ( TRACE ) { TRACE( "BlockPlacer#CanPlace#get", this ); }

                    return this.inputEnabled && this.selected >= 0 && this.hasTarget;
                }
            },
            Selected: {
                get: function () {
if ( TRACE ) { TRACE( "BlockPlacer#Selected#get", this ); }

                    return this.selected >= 0 ? this.active[this.selected] : null;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BlockPlacer#init", this ); }

                this.gridOrigin = new UnityEngine.Vector3();
                this.placeMask = new UnityEngine.LayerMask();
                this.targetCell = new UnityEngine.Vector3();
                this.targetRot = new UnityEngine.Quaternion();
                this.reach = 10.0;
                this.cell = 0.75;
                this.gridOrigin = new pc.Vec3( 9.975, -7.025, -46.725 );
                this.placeMask = UnityEngine.LayerMask.op_Implicit$1(-1);
                this.selected = -1;
                this.targetRot = pc.Quat.IDENTITY.clone();
            }
        },
        methods: {
            /*BlockPlacer.SetPalette start.*/
            SetPalette: function (pink) {
if ( TRACE ) { TRACE( "BlockPlacer#SetPalette", this ); }

                this.active = pink ? this.pinkBlocks : this.blueBlocks;
                this.hotbar.Setup(this.active, this);
                this.selected = -1;
            },
            /*BlockPlacer.SetPalette end.*/

            /*BlockPlacer.Select start.*/
            Select: function (i) {
if ( TRACE ) { TRACE( "BlockPlacer#Select", this ); }

                if (this.active == null || i < 0 || i >= this.active.length) {
                    return;
                }
                this.selected = i;
                Sfx.Click();
                this.hotbar.SetSelected(i);
                if (!Bridge.staticEquals(this.OnSelected, null)) {
                    this.OnSelected(i);
                }
            },
            /*BlockPlacer.Select end.*/

            /*BlockPlacer.Snap start.*/
            Snap: function (p) {
if ( TRACE ) { TRACE( "BlockPlacer#Snap", this ); }

                var q = p.$clone().sub( this.gridOrigin );
                q.x = Math.round(q.x / this.cell) * this.cell;
                q.y = Math.round(q.y / this.cell) * this.cell;
                q.z = Math.round(q.z / this.cell) * this.cell;
                return this.gridOrigin.$clone().add( q );
            },
            /*BlockPlacer.Snap end.*/

            /*BlockPlacer.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BlockPlacer#Update", this ); }

                this.hasTarget = false;
                if (this.inputEnabled && this.selected >= 0 && UnityEngine.Component.op_Inequality(this.cam, null)) {
                    var ray = this.cam.ViewportPointToRay(new pc.Vec3( 0.5, 0.5, 0.0 ));
                    var h = { v : new UnityEngine.RaycastHit() };
                    if (UnityEngine.Physics.Raycast$1(ray, h, this.reach, UnityEngine.LayerMask.op_Implicit(this.placeMask.$clone()))) {
                        var c = this.Snap(h.v.point.$clone().add( h.v.normal.$clone().clone().scale( this.cell ).clone().scale( 0.5 ) ));
                        var def = this.active[this.selected];
                        var r = pc.Quat.IDENTITY.clone();
                        if (def.faceCamera) {
                            r = new pc.Quat().setFromEulerAngles_Unity( 0.0, Math.round(this.cam.transform.eulerAngles.y / 90.0) * 90.0, 0.0 );
                        }
                        if (this.IsFree(c, def.heightCells, def.lengthCells, r)) {
                            this.hasTarget = true;
                            this.targetCell = c.$clone();
                            this.targetRot = r.$clone();
                        }
                    }
                }
                if (UnityEngine.Component.op_Inequality(this.preview, null)) {
                    this.preview.gameObject.SetActive(this.hasTarget);
                    if (this.hasTarget) {
                        var def1 = this.active[this.selected];
                        var hc = UnityEngine.Mathf.Max(1, def1.heightCells), lc = UnityEngine.Mathf.Max(1, def1.lengthCells);
                        this.preview.rotation = this.targetRot.$clone();
                        this.preview.position = this.targetCell.$clone().add( pc.Vec3.UP.clone().clone().scale( this.cell ).clone().scale( (((hc - 1) | 0)) ).clone().scale( 0.5 ) ).add( this.targetRot.transformVector( new pc.Vec3( 0, 0, 1 ) ).clone().scale( this.cell ).clone().scale( (((lc - 1) | 0)) ).clone().scale( 0.5 ) );
                        this.preview.localScale = new pc.Vec3( 1.0, hc, lc );
                    }
                }
            },
            /*BlockPlacer.Update end.*/

            /*BlockPlacer.IsFree start.*/
            IsFree: function (c, heightCells, lengthCells, rot) {
if ( TRACE ) { TRACE( "BlockPlacer#IsFree", this ); }

                var pl = this.player.position.$clone();
                var fwd = rot.transformVector( new pc.Vec3( 0, 0, 1 ) );
                for (var l = 0; l < UnityEngine.Mathf.Max(1, lengthCells); l = (l + 1) | 0) {
                    for (var k = 0; k < UnityEngine.Mathf.Max(1, heightCells); k = (k + 1) | 0) {
                        var ck = this.Snap(c.$clone().add( pc.Vec3.UP.clone().clone().scale( this.cell ).clone().scale( k ) ).add( fwd.$clone().clone().scale( this.cell ).clone().scale( l ) ));
                        if (UnityEngine.Physics.CheckBox$1(ck, new pc.Vec3( 1, 1, 1 ).clone().scale( this.cell ).clone().scale( 0.45 ), pc.Quat.IDENTITY.clone(), UnityEngine.LayerMask.op_Implicit(this.placeMask.$clone()))) {
                            return false;
                        }
                        if (Math.abs(ck.x - pl.x) < this.cell * 0.9 && Math.abs(ck.z - pl.z) < this.cell * 0.9 && ck.y > pl.y - 0.2 && ck.y < pl.y + 1.6) {
                            return false;
                        }
                    }
                }
                return true;
            },
            /*BlockPlacer.IsFree end.*/

            /*BlockPlacer.PlaceAtTarget start.*/
            PlaceAtTarget: function () {
if ( TRACE ) { TRACE( "BlockPlacer#PlaceAtTarget", this ); }

                if (!this.CanPlace) {
                    return false;
                }
                var go = UnityEngine.Object.Instantiate$3(UnityEngine.GameObject, this.active[this.selected].prefab, this.targetCell, this.targetRot, this.blocksRoot);
                var pop = go.AddComponent(PopIn);
                pop.duration = 0.18;
                var rs = go.GetComponentsInChildren(UnityEngine.Renderer);
                for (var i = 0; i < rs.length; i = (i + 1) | 0) {
                    BrightnessApplier.Apply(rs[i]);
                }
                if (UnityEngine.Component.op_Inequality(this.placeFx, null)) {
                    this.placeFx.transform.position = this.targetCell.$clone();
                    this.placeFx.Play();
                }
                Sfx.Place();
                this.PlacedCount = (this.PlacedCount + 1) | 0;
                this.hasTarget = false;
                if (!Bridge.staticEquals(this.OnPlaced, null)) {
                    this.OnPlaced(this.PlacedCount);
                }
                return true;
            },
            /*BlockPlacer.PlaceAtTarget end.*/


        }
    });
    /*BlockPlacer end.*/

    /*BrightnessApplier start.*/
    Bridge.define("BrightnessApplier", {
        statics: {
            fields: {
                ColorId: 0,
                BaseColorId: 0
            },
            props: {
                Value: {
                    get: function () {
if ( TRACE ) { TRACE( "BrightnessApplier#Value#get", this ); }

                        return UnityEngine.MonoBehaviour.op_Inequality(PlayableConfig.I, null) ? PlayableConfig.I.brightness : 1.0;
                    }
                }
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "BrightnessApplier#init", this ); }

                    this.ColorId = UnityEngine.Shader.PropertyToID("_Color");
                    this.BaseColorId = UnityEngine.Shader.PropertyToID("_BaseColor");
                }
            },
            methods: {
                /*BrightnessApplier.ApplyAll:static start.*/
                ApplyAll: function () {
if ( TRACE ) { TRACE( "BrightnessApplier#ApplyAll", this ); }

                    var rs = UnityEngine.Object.FindObjectsOfType(UnityEngine.Renderer); // Luna không hỗ trợ overload có tham số
                    for (var i = 0; i < rs.length; i = (i + 1) | 0) {
                        BrightnessApplier.Apply(rs[i]);
                    }
                },
                /*BrightnessApplier.ApplyAll:static end.*/

                /*BrightnessApplier.ApplyTo:static start.*/
                ApplyTo: function (go) {
if ( TRACE ) { TRACE( "BrightnessApplier#ApplyTo", this ); }

                    if (UnityEngine.GameObject.op_Equality(go, null)) {
                        return;
                    }
                    var rs = go.GetComponentsInChildren(UnityEngine.Renderer);
                    for (var i = 0; i < rs.length; i = (i + 1) | 0) {
                        BrightnessApplier.Apply(rs[i]);
                    }
                },
                /*BrightnessApplier.ApplyTo:static end.*/

                /*BrightnessApplier.Apply:static start.*/
                Apply: function (r) {
if ( TRACE ) { TRACE( "BrightnessApplier#Apply", this ); }

                    if (UnityEngine.Component.op_Equality(r, null) || Bridge.is(r, UnityEngine.ParticleSystemRenderer)) {
                        return;
                    }
                    var b = BrightnessApplier.Value;
                    if (UnityEngine.Mathf.Approximately(b, 1.0)) {
                        return;
                    }
                    var mats = r.materials; // instance, không sửa asset
                    for (var i = 0; i < mats.length; i = (i + 1) | 0) {
                        var m = mats[i];
                        if (m == null) {
                            continue;
                        }
                        if (m.HasProperty(BrightnessApplier.BaseColorId)) {
                            var c = m.GetColor(BrightnessApplier.BaseColorId);
                            m.SetColor(BrightnessApplier.BaseColorId, new pc.Color( c.r * b, c.g * b, c.b * b, c.a ));
                        } else if (m.HasProperty(BrightnessApplier.ColorId)) {
                            var c1 = m.GetColor(BrightnessApplier.ColorId);
                            m.SetColor(BrightnessApplier.ColorId, new pc.Color( c1.r * b, c1.g * b, c1.b * b, c1.a ));
                        }
                    }
                },
                /*BrightnessApplier.Apply:static end.*/


            }
        }
    });
    /*BrightnessApplier end.*/

    /*ColorChoiceUI start.*/
    Bridge.define("ColorChoiceUI", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*ColorChoiceUI.Back:static start.*/
                Back: function (x) {
if ( TRACE ) { TRACE( "ColorChoiceUI#Back", this ); }

                    x = Math.max(0, Math.min(1, x));
                    var c = 1.7;
                    return 1.0 + (c + 1.0) * Math.pow(x - 1.0, 3) + c * Math.pow(x - 1.0, 2);
                },
                /*ColorChoiceUI.Back:static end.*/


            }
        },
        fields: {
            title: null,
            titleBackdrop: null,
            pinkCard: null,
            blueCard: null,
            hand: null,
            titleMaxFontSize: 0,
            moveTime: 0,
            pointTime: 0,
            done: false,
            t: 0,
            chosen: null,
            other: null
        },
        events: {
            OnChosen: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "ColorChoiceUI#init", this ); }

                this.titleMaxFontSize = 64;
                this.moveTime = 0.45;
                this.pointTime = 0.9;
            }
        },
        methods: {
            /*ColorChoiceUI.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "ColorChoiceUI#Awake", this ); }

                this.pinkCard.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.Choose(true);
                }));
                this.blueCard.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.Choose(false);
                }));
            },
            /*ColorChoiceUI.Awake end.*/

            /*ColorChoiceUI.Show start.*/
            Show: function () {
if ( TRACE ) { TRACE( "ColorChoiceUI#Show", this ); }

                this.gameObject.SetActive(true);
                this.done = false;
                this.t = 0.0;
                var s = UnityEngine.MonoBehaviour.op_Inequality(PlayableConfig.I, null) ? PlayableConfig.I.chooseText : this.title.text;
                this.title.text = s;
                this.FitOneLine();
                this.pinkCard.transform.localScale = pc.Vec3.ZERO.clone();
                this.blueCard.transform.localScale = pc.Vec3.ZERO.clone();
                this.title.transform.localScale = pc.Vec3.ZERO.clone();
                this.hand.gameObject.SetActive(false);
            },
            /*ColorChoiceUI.Show end.*/

            /*ColorChoiceUI.FitOneLine start.*/
            FitOneLine: function () {
if ( TRACE ) { TRACE( "ColorChoiceUI#FitOneLine", this ); }

                this.title.horizontalOverflow = UnityEngine.HorizontalWrapMode.Overflow;
                var parent = Bridge.as(this.title.transform.parent, UnityEngine.RectTransform);
                var w = (UnityEngine.Component.op_Inequality(parent, null) ? parent.rect.width : 1080.0) - 140.0; // chừa lề 2 bên + viền chữ
                this.title.fontSize = this.titleMaxFontSize;
                var preferred = this.title.preferredWidth;
                if (preferred > w) {
                    this.title.fontSize = UnityEngine.Mathf.Max(20, Math.floor(this.titleMaxFontSize * w / preferred));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.titleBackdrop, null)) {
                    this.titleBackdrop.rectTransform.anchoredPosition = this.title.rectTransform.anchoredPosition.$clone();
                    this.titleBackdrop.rectTransform.sizeDelta = new pc.Vec2( UnityEngine.Mathf.Min(w + 60.0, this.title.preferredWidth + 80.0), 116.0 );
                }
            },
            /*ColorChoiceUI.FitOneLine end.*/

            /*ColorChoiceUI.OnRectTransformDimensionsChange start.*/
            OnRectTransformDimensionsChange: function () {
if ( TRACE ) { TRACE( "ColorChoiceUI#OnRectTransformDimensionsChange", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.title, null)) {
                    this.FitOneLine();
                }
            },
            /*ColorChoiceUI.OnRectTransformDimensionsChange end.*/

            /*ColorChoiceUI.Choose start.*/
            Choose: function (pink) {
if ( TRACE ) { TRACE( "ColorChoiceUI#Choose", this ); }

                if (this.done) {
                    return;
                }
                this.done = true;
                this.t = 0.0;
                Sfx.Click();
                this.chosen = pink ? this.pinkCard.transform : this.blueCard.transform;
                this.other = pink ? this.blueCard.transform : this.pinkCard.transform;
                this.hand.gameObject.SetActive(false);
                if (!Bridge.staticEquals(this.OnChosen, null)) {
                    this.OnChosen(pink);
                }
            },
            /*ColorChoiceUI.Choose end.*/

            /*ColorChoiceUI.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "ColorChoiceUI#Update", this ); }

                this.t += UnityEngine.Time.deltaTime;
                if (!this.done) {
                    this.title.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( ColorChoiceUI.Back(this.t / 0.35) );
                    var pinkIn = ColorChoiceUI.Back((this.t - 0.15) / 0.35), blueIn = ColorChoiceUI.Back((this.t - 0.3) / 0.35);
                    var pinkPulse = 1.0, bluePulse = 1.0;

                    var ht = this.t - 0.7;
                    if (ht > 0.0) {
                        this.hand.gameObject.SetActive(true);
                        var cycle = 2.0 * (this.moveTime + this.pointTime);
                        var c = ht % cycle;
                        // 0..point: trên card hồng | ..move: sang xanh | ..point: trên card xanh | ..move: về hồng
                        var a = this.pinkCard.transform.position.$clone(), b = this.blueCard.transform.position.$clone();
                        var k;
                        var onPink = false, onBlue = false;
                        var pt = 0.0;
                        if (c < this.pointTime) {
                            k = 0.0;
                            onPink = true;
                            pt = c;
                        } else if (c < this.pointTime + this.moveTime) {
                            k = pc.math.smoothstep(0.0, 1.0, (c - this.pointTime) / this.moveTime);
                        } else {
                            if (c < 2.0 * this.pointTime + this.moveTime) {
                                k = 1.0;
                                onBlue = true;
                                pt = c - this.pointTime - this.moveTime;
                            } else {
                                k = 1.0 - pc.math.smoothstep(0.0, 1.0, (c - 2.0 * this.pointTime - this.moveTime) / this.moveTime);
                            }
                        }

                        var u = UnityEngine.Component.op_Inequality(this.hand.parent, null) ? this.hand.parent.lossyScale.x : 1.0;
                        var press = (onPink || onBlue) ? Math.abs(Math.sin(pt / this.pointTime * UnityEngine.Mathf.PI * 2.0)) : 0.0; // 2 lần nhấn
                        this.hand.position = new pc.Vec3().lerp( a, b, k ).add( new pc.Vec3( 40.0, -80.0 + 14.0 * (1.0 - press), 0.0 ).clone().scale( u ) );
                        this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.0 - 0.08 * press) );
                        var grow = 1.0 + 0.1 * Math.sin(Math.max(0, Math.min(1, pt / this.pointTime)) * UnityEngine.Mathf.PI);
                        if (onPink) {
                            pinkPulse = grow;
                        }
                        if (onBlue) {
                            bluePulse = grow;
                        }
                    } else {
                        this.hand.gameObject.SetActive(false);
                    }

                    this.pinkCard.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pinkIn ).clone().scale( pinkPulse );
                    this.blueCard.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( blueIn ).clone().scale( bluePulse );
                } else {
                    this.chosen.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1.15, 0.0, Math.max(0, Math.min(1, (this.t - 0.35) / 0.25))) );
                    this.other.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1.0, 0.0, Math.max(0, Math.min(1, this.t / 0.2))) );
                    this.title.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1.0, 0.0, Math.max(0, Math.min(1, this.t / 0.25))) );
                    if (this.t > 0.65) {
                        this.gameObject.SetActive(false);
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.titleBackdrop, null)) {
                    this.titleBackdrop.transform.localScale = this.title.transform.localScale.$clone();
                }
            },
            /*ColorChoiceUI.Update end.*/


        }
    });
    /*ColorChoiceUI end.*/

    /*CtaOverlay start.*/
    Bridge.define("CtaOverlay", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            button: null,
            ended: false
        },
        methods: {
            /*CtaOverlay.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CtaOverlay#Awake", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.button, null)) {
                    this.button = this.GetComponent(UnityEngine.UI.Button);
                }
                this.button.onClick.AddListener(Bridge.fn.cacheBind(this, this.OnTap));
            },
            /*CtaOverlay.Awake end.*/

            /*CtaOverlay.Activate start.*/
            Activate: function () {
if ( TRACE ) { TRACE( "CtaOverlay#Activate", this ); }

                this.gameObject.SetActive(true);
                this.transform.SetAsLastSibling();
            },
            /*CtaOverlay.Activate end.*/

            /*CtaOverlay.OnTap start.*/
            OnTap: function () {
if ( TRACE ) { TRACE( "CtaOverlay#OnTap", this ); }

                Sfx.Click();
                if (!this.ended) {
                    this.ended = true;
                    Luna.Unity.LifeCycle.GameEnded();
                }
                Luna.Unity.Playable.InstallFullGame();
            },
            /*CtaOverlay.OnTap end.*/


        }
    });
    /*CtaOverlay end.*/

    /*CharacterWalker start.*/
    Bridge.define("CharacterWalker", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            speed: 0,
            speedMultiplier: 0,
            turnSpeed: 0,
            swingAngle: 0,
            swingFreq: 0,
            bobBody: false,
            externalControl: false,
            externalMoving: false,
            limbs: null,
            anim: null,
            curClip: null,
            bodyRoot: null,
            bodyBase: null,
            target: null,
            hasTarget: false,
            phase: 0,
            amp: 0,
            facing: false,
            faceRot: null
        },
        props: {
            IsMoving: {
                get: function () {
if ( TRACE ) { TRACE( "CharacterWalker#IsMoving#get", this ); }

                    return this.hasTarget;
                }
            },
            Target: {
                get: function () {
if ( TRACE ) { TRACE( "CharacterWalker#Target#get", this ); }

                    return this.target.$clone();
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CharacterWalker#init", this ); }

                this.bodyBase = new UnityEngine.Vector3();
                this.target = new UnityEngine.Vector3();
                this.faceRot = new UnityEngine.Quaternion();
                this.speed = 1.3;
                this.speedMultiplier = 1.0;
                this.turnSpeed = 480.0;
                this.swingAngle = 40.0;
                this.swingFreq = 8.0;
                this.bobBody = false;
                this.limbs = new (System.Collections.Generic.List$1(CharacterWalker.Limb)).ctor();
            }
        },
        methods: {
            /*CharacterWalker.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CharacterWalker#Awake", this ); }

                this.anim = this.GetComponentInChildren(UnityEngine.Animation);
                if (UnityEngine.Component.op_Equality(this.anim, null)) {
                    this.CollectLimbs();
                }
                if (this.transform.childCount > 0) {
                    this.bodyRoot = this.transform.GetChild(0);
                    this.bodyBase = this.bodyRoot.localPosition.$clone();
                }
            },
            /*CharacterWalker.Awake end.*/

            /*CharacterWalker.CollectLimbs start.*/
            CollectLimbs: function () {
if ( TRACE ) { TRACE( "CharacterWalker#CollectLimbs", this ); }

                var $t, $t1;
                var all = this.GetComponentsInChildren$1(UnityEngine.Transform, true);
                $t = Bridge.getEnumerator(all);
                try {
                    while ($t.moveNext()) {
                        var t = $t.Current;
                        var n = t.name.toLowerCase();
                        var arm = System.String.contains(n,"arm"), leg = System.String.contains(n,"leg");
                        if (!arm && !leg) {
                            continue;
                        }
                        if (System.String.contains(n,"layer")) {
                            continue;
                        }
                        // chỉ lấy node limb cao nhất
                        var parentIsLimb = false;
                        for (var p = t.parent; UnityEngine.Component.op_Inequality(p, null) && UnityEngine.Component.op_Inequality(p, this.transform); p = p.parent) {
                            var pn = p.name.toLowerCase();
                            if (System.String.contains(pn,"arm") || System.String.contains(pn,"leg")) {
                                parentIsLimb = true;
                                break;
                            }
                        }
                        if (parentIsLimb) {
                            continue;
                        }
                        var right = System.String.contains(n,"right");
                        var s = arm ? (right ? 1.0 : -1.0) : (right ? -1.0 : 1.0);
                        this.limbs.add(($t1 = new CharacterWalker.Limb(), $t1.t = t, $t1.baseRot = t.localRotation.$clone(), $t1.sign = s, $t1));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*CharacterWalker.CollectLimbs end.*/

            /*CharacterWalker.MoveTo start.*/
            MoveTo: function (p) {
if ( TRACE ) { TRACE( "CharacterWalker#MoveTo", this ); }

                this.target = p.$clone();
                this.hasTarget = true;
                this.facing = false;
            },
            /*CharacterWalker.MoveTo end.*/

            /*CharacterWalker.Stop start.*/
            Stop: function () {
if ( TRACE ) { TRACE( "CharacterWalker#Stop", this ); }

                this.hasTarget = false;
            },
            /*CharacterWalker.Stop end.*/

            /*CharacterWalker.FaceTowards start.*/
            FaceTowards: function (worldPoint) {
if ( TRACE ) { TRACE( "CharacterWalker#FaceTowards", this ); }

                var d = worldPoint.$clone().sub( this.transform.position );
                d.y = 0;
                if (d.lengthSq() < 0.0001) {
                    return;
                }
                this.faceRot = new pc.Quat().lookRotation( d, pc.Vec3.UP );
                this.facing = true;
            },
            /*CharacterWalker.FaceTowards end.*/

            /*CharacterWalker.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CharacterWalker#Update", this ); }

                var dt = UnityEngine.Time.deltaTime;
                if (this.externalControl) {
                    return;
                }
                if (this.hasTarget) {
                    var d = this.target.$clone().sub( this.transform.position );
                    d.y = 0;
                    var dist = d.length();
                    if (dist < 0.08) {
                        this.hasTarget = false;
                    } else {
                        var want = new pc.Quat().lookRotation( d.$clone().scale( 1.0 / ( dist ) ), pc.Vec3.UP );
                        this.transform.rotation = pc.Quat.rotateTowards( this.transform.rotation.$clone(), want.$clone(), this.turnSpeed * dt );
                        var step = UnityEngine.Mathf.Min(dist, this.speed * this.speedMultiplier * dt);
                        var p = this.transform.position.$clone().add( d.$clone().scale( 1.0 / ( dist ) ).clone().scale( step ) );
                        p.y = pc.math.lerp(this.transform.position.y, this.target.y, 10.0 * dt);
                        this.transform.position = p.$clone();
                    }
                } else if (this.facing) {
                    this.transform.rotation = pc.Quat.rotateTowards( this.transform.rotation.$clone(), this.faceRot.$clone(), this.turnSpeed * dt );
                    if (pc.Quat.angle( this.transform.rotation.$clone(), this.faceRot.$clone() ) < 0.5) {
                        this.facing = false;
                    }
                }
                this.Animate(this.hasTarget, dt);
            },
            /*CharacterWalker.Update end.*/

            /*CharacterWalker.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "CharacterWalker#LateUpdate", this ); }

                // Read the controller's movement result after all Update methods.
                if (this.externalControl) {
                    this.Animate(this.externalMoving, UnityEngine.Time.deltaTime);
                }
            },
            /*CharacterWalker.LateUpdate end.*/

            /*CharacterWalker.Animate start.*/
            Animate: function (moving, dt) {
if ( TRACE ) { TRACE( "CharacterWalker#Animate", this ); }

                if (UnityEngine.Component.op_Inequality(this.anim, null)) {
                    var c = moving ? "walk" : "idle";
                    // Luna: không dùng GetClip / AnimationState.wrapMode / IsPlaying(string) -> tự lặp lại clip.
                    // Model có Animation (Unicorn, Skibidi) đều có clip "walk" và "idle".
                    if (!Bridge.referenceEquals(this.curClip, c) || !this.anim.isPlaying) {
                        this.anim.CrossFade(c, 0.2);
                        this.curClip = c;
                    }
                    return;
                }
                this.amp = UnityEngine.Mathf.MoveTowards(this.amp, moving ? this.swingAngle : 0.0, this.swingAngle * 6.0 * dt);
                this.phase += dt * this.swingFreq * UnityEngine.Mathf.Max(1.0, this.speedMultiplier);
                var s = Math.sin(this.phase) * this.amp;
                for (var i = 0; i < this.limbs.Count; i = (i + 1) | 0) {
                    this.limbs.getItem(i).t.localRotation = this.limbs.getItem(i).baseRot.clone().mul( new pc.Quat().setFromEulerAngles_Unity( this.limbs.getItem(i).sign * s, 0.0, 0.0 ) );
                }
                if (this.bobBody && UnityEngine.Component.op_Inequality(this.bodyRoot, null)) {
                    this.bodyRoot.localPosition = this.bodyBase.$clone().add( pc.Vec3.UP.clone().clone().scale( Math.abs(Math.sin(this.phase)) ).clone().scale( 0.06 ).clone().scale( (this.amp / UnityEngine.Mathf.Max(0.01, this.swingAngle)) ) );
                }
            },
            /*CharacterWalker.Animate end.*/


        }
    });
    /*CharacterWalker end.*/

    /*CharacterWalker+Limb start.*/
    Bridge.define("CharacterWalker.Limb", {
        $kind: 1002,
        fields: {
            t: null,
            baseRot: null,
            sign: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CharacterWalker.Limb#init", this ); }

                this.baseRot = new UnityEngine.Quaternion();
            }
        }
    });
    /*CharacterWalker+Limb end.*/

    /*GameFlow start.*/
    Bridge.define("GameFlow", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            state: 0,
            cam: null,
            intro: null,
            player: null,
            placer: null,
            trees: null,
            choiceUI: null,
            gameplayUI: null,
            tutorial: null,
            houseThumb: null,
            pinkThumb: null,
            blueThumb: null,
            cta: null,
            npcs: null,
            bgm: null,
            flash: null,
            overviewOffset: null,
            buildTimer: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "GameFlow#init", this ); }

                this.overviewOffset = new UnityEngine.Vector3();
                this.overviewOffset = new pc.Vec3( 0.0, 4.5, -7.0 );
            }
        },
        methods: {
            /*GameFlow.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "GameFlow#Start", this ); }

                var cfg = PlayableConfig.I;
                BrightnessApplier.ApplyAll();
                if (UnityEngine.Component.op_Inequality(this.bgm, null) && UnityEngine.MonoBehaviour.op_Inequality(cfg, null)) {
                    if (cfg.bgmClip != null) {
                        this.bgm.clip = cfg.bgmClip;
                    }
                    this.bgm.volume = cfg.bgmVolume;
                    this.bgm.loop = true;
                    if (cfg.bgmOn && this.bgm.clip != null) {
                        this.bgm.Play();
                    }
                }
                this.choiceUI.gameObject.SetActive(false);
                this.gameplayUI.SetActive(false);
                this.cta.gameObject.SetActive(false);
                this.choiceUI.addOnChosen(Bridge.fn.cacheBind(this, this.OnColorChosen));
                this.placer.addOnPlaced(Bridge.fn.cacheBind(this, this.OnPlaced));
                this.placer.inputEnabled = false;

                // intro chỉ hiện nhân vật chính
                for (var i = 0; i < this.npcs.length; i = (i + 1) | 0) {
                    this.npcs[i].SetActive(false);
                    var w = this.npcs[i].GetComponent(NpcWander);
                    if (UnityEngine.MonoBehaviour.op_Inequality(w, null)) {
                        w.enabled = false;
                    }
                }
                this.state = GameFlow.State.Intro;
                this.intro.Play(this.cam);
                this.StartCoroutine$1(this.IntroThenChoose(UnityEngine.MonoBehaviour.op_Inequality(cfg, null) ? cfg.introDuration : 5.0));
            },
            /*GameFlow.Start end.*/

            /*GameFlow.IntroThenChoose start.*/
            IntroThenChoose: function (dur) {
if ( TRACE ) { TRACE( "GameFlow#IntroThenChoose", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    n,
                    pp,
                    fwd,
                    on,
                    p,
                    w,
                    yr,
                    camPos,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(dur);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.intro.Finish();
                                        $enumerator.current = this.Flash(0.25, true);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    // bật NPC, rải quanh phía trước nhân vật
                                        n = UnityEngine.MonoBehaviour.op_Inequality(PlayableConfig.I, null) ? Math.max(0, Math.min(PlayableConfig.I.npcCount, this.npcs.length)) : this.npcs.length;
                                        pp = this.player.transform.position.$clone();
                                        fwd = this.player.transform.forward.$clone();
                                        fwd.y = 0;
                                        fwd.normalize();
                                        for (var i = 0; i < this.npcs.length; i = (i + 1) | 0) {
                                            on = i < n;
                                            this.npcs[i].SetActive(on);
                                            if (!on) {
                                                continue;
                                            }
                                            p = pp.$clone().add( new pc.Quat().setFromEulerAngles_Unity( 0, -50.0 + 50.0 * i, 0 ).transformVector( fwd ).clone().scale( (4.5 + i) ) );
                                            p.y = pp.y;
                                            this.npcs[i].transform.position = p.$clone();
                                            BrightnessApplier.ApplyTo(this.npcs[i]);
                                            w = this.npcs[i].GetComponent(NpcWander);
                                            if (UnityEngine.MonoBehaviour.op_Inequality(w, null)) {
                                                w.player = this.player.transform;
                                                w.view = this.cam.transform;
                                                w.enabled = true;
                                            }
                                        }

                                        // camera toàn cảnh phía sau nhân vật
                                        yr = new pc.Quat().lookRotation( fwd, pc.Vec3.UP );
                                        camPos = pp.$clone().add( yr.transformVector( this.overviewOffset ) );
                                        this.cam.transform.SetPositionAndRotation(camPos, new pc.Quat().lookRotation( pp.$clone().add( fwd.$clone().clone().scale( 4.0 ) ).sub( camPos ), pc.Vec3.UP ));
                                        $enumerator.current = this.Flash(0.25, false);
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    this.state = GameFlow.State.Choose;
                                        this.choiceUI.Show();

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
            /*GameFlow.IntroThenChoose end.*/

            /*GameFlow.OnColorChosen start.*/
            OnColorChosen: function (pink) {
if ( TRACE ) { TRACE( "GameFlow#OnColorChosen", this ); }

                if (this.state !== GameFlow.State.Choose) {
                    return;
                }
                this.StartCoroutine$1(this.ToBuild(pink));
            },
            /*GameFlow.OnColorChosen end.*/

            /*GameFlow.ToBuild start.*/
            ToBuild: function (pink) {
if ( TRACE ) { TRACE( "GameFlow#ToBuild", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    p0,
                    r0,
                    p1,
                    r1,
                    t,
                    dur,
                    k,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(0.3);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.trees.Apply(pink);
                                        Sfx.Extra();
                                        this.placer.SetPalette(pink);
                                        if (UnityEngine.MonoBehaviour.op_Inequality(this.houseThumb, null)) {
                                            this.houseThumb.sprite = pink ? this.pinkThumb : this.blueThumb;
                                        }
                                        $enumerator.current = new UnityEngine.WaitForSeconds(0.6);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    // camera bay về sau lưng nhân vật
                                        p0 = this.cam.transform.position.$clone();
                                        r0 = this.cam.transform.rotation.$clone();
                                        p1 = { v : new UnityEngine.Vector3() };
                                        r1 = { v : new UnityEngine.Quaternion() };
                                        this.player.GetCameraPose(p1, r1);
                                        t = 0.0;
                                        dur = 0.8;
                                    $step = 3;
                                    continue;
                                }
                                case 3: {
                                    if ( t < 1.0 ) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                }
                                case 4: {
                                    t += UnityEngine.Time.deltaTime / dur;
                                        k = pc.math.smoothstep(0.0, 1.0, t);
                                        this.cam.transform.SetPositionAndRotation(new pc.Vec3().lerp( p0, p1.v, k ), new pc.Quat().slerpUnclamped( r0, r1.v, pc.math.clamp( k, 0, 1 ) ));
                                        $enumerator.current = null;
                                        $step = 5;
                                        return true;
                                }
                                case 5: {
                                    
                                        $step = 3;
                                        continue;
                                }
                                case 6: {
                                    this.player.BeginControl();
                                        this.state = GameFlow.State.Build;
                                        this.gameplayUI.SetActive(true);
                                        this.tutorial.Begin();
                                        this.placer.inputEnabled = true;
                                        this.buildTimer = 0.0;

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
            /*GameFlow.ToBuild end.*/

            /*GameFlow.OnPlaced start.*/
            OnPlaced: function (count) {
if ( TRACE ) { TRACE( "GameFlow#OnPlaced", this ); }

                var cfg = PlayableConfig.I;
                if (UnityEngine.MonoBehaviour.op_Inequality(cfg, null) && cfg.placeCountToEnd > 0 && count >= cfg.placeCountToEnd) {
                    this.StartCoroutine$1(this.EndAfter(0.6));
                }
            },
            /*GameFlow.OnPlaced end.*/

            /*GameFlow.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "GameFlow#Update", this ); }

                if (this.state === GameFlow.State.Build) {
                    this.buildTimer += UnityEngine.Time.deltaTime;
                    var cfg = PlayableConfig.I;
                    if (UnityEngine.MonoBehaviour.op_Inequality(cfg, null) && cfg.timeToStore > 0.0 && this.buildTimer >= cfg.timeToStore) {
                        this.ShowEnd();
                    }
                }
            },
            /*GameFlow.Update end.*/

            /*GameFlow.EndAfter start.*/
            EndAfter: function (d) {
if ( TRACE ) { TRACE( "GameFlow#EndAfter", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(d);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.ShowEnd();

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
            /*GameFlow.EndAfter end.*/

            /*GameFlow.ShowEnd start.*/
            ShowEnd: function () {
if ( TRACE ) { TRACE( "GameFlow#ShowEnd", this ); }

                if (this.state === GameFlow.State.End) {
                    return;
                }
                this.state = GameFlow.State.End;
                this.player.EndControl();
                this.placer.inputEnabled = false;
                // không hiện end card: giữ nguyên màn chơi, phủ 1 nút CTA trong suốt
                this.cta.Activate();
            },
            /*GameFlow.ShowEnd end.*/

            /*GameFlow.Flash start.*/
            Flash: function (dur, fadeIn) {
if ( TRACE ) { TRACE( "GameFlow#Flash", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    t,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    if (UnityEngine.MonoBehaviour.op_Equality(this.flash, null)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 2;
                                        continue;
                                }
                                case 1: {
                                    return false;
                                }
                                case 2: {
                                    this.flash.gameObject.SetActive(true);
                                        t = 0.0;
                                    $step = 3;
                                    continue;
                                }
                                case 3: {
                                    if ( t < 1.0 ) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                }
                                case 4: {
                                    t += UnityEngine.Time.deltaTime / dur;
                                        this.flash.alpha = fadeIn ? t : 1.0 - t;
                                        $enumerator.current = null;
                                        $step = 5;
                                        return true;
                                }
                                case 5: {
                                    
                                        $step = 3;
                                        continue;
                                }
                                case 6: {
                                    this.flash.alpha = fadeIn ? 1.0 : 0.0;
                                        if (!fadeIn) {
                                            this.flash.gameObject.SetActive(false);
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
            /*GameFlow.Flash end.*/


        }
    });
    /*GameFlow end.*/

    /*GameFlow+State start.*/
    Bridge.define("GameFlow.State", {
        $kind: 1006,
        statics: {
            fields: {
                Intro: 0,
                Choose: 1,
                Build: 2,
                End: 3
            }
        }
    });
    /*GameFlow+State end.*/

    /*HotbarUI start.*/
    Bridge.define("HotbarUI", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            slotIcons: null,
            slotButtons: null,
            selectFrame: null,
            itemName: null,
            nameShowTime: 0,
            placer: null,
            nameT: 0,
            nudgeT: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "HotbarUI#init", this ); }

                this.nameShowTime = 1.6;
            }
        },
        methods: {
            /*HotbarUI.Slot start.*/
            Slot: function (i) {
if ( TRACE ) { TRACE( "HotbarUI#Slot", this ); }

                return Bridge.as(this.slotButtons[i].transform, UnityEngine.RectTransform);
            },
            /*HotbarUI.Slot end.*/

            /*HotbarUI.Setup start.*/
            Setup: function (defs, p) {
if ( TRACE ) { TRACE( "HotbarUI#Setup", this ); }

                this.placer = p;
                for (var i = 0; i < this.slotIcons.length; i = (i + 1) | 0) {
                    var on = defs != null && i < defs.length;
                    this.slotIcons[i].enabled = on;
                    if (on) {
                        this.slotIcons[i].sprite = defs[i].icon;
                        this.slotIcons[i].preserveAspect = true;
                    }
                    var idx = { v : i };
                    this.slotButtons[i].onClick.RemoveAllListeners();
                    this.slotButtons[i].onClick.AddListener((function ($me, idx) {
                        return Bridge.fn.bind($me, function () {
                            this.placer.Select(idx.v);
                        });
                    })(this, idx));
                }
                this.selectFrame.gameObject.SetActive(false);
                if (UnityEngine.MonoBehaviour.op_Inequality(this.itemName, null)) {
                    this.itemName.gameObject.SetActive(false);
                }
            },
            /*HotbarUI.Setup end.*/

            /*HotbarUI.SetSelected start.*/
            SetSelected: function (i) {
if ( TRACE ) { TRACE( "HotbarUI#SetSelected", this ); }

                this.selectFrame.gameObject.SetActive(true);
                this.selectFrame.anchoredPosition = this.Slot(i).anchoredPosition.$clone();
                var d = this.placer.Selected;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.itemName, null) && d != null) {
                    this.itemName.text = System.String.isNullOrEmpty(d.displayName) ? System.String.replaceAll(d.name, String.fromCharCode(95), String.fromCharCode(32)) : d.displayName;
                    this.itemName.gameObject.SetActive(true);
                    this.nameT = this.nameShowTime;
                }
            },
            /*HotbarUI.SetSelected end.*/

            /*HotbarUI.Nudge start.*/
            Nudge: function () {
if ( TRACE ) { TRACE( "HotbarUI#Nudge", this ); }

                this.nudgeT = 0.4;
            },
            /*HotbarUI.Nudge end.*/

            /*HotbarUI.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "HotbarUI#Update", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.itemName, null) && this.nameT > 0.0) {
                    this.nameT -= UnityEngine.Time.deltaTime;
                    var c = this.itemName.color.$clone();
                    c.a = Math.max(0, Math.min(1, this.nameT / 0.4));
                    this.itemName.color = c.$clone();
                    if (this.nameT <= 0.0) {
                        this.itemName.gameObject.SetActive(false);
                    }
                }
                if (this.nudgeT > 0.0) {
                    this.nudgeT -= UnityEngine.Time.deltaTime;
                    var s = 1.0 + Math.sin(this.nudgeT * 40.0) * 0.05;
                    this.transform.localScale = new pc.Vec3( s, s, 1.0 );
                    if (this.nudgeT <= 0.0) {
                        this.transform.localScale = new pc.Vec3( 1, 1, 1 );
                    }
                }
            },
            /*HotbarUI.Update end.*/


        }
    });
    /*HotbarUI end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*IntroSequence start.*/
    Bridge.define("IntroSequence", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            hero: null,
            cameraPose: null,
            heroStart: null,
            faceTime: 0,
            turnTime: 0,
            walkSpeedMultiplier: 0,
            walkDistance: 0,
            t: 0,
            turned: false,
            walking: false,
            Running: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "IntroSequence#init", this ); }

                this.faceTime = 0.8;
                this.turnTime = 0.3;
                this.walkSpeedMultiplier = 1.3;
                this.walkDistance = 5.0;
            }
        },
        methods: {
            /*IntroSequence.Play start.*/
            Play: function (cam) {
if ( TRACE ) { TRACE( "IntroSequence#Play", this ); }

                this.Running = true;
                this.t = 0.0;
                this.turned = (this.walking = false);
                cam.transform.SetParent(null);
                cam.transform.SetPositionAndRotation(this.cameraPose.position, this.cameraPose.rotation);
                this.hero.transform.SetPositionAndRotation(this.heroStart.position, this.heroStart.rotation);
                this.hero.Stop();
                this.hero.speedMultiplier = 1.0;
            },
            /*IntroSequence.Play end.*/

            /*IntroSequence.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "IntroSequence#Update", this ); }

                if (!this.Running) {
                    return;
                }
                this.t += UnityEngine.Time.deltaTime;
                if (!this.turned && this.t >= this.faceTime) {
                    this.turned = true;
                    this.hero.FaceTowards(this.hero.transform.position.$clone().sub( (this.cameraPose.position.$clone().sub( this.hero.transform.position )) ));
                }
                if (!this.walking && this.t >= this.faceTime + this.turnTime) {
                    this.walking = true;
                    var away = this.hero.transform.position.$clone().sub( this.cameraPose.position );
                    away.y = 0;
                    away.normalize();
                    this.hero.speedMultiplier = this.walkSpeedMultiplier;
                    this.hero.MoveTo(this.hero.transform.position.$clone().add( away.$clone().clone().scale( this.walkDistance ) ));
                }
            },
            /*IntroSequence.Update end.*/

            /*IntroSequence.Finish start.*/
            Finish: function () {
if ( TRACE ) { TRACE( "IntroSequence#Finish", this ); }

                this.Running = false;
                this.hero.speedMultiplier = 1.0;
            },
            /*IntroSequence.Finish end.*/


        }
    });
    /*IntroSequence end.*/

    /*LunaController start.*/
    Bridge.define("LunaController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            chooseText: null,
            placeCount: 0,
            timeToStore: 0,
            bgm: null,
            pinkCardImage: null,
            blueCardImage: null,
            pinkCardTexture: null,
            blueCardTexture: null,
            pinkCardTextureTarget: null,
            blueCardTextureTarget: null,
            pinkCardTarget: null,
            blueCardTarget: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "LunaController#init", this ); }

                this.chooseText = "CHOOSE YOUR FAVOURITE COLOR";
                this.placeCount = 8;
                this.timeToStore = 40.0;
            }
        },
        methods: {
            /*LunaController.ApplyTexture start.*/
            ApplyTexture: function (target, texture) {
if ( TRACE ) { TRACE( "LunaController#ApplyTexture", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(target, null) || texture == null) {
                    return;
                }
                target.texture = texture;
                var fit = target.transform.parent.GetComponent(UnityEngine.UI.AspectRatioFitter);
                if (UnityEngine.MonoBehaviour.op_Inequality(fit, null)) {
                    fit.aspectRatio = texture.width / UnityEngine.Mathf.Max(1, texture.height);
                }
            },
            /*LunaController.ApplyTexture end.*/

            /*LunaController.ApplyCard start.*/
            ApplyCard: function (target, sprite) {
if ( TRACE ) { TRACE( "LunaController#ApplyCard", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(target, null) || sprite == null) {
                    return;
                }
                target.sprite = sprite;
                var fit = target.GetComponent(UnityEngine.UI.AspectRatioFitter);
                if (UnityEngine.MonoBehaviour.op_Inequality(fit, null)) {
                    fit.aspectRatio = sprite.rect.width / sprite.rect.height;
                }
            },
            /*LunaController.ApplyCard end.*/

            /*LunaController.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "LunaController#Awake", this ); }

                this.ApplyCard(this.pinkCardTarget, this.pinkCardImage);
                this.ApplyCard(this.blueCardTarget, this.blueCardImage);
                this.ApplyTexture(this.pinkCardTextureTarget, this.pinkCardTexture);
                this.ApplyTexture(this.blueCardTextureTarget, this.blueCardTexture);
                var cfg = this.GetComponent(PlayableConfig);
                if (UnityEngine.MonoBehaviour.op_Equality(cfg, null)) {
                    return;
                }
                if (!System.String.isNullOrEmpty(this.chooseText)) {
                    cfg.chooseText = this.chooseText;
                }
                cfg.placeCountToEnd = this.placeCount;
                cfg.timeToStore = this.timeToStore;
                if (this.bgm != null) {
                    cfg.bgmClip = this.bgm;
                }
            },
            /*LunaController.Awake end.*/


        }
    });
    /*LunaController end.*/

    /*NpcWander start.*/
    Bridge.define("NpcWander", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                All: null
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "NpcWander#init", this ); }

                    this.All = new (System.Collections.Generic.List$1(NpcWander)).ctor();
                }
            },
            methods: {
                /*NpcWander.Flat:static start.*/
                Flat: function (v) {
if ( TRACE ) { TRACE( "NpcWander#Flat", this ); }

                    v.y = 0;
                    return v.$clone();
                },
                /*NpcWander.Flat:static end.*/

                /*NpcWander.Ignore:static start.*/
                Ignore: function (c) {
if ( TRACE ) { TRACE( "NpcWander#Ignore", this ); }

                    if (UnityEngine.Component.op_Equality(c, null)) {
                        return true;
                    }
                    var n = c.name;
                    return System.String.contains(n,"Leaves") || System.String.contains(n,"Flower") || System.String.contains(n,"Vines") || System.String.contains(n,"Lily") || System.String.contains(n,"Boundar");
                },
                /*NpcWander.Ignore:static end.*/


            }
        },
        fields: {
            player: null,
            view: null,
            minRadius: 0,
            maxRadius: 0,
            coneAngle: 0,
            minPlayerDist: 0,
            minNpcDist: 0,
            catchUpDist: 0,
            waitMin: 0,
            waitMax: 0,
            groundY: 0,
            groundMask: null,
            walker: null,
            waitT: 0,
            catchingUp: false,
            lastPos: null,
            stuckT: 0,
            repathT: 0,
            progressT: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "NpcWander#init", this ); }

                this.groundMask = new UnityEngine.LayerMask();
                this.lastPos = new UnityEngine.Vector3();
                this.minRadius = 4.0;
                this.maxRadius = 10.0;
                this.coneAngle = 60.0;
                this.minPlayerDist = 2.5;
                this.minNpcDist = 1.6;
                this.catchUpDist = 12.0;
                this.waitMin = 0.4;
                this.waitMax = 1.8;
                this.groundY = -7.4;
                this.groundMask = UnityEngine.LayerMask.op_Implicit$1(-1);
            }
        },
        methods: {
            /*NpcWander.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "NpcWander#Awake", this ); }

                this.walker = this.GetComponent(CharacterWalker);
            },
            /*NpcWander.Awake end.*/

            /*NpcWander.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "NpcWander#OnEnable", this ); }

                NpcWander.All.add(this);
                this.waitT = UnityEngine.Random.Range$1(0.0, 1.0);
                this.lastPos = this.transform.position.$clone();
                this.progressT = 0.0;
                this.stuckT = 0.0;
                this.repathT = 0.0;
            },
            /*NpcWander.OnEnable end.*/

            /*NpcWander.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "NpcWander#OnDisable", this ); }

                NpcWander.All.remove(this);
            },
            /*NpcWander.OnDisable end.*/

            /*NpcWander.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "NpcWander#Update", this ); }

                if (UnityEngine.Component.op_Equality(this.player, null)) {
                    var tp = UnityEngine.Object.FindObjectOfType(ThirdPersonController);
                    if (UnityEngine.MonoBehaviour.op_Equality(tp, null)) {
                        return;
                    }
                    this.player = tp.transform;
                }
                if (UnityEngine.Component.op_Equality(this.view, null) && UnityEngine.Component.op_Inequality(UnityEngine.Camera.main, null)) {
                    this.view = UnityEngine.Camera.main.transform;
                }
                var cfg = PlayableConfig.I;
                if (UnityEngine.MonoBehaviour.op_Inequality(cfg, null)) {
                    this.minRadius = cfg.npcMinRadius;
                    this.maxRadius = UnityEngine.Mathf.Max(cfg.npcMinRadius + 1.0, cfg.npcMaxRadius);
                    this.walker.speed = cfg.npcSpeed;
                }

                var pp = this.player.position.$clone();
                this.repathT = UnityEngine.Mathf.Max(0.0, this.repathT - UnityEngine.Time.deltaTime);
                var d = NpcWander.Flat(this.transform.position.$clone().sub( pp )).length();

                if (d > this.catchUpDist) {
                    if ((!this.catchingUp || !this.walker.IsMoving) && this.repathT <= 0.0) {
                        this.catchingUp = true;
                        this.walker.speedMultiplier = 2.2;
                        this.Repath();
                    }
                    return;
                }
                if (this.catchingUp && d < this.maxRadius) {
                    this.catchingUp = false;
                    this.walker.speedMultiplier = 1.0;
                }

                // quá gần người chơi, hoặc đích nằm sát người chơi -> đi chỗ khác
                if (this.repathT <= 0.0 && (d < this.minPlayerDist || (this.walker.IsMoving && NpcWander.Flat(this.walker.Target.$clone().sub( pp )).length() < this.minPlayerDist))) {
                    this.Repath();
                    return;
                }

                // bị kẹt (đang đi mà không nhích) -> chọn điểm khác
                this.progressT += UnityEngine.Time.deltaTime;
                if (this.progressT >= 0.4) {
                    if (this.walker.IsMoving && NpcWander.Flat(this.transform.position.$clone().sub( this.lastPos )).lengthSq() < 0.0001) {
                        this.stuckT += this.progressT;
                    } else {
                        this.stuckT = 0.0;
                    }
                    this.lastPos = this.transform.position.$clone();
                    this.progressT = 0.0;
                    if (this.stuckT > 1.0 && this.repathT <= 0.0) {
                        this.stuckT = 0.0;
                        this.Repath();
                    }
                }

                if (!this.walker.IsMoving) {
                    this.waitT -= UnityEngine.Time.deltaTime;
                    if (this.waitT <= 0.0 && this.repathT <= 0.0) {
                        this.Repath();
                        this.waitT = UnityEngine.Random.Range$1(this.waitMin, this.waitMax);
                    }
                }
            },
            /*NpcWander.Update end.*/

            /*NpcWander.Repath start.*/
            Repath: function () {
if ( TRACE ) { TRACE( "NpcWander#Repath", this ); }

                this.walker.MoveTo(this.PickPoint());
                this.repathT = 0.65;
                this.lastPos = this.transform.position.$clone();
                this.progressT = 0.0;
            },
            /*NpcWander.Repath end.*/

            /*NpcWander.PickPoint start.*/
            PickPoint: function () {
if ( TRACE ) { TRACE( "NpcWander#PickPoint", this ); }

                var pp = this.player.position.$clone();
                var fwd = NpcWander.Flat(UnityEngine.Component.op_Inequality(this.view, null) ? this.view.forward.$clone() : this.player.forward.$clone());
                if (fwd.lengthSq() < 0.001) {
                    fwd = new pc.Vec3( 0, 0, 1 );
                }
                fwd.normalize();
                var baseYaw = Math.atan2(fwd.x, fwd.z) * UnityEngine.Mathf.Rad2Deg;

                for (var i = 0; i < 16; i = (i + 1) | 0) {
                    var cone = i < 10 ? this.coneAngle : 180.0; // nới góc nếu khó tìm
                    var yaw = baseYaw + UnityEngine.Random.Range$1(-cone, cone);
                    var r = UnityEngine.Random.Range$1(this.minRadius, this.maxRadius);
                    var dir = new pc.Quat().setFromEulerAngles_Unity( 0, yaw, 0 ).transformVector( new pc.Vec3( 0, 0, 1 ) );
                    var p = pp.$clone().add( dir.$clone().clone().scale( r ) );
                    var hitP = { v : new UnityEngine.Vector3() };
                    if (!this.GroundAt(p, hitP)) {
                        continue;
                    }
                    if (!this.FarFromOthers(hitP.v)) {
                        continue;
                    }
                    // không đi xuyên vật cản (thân cây, block đã đặt) - dùng RaycastAll thay cho Linecast (Luna)
                    if (this.Blocked(this.transform.position.$clone().add( pc.Vec3.UP.clone().clone().scale( 0.5 ) ), hitP.v.$clone().add( pc.Vec3.UP.clone().clone().scale( 0.5 ) ))) {
                        continue;
                    }
                    return hitP.v.$clone();
                }
                // không tìm được điểm hợp lệ: vẫn đi tới 1 điểm ngẫu nhiên gần người chơi để không đứng yên
                var q = pp.$clone().add( new pc.Quat().setFromEulerAngles_Unity( 0, baseYaw + UnityEngine.Random.Range$1(-this.coneAngle, this.coneAngle), 0 ).transformVector( new pc.Vec3( 0, 0, 1 ) ).clone().scale( UnityEngine.Random.Range$1(this.minRadius, this.maxRadius) ) );
                q.y = this.transform.position.y;
                return q.$clone();
            },
            /*NpcWander.PickPoint end.*/

            /*NpcWander.Blocked start.*/
            Blocked: function (a, b) {
if ( TRACE ) { TRACE( "NpcWander#Blocked", this ); }

                var d = b.$clone().sub( a );
                var len = d.length();
                if (len < 0.01) {
                    return false;
                }
                var hs = UnityEngine.Physics.RaycastAll$2(a, d.$clone().scale( 1.0 / ( len ) ), len, UnityEngine.LayerMask.op_Implicit(this.groundMask.$clone()));
                for (var i = 0; i < hs.length; i = (i + 1) | 0) {
                    if (!NpcWander.Ignore(hs[i].collider)) {
                        return true;
                    }
                }
                return false;
            },
            /*NpcWander.Blocked end.*/

            /*NpcWander.GroundAt start.*/
            GroundAt: function (p, hitP) {
if ( TRACE ) { TRACE( "NpcWander#GroundAt", this ); }

                hitP.v = p.$clone();
                var hs = UnityEngine.Physics.RaycastAll$2(new pc.Vec3( p.x, this.groundY + 6.0, p.z ), pc.Vec3.DOWN.clone(), 12.0, UnityEngine.LayerMask.op_Implicit(this.groundMask.$clone()));
                var top = Number.NEGATIVE_INFINITY;
                var ok = false;
                for (var i = 0; i < hs.length; i = (i + 1) | 0) {
                    if (NpcWander.Ignore(hs[i].collider)) {
                        continue;
                    }
                    if (hs[i].point.y > top) {
                        top = hs[i].point.y;
                        hitP.v = hs[i].point.$clone();
                        ok = true;
                    }
                }
                if (!ok) {
                    return false;
                }
                return Math.abs(hitP.v.y - this.groundY) <= 0.3; // nước, block đã đặt -> bỏ
            },
            /*NpcWander.GroundAt end.*/

            /*NpcWander.FarFromOthers start.*/
            FarFromOthers: function (p) {
if ( TRACE ) { TRACE( "NpcWander#FarFromOthers", this ); }

                for (var i = 0; i < NpcWander.All.Count; i = (i + 1) | 0) {
                    var o = NpcWander.All.getItem(i);
                    if (UnityEngine.MonoBehaviour.op_Equality(o, this)) {
                        continue;
                    }
                    var op = UnityEngine.MonoBehaviour.op_Inequality(o.walker, null) && o.walker.IsMoving ? o.walker.Target.$clone() : o.transform.position.$clone();
                    if (NpcWander.Flat(op.$clone().sub( p )).length() < this.minNpcDist) {
                        return false;
                    }
                }
                return true;
            },
            /*NpcWander.FarFromOthers end.*/


        }
    });
    /*NpcWander end.*/

    /*OrientationLayout start.*/
    Bridge.define("OrientationLayout", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            entries: null,
            lastW: 0,
            lastH: 0
        },
        methods: {
            /*OrientationLayout.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "OrientationLayout#OnEnable", this ); }

                this.Apply();
            },
            /*OrientationLayout.OnEnable end.*/

            /*OrientationLayout.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "OrientationLayout#Update", this ); }

                if (UnityEngine.Screen.width !== this.lastW || UnityEngine.Screen.height !== this.lastH) {
                    this.Apply();
                }
            },
            /*OrientationLayout.Update end.*/

            /*OrientationLayout.Apply start.*/
            Apply: function () {
if ( TRACE ) { TRACE( "OrientationLayout#Apply", this ); }

                this.lastW = UnityEngine.Screen.width;
                this.lastH = UnityEngine.Screen.height;
                var land = UnityEngine.Screen.width > UnityEngine.Screen.height;
                if (this.entries == null) {
                    return;
                }
                for (var i = 0; i < this.entries.length; i = (i + 1) | 0) {
                    var e = this.entries[i];
                    if (UnityEngine.Component.op_Equality(e.target, null)) {
                        continue;
                    }
                    e.target.anchoredPosition = land ? e.landscapePos.$clone() : e.portraitPos.$clone();
                    e.target.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (land ? e.landscapeScale : e.portraitScale) );
                }
            },
            /*OrientationLayout.Apply end.*/


        }
    });
    /*OrientationLayout end.*/

    /*OrientationLayout+Entry start.*/
    Bridge.define("OrientationLayout.Entry", {
        $kind: 1002,
        fields: {
            target: null,
            portraitPos: null,
            landscapePos: null,
            portraitScale: 0,
            landscapeScale: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "OrientationLayout.Entry#init", this ); }

                this.portraitPos = new UnityEngine.Vector2();
                this.landscapePos = new UnityEngine.Vector2();
                this.portraitScale = 1.0;
                this.landscapeScale = 1.0;
            }
        }
    });
    /*OrientationLayout+Entry end.*/

    /*PlaceButton start.*/
    Bridge.define("PlaceButton", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            placer: null,
            ring: null,
            icon: null,
            button: null,
            disabledColor: null,
            readyColor: null,
            validColor: null,
            punch: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlaceButton#init", this ); }

                this.disabledColor = new UnityEngine.Color();
                this.readyColor = new UnityEngine.Color();
                this.validColor = new UnityEngine.Color();
                this.disabledColor = new pc.Color( 0.25, 0.25, 0.25, 0.45 );
                this.readyColor = new pc.Color( 1.0, 0.82, 0.9, 1.0 );
                this.validColor = new pc.Color( 0.45, 1.0, 0.45, 1.0 );
            }
        },
        methods: {
            /*PlaceButton.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PlaceButton#Awake", this ); }

                this.button.onClick.AddListener(Bridge.fn.cacheBind(this, this.OnPress));
            },
            /*PlaceButton.Awake end.*/

            /*PlaceButton.OnPress start.*/
            OnPress: function () {
if ( TRACE ) { TRACE( "PlaceButton#OnPress", this ); }

                if (this.placer.PlaceAtTarget()) {
                    this.punch = 0.15;
                } else {
                    if (!this.placer.HasSelection) {
                        this.placer.hotbar.Nudge();
                    }
                }
            },
            /*PlaceButton.OnPress end.*/

            /*PlaceButton.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PlaceButton#Update", this ); }

                var sel = this.placer.HasSelection;
                this.icon.enabled = sel;
                if (sel && this.placer.Selected != null) {
                    this.icon.sprite = this.placer.Selected.icon;
                }
                this.ring.color = !sel ? this.disabledColor.$clone() : (this.placer.CanPlace ? this.validColor.$clone() : this.readyColor.$clone());
                var s = 1.0;
                if (this.punch > 0.0) {
                    this.punch -= UnityEngine.Time.deltaTime;
                    s = 1.0 - 0.12 * Math.sin(this.punch / 0.15 * UnityEngine.Mathf.PI);
                }
                this.transform.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( s );
            },
            /*PlaceButton.Update end.*/


        }
    });
    /*PlaceButton end.*/

    /*PlayableConfig start.*/
    Bridge.define("PlayableConfig", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                I: null
            }
        },
        fields: {
            chooseText: null,
            moveHintText: null,
            lookHintText: null,
            selectHintText: null,
            placeHintText: null,
            endText: null,
            ctaText: null,
            moveText: null,
            hideHintAfter: 0,
            introDuration: 0,
            placeCountToEnd: 0,
            timeToStore: 0,
            autoStoreOnEnd: false,
            brightness: 0,
            bgmOn: false,
            bgmVolume: 0,
            sfxOn: false,
            sfxVolume: 0,
            bgmClip: null,
            npcCount: 0,
            npcMinRadius: 0,
            npcMaxRadius: 0,
            npcSpeed: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PlayableConfig#init", this ); }

                this.chooseText = "CHOOSE YOUR FAVOURITE COLOR";
                this.moveHintText = "Move to find a spot!";
                this.lookHintText = "Swipe to look around!";
                this.selectHintText = "Tap to pick up a block";
                this.placeHintText = "Tap PLACE to build!";
                this.endText = "Build your dream house!";
                this.ctaText = "PLAY NOW";
                this.moveText = "MOVE";
                this.hideHintAfter = 3;
                this.introDuration = 4.0;
                this.placeCountToEnd = 8;
                this.timeToStore = 30.0;
                this.autoStoreOnEnd = false;
                this.brightness = 1.1;
                this.bgmOn = true;
                this.bgmVolume = 0.85;
                this.sfxOn = true;
                this.sfxVolume = 1.0;
                this.npcCount = 4;
                this.npcMinRadius = 4.0;
                this.npcMaxRadius = 10.0;
                this.npcSpeed = 1.3;
            }
        },
        methods: {
            /*PlayableConfig.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PlayableConfig#Awake", this ); }

                PlayableConfig.I = this;
            },
            /*PlayableConfig.Awake end.*/


        }
    });
    /*PlayableConfig end.*/

    /*PopIn start.*/
    Bridge.define("PopIn", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            duration: 0,
            overshoot: 0,
            target: null,
            t: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "PopIn#init", this ); }

                this.target = new UnityEngine.Vector3();
                this.duration = 0.25;
                this.overshoot = 1.15;
            }
        },
        methods: {
            /*PopIn.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "PopIn#Awake", this ); }

                this.target = this.transform.localScale.$clone();
                this.transform.localScale = pc.Vec3.ZERO.clone();
            },
            /*PopIn.Awake end.*/

            /*PopIn.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "PopIn#Update", this ); }

                this.t += UnityEngine.Time.deltaTime / UnityEngine.Mathf.Max(0.01, this.duration);
                var k = this.t < 0.7 ? pc.math.lerp(0.0, this.overshoot, this.t / 0.7) : pc.math.lerp(this.overshoot, 1.0, (this.t - 0.7) / 0.3);
                this.transform.localScale = this.target.$clone().clone().scale( k );
                if (this.t >= 1.0) {
                    this.transform.localScale = this.target.$clone();
                    UnityEngine.Object.Destroy(this);
                }
            },
            /*PopIn.Update end.*/


        }
    });
    /*PopIn end.*/

    /*Sfx start.*/
    Bridge.define("Sfx", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                I: null
            },
            props: {
                SfxEnabled: {
                    get: function () {
if ( TRACE ) { TRACE( "Sfx#SfxEnabled#get", this ); }

                        return UnityEngine.MonoBehaviour.op_Equality(PlayableConfig.I, null) || PlayableConfig.I.sfxOn;
                    }
                },
                Vol: {
                    get: function () {
if ( TRACE ) { TRACE( "Sfx#Vol#get", this ); }

                        return UnityEngine.MonoBehaviour.op_Inequality(PlayableConfig.I, null) ? PlayableConfig.I.sfxVolume : 1.0;
                    }
                }
            },
            methods: {
                /*Sfx.Play:static start.*/
                Play: function (c, pitch) {
if ( TRACE ) { TRACE( "Sfx#Play", this ); }

                    if (pitch === void 0) { pitch = 1.0; }
                    if (UnityEngine.MonoBehaviour.op_Equality(Sfx.I, null) || c == null || !Sfx.SfxEnabled) {
                        return;
                    }
                    Sfx.I.source.pitch = pitch;
                    Sfx.I.source.PlayOneShot$1(c, Sfx.Vol);
                },
                /*Sfx.Play:static end.*/

                /*Sfx.Click:static start.*/
                Click: function () {
if ( TRACE ) { TRACE( "Sfx#Click", this ); }

                    if (UnityEngine.MonoBehaviour.op_Inequality(Sfx.I, null)) {
                        Sfx.Play(Sfx.I.click);
                    }
                },
                /*Sfx.Click:static end.*/

                /*Sfx.Extra:static start.*/
                Extra: function () {
if ( TRACE ) { TRACE( "Sfx#Extra", this ); }

                    if (UnityEngine.MonoBehaviour.op_Inequality(Sfx.I, null)) {
                        Sfx.Play(Sfx.I.extra);
                    }
                },
                /*Sfx.Extra:static end.*/

                /*Sfx.Place:static start.*/
                Place: function () {
if ( TRACE ) { TRACE( "Sfx#Place", this ); }

                    var $t;
                    if (UnityEngine.MonoBehaviour.op_Equality(Sfx.I, null) || Sfx.I.place == null || Sfx.I.place.length === 0) {
                        return;
                    }
                    var i = UnityEngine.Random.Range(0, Sfx.I.place.length);
                    if (Sfx.I.place.length > 1 && i === Sfx.I.lastPlace) {
                        i = (((i + 1) | 0)) % Sfx.I.place.length;
                    }
                    Sfx.I.lastPlace = i;
                    Sfx.Play(($t = Sfx.I.place)[i], UnityEngine.Random.Range$1(0.95, 1.05));
                },
                /*Sfx.Place:static end.*/


            }
        },
        fields: {
            source: null,
            click: null,
            place: null,
            extra: null,
            lastPlace: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "Sfx#init", this ); }

                this.lastPlace = -1;
            }
        },
        methods: {
            /*Sfx.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "Sfx#Awake", this ); }

                Sfx.I = this;
                if (UnityEngine.Component.op_Equality(this.source, null)) {
                    this.source = this.GetComponent(UnityEngine.AudioSource);
                }
            },
            /*Sfx.Awake end.*/


        }
    });
    /*Sfx end.*/

    /*TextBorder start.*/
    Bridge.define("TextBorder", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            color: null,
            size: 0,
            eightDirections: false,
            src: null,
            copies: null,
            offsets: null,
            rt: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "TextBorder#init", this ); }

                this.color = new UnityEngine.Color();
                this.color = new pc.Color( 0.12, 0.12, 0.12, 1.0 );
                this.size = 4.0;
                this.eightDirections = true;
            }
        },
        methods: {
            /*TextBorder.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "TextBorder#Awake", this ); }

                this.src = this.GetComponent(UnityEngine.UI.Text);
                this.rt = Bridge.cast(this.transform, UnityEngine.RectTransform);
                this.Build();
            },
            /*TextBorder.Awake end.*/

            /*TextBorder.Build start.*/
            Build: function () {
if ( TRACE ) { TRACE( "TextBorder#Build", this ); }

                if (this.copies != null) {
                    return;
                }
                this.offsets = this.eightDirections ? System.Array.init([new pc.Vec2( -1, -1 ), new pc.Vec2( 0, -1 ), new pc.Vec2( 1, -1 ), new pc.Vec2( -1, 0 ), new pc.Vec2( 1, 0 ), new pc.Vec2( -1, 1 ), new pc.Vec2( 0, 1 ), new pc.Vec2( 1, 1 )], UnityEngine.Vector2) : System.Array.init([new pc.Vec2( -1, 0 ), new pc.Vec2( 1, 0 ), new pc.Vec2( 0, -1 ), new pc.Vec2( 0, 1 )], UnityEngine.Vector2);
                this.copies = System.Array.init(this.offsets.length, null, UnityEngine.UI.Text);
                var parent = this.transform.parent;
                var idx = this.transform.GetSiblingIndex();
                for (var i = 0; i < this.offsets.length; i = (i + 1) | 0) {
                    var go = new UnityEngine.GameObject.$ctor3((this.name || "") + "_Border" + i, UnityEngine.RectTransform);
                    var crt = Bridge.cast(go.transform, UnityEngine.RectTransform);
                    crt.SetParent(parent, false);
                    crt.SetSiblingIndex(idx); // nằm trước chữ gốc => vẽ phía sau
                    var t = go.AddComponent(UnityEngine.UI.Text);
                    t.raycastTarget = false;
                    this.copies[i] = t;
                }
                this.Sync();
            },
            /*TextBorder.Build end.*/

            /*TextBorder.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "TextBorder#OnEnable", this ); }

                this.SetCopiesActive(true);
            },
            /*TextBorder.OnEnable end.*/

            /*TextBorder.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "TextBorder#OnDisable", this ); }

                this.SetCopiesActive(false);
            },
            /*TextBorder.OnDisable end.*/

            /*TextBorder.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "TextBorder#OnDestroy", this ); }

                if (this.copies == null) {
                    return;
                }
                for (var i = 0; i < this.copies.length; i = (i + 1) | 0) {
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.copies[i], null)) {
                        UnityEngine.MonoBehaviour.Destroy(this.copies[i].gameObject);
                    }
                }
            },
            /*TextBorder.OnDestroy end.*/

            /*TextBorder.SetCopiesActive start.*/
            SetCopiesActive: function (on) {
if ( TRACE ) { TRACE( "TextBorder#SetCopiesActive", this ); }

                if (this.copies == null) {
                    return;
                }
                for (var i = 0; i < this.copies.length; i = (i + 1) | 0) {
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.copies[i], null)) {
                        this.copies[i].gameObject.SetActive(on);
                    }
                }
            },
            /*TextBorder.SetCopiesActive end.*/

            /*TextBorder.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "TextBorder#LateUpdate", this ); }

                this.Sync();
            },
            /*TextBorder.LateUpdate end.*/

            /*TextBorder.Sync start.*/
            Sync: function () {
if ( TRACE ) { TRACE( "TextBorder#Sync", this ); }

                if (this.copies == null || UnityEngine.MonoBehaviour.op_Equality(this.src, null)) {
                    return;
                }
                var c = this.color.$clone();
                c.a *= this.src.color.a;
                for (var i = 0; i < this.copies.length; i = (i + 1) | 0) {
                    var t = this.copies[i];
                    if (UnityEngine.MonoBehaviour.op_Equality(t, null)) {
                        continue;
                    }
                    var crt = Bridge.cast(t.transform, UnityEngine.RectTransform);
                    crt.anchorMin = this.rt.anchorMin.$clone();
                    crt.anchorMax = this.rt.anchorMax.$clone();
                    crt.pivot = this.rt.pivot.$clone();
                    crt.sizeDelta = this.rt.sizeDelta.$clone();
                    crt.localScale = this.rt.localScale.$clone();
                    crt.localRotation = this.rt.localRotation.$clone();
                    crt.anchoredPosition = this.rt.anchoredPosition.$clone().add( this.offsets[i].$clone().scale( this.size ).scale( this.rt.localScale.x ) );
                    if (!Bridge.referenceEquals(t.text, this.src.text)) {
                        t.text = this.src.text;
                    }
                    t.font = this.src.font;
                    t.fontSize = this.src.fontSize;
                    t.fontStyle = this.src.fontStyle;
                    t.alignment = this.src.alignment;
                    t.horizontalOverflow = this.src.horizontalOverflow;
                    t.verticalOverflow = this.src.verticalOverflow;
                    t.resizeTextForBestFit = this.src.resizeTextForBestFit;
                    t.color = c.$clone();
                }
            },
            /*TextBorder.Sync end.*/


        }
    });
    /*TextBorder end.*/

    /*TouchArea start.*/
    Bridge.define("TouchArea", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            player: null,
            pointerId: 0
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "TouchArea#init", this ); }

                this.pointerId = -2147483648;
            }
        },
        methods: {
            /*TouchArea.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "TouchArea#OnPointerDown", this ); }

                if (this.pointerId === -2147483648) {
                    this.pointerId = e.pointerId;
                }
            },
            /*TouchArea.OnPointerDown end.*/

            /*TouchArea.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "TouchArea#OnDrag", this ); }

                if (e.pointerId === this.pointerId && UnityEngine.MonoBehaviour.op_Inequality(this.player, null)) {
                    this.player.AddLook(e.delta);
                }
            },
            /*TouchArea.OnDrag end.*/

            /*TouchArea.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "TouchArea#OnPointerUp", this ); }

                if (e.pointerId === this.pointerId) {
                    this.pointerId = -2147483648;
                }
            },
            /*TouchArea.OnPointerUp end.*/


        }
    });
    /*TouchArea end.*/

    /*TutorialHud start.*/
    Bridge.define("TutorialHud", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                shownOnce: false
            }
        },
        fields: {
            placer: null,
            hotbar: null,
            player: null,
            joystick: null,
            placeButton: null,
            hand: null,
            hint: null,
            moveLabel: null,
            dim: null,
            tutorialLayer: null,
            moveDistanceToPass: 0,
            lookAngleToPass: 0,
            step: 0,
            target: null,
            startPos: null,
            startYaw: 0,
            hooked: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "TutorialHud#init", this ); }

                this.startPos = new UnityEngine.Vector3();
                this.moveDistanceToPass = 1.5;
                this.lookAngleToPass = 35.0;
                this.step = TutorialHud.Step.Done;
            }
        },
        methods: {
            /*TutorialHud.Begin start.*/
            Begin: function () {
if ( TRACE ) { TRACE( "TutorialHud#Begin", this ); }

                var cfg = PlayableConfig.I;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.moveLabel, null) && UnityEngine.MonoBehaviour.op_Inequality(cfg, null)) {
                    this.moveLabel.text = cfg.moveText;
                }
                if (!this.hooked) {
                    this.placer.addOnSelected(Bridge.fn.cacheBind(this, this.OnSelected));
                    this.placer.addOnPlaced(Bridge.fn.cacheBind(this, this.OnPlaced));
                    this.hooked = true;
                }
                if (TutorialHud.shownOnce) {
                    this.Finish();
                    return;
                }
                TutorialHud.shownOnce = true;
                this.hand.gameObject.SetActive(true);
                this.GoMove();
            },
            /*TutorialHud.Begin end.*/

            /*TutorialHud.GoMove start.*/
            GoMove: function () {
if ( TRACE ) { TRACE( "TutorialHud#GoMove", this ); }

                this.step = TutorialHud.Step.Move;
                this.startPos = UnityEngine.MonoBehaviour.op_Inequality(this.player, null) ? this.player.transform.position.$clone() : pc.Vec3.ZERO.clone();
                this.target = this.joystick;
                var cfg = PlayableConfig.I;
                this.SetHint(UnityEngine.MonoBehaviour.op_Inequality(cfg, null) ? cfg.moveHintText : "Move to find a spot!");
                this.Highlight(this.joystick);
            },
            /*TutorialHud.GoMove end.*/

            /*TutorialHud.GoLook start.*/
            GoLook: function () {
if ( TRACE ) { TRACE( "TutorialHud#GoLook", this ); }

                this.step = TutorialHud.Step.Look;
                this.startYaw = UnityEngine.MonoBehaviour.op_Inequality(this.player, null) ? this.player.Yaw : 0.0;
                this.target = null;
                var cfg = PlayableConfig.I;
                this.SetHint(UnityEngine.MonoBehaviour.op_Inequality(cfg, null) ? cfg.lookHintText : "Swipe to look around!");
                this.Highlight(null); // chỉ tối nền, không nổi phần nào
            },
            /*TutorialHud.GoLook end.*/

            /*TutorialHud.GoSelect start.*/
            GoSelect: function () {
if ( TRACE ) { TRACE( "TutorialHud#GoSelect", this ); }

                this.step = TutorialHud.Step.Select;
                this.target = this.hotbar.Slot(0);
                var cfg = PlayableConfig.I;
                this.SetHint(UnityEngine.MonoBehaviour.op_Inequality(cfg, null) ? cfg.selectHintText : "Tap to pick up a block");
                this.Highlight(Bridge.as(this.hotbar.transform, UnityEngine.RectTransform));
            },
            /*TutorialHud.GoSelect end.*/

            /*TutorialHud.Finish start.*/
            Finish: function () {
if ( TRACE ) { TRACE( "TutorialHud#Finish", this ); }

                this.step = TutorialHud.Step.Done;
                this.hand.gameObject.SetActive(false);
                this.HideDim();
                if (UnityEngine.MonoBehaviour.op_Inequality(this.hint, null)) {
                    this.hint.gameObject.SetActive(false);
                }
            },
            /*TutorialHud.Finish end.*/

            /*TutorialHud.Highlight start.*/
            Highlight: function (t) {
if ( TRACE ) { TRACE( "TutorialHud#Highlight", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.dim, null)) {
                    return;
                }
                this.dim.gameObject.SetActive(true);
                this.dim.transform.SetAsLastSibling();
                if (UnityEngine.Component.op_Inequality(t, null)) {
                    var top = t;
                    while (UnityEngine.Component.op_Inequality(top, null) && UnityEngine.Component.op_Inequality(top.parent, this.transform)) {
                        top = top.parent;
                    }
                    if (UnityEngine.Component.op_Inequality(top, null)) {
                        top.SetAsLastSibling();
                    }
                }
                if (UnityEngine.Component.op_Inequality(this.tutorialLayer, null)) {
                    this.tutorialLayer.SetAsLastSibling();
                }
            },
            /*TutorialHud.Highlight end.*/

            /*TutorialHud.HideDim start.*/
            HideDim: function () {
if ( TRACE ) { TRACE( "TutorialHud#HideDim", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.dim, null)) {
                    this.dim.gameObject.SetActive(false);
                }
            },
            /*TutorialHud.HideDim end.*/

            /*TutorialHud.SetHint start.*/
            SetHint: function (s) {
if ( TRACE ) { TRACE( "TutorialHud#SetHint", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.hint, null)) {
                    this.hint.text = s;
                    this.hint.gameObject.SetActive(true);
                }
            },
            /*TutorialHud.SetHint end.*/

            /*TutorialHud.GoPlaceHand start.*/
            GoPlaceHand: function () {
if ( TRACE ) { TRACE( "TutorialHud#GoPlaceHand", this ); }

                this.step = TutorialHud.Step.PlaceHand;
                this.target = this.placeButton;
                this.HideDim();
                if (UnityEngine.MonoBehaviour.op_Inequality(this.hint, null)) {
                    this.hint.gameObject.SetActive(false);
                }
                this.hand.gameObject.SetActive(true);
            },
            /*TutorialHud.GoPlaceHand end.*/

            /*TutorialHud.OnSelected start.*/
            OnSelected: function (i) {
if ( TRACE ) { TRACE( "TutorialHud#OnSelected", this ); }

                if (this.step === TutorialHud.Step.Move || this.step === TutorialHud.Step.Look || this.step === TutorialHud.Step.Select) {
                    this.GoPlaceHand();
                }
            },
            /*TutorialHud.OnSelected end.*/

            /*TutorialHud.OnPlaced start.*/
            OnPlaced: function (n) {
if ( TRACE ) { TRACE( "TutorialHud#OnPlaced", this ); }

                this.Finish();
            },
            /*TutorialHud.OnPlaced end.*/

            /*TutorialHud.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "TutorialHud#Update", this ); }

                if (this.step === TutorialHud.Step.Done) {
                    return;
                }

                if (this.step === TutorialHud.Step.Move && UnityEngine.MonoBehaviour.op_Inequality(this.player, null)) {
                    var d = this.player.transform.position.$clone().sub( this.startPos );
                    d.y = 0.0;
                    if (d.length() >= this.moveDistanceToPass) {
                        this.GoLook();
                    }
                } else if (this.step === TutorialHud.Step.Look && UnityEngine.MonoBehaviour.op_Inequality(this.player, null)) {
                    if (Math.abs(UnityEngine.Mathf.DeltaAngle(this.startYaw, this.player.Yaw)) >= this.lookAngleToPass) {
                        this.GoSelect();
                    }
                }

                if (!this.hand.gameObject.activeSelf) {
                    return;
                }
                var u = UnityEngine.Component.op_Inequality(this.hand.parent, null) ? this.hand.parent.lossyScale.x : 1.0;
                if (this.step === TutorialHud.Step.Move && UnityEngine.Component.op_Inequality(this.target, null)) {
                    // tay kéo từ tâm joystick lên trên rồi quay lại
                    var k = pc.math.smoothstep(0.0, 1.0, UnityEngine.Mathf.PingPong(UnityEngine.Time.time * 1.4, 1.0));
                    this.hand.position = this.target.position.$clone().add( new pc.Vec3( 20.0, -40.0 + 90.0 * k, 0.0 ).clone().scale( u ) );
                    this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( 0.95 );
                } else if (this.step === TutorialHud.Step.Look) {
                    // tay vuốt ngang qua giữa màn hình
                    var area = Bridge.as(this.hand.parent, UnityEngine.RectTransform);
                    var center = UnityEngine.Component.op_Inequality(area, null) ? area.position.$clone() : new pc.Vec3( UnityEngine.Screen.width * 0.5, UnityEngine.Screen.height * 0.5, 0.0 );
                    var k1 = pc.math.smoothstep(0.0, 1.0, UnityEngine.Mathf.PingPong(UnityEngine.Time.time * 0.9, 1.0));
                    this.hand.position = center.$clone().add( new pc.Vec3( pc.math.lerp(-220.0, 220.0, k1), -60.0, 0.0 ).clone().scale( u ) );
                    this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( 0.95 );
                } else if (UnityEngine.Component.op_Inequality(this.target, null)) {
                    // tay nhấn nhấn vào ô block / nút PLACE
                    var k2 = Math.abs(Math.sin(UnityEngine.Time.time * 4.0));
                    this.hand.position = this.target.position.$clone().add( new pc.Vec3( 25.0, -55.0 + 18.0 * k2, 0.0 ).clone().scale( u ) );
                    this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.0 - 0.08 * (1.0 - k2)) );
                }
            },
            /*TutorialHud.Update end.*/


        }
    });
    /*TutorialHud end.*/

    /*TutorialHud+Step start.*/
    Bridge.define("TutorialHud.Step", {
        $kind: 1006,
        statics: {
            fields: {
                Move: 0,
                Look: 1,
                Select: 2,
                PlaceHand: 3,
                Done: 4
            }
        }
    });
    /*TutorialHud+Step end.*/

    /*ThirdPersonController start.*/
    Bridge.define("ThirdPersonController", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*ThirdPersonController.IgnoreForCamera:static start.*/
                IgnoreForCamera: function (c) {
if ( TRACE ) { TRACE( "ThirdPersonController#IgnoreForCamera", this ); }

                    if (UnityEngine.Component.op_Equality(c, null)) {
                        return true;
                    }
                    var n = c.name;
                    return System.String.contains(n,"Leaves") || System.String.contains(n,"Grass") && !System.String.contains(n,"Block") || System.String.contains(n,"Flower") || System.String.contains(n,"Vines") || System.String.contains(n,"Lily");
                },
                /*ThirdPersonController.IgnoreForCamera:static end.*/


            }
        },
        fields: {
            cam: null,
            joystick: null,
            pivotHeight: 0,
            camOffset: null,
            camOffsetPortrait: null,
            startPitch: 0,
            moveSpeed: 0,
            turnSpeed: 0,
            lookSensitivity: 0,
            stepHeight: 0,
            maxDrop: 0,
            bodyRadius: 0,
            camMinDistance: 0,
            camFollowSharpness: 0,
            groundMask: null,
            inputEnabled: false,
            walker: null,
            yaw: 0,
            pitch: 0,
            controlling: false,
            camDist: 0,
            groundHeight: 0
        },
        props: {
            Yaw: {
                get: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#Yaw#get", this ); }

                    return this.controlling ? this.yaw : this.transform.eulerAngles.y;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#init", this ); }

                this.camOffset = new UnityEngine.Vector3();
                this.camOffsetPortrait = new UnityEngine.Vector3();
                this.groundMask = new UnityEngine.LayerMask();
                this.pivotHeight = 1.25;
                this.camOffset = new pc.Vec3( 0.55, 0.15, -3.8 );
                this.camOffsetPortrait = new pc.Vec3( 0.35, 0.1, -4.8 );
                this.startPitch = 16.0;
                this.moveSpeed = 2.6;
                this.turnSpeed = 720.0;
                this.lookSensitivity = 0.2;
                this.stepHeight = 0.8;
                this.maxDrop = 0.8;
                this.bodyRadius = 0.25;
                this.camMinDistance = 1.6;
                this.camFollowSharpness = 12.0;
                this.groundMask = UnityEngine.LayerMask.op_Implicit$1(-1);
                this.camDist = -1.0;
            }
        },
        methods: {
            /*ThirdPersonController.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#Awake", this ); }

                this.walker = this.GetComponent(CharacterWalker);
                this.pitch = this.startPitch;
            },
            /*ThirdPersonController.Awake end.*/

            /*ThirdPersonController.BeginControl start.*/
            BeginControl: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#BeginControl", this ); }

                this.yaw = this.transform.eulerAngles.y;
                this.pitch = this.startPitch;
                this.walker.Stop();
                this.walker.externalControl = true;
                this.walker.externalMoving = false;
                this.controlling = true;
                this.inputEnabled = true;
                this.camDist = -1.0;
                this.groundHeight = this.transform.position.y;
            },
            /*ThirdPersonController.BeginControl end.*/

            /*ThirdPersonController.EndControl start.*/
            EndControl: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#EndControl", this ); }

                this.inputEnabled = false;
                this.walker.externalMoving = false;
            },
            /*ThirdPersonController.EndControl end.*/

            /*ThirdPersonController.GetCameraPose start.*/
            GetCameraPose: function (pos, rot) {
if ( TRACE ) { TRACE( "ThirdPersonController#GetCameraPose", this ); }

                var y = this.controlling ? this.yaw : this.transform.eulerAngles.y;
                rot.v = new pc.Quat().setFromEulerAngles_Unity( this.pitch, y, 0.0 );
                var piv = this.transform.position.$clone().add( pc.Vec3.UP.clone().clone().scale( this.pivotHeight ) );
                var off = UnityEngine.Screen.height > UnityEngine.Screen.width ? this.camOffsetPortrait.$clone() : this.camOffset.$clone();
                var full = piv.$clone().add( rot.v.transformVector( off ) );
                var d = full.$clone().sub( piv );
                var len = d.length();
                var allowed = len;
                if (len > 0.01) {
                    var hits = UnityEngine.Physics.RaycastAll$2(piv, d.$clone().scale( 1.0 / ( len ) ), len + 0.2, UnityEngine.LayerMask.op_Implicit(this.groundMask.$clone()));
                    for (var i = 0; i < hits.length; i = (i + 1) | 0) {
                        if (ThirdPersonController.IgnoreForCamera(hits[i].collider)) {
                            continue;
                        }
                        if (hits[i].distance - 0.2 < allowed) {
                            allowed = hits[i].distance - 0.2;
                        }
                    }
                }
                allowed = UnityEngine.Mathf.Max(this.camMinDistance, allowed);
                pos.v = piv.$clone().add( d.$clone().scale( 1.0 / ( UnityEngine.Mathf.Max(0.001, len) ) ).clone().scale( UnityEngine.Mathf.Min(len, allowed) ) );
            },
            /*ThirdPersonController.GetCameraPose end.*/

            /*ThirdPersonController.AddLook start.*/
            AddLook: function (screenDelta) {
if ( TRACE ) { TRACE( "ThirdPersonController#AddLook", this ); }

                if (!this.inputEnabled) {
                    return;
                }
                var k = this.lookSensitivity * 1080.0 / UnityEngine.Mathf.Max(1.0, UnityEngine.Mathf.Min(UnityEngine.Screen.width, UnityEngine.Screen.height));
                this.yaw += screenDelta.x * k;
                this.pitch = Math.max(-20.0, Math.min(this.pitch - screenDelta.y * k, 55.0));
            },
            /*ThirdPersonController.AddLook end.*/

            /*ThirdPersonController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#Update", this ); }

                if (!this.controlling) {
                    return;
                }
                var moving = false;
                if (this.inputEnabled && UnityEngine.MonoBehaviour.op_Inequality(this.joystick, null)) {
                    var j = this.joystick.Value.$clone();
                    if (j.lengthSq() > 0.01) {
                        var yr = new pc.Quat().setFromEulerAngles_Unity( 0, this.yaw, 0 );
                        var dir = (yr.transformVector( new pc.Vec3( 0, 0, 1 ) ).clone().scale( j.y ).add( yr.transformVector( pc.Vec3.RIGHT.clone() ).clone().scale( j.x ) ));
                        dir.y = 0.0;
                        var mag = UnityEngine.Mathf.Min(1.0, j.length());
                        dir.normalize();
                        // quay mặt theo hướng đi
                        this.transform.rotation = pc.Quat.rotateTowards( this.transform.rotation.$clone(), new pc.Quat().lookRotation( dir, pc.Vec3.UP ), this.turnSpeed * UnityEngine.Time.deltaTime );
                        moving = this.TryMove(dir.$clone().clone().scale( this.moveSpeed ).clone().scale( mag ).clone().scale( UnityEngine.Time.deltaTime ));
                        // trượt dọc vật cản nếu bị chặn thẳng
                        if (!moving) {
                            var a = new pc.Vec3( dir.x, 0, 0 ), b = new pc.Vec3( 0, 0, dir.z );
                            moving = this.TryMove(a.$clone().clone().scale( this.moveSpeed ).clone().scale( mag ).clone().scale( UnityEngine.Time.deltaTime )) || this.TryMove(b.$clone().clone().scale( this.moveSpeed ).clone().scale( mag ).clone().scale( UnityEngine.Time.deltaTime ));
                        }
                        this.walker.speedMultiplier = UnityEngine.Mathf.Max(0.6, mag);
                    }
                }
                this.walker.externalMoving = moving;
            },
            /*ThirdPersonController.Update end.*/

            /*ThirdPersonController.TryMove start.*/
            TryMove: function (mv) {
if ( TRACE ) { TRACE( "ThirdPersonController#TryMove", this ); }

                if (mv.lengthSq() < 1E-08) {
                    return false;
                }
                var np = this.transform.position.$clone().add( mv );
                var h = { v : new UnityEngine.RaycastHit() };
                if (!this.FindGround(np.$clone(), h)) {
                    return false;
                }
                var dy = h.v.point.y - this.groundHeight;
                if (dy > this.stepHeight) {
                    return false;
                } // tường cao
                if (-dy > this.maxDrop) {
                    return false;
                } // hố / sông sâu
                // vật cản ngang thân (bỏ qua lá, hoa)
                var hs = UnityEngine.Physics.RaycastAll$2(this.transform.position.$clone().add( pc.Vec3.UP.clone().clone().scale( 0.9 ) ), mv.clone().normalize(), mv.length() + this.bodyRadius, UnityEngine.LayerMask.op_Implicit(this.groundMask.$clone()));
                for (var i = 0; i < hs.length; i = (i + 1) | 0) {
                    if (!ThirdPersonController.IgnoreForCamera(hs[i].collider)) {
                        return false;
                    }
                }
                this.groundHeight = h.v.point.y;
                np.y = this.transform.position.y;
                this.transform.position = np.$clone();
                return true;
            },
            /*ThirdPersonController.TryMove end.*/

            /*ThirdPersonController.FindGround start.*/
            FindGround: function (p, best) {
if ( TRACE ) { TRACE( "ThirdPersonController#FindGround", this ); }

                best.v = Bridge.getDefaultValue(UnityEngine.RaycastHit);
                p.y = this.groundHeight;
                var hs = UnityEngine.Physics.RaycastAll$2(p.$clone().add( pc.Vec3.UP.clone().clone().scale( (this.stepHeight + 0.05) ) ), pc.Vec3.DOWN.clone(), this.stepHeight + 3.0, UnityEngine.LayerMask.op_Implicit(this.groundMask.$clone()));
                var top = Number.NEGATIVE_INFINITY;
                var ok = false;
                for (var i = 0; i < hs.length; i = (i + 1) | 0) {
                    if (ThirdPersonController.IgnoreForCamera(hs[i].collider)) {
                        continue;
                    }
                    if (hs[i].point.y > top) {
                        top = hs[i].point.y;
                        best.v = hs[i].$clone();
                        ok = true;
                    }
                }
                return ok;
            },
            /*ThirdPersonController.FindGround end.*/

            /*ThirdPersonController.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "ThirdPersonController#LateUpdate", this ); }

                if (!this.controlling) {
                    return;
                }
                var feet = this.transform.position.$clone();
                feet.y = pc.math.lerp(feet.y, this.groundHeight, 1.0 - UnityEngine.Mathf.Exp(-18.0 * UnityEngine.Time.deltaTime));
                this.transform.position = feet.$clone();
                if (UnityEngine.Component.op_Equality(this.cam, null)) {
                    return;
                }
                var p = { v : new UnityEngine.Vector3() };
                var r = { v : new UnityEngine.Quaternion() };
                this.GetCameraPose(p, r);
                // làm mượt khoảng cách để camera không giật khi đi qua vật cản
                var piv = this.transform.position.$clone().add( pc.Vec3.UP.clone().clone().scale( this.pivotHeight ) );
                var target = (p.v.$clone().sub( piv )).length();
                this.camDist = this.camDist < 0.0 ? target : pc.math.lerp(this.camDist, target, 1.0 - UnityEngine.Mathf.Exp(-this.camFollowSharpness * UnityEngine.Time.deltaTime));
                var dir = (p.v.$clone().sub( piv )).clone().normalize().$clone();
                this.cam.transform.SetPositionAndRotation(piv.$clone().add( dir.$clone().clone().scale( this.camDist ) ), r.v);
            },
            /*ThirdPersonController.LateUpdate end.*/


        }
    });
    /*ThirdPersonController end.*/

    /*TreeRecolor start.*/
    Bridge.define("TreeRecolor", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            leafRenderers: null,
            pinkLeaves: null,
            blueLeaves: null,
            burstFx: null
        },
        methods: {
            /*TreeRecolor.Apply start.*/
            Apply: function (pink) {
if ( TRACE ) { TRACE( "TreeRecolor#Apply", this ); }

                var m = pink ? this.pinkLeaves : this.blueLeaves;
                for (var i = 0; i < this.leafRenderers.length; i = (i + 1) | 0) {
                    if (UnityEngine.Component.op_Equality(this.leafRenderers[i], null)) {
                        continue;
                    }
                    var arr = this.leafRenderers[i].sharedMaterials;
                    for (var k = 0; k < arr.length; k = (k + 1) | 0) {
                        arr[k] = m;
                    }
                    this.leafRenderers[i].sharedMaterials = arr;
                    BrightnessApplier.Apply(this.leafRenderers[i]);
                }
                if (UnityEngine.Component.op_Inequality(this.burstFx, null)) {
                    var main = this.burstFx.main;
                    main.startColor = new pc.MinMaxGradient( pink ? new pc.Color( 1.0, 0.6, 0.8, 1 ) : new pc.Color( 0.55, 0.8, 1.0, 1 ) );
                    this.burstFx.Play();
                }
            },
            /*TreeRecolor.Apply end.*/


        }
    });
    /*TreeRecolor end.*/

    /*VirtualJoystick start.*/
    Bridge.define("VirtualJoystick", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            background: null,
            knob: null,
            radius: 0,
            Value: null
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "VirtualJoystick#init", this ); }

                this.Value = new UnityEngine.Vector2();
                this.radius = 90.0;
            }
        },
        methods: {
            /*VirtualJoystick.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "VirtualJoystick#OnPointerDown", this ); }

                this.OnDrag(e);
            },
            /*VirtualJoystick.OnPointerDown end.*/

            /*VirtualJoystick.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "VirtualJoystick#OnDrag", this ); }

                var local = { v : new UnityEngine.Vector2() };
                UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.background, e.position, e.pressEventCamera, local);
                local.v = pc.Vec2.lengthClamp( local.v, this.radius );
                this.knob.anchoredPosition = local.v.$clone();
                this.Value = local.v.$clone().scale( 1.0 / ( this.radius ) );
            },
            /*VirtualJoystick.OnDrag end.*/

            /*VirtualJoystick.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "VirtualJoystick#OnPointerUp", this ); }

                this.Value = pc.Vec2.ZERO.clone();
                this.knob.anchoredPosition = pc.Vec2.ZERO.clone();
            },
            /*VirtualJoystick.OnPointerUp end.*/

            /*VirtualJoystick.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "VirtualJoystick#OnDisable", this ); }

                this.Value = pc.Vec2.ZERO.clone();
                if (UnityEngine.Object.op_Implicit(this.knob)) {
                    this.knob.anchoredPosition = pc.Vec2.ZERO.clone();
                }
            },
            /*VirtualJoystick.OnDisable end.*/


        }
    });
    /*VirtualJoystick end.*/

    if ( MODULE_reflection ) {
    var $m = Bridge.setMetadata,
        $n = ["System","UnityEngine","System.Collections.Generic","UnityEngine.UI","System.Collections","UnityEngine.EventSystems"];

    /*BlockDef start.*/
    $m("BlockDef", function () { return {"att":1056769,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"displayName","t":4,"rt":$n[0].String,"sn":"displayName"},{"a":2,"n":"faceCamera","t":4,"rt":$n[0].Boolean,"sn":"faceCamera","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"heightCells","t":4,"rt":$n[0].Int32,"sn":"heightCells","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"icon","t":4,"rt":$n[1].Sprite,"sn":"icon"},{"a":2,"n":"lengthCells","t":4,"rt":$n[0].Int32,"sn":"lengthCells","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"prefab","t":4,"rt":$n[1].GameObject,"sn":"prefab"}]}; }, $n);
    /*BlockDef end.*/

    /*BlockPlacer start.*/
    $m("BlockPlacer", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"IsFree","t":8,"pi":[{"n":"c","pt":$n[1].Vector3,"ps":0},{"n":"heightCells","pt":$n[0].Int32,"ps":1},{"n":"lengthCells","pt":$n[0].Int32,"ps":2},{"n":"rot","pt":$n[1].Quaternion,"ps":3}],"sn":"IsFree","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[0].Int32,$n[0].Int32,$n[1].Quaternion],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"PlaceAtTarget","t":8,"sn":"PlaceAtTarget","rt":$n[0].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Select","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"Select","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":2,"n":"SetPalette","t":8,"pi":[{"n":"pink","pt":$n[0].Boolean,"ps":0}],"sn":"SetPalette","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":2,"n":"Snap","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"Snap","rt":$n[1].Vector3,"p":[$n[1].Vector3]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"CanPlace","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_CanPlace","t":8,"rt":$n[0].Boolean,"fg":"CanPlace","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanPlace"},{"a":2,"n":"HasSelection","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_HasSelection","t":8,"rt":$n[0].Boolean,"fg":"HasSelection","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"HasSelection"},{"a":2,"n":"PlacedCount","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_PlacedCount","t":8,"rt":$n[0].Int32,"fg":"PlacedCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_PlacedCount","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"PlacedCount"},"fn":"PlacedCount"},{"a":2,"n":"Selected","t":16,"rt":BlockDef,"g":{"a":2,"n":"get_Selected","t":8,"rt":BlockDef,"fg":"Selected"},"fn":"Selected"},{"a":1,"n":"active","t":4,"rt":System.Array.type(BlockDef),"sn":"active"},{"a":2,"n":"blocksRoot","t":4,"rt":$n[1].Transform,"sn":"blocksRoot"},{"a":2,"n":"blueBlocks","t":4,"rt":System.Array.type(BlockDef),"sn":"blueBlocks"},{"a":2,"n":"cam","t":4,"rt":$n[1].Camera,"sn":"cam"},{"a":2,"n":"cell","t":4,"rt":$n[0].Single,"sn":"cell","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"gridOrigin","t":4,"rt":$n[1].Vector3,"sn":"gridOrigin"},{"a":1,"n":"hasTarget","t":4,"rt":$n[0].Boolean,"sn":"hasTarget","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"hotbar","t":4,"rt":HotbarUI,"sn":"hotbar"},{"a":2,"n":"inputEnabled","t":4,"rt":$n[0].Boolean,"sn":"inputEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"pinkBlocks","t":4,"rt":System.Array.type(BlockDef),"sn":"pinkBlocks"},{"a":2,"n":"placeFx","t":4,"rt":$n[1].ParticleSystem,"sn":"placeFx"},{"a":2,"n":"placeMask","t":4,"rt":$n[1].LayerMask,"sn":"placeMask"},{"a":2,"n":"player","t":4,"rt":$n[1].Transform,"sn":"player"},{"a":2,"n":"preview","t":4,"rt":$n[1].Transform,"sn":"preview"},{"a":2,"n":"reach","t":4,"rt":$n[0].Single,"sn":"reach","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"selected","t":4,"rt":$n[0].Int32,"sn":"selected","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"sfx","t":4,"rt":$n[1].AudioSource,"sn":"sfx"},{"a":1,"n":"targetCell","t":4,"rt":$n[1].Vector3,"sn":"targetCell"},{"a":1,"n":"targetRot","t":4,"rt":$n[1].Quaternion,"sn":"targetRot"},{"a":2,"n":"OnPlaced","t":2,"ad":{"a":2,"n":"add_OnPlaced","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addOnPlaced","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_OnPlaced","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeOnPlaced","rt":$n[0].Void,"p":[Function]}},{"a":2,"n":"OnSelected","t":2,"ad":{"a":2,"n":"add_OnSelected","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addOnSelected","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_OnSelected","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeOnSelected","rt":$n[0].Void,"p":[Function]}},{"a":1,"backing":true,"n":"<PlacedCount>k__BackingField","t":4,"rt":$n[0].Int32,"sn":"PlacedCount","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*BlockPlacer end.*/

    /*BrightnessApplier start.*/
    $m("BrightnessApplier", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"Apply","is":true,"t":8,"pi":[{"n":"r","pt":$n[1].Renderer,"ps":0}],"sn":"Apply","rt":$n[0].Void,"p":[$n[1].Renderer]},{"a":2,"n":"ApplyAll","is":true,"t":8,"sn":"ApplyAll","rt":$n[0].Void},{"a":2,"n":"ApplyTo","is":true,"t":8,"pi":[{"n":"go","pt":$n[1].GameObject,"ps":0}],"sn":"ApplyTo","rt":$n[0].Void,"p":[$n[1].GameObject]},{"a":2,"n":"Value","is":true,"t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[0].Single,"fg":"Value","is":true,"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Value"},{"a":1,"n":"BaseColorId","is":true,"t":4,"rt":$n[0].Int32,"sn":"BaseColorId","ro":true,"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"ColorId","is":true,"t":4,"rt":$n[0].Int32,"sn":"ColorId","ro":true,"box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*BrightnessApplier end.*/

    /*CharacterWalker start.*/
    $m("CharacterWalker", function () { return {"nested":[CharacterWalker.Limb],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Animate","t":8,"pi":[{"n":"moving","pt":$n[0].Boolean,"ps":0},{"n":"dt","pt":$n[0].Single,"ps":1}],"sn":"Animate","rt":$n[0].Void,"p":[$n[0].Boolean,$n[0].Single]},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"CollectLimbs","t":8,"sn":"CollectLimbs","rt":$n[0].Void},{"a":2,"n":"FaceTowards","t":8,"pi":[{"n":"worldPoint","pt":$n[1].Vector3,"ps":0}],"sn":"FaceTowards","rt":$n[0].Void,"p":[$n[1].Vector3]},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":2,"n":"MoveTo","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"MoveTo","rt":$n[0].Void,"p":[$n[1].Vector3]},{"a":2,"n":"Stop","t":8,"sn":"Stop","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"IsMoving","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsMoving","t":8,"rt":$n[0].Boolean,"fg":"IsMoving","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsMoving"},{"a":2,"n":"Target","t":16,"rt":$n[1].Vector3,"g":{"a":2,"n":"get_Target","t":8,"rt":$n[1].Vector3,"fg":"Target"},"fn":"Target"},{"a":1,"n":"amp","t":4,"rt":$n[0].Single,"sn":"amp","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"anim","t":4,"rt":$n[1].Animation,"sn":"anim"},{"a":2,"n":"bobBody","t":4,"rt":$n[0].Boolean,"sn":"bobBody","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"bodyBase","t":4,"rt":$n[1].Vector3,"sn":"bodyBase"},{"a":1,"n":"bodyRoot","t":4,"rt":$n[1].Transform,"sn":"bodyRoot"},{"a":1,"n":"curClip","t":4,"rt":$n[0].String,"sn":"curClip"},{"a":2,"n":"externalControl","t":4,"rt":$n[0].Boolean,"sn":"externalControl","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"externalMoving","t":4,"rt":$n[0].Boolean,"sn":"externalMoving","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"faceRot","t":4,"rt":$n[1].Quaternion,"sn":"faceRot"},{"a":1,"n":"facing","t":4,"rt":$n[0].Boolean,"sn":"facing","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"hasTarget","t":4,"rt":$n[0].Boolean,"sn":"hasTarget","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"limbs","t":4,"rt":$n[2].List$1(CharacterWalker.Limb),"sn":"limbs","ro":true},{"a":1,"n":"phase","t":4,"rt":$n[0].Single,"sn":"phase","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"speed","t":4,"rt":$n[0].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"speedMultiplier","t":4,"rt":$n[0].Single,"sn":"speedMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"swingAngle","t":4,"rt":$n[0].Single,"sn":"swingAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"swingFreq","t":4,"rt":$n[0].Single,"sn":"swingFreq","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"target","t":4,"rt":$n[1].Vector3,"sn":"target"},{"a":2,"n":"turnSpeed","t":4,"rt":$n[0].Single,"sn":"turnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CharacterWalker end.*/

    /*CharacterWalker+Limb start.*/
    $m("CharacterWalker.Limb", function () { return {"td":CharacterWalker,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"baseRot","t":4,"rt":$n[1].Quaternion,"sn":"baseRot"},{"a":2,"n":"sign","t":4,"rt":$n[0].Single,"sn":"sign","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"t","t":4,"rt":$n[1].Transform,"sn":"t"}]}; }, $n);
    /*CharacterWalker+Limb end.*/

    /*ColorChoiceUI start.*/
    $m("ColorChoiceUI", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"Back","is":true,"t":8,"pi":[{"n":"x","pt":$n[0].Single,"ps":0}],"sn":"Back","rt":$n[0].Single,"p":[$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Choose","t":8,"pi":[{"n":"pink","pt":$n[0].Boolean,"ps":0}],"sn":"Choose","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"FitOneLine","t":8,"sn":"FitOneLine","rt":$n[0].Void},{"a":1,"n":"OnRectTransformDimensionsChange","t":8,"sn":"OnRectTransformDimensionsChange","rt":$n[0].Void},{"a":2,"n":"Show","t":8,"sn":"Show","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"blueCard","t":4,"rt":$n[3].Button,"sn":"blueCard"},{"a":1,"n":"chosen","t":4,"rt":$n[1].Transform,"sn":"chosen"},{"a":1,"n":"done","t":4,"rt":$n[0].Boolean,"sn":"done","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"a":2,"n":"moveTime","t":4,"rt":$n[0].Single,"sn":"moveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"other","t":4,"rt":$n[1].Transform,"sn":"other"},{"a":2,"n":"pinkCard","t":4,"rt":$n[3].Button,"sn":"pinkCard"},{"a":2,"n":"pointTime","t":4,"rt":$n[0].Single,"sn":"pointTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"t","t":4,"rt":$n[0].Single,"sn":"t","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"title","t":4,"rt":$n[3].Text,"sn":"title"},{"a":2,"n":"titleBackdrop","t":4,"rt":$n[3].Image,"sn":"titleBackdrop"},{"a":2,"n":"titleMaxFontSize","t":4,"rt":$n[0].Int32,"sn":"titleMaxFontSize","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"OnChosen","t":2,"ad":{"a":2,"n":"add_OnChosen","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addOnChosen","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_OnChosen","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeOnChosen","rt":$n[0].Void,"p":[Function]}}]}; }, $n);
    /*ColorChoiceUI end.*/

    /*CtaOverlay start.*/
    $m("CtaOverlay", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Activate","t":8,"sn":"Activate","rt":$n[0].Void},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"OnTap","t":8,"sn":"OnTap","rt":$n[0].Void},{"a":2,"n":"button","t":4,"rt":$n[3].Button,"sn":"button"},{"a":1,"n":"ended","t":4,"rt":$n[0].Boolean,"sn":"ended","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CtaOverlay end.*/

    /*GameFlow start.*/
    $m("GameFlow", function () { return {"nested":[GameFlow.State],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"EndAfter","t":8,"pi":[{"n":"d","pt":$n[0].Single,"ps":0}],"sn":"EndAfter","rt":$n[4].IEnumerator,"p":[$n[0].Single]},{"a":1,"n":"Flash","t":8,"pi":[{"n":"dur","pt":$n[0].Single,"ps":0},{"n":"fadeIn","pt":$n[0].Boolean,"ps":1}],"sn":"Flash","rt":$n[4].IEnumerator,"p":[$n[0].Single,$n[0].Boolean]},{"a":1,"n":"IntroThenChoose","t":8,"pi":[{"n":"dur","pt":$n[0].Single,"ps":0}],"sn":"IntroThenChoose","rt":$n[4].IEnumerator,"p":[$n[0].Single]},{"a":1,"n":"OnColorChosen","t":8,"pi":[{"n":"pink","pt":$n[0].Boolean,"ps":0}],"sn":"OnColorChosen","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"OnPlaced","t":8,"pi":[{"n":"count","pt":$n[0].Int32,"ps":0}],"sn":"OnPlaced","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"ShowEnd","t":8,"sn":"ShowEnd","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"ToBuild","t":8,"pi":[{"n":"pink","pt":$n[0].Boolean,"ps":0}],"sn":"ToBuild","rt":$n[4].IEnumerator,"p":[$n[0].Boolean]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"bgm","t":4,"rt":$n[1].AudioSource,"sn":"bgm"},{"a":2,"n":"blueThumb","t":4,"rt":$n[1].Sprite,"sn":"blueThumb"},{"a":1,"n":"buildTimer","t":4,"rt":$n[0].Single,"sn":"buildTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"cam","t":4,"rt":$n[1].Camera,"sn":"cam"},{"a":2,"n":"choiceUI","t":4,"rt":ColorChoiceUI,"sn":"choiceUI"},{"a":2,"n":"cta","t":4,"rt":CtaOverlay,"sn":"cta"},{"a":2,"n":"flash","t":4,"rt":$n[1].CanvasGroup,"sn":"flash"},{"a":2,"n":"gameplayUI","t":4,"rt":$n[1].GameObject,"sn":"gameplayUI"},{"a":2,"n":"houseThumb","t":4,"rt":$n[3].Image,"sn":"houseThumb"},{"a":2,"n":"intro","t":4,"rt":IntroSequence,"sn":"intro"},{"a":2,"n":"npcs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"npcs"},{"a":2,"n":"overviewOffset","t":4,"rt":$n[1].Vector3,"sn":"overviewOffset"},{"a":2,"n":"pinkThumb","t":4,"rt":$n[1].Sprite,"sn":"pinkThumb"},{"a":2,"n":"placer","t":4,"rt":BlockPlacer,"sn":"placer"},{"a":2,"n":"player","t":4,"rt":ThirdPersonController,"sn":"player"},{"a":2,"n":"state","t":4,"rt":GameFlow.State,"sn":"state","box":function ($v) { return Bridge.box($v, GameFlow.State, System.Enum.toStringFn(GameFlow.State));}},{"a":2,"n":"trees","t":4,"rt":TreeRecolor,"sn":"trees"},{"a":2,"n":"tutorial","t":4,"rt":TutorialHud,"sn":"tutorial"}]}; }, $n);
    /*GameFlow end.*/

    /*GameFlow+State start.*/
    $m("GameFlow.State", function () { return {"td":GameFlow,"att":258,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Build","is":true,"t":4,"rt":GameFlow.State,"sn":"Build","box":function ($v) { return Bridge.box($v, GameFlow.State, System.Enum.toStringFn(GameFlow.State));}},{"a":2,"n":"Choose","is":true,"t":4,"rt":GameFlow.State,"sn":"Choose","box":function ($v) { return Bridge.box($v, GameFlow.State, System.Enum.toStringFn(GameFlow.State));}},{"a":2,"n":"End","is":true,"t":4,"rt":GameFlow.State,"sn":"End","box":function ($v) { return Bridge.box($v, GameFlow.State, System.Enum.toStringFn(GameFlow.State));}},{"a":2,"n":"Intro","is":true,"t":4,"rt":GameFlow.State,"sn":"Intro","box":function ($v) { return Bridge.box($v, GameFlow.State, System.Enum.toStringFn(GameFlow.State));}}]}; }, $n);
    /*GameFlow+State end.*/

    /*HotbarUI start.*/
    $m("HotbarUI", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Nudge","t":8,"sn":"Nudge","rt":$n[0].Void},{"a":2,"n":"SetSelected","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"SetSelected","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":2,"n":"Setup","t":8,"pi":[{"n":"defs","pt":System.Array.type(BlockDef),"ps":0},{"n":"p","pt":BlockPlacer,"ps":1}],"sn":"Setup","rt":$n[0].Void,"p":[System.Array.type(BlockDef),BlockPlacer]},{"a":2,"n":"Slot","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"Slot","rt":$n[1].RectTransform,"p":[$n[0].Int32]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"itemName","t":4,"rt":$n[3].Text,"sn":"itemName"},{"a":2,"n":"nameShowTime","t":4,"rt":$n[0].Single,"sn":"nameShowTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"nameT","t":4,"rt":$n[0].Single,"sn":"nameT","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"nudgeT","t":4,"rt":$n[0].Single,"sn":"nudgeT","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"placer","t":4,"rt":BlockPlacer,"sn":"placer"},{"a":2,"n":"selectFrame","t":4,"rt":$n[1].RectTransform,"sn":"selectFrame"},{"a":2,"n":"slotButtons","t":4,"rt":System.Array.type(UnityEngine.UI.Button),"sn":"slotButtons"},{"a":2,"n":"slotIcons","t":4,"rt":System.Array.type(UnityEngine.UI.Image),"sn":"slotIcons"}]}; }, $n);
    /*HotbarUI end.*/

    /*IntroSequence start.*/
    $m("IntroSequence", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Finish","t":8,"sn":"Finish","rt":$n[0].Void},{"a":2,"n":"Play","t":8,"pi":[{"n":"cam","pt":$n[1].Camera,"ps":0}],"sn":"Play","rt":$n[0].Void,"p":[$n[1].Camera]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"Running","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Running","t":8,"rt":$n[0].Boolean,"fg":"Running","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_Running","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"Running"},"fn":"Running"},{"a":2,"n":"cameraPose","t":4,"rt":$n[1].Transform,"sn":"cameraPose"},{"a":2,"n":"faceTime","t":4,"rt":$n[0].Single,"sn":"faceTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"hero","t":4,"rt":CharacterWalker,"sn":"hero"},{"a":2,"n":"heroStart","t":4,"rt":$n[1].Transform,"sn":"heroStart"},{"a":1,"n":"t","t":4,"rt":$n[0].Single,"sn":"t","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"turnTime","t":4,"rt":$n[0].Single,"sn":"turnTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"turned","t":4,"rt":$n[0].Boolean,"sn":"turned","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"walkDistance","t":4,"rt":$n[0].Single,"sn":"walkDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"walkSpeedMultiplier","t":4,"rt":$n[0].Single,"sn":"walkSpeedMultiplier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"walking","t":4,"rt":$n[0].Boolean,"sn":"walking","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"backing":true,"n":"<Running>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"Running","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*IntroSequence end.*/

    /*LunaController start.*/
    $m("LunaController", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(PlayableConfig)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"ApplyCard","t":8,"pi":[{"n":"target","pt":$n[3].Image,"ps":0},{"n":"sprite","pt":$n[1].Sprite,"ps":1}],"sn":"ApplyCard","rt":$n[0].Void,"p":[$n[3].Image,$n[1].Sprite]},{"a":1,"n":"ApplyTexture","t":8,"pi":[{"n":"target","pt":$n[3].RawImage,"ps":0},{"n":"texture","pt":$n[1].Texture2D,"ps":1}],"sn":"ApplyTexture","rt":$n[0].Void,"p":[$n[3].RawImage,$n[1].Texture2D]},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Background music", 3, null)],"a":2,"n":"bgm","t":4,"rt":$n[1].AudioClip,"sn":"bgm"},{"a":2,"n":"blueCardImage","t":4,"rt":$n[1].Sprite,"sn":"blueCardImage"},{"a":2,"n":"blueCardTarget","t":4,"rt":$n[3].Image,"sn":"blueCardTarget"},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Blue card image", 5, null)],"a":2,"n":"blueCardTexture","t":4,"rt":$n[1].Texture2D,"sn":"blueCardTexture"},{"a":2,"n":"blueCardTextureTarget","t":4,"rt":$n[3].RawImage,"sn":"blueCardTextureTarget"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Choose color text", 0, null, false, null)],"a":2,"n":"chooseText","t":4,"rt":$n[0].String,"sn":"chooseText"},{"a":2,"n":"pinkCardImage","t":4,"rt":$n[1].Sprite,"sn":"pinkCardImage"},{"a":2,"n":"pinkCardTarget","t":4,"rt":$n[3].Image,"sn":"pinkCardTarget"},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Pink card image", 4, null)],"a":2,"n":"pinkCardTexture","t":4,"rt":$n[1].Texture2D,"sn":"pinkCardTexture"},{"a":2,"n":"pinkCardTextureTarget","t":4,"rt":$n[3].RawImage,"sn":"pinkCardTextureTarget"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Number of blocks to place", 1, null, false, null)],"a":2,"n":"placeCount","t":4,"rt":$n[0].Int32,"sn":"placeCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Time to store (seconds, 0 = off)", 2, null, false, null)],"a":2,"n":"timeToStore","t":4,"rt":$n[0].Single,"sn":"timeToStore","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*LunaController end.*/

    /*NpcWander start.*/
    $m("NpcWander", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(CharacterWalker)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"Blocked","t":8,"pi":[{"n":"a","pt":$n[1].Vector3,"ps":0},{"n":"b","pt":$n[1].Vector3,"ps":1}],"sn":"Blocked","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"FarFromOthers","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"FarFromOthers","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Flat","is":true,"t":8,"pi":[{"n":"v","pt":$n[1].Vector3,"ps":0}],"sn":"Flat","rt":$n[1].Vector3,"p":[$n[1].Vector3]},{"a":1,"n":"GroundAt","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0},{"n":"hitP","out":true,"pt":$n[1].Vector3,"ps":1}],"sn":"GroundAt","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Ignore","is":true,"t":8,"pi":[{"n":"c","pt":$n[1].Collider,"ps":0}],"sn":"Ignore","rt":$n[0].Boolean,"p":[$n[1].Collider],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"PickPoint","t":8,"sn":"PickPoint","rt":$n[1].Vector3},{"a":1,"n":"Repath","t":8,"sn":"Repath","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"All","is":true,"t":4,"rt":$n[2].List$1(NpcWander),"sn":"All","ro":true},{"a":2,"n":"catchUpDist","t":4,"rt":$n[0].Single,"sn":"catchUpDist","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"catchingUp","t":4,"rt":$n[0].Boolean,"sn":"catchingUp","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"coneAngle","t":4,"rt":$n[0].Single,"sn":"coneAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"groundMask","t":4,"rt":$n[1].LayerMask,"sn":"groundMask"},{"a":2,"n":"groundY","t":4,"rt":$n[0].Single,"sn":"groundY","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"lastPos","t":4,"rt":$n[1].Vector3,"sn":"lastPos"},{"a":2,"n":"maxRadius","t":4,"rt":$n[0].Single,"sn":"maxRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minNpcDist","t":4,"rt":$n[0].Single,"sn":"minNpcDist","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minPlayerDist","t":4,"rt":$n[0].Single,"sn":"minPlayerDist","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minRadius","t":4,"rt":$n[0].Single,"sn":"minRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"player","t":4,"rt":$n[1].Transform,"sn":"player"},{"a":1,"n":"progressT","t":4,"rt":$n[0].Single,"sn":"progressT","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"repathT","t":4,"rt":$n[0].Single,"sn":"repathT","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"stuckT","t":4,"rt":$n[0].Single,"sn":"stuckT","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"view","t":4,"rt":$n[1].Transform,"sn":"view"},{"a":2,"n":"waitMax","t":4,"rt":$n[0].Single,"sn":"waitMax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"waitMin","t":4,"rt":$n[0].Single,"sn":"waitMin","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"waitT","t":4,"rt":$n[0].Single,"sn":"waitT","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"walker","t":4,"rt":CharacterWalker,"sn":"walker"}]}; }, $n);
    /*NpcWander end.*/

    /*OrientationLayout start.*/
    $m("OrientationLayout", function () { return {"nested":[OrientationLayout.Entry],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Apply","t":8,"sn":"Apply","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"entries","t":4,"rt":System.Array.type(OrientationLayout.Entry),"sn":"entries"},{"a":1,"n":"lastH","t":4,"rt":$n[0].Int32,"sn":"lastH","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastW","t":4,"rt":$n[0].Int32,"sn":"lastW","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*OrientationLayout end.*/

    /*OrientationLayout+Entry start.*/
    $m("OrientationLayout.Entry", function () { return {"td":OrientationLayout,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"landscapePos","t":4,"rt":$n[1].Vector2,"sn":"landscapePos"},{"a":2,"n":"landscapeScale","t":4,"rt":$n[0].Single,"sn":"landscapeScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"portraitPos","t":4,"rt":$n[1].Vector2,"sn":"portraitPos"},{"a":2,"n":"portraitScale","t":4,"rt":$n[0].Single,"sn":"portraitScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"target","t":4,"rt":$n[1].RectTransform,"sn":"target"}]}; }, $n);
    /*OrientationLayout+Entry end.*/

    /*PlaceButton start.*/
    $m("PlaceButton", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"OnPress","t":8,"sn":"OnPress","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"button","t":4,"rt":$n[3].Button,"sn":"button"},{"a":2,"n":"disabledColor","t":4,"rt":$n[1].Color,"sn":"disabledColor"},{"a":2,"n":"icon","t":4,"rt":$n[3].Image,"sn":"icon"},{"a":2,"n":"placer","t":4,"rt":BlockPlacer,"sn":"placer"},{"a":1,"n":"punch","t":4,"rt":$n[0].Single,"sn":"punch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"readyColor","t":4,"rt":$n[1].Color,"sn":"readyColor"},{"a":2,"n":"ring","t":4,"rt":$n[3].Image,"sn":"ring"},{"a":2,"n":"validColor","t":4,"rt":$n[1].Color,"sn":"validColor"}]}; }, $n);
    /*PlaceButton end.*/

    /*PlayableConfig start.*/
    $m("PlayableConfig", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":2,"n":"I","is":true,"t":4,"rt":PlayableConfig,"sn":"I"},{"a":2,"n":"autoStoreOnEnd","t":4,"rt":$n[0].Boolean,"sn":"autoStoreOnEnd","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"bgmClip","t":4,"rt":$n[1].AudioClip,"sn":"bgmClip"},{"at":[new UnityEngine.HeaderAttribute("Audio")],"a":2,"n":"bgmOn","t":4,"rt":$n[0].Boolean,"sn":"bgmOn","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"bgmVolume","t":4,"rt":$n[0].Single,"sn":"bgmVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Visual"),new UnityEngine.RangeAttribute(0.3, 1.5)],"a":2,"n":"brightness","t":4,"rt":$n[0].Single,"sn":"brightness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Text")],"a":2,"n":"chooseText","t":4,"rt":$n[0].String,"sn":"chooseText"},{"a":2,"n":"ctaText","t":4,"rt":$n[0].String,"sn":"ctaText"},{"a":2,"n":"endText","t":4,"rt":$n[0].String,"sn":"endText"},{"a":2,"n":"hideHintAfter","t":4,"rt":$n[0].Int32,"sn":"hideHintAfter","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Gameplay")],"a":2,"n":"introDuration","t":4,"rt":$n[0].Single,"sn":"introDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"lookHintText","t":4,"rt":$n[0].String,"sn":"lookHintText"},{"a":2,"n":"moveHintText","t":4,"rt":$n[0].String,"sn":"moveHintText"},{"a":2,"n":"moveText","t":4,"rt":$n[0].String,"sn":"moveText"},{"at":[new UnityEngine.HeaderAttribute("NPC")],"a":2,"n":"npcCount","t":4,"rt":$n[0].Int32,"sn":"npcCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"npcMaxRadius","t":4,"rt":$n[0].Single,"sn":"npcMaxRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"npcMinRadius","t":4,"rt":$n[0].Single,"sn":"npcMinRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"npcSpeed","t":4,"rt":$n[0].Single,"sn":"npcSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"placeCountToEnd","t":4,"rt":$n[0].Int32,"sn":"placeCountToEnd","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"placeHintText","t":4,"rt":$n[0].String,"sn":"placeHintText"},{"a":2,"n":"selectHintText","t":4,"rt":$n[0].String,"sn":"selectHintText"},{"a":2,"n":"sfxOn","t":4,"rt":$n[0].Boolean,"sn":"sfxOn","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"sfxVolume","t":4,"rt":$n[0].Single,"sn":"sfxVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"timeToStore","t":4,"rt":$n[0].Single,"sn":"timeToStore","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*PlayableConfig end.*/

    /*PopIn start.*/
    $m("PopIn", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"duration","t":4,"rt":$n[0].Single,"sn":"duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"overshoot","t":4,"rt":$n[0].Single,"sn":"overshoot","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"t","t":4,"rt":$n[0].Single,"sn":"t","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"target","t":4,"rt":$n[1].Vector3,"sn":"target"}]}; }, $n);
    /*PopIn end.*/

    /*Sfx start.*/
    $m("Sfx", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":2,"n":"Click","is":true,"t":8,"sn":"Click","rt":$n[0].Void},{"a":2,"n":"Extra","is":true,"t":8,"sn":"Extra","rt":$n[0].Void},{"a":2,"n":"Place","is":true,"t":8,"sn":"Place","rt":$n[0].Void},{"a":1,"n":"Play","is":true,"t":8,"pi":[{"n":"c","pt":$n[1].AudioClip,"ps":0},{"n":"pitch","dv":1.0,"o":true,"pt":$n[0].Single,"ps":1}],"sn":"Play","rt":$n[0].Void,"p":[$n[1].AudioClip,$n[0].Single]},{"a":1,"n":"SfxEnabled","is":true,"t":16,"rt":$n[0].Boolean,"g":{"a":1,"n":"get_SfxEnabled","t":8,"rt":$n[0].Boolean,"fg":"SfxEnabled","is":true,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"SfxEnabled"},{"a":1,"n":"Vol","is":true,"t":16,"rt":$n[0].Single,"g":{"a":1,"n":"get_Vol","t":8,"rt":$n[0].Single,"fg":"Vol","is":true,"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Vol"},{"a":2,"n":"I","is":true,"t":4,"rt":Sfx,"sn":"I"},{"a":2,"n":"click","t":4,"rt":$n[1].AudioClip,"sn":"click"},{"a":2,"n":"extra","t":4,"rt":$n[1].AudioClip,"sn":"extra"},{"a":1,"n":"lastPlace","t":4,"rt":$n[0].Int32,"sn":"lastPlace","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"place","t":4,"rt":System.Array.type(UnityEngine.AudioClip),"sn":"place"},{"a":2,"n":"source","t":4,"rt":$n[1].AudioSource,"sn":"source"}]}; }, $n);
    /*Sfx end.*/

    /*TextBorder start.*/
    $m("TextBorder", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.UI.Text),new UnityEngine.DisallowMultipleComponent()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"Build","t":8,"sn":"Build","rt":$n[0].Void},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"SetCopiesActive","t":8,"pi":[{"n":"on","pt":$n[0].Boolean,"ps":0}],"sn":"SetCopiesActive","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"Sync","t":8,"sn":"Sync","rt":$n[0].Void},{"a":2,"n":"color","t":4,"rt":$n[1].Color,"sn":"color"},{"a":1,"n":"copies","t":4,"rt":System.Array.type(UnityEngine.UI.Text),"sn":"copies"},{"a":2,"n":"eightDirections","t":4,"rt":$n[0].Boolean,"sn":"eightDirections","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"offsets","t":4,"rt":System.Array.type(UnityEngine.Vector2),"sn":"offsets"},{"a":1,"n":"rt","t":4,"rt":$n[1].RectTransform,"sn":"rt"},{"a":2,"n":"size","t":4,"rt":$n[0].Single,"sn":"size","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"src","t":4,"rt":$n[3].Text,"sn":"src"}]}; }, $n);
    /*TextBorder end.*/

    /*ThirdPersonController start.*/
    $m("ThirdPersonController", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(CharacterWalker)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"AddLook","t":8,"pi":[{"n":"screenDelta","pt":$n[1].Vector2,"ps":0}],"sn":"AddLook","rt":$n[0].Void,"p":[$n[1].Vector2]},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":2,"n":"BeginControl","t":8,"sn":"BeginControl","rt":$n[0].Void},{"a":2,"n":"EndControl","t":8,"sn":"EndControl","rt":$n[0].Void},{"a":1,"n":"FindGround","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0},{"n":"best","out":true,"pt":$n[1].RaycastHit,"ps":1}],"sn":"FindGround","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].RaycastHit],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"GetCameraPose","t":8,"pi":[{"n":"pos","out":true,"pt":$n[1].Vector3,"ps":0},{"n":"rot","out":true,"pt":$n[1].Quaternion,"ps":1}],"sn":"GetCameraPose","rt":$n[0].Void,"p":[$n[1].Vector3,$n[1].Quaternion]},{"a":1,"n":"IgnoreForCamera","is":true,"t":8,"pi":[{"n":"c","pt":$n[1].Collider,"ps":0}],"sn":"IgnoreForCamera","rt":$n[0].Boolean,"p":[$n[1].Collider],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"TryMove","t":8,"pi":[{"n":"mv","pt":$n[1].Vector3,"ps":0}],"sn":"TryMove","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"Yaw","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Yaw","t":8,"rt":$n[0].Single,"fg":"Yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Yaw"},{"a":2,"n":"bodyRadius","t":4,"rt":$n[0].Single,"sn":"bodyRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"cam","t":4,"rt":$n[1].Camera,"sn":"cam"},{"a":1,"n":"camDist","t":4,"rt":$n[0].Single,"sn":"camDist","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"camFollowSharpness","t":4,"rt":$n[0].Single,"sn":"camFollowSharpness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"camMinDistance","t":4,"rt":$n[0].Single,"sn":"camMinDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"camOffset","t":4,"rt":$n[1].Vector3,"sn":"camOffset"},{"a":2,"n":"camOffsetPortrait","t":4,"rt":$n[1].Vector3,"sn":"camOffsetPortrait"},{"a":1,"n":"controlling","t":4,"rt":$n[0].Boolean,"sn":"controlling","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"groundHeight","t":4,"rt":$n[0].Single,"sn":"groundHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"groundMask","t":4,"rt":$n[1].LayerMask,"sn":"groundMask"},{"a":2,"n":"inputEnabled","t":4,"rt":$n[0].Boolean,"sn":"inputEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"joystick","t":4,"rt":VirtualJoystick,"sn":"joystick"},{"a":2,"n":"lookSensitivity","t":4,"rt":$n[0].Single,"sn":"lookSensitivity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"maxDrop","t":4,"rt":$n[0].Single,"sn":"maxDrop","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"moveSpeed","t":4,"rt":$n[0].Single,"sn":"moveSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"pitch","t":4,"rt":$n[0].Single,"sn":"pitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"pivotHeight","t":4,"rt":$n[0].Single,"sn":"pivotHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"startPitch","t":4,"rt":$n[0].Single,"sn":"startPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"stepHeight","t":4,"rt":$n[0].Single,"sn":"stepHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"turnSpeed","t":4,"rt":$n[0].Single,"sn":"turnSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"walker","t":4,"rt":CharacterWalker,"sn":"walker"},{"a":1,"n":"yaw","t":4,"rt":$n[0].Single,"sn":"yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*ThirdPersonController end.*/

    /*TouchArea start.*/
    $m("TouchArea", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[5].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[0].Void,"p":[$n[5].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[5].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[5].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[5].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[5].PointerEventData]},{"a":2,"n":"player","t":4,"rt":ThirdPersonController,"sn":"player"},{"a":1,"n":"pointerId","t":4,"rt":$n[0].Int32,"sn":"pointerId","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*TouchArea end.*/

    /*TreeRecolor start.*/
    $m("TreeRecolor", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Apply","t":8,"pi":[{"n":"pink","pt":$n[0].Boolean,"ps":0}],"sn":"Apply","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":2,"n":"blueLeaves","t":4,"rt":$n[1].Material,"sn":"blueLeaves"},{"a":2,"n":"burstFx","t":4,"rt":$n[1].ParticleSystem,"sn":"burstFx"},{"a":2,"n":"leafRenderers","t":4,"rt":System.Array.type(UnityEngine.Renderer),"sn":"leafRenderers"},{"a":2,"n":"pinkLeaves","t":4,"rt":$n[1].Material,"sn":"pinkLeaves"}]}; }, $n);
    /*TreeRecolor end.*/

    /*TutorialHud start.*/
    $m("TutorialHud", function () { return {"nested":[TutorialHud.Step],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Begin","t":8,"sn":"Begin","rt":$n[0].Void},{"a":1,"n":"Finish","t":8,"sn":"Finish","rt":$n[0].Void},{"a":1,"n":"GoLook","t":8,"sn":"GoLook","rt":$n[0].Void},{"a":1,"n":"GoMove","t":8,"sn":"GoMove","rt":$n[0].Void},{"a":1,"n":"GoPlaceHand","t":8,"sn":"GoPlaceHand","rt":$n[0].Void},{"a":1,"n":"GoSelect","t":8,"sn":"GoSelect","rt":$n[0].Void},{"a":1,"n":"HideDim","t":8,"sn":"HideDim","rt":$n[0].Void},{"a":1,"n":"Highlight","t":8,"pi":[{"n":"t","pt":$n[1].RectTransform,"ps":0}],"sn":"Highlight","rt":$n[0].Void,"p":[$n[1].RectTransform]},{"a":1,"n":"OnPlaced","t":8,"pi":[{"n":"n","pt":$n[0].Int32,"ps":0}],"sn":"OnPlaced","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"OnSelected","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"OnSelected","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"SetHint","t":8,"pi":[{"n":"s","pt":$n[0].String,"ps":0}],"sn":"SetHint","rt":$n[0].Void,"p":[$n[0].String]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"dim","t":4,"rt":$n[3].Image,"sn":"dim"},{"a":2,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"a":2,"n":"hint","t":4,"rt":$n[3].Text,"sn":"hint"},{"a":1,"n":"hooked","t":4,"rt":$n[0].Boolean,"sn":"hooked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"hotbar","t":4,"rt":HotbarUI,"sn":"hotbar"},{"a":2,"n":"joystick","t":4,"rt":$n[1].RectTransform,"sn":"joystick"},{"a":2,"n":"lookAngleToPass","t":4,"rt":$n[0].Single,"sn":"lookAngleToPass","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"moveDistanceToPass","t":4,"rt":$n[0].Single,"sn":"moveDistanceToPass","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"moveLabel","t":4,"rt":$n[3].Text,"sn":"moveLabel"},{"a":2,"n":"placeButton","t":4,"rt":$n[1].RectTransform,"sn":"placeButton"},{"a":2,"n":"placer","t":4,"rt":BlockPlacer,"sn":"placer"},{"a":2,"n":"player","t":4,"rt":ThirdPersonController,"sn":"player"},{"a":1,"n":"shownOnce","is":true,"t":4,"rt":$n[0].Boolean,"sn":"shownOnce","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"startPos","t":4,"rt":$n[1].Vector3,"sn":"startPos"},{"a":1,"n":"startYaw","t":4,"rt":$n[0].Single,"sn":"startYaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"step","t":4,"rt":TutorialHud.Step,"sn":"step","box":function ($v) { return Bridge.box($v, TutorialHud.Step, System.Enum.toStringFn(TutorialHud.Step));}},{"a":1,"n":"target","t":4,"rt":$n[1].RectTransform,"sn":"target"},{"a":2,"n":"tutorialLayer","t":4,"rt":$n[1].RectTransform,"sn":"tutorialLayer"}]}; }, $n);
    /*TutorialHud end.*/

    /*TutorialHud+Step start.*/
    $m("TutorialHud.Step", function () { return {"td":TutorialHud,"att":259,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Done","is":true,"t":4,"rt":TutorialHud.Step,"sn":"Done","box":function ($v) { return Bridge.box($v, TutorialHud.Step, System.Enum.toStringFn(TutorialHud.Step));}},{"a":2,"n":"Look","is":true,"t":4,"rt":TutorialHud.Step,"sn":"Look","box":function ($v) { return Bridge.box($v, TutorialHud.Step, System.Enum.toStringFn(TutorialHud.Step));}},{"a":2,"n":"Move","is":true,"t":4,"rt":TutorialHud.Step,"sn":"Move","box":function ($v) { return Bridge.box($v, TutorialHud.Step, System.Enum.toStringFn(TutorialHud.Step));}},{"a":2,"n":"PlaceHand","is":true,"t":4,"rt":TutorialHud.Step,"sn":"PlaceHand","box":function ($v) { return Bridge.box($v, TutorialHud.Step, System.Enum.toStringFn(TutorialHud.Step));}},{"a":2,"n":"Select","is":true,"t":4,"rt":TutorialHud.Step,"sn":"Select","box":function ($v) { return Bridge.box($v, TutorialHud.Step, System.Enum.toStringFn(TutorialHud.Step));}}]}; }, $n);
    /*TutorialHud+Step end.*/

    /*VirtualJoystick start.*/
    $m("VirtualJoystick", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[5].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[0].Void,"p":[$n[5].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[5].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[0].Void,"p":[$n[5].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[5].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[0].Void,"p":[$n[5].PointerEventData]},{"a":2,"n":"Value","t":16,"rt":$n[1].Vector2,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[1].Vector2,"fg":"Value"},"s":{"a":1,"n":"set_Value","t":8,"p":[$n[1].Vector2],"rt":$n[0].Void,"fs":"Value"},"fn":"Value"},{"a":2,"n":"background","t":4,"rt":$n[1].RectTransform,"sn":"background"},{"a":2,"n":"knob","t":4,"rt":$n[1].RectTransform,"sn":"knob"},{"a":2,"n":"radius","t":4,"rt":$n[0].Single,"sn":"radius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"backing":true,"n":"<Value>k__BackingField","t":4,"rt":$n[1].Vector2,"sn":"Value"}]}; }, $n);
    /*VirtualJoystick end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    }});
