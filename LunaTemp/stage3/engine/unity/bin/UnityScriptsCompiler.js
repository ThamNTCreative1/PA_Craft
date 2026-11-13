if ( TRACE ) { TRACE( JSON.parse( '["CEBB.Playable.BedroomLayout#init","CEBB.Playable.BedroomLayout#ApplyLayout","CEBB.Playable.BedroomLayout#Place","CEBB.Playable.BedroomLayout#Update","CEBB.Playable.BedroomLayout#OnPreCull","CEBB.Playable.BedroomPlayable#Place","CEBB.Playable.BedroomPlayable#BoundsInAnchor","CEBB.Playable.BedroomPlayable#State#get","CEBB.Playable.BedroomPlayable#Tutorial#get","CEBB.Playable.BedroomPlayable#InteractionCount#get","CEBB.Playable.BedroomPlayable#BuiltCount#get","CEBB.Playable.BedroomPlayable#ElapsedSeconds#get","CEBB.Playable.BedroomPlayable#AimedIndex#get","CEBB.Playable.BedroomPlayable#HintIndex#get","CEBB.Playable.BedroomPlayable#HintShownCount#get","CEBB.Playable.BedroomPlayable#EndOverlayArmed#get","CEBB.Playable.BedroomPlayable#CanAim#get","CEBB.Playable.BedroomPlayable#CanMove#get","CEBB.Playable.BedroomPlayable#AllowLook#get","CEBB.Playable.BedroomPlayable#init","CEBB.Playable.BedroomPlayable#Awake","CEBB.Playable.BedroomPlayable#ApplyPlaygroundSettings","CEBB.Playable.BedroomPlayable#AddOutline","CEBB.Playable.BedroomPlayable#Update","CEBB.Playable.BedroomPlayable#BeginTutorial","CEBB.Playable.BedroomPlayable#NotifyLookMotion","CEBB.Playable.BedroomPlayable#NotifyMoveDistance","CEBB.Playable.BedroomPlayable#Remaining","CEBB.Playable.BedroomPlayable#SelectInventory","CEBB.Playable.BedroomPlayable#SetAimedSlot","CEBB.Playable.BedroomPlayable#ShowHint","CEBB.Playable.BedroomPlayable#TryBuildFromScreen","CEBB.Playable.BedroomPlayable#TryBuildAimed","CEBB.Playable.BedroomPlayable#TryBuild","CEBB.Playable.BedroomPlayable#Reveal","CEBB.Playable.BedroomPlayable#UpdateGuidanceVisual","CEBB.Playable.BedroomPlayable#UpdateUi","CEBB.Playable.BedroomPlayable#EndGame","CEBB.Playable.BedroomPlayable#SignalEnded","CEBB.Playable.BedroomPlayable#OpenEndCardAndCta","CEBB.Playable.BedroomPlayable#OpenStore","CEBB.Playable.BedroomPlayable#OnApplicationPause","CEBB.Playable.CherryHouseReveal#init","CEBB.Playable.CherryHouseReveal#OnEnable","CEBB.Playable.CherryHouseReveal#OnDisable","CEBB.Playable.CherryHouseReveal#Reveal","CEBB.Playable.CherryHouseReveal#PullBack","CEBB.Playable.DecorItem#init","CEBB.Playable.FirstPersonRoom#init","CEBB.Playable.FirstPersonRoom#Start","CEBB.Playable.FirstPersonRoom#LookAtSlot","CEBB.Playable.FirstPersonRoom#ApplyLook","CEBB.Playable.FirstPersonRoom#ApplyView","CEBB.Playable.FirstPersonRoom#IsClear","CEBB.Playable.FirstPersonRoom#Move","CEBB.Playable.FirstPersonRoom#FindAimedSlot","CEBB.Playable.FirstPersonRoom#FindSlotAlongRay","CEBB.Playable.FirstPersonRoom#FindHintCandidate","CEBB.Playable.FirstPersonRoom#FocusOnHint","CEBB.Playable.FirstPersonRoom#Update","CEBB.Playable.FirstPersonRoom#LateUpdate","CEBB.Playable.FurnitureDefinition#init","CEBB.Playable.FurnitureSlot#init","CEBB.Playable.LivingRoomLookSurface#init","CEBB.Playable.LivingRoomLookSurface#OnPointerDown","CEBB.Playable.LivingRoomLookSurface#OnDrag","CEBB.Playable.LivingRoomLookSurface#OnPointerUp","CEBB.Playable.LivingRoomLookSurface#OnDisable","CEBB.Playable.LivingRoomPlayable#init","CEBB.Playable.LivingRoomPlayable#CanStackOn","CEBB.Playable.LivingRoomPlayable#Blocks","CEBB.Playable.LivingRoomPlayable#UiPoint","CEBB.Playable.LivingRoomPlayable#Stage#get","CEBB.Playable.LivingRoomPlayable#InteractionCount#get","CEBB.Playable.LivingRoomPlayable#BuiltCount#get","CEBB.Playable.LivingRoomPlayable#EndOverlayArmed#get","CEBB.Playable.LivingRoomPlayable#IsDeleteMode#get","CEBB.Playable.LivingRoomPlayable#AllowLook#get","CEBB.Playable.LivingRoomPlayable#CanMove#get","CEBB.Playable.LivingRoomPlayable#init","CEBB.Playable.LivingRoomPlayable#Awake","CEBB.Playable.LivingRoomPlayable#ApplyPlaygroundSettings","CEBB.Playable.LivingRoomPlayable#SetGhostMaterial","CEBB.Playable.LivingRoomPlayable#NotifyFirstInput","CEBB.Playable.LivingRoomPlayable#TapAt","CEBB.Playable.LivingRoomPlayable#SelectEntry","CEBB.Playable.LivingRoomPlayable#PressBuild","CEBB.Playable.LivingRoomPlayable#PressTrash","CEBB.Playable.LivingRoomPlayable#PressRotate","CEBB.Playable.LivingRoomPlayable#SetDeleteMode","CEBB.Playable.LivingRoomPlayable#Frame","CEBB.Playable.LivingRoomPlayable#Count","CEBB.Playable.LivingRoomPlayable#Flash","CEBB.Playable.LivingRoomPlayable#NotifyScreenTouch","CEBB.Playable.LivingRoomPlayable#ClearIgnoredTap","CEBB.Playable.LivingRoomPlayable#NotifyLook","CEBB.Playable.LivingRoomPlayable#NotifyMove","CEBB.Playable.LivingRoomPlayable#Remaining","CEBB.Playable.LivingRoomPlayable#Place","CEBB.Playable.LivingRoomPlayable#Remove","CEBB.Playable.LivingRoomPlayable#Reveal","CEBB.Playable.LivingRoomPlayable#PieceUnder","CEBB.Playable.LivingRoomPlayable#Snap","CEBB.Playable.LivingRoomPlayable#ComputePose","CEBB.Playable.LivingRoomPlayable#BlockReason","CEBB.Playable.LivingRoomPlayable#IsClear","CEBB.Playable.LivingRoomPlayable#Update","CEBB.Playable.LivingRoomPlayable#LateUpdate","CEBB.Playable.LivingRoomPlayable#NearestVisiblePiece","CEBB.Playable.LivingRoomPlayable#UpdateHand","CEBB.Playable.LivingRoomPlayable#RefreshHud","CEBB.Playable.LivingRoomPlayable#CurrentPrompt","CEBB.Playable.LivingRoomPlayable#UpdateUi","CEBB.Playable.LivingRoomPlayable#Freeze","CEBB.Playable.LivingRoomPlayable#OpenStore","CEBB.Playable.LivingRoomPlayable#OnApplicationPause","CEBB.Playable.LivingRoomPlayer#Yaw#get","CEBB.Playable.LivingRoomPlayer#EyePosition#get","CEBB.Playable.LivingRoomPlayer#init","CEBB.Playable.LivingRoomPlayer#Start","CEBB.Playable.LivingRoomPlayer#LookAt","CEBB.Playable.LivingRoomPlayer#ApplyLook","CEBB.Playable.LivingRoomPlayer#ApplyView","CEBB.Playable.LivingRoomPlayer#Move","CEBB.Playable.LivingRoomPlayer#Update","CEBB.Playable.LunaController#Ended#get","CEBB.Playable.LunaController#TimeLeft#get","CEBB.Playable.LunaController#init","CEBB.Playable.LunaController#Awake","CEBB.Playable.LunaController#NotifyStarted","CEBB.Playable.LunaController#NotifyPlaced","CEBB.Playable.LunaController#NotifyClick","CEBB.Playable.LunaController#Update","CEBB.Playable.LunaController#ShowTime","CEBB.Playable.LunaController#EndGame","CEBB.Playable.LunaController#OnCtaClicked","CEBB.Playable.LunaTextOutline#init","CEBB.Playable.LunaTextOutline#OnEnable","CEBB.Playable.LunaTextOutline#LateUpdate","CEBB.Playable.LunaTextOutline#Refresh","CEBB.Playable.LunaTextOutline#OnDisable","CEBB.Playable.LunaTextOutline#Sync","CEBB.Playable.PlacementSurface#init","CEBB.Playable.RoomLookSurface#init","CEBB.Playable.RoomLookSurface#OnPointerDown","CEBB.Playable.RoomLookSurface#OnDrag","CEBB.Playable.RoomLookSurface#OnPointerUp","CEBB.Playable.RoomLookSurface#OnDisable","CEBB.Playable.RoomMovePad#Pressed#get","CEBB.Playable.RoomMovePad#Radius#get","CEBB.Playable.RoomMovePad#init","CEBB.Playable.RoomMovePad#Awake","CEBB.Playable.RoomMovePad#OnPointerDown","CEBB.Playable.RoomMovePad#OnInitializePotentialDrag","CEBB.Playable.RoomMovePad#OnDrag","CEBB.Playable.RoomMovePad#OnPointerUp","CEBB.Playable.RoomMovePad#Track","CEBB.Playable.RoomMovePad#SetThumb","CEBB.Playable.RoomMovePad#Update","CEBB.Playable.RoomMovePad#OnDisable","CEBB.Playable.SakuraEndCardMotion#init","CEBB.Playable.SakuraEndCardMotion#OnEnable","CEBB.Playable.SakuraEndCardMotion#HideGameplayUI","CEBB.Playable.SakuraEndCardMotion#Update","CEBB.Playable.SakuraEndCardMotion#Animate","CEBB.Playable.SakuraEndCardMotion#OnDisable"]' ) ); }
/**
 * @version 1.0.9813.25378
 * @copyright anton
 * @compiler Bridge.NET 17.9.42-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*CEBB.Playable.BedroomLayout start.*/
    Bridge.define("CEBB.Playable.BedroomLayout", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            roomCamera: null,
            canvas: null,
            catalog: null,
            grid: null,
            header: null,
            prompt: null,
            cta: null,
            progress: null,
            stats: null,
            completedDemo: null,
            landscapeLogoSize: null,
            landscapeLogoTopCenter: null,
            landscapePreviewSize: null,
            landscapePreviewTopCenter: null,
            textOutlines: null,
            movePad: null,
            firstPersonMode: false,
            preserveCameraView: false,
            lookTarget: null,
            viewOffset: null,
            respectSafeArea: false,
            catalogItemCount: 0,
            lastAspect: 0,
            safeMin: null,
            safeMax: null,
            lastSafeArea: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomLayout#init", this ); }

                this.landscapeLogoSize = new UnityEngine.Vector2();
                this.landscapeLogoTopCenter = new UnityEngine.Vector2();
                this.landscapePreviewSize = new UnityEngine.Vector2();
                this.landscapePreviewTopCenter = new UnityEngine.Vector2();
                this.lookTarget = new UnityEngine.Vector3();
                this.viewOffset = new UnityEngine.Vector3();
                this.safeMin = new UnityEngine.Vector2();
                this.safeMax = new UnityEngine.Vector2();
                this.lastSafeArea = new UnityEngine.Rect();
                this.landscapeLogoSize = new pc.Vec2( 0.3137764, 0.08171281 );
                this.landscapeLogoTopCenter = new pc.Vec2( 0.146597549, 0.97 );
                this.landscapePreviewSize = new pc.Vec2( 0.218385234, 0.2244768 );
                this.landscapePreviewTopCenter = new pc.Vec2( 0.12963672, 0.865759 );
                this.firstPersonMode = false;
                this.preserveCameraView = false;
                this.lookTarget = new pc.Vec3( 0.15, 0.95, -0.65 );
                this.viewOffset = new pc.Vec3( 4.84, 5.2, -14.08 );
                this.respectSafeArea = true;
                this.catalogItemCount = 12;
                this.lastAspect = -1.0;
                this.safeMin = pc.Vec2.ZERO.clone();
                this.safeMax = pc.Vec2.ONE.clone();
            }
        },
        methods: {
            /*CEBB.Playable.BedroomLayout.ApplyLayout start.*/
            ApplyLayout: function (aspect) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomLayout#ApplyLayout", this ); }

                var $t;
                if (UnityEngine.Component.op_Equality(this.roomCamera, null) || UnityEngine.Component.op_Equality(this.canvas, null) || UnityEngine.Component.op_Equality(this.catalog, null) || UnityEngine.MonoBehaviour.op_Equality(this.grid, null)) {
                    return;
                }
                this.safeMin = pc.Vec2.ZERO.clone();
                this.safeMax = pc.Vec2.ONE.clone();
                var capture = this.roomCamera.targetTexture != null;
                if (this.respectSafeArea && !capture && Math.abs(aspect - UnityEngine.Screen.width / UnityEngine.Mathf.Max(1, UnityEngine.Screen.height)) < 0.01) {
                    var area = UnityEngine.Screen.safeArea.$clone();
                    if (area.width > 0 && area.height > 0) {
                        this.safeMin = new pc.Vec2( area.xMin / UnityEngine.Screen.width, area.yMin / UnityEngine.Screen.height );
                        this.safeMax = new pc.Vec2( area.xMax / UnityEngine.Screen.width, area.yMax / UnityEngine.Screen.height );
                    }
                }
                var wide = aspect >= 1.55;
                var tablet = aspect > 1.05 && !wide;
                // Logo kept smaller and below the top edge so the notch / status bar (not reported by Luna's safe area) doesn't cover it.
                this.Place(this.header, new pc.Vec2( 0.04, 0.845 ), new pc.Vec2( 0.46, 0.925 ));
                this.Place(this.stats, new pc.Vec2( 0.76, 0.88 ), new pc.Vec2( 0.975, 0.92 ));
                this.Place(this.catalog, new pc.Vec2( 0.025, 0.025 ), new pc.Vec2( 0.975, 0.225 ));
                this.Place(this.prompt, new pc.Vec2( 0.08, 0.755 ), new pc.Vec2( 0.92, 0.81 ));
                this.Place(this.progress, new pc.Vec2( 0.35, 0.23 ), new pc.Vec2( 0.65, 0.238 ));
                this.Place(this.movePad, new pc.Vec2( 0.045, 0.3 ), new pc.Vec2( 0.29, 0.43 ));
                this.grid.constraintCount = this.catalogItemCount <= 6 ? 3 : 6;
                if (wide) {
                    this.Place(this.header, new pc.Vec2( 0.025, 0.82 ), new pc.Vec2( 0.35, 0.98 ));
                    this.Place(this.stats, new pc.Vec2( 0.85, 0.9 ), new pc.Vec2( 0.98, 0.98 ));
                    this.Place(this.catalog, new pc.Vec2( 0.025, 0.025 ), new pc.Vec2( 0.975, 0.205 ));
                    this.Place(this.prompt, new pc.Vec2( 0.3, 0.72 ), new pc.Vec2( 0.7, 0.8 ));
                    this.Place(this.movePad, new pc.Vec2( 0.035, 0.29 ), new pc.Vec2( 0.155, 0.51 ));
                    this.grid.constraintCount = UnityEngine.Mathf.Min(12, this.catalogItemCount);
                } else if (tablet) {
                    this.Place(this.catalog, new pc.Vec2( 0.08, 0.025 ), new pc.Vec2( 0.92, 0.3 ));
                    this.Place(this.prompt, new pc.Vec2( 0.2, 0.755 ), new pc.Vec2( 0.8, 0.815 ));
                }
                // Six garden items use square cards, with two rows in portrait.
                var gardenCatalog = this.catalogItemCount >= 6 && this.catalogItemCount <= 9;
                var gardenLandscape = aspect >= 1.0;
                if (gardenCatalog) {
                    this.grid.constraintCount = gardenLandscape ? this.catalogItemCount : 3;
                    this.grid.spacing = new pc.Vec2( 12, 12 );
                    this.grid.padding = new UnityEngine.RectOffset.$ctor1(16, 16, 14, 14);
                    this.grid.childAlignment = UnityEngine.TextAnchor.MiddleCenter;
                    this.Place(this.catalog, new pc.Vec2( 0.025, 0.025 ), new pc.Vec2( 0.975, gardenLandscape ? 0.245 : (this.catalogItemCount > 6 ? 0.34 : 0.255) ));
                }
                if (UnityEngine.Component.op_Inequality(this.completedDemo, null)) {
                    var landscape = aspect >= 1.0;
                    // Use the short screen edge so rotating preserves the size of both images.
                    var width = 0.24 / UnityEngine.Mathf.Max(1.0, aspect);
                    var landscapeColumnX = 0.13;
                    var left = landscape ? landscapeColumnX - width * 0.5 : 0.04;
                    var logoTop = landscape ? 0.97 : 0.925;
                    var logoAspect = 3.84;
                    var logoImage = UnityEngine.Component.op_Inequality(this.header, null) ? this.header.GetComponent(UnityEngine.UI.Image) : null;
                    if (UnityEngine.MonoBehaviour.op_Inequality(logoImage, null) && logoImage.sprite != null) {
                        logoAspect = logoImage.sprite.rect.width / logoImage.sprite.rect.height;
                    }
                    var logoBottom = logoTop - width * aspect / logoAspect;
                    this.Place(this.header, new pc.Vec2( left, logoBottom ), new pc.Vec2( left + width, logoTop ));
                    var top = logoBottom - 0.02;
                    if (landscape) {
                        this.Place(this.movePad, new pc.Vec2( 0.06999999, 0.29 ), new pc.Vec2( 0.19, 0.51 ));
                    }
                    this.Place(this.completedDemo, new pc.Vec2( left, top - width * aspect ), new pc.Vec2( left + width, top ));
                    if (landscape) {
                        // Preserve the sizes and positions authored in the scene for landscape.
                        var logoSize = this.landscapeLogoSize.$clone().div( new pc.Vec2( aspect, 1.0 ) );
                        var previewSize = this.landscapePreviewSize.$clone().div( new pc.Vec2( aspect, 1.0 ) );
                        this.Place(this.header, new pc.Vec2( this.landscapeLogoTopCenter.x - logoSize.x * 0.5, this.landscapeLogoTopCenter.y - logoSize.y ), new pc.Vec2( this.landscapeLogoTopCenter.x + logoSize.x * 0.5, this.landscapeLogoTopCenter.y ));
                        this.Place(this.completedDemo, new pc.Vec2( this.landscapePreviewTopCenter.x - previewSize.x * 0.5, this.landscapePreviewTopCenter.y - previewSize.y ), new pc.Vec2( this.landscapePreviewTopCenter.x + previewSize.x * 0.5, this.landscapePreviewTopCenter.y ));
                        var promptCenter = this.landscapePreviewTopCenter.y - previewSize.y * 0.5;
                        this.Place(this.prompt, new pc.Vec2( 0.27, promptCenter - 0.035 ), new pc.Vec2( 0.8, promptCenter + 0.035 ));
                    } else {
                        var portraitLogoWidth = width * 1.5;
                        this.Place(this.header, new pc.Vec2( left, logoTop - portraitLogoWidth * aspect / logoAspect ), new pc.Vec2( left + portraitLogoWidth, logoTop ));
                        var promptTop = top - width * aspect - 0.025;
                        this.Place(this.prompt, new pc.Vec2( 0.08, promptTop - 0.055 ), new pc.Vec2( 0.92, promptTop ));
                    }
                    if (!landscape) {
                        this.Place(this.movePad, new pc.Vec2( 0.045, 0.36 ), new pc.Vec2( 0.28, 0.49 ));
                    }
                }
                UnityEngine.Canvas.ForceUpdateCanvases();
                var rows = Math.ceil(this.catalogItemCount / this.grid.constraintCount);
                var cellWidth = (this.catalog.rect.width - this.grid.padding.horizontal - (((this.grid.constraintCount - 1) | 0)) * this.grid.spacing.x) / this.grid.constraintCount;
                var cellHeight = (this.catalog.rect.height - this.grid.padding.vertical - (((rows - 1) | 0)) * this.grid.spacing.y) / rows;
                var cell = UnityEngine.Mathf.Max(35.0, UnityEngine.Mathf.Min(cellWidth, cellHeight));
                this.grid.cellSize = pc.Vec2.ONE.clone().scale( cell );
                if (gardenCatalog) {
                    this.catalog.pivot = new pc.Vec2( 0.5, 0 );
                    this.catalog.anchorMin = ($t = new pc.Vec2( 0.5, this.safeMin.y + 0.025 * (this.safeMax.y - this.safeMin.y) ), this.catalog.anchorMax = $t.$clone(), $t);
                    this.catalog.anchoredPosition = pc.Vec2.ZERO.clone();
                    this.catalog.sizeDelta = new pc.Vec2( cell * this.grid.constraintCount + this.grid.padding.horizontal + (((this.grid.constraintCount - 1) | 0)) * this.grid.spacing.x, cell * rows + this.grid.padding.vertical + (((rows - 1) | 0)) * this.grid.spacing.y );
                }
                if (UnityEngine.Component.op_Inequality(this.movePad, null)) {
                    var size = UnityEngine.Mathf.Min(this.movePad.rect.width, this.movePad.rect.height);
                    this.movePad.SetSizeWithCurrentAnchors(UnityEngine.RectTransform.Axis.Horizontal, size);
                    this.movePad.SetSizeWithCurrentAnchors(UnityEngine.RectTransform.Axis.Vertical, size);
                }
                if (!this.preserveCameraView) {
                    this.roomCamera.rect = new UnityEngine.Rect.$ctor1(0, 0, 1, 1);
                    this.roomCamera.orthographic = false;
                    this.roomCamera.fieldOfView = this.firstPersonMode ? (wide ? 65.0 : 78.0) : (wide ? 48.0 : 53.0);
                    var fit = wide ? 0.75 : (tablet ? 0.9 : UnityEngine.Mathf.Max(1.0, 0.5625 / aspect));
                    if (!this.firstPersonMode) {
                        this.roomCamera.transform.position = this.lookTarget.$clone().add( this.viewOffset.$clone().clone().scale( fit ) );
                        this.roomCamera.transform.LookAt$2(this.lookTarget);
                    }
                }
                if (this.textOutlines != null) {
                    for (var i = 0; i < this.textOutlines.length; i = (i + 1) | 0) {
                        if (UnityEngine.MonoBehaviour.op_Inequality(this.textOutlines[i], null) && this.textOutlines[i].isActiveAndEnabled) {
                            this.textOutlines[i].Refresh();
                        }
                    }
                }
                this.lastAspect = aspect;
                this.lastSafeArea = UnityEngine.Screen.safeArea.$clone();
            },
            /*CEBB.Playable.BedroomLayout.ApplyLayout end.*/

            /*CEBB.Playable.BedroomLayout.Place start.*/
            Place: function (rt, min, max) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomLayout#Place", this ); }

                var $t, $t1, $t2;
                if (UnityEngine.Component.op_Equality(rt, null)) {
                    return;
                }
                rt.anchorMin = this.safeMin.$clone().add( ($t = this.safeMax.$clone().sub( this.safeMin ), new pc.Vec2( min.x * $t.x, min.y * $t.y )) );
                rt.anchorMax = this.safeMin.$clone().add( ($t1 = this.safeMax.$clone().sub( this.safeMin ), new pc.Vec2( max.x * $t1.x, max.y * $t1.y )) );
                rt.offsetMin = ($t2 = pc.Vec2.ZERO.clone(), rt.offsetMax = $t2.$clone(), $t2);
            },
            /*CEBB.Playable.BedroomLayout.Place end.*/

            /*CEBB.Playable.BedroomLayout.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomLayout#Update", this ); }

                var aspect = UnityEngine.Screen.width / UnityEngine.Mathf.Max(1, UnityEngine.Screen.height);
                if (Math.abs(aspect - this.lastAspect) > 0.002 || UnityEngine.Rect.op_Inequality(this.lastSafeArea.$clone(), UnityEngine.Screen.safeArea.$clone())) {
                    this.ApplyLayout(aspect);
                }
            },
            /*CEBB.Playable.BedroomLayout.Update end.*/

            /*CEBB.Playable.BedroomLayout.OnPreCull start.*/
            OnPreCull: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomLayout#OnPreCull", this ); }

                var camera = this.GetComponent(UnityEngine.Camera);
                if (UnityEngine.Component.op_Inequality(camera, null) && camera.targetTexture != null) {
                    this.ApplyLayout(camera.targetTexture.width / camera.targetTexture.height);
                }
            },
            /*CEBB.Playable.BedroomLayout.OnPreCull end.*/


        }
    });
    /*CEBB.Playable.BedroomLayout end.*/

    /*CEBB.Playable.BedroomPlayable start.*/
    Bridge.define("CEBB.Playable.BedroomPlayable", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*CEBB.Playable.BedroomPlayable.Place:static start.*/
                Place: function (go, s) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#Place", this ); }

                    go.transform.localPosition = s.localPosition.$clone();
                    go.transform.localEulerAngles = s.localEulerAngles.$clone();
                    go.transform.localScale = s.localScale.$clone();
                },
                /*CEBB.Playable.BedroomPlayable.Place:static end.*/

                /*CEBB.Playable.BedroomPlayable.BoundsInAnchor:static start.*/
                BoundsInAnchor: function (instance, anchor) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#BoundsInAnchor", this ); }

                    var $t;
                    var result = new pc.BoundingBox.ctor();
                    var init = false;
                    $t = Bridge.getEnumerator(instance.GetComponentsInChildren(UnityEngine.Renderer));
                    try {
                        while ($t.moveNext()) {
                            var r = $t.Current;
                            for (var i = 0; i < 8; i = (i + 1) | 0) {
                                var b = r.bounds;
                                var p = anchor.InverseTransformPoint(new pc.Vec3( (i & 1) === 0 ? b.min.x : b.max.x, (i & 2) === 0 ? b.min.y : b.max.y, (i & 4) === 0 ? b.min.z : b.max.z ));
                                if (!init) {
                                    result = new pc.BoundingBox( p.$clone(), pc.Vec3.ZERO.clone().scale( 0.5 ) );
                                    init = true;
                                } else {
                                    result.expandToPoint( p.$clone() );
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                    var size = result.halfExtents.$clone().scale( 2 ).$clone();
                    size.x = UnityEngine.Mathf.Max(0.08, size.x);
                    size.y = UnityEngine.Mathf.Max(0.08, size.y);
                    size.z = UnityEngine.Mathf.Max(0.08, size.z);
                    result.halfExtents = size.$clone().$clone().scale( 0.5 );
                    return result;
                },
                /*CEBB.Playable.BedroomPlayable.BoundsInAnchor:static end.*/


            }
        },
        fields: {
            slots: null,
            inventory: null,
            editorPreviewRoot: null,
            aimToBuild: false,
            ghostMaterial: null,
            ghostOutlineMaterial: null,
            playerBody: null,
            playerController: null,
            ctaCountThreshold: 0,
            showCtaButton: false,
            startTapCounts: false,
            endOverlayRoot: null,
            endOverlayButton: null,
            onEndCardRequested: null,
            durationSeconds: 0,
            stopTimerOnCompletion: false,
            endOnTimeout: false,
            firstBedSlot: 0,
            firstPrompt: null,
            handAfterMove: false,
            guidedBuildCount: 0,
            lookTutorialDegrees: 0,
            hintDelaySeconds: 0,
            revealSeconds: 0,
            placementAudio: null,
            placementSfx: null,
            placementVolume: 0,
            onFurniturePlaced: null,
            startSurface: null,
            ctaRoot: null,
            ctaButton: null,
            promptText: null,
            timerText: null,
            countText: null,
            progressText: null,
            progressFill: null,
            lookTutorialLoop: null,
            hand: null,
            onGameStarted: null,
            onGameEnded: null,
            onCtaClicked: null,
            moveTutorial: false,
            moveTutorialDistance: 0,
            moveTutorialPad: null,
            moveTutorialLabel: null,
            moveTutorialText: null,
            bgmSource: null,
            bgmClip: null,
            bgmVolume: 0,
            bgmEnabled: false,
            logoImage: null,
            logoTexture: null,
            state: 0,
            tutorialStage: 0,
            interactionCount: 0,
            builtCount: 0,
            elapsedSeconds: 0,
            lookProgress: 0,
            searchElapsed: 0,
            moveProgress: 0,
            hintIndex: 0,
            hintShownCount: 0,
            lastInteractionFrame: 0,
            lastCtaFrame: 0,
            lastSecond: 0,
            aimedIndex: 0,
            selectedInventory: 0,
            overlayArmedFrame: 0,
            moveGuide: false,
            animating: false,
            started: false,
            timerRunning: false,
            endedSent: false,
            paused: false,
            endOverlayArmed: false,
            ctaDelivered: false,
            guidanceCanvas: null,
            guidanceRect: null
        },
        props: {
            State: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#State#get", this ); }

                    return this.state;
                }
            },
            Tutorial: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#Tutorial#get", this ); }

                    return this.tutorialStage;
                }
            },
            InteractionCount: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#InteractionCount#get", this ); }

                    return this.interactionCount;
                }
            },
            BuiltCount: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#BuiltCount#get", this ); }

                    return this.builtCount;
                }
            },
            ElapsedSeconds: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#ElapsedSeconds#get", this ); }

                    return this.elapsedSeconds;
                }
            },
            AimedIndex: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#AimedIndex#get", this ); }

                    return this.aimedIndex;
                }
            },
            HintIndex: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#HintIndex#get", this ); }

                    return this.hintIndex;
                }
            },
            HintShownCount: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#HintShownCount#get", this ); }

                    return this.hintShownCount;
                }
            },
            EndOverlayArmed: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#EndOverlayArmed#get", this ); }

                    return this.endOverlayArmed;
                }
            },
            CanAim: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#CanAim#get", this ); }

                    return !this.animating && !this.endOverlayArmed && this.tutorialStage !== CEBB.Playable.RoomTutorialStage.LookAround && this.tutorialStage !== CEBB.Playable.RoomTutorialStage.Move;
                }
            },
            CanMove: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#CanMove#get", this ); }

                    return (this.tutorialStage === CEBB.Playable.RoomTutorialStage.Explore || this.tutorialStage === CEBB.Playable.RoomTutorialStage.Move) && !this.endOverlayArmed && !this.paused;
                }
            },
            AllowLook: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#AllowLook#get", this ); }

                    return this.tutorialStage !== CEBB.Playable.RoomTutorialStage.PlaceBed && !this.endOverlayArmed && !this.paused;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#init", this ); }

                this.aimToBuild = true;
                this.ctaCountThreshold = 0;
                this.showCtaButton = false;
                this.startTapCounts = false;
                this.onEndCardRequested = new UnityEngine.Events.UnityEvent();
                this.durationSeconds = 30;
                this.stopTimerOnCompletion = true;
                this.endOnTimeout = true;
                this.firstBedSlot = 0;
                this.firstPrompt = "TAP THE BED GHOST";
                this.handAfterMove = false;
                this.guidedBuildCount = 2;
                this.lookTutorialDegrees = 35;
                this.hintDelaySeconds = 5;
                this.revealSeconds = 0.3;
                this.placementVolume = 0.65;
                this.onFurniturePlaced = new UnityEngine.Events.UnityEvent();
                this.onGameStarted = new UnityEngine.Events.UnityEvent();
                this.onGameEnded = new UnityEngine.Events.UnityEvent();
                this.onCtaClicked = new UnityEngine.Events.UnityEvent();
                this.moveTutorial = true;
                this.moveTutorialDistance = 1.2;
                this.moveTutorialText = "DRAG TO MOVE";
                this.bgmVolume = 1.0;
                this.bgmEnabled = true;
                this.hintIndex = -1;
                this.lastInteractionFrame = -1;
                this.lastCtaFrame = -1;
                this.lastSecond = -1;
                this.aimedIndex = -1;
                this.selectedInventory = -1;
                this.overlayArmedFrame = -1;
            }
        },
        methods: {
            /*CEBB.Playable.BedroomPlayable.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#Awake", this ); }

                var $t, $t1, $t2;
                if (UnityEngine.GameObject.op_Inequality(this.editorPreviewRoot, null)) {
                    this.editorPreviewRoot.SetActive(false);
                }
                this.ApplyPlaygroundSettings();
                this.state = CEBB.Playable.BedroomState.WaitingForStart;
                this.tutorialStage = CEBB.Playable.RoomTutorialStage.PlaceBed;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.promptText, null)) {
                    this.guidanceCanvas = this.promptText.canvas;
                    this.guidanceRect = this.guidanceCanvas.GetComponent(UnityEngine.RectTransform);
                }

                for (var i = 0; i < this.slots.length; i = (i + 1) | 0) {
                    var s = this.slots[i];
                    if (s.definition == null || UnityEngine.GameObject.op_Equality(s.definition.prefab, null) || UnityEngine.Component.op_Equality(s.anchor, null)) {
                        UnityEngine.Debug.LogError$2("Invalid placement " + i, this);
                        continue;
                    }

                    s.instance = UnityEngine.Object.Instantiate$1(UnityEngine.GameObject, s.definition.prefab, s.anchor, false);
                    CEBB.Playable.BedroomPlayable.Place(s.instance, s);
                    if (System.String.contains(s.definition.displayName,"Tree")) {
                        // The sakura mesh has thin root tips below the broad trunk foot (five 0.114286-unit voxels).
                        // Bury those tips so the main trunk meets the ground rather than balancing above it.
                        var bottom = 3.40282347E+38;
                        $t = Bridge.getEnumerator(s.instance.GetComponentsInChildren(UnityEngine.Renderer));
                        try {
                            while ($t.moveNext()) {
                                var renderer = $t.Current;
                                if (!renderer.enabled) {
                                    continue;
                                }
                                var bounds = renderer.bounds;
                                for (var corner = 0; corner < 8; corner = (corner + 1) | 0) {
                                    var p = new pc.Vec3( (corner & 1) === 0 ? bounds.min.x : bounds.max.x, (corner & 2) === 0 ? bounds.min.y : bounds.max.y, (corner & 4) === 0 ? bounds.min.z : bounds.max.z );
                                    bottom = UnityEngine.Mathf.Min(bottom, s.anchor.InverseTransformPoint(p).y);
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }

                        var rootEmbed = Bridge.referenceEquals(s.definition.furnitureId, "sakura_2") ? 0.57143 * Math.abs(s.localScale.y) : 0.03 * Math.abs(s.localScale.y);
                        if (bottom !== 3.40282347E+38) {
                            s.localPosition.y -= bottom + rootEmbed;
                            CEBB.Playable.BedroomPlayable.Place(s.instance, s);
                        }
                    }

                    var b = CEBB.Playable.BedroomPlayable.BoundsInAnchor(s.instance, s.anchor);
                    s.targetCollider = s.anchor.gameObject.AddComponent(UnityEngine.BoxCollider);
                    s.targetCollider.center = b.center.$clone();
                    s.targetCollider.size = b.halfExtents.$clone().scale( 2 ).$clone();
                    s.targetCollider.isTrigger = true;
                    var target = s.anchor.gameObject.AddComponent(CEBB.Playable.FurnitureTarget);
                    target.owner = this;
                    target.slotIndex = i;
                    s.ghost = UnityEngine.Object.Instantiate$1(UnityEngine.GameObject, s.definition.prefab, s.anchor, false);
                    s.ghost.name = "Aim preview \u2014 " + (s.definition.displayName || "");
                    CEBB.Playable.BedroomPlayable.Place(s.ghost, s);
                    $t1 = Bridge.getEnumerator(s.ghost.GetComponentsInChildren(UnityEngine.Renderer));
                    try {
                        while ($t1.moveNext()) {
                            var r = $t1.Current;
                            var mats = r.sharedMaterials;
                            for (var k = 0; k < mats.length; k = (k + 1) | 0) {
                                mats[k] = this.ghostMaterial;
                            }
                            r.sharedMaterials = mats;
                            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                            r.receiveShadows = false;
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }

                    s.instance.SetActive(false);
                    s.ghost.SetActive(false);
                }

                for (var i1 = 0; i1 < this.inventory.length; i1 = (i1 + 1) | 0) {
                    var n = { v : i1 };
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.inventory[i1].button, null)) {
                        this.inventory[i1].button.onClick.AddListener((function ($me, n) {
                            return Bridge.fn.bind($me, function () {
                                this.SelectInventory(n.v);
                            });
                        })(this, n));
                    }
                }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.startSurface, null)) {
                    this.startSurface.onClick.AddListener(Bridge.fn.cacheBind(this, this.BeginTutorial));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.ctaButton, null)) {
                    this.ctaButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.OpenStore));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.endOverlayButton, null)) {
                    this.endOverlayButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.OpenEndCardAndCta));
                }
                if (UnityEngine.GameObject.op_Inequality(this.endOverlayRoot, null)) {
                    this.endOverlayRoot.SetActive(false);
                }
                if (UnityEngine.Component.op_Inequality(this.hand, null)) {
                    this.hand.SetParent(this.guidanceRect, false);
                    this.hand.anchorMin = ($t2 = new pc.Vec2( 0.5, 0.5 ), this.hand.anchorMax = $t2.$clone(), $t2);
                }

                this.SetAimedSlot(this.firstBedSlot);
                this.UpdateUi();
            },
            /*CEBB.Playable.BedroomPlayable.Awake end.*/

            /*CEBB.Playable.BedroomPlayable.ApplyPlaygroundSettings start.*/
            ApplyPlaygroundSettings: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#ApplyPlaygroundSettings", this ); }

                if (UnityEngine.Component.op_Inequality(this.bgmSource, null)) {
                    this.bgmSource.playOnAwake = false;
                    if (this.bgmClip != null) {
                        this.bgmSource.clip = this.bgmClip;
                    }
                    this.bgmSource.loop = true;
                    this.bgmSource.volume = Math.max(0, Math.min(1, this.bgmVolume));
                    if (this.bgmEnabled && this.bgmSource.clip != null) {
                        if (!this.bgmSource.isPlaying) {
                            this.bgmSource.Play();
                        }
                    } else {
                        this.bgmSource.Stop();
                    }
                }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.logoImage, null) && this.logoTexture != null) {
                    this.logoImage.sprite = UnityEngine.Sprite.Create$1(this.logoTexture, new UnityEngine.Rect.$ctor1(0, 0, this.logoTexture.width, this.logoTexture.height), new pc.Vec2( 0.5, 0.5 ), 100.0);
                    this.logoImage.preserveAspect = true;
                }
            },
            /*CEBB.Playable.BedroomPlayable.ApplyPlaygroundSettings end.*/

            /*CEBB.Playable.BedroomPlayable.AddOutline start.*/
            AddOutline: function (s, b) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#AddOutline", this ); }

                var $t;
                var go = new UnityEngine.GameObject.$ctor2("Ghost bounds");
                go.transform.SetParent(s.ghost.transform, false);
                var line = go.AddComponent(UnityEngine.LineRenderer);
                line.useWorldSpace = false;
                line.sharedMaterial = this.ghostOutlineMaterial != null ? this.ghostOutlineMaterial : this.ghostMaterial;
                line.startColor = ($t = new pc.Color( 1, 1, 1, 1 ), line.endColor = $t.$clone(), $t);
                line.startWidth = (line.endWidth = 0.04, 0.04);
                line.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                var edges = System.Array.init([
                    0, 
                    1, 
                    3, 
                    2, 
                    0, 
                    4, 
                    5, 
                    1, 
                    5, 
                    7, 
                    3, 
                    7, 
                    6, 
                    2, 
                    6, 
                    4
                ], System.Int32);
                line.positionCount = edges.length;
                for (var n = 0; n < edges.length; n = (n + 1) | 0) {
                    var i = edges[n];
                    var p = new pc.Vec3( (i & 1) === 0 ? b.min.x : b.max.x, (i & 2) === 0 ? b.min.y : b.max.y, (i & 4) === 0 ? b.min.z : b.max.z );
                    line.SetPosition(n, s.ghost.transform.InverseTransformPoint(s.anchor.TransformPoint$1(p)));
                }
            },
            /*CEBB.Playable.BedroomPlayable.AddOutline end.*/

            /*CEBB.Playable.BedroomPlayable.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#Update", this ); }

                if (this.paused || this.endOverlayArmed) {
                    return;
                }
                if (this.timerRunning) {
                    this.elapsedSeconds = UnityEngine.Mathf.Min(this.durationSeconds, this.elapsedSeconds + UnityEngine.Time.unscaledDeltaTime);
                    var second = Math.ceil(this.durationSeconds - this.elapsedSeconds);
                    if (second !== this.lastSecond) {
                        this.lastSecond = second;
                        this.timerText.text = second + "s";
                    }

                    if (this.elapsedSeconds >= this.durationSeconds) {
                        this.timerRunning = false;
                        if (this.endOnTimeout) {
                            this.EndGame(false);
                            return;
                        }
                    }
                }

                // one-time hand after the move tutorial: nothing in view -> highlight the nearest ghost right away
                if (this.moveGuide && this.tutorialStage === CEBB.Playable.RoomTutorialStage.Explore && !this.animating && this.aimedIndex < 0 && this.hintIndex < 0 && UnityEngine.MonoBehaviour.op_Inequality(this.playerController, null)) {
                    var near = this.playerController.FindHintCandidate();
                    if (near >= 0) {
                        this.ShowHint(near);
                    }
                }

                if (this.tutorialStage === CEBB.Playable.RoomTutorialStage.Explore && !this.animating && this.hintIndex < 0) {
                    if (this.aimedIndex >= 0) {
                        this.searchElapsed = 0;
                    } else {
                        this.searchElapsed += UnityEngine.Time.unscaledDeltaTime;
                        if (this.searchElapsed >= this.hintDelaySeconds) {
                            var index = UnityEngine.MonoBehaviour.op_Equality(this.playerController, null) ? -1 : this.playerController.FindHintCandidate();
                            if (index >= 0) {
                                this.ShowHint(index);
                            } else {
                                this.searchElapsed = this.hintDelaySeconds - 0.5;
                            }
                        }
                    }
                }
            },
            /*CEBB.Playable.BedroomPlayable.Update end.*/

            /*CEBB.Playable.BedroomPlayable.BeginTutorial start.*/
            BeginTutorial: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#BeginTutorial", this ); }

                if (this.state !== CEBB.Playable.BedroomState.WaitingForStart) {
                    return;
                }
                this.started = true;
                this.timerRunning = true;
                this.state = CEBB.Playable.BedroomState.FirstBuild;
                if (this.startTapCounts) {
                    this.interactionCount = (this.interactionCount + 1) | 0;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.startSurface, null)) {
                    this.startSurface.gameObject.SetActive(false);
                }
                Luna.Unity.LifeCycle.GameStarted();
                this.onGameStarted.Invoke();
                this.UpdateUi();
            },
            /*CEBB.Playable.BedroomPlayable.BeginTutorial end.*/

            /*CEBB.Playable.BedroomPlayable.NotifyLookMotion start.*/
            NotifyLookMotion: function (degrees) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#NotifyLookMotion", this ); }

                if (this.tutorialStage !== CEBB.Playable.RoomTutorialStage.LookAround || this.endOverlayArmed) {
                    return;
                }
                this.lookProgress += Math.abs(degrees);
                if (this.lookProgress >= this.lookTutorialDegrees) {
                    if (this.moveTutorial) {
                        this.tutorialStage = CEBB.Playable.RoomTutorialStage.Move;
                        this.moveProgress = 0;
                    } else {
                        this.tutorialStage = CEBB.Playable.RoomTutorialStage.Explore;
                        this.state = CEBB.Playable.BedroomState.FreeBuild;
                        this.searchElapsed = 0;
                    }

                    this.UpdateUi();
                }
            },
            /*CEBB.Playable.BedroomPlayable.NotifyLookMotion end.*/

            /*CEBB.Playable.BedroomPlayable.NotifyMoveDistance start.*/
            NotifyMoveDistance: function (distance) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#NotifyMoveDistance", this ); }

                if (this.tutorialStage !== CEBB.Playable.RoomTutorialStage.Move || this.endOverlayArmed) {
                    return;
                }
                this.moveProgress += Math.abs(distance);
                if (this.moveProgress >= this.moveTutorialDistance) {
                    this.moveGuide = this.handAfterMove;
                    this.tutorialStage = CEBB.Playable.RoomTutorialStage.Explore;
                    this.state = CEBB.Playable.BedroomState.FreeBuild;
                    this.searchElapsed = 0;
                    this.UpdateUi();
                }
            },
            /*CEBB.Playable.BedroomPlayable.NotifyMoveDistance end.*/

            /*CEBB.Playable.BedroomPlayable.Remaining start.*/
            Remaining: function (definition) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#Remaining", this ); }

                var n = 0;
                for (var i = 0; i < this.slots.length; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.slots[i].definition, definition) && !this.slots[i].built) {
                        n = (n + 1) | 0;
                    }
                }
                return n;
            },
            /*CEBB.Playable.BedroomPlayable.Remaining end.*/

            /*CEBB.Playable.BedroomPlayable.SelectInventory start.*/
            SelectInventory: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#SelectInventory", this ); }

                if (this.tutorialStage !== CEBB.Playable.RoomTutorialStage.Explore || index < 0 || index >= this.inventory.length || this.Remaining(this.inventory[index].definition) === 0) {
                    return;
                }
                this.selectedInventory = index;
                var nearest = -1;
                var distance = 3.40282347E+38;
                var origin = UnityEngine.MonoBehaviour.op_Inequality(this.playerController, null) ? this.playerController.transform.position.$clone() : this.transform.position.$clone();
                for (var i = 0; i < this.slots.length; i = (i + 1) | 0) {
                    if (!this.slots[i].built && Bridge.referenceEquals(this.slots[i].definition, this.inventory[index].definition)) {
                        var d = (this.slots[i].anchor.position.$clone().sub( origin )).lengthSq();
                        if (d < distance) {
                            distance = d;
                            nearest = i;
                        }
                    }
                }

                if (nearest >= 0) {
                    if (this.hintIndex >= 0 && this.hintIndex !== this.aimedIndex) {
                        this.slots[this.hintIndex].ghost.SetActive(false);
                    }
                    this.hintIndex = -1;
                    this.ShowHint(nearest);
                }

                this.UpdateUi();
            },
            /*CEBB.Playable.BedroomPlayable.SelectInventory end.*/

            /*CEBB.Playable.BedroomPlayable.SetAimedSlot start.*/
            SetAimedSlot: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#SetAimedSlot", this ); }

                if (this.CanAim && this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed && !this.slots[this.firstBedSlot].built) {
                    index = this.firstBedSlot;
                } else {
                    if (index < 0 || index >= this.slots.length || this.slots[index].built || !this.CanAim) {
                        index = -1;
                    }
                }
                if (index === this.aimedIndex) {
                    return;
                }
                if (this.aimedIndex >= 0 && this.aimedIndex !== this.hintIndex) {
                    this.slots[this.aimedIndex].ghost.SetActive(false);
                }
                this.aimedIndex = index;
                if (index >= 0) {
                    this.slots[index].ghost.SetActive(true);
                    if (this.hintIndex < 0) {
                        this.searchElapsed = 0;
                    }
                    for (var i = 0; i < this.inventory.length; i = (i + 1) | 0) {
                        if (Bridge.referenceEquals(this.inventory[i].definition, this.slots[index].definition)) {
                            this.selectedInventory = i;
                            break;
                        }
                    }
                }

                this.UpdateUi();
            },
            /*CEBB.Playable.BedroomPlayable.SetAimedSlot end.*/

            /*CEBB.Playable.BedroomPlayable.ShowHint start.*/
            ShowHint: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#ShowHint", this ); }

                if (this.hintIndex >= 0 || index < 0 || this.slots[index].built) {
                    return;
                }
                this.hintIndex = index;
                this.hintShownCount = (this.hintShownCount + 1) | 0;
                this.slots[index].ghost.SetActive(true);
                if (UnityEngine.MonoBehaviour.op_Inequality(this.playerController, null)) {
                    this.playerController.FocusOnHint(index);
                }
                this.UpdateUi();
            },
            /*CEBB.Playable.BedroomPlayable.ShowHint end.*/

            /*CEBB.Playable.BedroomPlayable.TryBuildFromScreen start.*/
            TryBuildFromScreen: function (point, view) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#TryBuildFromScreen", this ); }

                if (this.endOverlayArmed || this.tutorialStage === CEBB.Playable.RoomTutorialStage.LookAround || this.tutorialStage === CEBB.Playable.RoomTutorialStage.Move) {
                    return false;
                }
                var tapped = this.playerController.FindSlotAlongRay(view.ScreenPointToRay(UnityEngine.Vector3.FromVector2(point)));
                if (tapped >= 0) {
                    if (this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed && tapped !== this.firstBedSlot) {
                        return false;
                    }
                    this.SetAimedSlot(tapped);
                    return this.TryBuild(tapped);
                }

                var central = Math.abs(point.x / UnityEngine.Screen.width - 0.5) < 0.2 && Math.abs(point.y / UnityEngine.Screen.height - 0.5) < 0.2;
                if (!central) {
                    return false;
                }
                this.SetAimedSlot(this.playerController.FindAimedSlot());
                return this.TryBuildAimed();
            },
            /*CEBB.Playable.BedroomPlayable.TryBuildFromScreen end.*/

            /*CEBB.Playable.BedroomPlayable.TryBuildAimed start.*/
            TryBuildAimed: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#TryBuildAimed", this ); }

                return this.TryBuild(this.aimedIndex);
            },
            /*CEBB.Playable.BedroomPlayable.TryBuildAimed end.*/

            /*CEBB.Playable.BedroomPlayable.TryBuild start.*/
            TryBuild: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#TryBuild", this ); }

                if (!this.started) {
                    this.BeginTutorial();
                }
                if (!this.CanAim || this.paused || this.lastInteractionFrame === UnityEngine.Time.frameCount || index < 0 || index >= this.slots.length) {
                    return false;
                }
                if (this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed && index !== this.firstBedSlot) {
                    return false;
                }
                var s = this.slots[index];
                if (s.built || UnityEngine.GameObject.op_Equality(s.instance, null) || (this.aimToBuild && index !== this.aimedIndex) || this.Remaining(s.definition) === 0) {
                    return false;
                }
                if (UnityEngine.Component.op_Inequality(this.playerBody, null) && !s.definition.walkableSurface) {
                    var b = s.targetCollider.bounds;
                    var p = this.playerBody.position.$clone();
                    if (p.x > b.min.x - 0.25 && p.x < b.max.x + 0.25 && p.z > b.min.z - 0.25 && p.z < b.max.z + 0.25 && b.min.y < 1.7 && b.max.y > 0.1) {
                        this.promptText.text = "STEP BACK TO PLACE";
                        return false;
                    }
                }

                this.lastInteractionFrame = UnityEngine.Time.frameCount;
                this.moveGuide = false;
                s.built = true;
                this.builtCount = (this.builtCount + 1) | 0;
                this.interactionCount = (this.interactionCount + 1) | 0;
                this.animating = true;
                if (this.hintIndex === index) {
                    this.hintIndex = -1;
                    this.searchElapsed = 0;
                }

                s.ghost.SetActive(false);
                this.SetAimedSlot(-1);
                s.targetCollider.isTrigger = s.definition.walkableSurface;
                s.instance.SetActive(true);
                if (UnityEngine.Component.op_Inequality(this.placementAudio, null) && this.placementSfx != null) {
                    this.placementAudio.PlayOneShot$1(this.placementSfx, this.placementVolume);
                }
                this.onFurniturePlaced.Invoke();
                this.UpdateUi();
                this.StartCoroutine$1(this.Reveal(s, index));
                if (this.ctaCountThreshold > 0 && this.interactionCount >= this.ctaCountThreshold) {
                    this.EndGame(false);
                }
                return true;
            },
            /*CEBB.Playable.BedroomPlayable.TryBuild end.*/

            /*CEBB.Playable.BedroomPlayable.Reveal start.*/
            Reveal: function (s, index) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#Reveal", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    time,
                    t,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    time = 0;
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( time < this.revealSeconds ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    time += UnityEngine.Time.unscaledDeltaTime;
                                        t = Math.max(0, Math.min(1, time / this.revealSeconds));
                                        s.instance.transform.localScale = s.localScale.$clone().clone().scale( UnityEngine.Mathf.Max(0.02, 1.0 + 1.7 * Math.pow(t - 1.0, 3) + 0.7 * Math.pow(t - 1.0, 2)) );
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    s.instance.transform.localScale = s.localScale.$clone();
                                        this.animating = false;
                                        if (this.endOverlayArmed) {
                                            $step = 5;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                }
                                case 5: {
                                    return false;
                                }
                                case 6: {
                                    if (this.builtCount === this.slots.length) {
                                            $step = 7;
                                            continue;
                                        } 
                                        $step = 8;
                                        continue;
                                }
                                case 7: {
                                    this.EndGame(true);
                                        return false;
                                    $step = 8;
                                    continue;
                                }
                                case 8: {
                                    if (index === this.firstBedSlot && this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed) {
                                            this.tutorialStage = CEBB.Playable.RoomTutorialStage.LookAround;
                                            this.state = CEBB.Playable.BedroomState.GuidedBuild;
                                            this.lookProgress = 0;
                                        } else {
                                            this.state = CEBB.Playable.BedroomState.FreeBuild;
                                        }

                                        this.UpdateUi();

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
            /*CEBB.Playable.BedroomPlayable.Reveal end.*/

            /*CEBB.Playable.BedroomPlayable.UpdateGuidanceVisual start.*/
            UpdateGuidanceVisual: function (view) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#UpdateGuidanceVisual", this ); }

                if (UnityEngine.Component.op_Equality(this.hand, null) || UnityEngine.Component.op_Equality(this.guidanceRect, null)) {
                    return;
                }
                var show = !this.animating && !this.endOverlayArmed && (this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed || this.tutorialStage === CEBB.Playable.RoomTutorialStage.LookAround || this.hintIndex >= 0 || (this.moveGuide && this.tutorialStage === CEBB.Playable.RoomTutorialStage.Explore && this.aimedIndex >= 0));
                this.hand.gameObject.SetActive(show);
                if (UnityEngine.MonoBehaviour.op_Inequality(this.lookTutorialLoop, null)) {
                    this.lookTutorialLoop.gameObject.SetActive(show && this.tutorialStage === CEBB.Playable.RoomTutorialStage.LookAround);
                }
                if (!show) {
                    return;
                }
                var ui = this.guidanceCanvas.renderMode === UnityEngine.RenderMode.ScreenSpaceOverlay ? null : this.guidanceCanvas.worldCamera;
                var screenWidth = view.pixelWidth, screenHeight = view.pixelHeight;
                var lookStage = this.tutorialStage === CEBB.Playable.RoomTutorialStage.LookAround;
                var lookPhase = UnityEngine.Time.unscaledTime * 1.35;
                var screen = new UnityEngine.Vector2();
                if (lookStage) {
                    screen = new pc.Vec2( screenWidth * (0.53 + 0.27 * Math.sin(lookPhase)), screenHeight * (0.57 + 0.05 * Math.sin(lookPhase * 2.0)) );
                } else {
                    var index = this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed ? this.firstBedSlot : (this.moveGuide && this.aimedIndex >= 0 ? this.aimedIndex : this.hintIndex);
                    var p = view.WorldToScreenPoint(this.slots[index].targetCollider.bounds.center);
                    if (p.z < 0) {
                        this.hand.gameObject.SetActive(false);
                        return;
                    }

                    screen = new pc.Vec2( Math.max(screenWidth * 0.12, Math.min(p.x, screenWidth * 0.88)), Math.max(screenHeight * 0.3, Math.min(p.y, screenHeight * 0.8)) );
                }

                var local = { v : new UnityEngine.Vector2() };
                if (UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.guidanceRect, screen, ui, local)) {
                    if (lookStage) {
                        this.hand.anchoredPosition = local.v.$clone();
                        this.hand.localScale = new pc.Vec3( 1, 1, 1 );
                        this.hand.localEulerAngles = pc.Vec3.ZERO.clone();
                    } else {
                        var clickRate = this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed ? 0.65 : 1.1;
                        var pressWindow = this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed ? 0.27 : 0.18;
                        var cycle = (UnityEngine.Time.unscaledTime * clickRate) % 1.0;
                        var press = cycle < pressWindow ? Math.sin(cycle / pressWindow * UnityEngine.Mathf.PI) : 0.0;
                        this.hand.anchoredPosition = local.v.$clone().add( new pc.Vec2( pc.math.lerp(58, 26, press), pc.math.lerp(-54, -22, press) ) );
                        this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1.0, 0.82, press) );
                        this.hand.localEulerAngles = new pc.Vec3( 0, 0, pc.math.lerp(-14.0, 2.0, press) );
                    }
                }
            },
            /*CEBB.Playable.BedroomPlayable.UpdateGuidanceVisual end.*/

            /*CEBB.Playable.BedroomPlayable.UpdateUi start.*/
            UpdateUi: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#UpdateUi", this ); }

                var moveTip = this.tutorialStage === CEBB.Playable.RoomTutorialStage.Move && !this.endOverlayArmed;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.moveTutorialPad, null)) {
                    this.moveTutorialPad.demo = moveTip;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.moveTutorialLabel, null)) {
                    this.moveTutorialLabel.text = this.moveTutorialText;
                    this.moveTutorialLabel.gameObject.SetActive(moveTip);
                }

                if (UnityEngine.GameObject.op_Inequality(this.ctaRoot, null)) {
                    this.ctaRoot.SetActive(this.endOverlayArmed || (this.showCtaButton && this.ctaCountThreshold > 0 && this.interactionCount >= this.ctaCountThreshold));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.countText, null)) {
                    this.countText.text = "BUILT " + this.builtCount + "/" + this.slots.length;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.progressText, null)) {
                    this.progressText.text = this.builtCount + "/" + this.slots.length;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.progressFill, null)) {
                    this.progressFill.fillAmount = this.slots.length === 0 ? 0 : this.builtCount / this.slots.length;
                }
                if (!this.started && UnityEngine.MonoBehaviour.op_Inequality(this.timerText, null)) {
                    this.timerText.text = Math.ceil(this.durationSeconds) + "s";
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.promptText, null)) {
                    if (this.endOverlayArmed) {
                        this.promptText.text = "";
                    } else {
                        if (this.animating) {
                            this.promptText.text = "BUILDING...";
                        } else {
                            if (this.tutorialStage === CEBB.Playable.RoomTutorialStage.PlaceBed) {
                                this.promptText.text = this.firstPrompt;
                            } else {
                                if (this.tutorialStage === CEBB.Playable.RoomTutorialStage.LookAround) {
                                    this.promptText.text = "DRAG TO LOOK AROUND";
                                } else {
                                    if (this.tutorialStage === CEBB.Playable.RoomTutorialStage.Move) {
                                        this.promptText.text = "";
                                    } else {
                                        if (this.aimedIndex >= 0) {
                                            this.promptText.text = "TAP TO BUILD " + (this.slots[this.aimedIndex].definition.displayName.toUpperCase() || "");
                                        } else {
                                            if (this.hintIndex >= 0) {
                                                this.promptText.text = "TAP THE HIGHLIGHTED " + (this.slots[this.hintIndex].definition.displayName.toUpperCase() || "");
                                            } else {
                                                this.promptText.text = "MOVE + DRAG TO FIND A SPOT";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (this.inventory == null) {
                    return;
                }
                for (var i = 0; i < this.inventory.length; i = (i + 1) | 0) {
                    var e = this.inventory[i];
                    var n = this.Remaining(e.definition);
                    var empty = n === 0;
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.quantityText, null)) {
                        e.quantityText.text = "x" + n;
                    }
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.button, null)) {
                        e.button.interactable = !empty && !this.endOverlayArmed && this.tutorialStage === CEBB.Playable.RoomTutorialStage.Explore;
                    }
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.frame, null)) {
                        e.frame.color = empty ? new pc.Color( 0.23, 0.25, 0.23, 1 ) : i === this.selectedInventory ? new pc.Color( 1, 0.82, 0.25, 1 ) : new pc.Color( 0.48, 0.5, 0.46, 1 );
                    }
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.icon, null)) {
                        e.icon.color = empty ? new pc.Color( 0.38, 0.38, 0.38, 1 ) : new pc.Color( 1, 1, 1, 1 );
                    }
                    if (UnityEngine.GameObject.op_Inequality(e.emptyBadge, null)) {
                        e.emptyBadge.SetActive(empty);
                    }
                }
            },
            /*CEBB.Playable.BedroomPlayable.UpdateUi end.*/

            /*CEBB.Playable.BedroomPlayable.EndGame start.*/
            EndGame: function (completed) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#EndGame", this ); }

                var $t;
                if (this.endOverlayArmed) {
                    return;
                }
                this.endOverlayArmed = true;
                this.overlayArmedFrame = UnityEngine.Time.frameCount;
                this.state = completed ? CEBB.Playable.BedroomState.Completed : CEBB.Playable.BedroomState.Ended;
                this.tutorialStage = CEBB.Playable.RoomTutorialStage.Finished;
                this.timerRunning = false;
                this.aimedIndex = -1;
                this.hintIndex = -1;
                $t = Bridge.getEnumerator(this.slots);
                try {
                    while ($t.moveNext()) {
                        var s = $t.Current;
                        if (UnityEngine.GameObject.op_Inequality(s.ghost, null)) {
                            s.ghost.SetActive(false);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (UnityEngine.Component.op_Inequality(this.hand, null)) {
                    this.hand.gameObject.SetActive(false);
                }
                if (UnityEngine.GameObject.op_Inequality(this.endOverlayRoot, null)) {
                    this.endOverlayRoot.SetActive(true);
                    this.endOverlayRoot.transform.SetAsLastSibling();
                }

                this.SignalEnded();
                this.UpdateUi();
            },
            /*CEBB.Playable.BedroomPlayable.EndGame end.*/

            /*CEBB.Playable.BedroomPlayable.SignalEnded start.*/
            SignalEnded: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#SignalEnded", this ); }

                if (this.endedSent) {
                    return;
                }
                this.endedSent = true;
                this.onEndCardRequested.Invoke();
                this.onGameEnded.Invoke();
            },
            /*CEBB.Playable.BedroomPlayable.SignalEnded end.*/

            /*CEBB.Playable.BedroomPlayable.OpenEndCardAndCta start.*/
            OpenEndCardAndCta: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#OpenEndCardAndCta", this ); }

                if (!this.endOverlayArmed || UnityEngine.Time.frameCount <= this.overlayArmedFrame || this.lastCtaFrame === UnityEngine.Time.frameCount) {
                    return;
                }
                this.lastCtaFrame = UnityEngine.Time.frameCount;
                if (!this.ctaDelivered) {
                    this.ctaDelivered = true;
                }
                this.onCtaClicked.Invoke();
            },
            /*CEBB.Playable.BedroomPlayable.OpenEndCardAndCta end.*/

            /*CEBB.Playable.BedroomPlayable.OpenStore start.*/
            OpenStore: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#OpenStore", this ); }

                if (this.endOverlayArmed) {
                    this.OpenEndCardAndCta();
                    return;
                }

                if (UnityEngine.GameObject.op_Equality(this.ctaRoot, null) || !this.ctaRoot.activeSelf || this.lastCtaFrame === UnityEngine.Time.frameCount) {
                    return;
                }
                this.lastCtaFrame = UnityEngine.Time.frameCount;
                Luna.Unity.Playable.InstallFullGame();
                this.onCtaClicked.Invoke();
            },
            /*CEBB.Playable.BedroomPlayable.OpenStore end.*/

            /*CEBB.Playable.BedroomPlayable.OnApplicationPause start.*/
            OnApplicationPause: function (value) {
if ( TRACE ) { TRACE( "CEBB.Playable.BedroomPlayable#OnApplicationPause", this ); }

                this.paused = value;
            },
            /*CEBB.Playable.BedroomPlayable.OnApplicationPause end.*/


        }
    });
    /*CEBB.Playable.BedroomPlayable end.*/

    /*CEBB.Playable.BedroomState start.*/
    Bridge.define("CEBB.Playable.BedroomState", {
        $kind: 6,
        statics: {
            fields: {
                WaitingForStart: 0,
                FirstBuild: 1,
                GuidedBuild: 2,
                FreeBuild: 3,
                Completed: 4,
                Ended: 5
            }
        }
    });
    /*CEBB.Playable.BedroomState end.*/

    /*CEBB.Playable.CherryHouseReveal start.*/
    Bridge.define("CEBB.Playable.CherryHouseReveal", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            game: null,
            player: null,
            revealSeconds: 0,
            houseTarget: null,
            revealing: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.CherryHouseReveal#init", this ); }

                this.houseTarget = new UnityEngine.Vector3();
                this.revealSeconds = 2.5;
                this.houseTarget = new pc.Vec3( 0, 2.8, 0 );
            }
        },
        methods: {
            /*CEBB.Playable.CherryHouseReveal.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.CherryHouseReveal#OnEnable", this ); }

                var $t;
                $t = Bridge.getEnumerator(this.GetComponentsInChildren$1(CEBB.Playable.BedroomLayout, true));
                try {
                    while ($t.moveNext()) {
                        var layout = $t.Current;
                        if (UnityEngine.Component.op_Inequality(layout.completedDemo, null)) {
                            layout.completedDemo.gameObject.SetActive(true);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.game.onGameEnded.AddListener(Bridge.fn.cacheBind(this, this.Reveal));
            },
            /*CEBB.Playable.CherryHouseReveal.OnEnable end.*/

            /*CEBB.Playable.CherryHouseReveal.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.CherryHouseReveal#OnDisable", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.game, null)) {
                    this.game.onGameEnded.RemoveListener(Bridge.fn.cacheBind(this, this.Reveal));
                }
            },
            /*CEBB.Playable.CherryHouseReveal.OnDisable end.*/

            /*CEBB.Playable.CherryHouseReveal.Reveal start.*/
            Reveal: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.CherryHouseReveal#Reveal", this ); }

                var $t, $t1;
                if (this.revealing) {
                    return;
                }
                this.revealing = true;
                this.player.enabled = false;
                var camera = this.player.playerCamera;
                $t = Bridge.getEnumerator(this.GetComponentsInChildren$1(CEBB.Playable.BedroomLayout, true));
                try {
                    while ($t.moveNext()) {
                        var layout = $t.Current;
                        layout.preserveCameraView = true;
                        if (UnityEngine.Component.op_Inequality(layout.completedDemo, null)) {
                            layout.completedDemo.gameObject.SetActive(true);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.player.movePad, null)) {
                    this.player.movePad.gameObject.SetActive(false);
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.player.reticle, null)) {
                    this.player.reticle.gameObject.SetActive(false);
                }
                if (this.game.inventory != null) {
                    $t1 = Bridge.getEnumerator(this.game.inventory);
                    try {
                        while ($t1.moveNext()) {
                            var entry = $t1.Current;
                            if (UnityEngine.MonoBehaviour.op_Inequality(entry.button, null)) {
                                entry.button.transform.parent.gameObject.SetActive(false);
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                }
                this.StartCoroutine$1(this.PullBack(camera));
            },
            /*CEBB.Playable.CherryHouseReveal.Reveal end.*/

            /*CEBB.Playable.CherryHouseReveal.PullBack start.*/
            PullBack: function (camera) {
if ( TRACE ) { TRACE( "CEBB.Playable.CherryHouseReveal#PullBack", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    start,
                    startRotation,
                    startFov,
                    elapsed,
                    t,
                    aspect,
                    distance,
                    end,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    start = camera.transform.position.$clone();
                                        startRotation = camera.transform.rotation.$clone();
                                        startFov = camera.fieldOfView;
                                        elapsed = 0;
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( elapsed < this.revealSeconds ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    elapsed += UnityEngine.Time.unscaledDeltaTime;
                                        t = pc.math.smoothstep(0, 1, Math.max(0, Math.min(1, elapsed / UnityEngine.Mathf.Max(0.01, this.revealSeconds))));
                                        aspect = UnityEngine.Screen.width / UnityEngine.Mathf.Max(1, UnityEngine.Screen.height);
                                        distance = UnityEngine.Mathf.Max(36, 18 / UnityEngine.Mathf.Max(0.4, aspect));
                                        end = this.houseTarget.$clone().add( new pc.Vec3( 0.42, 0.32, -0.85 ).clone().normalize().$clone().clone().scale( distance ) );
                                        camera.transform.position = new pc.Vec3().lerp( start, end, t );
                                        camera.transform.rotation = new pc.Quat().slerpUnclamped( startRotation, new pc.Quat().lookRotation( this.houseTarget.$clone().sub( end ), pc.Vec3.UP ), pc.math.clamp( t, 0, 1 ) );
                                        camera.fieldOfView = pc.math.lerp(startFov, 50, t);
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {

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
            /*CEBB.Playable.CherryHouseReveal.PullBack end.*/


        }
    });
    /*CEBB.Playable.CherryHouseReveal end.*/

    /*CEBB.Playable.DecorCatalogEntry start.*/
    Bridge.define("CEBB.Playable.DecorCatalogEntry", {
        fields: {
            item: null,
            button: null,
            frame: null,
            icon: null,
            quantityText: null,
            nameText: null,
            emptyBadge: null
        }
    });
    /*CEBB.Playable.DecorCatalogEntry end.*/

    /*CEBB.Playable.DecorItem start.*/
    Bridge.define("CEBB.Playable.DecorItem", {
        inherits: [UnityEngine.ScriptableObject],
        fields: {
            itemId: null,
            displayName: null,
            prefab: null,
            icon: null,
            mount: 0,
            walkableSurface: false,
            topSurface: false,
            quantity: 0,
            boundsSize: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.DecorItem#init", this ); }

                this.boundsSize = new UnityEngine.Vector3();
                this.mount = CEBB.Playable.DecorMount.Floor;
                this.walkableSurface = false;
                this.topSurface = false;
                this.quantity = 2;
                this.boundsSize = new pc.Vec3( 1, 1, 1 );
            }
        }
    });
    /*CEBB.Playable.DecorItem end.*/

    /*CEBB.Playable.DecorMount start.*/
    Bridge.define("CEBB.Playable.DecorMount", {
        $kind: 6,
        statics: {
            fields: {
                Floor: 0,
                Wall: 1
            }
        }
    });
    /*CEBB.Playable.DecorMount end.*/

    /*CEBB.Playable.FirstPersonRoom start.*/
    Bridge.define("CEBB.Playable.FirstPersonRoom", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            game: null,
            playerCamera: null,
            movePad: null,
            reticle: null,
            spawnPosition: null,
            eyeHeight: 0,
            walkSpeed: 0,
            lookSensitivity: 0,
            buildReach: 0,
            yaw: 0,
            pitch: 0,
            minRoom: null,
            maxRoom: null,
            focusing: false,
            focusYaw: 0,
            focusPitch: 0,
            focusUntil: 0,
            centerFirstTarget: false,
            bodyRadius: 0,
            blockers: null,
            aimHits: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#init", this ); }

                this.spawnPosition = new UnityEngine.Vector3();
                this.minRoom = new UnityEngine.Vector2();
                this.maxRoom = new UnityEngine.Vector2();
                this.spawnPosition = new pc.Vec3( 1.2, 0, -2.7 );
                this.eyeHeight = 1.65;
                this.walkSpeed = 2.5;
                this.lookSensitivity = 150;
                this.buildReach = 7;
                this.yaw = -20;
                this.pitch = 10;
                this.minRoom = new pc.Vec2( -4.45, -3.85 );
                this.maxRoom = new pc.Vec2( 4.45, 3.85 );
                this.centerFirstTarget = true;
                this.bodyRadius = 0.22;
                this.aimHits = System.Array.init(32, function (){
                    return new UnityEngine.RaycastHit();
                }, UnityEngine.RaycastHit);
            }
        },
        methods: {
            /*CEBB.Playable.FirstPersonRoom.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#Start", this ); }

                this.transform.position = this.spawnPosition.$clone();
                if (this.centerFirstTarget && UnityEngine.MonoBehaviour.op_Inequality(this.game, null)) {
                    this.LookAtSlot(this.game.firstBedSlot);
                }
                this.ApplyView();
            },
            /*CEBB.Playable.FirstPersonRoom.Start end.*/

            /*CEBB.Playable.FirstPersonRoom.LookAtSlot start.*/
            LookAtSlot: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#LookAtSlot", this ); }

                var $t, $t1;
                if (this.game.slots == null || index < 0 || index >= this.game.slots.length || UnityEngine.Component.op_Equality(($t = this.game.slots)[index].targetCollider, null)) {
                    return;
                }
                var d = ($t1 = this.game.slots)[index].targetCollider.bounds.center.$clone().sub( (this.transform.position.$clone().add( pc.Vec3.UP.clone().clone().scale( this.eyeHeight ) )) );
                this.yaw = Math.atan2(d.x, d.z) * UnityEngine.Mathf.Rad2Deg;
                this.pitch = Math.max(-55, Math.min(-Math.atan2(d.y, new pc.Vec2( d.x, d.z ).length()) * UnityEngine.Mathf.Rad2Deg, 65));
            },
            /*CEBB.Playable.FirstPersonRoom.LookAtSlot end.*/

            /*CEBB.Playable.FirstPersonRoom.ApplyLook start.*/
            ApplyLook: function (delta) {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#ApplyLook", this ); }

                if (!this.game.AllowLook) {
                    return;
                }
                this.focusing = false;
                var oldPitch = this.pitch;
                var dy = delta.x / UnityEngine.Mathf.Max(1, UnityEngine.Screen.width) * this.lookSensitivity;
                this.yaw += dy;
                this.pitch = Math.max(-55, Math.min(this.pitch - delta.y / UnityEngine.Mathf.Max(1, UnityEngine.Screen.height) * this.lookSensitivity, 65));
                this.ApplyView();
                this.game.NotifyLookMotion(Math.abs(dy) + Math.abs(this.pitch - oldPitch));
            },
            /*CEBB.Playable.FirstPersonRoom.ApplyLook end.*/

            /*CEBB.Playable.FirstPersonRoom.ApplyView start.*/
            ApplyView: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#ApplyView", this ); }

                this.transform.rotation = new pc.Quat().setFromEulerAngles_Unity( 0, this.yaw, 0 );
                this.playerCamera.transform.localPosition = new pc.Vec3( 0, this.eyeHeight, 0 );
                this.playerCamera.transform.localRotation = new pc.Quat().setFromEulerAngles_Unity( this.pitch, 0, 0 );
            },
            /*CEBB.Playable.FirstPersonRoom.ApplyView end.*/

            /*CEBB.Playable.FirstPersonRoom.IsClear start.*/
            IsClear: function (p) {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#IsClear", this ); }

                if (this.blockers == null) {
                    this.blockers = UnityEngine.Object.FindObjectsOfType(UnityEngine.Collider);
                }
                for (var i = 0; i < this.blockers.length; i = (i + 1) | 0) {
                    var c = this.blockers[i];
                    if (UnityEngine.Component.op_Equality(c, null) || !c.enabled || c.isTrigger || !c.gameObject.activeInHierarchy || c.transform.IsChildOf(this.transform)) {
                        continue;
                    }
                    var b = c.bounds;
                    if (b.max.y < 0.1 || b.min.y > 1.6) {
                        continue;
                    }
                    if (p.x > b.min.x - this.bodyRadius && p.x < b.max.x + this.bodyRadius && p.z > b.min.z - this.bodyRadius && p.z < b.max.z + this.bodyRadius) {
                        return false;
                    }
                }
                return true;
            },
            /*CEBB.Playable.FirstPersonRoom.IsClear end.*/

            /*CEBB.Playable.FirstPersonRoom.Move start.*/
            Move: function (input, deltaTime) {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#Move", this ); }

                if (!this.game.CanMove) {
                    return;
                }
                var motion = new pc.Quat().setFromEulerAngles_Unity( 0, this.yaw, 0 ).transformVector( new pc.Vec3( input.x, 0, input.y ) ).clone().scale( this.walkSpeed ).clone().scale( UnityEngine.Mathf.Min(0.05, deltaTime) );
                var p = this.transform.position.$clone();
                var stuck = !this.IsClear(p);
                var x = p.$clone().add( new pc.Vec3( motion.x, 0, 0 ) );
                x.x = Math.max(this.minRoom.x, Math.min(x.x, this.maxRoom.x));
                if (stuck || this.IsClear(x)) {
                    p = x.$clone();
                }
                var z = p.$clone().add( new pc.Vec3( 0, 0, motion.z ) );
                z.z = Math.max(this.minRoom.y, Math.min(z.z, this.maxRoom.y));
                if (stuck || this.IsClear(z)) {
                    p = z.$clone();
                }
                var moved = pc.Vec3.distance( this.transform.position, p );
                this.transform.position = p.$clone();
                if (moved > 0) {
                    this.game.NotifyMoveDistance(moved);
                }
            },
            /*CEBB.Playable.FirstPersonRoom.Move end.*/

            /*CEBB.Playable.FirstPersonRoom.FindAimedSlot start.*/
            FindAimedSlot: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#FindAimedSlot", this ); }

                return this.FindSlotAlongRay(this.playerCamera.ViewportPointToRay(new pc.Vec3( 0.5, 0.5, 0 )));
            },
            /*CEBB.Playable.FirstPersonRoom.FindAimedSlot end.*/

            /*CEBB.Playable.FirstPersonRoom.FindSlotAlongRay start.*/
            FindSlotAlongRay: function (ray) {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#FindSlotAlongRay", this ); }

                var $t, $t1;
                if (!this.game.CanAim) {
                    return -1;
                }
                var count = UnityEngine.Physics.RaycastNonAlloc$1(ray, this.aimHits, this.buildReach, UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Collide);
                var best = -1;
                var nearest = this.buildReach, solid = this.buildReach;
                for (var n = 0; n < count; n = (n + 1) | 0) {
                    var hit = this.aimHits[n].$clone();
                    var placement = false;
                    for (var i = 0; i < this.game.slots.length; i = (i + 1) | 0) {
                        if (UnityEngine.Component.op_Equality(($t = this.game.slots)[i].targetCollider, hit.collider)) {
                            placement = true;
                            // Placement bounds also contain porches and overhangs. A built
                            // house's broad bounds must not swallow taps on nearby decor.
                            if (!($t1 = this.game.slots)[i].built && hit.distance < nearest) {
                                best = i;
                                nearest = hit.distance;
                            }
                            break;
                        }
                    }
                    if (!placement && !hit.collider.isTrigger) {
                        solid = UnityEngine.Mathf.Min(solid, hit.distance);
                    }
                }
                return nearest <= solid ? best : -1;
            },
            /*CEBB.Playable.FirstPersonRoom.FindSlotAlongRay end.*/

            /*CEBB.Playable.FirstPersonRoom.FindHintCandidate start.*/
            FindHintCandidate: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#FindHintCandidate", this ); }

                var $t;
                var best = -1, fallback = -1;
                var score = 3.40282347E+38, nearest = 3.40282347E+38;
                var origin = this.playerCamera.transform.position.$clone();
                for (var i = 0; i < this.game.slots.length; i = (i + 1) | 0) {
                    var s = ($t = this.game.slots)[i];
                    if (s.built || UnityEngine.Component.op_Equality(s.targetCollider, null)) {
                        continue;
                    }
                    var delta = s.targetCollider.bounds.center.$clone().sub( origin );
                    var distance = delta.length();
                    if (distance < 0.3) {
                        continue;
                    }
                    if (distance < nearest) {
                        nearest = distance;
                        fallback = i;
                    }
                    var hit = { v : new UnityEngine.RaycastHit() };
                    if (!UnityEngine.Physics.Raycast$3(origin, delta.$clone().scale( 1.0 / ( distance ) ), hit, distance + 0.1, UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Collide) || UnityEngine.Component.op_Inequality(hit.v.collider, s.targetCollider)) {
                        continue;
                    }
                    var value = distance + Math.acos( pc.math.clamp( this.playerCamera.transform.forward.clone().normalize().dot( delta.clone().normalize() ), -1, 1 ) ) * pc.math.RAD_TO_DEG * 0.025;
                    if (value < score) {
                        best = i;
                        score = value;
                    }
                }
                return best >= 0 ? best : fallback;
            },
            /*CEBB.Playable.FirstPersonRoom.FindHintCandidate end.*/

            /*CEBB.Playable.FirstPersonRoom.FocusOnHint start.*/
            FocusOnHint: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#FocusOnHint", this ); }

                var $t;
                var d = ($t = this.game.slots)[index].targetCollider.bounds.center.$clone().sub( this.playerCamera.transform.position );
                this.focusYaw = Math.atan2(d.x, d.z) * UnityEngine.Mathf.Rad2Deg;
                this.focusPitch = Math.max(-55, Math.min(-Math.atan2(d.y, new pc.Vec2( d.x, d.z ).length()) * UnityEngine.Mathf.Rad2Deg, 65));
                this.focusUntil = UnityEngine.Time.unscaledTime + 0.5;
                this.focusing = true;
            },
            /*CEBB.Playable.FirstPersonRoom.FocusOnHint end.*/

            /*CEBB.Playable.FirstPersonRoom.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#Update", this ); }

                if (this.focusing && this.game.AllowLook) {
                    var k = 1 - UnityEngine.Mathf.Exp(-UnityEngine.Time.unscaledDeltaTime * 12);
                    this.yaw = UnityEngine.Mathf.LerpAngle(this.yaw, this.focusYaw, k);
                    this.pitch = pc.math.lerp(this.pitch, this.focusPitch, k);
                    this.ApplyView();
                    if (UnityEngine.Time.unscaledTime >= this.focusUntil) {
                        this.focusing = false;
                    }
                }
                var input = UnityEngine.MonoBehaviour.op_Equality(this.movePad, null) ? pc.Vec2.ZERO.clone() : this.movePad.Value.$clone();
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.W) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.UpArrow)) {
                    input.y += 1;
                }
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.S) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.DownArrow)) {
                    input.y -= 1;
                }
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.D) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.RightArrow)) {
                    input.x += 1;
                }
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.A) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.LeftArrow)) {
                    input.x -= 1;
                }
                input = pc.Vec2.lengthClamp( input, 1 );
                if (input.lengthSq() > 0.01 && this.game.CanMove) {
                    this.Move(input, UnityEngine.Time.deltaTime);
                }
            },
            /*CEBB.Playable.FirstPersonRoom.Update end.*/

            /*CEBB.Playable.FirstPersonRoom.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FirstPersonRoom#LateUpdate", this ); }

                var index = this.FindAimedSlot();
                this.game.SetAimedSlot(index);
                this.game.UpdateGuidanceVisual(this.playerCamera);
                if (UnityEngine.MonoBehaviour.op_Inequality(this.reticle, null)) {
                    this.reticle.color = index >= 0 ? new pc.Color( 0.35, 1, 0.9, 1 ) : new pc.Color( 1, 1, 1, 1 );
                }
            },
            /*CEBB.Playable.FirstPersonRoom.LateUpdate end.*/


        }
    });
    /*CEBB.Playable.FirstPersonRoom end.*/

    /*CEBB.Playable.FurnitureDefinition start.*/
    Bridge.define("CEBB.Playable.FurnitureDefinition", {
        inherits: [UnityEngine.ScriptableObject],
        fields: {
            furnitureId: null,
            displayName: null,
            prefab: null,
            icon: null,
            walkableSurface: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FurnitureDefinition#init", this ); }

                this.walkableSurface = false;
            }
        }
    });
    /*CEBB.Playable.FurnitureDefinition end.*/

    /*CEBB.Playable.FurnitureInventoryEntry start.*/
    Bridge.define("CEBB.Playable.FurnitureInventoryEntry", {
        fields: {
            definition: null,
            button: null,
            frame: null,
            icon: null,
            quantityText: null,
            emptyBadge: null
        }
    });
    /*CEBB.Playable.FurnitureInventoryEntry end.*/

    /*CEBB.Playable.FurnitureSlot start.*/
    Bridge.define("CEBB.Playable.FurnitureSlot", {
        fields: {
            definition: null,
            anchor: null,
            localPosition: null,
            localEulerAngles: null,
            localScale: null,
            buildOrder: 0,
            button: null,
            frame: null,
            builtBadge: null,
            instance: null,
            ghost: null,
            built: false,
            targetCollider: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.FurnitureSlot#init", this ); }

                this.localPosition = new UnityEngine.Vector3();
                this.localEulerAngles = new UnityEngine.Vector3();
                this.localScale = new UnityEngine.Vector3();
                this.localScale = new pc.Vec3( 1, 1, 1 );
            }
        }
    });
    /*CEBB.Playable.FurnitureSlot end.*/

    /*CEBB.Playable.FurnitureTarget start.*/
    Bridge.define("CEBB.Playable.FurnitureTarget", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            owner: null,
            slotIndex: 0
        }
    });
    /*CEBB.Playable.FurnitureTarget end.*/

    /*CEBB.Playable.LivingRoomLookSurface start.*/
    Bridge.define("CEBB.Playable.LivingRoomLookSurface", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            player: null,
            pointer: 0,
            start: null,
            downTime: 0,
            dragged: false
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomLookSurface#init", this ); }

                this.start = new UnityEngine.Vector2();
                this.pointer = -999;
            }
        },
        methods: {
            /*CEBB.Playable.LivingRoomLookSurface.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomLookSurface#OnPointerDown", this ); }

                if (this.pointer !== -999 || this.player.game.EndOverlayArmed) {
                    return;
                }
                this.pointer = e.pointerId;
                this.start = e.position.$clone();
                this.downTime = UnityEngine.Time.unscaledTime;
                this.dragged = false;
                this.player.game.NotifyFirstInput();
                this.player.game.NotifyScreenTouch();
            },
            /*CEBB.Playable.LivingRoomLookSurface.OnPointerDown end.*/

            /*CEBB.Playable.LivingRoomLookSurface.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomLookSurface#OnDrag", this ); }

                if (e.pointerId !== this.pointer) {
                    return;
                }
                // A tap must not turn the view: the finger always wobbles a few pixels, which used to rotate the camera,
                // move the ghost to the next grid cell and build there instead of where the ghost was when the finger went down.
                // The view only turns once the finger has really moved (then the whole movement so far is applied at once).
                if (!this.dragged) {
                    var limit = UnityEngine.Mathf.Max(12.0, UnityEngine.Screen.height * 0.015);
                    if ((e.position.$clone().sub( this.start )).lengthSq() < limit * limit) {
                        return;
                    }
                    this.dragged = true;
                    this.player.ApplyLook(e.position.$clone().sub( this.start ));
                    return;
                }
                this.player.ApplyLook(e.delta);
            },
            /*CEBB.Playable.LivingRoomLookSurface.OnDrag end.*/

            /*CEBB.Playable.LivingRoomLookSurface.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomLookSurface#OnPointerUp", this ); }

                if (e.pointerId !== this.pointer) {
                    return;
                }
                this.pointer = -999;
                if (!this.dragged && UnityEngine.Time.unscaledTime - this.downTime < 0.5) {
                    this.player.game.TapAt(e.position);
                } else {
                    this.player.game.ClearIgnoredTap();
                }
            },
            /*CEBB.Playable.LivingRoomLookSurface.OnPointerUp end.*/

            /*CEBB.Playable.LivingRoomLookSurface.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomLookSurface#OnDisable", this ); }

                this.pointer = -999;
            },
            /*CEBB.Playable.LivingRoomLookSurface.OnDisable end.*/


        }
    });
    /*CEBB.Playable.LivingRoomLookSurface end.*/

    /*CEBB.Playable.LivingRoomPlayable start.*/
    Bridge.define("CEBB.Playable.LivingRoomPlayable", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                buildNormal: null,
                buildLocked: null,
                trashIdle: null,
                trashActive: null
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#init", this ); }

                    this.buildNormal = new UnityEngine.Color();
                    this.buildLocked = new UnityEngine.Color();
                    this.trashIdle = new UnityEngine.Color();
                    this.trashActive = new UnityEngine.Color();
                    this.buildNormal = new pc.Color( 1, 1, 1, 1 );
                    this.buildLocked = new pc.Color( 0.5, 0.5, 0.5, 0.85 );
                    this.trashIdle = new pc.Color( 1, 1, 1, 1 );
                    this.trashActive = new pc.Color( 0.7, 1.0, 0.25, 1.0 );
                }
            },
            methods: {
                /*CEBB.Playable.LivingRoomPlayable.CanStackOn:static start.*/
                CanStackOn: function (item, surface) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#CanStackOn", this ); }

                    if (!surface.topSurface || item.boundsSize.y > 1.05) {
                        return false;
                    }
                    return item.boundsSize.x * item.boundsSize.z <= 0.75 * surface.boundsSize.x * surface.boundsSize.z;
                },
                /*CEBB.Playable.LivingRoomPlayable.CanStackOn:static end.*/

                /*CEBB.Playable.LivingRoomPlayable.Blocks:static start.*/
                Blocks: function (b, p, r) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Blocks", this ); }

                    if (b.max.y < 0.1 || b.min.y > 1.6) {
                        return false;
                    }
                    return p.x > b.min.x - r && p.x < b.max.x + r && p.z > b.min.z - r && p.z < b.max.z + r;
                },
                /*CEBB.Playable.LivingRoomPlayable.Blocks:static end.*/

                /*CEBB.Playable.LivingRoomPlayable.UiPoint:static start.*/
                UiPoint: function (button, ui, screen, yOffset) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#UiPoint", this ); }

                    if (yOffset === void 0) { yOffset = 0.22; }
                    screen.v = pc.Vec2.ZERO.clone();
                    if (UnityEngine.MonoBehaviour.op_Equality(button, null) || !button.gameObject.activeInHierarchy) {
                        return false;
                    }
                    var rt = Bridge.as(button.transform, UnityEngine.RectTransform);
                    screen.v = UnityEngine.RectTransformUtility.WorldToScreenPoint(ui, rt.TransformPoint$1(UnityEngine.Vector3.FromVector2(rt.rect.center.$clone().add( new pc.Vec2( 0, rt.rect.height * yOffset ) ))));
                    return true;
                },
                /*CEBB.Playable.LivingRoomPlayable.UiPoint:static end.*/


            }
        },
        fields: {
            catalog: null,
            firstEntry: 0,
            guideEntry: 0,
            lookGuide: null,
            lookGuideRadius: null,
            lookTutorialDegrees: 0,
            moveTutorialDistance: 0,
            roomRoot: null,
            placedRoot: null,
            ghostMaterial: null,
            ghostInvalidMaterial: null,
            deleteMarker: null,
            footprintMarker: null,
            roomMin: null,
            roomMax: null,
            roomHeight: 0,
            snap: 0,
            buildReach: 0,
            player: null,
            luna: null,
            promptText: null,
            countText: null,
            buildLabel: null,
            hand: null,
            buildButton: null,
            trashButton: null,
            rotateButton: null,
            ctaButton: null,
            trashImage: null,
            reticle: null,
            buildFill: null,
            firstPrompt: null,
            selectPrompt: null,
            lookPrompt: null,
            movePrompt: null,
            aimPrompt: null,
            buildPrompt: null,
            freePrompt: null,
            trashPrompt: null,
            deletePrompt: null,
            emptyPrompt: null,
            overlapPrompt: null,
            playerPrompt: null,
            wallPrompt: null,
            heightPrompt: null,
            revealSeconds: 0,
            placementAudio: null,
            placementSfx: null,
            placementVolume: 0,
            bgmSource: null,
            bgmClip: null,
            bgmVolume: 0,
            bgmEnabled: false,
            onGameStarted: null,
            onGameEnded: null,
            onCtaClicked: null,
            onFurniturePlaced: null,
            stage: 0,
            interactionCount: 0,
            builtCount: 0,
            placementsTotal: 0,
            selected: 0,
            pool: null,
            placed: null,
            byCollider: null,
            roomSolids: null,
            ghosts: null,
            ghostRenderers: null,
            ghostRed: null,
            footprintRenderer: null,
            started: false,
            endOverlayArmed: false,
            deleteMode: false,
            poseValid: false,
            hasPose: false,
            paused: false,
            removedOnce: false,
            ignoreNextTap: false,
            lookProgress: 0,
            moveProgress: 0,
            posePosition: null,
            poseYaw: 0,
            rotateOffset: 0,
            aimedPiece: null,
            deleteHint: null,
            invalidReason: null,
            lastClickFrame: 0,
            lastCtaFrame: 0,
            animating: 0,
            flashUntil: 0,
            flashText: null,
            guidanceCanvas: null,
            guidanceRect: null
        },
        props: {
            Stage: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Stage#get", this ); }

                    return this.stage;
                }
            },
            InteractionCount: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#InteractionCount#get", this ); }

                    return this.interactionCount;
                }
            },
            BuiltCount: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#BuiltCount#get", this ); }

                    return this.builtCount;
                }
            },
            EndOverlayArmed: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#EndOverlayArmed#get", this ); }

                    return this.endOverlayArmed;
                }
            },
            IsDeleteMode: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#IsDeleteMode#get", this ); }

                    return this.deleteMode;
                }
            },
            AllowLook: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#AllowLook#get", this ); }

                    return !this.endOverlayArmed && !this.paused;
                }
            },
            CanMove: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#CanMove#get", this ); }

                    return this.AllowLook;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#init", this ); }

                this.lookGuideRadius = new UnityEngine.Vector2();
                this.roomMin = new UnityEngine.Vector2();
                this.roomMax = new UnityEngine.Vector2();
                this.posePosition = new UnityEngine.Vector3();
                this.firstEntry = 0;
                this.guideEntry = 2;
                this.lookGuideRadius = new pc.Vec2( 170, 62 );
                this.lookTutorialDegrees = 40;
                this.moveTutorialDistance = 1.5;
                this.roomMin = new pc.Vec2( -4.85, -4.35 );
                this.roomMax = new pc.Vec2( 4.85, 4.35 );
                this.roomHeight = 4.0;
                this.snap = 0.25;
                this.buildReach = 9.0;
                this.firstPrompt = "TAP TO DECOR LIVING ROOM";
                this.selectPrompt = "CHOOSE A FURNITURE";
                this.lookPrompt = "DRAG TO LOOK AROUND";
                this.movePrompt = "MOVE WITH THE JOYSTICK";
                this.aimPrompt = "DRAG TO FIND A CLEAR SPOT";
                this.buildPrompt = "TAP BUILD TO PLACE IT";
                this.freePrompt = "DECORATE YOUR LIVING ROOM";
                this.trashPrompt = "TAP TRASH TO REMOVE AN ITEM";
                this.deletePrompt = "TAP AN ITEM TO REMOVE IT";
                this.emptyPrompt = "PICK ANOTHER FURNITURE";
                this.overlapPrompt = "OVERLAPS ANOTHER ITEM";
                this.playerPrompt = "TOO CLOSE TO YOU";
                this.wallPrompt = "PLACE IT ON A WALL";
                this.heightPrompt = "NOT ENOUGH ROOM HERE";
                this.revealSeconds = 0.32;
                this.placementVolume = 0.65;
                this.bgmVolume = 1.0;
                this.bgmEnabled = true;
                this.onGameStarted = new UnityEngine.Events.UnityEvent();
                this.onGameEnded = new UnityEngine.Events.UnityEvent();
                this.onCtaClicked = new UnityEngine.Events.UnityEvent();
                this.onFurniturePlaced = new UnityEngine.Events.UnityEvent();
                this.selected = -1;
                this.placed = new (System.Collections.Generic.List$1(CEBB.Playable.LivingRoomPlayable.Piece)).ctor();
                this.byCollider = new (System.Collections.Generic.Dictionary$2(UnityEngine.Collider,CEBB.Playable.LivingRoomPlayable.Piece)).ctor();
                this.roomSolids = new (System.Collections.Generic.List$1(UnityEngine.Collider)).ctor();
                this.lastClickFrame = -1;
                this.lastCtaFrame = -1;
            }
        },
        methods: {
            /*CEBB.Playable.LivingRoomPlayable.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Awake", this ); }

                var $t, $t1;
                this.ApplyPlaygroundSettings();
                this.stage = CEBB.Playable.LivingStage.SelectItem;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.promptText, null)) {
                    this.guidanceCanvas = this.promptText.canvas;
                    this.guidanceRect = this.guidanceCanvas.GetComponent(UnityEngine.RectTransform);
                }
                if (UnityEngine.Component.op_Inequality(this.roomRoot, null)) {
                    $t = Bridge.getEnumerator(this.roomRoot.GetComponentsInChildren(UnityEngine.Collider));
                    try {
                        while ($t.moveNext()) {
                            var c = $t.Current;
                            if (!c.isTrigger) {
                                this.roomSolids.add(c);
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
                this.pool = System.Array.init(this.catalog.length, null, System.Collections.Generic.List$1(CEBB.Playable.LivingRoomPlayable.Piece));
                this.ghosts = System.Array.init(this.catalog.length, null, UnityEngine.GameObject);
                this.ghostRenderers = System.Array.init(this.catalog.length, null, System.Array.type(UnityEngine.Renderer));
                this.ghostRed = System.Array.init(this.catalog.length, false, System.Boolean);
                for (var e = 0; e < this.catalog.length; e = (e + 1) | 0) {
                    this.pool[e] = new (System.Collections.Generic.List$1(CEBB.Playable.LivingRoomPlayable.Piece)).ctor();
                    var item = this.catalog[e].item;
                    if (item == null || UnityEngine.GameObject.op_Equality(item.prefab, null)) {
                        UnityEngine.Debug.LogError$2("Missing decor item " + e, this);
                        continue;
                    }
                    var size = item.boundsSize.$clone();
                    size.y = UnityEngine.Mathf.Max(0.03, size.y);
                    for (var q = 0; q < item.quantity; q = (q + 1) | 0) {
                        var go = UnityEngine.Object.Instantiate$1(UnityEngine.GameObject, item.prefab, this.placedRoot, false);
                        go.name = (item.displayName || "") + " " + (((q + 1) | 0));
                        var box = go.AddComponent(UnityEngine.BoxCollider);
                        box.center = new pc.Vec3( 0, size.y * 0.5, 0 );
                        box.size = size.$clone();
                        box.isTrigger = item.walkableSurface;
                        var piece = ($t1 = new CEBB.Playable.LivingRoomPlayable.Piece(), $t1.entry = e, $t1.go = go, $t1.box = box, $t1.walkable = item.walkableSurface, $t1);
                        this.pool[e].add(piece);
                        this.byCollider.setItem(box, piece);
                        go.SetActive(false);
                    }
                    var ghost = UnityEngine.Object.Instantiate$1(UnityEngine.GameObject, item.prefab, this.transform, false);
                    ghost.name = "Ghost \u2014 " + (item.displayName || "");
                    this.ghosts[e] = ghost;
                    this.ghostRenderers[e] = ghost.GetComponentsInChildren(UnityEngine.Renderer);
                    this.SetGhostMaterial(e, false, true);
                    ghost.SetActive(false);
                    var n = { v : e };
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.catalog[e].button, null)) {
                        this.catalog[e].button.onClick.AddListener((function ($me, n) {
                            return Bridge.fn.bind($me, function () {
                                this.SelectEntry(n.v);
                            });
                        })(this, n));
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.buildButton, null)) {
                    this.buildButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.PressBuild));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.trashButton, null)) {
                    this.trashButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.PressTrash));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.rotateButton, null)) {
                    this.rotateButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.PressRotate));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.ctaButton, null)) {
                    this.ctaButton.onClick.AddListener(Bridge.fn.cacheBind(this, this.OpenStore));
                }
                if (UnityEngine.Component.op_Inequality(this.deleteMarker, null)) {
                    this.deleteMarker.gameObject.SetActive(false);
                }
                if (UnityEngine.Component.op_Inequality(this.footprintMarker, null)) {
                    this.footprintRenderer = this.footprintMarker.GetComponent(UnityEngine.Renderer);
                    this.footprintMarker.gameObject.SetActive(false);
                }
                if (UnityEngine.Component.op_Inequality(this.hand, null) && UnityEngine.Component.op_Inequality(this.guidanceRect, null)) {
                    this.hand.SetParent(this.guidanceRect, false);
                    this.hand.anchorMin = ($t1 = new pc.Vec2( 0.5, 0.5 ), this.hand.anchorMax = $t1.$clone(), $t1);
                    this.hand.SetAsLastSibling();
                }
                if (UnityEngine.Component.op_Inequality(this.lookGuide, null)) {
                    this.lookGuide.gameObject.SetActive(false);
                }
                this.UpdateUi();
                this.RefreshHud();
            },
            /*CEBB.Playable.LivingRoomPlayable.Awake end.*/

            /*CEBB.Playable.LivingRoomPlayable.ApplyPlaygroundSettings start.*/
            ApplyPlaygroundSettings: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#ApplyPlaygroundSettings", this ); }

                if (UnityEngine.Component.op_Inequality(this.bgmSource, null)) {
                    this.bgmSource.playOnAwake = false;
                    if (this.bgmClip != null) {
                        this.bgmSource.clip = this.bgmClip;
                    }
                    this.bgmSource.loop = true;
                    this.bgmSource.volume = Math.max(0, Math.min(1, this.bgmVolume));
                    this.bgmSource.Stop();
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.ApplyPlaygroundSettings end.*/

            /*CEBB.Playable.LivingRoomPlayable.SetGhostMaterial start.*/
            SetGhostMaterial: function (e, red, force) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#SetGhostMaterial", this ); }

                if (!force && this.ghostRed[e] === red) {
                    return;
                }
                this.ghostRed[e] = red;
                var mat = red && this.ghostInvalidMaterial != null ? this.ghostInvalidMaterial : this.ghostMaterial;
                var list = this.ghostRenderers[e];
                for (var i = 0; i < list.length; i = (i + 1) | 0) {
                    var r = list[i];
                    var mats = r.sharedMaterials;
                    for (var k = 0; k < mats.length; k = (k + 1) | 0) {
                        mats[k] = mat;
                    }
                    r.sharedMaterials = mats;
                    r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                    r.receiveShadows = false;
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.SetGhostMaterial end.*/

            /*CEBB.Playable.LivingRoomPlayable.NotifyFirstInput start.*/
            NotifyFirstInput: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#NotifyFirstInput", this ); }

                if (this.started) {
                    return;
                }
                this.started = true;
                if (UnityEngine.Component.op_Inequality(this.bgmSource, null) && this.bgmEnabled && this.bgmSource.clip != null) {
                    this.bgmSource.Play();
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.luna, null)) {
                    this.luna.NotifyStarted();
                }
                this.onGameStarted.Invoke();
            },
            /*CEBB.Playable.LivingRoomPlayable.NotifyFirstInput end.*/

            /*CEBB.Playable.LivingRoomPlayable.TapAt start.*/
            TapAt: function (screen) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#TapAt", this ); }

                if (this.endOverlayArmed || this.paused) {
                    return;
                }
                this.NotifyFirstInput();
                if (this.ignoreNextTap) {
                    this.ignoreNextTap = false;
                    return;
                }
                if (UnityEngine.MonoBehaviour.op_Equality(this.player, null)) {
                    return;
                }
                var ray = this.player.playerCamera.ScreenPointToRay(UnityEngine.Vector3.FromVector2(screen));
                if (this.deleteMode) {
                    var p = this.PieceUnder(ray);
                    if (p != null) {
                        this.Remove(p);
                        this.Count();
                    }
                    return;
                }
                if (this.stage === CEBB.Playable.LivingStage.SelectItem || this.selected < 0 || this.Remaining(this.selected) === 0) {
                    return;
                }
                // build exactly where the ghost is shown (crosshair), never at the raw touch point
                if (this.hasPose && this.poseValid) {
                    this.Place(this.selected, this.posePosition, this.poseYaw);
                    this.Count();
                } else {
                    this.Flash(this.hasPose ? this.invalidReason : this.aimPrompt);
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.TapAt end.*/

            /*CEBB.Playable.LivingRoomPlayable.SelectEntry start.*/
            SelectEntry: function (index) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#SelectEntry", this ); }

                if (this.endOverlayArmed || index < 0 || index >= this.catalog.length || this.Frame()) {
                    return;
                }
                this.NotifyFirstInput();
                this.SetDeleteMode(false);
                if (this.Remaining(index) === 0) {
                    this.Flash(this.emptyPrompt);
                } else {
                    if (this.selected >= 0 && this.selected !== index && UnityEngine.GameObject.op_Inequality(this.ghosts[this.selected], null)) {
                        this.ghosts[this.selected].SetActive(false);
                    }
                    if (this.selected !== index) {
                        this.rotateOffset = 0;
                    }
                    this.selected = index;
                    if (this.stage === CEBB.Playable.LivingStage.SelectItem) {
                        if (this.builtCount === 0) {
                            this.stage = CEBB.Playable.LivingStage.PressBuild;
                        } else {
                            this.stage = CEBB.Playable.LivingStage.LookAround;
                            this.lookProgress = 0;
                        }
                    }
                }
                this.UpdateUi();
                this.Count();
            },
            /*CEBB.Playable.LivingRoomPlayable.SelectEntry end.*/

            /*CEBB.Playable.LivingRoomPlayable.PressBuild start.*/
            PressBuild: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#PressBuild", this ); }

                if (this.endOverlayArmed || this.paused || this.Frame()) {
                    return;
                }
                this.NotifyFirstInput();
                if (this.deleteMode) {
                    return;
                } // BUILD is locked while removing
                if (this.stage === CEBB.Playable.LivingStage.SelectItem) {
                    this.Flash(this.selectPrompt);
                } else {
                    if (this.selected >= 0) {
                        if (this.Remaining(this.selected) === 0) {
                            this.Flash(this.emptyPrompt);
                        } else {
                            if (this.hasPose && this.poseValid) {
                                this.Place(this.selected, this.posePosition, this.poseYaw);
                            } else {
                                this.Flash(this.hasPose ? this.invalidReason : this.aimPrompt);
                            }
                        }
                    }
                }
                this.Count();
            },
            /*CEBB.Playable.LivingRoomPlayable.PressBuild end.*/

            /*CEBB.Playable.LivingRoomPlayable.PressTrash start.*/
            PressTrash: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#PressTrash", this ); }

                if (this.endOverlayArmed || this.paused || this.Frame()) {
                    return;
                }
                this.NotifyFirstInput();
                this.SetDeleteMode(!this.deleteMode && this.placed.Count > 0);
                this.Count();
            },
            /*CEBB.Playable.LivingRoomPlayable.PressTrash end.*/

            /*CEBB.Playable.LivingRoomPlayable.PressRotate start.*/
            PressRotate: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#PressRotate", this ); }

                var $t;
                if (this.endOverlayArmed || this.paused || this.deleteMode || this.Frame()) {
                    return;
                }
                this.NotifyFirstInput();
                this.rotateOffset = ($t = this.rotateOffset - 90.0, $t - Math.floor($t / 360.0) * 360.0);
                this.Count(); // icon turns left
            },
            /*CEBB.Playable.LivingRoomPlayable.PressRotate end.*/

            /*CEBB.Playable.LivingRoomPlayable.SetDeleteMode start.*/
            SetDeleteMode: function (on) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#SetDeleteMode", this ); }

                if (this.deleteMode === on) {
                    return;
                }
                this.deleteMode = on;
                this.aimedPiece = null;
                this.deleteHint = null;
                if (on) {
                    if (this.selected >= 0 && UnityEngine.GameObject.op_Inequality(this.ghosts[this.selected], null)) {
                        this.ghosts[this.selected].SetActive(false);
                    }
                    if (UnityEngine.Component.op_Inequality(this.footprintMarker, null)) {
                        this.footprintMarker.gameObject.SetActive(false);
                    }
                    this.hasPose = false;
                } else if (UnityEngine.Component.op_Inequality(this.deleteMarker, null)) {
                    this.deleteMarker.gameObject.SetActive(false);
                }
                this.UpdateUi();
            },
            /*CEBB.Playable.LivingRoomPlayable.SetDeleteMode end.*/

            /*CEBB.Playable.LivingRoomPlayable.Frame start.*/
            Frame: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Frame", this ); }

                if (this.lastClickFrame === UnityEngine.Time.frameCount) {
                    return true;
                }
                this.lastClickFrame = UnityEngine.Time.frameCount;
                return false;
            },
            /*CEBB.Playable.LivingRoomPlayable.Frame end.*/

            /*CEBB.Playable.LivingRoomPlayable.Count start.*/
            Count: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Count", this ); }

                this.interactionCount = (this.interactionCount + 1) | 0;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.luna, null)) {
                    this.luna.NotifyClick(this.interactionCount);
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.Count end.*/

            /*CEBB.Playable.LivingRoomPlayable.Flash start.*/
            Flash: function (text) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Flash", this ); }

                if (System.String.isNullOrEmpty(text)) {
                    return;
                }
                this.flashText = text;
                this.flashUntil = UnityEngine.Time.unscaledTime + 1.2;
                this.UpdateUi();
            },
            /*CEBB.Playable.LivingRoomPlayable.Flash end.*/

            /*CEBB.Playable.LivingRoomPlayable.NotifyScreenTouch start.*/
            NotifyScreenTouch: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#NotifyScreenTouch", this ); }

                if (this.stage === CEBB.Playable.LivingStage.LookAround && !this.endOverlayArmed) {
                    this.stage = CEBB.Playable.LivingStage.PressBuild;
                    this.ignoreNextTap = true;
                } // this touch only closes the guide
            },
            /*CEBB.Playable.LivingRoomPlayable.NotifyScreenTouch end.*/

            /*CEBB.Playable.LivingRoomPlayable.ClearIgnoredTap start.*/
            ClearIgnoredTap: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#ClearIgnoredTap", this ); }

                this.ignoreNextTap = false;
            },
            /*CEBB.Playable.LivingRoomPlayable.ClearIgnoredTap end.*/

            /*CEBB.Playable.LivingRoomPlayable.NotifyLook start.*/
            NotifyLook: function (degrees) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#NotifyLook", this ); }

                if (this.stage !== CEBB.Playable.LivingStage.LookAround || this.endOverlayArmed) {
                    return;
                }
                this.lookProgress += Math.abs(degrees);
                if (this.lookProgress >= this.lookTutorialDegrees) {
                    this.stage = CEBB.Playable.LivingStage.PressBuild;
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.NotifyLook end.*/

            /*CEBB.Playable.LivingRoomPlayable.NotifyMove start.*/
            NotifyMove: function (distance) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#NotifyMove", this ); }

                if (this.stage !== CEBB.Playable.LivingStage.Move || !this.removedOnce || this.endOverlayArmed) {
                    return;
                } // trash tutorial comes first
                this.moveProgress += Math.abs(distance);
                if (this.moveProgress >= this.moveTutorialDistance) {
                    this.stage = CEBB.Playable.LivingStage.Free;
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.NotifyMove end.*/

            /*CEBB.Playable.LivingRoomPlayable.Remaining start.*/
            Remaining: function (entry) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Remaining", this ); }

                if (entry < 0 || entry >= this.catalog.length) {
                    return 0;
                }
                var n = 0;
                var list = this.pool[entry];
                for (var i = 0; i < list.Count; i = (i + 1) | 0) {
                    if (!list.getItem(i).go.activeSelf) {
                        n = (n + 1) | 0;
                    }
                }
                return n;
            },
            /*CEBB.Playable.LivingRoomPlayable.Remaining end.*/

            /*CEBB.Playable.LivingRoomPlayable.Place start.*/
            Place: function (entry, position, yaw) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Place", this ); }

                var piece = null;
                var list = this.pool[entry];
                for (var i = 0; i < list.Count; i = (i + 1) | 0) {
                    if (!list.getItem(i).go.activeSelf) {
                        piece = list.getItem(i);
                        break;
                    }
                }
                if (piece == null) {
                    return;
                }
                piece.go.transform.position = position.$clone();
                piece.go.transform.rotation = new pc.Quat().setFromEulerAngles_Unity( 0, yaw, 0 );
                piece.go.transform.localScale = new pc.Vec3( 1, 1, 1 );
                piece.go.SetActive(true);
                this.placed.add(piece);
                this.builtCount = (this.builtCount + 1) | 0;
                this.placementsTotal = (this.placementsTotal + 1) | 0;
                if (UnityEngine.Component.op_Inequality(this.placementAudio, null) && this.placementSfx != null) {
                    this.placementAudio.PlayOneShot$1(this.placementSfx, this.placementVolume);
                }
                this.onFurniturePlaced.Invoke();
                if (this.stage === CEBB.Playable.LivingStage.PressBuild || this.stage === CEBB.Playable.LivingStage.LookAround) {
                    if (this.builtCount >= 2) {
                        this.stage = CEBB.Playable.LivingStage.Move;
                        this.moveProgress = 0;
                    } else {
                        this.stage = CEBB.Playable.LivingStage.SelectItem;
                    }
                }
                this.StartCoroutine$1(this.Reveal(piece, position));
                this.UpdateUi();
                if (UnityEngine.MonoBehaviour.op_Inequality(this.luna, null)) {
                    this.luna.NotifyPlaced(this.placementsTotal);
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.Place end.*/

            /*CEBB.Playable.LivingRoomPlayable.Remove start.*/
            Remove: function (piece) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Remove", this ); }

                if (!this.placed.contains(piece)) {
                    return;
                }
                this.placed.remove(piece);
                piece.go.SetActive(false);
                this.builtCount = (this.builtCount - 1) | 0;
                this.removedOnce = true;
                this.SetDeleteMode(false);
                if (UnityEngine.Component.op_Inequality(this.placementAudio, null) && this.placementSfx != null) {
                    this.placementAudio.PlayOneShot$1(this.placementSfx, this.placementVolume * 0.6);
                }
                this.UpdateUi();
            },
            /*CEBB.Playable.LivingRoomPlayable.Remove end.*/

            /*CEBB.Playable.LivingRoomPlayable.Reveal start.*/
            Reveal: function (piece, position) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Reveal", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    time,
                    t,
                    k,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this.animating = (this.animating + 1) | 0;
                                        time = 0;
                                        t = piece.go.transform;
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( time < this.revealSeconds ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    time += UnityEngine.Time.unscaledDeltaTime;
                                        k = Math.max(0, Math.min(1, time / this.revealSeconds));
                                        t.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( UnityEngine.Mathf.Max(0.01, 1.0 + 2.70158 * Math.pow(k - 1.0, 3) + 1.70158 * Math.pow(k - 1.0, 2)) );
                                        t.position = position.$clone(); // pops in place, exactly where the ghost was
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    t.localScale = new pc.Vec3( 1, 1, 1 );
                                        t.position = position.$clone();
                                        this.animating = (this.animating - 1) | 0;

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
            /*CEBB.Playable.LivingRoomPlayable.Reveal end.*/

            /*CEBB.Playable.LivingRoomPlayable.PieceUnder start.*/
            PieceUnder: function (ray) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#PieceUnder", this ); }

                var hit = { v : new UnityEngine.RaycastHit() };
                if (!UnityEngine.Physics.Raycast$1(ray, hit, this.buildReach, UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Collide)) {
                    return null;
                }
                var p = { };
                return this.byCollider.tryGetValue(hit.v.collider, p) ? p.v : null;
            },
            /*CEBB.Playable.LivingRoomPlayable.PieceUnder end.*/

            /*CEBB.Playable.LivingRoomPlayable.Snap start.*/
            Snap: function (v) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Snap", this ); }

                return Math.round(v / this.snap) * this.snap;
            },
            /*CEBB.Playable.LivingRoomPlayable.Snap end.*/

            /*CEBB.Playable.LivingRoomPlayable.ComputePose start.*/
            ComputePose: function (ray, entry, pos, yaw, valid) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#ComputePose", this ); }

                pos.v = pc.Vec3.ZERO.clone();
                yaw.v = 0;
                valid.v = false;
                this.invalidReason = null;
                var item = this.catalog[entry].item;
                var hit = { v : new UnityEngine.RaycastHit() };
                if (!UnityEngine.Physics.Raycast$1(ray, hit, this.buildReach, UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Collide)) {
                    return false;
                }
                if (hit.v.normal.y < -0.5) {
                    return false;
                }
                var size = item.boundsSize.$clone();
                var under = { };
                this.byCollider.tryGetValue(hit.v.collider, under);
                var wallNormal = pc.Vec3.ZERO.clone();
                if (item.mount === CEBB.Playable.DecorMount.Wall) {
                    var n = hit.v.normal.$clone();
                    if (Math.abs(n.y) > 0.5) {
                        n = ray.direction.$clone().scale( -1 );
                        n.y = 0;
                        if (n.lengthSq() < 0.01) {
                            return false;
                        }
                        n.normalize();
                    }
                    n = Math.abs(n.x) > Math.abs(n.z) ? new pc.Vec3( (n.x === 0 ? 1 : Math.sign(n.x)), 0, 0 ) : new pc.Vec3( 0, 0, (n.z === 0 ? 1 : Math.sign(n.z)) );
                    yaw.v = Math.atan2(-n.x, -n.z) * UnityEngine.Mathf.Rad2Deg;
                    wallNormal = n.$clone();
                    var surface = hit.v.collider.GetComponent(CEBB.Playable.PlacementSurface);
                    if (under.v != null || UnityEngine.MonoBehaviour.op_Equality(surface, null) || !surface.allowWallItems) {
                        this.invalidReason = this.wallPrompt;
                    }
                    pos.v = hit.v.point.$clone().add( n.$clone().clone().scale( (size.z * 0.5 + 0.01) ) );
                    if (n.x !== 0) {
                        pos.v.z = this.Snap(pos.v.z);
                    } else {
                        pos.v.x = this.Snap(pos.v.x);
                    }
                    pos.v.y = Math.max(0.5, Math.min(this.Snap(hit.v.point.y - size.y * 0.5), this.roomHeight - size.y - 0.1));
                } else {
                    var top = hit.v.normal.y > 0.7;
                    pos.v = hit.v.point.$clone();
                    yaw.v = Math.round(this.player.Yaw / 90.0) * 90.0 + this.rotateOffset;
                    if (!top) {
                        var n1 = hit.v.normal.$clone();
                        n1.y = 0;
                        if (n1.lengthSq() < 0.01) {
                            n1 = ray.direction.$clone().scale( -1 );
                        }
                        n1.y = 0;
                        n1.normalize();
                        pos.v = pos.v.$clone().add( n1.$clone().clone().scale( (UnityEngine.Mathf.Max(size.x, size.z) * 0.5 + 0.05) ) );
                        pos.v.y = 0;
                    } else if (under.v == null || under.v.walkable || item.walkableSurface || !CEBB.Playable.LivingRoomPlayable.CanStackOn(item, this.catalog[under.v.entry].item)) {
                        pos.v.y = 0;
                    } else {
                        pos.v.y = under.v.box.bounds.max.y;
                    }
                    pos.v.x = this.Snap(pos.v.x);
                    pos.v.z = this.Snap(pos.v.z);
                    if (item.walkableSurface) {
                        pos.v.y = 0.006;
                    }
                }
                var swap = Math.abs(yaw.v - Math.floor(yaw.v / 180.0) * 180.0 - 90.0) < 1.0;
                var hx = (swap ? size.z : size.x) * 0.5, hz = (swap ? size.x : size.z) * 0.5;
                // wall items sit against the wall, so only clamp along the wall
                if (wallNormal.x === 0) {
                    pos.v.x = Math.max(this.roomMin.x + hx, Math.min(pos.v.x, this.roomMax.x - hx));
                }
                if (wallNormal.z === 0) {
                    pos.v.z = Math.max(this.roomMin.y + hz, Math.min(pos.v.z, this.roomMax.y - hz));
                }
                if (this.invalidReason == null && pos.v.y + size.y > this.roomHeight - 0.02) {
                    this.invalidReason = this.heightPrompt;
                }
                if (this.invalidReason == null) {
                    this.invalidReason = this.BlockReason(pos.v, hx, hz, size.y, item);
                }
                valid.v = this.invalidReason == null;
                return true;
            },
            /*CEBB.Playable.LivingRoomPlayable.ComputePose end.*/

            /*CEBB.Playable.LivingRoomPlayable.BlockReason start.*/
            BlockReason: function (pos, hx, hz, height, item) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#BlockReason", this ); }

                var pad = 0.03;
                var minX = pos.x - hx + pad, maxX = pos.x + hx - pad, minZ = pos.z - hz + pad, maxZ = pos.z + hz - pad, minY = pos.y, maxY = pos.y + UnityEngine.Mathf.Max(0.03, height);
                for (var i = 0; i < this.placed.Count; i = (i + 1) | 0) {
                    var p = this.placed.getItem(i);
                    if (p.walkable !== item.walkableSurface) {
                        continue;
                    }
                    var b = p.box.bounds;
                    if (maxX <= b.min.x || minX >= b.max.x || maxZ <= b.min.z || minZ >= b.max.z) {
                        continue;
                    }
                    if (minY >= b.max.y - 0.05 || maxY <= b.min.y + 0.02) {
                        continue;
                    }
                    return this.overlapPrompt;
                }
                if (!item.walkableSurface && item.mount === CEBB.Playable.DecorMount.Floor && UnityEngine.MonoBehaviour.op_Inequality(this.player, null)) {
                    var b1 = this.player.transform.position.$clone();
                    var r = this.player.bodyRadius;
                    if (b1.x > minX - r && b1.x < maxX + r && b1.z > minZ - r && b1.z < maxZ + r && minY < 1.7) {
                        return this.playerPrompt;
                    }
                }
                return null;
            },
            /*CEBB.Playable.LivingRoomPlayable.BlockReason end.*/

            /*CEBB.Playable.LivingRoomPlayable.IsClear start.*/
            IsClear: function (p, radius) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#IsClear", this ); }

                for (var i = 0; i < this.roomSolids.Count; i = (i + 1) | 0) {
                    if (CEBB.Playable.LivingRoomPlayable.Blocks(this.roomSolids.getItem(i).bounds, p, radius)) {
                        return false;
                    }
                }
                for (var i1 = 0; i1 < this.placed.Count; i1 = (i1 + 1) | 0) {
                    if (!this.placed.getItem(i1).walkable && CEBB.Playable.LivingRoomPlayable.Blocks(this.placed.getItem(i1).box.bounds, p, radius)) {
                        return false;
                    }
                }
                return true;
            },
            /*CEBB.Playable.LivingRoomPlayable.IsClear end.*/

            /*CEBB.Playable.LivingRoomPlayable.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Update", this ); }

                if (this.paused || this.endOverlayArmed) {
                    return;
                }
                if (this.flashText != null && UnityEngine.Time.unscaledTime > this.flashUntil) {
                    this.flashText = null;
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.Update end.*/

            /*CEBB.Playable.LivingRoomPlayable.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#LateUpdate", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.player, null) || this.endOverlayArmed) {
                    return;
                }
                var view = this.player.playerCamera;
                var ray = view.ViewportPointToRay(new pc.Vec3( 0.5, 0.5, 0 ));
                this.hasPose = false;
                this.aimedPiece = null;
                var showFootprint = false;
                if (this.deleteMode) {
                    if (this.placed.Count === 0) {
                        this.SetDeleteMode(false);
                    } else {
                        this.aimedPiece = this.PieceUnder(ray);
                        this.deleteHint = this.aimedPiece != null ? this.aimedPiece : this.NearestVisiblePiece(view);
                        if (UnityEngine.Component.op_Inequality(this.deleteMarker, null)) {
                            this.deleteMarker.gameObject.SetActive(this.deleteHint != null);
                            if (this.deleteHint != null) {
                                var b = this.deleteHint.box.bounds;
                                this.deleteMarker.position = b.center.$clone();
                                this.deleteMarker.rotation = pc.Quat.IDENTITY.clone();
                                this.deleteMarker.localScale = b.halfExtents.$clone().scale( 2 ).$clone().add( new pc.Vec3( 1, 1, 1 ).clone().scale( 0.06 ) );
                            }
                        }
                    }
                }
                if (!this.deleteMode) {
                    this.deleteHint = null;
                    if (UnityEngine.Component.op_Inequality(this.deleteMarker, null) && this.deleteMarker.gameObject.activeSelf) {
                        this.deleteMarker.gameObject.SetActive(false);
                    }
                    if (this.stage !== CEBB.Playable.LivingStage.SelectItem && this.selected >= 0 && this.Remaining(this.selected) > 0 && this.animating === 0) {
                        var pos = { v : new UnityEngine.Vector3() };
                        var yaw = { };
                        var valid = { };
                        this.hasPose = this.ComputePose(ray, this.selected, pos, yaw, valid);
                        if (this.hasPose) {
                            this.posePosition = pos.v.$clone();
                            this.poseYaw = yaw.v;
                            this.poseValid = valid.v;
                            var g = this.ghosts[this.selected];
                            g.transform.position = pos.v.$clone();
                            g.transform.rotation = new pc.Quat().setFromEulerAngles_Unity( 0, yaw.v, 0 );
                            this.SetGhostMaterial(this.selected, !valid.v, false);
                            var item = this.catalog[this.selected].item;
                            if (UnityEngine.Component.op_Inequality(this.footprintMarker, null) && item.mount === CEBB.Playable.DecorMount.Floor) {
                                showFootprint = true;
                                var s = item.boundsSize.$clone();
                                this.footprintMarker.position = new pc.Vec3( pos.v.x, pos.v.y + 0.012, pos.v.z );
                                this.footprintMarker.rotation = new pc.Quat().setFromEulerAngles_Unity( 0, yaw.v, 0 );
                                this.footprintMarker.localScale = new pc.Vec3( s.x + 0.06, 0.02, s.z + 0.06 );
                                if (UnityEngine.Component.op_Inequality(this.footprintRenderer, null)) {
                                    this.footprintRenderer.sharedMaterial = valid.v ? this.ghostMaterial : this.ghostInvalidMaterial;
                                }
                            }
                        }
                    }
                    if (this.selected >= 0 && UnityEngine.GameObject.op_Inequality(this.ghosts[this.selected], null) && this.ghosts[this.selected].activeSelf !== this.hasPose) {
                        this.ghosts[this.selected].SetActive(this.hasPose);
                    }
                }
                if (UnityEngine.Component.op_Inequality(this.footprintMarker, null) && this.footprintMarker.gameObject.activeSelf !== showFootprint) {
                    this.footprintMarker.gameObject.SetActive(showFootprint);
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.reticle, null)) {
                    this.reticle.color = this.deleteMode ? (this.aimedPiece != null ? new pc.Color( 1, 0.35, 0.3, 1 ) : new pc.Color( 1, 1, 1, 1 )) : (this.hasPose && this.poseValid ? new pc.Color( 0.35, 1, 0.9, 1 ) : new pc.Color( 1, 1, 1, 1 ));
                }
                this.RefreshHud();
                this.UpdateHand(view);
            },
            /*CEBB.Playable.LivingRoomPlayable.LateUpdate end.*/

            /*CEBB.Playable.LivingRoomPlayable.NearestVisiblePiece start.*/
            NearestVisiblePiece: function (view) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#NearestVisiblePiece", this ); }

                var best = null;
                var bestDistance = 3.40282347E+38;
                var origin = this.player.transform.position.$clone();
                for (var i = 0; i < this.placed.Count; i = (i + 1) | 0) {
                    var p = this.placed.getItem(i);
                    var c = p.box.bounds.center.$clone();
                    var v = view.WorldToViewportPoint(c);
                    if (v.z < 0.3 || v.x < 0.08 || v.x > 0.92 || v.y < 0.28 || v.y > 0.85) {
                        continue;
                    }
                    if (!Bridge.referenceEquals(this.PieceUnder(view.ViewportPointToRay(v)), p)) {
                        continue;
                    }
                    var d = (c.x - origin.x) * (c.x - origin.x) + (c.z - origin.z) * (c.z - origin.z);
                    if (d < bestDistance) {
                        bestDistance = d;
                        best = p;
                    }
                }
                return best;
            },
            /*CEBB.Playable.LivingRoomPlayable.NearestVisiblePiece end.*/

            /*CEBB.Playable.LivingRoomPlayable.UpdateHand start.*/
            UpdateHand: function (view) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#UpdateHand", this ); }

                if (UnityEngine.Component.op_Equality(this.hand, null) || UnityEngine.Component.op_Equality(this.guidanceRect, null)) {
                    return;
                }
                var ui = this.guidanceCanvas.renderMode === UnityEngine.RenderMode.ScreenSpaceOverlay ? null : this.guidanceCanvas.worldCamera;
                var screen = { v : pc.Vec2.ZERO.clone() };
                var show = false, press = true, loop = false;
                if (!this.endOverlayArmed && this.animating === 0) {
                    if (this.deleteMode) {
                        if (this.deleteHint != null) {
                            var p = view.WorldToScreenPoint(this.deleteHint.box.bounds.center);
                            if (p.z > 0) {
                                screen.v = new pc.Vec2( p.x, p.y );
                                show = true;
                            }
                        }
                    } else if (this.stage === CEBB.Playable.LivingStage.SelectItem && this.builtCount < 2) {
                        show = CEBB.Playable.LivingRoomPlayable.UiPoint(this.catalog[this.builtCount === 0 ? this.firstEntry : this.guideEntry].button, ui, screen);
                    } else {
                        if (this.stage === CEBB.Playable.LivingStage.LookAround) {
                            loop = true;
                            show = true;
                        } else if (this.stage === CEBB.Playable.LivingStage.PressBuild && this.builtCount === 0) {
                            if (this.hasPose && this.poseValid) {
                                show = CEBB.Playable.LivingRoomPlayable.UiPoint(this.buildButton, ui, screen);
                            } else {
                                screen.v = new pc.Vec2( view.pixelWidth * 0.5 + view.pixelWidth * 0.06 * Math.sin(UnityEngine.Time.unscaledTime * 3.0), view.pixelHeight * 0.5 );
                                show = true;
                                press = false;
                            }
                        } else if (this.stage === CEBB.Playable.LivingStage.Move && !this.removedOnce) {
                            show = CEBB.Playable.LivingRoomPlayable.UiPoint(this.trashButton, ui, screen, -0.2);
                        }
                    } // finger on the bin itself
                }
                if (UnityEngine.Component.op_Inequality(this.lookGuide, null) && this.lookGuide.gameObject.activeSelf !== loop) {
                    this.lookGuide.gameObject.SetActive(loop);
                }
                if (loop) {
                    // hand rides the infinity curve, like the reference "drag the screen" guide
                    var centre = { v : new UnityEngine.Vector2() };
                    if (!UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.guidanceRect, new pc.Vec2( view.pixelWidth * 0.5, view.pixelHeight * 0.6 ), ui, centre)) {
                        return;
                    }
                    if (UnityEngine.Component.op_Inequality(this.lookGuide, null)) {
                        this.lookGuide.anchoredPosition = centre.v.$clone();
                    }
                    var a = UnityEngine.Time.unscaledTime * 2.7;
                    var p1 = centre.v.$clone().add( new pc.Vec2( this.lookGuideRadius.x * Math.sin(a), this.lookGuideRadius.y * Math.sin(2.0 * a) ) );
                    if (!this.hand.gameObject.activeSelf) {
                        this.hand.gameObject.SetActive(true);
                    }
                    this.hand.anchoredPosition = p1.$clone().add( new pc.Vec2( 40, -48 ) );
                    this.hand.localScale = new pc.Vec3( 1, 1, 1 );
                    this.hand.localEulerAngles = new pc.Vec3( 0, 0, -8.0 );
                    return;
                }
                if (this.hand.gameObject.activeSelf !== show) {
                    this.hand.gameObject.SetActive(show);
                }
                if (!show) {
                    return;
                }
                var local = { v : new UnityEngine.Vector2() };
                if (UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.guidanceRect, screen.v, ui, local)) {
                    var cycle = (UnityEngine.Time.unscaledTime * 0.9) % 1.0;
                    var k = press && cycle < 0.25 ? Math.sin(cycle / 0.25 * UnityEngine.Mathf.PI) : 0.0;
                    this.hand.anchoredPosition = local.v.$clone().add( new pc.Vec2( pc.math.lerp(58, 26, k), pc.math.lerp(-54, -22, k) ) );
                    this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1.0, 0.82, k) );
                    this.hand.localEulerAngles = new pc.Vec3( 0, 0, pc.math.lerp(-14.0, 2.0, k) );
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.UpdateHand end.*/

            /*CEBB.Playable.LivingRoomPlayable.RefreshHud start.*/
            RefreshHud: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#RefreshHud", this ); }

                var playing = !this.endOverlayArmed;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.player, null) && UnityEngine.MonoBehaviour.op_Inequality(this.player.movePad, null)) {
                    this.player.movePad.demo = playing && this.stage === CEBB.Playable.LivingStage.Move && this.removedOnce && !this.deleteMode;
                } // joystick pulls itself up, no hand
                if (UnityEngine.MonoBehaviour.op_Inequality(this.trashButton, null)) {
                    var isVisible = playing && this.placed.Count > 0;
                    if (this.trashButton.gameObject.activeSelf !== isVisible) {
                        this.trashButton.gameObject.SetActive(isVisible);
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.trashImage, null)) {
                    this.trashImage.color = this.deleteMode ? pc.Color.lerp( CEBB.Playable.LivingRoomPlayable.trashActive, new pc.Color( 1, 1, 1, 1 ), 0.25 + 0.2 * Math.sin(5.0 * UnityEngine.Time.unscaledTime) ) : CEBB.Playable.LivingRoomPlayable.trashIdle.$clone();
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.buildButton, null)) {
                    this.buildButton.interactable = !this.endOverlayArmed && !this.deleteMode;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.buildFill, null)) {
                    this.buildFill.color = this.deleteMode ? CEBB.Playable.LivingRoomPlayable.buildLocked.$clone() : CEBB.Playable.LivingRoomPlayable.buildNormal.$clone();
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.rotateButton, null)) {
                    var isVisible1 = playing && !this.deleteMode && this.stage !== CEBB.Playable.LivingStage.SelectItem && this.selected >= 0 && this.Remaining(this.selected) > 0 && this.catalog[this.selected].item.mount === CEBB.Playable.DecorMount.Floor;
                    if (this.rotateButton.gameObject.activeSelf !== isVisible1) {
                        this.rotateButton.gameObject.SetActive(isVisible1);
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.promptText, null)) {
                    var text = this.CurrentPrompt();
                    if (!Bridge.referenceEquals(this.promptText.text, text)) {
                        this.promptText.text = text;
                    }
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.RefreshHud end.*/

            /*CEBB.Playable.LivingRoomPlayable.CurrentPrompt start.*/
            CurrentPrompt: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#CurrentPrompt", this ); }

                if (this.endOverlayArmed) {
                    return "TAP TO PLAY";
                }
                if (this.flashText != null) {
                    return this.flashText;
                }
                if (this.deleteMode) {
                    return this.deletePrompt;
                }
                if (this.stage === CEBB.Playable.LivingStage.SelectItem) {
                    return this.builtCount === 0 ? this.firstPrompt : this.selectPrompt;
                }
                if (this.stage === CEBB.Playable.LivingStage.LookAround) {
                    return this.lookPrompt;
                }
                if (this.stage === CEBB.Playable.LivingStage.PressBuild) {
                    return this.hasPose && this.poseValid ? this.buildPrompt : this.aimPrompt;
                }
                if (this.hasPose && !this.poseValid && this.invalidReason != null) {
                    return this.invalidReason;
                }
                if (this.stage === CEBB.Playable.LivingStage.Move) {
                    return this.removedOnce ? this.movePrompt : this.trashPrompt;
                }
                return this.freePrompt;
            },
            /*CEBB.Playable.LivingRoomPlayable.CurrentPrompt end.*/

            /*CEBB.Playable.LivingRoomPlayable.UpdateUi start.*/
            UpdateUi: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#UpdateUi", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.countText, null)) {
                    this.countText.text = "BUILT " + this.builtCount;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.buildLabel, null)) {
                    this.buildLabel.text = "BUILD";
                }
                var open = !this.endOverlayArmed;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.trashButton, null)) {
                    this.trashButton.interactable = open;
                }
                for (var i = 0; i < this.catalog.length; i = (i + 1) | 0) {
                    var e = this.catalog[i];
                    var n = this.Remaining(i);
                    var empty = n === 0;
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.quantityText, null)) {
                        e.quantityText.text = "x" + n;
                    }
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.button, null)) {
                        e.button.interactable = open;
                    }
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.frame, null)) {
                        e.frame.color = empty ? new pc.Color( 0.23, 0.25, 0.23, 1 ) : (i === this.selected && !this.deleteMode) ? new pc.Color( 1, 0.82, 0.25, 1 ) : new pc.Color( 0.48, 0.5, 0.46, 1 );
                    }
                    if (UnityEngine.MonoBehaviour.op_Inequality(e.icon, null)) {
                        e.icon.color = empty ? new pc.Color( 0.38, 0.38, 0.38, 1 ) : new pc.Color( 1, 1, 1, 1 );
                    }
                    if (UnityEngine.GameObject.op_Inequality(e.emptyBadge, null)) {
                        e.emptyBadge.SetActive(empty);
                    }
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.promptText, null)) {
                    this.promptText.text = this.CurrentPrompt();
                }
            },
            /*CEBB.Playable.LivingRoomPlayable.UpdateUi end.*/

            /*CEBB.Playable.LivingRoomPlayable.Freeze start.*/
            Freeze: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#Freeze", this ); }

                if (this.endOverlayArmed) {
                    return;
                }
                this.endOverlayArmed = true;
                this.stage = CEBB.Playable.LivingStage.Ended;
                this.deleteMode = false;
                for (var i = 0; i < this.ghosts.length; i = (i + 1) | 0) {
                    if (UnityEngine.GameObject.op_Inequality(this.ghosts[i], null)) {
                        this.ghosts[i].SetActive(false);
                    }
                }
                if (UnityEngine.Component.op_Inequality(this.deleteMarker, null)) {
                    this.deleteMarker.gameObject.SetActive(false);
                }
                if (UnityEngine.Component.op_Inequality(this.footprintMarker, null)) {
                    this.footprintMarker.gameObject.SetActive(false);
                }
                if (UnityEngine.Component.op_Inequality(this.hand, null)) {
                    this.hand.gameObject.SetActive(false);
                }
                if (UnityEngine.Component.op_Inequality(this.lookGuide, null)) {
                    this.lookGuide.gameObject.SetActive(false);
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.player, null) && UnityEngine.MonoBehaviour.op_Inequality(this.player.movePad, null)) {
                    this.player.movePad.demo = false;
                }
                this.onGameEnded.Invoke();
                this.UpdateUi();
                this.RefreshHud();
            },
            /*CEBB.Playable.LivingRoomPlayable.Freeze end.*/

            /*CEBB.Playable.LivingRoomPlayable.OpenStore start.*/
            OpenStore: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#OpenStore", this ); }

                if (this.lastCtaFrame === UnityEngine.Time.frameCount) {
                    return;
                }
                this.lastCtaFrame = UnityEngine.Time.frameCount;
                Luna.Unity.Playable.InstallFullGame();
                this.onCtaClicked.Invoke();
            },
            /*CEBB.Playable.LivingRoomPlayable.OpenStore end.*/

            /*CEBB.Playable.LivingRoomPlayable.OnApplicationPause start.*/
            OnApplicationPause: function (value) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayable#OnApplicationPause", this ); }

                this.paused = value;
            },
            /*CEBB.Playable.LivingRoomPlayable.OnApplicationPause end.*/


        }
    });
    /*CEBB.Playable.LivingRoomPlayable end.*/

    /*CEBB.Playable.LivingRoomPlayable+Piece start.*/
    Bridge.define("CEBB.Playable.LivingRoomPlayable.Piece", {
        $kind: 1002,
        fields: {
            entry: 0,
            go: null,
            box: null,
            walkable: false
        }
    });
    /*CEBB.Playable.LivingRoomPlayable+Piece end.*/

    /*CEBB.Playable.LivingRoomPlayer start.*/
    Bridge.define("CEBB.Playable.LivingRoomPlayer", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            game: null,
            playerCamera: null,
            movePad: null,
            spawnPosition: null,
            eyeHeight: 0,
            walkSpeed: 0,
            lookSensitivity: 0,
            yaw: 0,
            pitch: 0,
            bodyRadius: 0,
            focusing: false,
            focusYaw: 0,
            focusPitch: 0,
            focusUntil: 0
        },
        props: {
            Yaw: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#Yaw#get", this ); }

                    return this.yaw;
                }
            },
            EyePosition: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#EyePosition#get", this ); }

                    return this.transform.position.$clone().add( pc.Vec3.UP.clone().clone().scale( this.eyeHeight ) );
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#init", this ); }

                this.spawnPosition = new UnityEngine.Vector3();
                this.spawnPosition = new pc.Vec3( 0, 0, -3.3 );
                this.eyeHeight = 1.65;
                this.walkSpeed = 2.6;
                this.lookSensitivity = 150;
                this.yaw = 0;
                this.pitch = 16;
                this.bodyRadius = 0.25;
            }
        },
        methods: {
            /*CEBB.Playable.LivingRoomPlayer.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#Start", this ); }

                this.transform.position = this.spawnPosition.$clone();
                this.ApplyView();
            },
            /*CEBB.Playable.LivingRoomPlayer.Start end.*/

            /*CEBB.Playable.LivingRoomPlayer.LookAt start.*/
            LookAt: function (point, smooth) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#LookAt", this ); }

                var d = point.$clone().sub( this.EyePosition );
                var y = Math.atan2(d.x, d.z) * UnityEngine.Mathf.Rad2Deg;
                var p = Math.max(-60, Math.min(-Math.atan2(d.y, new pc.Vec2( d.x, d.z ).length()) * UnityEngine.Mathf.Rad2Deg, 70));
                if (smooth) {
                    this.focusYaw = y;
                    this.focusPitch = p;
                    this.focusUntil = UnityEngine.Time.unscaledTime + 0.6;
                    this.focusing = true;
                } else {
                    this.yaw = y;
                    this.pitch = p;
                    this.focusing = false;
                    this.ApplyView();
                }
            },
            /*CEBB.Playable.LivingRoomPlayer.LookAt end.*/

            /*CEBB.Playable.LivingRoomPlayer.ApplyLook start.*/
            ApplyLook: function (delta) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#ApplyLook", this ); }

                if (!this.game.AllowLook) {
                    return;
                }
                this.focusing = false;
                var dy = delta.x / UnityEngine.Mathf.Max(1, UnityEngine.Screen.width) * this.lookSensitivity, oldPitch = this.pitch;
                this.yaw += dy;
                this.pitch = Math.max(-60, Math.min(this.pitch - delta.y / UnityEngine.Mathf.Max(1, UnityEngine.Screen.height) * this.lookSensitivity, 70));
                this.ApplyView();
                this.game.NotifyLook(Math.abs(dy) + Math.abs(this.pitch - oldPitch));
            },
            /*CEBB.Playable.LivingRoomPlayer.ApplyLook end.*/

            /*CEBB.Playable.LivingRoomPlayer.ApplyView start.*/
            ApplyView: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#ApplyView", this ); }

                this.transform.rotation = new pc.Quat().setFromEulerAngles_Unity( 0, this.yaw, 0 );
                this.playerCamera.transform.localPosition = new pc.Vec3( 0, this.eyeHeight, 0 );
                this.playerCamera.transform.localRotation = new pc.Quat().setFromEulerAngles_Unity( this.pitch, 0, 0 );
            },
            /*CEBB.Playable.LivingRoomPlayer.ApplyView end.*/

            /*CEBB.Playable.LivingRoomPlayer.Move start.*/
            Move: function (input, deltaTime) {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#Move", this ); }

                var motion = new pc.Quat().setFromEulerAngles_Unity( 0, this.yaw, 0 ).transformVector( new pc.Vec3( input.x, 0, input.y ) ).clone().scale( this.walkSpeed ).clone().scale( UnityEngine.Mathf.Min(0.05, deltaTime) );
                var p = this.transform.position.$clone();
                var stuck = !this.game.IsClear(p, this.bodyRadius);
                var x = p.$clone().add( new pc.Vec3( motion.x, 0, 0 ) );
                x.x = Math.max(this.game.roomMin.x + this.bodyRadius, Math.min(x.x, this.game.roomMax.x - this.bodyRadius));
                if (stuck || this.game.IsClear(x, this.bodyRadius)) {
                    p = x.$clone();
                }
                var z = p.$clone().add( new pc.Vec3( 0, 0, motion.z ) );
                z.z = Math.max(this.game.roomMin.y + this.bodyRadius, Math.min(z.z, this.game.roomMax.y - this.bodyRadius));
                if (stuck || this.game.IsClear(z, this.bodyRadius)) {
                    p = z.$clone();
                }
                var moved = pc.Vec3.distance( this.transform.position, p );
                this.transform.position = p.$clone();
                if (moved > 0) {
                    this.game.NotifyMove(moved);
                }
            },
            /*CEBB.Playable.LivingRoomPlayer.Move end.*/

            /*CEBB.Playable.LivingRoomPlayer.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LivingRoomPlayer#Update", this ); }

                if (this.focusing) {
                    var k = 1 - UnityEngine.Mathf.Exp(-UnityEngine.Time.unscaledDeltaTime * 10);
                    this.yaw = UnityEngine.Mathf.LerpAngle(this.yaw, this.focusYaw, k);
                    this.pitch = pc.math.lerp(this.pitch, this.focusPitch, k);
                    this.ApplyView();
                    if (UnityEngine.Time.unscaledTime >= this.focusUntil) {
                        this.focusing = false;
                    }
                }
                if (!this.game.CanMove) {
                    return;
                }
                var input = UnityEngine.MonoBehaviour.op_Equality(this.movePad, null) ? pc.Vec2.ZERO.clone() : this.movePad.Value.$clone();
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.W) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.UpArrow)) {
                    input.y += 1;
                }
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.S) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.DownArrow)) {
                    input.y -= 1;
                }
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.D) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.RightArrow)) {
                    input.x += 1;
                }
                if (UnityEngine.Input.GetKey(UnityEngine.KeyCode.A) || UnityEngine.Input.GetKey(UnityEngine.KeyCode.LeftArrow)) {
                    input.x -= 1;
                }
                input = pc.Vec2.lengthClamp( input, 1 );
                if (input.lengthSq() > 0.01) {
                    this.Move(input, UnityEngine.Time.deltaTime);
                }
            },
            /*CEBB.Playable.LivingRoomPlayer.Update end.*/


        }
    });
    /*CEBB.Playable.LivingRoomPlayer end.*/

    /*CEBB.Playable.LivingStage start.*/
    Bridge.define("CEBB.Playable.LivingStage", {
        $kind: 6,
        statics: {
            fields: {
                SelectItem: 0,
                LookAround: 1,
                PressBuild: 2,
                Move: 3,
                Free: 4,
                Ended: 5
            }
        }
    });
    /*CEBB.Playable.LivingStage end.*/

    /*CEBB.Playable.LunaController start.*/
    Bridge.define("CEBB.Playable.LunaController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            timeLimit: 0,
            itemsToEnd: 0,
            clicksToEnd: 0,
            gameLogo: null,
            logoImage: null,
            game: null,
            ctaOverlay: null,
            timerText: null,
            started: false,
            ended: false,
            gameEndedSent: false,
            elapsed: 0,
            lastSecond: 0,
            endedFrame: 0,
            lastCtaFrame: 0
        },
        props: {
            Ended: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#Ended#get", this ); }

                    return this.ended;
                }
            },
            TimeLeft: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#TimeLeft#get", this ); }

                    return UnityEngine.Mathf.Max(0, this.timeLimit - this.elapsed);
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#init", this ); }

                this.timeLimit = 30.0;
                this.itemsToEnd = 5;
                this.clicksToEnd = 0;
                this.lastSecond = -1;
                this.endedFrame = -1;
                this.lastCtaFrame = -1;
            }
        },
        methods: {
            /*CEBB.Playable.LunaController.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#Awake", this ); }

                // Playground logo: swap the sprite only when a different texture was supplied.
                if (UnityEngine.MonoBehaviour.op_Inequality(this.logoImage, null) && this.gameLogo != null && (this.logoImage.sprite == null || !Bridge.referenceEquals(this.logoImage.sprite.texture, this.gameLogo))) {
                    this.logoImage.sprite = UnityEngine.Sprite.Create$1(this.gameLogo, new UnityEngine.Rect.$ctor1(0, 0, this.gameLogo.width, this.gameLogo.height), new pc.Vec2( 0.5, 0.5 ), 100.0);
                    this.logoImage.preserveAspect = true;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.ctaOverlay, null)) {
                    this.ctaOverlay.onClick.AddListener(Bridge.fn.cacheBind(this, this.OnCtaClicked));
                    this.ctaOverlay.gameObject.SetActive(false);
                }
                this.ShowTime();
            },
            /*CEBB.Playable.LunaController.Awake end.*/

            /*CEBB.Playable.LunaController.NotifyStarted start.*/
            NotifyStarted: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#NotifyStarted", this ); }

                if (this.started) {
                    return;
                }
                this.started = true;
                Luna.Unity.LifeCycle.GameStarted();
            },
            /*CEBB.Playable.LunaController.NotifyStarted end.*/

            /*CEBB.Playable.LunaController.NotifyPlaced start.*/
            NotifyPlaced: function (totalPlaced) {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#NotifyPlaced", this ); }

                if (this.itemsToEnd > 0 && totalPlaced >= this.itemsToEnd) {
                    this.EndGame();
                }
            },
            /*CEBB.Playable.LunaController.NotifyPlaced end.*/

            /*CEBB.Playable.LunaController.NotifyClick start.*/
            NotifyClick: function (totalClicks) {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#NotifyClick", this ); }

                if (this.clicksToEnd > 0 && totalClicks >= this.clicksToEnd) {
                    this.EndGame();
                }
            },
            /*CEBB.Playable.LunaController.NotifyClick end.*/

            /*CEBB.Playable.LunaController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#Update", this ); }

                if (!this.started || this.ended) {
                    return;
                }
                this.elapsed += UnityEngine.Time.unscaledDeltaTime;
                this.ShowTime();
                if (this.elapsed >= this.timeLimit) {
                    this.EndGame();
                }
            },
            /*CEBB.Playable.LunaController.Update end.*/

            /*CEBB.Playable.LunaController.ShowTime start.*/
            ShowTime: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#ShowTime", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.timerText, null)) {
                    return;
                }
                var s = Math.ceil(this.TimeLeft);
                if (s !== this.lastSecond) {
                    this.lastSecond = s;
                    this.timerText.text = s + "s";
                }
            },
            /*CEBB.Playable.LunaController.ShowTime end.*/

            /*CEBB.Playable.LunaController.EndGame start.*/
            EndGame: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#EndGame", this ); }

                if (this.ended) {
                    return;
                }
                this.ended = true;
                this.endedFrame = UnityEngine.Time.frameCount;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.game, null)) {
                    this.game.Freeze();
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.ctaOverlay, null)) {
                    this.ctaOverlay.gameObject.SetActive(true);
                    this.ctaOverlay.transform.SetAsLastSibling();
                }
            },
            /*CEBB.Playable.LunaController.EndGame end.*/

            /*CEBB.Playable.LunaController.OnCtaClicked start.*/
            OnCtaClicked: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaController#OnCtaClicked", this ); }

                if (!this.ended || UnityEngine.Time.frameCount <= this.endedFrame || this.lastCtaFrame === UnityEngine.Time.frameCount) {
                    return;
                }
                this.lastCtaFrame = UnityEngine.Time.frameCount;
                if (!this.gameEndedSent) {
                    this.gameEndedSent = true;
                    Luna.Unity.LifeCycle.GameEnded();
                }
                Luna.Unity.Playable.InstallFullGame();
            },
            /*CEBB.Playable.LunaController.OnCtaClicked end.*/


        }
    });
    /*CEBB.Playable.LunaController end.*/

    /*CEBB.Playable.LunaTextOutline start.*/
    Bridge.define("CEBB.Playable.LunaTextOutline", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            source: null,
            borders: null,
            effectColor: null,
            effectDistance: null,
            useGraphicAlpha: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaTextOutline#init", this ); }

                this.effectColor = new UnityEngine.Color();
                this.effectDistance = new UnityEngine.Vector2();
                this.effectColor = new pc.Color( 0, 0, 0, 0.9 );
                this.effectDistance = new pc.Vec2( 2, -2 );
                this.useGraphicAlpha = true;
            }
        },
        methods: {
            /*CEBB.Playable.LunaTextOutline.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaTextOutline#OnEnable", this ); }

                this.Sync();
            },
            /*CEBB.Playable.LunaTextOutline.OnEnable end.*/

            /*CEBB.Playable.LunaTextOutline.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaTextOutline#LateUpdate", this ); }

                this.Sync();
            },
            /*CEBB.Playable.LunaTextOutline.LateUpdate end.*/

            /*CEBB.Playable.LunaTextOutline.Refresh start.*/
            Refresh: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaTextOutline#Refresh", this ); }

                this.Sync();
            },
            /*CEBB.Playable.LunaTextOutline.Refresh end.*/

            /*CEBB.Playable.LunaTextOutline.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaTextOutline#OnDisable", this ); }

                if (this.borders == null) {
                    return;
                }
                for (var i = 0; i < this.borders.length; i = (i + 1) | 0) {
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.borders[i], null)) {
                        this.borders[i].gameObject.SetActive(false);
                    }
                }
            },
            /*CEBB.Playable.LunaTextOutline.OnDisable end.*/

            /*CEBB.Playable.LunaTextOutline.Sync start.*/
            Sync: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.LunaTextOutline#Sync", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.source, null) || this.borders == null) {
                    return;
                }
                var rect = this.source.rectTransform;
                var color = this.effectColor.$clone();
                if (this.useGraphicAlpha) {
                    color.a *= this.source.color.a;
                }
                var visible = this.source.enabled && this.source.gameObject.activeInHierarchy;
                for (var i = 0; i < this.borders.length; i = (i + 1) | 0) {
                    var border = this.borders[i];
                    if (UnityEngine.MonoBehaviour.op_Equality(border, null)) {
                        continue;
                    }
                    border.gameObject.SetActive(visible);
                    if (!visible) {
                        continue;
                    }
                    border.text = this.source.text;
                    border.font = this.source.font;
                    border.fontStyle = this.source.fontStyle;
                    border.fontSize = this.source.fontSize;
                    border.alignment = this.source.alignment;
                    border.supportRichText = this.source.supportRichText;
                    border.resizeTextForBestFit = this.source.resizeTextForBestFit;
                    border.resizeTextMinSize = this.source.resizeTextMinSize;
                    border.resizeTextMaxSize = this.source.resizeTextMaxSize;
                    border.horizontalOverflow = this.source.horizontalOverflow;
                    border.verticalOverflow = this.source.verticalOverflow;
                    border.color = color.$clone();
                    border.raycastTarget = false;
                    var target = border.rectTransform;
                    target.anchorMin = rect.anchorMin.$clone();
                    target.anchorMax = rect.anchorMax.$clone();
                    target.pivot = rect.pivot.$clone();
                    target.sizeDelta = rect.sizeDelta.$clone();
                    target.localRotation = rect.localRotation.$clone();
                    target.localScale = rect.localScale.$clone();
                    var offset = new pc.Vec3( (i < 2 ? 1 : -1) * this.effectDistance.x, (i % 2 === 0 ? 1 : -1) * this.effectDistance.y, 0 );
                    target.anchoredPosition3D = rect.anchoredPosition3D.$clone().add( offset );
                }
            },
            /*CEBB.Playable.LunaTextOutline.Sync end.*/


        }
    });
    /*CEBB.Playable.LunaTextOutline end.*/

    /*CEBB.Playable.PlacementSurface start.*/
    Bridge.define("CEBB.Playable.PlacementSurface", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            allowWallItems: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.PlacementSurface#init", this ); }

                this.allowWallItems = true;
            }
        }
    });
    /*CEBB.Playable.PlacementSurface end.*/

    /*CEBB.Playable.RoomLookSurface start.*/
    Bridge.define("CEBB.Playable.RoomLookSurface", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            player: null,
            pointer: 0,
            start: null,
            downTime: 0,
            dragged: false
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomLookSurface#init", this ); }

                this.start = new UnityEngine.Vector2();
                this.pointer = -999;
            }
        },
        methods: {
            /*CEBB.Playable.RoomLookSurface.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomLookSurface#OnPointerDown", this ); }

                if (this.pointer !== -999 || this.player.game.EndOverlayArmed) {
                    return;
                }
                this.pointer = e.pointerId;
                this.start = e.position.$clone();
                this.downTime = UnityEngine.Time.unscaledTime;
                this.dragged = false;
                this.player.game.BeginTutorial();
            },
            /*CEBB.Playable.RoomLookSurface.OnPointerDown end.*/

            /*CEBB.Playable.RoomLookSurface.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomLookSurface#OnDrag", this ); }

                if (e.pointerId !== this.pointer) {
                    return;
                }
                // finger wobble during a tap must not turn the view (it would change which ghost is aimed at)
                if (!this.dragged) {
                    var limit = UnityEngine.Mathf.Max(12.0, UnityEngine.Screen.height * 0.015);
                    if ((e.position.$clone().sub( this.start )).lengthSq() < limit * limit) {
                        return;
                    }
                    this.dragged = true;
                    this.player.ApplyLook(e.position.$clone().sub( this.start ));
                    return;
                }
                this.player.ApplyLook(e.delta);
            },
            /*CEBB.Playable.RoomLookSurface.OnDrag end.*/

            /*CEBB.Playable.RoomLookSurface.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomLookSurface#OnPointerUp", this ); }

                if (e.pointerId !== this.pointer) {
                    return;
                }
                this.pointer = -999;
                if (!this.dragged && UnityEngine.Time.unscaledTime - this.downTime < 0.5) {
                    this.player.game.TryBuildFromScreen(e.position, this.player.playerCamera);
                }
            },
            /*CEBB.Playable.RoomLookSurface.OnPointerUp end.*/

            /*CEBB.Playable.RoomLookSurface.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomLookSurface#OnDisable", this ); }

                this.pointer = -999;
            },
            /*CEBB.Playable.RoomLookSurface.OnDisable end.*/


        }
    });
    /*CEBB.Playable.RoomLookSurface end.*/

    /*CEBB.Playable.RoomMovePad start.*/
    Bridge.define("CEBB.Playable.RoomMovePad", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.EventSystems.IPointerDownHandler,UnityEngine.EventSystems.IInitializePotentialDragHandler,UnityEngine.EventSystems.IDragHandler,UnityEngine.EventSystems.IPointerUpHandler],
        fields: {
            thumbRect: null,
            demo: false,
            demoPull: 0,
            demoCycleSeconds: 0,
            padRect: null,
            pointer: 0,
            Value: null
        },
        props: {
            Pressed: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#Pressed#get", this ); }

                    return this.pointer !== -999;
                }
            },
            Radius: {
                get: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#Radius#get", this ); }

                    return UnityEngine.Mathf.Max(10.0, UnityEngine.Mathf.Min(this.padRect.rect.width, this.padRect.rect.height) * 0.38);
                }
            }
        },
        alias: [
            "OnPointerDown", "UnityEngine$EventSystems$IPointerDownHandler$OnPointerDown",
            "OnInitializePotentialDrag", "UnityEngine$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag",
            "OnDrag", "UnityEngine$EventSystems$IDragHandler$OnDrag",
            "OnPointerUp", "UnityEngine$EventSystems$IPointerUpHandler$OnPointerUp"
        ],
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#init", this ); }

                this.Value = new UnityEngine.Vector2();
                this.demoPull = 0.8;
                this.demoCycleSeconds = 1.3;
                this.pointer = -999;
            }
        },
        methods: {
            /*CEBB.Playable.RoomMovePad.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#Awake", this ); }

                var $t, $t1;
                this.padRect = this.GetComponent(UnityEngine.RectTransform);
                if (UnityEngine.Component.op_Equality(this.thumbRect, null)) {
                    var t = this.transform.Find("Thumb");
                    if (UnityEngine.Component.op_Inequality(t, null)) {
                        this.thumbRect = Bridge.as(t, UnityEngine.RectTransform);
                    }
                }
                if (UnityEngine.Component.op_Inequality(this.thumbRect, null)) {
                    this.thumbRect.anchorMin = ($t = ($t1 = new pc.Vec2( 0.5, 0.5 ), this.thumbRect.pivot = $t1.$clone(), $t1), this.thumbRect.anchorMax = $t.$clone(), $t);
                    var g = this.thumbRect.GetComponent(UnityEngine.UI.Graphic);
                    if (UnityEngine.MonoBehaviour.op_Inequality(g, null)) {
                        g.raycastTarget = false;
                    }
                }
                this.SetThumb(pc.Vec2.ZERO.clone());
            },
            /*CEBB.Playable.RoomMovePad.Awake end.*/

            /*CEBB.Playable.RoomMovePad.OnPointerDown start.*/
            OnPointerDown: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#OnPointerDown", this ); }

                if (this.pointer !== -999) {
                    return;
                }
                this.pointer = e.pointerId;
                this.Track(e);
            },
            /*CEBB.Playable.RoomMovePad.OnPointerDown end.*/

            /*CEBB.Playable.RoomMovePad.OnInitializePotentialDrag start.*/
            OnInitializePotentialDrag: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#OnInitializePotentialDrag", this ); }

                e.useDragThreshold = false;
            },
            /*CEBB.Playable.RoomMovePad.OnInitializePotentialDrag end.*/

            /*CEBB.Playable.RoomMovePad.OnDrag start.*/
            OnDrag: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#OnDrag", this ); }

                if (e.pointerId === this.pointer) {
                    this.Track(e);
                }
            },
            /*CEBB.Playable.RoomMovePad.OnDrag end.*/

            /*CEBB.Playable.RoomMovePad.OnPointerUp start.*/
            OnPointerUp: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#OnPointerUp", this ); }

                if (e.pointerId === this.pointer) {
                    this.pointer = -999;
                    this.Value = pc.Vec2.ZERO.clone();
                    this.SetThumb(pc.Vec2.ZERO.clone());
                }
            },
            /*CEBB.Playable.RoomMovePad.OnPointerUp end.*/

            /*CEBB.Playable.RoomMovePad.Track start.*/
            Track: function (e) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#Track", this ); }

                var local = { v : new UnityEngine.Vector2() };
                if (!UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.padRect, e.position, e.pressEventCamera, local)) {
                    return;
                }
                local.v = local.v.$clone().sub( this.padRect.rect.center.$clone() );
                var r = this.Radius;
                this.Value = pc.Vec2.lengthClamp( local.v.$clone().scale( 1.0 / ( r ) ), 1 );
                this.SetThumb(this.Value.$clone().scale( r ));
            },
            /*CEBB.Playable.RoomMovePad.Track end.*/

            /*CEBB.Playable.RoomMovePad.SetThumb start.*/
            SetThumb: function (offset) {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#SetThumb", this ); }

                if (UnityEngine.Component.op_Inequality(this.thumbRect, null)) {
                    this.thumbRect.anchoredPosition = offset.$clone();
                }
            },
            /*CEBB.Playable.RoomMovePad.SetThumb end.*/

            /*CEBB.Playable.RoomMovePad.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#Update", this ); }

                if (UnityEngine.Component.op_Inequality(this.thumbRect, null)) {
                    var s = UnityEngine.Mathf.Min(this.padRect.rect.width, this.padRect.rect.height) * 0.4;
                    if (Math.abs(this.thumbRect.sizeDelta.x - s) > 0.5) {
                        this.thumbRect.sizeDelta = new pc.Vec2( s, s );
                    }
                }
                if (this.Pressed) {
                    return;
                }
                if (!this.demo) {
                    this.SetThumb(pc.Vec2.ZERO.clone());
                    return;
                }
                // 0-45%: ease up, 45-65%: hold, 65-75%: snap back (released), rest: idle.
                var t = (UnityEngine.Time.unscaledTime % this.demoCycleSeconds) / this.demoCycleSeconds, k;
                if (t < 0.45) {
                    var u = t / 0.45;
                    k = 1.0 - (1.0 - u) * (1.0 - u);
                } else if (t < 0.65) {
                    k = 1.0;
                } else {
                    if (t < 0.75) {
                        var u1 = (t - 0.65) / 0.1;
                        k = 1.0 - u1 * u1 * (3.0 - 2.0 * u1);
                    } else {
                        k = 0.0;
                    }
                }
                this.SetThumb(new pc.Vec2( 0, this.Radius * this.demoPull * k ));
            },
            /*CEBB.Playable.RoomMovePad.Update end.*/

            /*CEBB.Playable.RoomMovePad.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.RoomMovePad#OnDisable", this ); }

                this.pointer = -999;
                this.Value = pc.Vec2.ZERO.clone();
                this.SetThumb(pc.Vec2.ZERO.clone());
            },
            /*CEBB.Playable.RoomMovePad.OnDisable end.*/


        }
    });
    /*CEBB.Playable.RoomMovePad end.*/

    /*CEBB.Playable.RoomTutorialStage start.*/
    Bridge.define("CEBB.Playable.RoomTutorialStage", {
        $kind: 6,
        statics: {
            fields: {
                PlaceBed: 0,
                LookAround: 1,
                Explore: 2,
                Finished: 3,
                Move: 4
            }
        }
    });
    /*CEBB.Playable.RoomTutorialStage end.*/

    /*CEBB.Playable.SakuraEndCardMotion start.*/
    Bridge.define("CEBB.Playable.SakuraEndCardMotion", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            playButton: null,
            shine: null,
            shineImage: null,
            gameplayUI: null,
            pulseSeconds: 0,
            pulseScale: 0,
            shineInterval: 0,
            shineSeconds: 0,
            elapsed: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.SakuraEndCardMotion#init", this ); }

                this.pulseSeconds = 1.25;
                this.pulseScale = 1.045;
                this.shineInterval = 2.4;
                this.shineSeconds = 0.8;
            }
        },
        methods: {
            /*CEBB.Playable.SakuraEndCardMotion.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.SakuraEndCardMotion#OnEnable", this ); }

                this.elapsed = 0;
                this.Animate();
            },
            /*CEBB.Playable.SakuraEndCardMotion.OnEnable end.*/

            /*CEBB.Playable.SakuraEndCardMotion.HideGameplayUI start.*/
            HideGameplayUI: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.SakuraEndCardMotion#HideGameplayUI", this ); }

                var $t;
                if (this.gameplayUI != null) {
                    $t = Bridge.getEnumerator(this.gameplayUI);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            if (UnityEngine.GameObject.op_Inequality(item, null)) {
                                item.SetActive(false);
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            /*CEBB.Playable.SakuraEndCardMotion.HideGameplayUI end.*/

            /*CEBB.Playable.SakuraEndCardMotion.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.SakuraEndCardMotion#Update", this ); }

                this.elapsed += UnityEngine.Time.unscaledDeltaTime;
                this.Animate();
            },
            /*CEBB.Playable.SakuraEndCardMotion.Update end.*/

            /*CEBB.Playable.SakuraEndCardMotion.Animate start.*/
            Animate: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.SakuraEndCardMotion#Animate", this ); }

                if (UnityEngine.Component.op_Equality(this.playButton, null)) {
                    return;
                }
                var pulse = 0.5 - 0.5 * Math.cos(this.elapsed * UnityEngine.Mathf.PI * 2 / UnityEngine.Mathf.Max(0.1, this.pulseSeconds));
                this.playButton.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1, this.pulseScale, pulse) );
                if (UnityEngine.Component.op_Equality(this.shine, null) || UnityEngine.MonoBehaviour.op_Equality(this.shineImage, null)) {
                    return;
                }
                var phase = this.elapsed % UnityEngine.Mathf.Max(0.1, this.shineInterval);
                var t = Math.max(0, Math.min(1, phase / UnityEngine.Mathf.Max(0.1, this.shineSeconds)));
                var width = this.playButton.rect.width;
                this.shine.anchoredPosition = new pc.Vec2( pc.math.lerp(-width * 0.8, width * 0.8, t), 0 );
                var color = new pc.Color( 1, 1, 1, 1 );
                color.a = phase < this.shineSeconds ? 0.8 * Math.sin(t * UnityEngine.Mathf.PI) : 0;
                this.shineImage.color = color.$clone();
            },
            /*CEBB.Playable.SakuraEndCardMotion.Animate end.*/

            /*CEBB.Playable.SakuraEndCardMotion.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "CEBB.Playable.SakuraEndCardMotion#OnDisable", this ); }

                if (UnityEngine.Component.op_Inequality(this.playButton, null)) {
                    this.playButton.localScale = new pc.Vec3( 1, 1, 1 );
                }
            },
            /*CEBB.Playable.SakuraEndCardMotion.OnDisable end.*/


        }
    });
    /*CEBB.Playable.SakuraEndCardMotion end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    if ( MODULE_reflection ) {
    var $m = Bridge.setMetadata,
        $n = ["CEBB.Playable","UnityEngine","System","UnityEngine.EventSystems","UnityEngine.UI","TMPro","System.Collections","System.Collections.Generic","UnityEngine.Events"];

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*CEBB.Playable.DecorMount start.*/
    $m("CEBB.Playable.DecorMount", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Floor","is":true,"t":4,"rt":$n[0].DecorMount,"sn":"Floor","box":function ($v) { return Bridge.box($v, CEBB.Playable.DecorMount, System.Enum.toStringFn(CEBB.Playable.DecorMount));}},{"a":2,"n":"Wall","is":true,"t":4,"rt":$n[0].DecorMount,"sn":"Wall","box":function ($v) { return Bridge.box($v, CEBB.Playable.DecorMount, System.Enum.toStringFn(CEBB.Playable.DecorMount));}}]}; }, $n);
    /*CEBB.Playable.DecorMount end.*/

    /*CEBB.Playable.DecorItem start.*/
    $m("CEBB.Playable.DecorItem", function () { return {"att":1048833,"a":2,"at":[Bridge.apply(new UnityEngine.CreateAssetMenuAttribute(), {
        menuName: "CEBB/Decor Item"
    } )],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"at":[new UnityEngine.TooltipAttribute("Model bounds in prefab space (pivot = bottom centre).")],"a":2,"n":"boundsSize","t":4,"rt":$n[1].Vector3,"sn":"boundsSize"},{"a":2,"n":"displayName","t":4,"rt":$n[2].String,"sn":"displayName"},{"a":2,"n":"icon","t":4,"rt":$n[1].Sprite,"sn":"icon"},{"a":2,"n":"itemId","t":4,"rt":$n[2].String,"sn":"itemId"},{"a":2,"n":"mount","t":4,"rt":$n[0].DecorMount,"sn":"mount","box":function ($v) { return Bridge.box($v, CEBB.Playable.DecorMount, System.Enum.toStringFn(CEBB.Playable.DecorMount));}},{"a":2,"n":"prefab","t":4,"rt":$n[1].GameObject,"sn":"prefab"},{"a":2,"n":"quantity","t":4,"rt":$n[2].Int32,"sn":"quantity","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("Other items can stand on top (table, TV stand).")],"a":2,"n":"topSurface","t":4,"rt":$n[2].Boolean,"sn":"topSurface","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.TooltipAttribute("Rugs: the player walks over them and furniture can stand on them.")],"a":2,"n":"walkableSurface","t":4,"rt":$n[2].Boolean,"sn":"walkableSurface","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CEBB.Playable.DecorItem end.*/

    /*CEBB.Playable.LivingRoomLookSurface start.*/
    $m("CEBB.Playable.LivingRoomLookSurface", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[2].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":1,"n":"downTime","t":4,"rt":$n[2].Single,"sn":"downTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"dragged","t":4,"rt":$n[2].Boolean,"sn":"dragged","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"player","t":4,"rt":$n[0].LivingRoomPlayer,"sn":"player"},{"a":1,"n":"pointer","t":4,"rt":$n[2].Int32,"sn":"pointer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"start","t":4,"rt":$n[1].Vector2,"sn":"start"}]}; }, $n);
    /*CEBB.Playable.LivingRoomLookSurface end.*/

    /*CEBB.Playable.LivingStage start.*/
    $m("CEBB.Playable.LivingStage", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Ended","is":true,"t":4,"rt":$n[0].LivingStage,"sn":"Ended","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},{"a":2,"n":"Free","is":true,"t":4,"rt":$n[0].LivingStage,"sn":"Free","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},{"a":2,"n":"LookAround","is":true,"t":4,"rt":$n[0].LivingStage,"sn":"LookAround","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},{"a":2,"n":"Move","is":true,"t":4,"rt":$n[0].LivingStage,"sn":"Move","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},{"a":2,"n":"PressBuild","is":true,"t":4,"rt":$n[0].LivingStage,"sn":"PressBuild","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},{"a":2,"n":"SelectItem","is":true,"t":4,"rt":$n[0].LivingStage,"sn":"SelectItem","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}}]}; }, $n);
    /*CEBB.Playable.LivingStage end.*/

    /*CEBB.Playable.DecorCatalogEntry start.*/
    $m("CEBB.Playable.DecorCatalogEntry", function () { return {"att":1057025,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"button","t":4,"rt":$n[4].Button,"sn":"button"},{"a":2,"n":"emptyBadge","t":4,"rt":$n[1].GameObject,"sn":"emptyBadge"},{"a":2,"n":"frame","t":4,"rt":$n[4].Image,"sn":"frame"},{"a":2,"n":"icon","t":4,"rt":$n[4].Image,"sn":"icon"},{"a":2,"n":"item","t":4,"rt":$n[0].DecorItem,"sn":"item"},{"a":2,"n":"nameText","t":4,"rt":$n[5].TMP_Text,"sn":"nameText"},{"a":2,"n":"quantityText","t":4,"rt":$n[5].TMP_Text,"sn":"quantityText"}]}; }, $n);
    /*CEBB.Playable.DecorCatalogEntry end.*/

    /*CEBB.Playable.LivingRoomPlayable start.*/
    $m("CEBB.Playable.LivingRoomPlayable", function () { return {"nested":[$n[0].LivingRoomPlayable.Piece],"att":1048833,"a":2,"at":[new UnityEngine.DefaultExecutionOrder(-100)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"ApplyPlaygroundSettings","t":8,"sn":"ApplyPlaygroundSettings","rt":$n[2].Void},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[2].Void},{"a":1,"n":"BlockReason","t":8,"pi":[{"n":"pos","pt":$n[1].Vector3,"ps":0},{"n":"hx","pt":$n[2].Single,"ps":1},{"n":"hz","pt":$n[2].Single,"ps":2},{"n":"height","pt":$n[2].Single,"ps":3},{"n":"item","pt":$n[0].DecorItem,"ps":4}],"sn":"BlockReason","rt":$n[2].String,"p":[$n[1].Vector3,$n[2].Single,$n[2].Single,$n[2].Single,$n[0].DecorItem]},{"a":1,"n":"Blocks","is":true,"t":8,"pi":[{"n":"b","pt":$n[1].Bounds,"ps":0},{"n":"p","pt":$n[1].Vector3,"ps":1},{"n":"r","pt":$n[2].Single,"ps":2}],"sn":"Blocks","rt":$n[2].Boolean,"p":[$n[1].Bounds,$n[1].Vector3,$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"CanStackOn","is":true,"t":8,"pi":[{"n":"item","pt":$n[0].DecorItem,"ps":0},{"n":"surface","pt":$n[0].DecorItem,"ps":1}],"sn":"CanStackOn","rt":$n[2].Boolean,"p":[$n[0].DecorItem,$n[0].DecorItem],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"ClearIgnoredTap","t":8,"sn":"ClearIgnoredTap","rt":$n[2].Void},{"a":1,"n":"ComputePose","t":8,"pi":[{"n":"ray","pt":$n[1].Ray,"ps":0},{"n":"entry","pt":$n[2].Int32,"ps":1},{"n":"pos","out":true,"pt":$n[1].Vector3,"ps":2},{"n":"yaw","out":true,"pt":$n[2].Single,"ps":3},{"n":"valid","out":true,"pt":$n[2].Boolean,"ps":4}],"sn":"ComputePose","rt":$n[2].Boolean,"p":[$n[1].Ray,$n[2].Int32,$n[1].Vector3,$n[2].Single,$n[2].Boolean],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Count","t":8,"sn":"Count","rt":$n[2].Void},{"a":1,"n":"CurrentPrompt","t":8,"sn":"CurrentPrompt","rt":$n[2].String},{"a":1,"n":"Flash","t":8,"pi":[{"n":"text","pt":$n[2].String,"ps":0}],"sn":"Flash","rt":$n[2].Void,"p":[$n[2].String]},{"a":1,"n":"Frame","t":8,"sn":"Frame","rt":$n[2].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Freeze","t":8,"sn":"Freeze","rt":$n[2].Void},{"a":2,"n":"IsClear","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0},{"n":"radius","pt":$n[2].Single,"ps":1}],"sn":"IsClear","rt":$n[2].Boolean,"p":[$n[1].Vector3,$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[2].Void},{"a":1,"n":"NearestVisiblePiece","t":8,"pi":[{"n":"view","pt":$n[1].Camera,"ps":0}],"sn":"NearestVisiblePiece","rt":$n[0].LivingRoomPlayable.Piece,"p":[$n[1].Camera]},{"a":2,"n":"NotifyFirstInput","t":8,"sn":"NotifyFirstInput","rt":$n[2].Void},{"a":2,"n":"NotifyLook","t":8,"pi":[{"n":"degrees","pt":$n[2].Single,"ps":0}],"sn":"NotifyLook","rt":$n[2].Void,"p":[$n[2].Single]},{"a":2,"n":"NotifyMove","t":8,"pi":[{"n":"distance","pt":$n[2].Single,"ps":0}],"sn":"NotifyMove","rt":$n[2].Void,"p":[$n[2].Single]},{"a":2,"n":"NotifyScreenTouch","t":8,"sn":"NotifyScreenTouch","rt":$n[2].Void},{"a":1,"n":"OnApplicationPause","t":8,"pi":[{"n":"value","pt":$n[2].Boolean,"ps":0}],"sn":"OnApplicationPause","rt":$n[2].Void,"p":[$n[2].Boolean]},{"a":2,"n":"OpenStore","t":8,"sn":"OpenStore","rt":$n[2].Void},{"a":1,"n":"PieceUnder","t":8,"pi":[{"n":"ray","pt":$n[1].Ray,"ps":0}],"sn":"PieceUnder","rt":$n[0].LivingRoomPlayable.Piece,"p":[$n[1].Ray]},{"a":1,"n":"Place","t":8,"pi":[{"n":"entry","pt":$n[2].Int32,"ps":0},{"n":"position","pt":$n[1].Vector3,"ps":1},{"n":"yaw","pt":$n[2].Single,"ps":2}],"sn":"Place","rt":$n[2].Void,"p":[$n[2].Int32,$n[1].Vector3,$n[2].Single]},{"a":2,"n":"PressBuild","t":8,"sn":"PressBuild","rt":$n[2].Void},{"a":2,"n":"PressRotate","t":8,"sn":"PressRotate","rt":$n[2].Void},{"a":2,"n":"PressTrash","t":8,"sn":"PressTrash","rt":$n[2].Void},{"a":1,"n":"RefreshHud","t":8,"sn":"RefreshHud","rt":$n[2].Void},{"a":2,"n":"Remaining","t":8,"pi":[{"n":"entry","pt":$n[2].Int32,"ps":0}],"sn":"Remaining","rt":$n[2].Int32,"p":[$n[2].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Remove","t":8,"pi":[{"n":"piece","pt":$n[0].LivingRoomPlayable.Piece,"ps":0}],"sn":"Remove","rt":$n[2].Void,"p":[$n[0].LivingRoomPlayable.Piece]},{"a":1,"n":"Reveal","t":8,"pi":[{"n":"piece","pt":$n[0].LivingRoomPlayable.Piece,"ps":0},{"n":"position","pt":$n[1].Vector3,"ps":1}],"sn":"Reveal","rt":$n[6].IEnumerator,"p":[$n[0].LivingRoomPlayable.Piece,$n[1].Vector3]},{"a":2,"n":"SelectEntry","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"SelectEntry","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":1,"n":"SetDeleteMode","t":8,"pi":[{"n":"on","pt":$n[2].Boolean,"ps":0}],"sn":"SetDeleteMode","rt":$n[2].Void,"p":[$n[2].Boolean]},{"a":1,"n":"SetGhostMaterial","t":8,"pi":[{"n":"e","pt":$n[2].Int32,"ps":0},{"n":"red","pt":$n[2].Boolean,"ps":1},{"n":"force","pt":$n[2].Boolean,"ps":2}],"sn":"SetGhostMaterial","rt":$n[2].Void,"p":[$n[2].Int32,$n[2].Boolean,$n[2].Boolean]},{"a":1,"n":"Snap","t":8,"pi":[{"n":"v","pt":$n[2].Single,"ps":0}],"sn":"Snap","rt":$n[2].Single,"p":[$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"TapAt","t":8,"pi":[{"n":"screen","pt":$n[1].Vector2,"ps":0}],"sn":"TapAt","rt":$n[2].Void,"p":[$n[1].Vector2]},{"a":1,"n":"UiPoint","is":true,"t":8,"pi":[{"n":"button","pt":$n[4].Button,"ps":0},{"n":"ui","pt":$n[1].Camera,"ps":1},{"n":"screen","out":true,"pt":$n[1].Vector2,"ps":2},{"n":"yOffset","dv":0.22,"o":true,"pt":$n[2].Single,"ps":3}],"sn":"UiPoint","rt":$n[2].Boolean,"p":[$n[4].Button,$n[1].Camera,$n[1].Vector2,$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":1,"n":"UpdateHand","t":8,"pi":[{"n":"view","pt":$n[1].Camera,"ps":0}],"sn":"UpdateHand","rt":$n[2].Void,"p":[$n[1].Camera]},{"a":1,"n":"UpdateUi","t":8,"sn":"UpdateUi","rt":$n[2].Void},{"a":2,"n":"AllowLook","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_AllowLook","t":8,"rt":$n[2].Boolean,"fg":"AllowLook","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"AllowLook"},{"a":2,"n":"BuiltCount","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_BuiltCount","t":8,"rt":$n[2].Int32,"fg":"BuiltCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"BuiltCount"},{"a":2,"n":"CanMove","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_CanMove","t":8,"rt":$n[2].Boolean,"fg":"CanMove","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanMove"},{"a":2,"n":"EndOverlayArmed","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_EndOverlayArmed","t":8,"rt":$n[2].Boolean,"fg":"EndOverlayArmed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"EndOverlayArmed"},{"a":2,"n":"InteractionCount","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_InteractionCount","t":8,"rt":$n[2].Int32,"fg":"InteractionCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"InteractionCount"},{"a":2,"n":"IsDeleteMode","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_IsDeleteMode","t":8,"rt":$n[2].Boolean,"fg":"IsDeleteMode","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsDeleteMode"},{"a":2,"n":"Stage","t":16,"rt":$n[0].LivingStage,"g":{"a":2,"n":"get_Stage","t":8,"rt":$n[0].LivingStage,"fg":"Stage","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},"fn":"Stage"},{"a":2,"n":"aimPrompt","t":4,"rt":$n[2].String,"sn":"aimPrompt"},{"a":1,"n":"aimedPiece","t":4,"rt":$n[0].LivingRoomPlayable.Piece,"sn":"aimedPiece"},{"a":1,"n":"animating","t":4,"rt":$n[2].Int32,"sn":"animating","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Background music", 3, null)],"a":2,"n":"bgmClip","t":4,"rt":$n[1].AudioClip,"sn":"bgmClip"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Music on", 5, null, false, null)],"a":2,"n":"bgmEnabled","t":4,"rt":$n[2].Boolean,"sn":"bgmEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"bgmSource","t":4,"rt":$n[1].AudioSource,"sn":"bgmSource"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Music volume (0-1)", 4, null, false, null),new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"bgmVolume","t":4,"rt":$n[2].Single,"sn":"bgmVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"buildButton","t":4,"rt":$n[4].Button,"sn":"buildButton"},{"a":2,"n":"buildFill","t":4,"rt":$n[4].Image,"sn":"buildFill"},{"at":[new UnityEngine.HeaderAttribute("UI")],"a":2,"n":"buildLabel","t":4,"rt":$n[5].TMP_Text,"sn":"buildLabel"},{"a":1,"n":"buildLocked","is":true,"t":4,"rt":$n[1].Color,"sn":"buildLocked","ro":true},{"a":1,"n":"buildNormal","is":true,"t":4,"rt":$n[1].Color,"sn":"buildNormal","ro":true},{"a":2,"n":"buildPrompt","t":4,"rt":$n[2].String,"sn":"buildPrompt"},{"a":2,"n":"buildReach","t":4,"rt":$n[2].Single,"sn":"buildReach","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"builtCount","t":4,"rt":$n[2].Int32,"sn":"builtCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"byCollider","t":4,"rt":$n[7].Dictionary$2(UnityEngine.Collider,CEBB.Playable.LivingRoomPlayable.Piece),"sn":"byCollider","ro":true},{"at":[new UnityEngine.HeaderAttribute("Catalog \u2014 one entry per hotbar slot")],"a":2,"n":"catalog","t":4,"rt":System.Array.type(CEBB.Playable.DecorCatalogEntry),"sn":"catalog"},{"at":[new UnityEngine.HeaderAttribute("UI")],"a":2,"n":"countText","t":4,"rt":$n[5].TMP_Text,"sn":"countText"},{"a":2,"n":"ctaButton","t":4,"rt":$n[4].Button,"sn":"ctaButton"},{"a":1,"n":"deleteHint","t":4,"rt":$n[0].LivingRoomPlayable.Piece,"sn":"deleteHint"},{"a":2,"n":"deleteMarker","t":4,"rt":$n[1].Transform,"sn":"deleteMarker"},{"a":1,"n":"deleteMode","t":4,"rt":$n[2].Boolean,"sn":"deleteMode","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"deletePrompt","t":4,"rt":$n[2].String,"sn":"deletePrompt"},{"a":2,"n":"emptyPrompt","t":4,"rt":$n[2].String,"sn":"emptyPrompt"},{"a":1,"n":"endOverlayArmed","t":4,"rt":$n[2].Boolean,"sn":"endOverlayArmed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Tutorial"),new UnityEngine.TooltipAttribute("Catalog slot the hand points at first")],"a":2,"n":"firstEntry","t":4,"rt":$n[2].Int32,"sn":"firstEntry","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"firstPrompt","t":4,"rt":$n[2].String,"sn":"firstPrompt"},{"a":1,"n":"flashText","t":4,"rt":$n[2].String,"sn":"flashText"},{"a":1,"n":"flashUntil","t":4,"rt":$n[2].Single,"sn":"flashUntil","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"footprintMarker","t":4,"rt":$n[1].Transform,"sn":"footprintMarker"},{"a":1,"n":"footprintRenderer","t":4,"rt":$n[1].Renderer,"sn":"footprintRenderer"},{"a":2,"n":"freePrompt","t":4,"rt":$n[2].String,"sn":"freePrompt"},{"a":2,"n":"ghostInvalidMaterial","t":4,"rt":$n[1].Material,"sn":"ghostInvalidMaterial"},{"a":2,"n":"ghostMaterial","t":4,"rt":$n[1].Material,"sn":"ghostMaterial"},{"a":1,"n":"ghostRed","t":4,"rt":$n[2].Array.type(System.Boolean),"sn":"ghostRed"},{"a":1,"n":"ghostRenderers","t":4,"rt":System.Array.type(System.Array.type(UnityEngine.Renderer)),"sn":"ghostRenderers"},{"a":1,"n":"ghosts","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"ghosts"},{"a":1,"n":"guidanceCanvas","t":4,"rt":$n[1].Canvas,"sn":"guidanceCanvas"},{"a":1,"n":"guidanceRect","t":4,"rt":$n[1].RectTransform,"sn":"guidanceRect"},{"at":[new UnityEngine.TooltipAttribute("Catalog slot the hand points at after the first build")],"a":2,"n":"guideEntry","t":4,"rt":$n[2].Int32,"sn":"guideEntry","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"a":1,"n":"hasPose","t":4,"rt":$n[2].Boolean,"sn":"hasPose","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"heightPrompt","t":4,"rt":$n[2].String,"sn":"heightPrompt"},{"a":1,"n":"ignoreNextTap","t":4,"rt":$n[2].Boolean,"sn":"ignoreNextTap","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"interactionCount","t":4,"rt":$n[2].Int32,"sn":"interactionCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"invalidReason","t":4,"rt":$n[2].String,"sn":"invalidReason"},{"a":1,"n":"lastClickFrame","t":4,"rt":$n[2].Int32,"sn":"lastClickFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastCtaFrame","t":4,"rt":$n[2].Int32,"sn":"lastCtaFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("Infinity-loop look guide (drawn by the setup script) and its half size in canvas units")],"a":2,"n":"lookGuide","t":4,"rt":$n[1].RectTransform,"sn":"lookGuide"},{"a":2,"n":"lookGuideRadius","t":4,"rt":$n[1].Vector2,"sn":"lookGuideRadius"},{"a":1,"n":"lookProgress","t":4,"rt":$n[2].Single,"sn":"lookProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"lookPrompt","t":4,"rt":$n[2].String,"sn":"lookPrompt"},{"a":2,"n":"lookTutorialDegrees","t":4,"rt":$n[2].Single,"sn":"lookTutorialDegrees","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("End conditions + transparent CTA live in LunaController")],"a":2,"n":"luna","t":4,"rt":$n[0].LunaController,"sn":"luna"},{"a":1,"n":"moveProgress","t":4,"rt":$n[2].Single,"sn":"moveProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"movePrompt","t":4,"rt":$n[2].String,"sn":"movePrompt"},{"a":2,"n":"moveTutorialDistance","t":4,"rt":$n[2].Single,"sn":"moveTutorialDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"onCtaClicked","t":4,"rt":$n[8].UnityEvent,"sn":"onCtaClicked"},{"a":2,"n":"onFurniturePlaced","t":4,"rt":$n[8].UnityEvent,"sn":"onFurniturePlaced"},{"a":2,"n":"onGameEnded","t":4,"rt":$n[8].UnityEvent,"sn":"onGameEnded"},{"a":2,"n":"onGameStarted","t":4,"rt":$n[8].UnityEvent,"sn":"onGameStarted"},{"a":2,"n":"overlapPrompt","t":4,"rt":$n[2].String,"sn":"overlapPrompt"},{"a":1,"n":"paused","t":4,"rt":$n[2].Boolean,"sn":"paused","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"placed","t":4,"rt":$n[7].List$1(CEBB.Playable.LivingRoomPlayable.Piece),"sn":"placed","ro":true},{"at":[new UnityEngine.HeaderAttribute("Placement")],"a":2,"n":"placedRoot","t":4,"rt":$n[1].Transform,"sn":"placedRoot"},{"at":[new UnityEngine.HeaderAttribute("Audio + Luna playground")],"a":2,"n":"placementAudio","t":4,"rt":$n[1].AudioSource,"sn":"placementAudio"},{"a":2,"n":"placementSfx","t":4,"rt":$n[1].AudioClip,"sn":"placementSfx"},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"placementVolume","t":4,"rt":$n[2].Single,"sn":"placementVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"placementsTotal","t":4,"rt":$n[2].Int32,"sn":"placementsTotal","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"player","t":4,"rt":$n[0].LivingRoomPlayer,"sn":"player"},{"a":2,"n":"playerPrompt","t":4,"rt":$n[2].String,"sn":"playerPrompt"},{"a":1,"n":"pool","t":4,"rt":System.Array.type(System.Collections.Generic.List$1(CEBB.Playable.LivingRoomPlayable.Piece)),"sn":"pool"},{"a":1,"n":"posePosition","t":4,"rt":$n[1].Vector3,"sn":"posePosition"},{"a":1,"n":"poseValid","t":4,"rt":$n[2].Boolean,"sn":"poseValid","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"poseYaw","t":4,"rt":$n[2].Single,"sn":"poseYaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("UI")],"a":2,"n":"promptText","t":4,"rt":$n[5].TMP_Text,"sn":"promptText"},{"a":1,"n":"removedOnce","t":4,"rt":$n[2].Boolean,"sn":"removedOnce","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"reticle","t":4,"rt":$n[4].Image,"sn":"reticle"},{"a":2,"n":"revealSeconds","t":4,"rt":$n[2].Single,"sn":"revealSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"roomHeight","t":4,"rt":$n[2].Single,"sn":"roomHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"roomMax","t":4,"rt":$n[1].Vector2,"sn":"roomMax"},{"a":2,"n":"roomMin","t":4,"rt":$n[1].Vector2,"sn":"roomMin"},{"at":[new UnityEngine.HeaderAttribute("Placement")],"a":2,"n":"roomRoot","t":4,"rt":$n[1].Transform,"sn":"roomRoot"},{"a":1,"n":"roomSolids","t":4,"rt":$n[7].List$1(UnityEngine.Collider),"sn":"roomSolids","ro":true},{"a":2,"n":"rotateButton","t":4,"rt":$n[4].Button,"sn":"rotateButton"},{"a":1,"n":"rotateOffset","t":4,"rt":$n[2].Single,"sn":"rotateOffset","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"selectPrompt","t":4,"rt":$n[2].String,"sn":"selectPrompt"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"selected","t":4,"rt":$n[2].Int32,"sn":"selected","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"snap","t":4,"rt":$n[2].Single,"sn":"snap","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stage","t":4,"rt":$n[0].LivingStage,"sn":"stage","box":function ($v) { return Bridge.box($v, CEBB.Playable.LivingStage, System.Enum.toStringFn(CEBB.Playable.LivingStage));}},{"a":1,"n":"started","t":4,"rt":$n[2].Boolean,"sn":"started","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"trashActive","is":true,"t":4,"rt":$n[1].Color,"sn":"trashActive","ro":true},{"a":2,"n":"trashButton","t":4,"rt":$n[4].Button,"sn":"trashButton"},{"a":1,"n":"trashIdle","is":true,"t":4,"rt":$n[1].Color,"sn":"trashIdle","ro":true},{"a":2,"n":"trashImage","t":4,"rt":$n[4].Image,"sn":"trashImage"},{"a":2,"n":"trashPrompt","t":4,"rt":$n[2].String,"sn":"trashPrompt"},{"a":2,"n":"wallPrompt","t":4,"rt":$n[2].String,"sn":"wallPrompt"}]}; }, $n);
    /*CEBB.Playable.LivingRoomPlayable end.*/

    /*CEBB.Playable.LivingRoomPlayable+Piece start.*/
    $m("CEBB.Playable.LivingRoomPlayable.Piece", function () { return {"td":$n[0].LivingRoomPlayable,"att":1048835,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"box","t":4,"rt":$n[1].BoxCollider,"sn":"box"},{"a":2,"n":"entry","t":4,"rt":$n[2].Int32,"sn":"entry","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"go","t":4,"rt":$n[1].GameObject,"sn":"go"},{"a":2,"n":"walkable","t":4,"rt":$n[2].Boolean,"sn":"walkable","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CEBB.Playable.LivingRoomPlayable+Piece end.*/

    /*CEBB.Playable.LivingRoomPlayer start.*/
    $m("CEBB.Playable.LivingRoomPlayer", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ApplyLook","t":8,"pi":[{"n":"delta","pt":$n[1].Vector2,"ps":0}],"sn":"ApplyLook","rt":$n[2].Void,"p":[$n[1].Vector2]},{"a":2,"n":"ApplyView","t":8,"sn":"ApplyView","rt":$n[2].Void},{"a":2,"n":"LookAt","t":8,"pi":[{"n":"point","pt":$n[1].Vector3,"ps":0},{"n":"smooth","pt":$n[2].Boolean,"ps":1}],"sn":"LookAt","rt":$n[2].Void,"p":[$n[1].Vector3,$n[2].Boolean]},{"a":1,"n":"Move","t":8,"pi":[{"n":"input","pt":$n[1].Vector2,"ps":0},{"n":"deltaTime","pt":$n[2].Single,"ps":1}],"sn":"Move","rt":$n[2].Void,"p":[$n[1].Vector2,$n[2].Single]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[2].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"EyePosition","t":16,"rt":$n[1].Vector3,"g":{"a":2,"n":"get_EyePosition","t":8,"rt":$n[1].Vector3,"fg":"EyePosition"},"fn":"EyePosition"},{"a":2,"n":"Yaw","t":16,"rt":$n[2].Single,"g":{"a":2,"n":"get_Yaw","t":8,"rt":$n[2].Single,"fg":"Yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Yaw"},{"a":2,"n":"bodyRadius","t":4,"rt":$n[2].Single,"sn":"bodyRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"eyeHeight","t":4,"rt":$n[2].Single,"sn":"eyeHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusPitch","t":4,"rt":$n[2].Single,"sn":"focusPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusUntil","t":4,"rt":$n[2].Single,"sn":"focusUntil","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusYaw","t":4,"rt":$n[2].Single,"sn":"focusYaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusing","t":4,"rt":$n[2].Boolean,"sn":"focusing","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"game","t":4,"rt":$n[0].LivingRoomPlayable,"sn":"game"},{"a":2,"n":"lookSensitivity","t":4,"rt":$n[2].Single,"sn":"lookSensitivity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"movePad","t":4,"rt":$n[0].RoomMovePad,"sn":"movePad"},{"a":2,"n":"pitch","t":4,"rt":$n[2].Single,"sn":"pitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"playerCamera","t":4,"rt":$n[1].Camera,"sn":"playerCamera"},{"a":2,"n":"spawnPosition","t":4,"rt":$n[1].Vector3,"sn":"spawnPosition"},{"a":2,"n":"walkSpeed","t":4,"rt":$n[2].Single,"sn":"walkSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"yaw","t":4,"rt":$n[2].Single,"sn":"yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CEBB.Playable.LivingRoomPlayer end.*/

    /*CEBB.Playable.LunaController start.*/
    $m("CEBB.Playable.LunaController", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[2].Void},{"a":2,"n":"EndGame","t":8,"sn":"EndGame","rt":$n[2].Void},{"a":2,"n":"NotifyClick","t":8,"pi":[{"n":"totalClicks","pt":$n[2].Int32,"ps":0}],"sn":"NotifyClick","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":2,"n":"NotifyPlaced","t":8,"pi":[{"n":"totalPlaced","pt":$n[2].Int32,"ps":0}],"sn":"NotifyPlaced","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":2,"n":"NotifyStarted","t":8,"sn":"NotifyStarted","rt":$n[2].Void},{"a":2,"n":"OnCtaClicked","t":8,"sn":"OnCtaClicked","rt":$n[2].Void},{"a":1,"n":"ShowTime","t":8,"sn":"ShowTime","rt":$n[2].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"Ended","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_Ended","t":8,"rt":$n[2].Boolean,"fg":"Ended","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Ended"},{"a":2,"n":"TimeLeft","t":16,"rt":$n[2].Single,"g":{"a":2,"n":"get_TimeLeft","t":8,"rt":$n[2].Single,"fg":"TimeLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"TimeLeft"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Clicks to end (0 = off)", 2, null, false, null)],"a":2,"n":"clicksToEnd","t":4,"rt":$n[2].Int32,"sn":"clicksToEnd","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.TooltipAttribute("Transparent full-screen button shown when the game ends")],"a":2,"n":"ctaOverlay","t":4,"rt":$n[4].Button,"sn":"ctaOverlay"},{"a":1,"n":"elapsed","t":4,"rt":$n[2].Single,"sn":"elapsed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"ended","t":4,"rt":$n[2].Boolean,"sn":"ended","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"endedFrame","t":4,"rt":$n[2].Int32,"sn":"endedFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"game","t":4,"rt":$n[0].LivingRoomPlayable,"sn":"game"},{"a":1,"n":"gameEndedSent","t":4,"rt":$n[2].Boolean,"sn":"gameEndedSent","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Game logo", 3, null)],"a":2,"n":"gameLogo","t":4,"rt":$n[1].Texture2D,"sn":"gameLogo"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Items placed to end (0 = off)", 1, null, false, null)],"a":2,"n":"itemsToEnd","t":4,"rt":$n[2].Int32,"sn":"itemsToEnd","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastCtaFrame","t":4,"rt":$n[2].Int32,"sn":"lastCtaFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastSecond","t":4,"rt":$n[2].Int32,"sn":"lastSecond","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"logoImage","t":4,"rt":$n[4].Image,"sn":"logoImage"},{"a":1,"n":"started","t":4,"rt":$n[2].Boolean,"sn":"started","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Time limit (seconds)", 0, null, false, null)],"a":2,"n":"timeLimit","t":4,"rt":$n[2].Single,"sn":"timeLimit","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"timerText","t":4,"rt":$n[5].TMP_Text,"sn":"timerText"}]}; }, $n);
    /*CEBB.Playable.LunaController end.*/

    /*CEBB.Playable.PlacementSurface start.*/
    $m("CEBB.Playable.PlacementSurface", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"allowWallItems","t":4,"rt":$n[2].Boolean,"sn":"allowWallItems","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CEBB.Playable.PlacementSurface end.*/

    /*CEBB.Playable.BedroomLayout start.*/
    $m("CEBB.Playable.BedroomLayout", function () { return {"att":1048833,"a":2,"at":[new UnityEngine.ExecuteAlwaysAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ApplyLayout","t":8,"pi":[{"n":"aspect","pt":$n[2].Single,"ps":0}],"sn":"ApplyLayout","rt":$n[2].Void,"p":[$n[2].Single]},{"a":1,"n":"OnPreCull","t":8,"sn":"OnPreCull","rt":$n[2].Void},{"a":1,"n":"Place","t":8,"pi":[{"n":"rt","pt":$n[1].RectTransform,"ps":0},{"n":"min","pt":$n[1].Vector2,"ps":1},{"n":"max","pt":$n[1].Vector2,"ps":2}],"sn":"Place","rt":$n[2].Void,"p":[$n[1].RectTransform,$n[1].Vector2,$n[1].Vector2]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"canvas","t":4,"rt":$n[1].Canvas,"sn":"canvas"},{"a":2,"n":"catalog","t":4,"rt":$n[1].RectTransform,"sn":"catalog"},{"a":2,"n":"catalogItemCount","t":4,"rt":$n[2].Int32,"sn":"catalogItemCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"completedDemo","t":4,"rt":$n[1].RectTransform,"sn":"completedDemo"},{"a":2,"n":"cta","t":4,"rt":$n[1].RectTransform,"sn":"cta"},{"a":2,"n":"firstPersonMode","t":4,"rt":$n[2].Boolean,"sn":"firstPersonMode","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"grid","t":4,"rt":$n[4].GridLayoutGroup,"sn":"grid"},{"a":2,"n":"header","t":4,"rt":$n[1].RectTransform,"sn":"header"},{"a":2,"n":"landscapeLogoSize","t":4,"rt":$n[1].Vector2,"sn":"landscapeLogoSize"},{"a":2,"n":"landscapeLogoTopCenter","t":4,"rt":$n[1].Vector2,"sn":"landscapeLogoTopCenter"},{"a":2,"n":"landscapePreviewSize","t":4,"rt":$n[1].Vector2,"sn":"landscapePreviewSize"},{"a":2,"n":"landscapePreviewTopCenter","t":4,"rt":$n[1].Vector2,"sn":"landscapePreviewTopCenter"},{"a":1,"n":"lastAspect","t":4,"rt":$n[2].Single,"sn":"lastAspect","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"lastSafeArea","t":4,"rt":$n[1].Rect,"sn":"lastSafeArea"},{"a":2,"n":"lookTarget","t":4,"rt":$n[1].Vector3,"sn":"lookTarget"},{"a":2,"n":"movePad","t":4,"rt":$n[1].RectTransform,"sn":"movePad"},{"at":[new UnityEngine.HideInInspector()],"a":2,"n":"preserveCameraView","t":4,"rt":$n[2].Boolean,"sn":"preserveCameraView","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"progress","t":4,"rt":$n[1].RectTransform,"sn":"progress"},{"a":2,"n":"prompt","t":4,"rt":$n[1].RectTransform,"sn":"prompt"},{"a":2,"n":"respectSafeArea","t":4,"rt":$n[2].Boolean,"sn":"respectSafeArea","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"roomCamera","t":4,"rt":$n[1].Camera,"sn":"roomCamera"},{"a":1,"n":"safeMax","t":4,"rt":$n[1].Vector2,"sn":"safeMax"},{"a":1,"n":"safeMin","t":4,"rt":$n[1].Vector2,"sn":"safeMin"},{"a":2,"n":"stats","t":4,"rt":$n[1].RectTransform,"sn":"stats"},{"a":2,"n":"textOutlines","t":4,"rt":System.Array.type(CEBB.Playable.LunaTextOutline),"sn":"textOutlines"},{"a":2,"n":"viewOffset","t":4,"rt":$n[1].Vector3,"sn":"viewOffset"}]}; }, $n);
    /*CEBB.Playable.BedroomLayout end.*/

    /*CEBB.Playable.BedroomState start.*/
    $m("CEBB.Playable.BedroomState", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Completed","is":true,"t":4,"rt":$n[0].BedroomState,"sn":"Completed","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},{"a":2,"n":"Ended","is":true,"t":4,"rt":$n[0].BedroomState,"sn":"Ended","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},{"a":2,"n":"FirstBuild","is":true,"t":4,"rt":$n[0].BedroomState,"sn":"FirstBuild","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},{"a":2,"n":"FreeBuild","is":true,"t":4,"rt":$n[0].BedroomState,"sn":"FreeBuild","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},{"a":2,"n":"GuidedBuild","is":true,"t":4,"rt":$n[0].BedroomState,"sn":"GuidedBuild","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},{"a":2,"n":"WaitingForStart","is":true,"t":4,"rt":$n[0].BedroomState,"sn":"WaitingForStart","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}}]}; }, $n);
    /*CEBB.Playable.BedroomState end.*/

    /*CEBB.Playable.RoomTutorialStage start.*/
    $m("CEBB.Playable.RoomTutorialStage", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Explore","is":true,"t":4,"rt":$n[0].RoomTutorialStage,"sn":"Explore","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}},{"a":2,"n":"Finished","is":true,"t":4,"rt":$n[0].RoomTutorialStage,"sn":"Finished","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}},{"a":2,"n":"LookAround","is":true,"t":4,"rt":$n[0].RoomTutorialStage,"sn":"LookAround","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}},{"a":2,"n":"Move","is":true,"t":4,"rt":$n[0].RoomTutorialStage,"sn":"Move","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}},{"a":2,"n":"PlaceBed","is":true,"t":4,"rt":$n[0].RoomTutorialStage,"sn":"PlaceBed","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}}]}; }, $n);
    /*CEBB.Playable.RoomTutorialStage end.*/

    /*CEBB.Playable.FurnitureSlot start.*/
    $m("CEBB.Playable.FurnitureSlot", function () { return {"att":1057025,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"anchor","t":4,"rt":$n[1].Transform,"sn":"anchor"},{"a":2,"n":"buildOrder","t":4,"rt":$n[2].Int32,"sn":"buildOrder","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"built","t":4,"rt":$n[2].Boolean,"sn":"built","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"builtBadge","t":4,"rt":$n[1].GameObject,"sn":"builtBadge"},{"a":2,"n":"button","t":4,"rt":$n[4].Button,"sn":"button"},{"a":2,"n":"definition","t":4,"rt":$n[0].FurnitureDefinition,"sn":"definition"},{"a":2,"n":"frame","t":4,"rt":$n[4].Image,"sn":"frame"},{"a":2,"n":"ghost","t":4,"rt":$n[1].GameObject,"sn":"ghost"},{"a":2,"n":"instance","t":4,"rt":$n[1].GameObject,"sn":"instance"},{"a":2,"n":"localEulerAngles","t":4,"rt":$n[1].Vector3,"sn":"localEulerAngles"},{"a":2,"n":"localPosition","t":4,"rt":$n[1].Vector3,"sn":"localPosition"},{"a":2,"n":"localScale","t":4,"rt":$n[1].Vector3,"sn":"localScale"},{"a":2,"n":"targetCollider","t":4,"rt":$n[1].BoxCollider,"sn":"targetCollider"}]}; }, $n);
    /*CEBB.Playable.FurnitureSlot end.*/

    /*CEBB.Playable.FurnitureInventoryEntry start.*/
    $m("CEBB.Playable.FurnitureInventoryEntry", function () { return {"att":1057025,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"button","t":4,"rt":$n[4].Button,"sn":"button"},{"a":2,"n":"definition","t":4,"rt":$n[0].FurnitureDefinition,"sn":"definition"},{"a":2,"n":"emptyBadge","t":4,"rt":$n[1].GameObject,"sn":"emptyBadge"},{"a":2,"n":"frame","t":4,"rt":$n[4].Image,"sn":"frame"},{"a":2,"n":"icon","t":4,"rt":$n[4].Image,"sn":"icon"},{"a":2,"n":"quantityText","t":4,"rt":$n[5].TMP_Text,"sn":"quantityText"}]}; }, $n);
    /*CEBB.Playable.FurnitureInventoryEntry end.*/

    /*CEBB.Playable.BedroomPlayable start.*/
    $m("CEBB.Playable.BedroomPlayable", function () { return {"att":1048833,"a":2,"at":[new UnityEngine.DefaultExecutionOrder(-100)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AddOutline","t":8,"pi":[{"n":"s","pt":$n[0].FurnitureSlot,"ps":0},{"n":"b","pt":$n[1].Bounds,"ps":1}],"sn":"AddOutline","rt":$n[2].Void,"p":[$n[0].FurnitureSlot,$n[1].Bounds]},{"a":1,"n":"ApplyPlaygroundSettings","t":8,"sn":"ApplyPlaygroundSettings","rt":$n[2].Void},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[2].Void},{"a":2,"n":"BeginTutorial","t":8,"sn":"BeginTutorial","rt":$n[2].Void},{"a":1,"n":"BoundsInAnchor","is":true,"t":8,"pi":[{"n":"instance","pt":$n[1].GameObject,"ps":0},{"n":"anchor","pt":$n[1].Transform,"ps":1}],"sn":"BoundsInAnchor","rt":$n[1].Bounds,"p":[$n[1].GameObject,$n[1].Transform]},{"a":1,"n":"EndGame","t":8,"pi":[{"n":"completed","pt":$n[2].Boolean,"ps":0}],"sn":"EndGame","rt":$n[2].Void,"p":[$n[2].Boolean]},{"a":2,"n":"NotifyLookMotion","t":8,"pi":[{"n":"degrees","pt":$n[2].Single,"ps":0}],"sn":"NotifyLookMotion","rt":$n[2].Void,"p":[$n[2].Single]},{"a":2,"n":"NotifyMoveDistance","t":8,"pi":[{"n":"distance","pt":$n[2].Single,"ps":0}],"sn":"NotifyMoveDistance","rt":$n[2].Void,"p":[$n[2].Single]},{"a":1,"n":"OnApplicationPause","t":8,"pi":[{"n":"value","pt":$n[2].Boolean,"ps":0}],"sn":"OnApplicationPause","rt":$n[2].Void,"p":[$n[2].Boolean]},{"a":2,"n":"OpenEndCardAndCta","t":8,"sn":"OpenEndCardAndCta","rt":$n[2].Void},{"a":2,"n":"OpenStore","t":8,"sn":"OpenStore","rt":$n[2].Void},{"a":1,"n":"Place","is":true,"t":8,"pi":[{"n":"go","pt":$n[1].GameObject,"ps":0},{"n":"s","pt":$n[0].FurnitureSlot,"ps":1}],"sn":"Place","rt":$n[2].Void,"p":[$n[1].GameObject,$n[0].FurnitureSlot]},{"a":2,"n":"Remaining","t":8,"pi":[{"n":"definition","pt":$n[0].FurnitureDefinition,"ps":0}],"sn":"Remaining","rt":$n[2].Int32,"p":[$n[0].FurnitureDefinition],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Reveal","t":8,"pi":[{"n":"s","pt":$n[0].FurnitureSlot,"ps":0},{"n":"index","pt":$n[2].Int32,"ps":1}],"sn":"Reveal","rt":$n[6].IEnumerator,"p":[$n[0].FurnitureSlot,$n[2].Int32]},{"a":2,"n":"SelectInventory","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"SelectInventory","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":2,"n":"SetAimedSlot","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"SetAimedSlot","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":1,"n":"ShowHint","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"ShowHint","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":1,"n":"SignalEnded","t":8,"sn":"SignalEnded","rt":$n[2].Void},{"a":2,"n":"TryBuild","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"TryBuild","rt":$n[2].Boolean,"p":[$n[2].Int32],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"TryBuildAimed","t":8,"sn":"TryBuildAimed","rt":$n[2].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"TryBuildFromScreen","t":8,"pi":[{"n":"point","pt":$n[1].Vector2,"ps":0},{"n":"view","pt":$n[1].Camera,"ps":1}],"sn":"TryBuildFromScreen","rt":$n[2].Boolean,"p":[$n[1].Vector2,$n[1].Camera],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"UpdateGuidanceVisual","t":8,"pi":[{"n":"view","pt":$n[1].Camera,"ps":0}],"sn":"UpdateGuidanceVisual","rt":$n[2].Void,"p":[$n[1].Camera]},{"a":1,"n":"UpdateUi","t":8,"sn":"UpdateUi","rt":$n[2].Void},{"a":2,"n":"AimedIndex","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_AimedIndex","t":8,"rt":$n[2].Int32,"fg":"AimedIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"AimedIndex"},{"a":2,"n":"AllowLook","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_AllowLook","t":8,"rt":$n[2].Boolean,"fg":"AllowLook","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"AllowLook"},{"a":2,"n":"BuiltCount","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_BuiltCount","t":8,"rt":$n[2].Int32,"fg":"BuiltCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"BuiltCount"},{"a":2,"n":"CanAim","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_CanAim","t":8,"rt":$n[2].Boolean,"fg":"CanAim","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanAim"},{"a":2,"n":"CanMove","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_CanMove","t":8,"rt":$n[2].Boolean,"fg":"CanMove","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"CanMove"},{"a":2,"n":"ElapsedSeconds","t":16,"rt":$n[2].Single,"g":{"a":2,"n":"get_ElapsedSeconds","t":8,"rt":$n[2].Single,"fg":"ElapsedSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"ElapsedSeconds"},{"a":2,"n":"EndOverlayArmed","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_EndOverlayArmed","t":8,"rt":$n[2].Boolean,"fg":"EndOverlayArmed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"EndOverlayArmed"},{"a":2,"n":"HintIndex","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_HintIndex","t":8,"rt":$n[2].Int32,"fg":"HintIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"HintIndex"},{"a":2,"n":"HintShownCount","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_HintShownCount","t":8,"rt":$n[2].Int32,"fg":"HintShownCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"HintShownCount"},{"a":2,"n":"InteractionCount","t":16,"rt":$n[2].Int32,"g":{"a":2,"n":"get_InteractionCount","t":8,"rt":$n[2].Int32,"fg":"InteractionCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"InteractionCount"},{"a":2,"n":"State","t":16,"rt":$n[0].BedroomState,"g":{"a":2,"n":"get_State","t":8,"rt":$n[0].BedroomState,"fg":"State","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},"fn":"State"},{"a":2,"n":"Tutorial","t":16,"rt":$n[0].RoomTutorialStage,"g":{"a":2,"n":"get_Tutorial","t":8,"rt":$n[0].RoomTutorialStage,"fg":"Tutorial","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}},"fn":"Tutorial"},{"a":2,"n":"aimToBuild","t":4,"rt":$n[2].Boolean,"sn":"aimToBuild","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"aimedIndex","t":4,"rt":$n[2].Int32,"sn":"aimedIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"animating","t":4,"rt":$n[2].Boolean,"sn":"animating","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Background music", 3, null)],"a":2,"n":"bgmClip","t":4,"rt":$n[1].AudioClip,"sn":"bgmClip"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Music on", 5, null, false, null)],"a":2,"n":"bgmEnabled","t":4,"rt":$n[2].Boolean,"sn":"bgmEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Luna playground: music + logo")],"a":2,"n":"bgmSource","t":4,"rt":$n[1].AudioSource,"sn":"bgmSource"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Music volume (0-1)", 4, null, false, null),new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"bgmVolume","t":4,"rt":$n[2].Single,"sn":"bgmVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"builtCount","t":4,"rt":$n[2].Int32,"sn":"builtCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"countText","t":4,"rt":$n[5].TMP_Text,"sn":"countText"},{"a":2,"n":"ctaButton","t":4,"rt":$n[4].Button,"sn":"ctaButton"},{"at":[new UnityEngine.HeaderAttribute("End trigger: click threshold 0 disables the click limit"),new UnityEngine.LunaPlaygroundFieldAttribute("Steps to end (0 = no limit)", 1, null, false, null)],"a":2,"n":"ctaCountThreshold","t":4,"rt":$n[2].Int32,"sn":"ctaCountThreshold","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"ctaDelivered","t":4,"rt":$n[2].Boolean,"sn":"ctaDelivered","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"ctaRoot","t":4,"rt":$n[1].GameObject,"sn":"ctaRoot"},{"at":[new UnityEngine.HeaderAttribute("Timer"),new UnityEngine.LunaPlaygroundFieldAttribute("Time limit (seconds)", 0, null, false, null)],"a":2,"n":"durationSeconds","t":4,"rt":$n[2].Single,"sn":"durationSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"editorPreviewRoot","t":4,"rt":$n[1].GameObject,"sn":"editorPreviewRoot"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"elapsedSeconds","t":4,"rt":$n[2].Single,"sn":"elapsedSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"endOnTimeout","t":4,"rt":$n[2].Boolean,"sn":"endOnTimeout","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"endOverlayArmed","t":4,"rt":$n[2].Boolean,"sn":"endOverlayArmed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"endOverlayButton","t":4,"rt":$n[4].Button,"sn":"endOverlayButton"},{"a":2,"n":"endOverlayRoot","t":4,"rt":$n[1].GameObject,"sn":"endOverlayRoot"},{"a":1,"n":"endedSent","t":4,"rt":$n[2].Boolean,"sn":"endedSent","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Tutorial + search hint")],"a":2,"n":"firstBedSlot","t":4,"rt":$n[2].Int32,"sn":"firstBedSlot","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"firstPrompt","t":4,"rt":$n[2].String,"sn":"firstPrompt"},{"a":2,"n":"ghostMaterial","t":4,"rt":$n[1].Material,"sn":"ghostMaterial"},{"a":2,"n":"ghostOutlineMaterial","t":4,"rt":$n[1].Material,"sn":"ghostOutlineMaterial"},{"a":1,"n":"guidanceCanvas","t":4,"rt":$n[1].Canvas,"sn":"guidanceCanvas"},{"a":1,"n":"guidanceRect","t":4,"rt":$n[1].RectTransform,"sn":"guidanceRect"},{"a":2,"n":"guidedBuildCount","t":4,"rt":$n[2].Int32,"sn":"guidedBuildCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"at":[new UnityEngine.TooltipAttribute("After the move tutorial, point the hand at the ghost in view (or the nearest one) until the next build. One time only.")],"a":2,"n":"handAfterMove","t":4,"rt":$n[2].Boolean,"sn":"handAfterMove","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"hintDelaySeconds","t":4,"rt":$n[2].Single,"sn":"hintDelaySeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hintIndex","t":4,"rt":$n[2].Int32,"sn":"hintIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hintShownCount","t":4,"rt":$n[2].Int32,"sn":"hintShownCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"interactionCount","t":4,"rt":$n[2].Int32,"sn":"interactionCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"inventory","t":4,"rt":System.Array.type(CEBB.Playable.FurnitureInventoryEntry),"sn":"inventory"},{"a":1,"n":"lastCtaFrame","t":4,"rt":$n[2].Int32,"sn":"lastCtaFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastInteractionFrame","t":4,"rt":$n[2].Int32,"sn":"lastInteractionFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastSecond","t":4,"rt":$n[2].Int32,"sn":"lastSecond","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"logoImage","t":4,"rt":$n[4].Image,"sn":"logoImage"},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Game logo", 6, null)],"a":2,"n":"logoTexture","t":4,"rt":$n[1].Texture2D,"sn":"logoTexture"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"lookProgress","t":4,"rt":$n[2].Single,"sn":"lookProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"lookTutorialDegrees","t":4,"rt":$n[2].Single,"sn":"lookTutorialDegrees","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"lookTutorialLoop","t":4,"rt":$n[4].Image,"sn":"lookTutorialLoop"},{"a":1,"n":"moveGuide","t":4,"rt":$n[2].Boolean,"sn":"moveGuide","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"moveProgress","t":4,"rt":$n[2].Single,"sn":"moveProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("Move tutorial (after the look tutorial)"),new UnityEngine.LunaPlaygroundFieldAttribute("Show move tutorial", 2, null, false, null)],"a":2,"n":"moveTutorial","t":4,"rt":$n[2].Boolean,"sn":"moveTutorial","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"moveTutorialDistance","t":4,"rt":$n[2].Single,"sn":"moveTutorialDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"moveTutorialLabel","t":4,"rt":$n[5].TMP_Text,"sn":"moveTutorialLabel"},{"a":2,"n":"moveTutorialPad","t":4,"rt":$n[0].RoomMovePad,"sn":"moveTutorialPad"},{"a":2,"n":"moveTutorialText","t":4,"rt":$n[2].String,"sn":"moveTutorialText"},{"a":2,"n":"onCtaClicked","t":4,"rt":$n[8].UnityEvent,"sn":"onCtaClicked"},{"a":2,"n":"onEndCardRequested","t":4,"rt":$n[8].UnityEvent,"sn":"onEndCardRequested"},{"a":2,"n":"onFurniturePlaced","t":4,"rt":$n[8].UnityEvent,"sn":"onFurniturePlaced"},{"a":2,"n":"onGameEnded","t":4,"rt":$n[8].UnityEvent,"sn":"onGameEnded"},{"a":2,"n":"onGameStarted","t":4,"rt":$n[8].UnityEvent,"sn":"onGameStarted"},{"a":1,"n":"overlayArmedFrame","t":4,"rt":$n[2].Int32,"sn":"overlayArmedFrame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"paused","t":4,"rt":$n[2].Boolean,"sn":"paused","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Placement audio")],"a":2,"n":"placementAudio","t":4,"rt":$n[1].AudioSource,"sn":"placementAudio"},{"a":2,"n":"placementSfx","t":4,"rt":$n[1].AudioClip,"sn":"placementSfx"},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"placementVolume","t":4,"rt":$n[2].Single,"sn":"placementVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"playerBody","t":4,"rt":$n[1].Transform,"sn":"playerBody"},{"a":2,"n":"playerController","t":4,"rt":$n[0].FirstPersonRoom,"sn":"playerController"},{"a":2,"n":"progressFill","t":4,"rt":$n[4].Image,"sn":"progressFill"},{"a":2,"n":"progressText","t":4,"rt":$n[5].TMP_Text,"sn":"progressText"},{"a":2,"n":"promptText","t":4,"rt":$n[5].TMP_Text,"sn":"promptText"},{"a":2,"n":"revealSeconds","t":4,"rt":$n[2].Single,"sn":"revealSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"searchElapsed","t":4,"rt":$n[2].Single,"sn":"searchElapsed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"selectedInventory","t":4,"rt":$n[2].Int32,"sn":"selectedInventory","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"showCtaButton","t":4,"rt":$n[2].Boolean,"sn":"showCtaButton","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Each slot is one placement; definitions may repeat")],"a":2,"n":"slots","t":4,"rt":System.Array.type(CEBB.Playable.FurnitureSlot),"sn":"slots"},{"at":[new UnityEngine.HeaderAttribute("UI")],"a":2,"n":"startSurface","t":4,"rt":$n[4].Button,"sn":"startSurface"},{"a":2,"n":"startTapCounts","t":4,"rt":$n[2].Boolean,"sn":"startTapCounts","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"started","t":4,"rt":$n[2].Boolean,"sn":"started","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"state","t":4,"rt":$n[0].BedroomState,"sn":"state","box":function ($v) { return Bridge.box($v, CEBB.Playable.BedroomState, System.Enum.toStringFn(CEBB.Playable.BedroomState));}},{"a":2,"n":"stopTimerOnCompletion","t":4,"rt":$n[2].Boolean,"sn":"stopTimerOnCompletion","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"timerRunning","t":4,"rt":$n[2].Boolean,"sn":"timerRunning","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"timerText","t":4,"rt":$n[5].TMP_Text,"sn":"timerText"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"tutorialStage","t":4,"rt":$n[0].RoomTutorialStage,"sn":"tutorialStage","box":function ($v) { return Bridge.box($v, CEBB.Playable.RoomTutorialStage, System.Enum.toStringFn(CEBB.Playable.RoomTutorialStage));}}]}; }, $n);
    /*CEBB.Playable.BedroomPlayable end.*/

    /*CEBB.Playable.CherryHouseReveal start.*/
    $m("CEBB.Playable.CherryHouseReveal", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[2].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[2].Void},{"a":1,"n":"PullBack","t":8,"pi":[{"n":"camera","pt":$n[1].Camera,"ps":0}],"sn":"PullBack","rt":$n[6].IEnumerator,"p":[$n[1].Camera]},{"a":1,"n":"Reveal","t":8,"sn":"Reveal","rt":$n[2].Void},{"a":2,"n":"game","t":4,"rt":$n[0].BedroomPlayable,"sn":"game"},{"a":2,"n":"houseTarget","t":4,"rt":$n[1].Vector3,"sn":"houseTarget"},{"a":2,"n":"player","t":4,"rt":$n[0].FirstPersonRoom,"sn":"player"},{"a":2,"n":"revealSeconds","t":4,"rt":$n[2].Single,"sn":"revealSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"revealing","t":4,"rt":$n[2].Boolean,"sn":"revealing","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CEBB.Playable.CherryHouseReveal end.*/

    /*CEBB.Playable.FirstPersonRoom start.*/
    $m("CEBB.Playable.FirstPersonRoom", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ApplyLook","t":8,"pi":[{"n":"delta","pt":$n[1].Vector2,"ps":0}],"sn":"ApplyLook","rt":$n[2].Void,"p":[$n[1].Vector2]},{"a":2,"n":"ApplyView","t":8,"sn":"ApplyView","rt":$n[2].Void},{"a":2,"n":"FindAimedSlot","t":8,"sn":"FindAimedSlot","rt":$n[2].Int32,"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"FindHintCandidate","t":8,"sn":"FindHintCandidate","rt":$n[2].Int32,"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"FindSlotAlongRay","t":8,"pi":[{"n":"ray","pt":$n[1].Ray,"ps":0}],"sn":"FindSlotAlongRay","rt":$n[2].Int32,"p":[$n[1].Ray],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"FocusOnHint","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"FocusOnHint","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":1,"n":"IsClear","t":8,"pi":[{"n":"p","pt":$n[1].Vector3,"ps":0}],"sn":"IsClear","rt":$n[2].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[2].Void},{"a":2,"n":"LookAtSlot","t":8,"pi":[{"n":"index","pt":$n[2].Int32,"ps":0}],"sn":"LookAtSlot","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":2,"n":"Move","t":8,"pi":[{"n":"input","pt":$n[1].Vector2,"ps":0},{"n":"deltaTime","pt":$n[2].Single,"ps":1}],"sn":"Move","rt":$n[2].Void,"p":[$n[1].Vector2,$n[2].Single]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[2].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":1,"n":"aimHits","t":4,"rt":System.Array.type(UnityEngine.RaycastHit),"sn":"aimHits","ro":true},{"a":1,"n":"blockers","t":4,"rt":System.Array.type(UnityEngine.Collider),"sn":"blockers"},{"a":2,"n":"bodyRadius","t":4,"rt":$n[2].Single,"sn":"bodyRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"buildReach","t":4,"rt":$n[2].Single,"sn":"buildReach","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"centerFirstTarget","t":4,"rt":$n[2].Boolean,"sn":"centerFirstTarget","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"eyeHeight","t":4,"rt":$n[2].Single,"sn":"eyeHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusPitch","t":4,"rt":$n[2].Single,"sn":"focusPitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusUntil","t":4,"rt":$n[2].Single,"sn":"focusUntil","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusYaw","t":4,"rt":$n[2].Single,"sn":"focusYaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"focusing","t":4,"rt":$n[2].Boolean,"sn":"focusing","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"game","t":4,"rt":$n[0].BedroomPlayable,"sn":"game"},{"a":2,"n":"lookSensitivity","t":4,"rt":$n[2].Single,"sn":"lookSensitivity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"maxRoom","t":4,"rt":$n[1].Vector2,"sn":"maxRoom"},{"a":2,"n":"minRoom","t":4,"rt":$n[1].Vector2,"sn":"minRoom"},{"a":2,"n":"movePad","t":4,"rt":$n[0].RoomMovePad,"sn":"movePad"},{"a":2,"n":"pitch","t":4,"rt":$n[2].Single,"sn":"pitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"playerCamera","t":4,"rt":$n[1].Camera,"sn":"playerCamera"},{"a":2,"n":"reticle","t":4,"rt":$n[4].Image,"sn":"reticle"},{"a":2,"n":"spawnPosition","t":4,"rt":$n[1].Vector3,"sn":"spawnPosition"},{"a":2,"n":"walkSpeed","t":4,"rt":$n[2].Single,"sn":"walkSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"yaw","t":4,"rt":$n[2].Single,"sn":"yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CEBB.Playable.FirstPersonRoom end.*/

    /*CEBB.Playable.FurnitureDefinition start.*/
    $m("CEBB.Playable.FurnitureDefinition", function () { return {"att":1048833,"a":2,"at":[Bridge.apply(new UnityEngine.CreateAssetMenuAttribute(), {
        menuName: "CEBB/Furniture"
    } )],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"displayName","t":4,"rt":$n[2].String,"sn":"displayName"},{"a":2,"n":"furnitureId","t":4,"rt":$n[2].String,"sn":"furnitureId"},{"a":2,"n":"icon","t":4,"rt":$n[1].Sprite,"sn":"icon"},{"a":2,"n":"prefab","t":4,"rt":$n[1].GameObject,"sn":"prefab"},{"at":[new UnityEngine.TooltipAttribute("Built rugs remain triggers so the player can walk across them.")],"a":2,"n":"walkableSurface","t":4,"rt":$n[2].Boolean,"sn":"walkableSurface","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CEBB.Playable.FurnitureDefinition end.*/

    /*CEBB.Playable.FurnitureTarget start.*/
    $m("CEBB.Playable.FurnitureTarget", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"owner","t":4,"rt":$n[0].BedroomPlayable,"sn":"owner"},{"a":2,"n":"slotIndex","t":4,"rt":$n[2].Int32,"sn":"slotIndex","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*CEBB.Playable.FurnitureTarget end.*/

    /*CEBB.Playable.LunaTextOutline start.*/
    $m("CEBB.Playable.LunaTextOutline", function () { return {"att":1048833,"a":2,"at":[new UnityEngine.ExecuteAlwaysAttribute(),new UnityEngine.DefaultExecutionOrder(200)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[2].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[2].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[2].Void},{"a":2,"n":"Refresh","t":8,"sn":"Refresh","rt":$n[2].Void},{"a":1,"n":"Sync","t":8,"sn":"Sync","rt":$n[2].Void},{"a":2,"n":"borders","t":4,"rt":System.Array.type(UnityEngine.UI.Text),"sn":"borders"},{"a":2,"n":"effectColor","t":4,"rt":$n[1].Color,"sn":"effectColor"},{"a":2,"n":"effectDistance","t":4,"rt":$n[1].Vector2,"sn":"effectDistance"},{"a":2,"n":"source","t":4,"rt":$n[4].Text,"sn":"source"},{"a":2,"n":"useGraphicAlpha","t":4,"rt":$n[2].Boolean,"sn":"useGraphicAlpha","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CEBB.Playable.LunaTextOutline end.*/

    /*CEBB.Playable.RoomLookSurface start.*/
    $m("CEBB.Playable.RoomLookSurface", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[2].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":1,"n":"downTime","t":4,"rt":$n[2].Single,"sn":"downTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"dragged","t":4,"rt":$n[2].Boolean,"sn":"dragged","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"player","t":4,"rt":$n[0].FirstPersonRoom,"sn":"player"},{"a":1,"n":"pointer","t":4,"rt":$n[2].Int32,"sn":"pointer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"start","t":4,"rt":$n[1].Vector2,"sn":"start"}]}; }, $n);
    /*CEBB.Playable.RoomLookSurface end.*/

    /*CEBB.Playable.RoomMovePad start.*/
    $m("CEBB.Playable.RoomMovePad", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[2].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[2].Void},{"a":2,"n":"OnDrag","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnDrag","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnInitializePotentialDrag","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnInitializePotentialDrag","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnPointerDown","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnPointerDown","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":2,"n":"OnPointerUp","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"OnPointerUp","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":1,"n":"SetThumb","t":8,"pi":[{"n":"offset","pt":$n[1].Vector2,"ps":0}],"sn":"SetThumb","rt":$n[2].Void,"p":[$n[1].Vector2]},{"a":1,"n":"Track","t":8,"pi":[{"n":"e","pt":$n[3].PointerEventData,"ps":0}],"sn":"Track","rt":$n[2].Void,"p":[$n[3].PointerEventData]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"Pressed","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_Pressed","t":8,"rt":$n[2].Boolean,"fg":"Pressed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Pressed"},{"a":1,"n":"Radius","t":16,"rt":$n[2].Single,"g":{"a":1,"n":"get_Radius","t":8,"rt":$n[2].Single,"fg":"Radius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Radius"},{"a":2,"n":"Value","t":16,"rt":$n[1].Vector2,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[1].Vector2,"fg":"Value"},"s":{"a":1,"n":"set_Value","t":8,"p":[$n[1].Vector2],"rt":$n[2].Void,"fs":"Value"},"fn":"Value"},{"at":[new UnityEngine.TooltipAttribute("Move tutorial: the thumb is pulled up, then released, in a loop until the player moves.")],"a":2,"n":"demo","t":4,"rt":$n[2].Boolean,"sn":"demo","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"demoCycleSeconds","t":4,"rt":$n[2].Single,"sn":"demoCycleSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.RangeAttribute(0.1, 1.0)],"a":2,"n":"demoPull","t":4,"rt":$n[2].Single,"sn":"demoPull","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"padRect","t":4,"rt":$n[1].RectTransform,"sn":"padRect"},{"a":1,"n":"pointer","t":4,"rt":$n[2].Int32,"sn":"pointer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.Serialization.FormerlySerializedAsAttribute("handle")],"a":2,"n":"thumbRect","t":4,"rt":$n[1].RectTransform,"sn":"thumbRect"},{"a":1,"backing":true,"n":"<Value>k__BackingField","t":4,"rt":$n[1].Vector2,"sn":"Value"}]}; }, $n);
    /*CEBB.Playable.RoomMovePad end.*/

    /*CEBB.Playable.SakuraEndCardMotion start.*/
    $m("CEBB.Playable.SakuraEndCardMotion", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Animate","t":8,"sn":"Animate","rt":$n[2].Void},{"a":2,"n":"HideGameplayUI","t":8,"sn":"HideGameplayUI","rt":$n[2].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[2].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[2].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":1,"n":"elapsed","t":4,"rt":$n[2].Single,"sn":"elapsed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"gameplayUI","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"gameplayUI"},{"a":2,"n":"playButton","t":4,"rt":$n[1].RectTransform,"sn":"playButton"},{"a":2,"n":"pulseScale","t":4,"rt":$n[2].Single,"sn":"pulseScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"pulseSeconds","t":4,"rt":$n[2].Single,"sn":"pulseSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"shine","t":4,"rt":$n[1].RectTransform,"sn":"shine"},{"a":2,"n":"shineImage","t":4,"rt":$n[4].Image,"sn":"shineImage"},{"a":2,"n":"shineInterval","t":4,"rt":$n[2].Single,"sn":"shineInterval","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"shineSeconds","t":4,"rt":$n[2].Single,"sn":"shineSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CEBB.Playable.SakuraEndCardMotion end.*/

    }});
