var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i504 = root || request.c( 'UnityEngine.JointSpring' )
  var i505 = data
  i504.spring = i505[0]
  i504.damper = i505[1]
  i504.targetPosition = i505[2]
  return i504
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i506 = root || request.c( 'UnityEngine.JointMotor' )
  var i507 = data
  i506.m_TargetVelocity = i507[0]
  i506.m_Force = i507[1]
  i506.m_FreeSpin = i507[2]
  return i506
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i508 = root || request.c( 'UnityEngine.JointLimits' )
  var i509 = data
  i508.m_Min = i509[0]
  i508.m_Max = i509[1]
  i508.m_Bounciness = i509[2]
  i508.m_BounceMinVelocity = i509[3]
  i508.m_ContactDistance = i509[4]
  i508.minBounce = i509[5]
  i508.maxBounce = i509[6]
  return i508
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i510 = root || request.c( 'UnityEngine.JointDrive' )
  var i511 = data
  i510.m_PositionSpring = i511[0]
  i510.m_PositionDamper = i511[1]
  i510.m_MaximumForce = i511[2]
  i510.m_UseAcceleration = i511[3]
  return i510
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i512 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i513 = data
  i512.m_Spring = i513[0]
  i512.m_Damper = i513[1]
  return i512
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i514 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i515 = data
  i514.m_Limit = i515[0]
  i514.m_Bounciness = i515[1]
  i514.m_ContactDistance = i515[2]
  return i514
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i516 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i517 = data
  i516.m_ExtremumSlip = i517[0]
  i516.m_ExtremumValue = i517[1]
  i516.m_AsymptoteSlip = i517[2]
  i516.m_AsymptoteValue = i517[3]
  i516.m_Stiffness = i517[4]
  return i516
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i519 = data
  i518.m_LowerAngle = i519[0]
  i518.m_UpperAngle = i519[1]
  return i518
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i520 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i521 = data
  i520.m_MotorSpeed = i521[0]
  i520.m_MaximumMotorTorque = i521[1]
  return i520
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i522 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i523 = data
  i522.m_DampingRatio = i523[0]
  i522.m_Frequency = i523[1]
  i522.m_Angle = i523[2]
  return i522
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i524 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i525 = data
  i524.m_LowerTranslation = i525[0]
  i524.m_UpperTranslation = i525[1]
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

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i559 = data
  i558.name = i559[0]
  i558.width = i559[1]
  i558.height = i559[2]
  i558.mipmapCount = i559[3]
  i558.anisoLevel = i559[4]
  i558.filterMode = i559[5]
  i558.hdr = !!i559[6]
  i558.format = i559[7]
  i558.wrapMode = i559[8]
  i558.alphaIsTransparency = !!i559[9]
  i558.alphaSource = i559[10]
  i558.graphicsFormat = i559[11]
  i558.sRGBTexture = !!i559[12]
  i558.desiredColorSpace = i559[13]
  i558.wrapU = i559[14]
  i558.wrapV = i559[15]
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i561 = data
  i560.position = new pc.Vec3( i561[0], i561[1], i561[2] )
  i560.scale = new pc.Vec3( i561[3], i561[4], i561[5] )
  i560.rotation = new pc.Quat(i561[6], i561[7], i561[8], i561[9])
  return i560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i563 = data
  request.r(i563[0], i563[1], 0, i562, 'sharedMesh')
  return i562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i565 = data
  request.r(i565[0], i565[1], 0, i564, 'additionalVertexStreams')
  i564.enabled = !!i565[2]
  request.r(i565[3], i565[4], 0, i564, 'sharedMaterial')
  var i567 = i565[5]
  var i566 = []
  for(var i = 0; i < i567.length; i += 2) {
  request.r(i567[i + 0], i567[i + 1], 2, i566, '')
  }
  i564.sharedMaterials = i566
  i564.receiveShadows = !!i565[6]
  i564.shadowCastingMode = i565[7]
  i564.sortingLayerID = i565[8]
  i564.sortingOrder = i565[9]
  i564.lightmapIndex = i565[10]
  i564.lightmapSceneIndex = i565[11]
  i564.lightmapScaleOffset = new pc.Vec4( i565[12], i565[13], i565[14], i565[15] )
  i564.lightProbeUsage = i565[16]
  i564.reflectionProbeUsage = i565[17]
  return i564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i571 = data
  i570.name = i571[0]
  i570.tagId = i571[1]
  i570.enabled = !!i571[2]
  i570.isStatic = !!i571[3]
  i570.layer = i571[4]
  return i570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i573 = data
  request.r(i573[0], i573[1], 0, i572, 'sharedMesh')
  i572.convex = !!i573[2]
  i572.enabled = !!i573[3]
  i572.isTrigger = !!i573[4]
  request.r(i573[5], i573[6], 0, i572, 'material')
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i575 = data
  i574.center = new pc.Vec3( i575[0], i575[1], i575[2] )
  i574.size = new pc.Vec3( i575[3], i575[4], i575[5] )
  i574.enabled = !!i575[6]
  i574.isTrigger = !!i575[7]
  request.r(i575[8], i575[9], 0, i574, 'material')
  return i574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i577 = data
  i576.name = i577[0]
  i576.halfPrecision = !!i577[1]
  i576.useSimplification = !!i577[2]
  i576.useUInt32IndexFormat = !!i577[3]
  i576.vertexCount = i577[4]
  i576.aabb = i577[5]
  var i579 = i577[6]
  var i578 = []
  for(var i = 0; i < i579.length; i += 1) {
    i578.push( !!i579[i + 0] );
  }
  i576.streams = i578
  i576.vertices = i577[7]
  var i581 = i577[8]
  var i580 = []
  for(var i = 0; i < i581.length; i += 1) {
    i580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i581[i + 0]) );
  }
  i576.subMeshes = i580
  var i583 = i577[9]
  var i582 = []
  for(var i = 0; i < i583.length; i += 16) {
    i582.push( new pc.Mat4().setData(i583[i + 0], i583[i + 1], i583[i + 2], i583[i + 3],  i583[i + 4], i583[i + 5], i583[i + 6], i583[i + 7],  i583[i + 8], i583[i + 9], i583[i + 10], i583[i + 11],  i583[i + 12], i583[i + 13], i583[i + 14], i583[i + 15]) );
  }
  i576.bindposes = i582
  var i585 = i577[10]
  var i584 = []
  for(var i = 0; i < i585.length; i += 1) {
    i584.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i585[i + 0]) );
  }
  i576.blendShapes = i584
  return i576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i591 = data
  i590.triangles = i591[0]
  return i590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i597 = data
  i596.name = i597[0]
  var i599 = i597[1]
  var i598 = []
  for(var i = 0; i < i599.length; i += 1) {
    i598.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i599[i + 0]) );
  }
  i596.frames = i598
  return i596
}

Deserializers["CharacterWalker"] = function (request, data, root) {
  var i600 = root || request.c( 'CharacterWalker' )
  var i601 = data
  i600.speed = i601[0]
  i600.speedMultiplier = i601[1]
  i600.turnSpeed = i601[2]
  i600.swingAngle = i601[3]
  i600.swingFreq = i601[4]
  i600.bobBody = !!i601[5]
  i600.externalControl = !!i601[6]
  i600.externalMoving = !!i601[7]
  return i600
}

Deserializers["ThirdPersonController"] = function (request, data, root) {
  var i602 = root || request.c( 'ThirdPersonController' )
  var i603 = data
  request.r(i603[0], i603[1], 0, i602, 'cam')
  request.r(i603[2], i603[3], 0, i602, 'joystick')
  i602.pivotHeight = i603[4]
  i602.camOffset = new pc.Vec3( i603[5], i603[6], i603[7] )
  i602.camOffsetPortrait = new pc.Vec3( i603[8], i603[9], i603[10] )
  i602.startPitch = i603[11]
  i602.moveSpeed = i603[12]
  i602.turnSpeed = i603[13]
  i602.lookSensitivity = i603[14]
  i602.stepHeight = i603[15]
  i602.maxDrop = i603[16]
  i602.bodyRadius = i603[17]
  i602.camMinDistance = i603[18]
  i602.camFollowSharpness = i603[19]
  i602.groundMask = UnityEngine.LayerMask.FromIntegerValue( i603[20] )
  i602.inputEnabled = !!i603[21]
  return i602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i605 = data
  i604.name = i605[0]
  i604.atlasId = i605[1]
  i604.mipmapCount = i605[2]
  i604.hdr = !!i605[3]
  i604.size = i605[4]
  i604.anisoLevel = i605[5]
  i604.filterMode = i605[6]
  var i607 = i605[7]
  var i606 = []
  for(var i = 0; i < i607.length; i += 4) {
    i606.push( UnityEngine.Rect.MinMaxRect(i607[i + 0], i607[i + 1], i607[i + 2], i607[i + 3]) );
  }
  i604.rects = i606
  i604.wrapU = i605[8]
  i604.wrapV = i605[9]
  return i604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i611 = data
  i610.name = i611[0]
  i610.index = i611[1]
  i610.startup = !!i611[2]
  return i610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i613 = data
  i612.aspect = i613[0]
  i612.orthographic = !!i613[1]
  i612.orthographicSize = i613[2]
  i612.backgroundColor = new pc.Color(i613[3], i613[4], i613[5], i613[6])
  i612.nearClipPlane = i613[7]
  i612.farClipPlane = i613[8]
  i612.fieldOfView = i613[9]
  i612.depth = i613[10]
  i612.clearFlags = i613[11]
  i612.cullingMask = i613[12]
  i612.rect = i613[13]
  request.r(i613[14], i613[15], 0, i612, 'targetTexture')
  i612.usePhysicalProperties = !!i613[16]
  i612.focalLength = i613[17]
  i612.sensorSize = new pc.Vec2( i613[18], i613[19] )
  i612.lensShift = new pc.Vec2( i613[20], i613[21] )
  i612.gateFit = i613[22]
  i612.commandBufferCount = i613[23]
  i612.cameraType = i613[24]
  i612.enabled = !!i613[25]
  return i612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i615 = data
  i614.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i615[0], i614.main)
  i614.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i615[1], i614.colorBySpeed)
  i614.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i615[2], i614.colorOverLifetime)
  i614.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i615[3], i614.emission)
  i614.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i615[4], i614.rotationBySpeed)
  i614.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i615[5], i614.rotationOverLifetime)
  i614.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i615[6], i614.shape)
  i614.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i615[7], i614.sizeBySpeed)
  i614.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i615[8], i614.sizeOverLifetime)
  i614.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i615[9], i614.textureSheetAnimation)
  i614.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i615[10], i614.velocityOverLifetime)
  i614.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i615[11], i614.noise)
  i614.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i615[12], i614.inheritVelocity)
  i614.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i615[13], i614.forceOverLifetime)
  i614.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i615[14], i614.limitVelocityOverLifetime)
  i614.useAutoRandomSeed = !!i615[15]
  i614.randomSeed = i615[16]
  return i614
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i616 = root || new pc.ParticleSystemMain()
  var i617 = data
  i616.duration = i617[0]
  i616.loop = !!i617[1]
  i616.prewarm = !!i617[2]
  i616.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[3], i616.startDelay)
  i616.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[4], i616.startLifetime)
  i616.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[5], i616.startSpeed)
  i616.startSize3D = !!i617[6]
  i616.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[7], i616.startSizeX)
  i616.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[8], i616.startSizeY)
  i616.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[9], i616.startSizeZ)
  i616.startRotation3D = !!i617[10]
  i616.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[11], i616.startRotationX)
  i616.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[12], i616.startRotationY)
  i616.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[13], i616.startRotationZ)
  i616.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i617[14], i616.startColor)
  i616.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i617[15], i616.gravityModifier)
  i616.simulationSpace = i617[16]
  request.r(i617[17], i617[18], 0, i616, 'customSimulationSpace')
  i616.simulationSpeed = i617[19]
  i616.useUnscaledTime = !!i617[20]
  i616.scalingMode = i617[21]
  i616.playOnAwake = !!i617[22]
  i616.maxParticles = i617[23]
  i616.emitterVelocityMode = i617[24]
  i616.stopAction = i617[25]
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i618 = root || new pc.MinMaxCurve()
  var i619 = data
  i618.mode = i619[0]
  i618.curveMin = new pc.AnimationCurve( { keys_flow: i619[1] } )
  i618.curveMax = new pc.AnimationCurve( { keys_flow: i619[2] } )
  i618.curveMultiplier = i619[3]
  i618.constantMin = i619[4]
  i618.constantMax = i619[5]
  return i618
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i620 = root || new pc.MinMaxGradient()
  var i621 = data
  i620.mode = i621[0]
  i620.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i621[1], i620.gradientMin)
  i620.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i621[2], i620.gradientMax)
  i620.colorMin = new pc.Color(i621[3], i621[4], i621[5], i621[6])
  i620.colorMax = new pc.Color(i621[7], i621[8], i621[9], i621[10])
  return i620
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i623 = data
  i622.mode = i623[0]
  var i625 = i623[1]
  var i624 = []
  for(var i = 0; i < i625.length; i += 1) {
    i624.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i625[i + 0]) );
  }
  i622.colorKeys = i624
  var i627 = i623[2]
  var i626 = []
  for(var i = 0; i < i627.length; i += 1) {
    i626.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i627[i + 0]) );
  }
  i622.alphaKeys = i626
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i628 = root || new pc.ParticleSystemColorBySpeed()
  var i629 = data
  i628.enabled = !!i629[0]
  i628.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i629[1], i628.color)
  i628.range = new pc.Vec2( i629[2], i629[3] )
  return i628
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i633 = data
  i632.color = new pc.Color(i633[0], i633[1], i633[2], i633[3])
  i632.time = i633[4]
  return i632
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i637 = data
  i636.alpha = i637[0]
  i636.time = i637[1]
  return i636
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i638 = root || new pc.ParticleSystemColorOverLifetime()
  var i639 = data
  i638.enabled = !!i639[0]
  i638.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i639[1], i638.color)
  return i638
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i640 = root || new pc.ParticleSystemEmitter()
  var i641 = data
  i640.enabled = !!i641[0]
  i640.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i641[1], i640.rateOverTime)
  i640.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i641[2], i640.rateOverDistance)
  var i643 = i641[3]
  var i642 = []
  for(var i = 0; i < i643.length; i += 1) {
    i642.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i643[i + 0]) );
  }
  i640.bursts = i642
  return i640
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i646 = root || new pc.ParticleSystemBurst()
  var i647 = data
  i646.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i647[0], i646.count)
  i646.cycleCount = i647[1]
  i646.minCount = i647[2]
  i646.maxCount = i647[3]
  i646.repeatInterval = i647[4]
  i646.time = i647[5]
  return i646
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i648 = root || new pc.ParticleSystemRotationBySpeed()
  var i649 = data
  i648.enabled = !!i649[0]
  i648.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i649[1], i648.x)
  i648.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i649[2], i648.y)
  i648.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i649[3], i648.z)
  i648.separateAxes = !!i649[4]
  i648.range = new pc.Vec2( i649[5], i649[6] )
  return i648
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i650 = root || new pc.ParticleSystemRotationOverLifetime()
  var i651 = data
  i650.enabled = !!i651[0]
  i650.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i651[1], i650.x)
  i650.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i651[2], i650.y)
  i650.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i651[3], i650.z)
  i650.separateAxes = !!i651[4]
  return i650
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i652 = root || new pc.ParticleSystemShape()
  var i653 = data
  i652.enabled = !!i653[0]
  i652.shapeType = i653[1]
  i652.randomDirectionAmount = i653[2]
  i652.sphericalDirectionAmount = i653[3]
  i652.randomPositionAmount = i653[4]
  i652.alignToDirection = !!i653[5]
  i652.radius = i653[6]
  i652.radiusMode = i653[7]
  i652.radiusSpread = i653[8]
  i652.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i653[9], i652.radiusSpeed)
  i652.radiusThickness = i653[10]
  i652.angle = i653[11]
  i652.length = i653[12]
  i652.boxThickness = new pc.Vec3( i653[13], i653[14], i653[15] )
  i652.meshShapeType = i653[16]
  request.r(i653[17], i653[18], 0, i652, 'mesh')
  request.r(i653[19], i653[20], 0, i652, 'meshRenderer')
  request.r(i653[21], i653[22], 0, i652, 'skinnedMeshRenderer')
  i652.useMeshMaterialIndex = !!i653[23]
  i652.meshMaterialIndex = i653[24]
  i652.useMeshColors = !!i653[25]
  i652.normalOffset = i653[26]
  i652.arc = i653[27]
  i652.arcMode = i653[28]
  i652.arcSpread = i653[29]
  i652.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i653[30], i652.arcSpeed)
  i652.donutRadius = i653[31]
  i652.position = new pc.Vec3( i653[32], i653[33], i653[34] )
  i652.rotation = new pc.Vec3( i653[35], i653[36], i653[37] )
  i652.scale = new pc.Vec3( i653[38], i653[39], i653[40] )
  return i652
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i654 = root || new pc.ParticleSystemSizeBySpeed()
  var i655 = data
  i654.enabled = !!i655[0]
  i654.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i655[1], i654.x)
  i654.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i655[2], i654.y)
  i654.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i655[3], i654.z)
  i654.separateAxes = !!i655[4]
  i654.range = new pc.Vec2( i655[5], i655[6] )
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i656 = root || new pc.ParticleSystemSizeOverLifetime()
  var i657 = data
  i656.enabled = !!i657[0]
  i656.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i657[1], i656.x)
  i656.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i657[2], i656.y)
  i656.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i657[3], i656.z)
  i656.separateAxes = !!i657[4]
  return i656
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i658 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i659 = data
  i658.enabled = !!i659[0]
  i658.mode = i659[1]
  i658.animation = i659[2]
  i658.numTilesX = i659[3]
  i658.numTilesY = i659[4]
  i658.useRandomRow = !!i659[5]
  i658.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i659[6], i658.frameOverTime)
  i658.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i659[7], i658.startFrame)
  i658.cycleCount = i659[8]
  i658.rowIndex = i659[9]
  i658.flipU = i659[10]
  i658.flipV = i659[11]
  i658.spriteCount = i659[12]
  var i661 = i659[13]
  var i660 = []
  for(var i = 0; i < i661.length; i += 2) {
  request.r(i661[i + 0], i661[i + 1], 2, i660, '')
  }
  i658.sprites = i660
  return i658
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i664 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i665 = data
  i664.enabled = !!i665[0]
  i664.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[1], i664.x)
  i664.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[2], i664.y)
  i664.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[3], i664.z)
  i664.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[4], i664.radial)
  i664.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[5], i664.speedModifier)
  i664.space = i665[6]
  i664.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[7], i664.orbitalX)
  i664.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[8], i664.orbitalY)
  i664.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[9], i664.orbitalZ)
  i664.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[10], i664.orbitalOffsetX)
  i664.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[11], i664.orbitalOffsetY)
  i664.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[12], i664.orbitalOffsetZ)
  return i664
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i666 = root || new pc.ParticleSystemNoise()
  var i667 = data
  i666.enabled = !!i667[0]
  i666.separateAxes = !!i667[1]
  i666.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[2], i666.strengthX)
  i666.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[3], i666.strengthY)
  i666.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[4], i666.strengthZ)
  i666.frequency = i667[5]
  i666.damping = !!i667[6]
  i666.octaveCount = i667[7]
  i666.octaveMultiplier = i667[8]
  i666.octaveScale = i667[9]
  i666.quality = i667[10]
  i666.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[11], i666.scrollSpeed)
  i666.scrollSpeedMultiplier = i667[12]
  i666.remapEnabled = !!i667[13]
  i666.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[14], i666.remapX)
  i666.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[15], i666.remapY)
  i666.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[16], i666.remapZ)
  i666.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[17], i666.positionAmount)
  i666.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[18], i666.rotationAmount)
  i666.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i667[19], i666.sizeAmount)
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i668 = root || new pc.ParticleSystemInheritVelocity()
  var i669 = data
  i668.enabled = !!i669[0]
  i668.mode = i669[1]
  i668.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i669[2], i668.curve)
  return i668
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i670 = root || new pc.ParticleSystemForceOverLifetime()
  var i671 = data
  i670.enabled = !!i671[0]
  i670.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[1], i670.x)
  i670.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[2], i670.y)
  i670.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[3], i670.z)
  i670.space = i671[4]
  i670.randomized = !!i671[5]
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i672 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i673 = data
  i672.enabled = !!i673[0]
  i672.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[1], i672.limit)
  i672.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[2], i672.limitX)
  i672.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[3], i672.limitY)
  i672.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[4], i672.limitZ)
  i672.dampen = i673[5]
  i672.separateAxes = !!i673[6]
  i672.space = i673[7]
  i672.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[8], i672.drag)
  i672.multiplyDragByParticleSize = !!i673[9]
  i672.multiplyDragByParticleVelocity = !!i673[10]
  return i672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i674 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i675 = data
  request.r(i675[0], i675[1], 0, i674, 'mesh')
  i674.meshCount = i675[2]
  i674.activeVertexStreamsCount = i675[3]
  i674.alignment = i675[4]
  i674.renderMode = i675[5]
  i674.sortMode = i675[6]
  i674.lengthScale = i675[7]
  i674.velocityScale = i675[8]
  i674.cameraVelocityScale = i675[9]
  i674.normalDirection = i675[10]
  i674.sortingFudge = i675[11]
  i674.minParticleSize = i675[12]
  i674.maxParticleSize = i675[13]
  i674.pivot = new pc.Vec3( i675[14], i675[15], i675[16] )
  request.r(i675[17], i675[18], 0, i674, 'trailMaterial')
  i674.applyActiveColorSpace = !!i675[19]
  i674.enabled = !!i675[20]
  request.r(i675[21], i675[22], 0, i674, 'sharedMaterial')
  var i677 = i675[23]
  var i676 = []
  for(var i = 0; i < i677.length; i += 2) {
  request.r(i677[i + 0], i677[i + 1], 2, i676, '')
  }
  i674.sharedMaterials = i676
  i674.receiveShadows = !!i675[24]
  i674.shadowCastingMode = i675[25]
  i674.sortingLayerID = i675[26]
  i674.sortingOrder = i675[27]
  i674.lightmapIndex = i675[28]
  i674.lightmapSceneIndex = i675[29]
  i674.lightmapScaleOffset = new pc.Vec4( i675[30], i675[31], i675[32], i675[33] )
  i674.lightProbeUsage = i675[34]
  i674.reflectionProbeUsage = i675[35]
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i679 = data
  i678.type = i679[0]
  i678.color = new pc.Color(i679[1], i679[2], i679[3], i679[4])
  i678.cullingMask = i679[5]
  i678.intensity = i679[6]
  i678.range = i679[7]
  i678.spotAngle = i679[8]
  i678.shadows = i679[9]
  i678.shadowNormalBias = i679[10]
  i678.shadowBias = i679[11]
  i678.shadowStrength = i679[12]
  i678.shadowResolution = i679[13]
  i678.lightmapBakeType = i679[14]
  i678.renderMode = i679[15]
  request.r(i679[16], i679[17], 0, i678, 'cookie')
  i678.cookieSize = i679[18]
  i678.shadowNearPlane = i679[19]
  i678.occlusionMaskChannel = i679[20]
  i678.isBaked = !!i679[21]
  i678.mixedLightingMode = i679[22]
  i678.enabled = !!i679[23]
  return i678
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i680 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i681 = data
  i680.m_Version = i681[0]
  i680.m_UsePipelineSettings = !!i681[1]
  i680.m_AdditionalLightsShadowResolutionTier = i681[2]
  i680.m_LightLayerMask = i681[3]
  i680.m_RenderingLayers = i681[4]
  i680.m_CustomShadowLayers = !!i681[5]
  i680.m_ShadowLayerMask = i681[6]
  i680.m_ShadowRenderingLayers = i681[7]
  i680.m_LightCookieSize = new pc.Vec2( i681[8], i681[9] )
  i680.m_LightCookieOffset = new pc.Vec2( i681[10], i681[11] )
  i680.m_SoftShadowQuality = i681[12]
  return i680
}

Deserializers["PlayableConfig"] = function (request, data, root) {
  var i682 = root || request.c( 'PlayableConfig' )
  var i683 = data
  i682.chooseText = i683[0]
  i682.moveHintText = i683[1]
  i682.lookHintText = i683[2]
  i682.selectHintText = i683[3]
  i682.placeHintText = i683[4]
  i682.endText = i683[5]
  i682.ctaText = i683[6]
  i682.moveText = i683[7]
  i682.hideHintAfter = i683[8]
  i682.introDuration = i683[9]
  i682.placeCountToEnd = i683[10]
  i682.timeToStore = i683[11]
  i682.autoStoreOnEnd = !!i683[12]
  i682.brightness = i683[13]
  i682.bgmOn = !!i683[14]
  i682.bgmVolume = i683[15]
  i682.sfxOn = !!i683[16]
  i682.sfxVolume = i683[17]
  request.r(i683[18], i683[19], 0, i682, 'bgmClip')
  i682.npcCount = i683[20]
  i682.npcMinRadius = i683[21]
  i682.npcMaxRadius = i683[22]
  i682.npcSpeed = i683[23]
  return i682
}

Deserializers["GameFlow"] = function (request, data, root) {
  var i684 = root || request.c( 'GameFlow' )
  var i685 = data
  i684.state = i685[0]
  request.r(i685[1], i685[2], 0, i684, 'cam')
  request.r(i685[3], i685[4], 0, i684, 'intro')
  request.r(i685[5], i685[6], 0, i684, 'player')
  request.r(i685[7], i685[8], 0, i684, 'placer')
  request.r(i685[9], i685[10], 0, i684, 'trees')
  request.r(i685[11], i685[12], 0, i684, 'choiceUI')
  request.r(i685[13], i685[14], 0, i684, 'gameplayUI')
  request.r(i685[15], i685[16], 0, i684, 'tutorial')
  request.r(i685[17], i685[18], 0, i684, 'houseThumb')
  request.r(i685[19], i685[20], 0, i684, 'pinkThumb')
  request.r(i685[21], i685[22], 0, i684, 'blueThumb')
  request.r(i685[23], i685[24], 0, i684, 'cta')
  var i687 = i685[25]
  var i686 = []
  for(var i = 0; i < i687.length; i += 2) {
  request.r(i687[i + 0], i687[i + 1], 2, i686, '')
  }
  i684.npcs = i686
  request.r(i685[26], i685[27], 0, i684, 'bgm')
  request.r(i685[28], i685[29], 0, i684, 'flash')
  i684.overviewOffset = new pc.Vec3( i685[30], i685[31], i685[32] )
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i691 = data
  request.r(i691[0], i691[1], 0, i690, 'clip')
  request.r(i691[2], i691[3], 0, i690, 'outputAudioMixerGroup')
  i690.playOnAwake = !!i691[4]
  i690.loop = !!i691[5]
  i690.time = i691[6]
  i690.volume = i691[7]
  i690.pitch = i691[8]
  i690.enabled = !!i691[9]
  return i690
}

Deserializers["IntroSequence"] = function (request, data, root) {
  var i692 = root || request.c( 'IntroSequence' )
  var i693 = data
  request.r(i693[0], i693[1], 0, i692, 'hero')
  request.r(i693[2], i693[3], 0, i692, 'cameraPose')
  request.r(i693[4], i693[5], 0, i692, 'heroStart')
  i692.faceTime = i693[6]
  i692.turnTime = i693[7]
  i692.walkSpeedMultiplier = i693[8]
  i692.walkDistance = i693[9]
  return i692
}

Deserializers["TreeRecolor"] = function (request, data, root) {
  var i694 = root || request.c( 'TreeRecolor' )
  var i695 = data
  var i697 = i695[0]
  var i696 = []
  for(var i = 0; i < i697.length; i += 2) {
  request.r(i697[i + 0], i697[i + 1], 2, i696, '')
  }
  i694.leafRenderers = i696
  request.r(i695[1], i695[2], 0, i694, 'pinkLeaves')
  request.r(i695[3], i695[4], 0, i694, 'blueLeaves')
  request.r(i695[5], i695[6], 0, i694, 'burstFx')
  return i694
}

Deserializers["BlockPlacer"] = function (request, data, root) {
  var i700 = root || request.c( 'BlockPlacer' )
  var i701 = data
  request.r(i701[0], i701[1], 0, i700, 'cam')
  request.r(i701[2], i701[3], 0, i700, 'player')
  request.r(i701[4], i701[5], 0, i700, 'blocksRoot')
  request.r(i701[6], i701[7], 0, i700, 'preview')
  request.r(i701[8], i701[9], 0, i700, 'hotbar')
  var i703 = i701[10]
  var i702 = []
  for(var i = 0; i < i703.length; i += 1) {
    i702.push( request.d('BlockDef', i703[i + 0]) );
  }
  i700.pinkBlocks = i702
  var i705 = i701[11]
  var i704 = []
  for(var i = 0; i < i705.length; i += 1) {
    i704.push( request.d('BlockDef', i705[i + 0]) );
  }
  i700.blueBlocks = i704
  i700.reach = i701[12]
  i700.cell = i701[13]
  i700.gridOrigin = new pc.Vec3( i701[14], i701[15], i701[16] )
  i700.placeMask = UnityEngine.LayerMask.FromIntegerValue( i701[17] )
  request.r(i701[18], i701[19], 0, i700, 'sfx')
  request.r(i701[20], i701[21], 0, i700, 'placeFx')
  i700.inputEnabled = !!i701[22]
  return i700
}

Deserializers["BlockDef"] = function (request, data, root) {
  var i708 = root || request.c( 'BlockDef' )
  var i709 = data
  i708.name = i709[0]
  i708.displayName = i709[1]
  request.r(i709[2], i709[3], 0, i708, 'prefab')
  request.r(i709[4], i709[5], 0, i708, 'icon')
  i708.heightCells = i709[6]
  i708.lengthCells = i709[7]
  i708.faceCamera = !!i709[8]
  return i708
}

Deserializers["LunaController"] = function (request, data, root) {
  var i710 = root || request.c( 'LunaController' )
  var i711 = data
  i710.chooseText = i711[0]
  i710.placeCount = i711[1]
  i710.timeToStore = i711[2]
  request.r(i711[3], i711[4], 0, i710, 'bgm')
  return i710
}

Deserializers["Sfx"] = function (request, data, root) {
  var i712 = root || request.c( 'Sfx' )
  var i713 = data
  request.r(i713[0], i713[1], 0, i712, 'source')
  request.r(i713[2], i713[3], 0, i712, 'click')
  var i715 = i713[4]
  var i714 = []
  for(var i = 0; i < i715.length; i += 2) {
  request.r(i715[i + 0], i715[i + 1], 2, i714, '')
  }
  i712.place = i714
  request.r(i713[5], i713[6], 0, i712, 'extra')
  return i712
}

Deserializers["NpcWander"] = function (request, data, root) {
  var i718 = root || request.c( 'NpcWander' )
  var i719 = data
  request.r(i719[0], i719[1], 0, i718, 'player')
  request.r(i719[2], i719[3], 0, i718, 'view')
  i718.minRadius = i719[4]
  i718.maxRadius = i719[5]
  i718.coneAngle = i719[6]
  i718.minPlayerDist = i719[7]
  i718.minNpcDist = i719[8]
  i718.catchUpDist = i719[9]
  i718.waitMin = i719[10]
  i718.waitMax = i719[11]
  i718.groundY = i719[12]
  i718.groundMask = UnityEngine.LayerMask.FromIntegerValue( i719[13] )
  return i718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animation"] = function (request, data, root) {
  var i720 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animation' )
  var i721 = data
  i720.playAutomatically = !!i721[0]
  request.r(i721[1], i721[2], 0, i720, 'clip')
  var i723 = i721[3]
  var i722 = []
  for(var i = 0; i < i723.length; i += 2) {
  request.r(i723[i + 0], i723[i + 1], 2, i722, '')
  }
  i720.clips = i722
  i720.wrapMode = i721[4]
  i720.enabled = !!i721[5]
  return i720
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i727 = data
  i726.pivot = new pc.Vec2( i727[0], i727[1] )
  i726.anchorMin = new pc.Vec2( i727[2], i727[3] )
  i726.anchorMax = new pc.Vec2( i727[4], i727[5] )
  i726.sizeDelta = new pc.Vec2( i727[6], i727[7] )
  i726.anchoredPosition3D = new pc.Vec3( i727[8], i727[9], i727[10] )
  i726.rotation = new pc.Quat(i727[11], i727[12], i727[13], i727[14])
  i726.scale = new pc.Vec3( i727[15], i727[16], i727[17] )
  return i726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i728 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i729 = data
  i728.planeDistance = i729[0]
  i728.referencePixelsPerUnit = i729[1]
  i728.isFallbackOverlay = !!i729[2]
  i728.renderMode = i729[3]
  i728.renderOrder = i729[4]
  i728.sortingLayerName = i729[5]
  i728.sortingOrder = i729[6]
  i728.scaleFactor = i729[7]
  request.r(i729[8], i729[9], 0, i728, 'worldCamera')
  i728.overrideSorting = !!i729[10]
  i728.pixelPerfect = !!i729[11]
  i728.targetDisplay = i729[12]
  i728.overridePixelPerfect = !!i729[13]
  i728.enabled = !!i729[14]
  return i728
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i730 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i731 = data
  i730.m_UiScaleMode = i731[0]
  i730.m_ReferencePixelsPerUnit = i731[1]
  i730.m_ScaleFactor = i731[2]
  i730.m_ReferenceResolution = new pc.Vec2( i731[3], i731[4] )
  i730.m_ScreenMatchMode = i731[5]
  i730.m_MatchWidthOrHeight = i731[6]
  i730.m_PhysicalUnit = i731[7]
  i730.m_FallbackScreenDPI = i731[8]
  i730.m_DefaultSpriteDPI = i731[9]
  i730.m_DynamicPixelsPerUnit = i731[10]
  i730.m_PresetInfoIsWorld = !!i731[11]
  return i730
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i732 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i733 = data
  i732.m_IgnoreReversedGraphics = !!i733[0]
  i732.m_BlockingObjects = i733[1]
  i732.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i733[2] )
  return i732
}

Deserializers["OrientationLayout"] = function (request, data, root) {
  var i734 = root || request.c( 'OrientationLayout' )
  var i735 = data
  var i737 = i735[0]
  var i736 = []
  for(var i = 0; i < i737.length; i += 1) {
    i736.push( request.d('OrientationLayout+Entry', i737[i + 0]) );
  }
  i734.entries = i736
  return i734
}

Deserializers["OrientationLayout+Entry"] = function (request, data, root) {
  var i740 = root || request.c( 'OrientationLayout+Entry' )
  var i741 = data
  request.r(i741[0], i741[1], 0, i740, 'target')
  i740.portraitPos = new pc.Vec2( i741[2], i741[3] )
  i740.landscapePos = new pc.Vec2( i741[4], i741[5] )
  i740.portraitScale = i741[6]
  i740.landscapeScale = i741[7]
  return i740
}

Deserializers["TutorialHud"] = function (request, data, root) {
  var i742 = root || request.c( 'TutorialHud' )
  var i743 = data
  request.r(i743[0], i743[1], 0, i742, 'placer')
  request.r(i743[2], i743[3], 0, i742, 'hotbar')
  request.r(i743[4], i743[5], 0, i742, 'player')
  request.r(i743[6], i743[7], 0, i742, 'joystick')
  request.r(i743[8], i743[9], 0, i742, 'placeButton')
  request.r(i743[10], i743[11], 0, i742, 'hand')
  request.r(i743[12], i743[13], 0, i742, 'hint')
  request.r(i743[14], i743[15], 0, i742, 'moveLabel')
  request.r(i743[16], i743[17], 0, i742, 'dim')
  request.r(i743[18], i743[19], 0, i742, 'tutorialLayer')
  i742.moveDistanceToPass = i743[20]
  i742.lookAngleToPass = i743[21]
  return i742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i745 = data
  i744.cullTransparentMesh = !!i745[0]
  return i744
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i746 = root || request.c( 'UnityEngine.UI.Image' )
  var i747 = data
  request.r(i747[0], i747[1], 0, i746, 'm_Sprite')
  i746.m_Type = i747[2]
  i746.m_PreserveAspect = !!i747[3]
  i746.m_FillCenter = !!i747[4]
  i746.m_FillMethod = i747[5]
  i746.m_FillAmount = i747[6]
  i746.m_FillClockwise = !!i747[7]
  i746.m_FillOrigin = i747[8]
  i746.m_UseSpriteMesh = !!i747[9]
  i746.m_PixelsPerUnitMultiplier = i747[10]
  request.r(i747[11], i747[12], 0, i746, 'm_Material')
  i746.m_Maskable = !!i747[13]
  i746.m_Color = new pc.Color(i747[14], i747[15], i747[16], i747[17])
  i746.m_RaycastTarget = !!i747[18]
  i746.m_RaycastPadding = new pc.Vec4( i747[19], i747[20], i747[21], i747[22] )
  return i746
}

Deserializers["TouchArea"] = function (request, data, root) {
  var i748 = root || request.c( 'TouchArea' )
  var i749 = data
  request.r(i749[0], i749[1], 0, i748, 'player')
  return i748
}

Deserializers["VirtualJoystick"] = function (request, data, root) {
  var i750 = root || request.c( 'VirtualJoystick' )
  var i751 = data
  request.r(i751[0], i751[1], 0, i750, 'background')
  request.r(i751[2], i751[3], 0, i750, 'knob')
  i750.radius = i751[4]
  return i750
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i752 = root || request.c( 'UnityEngine.UI.Text' )
  var i753 = data
  i752.m_FontData = request.d('UnityEngine.UI.FontData', i753[0], i752.m_FontData)
  i752.m_Text = i753[1]
  request.r(i753[2], i753[3], 0, i752, 'm_Material')
  i752.m_Maskable = !!i753[4]
  i752.m_Color = new pc.Color(i753[5], i753[6], i753[7], i753[8])
  i752.m_RaycastTarget = !!i753[9]
  i752.m_RaycastPadding = new pc.Vec4( i753[10], i753[11], i753[12], i753[13] )
  return i752
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i754 = root || request.c( 'UnityEngine.UI.FontData' )
  var i755 = data
  request.r(i755[0], i755[1], 0, i754, 'm_Font')
  i754.m_FontSize = i755[2]
  i754.m_FontStyle = i755[3]
  i754.m_BestFit = !!i755[4]
  i754.m_MinSize = i755[5]
  i754.m_MaxSize = i755[6]
  i754.m_Alignment = i755[7]
  i754.m_AlignByGeometry = !!i755[8]
  i754.m_RichText = !!i755[9]
  i754.m_HorizontalOverflow = i755[10]
  i754.m_VerticalOverflow = i755[11]
  i754.m_LineSpacing = i755[12]
  return i754
}

Deserializers["TextBorder"] = function (request, data, root) {
  var i756 = root || request.c( 'TextBorder' )
  var i757 = data
  i756.color = new pc.Color(i757[0], i757[1], i757[2], i757[3])
  i756.size = i757[4]
  i756.eightDirections = !!i757[5]
  return i756
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i758 = root || request.c( 'UnityEngine.UI.Button' )
  var i759 = data
  i758.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i759[0], i758.m_OnClick)
  i758.m_Navigation = request.d('UnityEngine.UI.Navigation', i759[1], i758.m_Navigation)
  i758.m_Transition = i759[2]
  i758.m_Colors = request.d('UnityEngine.UI.ColorBlock', i759[3], i758.m_Colors)
  i758.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i759[4], i758.m_SpriteState)
  i758.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i759[5], i758.m_AnimationTriggers)
  i758.m_Interactable = !!i759[6]
  request.r(i759[7], i759[8], 0, i758, 'm_TargetGraphic')
  return i758
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i760 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i761 = data
  i760.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i761[0], i760.m_PersistentCalls)
  return i760
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i762 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i763 = data
  var i765 = i763[0]
  var i764 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i765.length; i += 1) {
    i764.add(request.d('UnityEngine.Events.PersistentCall', i765[i + 0]));
  }
  i762.m_Calls = i764
  return i762
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i768 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i769 = data
  request.r(i769[0], i769[1], 0, i768, 'm_Target')
  i768.m_TargetAssemblyTypeName = i769[2]
  i768.m_MethodName = i769[3]
  i768.m_Mode = i769[4]
  i768.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i769[5], i768.m_Arguments)
  i768.m_CallState = i769[6]
  return i768
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i770 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i771 = data
  i770.m_Mode = i771[0]
  i770.m_WrapAround = !!i771[1]
  request.r(i771[2], i771[3], 0, i770, 'm_SelectOnUp')
  request.r(i771[4], i771[5], 0, i770, 'm_SelectOnDown')
  request.r(i771[6], i771[7], 0, i770, 'm_SelectOnLeft')
  request.r(i771[8], i771[9], 0, i770, 'm_SelectOnRight')
  return i770
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i772 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i773 = data
  i772.m_NormalColor = new pc.Color(i773[0], i773[1], i773[2], i773[3])
  i772.m_HighlightedColor = new pc.Color(i773[4], i773[5], i773[6], i773[7])
  i772.m_PressedColor = new pc.Color(i773[8], i773[9], i773[10], i773[11])
  i772.m_SelectedColor = new pc.Color(i773[12], i773[13], i773[14], i773[15])
  i772.m_DisabledColor = new pc.Color(i773[16], i773[17], i773[18], i773[19])
  i772.m_ColorMultiplier = i773[20]
  i772.m_FadeDuration = i773[21]
  return i772
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i774 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i775 = data
  request.r(i775[0], i775[1], 0, i774, 'm_HighlightedSprite')
  request.r(i775[2], i775[3], 0, i774, 'm_PressedSprite')
  request.r(i775[4], i775[5], 0, i774, 'm_SelectedSprite')
  request.r(i775[6], i775[7], 0, i774, 'm_DisabledSprite')
  return i774
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i776 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i777 = data
  i776.m_NormalTrigger = i777[0]
  i776.m_HighlightedTrigger = i777[1]
  i776.m_PressedTrigger = i777[2]
  i776.m_SelectedTrigger = i777[3]
  i776.m_DisabledTrigger = i777[4]
  return i776
}

Deserializers["PlaceButton"] = function (request, data, root) {
  var i778 = root || request.c( 'PlaceButton' )
  var i779 = data
  request.r(i779[0], i779[1], 0, i778, 'placer')
  request.r(i779[2], i779[3], 0, i778, 'ring')
  request.r(i779[4], i779[5], 0, i778, 'icon')
  request.r(i779[6], i779[7], 0, i778, 'button')
  i778.disabledColor = new pc.Color(i779[8], i779[9], i779[10], i779[11])
  i778.readyColor = new pc.Color(i779[12], i779[13], i779[14], i779[15])
  i778.validColor = new pc.Color(i779[16], i779[17], i779[18], i779[19])
  return i778
}

Deserializers["HotbarUI"] = function (request, data, root) {
  var i780 = root || request.c( 'HotbarUI' )
  var i781 = data
  var i783 = i781[0]
  var i782 = []
  for(var i = 0; i < i783.length; i += 2) {
  request.r(i783[i + 0], i783[i + 1], 2, i782, '')
  }
  i780.slotIcons = i782
  var i785 = i781[1]
  var i784 = []
  for(var i = 0; i < i785.length; i += 2) {
  request.r(i785[i + 0], i785[i + 1], 2, i784, '')
  }
  i780.slotButtons = i784
  request.r(i781[2], i781[3], 0, i780, 'selectFrame')
  request.r(i781[4], i781[5], 0, i780, 'itemName')
  i780.nameShowTime = i781[6]
  return i780
}

Deserializers["ColorChoiceUI"] = function (request, data, root) {
  var i790 = root || request.c( 'ColorChoiceUI' )
  var i791 = data
  request.r(i791[0], i791[1], 0, i790, 'title')
  request.r(i791[2], i791[3], 0, i790, 'titleBackdrop')
  request.r(i791[4], i791[5], 0, i790, 'pinkCard')
  request.r(i791[6], i791[7], 0, i790, 'blueCard')
  request.r(i791[8], i791[9], 0, i790, 'hand')
  i790.titleMaxFontSize = i791[10]
  i790.moveTime = i791[11]
  i790.pointTime = i791[12]
  return i790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i792 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i793 = data
  i792.m_Alpha = i793[0]
  i792.m_Interactable = !!i793[1]
  i792.m_BlocksRaycasts = !!i793[2]
  i792.m_IgnoreParentGroups = !!i793[3]
  i792.enabled = !!i793[4]
  return i792
}

Deserializers["CtaOverlay"] = function (request, data, root) {
  var i794 = root || request.c( 'CtaOverlay' )
  var i795 = data
  request.r(i795[0], i795[1], 0, i794, 'button')
  return i794
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i796 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i797 = data
  request.r(i797[0], i797[1], 0, i796, 'm_FirstSelected')
  i796.m_sendNavigationEvents = !!i797[2]
  i796.m_DragThreshold = i797[3]
  return i796
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i798 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i799 = data
  i798.m_HorizontalAxis = i799[0]
  i798.m_VerticalAxis = i799[1]
  i798.m_SubmitButton = i799[2]
  i798.m_CancelButton = i799[3]
  i798.m_InputActionsPerSecond = i799[4]
  i798.m_RepeatDelay = i799[5]
  i798.m_ForceModuleActive = !!i799[6]
  i798.m_SendPointerHoverToParent = !!i799[7]
  return i798
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i801 = data
  i800.ambientIntensity = i801[0]
  i800.reflectionIntensity = i801[1]
  i800.ambientMode = i801[2]
  i800.ambientLight = new pc.Color(i801[3], i801[4], i801[5], i801[6])
  i800.ambientSkyColor = new pc.Color(i801[7], i801[8], i801[9], i801[10])
  i800.ambientGroundColor = new pc.Color(i801[11], i801[12], i801[13], i801[14])
  i800.ambientEquatorColor = new pc.Color(i801[15], i801[16], i801[17], i801[18])
  i800.fogColor = new pc.Color(i801[19], i801[20], i801[21], i801[22])
  i800.fogEndDistance = i801[23]
  i800.fogStartDistance = i801[24]
  i800.fogDensity = i801[25]
  i800.fog = !!i801[26]
  request.r(i801[27], i801[28], 0, i800, 'skybox')
  i800.fogMode = i801[29]
  var i803 = i801[30]
  var i802 = []
  for(var i = 0; i < i803.length; i += 1) {
    i802.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i803[i + 0]) );
  }
  i800.lightmaps = i802
  i800.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i801[31], i800.lightProbes)
  i800.lightmapsMode = i801[32]
  i800.mixedBakeMode = i801[33]
  i800.environmentLightingMode = i801[34]
  i800.ambientProbe = new pc.SphericalHarmonicsL2(i801[35])
  request.r(i801[36], i801[37], 0, i800, 'customReflection')
  request.r(i801[38], i801[39], 0, i800, 'defaultReflection')
  i800.defaultReflectionMode = i801[40]
  i800.defaultReflectionResolution = i801[41]
  i800.sunLightObjectId = i801[42]
  i800.pixelLightCount = i801[43]
  i800.defaultReflectionHDR = !!i801[44]
  i800.hasLightDataAsset = !!i801[45]
  i800.hasManualGenerate = !!i801[46]
  return i800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i807 = data
  request.r(i807[0], i807[1], 0, i806, 'lightmapColor')
  request.r(i807[2], i807[3], 0, i806, 'lightmapDirection')
  request.r(i807[4], i807[5], 0, i806, 'shadowMask')
  return i806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i808 = root || new UnityEngine.LightProbes()
  var i809 = data
  return i808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset"] = function (request, data, root) {
  var i816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset' )
  var i817 = data
  i816.AdditionalLightsRenderingMode = i817[0]
  i816.LightRenderingMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode', i817[1], i816.LightRenderingMode)
  i816.MainLightRenderingModeValue = i817[2]
  i816.SupportsMainLightShadows = !!i817[3]
  i816.MixedLightingSupported = !!i817[4]
  i816.MainLightShadowmapResolutionValue = i817[5]
  i816.SupportsSoftShadows = !!i817[6]
  i816.SoftShadowQualityValue = i817[7]
  i816.ShadowDistance = i817[8]
  i816.ShadowCascadeCount = i817[9]
  i816.Cascade2Split = i817[10]
  i816.Cascade3Split = new pc.Vec2( i817[11], i817[12] )
  i816.Cascade4Split = new pc.Vec3( i817[13], i817[14], i817[15] )
  i816.CascadeBorder = i817[16]
  i816.ShadowDepthBias = i817[17]
  i816.ShadowNormalBias = i817[18]
  i816.RequireDepthTexture = !!i817[19]
  i816.RequireOpaqueTexture = !!i817[20]
  i816.scriptableRendererData = request.d('Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData', i817[21], i816.scriptableRendererData)
  return i816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode"] = function (request, data, root) {
  var i818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode' )
  var i819 = data
  i818.Disabled = i819[0]
  i818.PerVertex = i819[1]
  i818.PerPixel = i819[2]
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData"] = function (request, data, root) {
  var i820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData' )
  var i821 = data
  i820.opaqueLayerMask = i821[0]
  i820.transparentLayerMask = i821[1]
  var i823 = i821[2]
  var i822 = []
  for(var i = 0; i < i823.length; i += 1) {
    i822.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects', i823[i + 0]) );
  }
  i820.RenderObjectsFeatures = i822
  i820.name = i821[3]
  return i820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects"] = function (request, data, root) {
  var i826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects' )
  var i827 = data
  i826.settings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings', i827[0], i826.settings)
  i826.name = i827[1]
  i826.typeName = i827[2]
  return i826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i829 = data
  var i831 = i829[0]
  var i830 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i831.length; i += 1) {
    i830.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i831[i + 0]));
  }
  i828.ShaderCompilationErrors = i830
  i828.name = i829[1]
  i828.guid = i829[2]
  var i833 = i829[3]
  var i832 = []
  for(var i = 0; i < i833.length; i += 1) {
    i832.push( i833[i + 0] );
  }
  i828.shaderDefinedKeywords = i832
  var i835 = i829[4]
  var i834 = []
  for(var i = 0; i < i835.length; i += 1) {
    i834.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i835[i + 0]) );
  }
  i828.passes = i834
  var i837 = i829[5]
  var i836 = []
  for(var i = 0; i < i837.length; i += 1) {
    i836.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i837[i + 0]) );
  }
  i828.usePasses = i836
  var i839 = i829[6]
  var i838 = []
  for(var i = 0; i < i839.length; i += 1) {
    i838.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i839[i + 0]) );
  }
  i828.defaultParameterValues = i838
  request.r(i829[7], i829[8], 0, i828, 'unityFallbackShader')
  i828.readDepth = !!i829[9]
  i828.hasDepthOnlyPass = !!i829[10]
  i828.isCreatedByShaderGraph = !!i829[11]
  i828.disableBatching = !!i829[12]
  i828.compiled = !!i829[13]
  return i828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i843 = data
  i842.shaderName = i843[0]
  i842.errorMessage = i843[1]
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i848 = root || new pc.UnityShaderPass()
  var i849 = data
  i848.id = i849[0]
  i848.subShaderIndex = i849[1]
  i848.name = i849[2]
  i848.passType = i849[3]
  i848.grabPassTextureName = i849[4]
  i848.usePass = !!i849[5]
  i848.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[6], i848.zTest)
  i848.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[7], i848.zWrite)
  i848.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[8], i848.culling)
  i848.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i849[9], i848.blending)
  i848.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i849[10], i848.alphaBlending)
  i848.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[11], i848.colorWriteMask)
  i848.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[12], i848.offsetUnits)
  i848.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[13], i848.offsetFactor)
  i848.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[14], i848.stencilRef)
  i848.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[15], i848.stencilReadMask)
  i848.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i849[16], i848.stencilWriteMask)
  i848.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i849[17], i848.stencilOp)
  i848.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i849[18], i848.stencilOpFront)
  i848.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i849[19], i848.stencilOpBack)
  var i851 = i849[20]
  var i850 = []
  for(var i = 0; i < i851.length; i += 1) {
    i850.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i851[i + 0]) );
  }
  i848.tags = i850
  var i853 = i849[21]
  var i852 = []
  for(var i = 0; i < i853.length; i += 1) {
    i852.push( i853[i + 0] );
  }
  i848.passDefinedKeywords = i852
  var i855 = i849[22]
  var i854 = []
  for(var i = 0; i < i855.length; i += 1) {
    i854.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i855[i + 0]) );
  }
  i848.passDefinedKeywordGroups = i854
  var i857 = i849[23]
  var i856 = []
  for(var i = 0; i < i857.length; i += 1) {
    i856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i857[i + 0]) );
  }
  i848.variants = i856
  var i859 = i849[24]
  var i858 = []
  for(var i = 0; i < i859.length; i += 1) {
    i858.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i859[i + 0]) );
  }
  i848.excludedVariants = i858
  i848.hasDepthReader = !!i849[25]
  return i848
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i861 = data
  i860.val = i861[0]
  i860.name = i861[1]
  return i860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i863 = data
  i862.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i863[0], i862.src)
  i862.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i863[1], i862.dst)
  i862.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i863[2], i862.op)
  return i862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i865 = data
  i864.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i865[0], i864.pass)
  i864.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i865[1], i864.fail)
  i864.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i865[2], i864.zFail)
  i864.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i865[3], i864.comp)
  return i864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i868 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i869 = data
  i868.name = i869[0]
  i868.value = i869[1]
  return i868
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i873 = data
  var i875 = i873[0]
  var i874 = []
  for(var i = 0; i < i875.length; i += 1) {
    i874.push( i875[i + 0] );
  }
  i872.keywords = i874
  i872.hasDiscard = !!i873[1]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i879 = data
  i878.passId = i879[0]
  i878.subShaderIndex = i879[1]
  var i881 = i879[2]
  var i880 = []
  for(var i = 0; i < i881.length; i += 1) {
    i880.push( i881[i + 0] );
  }
  i878.keywords = i880
  i878.vertexProgram = i879[3]
  i878.fragmentProgram = i879[4]
  i878.exportedForWebGl2 = !!i879[5]
  i878.readDepth = !!i879[6]
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i884 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i885 = data
  request.r(i885[0], i885[1], 0, i884, 'shader')
  i884.pass = i885[2]
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i889 = data
  i888.name = i889[0]
  i888.type = i889[1]
  i888.value = new pc.Vec4( i889[2], i889[3], i889[4], i889[5] )
  i888.textureValue = i889[6]
  i888.shaderPropertyFlag = i889[7]
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i891 = data
  i890.name = i891[0]
  request.r(i891[1], i891[2], 0, i890, 'texture')
  i890.aabb = i891[3]
  i890.vertices = i891[4]
  i890.triangles = i891[5]
  i890.textureRect = UnityEngine.Rect.MinMaxRect(i891[6], i891[7], i891[8], i891[9])
  i890.packedRect = UnityEngine.Rect.MinMaxRect(i891[10], i891[11], i891[12], i891[13])
  i890.border = new pc.Vec4( i891[14], i891[15], i891[16], i891[17] )
  i890.transparency = i891[18]
  i890.bounds = i891[19]
  i890.pixelsPerUnit = i891[20]
  i890.textureWidth = i891[21]
  i890.textureHeight = i891[22]
  i890.nativeSize = new pc.Vec2( i891[23], i891[24] )
  i890.pivot = new pc.Vec2( i891[25], i891[26] )
  i890.textureRectOffset = new pc.Vec2( i891[27], i891[28] )
  return i890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i892 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i893 = data
  i892.name = i893[0]
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i895 = data
  i894.name = i895[0]
  i894.wrapMode = i895[1]
  i894.isLooping = !!i895[2]
  i894.length = i895[3]
  var i897 = i895[4]
  var i896 = []
  for(var i = 0; i < i897.length; i += 1) {
    i896.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i897[i + 0]) );
  }
  i894.curves = i896
  var i899 = i895[5]
  var i898 = []
  for(var i = 0; i < i899.length; i += 1) {
    i898.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i899[i + 0]) );
  }
  i894.events = i898
  i894.halfPrecision = !!i895[6]
  i894._frameRate = i895[7]
  i894.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i895[8], i894.localBounds)
  i894.hasMuscleCurves = !!i895[9]
  var i901 = i895[10]
  var i900 = []
  for(var i = 0; i < i901.length; i += 1) {
    i900.push( i901[i + 0] );
  }
  i894.clipMuscleConstant = i900
  i894.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i895[11], i894.clipBindingConstant)
  return i894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i905 = data
  i904.path = i905[0]
  i904.hash = i905[1]
  i904.componentType = i905[2]
  i904.property = i905[3]
  i904.keys = i905[4]
  var i907 = i905[5]
  var i906 = []
  for(var i = 0; i < i907.length; i += 1) {
    i906.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i907[i + 0]) );
  }
  i904.objectReferenceKeys = i906
  return i904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i911 = data
  i910.time = i911[0]
  request.r(i911[1], i911[2], 0, i910, 'value')
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i915 = data
  i914.functionName = i915[0]
  i914.floatParameter = i915[1]
  i914.intParameter = i915[2]
  i914.stringParameter = i915[3]
  request.r(i915[4], i915[5], 0, i914, 'objectReferenceParameter')
  i914.time = i915[6]
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i916 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i917 = data
  i916.center = new pc.Vec3( i917[0], i917[1], i917[2] )
  i916.extends = new pc.Vec3( i917[3], i917[4], i917[5] )
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i921 = data
  var i923 = i921[0]
  var i922 = []
  for(var i = 0; i < i923.length; i += 1) {
    i922.push( i923[i + 0] );
  }
  i920.genericBindings = i922
  var i925 = i921[1]
  var i924 = []
  for(var i = 0; i < i925.length; i += 1) {
    i924.push( i925[i + 0] );
  }
  i920.pptrCurveMapping = i924
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i927 = data
  i926.name = i927[0]
  i926.ascent = i927[1]
  i926.originalLineHeight = i927[2]
  i926.fontSize = i927[3]
  var i929 = i927[4]
  var i928 = []
  for(var i = 0; i < i929.length; i += 1) {
    i928.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i929[i + 0]) );
  }
  i926.characterInfo = i928
  request.r(i927[5], i927[6], 0, i926, 'texture')
  i926.originalFontSize = i927[7]
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i933 = data
  i932.index = i933[0]
  i932.advance = i933[1]
  i932.bearing = i933[2]
  i932.glyphWidth = i933[3]
  i932.glyphHeight = i933[4]
  i932.minX = i933[5]
  i932.maxX = i933[6]
  i932.minY = i933[7]
  i932.maxY = i933[8]
  i932.uvBottomLeftX = i933[9]
  i932.uvBottomLeftY = i933[10]
  i932.uvBottomRightX = i933[11]
  i932.uvBottomRightY = i933[12]
  i932.uvTopLeftX = i933[13]
  i932.uvTopLeftY = i933[14]
  i932.uvTopRightX = i933[15]
  i932.uvTopRightY = i933[16]
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i935 = data
  var i937 = i935[0]
  var i936 = []
  for(var i = 0; i < i937.length; i += 1) {
    i936.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i937[i + 0]) );
  }
  i934.files = i936
  i934.componentToPrefabIds = i935[1]
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i941 = data
  i940.path = i941[0]
  request.r(i941[1], i941[2], 0, i940, 'unityObject')
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i943 = data
  var i945 = i943[0]
  var i944 = []
  for(var i = 0; i < i945.length; i += 1) {
    i944.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i945[i + 0]) );
  }
  i942.scriptsExecutionOrder = i944
  var i947 = i943[1]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i947[i + 0]) );
  }
  i942.sortingLayers = i946
  var i949 = i943[2]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i949[i + 0]) );
  }
  i942.cullingLayers = i948
  i942.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i943[3], i942.timeSettings)
  i942.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i943[4], i942.physicsSettings)
  i942.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i943[5], i942.physics2DSettings)
  i942.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i943[6], i942.qualitySettings)
  i942.enableRealtimeShadows = !!i943[7]
  i942.enableAutoInstancing = !!i943[8]
  i942.enableStaticBatching = !!i943[9]
  i942.enableDynamicBatching = !!i943[10]
  i942.usePreservativeDynamicBatching = !!i943[11]
  i942.lightmapEncodingQuality = i943[12]
  i942.desiredColorSpace = i943[13]
  var i951 = i943[14]
  var i950 = []
  for(var i = 0; i < i951.length; i += 1) {
    i950.push( i951[i + 0] );
  }
  i942.allTags = i950
  return i942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i955 = data
  i954.name = i955[0]
  i954.value = i955[1]
  return i954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i959 = data
  i958.id = i959[0]
  i958.name = i959[1]
  i958.value = i959[2]
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i963 = data
  i962.id = i963[0]
  i962.name = i963[1]
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i965 = data
  i964.fixedDeltaTime = i965[0]
  i964.maximumDeltaTime = i965[1]
  i964.timeScale = i965[2]
  i964.maximumParticleTimestep = i965[3]
  return i964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i966 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i967 = data
  i966.gravity = new pc.Vec3( i967[0], i967[1], i967[2] )
  i966.defaultSolverIterations = i967[3]
  i966.bounceThreshold = i967[4]
  i966.autoSyncTransforms = !!i967[5]
  i966.autoSimulation = !!i967[6]
  var i969 = i967[7]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i969[i + 0]) );
  }
  i966.collisionMatrix = i968
  return i966
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i973 = data
  i972.enabled = !!i973[0]
  i972.layerId = i973[1]
  i972.otherLayerId = i973[2]
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i975 = data
  request.r(i975[0], i975[1], 0, i974, 'material')
  i974.gravity = new pc.Vec2( i975[2], i975[3] )
  i974.positionIterations = i975[4]
  i974.velocityIterations = i975[5]
  i974.velocityThreshold = i975[6]
  i974.maxLinearCorrection = i975[7]
  i974.maxAngularCorrection = i975[8]
  i974.maxTranslationSpeed = i975[9]
  i974.maxRotationSpeed = i975[10]
  i974.baumgarteScale = i975[11]
  i974.baumgarteTOIScale = i975[12]
  i974.timeToSleep = i975[13]
  i974.linearSleepTolerance = i975[14]
  i974.angularSleepTolerance = i975[15]
  i974.defaultContactOffset = i975[16]
  i974.autoSimulation = !!i975[17]
  i974.queriesHitTriggers = !!i975[18]
  i974.queriesStartInColliders = !!i975[19]
  i974.callbacksOnDisable = !!i975[20]
  i974.reuseCollisionCallbacks = !!i975[21]
  i974.autoSyncTransforms = !!i975[22]
  var i977 = i975[23]
  var i976 = []
  for(var i = 0; i < i977.length; i += 1) {
    i976.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i977[i + 0]) );
  }
  i974.collisionMatrix = i976
  return i974
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i980 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i981 = data
  i980.enabled = !!i981[0]
  i980.layerId = i981[1]
  i980.otherLayerId = i981[2]
  return i980
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i983 = data
  var i985 = i983[0]
  var i984 = []
  for(var i = 0; i < i985.length; i += 1) {
    i984.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i985[i + 0]) );
  }
  i982.qualityLevels = i984
  var i987 = i983[1]
  var i986 = []
  for(var i = 0; i < i987.length; i += 1) {
    i986.push( i987[i + 0] );
  }
  i982.names = i986
  i982.shadows = i983[2]
  i982.anisotropicFiltering = i983[3]
  i982.antiAliasing = i983[4]
  i982.lodBias = i983[5]
  i982.shadowCascades = i983[6]
  i982.shadowDistance = i983[7]
  i982.shadowmaskMode = i983[8]
  i982.shadowProjection = i983[9]
  i982.shadowResolution = i983[10]
  i982.softParticles = !!i983[11]
  i982.softVegetation = !!i983[12]
  i982.activeColorSpace = i983[13]
  i982.desiredColorSpace = i983[14]
  i982.masterTextureLimit = i983[15]
  i982.maxQueuedFrames = i983[16]
  i982.particleRaycastBudget = i983[17]
  i982.pixelLightCount = i983[18]
  i982.realtimeReflectionProbes = !!i983[19]
  i982.shadowCascade2Split = i983[20]
  i982.shadowCascade4Split = new pc.Vec3( i983[21], i983[22], i983[23] )
  i982.streamingMipmapsActive = !!i983[24]
  i982.vSyncCount = i983[25]
  i982.asyncUploadBufferSize = i983[26]
  i982.asyncUploadTimeSlice = i983[27]
  i982.billboardsFaceCameraPosition = !!i983[28]
  i982.shadowNearPlaneOffset = i983[29]
  i982.streamingMipmapsMemoryBudget = i983[30]
  i982.maximumLODLevel = i983[31]
  i982.streamingMipmapsAddAllCameras = !!i983[32]
  i982.streamingMipmapsMaxLevelReduction = i983[33]
  i982.streamingMipmapsRenderersPerFrame = i983[34]
  i982.resolutionScalingFixedDPIFactor = i983[35]
  i982.streamingMipmapsMaxFileIORequests = i983[36]
  i982.currentQualityLevel = i983[37]
  return i982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i993 = data
  i992.weight = i993[0]
  i992.vertices = i993[1]
  i992.normals = i993[2]
  i992.tangents = i993[3]
  return i992
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i994 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i995 = data
  request.r(i995[0], i995[1], 0, i994, 'm_ObjectArgument')
  i994.m_ObjectArgumentAssemblyTypeName = i995[2]
  i994.m_IntArgument = i995[3]
  i994.m_FloatArgument = i995[4]
  i994.m_StringArgument = i995[5]
  i994.m_BoolArgument = !!i995[6]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings' )
  var i997 = data
  i996.Event = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i997[0], i996.Event)
  i996.filterSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings', i997[1], i996.filterSettings)
  i996.overrideMaterialId = i997[2]
  i996.overrideMaterialPassIndex = i997[3]
  i996.overrideShaderId = i997[4]
  i996.overrideShaderPassIndex = i997[5]
  i996.overrideMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i997[6], i996.overrideMode)
  i996.overrideDepthState = !!i997[7]
  i996.depthCompareFunction = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i997[8], i996.depthCompareFunction)
  i996.enableWrite = !!i997[9]
  i996.stencilSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.StencilStateData', i997[10], i996.stencilSettings)
  i996.cameraSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings', i997[11], i996.cameraSettings)
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.EnumDescription"] = function (request, data, root) {
  var i998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.EnumDescription' )
  var i999 = data
  i998.Value = i999[0]
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings"] = function (request, data, root) {
  var i1000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings' )
  var i1001 = data
  i1000.RenderQueueType = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1001[0], i1000.RenderQueueType)
  i1000.LayerMask = i1001[1]
  var i1003 = i1001[2]
  var i1002 = []
  for(var i = 0; i < i1003.length; i += 1) {
    i1002.push( i1003[i + 0] );
  }
  i1000.PassNames = i1002
  return i1000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.StencilStateData"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.StencilStateData' )
  var i1005 = data
  i1004.overrideStencilState = !!i1005[0]
  i1004.stencilReference = i1005[1]
  i1004.stencilCompareFunctionValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1005[2], i1004.stencilCompareFunctionValue)
  i1004.passOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1005[3], i1004.passOperationValue)
  i1004.failOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1005[4], i1004.failOperationValue)
  i1004.zFailOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1005[5], i1004.zFailOperationValue)
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings"] = function (request, data, root) {
  var i1006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings' )
  var i1007 = data
  i1006.overrideCamera = !!i1007[0]
  i1006.restoreCamera = !!i1007[1]
  i1006.offset = new pc.Vec4( i1007[2], i1007[3], i1007[4], i1007[5] )
  i1006.cameraFieldOfView = i1007[6]
  return i1006
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.Animation":{"playAutomatically":0,"clip":1,"clips":3,"wrapMode":4,"enabled":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset":{"AdditionalLightsRenderingMode":0,"LightRenderingMode":1,"MainLightRenderingModeValue":2,"SupportsMainLightShadows":3,"MixedLightingSupported":4,"MainLightShadowmapResolutionValue":5,"SupportsSoftShadows":6,"SoftShadowQualityValue":7,"ShadowDistance":8,"ShadowCascadeCount":9,"Cascade2Split":10,"Cascade3Split":11,"Cascade4Split":13,"CascadeBorder":16,"ShadowDepthBias":17,"ShadowNormalBias":18,"RequireDepthTexture":19,"RequireOpaqueTexture":20,"scriptableRendererData":21},"Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode":{"Disabled":0,"PerVertex":1,"PerPixel":2},"Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData":{"opaqueLayerMask":0,"transparentLayerMask":1,"RenderObjectsFeatures":2,"name":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects":{"settings":0,"name":1,"typeName":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings":{"Event":0,"filterSettings":1,"overrideMaterialId":2,"overrideMaterialPassIndex":3,"overrideShaderId":4,"overrideShaderPassIndex":5,"overrideMode":6,"overrideDepthState":7,"depthCompareFunction":8,"enableWrite":9,"stencilSettings":10,"cameraSettings":11},"Luna.Unity.DTO.UnityEngine.Assets.EnumDescription":{"Value":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings":{"RenderQueueType":0,"LayerMask":1,"PassNames":2},"Luna.Unity.DTO.UnityEngine.Assets.StencilStateData":{"overrideStencilState":0,"stencilReference":1,"stencilCompareFunctionValue":2,"passOperationValue":3,"failOperationValue":4,"zFailOperationValue":5},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings":{"overrideCamera":0,"restoreCamera":1,"offset":2,"cameraFieldOfView":6}}

Deserializers.requiredComponents = {"55":[56],"57":[56],"58":[56],"59":[56],"60":[56],"61":[56],"62":[63],"64":[12],"65":[66],"67":[66],"68":[66],"69":[66],"70":[66],"71":[66],"72":[73],"74":[73],"75":[73],"76":[73],"77":[73],"78":[73],"79":[73],"80":[73],"81":[73],"82":[73],"83":[73],"84":[73],"85":[73],"86":[12],"87":[5],"88":[89],"90":[89],"41":[40],"35":[20],"37":[10],"50":[46],"11":[10],"91":[40],"92":[12],"93":[12],"19":[18],"94":[40],"95":[47,40],"96":[5],"97":[47,40],"98":[40],"99":[40],"100":[5,40],"101":[40,47],"102":[103],"104":[103],"105":[103],"106":[51],"107":[40],"108":[40],"44":[41],"29":[47,40],"109":[40],"43":[41],"110":[40],"111":[40],"112":[40],"113":[40],"114":[40],"115":[40],"116":[40],"117":[40],"118":[40],"119":[47,40],"120":[40],"121":[40],"122":[40],"123":[40],"46":[47,40],"124":[40],"125":[53],"126":[53],"54":[53],"127":[53],"128":[12],"129":[12]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.MeshCollider","UnityEngine.BoxCollider","UnityEngine.MonoBehaviour","CharacterWalker","ThirdPersonController","UnityEngine.Camera","VirtualJoystick","UnityEngine.Cubemap","UnityEngine.AudioListener","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","PlayableConfig","UnityEngine.AudioClip","GameFlow","IntroSequence","BlockPlacer","TreeRecolor","ColorChoiceUI","UnityEngine.GameObject","TutorialHud","UnityEngine.UI.Image","UnityEngine.Sprite","CtaOverlay","UnityEngine.AudioSource","UnityEngine.CanvasGroup","HotbarUI","LunaController","Sfx","NpcWander","UnityEngine.Animation","UnityEngine.AnimationClip","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","OrientationLayout","UnityEngine.UI.Text","UnityEngine.CanvasRenderer","TouchArea","UnityEngine.Font","TextBorder","UnityEngine.UI.Button","PlaceButton","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Rendering.UI.UIFoldout","UnityEngine.Rendering.Universal.PixelPerfectCamera","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.Purchasing.IAPButton","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CBBW2_V28";

Deserializers.lunaInitializationTime = "10/23/2026 08:55:09";

Deserializers.lunaDaysRunning = "3.7";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_DatDV_CBBW2_V28_YenTTH";

Deserializers.lunaAppID = "39768";

Deserializers.projectId = "3c72c65a16f0acb438eed22b8b16c24a";

Deserializers.packagesInfo = "com.unity.render-pipelines.universal: 17.0.4\ncom.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1747";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3462";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, reflection, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "Unity Technologies";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.UnityTechnologies.com.unity.template.urpblank";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "f3638ae4-8c64-48df-82dc-2b08691ae636";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["Unity","Burst","BurstCompiler","ResetStaticsOnLoad"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Unity","Services","Core","Editor","StatusInitializer","InitializeOnLoad"],["Ua2CoreInitializeCallback","Register"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"],["GLTFast","Export","ImageExport","ResetStaticsOnLoad"],["GLTFast","Export","MaterialExport","ResetStaticsOnLoad"],["GLTFast","Export","NormalImageExport","ResetStaticsOnLoad"],["GLTFast","Export","MetaMaterialExportBuiltIn","ResetStaticsOnLoad"],["GLTFast","Export","OrmImageExport","ResetStaticsOnLoad"],["GLTFast","RenderPipelineUtils","ResetStaticsOnLoad"],["GLTFast","Jobs","CachedFunction","ResetStaticsOnLoad"],["GLTFast","GltfImport","ResetStaticsOnLoad"],["GLTFast","Materials","MaterialGenerator","ResetStaticsOnLoad"],["GLTFast","Materials","UniversalRPMaterialGenerator","ResetStaticsOnLoad"],["GLTFast","Addons","ImportAddonRegistry","ResetStaticsOnLoad"],["GLTFast","Materials","ShaderGraphMaterialGenerator","ResetStaticsOnLoad"],["GLTFast","GltfImportBase","ResetStaticsOnLoad"],["GLTFast","Materials","BuiltInMaterialGenerator","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

