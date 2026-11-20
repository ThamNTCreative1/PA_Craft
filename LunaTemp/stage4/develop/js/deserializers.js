var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i4178 = root || request.c( 'UnityEngine.JointSpring' )
  var i4179 = data
  i4178.spring = i4179[0]
  i4178.damper = i4179[1]
  i4178.targetPosition = i4179[2]
  return i4178
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i4180 = root || request.c( 'UnityEngine.JointMotor' )
  var i4181 = data
  i4180.m_TargetVelocity = i4181[0]
  i4180.m_Force = i4181[1]
  i4180.m_FreeSpin = i4181[2]
  return i4180
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i4182 = root || request.c( 'UnityEngine.JointLimits' )
  var i4183 = data
  i4182.m_Min = i4183[0]
  i4182.m_Max = i4183[1]
  i4182.m_Bounciness = i4183[2]
  i4182.m_BounceMinVelocity = i4183[3]
  i4182.m_ContactDistance = i4183[4]
  i4182.minBounce = i4183[5]
  i4182.maxBounce = i4183[6]
  return i4182
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i4184 = root || request.c( 'UnityEngine.JointDrive' )
  var i4185 = data
  i4184.m_PositionSpring = i4185[0]
  i4184.m_PositionDamper = i4185[1]
  i4184.m_MaximumForce = i4185[2]
  i4184.m_UseAcceleration = i4185[3]
  return i4184
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i4186 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i4187 = data
  i4186.m_Spring = i4187[0]
  i4186.m_Damper = i4187[1]
  return i4186
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i4188 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i4189 = data
  i4188.m_Limit = i4189[0]
  i4188.m_Bounciness = i4189[1]
  i4188.m_ContactDistance = i4189[2]
  return i4188
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i4190 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i4191 = data
  i4190.m_ExtremumSlip = i4191[0]
  i4190.m_ExtremumValue = i4191[1]
  i4190.m_AsymptoteSlip = i4191[2]
  i4190.m_AsymptoteValue = i4191[3]
  i4190.m_Stiffness = i4191[4]
  return i4190
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i4192 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i4193 = data
  i4192.m_LowerAngle = i4193[0]
  i4192.m_UpperAngle = i4193[1]
  return i4192
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i4194 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i4195 = data
  i4194.m_MotorSpeed = i4195[0]
  i4194.m_MaximumMotorTorque = i4195[1]
  return i4194
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i4196 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i4197 = data
  i4196.m_DampingRatio = i4197[0]
  i4196.m_Frequency = i4197[1]
  i4196.m_Angle = i4197[2]
  return i4196
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i4198 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i4199 = data
  i4198.m_LowerTranslation = i4199[0]
  i4198.m_UpperTranslation = i4199[1]
  return i4198
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i4200 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i4201 = data
  i4200.name = i4201[0]
  i4200.halfPrecision = !!i4201[1]
  i4200.useSimplification = !!i4201[2]
  i4200.useUInt32IndexFormat = !!i4201[3]
  i4200.vertexCount = i4201[4]
  i4200.aabb = i4201[5]
  var i4203 = i4201[6]
  var i4202 = []
  for(var i = 0; i < i4203.length; i += 1) {
    i4202.push( !!i4203[i + 0] );
  }
  i4200.streams = i4202
  i4200.vertices = i4201[7]
  var i4205 = i4201[8]
  var i4204 = []
  for(var i = 0; i < i4205.length; i += 1) {
    i4204.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i4205[i + 0]) );
  }
  i4200.subMeshes = i4204
  var i4207 = i4201[9]
  var i4206 = []
  for(var i = 0; i < i4207.length; i += 16) {
    i4206.push( new pc.Mat4().setData(i4207[i + 0], i4207[i + 1], i4207[i + 2], i4207[i + 3],  i4207[i + 4], i4207[i + 5], i4207[i + 6], i4207[i + 7],  i4207[i + 8], i4207[i + 9], i4207[i + 10], i4207[i + 11],  i4207[i + 12], i4207[i + 13], i4207[i + 14], i4207[i + 15]) );
  }
  i4200.bindposes = i4206
  var i4209 = i4201[10]
  var i4208 = []
  for(var i = 0; i < i4209.length; i += 1) {
    i4208.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i4209[i + 0]) );
  }
  i4200.blendShapes = i4208
  return i4200
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i4214 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i4215 = data
  i4214.triangles = i4215[0]
  return i4214
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i4220 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i4221 = data
  i4220.name = i4221[0]
  var i4223 = i4221[1]
  var i4222 = []
  for(var i = 0; i < i4223.length; i += 1) {
    i4222.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i4223[i + 0]) );
  }
  i4220.frames = i4222
  return i4220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i4224 = root || new pc.UnityMaterial()
  var i4225 = data
  i4224.name = i4225[0]
  request.r(i4225[1], i4225[2], 0, i4224, 'shader')
  i4224.renderQueue = i4225[3]
  i4224.enableInstancing = !!i4225[4]
  var i4227 = i4225[5]
  var i4226 = []
  for(var i = 0; i < i4227.length; i += 1) {
    i4226.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i4227[i + 0]) );
  }
  i4224.floatParameters = i4226
  var i4229 = i4225[6]
  var i4228 = []
  for(var i = 0; i < i4229.length; i += 1) {
    i4228.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i4229[i + 0]) );
  }
  i4224.colorParameters = i4228
  var i4231 = i4225[7]
  var i4230 = []
  for(var i = 0; i < i4231.length; i += 1) {
    i4230.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i4231[i + 0]) );
  }
  i4224.vectorParameters = i4230
  var i4233 = i4225[8]
  var i4232 = []
  for(var i = 0; i < i4233.length; i += 1) {
    i4232.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i4233[i + 0]) );
  }
  i4224.textureParameters = i4232
  var i4235 = i4225[9]
  var i4234 = []
  for(var i = 0; i < i4235.length; i += 1) {
    i4234.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i4235[i + 0]) );
  }
  i4224.materialFlags = i4234
  return i4224
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i4238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i4239 = data
  i4238.name = i4239[0]
  i4238.value = i4239[1]
  return i4238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i4242 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i4243 = data
  i4242.name = i4243[0]
  i4242.value = new pc.Color(i4243[1], i4243[2], i4243[3], i4243[4])
  return i4242
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i4246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i4247 = data
  i4246.name = i4247[0]
  i4246.value = new pc.Vec4( i4247[1], i4247[2], i4247[3], i4247[4] )
  return i4246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i4250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i4251 = data
  i4250.name = i4251[0]
  request.r(i4251[1], i4251[2], 0, i4250, 'value')
  return i4250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i4254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i4255 = data
  i4254.name = i4255[0]
  i4254.enabled = !!i4255[1]
  return i4254
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i4256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i4257 = data
  i4256.name = i4257[0]
  i4256.width = i4257[1]
  i4256.height = i4257[2]
  i4256.mipmapCount = i4257[3]
  i4256.anisoLevel = i4257[4]
  i4256.filterMode = i4257[5]
  i4256.hdr = !!i4257[6]
  i4256.format = i4257[7]
  i4256.wrapMode = i4257[8]
  i4256.alphaIsTransparency = !!i4257[9]
  i4256.alphaSource = i4257[10]
  i4256.graphicsFormat = i4257[11]
  i4256.sRGBTexture = !!i4257[12]
  i4256.desiredColorSpace = i4257[13]
  i4256.wrapU = i4257[14]
  i4256.wrapV = i4257[15]
  return i4256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i4258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i4259 = data
  i4258.name = i4259[0]
  i4258.atlasId = i4259[1]
  i4258.mipmapCount = i4259[2]
  i4258.hdr = !!i4259[3]
  i4258.size = i4259[4]
  i4258.anisoLevel = i4259[5]
  i4258.filterMode = i4259[6]
  var i4261 = i4259[7]
  var i4260 = []
  for(var i = 0; i < i4261.length; i += 4) {
    i4260.push( UnityEngine.Rect.MinMaxRect(i4261[i + 0], i4261[i + 1], i4261[i + 2], i4261[i + 3]) );
  }
  i4258.rects = i4260
  i4258.wrapU = i4259[8]
  i4258.wrapV = i4259[9]
  return i4258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i4264 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i4265 = data
  i4264.name = i4265[0]
  i4264.index = i4265[1]
  i4264.startup = !!i4265[2]
  return i4264
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i4266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i4267 = data
  request.r(i4267[0], i4267[1], 0, i4266, 'sharedMesh')
  return i4266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i4268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i4269 = data
  request.r(i4269[0], i4269[1], 0, i4268, 'additionalVertexStreams')
  i4268.enabled = !!i4269[2]
  request.r(i4269[3], i4269[4], 0, i4268, 'sharedMaterial')
  var i4271 = i4269[5]
  var i4270 = []
  for(var i = 0; i < i4271.length; i += 2) {
  request.r(i4271[i + 0], i4271[i + 1], 2, i4270, '')
  }
  i4268.sharedMaterials = i4270
  i4268.receiveShadows = !!i4269[6]
  i4268.shadowCastingMode = i4269[7]
  i4268.sortingLayerID = i4269[8]
  i4268.sortingOrder = i4269[9]
  i4268.lightmapIndex = i4269[10]
  i4268.lightmapSceneIndex = i4269[11]
  i4268.lightmapScaleOffset = new pc.Vec4( i4269[12], i4269[13], i4269[14], i4269[15] )
  i4268.lightProbeUsage = i4269[16]
  i4268.reflectionProbeUsage = i4269[17]
  return i4268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i4274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i4275 = data
  i4274.name = i4275[0]
  i4274.tagId = i4275[1]
  i4274.enabled = !!i4275[2]
  i4274.isStatic = !!i4275[3]
  i4274.layer = i4275[4]
  return i4274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i4276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i4277 = data
  request.r(i4277[0], i4277[1], 0, i4276, 'clip')
  request.r(i4277[2], i4277[3], 0, i4276, 'outputAudioMixerGroup')
  i4276.playOnAwake = !!i4277[4]
  i4276.loop = !!i4277[5]
  i4276.time = i4277[6]
  i4276.volume = i4277[7]
  i4276.pitch = i4277[8]
  i4276.enabled = !!i4277[9]
  return i4276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i4278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i4279 = data
  i4278.center = new pc.Vec3( i4279[0], i4279[1], i4279[2] )
  i4278.radius = i4279[3]
  i4278.enabled = !!i4279[4]
  i4278.isTrigger = !!i4279[5]
  request.r(i4279[6], i4279[7], 0, i4278, 'material')
  return i4278
}

Deserializers["GridAgent"] = function (request, data, root) {
  var i4280 = root || request.c( 'GridAgent' )
  var i4281 = data
  i4280.Speed = i4281[0]
  request.r(i4281[1], i4281[2], 0, i4280, 'grid')
  i4280.repathInterval = i4281[3]
  i4280.turnSpeed = i4281[4]
  i4280.heightFollow = i4281[5]
  i4280.cornerTolerance = i4281[6]
  return i4280
}

Deserializers["Monster"] = function (request, data, root) {
  var i4282 = root || request.c( 'Monster' )
  var i4283 = data
  request.r(i4283[0], i4283[1], 0, i4282, 'agent')
  request.r(i4283[2], i4283[3], 0, i4282, 'animator')
  request.r(i4283[4], i4283[5], 0, i4282, 'nest')
  request.r(i4283[6], i4283[7], 0, i4282, 'exclamation')
  request.r(i4283[8], i4283[9], 0, i4282, 'audioSource')
  var i4285 = i4283[10]
  var i4284 = []
  for(var i = 0; i < i4285.length; i += 2) {
  request.r(i4285[i + 0], i4285[i + 1], 2, i4284, '')
  }
  i4282.angryClips = i4284
  var i4287 = i4283[11]
  var i4286 = []
  for(var i = 0; i < i4287.length; i += 2) {
  request.r(i4287[i + 0], i4287[i + 1], 2, i4286, '')
  }
  i4282.ambientClips = i4286
  i4282.minSoundDelay = i4283[12]
  i4282.maxSoundDelay = i4283[13]
  i4282.ambientVolume = i4283[14]
  request.r(i4283[15], i4283[16], 0, i4282, 'listener')
  i4282.hearDistance = i4283[17]
  i4282.angerDelay = i4283[18]
  i4282.minIdleTime = i4283[19]
  i4282.maxIdleTime = i4283[20]
  i4282.minWalkTime = i4283[21]
  i4282.maxWalkTime = i4283[22]
  i4282.wanderRadius = i4283[23]
  i4282.walkSpeed = i4283[24]
  i4282.chaseSpeed = i4283[25]
  i4282.returnSpeed = i4283[26]
  i4282.catchDistance = i4283[27]
  i4282.homeRadius = i4283[28]
  return i4282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i4290 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i4291 = data
  i4290.color = new pc.Color(i4291[0], i4291[1], i4291[2], i4291[3])
  request.r(i4291[4], i4291[5], 0, i4290, 'sprite')
  i4290.flipX = !!i4291[6]
  i4290.flipY = !!i4291[7]
  i4290.drawMode = i4291[8]
  i4290.size = new pc.Vec2( i4291[9], i4291[10] )
  i4290.tileMode = i4291[11]
  i4290.adaptiveModeThreshold = i4291[12]
  i4290.maskInteraction = i4291[13]
  i4290.spriteSortPoint = i4291[14]
  i4290.enabled = !!i4291[15]
  request.r(i4291[16], i4291[17], 0, i4290, 'sharedMaterial')
  var i4293 = i4291[18]
  var i4292 = []
  for(var i = 0; i < i4293.length; i += 2) {
  request.r(i4293[i + 0], i4293[i + 1], 2, i4292, '')
  }
  i4290.sharedMaterials = i4292
  i4290.receiveShadows = !!i4291[19]
  i4290.shadowCastingMode = i4291[20]
  i4290.sortingLayerID = i4291[21]
  i4290.sortingOrder = i4291[22]
  i4290.lightmapIndex = i4291[23]
  i4290.lightmapSceneIndex = i4291[24]
  i4290.lightmapScaleOffset = new pc.Vec4( i4291[25], i4291[26], i4291[27], i4291[28] )
  i4290.lightProbeUsage = i4291[29]
  i4290.reflectionProbeUsage = i4291[30]
  return i4290
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i4294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i4295 = data
  request.r(i4295[0], i4295[1], 0, i4294, 'animatorController')
  request.r(i4295[2], i4295[3], 0, i4294, 'avatar')
  i4294.updateMode = i4295[4]
  i4294.hasTransformHierarchy = !!i4295[5]
  i4294.applyRootMotion = !!i4295[6]
  var i4297 = i4295[7]
  var i4296 = []
  for(var i = 0; i < i4297.length; i += 2) {
  request.r(i4297[i + 0], i4297[i + 1], 2, i4296, '')
  }
  i4294.humanBones = i4296
  i4294.enabled = !!i4295[8]
  return i4294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i4300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i4301 = data
  i4300.aspect = i4301[0]
  i4300.orthographic = !!i4301[1]
  i4300.orthographicSize = i4301[2]
  i4300.backgroundColor = new pc.Color(i4301[3], i4301[4], i4301[5], i4301[6])
  i4300.nearClipPlane = i4301[7]
  i4300.farClipPlane = i4301[8]
  i4300.fieldOfView = i4301[9]
  i4300.depth = i4301[10]
  i4300.clearFlags = i4301[11]
  i4300.cullingMask = i4301[12]
  i4300.rect = i4301[13]
  request.r(i4301[14], i4301[15], 0, i4300, 'targetTexture')
  i4300.usePhysicalProperties = !!i4301[16]
  i4300.focalLength = i4301[17]
  i4300.sensorSize = new pc.Vec2( i4301[18], i4301[19] )
  i4300.lensShift = new pc.Vec2( i4301[20], i4301[21] )
  i4300.gateFit = i4301[22]
  i4300.commandBufferCount = i4301[23]
  i4300.cameraType = i4301[24]
  i4300.enabled = !!i4301[25]
  return i4300
}

Deserializers["ThirdPersonCamera"] = function (request, data, root) {
  var i4302 = root || request.c( 'ThirdPersonCamera' )
  var i4303 = data
  i4302.SensitivityScale = i4303[0]
  request.r(i4303[1], i4303[2], 0, i4302, 'cam')
  request.r(i4303[3], i4303[4], 0, i4302, 'followTarget')
  request.r(i4303[5], i4303[6], 0, i4302, 'player')
  request.r(i4303[7], i4303[8], 0, i4302, 'motor')
  request.r(i4303[9], i4303[10], 0, i4302, 'lookArea')
  i4302.cameraDistance = i4303[11]
  i4302.minDistance = i4303[12]
  i4302.cameraRadius = i4303[13]
  i4302.cameraReturnSpeed = i4303[14]
  i4302.minPitch = i4303[15]
  i4302.maxPitch = i4303[16]
  i4302.defaultPitch = i4303[17]
  i4302.lookSensitivity = new pc.Vec2( i4303[18], i4303[19] )
  i4302.mouseSensitivity = i4303[20]
  i4302.autoReturn = !!i4303[21]
  i4302.autoReturnDelay = i4303[22]
  i4302.autoReturnSpeed = i4303[23]
  i4302.shakeFrequency = i4303[24]
  i4302.useStartView = !!i4303[25]
  i4302.startYaw = i4303[26]
  i4302.startPitch = i4303[27]
  return i4302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i4304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i4305 = data
  request.r(i4305[0], i4305[1], 0, i4304, 'sharedMesh')
  i4304.convex = !!i4305[2]
  i4304.enabled = !!i4305[3]
  i4304.isTrigger = !!i4305[4]
  request.r(i4305[5], i4305[6], 0, i4304, 'material')
  return i4304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i4306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i4307 = data
  i4306.center = new pc.Vec3( i4307[0], i4307[1], i4307[2] )
  i4306.size = new pc.Vec3( i4307[3], i4307[4], i4307[5] )
  i4306.enabled = !!i4307[6]
  i4306.isTrigger = !!i4307[7]
  request.r(i4307[8], i4307[9], 0, i4306, 'material')
  return i4306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i4308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i4309 = data
  i4308.type = i4309[0]
  i4308.color = new pc.Color(i4309[1], i4309[2], i4309[3], i4309[4])
  i4308.cullingMask = i4309[5]
  i4308.intensity = i4309[6]
  i4308.range = i4309[7]
  i4308.spotAngle = i4309[8]
  i4308.shadows = i4309[9]
  i4308.shadowNormalBias = i4309[10]
  i4308.shadowBias = i4309[11]
  i4308.shadowStrength = i4309[12]
  i4308.shadowResolution = i4309[13]
  i4308.lightmapBakeType = i4309[14]
  i4308.renderMode = i4309[15]
  request.r(i4309[16], i4309[17], 0, i4308, 'cookie')
  i4308.cookieSize = i4309[18]
  i4308.shadowNearPlane = i4309[19]
  i4308.occlusionMaskChannel = i4309[20]
  i4308.isBaked = !!i4309[21]
  i4308.mixedLightingMode = i4309[22]
  i4308.enabled = !!i4309[23]
  return i4308
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i4310 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i4311 = data
  request.r(i4311[0], i4311[1], 0, i4310, 'm_FirstSelected')
  i4310.m_sendNavigationEvents = !!i4311[2]
  i4310.m_DragThreshold = i4311[3]
  return i4310
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i4312 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i4313 = data
  i4312.m_HorizontalAxis = i4313[0]
  i4312.m_VerticalAxis = i4313[1]
  i4312.m_SubmitButton = i4313[2]
  i4312.m_CancelButton = i4313[3]
  i4312.m_InputActionsPerSecond = i4313[4]
  i4312.m_RepeatDelay = i4313[5]
  i4312.m_ForceModuleActive = !!i4313[6]
  i4312.m_SendPointerHoverToParent = !!i4313[7]
  return i4312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i4314 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i4315 = data
  i4314.center = new pc.Vec3( i4315[0], i4315[1], i4315[2] )
  i4314.radius = i4315[3]
  i4314.height = i4315[4]
  i4314.direction = i4315[5]
  i4314.enabled = !!i4315[6]
  i4314.isTrigger = !!i4315[7]
  request.r(i4315[8], i4315[9], 0, i4314, 'material')
  return i4314
}

Deserializers["Nest"] = function (request, data, root) {
  var i4316 = root || request.c( 'Nest' )
  var i4317 = data
  i4316.tutorialNest = !!i4317[0]
  request.r(i4317[1], i4317[2], 0, i4316, 'eggs')
  request.r(i4317[3], i4317[4], 0, i4316, 'monster')
  i4316.refillDelay = i4317[5]
  return i4316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i4318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i4319 = data
  i4318.enabled = !!i4319[0]
  i4318.center = new pc.Vec3( i4319[1], i4319[2], i4319[3] )
  i4318.radius = i4319[4]
  i4318.height = i4319[5]
  i4318.minMoveDistance = i4319[6]
  i4318.skinWidth = i4319[7]
  i4318.enableOverlapRecovery = !!i4319[8]
  return i4318
}

Deserializers["Thief"] = function (request, data, root) {
  var i4320 = root || request.c( 'Thief' )
  var i4321 = data
  i4320.isPlayer = !!i4321[0]
  request.r(i4321[1], i4321[2], 0, i4320, 'game')
  request.r(i4321[3], i4321[4], 0, i4320, 'animator')
  request.r(i4321[5], i4321[6], 0, i4320, 'eggsVisual')
  request.r(i4321[7], i4321[8], 0, i4320, 'audioSource')
  var i4323 = i4321[9]
  var i4322 = []
  for(var i = 0; i < i4323.length; i += 2) {
  request.r(i4323[i + 0], i4323[i + 1], 2, i4322, '')
  }
  i4320.deathClips = i4322
  i4320.knockTime = i4321[10]
  i4320.standUpTime = i4321[11]
  return i4320
}

Deserializers["PlayerMotor"] = function (request, data, root) {
  var i4324 = root || request.c( 'PlayerMotor' )
  var i4325 = data
  i4324.Frozen = !!i4325[0]
  request.r(i4325[1], i4325[2], 0, i4324, 'controller')
  request.r(i4325[3], i4325[4], 0, i4324, 'animator')
  request.r(i4325[5], i4325[6], 0, i4324, 'thief')
  request.r(i4325[7], i4325[8], 0, i4324, 'cameraTransform')
  request.r(i4325[9], i4325[10], 0, i4324, 'joystick')
  request.r(i4325[11], i4325[12], 0, i4324, 'audioSource')
  request.r(i4325[13], i4325[14], 0, i4324, 'jumpClip')
  var i4327 = i4325[15]
  var i4326 = []
  for(var i = 0; i < i4327.length; i += 2) {
  request.r(i4327[i + 0], i4327[i + 1], 2, i4326, '')
  }
  i4324.footstepClips = i4326
  i4324.footstepInterval = i4325[16]
  i4324.footstepVolume = i4325[17]
  i4324.footstepPitchJitter = i4325[18]
  request.r(i4325[19], i4325[20], 0, i4324, 'footstepSource')
  i4324.runSpeed = i4325[21]
  i4324.rotationRate = i4325[22]
  i4324.jumpImpulse = i4325[23]
  i4324.gravity = i4325[24]
  i4324.runAnimSpeed = i4325[25]
  i4324.stepHeight = i4325[26]
  i4324.wallNormalY = i4325[27]
  i4324.killHeight = i4325[28]
  request.r(i4325[29], i4325[30], 0, i4324, 'respawnPoint')
  return i4324
}

Deserializers["GuideLine"] = function (request, data, root) {
  var i4328 = root || request.c( 'GuideLine' )
  var i4329 = data
  request.r(i4329[0], i4329[1], 0, i4328, 'line')
  request.r(i4329[2], i4329[3], 0, i4328, 'from')
  i4328.heightOffset = i4329[4]
  i4328.hideDistance = i4329[5]
  i4328.drawFromTarget = !!i4329[6]
  return i4328
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i4330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i4331 = data
  request.r(i4331[0], i4331[1], 0, i4330, 'sharedMesh')
  var i4333 = i4331[2]
  var i4332 = []
  for(var i = 0; i < i4333.length; i += 2) {
  request.r(i4333[i + 0], i4333[i + 1], 2, i4332, '')
  }
  i4330.bones = i4332
  i4330.updateWhenOffscreen = !!i4331[3]
  i4330.localBounds = i4331[4]
  request.r(i4331[5], i4331[6], 0, i4330, 'rootBone')
  var i4335 = i4331[7]
  var i4334 = []
  for(var i = 0; i < i4335.length; i += 1) {
    i4334.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i4335[i + 0]) );
  }
  i4330.blendShapesWeights = i4334
  i4330.enabled = !!i4331[8]
  request.r(i4331[9], i4331[10], 0, i4330, 'sharedMaterial')
  var i4337 = i4331[11]
  var i4336 = []
  for(var i = 0; i < i4337.length; i += 2) {
  request.r(i4337[i + 0], i4337[i + 1], 2, i4336, '')
  }
  i4330.sharedMaterials = i4336
  i4330.receiveShadows = !!i4331[12]
  i4330.shadowCastingMode = i4331[13]
  i4330.sortingLayerID = i4331[14]
  i4330.sortingOrder = i4331[15]
  i4330.lightmapIndex = i4331[16]
  i4330.lightmapSceneIndex = i4331[17]
  i4330.lightmapScaleOffset = new pc.Vec4( i4331[18], i4331[19], i4331[20], i4331[21] )
  i4330.lightProbeUsage = i4331[22]
  i4330.reflectionProbeUsage = i4331[23]
  return i4330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i4340 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i4341 = data
  i4340.weight = i4341[0]
  return i4340
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i4342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i4343 = data
  i4342.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i4343[0], i4342.main)
  i4342.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i4343[1], i4342.colorBySpeed)
  i4342.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i4343[2], i4342.colorOverLifetime)
  i4342.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i4343[3], i4342.emission)
  i4342.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i4343[4], i4342.rotationBySpeed)
  i4342.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i4343[5], i4342.rotationOverLifetime)
  i4342.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i4343[6], i4342.shape)
  i4342.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i4343[7], i4342.sizeBySpeed)
  i4342.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i4343[8], i4342.sizeOverLifetime)
  i4342.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i4343[9], i4342.textureSheetAnimation)
  i4342.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i4343[10], i4342.velocityOverLifetime)
  i4342.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i4343[11], i4342.noise)
  i4342.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i4343[12], i4342.inheritVelocity)
  i4342.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i4343[13], i4342.forceOverLifetime)
  i4342.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i4343[14], i4342.limitVelocityOverLifetime)
  i4342.useAutoRandomSeed = !!i4343[15]
  i4342.randomSeed = i4343[16]
  return i4342
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i4344 = root || new pc.ParticleSystemMain()
  var i4345 = data
  i4344.duration = i4345[0]
  i4344.loop = !!i4345[1]
  i4344.prewarm = !!i4345[2]
  i4344.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[3], i4344.startDelay)
  i4344.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[4], i4344.startLifetime)
  i4344.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[5], i4344.startSpeed)
  i4344.startSize3D = !!i4345[6]
  i4344.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[7], i4344.startSizeX)
  i4344.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[8], i4344.startSizeY)
  i4344.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[9], i4344.startSizeZ)
  i4344.startRotation3D = !!i4345[10]
  i4344.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[11], i4344.startRotationX)
  i4344.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[12], i4344.startRotationY)
  i4344.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[13], i4344.startRotationZ)
  i4344.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i4345[14], i4344.startColor)
  i4344.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4345[15], i4344.gravityModifier)
  i4344.simulationSpace = i4345[16]
  request.r(i4345[17], i4345[18], 0, i4344, 'customSimulationSpace')
  i4344.simulationSpeed = i4345[19]
  i4344.useUnscaledTime = !!i4345[20]
  i4344.scalingMode = i4345[21]
  i4344.playOnAwake = !!i4345[22]
  i4344.maxParticles = i4345[23]
  i4344.emitterVelocityMode = i4345[24]
  i4344.stopAction = i4345[25]
  return i4344
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i4346 = root || new pc.MinMaxCurve()
  var i4347 = data
  i4346.mode = i4347[0]
  i4346.curveMin = new pc.AnimationCurve( { keys_flow: i4347[1] } )
  i4346.curveMax = new pc.AnimationCurve( { keys_flow: i4347[2] } )
  i4346.curveMultiplier = i4347[3]
  i4346.constantMin = i4347[4]
  i4346.constantMax = i4347[5]
  return i4346
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i4348 = root || new pc.MinMaxGradient()
  var i4349 = data
  i4348.mode = i4349[0]
  i4348.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i4349[1], i4348.gradientMin)
  i4348.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i4349[2], i4348.gradientMax)
  i4348.colorMin = new pc.Color(i4349[3], i4349[4], i4349[5], i4349[6])
  i4348.colorMax = new pc.Color(i4349[7], i4349[8], i4349[9], i4349[10])
  return i4348
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i4350 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i4351 = data
  i4350.mode = i4351[0]
  var i4353 = i4351[1]
  var i4352 = []
  for(var i = 0; i < i4353.length; i += 1) {
    i4352.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i4353[i + 0]) );
  }
  i4350.colorKeys = i4352
  var i4355 = i4351[2]
  var i4354 = []
  for(var i = 0; i < i4355.length; i += 1) {
    i4354.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i4355[i + 0]) );
  }
  i4350.alphaKeys = i4354
  return i4350
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i4356 = root || new pc.ParticleSystemColorBySpeed()
  var i4357 = data
  i4356.enabled = !!i4357[0]
  i4356.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i4357[1], i4356.color)
  i4356.range = new pc.Vec2( i4357[2], i4357[3] )
  return i4356
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i4360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i4361 = data
  i4360.color = new pc.Color(i4361[0], i4361[1], i4361[2], i4361[3])
  i4360.time = i4361[4]
  return i4360
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i4364 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i4365 = data
  i4364.alpha = i4365[0]
  i4364.time = i4365[1]
  return i4364
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i4366 = root || new pc.ParticleSystemColorOverLifetime()
  var i4367 = data
  i4366.enabled = !!i4367[0]
  i4366.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i4367[1], i4366.color)
  return i4366
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i4368 = root || new pc.ParticleSystemEmitter()
  var i4369 = data
  i4368.enabled = !!i4369[0]
  i4368.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4369[1], i4368.rateOverTime)
  i4368.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4369[2], i4368.rateOverDistance)
  var i4371 = i4369[3]
  var i4370 = []
  for(var i = 0; i < i4371.length; i += 1) {
    i4370.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i4371[i + 0]) );
  }
  i4368.bursts = i4370
  return i4368
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i4374 = root || new pc.ParticleSystemBurst()
  var i4375 = data
  i4374.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4375[0], i4374.count)
  i4374.cycleCount = i4375[1]
  i4374.minCount = i4375[2]
  i4374.maxCount = i4375[3]
  i4374.repeatInterval = i4375[4]
  i4374.time = i4375[5]
  return i4374
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i4376 = root || new pc.ParticleSystemRotationBySpeed()
  var i4377 = data
  i4376.enabled = !!i4377[0]
  i4376.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[1], i4376.x)
  i4376.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[2], i4376.y)
  i4376.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4377[3], i4376.z)
  i4376.separateAxes = !!i4377[4]
  i4376.range = new pc.Vec2( i4377[5], i4377[6] )
  return i4376
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i4378 = root || new pc.ParticleSystemRotationOverLifetime()
  var i4379 = data
  i4378.enabled = !!i4379[0]
  i4378.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4379[1], i4378.x)
  i4378.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4379[2], i4378.y)
  i4378.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4379[3], i4378.z)
  i4378.separateAxes = !!i4379[4]
  return i4378
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i4380 = root || new pc.ParticleSystemShape()
  var i4381 = data
  i4380.enabled = !!i4381[0]
  i4380.shapeType = i4381[1]
  i4380.randomDirectionAmount = i4381[2]
  i4380.sphericalDirectionAmount = i4381[3]
  i4380.randomPositionAmount = i4381[4]
  i4380.alignToDirection = !!i4381[5]
  i4380.radius = i4381[6]
  i4380.radiusMode = i4381[7]
  i4380.radiusSpread = i4381[8]
  i4380.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4381[9], i4380.radiusSpeed)
  i4380.radiusThickness = i4381[10]
  i4380.angle = i4381[11]
  i4380.length = i4381[12]
  i4380.boxThickness = new pc.Vec3( i4381[13], i4381[14], i4381[15] )
  i4380.meshShapeType = i4381[16]
  request.r(i4381[17], i4381[18], 0, i4380, 'mesh')
  request.r(i4381[19], i4381[20], 0, i4380, 'meshRenderer')
  request.r(i4381[21], i4381[22], 0, i4380, 'skinnedMeshRenderer')
  i4380.useMeshMaterialIndex = !!i4381[23]
  i4380.meshMaterialIndex = i4381[24]
  i4380.useMeshColors = !!i4381[25]
  i4380.normalOffset = i4381[26]
  i4380.arc = i4381[27]
  i4380.arcMode = i4381[28]
  i4380.arcSpread = i4381[29]
  i4380.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4381[30], i4380.arcSpeed)
  i4380.donutRadius = i4381[31]
  i4380.position = new pc.Vec3( i4381[32], i4381[33], i4381[34] )
  i4380.rotation = new pc.Vec3( i4381[35], i4381[36], i4381[37] )
  i4380.scale = new pc.Vec3( i4381[38], i4381[39], i4381[40] )
  return i4380
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i4382 = root || new pc.ParticleSystemSizeBySpeed()
  var i4383 = data
  i4382.enabled = !!i4383[0]
  i4382.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[1], i4382.x)
  i4382.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[2], i4382.y)
  i4382.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4383[3], i4382.z)
  i4382.separateAxes = !!i4383[4]
  i4382.range = new pc.Vec2( i4383[5], i4383[6] )
  return i4382
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i4384 = root || new pc.ParticleSystemSizeOverLifetime()
  var i4385 = data
  i4384.enabled = !!i4385[0]
  i4384.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4385[1], i4384.x)
  i4384.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4385[2], i4384.y)
  i4384.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4385[3], i4384.z)
  i4384.separateAxes = !!i4385[4]
  return i4384
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i4386 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i4387 = data
  i4386.enabled = !!i4387[0]
  i4386.mode = i4387[1]
  i4386.animation = i4387[2]
  i4386.numTilesX = i4387[3]
  i4386.numTilesY = i4387[4]
  i4386.useRandomRow = !!i4387[5]
  i4386.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4387[6], i4386.frameOverTime)
  i4386.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4387[7], i4386.startFrame)
  i4386.cycleCount = i4387[8]
  i4386.rowIndex = i4387[9]
  i4386.flipU = i4387[10]
  i4386.flipV = i4387[11]
  i4386.spriteCount = i4387[12]
  var i4389 = i4387[13]
  var i4388 = []
  for(var i = 0; i < i4389.length; i += 2) {
  request.r(i4389[i + 0], i4389[i + 1], 2, i4388, '')
  }
  i4386.sprites = i4388
  return i4386
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i4392 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i4393 = data
  i4392.enabled = !!i4393[0]
  i4392.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[1], i4392.x)
  i4392.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[2], i4392.y)
  i4392.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[3], i4392.z)
  i4392.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[4], i4392.radial)
  i4392.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[5], i4392.speedModifier)
  i4392.space = i4393[6]
  i4392.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[7], i4392.orbitalX)
  i4392.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[8], i4392.orbitalY)
  i4392.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[9], i4392.orbitalZ)
  i4392.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[10], i4392.orbitalOffsetX)
  i4392.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[11], i4392.orbitalOffsetY)
  i4392.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4393[12], i4392.orbitalOffsetZ)
  return i4392
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i4394 = root || new pc.ParticleSystemNoise()
  var i4395 = data
  i4394.enabled = !!i4395[0]
  i4394.separateAxes = !!i4395[1]
  i4394.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[2], i4394.strengthX)
  i4394.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[3], i4394.strengthY)
  i4394.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[4], i4394.strengthZ)
  i4394.frequency = i4395[5]
  i4394.damping = !!i4395[6]
  i4394.octaveCount = i4395[7]
  i4394.octaveMultiplier = i4395[8]
  i4394.octaveScale = i4395[9]
  i4394.quality = i4395[10]
  i4394.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[11], i4394.scrollSpeed)
  i4394.scrollSpeedMultiplier = i4395[12]
  i4394.remapEnabled = !!i4395[13]
  i4394.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[14], i4394.remapX)
  i4394.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[15], i4394.remapY)
  i4394.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[16], i4394.remapZ)
  i4394.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[17], i4394.positionAmount)
  i4394.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[18], i4394.rotationAmount)
  i4394.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4395[19], i4394.sizeAmount)
  return i4394
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i4396 = root || new pc.ParticleSystemInheritVelocity()
  var i4397 = data
  i4396.enabled = !!i4397[0]
  i4396.mode = i4397[1]
  i4396.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4397[2], i4396.curve)
  return i4396
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i4398 = root || new pc.ParticleSystemForceOverLifetime()
  var i4399 = data
  i4398.enabled = !!i4399[0]
  i4398.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4399[1], i4398.x)
  i4398.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4399[2], i4398.y)
  i4398.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4399[3], i4398.z)
  i4398.space = i4399[4]
  i4398.randomized = !!i4399[5]
  return i4398
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i4400 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i4401 = data
  i4400.enabled = !!i4401[0]
  i4400.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4401[1], i4400.limit)
  i4400.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4401[2], i4400.limitX)
  i4400.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4401[3], i4400.limitY)
  i4400.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4401[4], i4400.limitZ)
  i4400.dampen = i4401[5]
  i4400.separateAxes = !!i4401[6]
  i4400.space = i4401[7]
  i4400.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i4401[8], i4400.drag)
  i4400.multiplyDragByParticleSize = !!i4401[9]
  i4400.multiplyDragByParticleVelocity = !!i4401[10]
  return i4400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i4402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i4403 = data
  request.r(i4403[0], i4403[1], 0, i4402, 'mesh')
  i4402.meshCount = i4403[2]
  i4402.activeVertexStreamsCount = i4403[3]
  i4402.alignment = i4403[4]
  i4402.renderMode = i4403[5]
  i4402.sortMode = i4403[6]
  i4402.lengthScale = i4403[7]
  i4402.velocityScale = i4403[8]
  i4402.cameraVelocityScale = i4403[9]
  i4402.normalDirection = i4403[10]
  i4402.sortingFudge = i4403[11]
  i4402.minParticleSize = i4403[12]
  i4402.maxParticleSize = i4403[13]
  i4402.pivot = new pc.Vec3( i4403[14], i4403[15], i4403[16] )
  request.r(i4403[17], i4403[18], 0, i4402, 'trailMaterial')
  i4402.applyActiveColorSpace = !!i4403[19]
  i4402.enabled = !!i4403[20]
  request.r(i4403[21], i4403[22], 0, i4402, 'sharedMaterial')
  var i4405 = i4403[23]
  var i4404 = []
  for(var i = 0; i < i4405.length; i += 2) {
  request.r(i4405[i + 0], i4405[i + 1], 2, i4404, '')
  }
  i4402.sharedMaterials = i4404
  i4402.receiveShadows = !!i4403[24]
  i4402.shadowCastingMode = i4403[25]
  i4402.sortingLayerID = i4403[26]
  i4402.sortingOrder = i4403[27]
  i4402.lightmapIndex = i4403[28]
  i4402.lightmapSceneIndex = i4403[29]
  i4402.lightmapScaleOffset = new pc.Vec4( i4403[30], i4403[31], i4403[32], i4403[33] )
  i4402.lightProbeUsage = i4403[34]
  i4402.reflectionProbeUsage = i4403[35]
  return i4402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i4406 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i4407 = data
  i4406.textureMode = i4407[0]
  i4406.alignment = i4407[1]
  i4406.widthCurve = new pc.AnimationCurve( { keys_flow: i4407[2] } )
  i4406.colorGradient = i4407[3] ? new pc.ColorGradient(i4407[3][0], i4407[3][1], i4407[3][2]) : null
  var i4409 = i4407[4]
  var i4408 = []
  for(var i = 0; i < i4409.length; i += 3) {
    i4408.push( new pc.Vec3( i4409[i + 0], i4409[i + 1], i4409[i + 2] ) );
  }
  i4406.positions = i4408
  i4406.positionCount = i4407[5]
  i4406.widthMultiplier = i4407[6]
  i4406.startWidth = i4407[7]
  i4406.endWidth = i4407[8]
  i4406.numCornerVertices = i4407[9]
  i4406.numCapVertices = i4407[10]
  i4406.useWorldSpace = !!i4407[11]
  i4406.loop = !!i4407[12]
  i4406.startColor = new pc.Color(i4407[13], i4407[14], i4407[15], i4407[16])
  i4406.endColor = new pc.Color(i4407[17], i4407[18], i4407[19], i4407[20])
  i4406.generateLightingData = !!i4407[21]
  i4406.enabled = !!i4407[22]
  request.r(i4407[23], i4407[24], 0, i4406, 'sharedMaterial')
  var i4411 = i4407[25]
  var i4410 = []
  for(var i = 0; i < i4411.length; i += 2) {
  request.r(i4411[i + 0], i4411[i + 1], 2, i4410, '')
  }
  i4406.sharedMaterials = i4410
  i4406.receiveShadows = !!i4407[26]
  i4406.shadowCastingMode = i4407[27]
  i4406.sortingLayerID = i4407[28]
  i4406.sortingOrder = i4407[29]
  i4406.lightmapIndex = i4407[30]
  i4406.lightmapSceneIndex = i4407[31]
  i4406.lightmapScaleOffset = new pc.Vec4( i4407[32], i4407[33], i4407[34], i4407[35] )
  i4406.lightProbeUsage = i4407[36]
  i4406.reflectionProbeUsage = i4407[37]
  return i4406
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i4414 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i4415 = data
  i4414.pivot = new pc.Vec2( i4415[0], i4415[1] )
  i4414.anchorMin = new pc.Vec2( i4415[2], i4415[3] )
  i4414.anchorMax = new pc.Vec2( i4415[4], i4415[5] )
  i4414.sizeDelta = new pc.Vec2( i4415[6], i4415[7] )
  i4414.anchoredPosition3D = new pc.Vec3( i4415[8], i4415[9], i4415[10] )
  i4414.rotation = new pc.Quat(i4415[11], i4415[12], i4415[13], i4415[14])
  i4414.scale = new pc.Vec3( i4415[15], i4415[16], i4415[17] )
  return i4414
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i4416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i4417 = data
  i4416.planeDistance = i4417[0]
  i4416.referencePixelsPerUnit = i4417[1]
  i4416.isFallbackOverlay = !!i4417[2]
  i4416.renderMode = i4417[3]
  i4416.renderOrder = i4417[4]
  i4416.sortingLayerName = i4417[5]
  i4416.sortingOrder = i4417[6]
  i4416.scaleFactor = i4417[7]
  request.r(i4417[8], i4417[9], 0, i4416, 'worldCamera')
  i4416.overrideSorting = !!i4417[10]
  i4416.pixelPerfect = !!i4417[11]
  i4416.targetDisplay = i4417[12]
  i4416.overridePixelPerfect = !!i4417[13]
  i4416.enabled = !!i4417[14]
  return i4416
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i4418 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i4419 = data
  i4418.m_UiScaleMode = i4419[0]
  i4418.m_ReferencePixelsPerUnit = i4419[1]
  i4418.m_ScaleFactor = i4419[2]
  i4418.m_ReferenceResolution = new pc.Vec2( i4419[3], i4419[4] )
  i4418.m_ScreenMatchMode = i4419[5]
  i4418.m_MatchWidthOrHeight = i4419[6]
  i4418.m_PhysicalUnit = i4419[7]
  i4418.m_FallbackScreenDPI = i4419[8]
  i4418.m_DefaultSpriteDPI = i4419[9]
  i4418.m_DynamicPixelsPerUnit = i4419[10]
  i4418.m_PresetInfoIsWorld = !!i4419[11]
  return i4418
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i4420 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i4421 = data
  i4420.m_IgnoreReversedGraphics = !!i4421[0]
  i4420.m_BlockingObjects = i4421[1]
  i4420.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i4421[2] )
  return i4420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i4422 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i4423 = data
  i4422.cullTransparentMesh = !!i4423[0]
  return i4422
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i4424 = root || request.c( 'UnityEngine.UI.Image' )
  var i4425 = data
  request.r(i4425[0], i4425[1], 0, i4424, 'm_Sprite')
  i4424.m_Type = i4425[2]
  i4424.m_PreserveAspect = !!i4425[3]
  i4424.m_FillCenter = !!i4425[4]
  i4424.m_FillMethod = i4425[5]
  i4424.m_FillAmount = i4425[6]
  i4424.m_FillClockwise = !!i4425[7]
  i4424.m_FillOrigin = i4425[8]
  i4424.m_UseSpriteMesh = !!i4425[9]
  i4424.m_PixelsPerUnitMultiplier = i4425[10]
  request.r(i4425[11], i4425[12], 0, i4424, 'm_Material')
  i4424.m_Maskable = !!i4425[13]
  i4424.m_Color = new pc.Color(i4425[14], i4425[15], i4425[16], i4425[17])
  i4424.m_RaycastTarget = !!i4425[18]
  i4424.m_RaycastPadding = new pc.Vec4( i4425[19], i4425[20], i4425[21], i4425[22] )
  return i4424
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i4426 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i4427 = data
  i4426.m_Spacing = i4427[0]
  i4426.m_ChildForceExpandWidth = !!i4427[1]
  i4426.m_ChildForceExpandHeight = !!i4427[2]
  i4426.m_ChildControlWidth = !!i4427[3]
  i4426.m_ChildControlHeight = !!i4427[4]
  i4426.m_ChildScaleWidth = !!i4427[5]
  i4426.m_ChildScaleHeight = !!i4427[6]
  i4426.m_ReverseArrangement = !!i4427[7]
  i4426.m_Padding = UnityEngine.RectOffset.FromPaddings(i4427[8], i4427[9], i4427[10], i4427[11])
  i4426.m_ChildAlignment = i4427[12]
  return i4426
}

Deserializers["UnityEngine.EventSystems.EventTrigger"] = function (request, data, root) {
  var i4428 = root || request.c( 'UnityEngine.EventSystems.EventTrigger' )
  var i4429 = data
  var i4431 = i4429[0]
  var i4430 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.EventSystems.EventTrigger+Entry')))
  for(var i = 0; i < i4431.length; i += 1) {
    i4430.add(request.d('UnityEngine.EventSystems.EventTrigger+Entry', i4431[i + 0]));
  }
  i4428.m_Delegates = i4430
  return i4428
}

Deserializers["UnityEngine.EventSystems.EventTrigger+Entry"] = function (request, data, root) {
  var i4434 = root || request.c( 'UnityEngine.EventSystems.EventTrigger+Entry' )
  var i4435 = data
  i4434.eventID = i4435[0]
  i4434.callback = request.d('UnityEngine.EventSystems.EventTrigger+TriggerEvent', i4435[1], i4434.callback)
  return i4434
}

Deserializers["ScreenDeltaInputSystem"] = function (request, data, root) {
  var i4436 = root || request.c( 'ScreenDeltaInputSystem' )
  var i4437 = data
  return i4436
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i4438 = root || request.c( 'PlayableJoystick' )
  var i4439 = data
  i4438.handleRange = i4439[0]
  i4438.deadZone = i4439[1]
  i4438.floating = !!i4439[2]
  request.r(i4439[3], i4439[4], 0, i4438, 'area')
  request.r(i4439[5], i4439[6], 0, i4438, 'background')
  request.r(i4439[7], i4439[8], 0, i4438, 'knob')
  return i4438
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i4440 = root || request.c( 'UnityEngine.UI.Button' )
  var i4441 = data
  i4440.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i4441[0], i4440.m_OnClick)
  i4440.m_Navigation = request.d('UnityEngine.UI.Navigation', i4441[1], i4440.m_Navigation)
  i4440.m_Transition = i4441[2]
  i4440.m_Colors = request.d('UnityEngine.UI.ColorBlock', i4441[3], i4440.m_Colors)
  i4440.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i4441[4], i4440.m_SpriteState)
  i4440.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i4441[5], i4440.m_AnimationTriggers)
  i4440.m_Interactable = !!i4441[6]
  request.r(i4441[7], i4441[8], 0, i4440, 'm_TargetGraphic')
  return i4440
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i4442 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i4443 = data
  i4442.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4443[0], i4442.m_PersistentCalls)
  return i4442
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i4444 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i4445 = data
  var i4447 = i4445[0]
  var i4446 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i4447.length; i += 1) {
    i4446.add(request.d('UnityEngine.Events.PersistentCall', i4447[i + 0]));
  }
  i4444.m_Calls = i4446
  return i4444
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i4450 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i4451 = data
  request.r(i4451[0], i4451[1], 0, i4450, 'm_Target')
  i4450.m_TargetAssemblyTypeName = i4451[2]
  i4450.m_MethodName = i4451[3]
  i4450.m_Mode = i4451[4]
  i4450.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i4451[5], i4450.m_Arguments)
  i4450.m_CallState = i4451[6]
  return i4450
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i4452 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i4453 = data
  i4452.m_Mode = i4453[0]
  i4452.m_WrapAround = !!i4453[1]
  request.r(i4453[2], i4453[3], 0, i4452, 'm_SelectOnUp')
  request.r(i4453[4], i4453[5], 0, i4452, 'm_SelectOnDown')
  request.r(i4453[6], i4453[7], 0, i4452, 'm_SelectOnLeft')
  request.r(i4453[8], i4453[9], 0, i4452, 'm_SelectOnRight')
  return i4452
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i4454 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i4455 = data
  i4454.m_NormalColor = new pc.Color(i4455[0], i4455[1], i4455[2], i4455[3])
  i4454.m_HighlightedColor = new pc.Color(i4455[4], i4455[5], i4455[6], i4455[7])
  i4454.m_PressedColor = new pc.Color(i4455[8], i4455[9], i4455[10], i4455[11])
  i4454.m_SelectedColor = new pc.Color(i4455[12], i4455[13], i4455[14], i4455[15])
  i4454.m_DisabledColor = new pc.Color(i4455[16], i4455[17], i4455[18], i4455[19])
  i4454.m_ColorMultiplier = i4455[20]
  i4454.m_FadeDuration = i4455[21]
  return i4454
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i4456 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i4457 = data
  request.r(i4457[0], i4457[1], 0, i4456, 'm_HighlightedSprite')
  request.r(i4457[2], i4457[3], 0, i4456, 'm_PressedSprite')
  request.r(i4457[4], i4457[5], 0, i4456, 'm_SelectedSprite')
  request.r(i4457[6], i4457[7], 0, i4456, 'm_DisabledSprite')
  return i4456
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i4458 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i4459 = data
  i4458.m_NormalTrigger = i4459[0]
  i4458.m_HighlightedTrigger = i4459[1]
  i4458.m_PressedTrigger = i4459[2]
  i4458.m_SelectedTrigger = i4459[3]
  i4458.m_DisabledTrigger = i4459[4]
  return i4458
}

Deserializers["JumpButton"] = function (request, data, root) {
  var i4460 = root || request.c( 'JumpButton' )
  var i4461 = data
  request.r(i4461[0], i4461[1], 0, i4460, 'motor')
  return i4460
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i4462 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i4463 = data
  i4462.m_hasFontAssetChanged = !!i4463[0]
  request.r(i4463[1], i4463[2], 0, i4462, 'm_baseMaterial')
  i4462.m_maskOffset = new pc.Vec4( i4463[3], i4463[4], i4463[5], i4463[6] )
  i4462.m_text = i4463[7]
  i4462.m_isRightToLeft = !!i4463[8]
  request.r(i4463[9], i4463[10], 0, i4462, 'm_fontAsset')
  request.r(i4463[11], i4463[12], 0, i4462, 'm_sharedMaterial')
  var i4465 = i4463[13]
  var i4464 = []
  for(var i = 0; i < i4465.length; i += 2) {
  request.r(i4465[i + 0], i4465[i + 1], 2, i4464, '')
  }
  i4462.m_fontSharedMaterials = i4464
  request.r(i4463[14], i4463[15], 0, i4462, 'm_fontMaterial')
  var i4467 = i4463[16]
  var i4466 = []
  for(var i = 0; i < i4467.length; i += 2) {
  request.r(i4467[i + 0], i4467[i + 1], 2, i4466, '')
  }
  i4462.m_fontMaterials = i4466
  i4462.m_fontColor32 = UnityEngine.Color32.ConstructColor(i4463[17], i4463[18], i4463[19], i4463[20])
  i4462.m_fontColor = new pc.Color(i4463[21], i4463[22], i4463[23], i4463[24])
  i4462.m_enableVertexGradient = !!i4463[25]
  i4462.m_colorMode = i4463[26]
  i4462.m_fontColorGradient = request.d('TMPro.VertexGradient', i4463[27], i4462.m_fontColorGradient)
  request.r(i4463[28], i4463[29], 0, i4462, 'm_fontColorGradientPreset')
  request.r(i4463[30], i4463[31], 0, i4462, 'm_spriteAsset')
  i4462.m_tintAllSprites = !!i4463[32]
  request.r(i4463[33], i4463[34], 0, i4462, 'm_StyleSheet')
  i4462.m_TextStyleHashCode = i4463[35]
  i4462.m_overrideHtmlColors = !!i4463[36]
  i4462.m_faceColor = UnityEngine.Color32.ConstructColor(i4463[37], i4463[38], i4463[39], i4463[40])
  i4462.m_fontSize = i4463[41]
  i4462.m_fontSizeBase = i4463[42]
  i4462.m_fontWeight = i4463[43]
  i4462.m_enableAutoSizing = !!i4463[44]
  i4462.m_fontSizeMin = i4463[45]
  i4462.m_fontSizeMax = i4463[46]
  i4462.m_fontStyle = i4463[47]
  i4462.m_HorizontalAlignment = i4463[48]
  i4462.m_VerticalAlignment = i4463[49]
  i4462.m_textAlignment = i4463[50]
  i4462.m_characterSpacing = i4463[51]
  i4462.m_characterHorizontalScale = i4463[52]
  i4462.m_wordSpacing = i4463[53]
  i4462.m_lineSpacing = i4463[54]
  i4462.m_lineSpacingMax = i4463[55]
  i4462.m_paragraphSpacing = i4463[56]
  i4462.m_charWidthMaxAdj = i4463[57]
  i4462.m_TextWrappingMode = i4463[58]
  i4462.m_wordWrappingRatios = i4463[59]
  i4462.m_overflowMode = i4463[60]
  request.r(i4463[61], i4463[62], 0, i4462, 'm_linkedTextComponent')
  request.r(i4463[63], i4463[64], 0, i4462, 'parentLinkedComponent')
  i4462.m_enableKerning = !!i4463[65]
  var i4469 = i4463[66]
  var i4468 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4469.length; i += 1) {
    i4468.add(i4469[i + 0]);
  }
  i4462.m_ActiveFontFeatures = i4468
  i4462.m_enableExtraPadding = !!i4463[67]
  i4462.checkPaddingRequired = !!i4463[68]
  i4462.m_isRichText = !!i4463[69]
  i4462.m_parseCtrlCharacters = !!i4463[70]
  i4462.m_isOrthographic = !!i4463[71]
  i4462.m_isCullingEnabled = !!i4463[72]
  i4462.m_horizontalMapping = i4463[73]
  i4462.m_verticalMapping = i4463[74]
  i4462.m_uvLineOffset = i4463[75]
  i4462.m_geometrySortingOrder = i4463[76]
  i4462.m_IsTextObjectScaleStatic = !!i4463[77]
  i4462.m_VertexBufferAutoSizeReduction = !!i4463[78]
  i4462.m_useMaxVisibleDescender = !!i4463[79]
  i4462.m_pageToDisplay = i4463[80]
  i4462.m_margin = new pc.Vec4( i4463[81], i4463[82], i4463[83], i4463[84] )
  i4462.m_isUsingLegacyAnimationComponent = !!i4463[85]
  i4462.m_isVolumetricText = !!i4463[86]
  request.r(i4463[87], i4463[88], 0, i4462, 'm_Material')
  i4462.m_EmojiFallbackSupport = !!i4463[89]
  i4462.m_Maskable = !!i4463[90]
  i4462.m_Color = new pc.Color(i4463[91], i4463[92], i4463[93], i4463[94])
  i4462.m_RaycastTarget = !!i4463[95]
  i4462.m_RaycastPadding = new pc.Vec4( i4463[96], i4463[97], i4463[98], i4463[99] )
  return i4462
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i4470 = root || request.c( 'TMPro.VertexGradient' )
  var i4471 = data
  i4470.topLeft = new pc.Color(i4471[0], i4471[1], i4471[2], i4471[3])
  i4470.topRight = new pc.Color(i4471[4], i4471[5], i4471[6], i4471[7])
  i4470.bottomLeft = new pc.Color(i4471[8], i4471[9], i4471[10], i4471[11])
  i4470.bottomRight = new pc.Color(i4471[12], i4471[13], i4471[14], i4471[15])
  return i4470
}

Deserializers["StealPrompt"] = function (request, data, root) {
  var i4474 = root || request.c( 'StealPrompt' )
  var i4475 = data
  request.r(i4475[0], i4475[1], 0, i4474, 'rect')
  request.r(i4475[2], i4475[3], 0, i4474, 'canvasRect')
  request.r(i4475[4], i4475[5], 0, i4474, 'worldCamera')
  request.r(i4475[6], i4475[7], 0, i4474, 'fill')
  i4474.worldOffset = new pc.Vec3( i4475[8], i4475[9], i4475[10] )
  return i4474
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i4476 = root || request.c( 'UnityEngine.UI.Mask' )
  var i4477 = data
  i4476.m_ShowMaskGraphic = !!i4477[0]
  return i4476
}

Deserializers["PulseScale"] = function (request, data, root) {
  var i4478 = root || request.c( 'PulseScale' )
  var i4479 = data
  i4478.minScale = i4479[0]
  i4478.maxScale = i4479[1]
  i4478.period = i4479[2]
  return i4478
}

Deserializers["FirstClickCta"] = function (request, data, root) {
  var i4480 = root || request.c( 'FirstClickCta' )
  var i4481 = data
  request.r(i4481[0], i4481[1], 0, i4480, 'luna')
  return i4480
}

Deserializers["BillboardGroup"] = function (request, data, root) {
  var i4482 = root || request.c( 'BillboardGroup' )
  var i4483 = data
  request.r(i4483[0], i4483[1], 0, i4482, 'cameraTransform')
  var i4485 = i4483[2]
  var i4484 = []
  for(var i = 0; i < i4485.length; i += 2) {
  request.r(i4485[i + 0], i4485[i + 1], 2, i4484, '')
  }
  i4482.items = i4484
  return i4482
}

Deserializers["GameController"] = function (request, data, root) {
  var i4486 = root || request.c( 'GameController' )
  var i4487 = data
  request.r(i4487[0], i4487[1], 0, i4486, 'luna')
  request.r(i4487[2], i4487[3], 0, i4486, 'player')
  request.r(i4487[4], i4487[5], 0, i4486, 'motor')
  request.r(i4487[6], i4487[7], 0, i4486, 'nest')
  request.r(i4487[8], i4487[9], 0, i4486, 'spooky')
  request.r(i4487[10], i4487[11], 0, i4486, 'guide')
  request.r(i4487[12], i4487[13], 0, i4486, 'stealPrompt')
  request.r(i4487[14], i4487[15], 0, i4486, 'tutorial')
  request.r(i4487[16], i4487[17], 0, i4486, 'cameraRig')
  i4486.caughtShakeStrength = i4487[18]
  i4486.caughtShakeTime = i4487[19]
  request.r(i4487[20], i4487[21], 0, i4486, 'homeArea')
  i4486.homeSize = new pc.Vec2( i4487[22], i4487[23] )
  request.r(i4487[24], i4487[25], 0, i4486, 'homeTarget')
  request.r(i4487[26], i4487[27], 0, i4486, 'homeEggs')
  request.r(i4487[28], i4487[29], 0, i4486, 'homeNest')
  request.r(i4487[30], i4487[31], 0, i4486, 'homeEgg')
  var i4489 = i4487[32]
  var i4488 = []
  for(var i = 0; i < i4489.length; i += 2) {
  request.r(i4489[i + 0], i4489[i + 1], 2, i4488, '')
  }
  i4486.playerEggItems = i4488
  i4486.standDistance = i4487[33]
  i4486.walkSpeed = i4487[34]
  i4486.walkTimeout = i4487[35]
  i4486.turnTime = i4487[36]
  i4486.placeTime = i4487[37]
  i4486.placeArcHeight = i4487[38]
  i4486.endUIDelay = i4487[39]
  request.r(i4487[40], i4487[41], 0, i4486, 'winConfetti')
  i4486.deliverCameraPitch = i4487[42]
  i4486.deliverCameraSide = i4487[43]
  i4486.deliverCameraTurn = i4487[44]
  i4486.stealRadius = i4487[45]
  i4486.stealHoldTime = i4487[46]
  var i4491 = i4487[47]
  var i4490 = []
  for(var i = 0; i < i4491.length; i += 2) {
  request.r(i4491[i + 0], i4491[i + 1], 2, i4490, '')
  }
  i4486.playerModels = i4490
  var i4493 = i4487[48]
  var i4492 = []
  for(var i = 0; i < i4493.length; i += 2) {
  request.r(i4493[i + 0], i4493[i + 1], 2, i4492, '')
  }
  i4486.playerAnimators = i4492
  var i4495 = i4487[49]
  var i4494 = []
  for(var i = 0; i < i4495.length; i += 2) {
  request.r(i4495[i + 0], i4495[i + 1], 2, i4494, '')
  }
  i4486.playerEggs = i4494
  i4486.playerRunAnimAt8 = i4487[50]
  i4486.playerLyingTime = i4487[51]
  i4486.playerStandUpTime = i4487[52]
  var i4497 = i4487[53]
  var i4496 = []
  for(var i = 0; i < i4497.length; i += 2) {
  request.r(i4497[i + 0], i4497[i + 1], 2, i4496, '')
  }
  i4486.spookyModels = i4496
  var i4499 = i4487[54]
  var i4498 = []
  for(var i = 0; i < i4499.length; i += 2) {
  request.r(i4499[i + 0], i4499[i + 1], 2, i4498, '')
  }
  i4486.spookyAnimators = i4498
  request.r(i4487[55], i4487[56], 0, i4486, 'title')
  request.r(i4487[57], i4487[58], 0, i4486, 'runBanner')
  request.r(i4487[59], i4487[60], 0, i4486, 'caughtFlash')
  i4486.caughtFlashAlpha = i4487[61]
  request.r(i4487[62], i4487[63], 0, i4486, 'sfx')
  request.r(i4487[64], i4487[65], 0, i4486, 'stealClip')
  request.r(i4487[66], i4487[67], 0, i4486, 'winClip')
  request.r(i4487[68], i4487[69], 0, i4486, 'winWowClip')
  request.r(i4487[70], i4487[71], 0, i4486, 'caughtClip')
  request.r(i4487[72], i4487[73], 0, i4486, 'chaseMusic')
  return i4486
}

Deserializers["StealEggTutorial"] = function (request, data, root) {
  var i4504 = root || request.c( 'StealEggTutorial' )
  var i4505 = data
  request.r(i4505[0], i4505[1], 0, i4504, 'motor')
  request.r(i4505[2], i4505[3], 0, i4504, 'cameraRig')
  request.r(i4505[4], i4505[5], 0, i4504, 'luna')
  request.r(i4505[6], i4505[7], 0, i4504, 'cameraHint')
  request.r(i4505[8], i4505[9], 0, i4504, 'cameraHand')
  i4504.swipeDistance = i4505[10]
  i4504.swipeTime = i4505[11]
  request.r(i4505[12], i4505[13], 0, i4504, 'cameraText')
  i4504.turnNeeded = i4505[14]
  request.r(i4505[15], i4505[16], 0, i4504, 'moveHint')
  request.r(i4505[17], i4505[18], 0, i4504, 'moveHand')
  i4504.moveRadius = i4505[19]
  request.r(i4505[20], i4505[21], 0, i4504, 'moveText')
  i4504.moveNeeded = i4505[22]
  request.r(i4505[23], i4505[24], 0, i4504, 'jumpText')
  request.r(i4505[25], i4505[26], 0, i4504, 'jumpHand')
  request.r(i4505[27], i4505[28], 0, i4504, 'jumpHandTarget')
  request.r(i4505[29], i4505[30], 0, i4504, 'title')
  request.r(i4505[31], i4505[32], 0, i4504, 'runBanner')
  request.r(i4505[33], i4505[34], 0, i4504, 'stealHand')
  request.r(i4505[35], i4505[36], 0, i4504, 'stealButton')
  request.r(i4505[37], i4505[38], 0, i4504, 'stealHandTarget')
  return i4504
}

Deserializers["NavGrid"] = function (request, data, root) {
  var i4506 = root || request.c( 'NavGrid' )
  var i4507 = data
  request.r(i4507[0], i4507[1], 0, i4506, 'data')
  i4506.maxExpanded = i4507[2]
  return i4506
}

Deserializers["LunaController"] = function (request, data, root) {
  var i4508 = root || request.c( 'LunaController' )
  var i4509 = data
  i4508.LimitTimePlay = !!i4509[0]
  i4508.TimePlay = i4509[1]
  request.r(i4509[2], i4509[3], 0, i4508, 'BGM')
  i4508.TypePlayer = i4509[4]
  i4508.TypeSpooky = i4509[5]
  i4508.PlayerSpeed = i4509[6]
  i4508.SpookySpeed = i4509[7]
  i4508.PlayerResetCount = i4509[8]
  i4508.CtaMode = i4509[9]
  request.r(i4509[10], i4509[11], 0, i4508, 'musicSource')
  i4508.musicVolume = i4509[12]
  var i4511 = i4509[13]
  var i4510 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i4511.length; i += 2) {
  request.r(i4511[i + 0], i4511[i + 1], 1, i4510, '')
  }
  i4508.CTA = i4510
  request.r(i4509[14], i4509[15], 0, i4508, 'endUI')
  request.r(i4509[16], i4509[17], 0, i4508, 'endCard')
  request.r(i4509[18], i4509[19], 0, i4508, 'firstClickZone')
  return i4508
}

Deserializers["SkyDome"] = function (request, data, root) {
  var i4514 = root || request.c( 'SkyDome' )
  var i4515 = data
  request.r(i4515[0], i4515[1], 0, i4514, 'cameraTransform')
  return i4514
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i4516 = root || request.c( 'TMPro.TextMeshPro' )
  var i4517 = data
  i4516._SortingLayer = i4517[0]
  i4516._SortingLayerID = i4517[1]
  i4516._SortingOrder = i4517[2]
  i4516.m_hasFontAssetChanged = !!i4517[3]
  request.r(i4517[4], i4517[5], 0, i4516, 'm_renderer')
  i4516.m_maskType = i4517[6]
  i4516.m_text = i4517[7]
  i4516.m_isRightToLeft = !!i4517[8]
  request.r(i4517[9], i4517[10], 0, i4516, 'm_fontAsset')
  request.r(i4517[11], i4517[12], 0, i4516, 'm_sharedMaterial')
  var i4519 = i4517[13]
  var i4518 = []
  for(var i = 0; i < i4519.length; i += 2) {
  request.r(i4519[i + 0], i4519[i + 1], 2, i4518, '')
  }
  i4516.m_fontSharedMaterials = i4518
  request.r(i4517[14], i4517[15], 0, i4516, 'm_fontMaterial')
  var i4521 = i4517[16]
  var i4520 = []
  for(var i = 0; i < i4521.length; i += 2) {
  request.r(i4521[i + 0], i4521[i + 1], 2, i4520, '')
  }
  i4516.m_fontMaterials = i4520
  i4516.m_fontColor32 = UnityEngine.Color32.ConstructColor(i4517[17], i4517[18], i4517[19], i4517[20])
  i4516.m_fontColor = new pc.Color(i4517[21], i4517[22], i4517[23], i4517[24])
  i4516.m_enableVertexGradient = !!i4517[25]
  i4516.m_colorMode = i4517[26]
  i4516.m_fontColorGradient = request.d('TMPro.VertexGradient', i4517[27], i4516.m_fontColorGradient)
  request.r(i4517[28], i4517[29], 0, i4516, 'm_fontColorGradientPreset')
  request.r(i4517[30], i4517[31], 0, i4516, 'm_spriteAsset')
  i4516.m_tintAllSprites = !!i4517[32]
  request.r(i4517[33], i4517[34], 0, i4516, 'm_StyleSheet')
  i4516.m_TextStyleHashCode = i4517[35]
  i4516.m_overrideHtmlColors = !!i4517[36]
  i4516.m_faceColor = UnityEngine.Color32.ConstructColor(i4517[37], i4517[38], i4517[39], i4517[40])
  i4516.m_fontSize = i4517[41]
  i4516.m_fontSizeBase = i4517[42]
  i4516.m_fontWeight = i4517[43]
  i4516.m_enableAutoSizing = !!i4517[44]
  i4516.m_fontSizeMin = i4517[45]
  i4516.m_fontSizeMax = i4517[46]
  i4516.m_fontStyle = i4517[47]
  i4516.m_HorizontalAlignment = i4517[48]
  i4516.m_VerticalAlignment = i4517[49]
  i4516.m_textAlignment = i4517[50]
  i4516.m_characterSpacing = i4517[51]
  i4516.m_characterHorizontalScale = i4517[52]
  i4516.m_wordSpacing = i4517[53]
  i4516.m_lineSpacing = i4517[54]
  i4516.m_lineSpacingMax = i4517[55]
  i4516.m_paragraphSpacing = i4517[56]
  i4516.m_charWidthMaxAdj = i4517[57]
  i4516.m_TextWrappingMode = i4517[58]
  i4516.m_wordWrappingRatios = i4517[59]
  i4516.m_overflowMode = i4517[60]
  request.r(i4517[61], i4517[62], 0, i4516, 'm_linkedTextComponent')
  request.r(i4517[63], i4517[64], 0, i4516, 'parentLinkedComponent')
  i4516.m_enableKerning = !!i4517[65]
  var i4523 = i4517[66]
  var i4522 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4523.length; i += 1) {
    i4522.add(i4523[i + 0]);
  }
  i4516.m_ActiveFontFeatures = i4522
  i4516.m_enableExtraPadding = !!i4517[67]
  i4516.checkPaddingRequired = !!i4517[68]
  i4516.m_isRichText = !!i4517[69]
  i4516.m_parseCtrlCharacters = !!i4517[70]
  i4516.m_isOrthographic = !!i4517[71]
  i4516.m_isCullingEnabled = !!i4517[72]
  i4516.m_horizontalMapping = i4517[73]
  i4516.m_verticalMapping = i4517[74]
  i4516.m_uvLineOffset = i4517[75]
  i4516.m_geometrySortingOrder = i4517[76]
  i4516.m_IsTextObjectScaleStatic = !!i4517[77]
  i4516.m_VertexBufferAutoSizeReduction = !!i4517[78]
  i4516.m_useMaxVisibleDescender = !!i4517[79]
  i4516.m_pageToDisplay = i4517[80]
  i4516.m_margin = new pc.Vec4( i4517[81], i4517[82], i4517[83], i4517[84] )
  i4516.m_isUsingLegacyAnimationComponent = !!i4517[85]
  i4516.m_isVolumetricText = !!i4517[86]
  request.r(i4517[87], i4517[88], 0, i4516, 'm_Material')
  i4516.m_EmojiFallbackSupport = !!i4517[89]
  i4516.m_Maskable = !!i4517[90]
  i4516.m_Color = new pc.Color(i4517[91], i4517[92], i4517[93], i4517[94])
  i4516.m_RaycastTarget = !!i4517[95]
  i4516.m_RaycastPadding = new pc.Vec4( i4517[96], i4517[97], i4517[98], i4517[99] )
  return i4516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i4524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i4525 = data
  i4524.ambientIntensity = i4525[0]
  i4524.reflectionIntensity = i4525[1]
  i4524.ambientMode = i4525[2]
  i4524.ambientLight = new pc.Color(i4525[3], i4525[4], i4525[5], i4525[6])
  i4524.ambientSkyColor = new pc.Color(i4525[7], i4525[8], i4525[9], i4525[10])
  i4524.ambientGroundColor = new pc.Color(i4525[11], i4525[12], i4525[13], i4525[14])
  i4524.ambientEquatorColor = new pc.Color(i4525[15], i4525[16], i4525[17], i4525[18])
  i4524.fogColor = new pc.Color(i4525[19], i4525[20], i4525[21], i4525[22])
  i4524.fogEndDistance = i4525[23]
  i4524.fogStartDistance = i4525[24]
  i4524.fogDensity = i4525[25]
  i4524.fog = !!i4525[26]
  request.r(i4525[27], i4525[28], 0, i4524, 'skybox')
  i4524.fogMode = i4525[29]
  var i4527 = i4525[30]
  var i4526 = []
  for(var i = 0; i < i4527.length; i += 1) {
    i4526.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i4527[i + 0]) );
  }
  i4524.lightmaps = i4526
  i4524.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i4525[31], i4524.lightProbes)
  i4524.lightmapsMode = i4525[32]
  i4524.mixedBakeMode = i4525[33]
  i4524.environmentLightingMode = i4525[34]
  i4524.ambientProbe = new pc.SphericalHarmonicsL2(i4525[35])
  request.r(i4525[36], i4525[37], 0, i4524, 'customReflection')
  request.r(i4525[38], i4525[39], 0, i4524, 'defaultReflection')
  i4524.defaultReflectionMode = i4525[40]
  i4524.defaultReflectionResolution = i4525[41]
  i4524.sunLightObjectId = i4525[42]
  i4524.pixelLightCount = i4525[43]
  i4524.defaultReflectionHDR = !!i4525[44]
  i4524.hasLightDataAsset = !!i4525[45]
  i4524.hasManualGenerate = !!i4525[46]
  return i4524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i4530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i4531 = data
  request.r(i4531[0], i4531[1], 0, i4530, 'lightmapColor')
  request.r(i4531[2], i4531[3], 0, i4530, 'lightmapDirection')
  request.r(i4531[4], i4531[5], 0, i4530, 'shadowMask')
  return i4530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i4532 = root || new UnityEngine.LightProbes()
  var i4533 = data
  return i4532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i4538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i4539 = data
  var i4541 = i4539[0]
  var i4540 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i4541.length; i += 1) {
    i4540.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i4541[i + 0]));
  }
  i4538.ShaderCompilationErrors = i4540
  i4538.name = i4539[1]
  i4538.guid = i4539[2]
  var i4543 = i4539[3]
  var i4542 = []
  for(var i = 0; i < i4543.length; i += 1) {
    i4542.push( i4543[i + 0] );
  }
  i4538.shaderDefinedKeywords = i4542
  var i4545 = i4539[4]
  var i4544 = []
  for(var i = 0; i < i4545.length; i += 1) {
    i4544.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i4545[i + 0]) );
  }
  i4538.passes = i4544
  var i4547 = i4539[5]
  var i4546 = []
  for(var i = 0; i < i4547.length; i += 1) {
    i4546.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i4547[i + 0]) );
  }
  i4538.usePasses = i4546
  var i4549 = i4539[6]
  var i4548 = []
  for(var i = 0; i < i4549.length; i += 1) {
    i4548.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i4549[i + 0]) );
  }
  i4538.defaultParameterValues = i4548
  request.r(i4539[7], i4539[8], 0, i4538, 'unityFallbackShader')
  i4538.readDepth = !!i4539[9]
  i4538.hasDepthOnlyPass = !!i4539[10]
  i4538.isCreatedByShaderGraph = !!i4539[11]
  i4538.disableBatching = !!i4539[12]
  i4538.compiled = !!i4539[13]
  return i4538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i4552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i4553 = data
  i4552.shaderName = i4553[0]
  i4552.errorMessage = i4553[1]
  return i4552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i4558 = root || new pc.UnityShaderPass()
  var i4559 = data
  i4558.id = i4559[0]
  i4558.subShaderIndex = i4559[1]
  i4558.name = i4559[2]
  i4558.passType = i4559[3]
  i4558.grabPassTextureName = i4559[4]
  i4558.usePass = !!i4559[5]
  i4558.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[6], i4558.zTest)
  i4558.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[7], i4558.zWrite)
  i4558.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[8], i4558.culling)
  i4558.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4559[9], i4558.blending)
  i4558.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4559[10], i4558.alphaBlending)
  i4558.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[11], i4558.colorWriteMask)
  i4558.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[12], i4558.offsetUnits)
  i4558.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[13], i4558.offsetFactor)
  i4558.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[14], i4558.stencilRef)
  i4558.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[15], i4558.stencilReadMask)
  i4558.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4559[16], i4558.stencilWriteMask)
  i4558.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4559[17], i4558.stencilOp)
  i4558.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4559[18], i4558.stencilOpFront)
  i4558.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4559[19], i4558.stencilOpBack)
  var i4561 = i4559[20]
  var i4560 = []
  for(var i = 0; i < i4561.length; i += 1) {
    i4560.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i4561[i + 0]) );
  }
  i4558.tags = i4560
  var i4563 = i4559[21]
  var i4562 = []
  for(var i = 0; i < i4563.length; i += 1) {
    i4562.push( i4563[i + 0] );
  }
  i4558.passDefinedKeywords = i4562
  var i4565 = i4559[22]
  var i4564 = []
  for(var i = 0; i < i4565.length; i += 1) {
    i4564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i4565[i + 0]) );
  }
  i4558.passDefinedKeywordGroups = i4564
  var i4567 = i4559[23]
  var i4566 = []
  for(var i = 0; i < i4567.length; i += 1) {
    i4566.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4567[i + 0]) );
  }
  i4558.variants = i4566
  var i4569 = i4559[24]
  var i4568 = []
  for(var i = 0; i < i4569.length; i += 1) {
    i4568.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4569[i + 0]) );
  }
  i4558.excludedVariants = i4568
  i4558.hasDepthReader = !!i4559[25]
  return i4558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i4570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i4571 = data
  i4570.val = i4571[0]
  i4570.name = i4571[1]
  return i4570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i4572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i4573 = data
  i4572.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4573[0], i4572.src)
  i4572.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4573[1], i4572.dst)
  i4572.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4573[2], i4572.op)
  return i4572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i4574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i4575 = data
  i4574.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4575[0], i4574.pass)
  i4574.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4575[1], i4574.fail)
  i4574.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4575[2], i4574.zFail)
  i4574.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4575[3], i4574.comp)
  return i4574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i4578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i4579 = data
  i4578.name = i4579[0]
  i4578.value = i4579[1]
  return i4578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i4582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i4583 = data
  var i4585 = i4583[0]
  var i4584 = []
  for(var i = 0; i < i4585.length; i += 1) {
    i4584.push( i4585[i + 0] );
  }
  i4582.keywords = i4584
  i4582.hasDiscard = !!i4583[1]
  return i4582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i4588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i4589 = data
  i4588.passId = i4589[0]
  i4588.subShaderIndex = i4589[1]
  var i4591 = i4589[2]
  var i4590 = []
  for(var i = 0; i < i4591.length; i += 1) {
    i4590.push( i4591[i + 0] );
  }
  i4588.keywords = i4590
  i4588.vertexProgram = i4589[3]
  i4588.fragmentProgram = i4589[4]
  i4588.exportedForWebGl2 = !!i4589[5]
  i4588.readDepth = !!i4589[6]
  return i4588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i4594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i4595 = data
  request.r(i4595[0], i4595[1], 0, i4594, 'shader')
  i4594.pass = i4595[2]
  return i4594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i4598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i4599 = data
  i4598.name = i4599[0]
  i4598.type = i4599[1]
  i4598.value = new pc.Vec4( i4599[2], i4599[3], i4599[4], i4599[5] )
  i4598.textureValue = i4599[6]
  i4598.shaderPropertyFlag = i4599[7]
  return i4598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i4600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i4601 = data
  i4600.name = i4601[0]
  request.r(i4601[1], i4601[2], 0, i4600, 'texture')
  i4600.aabb = i4601[3]
  i4600.vertices = i4601[4]
  i4600.triangles = i4601[5]
  i4600.textureRect = UnityEngine.Rect.MinMaxRect(i4601[6], i4601[7], i4601[8], i4601[9])
  i4600.packedRect = UnityEngine.Rect.MinMaxRect(i4601[10], i4601[11], i4601[12], i4601[13])
  i4600.border = new pc.Vec4( i4601[14], i4601[15], i4601[16], i4601[17] )
  i4600.transparency = i4601[18]
  i4600.bounds = i4601[19]
  i4600.pixelsPerUnit = i4601[20]
  i4600.textureWidth = i4601[21]
  i4600.textureHeight = i4601[22]
  i4600.nativeSize = new pc.Vec2( i4601[23], i4601[24] )
  i4600.pivot = new pc.Vec2( i4601[25], i4601[26] )
  i4600.textureRectOffset = new pc.Vec2( i4601[27], i4601[28] )
  return i4600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i4602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i4603 = data
  i4602.name = i4603[0]
  return i4602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i4604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i4605 = data
  i4604.name = i4605[0]
  i4604.wrapMode = i4605[1]
  i4604.isLooping = !!i4605[2]
  i4604.length = i4605[3]
  var i4607 = i4605[4]
  var i4606 = []
  for(var i = 0; i < i4607.length; i += 1) {
    i4606.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i4607[i + 0]) );
  }
  i4604.curves = i4606
  var i4609 = i4605[5]
  var i4608 = []
  for(var i = 0; i < i4609.length; i += 1) {
    i4608.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i4609[i + 0]) );
  }
  i4604.events = i4608
  i4604.halfPrecision = !!i4605[6]
  i4604._frameRate = i4605[7]
  i4604.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i4605[8], i4604.localBounds)
  i4604.hasMuscleCurves = !!i4605[9]
  var i4611 = i4605[10]
  var i4610 = []
  for(var i = 0; i < i4611.length; i += 1) {
    i4610.push( i4611[i + 0] );
  }
  i4604.clipMuscleConstant = i4610
  i4604.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i4605[11], i4604.clipBindingConstant)
  return i4604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i4614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i4615 = data
  i4614.path = i4615[0]
  i4614.hash = i4615[1]
  i4614.componentType = i4615[2]
  i4614.property = i4615[3]
  i4614.keys = i4615[4]
  var i4617 = i4615[5]
  var i4616 = []
  for(var i = 0; i < i4617.length; i += 1) {
    i4616.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i4617[i + 0]) );
  }
  i4614.objectReferenceKeys = i4616
  return i4614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i4620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i4621 = data
  i4620.time = i4621[0]
  request.r(i4621[1], i4621[2], 0, i4620, 'value')
  return i4620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i4624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i4625 = data
  i4624.functionName = i4625[0]
  i4624.floatParameter = i4625[1]
  i4624.intParameter = i4625[2]
  i4624.stringParameter = i4625[3]
  request.r(i4625[4], i4625[5], 0, i4624, 'objectReferenceParameter')
  i4624.time = i4625[6]
  return i4624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i4626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i4627 = data
  i4626.center = new pc.Vec3( i4627[0], i4627[1], i4627[2] )
  i4626.extends = new pc.Vec3( i4627[3], i4627[4], i4627[5] )
  return i4626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i4630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i4631 = data
  var i4633 = i4631[0]
  var i4632 = []
  for(var i = 0; i < i4633.length; i += 1) {
    i4632.push( i4633[i + 0] );
  }
  i4630.genericBindings = i4632
  var i4635 = i4631[1]
  var i4634 = []
  for(var i = 0; i < i4635.length; i += 1) {
    i4634.push( i4635[i + 0] );
  }
  i4630.pptrCurveMapping = i4634
  return i4630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i4636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i4637 = data
  i4636.name = i4637[0]
  var i4639 = i4637[1]
  var i4638 = []
  for(var i = 0; i < i4639.length; i += 1) {
    i4638.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i4639[i + 0]) );
  }
  i4636.layers = i4638
  var i4641 = i4637[2]
  var i4640 = []
  for(var i = 0; i < i4641.length; i += 1) {
    i4640.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i4641[i + 0]) );
  }
  i4636.parameters = i4640
  i4636.animationClips = i4637[3]
  i4636.avatarUnsupported = i4637[4]
  return i4636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i4644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i4645 = data
  i4644.name = i4645[0]
  i4644.defaultWeight = i4645[1]
  i4644.blendingMode = i4645[2]
  i4644.avatarMask = i4645[3]
  i4644.syncedLayerIndex = i4645[4]
  i4644.syncedLayerAffectsTiming = !!i4645[5]
  i4644.syncedLayers = i4645[6]
  i4644.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i4645[7], i4644.stateMachine)
  return i4644
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i4646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i4647 = data
  i4646.id = i4647[0]
  i4646.name = i4647[1]
  i4646.path = i4647[2]
  var i4649 = i4647[3]
  var i4648 = []
  for(var i = 0; i < i4649.length; i += 1) {
    i4648.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i4649[i + 0]) );
  }
  i4646.states = i4648
  var i4651 = i4647[4]
  var i4650 = []
  for(var i = 0; i < i4651.length; i += 1) {
    i4650.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i4651[i + 0]) );
  }
  i4646.machines = i4650
  var i4653 = i4647[5]
  var i4652 = []
  for(var i = 0; i < i4653.length; i += 1) {
    i4652.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i4653[i + 0]) );
  }
  i4646.entryStateTransitions = i4652
  var i4655 = i4647[6]
  var i4654 = []
  for(var i = 0; i < i4655.length; i += 1) {
    i4654.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i4655[i + 0]) );
  }
  i4646.exitStateTransitions = i4654
  var i4657 = i4647[7]
  var i4656 = []
  for(var i = 0; i < i4657.length; i += 1) {
    i4656.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i4657[i + 0]) );
  }
  i4646.anyStateTransitions = i4656
  i4646.defaultStateId = i4647[8]
  return i4646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i4660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i4661 = data
  i4660.id = i4661[0]
  i4660.name = i4661[1]
  i4660.cycleOffset = i4661[2]
  i4660.cycleOffsetParameter = i4661[3]
  i4660.cycleOffsetParameterActive = !!i4661[4]
  i4660.mirror = !!i4661[5]
  i4660.mirrorParameter = i4661[6]
  i4660.mirrorParameterActive = !!i4661[7]
  i4660.motionId = i4661[8]
  i4660.nameHash = i4661[9]
  i4660.fullPathHash = i4661[10]
  i4660.speed = i4661[11]
  i4660.speedParameter = i4661[12]
  i4660.speedParameterActive = !!i4661[13]
  i4660.tag = i4661[14]
  i4660.tagHash = i4661[15]
  i4660.writeDefaultValues = !!i4661[16]
  var i4663 = i4661[17]
  var i4662 = []
  for(var i = 0; i < i4663.length; i += 2) {
  request.r(i4663[i + 0], i4663[i + 1], 2, i4662, '')
  }
  i4660.behaviours = i4662
  var i4665 = i4661[18]
  var i4664 = []
  for(var i = 0; i < i4665.length; i += 1) {
    i4664.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i4665[i + 0]) );
  }
  i4660.transitions = i4664
  return i4660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i4670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i4671 = data
  i4670.fullPath = i4671[0]
  i4670.canTransitionToSelf = !!i4671[1]
  i4670.duration = i4671[2]
  i4670.exitTime = i4671[3]
  i4670.hasExitTime = !!i4671[4]
  i4670.hasFixedDuration = !!i4671[5]
  i4670.interruptionSource = i4671[6]
  i4670.offset = i4671[7]
  i4670.orderedInterruption = !!i4671[8]
  i4670.destinationStateId = i4671[9]
  i4670.isExit = !!i4671[10]
  i4670.mute = !!i4671[11]
  i4670.solo = !!i4671[12]
  var i4673 = i4671[13]
  var i4672 = []
  for(var i = 0; i < i4673.length; i += 1) {
    i4672.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i4673[i + 0]) );
  }
  i4670.conditions = i4672
  return i4670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i4678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i4679 = data
  i4678.destinationStateId = i4679[0]
  i4678.isExit = !!i4679[1]
  i4678.mute = !!i4679[2]
  i4678.solo = !!i4679[3]
  var i4681 = i4679[4]
  var i4680 = []
  for(var i = 0; i < i4681.length; i += 1) {
    i4680.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i4681[i + 0]) );
  }
  i4678.conditions = i4680
  return i4678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i4684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i4685 = data
  i4684.defaultBool = !!i4685[0]
  i4684.defaultFloat = i4685[1]
  i4684.defaultInt = i4685[2]
  i4684.name = i4685[3]
  i4684.nameHash = i4685[4]
  i4684.type = i4685[5]
  return i4684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i4688 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i4689 = data
  i4688.mode = i4689[0]
  i4688.parameter = i4689[1]
  i4688.threshold = i4689[2]
  return i4688
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i4690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i4691 = data
  i4690.name = i4691[0]
  i4690.bytes64 = i4691[1]
  i4690.data = i4691[2]
  return i4690
}

Deserializers["NavGridData"] = function (request, data, root) {
  var i4692 = root || request.c( 'NavGridData' )
  var i4693 = data
  i4692.origin = new pc.Vec3( i4693[0], i4693[1], i4693[2] )
  i4692.cellSize = i4693[3]
  i4692.sizeX = i4693[4]
  i4692.sizeZ = i4693[5]
  i4692.minHeight = i4693[6]
  i4692.heightStep = i4693[7]
  var i4695 = i4693[8]
  var i4694 = []
  for(var i = 0; i < i4695.length; i += 1) {
    i4694.push( i4695[i + 0] );
  }
  i4692.walkable = i4694
  var i4697 = i4693[9]
  var i4696 = []
  for(var i = 0; i < i4697.length; i += 1) {
    i4696.push( i4697[i + 0] );
  }
  i4692.heights = i4696
  return i4692
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i4698 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i4699 = data
  i4698.normalStyle = i4699[0]
  i4698.normalSpacingOffset = i4699[1]
  i4698.boldStyle = i4699[2]
  i4698.boldSpacing = i4699[3]
  i4698.italicStyle = i4699[4]
  i4698.tabSize = i4699[5]
  request.r(i4699[6], i4699[7], 0, i4698, 'atlas')
  i4698.m_SourceFontFileGUID = i4699[8]
  i4698.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i4699[9], i4698.m_CreationSettings)
  request.r(i4699[10], i4699[11], 0, i4698, 'm_SourceFontFile')
  i4698.m_SourceFontFilePath = i4699[12]
  i4698.m_AtlasPopulationMode = i4699[13]
  i4698.InternalDynamicOS = !!i4699[14]
  var i4701 = i4699[15]
  var i4700 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i4701.length; i += 1) {
    i4700.add(request.d('UnityEngine.TextCore.Glyph', i4701[i + 0]));
  }
  i4698.m_GlyphTable = i4700
  var i4703 = i4699[16]
  var i4702 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i4703.length; i += 1) {
    i4702.add(request.d('TMPro.TMP_Character', i4703[i + 0]));
  }
  i4698.m_CharacterTable = i4702
  var i4705 = i4699[17]
  var i4704 = []
  for(var i = 0; i < i4705.length; i += 2) {
  request.r(i4705[i + 0], i4705[i + 1], 2, i4704, '')
  }
  i4698.m_AtlasTextures = i4704
  i4698.m_AtlasTextureIndex = i4699[18]
  i4698.m_IsMultiAtlasTexturesEnabled = !!i4699[19]
  i4698.m_GetFontFeatures = !!i4699[20]
  i4698.m_ClearDynamicDataOnBuild = !!i4699[21]
  i4698.m_AtlasWidth = i4699[22]
  i4698.m_AtlasHeight = i4699[23]
  i4698.m_AtlasPadding = i4699[24]
  i4698.m_AtlasRenderMode = i4699[25]
  var i4707 = i4699[26]
  var i4706 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i4707.length; i += 1) {
    i4706.add(request.d('UnityEngine.TextCore.GlyphRect', i4707[i + 0]));
  }
  i4698.m_UsedGlyphRects = i4706
  var i4709 = i4699[27]
  var i4708 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i4709.length; i += 1) {
    i4708.add(request.d('UnityEngine.TextCore.GlyphRect', i4709[i + 0]));
  }
  i4698.m_FreeGlyphRects = i4708
  i4698.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i4699[28], i4698.m_FontFeatureTable)
  i4698.m_ShouldReimportFontFeatures = !!i4699[29]
  var i4711 = i4699[30]
  var i4710 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4711.length; i += 2) {
  request.r(i4711[i + 0], i4711[i + 1], 1, i4710, '')
  }
  i4698.m_FallbackFontAssetTable = i4710
  var i4713 = i4699[31]
  var i4712 = []
  for(var i = 0; i < i4713.length; i += 1) {
    i4712.push( request.d('TMPro.TMP_FontWeightPair', i4713[i + 0]) );
  }
  i4698.m_FontWeightTable = i4712
  var i4715 = i4699[32]
  var i4714 = []
  for(var i = 0; i < i4715.length; i += 1) {
    i4714.push( request.d('TMPro.TMP_FontWeightPair', i4715[i + 0]) );
  }
  i4698.fontWeights = i4714
  i4698.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i4699[33], i4698.m_fontInfo)
  var i4717 = i4699[34]
  var i4716 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i4717.length; i += 1) {
    i4716.add(request.d('TMPro.TMP_Glyph', i4717[i + 0]));
  }
  i4698.m_glyphInfoList = i4716
  i4698.m_KerningTable = request.d('TMPro.KerningTable', i4699[35], i4698.m_KerningTable)
  var i4719 = i4699[36]
  var i4718 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4719.length; i += 2) {
  request.r(i4719[i + 0], i4719[i + 1], 1, i4718, '')
  }
  i4698.fallbackFontAssets = i4718
  i4698.m_Version = i4699[37]
  i4698.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i4699[38], i4698.m_FaceInfo)
  request.r(i4699[39], i4699[40], 0, i4698, 'm_Material')
  return i4698
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i4720 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i4721 = data
  i4720.sourceFontFileName = i4721[0]
  i4720.sourceFontFileGUID = i4721[1]
  i4720.faceIndex = i4721[2]
  i4720.pointSizeSamplingMode = i4721[3]
  i4720.pointSize = i4721[4]
  i4720.padding = i4721[5]
  i4720.paddingMode = i4721[6]
  i4720.packingMode = i4721[7]
  i4720.atlasWidth = i4721[8]
  i4720.atlasHeight = i4721[9]
  i4720.characterSetSelectionMode = i4721[10]
  i4720.characterSequence = i4721[11]
  i4720.referencedFontAssetGUID = i4721[12]
  i4720.referencedTextAssetGUID = i4721[13]
  i4720.fontStyle = i4721[14]
  i4720.fontStyleModifier = i4721[15]
  i4720.renderMode = i4721[16]
  i4720.includeFontFeatures = !!i4721[17]
  return i4720
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i4724 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i4725 = data
  i4724.m_Index = i4725[0]
  i4724.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i4725[1], i4724.m_Metrics)
  i4724.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i4725[2], i4724.m_GlyphRect)
  i4724.m_Scale = i4725[3]
  i4724.m_AtlasIndex = i4725[4]
  i4724.m_ClassDefinitionType = i4725[5]
  return i4724
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i4726 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i4727 = data
  i4726.m_Width = i4727[0]
  i4726.m_Height = i4727[1]
  i4726.m_HorizontalBearingX = i4727[2]
  i4726.m_HorizontalBearingY = i4727[3]
  i4726.m_HorizontalAdvance = i4727[4]
  return i4726
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i4728 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i4729 = data
  i4728.m_X = i4729[0]
  i4728.m_Y = i4729[1]
  i4728.m_Width = i4729[2]
  i4728.m_Height = i4729[3]
  return i4728
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i4732 = root || request.c( 'TMPro.TMP_Character' )
  var i4733 = data
  i4732.m_ElementType = i4733[0]
  i4732.m_Unicode = i4733[1]
  i4732.m_GlyphIndex = i4733[2]
  i4732.m_Scale = i4733[3]
  return i4732
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i4738 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i4739 = data
  var i4741 = i4739[0]
  var i4740 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i4741.length; i += 1) {
    i4740.add(request.d('TMPro.MultipleSubstitutionRecord', i4741[i + 0]));
  }
  i4738.m_MultipleSubstitutionRecords = i4740
  var i4743 = i4739[1]
  var i4742 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i4743.length; i += 1) {
    i4742.add(request.d('TMPro.LigatureSubstitutionRecord', i4743[i + 0]));
  }
  i4738.m_LigatureSubstitutionRecords = i4742
  var i4745 = i4739[2]
  var i4744 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i4745.length; i += 1) {
    i4744.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i4745[i + 0]));
  }
  i4738.m_GlyphPairAdjustmentRecords = i4744
  var i4747 = i4739[3]
  var i4746 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i4747.length; i += 1) {
    i4746.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i4747[i + 0]));
  }
  i4738.m_MarkToBaseAdjustmentRecords = i4746
  var i4749 = i4739[4]
  var i4748 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i4749.length; i += 1) {
    i4748.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i4749[i + 0]));
  }
  i4738.m_MarkToMarkAdjustmentRecords = i4748
  return i4738
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i4752 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i4753 = data
  i4752.m_TargetGlyphID = i4753[0]
  i4752.m_SubstituteGlyphIDs = i4753[1]
  return i4752
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i4756 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i4757 = data
  i4756.m_ComponentGlyphIDs = i4757[0]
  i4756.m_LigatureGlyphID = i4757[1]
  return i4756
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i4760 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i4761 = data
  i4760.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i4761[0], i4760.m_FirstAdjustmentRecord)
  i4760.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i4761[1], i4760.m_SecondAdjustmentRecord)
  i4760.m_FeatureLookupFlags = i4761[2]
  return i4760
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i4764 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i4765 = data
  i4764.m_BaseGlyphID = i4765[0]
  i4764.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i4765[1], i4764.m_BaseGlyphAnchorPoint)
  i4764.m_MarkGlyphID = i4765[2]
  i4764.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i4765[3], i4764.m_MarkPositionAdjustment)
  return i4764
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i4768 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i4769 = data
  i4768.m_BaseMarkGlyphID = i4769[0]
  i4768.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i4769[1], i4768.m_BaseMarkGlyphAnchorPoint)
  i4768.m_CombiningMarkGlyphID = i4769[2]
  i4768.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i4769[3], i4768.m_CombiningMarkPositionAdjustment)
  return i4768
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i4774 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i4775 = data
  request.r(i4775[0], i4775[1], 0, i4774, 'regularTypeface')
  request.r(i4775[2], i4775[3], 0, i4774, 'italicTypeface')
  return i4774
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i4776 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i4777 = data
  i4776.Name = i4777[0]
  i4776.PointSize = i4777[1]
  i4776.Scale = i4777[2]
  i4776.CharacterCount = i4777[3]
  i4776.LineHeight = i4777[4]
  i4776.Baseline = i4777[5]
  i4776.Ascender = i4777[6]
  i4776.CapHeight = i4777[7]
  i4776.Descender = i4777[8]
  i4776.CenterLine = i4777[9]
  i4776.SuperscriptOffset = i4777[10]
  i4776.SubscriptOffset = i4777[11]
  i4776.SubSize = i4777[12]
  i4776.Underline = i4777[13]
  i4776.UnderlineThickness = i4777[14]
  i4776.strikethrough = i4777[15]
  i4776.strikethroughThickness = i4777[16]
  i4776.TabWidth = i4777[17]
  i4776.Padding = i4777[18]
  i4776.AtlasWidth = i4777[19]
  i4776.AtlasHeight = i4777[20]
  return i4776
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i4780 = root || request.c( 'TMPro.TMP_Glyph' )
  var i4781 = data
  i4780.id = i4781[0]
  i4780.x = i4781[1]
  i4780.y = i4781[2]
  i4780.width = i4781[3]
  i4780.height = i4781[4]
  i4780.xOffset = i4781[5]
  i4780.yOffset = i4781[6]
  i4780.xAdvance = i4781[7]
  i4780.scale = i4781[8]
  return i4780
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i4782 = root || request.c( 'TMPro.KerningTable' )
  var i4783 = data
  var i4785 = i4783[0]
  var i4784 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i4785.length; i += 1) {
    i4784.add(request.d('TMPro.KerningPair', i4785[i + 0]));
  }
  i4782.kerningPairs = i4784
  return i4782
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i4788 = root || request.c( 'TMPro.KerningPair' )
  var i4789 = data
  i4788.xOffset = i4789[0]
  i4788.m_FirstGlyph = i4789[1]
  i4788.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i4789[2], i4788.m_FirstGlyphAdjustments)
  i4788.m_SecondGlyph = i4789[3]
  i4788.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i4789[4], i4788.m_SecondGlyphAdjustments)
  i4788.m_IgnoreSpacingAdjustments = !!i4789[5]
  return i4788
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i4790 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i4791 = data
  i4790.m_FaceIndex = i4791[0]
  i4790.m_FamilyName = i4791[1]
  i4790.m_StyleName = i4791[2]
  i4790.m_PointSize = i4791[3]
  i4790.m_Scale = i4791[4]
  i4790.m_UnitsPerEM = i4791[5]
  i4790.m_LineHeight = i4791[6]
  i4790.m_AscentLine = i4791[7]
  i4790.m_CapLine = i4791[8]
  i4790.m_MeanLine = i4791[9]
  i4790.m_Baseline = i4791[10]
  i4790.m_DescentLine = i4791[11]
  i4790.m_SuperscriptOffset = i4791[12]
  i4790.m_SuperscriptSize = i4791[13]
  i4790.m_SubscriptOffset = i4791[14]
  i4790.m_SubscriptSize = i4791[15]
  i4790.m_UnderlineOffset = i4791[16]
  i4790.m_UnderlineThickness = i4791[17]
  i4790.m_StrikethroughOffset = i4791[18]
  i4790.m_StrikethroughThickness = i4791[19]
  i4790.m_TabWidth = i4791[20]
  return i4790
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i4792 = root || request.c( 'TMPro.TMP_Settings' )
  var i4793 = data
  i4792.assetVersion = i4793[0]
  i4792.m_TextWrappingMode = i4793[1]
  i4792.m_enableKerning = !!i4793[2]
  var i4795 = i4793[3]
  var i4794 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4795.length; i += 1) {
    i4794.add(i4795[i + 0]);
  }
  i4792.m_ActiveFontFeatures = i4794
  i4792.m_enableExtraPadding = !!i4793[4]
  i4792.m_enableTintAllSprites = !!i4793[5]
  i4792.m_enableParseEscapeCharacters = !!i4793[6]
  i4792.m_EnableRaycastTarget = !!i4793[7]
  i4792.m_GetFontFeaturesAtRuntime = !!i4793[8]
  i4792.m_missingGlyphCharacter = i4793[9]
  i4792.m_ClearDynamicDataOnBuild = !!i4793[10]
  i4792.m_warningsDisabled = !!i4793[11]
  request.r(i4793[12], i4793[13], 0, i4792, 'm_defaultFontAsset')
  i4792.m_defaultFontAssetPath = i4793[14]
  i4792.m_defaultFontSize = i4793[15]
  i4792.m_defaultAutoSizeMinRatio = i4793[16]
  i4792.m_defaultAutoSizeMaxRatio = i4793[17]
  i4792.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i4793[18], i4793[19] )
  i4792.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i4793[20], i4793[21] )
  i4792.m_autoSizeTextContainer = !!i4793[22]
  i4792.m_IsTextObjectScaleStatic = !!i4793[23]
  var i4797 = i4793[24]
  var i4796 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4797.length; i += 2) {
  request.r(i4797[i + 0], i4797[i + 1], 1, i4796, '')
  }
  i4792.m_fallbackFontAssets = i4796
  i4792.m_matchMaterialPreset = !!i4793[25]
  i4792.m_HideSubTextObjects = !!i4793[26]
  request.r(i4793[27], i4793[28], 0, i4792, 'm_defaultSpriteAsset')
  i4792.m_defaultSpriteAssetPath = i4793[29]
  i4792.m_enableEmojiSupport = !!i4793[30]
  i4792.m_MissingCharacterSpriteUnicode = i4793[31]
  var i4799 = i4793[32]
  var i4798 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i4799.length; i += 2) {
  request.r(i4799[i + 0], i4799[i + 1], 1, i4798, '')
  }
  i4792.m_EmojiFallbackTextAssets = i4798
  i4792.m_defaultColorGradientPresetsPath = i4793[33]
  request.r(i4793[34], i4793[35], 0, i4792, 'm_defaultStyleSheet')
  i4792.m_StyleSheetsResourcePath = i4793[36]
  request.r(i4793[37], i4793[38], 0, i4792, 'm_leadingCharacters')
  request.r(i4793[39], i4793[40], 0, i4792, 'm_followingCharacters')
  i4792.m_UseModernHangulLineBreakingRules = !!i4793[41]
  return i4792
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i4802 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i4803 = data
  request.r(i4803[0], i4803[1], 0, i4802, 'spriteSheet')
  var i4805 = i4803[2]
  var i4804 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i4805.length; i += 1) {
    i4804.add(request.d('TMPro.TMP_Sprite', i4805[i + 0]));
  }
  i4802.spriteInfoList = i4804
  var i4807 = i4803[3]
  var i4806 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i4807.length; i += 2) {
  request.r(i4807[i + 0], i4807[i + 1], 1, i4806, '')
  }
  i4802.fallbackSpriteAssets = i4806
  var i4809 = i4803[4]
  var i4808 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i4809.length; i += 1) {
    i4808.add(request.d('TMPro.TMP_SpriteCharacter', i4809[i + 0]));
  }
  i4802.m_SpriteCharacterTable = i4808
  var i4811 = i4803[5]
  var i4810 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i4811.length; i += 1) {
    i4810.add(request.d('TMPro.TMP_SpriteGlyph', i4811[i + 0]));
  }
  i4802.m_GlyphTable = i4810
  i4802.m_Version = i4803[6]
  i4802.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i4803[7], i4802.m_FaceInfo)
  request.r(i4803[8], i4803[9], 0, i4802, 'm_Material')
  return i4802
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i4814 = root || request.c( 'TMPro.TMP_Sprite' )
  var i4815 = data
  i4814.name = i4815[0]
  i4814.hashCode = i4815[1]
  i4814.unicode = i4815[2]
  i4814.pivot = new pc.Vec2( i4815[3], i4815[4] )
  request.r(i4815[5], i4815[6], 0, i4814, 'sprite')
  i4814.id = i4815[7]
  i4814.x = i4815[8]
  i4814.y = i4815[9]
  i4814.width = i4815[10]
  i4814.height = i4815[11]
  i4814.xOffset = i4815[12]
  i4814.yOffset = i4815[13]
  i4814.xAdvance = i4815[14]
  i4814.scale = i4815[15]
  return i4814
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i4820 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i4821 = data
  i4820.m_Name = i4821[0]
  i4820.m_ElementType = i4821[1]
  i4820.m_Unicode = i4821[2]
  i4820.m_GlyphIndex = i4821[3]
  i4820.m_Scale = i4821[4]
  return i4820
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i4824 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i4825 = data
  request.r(i4825[0], i4825[1], 0, i4824, 'sprite')
  i4824.m_Index = i4825[2]
  i4824.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i4825[3], i4824.m_Metrics)
  i4824.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i4825[4], i4824.m_GlyphRect)
  i4824.m_Scale = i4825[5]
  i4824.m_AtlasIndex = i4825[6]
  i4824.m_ClassDefinitionType = i4825[7]
  return i4824
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i4826 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i4827 = data
  var i4829 = i4827[0]
  var i4828 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i4829.length; i += 1) {
    i4828.add(request.d('TMPro.TMP_Style', i4829[i + 0]));
  }
  i4826.m_StyleList = i4828
  return i4826
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i4832 = root || request.c( 'TMPro.TMP_Style' )
  var i4833 = data
  i4832.m_Name = i4833[0]
  i4832.m_HashCode = i4833[1]
  i4832.m_OpeningDefinition = i4833[2]
  i4832.m_ClosingDefinition = i4833[3]
  i4832.m_OpeningTagArray = i4833[4]
  i4832.m_ClosingTagArray = i4833[5]
  return i4832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i4834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i4835 = data
  var i4837 = i4835[0]
  var i4836 = []
  for(var i = 0; i < i4837.length; i += 1) {
    i4836.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i4837[i + 0]) );
  }
  i4834.files = i4836
  i4834.componentToPrefabIds = i4835[1]
  return i4834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i4840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i4841 = data
  i4840.path = i4841[0]
  request.r(i4841[1], i4841[2], 0, i4840, 'unityObject')
  return i4840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i4842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i4843 = data
  var i4845 = i4843[0]
  var i4844 = []
  for(var i = 0; i < i4845.length; i += 1) {
    i4844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i4845[i + 0]) );
  }
  i4842.scriptsExecutionOrder = i4844
  var i4847 = i4843[1]
  var i4846 = []
  for(var i = 0; i < i4847.length; i += 1) {
    i4846.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i4847[i + 0]) );
  }
  i4842.sortingLayers = i4846
  var i4849 = i4843[2]
  var i4848 = []
  for(var i = 0; i < i4849.length; i += 1) {
    i4848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i4849[i + 0]) );
  }
  i4842.cullingLayers = i4848
  i4842.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i4843[3], i4842.timeSettings)
  i4842.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i4843[4], i4842.physicsSettings)
  i4842.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i4843[5], i4842.physics2DSettings)
  i4842.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4843[6], i4842.qualitySettings)
  i4842.enableRealtimeShadows = !!i4843[7]
  i4842.enableAutoInstancing = !!i4843[8]
  i4842.enableStaticBatching = !!i4843[9]
  i4842.enableDynamicBatching = !!i4843[10]
  i4842.usePreservativeDynamicBatching = !!i4843[11]
  i4842.lightmapEncodingQuality = i4843[12]
  i4842.desiredColorSpace = i4843[13]
  var i4851 = i4843[14]
  var i4850 = []
  for(var i = 0; i < i4851.length; i += 1) {
    i4850.push( i4851[i + 0] );
  }
  i4842.allTags = i4850
  return i4842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i4854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i4855 = data
  i4854.name = i4855[0]
  i4854.value = i4855[1]
  return i4854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i4858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i4859 = data
  i4858.id = i4859[0]
  i4858.name = i4859[1]
  i4858.value = i4859[2]
  return i4858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i4862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i4863 = data
  i4862.id = i4863[0]
  i4862.name = i4863[1]
  return i4862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i4864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i4865 = data
  i4864.fixedDeltaTime = i4865[0]
  i4864.maximumDeltaTime = i4865[1]
  i4864.timeScale = i4865[2]
  i4864.maximumParticleTimestep = i4865[3]
  return i4864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i4866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i4867 = data
  i4866.gravity = new pc.Vec3( i4867[0], i4867[1], i4867[2] )
  i4866.defaultSolverIterations = i4867[3]
  i4866.bounceThreshold = i4867[4]
  i4866.autoSyncTransforms = !!i4867[5]
  i4866.autoSimulation = !!i4867[6]
  var i4869 = i4867[7]
  var i4868 = []
  for(var i = 0; i < i4869.length; i += 1) {
    i4868.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i4869[i + 0]) );
  }
  i4866.collisionMatrix = i4868
  return i4866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i4872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i4873 = data
  i4872.enabled = !!i4873[0]
  i4872.layerId = i4873[1]
  i4872.otherLayerId = i4873[2]
  return i4872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i4874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i4875 = data
  request.r(i4875[0], i4875[1], 0, i4874, 'material')
  i4874.gravity = new pc.Vec2( i4875[2], i4875[3] )
  i4874.positionIterations = i4875[4]
  i4874.velocityIterations = i4875[5]
  i4874.velocityThreshold = i4875[6]
  i4874.maxLinearCorrection = i4875[7]
  i4874.maxAngularCorrection = i4875[8]
  i4874.maxTranslationSpeed = i4875[9]
  i4874.maxRotationSpeed = i4875[10]
  i4874.baumgarteScale = i4875[11]
  i4874.baumgarteTOIScale = i4875[12]
  i4874.timeToSleep = i4875[13]
  i4874.linearSleepTolerance = i4875[14]
  i4874.angularSleepTolerance = i4875[15]
  i4874.defaultContactOffset = i4875[16]
  i4874.autoSimulation = !!i4875[17]
  i4874.queriesHitTriggers = !!i4875[18]
  i4874.queriesStartInColliders = !!i4875[19]
  i4874.callbacksOnDisable = !!i4875[20]
  i4874.reuseCollisionCallbacks = !!i4875[21]
  i4874.autoSyncTransforms = !!i4875[22]
  var i4877 = i4875[23]
  var i4876 = []
  for(var i = 0; i < i4877.length; i += 1) {
    i4876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i4877[i + 0]) );
  }
  i4874.collisionMatrix = i4876
  return i4874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i4880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i4881 = data
  i4880.enabled = !!i4881[0]
  i4880.layerId = i4881[1]
  i4880.otherLayerId = i4881[2]
  return i4880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i4882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i4883 = data
  var i4885 = i4883[0]
  var i4884 = []
  for(var i = 0; i < i4885.length; i += 1) {
    i4884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4885[i + 0]) );
  }
  i4882.qualityLevels = i4884
  var i4887 = i4883[1]
  var i4886 = []
  for(var i = 0; i < i4887.length; i += 1) {
    i4886.push( i4887[i + 0] );
  }
  i4882.names = i4886
  i4882.shadows = i4883[2]
  i4882.anisotropicFiltering = i4883[3]
  i4882.antiAliasing = i4883[4]
  i4882.lodBias = i4883[5]
  i4882.shadowCascades = i4883[6]
  i4882.shadowDistance = i4883[7]
  i4882.shadowmaskMode = i4883[8]
  i4882.shadowProjection = i4883[9]
  i4882.shadowResolution = i4883[10]
  i4882.softParticles = !!i4883[11]
  i4882.softVegetation = !!i4883[12]
  i4882.activeColorSpace = i4883[13]
  i4882.desiredColorSpace = i4883[14]
  i4882.masterTextureLimit = i4883[15]
  i4882.maxQueuedFrames = i4883[16]
  i4882.particleRaycastBudget = i4883[17]
  i4882.pixelLightCount = i4883[18]
  i4882.realtimeReflectionProbes = !!i4883[19]
  i4882.shadowCascade2Split = i4883[20]
  i4882.shadowCascade4Split = new pc.Vec3( i4883[21], i4883[22], i4883[23] )
  i4882.streamingMipmapsActive = !!i4883[24]
  i4882.vSyncCount = i4883[25]
  i4882.asyncUploadBufferSize = i4883[26]
  i4882.asyncUploadTimeSlice = i4883[27]
  i4882.billboardsFaceCameraPosition = !!i4883[28]
  i4882.shadowNearPlaneOffset = i4883[29]
  i4882.streamingMipmapsMemoryBudget = i4883[30]
  i4882.maximumLODLevel = i4883[31]
  i4882.streamingMipmapsAddAllCameras = !!i4883[32]
  i4882.streamingMipmapsMaxLevelReduction = i4883[33]
  i4882.streamingMipmapsRenderersPerFrame = i4883[34]
  i4882.resolutionScalingFixedDPIFactor = i4883[35]
  i4882.streamingMipmapsMaxFileIORequests = i4883[36]
  i4882.currentQualityLevel = i4883[37]
  return i4882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i4892 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i4893 = data
  i4892.weight = i4893[0]
  i4892.vertices = i4893[1]
  i4892.normals = i4893[2]
  i4892.tangents = i4893[3]
  return i4892
}

Deserializers["UnityEngine.EventSystems.EventTrigger+TriggerEvent"] = function (request, data, root) {
  var i4894 = root || request.c( 'UnityEngine.EventSystems.EventTrigger+TriggerEvent' )
  var i4895 = data
  i4894.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4895[0], i4894.m_PersistentCalls)
  return i4894
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i4896 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i4897 = data
  request.r(i4897[0], i4897[1], 0, i4896, 'm_ObjectArgument')
  i4896.m_ObjectArgumentAssemblyTypeName = i4897[2]
  i4896.m_IntArgument = i4897[3]
  i4896.m_FloatArgument = i4897[4]
  i4896.m_StringArgument = i4897[5]
  i4896.m_BoolArgument = !!i4897[6]
  return i4896
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i4898 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i4899 = data
  i4898.m_GlyphIndex = i4899[0]
  i4898.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i4899[1], i4898.m_GlyphValueRecord)
  return i4898
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i4900 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i4901 = data
  i4900.m_XCoordinate = i4901[0]
  i4900.m_YCoordinate = i4901[1]
  return i4900
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i4902 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i4903 = data
  i4902.m_XPositionAdjustment = i4903[0]
  i4902.m_YPositionAdjustment = i4903[1]
  return i4902
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i4904 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i4905 = data
  i4904.xPlacement = i4905[0]
  i4904.yPlacement = i4905[1]
  i4904.xAdvance = i4905[2]
  i4904.yAdvance = i4905[3]
  return i4904
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i4906 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i4907 = data
  i4906.m_XPlacement = i4907[0]
  i4906.m_YPlacement = i4907[1]
  i4906.m_XAdvance = i4907[2]
  i4906.m_YAdvance = i4907[3]
  return i4906
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

Deserializers.buildID = "3d122ed2-d35f-4b91-8288-316a5a847023";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

