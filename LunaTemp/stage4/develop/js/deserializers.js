var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i21044 = root || request.c( 'UnityEngine.JointSpring' )
  var i21045 = data
  i21044.spring = i21045[0]
  i21044.damper = i21045[1]
  i21044.targetPosition = i21045[2]
  return i21044
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i21046 = root || request.c( 'UnityEngine.JointMotor' )
  var i21047 = data
  i21046.m_TargetVelocity = i21047[0]
  i21046.m_Force = i21047[1]
  i21046.m_FreeSpin = i21047[2]
  return i21046
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i21048 = root || request.c( 'UnityEngine.JointLimits' )
  var i21049 = data
  i21048.m_Min = i21049[0]
  i21048.m_Max = i21049[1]
  i21048.m_Bounciness = i21049[2]
  i21048.m_BounceMinVelocity = i21049[3]
  i21048.m_ContactDistance = i21049[4]
  i21048.minBounce = i21049[5]
  i21048.maxBounce = i21049[6]
  return i21048
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i21050 = root || request.c( 'UnityEngine.JointDrive' )
  var i21051 = data
  i21050.m_PositionSpring = i21051[0]
  i21050.m_PositionDamper = i21051[1]
  i21050.m_MaximumForce = i21051[2]
  i21050.m_UseAcceleration = i21051[3]
  return i21050
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i21052 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i21053 = data
  i21052.m_Spring = i21053[0]
  i21052.m_Damper = i21053[1]
  return i21052
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i21054 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i21055 = data
  i21054.m_Limit = i21055[0]
  i21054.m_Bounciness = i21055[1]
  i21054.m_ContactDistance = i21055[2]
  return i21054
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i21056 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i21057 = data
  i21056.m_ExtremumSlip = i21057[0]
  i21056.m_ExtremumValue = i21057[1]
  i21056.m_AsymptoteSlip = i21057[2]
  i21056.m_AsymptoteValue = i21057[3]
  i21056.m_Stiffness = i21057[4]
  return i21056
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i21058 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i21059 = data
  i21058.m_LowerAngle = i21059[0]
  i21058.m_UpperAngle = i21059[1]
  return i21058
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i21060 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i21061 = data
  i21060.m_MotorSpeed = i21061[0]
  i21060.m_MaximumMotorTorque = i21061[1]
  return i21060
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i21062 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i21063 = data
  i21062.m_DampingRatio = i21063[0]
  i21062.m_Frequency = i21063[1]
  i21062.m_Angle = i21063[2]
  return i21062
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i21064 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i21065 = data
  i21064.m_LowerTranslation = i21065[0]
  i21064.m_UpperTranslation = i21065[1]
  return i21064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i21066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i21067 = data
  i21066.name = i21067[0]
  i21066.halfPrecision = !!i21067[1]
  i21066.useSimplification = !!i21067[2]
  i21066.useUInt32IndexFormat = !!i21067[3]
  i21066.vertexCount = i21067[4]
  i21066.aabb = i21067[5]
  var i21069 = i21067[6]
  var i21068 = []
  for(var i = 0; i < i21069.length; i += 1) {
    i21068.push( !!i21069[i + 0] );
  }
  i21066.streams = i21068
  i21066.vertices = i21067[7]
  var i21071 = i21067[8]
  var i21070 = []
  for(var i = 0; i < i21071.length; i += 1) {
    i21070.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i21071[i + 0]) );
  }
  i21066.subMeshes = i21070
  var i21073 = i21067[9]
  var i21072 = []
  for(var i = 0; i < i21073.length; i += 16) {
    i21072.push( new pc.Mat4().setData(i21073[i + 0], i21073[i + 1], i21073[i + 2], i21073[i + 3],  i21073[i + 4], i21073[i + 5], i21073[i + 6], i21073[i + 7],  i21073[i + 8], i21073[i + 9], i21073[i + 10], i21073[i + 11],  i21073[i + 12], i21073[i + 13], i21073[i + 14], i21073[i + 15]) );
  }
  i21066.bindposes = i21072
  var i21075 = i21067[10]
  var i21074 = []
  for(var i = 0; i < i21075.length; i += 1) {
    i21074.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i21075[i + 0]) );
  }
  i21066.blendShapes = i21074
  return i21066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i21080 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i21081 = data
  i21080.triangles = i21081[0]
  return i21080
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i21086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i21087 = data
  i21086.name = i21087[0]
  var i21089 = i21087[1]
  var i21088 = []
  for(var i = 0; i < i21089.length; i += 1) {
    i21088.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i21089[i + 0]) );
  }
  i21086.frames = i21088
  return i21086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i21090 = root || new pc.UnityMaterial()
  var i21091 = data
  i21090.name = i21091[0]
  request.r(i21091[1], i21091[2], 0, i21090, 'shader')
  i21090.renderQueue = i21091[3]
  i21090.enableInstancing = !!i21091[4]
  var i21093 = i21091[5]
  var i21092 = []
  for(var i = 0; i < i21093.length; i += 1) {
    i21092.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i21093[i + 0]) );
  }
  i21090.floatParameters = i21092
  var i21095 = i21091[6]
  var i21094 = []
  for(var i = 0; i < i21095.length; i += 1) {
    i21094.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i21095[i + 0]) );
  }
  i21090.colorParameters = i21094
  var i21097 = i21091[7]
  var i21096 = []
  for(var i = 0; i < i21097.length; i += 1) {
    i21096.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i21097[i + 0]) );
  }
  i21090.vectorParameters = i21096
  var i21099 = i21091[8]
  var i21098 = []
  for(var i = 0; i < i21099.length; i += 1) {
    i21098.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i21099[i + 0]) );
  }
  i21090.textureParameters = i21098
  var i21101 = i21091[9]
  var i21100 = []
  for(var i = 0; i < i21101.length; i += 1) {
    i21100.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i21101[i + 0]) );
  }
  i21090.materialFlags = i21100
  return i21090
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i21104 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i21105 = data
  i21104.name = i21105[0]
  i21104.value = i21105[1]
  return i21104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i21108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i21109 = data
  i21108.name = i21109[0]
  i21108.value = new pc.Color(i21109[1], i21109[2], i21109[3], i21109[4])
  return i21108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i21112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i21113 = data
  i21112.name = i21113[0]
  i21112.value = new pc.Vec4( i21113[1], i21113[2], i21113[3], i21113[4] )
  return i21112
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i21116 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i21117 = data
  i21116.name = i21117[0]
  request.r(i21117[1], i21117[2], 0, i21116, 'value')
  return i21116
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i21120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i21121 = data
  i21120.name = i21121[0]
  i21120.enabled = !!i21121[1]
  return i21120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i21122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i21123 = data
  i21122.name = i21123[0]
  i21122.width = i21123[1]
  i21122.height = i21123[2]
  i21122.mipmapCount = i21123[3]
  i21122.anisoLevel = i21123[4]
  i21122.filterMode = i21123[5]
  i21122.hdr = !!i21123[6]
  i21122.format = i21123[7]
  i21122.wrapMode = i21123[8]
  i21122.alphaIsTransparency = !!i21123[9]
  i21122.alphaSource = i21123[10]
  i21122.graphicsFormat = i21123[11]
  i21122.sRGBTexture = !!i21123[12]
  i21122.desiredColorSpace = i21123[13]
  i21122.wrapU = i21123[14]
  i21122.wrapV = i21123[15]
  return i21122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i21124 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i21125 = data
  i21124.position = new pc.Vec3( i21125[0], i21125[1], i21125[2] )
  i21124.scale = new pc.Vec3( i21125[3], i21125[4], i21125[5] )
  i21124.rotation = new pc.Quat(i21125[6], i21125[7], i21125[8], i21125[9])
  return i21124
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i21126 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i21127 = data
  i21126.mass = i21127[0]
  i21126.drag = i21127[1]
  i21126.angularDrag = i21127[2]
  i21126.useGravity = !!i21127[3]
  i21126.isKinematic = !!i21127[4]
  i21126.constraints = i21127[5]
  i21126.maxAngularVelocity = i21127[6]
  i21126.collisionDetectionMode = i21127[7]
  i21126.interpolation = i21127[8]
  return i21126
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i21128 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i21129 = data
  i21128.center = new pc.Vec3( i21129[0], i21129[1], i21129[2] )
  i21128.radius = i21129[3]
  i21128.height = i21129[4]
  i21128.direction = i21129[5]
  i21128.enabled = !!i21129[6]
  i21128.isTrigger = !!i21129[7]
  request.r(i21129[8], i21129[9], 0, i21128, 'material')
  return i21128
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i21130 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i21131 = data
  request.r(i21131[0], i21131[1], 0, i21130, 'animatorController')
  request.r(i21131[2], i21131[3], 0, i21130, 'avatar')
  i21130.updateMode = i21131[4]
  i21130.hasTransformHierarchy = !!i21131[5]
  i21130.applyRootMotion = !!i21131[6]
  var i21133 = i21131[7]
  var i21132 = []
  for(var i = 0; i < i21133.length; i += 2) {
  request.r(i21133[i + 0], i21133[i + 1], 2, i21132, '')
  }
  i21130.humanBones = i21132
  i21130.enabled = !!i21131[8]
  return i21130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i21136 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i21137 = data
  i21136.name = i21137[0]
  i21136.tagId = i21137[1]
  i21136.enabled = !!i21137[2]
  i21136.isStatic = !!i21137[3]
  i21136.layer = i21137[4]
  return i21136
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i21138 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i21139 = data
  request.r(i21139[0], i21139[1], 0, i21138, 'sharedMesh')
  var i21141 = i21139[2]
  var i21140 = []
  for(var i = 0; i < i21141.length; i += 2) {
  request.r(i21141[i + 0], i21141[i + 1], 2, i21140, '')
  }
  i21138.bones = i21140
  i21138.updateWhenOffscreen = !!i21139[3]
  i21138.localBounds = i21139[4]
  request.r(i21139[5], i21139[6], 0, i21138, 'rootBone')
  var i21143 = i21139[7]
  var i21142 = []
  for(var i = 0; i < i21143.length; i += 1) {
    i21142.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i21143[i + 0]) );
  }
  i21138.blendShapesWeights = i21142
  i21138.enabled = !!i21139[8]
  request.r(i21139[9], i21139[10], 0, i21138, 'sharedMaterial')
  var i21145 = i21139[11]
  var i21144 = []
  for(var i = 0; i < i21145.length; i += 2) {
  request.r(i21145[i + 0], i21145[i + 1], 2, i21144, '')
  }
  i21138.sharedMaterials = i21144
  i21138.receiveShadows = !!i21139[12]
  i21138.shadowCastingMode = i21139[13]
  i21138.sortingLayerID = i21139[14]
  i21138.sortingOrder = i21139[15]
  i21138.lightmapIndex = i21139[16]
  i21138.lightmapSceneIndex = i21139[17]
  i21138.lightmapScaleOffset = new pc.Vec4( i21139[18], i21139[19], i21139[20], i21139[21] )
  i21138.lightProbeUsage = i21139[22]
  i21138.reflectionProbeUsage = i21139[23]
  return i21138
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i21148 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i21149 = data
  i21148.weight = i21149[0]
  return i21148
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i21152 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i21153 = data
  i21152.pivot = new pc.Vec2( i21153[0], i21153[1] )
  i21152.anchorMin = new pc.Vec2( i21153[2], i21153[3] )
  i21152.anchorMax = new pc.Vec2( i21153[4], i21153[5] )
  i21152.sizeDelta = new pc.Vec2( i21153[6], i21153[7] )
  i21152.anchoredPosition3D = new pc.Vec3( i21153[8], i21153[9], i21153[10] )
  i21152.rotation = new pc.Quat(i21153[11], i21153[12], i21153[13], i21153[14])
  i21152.scale = new pc.Vec3( i21153[15], i21153[16], i21153[17] )
  return i21152
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i21154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i21155 = data
  request.r(i21155[0], i21155[1], 0, i21154, 'additionalVertexStreams')
  i21154.enabled = !!i21155[2]
  request.r(i21155[3], i21155[4], 0, i21154, 'sharedMaterial')
  var i21157 = i21155[5]
  var i21156 = []
  for(var i = 0; i < i21157.length; i += 2) {
  request.r(i21157[i + 0], i21157[i + 1], 2, i21156, '')
  }
  i21154.sharedMaterials = i21156
  i21154.receiveShadows = !!i21155[6]
  i21154.shadowCastingMode = i21155[7]
  i21154.sortingLayerID = i21155[8]
  i21154.sortingOrder = i21155[9]
  i21154.lightmapIndex = i21155[10]
  i21154.lightmapSceneIndex = i21155[11]
  i21154.lightmapScaleOffset = new pc.Vec4( i21155[12], i21155[13], i21155[14], i21155[15] )
  i21154.lightProbeUsage = i21155[16]
  i21154.reflectionProbeUsage = i21155[17]
  return i21154
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i21158 = root || request.c( 'TMPro.TextMeshPro' )
  var i21159 = data
  i21158._SortingLayer = i21159[0]
  i21158._SortingLayerID = i21159[1]
  i21158._SortingOrder = i21159[2]
  i21158.m_hasFontAssetChanged = !!i21159[3]
  request.r(i21159[4], i21159[5], 0, i21158, 'm_renderer')
  i21158.m_maskType = i21159[6]
  i21158.m_text = i21159[7]
  i21158.m_isRightToLeft = !!i21159[8]
  request.r(i21159[9], i21159[10], 0, i21158, 'm_fontAsset')
  request.r(i21159[11], i21159[12], 0, i21158, 'm_sharedMaterial')
  var i21161 = i21159[13]
  var i21160 = []
  for(var i = 0; i < i21161.length; i += 2) {
  request.r(i21161[i + 0], i21161[i + 1], 2, i21160, '')
  }
  i21158.m_fontSharedMaterials = i21160
  request.r(i21159[14], i21159[15], 0, i21158, 'm_fontMaterial')
  var i21163 = i21159[16]
  var i21162 = []
  for(var i = 0; i < i21163.length; i += 2) {
  request.r(i21163[i + 0], i21163[i + 1], 2, i21162, '')
  }
  i21158.m_fontMaterials = i21162
  i21158.m_fontColor32 = UnityEngine.Color32.ConstructColor(i21159[17], i21159[18], i21159[19], i21159[20])
  i21158.m_fontColor = new pc.Color(i21159[21], i21159[22], i21159[23], i21159[24])
  i21158.m_enableVertexGradient = !!i21159[25]
  i21158.m_colorMode = i21159[26]
  i21158.m_fontColorGradient = request.d('TMPro.VertexGradient', i21159[27], i21158.m_fontColorGradient)
  request.r(i21159[28], i21159[29], 0, i21158, 'm_fontColorGradientPreset')
  request.r(i21159[30], i21159[31], 0, i21158, 'm_spriteAsset')
  i21158.m_tintAllSprites = !!i21159[32]
  request.r(i21159[33], i21159[34], 0, i21158, 'm_StyleSheet')
  i21158.m_TextStyleHashCode = i21159[35]
  i21158.m_overrideHtmlColors = !!i21159[36]
  i21158.m_faceColor = UnityEngine.Color32.ConstructColor(i21159[37], i21159[38], i21159[39], i21159[40])
  i21158.m_fontSize = i21159[41]
  i21158.m_fontSizeBase = i21159[42]
  i21158.m_fontWeight = i21159[43]
  i21158.m_enableAutoSizing = !!i21159[44]
  i21158.m_fontSizeMin = i21159[45]
  i21158.m_fontSizeMax = i21159[46]
  i21158.m_fontStyle = i21159[47]
  i21158.m_HorizontalAlignment = i21159[48]
  i21158.m_VerticalAlignment = i21159[49]
  i21158.m_textAlignment = i21159[50]
  i21158.m_characterSpacing = i21159[51]
  i21158.m_characterHorizontalScale = i21159[52]
  i21158.m_wordSpacing = i21159[53]
  i21158.m_lineSpacing = i21159[54]
  i21158.m_lineSpacingMax = i21159[55]
  i21158.m_paragraphSpacing = i21159[56]
  i21158.m_charWidthMaxAdj = i21159[57]
  i21158.m_TextWrappingMode = i21159[58]
  i21158.m_wordWrappingRatios = i21159[59]
  i21158.m_overflowMode = i21159[60]
  request.r(i21159[61], i21159[62], 0, i21158, 'm_linkedTextComponent')
  request.r(i21159[63], i21159[64], 0, i21158, 'parentLinkedComponent')
  i21158.m_enableKerning = !!i21159[65]
  var i21165 = i21159[66]
  var i21164 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i21165.length; i += 1) {
    i21164.add(i21165[i + 0]);
  }
  i21158.m_ActiveFontFeatures = i21164
  i21158.m_enableExtraPadding = !!i21159[67]
  i21158.checkPaddingRequired = !!i21159[68]
  i21158.m_isRichText = !!i21159[69]
  i21158.m_parseCtrlCharacters = !!i21159[70]
  i21158.m_isOrthographic = !!i21159[71]
  i21158.m_isCullingEnabled = !!i21159[72]
  i21158.m_horizontalMapping = i21159[73]
  i21158.m_verticalMapping = i21159[74]
  i21158.m_uvLineOffset = i21159[75]
  i21158.m_geometrySortingOrder = i21159[76]
  i21158.m_IsTextObjectScaleStatic = !!i21159[77]
  i21158.m_VertexBufferAutoSizeReduction = !!i21159[78]
  i21158.m_useMaxVisibleDescender = !!i21159[79]
  i21158.m_pageToDisplay = i21159[80]
  i21158.m_margin = new pc.Vec4( i21159[81], i21159[82], i21159[83], i21159[84] )
  i21158.m_isUsingLegacyAnimationComponent = !!i21159[85]
  i21158.m_isVolumetricText = !!i21159[86]
  request.r(i21159[87], i21159[88], 0, i21158, 'm_Material')
  i21158.m_EmojiFallbackSupport = !!i21159[89]
  i21158.m_Maskable = !!i21159[90]
  i21158.m_Color = new pc.Color(i21159[91], i21159[92], i21159[93], i21159[94])
  i21158.m_RaycastTarget = !!i21159[95]
  i21158.m_RaycastPadding = new pc.Vec4( i21159[96], i21159[97], i21159[98], i21159[99] )
  return i21158
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i21166 = root || request.c( 'TMPro.VertexGradient' )
  var i21167 = data
  i21166.topLeft = new pc.Color(i21167[0], i21167[1], i21167[2], i21167[3])
  i21166.topRight = new pc.Color(i21167[4], i21167[5], i21167[6], i21167[7])
  i21166.bottomLeft = new pc.Color(i21167[8], i21167[9], i21167[10], i21167[11])
  i21166.bottomRight = new pc.Color(i21167[12], i21167[13], i21167[14], i21167[15])
  return i21166
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i21170 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i21171 = data
  var i21173 = i21171[0]
  var i21172 = []
  for(var i = 0; i < i21173.length; i += 3) {
    i21172.push( new pc.Vec3( i21173[i + 0], i21173[i + 1], i21173[i + 2] ) );
  }
  i21170.positions = i21172
  i21170.positionCount = i21171[1]
  i21170.time = i21171[2]
  i21170.startWidth = i21171[3]
  i21170.endWidth = i21171[4]
  i21170.widthMultiplier = i21171[5]
  i21170.autodestruct = !!i21171[6]
  i21170.emitting = !!i21171[7]
  i21170.numCornerVertices = i21171[8]
  i21170.numCapVertices = i21171[9]
  i21170.minVertexDistance = i21171[10]
  i21170.colorGradient = i21171[11] ? new pc.ColorGradient(i21171[11][0], i21171[11][1], i21171[11][2]) : null
  i21170.startColor = new pc.Color(i21171[12], i21171[13], i21171[14], i21171[15])
  i21170.endColor = new pc.Color(i21171[16], i21171[17], i21171[18], i21171[19])
  i21170.generateLightingData = !!i21171[20]
  i21170.textureMode = i21171[21]
  i21170.alignment = i21171[22]
  i21170.widthCurve = new pc.AnimationCurve( { keys_flow: i21171[23] } )
  i21170.enabled = !!i21171[24]
  request.r(i21171[25], i21171[26], 0, i21170, 'sharedMaterial')
  var i21175 = i21171[27]
  var i21174 = []
  for(var i = 0; i < i21175.length; i += 2) {
  request.r(i21175[i + 0], i21175[i + 1], 2, i21174, '')
  }
  i21170.sharedMaterials = i21174
  i21170.receiveShadows = !!i21171[28]
  i21170.shadowCastingMode = i21171[29]
  i21170.sortingLayerID = i21171[30]
  i21170.sortingOrder = i21171[31]
  i21170.lightmapIndex = i21171[32]
  i21170.lightmapSceneIndex = i21171[33]
  i21170.lightmapScaleOffset = new pc.Vec4( i21171[34], i21171[35], i21171[36], i21171[37] )
  i21170.lightProbeUsage = i21171[38]
  i21170.reflectionProbeUsage = i21171[39]
  return i21170
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i21178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i21179 = data
  i21178.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i21179[0], i21178.main)
  i21178.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i21179[1], i21178.colorBySpeed)
  i21178.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i21179[2], i21178.colorOverLifetime)
  i21178.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i21179[3], i21178.emission)
  i21178.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i21179[4], i21178.rotationBySpeed)
  i21178.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i21179[5], i21178.rotationOverLifetime)
  i21178.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i21179[6], i21178.shape)
  i21178.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i21179[7], i21178.sizeBySpeed)
  i21178.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i21179[8], i21178.sizeOverLifetime)
  i21178.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i21179[9], i21178.textureSheetAnimation)
  i21178.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i21179[10], i21178.velocityOverLifetime)
  i21178.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i21179[11], i21178.noise)
  i21178.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i21179[12], i21178.inheritVelocity)
  i21178.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i21179[13], i21178.forceOverLifetime)
  i21178.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i21179[14], i21178.limitVelocityOverLifetime)
  i21178.useAutoRandomSeed = !!i21179[15]
  i21178.randomSeed = i21179[16]
  return i21178
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i21180 = root || new pc.ParticleSystemMain()
  var i21181 = data
  i21180.duration = i21181[0]
  i21180.loop = !!i21181[1]
  i21180.prewarm = !!i21181[2]
  i21180.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[3], i21180.startDelay)
  i21180.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[4], i21180.startLifetime)
  i21180.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[5], i21180.startSpeed)
  i21180.startSize3D = !!i21181[6]
  i21180.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[7], i21180.startSizeX)
  i21180.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[8], i21180.startSizeY)
  i21180.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[9], i21180.startSizeZ)
  i21180.startRotation3D = !!i21181[10]
  i21180.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[11], i21180.startRotationX)
  i21180.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[12], i21180.startRotationY)
  i21180.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[13], i21180.startRotationZ)
  i21180.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i21181[14], i21180.startColor)
  i21180.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21181[15], i21180.gravityModifier)
  i21180.simulationSpace = i21181[16]
  request.r(i21181[17], i21181[18], 0, i21180, 'customSimulationSpace')
  i21180.simulationSpeed = i21181[19]
  i21180.useUnscaledTime = !!i21181[20]
  i21180.scalingMode = i21181[21]
  i21180.playOnAwake = !!i21181[22]
  i21180.maxParticles = i21181[23]
  i21180.emitterVelocityMode = i21181[24]
  i21180.stopAction = i21181[25]
  return i21180
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i21182 = root || new pc.MinMaxCurve()
  var i21183 = data
  i21182.mode = i21183[0]
  i21182.curveMin = new pc.AnimationCurve( { keys_flow: i21183[1] } )
  i21182.curveMax = new pc.AnimationCurve( { keys_flow: i21183[2] } )
  i21182.curveMultiplier = i21183[3]
  i21182.constantMin = i21183[4]
  i21182.constantMax = i21183[5]
  return i21182
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i21184 = root || new pc.MinMaxGradient()
  var i21185 = data
  i21184.mode = i21185[0]
  i21184.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i21185[1], i21184.gradientMin)
  i21184.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i21185[2], i21184.gradientMax)
  i21184.colorMin = new pc.Color(i21185[3], i21185[4], i21185[5], i21185[6])
  i21184.colorMax = new pc.Color(i21185[7], i21185[8], i21185[9], i21185[10])
  return i21184
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i21186 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i21187 = data
  i21186.mode = i21187[0]
  var i21189 = i21187[1]
  var i21188 = []
  for(var i = 0; i < i21189.length; i += 1) {
    i21188.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i21189[i + 0]) );
  }
  i21186.colorKeys = i21188
  var i21191 = i21187[2]
  var i21190 = []
  for(var i = 0; i < i21191.length; i += 1) {
    i21190.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i21191[i + 0]) );
  }
  i21186.alphaKeys = i21190
  return i21186
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i21192 = root || new pc.ParticleSystemColorBySpeed()
  var i21193 = data
  i21192.enabled = !!i21193[0]
  i21192.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i21193[1], i21192.color)
  i21192.range = new pc.Vec2( i21193[2], i21193[3] )
  return i21192
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i21196 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i21197 = data
  i21196.color = new pc.Color(i21197[0], i21197[1], i21197[2], i21197[3])
  i21196.time = i21197[4]
  return i21196
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i21200 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i21201 = data
  i21200.alpha = i21201[0]
  i21200.time = i21201[1]
  return i21200
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i21202 = root || new pc.ParticleSystemColorOverLifetime()
  var i21203 = data
  i21202.enabled = !!i21203[0]
  i21202.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i21203[1], i21202.color)
  return i21202
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i21204 = root || new pc.ParticleSystemEmitter()
  var i21205 = data
  i21204.enabled = !!i21205[0]
  i21204.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21205[1], i21204.rateOverTime)
  i21204.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21205[2], i21204.rateOverDistance)
  var i21207 = i21205[3]
  var i21206 = []
  for(var i = 0; i < i21207.length; i += 1) {
    i21206.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i21207[i + 0]) );
  }
  i21204.bursts = i21206
  return i21204
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i21210 = root || new pc.ParticleSystemBurst()
  var i21211 = data
  i21210.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21211[0], i21210.count)
  i21210.cycleCount = i21211[1]
  i21210.minCount = i21211[2]
  i21210.maxCount = i21211[3]
  i21210.repeatInterval = i21211[4]
  i21210.time = i21211[5]
  return i21210
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i21212 = root || new pc.ParticleSystemRotationBySpeed()
  var i21213 = data
  i21212.enabled = !!i21213[0]
  i21212.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21213[1], i21212.x)
  i21212.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21213[2], i21212.y)
  i21212.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21213[3], i21212.z)
  i21212.separateAxes = !!i21213[4]
  i21212.range = new pc.Vec2( i21213[5], i21213[6] )
  return i21212
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i21214 = root || new pc.ParticleSystemRotationOverLifetime()
  var i21215 = data
  i21214.enabled = !!i21215[0]
  i21214.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21215[1], i21214.x)
  i21214.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21215[2], i21214.y)
  i21214.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21215[3], i21214.z)
  i21214.separateAxes = !!i21215[4]
  return i21214
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i21216 = root || new pc.ParticleSystemShape()
  var i21217 = data
  i21216.enabled = !!i21217[0]
  i21216.shapeType = i21217[1]
  i21216.randomDirectionAmount = i21217[2]
  i21216.sphericalDirectionAmount = i21217[3]
  i21216.randomPositionAmount = i21217[4]
  i21216.alignToDirection = !!i21217[5]
  i21216.radius = i21217[6]
  i21216.radiusMode = i21217[7]
  i21216.radiusSpread = i21217[8]
  i21216.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21217[9], i21216.radiusSpeed)
  i21216.radiusThickness = i21217[10]
  i21216.angle = i21217[11]
  i21216.length = i21217[12]
  i21216.boxThickness = new pc.Vec3( i21217[13], i21217[14], i21217[15] )
  i21216.meshShapeType = i21217[16]
  request.r(i21217[17], i21217[18], 0, i21216, 'mesh')
  request.r(i21217[19], i21217[20], 0, i21216, 'meshRenderer')
  request.r(i21217[21], i21217[22], 0, i21216, 'skinnedMeshRenderer')
  i21216.useMeshMaterialIndex = !!i21217[23]
  i21216.meshMaterialIndex = i21217[24]
  i21216.useMeshColors = !!i21217[25]
  i21216.normalOffset = i21217[26]
  i21216.arc = i21217[27]
  i21216.arcMode = i21217[28]
  i21216.arcSpread = i21217[29]
  i21216.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21217[30], i21216.arcSpeed)
  i21216.donutRadius = i21217[31]
  i21216.position = new pc.Vec3( i21217[32], i21217[33], i21217[34] )
  i21216.rotation = new pc.Vec3( i21217[35], i21217[36], i21217[37] )
  i21216.scale = new pc.Vec3( i21217[38], i21217[39], i21217[40] )
  return i21216
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i21218 = root || new pc.ParticleSystemSizeBySpeed()
  var i21219 = data
  i21218.enabled = !!i21219[0]
  i21218.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21219[1], i21218.x)
  i21218.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21219[2], i21218.y)
  i21218.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21219[3], i21218.z)
  i21218.separateAxes = !!i21219[4]
  i21218.range = new pc.Vec2( i21219[5], i21219[6] )
  return i21218
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i21220 = root || new pc.ParticleSystemSizeOverLifetime()
  var i21221 = data
  i21220.enabled = !!i21221[0]
  i21220.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21221[1], i21220.x)
  i21220.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21221[2], i21220.y)
  i21220.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21221[3], i21220.z)
  i21220.separateAxes = !!i21221[4]
  return i21220
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i21222 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i21223 = data
  i21222.enabled = !!i21223[0]
  i21222.mode = i21223[1]
  i21222.animation = i21223[2]
  i21222.numTilesX = i21223[3]
  i21222.numTilesY = i21223[4]
  i21222.useRandomRow = !!i21223[5]
  i21222.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21223[6], i21222.frameOverTime)
  i21222.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21223[7], i21222.startFrame)
  i21222.cycleCount = i21223[8]
  i21222.rowIndex = i21223[9]
  i21222.flipU = i21223[10]
  i21222.flipV = i21223[11]
  i21222.spriteCount = i21223[12]
  var i21225 = i21223[13]
  var i21224 = []
  for(var i = 0; i < i21225.length; i += 2) {
  request.r(i21225[i + 0], i21225[i + 1], 2, i21224, '')
  }
  i21222.sprites = i21224
  return i21222
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i21228 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i21229 = data
  i21228.enabled = !!i21229[0]
  i21228.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[1], i21228.x)
  i21228.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[2], i21228.y)
  i21228.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[3], i21228.z)
  i21228.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[4], i21228.radial)
  i21228.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[5], i21228.speedModifier)
  i21228.space = i21229[6]
  i21228.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[7], i21228.orbitalX)
  i21228.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[8], i21228.orbitalY)
  i21228.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[9], i21228.orbitalZ)
  i21228.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[10], i21228.orbitalOffsetX)
  i21228.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[11], i21228.orbitalOffsetY)
  i21228.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21229[12], i21228.orbitalOffsetZ)
  return i21228
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i21230 = root || new pc.ParticleSystemNoise()
  var i21231 = data
  i21230.enabled = !!i21231[0]
  i21230.separateAxes = !!i21231[1]
  i21230.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[2], i21230.strengthX)
  i21230.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[3], i21230.strengthY)
  i21230.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[4], i21230.strengthZ)
  i21230.frequency = i21231[5]
  i21230.damping = !!i21231[6]
  i21230.octaveCount = i21231[7]
  i21230.octaveMultiplier = i21231[8]
  i21230.octaveScale = i21231[9]
  i21230.quality = i21231[10]
  i21230.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[11], i21230.scrollSpeed)
  i21230.scrollSpeedMultiplier = i21231[12]
  i21230.remapEnabled = !!i21231[13]
  i21230.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[14], i21230.remapX)
  i21230.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[15], i21230.remapY)
  i21230.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[16], i21230.remapZ)
  i21230.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[17], i21230.positionAmount)
  i21230.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[18], i21230.rotationAmount)
  i21230.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21231[19], i21230.sizeAmount)
  return i21230
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i21232 = root || new pc.ParticleSystemInheritVelocity()
  var i21233 = data
  i21232.enabled = !!i21233[0]
  i21232.mode = i21233[1]
  i21232.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21233[2], i21232.curve)
  return i21232
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i21234 = root || new pc.ParticleSystemForceOverLifetime()
  var i21235 = data
  i21234.enabled = !!i21235[0]
  i21234.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21235[1], i21234.x)
  i21234.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21235[2], i21234.y)
  i21234.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21235[3], i21234.z)
  i21234.space = i21235[4]
  i21234.randomized = !!i21235[5]
  return i21234
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i21236 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i21237 = data
  i21236.enabled = !!i21237[0]
  i21236.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21237[1], i21236.limit)
  i21236.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21237[2], i21236.limitX)
  i21236.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21237[3], i21236.limitY)
  i21236.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21237[4], i21236.limitZ)
  i21236.dampen = i21237[5]
  i21236.separateAxes = !!i21237[6]
  i21236.space = i21237[7]
  i21236.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i21237[8], i21236.drag)
  i21236.multiplyDragByParticleSize = !!i21237[9]
  i21236.multiplyDragByParticleVelocity = !!i21237[10]
  return i21236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i21238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i21239 = data
  request.r(i21239[0], i21239[1], 0, i21238, 'mesh')
  i21238.meshCount = i21239[2]
  i21238.activeVertexStreamsCount = i21239[3]
  i21238.alignment = i21239[4]
  i21238.renderMode = i21239[5]
  i21238.sortMode = i21239[6]
  i21238.lengthScale = i21239[7]
  i21238.velocityScale = i21239[8]
  i21238.cameraVelocityScale = i21239[9]
  i21238.normalDirection = i21239[10]
  i21238.sortingFudge = i21239[11]
  i21238.minParticleSize = i21239[12]
  i21238.maxParticleSize = i21239[13]
  i21238.pivot = new pc.Vec3( i21239[14], i21239[15], i21239[16] )
  request.r(i21239[17], i21239[18], 0, i21238, 'trailMaterial')
  i21238.applyActiveColorSpace = !!i21239[19]
  i21238.enabled = !!i21239[20]
  request.r(i21239[21], i21239[22], 0, i21238, 'sharedMaterial')
  var i21241 = i21239[23]
  var i21240 = []
  for(var i = 0; i < i21241.length; i += 2) {
  request.r(i21241[i + 0], i21241[i + 1], 2, i21240, '')
  }
  i21238.sharedMaterials = i21240
  i21238.receiveShadows = !!i21239[24]
  i21238.shadowCastingMode = i21239[25]
  i21238.sortingLayerID = i21239[26]
  i21238.sortingOrder = i21239[27]
  i21238.lightmapIndex = i21239[28]
  i21238.lightmapSceneIndex = i21239[29]
  i21238.lightmapScaleOffset = new pc.Vec4( i21239[30], i21239[31], i21239[32], i21239[33] )
  i21238.lightProbeUsage = i21239[34]
  i21238.reflectionProbeUsage = i21239[35]
  return i21238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i21242 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i21243 = data
  request.r(i21243[0], i21243[1], 0, i21242, 'sharedMesh')
  return i21242
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i21244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i21245 = data
  i21244.center = new pc.Vec3( i21245[0], i21245[1], i21245[2] )
  i21244.size = new pc.Vec3( i21245[3], i21245[4], i21245[5] )
  i21244.enabled = !!i21245[6]
  i21244.isTrigger = !!i21245[7]
  request.r(i21245[8], i21245[9], 0, i21244, 'material')
  return i21244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i21246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i21247 = data
  i21246.center = new pc.Vec3( i21247[0], i21247[1], i21247[2] )
  i21246.radius = i21247[3]
  i21246.enabled = !!i21247[4]
  i21246.isTrigger = !!i21247[5]
  request.r(i21247[6], i21247[7], 0, i21246, 'material')
  return i21246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i21248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i21249 = data
  i21248.planeDistance = i21249[0]
  i21248.referencePixelsPerUnit = i21249[1]
  i21248.isFallbackOverlay = !!i21249[2]
  i21248.renderMode = i21249[3]
  i21248.renderOrder = i21249[4]
  i21248.sortingLayerName = i21249[5]
  i21248.sortingOrder = i21249[6]
  i21248.scaleFactor = i21249[7]
  request.r(i21249[8], i21249[9], 0, i21248, 'worldCamera')
  i21248.overrideSorting = !!i21249[10]
  i21248.pixelPerfect = !!i21249[11]
  i21248.targetDisplay = i21249[12]
  i21248.overridePixelPerfect = !!i21249[13]
  i21248.enabled = !!i21249[14]
  return i21248
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i21250 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i21251 = data
  i21250.m_UiScaleMode = i21251[0]
  i21250.m_ReferencePixelsPerUnit = i21251[1]
  i21250.m_ScaleFactor = i21251[2]
  i21250.m_ReferenceResolution = new pc.Vec2( i21251[3], i21251[4] )
  i21250.m_ScreenMatchMode = i21251[5]
  i21250.m_MatchWidthOrHeight = i21251[6]
  i21250.m_PhysicalUnit = i21251[7]
  i21250.m_FallbackScreenDPI = i21251[8]
  i21250.m_DefaultSpriteDPI = i21251[9]
  i21250.m_DynamicPixelsPerUnit = i21251[10]
  i21250.m_PresetInfoIsWorld = !!i21251[11]
  return i21250
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i21252 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i21253 = data
  i21252.m_IgnoreReversedGraphics = !!i21253[0]
  i21252.m_BlockingObjects = i21253[1]
  i21252.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i21253[2] )
  return i21252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i21254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i21255 = data
  i21254.cullTransparentMesh = !!i21255[0]
  return i21254
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i21256 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i21257 = data
  i21256.m_hasFontAssetChanged = !!i21257[0]
  request.r(i21257[1], i21257[2], 0, i21256, 'm_baseMaterial')
  i21256.m_maskOffset = new pc.Vec4( i21257[3], i21257[4], i21257[5], i21257[6] )
  i21256.m_text = i21257[7]
  i21256.m_isRightToLeft = !!i21257[8]
  request.r(i21257[9], i21257[10], 0, i21256, 'm_fontAsset')
  request.r(i21257[11], i21257[12], 0, i21256, 'm_sharedMaterial')
  var i21259 = i21257[13]
  var i21258 = []
  for(var i = 0; i < i21259.length; i += 2) {
  request.r(i21259[i + 0], i21259[i + 1], 2, i21258, '')
  }
  i21256.m_fontSharedMaterials = i21258
  request.r(i21257[14], i21257[15], 0, i21256, 'm_fontMaterial')
  var i21261 = i21257[16]
  var i21260 = []
  for(var i = 0; i < i21261.length; i += 2) {
  request.r(i21261[i + 0], i21261[i + 1], 2, i21260, '')
  }
  i21256.m_fontMaterials = i21260
  i21256.m_fontColor32 = UnityEngine.Color32.ConstructColor(i21257[17], i21257[18], i21257[19], i21257[20])
  i21256.m_fontColor = new pc.Color(i21257[21], i21257[22], i21257[23], i21257[24])
  i21256.m_enableVertexGradient = !!i21257[25]
  i21256.m_colorMode = i21257[26]
  i21256.m_fontColorGradient = request.d('TMPro.VertexGradient', i21257[27], i21256.m_fontColorGradient)
  request.r(i21257[28], i21257[29], 0, i21256, 'm_fontColorGradientPreset')
  request.r(i21257[30], i21257[31], 0, i21256, 'm_spriteAsset')
  i21256.m_tintAllSprites = !!i21257[32]
  request.r(i21257[33], i21257[34], 0, i21256, 'm_StyleSheet')
  i21256.m_TextStyleHashCode = i21257[35]
  i21256.m_overrideHtmlColors = !!i21257[36]
  i21256.m_faceColor = UnityEngine.Color32.ConstructColor(i21257[37], i21257[38], i21257[39], i21257[40])
  i21256.m_fontSize = i21257[41]
  i21256.m_fontSizeBase = i21257[42]
  i21256.m_fontWeight = i21257[43]
  i21256.m_enableAutoSizing = !!i21257[44]
  i21256.m_fontSizeMin = i21257[45]
  i21256.m_fontSizeMax = i21257[46]
  i21256.m_fontStyle = i21257[47]
  i21256.m_HorizontalAlignment = i21257[48]
  i21256.m_VerticalAlignment = i21257[49]
  i21256.m_textAlignment = i21257[50]
  i21256.m_characterSpacing = i21257[51]
  i21256.m_characterHorizontalScale = i21257[52]
  i21256.m_wordSpacing = i21257[53]
  i21256.m_lineSpacing = i21257[54]
  i21256.m_lineSpacingMax = i21257[55]
  i21256.m_paragraphSpacing = i21257[56]
  i21256.m_charWidthMaxAdj = i21257[57]
  i21256.m_TextWrappingMode = i21257[58]
  i21256.m_wordWrappingRatios = i21257[59]
  i21256.m_overflowMode = i21257[60]
  request.r(i21257[61], i21257[62], 0, i21256, 'm_linkedTextComponent')
  request.r(i21257[63], i21257[64], 0, i21256, 'parentLinkedComponent')
  i21256.m_enableKerning = !!i21257[65]
  var i21263 = i21257[66]
  var i21262 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i21263.length; i += 1) {
    i21262.add(i21263[i + 0]);
  }
  i21256.m_ActiveFontFeatures = i21262
  i21256.m_enableExtraPadding = !!i21257[67]
  i21256.checkPaddingRequired = !!i21257[68]
  i21256.m_isRichText = !!i21257[69]
  i21256.m_parseCtrlCharacters = !!i21257[70]
  i21256.m_isOrthographic = !!i21257[71]
  i21256.m_isCullingEnabled = !!i21257[72]
  i21256.m_horizontalMapping = i21257[73]
  i21256.m_verticalMapping = i21257[74]
  i21256.m_uvLineOffset = i21257[75]
  i21256.m_geometrySortingOrder = i21257[76]
  i21256.m_IsTextObjectScaleStatic = !!i21257[77]
  i21256.m_VertexBufferAutoSizeReduction = !!i21257[78]
  i21256.m_useMaxVisibleDescender = !!i21257[79]
  i21256.m_pageToDisplay = i21257[80]
  i21256.m_margin = new pc.Vec4( i21257[81], i21257[82], i21257[83], i21257[84] )
  i21256.m_isUsingLegacyAnimationComponent = !!i21257[85]
  i21256.m_isVolumetricText = !!i21257[86]
  request.r(i21257[87], i21257[88], 0, i21256, 'm_Material')
  i21256.m_EmojiFallbackSupport = !!i21257[89]
  i21256.m_Maskable = !!i21257[90]
  i21256.m_Color = new pc.Color(i21257[91], i21257[92], i21257[93], i21257[94])
  i21256.m_RaycastTarget = !!i21257[95]
  i21256.m_RaycastPadding = new pc.Vec4( i21257[96], i21257[97], i21257[98], i21257[99] )
  return i21256
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i21264 = root || request.c( 'UnityEngine.UI.Image' )
  var i21265 = data
  request.r(i21265[0], i21265[1], 0, i21264, 'm_Sprite')
  i21264.m_Type = i21265[2]
  i21264.m_PreserveAspect = !!i21265[3]
  i21264.m_FillCenter = !!i21265[4]
  i21264.m_FillMethod = i21265[5]
  i21264.m_FillAmount = i21265[6]
  i21264.m_FillClockwise = !!i21265[7]
  i21264.m_FillOrigin = i21265[8]
  i21264.m_UseSpriteMesh = !!i21265[9]
  i21264.m_PixelsPerUnitMultiplier = i21265[10]
  request.r(i21265[11], i21265[12], 0, i21264, 'm_Material')
  i21264.m_Maskable = !!i21265[13]
  i21264.m_Color = new pc.Color(i21265[14], i21265[15], i21265[16], i21265[17])
  i21264.m_RaycastTarget = !!i21265[18]
  i21264.m_RaycastPadding = new pc.Vec4( i21265[19], i21265[20], i21265[21], i21265[22] )
  return i21264
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i21266 = root || request.c( 'UnityEngine.UI.Button' )
  var i21267 = data
  i21266.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i21267[0], i21266.m_OnClick)
  i21266.m_Navigation = request.d('UnityEngine.UI.Navigation', i21267[1], i21266.m_Navigation)
  i21266.m_Transition = i21267[2]
  i21266.m_Colors = request.d('UnityEngine.UI.ColorBlock', i21267[3], i21266.m_Colors)
  i21266.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i21267[4], i21266.m_SpriteState)
  i21266.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i21267[5], i21266.m_AnimationTriggers)
  i21266.m_Interactable = !!i21267[6]
  request.r(i21267[7], i21267[8], 0, i21266, 'm_TargetGraphic')
  return i21266
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i21268 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i21269 = data
  i21268.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i21269[0], i21268.m_PersistentCalls)
  return i21268
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i21270 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i21271 = data
  var i21273 = i21271[0]
  var i21272 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i21273.length; i += 1) {
    i21272.add(request.d('UnityEngine.Events.PersistentCall', i21273[i + 0]));
  }
  i21270.m_Calls = i21272
  return i21270
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i21276 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i21277 = data
  request.r(i21277[0], i21277[1], 0, i21276, 'm_Target')
  i21276.m_TargetAssemblyTypeName = i21277[2]
  i21276.m_MethodName = i21277[3]
  i21276.m_Mode = i21277[4]
  i21276.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i21277[5], i21276.m_Arguments)
  i21276.m_CallState = i21277[6]
  return i21276
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i21278 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i21279 = data
  i21278.m_Mode = i21279[0]
  i21278.m_WrapAround = !!i21279[1]
  request.r(i21279[2], i21279[3], 0, i21278, 'm_SelectOnUp')
  request.r(i21279[4], i21279[5], 0, i21278, 'm_SelectOnDown')
  request.r(i21279[6], i21279[7], 0, i21278, 'm_SelectOnLeft')
  request.r(i21279[8], i21279[9], 0, i21278, 'm_SelectOnRight')
  return i21278
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i21280 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i21281 = data
  i21280.m_NormalColor = new pc.Color(i21281[0], i21281[1], i21281[2], i21281[3])
  i21280.m_HighlightedColor = new pc.Color(i21281[4], i21281[5], i21281[6], i21281[7])
  i21280.m_PressedColor = new pc.Color(i21281[8], i21281[9], i21281[10], i21281[11])
  i21280.m_SelectedColor = new pc.Color(i21281[12], i21281[13], i21281[14], i21281[15])
  i21280.m_DisabledColor = new pc.Color(i21281[16], i21281[17], i21281[18], i21281[19])
  i21280.m_ColorMultiplier = i21281[20]
  i21280.m_FadeDuration = i21281[21]
  return i21280
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i21282 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i21283 = data
  request.r(i21283[0], i21283[1], 0, i21282, 'm_HighlightedSprite')
  request.r(i21283[2], i21283[3], 0, i21282, 'm_PressedSprite')
  request.r(i21283[4], i21283[5], 0, i21282, 'm_SelectedSprite')
  request.r(i21283[6], i21283[7], 0, i21282, 'm_DisabledSprite')
  return i21282
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i21284 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i21285 = data
  i21284.m_NormalTrigger = i21285[0]
  i21284.m_HighlightedTrigger = i21285[1]
  i21284.m_PressedTrigger = i21285[2]
  i21284.m_SelectedTrigger = i21285[3]
  i21284.m_DisabledTrigger = i21285[4]
  return i21284
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i21286 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i21287 = data
  i21286.m_StartCorner = i21287[0]
  i21286.m_StartAxis = i21287[1]
  i21286.m_CellSize = new pc.Vec2( i21287[2], i21287[3] )
  i21286.m_Spacing = new pc.Vec2( i21287[4], i21287[5] )
  i21286.m_Constraint = i21287[6]
  i21286.m_ConstraintCount = i21287[7]
  i21286.m_Padding = UnityEngine.RectOffset.FromPaddings(i21287[8], i21287[9], i21287[10], i21287[11])
  i21286.m_ChildAlignment = i21287[12]
  return i21286
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i21288 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i21289 = data
  i21288.m_Spacing = i21289[0]
  i21288.m_ChildForceExpandWidth = !!i21289[1]
  i21288.m_ChildForceExpandHeight = !!i21289[2]
  i21288.m_ChildControlWidth = !!i21289[3]
  i21288.m_ChildControlHeight = !!i21289[4]
  i21288.m_ChildScaleWidth = !!i21289[5]
  i21288.m_ChildScaleHeight = !!i21289[6]
  i21288.m_ReverseArrangement = !!i21289[7]
  i21288.m_Padding = UnityEngine.RectOffset.FromPaddings(i21289[8], i21289[9], i21289[10], i21289[11])
  i21288.m_ChildAlignment = i21289[12]
  return i21288
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i21290 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i21291 = data
  i21290.m_HorizontalFit = i21291[0]
  i21290.m_VerticalFit = i21291[1]
  return i21290
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i21292 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i21293 = data
  request.r(i21293[0], i21293[1], 0, i21292, 'm_Content')
  i21292.m_Horizontal = !!i21293[2]
  i21292.m_Vertical = !!i21293[3]
  i21292.m_MovementType = i21293[4]
  i21292.m_Elasticity = i21293[5]
  i21292.m_Inertia = !!i21293[6]
  i21292.m_DecelerationRate = i21293[7]
  i21292.m_ScrollSensitivity = i21293[8]
  request.r(i21293[9], i21293[10], 0, i21292, 'm_Viewport')
  request.r(i21293[11], i21293[12], 0, i21292, 'm_HorizontalScrollbar')
  request.r(i21293[13], i21293[14], 0, i21292, 'm_VerticalScrollbar')
  i21292.m_HorizontalScrollbarVisibility = i21293[15]
  i21292.m_VerticalScrollbarVisibility = i21293[16]
  i21292.m_HorizontalScrollbarSpacing = i21293[17]
  i21292.m_VerticalScrollbarSpacing = i21293[18]
  i21292.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i21293[19], i21292.m_OnValueChanged)
  return i21292
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i21294 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i21295 = data
  i21294.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i21295[0], i21294.m_PersistentCalls)
  return i21294
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i21296 = root || request.c( 'UnityEngine.UI.Mask' )
  var i21297 = data
  i21296.m_ShowMaskGraphic = !!i21297[0]
  return i21296
}

Deserializers["UnityEngine.UI.Scrollbar"] = function (request, data, root) {
  var i21298 = root || request.c( 'UnityEngine.UI.Scrollbar' )
  var i21299 = data
  request.r(i21299[0], i21299[1], 0, i21298, 'm_HandleRect')
  i21298.m_Direction = i21299[2]
  i21298.m_Value = i21299[3]
  i21298.m_Size = i21299[4]
  i21298.m_NumberOfSteps = i21299[5]
  i21298.m_OnValueChanged = request.d('UnityEngine.UI.Scrollbar+ScrollEvent', i21299[6], i21298.m_OnValueChanged)
  i21298.m_Navigation = request.d('UnityEngine.UI.Navigation', i21299[7], i21298.m_Navigation)
  i21298.m_Transition = i21299[8]
  i21298.m_Colors = request.d('UnityEngine.UI.ColorBlock', i21299[9], i21298.m_Colors)
  i21298.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i21299[10], i21298.m_SpriteState)
  i21298.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i21299[11], i21298.m_AnimationTriggers)
  i21298.m_Interactable = !!i21299[12]
  request.r(i21299[13], i21299[14], 0, i21298, 'm_TargetGraphic')
  return i21298
}

Deserializers["UnityEngine.UI.Scrollbar+ScrollEvent"] = function (request, data, root) {
  var i21300 = root || request.c( 'UnityEngine.UI.Scrollbar+ScrollEvent' )
  var i21301 = data
  i21300.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i21301[0], i21300.m_PersistentCalls)
  return i21300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i21302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i21303 = data
  i21302.m_Alpha = i21303[0]
  i21302.m_Interactable = !!i21303[1]
  i21302.m_BlocksRaycasts = !!i21303[2]
  i21302.m_IgnoreParentGroups = !!i21303[3]
  i21302.enabled = !!i21303[4]
  return i21302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i21304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i21305 = data
  i21304.name = i21305[0]
  i21304.index = i21305[1]
  i21304.startup = !!i21305[2]
  return i21304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i21306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i21307 = data
  i21306.type = i21307[0]
  i21306.color = new pc.Color(i21307[1], i21307[2], i21307[3], i21307[4])
  i21306.cullingMask = i21307[5]
  i21306.intensity = i21307[6]
  i21306.range = i21307[7]
  i21306.spotAngle = i21307[8]
  i21306.shadows = i21307[9]
  i21306.shadowNormalBias = i21307[10]
  i21306.shadowBias = i21307[11]
  i21306.shadowStrength = i21307[12]
  i21306.shadowResolution = i21307[13]
  i21306.lightmapBakeType = i21307[14]
  i21306.renderMode = i21307[15]
  request.r(i21307[16], i21307[17], 0, i21306, 'cookie')
  i21306.cookieSize = i21307[18]
  i21306.shadowNearPlane = i21307[19]
  i21306.occlusionMaskChannel = i21307[20]
  i21306.isBaked = !!i21307[21]
  i21306.mixedLightingMode = i21307[22]
  i21306.enabled = !!i21307[23]
  return i21306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i21308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i21309 = data
  request.r(i21309[0], i21309[1], 0, i21308, 'clip')
  request.r(i21309[2], i21309[3], 0, i21308, 'outputAudioMixerGroup')
  i21308.playOnAwake = !!i21309[4]
  i21308.loop = !!i21309[5]
  i21308.time = i21309[6]
  i21308.volume = i21309[7]
  i21308.pitch = i21309[8]
  i21308.enabled = !!i21309[9]
  return i21308
}

Deserializers["PlayableSpatialAudio"] = function (request, data, root) {
  var i21310 = root || request.c( 'PlayableSpatialAudio' )
  var i21311 = data
  request.r(i21311[0], i21311[1], 0, i21310, 'listener')
  request.r(i21311[2], i21311[3], 0, i21310, 'source')
  i21310.volume = i21311[4]
  i21310.minDistance = i21311[5]
  i21310.maxDistance = i21311[6]
  i21310.linear = !!i21311[7]
  return i21310
}

Deserializers["StealEggGame"] = function (request, data, root) {
  var i21312 = root || request.c( 'StealEggGame' )
  var i21313 = data
  var i21315 = i21313[0]
  var i21314 = []
  for(var i = 0; i < i21315.length; i += 1) {
    i21314.push( request.d('StealEggGame+PetInfo', i21315[i + 0]) );
  }
  i21312.petCatalog = i21314
  var i21317 = i21313[1]
  var i21316 = []
  for(var i = 0; i < i21317.length; i += 1) {
    i21316.push( request.d('StealEggGame+TrailInfo', i21317[i + 0]) );
  }
  i21312.trails = i21316
  var i21319 = i21313[2]
  var i21318 = []
  for(var i = 0; i < i21319.length; i += 1) {
    i21318.push( request.d('StealEggGame+BoostInfo', i21319[i + 0]) );
  }
  i21312.luckyEggRewards = i21318
  request.r(i21313[3], i21313[4], 0, i21312, 'playerHair')
  var i21321 = i21313[5]
  var i21320 = []
  for(var i = 0; i < i21321.length; i += 2) {
  request.r(i21321[i + 0], i21321[i + 1], 2, i21320, '')
  }
  i21312.outfitHairs = i21320
  var i21323 = i21313[6]
  var i21322 = []
  for(var i = 0; i < i21323.length; i += 2) {
  request.r(i21323[i + 0], i21323[i + 1], 2, i21322, '')
  }
  i21312.outfitFaces = i21322
  var i21325 = i21313[7]
  var i21324 = []
  for(var i = 0; i < i21325.length; i += 2) {
  request.r(i21325[i + 0], i21325[i + 1], 2, i21324, '')
  }
  i21312.outfitShirts = i21324
  var i21327 = i21313[8]
  var i21326 = []
  for(var i = 0; i < i21327.length; i += 2) {
  request.r(i21327[i + 0], i21327[i + 1], 2, i21326, '')
  }
  i21312.outfitPants = i21326
  var i21329 = i21313[9]
  var i21328 = []
  for(var i = 0; i < i21329.length; i += 2) {
  request.r(i21329[i + 0], i21329[i + 1], 2, i21328, '')
  }
  i21312.rarityMaterials = i21328
  var i21331 = i21313[10]
  var i21330 = []
  for(var i = 0; i < i21331.length; i += 2) {
  request.r(i21331[i + 0], i21331[i + 1], 2, i21330, '')
  }
  i21312.rarityWorldMaterials = i21330
  request.r(i21313[11], i21313[12], 0, i21312, 'rarityFont')
  var i21333 = i21313[13]
  var i21332 = []
  for(var i = 0; i < i21333.length; i += 2) {
  request.r(i21333[i + 0], i21333[i + 1], 2, i21332, '')
  }
  i21312.rarityFrames = i21332
  request.r(i21313[14], i21313[15], 0, i21312, 'batIcon')
  request.r(i21313[16], i21313[17], 0, i21312, 'nightIcon')
  request.r(i21313[18], i21313[19], 0, i21312, 'dayIcon')
  request.r(i21313[20], i21313[21], 0, i21312, 'trainBoostIcon')
  request.r(i21313[22], i21313[23], 0, i21312, 'incubateBoostIcon')
  request.r(i21313[24], i21313[25], 0, i21312, 'batPrefab')
  request.r(i21313[26], i21313[27], 0, i21312, 'luckyEggPrefab')
  request.r(i21313[28], i21313[29], 0, i21312, 'incubateTimerPrefab')
  request.r(i21313[30], i21313[31], 0, i21312, 'floatingTextPrefab')
  request.r(i21313[32], i21313[33], 0, i21312, 'npcTemplate')
  request.r(i21313[34], i21313[35], 0, i21312, 'footstepSound')
  request.r(i21313[36], i21313[37], 0, i21312, 'clickSound')
  request.r(i21313[38], i21313[39], 0, i21312, 'closeSound')
  request.r(i21313[40], i21313[41], 0, i21312, 'rewardSound')
  request.r(i21313[42], i21313[43], 0, i21312, 'upgradeSound')
  request.r(i21313[44], i21313[45], 0, i21312, 'trainSound')
  request.r(i21313[46], i21313[47], 0, i21312, 'equipSound')
  request.r(i21313[48], i21313[49], 0, i21312, 'fuseSound')
  request.r(i21313[50], i21313[51], 0, i21312, 'frogSound')
  request.r(i21313[52], i21313[53], 0, i21312, 'progressSound')
  request.r(i21313[54], i21313[55], 0, i21312, 'warningSound')
  request.r(i21313[56], i21313[57], 0, i21312, 'crackSound')
  request.r(i21313[58], i21313[59], 0, i21312, 'popupSound')
  i21312.coopPrices = i21313[60]
  i21312.coopModelByLevel = i21313[61]
  i21312.coopBaseSlots = i21313[62]
  i21312.treadmillPrices = i21313[63]
  i21312.treadmillTrainValues = i21313[64]
  i21312.priceMultiplier = i21313[65]
  i21312.dayDuration = i21313[66]
  i21312.nightDuration = i21313[67]
  i21312.nightIncubateMultiplier = i21313[68]
  i21312.dayLightIntensity = i21313[69]
  i21312.lightTransition = i21313[70]
  i21312.incomeMultiplierBySize = i21313[71]
  i21312.sellPriceMultiplier = i21313[72]
  i21312.luckyFrogFeedMultiplier = i21313[73]
  i21312.trainTick = i21313[74]
  i21312.hatchDuration = i21313[75]
  i21312.luckyEggOpenDuration = i21313[76]
  i21312.fuseDuration = i21313[77]
  i21312.npcCount = i21313[78]
  i21312.npcCoopSmallPets = i21313[79]
  i21312.npcCoopBigPetSize = i21313[80]
  i21312.npcMinSpeed = i21313[81]
  i21312.npcMaxSpeed = i21313[82]
  i21312.batCooldown = i21313[83]
  i21312.batForce = i21313[84]
  var i21335 = i21313[85]
  var i21334 = []
  for(var i = 0; i < i21335.length; i += 1) {
    i21334.push( request.d('StealEggGame+House', i21335[i + 0]) );
  }
  i21312.houses = i21334
  request.r(i21313[86], i21313[87], 0, i21312, 'fuseMachine')
  request.r(i21313[88], i21313[89], 0, i21312, 'exchangeShop')
  request.r(i21313[90], i21313[91], 0, i21312, 'luckyFrog')
  request.r(i21313[92], i21313[93], 0, i21312, 'luckyEggSpawn')
  request.r(i21313[94], i21313[95], 0, i21312, 'luckyEggTarget')
  request.r(i21313[96], i21313[97], 0, i21312, 'teleportPoint')
  request.r(i21313[98], i21313[99], 0, i21312, 'lobbyCenter')
  request.r(i21313[100], i21313[101], 0, i21312, 'originalUI')
  i21312.lobbySize = new pc.Vec3( i21313[102], i21313[103], i21313[104] )
  request.r(i21313[105], i21313[106], 0, i21312, 'combatArea')
  request.r(i21313[107], i21313[108], 0, i21312, 'nightGraphic')
  request.r(i21313[109], i21313[110], 0, i21312, 'nightText')
  request.r(i21313[111], i21313[112], 0, i21312, 'sun')
  var i21337 = i21313[113]
  var i21336 = []
  for(var i = 0; i < i21337.length; i += 2) {
  request.r(i21337[i + 0], i21337[i + 1], 2, i21336, '')
  }
  i21312.npcModels = i21336
  var i21339 = i21313[114]
  var i21338 = []
  for(var i = 0; i < i21339.length; i += 1) {
    i21338.push( request.d('StealEggGame+Zone', i21339[i + 0]) );
  }
  i21312.zones = i21338
  request.r(i21313[115], i21313[116], 0, i21312, 'player')
  request.r(i21313[117], i21313[118], 0, i21312, 'home')
  request.r(i21313[119], i21313[120], 0, i21312, 'safePoint')
  request.r(i21313[121], i21313[122], 0, i21312, 'rightHandSlot')
  request.r(i21313[123], i21313[124], 0, i21312, 'playerCoopArea')
  request.r(i21313[125], i21313[126], 0, i21312, 'trainingPoint')
  request.r(i21313[127], i21313[128], 0, i21312, 'gameCamera')
  request.r(i21313[129], i21313[130], 0, i21312, 'playerAnimator')
  request.r(i21313[131], i21313[132], 0, i21312, 'ragdoll')
  request.r(i21313[133], i21313[134], 0, i21312, 'uiFont')
  request.r(i21313[135], i21313[136], 0, i21312, 'guideMaterial')
  request.r(i21313[137], i21313[138], 0, i21312, 'roundedSprite')
  request.r(i21313[139], i21313[140], 0, i21312, 'circleSprite')
  request.r(i21313[141], i21313[142], 0, i21312, 'moneyIcon')
  request.r(i21313[143], i21313[144], 0, i21312, 'speedIcon')
  request.r(i21313[145], i21313[146], 0, i21312, 'stealSound')
  request.r(i21313[147], i21313[148], 0, i21312, 'deliverSound')
  request.r(i21313[149], i21313[150], 0, i21312, 'hatchSound')
  request.r(i21313[151], i21313[152], 0, i21312, 'caughtSound')
  request.r(i21313[153], i21313[154], 0, i21312, 'eggBreakEffect')
  request.r(i21313[155], i21313[156], 0, i21312, 'sourceHud')
  i21312.capturesForEndCard = i21313[157]
  i21312.moveSpeed = i21313[158]
  i21312.incubationSeconds = i21313[159]
  i21312.jumpHeight = i21313[160]
  i21312.gravity = i21313[161]
  i21312.baseMoveSpeed = i21313[162]
  i21312.speedPowerMultiplier = i21313[163]
  i21312.trainingPowerPerTick = i21313[164]
  i21312.cameraDistance = i21313[165]
  i21312.cameraPitch = i21313[166]
  i21312.startingMoney = i21313[167]
  i21312.slowMode = !!i21313[168]
  i21312.hitWindup = i21313[169]
  i21312.knockdownDuration = i21313[170]
  i21312.getUpDuration = i21313[171]
  request.r(i21313[172], i21313[173], 0, i21312, 'guide')
  i21312.hudUI = request.d('StealEggGame+HudUI', i21313[174], i21312.hudUI)
  i21312.petsUI = request.d('StealEggGame+PetsPopupUI', i21313[175], i21312.petsUI)
  i21312.incubateUI = request.d('StealEggGame+IncubatePopupUI', i21313[176], i21312.incubateUI)
  i21312.inventoryUI = request.d('StealEggGame+InventoryUI', i21313[177], i21312.inventoryUI)
  i21312.rewardUI = request.d('StealEggGame+RewardUI', i21313[178], i21312.rewardUI)
  i21312.dialogUI = request.d('StealEggGame+DialogUI', i21313[179], i21312.dialogUI)
  request.r(i21313[180], i21313[181], 0, i21312, 'warningPanel')
  i21312.treadmillUI = request.d('StealEggGame+TreadmillPanelUI', i21313[182], i21312.treadmillUI)
  i21312.indexUI = request.d('StealEggGame+IndexUI', i21313[183], i21312.indexUI)
  i21312.settingsUI = request.d('StealEggGame+LockedPanelUI', i21313[184], i21312.settingsUI)
  i21312.coopUI = request.d('StealEggGame+LockedPanelUI', i21313[185], i21312.coopUI)
  i21312.fuseUI = request.d('StealEggGame+LockedPanelUI', i21313[186], i21312.fuseUI)
  i21312.frogUI = request.d('StealEggGame+LockedPanelUI', i21313[187], i21312.frogUI)
  i21312.shopUI = request.d('StealEggGame+LockedPanelUI', i21313[188], i21312.shopUI)
  i21312.trailUI = request.d('StealEggGame+LockedPanelUI', i21313[189], i21312.trailUI)
  request.r(i21313[190], i21313[191], 0, i21312, 'jumpButton')
  request.r(i21313[192], i21313[193], 0, i21312, 'safeUI')
  request.r(i21313[194], i21313[195], 0, i21312, 'hintHand')
  request.r(i21313[196], i21313[197], 0, i21312, 'cameraHint')
  request.r(i21313[198], i21313[199], 0, i21312, 'jumpHint')
  request.r(i21313[200], i21313[201], 0, i21312, 'tutorialText')
  request.r(i21313[202], i21313[203], 0, i21312, 'joystick')
  return i21312
}

Deserializers["StealEggGame+PetInfo"] = function (request, data, root) {
  var i21342 = root || request.c( 'StealEggGame+PetInfo' )
  var i21343 = data
  i21342.name = i21343[0]
  i21342.rarity = i21343[1]
  i21342.zone = i21343[2]
  i21342.income = i21343[3]
  request.r(i21343[4], i21343[5], 0, i21342, 'thumbnail')
  request.r(i21343[6], i21343[7], 0, i21342, 'prefab')
  return i21342
}

Deserializers["StealEggGame+TrailInfo"] = function (request, data, root) {
  var i21346 = root || request.c( 'StealEggGame+TrailInfo' )
  var i21347 = data
  i21346.name = i21347[0]
  i21346.rarity = i21347[1]
  i21346.multiplier = i21347[2]
  i21346.price = i21347[3]
  request.r(i21347[4], i21347[5], 0, i21346, 'thumbnail')
  request.r(i21347[6], i21347[7], 0, i21346, 'frame')
  request.r(i21347[8], i21347[9], 0, i21346, 'prefab')
  return i21346
}

Deserializers["StealEggGame+BoostInfo"] = function (request, data, root) {
  var i21350 = root || request.c( 'StealEggGame+BoostInfo' )
  var i21351 = data
  i21350.name = i21351[0]
  i21350.type = i21351[1]
  i21350.value = i21351[2]
  i21350.duration = i21351[3]
  i21350.weight = i21351[4]
  request.r(i21351[5], i21351[6], 0, i21350, 'icon')
  return i21350
}

Deserializers["StealEggGame+House"] = function (request, data, root) {
  var i21356 = root || request.c( 'StealEggGame+House' )
  var i21357 = data
  request.r(i21357[0], i21357[1], 0, i21356, 'root')
  request.r(i21357[2], i21357[3], 0, i21356, 'coopPad')
  request.r(i21357[4], i21357[5], 0, i21356, 'treadmillPad')
  request.r(i21357[6], i21357[7], 0, i21356, 'petContainer')
  var i21359 = i21357[8]
  var i21358 = []
  for(var i = 0; i < i21359.length; i += 2) {
  request.r(i21359[i + 0], i21359[i + 1], 2, i21358, '')
  }
  i21356.coopModels = i21358
  var i21361 = i21357[9]
  var i21360 = []
  for(var i = 0; i < i21361.length; i += 2) {
  request.r(i21361[i + 0], i21361[i + 1], 2, i21360, '')
  }
  i21356.treadmills = i21360
  return i21356
}

Deserializers["StealEggGame+Zone"] = function (request, data, root) {
  var i21366 = root || request.c( 'StealEggGame+Zone' )
  var i21367 = data
  i21366.name = i21367[0]
  request.r(i21367[1], i21367[2], 0, i21366, 'root')
  request.r(i21367[3], i21367[4], 0, i21366, 'guardian')
  var i21369 = i21367[5]
  var i21368 = []
  for(var i = 0; i < i21369.length; i += 2) {
  request.r(i21369[i + 0], i21369[i + 1], 2, i21368, '')
  }
  i21366.nests = i21368
  var i21371 = i21367[6]
  var i21370 = []
  for(var i = 0; i < i21371.length; i += 2) {
  request.r(i21371[i + 0], i21371[i + 1], 2, i21370, '')
  }
  i21366.eggPrefabs = i21370
  var i21373 = i21367[7]
  var i21372 = []
  for(var i = 0; i < i21373.length; i += 2) {
  request.r(i21373[i + 0], i21373[i + 1], 2, i21372, '')
  }
  i21366.petPrefabs = i21372
  var i21375 = i21367[8]
  var i21374 = []
  for(var i = 0; i < i21375.length; i += 1) {
    i21374.push( request.d('PlayableEggRules', i21375[i + 0]) );
  }
  i21366.eggRules = i21374
  request.r(i21367[9], i21367[10], 0, i21366, 'bounds')
  request.r(i21367[11], i21367[12], 0, i21366, 'thumbnail')
  i21366.attackDistance = i21367[13]
  i21366.guardianSpeed = i21367[14]
  request.r(i21367[15], i21367[16], 0, i21366, 'sleepSound')
  request.r(i21367[17], i21367[18], 0, i21366, 'runSound')
  request.r(i21367[19], i21367[20], 0, i21366, 'catchSound')
  return i21366
}

Deserializers["PlayableEggRules"] = function (request, data, root) {
  var i21378 = root || request.c( 'PlayableEggRules' )
  var i21379 = data
  i21378.name = i21379[0]
  request.r(i21379[1], i21379[2], 0, i21378, 'thumbnail')
  i21378.petIds = i21379[3]
  i21378.spawnWeight = i21379[4]
  i21378.incubationTime = i21379[5]
  var i21381 = i21379[6]
  var i21380 = []
  for(var i = 0; i < i21381.length; i += 2) {
    i21380.push( new pc.Vec2( i21381[i + 0], i21381[i + 1] ) );
  }
  i21378.sizeRanges = i21380
  i21378.sizeWeights = i21379[7]
  var i21383 = i21379[8]
  var i21382 = []
  for(var i = 0; i < i21383.length; i += 2) {
  request.r(i21383[i + 0], i21383[i + 1], 2, i21382, '')
  }
  i21378.pets = i21382
  i21378.petWeights = i21379[9]
  i21378.petIncome = i21379[10]
  return i21378
}

Deserializers["StealEggGame+HudUI"] = function (request, data, root) {
  var i21386 = root || request.c( 'StealEggGame+HudUI' )
  var i21387 = data
  request.r(i21387[0], i21387[1], 0, i21386, 'functions')
  var i21389 = i21387[2]
  var i21388 = []
  for(var i = 0; i < i21389.length; i += 2) {
  request.r(i21389[i + 0], i21389[i + 1], 2, i21388, '')
  }
  i21386.actionButtons = i21388
  request.r(i21387[3], i21387[4], 0, i21386, 'incubateTapHint')
  request.r(i21387[5], i21387[6], 0, i21386, 'hatchTapHint')
  request.r(i21387[7], i21387[8], 0, i21386, 'equipTapHint')
  request.r(i21387[9], i21387[10], 0, i21386, 'trainTapHint')
  request.r(i21387[11], i21387[12], 0, i21386, 'attack')
  request.r(i21387[13], i21387[14], 0, i21386, 'settings')
  request.r(i21387[15], i21387[16], 0, i21386, 'trailShop')
  request.r(i21387[17], i21387[18], 0, i21386, 'index')
  request.r(i21387[19], i21387[20], 0, i21386, 'speedMode')
  request.r(i21387[21], i21387[22], 0, i21386, 'speedOn')
  request.r(i21387[23], i21387[24], 0, i21386, 'speedOff')
  request.r(i21387[25], i21387[26], 0, i21386, 'money')
  request.r(i21387[27], i21387[28], 0, i21386, 'speed')
  request.r(i21387[29], i21387[30], 0, i21386, 'time')
  request.r(i21387[31], i21387[32], 0, i21386, 'moneyIcon')
  request.r(i21387[33], i21387[34], 0, i21386, 'speedIcon')
  request.r(i21387[35], i21387[36], 0, i21386, 'timeIcon')
  request.r(i21387[37], i21387[38], 0, i21386, 'indexHighlight')
  request.r(i21387[39], i21387[40], 0, i21386, 'incubateHighlight')
  request.r(i21387[41], i21387[42], 0, i21386, 'right')
  request.r(i21387[43], i21387[44], 0, i21386, 'equipMonster')
  request.r(i21387[45], i21387[46], 0, i21386, 'incubateEgg')
  request.r(i21387[47], i21387[48], 0, i21386, 'boostContainer')
  request.r(i21387[49], i21387[50], 0, i21386, 'boostTemplate')
  request.r(i21387[51], i21387[52], 0, i21386, 'zoneBanner')
  request.r(i21387[53], i21387[54], 0, i21386, 'zoneFrame')
  request.r(i21387[55], i21387[56], 0, i21386, 'zoneName')
  request.r(i21387[57], i21387[58], 0, i21386, 'incomeTemplate')
  return i21386
}

Deserializers["StealEggGame+PetsPopupUI"] = function (request, data, root) {
  var i21390 = root || request.c( 'StealEggGame+PetsPopupUI' )
  var i21391 = data
  request.r(i21391[0], i21391[1], 0, i21390, 'root')
  request.r(i21391[2], i21391[3], 0, i21390, 'content')
  request.r(i21391[4], i21391[5], 0, i21390, 'template')
  request.r(i21391[6], i21391[7], 0, i21390, 'close')
  request.r(i21391[8], i21391[9], 0, i21390, 'equipBest')
  request.r(i21391[10], i21391[11], 0, i21390, 'upgradeSlot')
  request.r(i21391[12], i21391[13], 0, i21390, 'slots')
  request.r(i21391[14], i21391[15], 0, i21390, 'upgradePrice')
  request.r(i21391[16], i21391[17], 0, i21390, 'upgradeUnavailable')
  return i21390
}

Deserializers["StealEggGame+IncubatePopupUI"] = function (request, data, root) {
  var i21392 = root || request.c( 'StealEggGame+IncubatePopupUI' )
  var i21393 = data
  request.r(i21393[0], i21393[1], 0, i21392, 'root')
  request.r(i21393[2], i21393[3], 0, i21392, 'content')
  request.r(i21393[4], i21393[5], 0, i21392, 'template')
  request.r(i21393[6], i21393[7], 0, i21392, 'close')
  return i21392
}

Deserializers["StealEggGame+InventoryUI"] = function (request, data, root) {
  var i21394 = root || request.c( 'StealEggGame+InventoryUI' )
  var i21395 = data
  var i21397 = i21395[0]
  var i21396 = []
  for(var i = 0; i < i21397.length; i += 2) {
  request.r(i21397[i + 0], i21397[i + 1], 2, i21396, '')
  }
  i21394.quickSlots = i21396
  request.r(i21395[1], i21395[2], 0, i21394, 'bag')
  request.r(i21395[3], i21395[4], 0, i21394, 'bagClose')
  request.r(i21395[5], i21395[6], 0, i21394, 'bagPopup')
  request.r(i21395[7], i21395[8], 0, i21394, 'bagContent')
  request.r(i21395[9], i21395[10], 0, i21394, 'bagTemplate')
  request.r(i21395[11], i21395[12], 0, i21394, 'petInfo')
  request.r(i21395[13], i21395[14], 0, i21394, 'petThumbnail')
  request.r(i21395[15], i21395[16], 0, i21394, 'petName')
  request.r(i21395[17], i21395[18], 0, i21394, 'petIncome')
  request.r(i21395[19], i21395[20], 0, i21394, 'petRarity')
  request.r(i21395[21], i21395[22], 0, i21394, 'petEquip')
  request.r(i21395[23], i21395[24], 0, i21394, 'petDrop')
  request.r(i21395[25], i21395[26], 0, i21394, 'eggInfo')
  request.r(i21395[27], i21395[28], 0, i21394, 'eggThumbnail')
  request.r(i21395[29], i21395[30], 0, i21394, 'eggName')
  request.r(i21395[31], i21395[32], 0, i21394, 'eggWeight')
  request.r(i21395[33], i21395[34], 0, i21394, 'eggIncubate')
  request.r(i21395[35], i21395[36], 0, i21394, 'eggDrop')
  return i21394
}

Deserializers["StealEggGame+RewardUI"] = function (request, data, root) {
  var i21400 = root || request.c( 'StealEggGame+RewardUI' )
  var i21401 = data
  request.r(i21401[0], i21401[1], 0, i21400, 'root')
  request.r(i21401[2], i21401[3], 0, i21400, 'title')
  request.r(i21401[4], i21401[5], 0, i21400, 'content')
  request.r(i21401[6], i21401[7], 0, i21400, 'template')
  request.r(i21401[8], i21401[9], 0, i21400, 'close')
  request.r(i21401[10], i21401[11], 0, i21400, 'tapToClose')
  return i21400
}

Deserializers["StealEggGame+DialogUI"] = function (request, data, root) {
  var i21402 = root || request.c( 'StealEggGame+DialogUI' )
  var i21403 = data
  request.r(i21403[0], i21403[1], 0, i21402, 'root')
  request.r(i21403[2], i21403[3], 0, i21402, 'message')
  return i21402
}

Deserializers["StealEggGame+TreadmillPanelUI"] = function (request, data, root) {
  var i21404 = root || request.c( 'StealEggGame+TreadmillPanelUI' )
  var i21405 = data
  request.r(i21405[0], i21405[1], 0, i21404, 'root')
  request.r(i21405[2], i21405[3], 0, i21404, 'close')
  request.r(i21405[4], i21405[5], 0, i21404, 'upgrade')
  request.r(i21405[6], i21405[7], 0, i21404, 'level')
  request.r(i21405[8], i21405[9], 0, i21404, 'train')
  request.r(i21405[10], i21405[11], 0, i21404, 'price')
  request.r(i21405[12], i21405[13], 0, i21404, 'max')
  return i21404
}

Deserializers["StealEggGame+IndexUI"] = function (request, data, root) {
  var i21406 = root || request.c( 'StealEggGame+IndexUI' )
  var i21407 = data
  request.r(i21407[0], i21407[1], 0, i21406, 'root')
  request.r(i21407[2], i21407[3], 0, i21406, 'close')
  request.r(i21407[4], i21407[5], 0, i21406, 'claim')
  request.r(i21407[6], i21407[7], 0, i21406, 'zones')
  request.r(i21407[8], i21407[9], 0, i21406, 'zoneTemplate')
  request.r(i21407[10], i21407[11], 0, i21406, 'lockedZone')
  request.r(i21407[12], i21407[13], 0, i21406, 'progressFill')
  request.r(i21407[14], i21407[15], 0, i21406, 'progress')
  request.r(i21407[16], i21407[17], 0, i21406, 'information')
  request.r(i21407[18], i21407[19], 0, i21406, 'rewardFrame')
  request.r(i21407[20], i21407[21], 0, i21406, 'claimed')
  request.r(i21407[22], i21407[23], 0, i21406, 'infoImage')
  request.r(i21407[24], i21407[25], 0, i21406, 'infoName')
  request.r(i21407[26], i21407[27], 0, i21406, 'infoIncome')
  request.r(i21407[28], i21407[29], 0, i21406, 'infoRarity')
  request.r(i21407[30], i21407[31], 0, i21406, 'rewardContent')
  request.r(i21407[32], i21407[33], 0, i21406, 'rewardTemplate')
  return i21406
}

Deserializers["StealEggGame+LockedPanelUI"] = function (request, data, root) {
  var i21408 = root || request.c( 'StealEggGame+LockedPanelUI' )
  var i21409 = data
  request.r(i21409[0], i21409[1], 0, i21408, 'root')
  request.r(i21409[2], i21409[3], 0, i21408, 'close')
  return i21408
}

Deserializers["PlayableRagdoll"] = function (request, data, root) {
  var i21410 = root || request.c( 'PlayableRagdoll' )
  var i21411 = data
  request.r(i21411[0], i21411[1], 0, i21410, 'player')
  request.r(i21411[2], i21411[3], 0, i21410, 'animator')
  request.r(i21411[4], i21411[5], 0, i21410, 'hips')
  var i21413 = i21411[6]
  var i21412 = []
  for(var i = 0; i < i21413.length; i += 2) {
  request.r(i21413[i + 0], i21413[i + 1], 2, i21412, '')
  }
  i21410.bodies = i21412
  var i21415 = i21411[7]
  var i21414 = []
  for(var i = 0; i < i21415.length; i += 2) {
  request.r(i21415[i + 0], i21415[i + 1], 2, i21414, '')
  }
  i21410.bodyColliders = i21414
  return i21410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i21420 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i21421 = data
  i21420.textureMode = i21421[0]
  i21420.alignment = i21421[1]
  i21420.widthCurve = new pc.AnimationCurve( { keys_flow: i21421[2] } )
  i21420.colorGradient = i21421[3] ? new pc.ColorGradient(i21421[3][0], i21421[3][1], i21421[3][2]) : null
  var i21423 = i21421[4]
  var i21422 = []
  for(var i = 0; i < i21423.length; i += 3) {
    i21422.push( new pc.Vec3( i21423[i + 0], i21423[i + 1], i21423[i + 2] ) );
  }
  i21420.positions = i21422
  i21420.positionCount = i21421[5]
  i21420.widthMultiplier = i21421[6]
  i21420.startWidth = i21421[7]
  i21420.endWidth = i21421[8]
  i21420.numCornerVertices = i21421[9]
  i21420.numCapVertices = i21421[10]
  i21420.useWorldSpace = !!i21421[11]
  i21420.loop = !!i21421[12]
  i21420.startColor = new pc.Color(i21421[13], i21421[14], i21421[15], i21421[16])
  i21420.endColor = new pc.Color(i21421[17], i21421[18], i21421[19], i21421[20])
  i21420.generateLightingData = !!i21421[21]
  i21420.enabled = !!i21421[22]
  request.r(i21421[23], i21421[24], 0, i21420, 'sharedMaterial')
  var i21425 = i21421[25]
  var i21424 = []
  for(var i = 0; i < i21425.length; i += 2) {
  request.r(i21425[i + 0], i21425[i + 1], 2, i21424, '')
  }
  i21420.sharedMaterials = i21424
  i21420.receiveShadows = !!i21421[26]
  i21420.shadowCastingMode = i21421[27]
  i21420.sortingLayerID = i21421[28]
  i21420.sortingOrder = i21421[29]
  i21420.lightmapIndex = i21421[30]
  i21420.lightmapSceneIndex = i21421[31]
  i21420.lightmapScaleOffset = new pc.Vec4( i21421[32], i21421[33], i21421[34], i21421[35] )
  i21420.lightProbeUsage = i21421[36]
  i21420.reflectionProbeUsage = i21421[37]
  return i21420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i21426 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i21427 = data
  i21426.enabled = !!i21427[0]
  i21426.center = new pc.Vec3( i21427[1], i21427[2], i21427[3] )
  i21426.radius = i21427[4]
  i21426.height = i21427[5]
  i21426.minMoveDistance = i21427[6]
  i21426.skinWidth = i21427[7]
  i21426.enableOverlapRecovery = !!i21427[8]
  return i21426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i21428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i21429 = data
  i21428.swingAxis = new pc.Vec3( i21429[0], i21429[1], i21429[2] )
  i21428.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i21429[3], i21428.twistLimitSpring)
  i21428.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i21429[4], i21428.swingLimitSpring)
  i21428.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i21429[5], i21428.lowTwistLimit)
  i21428.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i21429[6], i21428.highTwistLimit)
  i21428.swing1Limit = request.d('UnityEngine.SoftJointLimit', i21429[7], i21428.swing1Limit)
  i21428.swing2Limit = request.d('UnityEngine.SoftJointLimit', i21429[8], i21428.swing2Limit)
  request.r(i21429[9], i21429[10], 0, i21428, 'connectedBody')
  i21428.axis = new pc.Vec3( i21429[11], i21429[12], i21429[13] )
  i21428.anchor = new pc.Vec3( i21429[14], i21429[15], i21429[16] )
  i21428.connectedAnchor = new pc.Vec3( i21429[17], i21429[18], i21429[19] )
  i21428.autoConfigureConnectedAnchor = !!i21429[20]
  i21428.massScale = i21429[21]
  i21428.connectedMassScale = i21429[22]
  i21428.enableCollision = !!i21429[23]
  i21428.breakForce = i21429[24]
  i21428.breakTorque = i21429[25]
  return i21428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i21430 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i21431 = data
  i21430.aspect = i21431[0]
  i21430.orthographic = !!i21431[1]
  i21430.orthographicSize = i21431[2]
  i21430.backgroundColor = new pc.Color(i21431[3], i21431[4], i21431[5], i21431[6])
  i21430.nearClipPlane = i21431[7]
  i21430.farClipPlane = i21431[8]
  i21430.fieldOfView = i21431[9]
  i21430.depth = i21431[10]
  i21430.clearFlags = i21431[11]
  i21430.cullingMask = i21431[12]
  i21430.rect = i21431[13]
  request.r(i21431[14], i21431[15], 0, i21430, 'targetTexture')
  i21430.usePhysicalProperties = !!i21431[16]
  i21430.focalLength = i21431[17]
  i21430.sensorSize = new pc.Vec2( i21431[18], i21431[19] )
  i21430.lensShift = new pc.Vec2( i21431[20], i21431[21] )
  i21430.gateFit = i21431[22]
  i21430.commandBufferCount = i21431[23]
  i21430.cameraType = i21431[24]
  i21430.enabled = !!i21431[25]
  return i21430
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i21432 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i21433 = data
  request.r(i21433[0], i21433[1], 0, i21432, 'm_FirstSelected')
  i21432.m_sendNavigationEvents = !!i21433[2]
  i21432.m_DragThreshold = i21433[3]
  return i21432
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i21434 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i21435 = data
  i21434.m_HorizontalAxis = i21435[0]
  i21434.m_VerticalAxis = i21435[1]
  i21434.m_SubmitButton = i21435[2]
  i21434.m_CancelButton = i21435[3]
  i21434.m_InputActionsPerSecond = i21435[4]
  i21434.m_RepeatDelay = i21435[5]
  i21434.m_ForceModuleActive = !!i21435[6]
  i21434.m_SendPointerHoverToParent = !!i21435[7]
  return i21434
}

Deserializers["PlayableCameraDrag"] = function (request, data, root) {
  var i21436 = root || request.c( 'PlayableCameraDrag' )
  var i21437 = data
  request.r(i21437[0], i21437[1], 0, i21436, 'game')
  return i21436
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i21438 = root || request.c( 'PlayableJoystick' )
  var i21439 = data
  request.r(i21439[0], i21439[1], 0, i21438, 'knob')
  return i21438
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i21440 = root || request.c( 'UnityEngine.UI.Outline' )
  var i21441 = data
  i21440.m_EffectColor = new pc.Color(i21441[0], i21441[1], i21441[2], i21441[3])
  i21440.m_EffectDistance = new pc.Vec2( i21441[4], i21441[5] )
  i21440.m_UseGraphicAlpha = !!i21441[6]
  return i21440
}

Deserializers["TapHintView"] = function (request, data, root) {
  var i21442 = root || request.c( 'TapHintView' )
  var i21443 = data
  request.r(i21443[0], i21443[1], 0, i21442, 'hand')
  request.r(i21443[2], i21443[3], 0, i21442, 'shine')
  request.r(i21443[4], i21443[5], 0, i21442, 'shineGraphic')
  return i21442
}

Deserializers["LunaController"] = function (request, data, root) {
  var i21444 = root || request.c( 'LunaController' )
  var i21445 = data
  i21444.LimitTimePlay = !!i21445[0]
  i21444.TimePlay = i21445[1]
  request.r(i21445[2], i21445[3], 0, i21444, 'BGM')
  i21444.LimitCountClick = !!i21445[4]
  i21444.MaxCountClick = i21445[5]
  i21444.LimitCountIncubate = !!i21445[6]
  i21444.MaxCountIncubate = i21445[7]
  i21444.LimitCountHatch = !!i21445[8]
  i21444.MaxCountHatch = i21445[9]
  request.r(i21445[10], i21445[11], 0, i21444, 'musicSource')
  var i21447 = i21445[12]
  var i21446 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i21447.length; i += 2) {
  request.r(i21447[i + 0], i21447[i + 1], 1, i21446, '')
  }
  i21444.CTA = i21446
  request.r(i21445[13], i21445[14], 0, i21444, 'endCard')
  return i21444
}

Deserializers["IconAmountView"] = function (request, data, root) {
  var i21450 = root || request.c( 'IconAmountView' )
  var i21451 = data
  request.r(i21451[0], i21451[1], 0, i21450, 'icon')
  request.r(i21451[2], i21451[3], 0, i21450, 'amount')
  return i21450
}

Deserializers["PlayableHoldButton"] = function (request, data, root) {
  var i21452 = root || request.c( 'PlayableHoldButton' )
  var i21453 = data
  i21452.duration = i21453[0]
  request.r(i21453[1], i21453[2], 0, i21452, 'fill')
  i21452.onHold = request.d('System.Action', i21453[3], i21452.onHold)
  return i21452
}

Deserializers["System.Action"] = function (request, data, root) {
  var i21454 = root || request.c( 'System.Action' )
  var i21455 = data
  return i21454
}

Deserializers["PetRowView"] = function (request, data, root) {
  var i21456 = root || request.c( 'PetRowView' )
  var i21457 = data
  request.r(i21457[0], i21457[1], 0, i21456, 'content')
  request.r(i21457[2], i21457[3], 0, i21456, 'thumbnail')
  request.r(i21457[4], i21457[5], 0, i21456, 'unequip')
  return i21456
}

Deserializers["IncubateRowView"] = function (request, data, root) {
  var i21458 = root || request.c( 'IncubateRowView' )
  var i21459 = data
  request.r(i21459[0], i21459[1], 0, i21458, 'thumbnail')
  request.r(i21459[2], i21459[3], 0, i21458, 'progressFill')
  request.r(i21459[4], i21459[5], 0, i21458, 'content')
  request.r(i21459[6], i21459[7], 0, i21458, 'open')
  request.r(i21459[8], i21459[9], 0, i21458, 'opening')
  return i21458
}

Deserializers["BagCellView"] = function (request, data, root) {
  var i21460 = root || request.c( 'BagCellView' )
  var i21461 = data
  request.r(i21461[0], i21461[1], 0, i21460, 'button')
  request.r(i21461[2], i21461[3], 0, i21460, 'thumbnail')
  request.r(i21461[4], i21461[5], 0, i21460, 'highlight')
  request.r(i21461[6], i21461[7], 0, i21460, 'exposeMark')
  request.r(i21461[8], i21461[9], 0, i21460, 'amount')
  return i21460
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i21462 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i21463 = data
  i21462.m_Spacing = i21463[0]
  i21462.m_ChildForceExpandWidth = !!i21463[1]
  i21462.m_ChildForceExpandHeight = !!i21463[2]
  i21462.m_ChildControlWidth = !!i21463[3]
  i21462.m_ChildControlHeight = !!i21463[4]
  i21462.m_ChildScaleWidth = !!i21463[5]
  i21462.m_ChildScaleHeight = !!i21463[6]
  i21462.m_ReverseArrangement = !!i21463[7]
  i21462.m_Padding = UnityEngine.RectOffset.FromPaddings(i21463[8], i21463[9], i21463[10], i21463[11])
  i21462.m_ChildAlignment = i21463[12]
  return i21462
}

Deserializers["QuickSlotView"] = function (request, data, root) {
  var i21464 = root || request.c( 'QuickSlotView' )
  var i21465 = data
  request.r(i21465[0], i21465[1], 0, i21464, 'button')
  request.r(i21465[2], i21465[3], 0, i21464, 'thumbnail')
  request.r(i21465[4], i21465[5], 0, i21464, 'highlight')
  request.r(i21465[6], i21465[7], 0, i21464, 'content')
  return i21464
}

Deserializers["IndexZoneView"] = function (request, data, root) {
  var i21466 = root || request.c( 'IndexZoneView' )
  var i21467 = data
  request.r(i21467[0], i21467[1], 0, i21466, 'zoneName')
  request.r(i21467[2], i21467[3], 0, i21466, 'progress')
  request.r(i21467[4], i21467[5], 0, i21466, 'thumbnail')
  request.r(i21467[6], i21467[7], 0, i21466, 'progressFill')
  request.r(i21467[8], i21467[9], 0, i21466, 'petContent')
  request.r(i21467[10], i21467[11], 0, i21466, 'petTemplate')
  return i21466
}

Deserializers["IndexPetCellView"] = function (request, data, root) {
  var i21468 = root || request.c( 'IndexPetCellView' )
  var i21469 = data
  request.r(i21469[0], i21469[1], 0, i21468, 'button')
  request.r(i21469[2], i21469[3], 0, i21468, 'frame')
  request.r(i21469[4], i21469[5], 0, i21468, 'thumbnail')
  request.r(i21469[6], i21469[7], 0, i21468, 'petName')
  request.r(i21469[8], i21469[9], 0, i21468, 'selected')
  request.r(i21469[10], i21469[11], 0, i21468, 'mark')
  return i21468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i21470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i21471 = data
  i21470.ambientIntensity = i21471[0]
  i21470.reflectionIntensity = i21471[1]
  i21470.ambientMode = i21471[2]
  i21470.ambientLight = new pc.Color(i21471[3], i21471[4], i21471[5], i21471[6])
  i21470.ambientSkyColor = new pc.Color(i21471[7], i21471[8], i21471[9], i21471[10])
  i21470.ambientGroundColor = new pc.Color(i21471[11], i21471[12], i21471[13], i21471[14])
  i21470.ambientEquatorColor = new pc.Color(i21471[15], i21471[16], i21471[17], i21471[18])
  i21470.fogColor = new pc.Color(i21471[19], i21471[20], i21471[21], i21471[22])
  i21470.fogEndDistance = i21471[23]
  i21470.fogStartDistance = i21471[24]
  i21470.fogDensity = i21471[25]
  i21470.fog = !!i21471[26]
  request.r(i21471[27], i21471[28], 0, i21470, 'skybox')
  i21470.fogMode = i21471[29]
  var i21473 = i21471[30]
  var i21472 = []
  for(var i = 0; i < i21473.length; i += 1) {
    i21472.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i21473[i + 0]) );
  }
  i21470.lightmaps = i21472
  i21470.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i21471[31], i21470.lightProbes)
  i21470.lightmapsMode = i21471[32]
  i21470.mixedBakeMode = i21471[33]
  i21470.environmentLightingMode = i21471[34]
  i21470.ambientProbe = new pc.SphericalHarmonicsL2(i21471[35])
  request.r(i21471[36], i21471[37], 0, i21470, 'customReflection')
  request.r(i21471[38], i21471[39], 0, i21470, 'defaultReflection')
  i21470.defaultReflectionMode = i21471[40]
  i21470.defaultReflectionResolution = i21471[41]
  i21470.sunLightObjectId = i21471[42]
  i21470.pixelLightCount = i21471[43]
  i21470.defaultReflectionHDR = !!i21471[44]
  i21470.hasLightDataAsset = !!i21471[45]
  i21470.hasManualGenerate = !!i21471[46]
  return i21470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i21476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i21477 = data
  request.r(i21477[0], i21477[1], 0, i21476, 'lightmapColor')
  request.r(i21477[2], i21477[3], 0, i21476, 'lightmapDirection')
  request.r(i21477[4], i21477[5], 0, i21476, 'shadowMask')
  return i21476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i21478 = root || new UnityEngine.LightProbes()
  var i21479 = data
  return i21478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i21484 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i21485 = data
  var i21487 = i21485[0]
  var i21486 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i21487.length; i += 1) {
    i21486.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i21487[i + 0]));
  }
  i21484.ShaderCompilationErrors = i21486
  i21484.name = i21485[1]
  i21484.guid = i21485[2]
  var i21489 = i21485[3]
  var i21488 = []
  for(var i = 0; i < i21489.length; i += 1) {
    i21488.push( i21489[i + 0] );
  }
  i21484.shaderDefinedKeywords = i21488
  var i21491 = i21485[4]
  var i21490 = []
  for(var i = 0; i < i21491.length; i += 1) {
    i21490.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i21491[i + 0]) );
  }
  i21484.passes = i21490
  var i21493 = i21485[5]
  var i21492 = []
  for(var i = 0; i < i21493.length; i += 1) {
    i21492.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i21493[i + 0]) );
  }
  i21484.usePasses = i21492
  var i21495 = i21485[6]
  var i21494 = []
  for(var i = 0; i < i21495.length; i += 1) {
    i21494.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i21495[i + 0]) );
  }
  i21484.defaultParameterValues = i21494
  request.r(i21485[7], i21485[8], 0, i21484, 'unityFallbackShader')
  i21484.readDepth = !!i21485[9]
  i21484.hasDepthOnlyPass = !!i21485[10]
  i21484.isCreatedByShaderGraph = !!i21485[11]
  i21484.disableBatching = !!i21485[12]
  i21484.compiled = !!i21485[13]
  return i21484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i21498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i21499 = data
  i21498.shaderName = i21499[0]
  i21498.errorMessage = i21499[1]
  return i21498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i21504 = root || new pc.UnityShaderPass()
  var i21505 = data
  i21504.id = i21505[0]
  i21504.subShaderIndex = i21505[1]
  i21504.name = i21505[2]
  i21504.passType = i21505[3]
  i21504.grabPassTextureName = i21505[4]
  i21504.usePass = !!i21505[5]
  i21504.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[6], i21504.zTest)
  i21504.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[7], i21504.zWrite)
  i21504.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[8], i21504.culling)
  i21504.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i21505[9], i21504.blending)
  i21504.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i21505[10], i21504.alphaBlending)
  i21504.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[11], i21504.colorWriteMask)
  i21504.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[12], i21504.offsetUnits)
  i21504.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[13], i21504.offsetFactor)
  i21504.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[14], i21504.stencilRef)
  i21504.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[15], i21504.stencilReadMask)
  i21504.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21505[16], i21504.stencilWriteMask)
  i21504.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i21505[17], i21504.stencilOp)
  i21504.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i21505[18], i21504.stencilOpFront)
  i21504.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i21505[19], i21504.stencilOpBack)
  var i21507 = i21505[20]
  var i21506 = []
  for(var i = 0; i < i21507.length; i += 1) {
    i21506.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i21507[i + 0]) );
  }
  i21504.tags = i21506
  var i21509 = i21505[21]
  var i21508 = []
  for(var i = 0; i < i21509.length; i += 1) {
    i21508.push( i21509[i + 0] );
  }
  i21504.passDefinedKeywords = i21508
  var i21511 = i21505[22]
  var i21510 = []
  for(var i = 0; i < i21511.length; i += 1) {
    i21510.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i21511[i + 0]) );
  }
  i21504.passDefinedKeywordGroups = i21510
  var i21513 = i21505[23]
  var i21512 = []
  for(var i = 0; i < i21513.length; i += 1) {
    i21512.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i21513[i + 0]) );
  }
  i21504.variants = i21512
  var i21515 = i21505[24]
  var i21514 = []
  for(var i = 0; i < i21515.length; i += 1) {
    i21514.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i21515[i + 0]) );
  }
  i21504.excludedVariants = i21514
  i21504.hasDepthReader = !!i21505[25]
  return i21504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i21516 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i21517 = data
  i21516.val = i21517[0]
  i21516.name = i21517[1]
  return i21516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i21518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i21519 = data
  i21518.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21519[0], i21518.src)
  i21518.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21519[1], i21518.dst)
  i21518.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21519[2], i21518.op)
  return i21518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i21520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i21521 = data
  i21520.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21521[0], i21520.pass)
  i21520.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21521[1], i21520.fail)
  i21520.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21521[2], i21520.zFail)
  i21520.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i21521[3], i21520.comp)
  return i21520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i21524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i21525 = data
  i21524.name = i21525[0]
  i21524.value = i21525[1]
  return i21524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i21528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i21529 = data
  var i21531 = i21529[0]
  var i21530 = []
  for(var i = 0; i < i21531.length; i += 1) {
    i21530.push( i21531[i + 0] );
  }
  i21528.keywords = i21530
  i21528.hasDiscard = !!i21529[1]
  return i21528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i21534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i21535 = data
  i21534.passId = i21535[0]
  i21534.subShaderIndex = i21535[1]
  var i21537 = i21535[2]
  var i21536 = []
  for(var i = 0; i < i21537.length; i += 1) {
    i21536.push( i21537[i + 0] );
  }
  i21534.keywords = i21536
  i21534.vertexProgram = i21535[3]
  i21534.fragmentProgram = i21535[4]
  i21534.exportedForWebGl2 = !!i21535[5]
  i21534.readDepth = !!i21535[6]
  return i21534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i21540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i21541 = data
  request.r(i21541[0], i21541[1], 0, i21540, 'shader')
  i21540.pass = i21541[2]
  return i21540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i21544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i21545 = data
  i21544.name = i21545[0]
  i21544.type = i21545[1]
  i21544.value = new pc.Vec4( i21545[2], i21545[3], i21545[4], i21545[5] )
  i21544.textureValue = i21545[6]
  i21544.shaderPropertyFlag = i21545[7]
  return i21544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i21546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i21547 = data
  i21546.name = i21547[0]
  request.r(i21547[1], i21547[2], 0, i21546, 'texture')
  i21546.aabb = i21547[3]
  i21546.vertices = i21547[4]
  i21546.triangles = i21547[5]
  i21546.textureRect = UnityEngine.Rect.MinMaxRect(i21547[6], i21547[7], i21547[8], i21547[9])
  i21546.packedRect = UnityEngine.Rect.MinMaxRect(i21547[10], i21547[11], i21547[12], i21547[13])
  i21546.border = new pc.Vec4( i21547[14], i21547[15], i21547[16], i21547[17] )
  i21546.transparency = i21547[18]
  i21546.bounds = i21547[19]
  i21546.pixelsPerUnit = i21547[20]
  i21546.textureWidth = i21547[21]
  i21546.textureHeight = i21547[22]
  i21546.nativeSize = new pc.Vec2( i21547[23], i21547[24] )
  i21546.pivot = new pc.Vec2( i21547[25], i21547[26] )
  i21546.textureRectOffset = new pc.Vec2( i21547[27], i21547[28] )
  return i21546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i21548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i21549 = data
  i21548.name = i21549[0]
  return i21548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i21550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i21551 = data
  i21550.name = i21551[0]
  i21550.wrapMode = i21551[1]
  i21550.isLooping = !!i21551[2]
  i21550.length = i21551[3]
  var i21553 = i21551[4]
  var i21552 = []
  for(var i = 0; i < i21553.length; i += 1) {
    i21552.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i21553[i + 0]) );
  }
  i21550.curves = i21552
  var i21555 = i21551[5]
  var i21554 = []
  for(var i = 0; i < i21555.length; i += 1) {
    i21554.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i21555[i + 0]) );
  }
  i21550.events = i21554
  i21550.halfPrecision = !!i21551[6]
  i21550._frameRate = i21551[7]
  i21550.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i21551[8], i21550.localBounds)
  i21550.hasMuscleCurves = !!i21551[9]
  var i21557 = i21551[10]
  var i21556 = []
  for(var i = 0; i < i21557.length; i += 1) {
    i21556.push( i21557[i + 0] );
  }
  i21550.clipMuscleConstant = i21556
  i21550.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i21551[11], i21550.clipBindingConstant)
  return i21550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i21560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i21561 = data
  i21560.path = i21561[0]
  i21560.hash = i21561[1]
  i21560.componentType = i21561[2]
  i21560.property = i21561[3]
  i21560.keys = i21561[4]
  var i21563 = i21561[5]
  var i21562 = []
  for(var i = 0; i < i21563.length; i += 1) {
    i21562.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i21563[i + 0]) );
  }
  i21560.objectReferenceKeys = i21562
  return i21560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i21566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i21567 = data
  i21566.time = i21567[0]
  request.r(i21567[1], i21567[2], 0, i21566, 'value')
  return i21566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i21570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i21571 = data
  i21570.functionName = i21571[0]
  i21570.floatParameter = i21571[1]
  i21570.intParameter = i21571[2]
  i21570.stringParameter = i21571[3]
  request.r(i21571[4], i21571[5], 0, i21570, 'objectReferenceParameter')
  i21570.time = i21571[6]
  return i21570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i21572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i21573 = data
  i21572.center = new pc.Vec3( i21573[0], i21573[1], i21573[2] )
  i21572.extends = new pc.Vec3( i21573[3], i21573[4], i21573[5] )
  return i21572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i21576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i21577 = data
  var i21579 = i21577[0]
  var i21578 = []
  for(var i = 0; i < i21579.length; i += 1) {
    i21578.push( i21579[i + 0] );
  }
  i21576.genericBindings = i21578
  var i21581 = i21577[1]
  var i21580 = []
  for(var i = 0; i < i21581.length; i += 1) {
    i21580.push( i21581[i + 0] );
  }
  i21576.pptrCurveMapping = i21580
  return i21576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i21582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i21583 = data
  i21582.name = i21583[0]
  i21582.ascent = i21583[1]
  i21582.originalLineHeight = i21583[2]
  i21582.fontSize = i21583[3]
  var i21585 = i21583[4]
  var i21584 = []
  for(var i = 0; i < i21585.length; i += 1) {
    i21584.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i21585[i + 0]) );
  }
  i21582.characterInfo = i21584
  request.r(i21583[5], i21583[6], 0, i21582, 'texture')
  i21582.originalFontSize = i21583[7]
  return i21582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i21588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i21589 = data
  i21588.index = i21589[0]
  i21588.advance = i21589[1]
  i21588.bearing = i21589[2]
  i21588.glyphWidth = i21589[3]
  i21588.glyphHeight = i21589[4]
  i21588.minX = i21589[5]
  i21588.maxX = i21589[6]
  i21588.minY = i21589[7]
  i21588.maxY = i21589[8]
  i21588.uvBottomLeftX = i21589[9]
  i21588.uvBottomLeftY = i21589[10]
  i21588.uvBottomRightX = i21589[11]
  i21588.uvBottomRightY = i21589[12]
  i21588.uvTopLeftX = i21589[13]
  i21588.uvTopLeftY = i21589[14]
  i21588.uvTopRightX = i21589[15]
  i21588.uvTopRightY = i21589[16]
  return i21588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i21590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i21591 = data
  i21590.name = i21591[0]
  var i21593 = i21591[1]
  var i21592 = []
  for(var i = 0; i < i21593.length; i += 1) {
    i21592.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i21593[i + 0]) );
  }
  i21590.layers = i21592
  var i21595 = i21591[2]
  var i21594 = []
  for(var i = 0; i < i21595.length; i += 1) {
    i21594.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i21595[i + 0]) );
  }
  i21590.parameters = i21594
  i21590.animationClips = i21591[3]
  i21590.avatarUnsupported = i21591[4]
  return i21590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i21598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i21599 = data
  i21598.name = i21599[0]
  i21598.defaultWeight = i21599[1]
  i21598.blendingMode = i21599[2]
  i21598.avatarMask = i21599[3]
  i21598.syncedLayerIndex = i21599[4]
  i21598.syncedLayerAffectsTiming = !!i21599[5]
  i21598.syncedLayers = i21599[6]
  i21598.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i21599[7], i21598.stateMachine)
  return i21598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i21600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i21601 = data
  i21600.id = i21601[0]
  i21600.name = i21601[1]
  i21600.path = i21601[2]
  var i21603 = i21601[3]
  var i21602 = []
  for(var i = 0; i < i21603.length; i += 1) {
    i21602.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i21603[i + 0]) );
  }
  i21600.states = i21602
  var i21605 = i21601[4]
  var i21604 = []
  for(var i = 0; i < i21605.length; i += 1) {
    i21604.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i21605[i + 0]) );
  }
  i21600.machines = i21604
  var i21607 = i21601[5]
  var i21606 = []
  for(var i = 0; i < i21607.length; i += 1) {
    i21606.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i21607[i + 0]) );
  }
  i21600.entryStateTransitions = i21606
  var i21609 = i21601[6]
  var i21608 = []
  for(var i = 0; i < i21609.length; i += 1) {
    i21608.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i21609[i + 0]) );
  }
  i21600.exitStateTransitions = i21608
  var i21611 = i21601[7]
  var i21610 = []
  for(var i = 0; i < i21611.length; i += 1) {
    i21610.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i21611[i + 0]) );
  }
  i21600.anyStateTransitions = i21610
  i21600.defaultStateId = i21601[8]
  return i21600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i21614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i21615 = data
  i21614.id = i21615[0]
  i21614.name = i21615[1]
  i21614.cycleOffset = i21615[2]
  i21614.cycleOffsetParameter = i21615[3]
  i21614.cycleOffsetParameterActive = !!i21615[4]
  i21614.mirror = !!i21615[5]
  i21614.mirrorParameter = i21615[6]
  i21614.mirrorParameterActive = !!i21615[7]
  i21614.motionId = i21615[8]
  i21614.nameHash = i21615[9]
  i21614.fullPathHash = i21615[10]
  i21614.speed = i21615[11]
  i21614.speedParameter = i21615[12]
  i21614.speedParameterActive = !!i21615[13]
  i21614.tag = i21615[14]
  i21614.tagHash = i21615[15]
  i21614.writeDefaultValues = !!i21615[16]
  var i21617 = i21615[17]
  var i21616 = []
  for(var i = 0; i < i21617.length; i += 2) {
  request.r(i21617[i + 0], i21617[i + 1], 2, i21616, '')
  }
  i21614.behaviours = i21616
  var i21619 = i21615[18]
  var i21618 = []
  for(var i = 0; i < i21619.length; i += 1) {
    i21618.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i21619[i + 0]) );
  }
  i21614.transitions = i21618
  return i21614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i21624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i21625 = data
  i21624.fullPath = i21625[0]
  i21624.canTransitionToSelf = !!i21625[1]
  i21624.duration = i21625[2]
  i21624.exitTime = i21625[3]
  i21624.hasExitTime = !!i21625[4]
  i21624.hasFixedDuration = !!i21625[5]
  i21624.interruptionSource = i21625[6]
  i21624.offset = i21625[7]
  i21624.orderedInterruption = !!i21625[8]
  i21624.destinationStateId = i21625[9]
  i21624.isExit = !!i21625[10]
  i21624.mute = !!i21625[11]
  i21624.solo = !!i21625[12]
  var i21627 = i21625[13]
  var i21626 = []
  for(var i = 0; i < i21627.length; i += 1) {
    i21626.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i21627[i + 0]) );
  }
  i21624.conditions = i21626
  return i21624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i21630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i21631 = data
  i21630.mode = i21631[0]
  i21630.parameter = i21631[1]
  i21630.threshold = i21631[2]
  return i21630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i21636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i21637 = data
  i21636.destinationStateId = i21637[0]
  i21636.isExit = !!i21637[1]
  i21636.mute = !!i21637[2]
  i21636.solo = !!i21637[3]
  var i21639 = i21637[4]
  var i21638 = []
  for(var i = 0; i < i21639.length; i += 1) {
    i21638.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i21639[i + 0]) );
  }
  i21636.conditions = i21638
  return i21636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i21642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i21643 = data
  i21642.defaultBool = !!i21643[0]
  i21642.defaultFloat = i21643[1]
  i21642.defaultInt = i21643[2]
  i21642.name = i21643[3]
  i21642.nameHash = i21643[4]
  i21642.type = i21643[5]
  return i21642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController"] = function (request, data, root) {
  var i21644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController' )
  var i21645 = data
  i21644.name = i21645[0]
  request.r(i21645[1], i21645[2], 0, i21644, '_runtimeAnimatorController')
  var i21647 = i21645[3]
  var i21646 = []
  for(var i = 0; i < i21647.length; i += 2) {
  request.r(i21647[i + 0], i21647[i + 1], 2, i21646, '')
  }
  i21644._originalAnimationClips = i21646
  var i21649 = i21645[4]
  var i21648 = []
  for(var i = 0; i < i21649.length; i += 2) {
  request.r(i21649[i + 0], i21649[i + 1], 2, i21648, '')
  }
  i21644._overrideAnimationClips = i21648
  var i21651 = i21645[5]
  var i21650 = []
  for(var i = 0; i < i21651.length; i += 2) {
  request.r(i21651[i + 0], i21651[i + 1], 2, i21650, '')
  }
  i21644._animationClips = i21650
  var i21653 = i21645[6]
  var i21652 = []
  for(var i = 0; i < i21653.length; i += 1) {
    i21652.push( request.d('UnityEngine.AnimationClipPair', i21653[i + 0]) );
  }
  i21644._animationClipPairs = i21652
  return i21644
}

Deserializers["UnityEngine.AnimationClipPair"] = function (request, data, root) {
  var i21658 = root || request.c( 'UnityEngine.AnimationClipPair' )
  var i21659 = data
  request.r(i21659[0], i21659[1], 0, i21658, 'originalClip')
  request.r(i21659[2], i21659[3], 0, i21658, 'overrideClip')
  return i21658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i21660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i21661 = data
  i21660.name = i21661[0]
  i21660.bytes64 = i21661[1]
  i21660.data = i21661[2]
  return i21660
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i21662 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i21663 = data
  i21662.normalStyle = i21663[0]
  i21662.normalSpacingOffset = i21663[1]
  i21662.boldStyle = i21663[2]
  i21662.boldSpacing = i21663[3]
  i21662.italicStyle = i21663[4]
  i21662.tabSize = i21663[5]
  request.r(i21663[6], i21663[7], 0, i21662, 'atlas')
  i21662.m_SourceFontFileGUID = i21663[8]
  i21662.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i21663[9], i21662.m_CreationSettings)
  request.r(i21663[10], i21663[11], 0, i21662, 'm_SourceFontFile')
  i21662.m_SourceFontFilePath = i21663[12]
  i21662.m_AtlasPopulationMode = i21663[13]
  i21662.InternalDynamicOS = !!i21663[14]
  var i21665 = i21663[15]
  var i21664 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i21665.length; i += 1) {
    i21664.add(request.d('UnityEngine.TextCore.Glyph', i21665[i + 0]));
  }
  i21662.m_GlyphTable = i21664
  var i21667 = i21663[16]
  var i21666 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i21667.length; i += 1) {
    i21666.add(request.d('TMPro.TMP_Character', i21667[i + 0]));
  }
  i21662.m_CharacterTable = i21666
  var i21669 = i21663[17]
  var i21668 = []
  for(var i = 0; i < i21669.length; i += 2) {
  request.r(i21669[i + 0], i21669[i + 1], 2, i21668, '')
  }
  i21662.m_AtlasTextures = i21668
  i21662.m_AtlasTextureIndex = i21663[18]
  i21662.m_IsMultiAtlasTexturesEnabled = !!i21663[19]
  i21662.m_GetFontFeatures = !!i21663[20]
  i21662.m_ClearDynamicDataOnBuild = !!i21663[21]
  i21662.m_AtlasWidth = i21663[22]
  i21662.m_AtlasHeight = i21663[23]
  i21662.m_AtlasPadding = i21663[24]
  i21662.m_AtlasRenderMode = i21663[25]
  var i21671 = i21663[26]
  var i21670 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i21671.length; i += 1) {
    i21670.add(request.d('UnityEngine.TextCore.GlyphRect', i21671[i + 0]));
  }
  i21662.m_UsedGlyphRects = i21670
  var i21673 = i21663[27]
  var i21672 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i21673.length; i += 1) {
    i21672.add(request.d('UnityEngine.TextCore.GlyphRect', i21673[i + 0]));
  }
  i21662.m_FreeGlyphRects = i21672
  i21662.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i21663[28], i21662.m_FontFeatureTable)
  i21662.m_ShouldReimportFontFeatures = !!i21663[29]
  var i21675 = i21663[30]
  var i21674 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i21675.length; i += 2) {
  request.r(i21675[i + 0], i21675[i + 1], 1, i21674, '')
  }
  i21662.m_FallbackFontAssetTable = i21674
  var i21677 = i21663[31]
  var i21676 = []
  for(var i = 0; i < i21677.length; i += 1) {
    i21676.push( request.d('TMPro.TMP_FontWeightPair', i21677[i + 0]) );
  }
  i21662.m_FontWeightTable = i21676
  var i21679 = i21663[32]
  var i21678 = []
  for(var i = 0; i < i21679.length; i += 1) {
    i21678.push( request.d('TMPro.TMP_FontWeightPair', i21679[i + 0]) );
  }
  i21662.fontWeights = i21678
  i21662.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i21663[33], i21662.m_fontInfo)
  var i21681 = i21663[34]
  var i21680 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i21681.length; i += 1) {
    i21680.add(request.d('TMPro.TMP_Glyph', i21681[i + 0]));
  }
  i21662.m_glyphInfoList = i21680
  i21662.m_KerningTable = request.d('TMPro.KerningTable', i21663[35], i21662.m_KerningTable)
  var i21683 = i21663[36]
  var i21682 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i21683.length; i += 2) {
  request.r(i21683[i + 0], i21683[i + 1], 1, i21682, '')
  }
  i21662.fallbackFontAssets = i21682
  i21662.m_Version = i21663[37]
  i21662.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i21663[38], i21662.m_FaceInfo)
  request.r(i21663[39], i21663[40], 0, i21662, 'm_Material')
  return i21662
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i21684 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i21685 = data
  i21684.sourceFontFileName = i21685[0]
  i21684.sourceFontFileGUID = i21685[1]
  i21684.faceIndex = i21685[2]
  i21684.pointSizeSamplingMode = i21685[3]
  i21684.pointSize = i21685[4]
  i21684.padding = i21685[5]
  i21684.paddingMode = i21685[6]
  i21684.packingMode = i21685[7]
  i21684.atlasWidth = i21685[8]
  i21684.atlasHeight = i21685[9]
  i21684.characterSetSelectionMode = i21685[10]
  i21684.characterSequence = i21685[11]
  i21684.referencedFontAssetGUID = i21685[12]
  i21684.referencedTextAssetGUID = i21685[13]
  i21684.fontStyle = i21685[14]
  i21684.fontStyleModifier = i21685[15]
  i21684.renderMode = i21685[16]
  i21684.includeFontFeatures = !!i21685[17]
  return i21684
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i21688 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i21689 = data
  i21688.m_Index = i21689[0]
  i21688.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i21689[1], i21688.m_Metrics)
  i21688.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i21689[2], i21688.m_GlyphRect)
  i21688.m_Scale = i21689[3]
  i21688.m_AtlasIndex = i21689[4]
  i21688.m_ClassDefinitionType = i21689[5]
  return i21688
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i21690 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i21691 = data
  i21690.m_Width = i21691[0]
  i21690.m_Height = i21691[1]
  i21690.m_HorizontalBearingX = i21691[2]
  i21690.m_HorizontalBearingY = i21691[3]
  i21690.m_HorizontalAdvance = i21691[4]
  return i21690
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i21692 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i21693 = data
  i21692.m_X = i21693[0]
  i21692.m_Y = i21693[1]
  i21692.m_Width = i21693[2]
  i21692.m_Height = i21693[3]
  return i21692
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i21696 = root || request.c( 'TMPro.TMP_Character' )
  var i21697 = data
  i21696.m_ElementType = i21697[0]
  i21696.m_Unicode = i21697[1]
  i21696.m_GlyphIndex = i21697[2]
  i21696.m_Scale = i21697[3]
  return i21696
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i21702 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i21703 = data
  var i21705 = i21703[0]
  var i21704 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i21705.length; i += 1) {
    i21704.add(request.d('TMPro.MultipleSubstitutionRecord', i21705[i + 0]));
  }
  i21702.m_MultipleSubstitutionRecords = i21704
  var i21707 = i21703[1]
  var i21706 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i21707.length; i += 1) {
    i21706.add(request.d('TMPro.LigatureSubstitutionRecord', i21707[i + 0]));
  }
  i21702.m_LigatureSubstitutionRecords = i21706
  var i21709 = i21703[2]
  var i21708 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i21709.length; i += 1) {
    i21708.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i21709[i + 0]));
  }
  i21702.m_GlyphPairAdjustmentRecords = i21708
  var i21711 = i21703[3]
  var i21710 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i21711.length; i += 1) {
    i21710.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i21711[i + 0]));
  }
  i21702.m_MarkToBaseAdjustmentRecords = i21710
  var i21713 = i21703[4]
  var i21712 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i21713.length; i += 1) {
    i21712.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i21713[i + 0]));
  }
  i21702.m_MarkToMarkAdjustmentRecords = i21712
  return i21702
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i21716 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i21717 = data
  i21716.m_TargetGlyphID = i21717[0]
  i21716.m_SubstituteGlyphIDs = i21717[1]
  return i21716
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i21720 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i21721 = data
  i21720.m_ComponentGlyphIDs = i21721[0]
  i21720.m_LigatureGlyphID = i21721[1]
  return i21720
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i21724 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i21725 = data
  i21724.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i21725[0], i21724.m_FirstAdjustmentRecord)
  i21724.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i21725[1], i21724.m_SecondAdjustmentRecord)
  i21724.m_FeatureLookupFlags = i21725[2]
  return i21724
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i21726 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i21727 = data
  i21726.m_GlyphIndex = i21727[0]
  i21726.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i21727[1], i21726.m_GlyphValueRecord)
  return i21726
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i21728 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i21729 = data
  i21728.m_XPlacement = i21729[0]
  i21728.m_YPlacement = i21729[1]
  i21728.m_XAdvance = i21729[2]
  i21728.m_YAdvance = i21729[3]
  return i21728
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i21732 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i21733 = data
  i21732.m_BaseGlyphID = i21733[0]
  i21732.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i21733[1], i21732.m_BaseGlyphAnchorPoint)
  i21732.m_MarkGlyphID = i21733[2]
  i21732.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i21733[3], i21732.m_MarkPositionAdjustment)
  return i21732
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i21734 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i21735 = data
  i21734.m_XCoordinate = i21735[0]
  i21734.m_YCoordinate = i21735[1]
  return i21734
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i21736 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i21737 = data
  i21736.m_XPositionAdjustment = i21737[0]
  i21736.m_YPositionAdjustment = i21737[1]
  return i21736
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i21740 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i21741 = data
  i21740.m_BaseMarkGlyphID = i21741[0]
  i21740.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i21741[1], i21740.m_BaseMarkGlyphAnchorPoint)
  i21740.m_CombiningMarkGlyphID = i21741[2]
  i21740.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i21741[3], i21740.m_CombiningMarkPositionAdjustment)
  return i21740
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i21746 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i21747 = data
  request.r(i21747[0], i21747[1], 0, i21746, 'regularTypeface')
  request.r(i21747[2], i21747[3], 0, i21746, 'italicTypeface')
  return i21746
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i21748 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i21749 = data
  i21748.Name = i21749[0]
  i21748.PointSize = i21749[1]
  i21748.Scale = i21749[2]
  i21748.CharacterCount = i21749[3]
  i21748.LineHeight = i21749[4]
  i21748.Baseline = i21749[5]
  i21748.Ascender = i21749[6]
  i21748.CapHeight = i21749[7]
  i21748.Descender = i21749[8]
  i21748.CenterLine = i21749[9]
  i21748.SuperscriptOffset = i21749[10]
  i21748.SubscriptOffset = i21749[11]
  i21748.SubSize = i21749[12]
  i21748.Underline = i21749[13]
  i21748.UnderlineThickness = i21749[14]
  i21748.strikethrough = i21749[15]
  i21748.strikethroughThickness = i21749[16]
  i21748.TabWidth = i21749[17]
  i21748.Padding = i21749[18]
  i21748.AtlasWidth = i21749[19]
  i21748.AtlasHeight = i21749[20]
  return i21748
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i21752 = root || request.c( 'TMPro.TMP_Glyph' )
  var i21753 = data
  i21752.id = i21753[0]
  i21752.x = i21753[1]
  i21752.y = i21753[2]
  i21752.width = i21753[3]
  i21752.height = i21753[4]
  i21752.xOffset = i21753[5]
  i21752.yOffset = i21753[6]
  i21752.xAdvance = i21753[7]
  i21752.scale = i21753[8]
  return i21752
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i21754 = root || request.c( 'TMPro.KerningTable' )
  var i21755 = data
  var i21757 = i21755[0]
  var i21756 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i21757.length; i += 1) {
    i21756.add(request.d('TMPro.KerningPair', i21757[i + 0]));
  }
  i21754.kerningPairs = i21756
  return i21754
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i21760 = root || request.c( 'TMPro.KerningPair' )
  var i21761 = data
  i21760.xOffset = i21761[0]
  i21760.m_FirstGlyph = i21761[1]
  i21760.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i21761[2], i21760.m_FirstGlyphAdjustments)
  i21760.m_SecondGlyph = i21761[3]
  i21760.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i21761[4], i21760.m_SecondGlyphAdjustments)
  i21760.m_IgnoreSpacingAdjustments = !!i21761[5]
  return i21760
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i21762 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i21763 = data
  i21762.m_FaceIndex = i21763[0]
  i21762.m_FamilyName = i21763[1]
  i21762.m_StyleName = i21763[2]
  i21762.m_PointSize = i21763[3]
  i21762.m_Scale = i21763[4]
  i21762.m_UnitsPerEM = i21763[5]
  i21762.m_LineHeight = i21763[6]
  i21762.m_AscentLine = i21763[7]
  i21762.m_CapLine = i21763[8]
  i21762.m_MeanLine = i21763[9]
  i21762.m_Baseline = i21763[10]
  i21762.m_DescentLine = i21763[11]
  i21762.m_SuperscriptOffset = i21763[12]
  i21762.m_SuperscriptSize = i21763[13]
  i21762.m_SubscriptOffset = i21763[14]
  i21762.m_SubscriptSize = i21763[15]
  i21762.m_UnderlineOffset = i21763[16]
  i21762.m_UnderlineThickness = i21763[17]
  i21762.m_StrikethroughOffset = i21763[18]
  i21762.m_StrikethroughThickness = i21763[19]
  i21762.m_TabWidth = i21763[20]
  return i21762
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i21764 = root || request.c( 'TMPro.TMP_Settings' )
  var i21765 = data
  i21764.assetVersion = i21765[0]
  i21764.m_TextWrappingMode = i21765[1]
  i21764.m_enableKerning = !!i21765[2]
  var i21767 = i21765[3]
  var i21766 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i21767.length; i += 1) {
    i21766.add(i21767[i + 0]);
  }
  i21764.m_ActiveFontFeatures = i21766
  i21764.m_enableExtraPadding = !!i21765[4]
  i21764.m_enableTintAllSprites = !!i21765[5]
  i21764.m_enableParseEscapeCharacters = !!i21765[6]
  i21764.m_EnableRaycastTarget = !!i21765[7]
  i21764.m_GetFontFeaturesAtRuntime = !!i21765[8]
  i21764.m_missingGlyphCharacter = i21765[9]
  i21764.m_ClearDynamicDataOnBuild = !!i21765[10]
  i21764.m_warningsDisabled = !!i21765[11]
  request.r(i21765[12], i21765[13], 0, i21764, 'm_defaultFontAsset')
  i21764.m_defaultFontAssetPath = i21765[14]
  i21764.m_defaultFontSize = i21765[15]
  i21764.m_defaultAutoSizeMinRatio = i21765[16]
  i21764.m_defaultAutoSizeMaxRatio = i21765[17]
  i21764.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i21765[18], i21765[19] )
  i21764.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i21765[20], i21765[21] )
  i21764.m_autoSizeTextContainer = !!i21765[22]
  i21764.m_IsTextObjectScaleStatic = !!i21765[23]
  var i21769 = i21765[24]
  var i21768 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i21769.length; i += 2) {
  request.r(i21769[i + 0], i21769[i + 1], 1, i21768, '')
  }
  i21764.m_fallbackFontAssets = i21768
  i21764.m_matchMaterialPreset = !!i21765[25]
  i21764.m_HideSubTextObjects = !!i21765[26]
  request.r(i21765[27], i21765[28], 0, i21764, 'm_defaultSpriteAsset')
  i21764.m_defaultSpriteAssetPath = i21765[29]
  i21764.m_enableEmojiSupport = !!i21765[30]
  i21764.m_MissingCharacterSpriteUnicode = i21765[31]
  var i21771 = i21765[32]
  var i21770 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i21771.length; i += 2) {
  request.r(i21771[i + 0], i21771[i + 1], 1, i21770, '')
  }
  i21764.m_EmojiFallbackTextAssets = i21770
  i21764.m_defaultColorGradientPresetsPath = i21765[33]
  request.r(i21765[34], i21765[35], 0, i21764, 'm_defaultStyleSheet')
  i21764.m_StyleSheetsResourcePath = i21765[36]
  request.r(i21765[37], i21765[38], 0, i21764, 'm_leadingCharacters')
  request.r(i21765[39], i21765[40], 0, i21764, 'm_followingCharacters')
  i21764.m_UseModernHangulLineBreakingRules = !!i21765[41]
  return i21764
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i21774 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i21775 = data
  request.r(i21775[0], i21775[1], 0, i21774, 'spriteSheet')
  var i21777 = i21775[2]
  var i21776 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i21777.length; i += 1) {
    i21776.add(request.d('TMPro.TMP_Sprite', i21777[i + 0]));
  }
  i21774.spriteInfoList = i21776
  var i21779 = i21775[3]
  var i21778 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i21779.length; i += 2) {
  request.r(i21779[i + 0], i21779[i + 1], 1, i21778, '')
  }
  i21774.fallbackSpriteAssets = i21778
  var i21781 = i21775[4]
  var i21780 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i21781.length; i += 1) {
    i21780.add(request.d('TMPro.TMP_SpriteCharacter', i21781[i + 0]));
  }
  i21774.m_SpriteCharacterTable = i21780
  var i21783 = i21775[5]
  var i21782 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i21783.length; i += 1) {
    i21782.add(request.d('TMPro.TMP_SpriteGlyph', i21783[i + 0]));
  }
  i21774.m_GlyphTable = i21782
  i21774.m_Version = i21775[6]
  i21774.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i21775[7], i21774.m_FaceInfo)
  request.r(i21775[8], i21775[9], 0, i21774, 'm_Material')
  return i21774
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i21786 = root || request.c( 'TMPro.TMP_Sprite' )
  var i21787 = data
  i21786.name = i21787[0]
  i21786.hashCode = i21787[1]
  i21786.unicode = i21787[2]
  i21786.pivot = new pc.Vec2( i21787[3], i21787[4] )
  request.r(i21787[5], i21787[6], 0, i21786, 'sprite')
  i21786.id = i21787[7]
  i21786.x = i21787[8]
  i21786.y = i21787[9]
  i21786.width = i21787[10]
  i21786.height = i21787[11]
  i21786.xOffset = i21787[12]
  i21786.yOffset = i21787[13]
  i21786.xAdvance = i21787[14]
  i21786.scale = i21787[15]
  return i21786
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i21792 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i21793 = data
  i21792.m_Name = i21793[0]
  i21792.m_ElementType = i21793[1]
  i21792.m_Unicode = i21793[2]
  i21792.m_GlyphIndex = i21793[3]
  i21792.m_Scale = i21793[4]
  return i21792
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i21796 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i21797 = data
  request.r(i21797[0], i21797[1], 0, i21796, 'sprite')
  i21796.m_Index = i21797[2]
  i21796.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i21797[3], i21796.m_Metrics)
  i21796.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i21797[4], i21796.m_GlyphRect)
  i21796.m_Scale = i21797[5]
  i21796.m_AtlasIndex = i21797[6]
  i21796.m_ClassDefinitionType = i21797[7]
  return i21796
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i21798 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i21799 = data
  var i21801 = i21799[0]
  var i21800 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i21801.length; i += 1) {
    i21800.add(request.d('TMPro.TMP_Style', i21801[i + 0]));
  }
  i21798.m_StyleList = i21800
  return i21798
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i21804 = root || request.c( 'TMPro.TMP_Style' )
  var i21805 = data
  i21804.m_Name = i21805[0]
  i21804.m_HashCode = i21805[1]
  i21804.m_OpeningDefinition = i21805[2]
  i21804.m_ClosingDefinition = i21805[3]
  i21804.m_OpeningTagArray = i21805[4]
  i21804.m_ClosingTagArray = i21805[5]
  return i21804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i21806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i21807 = data
  var i21809 = i21807[0]
  var i21808 = []
  for(var i = 0; i < i21809.length; i += 1) {
    i21808.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i21809[i + 0]) );
  }
  i21806.files = i21808
  i21806.componentToPrefabIds = i21807[1]
  return i21806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i21812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i21813 = data
  i21812.path = i21813[0]
  request.r(i21813[1], i21813[2], 0, i21812, 'unityObject')
  return i21812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i21814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i21815 = data
  var i21817 = i21815[0]
  var i21816 = []
  for(var i = 0; i < i21817.length; i += 1) {
    i21816.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i21817[i + 0]) );
  }
  i21814.scriptsExecutionOrder = i21816
  var i21819 = i21815[1]
  var i21818 = []
  for(var i = 0; i < i21819.length; i += 1) {
    i21818.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i21819[i + 0]) );
  }
  i21814.sortingLayers = i21818
  var i21821 = i21815[2]
  var i21820 = []
  for(var i = 0; i < i21821.length; i += 1) {
    i21820.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i21821[i + 0]) );
  }
  i21814.cullingLayers = i21820
  i21814.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i21815[3], i21814.timeSettings)
  i21814.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i21815[4], i21814.physicsSettings)
  i21814.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i21815[5], i21814.physics2DSettings)
  i21814.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i21815[6], i21814.qualitySettings)
  i21814.enableRealtimeShadows = !!i21815[7]
  i21814.enableAutoInstancing = !!i21815[8]
  i21814.enableStaticBatching = !!i21815[9]
  i21814.enableDynamicBatching = !!i21815[10]
  i21814.usePreservativeDynamicBatching = !!i21815[11]
  i21814.lightmapEncodingQuality = i21815[12]
  i21814.desiredColorSpace = i21815[13]
  var i21823 = i21815[14]
  var i21822 = []
  for(var i = 0; i < i21823.length; i += 1) {
    i21822.push( i21823[i + 0] );
  }
  i21814.allTags = i21822
  return i21814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i21826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i21827 = data
  i21826.name = i21827[0]
  i21826.value = i21827[1]
  return i21826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i21830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i21831 = data
  i21830.id = i21831[0]
  i21830.name = i21831[1]
  i21830.value = i21831[2]
  return i21830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i21834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i21835 = data
  i21834.id = i21835[0]
  i21834.name = i21835[1]
  return i21834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i21836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i21837 = data
  i21836.fixedDeltaTime = i21837[0]
  i21836.maximumDeltaTime = i21837[1]
  i21836.timeScale = i21837[2]
  i21836.maximumParticleTimestep = i21837[3]
  return i21836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i21838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i21839 = data
  i21838.gravity = new pc.Vec3( i21839[0], i21839[1], i21839[2] )
  i21838.defaultSolverIterations = i21839[3]
  i21838.bounceThreshold = i21839[4]
  i21838.autoSyncTransforms = !!i21839[5]
  i21838.autoSimulation = !!i21839[6]
  var i21841 = i21839[7]
  var i21840 = []
  for(var i = 0; i < i21841.length; i += 1) {
    i21840.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i21841[i + 0]) );
  }
  i21838.collisionMatrix = i21840
  return i21838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i21844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i21845 = data
  i21844.enabled = !!i21845[0]
  i21844.layerId = i21845[1]
  i21844.otherLayerId = i21845[2]
  return i21844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i21846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i21847 = data
  request.r(i21847[0], i21847[1], 0, i21846, 'material')
  i21846.gravity = new pc.Vec2( i21847[2], i21847[3] )
  i21846.positionIterations = i21847[4]
  i21846.velocityIterations = i21847[5]
  i21846.velocityThreshold = i21847[6]
  i21846.maxLinearCorrection = i21847[7]
  i21846.maxAngularCorrection = i21847[8]
  i21846.maxTranslationSpeed = i21847[9]
  i21846.maxRotationSpeed = i21847[10]
  i21846.baumgarteScale = i21847[11]
  i21846.baumgarteTOIScale = i21847[12]
  i21846.timeToSleep = i21847[13]
  i21846.linearSleepTolerance = i21847[14]
  i21846.angularSleepTolerance = i21847[15]
  i21846.defaultContactOffset = i21847[16]
  i21846.autoSimulation = !!i21847[17]
  i21846.queriesHitTriggers = !!i21847[18]
  i21846.queriesStartInColliders = !!i21847[19]
  i21846.callbacksOnDisable = !!i21847[20]
  i21846.reuseCollisionCallbacks = !!i21847[21]
  i21846.autoSyncTransforms = !!i21847[22]
  var i21849 = i21847[23]
  var i21848 = []
  for(var i = 0; i < i21849.length; i += 1) {
    i21848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i21849[i + 0]) );
  }
  i21846.collisionMatrix = i21848
  return i21846
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i21852 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i21853 = data
  i21852.enabled = !!i21853[0]
  i21852.layerId = i21853[1]
  i21852.otherLayerId = i21853[2]
  return i21852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i21854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i21855 = data
  var i21857 = i21855[0]
  var i21856 = []
  for(var i = 0; i < i21857.length; i += 1) {
    i21856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i21857[i + 0]) );
  }
  i21854.qualityLevels = i21856
  var i21859 = i21855[1]
  var i21858 = []
  for(var i = 0; i < i21859.length; i += 1) {
    i21858.push( i21859[i + 0] );
  }
  i21854.names = i21858
  i21854.shadows = i21855[2]
  i21854.anisotropicFiltering = i21855[3]
  i21854.antiAliasing = i21855[4]
  i21854.lodBias = i21855[5]
  i21854.shadowCascades = i21855[6]
  i21854.shadowDistance = i21855[7]
  i21854.shadowmaskMode = i21855[8]
  i21854.shadowProjection = i21855[9]
  i21854.shadowResolution = i21855[10]
  i21854.softParticles = !!i21855[11]
  i21854.softVegetation = !!i21855[12]
  i21854.activeColorSpace = i21855[13]
  i21854.desiredColorSpace = i21855[14]
  i21854.masterTextureLimit = i21855[15]
  i21854.maxQueuedFrames = i21855[16]
  i21854.particleRaycastBudget = i21855[17]
  i21854.pixelLightCount = i21855[18]
  i21854.realtimeReflectionProbes = !!i21855[19]
  i21854.shadowCascade2Split = i21855[20]
  i21854.shadowCascade4Split = new pc.Vec3( i21855[21], i21855[22], i21855[23] )
  i21854.streamingMipmapsActive = !!i21855[24]
  i21854.vSyncCount = i21855[25]
  i21854.asyncUploadBufferSize = i21855[26]
  i21854.asyncUploadTimeSlice = i21855[27]
  i21854.billboardsFaceCameraPosition = !!i21855[28]
  i21854.shadowNearPlaneOffset = i21855[29]
  i21854.streamingMipmapsMemoryBudget = i21855[30]
  i21854.maximumLODLevel = i21855[31]
  i21854.streamingMipmapsAddAllCameras = !!i21855[32]
  i21854.streamingMipmapsMaxLevelReduction = i21855[33]
  i21854.streamingMipmapsRenderersPerFrame = i21855[34]
  i21854.resolutionScalingFixedDPIFactor = i21855[35]
  i21854.streamingMipmapsMaxFileIORequests = i21855[36]
  i21854.currentQualityLevel = i21855[37]
  return i21854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i21862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i21863 = data
  i21862.name = i21863[0]
  var i21865 = i21863[1]
  var i21864 = []
  for(var i = 0; i < i21865.length; i += 1) {
    i21864.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i21865[i + 0]) );
  }
  i21862.tos = i21864
  var i21867 = i21863[2]
  var i21866 = []
  for(var i = 0; i < i21867.length; i += 1) {
    i21866.push( i21867[i + 0] );
  }
  i21862.constant = i21866
  i21862.isValid = !!i21863[3]
  i21862.isHuman = !!i21863[4]
  i21862.hasRootMotion = !!i21863[5]
  return i21862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i21870 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i21871 = data
  i21870.hash = i21871[0]
  i21870.path = i21871[1]
  return i21870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i21874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i21875 = data
  i21874.weight = i21875[0]
  i21874.vertices = i21875[1]
  i21874.normals = i21875[2]
  i21874.tangents = i21875[3]
  return i21874
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i21876 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i21877 = data
  request.r(i21877[0], i21877[1], 0, i21876, 'm_ObjectArgument')
  i21876.m_ObjectArgumentAssemblyTypeName = i21877[2]
  i21876.m_IntArgument = i21877[3]
  i21876.m_FloatArgument = i21877[4]
  i21876.m_StringArgument = i21877[5]
  i21876.m_BoolArgument = !!i21877[6]
  return i21876
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i21878 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i21879 = data
  i21878.xPlacement = i21879[0]
  i21878.yPlacement = i21879[1]
  i21878.xAdvance = i21879[2]
  i21878.yAdvance = i21879[3]
  return i21878
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Rigidbody":{"mass":0,"drag":1,"angularDrag":2,"useGravity":3,"isKinematic":4,"constraints":5,"maxAngularVelocity":6,"collisionDetectionMode":7,"interpolation":8},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TrailRenderer":{"positions":0,"positionCount":1,"time":2,"startWidth":3,"endWidth":4,"widthMultiplier":5,"autodestruct":6,"emitting":7,"numCornerVertices":8,"numCapVertices":9,"minVertexDistance":10,"colorGradient":11,"startColor":12,"endColor":16,"generateLightingData":20,"textureMode":21,"alignment":22,"widthCurve":23,"enabled":24,"sharedMaterial":25,"sharedMaterials":27,"receiveShadows":28,"shadowCastingMode":29,"sortingLayerID":30,"sortingOrder":31,"lightmapIndex":32,"lightmapSceneIndex":33,"lightmapScaleOffset":34,"lightProbeUsage":38,"reflectionProbeUsage":39},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.LineRenderer":{"textureMode":0,"alignment":1,"widthCurve":2,"colorGradient":3,"positions":4,"positionCount":5,"widthMultiplier":6,"startWidth":7,"endWidth":8,"numCornerVertices":9,"numCapVertices":10,"useWorldSpace":11,"loop":12,"startColor":13,"endColor":17,"generateLightingData":21,"enabled":22,"sharedMaterial":23,"sharedMaterials":25,"receiveShadows":26,"shadowCastingMode":27,"sortingLayerID":28,"sortingOrder":29,"lightmapIndex":30,"lightmapSceneIndex":31,"lightmapScaleOffset":32,"lightProbeUsage":36,"reflectionProbeUsage":37},"Luna.Unity.DTO.UnityEngine.Components.CharacterController":{"enabled":0,"center":1,"radius":4,"height":5,"minMoveDistance":6,"skinWidth":7,"enableOverlapRecovery":8},"Luna.Unity.DTO.UnityEngine.Components.CharacterJoint":{"swingAxis":0,"twistLimitSpring":3,"swingLimitSpring":4,"lowTwistLimit":5,"highTwistLimit":6,"swing1Limit":7,"swing2Limit":8,"connectedBody":9,"axis":11,"anchor":14,"connectedAnchor":17,"autoConfigureConnectedAnchor":20,"massScale":21,"connectedMassScale":22,"enableCollision":23,"breakForce":24,"breakTorque":25},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController":{"name":0,"_runtimeAnimatorController":1,"_originalAnimationClips":3,"_overrideAnimationClips":4,"_animationClips":5,"_animationClipPairs":6},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"74":[75],"76":[75],"77":[75],"78":[75],"79":[75],"80":[75],"81":[7],"82":[46],"59":[3],"83":[3],"84":[3],"85":[3],"86":[3],"87":[3],"88":[89],"90":[89],"91":[89],"92":[89],"93":[89],"94":[89],"95":[89],"96":[89],"97":[89],"98":[89],"99":[89],"100":[89],"101":[89],"102":[46],"103":[11],"104":[105],"106":[105],"21":[10],"40":[37],"107":[10],"108":[24,10],"109":[11],"110":[24,10],"111":[10],"112":[10],"13":[11,10],"25":[10,24],"113":[114],"115":[114],"116":[114],"117":[10],"118":[10],"23":[21],"26":[24,10],"119":[10],"22":[21],"31":[10],"29":[10],"67":[10],"120":[10],"121":[10],"122":[10],"30":[10],"34":[10],"123":[10],"124":[24,10],"125":[10],"32":[10],"33":[10],"126":[10],"127":[24,10],"128":[10],"129":[61],"130":[61],"62":[61],"131":[61],"132":[46],"133":[46]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Rigidbody","UnityEngine.CapsuleCollider","UnityEngine.Animator","UnityEngine.AnimatorOverrideController","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Material","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.TrailRenderer","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.MeshFilter","UnityEngine.BoxCollider","UnityEngine.SphereCollider","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","TMPro.TextMeshProUGUI","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Mask","UnityEngine.CanvasGroup","UnityEngine.Light","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.MonoBehaviour","PlayableSpatialAudio","UnityEngine.AI.NavMeshObstacle","UnityEditor.Animations.AnimatorController","UnityEngine.Avatar","StealEggGame","UnityEngine.GameObject","UnityEngine.Camera","PlayableRagdoll","UnityEngine.Font","UnityEngine.LineRenderer","TapHintView","IconAmountView","PetRowView","IncubateRowView","QuickSlotView","BagCellView","IndexZoneView","PlayableJoystick","UnityEngine.CharacterController","UnityEngine.CharacterJoint","UnityEngine.AudioListener","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","PlayableCameraDrag","UnityEngine.UI.Outline","LunaController","PlayableHoldButton","UnityEngine.UI.HorizontalLayoutGroup","IndexPetCellView","UnityEngine.AnimationClip","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "TE_V06";

Deserializers.lunaInitializationTime = "10/27/2026 10:33:07";

Deserializers.lunaDaysRunning = "6.9";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "0";

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

Deserializers.runtimeAnalysisExcludedMethodsCount = "4289";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, reflection";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.UnityTechnologies.com.unity.template.urpblank";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "7b4ca156-13fb-4988-9cc6-ccae6db12c2f";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

