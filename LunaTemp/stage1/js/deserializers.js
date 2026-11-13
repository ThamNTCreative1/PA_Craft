var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i502 = root || request.c( 'UnityEngine.JointSpring' )
  var i503 = data
  i502.spring = i503[0]
  i502.damper = i503[1]
  i502.targetPosition = i503[2]
  return i502
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i504 = root || request.c( 'UnityEngine.JointMotor' )
  var i505 = data
  i504.m_TargetVelocity = i505[0]
  i504.m_Force = i505[1]
  i504.m_FreeSpin = i505[2]
  return i504
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i506 = root || request.c( 'UnityEngine.JointLimits' )
  var i507 = data
  i506.m_Min = i507[0]
  i506.m_Max = i507[1]
  i506.m_Bounciness = i507[2]
  i506.m_BounceMinVelocity = i507[3]
  i506.m_ContactDistance = i507[4]
  i506.minBounce = i507[5]
  i506.maxBounce = i507[6]
  return i506
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i508 = root || request.c( 'UnityEngine.JointDrive' )
  var i509 = data
  i508.m_PositionSpring = i509[0]
  i508.m_PositionDamper = i509[1]
  i508.m_MaximumForce = i509[2]
  i508.m_UseAcceleration = i509[3]
  return i508
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i510 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i511 = data
  i510.m_Spring = i511[0]
  i510.m_Damper = i511[1]
  return i510
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i512 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i513 = data
  i512.m_Limit = i513[0]
  i512.m_Bounciness = i513[1]
  i512.m_ContactDistance = i513[2]
  return i512
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i514 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i515 = data
  i514.m_ExtremumSlip = i515[0]
  i514.m_ExtremumValue = i515[1]
  i514.m_AsymptoteSlip = i515[2]
  i514.m_AsymptoteValue = i515[3]
  i514.m_Stiffness = i515[4]
  return i514
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i516 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i517 = data
  i516.m_LowerAngle = i517[0]
  i516.m_UpperAngle = i517[1]
  return i516
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i519 = data
  i518.m_MotorSpeed = i519[0]
  i518.m_MaximumMotorTorque = i519[1]
  return i518
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i520 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i521 = data
  i520.m_DampingRatio = i521[0]
  i520.m_Frequency = i521[1]
  i520.m_Angle = i521[2]
  return i520
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i522 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i523 = data
  i522.m_LowerTranslation = i523[0]
  i522.m_UpperTranslation = i523[1]
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i525 = data
  i524.name = i525[0]
  i524.width = i525[1]
  i524.height = i525[2]
  i524.mipmapCount = i525[3]
  i524.anisoLevel = i525[4]
  i524.filterMode = i525[5]
  i524.hdr = !!i525[6]
  i524.format = i525[7]
  i524.wrapMode = i525[8]
  i524.alphaIsTransparency = !!i525[9]
  i524.alphaSource = i525[10]
  i524.graphicsFormat = i525[11]
  i524.sRGBTexture = !!i525[12]
  i524.desiredColorSpace = i525[13]
  i524.wrapU = i525[14]
  i524.wrapV = i525[15]
  return i524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i526 = root || new pc.UnityMaterial()
  var i527 = data
  i526.name = i527[0]
  request.r(i527[1], i527[2], 0, i526, 'shader')
  i526.renderQueue = i527[3]
  i526.enableInstancing = !!i527[4]
  var i529 = i527[5]
  var i528 = []
  for(var i = 0; i < i529.length; i += 1) {
    i528.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i529[i + 0]) );
  }
  i526.floatParameters = i528
  var i531 = i527[6]
  var i530 = []
  for(var i = 0; i < i531.length; i += 1) {
    i530.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i531[i + 0]) );
  }
  i526.colorParameters = i530
  var i533 = i527[7]
  var i532 = []
  for(var i = 0; i < i533.length; i += 1) {
    i532.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i533[i + 0]) );
  }
  i526.vectorParameters = i532
  var i535 = i527[8]
  var i534 = []
  for(var i = 0; i < i535.length; i += 1) {
    i534.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i535[i + 0]) );
  }
  i526.textureParameters = i534
  var i537 = i527[9]
  var i536 = []
  for(var i = 0; i < i537.length; i += 1) {
    i536.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i537[i + 0]) );
  }
  i526.materialFlags = i536
  return i526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i541 = data
  i540.name = i541[0]
  i540.value = i541[1]
  return i540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i545 = data
  i544.name = i545[0]
  i544.value = new pc.Color(i545[1], i545[2], i545[3], i545[4])
  return i544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i549 = data
  i548.name = i549[0]
  i548.value = new pc.Vec4( i549[1], i549[2], i549[3], i549[4] )
  return i548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i553 = data
  i552.name = i553[0]
  request.r(i553[1], i553[2], 0, i552, 'value')
  return i552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i557 = data
  i556.name = i557[0]
  i556.enabled = !!i557[1]
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i559 = data
  i558.name = i559[0]
  i558.halfPrecision = !!i559[1]
  i558.useSimplification = !!i559[2]
  i558.useUInt32IndexFormat = !!i559[3]
  i558.vertexCount = i559[4]
  i558.aabb = i559[5]
  var i561 = i559[6]
  var i560 = []
  for(var i = 0; i < i561.length; i += 1) {
    i560.push( !!i561[i + 0] );
  }
  i558.streams = i560
  i558.vertices = i559[7]
  var i563 = i559[8]
  var i562 = []
  for(var i = 0; i < i563.length; i += 1) {
    i562.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i563[i + 0]) );
  }
  i558.subMeshes = i562
  var i565 = i559[9]
  var i564 = []
  for(var i = 0; i < i565.length; i += 16) {
    i564.push( new pc.Mat4().setData(i565[i + 0], i565[i + 1], i565[i + 2], i565[i + 3],  i565[i + 4], i565[i + 5], i565[i + 6], i565[i + 7],  i565[i + 8], i565[i + 9], i565[i + 10], i565[i + 11],  i565[i + 12], i565[i + 13], i565[i + 14], i565[i + 15]) );
  }
  i558.bindposes = i564
  var i567 = i559[10]
  var i566 = []
  for(var i = 0; i < i567.length; i += 1) {
    i566.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i567[i + 0]) );
  }
  i558.blendShapes = i566
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i573 = data
  i572.triangles = i573[0]
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i579 = data
  i578.name = i579[0]
  var i581 = i579[1]
  var i580 = []
  for(var i = 0; i < i581.length; i += 1) {
    i580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i581[i + 0]) );
  }
  i578.frames = i580
  return i578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i583 = data
  i582.position = new pc.Vec3( i583[0], i583[1], i583[2] )
  i582.scale = new pc.Vec3( i583[3], i583[4], i583[5] )
  i582.rotation = new pc.Quat(i583[6], i583[7], i583[8], i583[9])
  return i582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i585 = data
  request.r(i585[0], i585[1], 0, i584, 'sharedMesh')
  return i584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i587 = data
  request.r(i587[0], i587[1], 0, i586, 'additionalVertexStreams')
  i586.enabled = !!i587[2]
  request.r(i587[3], i587[4], 0, i586, 'sharedMaterial')
  var i589 = i587[5]
  var i588 = []
  for(var i = 0; i < i589.length; i += 2) {
  request.r(i589[i + 0], i589[i + 1], 2, i588, '')
  }
  i586.sharedMaterials = i588
  i586.receiveShadows = !!i587[6]
  i586.shadowCastingMode = i587[7]
  i586.sortingLayerID = i587[8]
  i586.sortingOrder = i587[9]
  i586.lightmapIndex = i587[10]
  i586.lightmapSceneIndex = i587[11]
  i586.lightmapScaleOffset = new pc.Vec4( i587[12], i587[13], i587[14], i587[15] )
  i586.lightProbeUsage = i587[16]
  i586.reflectionProbeUsage = i587[17]
  return i586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i593 = data
  i592.name = i593[0]
  i592.tagId = i593[1]
  i592.enabled = !!i593[2]
  i592.isStatic = !!i593[3]
  i592.layer = i593[4]
  return i592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i595 = data
  i594.name = i595[0]
  i594.atlasId = i595[1]
  i594.mipmapCount = i595[2]
  i594.hdr = !!i595[3]
  i594.size = i595[4]
  i594.anisoLevel = i595[5]
  i594.filterMode = i595[6]
  var i597 = i595[7]
  var i596 = []
  for(var i = 0; i < i597.length; i += 4) {
    i596.push( UnityEngine.Rect.MinMaxRect(i597[i + 0], i597[i + 1], i597[i + 2], i597[i + 3]) );
  }
  i594.rects = i596
  i594.wrapU = i595[8]
  i594.wrapV = i595[9]
  return i594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i601 = data
  i600.name = i601[0]
  i600.index = i601[1]
  i600.startup = !!i601[2]
  return i600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i603 = data
  i602.aspect = i603[0]
  i602.orthographic = !!i603[1]
  i602.orthographicSize = i603[2]
  i602.backgroundColor = new pc.Color(i603[3], i603[4], i603[5], i603[6])
  i602.nearClipPlane = i603[7]
  i602.farClipPlane = i603[8]
  i602.fieldOfView = i603[9]
  i602.depth = i603[10]
  i602.clearFlags = i603[11]
  i602.cullingMask = i603[12]
  i602.rect = i603[13]
  request.r(i603[14], i603[15], 0, i602, 'targetTexture')
  i602.usePhysicalProperties = !!i603[16]
  i602.focalLength = i603[17]
  i602.sensorSize = new pc.Vec2( i603[18], i603[19] )
  i602.lensShift = new pc.Vec2( i603[20], i603[21] )
  i602.gateFit = i603[22]
  i602.commandBufferCount = i603[23]
  i602.cameraType = i603[24]
  i602.enabled = !!i603[25]
  return i602
}

Deserializers["CEBB.Playable.BedroomLayout"] = function (request, data, root) {
  var i604 = root || request.c( 'CEBB.Playable.BedroomLayout' )
  var i605 = data
  request.r(i605[0], i605[1], 0, i604, 'roomCamera')
  request.r(i605[2], i605[3], 0, i604, 'canvas')
  request.r(i605[4], i605[5], 0, i604, 'catalog')
  request.r(i605[6], i605[7], 0, i604, 'grid')
  request.r(i605[8], i605[9], 0, i604, 'header')
  request.r(i605[10], i605[11], 0, i604, 'prompt')
  request.r(i605[12], i605[13], 0, i604, 'cta')
  request.r(i605[14], i605[15], 0, i604, 'progress')
  request.r(i605[16], i605[17], 0, i604, 'stats')
  request.r(i605[18], i605[19], 0, i604, 'completedDemo')
  i604.landscapeLogoSize = new pc.Vec2( i605[20], i605[21] )
  i604.landscapeLogoTopCenter = new pc.Vec2( i605[22], i605[23] )
  i604.landscapePreviewSize = new pc.Vec2( i605[24], i605[25] )
  i604.landscapePreviewTopCenter = new pc.Vec2( i605[26], i605[27] )
  var i607 = i605[28]
  var i606 = []
  for(var i = 0; i < i607.length; i += 2) {
  request.r(i607[i + 0], i607[i + 1], 2, i606, '')
  }
  i604.textOutlines = i606
  request.r(i605[29], i605[30], 0, i604, 'movePad')
  i604.firstPersonMode = !!i605[31]
  i604.preserveCameraView = !!i605[32]
  i604.lookTarget = new pc.Vec3( i605[33], i605[34], i605[35] )
  i604.viewOffset = new pc.Vec3( i605[36], i605[37], i605[38] )
  i604.respectSafeArea = !!i605[39]
  i604.catalogItemCount = i605[40]
  return i604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i611 = data
  i610.type = i611[0]
  i610.color = new pc.Color(i611[1], i611[2], i611[3], i611[4])
  i610.cullingMask = i611[5]
  i610.intensity = i611[6]
  i610.range = i611[7]
  i610.spotAngle = i611[8]
  i610.shadows = i611[9]
  i610.shadowNormalBias = i611[10]
  i610.shadowBias = i611[11]
  i610.shadowStrength = i611[12]
  i610.shadowResolution = i611[13]
  i610.lightmapBakeType = i611[14]
  i610.renderMode = i611[15]
  request.r(i611[16], i611[17], 0, i610, 'cookie')
  i610.cookieSize = i611[18]
  i610.shadowNearPlane = i611[19]
  i610.occlusionMaskChannel = i611[20]
  i610.isBaked = !!i611[21]
  i610.mixedLightingMode = i611[22]
  i610.enabled = !!i611[23]
  return i610
}

Deserializers["CEBB.Playable.BedroomPlayable"] = function (request, data, root) {
  var i612 = root || request.c( 'CEBB.Playable.BedroomPlayable' )
  var i613 = data
  var i615 = i613[0]
  var i614 = []
  for(var i = 0; i < i615.length; i += 1) {
    i614.push( request.d('CEBB.Playable.FurnitureSlot', i615[i + 0]) );
  }
  i612.slots = i614
  var i617 = i613[1]
  var i616 = []
  for(var i = 0; i < i617.length; i += 1) {
    i616.push( request.d('CEBB.Playable.FurnitureInventoryEntry', i617[i + 0]) );
  }
  i612.inventory = i616
  request.r(i613[2], i613[3], 0, i612, 'editorPreviewRoot')
  i612.aimToBuild = !!i613[4]
  request.r(i613[5], i613[6], 0, i612, 'ghostMaterial')
  request.r(i613[7], i613[8], 0, i612, 'ghostOutlineMaterial')
  request.r(i613[9], i613[10], 0, i612, 'playerBody')
  request.r(i613[11], i613[12], 0, i612, 'playerController')
  i612.ctaCountThreshold = i613[13]
  i612.showCtaButton = !!i613[14]
  i612.startTapCounts = !!i613[15]
  request.r(i613[16], i613[17], 0, i612, 'endOverlayRoot')
  request.r(i613[18], i613[19], 0, i612, 'endOverlayButton')
  i612.onEndCardRequested = request.d('UnityEngine.Events.UnityEvent', i613[20], i612.onEndCardRequested)
  i612.durationSeconds = i613[21]
  i612.stopTimerOnCompletion = !!i613[22]
  i612.endOnTimeout = !!i613[23]
  i612.firstBedSlot = i613[24]
  i612.firstPrompt = i613[25]
  i612.handAfterMove = !!i613[26]
  i612.guidedBuildCount = i613[27]
  i612.lookTutorialDegrees = i613[28]
  i612.hintDelaySeconds = i613[29]
  i612.revealSeconds = i613[30]
  request.r(i613[31], i613[32], 0, i612, 'placementAudio')
  request.r(i613[33], i613[34], 0, i612, 'placementSfx')
  i612.placementVolume = i613[35]
  i612.onFurniturePlaced = request.d('UnityEngine.Events.UnityEvent', i613[36], i612.onFurniturePlaced)
  request.r(i613[37], i613[38], 0, i612, 'startSurface')
  request.r(i613[39], i613[40], 0, i612, 'ctaRoot')
  request.r(i613[41], i613[42], 0, i612, 'ctaButton')
  request.r(i613[43], i613[44], 0, i612, 'promptText')
  request.r(i613[45], i613[46], 0, i612, 'timerText')
  request.r(i613[47], i613[48], 0, i612, 'countText')
  request.r(i613[49], i613[50], 0, i612, 'progressText')
  request.r(i613[51], i613[52], 0, i612, 'progressFill')
  request.r(i613[53], i613[54], 0, i612, 'lookTutorialLoop')
  request.r(i613[55], i613[56], 0, i612, 'hand')
  i612.onGameStarted = request.d('UnityEngine.Events.UnityEvent', i613[57], i612.onGameStarted)
  i612.onGameEnded = request.d('UnityEngine.Events.UnityEvent', i613[58], i612.onGameEnded)
  i612.onCtaClicked = request.d('UnityEngine.Events.UnityEvent', i613[59], i612.onCtaClicked)
  i612.moveTutorial = !!i613[60]
  i612.moveTutorialDistance = i613[61]
  request.r(i613[62], i613[63], 0, i612, 'moveTutorialPad')
  request.r(i613[64], i613[65], 0, i612, 'moveTutorialLabel')
  i612.moveTutorialText = i613[66]
  request.r(i613[67], i613[68], 0, i612, 'bgmSource')
  request.r(i613[69], i613[70], 0, i612, 'bgmClip')
  i612.bgmVolume = i613[71]
  i612.bgmEnabled = !!i613[72]
  request.r(i613[73], i613[74], 0, i612, 'logoImage')
  request.r(i613[75], i613[76], 0, i612, 'logoTexture')
  i612.state = i613[77]
  i612.tutorialStage = i613[78]
  i612.interactionCount = i613[79]
  i612.builtCount = i613[80]
  i612.elapsedSeconds = i613[81]
  i612.lookProgress = i613[82]
  i612.searchElapsed = i613[83]
  i612.moveProgress = i613[84]
  i612.hintIndex = i613[85]
  i612.hintShownCount = i613[86]
  return i612
}

Deserializers["CEBB.Playable.FurnitureSlot"] = function (request, data, root) {
  var i620 = root || request.c( 'CEBB.Playable.FurnitureSlot' )
  var i621 = data
  request.r(i621[0], i621[1], 0, i620, 'definition')
  request.r(i621[2], i621[3], 0, i620, 'anchor')
  i620.localPosition = new pc.Vec3( i621[4], i621[5], i621[6] )
  i620.localEulerAngles = new pc.Vec3( i621[7], i621[8], i621[9] )
  i620.localScale = new pc.Vec3( i621[10], i621[11], i621[12] )
  i620.buildOrder = i621[13]
  request.r(i621[14], i621[15], 0, i620, 'button')
  request.r(i621[16], i621[17], 0, i620, 'frame')
  request.r(i621[18], i621[19], 0, i620, 'builtBadge')
  return i620
}

Deserializers["CEBB.Playable.FurnitureInventoryEntry"] = function (request, data, root) {
  var i624 = root || request.c( 'CEBB.Playable.FurnitureInventoryEntry' )
  var i625 = data
  request.r(i625[0], i625[1], 0, i624, 'definition')
  request.r(i625[2], i625[3], 0, i624, 'button')
  request.r(i625[4], i625[5], 0, i624, 'frame')
  request.r(i625[6], i625[7], 0, i624, 'icon')
  request.r(i625[8], i625[9], 0, i624, 'quantityText')
  request.r(i625[10], i625[11], 0, i624, 'emptyBadge')
  return i624
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i626 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i627 = data
  i626.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i627[0], i626.m_PersistentCalls)
  return i626
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i628 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i629 = data
  var i631 = i629[0]
  var i630 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i631.length; i += 1) {
    i630.add(request.d('UnityEngine.Events.PersistentCall', i631[i + 0]));
  }
  i628.m_Calls = i630
  return i628
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i634 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i635 = data
  request.r(i635[0], i635[1], 0, i634, 'm_Target')
  i634.m_TargetAssemblyTypeName = i635[2]
  i634.m_MethodName = i635[3]
  i634.m_Mode = i635[4]
  i634.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i635[5], i634.m_Arguments)
  i634.m_CallState = i635[6]
  return i634
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i637 = data
  request.r(i637[0], i637[1], 0, i636, 'clip')
  request.r(i637[2], i637[3], 0, i636, 'outputAudioMixerGroup')
  i636.playOnAwake = !!i637[4]
  i636.loop = !!i637[5]
  i636.time = i637[6]
  i636.volume = i637[7]
  i636.pitch = i637[8]
  i636.enabled = !!i637[9]
  return i636
}

Deserializers["CEBB.Playable.CherryHouseReveal"] = function (request, data, root) {
  var i638 = root || request.c( 'CEBB.Playable.CherryHouseReveal' )
  var i639 = data
  request.r(i639[0], i639[1], 0, i638, 'game')
  request.r(i639[2], i639[3], 0, i638, 'player')
  i638.revealSeconds = i639[4]
  i638.houseTarget = new pc.Vec3( i639[5], i639[6], i639[7] )
  return i638
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i641 = data
  i640.pivot = new pc.Vec2( i641[0], i641[1] )
  i640.anchorMin = new pc.Vec2( i641[2], i641[3] )
  i640.anchorMax = new pc.Vec2( i641[4], i641[5] )
  i640.sizeDelta = new pc.Vec2( i641[6], i641[7] )
  i640.anchoredPosition3D = new pc.Vec3( i641[8], i641[9], i641[10] )
  i640.rotation = new pc.Quat(i641[11], i641[12], i641[13], i641[14])
  i640.scale = new pc.Vec3( i641[15], i641[16], i641[17] )
  return i640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i643 = data
  i642.planeDistance = i643[0]
  i642.referencePixelsPerUnit = i643[1]
  i642.isFallbackOverlay = !!i643[2]
  i642.renderMode = i643[3]
  i642.renderOrder = i643[4]
  i642.sortingLayerName = i643[5]
  i642.sortingOrder = i643[6]
  i642.scaleFactor = i643[7]
  request.r(i643[8], i643[9], 0, i642, 'worldCamera')
  i642.overrideSorting = !!i643[10]
  i642.pixelPerfect = !!i643[11]
  i642.targetDisplay = i643[12]
  i642.overridePixelPerfect = !!i643[13]
  i642.enabled = !!i643[14]
  return i642
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i644 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i645 = data
  i644.m_UiScaleMode = i645[0]
  i644.m_ReferencePixelsPerUnit = i645[1]
  i644.m_ScaleFactor = i645[2]
  i644.m_ReferenceResolution = new pc.Vec2( i645[3], i645[4] )
  i644.m_ScreenMatchMode = i645[5]
  i644.m_MatchWidthOrHeight = i645[6]
  i644.m_PhysicalUnit = i645[7]
  i644.m_FallbackScreenDPI = i645[8]
  i644.m_DefaultSpriteDPI = i645[9]
  i644.m_DynamicPixelsPerUnit = i645[10]
  i644.m_PresetInfoIsWorld = !!i645[11]
  return i644
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i646 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i647 = data
  i646.m_IgnoreReversedGraphics = !!i647[0]
  i646.m_BlockingObjects = i647[1]
  i646.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i647[2] )
  return i646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i649 = data
  i648.cullTransparentMesh = !!i649[0]
  return i648
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i650 = root || request.c( 'UnityEngine.UI.Image' )
  var i651 = data
  request.r(i651[0], i651[1], 0, i650, 'm_Sprite')
  i650.m_Type = i651[2]
  i650.m_PreserveAspect = !!i651[3]
  i650.m_FillCenter = !!i651[4]
  i650.m_FillMethod = i651[5]
  i650.m_FillAmount = i651[6]
  i650.m_FillClockwise = !!i651[7]
  i650.m_FillOrigin = i651[8]
  i650.m_UseSpriteMesh = !!i651[9]
  i650.m_PixelsPerUnitMultiplier = i651[10]
  request.r(i651[11], i651[12], 0, i650, 'm_Material')
  i650.m_Maskable = !!i651[13]
  i650.m_Color = new pc.Color(i651[14], i651[15], i651[16], i651[17])
  i650.m_RaycastTarget = !!i651[18]
  i650.m_RaycastPadding = new pc.Vec4( i651[19], i651[20], i651[21], i651[22] )
  return i650
}

Deserializers["CEBB.Playable.RoomLookSurface"] = function (request, data, root) {
  var i652 = root || request.c( 'CEBB.Playable.RoomLookSurface' )
  var i653 = data
  request.r(i653[0], i653[1], 0, i652, 'player')
  return i652
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i654 = root || request.c( 'UnityEngine.UI.Button' )
  var i655 = data
  i654.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i655[0], i654.m_OnClick)
  i654.m_Navigation = request.d('UnityEngine.UI.Navigation', i655[1], i654.m_Navigation)
  i654.m_Transition = i655[2]
  i654.m_Colors = request.d('UnityEngine.UI.ColorBlock', i655[3], i654.m_Colors)
  i654.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i655[4], i654.m_SpriteState)
  i654.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i655[5], i654.m_AnimationTriggers)
  i654.m_Interactable = !!i655[6]
  request.r(i655[7], i655[8], 0, i654, 'm_TargetGraphic')
  return i654
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i656 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i657 = data
  i656.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i657[0], i656.m_PersistentCalls)
  return i656
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i658 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i659 = data
  i658.m_Mode = i659[0]
  i658.m_WrapAround = !!i659[1]
  request.r(i659[2], i659[3], 0, i658, 'm_SelectOnUp')
  request.r(i659[4], i659[5], 0, i658, 'm_SelectOnDown')
  request.r(i659[6], i659[7], 0, i658, 'm_SelectOnLeft')
  request.r(i659[8], i659[9], 0, i658, 'm_SelectOnRight')
  return i658
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i660 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i661 = data
  i660.m_NormalColor = new pc.Color(i661[0], i661[1], i661[2], i661[3])
  i660.m_HighlightedColor = new pc.Color(i661[4], i661[5], i661[6], i661[7])
  i660.m_PressedColor = new pc.Color(i661[8], i661[9], i661[10], i661[11])
  i660.m_SelectedColor = new pc.Color(i661[12], i661[13], i661[14], i661[15])
  i660.m_DisabledColor = new pc.Color(i661[16], i661[17], i661[18], i661[19])
  i660.m_ColorMultiplier = i661[20]
  i660.m_FadeDuration = i661[21]
  return i660
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i662 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i663 = data
  request.r(i663[0], i663[1], 0, i662, 'm_HighlightedSprite')
  request.r(i663[2], i663[3], 0, i662, 'm_PressedSprite')
  request.r(i663[4], i663[5], 0, i662, 'm_SelectedSprite')
  request.r(i663[6], i663[7], 0, i662, 'm_DisabledSprite')
  return i662
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i664 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i665 = data
  i664.m_NormalTrigger = i665[0]
  i664.m_HighlightedTrigger = i665[1]
  i664.m_PressedTrigger = i665[2]
  i664.m_SelectedTrigger = i665[3]
  i664.m_DisabledTrigger = i665[4]
  return i664
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i666 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i667 = data
  i666.m_hasFontAssetChanged = !!i667[0]
  request.r(i667[1], i667[2], 0, i666, 'm_baseMaterial')
  i666.m_maskOffset = new pc.Vec4( i667[3], i667[4], i667[5], i667[6] )
  i666.m_text = i667[7]
  i666.m_isRightToLeft = !!i667[8]
  request.r(i667[9], i667[10], 0, i666, 'm_fontAsset')
  request.r(i667[11], i667[12], 0, i666, 'm_sharedMaterial')
  var i669 = i667[13]
  var i668 = []
  for(var i = 0; i < i669.length; i += 2) {
  request.r(i669[i + 0], i669[i + 1], 2, i668, '')
  }
  i666.m_fontSharedMaterials = i668
  request.r(i667[14], i667[15], 0, i666, 'm_fontMaterial')
  var i671 = i667[16]
  var i670 = []
  for(var i = 0; i < i671.length; i += 2) {
  request.r(i671[i + 0], i671[i + 1], 2, i670, '')
  }
  i666.m_fontMaterials = i670
  i666.m_fontColor32 = UnityEngine.Color32.ConstructColor(i667[17], i667[18], i667[19], i667[20])
  i666.m_fontColor = new pc.Color(i667[21], i667[22], i667[23], i667[24])
  i666.m_enableVertexGradient = !!i667[25]
  i666.m_colorMode = i667[26]
  i666.m_fontColorGradient = request.d('TMPro.VertexGradient', i667[27], i666.m_fontColorGradient)
  request.r(i667[28], i667[29], 0, i666, 'm_fontColorGradientPreset')
  request.r(i667[30], i667[31], 0, i666, 'm_spriteAsset')
  i666.m_tintAllSprites = !!i667[32]
  request.r(i667[33], i667[34], 0, i666, 'm_StyleSheet')
  i666.m_TextStyleHashCode = i667[35]
  i666.m_overrideHtmlColors = !!i667[36]
  i666.m_faceColor = UnityEngine.Color32.ConstructColor(i667[37], i667[38], i667[39], i667[40])
  i666.m_fontSize = i667[41]
  i666.m_fontSizeBase = i667[42]
  i666.m_fontWeight = i667[43]
  i666.m_enableAutoSizing = !!i667[44]
  i666.m_fontSizeMin = i667[45]
  i666.m_fontSizeMax = i667[46]
  i666.m_fontStyle = i667[47]
  i666.m_HorizontalAlignment = i667[48]
  i666.m_VerticalAlignment = i667[49]
  i666.m_textAlignment = i667[50]
  i666.m_characterSpacing = i667[51]
  i666.m_wordSpacing = i667[52]
  i666.m_lineSpacing = i667[53]
  i666.m_lineSpacingMax = i667[54]
  i666.m_paragraphSpacing = i667[55]
  i666.m_charWidthMaxAdj = i667[56]
  i666.m_TextWrappingMode = i667[57]
  i666.m_wordWrappingRatios = i667[58]
  i666.m_overflowMode = i667[59]
  request.r(i667[60], i667[61], 0, i666, 'm_linkedTextComponent')
  request.r(i667[62], i667[63], 0, i666, 'parentLinkedComponent')
  i666.m_enableKerning = !!i667[64]
  var i673 = i667[65]
  var i672 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i673.length; i += 1) {
    i672.add(i673[i + 0]);
  }
  i666.m_ActiveFontFeatures = i672
  i666.m_enableExtraPadding = !!i667[66]
  i666.checkPaddingRequired = !!i667[67]
  i666.m_isRichText = !!i667[68]
  i666.m_parseCtrlCharacters = !!i667[69]
  i666.m_isOrthographic = !!i667[70]
  i666.m_isCullingEnabled = !!i667[71]
  i666.m_horizontalMapping = i667[72]
  i666.m_verticalMapping = i667[73]
  i666.m_uvLineOffset = i667[74]
  i666.m_geometrySortingOrder = i667[75]
  i666.m_IsTextObjectScaleStatic = !!i667[76]
  i666.m_VertexBufferAutoSizeReduction = !!i667[77]
  i666.m_useMaxVisibleDescender = !!i667[78]
  i666.m_pageToDisplay = i667[79]
  i666.m_margin = new pc.Vec4( i667[80], i667[81], i667[82], i667[83] )
  i666.m_isUsingLegacyAnimationComponent = !!i667[84]
  i666.m_isVolumetricText = !!i667[85]
  request.r(i667[86], i667[87], 0, i666, 'm_Material')
  i666.m_EmojiFallbackSupport = !!i667[88]
  i666.m_Maskable = !!i667[89]
  i666.m_Color = new pc.Color(i667[90], i667[91], i667[92], i667[93])
  i666.m_RaycastTarget = !!i667[94]
  i666.m_RaycastPadding = new pc.Vec4( i667[95], i667[96], i667[97], i667[98] )
  return i666
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i674 = root || request.c( 'TMPro.VertexGradient' )
  var i675 = data
  i674.topLeft = new pc.Color(i675[0], i675[1], i675[2], i675[3])
  i674.topRight = new pc.Color(i675[4], i675[5], i675[6], i675[7])
  i674.bottomLeft = new pc.Color(i675[8], i675[9], i675[10], i675[11])
  i674.bottomRight = new pc.Color(i675[12], i675[13], i675[14], i675[15])
  return i674
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i678 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i679 = data
  i678.m_StartCorner = i679[0]
  i678.m_StartAxis = i679[1]
  i678.m_CellSize = new pc.Vec2( i679[2], i679[3] )
  i678.m_Spacing = new pc.Vec2( i679[4], i679[5] )
  i678.m_Constraint = i679[6]
  i678.m_ConstraintCount = i679[7]
  i678.m_Padding = UnityEngine.RectOffset.FromPaddings(i679[8], i679[9], i679[10], i679[11])
  i678.m_ChildAlignment = i679[12]
  return i678
}

Deserializers["CEBB.Playable.RoomMovePad"] = function (request, data, root) {
  var i680 = root || request.c( 'CEBB.Playable.RoomMovePad' )
  var i681 = data
  request.r(i681[0], i681[1], 0, i680, 'thumbRect')
  i680.demo = !!i681[2]
  i680.demoPull = i681[3]
  i680.demoCycleSeconds = i681[4]
  return i680
}

Deserializers["CEBB.Playable.SakuraEndCardMotion"] = function (request, data, root) {
  var i682 = root || request.c( 'CEBB.Playable.SakuraEndCardMotion' )
  var i683 = data
  request.r(i683[0], i683[1], 0, i682, 'playButton')
  request.r(i683[2], i683[3], 0, i682, 'shine')
  request.r(i683[4], i683[5], 0, i682, 'shineImage')
  var i685 = i683[6]
  var i684 = []
  for(var i = 0; i < i685.length; i += 2) {
  request.r(i685[i + 0], i685[i + 1], 2, i684, '')
  }
  i682.gameplayUI = i684
  i682.pulseSeconds = i683[7]
  i682.pulseScale = i683[8]
  i682.shineInterval = i683[9]
  i682.shineSeconds = i683[10]
  return i682
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i688 = root || request.c( 'UnityEngine.UI.Mask' )
  var i689 = data
  i688.m_ShowMaskGraphic = !!i689[0]
  return i688
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i690 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i691 = data
  i690.m_AspectMode = i691[0]
  i690.m_AspectRatio = i691[1]
  return i690
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i692 = root || request.c( 'UnityEngine.UI.Outline' )
  var i693 = data
  i692.m_EffectColor = new pc.Color(i693[0], i693[1], i693[2], i693[3])
  i692.m_EffectDistance = new pc.Vec2( i693[4], i693[5] )
  i692.m_UseGraphicAlpha = !!i693[6]
  return i692
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i694 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i695 = data
  request.r(i695[0], i695[1], 0, i694, 'm_FirstSelected')
  i694.m_sendNavigationEvents = !!i695[2]
  i694.m_DragThreshold = i695[3]
  return i694
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i696 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i697 = data
  i696.m_HorizontalAxis = i697[0]
  i696.m_VerticalAxis = i697[1]
  i696.m_SubmitButton = i697[2]
  i696.m_CancelButton = i697[3]
  i696.m_InputActionsPerSecond = i697[4]
  i696.m_RepeatDelay = i697[5]
  i696.m_ForceModuleActive = !!i697[6]
  i696.m_SendPointerHoverToParent = !!i697[7]
  return i696
}

Deserializers["CEBB.Playable.FirstPersonRoom"] = function (request, data, root) {
  var i698 = root || request.c( 'CEBB.Playable.FirstPersonRoom' )
  var i699 = data
  request.r(i699[0], i699[1], 0, i698, 'game')
  request.r(i699[2], i699[3], 0, i698, 'playerCamera')
  request.r(i699[4], i699[5], 0, i698, 'movePad')
  request.r(i699[6], i699[7], 0, i698, 'reticle')
  i698.spawnPosition = new pc.Vec3( i699[8], i699[9], i699[10] )
  i698.eyeHeight = i699[11]
  i698.walkSpeed = i699[12]
  i698.lookSensitivity = i699[13]
  i698.buildReach = i699[14]
  i698.yaw = i699[15]
  i698.pitch = i699[16]
  i698.minRoom = new pc.Vec2( i699[17], i699[18] )
  i698.maxRoom = new pc.Vec2( i699[19], i699[20] )
  i698.centerFirstTarget = !!i699[21]
  i698.bodyRadius = i699[22]
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i701 = data
  i700.center = new pc.Vec3( i701[0], i701[1], i701[2] )
  i700.size = new pc.Vec3( i701[3], i701[4], i701[5] )
  i700.enabled = !!i701[6]
  i700.isTrigger = !!i701[7]
  request.r(i701[8], i701[9], 0, i700, 'material')
  return i700
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i703 = data
  i702.ambientIntensity = i703[0]
  i702.reflectionIntensity = i703[1]
  i702.ambientMode = i703[2]
  i702.ambientLight = new pc.Color(i703[3], i703[4], i703[5], i703[6])
  i702.ambientSkyColor = new pc.Color(i703[7], i703[8], i703[9], i703[10])
  i702.ambientGroundColor = new pc.Color(i703[11], i703[12], i703[13], i703[14])
  i702.ambientEquatorColor = new pc.Color(i703[15], i703[16], i703[17], i703[18])
  i702.fogColor = new pc.Color(i703[19], i703[20], i703[21], i703[22])
  i702.fogEndDistance = i703[23]
  i702.fogStartDistance = i703[24]
  i702.fogDensity = i703[25]
  i702.fog = !!i703[26]
  request.r(i703[27], i703[28], 0, i702, 'skybox')
  i702.fogMode = i703[29]
  var i705 = i703[30]
  var i704 = []
  for(var i = 0; i < i705.length; i += 1) {
    i704.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i705[i + 0]) );
  }
  i702.lightmaps = i704
  i702.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i703[31], i702.lightProbes)
  i702.lightmapsMode = i703[32]
  i702.mixedBakeMode = i703[33]
  i702.environmentLightingMode = i703[34]
  i702.ambientProbe = new pc.SphericalHarmonicsL2(i703[35])
  request.r(i703[36], i703[37], 0, i702, 'customReflection')
  request.r(i703[38], i703[39], 0, i702, 'defaultReflection')
  i702.defaultReflectionMode = i703[40]
  i702.defaultReflectionResolution = i703[41]
  i702.sunLightObjectId = i703[42]
  i702.pixelLightCount = i703[43]
  i702.defaultReflectionHDR = !!i703[44]
  i702.hasLightDataAsset = !!i703[45]
  i702.hasManualGenerate = !!i703[46]
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i709 = data
  request.r(i709[0], i709[1], 0, i708, 'lightmapColor')
  request.r(i709[2], i709[3], 0, i708, 'lightmapDirection')
  request.r(i709[4], i709[5], 0, i708, 'shadowMask')
  return i708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i710 = root || new UnityEngine.LightProbes()
  var i711 = data
  return i710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i719 = data
  var i721 = i719[0]
  var i720 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i721.length; i += 1) {
    i720.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i721[i + 0]));
  }
  i718.ShaderCompilationErrors = i720
  i718.name = i719[1]
  i718.guid = i719[2]
  var i723 = i719[3]
  var i722 = []
  for(var i = 0; i < i723.length; i += 1) {
    i722.push( i723[i + 0] );
  }
  i718.shaderDefinedKeywords = i722
  var i725 = i719[4]
  var i724 = []
  for(var i = 0; i < i725.length; i += 1) {
    i724.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i725[i + 0]) );
  }
  i718.passes = i724
  var i727 = i719[5]
  var i726 = []
  for(var i = 0; i < i727.length; i += 1) {
    i726.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i727[i + 0]) );
  }
  i718.usePasses = i726
  var i729 = i719[6]
  var i728 = []
  for(var i = 0; i < i729.length; i += 1) {
    i728.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i729[i + 0]) );
  }
  i718.defaultParameterValues = i728
  request.r(i719[7], i719[8], 0, i718, 'unityFallbackShader')
  i718.readDepth = !!i719[9]
  i718.hasDepthOnlyPass = !!i719[10]
  i718.isCreatedByShaderGraph = !!i719[11]
  i718.disableBatching = !!i719[12]
  i718.compiled = !!i719[13]
  return i718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i732 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i733 = data
  i732.shaderName = i733[0]
  i732.errorMessage = i733[1]
  return i732
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i738 = root || new pc.UnityShaderPass()
  var i739 = data
  i738.id = i739[0]
  i738.subShaderIndex = i739[1]
  i738.name = i739[2]
  i738.passType = i739[3]
  i738.grabPassTextureName = i739[4]
  i738.usePass = !!i739[5]
  i738.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[6], i738.zTest)
  i738.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[7], i738.zWrite)
  i738.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[8], i738.culling)
  i738.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i739[9], i738.blending)
  i738.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i739[10], i738.alphaBlending)
  i738.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[11], i738.colorWriteMask)
  i738.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[12], i738.offsetUnits)
  i738.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[13], i738.offsetFactor)
  i738.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[14], i738.stencilRef)
  i738.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[15], i738.stencilReadMask)
  i738.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i739[16], i738.stencilWriteMask)
  i738.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i739[17], i738.stencilOp)
  i738.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i739[18], i738.stencilOpFront)
  i738.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i739[19], i738.stencilOpBack)
  var i741 = i739[20]
  var i740 = []
  for(var i = 0; i < i741.length; i += 1) {
    i740.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i741[i + 0]) );
  }
  i738.tags = i740
  var i743 = i739[21]
  var i742 = []
  for(var i = 0; i < i743.length; i += 1) {
    i742.push( i743[i + 0] );
  }
  i738.passDefinedKeywords = i742
  var i745 = i739[22]
  var i744 = []
  for(var i = 0; i < i745.length; i += 1) {
    i744.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i745[i + 0]) );
  }
  i738.passDefinedKeywordGroups = i744
  var i747 = i739[23]
  var i746 = []
  for(var i = 0; i < i747.length; i += 1) {
    i746.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i747[i + 0]) );
  }
  i738.variants = i746
  var i749 = i739[24]
  var i748 = []
  for(var i = 0; i < i749.length; i += 1) {
    i748.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i749[i + 0]) );
  }
  i738.excludedVariants = i748
  i738.hasDepthReader = !!i739[25]
  return i738
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i751 = data
  i750.val = i751[0]
  i750.name = i751[1]
  return i750
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i752 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i753 = data
  i752.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i753[0], i752.src)
  i752.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i753[1], i752.dst)
  i752.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i753[2], i752.op)
  return i752
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i754 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i755 = data
  i754.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i755[0], i754.pass)
  i754.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i755[1], i754.fail)
  i754.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i755[2], i754.zFail)
  i754.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i755[3], i754.comp)
  return i754
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i758 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i759 = data
  i758.name = i759[0]
  i758.value = i759[1]
  return i758
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i762 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i763 = data
  var i765 = i763[0]
  var i764 = []
  for(var i = 0; i < i765.length; i += 1) {
    i764.push( i765[i + 0] );
  }
  i762.keywords = i764
  i762.hasDiscard = !!i763[1]
  return i762
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i769 = data
  i768.passId = i769[0]
  i768.subShaderIndex = i769[1]
  var i771 = i769[2]
  var i770 = []
  for(var i = 0; i < i771.length; i += 1) {
    i770.push( i771[i + 0] );
  }
  i768.keywords = i770
  i768.vertexProgram = i769[3]
  i768.fragmentProgram = i769[4]
  i768.exportedForWebGl2 = !!i769[5]
  i768.readDepth = !!i769[6]
  return i768
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i775 = data
  request.r(i775[0], i775[1], 0, i774, 'shader')
  i774.pass = i775[2]
  return i774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i779 = data
  i778.name = i779[0]
  i778.type = i779[1]
  i778.value = new pc.Vec4( i779[2], i779[3], i779[4], i779[5] )
  i778.textureValue = i779[6]
  i778.shaderPropertyFlag = i779[7]
  return i778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i780 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i781 = data
  i780.name = i781[0]
  request.r(i781[1], i781[2], 0, i780, 'texture')
  i780.aabb = i781[3]
  i780.vertices = i781[4]
  i780.triangles = i781[5]
  i780.textureRect = UnityEngine.Rect.MinMaxRect(i781[6], i781[7], i781[8], i781[9])
  i780.packedRect = UnityEngine.Rect.MinMaxRect(i781[10], i781[11], i781[12], i781[13])
  i780.border = new pc.Vec4( i781[14], i781[15], i781[16], i781[17] )
  i780.transparency = i781[18]
  i780.bounds = i781[19]
  i780.pixelsPerUnit = i781[20]
  i780.textureWidth = i781[21]
  i780.textureHeight = i781[22]
  i780.nativeSize = new pc.Vec2( i781[23], i781[24] )
  i780.pivot = new pc.Vec2( i781[25], i781[26] )
  i780.textureRectOffset = new pc.Vec2( i781[27], i781[28] )
  return i780
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i783 = data
  i782.name = i783[0]
  return i782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i785 = data
  i784.name = i785[0]
  i784.ascent = i785[1]
  i784.originalLineHeight = i785[2]
  i784.fontSize = i785[3]
  var i787 = i785[4]
  var i786 = []
  for(var i = 0; i < i787.length; i += 1) {
    i786.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i787[i + 0]) );
  }
  i784.characterInfo = i786
  request.r(i785[5], i785[6], 0, i784, 'texture')
  i784.originalFontSize = i785[7]
  return i784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i791 = data
  i790.index = i791[0]
  i790.advance = i791[1]
  i790.bearing = i791[2]
  i790.glyphWidth = i791[3]
  i790.glyphHeight = i791[4]
  i790.minX = i791[5]
  i790.maxX = i791[6]
  i790.minY = i791[7]
  i790.maxY = i791[8]
  i790.uvBottomLeftX = i791[9]
  i790.uvBottomLeftY = i791[10]
  i790.uvBottomRightX = i791[11]
  i790.uvBottomRightY = i791[12]
  i790.uvTopLeftX = i791[13]
  i790.uvTopLeftY = i791[14]
  i790.uvTopRightX = i791[15]
  i790.uvTopRightY = i791[16]
  return i790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i792 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i793 = data
  i792.name = i793[0]
  i792.bytes64 = i793[1]
  i792.data = i793[2]
  return i792
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i794 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i795 = data
  i794.normalStyle = i795[0]
  i794.normalSpacingOffset = i795[1]
  i794.boldStyle = i795[2]
  i794.boldSpacing = i795[3]
  i794.italicStyle = i795[4]
  i794.tabSize = i795[5]
  request.r(i795[6], i795[7], 0, i794, 'atlas')
  i794.m_SourceFontFileGUID = i795[8]
  i794.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i795[9], i794.m_CreationSettings)
  request.r(i795[10], i795[11], 0, i794, 'm_SourceFontFile')
  i794.m_SourceFontFilePath = i795[12]
  i794.m_AtlasPopulationMode = i795[13]
  i794.InternalDynamicOS = !!i795[14]
  var i797 = i795[15]
  var i796 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i797.length; i += 1) {
    i796.add(request.d('UnityEngine.TextCore.Glyph', i797[i + 0]));
  }
  i794.m_GlyphTable = i796
  var i799 = i795[16]
  var i798 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i799.length; i += 1) {
    i798.add(request.d('TMPro.TMP_Character', i799[i + 0]));
  }
  i794.m_CharacterTable = i798
  var i801 = i795[17]
  var i800 = []
  for(var i = 0; i < i801.length; i += 2) {
  request.r(i801[i + 0], i801[i + 1], 2, i800, '')
  }
  i794.m_AtlasTextures = i800
  i794.m_AtlasTextureIndex = i795[18]
  i794.m_IsMultiAtlasTexturesEnabled = !!i795[19]
  i794.m_GetFontFeatures = !!i795[20]
  i794.m_ClearDynamicDataOnBuild = !!i795[21]
  i794.m_AtlasWidth = i795[22]
  i794.m_AtlasHeight = i795[23]
  i794.m_AtlasPadding = i795[24]
  i794.m_AtlasRenderMode = i795[25]
  var i803 = i795[26]
  var i802 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i803.length; i += 1) {
    i802.add(request.d('UnityEngine.TextCore.GlyphRect', i803[i + 0]));
  }
  i794.m_UsedGlyphRects = i802
  var i805 = i795[27]
  var i804 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i805.length; i += 1) {
    i804.add(request.d('UnityEngine.TextCore.GlyphRect', i805[i + 0]));
  }
  i794.m_FreeGlyphRects = i804
  i794.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i795[28], i794.m_FontFeatureTable)
  i794.m_ShouldReimportFontFeatures = !!i795[29]
  var i807 = i795[30]
  var i806 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i807.length; i += 2) {
  request.r(i807[i + 0], i807[i + 1], 1, i806, '')
  }
  i794.m_FallbackFontAssetTable = i806
  var i809 = i795[31]
  var i808 = []
  for(var i = 0; i < i809.length; i += 1) {
    i808.push( request.d('TMPro.TMP_FontWeightPair', i809[i + 0]) );
  }
  i794.m_FontWeightTable = i808
  var i811 = i795[32]
  var i810 = []
  for(var i = 0; i < i811.length; i += 1) {
    i810.push( request.d('TMPro.TMP_FontWeightPair', i811[i + 0]) );
  }
  i794.fontWeights = i810
  i794.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i795[33], i794.m_fontInfo)
  var i813 = i795[34]
  var i812 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i813.length; i += 1) {
    i812.add(request.d('TMPro.TMP_Glyph', i813[i + 0]));
  }
  i794.m_glyphInfoList = i812
  i794.m_KerningTable = request.d('TMPro.KerningTable', i795[35], i794.m_KerningTable)
  var i815 = i795[36]
  var i814 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i815.length; i += 2) {
  request.r(i815[i + 0], i815[i + 1], 1, i814, '')
  }
  i794.fallbackFontAssets = i814
  i794.m_Version = i795[37]
  i794.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i795[38], i794.m_FaceInfo)
  request.r(i795[39], i795[40], 0, i794, 'm_Material')
  return i794
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i816 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i817 = data
  i816.sourceFontFileName = i817[0]
  i816.sourceFontFileGUID = i817[1]
  i816.faceIndex = i817[2]
  i816.pointSizeSamplingMode = i817[3]
  i816.pointSize = i817[4]
  i816.padding = i817[5]
  i816.paddingMode = i817[6]
  i816.packingMode = i817[7]
  i816.atlasWidth = i817[8]
  i816.atlasHeight = i817[9]
  i816.characterSetSelectionMode = i817[10]
  i816.characterSequence = i817[11]
  i816.referencedFontAssetGUID = i817[12]
  i816.referencedTextAssetGUID = i817[13]
  i816.fontStyle = i817[14]
  i816.fontStyleModifier = i817[15]
  i816.renderMode = i817[16]
  i816.includeFontFeatures = !!i817[17]
  return i816
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i820 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i821 = data
  i820.m_Index = i821[0]
  i820.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i821[1], i820.m_Metrics)
  i820.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i821[2], i820.m_GlyphRect)
  i820.m_Scale = i821[3]
  i820.m_AtlasIndex = i821[4]
  i820.m_ClassDefinitionType = i821[5]
  return i820
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i822 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i823 = data
  i822.m_Width = i823[0]
  i822.m_Height = i823[1]
  i822.m_HorizontalBearingX = i823[2]
  i822.m_HorizontalBearingY = i823[3]
  i822.m_HorizontalAdvance = i823[4]
  return i822
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i824 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i825 = data
  i824.m_X = i825[0]
  i824.m_Y = i825[1]
  i824.m_Width = i825[2]
  i824.m_Height = i825[3]
  return i824
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i828 = root || request.c( 'TMPro.TMP_Character' )
  var i829 = data
  i828.m_ElementType = i829[0]
  i828.m_Unicode = i829[1]
  i828.m_GlyphIndex = i829[2]
  i828.m_Scale = i829[3]
  return i828
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i834 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i835 = data
  var i837 = i835[0]
  var i836 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i837.length; i += 1) {
    i836.add(request.d('TMPro.MultipleSubstitutionRecord', i837[i + 0]));
  }
  i834.m_MultipleSubstitutionRecords = i836
  var i839 = i835[1]
  var i838 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i839.length; i += 1) {
    i838.add(request.d('TMPro.LigatureSubstitutionRecord', i839[i + 0]));
  }
  i834.m_LigatureSubstitutionRecords = i838
  var i841 = i835[2]
  var i840 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i841.length; i += 1) {
    i840.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i841[i + 0]));
  }
  i834.m_GlyphPairAdjustmentRecords = i840
  var i843 = i835[3]
  var i842 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i843.length; i += 1) {
    i842.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i843[i + 0]));
  }
  i834.m_MarkToBaseAdjustmentRecords = i842
  var i845 = i835[4]
  var i844 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i845.length; i += 1) {
    i844.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i845[i + 0]));
  }
  i834.m_MarkToMarkAdjustmentRecords = i844
  return i834
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i848 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i849 = data
  i848.m_TargetGlyphID = i849[0]
  i848.m_SubstituteGlyphIDs = i849[1]
  return i848
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i852 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i853 = data
  i852.m_ComponentGlyphIDs = i853[0]
  i852.m_LigatureGlyphID = i853[1]
  return i852
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i856 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i857 = data
  i856.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i857[0], i856.m_FirstAdjustmentRecord)
  i856.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i857[1], i856.m_SecondAdjustmentRecord)
  i856.m_FeatureLookupFlags = i857[2]
  return i856
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i860 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i861 = data
  i860.m_BaseGlyphID = i861[0]
  i860.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i861[1], i860.m_BaseGlyphAnchorPoint)
  i860.m_MarkGlyphID = i861[2]
  i860.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i861[3], i860.m_MarkPositionAdjustment)
  return i860
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i864 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i865 = data
  i864.m_BaseMarkGlyphID = i865[0]
  i864.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i865[1], i864.m_BaseMarkGlyphAnchorPoint)
  i864.m_CombiningMarkGlyphID = i865[2]
  i864.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i865[3], i864.m_CombiningMarkPositionAdjustment)
  return i864
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i870 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i871 = data
  request.r(i871[0], i871[1], 0, i870, 'regularTypeface')
  request.r(i871[2], i871[3], 0, i870, 'italicTypeface')
  return i870
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i872 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i873 = data
  i872.Name = i873[0]
  i872.PointSize = i873[1]
  i872.Scale = i873[2]
  i872.CharacterCount = i873[3]
  i872.LineHeight = i873[4]
  i872.Baseline = i873[5]
  i872.Ascender = i873[6]
  i872.CapHeight = i873[7]
  i872.Descender = i873[8]
  i872.CenterLine = i873[9]
  i872.SuperscriptOffset = i873[10]
  i872.SubscriptOffset = i873[11]
  i872.SubSize = i873[12]
  i872.Underline = i873[13]
  i872.UnderlineThickness = i873[14]
  i872.strikethrough = i873[15]
  i872.strikethroughThickness = i873[16]
  i872.TabWidth = i873[17]
  i872.Padding = i873[18]
  i872.AtlasWidth = i873[19]
  i872.AtlasHeight = i873[20]
  return i872
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i876 = root || request.c( 'TMPro.TMP_Glyph' )
  var i877 = data
  i876.id = i877[0]
  i876.x = i877[1]
  i876.y = i877[2]
  i876.width = i877[3]
  i876.height = i877[4]
  i876.xOffset = i877[5]
  i876.yOffset = i877[6]
  i876.xAdvance = i877[7]
  i876.scale = i877[8]
  return i876
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i878 = root || request.c( 'TMPro.KerningTable' )
  var i879 = data
  var i881 = i879[0]
  var i880 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i881.length; i += 1) {
    i880.add(request.d('TMPro.KerningPair', i881[i + 0]));
  }
  i878.kerningPairs = i880
  return i878
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i884 = root || request.c( 'TMPro.KerningPair' )
  var i885 = data
  i884.xOffset = i885[0]
  i884.m_FirstGlyph = i885[1]
  i884.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i885[2], i884.m_FirstGlyphAdjustments)
  i884.m_SecondGlyph = i885[3]
  i884.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i885[4], i884.m_SecondGlyphAdjustments)
  i884.m_IgnoreSpacingAdjustments = !!i885[5]
  return i884
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i886 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i887 = data
  i886.m_FaceIndex = i887[0]
  i886.m_FamilyName = i887[1]
  i886.m_StyleName = i887[2]
  i886.m_PointSize = i887[3]
  i886.m_Scale = i887[4]
  i886.m_UnitsPerEM = i887[5]
  i886.m_LineHeight = i887[6]
  i886.m_AscentLine = i887[7]
  i886.m_CapLine = i887[8]
  i886.m_MeanLine = i887[9]
  i886.m_Baseline = i887[10]
  i886.m_DescentLine = i887[11]
  i886.m_SuperscriptOffset = i887[12]
  i886.m_SuperscriptSize = i887[13]
  i886.m_SubscriptOffset = i887[14]
  i886.m_SubscriptSize = i887[15]
  i886.m_UnderlineOffset = i887[16]
  i886.m_UnderlineThickness = i887[17]
  i886.m_StrikethroughOffset = i887[18]
  i886.m_StrikethroughThickness = i887[19]
  i886.m_TabWidth = i887[20]
  return i886
}

Deserializers["CEBB.Playable.FurnitureDefinition"] = function (request, data, root) {
  var i888 = root || request.c( 'CEBB.Playable.FurnitureDefinition' )
  var i889 = data
  i888.furnitureId = i889[0]
  i888.displayName = i889[1]
  request.r(i889[2], i889[3], 0, i888, 'prefab')
  request.r(i889[4], i889[5], 0, i888, 'icon')
  i888.walkableSurface = !!i889[6]
  return i888
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i890 = root || request.c( 'TMPro.TMP_Settings' )
  var i891 = data
  i890.assetVersion = i891[0]
  i890.m_TextWrappingMode = i891[1]
  i890.m_enableKerning = !!i891[2]
  var i893 = i891[3]
  var i892 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i893.length; i += 1) {
    i892.add(i893[i + 0]);
  }
  i890.m_ActiveFontFeatures = i892
  i890.m_enableExtraPadding = !!i891[4]
  i890.m_enableTintAllSprites = !!i891[5]
  i890.m_enableParseEscapeCharacters = !!i891[6]
  i890.m_EnableRaycastTarget = !!i891[7]
  i890.m_GetFontFeaturesAtRuntime = !!i891[8]
  i890.m_missingGlyphCharacter = i891[9]
  i890.m_ClearDynamicDataOnBuild = !!i891[10]
  i890.m_warningsDisabled = !!i891[11]
  request.r(i891[12], i891[13], 0, i890, 'm_defaultFontAsset')
  i890.m_defaultFontAssetPath = i891[14]
  i890.m_defaultFontSize = i891[15]
  i890.m_defaultAutoSizeMinRatio = i891[16]
  i890.m_defaultAutoSizeMaxRatio = i891[17]
  i890.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i891[18], i891[19] )
  i890.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i891[20], i891[21] )
  i890.m_autoSizeTextContainer = !!i891[22]
  i890.m_IsTextObjectScaleStatic = !!i891[23]
  var i895 = i891[24]
  var i894 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i895.length; i += 2) {
  request.r(i895[i + 0], i895[i + 1], 1, i894, '')
  }
  i890.m_fallbackFontAssets = i894
  i890.m_matchMaterialPreset = !!i891[25]
  i890.m_HideSubTextObjects = !!i891[26]
  request.r(i891[27], i891[28], 0, i890, 'm_defaultSpriteAsset')
  i890.m_defaultSpriteAssetPath = i891[29]
  i890.m_enableEmojiSupport = !!i891[30]
  i890.m_MissingCharacterSpriteUnicode = i891[31]
  var i897 = i891[32]
  var i896 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i897.length; i += 2) {
  request.r(i897[i + 0], i897[i + 1], 1, i896, '')
  }
  i890.m_EmojiFallbackTextAssets = i896
  i890.m_defaultColorGradientPresetsPath = i891[33]
  request.r(i891[34], i891[35], 0, i890, 'm_defaultStyleSheet')
  i890.m_StyleSheetsResourcePath = i891[36]
  request.r(i891[37], i891[38], 0, i890, 'm_leadingCharacters')
  request.r(i891[39], i891[40], 0, i890, 'm_followingCharacters')
  i890.m_UseModernHangulLineBreakingRules = !!i891[41]
  return i890
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i900 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i901 = data
  i900.m_GlyphIndex = i901[0]
  i900.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i901[1], i900.m_GlyphValueRecord)
  return i900
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i902 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i903 = data
  i902.m_XPlacement = i903[0]
  i902.m_YPlacement = i903[1]
  i902.m_XAdvance = i903[2]
  i902.m_YAdvance = i903[3]
  return i902
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i904 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i905 = data
  request.r(i905[0], i905[1], 0, i904, 'spriteSheet')
  var i907 = i905[2]
  var i906 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i907.length; i += 1) {
    i906.add(request.d('TMPro.TMP_Sprite', i907[i + 0]));
  }
  i904.spriteInfoList = i906
  var i909 = i905[3]
  var i908 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i909.length; i += 2) {
  request.r(i909[i + 0], i909[i + 1], 1, i908, '')
  }
  i904.fallbackSpriteAssets = i908
  var i911 = i905[4]
  var i910 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i911.length; i += 1) {
    i910.add(request.d('TMPro.TMP_SpriteCharacter', i911[i + 0]));
  }
  i904.m_SpriteCharacterTable = i910
  var i913 = i905[5]
  var i912 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i913.length; i += 1) {
    i912.add(request.d('TMPro.TMP_SpriteGlyph', i913[i + 0]));
  }
  i904.m_GlyphTable = i912
  i904.m_Version = i905[6]
  i904.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i905[7], i904.m_FaceInfo)
  request.r(i905[8], i905[9], 0, i904, 'm_Material')
  return i904
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i916 = root || request.c( 'TMPro.TMP_Sprite' )
  var i917 = data
  i916.name = i917[0]
  i916.hashCode = i917[1]
  i916.unicode = i917[2]
  i916.pivot = new pc.Vec2( i917[3], i917[4] )
  request.r(i917[5], i917[6], 0, i916, 'sprite')
  i916.id = i917[7]
  i916.x = i917[8]
  i916.y = i917[9]
  i916.width = i917[10]
  i916.height = i917[11]
  i916.xOffset = i917[12]
  i916.yOffset = i917[13]
  i916.xAdvance = i917[14]
  i916.scale = i917[15]
  return i916
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i922 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i923 = data
  i922.m_Name = i923[0]
  i922.m_ElementType = i923[1]
  i922.m_Unicode = i923[2]
  i922.m_GlyphIndex = i923[3]
  i922.m_Scale = i923[4]
  return i922
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i926 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i927 = data
  request.r(i927[0], i927[1], 0, i926, 'sprite')
  i926.m_Index = i927[2]
  i926.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i927[3], i926.m_Metrics)
  i926.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i927[4], i926.m_GlyphRect)
  i926.m_Scale = i927[5]
  i926.m_AtlasIndex = i927[6]
  i926.m_ClassDefinitionType = i927[7]
  return i926
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i928 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i929 = data
  var i931 = i929[0]
  var i930 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i931.length; i += 1) {
    i930.add(request.d('TMPro.TMP_Style', i931[i + 0]));
  }
  i928.m_StyleList = i930
  return i928
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i934 = root || request.c( 'TMPro.TMP_Style' )
  var i935 = data
  i934.m_Name = i935[0]
  i934.m_HashCode = i935[1]
  i934.m_OpeningDefinition = i935[2]
  i934.m_ClosingDefinition = i935[3]
  i934.m_OpeningTagArray = i935[4]
  i934.m_ClosingTagArray = i935[5]
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i937 = data
  var i939 = i937[0]
  var i938 = []
  for(var i = 0; i < i939.length; i += 1) {
    i938.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i939[i + 0]) );
  }
  i936.files = i938
  i936.componentToPrefabIds = i937[1]
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i943 = data
  i942.path = i943[0]
  request.r(i943[1], i943[2], 0, i942, 'unityObject')
  return i942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i945 = data
  var i947 = i945[0]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i947[i + 0]) );
  }
  i944.scriptsExecutionOrder = i946
  var i949 = i945[1]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i949[i + 0]) );
  }
  i944.sortingLayers = i948
  var i951 = i945[2]
  var i950 = []
  for(var i = 0; i < i951.length; i += 1) {
    i950.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i951[i + 0]) );
  }
  i944.cullingLayers = i950
  i944.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i945[3], i944.timeSettings)
  i944.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i945[4], i944.physicsSettings)
  i944.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i945[5], i944.physics2DSettings)
  i944.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i945[6], i944.qualitySettings)
  i944.enableRealtimeShadows = !!i945[7]
  i944.enableAutoInstancing = !!i945[8]
  i944.enableStaticBatching = !!i945[9]
  i944.enableDynamicBatching = !!i945[10]
  i944.usePreservativeDynamicBatching = !!i945[11]
  i944.lightmapEncodingQuality = i945[12]
  i944.desiredColorSpace = i945[13]
  var i953 = i945[14]
  var i952 = []
  for(var i = 0; i < i953.length; i += 1) {
    i952.push( i953[i + 0] );
  }
  i944.allTags = i952
  return i944
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i957 = data
  i956.name = i957[0]
  i956.value = i957[1]
  return i956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i960 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i961 = data
  i960.id = i961[0]
  i960.name = i961[1]
  i960.value = i961[2]
  return i960
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i965 = data
  i964.id = i965[0]
  i964.name = i965[1]
  return i964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i966 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i967 = data
  i966.fixedDeltaTime = i967[0]
  i966.maximumDeltaTime = i967[1]
  i966.timeScale = i967[2]
  i966.maximumParticleTimestep = i967[3]
  return i966
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i968 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i969 = data
  i968.gravity = new pc.Vec3( i969[0], i969[1], i969[2] )
  i968.defaultSolverIterations = i969[3]
  i968.bounceThreshold = i969[4]
  i968.autoSyncTransforms = !!i969[5]
  i968.autoSimulation = !!i969[6]
  var i971 = i969[7]
  var i970 = []
  for(var i = 0; i < i971.length; i += 1) {
    i970.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i971[i + 0]) );
  }
  i968.collisionMatrix = i970
  return i968
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i975 = data
  i974.enabled = !!i975[0]
  i974.layerId = i975[1]
  i974.otherLayerId = i975[2]
  return i974
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i976 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i977 = data
  request.r(i977[0], i977[1], 0, i976, 'material')
  i976.gravity = new pc.Vec2( i977[2], i977[3] )
  i976.positionIterations = i977[4]
  i976.velocityIterations = i977[5]
  i976.velocityThreshold = i977[6]
  i976.maxLinearCorrection = i977[7]
  i976.maxAngularCorrection = i977[8]
  i976.maxTranslationSpeed = i977[9]
  i976.maxRotationSpeed = i977[10]
  i976.baumgarteScale = i977[11]
  i976.baumgarteTOIScale = i977[12]
  i976.timeToSleep = i977[13]
  i976.linearSleepTolerance = i977[14]
  i976.angularSleepTolerance = i977[15]
  i976.defaultContactOffset = i977[16]
  i976.autoSimulation = !!i977[17]
  i976.queriesHitTriggers = !!i977[18]
  i976.queriesStartInColliders = !!i977[19]
  i976.callbacksOnDisable = !!i977[20]
  i976.reuseCollisionCallbacks = !!i977[21]
  i976.autoSyncTransforms = !!i977[22]
  var i979 = i977[23]
  var i978 = []
  for(var i = 0; i < i979.length; i += 1) {
    i978.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i979[i + 0]) );
  }
  i976.collisionMatrix = i978
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i983 = data
  i982.enabled = !!i983[0]
  i982.layerId = i983[1]
  i982.otherLayerId = i983[2]
  return i982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i985 = data
  var i987 = i985[0]
  var i986 = []
  for(var i = 0; i < i987.length; i += 1) {
    i986.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i987[i + 0]) );
  }
  i984.qualityLevels = i986
  var i989 = i985[1]
  var i988 = []
  for(var i = 0; i < i989.length; i += 1) {
    i988.push( i989[i + 0] );
  }
  i984.names = i988
  i984.shadows = i985[2]
  i984.anisotropicFiltering = i985[3]
  i984.antiAliasing = i985[4]
  i984.lodBias = i985[5]
  i984.shadowCascades = i985[6]
  i984.shadowDistance = i985[7]
  i984.shadowmaskMode = i985[8]
  i984.shadowProjection = i985[9]
  i984.shadowResolution = i985[10]
  i984.softParticles = !!i985[11]
  i984.softVegetation = !!i985[12]
  i984.activeColorSpace = i985[13]
  i984.desiredColorSpace = i985[14]
  i984.masterTextureLimit = i985[15]
  i984.maxQueuedFrames = i985[16]
  i984.particleRaycastBudget = i985[17]
  i984.pixelLightCount = i985[18]
  i984.realtimeReflectionProbes = !!i985[19]
  i984.shadowCascade2Split = i985[20]
  i984.shadowCascade4Split = new pc.Vec3( i985[21], i985[22], i985[23] )
  i984.streamingMipmapsActive = !!i985[24]
  i984.vSyncCount = i985[25]
  i984.asyncUploadBufferSize = i985[26]
  i984.asyncUploadTimeSlice = i985[27]
  i984.billboardsFaceCameraPosition = !!i985[28]
  i984.shadowNearPlaneOffset = i985[29]
  i984.streamingMipmapsMemoryBudget = i985[30]
  i984.maximumLODLevel = i985[31]
  i984.streamingMipmapsAddAllCameras = !!i985[32]
  i984.streamingMipmapsMaxLevelReduction = i985[33]
  i984.streamingMipmapsRenderersPerFrame = i985[34]
  i984.resolutionScalingFixedDPIFactor = i985[35]
  i984.streamingMipmapsMaxFileIORequests = i985[36]
  i984.currentQualityLevel = i985[37]
  return i984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i995 = data
  i994.weight = i995[0]
  i994.vertices = i995[1]
  i994.normals = i995[2]
  i994.tangents = i995[3]
  return i994
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i996 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i997 = data
  request.r(i997[0], i997[1], 0, i996, 'm_ObjectArgument')
  i996.m_ObjectArgumentAssemblyTypeName = i997[2]
  i996.m_IntArgument = i997[3]
  i996.m_FloatArgument = i997[4]
  i996.m_StringArgument = i997[5]
  i996.m_BoolArgument = !!i997[6]
  return i996
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i998 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i999 = data
  i998.m_XCoordinate = i999[0]
  i998.m_YCoordinate = i999[1]
  return i998
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1000 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1001 = data
  i1000.m_XPositionAdjustment = i1001[0]
  i1000.m_YPositionAdjustment = i1001[1]
  return i1000
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1002 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1003 = data
  i1002.xPlacement = i1003[0]
  i1002.yPlacement = i1003[1]
  i1002.xAdvance = i1003[2]
  i1002.yAdvance = i1003[3]
  return i1002
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[54],"55":[8],"56":[57],"58":[57],"59":[57],"60":[57],"61":[57],"62":[57],"63":[64],"65":[64],"66":[64],"67":[64],"68":[64],"69":[64],"70":[64],"71":[64],"72":[64],"73":[64],"74":[64],"75":[64],"76":[64],"77":[8],"78":[5],"79":[80],"81":[80],"25":[22],"82":[22],"83":[5,22],"17":[22,30],"84":[22],"85":[30,22],"86":[5],"87":[30,22],"88":[22],"89":[90],"91":[90],"92":[90],"93":[22],"94":[22],"29":[25],"16":[30,22],"36":[22],"28":[25],"95":[22],"26":[22],"96":[22],"97":[22],"98":[22],"99":[22],"100":[22],"35":[22],"101":[22],"102":[30,22],"103":[22],"104":[22],"105":[22],"106":[22],"107":[30,22],"108":[22],"109":[38],"110":[38],"39":[38],"111":[38],"112":[8],"113":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","CEBB.Playable.BedroomLayout","UnityEngine.Light","CEBB.Playable.BedroomPlayable","CEBB.Playable.FurnitureDefinition","UnityEngine.UI.Button","UnityEngine.UI.Image","TMPro.TextMeshProUGUI","UnityEngine.GameObject","CEBB.Playable.FirstPersonRoom","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.RectTransform","CEBB.Playable.RoomMovePad","CEBB.Playable.CherryHouseReveal","UnityEngine.Canvas","UnityEngine.UI.GridLayoutGroup","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","CEBB.Playable.RoomLookSurface","TMPro.TMP_FontAsset","UnityEngine.Sprite","CEBB.Playable.SakuraEndCardMotion","UnityEngine.UI.Mask","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Outline","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.BoxCollider","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.Font","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.60f1";

Deserializers.productName = "CEBB_V16";

Deserializers.lunaInitializationTime = "07/16/2026 20:25:01";

Deserializers.lunaDaysRunning = "119.4";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_HuyNQ_CEBB_V21_NgocNDL";

Deserializers.lunaAppID = "35800";

Deserializers.projectId = "3c72c65a16f0acb438eed22b8b16c24a";

Deserializers.packagesInfo = "com.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1680";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3918";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system, reflection, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "Unity Technologies";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.Unity-Technologies.com.unity.template.urp-blank";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "7a832f46-e420-4a08-899b-2eff9adba915";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

