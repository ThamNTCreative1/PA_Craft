var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i454 = root || request.c( 'UnityEngine.JointSpring' )
  var i455 = data
  i454.spring = i455[0]
  i454.damper = i455[1]
  i454.targetPosition = i455[2]
  return i454
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i456 = root || request.c( 'UnityEngine.JointMotor' )
  var i457 = data
  i456.m_TargetVelocity = i457[0]
  i456.m_Force = i457[1]
  i456.m_FreeSpin = i457[2]
  return i456
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i458 = root || request.c( 'UnityEngine.JointLimits' )
  var i459 = data
  i458.m_Min = i459[0]
  i458.m_Max = i459[1]
  i458.m_Bounciness = i459[2]
  i458.m_BounceMinVelocity = i459[3]
  i458.m_ContactDistance = i459[4]
  i458.minBounce = i459[5]
  i458.maxBounce = i459[6]
  return i458
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i460 = root || request.c( 'UnityEngine.JointDrive' )
  var i461 = data
  i460.m_PositionSpring = i461[0]
  i460.m_PositionDamper = i461[1]
  i460.m_MaximumForce = i461[2]
  i460.m_UseAcceleration = i461[3]
  return i460
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i462 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i463 = data
  i462.m_Spring = i463[0]
  i462.m_Damper = i463[1]
  return i462
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i464 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i465 = data
  i464.m_Limit = i465[0]
  i464.m_Bounciness = i465[1]
  i464.m_ContactDistance = i465[2]
  return i464
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i466 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i467 = data
  i466.m_ExtremumSlip = i467[0]
  i466.m_ExtremumValue = i467[1]
  i466.m_AsymptoteSlip = i467[2]
  i466.m_AsymptoteValue = i467[3]
  i466.m_Stiffness = i467[4]
  return i466
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i468 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i469 = data
  i468.m_LowerAngle = i469[0]
  i468.m_UpperAngle = i469[1]
  return i468
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i470 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i471 = data
  i470.m_MotorSpeed = i471[0]
  i470.m_MaximumMotorTorque = i471[1]
  return i470
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i472 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i473 = data
  i472.m_DampingRatio = i473[0]
  i472.m_Frequency = i473[1]
  i472.m_Angle = i473[2]
  return i472
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i474 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i475 = data
  i474.m_LowerTranslation = i475[0]
  i474.m_UpperTranslation = i475[1]
  return i474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i477 = data
  i476.name = i477[0]
  i476.width = i477[1]
  i476.height = i477[2]
  i476.mipmapCount = i477[3]
  i476.anisoLevel = i477[4]
  i476.filterMode = i477[5]
  i476.hdr = !!i477[6]
  i476.format = i477[7]
  i476.wrapMode = i477[8]
  i476.alphaIsTransparency = !!i477[9]
  i476.alphaSource = i477[10]
  i476.graphicsFormat = i477[11]
  i476.sRGBTexture = !!i477[12]
  i476.desiredColorSpace = i477[13]
  i476.wrapU = i477[14]
  i476.wrapV = i477[15]
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i478 = root || new pc.UnityMaterial()
  var i479 = data
  i478.name = i479[0]
  request.r(i479[1], i479[2], 0, i478, 'shader')
  i478.renderQueue = i479[3]
  i478.enableInstancing = !!i479[4]
  var i481 = i479[5]
  var i480 = []
  for(var i = 0; i < i481.length; i += 1) {
    i480.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i481[i + 0]) );
  }
  i478.floatParameters = i480
  var i483 = i479[6]
  var i482 = []
  for(var i = 0; i < i483.length; i += 1) {
    i482.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i483[i + 0]) );
  }
  i478.colorParameters = i482
  var i485 = i479[7]
  var i484 = []
  for(var i = 0; i < i485.length; i += 1) {
    i484.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i485[i + 0]) );
  }
  i478.vectorParameters = i484
  var i487 = i479[8]
  var i486 = []
  for(var i = 0; i < i487.length; i += 1) {
    i486.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i487[i + 0]) );
  }
  i478.textureParameters = i486
  var i489 = i479[9]
  var i488 = []
  for(var i = 0; i < i489.length; i += 1) {
    i488.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i489[i + 0]) );
  }
  i478.materialFlags = i488
  return i478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i493 = data
  i492.name = i493[0]
  i492.value = i493[1]
  return i492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i497 = data
  i496.name = i497[0]
  i496.value = new pc.Color(i497[1], i497[2], i497[3], i497[4])
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i501 = data
  i500.name = i501[0]
  i500.value = new pc.Vec4( i501[1], i501[2], i501[3], i501[4] )
  return i500
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i504 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i505 = data
  i504.name = i505[0]
  request.r(i505[1], i505[2], 0, i504, 'value')
  return i504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i509 = data
  i508.name = i509[0]
  i508.enabled = !!i509[1]
  return i508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i511 = data
  i510.name = i511[0]
  i510.index = i511[1]
  i510.startup = !!i511[2]
  return i510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i513 = data
  i512.aspect = i513[0]
  i512.orthographic = !!i513[1]
  i512.orthographicSize = i513[2]
  i512.backgroundColor = new pc.Color(i513[3], i513[4], i513[5], i513[6])
  i512.nearClipPlane = i513[7]
  i512.farClipPlane = i513[8]
  i512.fieldOfView = i513[9]
  i512.depth = i513[10]
  i512.clearFlags = i513[11]
  i512.cullingMask = i513[12]
  i512.rect = i513[13]
  request.r(i513[14], i513[15], 0, i512, 'targetTexture')
  i512.usePhysicalProperties = !!i513[16]
  i512.focalLength = i513[17]
  i512.sensorSize = new pc.Vec2( i513[18], i513[19] )
  i512.lensShift = new pc.Vec2( i513[20], i513[21] )
  i512.gateFit = i513[22]
  i512.commandBufferCount = i513[23]
  i512.cameraType = i513[24]
  i512.enabled = !!i513[25]
  return i512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i515 = data
  i514.name = i515[0]
  i514.tagId = i515[1]
  i514.enabled = !!i515[2]
  i514.isStatic = !!i515[3]
  i514.layer = i515[4]
  return i514
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i516 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i517 = data
  request.r(i517[0], i517[1], 0, i516, 'm_FirstSelected')
  i516.m_sendNavigationEvents = !!i517[2]
  i516.m_DragThreshold = i517[3]
  return i516
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i519 = data
  i518.m_HorizontalAxis = i519[0]
  i518.m_VerticalAxis = i519[1]
  i518.m_SubmitButton = i519[2]
  i518.m_CancelButton = i519[3]
  i518.m_InputActionsPerSecond = i519[4]
  i518.m_RepeatDelay = i519[5]
  i518.m_ForceModuleActive = !!i519[6]
  i518.m_SendPointerHoverToParent = !!i519[7]
  return i518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i521 = data
  i520.pivot = new pc.Vec2( i521[0], i521[1] )
  i520.anchorMin = new pc.Vec2( i521[2], i521[3] )
  i520.anchorMax = new pc.Vec2( i521[4], i521[5] )
  i520.sizeDelta = new pc.Vec2( i521[6], i521[7] )
  i520.anchoredPosition3D = new pc.Vec3( i521[8], i521[9], i521[10] )
  i520.rotation = new pc.Quat(i521[11], i521[12], i521[13], i521[14])
  i520.scale = new pc.Vec3( i521[15], i521[16], i521[17] )
  return i520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i523 = data
  i522.planeDistance = i523[0]
  i522.referencePixelsPerUnit = i523[1]
  i522.isFallbackOverlay = !!i523[2]
  i522.renderMode = i523[3]
  i522.renderOrder = i523[4]
  i522.sortingLayerName = i523[5]
  i522.sortingOrder = i523[6]
  i522.scaleFactor = i523[7]
  request.r(i523[8], i523[9], 0, i522, 'worldCamera')
  i522.overrideSorting = !!i523[10]
  i522.pixelPerfect = !!i523[11]
  i522.targetDisplay = i523[12]
  i522.overridePixelPerfect = !!i523[13]
  i522.enabled = !!i523[14]
  return i522
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i524 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i525 = data
  i524.m_UiScaleMode = i525[0]
  i524.m_ReferencePixelsPerUnit = i525[1]
  i524.m_ScaleFactor = i525[2]
  i524.m_ReferenceResolution = new pc.Vec2( i525[3], i525[4] )
  i524.m_ScreenMatchMode = i525[5]
  i524.m_MatchWidthOrHeight = i525[6]
  i524.m_PhysicalUnit = i525[7]
  i524.m_FallbackScreenDPI = i525[8]
  i524.m_DefaultSpriteDPI = i525[9]
  i524.m_DynamicPixelsPerUnit = i525[10]
  i524.m_PresetInfoIsWorld = !!i525[11]
  return i524
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i526 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i527 = data
  i526.m_IgnoreReversedGraphics = !!i527[0]
  i526.m_BlockingObjects = i527[1]
  i526.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i527[2] )
  return i526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i529 = data
  i528.cullTransparentMesh = !!i529[0]
  return i528
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i530 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i531 = data
  i530.m_AspectMode = i531[0]
  i530.m_AspectRatio = i531[1]
  return i530
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i532 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i533 = data
  request.r(i533[0], i533[1], 0, i532, 'm_Texture')
  i532.m_UVRect = UnityEngine.Rect.MinMaxRect(i533[2], i533[3], i533[4], i533[5])
  request.r(i533[6], i533[7], 0, i532, 'm_Material')
  i532.m_Maskable = !!i533[8]
  i532.m_Color = new pc.Color(i533[9], i533[10], i533[11], i533[12])
  i532.m_RaycastTarget = !!i533[13]
  i532.m_RaycastPadding = new pc.Vec4( i533[14], i533[15], i533[16], i533[17] )
  return i532
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i534 = root || request.c( 'UnityEngine.UI.Image' )
  var i535 = data
  request.r(i535[0], i535[1], 0, i534, 'm_Sprite')
  i534.m_Type = i535[2]
  i534.m_PreserveAspect = !!i535[3]
  i534.m_FillCenter = !!i535[4]
  i534.m_FillMethod = i535[5]
  i534.m_FillAmount = i535[6]
  i534.m_FillClockwise = !!i535[7]
  i534.m_FillOrigin = i535[8]
  i534.m_UseSpriteMesh = !!i535[9]
  i534.m_PixelsPerUnitMultiplier = i535[10]
  request.r(i535[11], i535[12], 0, i534, 'm_Material')
  i534.m_Maskable = !!i535[13]
  i534.m_Color = new pc.Color(i535[14], i535[15], i535[16], i535[17])
  i534.m_RaycastTarget = !!i535[18]
  i534.m_RaycastPadding = new pc.Vec4( i535[19], i535[20], i535[21], i535[22] )
  return i534
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i536 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i537 = data
  i536.targetIsSelf = !!i537[0]
  request.r(i537[1], i537[2], 0, i536, 'targetGO')
  i536.tweenTargetIsTargetGO = !!i537[3]
  i536.delay = i537[4]
  i536.duration = i537[5]
  i536.easeType = i537[6]
  i536.easeCurve = new pc.AnimationCurve( { keys_flow: i537[7] } )
  i536.loopType = i537[8]
  i536.loops = i537[9]
  i536.id = i537[10]
  i536.isRelative = !!i537[11]
  i536.isFrom = !!i537[12]
  i536.isIndependentUpdate = !!i537[13]
  i536.autoKill = !!i537[14]
  i536.autoGenerate = !!i537[15]
  i536.isActive = !!i537[16]
  i536.isValid = !!i537[17]
  request.r(i537[18], i537[19], 0, i536, 'target')
  i536.animationType = i537[20]
  i536.targetType = i537[21]
  i536.forcedTargetType = i537[22]
  i536.autoPlay = !!i537[23]
  i536.useTargetAsV3 = !!i537[24]
  i536.endValueFloat = i537[25]
  i536.endValueV3 = new pc.Vec3( i537[26], i537[27], i537[28] )
  i536.endValueV2 = new pc.Vec2( i537[29], i537[30] )
  i536.endValueColor = new pc.Color(i537[31], i537[32], i537[33], i537[34])
  i536.endValueString = i537[35]
  i536.endValueRect = UnityEngine.Rect.MinMaxRect(i537[36], i537[37], i537[38], i537[39])
  request.r(i537[40], i537[41], 0, i536, 'endValueTransform')
  i536.optionalBool0 = !!i537[42]
  i536.optionalBool1 = !!i537[43]
  i536.optionalFloat0 = i537[44]
  i536.optionalInt0 = i537[45]
  i536.optionalRotationMode = i537[46]
  i536.optionalScrambleMode = i537[47]
  i536.optionalShakeRandomnessMode = i537[48]
  i536.optionalString = i537[49]
  i536.updateType = i537[50]
  i536.isSpeedBased = !!i537[51]
  i536.hasOnStart = !!i537[52]
  i536.hasOnPlay = !!i537[53]
  i536.hasOnUpdate = !!i537[54]
  i536.hasOnStepComplete = !!i537[55]
  i536.hasOnComplete = !!i537[56]
  i536.hasOnTweenCreated = !!i537[57]
  i536.hasOnRewind = !!i537[58]
  i536.onStart = request.d('UnityEngine.Events.UnityEvent', i537[59], i536.onStart)
  i536.onPlay = request.d('UnityEngine.Events.UnityEvent', i537[60], i536.onPlay)
  i536.onUpdate = request.d('UnityEngine.Events.UnityEvent', i537[61], i536.onUpdate)
  i536.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i537[62], i536.onStepComplete)
  i536.onComplete = request.d('UnityEngine.Events.UnityEvent', i537[63], i536.onComplete)
  i536.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i537[64], i536.onTweenCreated)
  i536.onRewind = request.d('UnityEngine.Events.UnityEvent', i537[65], i536.onRewind)
  return i536
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i538 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i539 = data
  i538.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i539[0], i538.m_PersistentCalls)
  return i538
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i540 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i541 = data
  var i543 = i541[0]
  var i542 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i543.length; i += 1) {
    i542.add(request.d('UnityEngine.Events.PersistentCall', i543[i + 0]));
  }
  i540.m_Calls = i542
  return i540
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i546 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i547 = data
  request.r(i547[0], i547[1], 0, i546, 'm_Target')
  i546.m_TargetAssemblyTypeName = i547[2]
  i546.m_MethodName = i547[3]
  i546.m_Mode = i547[4]
  i546.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i547[5], i546.m_Arguments)
  i546.m_CallState = i547[6]
  return i546
}

Deserializers["SmoothChestOpening"] = function (request, data, root) {
  var i548 = root || request.c( 'SmoothChestOpening' )
  var i549 = data
  request.r(i549[0], i549[1], 0, i548, 'currentImage')
  var i551 = i549[2]
  var i550 = []
  for(var i = 0; i < i551.length; i += 2) {
  request.r(i551[i + 0], i551[i + 1], 2, i550, '')
  }
  i548.frames = i550
  i548.baselineOffsets = i549[3]
  return i548
}

Deserializers["UnityEngine.UI.RectMask2D"] = function (request, data, root) {
  var i554 = root || request.c( 'UnityEngine.UI.RectMask2D' )
  var i555 = data
  i554.m_Padding = new pc.Vec4( i555[0], i555[1], i555[2], i555[3] )
  i554.m_Softness = new pc.Vec2( i555[4], i555[5] )
  return i554
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i556 = root || request.c( 'UnityEngine.UI.Outline' )
  var i557 = data
  i556.m_EffectColor = new pc.Color(i557[0], i557[1], i557[2], i557[3])
  i556.m_EffectDistance = new pc.Vec2( i557[4], i557[5] )
  i556.m_UseGraphicAlpha = !!i557[6]
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i559 = data
  i558.m_Alpha = i559[0]
  i558.m_Interactable = !!i559[1]
  i558.m_BlocksRaycasts = !!i559[2]
  i558.m_IgnoreParentGroups = !!i559[3]
  i558.enabled = !!i559[4]
  return i558
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i560 = root || request.c( 'UnityEngine.UI.Text' )
  var i561 = data
  i560.m_FontData = request.d('UnityEngine.UI.FontData', i561[0], i560.m_FontData)
  i560.m_Text = i561[1]
  request.r(i561[2], i561[3], 0, i560, 'm_Material')
  i560.m_Maskable = !!i561[4]
  i560.m_Color = new pc.Color(i561[5], i561[6], i561[7], i561[8])
  i560.m_RaycastTarget = !!i561[9]
  i560.m_RaycastPadding = new pc.Vec4( i561[10], i561[11], i561[12], i561[13] )
  return i560
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i562 = root || request.c( 'UnityEngine.UI.FontData' )
  var i563 = data
  request.r(i563[0], i563[1], 0, i562, 'm_Font')
  i562.m_FontSize = i563[2]
  i562.m_FontStyle = i563[3]
  i562.m_BestFit = !!i563[4]
  i562.m_MinSize = i563[5]
  i562.m_MaxSize = i563[6]
  i562.m_Alignment = i563[7]
  i562.m_AlignByGeometry = !!i563[8]
  i562.m_RichText = !!i563[9]
  i562.m_HorizontalOverflow = i563[10]
  i562.m_VerticalOverflow = i563[11]
  i562.m_LineSpacing = i563[12]
  return i562
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i564 = root || request.c( 'UnityEngine.UI.Button' )
  var i565 = data
  i564.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i565[0], i564.m_OnClick)
  i564.m_Navigation = request.d('UnityEngine.UI.Navigation', i565[1], i564.m_Navigation)
  i564.m_Transition = i565[2]
  i564.m_Colors = request.d('UnityEngine.UI.ColorBlock', i565[3], i564.m_Colors)
  i564.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i565[4], i564.m_SpriteState)
  i564.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i565[5], i564.m_AnimationTriggers)
  i564.m_Interactable = !!i565[6]
  request.r(i565[7], i565[8], 0, i564, 'm_TargetGraphic')
  return i564
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i566 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i567 = data
  i566.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i567[0], i566.m_PersistentCalls)
  return i566
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i568 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i569 = data
  request.r(i569[0], i569[1], 0, i568, 'm_ObjectArgument')
  i568.m_ObjectArgumentAssemblyTypeName = i569[2]
  i568.m_IntArgument = i569[3]
  i568.m_FloatArgument = i569[4]
  i568.m_StringArgument = i569[5]
  i568.m_BoolArgument = !!i569[6]
  return i568
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i570 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i571 = data
  i570.m_Mode = i571[0]
  i570.m_WrapAround = !!i571[1]
  request.r(i571[2], i571[3], 0, i570, 'm_SelectOnUp')
  request.r(i571[4], i571[5], 0, i570, 'm_SelectOnDown')
  request.r(i571[6], i571[7], 0, i570, 'm_SelectOnLeft')
  request.r(i571[8], i571[9], 0, i570, 'm_SelectOnRight')
  return i570
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i572 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i573 = data
  i572.m_NormalColor = new pc.Color(i573[0], i573[1], i573[2], i573[3])
  i572.m_HighlightedColor = new pc.Color(i573[4], i573[5], i573[6], i573[7])
  i572.m_PressedColor = new pc.Color(i573[8], i573[9], i573[10], i573[11])
  i572.m_SelectedColor = new pc.Color(i573[12], i573[13], i573[14], i573[15])
  i572.m_DisabledColor = new pc.Color(i573[16], i573[17], i573[18], i573[19])
  i572.m_ColorMultiplier = i573[20]
  i572.m_FadeDuration = i573[21]
  return i572
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i574 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i575 = data
  request.r(i575[0], i575[1], 0, i574, 'm_HighlightedSprite')
  request.r(i575[2], i575[3], 0, i574, 'm_PressedSprite')
  request.r(i575[4], i575[5], 0, i574, 'm_SelectedSprite')
  request.r(i575[6], i575[7], 0, i574, 'm_DisabledSprite')
  return i574
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i576 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i577 = data
  i576.m_NormalTrigger = i577[0]
  i576.m_HighlightedTrigger = i577[1]
  i576.m_PressedTrigger = i577[2]
  i576.m_SelectedTrigger = i577[3]
  i576.m_DisabledTrigger = i577[4]
  return i576
}

Deserializers["ButtonScalePulse"] = function (request, data, root) {
  var i578 = root || request.c( 'ButtonScalePulse' )
  var i579 = data
  i578.maxScale = i579[0]
  i578.halfCycleDuration = i579[1]
  return i578
}

Deserializers["LunaController"] = function (request, data, root) {
  var i580 = root || request.c( 'LunaController' )
  var i581 = data
  i580.FakePlay = !!i581[0]
  i580.LimitTimePlay = !!i581[1]
  i580.TimePlay = i581[2]
  request.r(i581[3], i581[4], 0, i580, 'BGTexture')
  request.r(i581[5], i581[6], 0, i580, 'LogoTexture')
  i580.UseBGM = !!i581[7]
  request.r(i581[8], i581[9], 0, i580, 'BGM')
  request.r(i581[10], i581[11], 0, i580, 'musicSource')
  request.r(i581[12], i581[13], 0, i580, 'BGImage')
  request.r(i581[14], i581[15], 0, i580, 'logoImage')
  request.r(i581[16], i581[17], 0, i580, 'mask')
  var i583 = i581[18]
  var i582 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i583.length; i += 2) {
  request.r(i583[i + 0], i583[i + 1], 1, i582, '')
  }
  i580.CTA = i582
  request.r(i581[19], i581[20], 0, i580, 'endCard')
  request.r(i581[21], i581[22], 0, i580, 'openButton')
  return i580
}

Deserializers["GameController"] = function (request, data, root) {
  var i586 = root || request.c( 'GameController' )
  var i587 = data
  request.r(i587[0], i587[1], 0, i586, 'title')
  request.r(i587[2], i587[3], 0, i586, 'chestIntro')
  request.r(i587[4], i587[5], 0, i586, 'chestOpening')
  request.r(i587[6], i587[7], 0, i586, 'reelPanel')
  request.r(i587[8], i587[9], 0, i586, 'spin')
  request.r(i587[10], i587[11], 0, i586, 'backgroundDim')
  request.r(i587[12], i587[13], 0, i586, 'reel')
  request.r(i587[14], i587[15], 0, i586, 'lensReel')
  request.r(i587[16], i587[17], 0, i586, 'lensViewport')
  request.r(i587[18], i587[19], 0, i586, 'openButton')
  request.r(i587[20], i587[21], 0, i586, 'resultPanel')
  request.r(i587[22], i587[23], 0, i586, 'resultImage')
  request.r(i587[24], i587[25], 0, i586, 'resultRarity')
  request.r(i587[26], i587[27], 0, i586, 'resultName')
  var i589 = i587[28]
  var i588 = []
  for(var i = 0; i < i589.length; i += 1) {
    i588.push( request.d('GameController+ReelCardView', i589[i + 0]) );
  }
  i586.reelCards = i588
  var i591 = i587[29]
  var i590 = []
  for(var i = 0; i < i591.length; i += 1) {
    i590.push( request.d('GameController+ReelCardView', i591[i + 0]) );
  }
  i586.lensCards = i590
  request.r(i587[30], i587[31], 0, i586, 'lensMaterialTemplate')
  request.r(i587[32], i587[33], 0, i586, 'outsideBlurMaterialTemplate')
  var i593 = i587[34]
  var i592 = []
  for(var i = 0; i < i593.length; i += 2) {
  request.r(i593[i + 0], i593[i + 1], 2, i592, '')
  }
  i586.lensGraphics = i592
  var i595 = i587[35]
  var i594 = []
  for(var i = 0; i < i595.length; i += 2) {
  request.r(i595[i + 0], i595[i + 1], 2, i594, '')
  }
  i586.outsideGraphics = i594
  request.r(i587[36], i587[37], 0, i586, 'caseAudio')
  request.r(i587[38], i587[39], 0, i586, 'speedX2Sprite')
  request.r(i587[40], i587[41], 0, i586, 'treadmillX50Sprite')
  request.r(i587[42], i587[43], 0, i586, 'cupX2Sprite')
  request.r(i587[44], i587[45], 0, i586, 'expX2Sprite')
  request.r(i587[46], i587[47], 0, i586, 'treadmillX100Sprite')
  i586.lensRadius = i587[48]
  i586.lensEdgeSoftness = i587[49]
  i586.outsideBlurStrength = i587[50]
  return i586
}

Deserializers["GameController+ReelCardView"] = function (request, data, root) {
  var i598 = root || request.c( 'GameController+ReelCardView' )
  var i599 = data
  request.r(i599[0], i599[1], 0, i598, 'icon')
  request.r(i599[2], i599[3], 0, i598, 'rarityStrip')
  request.r(i599[4], i599[5], 0, i598, 'label')
  return i598
}

Deserializers["CaseOpeningAudio"] = function (request, data, root) {
  var i602 = root || request.c( 'CaseOpeningAudio' )
  var i603 = data
  i602.volume = i603[0]
  request.r(i603[1], i603[2], 0, i602, 'unlockClip')
  request.r(i603[3], i603[4], 0, i602, 'tickClip')
  request.r(i603[5], i603[6], 0, i602, 'stopClip')
  request.r(i603[7], i603[8], 0, i602, 'rewardClip')
  request.r(i603[9], i603[10], 0, i602, 'rareRewardClip')
  return i602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i605 = data
  request.r(i605[0], i605[1], 0, i604, 'clip')
  request.r(i605[2], i605[3], 0, i604, 'outputAudioMixerGroup')
  i604.playOnAwake = !!i605[4]
  i604.loop = !!i605[5]
  i604.time = i605[6]
  i604.volume = i605[7]
  i604.pitch = i605[8]
  i604.enabled = !!i605[9]
  return i604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i607 = data
  i606.ambientIntensity = i607[0]
  i606.reflectionIntensity = i607[1]
  i606.ambientMode = i607[2]
  i606.ambientLight = new pc.Color(i607[3], i607[4], i607[5], i607[6])
  i606.ambientSkyColor = new pc.Color(i607[7], i607[8], i607[9], i607[10])
  i606.ambientGroundColor = new pc.Color(i607[11], i607[12], i607[13], i607[14])
  i606.ambientEquatorColor = new pc.Color(i607[15], i607[16], i607[17], i607[18])
  i606.fogColor = new pc.Color(i607[19], i607[20], i607[21], i607[22])
  i606.fogEndDistance = i607[23]
  i606.fogStartDistance = i607[24]
  i606.fogDensity = i607[25]
  i606.fog = !!i607[26]
  request.r(i607[27], i607[28], 0, i606, 'skybox')
  i606.fogMode = i607[29]
  var i609 = i607[30]
  var i608 = []
  for(var i = 0; i < i609.length; i += 1) {
    i608.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i609[i + 0]) );
  }
  i606.lightmaps = i608
  i606.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i607[31], i606.lightProbes)
  i606.lightmapsMode = i607[32]
  i606.mixedBakeMode = i607[33]
  i606.environmentLightingMode = i607[34]
  i606.ambientProbe = new pc.SphericalHarmonicsL2(i607[35])
  request.r(i607[36], i607[37], 0, i606, 'customReflection')
  request.r(i607[38], i607[39], 0, i606, 'defaultReflection')
  i606.defaultReflectionMode = i607[40]
  i606.defaultReflectionResolution = i607[41]
  i606.sunLightObjectId = i607[42]
  i606.pixelLightCount = i607[43]
  i606.defaultReflectionHDR = !!i607[44]
  i606.hasLightDataAsset = !!i607[45]
  i606.hasManualGenerate = !!i607[46]
  return i606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i613 = data
  request.r(i613[0], i613[1], 0, i612, 'lightmapColor')
  request.r(i613[2], i613[3], 0, i612, 'lightmapDirection')
  request.r(i613[4], i613[5], 0, i612, 'shadowMask')
  return i612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i614 = root || new UnityEngine.LightProbes()
  var i615 = data
  return i614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i623 = data
  var i625 = i623[0]
  var i624 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i625.length; i += 1) {
    i624.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i625[i + 0]));
  }
  i622.ShaderCompilationErrors = i624
  i622.name = i623[1]
  i622.guid = i623[2]
  var i627 = i623[3]
  var i626 = []
  for(var i = 0; i < i627.length; i += 1) {
    i626.push( i627[i + 0] );
  }
  i622.shaderDefinedKeywords = i626
  var i629 = i623[4]
  var i628 = []
  for(var i = 0; i < i629.length; i += 1) {
    i628.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i629[i + 0]) );
  }
  i622.passes = i628
  var i631 = i623[5]
  var i630 = []
  for(var i = 0; i < i631.length; i += 1) {
    i630.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i631[i + 0]) );
  }
  i622.usePasses = i630
  var i633 = i623[6]
  var i632 = []
  for(var i = 0; i < i633.length; i += 1) {
    i632.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i633[i + 0]) );
  }
  i622.defaultParameterValues = i632
  request.r(i623[7], i623[8], 0, i622, 'unityFallbackShader')
  i622.readDepth = !!i623[9]
  i622.hasDepthOnlyPass = !!i623[10]
  i622.isCreatedByShaderGraph = !!i623[11]
  i622.disableBatching = !!i623[12]
  i622.compiled = !!i623[13]
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i637 = data
  i636.shaderName = i637[0]
  i636.errorMessage = i637[1]
  return i636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i642 = root || new pc.UnityShaderPass()
  var i643 = data
  i642.id = i643[0]
  i642.subShaderIndex = i643[1]
  i642.name = i643[2]
  i642.passType = i643[3]
  i642.grabPassTextureName = i643[4]
  i642.usePass = !!i643[5]
  i642.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[6], i642.zTest)
  i642.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[7], i642.zWrite)
  i642.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[8], i642.culling)
  i642.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i643[9], i642.blending)
  i642.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i643[10], i642.alphaBlending)
  i642.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[11], i642.colorWriteMask)
  i642.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[12], i642.offsetUnits)
  i642.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[13], i642.offsetFactor)
  i642.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[14], i642.stencilRef)
  i642.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[15], i642.stencilReadMask)
  i642.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i643[16], i642.stencilWriteMask)
  i642.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i643[17], i642.stencilOp)
  i642.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i643[18], i642.stencilOpFront)
  i642.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i643[19], i642.stencilOpBack)
  var i645 = i643[20]
  var i644 = []
  for(var i = 0; i < i645.length; i += 1) {
    i644.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i645[i + 0]) );
  }
  i642.tags = i644
  var i647 = i643[21]
  var i646 = []
  for(var i = 0; i < i647.length; i += 1) {
    i646.push( i647[i + 0] );
  }
  i642.passDefinedKeywords = i646
  var i649 = i643[22]
  var i648 = []
  for(var i = 0; i < i649.length; i += 1) {
    i648.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i649[i + 0]) );
  }
  i642.passDefinedKeywordGroups = i648
  var i651 = i643[23]
  var i650 = []
  for(var i = 0; i < i651.length; i += 1) {
    i650.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i651[i + 0]) );
  }
  i642.variants = i650
  var i653 = i643[24]
  var i652 = []
  for(var i = 0; i < i653.length; i += 1) {
    i652.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i653[i + 0]) );
  }
  i642.excludedVariants = i652
  i642.hasDepthReader = !!i643[25]
  return i642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i655 = data
  i654.val = i655[0]
  i654.name = i655[1]
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i656 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i657 = data
  i656.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i657[0], i656.src)
  i656.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i657[1], i656.dst)
  i656.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i657[2], i656.op)
  return i656
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i659 = data
  i658.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i659[0], i658.pass)
  i658.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i659[1], i658.fail)
  i658.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i659[2], i658.zFail)
  i658.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i659[3], i658.comp)
  return i658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i663 = data
  i662.name = i663[0]
  i662.value = i663[1]
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i667 = data
  var i669 = i667[0]
  var i668 = []
  for(var i = 0; i < i669.length; i += 1) {
    i668.push( i669[i + 0] );
  }
  i666.keywords = i668
  i666.hasDiscard = !!i667[1]
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i672 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i673 = data
  i672.passId = i673[0]
  i672.subShaderIndex = i673[1]
  var i675 = i673[2]
  var i674 = []
  for(var i = 0; i < i675.length; i += 1) {
    i674.push( i675[i + 0] );
  }
  i672.keywords = i674
  i672.vertexProgram = i673[3]
  i672.fragmentProgram = i673[4]
  i672.exportedForWebGl2 = !!i673[5]
  i672.readDepth = !!i673[6]
  return i672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i679 = data
  request.r(i679[0], i679[1], 0, i678, 'shader')
  i678.pass = i679[2]
  return i678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i683 = data
  i682.name = i683[0]
  i682.type = i683[1]
  i682.value = new pc.Vec4( i683[2], i683[3], i683[4], i683[5] )
  i682.textureValue = i683[6]
  i682.shaderPropertyFlag = i683[7]
  return i682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i685 = data
  i684.name = i685[0]
  request.r(i685[1], i685[2], 0, i684, 'texture')
  i684.aabb = i685[3]
  i684.vertices = i685[4]
  i684.triangles = i685[5]
  i684.textureRect = UnityEngine.Rect.MinMaxRect(i685[6], i685[7], i685[8], i685[9])
  i684.packedRect = UnityEngine.Rect.MinMaxRect(i685[10], i685[11], i685[12], i685[13])
  i684.border = new pc.Vec4( i685[14], i685[15], i685[16], i685[17] )
  i684.transparency = i685[18]
  i684.bounds = i685[19]
  i684.pixelsPerUnit = i685[20]
  i684.textureWidth = i685[21]
  i684.textureHeight = i685[22]
  i684.nativeSize = new pc.Vec2( i685[23], i685[24] )
  i684.pivot = new pc.Vec2( i685[25], i685[26] )
  i684.textureRectOffset = new pc.Vec2( i685[27], i685[28] )
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i687 = data
  i686.name = i687[0]
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i688 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i689 = data
  i688.name = i689[0]
  i688.ascent = i689[1]
  i688.originalLineHeight = i689[2]
  i688.fontSize = i689[3]
  var i691 = i689[4]
  var i690 = []
  for(var i = 0; i < i691.length; i += 1) {
    i690.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i691[i + 0]) );
  }
  i688.characterInfo = i690
  request.r(i689[5], i689[6], 0, i688, 'texture')
  i688.originalFontSize = i689[7]
  return i688
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i694 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i695 = data
  i694.index = i695[0]
  i694.advance = i695[1]
  i694.bearing = i695[2]
  i694.glyphWidth = i695[3]
  i694.glyphHeight = i695[4]
  i694.minX = i695[5]
  i694.maxX = i695[6]
  i694.minY = i695[7]
  i694.maxY = i695[8]
  i694.uvBottomLeftX = i695[9]
  i694.uvBottomLeftY = i695[10]
  i694.uvBottomRightX = i695[11]
  i694.uvBottomRightY = i695[12]
  i694.uvTopLeftX = i695[13]
  i694.uvTopLeftY = i695[14]
  i694.uvTopRightX = i695[15]
  i694.uvTopRightY = i695[16]
  return i694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i697 = data
  i696.name = i697[0]
  i696.bytes64 = i697[1]
  i696.data = i697[2]
  return i696
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i698 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i699 = data
  i698.useSafeMode = !!i699[0]
  i698.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i699[1], i698.safeModeOptions)
  i698.timeScale = i699[2]
  i698.unscaledTimeScale = i699[3]
  i698.useSmoothDeltaTime = !!i699[4]
  i698.maxSmoothUnscaledTime = i699[5]
  i698.rewindCallbackMode = i699[6]
  i698.showUnityEditorReport = !!i699[7]
  i698.logBehaviour = i699[8]
  i698.drawGizmos = !!i699[9]
  i698.defaultRecyclable = !!i699[10]
  i698.defaultAutoPlay = i699[11]
  i698.defaultUpdateType = i699[12]
  i698.defaultTimeScaleIndependent = !!i699[13]
  i698.defaultEaseType = i699[14]
  i698.defaultEaseOvershootOrAmplitude = i699[15]
  i698.defaultEasePeriod = i699[16]
  i698.defaultAutoKill = !!i699[17]
  i698.defaultLoopType = i699[18]
  i698.debugMode = !!i699[19]
  i698.debugStoreTargetId = !!i699[20]
  i698.showPreviewPanel = !!i699[21]
  i698.storeSettingsLocation = i699[22]
  i698.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i699[23], i698.modules)
  i698.createASMDEF = !!i699[24]
  i698.showPlayingTweens = !!i699[25]
  i698.showPausedTweens = !!i699[26]
  return i698
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i700 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i701 = data
  i700.logBehaviour = i701[0]
  i700.nestedTweenFailureBehaviour = i701[1]
  return i700
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i702 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i703 = data
  i702.showPanel = !!i703[0]
  i702.audioEnabled = !!i703[1]
  i702.physicsEnabled = !!i703[2]
  i702.physics2DEnabled = !!i703[3]
  i702.spriteEnabled = !!i703[4]
  i702.uiEnabled = !!i703[5]
  i702.textMeshProEnabled = !!i703[6]
  i702.tk2DEnabled = !!i703[7]
  i702.deAudioEnabled = !!i703[8]
  i702.deUnityExtendedEnabled = !!i703[9]
  i702.epoOutlineEnabled = !!i703[10]
  return i702
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i704 = root || request.c( 'TMPro.TMP_Settings' )
  var i705 = data
  i704.assetVersion = i705[0]
  i704.m_TextWrappingMode = i705[1]
  i704.m_enableKerning = !!i705[2]
  var i707 = i705[3]
  var i706 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i707.length; i += 1) {
    i706.add(i707[i + 0]);
  }
  i704.m_ActiveFontFeatures = i706
  i704.m_enableExtraPadding = !!i705[4]
  i704.m_enableTintAllSprites = !!i705[5]
  i704.m_enableParseEscapeCharacters = !!i705[6]
  i704.m_EnableRaycastTarget = !!i705[7]
  i704.m_GetFontFeaturesAtRuntime = !!i705[8]
  i704.m_missingGlyphCharacter = i705[9]
  i704.m_ClearDynamicDataOnBuild = !!i705[10]
  i704.m_warningsDisabled = !!i705[11]
  request.r(i705[12], i705[13], 0, i704, 'm_defaultFontAsset')
  i704.m_defaultFontAssetPath = i705[14]
  i704.m_defaultFontSize = i705[15]
  i704.m_defaultAutoSizeMinRatio = i705[16]
  i704.m_defaultAutoSizeMaxRatio = i705[17]
  i704.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i705[18], i705[19] )
  i704.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i705[20], i705[21] )
  i704.m_autoSizeTextContainer = !!i705[22]
  i704.m_IsTextObjectScaleStatic = !!i705[23]
  var i709 = i705[24]
  var i708 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i709.length; i += 2) {
  request.r(i709[i + 0], i709[i + 1], 1, i708, '')
  }
  i704.m_fallbackFontAssets = i708
  i704.m_matchMaterialPreset = !!i705[25]
  i704.m_HideSubTextObjects = !!i705[26]
  request.r(i705[27], i705[28], 0, i704, 'm_defaultSpriteAsset')
  i704.m_defaultSpriteAssetPath = i705[29]
  i704.m_enableEmojiSupport = !!i705[30]
  i704.m_MissingCharacterSpriteUnicode = i705[31]
  var i711 = i705[32]
  var i710 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i711.length; i += 2) {
  request.r(i711[i + 0], i711[i + 1], 1, i710, '')
  }
  i704.m_EmojiFallbackTextAssets = i710
  i704.m_defaultColorGradientPresetsPath = i705[33]
  request.r(i705[34], i705[35], 0, i704, 'm_defaultStyleSheet')
  i704.m_StyleSheetsResourcePath = i705[36]
  request.r(i705[37], i705[38], 0, i704, 'm_leadingCharacters')
  request.r(i705[39], i705[40], 0, i704, 'm_followingCharacters')
  i704.m_UseModernHangulLineBreakingRules = !!i705[41]
  return i704
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i718 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i719 = data
  i718.normalStyle = i719[0]
  i718.normalSpacingOffset = i719[1]
  i718.boldStyle = i719[2]
  i718.boldSpacing = i719[3]
  i718.italicStyle = i719[4]
  i718.tabSize = i719[5]
  request.r(i719[6], i719[7], 0, i718, 'atlas')
  i718.m_SourceFontFileGUID = i719[8]
  i718.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i719[9], i718.m_CreationSettings)
  request.r(i719[10], i719[11], 0, i718, 'm_SourceFontFile')
  i718.m_SourceFontFilePath = i719[12]
  i718.m_AtlasPopulationMode = i719[13]
  i718.InternalDynamicOS = !!i719[14]
  var i721 = i719[15]
  var i720 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i721.length; i += 1) {
    i720.add(request.d('UnityEngine.TextCore.Glyph', i721[i + 0]));
  }
  i718.m_GlyphTable = i720
  var i723 = i719[16]
  var i722 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i723.length; i += 1) {
    i722.add(request.d('TMPro.TMP_Character', i723[i + 0]));
  }
  i718.m_CharacterTable = i722
  var i725 = i719[17]
  var i724 = []
  for(var i = 0; i < i725.length; i += 2) {
  request.r(i725[i + 0], i725[i + 1], 2, i724, '')
  }
  i718.m_AtlasTextures = i724
  i718.m_AtlasTextureIndex = i719[18]
  i718.m_IsMultiAtlasTexturesEnabled = !!i719[19]
  i718.m_GetFontFeatures = !!i719[20]
  i718.m_ClearDynamicDataOnBuild = !!i719[21]
  i718.m_AtlasWidth = i719[22]
  i718.m_AtlasHeight = i719[23]
  i718.m_AtlasPadding = i719[24]
  i718.m_AtlasRenderMode = i719[25]
  var i727 = i719[26]
  var i726 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i727.length; i += 1) {
    i726.add(request.d('UnityEngine.TextCore.GlyphRect', i727[i + 0]));
  }
  i718.m_UsedGlyphRects = i726
  var i729 = i719[27]
  var i728 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i729.length; i += 1) {
    i728.add(request.d('UnityEngine.TextCore.GlyphRect', i729[i + 0]));
  }
  i718.m_FreeGlyphRects = i728
  i718.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i719[28], i718.m_FontFeatureTable)
  i718.m_ShouldReimportFontFeatures = !!i719[29]
  var i731 = i719[30]
  var i730 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i731.length; i += 2) {
  request.r(i731[i + 0], i731[i + 1], 1, i730, '')
  }
  i718.m_FallbackFontAssetTable = i730
  var i733 = i719[31]
  var i732 = []
  for(var i = 0; i < i733.length; i += 1) {
    i732.push( request.d('TMPro.TMP_FontWeightPair', i733[i + 0]) );
  }
  i718.m_FontWeightTable = i732
  var i735 = i719[32]
  var i734 = []
  for(var i = 0; i < i735.length; i += 1) {
    i734.push( request.d('TMPro.TMP_FontWeightPair', i735[i + 0]) );
  }
  i718.fontWeights = i734
  i718.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i719[33], i718.m_fontInfo)
  var i737 = i719[34]
  var i736 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i737.length; i += 1) {
    i736.add(request.d('TMPro.TMP_Glyph', i737[i + 0]));
  }
  i718.m_glyphInfoList = i736
  i718.m_KerningTable = request.d('TMPro.KerningTable', i719[35], i718.m_KerningTable)
  var i739 = i719[36]
  var i738 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i739.length; i += 2) {
  request.r(i739[i + 0], i739[i + 1], 1, i738, '')
  }
  i718.fallbackFontAssets = i738
  i718.m_Version = i719[37]
  i718.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i719[38], i718.m_FaceInfo)
  request.r(i719[39], i719[40], 0, i718, 'm_Material')
  return i718
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i740 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i741 = data
  i740.sourceFontFileName = i741[0]
  i740.sourceFontFileGUID = i741[1]
  i740.faceIndex = i741[2]
  i740.pointSizeSamplingMode = i741[3]
  i740.pointSize = i741[4]
  i740.padding = i741[5]
  i740.paddingMode = i741[6]
  i740.packingMode = i741[7]
  i740.atlasWidth = i741[8]
  i740.atlasHeight = i741[9]
  i740.characterSetSelectionMode = i741[10]
  i740.characterSequence = i741[11]
  i740.referencedFontAssetGUID = i741[12]
  i740.referencedTextAssetGUID = i741[13]
  i740.fontStyle = i741[14]
  i740.fontStyleModifier = i741[15]
  i740.renderMode = i741[16]
  i740.includeFontFeatures = !!i741[17]
  return i740
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i744 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i745 = data
  i744.m_Index = i745[0]
  i744.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i745[1], i744.m_Metrics)
  i744.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i745[2], i744.m_GlyphRect)
  i744.m_Scale = i745[3]
  i744.m_AtlasIndex = i745[4]
  i744.m_ClassDefinitionType = i745[5]
  return i744
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i746 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i747 = data
  i746.m_Width = i747[0]
  i746.m_Height = i747[1]
  i746.m_HorizontalBearingX = i747[2]
  i746.m_HorizontalBearingY = i747[3]
  i746.m_HorizontalAdvance = i747[4]
  return i746
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i748 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i749 = data
  i748.m_X = i749[0]
  i748.m_Y = i749[1]
  i748.m_Width = i749[2]
  i748.m_Height = i749[3]
  return i748
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i752 = root || request.c( 'TMPro.TMP_Character' )
  var i753 = data
  i752.m_ElementType = i753[0]
  i752.m_Unicode = i753[1]
  i752.m_GlyphIndex = i753[2]
  i752.m_Scale = i753[3]
  return i752
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i758 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i759 = data
  var i761 = i759[0]
  var i760 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i761.length; i += 1) {
    i760.add(request.d('TMPro.MultipleSubstitutionRecord', i761[i + 0]));
  }
  i758.m_MultipleSubstitutionRecords = i760
  var i763 = i759[1]
  var i762 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i763.length; i += 1) {
    i762.add(request.d('TMPro.LigatureSubstitutionRecord', i763[i + 0]));
  }
  i758.m_LigatureSubstitutionRecords = i762
  var i765 = i759[2]
  var i764 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i765.length; i += 1) {
    i764.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i765[i + 0]));
  }
  i758.m_GlyphPairAdjustmentRecords = i764
  var i767 = i759[3]
  var i766 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i767.length; i += 1) {
    i766.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i767[i + 0]));
  }
  i758.m_MarkToBaseAdjustmentRecords = i766
  var i769 = i759[4]
  var i768 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i769.length; i += 1) {
    i768.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i769[i + 0]));
  }
  i758.m_MarkToMarkAdjustmentRecords = i768
  return i758
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i772 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i773 = data
  i772.m_TargetGlyphID = i773[0]
  i772.m_SubstituteGlyphIDs = i773[1]
  return i772
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i776 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i777 = data
  i776.m_ComponentGlyphIDs = i777[0]
  i776.m_LigatureGlyphID = i777[1]
  return i776
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i780 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i781 = data
  i780.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i781[0], i780.m_FirstAdjustmentRecord)
  i780.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i781[1], i780.m_SecondAdjustmentRecord)
  i780.m_FeatureLookupFlags = i781[2]
  return i780
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i784 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i785 = data
  i784.m_BaseGlyphID = i785[0]
  i784.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i785[1], i784.m_BaseGlyphAnchorPoint)
  i784.m_MarkGlyphID = i785[2]
  i784.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i785[3], i784.m_MarkPositionAdjustment)
  return i784
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i788 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i789 = data
  i788.m_BaseMarkGlyphID = i789[0]
  i788.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i789[1], i788.m_BaseMarkGlyphAnchorPoint)
  i788.m_CombiningMarkGlyphID = i789[2]
  i788.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i789[3], i788.m_CombiningMarkPositionAdjustment)
  return i788
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i792 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i793 = data
  request.r(i793[0], i793[1], 0, i792, 'regularTypeface')
  request.r(i793[2], i793[3], 0, i792, 'italicTypeface')
  return i792
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i794 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i795 = data
  i794.Name = i795[0]
  i794.PointSize = i795[1]
  i794.Scale = i795[2]
  i794.CharacterCount = i795[3]
  i794.LineHeight = i795[4]
  i794.Baseline = i795[5]
  i794.Ascender = i795[6]
  i794.CapHeight = i795[7]
  i794.Descender = i795[8]
  i794.CenterLine = i795[9]
  i794.SuperscriptOffset = i795[10]
  i794.SubscriptOffset = i795[11]
  i794.SubSize = i795[12]
  i794.Underline = i795[13]
  i794.UnderlineThickness = i795[14]
  i794.strikethrough = i795[15]
  i794.strikethroughThickness = i795[16]
  i794.TabWidth = i795[17]
  i794.Padding = i795[18]
  i794.AtlasWidth = i795[19]
  i794.AtlasHeight = i795[20]
  return i794
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i798 = root || request.c( 'TMPro.TMP_Glyph' )
  var i799 = data
  i798.id = i799[0]
  i798.x = i799[1]
  i798.y = i799[2]
  i798.width = i799[3]
  i798.height = i799[4]
  i798.xOffset = i799[5]
  i798.yOffset = i799[6]
  i798.xAdvance = i799[7]
  i798.scale = i799[8]
  return i798
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i800 = root || request.c( 'TMPro.KerningTable' )
  var i801 = data
  var i803 = i801[0]
  var i802 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i803.length; i += 1) {
    i802.add(request.d('TMPro.KerningPair', i803[i + 0]));
  }
  i800.kerningPairs = i802
  return i800
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i806 = root || request.c( 'TMPro.KerningPair' )
  var i807 = data
  i806.xOffset = i807[0]
  i806.m_FirstGlyph = i807[1]
  i806.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i807[2], i806.m_FirstGlyphAdjustments)
  i806.m_SecondGlyph = i807[3]
  i806.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i807[4], i806.m_SecondGlyphAdjustments)
  i806.m_IgnoreSpacingAdjustments = !!i807[5]
  return i806
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i808 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i809 = data
  i808.m_FaceIndex = i809[0]
  i808.m_FamilyName = i809[1]
  i808.m_StyleName = i809[2]
  i808.m_PointSize = i809[3]
  i808.m_Scale = i809[4]
  i808.m_UnitsPerEM = i809[5]
  i808.m_LineHeight = i809[6]
  i808.m_AscentLine = i809[7]
  i808.m_CapLine = i809[8]
  i808.m_MeanLine = i809[9]
  i808.m_Baseline = i809[10]
  i808.m_DescentLine = i809[11]
  i808.m_SuperscriptOffset = i809[12]
  i808.m_SuperscriptSize = i809[13]
  i808.m_SubscriptOffset = i809[14]
  i808.m_SubscriptSize = i809[15]
  i808.m_UnderlineOffset = i809[16]
  i808.m_UnderlineThickness = i809[17]
  i808.m_StrikethroughOffset = i809[18]
  i808.m_StrikethroughThickness = i809[19]
  i808.m_TabWidth = i809[20]
  return i808
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i810 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i811 = data
  request.r(i811[0], i811[1], 0, i810, 'spriteSheet')
  var i813 = i811[2]
  var i812 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i813.length; i += 1) {
    i812.add(request.d('TMPro.TMP_Sprite', i813[i + 0]));
  }
  i810.spriteInfoList = i812
  var i815 = i811[3]
  var i814 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i815.length; i += 2) {
  request.r(i815[i + 0], i815[i + 1], 1, i814, '')
  }
  i810.fallbackSpriteAssets = i814
  var i817 = i811[4]
  var i816 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i817.length; i += 1) {
    i816.add(request.d('TMPro.TMP_SpriteCharacter', i817[i + 0]));
  }
  i810.m_SpriteCharacterTable = i816
  var i819 = i811[5]
  var i818 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i819.length; i += 1) {
    i818.add(request.d('TMPro.TMP_SpriteGlyph', i819[i + 0]));
  }
  i810.m_GlyphTable = i818
  i810.m_Version = i811[6]
  i810.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i811[7], i810.m_FaceInfo)
  request.r(i811[8], i811[9], 0, i810, 'm_Material')
  return i810
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i822 = root || request.c( 'TMPro.TMP_Sprite' )
  var i823 = data
  i822.name = i823[0]
  i822.hashCode = i823[1]
  i822.unicode = i823[2]
  i822.pivot = new pc.Vec2( i823[3], i823[4] )
  request.r(i823[5], i823[6], 0, i822, 'sprite')
  i822.id = i823[7]
  i822.x = i823[8]
  i822.y = i823[9]
  i822.width = i823[10]
  i822.height = i823[11]
  i822.xOffset = i823[12]
  i822.yOffset = i823[13]
  i822.xAdvance = i823[14]
  i822.scale = i823[15]
  return i822
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i828 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i829 = data
  i828.m_Name = i829[0]
  i828.m_ElementType = i829[1]
  i828.m_Unicode = i829[2]
  i828.m_GlyphIndex = i829[3]
  i828.m_Scale = i829[4]
  return i828
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i832 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i833 = data
  request.r(i833[0], i833[1], 0, i832, 'sprite')
  i832.m_Index = i833[2]
  i832.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i833[3], i832.m_Metrics)
  i832.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i833[4], i832.m_GlyphRect)
  i832.m_Scale = i833[5]
  i832.m_AtlasIndex = i833[6]
  i832.m_ClassDefinitionType = i833[7]
  return i832
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i834 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i835 = data
  var i837 = i835[0]
  var i836 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i837.length; i += 1) {
    i836.add(request.d('TMPro.TMP_Style', i837[i + 0]));
  }
  i834.m_StyleList = i836
  return i834
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i840 = root || request.c( 'TMPro.TMP_Style' )
  var i841 = data
  i840.m_Name = i841[0]
  i840.m_HashCode = i841[1]
  i840.m_OpeningDefinition = i841[2]
  i840.m_ClosingDefinition = i841[3]
  i840.m_OpeningTagArray = i841[4]
  i840.m_ClosingTagArray = i841[5]
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i843 = data
  var i845 = i843[0]
  var i844 = []
  for(var i = 0; i < i845.length; i += 1) {
    i844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i845[i + 0]) );
  }
  i842.files = i844
  i842.componentToPrefabIds = i843[1]
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i848 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i849 = data
  i848.path = i849[0]
  request.r(i849[1], i849[2], 0, i848, 'unityObject')
  return i848
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i851 = data
  var i853 = i851[0]
  var i852 = []
  for(var i = 0; i < i853.length; i += 1) {
    i852.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i853[i + 0]) );
  }
  i850.scriptsExecutionOrder = i852
  var i855 = i851[1]
  var i854 = []
  for(var i = 0; i < i855.length; i += 1) {
    i854.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i855[i + 0]) );
  }
  i850.sortingLayers = i854
  var i857 = i851[2]
  var i856 = []
  for(var i = 0; i < i857.length; i += 1) {
    i856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i857[i + 0]) );
  }
  i850.cullingLayers = i856
  i850.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i851[3], i850.timeSettings)
  i850.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i851[4], i850.physicsSettings)
  i850.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i851[5], i850.physics2DSettings)
  i850.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i851[6], i850.qualitySettings)
  i850.enableRealtimeShadows = !!i851[7]
  i850.enableAutoInstancing = !!i851[8]
  i850.enableStaticBatching = !!i851[9]
  i850.enableDynamicBatching = !!i851[10]
  i850.usePreservativeDynamicBatching = !!i851[11]
  i850.lightmapEncodingQuality = i851[12]
  i850.desiredColorSpace = i851[13]
  var i859 = i851[14]
  var i858 = []
  for(var i = 0; i < i859.length; i += 1) {
    i858.push( i859[i + 0] );
  }
  i850.allTags = i858
  return i850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i863 = data
  i862.name = i863[0]
  i862.value = i863[1]
  return i862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i867 = data
  i866.id = i867[0]
  i866.name = i867[1]
  i866.value = i867[2]
  return i866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i870 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i871 = data
  i870.id = i871[0]
  i870.name = i871[1]
  return i870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i873 = data
  i872.fixedDeltaTime = i873[0]
  i872.maximumDeltaTime = i873[1]
  i872.timeScale = i873[2]
  i872.maximumParticleTimestep = i873[3]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i875 = data
  i874.gravity = new pc.Vec3( i875[0], i875[1], i875[2] )
  i874.defaultSolverIterations = i875[3]
  i874.bounceThreshold = i875[4]
  i874.autoSyncTransforms = !!i875[5]
  i874.autoSimulation = !!i875[6]
  var i877 = i875[7]
  var i876 = []
  for(var i = 0; i < i877.length; i += 1) {
    i876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i877[i + 0]) );
  }
  i874.collisionMatrix = i876
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i881 = data
  i880.enabled = !!i881[0]
  i880.layerId = i881[1]
  i880.otherLayerId = i881[2]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i883 = data
  request.r(i883[0], i883[1], 0, i882, 'material')
  i882.gravity = new pc.Vec2( i883[2], i883[3] )
  i882.positionIterations = i883[4]
  i882.velocityIterations = i883[5]
  i882.velocityThreshold = i883[6]
  i882.maxLinearCorrection = i883[7]
  i882.maxAngularCorrection = i883[8]
  i882.maxTranslationSpeed = i883[9]
  i882.maxRotationSpeed = i883[10]
  i882.baumgarteScale = i883[11]
  i882.baumgarteTOIScale = i883[12]
  i882.timeToSleep = i883[13]
  i882.linearSleepTolerance = i883[14]
  i882.angularSleepTolerance = i883[15]
  i882.defaultContactOffset = i883[16]
  i882.autoSimulation = !!i883[17]
  i882.queriesHitTriggers = !!i883[18]
  i882.queriesStartInColliders = !!i883[19]
  i882.callbacksOnDisable = !!i883[20]
  i882.reuseCollisionCallbacks = !!i883[21]
  i882.autoSyncTransforms = !!i883[22]
  var i885 = i883[23]
  var i884 = []
  for(var i = 0; i < i885.length; i += 1) {
    i884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i885[i + 0]) );
  }
  i882.collisionMatrix = i884
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i889 = data
  i888.enabled = !!i889[0]
  i888.layerId = i889[1]
  i888.otherLayerId = i889[2]
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i891 = data
  var i893 = i891[0]
  var i892 = []
  for(var i = 0; i < i893.length; i += 1) {
    i892.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i893[i + 0]) );
  }
  i890.qualityLevels = i892
  var i895 = i891[1]
  var i894 = []
  for(var i = 0; i < i895.length; i += 1) {
    i894.push( i895[i + 0] );
  }
  i890.names = i894
  i890.shadows = i891[2]
  i890.anisotropicFiltering = i891[3]
  i890.antiAliasing = i891[4]
  i890.lodBias = i891[5]
  i890.shadowCascades = i891[6]
  i890.shadowDistance = i891[7]
  i890.shadowmaskMode = i891[8]
  i890.shadowProjection = i891[9]
  i890.shadowResolution = i891[10]
  i890.softParticles = !!i891[11]
  i890.softVegetation = !!i891[12]
  i890.activeColorSpace = i891[13]
  i890.desiredColorSpace = i891[14]
  i890.masterTextureLimit = i891[15]
  i890.maxQueuedFrames = i891[16]
  i890.particleRaycastBudget = i891[17]
  i890.pixelLightCount = i891[18]
  i890.realtimeReflectionProbes = !!i891[19]
  i890.shadowCascade2Split = i891[20]
  i890.shadowCascade4Split = new pc.Vec3( i891[21], i891[22], i891[23] )
  i890.streamingMipmapsActive = !!i891[24]
  i890.vSyncCount = i891[25]
  i890.asyncUploadBufferSize = i891[26]
  i890.asyncUploadTimeSlice = i891[27]
  i890.billboardsFaceCameraPosition = !!i891[28]
  i890.shadowNearPlaneOffset = i891[29]
  i890.streamingMipmapsMemoryBudget = i891[30]
  i890.maximumLODLevel = i891[31]
  i890.streamingMipmapsAddAllCameras = !!i891[32]
  i890.streamingMipmapsMaxLevelReduction = i891[33]
  i890.streamingMipmapsRenderersPerFrame = i891[34]
  i890.resolutionScalingFixedDPIFactor = i891[35]
  i890.streamingMipmapsMaxFileIORequests = i891[36]
  i890.currentQualityLevel = i891[37]
  return i890
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i898 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i899 = data
  i898.m_GlyphIndex = i899[0]
  i898.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i899[1], i898.m_GlyphValueRecord)
  return i898
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i900 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i901 = data
  i900.m_XCoordinate = i901[0]
  i900.m_YCoordinate = i901[1]
  return i900
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i902 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i903 = data
  i902.m_XPositionAdjustment = i903[0]
  i902.m_YPositionAdjustment = i903[1]
  return i902
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i904 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i905 = data
  i904.xPlacement = i905[0]
  i904.yPlacement = i905[1]
  i904.xAdvance = i905[2]
  i904.yAdvance = i905[3]
  return i904
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i906 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i907 = data
  i906.m_XPlacement = i907[0]
  i906.m_YPlacement = i907[1]
  i906.m_XAdvance = i907[2]
  i906.m_YAdvance = i907[3]
  return i906
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"39":[40],"41":[40],"42":[40],"43":[40],"44":[40],"45":[40],"46":[47],"48":[1],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[57],"58":[57],"59":[57],"60":[57],"61":[57],"62":[57],"63":[57],"64":[57],"65":[57],"66":[57],"67":[57],"68":[57],"69":[57],"70":[1],"71":[72],"73":[74],"75":[74],"7":[6],"76":[77],"78":[1],"79":[80],"81":[6],"82":[10,6],"83":[72],"84":[10,6],"85":[6],"86":[6],"87":[72,6],"88":[6,10],"89":[90],"91":[90],"92":[90],"93":[6],"94":[6],"9":[7],"14":[10,6],"11":[6],"8":[7],"95":[6],"96":[6],"97":[6],"98":[6],"99":[6],"100":[6],"101":[6],"102":[6],"103":[6],"12":[10,6],"19":[6],"104":[6],"105":[6],"106":[6],"23":[10,6],"107":[6],"108":[4],"109":[4],"5":[4],"110":[4],"111":[1],"112":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.RawImage","UnityEngine.Texture2D","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","SmoothChestOpening","UnityEngine.UI.RectMask2D","UnityEngine.Material","UnityEngine.UI.Outline","UnityEngine.CanvasGroup","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.UI.Button","ButtonScalePulse","UnityEngine.GameObject","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","GameController","CaseOpeningAudio","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "TE_V03";

Deserializers.lunaInitializationTime = "10/25/2026 13:39:35";

Deserializers.lunaDaysRunning = "1.5";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_TamNTM_TE_V03_DungNV";

Deserializers.lunaAppID = "38041";

Deserializers.projectId = "de7cc81c337b93e45867de51bca3fa5c";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1742";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5027";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.TE_V03";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "b77b3703-e869-4e87-b991-321c8c196a6a";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

