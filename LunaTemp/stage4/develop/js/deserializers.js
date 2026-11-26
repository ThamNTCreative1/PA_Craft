var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2514 = root || request.c( 'UnityEngine.JointSpring' )
  var i2515 = data
  i2514.spring = i2515[0]
  i2514.damper = i2515[1]
  i2514.targetPosition = i2515[2]
  return i2514
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2516 = root || request.c( 'UnityEngine.JointMotor' )
  var i2517 = data
  i2516.m_TargetVelocity = i2517[0]
  i2516.m_Force = i2517[1]
  i2516.m_FreeSpin = i2517[2]
  return i2516
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2518 = root || request.c( 'UnityEngine.JointLimits' )
  var i2519 = data
  i2518.m_Min = i2519[0]
  i2518.m_Max = i2519[1]
  i2518.m_Bounciness = i2519[2]
  i2518.m_BounceMinVelocity = i2519[3]
  i2518.m_ContactDistance = i2519[4]
  i2518.minBounce = i2519[5]
  i2518.maxBounce = i2519[6]
  return i2518
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2520 = root || request.c( 'UnityEngine.JointDrive' )
  var i2521 = data
  i2520.m_PositionSpring = i2521[0]
  i2520.m_PositionDamper = i2521[1]
  i2520.m_MaximumForce = i2521[2]
  i2520.m_UseAcceleration = i2521[3]
  return i2520
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2522 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2523 = data
  i2522.m_Spring = i2523[0]
  i2522.m_Damper = i2523[1]
  return i2522
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2524 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2525 = data
  i2524.m_Limit = i2525[0]
  i2524.m_Bounciness = i2525[1]
  i2524.m_ContactDistance = i2525[2]
  return i2524
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2526 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2527 = data
  i2526.m_ExtremumSlip = i2527[0]
  i2526.m_ExtremumValue = i2527[1]
  i2526.m_AsymptoteSlip = i2527[2]
  i2526.m_AsymptoteValue = i2527[3]
  i2526.m_Stiffness = i2527[4]
  return i2526
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2528 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2529 = data
  i2528.m_LowerAngle = i2529[0]
  i2528.m_UpperAngle = i2529[1]
  return i2528
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2530 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2531 = data
  i2530.m_MotorSpeed = i2531[0]
  i2530.m_MaximumMotorTorque = i2531[1]
  return i2530
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2532 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2533 = data
  i2532.m_DampingRatio = i2533[0]
  i2532.m_Frequency = i2533[1]
  i2532.m_Angle = i2533[2]
  return i2532
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2534 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2535 = data
  i2534.m_LowerTranslation = i2535[0]
  i2534.m_UpperTranslation = i2535[1]
  return i2534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i2536 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i2537 = data
  i2536.name = i2537[0]
  i2536.halfPrecision = !!i2537[1]
  i2536.useSimplification = !!i2537[2]
  i2536.useUInt32IndexFormat = !!i2537[3]
  i2536.vertexCount = i2537[4]
  i2536.aabb = i2537[5]
  var i2539 = i2537[6]
  var i2538 = []
  for(var i = 0; i < i2539.length; i += 1) {
    i2538.push( !!i2539[i + 0] );
  }
  i2536.streams = i2538
  i2536.vertices = i2537[7]
  var i2541 = i2537[8]
  var i2540 = []
  for(var i = 0; i < i2541.length; i += 1) {
    i2540.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i2541[i + 0]) );
  }
  i2536.subMeshes = i2540
  var i2543 = i2537[9]
  var i2542 = []
  for(var i = 0; i < i2543.length; i += 16) {
    i2542.push( new pc.Mat4().setData(i2543[i + 0], i2543[i + 1], i2543[i + 2], i2543[i + 3],  i2543[i + 4], i2543[i + 5], i2543[i + 6], i2543[i + 7],  i2543[i + 8], i2543[i + 9], i2543[i + 10], i2543[i + 11],  i2543[i + 12], i2543[i + 13], i2543[i + 14], i2543[i + 15]) );
  }
  i2536.bindposes = i2542
  var i2545 = i2537[10]
  var i2544 = []
  for(var i = 0; i < i2545.length; i += 1) {
    i2544.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i2545[i + 0]) );
  }
  i2536.blendShapes = i2544
  return i2536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i2550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i2551 = data
  i2550.triangles = i2551[0]
  return i2550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i2556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i2557 = data
  i2556.name = i2557[0]
  var i2559 = i2557[1]
  var i2558 = []
  for(var i = 0; i < i2559.length; i += 1) {
    i2558.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i2559[i + 0]) );
  }
  i2556.frames = i2558
  return i2556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2560 = root || new pc.UnityMaterial()
  var i2561 = data
  i2560.name = i2561[0]
  request.r(i2561[1], i2561[2], 0, i2560, 'shader')
  i2560.renderQueue = i2561[3]
  i2560.enableInstancing = !!i2561[4]
  var i2563 = i2561[5]
  var i2562 = []
  for(var i = 0; i < i2563.length; i += 1) {
    i2562.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2563[i + 0]) );
  }
  i2560.floatParameters = i2562
  var i2565 = i2561[6]
  var i2564 = []
  for(var i = 0; i < i2565.length; i += 1) {
    i2564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2565[i + 0]) );
  }
  i2560.colorParameters = i2564
  var i2567 = i2561[7]
  var i2566 = []
  for(var i = 0; i < i2567.length; i += 1) {
    i2566.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2567[i + 0]) );
  }
  i2560.vectorParameters = i2566
  var i2569 = i2561[8]
  var i2568 = []
  for(var i = 0; i < i2569.length; i += 1) {
    i2568.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2569[i + 0]) );
  }
  i2560.textureParameters = i2568
  var i2571 = i2561[9]
  var i2570 = []
  for(var i = 0; i < i2571.length; i += 1) {
    i2570.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2571[i + 0]) );
  }
  i2560.materialFlags = i2570
  return i2560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2575 = data
  i2574.name = i2575[0]
  i2574.value = i2575[1]
  return i2574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2579 = data
  i2578.name = i2579[0]
  i2578.value = new pc.Color(i2579[1], i2579[2], i2579[3], i2579[4])
  return i2578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2583 = data
  i2582.name = i2583[0]
  i2582.value = new pc.Vec4( i2583[1], i2583[2], i2583[3], i2583[4] )
  return i2582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2587 = data
  i2586.name = i2587[0]
  request.r(i2587[1], i2587[2], 0, i2586, 'value')
  return i2586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2591 = data
  i2590.name = i2591[0]
  i2590.enabled = !!i2591[1]
  return i2590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2593 = data
  i2592.name = i2593[0]
  i2592.width = i2593[1]
  i2592.height = i2593[2]
  i2592.mipmapCount = i2593[3]
  i2592.anisoLevel = i2593[4]
  i2592.filterMode = i2593[5]
  i2592.hdr = !!i2593[6]
  i2592.format = i2593[7]
  i2592.wrapMode = i2593[8]
  i2592.alphaIsTransparency = !!i2593[9]
  i2592.alphaSource = i2593[10]
  i2592.graphicsFormat = i2593[11]
  i2592.sRGBTexture = !!i2593[12]
  i2592.desiredColorSpace = i2593[13]
  i2592.wrapU = i2593[14]
  i2592.wrapV = i2593[15]
  return i2592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i2594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i2595 = data
  i2594.position = new pc.Vec3( i2595[0], i2595[1], i2595[2] )
  i2594.scale = new pc.Vec3( i2595[3], i2595[4], i2595[5] )
  i2594.rotation = new pc.Quat(i2595[6], i2595[7], i2595[8], i2595[9])
  return i2594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i2596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i2597 = data
  i2596.mass = i2597[0]
  i2596.drag = i2597[1]
  i2596.angularDrag = i2597[2]
  i2596.useGravity = !!i2597[3]
  i2596.isKinematic = !!i2597[4]
  i2596.constraints = i2597[5]
  i2596.maxAngularVelocity = i2597[6]
  i2596.collisionDetectionMode = i2597[7]
  i2596.interpolation = i2597[8]
  return i2596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i2598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i2599 = data
  i2598.center = new pc.Vec3( i2599[0], i2599[1], i2599[2] )
  i2598.radius = i2599[3]
  i2598.height = i2599[4]
  i2598.direction = i2599[5]
  i2598.enabled = !!i2599[6]
  i2598.isTrigger = !!i2599[7]
  request.r(i2599[8], i2599[9], 0, i2598, 'material')
  return i2598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i2600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i2601 = data
  request.r(i2601[0], i2601[1], 0, i2600, 'animatorController')
  request.r(i2601[2], i2601[3], 0, i2600, 'avatar')
  i2600.updateMode = i2601[4]
  i2600.hasTransformHierarchy = !!i2601[5]
  i2600.applyRootMotion = !!i2601[6]
  var i2603 = i2601[7]
  var i2602 = []
  for(var i = 0; i < i2603.length; i += 2) {
  request.r(i2603[i + 0], i2603[i + 1], 2, i2602, '')
  }
  i2600.humanBones = i2602
  i2600.enabled = !!i2601[8]
  return i2600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2607 = data
  i2606.name = i2607[0]
  i2606.tagId = i2607[1]
  i2606.enabled = !!i2607[2]
  i2606.isStatic = !!i2607[3]
  i2606.layer = i2607[4]
  return i2606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i2608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i2609 = data
  request.r(i2609[0], i2609[1], 0, i2608, 'sharedMesh')
  var i2611 = i2609[2]
  var i2610 = []
  for(var i = 0; i < i2611.length; i += 2) {
  request.r(i2611[i + 0], i2611[i + 1], 2, i2610, '')
  }
  i2608.bones = i2610
  i2608.updateWhenOffscreen = !!i2609[3]
  i2608.localBounds = i2609[4]
  request.r(i2609[5], i2609[6], 0, i2608, 'rootBone')
  var i2613 = i2609[7]
  var i2612 = []
  for(var i = 0; i < i2613.length; i += 1) {
    i2612.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i2613[i + 0]) );
  }
  i2608.blendShapesWeights = i2612
  i2608.enabled = !!i2609[8]
  request.r(i2609[9], i2609[10], 0, i2608, 'sharedMaterial')
  var i2615 = i2609[11]
  var i2614 = []
  for(var i = 0; i < i2615.length; i += 2) {
  request.r(i2615[i + 0], i2615[i + 1], 2, i2614, '')
  }
  i2608.sharedMaterials = i2614
  i2608.receiveShadows = !!i2609[12]
  i2608.shadowCastingMode = i2609[13]
  i2608.sortingLayerID = i2609[14]
  i2608.sortingOrder = i2609[15]
  i2608.lightmapIndex = i2609[16]
  i2608.lightmapSceneIndex = i2609[17]
  i2608.lightmapScaleOffset = new pc.Vec4( i2609[18], i2609[19], i2609[20], i2609[21] )
  i2608.lightProbeUsage = i2609[22]
  i2608.reflectionProbeUsage = i2609[23]
  return i2608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i2618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i2619 = data
  i2618.weight = i2619[0]
  return i2618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2623 = data
  i2622.pivot = new pc.Vec2( i2623[0], i2623[1] )
  i2622.anchorMin = new pc.Vec2( i2623[2], i2623[3] )
  i2622.anchorMax = new pc.Vec2( i2623[4], i2623[5] )
  i2622.sizeDelta = new pc.Vec2( i2623[6], i2623[7] )
  i2622.anchoredPosition3D = new pc.Vec3( i2623[8], i2623[9], i2623[10] )
  i2622.rotation = new pc.Quat(i2623[11], i2623[12], i2623[13], i2623[14])
  i2622.scale = new pc.Vec3( i2623[15], i2623[16], i2623[17] )
  return i2622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i2624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i2625 = data
  request.r(i2625[0], i2625[1], 0, i2624, 'additionalVertexStreams')
  i2624.enabled = !!i2625[2]
  request.r(i2625[3], i2625[4], 0, i2624, 'sharedMaterial')
  var i2627 = i2625[5]
  var i2626 = []
  for(var i = 0; i < i2627.length; i += 2) {
  request.r(i2627[i + 0], i2627[i + 1], 2, i2626, '')
  }
  i2624.sharedMaterials = i2626
  i2624.receiveShadows = !!i2625[6]
  i2624.shadowCastingMode = i2625[7]
  i2624.sortingLayerID = i2625[8]
  i2624.sortingOrder = i2625[9]
  i2624.lightmapIndex = i2625[10]
  i2624.lightmapSceneIndex = i2625[11]
  i2624.lightmapScaleOffset = new pc.Vec4( i2625[12], i2625[13], i2625[14], i2625[15] )
  i2624.lightProbeUsage = i2625[16]
  i2624.reflectionProbeUsage = i2625[17]
  return i2624
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i2628 = root || request.c( 'TMPro.TextMeshPro' )
  var i2629 = data
  i2628._SortingLayer = i2629[0]
  i2628._SortingLayerID = i2629[1]
  i2628._SortingOrder = i2629[2]
  i2628.m_hasFontAssetChanged = !!i2629[3]
  request.r(i2629[4], i2629[5], 0, i2628, 'm_renderer')
  i2628.m_maskType = i2629[6]
  i2628.m_text = i2629[7]
  i2628.m_isRightToLeft = !!i2629[8]
  request.r(i2629[9], i2629[10], 0, i2628, 'm_fontAsset')
  request.r(i2629[11], i2629[12], 0, i2628, 'm_sharedMaterial')
  var i2631 = i2629[13]
  var i2630 = []
  for(var i = 0; i < i2631.length; i += 2) {
  request.r(i2631[i + 0], i2631[i + 1], 2, i2630, '')
  }
  i2628.m_fontSharedMaterials = i2630
  request.r(i2629[14], i2629[15], 0, i2628, 'm_fontMaterial')
  var i2633 = i2629[16]
  var i2632 = []
  for(var i = 0; i < i2633.length; i += 2) {
  request.r(i2633[i + 0], i2633[i + 1], 2, i2632, '')
  }
  i2628.m_fontMaterials = i2632
  i2628.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2629[17], i2629[18], i2629[19], i2629[20])
  i2628.m_fontColor = new pc.Color(i2629[21], i2629[22], i2629[23], i2629[24])
  i2628.m_enableVertexGradient = !!i2629[25]
  i2628.m_colorMode = i2629[26]
  i2628.m_fontColorGradient = request.d('TMPro.VertexGradient', i2629[27], i2628.m_fontColorGradient)
  request.r(i2629[28], i2629[29], 0, i2628, 'm_fontColorGradientPreset')
  request.r(i2629[30], i2629[31], 0, i2628, 'm_spriteAsset')
  i2628.m_tintAllSprites = !!i2629[32]
  request.r(i2629[33], i2629[34], 0, i2628, 'm_StyleSheet')
  i2628.m_TextStyleHashCode = i2629[35]
  i2628.m_overrideHtmlColors = !!i2629[36]
  i2628.m_faceColor = UnityEngine.Color32.ConstructColor(i2629[37], i2629[38], i2629[39], i2629[40])
  i2628.m_fontSize = i2629[41]
  i2628.m_fontSizeBase = i2629[42]
  i2628.m_fontWeight = i2629[43]
  i2628.m_enableAutoSizing = !!i2629[44]
  i2628.m_fontSizeMin = i2629[45]
  i2628.m_fontSizeMax = i2629[46]
  i2628.m_fontStyle = i2629[47]
  i2628.m_HorizontalAlignment = i2629[48]
  i2628.m_VerticalAlignment = i2629[49]
  i2628.m_textAlignment = i2629[50]
  i2628.m_characterSpacing = i2629[51]
  i2628.m_characterHorizontalScale = i2629[52]
  i2628.m_wordSpacing = i2629[53]
  i2628.m_lineSpacing = i2629[54]
  i2628.m_lineSpacingMax = i2629[55]
  i2628.m_paragraphSpacing = i2629[56]
  i2628.m_charWidthMaxAdj = i2629[57]
  i2628.m_TextWrappingMode = i2629[58]
  i2628.m_wordWrappingRatios = i2629[59]
  i2628.m_overflowMode = i2629[60]
  request.r(i2629[61], i2629[62], 0, i2628, 'm_linkedTextComponent')
  request.r(i2629[63], i2629[64], 0, i2628, 'parentLinkedComponent')
  i2628.m_enableKerning = !!i2629[65]
  var i2635 = i2629[66]
  var i2634 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2635.length; i += 1) {
    i2634.add(i2635[i + 0]);
  }
  i2628.m_ActiveFontFeatures = i2634
  i2628.m_enableExtraPadding = !!i2629[67]
  i2628.checkPaddingRequired = !!i2629[68]
  i2628.m_isRichText = !!i2629[69]
  i2628.m_parseCtrlCharacters = !!i2629[70]
  i2628.m_isOrthographic = !!i2629[71]
  i2628.m_isCullingEnabled = !!i2629[72]
  i2628.m_horizontalMapping = i2629[73]
  i2628.m_verticalMapping = i2629[74]
  i2628.m_uvLineOffset = i2629[75]
  i2628.m_geometrySortingOrder = i2629[76]
  i2628.m_IsTextObjectScaleStatic = !!i2629[77]
  i2628.m_VertexBufferAutoSizeReduction = !!i2629[78]
  i2628.m_useMaxVisibleDescender = !!i2629[79]
  i2628.m_pageToDisplay = i2629[80]
  i2628.m_margin = new pc.Vec4( i2629[81], i2629[82], i2629[83], i2629[84] )
  i2628.m_isUsingLegacyAnimationComponent = !!i2629[85]
  i2628.m_isVolumetricText = !!i2629[86]
  request.r(i2629[87], i2629[88], 0, i2628, 'm_Material')
  i2628.m_EmojiFallbackSupport = !!i2629[89]
  i2628.m_Maskable = !!i2629[90]
  i2628.m_Color = new pc.Color(i2629[91], i2629[92], i2629[93], i2629[94])
  i2628.m_RaycastTarget = !!i2629[95]
  i2628.m_RaycastPadding = new pc.Vec4( i2629[96], i2629[97], i2629[98], i2629[99] )
  return i2628
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2636 = root || request.c( 'TMPro.VertexGradient' )
  var i2637 = data
  i2636.topLeft = new pc.Color(i2637[0], i2637[1], i2637[2], i2637[3])
  i2636.topRight = new pc.Color(i2637[4], i2637[5], i2637[6], i2637[7])
  i2636.bottomLeft = new pc.Color(i2637[8], i2637[9], i2637[10], i2637[11])
  i2636.bottomRight = new pc.Color(i2637[12], i2637[13], i2637[14], i2637[15])
  return i2636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i2640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i2641 = data
  var i2643 = i2641[0]
  var i2642 = []
  for(var i = 0; i < i2643.length; i += 3) {
    i2642.push( new pc.Vec3( i2643[i + 0], i2643[i + 1], i2643[i + 2] ) );
  }
  i2640.positions = i2642
  i2640.positionCount = i2641[1]
  i2640.time = i2641[2]
  i2640.startWidth = i2641[3]
  i2640.endWidth = i2641[4]
  i2640.widthMultiplier = i2641[5]
  i2640.autodestruct = !!i2641[6]
  i2640.emitting = !!i2641[7]
  i2640.numCornerVertices = i2641[8]
  i2640.numCapVertices = i2641[9]
  i2640.minVertexDistance = i2641[10]
  i2640.colorGradient = i2641[11] ? new pc.ColorGradient(i2641[11][0], i2641[11][1], i2641[11][2]) : null
  i2640.startColor = new pc.Color(i2641[12], i2641[13], i2641[14], i2641[15])
  i2640.endColor = new pc.Color(i2641[16], i2641[17], i2641[18], i2641[19])
  i2640.generateLightingData = !!i2641[20]
  i2640.textureMode = i2641[21]
  i2640.alignment = i2641[22]
  i2640.widthCurve = new pc.AnimationCurve( { keys_flow: i2641[23] } )
  i2640.enabled = !!i2641[24]
  request.r(i2641[25], i2641[26], 0, i2640, 'sharedMaterial')
  var i2645 = i2641[27]
  var i2644 = []
  for(var i = 0; i < i2645.length; i += 2) {
  request.r(i2645[i + 0], i2645[i + 1], 2, i2644, '')
  }
  i2640.sharedMaterials = i2644
  i2640.receiveShadows = !!i2641[28]
  i2640.shadowCastingMode = i2641[29]
  i2640.sortingLayerID = i2641[30]
  i2640.sortingOrder = i2641[31]
  i2640.lightmapIndex = i2641[32]
  i2640.lightmapSceneIndex = i2641[33]
  i2640.lightmapScaleOffset = new pc.Vec4( i2641[34], i2641[35], i2641[36], i2641[37] )
  i2640.lightProbeUsage = i2641[38]
  i2640.reflectionProbeUsage = i2641[39]
  return i2640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i2648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i2649 = data
  i2648.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i2649[0], i2648.main)
  i2648.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i2649[1], i2648.colorBySpeed)
  i2648.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i2649[2], i2648.colorOverLifetime)
  i2648.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i2649[3], i2648.emission)
  i2648.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i2649[4], i2648.rotationBySpeed)
  i2648.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i2649[5], i2648.rotationOverLifetime)
  i2648.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i2649[6], i2648.shape)
  i2648.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i2649[7], i2648.sizeBySpeed)
  i2648.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i2649[8], i2648.sizeOverLifetime)
  i2648.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i2649[9], i2648.textureSheetAnimation)
  i2648.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i2649[10], i2648.velocityOverLifetime)
  i2648.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i2649[11], i2648.noise)
  i2648.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i2649[12], i2648.inheritVelocity)
  i2648.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i2649[13], i2648.forceOverLifetime)
  i2648.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i2649[14], i2648.limitVelocityOverLifetime)
  i2648.useAutoRandomSeed = !!i2649[15]
  i2648.randomSeed = i2649[16]
  return i2648
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i2650 = root || new pc.ParticleSystemMain()
  var i2651 = data
  i2650.duration = i2651[0]
  i2650.loop = !!i2651[1]
  i2650.prewarm = !!i2651[2]
  i2650.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[3], i2650.startDelay)
  i2650.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[4], i2650.startLifetime)
  i2650.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[5], i2650.startSpeed)
  i2650.startSize3D = !!i2651[6]
  i2650.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[7], i2650.startSizeX)
  i2650.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[8], i2650.startSizeY)
  i2650.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[9], i2650.startSizeZ)
  i2650.startRotation3D = !!i2651[10]
  i2650.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[11], i2650.startRotationX)
  i2650.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[12], i2650.startRotationY)
  i2650.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[13], i2650.startRotationZ)
  i2650.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i2651[14], i2650.startColor)
  i2650.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2651[15], i2650.gravityModifier)
  i2650.simulationSpace = i2651[16]
  request.r(i2651[17], i2651[18], 0, i2650, 'customSimulationSpace')
  i2650.simulationSpeed = i2651[19]
  i2650.useUnscaledTime = !!i2651[20]
  i2650.scalingMode = i2651[21]
  i2650.playOnAwake = !!i2651[22]
  i2650.maxParticles = i2651[23]
  i2650.emitterVelocityMode = i2651[24]
  i2650.stopAction = i2651[25]
  return i2650
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i2652 = root || new pc.MinMaxCurve()
  var i2653 = data
  i2652.mode = i2653[0]
  i2652.curveMin = new pc.AnimationCurve( { keys_flow: i2653[1] } )
  i2652.curveMax = new pc.AnimationCurve( { keys_flow: i2653[2] } )
  i2652.curveMultiplier = i2653[3]
  i2652.constantMin = i2653[4]
  i2652.constantMax = i2653[5]
  return i2652
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i2654 = root || new pc.MinMaxGradient()
  var i2655 = data
  i2654.mode = i2655[0]
  i2654.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i2655[1], i2654.gradientMin)
  i2654.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i2655[2], i2654.gradientMax)
  i2654.colorMin = new pc.Color(i2655[3], i2655[4], i2655[5], i2655[6])
  i2654.colorMax = new pc.Color(i2655[7], i2655[8], i2655[9], i2655[10])
  return i2654
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i2656 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i2657 = data
  i2656.mode = i2657[0]
  var i2659 = i2657[1]
  var i2658 = []
  for(var i = 0; i < i2659.length; i += 1) {
    i2658.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i2659[i + 0]) );
  }
  i2656.colorKeys = i2658
  var i2661 = i2657[2]
  var i2660 = []
  for(var i = 0; i < i2661.length; i += 1) {
    i2660.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i2661[i + 0]) );
  }
  i2656.alphaKeys = i2660
  return i2656
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i2662 = root || new pc.ParticleSystemColorBySpeed()
  var i2663 = data
  i2662.enabled = !!i2663[0]
  i2662.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i2663[1], i2662.color)
  i2662.range = new pc.Vec2( i2663[2], i2663[3] )
  return i2662
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i2666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i2667 = data
  i2666.color = new pc.Color(i2667[0], i2667[1], i2667[2], i2667[3])
  i2666.time = i2667[4]
  return i2666
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i2670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i2671 = data
  i2670.alpha = i2671[0]
  i2670.time = i2671[1]
  return i2670
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i2672 = root || new pc.ParticleSystemColorOverLifetime()
  var i2673 = data
  i2672.enabled = !!i2673[0]
  i2672.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i2673[1], i2672.color)
  return i2672
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i2674 = root || new pc.ParticleSystemEmitter()
  var i2675 = data
  i2674.enabled = !!i2675[0]
  i2674.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2675[1], i2674.rateOverTime)
  i2674.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2675[2], i2674.rateOverDistance)
  var i2677 = i2675[3]
  var i2676 = []
  for(var i = 0; i < i2677.length; i += 1) {
    i2676.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i2677[i + 0]) );
  }
  i2674.bursts = i2676
  return i2674
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i2680 = root || new pc.ParticleSystemBurst()
  var i2681 = data
  i2680.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2681[0], i2680.count)
  i2680.cycleCount = i2681[1]
  i2680.minCount = i2681[2]
  i2680.maxCount = i2681[3]
  i2680.repeatInterval = i2681[4]
  i2680.time = i2681[5]
  return i2680
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i2682 = root || new pc.ParticleSystemRotationBySpeed()
  var i2683 = data
  i2682.enabled = !!i2683[0]
  i2682.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2683[1], i2682.x)
  i2682.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2683[2], i2682.y)
  i2682.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2683[3], i2682.z)
  i2682.separateAxes = !!i2683[4]
  i2682.range = new pc.Vec2( i2683[5], i2683[6] )
  return i2682
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i2684 = root || new pc.ParticleSystemRotationOverLifetime()
  var i2685 = data
  i2684.enabled = !!i2685[0]
  i2684.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2685[1], i2684.x)
  i2684.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2685[2], i2684.y)
  i2684.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2685[3], i2684.z)
  i2684.separateAxes = !!i2685[4]
  return i2684
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i2686 = root || new pc.ParticleSystemShape()
  var i2687 = data
  i2686.enabled = !!i2687[0]
  i2686.shapeType = i2687[1]
  i2686.randomDirectionAmount = i2687[2]
  i2686.sphericalDirectionAmount = i2687[3]
  i2686.randomPositionAmount = i2687[4]
  i2686.alignToDirection = !!i2687[5]
  i2686.radius = i2687[6]
  i2686.radiusMode = i2687[7]
  i2686.radiusSpread = i2687[8]
  i2686.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2687[9], i2686.radiusSpeed)
  i2686.radiusThickness = i2687[10]
  i2686.angle = i2687[11]
  i2686.length = i2687[12]
  i2686.boxThickness = new pc.Vec3( i2687[13], i2687[14], i2687[15] )
  i2686.meshShapeType = i2687[16]
  request.r(i2687[17], i2687[18], 0, i2686, 'mesh')
  request.r(i2687[19], i2687[20], 0, i2686, 'meshRenderer')
  request.r(i2687[21], i2687[22], 0, i2686, 'skinnedMeshRenderer')
  i2686.useMeshMaterialIndex = !!i2687[23]
  i2686.meshMaterialIndex = i2687[24]
  i2686.useMeshColors = !!i2687[25]
  i2686.normalOffset = i2687[26]
  i2686.arc = i2687[27]
  i2686.arcMode = i2687[28]
  i2686.arcSpread = i2687[29]
  i2686.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2687[30], i2686.arcSpeed)
  i2686.donutRadius = i2687[31]
  i2686.position = new pc.Vec3( i2687[32], i2687[33], i2687[34] )
  i2686.rotation = new pc.Vec3( i2687[35], i2687[36], i2687[37] )
  i2686.scale = new pc.Vec3( i2687[38], i2687[39], i2687[40] )
  return i2686
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i2688 = root || new pc.ParticleSystemSizeBySpeed()
  var i2689 = data
  i2688.enabled = !!i2689[0]
  i2688.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2689[1], i2688.x)
  i2688.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2689[2], i2688.y)
  i2688.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2689[3], i2688.z)
  i2688.separateAxes = !!i2689[4]
  i2688.range = new pc.Vec2( i2689[5], i2689[6] )
  return i2688
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i2690 = root || new pc.ParticleSystemSizeOverLifetime()
  var i2691 = data
  i2690.enabled = !!i2691[0]
  i2690.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2691[1], i2690.x)
  i2690.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2691[2], i2690.y)
  i2690.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2691[3], i2690.z)
  i2690.separateAxes = !!i2691[4]
  return i2690
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i2692 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i2693 = data
  i2692.enabled = !!i2693[0]
  i2692.mode = i2693[1]
  i2692.animation = i2693[2]
  i2692.numTilesX = i2693[3]
  i2692.numTilesY = i2693[4]
  i2692.useRandomRow = !!i2693[5]
  i2692.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2693[6], i2692.frameOverTime)
  i2692.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2693[7], i2692.startFrame)
  i2692.cycleCount = i2693[8]
  i2692.rowIndex = i2693[9]
  i2692.flipU = i2693[10]
  i2692.flipV = i2693[11]
  i2692.spriteCount = i2693[12]
  var i2695 = i2693[13]
  var i2694 = []
  for(var i = 0; i < i2695.length; i += 2) {
  request.r(i2695[i + 0], i2695[i + 1], 2, i2694, '')
  }
  i2692.sprites = i2694
  return i2692
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i2698 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i2699 = data
  i2698.enabled = !!i2699[0]
  i2698.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[1], i2698.x)
  i2698.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[2], i2698.y)
  i2698.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[3], i2698.z)
  i2698.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[4], i2698.radial)
  i2698.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[5], i2698.speedModifier)
  i2698.space = i2699[6]
  i2698.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[7], i2698.orbitalX)
  i2698.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[8], i2698.orbitalY)
  i2698.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[9], i2698.orbitalZ)
  i2698.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[10], i2698.orbitalOffsetX)
  i2698.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[11], i2698.orbitalOffsetY)
  i2698.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2699[12], i2698.orbitalOffsetZ)
  return i2698
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i2700 = root || new pc.ParticleSystemNoise()
  var i2701 = data
  i2700.enabled = !!i2701[0]
  i2700.separateAxes = !!i2701[1]
  i2700.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[2], i2700.strengthX)
  i2700.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[3], i2700.strengthY)
  i2700.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[4], i2700.strengthZ)
  i2700.frequency = i2701[5]
  i2700.damping = !!i2701[6]
  i2700.octaveCount = i2701[7]
  i2700.octaveMultiplier = i2701[8]
  i2700.octaveScale = i2701[9]
  i2700.quality = i2701[10]
  i2700.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[11], i2700.scrollSpeed)
  i2700.scrollSpeedMultiplier = i2701[12]
  i2700.remapEnabled = !!i2701[13]
  i2700.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[14], i2700.remapX)
  i2700.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[15], i2700.remapY)
  i2700.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[16], i2700.remapZ)
  i2700.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[17], i2700.positionAmount)
  i2700.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[18], i2700.rotationAmount)
  i2700.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2701[19], i2700.sizeAmount)
  return i2700
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i2702 = root || new pc.ParticleSystemInheritVelocity()
  var i2703 = data
  i2702.enabled = !!i2703[0]
  i2702.mode = i2703[1]
  i2702.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2703[2], i2702.curve)
  return i2702
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i2704 = root || new pc.ParticleSystemForceOverLifetime()
  var i2705 = data
  i2704.enabled = !!i2705[0]
  i2704.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2705[1], i2704.x)
  i2704.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2705[2], i2704.y)
  i2704.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2705[3], i2704.z)
  i2704.space = i2705[4]
  i2704.randomized = !!i2705[5]
  return i2704
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i2706 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i2707 = data
  i2706.enabled = !!i2707[0]
  i2706.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2707[1], i2706.limit)
  i2706.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2707[2], i2706.limitX)
  i2706.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2707[3], i2706.limitY)
  i2706.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2707[4], i2706.limitZ)
  i2706.dampen = i2707[5]
  i2706.separateAxes = !!i2707[6]
  i2706.space = i2707[7]
  i2706.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2707[8], i2706.drag)
  i2706.multiplyDragByParticleSize = !!i2707[9]
  i2706.multiplyDragByParticleVelocity = !!i2707[10]
  return i2706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i2708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i2709 = data
  request.r(i2709[0], i2709[1], 0, i2708, 'mesh')
  i2708.meshCount = i2709[2]
  i2708.activeVertexStreamsCount = i2709[3]
  i2708.alignment = i2709[4]
  i2708.renderMode = i2709[5]
  i2708.sortMode = i2709[6]
  i2708.lengthScale = i2709[7]
  i2708.velocityScale = i2709[8]
  i2708.cameraVelocityScale = i2709[9]
  i2708.normalDirection = i2709[10]
  i2708.sortingFudge = i2709[11]
  i2708.minParticleSize = i2709[12]
  i2708.maxParticleSize = i2709[13]
  i2708.pivot = new pc.Vec3( i2709[14], i2709[15], i2709[16] )
  request.r(i2709[17], i2709[18], 0, i2708, 'trailMaterial')
  i2708.applyActiveColorSpace = !!i2709[19]
  i2708.enabled = !!i2709[20]
  request.r(i2709[21], i2709[22], 0, i2708, 'sharedMaterial')
  var i2711 = i2709[23]
  var i2710 = []
  for(var i = 0; i < i2711.length; i += 2) {
  request.r(i2711[i + 0], i2711[i + 1], 2, i2710, '')
  }
  i2708.sharedMaterials = i2710
  i2708.receiveShadows = !!i2709[24]
  i2708.shadowCastingMode = i2709[25]
  i2708.sortingLayerID = i2709[26]
  i2708.sortingOrder = i2709[27]
  i2708.lightmapIndex = i2709[28]
  i2708.lightmapSceneIndex = i2709[29]
  i2708.lightmapScaleOffset = new pc.Vec4( i2709[30], i2709[31], i2709[32], i2709[33] )
  i2708.lightProbeUsage = i2709[34]
  i2708.reflectionProbeUsage = i2709[35]
  return i2708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i2712 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i2713 = data
  request.r(i2713[0], i2713[1], 0, i2712, 'sharedMesh')
  return i2712
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i2714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i2715 = data
  i2714.center = new pc.Vec3( i2715[0], i2715[1], i2715[2] )
  i2714.size = new pc.Vec3( i2715[3], i2715[4], i2715[5] )
  i2714.enabled = !!i2715[6]
  i2714.isTrigger = !!i2715[7]
  request.r(i2715[8], i2715[9], 0, i2714, 'material')
  return i2714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i2716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i2717 = data
  i2716.center = new pc.Vec3( i2717[0], i2717[1], i2717[2] )
  i2716.radius = i2717[3]
  i2716.enabled = !!i2717[4]
  i2716.isTrigger = !!i2717[5]
  request.r(i2717[6], i2717[7], 0, i2716, 'material')
  return i2716
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2719 = data
  i2718.planeDistance = i2719[0]
  i2718.referencePixelsPerUnit = i2719[1]
  i2718.isFallbackOverlay = !!i2719[2]
  i2718.renderMode = i2719[3]
  i2718.renderOrder = i2719[4]
  i2718.sortingLayerName = i2719[5]
  i2718.sortingOrder = i2719[6]
  i2718.scaleFactor = i2719[7]
  request.r(i2719[8], i2719[9], 0, i2718, 'worldCamera')
  i2718.overrideSorting = !!i2719[10]
  i2718.pixelPerfect = !!i2719[11]
  i2718.targetDisplay = i2719[12]
  i2718.overridePixelPerfect = !!i2719[13]
  i2718.enabled = !!i2719[14]
  return i2718
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2720 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2721 = data
  i2720.m_UiScaleMode = i2721[0]
  i2720.m_ReferencePixelsPerUnit = i2721[1]
  i2720.m_ScaleFactor = i2721[2]
  i2720.m_ReferenceResolution = new pc.Vec2( i2721[3], i2721[4] )
  i2720.m_ScreenMatchMode = i2721[5]
  i2720.m_MatchWidthOrHeight = i2721[6]
  i2720.m_PhysicalUnit = i2721[7]
  i2720.m_FallbackScreenDPI = i2721[8]
  i2720.m_DefaultSpriteDPI = i2721[9]
  i2720.m_DynamicPixelsPerUnit = i2721[10]
  i2720.m_PresetInfoIsWorld = !!i2721[11]
  return i2720
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2722 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2723 = data
  i2722.m_IgnoreReversedGraphics = !!i2723[0]
  i2722.m_BlockingObjects = i2723[1]
  i2722.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2723[2] )
  return i2722
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2725 = data
  i2724.cullTransparentMesh = !!i2725[0]
  return i2724
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i2726 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i2727 = data
  i2726.m_hasFontAssetChanged = !!i2727[0]
  request.r(i2727[1], i2727[2], 0, i2726, 'm_baseMaterial')
  i2726.m_maskOffset = new pc.Vec4( i2727[3], i2727[4], i2727[5], i2727[6] )
  i2726.m_text = i2727[7]
  i2726.m_isRightToLeft = !!i2727[8]
  request.r(i2727[9], i2727[10], 0, i2726, 'm_fontAsset')
  request.r(i2727[11], i2727[12], 0, i2726, 'm_sharedMaterial')
  var i2729 = i2727[13]
  var i2728 = []
  for(var i = 0; i < i2729.length; i += 2) {
  request.r(i2729[i + 0], i2729[i + 1], 2, i2728, '')
  }
  i2726.m_fontSharedMaterials = i2728
  request.r(i2727[14], i2727[15], 0, i2726, 'm_fontMaterial')
  var i2731 = i2727[16]
  var i2730 = []
  for(var i = 0; i < i2731.length; i += 2) {
  request.r(i2731[i + 0], i2731[i + 1], 2, i2730, '')
  }
  i2726.m_fontMaterials = i2730
  i2726.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2727[17], i2727[18], i2727[19], i2727[20])
  i2726.m_fontColor = new pc.Color(i2727[21], i2727[22], i2727[23], i2727[24])
  i2726.m_enableVertexGradient = !!i2727[25]
  i2726.m_colorMode = i2727[26]
  i2726.m_fontColorGradient = request.d('TMPro.VertexGradient', i2727[27], i2726.m_fontColorGradient)
  request.r(i2727[28], i2727[29], 0, i2726, 'm_fontColorGradientPreset')
  request.r(i2727[30], i2727[31], 0, i2726, 'm_spriteAsset')
  i2726.m_tintAllSprites = !!i2727[32]
  request.r(i2727[33], i2727[34], 0, i2726, 'm_StyleSheet')
  i2726.m_TextStyleHashCode = i2727[35]
  i2726.m_overrideHtmlColors = !!i2727[36]
  i2726.m_faceColor = UnityEngine.Color32.ConstructColor(i2727[37], i2727[38], i2727[39], i2727[40])
  i2726.m_fontSize = i2727[41]
  i2726.m_fontSizeBase = i2727[42]
  i2726.m_fontWeight = i2727[43]
  i2726.m_enableAutoSizing = !!i2727[44]
  i2726.m_fontSizeMin = i2727[45]
  i2726.m_fontSizeMax = i2727[46]
  i2726.m_fontStyle = i2727[47]
  i2726.m_HorizontalAlignment = i2727[48]
  i2726.m_VerticalAlignment = i2727[49]
  i2726.m_textAlignment = i2727[50]
  i2726.m_characterSpacing = i2727[51]
  i2726.m_characterHorizontalScale = i2727[52]
  i2726.m_wordSpacing = i2727[53]
  i2726.m_lineSpacing = i2727[54]
  i2726.m_lineSpacingMax = i2727[55]
  i2726.m_paragraphSpacing = i2727[56]
  i2726.m_charWidthMaxAdj = i2727[57]
  i2726.m_TextWrappingMode = i2727[58]
  i2726.m_wordWrappingRatios = i2727[59]
  i2726.m_overflowMode = i2727[60]
  request.r(i2727[61], i2727[62], 0, i2726, 'm_linkedTextComponent')
  request.r(i2727[63], i2727[64], 0, i2726, 'parentLinkedComponent')
  i2726.m_enableKerning = !!i2727[65]
  var i2733 = i2727[66]
  var i2732 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2733.length; i += 1) {
    i2732.add(i2733[i + 0]);
  }
  i2726.m_ActiveFontFeatures = i2732
  i2726.m_enableExtraPadding = !!i2727[67]
  i2726.checkPaddingRequired = !!i2727[68]
  i2726.m_isRichText = !!i2727[69]
  i2726.m_parseCtrlCharacters = !!i2727[70]
  i2726.m_isOrthographic = !!i2727[71]
  i2726.m_isCullingEnabled = !!i2727[72]
  i2726.m_horizontalMapping = i2727[73]
  i2726.m_verticalMapping = i2727[74]
  i2726.m_uvLineOffset = i2727[75]
  i2726.m_geometrySortingOrder = i2727[76]
  i2726.m_IsTextObjectScaleStatic = !!i2727[77]
  i2726.m_VertexBufferAutoSizeReduction = !!i2727[78]
  i2726.m_useMaxVisibleDescender = !!i2727[79]
  i2726.m_pageToDisplay = i2727[80]
  i2726.m_margin = new pc.Vec4( i2727[81], i2727[82], i2727[83], i2727[84] )
  i2726.m_isUsingLegacyAnimationComponent = !!i2727[85]
  i2726.m_isVolumetricText = !!i2727[86]
  request.r(i2727[87], i2727[88], 0, i2726, 'm_Material')
  i2726.m_EmojiFallbackSupport = !!i2727[89]
  i2726.m_Maskable = !!i2727[90]
  i2726.m_Color = new pc.Color(i2727[91], i2727[92], i2727[93], i2727[94])
  i2726.m_RaycastTarget = !!i2727[95]
  i2726.m_RaycastPadding = new pc.Vec4( i2727[96], i2727[97], i2727[98], i2727[99] )
  return i2726
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2734 = root || request.c( 'UnityEngine.UI.Image' )
  var i2735 = data
  request.r(i2735[0], i2735[1], 0, i2734, 'm_Sprite')
  i2734.m_Type = i2735[2]
  i2734.m_PreserveAspect = !!i2735[3]
  i2734.m_FillCenter = !!i2735[4]
  i2734.m_FillMethod = i2735[5]
  i2734.m_FillAmount = i2735[6]
  i2734.m_FillClockwise = !!i2735[7]
  i2734.m_FillOrigin = i2735[8]
  i2734.m_UseSpriteMesh = !!i2735[9]
  i2734.m_PixelsPerUnitMultiplier = i2735[10]
  request.r(i2735[11], i2735[12], 0, i2734, 'm_Material')
  i2734.m_Maskable = !!i2735[13]
  i2734.m_Color = new pc.Color(i2735[14], i2735[15], i2735[16], i2735[17])
  i2734.m_RaycastTarget = !!i2735[18]
  i2734.m_RaycastPadding = new pc.Vec4( i2735[19], i2735[20], i2735[21], i2735[22] )
  return i2734
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2736 = root || request.c( 'UnityEngine.UI.Button' )
  var i2737 = data
  i2736.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2737[0], i2736.m_OnClick)
  i2736.m_Navigation = request.d('UnityEngine.UI.Navigation', i2737[1], i2736.m_Navigation)
  i2736.m_Transition = i2737[2]
  i2736.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2737[3], i2736.m_Colors)
  i2736.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2737[4], i2736.m_SpriteState)
  i2736.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2737[5], i2736.m_AnimationTriggers)
  i2736.m_Interactable = !!i2737[6]
  request.r(i2737[7], i2737[8], 0, i2736, 'm_TargetGraphic')
  return i2736
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2738 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2739 = data
  i2738.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2739[0], i2738.m_PersistentCalls)
  return i2738
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2740 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2741 = data
  var i2743 = i2741[0]
  var i2742 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2743.length; i += 1) {
    i2742.add(request.d('UnityEngine.Events.PersistentCall', i2743[i + 0]));
  }
  i2740.m_Calls = i2742
  return i2740
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2746 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2747 = data
  request.r(i2747[0], i2747[1], 0, i2746, 'm_Target')
  i2746.m_TargetAssemblyTypeName = i2747[2]
  i2746.m_MethodName = i2747[3]
  i2746.m_Mode = i2747[4]
  i2746.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2747[5], i2746.m_Arguments)
  i2746.m_CallState = i2747[6]
  return i2746
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i2748 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i2749 = data
  i2748.m_Mode = i2749[0]
  i2748.m_WrapAround = !!i2749[1]
  request.r(i2749[2], i2749[3], 0, i2748, 'm_SelectOnUp')
  request.r(i2749[4], i2749[5], 0, i2748, 'm_SelectOnDown')
  request.r(i2749[6], i2749[7], 0, i2748, 'm_SelectOnLeft')
  request.r(i2749[8], i2749[9], 0, i2748, 'm_SelectOnRight')
  return i2748
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i2750 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i2751 = data
  i2750.m_NormalColor = new pc.Color(i2751[0], i2751[1], i2751[2], i2751[3])
  i2750.m_HighlightedColor = new pc.Color(i2751[4], i2751[5], i2751[6], i2751[7])
  i2750.m_PressedColor = new pc.Color(i2751[8], i2751[9], i2751[10], i2751[11])
  i2750.m_SelectedColor = new pc.Color(i2751[12], i2751[13], i2751[14], i2751[15])
  i2750.m_DisabledColor = new pc.Color(i2751[16], i2751[17], i2751[18], i2751[19])
  i2750.m_ColorMultiplier = i2751[20]
  i2750.m_FadeDuration = i2751[21]
  return i2750
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i2752 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i2753 = data
  request.r(i2753[0], i2753[1], 0, i2752, 'm_HighlightedSprite')
  request.r(i2753[2], i2753[3], 0, i2752, 'm_PressedSprite')
  request.r(i2753[4], i2753[5], 0, i2752, 'm_SelectedSprite')
  request.r(i2753[6], i2753[7], 0, i2752, 'm_DisabledSprite')
  return i2752
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i2754 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i2755 = data
  i2754.m_NormalTrigger = i2755[0]
  i2754.m_HighlightedTrigger = i2755[1]
  i2754.m_PressedTrigger = i2755[2]
  i2754.m_SelectedTrigger = i2755[3]
  i2754.m_DisabledTrigger = i2755[4]
  return i2754
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i2756 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i2757 = data
  i2756.m_StartCorner = i2757[0]
  i2756.m_StartAxis = i2757[1]
  i2756.m_CellSize = new pc.Vec2( i2757[2], i2757[3] )
  i2756.m_Spacing = new pc.Vec2( i2757[4], i2757[5] )
  i2756.m_Constraint = i2757[6]
  i2756.m_ConstraintCount = i2757[7]
  i2756.m_Padding = UnityEngine.RectOffset.FromPaddings(i2757[8], i2757[9], i2757[10], i2757[11])
  i2756.m_ChildAlignment = i2757[12]
  return i2756
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i2758 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i2759 = data
  i2758.m_Spacing = i2759[0]
  i2758.m_ChildForceExpandWidth = !!i2759[1]
  i2758.m_ChildForceExpandHeight = !!i2759[2]
  i2758.m_ChildControlWidth = !!i2759[3]
  i2758.m_ChildControlHeight = !!i2759[4]
  i2758.m_ChildScaleWidth = !!i2759[5]
  i2758.m_ChildScaleHeight = !!i2759[6]
  i2758.m_ReverseArrangement = !!i2759[7]
  i2758.m_Padding = UnityEngine.RectOffset.FromPaddings(i2759[8], i2759[9], i2759[10], i2759[11])
  i2758.m_ChildAlignment = i2759[12]
  return i2758
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i2760 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i2761 = data
  i2760.m_HorizontalFit = i2761[0]
  i2760.m_VerticalFit = i2761[1]
  return i2760
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i2762 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i2763 = data
  request.r(i2763[0], i2763[1], 0, i2762, 'm_Content')
  i2762.m_Horizontal = !!i2763[2]
  i2762.m_Vertical = !!i2763[3]
  i2762.m_MovementType = i2763[4]
  i2762.m_Elasticity = i2763[5]
  i2762.m_Inertia = !!i2763[6]
  i2762.m_DecelerationRate = i2763[7]
  i2762.m_ScrollSensitivity = i2763[8]
  request.r(i2763[9], i2763[10], 0, i2762, 'm_Viewport')
  request.r(i2763[11], i2763[12], 0, i2762, 'm_HorizontalScrollbar')
  request.r(i2763[13], i2763[14], 0, i2762, 'm_VerticalScrollbar')
  i2762.m_HorizontalScrollbarVisibility = i2763[15]
  i2762.m_VerticalScrollbarVisibility = i2763[16]
  i2762.m_HorizontalScrollbarSpacing = i2763[17]
  i2762.m_VerticalScrollbarSpacing = i2763[18]
  i2762.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i2763[19], i2762.m_OnValueChanged)
  return i2762
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i2764 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i2765 = data
  i2764.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2765[0], i2764.m_PersistentCalls)
  return i2764
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i2766 = root || request.c( 'UnityEngine.UI.Mask' )
  var i2767 = data
  i2766.m_ShowMaskGraphic = !!i2767[0]
  return i2766
}

Deserializers["UnityEngine.UI.Scrollbar"] = function (request, data, root) {
  var i2768 = root || request.c( 'UnityEngine.UI.Scrollbar' )
  var i2769 = data
  request.r(i2769[0], i2769[1], 0, i2768, 'm_HandleRect')
  i2768.m_Direction = i2769[2]
  i2768.m_Value = i2769[3]
  i2768.m_Size = i2769[4]
  i2768.m_NumberOfSteps = i2769[5]
  i2768.m_OnValueChanged = request.d('UnityEngine.UI.Scrollbar+ScrollEvent', i2769[6], i2768.m_OnValueChanged)
  i2768.m_Navigation = request.d('UnityEngine.UI.Navigation', i2769[7], i2768.m_Navigation)
  i2768.m_Transition = i2769[8]
  i2768.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2769[9], i2768.m_Colors)
  i2768.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2769[10], i2768.m_SpriteState)
  i2768.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2769[11], i2768.m_AnimationTriggers)
  i2768.m_Interactable = !!i2769[12]
  request.r(i2769[13], i2769[14], 0, i2768, 'm_TargetGraphic')
  return i2768
}

Deserializers["UnityEngine.UI.Scrollbar+ScrollEvent"] = function (request, data, root) {
  var i2770 = root || request.c( 'UnityEngine.UI.Scrollbar+ScrollEvent' )
  var i2771 = data
  i2770.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2771[0], i2770.m_PersistentCalls)
  return i2770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i2772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i2773 = data
  i2772.m_Alpha = i2773[0]
  i2772.m_Interactable = !!i2773[1]
  i2772.m_BlocksRaycasts = !!i2773[2]
  i2772.m_IgnoreParentGroups = !!i2773[3]
  i2772.enabled = !!i2773[4]
  return i2772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2775 = data
  i2774.name = i2775[0]
  i2774.index = i2775[1]
  i2774.startup = !!i2775[2]
  return i2774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i2776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i2777 = data
  i2776.type = i2777[0]
  i2776.color = new pc.Color(i2777[1], i2777[2], i2777[3], i2777[4])
  i2776.cullingMask = i2777[5]
  i2776.intensity = i2777[6]
  i2776.range = i2777[7]
  i2776.spotAngle = i2777[8]
  i2776.shadows = i2777[9]
  i2776.shadowNormalBias = i2777[10]
  i2776.shadowBias = i2777[11]
  i2776.shadowStrength = i2777[12]
  i2776.shadowResolution = i2777[13]
  i2776.lightmapBakeType = i2777[14]
  i2776.renderMode = i2777[15]
  request.r(i2777[16], i2777[17], 0, i2776, 'cookie')
  i2776.cookieSize = i2777[18]
  i2776.shadowNearPlane = i2777[19]
  i2776.occlusionMaskChannel = i2777[20]
  i2776.isBaked = !!i2777[21]
  i2776.mixedLightingMode = i2777[22]
  i2776.enabled = !!i2777[23]
  return i2776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2779 = data
  request.r(i2779[0], i2779[1], 0, i2778, 'clip')
  request.r(i2779[2], i2779[3], 0, i2778, 'outputAudioMixerGroup')
  i2778.playOnAwake = !!i2779[4]
  i2778.loop = !!i2779[5]
  i2778.time = i2779[6]
  i2778.volume = i2779[7]
  i2778.pitch = i2779[8]
  i2778.enabled = !!i2779[9]
  return i2778
}

Deserializers["PlayableSpatialAudio"] = function (request, data, root) {
  var i2780 = root || request.c( 'PlayableSpatialAudio' )
  var i2781 = data
  request.r(i2781[0], i2781[1], 0, i2780, 'listener')
  request.r(i2781[2], i2781[3], 0, i2780, 'source')
  i2780.volume = i2781[4]
  i2780.minDistance = i2781[5]
  i2780.maxDistance = i2781[6]
  i2780.linear = !!i2781[7]
  return i2780
}

Deserializers["StealEggGame"] = function (request, data, root) {
  var i2782 = root || request.c( 'StealEggGame' )
  var i2783 = data
  var i2785 = i2783[0]
  var i2784 = []
  for(var i = 0; i < i2785.length; i += 1) {
    i2784.push( request.d('StealEggGame+PetInfo', i2785[i + 0]) );
  }
  i2782.petCatalog = i2784
  var i2787 = i2783[1]
  var i2786 = []
  for(var i = 0; i < i2787.length; i += 1) {
    i2786.push( request.d('StealEggGame+TrailInfo', i2787[i + 0]) );
  }
  i2782.trails = i2786
  var i2789 = i2783[2]
  var i2788 = []
  for(var i = 0; i < i2789.length; i += 1) {
    i2788.push( request.d('StealEggGame+BoostInfo', i2789[i + 0]) );
  }
  i2782.luckyEggRewards = i2788
  request.r(i2783[3], i2783[4], 0, i2782, 'playerHair')
  var i2791 = i2783[5]
  var i2790 = []
  for(var i = 0; i < i2791.length; i += 2) {
  request.r(i2791[i + 0], i2791[i + 1], 2, i2790, '')
  }
  i2782.outfitHairs = i2790
  var i2793 = i2783[6]
  var i2792 = []
  for(var i = 0; i < i2793.length; i += 2) {
  request.r(i2793[i + 0], i2793[i + 1], 2, i2792, '')
  }
  i2782.outfitFaces = i2792
  var i2795 = i2783[7]
  var i2794 = []
  for(var i = 0; i < i2795.length; i += 2) {
  request.r(i2795[i + 0], i2795[i + 1], 2, i2794, '')
  }
  i2782.outfitShirts = i2794
  var i2797 = i2783[8]
  var i2796 = []
  for(var i = 0; i < i2797.length; i += 2) {
  request.r(i2797[i + 0], i2797[i + 1], 2, i2796, '')
  }
  i2782.outfitPants = i2796
  var i2799 = i2783[9]
  var i2798 = []
  for(var i = 0; i < i2799.length; i += 2) {
  request.r(i2799[i + 0], i2799[i + 1], 2, i2798, '')
  }
  i2782.rarityMaterials = i2798
  var i2801 = i2783[10]
  var i2800 = []
  for(var i = 0; i < i2801.length; i += 2) {
  request.r(i2801[i + 0], i2801[i + 1], 2, i2800, '')
  }
  i2782.rarityWorldMaterials = i2800
  request.r(i2783[11], i2783[12], 0, i2782, 'rarityFont')
  var i2803 = i2783[13]
  var i2802 = []
  for(var i = 0; i < i2803.length; i += 2) {
  request.r(i2803[i + 0], i2803[i + 1], 2, i2802, '')
  }
  i2782.rarityFrames = i2802
  request.r(i2783[14], i2783[15], 0, i2782, 'batIcon')
  request.r(i2783[16], i2783[17], 0, i2782, 'nightIcon')
  request.r(i2783[18], i2783[19], 0, i2782, 'dayIcon')
  request.r(i2783[20], i2783[21], 0, i2782, 'trainBoostIcon')
  request.r(i2783[22], i2783[23], 0, i2782, 'incubateBoostIcon')
  request.r(i2783[24], i2783[25], 0, i2782, 'batPrefab')
  request.r(i2783[26], i2783[27], 0, i2782, 'luckyEggPrefab')
  request.r(i2783[28], i2783[29], 0, i2782, 'incubateTimerPrefab')
  request.r(i2783[30], i2783[31], 0, i2782, 'floatingTextPrefab')
  request.r(i2783[32], i2783[33], 0, i2782, 'npcTemplate')
  request.r(i2783[34], i2783[35], 0, i2782, 'footstepSound')
  request.r(i2783[36], i2783[37], 0, i2782, 'clickSound')
  request.r(i2783[38], i2783[39], 0, i2782, 'closeSound')
  request.r(i2783[40], i2783[41], 0, i2782, 'rewardSound')
  request.r(i2783[42], i2783[43], 0, i2782, 'upgradeSound')
  request.r(i2783[44], i2783[45], 0, i2782, 'trainSound')
  request.r(i2783[46], i2783[47], 0, i2782, 'equipSound')
  request.r(i2783[48], i2783[49], 0, i2782, 'fuseSound')
  request.r(i2783[50], i2783[51], 0, i2782, 'frogSound')
  request.r(i2783[52], i2783[53], 0, i2782, 'progressSound')
  request.r(i2783[54], i2783[55], 0, i2782, 'warningSound')
  request.r(i2783[56], i2783[57], 0, i2782, 'crackSound')
  request.r(i2783[58], i2783[59], 0, i2782, 'popupSound')
  i2782.coopPrices = i2783[60]
  i2782.coopModelByLevel = i2783[61]
  i2782.coopBaseSlots = i2783[62]
  i2782.treadmillPrices = i2783[63]
  i2782.treadmillTrainValues = i2783[64]
  i2782.priceMultiplier = i2783[65]
  i2782.dayDuration = i2783[66]
  i2782.nightDuration = i2783[67]
  i2782.nightIncubateMultiplier = i2783[68]
  i2782.dayLightIntensity = i2783[69]
  i2782.lightTransition = i2783[70]
  i2782.incomeMultiplierBySize = i2783[71]
  i2782.sellPriceMultiplier = i2783[72]
  i2782.luckyFrogFeedMultiplier = i2783[73]
  i2782.trainTick = i2783[74]
  i2782.hatchDuration = i2783[75]
  i2782.luckyEggOpenDuration = i2783[76]
  i2782.fuseDuration = i2783[77]
  i2782.npcCount = i2783[78]
  i2782.npcCoopSmallPets = i2783[79]
  i2782.npcCoopBigPetSize = i2783[80]
  i2782.npcMinSpeed = i2783[81]
  i2782.npcMaxSpeed = i2783[82]
  i2782.batCooldown = i2783[83]
  i2782.batForce = i2783[84]
  var i2805 = i2783[85]
  var i2804 = []
  for(var i = 0; i < i2805.length; i += 1) {
    i2804.push( request.d('StealEggGame+House', i2805[i + 0]) );
  }
  i2782.houses = i2804
  request.r(i2783[86], i2783[87], 0, i2782, 'fuseMachine')
  request.r(i2783[88], i2783[89], 0, i2782, 'exchangeShop')
  request.r(i2783[90], i2783[91], 0, i2782, 'luckyFrog')
  request.r(i2783[92], i2783[93], 0, i2782, 'luckyEggSpawn')
  request.r(i2783[94], i2783[95], 0, i2782, 'luckyEggTarget')
  request.r(i2783[96], i2783[97], 0, i2782, 'teleportPoint')
  request.r(i2783[98], i2783[99], 0, i2782, 'lobbyCenter')
  request.r(i2783[100], i2783[101], 0, i2782, 'originalUI')
  i2782.lobbySize = new pc.Vec3( i2783[102], i2783[103], i2783[104] )
  request.r(i2783[105], i2783[106], 0, i2782, 'combatArea')
  request.r(i2783[107], i2783[108], 0, i2782, 'nightGraphic')
  request.r(i2783[109], i2783[110], 0, i2782, 'nightText')
  request.r(i2783[111], i2783[112], 0, i2782, 'sun')
  var i2807 = i2783[113]
  var i2806 = []
  for(var i = 0; i < i2807.length; i += 2) {
  request.r(i2807[i + 0], i2807[i + 1], 2, i2806, '')
  }
  i2782.npcModels = i2806
  var i2809 = i2783[114]
  var i2808 = []
  for(var i = 0; i < i2809.length; i += 1) {
    i2808.push( request.d('StealEggGame+Zone', i2809[i + 0]) );
  }
  i2782.zones = i2808
  request.r(i2783[115], i2783[116], 0, i2782, 'player')
  request.r(i2783[117], i2783[118], 0, i2782, 'home')
  request.r(i2783[119], i2783[120], 0, i2782, 'safePoint')
  request.r(i2783[121], i2783[122], 0, i2782, 'rightHandSlot')
  request.r(i2783[123], i2783[124], 0, i2782, 'playerCoopArea')
  request.r(i2783[125], i2783[126], 0, i2782, 'trainingPoint')
  request.r(i2783[127], i2783[128], 0, i2782, 'gameCamera')
  request.r(i2783[129], i2783[130], 0, i2782, 'playerAnimator')
  request.r(i2783[131], i2783[132], 0, i2782, 'ragdoll')
  request.r(i2783[133], i2783[134], 0, i2782, 'uiFont')
  request.r(i2783[135], i2783[136], 0, i2782, 'guideMaterial')
  request.r(i2783[137], i2783[138], 0, i2782, 'roundedSprite')
  request.r(i2783[139], i2783[140], 0, i2782, 'circleSprite')
  request.r(i2783[141], i2783[142], 0, i2782, 'moneyIcon')
  request.r(i2783[143], i2783[144], 0, i2782, 'speedIcon')
  request.r(i2783[145], i2783[146], 0, i2782, 'stealSound')
  request.r(i2783[147], i2783[148], 0, i2782, 'deliverSound')
  request.r(i2783[149], i2783[150], 0, i2782, 'hatchSound')
  request.r(i2783[151], i2783[152], 0, i2782, 'caughtSound')
  request.r(i2783[153], i2783[154], 0, i2782, 'eggBreakEffect')
  request.r(i2783[155], i2783[156], 0, i2782, 'sourceHud')
  i2782.capturesForEndCard = i2783[157]
  i2782.moveSpeed = i2783[158]
  i2782.incubationSeconds = i2783[159]
  i2782.jumpHeight = i2783[160]
  i2782.gravity = i2783[161]
  i2782.baseMoveSpeed = i2783[162]
  i2782.speedPowerMultiplier = i2783[163]
  i2782.trainingPowerPerTick = i2783[164]
  i2782.startingMoney = i2783[165]
  i2782.slowMode = !!i2783[166]
  i2782.hitWindup = i2783[167]
  i2782.knockdownDuration = i2783[168]
  i2782.getUpDuration = i2783[169]
  request.r(i2783[170], i2783[171], 0, i2782, 'guide')
  i2782.hudUI = request.d('StealEggGame+HudUI', i2783[172], i2782.hudUI)
  i2782.petsUI = request.d('StealEggGame+PetsPopupUI', i2783[173], i2782.petsUI)
  i2782.incubateUI = request.d('StealEggGame+IncubatePopupUI', i2783[174], i2782.incubateUI)
  i2782.inventoryUI = request.d('StealEggGame+InventoryUI', i2783[175], i2782.inventoryUI)
  i2782.rewardUI = request.d('StealEggGame+RewardUI', i2783[176], i2782.rewardUI)
  i2782.dialogUI = request.d('StealEggGame+DialogUI', i2783[177], i2782.dialogUI)
  request.r(i2783[178], i2783[179], 0, i2782, 'warningPanel')
  i2782.treadmillUI = request.d('StealEggGame+TreadmillPanelUI', i2783[180], i2782.treadmillUI)
  i2782.indexUI = request.d('StealEggGame+IndexUI', i2783[181], i2782.indexUI)
  i2782.settingsUI = request.d('StealEggGame+LockedPanelUI', i2783[182], i2782.settingsUI)
  i2782.coopUI = request.d('StealEggGame+LockedPanelUI', i2783[183], i2782.coopUI)
  i2782.fuseUI = request.d('StealEggGame+LockedPanelUI', i2783[184], i2782.fuseUI)
  i2782.frogUI = request.d('StealEggGame+LockedPanelUI', i2783[185], i2782.frogUI)
  i2782.shopUI = request.d('StealEggGame+LockedPanelUI', i2783[186], i2782.shopUI)
  i2782.trailUI = request.d('StealEggGame+LockedPanelUI', i2783[187], i2782.trailUI)
  request.r(i2783[188], i2783[189], 0, i2782, 'jumpButton')
  request.r(i2783[190], i2783[191], 0, i2782, 'safeUI')
  request.r(i2783[192], i2783[193], 0, i2782, 'hintHand')
  request.r(i2783[194], i2783[195], 0, i2782, 'cameraHint')
  request.r(i2783[196], i2783[197], 0, i2782, 'jumpHint')
  request.r(i2783[198], i2783[199], 0, i2782, 'tutorialText')
  request.r(i2783[200], i2783[201], 0, i2782, 'joystick')
  return i2782
}

Deserializers["StealEggGame+PetInfo"] = function (request, data, root) {
  var i2812 = root || request.c( 'StealEggGame+PetInfo' )
  var i2813 = data
  i2812.name = i2813[0]
  i2812.rarity = i2813[1]
  i2812.zone = i2813[2]
  i2812.income = i2813[3]
  request.r(i2813[4], i2813[5], 0, i2812, 'thumbnail')
  request.r(i2813[6], i2813[7], 0, i2812, 'prefab')
  return i2812
}

Deserializers["StealEggGame+TrailInfo"] = function (request, data, root) {
  var i2816 = root || request.c( 'StealEggGame+TrailInfo' )
  var i2817 = data
  i2816.name = i2817[0]
  i2816.rarity = i2817[1]
  i2816.multiplier = i2817[2]
  i2816.price = i2817[3]
  request.r(i2817[4], i2817[5], 0, i2816, 'thumbnail')
  request.r(i2817[6], i2817[7], 0, i2816, 'frame')
  request.r(i2817[8], i2817[9], 0, i2816, 'prefab')
  return i2816
}

Deserializers["StealEggGame+BoostInfo"] = function (request, data, root) {
  var i2820 = root || request.c( 'StealEggGame+BoostInfo' )
  var i2821 = data
  i2820.name = i2821[0]
  i2820.type = i2821[1]
  i2820.value = i2821[2]
  i2820.duration = i2821[3]
  i2820.weight = i2821[4]
  request.r(i2821[5], i2821[6], 0, i2820, 'icon')
  return i2820
}

Deserializers["StealEggGame+House"] = function (request, data, root) {
  var i2826 = root || request.c( 'StealEggGame+House' )
  var i2827 = data
  request.r(i2827[0], i2827[1], 0, i2826, 'root')
  request.r(i2827[2], i2827[3], 0, i2826, 'coopPad')
  request.r(i2827[4], i2827[5], 0, i2826, 'treadmillPad')
  request.r(i2827[6], i2827[7], 0, i2826, 'petContainer')
  var i2829 = i2827[8]
  var i2828 = []
  for(var i = 0; i < i2829.length; i += 2) {
  request.r(i2829[i + 0], i2829[i + 1], 2, i2828, '')
  }
  i2826.coopModels = i2828
  var i2831 = i2827[9]
  var i2830 = []
  for(var i = 0; i < i2831.length; i += 2) {
  request.r(i2831[i + 0], i2831[i + 1], 2, i2830, '')
  }
  i2826.treadmills = i2830
  return i2826
}

Deserializers["StealEggGame+Zone"] = function (request, data, root) {
  var i2836 = root || request.c( 'StealEggGame+Zone' )
  var i2837 = data
  i2836.name = i2837[0]
  request.r(i2837[1], i2837[2], 0, i2836, 'root')
  request.r(i2837[3], i2837[4], 0, i2836, 'guardian')
  var i2839 = i2837[5]
  var i2838 = []
  for(var i = 0; i < i2839.length; i += 2) {
  request.r(i2839[i + 0], i2839[i + 1], 2, i2838, '')
  }
  i2836.nests = i2838
  var i2841 = i2837[6]
  var i2840 = []
  for(var i = 0; i < i2841.length; i += 2) {
  request.r(i2841[i + 0], i2841[i + 1], 2, i2840, '')
  }
  i2836.eggPrefabs = i2840
  var i2843 = i2837[7]
  var i2842 = []
  for(var i = 0; i < i2843.length; i += 2) {
  request.r(i2843[i + 0], i2843[i + 1], 2, i2842, '')
  }
  i2836.petPrefabs = i2842
  var i2845 = i2837[8]
  var i2844 = []
  for(var i = 0; i < i2845.length; i += 1) {
    i2844.push( request.d('PlayableEggRules', i2845[i + 0]) );
  }
  i2836.eggRules = i2844
  request.r(i2837[9], i2837[10], 0, i2836, 'bounds')
  request.r(i2837[11], i2837[12], 0, i2836, 'thumbnail')
  i2836.attackDistance = i2837[13]
  i2836.guardianSpeed = i2837[14]
  request.r(i2837[15], i2837[16], 0, i2836, 'sleepSound')
  request.r(i2837[17], i2837[18], 0, i2836, 'runSound')
  request.r(i2837[19], i2837[20], 0, i2836, 'catchSound')
  return i2836
}

Deserializers["PlayableEggRules"] = function (request, data, root) {
  var i2848 = root || request.c( 'PlayableEggRules' )
  var i2849 = data
  i2848.name = i2849[0]
  request.r(i2849[1], i2849[2], 0, i2848, 'thumbnail')
  i2848.petIds = i2849[3]
  i2848.spawnWeight = i2849[4]
  i2848.incubationTime = i2849[5]
  var i2851 = i2849[6]
  var i2850 = []
  for(var i = 0; i < i2851.length; i += 2) {
    i2850.push( new pc.Vec2( i2851[i + 0], i2851[i + 1] ) );
  }
  i2848.sizeRanges = i2850
  i2848.sizeWeights = i2849[7]
  var i2853 = i2849[8]
  var i2852 = []
  for(var i = 0; i < i2853.length; i += 2) {
  request.r(i2853[i + 0], i2853[i + 1], 2, i2852, '')
  }
  i2848.pets = i2852
  i2848.petWeights = i2849[9]
  i2848.petIncome = i2849[10]
  return i2848
}

Deserializers["StealEggGame+HudUI"] = function (request, data, root) {
  var i2856 = root || request.c( 'StealEggGame+HudUI' )
  var i2857 = data
  request.r(i2857[0], i2857[1], 0, i2856, 'functions')
  var i2859 = i2857[2]
  var i2858 = []
  for(var i = 0; i < i2859.length; i += 2) {
  request.r(i2859[i + 0], i2859[i + 1], 2, i2858, '')
  }
  i2856.actionButtons = i2858
  request.r(i2857[3], i2857[4], 0, i2856, 'incubateTapHint')
  request.r(i2857[5], i2857[6], 0, i2856, 'hatchTapHint')
  request.r(i2857[7], i2857[8], 0, i2856, 'equipTapHint')
  request.r(i2857[9], i2857[10], 0, i2856, 'trainTapHint')
  request.r(i2857[11], i2857[12], 0, i2856, 'attack')
  request.r(i2857[13], i2857[14], 0, i2856, 'settings')
  request.r(i2857[15], i2857[16], 0, i2856, 'trailShop')
  request.r(i2857[17], i2857[18], 0, i2856, 'index')
  request.r(i2857[19], i2857[20], 0, i2856, 'speedMode')
  request.r(i2857[21], i2857[22], 0, i2856, 'speedOn')
  request.r(i2857[23], i2857[24], 0, i2856, 'speedOff')
  request.r(i2857[25], i2857[26], 0, i2856, 'money')
  request.r(i2857[27], i2857[28], 0, i2856, 'speed')
  request.r(i2857[29], i2857[30], 0, i2856, 'time')
  request.r(i2857[31], i2857[32], 0, i2856, 'moneyIcon')
  request.r(i2857[33], i2857[34], 0, i2856, 'speedIcon')
  request.r(i2857[35], i2857[36], 0, i2856, 'timeIcon')
  request.r(i2857[37], i2857[38], 0, i2856, 'indexHighlight')
  request.r(i2857[39], i2857[40], 0, i2856, 'incubateHighlight')
  request.r(i2857[41], i2857[42], 0, i2856, 'right')
  request.r(i2857[43], i2857[44], 0, i2856, 'equipMonster')
  request.r(i2857[45], i2857[46], 0, i2856, 'incubateEgg')
  request.r(i2857[47], i2857[48], 0, i2856, 'boostContainer')
  request.r(i2857[49], i2857[50], 0, i2856, 'boostTemplate')
  request.r(i2857[51], i2857[52], 0, i2856, 'zoneBanner')
  request.r(i2857[53], i2857[54], 0, i2856, 'zoneFrame')
  request.r(i2857[55], i2857[56], 0, i2856, 'zoneName')
  request.r(i2857[57], i2857[58], 0, i2856, 'incomeTemplate')
  return i2856
}

Deserializers["StealEggGame+PetsPopupUI"] = function (request, data, root) {
  var i2860 = root || request.c( 'StealEggGame+PetsPopupUI' )
  var i2861 = data
  request.r(i2861[0], i2861[1], 0, i2860, 'root')
  request.r(i2861[2], i2861[3], 0, i2860, 'content')
  request.r(i2861[4], i2861[5], 0, i2860, 'template')
  request.r(i2861[6], i2861[7], 0, i2860, 'close')
  request.r(i2861[8], i2861[9], 0, i2860, 'equipBest')
  request.r(i2861[10], i2861[11], 0, i2860, 'upgradeSlot')
  request.r(i2861[12], i2861[13], 0, i2860, 'slots')
  request.r(i2861[14], i2861[15], 0, i2860, 'upgradePrice')
  request.r(i2861[16], i2861[17], 0, i2860, 'upgradeUnavailable')
  return i2860
}

Deserializers["StealEggGame+IncubatePopupUI"] = function (request, data, root) {
  var i2862 = root || request.c( 'StealEggGame+IncubatePopupUI' )
  var i2863 = data
  request.r(i2863[0], i2863[1], 0, i2862, 'root')
  request.r(i2863[2], i2863[3], 0, i2862, 'content')
  request.r(i2863[4], i2863[5], 0, i2862, 'template')
  request.r(i2863[6], i2863[7], 0, i2862, 'close')
  return i2862
}

Deserializers["StealEggGame+InventoryUI"] = function (request, data, root) {
  var i2864 = root || request.c( 'StealEggGame+InventoryUI' )
  var i2865 = data
  var i2867 = i2865[0]
  var i2866 = []
  for(var i = 0; i < i2867.length; i += 2) {
  request.r(i2867[i + 0], i2867[i + 1], 2, i2866, '')
  }
  i2864.quickSlots = i2866
  request.r(i2865[1], i2865[2], 0, i2864, 'bag')
  request.r(i2865[3], i2865[4], 0, i2864, 'bagClose')
  request.r(i2865[5], i2865[6], 0, i2864, 'bagPopup')
  request.r(i2865[7], i2865[8], 0, i2864, 'bagContent')
  request.r(i2865[9], i2865[10], 0, i2864, 'bagTemplate')
  request.r(i2865[11], i2865[12], 0, i2864, 'petInfo')
  request.r(i2865[13], i2865[14], 0, i2864, 'petThumbnail')
  request.r(i2865[15], i2865[16], 0, i2864, 'petName')
  request.r(i2865[17], i2865[18], 0, i2864, 'petIncome')
  request.r(i2865[19], i2865[20], 0, i2864, 'petRarity')
  request.r(i2865[21], i2865[22], 0, i2864, 'petEquip')
  request.r(i2865[23], i2865[24], 0, i2864, 'petDrop')
  request.r(i2865[25], i2865[26], 0, i2864, 'eggInfo')
  request.r(i2865[27], i2865[28], 0, i2864, 'eggThumbnail')
  request.r(i2865[29], i2865[30], 0, i2864, 'eggName')
  request.r(i2865[31], i2865[32], 0, i2864, 'eggWeight')
  request.r(i2865[33], i2865[34], 0, i2864, 'eggIncubate')
  request.r(i2865[35], i2865[36], 0, i2864, 'eggDrop')
  return i2864
}

Deserializers["StealEggGame+RewardUI"] = function (request, data, root) {
  var i2870 = root || request.c( 'StealEggGame+RewardUI' )
  var i2871 = data
  request.r(i2871[0], i2871[1], 0, i2870, 'root')
  request.r(i2871[2], i2871[3], 0, i2870, 'title')
  request.r(i2871[4], i2871[5], 0, i2870, 'content')
  request.r(i2871[6], i2871[7], 0, i2870, 'template')
  request.r(i2871[8], i2871[9], 0, i2870, 'close')
  request.r(i2871[10], i2871[11], 0, i2870, 'tapToClose')
  return i2870
}

Deserializers["StealEggGame+DialogUI"] = function (request, data, root) {
  var i2872 = root || request.c( 'StealEggGame+DialogUI' )
  var i2873 = data
  request.r(i2873[0], i2873[1], 0, i2872, 'root')
  request.r(i2873[2], i2873[3], 0, i2872, 'message')
  return i2872
}

Deserializers["StealEggGame+TreadmillPanelUI"] = function (request, data, root) {
  var i2874 = root || request.c( 'StealEggGame+TreadmillPanelUI' )
  var i2875 = data
  request.r(i2875[0], i2875[1], 0, i2874, 'root')
  request.r(i2875[2], i2875[3], 0, i2874, 'close')
  request.r(i2875[4], i2875[5], 0, i2874, 'upgrade')
  request.r(i2875[6], i2875[7], 0, i2874, 'level')
  request.r(i2875[8], i2875[9], 0, i2874, 'train')
  request.r(i2875[10], i2875[11], 0, i2874, 'price')
  request.r(i2875[12], i2875[13], 0, i2874, 'max')
  return i2874
}

Deserializers["StealEggGame+IndexUI"] = function (request, data, root) {
  var i2876 = root || request.c( 'StealEggGame+IndexUI' )
  var i2877 = data
  request.r(i2877[0], i2877[1], 0, i2876, 'root')
  request.r(i2877[2], i2877[3], 0, i2876, 'close')
  request.r(i2877[4], i2877[5], 0, i2876, 'claim')
  request.r(i2877[6], i2877[7], 0, i2876, 'zones')
  request.r(i2877[8], i2877[9], 0, i2876, 'zoneTemplate')
  request.r(i2877[10], i2877[11], 0, i2876, 'lockedZone')
  request.r(i2877[12], i2877[13], 0, i2876, 'progressFill')
  request.r(i2877[14], i2877[15], 0, i2876, 'progress')
  request.r(i2877[16], i2877[17], 0, i2876, 'information')
  request.r(i2877[18], i2877[19], 0, i2876, 'rewardFrame')
  request.r(i2877[20], i2877[21], 0, i2876, 'claimed')
  request.r(i2877[22], i2877[23], 0, i2876, 'infoImage')
  request.r(i2877[24], i2877[25], 0, i2876, 'infoName')
  request.r(i2877[26], i2877[27], 0, i2876, 'infoIncome')
  request.r(i2877[28], i2877[29], 0, i2876, 'infoRarity')
  request.r(i2877[30], i2877[31], 0, i2876, 'rewardContent')
  request.r(i2877[32], i2877[33], 0, i2876, 'rewardTemplate')
  return i2876
}

Deserializers["StealEggGame+LockedPanelUI"] = function (request, data, root) {
  var i2878 = root || request.c( 'StealEggGame+LockedPanelUI' )
  var i2879 = data
  request.r(i2879[0], i2879[1], 0, i2878, 'root')
  request.r(i2879[2], i2879[3], 0, i2878, 'close')
  return i2878
}

Deserializers["PlayableRagdoll"] = function (request, data, root) {
  var i2880 = root || request.c( 'PlayableRagdoll' )
  var i2881 = data
  request.r(i2881[0], i2881[1], 0, i2880, 'player')
  request.r(i2881[2], i2881[3], 0, i2880, 'animator')
  request.r(i2881[4], i2881[5], 0, i2880, 'hips')
  var i2883 = i2881[6]
  var i2882 = []
  for(var i = 0; i < i2883.length; i += 2) {
  request.r(i2883[i + 0], i2883[i + 1], 2, i2882, '')
  }
  i2880.bodies = i2882
  var i2885 = i2881[7]
  var i2884 = []
  for(var i = 0; i < i2885.length; i += 2) {
  request.r(i2885[i + 0], i2885[i + 1], 2, i2884, '')
  }
  i2880.bodyColliders = i2884
  return i2880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i2890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i2891 = data
  i2890.textureMode = i2891[0]
  i2890.alignment = i2891[1]
  i2890.widthCurve = new pc.AnimationCurve( { keys_flow: i2891[2] } )
  i2890.colorGradient = i2891[3] ? new pc.ColorGradient(i2891[3][0], i2891[3][1], i2891[3][2]) : null
  var i2893 = i2891[4]
  var i2892 = []
  for(var i = 0; i < i2893.length; i += 3) {
    i2892.push( new pc.Vec3( i2893[i + 0], i2893[i + 1], i2893[i + 2] ) );
  }
  i2890.positions = i2892
  i2890.positionCount = i2891[5]
  i2890.widthMultiplier = i2891[6]
  i2890.startWidth = i2891[7]
  i2890.endWidth = i2891[8]
  i2890.numCornerVertices = i2891[9]
  i2890.numCapVertices = i2891[10]
  i2890.useWorldSpace = !!i2891[11]
  i2890.loop = !!i2891[12]
  i2890.startColor = new pc.Color(i2891[13], i2891[14], i2891[15], i2891[16])
  i2890.endColor = new pc.Color(i2891[17], i2891[18], i2891[19], i2891[20])
  i2890.generateLightingData = !!i2891[21]
  i2890.enabled = !!i2891[22]
  request.r(i2891[23], i2891[24], 0, i2890, 'sharedMaterial')
  var i2895 = i2891[25]
  var i2894 = []
  for(var i = 0; i < i2895.length; i += 2) {
  request.r(i2895[i + 0], i2895[i + 1], 2, i2894, '')
  }
  i2890.sharedMaterials = i2894
  i2890.receiveShadows = !!i2891[26]
  i2890.shadowCastingMode = i2891[27]
  i2890.sortingLayerID = i2891[28]
  i2890.sortingOrder = i2891[29]
  i2890.lightmapIndex = i2891[30]
  i2890.lightmapSceneIndex = i2891[31]
  i2890.lightmapScaleOffset = new pc.Vec4( i2891[32], i2891[33], i2891[34], i2891[35] )
  i2890.lightProbeUsage = i2891[36]
  i2890.reflectionProbeUsage = i2891[37]
  return i2890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i2896 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i2897 = data
  i2896.enabled = !!i2897[0]
  i2896.center = new pc.Vec3( i2897[1], i2897[2], i2897[3] )
  i2896.radius = i2897[4]
  i2896.height = i2897[5]
  i2896.minMoveDistance = i2897[6]
  i2896.skinWidth = i2897[7]
  i2896.enableOverlapRecovery = !!i2897[8]
  return i2896
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i2898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i2899 = data
  i2898.swingAxis = new pc.Vec3( i2899[0], i2899[1], i2899[2] )
  i2898.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i2899[3], i2898.twistLimitSpring)
  i2898.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i2899[4], i2898.swingLimitSpring)
  i2898.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i2899[5], i2898.lowTwistLimit)
  i2898.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i2899[6], i2898.highTwistLimit)
  i2898.swing1Limit = request.d('UnityEngine.SoftJointLimit', i2899[7], i2898.swing1Limit)
  i2898.swing2Limit = request.d('UnityEngine.SoftJointLimit', i2899[8], i2898.swing2Limit)
  request.r(i2899[9], i2899[10], 0, i2898, 'connectedBody')
  i2898.axis = new pc.Vec3( i2899[11], i2899[12], i2899[13] )
  i2898.anchor = new pc.Vec3( i2899[14], i2899[15], i2899[16] )
  i2898.connectedAnchor = new pc.Vec3( i2899[17], i2899[18], i2899[19] )
  i2898.autoConfigureConnectedAnchor = !!i2899[20]
  i2898.massScale = i2899[21]
  i2898.connectedMassScale = i2899[22]
  i2898.enableCollision = !!i2899[23]
  i2898.breakForce = i2899[24]
  i2898.breakTorque = i2899[25]
  return i2898
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2900 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2901 = data
  request.r(i2901[0], i2901[1], 0, i2900, 'm_FirstSelected')
  i2900.m_sendNavigationEvents = !!i2901[2]
  i2900.m_DragThreshold = i2901[3]
  return i2900
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i2902 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i2903 = data
  i2902.m_HorizontalAxis = i2903[0]
  i2902.m_VerticalAxis = i2903[1]
  i2902.m_SubmitButton = i2903[2]
  i2902.m_CancelButton = i2903[3]
  i2902.m_InputActionsPerSecond = i2903[4]
  i2902.m_RepeatDelay = i2903[5]
  i2902.m_ForceModuleActive = !!i2903[6]
  i2902.m_SendPointerHoverToParent = !!i2903[7]
  return i2902
}

Deserializers["PlayableCameraDrag"] = function (request, data, root) {
  var i2904 = root || request.c( 'PlayableCameraDrag' )
  var i2905 = data
  request.r(i2905[0], i2905[1], 0, i2904, 'cameraController')
  return i2904
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i2906 = root || request.c( 'PlayableJoystick' )
  var i2907 = data
  request.r(i2907[0], i2907[1], 0, i2906, 'knob')
  return i2906
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i2908 = root || request.c( 'UnityEngine.UI.Outline' )
  var i2909 = data
  i2908.m_EffectColor = new pc.Color(i2909[0], i2909[1], i2909[2], i2909[3])
  i2908.m_EffectDistance = new pc.Vec2( i2909[4], i2909[5] )
  i2908.m_UseGraphicAlpha = !!i2909[6]
  return i2908
}

Deserializers["TapHintView"] = function (request, data, root) {
  var i2910 = root || request.c( 'TapHintView' )
  var i2911 = data
  request.r(i2911[0], i2911[1], 0, i2910, 'hand')
  request.r(i2911[2], i2911[3], 0, i2910, 'shine')
  request.r(i2911[4], i2911[5], 0, i2910, 'shineGraphic')
  return i2910
}

Deserializers["LunaController"] = function (request, data, root) {
  var i2912 = root || request.c( 'LunaController' )
  var i2913 = data
  i2912.LimitTimePlay = !!i2913[0]
  i2912.TimePlay = i2913[1]
  request.r(i2913[2], i2913[3], 0, i2912, 'BGM')
  i2912.LimitCountClick = !!i2913[4]
  i2912.MaxCountClick = i2913[5]
  i2912.LimitCountSteal = !!i2913[6]
  i2912.MaxCountSteal = i2913[7]
  i2912.LimitCountIncubate = !!i2913[8]
  i2912.MaxCountIncubate = i2913[9]
  i2912.LimitCountHatch = !!i2913[10]
  i2912.MaxCountHatch = i2913[11]
  request.r(i2913[12], i2913[13], 0, i2912, 'musicSource')
  var i2915 = i2913[14]
  var i2914 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i2915.length; i += 2) {
  request.r(i2915[i + 0], i2915[i + 1], 1, i2914, '')
  }
  i2912.CTA = i2914
  request.r(i2913[15], i2913[16], 0, i2912, 'endCard')
  return i2912
}

Deserializers["IconAmountView"] = function (request, data, root) {
  var i2918 = root || request.c( 'IconAmountView' )
  var i2919 = data
  request.r(i2919[0], i2919[1], 0, i2918, 'icon')
  request.r(i2919[2], i2919[3], 0, i2918, 'amount')
  return i2918
}

Deserializers["PlayableHoldButton"] = function (request, data, root) {
  var i2920 = root || request.c( 'PlayableHoldButton' )
  var i2921 = data
  i2920.duration = i2921[0]
  request.r(i2921[1], i2921[2], 0, i2920, 'fill')
  i2920.onHold = request.d('System.Action', i2921[3], i2920.onHold)
  return i2920
}

Deserializers["System.Action"] = function (request, data, root) {
  var i2922 = root || request.c( 'System.Action' )
  var i2923 = data
  return i2922
}

Deserializers["PetRowView"] = function (request, data, root) {
  var i2924 = root || request.c( 'PetRowView' )
  var i2925 = data
  request.r(i2925[0], i2925[1], 0, i2924, 'content')
  request.r(i2925[2], i2925[3], 0, i2924, 'thumbnail')
  request.r(i2925[4], i2925[5], 0, i2924, 'unequip')
  return i2924
}

Deserializers["IncubateRowView"] = function (request, data, root) {
  var i2926 = root || request.c( 'IncubateRowView' )
  var i2927 = data
  request.r(i2927[0], i2927[1], 0, i2926, 'thumbnail')
  request.r(i2927[2], i2927[3], 0, i2926, 'progressFill')
  request.r(i2927[4], i2927[5], 0, i2926, 'content')
  request.r(i2927[6], i2927[7], 0, i2926, 'open')
  request.r(i2927[8], i2927[9], 0, i2926, 'opening')
  return i2926
}

Deserializers["BagCellView"] = function (request, data, root) {
  var i2928 = root || request.c( 'BagCellView' )
  var i2929 = data
  request.r(i2929[0], i2929[1], 0, i2928, 'button')
  request.r(i2929[2], i2929[3], 0, i2928, 'thumbnail')
  request.r(i2929[4], i2929[5], 0, i2928, 'highlight')
  request.r(i2929[6], i2929[7], 0, i2928, 'exposeMark')
  request.r(i2929[8], i2929[9], 0, i2928, 'amount')
  return i2928
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i2930 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i2931 = data
  i2930.m_Spacing = i2931[0]
  i2930.m_ChildForceExpandWidth = !!i2931[1]
  i2930.m_ChildForceExpandHeight = !!i2931[2]
  i2930.m_ChildControlWidth = !!i2931[3]
  i2930.m_ChildControlHeight = !!i2931[4]
  i2930.m_ChildScaleWidth = !!i2931[5]
  i2930.m_ChildScaleHeight = !!i2931[6]
  i2930.m_ReverseArrangement = !!i2931[7]
  i2930.m_Padding = UnityEngine.RectOffset.FromPaddings(i2931[8], i2931[9], i2931[10], i2931[11])
  i2930.m_ChildAlignment = i2931[12]
  return i2930
}

Deserializers["QuickSlotView"] = function (request, data, root) {
  var i2932 = root || request.c( 'QuickSlotView' )
  var i2933 = data
  request.r(i2933[0], i2933[1], 0, i2932, 'button')
  request.r(i2933[2], i2933[3], 0, i2932, 'thumbnail')
  request.r(i2933[4], i2933[5], 0, i2932, 'highlight')
  request.r(i2933[6], i2933[7], 0, i2932, 'content')
  return i2932
}

Deserializers["IndexZoneView"] = function (request, data, root) {
  var i2934 = root || request.c( 'IndexZoneView' )
  var i2935 = data
  request.r(i2935[0], i2935[1], 0, i2934, 'zoneName')
  request.r(i2935[2], i2935[3], 0, i2934, 'progress')
  request.r(i2935[4], i2935[5], 0, i2934, 'thumbnail')
  request.r(i2935[6], i2935[7], 0, i2934, 'progressFill')
  request.r(i2935[8], i2935[9], 0, i2934, 'petContent')
  request.r(i2935[10], i2935[11], 0, i2934, 'petTemplate')
  return i2934
}

Deserializers["IndexPetCellView"] = function (request, data, root) {
  var i2936 = root || request.c( 'IndexPetCellView' )
  var i2937 = data
  request.r(i2937[0], i2937[1], 0, i2936, 'button')
  request.r(i2937[2], i2937[3], 0, i2936, 'frame')
  request.r(i2937[4], i2937[5], 0, i2936, 'thumbnail')
  request.r(i2937[6], i2937[7], 0, i2936, 'petName')
  request.r(i2937[8], i2937[9], 0, i2936, 'selected')
  request.r(i2937[10], i2937[11], 0, i2936, 'mark')
  return i2936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2939 = data
  i2938.aspect = i2939[0]
  i2938.orthographic = !!i2939[1]
  i2938.orthographicSize = i2939[2]
  i2938.backgroundColor = new pc.Color(i2939[3], i2939[4], i2939[5], i2939[6])
  i2938.nearClipPlane = i2939[7]
  i2938.farClipPlane = i2939[8]
  i2938.fieldOfView = i2939[9]
  i2938.depth = i2939[10]
  i2938.clearFlags = i2939[11]
  i2938.cullingMask = i2939[12]
  i2938.rect = i2939[13]
  request.r(i2939[14], i2939[15], 0, i2938, 'targetTexture')
  i2938.usePhysicalProperties = !!i2939[16]
  i2938.focalLength = i2939[17]
  i2938.sensorSize = new pc.Vec2( i2939[18], i2939[19] )
  i2938.lensShift = new pc.Vec2( i2939[20], i2939[21] )
  i2938.gateFit = i2939[22]
  i2938.commandBufferCount = i2939[23]
  i2938.cameraType = i2939[24]
  i2938.enabled = !!i2939[25]
  return i2938
}

Deserializers["CameraController"] = function (request, data, root) {
  var i2940 = root || request.c( 'CameraController' )
  var i2941 = data
  request.r(i2941[0], i2941[1], 0, i2940, 'target')
  request.r(i2941[2], i2941[3], 0, i2940, 'controlledCamera')
  request.r(i2941[4], i2941[5], 0, i2940, 'cameraManager')
  request.r(i2941[6], i2941[7], 0, i2940, 'game')
  i2940.distance = i2941[8]
  i2940.initialVerticalAngle = i2941[9]
  i2940.initialHorizontalAngle = i2941[10]
  return i2940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2943 = data
  i2942.ambientIntensity = i2943[0]
  i2942.reflectionIntensity = i2943[1]
  i2942.ambientMode = i2943[2]
  i2942.ambientLight = new pc.Color(i2943[3], i2943[4], i2943[5], i2943[6])
  i2942.ambientSkyColor = new pc.Color(i2943[7], i2943[8], i2943[9], i2943[10])
  i2942.ambientGroundColor = new pc.Color(i2943[11], i2943[12], i2943[13], i2943[14])
  i2942.ambientEquatorColor = new pc.Color(i2943[15], i2943[16], i2943[17], i2943[18])
  i2942.fogColor = new pc.Color(i2943[19], i2943[20], i2943[21], i2943[22])
  i2942.fogEndDistance = i2943[23]
  i2942.fogStartDistance = i2943[24]
  i2942.fogDensity = i2943[25]
  i2942.fog = !!i2943[26]
  request.r(i2943[27], i2943[28], 0, i2942, 'skybox')
  i2942.fogMode = i2943[29]
  var i2945 = i2943[30]
  var i2944 = []
  for(var i = 0; i < i2945.length; i += 1) {
    i2944.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2945[i + 0]) );
  }
  i2942.lightmaps = i2944
  i2942.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2943[31], i2942.lightProbes)
  i2942.lightmapsMode = i2943[32]
  i2942.mixedBakeMode = i2943[33]
  i2942.environmentLightingMode = i2943[34]
  i2942.ambientProbe = new pc.SphericalHarmonicsL2(i2943[35])
  request.r(i2943[36], i2943[37], 0, i2942, 'customReflection')
  request.r(i2943[38], i2943[39], 0, i2942, 'defaultReflection')
  i2942.defaultReflectionMode = i2943[40]
  i2942.defaultReflectionResolution = i2943[41]
  i2942.sunLightObjectId = i2943[42]
  i2942.pixelLightCount = i2943[43]
  i2942.defaultReflectionHDR = !!i2943[44]
  i2942.hasLightDataAsset = !!i2943[45]
  i2942.hasManualGenerate = !!i2943[46]
  return i2942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2949 = data
  request.r(i2949[0], i2949[1], 0, i2948, 'lightmapColor')
  request.r(i2949[2], i2949[3], 0, i2948, 'lightmapDirection')
  request.r(i2949[4], i2949[5], 0, i2948, 'shadowMask')
  return i2948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2950 = root || new UnityEngine.LightProbes()
  var i2951 = data
  return i2950
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2957 = data
  var i2959 = i2957[0]
  var i2958 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2959.length; i += 1) {
    i2958.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2959[i + 0]));
  }
  i2956.ShaderCompilationErrors = i2958
  i2956.name = i2957[1]
  i2956.guid = i2957[2]
  var i2961 = i2957[3]
  var i2960 = []
  for(var i = 0; i < i2961.length; i += 1) {
    i2960.push( i2961[i + 0] );
  }
  i2956.shaderDefinedKeywords = i2960
  var i2963 = i2957[4]
  var i2962 = []
  for(var i = 0; i < i2963.length; i += 1) {
    i2962.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2963[i + 0]) );
  }
  i2956.passes = i2962
  var i2965 = i2957[5]
  var i2964 = []
  for(var i = 0; i < i2965.length; i += 1) {
    i2964.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2965[i + 0]) );
  }
  i2956.usePasses = i2964
  var i2967 = i2957[6]
  var i2966 = []
  for(var i = 0; i < i2967.length; i += 1) {
    i2966.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2967[i + 0]) );
  }
  i2956.defaultParameterValues = i2966
  request.r(i2957[7], i2957[8], 0, i2956, 'unityFallbackShader')
  i2956.readDepth = !!i2957[9]
  i2956.hasDepthOnlyPass = !!i2957[10]
  i2956.isCreatedByShaderGraph = !!i2957[11]
  i2956.disableBatching = !!i2957[12]
  i2956.compiled = !!i2957[13]
  return i2956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2970 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2971 = data
  i2970.shaderName = i2971[0]
  i2970.errorMessage = i2971[1]
  return i2970
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2976 = root || new pc.UnityShaderPass()
  var i2977 = data
  i2976.id = i2977[0]
  i2976.subShaderIndex = i2977[1]
  i2976.name = i2977[2]
  i2976.passType = i2977[3]
  i2976.grabPassTextureName = i2977[4]
  i2976.usePass = !!i2977[5]
  i2976.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[6], i2976.zTest)
  i2976.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[7], i2976.zWrite)
  i2976.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[8], i2976.culling)
  i2976.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2977[9], i2976.blending)
  i2976.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2977[10], i2976.alphaBlending)
  i2976.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[11], i2976.colorWriteMask)
  i2976.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[12], i2976.offsetUnits)
  i2976.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[13], i2976.offsetFactor)
  i2976.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[14], i2976.stencilRef)
  i2976.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[15], i2976.stencilReadMask)
  i2976.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2977[16], i2976.stencilWriteMask)
  i2976.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2977[17], i2976.stencilOp)
  i2976.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2977[18], i2976.stencilOpFront)
  i2976.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2977[19], i2976.stencilOpBack)
  var i2979 = i2977[20]
  var i2978 = []
  for(var i = 0; i < i2979.length; i += 1) {
    i2978.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2979[i + 0]) );
  }
  i2976.tags = i2978
  var i2981 = i2977[21]
  var i2980 = []
  for(var i = 0; i < i2981.length; i += 1) {
    i2980.push( i2981[i + 0] );
  }
  i2976.passDefinedKeywords = i2980
  var i2983 = i2977[22]
  var i2982 = []
  for(var i = 0; i < i2983.length; i += 1) {
    i2982.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2983[i + 0]) );
  }
  i2976.passDefinedKeywordGroups = i2982
  var i2985 = i2977[23]
  var i2984 = []
  for(var i = 0; i < i2985.length; i += 1) {
    i2984.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2985[i + 0]) );
  }
  i2976.variants = i2984
  var i2987 = i2977[24]
  var i2986 = []
  for(var i = 0; i < i2987.length; i += 1) {
    i2986.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2987[i + 0]) );
  }
  i2976.excludedVariants = i2986
  i2976.hasDepthReader = !!i2977[25]
  return i2976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2989 = data
  i2988.val = i2989[0]
  i2988.name = i2989[1]
  return i2988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2991 = data
  i2990.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2991[0], i2990.src)
  i2990.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2991[1], i2990.dst)
  i2990.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2991[2], i2990.op)
  return i2990
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2993 = data
  i2992.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2993[0], i2992.pass)
  i2992.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2993[1], i2992.fail)
  i2992.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2993[2], i2992.zFail)
  i2992.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2993[3], i2992.comp)
  return i2992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2997 = data
  i2996.name = i2997[0]
  i2996.value = i2997[1]
  return i2996
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i3000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i3001 = data
  var i3003 = i3001[0]
  var i3002 = []
  for(var i = 0; i < i3003.length; i += 1) {
    i3002.push( i3003[i + 0] );
  }
  i3000.keywords = i3002
  i3000.hasDiscard = !!i3001[1]
  return i3000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i3006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i3007 = data
  i3006.passId = i3007[0]
  i3006.subShaderIndex = i3007[1]
  var i3009 = i3007[2]
  var i3008 = []
  for(var i = 0; i < i3009.length; i += 1) {
    i3008.push( i3009[i + 0] );
  }
  i3006.keywords = i3008
  i3006.vertexProgram = i3007[3]
  i3006.fragmentProgram = i3007[4]
  i3006.exportedForWebGl2 = !!i3007[5]
  i3006.readDepth = !!i3007[6]
  return i3006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i3012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i3013 = data
  request.r(i3013[0], i3013[1], 0, i3012, 'shader')
  i3012.pass = i3013[2]
  return i3012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i3016 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i3017 = data
  i3016.name = i3017[0]
  i3016.type = i3017[1]
  i3016.value = new pc.Vec4( i3017[2], i3017[3], i3017[4], i3017[5] )
  i3016.textureValue = i3017[6]
  i3016.shaderPropertyFlag = i3017[7]
  return i3016
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i3018 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i3019 = data
  i3018.name = i3019[0]
  request.r(i3019[1], i3019[2], 0, i3018, 'texture')
  i3018.aabb = i3019[3]
  i3018.vertices = i3019[4]
  i3018.triangles = i3019[5]
  i3018.textureRect = UnityEngine.Rect.MinMaxRect(i3019[6], i3019[7], i3019[8], i3019[9])
  i3018.packedRect = UnityEngine.Rect.MinMaxRect(i3019[10], i3019[11], i3019[12], i3019[13])
  i3018.border = new pc.Vec4( i3019[14], i3019[15], i3019[16], i3019[17] )
  i3018.transparency = i3019[18]
  i3018.bounds = i3019[19]
  i3018.pixelsPerUnit = i3019[20]
  i3018.textureWidth = i3019[21]
  i3018.textureHeight = i3019[22]
  i3018.nativeSize = new pc.Vec2( i3019[23], i3019[24] )
  i3018.pivot = new pc.Vec2( i3019[25], i3019[26] )
  i3018.textureRectOffset = new pc.Vec2( i3019[27], i3019[28] )
  return i3018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i3020 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i3021 = data
  i3020.name = i3021[0]
  return i3020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i3022 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i3023 = data
  i3022.name = i3023[0]
  i3022.wrapMode = i3023[1]
  i3022.isLooping = !!i3023[2]
  i3022.length = i3023[3]
  var i3025 = i3023[4]
  var i3024 = []
  for(var i = 0; i < i3025.length; i += 1) {
    i3024.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i3025[i + 0]) );
  }
  i3022.curves = i3024
  var i3027 = i3023[5]
  var i3026 = []
  for(var i = 0; i < i3027.length; i += 1) {
    i3026.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i3027[i + 0]) );
  }
  i3022.events = i3026
  i3022.halfPrecision = !!i3023[6]
  i3022._frameRate = i3023[7]
  i3022.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i3023[8], i3022.localBounds)
  i3022.hasMuscleCurves = !!i3023[9]
  var i3029 = i3023[10]
  var i3028 = []
  for(var i = 0; i < i3029.length; i += 1) {
    i3028.push( i3029[i + 0] );
  }
  i3022.clipMuscleConstant = i3028
  i3022.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i3023[11], i3022.clipBindingConstant)
  return i3022
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i3032 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i3033 = data
  i3032.path = i3033[0]
  i3032.hash = i3033[1]
  i3032.componentType = i3033[2]
  i3032.property = i3033[3]
  i3032.keys = i3033[4]
  var i3035 = i3033[5]
  var i3034 = []
  for(var i = 0; i < i3035.length; i += 1) {
    i3034.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i3035[i + 0]) );
  }
  i3032.objectReferenceKeys = i3034
  return i3032
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i3038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i3039 = data
  i3038.time = i3039[0]
  request.r(i3039[1], i3039[2], 0, i3038, 'value')
  return i3038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i3042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i3043 = data
  i3042.functionName = i3043[0]
  i3042.floatParameter = i3043[1]
  i3042.intParameter = i3043[2]
  i3042.stringParameter = i3043[3]
  request.r(i3043[4], i3043[5], 0, i3042, 'objectReferenceParameter')
  i3042.time = i3043[6]
  return i3042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i3044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i3045 = data
  i3044.center = new pc.Vec3( i3045[0], i3045[1], i3045[2] )
  i3044.extends = new pc.Vec3( i3045[3], i3045[4], i3045[5] )
  return i3044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i3048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i3049 = data
  var i3051 = i3049[0]
  var i3050 = []
  for(var i = 0; i < i3051.length; i += 1) {
    i3050.push( i3051[i + 0] );
  }
  i3048.genericBindings = i3050
  var i3053 = i3049[1]
  var i3052 = []
  for(var i = 0; i < i3053.length; i += 1) {
    i3052.push( i3053[i + 0] );
  }
  i3048.pptrCurveMapping = i3052
  return i3048
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i3054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i3055 = data
  i3054.name = i3055[0]
  i3054.ascent = i3055[1]
  i3054.originalLineHeight = i3055[2]
  i3054.fontSize = i3055[3]
  var i3057 = i3055[4]
  var i3056 = []
  for(var i = 0; i < i3057.length; i += 1) {
    i3056.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i3057[i + 0]) );
  }
  i3054.characterInfo = i3056
  request.r(i3055[5], i3055[6], 0, i3054, 'texture')
  i3054.originalFontSize = i3055[7]
  return i3054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i3060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i3061 = data
  i3060.index = i3061[0]
  i3060.advance = i3061[1]
  i3060.bearing = i3061[2]
  i3060.glyphWidth = i3061[3]
  i3060.glyphHeight = i3061[4]
  i3060.minX = i3061[5]
  i3060.maxX = i3061[6]
  i3060.minY = i3061[7]
  i3060.maxY = i3061[8]
  i3060.uvBottomLeftX = i3061[9]
  i3060.uvBottomLeftY = i3061[10]
  i3060.uvBottomRightX = i3061[11]
  i3060.uvBottomRightY = i3061[12]
  i3060.uvTopLeftX = i3061[13]
  i3060.uvTopLeftY = i3061[14]
  i3060.uvTopRightX = i3061[15]
  i3060.uvTopRightY = i3061[16]
  return i3060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i3062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i3063 = data
  i3062.name = i3063[0]
  var i3065 = i3063[1]
  var i3064 = []
  for(var i = 0; i < i3065.length; i += 1) {
    i3064.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i3065[i + 0]) );
  }
  i3062.layers = i3064
  var i3067 = i3063[2]
  var i3066 = []
  for(var i = 0; i < i3067.length; i += 1) {
    i3066.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i3067[i + 0]) );
  }
  i3062.parameters = i3066
  i3062.animationClips = i3063[3]
  i3062.avatarUnsupported = i3063[4]
  return i3062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i3070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i3071 = data
  i3070.name = i3071[0]
  i3070.defaultWeight = i3071[1]
  i3070.blendingMode = i3071[2]
  i3070.avatarMask = i3071[3]
  i3070.syncedLayerIndex = i3071[4]
  i3070.syncedLayerAffectsTiming = !!i3071[5]
  i3070.syncedLayers = i3071[6]
  i3070.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i3071[7], i3070.stateMachine)
  return i3070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i3072 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i3073 = data
  i3072.id = i3073[0]
  i3072.name = i3073[1]
  i3072.path = i3073[2]
  var i3075 = i3073[3]
  var i3074 = []
  for(var i = 0; i < i3075.length; i += 1) {
    i3074.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i3075[i + 0]) );
  }
  i3072.states = i3074
  var i3077 = i3073[4]
  var i3076 = []
  for(var i = 0; i < i3077.length; i += 1) {
    i3076.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i3077[i + 0]) );
  }
  i3072.machines = i3076
  var i3079 = i3073[5]
  var i3078 = []
  for(var i = 0; i < i3079.length; i += 1) {
    i3078.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i3079[i + 0]) );
  }
  i3072.entryStateTransitions = i3078
  var i3081 = i3073[6]
  var i3080 = []
  for(var i = 0; i < i3081.length; i += 1) {
    i3080.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i3081[i + 0]) );
  }
  i3072.exitStateTransitions = i3080
  var i3083 = i3073[7]
  var i3082 = []
  for(var i = 0; i < i3083.length; i += 1) {
    i3082.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i3083[i + 0]) );
  }
  i3072.anyStateTransitions = i3082
  i3072.defaultStateId = i3073[8]
  return i3072
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i3086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i3087 = data
  i3086.id = i3087[0]
  i3086.name = i3087[1]
  i3086.cycleOffset = i3087[2]
  i3086.cycleOffsetParameter = i3087[3]
  i3086.cycleOffsetParameterActive = !!i3087[4]
  i3086.mirror = !!i3087[5]
  i3086.mirrorParameter = i3087[6]
  i3086.mirrorParameterActive = !!i3087[7]
  i3086.motionId = i3087[8]
  i3086.nameHash = i3087[9]
  i3086.fullPathHash = i3087[10]
  i3086.speed = i3087[11]
  i3086.speedParameter = i3087[12]
  i3086.speedParameterActive = !!i3087[13]
  i3086.tag = i3087[14]
  i3086.tagHash = i3087[15]
  i3086.writeDefaultValues = !!i3087[16]
  var i3089 = i3087[17]
  var i3088 = []
  for(var i = 0; i < i3089.length; i += 2) {
  request.r(i3089[i + 0], i3089[i + 1], 2, i3088, '')
  }
  i3086.behaviours = i3088
  var i3091 = i3087[18]
  var i3090 = []
  for(var i = 0; i < i3091.length; i += 1) {
    i3090.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i3091[i + 0]) );
  }
  i3086.transitions = i3090
  return i3086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i3096 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i3097 = data
  i3096.fullPath = i3097[0]
  i3096.canTransitionToSelf = !!i3097[1]
  i3096.duration = i3097[2]
  i3096.exitTime = i3097[3]
  i3096.hasExitTime = !!i3097[4]
  i3096.hasFixedDuration = !!i3097[5]
  i3096.interruptionSource = i3097[6]
  i3096.offset = i3097[7]
  i3096.orderedInterruption = !!i3097[8]
  i3096.destinationStateId = i3097[9]
  i3096.isExit = !!i3097[10]
  i3096.mute = !!i3097[11]
  i3096.solo = !!i3097[12]
  var i3099 = i3097[13]
  var i3098 = []
  for(var i = 0; i < i3099.length; i += 1) {
    i3098.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i3099[i + 0]) );
  }
  i3096.conditions = i3098
  return i3096
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i3102 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i3103 = data
  i3102.mode = i3103[0]
  i3102.parameter = i3103[1]
  i3102.threshold = i3103[2]
  return i3102
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i3108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i3109 = data
  i3108.destinationStateId = i3109[0]
  i3108.isExit = !!i3109[1]
  i3108.mute = !!i3109[2]
  i3108.solo = !!i3109[3]
  var i3111 = i3109[4]
  var i3110 = []
  for(var i = 0; i < i3111.length; i += 1) {
    i3110.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i3111[i + 0]) );
  }
  i3108.conditions = i3110
  return i3108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i3114 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i3115 = data
  i3114.defaultBool = !!i3115[0]
  i3114.defaultFloat = i3115[1]
  i3114.defaultInt = i3115[2]
  i3114.name = i3115[3]
  i3114.nameHash = i3115[4]
  i3114.type = i3115[5]
  return i3114
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController"] = function (request, data, root) {
  var i3116 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController' )
  var i3117 = data
  i3116.name = i3117[0]
  request.r(i3117[1], i3117[2], 0, i3116, '_runtimeAnimatorController')
  var i3119 = i3117[3]
  var i3118 = []
  for(var i = 0; i < i3119.length; i += 2) {
  request.r(i3119[i + 0], i3119[i + 1], 2, i3118, '')
  }
  i3116._originalAnimationClips = i3118
  var i3121 = i3117[4]
  var i3120 = []
  for(var i = 0; i < i3121.length; i += 2) {
  request.r(i3121[i + 0], i3121[i + 1], 2, i3120, '')
  }
  i3116._overrideAnimationClips = i3120
  var i3123 = i3117[5]
  var i3122 = []
  for(var i = 0; i < i3123.length; i += 2) {
  request.r(i3123[i + 0], i3123[i + 1], 2, i3122, '')
  }
  i3116._animationClips = i3122
  var i3125 = i3117[6]
  var i3124 = []
  for(var i = 0; i < i3125.length; i += 1) {
    i3124.push( request.d('UnityEngine.AnimationClipPair', i3125[i + 0]) );
  }
  i3116._animationClipPairs = i3124
  return i3116
}

Deserializers["UnityEngine.AnimationClipPair"] = function (request, data, root) {
  var i3130 = root || request.c( 'UnityEngine.AnimationClipPair' )
  var i3131 = data
  request.r(i3131[0], i3131[1], 0, i3130, 'originalClip')
  request.r(i3131[2], i3131[3], 0, i3130, 'overrideClip')
  return i3130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i3132 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i3133 = data
  i3132.name = i3133[0]
  i3132.bytes64 = i3133[1]
  i3132.data = i3133[2]
  return i3132
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i3134 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i3135 = data
  i3134.normalStyle = i3135[0]
  i3134.normalSpacingOffset = i3135[1]
  i3134.boldStyle = i3135[2]
  i3134.boldSpacing = i3135[3]
  i3134.italicStyle = i3135[4]
  i3134.tabSize = i3135[5]
  request.r(i3135[6], i3135[7], 0, i3134, 'atlas')
  i3134.m_SourceFontFileGUID = i3135[8]
  i3134.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i3135[9], i3134.m_CreationSettings)
  request.r(i3135[10], i3135[11], 0, i3134, 'm_SourceFontFile')
  i3134.m_SourceFontFilePath = i3135[12]
  i3134.m_AtlasPopulationMode = i3135[13]
  i3134.InternalDynamicOS = !!i3135[14]
  var i3137 = i3135[15]
  var i3136 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i3137.length; i += 1) {
    i3136.add(request.d('UnityEngine.TextCore.Glyph', i3137[i + 0]));
  }
  i3134.m_GlyphTable = i3136
  var i3139 = i3135[16]
  var i3138 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i3139.length; i += 1) {
    i3138.add(request.d('TMPro.TMP_Character', i3139[i + 0]));
  }
  i3134.m_CharacterTable = i3138
  var i3141 = i3135[17]
  var i3140 = []
  for(var i = 0; i < i3141.length; i += 2) {
  request.r(i3141[i + 0], i3141[i + 1], 2, i3140, '')
  }
  i3134.m_AtlasTextures = i3140
  i3134.m_AtlasTextureIndex = i3135[18]
  i3134.m_IsMultiAtlasTexturesEnabled = !!i3135[19]
  i3134.m_GetFontFeatures = !!i3135[20]
  i3134.m_ClearDynamicDataOnBuild = !!i3135[21]
  i3134.m_AtlasWidth = i3135[22]
  i3134.m_AtlasHeight = i3135[23]
  i3134.m_AtlasPadding = i3135[24]
  i3134.m_AtlasRenderMode = i3135[25]
  var i3143 = i3135[26]
  var i3142 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i3143.length; i += 1) {
    i3142.add(request.d('UnityEngine.TextCore.GlyphRect', i3143[i + 0]));
  }
  i3134.m_UsedGlyphRects = i3142
  var i3145 = i3135[27]
  var i3144 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i3145.length; i += 1) {
    i3144.add(request.d('UnityEngine.TextCore.GlyphRect', i3145[i + 0]));
  }
  i3134.m_FreeGlyphRects = i3144
  i3134.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i3135[28], i3134.m_FontFeatureTable)
  i3134.m_ShouldReimportFontFeatures = !!i3135[29]
  var i3147 = i3135[30]
  var i3146 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i3147.length; i += 2) {
  request.r(i3147[i + 0], i3147[i + 1], 1, i3146, '')
  }
  i3134.m_FallbackFontAssetTable = i3146
  var i3149 = i3135[31]
  var i3148 = []
  for(var i = 0; i < i3149.length; i += 1) {
    i3148.push( request.d('TMPro.TMP_FontWeightPair', i3149[i + 0]) );
  }
  i3134.m_FontWeightTable = i3148
  var i3151 = i3135[32]
  var i3150 = []
  for(var i = 0; i < i3151.length; i += 1) {
    i3150.push( request.d('TMPro.TMP_FontWeightPair', i3151[i + 0]) );
  }
  i3134.fontWeights = i3150
  i3134.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i3135[33], i3134.m_fontInfo)
  var i3153 = i3135[34]
  var i3152 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i3153.length; i += 1) {
    i3152.add(request.d('TMPro.TMP_Glyph', i3153[i + 0]));
  }
  i3134.m_glyphInfoList = i3152
  i3134.m_KerningTable = request.d('TMPro.KerningTable', i3135[35], i3134.m_KerningTable)
  var i3155 = i3135[36]
  var i3154 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i3155.length; i += 2) {
  request.r(i3155[i + 0], i3155[i + 1], 1, i3154, '')
  }
  i3134.fallbackFontAssets = i3154
  i3134.m_Version = i3135[37]
  i3134.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i3135[38], i3134.m_FaceInfo)
  request.r(i3135[39], i3135[40], 0, i3134, 'm_Material')
  return i3134
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i3156 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i3157 = data
  i3156.sourceFontFileName = i3157[0]
  i3156.sourceFontFileGUID = i3157[1]
  i3156.faceIndex = i3157[2]
  i3156.pointSizeSamplingMode = i3157[3]
  i3156.pointSize = i3157[4]
  i3156.padding = i3157[5]
  i3156.paddingMode = i3157[6]
  i3156.packingMode = i3157[7]
  i3156.atlasWidth = i3157[8]
  i3156.atlasHeight = i3157[9]
  i3156.characterSetSelectionMode = i3157[10]
  i3156.characterSequence = i3157[11]
  i3156.referencedFontAssetGUID = i3157[12]
  i3156.referencedTextAssetGUID = i3157[13]
  i3156.fontStyle = i3157[14]
  i3156.fontStyleModifier = i3157[15]
  i3156.renderMode = i3157[16]
  i3156.includeFontFeatures = !!i3157[17]
  return i3156
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i3160 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i3161 = data
  i3160.m_Index = i3161[0]
  i3160.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i3161[1], i3160.m_Metrics)
  i3160.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i3161[2], i3160.m_GlyphRect)
  i3160.m_Scale = i3161[3]
  i3160.m_AtlasIndex = i3161[4]
  i3160.m_ClassDefinitionType = i3161[5]
  return i3160
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i3162 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i3163 = data
  i3162.m_Width = i3163[0]
  i3162.m_Height = i3163[1]
  i3162.m_HorizontalBearingX = i3163[2]
  i3162.m_HorizontalBearingY = i3163[3]
  i3162.m_HorizontalAdvance = i3163[4]
  return i3162
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i3164 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i3165 = data
  i3164.m_X = i3165[0]
  i3164.m_Y = i3165[1]
  i3164.m_Width = i3165[2]
  i3164.m_Height = i3165[3]
  return i3164
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i3168 = root || request.c( 'TMPro.TMP_Character' )
  var i3169 = data
  i3168.m_ElementType = i3169[0]
  i3168.m_Unicode = i3169[1]
  i3168.m_GlyphIndex = i3169[2]
  i3168.m_Scale = i3169[3]
  return i3168
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i3174 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i3175 = data
  var i3177 = i3175[0]
  var i3176 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i3177.length; i += 1) {
    i3176.add(request.d('TMPro.MultipleSubstitutionRecord', i3177[i + 0]));
  }
  i3174.m_MultipleSubstitutionRecords = i3176
  var i3179 = i3175[1]
  var i3178 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i3179.length; i += 1) {
    i3178.add(request.d('TMPro.LigatureSubstitutionRecord', i3179[i + 0]));
  }
  i3174.m_LigatureSubstitutionRecords = i3178
  var i3181 = i3175[2]
  var i3180 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i3181.length; i += 1) {
    i3180.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i3181[i + 0]));
  }
  i3174.m_GlyphPairAdjustmentRecords = i3180
  var i3183 = i3175[3]
  var i3182 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i3183.length; i += 1) {
    i3182.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i3183[i + 0]));
  }
  i3174.m_MarkToBaseAdjustmentRecords = i3182
  var i3185 = i3175[4]
  var i3184 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i3185.length; i += 1) {
    i3184.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i3185[i + 0]));
  }
  i3174.m_MarkToMarkAdjustmentRecords = i3184
  return i3174
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i3188 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i3189 = data
  i3188.m_TargetGlyphID = i3189[0]
  i3188.m_SubstituteGlyphIDs = i3189[1]
  return i3188
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i3192 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i3193 = data
  i3192.m_ComponentGlyphIDs = i3193[0]
  i3192.m_LigatureGlyphID = i3193[1]
  return i3192
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i3196 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i3197 = data
  i3196.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i3197[0], i3196.m_FirstAdjustmentRecord)
  i3196.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i3197[1], i3196.m_SecondAdjustmentRecord)
  i3196.m_FeatureLookupFlags = i3197[2]
  return i3196
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i3198 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i3199 = data
  i3198.m_GlyphIndex = i3199[0]
  i3198.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i3199[1], i3198.m_GlyphValueRecord)
  return i3198
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i3200 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i3201 = data
  i3200.m_XPlacement = i3201[0]
  i3200.m_YPlacement = i3201[1]
  i3200.m_XAdvance = i3201[2]
  i3200.m_YAdvance = i3201[3]
  return i3200
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i3204 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i3205 = data
  i3204.m_BaseGlyphID = i3205[0]
  i3204.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i3205[1], i3204.m_BaseGlyphAnchorPoint)
  i3204.m_MarkGlyphID = i3205[2]
  i3204.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i3205[3], i3204.m_MarkPositionAdjustment)
  return i3204
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i3206 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i3207 = data
  i3206.m_XCoordinate = i3207[0]
  i3206.m_YCoordinate = i3207[1]
  return i3206
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i3208 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i3209 = data
  i3208.m_XPositionAdjustment = i3209[0]
  i3208.m_YPositionAdjustment = i3209[1]
  return i3208
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i3212 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i3213 = data
  i3212.m_BaseMarkGlyphID = i3213[0]
  i3212.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i3213[1], i3212.m_BaseMarkGlyphAnchorPoint)
  i3212.m_CombiningMarkGlyphID = i3213[2]
  i3212.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i3213[3], i3212.m_CombiningMarkPositionAdjustment)
  return i3212
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i3218 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i3219 = data
  request.r(i3219[0], i3219[1], 0, i3218, 'regularTypeface')
  request.r(i3219[2], i3219[3], 0, i3218, 'italicTypeface')
  return i3218
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i3220 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i3221 = data
  i3220.Name = i3221[0]
  i3220.PointSize = i3221[1]
  i3220.Scale = i3221[2]
  i3220.CharacterCount = i3221[3]
  i3220.LineHeight = i3221[4]
  i3220.Baseline = i3221[5]
  i3220.Ascender = i3221[6]
  i3220.CapHeight = i3221[7]
  i3220.Descender = i3221[8]
  i3220.CenterLine = i3221[9]
  i3220.SuperscriptOffset = i3221[10]
  i3220.SubscriptOffset = i3221[11]
  i3220.SubSize = i3221[12]
  i3220.Underline = i3221[13]
  i3220.UnderlineThickness = i3221[14]
  i3220.strikethrough = i3221[15]
  i3220.strikethroughThickness = i3221[16]
  i3220.TabWidth = i3221[17]
  i3220.Padding = i3221[18]
  i3220.AtlasWidth = i3221[19]
  i3220.AtlasHeight = i3221[20]
  return i3220
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i3224 = root || request.c( 'TMPro.TMP_Glyph' )
  var i3225 = data
  i3224.id = i3225[0]
  i3224.x = i3225[1]
  i3224.y = i3225[2]
  i3224.width = i3225[3]
  i3224.height = i3225[4]
  i3224.xOffset = i3225[5]
  i3224.yOffset = i3225[6]
  i3224.xAdvance = i3225[7]
  i3224.scale = i3225[8]
  return i3224
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i3226 = root || request.c( 'TMPro.KerningTable' )
  var i3227 = data
  var i3229 = i3227[0]
  var i3228 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i3229.length; i += 1) {
    i3228.add(request.d('TMPro.KerningPair', i3229[i + 0]));
  }
  i3226.kerningPairs = i3228
  return i3226
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i3232 = root || request.c( 'TMPro.KerningPair' )
  var i3233 = data
  i3232.xOffset = i3233[0]
  i3232.m_FirstGlyph = i3233[1]
  i3232.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i3233[2], i3232.m_FirstGlyphAdjustments)
  i3232.m_SecondGlyph = i3233[3]
  i3232.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i3233[4], i3232.m_SecondGlyphAdjustments)
  i3232.m_IgnoreSpacingAdjustments = !!i3233[5]
  return i3232
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i3234 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i3235 = data
  i3234.m_FaceIndex = i3235[0]
  i3234.m_FamilyName = i3235[1]
  i3234.m_StyleName = i3235[2]
  i3234.m_PointSize = i3235[3]
  i3234.m_Scale = i3235[4]
  i3234.m_UnitsPerEM = i3235[5]
  i3234.m_LineHeight = i3235[6]
  i3234.m_AscentLine = i3235[7]
  i3234.m_CapLine = i3235[8]
  i3234.m_MeanLine = i3235[9]
  i3234.m_Baseline = i3235[10]
  i3234.m_DescentLine = i3235[11]
  i3234.m_SuperscriptOffset = i3235[12]
  i3234.m_SuperscriptSize = i3235[13]
  i3234.m_SubscriptOffset = i3235[14]
  i3234.m_SubscriptSize = i3235[15]
  i3234.m_UnderlineOffset = i3235[16]
  i3234.m_UnderlineThickness = i3235[17]
  i3234.m_StrikethroughOffset = i3235[18]
  i3234.m_StrikethroughThickness = i3235[19]
  i3234.m_TabWidth = i3235[20]
  return i3234
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i3236 = root || request.c( 'TMPro.TMP_Settings' )
  var i3237 = data
  i3236.assetVersion = i3237[0]
  i3236.m_TextWrappingMode = i3237[1]
  i3236.m_enableKerning = !!i3237[2]
  var i3239 = i3237[3]
  var i3238 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i3239.length; i += 1) {
    i3238.add(i3239[i + 0]);
  }
  i3236.m_ActiveFontFeatures = i3238
  i3236.m_enableExtraPadding = !!i3237[4]
  i3236.m_enableTintAllSprites = !!i3237[5]
  i3236.m_enableParseEscapeCharacters = !!i3237[6]
  i3236.m_EnableRaycastTarget = !!i3237[7]
  i3236.m_GetFontFeaturesAtRuntime = !!i3237[8]
  i3236.m_missingGlyphCharacter = i3237[9]
  i3236.m_ClearDynamicDataOnBuild = !!i3237[10]
  i3236.m_warningsDisabled = !!i3237[11]
  request.r(i3237[12], i3237[13], 0, i3236, 'm_defaultFontAsset')
  i3236.m_defaultFontAssetPath = i3237[14]
  i3236.m_defaultFontSize = i3237[15]
  i3236.m_defaultAutoSizeMinRatio = i3237[16]
  i3236.m_defaultAutoSizeMaxRatio = i3237[17]
  i3236.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i3237[18], i3237[19] )
  i3236.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i3237[20], i3237[21] )
  i3236.m_autoSizeTextContainer = !!i3237[22]
  i3236.m_IsTextObjectScaleStatic = !!i3237[23]
  var i3241 = i3237[24]
  var i3240 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i3241.length; i += 2) {
  request.r(i3241[i + 0], i3241[i + 1], 1, i3240, '')
  }
  i3236.m_fallbackFontAssets = i3240
  i3236.m_matchMaterialPreset = !!i3237[25]
  i3236.m_HideSubTextObjects = !!i3237[26]
  request.r(i3237[27], i3237[28], 0, i3236, 'm_defaultSpriteAsset')
  i3236.m_defaultSpriteAssetPath = i3237[29]
  i3236.m_enableEmojiSupport = !!i3237[30]
  i3236.m_MissingCharacterSpriteUnicode = i3237[31]
  var i3243 = i3237[32]
  var i3242 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i3243.length; i += 2) {
  request.r(i3243[i + 0], i3243[i + 1], 1, i3242, '')
  }
  i3236.m_EmojiFallbackTextAssets = i3242
  i3236.m_defaultColorGradientPresetsPath = i3237[33]
  request.r(i3237[34], i3237[35], 0, i3236, 'm_defaultStyleSheet')
  i3236.m_StyleSheetsResourcePath = i3237[36]
  request.r(i3237[37], i3237[38], 0, i3236, 'm_leadingCharacters')
  request.r(i3237[39], i3237[40], 0, i3236, 'm_followingCharacters')
  i3236.m_UseModernHangulLineBreakingRules = !!i3237[41]
  return i3236
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i3246 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i3247 = data
  request.r(i3247[0], i3247[1], 0, i3246, 'spriteSheet')
  var i3249 = i3247[2]
  var i3248 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i3249.length; i += 1) {
    i3248.add(request.d('TMPro.TMP_Sprite', i3249[i + 0]));
  }
  i3246.spriteInfoList = i3248
  var i3251 = i3247[3]
  var i3250 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i3251.length; i += 2) {
  request.r(i3251[i + 0], i3251[i + 1], 1, i3250, '')
  }
  i3246.fallbackSpriteAssets = i3250
  var i3253 = i3247[4]
  var i3252 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i3253.length; i += 1) {
    i3252.add(request.d('TMPro.TMP_SpriteCharacter', i3253[i + 0]));
  }
  i3246.m_SpriteCharacterTable = i3252
  var i3255 = i3247[5]
  var i3254 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i3255.length; i += 1) {
    i3254.add(request.d('TMPro.TMP_SpriteGlyph', i3255[i + 0]));
  }
  i3246.m_GlyphTable = i3254
  i3246.m_Version = i3247[6]
  i3246.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i3247[7], i3246.m_FaceInfo)
  request.r(i3247[8], i3247[9], 0, i3246, 'm_Material')
  return i3246
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i3258 = root || request.c( 'TMPro.TMP_Sprite' )
  var i3259 = data
  i3258.name = i3259[0]
  i3258.hashCode = i3259[1]
  i3258.unicode = i3259[2]
  i3258.pivot = new pc.Vec2( i3259[3], i3259[4] )
  request.r(i3259[5], i3259[6], 0, i3258, 'sprite')
  i3258.id = i3259[7]
  i3258.x = i3259[8]
  i3258.y = i3259[9]
  i3258.width = i3259[10]
  i3258.height = i3259[11]
  i3258.xOffset = i3259[12]
  i3258.yOffset = i3259[13]
  i3258.xAdvance = i3259[14]
  i3258.scale = i3259[15]
  return i3258
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i3264 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i3265 = data
  i3264.m_Name = i3265[0]
  i3264.m_ElementType = i3265[1]
  i3264.m_Unicode = i3265[2]
  i3264.m_GlyphIndex = i3265[3]
  i3264.m_Scale = i3265[4]
  return i3264
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i3268 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i3269 = data
  request.r(i3269[0], i3269[1], 0, i3268, 'sprite')
  i3268.m_Index = i3269[2]
  i3268.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i3269[3], i3268.m_Metrics)
  i3268.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i3269[4], i3268.m_GlyphRect)
  i3268.m_Scale = i3269[5]
  i3268.m_AtlasIndex = i3269[6]
  i3268.m_ClassDefinitionType = i3269[7]
  return i3268
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i3270 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i3271 = data
  var i3273 = i3271[0]
  var i3272 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i3273.length; i += 1) {
    i3272.add(request.d('TMPro.TMP_Style', i3273[i + 0]));
  }
  i3270.m_StyleList = i3272
  return i3270
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i3276 = root || request.c( 'TMPro.TMP_Style' )
  var i3277 = data
  i3276.m_Name = i3277[0]
  i3276.m_HashCode = i3277[1]
  i3276.m_OpeningDefinition = i3277[2]
  i3276.m_ClosingDefinition = i3277[3]
  i3276.m_OpeningTagArray = i3277[4]
  i3276.m_ClosingTagArray = i3277[5]
  return i3276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i3278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i3279 = data
  var i3281 = i3279[0]
  var i3280 = []
  for(var i = 0; i < i3281.length; i += 1) {
    i3280.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i3281[i + 0]) );
  }
  i3278.files = i3280
  i3278.componentToPrefabIds = i3279[1]
  return i3278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i3284 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i3285 = data
  i3284.path = i3285[0]
  request.r(i3285[1], i3285[2], 0, i3284, 'unityObject')
  return i3284
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i3286 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i3287 = data
  var i3289 = i3287[0]
  var i3288 = []
  for(var i = 0; i < i3289.length; i += 1) {
    i3288.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i3289[i + 0]) );
  }
  i3286.scriptsExecutionOrder = i3288
  var i3291 = i3287[1]
  var i3290 = []
  for(var i = 0; i < i3291.length; i += 1) {
    i3290.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i3291[i + 0]) );
  }
  i3286.sortingLayers = i3290
  var i3293 = i3287[2]
  var i3292 = []
  for(var i = 0; i < i3293.length; i += 1) {
    i3292.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i3293[i + 0]) );
  }
  i3286.cullingLayers = i3292
  i3286.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i3287[3], i3286.timeSettings)
  i3286.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i3287[4], i3286.physicsSettings)
  i3286.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i3287[5], i3286.physics2DSettings)
  i3286.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i3287[6], i3286.qualitySettings)
  i3286.enableRealtimeShadows = !!i3287[7]
  i3286.enableAutoInstancing = !!i3287[8]
  i3286.enableStaticBatching = !!i3287[9]
  i3286.enableDynamicBatching = !!i3287[10]
  i3286.usePreservativeDynamicBatching = !!i3287[11]
  i3286.lightmapEncodingQuality = i3287[12]
  i3286.desiredColorSpace = i3287[13]
  var i3295 = i3287[14]
  var i3294 = []
  for(var i = 0; i < i3295.length; i += 1) {
    i3294.push( i3295[i + 0] );
  }
  i3286.allTags = i3294
  return i3286
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i3298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i3299 = data
  i3298.name = i3299[0]
  i3298.value = i3299[1]
  return i3298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i3302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i3303 = data
  i3302.id = i3303[0]
  i3302.name = i3303[1]
  i3302.value = i3303[2]
  return i3302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i3306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i3307 = data
  i3306.id = i3307[0]
  i3306.name = i3307[1]
  return i3306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i3308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i3309 = data
  i3308.fixedDeltaTime = i3309[0]
  i3308.maximumDeltaTime = i3309[1]
  i3308.timeScale = i3309[2]
  i3308.maximumParticleTimestep = i3309[3]
  return i3308
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i3310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i3311 = data
  i3310.gravity = new pc.Vec3( i3311[0], i3311[1], i3311[2] )
  i3310.defaultSolverIterations = i3311[3]
  i3310.bounceThreshold = i3311[4]
  i3310.autoSyncTransforms = !!i3311[5]
  i3310.autoSimulation = !!i3311[6]
  var i3313 = i3311[7]
  var i3312 = []
  for(var i = 0; i < i3313.length; i += 1) {
    i3312.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i3313[i + 0]) );
  }
  i3310.collisionMatrix = i3312
  return i3310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i3316 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i3317 = data
  i3316.enabled = !!i3317[0]
  i3316.layerId = i3317[1]
  i3316.otherLayerId = i3317[2]
  return i3316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i3318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i3319 = data
  request.r(i3319[0], i3319[1], 0, i3318, 'material')
  i3318.gravity = new pc.Vec2( i3319[2], i3319[3] )
  i3318.positionIterations = i3319[4]
  i3318.velocityIterations = i3319[5]
  i3318.velocityThreshold = i3319[6]
  i3318.maxLinearCorrection = i3319[7]
  i3318.maxAngularCorrection = i3319[8]
  i3318.maxTranslationSpeed = i3319[9]
  i3318.maxRotationSpeed = i3319[10]
  i3318.baumgarteScale = i3319[11]
  i3318.baumgarteTOIScale = i3319[12]
  i3318.timeToSleep = i3319[13]
  i3318.linearSleepTolerance = i3319[14]
  i3318.angularSleepTolerance = i3319[15]
  i3318.defaultContactOffset = i3319[16]
  i3318.autoSimulation = !!i3319[17]
  i3318.queriesHitTriggers = !!i3319[18]
  i3318.queriesStartInColliders = !!i3319[19]
  i3318.callbacksOnDisable = !!i3319[20]
  i3318.reuseCollisionCallbacks = !!i3319[21]
  i3318.autoSyncTransforms = !!i3319[22]
  var i3321 = i3319[23]
  var i3320 = []
  for(var i = 0; i < i3321.length; i += 1) {
    i3320.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i3321[i + 0]) );
  }
  i3318.collisionMatrix = i3320
  return i3318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i3324 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i3325 = data
  i3324.enabled = !!i3325[0]
  i3324.layerId = i3325[1]
  i3324.otherLayerId = i3325[2]
  return i3324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i3326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i3327 = data
  var i3329 = i3327[0]
  var i3328 = []
  for(var i = 0; i < i3329.length; i += 1) {
    i3328.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i3329[i + 0]) );
  }
  i3326.qualityLevels = i3328
  var i3331 = i3327[1]
  var i3330 = []
  for(var i = 0; i < i3331.length; i += 1) {
    i3330.push( i3331[i + 0] );
  }
  i3326.names = i3330
  i3326.shadows = i3327[2]
  i3326.anisotropicFiltering = i3327[3]
  i3326.antiAliasing = i3327[4]
  i3326.lodBias = i3327[5]
  i3326.shadowCascades = i3327[6]
  i3326.shadowDistance = i3327[7]
  i3326.shadowmaskMode = i3327[8]
  i3326.shadowProjection = i3327[9]
  i3326.shadowResolution = i3327[10]
  i3326.softParticles = !!i3327[11]
  i3326.softVegetation = !!i3327[12]
  i3326.activeColorSpace = i3327[13]
  i3326.desiredColorSpace = i3327[14]
  i3326.masterTextureLimit = i3327[15]
  i3326.maxQueuedFrames = i3327[16]
  i3326.particleRaycastBudget = i3327[17]
  i3326.pixelLightCount = i3327[18]
  i3326.realtimeReflectionProbes = !!i3327[19]
  i3326.shadowCascade2Split = i3327[20]
  i3326.shadowCascade4Split = new pc.Vec3( i3327[21], i3327[22], i3327[23] )
  i3326.streamingMipmapsActive = !!i3327[24]
  i3326.vSyncCount = i3327[25]
  i3326.asyncUploadBufferSize = i3327[26]
  i3326.asyncUploadTimeSlice = i3327[27]
  i3326.billboardsFaceCameraPosition = !!i3327[28]
  i3326.shadowNearPlaneOffset = i3327[29]
  i3326.streamingMipmapsMemoryBudget = i3327[30]
  i3326.maximumLODLevel = i3327[31]
  i3326.streamingMipmapsAddAllCameras = !!i3327[32]
  i3326.streamingMipmapsMaxLevelReduction = i3327[33]
  i3326.streamingMipmapsRenderersPerFrame = i3327[34]
  i3326.resolutionScalingFixedDPIFactor = i3327[35]
  i3326.streamingMipmapsMaxFileIORequests = i3327[36]
  i3326.currentQualityLevel = i3327[37]
  return i3326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i3334 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i3335 = data
  i3334.name = i3335[0]
  var i3337 = i3335[1]
  var i3336 = []
  for(var i = 0; i < i3337.length; i += 1) {
    i3336.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i3337[i + 0]) );
  }
  i3334.tos = i3336
  var i3339 = i3335[2]
  var i3338 = []
  for(var i = 0; i < i3339.length; i += 1) {
    i3338.push( i3339[i + 0] );
  }
  i3334.constant = i3338
  i3334.isValid = !!i3335[3]
  i3334.isHuman = !!i3335[4]
  i3334.hasRootMotion = !!i3335[5]
  return i3334
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i3342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i3343 = data
  i3342.hash = i3343[0]
  i3342.path = i3343[1]
  return i3342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i3346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i3347 = data
  i3346.weight = i3347[0]
  i3346.vertices = i3347[1]
  i3346.normals = i3347[2]
  i3346.tangents = i3347[3]
  return i3346
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i3348 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i3349 = data
  request.r(i3349[0], i3349[1], 0, i3348, 'm_ObjectArgument')
  i3348.m_ObjectArgumentAssemblyTypeName = i3349[2]
  i3348.m_IntArgument = i3349[3]
  i3348.m_FloatArgument = i3349[4]
  i3348.m_StringArgument = i3349[5]
  i3348.m_BoolArgument = !!i3349[6]
  return i3348
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i3350 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i3351 = data
  i3350.xPlacement = i3351[0]
  i3350.yPlacement = i3351[1]
  i3350.xAdvance = i3351[2]
  i3350.yAdvance = i3351[3]
  return i3350
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Rigidbody":{"mass":0,"drag":1,"angularDrag":2,"useGravity":3,"isKinematic":4,"constraints":5,"maxAngularVelocity":6,"collisionDetectionMode":7,"interpolation":8},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TrailRenderer":{"positions":0,"positionCount":1,"time":2,"startWidth":3,"endWidth":4,"widthMultiplier":5,"autodestruct":6,"emitting":7,"numCornerVertices":8,"numCapVertices":9,"minVertexDistance":10,"colorGradient":11,"startColor":12,"endColor":16,"generateLightingData":20,"textureMode":21,"alignment":22,"widthCurve":23,"enabled":24,"sharedMaterial":25,"sharedMaterials":27,"receiveShadows":28,"shadowCastingMode":29,"sortingLayerID":30,"sortingOrder":31,"lightmapIndex":32,"lightmapSceneIndex":33,"lightmapScaleOffset":34,"lightProbeUsage":38,"reflectionProbeUsage":39},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.LineRenderer":{"textureMode":0,"alignment":1,"widthCurve":2,"colorGradient":3,"positions":4,"positionCount":5,"widthMultiplier":6,"startWidth":7,"endWidth":8,"numCornerVertices":9,"numCapVertices":10,"useWorldSpace":11,"loop":12,"startColor":13,"endColor":17,"generateLightingData":21,"enabled":22,"sharedMaterial":23,"sharedMaterials":25,"receiveShadows":26,"shadowCastingMode":27,"sortingLayerID":28,"sortingOrder":29,"lightmapIndex":30,"lightmapSceneIndex":31,"lightmapScaleOffset":32,"lightProbeUsage":36,"reflectionProbeUsage":37},"Luna.Unity.DTO.UnityEngine.Components.CharacterController":{"enabled":0,"center":1,"radius":4,"height":5,"minMoveDistance":6,"skinWidth":7,"enableOverlapRecovery":8},"Luna.Unity.DTO.UnityEngine.Components.CharacterJoint":{"swingAxis":0,"twistLimitSpring":3,"swingLimitSpring":4,"lowTwistLimit":5,"highTwistLimit":6,"swing1Limit":7,"swing2Limit":8,"connectedBody":9,"axis":11,"anchor":14,"connectedAnchor":17,"autoConfigureConnectedAnchor":20,"massScale":21,"connectedMassScale":22,"enableCollision":23,"breakForce":24,"breakTorque":25},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController":{"name":0,"_runtimeAnimatorController":1,"_originalAnimationClips":3,"_overrideAnimationClips":4,"_animationClips":5,"_animationClipPairs":6},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"75":[76],"77":[76],"78":[76],"79":[76],"80":[76],"81":[76],"82":[7],"83":[46],"59":[3],"84":[3],"85":[3],"86":[3],"87":[3],"88":[3],"89":[90],"91":[90],"92":[90],"93":[90],"94":[90],"95":[90],"96":[90],"97":[90],"98":[90],"99":[90],"100":[90],"101":[90],"102":[90],"103":[46],"104":[11],"105":[106],"107":[106],"21":[10],"40":[37],"108":[10],"109":[24,10],"110":[11],"111":[24,10],"112":[10],"113":[10],"13":[11,10],"25":[10,24],"114":[115],"116":[115],"117":[115],"118":[10],"119":[10],"23":[21],"26":[24,10],"120":[10],"22":[21],"31":[10],"29":[10],"67":[10],"121":[10],"122":[10],"123":[10],"30":[10],"34":[10],"124":[10],"125":[24,10],"126":[10],"32":[10],"33":[10],"127":[10],"128":[24,10],"129":[10],"130":[60],"131":[60],"61":[60],"132":[60],"133":[46],"134":[46]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Rigidbody","UnityEngine.CapsuleCollider","UnityEngine.Animator","UnityEngine.AnimatorOverrideController","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Material","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.TrailRenderer","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.MeshFilter","UnityEngine.BoxCollider","UnityEngine.SphereCollider","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","TMPro.TextMeshProUGUI","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Mask","UnityEngine.CanvasGroup","UnityEngine.Light","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.MonoBehaviour","PlayableSpatialAudio","UnityEngine.AI.NavMeshObstacle","UnityEditor.Animations.AnimatorController","UnityEngine.Avatar","StealEggGame","UnityEngine.GameObject","UnityEngine.Camera","PlayableRagdoll","UnityEngine.Font","UnityEngine.LineRenderer","TapHintView","IconAmountView","PetRowView","IncubateRowView","QuickSlotView","BagCellView","IndexZoneView","PlayableJoystick","UnityEngine.CharacterController","UnityEngine.CharacterJoint","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","PlayableCameraDrag","CameraController","UnityEngine.UI.Outline","LunaController","PlayableHoldButton","UnityEngine.UI.HorizontalLayoutGroup","IndexPetCellView","UnityEngine.AudioListener","UnityEngine.AnimationClip","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "TE_V06";

Deserializers.lunaInitializationTime = "11/25/2026 03:50:50";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2611_TamNTM_TE_V05_DungNV";

Deserializers.lunaAppID = "38041";

Deserializers.projectId = "7c3548a0f00f61f48bf437794041aba1";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1572";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4288";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, reflection";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "True";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.Unity-Technologies.com.unity.template.urp-blank";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "2333e19f-40cc-4acb-859b-7415ff2178f4";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

