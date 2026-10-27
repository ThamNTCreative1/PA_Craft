if ( TRACE ) { TRACE( JSON.parse( '["AdjacentBlockPreviews#VisibleCount#get","AdjacentBlockPreviews#init","AdjacentBlockPreviews#ShowAdjacent","AdjacentBlockPreviews#Clear","AdjacentBlockPreviews#RemovePreview","AdjacentBlockPreviews#CreatePreview","AdjacentBlockPreviews#CopyVisuals","AdjacentBlockPreviews#MakeTransparentMaterial","AdjacentBlockPreviews#OnDestroy","AudioController#init","AudioController#PlayBlockPlaced","BlockPlacementEffect#init","BlockPlacementEffect#init","BlockPlacementEffect#Play","BlockPlacementEffect#Update","BlockPlacementEffect#Cleanup","BlockPlacementEffect#OnDisable","BlockPlacementEffect#OnDestroy","BuildBlock#init","BuildBlock#WorldPosition","BuildBlock#IsFaceNeighbourOf","BuildBlockPlacer#init","BuildBlockPlacer#Initialize","BuildBlockPlacer#Place","BuildBlockPlacer#GetMaterial","BuildBlockPlacer#GetTexturedMaterial","BuildBlockPlacer#OnDestroy","BuildCameraController#init","BuildCameraController#Initialize","BuildCameraController#Update","BuildCameraController#HandleKeyboardMovement","BuildCameraController#ApplyCameraPosition","BuildCameraController#UpdatePlayerVisual","BuildCameraController#HandlePointer","BuildCameraController#BeginPointer","BuildCameraController#MovePointer","BuildCameraController#EndPointer","BuildCameraController#TurnTo","BuildCameraController#ReadCameraAngles","BuildCollisionWorld#Count#get","BuildCollisionWorld#init","BuildCollisionWorld#Awake","BuildCollisionWorld#InitializeWorld","BuildCollisionWorld#OnDestroy","BuildCollisionWorld#Register","BuildCollisionWorld#GetBox","BuildCollisionWorld#Cast","BuildCollisionWorld#ResolveOverlap","BuildCollisionWorld.Hit#getDefaultValue","BuildCollisionWorld.Hit#init","BuildCollisionWorld.Hit#ctor","BuildCollisionWorld.Hit#getHashCode","BuildCollisionWorld.Hit#equals","BuildCollisionWorld.Hit#$clone","BuildCompleteFireworks#init","BuildCompleteFireworks#PlaySound","BuildCompleteFireworks#StopSounds","BuildCompleteFireworks#IsPlaying#get","BuildCompleteFireworks#init","BuildCompleteFireworks#PlayOnce","BuildCompleteFireworks#Update","BuildCompleteFireworks#Draw","BuildCompleteFireworks#Quad","BuildCompleteFireworks#PlaySounds","BuildCompleteFireworks#OnDisable","BuildCompleteFireworks#OnDestroy","BuildGuide#MatchesType","BuildGuide#MakeFaceMaterial","BuildGuide#CreateDashedFrameMesh","BuildGuide#AppendBox","BuildGuide#Visible#get","BuildGuide#TargetPosition#get","BuildGuide#init","BuildGuide#Initialize","BuildGuide#TryGetBlockUnderPointer","BuildGuide#Hide","BuildGuide#ShowBest","BuildGuide#OnDestroy","BuildingPart#init","BuildPlayerMotor#init","BuildPlayerMotor#init","BuildPlayerMotor#Stop","BuildPlayerMotor#Move","BuildPlayerMotor#ShouldAutoJump","BuildPlayerMotor#Raycast","BuildPlayerMotor#Cast","BuildPlayerMotor#Sweep","BuildPlayerVisual#PlayBuild","BuildPlayerVisual#Synchronize","BuildProgressUI#Matches","BuildProgressUI#init","BuildProgressUI#Initialize","BuildProgressUI#Update","BuildProgressUI#Refresh","BuildProgressUI#BeginPointer","BuildProgressUI#EndPointer","BuildTapTutorial#init","BuildTapTutorial#OnEnable","BuildTapTutorial#OnGuideClicked","BuildTapTutorial#LateUpdate","BuildTapTutorial#SetVisible","BuildTapTutorial#OnDisable","BuildTouchControls#Vertical#get","BuildTouchControls#init","BuildTouchControls#Initialize","BuildTouchControls#Update","BuildTouchControls#Begin","BuildTouchControls#Move","BuildTouchControls#End","BuildTouchControls#SetFlight","BuildTouchControls#ResetInput","BuildTouchControls#AcknowledgeLanding","CraftHudStyle#SafeArea#get","CraftHudStyle#Hit","CraftRain#init","CraftRain#Create","CraftRain#init","CraftRain#Initialize","CraftRain#Random01","CraftRain#ResetDrop","CraftRain#LateUpdate","CraftRain#Quad","CraftRain#OnDestroy","GameController#BuiltBlocks#get","GameController#TotalBlocks#get","GameController#CurrentPartIndex#get","GameController#CurrentBlockIndex#get","GameController#PartCount#get","GameController#CurrentPartName#get","GameController#IsComplete#get","GameController#init","GameController#GetPart","GameController#TryGetGuidePosition","GameController#Start","GameController#LateUpdate","GameController#HandleGuideClicked","GameController#TurnAndBuild","GameController#SelectGuide","GameController#SelectBlockTypes","GameController#HasUnbuiltType","GameController#FocusSelectedGuide","GameController#OnDestroy","GameplayMaterials#Create","GameplayMaterials#CreateGuideOverlay","GameplayMaterials#ConfigureTransparency","GameplayMaterials#Initialize","GameplayMaterials#OnDestroy","LunaController#init","LunaController#Awake","LunaController#OnEnable","LunaController#Start","LunaController#CountTimePlay","LunaController#StopTimePlay","LunaController#OnGuideBuild","LunaController#OnCountedClick","LunaController#ShowEndCard","LunaController#ClickCTA","LunaController#OnDisable","LunaController#OnDestroy","PointLightReflectionExclusion#OnEnable","PointLightReflectionExclusion#OnDisable","ReferenceHouseBlueprint#init","ReferenceHouseBlueprint#Create","ReferenceHouseBlueprint#PieceBounds","SampleBlockVisuals#init","SampleBlockVisuals#GetLocalBounds","SampleBlockVisuals#Create","SampleBlockVisuals#LoadCarpet","SampleBlockVisuals#LoadBasin","SampleBlockVisuals#LoadCherry","SampleBuildingBlueprint#Create","SampleBuildingBlueprint#CreateGround","SampleBuildingBlueprint#Part","SampleBuildingBlueprint#Add","WetGroundReflection#init","WetGroundReflection#RefreshLightList","WetGroundReflection#Include","WetGroundReflection#Exclude","WetGroundReflection#init","WetGroundReflection#LateUpdate","WetGroundReflection#Capture","WetGroundReflection#UpdateView","WetGroundReflection#OnDisable"]' ) ); }
/**
 * @version 1.0.9795.18955
 * @copyright anton
 * @compiler Bridge.NET 17.9.42-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*AdjacentBlockPreviews start.*/
    /**
     * Revealed neighbours stay visible until their blocks are built.
     *
     * @public
     * @class AdjacentBlockPreviews
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("AdjacentBlockPreviews", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            opacity: 0,
            previews: null,
            previewMaterials: null
        },
        props: {
            VisibleCount: {
                get: function () {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#VisibleCount#get", this ); }

                    return this.previews.Count;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#init", this ); }

                this.opacity = 0.38;
                this.previews = new (System.Collections.Generic.Dictionary$2(BuildBlock,AdjacentBlockPreviews.PreviewEntry)).ctor();
                this.previewMaterials = new (System.Collections.Generic.List$1(UnityEngine.Material)).ctor();
            }
        },
        methods: {
            /*AdjacentBlockPreviews.ShowAdjacent start.*/
            ShowAdjacent: function (parts, placedBlock, origin) {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#ShowAdjacent", this ); }

                var $t, $t1, $t2;
                this.RemovePreview(placedBlock);
                $t = Bridge.getEnumerator(parts, BuildingPart);
                try {
                    while ($t.moveNext()) {
                        var part = $t.Current;
                        $t1 = Bridge.getEnumerator(part.blocks);
                        try {
                            while ($t1.moveNext()) {
                                var block = $t1.Current;
                                if (block.built) {
                                    this.RemovePreview(block);
                                    continue;
                                }
                                if (this.previews.containsKey(block) || !block.IsFaceNeighbourOf(placedBlock)) {
                                    continue;
                                }
                                var materialStart = this.previewMaterials.Count;
                                var preview = this.CreatePreview(block, origin);
                                preview.name = System.String.format("Preview - {0} - {1}", part.name, block.type);
                                this.previews.add(block, ($t2 = new AdjacentBlockPreviews.PreviewEntry(), $t2.visual = preview, $t2.materials = this.previewMaterials.GetRange(materialStart, ((this.previewMaterials.Count - materialStart) | 0)), $t2));
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
            /*AdjacentBlockPreviews.ShowAdjacent end.*/

            /*AdjacentBlockPreviews.Clear start.*/
            Clear: function () {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#Clear", this ); }

                var $t, $t1;
                $t = Bridge.getEnumerator(this.previews.Values);
                try {
                    while ($t.moveNext()) {
                        var entry = $t.Current;
                        var preview = entry.visual;
                        if (UnityEngine.GameObject.op_Equality(preview, null)) {
                            continue;
                        }
                        preview.SetActive(false);
                        UnityEngine.MonoBehaviour.Destroy(preview);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.previews.clear();
                $t1 = Bridge.getEnumerator(this.previewMaterials);
                try {
                    while ($t1.moveNext()) {
                        var material = $t1.Current;
                        if (material != null) {
                            UnityEngine.Object.Destroy(material);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                this.previewMaterials.clear();
            },
            /*AdjacentBlockPreviews.Clear end.*/

            /*AdjacentBlockPreviews.RemovePreview start.*/
            RemovePreview: function (block) {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#RemovePreview", this ); }

                var $t;
                var entry = { };
                if (!this.previews.tryGetValue(block, entry)) {
                    return;
                }
                if (UnityEngine.GameObject.op_Inequality(entry.v.visual, null)) {
                    entry.v.visual.SetActive(false);
                    UnityEngine.MonoBehaviour.Destroy(entry.v.visual);
                }
                $t = Bridge.getEnumerator(entry.v.materials);
                try {
                    while ($t.moveNext()) {
                        var material = $t.Current;
                        this.previewMaterials.remove(material);
                        if (material != null) {
                            UnityEngine.Object.Destroy(material);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.previews.remove(block);
            },
            /*AdjacentBlockPreviews.RemovePreview end.*/

            /*AdjacentBlockPreviews.CreatePreview start.*/
            CreatePreview: function (block, origin) {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#CreatePreview", this ); }

                if (!System.String.isNullOrEmpty(block.visualStyle)) {
                    var styled = SampleBlockVisuals.Create(block, true, this.previewMaterials, null, this.opacity);
                    styled.transform.SetParent(this.transform);
                    styled.transform.position = block.WorldPosition(origin);
                    styled.transform.rotation = UnityEngine.Component.op_Inequality(origin, null) ? origin.rotation.$clone() : pc.Quat.IDENTITY.clone();
                    return styled;
                }
                var root = new UnityEngine.GameObject.$ctor2("Block Preview");
                root.transform.SetParent(this.transform);
                root.transform.position = block.WorldPosition(origin);
                root.transform.rotation = (UnityEngine.Component.op_Inequality(origin, null) ? origin.rotation.$clone() : pc.Quat.IDENTITY.clone()).clone().mul( block.localRotation );

                var hasPrefabVisual = false;
                if (UnityEngine.GameObject.op_Inequality(block.prefab, null)) {
                    root.transform.localScale = block.prefab.transform.localScale.$clone();
                    if (UnityEngine.Component.op_Inequality(origin, null)) {
                        root.transform.localScale = new pc.Vec3().mul2( root.transform.localScale, origin.lossyScale );
                    }
                    hasPrefabVisual = this.CopyVisuals(block.prefab.transform, root.transform, block.color);
                }
                if (!hasPrefabVisual) {
                    var cube = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
                    cube.name = "Block Shape";
                    cube.transform.SetParent(root.transform, false);
                    cube.GetComponent(UnityEngine.Collider).enabled = false;
                    cube.GetComponent(UnityEngine.Renderer).sharedMaterial = this.MakeTransparentMaterial(null, block.color.$clone());
                }
                return root;
            },
            /*AdjacentBlockPreviews.CreatePreview end.*/

            /*AdjacentBlockPreviews.CopyVisuals start.*/
            CopyVisuals: function (source, destination, fallbackColor) {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#CopyVisuals", this ); }

                var $t;
                var copied = false;
                var sourceMesh = source.GetComponent(UnityEngine.MeshFilter);
                var sourceRenderer = source.GetComponent(UnityEngine.MeshRenderer);
                if (UnityEngine.Component.op_Inequality(sourceMesh, null) && UnityEngine.Component.op_Inequality(sourceRenderer, null) && sourceMesh.sharedMesh != null) {
                    destination.gameObject.AddComponent(UnityEngine.MeshFilter).sharedMesh = sourceMesh.sharedMesh;
                    var targetRenderer = destination.gameObject.AddComponent(UnityEngine.MeshRenderer);
                    var originals = sourceRenderer.sharedMaterials;
                    var transparent = System.Array.init(originals.length, null, UnityEngine.Material);
                    for (var i = 0; i < originals.length; i = (i + 1) | 0) {
                        transparent[i] = this.MakeTransparentMaterial(originals[i], fallbackColor.$clone());
                    }
                    targetRenderer.sharedMaterials = transparent;
                    copied = true;
                }

                $t = Bridge.getEnumerator(source);
                try {
                    while ($t.moveNext()) {
                        var sourceChild = Bridge.cast($t.Current, UnityEngine.Transform);
                        var child = new UnityEngine.GameObject.$ctor2(sourceChild.name);
                        child.transform.SetParent(destination, false);
                        child.transform.localPosition = sourceChild.localPosition.$clone();
                        child.transform.localRotation = sourceChild.localRotation.$clone();
                        child.transform.localScale = sourceChild.localScale.$clone();
                        copied = !!(copied | this.CopyVisuals(sourceChild, child.transform, fallbackColor));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return copied;
            },
            /*AdjacentBlockPreviews.CopyVisuals end.*/

            /*AdjacentBlockPreviews.MakeTransparentMaterial start.*/
            MakeTransparentMaterial: function (source, fallbackColor) {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#MakeTransparentMaterial", this ); }

                var material = GameplayMaterials.Create(true, false);
                material.name = "Transparent Block Preview";
                material.SetFloat$1("_Mode", 2.0);
                material.SetInt$1("_SrcBlend", UnityEngine.Rendering.BlendMode.SrcAlpha);
                material.SetInt$1("_DstBlend", UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                material.SetInt$1("_ZWrite", 0);
                material.DisableKeyword("_ALPHATEST_ON");
                material.EnableKeyword("_ALPHABLEND_ON");
                material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                material.renderQueue = UnityEngine.Rendering.RenderQueue.Transparent;
                var color = source != null && (source.HasProperty$1("_BaseColor") || source.HasProperty$1("_Color")) ? source.color.$clone() : fallbackColor.$clone();
                color.a = this.opacity;
                material.color = color.$clone();
                if (source != null && source.mainTexture != null) {
                    material.mainTexture = source.mainTexture;
                    material.mainTextureScale = source.mainTextureScale.$clone();
                    material.mainTextureOffset = source.mainTextureOffset.$clone();
                }
                this.previewMaterials.add(material);
                GameplayMaterials.ConfigureTransparency(material);
                return material;
            },
            /*AdjacentBlockPreviews.MakeTransparentMaterial end.*/

            /*AdjacentBlockPreviews.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "AdjacentBlockPreviews#OnDestroy", this ); }

                this.Clear();
            },
            /*AdjacentBlockPreviews.OnDestroy end.*/


        }
    });
    /*AdjacentBlockPreviews end.*/

    /*AdjacentBlockPreviews+PreviewEntry start.*/
    Bridge.define("AdjacentBlockPreviews.PreviewEntry", {
        $kind: 1002,
        fields: {
            visual: null,
            materials: null
        }
    });
    /*AdjacentBlockPreviews+PreviewEntry end.*/

    /*AudioController start.*/
    Bridge.define("AudioController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            placementSource: null,
            placementClip: null,
            placementVolume: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "AudioController#init", this ); }

                this.placementVolume = 0.85;
            }
        },
        methods: {
            /*AudioController.PlayBlockPlaced start.*/
            PlayBlockPlaced: function () {
if ( TRACE ) { TRACE( "AudioController#PlayBlockPlaced", this ); }

                if (UnityEngine.Component.op_Equality(this.placementSource, null) || this.placementClip == null) {
                    return;
                }
                this.placementSource.clip = this.placementClip;
                this.placementSource.volume = this.placementVolume;
                this.placementSource.Play();
            },
            /*AudioController.PlayBlockPlaced end.*/


        }
    });
    /*AudioController end.*/

    /*BlockPlacementEffect start.*/
    /**
     * Short scale pop and white overlay without modifying prefab materials.
     *
     * @public
     * @class BlockPlacementEffect
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BlockPlacementEffect", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                Duration: 0
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "BlockPlacementEffect#init", this ); }

                    this.Duration = 0.24;
                }
            }
        },
        fields: {
            overlays: null,
            finalScale: null,
            flash: null,
            elapsed: 0,
            running: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BlockPlacementEffect#init", this ); }

                this.finalScale = new UnityEngine.Vector3();
                this.overlays = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
            }
        },
        methods: {
            /*BlockPlacementEffect.Play start.*/
            Play: function (template) {
if ( TRACE ) { TRACE( "BlockPlacementEffect#Play", this ); }

                var $t;
                this.finalScale = this.transform.localScale.$clone();
                if (template != null) {
                    this.flash = new UnityEngine.Material.$ctor1(template);
                    var filters = this.GetComponentsInChildren(UnityEngine.MeshFilter);
                    $t = Bridge.getEnumerator(filters);
                    try {
                        while ($t.moveNext()) {
                            var filter = $t.Current;
                            var source = filter.GetComponent(UnityEngine.MeshRenderer);
                            if (UnityEngine.Component.op_Equality(source, null) || !source.enabled || filter.sharedMesh == null) {
                                continue;
                            }
                            var overlay = new UnityEngine.GameObject.$ctor2("Placement flash");
                            overlay.layer = filter.gameObject.layer;
                            overlay.transform.SetParent(filter.transform, false);
                            overlay.AddComponent(UnityEngine.MeshFilter).sharedMesh = filter.sharedMesh;
                            var renderer = overlay.AddComponent(UnityEngine.MeshRenderer);
                            var materials = System.Array.init(filter.sharedMesh.subMeshCount, null, UnityEngine.Material);
                            for (var i = 0; i < materials.length; i = (i + 1) | 0) {
                                materials[i] = this.flash;
                            }
                            renderer.sharedMaterials = materials;
                            renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                            renderer.receiveShadows = false;
                            this.overlays.add(overlay);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
                this.elapsed = 0;
                this.running = true;
                this.transform.localScale = this.finalScale.$clone().clone().scale( 0.8 );
            },
            /*BlockPlacementEffect.Play end.*/

            /*BlockPlacementEffect.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BlockPlacementEffect#Update", this ); }

                if (!this.running) {
                    return;
                }
                this.elapsed += UnityEngine.Time.deltaTime;
                var t = Math.max(0, Math.min(1, this.elapsed / BlockPlacementEffect.Duration));
                // Quick arrival, a restrained overshoot, then settle at exact authored scale.
                var scale = t < 0.55 ? pc.math.lerp(0.8, 1.045, pc.math.smoothstep(0, 1, t / 0.55)) : pc.math.lerp(1.045, 1, pc.math.smoothstep(0, 1, (t - 0.55) / 0.45));
                this.transform.localScale = this.finalScale.$clone().clone().scale( scale );
                if (this.flash != null) {
                    this.flash.color = new pc.Color( 1, 1, 1, 1 - pc.math.smoothstep(0, 1, t) );
                }
                if (t >= 1) {
                    this.Cleanup();
                    UnityEngine.Object.Destroy(this);
                }
            },
            /*BlockPlacementEffect.Update end.*/

            /*BlockPlacementEffect.Cleanup start.*/
            Cleanup: function () {
if ( TRACE ) { TRACE( "BlockPlacementEffect#Cleanup", this ); }

                var $t;
                if (!this.running) {
                    return;
                }
                this.running = false;
                this.transform.localScale = this.finalScale.$clone();
                $t = Bridge.getEnumerator(this.overlays);
                try {
                    while ($t.moveNext()) {
                        var overlay = $t.Current;
                        if (UnityEngine.GameObject.op_Inequality(overlay, null)) {
                            overlay.SetActive(false);
                            UnityEngine.MonoBehaviour.Destroy(overlay);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.overlays.clear();
                if (this.flash != null) {
                    UnityEngine.Object.Destroy(this.flash);
                    this.flash = null;
                }
            },
            /*BlockPlacementEffect.Cleanup end.*/

            /*BlockPlacementEffect.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "BlockPlacementEffect#OnDisable", this ); }

                this.Cleanup();
            },
            /*BlockPlacementEffect.OnDisable end.*/

            /*BlockPlacementEffect.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "BlockPlacementEffect#OnDestroy", this ); }

                this.Cleanup();
            },
            /*BlockPlacementEffect.OnDestroy end.*/


        }
    });
    /*BlockPlacementEffect end.*/

    /*BuildBlock start.*/
    Bridge.define("BuildBlock", {
        fields: {
            type: null,
            localPosition: null,
            prefab: null,
            localRotation: null,
            hasCustomBounds: false,
            customBounds: null,
            visualStyle: null,
            replacementKey: null,
            color: null,
            built: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildBlock#init", this ); }

                this.localPosition = new UnityEngine.Vector3();
                this.localRotation = new UnityEngine.Quaternion();
                this.customBounds = new UnityEngine.Bounds();
                this.color = new UnityEngine.Color();
                this.type = "Wood";
                this.localRotation = pc.Quat.IDENTITY.clone();
                this.color = new pc.Color( 1, 1, 1, 1 );
            }
        },
        methods: {
            /*BuildBlock.WorldPosition start.*/
            WorldPosition: function (origin) {
if ( TRACE ) { TRACE( "BuildBlock#WorldPosition", this ); }

                return UnityEngine.Component.op_Inequality(origin, null) ? origin.TransformPoint$1(this.localPosition) : this.localPosition.$clone();
            },
            /*BuildBlock.WorldPosition end.*/

            /*BuildBlock.IsFaceNeighbourOf start.*/
            IsFaceNeighbourOf: function (other) {
if ( TRACE ) { TRACE( "BuildBlock#IsFaceNeighbourOf", this ); }

                var delta = this.localPosition.$clone().sub( other.localPosition );
                var tolerance = 0.01;
                var unitAxes = 0;
                for (var axis = 0; axis < 3; axis = (axis + 1) | 0) {
                    var distance = Math.abs(delta.getitem(axis));
                    if (Math.abs(distance - 1.0) < tolerance) {
                        unitAxes = (unitAxes + 1) | 0;
                    } else {
                        if (distance >= tolerance) {
                            return false;
                        }
                    }
                }
                return unitAxes === 1;
            },
            /*BuildBlock.IsFaceNeighbourOf end.*/


        }
    });
    /*BuildBlock end.*/

    /*BuildBlockPlacer start.*/
    /**
     * Creates completed blocks and shares their materials.
     *
     * @public
     * @class BuildBlockPlacer
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildBlockPlacer", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            placementFlash: null,
            placedRoot: null,
            replacedBlocks: null,
            blockMaterials: null,
            texturedMaterials: null,
            generatedMaterials: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildBlockPlacer#init", this ); }

                this.replacedBlocks = new (System.Collections.Generic.Dictionary$2(System.String,UnityEngine.GameObject)).ctor();
                this.blockMaterials = new (System.Collections.Generic.Dictionary$2(UnityEngine.Color,UnityEngine.Material)).ctor();
                this.texturedMaterials = new (System.Collections.Generic.Dictionary$2(UnityEngine.Texture,UnityEngine.Material)).ctor();
                this.generatedMaterials = new (System.Collections.Generic.List$1(UnityEngine.Material)).ctor();
            }
        },
        methods: {
            /*BuildBlockPlacer.Initialize start.*/
            Initialize: function () {
if ( TRACE ) { TRACE( "BuildBlockPlacer#Initialize", this ); }

                if (UnityEngine.GameObject.op_Equality(this.placedRoot, null)) {
                    this.placedRoot = new UnityEngine.GameObject.$ctor2("Placed Blocks");
                }
            },
            /*BuildBlockPlacer.Initialize end.*/

            /*BuildBlockPlacer.Place start.*/
            Place: function (block, origin, partName) {
if ( TRACE ) { TRACE( "BuildBlockPlacer#Place", this ); }

                var $t, $t1;
                var previous = { };
                if (!System.String.isNullOrEmpty(block.replacementKey) && this.replacedBlocks.tryGetValue(block.replacementKey, previous) && UnityEngine.GameObject.op_Inequality(previous.v, null)) {
                    previous.v.SetActive(false);
                    UnityEngine.MonoBehaviour.Destroy(previous.v);
                }
                var placed;
                if (!System.String.isNullOrEmpty(block.visualStyle)) {
                    placed = SampleBlockVisuals.Create(block, false, this.generatedMaterials, Bridge.fn.cacheBind(this, this.GetTexturedMaterial));
                    placed.transform.SetParent(this.placedRoot.transform);
                    placed.transform.position = block.WorldPosition(origin);
                    placed.transform.rotation = UnityEngine.Component.op_Inequality(origin, null) ? origin.rotation.$clone() : pc.Quat.IDENTITY.clone();
                } else if (UnityEngine.GameObject.op_Inequality(block.prefab, null)) {
                    placed = UnityEngine.Object.Instantiate$3(UnityEngine.GameObject, block.prefab, block.WorldPosition(origin), (UnityEngine.Component.op_Inequality(origin, null) ? origin.rotation.$clone() : pc.Quat.IDENTITY.clone()).clone().mul( block.localRotation ), this.placedRoot.transform);
                } else {
                    placed = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
                    placed.transform.SetParent(this.placedRoot.transform);
                    placed.transform.position = block.WorldPosition(origin);
                    placed.GetComponent(UnityEngine.Renderer).sharedMaterial = this.GetMaterial(block.color);
                }
                placed.name = System.String.format("{0} - {1}", partName, block.type);
                if (UnityEngine.Component.op_Inequality(origin, null)) {
                    placed.transform.localScale = new pc.Vec3().mul2( placed.transform.localScale, origin.lossyScale );
                }
                var colliders = placed.GetComponentsInChildren(UnityEngine.Collider);
                $t = Bridge.getEnumerator(colliders);
                try {
                    while ($t.moveNext()) {
                        var collider = $t.Current;
                        collider.enabled = true;
                        collider.isTrigger = false;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (colliders.length === 0) {
                    $t1 = Bridge.getEnumerator(placed.GetComponentsInChildren(UnityEngine.MeshFilter));
                    try {
                        while ($t1.moveNext()) {
                            var filter = $t1.Current;
                            if (filter.sharedMesh != null) {
                                var box = filter.gameObject.AddComponent(UnityEngine.BoxCollider);
                                box.center = filter.sharedMesh.bounds.center.$clone();
                                box.size = filter.sharedMesh.bounds.halfExtents.$clone().scale( 2 ).$clone();
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                }
                if (Bridge.referenceEquals(partName, "Foundation") || Bridge.referenceEquals(partName, "Glowing foundation")) {
                    WetGroundReflection.Exclude(placed);
                } else {
                    WetGroundReflection.Include(placed);
                }
                if (!System.String.isNullOrEmpty(block.replacementKey)) {
                    this.replacedBlocks.setItem(block.replacementKey, placed);
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(BuildCollisionWorld.Active, null)) {
                    BuildCollisionWorld.Active.Register(placed);
                }
                placed.AddComponent(BlockPlacementEffect).Play(this.placementFlash);
            },
            /*BuildBlockPlacer.Place end.*/

            /*BuildBlockPlacer.GetMaterial start.*/
            GetMaterial: function (color) {
if ( TRACE ) { TRACE( "BuildBlockPlacer#GetMaterial", this ); }

                var material = { };
                if (this.blockMaterials.tryGetValue(color.$clone(), material)) {
                    return material.v;
                }
                material.v = GameplayMaterials.Create();
                material.v.color = color.$clone();
                this.blockMaterials.add(color.$clone(), material.v);
                return material.v;
            },
            /*BuildBlockPlacer.GetMaterial end.*/

            /*BuildBlockPlacer.GetTexturedMaterial start.*/
            GetTexturedMaterial: function (color, texture) {
if ( TRACE ) { TRACE( "BuildBlockPlacer#GetTexturedMaterial", this ); }

                if (texture == null) {
                    return this.GetMaterial(color);
                }
                var material = { };
                if (this.texturedMaterials.tryGetValue(texture, material)) {
                    return material.v;
                }
                material.v = GameplayMaterials.Create();
                material.v.name = (texture.name || "") + " Block Material";
                material.v.color = new pc.Color( 1, 1, 1, 1 );
                material.v.mainTexture = texture;
                this.texturedMaterials.add(texture, material.v);
                return material.v;
            },
            /*BuildBlockPlacer.GetTexturedMaterial end.*/

            /*BuildBlockPlacer.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "BuildBlockPlacer#OnDestroy", this ); }

                var $t, $t1, $t2;
                $t = Bridge.getEnumerator(this.blockMaterials.Values);
                try {
                    while ($t.moveNext()) {
                        var material = $t.Current;
                        if (material != null) {
                            UnityEngine.Object.Destroy(material);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                $t1 = Bridge.getEnumerator(this.texturedMaterials.Values);
                try {
                    while ($t1.moveNext()) {
                        var material1 = $t1.Current;
                        if (material1 != null) {
                            UnityEngine.Object.Destroy(material1);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                $t2 = Bridge.getEnumerator(this.generatedMaterials);
                try {
                    while ($t2.moveNext()) {
                        var material2 = $t2.Current;
                        if (material2 != null) {
                            UnityEngine.Object.Destroy(material2);
                        }
                    }
                } finally {
                    if (Bridge.is($t2, System.IDisposable)) {
                        $t2.System$IDisposable$Dispose();
                    }
                }
            },
            /*BuildBlockPlacer.OnDestroy end.*/


        }
    });
    /*BuildBlockPlacer end.*/

    /*BuildCameraController start.*/
    /**
     * Mouse/touch look and movement; reports clicks on the build guide.
     *
     * @public
     * @class BuildCameraController
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildCameraController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            lookSensitivity: 0,
            playerMotor: null,
            turnToBlockSeconds: 0,
            tapMovementLimit: 0,
            collisionRadius: 0,
            collisionWorld: null,
            playerVisual: null,
            thirdPersonDistance: 0,
            eyePosition: null,
            playerCamera: null,
            guide: null,
            pointerStart: null,
            pointerBlockIndex: 0,
            pointerPartIndex: 0,
            pointerDragged: false,
            yaw: 0,
            pitch: 0,
            controls: null,
            hud: null,
            lookPointer: 0,
            InputEnabled: false
        },
        events: {
            GuideClicked: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildCameraController#init", this ); }

                this.eyePosition = new UnityEngine.Vector3();
                this.pointerStart = new UnityEngine.Vector2();
                this.lookSensitivity = 0.18;
                this.playerMotor = new BuildPlayerMotor();
                this.turnToBlockSeconds = 0.22;
                this.tapMovementLimit = 12.0;
                this.collisionRadius = 0.3;
                this.thirdPersonDistance = 3.5;
                this.pointerBlockIndex = -1;
                this.pointerPartIndex = -1;
                this.lookPointer = -99;
                this.InputEnabled = true;
            }
        },
        methods: {
            /*BuildCameraController.Initialize start.*/
            Initialize: function (camera, buildGuide) {
if ( TRACE ) { TRACE( "BuildCameraController#Initialize", this ); }

                this.playerCamera = camera;
                this.guide = buildGuide;
                this.playerMotor.Stop();
                this.eyePosition = camera.transform.position.$clone();
                if (UnityEngine.MonoBehaviour.op_Equality(this.collisionWorld, null) || !this.collisionWorld.InitializeWorld()) {
                    UnityEngine.Debug.LogError$2("Player movement stopped: saved map collision data is missing. Bake map collision before exporting.", this);
                    this.InputEnabled = false;
                    this.enabled = false;
                    return;
                }
                var ui = this.GetComponent(BuildProgressUI);
                this.hud = ui;
                if (UnityEngine.MonoBehaviour.op_Equality(this.controls, null)) {
                    UnityEngine.Debug.LogError$2("Assign the scene Touch Controls to BuildCameraController.", this);
                    this.enabled = false;
                    return;
                }
                this.controls.Initialize();
                this.ReadCameraAngles();
            },
            /*BuildCameraController.Initialize end.*/

            /*BuildCameraController.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BuildCameraController#Update", this ); }

                if (!this.InputEnabled || UnityEngine.Component.op_Equality(this.playerCamera, null) || UnityEngine.MonoBehaviour.op_Equality(this.guide, null) || (UnityEngine.MonoBehaviour.op_Inequality(LunaController.Active, null) && LunaController.Active.IsCTAActive)) {
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.controls, null)) {
                        this.controls.ResetInput();
                    }
                    this.playerMotor.Stop();
                    this.UpdatePlayerVisual();
                    this.lookPointer = -99;
                    this.pointerBlockIndex = -1;
                    return;
                }
                this.HandlePointer();
                this.HandleKeyboardMovement();
                this.ApplyCameraPosition();
                this.UpdatePlayerVisual();
            },
            /*BuildCameraController.Update end.*/

            /*BuildCameraController.HandleKeyboardMovement start.*/
            HandleKeyboardMovement: function () {
if ( TRACE ) { TRACE( "BuildCameraController#HandleKeyboardMovement", this ); }

                var forward = pc.Vec3.projectOnPlane( this.playerCamera.transform.forward, pc.Vec3.UP.clone() ).clone().normalize().$clone();
                var right = pc.Vec3.projectOnPlane( this.playerCamera.transform.right, pc.Vec3.UP.clone() ).clone().normalize().$clone();
                var move = right.$clone().clone().scale( this.controls.Movement.x ).add( forward.$clone().clone().scale( this.controls.Movement.y ) );
                var vertical = this.controls.Vertical;
                var jump = false;
                this.eyePosition = this.playerMotor.Move(this.eyePosition.$clone(), move.$clone(), Math.max(-1, Math.min(vertical, 1)), this.controls.Flying, jump, this.collisionRadius, UnityEngine.Time.deltaTime);
                this.controls.AcknowledgeLanding();
            },
            /*BuildCameraController.HandleKeyboardMovement end.*/

            /*BuildCameraController.ApplyCameraPosition start.*/
            ApplyCameraPosition: function () {
if ( TRACE ) { TRACE( "BuildCameraController#ApplyCameraPosition", this ); }

                if (UnityEngine.Component.op_Equality(this.playerCamera, null)) {
                    return;
                }
                var position = this.eyePosition.$clone();
                if (UnityEngine.MonoBehaviour.op_Inequality(this.controls, null) && this.controls.ThirdPerson) {
                    var offset = this.playerCamera.transform.forward.$clone().scale( -1 ).clone().scale( this.thirdPersonDistance );
                    var hit = { v : new UnityEngine.RaycastHit() };
                    var radius = UnityEngine.Mathf.Max(0.25, this.playerCamera.nearClipPlane);
                    if (UnityEngine.MonoBehaviour.op_Inequality(BuildCollisionWorld.Active, null)) {
                        var boxHit = { v : new BuildCollisionWorld.Hit() };
                        if (BuildCollisionWorld.Active.Cast(this.eyePosition.$clone(), new pc.Vec3( 1, 1, 1 ).clone().scale( radius ), offset.clone().normalize().$clone(), offset.length(), boxHit)) {
                            offset = offset.clone().normalize().$clone().clone().scale( UnityEngine.Mathf.Max(0, boxHit.v.distance - 0.05) );
                        }
                    } else if (UnityEngine.Physics.SphereCast$2(this.eyePosition, radius, offset.clone().normalize(), hit, offset.length(), UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Ignore)) {
                        offset = offset.clone().normalize().$clone().clone().scale( UnityEngine.Mathf.Max(0, hit.v.distance - 0.05) );
                    }
                    position = position.$clone().add( offset.$clone() );
                }
                this.playerCamera.transform.position = position.$clone();
            },
            /*BuildCameraController.ApplyCameraPosition end.*/

            /*BuildCameraController.UpdatePlayerVisual start.*/
            UpdatePlayerVisual: function () {
if ( TRACE ) { TRACE( "BuildCameraController#UpdatePlayerVisual", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.playerVisual, null) || UnityEngine.Component.op_Equality(this.playerCamera, null) || UnityEngine.MonoBehaviour.op_Equality(this.controls, null)) {
                    return;
                }
                var visible = this.controls.ThirdPerson && pc.Vec3.distance( this.playerCamera.transform.position, this.eyePosition ) > 0.6;
                this.playerVisual.Synchronize(this.eyePosition.$clone().sub( pc.Vec3.UP.clone().clone().scale( this.playerMotor.eyeHeight ) ), this.yaw, this.playerMotor.Velocity, this.playerMotor.Grounded, this.controls.Flying, visible);
            },
            /*BuildCameraController.UpdatePlayerVisual end.*/

            /*BuildCameraController.HandlePointer start.*/
            HandlePointer: function () {
if ( TRACE ) { TRACE( "BuildCameraController#HandlePointer", this ); }

                if (UnityEngine.Input.touchCount > 0) {
                    for (var i = 0; i < UnityEngine.Input.touchCount; i = (i + 1) | 0) {
                        var touch = UnityEngine.Input.GetTouch(i);
                        var id = touch.fingerId;
                        if (touch.phase === UnityEngine.TouchPhase.Began) {
                            if (!(UnityEngine.MonoBehaviour.op_Inequality(this.hud, null) && this.hud.BeginPointer(id, touch.position)) && !this.controls.Begin(id, touch.position) && this.lookPointer === -99) {
                                this.lookPointer = id;
                                this.BeginPointer(touch.position);
                            }
                        } else if (touch.phase === UnityEngine.TouchPhase.Moved) {
                            this.controls.Move(id, touch.position);
                            if (id === this.lookPointer) {
                                this.MovePointer(touch.deltaPosition, touch.position);
                            }
                        } else if (touch.phase === UnityEngine.TouchPhase.Ended || touch.phase === UnityEngine.TouchPhase.Canceled) {
                            this.controls.End(id);
                            if (UnityEngine.MonoBehaviour.op_Inequality(this.hud, null)) {
                                this.hud.EndPointer(id, touch.position, touch.phase === UnityEngine.TouchPhase.Canceled);
                            }
                            if (id === this.lookPointer) {
                                if (touch.phase === UnityEngine.TouchPhase.Ended) {
                                    this.EndPointer(touch.position);
                                } else {
                                    this.pointerBlockIndex = -1;
                                }
                                this.lookPointer = -99;
                            }
                        }
                    }
                    return;
                }
                if (UnityEngine.Input.GetMouseButtonDown(0) && !(UnityEngine.MonoBehaviour.op_Inequality(this.hud, null) && this.hud.BeginPointer(-1, UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition))) && !this.controls.Begin(-1, UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition))) {
                    this.lookPointer = -1;
                    this.BeginPointer(UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition));
                }
                if (UnityEngine.Input.GetMouseButton(0)) {
                    this.controls.Move(-1, UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition));
                }
                if (UnityEngine.Input.GetMouseButton(0) && !UnityEngine.Input.GetMouseButtonDown(0)) {
                    if (this.lookPointer === -1) {
                        this.MovePointer(new pc.Vec2( UnityEngine.Input.GetAxis("Mouse X"), UnityEngine.Input.GetAxis("Mouse Y") ).scale( 14.0 ), UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition));
                    }
                }
                if (UnityEngine.Input.GetMouseButtonUp(0)) {
                    this.controls.End(-1);
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.hud, null)) {
                        this.hud.EndPointer(-1, UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition), false);
                    }
                    if (this.lookPointer === -1) {
                        this.EndPointer(UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition));
                    }
                    this.lookPointer = -99;
                }
            },
            /*BuildCameraController.HandlePointer end.*/

            /*BuildCameraController.BeginPointer start.*/
            BeginPointer: function (position) {
if ( TRACE ) { TRACE( "BuildCameraController#BeginPointer", this ); }

                this.pointerStart = position.$clone();
                this.pointerDragged = false;
                var index = { };
                this.pointerBlockIndex = this.guide.TryGetBlockUnderPointer(this.playerCamera, position, index) ? index.v : -1;
                this.pointerPartIndex = this.guide.SelectedPartIndex;
            },
            /*BuildCameraController.BeginPointer end.*/

            /*BuildCameraController.MovePointer start.*/
            MovePointer: function (delta, position) {
if ( TRACE ) { TRACE( "BuildCameraController#MovePointer", this ); }

                if ((position.$clone().sub( this.pointerStart )).lengthSq() > this.tapMovementLimit * this.tapMovementLimit) {
                    this.pointerDragged = true;
                }
                if (!this.pointerDragged) {
                    return;
                }
                this.pointerBlockIndex = -1;
                this.yaw += delta.x * this.lookSensitivity;
                this.pitch = Math.max(-80.0, Math.min(this.pitch - delta.y * this.lookSensitivity, 80.0));
                this.playerCamera.transform.rotation = new pc.Quat().setFromEulerAngles_Unity( this.pitch, this.yaw, 0.0 );
            },
            /*BuildCameraController.MovePointer end.*/

            /*BuildCameraController.EndPointer start.*/
            EndPointer: function (position) {
if ( TRACE ) { TRACE( "BuildCameraController#EndPointer", this ); }

                var index = { };
                var tappedGuide = this.pointerBlockIndex >= 0 && !this.pointerDragged && (position.$clone().sub( this.pointerStart )).lengthSq() <= this.tapMovementLimit * this.tapMovementLimit && this.guide.TryGetBlockUnderPointer(this.playerCamera, position, index) && index.v === this.pointerBlockIndex && this.guide.SelectedPartIndex === this.pointerPartIndex;
                var clickedIndex = this.pointerBlockIndex;
                this.pointerBlockIndex = -1;
                if (tappedGuide) {
                    !Bridge.staticEquals(this.GuideClicked, null) ? this.GuideClicked(this.pointerPartIndex, clickedIndex) : null;
                    if (UnityEngine.MonoBehaviour.op_Inequality(this.playerVisual, null)) {
                        this.playerVisual.PlayBuild();
                    }
                }
            },
            /*BuildCameraController.EndPointer end.*/

            /*BuildCameraController.TurnTo start.*/
            TurnTo: function (target) {
if ( TRACE ) { TRACE( "BuildCameraController#TurnTo", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    from,
                    to,
                    elapsed,
                    duration,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    from = this.playerCamera.transform.rotation.$clone();
                                        to = new pc.Quat().lookRotation( target.$clone().sub( this.eyePosition ), pc.Vec3.UP.clone() );
                                        elapsed = 0.0;
                                        duration = UnityEngine.Mathf.Max(0.01, this.turnToBlockSeconds);
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( elapsed < duration ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    elapsed += UnityEngine.Time.deltaTime;
                                        this.playerCamera.transform.rotation = new pc.Quat().slerpUnclamped( from, to, pc.math.clamp( Math.max(0, Math.min(1, elapsed / duration)), 0, 1 ) );
                                        this.ApplyCameraPosition();
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    this.playerCamera.transform.rotation = to.$clone();
                                        this.ApplyCameraPosition();
                                        this.ReadCameraAngles();

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
            /*BuildCameraController.TurnTo end.*/

            /*BuildCameraController.ReadCameraAngles start.*/
            ReadCameraAngles: function () {
if ( TRACE ) { TRACE( "BuildCameraController#ReadCameraAngles", this ); }

                var angles = this.playerCamera.transform.eulerAngles.$clone();
                this.yaw = angles.y;
                this.pitch = angles.x > 180.0 ? angles.x - 360.0 : angles.x;
            },
            /*BuildCameraController.ReadCameraAngles end.*/


        }
    });
    /*BuildCameraController end.*/

    /*BuildCollisionWorld start.*/
    /**
     * Saved world-space boxes. Player collision does not depend on the WebGL physics backend.
     *
     * @public
     * @class BuildCollisionWorld
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildCollisionWorld", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                Active: null
            }
        },
        fields: {
            mapBoxData: null,
            limitRoot: null,
            limitRegistered: false,
            mapBoxes: null,
            placedBoxes: null,
            owners: null
        },
        props: {
            Count: {
                get: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld#Count#get", this ); }

                    return ((this.mapBoxes.length + this.placedBoxes.Count) | 0);
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld#init", this ); }

                this.mapBoxData = System.Array.init(0, 0, System.Single);
                this.mapBoxes = System.Array.init(0, function (){
                    return new UnityEngine.Bounds();
                }, UnityEngine.Bounds);
                this.placedBoxes = new (System.Collections.Generic.List$1(UnityEngine.Bounds)).ctor();
                this.owners = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
            }
        },
        methods: {
            /*BuildCollisionWorld.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld#Awake", this ); }

                this.InitializeWorld();
            },
            /*BuildCollisionWorld.Awake end.*/

            /*BuildCollisionWorld.InitializeWorld start.*/
            InitializeWorld: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld#InitializeWorld", this ); }

                BuildCollisionWorld.Active = this;
                if (this.mapBoxData == null || this.mapBoxData.length === 0 || this.mapBoxData.length % 6 !== 0) {
                    return false;
                }
                if (this.mapBoxes.length !== ((Bridge.Int.div(this.mapBoxData.length, 6)) | 0)) {
                    this.mapBoxes = System.Array.init(((Bridge.Int.div(this.mapBoxData.length, 6)) | 0), function (){
                        return new UnityEngine.Bounds();
                    }, UnityEngine.Bounds);
                    for (var i = 0; i < this.mapBoxes.length; i = (i + 1) | 0) {
                        var n = Bridge.Int.mul(i, 6);
                        this.mapBoxes[i] = new pc.BoundingBox( new pc.Vec3( this.mapBoxData[n], this.mapBoxData[((n + 1) | 0)], this.mapBoxData[((n + 2) | 0)] ), new pc.Vec3( this.mapBoxData[((n + 3) | 0)], this.mapBoxData[((n + 4) | 0)], this.mapBoxData[((n + 5) | 0)] ).scale( 0.5 ) );
                    }
                }
                if (!this.limitRegistered && UnityEngine.GameObject.op_Inequality(this.limitRoot, null)) {
                    this.Register(this.limitRoot);
                    this.limitRegistered = true;
                }
                return true;
            },
            /*BuildCollisionWorld.InitializeWorld end.*/

            /*BuildCollisionWorld.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld#OnDestroy", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(BuildCollisionWorld.Active, this)) {
                    BuildCollisionWorld.Active = null;
                }
            },
            /*BuildCollisionWorld.OnDestroy end.*/

            /*BuildCollisionWorld.Register start.*/
            Register: function (owner) {
if ( TRACE ) { TRACE( "BuildCollisionWorld#Register", this ); }

                var $t;
                $t = Bridge.getEnumerator(owner.GetComponentsInChildren(UnityEngine.BoxCollider));
                try {
                    while ($t.moveNext()) {
                        var box = $t.Current;
                        if (!box.enabled || box.isTrigger) {
                            continue;
                        }
                        // Calculate from the transform, without waiting for a physics sync.
                        var size = box.size.$clone().clone().scale( 0.5 );
                        var x = box.transform.TransformVector(new pc.Vec3( size.x, 0, 0 ));
                        var y = box.transform.TransformVector(new pc.Vec3( 0, size.y, 0 ));
                        var z = box.transform.TransformVector(new pc.Vec3( 0, 0, size.z ));
                        var extents = new pc.Vec3( Math.abs(x.x) + Math.abs(y.x) + Math.abs(z.x), Math.abs(x.y) + Math.abs(y.y) + Math.abs(z.y), Math.abs(x.z) + Math.abs(y.z) + Math.abs(z.z) );
                        this.placedBoxes.add(new pc.BoundingBox( box.transform.TransformPoint$1(box.center), extents.$clone().clone().scale( 2 ).scale( 0.5 ) ));
                        this.owners.add(owner);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*BuildCollisionWorld.Register end.*/

            /*BuildCollisionWorld.GetBox start.*/
            GetBox: function (index, box) {
if ( TRACE ) { TRACE( "BuildCollisionWorld#GetBox", this ); }

                if (index < this.mapBoxes.length) {
                    box.v = this.mapBoxes[index];
                    return true;
                }
                index = (index - this.mapBoxes.length) | 0;
                box.v = this.placedBoxes.getItem(index);
                return UnityEngine.GameObject.op_Inequality(this.owners.getItem(index), null) && this.owners.getItem(index).activeInHierarchy;
            },
            /*BuildCollisionWorld.GetBox end.*/

            /*BuildCollisionWorld.Cast start.*/
            Cast: function (center, halfSize, direction, distance, hit) {
if ( TRACE ) { TRACE( "BuildCollisionWorld#Cast", this ); }

                hit.v = new BuildCollisionWorld.Hit();
                hit.v.distance = distance;
                var found = false;
                for (var i = 0; i < this.Count; i = (i + 1) | 0) {
                    var box = { v : new UnityEngine.Bounds() };
                    if (!this.GetBox(i, box)) {
                        continue;
                    }
                    var min = box.v.min.$clone().sub( halfSize ), max = box.v.max.$clone().add( halfSize );
                    var enter = -1000000.0, exit = distance;
                    var normal = pc.Vec3.ZERO.clone();
                    var valid = true;
                    for (var axis = 0; axis < 3; axis = (axis + 1) | 0) {
                        var d = direction.getitem(axis), p = center.getitem(axis);
                        if (Math.abs(d) < 1E-06) {
                            if (p < min.getitem(axis) || p > max.getitem(axis)) {
                                valid = false;
                                break;
                            }
                            continue;
                        }
                        var near = (min.getitem(axis) - p) / d, far = (max.getitem(axis) - p) / d;
                        var sign = -1;
                        if (near > far) {
                            var t = near;
                            near = far;
                            far = t;
                            sign = 1;
                        }
                        if (near > enter) {
                            enter = near;
                            normal = pc.Vec3.ZERO.clone();
                            normal.setitem(axis, sign);
                        }
                        exit = UnityEngine.Mathf.Min(exit, far);
                        if (enter > exit) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid || enter < -1E-05 || enter > hit.v.distance || exit < 0) {
                        continue;
                    }
                    hit.v.distance = UnityEngine.Mathf.Max(0, enter);
                    hit.v.normal = normal.$clone();
                    var contact = center.$clone().add( direction.$clone().clone().scale( hit.v.distance ) );
                    contact = contact.$clone().sub( new pc.Vec3().mul2( normal, halfSize ) );
                    hit.v.point = contact.$clone();
                    found = true;
                }
                return found;
            },
            /*BuildCollisionWorld.Cast end.*/

            /*BuildCollisionWorld.ResolveOverlap start.*/
            ResolveOverlap: function (center, halfSize) {
if ( TRACE ) { TRACE( "BuildCollisionWorld#ResolveOverlap", this ); }

                // A block may appear around the player. Sweeps alone cannot escape an initial overlap.
                for (var pass = 0; pass < 12; pass = (pass + 1) | 0) {
                    var moved = false;
                    for (var i = 0; i < this.Count; i = (i + 1) | 0) {
                        var box = { v : new UnityEngine.Bounds() };
                        if (!this.GetBox(i, box)) {
                            continue;
                        }
                        var min = box.v.min.$clone().sub( halfSize ), max = box.v.max.$clone().add( halfSize );
                        if (center.x <= min.x || center.x >= max.x || center.y <= min.y || center.y >= max.y || center.z <= min.z || center.z >= max.z) {
                            continue;
                        }
                        var best = 3.40282347E+38;
                        var push = pc.Vec3.ZERO.clone();
                        for (var axis = 0; axis < 3; axis = (axis + 1) | 0) {
                            var low = center.getitem(axis) - min.getitem(axis), high = max.getitem(axis) - center.getitem(axis);
                            var delta = low < high ? -low - 0.016 : high + 0.016;
                            if (Math.abs(delta) < best) {
                                best = Math.abs(delta);
                                push = pc.Vec3.ZERO.clone();
                                push.setitem(axis, delta);
                            }
                        }
                        center = center.$clone().add( push.$clone() );
                        moved = true;
                    }
                    if (!moved) {
                        break;
                    }
                }
                return center.$clone();
            },
            /*BuildCollisionWorld.ResolveOverlap end.*/


        }
    });
    /*BuildCollisionWorld end.*/

    /*BuildCollisionWorld+Hit start.*/
    Bridge.define("BuildCollisionWorld.Hit", {
        $kind: 1004,
        statics: {
            methods: {
                getDefaultValue: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld.Hit#getDefaultValue", this ); }
 return new BuildCollisionWorld.Hit(); }
            }
        },
        fields: {
            distance: 0,
            normal: null,
            point: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld.Hit#init", this ); }

                this.normal = new UnityEngine.Vector3();
                this.point = new UnityEngine.Vector3();
            },
            ctor: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld.Hit#ctor", this ); }

                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
if ( TRACE ) { TRACE( "BuildCollisionWorld.Hit#getHashCode", this ); }

                var h = Bridge.addHash([7629128, this.distance, this.normal, this.point]);
                return h;
            },
            equals: function (o) {
if ( TRACE ) { TRACE( "BuildCollisionWorld.Hit#equals", this ); }

                if (!Bridge.is(o, BuildCollisionWorld.Hit)) {
                    return false;
                }
                return Bridge.equals(this.distance, o.distance) && Bridge.equals(this.normal, o.normal) && Bridge.equals(this.point, o.point);
            },
            $clone: function (to) {
if ( TRACE ) { TRACE( "BuildCollisionWorld.Hit#$clone", this ); }

                var s = to || new BuildCollisionWorld.Hit();
                s.distance = this.distance;
                s.normal = this.normal.$clone();
                s.point = this.point.$clone();
                return s;
            }
        }
    });
    /*BuildCollisionWorld+Hit end.*/

    /*BuildCompleteFireworks start.*/
    /**
     * One short celebration, batched into one texture-free mesh. Scene-authored renderer/material.
     *
     * @public
     * @class BuildCompleteFireworks
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildCompleteFireworks", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                Shots: 0,
                Sparks: 0,
                Quads: 0,
                Rise: 0,
                Life: 0
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#init", this ); }

                    this.Shots = 12;
                    this.Sparks = 24;
                    this.Quads = 300;
                    this.Rise = 0.7;
                    this.Life = 1.3;
                }
            },
            methods: {
                /*BuildCompleteFireworks.PlaySound:static start.*/
                PlaySound: function (sources, shot) {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#PlaySound", this ); }

                    if (sources == null || sources.length === 0) {
                        return;
                    }
                    var source = sources[shot % sources.length];
                    if (UnityEngine.Component.op_Inequality(source, null)) {
                        source.Play();
                    }
                },
                /*BuildCompleteFireworks.PlaySound:static end.*/

                /*BuildCompleteFireworks.StopSounds:static start.*/
                StopSounds: function (sources) {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#StopSounds", this ); }

                    if (sources == null) {
                        return;
                    }
                    for (var i = 0; i < sources.length; i = (i + 1) | 0) {
                        if (UnityEngine.Component.op_Inequality(sources[i], null)) {
                            sources[i].Stop();
                        }
                    }
                },
                /*BuildCompleteFireworks.StopSounds:static end.*/


            }
        },
        fields: {
            meshFilter: null,
            meshRenderer: null,
            burstHeight: 0,
            launchInterval: 0,
            launchAudio: null,
            flightAudio: null,
            burstAudio: null,
            mesh: null,
            vertices: null,
            colors: null,
            palette: null,
            view: null,
            elapsed: 0,
            running: false,
            soundStages: null,
            HasPlayed: false
        },
        props: {
            IsPlaying: {
                get: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#IsPlaying#get", this ); }

                    return this.running;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#init", this ); }

                this.burstHeight = 2.2;
                this.launchInterval = 0.45;
                this.vertices = System.Array.init(1200, function (){
                    return new UnityEngine.Vector3();
                }, UnityEngine.Vector3);
                this.colors = System.Array.init(1200, function (){
                    return new UnityEngine.Color();
                }, UnityEngine.Color);
                this.palette = System.Array.init([
                    new pc.Color( 1, 0.72, 0.12, 1 ), 
                    new pc.Color( 1, 0.23, 0.52, 1 ), 
                    new pc.Color( 0.2, 0.8, 1, 1 ), 
                    new pc.Color( 0.6, 1, 0.25, 1 ), 
                    new pc.Color( 0.8, 0.3, 1, 1 ), 
                    new pc.Color( 1, 0.88, 0.4, 1 )
                ], UnityEngine.Color);
                this.soundStages = System.Array.init(BuildCompleteFireworks.Shots, 0, System.Int32);
            }
        },
        methods: {
            /*BuildCompleteFireworks.PlayOnce start.*/
            PlayOnce: function (launchPosition, camera) {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#PlayOnce", this ); }

                if (this.HasPlayed || UnityEngine.Component.op_Equality(this.meshFilter, null) || UnityEngine.Component.op_Equality(this.meshRenderer, null)) {
                    return;
                }
                this.HasPlayed = true;
                this.view = camera;
                this.elapsed = 0;
                this.running = true;
                this.transform.position = launchPosition.$clone();
                this.transform.rotation = pc.Quat.IDENTITY.clone();
                if (this.mesh == null) {
                    this.mesh = new UnityEngine.Mesh.ctor();
                    this.mesh.name = "Completion Fireworks Batch";
                    this.mesh.MarkDynamic();
                    this.mesh.vertices = this.vertices;
                    var triangles = System.Array.init(1800, 0, System.Int32);
                    for (var i = 0; i < BuildCompleteFireworks.Quads; i = (i + 1) | 0) {
                        var v = Bridge.Int.mul(i, 4), t = Bridge.Int.mul(i, 6);
                        triangles[t] = v;
                        triangles[((t + 1) | 0)] = (v + 1) | 0;
                        triangles[((t + 2) | 0)] = (v + 2) | 0;
                        triangles[((t + 3) | 0)] = v;
                        triangles[((t + 4) | 0)] = (v + 2) | 0;
                        triangles[((t + 5) | 0)] = (v + 3) | 0;
                    }
                    this.mesh.triangles = triangles;
                    this.meshFilter.sharedMesh = this.mesh;
                }
                this.meshRenderer.enabled = true;
                this.PlaySounds();
                this.Draw();
            },
            /*BuildCompleteFireworks.PlayOnce end.*/

            /*BuildCompleteFireworks.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#Update", this ); }

                if (!this.running) {
                    return;
                }
                this.elapsed += UnityEngine.Time.deltaTime;
                this.PlaySounds();
                if (this.elapsed > (11) * this.launchInterval + BuildCompleteFireworks.Rise + BuildCompleteFireworks.Life) {
                    this.running = false;
                    this.meshRenderer.enabled = false;
                    return;
                }
                this.Draw();
            },
            /*BuildCompleteFireworks.Update end.*/

            /*BuildCompleteFireworks.Draw start.*/
            Draw: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#Draw", this ); }

                var right = UnityEngine.Component.op_Inequality(this.view, null) ? this.view.transform.right.$clone() : pc.Vec3.RIGHT.clone();
                for (var shot = 0; shot < BuildCompleteFireworks.Shots; shot = (shot + 1) | 0) {
                    var age = this.elapsed - shot * this.launchInterval;
                    var angle = shot * UnityEngine.Mathf.PI * 2 / 3;
                    var start = new pc.Vec3( Math.cos(angle) * 0.7, 0, Math.sin(angle) * 0.5 );
                    var peak = start.$clone().add( new pc.Vec3( Math.cos(angle) * 0.6, this.burstHeight + (shot % 2) * 0.5, Math.sin(angle) * 0.5 ) );
                    var first = Bridge.Int.mul(shot, (25));
                    if (age >= 0 && age < BuildCompleteFireworks.Rise) {
                        var p = new pc.Vec3().lerp( start, peak, age / BuildCompleteFireworks.Rise );
                        this.Quad(first, p, p.$clone().sub( pc.Vec3.UP.clone().clone().scale( 0.35 ) ), right.$clone().clone().scale( 0.025 ), new pc.Color( 1, 0.85, 0.4, 0.9 ));
                    } else {
                        this.Quad(first, pc.Vec3.ZERO.clone(), pc.Vec3.ZERO.clone(), pc.Vec3.ZERO.clone(), new pc.Color( 0, 0, 0, 0 ));
                    }
                    var time = age - BuildCompleteFireworks.Rise;
                    for (var i = 0; i < BuildCompleteFireworks.Sparks; i = (i + 1) | 0) {
                        if (time < 0 || time > BuildCompleteFireworks.Life) {
                            this.Quad(((((first + 1) | 0) + i) | 0), pc.Vec3.ZERO.clone(), pc.Vec3.ZERO.clone(), pc.Vec3.ZERO.clone(), new pc.Color( 0, 0, 0, 0 ));
                            continue;
                        }
                        var y = 1 - 2 * (i + 0.5) / BuildCompleteFireworks.Sparks;
                        var radial = Math.sqrt(1 - y * y), a = i * 2.399963 + shot;
                        var velocity = new pc.Vec3( Math.cos(a) * radial, y, Math.sin(a) * radial ).clone().scale( (1.8 + (i % 3) * 0.25) );
                        var p1 = peak.$clone().add( velocity.$clone().clone().scale( time ) ).add( pc.Vec3.DOWN.clone().clone().scale( (0.65 * time * time) ) );
                        var direction = (velocity.$clone().add( pc.Vec3.DOWN.clone().clone().scale( (1.3 * time) ) )).clone().normalize().$clone();
                        var color = this.palette[shot % this.palette.length].$clone();
                        color.a = Math.max(0, Math.min(1, (BuildCompleteFireworks.Life - time) / 0.6));
                        this.Quad(((((first + 1) | 0) + i) | 0), p1, p1.$clone().sub( direction.$clone().clone().scale( (0.1 + 0.12 * (1 - time / BuildCompleteFireworks.Life)) ) ), right.$clone().clone().scale( (0.024 * (1 - 0.5 * time / BuildCompleteFireworks.Life)) ), color);
                    }
                }
                this.mesh.vertices = this.vertices;
                this.mesh.colors = this.colors;
                this.mesh.RecalculateBounds();
            },
            /*BuildCompleteFireworks.Draw end.*/

            /*BuildCompleteFireworks.Quad start.*/
            Quad: function (index, a, b, width, color) {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#Quad", this ); }

                var v = Bridge.Int.mul(index, 4);
                this.vertices[v] = a.$clone().sub( width );
                this.vertices[((v + 1) | 0)] = a.$clone().add( width );
                this.vertices[((v + 2) | 0)] = b.$clone().add( width );
                this.vertices[((v + 3) | 0)] = b.$clone().sub( width );
                for (var i = 0; i < 4; i = (i + 1) | 0) {
                    this.colors[((v + i) | 0)] = color.$clone();
                }
            },
            /*BuildCompleteFireworks.Quad end.*/

            /*BuildCompleteFireworks.PlaySounds start.*/
            PlaySounds: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#PlaySounds", this ); }

                for (var shot = 0; shot < BuildCompleteFireworks.Shots; shot = (shot + 1) | 0) {
                    var age = this.elapsed - shot * this.launchInterval;
                    if (age >= 0 && (this.soundStages[shot] & 1) === 0) {
                        this.soundStages[shot] = this.soundStages[shot] | 1;
                        if (age < 0.18) {
                            BuildCompleteFireworks.PlaySound(this.launchAudio, shot);
                        }
                    }
                    if (age >= 0.06 && (this.soundStages[shot] & 2) === 0) {
                        this.soundStages[shot] = this.soundStages[shot] | 2;
                        if (age < BuildCompleteFireworks.Rise) {
                            BuildCompleteFireworks.PlaySound(this.flightAudio, shot);
                        }
                    }
                    if (age >= BuildCompleteFireworks.Rise && (this.soundStages[shot] & 4) === 0) {
                        this.soundStages[shot] = this.soundStages[shot] | 4;
                        if (age < 1.3) {
                            BuildCompleteFireworks.PlaySound(this.burstAudio, shot);
                        }
                    }
                }
            },
            /*BuildCompleteFireworks.PlaySounds end.*/

            /*BuildCompleteFireworks.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#OnDisable", this ); }

                this.running = false;
                if (UnityEngine.Component.op_Inequality(this.meshRenderer, null)) {
                    this.meshRenderer.enabled = false;
                }
                BuildCompleteFireworks.StopSounds(this.launchAudio);
                BuildCompleteFireworks.StopSounds(this.flightAudio);
                BuildCompleteFireworks.StopSounds(this.burstAudio);
            },
            /*BuildCompleteFireworks.OnDisable end.*/

            /*BuildCompleteFireworks.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "BuildCompleteFireworks#OnDestroy", this ); }

                if (this.mesh != null) {
                    UnityEngine.Object.Destroy(this.mesh);
                }
            },
            /*BuildCompleteFireworks.OnDestroy end.*/


        }
    });
    /*BuildCompleteFireworks end.*/

    /*BuildGuide start.*/
    /**
     * The single dashed target that the player can tap to build.
     *
     * @public
     * @class BuildGuide
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildGuide", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*BuildGuide.MatchesType:static start.*/
                MatchesType: function (type, types) {
if ( TRACE ) { TRACE( "BuildGuide#MatchesType", this ); }

                    var $t;
                    $t = Bridge.getEnumerator(types);
                    try {
                        while ($t.moveNext()) {
                            var candidate = $t.Current;
                            if (Bridge.referenceEquals(candidate, type)) {
                                return true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return false;
                },
                /*BuildGuide.MatchesType:static end.*/

                /*BuildGuide.MakeFaceMaterial:static start.*/
                MakeFaceMaterial: function () {
if ( TRACE ) { TRACE( "BuildGuide#MakeFaceMaterial", this ); }

                    var material = GameplayMaterials.Create(true, false);
                    material.name = "Guide Transparent Face";
                    material.SetFloat$1("_Mode", 2.0);
                    material.SetInt$1("_SrcBlend", UnityEngine.Rendering.BlendMode.SrcAlpha);
                    material.SetInt$1("_DstBlend", UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                    material.SetInt$1("_ZWrite", 0);
                    material.DisableKeyword("_ALPHATEST_ON");
                    material.EnableKeyword("_ALPHABLEND_ON");
                    material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                    material.renderQueue = UnityEngine.Rendering.RenderQueue.Transparent;
                    material.color = new pc.Color( 0.35, 0.9, 1.0, 0.22 );
                    GameplayMaterials.ConfigureTransparency(material);
                    return material;
                },
                /*BuildGuide.MakeFaceMaterial:static end.*/

                /*BuildGuide.CreateDashedFrameMesh:static start.*/
                CreateDashedFrameMesh: function () {
if ( TRACE ) { TRACE( "BuildGuide#CreateDashedFrameMesh", this ); }

                    var $t;
                    var mesh = ($t = new UnityEngine.Mesh.ctor(), $t.name = "Guide Dashed Outline", $t);
                    var vertices = new (System.Collections.Generic.List$1(UnityEngine.Vector3)).ctor();
                    var triangles = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    var thickness = 0.028;
                    var dashLength = 0.18;
                    var dashCount = 4;
                    var gap = 0.09333333;
                    for (var axis = 0; axis < 3; axis = (axis + 1) | 0) {
                        for (var sideA = -1; sideA <= 1; sideA = (sideA + 2) | 0) {
                            for (var sideB = -1; sideB <= 1; sideB = (sideB + 2) | 0) {
                                for (var dash = 0; dash < dashCount; dash = (dash + 1) | 0) {
                                    var along = -0.5 + dash * (dashLength + gap) + 0.09;
                                    var center = pc.Vec3.ZERO.clone();
                                    var size = new pc.Vec3( 1, 1, 1 ).clone().scale( thickness );
                                    center.setitem(axis, along);
                                    center.setitem((((axis + 1) | 0)) % 3, sideA * 0.505);
                                    center.setitem((((axis + 2) | 0)) % 3, sideB * 0.505);
                                    size.setitem(axis, dashLength);
                                    BuildGuide.AppendBox(vertices, triangles, center, size);
                                }
                            }
                        }
                    }
                    mesh.SetVertices(vertices);
                    mesh.SetTriangles(triangles, 0);
                    mesh.RecalculateNormals();
                    return mesh;
                },
                /*BuildGuide.CreateDashedFrameMesh:static end.*/

                /*BuildGuide.AppendBox:static start.*/
                AppendBox: function (vertices, triangles, center, size) {
if ( TRACE ) { TRACE( "BuildGuide#AppendBox", this ); }

                    var $t;
                    var half = size.$clone().clone().scale( 0.5 );
                    var first = vertices.Count;
                    vertices.add(center.$clone().add( new pc.Vec3( -half.x, -half.y, -half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( half.x, -half.y, -half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( half.x, half.y, -half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( -half.x, half.y, -half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( -half.x, -half.y, half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( half.x, -half.y, half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( half.x, half.y, half.z ) ));
                    vertices.add(center.$clone().add( new pc.Vec3( -half.x, half.y, half.z ) ));
                    var faces = System.Array.init([
                        0, 
                        2, 
                        1, 
                        0, 
                        3, 
                        2, 
                        4, 
                        5, 
                        6, 
                        4, 
                        6, 
                        7, 
                        0, 
                        4, 
                        7, 
                        0, 
                        7, 
                        3, 
                        1, 
                        2, 
                        6, 
                        1, 
                        6, 
                        5, 
                        0, 
                        1, 
                        5, 
                        0, 
                        5, 
                        4, 
                        3, 
                        7, 
                        6, 
                        3, 
                        6, 
                        2
                    ], System.Int32);
                    $t = Bridge.getEnumerator(faces);
                    try {
                        while ($t.moveNext()) {
                            var index = $t.Current;
                            triangles.add(((first + index) | 0));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                },
                /*BuildGuide.AppendBox:static end.*/


            }
        },
        fields: {
            targetCube: null,
            targetCollider: null,
            faceMaterial: null,
            outlineMaterial: null,
            outlineMesh: null,
            currentPart: null,
            SelectedIndex: 0,
            SelectedPartIndex: 0
        },
        props: {
            Visible: {
                get: function () {
if ( TRACE ) { TRACE( "BuildGuide#Visible#get", this ); }

                    return this.SelectedIndex >= 0 && this.targetCube.activeSelf;
                }
            },
            TargetPosition: {
                get: function () {
if ( TRACE ) { TRACE( "BuildGuide#TargetPosition#get", this ); }

                    return UnityEngine.GameObject.op_Inequality(this.targetCube, null) ? this.targetCube.transform.position.$clone() : pc.Vec3.ZERO.clone();
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildGuide#init", this ); }

                this.SelectedIndex = -1;
                this.SelectedPartIndex = -1;
            }
        },
        methods: {
            /*BuildGuide.Initialize start.*/
            Initialize: function () {
if ( TRACE ) { TRACE( "BuildGuide#Initialize", this ); }

                this.targetCube = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
                this.targetCube.name = "Build Guide Target";
                this.targetCube.layer = 2; // Ignore Raycast: guide has its own direct collider hit test.
                this.targetCube.transform.SetParent(this.transform, false);
                this.targetCollider = this.targetCube.GetComponent(UnityEngine.Collider);
                this.faceMaterial = BuildGuide.MakeFaceMaterial();
                this.targetCube.GetComponent(UnityEngine.Renderer).sharedMaterial = this.faceMaterial;

                var outline = new UnityEngine.GameObject.$ctor2("Dashed Outline");
                outline.transform.SetParent(this.targetCube.transform, false);
                this.outlineMesh = BuildGuide.CreateDashedFrameMesh();
                outline.AddComponent(UnityEngine.MeshFilter).sharedMesh = this.outlineMesh;
                this.outlineMaterial = GameplayMaterials.CreateGuideOverlay();
                this.outlineMaterial.name = "Guide White Dashes";
                this.outlineMaterial.color = new pc.Color( 1, 1, 1, 1 );
                outline.AddComponent(UnityEngine.MeshRenderer).sharedMaterial = this.outlineMaterial;
            },
            /*BuildGuide.Initialize end.*/

            /*BuildGuide.TryGetBlockUnderPointer start.*/
            TryGetBlockUnderPointer: function (camera, position, blockIndex) {
if ( TRACE ) { TRACE( "BuildGuide#TryGetBlockUnderPointer", this ); }

                blockIndex.v = -1;
                var hit = { v : new UnityEngine.RaycastHit() };
                if (!this.Visible || !this.targetCollider.Raycast(camera.ScreenPointToRay(UnityEngine.Vector3.FromVector2(position)), hit, 100.0)) {
                    return false;
                }
                blockIndex.v = this.SelectedIndex;
                return true;
            },
            /*BuildGuide.TryGetBlockUnderPointer end.*/

            /*BuildGuide.Hide start.*/
            Hide: function () {
if ( TRACE ) { TRACE( "BuildGuide#Hide", this ); }

                this.SelectedIndex = -1;
                this.SelectedPartIndex = -1;
                this.currentPart = null;
                if (UnityEngine.GameObject.op_Inequality(this.targetCube, null)) {
                    this.targetCube.SetActive(false);
                }
            },
            /*BuildGuide.Hide end.*/

            /*BuildGuide.ShowBest start.*/
            ShowBest: function (parts, camera, origin, force, selectedTypes) {
if ( TRACE ) { TRACE( "BuildGuide#ShowBest", this ); }

                if (selectedTypes === void 0) { selectedTypes = null; }
                var bestIndex = -1;
                var bestPart = -1;
                var bestScore = Number.NEGATIVE_INFINITY;
                for (var p = 0; p < parts.Count; p = (p + 1) | 0) {
                    var part = parts.getItem(p);
                    for (var i = 0; i < part.blocks.Count; i = (i + 1) | 0) {
                        var block = part.blocks.getItem(i);
                        if (block.built) {
                            continue;
                        }
                        if (selectedTypes != null && !BuildGuide.MatchesType(block.type, selectedTypes)) {
                            continue;
                        }
                        var bounds = SampleBlockVisuals.GetLocalBounds(block);
                        var target = UnityEngine.Component.op_Inequality(origin, null) ? origin.TransformPoint$1(block.localPosition.$clone().add( bounds.center )) : block.localPosition.$clone().add( bounds.center );
                        var offset = target.$clone().sub( camera.transform.position );
                        var score = camera.transform.forward.dot( offset.clone().normalize() );
                        if (score <= 0 && selectedTypes == null) {
                            continue;
                        }
                        var viewport = camera.WorldToViewportPoint(target);
                        var onScreen = viewport.z > 0.0 && viewport.x > 0.05 && viewport.x < 0.95 && viewport.y > 0.05 && viewport.y < 0.95;
                        // Prefer the gaze direction, then proximity; tiny hysteresis avoids flicker.
                        score -= offset.length() * 0.001;
                        if (onScreen) {
                            score += 2.0;
                        }
                        if (!force && p === this.SelectedPartIndex && i === this.SelectedIndex) {
                            score += 0.002;
                        }
                        if (score <= bestScore) {
                            continue;
                        }
                        bestScore = score;
                        bestIndex = i;
                        bestPart = p;
                    }
                }

                if (bestIndex < 0) {
                    this.Hide();
                    return;
                }
                this.SelectedIndex = bestIndex;
                this.SelectedPartIndex = bestPart;
                this.currentPart = parts.getItem(bestPart);
                var selected = this.currentPart.blocks.getItem(bestIndex);
                var selectedBounds = SampleBlockVisuals.GetLocalBounds(selected);
                this.targetCube.transform.position = UnityEngine.Component.op_Inequality(origin, null) ? origin.TransformPoint$1(selected.localPosition.$clone().add( selectedBounds.center )) : selected.localPosition.$clone().add( selectedBounds.center );
                this.targetCube.transform.rotation = UnityEngine.Component.op_Inequality(origin, null) ? origin.rotation.$clone() : pc.Quat.IDENTITY.clone();
                var scale = UnityEngine.Component.op_Inequality(origin, null) ? origin.lossyScale.$clone() : new pc.Vec3( 1, 1, 1 );
                this.targetCube.transform.localScale = new pc.Vec3().mul2( selectedBounds.halfExtents.$clone().scale( 2 ), new pc.Vec3( Math.abs(scale.x), Math.abs(scale.y), Math.abs(scale.z) ) );
                this.targetCube.SetActive(true);
            },
            /*BuildGuide.ShowBest end.*/

            /*BuildGuide.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "BuildGuide#OnDestroy", this ); }

                if (this.faceMaterial != null) {
                    UnityEngine.Object.Destroy(this.faceMaterial);
                }
                if (this.outlineMaterial != null) {
                    UnityEngine.Object.Destroy(this.outlineMaterial);
                }
                if (this.outlineMesh != null) {
                    UnityEngine.Object.Destroy(this.outlineMesh);
                }
            },
            /*BuildGuide.OnDestroy end.*/


        }
    });
    /*BuildGuide end.*/

    /*BuildingPart start.*/
    Bridge.define("BuildingPart", {
        fields: {
            name: null,
            blocks: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildingPart#init", this ); }

                this.name = "New Part";
                this.blocks = new (System.Collections.Generic.List$1(BuildBlock)).ctor();
            }
        }
    });
    /*BuildingPart end.*/

    /*BuildPlayerMotor start.*/
    /**
     * First-person adaptation of minecraft-version_7 PlayerMotor.
     Keeps its camera-relative input, exponential acceleration, gravity and auto-jump,
     without the VoxelPlay/HAVIGAME or third-person character dependencies.
     Position is the camera eye; collision covers the whole standing body.
     *
     * @public
     * @class BuildPlayerMotor
     */
    Bridge.define("BuildPlayerMotor", {
        statics: {
            fields: {
                Skin: 0
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "BuildPlayerMotor#init", this ); }

                    this.Skin = 0.015;
                }
            }
        },
        fields: {
            walkSpeed: 0,
            flySpeed: 0,
            movementSharpness: 0,
            airAcceleration: 0,
            gravity: 0,
            jumpSpeed: 0,
            eyeHeight: 0,
            bodyHeight: 0,
            maxFlyHeight: 0,
            autoJump: false,
            Velocity: null,
            Grounded: false,
            jumpCooldown: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildPlayerMotor#init", this ); }

                this.Velocity = new UnityEngine.Vector3();
                this.walkSpeed = 2.0;
                this.flySpeed = 4.0;
                this.movementSharpness = 15.0;
                this.airAcceleration = 30.0;
                this.gravity = 30.0;
                this.jumpSpeed = 10.0;
                this.eyeHeight = 1.6;
                this.bodyHeight = 1.8;
                this.maxFlyHeight = 20.0;
                this.autoJump = true;
            }
        },
        methods: {
            /*BuildPlayerMotor.Stop start.*/
            Stop: function () {
if ( TRACE ) { TRACE( "BuildPlayerMotor#Stop", this ); }

                this.Velocity = pc.Vec3.ZERO.clone();
            },
            /*BuildPlayerMotor.Stop end.*/

            /*BuildPlayerMotor.Move start.*/
            Move: function (eye, input, vertical, flying, jump, radius, deltaTime) {
if ( TRACE ) { TRACE( "BuildPlayerMotor#Move", this ); }

                input = pc.Vec3.clampMagnitude( input, 1.0 );
                if (UnityEngine.MonoBehaviour.op_Inequality(BuildCollisionWorld.Active, null)) {
                    var offset = pc.Vec3.UP.clone().clone().scale( (this.bodyHeight * 0.5 - this.eyeHeight) );
                    eye = BuildCollisionWorld.Active.ResolveOverlap(eye.$clone().add( offset ), new pc.Vec3( radius, this.bodyHeight * 0.5, radius )).sub( offset );
                }
                // Bound simulation steps, not sweep distance, for stable low-frame-rate movement.
                var remaining = UnityEngine.Mathf.Min(deltaTime, 0.2);
                while (remaining > 1E-05) {
                    var dt = UnityEngine.Mathf.Min(remaining, 0.02);
                    remaining -= dt;
                    this.jumpCooldown = UnityEngine.Mathf.Max(0, this.jumpCooldown - dt);
                    var ground = { v : new BuildCollisionWorld.Hit() };
                    this.Grounded = this.Velocity.y <= 0 && this.Cast(eye, radius, pc.Vec3.DOWN.clone(), 0.08, ground) && ground.v.normal.y >= 0.65;
                    var velocity = this.Velocity.$clone();
                    if (flying) {
                        var desired = (input.$clone().add( pc.Vec3.UP.clone().clone().scale( vertical ) )).clone().scale( this.flySpeed );
                        if (eye.y >= this.maxFlyHeight && desired.y > 0) {
                            desired.y = 0;
                        }
                        velocity = new pc.Vec3().lerp( velocity, desired, 1.0 - UnityEngine.Mathf.Exp(-this.movementSharpness * dt) );
                    } else {
                        var horizontal = new pc.Vec3( velocity.x, 0, velocity.z );
                        horizontal = this.Grounded ? new pc.Vec3().lerp( horizontal, input.$clone().clone().scale( this.walkSpeed ), 1.0 - UnityEngine.Mathf.Exp(-this.movementSharpness * dt) ) : pc.Vec3.moveTowards( horizontal, input.$clone().clone().scale( this.walkSpeed ), this.airAcceleration * dt );
                        velocity = horizontal.$clone().add( pc.Vec3.UP.clone().clone().scale( (this.Grounded ? -2.0 : velocity.y - this.gravity * dt) ) );
                        if (this.Grounded && this.jumpCooldown <= 0 && (jump || (this.autoJump && this.ShouldAutoJump(eye.$clone(), input.$clone(), radius)))) {
                            velocity.y = this.jumpSpeed;
                            this.Grounded = false;
                            this.jumpCooldown = 0.3;
                        }
                    }
                    if (flying && velocity.y > 0) {
                        velocity.y = UnityEngine.Mathf.Min(velocity.y, UnityEngine.Mathf.Max(0, this.maxFlyHeight - eye.y) / dt);
                    }
                    this.Velocity = velocity.$clone();
                    eye = this.Sweep(eye, velocity.$clone().clone().scale( dt ), radius);
                    jump = false;
                }
                return eye.$clone();
            },
            /*BuildPlayerMotor.Move end.*/

            /*BuildPlayerMotor.ShouldAutoJump start.*/
            ShouldAutoJump: function (eye, input, radius) {
if ( TRACE ) { TRACE( "BuildPlayerMotor#ShouldAutoJump", this ); }

                if (input.lengthSq() < 0.04) {
                    return false;
                }
                var direction = input.clone().normalize().$clone();
                var wall = { v : new BuildCollisionWorld.Hit() };
                if (!this.Cast(eye, radius, direction, 0.15, wall) || wall.v.normal.y > 0.2) {
                    return false;
                }
                var feet = eye.y - this.eyeHeight;
                var probe = wall.v.point.$clone().add( direction.$clone().clone().scale( 0.15 ) );
                probe.y = feet + 1.1;
                var top = { v : new BuildCollisionWorld.Hit() };
                if (!this.Raycast(probe, pc.Vec3.DOWN.clone(), 1.1, top)) {
                    return false;
                }
                var step = top.v.point.y - feet;
                if (step < 0.05 || step > 1.05 || top.v.normal.y < 0.65) {
                    return false;
                }
                var ceiling = { v : new BuildCollisionWorld.Hit() };
                return !this.Cast(eye, radius, pc.Vec3.UP.clone(), step + 0.1, ceiling);
            },
            /*BuildPlayerMotor.ShouldAutoJump end.*/

            /*BuildPlayerMotor.Raycast start.*/
            Raycast: function (start, direction, distance, hit) {
if ( TRACE ) { TRACE( "BuildPlayerMotor#Raycast", this ); }

                var $t;
                if (UnityEngine.MonoBehaviour.op_Inequality(BuildCollisionWorld.Active, null)) {
                    return BuildCollisionWorld.Active.Cast(start.$clone(), pc.Vec3.ZERO.clone(), direction.$clone(), distance, hit);
                }
                var physicsHit = { v : new UnityEngine.RaycastHit() };
                var found = UnityEngine.Physics.Raycast$3(start, direction, physicsHit, distance, UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Ignore);
                hit.v = ($t = new BuildCollisionWorld.Hit(), $t.distance = physicsHit.v.distance, $t.normal = physicsHit.v.normal.$clone(), $t.point = physicsHit.v.point.$clone(), $t);
                return found;
            },
            /*BuildPlayerMotor.Raycast end.*/

            /*BuildPlayerMotor.Cast start.*/
            Cast: function (eye, radius, direction, distance, hit) {
if ( TRACE ) { TRACE( "BuildPlayerMotor#Cast", this ); }

                var $t;
                if (UnityEngine.MonoBehaviour.op_Inequality(BuildCollisionWorld.Active, null)) {
                    return BuildCollisionWorld.Active.Cast(eye.$clone().add( pc.Vec3.UP.clone().clone().scale( (this.bodyHeight * 0.5 - this.eyeHeight) ) ), new pc.Vec3( radius, this.bodyHeight * 0.5, radius ), direction.$clone(), distance, hit);
                }
                var feet = eye.$clone().sub( pc.Vec3.UP.clone().clone().scale( this.eyeHeight ) );
                var bottom = feet.$clone().add( pc.Vec3.UP.clone().clone().scale( radius ) );
                var top = feet.$clone().add( pc.Vec3.UP.clone().clone().scale( UnityEngine.Mathf.Max(radius, this.bodyHeight - radius) ) );
                var physicsHit = { v : new UnityEngine.RaycastHit() };
                var found = UnityEngine.Physics.CapsuleCast$1(bottom, top, radius, direction, physicsHit, distance, UnityEngine.Physics.DefaultRaycastLayers, UnityEngine.QueryTriggerInteraction.Ignore);
                hit.v = ($t = new BuildCollisionWorld.Hit(), $t.distance = physicsHit.v.distance, $t.normal = physicsHit.v.normal.$clone(), $t.point = physicsHit.v.point.$clone(), $t);
                return found;
            },
            /*BuildPlayerMotor.Cast end.*/

            /*BuildPlayerMotor.Sweep start.*/
            Sweep: function (eye, movement, radius) {
if ( TRACE ) { TRACE( "BuildPlayerMotor#Sweep", this ); }

                for (var pass = 0; pass < 4 && movement.lengthSq() > 1E-07; pass = (pass + 1) | 0) {
                    var distance = movement.length();
                    var direction = movement.$clone().scale( 1.0 / ( distance ) );
                    var hit = { v : new BuildCollisionWorld.Hit() };
                    if (!this.Cast(eye, radius, direction, distance + BuildPlayerMotor.Skin, hit)) {
                        eye = eye.$clone().add( movement.$clone() );
                        break;
                    }
                    var travel = UnityEngine.Mathf.Min(distance, UnityEngine.Mathf.Max(0, hit.v.distance - BuildPlayerMotor.Skin));
                    eye = eye.$clone().add( direction.$clone().clone().scale( travel ) );
                    movement = pc.Vec3.projectOnPlane( movement.$clone().sub( direction.$clone().clone().scale( travel ) ), hit.v.normal );
                    if (this.Velocity.dot( hit.v.normal ) < 0) {
                        this.Velocity = pc.Vec3.projectOnPlane( this.Velocity, hit.v.normal );
                    }
                }
                return eye.$clone();
            },
            /*BuildPlayerMotor.Sweep end.*/


        }
    });
    /*BuildPlayerMotor end.*/

    /*BuildPlayerVisual start.*/
    /**
     * Plays the original game's extracted clips on its original rig and skin.
     *
     * @public
     * @class BuildPlayerVisual
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildPlayerVisual", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            animator: null,
            body: null,
            currentState: null,
            buildUntil: 0
        },
        methods: {
            /*BuildPlayerVisual.PlayBuild start.*/
            PlayBuild: function () {
if ( TRACE ) { TRACE( "BuildPlayerVisual#PlayBuild", this ); }

                this.buildUntil = UnityEngine.Time.time + 0.45;
            },
            /*BuildPlayerVisual.PlayBuild end.*/

            /*BuildPlayerVisual.Synchronize start.*/
            Synchronize: function (feet, lookYaw, velocity, grounded, flying, visible) {
if ( TRACE ) { TRACE( "BuildPlayerVisual#Synchronize", this ); }

                this.transform.position = feet.$clone();
                var horizontal = new pc.Vec3( velocity.x, 0, velocity.z );
                var targetYaw = horizontal.lengthSq() > 0.01 ? Math.atan2(horizontal.x, horizontal.z) * UnityEngine.Mathf.Rad2Deg : lookYaw;
                this.transform.rotation = new pc.Quat().slerpUnclamped( this.transform.rotation, new pc.Quat().setFromEulerAngles_Unity( 0, targetYaw, 0 ), pc.math.clamp( 1.0 - UnityEngine.Mathf.Exp(-20.0 * UnityEngine.Time.deltaTime), 0, 1 ) );
                for (var i = 0; i < this.body.length; i = (i + 1) | 0) {
                    if (UnityEngine.Component.op_Inequality(this.body[i], null)) {
                        this.body[i].enabled = visible;
                    }
                }
                var state = UnityEngine.Time.time < this.buildUntil ? "Build" : flying ? (horizontal.lengthSq() > 0.04 ? "Fly" : "Fly_Idle") : !grounded ? (velocity.y > 0.1 ? "Jump" : "Fall") : horizontal.length() > 2.5 ? "Run" : horizontal.lengthSq() > 0.01 ? "Walk" : "Idle";
                if (UnityEngine.Component.op_Inequality(this.animator, null) && !Bridge.referenceEquals(this.currentState, state)) {
                    this.animator.Play$4(state, 0, 0.0);
                    this.currentState = state;
                }
            },
            /*BuildPlayerVisual.Synchronize end.*/


        }
    });
    /*BuildPlayerVisual end.*/

    /*BuildProgressUI start.*/
    /**
     * Updates counts and visibility on the fully scene-authored HUD.
     *
     * @public
     * @class BuildProgressUI
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildProgressUI", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*BuildProgressUI.Matches:static start.*/
                Matches: function (item, type) {
if ( TRACE ) { TRACE( "BuildProgressUI#Matches", this ); }

                    var $t;
                    $t = Bridge.getEnumerator(item.types);
                    try {
                        while ($t.moveNext()) {
                            var member = $t.Current;
                            if (Bridge.referenceEquals(member, type)) {
                                return true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return false;
                },
                /*BuildProgressUI.Matches:static end.*/


            }
        },
        fields: {
            slotPointer: 0,
            pressedSlot: 0,
            slotPressPosition: null,
            controller: null,
            canvasRoot: null,
            logo: null,
            install: null,
            bar: null,
            fill: null,
            building: null,
            inventory: null,
            title: null,
            count: null,
            slots: null,
            blockImages: null,
            blockItems: null,
            amounts: null,
            lastBuilt: 0,
            lastPart: 0,
            lastBlock: 0,
            installPointer: 0
        },
        events: {
            BlockSlotClicked: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildProgressUI#init", this ); }

                this.slotPressPosition = new UnityEngine.Vector2();
                this.slotPointer = -99;
                this.pressedSlot = -1;
                this.slots = System.Array.init(7, null, UnityEngine.RectTransform);
                this.blockImages = System.Array.init(7, null, UnityEngine.UI.Image);
                this.blockItems = System.Array.init(0, null, BuildProgressUI.BlockItem);
                this.amounts = System.Array.init(7, null, UnityEngine.UI.Text);
                this.lastBuilt = -1;
                this.lastPart = -1;
                this.lastBlock = -1;
                this.installPointer = -99;
            }
        },
        methods: {
            /*BuildProgressUI.Initialize start.*/
            Initialize: function (gameController) {
if ( TRACE ) { TRACE( "BuildProgressUI#Initialize", this ); }

                var $t, $t1;
                this.controller = gameController;
                if (UnityEngine.Component.op_Equality(this.canvasRoot, null) || UnityEngine.Component.op_Equality(this.fill, null) || UnityEngine.MonoBehaviour.op_Equality(this.count, null)) {
                    UnityEngine.Debug.LogError$2("Assign the saved Gameplay UI references on BuildProgressUI.", this);
                    this.enabled = false;
                    return;
                }
                this.lastBuilt = (this.lastPart = -1);
                $t = Bridge.getEnumerator(this.blockItems);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        item.blocks = new (System.Collections.Generic.List$1(BuildBlock)).ctor();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                for (var p = 0; p < this.controller.PartCount; p = (p + 1) | 0) {
                    $t1 = Bridge.getEnumerator(this.controller.GetPart(p).blocks);
                    try {
                        while ($t1.moveNext()) {
                            var block = $t1.Current;
                            for (var g = 0; g < this.blockItems.length; g = (g + 1) | 0) {
                                if (BuildProgressUI.Matches(this.blockItems[g], block.type)) {
                                    this.blockItems[g].blocks.add(block);
                                    break;
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                }
                this.Refresh();
            },
            /*BuildProgressUI.Initialize end.*/

            /*BuildProgressUI.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BuildProgressUI#Update", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.controller, null) || UnityEngine.Component.op_Equality(this.canvasRoot, null)) {
                    return;
                }
                if (this.lastBuilt !== this.controller.BuiltBlocks || this.lastPart !== this.controller.CurrentPartIndex || this.lastBlock !== this.controller.CurrentBlockIndex) {
                    this.Refresh();
                }
            },
            /*BuildProgressUI.Update end.*/

            /*BuildProgressUI.Refresh start.*/
            Refresh: function () {
if ( TRACE ) { TRACE( "BuildProgressUI#Refresh", this ); }

                var $t;
                if (UnityEngine.MonoBehaviour.op_Equality(this.controller, null)) {
                    return;
                }
                this.lastBuilt = this.controller.BuiltBlocks;
                this.lastPart = this.controller.CurrentPartIndex;
                this.lastBlock = this.controller.CurrentBlockIndex;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.title, null)) {
                    this.title.text = this.controller.IsComplete ? "BUILD COMPLETE!" : "DOG SHELTER";
                }
                this.count.text = this.controller.BuiltBlocks + "/" + this.controller.TotalBlocks;
                var progress = this.controller.TotalBlocks > 0 ? this.controller.BuiltBlocks / this.controller.TotalBlocks : 0;
                this.fill.localScale = new pc.Vec3( progress, 1, 1 );
                this.fill.gameObject.SetActive(progress > 0);
                var active = -1;
                var current = this.controller.GetPart(this.controller.CurrentPartIndex);
                if (current != null && this.lastBlock >= 0 && this.lastBlock < current.blocks.Count) {
                    for (var g = 0; g < this.blockItems.length; g = (g + 1) | 0) {
                        if (BuildProgressUI.Matches(this.blockItems[g], current.blocks.getItem(this.lastBlock).type)) {
                            active = g;
                            break;
                        }
                    }
                }
                var page = Bridge.Int.mul(((Bridge.Int.div(UnityEngine.Mathf.Max(0, active), 7)) | 0), 7);
                for (var index = 0; index < this.blockItems.length; index = (index + 1) | 0) {
                    this.slots[index].gameObject.SetActive(index >= page && index < ((page + 7) | 0));
                    var item = this.blockItems[index];
                    var remaining = 0;
                    $t = Bridge.getEnumerator(item.blocks);
                    try {
                        while ($t.moveNext()) {
                            var block = $t.Current;
                            if (!block.built) {
                                remaining = (remaining + 1) | 0;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    this.slots[index].GetComponent(UnityEngine.UI.Image).color = index === active ? new pc.Color( 1, 1, 1, 1 ) : new pc.Color( 1, 1, 1, 0.25 );
                    this.blockImages[index].color = remaining > 0 ? new pc.Color( 1, 1, 1, 1 ) : new pc.Color( 1, 1, 1, 0.35 );
                    this.amounts[index].text = Bridge.toString(remaining);
                }
            },
            /*BuildProgressUI.Refresh end.*/

            /*BuildProgressUI.BeginPointer start.*/
            BeginPointer: function (id, position) {
if ( TRACE ) { TRACE( "BuildProgressUI#BeginPointer", this ); }

                for (var i = 0; i < this.slots.length; i = (i + 1) | 0) {
                    if (CraftHudStyle.Hit(this.slots[i], position)) {
                        if (this.slotPointer === -99) {
                            this.slotPointer = id;
                            this.pressedSlot = i;
                            this.slotPressPosition = position.$clone();
                        }
                        return true;
                    }
                }
                if (CraftHudStyle.Hit(this.install, position)) {
                    if (this.installPointer === -99) {
                        this.installPointer = id;
                    }
                    return true;
                }
                return CraftHudStyle.Hit(this.logo, position) || CraftHudStyle.Hit(this.bar, position) || CraftHudStyle.Hit(this.building, position) || CraftHudStyle.Hit(this.inventory, position);
            },
            /*BuildProgressUI.BeginPointer end.*/

            /*BuildProgressUI.EndPointer start.*/
            EndPointer: function (id, position, canceled) {
if ( TRACE ) { TRACE( "BuildProgressUI#EndPointer", this ); }

                if (id === this.slotPointer) {
                    var index = this.pressedSlot;
                    this.slotPointer = -99;
                    this.pressedSlot = -1;
                    if (!canceled && index >= 0 && (position.$clone().sub( this.slotPressPosition )).lengthSq() <= 144.0 && CraftHudStyle.Hit(this.slots[index], position)) {
                        if (UnityEngine.MonoBehaviour.op_Inequality(this.controller, null) && index < this.blockItems.length) {
                            this.controller.SelectBlockTypes(this.blockItems[index].types);
                        }
                        !Bridge.staticEquals(this.BlockSlotClicked, null) ? this.BlockSlotClicked() : null;
                    }
                }
                if (id !== this.installPointer) {
                    return;
                }
                this.installPointer = -99;
                if (canceled || !CraftHudStyle.Hit(this.install, position)) {
                    return;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(LunaController.Active, null)) {
                    LunaController.Active.ShowEndCard();
                }
            },
            /*BuildProgressUI.EndPointer end.*/


        }
    });
    /*BuildProgressUI end.*/

    /*BuildProgressUI+BlockItem start.*/
    Bridge.define("BuildProgressUI.BlockItem", {
        $kind: 1002,
        fields: {
            label: null,
            types: null,
            blocks: null
        }
    });
    /*BuildProgressUI+BlockItem end.*/

    /*BuildTapTutorial start.*/
    /**
     * Animates existing scene tutorial UI; no runtime UI creation.
     *
     * @public
     * @class BuildTapTutorial
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildTapTutorial", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            controller: null,
            view: null,
            container: null,
            hand: null,
            visuals: null,
            idleSeconds: 0,
            lastInput: 0,
            shownAt: 0,
            showing: false,
            lastPart: 0,
            lastBlock: 0
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildTapTutorial#init", this ); }

                this.idleSeconds = 5.0;
                this.lastPart = -1;
                this.lastBlock = -1;
            }
        },
        methods: {
            /*BuildTapTutorial.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "BuildTapTutorial#OnEnable", this ); }

                this.lastInput = UnityEngine.Time.unscaledTime - this.idleSeconds;
                this.shownAt = UnityEngine.Time.unscaledTime;
                this.lastPart = (this.lastBlock = -1);
                if (UnityEngine.MonoBehaviour.op_Inequality(this.controller, null)) {
                    this.controller.addGuideBuildAccepted(Bridge.fn.cacheBind(this, this.OnGuideClicked));
                }
            },
            /*BuildTapTutorial.OnEnable end.*/

            /*BuildTapTutorial.OnGuideClicked start.*/
            OnGuideClicked: function () {
if ( TRACE ) { TRACE( "BuildTapTutorial#OnGuideClicked", this ); }

                this.lastInput = UnityEngine.Time.unscaledTime;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.visuals, null)) {
                    this.SetVisible(false);
                }
            },
            /*BuildTapTutorial.OnGuideClicked end.*/

            /*BuildTapTutorial.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "BuildTapTutorial#LateUpdate", this ); }

                var $t;
                if (UnityEngine.MonoBehaviour.op_Equality(this.controller, null) || UnityEngine.Component.op_Equality(this.view, null) || UnityEngine.Component.op_Equality(this.container, null) || UnityEngine.Component.op_Equality(this.hand, null) || UnityEngine.MonoBehaviour.op_Equality(this.visuals, null)) {
                    return;
                }
                var targetChanged = this.lastPart !== this.controller.CurrentPartIndex || this.lastBlock !== this.controller.CurrentBlockIndex;
                if (targetChanged) {
                    this.lastPart = this.controller.CurrentPartIndex;
                    this.lastBlock = this.controller.CurrentBlockIndex;
                    this.shownAt = UnityEngine.Time.unscaledTime;
                }
                var target = { v : new UnityEngine.Vector3() };
                var visible = !this.controller.IsComplete && UnityEngine.Time.unscaledTime - this.lastInput >= this.idleSeconds && this.controller.TryGetGuidePosition(target);
                if (!visible) {
                    this.SetVisible(false);
                    return;
                }
                this.controller.TryGetGuidePosition(target);
                var screen = this.view.WorldToScreenPoint(target.v);
                if (screen.z <= 0 || screen.x < 0 || screen.x > UnityEngine.Screen.width || screen.y < 0 || screen.y > UnityEngine.Screen.height) {
                    this.SetVisible(false);
                    return;
                }
                this.SetVisible(true);
                var local = { v : new UnityEngine.Vector2() };
                UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.container, UnityEngine.Vector2.FromVector3(screen), null, local);
                var phase = ($t = UnityEngine.Time.unscaledTime - this.shownAt, $t - Math.floor($t / 1.2) * 1.2) / 1.2;
                var press = phase < 0.5 ? 1 - pc.math.smoothstep(0, 1, phase * 2) : pc.math.smoothstep(0, 1, (phase - 0.5) * 2);
                this.hand.anchoredPosition = local.v.$clone().add( new pc.Vec2( 12, -16 ).scale( (1 - press) ) );
                this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( pc.math.lerp(1, 0.9, press) );
            },
            /*BuildTapTutorial.LateUpdate end.*/

            /*BuildTapTutorial.SetVisible start.*/
            SetVisible: function (value) {
if ( TRACE ) { TRACE( "BuildTapTutorial#SetVisible", this ); }

                if (value && !this.showing) {
                    this.shownAt = UnityEngine.Time.unscaledTime;
                }
                this.showing = value;
                this.visuals.alpha = value ? 1 : 0;
            },
            /*BuildTapTutorial.SetVisible end.*/

            /*BuildTapTutorial.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "BuildTapTutorial#OnDisable", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.controller, null)) {
                    this.controller.removeGuideBuildAccepted(Bridge.fn.cacheBind(this, this.OnGuideClicked));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.visuals, null)) {
                    this.visuals.alpha = 0;
                }
                this.showing = false;
            },
            /*BuildTapTutorial.OnDisable end.*/


        }
    });
    /*BuildTapTutorial end.*/

    /*BuildTouchControls start.*/
    /**
     * Input/state only; all controls are authored and saved in the scene.
     *
     * @public
     * @class BuildTouchControls
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("BuildTouchControls", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            Movement: null,
            Flying: false,
            ThirdPerson: false,
            JustLanded: false,
            stickId: 0,
            upId: 0,
            downId: 0,
            stick: null,
            knob: null,
            fly: null,
            up: null,
            down: null,
            exit: null,
            viewButton: null
        },
        events: {
            FlyClicked: null
        },
        props: {
            Vertical: {
                get: function () {
if ( TRACE ) { TRACE( "BuildTouchControls#Vertical#get", this ); }

                    return (((this.upId !== -99 ? 1 : 0) - (this.downId !== -99 ? 1 : 0)) | 0);
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "BuildTouchControls#init", this ); }

                this.Movement = new UnityEngine.Vector2();
                this.stickId = -99;
                this.upId = -99;
                this.downId = -99;
            }
        },
        methods: {
            /*BuildTouchControls.Initialize start.*/
            Initialize: function () {
if ( TRACE ) { TRACE( "BuildTouchControls#Initialize", this ); }

                if (UnityEngine.Component.op_Equality(this.stick, null) || UnityEngine.Component.op_Equality(this.knob, null) || UnityEngine.Component.op_Equality(this.fly, null) || UnityEngine.Component.op_Equality(this.up, null) || UnityEngine.Component.op_Equality(this.down, null) || UnityEngine.Component.op_Equality(this.exit, null)) {
                    UnityEngine.Debug.LogError$2("Assign saved UI controls in the scene.", this);
                    this.enabled = false;
                    return;
                }
                this.ThirdPerson = false;
                this.ResetInput();
                this.SetFlight(false);
            },
            /*BuildTouchControls.Initialize end.*/

            /*BuildTouchControls.Update start.*/
            Update: function () {
if ( TRACE ) { TRACE( "BuildTouchControls#Update", this ); }

                if (UnityEngine.Component.op_Inequality(this.knob, null) && UnityEngine.Component.op_Inequality(this.stick, null)) {
                    this.knob.anchoredPosition = this.Movement.$clone().scale( (this.stick.rect.width * 0.3) );
                }
            },
            /*BuildTouchControls.Update end.*/

            /*BuildTouchControls.Begin start.*/
            Begin: function (id, p) {
if ( TRACE ) { TRACE( "BuildTouchControls#Begin", this ); }

                if (CraftHudStyle.Hit(this.viewButton, p)) {
                    this.ThirdPerson = !this.ThirdPerson;
                    return true;
                }
                if (CraftHudStyle.Hit(this.stick, p)) {
                    if (this.stickId === -99) {
                        this.stickId = id;
                        this.Move(id, p);
                    }
                    return true;
                }
                if (CraftHudStyle.Hit(this.fly, p)) {
                    this.SetFlight(true);
                    !Bridge.staticEquals(this.FlyClicked, null) ? this.FlyClicked() : null;
                    return true;
                }
                if (CraftHudStyle.Hit(this.exit, p)) {
                    this.SetFlight(false);
                    this.JustLanded = true;
                    return true;
                }
                if (CraftHudStyle.Hit(this.up, p)) {
                    if (this.upId === -99) {
                        this.upId = id;
                    }
                    return true;
                }
                if (CraftHudStyle.Hit(this.down, p)) {
                    if (this.downId === -99) {
                        this.downId = id;
                    }
                    return true;
                }
                return false;
            },
            /*BuildTouchControls.Begin end.*/

            /*BuildTouchControls.Move start.*/
            Move: function (id, p) {
if ( TRACE ) { TRACE( "BuildTouchControls#Move", this ); }

                if (id !== this.stickId) {
                    return;
                }
                var local = { v : new UnityEngine.Vector2() };
                if (UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(this.stick, p, null, local)) {
                    this.Movement = pc.Vec2.lengthClamp( (local.v.$clone().sub( this.stick.rect.center )).scale( 1.0 / ( (this.stick.rect.width * 0.3) ) ), 1 );
                }
            },
            /*BuildTouchControls.Move end.*/

            /*BuildTouchControls.End start.*/
            End: function (id) {
if ( TRACE ) { TRACE( "BuildTouchControls#End", this ); }

                if (id === this.stickId) {
                    this.stickId = -99;
                    this.Movement = pc.Vec2.ZERO.clone();
                }
                if (id === this.upId) {
                    this.upId = -99;
                }
                if (id === this.downId) {
                    this.downId = -99;
                }
            },
            /*BuildTouchControls.End end.*/

            /*BuildTouchControls.SetFlight start.*/
            SetFlight: function (value) {
if ( TRACE ) { TRACE( "BuildTouchControls#SetFlight", this ); }

                this.Flying = value;
                this.upId = (this.downId = -99);
                this.fly.gameObject.SetActive(!value);
                this.up.gameObject.SetActive(value);
                this.down.gameObject.SetActive(value);
                this.exit.gameObject.SetActive(value);
            },
            /*BuildTouchControls.SetFlight end.*/

            /*BuildTouchControls.ResetInput start.*/
            ResetInput: function () {
if ( TRACE ) { TRACE( "BuildTouchControls#ResetInput", this ); }

                this.stickId = (this.upId = (this.downId = -99));
                this.Movement = pc.Vec2.ZERO.clone();
                this.JustLanded = false;
            },
            /*BuildTouchControls.ResetInput end.*/

            /*BuildTouchControls.AcknowledgeLanding start.*/
            AcknowledgeLanding: function () {
if ( TRACE ) { TRACE( "BuildTouchControls#AcknowledgeLanding", this ); }

                this.JustLanded = false;
            },
            /*BuildTouchControls.AcknowledgeLanding end.*/


        }
    });
    /*BuildTouchControls end.*/

    /*CraftHudStyle start.*/
    Bridge.define("CraftHudStyle", {
        statics: {
            props: {
                SafeArea: {
                    get: function () {
if ( TRACE ) { TRACE( "CraftHudStyle#SafeArea#get", this ); }

                        return new UnityEngine.Rect.$ctor1(0, 0, UnityEngine.Screen.width, UnityEngine.Screen.height);
                    }
                }
            },
            methods: {
                /*CraftHudStyle.Hit:static start.*/
                Hit: function (rect, position) {
if ( TRACE ) { TRACE( "CraftHudStyle#Hit", this ); }

                    return UnityEngine.Component.op_Inequality(rect, null) && rect.gameObject.activeInHierarchy && UnityEngine.RectTransformUtility.RectangleContainsScreenPoint$1(rect, position, null);
                },
                /*CraftHudStyle.Hit:static end.*/


            }
        }
    });
    /*CraftHudStyle end.*/

    /*CraftRain start.*/
    /**
     * Texture-free rain: one reusable mesh, no physics or particle-system dependency.
     *
     * @public
     * @class CraftRain
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("CraftRain", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                DropCount: 0,
                SplashCount: 0,
                QuadCount: 0
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "CraftRain#init", this ); }

                    this.DropCount = 80;
                    this.SplashCount = 20;
                    this.QuadCount = 120;
                }
            },
            methods: {
                /*CraftRain.Create:static start.*/
                Create: function (camera) {
if ( TRACE ) { TRACE( "CraftRain#Create", this ); }

                    var rain = new UnityEngine.GameObject.$ctor2("Craft Rain").AddComponent(CraftRain);
                    rain.view = camera;
                    rain.Initialize();
                },
                /*CraftRain.Create:static end.*/


            }
        },
        fields: {
            drops: null,
            splashes: null,
            ages: null,
            vertices: null,
            view: null,
            mesh: null,
            material: null,
            splashCursor: 0,
            random: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "CraftRain#init", this ); }

                this.drops = System.Array.init(CraftRain.DropCount, function (){
                    return new UnityEngine.Vector3();
                }, UnityEngine.Vector3);
                this.splashes = System.Array.init(CraftRain.SplashCount, function (){
                    return new UnityEngine.Vector3();
                }, UnityEngine.Vector3);
                this.ages = System.Array.init(CraftRain.SplashCount, 0, System.Single);
                this.vertices = System.Array.init(480, function (){
                    return new UnityEngine.Vector3();
                }, UnityEngine.Vector3);
                this.random = new System.Random.$ctor1(713);
            }
        },
        methods: {
            /*CraftRain.Initialize start.*/
            Initialize: function () {
if ( TRACE ) { TRACE( "CraftRain#Initialize", this ); }

                var $t;
                this.mesh = ($t = new UnityEngine.Mesh.ctor(), $t.name = "Rain and Splash Batch", $t);
                this.mesh.MarkDynamic();
                this.mesh.vertices = this.vertices;
                var triangles = System.Array.init(720, 0, System.Int32);
                for (var i = 0; i < CraftRain.QuadCount; i = (i + 1) | 0) {
                    var v = Bridge.Int.mul(i, 4), t = Bridge.Int.mul(i, 6);
                    triangles[t] = v;
                    triangles[((t + 1) | 0)] = (v + 1) | 0;
                    triangles[((t + 2) | 0)] = (v + 2) | 0;
                    triangles[((t + 3) | 0)] = v;
                    triangles[((t + 4) | 0)] = (v + 2) | 0;
                    triangles[((t + 5) | 0)] = (v + 3) | 0;
                }
                this.mesh.triangles = triangles;
                this.gameObject.AddComponent(UnityEngine.MeshFilter).sharedMesh = this.mesh;
                this.material = GameplayMaterials.Create(false, true);
                // Serialized, vertex-only shader: the rain mesh intentionally has no UVs or normals.
                this.material.color = new pc.Color( 0.28, 0.61, 0.91, 0.65 );
                var renderer = this.gameObject.AddComponent(UnityEngine.MeshRenderer);
                renderer.sharedMaterial = this.material;
                renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                renderer.receiveShadows = false;
                for (var i1 = 0; i1 < CraftRain.DropCount; i1 = (i1 + 1) | 0) {
                    this.ResetDrop(i1, true);
                }
                for (var i2 = 0; i2 < CraftRain.SplashCount; i2 = (i2 + 1) | 0) {
                    this.ages[i2] = 1;
                }
            },
            /*CraftRain.Initialize end.*/

            /*CraftRain.Random01 start.*/
            Random01: function () {
if ( TRACE ) { TRACE( "CraftRain#Random01", this ); }

                return this.random.NextDouble();
            },
            /*CraftRain.Random01 end.*/

            /*CraftRain.ResetDrop start.*/
            ResetDrop: function (i, initial) {
if ( TRACE ) { TRACE( "CraftRain#ResetDrop", this ); }

                var center = this.view.transform.position.$clone().add( this.view.transform.forward.$clone().clone().scale( 4 ) );
                var x = 0, z = 0;
                // Only rain over the open flat clearing, not through the house or distant trees.
                for (var attempt = 0; attempt < 24; attempt = (attempt + 1) | 0) {
                    x = Math.max(-7.5, Math.min(center.x + (this.Random01() - 0.5) * 16, 7.5));
                    z = Math.max(-10, Math.min(center.z + (this.Random01() - 0.5) * 16, 7.5));
                    if (!(x > -3.2 && x < 3.2 && z > -1.2 && z < 3.2)) {
                        break;
                    }
                }
                if (x > -3.2 && x < 3.2 && z > -1.2 && z < 3.2) {
                    z = -2;
                }
                this.drops[i] = new pc.Vec3( x, initial ? this.Random01() * 7 : 7 + this.Random01(), z );
            },
            /*CraftRain.ResetDrop end.*/

            /*CraftRain.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "CraftRain#LateUpdate", this ); }

                if (UnityEngine.Component.op_Equality(this.view, null) || this.mesh == null) {
                    return;
                }
                var dt = UnityEngine.Mathf.Min(UnityEngine.Time.deltaTime, 0.05);
                var right = this.view.transform.right.$clone();
                for (var i = 0; i < CraftRain.DropCount; i = (i + 1) | 0) {
                    this.drops[i] = this.drops[i].$clone().add( pc.Vec3.DOWN.clone().clone().scale( (6.5 * dt) ) );
                    if (this.drops[i].y <= 0.03) {
                        this.splashes[this.splashCursor] = new pc.Vec3( this.drops[i].x, 0.035, this.drops[i].z );
                        this.ages[this.splashCursor] = 0;
                        this.splashCursor = (((this.splashCursor + 1) | 0)) % CraftRain.SplashCount;
                        this.ResetDrop(i, false);
                    }
                    this.Quad(i, this.drops[i], this.drops[i].$clone().add( pc.Vec3.UP.clone().clone().scale( 0.23 ) ), right.$clone().clone().scale( 0.007 ));
                }
                for (var i1 = 0; i1 < CraftRain.SplashCount; i1 = (i1 + 1) | 0) {
                    this.ages[i1] += dt;
                    var life = Math.max(0, Math.min(1, this.ages[i1] / 0.28));
                    var spread = 0.035 + life * 0.1;
                    var p = this.splashes[i1].$clone();
                    var tip = pc.Vec3.UP.clone().clone().scale( (0.1 * (1 - life)) );
                    var width = this.view.transform.up.$clone().clone().scale( (0.012 * (1 - life)) );
                    this.Quad(((CraftRain.DropCount + Bridge.Int.mul(i1, 2)) | 0), p, p.$clone().sub( right.$clone().clone().scale( spread ) ).add( tip ), width);
                    this.Quad(((((CraftRain.DropCount + Bridge.Int.mul(i1, 2)) | 0) + 1) | 0), p, p.$clone().add( right.$clone().clone().scale( spread ) ).add( tip ), width);
                }
                this.mesh.vertices = this.vertices;
                this.mesh.RecalculateBounds();
            },
            /*CraftRain.LateUpdate end.*/

            /*CraftRain.Quad start.*/
            Quad: function (index, a, b, halfWidth) {
if ( TRACE ) { TRACE( "CraftRain#Quad", this ); }

                var v = Bridge.Int.mul(index, 4);
                this.vertices[v] = a.$clone().sub( halfWidth );
                this.vertices[((v + 1) | 0)] = b.$clone().sub( halfWidth );
                this.vertices[((v + 2) | 0)] = b.$clone().add( halfWidth );
                this.vertices[((v + 3) | 0)] = a.$clone().add( halfWidth );
            },
            /*CraftRain.Quad end.*/

            /*CraftRain.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "CraftRain#OnDestroy", this ); }

                if (this.mesh != null) {
                    UnityEngine.Object.Destroy(this.mesh);
                }
                if (this.material != null) {
                    UnityEngine.Object.Destroy(this.material);
                }
            },
            /*CraftRain.OnDestroy end.*/


        }
    });
    /*CraftRain end.*/

    /*GameController start.*/
    /**
     * Coordinates blueprint progress and places completed blocks.
     *
     * @public
     * @class GameController
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("GameController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            parts: null,
            createSampleBlueprintWhenEmpty: false,
            buildingOrigin: null,
            playerCamera: null,
            cameraController: null,
            blockPlacer: null,
            progressUI: null,
            adjacentPreviews: null,
            completionFireworks: null,
            partIndex: 0,
            totalBlocks: 0,
            builtBlocks: 0,
            guide: null,
            buildRoutine: null,
            selectedBlockTypes: null,
            audioController: null
        },
        events: {
            GuideBuildAccepted: null
        },
        props: {
            BuiltBlocks: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#BuiltBlocks#get", this ); }

                    return this.builtBlocks;
                }
            },
            TotalBlocks: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#TotalBlocks#get", this ); }

                    return this.totalBlocks;
                }
            },
            CurrentPartIndex: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#CurrentPartIndex#get", this ); }

                    return this.partIndex;
                }
            },
            CurrentBlockIndex: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#CurrentBlockIndex#get", this ); }

                    return UnityEngine.MonoBehaviour.op_Inequality(this.guide, null) ? this.guide.SelectedIndex : -1;
                }
            },
            PartCount: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#PartCount#get", this ); }

                    return this.parts.Count;
                }
            },
            CurrentPartName: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#CurrentPartName#get", this ); }

                    return this.partIndex >= 0 && this.partIndex < this.parts.Count ? this.parts.getItem(this.partIndex).name : "Complete";
                }
            },
            IsComplete: {
                get: function () {
if ( TRACE ) { TRACE( "GameController#IsComplete#get", this ); }

                    return this.totalBlocks > 0 && this.builtBlocks === this.totalBlocks;
                }
            }
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "GameController#init", this ); }

                this.parts = new (System.Collections.Generic.List$1(BuildingPart)).ctor();
                this.createSampleBlueprintWhenEmpty = true;
            }
        },
        methods: {
            /*GameController.GetPart start.*/
            GetPart: function (index) {
if ( TRACE ) { TRACE( "GameController#GetPart", this ); }

                return index >= 0 && index < this.parts.Count ? this.parts.getItem(index) : null;
            },
            /*GameController.GetPart end.*/

            /*GameController.TryGetGuidePosition start.*/
            TryGetGuidePosition: function (position) {
if ( TRACE ) { TRACE( "GameController#TryGetGuidePosition", this ); }

                position.v = pc.Vec3.ZERO.clone();
                if (UnityEngine.MonoBehaviour.op_Equality(this.guide, null) || !this.guide.Visible || this.buildRoutine != null || this.IsComplete) {
                    return false;
                }
                position.v = this.guide.TargetPosition.$clone();
                return true;
            },
            /*GameController.TryGetGuidePosition end.*/

            /*GameController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "GameController#Start", this ); }

                var $t, $t1;
                this.audioController = this.GetComponent(AudioController);
                var materialLibrary = this.GetComponent(GameplayMaterials);
                if (UnityEngine.MonoBehaviour.op_Equality(materialLibrary, null)) {
                    UnityEngine.Debug.LogError$2("Missing GameplayMaterials on controller.", this);
                    this.enabled = false;
                    return;
                }
                materialLibrary.Initialize();
                if (UnityEngine.Component.op_Equality(this.playerCamera, null)) {
                    this.playerCamera = UnityEngine.Camera.main;
                }
                if (UnityEngine.Component.op_Equality(this.playerCamera, null)) {
                    UnityEngine.Debug.LogError$2("Building gameplay needs a Camera.", this);
                    this.enabled = false;
                    return;
                }

                var usingSample = this.parts.Count === 0 && this.createSampleBlueprintWhenEmpty;
                if (usingSample) {
                    this.parts = SampleBuildingBlueprint.Create();
                }
                $t = Bridge.getEnumerator(this.parts);
                try {
                    while ($t.moveNext()) {
                        var part = $t.Current;
                        $t1 = Bridge.getEnumerator(part.blocks);
                        try {
                            while ($t1.moveNext()) {
                                var block = $t1.Current;
                                block.built = false;
                                this.totalBlocks = (this.totalBlocks + 1) | 0;
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

                if (UnityEngine.MonoBehaviour.op_Equality(this.blockPlacer, null)) {
                    this.blockPlacer = this.GetComponent(BuildBlockPlacer);
                }
                if (UnityEngine.MonoBehaviour.op_Equality(this.blockPlacer, null)) {
                    this.blockPlacer = this.gameObject.AddComponent(BuildBlockPlacer);
                }
                this.blockPlacer.Initialize();

                var guideObject = new UnityEngine.GameObject.$ctor2("Build Guides");
                this.guide = guideObject.AddComponent(BuildGuide);
                this.guide.Initialize();

                if (UnityEngine.MonoBehaviour.op_Equality(this.adjacentPreviews, null)) {
                    this.adjacentPreviews = this.GetComponent(AdjacentBlockPreviews);
                }
                if (UnityEngine.MonoBehaviour.op_Equality(this.adjacentPreviews, null)) {
                    this.adjacentPreviews = this.gameObject.AddComponent(AdjacentBlockPreviews);
                }

                if (usingSample) {
                    this.playerCamera.transform.position = new pc.Vec3( 0.0, 2.7, -8.0 );
                    this.playerCamera.transform.LookAt$2(new pc.Vec3( 0.0, 1.0, 2.0 ));
                    CraftRain.Create(this.playerCamera);
                }

                if (UnityEngine.MonoBehaviour.op_Equality(this.cameraController, null)) {
                    this.cameraController = this.GetComponent(BuildCameraController);
                }
                if (UnityEngine.MonoBehaviour.op_Equality(this.cameraController, null)) {
                    this.cameraController = this.gameObject.AddComponent(BuildCameraController);
                }
                this.cameraController.Initialize(this.playerCamera, this.guide);
                this.cameraController.addGuideClicked(Bridge.fn.cacheBind(this, this.HandleGuideClicked));
                if (UnityEngine.MonoBehaviour.op_Equality(this.progressUI, null)) {
                    this.progressUI = this.GetComponent(BuildProgressUI);
                }
                if (UnityEngine.MonoBehaviour.op_Equality(this.progressUI, null)) {
                    UnityEngine.Debug.LogError$2("Missing scene BuildProgressUI. Assign the saved Gameplay UI.", this);
                    this.enabled = false;
                    return;
                }
                this.progressUI.Initialize(this);
                this.SelectGuide(true);
            },
            /*GameController.Start end.*/

            /*GameController.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "GameController#LateUpdate", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.guide, null) && this.buildRoutine == null) {
                    this.SelectGuide(false);
                }
            },
            /*GameController.LateUpdate end.*/

            /*GameController.HandleGuideClicked start.*/
            HandleGuideClicked: function (selectedPart, blockIndex) {
if ( TRACE ) { TRACE( "GameController#HandleGuideClicked", this ); }

                if (this.buildRoutine == null && selectedPart >= 0 && selectedPart < this.parts.Count && blockIndex >= 0 && blockIndex < this.parts.getItem(selectedPart).blocks.Count && !this.parts.getItem(selectedPart).blocks.getItem(blockIndex).built) {
                    !Bridge.staticEquals(this.GuideBuildAccepted, null) ? this.GuideBuildAccepted() : null;
                    this.buildRoutine = this.StartCoroutine$1(this.TurnAndBuild(selectedPart, blockIndex));
                }
            },
            /*GameController.HandleGuideClicked end.*/

            /*GameController.TurnAndBuild start.*/
            TurnAndBuild: function (selectedPart, selectedBlock) {
if ( TRACE ) { TRACE( "GameController#TurnAndBuild", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    block,
                    bounds,
                    lookAt,
                    house,
                    first,
                    $t,
                    part,
                    $t1,
                    piece,
                    b,
                    launch,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this.cameraController.InputEnabled = false;
                                        block = this.parts.getItem(selectedPart).blocks.getItem(selectedBlock);
                                        bounds = SampleBlockVisuals.GetLocalBounds(block);
                                        lookAt = UnityEngine.Component.op_Inequality(this.buildingOrigin, null) ? this.buildingOrigin.TransformPoint$1(block.localPosition.$clone().add( bounds.center )) : block.localPosition.$clone().add( bounds.center );
                                        $enumerator.current = this.cameraController.TurnTo(lookAt);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    if (!block.built) {
                                            this.blockPlacer.Place(block, this.buildingOrigin, this.parts.getItem(selectedPart).name);
                                            block.built = true;
                                            this.builtBlocks = (this.builtBlocks + 1) | 0;
                                            if (UnityEngine.MonoBehaviour.op_Inequality(this.audioController, null)) {
                                                this.audioController.PlayBlockPlaced();
                                            }
                                            this.adjacentPreviews.ShowAdjacent(this.parts, block, this.buildingOrigin);
                                            if (this.IsComplete && UnityEngine.MonoBehaviour.op_Inequality(this.completionFireworks, null)) {
                                                house = new pc.BoundingBox.ctor();
                                                first = true;
                                                $t = Bridge.getEnumerator(this.parts);
                                                try {
                                                    while ($t.moveNext()) {
                                                        part = $t.Current;
                                                        $t1 = Bridge.getEnumerator(part.blocks);
                                                        try {
                                                            while ($t1.moveNext()) {
                                                                piece = $t1.Current;
                                                                b = SampleBlockVisuals.GetLocalBounds(piece);
                                                                b.center = b.center.$clone().add( piece.localPosition.$clone() );
                                                                if (first) {
                                                                    house = b;
                                                                    first = false;
                                                                } else {
                                                                    house.add( b );
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
                                                launch = new pc.Vec3( house.center.x, house.max.y + 0.15, house.center.z );
                                                if (UnityEngine.Component.op_Inequality(this.buildingOrigin, null)) {
                                                    launch = this.buildingOrigin.TransformPoint$1(launch);
                                                }
                                                this.completionFireworks.PlayOnce(launch, this.playerCamera);
                                            }
                                        }
                                        this.SelectGuide(true);
                                        this.cameraController.InputEnabled = true;
                                        this.buildRoutine = null;

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
            /*GameController.TurnAndBuild end.*/

            /*GameController.SelectGuide start.*/
            SelectGuide: function (force) {
if ( TRACE ) { TRACE( "GameController#SelectGuide", this ); }

                if (this.IsComplete) {
                    this.partIndex = this.parts.Count;
                    this.guide.Hide();
                    return;
                }
                if (this.selectedBlockTypes != null && !this.HasUnbuiltType(this.selectedBlockTypes)) {
                    this.selectedBlockTypes = null;
                }
                this.guide.ShowBest(this.parts, this.playerCamera, this.buildingOrigin, force, this.selectedBlockTypes);
                this.partIndex = this.guide.SelectedPartIndex;
            },
            /*GameController.SelectGuide end.*/

            /*GameController.SelectBlockTypes start.*/
            SelectBlockTypes: function (types) {
if ( TRACE ) { TRACE( "GameController#SelectBlockTypes", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(this.guide, null) || this.buildRoutine != null || this.IsComplete || types == null || !this.HasUnbuiltType(types) || (UnityEngine.MonoBehaviour.op_Inequality(LunaController.Active, null) && LunaController.Active.IsCTAActive)) {
                    return false;
                }
                this.selectedBlockTypes = types;
                this.SelectGuide(true);
                if (this.guide.Visible) {
                    this.buildRoutine = this.StartCoroutine$1(this.FocusSelectedGuide());
                }
                return this.guide.Visible;
            },
            /*GameController.SelectBlockTypes end.*/

            /*GameController.HasUnbuiltType start.*/
            HasUnbuiltType: function (types) {
if ( TRACE ) { TRACE( "GameController#HasUnbuiltType", this ); }

                var $t, $t1, $t2;
                $t = Bridge.getEnumerator(this.parts);
                try {
                    while ($t.moveNext()) {
                        var part = $t.Current;
                        $t1 = Bridge.getEnumerator(part.blocks);
                        try {
                            while ($t1.moveNext()) {
                                var block = $t1.Current;
                                if (!block.built) {
                                    $t2 = Bridge.getEnumerator(types);
                                    try {
                                        while ($t2.moveNext()) {
                                            var type = $t2.Current;
                                            if (Bridge.referenceEquals(block.type, type)) {
                                                return true;
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
                return false;
            },
            /*GameController.HasUnbuiltType end.*/

            /*GameController.FocusSelectedGuide start.*/
            FocusSelectedGuide: function () {
if ( TRACE ) { TRACE( "GameController#FocusSelectedGuide", this ); }

                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this.cameraController.InputEnabled = false;
                                        $enumerator.current = this.cameraController.TurnTo(this.guide.TargetPosition);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.cameraController.InputEnabled = true;
                                        this.buildRoutine = null;

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
            /*GameController.FocusSelectedGuide end.*/

            /*GameController.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "GameController#OnDestroy", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.cameraController, null)) {
                    this.cameraController.removeGuideClicked(Bridge.fn.cacheBind(this, this.HandleGuideClicked));
                }
            },
            /*GameController.OnDestroy end.*/


        }
    });
    /*GameController end.*/

    /*GameplayMaterials start.*/
    /**
     * Serialized material dependencies keep runtime shaders in playable exports.
     *
     * @public
     * @class GameplayMaterials
     * @augments UnityEngine.MonoBehaviour
     */
    Bridge.define("GameplayMaterials", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                active: null
            },
            methods: {
                /*GameplayMaterials.Create:static start.*/
                Create: function (transparentSurface, unlitSurface) {
if ( TRACE ) { TRACE( "GameplayMaterials#Create", this ); }

                    if (transparentSurface === void 0) { transparentSurface = false; }
                    if (unlitSurface === void 0) { unlitSurface = false; }
                    if (UnityEngine.MonoBehaviour.op_Equality(GameplayMaterials.active, null)) {
                        throw new System.InvalidOperationException.$ctor1("GameplayMaterials is not initialized.");
                    }
                    var template = unlitSurface ? GameplayMaterials.active.unlit : transparentSurface ? GameplayMaterials.active.transparent : GameplayMaterials.active.solid;
                    if (template == null || template.shader == null) {
                        throw new System.InvalidOperationException.$ctor1("Missing exported gameplay material template. Check scene dependencies in Playworks.");
                    }
                    return new UnityEngine.Material.$ctor1(template);
                },
                /*GameplayMaterials.Create:static end.*/

                /*GameplayMaterials.CreateGuideOverlay:static start.*/
                CreateGuideOverlay: function () {
if ( TRACE ) { TRACE( "GameplayMaterials#CreateGuideOverlay", this ); }

                    if (UnityEngine.MonoBehaviour.op_Equality(GameplayMaterials.active, null) || GameplayMaterials.active.guideOverlay == null) {
                        throw new System.InvalidOperationException.$ctor1("Missing guide overlay material on GameplayMaterials.");
                    }
                    return new UnityEngine.Material.$ctor1(GameplayMaterials.active.guideOverlay);
                },
                /*GameplayMaterials.CreateGuideOverlay:static end.*/

                /*GameplayMaterials.ConfigureTransparency:static start.*/
                ConfigureTransparency: function (material) {
if ( TRACE ) { TRACE( "GameplayMaterials#ConfigureTransparency", this ); }

                    if (!material.HasProperty$1("_Surface")) {
                        return;
                    }
                    material.SetFloat$1("_Surface", 1);
                    material.SetFloat$1("_Blend", 0);
                    material.SetInt$1("_SrcBlend", 5);
                    material.SetInt$1("_DstBlend", 10);
                    material.SetInt$1("_ZWrite", 0);
                    material.DisableKeyword("_ALPHABLEND_ON");
                    material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                    material.EnableKeyword("_SURFACE_TYPE_TRANSPARENT");
                    material.renderQueue = 3000;
                },
                /*GameplayMaterials.ConfigureTransparency:static end.*/


            }
        },
        fields: {
            solid: null,
            transparent: null,
            unlit: null,
            guideOverlay: null
        },
        methods: {
            /*GameplayMaterials.Initialize start.*/
            Initialize: function () {
if ( TRACE ) { TRACE( "GameplayMaterials#Initialize", this ); }

                GameplayMaterials.active = this;
            },
            /*GameplayMaterials.Initialize end.*/

            /*GameplayMaterials.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "GameplayMaterials#OnDestroy", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(GameplayMaterials.active, this)) {
                    GameplayMaterials.active = null;
                }
            },
            /*GameplayMaterials.OnDestroy end.*/


        }
    });
    /*GameplayMaterials end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*LunaController start.*/
    Bridge.define("LunaController", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                Active: null
            }
        },
        fields: {
            TimePlay: 0,
            Count: 0,
            Logo: null,
            YPosCTA: 0,
            CTA: null,
            BackgroundMusic: null,
            Intensity: 0,
            game: null,
            hud: null,
            controls: null,
            ctaButton: null,
            logoImage: null,
            musicSource: null,
            tutorial: null,
            directionalLight: null,
            endCard: null,
            timePlayRoutine: null,
            counting: false,
            InteractionCount: 0,
            IsCTAActive: false
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "LunaController#init", this ); }

                this.TimePlay = 0;
                this.Count = 0;
                this.Intensity = 1.0;
            }
        },
        methods: {
            /*LunaController.Awake start.*/
            Awake: function () {
if ( TRACE ) { TRACE( "LunaController#Awake", this ); }

                LunaController.Active = this;
                this.ctaButton.ForEach(Bridge.fn.bind(this, function (b) {
                    b.onClick.AddListener(Bridge.fn.cacheBind(this, this.ClickCTA));
                }));
            },
            /*LunaController.Awake end.*/

            /*LunaController.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "LunaController#OnEnable", this ); }

                if (UnityEngine.MonoBehaviour.op_Inequality(this.game, null)) {
                    this.game.addGuideBuildAccepted(Bridge.fn.cacheBind(this, this.OnGuideBuild));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.hud, null)) {
                    this.hud.addBlockSlotClicked(Bridge.fn.cacheBind(this, this.OnCountedClick));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.controls, null)) {
                    this.controls.addFlyClicked(Bridge.fn.cacheBind(this, this.OnCountedClick));
                }
            },
            /*LunaController.OnEnable end.*/

            /*LunaController.Start start.*/
            Start: function () {
if ( TRACE ) { TRACE( "LunaController#Start", this ); }

                var pos = this.CTA.localPosition.$clone();
                pos.y = this.YPosCTA;
                this.CTA.localPosition = pos.$clone();

                this.Intensity = Math.max(0, Math.min(this.Intensity, 5));
                if (UnityEngine.Component.op_Inequality(this.directionalLight, null)) {
                    this.directionalLight.intensity = this.Intensity;
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.logoImage, null) && this.Logo != null) {
                    this.logoImage.texture = this.Logo;
                }
                if (UnityEngine.Component.op_Inequality(this.musicSource, null) && this.BackgroundMusic != null) {
                    this.musicSource.clip = this.BackgroundMusic;
                    this.musicSource.loop = true;
                    this.musicSource.Play();
                }
                this.StartCoroutine$1(this.CountTimePlay());
                if (this.Count <= 0) {
                    this.ShowEndCard();
                }
            },
            /*LunaController.Start end.*/

            /*LunaController.CountTimePlay start.*/
            CountTimePlay: function () {
if ( TRACE ) { TRACE( "LunaController#CountTimePlay", this ); }

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
                                        this.ShowEndCard();

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
            /*LunaController.CountTimePlay end.*/

            /*LunaController.StopTimePlay start.*/
            StopTimePlay: function () {
if ( TRACE ) { TRACE( "LunaController#StopTimePlay", this ); }

                if (this.timePlayRoutine == null) {
                    return;
                }
                this.StopCoroutine$2(this.timePlayRoutine);
                this.timePlayRoutine = null;
            },
            /*LunaController.StopTimePlay end.*/

            /*LunaController.OnGuideBuild start.*/
            OnGuideBuild: function () {
if ( TRACE ) { TRACE( "LunaController#OnGuideBuild", this ); }

                if (this.IsCTAActive) {
                    return;
                }
                this.counting = true;
                this.OnCountedClick();
            },
            /*LunaController.OnGuideBuild end.*/

            /*LunaController.OnCountedClick start.*/
            OnCountedClick: function () {
if ( TRACE ) { TRACE( "LunaController#OnCountedClick", this ); }

                if (!this.counting || this.IsCTAActive) {
                    return;
                }
                this.InteractionCount = (this.InteractionCount + 1) | 0;
                if (this.Count > 0 && this.InteractionCount >= this.Count) {
                    this.ShowEndCard();
                }
            },
            /*LunaController.OnCountedClick end.*/

            /*LunaController.ShowEndCard start.*/
            ShowEndCard: function () {
if ( TRACE ) { TRACE( "LunaController#ShowEndCard", this ); }

                this.endCard.SetActive(true);
            },
            /*LunaController.ShowEndCard end.*/

            /*LunaController.ClickCTA start.*/
            ClickCTA: function () {
if ( TRACE ) { TRACE( "LunaController#ClickCTA", this ); }

                Luna.Unity.Playable.InstallFullGame();
            },
            /*LunaController.ClickCTA end.*/

            /*LunaController.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "LunaController#OnDisable", this ); }

                this.StopTimePlay();
                if (UnityEngine.MonoBehaviour.op_Inequality(this.game, null)) {
                    this.game.removeGuideBuildAccepted(Bridge.fn.cacheBind(this, this.OnGuideBuild));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.hud, null)) {
                    this.hud.removeBlockSlotClicked(Bridge.fn.cacheBind(this, this.OnCountedClick));
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.controls, null)) {
                    this.controls.removeFlyClicked(Bridge.fn.cacheBind(this, this.OnCountedClick));
                }
            },
            /*LunaController.OnDisable end.*/

            /*LunaController.OnDestroy start.*/
            OnDestroy: function () {
if ( TRACE ) { TRACE( "LunaController#OnDestroy", this ); }

                if (UnityEngine.MonoBehaviour.op_Equality(LunaController.Active, this)) {
                    LunaController.Active = null;
                }
            },
            /*LunaController.OnDestroy end.*/


        }
    });
    /*LunaController end.*/

    /*PointLightReflectionExclusion start.*/
    Bridge.define("PointLightReflectionExclusion", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            source: null
        },
        methods: {
            /*PointLightReflectionExclusion.OnEnable start.*/
            OnEnable: function () {
if ( TRACE ) { TRACE( "PointLightReflectionExclusion#OnEnable", this ); }

                WetGroundReflection.RefreshLightList();
            },
            /*PointLightReflectionExclusion.OnEnable end.*/

            /*PointLightReflectionExclusion.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "PointLightReflectionExclusion#OnDisable", this ); }

                WetGroundReflection.RefreshLightList();
            },
            /*PointLightReflectionExclusion.OnDisable end.*/


        }
    });
    /*PointLightReflectionExclusion end.*/

    /*ReferenceHouseBlueprint start.*/
    /**
     * Build the approved house from its actual prefab pieces, not procedural substitutes.
     *
     * @static
     * @abstract
     * @public
     * @class ReferenceHouseBlueprint
     */
    Bridge.define("ReferenceHouseBlueprint", {
        statics: {
            fields: {
                Order: null
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "ReferenceHouseBlueprint#init", this ); }

                    this.Order = System.Array.init([
                        "Foundation", 
                        "Pink Carpet", 
                        "Corner Base", 
                        "Side Fence", 
                        "Rear Fence", 
                        "Stone Pillar", 
                        "Side Glass", 
                        "Rear Glass", 
                        "Pink Lattice Roof", 
                        "Ivory Roof Rim", 
                        "Side Canopy", 
                        "Ivory Sign Backing", 
                        "Bone Sign", 
                        "Water Basin", 
                        "Purple Decor", 
                        "Hanging Lantern"
                    ], System.String);
                }
            },
            methods: {
                /*ReferenceHouseBlueprint.Create:static start.*/
                Create: function (reference) {
if ( TRACE ) { TRACE( "ReferenceHouseBlueprint#Create", this ); }

                    var $t, $t1, $t2;
                    var result = new (System.Collections.Generic.List$1(BuildingPart)).ctor();
                    $t = Bridge.getEnumerator(ReferenceHouseBlueprint.Order);
                    try {
                        while ($t.moveNext()) {
                            var name = $t.Current;
                            var part = ($t1 = new BuildingPart(), $t1.name = name, $t1);
                            $t1 = Bridge.getEnumerator(reference.transform);
                            try {
                                while ($t1.moveNext()) {
                                    var piece = Bridge.cast($t1.Current, UnityEngine.Transform);
                                    if (!Bridge.referenceEquals(piece.name, name)) {
                                        continue;
                                    }
                                    var bounds = ReferenceHouseBlueprint.PieceBounds(piece, reference.transform);
                                    if (Bridge.referenceEquals(name, "Side Fence") || Bridge.referenceEquals(name, "Rear Fence")) {
                                        // Fence is offset within its cell; the guide covers one full cube in height.
                                        var size = bounds.halfExtents.$clone().scale( 2 ).$clone();
                                        var center = bounds.center.$clone();
                                        size.y = 1.0;
                                        center.y = 0.5;
                                        bounds = new pc.BoundingBox( center.$clone(), size.$clone().scale( 0.5 ) );
                                    }
                                    // Use the actual model bounds, including the full underground foundation.
                                    // The dashed overlay remains visible through the surrounding terrain.
                                    part.blocks.add(($t2 = new BuildBlock(), $t2.type = name, $t2.prefab = piece.gameObject, $t2.localPosition = piece.localPosition.$clone(), $t2.localRotation = piece.localRotation.$clone(), $t2.hasCustomBounds = true, $t2.customBounds = bounds, $t2));
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$Dispose();
                                }
                            }
                            if (part.blocks.Count > 0) {
                                result.add(part);
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return result;
                },
                /*ReferenceHouseBlueprint.Create:static end.*/

                /*ReferenceHouseBlueprint.PieceBounds:static start.*/
                PieceBounds: function (piece, root) {
if ( TRACE ) { TRACE( "ReferenceHouseBlueprint#PieceBounds", this ); }

                    var $t;
                    var result = new pc.BoundingBox.ctor();
                    var first = true;
                    $t = Bridge.getEnumerator(piece.GetComponentsInChildren$1(UnityEngine.MeshFilter, true));
                    try {
                        while ($t.moveNext()) {
                            var filter = $t.Current;
                            if (filter.sharedMesh == null) {
                                continue;
                            }
                            var b = filter.sharedMesh.bounds;
                            var matrix = new pc.Mat4().mul2( root.worldToLocalMatrix, filter.transform.localToWorldMatrix );
                            for (var i = 0; i < 8; i = (i + 1) | 0) {
                                var corner = b.center.$clone().add( new pc.Vec3().mul2( b.halfExtents, new pc.Vec3( (i & 1) === 0 ? -1 : 1, (i & 2) === 0 ? -1 : 1, (i & 4) === 0 ? -1 : 1 ) ) );
                                var p = matrix.transformPoint( corner ).sub( piece.localPosition );
                                if (first) {
                                    result = new pc.BoundingBox( p.$clone(), pc.Vec3.ZERO.clone().scale( 0.5 ) );
                                    first = false;
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
                    return result;
                },
                /*ReferenceHouseBlueprint.PieceBounds:static end.*/


            }
        }
    });
    /*ReferenceHouseBlueprint end.*/

    /*SampleBlockVisuals start.*/
    /**
     * Geometry and materials for the ordered sample shelter blueprint.
     *
     * @static
     * @abstract
     * @public
     * @class SampleBlockVisuals
     */
    Bridge.define("SampleBlockVisuals", {
        statics: {
            fields: {
                Cream: null,
                White: null,
                Cherry: null,
                CherryLight: null,
                Stone: null,
                StoneLight: null,
                Mint: null,
                Pink: null,
                Purple: null,
                DarkPurple: null,
                carpetTexture: null,
                basinTexture: null,
                cherryTexture: null
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "SampleBlockVisuals#init", this ); }

                    this.Cream = new UnityEngine.Color();
                    this.White = new UnityEngine.Color();
                    this.Cherry = new UnityEngine.Color();
                    this.CherryLight = new UnityEngine.Color();
                    this.Stone = new UnityEngine.Color();
                    this.StoneLight = new UnityEngine.Color();
                    this.Mint = new UnityEngine.Color();
                    this.Pink = new UnityEngine.Color();
                    this.Purple = new UnityEngine.Color();
                    this.DarkPurple = new UnityEngine.Color();
                    this.Cream = new pc.Color( 0.94, 0.91, 0.81, 1 );
                    this.White = new pc.Color( 0.94, 0.96, 0.93, 1 );
                    this.Cherry = new pc.Color( 0.91, 0.63, 0.56, 1 );
                    this.CherryLight = new pc.Color( 0.99, 0.76, 0.68, 1 );
                    this.Stone = new pc.Color( 0.46, 0.47, 0.46, 1 );
                    this.StoneLight = new pc.Color( 0.59, 0.59, 0.57, 1 );
                    this.Mint = new pc.Color( 0.45, 1.0, 0.78, 1 );
                    this.Pink = new pc.Color( 1.0, 0.75, 0.81, 1 );
                    this.Purple = new pc.Color( 0.48, 0.15, 0.55, 1 );
                    this.DarkPurple = new pc.Color( 0.16, 0.09, 0.2, 1 );
                }
            },
            methods: {
                /*SampleBlockVisuals.GetLocalBounds:static start.*/
                GetLocalBounds: function (block) {
if ( TRACE ) { TRACE( "SampleBlockVisuals#GetLocalBounds", this ); }

                    if (block.hasCustomBounds) {
                        return block.customBounds;
                    }
                    switch (block.visualStyle) {
                        case "Glow Base": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0.005, 0 ), new pc.Vec3( 1, 1.02, 1 ).scale( 0.5 ) );
                        case "Pink Carpet": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0.54, 0 ), new pc.Vec3( 1, 0.08, 1 ).scale( 0.5 ) );
                        case "White Roof Slab": 
                            return new pc.BoundingBox( pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 0.5, 1 ).scale( 0.5 ) );
                        case "Pink Roof Panel": 
                            return new pc.BoundingBox( new pc.Vec3( 0, -0.125, 0 ), new pc.Vec3( 1, 0.25, 1 ).scale( 0.5 ) );
                        case "Fence X": 
                            return new pc.BoundingBox( pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 0.72, 0.2 ).scale( 0.5 ) );
                        case "Fence Z": 
                            return new pc.BoundingBox( pc.Vec3.ZERO.clone(), new pc.Vec3( 0.2, 0.72, 1 ).scale( 0.5 ) );
                        case "Glass X": 
                            return new pc.BoundingBox( pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 0.12 ).scale( 0.5 ) );
                        case "Glass Z": 
                            return new pc.BoundingBox( pc.Vec3.ZERO.clone(), new pc.Vec3( 0.12, 1, 1 ).scale( 0.5 ) );
                        case "Lantern": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0.25, 0 ), new pc.Vec3( 0.65, 1.5, 0.65 ).scale( 0.5 ) );
                        case "Sign Base": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0, -0.025 ), new pc.Vec3( 0.86, 0.86, 0.23 ).scale( 0.5 ) );
                        case "Bone Diagonal": 
                        case "Bone Horizontal": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0, -0.13 ), new pc.Vec3( 0.68, 0.25, 0.12 ).scale( 0.5 ) );
                        case "Water Fill": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0.32, 0 ), new pc.Vec3( 0.76, 0.06, 0.76 ).scale( 0.5 ) );
                        case "Water Basin": 
                            return new pc.BoundingBox( new pc.Vec3( 0, -0.025, 0 ), new pc.Vec3( 1, 1.05, 1 ).scale( 0.5 ) );
                        case "Fire Stage 1": 
                        case "Fire Stage 2": 
                        case "Fire Stage 3": 
                        case "Fire Stage 4": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0.01, -0.03 ), new pc.Vec3( 1.02, 1.04, 1.06 ).scale( 0.5 ) );
                        case "Fire Panel Front": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0, -0.53 ), new pc.Vec3( 1, 1, 0.12 ).scale( 0.5 ) );
                        case "Fire Panel Right": 
                            return new pc.BoundingBox( new pc.Vec3( 0.53, 0, 0 ), new pc.Vec3( 0.12, 1, 1 ).scale( 0.5 ) );
                        case "Fire Panel Back": 
                            return new pc.BoundingBox( new pc.Vec3( 0, 0, 0.53 ), new pc.Vec3( 1, 1, 0.12 ).scale( 0.5 ) );
                        default: 
                            return new pc.BoundingBox( pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 1 ).scale( 0.5 ) );
                    }
                },
                /*SampleBlockVisuals.GetLocalBounds:static end.*/

                /*SampleBlockVisuals.Create:static start.*/
                Create: function (block, preview, ownedMaterials, solidMaterial, previewOpacity) {
if ( TRACE ) { TRACE( "SampleBlockVisuals#Create", this ); }

                    var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                    if (previewOpacity === void 0) { previewOpacity = 0.38; }
                    var Lattice = null;
                    var Sphere = null;
                    var Cube = null;
                    var Mat = null;
                    var root = new UnityEngine.GameObject.$ctor2(block.visualStyle);




                    Mat = function (c, t, transparent, alpha, glow) {
                        if (!preview && !transparent && !glow && !Bridge.staticEquals(solidMaterial, null)) {
                            return solidMaterial(c.$clone(), t);
                        }
                        var m = GameplayMaterials.Create(preview || transparent, false);
                        m.name = preview ? "Ghost " + (block.visualStyle || "") : block.visualStyle;
                        m.color = new pc.Color( c.r, c.g, c.b, preview ? previewOpacity : alpha );
                        if (t != null) {
                            m.mainTexture = t;
                        }
                        if (preview || transparent) {
                            m.SetFloat$1("_Mode", 3);
                            m.SetInt$1("_SrcBlend", UnityEngine.Rendering.BlendMode.SrcAlpha);
                            m.SetInt$1("_DstBlend", UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                            m.SetInt$1("_ZWrite", 0);
                            m.DisableKeyword("_ALPHATEST_ON");
                            m.DisableKeyword("_ALPHABLEND_ON");
                            m.EnableKeyword("_ALPHAPREMULTIPLY_ON");
                            m.renderQueue = UnityEngine.Rendering.RenderQueue.Transparent;
                        }

                        if (glow && !preview) {
                            m.EnableKeyword("_EMISSION");
                            m.SetColor$1("_EmissionColor", new pc.Color( c.r * 1.4, c.g * 1.4, c.b * 1.4, c.a * 1.4 ));
                        }

                        ownedMaterials.add(m);
                        if (preview || transparent) {
                            GameplayMaterials.ConfigureTransparency(m);
                        }
                        return m;
                    };
                    Cube = function (name, p, s, m, rotation) {




                        var item = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
                        item.name = name;
                        item.transform.SetParent(root.transform, false);
                        item.transform.localPosition = p.$clone();
                        item.transform.localScale = s.$clone();
                        if (System.Nullable.hasValue(rotation)) {
                            item.transform.localRotation = System.Nullable.getValue(rotation).$clone();
                        }
                        item.GetComponent(UnityEngine.Collider).enabled = false;
                        item.GetComponent(UnityEngine.Renderer).sharedMaterial = m;
                    };
                    Sphere = function (name, p, s, m) {
                        var item = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Sphere);
                        item.name = name;
                        item.transform.SetParent(root.transform, false);
                        item.transform.localPosition = p.$clone();
                        item.transform.localScale = s.$clone();
                        item.GetComponent(UnityEngine.Collider).enabled = false;
                        item.GetComponent(UnityEngine.Renderer).sharedMaterial = m;
                    };
                    Lattice = function (label, p, vertical) {
                        var wood = Mat(new pc.Color( 1, 1, 1, 1 ), SampleBlockVisuals.LoadCherry(), false, 1.0, false);
                        var pale = Mat(SampleBlockVisuals.CherryLight.$clone(), void 0, false, 1.0, false);
                        if (vertical) {
                            Cube((label || "") + " frame top", p.$clone().add( new pc.Vec3( 0, 0.4, 0 ) ), new pc.Vec3( 1, 0.16, 0.1 ), wood, void 0);
                            Cube((label || "") + " frame bottom", p.$clone().add( new pc.Vec3( 0, -0.4, 0 ) ), new pc.Vec3( 1, 0.16, 0.1 ), wood, void 0);
                            for (var i = -1; i <= 1; i = (i + 1) | 0) {
                                Cube((label || "") + " vertical", p.$clone().add( new pc.Vec3( i * 0.43, 0, 0 ) ), new pc.Vec3( 0.09, 0.86, 0.1 ), pale, void 0);
                            }
                            Cube((label || "") + " center rail", p.$clone(), new pc.Vec3( 1, 0.08, 0.11 ), wood, void 0);
                        } else {
                            Cube((label || "") + " perimeter X1", p.$clone().add( new pc.Vec3( 0, 0, -0.44 ) ), new pc.Vec3( 1, 0.25, 0.12 ), wood, void 0);
                            Cube((label || "") + " perimeter X2", p.$clone().add( new pc.Vec3( 0, 0, 0.44 ) ), new pc.Vec3( 1, 0.25, 0.12 ), wood, void 0);
                            Cube((label || "") + " perimeter Z1", p.$clone().add( new pc.Vec3( -0.44, 0, 0 ) ), new pc.Vec3( 0.12, 0.25, 1 ), wood, void 0);
                            Cube((label || "") + " perimeter Z2", p.$clone().add( new pc.Vec3( 0.44, 0, 0 ) ), new pc.Vec3( 0.12, 0.25, 1 ), wood, void 0);
                            for (var i1 = -1; i1 <= 1; i1 = (i1 + 1) | 0) {
                                Cube((label || "") + " grid X", p.$clone().add( new pc.Vec3( i1 * 0.21, 0, 0 ) ), new pc.Vec3( 0.045, 0.08, 0.84 ), pale, void 0);
                                Cube((label || "") + " grid Z", p.$clone().add( new pc.Vec3( 0, 0, i1 * 0.21 ) ), new pc.Vec3( 0.84, 0.08, 0.045 ), pale, void 0);
                            }
                            // A thin underside echoes the reference ceiling without closing the holes.
                        }
                    };

                    switch (block.visualStyle) {
                        case "Glow Base": 
                            Cube("White illuminated foundation", pc.Vec3.ZERO.clone(), new pc.Vec3( 0.98, 1, 0.98 ), Mat(SampleBlockVisuals.White.$clone(), null, false, 1, true), void 0);
                            Cube("Mint top glow", new pc.Vec3( 0, 0.494, 0 ), new pc.Vec3( 0.98, 0.012, 0.98 ), Mat(SampleBlockVisuals.Mint.$clone(), null, false, 1, true), void 0);
                            Cube("Bright white center", new pc.Vec3( 0, 0.503, 0 ), new pc.Vec3( 0.84, 0.012, 0.84 ), Mat(SampleBlockVisuals.White.$clone(), null, false, 1, true), void 0);
                            break;
                        case "Pink Carpet": 
                            Cube("Thin pink carpet, no border", new pc.Vec3( 0, 0.54, 0 ), new pc.Vec3( 0.99, 0.08, 0.99 ), Mat(new pc.Color( 1, 1, 1, 1 ), SampleBlockVisuals.LoadCarpet(), false, 1.0, false), void 0);
                            break;
                        case "Pale Base": 
                            Cube("Smooth off-white corner pedestal", pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 1 ), Mat(SampleBlockVisuals.Cream.$clone(), void 0, false, 1.0, false), void 0);
                            break;
                        case "Fence X": 
                        case "Fence Z": 
                            {
                                var alongX = Bridge.referenceEquals(block.visualStyle, "Fence X");
                                var wood = Mat(new pc.Color( 1, 1, 1, 1 ), SampleBlockVisuals.LoadCherry(), false, 1.0, false);
                                var pale = Mat(SampleBlockVisuals.CherryLight.$clone(), void 0, false, 1.0, false);
                                for (var i = -1; i <= 1; i = (i + 1) | 0) {
                                    var offset = i * 0.43;
                                    Cube("Fence post", alongX ? new pc.Vec3( offset, 0, 0 ) : new pc.Vec3( 0, 0, offset ), alongX ? new pc.Vec3( 0.09, 0.72, 0.15 ) : new pc.Vec3( 0.15, 0.72, 0.09 ), pale, void 0);
                                }
                                $t = Bridge.getEnumerator(System.Array.init([-0.26, 0.02, 0.29], System.Single));
                                try {
                                    while ($t.moveNext()) {
                                        var height = $t.Current;
                                        Cube("Cherry fence rail", new pc.Vec3( 0, height, 0 ), alongX ? new pc.Vec3( 1, 0.1, 0.13 ) : new pc.Vec3( 0.13, 0.1, 1 ), wood, void 0);
                                    }
                                } finally {
                                    if (Bridge.is($t, System.IDisposable)) {
                                        $t.System$IDisposable$Dispose();
                                    }
                                }
                                break;
                            }
                        case "Stone Column": 
                            {
                                var stone = Mat(SampleBlockVisuals.Stone.$clone(), void 0, false, 1.0, false);
                                var face = Mat(SampleBlockVisuals.StoneLight.$clone(), void 0, false, 1.0, false);
                                Cube("Upper stone column", pc.Vec3.ZERO.clone(), new pc.Vec3( 0.96, 1, 0.96 ), stone, void 0);
                                $t1 = Bridge.getEnumerator(System.Array.init([-0.25, 0.25], System.Single));
                                try {
                                    while ($t1.moveNext()) {
                                        var offset1 = $t1.Current;
                                        Cube("Front large stone panel", new pc.Vec3( offset1, 0, -0.487 ), new pc.Vec3( 0.47, 0.94, 0.025 ), face, void 0);
                                        Cube("Side large stone panel", new pc.Vec3( -0.487, 0, offset1 ), new pc.Vec3( 0.025, 0.94, 0.47 ), face, void 0);
                                        Cube("Back large stone panel", new pc.Vec3( offset1, 0, 0.487 ), new pc.Vec3( 0.47, 0.94, 0.025 ), face, void 0);
                                        Cube("Right large stone panel", new pc.Vec3( 0.487, 0, offset1 ), new pc.Vec3( 0.025, 0.94, 0.47 ), face, void 0);
                                    }
                                } finally {
                                    if (Bridge.is($t1, System.IDisposable)) {
                                        $t1.System$IDisposable$Dispose();
                                    }
                                }
                                break;
                            }
                        case "Glass X": 
                        case "Glass Z": 
                            {
                                var alongX1 = Bridge.referenceEquals(block.visualStyle, "Glass X");
                                var pane = Mat(new pc.Color( 0.6, 0.91, 0.94, 1 ), null, true, 0.14, false);
                                var edge = Mat(new pc.Color( 0.64, 0.94, 0.94, 1 ), void 0, false, 1.0, false);
                                var glint = Mat(new pc.Color( 1, 1, 1, 1 ), void 0, false, 1.0, false);
                                Cube("Almost clear glass pane", pc.Vec3.ZERO.clone(), alongX1 ? new pc.Vec3( 0.98, 0.9, 0.025 ) : new pc.Vec3( 0.025, 0.9, 0.98 ), pane, void 0);
                                Cube("Aqua top connector", new pc.Vec3( 0, 0.47, 0 ), alongX1 ? new pc.Vec3( 1, 0.055, 0.09 ) : new pc.Vec3( 0.09, 0.055, 1 ), edge, void 0);
                                Cube("Aqua bottom connector", new pc.Vec3( 0, -0.47, 0 ), alongX1 ? new pc.Vec3( 1, 0.055, 0.09 ) : new pc.Vec3( 0.09, 0.055, 1 ), edge, void 0);
                                $t2 = Bridge.getEnumerator(System.Array.init([-0.49, 0.49], System.Single));
                                try {
                                    while ($t2.moveNext()) {
                                        var offset2 = $t2.Current;
                                        Cube("Glass to column connector", alongX1 ? new pc.Vec3( offset2, 0, 0 ) : new pc.Vec3( 0, 0, offset2 ), alongX1 ? new pc.Vec3( 0.045, 1, 0.09 ) : new pc.Vec3( 0.09, 1, 0.045 ), edge, void 0);
                                    }
                                } finally {
                                    if (Bridge.is($t2, System.IDisposable)) {
                                        $t2.System$IDisposable$Dispose();
                                    }
                                }
                                Cube("Tiny glass glint", alongX1 ? new pc.Vec3( -0.19, 0.18, -0.019 ) : new pc.Vec3( -0.019, 0.18, -0.19 ), new pc.Vec3( 0.025, 0.22, 0.025 ), glint, new pc.Quat().setFromEulerAngles_Unity( 0, 0, 35 ));
                                break;
                            }
                        case "White Roof Slab": 
                            Cube("Smooth half-height white roof", pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 0.5, 1 ), Mat(SampleBlockVisuals.White.$clone(), void 0, false, 1.0, false), void 0);
                            break;
                        case "Pink Roof Panel": 
                            Lattice("Pink quarter-height roof panel", new pc.Vec3( 0, -0.125, 0 ), false);
                            break;
                        case "Lantern": 
                            {
                                var metal = Mat(new pc.Color( 0.34, 0.35, 0.37, 1 ), void 0, false, 1.0, false);
                                var orange = Mat(new pc.Color( 1.0, 0.55, 0.14, 1 ), void 0, false, 1.0, false);
                                var lamp = Mat(new pc.Color( 1.0, 0.95, 0.66, 1 ), null, false, 1, true);
                                Cube("Metal hanging hook", new pc.Vec3( 0, 0.93, 0 ), new pc.Vec3( 0.18, 0.11, 0.18 ), metal, void 0);
                                Cube("Chain", new pc.Vec3( 0, 0.66, 0 ), new pc.Vec3( 0.045, 0.5, 0.045 ), metal, void 0);
                                Cube("Lantern cap", new pc.Vec3( 0, 0.39, 0 ), new pc.Vec3( 0.52, 0.12, 0.52 ), metal, void 0);
                                Cube("Orange band", new pc.Vec3( 0, 0.31, 0 ), new pc.Vec3( 0.55, 0.065, 0.55 ), orange, void 0);
                                Cube("Glowing core", new pc.Vec3( 0, -0.01, 0 ), new pc.Vec3( 0.48, 0.57, 0.48 ), lamp, void 0);
                                Cube("Metal base", new pc.Vec3( 0, -0.34, 0 ), new pc.Vec3( 0.55, 0.11, 0.55 ), metal, void 0);
                                if (!preview) {
                                }
                                break;
                            }
                        case "Sign Base": 
                            {
                                var rim = Mat(new pc.Color( 0.86, 0.75, 0.45, 1 ), void 0, false, 1.0, false);
                                var darkGold = Mat(new pc.Color( 0.55, 0.27, 0.1, 1 ), void 0, false, 1.0, false);
                                var gold = Mat(new pc.Color( 0.83, 0.48, 0.18, 1 ), void 0, false, 1.0, false);
                                var center = Mat(new pc.Color( 0.95, 0.83, 0.42, 1 ), void 0, false, 1.0, false);
                                Cube("Raised gold sign border", pc.Vec3.ZERO.clone(), new pc.Vec3( 0.86, 0.86, 0.17 ), rim, void 0);
                                Cube("Dark amber inset", new pc.Vec3( 0, 0, -0.091 ), new pc.Vec3( 0.72, 0.72, 0.025 ), darkGold, void 0);
                                Cube("Golden center", new pc.Vec3( 0, 0, -0.108 ), new pc.Vec3( 0.58, 0.58, 0.02 ), gold, void 0);
                                Cube("Light amber center", new pc.Vec3( 0, 0, -0.124 ), new pc.Vec3( 0.35, 0.35, 0.015 ), center, void 0);
                                break;
                            }
                        case "Bone Diagonal": 
                        case "Bone Horizontal": 
                            {
                                var bone = Mat(new pc.Color( 1, 0.98, 0.79, 1 ), null, false, 1, true);
                                var diagonal = Bridge.referenceEquals(block.visualStyle, "Bone Diagonal");
                                var rotation = new pc.Quat().setFromEulerAngles_Unity( 0, 0, diagonal ? 34 : 0 );
                                Cube("White bone shaft", new pc.Vec3( 0, 0, -0.15 ), new pc.Vec3( 0.47, 0.085, 0.07 ), bone, rotation.$clone());
                                var a = diagonal ? new pc.Vec3( -0.19, -0.13, -0.15 ) : new pc.Vec3( -0.24, 0, -0.15 );
                                var b = diagonal ? new pc.Vec3( 0.19, 0.13, -0.15 ) : new pc.Vec3( 0.24, 0, -0.15 );
                                Sphere("Bone left", a.$clone(), new pc.Vec3( 0.17, 0.17, 0.075 ), bone);
                                Sphere("Bone right", b.$clone(), new pc.Vec3( 0.17, 0.17, 0.075 ), bone);
                                break;
                            }
                        case "Water Basin": 
                            {
                                var stone1 = Mat(new pc.Color( 1, 1, 1, 1 ), SampleBlockVisuals.LoadBasin(), false, 1.0, false);
                                var dark = Mat(new pc.Color( 0.34, 0.32, 0.29, 1 ), void 0, false, 1.0, false);
                                Cube("Water basin bottom", new pc.Vec3( 0, -0.36, 0 ), new pc.Vec3( 1, 0.22, 1 ), stone1, void 0);
                                $t3 = Bridge.getEnumerator(System.Array.init([-0.44, 0.44], System.Single));
                                try {
                                    while ($t3.moveNext()) {
                                        var side = $t3.Current;
                                        Cube("Water basin wall X", new pc.Vec3( side, 0, 0 ), new pc.Vec3( 0.12, 0.85, 1 ), stone1, void 0);
                                        Cube("Water basin wall Z", new pc.Vec3( 0, 0, side ), new pc.Vec3( 1, 0.85, 0.12 ), stone1, void 0);
                                        Cube("Deep inset rim X", new pc.Vec3( side, 0.44, 0 ), new pc.Vec3( 0.13, 0.1, 1 ), dark, void 0);
                                        Cube("Deep inset rim Z", new pc.Vec3( 0, 0.44, side ), new pc.Vec3( 1, 0.1, 0.13 ), dark, void 0);
                                    }
                                } finally {
                                    if (Bridge.is($t3, System.IDisposable)) {
                                        $t3.System$IDisposable$Dispose();
                                    }
                                }
                                $t4 = Bridge.getEnumerator(System.Array.init([-0.39, 0.39], System.Single));
                                try {
                                    while ($t4.moveNext()) {
                                        var x = $t4.Current;
                                        $t5 = Bridge.getEnumerator(System.Array.init([-0.39, 0.39], System.Single));
                                        try {
                                            while ($t5.moveNext()) {
                                                var z = $t5.Current;
                                                Cube("Short basin foot", new pc.Vec3( x, -0.49, z ), new pc.Vec3( 0.21, 0.12, 0.21 ), stone1, void 0);
                                            }
                                        } finally {
                                            if (Bridge.is($t5, System.IDisposable)) {
                                                $t5.System$IDisposable$Dispose();
                                            }
                                        }
                                    }
                                } finally {
                                    if (Bridge.is($t4, System.IDisposable)) {
                                        $t4.System$IDisposable$Dispose();
                                    }
                                }
                                break;
                            }
                        case "Water Fill": 
                            Cube("Blue water surface", new pc.Vec3( 0, 0.32, 0 ), new pc.Vec3( 0.76, 0.06, 0.76 ), Mat(new pc.Color( 0.1, 0.48, 0.86, 1 ), null, true, 0.82, false), void 0);
                            break;
                        case "Fire Stage 1": 
                        case "Fire Stage 2": 
                        case "Fire Stage 3": 
                        case "Fire Stage 4": 
                            {
                                var stage = (block.visualStyle.charCodeAt(((block.visualStyle.length - 1) | 0)) - 48) | 0;
                                var black = Mat(SampleBlockVisuals.DarkPurple.$clone(), void 0, false, 1.0, false);
                                var shell = Mat(new pc.Color( 0.4, 0.24, 0.46, 1 ), void 0, false, 1.0, false);
                                var rune = Mat(new pc.Color( 0.75, 0.19, 0.95, 1 ), null, false, 1, stage > 1);
                                Cube("Purple basin body", pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 1 ), shell, void 0);
                                Cube("Open black top", new pc.Vec3( 0, 0.505, 0 ), new pc.Vec3( 0.79, 0.01, 0.79 ), black, void 0);
                                $t6 = Bridge.getEnumerator(System.Array.init([-0.46, 0.46], System.Single));
                                try {
                                    while ($t6.moveNext()) {
                                        var side1 = $t6.Current;
                                        Cube("Purple top rim X", new pc.Vec3( side1, 0.48, 0 ), new pc.Vec3( 0.1, 0.09, 1 ), rune, void 0);
                                        Cube("Purple top rim Z", new pc.Vec3( 0, 0.48, side1 ), new pc.Vec3( 1, 0.09, 0.1 ), rune, void 0);
                                    }
                                } finally {
                                    if (Bridge.is($t6, System.IDisposable)) {
                                        $t6.System$IDisposable$Dispose();
                                    }
                                }
                                Cube("Dark front orb recess", new pc.Vec3( 0, -0.02, -0.512 ), new pc.Vec3( 0.36, 0.36, 0.028 ), black, void 0);
                                Cube("Lower rune band", new pc.Vec3( 0, -0.35, -0.518 ), new pc.Vec3( 0.95, 0.07, 0.02 ), rune, void 0);
                                if (stage >= 2) {
                                    Cube("Purple energized surface", new pc.Vec3( 0, 0.516, 0 ), new pc.Vec3( 0.77, 0.012, 0.77 ), Mat(new pc.Color( 0.6, 0.17, 1.0, 1 ), null, false, 1, true), void 0);
                                    var diameter = stage === 2 ? 0.17 : stage === 3 ? 0.26 : 0.34;
                                    Sphere("Growing bright front orb", new pc.Vec3( 0, -0.02, -0.533 ), new pc.Vec3( diameter, diameter, 0.05 ), Mat(new pc.Color( 1.0, 0.98, 0.74, 1 ), null, false, 1, true));
                                    if (!preview) {
                                    }
                                }
                                break;
                            }
                        case "Fire Panel Front": 
                            Lattice("Front fire surround", new pc.Vec3( 0, 0, -0.53 ), true);
                            break;
                        case "Fire Panel Back": 
                            Lattice("Back fire surround", new pc.Vec3( 0, 0, 0.53 ), true);
                            break;
                        case "Fire Panel Right": 
                            {
                                var panel = new UnityEngine.GameObject.$ctor2("Right fire surround rotation");
                                panel.transform.SetParent(root.transform, false);
                                // Lattice is authored along X; rotate all generated elements around the basin.
                                var before = root.transform.childCount;
                                Lattice("Right fire surround", pc.Vec3.ZERO.clone(), true);
                                while (root.transform.childCount > before) {
                                    var element = root.transform.GetChild(before);
                                    element.SetParent(panel.transform, true);
                                }
                                panel.transform.localPosition = new pc.Vec3( 0.53, 0, 0 );
                                panel.transform.localRotation = new pc.Quat().setFromEulerAngles_Unity( 0, 90, 0 );
                                break;
                            }
                        default: 
                            Cube("Block", pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 1 ), Mat(block.color.$clone(), void 0, false, 1.0, false), void 0);
                            break;
                    }
                    return root;
                },
                /*SampleBlockVisuals.Create:static end.*/

                /*SampleBlockVisuals.LoadCarpet:static start.*/
                LoadCarpet: function () {
if ( TRACE ) { TRACE( "SampleBlockVisuals#LoadCarpet", this ); }

                    if (SampleBlockVisuals.carpetTexture == null) {
                        SampleBlockVisuals.carpetTexture = UnityEngine.Resources.Load(UnityEngine.Texture2D, "DogShelterTextures/PinkCarpet");
                    }
                    return SampleBlockVisuals.carpetTexture;
                },
                /*SampleBlockVisuals.LoadCarpet:static end.*/

                /*SampleBlockVisuals.LoadBasin:static start.*/
                LoadBasin: function () {
if ( TRACE ) { TRACE( "SampleBlockVisuals#LoadBasin", this ); }

                    if (SampleBlockVisuals.basinTexture == null) {
                        SampleBlockVisuals.basinTexture = UnityEngine.Resources.Load(UnityEngine.Texture2D, "DogShelterTextures/WeatheredBasin");
                    }
                    return SampleBlockVisuals.basinTexture;
                },
                /*SampleBlockVisuals.LoadBasin:static end.*/

                /*SampleBlockVisuals.LoadCherry:static start.*/
                LoadCherry: function () {
if ( TRACE ) { TRACE( "SampleBlockVisuals#LoadCherry", this ); }

                    if (SampleBlockVisuals.cherryTexture == null) {
                        SampleBlockVisuals.cherryTexture = UnityEngine.Resources.Load(UnityEngine.Texture2D, "DogShelterTextures/CherryWood");
                    }
                    return SampleBlockVisuals.cherryTexture;
                },
                /*SampleBlockVisuals.LoadCherry:static end.*/


            }
        }
    });
    /*SampleBlockVisuals end.*/

    /*SampleBuildingBlueprint start.*/
    /**
     * Ordered, layered blueprint for the open 2x2 dog shelter.
     *
     * @static
     * @abstract
     * @public
     * @class SampleBuildingBlueprint
     */
    Bridge.define("SampleBuildingBlueprint", {
        statics: {
            methods: {
                /*SampleBuildingBlueprint.Create:static start.*/
                Create: function () {
if ( TRACE ) { TRACE( "SampleBuildingBlueprint#Create", this ); }

                    var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7, $t8, $t9, $t10, $t11, $t12, $t13, $t14, $t15, $t16;
                    var reference = UnityEngine.Resources.Load(UnityEngine.GameObject, "ReferenceHouseGameplay");
                    if (UnityEngine.GameObject.op_Inequality(reference, null)) {
                        return ReferenceHouseBlueprint.Create(reference);
                    }
                    var parts = new (System.Collections.Generic.List$1(BuildingPart)).ctor();
                    var foundation = SampleBuildingBlueprint.Part(parts, "Glowing foundation");
                    $t = Bridge.getEnumerator(System.Array.init([0.5, 1.5], System.Single));
                    try {
                        while ($t.moveNext()) {
                            var z = $t.Current;
                            $t1 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5], System.Single));
                            try {
                                while ($t1.moveNext()) {
                                    var x = $t1.Current;
                                    SampleBuildingBlueprint.Add(foundation, "Glow Base", x, 0, z);
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

                    var carpet = SampleBuildingBlueprint.Part(parts, "Thin pink floor");
                    $t2 = Bridge.getEnumerator(System.Array.init([0.5, 1.5], System.Single));
                    try {
                        while ($t2.moveNext()) {
                            var z1 = $t2.Current;
                            $t3 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5], System.Single));
                            try {
                                while ($t3.moveNext()) {
                                    var x1 = $t3.Current;
                                    SampleBuildingBlueprint.Add(carpet, "Pink Carpet", x1, 0, z1);
                                }
                            } finally {
                                if (Bridge.is($t3, System.IDisposable)) {
                                    $t3.System$IDisposable$Dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t2, System.IDisposable)) {
                            $t2.System$IDisposable$Dispose();
                        }
                    }

                    var bases = SampleBuildingBlueprint.Part(parts, "Smooth corner bases");
                    $t4 = Bridge.getEnumerator(System.Array.init([-1.5, 1.5], System.Single));
                    try {
                        while ($t4.moveNext()) {
                            var x2 = $t4.Current;
                            $t5 = Bridge.getEnumerator(System.Array.init([-0.5, 2.5], System.Single));
                            try {
                                while ($t5.moveNext()) {
                                    var z2 = $t5.Current;
                                    SampleBuildingBlueprint.Add(bases, "Pale Base", x2, 0, z2);
                                }
                            } finally {
                                if (Bridge.is($t5, System.IDisposable)) {
                                    $t5.System$IDisposable$Dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t4, System.IDisposable)) {
                            $t4.System$IDisposable$Dispose();
                        }
                    }

                    var fences = SampleBuildingBlueprint.Part(parts, "Cherry fences");
                    $t6 = Bridge.getEnumerator(System.Array.init([0.5, 1.5], System.Single));
                    try {
                        while ($t6.moveNext()) {
                            var z3 = $t6.Current;
                            SampleBuildingBlueprint.Add(fences, "Fence Z", -1.5, 1, z3);
                            SampleBuildingBlueprint.Add(fences, "Fence Z", 1.5, 1, z3);
                        }
                    } finally {
                        if (Bridge.is($t6, System.IDisposable)) {
                            $t6.System$IDisposable$Dispose();
                        }
                    }
                    $t7 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5], System.Single));
                    try {
                        while ($t7.moveNext()) {
                            var x3 = $t7.Current;
                            SampleBuildingBlueprint.Add(fences, "Fence X", x3, 1, 2.5);
                        }
                    } finally {
                        if (Bridge.is($t7, System.IDisposable)) {
                            $t7.System$IDisposable$Dispose();
                        }
                    }

                    var pillars = SampleBuildingBlueprint.Part(parts, "Upper stone pillars");
                    $t8 = Bridge.getEnumerator(System.Array.init([-1.5, 1.5], System.Single));
                    try {
                        while ($t8.moveNext()) {
                            var x4 = $t8.Current;
                            $t9 = Bridge.getEnumerator(System.Array.init([-0.5, 2.5], System.Single));
                            try {
                                while ($t9.moveNext()) {
                                    var z4 = $t9.Current;
                                    for (var y = 1; y <= 2; y = (y + 1) | 0) {
                                        SampleBuildingBlueprint.Add(pillars, "Stone Column", x4, y, z4);
                                    }
                                }
                            } finally {
                                if (Bridge.is($t9, System.IDisposable)) {
                                    $t9.System$IDisposable$Dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t8, System.IDisposable)) {
                            $t8.System$IDisposable$Dispose();
                        }
                    }

                    var glass = SampleBuildingBlueprint.Part(parts, "Clear connected glass");
                    $t10 = Bridge.getEnumerator(System.Array.init([0.5, 1.5], System.Single));
                    try {
                        while ($t10.moveNext()) {
                            var z5 = $t10.Current;
                            SampleBuildingBlueprint.Add(glass, "Glass Z", -1.5, 2, z5);
                            SampleBuildingBlueprint.Add(glass, "Glass Z", 1.5, 2, z5);
                        }
                    } finally {
                        if (Bridge.is($t10, System.IDisposable)) {
                            $t10.System$IDisposable$Dispose();
                        }
                    }
                    $t11 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5], System.Single));
                    try {
                        while ($t11.moveNext()) {
                            var x5 = $t11.Current;
                            SampleBuildingBlueprint.Add(glass, "Glass X", x5, 2, 2.5);
                        }
                    } finally {
                        if (Bridge.is($t11, System.IDisposable)) {
                            $t11.System$IDisposable$Dispose();
                        }
                    }

                    var innerRoof = SampleBuildingBlueprint.Part(parts, "Pink roof pit");
                    $t12 = Bridge.getEnumerator(System.Array.init([0.5, 1.5], System.Single));
                    try {
                        while ($t12.moveNext()) {
                            var z6 = $t12.Current;
                            $t13 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5], System.Single));
                            try {
                                while ($t13.moveNext()) {
                                    var x6 = $t13.Current;
                                    SampleBuildingBlueprint.Add(innerRoof, "Pink Roof Panel", x6, 3, z6);
                                }
                            } finally {
                                if (Bridge.is($t13, System.IDisposable)) {
                                    $t13.System$IDisposable$Dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t12, System.IDisposable)) {
                            $t12.System$IDisposable$Dispose();
                        }
                    }

                    var rim = SampleBuildingBlueprint.Part(parts, "White half-block roof rim");
                    $t14 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5, 1.5, 2.5], System.Single));
                    try {
                        while ($t14.moveNext()) {
                            var z7 = $t14.Current;
                            $t15 = Bridge.getEnumerator(System.Array.init([-1.5, -0.5, 0.5, 1.5], System.Single));
                            try {
                                while ($t15.moveNext()) {
                                    var x7 = $t15.Current;
                                    var inPit = Math.abs(x7) === 0.5 && (z7 === 0.5 || z7 === 1.5);
                                    var lastFrontBlocks = Math.abs(x7) === 0.5 && z7 === -0.5;
                                    if (!inPit && !lastFrontBlocks) {
                                        SampleBuildingBlueprint.Add(rim, "White Roof Slab", x7, 3, z7);
                                    }
                                }
                            } finally {
                                if (Bridge.is($t15, System.IDisposable)) {
                                    $t15.System$IDisposable$Dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t14, System.IDisposable)) {
                            $t14.System$IDisposable$Dispose();
                        }
                    }
                    var frontRim = SampleBuildingBlueprint.Part(parts, "Two front roof slabs");
                    SampleBuildingBlueprint.Add(frontRim, "White Roof Slab", -0.5, 3, -0.5);
                    SampleBuildingBlueprint.Add(frontRim, "White Roof Slab", 0.5, 3, -0.5);

                    var outerRoof = SampleBuildingBlueprint.Part(parts, "Outer pink roof panels");
                    $t16 = Bridge.getEnumerator(System.Array.init([-0.5, 0.5, 1.5, 2.5], System.Single));
                    try {
                        while ($t16.moveNext()) {
                            var z8 = $t16.Current;
                            SampleBuildingBlueprint.Add(outerRoof, "Pink Roof Panel", -2.5, 3, z8);
                            SampleBuildingBlueprint.Add(outerRoof, "Pink Roof Panel", 2.5, 3, z8);
                        }
                    } finally {
                        if (Bridge.is($t16, System.IDisposable)) {
                            $t16.System$IDisposable$Dispose();
                        }
                    }

                    var lamps = SampleBuildingBlueprint.Part(parts, "Hanging lights");
                    SampleBuildingBlueprint.Add(lamps, "Lantern", -2.5, 2.2, -0.5);
                    SampleBuildingBlueprint.Add(lamps, "Lantern", 2.5, 2.2, -0.5);

                    var signBases = SampleBuildingBlueprint.Part(parts, "Two roof sign bases");
                    SampleBuildingBlueprint.Add(signBases, "Sign Base", -0.5, 3.65, -0.53);
                    SampleBuildingBlueprint.Add(signBases, "Sign Base", 0.5, 3.65, -0.53);
                    SampleBuildingBlueprint.Add(SampleBuildingBlueprint.Part(parts, "First diagonal bone"), "Bone Diagonal", 0.5, 3.65, -0.53);
                    SampleBuildingBlueprint.Add(SampleBuildingBlueprint.Part(parts, "Second horizontal bone"), "Bone Horizontal", -0.5, 3.65, -0.53);

                    SampleBuildingBlueprint.Add(SampleBuildingBlueprint.Part(parts, "Empty water basin"), "Water Basin", -2.5, 0, -0.5);
                    SampleBuildingBlueprint.Add(SampleBuildingBlueprint.Part(parts, "Fill water basin"), "Water Fill", -2.5, 0, -0.5);

                    for (var stage = 1; stage <= 4; stage = (stage + 1) | 0) {
                        SampleBuildingBlueprint.Add(SampleBuildingBlueprint.Part(parts, "Fire basin stage " + stage), "Fire Stage " + stage, 2.5, 0, -0.5, "front-right-fire");
                    }

                    var surround = SampleBuildingBlueprint.Part(parts, "Three pink fire surrounds");
                    SampleBuildingBlueprint.Add(surround, "Fire Panel Front", 2.5, 0, -0.5);
                    SampleBuildingBlueprint.Add(surround, "Fire Panel Right", 2.5, 0, -0.5);
                    SampleBuildingBlueprint.Add(surround, "Fire Panel Back", 2.5, 0, -0.5);
                    return parts;
                },
                /*SampleBuildingBlueprint.Create:static end.*/

                /*SampleBuildingBlueprint.CreateGround:static start.*/
                CreateGround: function (material) {
if ( TRACE ) { TRACE( "SampleBuildingBlueprint#CreateGround", this ); }

                    var ground = UnityEngine.GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
                    ground.name = "Sample Ground";
                    ground.transform.position = new pc.Vec3( 0.0, -0.075, 2.0 );
                    ground.transform.localScale = new pc.Vec3( 24.0, 0.15, 24.0 );
                    ground.GetComponent(UnityEngine.Renderer).sharedMaterial = material;
                    ground.GetComponent(UnityEngine.Collider).enabled = false;
                },
                /*SampleBuildingBlueprint.CreateGround:static end.*/

                /*SampleBuildingBlueprint.Part:static start.*/
                Part: function (parts, name) {
if ( TRACE ) { TRACE( "SampleBuildingBlueprint#Part", this ); }

                    var $t;
                    var part = ($t = new BuildingPart(), $t.name = name, $t);
                    parts.add(part);
                    return part;
                },
                /*SampleBuildingBlueprint.Part:static end.*/

                /*SampleBuildingBlueprint.Add:static start.*/
                Add: function (part, style, x, y, z, replacementKey) {
if ( TRACE ) { TRACE( "SampleBuildingBlueprint#Add", this ); }

                    var $t;
                    if (replacementKey === void 0) { replacementKey = null; }
                    part.blocks.add(($t = new BuildBlock(), $t.type = style, $t.visualStyle = style, $t.replacementKey = replacementKey, $t.localPosition = new pc.Vec3( x, y, z ), $t.color = new pc.Color( 1, 1, 1, 1 ), $t));
                },
                /*SampleBuildingBlueprint.Add:static end.*/


            }
        }
    });
    /*SampleBuildingBlueprint end.*/

    /*WetGroundReflection start.*/
    Bridge.define("WetGroundReflection", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                ReflectionLayer: null,
                lightsDirty: false
            },
            ctors: {
                init: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#init", this ); }

                    this.ReflectionLayer = "WetReflectionObjects";
                    this.lightsDirty = true;
                }
            },
            methods: {
                /*WetGroundReflection.RefreshLightList:static start.*/
                RefreshLightList: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#RefreshLightList", this ); }

                    WetGroundReflection.lightsDirty = true;
                },
                /*WetGroundReflection.RefreshLightList:static end.*/

                /*WetGroundReflection.Include:static start.*/
                Include: function (root) {
if ( TRACE ) { TRACE( "WetGroundReflection#Include", this ); }

                    var $t;
                    var layer = UnityEngine.LayerMask.NameToLayer(WetGroundReflection.ReflectionLayer);
                    if (layer < 0 || UnityEngine.GameObject.op_Equality(root, null)) {
                        return;
                    }
                    $t = Bridge.getEnumerator(root.GetComponentsInChildren(UnityEngine.Renderer, true));
                    try {
                        while ($t.moveNext()) {
                            var r = $t.Current;
                            r.gameObject.layer = layer;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    WetGroundReflection.lightsDirty = true;
                },
                /*WetGroundReflection.Include:static end.*/

                /*WetGroundReflection.Exclude:static start.*/
                Exclude: function (root) {
if ( TRACE ) { TRACE( "WetGroundReflection#Exclude", this ); }

                    var $t;
                    if (UnityEngine.GameObject.op_Equality(root, null)) {
                        return;
                    }
                    var layer = UnityEngine.LayerMask.NameToLayer(WetGroundReflection.ReflectionLayer);
                    $t = Bridge.getEnumerator(root.GetComponentsInChildren(UnityEngine.Renderer, true));
                    try {
                        while ($t.moveNext()) {
                            var r = $t.Current;
                            if (r.gameObject.layer === layer) {
                                r.gameObject.layer = 0;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    WetGroundReflection.lightsDirty = true;
                },
                /*WetGroundReflection.Exclude:static end.*/


            }
        },
        fields: {
            viewCamera: null,
            reflectionCamera: null,
            groundMaterial: null,
            groundHeight: 0,
            updateEveryFrames: 0,
            frame: 0,
            sceneLights: null,
            temporarilyDisabled: null
        },
        ctors: {
            init: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#init", this ); }

                this.updateEveryFrames = 2;
                this.temporarilyDisabled = new (System.Collections.Generic.List$1(UnityEngine.Light)).ctor();
            }
        },
        methods: {
            /*WetGroundReflection.LateUpdate start.*/
            LateUpdate: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#LateUpdate", this ); }

                if (UnityEngine.Component.op_Equality(this.viewCamera, null) || UnityEngine.Component.op_Equality(this.reflectionCamera, null) || this.groundMaterial == null) {
                    return;
                }
                var update = Bridge.identity(this.frame, ((this.frame = (this.frame + 1) | 0))) % UnityEngine.Mathf.Max(1, this.updateEveryFrames) === 0;
                // Manual capture scopes light changes strictly to this camera, never the main view.
                this.reflectionCamera.enabled = false;
                if (!update) {
                    return;
                }
                if (this.viewCamera.transform.position.y <= this.groundHeight + 0.05) {
                    this.groundMaterial.SetFloat$1("_ReflectionReady", 0);
                    return;
                }
                this.Capture();
            },
            /*WetGroundReflection.LateUpdate end.*/

            /*WetGroundReflection.Capture start.*/
            Capture: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#Capture", this ); }

                var $t, $t1;
                if (UnityEngine.Component.op_Equality(this.viewCamera, null) || UnityEngine.Component.op_Equality(this.reflectionCamera, null) || this.groundMaterial == null) {
                    return;
                }
                this.reflectionCamera.enabled = false;
                this.UpdateView();
                if (this.sceneLights == null || WetGroundReflection.lightsDirty) {
                    this.sceneLights = UnityEngine.Object.FindObjectsOfType(PointLightReflectionExclusion);
                    WetGroundReflection.lightsDirty = false;
                }
                this.temporarilyDisabled.clear();
                try {
                    $t = Bridge.getEnumerator(this.sceneLights);
                    try {
                        while ($t.moveNext()) {
                            var entry = $t.Current;
                            var light = UnityEngine.MonoBehaviour.op_Inequality(entry, null) ? entry.source : null;
                            if (UnityEngine.Component.op_Inequality(light, null) && light.enabled) {
                                this.temporarilyDisabled.add(light);
                                light.enabled = false;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    this.reflectionCamera.Render();
                } finally {
                    $t1 = Bridge.getEnumerator(this.temporarilyDisabled);
                    try {
                        while ($t1.moveNext()) {
                            var light1 = $t1.Current;
                            if (UnityEngine.Component.op_Inequality(light1, null)) {
                                light1.enabled = true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                    this.temporarilyDisabled.clear();
                }
            },
            /*WetGroundReflection.Capture end.*/

            /*WetGroundReflection.UpdateView start.*/
            UpdateView: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#UpdateView", this ); }

                if (UnityEngine.Component.op_Equality(this.viewCamera, null) || UnityEngine.Component.op_Equality(this.reflectionCamera, null) || this.groundMaterial == null) {
                    return;
                }
                var position = this.viewCamera.transform.position.$clone();
                position.y = 2 * this.groundHeight - position.y;
                var forward = this.viewCamera.transform.forward.$clone();
                forward.y = -forward.y;
                var up = this.viewCamera.transform.up.$clone();
                up.y = -up.y;
                this.reflectionCamera.transform.SetPositionAndRotation(position, new pc.Quat().lookRotation( forward, up ));
                this.reflectionCamera.fieldOfView = this.viewCamera.fieldOfView;
                this.reflectionCamera.aspect = this.viewCamera.aspect;
                this.reflectionCamera.orthographic = this.viewCamera.orthographic;
                this.reflectionCamera.orthographicSize = this.viewCamera.orthographicSize;
                // Project the same mirrored camera onto the surface; no inverted culling required.
                var vp = new pc.Mat4().mul2( UnityEngine.GL.GetGPUProjectionMatrix(this.reflectionCamera.projectionMatrix, true), this.reflectionCamera.worldToCameraMatrix );
                this.groundMaterial.SetMatrix$1("_ReflectionVP", vp);
                this.groundMaterial.SetFloat$1("_ReflectionHeight", this.groundHeight);
                this.groundMaterial.SetFloat$1("_ReflectionReady", 1);
            },
            /*WetGroundReflection.UpdateView end.*/

            /*WetGroundReflection.OnDisable start.*/
            OnDisable: function () {
if ( TRACE ) { TRACE( "WetGroundReflection#OnDisable", this ); }

                if (UnityEngine.Component.op_Inequality(this.reflectionCamera, null)) {
                    this.reflectionCamera.enabled = false;
                }
                if (this.groundMaterial != null) {
                    this.groundMaterial.SetFloat$1("_ReflectionReady", 0);
                }
            },
            /*WetGroundReflection.OnDisable end.*/


        }
    });
    /*WetGroundReflection end.*/

    if ( MODULE_reflection ) {
    var $m = Bridge.setMetadata,
        $n = ["System","UnityEngine","System.Collections.Generic","System.Collections","UnityEngine.UI"];

    /*AdjacentBlockPreviews start.*/
    $m("AdjacentBlockPreviews", function () { return {"nested":[AdjacentBlockPreviews.PreviewEntry],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Clear","t":8,"sn":"Clear","rt":$n[0].Void},{"a":1,"n":"CopyVisuals","t":8,"pi":[{"n":"source","pt":$n[1].Transform,"ps":0},{"n":"destination","pt":$n[1].Transform,"ps":1},{"n":"fallbackColor","pt":$n[1].Color,"ps":2}],"sn":"CopyVisuals","rt":$n[0].Boolean,"p":[$n[1].Transform,$n[1].Transform,$n[1].Color],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"CreatePreview","t":8,"pi":[{"n":"block","pt":BuildBlock,"ps":0},{"n":"origin","pt":$n[1].Transform,"ps":1}],"sn":"CreatePreview","rt":$n[1].GameObject,"p":[BuildBlock,$n[1].Transform]},{"a":1,"n":"MakeTransparentMaterial","t":8,"pi":[{"n":"source","pt":$n[1].Material,"ps":0},{"n":"fallbackColor","pt":$n[1].Color,"ps":1}],"sn":"MakeTransparentMaterial","rt":$n[1].Material,"p":[$n[1].Material,$n[1].Color]},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"RemovePreview","t":8,"pi":[{"n":"block","pt":BuildBlock,"ps":0}],"sn":"RemovePreview","rt":$n[0].Void,"p":[BuildBlock]},{"a":2,"n":"ShowAdjacent","t":8,"pi":[{"n":"parts","pt":$n[2].IEnumerable$1(BuildingPart),"ps":0},{"n":"placedBlock","pt":BuildBlock,"ps":1},{"n":"origin","pt":$n[1].Transform,"ps":2}],"sn":"ShowAdjacent","rt":$n[0].Void,"p":[$n[2].IEnumerable$1(BuildingPart),BuildBlock,$n[1].Transform]},{"a":2,"n":"VisibleCount","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_VisibleCount","t":8,"rt":$n[0].Int32,"fg":"VisibleCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"VisibleCount"},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"opacity","t":4,"rt":$n[0].Single,"sn":"opacity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"previewMaterials","t":4,"rt":$n[2].List$1(UnityEngine.Material),"sn":"previewMaterials","ro":true},{"a":1,"n":"previews","t":4,"rt":$n[2].Dictionary$2(BuildBlock,AdjacentBlockPreviews.PreviewEntry),"sn":"previews","ro":true}]}; }, $n);
    /*AdjacentBlockPreviews end.*/

    /*AdjacentBlockPreviews+PreviewEntry start.*/
    $m("AdjacentBlockPreviews.PreviewEntry", function () { return {"td":AdjacentBlockPreviews,"att":1048835,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"materials","t":4,"rt":$n[2].List$1(UnityEngine.Material),"sn":"materials"},{"a":2,"n":"visual","t":4,"rt":$n[1].GameObject,"sn":"visual"}]}; }, $n);
    /*AdjacentBlockPreviews+PreviewEntry end.*/

    /*AudioController start.*/
    $m("AudioController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"PlayBlockPlaced","t":8,"sn":"PlayBlockPlaced","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"placementClip","t":4,"rt":$n[1].AudioClip,"sn":"placementClip"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"placementSource","t":4,"rt":$n[1].AudioSource,"sn":"placementSource"},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.RangeAttribute(0.0, 1.0)],"a":1,"n":"placementVolume","t":4,"rt":$n[0].Single,"sn":"placementVolume","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*AudioController end.*/

    /*BlockPlacementEffect start.*/
    $m("BlockPlacementEffect", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Cleanup","t":8,"sn":"Cleanup","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"Play","t":8,"pi":[{"n":"template","pt":$n[1].Material,"ps":0}],"sn":"Play","rt":$n[0].Void,"p":[$n[1].Material]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"Duration","is":true,"t":4,"rt":$n[0].Single,"sn":"Duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"elapsed","t":4,"rt":$n[0].Single,"sn":"elapsed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"finalScale","t":4,"rt":$n[1].Vector3,"sn":"finalScale"},{"a":1,"n":"flash","t":4,"rt":$n[1].Material,"sn":"flash"},{"a":1,"n":"overlays","t":4,"rt":$n[2].List$1(UnityEngine.GameObject),"sn":"overlays","ro":true},{"a":1,"n":"running","t":4,"rt":$n[0].Boolean,"sn":"running","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*BlockPlacementEffect end.*/

    /*BuildBlockPlacer start.*/
    $m("BuildBlockPlacer", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"GetMaterial","t":8,"pi":[{"n":"color","pt":$n[1].Color,"ps":0}],"sn":"GetMaterial","rt":$n[1].Material,"p":[$n[1].Color]},{"a":1,"n":"GetTexturedMaterial","t":8,"pi":[{"n":"color","pt":$n[1].Color,"ps":0},{"n":"texture","pt":$n[1].Texture,"ps":1}],"sn":"GetTexturedMaterial","rt":$n[1].Material,"p":[$n[1].Color,$n[1].Texture]},{"a":2,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":2,"n":"Place","t":8,"pi":[{"n":"block","pt":BuildBlock,"ps":0},{"n":"origin","pt":$n[1].Transform,"ps":1},{"n":"partName","pt":$n[0].String,"ps":2}],"sn":"Place","rt":$n[0].Void,"p":[BuildBlock,$n[1].Transform,$n[0].String]},{"a":1,"n":"blockMaterials","t":4,"rt":$n[2].Dictionary$2(UnityEngine.Color,UnityEngine.Material),"sn":"blockMaterials","ro":true},{"a":1,"n":"generatedMaterials","t":4,"rt":$n[2].List$1(UnityEngine.Material),"sn":"generatedMaterials","ro":true},{"a":1,"n":"placedRoot","t":4,"rt":$n[1].GameObject,"sn":"placedRoot"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"placementFlash","t":4,"rt":$n[1].Material,"sn":"placementFlash"},{"a":1,"n":"replacedBlocks","t":4,"rt":$n[2].Dictionary$2(System.String,UnityEngine.GameObject),"sn":"replacedBlocks","ro":true},{"a":1,"n":"texturedMaterials","t":4,"rt":$n[2].Dictionary$2(UnityEngine.Texture,UnityEngine.Material),"sn":"texturedMaterials","ro":true}]}; }, $n);
    /*BuildBlockPlacer end.*/

    /*BuildCameraController start.*/
    $m("BuildCameraController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"ApplyCameraPosition","t":8,"sn":"ApplyCameraPosition","rt":$n[0].Void},{"a":1,"n":"BeginPointer","t":8,"pi":[{"n":"position","pt":$n[1].Vector2,"ps":0}],"sn":"BeginPointer","rt":$n[0].Void,"p":[$n[1].Vector2]},{"a":1,"n":"EndPointer","t":8,"pi":[{"n":"position","pt":$n[1].Vector2,"ps":0}],"sn":"EndPointer","rt":$n[0].Void,"p":[$n[1].Vector2]},{"a":1,"n":"HandleKeyboardMovement","t":8,"sn":"HandleKeyboardMovement","rt":$n[0].Void},{"a":1,"n":"HandlePointer","t":8,"sn":"HandlePointer","rt":$n[0].Void},{"a":2,"n":"Initialize","t":8,"pi":[{"n":"camera","pt":$n[1].Camera,"ps":0},{"n":"buildGuide","pt":BuildGuide,"ps":1}],"sn":"Initialize","rt":$n[0].Void,"p":[$n[1].Camera,BuildGuide]},{"a":1,"n":"MovePointer","t":8,"pi":[{"n":"delta","pt":$n[1].Vector2,"ps":0},{"n":"position","pt":$n[1].Vector2,"ps":1}],"sn":"MovePointer","rt":$n[0].Void,"p":[$n[1].Vector2,$n[1].Vector2]},{"a":1,"n":"ReadCameraAngles","t":8,"sn":"ReadCameraAngles","rt":$n[0].Void},{"a":2,"n":"TurnTo","t":8,"pi":[{"n":"target","pt":$n[1].Vector3,"ps":0}],"sn":"TurnTo","rt":$n[3].IEnumerator,"p":[$n[1].Vector3]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdatePlayerVisual","t":8,"sn":"UpdatePlayerVisual","rt":$n[0].Void},{"a":2,"n":"InputEnabled","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_InputEnabled","t":8,"rt":$n[0].Boolean,"fg":"InputEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":2,"n":"set_InputEnabled","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"InputEnabled"},"fn":"InputEnabled"},{"a":1,"n":"__Property__Initializer__InputEnabled","t":4,"rt":$n[0].Boolean,"sn":"__Property__Initializer__InputEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"collisionRadius","t":4,"rt":$n[0].Single,"sn":"collisionRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"collisionWorld","t":4,"rt":BuildCollisionWorld,"sn":"collisionWorld"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"controls","t":4,"rt":BuildTouchControls,"sn":"controls"},{"a":1,"n":"eyePosition","t":4,"rt":$n[1].Vector3,"sn":"eyePosition"},{"a":1,"n":"guide","t":4,"rt":BuildGuide,"sn":"guide"},{"a":1,"n":"hud","t":4,"rt":BuildProgressUI,"sn":"hud"},{"a":1,"n":"lookPointer","t":4,"rt":$n[0].Int32,"sn":"lookPointer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"lookSensitivity","t":4,"rt":$n[0].Single,"sn":"lookSensitivity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"pitch","t":4,"rt":$n[0].Single,"sn":"pitch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"playerCamera","t":4,"rt":$n[1].Camera,"sn":"playerCamera"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerMotor","t":4,"rt":BuildPlayerMotor,"sn":"playerMotor"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerVisual","t":4,"rt":BuildPlayerVisual,"sn":"playerVisual"},{"a":1,"n":"pointerBlockIndex","t":4,"rt":$n[0].Int32,"sn":"pointerBlockIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"pointerDragged","t":4,"rt":$n[0].Boolean,"sn":"pointerDragged","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"pointerPartIndex","t":4,"rt":$n[0].Int32,"sn":"pointerPartIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"pointerStart","t":4,"rt":$n[1].Vector2,"sn":"pointerStart"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"tapMovementLimit","t":4,"rt":$n[0].Single,"sn":"tapMovementLimit","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"thirdPersonDistance","t":4,"rt":$n[0].Single,"sn":"thirdPersonDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"turnToBlockSeconds","t":4,"rt":$n[0].Single,"sn":"turnToBlockSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"yaw","t":4,"rt":$n[0].Single,"sn":"yaw","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"GuideClicked","t":2,"ad":{"a":2,"n":"add_GuideClicked","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addGuideClicked","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_GuideClicked","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeGuideClicked","rt":$n[0].Void,"p":[Function]}},{"a":1,"backing":true,"n":"<InputEnabled>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"InputEnabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*BuildCameraController end.*/

    /*BuildCollisionWorld start.*/
    $m("BuildCollisionWorld", function () { return {"nested":[BuildCollisionWorld.Hit],"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":2,"n":"Cast","t":8,"pi":[{"n":"center","pt":$n[1].Vector3,"ps":0},{"n":"halfSize","pt":$n[1].Vector3,"ps":1},{"n":"direction","pt":$n[1].Vector3,"ps":2},{"n":"distance","pt":$n[0].Single,"ps":3},{"n":"hit","out":true,"pt":BuildCollisionWorld.Hit,"ps":4}],"sn":"Cast","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3,$n[1].Vector3,$n[0].Single,BuildCollisionWorld.Hit],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"GetBox","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"box","out":true,"pt":$n[1].Bounds,"ps":1}],"sn":"GetBox","rt":$n[0].Boolean,"p":[$n[0].Int32,$n[1].Bounds],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"InitializeWorld","t":8,"sn":"InitializeWorld","rt":$n[0].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":2,"n":"Register","t":8,"pi":[{"n":"owner","pt":$n[1].GameObject,"ps":0}],"sn":"Register","rt":$n[0].Void,"p":[$n[1].GameObject]},{"a":2,"n":"ResolveOverlap","t":8,"pi":[{"n":"center","pt":$n[1].Vector3,"ps":0},{"n":"halfSize","pt":$n[1].Vector3,"ps":1}],"sn":"ResolveOverlap","rt":$n[1].Vector3,"p":[$n[1].Vector3,$n[1].Vector3]},{"a":2,"n":"Active","is":true,"t":16,"rt":BuildCollisionWorld,"g":{"a":2,"n":"get_Active","t":8,"rt":BuildCollisionWorld,"fg":"Active","is":true},"s":{"a":1,"n":"set_Active","t":8,"p":[BuildCollisionWorld],"rt":$n[0].Void,"fs":"Active","is":true},"fn":"Active"},{"a":1,"n":"Count","t":16,"rt":$n[0].Int32,"g":{"a":1,"n":"get_Count","t":8,"rt":$n[0].Int32,"fg":"Count","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"Count"},{"a":1,"n":"limitRegistered","t":4,"rt":$n[0].Boolean,"sn":"limitRegistered","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"limitRoot","t":4,"rt":$n[1].GameObject,"sn":"limitRoot"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"mapBoxData","t":4,"rt":$n[0].Array.type(System.Single),"sn":"mapBoxData"},{"a":1,"n":"mapBoxes","t":4,"rt":System.Array.type(UnityEngine.Bounds),"sn":"mapBoxes"},{"a":1,"n":"owners","t":4,"rt":$n[2].List$1(UnityEngine.GameObject),"sn":"owners","ro":true},{"a":1,"n":"placedBoxes","t":4,"rt":$n[2].List$1(UnityEngine.Bounds),"sn":"placedBoxes","ro":true},{"a":1,"backing":true,"n":"<Active>k__BackingField","is":true,"t":4,"rt":BuildCollisionWorld,"sn":"Active"}]}; }, $n);
    /*BuildCollisionWorld end.*/

    /*BuildCollisionWorld+Hit start.*/
    $m("BuildCollisionWorld.Hit", function () { return {"td":BuildCollisionWorld,"att":1048842,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"distance","t":4,"rt":$n[0].Single,"sn":"distance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"normal","t":4,"rt":$n[1].Vector3,"sn":"normal"},{"a":2,"n":"point","t":4,"rt":$n[1].Vector3,"sn":"point"}]}; }, $n);
    /*BuildCollisionWorld+Hit end.*/

    /*BuildCompleteFireworks start.*/
    $m("BuildCompleteFireworks", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Draw","t":8,"sn":"Draw","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"PlayOnce","t":8,"pi":[{"n":"launchPosition","pt":$n[1].Vector3,"ps":0},{"n":"camera","pt":$n[1].Camera,"ps":1}],"sn":"PlayOnce","rt":$n[0].Void,"p":[$n[1].Vector3,$n[1].Camera]},{"a":1,"n":"PlaySound","is":true,"t":8,"pi":[{"n":"sources","pt":System.Array.type(UnityEngine.AudioSource),"ps":0},{"n":"shot","pt":$n[0].Int32,"ps":1}],"sn":"PlaySound","rt":$n[0].Void,"p":[System.Array.type(UnityEngine.AudioSource),$n[0].Int32]},{"a":1,"n":"PlaySounds","t":8,"sn":"PlaySounds","rt":$n[0].Void},{"a":1,"n":"Quad","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"a","pt":$n[1].Vector3,"ps":1},{"n":"b","pt":$n[1].Vector3,"ps":2},{"n":"width","pt":$n[1].Vector3,"ps":3},{"n":"color","pt":$n[1].Color,"ps":4}],"sn":"Quad","rt":$n[0].Void,"p":[$n[0].Int32,$n[1].Vector3,$n[1].Vector3,$n[1].Vector3,$n[1].Color]},{"a":1,"n":"StopSounds","is":true,"t":8,"pi":[{"n":"sources","pt":System.Array.type(UnityEngine.AudioSource),"ps":0}],"sn":"StopSounds","rt":$n[0].Void,"p":[System.Array.type(UnityEngine.AudioSource)]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"HasPlayed","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_HasPlayed","t":8,"rt":$n[0].Boolean,"fg":"HasPlayed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_HasPlayed","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"HasPlayed"},"fn":"HasPlayed"},{"a":2,"n":"IsPlaying","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsPlaying","t":8,"rt":$n[0].Boolean,"fg":"IsPlaying","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsPlaying"},{"a":1,"n":"Life","is":true,"t":4,"rt":$n[0].Single,"sn":"Life","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Quads","is":true,"t":4,"rt":$n[0].Int32,"sn":"Quads","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Rise","is":true,"t":4,"rt":$n[0].Single,"sn":"Rise","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Shots","is":true,"t":4,"rt":$n[0].Int32,"sn":"Shots","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"Sparks","is":true,"t":4,"rt":$n[0].Int32,"sn":"Sparks","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"burstAudio","t":4,"rt":System.Array.type(UnityEngine.AudioSource),"sn":"burstAudio"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"burstHeight","t":4,"rt":$n[0].Single,"sn":"burstHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"colors","t":4,"rt":System.Array.type(UnityEngine.Color),"sn":"colors","ro":true},{"a":1,"n":"elapsed","t":4,"rt":$n[0].Single,"sn":"elapsed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"flightAudio","t":4,"rt":System.Array.type(UnityEngine.AudioSource),"sn":"flightAudio"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"launchAudio","t":4,"rt":System.Array.type(UnityEngine.AudioSource),"sn":"launchAudio"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"launchInterval","t":4,"rt":$n[0].Single,"sn":"launchInterval","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"mesh","t":4,"rt":$n[1].Mesh,"sn":"mesh"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"meshFilter","t":4,"rt":$n[1].MeshFilter,"sn":"meshFilter"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"meshRenderer","t":4,"rt":$n[1].MeshRenderer,"sn":"meshRenderer"},{"a":1,"n":"palette","t":4,"rt":System.Array.type(UnityEngine.Color),"sn":"palette","ro":true},{"a":1,"n":"running","t":4,"rt":$n[0].Boolean,"sn":"running","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"soundStages","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"soundStages","ro":true},{"a":1,"n":"vertices","t":4,"rt":System.Array.type(UnityEngine.Vector3),"sn":"vertices","ro":true},{"a":1,"n":"view","t":4,"rt":$n[1].Camera,"sn":"view"},{"a":1,"backing":true,"n":"<HasPlayed>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"HasPlayed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*BuildCompleteFireworks end.*/

    /*BuildGuide start.*/
    $m("BuildGuide", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AppendBox","is":true,"t":8,"pi":[{"n":"vertices","pt":$n[2].List$1(UnityEngine.Vector3),"ps":0},{"n":"triangles","pt":$n[2].List$1(System.Int32),"ps":1},{"n":"center","pt":$n[1].Vector3,"ps":2},{"n":"size","pt":$n[1].Vector3,"ps":3}],"sn":"AppendBox","rt":$n[0].Void,"p":[$n[2].List$1(UnityEngine.Vector3),$n[2].List$1(System.Int32),$n[1].Vector3,$n[1].Vector3]},{"a":1,"n":"CreateDashedFrameMesh","is":true,"t":8,"sn":"CreateDashedFrameMesh","rt":$n[1].Mesh},{"a":2,"n":"Hide","t":8,"sn":"Hide","rt":$n[0].Void},{"a":2,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"a":1,"n":"MakeFaceMaterial","is":true,"t":8,"sn":"MakeFaceMaterial","rt":$n[1].Material},{"a":1,"n":"MatchesType","is":true,"t":8,"pi":[{"n":"type","pt":$n[0].String,"ps":0},{"n":"types","pt":$n[0].Array.type(System.String),"ps":1}],"sn":"MatchesType","rt":$n[0].Boolean,"p":[$n[0].String,$n[0].Array.type(System.String)],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":2,"n":"ShowBest","t":8,"pi":[{"n":"parts","pt":$n[2].List$1(BuildingPart),"ps":0},{"n":"camera","pt":$n[1].Camera,"ps":1},{"n":"origin","pt":$n[1].Transform,"ps":2},{"n":"force","pt":$n[0].Boolean,"ps":3},{"n":"selectedTypes","dv":null,"o":true,"pt":$n[0].Array.type(System.String),"ps":4}],"sn":"ShowBest","rt":$n[0].Void,"p":[$n[2].List$1(BuildingPart),$n[1].Camera,$n[1].Transform,$n[0].Boolean,$n[0].Array.type(System.String)]},{"a":2,"n":"TryGetBlockUnderPointer","t":8,"pi":[{"n":"camera","pt":$n[1].Camera,"ps":0},{"n":"position","pt":$n[1].Vector2,"ps":1},{"n":"blockIndex","out":true,"pt":$n[0].Int32,"ps":2}],"sn":"TryGetBlockUnderPointer","rt":$n[0].Boolean,"p":[$n[1].Camera,$n[1].Vector2,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"SelectedIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_SelectedIndex","t":8,"rt":$n[0].Int32,"fg":"SelectedIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_SelectedIndex","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"SelectedIndex"},"fn":"SelectedIndex"},{"a":2,"n":"SelectedPartIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_SelectedPartIndex","t":8,"rt":$n[0].Int32,"fg":"SelectedPartIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_SelectedPartIndex","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"SelectedPartIndex"},"fn":"SelectedPartIndex"},{"a":2,"n":"TargetPosition","t":16,"rt":$n[1].Vector3,"g":{"a":2,"n":"get_TargetPosition","t":8,"rt":$n[1].Vector3,"fg":"TargetPosition"},"fn":"TargetPosition"},{"a":2,"n":"Visible","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Visible","t":8,"rt":$n[0].Boolean,"fg":"Visible","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"Visible"},{"a":1,"n":"__Property__Initializer__SelectedIndex","t":4,"rt":$n[0].Int32,"sn":"__Property__Initializer__SelectedIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"__Property__Initializer__SelectedPartIndex","t":4,"rt":$n[0].Int32,"sn":"__Property__Initializer__SelectedPartIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"currentPart","t":4,"rt":BuildingPart,"sn":"currentPart"},{"a":1,"n":"faceMaterial","t":4,"rt":$n[1].Material,"sn":"faceMaterial"},{"a":1,"n":"outlineMaterial","t":4,"rt":$n[1].Material,"sn":"outlineMaterial"},{"a":1,"n":"outlineMesh","t":4,"rt":$n[1].Mesh,"sn":"outlineMesh"},{"a":1,"n":"targetCollider","t":4,"rt":$n[1].Collider,"sn":"targetCollider"},{"a":1,"n":"targetCube","t":4,"rt":$n[1].GameObject,"sn":"targetCube"},{"a":1,"backing":true,"n":"<SelectedIndex>k__BackingField","t":4,"rt":$n[0].Int32,"sn":"SelectedIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"backing":true,"n":"<SelectedPartIndex>k__BackingField","t":4,"rt":$n[0].Int32,"sn":"SelectedPartIndex","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*BuildGuide end.*/

    /*BuildBlock start.*/
    $m("BuildBlock", function () { return {"att":1056769,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"IsFaceNeighbourOf","t":8,"pi":[{"n":"other","pt":BuildBlock,"ps":0}],"sn":"IsFaceNeighbourOf","rt":$n[0].Boolean,"p":[BuildBlock],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"WorldPosition","t":8,"pi":[{"n":"origin","pt":$n[1].Transform,"ps":0}],"sn":"WorldPosition","rt":$n[1].Vector3,"p":[$n[1].Transform]},{"a":2,"n":"built","t":4,"rt":$n[0].Boolean,"sn":"built","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"color","t":4,"rt":$n[1].Color,"sn":"color"},{"a":2,"n":"customBounds","t":4,"rt":$n[1].Bounds,"sn":"customBounds"},{"a":2,"n":"hasCustomBounds","t":4,"rt":$n[0].Boolean,"sn":"hasCustomBounds","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"localPosition","t":4,"rt":$n[1].Vector3,"sn":"localPosition"},{"a":2,"n":"localRotation","t":4,"rt":$n[1].Quaternion,"sn":"localRotation"},{"a":2,"n":"prefab","t":4,"rt":$n[1].GameObject,"sn":"prefab"},{"a":2,"n":"replacementKey","t":4,"rt":$n[0].String,"sn":"replacementKey"},{"a":2,"n":"type","t":4,"rt":$n[0].String,"sn":"type"},{"a":2,"n":"visualStyle","t":4,"rt":$n[0].String,"sn":"visualStyle"}]}; }, $n);
    /*BuildBlock end.*/

    /*BuildingPart start.*/
    $m("BuildingPart", function () { return {"att":1056769,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"blocks","t":4,"rt":$n[2].List$1(BuildBlock),"sn":"blocks"},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"}]}; }, $n);
    /*BuildingPart end.*/

    /*BuildPlayerMotor start.*/
    $m("BuildPlayerMotor", function () { return {"att":1057025,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Cast","t":8,"pi":[{"n":"eye","pt":$n[1].Vector3,"ps":0},{"n":"radius","pt":$n[0].Single,"ps":1},{"n":"direction","pt":$n[1].Vector3,"ps":2},{"n":"distance","pt":$n[0].Single,"ps":3},{"n":"hit","out":true,"pt":BuildCollisionWorld.Hit,"ps":4}],"sn":"Cast","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[0].Single,$n[1].Vector3,$n[0].Single,BuildCollisionWorld.Hit],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Move","t":8,"pi":[{"n":"eye","pt":$n[1].Vector3,"ps":0},{"n":"input","pt":$n[1].Vector3,"ps":1},{"n":"vertical","pt":$n[0].Single,"ps":2},{"n":"flying","pt":$n[0].Boolean,"ps":3},{"n":"jump","pt":$n[0].Boolean,"ps":4},{"n":"radius","pt":$n[0].Single,"ps":5},{"n":"deltaTime","pt":$n[0].Single,"ps":6}],"sn":"Move","rt":$n[1].Vector3,"p":[$n[1].Vector3,$n[1].Vector3,$n[0].Single,$n[0].Boolean,$n[0].Boolean,$n[0].Single,$n[0].Single]},{"a":1,"n":"Raycast","t":8,"pi":[{"n":"start","pt":$n[1].Vector3,"ps":0},{"n":"direction","pt":$n[1].Vector3,"ps":1},{"n":"distance","pt":$n[0].Single,"ps":2},{"n":"hit","out":true,"pt":BuildCollisionWorld.Hit,"ps":3}],"sn":"Raycast","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3,$n[0].Single,BuildCollisionWorld.Hit],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"ShouldAutoJump","t":8,"pi":[{"n":"eye","pt":$n[1].Vector3,"ps":0},{"n":"input","pt":$n[1].Vector3,"ps":1},{"n":"radius","pt":$n[0].Single,"ps":2}],"sn":"ShouldAutoJump","rt":$n[0].Boolean,"p":[$n[1].Vector3,$n[1].Vector3,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Stop","t":8,"sn":"Stop","rt":$n[0].Void},{"a":1,"n":"Sweep","t":8,"pi":[{"n":"eye","pt":$n[1].Vector3,"ps":0},{"n":"movement","pt":$n[1].Vector3,"ps":1},{"n":"radius","pt":$n[0].Single,"ps":2}],"sn":"Sweep","rt":$n[1].Vector3,"p":[$n[1].Vector3,$n[1].Vector3,$n[0].Single]},{"a":2,"n":"Grounded","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Grounded","t":8,"rt":$n[0].Boolean,"fg":"Grounded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_Grounded","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"Grounded"},"fn":"Grounded"},{"a":2,"n":"Velocity","t":16,"rt":$n[1].Vector3,"g":{"a":2,"n":"get_Velocity","t":8,"rt":$n[1].Vector3,"fg":"Velocity"},"s":{"a":1,"n":"set_Velocity","t":8,"p":[$n[1].Vector3],"rt":$n[0].Void,"fs":"Velocity"},"fn":"Velocity"},{"a":1,"n":"Skin","is":true,"t":4,"rt":$n[0].Single,"sn":"Skin","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"airAcceleration","t":4,"rt":$n[0].Single,"sn":"airAcceleration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"autoJump","t":4,"rt":$n[0].Boolean,"sn":"autoJump","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"bodyHeight","t":4,"rt":$n[0].Single,"sn":"bodyHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"eyeHeight","t":4,"rt":$n[0].Single,"sn":"eyeHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"flySpeed","t":4,"rt":$n[0].Single,"sn":"flySpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"gravity","t":4,"rt":$n[0].Single,"sn":"gravity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"jumpCooldown","t":4,"rt":$n[0].Single,"sn":"jumpCooldown","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"jumpSpeed","t":4,"rt":$n[0].Single,"sn":"jumpSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"maxFlyHeight","t":4,"rt":$n[0].Single,"sn":"maxFlyHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"movementSharpness","t":4,"rt":$n[0].Single,"sn":"movementSharpness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"walkSpeed","t":4,"rt":$n[0].Single,"sn":"walkSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"backing":true,"n":"<Grounded>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"Grounded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"backing":true,"n":"<Velocity>k__BackingField","t":4,"rt":$n[1].Vector3,"sn":"Velocity"}]}; }, $n);
    /*BuildPlayerMotor end.*/

    /*BuildPlayerVisual start.*/
    $m("BuildPlayerVisual", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"PlayBuild","t":8,"sn":"PlayBuild","rt":$n[0].Void},{"a":2,"n":"Synchronize","t":8,"pi":[{"n":"feet","pt":$n[1].Vector3,"ps":0},{"n":"lookYaw","pt":$n[0].Single,"ps":1},{"n":"velocity","pt":$n[1].Vector3,"ps":2},{"n":"grounded","pt":$n[0].Boolean,"ps":3},{"n":"flying","pt":$n[0].Boolean,"ps":4},{"n":"visible","pt":$n[0].Boolean,"ps":5}],"sn":"Synchronize","rt":$n[0].Void,"p":[$n[1].Vector3,$n[0].Single,$n[1].Vector3,$n[0].Boolean,$n[0].Boolean,$n[0].Boolean]},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"animator","t":4,"rt":$n[1].Animator,"sn":"animator"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"body","t":4,"rt":System.Array.type(UnityEngine.Renderer),"sn":"body"},{"a":1,"n":"buildUntil","t":4,"rt":$n[0].Single,"sn":"buildUntil","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"currentState","t":4,"rt":$n[0].String,"sn":"currentState"}]}; }, $n);
    /*BuildPlayerVisual end.*/

    /*BuildProgressUI start.*/
    $m("BuildProgressUI", function () { return {"nested":[BuildProgressUI.BlockItem],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"BeginPointer","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0},{"n":"position","pt":$n[1].Vector2,"ps":1}],"sn":"BeginPointer","rt":$n[0].Boolean,"p":[$n[0].Int32,$n[1].Vector2],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"EndPointer","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0},{"n":"position","pt":$n[1].Vector2,"ps":1},{"n":"canceled","pt":$n[0].Boolean,"ps":2}],"sn":"EndPointer","rt":$n[0].Void,"p":[$n[0].Int32,$n[1].Vector2,$n[0].Boolean]},{"a":2,"n":"Initialize","t":8,"pi":[{"n":"gameController","pt":GameController,"ps":0}],"sn":"Initialize","rt":$n[0].Void,"p":[GameController]},{"a":1,"n":"Matches","is":true,"t":8,"pi":[{"n":"item","pt":BuildProgressUI.BlockItem,"ps":0},{"n":"type","pt":$n[0].String,"ps":1}],"sn":"Matches","rt":$n[0].Boolean,"p":[BuildProgressUI.BlockItem,$n[0].String],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Refresh","t":8,"sn":"Refresh","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"amounts","t":4,"rt":System.Array.type(UnityEngine.UI.Text),"sn":"amounts"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"bar","t":4,"rt":$n[1].RectTransform,"sn":"bar"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"blockImages","t":4,"rt":System.Array.type(UnityEngine.UI.Image),"sn":"blockImages"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"blockItems","t":4,"rt":System.Array.type(BuildProgressUI.BlockItem),"sn":"blockItems"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"building","t":4,"rt":$n[1].RectTransform,"sn":"building"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"canvasRoot","t":4,"rt":$n[1].RectTransform,"sn":"canvasRoot"},{"a":1,"n":"controller","t":4,"rt":GameController,"sn":"controller"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"count","t":4,"rt":$n[4].Text,"sn":"count"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"fill","t":4,"rt":$n[1].RectTransform,"sn":"fill"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"install","t":4,"rt":$n[1].RectTransform,"sn":"install"},{"a":1,"n":"installPointer","t":4,"rt":$n[0].Int32,"sn":"installPointer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"inventory","t":4,"rt":$n[1].RectTransform,"sn":"inventory"},{"a":1,"n":"lastBlock","t":4,"rt":$n[0].Int32,"sn":"lastBlock","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastBuilt","t":4,"rt":$n[0].Int32,"sn":"lastBuilt","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastPart","t":4,"rt":$n[0].Int32,"sn":"lastPart","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"logo","t":4,"rt":$n[1].RectTransform,"sn":"logo"},{"a":1,"n":"pressedSlot","t":4,"rt":$n[0].Int32,"sn":"pressedSlot","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"slotPointer","t":4,"rt":$n[0].Int32,"sn":"slotPointer","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"slotPressPosition","t":4,"rt":$n[1].Vector2,"sn":"slotPressPosition"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"slots","t":4,"rt":System.Array.type(UnityEngine.RectTransform),"sn":"slots"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"title","t":4,"rt":$n[4].Text,"sn":"title"},{"a":2,"n":"BlockSlotClicked","t":2,"ad":{"a":2,"n":"add_BlockSlotClicked","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addBlockSlotClicked","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_BlockSlotClicked","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeBlockSlotClicked","rt":$n[0].Void,"p":[Function]}}]}; }, $n);
    /*BuildProgressUI end.*/

    /*BuildProgressUI+BlockItem start.*/
    $m("BuildProgressUI.BlockItem", function () { return {"td":BuildProgressUI,"att":1056770,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"blocks","t":4,"rt":$n[2].List$1(BuildBlock),"sn":"blocks"},{"a":2,"n":"label","t":4,"rt":$n[0].String,"sn":"label"},{"a":2,"n":"types","t":4,"rt":$n[0].Array.type(System.String),"sn":"types"}]}; }, $n);
    /*BuildProgressUI+BlockItem end.*/

    /*BuildTapTutorial start.*/
    $m("BuildTapTutorial", function () { return {"att":1048833,"a":2,"at":[new UnityEngine.DefaultExecutionOrder(100)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"OnGuideClicked","t":8,"sn":"OnGuideClicked","rt":$n[0].Void},{"a":1,"n":"SetVisible","t":8,"pi":[{"n":"value","pt":$n[0].Boolean,"ps":0}],"sn":"SetVisible","rt":$n[0].Void,"p":[$n[0].Boolean]},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"container","t":4,"rt":$n[1].RectTransform,"sn":"container"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"controller","t":4,"rt":GameController,"sn":"controller"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"idleSeconds","t":4,"rt":$n[0].Single,"sn":"idleSeconds","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"lastBlock","t":4,"rt":$n[0].Int32,"sn":"lastBlock","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastInput","t":4,"rt":$n[0].Single,"sn":"lastInput","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"lastPart","t":4,"rt":$n[0].Int32,"sn":"lastPart","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"showing","t":4,"rt":$n[0].Boolean,"sn":"showing","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"shownAt","t":4,"rt":$n[0].Single,"sn":"shownAt","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"view","t":4,"rt":$n[1].Camera,"sn":"view"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"visuals","t":4,"rt":$n[1].CanvasGroup,"sn":"visuals"}]}; }, $n);
    /*BuildTapTutorial end.*/

    /*BuildTouchControls start.*/
    $m("BuildTouchControls", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"AcknowledgeLanding","t":8,"sn":"AcknowledgeLanding","rt":$n[0].Void},{"a":2,"n":"Begin","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0},{"n":"p","pt":$n[1].Vector2,"ps":1}],"sn":"Begin","rt":$n[0].Boolean,"p":[$n[0].Int32,$n[1].Vector2],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"End","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0}],"sn":"End","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":2,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"a":2,"n":"Move","t":8,"pi":[{"n":"id","pt":$n[0].Int32,"ps":0},{"n":"p","pt":$n[1].Vector2,"ps":1}],"sn":"Move","rt":$n[0].Void,"p":[$n[0].Int32,$n[1].Vector2]},{"a":2,"n":"ResetInput","t":8,"sn":"ResetInput","rt":$n[0].Void},{"a":1,"n":"SetFlight","t":8,"pi":[{"n":"value","pt":$n[0].Boolean,"ps":0}],"sn":"SetFlight","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"Flying","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_Flying","t":8,"rt":$n[0].Boolean,"fg":"Flying","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_Flying","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"Flying"},"fn":"Flying"},{"a":2,"n":"JustLanded","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_JustLanded","t":8,"rt":$n[0].Boolean,"fg":"JustLanded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_JustLanded","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"JustLanded"},"fn":"JustLanded"},{"a":2,"n":"Movement","t":16,"rt":$n[1].Vector2,"g":{"a":2,"n":"get_Movement","t":8,"rt":$n[1].Vector2,"fg":"Movement"},"s":{"a":1,"n":"set_Movement","t":8,"p":[$n[1].Vector2],"rt":$n[0].Void,"fs":"Movement"},"fn":"Movement"},{"a":2,"n":"ThirdPerson","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_ThirdPerson","t":8,"rt":$n[0].Boolean,"fg":"ThirdPerson","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_ThirdPerson","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"ThirdPerson"},"fn":"ThirdPerson"},{"a":2,"n":"Vertical","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Vertical","t":8,"rt":$n[0].Single,"fg":"Vertical","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"fn":"Vertical"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"down","t":4,"rt":$n[1].RectTransform,"sn":"down"},{"a":1,"n":"downId","t":4,"rt":$n[0].Int32,"sn":"downId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"exit","t":4,"rt":$n[1].RectTransform,"sn":"exit"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"fly","t":4,"rt":$n[1].RectTransform,"sn":"fly"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"knob","t":4,"rt":$n[1].RectTransform,"sn":"knob"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"stick","t":4,"rt":$n[1].RectTransform,"sn":"stick"},{"a":1,"n":"stickId","t":4,"rt":$n[0].Int32,"sn":"stickId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"up","t":4,"rt":$n[1].RectTransform,"sn":"up"},{"a":1,"n":"upId","t":4,"rt":$n[0].Int32,"sn":"upId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"viewButton","t":4,"rt":$n[1].RectTransform,"sn":"viewButton"},{"a":2,"n":"FlyClicked","t":2,"ad":{"a":2,"n":"add_FlyClicked","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addFlyClicked","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_FlyClicked","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeFlyClicked","rt":$n[0].Void,"p":[Function]}},{"a":1,"backing":true,"n":"<Flying>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"Flying","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"backing":true,"n":"<JustLanded>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"JustLanded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"backing":true,"n":"<Movement>k__BackingField","t":4,"rt":$n[1].Vector2,"sn":"Movement"},{"a":1,"backing":true,"n":"<ThirdPerson>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"ThirdPerson","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*BuildTouchControls end.*/

    /*CraftHudStyle start.*/
    $m("CraftHudStyle", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"Hit","is":true,"t":8,"pi":[{"n":"rect","pt":$n[1].RectTransform,"ps":0},{"n":"position","pt":$n[1].Vector2,"ps":1}],"sn":"Hit","rt":$n[0].Boolean,"p":[$n[1].RectTransform,$n[1].Vector2],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"SafeArea","is":true,"t":16,"rt":$n[1].Rect,"g":{"a":2,"n":"get_SafeArea","t":8,"rt":$n[1].Rect,"fg":"SafeArea","is":true},"fn":"SafeArea"}]}; }, $n);
    /*CraftHudStyle end.*/

    /*CraftRain start.*/
    $m("CraftRain", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"camera","pt":$n[1].Camera,"ps":0}],"sn":"Create","rt":$n[0].Void,"p":[$n[1].Camera]},{"a":1,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"Quad","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"a","pt":$n[1].Vector3,"ps":1},{"n":"b","pt":$n[1].Vector3,"ps":2},{"n":"halfWidth","pt":$n[1].Vector3,"ps":3}],"sn":"Quad","rt":$n[0].Void,"p":[$n[0].Int32,$n[1].Vector3,$n[1].Vector3,$n[1].Vector3]},{"a":1,"n":"Random01","t":8,"sn":"Random01","rt":$n[0].Single,"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"ResetDrop","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0},{"n":"initial","pt":$n[0].Boolean,"ps":1}],"sn":"ResetDrop","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Boolean]},{"a":1,"n":"DropCount","is":true,"t":4,"rt":$n[0].Int32,"sn":"DropCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"QuadCount","is":true,"t":4,"rt":$n[0].Int32,"sn":"QuadCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"SplashCount","is":true,"t":4,"rt":$n[0].Int32,"sn":"SplashCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"ages","t":4,"rt":$n[0].Array.type(System.Single),"sn":"ages","ro":true},{"a":1,"n":"drops","t":4,"rt":System.Array.type(UnityEngine.Vector3),"sn":"drops","ro":true},{"a":1,"n":"material","t":4,"rt":$n[1].Material,"sn":"material"},{"a":1,"n":"mesh","t":4,"rt":$n[1].Mesh,"sn":"mesh"},{"a":1,"n":"random","t":4,"rt":$n[0].Random,"sn":"random"},{"a":1,"n":"splashCursor","t":4,"rt":$n[0].Int32,"sn":"splashCursor","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"splashes","t":4,"rt":System.Array.type(UnityEngine.Vector3),"sn":"splashes","ro":true},{"a":1,"n":"vertices","t":4,"rt":System.Array.type(UnityEngine.Vector3),"sn":"vertices","ro":true},{"a":1,"n":"view","t":4,"rt":$n[1].Camera,"sn":"view"}]}; }, $n);
    /*CraftRain end.*/

    /*GameController start.*/
    $m("GameController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"FocusSelectedGuide","t":8,"sn":"FocusSelectedGuide","rt":$n[3].IEnumerator},{"a":2,"n":"GetPart","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"GetPart","rt":BuildingPart,"p":[$n[0].Int32]},{"a":1,"n":"HandleGuideClicked","t":8,"pi":[{"n":"selectedPart","pt":$n[0].Int32,"ps":0},{"n":"blockIndex","pt":$n[0].Int32,"ps":1}],"sn":"HandleGuideClicked","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Int32]},{"a":1,"n":"HasUnbuiltType","t":8,"pi":[{"n":"types","pt":$n[0].Array.type(System.String),"ps":0}],"sn":"HasUnbuiltType","rt":$n[0].Boolean,"p":[$n[0].Array.type(System.String)],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":2,"n":"SelectBlockTypes","t":8,"pi":[{"n":"types","pt":$n[0].Array.type(System.String),"ps":0}],"sn":"SelectBlockTypes","rt":$n[0].Boolean,"p":[$n[0].Array.type(System.String)],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"SelectGuide","t":8,"pi":[{"n":"force","pt":$n[0].Boolean,"ps":0}],"sn":"SelectGuide","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":2,"n":"TryGetGuidePosition","t":8,"pi":[{"n":"position","out":true,"pt":$n[1].Vector3,"ps":0}],"sn":"TryGetGuidePosition","rt":$n[0].Boolean,"p":[$n[1].Vector3],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"TurnAndBuild","t":8,"pi":[{"n":"selectedPart","pt":$n[0].Int32,"ps":0},{"n":"selectedBlock","pt":$n[0].Int32,"ps":1}],"sn":"TurnAndBuild","rt":$n[3].IEnumerator,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"BuiltBlocks","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_BuiltBlocks","t":8,"rt":$n[0].Int32,"fg":"BuiltBlocks","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"BuiltBlocks"},{"a":2,"n":"CurrentBlockIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_CurrentBlockIndex","t":8,"rt":$n[0].Int32,"fg":"CurrentBlockIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"CurrentBlockIndex"},{"a":2,"n":"CurrentPartIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_CurrentPartIndex","t":8,"rt":$n[0].Int32,"fg":"CurrentPartIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"CurrentPartIndex"},{"a":2,"n":"CurrentPartName","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_CurrentPartName","t":8,"rt":$n[0].String,"fg":"CurrentPartName"},"fn":"CurrentPartName"},{"a":2,"n":"IsComplete","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsComplete","t":8,"rt":$n[0].Boolean,"fg":"IsComplete","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsComplete"},{"a":2,"n":"PartCount","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_PartCount","t":8,"rt":$n[0].Int32,"fg":"PartCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"PartCount"},{"a":2,"n":"TotalBlocks","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_TotalBlocks","t":8,"rt":$n[0].Int32,"fg":"TotalBlocks","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"TotalBlocks"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"adjacentPreviews","t":4,"rt":AdjacentBlockPreviews,"sn":"adjacentPreviews"},{"a":1,"n":"audioController","t":4,"rt":AudioController,"sn":"audioController"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"blockPlacer","t":4,"rt":BuildBlockPlacer,"sn":"blockPlacer"},{"a":1,"n":"buildRoutine","t":4,"rt":$n[1].Coroutine,"sn":"buildRoutine"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"buildingOrigin","t":4,"rt":$n[1].Transform,"sn":"buildingOrigin"},{"a":1,"n":"builtBlocks","t":4,"rt":$n[0].Int32,"sn":"builtBlocks","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"cameraController","t":4,"rt":BuildCameraController,"sn":"cameraController"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"completionFireworks","t":4,"rt":BuildCompleteFireworks,"sn":"completionFireworks"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"createSampleBlueprintWhenEmpty","t":4,"rt":$n[0].Boolean,"sn":"createSampleBlueprintWhenEmpty","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"guide","t":4,"rt":BuildGuide,"sn":"guide"},{"a":1,"n":"partIndex","t":4,"rt":$n[0].Int32,"sn":"partIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Blueprint"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"parts","t":4,"rt":$n[2].List$1(BuildingPart),"sn":"parts"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"playerCamera","t":4,"rt":$n[1].Camera,"sn":"playerCamera"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"progressUI","t":4,"rt":BuildProgressUI,"sn":"progressUI"},{"a":1,"n":"selectedBlockTypes","t":4,"rt":$n[0].Array.type(System.String),"sn":"selectedBlockTypes"},{"a":1,"n":"totalBlocks","t":4,"rt":$n[0].Int32,"sn":"totalBlocks","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"GuideBuildAccepted","t":2,"ad":{"a":2,"n":"add_GuideBuildAccepted","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addGuideBuildAccepted","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_GuideBuildAccepted","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeGuideBuildAccepted","rt":$n[0].Void,"p":[Function]}}]}; }, $n);
    /*GameController end.*/

    /*GameplayMaterials start.*/
    $m("GameplayMaterials", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ConfigureTransparency","is":true,"t":8,"pi":[{"n":"material","pt":$n[1].Material,"ps":0}],"sn":"ConfigureTransparency","rt":$n[0].Void,"p":[$n[1].Material]},{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"transparentSurface","dv":false,"o":true,"pt":$n[0].Boolean,"ps":0},{"n":"unlitSurface","dv":false,"o":true,"pt":$n[0].Boolean,"ps":1}],"sn":"Create","rt":$n[1].Material,"p":[$n[0].Boolean,$n[0].Boolean]},{"a":2,"n":"CreateGuideOverlay","is":true,"t":8,"sn":"CreateGuideOverlay","rt":$n[1].Material},{"a":2,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"active","is":true,"t":4,"rt":GameplayMaterials,"sn":"active"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"guideOverlay","t":4,"rt":$n[1].Material,"sn":"guideOverlay"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"solid","t":4,"rt":$n[1].Material,"sn":"solid"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"transparent","t":4,"rt":$n[1].Material,"sn":"transparent"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"unlit","t":4,"rt":$n[1].Material,"sn":"unlit"}]}; }, $n);
    /*GameplayMaterials end.*/

    /*LunaController start.*/
    $m("LunaController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":2,"n":"ClickCTA","t":8,"sn":"ClickCTA","rt":$n[0].Void},{"a":1,"n":"CountTimePlay","t":8,"sn":"CountTimePlay","rt":$n[3].IEnumerator},{"a":1,"n":"OnCountedClick","t":8,"sn":"OnCountedClick","rt":$n[0].Void},{"a":1,"n":"OnDestroy","t":8,"sn":"OnDestroy","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":1,"n":"OnGuideBuild","t":8,"sn":"OnGuideBuild","rt":$n[0].Void},{"a":2,"n":"ShowEndCard","t":8,"sn":"ShowEndCard","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"StopTimePlay","t":8,"sn":"StopTimePlay","rt":$n[0].Void},{"a":2,"n":"Active","is":true,"t":16,"rt":LunaController,"g":{"a":2,"n":"get_Active","t":8,"rt":LunaController,"fg":"Active","is":true},"s":{"a":1,"n":"set_Active","t":8,"p":[LunaController],"rt":$n[0].Void,"fs":"Active","is":true},"fn":"Active"},{"a":2,"n":"InteractionCount","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_InteractionCount","t":8,"rt":$n[0].Int32,"fg":"InteractionCount","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_InteractionCount","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"InteractionCount"},"fn":"InteractionCount"},{"a":2,"n":"IsCTAActive","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsCTAActive","t":8,"rt":$n[0].Boolean,"fg":"IsCTAActive","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_IsCTAActive","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"IsCTAActive"},"fn":"IsCTAActive"},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Background Music", 3, null),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"BackgroundMusic","t":4,"rt":$n[1].AudioClip,"sn":"BackgroundMusic"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"CTA","t":4,"rt":$n[1].RectTransform,"sn":"CTA"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Count Play", 1, null, false, null),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"Count","t":4,"rt":$n[0].Int32,"sn":"Count","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Light Intensity", 4, null, false, null),new UnityEngine.SerializeFieldAttribute(),new UnityEngine.RangeAttribute(0.0, 5.0)],"a":1,"n":"Intensity","t":4,"rt":$n[0].Single,"sn":"Intensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.LunaPlaygroundAssetAttribute("Logo 200x126", 2, null),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"Logo","t":4,"rt":$n[1].Texture2D,"sn":"Logo"},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("Time Play", 0, null, false, null),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"TimePlay","t":4,"rt":$n[0].Single,"sn":"TimePlay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.LunaPlaygroundFieldAttribute("CTA High", -1, null, false, null)],"a":2,"n":"YPosCTA","t":4,"rt":$n[0].Single,"sn":"YPosCTA","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"controls","t":4,"rt":BuildTouchControls,"sn":"controls"},{"a":1,"n":"counting","t":4,"rt":$n[0].Boolean,"sn":"counting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"ctaButton","t":4,"rt":$n[2].List$1(UnityEngine.UI.Button),"sn":"ctaButton"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"directionalLight","t":4,"rt":$n[1].Light,"sn":"directionalLight"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"endCard","t":4,"rt":$n[1].GameObject,"sn":"endCard"},{"at":[new UnityEngine.HeaderAttribute("Saved scene references"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"game","t":4,"rt":GameController,"sn":"game"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"hud","t":4,"rt":BuildProgressUI,"sn":"hud"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"logoImage","t":4,"rt":$n[4].RawImage,"sn":"logoImage"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicSource","t":4,"rt":$n[1].AudioSource,"sn":"musicSource"},{"a":1,"n":"timePlayRoutine","t":4,"rt":$n[1].Coroutine,"sn":"timePlayRoutine"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"tutorial","t":4,"rt":$n[1].GameObject,"sn":"tutorial"},{"a":1,"backing":true,"n":"<Active>k__BackingField","is":true,"t":4,"rt":LunaController,"sn":"Active"},{"a":1,"backing":true,"n":"<InteractionCount>k__BackingField","t":4,"rt":$n[0].Int32,"sn":"InteractionCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"backing":true,"n":"<IsCTAActive>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"IsCTAActive","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*LunaController end.*/

    /*PointLightReflectionExclusion start.*/
    $m("PointLightReflectionExclusion", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[0].Void},{"a":2,"n":"source","t":4,"rt":$n[1].Light,"sn":"source"}]}; }, $n);
    /*PointLightReflectionExclusion end.*/

    /*ReferenceHouseBlueprint start.*/
    $m("ReferenceHouseBlueprint", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"reference","pt":$n[1].GameObject,"ps":0}],"sn":"Create","rt":$n[2].List$1(BuildingPart),"p":[$n[1].GameObject]},{"a":1,"n":"PieceBounds","is":true,"t":8,"pi":[{"n":"piece","pt":$n[1].Transform,"ps":0},{"n":"root","pt":$n[1].Transform,"ps":1}],"sn":"PieceBounds","rt":$n[1].Bounds,"p":[$n[1].Transform,$n[1].Transform]},{"a":1,"n":"Order","is":true,"t":4,"rt":$n[0].Array.type(System.String),"sn":"Order","ro":true}]}; }, $n);
    /*ReferenceHouseBlueprint end.*/

    /*SampleBlockVisuals start.*/
    $m("SampleBlockVisuals", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"block","pt":BuildBlock,"ps":0},{"n":"preview","pt":$n[0].Boolean,"ps":1},{"n":"ownedMaterials","pt":$n[2].List$1(UnityEngine.Material),"ps":2},{"n":"solidMaterial","pt":Function,"ps":3},{"n":"previewOpacity","dv":0.38,"o":true,"pt":$n[0].Single,"ps":4}],"sn":"Create","rt":$n[1].GameObject,"p":[BuildBlock,$n[0].Boolean,$n[2].List$1(UnityEngine.Material),Function,$n[0].Single]},{"a":2,"n":"GetLocalBounds","is":true,"t":8,"pi":[{"n":"block","pt":BuildBlock,"ps":0}],"sn":"GetLocalBounds","rt":$n[1].Bounds,"p":[BuildBlock]},{"a":1,"n":"LoadBasin","is":true,"t":8,"sn":"LoadBasin","rt":$n[1].Texture2D},{"a":1,"n":"LoadCarpet","is":true,"t":8,"sn":"LoadCarpet","rt":$n[1].Texture2D},{"a":1,"n":"LoadCherry","is":true,"t":8,"sn":"LoadCherry","rt":$n[1].Texture2D},{"a":1,"n":"Cherry","is":true,"t":4,"rt":$n[1].Color,"sn":"Cherry","ro":true},{"a":1,"n":"CherryLight","is":true,"t":4,"rt":$n[1].Color,"sn":"CherryLight","ro":true},{"a":1,"n":"Cream","is":true,"t":4,"rt":$n[1].Color,"sn":"Cream","ro":true},{"a":1,"n":"DarkPurple","is":true,"t":4,"rt":$n[1].Color,"sn":"DarkPurple","ro":true},{"a":1,"n":"Mint","is":true,"t":4,"rt":$n[1].Color,"sn":"Mint","ro":true},{"a":1,"n":"Pink","is":true,"t":4,"rt":$n[1].Color,"sn":"Pink","ro":true},{"a":1,"n":"Purple","is":true,"t":4,"rt":$n[1].Color,"sn":"Purple","ro":true},{"a":1,"n":"Stone","is":true,"t":4,"rt":$n[1].Color,"sn":"Stone","ro":true},{"a":1,"n":"StoneLight","is":true,"t":4,"rt":$n[1].Color,"sn":"StoneLight","ro":true},{"a":1,"n":"White","is":true,"t":4,"rt":$n[1].Color,"sn":"White","ro":true},{"a":1,"n":"basinTexture","is":true,"t":4,"rt":$n[1].Texture2D,"sn":"basinTexture"},{"a":1,"n":"carpetTexture","is":true,"t":4,"rt":$n[1].Texture2D,"sn":"carpetTexture"},{"a":1,"n":"cherryTexture","is":true,"t":4,"rt":$n[1].Texture2D,"sn":"cherryTexture"}]}; }, $n);
    /*SampleBlockVisuals end.*/

    /*SampleBuildingBlueprint start.*/
    $m("SampleBuildingBlueprint", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":1,"n":"Add","is":true,"t":8,"pi":[{"n":"part","pt":BuildingPart,"ps":0},{"n":"style","pt":$n[0].String,"ps":1},{"n":"x","pt":$n[0].Single,"ps":2},{"n":"y","pt":$n[0].Single,"ps":3},{"n":"z","pt":$n[0].Single,"ps":4},{"n":"replacementKey","dv":null,"o":true,"pt":$n[0].String,"ps":5}],"sn":"Add","rt":$n[0].Void,"p":[BuildingPart,$n[0].String,$n[0].Single,$n[0].Single,$n[0].Single,$n[0].String]},{"a":2,"n":"Create","is":true,"t":8,"sn":"Create","rt":$n[2].List$1(BuildingPart)},{"a":2,"n":"CreateGround","is":true,"t":8,"pi":[{"n":"material","pt":$n[1].Material,"ps":0}],"sn":"CreateGround","rt":$n[0].Void,"p":[$n[1].Material]},{"a":1,"n":"Part","is":true,"t":8,"pi":[{"n":"parts","pt":$n[2].List$1(BuildingPart),"ps":0},{"n":"name","pt":$n[0].String,"ps":1}],"sn":"Part","rt":BuildingPart,"p":[$n[2].List$1(BuildingPart),$n[0].String]}]}; }, $n);
    /*SampleBuildingBlueprint end.*/

    /*WetGroundReflection start.*/
    $m("WetGroundReflection", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Capture","t":8,"sn":"Capture","rt":$n[0].Void},{"a":2,"n":"Exclude","is":true,"t":8,"pi":[{"n":"root","pt":$n[1].GameObject,"ps":0}],"sn":"Exclude","rt":$n[0].Void,"p":[$n[1].GameObject]},{"a":2,"n":"Include","is":true,"t":8,"pi":[{"n":"root","pt":$n[1].GameObject,"ps":0}],"sn":"Include","rt":$n[0].Void,"p":[$n[1].GameObject]},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"OnDisable","t":8,"sn":"OnDisable","rt":$n[0].Void},{"a":2,"n":"RefreshLightList","is":true,"t":8,"sn":"RefreshLightList","rt":$n[0].Void},{"a":2,"n":"UpdateView","t":8,"sn":"UpdateView","rt":$n[0].Void},{"a":2,"n":"ReflectionLayer","is":true,"t":4,"rt":$n[0].String,"sn":"ReflectionLayer"},{"a":1,"n":"frame","t":4,"rt":$n[0].Int32,"sn":"frame","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"groundHeight","t":4,"rt":$n[0].Single,"sn":"groundHeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"groundMaterial","t":4,"rt":$n[1].Material,"sn":"groundMaterial"},{"a":1,"n":"lightsDirty","is":true,"t":4,"rt":$n[0].Boolean,"sn":"lightsDirty","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"reflectionCamera","t":4,"rt":$n[1].Camera,"sn":"reflectionCamera"},{"a":1,"n":"sceneLights","t":4,"rt":System.Array.type(PointLightReflectionExclusion),"sn":"sceneLights"},{"a":1,"n":"temporarilyDisabled","t":4,"rt":$n[2].List$1(UnityEngine.Light),"sn":"temporarilyDisabled","ro":true},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.RangeAttribute(1.0, 4.0)],"a":1,"n":"updateEveryFrames","t":4,"rt":$n[0].Int32,"sn":"updateEveryFrames","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"viewCamera","t":4,"rt":$n[1].Camera,"sn":"viewCamera"}]}; }, $n);
    /*WetGroundReflection end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    }});
