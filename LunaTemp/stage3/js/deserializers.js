var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i536 = root || request.c( 'UnityEngine.JointSpring' )
  var i537 = data
  i536.spring = i537[0]
  i536.damper = i537[1]
  i536.targetPosition = i537[2]
  return i536
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i538 = root || request.c( 'UnityEngine.JointMotor' )
  var i539 = data
  i538.m_TargetVelocity = i539[0]
  i538.m_Force = i539[1]
  i538.m_FreeSpin = i539[2]
  return i538
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i540 = root || request.c( 'UnityEngine.JointLimits' )
  var i541 = data
  i540.m_Min = i541[0]
  i540.m_Max = i541[1]
  i540.m_Bounciness = i541[2]
  i540.m_BounceMinVelocity = i541[3]
  i540.m_ContactDistance = i541[4]
  i540.minBounce = i541[5]
  i540.maxBounce = i541[6]
  return i540
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i542 = root || request.c( 'UnityEngine.JointDrive' )
  var i543 = data
  i542.m_PositionSpring = i543[0]
  i542.m_PositionDamper = i543[1]
  i542.m_MaximumForce = i543[2]
  i542.m_UseAcceleration = i543[3]
  return i542
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i544 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i545 = data
  i544.m_Spring = i545[0]
  i544.m_Damper = i545[1]
  return i544
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i546 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i547 = data
  i546.m_Limit = i547[0]
  i546.m_Bounciness = i547[1]
  i546.m_ContactDistance = i547[2]
  return i546
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i548 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i549 = data
  i548.m_ExtremumSlip = i549[0]
  i548.m_ExtremumValue = i549[1]
  i548.m_AsymptoteSlip = i549[2]
  i548.m_AsymptoteValue = i549[3]
  i548.m_Stiffness = i549[4]
  return i548
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i550 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i551 = data
  i550.m_LowerAngle = i551[0]
  i550.m_UpperAngle = i551[1]
  return i550
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i552 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i553 = data
  i552.m_MotorSpeed = i553[0]
  i552.m_MaximumMotorTorque = i553[1]
  return i552
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i554 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i555 = data
  i554.m_DampingRatio = i555[0]
  i554.m_Frequency = i555[1]
  i554.m_Angle = i555[2]
  return i554
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i556 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i557 = data
  i556.m_LowerTranslation = i557[0]
  i556.m_UpperTranslation = i557[1]
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i558 = root || new pc.UnityMaterial()
  var i559 = data
  i558.name = i559[0]
  request.r(i559[1], i559[2], 0, i558, 'shader')
  i558.renderQueue = i559[3]
  i558.enableInstancing = !!i559[4]
  var i561 = i559[5]
  var i560 = []
  for(var i = 0; i < i561.length; i += 1) {
    i560.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i561[i + 0]) );
  }
  i558.floatParameters = i560
  var i563 = i559[6]
  var i562 = []
  for(var i = 0; i < i563.length; i += 1) {
    i562.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i563[i + 0]) );
  }
  i558.colorParameters = i562
  var i565 = i559[7]
  var i564 = []
  for(var i = 0; i < i565.length; i += 1) {
    i564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i565[i + 0]) );
  }
  i558.vectorParameters = i564
  var i567 = i559[8]
  var i566 = []
  for(var i = 0; i < i567.length; i += 1) {
    i566.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i567[i + 0]) );
  }
  i558.textureParameters = i566
  var i569 = i559[9]
  var i568 = []
  for(var i = 0; i < i569.length; i += 1) {
    i568.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i569[i + 0]) );
  }
  i558.materialFlags = i568
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i573 = data
  i572.name = i573[0]
  i572.value = i573[1]
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i577 = data
  i576.name = i577[0]
  i576.value = new pc.Color(i577[1], i577[2], i577[3], i577[4])
  return i576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i581 = data
  i580.name = i581[0]
  i580.value = new pc.Vec4( i581[1], i581[2], i581[3], i581[4] )
  return i580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i585 = data
  i584.name = i585[0]
  request.r(i585[1], i585[2], 0, i584, 'value')
  return i584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i589 = data
  i588.name = i589[0]
  i588.enabled = !!i589[1]
  return i588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i591 = data
  i590.position = new pc.Vec3( i591[0], i591[1], i591[2] )
  i590.scale = new pc.Vec3( i591[3], i591[4], i591[5] )
  i590.rotation = new pc.Quat(i591[6], i591[7], i591[8], i591[9])
  return i590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i593 = data
  request.r(i593[0], i593[1], 0, i592, 'animatorController')
  request.r(i593[2], i593[3], 0, i592, 'avatar')
  i592.updateMode = i593[4]
  i592.hasTransformHierarchy = !!i593[5]
  i592.applyRootMotion = !!i593[6]
  var i595 = i593[7]
  var i594 = []
  for(var i = 0; i < i595.length; i += 2) {
  request.r(i595[i + 0], i595[i + 1], 2, i594, '')
  }
  i592.humanBones = i594
  i592.enabled = !!i593[8]
  return i592
}

Deserializers["BuildPlayerVisual"] = function (request, data, root) {
  var i598 = root || request.c( 'BuildPlayerVisual' )
  var i599 = data
  request.r(i599[0], i599[1], 0, i598, 'animator')
  var i601 = i599[2]
  var i600 = []
  for(var i = 0; i < i601.length; i += 2) {
  request.r(i601[i + 0], i601[i + 1], 2, i600, '')
  }
  i598.body = i600
  return i598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i605 = data
  i604.name = i605[0]
  i604.tagId = i605[1]
  i604.enabled = !!i605[2]
  i604.isStatic = !!i605[3]
  i604.layer = i605[4]
  return i604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i607 = data
  request.r(i607[0], i607[1], 0, i606, 'sharedMesh')
  var i609 = i607[2]
  var i608 = []
  for(var i = 0; i < i609.length; i += 2) {
  request.r(i609[i + 0], i609[i + 1], 2, i608, '')
  }
  i606.bones = i608
  i606.updateWhenOffscreen = !!i607[3]
  i606.localBounds = i607[4]
  request.r(i607[5], i607[6], 0, i606, 'rootBone')
  var i611 = i607[7]
  var i610 = []
  for(var i = 0; i < i611.length; i += 1) {
    i610.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i611[i + 0]) );
  }
  i606.blendShapesWeights = i610
  i606.enabled = !!i607[8]
  request.r(i607[9], i607[10], 0, i606, 'sharedMaterial')
  var i613 = i607[11]
  var i612 = []
  for(var i = 0; i < i613.length; i += 2) {
  request.r(i613[i + 0], i613[i + 1], 2, i612, '')
  }
  i606.sharedMaterials = i612
  i606.receiveShadows = !!i607[12]
  i606.shadowCastingMode = i607[13]
  i606.sortingLayerID = i607[14]
  i606.sortingOrder = i607[15]
  i606.lightmapIndex = i607[16]
  i606.lightmapSceneIndex = i607[17]
  i606.lightmapScaleOffset = new pc.Vec4( i607[18], i607[19], i607[20], i607[21] )
  i606.lightProbeUsage = i607[22]
  i606.reflectionProbeUsage = i607[23]
  return i606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i617 = data
  i616.weight = i617[0]
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i621 = data
  i620.name = i621[0]
  i620.width = i621[1]
  i620.height = i621[2]
  i620.mipmapCount = i621[3]
  i620.anisoLevel = i621[4]
  i620.filterMode = i621[5]
  i620.hdr = !!i621[6]
  i620.format = i621[7]
  i620.wrapMode = i621[8]
  i620.alphaIsTransparency = !!i621[9]
  i620.alphaSource = i621[10]
  i620.graphicsFormat = i621[11]
  i620.sRGBTexture = !!i621[12]
  i620.desiredColorSpace = i621[13]
  i620.wrapU = i621[14]
  i620.wrapV = i621[15]
  return i620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i623 = data
  i622.name = i623[0]
  i622.halfPrecision = !!i623[1]
  i622.useSimplification = !!i623[2]
  i622.useUInt32IndexFormat = !!i623[3]
  i622.vertexCount = i623[4]
  i622.aabb = i623[5]
  var i625 = i623[6]
  var i624 = []
  for(var i = 0; i < i625.length; i += 1) {
    i624.push( !!i625[i + 0] );
  }
  i622.streams = i624
  i622.vertices = i623[7]
  var i627 = i623[8]
  var i626 = []
  for(var i = 0; i < i627.length; i += 1) {
    i626.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i627[i + 0]) );
  }
  i622.subMeshes = i626
  var i629 = i623[9]
  var i628 = []
  for(var i = 0; i < i629.length; i += 16) {
    i628.push( new pc.Mat4().setData(i629[i + 0], i629[i + 1], i629[i + 2], i629[i + 3],  i629[i + 4], i629[i + 5], i629[i + 6], i629[i + 7],  i629[i + 8], i629[i + 9], i629[i + 10], i629[i + 11],  i629[i + 12], i629[i + 13], i629[i + 14], i629[i + 15]) );
  }
  i622.bindposes = i628
  var i631 = i623[10]
  var i630 = []
  for(var i = 0; i < i631.length; i += 1) {
    i630.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i631[i + 0]) );
  }
  i622.blendShapes = i630
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i637 = data
  i636.triangles = i637[0]
  return i636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i643 = data
  i642.name = i643[0]
  var i645 = i643[1]
  var i644 = []
  for(var i = 0; i < i645.length; i += 1) {
    i644.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i645[i + 0]) );
  }
  i642.frames = i644
  return i642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i647 = data
  request.r(i647[0], i647[1], 0, i646, 'sharedMesh')
  return i646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i649 = data
  request.r(i649[0], i649[1], 0, i648, 'additionalVertexStreams')
  i648.enabled = !!i649[2]
  request.r(i649[3], i649[4], 0, i648, 'sharedMaterial')
  var i651 = i649[5]
  var i650 = []
  for(var i = 0; i < i651.length; i += 2) {
  request.r(i651[i + 0], i651[i + 1], 2, i650, '')
  }
  i648.sharedMaterials = i650
  i648.receiveShadows = !!i649[6]
  i648.shadowCastingMode = i649[7]
  i648.sortingLayerID = i649[8]
  i648.sortingOrder = i649[9]
  i648.lightmapIndex = i649[10]
  i648.lightmapSceneIndex = i649[11]
  i648.lightmapScaleOffset = new pc.Vec4( i649[12], i649[13], i649[14], i649[15] )
  i648.lightProbeUsage = i649[16]
  i648.reflectionProbeUsage = i649[17]
  return i648
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.RenderTexture"] = function (request, data, root) {
  var i652 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.RenderTexture' )
  var i653 = data
  i652.name = i653[0]
  i652.width = i653[1]
  i652.height = i653[2]
  i652.anisoLevel = i653[3]
  i652.filterMode = i653[4]
  i652.hdr = !!i653[5]
  i652.colorFormat = i653[6]
  i652.depthStencilFormat = i653[7]
  i652.renderTextureFormat = i653[8]
  i652.depth = i653[9]
  i652.wrapU = i653[10]
  i652.wrapV = i653[11]
  return i652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i655 = data
  i654.name = i655[0]
  i654.atlasId = i655[1]
  i654.mipmapCount = i655[2]
  i654.hdr = !!i655[3]
  i654.size = i655[4]
  i654.anisoLevel = i655[5]
  i654.filterMode = i655[6]
  var i657 = i655[7]
  var i656 = []
  for(var i = 0; i < i657.length; i += 4) {
    i656.push( UnityEngine.Rect.MinMaxRect(i657[i + 0], i657[i + 1], i657[i + 2], i657[i + 3]) );
  }
  i654.rects = i656
  i654.wrapU = i655[8]
  i654.wrapV = i655[9]
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i661 = data
  i660.name = i661[0]
  i660.index = i661[1]
  i660.startup = !!i661[2]
  return i660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i663 = data
  i662.aspect = i663[0]
  i662.orthographic = !!i663[1]
  i662.orthographicSize = i663[2]
  i662.backgroundColor = new pc.Color(i663[3], i663[4], i663[5], i663[6])
  i662.nearClipPlane = i663[7]
  i662.farClipPlane = i663[8]
  i662.fieldOfView = i663[9]
  i662.depth = i663[10]
  i662.clearFlags = i663[11]
  i662.cullingMask = i663[12]
  i662.rect = i663[13]
  request.r(i663[14], i663[15], 0, i662, 'targetTexture')
  i662.usePhysicalProperties = !!i663[16]
  i662.focalLength = i663[17]
  i662.sensorSize = new pc.Vec2( i663[18], i663[19] )
  i662.lensShift = new pc.Vec2( i663[20], i663[21] )
  i662.gateFit = i663[22]
  i662.commandBufferCount = i663[23]
  i662.cameraType = i663[24]
  i662.enabled = !!i663[25]
  return i662
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i664 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i665 = data
  i664.m_RenderShadows = !!i665[0]
  i664.m_RequiresDepthTextureOption = i665[1]
  i664.m_RequiresOpaqueTextureOption = i665[2]
  i664.m_CameraType = i665[3]
  var i667 = i665[4]
  var i666 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i667.length; i += 2) {
  request.r(i667[i + 0], i667[i + 1], 1, i666, '')
  }
  i664.m_Cameras = i666
  i664.m_RendererIndex = i665[5]
  i664.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i665[6] )
  request.r(i665[7], i665[8], 0, i664, 'm_VolumeTrigger')
  i664.m_VolumeFrameworkUpdateModeOption = i665[9]
  i664.m_RenderPostProcessing = !!i665[10]
  i664.m_Antialiasing = i665[11]
  i664.m_AntialiasingQuality = i665[12]
  i664.m_StopNaN = !!i665[13]
  i664.m_Dithering = !!i665[14]
  i664.m_ClearDepth = !!i665[15]
  i664.m_AllowXRRendering = !!i665[16]
  i664.m_AllowHDROutput = !!i665[17]
  i664.m_UseScreenCoordOverride = !!i665[18]
  i664.m_ScreenSizeOverride = new pc.Vec4( i665[19], i665[20], i665[21], i665[22] )
  i664.m_ScreenCoordScaleBias = new pc.Vec4( i665[23], i665[24], i665[25], i665[26] )
  i664.m_RequiresDepthTexture = !!i665[27]
  i664.m_RequiresColorTexture = !!i665[28]
  i664.m_Version = i665[29]
  i664.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i665[30], i664.m_TaaSettings)
  return i664
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i670 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i671 = data
  i670.m_Quality = i671[0]
  i670.m_FrameInfluence = i671[1]
  i670.m_JitterScale = i671[2]
  i670.m_MipBias = i671[3]
  i670.m_VarianceClampScale = i671[4]
  i670.m_ContrastAdaptiveSharpening = i671[5]
  return i670
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i672 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i673 = data
  request.r(i673[0], i673[1], 0, i672, 'm_FirstSelected')
  i672.m_sendNavigationEvents = !!i673[2]
  i672.m_DragThreshold = i673[3]
  return i672
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i674 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i675 = data
  i674.m_HorizontalAxis = i675[0]
  i674.m_VerticalAxis = i675[1]
  i674.m_SubmitButton = i675[2]
  i674.m_CancelButton = i675[3]
  i674.m_InputActionsPerSecond = i675[4]
  i674.m_RepeatDelay = i675[5]
  i674.m_ForceModuleActive = !!i675[6]
  i674.m_SendPointerHoverToParent = !!i675[7]
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i676 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i677 = data
  i676.type = i677[0]
  i676.color = new pc.Color(i677[1], i677[2], i677[3], i677[4])
  i676.cullingMask = i677[5]
  i676.intensity = i677[6]
  i676.range = i677[7]
  i676.spotAngle = i677[8]
  i676.shadows = i677[9]
  i676.shadowNormalBias = i677[10]
  i676.shadowBias = i677[11]
  i676.shadowStrength = i677[12]
  i676.shadowResolution = i677[13]
  i676.lightmapBakeType = i677[14]
  i676.renderMode = i677[15]
  request.r(i677[16], i677[17], 0, i676, 'cookie')
  i676.cookieSize = i677[18]
  i676.shadowNearPlane = i677[19]
  i676.occlusionMaskChannel = i677[20]
  i676.isBaked = !!i677[21]
  i676.mixedLightingMode = i677[22]
  i676.enabled = !!i677[23]
  return i676
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i678 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i679 = data
  i678.m_Version = i679[0]
  i678.m_UsePipelineSettings = !!i679[1]
  i678.m_AdditionalLightsShadowResolutionTier = i679[2]
  i678.m_LightLayerMask = i679[3]
  i678.m_RenderingLayers = i679[4]
  i678.m_CustomShadowLayers = !!i679[5]
  i678.m_ShadowLayerMask = i679[6]
  i678.m_ShadowRenderingLayers = i679[7]
  i678.m_LightCookieSize = new pc.Vec2( i679[8], i679[9] )
  i678.m_LightCookieOffset = new pc.Vec2( i679[10], i679[11] )
  i678.m_SoftShadowQuality = i679[12]
  return i678
}

Deserializers["PointLightReflectionExclusion"] = function (request, data, root) {
  var i680 = root || request.c( 'PointLightReflectionExclusion' )
  var i681 = data
  request.r(i681[0], i681[1], 0, i680, 'source')
  return i680
}

Deserializers["GameController"] = function (request, data, root) {
  var i682 = root || request.c( 'GameController' )
  var i683 = data
  var i685 = i683[0]
  var i684 = new (System.Collections.Generic.List$1(Bridge.ns('BuildingPart')))
  for(var i = 0; i < i685.length; i += 1) {
    i684.add(request.d('BuildingPart', i685[i + 0]));
  }
  i682.parts = i684
  i682.createSampleBlueprintWhenEmpty = !!i683[1]
  request.r(i683[2], i683[3], 0, i682, 'buildingOrigin')
  request.r(i683[4], i683[5], 0, i682, 'playerCamera')
  request.r(i683[6], i683[7], 0, i682, 'cameraController')
  request.r(i683[8], i683[9], 0, i682, 'blockPlacer')
  request.r(i683[10], i683[11], 0, i682, 'progressUI')
  request.r(i683[12], i683[13], 0, i682, 'adjacentPreviews')
  request.r(i683[14], i683[15], 0, i682, 'completionFireworks')
  return i682
}

Deserializers["BuildingPart"] = function (request, data, root) {
  var i688 = root || request.c( 'BuildingPart' )
  var i689 = data
  i688.name = i689[0]
  var i691 = i689[1]
  var i690 = new (System.Collections.Generic.List$1(Bridge.ns('BuildBlock')))
  for(var i = 0; i < i691.length; i += 1) {
    i690.add(request.d('BuildBlock', i691[i + 0]));
  }
  i688.blocks = i690
  return i688
}

Deserializers["BuildCameraController"] = function (request, data, root) {
  var i692 = root || request.c( 'BuildCameraController' )
  var i693 = data
  i692.lookSensitivity = i693[0]
  i692.playerMotor = request.d('BuildPlayerMotor', i693[1], i692.playerMotor)
  i692.turnToBlockSeconds = i693[2]
  i692.tapMovementLimit = i693[3]
  i692.collisionRadius = i693[4]
  request.r(i693[5], i693[6], 0, i692, 'collisionWorld')
  request.r(i693[7], i693[8], 0, i692, 'playerVisual')
  i692.thirdPersonDistance = i693[9]
  request.r(i693[10], i693[11], 0, i692, 'controls')
  return i692
}

Deserializers["BuildPlayerMotor"] = function (request, data, root) {
  var i694 = root || request.c( 'BuildPlayerMotor' )
  var i695 = data
  i694.walkSpeed = i695[0]
  i694.flySpeed = i695[1]
  i694.movementSharpness = i695[2]
  i694.airAcceleration = i695[3]
  i694.gravity = i695[4]
  i694.jumpSpeed = i695[5]
  i694.eyeHeight = i695[6]
  i694.bodyHeight = i695[7]
  i694.maxFlyHeight = i695[8]
  i694.autoJump = !!i695[9]
  return i694
}

Deserializers["BuildBlockPlacer"] = function (request, data, root) {
  var i696 = root || request.c( 'BuildBlockPlacer' )
  var i697 = data
  request.r(i697[0], i697[1], 0, i696, 'placementFlash')
  return i696
}

Deserializers["BuildProgressUI"] = function (request, data, root) {
  var i698 = root || request.c( 'BuildProgressUI' )
  var i699 = data
  request.r(i699[0], i699[1], 0, i698, 'canvasRoot')
  request.r(i699[2], i699[3], 0, i698, 'logo')
  request.r(i699[4], i699[5], 0, i698, 'install')
  request.r(i699[6], i699[7], 0, i698, 'bar')
  request.r(i699[8], i699[9], 0, i698, 'fill')
  request.r(i699[10], i699[11], 0, i698, 'building')
  request.r(i699[12], i699[13], 0, i698, 'inventory')
  request.r(i699[14], i699[15], 0, i698, 'title')
  request.r(i699[16], i699[17], 0, i698, 'count')
  var i701 = i699[18]
  var i700 = []
  for(var i = 0; i < i701.length; i += 2) {
  request.r(i701[i + 0], i701[i + 1], 2, i700, '')
  }
  i698.slots = i700
  var i703 = i699[19]
  var i702 = []
  for(var i = 0; i < i703.length; i += 2) {
  request.r(i703[i + 0], i703[i + 1], 2, i702, '')
  }
  i698.blockImages = i702
  var i705 = i699[20]
  var i704 = []
  for(var i = 0; i < i705.length; i += 1) {
    i704.push( request.d('BuildProgressUI+BlockItem', i705[i + 0]) );
  }
  i698.blockItems = i704
  var i707 = i699[21]
  var i706 = []
  for(var i = 0; i < i707.length; i += 2) {
  request.r(i707[i + 0], i707[i + 1], 2, i706, '')
  }
  i698.amounts = i706
  return i698
}

Deserializers["BuildProgressUI+BlockItem"] = function (request, data, root) {
  var i714 = root || request.c( 'BuildProgressUI+BlockItem' )
  var i715 = data
  i714.label = i715[0]
  var i717 = i715[1]
  var i716 = []
  for(var i = 0; i < i717.length; i += 1) {
    i716.push( i717[i + 0] );
  }
  i714.types = i716
  return i714
}

Deserializers["AdjacentBlockPreviews"] = function (request, data, root) {
  var i722 = root || request.c( 'AdjacentBlockPreviews' )
  var i723 = data
  i722.opacity = i723[0]
  return i722
}

Deserializers["GameplayMaterials"] = function (request, data, root) {
  var i724 = root || request.c( 'GameplayMaterials' )
  var i725 = data
  request.r(i725[0], i725[1], 0, i724, 'solid')
  request.r(i725[2], i725[3], 0, i724, 'transparent')
  request.r(i725[4], i725[5], 0, i724, 'unlit')
  request.r(i725[6], i725[7], 0, i724, 'guideOverlay')
  return i724
}

Deserializers["AudioController"] = function (request, data, root) {
  var i726 = root || request.c( 'AudioController' )
  var i727 = data
  request.r(i727[0], i727[1], 0, i726, 'placementSource')
  request.r(i727[2], i727[3], 0, i726, 'placementClip')
  i726.placementVolume = i727[4]
  return i726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i728 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i729 = data
  request.r(i729[0], i729[1], 0, i728, 'clip')
  request.r(i729[2], i729[3], 0, i728, 'outputAudioMixerGroup')
  i728.playOnAwake = !!i729[4]
  i728.loop = !!i729[5]
  i728.time = i729[6]
  i728.volume = i729[7]
  i728.pitch = i729[8]
  i728.enabled = !!i729[9]
  return i728
}

Deserializers["WetGroundReflection"] = function (request, data, root) {
  var i730 = root || request.c( 'WetGroundReflection' )
  var i731 = data
  request.r(i731[0], i731[1], 0, i730, 'viewCamera')
  request.r(i731[2], i731[3], 0, i730, 'reflectionCamera')
  request.r(i731[4], i731[5], 0, i730, 'groundMaterial')
  i730.groundHeight = i731[6]
  i730.updateEveryFrames = i731[7]
  return i730
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

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i738 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i739 = data
  i738.cullTransparentMesh = !!i739[0]
  return i738
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i740 = root || request.c( 'UnityEngine.UI.Image' )
  var i741 = data
  request.r(i741[0], i741[1], 0, i740, 'm_Sprite')
  i740.m_Type = i741[2]
  i740.m_PreserveAspect = !!i741[3]
  i740.m_FillCenter = !!i741[4]
  i740.m_FillMethod = i741[5]
  i740.m_FillAmount = i741[6]
  i740.m_FillClockwise = !!i741[7]
  i740.m_FillOrigin = i741[8]
  i740.m_UseSpriteMesh = !!i741[9]
  i740.m_PixelsPerUnitMultiplier = i741[10]
  request.r(i741[11], i741[12], 0, i740, 'm_Material')
  i740.m_Maskable = !!i741[13]
  i740.m_Color = new pc.Color(i741[14], i741[15], i741[16], i741[17])
  i740.m_RaycastTarget = !!i741[18]
  i740.m_RaycastPadding = new pc.Vec4( i741[19], i741[20], i741[21], i741[22] )
  return i740
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i742 = root || request.c( 'UnityEngine.UI.Text' )
  var i743 = data
  i742.m_FontData = request.d('UnityEngine.UI.FontData', i743[0], i742.m_FontData)
  i742.m_Text = i743[1]
  request.r(i743[2], i743[3], 0, i742, 'm_Material')
  i742.m_Maskable = !!i743[4]
  i742.m_Color = new pc.Color(i743[5], i743[6], i743[7], i743[8])
  i742.m_RaycastTarget = !!i743[9]
  i742.m_RaycastPadding = new pc.Vec4( i743[10], i743[11], i743[12], i743[13] )
  return i742
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i744 = root || request.c( 'UnityEngine.UI.FontData' )
  var i745 = data
  request.r(i745[0], i745[1], 0, i744, 'm_Font')
  i744.m_FontSize = i745[2]
  i744.m_FontStyle = i745[3]
  i744.m_BestFit = !!i745[4]
  i744.m_MinSize = i745[5]
  i744.m_MaxSize = i745[6]
  i744.m_Alignment = i745[7]
  i744.m_AlignByGeometry = !!i745[8]
  i744.m_RichText = !!i745[9]
  i744.m_HorizontalOverflow = i745[10]
  i744.m_VerticalOverflow = i745[11]
  i744.m_LineSpacing = i745[12]
  return i744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i747 = data
  i746.m_Alpha = i747[0]
  i746.m_Interactable = !!i747[1]
  i746.m_BlocksRaycasts = !!i747[2]
  i746.m_IgnoreParentGroups = !!i747[3]
  i746.enabled = !!i747[4]
  return i746
}

Deserializers["BuildTapTutorial"] = function (request, data, root) {
  var i748 = root || request.c( 'BuildTapTutorial' )
  var i749 = data
  request.r(i749[0], i749[1], 0, i748, 'controller')
  request.r(i749[2], i749[3], 0, i748, 'view')
  request.r(i749[4], i749[5], 0, i748, 'container')
  request.r(i749[6], i749[7], 0, i748, 'hand')
  request.r(i749[8], i749[9], 0, i748, 'visuals')
  i748.idleSeconds = i749[10]
  request.r(i749[11], i749[12], 0, i748, 'progressUI')
  request.r(i749[13], i749[14], 0, i748, 'prompt')
  return i748
}

Deserializers["BuildTouchControls"] = function (request, data, root) {
  var i750 = root || request.c( 'BuildTouchControls' )
  var i751 = data
  request.r(i751[0], i751[1], 0, i750, 'stick')
  request.r(i751[2], i751[3], 0, i750, 'knob')
  request.r(i751[4], i751[5], 0, i750, 'fly')
  request.r(i751[6], i751[7], 0, i750, 'up')
  request.r(i751[8], i751[9], 0, i750, 'down')
  request.r(i751[10], i751[11], 0, i750, 'exit')
  request.r(i751[12], i751[13], 0, i750, 'viewButton')
  return i750
}

Deserializers["BuildCompleteFireworks"] = function (request, data, root) {
  var i752 = root || request.c( 'BuildCompleteFireworks' )
  var i753 = data
  request.r(i753[0], i753[1], 0, i752, 'meshFilter')
  request.r(i753[2], i753[3], 0, i752, 'meshRenderer')
  i752.burstHeight = i753[4]
  i752.launchInterval = i753[5]
  var i755 = i753[6]
  var i754 = []
  for(var i = 0; i < i755.length; i += 2) {
  request.r(i755[i + 0], i755[i + 1], 2, i754, '')
  }
  i752.launchAudio = i754
  var i757 = i753[7]
  var i756 = []
  for(var i = 0; i < i757.length; i += 2) {
  request.r(i757[i + 0], i757[i + 1], 2, i756, '')
  }
  i752.flightAudio = i756
  var i759 = i753[8]
  var i758 = []
  for(var i = 0; i < i759.length; i += 2) {
  request.r(i759[i + 0], i759[i + 1], 2, i758, '')
  }
  i752.burstAudio = i758
  return i752
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i762 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i763 = data
  i762.center = new pc.Vec3( i763[0], i763[1], i763[2] )
  i762.size = new pc.Vec3( i763[3], i763[4], i763[5] )
  i762.enabled = !!i763[6]
  i762.isTrigger = !!i763[7]
  request.r(i763[8], i763[9], 0, i762, 'material')
  return i762
}

Deserializers["BuildCollisionWorld"] = function (request, data, root) {
  var i764 = root || request.c( 'BuildCollisionWorld' )
  var i765 = data
  i764.mapBoxData = i765[0]
  request.r(i765[1], i765[2], 0, i764, 'limitRoot')
  return i764
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i766 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i767 = data
  i766.m_IgnoreReversedGraphics = !!i767[0]
  i766.m_BlockingObjects = i767[1]
  i766.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i767[2] )
  return i766
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i768 = root || request.c( 'UnityEngine.UI.Button' )
  var i769 = data
  i768.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i769[0], i768.m_OnClick)
  i768.m_Navigation = request.d('UnityEngine.UI.Navigation', i769[1], i768.m_Navigation)
  i768.m_Transition = i769[2]
  i768.m_Colors = request.d('UnityEngine.UI.ColorBlock', i769[3], i768.m_Colors)
  i768.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i769[4], i768.m_SpriteState)
  i768.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i769[5], i768.m_AnimationTriggers)
  i768.m_Interactable = !!i769[6]
  request.r(i769[7], i769[8], 0, i768, 'm_TargetGraphic')
  return i768
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i770 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i771 = data
  i770.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i771[0], i770.m_PersistentCalls)
  return i770
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i772 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i773 = data
  var i775 = i773[0]
  var i774 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i775.length; i += 1) {
    i774.add(request.d('UnityEngine.Events.PersistentCall', i775[i + 0]));
  }
  i772.m_Calls = i774
  return i772
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i778 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i779 = data
  request.r(i779[0], i779[1], 0, i778, 'm_Target')
  i778.m_TargetAssemblyTypeName = i779[2]
  i778.m_MethodName = i779[3]
  i778.m_Mode = i779[4]
  i778.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i779[5], i778.m_Arguments)
  i778.m_CallState = i779[6]
  return i778
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i780 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i781 = data
  i780.m_Mode = i781[0]
  i780.m_WrapAround = !!i781[1]
  request.r(i781[2], i781[3], 0, i780, 'm_SelectOnUp')
  request.r(i781[4], i781[5], 0, i780, 'm_SelectOnDown')
  request.r(i781[6], i781[7], 0, i780, 'm_SelectOnLeft')
  request.r(i781[8], i781[9], 0, i780, 'm_SelectOnRight')
  return i780
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i782 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i783 = data
  i782.m_NormalColor = new pc.Color(i783[0], i783[1], i783[2], i783[3])
  i782.m_HighlightedColor = new pc.Color(i783[4], i783[5], i783[6], i783[7])
  i782.m_PressedColor = new pc.Color(i783[8], i783[9], i783[10], i783[11])
  i782.m_SelectedColor = new pc.Color(i783[12], i783[13], i783[14], i783[15])
  i782.m_DisabledColor = new pc.Color(i783[16], i783[17], i783[18], i783[19])
  i782.m_ColorMultiplier = i783[20]
  i782.m_FadeDuration = i783[21]
  return i782
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i784 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i785 = data
  request.r(i785[0], i785[1], 0, i784, 'm_HighlightedSprite')
  request.r(i785[2], i785[3], 0, i784, 'm_PressedSprite')
  request.r(i785[4], i785[5], 0, i784, 'm_SelectedSprite')
  request.r(i785[6], i785[7], 0, i784, 'm_DisabledSprite')
  return i784
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i786 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i787 = data
  i786.m_NormalTrigger = i787[0]
  i786.m_HighlightedTrigger = i787[1]
  i786.m_PressedTrigger = i787[2]
  i786.m_SelectedTrigger = i787[3]
  i786.m_DisabledTrigger = i787[4]
  return i786
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i788 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i789 = data
  request.r(i789[0], i789[1], 0, i788, 'm_Texture')
  i788.m_UVRect = UnityEngine.Rect.MinMaxRect(i789[2], i789[3], i789[4], i789[5])
  request.r(i789[6], i789[7], 0, i788, 'm_Material')
  i788.m_Maskable = !!i789[8]
  i788.m_Color = new pc.Color(i789[9], i789[10], i789[11], i789[12])
  i788.m_RaycastTarget = !!i789[13]
  i788.m_RaycastPadding = new pc.Vec4( i789[14], i789[15], i789[16], i789[17] )
  return i788
}

Deserializers["LunaController"] = function (request, data, root) {
  var i790 = root || request.c( 'LunaController' )
  var i791 = data
  i790.YPosCTA = i791[0]
  i790.TitleText = i791[1]
  i790.TimePlay = i791[2]
  i790.Count = i791[3]
  request.r(i791[4], i791[5], 0, i790, 'Logo')
  request.r(i791[6], i791[7], 0, i790, 'CTA')
  request.r(i791[8], i791[9], 0, i790, 'title')
  request.r(i791[10], i791[11], 0, i790, 'BackgroundMusic')
  i790.Intensity = i791[12]
  request.r(i791[13], i791[14], 0, i790, 'game')
  request.r(i791[15], i791[16], 0, i790, 'hud')
  request.r(i791[17], i791[18], 0, i790, 'controls')
  var i793 = i791[19]
  var i792 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i793.length; i += 2) {
  request.r(i793[i + 0], i793[i + 1], 1, i792, '')
  }
  i790.ctaButton = i792
  request.r(i791[20], i791[21], 0, i790, 'logoImage')
  request.r(i791[22], i791[23], 0, i790, 'musicSource')
  request.r(i791[24], i791[25], 0, i790, 'tutorial')
  request.r(i791[26], i791[27], 0, i790, 'directionalLight')
  request.r(i791[28], i791[29], 0, i790, 'endCard')
  return i790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i797 = data
  i796.ambientIntensity = i797[0]
  i796.reflectionIntensity = i797[1]
  i796.ambientMode = i797[2]
  i796.ambientLight = new pc.Color(i797[3], i797[4], i797[5], i797[6])
  i796.ambientSkyColor = new pc.Color(i797[7], i797[8], i797[9], i797[10])
  i796.ambientGroundColor = new pc.Color(i797[11], i797[12], i797[13], i797[14])
  i796.ambientEquatorColor = new pc.Color(i797[15], i797[16], i797[17], i797[18])
  i796.fogColor = new pc.Color(i797[19], i797[20], i797[21], i797[22])
  i796.fogEndDistance = i797[23]
  i796.fogStartDistance = i797[24]
  i796.fogDensity = i797[25]
  i796.fog = !!i797[26]
  request.r(i797[27], i797[28], 0, i796, 'skybox')
  i796.fogMode = i797[29]
  var i799 = i797[30]
  var i798 = []
  for(var i = 0; i < i799.length; i += 1) {
    i798.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i799[i + 0]) );
  }
  i796.lightmaps = i798
  i796.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i797[31], i796.lightProbes)
  i796.lightmapsMode = i797[32]
  i796.mixedBakeMode = i797[33]
  i796.environmentLightingMode = i797[34]
  i796.ambientProbe = new pc.SphericalHarmonicsL2(i797[35])
  request.r(i797[36], i797[37], 0, i796, 'customReflection')
  request.r(i797[38], i797[39], 0, i796, 'defaultReflection')
  i796.defaultReflectionMode = i797[40]
  i796.defaultReflectionResolution = i797[41]
  i796.sunLightObjectId = i797[42]
  i796.pixelLightCount = i797[43]
  i796.defaultReflectionHDR = !!i797[44]
  i796.hasLightDataAsset = !!i797[45]
  i796.hasManualGenerate = !!i797[46]
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i803 = data
  request.r(i803[0], i803[1], 0, i802, 'lightmapColor')
  request.r(i803[2], i803[3], 0, i802, 'lightmapDirection')
  request.r(i803[4], i803[5], 0, i802, 'shadowMask')
  return i802
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i804 = root || new UnityEngine.LightProbes()
  var i805 = data
  return i804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset"] = function (request, data, root) {
  var i812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset' )
  var i813 = data
  i812.AdditionalLightsRenderingMode = i813[0]
  i812.LightRenderingMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode', i813[1], i812.LightRenderingMode)
  i812.MainLightRenderingModeValue = i813[2]
  i812.SupportsMainLightShadows = !!i813[3]
  i812.MixedLightingSupported = !!i813[4]
  i812.MainLightShadowmapResolutionValue = i813[5]
  i812.SupportsSoftShadows = !!i813[6]
  i812.SoftShadowQualityValue = i813[7]
  i812.ShadowDistance = i813[8]
  i812.ShadowCascadeCount = i813[9]
  i812.Cascade2Split = i813[10]
  i812.Cascade3Split = new pc.Vec2( i813[11], i813[12] )
  i812.Cascade4Split = new pc.Vec3( i813[13], i813[14], i813[15] )
  i812.CascadeBorder = i813[16]
  i812.ShadowDepthBias = i813[17]
  i812.ShadowNormalBias = i813[18]
  i812.RequireDepthTexture = !!i813[19]
  i812.RequireOpaqueTexture = !!i813[20]
  i812.scriptableRendererData = request.d('Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData', i813[21], i812.scriptableRendererData)
  return i812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode"] = function (request, data, root) {
  var i814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode' )
  var i815 = data
  i814.Disabled = i815[0]
  i814.PerVertex = i815[1]
  i814.PerPixel = i815[2]
  return i814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData"] = function (request, data, root) {
  var i816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData' )
  var i817 = data
  i816.opaqueLayerMask = i817[0]
  i816.transparentLayerMask = i817[1]
  var i819 = i817[2]
  var i818 = []
  for(var i = 0; i < i819.length; i += 1) {
    i818.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects', i819[i + 0]) );
  }
  i816.RenderObjectsFeatures = i818
  i816.name = i817[3]
  return i816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects"] = function (request, data, root) {
  var i822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects' )
  var i823 = data
  i822.settings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings', i823[0], i822.settings)
  i822.name = i823[1]
  i822.typeName = i823[2]
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i825 = data
  var i827 = i825[0]
  var i826 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i827.length; i += 1) {
    i826.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i827[i + 0]));
  }
  i824.ShaderCompilationErrors = i826
  i824.name = i825[1]
  i824.guid = i825[2]
  var i829 = i825[3]
  var i828 = []
  for(var i = 0; i < i829.length; i += 1) {
    i828.push( i829[i + 0] );
  }
  i824.shaderDefinedKeywords = i828
  var i831 = i825[4]
  var i830 = []
  for(var i = 0; i < i831.length; i += 1) {
    i830.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i831[i + 0]) );
  }
  i824.passes = i830
  var i833 = i825[5]
  var i832 = []
  for(var i = 0; i < i833.length; i += 1) {
    i832.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i833[i + 0]) );
  }
  i824.usePasses = i832
  var i835 = i825[6]
  var i834 = []
  for(var i = 0; i < i835.length; i += 1) {
    i834.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i835[i + 0]) );
  }
  i824.defaultParameterValues = i834
  request.r(i825[7], i825[8], 0, i824, 'unityFallbackShader')
  i824.readDepth = !!i825[9]
  i824.hasDepthOnlyPass = !!i825[10]
  i824.isCreatedByShaderGraph = !!i825[11]
  i824.disableBatching = !!i825[12]
  i824.compiled = !!i825[13]
  return i824
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i839 = data
  i838.shaderName = i839[0]
  i838.errorMessage = i839[1]
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i842 = root || new pc.UnityShaderPass()
  var i843 = data
  i842.id = i843[0]
  i842.subShaderIndex = i843[1]
  i842.name = i843[2]
  i842.passType = i843[3]
  i842.grabPassTextureName = i843[4]
  i842.usePass = !!i843[5]
  i842.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[6], i842.zTest)
  i842.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[7], i842.zWrite)
  i842.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[8], i842.culling)
  i842.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i843[9], i842.blending)
  i842.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i843[10], i842.alphaBlending)
  i842.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[11], i842.colorWriteMask)
  i842.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[12], i842.offsetUnits)
  i842.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[13], i842.offsetFactor)
  i842.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[14], i842.stencilRef)
  i842.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[15], i842.stencilReadMask)
  i842.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i843[16], i842.stencilWriteMask)
  i842.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i843[17], i842.stencilOp)
  i842.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i843[18], i842.stencilOpFront)
  i842.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i843[19], i842.stencilOpBack)
  var i845 = i843[20]
  var i844 = []
  for(var i = 0; i < i845.length; i += 1) {
    i844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i845[i + 0]) );
  }
  i842.tags = i844
  var i847 = i843[21]
  var i846 = []
  for(var i = 0; i < i847.length; i += 1) {
    i846.push( i847[i + 0] );
  }
  i842.passDefinedKeywords = i846
  var i849 = i843[22]
  var i848 = []
  for(var i = 0; i < i849.length; i += 1) {
    i848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i849[i + 0]) );
  }
  i842.passDefinedKeywordGroups = i848
  var i851 = i843[23]
  var i850 = []
  for(var i = 0; i < i851.length; i += 1) {
    i850.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i851[i + 0]) );
  }
  i842.variants = i850
  var i853 = i843[24]
  var i852 = []
  for(var i = 0; i < i853.length; i += 1) {
    i852.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i853[i + 0]) );
  }
  i842.excludedVariants = i852
  i842.hasDepthReader = !!i843[25]
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i855 = data
  i854.val = i855[0]
  i854.name = i855[1]
  return i854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i856 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i857 = data
  i856.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i857[0], i856.src)
  i856.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i857[1], i856.dst)
  i856.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i857[2], i856.op)
  return i856
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i859 = data
  i858.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i859[0], i858.pass)
  i858.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i859[1], i858.fail)
  i858.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i859[2], i858.zFail)
  i858.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i859[3], i858.comp)
  return i858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i863 = data
  i862.name = i863[0]
  i862.value = i863[1]
  return i862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i867 = data
  var i869 = i867[0]
  var i868 = []
  for(var i = 0; i < i869.length; i += 1) {
    i868.push( i869[i + 0] );
  }
  i866.keywords = i868
  i866.hasDiscard = !!i867[1]
  return i866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i873 = data
  i872.passId = i873[0]
  i872.subShaderIndex = i873[1]
  var i875 = i873[2]
  var i874 = []
  for(var i = 0; i < i875.length; i += 1) {
    i874.push( i875[i + 0] );
  }
  i872.keywords = i874
  i872.vertexProgram = i873[3]
  i872.fragmentProgram = i873[4]
  i872.exportedForWebGl2 = !!i873[5]
  i872.readDepth = !!i873[6]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i879 = data
  request.r(i879[0], i879[1], 0, i878, 'shader')
  i878.pass = i879[2]
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i883 = data
  i882.name = i883[0]
  i882.type = i883[1]
  i882.value = new pc.Vec4( i883[2], i883[3], i883[4], i883[5] )
  i882.textureValue = i883[6]
  i882.shaderPropertyFlag = i883[7]
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i884 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i885 = data
  i884.name = i885[0]
  request.r(i885[1], i885[2], 0, i884, 'texture')
  i884.aabb = i885[3]
  i884.vertices = i885[4]
  i884.triangles = i885[5]
  i884.textureRect = UnityEngine.Rect.MinMaxRect(i885[6], i885[7], i885[8], i885[9])
  i884.packedRect = UnityEngine.Rect.MinMaxRect(i885[10], i885[11], i885[12], i885[13])
  i884.border = new pc.Vec4( i885[14], i885[15], i885[16], i885[17] )
  i884.transparency = i885[18]
  i884.bounds = i885[19]
  i884.pixelsPerUnit = i885[20]
  i884.textureWidth = i885[21]
  i884.textureHeight = i885[22]
  i884.nativeSize = new pc.Vec2( i885[23], i885[24] )
  i884.pivot = new pc.Vec2( i885[25], i885[26] )
  i884.textureRectOffset = new pc.Vec2( i885[27], i885[28] )
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i887 = data
  i886.name = i887[0]
  return i886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i889 = data
  i888.name = i889[0]
  i888.wrapMode = i889[1]
  i888.isLooping = !!i889[2]
  i888.length = i889[3]
  var i891 = i889[4]
  var i890 = []
  for(var i = 0; i < i891.length; i += 1) {
    i890.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i891[i + 0]) );
  }
  i888.curves = i890
  var i893 = i889[5]
  var i892 = []
  for(var i = 0; i < i893.length; i += 1) {
    i892.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i893[i + 0]) );
  }
  i888.events = i892
  i888.halfPrecision = !!i889[6]
  i888._frameRate = i889[7]
  i888.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i889[8], i888.localBounds)
  i888.hasMuscleCurves = !!i889[9]
  var i895 = i889[10]
  var i894 = []
  for(var i = 0; i < i895.length; i += 1) {
    i894.push( i895[i + 0] );
  }
  i888.clipMuscleConstant = i894
  i888.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i889[11], i888.clipBindingConstant)
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i899 = data
  i898.path = i899[0]
  i898.hash = i899[1]
  i898.componentType = i899[2]
  i898.property = i899[3]
  i898.keys = i899[4]
  var i901 = i899[5]
  var i900 = []
  for(var i = 0; i < i901.length; i += 1) {
    i900.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i901[i + 0]) );
  }
  i898.objectReferenceKeys = i900
  return i898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i905 = data
  i904.time = i905[0]
  request.r(i905[1], i905[2], 0, i904, 'value')
  return i904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i908 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i909 = data
  i908.functionName = i909[0]
  i908.floatParameter = i909[1]
  i908.intParameter = i909[2]
  i908.stringParameter = i909[3]
  request.r(i909[4], i909[5], 0, i908, 'objectReferenceParameter')
  i908.time = i909[6]
  return i908
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i911 = data
  i910.center = new pc.Vec3( i911[0], i911[1], i911[2] )
  i910.extends = new pc.Vec3( i911[3], i911[4], i911[5] )
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i915 = data
  var i917 = i915[0]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( i917[i + 0] );
  }
  i914.genericBindings = i916
  var i919 = i915[1]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( i919[i + 0] );
  }
  i914.pptrCurveMapping = i918
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i921 = data
  i920.name = i921[0]
  i920.ascent = i921[1]
  i920.originalLineHeight = i921[2]
  i920.fontSize = i921[3]
  var i923 = i921[4]
  var i922 = []
  for(var i = 0; i < i923.length; i += 1) {
    i922.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i923[i + 0]) );
  }
  i920.characterInfo = i922
  request.r(i921[5], i921[6], 0, i920, 'texture')
  i920.originalFontSize = i921[7]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i927 = data
  i926.index = i927[0]
  i926.advance = i927[1]
  i926.bearing = i927[2]
  i926.glyphWidth = i927[3]
  i926.glyphHeight = i927[4]
  i926.minX = i927[5]
  i926.maxX = i927[6]
  i926.minY = i927[7]
  i926.maxY = i927[8]
  i926.uvBottomLeftX = i927[9]
  i926.uvBottomLeftY = i927[10]
  i926.uvBottomRightX = i927[11]
  i926.uvBottomRightY = i927[12]
  i926.uvTopLeftX = i927[13]
  i926.uvTopLeftY = i927[14]
  i926.uvTopRightX = i927[15]
  i926.uvTopRightY = i927[16]
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i929 = data
  i928.name = i929[0]
  var i931 = i929[1]
  var i930 = []
  for(var i = 0; i < i931.length; i += 1) {
    i930.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i931[i + 0]) );
  }
  i928.layers = i930
  var i933 = i929[2]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i933[i + 0]) );
  }
  i928.parameters = i932
  i928.animationClips = i929[3]
  i928.avatarUnsupported = i929[4]
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i937 = data
  i936.name = i937[0]
  i936.defaultWeight = i937[1]
  i936.blendingMode = i937[2]
  i936.avatarMask = i937[3]
  i936.syncedLayerIndex = i937[4]
  i936.syncedLayerAffectsTiming = !!i937[5]
  i936.syncedLayers = i937[6]
  i936.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i937[7], i936.stateMachine)
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i939 = data
  i938.id = i939[0]
  i938.name = i939[1]
  i938.path = i939[2]
  var i941 = i939[3]
  var i940 = []
  for(var i = 0; i < i941.length; i += 1) {
    i940.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i941[i + 0]) );
  }
  i938.states = i940
  var i943 = i939[4]
  var i942 = []
  for(var i = 0; i < i943.length; i += 1) {
    i942.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i943[i + 0]) );
  }
  i938.machines = i942
  var i945 = i939[5]
  var i944 = []
  for(var i = 0; i < i945.length; i += 1) {
    i944.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i945[i + 0]) );
  }
  i938.entryStateTransitions = i944
  var i947 = i939[6]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i947[i + 0]) );
  }
  i938.exitStateTransitions = i946
  var i949 = i939[7]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i949[i + 0]) );
  }
  i938.anyStateTransitions = i948
  i938.defaultStateId = i939[8]
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i953 = data
  i952.id = i953[0]
  i952.name = i953[1]
  i952.cycleOffset = i953[2]
  i952.cycleOffsetParameter = i953[3]
  i952.cycleOffsetParameterActive = !!i953[4]
  i952.mirror = !!i953[5]
  i952.mirrorParameter = i953[6]
  i952.mirrorParameterActive = !!i953[7]
  i952.motionId = i953[8]
  i952.nameHash = i953[9]
  i952.fullPathHash = i953[10]
  i952.speed = i953[11]
  i952.speedParameter = i953[12]
  i952.speedParameterActive = !!i953[13]
  i952.tag = i953[14]
  i952.tagHash = i953[15]
  i952.writeDefaultValues = !!i953[16]
  var i955 = i953[17]
  var i954 = []
  for(var i = 0; i < i955.length; i += 2) {
  request.r(i955[i + 0], i955[i + 1], 2, i954, '')
  }
  i952.behaviours = i954
  var i957 = i953[18]
  var i956 = []
  for(var i = 0; i < i957.length; i += 1) {
    i956.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i957[i + 0]) );
  }
  i952.transitions = i956
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i963 = data
  i962.fullPath = i963[0]
  i962.canTransitionToSelf = !!i963[1]
  i962.duration = i963[2]
  i962.exitTime = i963[3]
  i962.hasExitTime = !!i963[4]
  i962.hasFixedDuration = !!i963[5]
  i962.interruptionSource = i963[6]
  i962.offset = i963[7]
  i962.orderedInterruption = !!i963[8]
  i962.destinationStateId = i963[9]
  i962.isExit = !!i963[10]
  i962.mute = !!i963[11]
  i962.solo = !!i963[12]
  var i965 = i963[13]
  var i964 = []
  for(var i = 0; i < i965.length; i += 1) {
    i964.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i965[i + 0]) );
  }
  i962.conditions = i964
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i970 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i971 = data
  i970.destinationStateId = i971[0]
  i970.isExit = !!i971[1]
  i970.mute = !!i971[2]
  i970.solo = !!i971[3]
  var i973 = i971[4]
  var i972 = []
  for(var i = 0; i < i973.length; i += 1) {
    i972.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i973[i + 0]) );
  }
  i970.conditions = i972
  return i970
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i976 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i977 = data
  i976.defaultBool = !!i977[0]
  i976.defaultFloat = i977[1]
  i976.defaultInt = i977[2]
  i976.name = i977[3]
  i976.nameHash = i977[4]
  i976.type = i977[5]
  return i976
}

Deserializers["UnityEditor.Rendering.Universal.AssetVersion"] = function (request, data, root) {
  var i978 = root || request.c( 'UnityEditor.Rendering.Universal.AssetVersion' )
  var i979 = data
  i978.version = i979[0]
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i980 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i981 = data
  var i983 = i981[0]
  var i982 = []
  for(var i = 0; i < i983.length; i += 1) {
    i982.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i983[i + 0]) );
  }
  i980.files = i982
  i980.componentToPrefabIds = i981[1]
  return i980
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i986 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i987 = data
  i986.path = i987[0]
  request.r(i987[1], i987[2], 0, i986, 'unityObject')
  return i986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i989 = data
  var i991 = i989[0]
  var i990 = []
  for(var i = 0; i < i991.length; i += 1) {
    i990.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i991[i + 0]) );
  }
  i988.scriptsExecutionOrder = i990
  var i993 = i989[1]
  var i992 = []
  for(var i = 0; i < i993.length; i += 1) {
    i992.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i993[i + 0]) );
  }
  i988.sortingLayers = i992
  var i995 = i989[2]
  var i994 = []
  for(var i = 0; i < i995.length; i += 1) {
    i994.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i995[i + 0]) );
  }
  i988.cullingLayers = i994
  i988.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i989[3], i988.timeSettings)
  i988.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i989[4], i988.physicsSettings)
  i988.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i989[5], i988.physics2DSettings)
  i988.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i989[6], i988.qualitySettings)
  i988.enableRealtimeShadows = !!i989[7]
  i988.enableAutoInstancing = !!i989[8]
  i988.enableStaticBatching = !!i989[9]
  i988.enableDynamicBatching = !!i989[10]
  i988.usePreservativeDynamicBatching = !!i989[11]
  i988.lightmapEncodingQuality = i989[12]
  i988.desiredColorSpace = i989[13]
  var i997 = i989[14]
  var i996 = []
  for(var i = 0; i < i997.length; i += 1) {
    i996.push( i997[i + 0] );
  }
  i988.allTags = i996
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1001 = data
  i1000.name = i1001[0]
  i1000.value = i1001[1]
  return i1000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1005 = data
  i1004.id = i1005[0]
  i1004.name = i1005[1]
  i1004.value = i1005[2]
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1009 = data
  i1008.id = i1009[0]
  i1008.name = i1009[1]
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1011 = data
  i1010.fixedDeltaTime = i1011[0]
  i1010.maximumDeltaTime = i1011[1]
  i1010.timeScale = i1011[2]
  i1010.maximumParticleTimestep = i1011[3]
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1013 = data
  i1012.gravity = new pc.Vec3( i1013[0], i1013[1], i1013[2] )
  i1012.defaultSolverIterations = i1013[3]
  i1012.bounceThreshold = i1013[4]
  i1012.autoSyncTransforms = !!i1013[5]
  i1012.autoSimulation = !!i1013[6]
  var i1015 = i1013[7]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 1) {
    i1014.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1015[i + 0]) );
  }
  i1012.collisionMatrix = i1014
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1018 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1019 = data
  i1018.enabled = !!i1019[0]
  i1018.layerId = i1019[1]
  i1018.otherLayerId = i1019[2]
  return i1018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1020 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1021 = data
  request.r(i1021[0], i1021[1], 0, i1020, 'material')
  i1020.gravity = new pc.Vec2( i1021[2], i1021[3] )
  i1020.positionIterations = i1021[4]
  i1020.velocityIterations = i1021[5]
  i1020.velocityThreshold = i1021[6]
  i1020.maxLinearCorrection = i1021[7]
  i1020.maxAngularCorrection = i1021[8]
  i1020.maxTranslationSpeed = i1021[9]
  i1020.maxRotationSpeed = i1021[10]
  i1020.baumgarteScale = i1021[11]
  i1020.baumgarteTOIScale = i1021[12]
  i1020.timeToSleep = i1021[13]
  i1020.linearSleepTolerance = i1021[14]
  i1020.angularSleepTolerance = i1021[15]
  i1020.defaultContactOffset = i1021[16]
  i1020.autoSimulation = !!i1021[17]
  i1020.queriesHitTriggers = !!i1021[18]
  i1020.queriesStartInColliders = !!i1021[19]
  i1020.callbacksOnDisable = !!i1021[20]
  i1020.reuseCollisionCallbacks = !!i1021[21]
  i1020.autoSyncTransforms = !!i1021[22]
  var i1023 = i1021[23]
  var i1022 = []
  for(var i = 0; i < i1023.length; i += 1) {
    i1022.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1023[i + 0]) );
  }
  i1020.collisionMatrix = i1022
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1027 = data
  i1026.enabled = !!i1027[0]
  i1026.layerId = i1027[1]
  i1026.otherLayerId = i1027[2]
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1028 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1029 = data
  var i1031 = i1029[0]
  var i1030 = []
  for(var i = 0; i < i1031.length; i += 1) {
    i1030.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1031[i + 0]) );
  }
  i1028.qualityLevels = i1030
  var i1033 = i1029[1]
  var i1032 = []
  for(var i = 0; i < i1033.length; i += 1) {
    i1032.push( i1033[i + 0] );
  }
  i1028.names = i1032
  i1028.shadows = i1029[2]
  i1028.anisotropicFiltering = i1029[3]
  i1028.antiAliasing = i1029[4]
  i1028.lodBias = i1029[5]
  i1028.shadowCascades = i1029[6]
  i1028.shadowDistance = i1029[7]
  i1028.shadowmaskMode = i1029[8]
  i1028.shadowProjection = i1029[9]
  i1028.shadowResolution = i1029[10]
  i1028.softParticles = !!i1029[11]
  i1028.softVegetation = !!i1029[12]
  i1028.activeColorSpace = i1029[13]
  i1028.desiredColorSpace = i1029[14]
  i1028.masterTextureLimit = i1029[15]
  i1028.maxQueuedFrames = i1029[16]
  i1028.particleRaycastBudget = i1029[17]
  i1028.pixelLightCount = i1029[18]
  i1028.realtimeReflectionProbes = !!i1029[19]
  i1028.shadowCascade2Split = i1029[20]
  i1028.shadowCascade4Split = new pc.Vec3( i1029[21], i1029[22], i1029[23] )
  i1028.streamingMipmapsActive = !!i1029[24]
  i1028.vSyncCount = i1029[25]
  i1028.asyncUploadBufferSize = i1029[26]
  i1028.asyncUploadTimeSlice = i1029[27]
  i1028.billboardsFaceCameraPosition = !!i1029[28]
  i1028.shadowNearPlaneOffset = i1029[29]
  i1028.streamingMipmapsMemoryBudget = i1029[30]
  i1028.maximumLODLevel = i1029[31]
  i1028.streamingMipmapsAddAllCameras = !!i1029[32]
  i1028.streamingMipmapsMaxLevelReduction = i1029[33]
  i1028.streamingMipmapsRenderersPerFrame = i1029[34]
  i1028.resolutionScalingFixedDPIFactor = i1029[35]
  i1028.streamingMipmapsMaxFileIORequests = i1029[36]
  i1028.currentQualityLevel = i1029[37]
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i1036 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i1037 = data
  i1036.name = i1037[0]
  var i1039 = i1037[1]
  var i1038 = []
  for(var i = 0; i < i1039.length; i += 1) {
    i1038.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i1039[i + 0]) );
  }
  i1036.tos = i1038
  var i1041 = i1037[2]
  var i1040 = []
  for(var i = 0; i < i1041.length; i += 1) {
    i1040.push( i1041[i + 0] );
  }
  i1036.constant = i1040
  i1036.isValid = !!i1037[3]
  i1036.isHuman = !!i1037[4]
  i1036.hasRootMotion = !!i1037[5]
  return i1036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i1044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i1045 = data
  i1044.hash = i1045[0]
  i1044.path = i1045[1]
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1049 = data
  i1048.weight = i1049[0]
  i1048.vertices = i1049[1]
  i1048.normals = i1049[2]
  i1048.tangents = i1049[3]
  return i1048
}

Deserializers["BuildBlock"] = function (request, data, root) {
  var i1052 = root || request.c( 'BuildBlock' )
  var i1053 = data
  i1052.type = i1053[0]
  i1052.localPosition = new pc.Vec3( i1053[1], i1053[2], i1053[3] )
  request.r(i1053[4], i1053[5], 0, i1052, 'prefab')
  i1052.localRotation = new pc.Quat(i1053[6], i1053[7], i1053[8], i1053[9])
  i1052.hasCustomBounds = !!i1053[10]
  i1052.visualStyle = i1053[11]
  i1052.replacementKey = i1053[12]
  i1052.color = new pc.Color(i1053[13], i1053[14], i1053[15], i1053[16])
  return i1052
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1054 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1055 = data
  request.r(i1055[0], i1055[1], 0, i1054, 'm_ObjectArgument')
  i1054.m_ObjectArgumentAssemblyTypeName = i1055[2]
  i1054.m_IntArgument = i1055[3]
  i1054.m_FloatArgument = i1055[4]
  i1054.m_StringArgument = i1055[5]
  i1054.m_BoolArgument = !!i1055[6]
  return i1054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings"] = function (request, data, root) {
  var i1056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings' )
  var i1057 = data
  i1056.Event = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1057[0], i1056.Event)
  i1056.filterSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings', i1057[1], i1056.filterSettings)
  i1056.overrideMaterialId = i1057[2]
  i1056.overrideMaterialPassIndex = i1057[3]
  i1056.overrideShaderId = i1057[4]
  i1056.overrideShaderPassIndex = i1057[5]
  i1056.overrideMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1057[6], i1056.overrideMode)
  i1056.overrideDepthState = !!i1057[7]
  i1056.depthCompareFunction = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1057[8], i1056.depthCompareFunction)
  i1056.enableWrite = !!i1057[9]
  i1056.stencilSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.StencilStateData', i1057[10], i1056.stencilSettings)
  i1056.cameraSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings', i1057[11], i1056.cameraSettings)
  return i1056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1061 = data
  i1060.mode = i1061[0]
  i1060.parameter = i1061[1]
  i1060.threshold = i1061[2]
  return i1060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.EnumDescription"] = function (request, data, root) {
  var i1062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.EnumDescription' )
  var i1063 = data
  i1062.Value = i1063[0]
  return i1062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings"] = function (request, data, root) {
  var i1064 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings' )
  var i1065 = data
  i1064.RenderQueueType = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1065[0], i1064.RenderQueueType)
  i1064.LayerMask = i1065[1]
  var i1067 = i1065[2]
  var i1066 = []
  for(var i = 0; i < i1067.length; i += 1) {
    i1066.push( i1067[i + 0] );
  }
  i1064.PassNames = i1066
  return i1064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.StencilStateData"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.StencilStateData' )
  var i1069 = data
  i1068.overrideStencilState = !!i1069[0]
  i1068.stencilReference = i1069[1]
  i1068.stencilCompareFunctionValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1069[2], i1068.stencilCompareFunctionValue)
  i1068.passOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1069[3], i1068.passOperationValue)
  i1068.failOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1069[4], i1068.failOperationValue)
  i1068.zFailOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i1069[5], i1068.zFailOperationValue)
  return i1068
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings"] = function (request, data, root) {
  var i1070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings' )
  var i1071 = data
  i1070.overrideCamera = !!i1071[0]
  i1070.restoreCamera = !!i1071[1]
  i1070.offset = new pc.Vec4( i1071[2], i1071[3], i1071[4], i1071[5] )
  i1070.cameraFieldOfView = i1071[6]
  return i1070
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Textures.RenderTexture":{"name":0,"width":1,"height":2,"anisoLevel":3,"filterMode":4,"hdr":5,"colorFormat":6,"depthStencilFormat":7,"renderTextureFormat":8,"depth":9,"wrapU":10,"wrapV":11},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset":{"AdditionalLightsRenderingMode":0,"LightRenderingMode":1,"MainLightRenderingModeValue":2,"SupportsMainLightShadows":3,"MixedLightingSupported":4,"MainLightShadowmapResolutionValue":5,"SupportsSoftShadows":6,"SoftShadowQualityValue":7,"ShadowDistance":8,"ShadowCascadeCount":9,"Cascade2Split":10,"Cascade3Split":11,"Cascade4Split":13,"CascadeBorder":16,"ShadowDepthBias":17,"ShadowNormalBias":18,"RequireDepthTexture":19,"RequireOpaqueTexture":20,"scriptableRendererData":21},"Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode":{"Disabled":0,"PerVertex":1,"PerPixel":2},"Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData":{"opaqueLayerMask":0,"transparentLayerMask":1,"RenderObjectsFeatures":2,"name":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects":{"settings":0,"name":1,"typeName":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings":{"Event":0,"filterSettings":1,"overrideMaterialId":2,"overrideMaterialPassIndex":3,"overrideShaderId":4,"overrideShaderPassIndex":5,"overrideMode":6,"overrideDepthState":7,"depthCompareFunction":8,"enableWrite":9,"stencilSettings":10,"cameraSettings":11},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Assets.EnumDescription":{"Value":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings":{"RenderQueueType":0,"LayerMask":1,"PassNames":2},"Luna.Unity.DTO.UnityEngine.Assets.StencilStateData":{"overrideStencilState":0,"stencilReference":1,"stencilCompareFunctionValue":2,"passOperationValue":3,"failOperationValue":4,"zFailOperationValue":5},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings":{"overrideCamera":0,"restoreCamera":1,"offset":2,"cameraFieldOfView":6}}

Deserializers.requiredComponents = {"54":[55],"56":[55],"57":[55],"58":[55],"59":[55],"60":[55],"61":[7],"62":[14],"63":[64],"65":[64],"66":[64],"67":[64],"68":[64],"69":[64],"70":[71],"72":[71],"73":[71],"74":[71],"75":[71],"76":[71],"77":[71],"78":[71],"79":[71],"80":[71],"81":[71],"82":[71],"83":[71],"84":[14],"85":[12],"86":[87],"88":[87],"39":[31],"89":[31],"90":[14],"16":[14],"21":[20],"91":[31],"92":[41,31],"93":[12],"94":[41,31],"95":[31],"96":[31],"97":[12,31],"98":[31,41],"99":[100],"101":[100],"102":[100],"103":[31],"104":[31],"48":[39],"33":[41,31],"105":[31],"40":[39],"106":[31],"107":[31],"108":[31],"109":[31],"110":[31],"111":[31],"112":[31],"113":[31],"114":[31],"50":[41,31],"115":[31],"116":[31],"117":[31],"118":[31],"32":[41,31],"119":[31],"120":[18],"121":[18],"19":[18],"122":[18],"123":[14],"124":[14]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.Avatar","UnityEngine.MonoBehaviour","BuildPlayerVisual","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Material","UnityEngine.Texture2D","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","UnityEngine.RenderTexture","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","PointLightReflectionExclusion","GameController","BuildCameraController","AdjacentBlockPreviews","BuildCompleteFireworks","BuildCollisionWorld","BuildTouchControls","BuildBlockPlacer","BuildProgressUI","UnityEngine.RectTransform","UnityEngine.UI.Text","UnityEngine.UI.Image","GameplayMaterials","AudioController","UnityEngine.AudioSource","UnityEngine.AudioClip","WetGroundReflection","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.CanvasRenderer","UnityEngine.Sprite","UnityEngine.Font","UnityEngine.CanvasGroup","BuildTapTutorial","UnityEngine.BoxCollider","UnityEngine.GameObject","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Button","UnityEngine.UI.RawImage","LunaController","UnityEngine.Cubemap","UnityEditor.Rendering.Universal.AssetVersion","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Rendering.UI.UIFoldout","UnityEngine.Rendering.Universal.PixelPerfectCamera","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CEBB_V13";

Deserializers.lunaInitializationTime = "10/23/2026 02:35:11";

Deserializers.lunaDaysRunning = "3.2";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_TamNTM_CEBB_V14_NgocNDL";

Deserializers.lunaAppID = "35800";

Deserializers.projectId = "06662f774512a074681e03425222bbcd";

Deserializers.packagesInfo = "com.unity.render-pipelines.universal: 17.0.4\ncom.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1702";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4406";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system, reflection";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "True";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.CEBB_V13";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "b828d5be-12b4-4490-81e4-6dc8ea9ca888";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

