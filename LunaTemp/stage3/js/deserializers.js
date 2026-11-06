var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i406 = root || request.c( 'UnityEngine.JointSpring' )
  var i407 = data
  i406.spring = i407[0]
  i406.damper = i407[1]
  i406.targetPosition = i407[2]
  return i406
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i408 = root || request.c( 'UnityEngine.JointMotor' )
  var i409 = data
  i408.m_TargetVelocity = i409[0]
  i408.m_Force = i409[1]
  i408.m_FreeSpin = i409[2]
  return i408
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i410 = root || request.c( 'UnityEngine.JointLimits' )
  var i411 = data
  i410.m_Min = i411[0]
  i410.m_Max = i411[1]
  i410.m_Bounciness = i411[2]
  i410.m_BounceMinVelocity = i411[3]
  i410.m_ContactDistance = i411[4]
  i410.minBounce = i411[5]
  i410.maxBounce = i411[6]
  return i410
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i412 = root || request.c( 'UnityEngine.JointDrive' )
  var i413 = data
  i412.m_PositionSpring = i413[0]
  i412.m_PositionDamper = i413[1]
  i412.m_MaximumForce = i413[2]
  i412.m_UseAcceleration = i413[3]
  return i412
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i414 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i415 = data
  i414.m_Spring = i415[0]
  i414.m_Damper = i415[1]
  return i414
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i416 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i417 = data
  i416.m_Limit = i417[0]
  i416.m_Bounciness = i417[1]
  i416.m_ContactDistance = i417[2]
  return i416
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i418 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i419 = data
  i418.m_ExtremumSlip = i419[0]
  i418.m_ExtremumValue = i419[1]
  i418.m_AsymptoteSlip = i419[2]
  i418.m_AsymptoteValue = i419[3]
  i418.m_Stiffness = i419[4]
  return i418
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i420 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i421 = data
  i420.m_LowerAngle = i421[0]
  i420.m_UpperAngle = i421[1]
  return i420
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i422 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i423 = data
  i422.m_MotorSpeed = i423[0]
  i422.m_MaximumMotorTorque = i423[1]
  return i422
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i424 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i425 = data
  i424.m_DampingRatio = i425[0]
  i424.m_Frequency = i425[1]
  i424.m_Angle = i425[2]
  return i424
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i426 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i427 = data
  i426.m_LowerTranslation = i427[0]
  i426.m_UpperTranslation = i427[1]
  return i426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i429 = data
  i428.name = i429[0]
  i428.width = i429[1]
  i428.height = i429[2]
  i428.mipmapCount = i429[3]
  i428.anisoLevel = i429[4]
  i428.filterMode = i429[5]
  i428.hdr = !!i429[6]
  i428.format = i429[7]
  i428.wrapMode = i429[8]
  i428.alphaIsTransparency = !!i429[9]
  i428.alphaSource = i429[10]
  i428.graphicsFormat = i429[11]
  i428.sRGBTexture = !!i429[12]
  i428.desiredColorSpace = i429[13]
  i428.wrapU = i429[14]
  i428.wrapV = i429[15]
  return i428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i430 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i431 = data
  i430.name = i431[0]
  i430.halfPrecision = !!i431[1]
  i430.useSimplification = !!i431[2]
  i430.useUInt32IndexFormat = !!i431[3]
  i430.vertexCount = i431[4]
  i430.aabb = i431[5]
  var i433 = i431[6]
  var i432 = []
  for(var i = 0; i < i433.length; i += 1) {
    i432.push( !!i433[i + 0] );
  }
  i430.streams = i432
  i430.vertices = i431[7]
  var i435 = i431[8]
  var i434 = []
  for(var i = 0; i < i435.length; i += 1) {
    i434.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i435[i + 0]) );
  }
  i430.subMeshes = i434
  var i437 = i431[9]
  var i436 = []
  for(var i = 0; i < i437.length; i += 16) {
    i436.push( new pc.Mat4().setData(i437[i + 0], i437[i + 1], i437[i + 2], i437[i + 3],  i437[i + 4], i437[i + 5], i437[i + 6], i437[i + 7],  i437[i + 8], i437[i + 9], i437[i + 10], i437[i + 11],  i437[i + 12], i437[i + 13], i437[i + 14], i437[i + 15]) );
  }
  i430.bindposes = i436
  var i439 = i431[10]
  var i438 = []
  for(var i = 0; i < i439.length; i += 1) {
    i438.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i439[i + 0]) );
  }
  i430.blendShapes = i438
  return i430
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i445 = data
  i444.triangles = i445[0]
  return i444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i451 = data
  i450.name = i451[0]
  var i453 = i451[1]
  var i452 = []
  for(var i = 0; i < i453.length; i += 1) {
    i452.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i453[i + 0]) );
  }
  i450.frames = i452
  return i450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i454 = root || new pc.UnityMaterial()
  var i455 = data
  i454.name = i455[0]
  request.r(i455[1], i455[2], 0, i454, 'shader')
  i454.renderQueue = i455[3]
  i454.enableInstancing = !!i455[4]
  var i457 = i455[5]
  var i456 = []
  for(var i = 0; i < i457.length; i += 1) {
    i456.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i457[i + 0]) );
  }
  i454.floatParameters = i456
  var i459 = i455[6]
  var i458 = []
  for(var i = 0; i < i459.length; i += 1) {
    i458.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i459[i + 0]) );
  }
  i454.colorParameters = i458
  var i461 = i455[7]
  var i460 = []
  for(var i = 0; i < i461.length; i += 1) {
    i460.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i461[i + 0]) );
  }
  i454.vectorParameters = i460
  var i463 = i455[8]
  var i462 = []
  for(var i = 0; i < i463.length; i += 1) {
    i462.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i463[i + 0]) );
  }
  i454.textureParameters = i462
  var i465 = i455[9]
  var i464 = []
  for(var i = 0; i < i465.length; i += 1) {
    i464.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i465[i + 0]) );
  }
  i454.materialFlags = i464
  return i454
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i469 = data
  i468.name = i469[0]
  i468.value = i469[1]
  return i468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i473 = data
  i472.name = i473[0]
  i472.value = new pc.Color(i473[1], i473[2], i473[3], i473[4])
  return i472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i477 = data
  i476.name = i477[0]
  i476.value = new pc.Vec4( i477[1], i477[2], i477[3], i477[4] )
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i480 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i481 = data
  i480.name = i481[0]
  request.r(i481[1], i481[2], 0, i480, 'value')
  return i480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i484 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i485 = data
  i484.name = i485[0]
  i484.enabled = !!i485[1]
  return i484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i486 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i487 = data
  i486.position = new pc.Vec3( i487[0], i487[1], i487[2] )
  i486.scale = new pc.Vec3( i487[3], i487[4], i487[5] )
  i486.rotation = new pc.Quat(i487[6], i487[7], i487[8], i487[9])
  return i486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i489 = data
  request.r(i489[0], i489[1], 0, i488, 'sharedMesh')
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i491 = data
  request.r(i491[0], i491[1], 0, i490, 'additionalVertexStreams')
  i490.enabled = !!i491[2]
  request.r(i491[3], i491[4], 0, i490, 'sharedMaterial')
  var i493 = i491[5]
  var i492 = []
  for(var i = 0; i < i493.length; i += 2) {
  request.r(i493[i + 0], i493[i + 1], 2, i492, '')
  }
  i490.sharedMaterials = i492
  i490.receiveShadows = !!i491[6]
  i490.shadowCastingMode = i491[7]
  i490.sortingLayerID = i491[8]
  i490.sortingOrder = i491[9]
  i490.lightmapIndex = i491[10]
  i490.lightmapSceneIndex = i491[11]
  i490.lightmapScaleOffset = new pc.Vec4( i491[12], i491[13], i491[14], i491[15] )
  i490.lightProbeUsage = i491[16]
  i490.reflectionProbeUsage = i491[17]
  return i490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i497 = data
  i496.name = i497[0]
  i496.tagId = i497[1]
  i496.enabled = !!i497[2]
  i496.isStatic = !!i497[3]
  i496.layer = i497[4]
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i499 = data
  i498.name = i499[0]
  i498.atlasId = i499[1]
  i498.mipmapCount = i499[2]
  i498.hdr = !!i499[3]
  i498.size = i499[4]
  i498.anisoLevel = i499[5]
  i498.filterMode = i499[6]
  var i501 = i499[7]
  var i500 = []
  for(var i = 0; i < i501.length; i += 4) {
    i500.push( UnityEngine.Rect.MinMaxRect(i501[i + 0], i501[i + 1], i501[i + 2], i501[i + 3]) );
  }
  i498.rects = i500
  i498.wrapU = i499[8]
  i498.wrapV = i499[9]
  return i498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i504 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i505 = data
  i504.name = i505[0]
  i504.index = i505[1]
  i504.startup = !!i505[2]
  return i504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i506 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i507 = data
  i506.aspect = i507[0]
  i506.orthographic = !!i507[1]
  i506.orthographicSize = i507[2]
  i506.backgroundColor = new pc.Color(i507[3], i507[4], i507[5], i507[6])
  i506.nearClipPlane = i507[7]
  i506.farClipPlane = i507[8]
  i506.fieldOfView = i507[9]
  i506.depth = i507[10]
  i506.clearFlags = i507[11]
  i506.cullingMask = i507[12]
  i506.rect = i507[13]
  request.r(i507[14], i507[15], 0, i506, 'targetTexture')
  i506.usePhysicalProperties = !!i507[16]
  i506.focalLength = i507[17]
  i506.sensorSize = new pc.Vec2( i507[18], i507[19] )
  i506.lensShift = new pc.Vec2( i507[20], i507[21] )
  i506.gateFit = i507[22]
  i506.commandBufferCount = i507[23]
  i506.cameraType = i507[24]
  i506.enabled = !!i507[25]
  return i506
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i508 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i509 = data
  i508.m_RenderShadows = !!i509[0]
  i508.m_RequiresDepthTextureOption = i509[1]
  i508.m_RequiresOpaqueTextureOption = i509[2]
  i508.m_CameraType = i509[3]
  var i511 = i509[4]
  var i510 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i511.length; i += 2) {
  request.r(i511[i + 0], i511[i + 1], 1, i510, '')
  }
  i508.m_Cameras = i510
  i508.m_RendererIndex = i509[5]
  i508.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i509[6] )
  request.r(i509[7], i509[8], 0, i508, 'm_VolumeTrigger')
  i508.m_VolumeFrameworkUpdateModeOption = i509[9]
  i508.m_RenderPostProcessing = !!i509[10]
  i508.m_Antialiasing = i509[11]
  i508.m_AntialiasingQuality = i509[12]
  i508.m_StopNaN = !!i509[13]
  i508.m_Dithering = !!i509[14]
  i508.m_ClearDepth = !!i509[15]
  i508.m_AllowXRRendering = !!i509[16]
  i508.m_AllowHDROutput = !!i509[17]
  i508.m_UseScreenCoordOverride = !!i509[18]
  i508.m_ScreenSizeOverride = new pc.Vec4( i509[19], i509[20], i509[21], i509[22] )
  i508.m_ScreenCoordScaleBias = new pc.Vec4( i509[23], i509[24], i509[25], i509[26] )
  i508.m_RequiresDepthTexture = !!i509[27]
  i508.m_RequiresColorTexture = !!i509[28]
  i508.m_Version = i509[29]
  i508.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i509[30], i508.m_TaaSettings)
  return i508
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i514 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i515 = data
  i514.m_Quality = i515[0]
  i514.m_FrameInfluence = i515[1]
  i514.m_JitterScale = i515[2]
  i514.m_MipBias = i515[3]
  i514.m_VarianceClampScale = i515[4]
  i514.m_ContrastAdaptiveSharpening = i515[5]
  return i514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i516 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i517 = data
  i516.type = i517[0]
  i516.color = new pc.Color(i517[1], i517[2], i517[3], i517[4])
  i516.cullingMask = i517[5]
  i516.intensity = i517[6]
  i516.range = i517[7]
  i516.spotAngle = i517[8]
  i516.shadows = i517[9]
  i516.shadowNormalBias = i517[10]
  i516.shadowBias = i517[11]
  i516.shadowStrength = i517[12]
  i516.shadowResolution = i517[13]
  i516.lightmapBakeType = i517[14]
  i516.renderMode = i517[15]
  request.r(i517[16], i517[17], 0, i516, 'cookie')
  i516.cookieSize = i517[18]
  i516.shadowNearPlane = i517[19]
  i516.occlusionMaskChannel = i517[20]
  i516.isBaked = !!i517[21]
  i516.mixedLightingMode = i517[22]
  i516.enabled = !!i517[23]
  return i516
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i519 = data
  i518.m_Version = i519[0]
  i518.m_UsePipelineSettings = !!i519[1]
  i518.m_AdditionalLightsShadowResolutionTier = i519[2]
  i518.m_LightLayerMask = i519[3]
  i518.m_RenderingLayers = i519[4]
  i518.m_CustomShadowLayers = !!i519[5]
  i518.m_ShadowLayerMask = i519[6]
  i518.m_ShadowRenderingLayers = i519[7]
  i518.m_LightCookieSize = new pc.Vec2( i519[8], i519[9] )
  i518.m_LightCookieOffset = new pc.Vec2( i519[10], i519[11] )
  i518.m_SoftShadowQuality = i519[12]
  return i518
}

Deserializers["UnityEngine.Rendering.Volume"] = function (request, data, root) {
  var i520 = root || request.c( 'UnityEngine.Rendering.Volume' )
  var i521 = data
  i520.priority = i521[0]
  i520.blendDistance = i521[1]
  i520.weight = i521[2]
  request.r(i521[3], i521[4], 0, i520, 'sharedProfile')
  i520.m_IsGlobal = !!i521[5]
  return i520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i523 = data
  request.r(i523[0], i523[1], 0, i522, 'clip')
  request.r(i523[2], i523[3], 0, i522, 'outputAudioMixerGroup')
  i522.playOnAwake = !!i523[4]
  i522.loop = !!i523[5]
  i522.time = i523[6]
  i522.volume = i523[7]
  i522.pitch = i523[8]
  i522.enabled = !!i523[9]
  return i522
}

Deserializers["CEBB.Playable.LivingRoomPlayable"] = function (request, data, root) {
  var i524 = root || request.c( 'CEBB.Playable.LivingRoomPlayable' )
  var i525 = data
  var i527 = i525[0]
  var i526 = []
  for(var i = 0; i < i527.length; i += 1) {
    i526.push( request.d('CEBB.Playable.DecorCatalogEntry', i527[i + 0]) );
  }
  i524.catalog = i526
  i524.firstEntry = i525[1]
  i524.guideEntry = i525[2]
  request.r(i525[3], i525[4], 0, i524, 'lookGuide')
  i524.lookGuideRadius = new pc.Vec2( i525[5], i525[6] )
  i524.lookTutorialDegrees = i525[7]
  i524.moveTutorialDistance = i525[8]
  request.r(i525[9], i525[10], 0, i524, 'roomRoot')
  request.r(i525[11], i525[12], 0, i524, 'placedRoot')
  request.r(i525[13], i525[14], 0, i524, 'ghostMaterial')
  request.r(i525[15], i525[16], 0, i524, 'ghostInvalidMaterial')
  request.r(i525[17], i525[18], 0, i524, 'deleteMarker')
  request.r(i525[19], i525[20], 0, i524, 'footprintMarker')
  i524.roomMin = new pc.Vec2( i525[21], i525[22] )
  i524.roomMax = new pc.Vec2( i525[23], i525[24] )
  i524.roomHeight = i525[25]
  i524.snap = i525[26]
  i524.buildReach = i525[27]
  request.r(i525[28], i525[29], 0, i524, 'player')
  request.r(i525[30], i525[31], 0, i524, 'luna')
  request.r(i525[32], i525[33], 0, i524, 'promptText')
  request.r(i525[34], i525[35], 0, i524, 'countText')
  request.r(i525[36], i525[37], 0, i524, 'buildLabel')
  request.r(i525[38], i525[39], 0, i524, 'hand')
  request.r(i525[40], i525[41], 0, i524, 'buildButton')
  request.r(i525[42], i525[43], 0, i524, 'trashButton')
  request.r(i525[44], i525[45], 0, i524, 'rotateButton')
  request.r(i525[46], i525[47], 0, i524, 'ctaButton')
  request.r(i525[48], i525[49], 0, i524, 'trashImage')
  request.r(i525[50], i525[51], 0, i524, 'reticle')
  request.r(i525[52], i525[53], 0, i524, 'buildFill')
  i524.firstPrompt = i525[54]
  i524.selectPrompt = i525[55]
  i524.lookPrompt = i525[56]
  i524.movePrompt = i525[57]
  i524.aimPrompt = i525[58]
  i524.buildPrompt = i525[59]
  i524.freePrompt = i525[60]
  i524.trashPrompt = i525[61]
  i524.deletePrompt = i525[62]
  i524.emptyPrompt = i525[63]
  i524.overlapPrompt = i525[64]
  i524.playerPrompt = i525[65]
  i524.wallPrompt = i525[66]
  i524.heightPrompt = i525[67]
  i524.revealSeconds = i525[68]
  request.r(i525[69], i525[70], 0, i524, 'placementAudio')
  request.r(i525[71], i525[72], 0, i524, 'placementSfx')
  i524.placementVolume = i525[73]
  request.r(i525[74], i525[75], 0, i524, 'bgmSource')
  request.r(i525[76], i525[77], 0, i524, 'bgmClip')
  i524.bgmVolume = i525[78]
  i524.bgmEnabled = !!i525[79]
  i524.onGameStarted = request.d('UnityEngine.Events.UnityEvent', i525[80], i524.onGameStarted)
  i524.onGameEnded = request.d('UnityEngine.Events.UnityEvent', i525[81], i524.onGameEnded)
  i524.onCtaClicked = request.d('UnityEngine.Events.UnityEvent', i525[82], i524.onCtaClicked)
  i524.onFurniturePlaced = request.d('UnityEngine.Events.UnityEvent', i525[83], i524.onFurniturePlaced)
  i524.stage = i525[84]
  i524.interactionCount = i525[85]
  i524.builtCount = i525[86]
  i524.placementsTotal = i525[87]
  i524.selected = i525[88]
  return i524
}

Deserializers["CEBB.Playable.DecorCatalogEntry"] = function (request, data, root) {
  var i530 = root || request.c( 'CEBB.Playable.DecorCatalogEntry' )
  var i531 = data
  request.r(i531[0], i531[1], 0, i530, 'item')
  request.r(i531[2], i531[3], 0, i530, 'button')
  request.r(i531[4], i531[5], 0, i530, 'frame')
  request.r(i531[6], i531[7], 0, i530, 'icon')
  request.r(i531[8], i531[9], 0, i530, 'quantityText')
  request.r(i531[10], i531[11], 0, i530, 'nameText')
  request.r(i531[12], i531[13], 0, i530, 'emptyBadge')
  return i530
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i532 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i533 = data
  i532.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i533[0], i532.m_PersistentCalls)
  return i532
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i534 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i535 = data
  var i537 = i535[0]
  var i536 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i537.length; i += 1) {
    i536.add(request.d('UnityEngine.Events.PersistentCall', i537[i + 0]));
  }
  i534.m_Calls = i536
  return i534
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i540 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i541 = data
  request.r(i541[0], i541[1], 0, i540, 'm_Target')
  i540.m_TargetAssemblyTypeName = i541[2]
  i540.m_MethodName = i541[3]
  i540.m_Mode = i541[4]
  i540.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i541[5], i540.m_Arguments)
  i540.m_CallState = i541[6]
  return i540
}

Deserializers["CEBB.Playable.LunaController"] = function (request, data, root) {
  var i542 = root || request.c( 'CEBB.Playable.LunaController' )
  var i543 = data
  i542.timeLimit = i543[0]
  i542.itemsToEnd = i543[1]
  i542.clicksToEnd = i543[2]
  request.r(i543[3], i543[4], 0, i542, 'gameLogo')
  request.r(i543[5], i543[6], 0, i542, 'logoImage')
  request.r(i543[7], i543[8], 0, i542, 'game')
  request.r(i543[9], i543[10], 0, i542, 'ctaOverlay')
  request.r(i543[11], i543[12], 0, i542, 'timerText')
  return i542
}

Deserializers["CEBB.Playable.BedroomLayout"] = function (request, data, root) {
  var i544 = root || request.c( 'CEBB.Playable.BedroomLayout' )
  var i545 = data
  request.r(i545[0], i545[1], 0, i544, 'roomCamera')
  request.r(i545[2], i545[3], 0, i544, 'canvas')
  request.r(i545[4], i545[5], 0, i544, 'catalog')
  request.r(i545[6], i545[7], 0, i544, 'grid')
  request.r(i545[8], i545[9], 0, i544, 'header')
  request.r(i545[10], i545[11], 0, i544, 'prompt')
  request.r(i545[12], i545[13], 0, i544, 'cta')
  request.r(i545[14], i545[15], 0, i544, 'progress')
  request.r(i545[16], i545[17], 0, i544, 'stats')
  request.r(i545[18], i545[19], 0, i544, 'movePad')
  i544.firstPersonMode = !!i545[20]
  i544.lookTarget = new pc.Vec3( i545[21], i545[22], i545[23] )
  i544.viewOffset = new pc.Vec3( i545[24], i545[25], i545[26] )
  i544.respectSafeArea = !!i545[27]
  return i544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i547 = data
  i546.pivot = new pc.Vec2( i547[0], i547[1] )
  i546.anchorMin = new pc.Vec2( i547[2], i547[3] )
  i546.anchorMax = new pc.Vec2( i547[4], i547[5] )
  i546.sizeDelta = new pc.Vec2( i547[6], i547[7] )
  i546.anchoredPosition3D = new pc.Vec3( i547[8], i547[9], i547[10] )
  i546.rotation = new pc.Quat(i547[11], i547[12], i547[13], i547[14])
  i546.scale = new pc.Vec3( i547[15], i547[16], i547[17] )
  return i546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i549 = data
  i548.planeDistance = i549[0]
  i548.referencePixelsPerUnit = i549[1]
  i548.isFallbackOverlay = !!i549[2]
  i548.renderMode = i549[3]
  i548.renderOrder = i549[4]
  i548.sortingLayerName = i549[5]
  i548.sortingOrder = i549[6]
  i548.scaleFactor = i549[7]
  request.r(i549[8], i549[9], 0, i548, 'worldCamera')
  i548.overrideSorting = !!i549[10]
  i548.pixelPerfect = !!i549[11]
  i548.targetDisplay = i549[12]
  i548.overridePixelPerfect = !!i549[13]
  i548.enabled = !!i549[14]
  return i548
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i550 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i551 = data
  i550.m_UiScaleMode = i551[0]
  i550.m_ReferencePixelsPerUnit = i551[1]
  i550.m_ScaleFactor = i551[2]
  i550.m_ReferenceResolution = new pc.Vec2( i551[3], i551[4] )
  i550.m_ScreenMatchMode = i551[5]
  i550.m_MatchWidthOrHeight = i551[6]
  i550.m_PhysicalUnit = i551[7]
  i550.m_FallbackScreenDPI = i551[8]
  i550.m_DefaultSpriteDPI = i551[9]
  i550.m_DynamicPixelsPerUnit = i551[10]
  i550.m_PresetInfoIsWorld = !!i551[11]
  return i550
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i552 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i553 = data
  i552.m_IgnoreReversedGraphics = !!i553[0]
  i552.m_BlockingObjects = i553[1]
  i552.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i553[2] )
  return i552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i555 = data
  i554.cullTransparentMesh = !!i555[0]
  return i554
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i556 = root || request.c( 'UnityEngine.UI.Image' )
  var i557 = data
  request.r(i557[0], i557[1], 0, i556, 'm_Sprite')
  i556.m_Type = i557[2]
  i556.m_PreserveAspect = !!i557[3]
  i556.m_FillCenter = !!i557[4]
  i556.m_FillMethod = i557[5]
  i556.m_FillAmount = i557[6]
  i556.m_FillClockwise = !!i557[7]
  i556.m_FillOrigin = i557[8]
  i556.m_UseSpriteMesh = !!i557[9]
  i556.m_PixelsPerUnitMultiplier = i557[10]
  request.r(i557[11], i557[12], 0, i556, 'm_Material')
  i556.m_Maskable = !!i557[13]
  i556.m_Color = new pc.Color(i557[14], i557[15], i557[16], i557[17])
  i556.m_RaycastTarget = !!i557[18]
  i556.m_RaycastPadding = new pc.Vec4( i557[19], i557[20], i557[21], i557[22] )
  return i556
}

Deserializers["CEBB.Playable.LivingRoomLookSurface"] = function (request, data, root) {
  var i558 = root || request.c( 'CEBB.Playable.LivingRoomLookSurface' )
  var i559 = data
  request.r(i559[0], i559[1], 0, i558, 'player')
  return i558
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i560 = root || request.c( 'UnityEngine.UI.Button' )
  var i561 = data
  i560.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i561[0], i560.m_OnClick)
  i560.m_Navigation = request.d('UnityEngine.UI.Navigation', i561[1], i560.m_Navigation)
  i560.m_Transition = i561[2]
  i560.m_Colors = request.d('UnityEngine.UI.ColorBlock', i561[3], i560.m_Colors)
  i560.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i561[4], i560.m_SpriteState)
  i560.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i561[5], i560.m_AnimationTriggers)
  i560.m_Interactable = !!i561[6]
  request.r(i561[7], i561[8], 0, i560, 'm_TargetGraphic')
  return i560
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i562 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i563 = data
  i562.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i563[0], i562.m_PersistentCalls)
  return i562
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i564 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i565 = data
  i564.m_Mode = i565[0]
  i564.m_WrapAround = !!i565[1]
  request.r(i565[2], i565[3], 0, i564, 'm_SelectOnUp')
  request.r(i565[4], i565[5], 0, i564, 'm_SelectOnDown')
  request.r(i565[6], i565[7], 0, i564, 'm_SelectOnLeft')
  request.r(i565[8], i565[9], 0, i564, 'm_SelectOnRight')
  return i564
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i566 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i567 = data
  i566.m_NormalColor = new pc.Color(i567[0], i567[1], i567[2], i567[3])
  i566.m_HighlightedColor = new pc.Color(i567[4], i567[5], i567[6], i567[7])
  i566.m_PressedColor = new pc.Color(i567[8], i567[9], i567[10], i567[11])
  i566.m_SelectedColor = new pc.Color(i567[12], i567[13], i567[14], i567[15])
  i566.m_DisabledColor = new pc.Color(i567[16], i567[17], i567[18], i567[19])
  i566.m_ColorMultiplier = i567[20]
  i566.m_FadeDuration = i567[21]
  return i566
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i568 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i569 = data
  request.r(i569[0], i569[1], 0, i568, 'm_HighlightedSprite')
  request.r(i569[2], i569[3], 0, i568, 'm_PressedSprite')
  request.r(i569[4], i569[5], 0, i568, 'm_SelectedSprite')
  request.r(i569[6], i569[7], 0, i568, 'm_DisabledSprite')
  return i568
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i570 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i571 = data
  i570.m_NormalTrigger = i571[0]
  i570.m_HighlightedTrigger = i571[1]
  i570.m_PressedTrigger = i571[2]
  i570.m_SelectedTrigger = i571[3]
  i570.m_DisabledTrigger = i571[4]
  return i570
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i572 = root || request.c( 'UnityEngine.UI.Text' )
  var i573 = data
  i572.m_FontData = request.d('UnityEngine.UI.FontData', i573[0], i572.m_FontData)
  i572.m_Text = i573[1]
  request.r(i573[2], i573[3], 0, i572, 'm_Material')
  i572.m_Maskable = !!i573[4]
  i572.m_Color = new pc.Color(i573[5], i573[6], i573[7], i573[8])
  i572.m_RaycastTarget = !!i573[9]
  i572.m_RaycastPadding = new pc.Vec4( i573[10], i573[11], i573[12], i573[13] )
  return i572
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i574 = root || request.c( 'UnityEngine.UI.FontData' )
  var i575 = data
  request.r(i575[0], i575[1], 0, i574, 'm_Font')
  i574.m_FontSize = i575[2]
  i574.m_FontStyle = i575[3]
  i574.m_BestFit = !!i575[4]
  i574.m_MinSize = i575[5]
  i574.m_MaxSize = i575[6]
  i574.m_Alignment = i575[7]
  i574.m_AlignByGeometry = !!i575[8]
  i574.m_RichText = !!i575[9]
  i574.m_HorizontalOverflow = i575[10]
  i574.m_VerticalOverflow = i575[11]
  i574.m_LineSpacing = i575[12]
  return i574
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i576 = root || request.c( 'UnityEngine.UI.Outline' )
  var i577 = data
  i576.m_EffectColor = new pc.Color(i577[0], i577[1], i577[2], i577[3])
  i576.m_EffectDistance = new pc.Vec2( i577[4], i577[5] )
  i576.m_UseGraphicAlpha = !!i577[6]
  return i576
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i578 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i579 = data
  i578.m_StartCorner = i579[0]
  i578.m_StartAxis = i579[1]
  i578.m_CellSize = new pc.Vec2( i579[2], i579[3] )
  i578.m_Spacing = new pc.Vec2( i579[4], i579[5] )
  i578.m_Constraint = i579[6]
  i578.m_ConstraintCount = i579[7]
  i578.m_Padding = UnityEngine.RectOffset.FromPaddings(i579[8], i579[9], i579[10], i579[11])
  i578.m_ChildAlignment = i579[12]
  return i578
}

Deserializers["UnityEngine.UI.LayoutElement"] = function (request, data, root) {
  var i580 = root || request.c( 'UnityEngine.UI.LayoutElement' )
  var i581 = data
  i580.m_IgnoreLayout = !!i581[0]
  i580.m_MinWidth = i581[1]
  i580.m_MinHeight = i581[2]
  i580.m_PreferredWidth = i581[3]
  i580.m_PreferredHeight = i581[4]
  i580.m_FlexibleWidth = i581[5]
  i580.m_FlexibleHeight = i581[6]
  i580.m_LayoutPriority = i581[7]
  return i580
}

Deserializers["CEBB.Playable.RoomMovePad"] = function (request, data, root) {
  var i582 = root || request.c( 'CEBB.Playable.RoomMovePad' )
  var i583 = data
  request.r(i583[0], i583[1], 0, i582, 'thumbRect')
  i582.demo = !!i583[2]
  i582.demoPull = i583[3]
  i582.demoCycleSeconds = i583[4]
  return i582
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i584 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i585 = data
  request.r(i585[0], i585[1], 0, i584, 'm_FirstSelected')
  i584.m_sendNavigationEvents = !!i585[2]
  i584.m_DragThreshold = i585[3]
  return i584
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i586 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i587 = data
  i586.m_HorizontalAxis = i587[0]
  i586.m_VerticalAxis = i587[1]
  i586.m_SubmitButton = i587[2]
  i586.m_CancelButton = i587[3]
  i586.m_InputActionsPerSecond = i587[4]
  i586.m_RepeatDelay = i587[5]
  i586.m_ForceModuleActive = !!i587[6]
  i586.m_SendPointerHoverToParent = !!i587[7]
  return i586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i589 = data
  i588.center = new pc.Vec3( i589[0], i589[1], i589[2] )
  i588.size = new pc.Vec3( i589[3], i589[4], i589[5] )
  i588.enabled = !!i589[6]
  i588.isTrigger = !!i589[7]
  request.r(i589[8], i589[9], 0, i588, 'material')
  return i588
}

Deserializers["CEBB.Playable.PlacementSurface"] = function (request, data, root) {
  var i590 = root || request.c( 'CEBB.Playable.PlacementSurface' )
  var i591 = data
  i590.allowWallItems = !!i591[0]
  return i590
}

Deserializers["CEBB.Playable.LivingRoomPlayer"] = function (request, data, root) {
  var i592 = root || request.c( 'CEBB.Playable.LivingRoomPlayer' )
  var i593 = data
  request.r(i593[0], i593[1], 0, i592, 'game')
  request.r(i593[2], i593[3], 0, i592, 'playerCamera')
  request.r(i593[4], i593[5], 0, i592, 'movePad')
  i592.spawnPosition = new pc.Vec3( i593[6], i593[7], i593[8] )
  i592.eyeHeight = i593[9]
  i592.walkSpeed = i593[10]
  i592.lookSensitivity = i593[11]
  i592.yaw = i593[12]
  i592.pitch = i593[13]
  i592.bodyRadius = i593[14]
  return i592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i595 = data
  i594.ambientIntensity = i595[0]
  i594.reflectionIntensity = i595[1]
  i594.ambientMode = i595[2]
  i594.ambientLight = new pc.Color(i595[3], i595[4], i595[5], i595[6])
  i594.ambientSkyColor = new pc.Color(i595[7], i595[8], i595[9], i595[10])
  i594.ambientGroundColor = new pc.Color(i595[11], i595[12], i595[13], i595[14])
  i594.ambientEquatorColor = new pc.Color(i595[15], i595[16], i595[17], i595[18])
  i594.fogColor = new pc.Color(i595[19], i595[20], i595[21], i595[22])
  i594.fogEndDistance = i595[23]
  i594.fogStartDistance = i595[24]
  i594.fogDensity = i595[25]
  i594.fog = !!i595[26]
  request.r(i595[27], i595[28], 0, i594, 'skybox')
  i594.fogMode = i595[29]
  var i597 = i595[30]
  var i596 = []
  for(var i = 0; i < i597.length; i += 1) {
    i596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i597[i + 0]) );
  }
  i594.lightmaps = i596
  i594.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i595[31], i594.lightProbes)
  i594.lightmapsMode = i595[32]
  i594.mixedBakeMode = i595[33]
  i594.environmentLightingMode = i595[34]
  i594.ambientProbe = new pc.SphericalHarmonicsL2(i595[35])
  request.r(i595[36], i595[37], 0, i594, 'customReflection')
  request.r(i595[38], i595[39], 0, i594, 'defaultReflection')
  i594.defaultReflectionMode = i595[40]
  i594.defaultReflectionResolution = i595[41]
  i594.sunLightObjectId = i595[42]
  i594.pixelLightCount = i595[43]
  i594.defaultReflectionHDR = !!i595[44]
  i594.hasLightDataAsset = !!i595[45]
  i594.hasManualGenerate = !!i595[46]
  return i594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i601 = data
  request.r(i601[0], i601[1], 0, i600, 'lightmapColor')
  request.r(i601[2], i601[3], 0, i600, 'lightmapDirection')
  request.r(i601[4], i601[5], 0, i600, 'shadowMask')
  return i600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i602 = root || new UnityEngine.LightProbes()
  var i603 = data
  return i602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset"] = function (request, data, root) {
  var i610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset' )
  var i611 = data
  i610.AdditionalLightsRenderingMode = i611[0]
  i610.LightRenderingMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode', i611[1], i610.LightRenderingMode)
  i610.MainLightRenderingModeValue = i611[2]
  i610.SupportsMainLightShadows = !!i611[3]
  i610.MixedLightingSupported = !!i611[4]
  i610.MainLightShadowmapResolutionValue = i611[5]
  i610.SupportsSoftShadows = !!i611[6]
  i610.SoftShadowQualityValue = i611[7]
  i610.ShadowDistance = i611[8]
  i610.ShadowCascadeCount = i611[9]
  i610.Cascade2Split = i611[10]
  i610.Cascade3Split = new pc.Vec2( i611[11], i611[12] )
  i610.Cascade4Split = new pc.Vec3( i611[13], i611[14], i611[15] )
  i610.CascadeBorder = i611[16]
  i610.ShadowDepthBias = i611[17]
  i610.ShadowNormalBias = i611[18]
  i610.RequireDepthTexture = !!i611[19]
  i610.RequireOpaqueTexture = !!i611[20]
  i610.scriptableRendererData = request.d('Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData', i611[21], i610.scriptableRendererData)
  return i610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode"] = function (request, data, root) {
  var i612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode' )
  var i613 = data
  i612.Disabled = i613[0]
  i612.PerVertex = i613[1]
  i612.PerPixel = i613[2]
  return i612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData"] = function (request, data, root) {
  var i614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData' )
  var i615 = data
  i614.opaqueLayerMask = i615[0]
  i614.transparentLayerMask = i615[1]
  var i617 = i615[2]
  var i616 = []
  for(var i = 0; i < i617.length; i += 1) {
    i616.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects', i617[i + 0]) );
  }
  i614.RenderObjectsFeatures = i616
  i614.name = i615[3]
  return i614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects"] = function (request, data, root) {
  var i620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects' )
  var i621 = data
  i620.settings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings', i621[0], i620.settings)
  i620.name = i621[1]
  i620.typeName = i621[2]
  return i620
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

Deserializers["UnityEngine.Rendering.VolumeProfile"] = function (request, data, root) {
  var i696 = root || request.c( 'UnityEngine.Rendering.VolumeProfile' )
  var i697 = data
  var i699 = i697[0]
  var i698 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Rendering.VolumeComponent')))
  for(var i = 0; i < i699.length; i += 2) {
  request.r(i699[i + 0], i699[i + 1], 1, i698, '')
  }
  i696.components = i698
  return i696
}

Deserializers["UnityEngine.Rendering.Universal.Tonemapping"] = function (request, data, root) {
  var i702 = root || request.c( 'UnityEngine.Rendering.Universal.Tonemapping' )
  var i703 = data
  i702.mode = request.d('UnityEngine.Rendering.Universal.TonemappingModeParameter', i703[0], i702.mode)
  i702.neutralHDRRangeReductionMode = request.d('UnityEngine.Rendering.Universal.NeutralRangeReductionModeParameter', i703[1], i702.neutralHDRRangeReductionMode)
  i702.acesPreset = request.d('UnityEngine.Rendering.Universal.HDRACESPresetParameter', i703[2], i702.acesPreset)
  i702.hueShiftAmount = request.d('UnityEngine.Rendering.ClampedFloatParameter', i703[3], i702.hueShiftAmount)
  i702.detectPaperWhite = request.d('UnityEngine.Rendering.BoolParameter', i703[4], i702.detectPaperWhite)
  i702.paperWhite = request.d('UnityEngine.Rendering.ClampedFloatParameter', i703[5], i702.paperWhite)
  i702.detectBrightnessLimits = request.d('UnityEngine.Rendering.BoolParameter', i703[6], i702.detectBrightnessLimits)
  i702.minNits = request.d('UnityEngine.Rendering.ClampedFloatParameter', i703[7], i702.minNits)
  i702.maxNits = request.d('UnityEngine.Rendering.ClampedFloatParameter', i703[8], i702.maxNits)
  i702.active = !!i703[9]
  return i702
}

Deserializers["UnityEngine.Rendering.Universal.TonemappingModeParameter"] = function (request, data, root) {
  var i704 = root || request.c( 'UnityEngine.Rendering.Universal.TonemappingModeParameter' )
  var i705 = data
  i704.m_Value = i705[0]
  i704.m_OverrideState = !!i705[1]
  return i704
}

Deserializers["UnityEngine.Rendering.Universal.NeutralRangeReductionModeParameter"] = function (request, data, root) {
  var i706 = root || request.c( 'UnityEngine.Rendering.Universal.NeutralRangeReductionModeParameter' )
  var i707 = data
  i706.m_Value = i707[0]
  i706.m_OverrideState = !!i707[1]
  return i706
}

Deserializers["UnityEngine.Rendering.Universal.HDRACESPresetParameter"] = function (request, data, root) {
  var i708 = root || request.c( 'UnityEngine.Rendering.Universal.HDRACESPresetParameter' )
  var i709 = data
  i708.m_Value = i709[0]
  i708.m_OverrideState = !!i709[1]
  return i708
}

Deserializers["UnityEngine.Rendering.ClampedFloatParameter"] = function (request, data, root) {
  var i710 = root || request.c( 'UnityEngine.Rendering.ClampedFloatParameter' )
  var i711 = data
  i710.m_Value = i711[0]
  i710.m_OverrideState = !!i711[1]
  return i710
}

Deserializers["UnityEngine.Rendering.BoolParameter"] = function (request, data, root) {
  var i712 = root || request.c( 'UnityEngine.Rendering.BoolParameter' )
  var i713 = data
  i712.m_Value = !!i713[0]
  i712.m_OverrideState = !!i713[1]
  return i712
}

Deserializers["UnityEngine.Rendering.Universal.Bloom"] = function (request, data, root) {
  var i714 = root || request.c( 'UnityEngine.Rendering.Universal.Bloom' )
  var i715 = data
  i714.skipIterations = request.d('UnityEngine.Rendering.ClampedIntParameter', i715[0], i714.skipIterations)
  i714.threshold = request.d('UnityEngine.Rendering.MinFloatParameter', i715[1], i714.threshold)
  i714.intensity = request.d('UnityEngine.Rendering.MinFloatParameter', i715[2], i714.intensity)
  i714.scatter = request.d('UnityEngine.Rendering.ClampedFloatParameter', i715[3], i714.scatter)
  i714.clamp = request.d('UnityEngine.Rendering.MinFloatParameter', i715[4], i714.clamp)
  i714.tint = request.d('UnityEngine.Rendering.ColorParameter', i715[5], i714.tint)
  i714.highQualityFiltering = request.d('UnityEngine.Rendering.BoolParameter', i715[6], i714.highQualityFiltering)
  i714.downscale = request.d('UnityEngine.Rendering.Universal.DownscaleParameter', i715[7], i714.downscale)
  i714.maxIterations = request.d('UnityEngine.Rendering.ClampedIntParameter', i715[8], i714.maxIterations)
  i714.dirtTexture = request.d('UnityEngine.Rendering.TextureParameter', i715[9], i714.dirtTexture)
  i714.dirtIntensity = request.d('UnityEngine.Rendering.MinFloatParameter', i715[10], i714.dirtIntensity)
  i714.active = !!i715[11]
  return i714
}

Deserializers["UnityEngine.Rendering.ClampedIntParameter"] = function (request, data, root) {
  var i716 = root || request.c( 'UnityEngine.Rendering.ClampedIntParameter' )
  var i717 = data
  i716.m_Value = i717[0]
  i716.m_OverrideState = !!i717[1]
  return i716
}

Deserializers["UnityEngine.Rendering.MinFloatParameter"] = function (request, data, root) {
  var i718 = root || request.c( 'UnityEngine.Rendering.MinFloatParameter' )
  var i719 = data
  i718.m_Value = i719[0]
  i718.m_OverrideState = !!i719[1]
  return i718
}

Deserializers["UnityEngine.Rendering.ColorParameter"] = function (request, data, root) {
  var i720 = root || request.c( 'UnityEngine.Rendering.ColorParameter' )
  var i721 = data
  i720.m_Value = new pc.Color(i721[0], i721[1], i721[2], i721[3])
  i720.m_OverrideState = !!i721[4]
  return i720
}

Deserializers["UnityEngine.Rendering.Universal.DownscaleParameter"] = function (request, data, root) {
  var i722 = root || request.c( 'UnityEngine.Rendering.Universal.DownscaleParameter' )
  var i723 = data
  i722.m_Value = i723[0]
  i722.m_OverrideState = !!i723[1]
  return i722
}

Deserializers["UnityEngine.Rendering.TextureParameter"] = function (request, data, root) {
  var i724 = root || request.c( 'UnityEngine.Rendering.TextureParameter' )
  var i725 = data
  i724.dimension = i725[0]
  request.r(i725[1], i725[2], 0, i724, 'm_Value')
  i724.m_OverrideState = !!i725[3]
  return i724
}

Deserializers["UnityEngine.Rendering.Universal.MotionBlur"] = function (request, data, root) {
  var i726 = root || request.c( 'UnityEngine.Rendering.Universal.MotionBlur' )
  var i727 = data
  i726.mode = request.d('UnityEngine.Rendering.Universal.MotionBlurModeParameter', i727[0], i726.mode)
  i726.quality = request.d('UnityEngine.Rendering.Universal.MotionBlurQualityParameter', i727[1], i726.quality)
  i726.intensity = request.d('UnityEngine.Rendering.ClampedFloatParameter', i727[2], i726.intensity)
  i726.clamp = request.d('UnityEngine.Rendering.ClampedFloatParameter', i727[3], i726.clamp)
  i726.active = !!i727[4]
  return i726
}

Deserializers["UnityEngine.Rendering.Universal.MotionBlurModeParameter"] = function (request, data, root) {
  var i728 = root || request.c( 'UnityEngine.Rendering.Universal.MotionBlurModeParameter' )
  var i729 = data
  i728.m_Value = i729[0]
  i728.m_OverrideState = !!i729[1]
  return i728
}

Deserializers["UnityEngine.Rendering.Universal.MotionBlurQualityParameter"] = function (request, data, root) {
  var i730 = root || request.c( 'UnityEngine.Rendering.Universal.MotionBlurQualityParameter' )
  var i731 = data
  i730.m_Value = i731[0]
  i730.m_OverrideState = !!i731[1]
  return i730
}

Deserializers["UnityEngine.Rendering.Universal.Vignette"] = function (request, data, root) {
  var i732 = root || request.c( 'UnityEngine.Rendering.Universal.Vignette' )
  var i733 = data
  i732.color = request.d('UnityEngine.Rendering.ColorParameter', i733[0], i732.color)
  i732.center = request.d('UnityEngine.Rendering.Vector2Parameter', i733[1], i732.center)
  i732.intensity = request.d('UnityEngine.Rendering.ClampedFloatParameter', i733[2], i732.intensity)
  i732.smoothness = request.d('UnityEngine.Rendering.ClampedFloatParameter', i733[3], i732.smoothness)
  i732.rounded = request.d('UnityEngine.Rendering.BoolParameter', i733[4], i732.rounded)
  i732.active = !!i733[5]
  return i732
}

Deserializers["UnityEngine.Rendering.Vector2Parameter"] = function (request, data, root) {
  var i734 = root || request.c( 'UnityEngine.Rendering.Vector2Parameter' )
  var i735 = data
  i734.m_Value = new pc.Vec2( i735[0], i735[1] )
  i734.m_OverrideState = !!i735[2]
  return i734
}

Deserializers["CEBB.Playable.DecorItem"] = function (request, data, root) {
  var i736 = root || request.c( 'CEBB.Playable.DecorItem' )
  var i737 = data
  i736.itemId = i737[0]
  i736.displayName = i737[1]
  request.r(i737[2], i737[3], 0, i736, 'prefab')
  request.r(i737[4], i737[5], 0, i736, 'icon')
  i736.mount = i737[6]
  i736.walkableSurface = !!i737[7]
  i736.topSurface = !!i737[8]
  i736.quantity = i737[9]
  i736.boundsSize = new pc.Vec3( i737[10], i737[11], i737[12] )
  return i736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i738 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i739 = data
  var i741 = i739[0]
  var i740 = []
  for(var i = 0; i < i741.length; i += 1) {
    i740.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i741[i + 0]) );
  }
  i738.files = i740
  i738.componentToPrefabIds = i739[1]
  return i738
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i745 = data
  i744.path = i745[0]
  request.r(i745[1], i745[2], 0, i744, 'unityObject')
  return i744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i747 = data
  var i749 = i747[0]
  var i748 = []
  for(var i = 0; i < i749.length; i += 1) {
    i748.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i749[i + 0]) );
  }
  i746.scriptsExecutionOrder = i748
  var i751 = i747[1]
  var i750 = []
  for(var i = 0; i < i751.length; i += 1) {
    i750.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i751[i + 0]) );
  }
  i746.sortingLayers = i750
  var i753 = i747[2]
  var i752 = []
  for(var i = 0; i < i753.length; i += 1) {
    i752.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i753[i + 0]) );
  }
  i746.cullingLayers = i752
  i746.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i747[3], i746.timeSettings)
  i746.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i747[4], i746.physicsSettings)
  i746.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i747[5], i746.physics2DSettings)
  i746.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i747[6], i746.qualitySettings)
  i746.enableRealtimeShadows = !!i747[7]
  i746.enableAutoInstancing = !!i747[8]
  i746.enableStaticBatching = !!i747[9]
  i746.enableDynamicBatching = !!i747[10]
  i746.usePreservativeDynamicBatching = !!i747[11]
  i746.lightmapEncodingQuality = i747[12]
  i746.desiredColorSpace = i747[13]
  var i755 = i747[14]
  var i754 = []
  for(var i = 0; i < i755.length; i += 1) {
    i754.push( i755[i + 0] );
  }
  i746.allTags = i754
  return i746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i758 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i759 = data
  i758.name = i759[0]
  i758.value = i759[1]
  return i758
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i762 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i763 = data
  i762.id = i763[0]
  i762.name = i763[1]
  i762.value = i763[2]
  return i762
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i766 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i767 = data
  i766.id = i767[0]
  i766.name = i767[1]
  return i766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i769 = data
  i768.fixedDeltaTime = i769[0]
  i768.maximumDeltaTime = i769[1]
  i768.timeScale = i769[2]
  i768.maximumParticleTimestep = i769[3]
  return i768
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i771 = data
  i770.gravity = new pc.Vec3( i771[0], i771[1], i771[2] )
  i770.defaultSolverIterations = i771[3]
  i770.bounceThreshold = i771[4]
  i770.autoSyncTransforms = !!i771[5]
  i770.autoSimulation = !!i771[6]
  var i773 = i771[7]
  var i772 = []
  for(var i = 0; i < i773.length; i += 1) {
    i772.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i773[i + 0]) );
  }
  i770.collisionMatrix = i772
  return i770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i777 = data
  i776.enabled = !!i777[0]
  i776.layerId = i777[1]
  i776.otherLayerId = i777[2]
  return i776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i779 = data
  request.r(i779[0], i779[1], 0, i778, 'material')
  i778.gravity = new pc.Vec2( i779[2], i779[3] )
  i778.positionIterations = i779[4]
  i778.velocityIterations = i779[5]
  i778.velocityThreshold = i779[6]
  i778.maxLinearCorrection = i779[7]
  i778.maxAngularCorrection = i779[8]
  i778.maxTranslationSpeed = i779[9]
  i778.maxRotationSpeed = i779[10]
  i778.baumgarteScale = i779[11]
  i778.baumgarteTOIScale = i779[12]
  i778.timeToSleep = i779[13]
  i778.linearSleepTolerance = i779[14]
  i778.angularSleepTolerance = i779[15]
  i778.defaultContactOffset = i779[16]
  i778.autoSimulation = !!i779[17]
  i778.queriesHitTriggers = !!i779[18]
  i778.queriesStartInColliders = !!i779[19]
  i778.callbacksOnDisable = !!i779[20]
  i778.reuseCollisionCallbacks = !!i779[21]
  i778.autoSyncTransforms = !!i779[22]
  var i781 = i779[23]
  var i780 = []
  for(var i = 0; i < i781.length; i += 1) {
    i780.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i781[i + 0]) );
  }
  i778.collisionMatrix = i780
  return i778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i785 = data
  i784.enabled = !!i785[0]
  i784.layerId = i785[1]
  i784.otherLayerId = i785[2]
  return i784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i786 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i787 = data
  var i789 = i787[0]
  var i788 = []
  for(var i = 0; i < i789.length; i += 1) {
    i788.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i789[i + 0]) );
  }
  i786.qualityLevels = i788
  var i791 = i787[1]
  var i790 = []
  for(var i = 0; i < i791.length; i += 1) {
    i790.push( i791[i + 0] );
  }
  i786.names = i790
  i786.shadows = i787[2]
  i786.anisotropicFiltering = i787[3]
  i786.antiAliasing = i787[4]
  i786.lodBias = i787[5]
  i786.shadowCascades = i787[6]
  i786.shadowDistance = i787[7]
  i786.shadowmaskMode = i787[8]
  i786.shadowProjection = i787[9]
  i786.shadowResolution = i787[10]
  i786.softParticles = !!i787[11]
  i786.softVegetation = !!i787[12]
  i786.activeColorSpace = i787[13]
  i786.desiredColorSpace = i787[14]
  i786.masterTextureLimit = i787[15]
  i786.maxQueuedFrames = i787[16]
  i786.particleRaycastBudget = i787[17]
  i786.pixelLightCount = i787[18]
  i786.realtimeReflectionProbes = !!i787[19]
  i786.shadowCascade2Split = i787[20]
  i786.shadowCascade4Split = new pc.Vec3( i787[21], i787[22], i787[23] )
  i786.streamingMipmapsActive = !!i787[24]
  i786.vSyncCount = i787[25]
  i786.asyncUploadBufferSize = i787[26]
  i786.asyncUploadTimeSlice = i787[27]
  i786.billboardsFaceCameraPosition = !!i787[28]
  i786.shadowNearPlaneOffset = i787[29]
  i786.streamingMipmapsMemoryBudget = i787[30]
  i786.maximumLODLevel = i787[31]
  i786.streamingMipmapsAddAllCameras = !!i787[32]
  i786.streamingMipmapsMaxLevelReduction = i787[33]
  i786.streamingMipmapsRenderersPerFrame = i787[34]
  i786.resolutionScalingFixedDPIFactor = i787[35]
  i786.streamingMipmapsMaxFileIORequests = i787[36]
  i786.currentQualityLevel = i787[37]
  return i786
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i797 = data
  i796.weight = i797[0]
  i796.vertices = i797[1]
  i796.normals = i797[2]
  i796.tangents = i797[3]
  return i796
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i798 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i799 = data
  request.r(i799[0], i799[1], 0, i798, 'm_ObjectArgument')
  i798.m_ObjectArgumentAssemblyTypeName = i799[2]
  i798.m_IntArgument = i799[3]
  i798.m_FloatArgument = i799[4]
  i798.m_StringArgument = i799[5]
  i798.m_BoolArgument = !!i799[6]
  return i798
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings"] = function (request, data, root) {
  var i800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings' )
  var i801 = data
  i800.Event = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i801[0], i800.Event)
  i800.filterSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings', i801[1], i800.filterSettings)
  i800.overrideMaterialId = i801[2]
  i800.overrideMaterialPassIndex = i801[3]
  i800.overrideShaderId = i801[4]
  i800.overrideShaderPassIndex = i801[5]
  i800.overrideMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i801[6], i800.overrideMode)
  i800.overrideDepthState = !!i801[7]
  i800.depthCompareFunction = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i801[8], i800.depthCompareFunction)
  i800.enableWrite = !!i801[9]
  i800.stencilSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.StencilStateData', i801[10], i800.stencilSettings)
  i800.cameraSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings', i801[11], i800.cameraSettings)
  return i800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.EnumDescription"] = function (request, data, root) {
  var i802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.EnumDescription' )
  var i803 = data
  i802.Value = i803[0]
  return i802
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings"] = function (request, data, root) {
  var i804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings' )
  var i805 = data
  i804.RenderQueueType = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i805[0], i804.RenderQueueType)
  i804.LayerMask = i805[1]
  var i807 = i805[2]
  var i806 = []
  for(var i = 0; i < i807.length; i += 1) {
    i806.push( i807[i + 0] );
  }
  i804.PassNames = i806
  return i804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.StencilStateData"] = function (request, data, root) {
  var i808 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.StencilStateData' )
  var i809 = data
  i808.overrideStencilState = !!i809[0]
  i808.stencilReference = i809[1]
  i808.stencilCompareFunctionValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i809[2], i808.stencilCompareFunctionValue)
  i808.passOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i809[3], i808.passOperationValue)
  i808.failOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i809[4], i808.failOperationValue)
  i808.zFailOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i809[5], i808.zFailOperationValue)
  return i808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings"] = function (request, data, root) {
  var i810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings' )
  var i811 = data
  i810.overrideCamera = !!i811[0]
  i810.restoreCamera = !!i811[1]
  i810.offset = new pc.Vec4( i811[2], i811[3], i811[4], i811[5] )
  i810.cameraFieldOfView = i811[6]
  return i810
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset":{"AdditionalLightsRenderingMode":0,"LightRenderingMode":1,"MainLightRenderingModeValue":2,"SupportsMainLightShadows":3,"MixedLightingSupported":4,"MainLightShadowmapResolutionValue":5,"SupportsSoftShadows":6,"SoftShadowQualityValue":7,"ShadowDistance":8,"ShadowCascadeCount":9,"Cascade2Split":10,"Cascade3Split":11,"Cascade4Split":13,"CascadeBorder":16,"ShadowDepthBias":17,"ShadowNormalBias":18,"RequireDepthTexture":19,"RequireOpaqueTexture":20,"scriptableRendererData":21},"Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode":{"Disabled":0,"PerVertex":1,"PerPixel":2},"Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData":{"opaqueLayerMask":0,"transparentLayerMask":1,"RenderObjectsFeatures":2,"name":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects":{"settings":0,"name":1,"typeName":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings":{"Event":0,"filterSettings":1,"overrideMaterialId":2,"overrideMaterialPassIndex":3,"overrideShaderId":4,"overrideShaderPassIndex":5,"overrideMode":6,"overrideDepthState":7,"depthCompareFunction":8,"enableWrite":9,"stencilSettings":10,"cameraSettings":11},"Luna.Unity.DTO.UnityEngine.Assets.EnumDescription":{"Value":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings":{"RenderQueueType":0,"LayerMask":1,"PassNames":2},"Luna.Unity.DTO.UnityEngine.Assets.StencilStateData":{"overrideStencilState":0,"stencilReference":1,"stencilCompareFunctionValue":2,"passOperationValue":3,"failOperationValue":4,"zFailOperationValue":5},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings":{"overrideCamera":0,"restoreCamera":1,"offset":2,"cameraFieldOfView":6}}

Deserializers.requiredComponents = {"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[56],"57":[7],"58":[59],"60":[59],"61":[59],"62":[59],"63":[59],"64":[59],"65":[66],"67":[66],"68":[66],"69":[66],"70":[66],"71":[66],"72":[66],"73":[66],"74":[66],"75":[66],"76":[66],"77":[66],"78":[66],"79":[7],"80":[5],"81":[82],"83":[82],"27":[22],"84":[22],"85":[7],"10":[7],"12":[11],"86":[22],"87":[32,22],"88":[5],"89":[32,22],"90":[22],"91":[22],"92":[5,22],"93":[22,32],"94":[95],"96":[95],"97":[95],"98":[18],"99":[22],"100":[22],"31":[27],"19":[32,22],"101":[22],"30":[27],"102":[22],"28":[22],"103":[22],"104":[22],"37":[22],"105":[22],"106":[22],"107":[22],"108":[22],"109":[32,22],"110":[22],"111":[22],"112":[22],"113":[22],"20":[32,22],"114":[22],"115":[39],"116":[39],"40":[39],"117":[39],"118":[7],"119":[7]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","UnityEngine.Rendering.Volume","UnityEngine.Rendering.VolumeProfile","UnityEngine.AudioSource","CEBB.Playable.LivingRoomPlayable","CEBB.Playable.DecorItem","UnityEngine.UI.Button","UnityEngine.UI.Image","UnityEngine.UI.Text","UnityEngine.GameObject","UnityEngine.RectTransform","CEBB.Playable.LivingRoomPlayer","CEBB.Playable.LunaController","UnityEngine.AudioClip","CEBB.Playable.BedroomLayout","UnityEngine.Canvas","UnityEngine.UI.GridLayoutGroup","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","CEBB.Playable.LivingRoomLookSurface","UnityEngine.Font","UnityEngine.UI.Outline","UnityEngine.Sprite","UnityEngine.UI.LayoutElement","CEBB.Playable.RoomMovePad","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.BoxCollider","CEBB.Playable.PlacementSurface","UnityEngine.Cubemap","UnityEngine.Rendering.Universal.Tonemapping","UnityEngine.Rendering.Universal.Bloom","UnityEngine.Rendering.Universal.MotionBlur","UnityEngine.Rendering.Universal.Vignette","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Rendering.UI.UIFoldout","UnityEngine.Rendering.Universal.PixelPerfectCamera","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.Purchasing.IAPButton","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CEBB_V16";

Deserializers.lunaInitializationTime = "10/28/2026 09:40:07";

Deserializers.lunaDaysRunning = "6.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_DatDV_CEBB_V20_NgocNDL";

Deserializers.lunaAppID = "35800";

Deserializers.projectId = "3c72c65a16f0acb438eed22b8b16c24a";

Deserializers.packagesInfo = "com.unity.render-pipelines.universal: 17.0.4\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1746";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3707";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system, reflection, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "Unity Technologies";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.UnityTechnologies.com.unity.template.urpblank";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "fba57bb5-80e5-4209-80a9-1489b59cdcaf";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Unity","Services","Core","Editor","StatusInitializer","InitializeOnLoad"],["Ua2CoreInitializeCallback","Register"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

