var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i510 = root || request.c( 'UnityEngine.JointSpring' )
  var i511 = data
  i510.spring = i511[0]
  i510.damper = i511[1]
  i510.targetPosition = i511[2]
  return i510
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i512 = root || request.c( 'UnityEngine.JointMotor' )
  var i513 = data
  i512.m_TargetVelocity = i513[0]
  i512.m_Force = i513[1]
  i512.m_FreeSpin = i513[2]
  return i512
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i514 = root || request.c( 'UnityEngine.JointLimits' )
  var i515 = data
  i514.m_Min = i515[0]
  i514.m_Max = i515[1]
  i514.m_Bounciness = i515[2]
  i514.m_BounceMinVelocity = i515[3]
  i514.m_ContactDistance = i515[4]
  i514.minBounce = i515[5]
  i514.maxBounce = i515[6]
  return i514
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i516 = root || request.c( 'UnityEngine.JointDrive' )
  var i517 = data
  i516.m_PositionSpring = i517[0]
  i516.m_PositionDamper = i517[1]
  i516.m_MaximumForce = i517[2]
  i516.m_UseAcceleration = i517[3]
  return i516
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i519 = data
  i518.m_Spring = i519[0]
  i518.m_Damper = i519[1]
  return i518
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i520 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i521 = data
  i520.m_Limit = i521[0]
  i520.m_Bounciness = i521[1]
  i520.m_ContactDistance = i521[2]
  return i520
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i522 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i523 = data
  i522.m_ExtremumSlip = i523[0]
  i522.m_ExtremumValue = i523[1]
  i522.m_AsymptoteSlip = i523[2]
  i522.m_AsymptoteValue = i523[3]
  i522.m_Stiffness = i523[4]
  return i522
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i524 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i525 = data
  i524.m_LowerAngle = i525[0]
  i524.m_UpperAngle = i525[1]
  return i524
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i526 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i527 = data
  i526.m_MotorSpeed = i527[0]
  i526.m_MaximumMotorTorque = i527[1]
  return i526
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i528 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i529 = data
  i528.m_DampingRatio = i529[0]
  i528.m_Frequency = i529[1]
  i528.m_Angle = i529[2]
  return i528
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i530 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i531 = data
  i530.m_LowerTranslation = i531[0]
  i530.m_UpperTranslation = i531[1]
  return i530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i532 = root || new pc.UnityMaterial()
  var i533 = data
  i532.name = i533[0]
  request.r(i533[1], i533[2], 0, i532, 'shader')
  i532.renderQueue = i533[3]
  i532.enableInstancing = !!i533[4]
  var i535 = i533[5]
  var i534 = []
  for(var i = 0; i < i535.length; i += 1) {
    i534.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i535[i + 0]) );
  }
  i532.floatParameters = i534
  var i537 = i533[6]
  var i536 = []
  for(var i = 0; i < i537.length; i += 1) {
    i536.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i537[i + 0]) );
  }
  i532.colorParameters = i536
  var i539 = i533[7]
  var i538 = []
  for(var i = 0; i < i539.length; i += 1) {
    i538.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i539[i + 0]) );
  }
  i532.vectorParameters = i538
  var i541 = i533[8]
  var i540 = []
  for(var i = 0; i < i541.length; i += 1) {
    i540.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i541[i + 0]) );
  }
  i532.textureParameters = i540
  var i543 = i533[9]
  var i542 = []
  for(var i = 0; i < i543.length; i += 1) {
    i542.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i543[i + 0]) );
  }
  i532.materialFlags = i542
  return i532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i547 = data
  i546.name = i547[0]
  i546.value = i547[1]
  return i546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i551 = data
  i550.name = i551[0]
  i550.value = new pc.Color(i551[1], i551[2], i551[3], i551[4])
  return i550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i555 = data
  i554.name = i555[0]
  i554.value = new pc.Vec4( i555[1], i555[2], i555[3], i555[4] )
  return i554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i559 = data
  i558.name = i559[0]
  request.r(i559[1], i559[2], 0, i558, 'value')
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i563 = data
  i562.name = i563[0]
  i562.enabled = !!i563[1]
  return i562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i565 = data
  i564.name = i565[0]
  i564.width = i565[1]
  i564.height = i565[2]
  i564.mipmapCount = i565[3]
  i564.anisoLevel = i565[4]
  i564.filterMode = i565[5]
  i564.hdr = !!i565[6]
  i564.format = i565[7]
  i564.wrapMode = i565[8]
  i564.alphaIsTransparency = !!i565[9]
  i564.alphaSource = i565[10]
  i564.graphicsFormat = i565[11]
  i564.sRGBTexture = !!i565[12]
  i564.desiredColorSpace = i565[13]
  i564.wrapU = i565[14]
  i564.wrapV = i565[15]
  return i564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i567 = data
  i566.position = new pc.Vec3( i567[0], i567[1], i567[2] )
  i566.scale = new pc.Vec3( i567[3], i567[4], i567[5] )
  i566.rotation = new pc.Quat(i567[6], i567[7], i567[8], i567[9])
  return i566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i569 = data
  request.r(i569[0], i569[1], 0, i568, 'sharedMesh')
  return i568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i571 = data
  request.r(i571[0], i571[1], 0, i570, 'additionalVertexStreams')
  i570.enabled = !!i571[2]
  request.r(i571[3], i571[4], 0, i570, 'sharedMaterial')
  var i573 = i571[5]
  var i572 = []
  for(var i = 0; i < i573.length; i += 2) {
  request.r(i573[i + 0], i573[i + 1], 2, i572, '')
  }
  i570.sharedMaterials = i572
  i570.receiveShadows = !!i571[6]
  i570.shadowCastingMode = i571[7]
  i570.sortingLayerID = i571[8]
  i570.sortingOrder = i571[9]
  i570.lightmapIndex = i571[10]
  i570.lightmapSceneIndex = i571[11]
  i570.lightmapScaleOffset = new pc.Vec4( i571[12], i571[13], i571[14], i571[15] )
  i570.lightProbeUsage = i571[16]
  i570.reflectionProbeUsage = i571[17]
  return i570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i577 = data
  i576.name = i577[0]
  i576.tagId = i577[1]
  i576.enabled = !!i577[2]
  i576.isStatic = !!i577[3]
  i576.layer = i577[4]
  return i576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i579 = data
  request.r(i579[0], i579[1], 0, i578, 'sharedMesh')
  i578.convex = !!i579[2]
  i578.enabled = !!i579[3]
  i578.isTrigger = !!i579[4]
  request.r(i579[5], i579[6], 0, i578, 'material')
  return i578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i581 = data
  i580.center = new pc.Vec3( i581[0], i581[1], i581[2] )
  i580.size = new pc.Vec3( i581[3], i581[4], i581[5] )
  i580.enabled = !!i581[6]
  i580.isTrigger = !!i581[7]
  request.r(i581[8], i581[9], 0, i580, 'material')
  return i580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i583 = data
  i582.name = i583[0]
  i582.halfPrecision = !!i583[1]
  i582.useSimplification = !!i583[2]
  i582.useUInt32IndexFormat = !!i583[3]
  i582.vertexCount = i583[4]
  i582.aabb = i583[5]
  var i585 = i583[6]
  var i584 = []
  for(var i = 0; i < i585.length; i += 1) {
    i584.push( !!i585[i + 0] );
  }
  i582.streams = i584
  i582.vertices = i583[7]
  var i587 = i583[8]
  var i586 = []
  for(var i = 0; i < i587.length; i += 1) {
    i586.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i587[i + 0]) );
  }
  i582.subMeshes = i586
  var i589 = i583[9]
  var i588 = []
  for(var i = 0; i < i589.length; i += 16) {
    i588.push( new pc.Mat4().setData(i589[i + 0], i589[i + 1], i589[i + 2], i589[i + 3],  i589[i + 4], i589[i + 5], i589[i + 6], i589[i + 7],  i589[i + 8], i589[i + 9], i589[i + 10], i589[i + 11],  i589[i + 12], i589[i + 13], i589[i + 14], i589[i + 15]) );
  }
  i582.bindposes = i588
  var i591 = i583[10]
  var i590 = []
  for(var i = 0; i < i591.length; i += 1) {
    i590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i591[i + 0]) );
  }
  i582.blendShapes = i590
  return i582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i597 = data
  i596.triangles = i597[0]
  return i596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i603 = data
  i602.name = i603[0]
  var i605 = i603[1]
  var i604 = []
  for(var i = 0; i < i605.length; i += 1) {
    i604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i605[i + 0]) );
  }
  i602.frames = i604
  return i602
}

Deserializers["CharacterWalker"] = function (request, data, root) {
  var i606 = root || request.c( 'CharacterWalker' )
  var i607 = data
  i606.speed = i607[0]
  i606.speedMultiplier = i607[1]
  i606.turnSpeed = i607[2]
  i606.swingAngle = i607[3]
  i606.swingFreq = i607[4]
  i606.bobBody = !!i607[5]
  i606.externalControl = !!i607[6]
  i606.externalMoving = !!i607[7]
  return i606
}

Deserializers["ThirdPersonController"] = function (request, data, root) {
  var i608 = root || request.c( 'ThirdPersonController' )
  var i609 = data
  request.r(i609[0], i609[1], 0, i608, 'cam')
  request.r(i609[2], i609[3], 0, i608, 'joystick')
  i608.pivotHeight = i609[4]
  i608.camOffset = new pc.Vec3( i609[5], i609[6], i609[7] )
  i608.camOffsetPortrait = new pc.Vec3( i609[8], i609[9], i609[10] )
  i608.startPitch = i609[11]
  i608.moveSpeed = i609[12]
  i608.turnSpeed = i609[13]
  i608.lookSensitivity = i609[14]
  i608.stepHeight = i609[15]
  i608.maxDrop = i609[16]
  i608.bodyRadius = i609[17]
  i608.camMinDistance = i609[18]
  i608.camFollowSharpness = i609[19]
  i608.groundMask = UnityEngine.LayerMask.FromIntegerValue( i609[20] )
  i608.inputEnabled = !!i609[21]
  return i608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i611 = data
  i610.name = i611[0]
  i610.atlasId = i611[1]
  i610.mipmapCount = i611[2]
  i610.hdr = !!i611[3]
  i610.size = i611[4]
  i610.anisoLevel = i611[5]
  i610.filterMode = i611[6]
  var i613 = i611[7]
  var i612 = []
  for(var i = 0; i < i613.length; i += 4) {
    i612.push( UnityEngine.Rect.MinMaxRect(i613[i + 0], i613[i + 1], i613[i + 2], i613[i + 3]) );
  }
  i610.rects = i612
  i610.wrapU = i611[8]
  i610.wrapV = i611[9]
  return i610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i617 = data
  i616.name = i617[0]
  i616.index = i617[1]
  i616.startup = !!i617[2]
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i619 = data
  i618.aspect = i619[0]
  i618.orthographic = !!i619[1]
  i618.orthographicSize = i619[2]
  i618.backgroundColor = new pc.Color(i619[3], i619[4], i619[5], i619[6])
  i618.nearClipPlane = i619[7]
  i618.farClipPlane = i619[8]
  i618.fieldOfView = i619[9]
  i618.depth = i619[10]
  i618.clearFlags = i619[11]
  i618.cullingMask = i619[12]
  i618.rect = i619[13]
  request.r(i619[14], i619[15], 0, i618, 'targetTexture')
  i618.usePhysicalProperties = !!i619[16]
  i618.focalLength = i619[17]
  i618.sensorSize = new pc.Vec2( i619[18], i619[19] )
  i618.lensShift = new pc.Vec2( i619[20], i619[21] )
  i618.gateFit = i619[22]
  i618.commandBufferCount = i619[23]
  i618.cameraType = i619[24]
  i618.enabled = !!i619[25]
  return i618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i621 = data
  i620.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i621[0], i620.main)
  i620.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i621[1], i620.colorBySpeed)
  i620.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i621[2], i620.colorOverLifetime)
  i620.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i621[3], i620.emission)
  i620.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i621[4], i620.rotationBySpeed)
  i620.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i621[5], i620.rotationOverLifetime)
  i620.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i621[6], i620.shape)
  i620.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i621[7], i620.sizeBySpeed)
  i620.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i621[8], i620.sizeOverLifetime)
  i620.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i621[9], i620.textureSheetAnimation)
  i620.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i621[10], i620.velocityOverLifetime)
  i620.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i621[11], i620.noise)
  i620.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i621[12], i620.inheritVelocity)
  i620.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i621[13], i620.forceOverLifetime)
  i620.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i621[14], i620.limitVelocityOverLifetime)
  i620.useAutoRandomSeed = !!i621[15]
  i620.randomSeed = i621[16]
  return i620
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i622 = root || new pc.ParticleSystemMain()
  var i623 = data
  i622.duration = i623[0]
  i622.loop = !!i623[1]
  i622.prewarm = !!i623[2]
  i622.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[3], i622.startDelay)
  i622.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[4], i622.startLifetime)
  i622.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[5], i622.startSpeed)
  i622.startSize3D = !!i623[6]
  i622.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[7], i622.startSizeX)
  i622.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[8], i622.startSizeY)
  i622.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[9], i622.startSizeZ)
  i622.startRotation3D = !!i623[10]
  i622.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[11], i622.startRotationX)
  i622.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[12], i622.startRotationY)
  i622.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[13], i622.startRotationZ)
  i622.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i623[14], i622.startColor)
  i622.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i623[15], i622.gravityModifier)
  i622.simulationSpace = i623[16]
  request.r(i623[17], i623[18], 0, i622, 'customSimulationSpace')
  i622.simulationSpeed = i623[19]
  i622.useUnscaledTime = !!i623[20]
  i622.scalingMode = i623[21]
  i622.playOnAwake = !!i623[22]
  i622.maxParticles = i623[23]
  i622.emitterVelocityMode = i623[24]
  i622.stopAction = i623[25]
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i624 = root || new pc.MinMaxCurve()
  var i625 = data
  i624.mode = i625[0]
  i624.curveMin = new pc.AnimationCurve( { keys_flow: i625[1] } )
  i624.curveMax = new pc.AnimationCurve( { keys_flow: i625[2] } )
  i624.curveMultiplier = i625[3]
  i624.constantMin = i625[4]
  i624.constantMax = i625[5]
  return i624
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i626 = root || new pc.MinMaxGradient()
  var i627 = data
  i626.mode = i627[0]
  i626.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i627[1], i626.gradientMin)
  i626.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i627[2], i626.gradientMax)
  i626.colorMin = new pc.Color(i627[3], i627[4], i627[5], i627[6])
  i626.colorMax = new pc.Color(i627[7], i627[8], i627[9], i627[10])
  return i626
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i629 = data
  i628.mode = i629[0]
  var i631 = i629[1]
  var i630 = []
  for(var i = 0; i < i631.length; i += 1) {
    i630.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i631[i + 0]) );
  }
  i628.colorKeys = i630
  var i633 = i629[2]
  var i632 = []
  for(var i = 0; i < i633.length; i += 1) {
    i632.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i633[i + 0]) );
  }
  i628.alphaKeys = i632
  return i628
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i634 = root || new pc.ParticleSystemColorBySpeed()
  var i635 = data
  i634.enabled = !!i635[0]
  i634.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i635[1], i634.color)
  i634.range = new pc.Vec2( i635[2], i635[3] )
  return i634
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i638 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i639 = data
  i638.color = new pc.Color(i639[0], i639[1], i639[2], i639[3])
  i638.time = i639[4]
  return i638
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i643 = data
  i642.alpha = i643[0]
  i642.time = i643[1]
  return i642
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i644 = root || new pc.ParticleSystemColorOverLifetime()
  var i645 = data
  i644.enabled = !!i645[0]
  i644.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i645[1], i644.color)
  return i644
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i646 = root || new pc.ParticleSystemEmitter()
  var i647 = data
  i646.enabled = !!i647[0]
  i646.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i647[1], i646.rateOverTime)
  i646.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i647[2], i646.rateOverDistance)
  var i649 = i647[3]
  var i648 = []
  for(var i = 0; i < i649.length; i += 1) {
    i648.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i649[i + 0]) );
  }
  i646.bursts = i648
  return i646
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i652 = root || new pc.ParticleSystemBurst()
  var i653 = data
  i652.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i653[0], i652.count)
  i652.cycleCount = i653[1]
  i652.minCount = i653[2]
  i652.maxCount = i653[3]
  i652.repeatInterval = i653[4]
  i652.time = i653[5]
  return i652
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i654 = root || new pc.ParticleSystemRotationBySpeed()
  var i655 = data
  i654.enabled = !!i655[0]
  i654.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i655[1], i654.x)
  i654.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i655[2], i654.y)
  i654.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i655[3], i654.z)
  i654.separateAxes = !!i655[4]
  i654.range = new pc.Vec2( i655[5], i655[6] )
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i656 = root || new pc.ParticleSystemRotationOverLifetime()
  var i657 = data
  i656.enabled = !!i657[0]
  i656.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i657[1], i656.x)
  i656.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i657[2], i656.y)
  i656.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i657[3], i656.z)
  i656.separateAxes = !!i657[4]
  return i656
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i658 = root || new pc.ParticleSystemShape()
  var i659 = data
  i658.enabled = !!i659[0]
  i658.shapeType = i659[1]
  i658.randomDirectionAmount = i659[2]
  i658.sphericalDirectionAmount = i659[3]
  i658.randomPositionAmount = i659[4]
  i658.alignToDirection = !!i659[5]
  i658.radius = i659[6]
  i658.radiusMode = i659[7]
  i658.radiusSpread = i659[8]
  i658.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i659[9], i658.radiusSpeed)
  i658.radiusThickness = i659[10]
  i658.angle = i659[11]
  i658.length = i659[12]
  i658.boxThickness = new pc.Vec3( i659[13], i659[14], i659[15] )
  i658.meshShapeType = i659[16]
  request.r(i659[17], i659[18], 0, i658, 'mesh')
  request.r(i659[19], i659[20], 0, i658, 'meshRenderer')
  request.r(i659[21], i659[22], 0, i658, 'skinnedMeshRenderer')
  i658.useMeshMaterialIndex = !!i659[23]
  i658.meshMaterialIndex = i659[24]
  i658.useMeshColors = !!i659[25]
  i658.normalOffset = i659[26]
  i658.arc = i659[27]
  i658.arcMode = i659[28]
  i658.arcSpread = i659[29]
  i658.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i659[30], i658.arcSpeed)
  i658.donutRadius = i659[31]
  i658.position = new pc.Vec3( i659[32], i659[33], i659[34] )
  i658.rotation = new pc.Vec3( i659[35], i659[36], i659[37] )
  i658.scale = new pc.Vec3( i659[38], i659[39], i659[40] )
  return i658
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i660 = root || new pc.ParticleSystemSizeBySpeed()
  var i661 = data
  i660.enabled = !!i661[0]
  i660.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i661[1], i660.x)
  i660.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i661[2], i660.y)
  i660.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i661[3], i660.z)
  i660.separateAxes = !!i661[4]
  i660.range = new pc.Vec2( i661[5], i661[6] )
  return i660
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i662 = root || new pc.ParticleSystemSizeOverLifetime()
  var i663 = data
  i662.enabled = !!i663[0]
  i662.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[1], i662.x)
  i662.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[2], i662.y)
  i662.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[3], i662.z)
  i662.separateAxes = !!i663[4]
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i664 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i665 = data
  i664.enabled = !!i665[0]
  i664.mode = i665[1]
  i664.animation = i665[2]
  i664.numTilesX = i665[3]
  i664.numTilesY = i665[4]
  i664.useRandomRow = !!i665[5]
  i664.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[6], i664.frameOverTime)
  i664.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i665[7], i664.startFrame)
  i664.cycleCount = i665[8]
  i664.rowIndex = i665[9]
  i664.flipU = i665[10]
  i664.flipV = i665[11]
  i664.spriteCount = i665[12]
  var i667 = i665[13]
  var i666 = []
  for(var i = 0; i < i667.length; i += 2) {
  request.r(i667[i + 0], i667[i + 1], 2, i666, '')
  }
  i664.sprites = i666
  return i664
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i670 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i671 = data
  i670.enabled = !!i671[0]
  i670.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[1], i670.x)
  i670.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[2], i670.y)
  i670.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[3], i670.z)
  i670.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[4], i670.radial)
  i670.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[5], i670.speedModifier)
  i670.space = i671[6]
  i670.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[7], i670.orbitalX)
  i670.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[8], i670.orbitalY)
  i670.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[9], i670.orbitalZ)
  i670.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[10], i670.orbitalOffsetX)
  i670.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[11], i670.orbitalOffsetY)
  i670.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i671[12], i670.orbitalOffsetZ)
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i672 = root || new pc.ParticleSystemNoise()
  var i673 = data
  i672.enabled = !!i673[0]
  i672.separateAxes = !!i673[1]
  i672.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[2], i672.strengthX)
  i672.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[3], i672.strengthY)
  i672.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[4], i672.strengthZ)
  i672.frequency = i673[5]
  i672.damping = !!i673[6]
  i672.octaveCount = i673[7]
  i672.octaveMultiplier = i673[8]
  i672.octaveScale = i673[9]
  i672.quality = i673[10]
  i672.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[11], i672.scrollSpeed)
  i672.scrollSpeedMultiplier = i673[12]
  i672.remapEnabled = !!i673[13]
  i672.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[14], i672.remapX)
  i672.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[15], i672.remapY)
  i672.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[16], i672.remapZ)
  i672.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[17], i672.positionAmount)
  i672.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[18], i672.rotationAmount)
  i672.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i673[19], i672.sizeAmount)
  return i672
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i674 = root || new pc.ParticleSystemInheritVelocity()
  var i675 = data
  i674.enabled = !!i675[0]
  i674.mode = i675[1]
  i674.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i675[2], i674.curve)
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i676 = root || new pc.ParticleSystemForceOverLifetime()
  var i677 = data
  i676.enabled = !!i677[0]
  i676.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i677[1], i676.x)
  i676.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i677[2], i676.y)
  i676.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i677[3], i676.z)
  i676.space = i677[4]
  i676.randomized = !!i677[5]
  return i676
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i678 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i679 = data
  i678.enabled = !!i679[0]
  i678.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i679[1], i678.limit)
  i678.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i679[2], i678.limitX)
  i678.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i679[3], i678.limitY)
  i678.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i679[4], i678.limitZ)
  i678.dampen = i679[5]
  i678.separateAxes = !!i679[6]
  i678.space = i679[7]
  i678.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i679[8], i678.drag)
  i678.multiplyDragByParticleSize = !!i679[9]
  i678.multiplyDragByParticleVelocity = !!i679[10]
  return i678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i680 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i681 = data
  request.r(i681[0], i681[1], 0, i680, 'mesh')
  i680.meshCount = i681[2]
  i680.activeVertexStreamsCount = i681[3]
  i680.alignment = i681[4]
  i680.renderMode = i681[5]
  i680.sortMode = i681[6]
  i680.lengthScale = i681[7]
  i680.velocityScale = i681[8]
  i680.cameraVelocityScale = i681[9]
  i680.normalDirection = i681[10]
  i680.sortingFudge = i681[11]
  i680.minParticleSize = i681[12]
  i680.maxParticleSize = i681[13]
  i680.pivot = new pc.Vec3( i681[14], i681[15], i681[16] )
  request.r(i681[17], i681[18], 0, i680, 'trailMaterial')
  i680.applyActiveColorSpace = !!i681[19]
  i680.enabled = !!i681[20]
  request.r(i681[21], i681[22], 0, i680, 'sharedMaterial')
  var i683 = i681[23]
  var i682 = []
  for(var i = 0; i < i683.length; i += 2) {
  request.r(i683[i + 0], i683[i + 1], 2, i682, '')
  }
  i680.sharedMaterials = i682
  i680.receiveShadows = !!i681[24]
  i680.shadowCastingMode = i681[25]
  i680.sortingLayerID = i681[26]
  i680.sortingOrder = i681[27]
  i680.lightmapIndex = i681[28]
  i680.lightmapSceneIndex = i681[29]
  i680.lightmapScaleOffset = new pc.Vec4( i681[30], i681[31], i681[32], i681[33] )
  i680.lightProbeUsage = i681[34]
  i680.reflectionProbeUsage = i681[35]
  return i680
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i685 = data
  i684.type = i685[0]
  i684.color = new pc.Color(i685[1], i685[2], i685[3], i685[4])
  i684.cullingMask = i685[5]
  i684.intensity = i685[6]
  i684.range = i685[7]
  i684.spotAngle = i685[8]
  i684.shadows = i685[9]
  i684.shadowNormalBias = i685[10]
  i684.shadowBias = i685[11]
  i684.shadowStrength = i685[12]
  i684.shadowResolution = i685[13]
  i684.lightmapBakeType = i685[14]
  i684.renderMode = i685[15]
  request.r(i685[16], i685[17], 0, i684, 'cookie')
  i684.cookieSize = i685[18]
  i684.shadowNearPlane = i685[19]
  i684.occlusionMaskChannel = i685[20]
  i684.isBaked = !!i685[21]
  i684.mixedLightingMode = i685[22]
  i684.enabled = !!i685[23]
  return i684
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i686 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i687 = data
  i686.m_Version = i687[0]
  i686.m_UsePipelineSettings = !!i687[1]
  i686.m_AdditionalLightsShadowResolutionTier = i687[2]
  i686.m_LightLayerMask = i687[3]
  i686.m_RenderingLayers = i687[4]
  i686.m_CustomShadowLayers = !!i687[5]
  i686.m_ShadowLayerMask = i687[6]
  i686.m_ShadowRenderingLayers = i687[7]
  i686.m_LightCookieSize = new pc.Vec2( i687[8], i687[9] )
  i686.m_LightCookieOffset = new pc.Vec2( i687[10], i687[11] )
  i686.m_SoftShadowQuality = i687[12]
  return i686
}

Deserializers["PlayableConfig"] = function (request, data, root) {
  var i688 = root || request.c( 'PlayableConfig' )
  var i689 = data
  i688.chooseText = i689[0]
  i688.moveHintText = i689[1]
  i688.lookHintText = i689[2]
  i688.selectHintText = i689[3]
  i688.placeHintText = i689[4]
  i688.endText = i689[5]
  i688.ctaText = i689[6]
  i688.moveText = i689[7]
  i688.hideHintAfter = i689[8]
  i688.introDuration = i689[9]
  i688.placeCountToEnd = i689[10]
  i688.timeToStore = i689[11]
  i688.autoStoreOnEnd = !!i689[12]
  i688.brightness = i689[13]
  i688.bgmOn = !!i689[14]
  i688.bgmVolume = i689[15]
  i688.sfxOn = !!i689[16]
  i688.sfxVolume = i689[17]
  request.r(i689[18], i689[19], 0, i688, 'bgmClip')
  i688.npcCount = i689[20]
  i688.npcMinRadius = i689[21]
  i688.npcMaxRadius = i689[22]
  i688.npcSpeed = i689[23]
  return i688
}

Deserializers["GameFlow"] = function (request, data, root) {
  var i690 = root || request.c( 'GameFlow' )
  var i691 = data
  i690.state = i691[0]
  request.r(i691[1], i691[2], 0, i690, 'cam')
  request.r(i691[3], i691[4], 0, i690, 'intro')
  request.r(i691[5], i691[6], 0, i690, 'player')
  request.r(i691[7], i691[8], 0, i690, 'placer')
  request.r(i691[9], i691[10], 0, i690, 'trees')
  request.r(i691[11], i691[12], 0, i690, 'choiceUI')
  request.r(i691[13], i691[14], 0, i690, 'gameplayUI')
  request.r(i691[15], i691[16], 0, i690, 'tutorial')
  request.r(i691[17], i691[18], 0, i690, 'houseThumb')
  request.r(i691[19], i691[20], 0, i690, 'pinkThumb')
  request.r(i691[21], i691[22], 0, i690, 'blueThumb')
  request.r(i691[23], i691[24], 0, i690, 'cta')
  var i693 = i691[25]
  var i692 = []
  for(var i = 0; i < i693.length; i += 2) {
  request.r(i693[i + 0], i693[i + 1], 2, i692, '')
  }
  i690.npcs = i692
  request.r(i691[26], i691[27], 0, i690, 'bgm')
  request.r(i691[28], i691[29], 0, i690, 'flash')
  i690.overviewOffset = new pc.Vec3( i691[30], i691[31], i691[32] )
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i697 = data
  request.r(i697[0], i697[1], 0, i696, 'clip')
  request.r(i697[2], i697[3], 0, i696, 'outputAudioMixerGroup')
  i696.playOnAwake = !!i697[4]
  i696.loop = !!i697[5]
  i696.time = i697[6]
  i696.volume = i697[7]
  i696.pitch = i697[8]
  i696.enabled = !!i697[9]
  return i696
}

Deserializers["IntroSequence"] = function (request, data, root) {
  var i698 = root || request.c( 'IntroSequence' )
  var i699 = data
  request.r(i699[0], i699[1], 0, i698, 'hero')
  request.r(i699[2], i699[3], 0, i698, 'cameraPose')
  request.r(i699[4], i699[5], 0, i698, 'heroStart')
  i698.faceTime = i699[6]
  i698.turnTime = i699[7]
  i698.walkSpeedMultiplier = i699[8]
  i698.walkDistance = i699[9]
  return i698
}

Deserializers["TreeRecolor"] = function (request, data, root) {
  var i700 = root || request.c( 'TreeRecolor' )
  var i701 = data
  var i703 = i701[0]
  var i702 = []
  for(var i = 0; i < i703.length; i += 2) {
  request.r(i703[i + 0], i703[i + 1], 2, i702, '')
  }
  i700.leafRenderers = i702
  request.r(i701[1], i701[2], 0, i700, 'pinkLeaves')
  request.r(i701[3], i701[4], 0, i700, 'blueLeaves')
  request.r(i701[5], i701[6], 0, i700, 'burstFx')
  return i700
}

Deserializers["BlockPlacer"] = function (request, data, root) {
  var i706 = root || request.c( 'BlockPlacer' )
  var i707 = data
  request.r(i707[0], i707[1], 0, i706, 'cam')
  request.r(i707[2], i707[3], 0, i706, 'player')
  request.r(i707[4], i707[5], 0, i706, 'blocksRoot')
  request.r(i707[6], i707[7], 0, i706, 'preview')
  request.r(i707[8], i707[9], 0, i706, 'hotbar')
  var i709 = i707[10]
  var i708 = []
  for(var i = 0; i < i709.length; i += 1) {
    i708.push( request.d('BlockDef', i709[i + 0]) );
  }
  i706.pinkBlocks = i708
  var i711 = i707[11]
  var i710 = []
  for(var i = 0; i < i711.length; i += 1) {
    i710.push( request.d('BlockDef', i711[i + 0]) );
  }
  i706.blueBlocks = i710
  i706.reach = i707[12]
  i706.cell = i707[13]
  i706.gridOrigin = new pc.Vec3( i707[14], i707[15], i707[16] )
  i706.placeMask = UnityEngine.LayerMask.FromIntegerValue( i707[17] )
  request.r(i707[18], i707[19], 0, i706, 'sfx')
  request.r(i707[20], i707[21], 0, i706, 'placeFx')
  i706.inputEnabled = !!i707[22]
  return i706
}

Deserializers["BlockDef"] = function (request, data, root) {
  var i714 = root || request.c( 'BlockDef' )
  var i715 = data
  i714.name = i715[0]
  i714.displayName = i715[1]
  request.r(i715[2], i715[3], 0, i714, 'prefab')
  request.r(i715[4], i715[5], 0, i714, 'icon')
  i714.heightCells = i715[6]
  i714.lengthCells = i715[7]
  i714.faceCamera = !!i715[8]
  return i714
}

Deserializers["LunaController"] = function (request, data, root) {
  var i716 = root || request.c( 'LunaController' )
  var i717 = data
  i716.chooseText = i717[0]
  i716.placeCount = i717[1]
  i716.timeToStore = i717[2]
  request.r(i717[3], i717[4], 0, i716, 'bgm')
  request.r(i717[5], i717[6], 0, i716, 'pinkCardImage')
  request.r(i717[7], i717[8], 0, i716, 'blueCardImage')
  request.r(i717[9], i717[10], 0, i716, 'pinkCardTexture')
  request.r(i717[11], i717[12], 0, i716, 'blueCardTexture')
  request.r(i717[13], i717[14], 0, i716, 'pinkCardTextureTarget')
  request.r(i717[15], i717[16], 0, i716, 'blueCardTextureTarget')
  request.r(i717[17], i717[18], 0, i716, 'pinkCardTarget')
  request.r(i717[19], i717[20], 0, i716, 'blueCardTarget')
  return i716
}

Deserializers["Sfx"] = function (request, data, root) {
  var i718 = root || request.c( 'Sfx' )
  var i719 = data
  request.r(i719[0], i719[1], 0, i718, 'source')
  request.r(i719[2], i719[3], 0, i718, 'click')
  var i721 = i719[4]
  var i720 = []
  for(var i = 0; i < i721.length; i += 2) {
  request.r(i721[i + 0], i721[i + 1], 2, i720, '')
  }
  i718.place = i720
  request.r(i719[5], i719[6], 0, i718, 'extra')
  return i718
}

Deserializers["NpcWander"] = function (request, data, root) {
  var i724 = root || request.c( 'NpcWander' )
  var i725 = data
  request.r(i725[0], i725[1], 0, i724, 'player')
  request.r(i725[2], i725[3], 0, i724, 'view')
  i724.minRadius = i725[4]
  i724.maxRadius = i725[5]
  i724.coneAngle = i725[6]
  i724.minPlayerDist = i725[7]
  i724.minNpcDist = i725[8]
  i724.catchUpDist = i725[9]
  i724.waitMin = i725[10]
  i724.waitMax = i725[11]
  i724.groundY = i725[12]
  i724.groundMask = UnityEngine.LayerMask.FromIntegerValue( i725[13] )
  return i724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animation"] = function (request, data, root) {
  var i726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animation' )
  var i727 = data
  i726.playAutomatically = !!i727[0]
  request.r(i727[1], i727[2], 0, i726, 'clip')
  var i729 = i727[3]
  var i728 = []
  for(var i = 0; i < i729.length; i += 2) {
  request.r(i729[i + 0], i729[i + 1], 2, i728, '')
  }
  i726.clips = i728
  i726.wrapMode = i727[4]
  i726.enabled = !!i727[5]
  return i726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i732 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i733 = data
  i732.pivot = new pc.Vec2( i733[0], i733[1] )
  i732.anchorMin = new pc.Vec2( i733[2], i733[3] )
  i732.anchorMax = new pc.Vec2( i733[4], i733[5] )
  i732.sizeDelta = new pc.Vec2( i733[6], i733[7] )
  i732.anchoredPosition3D = new pc.Vec3( i733[8], i733[9], i733[10] )
  i732.rotation = new pc.Quat(i733[11], i733[12], i733[13], i733[14])
  i732.scale = new pc.Vec3( i733[15], i733[16], i733[17] )
  return i732
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i734 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i735 = data
  i734.planeDistance = i735[0]
  i734.referencePixelsPerUnit = i735[1]
  i734.isFallbackOverlay = !!i735[2]
  i734.renderMode = i735[3]
  i734.renderOrder = i735[4]
  i734.sortingLayerName = i735[5]
  i734.sortingOrder = i735[6]
  i734.scaleFactor = i735[7]
  request.r(i735[8], i735[9], 0, i734, 'worldCamera')
  i734.overrideSorting = !!i735[10]
  i734.pixelPerfect = !!i735[11]
  i734.targetDisplay = i735[12]
  i734.overridePixelPerfect = !!i735[13]
  i734.enabled = !!i735[14]
  return i734
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i736 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i737 = data
  i736.m_UiScaleMode = i737[0]
  i736.m_ReferencePixelsPerUnit = i737[1]
  i736.m_ScaleFactor = i737[2]
  i736.m_ReferenceResolution = new pc.Vec2( i737[3], i737[4] )
  i736.m_ScreenMatchMode = i737[5]
  i736.m_MatchWidthOrHeight = i737[6]
  i736.m_PhysicalUnit = i737[7]
  i736.m_FallbackScreenDPI = i737[8]
  i736.m_DefaultSpriteDPI = i737[9]
  i736.m_DynamicPixelsPerUnit = i737[10]
  i736.m_PresetInfoIsWorld = !!i737[11]
  return i736
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i738 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i739 = data
  i738.m_IgnoreReversedGraphics = !!i739[0]
  i738.m_BlockingObjects = i739[1]
  i738.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i739[2] )
  return i738
}

Deserializers["OrientationLayout"] = function (request, data, root) {
  var i740 = root || request.c( 'OrientationLayout' )
  var i741 = data
  var i743 = i741[0]
  var i742 = []
  for(var i = 0; i < i743.length; i += 1) {
    i742.push( request.d('OrientationLayout+Entry', i743[i + 0]) );
  }
  i740.entries = i742
  return i740
}

Deserializers["OrientationLayout+Entry"] = function (request, data, root) {
  var i746 = root || request.c( 'OrientationLayout+Entry' )
  var i747 = data
  request.r(i747[0], i747[1], 0, i746, 'target')
  i746.portraitPos = new pc.Vec2( i747[2], i747[3] )
  i746.landscapePos = new pc.Vec2( i747[4], i747[5] )
  i746.portraitScale = i747[6]
  i746.landscapeScale = i747[7]
  return i746
}

Deserializers["TutorialHud"] = function (request, data, root) {
  var i748 = root || request.c( 'TutorialHud' )
  var i749 = data
  request.r(i749[0], i749[1], 0, i748, 'placer')
  request.r(i749[2], i749[3], 0, i748, 'hotbar')
  request.r(i749[4], i749[5], 0, i748, 'player')
  request.r(i749[6], i749[7], 0, i748, 'joystick')
  request.r(i749[8], i749[9], 0, i748, 'placeButton')
  request.r(i749[10], i749[11], 0, i748, 'hand')
  request.r(i749[12], i749[13], 0, i748, 'hint')
  request.r(i749[14], i749[15], 0, i748, 'moveLabel')
  request.r(i749[16], i749[17], 0, i748, 'dim')
  request.r(i749[18], i749[19], 0, i748, 'tutorialLayer')
  i748.moveDistanceToPass = i749[20]
  i748.lookAngleToPass = i749[21]
  return i748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i751 = data
  i750.cullTransparentMesh = !!i751[0]
  return i750
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i752 = root || request.c( 'UnityEngine.UI.Image' )
  var i753 = data
  request.r(i753[0], i753[1], 0, i752, 'm_Sprite')
  i752.m_Type = i753[2]
  i752.m_PreserveAspect = !!i753[3]
  i752.m_FillCenter = !!i753[4]
  i752.m_FillMethod = i753[5]
  i752.m_FillAmount = i753[6]
  i752.m_FillClockwise = !!i753[7]
  i752.m_FillOrigin = i753[8]
  i752.m_UseSpriteMesh = !!i753[9]
  i752.m_PixelsPerUnitMultiplier = i753[10]
  request.r(i753[11], i753[12], 0, i752, 'm_Material')
  i752.m_Maskable = !!i753[13]
  i752.m_Color = new pc.Color(i753[14], i753[15], i753[16], i753[17])
  i752.m_RaycastTarget = !!i753[18]
  i752.m_RaycastPadding = new pc.Vec4( i753[19], i753[20], i753[21], i753[22] )
  return i752
}

Deserializers["TouchArea"] = function (request, data, root) {
  var i754 = root || request.c( 'TouchArea' )
  var i755 = data
  request.r(i755[0], i755[1], 0, i754, 'player')
  return i754
}

Deserializers["VirtualJoystick"] = function (request, data, root) {
  var i756 = root || request.c( 'VirtualJoystick' )
  var i757 = data
  request.r(i757[0], i757[1], 0, i756, 'background')
  request.r(i757[2], i757[3], 0, i756, 'knob')
  i756.radius = i757[4]
  return i756
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i758 = root || request.c( 'UnityEngine.UI.Text' )
  var i759 = data
  i758.m_FontData = request.d('UnityEngine.UI.FontData', i759[0], i758.m_FontData)
  i758.m_Text = i759[1]
  request.r(i759[2], i759[3], 0, i758, 'm_Material')
  i758.m_Maskable = !!i759[4]
  i758.m_Color = new pc.Color(i759[5], i759[6], i759[7], i759[8])
  i758.m_RaycastTarget = !!i759[9]
  i758.m_RaycastPadding = new pc.Vec4( i759[10], i759[11], i759[12], i759[13] )
  return i758
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i760 = root || request.c( 'UnityEngine.UI.FontData' )
  var i761 = data
  request.r(i761[0], i761[1], 0, i760, 'm_Font')
  i760.m_FontSize = i761[2]
  i760.m_FontStyle = i761[3]
  i760.m_BestFit = !!i761[4]
  i760.m_MinSize = i761[5]
  i760.m_MaxSize = i761[6]
  i760.m_Alignment = i761[7]
  i760.m_AlignByGeometry = !!i761[8]
  i760.m_RichText = !!i761[9]
  i760.m_HorizontalOverflow = i761[10]
  i760.m_VerticalOverflow = i761[11]
  i760.m_LineSpacing = i761[12]
  return i760
}

Deserializers["TextBorder"] = function (request, data, root) {
  var i762 = root || request.c( 'TextBorder' )
  var i763 = data
  i762.color = new pc.Color(i763[0], i763[1], i763[2], i763[3])
  i762.size = i763[4]
  i762.eightDirections = !!i763[5]
  return i762
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i764 = root || request.c( 'UnityEngine.UI.Button' )
  var i765 = data
  i764.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i765[0], i764.m_OnClick)
  i764.m_Navigation = request.d('UnityEngine.UI.Navigation', i765[1], i764.m_Navigation)
  i764.m_Transition = i765[2]
  i764.m_Colors = request.d('UnityEngine.UI.ColorBlock', i765[3], i764.m_Colors)
  i764.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i765[4], i764.m_SpriteState)
  i764.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i765[5], i764.m_AnimationTriggers)
  i764.m_Interactable = !!i765[6]
  request.r(i765[7], i765[8], 0, i764, 'm_TargetGraphic')
  return i764
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i766 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i767 = data
  i766.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i767[0], i766.m_PersistentCalls)
  return i766
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i768 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i769 = data
  var i771 = i769[0]
  var i770 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i771.length; i += 1) {
    i770.add(request.d('UnityEngine.Events.PersistentCall', i771[i + 0]));
  }
  i768.m_Calls = i770
  return i768
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i774 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i775 = data
  request.r(i775[0], i775[1], 0, i774, 'm_Target')
  i774.m_TargetAssemblyTypeName = i775[2]
  i774.m_MethodName = i775[3]
  i774.m_Mode = i775[4]
  i774.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i775[5], i774.m_Arguments)
  i774.m_CallState = i775[6]
  return i774
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i776 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i777 = data
  i776.m_Mode = i777[0]
  i776.m_WrapAround = !!i777[1]
  request.r(i777[2], i777[3], 0, i776, 'm_SelectOnUp')
  request.r(i777[4], i777[5], 0, i776, 'm_SelectOnDown')
  request.r(i777[6], i777[7], 0, i776, 'm_SelectOnLeft')
  request.r(i777[8], i777[9], 0, i776, 'm_SelectOnRight')
  return i776
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i778 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i779 = data
  i778.m_NormalColor = new pc.Color(i779[0], i779[1], i779[2], i779[3])
  i778.m_HighlightedColor = new pc.Color(i779[4], i779[5], i779[6], i779[7])
  i778.m_PressedColor = new pc.Color(i779[8], i779[9], i779[10], i779[11])
  i778.m_SelectedColor = new pc.Color(i779[12], i779[13], i779[14], i779[15])
  i778.m_DisabledColor = new pc.Color(i779[16], i779[17], i779[18], i779[19])
  i778.m_ColorMultiplier = i779[20]
  i778.m_FadeDuration = i779[21]
  return i778
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i780 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i781 = data
  request.r(i781[0], i781[1], 0, i780, 'm_HighlightedSprite')
  request.r(i781[2], i781[3], 0, i780, 'm_PressedSprite')
  request.r(i781[4], i781[5], 0, i780, 'm_SelectedSprite')
  request.r(i781[6], i781[7], 0, i780, 'm_DisabledSprite')
  return i780
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i782 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i783 = data
  i782.m_NormalTrigger = i783[0]
  i782.m_HighlightedTrigger = i783[1]
  i782.m_PressedTrigger = i783[2]
  i782.m_SelectedTrigger = i783[3]
  i782.m_DisabledTrigger = i783[4]
  return i782
}

Deserializers["PlaceButton"] = function (request, data, root) {
  var i784 = root || request.c( 'PlaceButton' )
  var i785 = data
  request.r(i785[0], i785[1], 0, i784, 'placer')
  request.r(i785[2], i785[3], 0, i784, 'ring')
  request.r(i785[4], i785[5], 0, i784, 'icon')
  request.r(i785[6], i785[7], 0, i784, 'button')
  i784.disabledColor = new pc.Color(i785[8], i785[9], i785[10], i785[11])
  i784.readyColor = new pc.Color(i785[12], i785[13], i785[14], i785[15])
  i784.validColor = new pc.Color(i785[16], i785[17], i785[18], i785[19])
  return i784
}

Deserializers["HotbarUI"] = function (request, data, root) {
  var i786 = root || request.c( 'HotbarUI' )
  var i787 = data
  var i789 = i787[0]
  var i788 = []
  for(var i = 0; i < i789.length; i += 2) {
  request.r(i789[i + 0], i789[i + 1], 2, i788, '')
  }
  i786.slotIcons = i788
  var i791 = i787[1]
  var i790 = []
  for(var i = 0; i < i791.length; i += 2) {
  request.r(i791[i + 0], i791[i + 1], 2, i790, '')
  }
  i786.slotButtons = i790
  request.r(i787[2], i787[3], 0, i786, 'selectFrame')
  request.r(i787[4], i787[5], 0, i786, 'itemName')
  i786.nameShowTime = i787[6]
  return i786
}

Deserializers["ColorChoiceUI"] = function (request, data, root) {
  var i796 = root || request.c( 'ColorChoiceUI' )
  var i797 = data
  request.r(i797[0], i797[1], 0, i796, 'title')
  request.r(i797[2], i797[3], 0, i796, 'titleBackdrop')
  request.r(i797[4], i797[5], 0, i796, 'pinkCard')
  request.r(i797[6], i797[7], 0, i796, 'blueCard')
  request.r(i797[8], i797[9], 0, i796, 'hand')
  i796.titleMaxFontSize = i797[10]
  i796.moveTime = i797[11]
  i796.pointTime = i797[12]
  return i796
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i798 = root || request.c( 'UnityEngine.UI.Mask' )
  var i799 = data
  i798.m_ShowMaskGraphic = !!i799[0]
  return i798
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i800 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i801 = data
  i800.m_AspectMode = i801[0]
  i800.m_AspectRatio = i801[1]
  return i800
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i802 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i803 = data
  request.r(i803[0], i803[1], 0, i802, 'm_Texture')
  i802.m_UVRect = UnityEngine.Rect.MinMaxRect(i803[2], i803[3], i803[4], i803[5])
  request.r(i803[6], i803[7], 0, i802, 'm_Material')
  i802.m_Maskable = !!i803[8]
  i802.m_Color = new pc.Color(i803[9], i803[10], i803[11], i803[12])
  i802.m_RaycastTarget = !!i803[13]
  i802.m_RaycastPadding = new pc.Vec4( i803[14], i803[15], i803[16], i803[17] )
  return i802
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i805 = data
  i804.m_Alpha = i805[0]
  i804.m_Interactable = !!i805[1]
  i804.m_BlocksRaycasts = !!i805[2]
  i804.m_IgnoreParentGroups = !!i805[3]
  i804.enabled = !!i805[4]
  return i804
}

Deserializers["CtaOverlay"] = function (request, data, root) {
  var i806 = root || request.c( 'CtaOverlay' )
  var i807 = data
  request.r(i807[0], i807[1], 0, i806, 'button')
  return i806
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i808 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i809 = data
  request.r(i809[0], i809[1], 0, i808, 'm_FirstSelected')
  i808.m_sendNavigationEvents = !!i809[2]
  i808.m_DragThreshold = i809[3]
  return i808
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i810 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i811 = data
  i810.m_HorizontalAxis = i811[0]
  i810.m_VerticalAxis = i811[1]
  i810.m_SubmitButton = i811[2]
  i810.m_CancelButton = i811[3]
  i810.m_InputActionsPerSecond = i811[4]
  i810.m_RepeatDelay = i811[5]
  i810.m_ForceModuleActive = !!i811[6]
  i810.m_SendPointerHoverToParent = !!i811[7]
  return i810
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i813 = data
  i812.ambientIntensity = i813[0]
  i812.reflectionIntensity = i813[1]
  i812.ambientMode = i813[2]
  i812.ambientLight = new pc.Color(i813[3], i813[4], i813[5], i813[6])
  i812.ambientSkyColor = new pc.Color(i813[7], i813[8], i813[9], i813[10])
  i812.ambientGroundColor = new pc.Color(i813[11], i813[12], i813[13], i813[14])
  i812.ambientEquatorColor = new pc.Color(i813[15], i813[16], i813[17], i813[18])
  i812.fogColor = new pc.Color(i813[19], i813[20], i813[21], i813[22])
  i812.fogEndDistance = i813[23]
  i812.fogStartDistance = i813[24]
  i812.fogDensity = i813[25]
  i812.fog = !!i813[26]
  request.r(i813[27], i813[28], 0, i812, 'skybox')
  i812.fogMode = i813[29]
  var i815 = i813[30]
  var i814 = []
  for(var i = 0; i < i815.length; i += 1) {
    i814.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i815[i + 0]) );
  }
  i812.lightmaps = i814
  i812.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i813[31], i812.lightProbes)
  i812.lightmapsMode = i813[32]
  i812.mixedBakeMode = i813[33]
  i812.environmentLightingMode = i813[34]
  i812.ambientProbe = new pc.SphericalHarmonicsL2(i813[35])
  request.r(i813[36], i813[37], 0, i812, 'customReflection')
  request.r(i813[38], i813[39], 0, i812, 'defaultReflection')
  i812.defaultReflectionMode = i813[40]
  i812.defaultReflectionResolution = i813[41]
  i812.sunLightObjectId = i813[42]
  i812.pixelLightCount = i813[43]
  i812.defaultReflectionHDR = !!i813[44]
  i812.hasLightDataAsset = !!i813[45]
  i812.hasManualGenerate = !!i813[46]
  return i812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i819 = data
  request.r(i819[0], i819[1], 0, i818, 'lightmapColor')
  request.r(i819[2], i819[3], 0, i818, 'lightmapDirection')
  request.r(i819[4], i819[5], 0, i818, 'shadowMask')
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i820 = root || new UnityEngine.LightProbes()
  var i821 = data
  return i820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset"] = function (request, data, root) {
  var i828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset' )
  var i829 = data
  i828.AdditionalLightsRenderingMode = i829[0]
  i828.LightRenderingMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode', i829[1], i828.LightRenderingMode)
  i828.MainLightRenderingModeValue = i829[2]
  i828.SupportsMainLightShadows = !!i829[3]
  i828.MixedLightingSupported = !!i829[4]
  i828.MainLightShadowmapResolutionValue = i829[5]
  i828.SupportsSoftShadows = !!i829[6]
  i828.SoftShadowQualityValue = i829[7]
  i828.ShadowDistance = i829[8]
  i828.ShadowCascadeCount = i829[9]
  i828.Cascade2Split = i829[10]
  i828.Cascade3Split = new pc.Vec2( i829[11], i829[12] )
  i828.Cascade4Split = new pc.Vec3( i829[13], i829[14], i829[15] )
  i828.CascadeBorder = i829[16]
  i828.ShadowDepthBias = i829[17]
  i828.ShadowNormalBias = i829[18]
  i828.RequireDepthTexture = !!i829[19]
  i828.RequireOpaqueTexture = !!i829[20]
  i828.scriptableRendererData = request.d('Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData', i829[21], i828.scriptableRendererData)
  return i828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode"] = function (request, data, root) {
  var i830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode' )
  var i831 = data
  i830.Disabled = i831[0]
  i830.PerVertex = i831[1]
  i830.PerPixel = i831[2]
  return i830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData"] = function (request, data, root) {
  var i832 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData' )
  var i833 = data
  i832.opaqueLayerMask = i833[0]
  i832.transparentLayerMask = i833[1]
  var i835 = i833[2]
  var i834 = []
  for(var i = 0; i < i835.length; i += 1) {
    i834.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects', i835[i + 0]) );
  }
  i832.RenderObjectsFeatures = i834
  i832.name = i833[3]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects"] = function (request, data, root) {
  var i838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects' )
  var i839 = data
  i838.settings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings', i839[0], i838.settings)
  i838.name = i839[1]
  i838.typeName = i839[2]
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i841 = data
  var i843 = i841[0]
  var i842 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i843.length; i += 1) {
    i842.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i843[i + 0]));
  }
  i840.ShaderCompilationErrors = i842
  i840.name = i841[1]
  i840.guid = i841[2]
  var i845 = i841[3]
  var i844 = []
  for(var i = 0; i < i845.length; i += 1) {
    i844.push( i845[i + 0] );
  }
  i840.shaderDefinedKeywords = i844
  var i847 = i841[4]
  var i846 = []
  for(var i = 0; i < i847.length; i += 1) {
    i846.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i847[i + 0]) );
  }
  i840.passes = i846
  var i849 = i841[5]
  var i848 = []
  for(var i = 0; i < i849.length; i += 1) {
    i848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i849[i + 0]) );
  }
  i840.usePasses = i848
  var i851 = i841[6]
  var i850 = []
  for(var i = 0; i < i851.length; i += 1) {
    i850.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i851[i + 0]) );
  }
  i840.defaultParameterValues = i850
  request.r(i841[7], i841[8], 0, i840, 'unityFallbackShader')
  i840.readDepth = !!i841[9]
  i840.hasDepthOnlyPass = !!i841[10]
  i840.isCreatedByShaderGraph = !!i841[11]
  i840.disableBatching = !!i841[12]
  i840.compiled = !!i841[13]
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i855 = data
  i854.shaderName = i855[0]
  i854.errorMessage = i855[1]
  return i854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i860 = root || new pc.UnityShaderPass()
  var i861 = data
  i860.id = i861[0]
  i860.subShaderIndex = i861[1]
  i860.name = i861[2]
  i860.passType = i861[3]
  i860.grabPassTextureName = i861[4]
  i860.usePass = !!i861[5]
  i860.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[6], i860.zTest)
  i860.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[7], i860.zWrite)
  i860.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[8], i860.culling)
  i860.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i861[9], i860.blending)
  i860.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i861[10], i860.alphaBlending)
  i860.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[11], i860.colorWriteMask)
  i860.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[12], i860.offsetUnits)
  i860.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[13], i860.offsetFactor)
  i860.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[14], i860.stencilRef)
  i860.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[15], i860.stencilReadMask)
  i860.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i861[16], i860.stencilWriteMask)
  i860.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i861[17], i860.stencilOp)
  i860.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i861[18], i860.stencilOpFront)
  i860.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i861[19], i860.stencilOpBack)
  var i863 = i861[20]
  var i862 = []
  for(var i = 0; i < i863.length; i += 1) {
    i862.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i863[i + 0]) );
  }
  i860.tags = i862
  var i865 = i861[21]
  var i864 = []
  for(var i = 0; i < i865.length; i += 1) {
    i864.push( i865[i + 0] );
  }
  i860.passDefinedKeywords = i864
  var i867 = i861[22]
  var i866 = []
  for(var i = 0; i < i867.length; i += 1) {
    i866.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i867[i + 0]) );
  }
  i860.passDefinedKeywordGroups = i866
  var i869 = i861[23]
  var i868 = []
  for(var i = 0; i < i869.length; i += 1) {
    i868.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i869[i + 0]) );
  }
  i860.variants = i868
  var i871 = i861[24]
  var i870 = []
  for(var i = 0; i < i871.length; i += 1) {
    i870.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i871[i + 0]) );
  }
  i860.excludedVariants = i870
  i860.hasDepthReader = !!i861[25]
  return i860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i873 = data
  i872.val = i873[0]
  i872.name = i873[1]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i875 = data
  i874.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i875[0], i874.src)
  i874.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i875[1], i874.dst)
  i874.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i875[2], i874.op)
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i877 = data
  i876.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i877[0], i876.pass)
  i876.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i877[1], i876.fail)
  i876.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i877[2], i876.zFail)
  i876.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i877[3], i876.comp)
  return i876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i881 = data
  i880.name = i881[0]
  i880.value = i881[1]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i884 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i885 = data
  var i887 = i885[0]
  var i886 = []
  for(var i = 0; i < i887.length; i += 1) {
    i886.push( i887[i + 0] );
  }
  i884.keywords = i886
  i884.hasDiscard = !!i885[1]
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i891 = data
  i890.passId = i891[0]
  i890.subShaderIndex = i891[1]
  var i893 = i891[2]
  var i892 = []
  for(var i = 0; i < i893.length; i += 1) {
    i892.push( i893[i + 0] );
  }
  i890.keywords = i892
  i890.vertexProgram = i891[3]
  i890.fragmentProgram = i891[4]
  i890.exportedForWebGl2 = !!i891[5]
  i890.readDepth = !!i891[6]
  return i890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i896 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i897 = data
  request.r(i897[0], i897[1], 0, i896, 'shader')
  i896.pass = i897[2]
  return i896
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i900 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i901 = data
  i900.name = i901[0]
  i900.type = i901[1]
  i900.value = new pc.Vec4( i901[2], i901[3], i901[4], i901[5] )
  i900.textureValue = i901[6]
  i900.shaderPropertyFlag = i901[7]
  return i900
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i903 = data
  i902.name = i903[0]
  request.r(i903[1], i903[2], 0, i902, 'texture')
  i902.aabb = i903[3]
  i902.vertices = i903[4]
  i902.triangles = i903[5]
  i902.textureRect = UnityEngine.Rect.MinMaxRect(i903[6], i903[7], i903[8], i903[9])
  i902.packedRect = UnityEngine.Rect.MinMaxRect(i903[10], i903[11], i903[12], i903[13])
  i902.border = new pc.Vec4( i903[14], i903[15], i903[16], i903[17] )
  i902.transparency = i903[18]
  i902.bounds = i903[19]
  i902.pixelsPerUnit = i903[20]
  i902.textureWidth = i903[21]
  i902.textureHeight = i903[22]
  i902.nativeSize = new pc.Vec2( i903[23], i903[24] )
  i902.pivot = new pc.Vec2( i903[25], i903[26] )
  i902.textureRectOffset = new pc.Vec2( i903[27], i903[28] )
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i905 = data
  i904.name = i905[0]
  return i904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i907 = data
  i906.name = i907[0]
  i906.wrapMode = i907[1]
  i906.isLooping = !!i907[2]
  i906.length = i907[3]
  var i909 = i907[4]
  var i908 = []
  for(var i = 0; i < i909.length; i += 1) {
    i908.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i909[i + 0]) );
  }
  i906.curves = i908
  var i911 = i907[5]
  var i910 = []
  for(var i = 0; i < i911.length; i += 1) {
    i910.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i911[i + 0]) );
  }
  i906.events = i910
  i906.halfPrecision = !!i907[6]
  i906._frameRate = i907[7]
  i906.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i907[8], i906.localBounds)
  i906.hasMuscleCurves = !!i907[9]
  var i913 = i907[10]
  var i912 = []
  for(var i = 0; i < i913.length; i += 1) {
    i912.push( i913[i + 0] );
  }
  i906.clipMuscleConstant = i912
  i906.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i907[11], i906.clipBindingConstant)
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i916 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i917 = data
  i916.path = i917[0]
  i916.hash = i917[1]
  i916.componentType = i917[2]
  i916.property = i917[3]
  i916.keys = i917[4]
  var i919 = i917[5]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i919[i + 0]) );
  }
  i916.objectReferenceKeys = i918
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i923 = data
  i922.time = i923[0]
  request.r(i923[1], i923[2], 0, i922, 'value')
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i927 = data
  i926.functionName = i927[0]
  i926.floatParameter = i927[1]
  i926.intParameter = i927[2]
  i926.stringParameter = i927[3]
  request.r(i927[4], i927[5], 0, i926, 'objectReferenceParameter')
  i926.time = i927[6]
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i929 = data
  i928.center = new pc.Vec3( i929[0], i929[1], i929[2] )
  i928.extends = new pc.Vec3( i929[3], i929[4], i929[5] )
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i933 = data
  var i935 = i933[0]
  var i934 = []
  for(var i = 0; i < i935.length; i += 1) {
    i934.push( i935[i + 0] );
  }
  i932.genericBindings = i934
  var i937 = i933[1]
  var i936 = []
  for(var i = 0; i < i937.length; i += 1) {
    i936.push( i937[i + 0] );
  }
  i932.pptrCurveMapping = i936
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i939 = data
  i938.name = i939[0]
  i938.ascent = i939[1]
  i938.originalLineHeight = i939[2]
  i938.fontSize = i939[3]
  var i941 = i939[4]
  var i940 = []
  for(var i = 0; i < i941.length; i += 1) {
    i940.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i941[i + 0]) );
  }
  i938.characterInfo = i940
  request.r(i939[5], i939[6], 0, i938, 'texture')
  i938.originalFontSize = i939[7]
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i945 = data
  i944.index = i945[0]
  i944.advance = i945[1]
  i944.bearing = i945[2]
  i944.glyphWidth = i945[3]
  i944.glyphHeight = i945[4]
  i944.minX = i945[5]
  i944.maxX = i945[6]
  i944.minY = i945[7]
  i944.maxY = i945[8]
  i944.uvBottomLeftX = i945[9]
  i944.uvBottomLeftY = i945[10]
  i944.uvBottomRightX = i945[11]
  i944.uvBottomRightY = i945[12]
  i944.uvTopLeftX = i945[13]
  i944.uvTopLeftY = i945[14]
  i944.uvTopRightX = i945[15]
  i944.uvTopRightY = i945[16]
  return i944
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i947 = data
  var i949 = i947[0]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i949[i + 0]) );
  }
  i946.files = i948
  i946.componentToPrefabIds = i947[1]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i953 = data
  i952.path = i953[0]
  request.r(i953[1], i953[2], 0, i952, 'unityObject')
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i955 = data
  var i957 = i955[0]
  var i956 = []
  for(var i = 0; i < i957.length; i += 1) {
    i956.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i957[i + 0]) );
  }
  i954.scriptsExecutionOrder = i956
  var i959 = i955[1]
  var i958 = []
  for(var i = 0; i < i959.length; i += 1) {
    i958.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i959[i + 0]) );
  }
  i954.sortingLayers = i958
  var i961 = i955[2]
  var i960 = []
  for(var i = 0; i < i961.length; i += 1) {
    i960.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i961[i + 0]) );
  }
  i954.cullingLayers = i960
  i954.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i955[3], i954.timeSettings)
  i954.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i955[4], i954.physicsSettings)
  i954.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i955[5], i954.physics2DSettings)
  i954.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i955[6], i954.qualitySettings)
  i954.enableRealtimeShadows = !!i955[7]
  i954.enableAutoInstancing = !!i955[8]
  i954.enableStaticBatching = !!i955[9]
  i954.enableDynamicBatching = !!i955[10]
  i954.usePreservativeDynamicBatching = !!i955[11]
  i954.lightmapEncodingQuality = i955[12]
  i954.desiredColorSpace = i955[13]
  var i963 = i955[14]
  var i962 = []
  for(var i = 0; i < i963.length; i += 1) {
    i962.push( i963[i + 0] );
  }
  i954.allTags = i962
  return i954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i966 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i967 = data
  i966.name = i967[0]
  i966.value = i967[1]
  return i966
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i970 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i971 = data
  i970.id = i971[0]
  i970.name = i971[1]
  i970.value = i971[2]
  return i970
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i975 = data
  i974.id = i975[0]
  i974.name = i975[1]
  return i974
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i976 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i977 = data
  i976.fixedDeltaTime = i977[0]
  i976.maximumDeltaTime = i977[1]
  i976.timeScale = i977[2]
  i976.maximumParticleTimestep = i977[3]
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i979 = data
  i978.gravity = new pc.Vec3( i979[0], i979[1], i979[2] )
  i978.defaultSolverIterations = i979[3]
  i978.bounceThreshold = i979[4]
  i978.autoSyncTransforms = !!i979[5]
  i978.autoSimulation = !!i979[6]
  var i981 = i979[7]
  var i980 = []
  for(var i = 0; i < i981.length; i += 1) {
    i980.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i981[i + 0]) );
  }
  i978.collisionMatrix = i980
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i985 = data
  i984.enabled = !!i985[0]
  i984.layerId = i985[1]
  i984.otherLayerId = i985[2]
  return i984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i986 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i987 = data
  request.r(i987[0], i987[1], 0, i986, 'material')
  i986.gravity = new pc.Vec2( i987[2], i987[3] )
  i986.positionIterations = i987[4]
  i986.velocityIterations = i987[5]
  i986.velocityThreshold = i987[6]
  i986.maxLinearCorrection = i987[7]
  i986.maxAngularCorrection = i987[8]
  i986.maxTranslationSpeed = i987[9]
  i986.maxRotationSpeed = i987[10]
  i986.baumgarteScale = i987[11]
  i986.baumgarteTOIScale = i987[12]
  i986.timeToSleep = i987[13]
  i986.linearSleepTolerance = i987[14]
  i986.angularSleepTolerance = i987[15]
  i986.defaultContactOffset = i987[16]
  i986.autoSimulation = !!i987[17]
  i986.queriesHitTriggers = !!i987[18]
  i986.queriesStartInColliders = !!i987[19]
  i986.callbacksOnDisable = !!i987[20]
  i986.reuseCollisionCallbacks = !!i987[21]
  i986.autoSyncTransforms = !!i987[22]
  var i989 = i987[23]
  var i988 = []
  for(var i = 0; i < i989.length; i += 1) {
    i988.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i989[i + 0]) );
  }
  i986.collisionMatrix = i988
  return i986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i993 = data
  i992.enabled = !!i993[0]
  i992.layerId = i993[1]
  i992.otherLayerId = i993[2]
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i995 = data
  var i997 = i995[0]
  var i996 = []
  for(var i = 0; i < i997.length; i += 1) {
    i996.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i997[i + 0]) );
  }
  i994.qualityLevels = i996
  var i999 = i995[1]
  var i998 = []
  for(var i = 0; i < i999.length; i += 1) {
    i998.push( i999[i + 0] );
  }
  i994.names = i998
  i994.shadows = i995[2]
  i994.anisotropicFiltering = i995[3]
  i994.antiAliasing = i995[4]
  i994.lodBias = i995[5]
  i994.shadowCascades = i995[6]
  i994.shadowDistance = i995[7]
  i994.shadowmaskMode = i995[8]
  i994.shadowProjection = i995[9]
  i994.shadowResolution = i995[10]
  i994.softParticles = !!i995[11]
  i994.softVegetation = !!i995[12]
  i994.activeColorSpace = i995[13]
  i994.desiredColorSpace = i995[14]
  i994.masterTextureLimit = i995[15]
  i994.maxQueuedFrames = i995[16]
  i994.particleRaycastBudget = i995[17]
  i994.pixelLightCount = i995[18]
  i994.realtimeReflectionProbes = !!i995[19]
  i994.shadowCascade2Split = i995[20]
  i994.shadowCascade4Split = new pc.Vec3( i995[21], i995[22], i995[23] )
  i994.streamingMipmapsActive = !!i995[24]
  i994.vSyncCount = i995[25]
  i994.asyncUploadBufferSize = i995[26]
  i994.asyncUploadTimeSlice = i995[27]
  i994.billboardsFaceCameraPosition = !!i995[28]
  i994.shadowNearPlaneOffset = i995[29]
  i994.streamingMipmapsMemoryBudget = i995[30]
  i994.maximumLODLevel = i995[31]
  i994.streamingMipmapsAddAllCameras = !!i995[32]
  i994.streamingMipmapsMaxLevelReduction = i995[33]
  i994.streamingMipmapsRenderersPerFrame = i995[34]
  i994.resolutionScalingFixedDPIFactor = i995[35]
  i994.streamingMipmapsMaxFileIORequests = i995[36]
  i994.currentQualityLevel = i995[37]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1005 = data
  i1004.weight = i1005[0]
  i1004.vertices = i1005[1]
  i1004.normals = i1005[2]
  i1004.tangents = i1005[3]
  return i1004
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1006 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1007 = data
  request.r(i1007[0], i1007[1], 0, i1006, 'm_ObjectArgument')
  i1006.m_ObjectArgumentAssemblyTypeName = i1007[2]
  i1006.m_IntArgument = i1007[3]
  i1006.m_FloatArgument = i1007[4]
  i1006.m_StringArgument = i1007[5]
  i1006.m_BoolArgument = !!i1007[6]
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings"] = function (request, data, root) {
  var i1008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings' )
  var i1009 = data
  i1008.Event = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1009[0], i1008.Event)
  i1008.filterSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings', i1009[1], i1008.filterSettings)
  i1008.overrideMaterialId = i1009[2]
  i1008.overrideMaterialPassIndex = i1009[3]
  i1008.overrideShaderId = i1009[4]
  i1008.overrideShaderPassIndex = i1009[5]
  i1008.overrideMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1009[6], i1008.overrideMode)
  i1008.overrideDepthState = !!i1009[7]
  i1008.depthCompareFunction = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1009[8], i1008.depthCompareFunction)
  i1008.enableWrite = !!i1009[9]
  i1008.stencilSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.StencilStateData', i1009[10], i1008.stencilSettings)
  i1008.cameraSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings', i1009[11], i1008.cameraSettings)
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.EnumDescription"] = function (request, data, root) {
  var i1010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.EnumDescription' )
  var i1011 = data
  i1010.Value = i1011[0]
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings"] = function (request, data, root) {
  var i1012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings' )
  var i1013 = data
  i1012.RenderQueueType = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1013[0], i1012.RenderQueueType)
  i1012.LayerMask = i1013[1]
  var i1015 = i1013[2]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 1) {
    i1014.push( i1015[i + 0] );
  }
  i1012.PassNames = i1014
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.StencilStateData"] = function (request, data, root) {
  var i1016 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.StencilStateData' )
  var i1017 = data
  i1016.overrideStencilState = !!i1017[0]
  i1016.stencilReference = i1017[1]
  i1016.stencilCompareFunctionValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1017[2], i1016.stencilCompareFunctionValue)
  i1016.passOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1017[3], i1016.passOperationValue)
  i1016.failOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1017[4], i1016.failOperationValue)
  i1016.zFailOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1017[5], i1016.zFailOperationValue)
  return i1016
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings"] = function (request, data, root) {
  var i1018 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings' )
  var i1019 = data
  i1018.overrideCamera = !!i1019[0]
  i1018.restoreCamera = !!i1019[1]
  i1018.offset = new pc.Vec4( i1019[2], i1019[3], i1019[4], i1019[5] )
  i1018.cameraFieldOfView = i1019[6]
  return i1018
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.Animation":{"playAutomatically":0,"clip":1,"clips":3,"wrapMode":4,"enabled":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset":{"AdditionalLightsRenderingMode":0,"LightRenderingMode":1,"MainLightRenderingModeValue":2,"SupportsMainLightShadows":3,"MixedLightingSupported":4,"MainLightShadowmapResolutionValue":5,"SupportsSoftShadows":6,"SoftShadowQualityValue":7,"ShadowDistance":8,"ShadowCascadeCount":9,"Cascade2Split":10,"Cascade3Split":11,"Cascade4Split":13,"CascadeBorder":16,"ShadowDepthBias":17,"ShadowNormalBias":18,"RequireDepthTexture":19,"RequireOpaqueTexture":20,"scriptableRendererData":21},"Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode":{"Disabled":0,"PerVertex":1,"PerPixel":2},"Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData":{"opaqueLayerMask":0,"transparentLayerMask":1,"RenderObjectsFeatures":2,"name":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects":{"settings":0,"name":1,"typeName":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings":{"Event":0,"filterSettings":1,"overrideMaterialId":2,"overrideMaterialPassIndex":3,"overrideShaderId":4,"overrideShaderPassIndex":5,"overrideMode":6,"overrideDepthState":7,"depthCompareFunction":8,"enableWrite":9,"stencilSettings":10,"cameraSettings":11},"Luna.Unity.DTO.UnityEngine.Assets.EnumDescription":{"Value":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings":{"RenderQueueType":0,"LayerMask":1,"PassNames":2},"Luna.Unity.DTO.UnityEngine.Assets.StencilStateData":{"overrideStencilState":0,"stencilReference":1,"stencilCompareFunctionValue":2,"passOperationValue":3,"failOperationValue":4,"zFailOperationValue":5},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings":{"overrideCamera":0,"restoreCamera":1,"offset":2,"cameraFieldOfView":6}}

Deserializers.requiredComponents = {"58":[59],"60":[59],"61":[59],"62":[59],"63":[59],"64":[59],"65":[66],"67":[12],"68":[69],"70":[69],"71":[69],"72":[69],"73":[69],"74":[69],"75":[76],"77":[76],"78":[76],"79":[76],"80":[76],"81":[76],"82":[76],"83":[76],"84":[76],"85":[76],"86":[76],"87":[76],"88":[76],"89":[12],"90":[5],"91":[92],"93":[92],"42":[41],"35":[20],"38":[10],"51":[47],"11":[10],"94":[41],"95":[12],"96":[12],"19":[18],"97":[41],"98":[48,41],"99":[5],"100":[48,41],"101":[41],"102":[41],"103":[5,41],"104":[41,48],"105":[106],"107":[106],"108":[106],"109":[52],"110":[41],"111":[41],"45":[42],"29":[48,41],"55":[41],"44":[42],"112":[41],"113":[41],"114":[41],"115":[41],"116":[41],"117":[41],"118":[41],"54":[41],"119":[41],"36":[48,41],"120":[41],"121":[41],"122":[41],"123":[41],"47":[48,41],"124":[41],"125":[56],"126":[56],"57":[56],"127":[56],"128":[12],"129":[12]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.MeshCollider","UnityEngine.BoxCollider","UnityEngine.MonoBehaviour","CharacterWalker","ThirdPersonController","UnityEngine.Camera","VirtualJoystick","UnityEngine.Cubemap","UnityEngine.AudioListener","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","PlayableConfig","UnityEngine.AudioClip","GameFlow","IntroSequence","BlockPlacer","TreeRecolor","ColorChoiceUI","UnityEngine.GameObject","TutorialHud","UnityEngine.UI.Image","UnityEngine.Sprite","CtaOverlay","UnityEngine.AudioSource","UnityEngine.CanvasGroup","HotbarUI","LunaController","UnityEngine.UI.RawImage","Sfx","NpcWander","UnityEngine.Animation","UnityEngine.AnimationClip","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","OrientationLayout","UnityEngine.UI.Text","UnityEngine.CanvasRenderer","TouchArea","UnityEngine.Font","TextBorder","UnityEngine.UI.Button","PlaceButton","UnityEngine.UI.Mask","UnityEngine.UI.AspectRatioFitter","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Rendering.UI.UIFoldout","UnityEngine.Rendering.Universal.PixelPerfectCamera","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.Purchasing.IAPButton","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CBBW2_V28";

Deserializers.lunaInitializationTime = "10/23/2026 08:55:09";

Deserializers.lunaDaysRunning = "3.8";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1746";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3530";

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

Deserializers.buildID = "212673af-3bba-4d32-b513-93655b347df4";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["Unity","Burst","BurstCompiler","ResetStaticsOnLoad"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Unity","Services","Core","Editor","StatusInitializer","InitializeOnLoad"],["Ua2CoreInitializeCallback","Register"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"],["GLTFast","Export","ImageExport","ResetStaticsOnLoad"],["GLTFast","Export","MaterialExport","ResetStaticsOnLoad"],["GLTFast","Export","NormalImageExport","ResetStaticsOnLoad"],["GLTFast","Export","MetaMaterialExportBuiltIn","ResetStaticsOnLoad"],["GLTFast","Export","OrmImageExport","ResetStaticsOnLoad"],["GLTFast","RenderPipelineUtils","ResetStaticsOnLoad"],["GLTFast","Jobs","CachedFunction","ResetStaticsOnLoad"],["GLTFast","GltfImport","ResetStaticsOnLoad"],["GLTFast","Materials","MaterialGenerator","ResetStaticsOnLoad"],["GLTFast","Materials","UniversalRPMaterialGenerator","ResetStaticsOnLoad"],["GLTFast","Addons","ImportAddonRegistry","ResetStaticsOnLoad"],["GLTFast","Materials","ShaderGraphMaterialGenerator","ResetStaticsOnLoad"],["GLTFast","GltfImportBase","ResetStaticsOnLoad"],["GLTFast","Materials","BuiltInMaterialGenerator","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

