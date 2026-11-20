var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i5638 = root || request.c( 'UnityEngine.JointSpring' )
  var i5639 = data
  i5638.spring = i5639[0]
  i5638.damper = i5639[1]
  i5638.targetPosition = i5639[2]
  return i5638
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i5640 = root || request.c( 'UnityEngine.JointMotor' )
  var i5641 = data
  i5640.m_TargetVelocity = i5641[0]
  i5640.m_Force = i5641[1]
  i5640.m_FreeSpin = i5641[2]
  return i5640
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i5642 = root || request.c( 'UnityEngine.JointLimits' )
  var i5643 = data
  i5642.m_Min = i5643[0]
  i5642.m_Max = i5643[1]
  i5642.m_Bounciness = i5643[2]
  i5642.m_BounceMinVelocity = i5643[3]
  i5642.m_ContactDistance = i5643[4]
  i5642.minBounce = i5643[5]
  i5642.maxBounce = i5643[6]
  return i5642
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i5644 = root || request.c( 'UnityEngine.JointDrive' )
  var i5645 = data
  i5644.m_PositionSpring = i5645[0]
  i5644.m_PositionDamper = i5645[1]
  i5644.m_MaximumForce = i5645[2]
  i5644.m_UseAcceleration = i5645[3]
  return i5644
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i5646 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i5647 = data
  i5646.m_Spring = i5647[0]
  i5646.m_Damper = i5647[1]
  return i5646
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i5648 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i5649 = data
  i5648.m_Limit = i5649[0]
  i5648.m_Bounciness = i5649[1]
  i5648.m_ContactDistance = i5649[2]
  return i5648
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i5650 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i5651 = data
  i5650.m_ExtremumSlip = i5651[0]
  i5650.m_ExtremumValue = i5651[1]
  i5650.m_AsymptoteSlip = i5651[2]
  i5650.m_AsymptoteValue = i5651[3]
  i5650.m_Stiffness = i5651[4]
  return i5650
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i5652 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i5653 = data
  i5652.m_LowerAngle = i5653[0]
  i5652.m_UpperAngle = i5653[1]
  return i5652
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i5654 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i5655 = data
  i5654.m_MotorSpeed = i5655[0]
  i5654.m_MaximumMotorTorque = i5655[1]
  return i5654
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i5656 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i5657 = data
  i5656.m_DampingRatio = i5657[0]
  i5656.m_Frequency = i5657[1]
  i5656.m_Angle = i5657[2]
  return i5656
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i5658 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i5659 = data
  i5658.m_LowerTranslation = i5659[0]
  i5658.m_UpperTranslation = i5659[1]
  return i5658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i5660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i5661 = data
  i5660.name = i5661[0]
  i5660.halfPrecision = !!i5661[1]
  i5660.useSimplification = !!i5661[2]
  i5660.useUInt32IndexFormat = !!i5661[3]
  i5660.vertexCount = i5661[4]
  i5660.aabb = i5661[5]
  var i5663 = i5661[6]
  var i5662 = []
  for(var i = 0; i < i5663.length; i += 1) {
    i5662.push( !!i5663[i + 0] );
  }
  i5660.streams = i5662
  i5660.vertices = i5661[7]
  var i5665 = i5661[8]
  var i5664 = []
  for(var i = 0; i < i5665.length; i += 1) {
    i5664.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i5665[i + 0]) );
  }
  i5660.subMeshes = i5664
  var i5667 = i5661[9]
  var i5666 = []
  for(var i = 0; i < i5667.length; i += 16) {
    i5666.push( new pc.Mat4().setData(i5667[i + 0], i5667[i + 1], i5667[i + 2], i5667[i + 3],  i5667[i + 4], i5667[i + 5], i5667[i + 6], i5667[i + 7],  i5667[i + 8], i5667[i + 9], i5667[i + 10], i5667[i + 11],  i5667[i + 12], i5667[i + 13], i5667[i + 14], i5667[i + 15]) );
  }
  i5660.bindposes = i5666
  var i5669 = i5661[10]
  var i5668 = []
  for(var i = 0; i < i5669.length; i += 1) {
    i5668.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i5669[i + 0]) );
  }
  i5660.blendShapes = i5668
  return i5660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i5674 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i5675 = data
  i5674.triangles = i5675[0]
  return i5674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i5680 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i5681 = data
  i5680.name = i5681[0]
  var i5683 = i5681[1]
  var i5682 = []
  for(var i = 0; i < i5683.length; i += 1) {
    i5682.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i5683[i + 0]) );
  }
  i5680.frames = i5682
  return i5680
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i5684 = root || new pc.UnityMaterial()
  var i5685 = data
  i5684.name = i5685[0]
  request.r(i5685[1], i5685[2], 0, i5684, 'shader')
  i5684.renderQueue = i5685[3]
  i5684.enableInstancing = !!i5685[4]
  var i5687 = i5685[5]
  var i5686 = []
  for(var i = 0; i < i5687.length; i += 1) {
    i5686.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i5687[i + 0]) );
  }
  i5684.floatParameters = i5686
  var i5689 = i5685[6]
  var i5688 = []
  for(var i = 0; i < i5689.length; i += 1) {
    i5688.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i5689[i + 0]) );
  }
  i5684.colorParameters = i5688
  var i5691 = i5685[7]
  var i5690 = []
  for(var i = 0; i < i5691.length; i += 1) {
    i5690.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i5691[i + 0]) );
  }
  i5684.vectorParameters = i5690
  var i5693 = i5685[8]
  var i5692 = []
  for(var i = 0; i < i5693.length; i += 1) {
    i5692.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i5693[i + 0]) );
  }
  i5684.textureParameters = i5692
  var i5695 = i5685[9]
  var i5694 = []
  for(var i = 0; i < i5695.length; i += 1) {
    i5694.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i5695[i + 0]) );
  }
  i5684.materialFlags = i5694
  return i5684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i5698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i5699 = data
  i5698.name = i5699[0]
  i5698.value = i5699[1]
  return i5698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i5702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i5703 = data
  i5702.name = i5703[0]
  i5702.value = new pc.Color(i5703[1], i5703[2], i5703[3], i5703[4])
  return i5702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i5706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i5707 = data
  i5706.name = i5707[0]
  i5706.value = new pc.Vec4( i5707[1], i5707[2], i5707[3], i5707[4] )
  return i5706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i5710 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i5711 = data
  i5710.name = i5711[0]
  request.r(i5711[1], i5711[2], 0, i5710, 'value')
  return i5710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i5714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i5715 = data
  i5714.name = i5715[0]
  i5714.enabled = !!i5715[1]
  return i5714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i5716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i5717 = data
  i5716.name = i5717[0]
  i5716.width = i5717[1]
  i5716.height = i5717[2]
  i5716.mipmapCount = i5717[3]
  i5716.anisoLevel = i5717[4]
  i5716.filterMode = i5717[5]
  i5716.hdr = !!i5717[6]
  i5716.format = i5717[7]
  i5716.wrapMode = i5717[8]
  i5716.alphaIsTransparency = !!i5717[9]
  i5716.alphaSource = i5717[10]
  i5716.graphicsFormat = i5717[11]
  i5716.sRGBTexture = !!i5717[12]
  i5716.desiredColorSpace = i5717[13]
  i5716.wrapU = i5717[14]
  i5716.wrapV = i5717[15]
  return i5716
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i5718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i5719 = data
  i5718.name = i5719[0]
  i5718.atlasId = i5719[1]
  i5718.mipmapCount = i5719[2]
  i5718.hdr = !!i5719[3]
  i5718.size = i5719[4]
  i5718.anisoLevel = i5719[5]
  i5718.filterMode = i5719[6]
  var i5721 = i5719[7]
  var i5720 = []
  for(var i = 0; i < i5721.length; i += 4) {
    i5720.push( UnityEngine.Rect.MinMaxRect(i5721[i + 0], i5721[i + 1], i5721[i + 2], i5721[i + 3]) );
  }
  i5718.rects = i5720
  i5718.wrapU = i5719[8]
  i5718.wrapV = i5719[9]
  return i5718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i5724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i5725 = data
  i5724.name = i5725[0]
  i5724.index = i5725[1]
  i5724.startup = !!i5725[2]
  return i5724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i5726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i5727 = data
  request.r(i5727[0], i5727[1], 0, i5726, 'sharedMesh')
  return i5726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i5728 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i5729 = data
  request.r(i5729[0], i5729[1], 0, i5728, 'additionalVertexStreams')
  i5728.enabled = !!i5729[2]
  request.r(i5729[3], i5729[4], 0, i5728, 'sharedMaterial')
  var i5731 = i5729[5]
  var i5730 = []
  for(var i = 0; i < i5731.length; i += 2) {
  request.r(i5731[i + 0], i5731[i + 1], 2, i5730, '')
  }
  i5728.sharedMaterials = i5730
  i5728.receiveShadows = !!i5729[6]
  i5728.shadowCastingMode = i5729[7]
  i5728.sortingLayerID = i5729[8]
  i5728.sortingOrder = i5729[9]
  i5728.lightmapIndex = i5729[10]
  i5728.lightmapSceneIndex = i5729[11]
  i5728.lightmapScaleOffset = new pc.Vec4( i5729[12], i5729[13], i5729[14], i5729[15] )
  i5728.lightProbeUsage = i5729[16]
  i5728.reflectionProbeUsage = i5729[17]
  return i5728
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i5734 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i5735 = data
  i5734.name = i5735[0]
  i5734.tagId = i5735[1]
  i5734.enabled = !!i5735[2]
  i5734.isStatic = !!i5735[3]
  i5734.layer = i5735[4]
  return i5734
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i5736 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i5737 = data
  request.r(i5737[0], i5737[1], 0, i5736, 'clip')
  request.r(i5737[2], i5737[3], 0, i5736, 'outputAudioMixerGroup')
  i5736.playOnAwake = !!i5737[4]
  i5736.loop = !!i5737[5]
  i5736.time = i5737[6]
  i5736.volume = i5737[7]
  i5736.pitch = i5737[8]
  i5736.enabled = !!i5737[9]
  return i5736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i5738 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i5739 = data
  i5738.center = new pc.Vec3( i5739[0], i5739[1], i5739[2] )
  i5738.radius = i5739[3]
  i5738.enabled = !!i5739[4]
  i5738.isTrigger = !!i5739[5]
  request.r(i5739[6], i5739[7], 0, i5738, 'material')
  return i5738
}

Deserializers["GridAgent"] = function (request, data, root) {
  var i5740 = root || request.c( 'GridAgent' )
  var i5741 = data
  i5740.Speed = i5741[0]
  request.r(i5741[1], i5741[2], 0, i5740, 'grid')
  i5740.repathInterval = i5741[3]
  i5740.turnSpeed = i5741[4]
  i5740.heightFollow = i5741[5]
  i5740.cornerTolerance = i5741[6]
  return i5740
}

Deserializers["Monster"] = function (request, data, root) {
  var i5742 = root || request.c( 'Monster' )
  var i5743 = data
  request.r(i5743[0], i5743[1], 0, i5742, 'agent')
  request.r(i5743[2], i5743[3], 0, i5742, 'animator')
  request.r(i5743[4], i5743[5], 0, i5742, 'nest')
  request.r(i5743[6], i5743[7], 0, i5742, 'exclamation')
  request.r(i5743[8], i5743[9], 0, i5742, 'audioSource')
  var i5745 = i5743[10]
  var i5744 = []
  for(var i = 0; i < i5745.length; i += 2) {
  request.r(i5745[i + 0], i5745[i + 1], 2, i5744, '')
  }
  i5742.angryClips = i5744
  var i5747 = i5743[11]
  var i5746 = []
  for(var i = 0; i < i5747.length; i += 2) {
  request.r(i5747[i + 0], i5747[i + 1], 2, i5746, '')
  }
  i5742.ambientClips = i5746
  i5742.minSoundDelay = i5743[12]
  i5742.maxSoundDelay = i5743[13]
  i5742.ambientVolume = i5743[14]
  request.r(i5743[15], i5743[16], 0, i5742, 'listener')
  i5742.hearDistance = i5743[17]
  i5742.angerDelay = i5743[18]
  i5742.minIdleTime = i5743[19]
  i5742.maxIdleTime = i5743[20]
  i5742.minWalkTime = i5743[21]
  i5742.maxWalkTime = i5743[22]
  i5742.wanderRadius = i5743[23]
  i5742.walkSpeed = i5743[24]
  i5742.chaseSpeed = i5743[25]
  i5742.returnSpeed = i5743[26]
  i5742.catchDistance = i5743[27]
  i5742.homeRadius = i5743[28]
  return i5742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i5750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i5751 = data
  i5750.color = new pc.Color(i5751[0], i5751[1], i5751[2], i5751[3])
  request.r(i5751[4], i5751[5], 0, i5750, 'sprite')
  i5750.flipX = !!i5751[6]
  i5750.flipY = !!i5751[7]
  i5750.drawMode = i5751[8]
  i5750.size = new pc.Vec2( i5751[9], i5751[10] )
  i5750.tileMode = i5751[11]
  i5750.adaptiveModeThreshold = i5751[12]
  i5750.maskInteraction = i5751[13]
  i5750.spriteSortPoint = i5751[14]
  i5750.enabled = !!i5751[15]
  request.r(i5751[16], i5751[17], 0, i5750, 'sharedMaterial')
  var i5753 = i5751[18]
  var i5752 = []
  for(var i = 0; i < i5753.length; i += 2) {
  request.r(i5753[i + 0], i5753[i + 1], 2, i5752, '')
  }
  i5750.sharedMaterials = i5752
  i5750.receiveShadows = !!i5751[19]
  i5750.shadowCastingMode = i5751[20]
  i5750.sortingLayerID = i5751[21]
  i5750.sortingOrder = i5751[22]
  i5750.lightmapIndex = i5751[23]
  i5750.lightmapSceneIndex = i5751[24]
  i5750.lightmapScaleOffset = new pc.Vec4( i5751[25], i5751[26], i5751[27], i5751[28] )
  i5750.lightProbeUsage = i5751[29]
  i5750.reflectionProbeUsage = i5751[30]
  return i5750
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i5754 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i5755 = data
  request.r(i5755[0], i5755[1], 0, i5754, 'animatorController')
  request.r(i5755[2], i5755[3], 0, i5754, 'avatar')
  i5754.updateMode = i5755[4]
  i5754.hasTransformHierarchy = !!i5755[5]
  i5754.applyRootMotion = !!i5755[6]
  var i5757 = i5755[7]
  var i5756 = []
  for(var i = 0; i < i5757.length; i += 2) {
  request.r(i5757[i + 0], i5757[i + 1], 2, i5756, '')
  }
  i5754.humanBones = i5756
  i5754.enabled = !!i5755[8]
  return i5754
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i5760 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i5761 = data
  i5760.aspect = i5761[0]
  i5760.orthographic = !!i5761[1]
  i5760.orthographicSize = i5761[2]
  i5760.backgroundColor = new pc.Color(i5761[3], i5761[4], i5761[5], i5761[6])
  i5760.nearClipPlane = i5761[7]
  i5760.farClipPlane = i5761[8]
  i5760.fieldOfView = i5761[9]
  i5760.depth = i5761[10]
  i5760.clearFlags = i5761[11]
  i5760.cullingMask = i5761[12]
  i5760.rect = i5761[13]
  request.r(i5761[14], i5761[15], 0, i5760, 'targetTexture')
  i5760.usePhysicalProperties = !!i5761[16]
  i5760.focalLength = i5761[17]
  i5760.sensorSize = new pc.Vec2( i5761[18], i5761[19] )
  i5760.lensShift = new pc.Vec2( i5761[20], i5761[21] )
  i5760.gateFit = i5761[22]
  i5760.commandBufferCount = i5761[23]
  i5760.cameraType = i5761[24]
  i5760.enabled = !!i5761[25]
  return i5760
}

Deserializers["ThirdPersonCamera"] = function (request, data, root) {
  var i5762 = root || request.c( 'ThirdPersonCamera' )
  var i5763 = data
  i5762.SensitivityScale = i5763[0]
  request.r(i5763[1], i5763[2], 0, i5762, 'cam')
  request.r(i5763[3], i5763[4], 0, i5762, 'followTarget')
  request.r(i5763[5], i5763[6], 0, i5762, 'player')
  request.r(i5763[7], i5763[8], 0, i5762, 'motor')
  request.r(i5763[9], i5763[10], 0, i5762, 'lookArea')
  i5762.cameraDistance = i5763[11]
  i5762.minDistance = i5763[12]
  i5762.cameraRadius = i5763[13]
  i5762.cameraReturnSpeed = i5763[14]
  i5762.minPitch = i5763[15]
  i5762.maxPitch = i5763[16]
  i5762.defaultPitch = i5763[17]
  i5762.lookSensitivity = new pc.Vec2( i5763[18], i5763[19] )
  i5762.mouseSensitivity = i5763[20]
  i5762.autoReturn = !!i5763[21]
  i5762.autoReturnDelay = i5763[22]
  i5762.autoReturnSpeed = i5763[23]
  i5762.shakeFrequency = i5763[24]
  i5762.useStartView = !!i5763[25]
  i5762.startYaw = i5763[26]
  i5762.startPitch = i5763[27]
  return i5762
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i5764 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i5765 = data
  request.r(i5765[0], i5765[1], 0, i5764, 'sharedMesh')
  i5764.convex = !!i5765[2]
  i5764.enabled = !!i5765[3]
  i5764.isTrigger = !!i5765[4]
  request.r(i5765[5], i5765[6], 0, i5764, 'material')
  return i5764
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i5766 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i5767 = data
  i5766.center = new pc.Vec3( i5767[0], i5767[1], i5767[2] )
  i5766.size = new pc.Vec3( i5767[3], i5767[4], i5767[5] )
  i5766.enabled = !!i5767[6]
  i5766.isTrigger = !!i5767[7]
  request.r(i5767[8], i5767[9], 0, i5766, 'material')
  return i5766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i5768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i5769 = data
  i5768.type = i5769[0]
  i5768.color = new pc.Color(i5769[1], i5769[2], i5769[3], i5769[4])
  i5768.cullingMask = i5769[5]
  i5768.intensity = i5769[6]
  i5768.range = i5769[7]
  i5768.spotAngle = i5769[8]
  i5768.shadows = i5769[9]
  i5768.shadowNormalBias = i5769[10]
  i5768.shadowBias = i5769[11]
  i5768.shadowStrength = i5769[12]
  i5768.shadowResolution = i5769[13]
  i5768.lightmapBakeType = i5769[14]
  i5768.renderMode = i5769[15]
  request.r(i5769[16], i5769[17], 0, i5768, 'cookie')
  i5768.cookieSize = i5769[18]
  i5768.shadowNearPlane = i5769[19]
  i5768.occlusionMaskChannel = i5769[20]
  i5768.isBaked = !!i5769[21]
  i5768.mixedLightingMode = i5769[22]
  i5768.enabled = !!i5769[23]
  return i5768
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i5770 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i5771 = data
  request.r(i5771[0], i5771[1], 0, i5770, 'm_FirstSelected')
  i5770.m_sendNavigationEvents = !!i5771[2]
  i5770.m_DragThreshold = i5771[3]
  return i5770
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i5772 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i5773 = data
  i5772.m_HorizontalAxis = i5773[0]
  i5772.m_VerticalAxis = i5773[1]
  i5772.m_SubmitButton = i5773[2]
  i5772.m_CancelButton = i5773[3]
  i5772.m_InputActionsPerSecond = i5773[4]
  i5772.m_RepeatDelay = i5773[5]
  i5772.m_ForceModuleActive = !!i5773[6]
  i5772.m_SendPointerHoverToParent = !!i5773[7]
  return i5772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i5774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i5775 = data
  i5774.center = new pc.Vec3( i5775[0], i5775[1], i5775[2] )
  i5774.radius = i5775[3]
  i5774.height = i5775[4]
  i5774.direction = i5775[5]
  i5774.enabled = !!i5775[6]
  i5774.isTrigger = !!i5775[7]
  request.r(i5775[8], i5775[9], 0, i5774, 'material')
  return i5774
}

Deserializers["Nest"] = function (request, data, root) {
  var i5776 = root || request.c( 'Nest' )
  var i5777 = data
  i5776.tutorialNest = !!i5777[0]
  request.r(i5777[1], i5777[2], 0, i5776, 'eggs')
  request.r(i5777[3], i5777[4], 0, i5776, 'monster')
  i5776.refillDelay = i5777[5]
  return i5776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i5778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i5779 = data
  i5778.enabled = !!i5779[0]
  i5778.center = new pc.Vec3( i5779[1], i5779[2], i5779[3] )
  i5778.radius = i5779[4]
  i5778.height = i5779[5]
  i5778.minMoveDistance = i5779[6]
  i5778.skinWidth = i5779[7]
  i5778.enableOverlapRecovery = !!i5779[8]
  return i5778
}

Deserializers["Thief"] = function (request, data, root) {
  var i5780 = root || request.c( 'Thief' )
  var i5781 = data
  i5780.isPlayer = !!i5781[0]
  request.r(i5781[1], i5781[2], 0, i5780, 'game')
  request.r(i5781[3], i5781[4], 0, i5780, 'animator')
  request.r(i5781[5], i5781[6], 0, i5780, 'eggsVisual')
  request.r(i5781[7], i5781[8], 0, i5780, 'audioSource')
  var i5783 = i5781[9]
  var i5782 = []
  for(var i = 0; i < i5783.length; i += 2) {
  request.r(i5783[i + 0], i5783[i + 1], 2, i5782, '')
  }
  i5780.deathClips = i5782
  i5780.knockTime = i5781[10]
  i5780.standUpTime = i5781[11]
  return i5780
}

Deserializers["PlayerMotor"] = function (request, data, root) {
  var i5784 = root || request.c( 'PlayerMotor' )
  var i5785 = data
  i5784.Frozen = !!i5785[0]
  request.r(i5785[1], i5785[2], 0, i5784, 'controller')
  request.r(i5785[3], i5785[4], 0, i5784, 'animator')
  request.r(i5785[5], i5785[6], 0, i5784, 'thief')
  request.r(i5785[7], i5785[8], 0, i5784, 'cameraTransform')
  request.r(i5785[9], i5785[10], 0, i5784, 'joystick')
  request.r(i5785[11], i5785[12], 0, i5784, 'audioSource')
  request.r(i5785[13], i5785[14], 0, i5784, 'jumpClip')
  var i5787 = i5785[15]
  var i5786 = []
  for(var i = 0; i < i5787.length; i += 2) {
  request.r(i5787[i + 0], i5787[i + 1], 2, i5786, '')
  }
  i5784.footstepClips = i5786
  i5784.footstepInterval = i5785[16]
  i5784.footstepVolume = i5785[17]
  i5784.footstepPitchJitter = i5785[18]
  request.r(i5785[19], i5785[20], 0, i5784, 'footstepSource')
  i5784.runSpeed = i5785[21]
  i5784.rotationRate = i5785[22]
  i5784.jumpImpulse = i5785[23]
  i5784.gravity = i5785[24]
  i5784.runAnimSpeed = i5785[25]
  i5784.stepHeight = i5785[26]
  i5784.wallNormalY = i5785[27]
  i5784.killHeight = i5785[28]
  request.r(i5785[29], i5785[30], 0, i5784, 'respawnPoint')
  return i5784
}

Deserializers["GuideLine"] = function (request, data, root) {
  var i5788 = root || request.c( 'GuideLine' )
  var i5789 = data
  request.r(i5789[0], i5789[1], 0, i5788, 'line')
  request.r(i5789[2], i5789[3], 0, i5788, 'from')
  i5788.heightOffset = i5789[4]
  i5788.hideDistance = i5789[5]
  i5788.drawFromTarget = !!i5789[6]
  return i5788
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i5790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i5791 = data
  request.r(i5791[0], i5791[1], 0, i5790, 'sharedMesh')
  var i5793 = i5791[2]
  var i5792 = []
  for(var i = 0; i < i5793.length; i += 2) {
  request.r(i5793[i + 0], i5793[i + 1], 2, i5792, '')
  }
  i5790.bones = i5792
  i5790.updateWhenOffscreen = !!i5791[3]
  i5790.localBounds = i5791[4]
  request.r(i5791[5], i5791[6], 0, i5790, 'rootBone')
  var i5795 = i5791[7]
  var i5794 = []
  for(var i = 0; i < i5795.length; i += 1) {
    i5794.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i5795[i + 0]) );
  }
  i5790.blendShapesWeights = i5794
  i5790.enabled = !!i5791[8]
  request.r(i5791[9], i5791[10], 0, i5790, 'sharedMaterial')
  var i5797 = i5791[11]
  var i5796 = []
  for(var i = 0; i < i5797.length; i += 2) {
  request.r(i5797[i + 0], i5797[i + 1], 2, i5796, '')
  }
  i5790.sharedMaterials = i5796
  i5790.receiveShadows = !!i5791[12]
  i5790.shadowCastingMode = i5791[13]
  i5790.sortingLayerID = i5791[14]
  i5790.sortingOrder = i5791[15]
  i5790.lightmapIndex = i5791[16]
  i5790.lightmapSceneIndex = i5791[17]
  i5790.lightmapScaleOffset = new pc.Vec4( i5791[18], i5791[19], i5791[20], i5791[21] )
  i5790.lightProbeUsage = i5791[22]
  i5790.reflectionProbeUsage = i5791[23]
  return i5790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i5800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i5801 = data
  i5800.weight = i5801[0]
  return i5800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i5802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i5803 = data
  i5802.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i5803[0], i5802.main)
  i5802.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i5803[1], i5802.colorBySpeed)
  i5802.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i5803[2], i5802.colorOverLifetime)
  i5802.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i5803[3], i5802.emission)
  i5802.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i5803[4], i5802.rotationBySpeed)
  i5802.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i5803[5], i5802.rotationOverLifetime)
  i5802.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i5803[6], i5802.shape)
  i5802.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i5803[7], i5802.sizeBySpeed)
  i5802.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i5803[8], i5802.sizeOverLifetime)
  i5802.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i5803[9], i5802.textureSheetAnimation)
  i5802.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i5803[10], i5802.velocityOverLifetime)
  i5802.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i5803[11], i5802.noise)
  i5802.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i5803[12], i5802.inheritVelocity)
  i5802.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i5803[13], i5802.forceOverLifetime)
  i5802.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i5803[14], i5802.limitVelocityOverLifetime)
  i5802.useAutoRandomSeed = !!i5803[15]
  i5802.randomSeed = i5803[16]
  return i5802
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i5804 = root || new pc.ParticleSystemMain()
  var i5805 = data
  i5804.duration = i5805[0]
  i5804.loop = !!i5805[1]
  i5804.prewarm = !!i5805[2]
  i5804.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[3], i5804.startDelay)
  i5804.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[4], i5804.startLifetime)
  i5804.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[5], i5804.startSpeed)
  i5804.startSize3D = !!i5805[6]
  i5804.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[7], i5804.startSizeX)
  i5804.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[8], i5804.startSizeY)
  i5804.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[9], i5804.startSizeZ)
  i5804.startRotation3D = !!i5805[10]
  i5804.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[11], i5804.startRotationX)
  i5804.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[12], i5804.startRotationY)
  i5804.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[13], i5804.startRotationZ)
  i5804.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i5805[14], i5804.startColor)
  i5804.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5805[15], i5804.gravityModifier)
  i5804.simulationSpace = i5805[16]
  request.r(i5805[17], i5805[18], 0, i5804, 'customSimulationSpace')
  i5804.simulationSpeed = i5805[19]
  i5804.useUnscaledTime = !!i5805[20]
  i5804.scalingMode = i5805[21]
  i5804.playOnAwake = !!i5805[22]
  i5804.maxParticles = i5805[23]
  i5804.emitterVelocityMode = i5805[24]
  i5804.stopAction = i5805[25]
  return i5804
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i5806 = root || new pc.MinMaxCurve()
  var i5807 = data
  i5806.mode = i5807[0]
  i5806.curveMin = new pc.AnimationCurve( { keys_flow: i5807[1] } )
  i5806.curveMax = new pc.AnimationCurve( { keys_flow: i5807[2] } )
  i5806.curveMultiplier = i5807[3]
  i5806.constantMin = i5807[4]
  i5806.constantMax = i5807[5]
  return i5806
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i5808 = root || new pc.MinMaxGradient()
  var i5809 = data
  i5808.mode = i5809[0]
  i5808.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i5809[1], i5808.gradientMin)
  i5808.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i5809[2], i5808.gradientMax)
  i5808.colorMin = new pc.Color(i5809[3], i5809[4], i5809[5], i5809[6])
  i5808.colorMax = new pc.Color(i5809[7], i5809[8], i5809[9], i5809[10])
  return i5808
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i5810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i5811 = data
  i5810.mode = i5811[0]
  var i5813 = i5811[1]
  var i5812 = []
  for(var i = 0; i < i5813.length; i += 1) {
    i5812.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i5813[i + 0]) );
  }
  i5810.colorKeys = i5812
  var i5815 = i5811[2]
  var i5814 = []
  for(var i = 0; i < i5815.length; i += 1) {
    i5814.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i5815[i + 0]) );
  }
  i5810.alphaKeys = i5814
  return i5810
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i5816 = root || new pc.ParticleSystemColorBySpeed()
  var i5817 = data
  i5816.enabled = !!i5817[0]
  i5816.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i5817[1], i5816.color)
  i5816.range = new pc.Vec2( i5817[2], i5817[3] )
  return i5816
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i5820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i5821 = data
  i5820.color = new pc.Color(i5821[0], i5821[1], i5821[2], i5821[3])
  i5820.time = i5821[4]
  return i5820
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i5824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i5825 = data
  i5824.alpha = i5825[0]
  i5824.time = i5825[1]
  return i5824
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i5826 = root || new pc.ParticleSystemColorOverLifetime()
  var i5827 = data
  i5826.enabled = !!i5827[0]
  i5826.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i5827[1], i5826.color)
  return i5826
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i5828 = root || new pc.ParticleSystemEmitter()
  var i5829 = data
  i5828.enabled = !!i5829[0]
  i5828.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5829[1], i5828.rateOverTime)
  i5828.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5829[2], i5828.rateOverDistance)
  var i5831 = i5829[3]
  var i5830 = []
  for(var i = 0; i < i5831.length; i += 1) {
    i5830.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i5831[i + 0]) );
  }
  i5828.bursts = i5830
  return i5828
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i5834 = root || new pc.ParticleSystemBurst()
  var i5835 = data
  i5834.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5835[0], i5834.count)
  i5834.cycleCount = i5835[1]
  i5834.minCount = i5835[2]
  i5834.maxCount = i5835[3]
  i5834.repeatInterval = i5835[4]
  i5834.time = i5835[5]
  return i5834
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i5836 = root || new pc.ParticleSystemRotationBySpeed()
  var i5837 = data
  i5836.enabled = !!i5837[0]
  i5836.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5837[1], i5836.x)
  i5836.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5837[2], i5836.y)
  i5836.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5837[3], i5836.z)
  i5836.separateAxes = !!i5837[4]
  i5836.range = new pc.Vec2( i5837[5], i5837[6] )
  return i5836
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i5838 = root || new pc.ParticleSystemRotationOverLifetime()
  var i5839 = data
  i5838.enabled = !!i5839[0]
  i5838.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5839[1], i5838.x)
  i5838.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5839[2], i5838.y)
  i5838.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5839[3], i5838.z)
  i5838.separateAxes = !!i5839[4]
  return i5838
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i5840 = root || new pc.ParticleSystemShape()
  var i5841 = data
  i5840.enabled = !!i5841[0]
  i5840.shapeType = i5841[1]
  i5840.randomDirectionAmount = i5841[2]
  i5840.sphericalDirectionAmount = i5841[3]
  i5840.randomPositionAmount = i5841[4]
  i5840.alignToDirection = !!i5841[5]
  i5840.radius = i5841[6]
  i5840.radiusMode = i5841[7]
  i5840.radiusSpread = i5841[8]
  i5840.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5841[9], i5840.radiusSpeed)
  i5840.radiusThickness = i5841[10]
  i5840.angle = i5841[11]
  i5840.length = i5841[12]
  i5840.boxThickness = new pc.Vec3( i5841[13], i5841[14], i5841[15] )
  i5840.meshShapeType = i5841[16]
  request.r(i5841[17], i5841[18], 0, i5840, 'mesh')
  request.r(i5841[19], i5841[20], 0, i5840, 'meshRenderer')
  request.r(i5841[21], i5841[22], 0, i5840, 'skinnedMeshRenderer')
  i5840.useMeshMaterialIndex = !!i5841[23]
  i5840.meshMaterialIndex = i5841[24]
  i5840.useMeshColors = !!i5841[25]
  i5840.normalOffset = i5841[26]
  i5840.arc = i5841[27]
  i5840.arcMode = i5841[28]
  i5840.arcSpread = i5841[29]
  i5840.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5841[30], i5840.arcSpeed)
  i5840.donutRadius = i5841[31]
  i5840.position = new pc.Vec3( i5841[32], i5841[33], i5841[34] )
  i5840.rotation = new pc.Vec3( i5841[35], i5841[36], i5841[37] )
  i5840.scale = new pc.Vec3( i5841[38], i5841[39], i5841[40] )
  return i5840
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i5842 = root || new pc.ParticleSystemSizeBySpeed()
  var i5843 = data
  i5842.enabled = !!i5843[0]
  i5842.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5843[1], i5842.x)
  i5842.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5843[2], i5842.y)
  i5842.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5843[3], i5842.z)
  i5842.separateAxes = !!i5843[4]
  i5842.range = new pc.Vec2( i5843[5], i5843[6] )
  return i5842
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i5844 = root || new pc.ParticleSystemSizeOverLifetime()
  var i5845 = data
  i5844.enabled = !!i5845[0]
  i5844.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5845[1], i5844.x)
  i5844.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5845[2], i5844.y)
  i5844.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5845[3], i5844.z)
  i5844.separateAxes = !!i5845[4]
  return i5844
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i5846 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i5847 = data
  i5846.enabled = !!i5847[0]
  i5846.mode = i5847[1]
  i5846.animation = i5847[2]
  i5846.numTilesX = i5847[3]
  i5846.numTilesY = i5847[4]
  i5846.useRandomRow = !!i5847[5]
  i5846.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5847[6], i5846.frameOverTime)
  i5846.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5847[7], i5846.startFrame)
  i5846.cycleCount = i5847[8]
  i5846.rowIndex = i5847[9]
  i5846.flipU = i5847[10]
  i5846.flipV = i5847[11]
  i5846.spriteCount = i5847[12]
  var i5849 = i5847[13]
  var i5848 = []
  for(var i = 0; i < i5849.length; i += 2) {
  request.r(i5849[i + 0], i5849[i + 1], 2, i5848, '')
  }
  i5846.sprites = i5848
  return i5846
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i5852 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i5853 = data
  i5852.enabled = !!i5853[0]
  i5852.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[1], i5852.x)
  i5852.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[2], i5852.y)
  i5852.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[3], i5852.z)
  i5852.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[4], i5852.radial)
  i5852.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[5], i5852.speedModifier)
  i5852.space = i5853[6]
  i5852.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[7], i5852.orbitalX)
  i5852.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[8], i5852.orbitalY)
  i5852.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[9], i5852.orbitalZ)
  i5852.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[10], i5852.orbitalOffsetX)
  i5852.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[11], i5852.orbitalOffsetY)
  i5852.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5853[12], i5852.orbitalOffsetZ)
  return i5852
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i5854 = root || new pc.ParticleSystemNoise()
  var i5855 = data
  i5854.enabled = !!i5855[0]
  i5854.separateAxes = !!i5855[1]
  i5854.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[2], i5854.strengthX)
  i5854.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[3], i5854.strengthY)
  i5854.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[4], i5854.strengthZ)
  i5854.frequency = i5855[5]
  i5854.damping = !!i5855[6]
  i5854.octaveCount = i5855[7]
  i5854.octaveMultiplier = i5855[8]
  i5854.octaveScale = i5855[9]
  i5854.quality = i5855[10]
  i5854.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[11], i5854.scrollSpeed)
  i5854.scrollSpeedMultiplier = i5855[12]
  i5854.remapEnabled = !!i5855[13]
  i5854.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[14], i5854.remapX)
  i5854.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[15], i5854.remapY)
  i5854.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[16], i5854.remapZ)
  i5854.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[17], i5854.positionAmount)
  i5854.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[18], i5854.rotationAmount)
  i5854.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5855[19], i5854.sizeAmount)
  return i5854
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i5856 = root || new pc.ParticleSystemInheritVelocity()
  var i5857 = data
  i5856.enabled = !!i5857[0]
  i5856.mode = i5857[1]
  i5856.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5857[2], i5856.curve)
  return i5856
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i5858 = root || new pc.ParticleSystemForceOverLifetime()
  var i5859 = data
  i5858.enabled = !!i5859[0]
  i5858.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5859[1], i5858.x)
  i5858.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5859[2], i5858.y)
  i5858.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5859[3], i5858.z)
  i5858.space = i5859[4]
  i5858.randomized = !!i5859[5]
  return i5858
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i5860 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i5861 = data
  i5860.enabled = !!i5861[0]
  i5860.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5861[1], i5860.limit)
  i5860.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5861[2], i5860.limitX)
  i5860.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5861[3], i5860.limitY)
  i5860.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5861[4], i5860.limitZ)
  i5860.dampen = i5861[5]
  i5860.separateAxes = !!i5861[6]
  i5860.space = i5861[7]
  i5860.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i5861[8], i5860.drag)
  i5860.multiplyDragByParticleSize = !!i5861[9]
  i5860.multiplyDragByParticleVelocity = !!i5861[10]
  return i5860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i5862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i5863 = data
  request.r(i5863[0], i5863[1], 0, i5862, 'mesh')
  i5862.meshCount = i5863[2]
  i5862.activeVertexStreamsCount = i5863[3]
  i5862.alignment = i5863[4]
  i5862.renderMode = i5863[5]
  i5862.sortMode = i5863[6]
  i5862.lengthScale = i5863[7]
  i5862.velocityScale = i5863[8]
  i5862.cameraVelocityScale = i5863[9]
  i5862.normalDirection = i5863[10]
  i5862.sortingFudge = i5863[11]
  i5862.minParticleSize = i5863[12]
  i5862.maxParticleSize = i5863[13]
  i5862.pivot = new pc.Vec3( i5863[14], i5863[15], i5863[16] )
  request.r(i5863[17], i5863[18], 0, i5862, 'trailMaterial')
  i5862.applyActiveColorSpace = !!i5863[19]
  i5862.enabled = !!i5863[20]
  request.r(i5863[21], i5863[22], 0, i5862, 'sharedMaterial')
  var i5865 = i5863[23]
  var i5864 = []
  for(var i = 0; i < i5865.length; i += 2) {
  request.r(i5865[i + 0], i5865[i + 1], 2, i5864, '')
  }
  i5862.sharedMaterials = i5864
  i5862.receiveShadows = !!i5863[24]
  i5862.shadowCastingMode = i5863[25]
  i5862.sortingLayerID = i5863[26]
  i5862.sortingOrder = i5863[27]
  i5862.lightmapIndex = i5863[28]
  i5862.lightmapSceneIndex = i5863[29]
  i5862.lightmapScaleOffset = new pc.Vec4( i5863[30], i5863[31], i5863[32], i5863[33] )
  i5862.lightProbeUsage = i5863[34]
  i5862.reflectionProbeUsage = i5863[35]
  return i5862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i5866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i5867 = data
  i5866.textureMode = i5867[0]
  i5866.alignment = i5867[1]
  i5866.widthCurve = new pc.AnimationCurve( { keys_flow: i5867[2] } )
  i5866.colorGradient = i5867[3] ? new pc.ColorGradient(i5867[3][0], i5867[3][1], i5867[3][2]) : null
  var i5869 = i5867[4]
  var i5868 = []
  for(var i = 0; i < i5869.length; i += 3) {
    i5868.push( new pc.Vec3( i5869[i + 0], i5869[i + 1], i5869[i + 2] ) );
  }
  i5866.positions = i5868
  i5866.positionCount = i5867[5]
  i5866.widthMultiplier = i5867[6]
  i5866.startWidth = i5867[7]
  i5866.endWidth = i5867[8]
  i5866.numCornerVertices = i5867[9]
  i5866.numCapVertices = i5867[10]
  i5866.useWorldSpace = !!i5867[11]
  i5866.loop = !!i5867[12]
  i5866.startColor = new pc.Color(i5867[13], i5867[14], i5867[15], i5867[16])
  i5866.endColor = new pc.Color(i5867[17], i5867[18], i5867[19], i5867[20])
  i5866.generateLightingData = !!i5867[21]
  i5866.enabled = !!i5867[22]
  request.r(i5867[23], i5867[24], 0, i5866, 'sharedMaterial')
  var i5871 = i5867[25]
  var i5870 = []
  for(var i = 0; i < i5871.length; i += 2) {
  request.r(i5871[i + 0], i5871[i + 1], 2, i5870, '')
  }
  i5866.sharedMaterials = i5870
  i5866.receiveShadows = !!i5867[26]
  i5866.shadowCastingMode = i5867[27]
  i5866.sortingLayerID = i5867[28]
  i5866.sortingOrder = i5867[29]
  i5866.lightmapIndex = i5867[30]
  i5866.lightmapSceneIndex = i5867[31]
  i5866.lightmapScaleOffset = new pc.Vec4( i5867[32], i5867[33], i5867[34], i5867[35] )
  i5866.lightProbeUsage = i5867[36]
  i5866.reflectionProbeUsage = i5867[37]
  return i5866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i5874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i5875 = data
  i5874.pivot = new pc.Vec2( i5875[0], i5875[1] )
  i5874.anchorMin = new pc.Vec2( i5875[2], i5875[3] )
  i5874.anchorMax = new pc.Vec2( i5875[4], i5875[5] )
  i5874.sizeDelta = new pc.Vec2( i5875[6], i5875[7] )
  i5874.anchoredPosition3D = new pc.Vec3( i5875[8], i5875[9], i5875[10] )
  i5874.rotation = new pc.Quat(i5875[11], i5875[12], i5875[13], i5875[14])
  i5874.scale = new pc.Vec3( i5875[15], i5875[16], i5875[17] )
  return i5874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i5876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i5877 = data
  i5876.planeDistance = i5877[0]
  i5876.referencePixelsPerUnit = i5877[1]
  i5876.isFallbackOverlay = !!i5877[2]
  i5876.renderMode = i5877[3]
  i5876.renderOrder = i5877[4]
  i5876.sortingLayerName = i5877[5]
  i5876.sortingOrder = i5877[6]
  i5876.scaleFactor = i5877[7]
  request.r(i5877[8], i5877[9], 0, i5876, 'worldCamera')
  i5876.overrideSorting = !!i5877[10]
  i5876.pixelPerfect = !!i5877[11]
  i5876.targetDisplay = i5877[12]
  i5876.overridePixelPerfect = !!i5877[13]
  i5876.enabled = !!i5877[14]
  return i5876
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i5878 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i5879 = data
  i5878.m_UiScaleMode = i5879[0]
  i5878.m_ReferencePixelsPerUnit = i5879[1]
  i5878.m_ScaleFactor = i5879[2]
  i5878.m_ReferenceResolution = new pc.Vec2( i5879[3], i5879[4] )
  i5878.m_ScreenMatchMode = i5879[5]
  i5878.m_MatchWidthOrHeight = i5879[6]
  i5878.m_PhysicalUnit = i5879[7]
  i5878.m_FallbackScreenDPI = i5879[8]
  i5878.m_DefaultSpriteDPI = i5879[9]
  i5878.m_DynamicPixelsPerUnit = i5879[10]
  i5878.m_PresetInfoIsWorld = !!i5879[11]
  return i5878
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i5880 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i5881 = data
  i5880.m_IgnoreReversedGraphics = !!i5881[0]
  i5880.m_BlockingObjects = i5881[1]
  i5880.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i5881[2] )
  return i5880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i5882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i5883 = data
  i5882.cullTransparentMesh = !!i5883[0]
  return i5882
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i5884 = root || request.c( 'UnityEngine.UI.Image' )
  var i5885 = data
  request.r(i5885[0], i5885[1], 0, i5884, 'm_Sprite')
  i5884.m_Type = i5885[2]
  i5884.m_PreserveAspect = !!i5885[3]
  i5884.m_FillCenter = !!i5885[4]
  i5884.m_FillMethod = i5885[5]
  i5884.m_FillAmount = i5885[6]
  i5884.m_FillClockwise = !!i5885[7]
  i5884.m_FillOrigin = i5885[8]
  i5884.m_UseSpriteMesh = !!i5885[9]
  i5884.m_PixelsPerUnitMultiplier = i5885[10]
  request.r(i5885[11], i5885[12], 0, i5884, 'm_Material')
  i5884.m_Maskable = !!i5885[13]
  i5884.m_Color = new pc.Color(i5885[14], i5885[15], i5885[16], i5885[17])
  i5884.m_RaycastTarget = !!i5885[18]
  i5884.m_RaycastPadding = new pc.Vec4( i5885[19], i5885[20], i5885[21], i5885[22] )
  return i5884
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i5886 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i5887 = data
  i5886.m_Spacing = i5887[0]
  i5886.m_ChildForceExpandWidth = !!i5887[1]
  i5886.m_ChildForceExpandHeight = !!i5887[2]
  i5886.m_ChildControlWidth = !!i5887[3]
  i5886.m_ChildControlHeight = !!i5887[4]
  i5886.m_ChildScaleWidth = !!i5887[5]
  i5886.m_ChildScaleHeight = !!i5887[6]
  i5886.m_ReverseArrangement = !!i5887[7]
  i5886.m_Padding = UnityEngine.RectOffset.FromPaddings(i5887[8], i5887[9], i5887[10], i5887[11])
  i5886.m_ChildAlignment = i5887[12]
  return i5886
}

Deserializers["UnityEngine.EventSystems.EventTrigger"] = function (request, data, root) {
  var i5888 = root || request.c( 'UnityEngine.EventSystems.EventTrigger' )
  var i5889 = data
  var i5891 = i5889[0]
  var i5890 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.EventSystems.EventTrigger+Entry')))
  for(var i = 0; i < i5891.length; i += 1) {
    i5890.add(request.d('UnityEngine.EventSystems.EventTrigger+Entry', i5891[i + 0]));
  }
  i5888.m_Delegates = i5890
  return i5888
}

Deserializers["UnityEngine.EventSystems.EventTrigger+Entry"] = function (request, data, root) {
  var i5894 = root || request.c( 'UnityEngine.EventSystems.EventTrigger+Entry' )
  var i5895 = data
  i5894.eventID = i5895[0]
  i5894.callback = request.d('UnityEngine.EventSystems.EventTrigger+TriggerEvent', i5895[1], i5894.callback)
  return i5894
}

Deserializers["ScreenDeltaInputSystem"] = function (request, data, root) {
  var i5896 = root || request.c( 'ScreenDeltaInputSystem' )
  var i5897 = data
  return i5896
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i5898 = root || request.c( 'PlayableJoystick' )
  var i5899 = data
  i5898.handleRange = i5899[0]
  i5898.deadZone = i5899[1]
  i5898.floating = !!i5899[2]
  request.r(i5899[3], i5899[4], 0, i5898, 'area')
  request.r(i5899[5], i5899[6], 0, i5898, 'background')
  request.r(i5899[7], i5899[8], 0, i5898, 'knob')
  return i5898
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i5900 = root || request.c( 'UnityEngine.UI.Button' )
  var i5901 = data
  i5900.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i5901[0], i5900.m_OnClick)
  i5900.m_Navigation = request.d('UnityEngine.UI.Navigation', i5901[1], i5900.m_Navigation)
  i5900.m_Transition = i5901[2]
  i5900.m_Colors = request.d('UnityEngine.UI.ColorBlock', i5901[3], i5900.m_Colors)
  i5900.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i5901[4], i5900.m_SpriteState)
  i5900.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i5901[5], i5900.m_AnimationTriggers)
  i5900.m_Interactable = !!i5901[6]
  request.r(i5901[7], i5901[8], 0, i5900, 'm_TargetGraphic')
  return i5900
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i5902 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i5903 = data
  i5902.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i5903[0], i5902.m_PersistentCalls)
  return i5902
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i5904 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i5905 = data
  var i5907 = i5905[0]
  var i5906 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i5907.length; i += 1) {
    i5906.add(request.d('UnityEngine.Events.PersistentCall', i5907[i + 0]));
  }
  i5904.m_Calls = i5906
  return i5904
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i5910 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i5911 = data
  request.r(i5911[0], i5911[1], 0, i5910, 'm_Target')
  i5910.m_TargetAssemblyTypeName = i5911[2]
  i5910.m_MethodName = i5911[3]
  i5910.m_Mode = i5911[4]
  i5910.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i5911[5], i5910.m_Arguments)
  i5910.m_CallState = i5911[6]
  return i5910
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i5912 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i5913 = data
  i5912.m_Mode = i5913[0]
  i5912.m_WrapAround = !!i5913[1]
  request.r(i5913[2], i5913[3], 0, i5912, 'm_SelectOnUp')
  request.r(i5913[4], i5913[5], 0, i5912, 'm_SelectOnDown')
  request.r(i5913[6], i5913[7], 0, i5912, 'm_SelectOnLeft')
  request.r(i5913[8], i5913[9], 0, i5912, 'm_SelectOnRight')
  return i5912
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i5914 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i5915 = data
  i5914.m_NormalColor = new pc.Color(i5915[0], i5915[1], i5915[2], i5915[3])
  i5914.m_HighlightedColor = new pc.Color(i5915[4], i5915[5], i5915[6], i5915[7])
  i5914.m_PressedColor = new pc.Color(i5915[8], i5915[9], i5915[10], i5915[11])
  i5914.m_SelectedColor = new pc.Color(i5915[12], i5915[13], i5915[14], i5915[15])
  i5914.m_DisabledColor = new pc.Color(i5915[16], i5915[17], i5915[18], i5915[19])
  i5914.m_ColorMultiplier = i5915[20]
  i5914.m_FadeDuration = i5915[21]
  return i5914
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i5916 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i5917 = data
  request.r(i5917[0], i5917[1], 0, i5916, 'm_HighlightedSprite')
  request.r(i5917[2], i5917[3], 0, i5916, 'm_PressedSprite')
  request.r(i5917[4], i5917[5], 0, i5916, 'm_SelectedSprite')
  request.r(i5917[6], i5917[7], 0, i5916, 'm_DisabledSprite')
  return i5916
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i5918 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i5919 = data
  i5918.m_NormalTrigger = i5919[0]
  i5918.m_HighlightedTrigger = i5919[1]
  i5918.m_PressedTrigger = i5919[2]
  i5918.m_SelectedTrigger = i5919[3]
  i5918.m_DisabledTrigger = i5919[4]
  return i5918
}

Deserializers["JumpButton"] = function (request, data, root) {
  var i5920 = root || request.c( 'JumpButton' )
  var i5921 = data
  request.r(i5921[0], i5921[1], 0, i5920, 'motor')
  return i5920
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i5922 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i5923 = data
  i5922.m_hasFontAssetChanged = !!i5923[0]
  request.r(i5923[1], i5923[2], 0, i5922, 'm_baseMaterial')
  i5922.m_maskOffset = new pc.Vec4( i5923[3], i5923[4], i5923[5], i5923[6] )
  i5922.m_text = i5923[7]
  i5922.m_isRightToLeft = !!i5923[8]
  request.r(i5923[9], i5923[10], 0, i5922, 'm_fontAsset')
  request.r(i5923[11], i5923[12], 0, i5922, 'm_sharedMaterial')
  var i5925 = i5923[13]
  var i5924 = []
  for(var i = 0; i < i5925.length; i += 2) {
  request.r(i5925[i + 0], i5925[i + 1], 2, i5924, '')
  }
  i5922.m_fontSharedMaterials = i5924
  request.r(i5923[14], i5923[15], 0, i5922, 'm_fontMaterial')
  var i5927 = i5923[16]
  var i5926 = []
  for(var i = 0; i < i5927.length; i += 2) {
  request.r(i5927[i + 0], i5927[i + 1], 2, i5926, '')
  }
  i5922.m_fontMaterials = i5926
  i5922.m_fontColor32 = UnityEngine.Color32.ConstructColor(i5923[17], i5923[18], i5923[19], i5923[20])
  i5922.m_fontColor = new pc.Color(i5923[21], i5923[22], i5923[23], i5923[24])
  i5922.m_enableVertexGradient = !!i5923[25]
  i5922.m_colorMode = i5923[26]
  i5922.m_fontColorGradient = request.d('TMPro.VertexGradient', i5923[27], i5922.m_fontColorGradient)
  request.r(i5923[28], i5923[29], 0, i5922, 'm_fontColorGradientPreset')
  request.r(i5923[30], i5923[31], 0, i5922, 'm_spriteAsset')
  i5922.m_tintAllSprites = !!i5923[32]
  request.r(i5923[33], i5923[34], 0, i5922, 'm_StyleSheet')
  i5922.m_TextStyleHashCode = i5923[35]
  i5922.m_overrideHtmlColors = !!i5923[36]
  i5922.m_faceColor = UnityEngine.Color32.ConstructColor(i5923[37], i5923[38], i5923[39], i5923[40])
  i5922.m_fontSize = i5923[41]
  i5922.m_fontSizeBase = i5923[42]
  i5922.m_fontWeight = i5923[43]
  i5922.m_enableAutoSizing = !!i5923[44]
  i5922.m_fontSizeMin = i5923[45]
  i5922.m_fontSizeMax = i5923[46]
  i5922.m_fontStyle = i5923[47]
  i5922.m_HorizontalAlignment = i5923[48]
  i5922.m_VerticalAlignment = i5923[49]
  i5922.m_textAlignment = i5923[50]
  i5922.m_characterSpacing = i5923[51]
  i5922.m_characterHorizontalScale = i5923[52]
  i5922.m_wordSpacing = i5923[53]
  i5922.m_lineSpacing = i5923[54]
  i5922.m_lineSpacingMax = i5923[55]
  i5922.m_paragraphSpacing = i5923[56]
  i5922.m_charWidthMaxAdj = i5923[57]
  i5922.m_TextWrappingMode = i5923[58]
  i5922.m_wordWrappingRatios = i5923[59]
  i5922.m_overflowMode = i5923[60]
  request.r(i5923[61], i5923[62], 0, i5922, 'm_linkedTextComponent')
  request.r(i5923[63], i5923[64], 0, i5922, 'parentLinkedComponent')
  i5922.m_enableKerning = !!i5923[65]
  var i5929 = i5923[66]
  var i5928 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i5929.length; i += 1) {
    i5928.add(i5929[i + 0]);
  }
  i5922.m_ActiveFontFeatures = i5928
  i5922.m_enableExtraPadding = !!i5923[67]
  i5922.checkPaddingRequired = !!i5923[68]
  i5922.m_isRichText = !!i5923[69]
  i5922.m_parseCtrlCharacters = !!i5923[70]
  i5922.m_isOrthographic = !!i5923[71]
  i5922.m_isCullingEnabled = !!i5923[72]
  i5922.m_horizontalMapping = i5923[73]
  i5922.m_verticalMapping = i5923[74]
  i5922.m_uvLineOffset = i5923[75]
  i5922.m_geometrySortingOrder = i5923[76]
  i5922.m_IsTextObjectScaleStatic = !!i5923[77]
  i5922.m_VertexBufferAutoSizeReduction = !!i5923[78]
  i5922.m_useMaxVisibleDescender = !!i5923[79]
  i5922.m_pageToDisplay = i5923[80]
  i5922.m_margin = new pc.Vec4( i5923[81], i5923[82], i5923[83], i5923[84] )
  i5922.m_isUsingLegacyAnimationComponent = !!i5923[85]
  i5922.m_isVolumetricText = !!i5923[86]
  request.r(i5923[87], i5923[88], 0, i5922, 'm_Material')
  i5922.m_EmojiFallbackSupport = !!i5923[89]
  i5922.m_Maskable = !!i5923[90]
  i5922.m_Color = new pc.Color(i5923[91], i5923[92], i5923[93], i5923[94])
  i5922.m_RaycastTarget = !!i5923[95]
  i5922.m_RaycastPadding = new pc.Vec4( i5923[96], i5923[97], i5923[98], i5923[99] )
  return i5922
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i5930 = root || request.c( 'TMPro.VertexGradient' )
  var i5931 = data
  i5930.topLeft = new pc.Color(i5931[0], i5931[1], i5931[2], i5931[3])
  i5930.topRight = new pc.Color(i5931[4], i5931[5], i5931[6], i5931[7])
  i5930.bottomLeft = new pc.Color(i5931[8], i5931[9], i5931[10], i5931[11])
  i5930.bottomRight = new pc.Color(i5931[12], i5931[13], i5931[14], i5931[15])
  return i5930
}

Deserializers["StealPrompt"] = function (request, data, root) {
  var i5934 = root || request.c( 'StealPrompt' )
  var i5935 = data
  request.r(i5935[0], i5935[1], 0, i5934, 'rect')
  request.r(i5935[2], i5935[3], 0, i5934, 'canvasRect')
  request.r(i5935[4], i5935[5], 0, i5934, 'worldCamera')
  request.r(i5935[6], i5935[7], 0, i5934, 'fill')
  i5934.worldOffset = new pc.Vec3( i5935[8], i5935[9], i5935[10] )
  return i5934
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i5936 = root || request.c( 'UnityEngine.UI.Mask' )
  var i5937 = data
  i5936.m_ShowMaskGraphic = !!i5937[0]
  return i5936
}

Deserializers["PulseScale"] = function (request, data, root) {
  var i5938 = root || request.c( 'PulseScale' )
  var i5939 = data
  i5938.minScale = i5939[0]
  i5938.maxScale = i5939[1]
  i5938.period = i5939[2]
  return i5938
}

Deserializers["FirstClickCta"] = function (request, data, root) {
  var i5940 = root || request.c( 'FirstClickCta' )
  var i5941 = data
  request.r(i5941[0], i5941[1], 0, i5940, 'luna')
  return i5940
}

Deserializers["BillboardGroup"] = function (request, data, root) {
  var i5942 = root || request.c( 'BillboardGroup' )
  var i5943 = data
  request.r(i5943[0], i5943[1], 0, i5942, 'cameraTransform')
  var i5945 = i5943[2]
  var i5944 = []
  for(var i = 0; i < i5945.length; i += 2) {
  request.r(i5945[i + 0], i5945[i + 1], 2, i5944, '')
  }
  i5942.items = i5944
  return i5942
}

Deserializers["GameController"] = function (request, data, root) {
  var i5946 = root || request.c( 'GameController' )
  var i5947 = data
  request.r(i5947[0], i5947[1], 0, i5946, 'luna')
  request.r(i5947[2], i5947[3], 0, i5946, 'player')
  request.r(i5947[4], i5947[5], 0, i5946, 'motor')
  request.r(i5947[6], i5947[7], 0, i5946, 'nest')
  request.r(i5947[8], i5947[9], 0, i5946, 'spooky')
  request.r(i5947[10], i5947[11], 0, i5946, 'guide')
  request.r(i5947[12], i5947[13], 0, i5946, 'stealPrompt')
  request.r(i5947[14], i5947[15], 0, i5946, 'tutorial')
  request.r(i5947[16], i5947[17], 0, i5946, 'cameraRig')
  i5946.caughtShakeStrength = i5947[18]
  i5946.caughtShakeTime = i5947[19]
  request.r(i5947[20], i5947[21], 0, i5946, 'homeArea')
  i5946.homeSize = new pc.Vec2( i5947[22], i5947[23] )
  request.r(i5947[24], i5947[25], 0, i5946, 'homeTarget')
  request.r(i5947[26], i5947[27], 0, i5946, 'homeEggs')
  request.r(i5947[28], i5947[29], 0, i5946, 'homeNest')
  request.r(i5947[30], i5947[31], 0, i5946, 'homeEgg')
  var i5949 = i5947[32]
  var i5948 = []
  for(var i = 0; i < i5949.length; i += 2) {
  request.r(i5949[i + 0], i5949[i + 1], 2, i5948, '')
  }
  i5946.playerEggItems = i5948
  i5946.standDistance = i5947[33]
  i5946.walkSpeed = i5947[34]
  i5946.walkTimeout = i5947[35]
  i5946.turnTime = i5947[36]
  i5946.placeTime = i5947[37]
  i5946.placeArcHeight = i5947[38]
  i5946.endUIDelay = i5947[39]
  request.r(i5947[40], i5947[41], 0, i5946, 'winConfetti')
  i5946.deliverCameraPitch = i5947[42]
  i5946.deliverCameraSide = i5947[43]
  i5946.deliverCameraTurn = i5947[44]
  i5946.stealRadius = i5947[45]
  i5946.stealHoldTime = i5947[46]
  var i5951 = i5947[47]
  var i5950 = []
  for(var i = 0; i < i5951.length; i += 2) {
  request.r(i5951[i + 0], i5951[i + 1], 2, i5950, '')
  }
  i5946.playerModels = i5950
  var i5953 = i5947[48]
  var i5952 = []
  for(var i = 0; i < i5953.length; i += 2) {
  request.r(i5953[i + 0], i5953[i + 1], 2, i5952, '')
  }
  i5946.playerAnimators = i5952
  var i5955 = i5947[49]
  var i5954 = []
  for(var i = 0; i < i5955.length; i += 2) {
  request.r(i5955[i + 0], i5955[i + 1], 2, i5954, '')
  }
  i5946.playerEggs = i5954
  i5946.playerRunAnimAt8 = i5947[50]
  i5946.playerLyingTime = i5947[51]
  i5946.playerStandUpTime = i5947[52]
  var i5957 = i5947[53]
  var i5956 = []
  for(var i = 0; i < i5957.length; i += 2) {
  request.r(i5957[i + 0], i5957[i + 1], 2, i5956, '')
  }
  i5946.spookyModels = i5956
  var i5959 = i5947[54]
  var i5958 = []
  for(var i = 0; i < i5959.length; i += 2) {
  request.r(i5959[i + 0], i5959[i + 1], 2, i5958, '')
  }
  i5946.spookyAnimators = i5958
  request.r(i5947[55], i5947[56], 0, i5946, 'title')
  request.r(i5947[57], i5947[58], 0, i5946, 'runBanner')
  request.r(i5947[59], i5947[60], 0, i5946, 'caughtFlash')
  i5946.caughtFlashAlpha = i5947[61]
  request.r(i5947[62], i5947[63], 0, i5946, 'sfx')
  request.r(i5947[64], i5947[65], 0, i5946, 'stealClip')
  request.r(i5947[66], i5947[67], 0, i5946, 'winClip')
  request.r(i5947[68], i5947[69], 0, i5946, 'winWowClip')
  request.r(i5947[70], i5947[71], 0, i5946, 'caughtClip')
  request.r(i5947[72], i5947[73], 0, i5946, 'chaseMusic')
  return i5946
}

Deserializers["StealEggTutorial"] = function (request, data, root) {
  var i5964 = root || request.c( 'StealEggTutorial' )
  var i5965 = data
  request.r(i5965[0], i5965[1], 0, i5964, 'motor')
  request.r(i5965[2], i5965[3], 0, i5964, 'cameraRig')
  request.r(i5965[4], i5965[5], 0, i5964, 'luna')
  request.r(i5965[6], i5965[7], 0, i5964, 'cameraHint')
  request.r(i5965[8], i5965[9], 0, i5964, 'cameraHand')
  i5964.swipeDistance = i5965[10]
  i5964.swipeTime = i5965[11]
  request.r(i5965[12], i5965[13], 0, i5964, 'cameraText')
  i5964.turnNeeded = i5965[14]
  request.r(i5965[15], i5965[16], 0, i5964, 'moveHint')
  request.r(i5965[17], i5965[18], 0, i5964, 'moveHand')
  i5964.moveRadius = i5965[19]
  request.r(i5965[20], i5965[21], 0, i5964, 'moveText')
  i5964.moveNeeded = i5965[22]
  request.r(i5965[23], i5965[24], 0, i5964, 'jumpText')
  request.r(i5965[25], i5965[26], 0, i5964, 'jumpHand')
  request.r(i5965[27], i5965[28], 0, i5964, 'jumpHandTarget')
  request.r(i5965[29], i5965[30], 0, i5964, 'title')
  request.r(i5965[31], i5965[32], 0, i5964, 'runBanner')
  request.r(i5965[33], i5965[34], 0, i5964, 'stealHand')
  request.r(i5965[35], i5965[36], 0, i5964, 'stealButton')
  request.r(i5965[37], i5965[38], 0, i5964, 'stealHandTarget')
  return i5964
}

Deserializers["NavGrid"] = function (request, data, root) {
  var i5966 = root || request.c( 'NavGrid' )
  var i5967 = data
  request.r(i5967[0], i5967[1], 0, i5966, 'data')
  i5966.maxExpanded = i5967[2]
  return i5966
}

Deserializers["LunaController"] = function (request, data, root) {
  var i5968 = root || request.c( 'LunaController' )
  var i5969 = data
  i5968.LimitTimePlay = !!i5969[0]
  i5968.TimePlay = i5969[1]
  request.r(i5969[2], i5969[3], 0, i5968, 'BGM')
  i5968.TypePlayer = i5969[4]
  i5968.TypeSpooky = i5969[5]
  i5968.PlayerSpeed = i5969[6]
  i5968.SpookySpeed = i5969[7]
  i5968.PlayerResetCount = i5969[8]
  i5968.CtaMode = i5969[9]
  request.r(i5969[10], i5969[11], 0, i5968, 'musicSource')
  i5968.musicVolume = i5969[12]
  var i5971 = i5969[13]
  var i5970 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i5971.length; i += 2) {
  request.r(i5971[i + 0], i5971[i + 1], 1, i5970, '')
  }
  i5968.CTA = i5970
  request.r(i5969[14], i5969[15], 0, i5968, 'endUI')
  request.r(i5969[16], i5969[17], 0, i5968, 'endCard')
  request.r(i5969[18], i5969[19], 0, i5968, 'firstClickZone')
  return i5968
}

Deserializers["SkyDome"] = function (request, data, root) {
  var i5974 = root || request.c( 'SkyDome' )
  var i5975 = data
  request.r(i5975[0], i5975[1], 0, i5974, 'cameraTransform')
  return i5974
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i5976 = root || request.c( 'TMPro.TextMeshPro' )
  var i5977 = data
  i5976._SortingLayer = i5977[0]
  i5976._SortingLayerID = i5977[1]
  i5976._SortingOrder = i5977[2]
  i5976.m_hasFontAssetChanged = !!i5977[3]
  request.r(i5977[4], i5977[5], 0, i5976, 'm_renderer')
  i5976.m_maskType = i5977[6]
  i5976.m_text = i5977[7]
  i5976.m_isRightToLeft = !!i5977[8]
  request.r(i5977[9], i5977[10], 0, i5976, 'm_fontAsset')
  request.r(i5977[11], i5977[12], 0, i5976, 'm_sharedMaterial')
  var i5979 = i5977[13]
  var i5978 = []
  for(var i = 0; i < i5979.length; i += 2) {
  request.r(i5979[i + 0], i5979[i + 1], 2, i5978, '')
  }
  i5976.m_fontSharedMaterials = i5978
  request.r(i5977[14], i5977[15], 0, i5976, 'm_fontMaterial')
  var i5981 = i5977[16]
  var i5980 = []
  for(var i = 0; i < i5981.length; i += 2) {
  request.r(i5981[i + 0], i5981[i + 1], 2, i5980, '')
  }
  i5976.m_fontMaterials = i5980
  i5976.m_fontColor32 = UnityEngine.Color32.ConstructColor(i5977[17], i5977[18], i5977[19], i5977[20])
  i5976.m_fontColor = new pc.Color(i5977[21], i5977[22], i5977[23], i5977[24])
  i5976.m_enableVertexGradient = !!i5977[25]
  i5976.m_colorMode = i5977[26]
  i5976.m_fontColorGradient = request.d('TMPro.VertexGradient', i5977[27], i5976.m_fontColorGradient)
  request.r(i5977[28], i5977[29], 0, i5976, 'm_fontColorGradientPreset')
  request.r(i5977[30], i5977[31], 0, i5976, 'm_spriteAsset')
  i5976.m_tintAllSprites = !!i5977[32]
  request.r(i5977[33], i5977[34], 0, i5976, 'm_StyleSheet')
  i5976.m_TextStyleHashCode = i5977[35]
  i5976.m_overrideHtmlColors = !!i5977[36]
  i5976.m_faceColor = UnityEngine.Color32.ConstructColor(i5977[37], i5977[38], i5977[39], i5977[40])
  i5976.m_fontSize = i5977[41]
  i5976.m_fontSizeBase = i5977[42]
  i5976.m_fontWeight = i5977[43]
  i5976.m_enableAutoSizing = !!i5977[44]
  i5976.m_fontSizeMin = i5977[45]
  i5976.m_fontSizeMax = i5977[46]
  i5976.m_fontStyle = i5977[47]
  i5976.m_HorizontalAlignment = i5977[48]
  i5976.m_VerticalAlignment = i5977[49]
  i5976.m_textAlignment = i5977[50]
  i5976.m_characterSpacing = i5977[51]
  i5976.m_characterHorizontalScale = i5977[52]
  i5976.m_wordSpacing = i5977[53]
  i5976.m_lineSpacing = i5977[54]
  i5976.m_lineSpacingMax = i5977[55]
  i5976.m_paragraphSpacing = i5977[56]
  i5976.m_charWidthMaxAdj = i5977[57]
  i5976.m_TextWrappingMode = i5977[58]
  i5976.m_wordWrappingRatios = i5977[59]
  i5976.m_overflowMode = i5977[60]
  request.r(i5977[61], i5977[62], 0, i5976, 'm_linkedTextComponent')
  request.r(i5977[63], i5977[64], 0, i5976, 'parentLinkedComponent')
  i5976.m_enableKerning = !!i5977[65]
  var i5983 = i5977[66]
  var i5982 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i5983.length; i += 1) {
    i5982.add(i5983[i + 0]);
  }
  i5976.m_ActiveFontFeatures = i5982
  i5976.m_enableExtraPadding = !!i5977[67]
  i5976.checkPaddingRequired = !!i5977[68]
  i5976.m_isRichText = !!i5977[69]
  i5976.m_parseCtrlCharacters = !!i5977[70]
  i5976.m_isOrthographic = !!i5977[71]
  i5976.m_isCullingEnabled = !!i5977[72]
  i5976.m_horizontalMapping = i5977[73]
  i5976.m_verticalMapping = i5977[74]
  i5976.m_uvLineOffset = i5977[75]
  i5976.m_geometrySortingOrder = i5977[76]
  i5976.m_IsTextObjectScaleStatic = !!i5977[77]
  i5976.m_VertexBufferAutoSizeReduction = !!i5977[78]
  i5976.m_useMaxVisibleDescender = !!i5977[79]
  i5976.m_pageToDisplay = i5977[80]
  i5976.m_margin = new pc.Vec4( i5977[81], i5977[82], i5977[83], i5977[84] )
  i5976.m_isUsingLegacyAnimationComponent = !!i5977[85]
  i5976.m_isVolumetricText = !!i5977[86]
  request.r(i5977[87], i5977[88], 0, i5976, 'm_Material')
  i5976.m_EmojiFallbackSupport = !!i5977[89]
  i5976.m_Maskable = !!i5977[90]
  i5976.m_Color = new pc.Color(i5977[91], i5977[92], i5977[93], i5977[94])
  i5976.m_RaycastTarget = !!i5977[95]
  i5976.m_RaycastPadding = new pc.Vec4( i5977[96], i5977[97], i5977[98], i5977[99] )
  return i5976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i5984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i5985 = data
  i5984.ambientIntensity = i5985[0]
  i5984.reflectionIntensity = i5985[1]
  i5984.ambientMode = i5985[2]
  i5984.ambientLight = new pc.Color(i5985[3], i5985[4], i5985[5], i5985[6])
  i5984.ambientSkyColor = new pc.Color(i5985[7], i5985[8], i5985[9], i5985[10])
  i5984.ambientGroundColor = new pc.Color(i5985[11], i5985[12], i5985[13], i5985[14])
  i5984.ambientEquatorColor = new pc.Color(i5985[15], i5985[16], i5985[17], i5985[18])
  i5984.fogColor = new pc.Color(i5985[19], i5985[20], i5985[21], i5985[22])
  i5984.fogEndDistance = i5985[23]
  i5984.fogStartDistance = i5985[24]
  i5984.fogDensity = i5985[25]
  i5984.fog = !!i5985[26]
  request.r(i5985[27], i5985[28], 0, i5984, 'skybox')
  i5984.fogMode = i5985[29]
  var i5987 = i5985[30]
  var i5986 = []
  for(var i = 0; i < i5987.length; i += 1) {
    i5986.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i5987[i + 0]) );
  }
  i5984.lightmaps = i5986
  i5984.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i5985[31], i5984.lightProbes)
  i5984.lightmapsMode = i5985[32]
  i5984.mixedBakeMode = i5985[33]
  i5984.environmentLightingMode = i5985[34]
  i5984.ambientProbe = new pc.SphericalHarmonicsL2(i5985[35])
  request.r(i5985[36], i5985[37], 0, i5984, 'customReflection')
  request.r(i5985[38], i5985[39], 0, i5984, 'defaultReflection')
  i5984.defaultReflectionMode = i5985[40]
  i5984.defaultReflectionResolution = i5985[41]
  i5984.sunLightObjectId = i5985[42]
  i5984.pixelLightCount = i5985[43]
  i5984.defaultReflectionHDR = !!i5985[44]
  i5984.hasLightDataAsset = !!i5985[45]
  i5984.hasManualGenerate = !!i5985[46]
  return i5984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i5990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i5991 = data
  request.r(i5991[0], i5991[1], 0, i5990, 'lightmapColor')
  request.r(i5991[2], i5991[3], 0, i5990, 'lightmapDirection')
  request.r(i5991[4], i5991[5], 0, i5990, 'shadowMask')
  return i5990
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i5992 = root || new UnityEngine.LightProbes()
  var i5993 = data
  return i5992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i5998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i5999 = data
  var i6001 = i5999[0]
  var i6000 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i6001.length; i += 1) {
    i6000.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i6001[i + 0]));
  }
  i5998.ShaderCompilationErrors = i6000
  i5998.name = i5999[1]
  i5998.guid = i5999[2]
  var i6003 = i5999[3]
  var i6002 = []
  for(var i = 0; i < i6003.length; i += 1) {
    i6002.push( i6003[i + 0] );
  }
  i5998.shaderDefinedKeywords = i6002
  var i6005 = i5999[4]
  var i6004 = []
  for(var i = 0; i < i6005.length; i += 1) {
    i6004.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i6005[i + 0]) );
  }
  i5998.passes = i6004
  var i6007 = i5999[5]
  var i6006 = []
  for(var i = 0; i < i6007.length; i += 1) {
    i6006.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i6007[i + 0]) );
  }
  i5998.usePasses = i6006
  var i6009 = i5999[6]
  var i6008 = []
  for(var i = 0; i < i6009.length; i += 1) {
    i6008.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i6009[i + 0]) );
  }
  i5998.defaultParameterValues = i6008
  request.r(i5999[7], i5999[8], 0, i5998, 'unityFallbackShader')
  i5998.readDepth = !!i5999[9]
  i5998.hasDepthOnlyPass = !!i5999[10]
  i5998.isCreatedByShaderGraph = !!i5999[11]
  i5998.disableBatching = !!i5999[12]
  i5998.compiled = !!i5999[13]
  return i5998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i6012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i6013 = data
  i6012.shaderName = i6013[0]
  i6012.errorMessage = i6013[1]
  return i6012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i6018 = root || new pc.UnityShaderPass()
  var i6019 = data
  i6018.id = i6019[0]
  i6018.subShaderIndex = i6019[1]
  i6018.name = i6019[2]
  i6018.passType = i6019[3]
  i6018.grabPassTextureName = i6019[4]
  i6018.usePass = !!i6019[5]
  i6018.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[6], i6018.zTest)
  i6018.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[7], i6018.zWrite)
  i6018.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[8], i6018.culling)
  i6018.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i6019[9], i6018.blending)
  i6018.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i6019[10], i6018.alphaBlending)
  i6018.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[11], i6018.colorWriteMask)
  i6018.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[12], i6018.offsetUnits)
  i6018.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[13], i6018.offsetFactor)
  i6018.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[14], i6018.stencilRef)
  i6018.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[15], i6018.stencilReadMask)
  i6018.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6019[16], i6018.stencilWriteMask)
  i6018.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6019[17], i6018.stencilOp)
  i6018.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6019[18], i6018.stencilOpFront)
  i6018.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6019[19], i6018.stencilOpBack)
  var i6021 = i6019[20]
  var i6020 = []
  for(var i = 0; i < i6021.length; i += 1) {
    i6020.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i6021[i + 0]) );
  }
  i6018.tags = i6020
  var i6023 = i6019[21]
  var i6022 = []
  for(var i = 0; i < i6023.length; i += 1) {
    i6022.push( i6023[i + 0] );
  }
  i6018.passDefinedKeywords = i6022
  var i6025 = i6019[22]
  var i6024 = []
  for(var i = 0; i < i6025.length; i += 1) {
    i6024.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i6025[i + 0]) );
  }
  i6018.passDefinedKeywordGroups = i6024
  var i6027 = i6019[23]
  var i6026 = []
  for(var i = 0; i < i6027.length; i += 1) {
    i6026.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i6027[i + 0]) );
  }
  i6018.variants = i6026
  var i6029 = i6019[24]
  var i6028 = []
  for(var i = 0; i < i6029.length; i += 1) {
    i6028.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i6029[i + 0]) );
  }
  i6018.excludedVariants = i6028
  i6018.hasDepthReader = !!i6019[25]
  return i6018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i6030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i6031 = data
  i6030.val = i6031[0]
  i6030.name = i6031[1]
  return i6030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i6032 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i6033 = data
  i6032.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6033[0], i6032.src)
  i6032.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6033[1], i6032.dst)
  i6032.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6033[2], i6032.op)
  return i6032
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i6034 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i6035 = data
  i6034.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6035[0], i6034.pass)
  i6034.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6035[1], i6034.fail)
  i6034.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6035[2], i6034.zFail)
  i6034.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6035[3], i6034.comp)
  return i6034
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i6038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i6039 = data
  i6038.name = i6039[0]
  i6038.value = i6039[1]
  return i6038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i6042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i6043 = data
  var i6045 = i6043[0]
  var i6044 = []
  for(var i = 0; i < i6045.length; i += 1) {
    i6044.push( i6045[i + 0] );
  }
  i6042.keywords = i6044
  i6042.hasDiscard = !!i6043[1]
  return i6042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i6048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i6049 = data
  i6048.passId = i6049[0]
  i6048.subShaderIndex = i6049[1]
  var i6051 = i6049[2]
  var i6050 = []
  for(var i = 0; i < i6051.length; i += 1) {
    i6050.push( i6051[i + 0] );
  }
  i6048.keywords = i6050
  i6048.vertexProgram = i6049[3]
  i6048.fragmentProgram = i6049[4]
  i6048.exportedForWebGl2 = !!i6049[5]
  i6048.readDepth = !!i6049[6]
  return i6048
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i6054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i6055 = data
  request.r(i6055[0], i6055[1], 0, i6054, 'shader')
  i6054.pass = i6055[2]
  return i6054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i6058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i6059 = data
  i6058.name = i6059[0]
  i6058.type = i6059[1]
  i6058.value = new pc.Vec4( i6059[2], i6059[3], i6059[4], i6059[5] )
  i6058.textureValue = i6059[6]
  i6058.shaderPropertyFlag = i6059[7]
  return i6058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i6060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i6061 = data
  i6060.name = i6061[0]
  request.r(i6061[1], i6061[2], 0, i6060, 'texture')
  i6060.aabb = i6061[3]
  i6060.vertices = i6061[4]
  i6060.triangles = i6061[5]
  i6060.textureRect = UnityEngine.Rect.MinMaxRect(i6061[6], i6061[7], i6061[8], i6061[9])
  i6060.packedRect = UnityEngine.Rect.MinMaxRect(i6061[10], i6061[11], i6061[12], i6061[13])
  i6060.border = new pc.Vec4( i6061[14], i6061[15], i6061[16], i6061[17] )
  i6060.transparency = i6061[18]
  i6060.bounds = i6061[19]
  i6060.pixelsPerUnit = i6061[20]
  i6060.textureWidth = i6061[21]
  i6060.textureHeight = i6061[22]
  i6060.nativeSize = new pc.Vec2( i6061[23], i6061[24] )
  i6060.pivot = new pc.Vec2( i6061[25], i6061[26] )
  i6060.textureRectOffset = new pc.Vec2( i6061[27], i6061[28] )
  return i6060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i6062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i6063 = data
  i6062.name = i6063[0]
  return i6062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i6064 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i6065 = data
  i6064.name = i6065[0]
  i6064.wrapMode = i6065[1]
  i6064.isLooping = !!i6065[2]
  i6064.length = i6065[3]
  var i6067 = i6065[4]
  var i6066 = []
  for(var i = 0; i < i6067.length; i += 1) {
    i6066.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i6067[i + 0]) );
  }
  i6064.curves = i6066
  var i6069 = i6065[5]
  var i6068 = []
  for(var i = 0; i < i6069.length; i += 1) {
    i6068.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i6069[i + 0]) );
  }
  i6064.events = i6068
  i6064.halfPrecision = !!i6065[6]
  i6064._frameRate = i6065[7]
  i6064.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i6065[8], i6064.localBounds)
  i6064.hasMuscleCurves = !!i6065[9]
  var i6071 = i6065[10]
  var i6070 = []
  for(var i = 0; i < i6071.length; i += 1) {
    i6070.push( i6071[i + 0] );
  }
  i6064.clipMuscleConstant = i6070
  i6064.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i6065[11], i6064.clipBindingConstant)
  return i6064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i6074 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i6075 = data
  i6074.path = i6075[0]
  i6074.hash = i6075[1]
  i6074.componentType = i6075[2]
  i6074.property = i6075[3]
  i6074.keys = i6075[4]
  var i6077 = i6075[5]
  var i6076 = []
  for(var i = 0; i < i6077.length; i += 1) {
    i6076.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i6077[i + 0]) );
  }
  i6074.objectReferenceKeys = i6076
  return i6074
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i6080 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i6081 = data
  i6080.time = i6081[0]
  request.r(i6081[1], i6081[2], 0, i6080, 'value')
  return i6080
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i6084 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i6085 = data
  i6084.functionName = i6085[0]
  i6084.floatParameter = i6085[1]
  i6084.intParameter = i6085[2]
  i6084.stringParameter = i6085[3]
  request.r(i6085[4], i6085[5], 0, i6084, 'objectReferenceParameter')
  i6084.time = i6085[6]
  return i6084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i6086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i6087 = data
  i6086.center = new pc.Vec3( i6087[0], i6087[1], i6087[2] )
  i6086.extends = new pc.Vec3( i6087[3], i6087[4], i6087[5] )
  return i6086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i6090 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i6091 = data
  var i6093 = i6091[0]
  var i6092 = []
  for(var i = 0; i < i6093.length; i += 1) {
    i6092.push( i6093[i + 0] );
  }
  i6090.genericBindings = i6092
  var i6095 = i6091[1]
  var i6094 = []
  for(var i = 0; i < i6095.length; i += 1) {
    i6094.push( i6095[i + 0] );
  }
  i6090.pptrCurveMapping = i6094
  return i6090
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i6096 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i6097 = data
  i6096.name = i6097[0]
  var i6099 = i6097[1]
  var i6098 = []
  for(var i = 0; i < i6099.length; i += 1) {
    i6098.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i6099[i + 0]) );
  }
  i6096.layers = i6098
  var i6101 = i6097[2]
  var i6100 = []
  for(var i = 0; i < i6101.length; i += 1) {
    i6100.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i6101[i + 0]) );
  }
  i6096.parameters = i6100
  i6096.animationClips = i6097[3]
  i6096.avatarUnsupported = i6097[4]
  return i6096
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i6104 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i6105 = data
  i6104.name = i6105[0]
  i6104.defaultWeight = i6105[1]
  i6104.blendingMode = i6105[2]
  i6104.avatarMask = i6105[3]
  i6104.syncedLayerIndex = i6105[4]
  i6104.syncedLayerAffectsTiming = !!i6105[5]
  i6104.syncedLayers = i6105[6]
  i6104.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i6105[7], i6104.stateMachine)
  return i6104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i6106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i6107 = data
  i6106.id = i6107[0]
  i6106.name = i6107[1]
  i6106.path = i6107[2]
  var i6109 = i6107[3]
  var i6108 = []
  for(var i = 0; i < i6109.length; i += 1) {
    i6108.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i6109[i + 0]) );
  }
  i6106.states = i6108
  var i6111 = i6107[4]
  var i6110 = []
  for(var i = 0; i < i6111.length; i += 1) {
    i6110.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i6111[i + 0]) );
  }
  i6106.machines = i6110
  var i6113 = i6107[5]
  var i6112 = []
  for(var i = 0; i < i6113.length; i += 1) {
    i6112.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i6113[i + 0]) );
  }
  i6106.entryStateTransitions = i6112
  var i6115 = i6107[6]
  var i6114 = []
  for(var i = 0; i < i6115.length; i += 1) {
    i6114.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i6115[i + 0]) );
  }
  i6106.exitStateTransitions = i6114
  var i6117 = i6107[7]
  var i6116 = []
  for(var i = 0; i < i6117.length; i += 1) {
    i6116.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i6117[i + 0]) );
  }
  i6106.anyStateTransitions = i6116
  i6106.defaultStateId = i6107[8]
  return i6106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i6120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i6121 = data
  i6120.id = i6121[0]
  i6120.name = i6121[1]
  i6120.cycleOffset = i6121[2]
  i6120.cycleOffsetParameter = i6121[3]
  i6120.cycleOffsetParameterActive = !!i6121[4]
  i6120.mirror = !!i6121[5]
  i6120.mirrorParameter = i6121[6]
  i6120.mirrorParameterActive = !!i6121[7]
  i6120.motionId = i6121[8]
  i6120.nameHash = i6121[9]
  i6120.fullPathHash = i6121[10]
  i6120.speed = i6121[11]
  i6120.speedParameter = i6121[12]
  i6120.speedParameterActive = !!i6121[13]
  i6120.tag = i6121[14]
  i6120.tagHash = i6121[15]
  i6120.writeDefaultValues = !!i6121[16]
  var i6123 = i6121[17]
  var i6122 = []
  for(var i = 0; i < i6123.length; i += 2) {
  request.r(i6123[i + 0], i6123[i + 1], 2, i6122, '')
  }
  i6120.behaviours = i6122
  var i6125 = i6121[18]
  var i6124 = []
  for(var i = 0; i < i6125.length; i += 1) {
    i6124.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i6125[i + 0]) );
  }
  i6120.transitions = i6124
  return i6120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i6130 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i6131 = data
  i6130.fullPath = i6131[0]
  i6130.canTransitionToSelf = !!i6131[1]
  i6130.duration = i6131[2]
  i6130.exitTime = i6131[3]
  i6130.hasExitTime = !!i6131[4]
  i6130.hasFixedDuration = !!i6131[5]
  i6130.interruptionSource = i6131[6]
  i6130.offset = i6131[7]
  i6130.orderedInterruption = !!i6131[8]
  i6130.destinationStateId = i6131[9]
  i6130.isExit = !!i6131[10]
  i6130.mute = !!i6131[11]
  i6130.solo = !!i6131[12]
  var i6133 = i6131[13]
  var i6132 = []
  for(var i = 0; i < i6133.length; i += 1) {
    i6132.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i6133[i + 0]) );
  }
  i6130.conditions = i6132
  return i6130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i6138 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i6139 = data
  i6138.destinationStateId = i6139[0]
  i6138.isExit = !!i6139[1]
  i6138.mute = !!i6139[2]
  i6138.solo = !!i6139[3]
  var i6141 = i6139[4]
  var i6140 = []
  for(var i = 0; i < i6141.length; i += 1) {
    i6140.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i6141[i + 0]) );
  }
  i6138.conditions = i6140
  return i6138
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i6144 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i6145 = data
  i6144.defaultBool = !!i6145[0]
  i6144.defaultFloat = i6145[1]
  i6144.defaultInt = i6145[2]
  i6144.name = i6145[3]
  i6144.nameHash = i6145[4]
  i6144.type = i6145[5]
  return i6144
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i6148 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i6149 = data
  i6148.mode = i6149[0]
  i6148.parameter = i6149[1]
  i6148.threshold = i6149[2]
  return i6148
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i6150 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i6151 = data
  i6150.name = i6151[0]
  i6150.bytes64 = i6151[1]
  i6150.data = i6151[2]
  return i6150
}

Deserializers["NavGridData"] = function (request, data, root) {
  var i6152 = root || request.c( 'NavGridData' )
  var i6153 = data
  i6152.origin = new pc.Vec3( i6153[0], i6153[1], i6153[2] )
  i6152.cellSize = i6153[3]
  i6152.sizeX = i6153[4]
  i6152.sizeZ = i6153[5]
  i6152.minHeight = i6153[6]
  i6152.heightStep = i6153[7]
  var i6155 = i6153[8]
  var i6154 = []
  for(var i = 0; i < i6155.length; i += 1) {
    i6154.push( i6155[i + 0] );
  }
  i6152.walkable = i6154
  var i6157 = i6153[9]
  var i6156 = []
  for(var i = 0; i < i6157.length; i += 1) {
    i6156.push( i6157[i + 0] );
  }
  i6152.heights = i6156
  return i6152
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i6158 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i6159 = data
  i6158.normalStyle = i6159[0]
  i6158.normalSpacingOffset = i6159[1]
  i6158.boldStyle = i6159[2]
  i6158.boldSpacing = i6159[3]
  i6158.italicStyle = i6159[4]
  i6158.tabSize = i6159[5]
  request.r(i6159[6], i6159[7], 0, i6158, 'atlas')
  i6158.m_SourceFontFileGUID = i6159[8]
  i6158.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i6159[9], i6158.m_CreationSettings)
  request.r(i6159[10], i6159[11], 0, i6158, 'm_SourceFontFile')
  i6158.m_SourceFontFilePath = i6159[12]
  i6158.m_AtlasPopulationMode = i6159[13]
  i6158.InternalDynamicOS = !!i6159[14]
  var i6161 = i6159[15]
  var i6160 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i6161.length; i += 1) {
    i6160.add(request.d('UnityEngine.TextCore.Glyph', i6161[i + 0]));
  }
  i6158.m_GlyphTable = i6160
  var i6163 = i6159[16]
  var i6162 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i6163.length; i += 1) {
    i6162.add(request.d('TMPro.TMP_Character', i6163[i + 0]));
  }
  i6158.m_CharacterTable = i6162
  var i6165 = i6159[17]
  var i6164 = []
  for(var i = 0; i < i6165.length; i += 2) {
  request.r(i6165[i + 0], i6165[i + 1], 2, i6164, '')
  }
  i6158.m_AtlasTextures = i6164
  i6158.m_AtlasTextureIndex = i6159[18]
  i6158.m_IsMultiAtlasTexturesEnabled = !!i6159[19]
  i6158.m_GetFontFeatures = !!i6159[20]
  i6158.m_ClearDynamicDataOnBuild = !!i6159[21]
  i6158.m_AtlasWidth = i6159[22]
  i6158.m_AtlasHeight = i6159[23]
  i6158.m_AtlasPadding = i6159[24]
  i6158.m_AtlasRenderMode = i6159[25]
  var i6167 = i6159[26]
  var i6166 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i6167.length; i += 1) {
    i6166.add(request.d('UnityEngine.TextCore.GlyphRect', i6167[i + 0]));
  }
  i6158.m_UsedGlyphRects = i6166
  var i6169 = i6159[27]
  var i6168 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i6169.length; i += 1) {
    i6168.add(request.d('UnityEngine.TextCore.GlyphRect', i6169[i + 0]));
  }
  i6158.m_FreeGlyphRects = i6168
  i6158.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i6159[28], i6158.m_FontFeatureTable)
  i6158.m_ShouldReimportFontFeatures = !!i6159[29]
  var i6171 = i6159[30]
  var i6170 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6171.length; i += 2) {
  request.r(i6171[i + 0], i6171[i + 1], 1, i6170, '')
  }
  i6158.m_FallbackFontAssetTable = i6170
  var i6173 = i6159[31]
  var i6172 = []
  for(var i = 0; i < i6173.length; i += 1) {
    i6172.push( request.d('TMPro.TMP_FontWeightPair', i6173[i + 0]) );
  }
  i6158.m_FontWeightTable = i6172
  var i6175 = i6159[32]
  var i6174 = []
  for(var i = 0; i < i6175.length; i += 1) {
    i6174.push( request.d('TMPro.TMP_FontWeightPair', i6175[i + 0]) );
  }
  i6158.fontWeights = i6174
  i6158.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i6159[33], i6158.m_fontInfo)
  var i6177 = i6159[34]
  var i6176 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i6177.length; i += 1) {
    i6176.add(request.d('TMPro.TMP_Glyph', i6177[i + 0]));
  }
  i6158.m_glyphInfoList = i6176
  i6158.m_KerningTable = request.d('TMPro.KerningTable', i6159[35], i6158.m_KerningTable)
  var i6179 = i6159[36]
  var i6178 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6179.length; i += 2) {
  request.r(i6179[i + 0], i6179[i + 1], 1, i6178, '')
  }
  i6158.fallbackFontAssets = i6178
  i6158.m_Version = i6159[37]
  i6158.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i6159[38], i6158.m_FaceInfo)
  request.r(i6159[39], i6159[40], 0, i6158, 'm_Material')
  return i6158
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i6180 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i6181 = data
  i6180.sourceFontFileName = i6181[0]
  i6180.sourceFontFileGUID = i6181[1]
  i6180.faceIndex = i6181[2]
  i6180.pointSizeSamplingMode = i6181[3]
  i6180.pointSize = i6181[4]
  i6180.padding = i6181[5]
  i6180.paddingMode = i6181[6]
  i6180.packingMode = i6181[7]
  i6180.atlasWidth = i6181[8]
  i6180.atlasHeight = i6181[9]
  i6180.characterSetSelectionMode = i6181[10]
  i6180.characterSequence = i6181[11]
  i6180.referencedFontAssetGUID = i6181[12]
  i6180.referencedTextAssetGUID = i6181[13]
  i6180.fontStyle = i6181[14]
  i6180.fontStyleModifier = i6181[15]
  i6180.renderMode = i6181[16]
  i6180.includeFontFeatures = !!i6181[17]
  return i6180
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i6184 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i6185 = data
  i6184.m_Index = i6185[0]
  i6184.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i6185[1], i6184.m_Metrics)
  i6184.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i6185[2], i6184.m_GlyphRect)
  i6184.m_Scale = i6185[3]
  i6184.m_AtlasIndex = i6185[4]
  i6184.m_ClassDefinitionType = i6185[5]
  return i6184
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i6186 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i6187 = data
  i6186.m_Width = i6187[0]
  i6186.m_Height = i6187[1]
  i6186.m_HorizontalBearingX = i6187[2]
  i6186.m_HorizontalBearingY = i6187[3]
  i6186.m_HorizontalAdvance = i6187[4]
  return i6186
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i6188 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i6189 = data
  i6188.m_X = i6189[0]
  i6188.m_Y = i6189[1]
  i6188.m_Width = i6189[2]
  i6188.m_Height = i6189[3]
  return i6188
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i6192 = root || request.c( 'TMPro.TMP_Character' )
  var i6193 = data
  i6192.m_ElementType = i6193[0]
  i6192.m_Unicode = i6193[1]
  i6192.m_GlyphIndex = i6193[2]
  i6192.m_Scale = i6193[3]
  return i6192
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i6198 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i6199 = data
  var i6201 = i6199[0]
  var i6200 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i6201.length; i += 1) {
    i6200.add(request.d('TMPro.MultipleSubstitutionRecord', i6201[i + 0]));
  }
  i6198.m_MultipleSubstitutionRecords = i6200
  var i6203 = i6199[1]
  var i6202 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i6203.length; i += 1) {
    i6202.add(request.d('TMPro.LigatureSubstitutionRecord', i6203[i + 0]));
  }
  i6198.m_LigatureSubstitutionRecords = i6202
  var i6205 = i6199[2]
  var i6204 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i6205.length; i += 1) {
    i6204.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i6205[i + 0]));
  }
  i6198.m_GlyphPairAdjustmentRecords = i6204
  var i6207 = i6199[3]
  var i6206 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i6207.length; i += 1) {
    i6206.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i6207[i + 0]));
  }
  i6198.m_MarkToBaseAdjustmentRecords = i6206
  var i6209 = i6199[4]
  var i6208 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i6209.length; i += 1) {
    i6208.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i6209[i + 0]));
  }
  i6198.m_MarkToMarkAdjustmentRecords = i6208
  return i6198
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i6212 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i6213 = data
  i6212.m_TargetGlyphID = i6213[0]
  i6212.m_SubstituteGlyphIDs = i6213[1]
  return i6212
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i6216 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i6217 = data
  i6216.m_ComponentGlyphIDs = i6217[0]
  i6216.m_LigatureGlyphID = i6217[1]
  return i6216
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i6220 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i6221 = data
  i6220.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i6221[0], i6220.m_FirstAdjustmentRecord)
  i6220.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i6221[1], i6220.m_SecondAdjustmentRecord)
  i6220.m_FeatureLookupFlags = i6221[2]
  return i6220
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i6224 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i6225 = data
  i6224.m_BaseGlyphID = i6225[0]
  i6224.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i6225[1], i6224.m_BaseGlyphAnchorPoint)
  i6224.m_MarkGlyphID = i6225[2]
  i6224.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i6225[3], i6224.m_MarkPositionAdjustment)
  return i6224
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i6228 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i6229 = data
  i6228.m_BaseMarkGlyphID = i6229[0]
  i6228.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i6229[1], i6228.m_BaseMarkGlyphAnchorPoint)
  i6228.m_CombiningMarkGlyphID = i6229[2]
  i6228.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i6229[3], i6228.m_CombiningMarkPositionAdjustment)
  return i6228
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i6234 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i6235 = data
  request.r(i6235[0], i6235[1], 0, i6234, 'regularTypeface')
  request.r(i6235[2], i6235[3], 0, i6234, 'italicTypeface')
  return i6234
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i6236 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i6237 = data
  i6236.Name = i6237[0]
  i6236.PointSize = i6237[1]
  i6236.Scale = i6237[2]
  i6236.CharacterCount = i6237[3]
  i6236.LineHeight = i6237[4]
  i6236.Baseline = i6237[5]
  i6236.Ascender = i6237[6]
  i6236.CapHeight = i6237[7]
  i6236.Descender = i6237[8]
  i6236.CenterLine = i6237[9]
  i6236.SuperscriptOffset = i6237[10]
  i6236.SubscriptOffset = i6237[11]
  i6236.SubSize = i6237[12]
  i6236.Underline = i6237[13]
  i6236.UnderlineThickness = i6237[14]
  i6236.strikethrough = i6237[15]
  i6236.strikethroughThickness = i6237[16]
  i6236.TabWidth = i6237[17]
  i6236.Padding = i6237[18]
  i6236.AtlasWidth = i6237[19]
  i6236.AtlasHeight = i6237[20]
  return i6236
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i6240 = root || request.c( 'TMPro.TMP_Glyph' )
  var i6241 = data
  i6240.id = i6241[0]
  i6240.x = i6241[1]
  i6240.y = i6241[2]
  i6240.width = i6241[3]
  i6240.height = i6241[4]
  i6240.xOffset = i6241[5]
  i6240.yOffset = i6241[6]
  i6240.xAdvance = i6241[7]
  i6240.scale = i6241[8]
  return i6240
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i6242 = root || request.c( 'TMPro.KerningTable' )
  var i6243 = data
  var i6245 = i6243[0]
  var i6244 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i6245.length; i += 1) {
    i6244.add(request.d('TMPro.KerningPair', i6245[i + 0]));
  }
  i6242.kerningPairs = i6244
  return i6242
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i6248 = root || request.c( 'TMPro.KerningPair' )
  var i6249 = data
  i6248.xOffset = i6249[0]
  i6248.m_FirstGlyph = i6249[1]
  i6248.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i6249[2], i6248.m_FirstGlyphAdjustments)
  i6248.m_SecondGlyph = i6249[3]
  i6248.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i6249[4], i6248.m_SecondGlyphAdjustments)
  i6248.m_IgnoreSpacingAdjustments = !!i6249[5]
  return i6248
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i6250 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i6251 = data
  i6250.m_FaceIndex = i6251[0]
  i6250.m_FamilyName = i6251[1]
  i6250.m_StyleName = i6251[2]
  i6250.m_PointSize = i6251[3]
  i6250.m_Scale = i6251[4]
  i6250.m_UnitsPerEM = i6251[5]
  i6250.m_LineHeight = i6251[6]
  i6250.m_AscentLine = i6251[7]
  i6250.m_CapLine = i6251[8]
  i6250.m_MeanLine = i6251[9]
  i6250.m_Baseline = i6251[10]
  i6250.m_DescentLine = i6251[11]
  i6250.m_SuperscriptOffset = i6251[12]
  i6250.m_SuperscriptSize = i6251[13]
  i6250.m_SubscriptOffset = i6251[14]
  i6250.m_SubscriptSize = i6251[15]
  i6250.m_UnderlineOffset = i6251[16]
  i6250.m_UnderlineThickness = i6251[17]
  i6250.m_StrikethroughOffset = i6251[18]
  i6250.m_StrikethroughThickness = i6251[19]
  i6250.m_TabWidth = i6251[20]
  return i6250
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i6252 = root || request.c( 'TMPro.TMP_Settings' )
  var i6253 = data
  i6252.assetVersion = i6253[0]
  i6252.m_TextWrappingMode = i6253[1]
  i6252.m_enableKerning = !!i6253[2]
  var i6255 = i6253[3]
  var i6254 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i6255.length; i += 1) {
    i6254.add(i6255[i + 0]);
  }
  i6252.m_ActiveFontFeatures = i6254
  i6252.m_enableExtraPadding = !!i6253[4]
  i6252.m_enableTintAllSprites = !!i6253[5]
  i6252.m_enableParseEscapeCharacters = !!i6253[6]
  i6252.m_EnableRaycastTarget = !!i6253[7]
  i6252.m_GetFontFeaturesAtRuntime = !!i6253[8]
  i6252.m_missingGlyphCharacter = i6253[9]
  i6252.m_ClearDynamicDataOnBuild = !!i6253[10]
  i6252.m_warningsDisabled = !!i6253[11]
  request.r(i6253[12], i6253[13], 0, i6252, 'm_defaultFontAsset')
  i6252.m_defaultFontAssetPath = i6253[14]
  i6252.m_defaultFontSize = i6253[15]
  i6252.m_defaultAutoSizeMinRatio = i6253[16]
  i6252.m_defaultAutoSizeMaxRatio = i6253[17]
  i6252.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i6253[18], i6253[19] )
  i6252.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i6253[20], i6253[21] )
  i6252.m_autoSizeTextContainer = !!i6253[22]
  i6252.m_IsTextObjectScaleStatic = !!i6253[23]
  var i6257 = i6253[24]
  var i6256 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6257.length; i += 2) {
  request.r(i6257[i + 0], i6257[i + 1], 1, i6256, '')
  }
  i6252.m_fallbackFontAssets = i6256
  i6252.m_matchMaterialPreset = !!i6253[25]
  i6252.m_HideSubTextObjects = !!i6253[26]
  request.r(i6253[27], i6253[28], 0, i6252, 'm_defaultSpriteAsset')
  i6252.m_defaultSpriteAssetPath = i6253[29]
  i6252.m_enableEmojiSupport = !!i6253[30]
  i6252.m_MissingCharacterSpriteUnicode = i6253[31]
  var i6259 = i6253[32]
  var i6258 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i6259.length; i += 2) {
  request.r(i6259[i + 0], i6259[i + 1], 1, i6258, '')
  }
  i6252.m_EmojiFallbackTextAssets = i6258
  i6252.m_defaultColorGradientPresetsPath = i6253[33]
  request.r(i6253[34], i6253[35], 0, i6252, 'm_defaultStyleSheet')
  i6252.m_StyleSheetsResourcePath = i6253[36]
  request.r(i6253[37], i6253[38], 0, i6252, 'm_leadingCharacters')
  request.r(i6253[39], i6253[40], 0, i6252, 'm_followingCharacters')
  i6252.m_UseModernHangulLineBreakingRules = !!i6253[41]
  return i6252
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i6262 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i6263 = data
  request.r(i6263[0], i6263[1], 0, i6262, 'spriteSheet')
  var i6265 = i6263[2]
  var i6264 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i6265.length; i += 1) {
    i6264.add(request.d('TMPro.TMP_Sprite', i6265[i + 0]));
  }
  i6262.spriteInfoList = i6264
  var i6267 = i6263[3]
  var i6266 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i6267.length; i += 2) {
  request.r(i6267[i + 0], i6267[i + 1], 1, i6266, '')
  }
  i6262.fallbackSpriteAssets = i6266
  var i6269 = i6263[4]
  var i6268 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i6269.length; i += 1) {
    i6268.add(request.d('TMPro.TMP_SpriteCharacter', i6269[i + 0]));
  }
  i6262.m_SpriteCharacterTable = i6268
  var i6271 = i6263[5]
  var i6270 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i6271.length; i += 1) {
    i6270.add(request.d('TMPro.TMP_SpriteGlyph', i6271[i + 0]));
  }
  i6262.m_GlyphTable = i6270
  i6262.m_Version = i6263[6]
  i6262.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i6263[7], i6262.m_FaceInfo)
  request.r(i6263[8], i6263[9], 0, i6262, 'm_Material')
  return i6262
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i6274 = root || request.c( 'TMPro.TMP_Sprite' )
  var i6275 = data
  i6274.name = i6275[0]
  i6274.hashCode = i6275[1]
  i6274.unicode = i6275[2]
  i6274.pivot = new pc.Vec2( i6275[3], i6275[4] )
  request.r(i6275[5], i6275[6], 0, i6274, 'sprite')
  i6274.id = i6275[7]
  i6274.x = i6275[8]
  i6274.y = i6275[9]
  i6274.width = i6275[10]
  i6274.height = i6275[11]
  i6274.xOffset = i6275[12]
  i6274.yOffset = i6275[13]
  i6274.xAdvance = i6275[14]
  i6274.scale = i6275[15]
  return i6274
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i6280 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i6281 = data
  i6280.m_Name = i6281[0]
  i6280.m_ElementType = i6281[1]
  i6280.m_Unicode = i6281[2]
  i6280.m_GlyphIndex = i6281[3]
  i6280.m_Scale = i6281[4]
  return i6280
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i6284 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i6285 = data
  request.r(i6285[0], i6285[1], 0, i6284, 'sprite')
  i6284.m_Index = i6285[2]
  i6284.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i6285[3], i6284.m_Metrics)
  i6284.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i6285[4], i6284.m_GlyphRect)
  i6284.m_Scale = i6285[5]
  i6284.m_AtlasIndex = i6285[6]
  i6284.m_ClassDefinitionType = i6285[7]
  return i6284
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i6286 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i6287 = data
  var i6289 = i6287[0]
  var i6288 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i6289.length; i += 1) {
    i6288.add(request.d('TMPro.TMP_Style', i6289[i + 0]));
  }
  i6286.m_StyleList = i6288
  return i6286
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i6292 = root || request.c( 'TMPro.TMP_Style' )
  var i6293 = data
  i6292.m_Name = i6293[0]
  i6292.m_HashCode = i6293[1]
  i6292.m_OpeningDefinition = i6293[2]
  i6292.m_ClosingDefinition = i6293[3]
  i6292.m_OpeningTagArray = i6293[4]
  i6292.m_ClosingTagArray = i6293[5]
  return i6292
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i6294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i6295 = data
  var i6297 = i6295[0]
  var i6296 = []
  for(var i = 0; i < i6297.length; i += 1) {
    i6296.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i6297[i + 0]) );
  }
  i6294.files = i6296
  i6294.componentToPrefabIds = i6295[1]
  return i6294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i6300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i6301 = data
  i6300.path = i6301[0]
  request.r(i6301[1], i6301[2], 0, i6300, 'unityObject')
  return i6300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i6302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i6303 = data
  var i6305 = i6303[0]
  var i6304 = []
  for(var i = 0; i < i6305.length; i += 1) {
    i6304.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i6305[i + 0]) );
  }
  i6302.scriptsExecutionOrder = i6304
  var i6307 = i6303[1]
  var i6306 = []
  for(var i = 0; i < i6307.length; i += 1) {
    i6306.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i6307[i + 0]) );
  }
  i6302.sortingLayers = i6306
  var i6309 = i6303[2]
  var i6308 = []
  for(var i = 0; i < i6309.length; i += 1) {
    i6308.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i6309[i + 0]) );
  }
  i6302.cullingLayers = i6308
  i6302.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i6303[3], i6302.timeSettings)
  i6302.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i6303[4], i6302.physicsSettings)
  i6302.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i6303[5], i6302.physics2DSettings)
  i6302.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i6303[6], i6302.qualitySettings)
  i6302.enableRealtimeShadows = !!i6303[7]
  i6302.enableAutoInstancing = !!i6303[8]
  i6302.enableStaticBatching = !!i6303[9]
  i6302.enableDynamicBatching = !!i6303[10]
  i6302.usePreservativeDynamicBatching = !!i6303[11]
  i6302.lightmapEncodingQuality = i6303[12]
  i6302.desiredColorSpace = i6303[13]
  var i6311 = i6303[14]
  var i6310 = []
  for(var i = 0; i < i6311.length; i += 1) {
    i6310.push( i6311[i + 0] );
  }
  i6302.allTags = i6310
  return i6302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i6314 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i6315 = data
  i6314.name = i6315[0]
  i6314.value = i6315[1]
  return i6314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i6318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i6319 = data
  i6318.id = i6319[0]
  i6318.name = i6319[1]
  i6318.value = i6319[2]
  return i6318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i6322 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i6323 = data
  i6322.id = i6323[0]
  i6322.name = i6323[1]
  return i6322
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i6324 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i6325 = data
  i6324.fixedDeltaTime = i6325[0]
  i6324.maximumDeltaTime = i6325[1]
  i6324.timeScale = i6325[2]
  i6324.maximumParticleTimestep = i6325[3]
  return i6324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i6326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i6327 = data
  i6326.gravity = new pc.Vec3( i6327[0], i6327[1], i6327[2] )
  i6326.defaultSolverIterations = i6327[3]
  i6326.bounceThreshold = i6327[4]
  i6326.autoSyncTransforms = !!i6327[5]
  i6326.autoSimulation = !!i6327[6]
  var i6329 = i6327[7]
  var i6328 = []
  for(var i = 0; i < i6329.length; i += 1) {
    i6328.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i6329[i + 0]) );
  }
  i6326.collisionMatrix = i6328
  return i6326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i6332 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i6333 = data
  i6332.enabled = !!i6333[0]
  i6332.layerId = i6333[1]
  i6332.otherLayerId = i6333[2]
  return i6332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i6334 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i6335 = data
  request.r(i6335[0], i6335[1], 0, i6334, 'material')
  i6334.gravity = new pc.Vec2( i6335[2], i6335[3] )
  i6334.positionIterations = i6335[4]
  i6334.velocityIterations = i6335[5]
  i6334.velocityThreshold = i6335[6]
  i6334.maxLinearCorrection = i6335[7]
  i6334.maxAngularCorrection = i6335[8]
  i6334.maxTranslationSpeed = i6335[9]
  i6334.maxRotationSpeed = i6335[10]
  i6334.baumgarteScale = i6335[11]
  i6334.baumgarteTOIScale = i6335[12]
  i6334.timeToSleep = i6335[13]
  i6334.linearSleepTolerance = i6335[14]
  i6334.angularSleepTolerance = i6335[15]
  i6334.defaultContactOffset = i6335[16]
  i6334.autoSimulation = !!i6335[17]
  i6334.queriesHitTriggers = !!i6335[18]
  i6334.queriesStartInColliders = !!i6335[19]
  i6334.callbacksOnDisable = !!i6335[20]
  i6334.reuseCollisionCallbacks = !!i6335[21]
  i6334.autoSyncTransforms = !!i6335[22]
  var i6337 = i6335[23]
  var i6336 = []
  for(var i = 0; i < i6337.length; i += 1) {
    i6336.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i6337[i + 0]) );
  }
  i6334.collisionMatrix = i6336
  return i6334
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i6340 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i6341 = data
  i6340.enabled = !!i6341[0]
  i6340.layerId = i6341[1]
  i6340.otherLayerId = i6341[2]
  return i6340
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i6342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i6343 = data
  var i6345 = i6343[0]
  var i6344 = []
  for(var i = 0; i < i6345.length; i += 1) {
    i6344.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i6345[i + 0]) );
  }
  i6342.qualityLevels = i6344
  var i6347 = i6343[1]
  var i6346 = []
  for(var i = 0; i < i6347.length; i += 1) {
    i6346.push( i6347[i + 0] );
  }
  i6342.names = i6346
  i6342.shadows = i6343[2]
  i6342.anisotropicFiltering = i6343[3]
  i6342.antiAliasing = i6343[4]
  i6342.lodBias = i6343[5]
  i6342.shadowCascades = i6343[6]
  i6342.shadowDistance = i6343[7]
  i6342.shadowmaskMode = i6343[8]
  i6342.shadowProjection = i6343[9]
  i6342.shadowResolution = i6343[10]
  i6342.softParticles = !!i6343[11]
  i6342.softVegetation = !!i6343[12]
  i6342.activeColorSpace = i6343[13]
  i6342.desiredColorSpace = i6343[14]
  i6342.masterTextureLimit = i6343[15]
  i6342.maxQueuedFrames = i6343[16]
  i6342.particleRaycastBudget = i6343[17]
  i6342.pixelLightCount = i6343[18]
  i6342.realtimeReflectionProbes = !!i6343[19]
  i6342.shadowCascade2Split = i6343[20]
  i6342.shadowCascade4Split = new pc.Vec3( i6343[21], i6343[22], i6343[23] )
  i6342.streamingMipmapsActive = !!i6343[24]
  i6342.vSyncCount = i6343[25]
  i6342.asyncUploadBufferSize = i6343[26]
  i6342.asyncUploadTimeSlice = i6343[27]
  i6342.billboardsFaceCameraPosition = !!i6343[28]
  i6342.shadowNearPlaneOffset = i6343[29]
  i6342.streamingMipmapsMemoryBudget = i6343[30]
  i6342.maximumLODLevel = i6343[31]
  i6342.streamingMipmapsAddAllCameras = !!i6343[32]
  i6342.streamingMipmapsMaxLevelReduction = i6343[33]
  i6342.streamingMipmapsRenderersPerFrame = i6343[34]
  i6342.resolutionScalingFixedDPIFactor = i6343[35]
  i6342.streamingMipmapsMaxFileIORequests = i6343[36]
  i6342.currentQualityLevel = i6343[37]
  return i6342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i6352 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i6353 = data
  i6352.weight = i6353[0]
  i6352.vertices = i6353[1]
  i6352.normals = i6353[2]
  i6352.tangents = i6353[3]
  return i6352
}

Deserializers["UnityEngine.EventSystems.EventTrigger+TriggerEvent"] = function (request, data, root) {
  var i6354 = root || request.c( 'UnityEngine.EventSystems.EventTrigger+TriggerEvent' )
  var i6355 = data
  i6354.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i6355[0], i6354.m_PersistentCalls)
  return i6354
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i6356 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i6357 = data
  request.r(i6357[0], i6357[1], 0, i6356, 'm_ObjectArgument')
  i6356.m_ObjectArgumentAssemblyTypeName = i6357[2]
  i6356.m_IntArgument = i6357[3]
  i6356.m_FloatArgument = i6357[4]
  i6356.m_StringArgument = i6357[5]
  i6356.m_BoolArgument = !!i6357[6]
  return i6356
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i6358 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i6359 = data
  i6358.m_GlyphIndex = i6359[0]
  i6358.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i6359[1], i6358.m_GlyphValueRecord)
  return i6358
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i6360 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i6361 = data
  i6360.m_XCoordinate = i6361[0]
  i6360.m_YCoordinate = i6361[1]
  return i6360
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i6362 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i6363 = data
  i6362.m_XPositionAdjustment = i6363[0]
  i6362.m_YPositionAdjustment = i6363[1]
  return i6362
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i6364 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i6365 = data
  i6364.xPlacement = i6365[0]
  i6364.yPlacement = i6365[1]
  i6364.xAdvance = i6365[2]
  i6364.yAdvance = i6365[3]
  return i6364
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i6366 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i6367 = data
  i6366.m_XPlacement = i6367[0]
  i6366.m_YPlacement = i6367[1]
  i6366.m_XAdvance = i6367[2]
  i6366.m_YAdvance = i6367[3]
  return i6366
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.CharacterController":{"enabled":0,"center":1,"radius":4,"height":5,"minMoveDistance":6,"skinWidth":7,"enableOverlapRecovery":8},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.LineRenderer":{"textureMode":0,"alignment":1,"widthCurve":2,"colorGradient":3,"positions":4,"positionCount":5,"widthMultiplier":6,"startWidth":7,"endWidth":8,"numCornerVertices":9,"numCapVertices":10,"useWorldSpace":11,"loop":12,"startColor":13,"endColor":17,"generateLightingData":21,"enabled":22,"sharedMaterial":23,"sharedMaterials":25,"receiveShadows":26,"shadowCastingMode":27,"sortingLayerID":28,"sortingOrder":29,"lightmapIndex":30,"lightmapSceneIndex":31,"lightmapScaleOffset":32,"lightProbeUsage":36,"reflectionProbeUsage":37},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"68":[69],"70":[69],"71":[69],"72":[69],"73":[69],"74":[69],"75":[38],"76":[20],"77":[78],"79":[78],"80":[78],"81":[78],"82":[78],"83":[78],"84":[85],"86":[85],"87":[85],"88":[85],"89":[85],"90":[85],"91":[85],"92":[85],"93":[85],"94":[85],"95":[85],"96":[85],"97":[85],"98":[20],"99":[4],"100":[101],"102":[101],"42":[41],"103":[41],"104":[45,41],"105":[4],"106":[45,41],"107":[41],"108":[41],"62":[4,41],"51":[41,45],"109":[110],"111":[110],"112":[110],"113":[41],"114":[41],"44":[42],"46":[45,41],"115":[41],"43":[42],"116":[41],"117":[41],"118":[41],"119":[41],"120":[41],"121":[41],"47":[41],"54":[41],"122":[41],"123":[45,41],"124":[41],"125":[41],"126":[41],"127":[41],"128":[45,41],"129":[41],"130":[29],"131":[29],"30":[29],"132":[29],"133":[20],"134":[20]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.SphereCollider","UnityEngine.MonoBehaviour","GridAgent","NavGrid","Monster","UnityEngine.Animator","Nest","UnityEngine.GameObject","UnityEngine.Transform","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEditor.Animations.AnimatorController","UnityEngine.Camera","UnityEngine.AudioListener","ThirdPersonCamera","PlayerMotor","ScreenDeltaInputSystem","UnityEngine.MeshCollider","UnityEngine.BoxCollider","UnityEngine.Light","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.CapsuleCollider","UnityEngine.CharacterController","Thief","GameController","PlayableJoystick","GuideLine","UnityEngine.LineRenderer","UnityEngine.SkinnedMeshRenderer","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.EventSystems.EventTrigger","UnityEngine.UI.Button","JumpButton","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","StealPrompt","UnityEngine.UI.Mask","PulseScale","FirstClickCta","LunaController","BillboardGroup","StealEggTutorial","NavGridData","SkyDome","TMPro.TextMeshPro","UnityEngine.Cubemap","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "STSM_V01";

Deserializers.lunaInitializationTime = "11/17/2026 05:21:12";

Deserializers.lunaDaysRunning = "2.9";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2611_TamNTM_STSM_V01_YenTTH";

Deserializers.lunaAppID = "44314";

Deserializers.projectId = "e02a9baa880ab0d449d52010b375cd2f";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1591";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4421";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, reflection";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "True";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.STSM_V01";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "ee403831-82bc-439d-8644-d0966d548e5b";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

