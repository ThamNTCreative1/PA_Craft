var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i4190 = root || request.c( 'UnityEngine.JointSpring' )
  var i4191 = data
  i4190.spring = i4191[0]
  i4190.damper = i4191[1]
  i4190.targetPosition = i4191[2]
  return i4190
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i4192 = root || request.c( 'UnityEngine.JointMotor' )
  var i4193 = data
  i4192.m_TargetVelocity = i4193[0]
  i4192.m_Force = i4193[1]
  i4192.m_FreeSpin = i4193[2]
  return i4192
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i4194 = root || request.c( 'UnityEngine.JointLimits' )
  var i4195 = data
  i4194.m_Min = i4195[0]
  i4194.m_Max = i4195[1]
  i4194.m_Bounciness = i4195[2]
  i4194.m_BounceMinVelocity = i4195[3]
  i4194.m_ContactDistance = i4195[4]
  i4194.minBounce = i4195[5]
  i4194.maxBounce = i4195[6]
  return i4194
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i4196 = root || request.c( 'UnityEngine.JointDrive' )
  var i4197 = data
  i4196.m_PositionSpring = i4197[0]
  i4196.m_PositionDamper = i4197[1]
  i4196.m_MaximumForce = i4197[2]
  i4196.m_UseAcceleration = i4197[3]
  return i4196
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i4198 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i4199 = data
  i4198.m_Spring = i4199[0]
  i4198.m_Damper = i4199[1]
  return i4198
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i4200 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i4201 = data
  i4200.m_Limit = i4201[0]
  i4200.m_Bounciness = i4201[1]
  i4200.m_ContactDistance = i4201[2]
  return i4200
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i4202 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i4203 = data
  i4202.m_ExtremumSlip = i4203[0]
  i4202.m_ExtremumValue = i4203[1]
  i4202.m_AsymptoteSlip = i4203[2]
  i4202.m_AsymptoteValue = i4203[3]
  i4202.m_Stiffness = i4203[4]
  return i4202
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i4204 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i4205 = data
  i4204.m_LowerAngle = i4205[0]
  i4204.m_UpperAngle = i4205[1]
  return i4204
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i4206 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i4207 = data
  i4206.m_MotorSpeed = i4207[0]
  i4206.m_MaximumMotorTorque = i4207[1]
  return i4206
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i4208 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i4209 = data
  i4208.m_DampingRatio = i4209[0]
  i4208.m_Frequency = i4209[1]
  i4208.m_Angle = i4209[2]
  return i4208
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i4210 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i4211 = data
  i4210.m_LowerTranslation = i4211[0]
  i4210.m_UpperTranslation = i4211[1]
  return i4210
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i4212 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i4213 = data
  i4212.name = i4213[0]
  i4212.halfPrecision = !!i4213[1]
  i4212.useSimplification = !!i4213[2]
  i4212.useUInt32IndexFormat = !!i4213[3]
  i4212.vertexCount = i4213[4]
  i4212.aabb = i4213[5]
  var i4215 = i4213[6]
  var i4214 = []
  for(var i = 0; i < i4215.length; i += 1) {
    i4214.push( !!i4215[i + 0] );
  }
  i4212.streams = i4214
  i4212.vertices = i4213[7]
  var i4217 = i4213[8]
  var i4216 = []
  for(var i = 0; i < i4217.length; i += 1) {
    i4216.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i4217[i + 0]) );
  }
  i4212.subMeshes = i4216
  var i4219 = i4213[9]
  var i4218 = []
  for(var i = 0; i < i4219.length; i += 16) {
    i4218.push( new pc.Mat4().setData(i4219[i + 0], i4219[i + 1], i4219[i + 2], i4219[i + 3],  i4219[i + 4], i4219[i + 5], i4219[i + 6], i4219[i + 7],  i4219[i + 8], i4219[i + 9], i4219[i + 10], i4219[i + 11],  i4219[i + 12], i4219[i + 13], i4219[i + 14], i4219[i + 15]) );
  }
  i4212.bindposes = i4218
  var i4221 = i4213[10]
  var i4220 = []
  for(var i = 0; i < i4221.length; i += 1) {
    i4220.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i4221[i + 0]) );
  }
  i4212.blendShapes = i4220
  return i4212
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i4226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i4227 = data
  i4226.triangles = i4227[0]
  return i4226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i4232 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i4233 = data
  i4232.name = i4233[0]
  var i4235 = i4233[1]
  var i4234 = []
  for(var i = 0; i < i4235.length; i += 1) {
    i4234.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i4235[i + 0]) );
  }
  i4232.frames = i4234
  return i4232
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i4236 = root || new pc.UnityMaterial()
  var i4237 = data
  i4236.name = i4237[0]
  request.r(i4237[1], i4237[2], 0, i4236, 'shader')
  i4236.renderQueue = i4237[3]
  i4236.enableInstancing = !!i4237[4]
  var i4239 = i4237[5]
  var i4238 = []
  for(var i = 0; i < i4239.length; i += 1) {
    i4238.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i4239[i + 0]) );
  }
  i4236.floatParameters = i4238
  var i4241 = i4237[6]
  var i4240 = []
  for(var i = 0; i < i4241.length; i += 1) {
    i4240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i4241[i + 0]) );
  }
  i4236.colorParameters = i4240
  var i4243 = i4237[7]
  var i4242 = []
  for(var i = 0; i < i4243.length; i += 1) {
    i4242.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i4243[i + 0]) );
  }
  i4236.vectorParameters = i4242
  var i4245 = i4237[8]
  var i4244 = []
  for(var i = 0; i < i4245.length; i += 1) {
    i4244.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i4245[i + 0]) );
  }
  i4236.textureParameters = i4244
  var i4247 = i4237[9]
  var i4246 = []
  for(var i = 0; i < i4247.length; i += 1) {
    i4246.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i4247[i + 0]) );
  }
  i4236.materialFlags = i4246
  return i4236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i4250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i4251 = data
  i4250.name = i4251[0]
  i4250.value = i4251[1]
  return i4250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i4254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i4255 = data
  i4254.name = i4255[0]
  i4254.value = new pc.Color(i4255[1], i4255[2], i4255[3], i4255[4])
  return i4254
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i4258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i4259 = data
  i4258.name = i4259[0]
  i4258.value = new pc.Vec4( i4259[1], i4259[2], i4259[3], i4259[4] )
  return i4258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i4262 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i4263 = data
  i4262.name = i4263[0]
  request.r(i4263[1], i4263[2], 0, i4262, 'value')
  return i4262
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i4266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i4267 = data
  i4266.name = i4267[0]
  i4266.enabled = !!i4267[1]
  return i4266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i4268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i4269 = data
  i4268.name = i4269[0]
  i4268.width = i4269[1]
  i4268.height = i4269[2]
  i4268.mipmapCount = i4269[3]
  i4268.anisoLevel = i4269[4]
  i4268.filterMode = i4269[5]
  i4268.hdr = !!i4269[6]
  i4268.format = i4269[7]
  i4268.wrapMode = i4269[8]
  i4268.alphaIsTransparency = !!i4269[9]
  i4268.alphaSource = i4269[10]
  i4268.graphicsFormat = i4269[11]
  i4268.sRGBTexture = !!i4269[12]
  i4268.desiredColorSpace = i4269[13]
  i4268.wrapU = i4269[14]
  i4268.wrapV = i4269[15]
  return i4268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i4270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i4271 = data
  i4270.position = new pc.Vec3( i4271[0], i4271[1], i4271[2] )
  i4270.scale = new pc.Vec3( i4271[3], i4271[4], i4271[5] )
  i4270.rotation = new pc.Quat(i4271[6], i4271[7], i4271[8], i4271[9])
  return i4270
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i4272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i4273 = data
  i4272.mass = i4273[0]
  i4272.drag = i4273[1]
  i4272.angularDrag = i4273[2]
  i4272.useGravity = !!i4273[3]
  i4272.isKinematic = !!i4273[4]
  i4272.constraints = i4273[5]
  i4272.maxAngularVelocity = i4273[6]
  i4272.collisionDetectionMode = i4273[7]
  i4272.interpolation = i4273[8]
  return i4272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i4274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i4275 = data
  i4274.center = new pc.Vec3( i4275[0], i4275[1], i4275[2] )
  i4274.radius = i4275[3]
  i4274.height = i4275[4]
  i4274.direction = i4275[5]
  i4274.enabled = !!i4275[6]
  i4274.isTrigger = !!i4275[7]
  request.r(i4275[8], i4275[9], 0, i4274, 'material')
  return i4274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i4276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i4277 = data
  request.r(i4277[0], i4277[1], 0, i4276, 'animatorController')
  request.r(i4277[2], i4277[3], 0, i4276, 'avatar')
  i4276.updateMode = i4277[4]
  i4276.hasTransformHierarchy = !!i4277[5]
  i4276.applyRootMotion = !!i4277[6]
  var i4279 = i4277[7]
  var i4278 = []
  for(var i = 0; i < i4279.length; i += 2) {
  request.r(i4279[i + 0], i4279[i + 1], 2, i4278, '')
  }
  i4276.humanBones = i4278
  i4276.enabled = !!i4277[8]
  return i4276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i4282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i4283 = data
  i4282.name = i4283[0]
  i4282.tagId = i4283[1]
  i4282.enabled = !!i4283[2]
  i4282.isStatic = !!i4283[3]
  i4282.layer = i4283[4]
  return i4282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i4284 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i4285 = data
  request.r(i4285[0], i4285[1], 0, i4284, 'sharedMesh')
  var i4287 = i4285[2]
  var i4286 = []
  for(var i = 0; i < i4287.length; i += 2) {
  request.r(i4287[i + 0], i4287[i + 1], 2, i4286, '')
  }
  i4284.bones = i4286
  i4284.updateWhenOffscreen = !!i4285[3]
  i4284.localBounds = i4285[4]
  request.r(i4285[5], i4285[6], 0, i4284, 'rootBone')
  var i4289 = i4285[7]
  var i4288 = []
  for(var i = 0; i < i4289.length; i += 1) {
    i4288.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i4289[i + 0]) );
  }
  i4284.blendShapesWeights = i4288
  i4284.enabled = !!i4285[8]
  request.r(i4285[9], i4285[10], 0, i4284, 'sharedMaterial')
  var i4291 = i4285[11]
  var i4290 = []
  for(var i = 0; i < i4291.length; i += 2) {
  request.r(i4291[i + 0], i4291[i + 1], 2, i4290, '')
  }
  i4284.sharedMaterials = i4290
  i4284.receiveShadows = !!i4285[12]
  i4284.shadowCastingMode = i4285[13]
  i4284.sortingLayerID = i4285[14]
  i4284.sortingOrder = i4285[15]
  i4284.lightmapIndex = i4285[16]
  i4284.lightmapSceneIndex = i4285[17]
  i4284.lightmapScaleOffset = new pc.Vec4( i4285[18], i4285[19], i4285[20], i4285[21] )
  i4284.lightProbeUsage = i4285[22]
  i4284.reflectionProbeUsage = i4285[23]
  return i4284
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i4294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i4295 = data
  i4294.weight = i4295[0]
  return i4294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i4298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i4299 = data
  i4298.pivot = new pc.Vec2( i4299[0], i4299[1] )
  i4298.anchorMin = new pc.Vec2( i4299[2], i4299[3] )
  i4298.anchorMax = new pc.Vec2( i4299[4], i4299[5] )
  i4298.sizeDelta = new pc.Vec2( i4299[6], i4299[7] )
  i4298.anchoredPosition3D = new pc.Vec3( i4299[8], i4299[9], i4299[10] )
  i4298.rotation = new pc.Quat(i4299[11], i4299[12], i4299[13], i4299[14])
  i4298.scale = new pc.Vec3( i4299[15], i4299[16], i4299[17] )
  return i4298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i4300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i4301 = data
  request.r(i4301[0], i4301[1], 0, i4300, 'additionalVertexStreams')
  i4300.enabled = !!i4301[2]
  request.r(i4301[3], i4301[4], 0, i4300, 'sharedMaterial')
  var i4303 = i4301[5]
  var i4302 = []
  for(var i = 0; i < i4303.length; i += 2) {
  request.r(i4303[i + 0], i4303[i + 1], 2, i4302, '')
  }
  i4300.sharedMaterials = i4302
  i4300.receiveShadows = !!i4301[6]
  i4300.shadowCastingMode = i4301[7]
  i4300.sortingLayerID = i4301[8]
  i4300.sortingOrder = i4301[9]
  i4300.lightmapIndex = i4301[10]
  i4300.lightmapSceneIndex = i4301[11]
  i4300.lightmapScaleOffset = new pc.Vec4( i4301[12], i4301[13], i4301[14], i4301[15] )
  i4300.lightProbeUsage = i4301[16]
  i4300.reflectionProbeUsage = i4301[17]
  return i4300
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i4304 = root || request.c( 'TMPro.TextMeshPro' )
  var i4305 = data
  i4304._SortingLayer = i4305[0]
  i4304._SortingLayerID = i4305[1]
  i4304._SortingOrder = i4305[2]
  i4304.m_hasFontAssetChanged = !!i4305[3]
  request.r(i4305[4], i4305[5], 0, i4304, 'm_renderer')
  i4304.m_maskType = i4305[6]
  i4304.m_text = i4305[7]
  i4304.m_isRightToLeft = !!i4305[8]
  request.r(i4305[9], i4305[10], 0, i4304, 'm_fontAsset')
  request.r(i4305[11], i4305[12], 0, i4304, 'm_sharedMaterial')
  var i4307 = i4305[13]
  var i4306 = []
  for(var i = 0; i < i4307.length; i += 2) {
  request.r(i4307[i + 0], i4307[i + 1], 2, i4306, '')
  }
  i4304.m_fontSharedMaterials = i4306
  request.r(i4305[14], i4305[15], 0, i4304, 'm_fontMaterial')
  var i4309 = i4305[16]
  var i4308 = []
  for(var i = 0; i < i4309.length; i += 2) {
  request.r(i4309[i + 0], i4309[i + 1], 2, i4308, '')
  }
  i4304.m_fontMaterials = i4308
  i4304.m_fontColor32 = UnityEngine.Color32.ConstructColor(i4305[17], i4305[18], i4305[19], i4305[20])
  i4304.m_fontColor = new pc.Color(i4305[21], i4305[22], i4305[23], i4305[24])
  i4304.m_enableVertexGradient = !!i4305[25]
  i4304.m_colorMode = i4305[26]
  i4304.m_fontColorGradient = request.d('TMPro.VertexGradient', i4305[27], i4304.m_fontColorGradient)
  request.r(i4305[28], i4305[29], 0, i4304, 'm_fontColorGradientPreset')
  request.r(i4305[30], i4305[31], 0, i4304, 'm_spriteAsset')
  i4304.m_tintAllSprites = !!i4305[32]
  request.r(i4305[33], i4305[34], 0, i4304, 'm_StyleSheet')
  i4304.m_TextStyleHashCode = i4305[35]
  i4304.m_overrideHtmlColors = !!i4305[36]
  i4304.m_faceColor = UnityEngine.Color32.ConstructColor(i4305[37], i4305[38], i4305[39], i4305[40])
  i4304.m_fontSize = i4305[41]
  i4304.m_fontSizeBase = i4305[42]
  i4304.m_fontWeight = i4305[43]
  i4304.m_enableAutoSizing = !!i4305[44]
  i4304.m_fontSizeMin = i4305[45]
  i4304.m_fontSizeMax = i4305[46]
  i4304.m_fontStyle = i4305[47]
  i4304.m_HorizontalAlignment = i4305[48]
  i4304.m_VerticalAlignment = i4305[49]
  i4304.m_textAlignment = i4305[50]
  i4304.m_characterSpacing = i4305[51]
  i4304.m_characterHorizontalScale = i4305[52]
  i4304.m_wordSpacing = i4305[53]
  i4304.m_lineSpacing = i4305[54]
  i4304.m_lineSpacingMax = i4305[55]
  i4304.m_paragraphSpacing = i4305[56]
  i4304.m_charWidthMaxAdj = i4305[57]
  i4304.m_TextWrappingMode = i4305[58]
  i4304.m_wordWrappingRatios = i4305[59]
  i4304.m_overflowMode = i4305[60]
  request.r(i4305[61], i4305[62], 0, i4304, 'm_linkedTextComponent')
  request.r(i4305[63], i4305[64], 0, i4304, 'parentLinkedComponent')
  i4304.m_enableKerning = !!i4305[65]
  var i4311 = i4305[66]
  var i4310 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4311.length; i += 1) {
    i4310.add(i4311[i + 0]);
  }
  i4304.m_ActiveFontFeatures = i4310
  i4304.m_enableExtraPadding = !!i4305[67]
  i4304.checkPaddingRequired = !!i4305[68]
  i4304.m_isRichText = !!i4305[69]
  i4304.m_parseCtrlCharacters = !!i4305[70]
  i4304.m_isOrthographic = !!i4305[71]
  i4304.m_isCullingEnabled = !!i4305[72]
  i4304.m_horizontalMapping = i4305[73]
  i4304.m_verticalMapping = i4305[74]
  i4304.m_uvLineOffset = i4305[75]
  i4304.m_geometrySortingOrder = i4305[76]
  i4304.m_IsTextObjectScaleStatic = !!i4305[77]
  i4304.m_VertexBufferAutoSizeReduction = !!i4305[78]
  i4304.m_useMaxVisibleDescender = !!i4305[79]
  i4304.m_pageToDisplay = i4305[80]
  i4304.m_margin = new pc.Vec4( i4305[81], i4305[82], i4305[83], i4305[84] )
  i4304.m_isUsingLegacyAnimationComponent = !!i4305[85]
  i4304.m_isVolumetricText = !!i4305[86]
  request.r(i4305[87], i4305[88], 0, i4304, 'm_Material')
  i4304.m_EmojiFallbackSupport = !!i4305[89]
  i4304.m_Maskable = !!i4305[90]
  i4304.m_Color = new pc.Color(i4305[91], i4305[92], i4305[93], i4305[94])
  i4304.m_RaycastTarget = !!i4305[95]
  i4304.m_RaycastPadding = new pc.Vec4( i4305[96], i4305[97], i4305[98], i4305[99] )
  return i4304
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i4312 = root || request.c( 'TMPro.VertexGradient' )
  var i4313 = data
  i4312.topLeft = new pc.Color(i4313[0], i4313[1], i4313[2], i4313[3])
  i4312.topRight = new pc.Color(i4313[4], i4313[5], i4313[6], i4313[7])
  i4312.bottomLeft = new pc.Color(i4313[8], i4313[9], i4313[10], i4313[11])
  i4312.bottomRight = new pc.Color(i4313[12], i4313[13], i4313[14], i4313[15])
  return i4312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i4316 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i4317 = data
  var i4319 = i4317[0]
  var i4318 = []
  for(var i = 0; i < i4319.length; i += 3) {
    i4318.push( new pc.Vec3( i4319[i + 0], i4319[i + 1], i4319[i + 2] ) );
  }
  i4316.positions = i4318
  i4316.positionCount = i4317[1]
  i4316.time = i4317[2]
  i4316.startWidth = i4317[3]
  i4316.endWidth = i4317[4]
  i4316.widthMultiplier = i4317[5]
  i4316.autodestruct = !!i4317[6]
  i4316.emitting = !!i4317[7]
  i4316.numCornerVertices = i4317[8]
  i4316.numCapVertices = i4317[9]
  i4316.minVertexDistance = i4317[10]
  i4316.colorGradient = i4317[11] ? new pc.ColorGradient(i4317[11][0], i4317[11][1], i4317[11][2]) : null
  i4316.startColor = new pc.Color(i4317[12], i4317[13], i4317[14], i4317[15])
  i4316.endColor = new pc.Color(i4317[16], i4317[17], i4317[18], i4317[19])
  i4316.generateLightingData = !!i4317[20]
  i4316.textureMode = i4317[21]
  i4316.alignment = i4317[22]
  i4316.widthCurve = new pc.AnimationCurve( { keys_flow: i4317[23] } )
  i4316.enabled = !!i4317[24]
  request.r(i4317[25], i4317[26], 0, i4316, 'sharedMaterial')
  var i4321 = i4317[27]
  var i4320 = []
  for(var i = 0; i < i4321.length; i += 2) {
  request.r(i4321[i + 0], i4321[i + 1], 2, i4320, '')
  }
  i4316.sharedMaterials = i4320
  i4316.receiveShadows = !!i4317[28]
  i4316.shadowCastingMode = i4317[29]
  i4316.sortingLayerID = i4317[30]
  i4316.sortingOrder = i4317[31]
  i4316.lightmapIndex = i4317[32]
  i4316.lightmapSceneIndex = i4317[33]
  i4316.lightmapScaleOffset = new pc.Vec4( i4317[34], i4317[35], i4317[36], i4317[37] )
  i4316.lightProbeUsage = i4317[38]
  i4316.reflectionProbeUsage = i4317[39]
  return i4316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i4324 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i4325 = data
  i4324.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i4325[0], i4324.main)
  i4324.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i4325[1], i4324.colorBySpeed)
  i4324.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i4325[2], i4324.colorOverLifetime)
  i4324.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i4325[3], i4324.emission)
  i4324.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i4325[4], i4324.rotationBySpeed)
  i4324.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i4325[5], i4324.rotationOverLifetime)
  i4324.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i4325[6], i4324.shape)
  i4324.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i4325[7], i4324.sizeBySpeed)
  i4324.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i4325[8], i4324.sizeOverLifetime)
  i4324.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i4325[9], i4324.textureSheetAnimation)
  i4324.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i4325[10], i4324.velocityOverLifetime)
  i4324.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i4325[11], i4324.noise)
  i4324.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i4325[12], i4324.inheritVelocity)
  i4324.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i4325[13], i4324.forceOverLifetime)
  i4324.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i4325[14], i4324.limitVelocityOverLifetime)
  i4324.useAutoRandomSeed = !!i4325[15]
  i4324.randomSeed = i4325[16]
  return i4324
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i4326 = root || new pc.ParticleSystemMain()
  var i4327 = data
  i4326.duration = i4327[0]
  i4326.loop = !!i4327[1]
  i4326.prewarm = !!i4327[2]
  i4326.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[3], i4326.startDelay)
  i4326.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[4], i4326.startLifetime)
  i4326.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[5], i4326.startSpeed)
  i4326.startSize3D = !!i4327[6]
  i4326.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[7], i4326.startSizeX)
  i4326.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[8], i4326.startSizeY)
  i4326.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[9], i4326.startSizeZ)
  i4326.startRotation3D = !!i4327[10]
  i4326.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[11], i4326.startRotationX)
  i4326.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[12], i4326.startRotationY)
  i4326.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[13], i4326.startRotationZ)
  i4326.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i4327[14], i4326.startColor)
  i4326.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4327[15], i4326.gravityModifier)
  i4326.simulationSpace = i4327[16]
  request.r(i4327[17], i4327[18], 0, i4326, 'customSimulationSpace')
  i4326.simulationSpeed = i4327[19]
  i4326.useUnscaledTime = !!i4327[20]
  i4326.scalingMode = i4327[21]
  i4326.playOnAwake = !!i4327[22]
  i4326.maxParticles = i4327[23]
  i4326.emitterVelocityMode = i4327[24]
  i4326.stopAction = i4327[25]
  return i4326
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i4328 = root || new pc.MinMaxCurve()
  var i4329 = data
  i4328.mode = i4329[0]
  i4328.curveMin = new pc.AnimationCurve( { keys_flow: i4329[1] } )
  i4328.curveMax = new pc.AnimationCurve( { keys_flow: i4329[2] } )
  i4328.curveMultiplier = i4329[3]
  i4328.constantMin = i4329[4]
  i4328.constantMax = i4329[5]
  return i4328
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i4330 = root || new pc.MinMaxGradient()
  var i4331 = data
  i4330.mode = i4331[0]
  i4330.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i4331[1], i4330.gradientMin)
  i4330.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i4331[2], i4330.gradientMax)
  i4330.colorMin = new pc.Color(i4331[3], i4331[4], i4331[5], i4331[6])
  i4330.colorMax = new pc.Color(i4331[7], i4331[8], i4331[9], i4331[10])
  return i4330
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i4332 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i4333 = data
  i4332.mode = i4333[0]
  var i4335 = i4333[1]
  var i4334 = []
  for(var i = 0; i < i4335.length; i += 1) {
    i4334.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i4335[i + 0]) );
  }
  i4332.colorKeys = i4334
  var i4337 = i4333[2]
  var i4336 = []
  for(var i = 0; i < i4337.length; i += 1) {
    i4336.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i4337[i + 0]) );
  }
  i4332.alphaKeys = i4336
  return i4332
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i4338 = root || new pc.ParticleSystemColorBySpeed()
  var i4339 = data
  i4338.enabled = !!i4339[0]
  i4338.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i4339[1], i4338.color)
  i4338.range = new pc.Vec2( i4339[2], i4339[3] )
  return i4338
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i4342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i4343 = data
  i4342.color = new pc.Color(i4343[0], i4343[1], i4343[2], i4343[3])
  i4342.time = i4343[4]
  return i4342
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i4346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i4347 = data
  i4346.alpha = i4347[0]
  i4346.time = i4347[1]
  return i4346
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i4348 = root || new pc.ParticleSystemColorOverLifetime()
  var i4349 = data
  i4348.enabled = !!i4349[0]
  i4348.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i4349[1], i4348.color)
  return i4348
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i4350 = root || new pc.ParticleSystemEmitter()
  var i4351 = data
  i4350.enabled = !!i4351[0]
  i4350.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4351[1], i4350.rateOverTime)
  i4350.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4351[2], i4350.rateOverDistance)
  var i4353 = i4351[3]
  var i4352 = []
  for(var i = 0; i < i4353.length; i += 1) {
    i4352.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i4353[i + 0]) );
  }
  i4350.bursts = i4352
  return i4350
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i4356 = root || new pc.ParticleSystemBurst()
  var i4357 = data
  i4356.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4357[0], i4356.count)
  i4356.cycleCount = i4357[1]
  i4356.minCount = i4357[2]
  i4356.maxCount = i4357[3]
  i4356.repeatInterval = i4357[4]
  i4356.time = i4357[5]
  return i4356
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i4358 = root || new pc.ParticleSystemRotationBySpeed()
  var i4359 = data
  i4358.enabled = !!i4359[0]
  i4358.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4359[1], i4358.x)
  i4358.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4359[2], i4358.y)
  i4358.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4359[3], i4358.z)
  i4358.separateAxes = !!i4359[4]
  i4358.range = new pc.Vec2( i4359[5], i4359[6] )
  return i4358
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i4360 = root || new pc.ParticleSystemRotationOverLifetime()
  var i4361 = data
  i4360.enabled = !!i4361[0]
  i4360.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4361[1], i4360.x)
  i4360.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4361[2], i4360.y)
  i4360.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4361[3], i4360.z)
  i4360.separateAxes = !!i4361[4]
  return i4360
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i4362 = root || new pc.ParticleSystemShape()
  var i4363 = data
  i4362.enabled = !!i4363[0]
  i4362.shapeType = i4363[1]
  i4362.randomDirectionAmount = i4363[2]
  i4362.sphericalDirectionAmount = i4363[3]
  i4362.randomPositionAmount = i4363[4]
  i4362.alignToDirection = !!i4363[5]
  i4362.radius = i4363[6]
  i4362.radiusMode = i4363[7]
  i4362.radiusSpread = i4363[8]
  i4362.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4363[9], i4362.radiusSpeed)
  i4362.radiusThickness = i4363[10]
  i4362.angle = i4363[11]
  i4362.length = i4363[12]
  i4362.boxThickness = new pc.Vec3( i4363[13], i4363[14], i4363[15] )
  i4362.meshShapeType = i4363[16]
  request.r(i4363[17], i4363[18], 0, i4362, 'mesh')
  request.r(i4363[19], i4363[20], 0, i4362, 'meshRenderer')
  request.r(i4363[21], i4363[22], 0, i4362, 'skinnedMeshRenderer')
  i4362.useMeshMaterialIndex = !!i4363[23]
  i4362.meshMaterialIndex = i4363[24]
  i4362.useMeshColors = !!i4363[25]
  i4362.normalOffset = i4363[26]
  i4362.arc = i4363[27]
  i4362.arcMode = i4363[28]
  i4362.arcSpread = i4363[29]
  i4362.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4363[30], i4362.arcSpeed)
  i4362.donutRadius = i4363[31]
  i4362.position = new pc.Vec3( i4363[32], i4363[33], i4363[34] )
  i4362.rotation = new pc.Vec3( i4363[35], i4363[36], i4363[37] )
  i4362.scale = new pc.Vec3( i4363[38], i4363[39], i4363[40] )
  return i4362
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i4364 = root || new pc.ParticleSystemSizeBySpeed()
  var i4365 = data
  i4364.enabled = !!i4365[0]
  i4364.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4365[1], i4364.x)
  i4364.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4365[2], i4364.y)
  i4364.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4365[3], i4364.z)
  i4364.separateAxes = !!i4365[4]
  i4364.range = new pc.Vec2( i4365[5], i4365[6] )
  return i4364
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i4366 = root || new pc.ParticleSystemSizeOverLifetime()
  var i4367 = data
  i4366.enabled = !!i4367[0]
  i4366.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4367[1], i4366.x)
  i4366.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4367[2], i4366.y)
  i4366.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4367[3], i4366.z)
  i4366.separateAxes = !!i4367[4]
  return i4366
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i4368 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i4369 = data
  i4368.enabled = !!i4369[0]
  i4368.mode = i4369[1]
  i4368.animation = i4369[2]
  i4368.numTilesX = i4369[3]
  i4368.numTilesY = i4369[4]
  i4368.useRandomRow = !!i4369[5]
  i4368.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4369[6], i4368.frameOverTime)
  i4368.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4369[7], i4368.startFrame)
  i4368.cycleCount = i4369[8]
  i4368.rowIndex = i4369[9]
  i4368.flipU = i4369[10]
  i4368.flipV = i4369[11]
  i4368.spriteCount = i4369[12]
  var i4371 = i4369[13]
  var i4370 = []
  for(var i = 0; i < i4371.length; i += 2) {
  request.r(i4371[i + 0], i4371[i + 1], 2, i4370, '')
  }
  i4368.sprites = i4370
  return i4368
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i4374 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i4375 = data
  i4374.enabled = !!i4375[0]
  i4374.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[1], i4374.x)
  i4374.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[2], i4374.y)
  i4374.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[3], i4374.z)
  i4374.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[4], i4374.radial)
  i4374.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[5], i4374.speedModifier)
  i4374.space = i4375[6]
  i4374.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[7], i4374.orbitalX)
  i4374.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[8], i4374.orbitalY)
  i4374.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[9], i4374.orbitalZ)
  i4374.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[10], i4374.orbitalOffsetX)
  i4374.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[11], i4374.orbitalOffsetY)
  i4374.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[12], i4374.orbitalOffsetZ)
  return i4374
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i4376 = root || new pc.ParticleSystemNoise()
  var i4377 = data
  i4376.enabled = !!i4377[0]
  i4376.separateAxes = !!i4377[1]
  i4376.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[2], i4376.strengthX)
  i4376.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[3], i4376.strengthY)
  i4376.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[4], i4376.strengthZ)
  i4376.frequency = i4377[5]
  i4376.damping = !!i4377[6]
  i4376.octaveCount = i4377[7]
  i4376.octaveMultiplier = i4377[8]
  i4376.octaveScale = i4377[9]
  i4376.quality = i4377[10]
  i4376.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[11], i4376.scrollSpeed)
  i4376.scrollSpeedMultiplier = i4377[12]
  i4376.remapEnabled = !!i4377[13]
  i4376.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[14], i4376.remapX)
  i4376.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[15], i4376.remapY)
  i4376.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[16], i4376.remapZ)
  i4376.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[17], i4376.positionAmount)
  i4376.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[18], i4376.rotationAmount)
  i4376.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[19], i4376.sizeAmount)
  return i4376
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i4378 = root || new pc.ParticleSystemInheritVelocity()
  var i4379 = data
  i4378.enabled = !!i4379[0]
  i4378.mode = i4379[1]
  i4378.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4379[2], i4378.curve)
  return i4378
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i4380 = root || new pc.ParticleSystemForceOverLifetime()
  var i4381 = data
  i4380.enabled = !!i4381[0]
  i4380.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4381[1], i4380.x)
  i4380.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4381[2], i4380.y)
  i4380.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4381[3], i4380.z)
  i4380.space = i4381[4]
  i4380.randomized = !!i4381[5]
  return i4380
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i4382 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i4383 = data
  i4382.enabled = !!i4383[0]
  i4382.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[1], i4382.limit)
  i4382.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[2], i4382.limitX)
  i4382.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[3], i4382.limitY)
  i4382.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[4], i4382.limitZ)
  i4382.dampen = i4383[5]
  i4382.separateAxes = !!i4383[6]
  i4382.space = i4383[7]
  i4382.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[8], i4382.drag)
  i4382.multiplyDragByParticleSize = !!i4383[9]
  i4382.multiplyDragByParticleVelocity = !!i4383[10]
  return i4382
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i4384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i4385 = data
  request.r(i4385[0], i4385[1], 0, i4384, 'mesh')
  i4384.meshCount = i4385[2]
  i4384.activeVertexStreamsCount = i4385[3]
  i4384.alignment = i4385[4]
  i4384.renderMode = i4385[5]
  i4384.sortMode = i4385[6]
  i4384.lengthScale = i4385[7]
  i4384.velocityScale = i4385[8]
  i4384.cameraVelocityScale = i4385[9]
  i4384.normalDirection = i4385[10]
  i4384.sortingFudge = i4385[11]
  i4384.minParticleSize = i4385[12]
  i4384.maxParticleSize = i4385[13]
  i4384.pivot = new pc.Vec3( i4385[14], i4385[15], i4385[16] )
  request.r(i4385[17], i4385[18], 0, i4384, 'trailMaterial')
  i4384.applyActiveColorSpace = !!i4385[19]
  i4384.enabled = !!i4385[20]
  request.r(i4385[21], i4385[22], 0, i4384, 'sharedMaterial')
  var i4387 = i4385[23]
  var i4386 = []
  for(var i = 0; i < i4387.length; i += 2) {
  request.r(i4387[i + 0], i4387[i + 1], 2, i4386, '')
  }
  i4384.sharedMaterials = i4386
  i4384.receiveShadows = !!i4385[24]
  i4384.shadowCastingMode = i4385[25]
  i4384.sortingLayerID = i4385[26]
  i4384.sortingOrder = i4385[27]
  i4384.lightmapIndex = i4385[28]
  i4384.lightmapSceneIndex = i4385[29]
  i4384.lightmapScaleOffset = new pc.Vec4( i4385[30], i4385[31], i4385[32], i4385[33] )
  i4384.lightProbeUsage = i4385[34]
  i4384.reflectionProbeUsage = i4385[35]
  return i4384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i4388 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i4389 = data
  request.r(i4389[0], i4389[1], 0, i4388, 'sharedMesh')
  return i4388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i4390 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i4391 = data
  i4390.center = new pc.Vec3( i4391[0], i4391[1], i4391[2] )
  i4390.size = new pc.Vec3( i4391[3], i4391[4], i4391[5] )
  i4390.enabled = !!i4391[6]
  i4390.isTrigger = !!i4391[7]
  request.r(i4391[8], i4391[9], 0, i4390, 'material')
  return i4390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i4392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i4393 = data
  i4392.center = new pc.Vec3( i4393[0], i4393[1], i4393[2] )
  i4392.radius = i4393[3]
  i4392.enabled = !!i4393[4]
  i4392.isTrigger = !!i4393[5]
  request.r(i4393[6], i4393[7], 0, i4392, 'material')
  return i4392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i4394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i4395 = data
  i4394.planeDistance = i4395[0]
  i4394.referencePixelsPerUnit = i4395[1]
  i4394.isFallbackOverlay = !!i4395[2]
  i4394.renderMode = i4395[3]
  i4394.renderOrder = i4395[4]
  i4394.sortingLayerName = i4395[5]
  i4394.sortingOrder = i4395[6]
  i4394.scaleFactor = i4395[7]
  request.r(i4395[8], i4395[9], 0, i4394, 'worldCamera')
  i4394.overrideSorting = !!i4395[10]
  i4394.pixelPerfect = !!i4395[11]
  i4394.targetDisplay = i4395[12]
  i4394.overridePixelPerfect = !!i4395[13]
  i4394.enabled = !!i4395[14]
  return i4394
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i4396 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i4397 = data
  i4396.m_UiScaleMode = i4397[0]
  i4396.m_ReferencePixelsPerUnit = i4397[1]
  i4396.m_ScaleFactor = i4397[2]
  i4396.m_ReferenceResolution = new pc.Vec2( i4397[3], i4397[4] )
  i4396.m_ScreenMatchMode = i4397[5]
  i4396.m_MatchWidthOrHeight = i4397[6]
  i4396.m_PhysicalUnit = i4397[7]
  i4396.m_FallbackScreenDPI = i4397[8]
  i4396.m_DefaultSpriteDPI = i4397[9]
  i4396.m_DynamicPixelsPerUnit = i4397[10]
  i4396.m_PresetInfoIsWorld = !!i4397[11]
  return i4396
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i4398 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i4399 = data
  i4398.m_IgnoreReversedGraphics = !!i4399[0]
  i4398.m_BlockingObjects = i4399[1]
  i4398.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i4399[2] )
  return i4398
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i4400 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i4401 = data
  i4400.cullTransparentMesh = !!i4401[0]
  return i4400
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i4402 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i4403 = data
  i4402.m_hasFontAssetChanged = !!i4403[0]
  request.r(i4403[1], i4403[2], 0, i4402, 'm_baseMaterial')
  i4402.m_maskOffset = new pc.Vec4( i4403[3], i4403[4], i4403[5], i4403[6] )
  i4402.m_text = i4403[7]
  i4402.m_isRightToLeft = !!i4403[8]
  request.r(i4403[9], i4403[10], 0, i4402, 'm_fontAsset')
  request.r(i4403[11], i4403[12], 0, i4402, 'm_sharedMaterial')
  var i4405 = i4403[13]
  var i4404 = []
  for(var i = 0; i < i4405.length; i += 2) {
  request.r(i4405[i + 0], i4405[i + 1], 2, i4404, '')
  }
  i4402.m_fontSharedMaterials = i4404
  request.r(i4403[14], i4403[15], 0, i4402, 'm_fontMaterial')
  var i4407 = i4403[16]
  var i4406 = []
  for(var i = 0; i < i4407.length; i += 2) {
  request.r(i4407[i + 0], i4407[i + 1], 2, i4406, '')
  }
  i4402.m_fontMaterials = i4406
  i4402.m_fontColor32 = UnityEngine.Color32.ConstructColor(i4403[17], i4403[18], i4403[19], i4403[20])
  i4402.m_fontColor = new pc.Color(i4403[21], i4403[22], i4403[23], i4403[24])
  i4402.m_enableVertexGradient = !!i4403[25]
  i4402.m_colorMode = i4403[26]
  i4402.m_fontColorGradient = request.d('TMPro.VertexGradient', i4403[27], i4402.m_fontColorGradient)
  request.r(i4403[28], i4403[29], 0, i4402, 'm_fontColorGradientPreset')
  request.r(i4403[30], i4403[31], 0, i4402, 'm_spriteAsset')
  i4402.m_tintAllSprites = !!i4403[32]
  request.r(i4403[33], i4403[34], 0, i4402, 'm_StyleSheet')
  i4402.m_TextStyleHashCode = i4403[35]
  i4402.m_overrideHtmlColors = !!i4403[36]
  i4402.m_faceColor = UnityEngine.Color32.ConstructColor(i4403[37], i4403[38], i4403[39], i4403[40])
  i4402.m_fontSize = i4403[41]
  i4402.m_fontSizeBase = i4403[42]
  i4402.m_fontWeight = i4403[43]
  i4402.m_enableAutoSizing = !!i4403[44]
  i4402.m_fontSizeMin = i4403[45]
  i4402.m_fontSizeMax = i4403[46]
  i4402.m_fontStyle = i4403[47]
  i4402.m_HorizontalAlignment = i4403[48]
  i4402.m_VerticalAlignment = i4403[49]
  i4402.m_textAlignment = i4403[50]
  i4402.m_characterSpacing = i4403[51]
  i4402.m_characterHorizontalScale = i4403[52]
  i4402.m_wordSpacing = i4403[53]
  i4402.m_lineSpacing = i4403[54]
  i4402.m_lineSpacingMax = i4403[55]
  i4402.m_paragraphSpacing = i4403[56]
  i4402.m_charWidthMaxAdj = i4403[57]
  i4402.m_TextWrappingMode = i4403[58]
  i4402.m_wordWrappingRatios = i4403[59]
  i4402.m_overflowMode = i4403[60]
  request.r(i4403[61], i4403[62], 0, i4402, 'm_linkedTextComponent')
  request.r(i4403[63], i4403[64], 0, i4402, 'parentLinkedComponent')
  i4402.m_enableKerning = !!i4403[65]
  var i4409 = i4403[66]
  var i4408 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4409.length; i += 1) {
    i4408.add(i4409[i + 0]);
  }
  i4402.m_ActiveFontFeatures = i4408
  i4402.m_enableExtraPadding = !!i4403[67]
  i4402.checkPaddingRequired = !!i4403[68]
  i4402.m_isRichText = !!i4403[69]
  i4402.m_parseCtrlCharacters = !!i4403[70]
  i4402.m_isOrthographic = !!i4403[71]
  i4402.m_isCullingEnabled = !!i4403[72]
  i4402.m_horizontalMapping = i4403[73]
  i4402.m_verticalMapping = i4403[74]
  i4402.m_uvLineOffset = i4403[75]
  i4402.m_geometrySortingOrder = i4403[76]
  i4402.m_IsTextObjectScaleStatic = !!i4403[77]
  i4402.m_VertexBufferAutoSizeReduction = !!i4403[78]
  i4402.m_useMaxVisibleDescender = !!i4403[79]
  i4402.m_pageToDisplay = i4403[80]
  i4402.m_margin = new pc.Vec4( i4403[81], i4403[82], i4403[83], i4403[84] )
  i4402.m_isUsingLegacyAnimationComponent = !!i4403[85]
  i4402.m_isVolumetricText = !!i4403[86]
  request.r(i4403[87], i4403[88], 0, i4402, 'm_Material')
  i4402.m_EmojiFallbackSupport = !!i4403[89]
  i4402.m_Maskable = !!i4403[90]
  i4402.m_Color = new pc.Color(i4403[91], i4403[92], i4403[93], i4403[94])
  i4402.m_RaycastTarget = !!i4403[95]
  i4402.m_RaycastPadding = new pc.Vec4( i4403[96], i4403[97], i4403[98], i4403[99] )
  return i4402
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i4410 = root || request.c( 'UnityEngine.UI.Image' )
  var i4411 = data
  request.r(i4411[0], i4411[1], 0, i4410, 'm_Sprite')
  i4410.m_Type = i4411[2]
  i4410.m_PreserveAspect = !!i4411[3]
  i4410.m_FillCenter = !!i4411[4]
  i4410.m_FillMethod = i4411[5]
  i4410.m_FillAmount = i4411[6]
  i4410.m_FillClockwise = !!i4411[7]
  i4410.m_FillOrigin = i4411[8]
  i4410.m_UseSpriteMesh = !!i4411[9]
  i4410.m_PixelsPerUnitMultiplier = i4411[10]
  request.r(i4411[11], i4411[12], 0, i4410, 'm_Material')
  i4410.m_Maskable = !!i4411[13]
  i4410.m_Color = new pc.Color(i4411[14], i4411[15], i4411[16], i4411[17])
  i4410.m_RaycastTarget = !!i4411[18]
  i4410.m_RaycastPadding = new pc.Vec4( i4411[19], i4411[20], i4411[21], i4411[22] )
  return i4410
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i4412 = root || request.c( 'UnityEngine.UI.Button' )
  var i4413 = data
  i4412.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i4413[0], i4412.m_OnClick)
  i4412.m_Navigation = request.d('UnityEngine.UI.Navigation', i4413[1], i4412.m_Navigation)
  i4412.m_Transition = i4413[2]
  i4412.m_Colors = request.d('UnityEngine.UI.ColorBlock', i4413[3], i4412.m_Colors)
  i4412.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i4413[4], i4412.m_SpriteState)
  i4412.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i4413[5], i4412.m_AnimationTriggers)
  i4412.m_Interactable = !!i4413[6]
  request.r(i4413[7], i4413[8], 0, i4412, 'm_TargetGraphic')
  return i4412
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i4414 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i4415 = data
  i4414.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4415[0], i4414.m_PersistentCalls)
  return i4414
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i4416 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i4417 = data
  var i4419 = i4417[0]
  var i4418 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i4419.length; i += 1) {
    i4418.add(request.d('UnityEngine.Events.PersistentCall', i4419[i + 0]));
  }
  i4416.m_Calls = i4418
  return i4416
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i4422 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i4423 = data
  request.r(i4423[0], i4423[1], 0, i4422, 'm_Target')
  i4422.m_TargetAssemblyTypeName = i4423[2]
  i4422.m_MethodName = i4423[3]
  i4422.m_Mode = i4423[4]
  i4422.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i4423[5], i4422.m_Arguments)
  i4422.m_CallState = i4423[6]
  return i4422
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i4424 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i4425 = data
  i4424.m_Mode = i4425[0]
  i4424.m_WrapAround = !!i4425[1]
  request.r(i4425[2], i4425[3], 0, i4424, 'm_SelectOnUp')
  request.r(i4425[4], i4425[5], 0, i4424, 'm_SelectOnDown')
  request.r(i4425[6], i4425[7], 0, i4424, 'm_SelectOnLeft')
  request.r(i4425[8], i4425[9], 0, i4424, 'm_SelectOnRight')
  return i4424
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i4426 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i4427 = data
  i4426.m_NormalColor = new pc.Color(i4427[0], i4427[1], i4427[2], i4427[3])
  i4426.m_HighlightedColor = new pc.Color(i4427[4], i4427[5], i4427[6], i4427[7])
  i4426.m_PressedColor = new pc.Color(i4427[8], i4427[9], i4427[10], i4427[11])
  i4426.m_SelectedColor = new pc.Color(i4427[12], i4427[13], i4427[14], i4427[15])
  i4426.m_DisabledColor = new pc.Color(i4427[16], i4427[17], i4427[18], i4427[19])
  i4426.m_ColorMultiplier = i4427[20]
  i4426.m_FadeDuration = i4427[21]
  return i4426
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i4428 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i4429 = data
  request.r(i4429[0], i4429[1], 0, i4428, 'm_HighlightedSprite')
  request.r(i4429[2], i4429[3], 0, i4428, 'm_PressedSprite')
  request.r(i4429[4], i4429[5], 0, i4428, 'm_SelectedSprite')
  request.r(i4429[6], i4429[7], 0, i4428, 'm_DisabledSprite')
  return i4428
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i4430 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i4431 = data
  i4430.m_NormalTrigger = i4431[0]
  i4430.m_HighlightedTrigger = i4431[1]
  i4430.m_PressedTrigger = i4431[2]
  i4430.m_SelectedTrigger = i4431[3]
  i4430.m_DisabledTrigger = i4431[4]
  return i4430
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i4432 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i4433 = data
  i4432.m_StartCorner = i4433[0]
  i4432.m_StartAxis = i4433[1]
  i4432.m_CellSize = new pc.Vec2( i4433[2], i4433[3] )
  i4432.m_Spacing = new pc.Vec2( i4433[4], i4433[5] )
  i4432.m_Constraint = i4433[6]
  i4432.m_ConstraintCount = i4433[7]
  i4432.m_Padding = UnityEngine.RectOffset.FromPaddings(i4433[8], i4433[9], i4433[10], i4433[11])
  i4432.m_ChildAlignment = i4433[12]
  return i4432
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i4434 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i4435 = data
  i4434.m_Spacing = i4435[0]
  i4434.m_ChildForceExpandWidth = !!i4435[1]
  i4434.m_ChildForceExpandHeight = !!i4435[2]
  i4434.m_ChildControlWidth = !!i4435[3]
  i4434.m_ChildControlHeight = !!i4435[4]
  i4434.m_ChildScaleWidth = !!i4435[5]
  i4434.m_ChildScaleHeight = !!i4435[6]
  i4434.m_ReverseArrangement = !!i4435[7]
  i4434.m_Padding = UnityEngine.RectOffset.FromPaddings(i4435[8], i4435[9], i4435[10], i4435[11])
  i4434.m_ChildAlignment = i4435[12]
  return i4434
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i4436 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i4437 = data
  i4436.m_HorizontalFit = i4437[0]
  i4436.m_VerticalFit = i4437[1]
  return i4436
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i4438 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i4439 = data
  request.r(i4439[0], i4439[1], 0, i4438, 'm_Content')
  i4438.m_Horizontal = !!i4439[2]
  i4438.m_Vertical = !!i4439[3]
  i4438.m_MovementType = i4439[4]
  i4438.m_Elasticity = i4439[5]
  i4438.m_Inertia = !!i4439[6]
  i4438.m_DecelerationRate = i4439[7]
  i4438.m_ScrollSensitivity = i4439[8]
  request.r(i4439[9], i4439[10], 0, i4438, 'm_Viewport')
  request.r(i4439[11], i4439[12], 0, i4438, 'm_HorizontalScrollbar')
  request.r(i4439[13], i4439[14], 0, i4438, 'm_VerticalScrollbar')
  i4438.m_HorizontalScrollbarVisibility = i4439[15]
  i4438.m_VerticalScrollbarVisibility = i4439[16]
  i4438.m_HorizontalScrollbarSpacing = i4439[17]
  i4438.m_VerticalScrollbarSpacing = i4439[18]
  i4438.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i4439[19], i4438.m_OnValueChanged)
  return i4438
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i4440 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i4441 = data
  i4440.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4441[0], i4440.m_PersistentCalls)
  return i4440
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i4442 = root || request.c( 'UnityEngine.UI.Mask' )
  var i4443 = data
  i4442.m_ShowMaskGraphic = !!i4443[0]
  return i4442
}

Deserializers["UnityEngine.UI.Scrollbar"] = function (request, data, root) {
  var i4444 = root || request.c( 'UnityEngine.UI.Scrollbar' )
  var i4445 = data
  request.r(i4445[0], i4445[1], 0, i4444, 'm_HandleRect')
  i4444.m_Direction = i4445[2]
  i4444.m_Value = i4445[3]
  i4444.m_Size = i4445[4]
  i4444.m_NumberOfSteps = i4445[5]
  i4444.m_OnValueChanged = request.d('UnityEngine.UI.Scrollbar+ScrollEvent', i4445[6], i4444.m_OnValueChanged)
  i4444.m_Navigation = request.d('UnityEngine.UI.Navigation', i4445[7], i4444.m_Navigation)
  i4444.m_Transition = i4445[8]
  i4444.m_Colors = request.d('UnityEngine.UI.ColorBlock', i4445[9], i4444.m_Colors)
  i4444.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i4445[10], i4444.m_SpriteState)
  i4444.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i4445[11], i4444.m_AnimationTriggers)
  i4444.m_Interactable = !!i4445[12]
  request.r(i4445[13], i4445[14], 0, i4444, 'm_TargetGraphic')
  return i4444
}

Deserializers["UnityEngine.UI.Scrollbar+ScrollEvent"] = function (request, data, root) {
  var i4446 = root || request.c( 'UnityEngine.UI.Scrollbar+ScrollEvent' )
  var i4447 = data
  i4446.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4447[0], i4446.m_PersistentCalls)
  return i4446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i4448 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i4449 = data
  i4448.m_Alpha = i4449[0]
  i4448.m_Interactable = !!i4449[1]
  i4448.m_BlocksRaycasts = !!i4449[2]
  i4448.m_IgnoreParentGroups = !!i4449[3]
  i4448.enabled = !!i4449[4]
  return i4448
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i4450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i4451 = data
  i4450.name = i4451[0]
  i4450.index = i4451[1]
  i4450.startup = !!i4451[2]
  return i4450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i4452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i4453 = data
  i4452.type = i4453[0]
  i4452.color = new pc.Color(i4453[1], i4453[2], i4453[3], i4453[4])
  i4452.cullingMask = i4453[5]
  i4452.intensity = i4453[6]
  i4452.range = i4453[7]
  i4452.spotAngle = i4453[8]
  i4452.shadows = i4453[9]
  i4452.shadowNormalBias = i4453[10]
  i4452.shadowBias = i4453[11]
  i4452.shadowStrength = i4453[12]
  i4452.shadowResolution = i4453[13]
  i4452.lightmapBakeType = i4453[14]
  i4452.renderMode = i4453[15]
  request.r(i4453[16], i4453[17], 0, i4452, 'cookie')
  i4452.cookieSize = i4453[18]
  i4452.shadowNearPlane = i4453[19]
  i4452.occlusionMaskChannel = i4453[20]
  i4452.isBaked = !!i4453[21]
  i4452.mixedLightingMode = i4453[22]
  i4452.enabled = !!i4453[23]
  return i4452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i4454 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i4455 = data
  request.r(i4455[0], i4455[1], 0, i4454, 'clip')
  request.r(i4455[2], i4455[3], 0, i4454, 'outputAudioMixerGroup')
  i4454.playOnAwake = !!i4455[4]
  i4454.loop = !!i4455[5]
  i4454.time = i4455[6]
  i4454.volume = i4455[7]
  i4454.pitch = i4455[8]
  i4454.enabled = !!i4455[9]
  return i4454
}

Deserializers["PlayableSpatialAudio"] = function (request, data, root) {
  var i4456 = root || request.c( 'PlayableSpatialAudio' )
  var i4457 = data
  request.r(i4457[0], i4457[1], 0, i4456, 'listener')
  request.r(i4457[2], i4457[3], 0, i4456, 'source')
  i4456.volume = i4457[4]
  i4456.minDistance = i4457[5]
  i4456.maxDistance = i4457[6]
  i4456.linear = !!i4457[7]
  return i4456
}

Deserializers["StealEggGame"] = function (request, data, root) {
  var i4458 = root || request.c( 'StealEggGame' )
  var i4459 = data
  var i4461 = i4459[0]
  var i4460 = []
  for(var i = 0; i < i4461.length; i += 1) {
    i4460.push( request.d('StealEggGame+PetInfo', i4461[i + 0]) );
  }
  i4458.petCatalog = i4460
  var i4463 = i4459[1]
  var i4462 = []
  for(var i = 0; i < i4463.length; i += 1) {
    i4462.push( request.d('StealEggGame+TrailInfo', i4463[i + 0]) );
  }
  i4458.trails = i4462
  var i4465 = i4459[2]
  var i4464 = []
  for(var i = 0; i < i4465.length; i += 1) {
    i4464.push( request.d('StealEggGame+BoostInfo', i4465[i + 0]) );
  }
  i4458.luckyEggRewards = i4464
  request.r(i4459[3], i4459[4], 0, i4458, 'playerHair')
  var i4467 = i4459[5]
  var i4466 = []
  for(var i = 0; i < i4467.length; i += 2) {
  request.r(i4467[i + 0], i4467[i + 1], 2, i4466, '')
  }
  i4458.outfitHairs = i4466
  var i4469 = i4459[6]
  var i4468 = []
  for(var i = 0; i < i4469.length; i += 2) {
  request.r(i4469[i + 0], i4469[i + 1], 2, i4468, '')
  }
  i4458.outfitFaces = i4468
  var i4471 = i4459[7]
  var i4470 = []
  for(var i = 0; i < i4471.length; i += 2) {
  request.r(i4471[i + 0], i4471[i + 1], 2, i4470, '')
  }
  i4458.outfitShirts = i4470
  var i4473 = i4459[8]
  var i4472 = []
  for(var i = 0; i < i4473.length; i += 2) {
  request.r(i4473[i + 0], i4473[i + 1], 2, i4472, '')
  }
  i4458.outfitPants = i4472
  var i4475 = i4459[9]
  var i4474 = []
  for(var i = 0; i < i4475.length; i += 2) {
  request.r(i4475[i + 0], i4475[i + 1], 2, i4474, '')
  }
  i4458.rarityMaterials = i4474
  var i4477 = i4459[10]
  var i4476 = []
  for(var i = 0; i < i4477.length; i += 2) {
  request.r(i4477[i + 0], i4477[i + 1], 2, i4476, '')
  }
  i4458.rarityWorldMaterials = i4476
  request.r(i4459[11], i4459[12], 0, i4458, 'rarityFont')
  var i4479 = i4459[13]
  var i4478 = []
  for(var i = 0; i < i4479.length; i += 2) {
  request.r(i4479[i + 0], i4479[i + 1], 2, i4478, '')
  }
  i4458.rarityFrames = i4478
  request.r(i4459[14], i4459[15], 0, i4458, 'batIcon')
  request.r(i4459[16], i4459[17], 0, i4458, 'nightIcon')
  request.r(i4459[18], i4459[19], 0, i4458, 'dayIcon')
  request.r(i4459[20], i4459[21], 0, i4458, 'trainBoostIcon')
  request.r(i4459[22], i4459[23], 0, i4458, 'incubateBoostIcon')
  request.r(i4459[24], i4459[25], 0, i4458, 'batPrefab')
  request.r(i4459[26], i4459[27], 0, i4458, 'luckyEggPrefab')
  request.r(i4459[28], i4459[29], 0, i4458, 'incubateTimerPrefab')
  request.r(i4459[30], i4459[31], 0, i4458, 'floatingTextPrefab')
  request.r(i4459[32], i4459[33], 0, i4458, 'npcTemplate')
  request.r(i4459[34], i4459[35], 0, i4458, 'footstepSound')
  request.r(i4459[36], i4459[37], 0, i4458, 'clickSound')
  request.r(i4459[38], i4459[39], 0, i4458, 'closeSound')
  request.r(i4459[40], i4459[41], 0, i4458, 'rewardSound')
  request.r(i4459[42], i4459[43], 0, i4458, 'upgradeSound')
  request.r(i4459[44], i4459[45], 0, i4458, 'trainSound')
  request.r(i4459[46], i4459[47], 0, i4458, 'equipSound')
  request.r(i4459[48], i4459[49], 0, i4458, 'fuseSound')
  request.r(i4459[50], i4459[51], 0, i4458, 'frogSound')
  request.r(i4459[52], i4459[53], 0, i4458, 'progressSound')
  request.r(i4459[54], i4459[55], 0, i4458, 'warningSound')
  request.r(i4459[56], i4459[57], 0, i4458, 'crackSound')
  request.r(i4459[58], i4459[59], 0, i4458, 'popupSound')
  i4458.coopPrices = i4459[60]
  i4458.coopModelByLevel = i4459[61]
  i4458.coopBaseSlots = i4459[62]
  i4458.treadmillPrices = i4459[63]
  i4458.treadmillTrainValues = i4459[64]
  i4458.priceMultiplier = i4459[65]
  i4458.dayDuration = i4459[66]
  i4458.nightDuration = i4459[67]
  i4458.nightIncubateMultiplier = i4459[68]
  i4458.dayLightIntensity = i4459[69]
  i4458.lightTransition = i4459[70]
  i4458.incomeMultiplierBySize = i4459[71]
  i4458.sellPriceMultiplier = i4459[72]
  i4458.luckyFrogFeedMultiplier = i4459[73]
  i4458.trainTick = i4459[74]
  i4458.hatchDuration = i4459[75]
  i4458.luckyEggOpenDuration = i4459[76]
  i4458.fuseDuration = i4459[77]
  i4458.npcCount = i4459[78]
  i4458.npcCoopSmallPets = i4459[79]
  i4458.npcCoopBigPetSize = i4459[80]
  i4458.npcMinSpeed = i4459[81]
  i4458.npcMaxSpeed = i4459[82]
  i4458.batCooldown = i4459[83]
  i4458.batForce = i4459[84]
  var i4481 = i4459[85]
  var i4480 = []
  for(var i = 0; i < i4481.length; i += 1) {
    i4480.push( request.d('StealEggGame+House', i4481[i + 0]) );
  }
  i4458.houses = i4480
  request.r(i4459[86], i4459[87], 0, i4458, 'fuseMachine')
  request.r(i4459[88], i4459[89], 0, i4458, 'exchangeShop')
  request.r(i4459[90], i4459[91], 0, i4458, 'luckyFrog')
  request.r(i4459[92], i4459[93], 0, i4458, 'luckyEggSpawn')
  request.r(i4459[94], i4459[95], 0, i4458, 'luckyEggTarget')
  request.r(i4459[96], i4459[97], 0, i4458, 'teleportPoint')
  request.r(i4459[98], i4459[99], 0, i4458, 'lobbyCenter')
  request.r(i4459[100], i4459[101], 0, i4458, 'originalUI')
  i4458.lobbySize = new pc.Vec3( i4459[102], i4459[103], i4459[104] )
  request.r(i4459[105], i4459[106], 0, i4458, 'combatArea')
  request.r(i4459[107], i4459[108], 0, i4458, 'nightGraphic')
  request.r(i4459[109], i4459[110], 0, i4458, 'nightText')
  request.r(i4459[111], i4459[112], 0, i4458, 'sun')
  var i4483 = i4459[113]
  var i4482 = []
  for(var i = 0; i < i4483.length; i += 2) {
  request.r(i4483[i + 0], i4483[i + 1], 2, i4482, '')
  }
  i4458.npcModels = i4482
  var i4485 = i4459[114]
  var i4484 = []
  for(var i = 0; i < i4485.length; i += 1) {
    i4484.push( request.d('StealEggGame+Zone', i4485[i + 0]) );
  }
  i4458.zones = i4484
  request.r(i4459[115], i4459[116], 0, i4458, 'player')
  request.r(i4459[117], i4459[118], 0, i4458, 'home')
  request.r(i4459[119], i4459[120], 0, i4458, 'safePoint')
  request.r(i4459[121], i4459[122], 0, i4458, 'rightHandSlot')
  request.r(i4459[123], i4459[124], 0, i4458, 'playerCoopArea')
  request.r(i4459[125], i4459[126], 0, i4458, 'trainingPoint')
  request.r(i4459[127], i4459[128], 0, i4458, 'gameCamera')
  request.r(i4459[129], i4459[130], 0, i4458, 'playerAnimator')
  request.r(i4459[131], i4459[132], 0, i4458, 'ragdoll')
  request.r(i4459[133], i4459[134], 0, i4458, 'uiFont')
  request.r(i4459[135], i4459[136], 0, i4458, 'guideMaterial')
  request.r(i4459[137], i4459[138], 0, i4458, 'roundedSprite')
  request.r(i4459[139], i4459[140], 0, i4458, 'circleSprite')
  request.r(i4459[141], i4459[142], 0, i4458, 'moneyIcon')
  request.r(i4459[143], i4459[144], 0, i4458, 'speedIcon')
  request.r(i4459[145], i4459[146], 0, i4458, 'stealSound')
  request.r(i4459[147], i4459[148], 0, i4458, 'deliverSound')
  request.r(i4459[149], i4459[150], 0, i4458, 'hatchSound')
  request.r(i4459[151], i4459[152], 0, i4458, 'caughtSound')
  request.r(i4459[153], i4459[154], 0, i4458, 'eggBreakEffect')
  request.r(i4459[155], i4459[156], 0, i4458, 'sourceHud')
  i4458.capturesForEndCard = i4459[157]
  i4458.moveSpeed = i4459[158]
  i4458.incubationSeconds = i4459[159]
  i4458.jumpHeight = i4459[160]
  i4458.gravity = i4459[161]
  i4458.baseMoveSpeed = i4459[162]
  i4458.speedPowerMultiplier = i4459[163]
  i4458.trainingPowerPerTick = i4459[164]
  i4458.startingMoney = i4459[165]
  i4458.slowMode = !!i4459[166]
  i4458.hitWindup = i4459[167]
  i4458.knockdownDuration = i4459[168]
  i4458.getUpDuration = i4459[169]
  request.r(i4459[170], i4459[171], 0, i4458, 'guide')
  i4458.hudUI = request.d('StealEggGame+HudUI', i4459[172], i4458.hudUI)
  i4458.petsUI = request.d('StealEggGame+PetsPopupUI', i4459[173], i4458.petsUI)
  i4458.incubateUI = request.d('StealEggGame+IncubatePopupUI', i4459[174], i4458.incubateUI)
  i4458.inventoryUI = request.d('StealEggGame+InventoryUI', i4459[175], i4458.inventoryUI)
  i4458.rewardUI = request.d('StealEggGame+RewardUI', i4459[176], i4458.rewardUI)
  i4458.dialogUI = request.d('StealEggGame+DialogUI', i4459[177], i4458.dialogUI)
  request.r(i4459[178], i4459[179], 0, i4458, 'warningPanel')
  i4458.treadmillUI = request.d('StealEggGame+TreadmillPanelUI', i4459[180], i4458.treadmillUI)
  i4458.indexUI = request.d('StealEggGame+IndexUI', i4459[181], i4458.indexUI)
  i4458.settingsUI = request.d('StealEggGame+LockedPanelUI', i4459[182], i4458.settingsUI)
  i4458.coopUI = request.d('StealEggGame+LockedPanelUI', i4459[183], i4458.coopUI)
  i4458.fuseUI = request.d('StealEggGame+LockedPanelUI', i4459[184], i4458.fuseUI)
  i4458.frogUI = request.d('StealEggGame+LockedPanelUI', i4459[185], i4458.frogUI)
  i4458.shopUI = request.d('StealEggGame+LockedPanelUI', i4459[186], i4458.shopUI)
  i4458.trailUI = request.d('StealEggGame+LockedPanelUI', i4459[187], i4458.trailUI)
  request.r(i4459[188], i4459[189], 0, i4458, 'jumpButton')
  request.r(i4459[190], i4459[191], 0, i4458, 'safeUI')
  request.r(i4459[192], i4459[193], 0, i4458, 'hintHand')
  request.r(i4459[194], i4459[195], 0, i4458, 'cameraHint')
  request.r(i4459[196], i4459[197], 0, i4458, 'jumpHint')
  request.r(i4459[198], i4459[199], 0, i4458, 'tutorialText')
  request.r(i4459[200], i4459[201], 0, i4458, 'joystick')
  return i4458
}

Deserializers["StealEggGame+PetInfo"] = function (request, data, root) {
  var i4488 = root || request.c( 'StealEggGame+PetInfo' )
  var i4489 = data
  i4488.name = i4489[0]
  i4488.rarity = i4489[1]
  i4488.zone = i4489[2]
  i4488.income = i4489[3]
  request.r(i4489[4], i4489[5], 0, i4488, 'thumbnail')
  request.r(i4489[6], i4489[7], 0, i4488, 'prefab')
  return i4488
}

Deserializers["StealEggGame+TrailInfo"] = function (request, data, root) {
  var i4492 = root || request.c( 'StealEggGame+TrailInfo' )
  var i4493 = data
  i4492.name = i4493[0]
  i4492.rarity = i4493[1]
  i4492.multiplier = i4493[2]
  i4492.price = i4493[3]
  request.r(i4493[4], i4493[5], 0, i4492, 'thumbnail')
  request.r(i4493[6], i4493[7], 0, i4492, 'frame')
  request.r(i4493[8], i4493[9], 0, i4492, 'prefab')
  return i4492
}

Deserializers["StealEggGame+BoostInfo"] = function (request, data, root) {
  var i4496 = root || request.c( 'StealEggGame+BoostInfo' )
  var i4497 = data
  i4496.name = i4497[0]
  i4496.type = i4497[1]
  i4496.value = i4497[2]
  i4496.duration = i4497[3]
  i4496.weight = i4497[4]
  request.r(i4497[5], i4497[6], 0, i4496, 'icon')
  return i4496
}

Deserializers["StealEggGame+House"] = function (request, data, root) {
  var i4502 = root || request.c( 'StealEggGame+House' )
  var i4503 = data
  request.r(i4503[0], i4503[1], 0, i4502, 'root')
  request.r(i4503[2], i4503[3], 0, i4502, 'coopPad')
  request.r(i4503[4], i4503[5], 0, i4502, 'treadmillPad')
  request.r(i4503[6], i4503[7], 0, i4502, 'petContainer')
  var i4505 = i4503[8]
  var i4504 = []
  for(var i = 0; i < i4505.length; i += 2) {
  request.r(i4505[i + 0], i4505[i + 1], 2, i4504, '')
  }
  i4502.coopModels = i4504
  var i4507 = i4503[9]
  var i4506 = []
  for(var i = 0; i < i4507.length; i += 2) {
  request.r(i4507[i + 0], i4507[i + 1], 2, i4506, '')
  }
  i4502.treadmills = i4506
  return i4502
}

Deserializers["StealEggGame+Zone"] = function (request, data, root) {
  var i4512 = root || request.c( 'StealEggGame+Zone' )
  var i4513 = data
  i4512.name = i4513[0]
  request.r(i4513[1], i4513[2], 0, i4512, 'root')
  request.r(i4513[3], i4513[4], 0, i4512, 'guardian')
  var i4515 = i4513[5]
  var i4514 = []
  for(var i = 0; i < i4515.length; i += 2) {
  request.r(i4515[i + 0], i4515[i + 1], 2, i4514, '')
  }
  i4512.nests = i4514
  var i4517 = i4513[6]
  var i4516 = []
  for(var i = 0; i < i4517.length; i += 2) {
  request.r(i4517[i + 0], i4517[i + 1], 2, i4516, '')
  }
  i4512.eggPrefabs = i4516
  var i4519 = i4513[7]
  var i4518 = []
  for(var i = 0; i < i4519.length; i += 2) {
  request.r(i4519[i + 0], i4519[i + 1], 2, i4518, '')
  }
  i4512.petPrefabs = i4518
  var i4521 = i4513[8]
  var i4520 = []
  for(var i = 0; i < i4521.length; i += 1) {
    i4520.push( request.d('PlayableEggRules', i4521[i + 0]) );
  }
  i4512.eggRules = i4520
  request.r(i4513[9], i4513[10], 0, i4512, 'bounds')
  request.r(i4513[11], i4513[12], 0, i4512, 'thumbnail')
  i4512.attackDistance = i4513[13]
  i4512.guardianSpeed = i4513[14]
  request.r(i4513[15], i4513[16], 0, i4512, 'sleepSound')
  request.r(i4513[17], i4513[18], 0, i4512, 'runSound')
  request.r(i4513[19], i4513[20], 0, i4512, 'catchSound')
  return i4512
}

Deserializers["PlayableEggRules"] = function (request, data, root) {
  var i4524 = root || request.c( 'PlayableEggRules' )
  var i4525 = data
  i4524.name = i4525[0]
  request.r(i4525[1], i4525[2], 0, i4524, 'thumbnail')
  i4524.petIds = i4525[3]
  i4524.spawnWeight = i4525[4]
  i4524.incubationTime = i4525[5]
  var i4527 = i4525[6]
  var i4526 = []
  for(var i = 0; i < i4527.length; i += 2) {
    i4526.push( new pc.Vec2( i4527[i + 0], i4527[i + 1] ) );
  }
  i4524.sizeRanges = i4526
  i4524.sizeWeights = i4525[7]
  var i4529 = i4525[8]
  var i4528 = []
  for(var i = 0; i < i4529.length; i += 2) {
  request.r(i4529[i + 0], i4529[i + 1], 2, i4528, '')
  }
  i4524.pets = i4528
  i4524.petWeights = i4525[9]
  i4524.petIncome = i4525[10]
  return i4524
}

Deserializers["StealEggGame+HudUI"] = function (request, data, root) {
  var i4532 = root || request.c( 'StealEggGame+HudUI' )
  var i4533 = data
  request.r(i4533[0], i4533[1], 0, i4532, 'functions')
  var i4535 = i4533[2]
  var i4534 = []
  for(var i = 0; i < i4535.length; i += 2) {
  request.r(i4535[i + 0], i4535[i + 1], 2, i4534, '')
  }
  i4532.actionButtons = i4534
  request.r(i4533[3], i4533[4], 0, i4532, 'incubateTapHint')
  request.r(i4533[5], i4533[6], 0, i4532, 'hatchTapHint')
  request.r(i4533[7], i4533[8], 0, i4532, 'equipTapHint')
  request.r(i4533[9], i4533[10], 0, i4532, 'trainTapHint')
  request.r(i4533[11], i4533[12], 0, i4532, 'attack')
  request.r(i4533[13], i4533[14], 0, i4532, 'settings')
  request.r(i4533[15], i4533[16], 0, i4532, 'trailShop')
  request.r(i4533[17], i4533[18], 0, i4532, 'index')
  request.r(i4533[19], i4533[20], 0, i4532, 'speedMode')
  request.r(i4533[21], i4533[22], 0, i4532, 'speedOn')
  request.r(i4533[23], i4533[24], 0, i4532, 'speedOff')
  request.r(i4533[25], i4533[26], 0, i4532, 'money')
  request.r(i4533[27], i4533[28], 0, i4532, 'speed')
  request.r(i4533[29], i4533[30], 0, i4532, 'time')
  request.r(i4533[31], i4533[32], 0, i4532, 'moneyIcon')
  request.r(i4533[33], i4533[34], 0, i4532, 'speedIcon')
  request.r(i4533[35], i4533[36], 0, i4532, 'timeIcon')
  request.r(i4533[37], i4533[38], 0, i4532, 'indexHighlight')
  request.r(i4533[39], i4533[40], 0, i4532, 'incubateHighlight')
  request.r(i4533[41], i4533[42], 0, i4532, 'right')
  request.r(i4533[43], i4533[44], 0, i4532, 'equipMonster')
  request.r(i4533[45], i4533[46], 0, i4532, 'incubateEgg')
  request.r(i4533[47], i4533[48], 0, i4532, 'boostContainer')
  request.r(i4533[49], i4533[50], 0, i4532, 'boostTemplate')
  request.r(i4533[51], i4533[52], 0, i4532, 'zoneBanner')
  request.r(i4533[53], i4533[54], 0, i4532, 'zoneFrame')
  request.r(i4533[55], i4533[56], 0, i4532, 'zoneName')
  request.r(i4533[57], i4533[58], 0, i4532, 'incomeTemplate')
  return i4532
}

Deserializers["StealEggGame+PetsPopupUI"] = function (request, data, root) {
  var i4536 = root || request.c( 'StealEggGame+PetsPopupUI' )
  var i4537 = data
  request.r(i4537[0], i4537[1], 0, i4536, 'root')
  request.r(i4537[2], i4537[3], 0, i4536, 'content')
  request.r(i4537[4], i4537[5], 0, i4536, 'template')
  request.r(i4537[6], i4537[7], 0, i4536, 'close')
  request.r(i4537[8], i4537[9], 0, i4536, 'equipBest')
  request.r(i4537[10], i4537[11], 0, i4536, 'upgradeSlot')
  request.r(i4537[12], i4537[13], 0, i4536, 'slots')
  request.r(i4537[14], i4537[15], 0, i4536, 'upgradePrice')
  request.r(i4537[16], i4537[17], 0, i4536, 'upgradeUnavailable')
  return i4536
}

Deserializers["StealEggGame+IncubatePopupUI"] = function (request, data, root) {
  var i4538 = root || request.c( 'StealEggGame+IncubatePopupUI' )
  var i4539 = data
  request.r(i4539[0], i4539[1], 0, i4538, 'root')
  request.r(i4539[2], i4539[3], 0, i4538, 'content')
  request.r(i4539[4], i4539[5], 0, i4538, 'template')
  request.r(i4539[6], i4539[7], 0, i4538, 'close')
  return i4538
}

Deserializers["StealEggGame+InventoryUI"] = function (request, data, root) {
  var i4540 = root || request.c( 'StealEggGame+InventoryUI' )
  var i4541 = data
  var i4543 = i4541[0]
  var i4542 = []
  for(var i = 0; i < i4543.length; i += 2) {
  request.r(i4543[i + 0], i4543[i + 1], 2, i4542, '')
  }
  i4540.quickSlots = i4542
  request.r(i4541[1], i4541[2], 0, i4540, 'bag')
  request.r(i4541[3], i4541[4], 0, i4540, 'bagClose')
  request.r(i4541[5], i4541[6], 0, i4540, 'bagPopup')
  request.r(i4541[7], i4541[8], 0, i4540, 'bagContent')
  request.r(i4541[9], i4541[10], 0, i4540, 'bagTemplate')
  request.r(i4541[11], i4541[12], 0, i4540, 'petInfo')
  request.r(i4541[13], i4541[14], 0, i4540, 'petThumbnail')
  request.r(i4541[15], i4541[16], 0, i4540, 'petName')
  request.r(i4541[17], i4541[18], 0, i4540, 'petIncome')
  request.r(i4541[19], i4541[20], 0, i4540, 'petRarity')
  request.r(i4541[21], i4541[22], 0, i4540, 'petEquip')
  request.r(i4541[23], i4541[24], 0, i4540, 'petDrop')
  request.r(i4541[25], i4541[26], 0, i4540, 'eggInfo')
  request.r(i4541[27], i4541[28], 0, i4540, 'eggThumbnail')
  request.r(i4541[29], i4541[30], 0, i4540, 'eggName')
  request.r(i4541[31], i4541[32], 0, i4540, 'eggWeight')
  request.r(i4541[33], i4541[34], 0, i4540, 'eggIncubate')
  request.r(i4541[35], i4541[36], 0, i4540, 'eggDrop')
  return i4540
}

Deserializers["StealEggGame+RewardUI"] = function (request, data, root) {
  var i4546 = root || request.c( 'StealEggGame+RewardUI' )
  var i4547 = data
  request.r(i4547[0], i4547[1], 0, i4546, 'root')
  request.r(i4547[2], i4547[3], 0, i4546, 'title')
  request.r(i4547[4], i4547[5], 0, i4546, 'content')
  request.r(i4547[6], i4547[7], 0, i4546, 'template')
  request.r(i4547[8], i4547[9], 0, i4546, 'close')
  request.r(i4547[10], i4547[11], 0, i4546, 'tapToClose')
  return i4546
}

Deserializers["StealEggGame+DialogUI"] = function (request, data, root) {
  var i4548 = root || request.c( 'StealEggGame+DialogUI' )
  var i4549 = data
  request.r(i4549[0], i4549[1], 0, i4548, 'root')
  request.r(i4549[2], i4549[3], 0, i4548, 'message')
  return i4548
}

Deserializers["StealEggGame+TreadmillPanelUI"] = function (request, data, root) {
  var i4550 = root || request.c( 'StealEggGame+TreadmillPanelUI' )
  var i4551 = data
  request.r(i4551[0], i4551[1], 0, i4550, 'root')
  request.r(i4551[2], i4551[3], 0, i4550, 'close')
  request.r(i4551[4], i4551[5], 0, i4550, 'upgrade')
  request.r(i4551[6], i4551[7], 0, i4550, 'level')
  request.r(i4551[8], i4551[9], 0, i4550, 'train')
  request.r(i4551[10], i4551[11], 0, i4550, 'price')
  request.r(i4551[12], i4551[13], 0, i4550, 'max')
  return i4550
}

Deserializers["StealEggGame+IndexUI"] = function (request, data, root) {
  var i4552 = root || request.c( 'StealEggGame+IndexUI' )
  var i4553 = data
  request.r(i4553[0], i4553[1], 0, i4552, 'root')
  request.r(i4553[2], i4553[3], 0, i4552, 'close')
  request.r(i4553[4], i4553[5], 0, i4552, 'claim')
  request.r(i4553[6], i4553[7], 0, i4552, 'zones')
  request.r(i4553[8], i4553[9], 0, i4552, 'zoneTemplate')
  request.r(i4553[10], i4553[11], 0, i4552, 'lockedZone')
  request.r(i4553[12], i4553[13], 0, i4552, 'progressFill')
  request.r(i4553[14], i4553[15], 0, i4552, 'progress')
  request.r(i4553[16], i4553[17], 0, i4552, 'information')
  request.r(i4553[18], i4553[19], 0, i4552, 'rewardFrame')
  request.r(i4553[20], i4553[21], 0, i4552, 'claimed')
  request.r(i4553[22], i4553[23], 0, i4552, 'infoImage')
  request.r(i4553[24], i4553[25], 0, i4552, 'infoName')
  request.r(i4553[26], i4553[27], 0, i4552, 'infoIncome')
  request.r(i4553[28], i4553[29], 0, i4552, 'infoRarity')
  request.r(i4553[30], i4553[31], 0, i4552, 'rewardContent')
  request.r(i4553[32], i4553[33], 0, i4552, 'rewardTemplate')
  return i4552
}

Deserializers["StealEggGame+LockedPanelUI"] = function (request, data, root) {
  var i4554 = root || request.c( 'StealEggGame+LockedPanelUI' )
  var i4555 = data
  request.r(i4555[0], i4555[1], 0, i4554, 'root')
  request.r(i4555[2], i4555[3], 0, i4554, 'close')
  return i4554
}

Deserializers["PlayableRagdoll"] = function (request, data, root) {
  var i4556 = root || request.c( 'PlayableRagdoll' )
  var i4557 = data
  request.r(i4557[0], i4557[1], 0, i4556, 'player')
  request.r(i4557[2], i4557[3], 0, i4556, 'animator')
  request.r(i4557[4], i4557[5], 0, i4556, 'hips')
  var i4559 = i4557[6]
  var i4558 = []
  for(var i = 0; i < i4559.length; i += 2) {
  request.r(i4559[i + 0], i4559[i + 1], 2, i4558, '')
  }
  i4556.bodies = i4558
  var i4561 = i4557[7]
  var i4560 = []
  for(var i = 0; i < i4561.length; i += 2) {
  request.r(i4561[i + 0], i4561[i + 1], 2, i4560, '')
  }
  i4556.bodyColliders = i4560
  return i4556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i4566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i4567 = data
  i4566.textureMode = i4567[0]
  i4566.alignment = i4567[1]
  i4566.widthCurve = new pc.AnimationCurve( { keys_flow: i4567[2] } )
  i4566.colorGradient = i4567[3] ? new pc.ColorGradient(i4567[3][0], i4567[3][1], i4567[3][2]) : null
  var i4569 = i4567[4]
  var i4568 = []
  for(var i = 0; i < i4569.length; i += 3) {
    i4568.push( new pc.Vec3( i4569[i + 0], i4569[i + 1], i4569[i + 2] ) );
  }
  i4566.positions = i4568
  i4566.positionCount = i4567[5]
  i4566.widthMultiplier = i4567[6]
  i4566.startWidth = i4567[7]
  i4566.endWidth = i4567[8]
  i4566.numCornerVertices = i4567[9]
  i4566.numCapVertices = i4567[10]
  i4566.useWorldSpace = !!i4567[11]
  i4566.loop = !!i4567[12]
  i4566.startColor = new pc.Color(i4567[13], i4567[14], i4567[15], i4567[16])
  i4566.endColor = new pc.Color(i4567[17], i4567[18], i4567[19], i4567[20])
  i4566.generateLightingData = !!i4567[21]
  i4566.enabled = !!i4567[22]
  request.r(i4567[23], i4567[24], 0, i4566, 'sharedMaterial')
  var i4571 = i4567[25]
  var i4570 = []
  for(var i = 0; i < i4571.length; i += 2) {
  request.r(i4571[i + 0], i4571[i + 1], 2, i4570, '')
  }
  i4566.sharedMaterials = i4570
  i4566.receiveShadows = !!i4567[26]
  i4566.shadowCastingMode = i4567[27]
  i4566.sortingLayerID = i4567[28]
  i4566.sortingOrder = i4567[29]
  i4566.lightmapIndex = i4567[30]
  i4566.lightmapSceneIndex = i4567[31]
  i4566.lightmapScaleOffset = new pc.Vec4( i4567[32], i4567[33], i4567[34], i4567[35] )
  i4566.lightProbeUsage = i4567[36]
  i4566.reflectionProbeUsage = i4567[37]
  return i4566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i4572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i4573 = data
  i4572.enabled = !!i4573[0]
  i4572.center = new pc.Vec3( i4573[1], i4573[2], i4573[3] )
  i4572.radius = i4573[4]
  i4572.height = i4573[5]
  i4572.minMoveDistance = i4573[6]
  i4572.skinWidth = i4573[7]
  i4572.enableOverlapRecovery = !!i4573[8]
  return i4572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i4574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i4575 = data
  i4574.swingAxis = new pc.Vec3( i4575[0], i4575[1], i4575[2] )
  i4574.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i4575[3], i4574.twistLimitSpring)
  i4574.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i4575[4], i4574.swingLimitSpring)
  i4574.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i4575[5], i4574.lowTwistLimit)
  i4574.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i4575[6], i4574.highTwistLimit)
  i4574.swing1Limit = request.d('UnityEngine.SoftJointLimit', i4575[7], i4574.swing1Limit)
  i4574.swing2Limit = request.d('UnityEngine.SoftJointLimit', i4575[8], i4574.swing2Limit)
  request.r(i4575[9], i4575[10], 0, i4574, 'connectedBody')
  i4574.axis = new pc.Vec3( i4575[11], i4575[12], i4575[13] )
  i4574.anchor = new pc.Vec3( i4575[14], i4575[15], i4575[16] )
  i4574.connectedAnchor = new pc.Vec3( i4575[17], i4575[18], i4575[19] )
  i4574.autoConfigureConnectedAnchor = !!i4575[20]
  i4574.massScale = i4575[21]
  i4574.connectedMassScale = i4575[22]
  i4574.enableCollision = !!i4575[23]
  i4574.breakForce = i4575[24]
  i4574.breakTorque = i4575[25]
  return i4574
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i4576 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i4577 = data
  request.r(i4577[0], i4577[1], 0, i4576, 'm_FirstSelected')
  i4576.m_sendNavigationEvents = !!i4577[2]
  i4576.m_DragThreshold = i4577[3]
  return i4576
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i4578 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i4579 = data
  i4578.m_HorizontalAxis = i4579[0]
  i4578.m_VerticalAxis = i4579[1]
  i4578.m_SubmitButton = i4579[2]
  i4578.m_CancelButton = i4579[3]
  i4578.m_InputActionsPerSecond = i4579[4]
  i4578.m_RepeatDelay = i4579[5]
  i4578.m_ForceModuleActive = !!i4579[6]
  i4578.m_SendPointerHoverToParent = !!i4579[7]
  return i4578
}

Deserializers["PlayableCameraDrag"] = function (request, data, root) {
  var i4580 = root || request.c( 'PlayableCameraDrag' )
  var i4581 = data
  request.r(i4581[0], i4581[1], 0, i4580, 'cameraController')
  return i4580
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i4582 = root || request.c( 'PlayableJoystick' )
  var i4583 = data
  request.r(i4583[0], i4583[1], 0, i4582, 'knob')
  return i4582
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i4584 = root || request.c( 'UnityEngine.UI.Outline' )
  var i4585 = data
  i4584.m_EffectColor = new pc.Color(i4585[0], i4585[1], i4585[2], i4585[3])
  i4584.m_EffectDistance = new pc.Vec2( i4585[4], i4585[5] )
  i4584.m_UseGraphicAlpha = !!i4585[6]
  return i4584
}

Deserializers["TapHintView"] = function (request, data, root) {
  var i4586 = root || request.c( 'TapHintView' )
  var i4587 = data
  request.r(i4587[0], i4587[1], 0, i4586, 'hand')
  request.r(i4587[2], i4587[3], 0, i4586, 'shine')
  request.r(i4587[4], i4587[5], 0, i4586, 'shineGraphic')
  return i4586
}

Deserializers["LunaController"] = function (request, data, root) {
  var i4588 = root || request.c( 'LunaController' )
  var i4589 = data
  i4588.LimitTimePlay = !!i4589[0]
  i4588.TimePlay = i4589[1]
  request.r(i4589[2], i4589[3], 0, i4588, 'BGM')
  i4588.LimitCountClick = !!i4589[4]
  i4588.MaxCountClick = i4589[5]
  i4588.LimitCountSteal = !!i4589[6]
  i4588.MaxCountSteal = i4589[7]
  i4588.LimitCountIncubate = !!i4589[8]
  i4588.MaxCountIncubate = i4589[9]
  i4588.LimitCountHatch = !!i4589[10]
  i4588.MaxCountHatch = i4589[11]
  request.r(i4589[12], i4589[13], 0, i4588, 'musicSource')
  var i4591 = i4589[14]
  var i4590 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i4591.length; i += 2) {
  request.r(i4591[i + 0], i4591[i + 1], 1, i4590, '')
  }
  i4588.CTA = i4590
  request.r(i4589[15], i4589[16], 0, i4588, 'endCard')
  return i4588
}

Deserializers["IconAmountView"] = function (request, data, root) {
  var i4594 = root || request.c( 'IconAmountView' )
  var i4595 = data
  request.r(i4595[0], i4595[1], 0, i4594, 'icon')
  request.r(i4595[2], i4595[3], 0, i4594, 'amount')
  return i4594
}

Deserializers["PlayableHoldButton"] = function (request, data, root) {
  var i4596 = root || request.c( 'PlayableHoldButton' )
  var i4597 = data
  i4596.duration = i4597[0]
  request.r(i4597[1], i4597[2], 0, i4596, 'fill')
  i4596.onHold = request.d('System.Action', i4597[3], i4596.onHold)
  return i4596
}

Deserializers["System.Action"] = function (request, data, root) {
  var i4598 = root || request.c( 'System.Action' )
  var i4599 = data
  return i4598
}

Deserializers["PetRowView"] = function (request, data, root) {
  var i4600 = root || request.c( 'PetRowView' )
  var i4601 = data
  request.r(i4601[0], i4601[1], 0, i4600, 'content')
  request.r(i4601[2], i4601[3], 0, i4600, 'thumbnail')
  request.r(i4601[4], i4601[5], 0, i4600, 'unequip')
  return i4600
}

Deserializers["IncubateRowView"] = function (request, data, root) {
  var i4602 = root || request.c( 'IncubateRowView' )
  var i4603 = data
  request.r(i4603[0], i4603[1], 0, i4602, 'thumbnail')
  request.r(i4603[2], i4603[3], 0, i4602, 'progressFill')
  request.r(i4603[4], i4603[5], 0, i4602, 'content')
  request.r(i4603[6], i4603[7], 0, i4602, 'open')
  request.r(i4603[8], i4603[9], 0, i4602, 'opening')
  return i4602
}

Deserializers["BagCellView"] = function (request, data, root) {
  var i4604 = root || request.c( 'BagCellView' )
  var i4605 = data
  request.r(i4605[0], i4605[1], 0, i4604, 'button')
  request.r(i4605[2], i4605[3], 0, i4604, 'thumbnail')
  request.r(i4605[4], i4605[5], 0, i4604, 'highlight')
  request.r(i4605[6], i4605[7], 0, i4604, 'exposeMark')
  request.r(i4605[8], i4605[9], 0, i4604, 'amount')
  return i4604
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i4606 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i4607 = data
  i4606.m_Spacing = i4607[0]
  i4606.m_ChildForceExpandWidth = !!i4607[1]
  i4606.m_ChildForceExpandHeight = !!i4607[2]
  i4606.m_ChildControlWidth = !!i4607[3]
  i4606.m_ChildControlHeight = !!i4607[4]
  i4606.m_ChildScaleWidth = !!i4607[5]
  i4606.m_ChildScaleHeight = !!i4607[6]
  i4606.m_ReverseArrangement = !!i4607[7]
  i4606.m_Padding = UnityEngine.RectOffset.FromPaddings(i4607[8], i4607[9], i4607[10], i4607[11])
  i4606.m_ChildAlignment = i4607[12]
  return i4606
}

Deserializers["QuickSlotView"] = function (request, data, root) {
  var i4608 = root || request.c( 'QuickSlotView' )
  var i4609 = data
  request.r(i4609[0], i4609[1], 0, i4608, 'button')
  request.r(i4609[2], i4609[3], 0, i4608, 'thumbnail')
  request.r(i4609[4], i4609[5], 0, i4608, 'highlight')
  request.r(i4609[6], i4609[7], 0, i4608, 'content')
  return i4608
}

Deserializers["IndexZoneView"] = function (request, data, root) {
  var i4610 = root || request.c( 'IndexZoneView' )
  var i4611 = data
  request.r(i4611[0], i4611[1], 0, i4610, 'zoneName')
  request.r(i4611[2], i4611[3], 0, i4610, 'progress')
  request.r(i4611[4], i4611[5], 0, i4610, 'thumbnail')
  request.r(i4611[6], i4611[7], 0, i4610, 'progressFill')
  request.r(i4611[8], i4611[9], 0, i4610, 'petContent')
  request.r(i4611[10], i4611[11], 0, i4610, 'petTemplate')
  return i4610
}

Deserializers["IndexPetCellView"] = function (request, data, root) {
  var i4612 = root || request.c( 'IndexPetCellView' )
  var i4613 = data
  request.r(i4613[0], i4613[1], 0, i4612, 'button')
  request.r(i4613[2], i4613[3], 0, i4612, 'frame')
  request.r(i4613[4], i4613[5], 0, i4612, 'thumbnail')
  request.r(i4613[6], i4613[7], 0, i4612, 'petName')
  request.r(i4613[8], i4613[9], 0, i4612, 'selected')
  request.r(i4613[10], i4613[11], 0, i4612, 'mark')
  return i4612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i4614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i4615 = data
  i4614.aspect = i4615[0]
  i4614.orthographic = !!i4615[1]
  i4614.orthographicSize = i4615[2]
  i4614.backgroundColor = new pc.Color(i4615[3], i4615[4], i4615[5], i4615[6])
  i4614.nearClipPlane = i4615[7]
  i4614.farClipPlane = i4615[8]
  i4614.fieldOfView = i4615[9]
  i4614.depth = i4615[10]
  i4614.clearFlags = i4615[11]
  i4614.cullingMask = i4615[12]
  i4614.rect = i4615[13]
  request.r(i4615[14], i4615[15], 0, i4614, 'targetTexture')
  i4614.usePhysicalProperties = !!i4615[16]
  i4614.focalLength = i4615[17]
  i4614.sensorSize = new pc.Vec2( i4615[18], i4615[19] )
  i4614.lensShift = new pc.Vec2( i4615[20], i4615[21] )
  i4614.gateFit = i4615[22]
  i4614.commandBufferCount = i4615[23]
  i4614.cameraType = i4615[24]
  i4614.enabled = !!i4615[25]
  return i4614
}

Deserializers["CameraController"] = function (request, data, root) {
  var i4616 = root || request.c( 'CameraController' )
  var i4617 = data
  request.r(i4617[0], i4617[1], 0, i4616, 'target')
  request.r(i4617[2], i4617[3], 0, i4616, 'controlledCamera')
  request.r(i4617[4], i4617[5], 0, i4616, 'cameraManager')
  request.r(i4617[6], i4617[7], 0, i4616, 'game')
  i4616.distance = i4617[8]
  i4616.initialVerticalAngle = i4617[9]
  i4616.initialHorizontalAngle = i4617[10]
  return i4616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i4618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i4619 = data
  i4618.ambientIntensity = i4619[0]
  i4618.reflectionIntensity = i4619[1]
  i4618.ambientMode = i4619[2]
  i4618.ambientLight = new pc.Color(i4619[3], i4619[4], i4619[5], i4619[6])
  i4618.ambientSkyColor = new pc.Color(i4619[7], i4619[8], i4619[9], i4619[10])
  i4618.ambientGroundColor = new pc.Color(i4619[11], i4619[12], i4619[13], i4619[14])
  i4618.ambientEquatorColor = new pc.Color(i4619[15], i4619[16], i4619[17], i4619[18])
  i4618.fogColor = new pc.Color(i4619[19], i4619[20], i4619[21], i4619[22])
  i4618.fogEndDistance = i4619[23]
  i4618.fogStartDistance = i4619[24]
  i4618.fogDensity = i4619[25]
  i4618.fog = !!i4619[26]
  request.r(i4619[27], i4619[28], 0, i4618, 'skybox')
  i4618.fogMode = i4619[29]
  var i4621 = i4619[30]
  var i4620 = []
  for(var i = 0; i < i4621.length; i += 1) {
    i4620.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i4621[i + 0]) );
  }
  i4618.lightmaps = i4620
  i4618.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i4619[31], i4618.lightProbes)
  i4618.lightmapsMode = i4619[32]
  i4618.mixedBakeMode = i4619[33]
  i4618.environmentLightingMode = i4619[34]
  i4618.ambientProbe = new pc.SphericalHarmonicsL2(i4619[35])
  request.r(i4619[36], i4619[37], 0, i4618, 'customReflection')
  request.r(i4619[38], i4619[39], 0, i4618, 'defaultReflection')
  i4618.defaultReflectionMode = i4619[40]
  i4618.defaultReflectionResolution = i4619[41]
  i4618.sunLightObjectId = i4619[42]
  i4618.pixelLightCount = i4619[43]
  i4618.defaultReflectionHDR = !!i4619[44]
  i4618.hasLightDataAsset = !!i4619[45]
  i4618.hasManualGenerate = !!i4619[46]
  return i4618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i4624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i4625 = data
  request.r(i4625[0], i4625[1], 0, i4624, 'lightmapColor')
  request.r(i4625[2], i4625[3], 0, i4624, 'lightmapDirection')
  request.r(i4625[4], i4625[5], 0, i4624, 'shadowMask')
  return i4624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i4626 = root || new UnityEngine.LightProbes()
  var i4627 = data
  return i4626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i4632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i4633 = data
  var i4635 = i4633[0]
  var i4634 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i4635.length; i += 1) {
    i4634.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i4635[i + 0]));
  }
  i4632.ShaderCompilationErrors = i4634
  i4632.name = i4633[1]
  i4632.guid = i4633[2]
  var i4637 = i4633[3]
  var i4636 = []
  for(var i = 0; i < i4637.length; i += 1) {
    i4636.push( i4637[i + 0] );
  }
  i4632.shaderDefinedKeywords = i4636
  var i4639 = i4633[4]
  var i4638 = []
  for(var i = 0; i < i4639.length; i += 1) {
    i4638.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i4639[i + 0]) );
  }
  i4632.passes = i4638
  var i4641 = i4633[5]
  var i4640 = []
  for(var i = 0; i < i4641.length; i += 1) {
    i4640.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i4641[i + 0]) );
  }
  i4632.usePasses = i4640
  var i4643 = i4633[6]
  var i4642 = []
  for(var i = 0; i < i4643.length; i += 1) {
    i4642.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i4643[i + 0]) );
  }
  i4632.defaultParameterValues = i4642
  request.r(i4633[7], i4633[8], 0, i4632, 'unityFallbackShader')
  i4632.readDepth = !!i4633[9]
  i4632.hasDepthOnlyPass = !!i4633[10]
  i4632.isCreatedByShaderGraph = !!i4633[11]
  i4632.disableBatching = !!i4633[12]
  i4632.compiled = !!i4633[13]
  return i4632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i4646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i4647 = data
  i4646.shaderName = i4647[0]
  i4646.errorMessage = i4647[1]
  return i4646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i4652 = root || new pc.UnityShaderPass()
  var i4653 = data
  i4652.id = i4653[0]
  i4652.subShaderIndex = i4653[1]
  i4652.name = i4653[2]
  i4652.passType = i4653[3]
  i4652.grabPassTextureName = i4653[4]
  i4652.usePass = !!i4653[5]
  i4652.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[6], i4652.zTest)
  i4652.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[7], i4652.zWrite)
  i4652.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[8], i4652.culling)
  i4652.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4653[9], i4652.blending)
  i4652.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4653[10], i4652.alphaBlending)
  i4652.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[11], i4652.colorWriteMask)
  i4652.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[12], i4652.offsetUnits)
  i4652.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[13], i4652.offsetFactor)
  i4652.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[14], i4652.stencilRef)
  i4652.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[15], i4652.stencilReadMask)
  i4652.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4653[16], i4652.stencilWriteMask)
  i4652.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4653[17], i4652.stencilOp)
  i4652.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4653[18], i4652.stencilOpFront)
  i4652.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4653[19], i4652.stencilOpBack)
  var i4655 = i4653[20]
  var i4654 = []
  for(var i = 0; i < i4655.length; i += 1) {
    i4654.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i4655[i + 0]) );
  }
  i4652.tags = i4654
  var i4657 = i4653[21]
  var i4656 = []
  for(var i = 0; i < i4657.length; i += 1) {
    i4656.push( i4657[i + 0] );
  }
  i4652.passDefinedKeywords = i4656
  var i4659 = i4653[22]
  var i4658 = []
  for(var i = 0; i < i4659.length; i += 1) {
    i4658.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i4659[i + 0]) );
  }
  i4652.passDefinedKeywordGroups = i4658
  var i4661 = i4653[23]
  var i4660 = []
  for(var i = 0; i < i4661.length; i += 1) {
    i4660.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4661[i + 0]) );
  }
  i4652.variants = i4660
  var i4663 = i4653[24]
  var i4662 = []
  for(var i = 0; i < i4663.length; i += 1) {
    i4662.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4663[i + 0]) );
  }
  i4652.excludedVariants = i4662
  i4652.hasDepthReader = !!i4653[25]
  return i4652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i4664 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i4665 = data
  i4664.val = i4665[0]
  i4664.name = i4665[1]
  return i4664
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i4666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i4667 = data
  i4666.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4667[0], i4666.src)
  i4666.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4667[1], i4666.dst)
  i4666.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4667[2], i4666.op)
  return i4666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i4668 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i4669 = data
  i4668.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4669[0], i4668.pass)
  i4668.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4669[1], i4668.fail)
  i4668.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4669[2], i4668.zFail)
  i4668.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4669[3], i4668.comp)
  return i4668
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i4672 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i4673 = data
  i4672.name = i4673[0]
  i4672.value = i4673[1]
  return i4672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i4676 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i4677 = data
  var i4679 = i4677[0]
  var i4678 = []
  for(var i = 0; i < i4679.length; i += 1) {
    i4678.push( i4679[i + 0] );
  }
  i4676.keywords = i4678
  i4676.hasDiscard = !!i4677[1]
  return i4676
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i4682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i4683 = data
  i4682.passId = i4683[0]
  i4682.subShaderIndex = i4683[1]
  var i4685 = i4683[2]
  var i4684 = []
  for(var i = 0; i < i4685.length; i += 1) {
    i4684.push( i4685[i + 0] );
  }
  i4682.keywords = i4684
  i4682.vertexProgram = i4683[3]
  i4682.fragmentProgram = i4683[4]
  i4682.exportedForWebGl2 = !!i4683[5]
  i4682.readDepth = !!i4683[6]
  return i4682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i4688 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i4689 = data
  request.r(i4689[0], i4689[1], 0, i4688, 'shader')
  i4688.pass = i4689[2]
  return i4688
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i4692 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i4693 = data
  i4692.name = i4693[0]
  i4692.type = i4693[1]
  i4692.value = new pc.Vec4( i4693[2], i4693[3], i4693[4], i4693[5] )
  i4692.textureValue = i4693[6]
  i4692.shaderPropertyFlag = i4693[7]
  return i4692
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i4694 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i4695 = data
  i4694.name = i4695[0]
  request.r(i4695[1], i4695[2], 0, i4694, 'texture')
  i4694.aabb = i4695[3]
  i4694.vertices = i4695[4]
  i4694.triangles = i4695[5]
  i4694.textureRect = UnityEngine.Rect.MinMaxRect(i4695[6], i4695[7], i4695[8], i4695[9])
  i4694.packedRect = UnityEngine.Rect.MinMaxRect(i4695[10], i4695[11], i4695[12], i4695[13])
  i4694.border = new pc.Vec4( i4695[14], i4695[15], i4695[16], i4695[17] )
  i4694.transparency = i4695[18]
  i4694.bounds = i4695[19]
  i4694.pixelsPerUnit = i4695[20]
  i4694.textureWidth = i4695[21]
  i4694.textureHeight = i4695[22]
  i4694.nativeSize = new pc.Vec2( i4695[23], i4695[24] )
  i4694.pivot = new pc.Vec2( i4695[25], i4695[26] )
  i4694.textureRectOffset = new pc.Vec2( i4695[27], i4695[28] )
  return i4694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i4696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i4697 = data
  i4696.name = i4697[0]
  return i4696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i4698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i4699 = data
  i4698.name = i4699[0]
  i4698.wrapMode = i4699[1]
  i4698.isLooping = !!i4699[2]
  i4698.length = i4699[3]
  var i4701 = i4699[4]
  var i4700 = []
  for(var i = 0; i < i4701.length; i += 1) {
    i4700.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i4701[i + 0]) );
  }
  i4698.curves = i4700
  var i4703 = i4699[5]
  var i4702 = []
  for(var i = 0; i < i4703.length; i += 1) {
    i4702.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i4703[i + 0]) );
  }
  i4698.events = i4702
  i4698.halfPrecision = !!i4699[6]
  i4698._frameRate = i4699[7]
  i4698.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i4699[8], i4698.localBounds)
  i4698.hasMuscleCurves = !!i4699[9]
  var i4705 = i4699[10]
  var i4704 = []
  for(var i = 0; i < i4705.length; i += 1) {
    i4704.push( i4705[i + 0] );
  }
  i4698.clipMuscleConstant = i4704
  i4698.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i4699[11], i4698.clipBindingConstant)
  return i4698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i4708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i4709 = data
  i4708.path = i4709[0]
  i4708.hash = i4709[1]
  i4708.componentType = i4709[2]
  i4708.property = i4709[3]
  i4708.keys = i4709[4]
  var i4711 = i4709[5]
  var i4710 = []
  for(var i = 0; i < i4711.length; i += 1) {
    i4710.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i4711[i + 0]) );
  }
  i4708.objectReferenceKeys = i4710
  return i4708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i4714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i4715 = data
  i4714.time = i4715[0]
  request.r(i4715[1], i4715[2], 0, i4714, 'value')
  return i4714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i4718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i4719 = data
  i4718.functionName = i4719[0]
  i4718.floatParameter = i4719[1]
  i4718.intParameter = i4719[2]
  i4718.stringParameter = i4719[3]
  request.r(i4719[4], i4719[5], 0, i4718, 'objectReferenceParameter')
  i4718.time = i4719[6]
  return i4718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i4720 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i4721 = data
  i4720.center = new pc.Vec3( i4721[0], i4721[1], i4721[2] )
  i4720.extends = new pc.Vec3( i4721[3], i4721[4], i4721[5] )
  return i4720
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i4724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i4725 = data
  var i4727 = i4725[0]
  var i4726 = []
  for(var i = 0; i < i4727.length; i += 1) {
    i4726.push( i4727[i + 0] );
  }
  i4724.genericBindings = i4726
  var i4729 = i4725[1]
  var i4728 = []
  for(var i = 0; i < i4729.length; i += 1) {
    i4728.push( i4729[i + 0] );
  }
  i4724.pptrCurveMapping = i4728
  return i4724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i4730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i4731 = data
  i4730.name = i4731[0]
  i4730.ascent = i4731[1]
  i4730.originalLineHeight = i4731[2]
  i4730.fontSize = i4731[3]
  var i4733 = i4731[4]
  var i4732 = []
  for(var i = 0; i < i4733.length; i += 1) {
    i4732.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i4733[i + 0]) );
  }
  i4730.characterInfo = i4732
  request.r(i4731[5], i4731[6], 0, i4730, 'texture')
  i4730.originalFontSize = i4731[7]
  return i4730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i4736 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i4737 = data
  i4736.index = i4737[0]
  i4736.advance = i4737[1]
  i4736.bearing = i4737[2]
  i4736.glyphWidth = i4737[3]
  i4736.glyphHeight = i4737[4]
  i4736.minX = i4737[5]
  i4736.maxX = i4737[6]
  i4736.minY = i4737[7]
  i4736.maxY = i4737[8]
  i4736.uvBottomLeftX = i4737[9]
  i4736.uvBottomLeftY = i4737[10]
  i4736.uvBottomRightX = i4737[11]
  i4736.uvBottomRightY = i4737[12]
  i4736.uvTopLeftX = i4737[13]
  i4736.uvTopLeftY = i4737[14]
  i4736.uvTopRightX = i4737[15]
  i4736.uvTopRightY = i4737[16]
  return i4736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i4738 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i4739 = data
  i4738.name = i4739[0]
  var i4741 = i4739[1]
  var i4740 = []
  for(var i = 0; i < i4741.length; i += 1) {
    i4740.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i4741[i + 0]) );
  }
  i4738.layers = i4740
  var i4743 = i4739[2]
  var i4742 = []
  for(var i = 0; i < i4743.length; i += 1) {
    i4742.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i4743[i + 0]) );
  }
  i4738.parameters = i4742
  i4738.animationClips = i4739[3]
  i4738.avatarUnsupported = i4739[4]
  return i4738
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i4746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i4747 = data
  i4746.name = i4747[0]
  i4746.defaultWeight = i4747[1]
  i4746.blendingMode = i4747[2]
  i4746.avatarMask = i4747[3]
  i4746.syncedLayerIndex = i4747[4]
  i4746.syncedLayerAffectsTiming = !!i4747[5]
  i4746.syncedLayers = i4747[6]
  i4746.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i4747[7], i4746.stateMachine)
  return i4746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i4748 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i4749 = data
  i4748.id = i4749[0]
  i4748.name = i4749[1]
  i4748.path = i4749[2]
  var i4751 = i4749[3]
  var i4750 = []
  for(var i = 0; i < i4751.length; i += 1) {
    i4750.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i4751[i + 0]) );
  }
  i4748.states = i4750
  var i4753 = i4749[4]
  var i4752 = []
  for(var i = 0; i < i4753.length; i += 1) {
    i4752.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i4753[i + 0]) );
  }
  i4748.machines = i4752
  var i4755 = i4749[5]
  var i4754 = []
  for(var i = 0; i < i4755.length; i += 1) {
    i4754.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i4755[i + 0]) );
  }
  i4748.entryStateTransitions = i4754
  var i4757 = i4749[6]
  var i4756 = []
  for(var i = 0; i < i4757.length; i += 1) {
    i4756.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i4757[i + 0]) );
  }
  i4748.exitStateTransitions = i4756
  var i4759 = i4749[7]
  var i4758 = []
  for(var i = 0; i < i4759.length; i += 1) {
    i4758.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i4759[i + 0]) );
  }
  i4748.anyStateTransitions = i4758
  i4748.defaultStateId = i4749[8]
  return i4748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i4762 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i4763 = data
  i4762.id = i4763[0]
  i4762.name = i4763[1]
  i4762.cycleOffset = i4763[2]
  i4762.cycleOffsetParameter = i4763[3]
  i4762.cycleOffsetParameterActive = !!i4763[4]
  i4762.mirror = !!i4763[5]
  i4762.mirrorParameter = i4763[6]
  i4762.mirrorParameterActive = !!i4763[7]
  i4762.motionId = i4763[8]
  i4762.nameHash = i4763[9]
  i4762.fullPathHash = i4763[10]
  i4762.speed = i4763[11]
  i4762.speedParameter = i4763[12]
  i4762.speedParameterActive = !!i4763[13]
  i4762.tag = i4763[14]
  i4762.tagHash = i4763[15]
  i4762.writeDefaultValues = !!i4763[16]
  var i4765 = i4763[17]
  var i4764 = []
  for(var i = 0; i < i4765.length; i += 2) {
  request.r(i4765[i + 0], i4765[i + 1], 2, i4764, '')
  }
  i4762.behaviours = i4764
  var i4767 = i4763[18]
  var i4766 = []
  for(var i = 0; i < i4767.length; i += 1) {
    i4766.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i4767[i + 0]) );
  }
  i4762.transitions = i4766
  return i4762
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i4772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i4773 = data
  i4772.fullPath = i4773[0]
  i4772.canTransitionToSelf = !!i4773[1]
  i4772.duration = i4773[2]
  i4772.exitTime = i4773[3]
  i4772.hasExitTime = !!i4773[4]
  i4772.hasFixedDuration = !!i4773[5]
  i4772.interruptionSource = i4773[6]
  i4772.offset = i4773[7]
  i4772.orderedInterruption = !!i4773[8]
  i4772.destinationStateId = i4773[9]
  i4772.isExit = !!i4773[10]
  i4772.mute = !!i4773[11]
  i4772.solo = !!i4773[12]
  var i4775 = i4773[13]
  var i4774 = []
  for(var i = 0; i < i4775.length; i += 1) {
    i4774.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i4775[i + 0]) );
  }
  i4772.conditions = i4774
  return i4772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i4778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i4779 = data
  i4778.mode = i4779[0]
  i4778.parameter = i4779[1]
  i4778.threshold = i4779[2]
  return i4778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i4784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i4785 = data
  i4784.destinationStateId = i4785[0]
  i4784.isExit = !!i4785[1]
  i4784.mute = !!i4785[2]
  i4784.solo = !!i4785[3]
  var i4787 = i4785[4]
  var i4786 = []
  for(var i = 0; i < i4787.length; i += 1) {
    i4786.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i4787[i + 0]) );
  }
  i4784.conditions = i4786
  return i4784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i4790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i4791 = data
  i4790.defaultBool = !!i4791[0]
  i4790.defaultFloat = i4791[1]
  i4790.defaultInt = i4791[2]
  i4790.name = i4791[3]
  i4790.nameHash = i4791[4]
  i4790.type = i4791[5]
  return i4790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController"] = function (request, data, root) {
  var i4792 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController' )
  var i4793 = data
  i4792.name = i4793[0]
  request.r(i4793[1], i4793[2], 0, i4792, '_runtimeAnimatorController')
  var i4795 = i4793[3]
  var i4794 = []
  for(var i = 0; i < i4795.length; i += 2) {
  request.r(i4795[i + 0], i4795[i + 1], 2, i4794, '')
  }
  i4792._originalAnimationClips = i4794
  var i4797 = i4793[4]
  var i4796 = []
  for(var i = 0; i < i4797.length; i += 2) {
  request.r(i4797[i + 0], i4797[i + 1], 2, i4796, '')
  }
  i4792._overrideAnimationClips = i4796
  var i4799 = i4793[5]
  var i4798 = []
  for(var i = 0; i < i4799.length; i += 2) {
  request.r(i4799[i + 0], i4799[i + 1], 2, i4798, '')
  }
  i4792._animationClips = i4798
  var i4801 = i4793[6]
  var i4800 = []
  for(var i = 0; i < i4801.length; i += 1) {
    i4800.push( request.d('UnityEngine.AnimationClipPair', i4801[i + 0]) );
  }
  i4792._animationClipPairs = i4800
  return i4792
}

Deserializers["UnityEngine.AnimationClipPair"] = function (request, data, root) {
  var i4806 = root || request.c( 'UnityEngine.AnimationClipPair' )
  var i4807 = data
  request.r(i4807[0], i4807[1], 0, i4806, 'originalClip')
  request.r(i4807[2], i4807[3], 0, i4806, 'overrideClip')
  return i4806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i4808 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i4809 = data
  i4808.name = i4809[0]
  i4808.bytes64 = i4809[1]
  i4808.data = i4809[2]
  return i4808
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i4810 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i4811 = data
  i4810.normalStyle = i4811[0]
  i4810.normalSpacingOffset = i4811[1]
  i4810.boldStyle = i4811[2]
  i4810.boldSpacing = i4811[3]
  i4810.italicStyle = i4811[4]
  i4810.tabSize = i4811[5]
  request.r(i4811[6], i4811[7], 0, i4810, 'atlas')
  i4810.m_SourceFontFileGUID = i4811[8]
  i4810.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i4811[9], i4810.m_CreationSettings)
  request.r(i4811[10], i4811[11], 0, i4810, 'm_SourceFontFile')
  i4810.m_SourceFontFilePath = i4811[12]
  i4810.m_AtlasPopulationMode = i4811[13]
  i4810.InternalDynamicOS = !!i4811[14]
  var i4813 = i4811[15]
  var i4812 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i4813.length; i += 1) {
    i4812.add(request.d('UnityEngine.TextCore.Glyph', i4813[i + 0]));
  }
  i4810.m_GlyphTable = i4812
  var i4815 = i4811[16]
  var i4814 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i4815.length; i += 1) {
    i4814.add(request.d('TMPro.TMP_Character', i4815[i + 0]));
  }
  i4810.m_CharacterTable = i4814
  var i4817 = i4811[17]
  var i4816 = []
  for(var i = 0; i < i4817.length; i += 2) {
  request.r(i4817[i + 0], i4817[i + 1], 2, i4816, '')
  }
  i4810.m_AtlasTextures = i4816
  i4810.m_AtlasTextureIndex = i4811[18]
  i4810.m_IsMultiAtlasTexturesEnabled = !!i4811[19]
  i4810.m_GetFontFeatures = !!i4811[20]
  i4810.m_ClearDynamicDataOnBuild = !!i4811[21]
  i4810.m_AtlasWidth = i4811[22]
  i4810.m_AtlasHeight = i4811[23]
  i4810.m_AtlasPadding = i4811[24]
  i4810.m_AtlasRenderMode = i4811[25]
  var i4819 = i4811[26]
  var i4818 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i4819.length; i += 1) {
    i4818.add(request.d('UnityEngine.TextCore.GlyphRect', i4819[i + 0]));
  }
  i4810.m_UsedGlyphRects = i4818
  var i4821 = i4811[27]
  var i4820 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i4821.length; i += 1) {
    i4820.add(request.d('UnityEngine.TextCore.GlyphRect', i4821[i + 0]));
  }
  i4810.m_FreeGlyphRects = i4820
  i4810.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i4811[28], i4810.m_FontFeatureTable)
  i4810.m_ShouldReimportFontFeatures = !!i4811[29]
  var i4823 = i4811[30]
  var i4822 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4823.length; i += 2) {
  request.r(i4823[i + 0], i4823[i + 1], 1, i4822, '')
  }
  i4810.m_FallbackFontAssetTable = i4822
  var i4825 = i4811[31]
  var i4824 = []
  for(var i = 0; i < i4825.length; i += 1) {
    i4824.push( request.d('TMPro.TMP_FontWeightPair', i4825[i + 0]) );
  }
  i4810.m_FontWeightTable = i4824
  var i4827 = i4811[32]
  var i4826 = []
  for(var i = 0; i < i4827.length; i += 1) {
    i4826.push( request.d('TMPro.TMP_FontWeightPair', i4827[i + 0]) );
  }
  i4810.fontWeights = i4826
  i4810.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i4811[33], i4810.m_fontInfo)
  var i4829 = i4811[34]
  var i4828 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i4829.length; i += 1) {
    i4828.add(request.d('TMPro.TMP_Glyph', i4829[i + 0]));
  }
  i4810.m_glyphInfoList = i4828
  i4810.m_KerningTable = request.d('TMPro.KerningTable', i4811[35], i4810.m_KerningTable)
  var i4831 = i4811[36]
  var i4830 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4831.length; i += 2) {
  request.r(i4831[i + 0], i4831[i + 1], 1, i4830, '')
  }
  i4810.fallbackFontAssets = i4830
  i4810.m_Version = i4811[37]
  i4810.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i4811[38], i4810.m_FaceInfo)
  request.r(i4811[39], i4811[40], 0, i4810, 'm_Material')
  return i4810
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i4832 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i4833 = data
  i4832.sourceFontFileName = i4833[0]
  i4832.sourceFontFileGUID = i4833[1]
  i4832.faceIndex = i4833[2]
  i4832.pointSizeSamplingMode = i4833[3]
  i4832.pointSize = i4833[4]
  i4832.padding = i4833[5]
  i4832.paddingMode = i4833[6]
  i4832.packingMode = i4833[7]
  i4832.atlasWidth = i4833[8]
  i4832.atlasHeight = i4833[9]
  i4832.characterSetSelectionMode = i4833[10]
  i4832.characterSequence = i4833[11]
  i4832.referencedFontAssetGUID = i4833[12]
  i4832.referencedTextAssetGUID = i4833[13]
  i4832.fontStyle = i4833[14]
  i4832.fontStyleModifier = i4833[15]
  i4832.renderMode = i4833[16]
  i4832.includeFontFeatures = !!i4833[17]
  return i4832
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i4836 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i4837 = data
  i4836.m_Index = i4837[0]
  i4836.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i4837[1], i4836.m_Metrics)
  i4836.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i4837[2], i4836.m_GlyphRect)
  i4836.m_Scale = i4837[3]
  i4836.m_AtlasIndex = i4837[4]
  i4836.m_ClassDefinitionType = i4837[5]
  return i4836
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i4838 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i4839 = data
  i4838.m_Width = i4839[0]
  i4838.m_Height = i4839[1]
  i4838.m_HorizontalBearingX = i4839[2]
  i4838.m_HorizontalBearingY = i4839[3]
  i4838.m_HorizontalAdvance = i4839[4]
  return i4838
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i4840 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i4841 = data
  i4840.m_X = i4841[0]
  i4840.m_Y = i4841[1]
  i4840.m_Width = i4841[2]
  i4840.m_Height = i4841[3]
  return i4840
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i4844 = root || request.c( 'TMPro.TMP_Character' )
  var i4845 = data
  i4844.m_ElementType = i4845[0]
  i4844.m_Unicode = i4845[1]
  i4844.m_GlyphIndex = i4845[2]
  i4844.m_Scale = i4845[3]
  return i4844
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i4850 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i4851 = data
  var i4853 = i4851[0]
  var i4852 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i4853.length; i += 1) {
    i4852.add(request.d('TMPro.MultipleSubstitutionRecord', i4853[i + 0]));
  }
  i4850.m_MultipleSubstitutionRecords = i4852
  var i4855 = i4851[1]
  var i4854 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i4855.length; i += 1) {
    i4854.add(request.d('TMPro.LigatureSubstitutionRecord', i4855[i + 0]));
  }
  i4850.m_LigatureSubstitutionRecords = i4854
  var i4857 = i4851[2]
  var i4856 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i4857.length; i += 1) {
    i4856.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i4857[i + 0]));
  }
  i4850.m_GlyphPairAdjustmentRecords = i4856
  var i4859 = i4851[3]
  var i4858 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i4859.length; i += 1) {
    i4858.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i4859[i + 0]));
  }
  i4850.m_MarkToBaseAdjustmentRecords = i4858
  var i4861 = i4851[4]
  var i4860 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i4861.length; i += 1) {
    i4860.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i4861[i + 0]));
  }
  i4850.m_MarkToMarkAdjustmentRecords = i4860
  return i4850
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i4864 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i4865 = data
  i4864.m_TargetGlyphID = i4865[0]
  i4864.m_SubstituteGlyphIDs = i4865[1]
  return i4864
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i4868 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i4869 = data
  i4868.m_ComponentGlyphIDs = i4869[0]
  i4868.m_LigatureGlyphID = i4869[1]
  return i4868
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i4872 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i4873 = data
  i4872.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i4873[0], i4872.m_FirstAdjustmentRecord)
  i4872.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i4873[1], i4872.m_SecondAdjustmentRecord)
  i4872.m_FeatureLookupFlags = i4873[2]
  return i4872
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i4874 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i4875 = data
  i4874.m_GlyphIndex = i4875[0]
  i4874.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i4875[1], i4874.m_GlyphValueRecord)
  return i4874
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i4876 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i4877 = data
  i4876.m_XPlacement = i4877[0]
  i4876.m_YPlacement = i4877[1]
  i4876.m_XAdvance = i4877[2]
  i4876.m_YAdvance = i4877[3]
  return i4876
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i4880 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i4881 = data
  i4880.m_BaseGlyphID = i4881[0]
  i4880.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i4881[1], i4880.m_BaseGlyphAnchorPoint)
  i4880.m_MarkGlyphID = i4881[2]
  i4880.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i4881[3], i4880.m_MarkPositionAdjustment)
  return i4880
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i4882 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i4883 = data
  i4882.m_XCoordinate = i4883[0]
  i4882.m_YCoordinate = i4883[1]
  return i4882
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i4884 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i4885 = data
  i4884.m_XPositionAdjustment = i4885[0]
  i4884.m_YPositionAdjustment = i4885[1]
  return i4884
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i4888 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i4889 = data
  i4888.m_BaseMarkGlyphID = i4889[0]
  i4888.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i4889[1], i4888.m_BaseMarkGlyphAnchorPoint)
  i4888.m_CombiningMarkGlyphID = i4889[2]
  i4888.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i4889[3], i4888.m_CombiningMarkPositionAdjustment)
  return i4888
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i4894 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i4895 = data
  request.r(i4895[0], i4895[1], 0, i4894, 'regularTypeface')
  request.r(i4895[2], i4895[3], 0, i4894, 'italicTypeface')
  return i4894
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i4896 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i4897 = data
  i4896.Name = i4897[0]
  i4896.PointSize = i4897[1]
  i4896.Scale = i4897[2]
  i4896.CharacterCount = i4897[3]
  i4896.LineHeight = i4897[4]
  i4896.Baseline = i4897[5]
  i4896.Ascender = i4897[6]
  i4896.CapHeight = i4897[7]
  i4896.Descender = i4897[8]
  i4896.CenterLine = i4897[9]
  i4896.SuperscriptOffset = i4897[10]
  i4896.SubscriptOffset = i4897[11]
  i4896.SubSize = i4897[12]
  i4896.Underline = i4897[13]
  i4896.UnderlineThickness = i4897[14]
  i4896.strikethrough = i4897[15]
  i4896.strikethroughThickness = i4897[16]
  i4896.TabWidth = i4897[17]
  i4896.Padding = i4897[18]
  i4896.AtlasWidth = i4897[19]
  i4896.AtlasHeight = i4897[20]
  return i4896
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i4900 = root || request.c( 'TMPro.TMP_Glyph' )
  var i4901 = data
  i4900.id = i4901[0]
  i4900.x = i4901[1]
  i4900.y = i4901[2]
  i4900.width = i4901[3]
  i4900.height = i4901[4]
  i4900.xOffset = i4901[5]
  i4900.yOffset = i4901[6]
  i4900.xAdvance = i4901[7]
  i4900.scale = i4901[8]
  return i4900
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i4902 = root || request.c( 'TMPro.KerningTable' )
  var i4903 = data
  var i4905 = i4903[0]
  var i4904 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i4905.length; i += 1) {
    i4904.add(request.d('TMPro.KerningPair', i4905[i + 0]));
  }
  i4902.kerningPairs = i4904
  return i4902
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i4908 = root || request.c( 'TMPro.KerningPair' )
  var i4909 = data
  i4908.xOffset = i4909[0]
  i4908.m_FirstGlyph = i4909[1]
  i4908.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i4909[2], i4908.m_FirstGlyphAdjustments)
  i4908.m_SecondGlyph = i4909[3]
  i4908.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i4909[4], i4908.m_SecondGlyphAdjustments)
  i4908.m_IgnoreSpacingAdjustments = !!i4909[5]
  return i4908
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i4910 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i4911 = data
  i4910.m_FaceIndex = i4911[0]
  i4910.m_FamilyName = i4911[1]
  i4910.m_StyleName = i4911[2]
  i4910.m_PointSize = i4911[3]
  i4910.m_Scale = i4911[4]
  i4910.m_UnitsPerEM = i4911[5]
  i4910.m_LineHeight = i4911[6]
  i4910.m_AscentLine = i4911[7]
  i4910.m_CapLine = i4911[8]
  i4910.m_MeanLine = i4911[9]
  i4910.m_Baseline = i4911[10]
  i4910.m_DescentLine = i4911[11]
  i4910.m_SuperscriptOffset = i4911[12]
  i4910.m_SuperscriptSize = i4911[13]
  i4910.m_SubscriptOffset = i4911[14]
  i4910.m_SubscriptSize = i4911[15]
  i4910.m_UnderlineOffset = i4911[16]
  i4910.m_UnderlineThickness = i4911[17]
  i4910.m_StrikethroughOffset = i4911[18]
  i4910.m_StrikethroughThickness = i4911[19]
  i4910.m_TabWidth = i4911[20]
  return i4910
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i4912 = root || request.c( 'TMPro.TMP_Settings' )
  var i4913 = data
  i4912.assetVersion = i4913[0]
  i4912.m_TextWrappingMode = i4913[1]
  i4912.m_enableKerning = !!i4913[2]
  var i4915 = i4913[3]
  var i4914 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4915.length; i += 1) {
    i4914.add(i4915[i + 0]);
  }
  i4912.m_ActiveFontFeatures = i4914
  i4912.m_enableExtraPadding = !!i4913[4]
  i4912.m_enableTintAllSprites = !!i4913[5]
  i4912.m_enableParseEscapeCharacters = !!i4913[6]
  i4912.m_EnableRaycastTarget = !!i4913[7]
  i4912.m_GetFontFeaturesAtRuntime = !!i4913[8]
  i4912.m_missingGlyphCharacter = i4913[9]
  i4912.m_ClearDynamicDataOnBuild = !!i4913[10]
  i4912.m_warningsDisabled = !!i4913[11]
  request.r(i4913[12], i4913[13], 0, i4912, 'm_defaultFontAsset')
  i4912.m_defaultFontAssetPath = i4913[14]
  i4912.m_defaultFontSize = i4913[15]
  i4912.m_defaultAutoSizeMinRatio = i4913[16]
  i4912.m_defaultAutoSizeMaxRatio = i4913[17]
  i4912.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i4913[18], i4913[19] )
  i4912.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i4913[20], i4913[21] )
  i4912.m_autoSizeTextContainer = !!i4913[22]
  i4912.m_IsTextObjectScaleStatic = !!i4913[23]
  var i4917 = i4913[24]
  var i4916 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4917.length; i += 2) {
  request.r(i4917[i + 0], i4917[i + 1], 1, i4916, '')
  }
  i4912.m_fallbackFontAssets = i4916
  i4912.m_matchMaterialPreset = !!i4913[25]
  i4912.m_HideSubTextObjects = !!i4913[26]
  request.r(i4913[27], i4913[28], 0, i4912, 'm_defaultSpriteAsset')
  i4912.m_defaultSpriteAssetPath = i4913[29]
  i4912.m_enableEmojiSupport = !!i4913[30]
  i4912.m_MissingCharacterSpriteUnicode = i4913[31]
  var i4919 = i4913[32]
  var i4918 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i4919.length; i += 2) {
  request.r(i4919[i + 0], i4919[i + 1], 1, i4918, '')
  }
  i4912.m_EmojiFallbackTextAssets = i4918
  i4912.m_defaultColorGradientPresetsPath = i4913[33]
  request.r(i4913[34], i4913[35], 0, i4912, 'm_defaultStyleSheet')
  i4912.m_StyleSheetsResourcePath = i4913[36]
  request.r(i4913[37], i4913[38], 0, i4912, 'm_leadingCharacters')
  request.r(i4913[39], i4913[40], 0, i4912, 'm_followingCharacters')
  i4912.m_UseModernHangulLineBreakingRules = !!i4913[41]
  return i4912
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i4922 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i4923 = data
  request.r(i4923[0], i4923[1], 0, i4922, 'spriteSheet')
  var i4925 = i4923[2]
  var i4924 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i4925.length; i += 1) {
    i4924.add(request.d('TMPro.TMP_Sprite', i4925[i + 0]));
  }
  i4922.spriteInfoList = i4924
  var i4927 = i4923[3]
  var i4926 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i4927.length; i += 2) {
  request.r(i4927[i + 0], i4927[i + 1], 1, i4926, '')
  }
  i4922.fallbackSpriteAssets = i4926
  var i4929 = i4923[4]
  var i4928 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i4929.length; i += 1) {
    i4928.add(request.d('TMPro.TMP_SpriteCharacter', i4929[i + 0]));
  }
  i4922.m_SpriteCharacterTable = i4928
  var i4931 = i4923[5]
  var i4930 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i4931.length; i += 1) {
    i4930.add(request.d('TMPro.TMP_SpriteGlyph', i4931[i + 0]));
  }
  i4922.m_GlyphTable = i4930
  i4922.m_Version = i4923[6]
  i4922.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i4923[7], i4922.m_FaceInfo)
  request.r(i4923[8], i4923[9], 0, i4922, 'm_Material')
  return i4922
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i4934 = root || request.c( 'TMPro.TMP_Sprite' )
  var i4935 = data
  i4934.name = i4935[0]
  i4934.hashCode = i4935[1]
  i4934.unicode = i4935[2]
  i4934.pivot = new pc.Vec2( i4935[3], i4935[4] )
  request.r(i4935[5], i4935[6], 0, i4934, 'sprite')
  i4934.id = i4935[7]
  i4934.x = i4935[8]
  i4934.y = i4935[9]
  i4934.width = i4935[10]
  i4934.height = i4935[11]
  i4934.xOffset = i4935[12]
  i4934.yOffset = i4935[13]
  i4934.xAdvance = i4935[14]
  i4934.scale = i4935[15]
  return i4934
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i4940 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i4941 = data
  i4940.m_Name = i4941[0]
  i4940.m_ElementType = i4941[1]
  i4940.m_Unicode = i4941[2]
  i4940.m_GlyphIndex = i4941[3]
  i4940.m_Scale = i4941[4]
  return i4940
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i4944 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i4945 = data
  request.r(i4945[0], i4945[1], 0, i4944, 'sprite')
  i4944.m_Index = i4945[2]
  i4944.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i4945[3], i4944.m_Metrics)
  i4944.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i4945[4], i4944.m_GlyphRect)
  i4944.m_Scale = i4945[5]
  i4944.m_AtlasIndex = i4945[6]
  i4944.m_ClassDefinitionType = i4945[7]
  return i4944
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i4946 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i4947 = data
  var i4949 = i4947[0]
  var i4948 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i4949.length; i += 1) {
    i4948.add(request.d('TMPro.TMP_Style', i4949[i + 0]));
  }
  i4946.m_StyleList = i4948
  return i4946
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i4952 = root || request.c( 'TMPro.TMP_Style' )
  var i4953 = data
  i4952.m_Name = i4953[0]
  i4952.m_HashCode = i4953[1]
  i4952.m_OpeningDefinition = i4953[2]
  i4952.m_ClosingDefinition = i4953[3]
  i4952.m_OpeningTagArray = i4953[4]
  i4952.m_ClosingTagArray = i4953[5]
  return i4952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i4954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i4955 = data
  var i4957 = i4955[0]
  var i4956 = []
  for(var i = 0; i < i4957.length; i += 1) {
    i4956.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i4957[i + 0]) );
  }
  i4954.files = i4956
  i4954.componentToPrefabIds = i4955[1]
  return i4954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i4960 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i4961 = data
  i4960.path = i4961[0]
  request.r(i4961[1], i4961[2], 0, i4960, 'unityObject')
  return i4960
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i4962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i4963 = data
  var i4965 = i4963[0]
  var i4964 = []
  for(var i = 0; i < i4965.length; i += 1) {
    i4964.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i4965[i + 0]) );
  }
  i4962.scriptsExecutionOrder = i4964
  var i4967 = i4963[1]
  var i4966 = []
  for(var i = 0; i < i4967.length; i += 1) {
    i4966.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i4967[i + 0]) );
  }
  i4962.sortingLayers = i4966
  var i4969 = i4963[2]
  var i4968 = []
  for(var i = 0; i < i4969.length; i += 1) {
    i4968.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i4969[i + 0]) );
  }
  i4962.cullingLayers = i4968
  i4962.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i4963[3], i4962.timeSettings)
  i4962.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i4963[4], i4962.physicsSettings)
  i4962.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i4963[5], i4962.physics2DSettings)
  i4962.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4963[6], i4962.qualitySettings)
  i4962.enableRealtimeShadows = !!i4963[7]
  i4962.enableAutoInstancing = !!i4963[8]
  i4962.enableStaticBatching = !!i4963[9]
  i4962.enableDynamicBatching = !!i4963[10]
  i4962.usePreservativeDynamicBatching = !!i4963[11]
  i4962.lightmapEncodingQuality = i4963[12]
  i4962.desiredColorSpace = i4963[13]
  var i4971 = i4963[14]
  var i4970 = []
  for(var i = 0; i < i4971.length; i += 1) {
    i4970.push( i4971[i + 0] );
  }
  i4962.allTags = i4970
  return i4962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i4974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i4975 = data
  i4974.name = i4975[0]
  i4974.value = i4975[1]
  return i4974
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i4978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i4979 = data
  i4978.id = i4979[0]
  i4978.name = i4979[1]
  i4978.value = i4979[2]
  return i4978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i4982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i4983 = data
  i4982.id = i4983[0]
  i4982.name = i4983[1]
  return i4982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i4984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i4985 = data
  i4984.fixedDeltaTime = i4985[0]
  i4984.maximumDeltaTime = i4985[1]
  i4984.timeScale = i4985[2]
  i4984.maximumParticleTimestep = i4985[3]
  return i4984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i4986 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i4987 = data
  i4986.gravity = new pc.Vec3( i4987[0], i4987[1], i4987[2] )
  i4986.defaultSolverIterations = i4987[3]
  i4986.bounceThreshold = i4987[4]
  i4986.autoSyncTransforms = !!i4987[5]
  i4986.autoSimulation = !!i4987[6]
  var i4989 = i4987[7]
  var i4988 = []
  for(var i = 0; i < i4989.length; i += 1) {
    i4988.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i4989[i + 0]) );
  }
  i4986.collisionMatrix = i4988
  return i4986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i4992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i4993 = data
  i4992.enabled = !!i4993[0]
  i4992.layerId = i4993[1]
  i4992.otherLayerId = i4993[2]
  return i4992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i4994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i4995 = data
  request.r(i4995[0], i4995[1], 0, i4994, 'material')
  i4994.gravity = new pc.Vec2( i4995[2], i4995[3] )
  i4994.positionIterations = i4995[4]
  i4994.velocityIterations = i4995[5]
  i4994.velocityThreshold = i4995[6]
  i4994.maxLinearCorrection = i4995[7]
  i4994.maxAngularCorrection = i4995[8]
  i4994.maxTranslationSpeed = i4995[9]
  i4994.maxRotationSpeed = i4995[10]
  i4994.baumgarteScale = i4995[11]
  i4994.baumgarteTOIScale = i4995[12]
  i4994.timeToSleep = i4995[13]
  i4994.linearSleepTolerance = i4995[14]
  i4994.angularSleepTolerance = i4995[15]
  i4994.defaultContactOffset = i4995[16]
  i4994.autoSimulation = !!i4995[17]
  i4994.queriesHitTriggers = !!i4995[18]
  i4994.queriesStartInColliders = !!i4995[19]
  i4994.callbacksOnDisable = !!i4995[20]
  i4994.reuseCollisionCallbacks = !!i4995[21]
  i4994.autoSyncTransforms = !!i4995[22]
  var i4997 = i4995[23]
  var i4996 = []
  for(var i = 0; i < i4997.length; i += 1) {
    i4996.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i4997[i + 0]) );
  }
  i4994.collisionMatrix = i4996
  return i4994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i5000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i5001 = data
  i5000.enabled = !!i5001[0]
  i5000.layerId = i5001[1]
  i5000.otherLayerId = i5001[2]
  return i5000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i5002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i5003 = data
  var i5005 = i5003[0]
  var i5004 = []
  for(var i = 0; i < i5005.length; i += 1) {
    i5004.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i5005[i + 0]) );
  }
  i5002.qualityLevels = i5004
  var i5007 = i5003[1]
  var i5006 = []
  for(var i = 0; i < i5007.length; i += 1) {
    i5006.push( i5007[i + 0] );
  }
  i5002.names = i5006
  i5002.shadows = i5003[2]
  i5002.anisotropicFiltering = i5003[3]
  i5002.antiAliasing = i5003[4]
  i5002.lodBias = i5003[5]
  i5002.shadowCascades = i5003[6]
  i5002.shadowDistance = i5003[7]
  i5002.shadowmaskMode = i5003[8]
  i5002.shadowProjection = i5003[9]
  i5002.shadowResolution = i5003[10]
  i5002.softParticles = !!i5003[11]
  i5002.softVegetation = !!i5003[12]
  i5002.activeColorSpace = i5003[13]
  i5002.desiredColorSpace = i5003[14]
  i5002.masterTextureLimit = i5003[15]
  i5002.maxQueuedFrames = i5003[16]
  i5002.particleRaycastBudget = i5003[17]
  i5002.pixelLightCount = i5003[18]
  i5002.realtimeReflectionProbes = !!i5003[19]
  i5002.shadowCascade2Split = i5003[20]
  i5002.shadowCascade4Split = new pc.Vec3( i5003[21], i5003[22], i5003[23] )
  i5002.streamingMipmapsActive = !!i5003[24]
  i5002.vSyncCount = i5003[25]
  i5002.asyncUploadBufferSize = i5003[26]
  i5002.asyncUploadTimeSlice = i5003[27]
  i5002.billboardsFaceCameraPosition = !!i5003[28]
  i5002.shadowNearPlaneOffset = i5003[29]
  i5002.streamingMipmapsMemoryBudget = i5003[30]
  i5002.maximumLODLevel = i5003[31]
  i5002.streamingMipmapsAddAllCameras = !!i5003[32]
  i5002.streamingMipmapsMaxLevelReduction = i5003[33]
  i5002.streamingMipmapsRenderersPerFrame = i5003[34]
  i5002.resolutionScalingFixedDPIFactor = i5003[35]
  i5002.streamingMipmapsMaxFileIORequests = i5003[36]
  i5002.currentQualityLevel = i5003[37]
  return i5002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i5010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i5011 = data
  i5010.name = i5011[0]
  var i5013 = i5011[1]
  var i5012 = []
  for(var i = 0; i < i5013.length; i += 1) {
    i5012.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i5013[i + 0]) );
  }
  i5010.tos = i5012
  var i5015 = i5011[2]
  var i5014 = []
  for(var i = 0; i < i5015.length; i += 1) {
    i5014.push( i5015[i + 0] );
  }
  i5010.constant = i5014
  i5010.isValid = !!i5011[3]
  i5010.isHuman = !!i5011[4]
  i5010.hasRootMotion = !!i5011[5]
  return i5010
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i5018 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i5019 = data
  i5018.hash = i5019[0]
  i5018.path = i5019[1]
  return i5018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i5022 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i5023 = data
  i5022.weight = i5023[0]
  i5022.vertices = i5023[1]
  i5022.normals = i5023[2]
  i5022.tangents = i5023[3]
  return i5022
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i5024 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i5025 = data
  request.r(i5025[0], i5025[1], 0, i5024, 'm_ObjectArgument')
  i5024.m_ObjectArgumentAssemblyTypeName = i5025[2]
  i5024.m_IntArgument = i5025[3]
  i5024.m_FloatArgument = i5025[4]
  i5024.m_StringArgument = i5025[5]
  i5024.m_BoolArgument = !!i5025[6]
  return i5024
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i5026 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i5027 = data
  i5026.xPlacement = i5027[0]
  i5026.yPlacement = i5027[1]
  i5026.xAdvance = i5027[2]
  i5026.yAdvance = i5027[3]
  return i5026
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

Deserializers.creativeName = "C1_2611_TamNTM_TE_V07_DungNV";

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

Deserializers.buildID = "84420731-aa10-4772-8ac9-84d9bb594f43";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

