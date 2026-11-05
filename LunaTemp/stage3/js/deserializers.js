var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i5978 = root || request.c( 'UnityEngine.JointSpring' )
  var i5979 = data
  i5978.spring = i5979[0]
  i5978.damper = i5979[1]
  i5978.targetPosition = i5979[2]
  return i5978
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i5980 = root || request.c( 'UnityEngine.JointMotor' )
  var i5981 = data
  i5980.m_TargetVelocity = i5981[0]
  i5980.m_Force = i5981[1]
  i5980.m_FreeSpin = i5981[2]
  return i5980
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i5982 = root || request.c( 'UnityEngine.JointLimits' )
  var i5983 = data
  i5982.m_Min = i5983[0]
  i5982.m_Max = i5983[1]
  i5982.m_Bounciness = i5983[2]
  i5982.m_BounceMinVelocity = i5983[3]
  i5982.m_ContactDistance = i5983[4]
  i5982.minBounce = i5983[5]
  i5982.maxBounce = i5983[6]
  return i5982
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i5984 = root || request.c( 'UnityEngine.JointDrive' )
  var i5985 = data
  i5984.m_PositionSpring = i5985[0]
  i5984.m_PositionDamper = i5985[1]
  i5984.m_MaximumForce = i5985[2]
  i5984.m_UseAcceleration = i5985[3]
  return i5984
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i5986 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i5987 = data
  i5986.m_Spring = i5987[0]
  i5986.m_Damper = i5987[1]
  return i5986
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i5988 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i5989 = data
  i5988.m_Limit = i5989[0]
  i5988.m_Bounciness = i5989[1]
  i5988.m_ContactDistance = i5989[2]
  return i5988
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i5990 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i5991 = data
  i5990.m_ExtremumSlip = i5991[0]
  i5990.m_ExtremumValue = i5991[1]
  i5990.m_AsymptoteSlip = i5991[2]
  i5990.m_AsymptoteValue = i5991[3]
  i5990.m_Stiffness = i5991[4]
  return i5990
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i5992 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i5993 = data
  i5992.m_LowerAngle = i5993[0]
  i5992.m_UpperAngle = i5993[1]
  return i5992
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i5994 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i5995 = data
  i5994.m_MotorSpeed = i5995[0]
  i5994.m_MaximumMotorTorque = i5995[1]
  return i5994
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i5996 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i5997 = data
  i5996.m_DampingRatio = i5997[0]
  i5996.m_Frequency = i5997[1]
  i5996.m_Angle = i5997[2]
  return i5996
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i5998 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i5999 = data
  i5998.m_LowerTranslation = i5999[0]
  i5998.m_UpperTranslation = i5999[1]
  return i5998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i6000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i6001 = data
  i6000.name = i6001[0]
  i6000.halfPrecision = !!i6001[1]
  i6000.useSimplification = !!i6001[2]
  i6000.useUInt32IndexFormat = !!i6001[3]
  i6000.vertexCount = i6001[4]
  i6000.aabb = i6001[5]
  var i6003 = i6001[6]
  var i6002 = []
  for(var i = 0; i < i6003.length; i += 1) {
    i6002.push( !!i6003[i + 0] );
  }
  i6000.streams = i6002
  i6000.vertices = i6001[7]
  var i6005 = i6001[8]
  var i6004 = []
  for(var i = 0; i < i6005.length; i += 1) {
    i6004.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i6005[i + 0]) );
  }
  i6000.subMeshes = i6004
  var i6007 = i6001[9]
  var i6006 = []
  for(var i = 0; i < i6007.length; i += 16) {
    i6006.push( new pc.Mat4().setData(i6007[i + 0], i6007[i + 1], i6007[i + 2], i6007[i + 3],  i6007[i + 4], i6007[i + 5], i6007[i + 6], i6007[i + 7],  i6007[i + 8], i6007[i + 9], i6007[i + 10], i6007[i + 11],  i6007[i + 12], i6007[i + 13], i6007[i + 14], i6007[i + 15]) );
  }
  i6000.bindposes = i6006
  var i6009 = i6001[10]
  var i6008 = []
  for(var i = 0; i < i6009.length; i += 1) {
    i6008.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i6009[i + 0]) );
  }
  i6000.blendShapes = i6008
  return i6000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i6014 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i6015 = data
  i6014.triangles = i6015[0]
  return i6014
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i6020 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i6021 = data
  i6020.name = i6021[0]
  var i6023 = i6021[1]
  var i6022 = []
  for(var i = 0; i < i6023.length; i += 1) {
    i6022.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i6023[i + 0]) );
  }
  i6020.frames = i6022
  return i6020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i6024 = root || new pc.UnityMaterial()
  var i6025 = data
  i6024.name = i6025[0]
  request.r(i6025[1], i6025[2], 0, i6024, 'shader')
  i6024.renderQueue = i6025[3]
  i6024.enableInstancing = !!i6025[4]
  var i6027 = i6025[5]
  var i6026 = []
  for(var i = 0; i < i6027.length; i += 1) {
    i6026.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i6027[i + 0]) );
  }
  i6024.floatParameters = i6026
  var i6029 = i6025[6]
  var i6028 = []
  for(var i = 0; i < i6029.length; i += 1) {
    i6028.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i6029[i + 0]) );
  }
  i6024.colorParameters = i6028
  var i6031 = i6025[7]
  var i6030 = []
  for(var i = 0; i < i6031.length; i += 1) {
    i6030.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i6031[i + 0]) );
  }
  i6024.vectorParameters = i6030
  var i6033 = i6025[8]
  var i6032 = []
  for(var i = 0; i < i6033.length; i += 1) {
    i6032.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i6033[i + 0]) );
  }
  i6024.textureParameters = i6032
  var i6035 = i6025[9]
  var i6034 = []
  for(var i = 0; i < i6035.length; i += 1) {
    i6034.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i6035[i + 0]) );
  }
  i6024.materialFlags = i6034
  return i6024
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i6038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i6039 = data
  i6038.name = i6039[0]
  i6038.value = i6039[1]
  return i6038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i6042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i6043 = data
  i6042.name = i6043[0]
  i6042.value = new pc.Color(i6043[1], i6043[2], i6043[3], i6043[4])
  return i6042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i6046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i6047 = data
  i6046.name = i6047[0]
  i6046.value = new pc.Vec4( i6047[1], i6047[2], i6047[3], i6047[4] )
  return i6046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i6050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i6051 = data
  i6050.name = i6051[0]
  request.r(i6051[1], i6051[2], 0, i6050, 'value')
  return i6050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i6054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i6055 = data
  i6054.name = i6055[0]
  i6054.enabled = !!i6055[1]
  return i6054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i6056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i6057 = data
  i6056.name = i6057[0]
  i6056.width = i6057[1]
  i6056.height = i6057[2]
  i6056.mipmapCount = i6057[3]
  i6056.anisoLevel = i6057[4]
  i6056.filterMode = i6057[5]
  i6056.hdr = !!i6057[6]
  i6056.format = i6057[7]
  i6056.wrapMode = i6057[8]
  i6056.alphaIsTransparency = !!i6057[9]
  i6056.alphaSource = i6057[10]
  i6056.graphicsFormat = i6057[11]
  i6056.sRGBTexture = !!i6057[12]
  i6056.desiredColorSpace = i6057[13]
  i6056.wrapU = i6057[14]
  i6056.wrapV = i6057[15]
  return i6056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i6058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i6059 = data
  i6058.position = new pc.Vec3( i6059[0], i6059[1], i6059[2] )
  i6058.scale = new pc.Vec3( i6059[3], i6059[4], i6059[5] )
  i6058.rotation = new pc.Quat(i6059[6], i6059[7], i6059[8], i6059[9])
  return i6058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i6060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i6061 = data
  i6060.mass = i6061[0]
  i6060.drag = i6061[1]
  i6060.angularDrag = i6061[2]
  i6060.useGravity = !!i6061[3]
  i6060.isKinematic = !!i6061[4]
  i6060.constraints = i6061[5]
  i6060.maxAngularVelocity = i6061[6]
  i6060.collisionDetectionMode = i6061[7]
  i6060.interpolation = i6061[8]
  return i6060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i6062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i6063 = data
  i6062.center = new pc.Vec3( i6063[0], i6063[1], i6063[2] )
  i6062.radius = i6063[3]
  i6062.height = i6063[4]
  i6062.direction = i6063[5]
  i6062.enabled = !!i6063[6]
  i6062.isTrigger = !!i6063[7]
  request.r(i6063[8], i6063[9], 0, i6062, 'material')
  return i6062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i6064 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i6065 = data
  request.r(i6065[0], i6065[1], 0, i6064, 'animatorController')
  request.r(i6065[2], i6065[3], 0, i6064, 'avatar')
  i6064.updateMode = i6065[4]
  i6064.hasTransformHierarchy = !!i6065[5]
  i6064.applyRootMotion = !!i6065[6]
  var i6067 = i6065[7]
  var i6066 = []
  for(var i = 0; i < i6067.length; i += 2) {
  request.r(i6067[i + 0], i6067[i + 1], 2, i6066, '')
  }
  i6064.humanBones = i6066
  i6064.enabled = !!i6065[8]
  return i6064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i6070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i6071 = data
  i6070.name = i6071[0]
  i6070.tagId = i6071[1]
  i6070.enabled = !!i6071[2]
  i6070.isStatic = !!i6071[3]
  i6070.layer = i6071[4]
  return i6070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i6072 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i6073 = data
  request.r(i6073[0], i6073[1], 0, i6072, 'sharedMesh')
  var i6075 = i6073[2]
  var i6074 = []
  for(var i = 0; i < i6075.length; i += 2) {
  request.r(i6075[i + 0], i6075[i + 1], 2, i6074, '')
  }
  i6072.bones = i6074
  i6072.updateWhenOffscreen = !!i6073[3]
  i6072.localBounds = i6073[4]
  request.r(i6073[5], i6073[6], 0, i6072, 'rootBone')
  var i6077 = i6073[7]
  var i6076 = []
  for(var i = 0; i < i6077.length; i += 1) {
    i6076.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i6077[i + 0]) );
  }
  i6072.blendShapesWeights = i6076
  i6072.enabled = !!i6073[8]
  request.r(i6073[9], i6073[10], 0, i6072, 'sharedMaterial')
  var i6079 = i6073[11]
  var i6078 = []
  for(var i = 0; i < i6079.length; i += 2) {
  request.r(i6079[i + 0], i6079[i + 1], 2, i6078, '')
  }
  i6072.sharedMaterials = i6078
  i6072.receiveShadows = !!i6073[12]
  i6072.shadowCastingMode = i6073[13]
  i6072.sortingLayerID = i6073[14]
  i6072.sortingOrder = i6073[15]
  i6072.lightmapIndex = i6073[16]
  i6072.lightmapSceneIndex = i6073[17]
  i6072.lightmapScaleOffset = new pc.Vec4( i6073[18], i6073[19], i6073[20], i6073[21] )
  i6072.lightProbeUsage = i6073[22]
  i6072.reflectionProbeUsage = i6073[23]
  return i6072
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i6082 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i6083 = data
  i6082.weight = i6083[0]
  return i6082
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i6086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i6087 = data
  i6086.pivot = new pc.Vec2( i6087[0], i6087[1] )
  i6086.anchorMin = new pc.Vec2( i6087[2], i6087[3] )
  i6086.anchorMax = new pc.Vec2( i6087[4], i6087[5] )
  i6086.sizeDelta = new pc.Vec2( i6087[6], i6087[7] )
  i6086.anchoredPosition3D = new pc.Vec3( i6087[8], i6087[9], i6087[10] )
  i6086.rotation = new pc.Quat(i6087[11], i6087[12], i6087[13], i6087[14])
  i6086.scale = new pc.Vec3( i6087[15], i6087[16], i6087[17] )
  return i6086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i6088 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i6089 = data
  request.r(i6089[0], i6089[1], 0, i6088, 'additionalVertexStreams')
  i6088.enabled = !!i6089[2]
  request.r(i6089[3], i6089[4], 0, i6088, 'sharedMaterial')
  var i6091 = i6089[5]
  var i6090 = []
  for(var i = 0; i < i6091.length; i += 2) {
  request.r(i6091[i + 0], i6091[i + 1], 2, i6090, '')
  }
  i6088.sharedMaterials = i6090
  i6088.receiveShadows = !!i6089[6]
  i6088.shadowCastingMode = i6089[7]
  i6088.sortingLayerID = i6089[8]
  i6088.sortingOrder = i6089[9]
  i6088.lightmapIndex = i6089[10]
  i6088.lightmapSceneIndex = i6089[11]
  i6088.lightmapScaleOffset = new pc.Vec4( i6089[12], i6089[13], i6089[14], i6089[15] )
  i6088.lightProbeUsage = i6089[16]
  i6088.reflectionProbeUsage = i6089[17]
  return i6088
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i6092 = root || request.c( 'TMPro.TextMeshPro' )
  var i6093 = data
  i6092._SortingLayer = i6093[0]
  i6092._SortingLayerID = i6093[1]
  i6092._SortingOrder = i6093[2]
  i6092.m_hasFontAssetChanged = !!i6093[3]
  request.r(i6093[4], i6093[5], 0, i6092, 'm_renderer')
  i6092.m_maskType = i6093[6]
  i6092.m_text = i6093[7]
  i6092.m_isRightToLeft = !!i6093[8]
  request.r(i6093[9], i6093[10], 0, i6092, 'm_fontAsset')
  request.r(i6093[11], i6093[12], 0, i6092, 'm_sharedMaterial')
  var i6095 = i6093[13]
  var i6094 = []
  for(var i = 0; i < i6095.length; i += 2) {
  request.r(i6095[i + 0], i6095[i + 1], 2, i6094, '')
  }
  i6092.m_fontSharedMaterials = i6094
  request.r(i6093[14], i6093[15], 0, i6092, 'm_fontMaterial')
  var i6097 = i6093[16]
  var i6096 = []
  for(var i = 0; i < i6097.length; i += 2) {
  request.r(i6097[i + 0], i6097[i + 1], 2, i6096, '')
  }
  i6092.m_fontMaterials = i6096
  i6092.m_fontColor32 = UnityEngine.Color32.ConstructColor(i6093[17], i6093[18], i6093[19], i6093[20])
  i6092.m_fontColor = new pc.Color(i6093[21], i6093[22], i6093[23], i6093[24])
  i6092.m_enableVertexGradient = !!i6093[25]
  i6092.m_colorMode = i6093[26]
  i6092.m_fontColorGradient = request.d('TMPro.VertexGradient', i6093[27], i6092.m_fontColorGradient)
  request.r(i6093[28], i6093[29], 0, i6092, 'm_fontColorGradientPreset')
  request.r(i6093[30], i6093[31], 0, i6092, 'm_spriteAsset')
  i6092.m_tintAllSprites = !!i6093[32]
  request.r(i6093[33], i6093[34], 0, i6092, 'm_StyleSheet')
  i6092.m_TextStyleHashCode = i6093[35]
  i6092.m_overrideHtmlColors = !!i6093[36]
  i6092.m_faceColor = UnityEngine.Color32.ConstructColor(i6093[37], i6093[38], i6093[39], i6093[40])
  i6092.m_fontSize = i6093[41]
  i6092.m_fontSizeBase = i6093[42]
  i6092.m_fontWeight = i6093[43]
  i6092.m_enableAutoSizing = !!i6093[44]
  i6092.m_fontSizeMin = i6093[45]
  i6092.m_fontSizeMax = i6093[46]
  i6092.m_fontStyle = i6093[47]
  i6092.m_HorizontalAlignment = i6093[48]
  i6092.m_VerticalAlignment = i6093[49]
  i6092.m_textAlignment = i6093[50]
  i6092.m_characterSpacing = i6093[51]
  i6092.m_characterHorizontalScale = i6093[52]
  i6092.m_wordSpacing = i6093[53]
  i6092.m_lineSpacing = i6093[54]
  i6092.m_lineSpacingMax = i6093[55]
  i6092.m_paragraphSpacing = i6093[56]
  i6092.m_charWidthMaxAdj = i6093[57]
  i6092.m_TextWrappingMode = i6093[58]
  i6092.m_wordWrappingRatios = i6093[59]
  i6092.m_overflowMode = i6093[60]
  request.r(i6093[61], i6093[62], 0, i6092, 'm_linkedTextComponent')
  request.r(i6093[63], i6093[64], 0, i6092, 'parentLinkedComponent')
  i6092.m_enableKerning = !!i6093[65]
  var i6099 = i6093[66]
  var i6098 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i6099.length; i += 1) {
    i6098.add(i6099[i + 0]);
  }
  i6092.m_ActiveFontFeatures = i6098
  i6092.m_enableExtraPadding = !!i6093[67]
  i6092.checkPaddingRequired = !!i6093[68]
  i6092.m_isRichText = !!i6093[69]
  i6092.m_parseCtrlCharacters = !!i6093[70]
  i6092.m_isOrthographic = !!i6093[71]
  i6092.m_isCullingEnabled = !!i6093[72]
  i6092.m_horizontalMapping = i6093[73]
  i6092.m_verticalMapping = i6093[74]
  i6092.m_uvLineOffset = i6093[75]
  i6092.m_geometrySortingOrder = i6093[76]
  i6092.m_IsTextObjectScaleStatic = !!i6093[77]
  i6092.m_VertexBufferAutoSizeReduction = !!i6093[78]
  i6092.m_useMaxVisibleDescender = !!i6093[79]
  i6092.m_pageToDisplay = i6093[80]
  i6092.m_margin = new pc.Vec4( i6093[81], i6093[82], i6093[83], i6093[84] )
  i6092.m_isUsingLegacyAnimationComponent = !!i6093[85]
  i6092.m_isVolumetricText = !!i6093[86]
  request.r(i6093[87], i6093[88], 0, i6092, 'm_Material')
  i6092.m_EmojiFallbackSupport = !!i6093[89]
  i6092.m_Maskable = !!i6093[90]
  i6092.m_Color = new pc.Color(i6093[91], i6093[92], i6093[93], i6093[94])
  i6092.m_RaycastTarget = !!i6093[95]
  i6092.m_RaycastPadding = new pc.Vec4( i6093[96], i6093[97], i6093[98], i6093[99] )
  return i6092
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i6100 = root || request.c( 'TMPro.VertexGradient' )
  var i6101 = data
  i6100.topLeft = new pc.Color(i6101[0], i6101[1], i6101[2], i6101[3])
  i6100.topRight = new pc.Color(i6101[4], i6101[5], i6101[6], i6101[7])
  i6100.bottomLeft = new pc.Color(i6101[8], i6101[9], i6101[10], i6101[11])
  i6100.bottomRight = new pc.Color(i6101[12], i6101[13], i6101[14], i6101[15])
  return i6100
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i6104 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i6105 = data
  var i6107 = i6105[0]
  var i6106 = []
  for(var i = 0; i < i6107.length; i += 3) {
    i6106.push( new pc.Vec3( i6107[i + 0], i6107[i + 1], i6107[i + 2] ) );
  }
  i6104.positions = i6106
  i6104.positionCount = i6105[1]
  i6104.time = i6105[2]
  i6104.startWidth = i6105[3]
  i6104.endWidth = i6105[4]
  i6104.widthMultiplier = i6105[5]
  i6104.autodestruct = !!i6105[6]
  i6104.emitting = !!i6105[7]
  i6104.numCornerVertices = i6105[8]
  i6104.numCapVertices = i6105[9]
  i6104.minVertexDistance = i6105[10]
  i6104.colorGradient = i6105[11] ? new pc.ColorGradient(i6105[11][0], i6105[11][1], i6105[11][2]) : null
  i6104.startColor = new pc.Color(i6105[12], i6105[13], i6105[14], i6105[15])
  i6104.endColor = new pc.Color(i6105[16], i6105[17], i6105[18], i6105[19])
  i6104.generateLightingData = !!i6105[20]
  i6104.textureMode = i6105[21]
  i6104.alignment = i6105[22]
  i6104.widthCurve = new pc.AnimationCurve( { keys_flow: i6105[23] } )
  i6104.enabled = !!i6105[24]
  request.r(i6105[25], i6105[26], 0, i6104, 'sharedMaterial')
  var i6109 = i6105[27]
  var i6108 = []
  for(var i = 0; i < i6109.length; i += 2) {
  request.r(i6109[i + 0], i6109[i + 1], 2, i6108, '')
  }
  i6104.sharedMaterials = i6108
  i6104.receiveShadows = !!i6105[28]
  i6104.shadowCastingMode = i6105[29]
  i6104.sortingLayerID = i6105[30]
  i6104.sortingOrder = i6105[31]
  i6104.lightmapIndex = i6105[32]
  i6104.lightmapSceneIndex = i6105[33]
  i6104.lightmapScaleOffset = new pc.Vec4( i6105[34], i6105[35], i6105[36], i6105[37] )
  i6104.lightProbeUsage = i6105[38]
  i6104.reflectionProbeUsage = i6105[39]
  return i6104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i6112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i6113 = data
  i6112.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i6113[0], i6112.main)
  i6112.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i6113[1], i6112.colorBySpeed)
  i6112.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i6113[2], i6112.colorOverLifetime)
  i6112.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i6113[3], i6112.emission)
  i6112.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i6113[4], i6112.rotationBySpeed)
  i6112.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i6113[5], i6112.rotationOverLifetime)
  i6112.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i6113[6], i6112.shape)
  i6112.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i6113[7], i6112.sizeBySpeed)
  i6112.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i6113[8], i6112.sizeOverLifetime)
  i6112.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i6113[9], i6112.textureSheetAnimation)
  i6112.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i6113[10], i6112.velocityOverLifetime)
  i6112.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i6113[11], i6112.noise)
  i6112.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i6113[12], i6112.inheritVelocity)
  i6112.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i6113[13], i6112.forceOverLifetime)
  i6112.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i6113[14], i6112.limitVelocityOverLifetime)
  i6112.useAutoRandomSeed = !!i6113[15]
  i6112.randomSeed = i6113[16]
  return i6112
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i6114 = root || new pc.ParticleSystemMain()
  var i6115 = data
  i6114.duration = i6115[0]
  i6114.loop = !!i6115[1]
  i6114.prewarm = !!i6115[2]
  i6114.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[3], i6114.startDelay)
  i6114.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[4], i6114.startLifetime)
  i6114.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[5], i6114.startSpeed)
  i6114.startSize3D = !!i6115[6]
  i6114.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[7], i6114.startSizeX)
  i6114.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[8], i6114.startSizeY)
  i6114.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[9], i6114.startSizeZ)
  i6114.startRotation3D = !!i6115[10]
  i6114.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[11], i6114.startRotationX)
  i6114.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[12], i6114.startRotationY)
  i6114.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[13], i6114.startRotationZ)
  i6114.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i6115[14], i6114.startColor)
  i6114.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6115[15], i6114.gravityModifier)
  i6114.simulationSpace = i6115[16]
  request.r(i6115[17], i6115[18], 0, i6114, 'customSimulationSpace')
  i6114.simulationSpeed = i6115[19]
  i6114.useUnscaledTime = !!i6115[20]
  i6114.scalingMode = i6115[21]
  i6114.playOnAwake = !!i6115[22]
  i6114.maxParticles = i6115[23]
  i6114.emitterVelocityMode = i6115[24]
  i6114.stopAction = i6115[25]
  return i6114
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i6116 = root || new pc.MinMaxCurve()
  var i6117 = data
  i6116.mode = i6117[0]
  i6116.curveMin = new pc.AnimationCurve( { keys_flow: i6117[1] } )
  i6116.curveMax = new pc.AnimationCurve( { keys_flow: i6117[2] } )
  i6116.curveMultiplier = i6117[3]
  i6116.constantMin = i6117[4]
  i6116.constantMax = i6117[5]
  return i6116
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i6118 = root || new pc.MinMaxGradient()
  var i6119 = data
  i6118.mode = i6119[0]
  i6118.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i6119[1], i6118.gradientMin)
  i6118.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i6119[2], i6118.gradientMax)
  i6118.colorMin = new pc.Color(i6119[3], i6119[4], i6119[5], i6119[6])
  i6118.colorMax = new pc.Color(i6119[7], i6119[8], i6119[9], i6119[10])
  return i6118
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i6120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i6121 = data
  i6120.mode = i6121[0]
  var i6123 = i6121[1]
  var i6122 = []
  for(var i = 0; i < i6123.length; i += 1) {
    i6122.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i6123[i + 0]) );
  }
  i6120.colorKeys = i6122
  var i6125 = i6121[2]
  var i6124 = []
  for(var i = 0; i < i6125.length; i += 1) {
    i6124.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i6125[i + 0]) );
  }
  i6120.alphaKeys = i6124
  return i6120
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i6126 = root || new pc.ParticleSystemColorBySpeed()
  var i6127 = data
  i6126.enabled = !!i6127[0]
  i6126.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i6127[1], i6126.color)
  i6126.range = new pc.Vec2( i6127[2], i6127[3] )
  return i6126
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i6130 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i6131 = data
  i6130.color = new pc.Color(i6131[0], i6131[1], i6131[2], i6131[3])
  i6130.time = i6131[4]
  return i6130
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i6134 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i6135 = data
  i6134.alpha = i6135[0]
  i6134.time = i6135[1]
  return i6134
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i6136 = root || new pc.ParticleSystemColorOverLifetime()
  var i6137 = data
  i6136.enabled = !!i6137[0]
  i6136.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i6137[1], i6136.color)
  return i6136
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i6138 = root || new pc.ParticleSystemEmitter()
  var i6139 = data
  i6138.enabled = !!i6139[0]
  i6138.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6139[1], i6138.rateOverTime)
  i6138.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6139[2], i6138.rateOverDistance)
  var i6141 = i6139[3]
  var i6140 = []
  for(var i = 0; i < i6141.length; i += 1) {
    i6140.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i6141[i + 0]) );
  }
  i6138.bursts = i6140
  return i6138
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i6144 = root || new pc.ParticleSystemBurst()
  var i6145 = data
  i6144.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6145[0], i6144.count)
  i6144.cycleCount = i6145[1]
  i6144.minCount = i6145[2]
  i6144.maxCount = i6145[3]
  i6144.repeatInterval = i6145[4]
  i6144.time = i6145[5]
  return i6144
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i6146 = root || new pc.ParticleSystemRotationBySpeed()
  var i6147 = data
  i6146.enabled = !!i6147[0]
  i6146.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6147[1], i6146.x)
  i6146.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6147[2], i6146.y)
  i6146.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6147[3], i6146.z)
  i6146.separateAxes = !!i6147[4]
  i6146.range = new pc.Vec2( i6147[5], i6147[6] )
  return i6146
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i6148 = root || new pc.ParticleSystemRotationOverLifetime()
  var i6149 = data
  i6148.enabled = !!i6149[0]
  i6148.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6149[1], i6148.x)
  i6148.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6149[2], i6148.y)
  i6148.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6149[3], i6148.z)
  i6148.separateAxes = !!i6149[4]
  return i6148
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i6150 = root || new pc.ParticleSystemShape()
  var i6151 = data
  i6150.enabled = !!i6151[0]
  i6150.shapeType = i6151[1]
  i6150.randomDirectionAmount = i6151[2]
  i6150.sphericalDirectionAmount = i6151[3]
  i6150.randomPositionAmount = i6151[4]
  i6150.alignToDirection = !!i6151[5]
  i6150.radius = i6151[6]
  i6150.radiusMode = i6151[7]
  i6150.radiusSpread = i6151[8]
  i6150.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6151[9], i6150.radiusSpeed)
  i6150.radiusThickness = i6151[10]
  i6150.angle = i6151[11]
  i6150.length = i6151[12]
  i6150.boxThickness = new pc.Vec3( i6151[13], i6151[14], i6151[15] )
  i6150.meshShapeType = i6151[16]
  request.r(i6151[17], i6151[18], 0, i6150, 'mesh')
  request.r(i6151[19], i6151[20], 0, i6150, 'meshRenderer')
  request.r(i6151[21], i6151[22], 0, i6150, 'skinnedMeshRenderer')
  i6150.useMeshMaterialIndex = !!i6151[23]
  i6150.meshMaterialIndex = i6151[24]
  i6150.useMeshColors = !!i6151[25]
  i6150.normalOffset = i6151[26]
  i6150.arc = i6151[27]
  i6150.arcMode = i6151[28]
  i6150.arcSpread = i6151[29]
  i6150.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6151[30], i6150.arcSpeed)
  i6150.donutRadius = i6151[31]
  i6150.position = new pc.Vec3( i6151[32], i6151[33], i6151[34] )
  i6150.rotation = new pc.Vec3( i6151[35], i6151[36], i6151[37] )
  i6150.scale = new pc.Vec3( i6151[38], i6151[39], i6151[40] )
  return i6150
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i6152 = root || new pc.ParticleSystemSizeBySpeed()
  var i6153 = data
  i6152.enabled = !!i6153[0]
  i6152.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6153[1], i6152.x)
  i6152.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6153[2], i6152.y)
  i6152.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6153[3], i6152.z)
  i6152.separateAxes = !!i6153[4]
  i6152.range = new pc.Vec2( i6153[5], i6153[6] )
  return i6152
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i6154 = root || new pc.ParticleSystemSizeOverLifetime()
  var i6155 = data
  i6154.enabled = !!i6155[0]
  i6154.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6155[1], i6154.x)
  i6154.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6155[2], i6154.y)
  i6154.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6155[3], i6154.z)
  i6154.separateAxes = !!i6155[4]
  return i6154
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i6156 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i6157 = data
  i6156.enabled = !!i6157[0]
  i6156.mode = i6157[1]
  i6156.animation = i6157[2]
  i6156.numTilesX = i6157[3]
  i6156.numTilesY = i6157[4]
  i6156.useRandomRow = !!i6157[5]
  i6156.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6157[6], i6156.frameOverTime)
  i6156.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6157[7], i6156.startFrame)
  i6156.cycleCount = i6157[8]
  i6156.rowIndex = i6157[9]
  i6156.flipU = i6157[10]
  i6156.flipV = i6157[11]
  i6156.spriteCount = i6157[12]
  var i6159 = i6157[13]
  var i6158 = []
  for(var i = 0; i < i6159.length; i += 2) {
  request.r(i6159[i + 0], i6159[i + 1], 2, i6158, '')
  }
  i6156.sprites = i6158
  return i6156
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i6162 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i6163 = data
  i6162.enabled = !!i6163[0]
  i6162.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[1], i6162.x)
  i6162.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[2], i6162.y)
  i6162.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[3], i6162.z)
  i6162.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[4], i6162.radial)
  i6162.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[5], i6162.speedModifier)
  i6162.space = i6163[6]
  i6162.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[7], i6162.orbitalX)
  i6162.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[8], i6162.orbitalY)
  i6162.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[9], i6162.orbitalZ)
  i6162.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[10], i6162.orbitalOffsetX)
  i6162.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[11], i6162.orbitalOffsetY)
  i6162.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6163[12], i6162.orbitalOffsetZ)
  return i6162
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i6164 = root || new pc.ParticleSystemNoise()
  var i6165 = data
  i6164.enabled = !!i6165[0]
  i6164.separateAxes = !!i6165[1]
  i6164.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[2], i6164.strengthX)
  i6164.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[3], i6164.strengthY)
  i6164.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[4], i6164.strengthZ)
  i6164.frequency = i6165[5]
  i6164.damping = !!i6165[6]
  i6164.octaveCount = i6165[7]
  i6164.octaveMultiplier = i6165[8]
  i6164.octaveScale = i6165[9]
  i6164.quality = i6165[10]
  i6164.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[11], i6164.scrollSpeed)
  i6164.scrollSpeedMultiplier = i6165[12]
  i6164.remapEnabled = !!i6165[13]
  i6164.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[14], i6164.remapX)
  i6164.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[15], i6164.remapY)
  i6164.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[16], i6164.remapZ)
  i6164.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[17], i6164.positionAmount)
  i6164.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[18], i6164.rotationAmount)
  i6164.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6165[19], i6164.sizeAmount)
  return i6164
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i6166 = root || new pc.ParticleSystemInheritVelocity()
  var i6167 = data
  i6166.enabled = !!i6167[0]
  i6166.mode = i6167[1]
  i6166.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6167[2], i6166.curve)
  return i6166
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i6168 = root || new pc.ParticleSystemForceOverLifetime()
  var i6169 = data
  i6168.enabled = !!i6169[0]
  i6168.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6169[1], i6168.x)
  i6168.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6169[2], i6168.y)
  i6168.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6169[3], i6168.z)
  i6168.space = i6169[4]
  i6168.randomized = !!i6169[5]
  return i6168
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i6170 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i6171 = data
  i6170.enabled = !!i6171[0]
  i6170.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6171[1], i6170.limit)
  i6170.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6171[2], i6170.limitX)
  i6170.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6171[3], i6170.limitY)
  i6170.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6171[4], i6170.limitZ)
  i6170.dampen = i6171[5]
  i6170.separateAxes = !!i6171[6]
  i6170.space = i6171[7]
  i6170.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i6171[8], i6170.drag)
  i6170.multiplyDragByParticleSize = !!i6171[9]
  i6170.multiplyDragByParticleVelocity = !!i6171[10]
  return i6170
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i6172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i6173 = data
  request.r(i6173[0], i6173[1], 0, i6172, 'mesh')
  i6172.meshCount = i6173[2]
  i6172.activeVertexStreamsCount = i6173[3]
  i6172.alignment = i6173[4]
  i6172.renderMode = i6173[5]
  i6172.sortMode = i6173[6]
  i6172.lengthScale = i6173[7]
  i6172.velocityScale = i6173[8]
  i6172.cameraVelocityScale = i6173[9]
  i6172.normalDirection = i6173[10]
  i6172.sortingFudge = i6173[11]
  i6172.minParticleSize = i6173[12]
  i6172.maxParticleSize = i6173[13]
  i6172.pivot = new pc.Vec3( i6173[14], i6173[15], i6173[16] )
  request.r(i6173[17], i6173[18], 0, i6172, 'trailMaterial')
  i6172.applyActiveColorSpace = !!i6173[19]
  i6172.enabled = !!i6173[20]
  request.r(i6173[21], i6173[22], 0, i6172, 'sharedMaterial')
  var i6175 = i6173[23]
  var i6174 = []
  for(var i = 0; i < i6175.length; i += 2) {
  request.r(i6175[i + 0], i6175[i + 1], 2, i6174, '')
  }
  i6172.sharedMaterials = i6174
  i6172.receiveShadows = !!i6173[24]
  i6172.shadowCastingMode = i6173[25]
  i6172.sortingLayerID = i6173[26]
  i6172.sortingOrder = i6173[27]
  i6172.lightmapIndex = i6173[28]
  i6172.lightmapSceneIndex = i6173[29]
  i6172.lightmapScaleOffset = new pc.Vec4( i6173[30], i6173[31], i6173[32], i6173[33] )
  i6172.lightProbeUsage = i6173[34]
  i6172.reflectionProbeUsage = i6173[35]
  return i6172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i6176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i6177 = data
  request.r(i6177[0], i6177[1], 0, i6176, 'sharedMesh')
  return i6176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i6178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i6179 = data
  i6178.center = new pc.Vec3( i6179[0], i6179[1], i6179[2] )
  i6178.size = new pc.Vec3( i6179[3], i6179[4], i6179[5] )
  i6178.enabled = !!i6179[6]
  i6178.isTrigger = !!i6179[7]
  request.r(i6179[8], i6179[9], 0, i6178, 'material')
  return i6178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i6180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i6181 = data
  i6180.center = new pc.Vec3( i6181[0], i6181[1], i6181[2] )
  i6180.radius = i6181[3]
  i6180.enabled = !!i6181[4]
  i6180.isTrigger = !!i6181[5]
  request.r(i6181[6], i6181[7], 0, i6180, 'material')
  return i6180
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i6182 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i6183 = data
  i6182.planeDistance = i6183[0]
  i6182.referencePixelsPerUnit = i6183[1]
  i6182.isFallbackOverlay = !!i6183[2]
  i6182.renderMode = i6183[3]
  i6182.renderOrder = i6183[4]
  i6182.sortingLayerName = i6183[5]
  i6182.sortingOrder = i6183[6]
  i6182.scaleFactor = i6183[7]
  request.r(i6183[8], i6183[9], 0, i6182, 'worldCamera')
  i6182.overrideSorting = !!i6183[10]
  i6182.pixelPerfect = !!i6183[11]
  i6182.targetDisplay = i6183[12]
  i6182.overridePixelPerfect = !!i6183[13]
  i6182.enabled = !!i6183[14]
  return i6182
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i6184 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i6185 = data
  i6184.m_UiScaleMode = i6185[0]
  i6184.m_ReferencePixelsPerUnit = i6185[1]
  i6184.m_ScaleFactor = i6185[2]
  i6184.m_ReferenceResolution = new pc.Vec2( i6185[3], i6185[4] )
  i6184.m_ScreenMatchMode = i6185[5]
  i6184.m_MatchWidthOrHeight = i6185[6]
  i6184.m_PhysicalUnit = i6185[7]
  i6184.m_FallbackScreenDPI = i6185[8]
  i6184.m_DefaultSpriteDPI = i6185[9]
  i6184.m_DynamicPixelsPerUnit = i6185[10]
  i6184.m_PresetInfoIsWorld = !!i6185[11]
  return i6184
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i6186 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i6187 = data
  i6186.m_IgnoreReversedGraphics = !!i6187[0]
  i6186.m_BlockingObjects = i6187[1]
  i6186.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i6187[2] )
  return i6186
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i6188 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i6189 = data
  i6188.cullTransparentMesh = !!i6189[0]
  return i6188
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i6190 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i6191 = data
  i6190.m_hasFontAssetChanged = !!i6191[0]
  request.r(i6191[1], i6191[2], 0, i6190, 'm_baseMaterial')
  i6190.m_maskOffset = new pc.Vec4( i6191[3], i6191[4], i6191[5], i6191[6] )
  i6190.m_text = i6191[7]
  i6190.m_isRightToLeft = !!i6191[8]
  request.r(i6191[9], i6191[10], 0, i6190, 'm_fontAsset')
  request.r(i6191[11], i6191[12], 0, i6190, 'm_sharedMaterial')
  var i6193 = i6191[13]
  var i6192 = []
  for(var i = 0; i < i6193.length; i += 2) {
  request.r(i6193[i + 0], i6193[i + 1], 2, i6192, '')
  }
  i6190.m_fontSharedMaterials = i6192
  request.r(i6191[14], i6191[15], 0, i6190, 'm_fontMaterial')
  var i6195 = i6191[16]
  var i6194 = []
  for(var i = 0; i < i6195.length; i += 2) {
  request.r(i6195[i + 0], i6195[i + 1], 2, i6194, '')
  }
  i6190.m_fontMaterials = i6194
  i6190.m_fontColor32 = UnityEngine.Color32.ConstructColor(i6191[17], i6191[18], i6191[19], i6191[20])
  i6190.m_fontColor = new pc.Color(i6191[21], i6191[22], i6191[23], i6191[24])
  i6190.m_enableVertexGradient = !!i6191[25]
  i6190.m_colorMode = i6191[26]
  i6190.m_fontColorGradient = request.d('TMPro.VertexGradient', i6191[27], i6190.m_fontColorGradient)
  request.r(i6191[28], i6191[29], 0, i6190, 'm_fontColorGradientPreset')
  request.r(i6191[30], i6191[31], 0, i6190, 'm_spriteAsset')
  i6190.m_tintAllSprites = !!i6191[32]
  request.r(i6191[33], i6191[34], 0, i6190, 'm_StyleSheet')
  i6190.m_TextStyleHashCode = i6191[35]
  i6190.m_overrideHtmlColors = !!i6191[36]
  i6190.m_faceColor = UnityEngine.Color32.ConstructColor(i6191[37], i6191[38], i6191[39], i6191[40])
  i6190.m_fontSize = i6191[41]
  i6190.m_fontSizeBase = i6191[42]
  i6190.m_fontWeight = i6191[43]
  i6190.m_enableAutoSizing = !!i6191[44]
  i6190.m_fontSizeMin = i6191[45]
  i6190.m_fontSizeMax = i6191[46]
  i6190.m_fontStyle = i6191[47]
  i6190.m_HorizontalAlignment = i6191[48]
  i6190.m_VerticalAlignment = i6191[49]
  i6190.m_textAlignment = i6191[50]
  i6190.m_characterSpacing = i6191[51]
  i6190.m_characterHorizontalScale = i6191[52]
  i6190.m_wordSpacing = i6191[53]
  i6190.m_lineSpacing = i6191[54]
  i6190.m_lineSpacingMax = i6191[55]
  i6190.m_paragraphSpacing = i6191[56]
  i6190.m_charWidthMaxAdj = i6191[57]
  i6190.m_TextWrappingMode = i6191[58]
  i6190.m_wordWrappingRatios = i6191[59]
  i6190.m_overflowMode = i6191[60]
  request.r(i6191[61], i6191[62], 0, i6190, 'm_linkedTextComponent')
  request.r(i6191[63], i6191[64], 0, i6190, 'parentLinkedComponent')
  i6190.m_enableKerning = !!i6191[65]
  var i6197 = i6191[66]
  var i6196 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i6197.length; i += 1) {
    i6196.add(i6197[i + 0]);
  }
  i6190.m_ActiveFontFeatures = i6196
  i6190.m_enableExtraPadding = !!i6191[67]
  i6190.checkPaddingRequired = !!i6191[68]
  i6190.m_isRichText = !!i6191[69]
  i6190.m_parseCtrlCharacters = !!i6191[70]
  i6190.m_isOrthographic = !!i6191[71]
  i6190.m_isCullingEnabled = !!i6191[72]
  i6190.m_horizontalMapping = i6191[73]
  i6190.m_verticalMapping = i6191[74]
  i6190.m_uvLineOffset = i6191[75]
  i6190.m_geometrySortingOrder = i6191[76]
  i6190.m_IsTextObjectScaleStatic = !!i6191[77]
  i6190.m_VertexBufferAutoSizeReduction = !!i6191[78]
  i6190.m_useMaxVisibleDescender = !!i6191[79]
  i6190.m_pageToDisplay = i6191[80]
  i6190.m_margin = new pc.Vec4( i6191[81], i6191[82], i6191[83], i6191[84] )
  i6190.m_isUsingLegacyAnimationComponent = !!i6191[85]
  i6190.m_isVolumetricText = !!i6191[86]
  request.r(i6191[87], i6191[88], 0, i6190, 'm_Material')
  i6190.m_EmojiFallbackSupport = !!i6191[89]
  i6190.m_Maskable = !!i6191[90]
  i6190.m_Color = new pc.Color(i6191[91], i6191[92], i6191[93], i6191[94])
  i6190.m_RaycastTarget = !!i6191[95]
  i6190.m_RaycastPadding = new pc.Vec4( i6191[96], i6191[97], i6191[98], i6191[99] )
  return i6190
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i6198 = root || request.c( 'UnityEngine.UI.Image' )
  var i6199 = data
  request.r(i6199[0], i6199[1], 0, i6198, 'm_Sprite')
  i6198.m_Type = i6199[2]
  i6198.m_PreserveAspect = !!i6199[3]
  i6198.m_FillCenter = !!i6199[4]
  i6198.m_FillMethod = i6199[5]
  i6198.m_FillAmount = i6199[6]
  i6198.m_FillClockwise = !!i6199[7]
  i6198.m_FillOrigin = i6199[8]
  i6198.m_UseSpriteMesh = !!i6199[9]
  i6198.m_PixelsPerUnitMultiplier = i6199[10]
  request.r(i6199[11], i6199[12], 0, i6198, 'm_Material')
  i6198.m_Maskable = !!i6199[13]
  i6198.m_Color = new pc.Color(i6199[14], i6199[15], i6199[16], i6199[17])
  i6198.m_RaycastTarget = !!i6199[18]
  i6198.m_RaycastPadding = new pc.Vec4( i6199[19], i6199[20], i6199[21], i6199[22] )
  return i6198
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i6200 = root || request.c( 'UnityEngine.UI.Button' )
  var i6201 = data
  i6200.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i6201[0], i6200.m_OnClick)
  i6200.m_Navigation = request.d('UnityEngine.UI.Navigation', i6201[1], i6200.m_Navigation)
  i6200.m_Transition = i6201[2]
  i6200.m_Colors = request.d('UnityEngine.UI.ColorBlock', i6201[3], i6200.m_Colors)
  i6200.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i6201[4], i6200.m_SpriteState)
  i6200.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i6201[5], i6200.m_AnimationTriggers)
  i6200.m_Interactable = !!i6201[6]
  request.r(i6201[7], i6201[8], 0, i6200, 'm_TargetGraphic')
  return i6200
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i6202 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i6203 = data
  i6202.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i6203[0], i6202.m_PersistentCalls)
  return i6202
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i6204 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i6205 = data
  var i6207 = i6205[0]
  var i6206 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i6207.length; i += 1) {
    i6206.add(request.d('UnityEngine.Events.PersistentCall', i6207[i + 0]));
  }
  i6204.m_Calls = i6206
  return i6204
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i6210 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i6211 = data
  request.r(i6211[0], i6211[1], 0, i6210, 'm_Target')
  i6210.m_TargetAssemblyTypeName = i6211[2]
  i6210.m_MethodName = i6211[3]
  i6210.m_Mode = i6211[4]
  i6210.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i6211[5], i6210.m_Arguments)
  i6210.m_CallState = i6211[6]
  return i6210
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i6212 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i6213 = data
  i6212.m_Mode = i6213[0]
  i6212.m_WrapAround = !!i6213[1]
  request.r(i6213[2], i6213[3], 0, i6212, 'm_SelectOnUp')
  request.r(i6213[4], i6213[5], 0, i6212, 'm_SelectOnDown')
  request.r(i6213[6], i6213[7], 0, i6212, 'm_SelectOnLeft')
  request.r(i6213[8], i6213[9], 0, i6212, 'm_SelectOnRight')
  return i6212
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i6214 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i6215 = data
  i6214.m_NormalColor = new pc.Color(i6215[0], i6215[1], i6215[2], i6215[3])
  i6214.m_HighlightedColor = new pc.Color(i6215[4], i6215[5], i6215[6], i6215[7])
  i6214.m_PressedColor = new pc.Color(i6215[8], i6215[9], i6215[10], i6215[11])
  i6214.m_SelectedColor = new pc.Color(i6215[12], i6215[13], i6215[14], i6215[15])
  i6214.m_DisabledColor = new pc.Color(i6215[16], i6215[17], i6215[18], i6215[19])
  i6214.m_ColorMultiplier = i6215[20]
  i6214.m_FadeDuration = i6215[21]
  return i6214
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i6216 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i6217 = data
  request.r(i6217[0], i6217[1], 0, i6216, 'm_HighlightedSprite')
  request.r(i6217[2], i6217[3], 0, i6216, 'm_PressedSprite')
  request.r(i6217[4], i6217[5], 0, i6216, 'm_SelectedSprite')
  request.r(i6217[6], i6217[7], 0, i6216, 'm_DisabledSprite')
  return i6216
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i6218 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i6219 = data
  i6218.m_NormalTrigger = i6219[0]
  i6218.m_HighlightedTrigger = i6219[1]
  i6218.m_PressedTrigger = i6219[2]
  i6218.m_SelectedTrigger = i6219[3]
  i6218.m_DisabledTrigger = i6219[4]
  return i6218
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i6220 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i6221 = data
  i6220.m_StartCorner = i6221[0]
  i6220.m_StartAxis = i6221[1]
  i6220.m_CellSize = new pc.Vec2( i6221[2], i6221[3] )
  i6220.m_Spacing = new pc.Vec2( i6221[4], i6221[5] )
  i6220.m_Constraint = i6221[6]
  i6220.m_ConstraintCount = i6221[7]
  i6220.m_Padding = UnityEngine.RectOffset.FromPaddings(i6221[8], i6221[9], i6221[10], i6221[11])
  i6220.m_ChildAlignment = i6221[12]
  return i6220
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i6222 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i6223 = data
  i6222.m_Spacing = i6223[0]
  i6222.m_ChildForceExpandWidth = !!i6223[1]
  i6222.m_ChildForceExpandHeight = !!i6223[2]
  i6222.m_ChildControlWidth = !!i6223[3]
  i6222.m_ChildControlHeight = !!i6223[4]
  i6222.m_ChildScaleWidth = !!i6223[5]
  i6222.m_ChildScaleHeight = !!i6223[6]
  i6222.m_ReverseArrangement = !!i6223[7]
  i6222.m_Padding = UnityEngine.RectOffset.FromPaddings(i6223[8], i6223[9], i6223[10], i6223[11])
  i6222.m_ChildAlignment = i6223[12]
  return i6222
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i6224 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i6225 = data
  i6224.m_HorizontalFit = i6225[0]
  i6224.m_VerticalFit = i6225[1]
  return i6224
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i6226 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i6227 = data
  request.r(i6227[0], i6227[1], 0, i6226, 'm_Content')
  i6226.m_Horizontal = !!i6227[2]
  i6226.m_Vertical = !!i6227[3]
  i6226.m_MovementType = i6227[4]
  i6226.m_Elasticity = i6227[5]
  i6226.m_Inertia = !!i6227[6]
  i6226.m_DecelerationRate = i6227[7]
  i6226.m_ScrollSensitivity = i6227[8]
  request.r(i6227[9], i6227[10], 0, i6226, 'm_Viewport')
  request.r(i6227[11], i6227[12], 0, i6226, 'm_HorizontalScrollbar')
  request.r(i6227[13], i6227[14], 0, i6226, 'm_VerticalScrollbar')
  i6226.m_HorizontalScrollbarVisibility = i6227[15]
  i6226.m_VerticalScrollbarVisibility = i6227[16]
  i6226.m_HorizontalScrollbarSpacing = i6227[17]
  i6226.m_VerticalScrollbarSpacing = i6227[18]
  i6226.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i6227[19], i6226.m_OnValueChanged)
  return i6226
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i6228 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i6229 = data
  i6228.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i6229[0], i6228.m_PersistentCalls)
  return i6228
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i6230 = root || request.c( 'UnityEngine.UI.Mask' )
  var i6231 = data
  i6230.m_ShowMaskGraphic = !!i6231[0]
  return i6230
}

Deserializers["UnityEngine.UI.Scrollbar"] = function (request, data, root) {
  var i6232 = root || request.c( 'UnityEngine.UI.Scrollbar' )
  var i6233 = data
  request.r(i6233[0], i6233[1], 0, i6232, 'm_HandleRect')
  i6232.m_Direction = i6233[2]
  i6232.m_Value = i6233[3]
  i6232.m_Size = i6233[4]
  i6232.m_NumberOfSteps = i6233[5]
  i6232.m_OnValueChanged = request.d('UnityEngine.UI.Scrollbar+ScrollEvent', i6233[6], i6232.m_OnValueChanged)
  i6232.m_Navigation = request.d('UnityEngine.UI.Navigation', i6233[7], i6232.m_Navigation)
  i6232.m_Transition = i6233[8]
  i6232.m_Colors = request.d('UnityEngine.UI.ColorBlock', i6233[9], i6232.m_Colors)
  i6232.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i6233[10], i6232.m_SpriteState)
  i6232.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i6233[11], i6232.m_AnimationTriggers)
  i6232.m_Interactable = !!i6233[12]
  request.r(i6233[13], i6233[14], 0, i6232, 'm_TargetGraphic')
  return i6232
}

Deserializers["UnityEngine.UI.Scrollbar+ScrollEvent"] = function (request, data, root) {
  var i6234 = root || request.c( 'UnityEngine.UI.Scrollbar+ScrollEvent' )
  var i6235 = data
  i6234.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i6235[0], i6234.m_PersistentCalls)
  return i6234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i6236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i6237 = data
  i6236.m_Alpha = i6237[0]
  i6236.m_Interactable = !!i6237[1]
  i6236.m_BlocksRaycasts = !!i6237[2]
  i6236.m_IgnoreParentGroups = !!i6237[3]
  i6236.enabled = !!i6237[4]
  return i6236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i6238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i6239 = data
  i6238.name = i6239[0]
  i6238.index = i6239[1]
  i6238.startup = !!i6239[2]
  return i6238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i6240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i6241 = data
  i6240.type = i6241[0]
  i6240.color = new pc.Color(i6241[1], i6241[2], i6241[3], i6241[4])
  i6240.cullingMask = i6241[5]
  i6240.intensity = i6241[6]
  i6240.range = i6241[7]
  i6240.spotAngle = i6241[8]
  i6240.shadows = i6241[9]
  i6240.shadowNormalBias = i6241[10]
  i6240.shadowBias = i6241[11]
  i6240.shadowStrength = i6241[12]
  i6240.shadowResolution = i6241[13]
  i6240.lightmapBakeType = i6241[14]
  i6240.renderMode = i6241[15]
  request.r(i6241[16], i6241[17], 0, i6240, 'cookie')
  i6240.cookieSize = i6241[18]
  i6240.shadowNearPlane = i6241[19]
  i6240.occlusionMaskChannel = i6241[20]
  i6240.isBaked = !!i6241[21]
  i6240.mixedLightingMode = i6241[22]
  i6240.enabled = !!i6241[23]
  return i6240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i6242 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i6243 = data
  request.r(i6243[0], i6243[1], 0, i6242, 'clip')
  request.r(i6243[2], i6243[3], 0, i6242, 'outputAudioMixerGroup')
  i6242.playOnAwake = !!i6243[4]
  i6242.loop = !!i6243[5]
  i6242.time = i6243[6]
  i6242.volume = i6243[7]
  i6242.pitch = i6243[8]
  i6242.enabled = !!i6243[9]
  return i6242
}

Deserializers["PlayableSpatialAudio"] = function (request, data, root) {
  var i6244 = root || request.c( 'PlayableSpatialAudio' )
  var i6245 = data
  request.r(i6245[0], i6245[1], 0, i6244, 'listener')
  request.r(i6245[2], i6245[3], 0, i6244, 'source')
  i6244.volume = i6245[4]
  i6244.minDistance = i6245[5]
  i6244.maxDistance = i6245[6]
  i6244.linear = !!i6245[7]
  return i6244
}

Deserializers["StealEggGame"] = function (request, data, root) {
  var i6246 = root || request.c( 'StealEggGame' )
  var i6247 = data
  var i6249 = i6247[0]
  var i6248 = []
  for(var i = 0; i < i6249.length; i += 1) {
    i6248.push( request.d('StealEggGame+PetInfo', i6249[i + 0]) );
  }
  i6246.petCatalog = i6248
  var i6251 = i6247[1]
  var i6250 = []
  for(var i = 0; i < i6251.length; i += 1) {
    i6250.push( request.d('StealEggGame+TrailInfo', i6251[i + 0]) );
  }
  i6246.trails = i6250
  var i6253 = i6247[2]
  var i6252 = []
  for(var i = 0; i < i6253.length; i += 1) {
    i6252.push( request.d('StealEggGame+BoostInfo', i6253[i + 0]) );
  }
  i6246.luckyEggRewards = i6252
  request.r(i6247[3], i6247[4], 0, i6246, 'playerHair')
  var i6255 = i6247[5]
  var i6254 = []
  for(var i = 0; i < i6255.length; i += 2) {
  request.r(i6255[i + 0], i6255[i + 1], 2, i6254, '')
  }
  i6246.outfitHairs = i6254
  var i6257 = i6247[6]
  var i6256 = []
  for(var i = 0; i < i6257.length; i += 2) {
  request.r(i6257[i + 0], i6257[i + 1], 2, i6256, '')
  }
  i6246.outfitFaces = i6256
  var i6259 = i6247[7]
  var i6258 = []
  for(var i = 0; i < i6259.length; i += 2) {
  request.r(i6259[i + 0], i6259[i + 1], 2, i6258, '')
  }
  i6246.outfitShirts = i6258
  var i6261 = i6247[8]
  var i6260 = []
  for(var i = 0; i < i6261.length; i += 2) {
  request.r(i6261[i + 0], i6261[i + 1], 2, i6260, '')
  }
  i6246.outfitPants = i6260
  var i6263 = i6247[9]
  var i6262 = []
  for(var i = 0; i < i6263.length; i += 2) {
  request.r(i6263[i + 0], i6263[i + 1], 2, i6262, '')
  }
  i6246.rarityMaterials = i6262
  var i6265 = i6247[10]
  var i6264 = []
  for(var i = 0; i < i6265.length; i += 2) {
  request.r(i6265[i + 0], i6265[i + 1], 2, i6264, '')
  }
  i6246.rarityWorldMaterials = i6264
  request.r(i6247[11], i6247[12], 0, i6246, 'rarityFont')
  var i6267 = i6247[13]
  var i6266 = []
  for(var i = 0; i < i6267.length; i += 2) {
  request.r(i6267[i + 0], i6267[i + 1], 2, i6266, '')
  }
  i6246.rarityFrames = i6266
  request.r(i6247[14], i6247[15], 0, i6246, 'batIcon')
  request.r(i6247[16], i6247[17], 0, i6246, 'nightIcon')
  request.r(i6247[18], i6247[19], 0, i6246, 'dayIcon')
  request.r(i6247[20], i6247[21], 0, i6246, 'trainBoostIcon')
  request.r(i6247[22], i6247[23], 0, i6246, 'incubateBoostIcon')
  request.r(i6247[24], i6247[25], 0, i6246, 'batPrefab')
  request.r(i6247[26], i6247[27], 0, i6246, 'luckyEggPrefab')
  request.r(i6247[28], i6247[29], 0, i6246, 'incubateTimerPrefab')
  request.r(i6247[30], i6247[31], 0, i6246, 'floatingTextPrefab')
  request.r(i6247[32], i6247[33], 0, i6246, 'npcTemplate')
  request.r(i6247[34], i6247[35], 0, i6246, 'footstepSound')
  request.r(i6247[36], i6247[37], 0, i6246, 'clickSound')
  request.r(i6247[38], i6247[39], 0, i6246, 'closeSound')
  request.r(i6247[40], i6247[41], 0, i6246, 'rewardSound')
  request.r(i6247[42], i6247[43], 0, i6246, 'upgradeSound')
  request.r(i6247[44], i6247[45], 0, i6246, 'trainSound')
  request.r(i6247[46], i6247[47], 0, i6246, 'equipSound')
  request.r(i6247[48], i6247[49], 0, i6246, 'fuseSound')
  request.r(i6247[50], i6247[51], 0, i6246, 'frogSound')
  request.r(i6247[52], i6247[53], 0, i6246, 'progressSound')
  request.r(i6247[54], i6247[55], 0, i6246, 'warningSound')
  request.r(i6247[56], i6247[57], 0, i6246, 'crackSound')
  request.r(i6247[58], i6247[59], 0, i6246, 'popupSound')
  i6246.coopPrices = i6247[60]
  i6246.coopModelByLevel = i6247[61]
  i6246.coopBaseSlots = i6247[62]
  i6246.treadmillPrices = i6247[63]
  i6246.treadmillTrainValues = i6247[64]
  i6246.priceMultiplier = i6247[65]
  i6246.dayDuration = i6247[66]
  i6246.nightDuration = i6247[67]
  i6246.nightIncubateMultiplier = i6247[68]
  i6246.dayLightIntensity = i6247[69]
  i6246.lightTransition = i6247[70]
  i6246.incomeMultiplierBySize = i6247[71]
  i6246.sellPriceMultiplier = i6247[72]
  i6246.luckyFrogFeedMultiplier = i6247[73]
  i6246.trainTick = i6247[74]
  i6246.hatchDuration = i6247[75]
  i6246.luckyEggOpenDuration = i6247[76]
  i6246.fuseDuration = i6247[77]
  i6246.npcCount = i6247[78]
  i6246.npcCoopSmallPets = i6247[79]
  i6246.npcCoopBigPetSize = i6247[80]
  i6246.npcMinSpeed = i6247[81]
  i6246.npcMaxSpeed = i6247[82]
  i6246.batCooldown = i6247[83]
  i6246.batForce = i6247[84]
  var i6269 = i6247[85]
  var i6268 = []
  for(var i = 0; i < i6269.length; i += 1) {
    i6268.push( request.d('StealEggGame+House', i6269[i + 0]) );
  }
  i6246.houses = i6268
  request.r(i6247[86], i6247[87], 0, i6246, 'fuseMachine')
  request.r(i6247[88], i6247[89], 0, i6246, 'exchangeShop')
  request.r(i6247[90], i6247[91], 0, i6246, 'luckyFrog')
  request.r(i6247[92], i6247[93], 0, i6246, 'luckyEggSpawn')
  request.r(i6247[94], i6247[95], 0, i6246, 'luckyEggTarget')
  request.r(i6247[96], i6247[97], 0, i6246, 'teleportPoint')
  request.r(i6247[98], i6247[99], 0, i6246, 'lobbyCenter')
  request.r(i6247[100], i6247[101], 0, i6246, 'originalUI')
  i6246.lobbySize = new pc.Vec3( i6247[102], i6247[103], i6247[104] )
  request.r(i6247[105], i6247[106], 0, i6246, 'combatArea')
  request.r(i6247[107], i6247[108], 0, i6246, 'nightGraphic')
  request.r(i6247[109], i6247[110], 0, i6246, 'nightText')
  request.r(i6247[111], i6247[112], 0, i6246, 'sun')
  var i6271 = i6247[113]
  var i6270 = []
  for(var i = 0; i < i6271.length; i += 2) {
  request.r(i6271[i + 0], i6271[i + 1], 2, i6270, '')
  }
  i6246.npcModels = i6270
  var i6273 = i6247[114]
  var i6272 = []
  for(var i = 0; i < i6273.length; i += 1) {
    i6272.push( request.d('StealEggGame+Zone', i6273[i + 0]) );
  }
  i6246.zones = i6272
  request.r(i6247[115], i6247[116], 0, i6246, 'player')
  request.r(i6247[117], i6247[118], 0, i6246, 'home')
  request.r(i6247[119], i6247[120], 0, i6246, 'safePoint')
  request.r(i6247[121], i6247[122], 0, i6246, 'rightHandSlot')
  request.r(i6247[123], i6247[124], 0, i6246, 'playerCoopArea')
  request.r(i6247[125], i6247[126], 0, i6246, 'trainingPoint')
  request.r(i6247[127], i6247[128], 0, i6246, 'gameCamera')
  request.r(i6247[129], i6247[130], 0, i6246, 'playerAnimator')
  request.r(i6247[131], i6247[132], 0, i6246, 'ragdoll')
  request.r(i6247[133], i6247[134], 0, i6246, 'uiFont')
  request.r(i6247[135], i6247[136], 0, i6246, 'guideMaterial')
  request.r(i6247[137], i6247[138], 0, i6246, 'roundedSprite')
  request.r(i6247[139], i6247[140], 0, i6246, 'circleSprite')
  request.r(i6247[141], i6247[142], 0, i6246, 'moneyIcon')
  request.r(i6247[143], i6247[144], 0, i6246, 'speedIcon')
  request.r(i6247[145], i6247[146], 0, i6246, 'stealSound')
  request.r(i6247[147], i6247[148], 0, i6246, 'deliverSound')
  request.r(i6247[149], i6247[150], 0, i6246, 'hatchSound')
  request.r(i6247[151], i6247[152], 0, i6246, 'caughtSound')
  request.r(i6247[153], i6247[154], 0, i6246, 'eggBreakEffect')
  request.r(i6247[155], i6247[156], 0, i6246, 'sourceHud')
  i6246.capturesForEndCard = i6247[157]
  i6246.moveSpeed = i6247[158]
  i6246.incubationSeconds = i6247[159]
  i6246.jumpHeight = i6247[160]
  i6246.gravity = i6247[161]
  i6246.baseMoveSpeed = i6247[162]
  i6246.speedPowerMultiplier = i6247[163]
  i6246.trainingPowerPerTick = i6247[164]
  i6246.startingMoney = i6247[165]
  i6246.slowMode = !!i6247[166]
  i6246.hitWindup = i6247[167]
  i6246.knockdownDuration = i6247[168]
  i6246.getUpDuration = i6247[169]
  request.r(i6247[170], i6247[171], 0, i6246, 'guide')
  i6246.hudUI = request.d('StealEggGame+HudUI', i6247[172], i6246.hudUI)
  i6246.petsUI = request.d('StealEggGame+PetsPopupUI', i6247[173], i6246.petsUI)
  i6246.incubateUI = request.d('StealEggGame+IncubatePopupUI', i6247[174], i6246.incubateUI)
  i6246.inventoryUI = request.d('StealEggGame+InventoryUI', i6247[175], i6246.inventoryUI)
  i6246.rewardUI = request.d('StealEggGame+RewardUI', i6247[176], i6246.rewardUI)
  i6246.dialogUI = request.d('StealEggGame+DialogUI', i6247[177], i6246.dialogUI)
  request.r(i6247[178], i6247[179], 0, i6246, 'warningPanel')
  i6246.treadmillUI = request.d('StealEggGame+TreadmillPanelUI', i6247[180], i6246.treadmillUI)
  i6246.indexUI = request.d('StealEggGame+IndexUI', i6247[181], i6246.indexUI)
  i6246.settingsUI = request.d('StealEggGame+LockedPanelUI', i6247[182], i6246.settingsUI)
  i6246.coopUI = request.d('StealEggGame+LockedPanelUI', i6247[183], i6246.coopUI)
  i6246.fuseUI = request.d('StealEggGame+LockedPanelUI', i6247[184], i6246.fuseUI)
  i6246.frogUI = request.d('StealEggGame+LockedPanelUI', i6247[185], i6246.frogUI)
  i6246.shopUI = request.d('StealEggGame+LockedPanelUI', i6247[186], i6246.shopUI)
  i6246.trailUI = request.d('StealEggGame+LockedPanelUI', i6247[187], i6246.trailUI)
  request.r(i6247[188], i6247[189], 0, i6246, 'jumpButton')
  request.r(i6247[190], i6247[191], 0, i6246, 'safeUI')
  request.r(i6247[192], i6247[193], 0, i6246, 'hintHand')
  request.r(i6247[194], i6247[195], 0, i6246, 'cameraHint')
  request.r(i6247[196], i6247[197], 0, i6246, 'jumpHint')
  request.r(i6247[198], i6247[199], 0, i6246, 'tutorialText')
  request.r(i6247[200], i6247[201], 0, i6246, 'joystick')
  return i6246
}

Deserializers["StealEggGame+PetInfo"] = function (request, data, root) {
  var i6276 = root || request.c( 'StealEggGame+PetInfo' )
  var i6277 = data
  i6276.name = i6277[0]
  i6276.rarity = i6277[1]
  i6276.zone = i6277[2]
  i6276.income = i6277[3]
  request.r(i6277[4], i6277[5], 0, i6276, 'thumbnail')
  request.r(i6277[6], i6277[7], 0, i6276, 'prefab')
  return i6276
}

Deserializers["StealEggGame+TrailInfo"] = function (request, data, root) {
  var i6280 = root || request.c( 'StealEggGame+TrailInfo' )
  var i6281 = data
  i6280.name = i6281[0]
  i6280.rarity = i6281[1]
  i6280.multiplier = i6281[2]
  i6280.price = i6281[3]
  request.r(i6281[4], i6281[5], 0, i6280, 'thumbnail')
  request.r(i6281[6], i6281[7], 0, i6280, 'frame')
  request.r(i6281[8], i6281[9], 0, i6280, 'prefab')
  return i6280
}

Deserializers["StealEggGame+BoostInfo"] = function (request, data, root) {
  var i6284 = root || request.c( 'StealEggGame+BoostInfo' )
  var i6285 = data
  i6284.name = i6285[0]
  i6284.type = i6285[1]
  i6284.value = i6285[2]
  i6284.duration = i6285[3]
  i6284.weight = i6285[4]
  request.r(i6285[5], i6285[6], 0, i6284, 'icon')
  return i6284
}

Deserializers["StealEggGame+House"] = function (request, data, root) {
  var i6290 = root || request.c( 'StealEggGame+House' )
  var i6291 = data
  request.r(i6291[0], i6291[1], 0, i6290, 'root')
  request.r(i6291[2], i6291[3], 0, i6290, 'coopPad')
  request.r(i6291[4], i6291[5], 0, i6290, 'treadmillPad')
  request.r(i6291[6], i6291[7], 0, i6290, 'petContainer')
  var i6293 = i6291[8]
  var i6292 = []
  for(var i = 0; i < i6293.length; i += 2) {
  request.r(i6293[i + 0], i6293[i + 1], 2, i6292, '')
  }
  i6290.coopModels = i6292
  var i6295 = i6291[9]
  var i6294 = []
  for(var i = 0; i < i6295.length; i += 2) {
  request.r(i6295[i + 0], i6295[i + 1], 2, i6294, '')
  }
  i6290.treadmills = i6294
  return i6290
}

Deserializers["StealEggGame+Zone"] = function (request, data, root) {
  var i6300 = root || request.c( 'StealEggGame+Zone' )
  var i6301 = data
  i6300.name = i6301[0]
  request.r(i6301[1], i6301[2], 0, i6300, 'root')
  request.r(i6301[3], i6301[4], 0, i6300, 'guardian')
  var i6303 = i6301[5]
  var i6302 = []
  for(var i = 0; i < i6303.length; i += 2) {
  request.r(i6303[i + 0], i6303[i + 1], 2, i6302, '')
  }
  i6300.nests = i6302
  var i6305 = i6301[6]
  var i6304 = []
  for(var i = 0; i < i6305.length; i += 2) {
  request.r(i6305[i + 0], i6305[i + 1], 2, i6304, '')
  }
  i6300.eggPrefabs = i6304
  var i6307 = i6301[7]
  var i6306 = []
  for(var i = 0; i < i6307.length; i += 2) {
  request.r(i6307[i + 0], i6307[i + 1], 2, i6306, '')
  }
  i6300.petPrefabs = i6306
  var i6309 = i6301[8]
  var i6308 = []
  for(var i = 0; i < i6309.length; i += 1) {
    i6308.push( request.d('PlayableEggRules', i6309[i + 0]) );
  }
  i6300.eggRules = i6308
  request.r(i6301[9], i6301[10], 0, i6300, 'bounds')
  request.r(i6301[11], i6301[12], 0, i6300, 'thumbnail')
  i6300.attackDistance = i6301[13]
  i6300.guardianSpeed = i6301[14]
  request.r(i6301[15], i6301[16], 0, i6300, 'sleepSound')
  request.r(i6301[17], i6301[18], 0, i6300, 'runSound')
  request.r(i6301[19], i6301[20], 0, i6300, 'catchSound')
  return i6300
}

Deserializers["PlayableEggRules"] = function (request, data, root) {
  var i6312 = root || request.c( 'PlayableEggRules' )
  var i6313 = data
  i6312.name = i6313[0]
  request.r(i6313[1], i6313[2], 0, i6312, 'thumbnail')
  i6312.petIds = i6313[3]
  i6312.spawnWeight = i6313[4]
  i6312.incubationTime = i6313[5]
  var i6315 = i6313[6]
  var i6314 = []
  for(var i = 0; i < i6315.length; i += 2) {
    i6314.push( new pc.Vec2( i6315[i + 0], i6315[i + 1] ) );
  }
  i6312.sizeRanges = i6314
  i6312.sizeWeights = i6313[7]
  var i6317 = i6313[8]
  var i6316 = []
  for(var i = 0; i < i6317.length; i += 2) {
  request.r(i6317[i + 0], i6317[i + 1], 2, i6316, '')
  }
  i6312.pets = i6316
  i6312.petWeights = i6313[9]
  i6312.petIncome = i6313[10]
  return i6312
}

Deserializers["StealEggGame+HudUI"] = function (request, data, root) {
  var i6320 = root || request.c( 'StealEggGame+HudUI' )
  var i6321 = data
  request.r(i6321[0], i6321[1], 0, i6320, 'functions')
  var i6323 = i6321[2]
  var i6322 = []
  for(var i = 0; i < i6323.length; i += 2) {
  request.r(i6323[i + 0], i6323[i + 1], 2, i6322, '')
  }
  i6320.actionButtons = i6322
  request.r(i6321[3], i6321[4], 0, i6320, 'incubateTapHint')
  request.r(i6321[5], i6321[6], 0, i6320, 'hatchTapHint')
  request.r(i6321[7], i6321[8], 0, i6320, 'equipTapHint')
  request.r(i6321[9], i6321[10], 0, i6320, 'trainTapHint')
  request.r(i6321[11], i6321[12], 0, i6320, 'attack')
  request.r(i6321[13], i6321[14], 0, i6320, 'settings')
  request.r(i6321[15], i6321[16], 0, i6320, 'trailShop')
  request.r(i6321[17], i6321[18], 0, i6320, 'index')
  request.r(i6321[19], i6321[20], 0, i6320, 'speedMode')
  request.r(i6321[21], i6321[22], 0, i6320, 'speedOn')
  request.r(i6321[23], i6321[24], 0, i6320, 'speedOff')
  request.r(i6321[25], i6321[26], 0, i6320, 'money')
  request.r(i6321[27], i6321[28], 0, i6320, 'speed')
  request.r(i6321[29], i6321[30], 0, i6320, 'time')
  request.r(i6321[31], i6321[32], 0, i6320, 'moneyIcon')
  request.r(i6321[33], i6321[34], 0, i6320, 'speedIcon')
  request.r(i6321[35], i6321[36], 0, i6320, 'timeIcon')
  request.r(i6321[37], i6321[38], 0, i6320, 'indexHighlight')
  request.r(i6321[39], i6321[40], 0, i6320, 'incubateHighlight')
  request.r(i6321[41], i6321[42], 0, i6320, 'right')
  request.r(i6321[43], i6321[44], 0, i6320, 'equipMonster')
  request.r(i6321[45], i6321[46], 0, i6320, 'incubateEgg')
  request.r(i6321[47], i6321[48], 0, i6320, 'boostContainer')
  request.r(i6321[49], i6321[50], 0, i6320, 'boostTemplate')
  request.r(i6321[51], i6321[52], 0, i6320, 'zoneBanner')
  request.r(i6321[53], i6321[54], 0, i6320, 'zoneFrame')
  request.r(i6321[55], i6321[56], 0, i6320, 'zoneName')
  request.r(i6321[57], i6321[58], 0, i6320, 'incomeTemplate')
  return i6320
}

Deserializers["StealEggGame+PetsPopupUI"] = function (request, data, root) {
  var i6324 = root || request.c( 'StealEggGame+PetsPopupUI' )
  var i6325 = data
  request.r(i6325[0], i6325[1], 0, i6324, 'root')
  request.r(i6325[2], i6325[3], 0, i6324, 'content')
  request.r(i6325[4], i6325[5], 0, i6324, 'template')
  request.r(i6325[6], i6325[7], 0, i6324, 'close')
  request.r(i6325[8], i6325[9], 0, i6324, 'equipBest')
  request.r(i6325[10], i6325[11], 0, i6324, 'upgradeSlot')
  request.r(i6325[12], i6325[13], 0, i6324, 'slots')
  request.r(i6325[14], i6325[15], 0, i6324, 'upgradePrice')
  request.r(i6325[16], i6325[17], 0, i6324, 'upgradeUnavailable')
  return i6324
}

Deserializers["StealEggGame+IncubatePopupUI"] = function (request, data, root) {
  var i6326 = root || request.c( 'StealEggGame+IncubatePopupUI' )
  var i6327 = data
  request.r(i6327[0], i6327[1], 0, i6326, 'root')
  request.r(i6327[2], i6327[3], 0, i6326, 'content')
  request.r(i6327[4], i6327[5], 0, i6326, 'template')
  request.r(i6327[6], i6327[7], 0, i6326, 'close')
  return i6326
}

Deserializers["StealEggGame+InventoryUI"] = function (request, data, root) {
  var i6328 = root || request.c( 'StealEggGame+InventoryUI' )
  var i6329 = data
  var i6331 = i6329[0]
  var i6330 = []
  for(var i = 0; i < i6331.length; i += 2) {
  request.r(i6331[i + 0], i6331[i + 1], 2, i6330, '')
  }
  i6328.quickSlots = i6330
  request.r(i6329[1], i6329[2], 0, i6328, 'bag')
  request.r(i6329[3], i6329[4], 0, i6328, 'bagClose')
  request.r(i6329[5], i6329[6], 0, i6328, 'bagPopup')
  request.r(i6329[7], i6329[8], 0, i6328, 'bagContent')
  request.r(i6329[9], i6329[10], 0, i6328, 'bagTemplate')
  request.r(i6329[11], i6329[12], 0, i6328, 'petInfo')
  request.r(i6329[13], i6329[14], 0, i6328, 'petThumbnail')
  request.r(i6329[15], i6329[16], 0, i6328, 'petName')
  request.r(i6329[17], i6329[18], 0, i6328, 'petIncome')
  request.r(i6329[19], i6329[20], 0, i6328, 'petRarity')
  request.r(i6329[21], i6329[22], 0, i6328, 'petEquip')
  request.r(i6329[23], i6329[24], 0, i6328, 'petDrop')
  request.r(i6329[25], i6329[26], 0, i6328, 'eggInfo')
  request.r(i6329[27], i6329[28], 0, i6328, 'eggThumbnail')
  request.r(i6329[29], i6329[30], 0, i6328, 'eggName')
  request.r(i6329[31], i6329[32], 0, i6328, 'eggWeight')
  request.r(i6329[33], i6329[34], 0, i6328, 'eggIncubate')
  request.r(i6329[35], i6329[36], 0, i6328, 'eggDrop')
  return i6328
}

Deserializers["StealEggGame+RewardUI"] = function (request, data, root) {
  var i6334 = root || request.c( 'StealEggGame+RewardUI' )
  var i6335 = data
  request.r(i6335[0], i6335[1], 0, i6334, 'root')
  request.r(i6335[2], i6335[3], 0, i6334, 'title')
  request.r(i6335[4], i6335[5], 0, i6334, 'content')
  request.r(i6335[6], i6335[7], 0, i6334, 'template')
  request.r(i6335[8], i6335[9], 0, i6334, 'close')
  request.r(i6335[10], i6335[11], 0, i6334, 'tapToClose')
  return i6334
}

Deserializers["StealEggGame+DialogUI"] = function (request, data, root) {
  var i6336 = root || request.c( 'StealEggGame+DialogUI' )
  var i6337 = data
  request.r(i6337[0], i6337[1], 0, i6336, 'root')
  request.r(i6337[2], i6337[3], 0, i6336, 'message')
  return i6336
}

Deserializers["StealEggGame+TreadmillPanelUI"] = function (request, data, root) {
  var i6338 = root || request.c( 'StealEggGame+TreadmillPanelUI' )
  var i6339 = data
  request.r(i6339[0], i6339[1], 0, i6338, 'root')
  request.r(i6339[2], i6339[3], 0, i6338, 'close')
  request.r(i6339[4], i6339[5], 0, i6338, 'upgrade')
  request.r(i6339[6], i6339[7], 0, i6338, 'level')
  request.r(i6339[8], i6339[9], 0, i6338, 'train')
  request.r(i6339[10], i6339[11], 0, i6338, 'price')
  request.r(i6339[12], i6339[13], 0, i6338, 'max')
  return i6338
}

Deserializers["StealEggGame+IndexUI"] = function (request, data, root) {
  var i6340 = root || request.c( 'StealEggGame+IndexUI' )
  var i6341 = data
  request.r(i6341[0], i6341[1], 0, i6340, 'root')
  request.r(i6341[2], i6341[3], 0, i6340, 'close')
  request.r(i6341[4], i6341[5], 0, i6340, 'claim')
  request.r(i6341[6], i6341[7], 0, i6340, 'zones')
  request.r(i6341[8], i6341[9], 0, i6340, 'zoneTemplate')
  request.r(i6341[10], i6341[11], 0, i6340, 'lockedZone')
  request.r(i6341[12], i6341[13], 0, i6340, 'progressFill')
  request.r(i6341[14], i6341[15], 0, i6340, 'progress')
  request.r(i6341[16], i6341[17], 0, i6340, 'information')
  request.r(i6341[18], i6341[19], 0, i6340, 'rewardFrame')
  request.r(i6341[20], i6341[21], 0, i6340, 'claimed')
  request.r(i6341[22], i6341[23], 0, i6340, 'infoImage')
  request.r(i6341[24], i6341[25], 0, i6340, 'infoName')
  request.r(i6341[26], i6341[27], 0, i6340, 'infoIncome')
  request.r(i6341[28], i6341[29], 0, i6340, 'infoRarity')
  request.r(i6341[30], i6341[31], 0, i6340, 'rewardContent')
  request.r(i6341[32], i6341[33], 0, i6340, 'rewardTemplate')
  return i6340
}

Deserializers["StealEggGame+LockedPanelUI"] = function (request, data, root) {
  var i6342 = root || request.c( 'StealEggGame+LockedPanelUI' )
  var i6343 = data
  request.r(i6343[0], i6343[1], 0, i6342, 'root')
  request.r(i6343[2], i6343[3], 0, i6342, 'close')
  return i6342
}

Deserializers["PlayableRagdoll"] = function (request, data, root) {
  var i6344 = root || request.c( 'PlayableRagdoll' )
  var i6345 = data
  request.r(i6345[0], i6345[1], 0, i6344, 'player')
  request.r(i6345[2], i6345[3], 0, i6344, 'animator')
  request.r(i6345[4], i6345[5], 0, i6344, 'hips')
  var i6347 = i6345[6]
  var i6346 = []
  for(var i = 0; i < i6347.length; i += 2) {
  request.r(i6347[i + 0], i6347[i + 1], 2, i6346, '')
  }
  i6344.bodies = i6346
  var i6349 = i6345[7]
  var i6348 = []
  for(var i = 0; i < i6349.length; i += 2) {
  request.r(i6349[i + 0], i6349[i + 1], 2, i6348, '')
  }
  i6344.bodyColliders = i6348
  return i6344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i6354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i6355 = data
  i6354.textureMode = i6355[0]
  i6354.alignment = i6355[1]
  i6354.widthCurve = new pc.AnimationCurve( { keys_flow: i6355[2] } )
  i6354.colorGradient = i6355[3] ? new pc.ColorGradient(i6355[3][0], i6355[3][1], i6355[3][2]) : null
  var i6357 = i6355[4]
  var i6356 = []
  for(var i = 0; i < i6357.length; i += 3) {
    i6356.push( new pc.Vec3( i6357[i + 0], i6357[i + 1], i6357[i + 2] ) );
  }
  i6354.positions = i6356
  i6354.positionCount = i6355[5]
  i6354.widthMultiplier = i6355[6]
  i6354.startWidth = i6355[7]
  i6354.endWidth = i6355[8]
  i6354.numCornerVertices = i6355[9]
  i6354.numCapVertices = i6355[10]
  i6354.useWorldSpace = !!i6355[11]
  i6354.loop = !!i6355[12]
  i6354.startColor = new pc.Color(i6355[13], i6355[14], i6355[15], i6355[16])
  i6354.endColor = new pc.Color(i6355[17], i6355[18], i6355[19], i6355[20])
  i6354.generateLightingData = !!i6355[21]
  i6354.enabled = !!i6355[22]
  request.r(i6355[23], i6355[24], 0, i6354, 'sharedMaterial')
  var i6359 = i6355[25]
  var i6358 = []
  for(var i = 0; i < i6359.length; i += 2) {
  request.r(i6359[i + 0], i6359[i + 1], 2, i6358, '')
  }
  i6354.sharedMaterials = i6358
  i6354.receiveShadows = !!i6355[26]
  i6354.shadowCastingMode = i6355[27]
  i6354.sortingLayerID = i6355[28]
  i6354.sortingOrder = i6355[29]
  i6354.lightmapIndex = i6355[30]
  i6354.lightmapSceneIndex = i6355[31]
  i6354.lightmapScaleOffset = new pc.Vec4( i6355[32], i6355[33], i6355[34], i6355[35] )
  i6354.lightProbeUsage = i6355[36]
  i6354.reflectionProbeUsage = i6355[37]
  return i6354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i6360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i6361 = data
  i6360.enabled = !!i6361[0]
  i6360.center = new pc.Vec3( i6361[1], i6361[2], i6361[3] )
  i6360.radius = i6361[4]
  i6360.height = i6361[5]
  i6360.minMoveDistance = i6361[6]
  i6360.skinWidth = i6361[7]
  i6360.enableOverlapRecovery = !!i6361[8]
  return i6360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i6362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i6363 = data
  i6362.swingAxis = new pc.Vec3( i6363[0], i6363[1], i6363[2] )
  i6362.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i6363[3], i6362.twistLimitSpring)
  i6362.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i6363[4], i6362.swingLimitSpring)
  i6362.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i6363[5], i6362.lowTwistLimit)
  i6362.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i6363[6], i6362.highTwistLimit)
  i6362.swing1Limit = request.d('UnityEngine.SoftJointLimit', i6363[7], i6362.swing1Limit)
  i6362.swing2Limit = request.d('UnityEngine.SoftJointLimit', i6363[8], i6362.swing2Limit)
  request.r(i6363[9], i6363[10], 0, i6362, 'connectedBody')
  i6362.axis = new pc.Vec3( i6363[11], i6363[12], i6363[13] )
  i6362.anchor = new pc.Vec3( i6363[14], i6363[15], i6363[16] )
  i6362.connectedAnchor = new pc.Vec3( i6363[17], i6363[18], i6363[19] )
  i6362.autoConfigureConnectedAnchor = !!i6363[20]
  i6362.massScale = i6363[21]
  i6362.connectedMassScale = i6363[22]
  i6362.enableCollision = !!i6363[23]
  i6362.breakForce = i6363[24]
  i6362.breakTorque = i6363[25]
  return i6362
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i6364 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i6365 = data
  request.r(i6365[0], i6365[1], 0, i6364, 'm_FirstSelected')
  i6364.m_sendNavigationEvents = !!i6365[2]
  i6364.m_DragThreshold = i6365[3]
  return i6364
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i6366 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i6367 = data
  i6366.m_HorizontalAxis = i6367[0]
  i6366.m_VerticalAxis = i6367[1]
  i6366.m_SubmitButton = i6367[2]
  i6366.m_CancelButton = i6367[3]
  i6366.m_InputActionsPerSecond = i6367[4]
  i6366.m_RepeatDelay = i6367[5]
  i6366.m_ForceModuleActive = !!i6367[6]
  i6366.m_SendPointerHoverToParent = !!i6367[7]
  return i6366
}

Deserializers["PlayableCameraDrag"] = function (request, data, root) {
  var i6368 = root || request.c( 'PlayableCameraDrag' )
  var i6369 = data
  request.r(i6369[0], i6369[1], 0, i6368, 'cameraController')
  return i6368
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i6370 = root || request.c( 'PlayableJoystick' )
  var i6371 = data
  request.r(i6371[0], i6371[1], 0, i6370, 'knob')
  return i6370
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i6372 = root || request.c( 'UnityEngine.UI.Outline' )
  var i6373 = data
  i6372.m_EffectColor = new pc.Color(i6373[0], i6373[1], i6373[2], i6373[3])
  i6372.m_EffectDistance = new pc.Vec2( i6373[4], i6373[5] )
  i6372.m_UseGraphicAlpha = !!i6373[6]
  return i6372
}

Deserializers["TapHintView"] = function (request, data, root) {
  var i6374 = root || request.c( 'TapHintView' )
  var i6375 = data
  request.r(i6375[0], i6375[1], 0, i6374, 'hand')
  request.r(i6375[2], i6375[3], 0, i6374, 'shine')
  request.r(i6375[4], i6375[5], 0, i6374, 'shineGraphic')
  return i6374
}

Deserializers["LunaController"] = function (request, data, root) {
  var i6376 = root || request.c( 'LunaController' )
  var i6377 = data
  i6376.LimitTimePlay = !!i6377[0]
  i6376.TimePlay = i6377[1]
  request.r(i6377[2], i6377[3], 0, i6376, 'BGM')
  i6376.LimitCountClick = !!i6377[4]
  i6376.MaxCountClick = i6377[5]
  i6376.LimitCountIncubate = !!i6377[6]
  i6376.MaxCountIncubate = i6377[7]
  i6376.LimitCountHatch = !!i6377[8]
  i6376.MaxCountHatch = i6377[9]
  i6376.IAPVersion = i6377[10]
  i6376.IAPDistance = i6377[11]
  request.r(i6377[12], i6377[13], 0, i6376, 'musicSource')
  var i6379 = i6377[14]
  var i6378 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i6379.length; i += 2) {
  request.r(i6379[i + 0], i6379[i + 1], 1, i6378, '')
  }
  i6376.CTA = i6378
  request.r(i6377[15], i6377[16], 0, i6376, 'endCard')
  request.r(i6377[17], i6377[18], 0, i6376, 'iapPopup')
  return i6376
}

Deserializers["IconAmountView"] = function (request, data, root) {
  var i6382 = root || request.c( 'IconAmountView' )
  var i6383 = data
  request.r(i6383[0], i6383[1], 0, i6382, 'icon')
  request.r(i6383[2], i6383[3], 0, i6382, 'amount')
  return i6382
}

Deserializers["PlayableHoldButton"] = function (request, data, root) {
  var i6384 = root || request.c( 'PlayableHoldButton' )
  var i6385 = data
  i6384.duration = i6385[0]
  request.r(i6385[1], i6385[2], 0, i6384, 'fill')
  i6384.onHold = request.d('System.Action', i6385[3], i6384.onHold)
  return i6384
}

Deserializers["System.Action"] = function (request, data, root) {
  var i6386 = root || request.c( 'System.Action' )
  var i6387 = data
  return i6386
}

Deserializers["PetRowView"] = function (request, data, root) {
  var i6388 = root || request.c( 'PetRowView' )
  var i6389 = data
  request.r(i6389[0], i6389[1], 0, i6388, 'content')
  request.r(i6389[2], i6389[3], 0, i6388, 'thumbnail')
  request.r(i6389[4], i6389[5], 0, i6388, 'unequip')
  return i6388
}

Deserializers["IncubateRowView"] = function (request, data, root) {
  var i6390 = root || request.c( 'IncubateRowView' )
  var i6391 = data
  request.r(i6391[0], i6391[1], 0, i6390, 'thumbnail')
  request.r(i6391[2], i6391[3], 0, i6390, 'progressFill')
  request.r(i6391[4], i6391[5], 0, i6390, 'content')
  request.r(i6391[6], i6391[7], 0, i6390, 'open')
  request.r(i6391[8], i6391[9], 0, i6390, 'opening')
  return i6390
}

Deserializers["BagCellView"] = function (request, data, root) {
  var i6392 = root || request.c( 'BagCellView' )
  var i6393 = data
  request.r(i6393[0], i6393[1], 0, i6392, 'button')
  request.r(i6393[2], i6393[3], 0, i6392, 'thumbnail')
  request.r(i6393[4], i6393[5], 0, i6392, 'highlight')
  request.r(i6393[6], i6393[7], 0, i6392, 'exposeMark')
  request.r(i6393[8], i6393[9], 0, i6392, 'amount')
  return i6392
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i6394 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i6395 = data
  i6394.m_Spacing = i6395[0]
  i6394.m_ChildForceExpandWidth = !!i6395[1]
  i6394.m_ChildForceExpandHeight = !!i6395[2]
  i6394.m_ChildControlWidth = !!i6395[3]
  i6394.m_ChildControlHeight = !!i6395[4]
  i6394.m_ChildScaleWidth = !!i6395[5]
  i6394.m_ChildScaleHeight = !!i6395[6]
  i6394.m_ReverseArrangement = !!i6395[7]
  i6394.m_Padding = UnityEngine.RectOffset.FromPaddings(i6395[8], i6395[9], i6395[10], i6395[11])
  i6394.m_ChildAlignment = i6395[12]
  return i6394
}

Deserializers["QuickSlotView"] = function (request, data, root) {
  var i6396 = root || request.c( 'QuickSlotView' )
  var i6397 = data
  request.r(i6397[0], i6397[1], 0, i6396, 'button')
  request.r(i6397[2], i6397[3], 0, i6396, 'thumbnail')
  request.r(i6397[4], i6397[5], 0, i6396, 'highlight')
  request.r(i6397[6], i6397[7], 0, i6396, 'content')
  return i6396
}

Deserializers["IndexZoneView"] = function (request, data, root) {
  var i6398 = root || request.c( 'IndexZoneView' )
  var i6399 = data
  request.r(i6399[0], i6399[1], 0, i6398, 'zoneName')
  request.r(i6399[2], i6399[3], 0, i6398, 'progress')
  request.r(i6399[4], i6399[5], 0, i6398, 'thumbnail')
  request.r(i6399[6], i6399[7], 0, i6398, 'progressFill')
  request.r(i6399[8], i6399[9], 0, i6398, 'petContent')
  request.r(i6399[10], i6399[11], 0, i6398, 'petTemplate')
  return i6398
}

Deserializers["IndexPetCellView"] = function (request, data, root) {
  var i6400 = root || request.c( 'IndexPetCellView' )
  var i6401 = data
  request.r(i6401[0], i6401[1], 0, i6400, 'button')
  request.r(i6401[2], i6401[3], 0, i6400, 'frame')
  request.r(i6401[4], i6401[5], 0, i6400, 'thumbnail')
  request.r(i6401[6], i6401[7], 0, i6400, 'petName')
  request.r(i6401[8], i6401[9], 0, i6400, 'selected')
  request.r(i6401[10], i6401[11], 0, i6400, 'mark')
  return i6400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i6402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i6403 = data
  i6402.aspect = i6403[0]
  i6402.orthographic = !!i6403[1]
  i6402.orthographicSize = i6403[2]
  i6402.backgroundColor = new pc.Color(i6403[3], i6403[4], i6403[5], i6403[6])
  i6402.nearClipPlane = i6403[7]
  i6402.farClipPlane = i6403[8]
  i6402.fieldOfView = i6403[9]
  i6402.depth = i6403[10]
  i6402.clearFlags = i6403[11]
  i6402.cullingMask = i6403[12]
  i6402.rect = i6403[13]
  request.r(i6403[14], i6403[15], 0, i6402, 'targetTexture')
  i6402.usePhysicalProperties = !!i6403[16]
  i6402.focalLength = i6403[17]
  i6402.sensorSize = new pc.Vec2( i6403[18], i6403[19] )
  i6402.lensShift = new pc.Vec2( i6403[20], i6403[21] )
  i6402.gateFit = i6403[22]
  i6402.commandBufferCount = i6403[23]
  i6402.cameraType = i6403[24]
  i6402.enabled = !!i6403[25]
  return i6402
}

Deserializers["CameraController"] = function (request, data, root) {
  var i6404 = root || request.c( 'CameraController' )
  var i6405 = data
  request.r(i6405[0], i6405[1], 0, i6404, 'target')
  request.r(i6405[2], i6405[3], 0, i6404, 'controlledCamera')
  request.r(i6405[4], i6405[5], 0, i6404, 'cameraManager')
  request.r(i6405[6], i6405[7], 0, i6404, 'game')
  i6404.distance = i6405[8]
  i6404.initialVerticalAngle = i6405[9]
  i6404.initialHorizontalAngle = i6405[10]
  return i6404
}

Deserializers["IAPPopupView"] = function (request, data, root) {
  var i6406 = root || request.c( 'IAPPopupView' )
  var i6407 = data
  request.r(i6407[0], i6407[1], 0, i6406, 'buy10')
  request.r(i6407[2], i6407[3], 0, i6406, 'buy1')
  request.r(i6407[4], i6407[5], 0, i6406, 'label10')
  request.r(i6407[6], i6407[7], 0, i6406, 'label1')
  request.r(i6407[8], i6407[9], 0, i6406, 'caption10')
  request.r(i6407[10], i6407[11], 0, i6406, 'caption1')
  request.r(i6407[12], i6407[13], 0, i6406, 'hint10')
  request.r(i6407[14], i6407[15], 0, i6406, 'hint1')
  i6406.price10 = i6407[16]
  i6406.price1 = i6407[17]
  i6406.eggs10 = i6407[18]
  i6406.eggs1 = i6407[19]
  request.r(i6407[20], i6407[21], 0, i6406, 'sound')
  request.r(i6407[22], i6407[23], 0, i6406, 'openSound')
  request.r(i6407[24], i6407[25], 0, i6406, 'clickSound')
  return i6406
}

Deserializers["PlayableUISparkle"] = function (request, data, root) {
  var i6408 = root || request.c( 'PlayableUISparkle' )
  var i6409 = data
  var i6411 = i6409[0]
  var i6410 = []
  for(var i = 0; i < i6411.length; i += 2) {
  request.r(i6411[i + 0], i6411[i + 1], 2, i6410, '')
  }
  i6408.stars = i6410
  var i6413 = i6409[1]
  var i6412 = []
  for(var i = 0; i < i6413.length; i += 2) {
  request.r(i6413[i + 0], i6413[i + 1], 2, i6412, '')
  }
  i6408.rays = i6412
  i6408.color = new pc.Color(i6409[2], i6409[3], i6409[4], i6409[5])
  i6408.radius = i6409[6]
  i6408.minSize = i6409[7]
  i6408.maxSize = i6409[8]
  i6408.minLife = i6409[9]
  i6408.maxLife = i6409[10]
  i6408.spin = i6409[11]
  i6408.rayLife = i6409[12]
  i6408.raySize = i6409[13]
  return i6408
}

Deserializers["PlayableImageCycle"] = function (request, data, root) {
  var i6416 = root || request.c( 'PlayableImageCycle' )
  var i6417 = data
  request.r(i6417[0], i6417[1], 0, i6416, 'image')
  i6416.transitionDuration = i6417[2]
  i6416.showDuration = i6417[3]
  var i6419 = i6417[4]
  var i6418 = []
  for(var i = 0; i < i6419.length; i += 2) {
  request.r(i6419[i + 0], i6419[i + 1], 2, i6418, '')
  }
  i6416.sprites = i6418
  return i6416
}

Deserializers["PlayableUIPulse"] = function (request, data, root) {
  var i6420 = root || request.c( 'PlayableUIPulse' )
  var i6421 = data
  i6420.scale = i6421[0]
  i6420.duration = i6421[1]
  return i6420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i6422 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i6423 = data
  i6422.ambientIntensity = i6423[0]
  i6422.reflectionIntensity = i6423[1]
  i6422.ambientMode = i6423[2]
  i6422.ambientLight = new pc.Color(i6423[3], i6423[4], i6423[5], i6423[6])
  i6422.ambientSkyColor = new pc.Color(i6423[7], i6423[8], i6423[9], i6423[10])
  i6422.ambientGroundColor = new pc.Color(i6423[11], i6423[12], i6423[13], i6423[14])
  i6422.ambientEquatorColor = new pc.Color(i6423[15], i6423[16], i6423[17], i6423[18])
  i6422.fogColor = new pc.Color(i6423[19], i6423[20], i6423[21], i6423[22])
  i6422.fogEndDistance = i6423[23]
  i6422.fogStartDistance = i6423[24]
  i6422.fogDensity = i6423[25]
  i6422.fog = !!i6423[26]
  request.r(i6423[27], i6423[28], 0, i6422, 'skybox')
  i6422.fogMode = i6423[29]
  var i6425 = i6423[30]
  var i6424 = []
  for(var i = 0; i < i6425.length; i += 1) {
    i6424.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i6425[i + 0]) );
  }
  i6422.lightmaps = i6424
  i6422.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i6423[31], i6422.lightProbes)
  i6422.lightmapsMode = i6423[32]
  i6422.mixedBakeMode = i6423[33]
  i6422.environmentLightingMode = i6423[34]
  i6422.ambientProbe = new pc.SphericalHarmonicsL2(i6423[35])
  request.r(i6423[36], i6423[37], 0, i6422, 'customReflection')
  request.r(i6423[38], i6423[39], 0, i6422, 'defaultReflection')
  i6422.defaultReflectionMode = i6423[40]
  i6422.defaultReflectionResolution = i6423[41]
  i6422.sunLightObjectId = i6423[42]
  i6422.pixelLightCount = i6423[43]
  i6422.defaultReflectionHDR = !!i6423[44]
  i6422.hasLightDataAsset = !!i6423[45]
  i6422.hasManualGenerate = !!i6423[46]
  return i6422
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i6428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i6429 = data
  request.r(i6429[0], i6429[1], 0, i6428, 'lightmapColor')
  request.r(i6429[2], i6429[3], 0, i6428, 'lightmapDirection')
  request.r(i6429[4], i6429[5], 0, i6428, 'shadowMask')
  return i6428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i6430 = root || new UnityEngine.LightProbes()
  var i6431 = data
  return i6430
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i6436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i6437 = data
  var i6439 = i6437[0]
  var i6438 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i6439.length; i += 1) {
    i6438.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i6439[i + 0]));
  }
  i6436.ShaderCompilationErrors = i6438
  i6436.name = i6437[1]
  i6436.guid = i6437[2]
  var i6441 = i6437[3]
  var i6440 = []
  for(var i = 0; i < i6441.length; i += 1) {
    i6440.push( i6441[i + 0] );
  }
  i6436.shaderDefinedKeywords = i6440
  var i6443 = i6437[4]
  var i6442 = []
  for(var i = 0; i < i6443.length; i += 1) {
    i6442.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i6443[i + 0]) );
  }
  i6436.passes = i6442
  var i6445 = i6437[5]
  var i6444 = []
  for(var i = 0; i < i6445.length; i += 1) {
    i6444.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i6445[i + 0]) );
  }
  i6436.usePasses = i6444
  var i6447 = i6437[6]
  var i6446 = []
  for(var i = 0; i < i6447.length; i += 1) {
    i6446.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i6447[i + 0]) );
  }
  i6436.defaultParameterValues = i6446
  request.r(i6437[7], i6437[8], 0, i6436, 'unityFallbackShader')
  i6436.readDepth = !!i6437[9]
  i6436.hasDepthOnlyPass = !!i6437[10]
  i6436.isCreatedByShaderGraph = !!i6437[11]
  i6436.disableBatching = !!i6437[12]
  i6436.compiled = !!i6437[13]
  return i6436
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i6450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i6451 = data
  i6450.shaderName = i6451[0]
  i6450.errorMessage = i6451[1]
  return i6450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i6456 = root || new pc.UnityShaderPass()
  var i6457 = data
  i6456.id = i6457[0]
  i6456.subShaderIndex = i6457[1]
  i6456.name = i6457[2]
  i6456.passType = i6457[3]
  i6456.grabPassTextureName = i6457[4]
  i6456.usePass = !!i6457[5]
  i6456.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[6], i6456.zTest)
  i6456.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[7], i6456.zWrite)
  i6456.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[8], i6456.culling)
  i6456.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i6457[9], i6456.blending)
  i6456.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i6457[10], i6456.alphaBlending)
  i6456.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[11], i6456.colorWriteMask)
  i6456.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[12], i6456.offsetUnits)
  i6456.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[13], i6456.offsetFactor)
  i6456.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[14], i6456.stencilRef)
  i6456.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[15], i6456.stencilReadMask)
  i6456.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6457[16], i6456.stencilWriteMask)
  i6456.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6457[17], i6456.stencilOp)
  i6456.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6457[18], i6456.stencilOpFront)
  i6456.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6457[19], i6456.stencilOpBack)
  var i6459 = i6457[20]
  var i6458 = []
  for(var i = 0; i < i6459.length; i += 1) {
    i6458.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i6459[i + 0]) );
  }
  i6456.tags = i6458
  var i6461 = i6457[21]
  var i6460 = []
  for(var i = 0; i < i6461.length; i += 1) {
    i6460.push( i6461[i + 0] );
  }
  i6456.passDefinedKeywords = i6460
  var i6463 = i6457[22]
  var i6462 = []
  for(var i = 0; i < i6463.length; i += 1) {
    i6462.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i6463[i + 0]) );
  }
  i6456.passDefinedKeywordGroups = i6462
  var i6465 = i6457[23]
  var i6464 = []
  for(var i = 0; i < i6465.length; i += 1) {
    i6464.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i6465[i + 0]) );
  }
  i6456.variants = i6464
  var i6467 = i6457[24]
  var i6466 = []
  for(var i = 0; i < i6467.length; i += 1) {
    i6466.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i6467[i + 0]) );
  }
  i6456.excludedVariants = i6466
  i6456.hasDepthReader = !!i6457[25]
  return i6456
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i6468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i6469 = data
  i6468.val = i6469[0]
  i6468.name = i6469[1]
  return i6468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i6470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i6471 = data
  i6470.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6471[0], i6470.src)
  i6470.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6471[1], i6470.dst)
  i6470.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6471[2], i6470.op)
  return i6470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i6472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i6473 = data
  i6472.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6473[0], i6472.pass)
  i6472.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6473[1], i6472.fail)
  i6472.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6473[2], i6472.zFail)
  i6472.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6473[3], i6472.comp)
  return i6472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i6476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i6477 = data
  i6476.name = i6477[0]
  i6476.value = i6477[1]
  return i6476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i6480 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i6481 = data
  var i6483 = i6481[0]
  var i6482 = []
  for(var i = 0; i < i6483.length; i += 1) {
    i6482.push( i6483[i + 0] );
  }
  i6480.keywords = i6482
  i6480.hasDiscard = !!i6481[1]
  return i6480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i6486 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i6487 = data
  i6486.passId = i6487[0]
  i6486.subShaderIndex = i6487[1]
  var i6489 = i6487[2]
  var i6488 = []
  for(var i = 0; i < i6489.length; i += 1) {
    i6488.push( i6489[i + 0] );
  }
  i6486.keywords = i6488
  i6486.vertexProgram = i6487[3]
  i6486.fragmentProgram = i6487[4]
  i6486.exportedForWebGl2 = !!i6487[5]
  i6486.readDepth = !!i6487[6]
  return i6486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i6492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i6493 = data
  request.r(i6493[0], i6493[1], 0, i6492, 'shader')
  i6492.pass = i6493[2]
  return i6492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i6496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i6497 = data
  i6496.name = i6497[0]
  i6496.type = i6497[1]
  i6496.value = new pc.Vec4( i6497[2], i6497[3], i6497[4], i6497[5] )
  i6496.textureValue = i6497[6]
  i6496.shaderPropertyFlag = i6497[7]
  return i6496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i6498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i6499 = data
  i6498.name = i6499[0]
  request.r(i6499[1], i6499[2], 0, i6498, 'texture')
  i6498.aabb = i6499[3]
  i6498.vertices = i6499[4]
  i6498.triangles = i6499[5]
  i6498.textureRect = UnityEngine.Rect.MinMaxRect(i6499[6], i6499[7], i6499[8], i6499[9])
  i6498.packedRect = UnityEngine.Rect.MinMaxRect(i6499[10], i6499[11], i6499[12], i6499[13])
  i6498.border = new pc.Vec4( i6499[14], i6499[15], i6499[16], i6499[17] )
  i6498.transparency = i6499[18]
  i6498.bounds = i6499[19]
  i6498.pixelsPerUnit = i6499[20]
  i6498.textureWidth = i6499[21]
  i6498.textureHeight = i6499[22]
  i6498.nativeSize = new pc.Vec2( i6499[23], i6499[24] )
  i6498.pivot = new pc.Vec2( i6499[25], i6499[26] )
  i6498.textureRectOffset = new pc.Vec2( i6499[27], i6499[28] )
  return i6498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i6500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i6501 = data
  i6500.name = i6501[0]
  return i6500
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i6502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i6503 = data
  i6502.name = i6503[0]
  i6502.wrapMode = i6503[1]
  i6502.isLooping = !!i6503[2]
  i6502.length = i6503[3]
  var i6505 = i6503[4]
  var i6504 = []
  for(var i = 0; i < i6505.length; i += 1) {
    i6504.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i6505[i + 0]) );
  }
  i6502.curves = i6504
  var i6507 = i6503[5]
  var i6506 = []
  for(var i = 0; i < i6507.length; i += 1) {
    i6506.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i6507[i + 0]) );
  }
  i6502.events = i6506
  i6502.halfPrecision = !!i6503[6]
  i6502._frameRate = i6503[7]
  i6502.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i6503[8], i6502.localBounds)
  i6502.hasMuscleCurves = !!i6503[9]
  var i6509 = i6503[10]
  var i6508 = []
  for(var i = 0; i < i6509.length; i += 1) {
    i6508.push( i6509[i + 0] );
  }
  i6502.clipMuscleConstant = i6508
  i6502.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i6503[11], i6502.clipBindingConstant)
  return i6502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i6512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i6513 = data
  i6512.path = i6513[0]
  i6512.hash = i6513[1]
  i6512.componentType = i6513[2]
  i6512.property = i6513[3]
  i6512.keys = i6513[4]
  var i6515 = i6513[5]
  var i6514 = []
  for(var i = 0; i < i6515.length; i += 1) {
    i6514.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i6515[i + 0]) );
  }
  i6512.objectReferenceKeys = i6514
  return i6512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i6518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i6519 = data
  i6518.time = i6519[0]
  request.r(i6519[1], i6519[2], 0, i6518, 'value')
  return i6518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i6522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i6523 = data
  i6522.functionName = i6523[0]
  i6522.floatParameter = i6523[1]
  i6522.intParameter = i6523[2]
  i6522.stringParameter = i6523[3]
  request.r(i6523[4], i6523[5], 0, i6522, 'objectReferenceParameter')
  i6522.time = i6523[6]
  return i6522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i6524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i6525 = data
  i6524.center = new pc.Vec3( i6525[0], i6525[1], i6525[2] )
  i6524.extends = new pc.Vec3( i6525[3], i6525[4], i6525[5] )
  return i6524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i6528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i6529 = data
  var i6531 = i6529[0]
  var i6530 = []
  for(var i = 0; i < i6531.length; i += 1) {
    i6530.push( i6531[i + 0] );
  }
  i6528.genericBindings = i6530
  var i6533 = i6529[1]
  var i6532 = []
  for(var i = 0; i < i6533.length; i += 1) {
    i6532.push( i6533[i + 0] );
  }
  i6528.pptrCurveMapping = i6532
  return i6528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i6534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i6535 = data
  i6534.name = i6535[0]
  i6534.ascent = i6535[1]
  i6534.originalLineHeight = i6535[2]
  i6534.fontSize = i6535[3]
  var i6537 = i6535[4]
  var i6536 = []
  for(var i = 0; i < i6537.length; i += 1) {
    i6536.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i6537[i + 0]) );
  }
  i6534.characterInfo = i6536
  request.r(i6535[5], i6535[6], 0, i6534, 'texture')
  i6534.originalFontSize = i6535[7]
  return i6534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i6540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i6541 = data
  i6540.index = i6541[0]
  i6540.advance = i6541[1]
  i6540.bearing = i6541[2]
  i6540.glyphWidth = i6541[3]
  i6540.glyphHeight = i6541[4]
  i6540.minX = i6541[5]
  i6540.maxX = i6541[6]
  i6540.minY = i6541[7]
  i6540.maxY = i6541[8]
  i6540.uvBottomLeftX = i6541[9]
  i6540.uvBottomLeftY = i6541[10]
  i6540.uvBottomRightX = i6541[11]
  i6540.uvBottomRightY = i6541[12]
  i6540.uvTopLeftX = i6541[13]
  i6540.uvTopLeftY = i6541[14]
  i6540.uvTopRightX = i6541[15]
  i6540.uvTopRightY = i6541[16]
  return i6540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i6542 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i6543 = data
  i6542.name = i6543[0]
  var i6545 = i6543[1]
  var i6544 = []
  for(var i = 0; i < i6545.length; i += 1) {
    i6544.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i6545[i + 0]) );
  }
  i6542.layers = i6544
  var i6547 = i6543[2]
  var i6546 = []
  for(var i = 0; i < i6547.length; i += 1) {
    i6546.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i6547[i + 0]) );
  }
  i6542.parameters = i6546
  i6542.animationClips = i6543[3]
  i6542.avatarUnsupported = i6543[4]
  return i6542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i6550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i6551 = data
  i6550.name = i6551[0]
  i6550.defaultWeight = i6551[1]
  i6550.blendingMode = i6551[2]
  i6550.avatarMask = i6551[3]
  i6550.syncedLayerIndex = i6551[4]
  i6550.syncedLayerAffectsTiming = !!i6551[5]
  i6550.syncedLayers = i6551[6]
  i6550.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i6551[7], i6550.stateMachine)
  return i6550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i6552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i6553 = data
  i6552.id = i6553[0]
  i6552.name = i6553[1]
  i6552.path = i6553[2]
  var i6555 = i6553[3]
  var i6554 = []
  for(var i = 0; i < i6555.length; i += 1) {
    i6554.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i6555[i + 0]) );
  }
  i6552.states = i6554
  var i6557 = i6553[4]
  var i6556 = []
  for(var i = 0; i < i6557.length; i += 1) {
    i6556.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i6557[i + 0]) );
  }
  i6552.machines = i6556
  var i6559 = i6553[5]
  var i6558 = []
  for(var i = 0; i < i6559.length; i += 1) {
    i6558.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i6559[i + 0]) );
  }
  i6552.entryStateTransitions = i6558
  var i6561 = i6553[6]
  var i6560 = []
  for(var i = 0; i < i6561.length; i += 1) {
    i6560.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i6561[i + 0]) );
  }
  i6552.exitStateTransitions = i6560
  var i6563 = i6553[7]
  var i6562 = []
  for(var i = 0; i < i6563.length; i += 1) {
    i6562.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i6563[i + 0]) );
  }
  i6552.anyStateTransitions = i6562
  i6552.defaultStateId = i6553[8]
  return i6552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i6566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i6567 = data
  i6566.id = i6567[0]
  i6566.name = i6567[1]
  i6566.cycleOffset = i6567[2]
  i6566.cycleOffsetParameter = i6567[3]
  i6566.cycleOffsetParameterActive = !!i6567[4]
  i6566.mirror = !!i6567[5]
  i6566.mirrorParameter = i6567[6]
  i6566.mirrorParameterActive = !!i6567[7]
  i6566.motionId = i6567[8]
  i6566.nameHash = i6567[9]
  i6566.fullPathHash = i6567[10]
  i6566.speed = i6567[11]
  i6566.speedParameter = i6567[12]
  i6566.speedParameterActive = !!i6567[13]
  i6566.tag = i6567[14]
  i6566.tagHash = i6567[15]
  i6566.writeDefaultValues = !!i6567[16]
  var i6569 = i6567[17]
  var i6568 = []
  for(var i = 0; i < i6569.length; i += 2) {
  request.r(i6569[i + 0], i6569[i + 1], 2, i6568, '')
  }
  i6566.behaviours = i6568
  var i6571 = i6567[18]
  var i6570 = []
  for(var i = 0; i < i6571.length; i += 1) {
    i6570.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i6571[i + 0]) );
  }
  i6566.transitions = i6570
  return i6566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i6576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i6577 = data
  i6576.fullPath = i6577[0]
  i6576.canTransitionToSelf = !!i6577[1]
  i6576.duration = i6577[2]
  i6576.exitTime = i6577[3]
  i6576.hasExitTime = !!i6577[4]
  i6576.hasFixedDuration = !!i6577[5]
  i6576.interruptionSource = i6577[6]
  i6576.offset = i6577[7]
  i6576.orderedInterruption = !!i6577[8]
  i6576.destinationStateId = i6577[9]
  i6576.isExit = !!i6577[10]
  i6576.mute = !!i6577[11]
  i6576.solo = !!i6577[12]
  var i6579 = i6577[13]
  var i6578 = []
  for(var i = 0; i < i6579.length; i += 1) {
    i6578.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i6579[i + 0]) );
  }
  i6576.conditions = i6578
  return i6576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i6582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i6583 = data
  i6582.mode = i6583[0]
  i6582.parameter = i6583[1]
  i6582.threshold = i6583[2]
  return i6582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i6588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i6589 = data
  i6588.destinationStateId = i6589[0]
  i6588.isExit = !!i6589[1]
  i6588.mute = !!i6589[2]
  i6588.solo = !!i6589[3]
  var i6591 = i6589[4]
  var i6590 = []
  for(var i = 0; i < i6591.length; i += 1) {
    i6590.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i6591[i + 0]) );
  }
  i6588.conditions = i6590
  return i6588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i6594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i6595 = data
  i6594.defaultBool = !!i6595[0]
  i6594.defaultFloat = i6595[1]
  i6594.defaultInt = i6595[2]
  i6594.name = i6595[3]
  i6594.nameHash = i6595[4]
  i6594.type = i6595[5]
  return i6594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController"] = function (request, data, root) {
  var i6596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController' )
  var i6597 = data
  i6596.name = i6597[0]
  request.r(i6597[1], i6597[2], 0, i6596, '_runtimeAnimatorController')
  var i6599 = i6597[3]
  var i6598 = []
  for(var i = 0; i < i6599.length; i += 2) {
  request.r(i6599[i + 0], i6599[i + 1], 2, i6598, '')
  }
  i6596._originalAnimationClips = i6598
  var i6601 = i6597[4]
  var i6600 = []
  for(var i = 0; i < i6601.length; i += 2) {
  request.r(i6601[i + 0], i6601[i + 1], 2, i6600, '')
  }
  i6596._overrideAnimationClips = i6600
  var i6603 = i6597[5]
  var i6602 = []
  for(var i = 0; i < i6603.length; i += 2) {
  request.r(i6603[i + 0], i6603[i + 1], 2, i6602, '')
  }
  i6596._animationClips = i6602
  var i6605 = i6597[6]
  var i6604 = []
  for(var i = 0; i < i6605.length; i += 1) {
    i6604.push( request.d('UnityEngine.AnimationClipPair', i6605[i + 0]) );
  }
  i6596._animationClipPairs = i6604
  return i6596
}

Deserializers["UnityEngine.AnimationClipPair"] = function (request, data, root) {
  var i6610 = root || request.c( 'UnityEngine.AnimationClipPair' )
  var i6611 = data
  request.r(i6611[0], i6611[1], 0, i6610, 'originalClip')
  request.r(i6611[2], i6611[3], 0, i6610, 'overrideClip')
  return i6610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i6612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i6613 = data
  i6612.name = i6613[0]
  i6612.bytes64 = i6613[1]
  i6612.data = i6613[2]
  return i6612
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i6614 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i6615 = data
  i6614.normalStyle = i6615[0]
  i6614.normalSpacingOffset = i6615[1]
  i6614.boldStyle = i6615[2]
  i6614.boldSpacing = i6615[3]
  i6614.italicStyle = i6615[4]
  i6614.tabSize = i6615[5]
  request.r(i6615[6], i6615[7], 0, i6614, 'atlas')
  i6614.m_SourceFontFileGUID = i6615[8]
  i6614.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i6615[9], i6614.m_CreationSettings)
  request.r(i6615[10], i6615[11], 0, i6614, 'm_SourceFontFile')
  i6614.m_SourceFontFilePath = i6615[12]
  i6614.m_AtlasPopulationMode = i6615[13]
  i6614.InternalDynamicOS = !!i6615[14]
  var i6617 = i6615[15]
  var i6616 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i6617.length; i += 1) {
    i6616.add(request.d('UnityEngine.TextCore.Glyph', i6617[i + 0]));
  }
  i6614.m_GlyphTable = i6616
  var i6619 = i6615[16]
  var i6618 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i6619.length; i += 1) {
    i6618.add(request.d('TMPro.TMP_Character', i6619[i + 0]));
  }
  i6614.m_CharacterTable = i6618
  var i6621 = i6615[17]
  var i6620 = []
  for(var i = 0; i < i6621.length; i += 2) {
  request.r(i6621[i + 0], i6621[i + 1], 2, i6620, '')
  }
  i6614.m_AtlasTextures = i6620
  i6614.m_AtlasTextureIndex = i6615[18]
  i6614.m_IsMultiAtlasTexturesEnabled = !!i6615[19]
  i6614.m_GetFontFeatures = !!i6615[20]
  i6614.m_ClearDynamicDataOnBuild = !!i6615[21]
  i6614.m_AtlasWidth = i6615[22]
  i6614.m_AtlasHeight = i6615[23]
  i6614.m_AtlasPadding = i6615[24]
  i6614.m_AtlasRenderMode = i6615[25]
  var i6623 = i6615[26]
  var i6622 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i6623.length; i += 1) {
    i6622.add(request.d('UnityEngine.TextCore.GlyphRect', i6623[i + 0]));
  }
  i6614.m_UsedGlyphRects = i6622
  var i6625 = i6615[27]
  var i6624 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i6625.length; i += 1) {
    i6624.add(request.d('UnityEngine.TextCore.GlyphRect', i6625[i + 0]));
  }
  i6614.m_FreeGlyphRects = i6624
  i6614.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i6615[28], i6614.m_FontFeatureTable)
  i6614.m_ShouldReimportFontFeatures = !!i6615[29]
  var i6627 = i6615[30]
  var i6626 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6627.length; i += 2) {
  request.r(i6627[i + 0], i6627[i + 1], 1, i6626, '')
  }
  i6614.m_FallbackFontAssetTable = i6626
  var i6629 = i6615[31]
  var i6628 = []
  for(var i = 0; i < i6629.length; i += 1) {
    i6628.push( request.d('TMPro.TMP_FontWeightPair', i6629[i + 0]) );
  }
  i6614.m_FontWeightTable = i6628
  var i6631 = i6615[32]
  var i6630 = []
  for(var i = 0; i < i6631.length; i += 1) {
    i6630.push( request.d('TMPro.TMP_FontWeightPair', i6631[i + 0]) );
  }
  i6614.fontWeights = i6630
  i6614.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i6615[33], i6614.m_fontInfo)
  var i6633 = i6615[34]
  var i6632 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i6633.length; i += 1) {
    i6632.add(request.d('TMPro.TMP_Glyph', i6633[i + 0]));
  }
  i6614.m_glyphInfoList = i6632
  i6614.m_KerningTable = request.d('TMPro.KerningTable', i6615[35], i6614.m_KerningTable)
  var i6635 = i6615[36]
  var i6634 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6635.length; i += 2) {
  request.r(i6635[i + 0], i6635[i + 1], 1, i6634, '')
  }
  i6614.fallbackFontAssets = i6634
  i6614.m_Version = i6615[37]
  i6614.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i6615[38], i6614.m_FaceInfo)
  request.r(i6615[39], i6615[40], 0, i6614, 'm_Material')
  return i6614
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i6636 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i6637 = data
  i6636.sourceFontFileName = i6637[0]
  i6636.sourceFontFileGUID = i6637[1]
  i6636.faceIndex = i6637[2]
  i6636.pointSizeSamplingMode = i6637[3]
  i6636.pointSize = i6637[4]
  i6636.padding = i6637[5]
  i6636.paddingMode = i6637[6]
  i6636.packingMode = i6637[7]
  i6636.atlasWidth = i6637[8]
  i6636.atlasHeight = i6637[9]
  i6636.characterSetSelectionMode = i6637[10]
  i6636.characterSequence = i6637[11]
  i6636.referencedFontAssetGUID = i6637[12]
  i6636.referencedTextAssetGUID = i6637[13]
  i6636.fontStyle = i6637[14]
  i6636.fontStyleModifier = i6637[15]
  i6636.renderMode = i6637[16]
  i6636.includeFontFeatures = !!i6637[17]
  return i6636
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i6640 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i6641 = data
  i6640.m_Index = i6641[0]
  i6640.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i6641[1], i6640.m_Metrics)
  i6640.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i6641[2], i6640.m_GlyphRect)
  i6640.m_Scale = i6641[3]
  i6640.m_AtlasIndex = i6641[4]
  i6640.m_ClassDefinitionType = i6641[5]
  return i6640
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i6642 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i6643 = data
  i6642.m_Width = i6643[0]
  i6642.m_Height = i6643[1]
  i6642.m_HorizontalBearingX = i6643[2]
  i6642.m_HorizontalBearingY = i6643[3]
  i6642.m_HorizontalAdvance = i6643[4]
  return i6642
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i6644 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i6645 = data
  i6644.m_X = i6645[0]
  i6644.m_Y = i6645[1]
  i6644.m_Width = i6645[2]
  i6644.m_Height = i6645[3]
  return i6644
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i6648 = root || request.c( 'TMPro.TMP_Character' )
  var i6649 = data
  i6648.m_ElementType = i6649[0]
  i6648.m_Unicode = i6649[1]
  i6648.m_GlyphIndex = i6649[2]
  i6648.m_Scale = i6649[3]
  return i6648
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i6654 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i6655 = data
  var i6657 = i6655[0]
  var i6656 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i6657.length; i += 1) {
    i6656.add(request.d('TMPro.MultipleSubstitutionRecord', i6657[i + 0]));
  }
  i6654.m_MultipleSubstitutionRecords = i6656
  var i6659 = i6655[1]
  var i6658 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i6659.length; i += 1) {
    i6658.add(request.d('TMPro.LigatureSubstitutionRecord', i6659[i + 0]));
  }
  i6654.m_LigatureSubstitutionRecords = i6658
  var i6661 = i6655[2]
  var i6660 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i6661.length; i += 1) {
    i6660.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i6661[i + 0]));
  }
  i6654.m_GlyphPairAdjustmentRecords = i6660
  var i6663 = i6655[3]
  var i6662 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i6663.length; i += 1) {
    i6662.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i6663[i + 0]));
  }
  i6654.m_MarkToBaseAdjustmentRecords = i6662
  var i6665 = i6655[4]
  var i6664 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i6665.length; i += 1) {
    i6664.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i6665[i + 0]));
  }
  i6654.m_MarkToMarkAdjustmentRecords = i6664
  return i6654
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i6668 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i6669 = data
  i6668.m_TargetGlyphID = i6669[0]
  i6668.m_SubstituteGlyphIDs = i6669[1]
  return i6668
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i6672 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i6673 = data
  i6672.m_ComponentGlyphIDs = i6673[0]
  i6672.m_LigatureGlyphID = i6673[1]
  return i6672
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i6676 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i6677 = data
  i6676.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i6677[0], i6676.m_FirstAdjustmentRecord)
  i6676.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i6677[1], i6676.m_SecondAdjustmentRecord)
  i6676.m_FeatureLookupFlags = i6677[2]
  return i6676
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i6678 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i6679 = data
  i6678.m_GlyphIndex = i6679[0]
  i6678.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i6679[1], i6678.m_GlyphValueRecord)
  return i6678
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i6680 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i6681 = data
  i6680.m_XPlacement = i6681[0]
  i6680.m_YPlacement = i6681[1]
  i6680.m_XAdvance = i6681[2]
  i6680.m_YAdvance = i6681[3]
  return i6680
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i6684 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i6685 = data
  i6684.m_BaseGlyphID = i6685[0]
  i6684.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i6685[1], i6684.m_BaseGlyphAnchorPoint)
  i6684.m_MarkGlyphID = i6685[2]
  i6684.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i6685[3], i6684.m_MarkPositionAdjustment)
  return i6684
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i6686 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i6687 = data
  i6686.m_XCoordinate = i6687[0]
  i6686.m_YCoordinate = i6687[1]
  return i6686
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i6688 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i6689 = data
  i6688.m_XPositionAdjustment = i6689[0]
  i6688.m_YPositionAdjustment = i6689[1]
  return i6688
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i6692 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i6693 = data
  i6692.m_BaseMarkGlyphID = i6693[0]
  i6692.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i6693[1], i6692.m_BaseMarkGlyphAnchorPoint)
  i6692.m_CombiningMarkGlyphID = i6693[2]
  i6692.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i6693[3], i6692.m_CombiningMarkPositionAdjustment)
  return i6692
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i6698 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i6699 = data
  request.r(i6699[0], i6699[1], 0, i6698, 'regularTypeface')
  request.r(i6699[2], i6699[3], 0, i6698, 'italicTypeface')
  return i6698
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i6700 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i6701 = data
  i6700.Name = i6701[0]
  i6700.PointSize = i6701[1]
  i6700.Scale = i6701[2]
  i6700.CharacterCount = i6701[3]
  i6700.LineHeight = i6701[4]
  i6700.Baseline = i6701[5]
  i6700.Ascender = i6701[6]
  i6700.CapHeight = i6701[7]
  i6700.Descender = i6701[8]
  i6700.CenterLine = i6701[9]
  i6700.SuperscriptOffset = i6701[10]
  i6700.SubscriptOffset = i6701[11]
  i6700.SubSize = i6701[12]
  i6700.Underline = i6701[13]
  i6700.UnderlineThickness = i6701[14]
  i6700.strikethrough = i6701[15]
  i6700.strikethroughThickness = i6701[16]
  i6700.TabWidth = i6701[17]
  i6700.Padding = i6701[18]
  i6700.AtlasWidth = i6701[19]
  i6700.AtlasHeight = i6701[20]
  return i6700
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i6704 = root || request.c( 'TMPro.TMP_Glyph' )
  var i6705 = data
  i6704.id = i6705[0]
  i6704.x = i6705[1]
  i6704.y = i6705[2]
  i6704.width = i6705[3]
  i6704.height = i6705[4]
  i6704.xOffset = i6705[5]
  i6704.yOffset = i6705[6]
  i6704.xAdvance = i6705[7]
  i6704.scale = i6705[8]
  return i6704
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i6706 = root || request.c( 'TMPro.KerningTable' )
  var i6707 = data
  var i6709 = i6707[0]
  var i6708 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i6709.length; i += 1) {
    i6708.add(request.d('TMPro.KerningPair', i6709[i + 0]));
  }
  i6706.kerningPairs = i6708
  return i6706
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i6712 = root || request.c( 'TMPro.KerningPair' )
  var i6713 = data
  i6712.xOffset = i6713[0]
  i6712.m_FirstGlyph = i6713[1]
  i6712.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i6713[2], i6712.m_FirstGlyphAdjustments)
  i6712.m_SecondGlyph = i6713[3]
  i6712.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i6713[4], i6712.m_SecondGlyphAdjustments)
  i6712.m_IgnoreSpacingAdjustments = !!i6713[5]
  return i6712
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i6714 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i6715 = data
  i6714.m_FaceIndex = i6715[0]
  i6714.m_FamilyName = i6715[1]
  i6714.m_StyleName = i6715[2]
  i6714.m_PointSize = i6715[3]
  i6714.m_Scale = i6715[4]
  i6714.m_UnitsPerEM = i6715[5]
  i6714.m_LineHeight = i6715[6]
  i6714.m_AscentLine = i6715[7]
  i6714.m_CapLine = i6715[8]
  i6714.m_MeanLine = i6715[9]
  i6714.m_Baseline = i6715[10]
  i6714.m_DescentLine = i6715[11]
  i6714.m_SuperscriptOffset = i6715[12]
  i6714.m_SuperscriptSize = i6715[13]
  i6714.m_SubscriptOffset = i6715[14]
  i6714.m_SubscriptSize = i6715[15]
  i6714.m_UnderlineOffset = i6715[16]
  i6714.m_UnderlineThickness = i6715[17]
  i6714.m_StrikethroughOffset = i6715[18]
  i6714.m_StrikethroughThickness = i6715[19]
  i6714.m_TabWidth = i6715[20]
  return i6714
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i6716 = root || request.c( 'TMPro.TMP_Settings' )
  var i6717 = data
  i6716.assetVersion = i6717[0]
  i6716.m_TextWrappingMode = i6717[1]
  i6716.m_enableKerning = !!i6717[2]
  var i6719 = i6717[3]
  var i6718 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i6719.length; i += 1) {
    i6718.add(i6719[i + 0]);
  }
  i6716.m_ActiveFontFeatures = i6718
  i6716.m_enableExtraPadding = !!i6717[4]
  i6716.m_enableTintAllSprites = !!i6717[5]
  i6716.m_enableParseEscapeCharacters = !!i6717[6]
  i6716.m_EnableRaycastTarget = !!i6717[7]
  i6716.m_GetFontFeaturesAtRuntime = !!i6717[8]
  i6716.m_missingGlyphCharacter = i6717[9]
  i6716.m_ClearDynamicDataOnBuild = !!i6717[10]
  i6716.m_warningsDisabled = !!i6717[11]
  request.r(i6717[12], i6717[13], 0, i6716, 'm_defaultFontAsset')
  i6716.m_defaultFontAssetPath = i6717[14]
  i6716.m_defaultFontSize = i6717[15]
  i6716.m_defaultAutoSizeMinRatio = i6717[16]
  i6716.m_defaultAutoSizeMaxRatio = i6717[17]
  i6716.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i6717[18], i6717[19] )
  i6716.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i6717[20], i6717[21] )
  i6716.m_autoSizeTextContainer = !!i6717[22]
  i6716.m_IsTextObjectScaleStatic = !!i6717[23]
  var i6721 = i6717[24]
  var i6720 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6721.length; i += 2) {
  request.r(i6721[i + 0], i6721[i + 1], 1, i6720, '')
  }
  i6716.m_fallbackFontAssets = i6720
  i6716.m_matchMaterialPreset = !!i6717[25]
  i6716.m_HideSubTextObjects = !!i6717[26]
  request.r(i6717[27], i6717[28], 0, i6716, 'm_defaultSpriteAsset')
  i6716.m_defaultSpriteAssetPath = i6717[29]
  i6716.m_enableEmojiSupport = !!i6717[30]
  i6716.m_MissingCharacterSpriteUnicode = i6717[31]
  var i6723 = i6717[32]
  var i6722 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i6723.length; i += 2) {
  request.r(i6723[i + 0], i6723[i + 1], 1, i6722, '')
  }
  i6716.m_EmojiFallbackTextAssets = i6722
  i6716.m_defaultColorGradientPresetsPath = i6717[33]
  request.r(i6717[34], i6717[35], 0, i6716, 'm_defaultStyleSheet')
  i6716.m_StyleSheetsResourcePath = i6717[36]
  request.r(i6717[37], i6717[38], 0, i6716, 'm_leadingCharacters')
  request.r(i6717[39], i6717[40], 0, i6716, 'm_followingCharacters')
  i6716.m_UseModernHangulLineBreakingRules = !!i6717[41]
  return i6716
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i6726 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i6727 = data
  request.r(i6727[0], i6727[1], 0, i6726, 'spriteSheet')
  var i6729 = i6727[2]
  var i6728 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i6729.length; i += 1) {
    i6728.add(request.d('TMPro.TMP_Sprite', i6729[i + 0]));
  }
  i6726.spriteInfoList = i6728
  var i6731 = i6727[3]
  var i6730 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i6731.length; i += 2) {
  request.r(i6731[i + 0], i6731[i + 1], 1, i6730, '')
  }
  i6726.fallbackSpriteAssets = i6730
  var i6733 = i6727[4]
  var i6732 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i6733.length; i += 1) {
    i6732.add(request.d('TMPro.TMP_SpriteCharacter', i6733[i + 0]));
  }
  i6726.m_SpriteCharacterTable = i6732
  var i6735 = i6727[5]
  var i6734 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i6735.length; i += 1) {
    i6734.add(request.d('TMPro.TMP_SpriteGlyph', i6735[i + 0]));
  }
  i6726.m_GlyphTable = i6734
  i6726.m_Version = i6727[6]
  i6726.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i6727[7], i6726.m_FaceInfo)
  request.r(i6727[8], i6727[9], 0, i6726, 'm_Material')
  return i6726
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i6738 = root || request.c( 'TMPro.TMP_Sprite' )
  var i6739 = data
  i6738.name = i6739[0]
  i6738.hashCode = i6739[1]
  i6738.unicode = i6739[2]
  i6738.pivot = new pc.Vec2( i6739[3], i6739[4] )
  request.r(i6739[5], i6739[6], 0, i6738, 'sprite')
  i6738.id = i6739[7]
  i6738.x = i6739[8]
  i6738.y = i6739[9]
  i6738.width = i6739[10]
  i6738.height = i6739[11]
  i6738.xOffset = i6739[12]
  i6738.yOffset = i6739[13]
  i6738.xAdvance = i6739[14]
  i6738.scale = i6739[15]
  return i6738
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i6744 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i6745 = data
  i6744.m_Name = i6745[0]
  i6744.m_ElementType = i6745[1]
  i6744.m_Unicode = i6745[2]
  i6744.m_GlyphIndex = i6745[3]
  i6744.m_Scale = i6745[4]
  return i6744
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i6748 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i6749 = data
  request.r(i6749[0], i6749[1], 0, i6748, 'sprite')
  i6748.m_Index = i6749[2]
  i6748.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i6749[3], i6748.m_Metrics)
  i6748.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i6749[4], i6748.m_GlyphRect)
  i6748.m_Scale = i6749[5]
  i6748.m_AtlasIndex = i6749[6]
  i6748.m_ClassDefinitionType = i6749[7]
  return i6748
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i6750 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i6751 = data
  var i6753 = i6751[0]
  var i6752 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i6753.length; i += 1) {
    i6752.add(request.d('TMPro.TMP_Style', i6753[i + 0]));
  }
  i6750.m_StyleList = i6752
  return i6750
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i6756 = root || request.c( 'TMPro.TMP_Style' )
  var i6757 = data
  i6756.m_Name = i6757[0]
  i6756.m_HashCode = i6757[1]
  i6756.m_OpeningDefinition = i6757[2]
  i6756.m_ClosingDefinition = i6757[3]
  i6756.m_OpeningTagArray = i6757[4]
  i6756.m_ClosingTagArray = i6757[5]
  return i6756
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i6758 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i6759 = data
  var i6761 = i6759[0]
  var i6760 = []
  for(var i = 0; i < i6761.length; i += 1) {
    i6760.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i6761[i + 0]) );
  }
  i6758.files = i6760
  i6758.componentToPrefabIds = i6759[1]
  return i6758
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i6764 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i6765 = data
  i6764.path = i6765[0]
  request.r(i6765[1], i6765[2], 0, i6764, 'unityObject')
  return i6764
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i6766 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i6767 = data
  var i6769 = i6767[0]
  var i6768 = []
  for(var i = 0; i < i6769.length; i += 1) {
    i6768.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i6769[i + 0]) );
  }
  i6766.scriptsExecutionOrder = i6768
  var i6771 = i6767[1]
  var i6770 = []
  for(var i = 0; i < i6771.length; i += 1) {
    i6770.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i6771[i + 0]) );
  }
  i6766.sortingLayers = i6770
  var i6773 = i6767[2]
  var i6772 = []
  for(var i = 0; i < i6773.length; i += 1) {
    i6772.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i6773[i + 0]) );
  }
  i6766.cullingLayers = i6772
  i6766.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i6767[3], i6766.timeSettings)
  i6766.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i6767[4], i6766.physicsSettings)
  i6766.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i6767[5], i6766.physics2DSettings)
  i6766.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i6767[6], i6766.qualitySettings)
  i6766.enableRealtimeShadows = !!i6767[7]
  i6766.enableAutoInstancing = !!i6767[8]
  i6766.enableStaticBatching = !!i6767[9]
  i6766.enableDynamicBatching = !!i6767[10]
  i6766.usePreservativeDynamicBatching = !!i6767[11]
  i6766.lightmapEncodingQuality = i6767[12]
  i6766.desiredColorSpace = i6767[13]
  var i6775 = i6767[14]
  var i6774 = []
  for(var i = 0; i < i6775.length; i += 1) {
    i6774.push( i6775[i + 0] );
  }
  i6766.allTags = i6774
  return i6766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i6778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i6779 = data
  i6778.name = i6779[0]
  i6778.value = i6779[1]
  return i6778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i6782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i6783 = data
  i6782.id = i6783[0]
  i6782.name = i6783[1]
  i6782.value = i6783[2]
  return i6782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i6786 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i6787 = data
  i6786.id = i6787[0]
  i6786.name = i6787[1]
  return i6786
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i6788 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i6789 = data
  i6788.fixedDeltaTime = i6789[0]
  i6788.maximumDeltaTime = i6789[1]
  i6788.timeScale = i6789[2]
  i6788.maximumParticleTimestep = i6789[3]
  return i6788
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i6790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i6791 = data
  i6790.gravity = new pc.Vec3( i6791[0], i6791[1], i6791[2] )
  i6790.defaultSolverIterations = i6791[3]
  i6790.bounceThreshold = i6791[4]
  i6790.autoSyncTransforms = !!i6791[5]
  i6790.autoSimulation = !!i6791[6]
  var i6793 = i6791[7]
  var i6792 = []
  for(var i = 0; i < i6793.length; i += 1) {
    i6792.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i6793[i + 0]) );
  }
  i6790.collisionMatrix = i6792
  return i6790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i6796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i6797 = data
  i6796.enabled = !!i6797[0]
  i6796.layerId = i6797[1]
  i6796.otherLayerId = i6797[2]
  return i6796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i6798 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i6799 = data
  request.r(i6799[0], i6799[1], 0, i6798, 'material')
  i6798.gravity = new pc.Vec2( i6799[2], i6799[3] )
  i6798.positionIterations = i6799[4]
  i6798.velocityIterations = i6799[5]
  i6798.velocityThreshold = i6799[6]
  i6798.maxLinearCorrection = i6799[7]
  i6798.maxAngularCorrection = i6799[8]
  i6798.maxTranslationSpeed = i6799[9]
  i6798.maxRotationSpeed = i6799[10]
  i6798.baumgarteScale = i6799[11]
  i6798.baumgarteTOIScale = i6799[12]
  i6798.timeToSleep = i6799[13]
  i6798.linearSleepTolerance = i6799[14]
  i6798.angularSleepTolerance = i6799[15]
  i6798.defaultContactOffset = i6799[16]
  i6798.autoSimulation = !!i6799[17]
  i6798.queriesHitTriggers = !!i6799[18]
  i6798.queriesStartInColliders = !!i6799[19]
  i6798.callbacksOnDisable = !!i6799[20]
  i6798.reuseCollisionCallbacks = !!i6799[21]
  i6798.autoSyncTransforms = !!i6799[22]
  var i6801 = i6799[23]
  var i6800 = []
  for(var i = 0; i < i6801.length; i += 1) {
    i6800.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i6801[i + 0]) );
  }
  i6798.collisionMatrix = i6800
  return i6798
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i6804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i6805 = data
  i6804.enabled = !!i6805[0]
  i6804.layerId = i6805[1]
  i6804.otherLayerId = i6805[2]
  return i6804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i6806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i6807 = data
  var i6809 = i6807[0]
  var i6808 = []
  for(var i = 0; i < i6809.length; i += 1) {
    i6808.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i6809[i + 0]) );
  }
  i6806.qualityLevels = i6808
  var i6811 = i6807[1]
  var i6810 = []
  for(var i = 0; i < i6811.length; i += 1) {
    i6810.push( i6811[i + 0] );
  }
  i6806.names = i6810
  i6806.shadows = i6807[2]
  i6806.anisotropicFiltering = i6807[3]
  i6806.antiAliasing = i6807[4]
  i6806.lodBias = i6807[5]
  i6806.shadowCascades = i6807[6]
  i6806.shadowDistance = i6807[7]
  i6806.shadowmaskMode = i6807[8]
  i6806.shadowProjection = i6807[9]
  i6806.shadowResolution = i6807[10]
  i6806.softParticles = !!i6807[11]
  i6806.softVegetation = !!i6807[12]
  i6806.activeColorSpace = i6807[13]
  i6806.desiredColorSpace = i6807[14]
  i6806.masterTextureLimit = i6807[15]
  i6806.maxQueuedFrames = i6807[16]
  i6806.particleRaycastBudget = i6807[17]
  i6806.pixelLightCount = i6807[18]
  i6806.realtimeReflectionProbes = !!i6807[19]
  i6806.shadowCascade2Split = i6807[20]
  i6806.shadowCascade4Split = new pc.Vec3( i6807[21], i6807[22], i6807[23] )
  i6806.streamingMipmapsActive = !!i6807[24]
  i6806.vSyncCount = i6807[25]
  i6806.asyncUploadBufferSize = i6807[26]
  i6806.asyncUploadTimeSlice = i6807[27]
  i6806.billboardsFaceCameraPosition = !!i6807[28]
  i6806.shadowNearPlaneOffset = i6807[29]
  i6806.streamingMipmapsMemoryBudget = i6807[30]
  i6806.maximumLODLevel = i6807[31]
  i6806.streamingMipmapsAddAllCameras = !!i6807[32]
  i6806.streamingMipmapsMaxLevelReduction = i6807[33]
  i6806.streamingMipmapsRenderersPerFrame = i6807[34]
  i6806.resolutionScalingFixedDPIFactor = i6807[35]
  i6806.streamingMipmapsMaxFileIORequests = i6807[36]
  i6806.currentQualityLevel = i6807[37]
  return i6806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i6814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i6815 = data
  i6814.name = i6815[0]
  var i6817 = i6815[1]
  var i6816 = []
  for(var i = 0; i < i6817.length; i += 1) {
    i6816.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i6817[i + 0]) );
  }
  i6814.tos = i6816
  var i6819 = i6815[2]
  var i6818 = []
  for(var i = 0; i < i6819.length; i += 1) {
    i6818.push( i6819[i + 0] );
  }
  i6814.constant = i6818
  i6814.isValid = !!i6815[3]
  i6814.isHuman = !!i6815[4]
  i6814.hasRootMotion = !!i6815[5]
  return i6814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i6822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i6823 = data
  i6822.hash = i6823[0]
  i6822.path = i6823[1]
  return i6822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i6826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i6827 = data
  i6826.weight = i6827[0]
  i6826.vertices = i6827[1]
  i6826.normals = i6827[2]
  i6826.tangents = i6827[3]
  return i6826
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i6828 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i6829 = data
  request.r(i6829[0], i6829[1], 0, i6828, 'm_ObjectArgument')
  i6828.m_ObjectArgumentAssemblyTypeName = i6829[2]
  i6828.m_IntArgument = i6829[3]
  i6828.m_FloatArgument = i6829[4]
  i6828.m_StringArgument = i6829[5]
  i6828.m_BoolArgument = !!i6829[6]
  return i6828
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i6830 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i6831 = data
  i6830.xPlacement = i6831[0]
  i6830.yPlacement = i6831[1]
  i6830.xAdvance = i6831[2]
  i6830.yAdvance = i6831[3]
  return i6830
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Rigidbody":{"mass":0,"drag":1,"angularDrag":2,"useGravity":3,"isKinematic":4,"constraints":5,"maxAngularVelocity":6,"collisionDetectionMode":7,"interpolation":8},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TrailRenderer":{"positions":0,"positionCount":1,"time":2,"startWidth":3,"endWidth":4,"widthMultiplier":5,"autodestruct":6,"emitting":7,"numCornerVertices":8,"numCapVertices":9,"minVertexDistance":10,"colorGradient":11,"startColor":12,"endColor":16,"generateLightingData":20,"textureMode":21,"alignment":22,"widthCurve":23,"enabled":24,"sharedMaterial":25,"sharedMaterials":27,"receiveShadows":28,"shadowCastingMode":29,"sortingLayerID":30,"sortingOrder":31,"lightmapIndex":32,"lightmapSceneIndex":33,"lightmapScaleOffset":34,"lightProbeUsage":38,"reflectionProbeUsage":39},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.LineRenderer":{"textureMode":0,"alignment":1,"widthCurve":2,"colorGradient":3,"positions":4,"positionCount":5,"widthMultiplier":6,"startWidth":7,"endWidth":8,"numCornerVertices":9,"numCapVertices":10,"useWorldSpace":11,"loop":12,"startColor":13,"endColor":17,"generateLightingData":21,"enabled":22,"sharedMaterial":23,"sharedMaterials":25,"receiveShadows":26,"shadowCastingMode":27,"sortingLayerID":28,"sortingOrder":29,"lightmapIndex":30,"lightmapSceneIndex":31,"lightmapScaleOffset":32,"lightProbeUsage":36,"reflectionProbeUsage":37},"Luna.Unity.DTO.UnityEngine.Components.CharacterController":{"enabled":0,"center":1,"radius":4,"height":5,"minMoveDistance":6,"skinWidth":7,"enableOverlapRecovery":8},"Luna.Unity.DTO.UnityEngine.Components.CharacterJoint":{"swingAxis":0,"twistLimitSpring":3,"swingLimitSpring":4,"lowTwistLimit":5,"highTwistLimit":6,"swing1Limit":7,"swing2Limit":8,"connectedBody":9,"axis":11,"anchor":14,"connectedAnchor":17,"autoConfigureConnectedAnchor":20,"massScale":21,"connectedMassScale":22,"enableCollision":23,"breakForce":24,"breakTorque":25},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController":{"name":0,"_runtimeAnimatorController":1,"_originalAnimationClips":3,"_overrideAnimationClips":4,"_animationClips":5,"_animationClipPairs":6},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"79":[80],"81":[80],"82":[80],"83":[80],"84":[80],"85":[80],"86":[7],"87":[46],"59":[3],"88":[3],"89":[3],"90":[3],"91":[3],"92":[3],"93":[94],"95":[94],"96":[94],"97":[94],"98":[94],"99":[94],"100":[94],"101":[94],"102":[94],"103":[94],"104":[94],"105":[94],"106":[94],"107":[46],"108":[11],"109":[110],"111":[110],"21":[10],"40":[37],"112":[10],"113":[24,10],"114":[11],"115":[24,10],"116":[10],"117":[10],"13":[11,10],"25":[10,24],"118":[119],"120":[119],"121":[119],"122":[10],"123":[10],"23":[21],"26":[24,10],"124":[10],"22":[21],"31":[10],"29":[10],"68":[10],"125":[10],"126":[10],"127":[10],"30":[10],"34":[10],"128":[10],"129":[24,10],"130":[10],"32":[10],"33":[10],"131":[10],"132":[24,10],"133":[10],"134":[60],"135":[60],"61":[60],"136":[60],"137":[46],"138":[46]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Rigidbody","UnityEngine.CapsuleCollider","UnityEngine.Animator","UnityEngine.AnimatorOverrideController","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Material","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.TrailRenderer","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.MeshFilter","UnityEngine.BoxCollider","UnityEngine.SphereCollider","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","TMPro.TextMeshProUGUI","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Mask","UnityEngine.CanvasGroup","UnityEngine.Light","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.MonoBehaviour","PlayableSpatialAudio","UnityEngine.AI.NavMeshObstacle","UnityEditor.Animations.AnimatorController","UnityEngine.Avatar","StealEggGame","UnityEngine.GameObject","UnityEngine.Camera","PlayableRagdoll","UnityEngine.Font","UnityEngine.LineRenderer","TapHintView","IconAmountView","PetRowView","IncubateRowView","QuickSlotView","BagCellView","IndexZoneView","PlayableJoystick","UnityEngine.CharacterController","UnityEngine.CharacterJoint","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","PlayableCameraDrag","CameraController","UnityEngine.UI.Outline","LunaController","IAPPopupView","PlayableHoldButton","UnityEngine.UI.HorizontalLayoutGroup","IndexPetCellView","UnityEngine.AudioListener","PlayableUISparkle","PlayableImageCycle","PlayableUIPulse","UnityEngine.AnimationClip","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "TE_V06";

Deserializers.lunaInitializationTime = "10/27/2026 10:33:07";

Deserializers.lunaDaysRunning = "7.8";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2611_TamNTM_TE_V06_DungNV";

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

Deserializers.runtimeAnalysisExcludedMethodsCount = "4284";

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

Deserializers.buildID = "bf2a1fb2-36e1-4442-a591-fab04210d56b";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

