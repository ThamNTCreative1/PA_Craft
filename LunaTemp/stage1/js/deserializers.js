var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i838 = root || request.c( 'UnityEngine.JointSpring' )
  var i839 = data
  i838.spring = i839[0]
  i838.damper = i839[1]
  i838.targetPosition = i839[2]
  return i838
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.JointMotor' )
  var i841 = data
  i840.m_TargetVelocity = i841[0]
  i840.m_Force = i841[1]
  i840.m_FreeSpin = i841[2]
  return i840
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.JointLimits' )
  var i843 = data
  i842.m_Min = i843[0]
  i842.m_Max = i843[1]
  i842.m_Bounciness = i843[2]
  i842.m_BounceMinVelocity = i843[3]
  i842.m_ContactDistance = i843[4]
  i842.minBounce = i843[5]
  i842.maxBounce = i843[6]
  return i842
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i844 = root || request.c( 'UnityEngine.JointDrive' )
  var i845 = data
  i844.m_PositionSpring = i845[0]
  i844.m_PositionDamper = i845[1]
  i844.m_MaximumForce = i845[2]
  i844.m_UseAcceleration = i845[3]
  return i844
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i846 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i847 = data
  i846.m_Spring = i847[0]
  i846.m_Damper = i847[1]
  return i846
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i848 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i849 = data
  i848.m_Limit = i849[0]
  i848.m_Bounciness = i849[1]
  i848.m_ContactDistance = i849[2]
  return i848
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i850 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i851 = data
  i850.m_ExtremumSlip = i851[0]
  i850.m_ExtremumValue = i851[1]
  i850.m_AsymptoteSlip = i851[2]
  i850.m_AsymptoteValue = i851[3]
  i850.m_Stiffness = i851[4]
  return i850
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i852 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i853 = data
  i852.m_LowerAngle = i853[0]
  i852.m_UpperAngle = i853[1]
  return i852
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i854 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i855 = data
  i854.m_MotorSpeed = i855[0]
  i854.m_MaximumMotorTorque = i855[1]
  return i854
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i856 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i857 = data
  i856.m_DampingRatio = i857[0]
  i856.m_Frequency = i857[1]
  i856.m_Angle = i857[2]
  return i856
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i858 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i859 = data
  i858.m_LowerTranslation = i859[0]
  i858.m_UpperTranslation = i859[1]
  return i858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i861 = data
  i860.name = i861[0]
  i860.halfPrecision = !!i861[1]
  i860.useSimplification = !!i861[2]
  i860.useUInt32IndexFormat = !!i861[3]
  i860.vertexCount = i861[4]
  i860.aabb = i861[5]
  var i863 = i861[6]
  var i862 = []
  for(var i = 0; i < i863.length; i += 1) {
    i862.push( !!i863[i + 0] );
  }
  i860.streams = i862
  i860.vertices = i861[7]
  var i865 = i861[8]
  var i864 = []
  for(var i = 0; i < i865.length; i += 1) {
    i864.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i865[i + 0]) );
  }
  i860.subMeshes = i864
  var i867 = i861[9]
  var i866 = []
  for(var i = 0; i < i867.length; i += 16) {
    i866.push( new pc.Mat4().setData(i867[i + 0], i867[i + 1], i867[i + 2], i867[i + 3],  i867[i + 4], i867[i + 5], i867[i + 6], i867[i + 7],  i867[i + 8], i867[i + 9], i867[i + 10], i867[i + 11],  i867[i + 12], i867[i + 13], i867[i + 14], i867[i + 15]) );
  }
  i860.bindposes = i866
  var i869 = i861[10]
  var i868 = []
  for(var i = 0; i < i869.length; i += 1) {
    i868.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i869[i + 0]) );
  }
  i860.blendShapes = i868
  return i860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i875 = data
  i874.triangles = i875[0]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i881 = data
  i880.name = i881[0]
  var i883 = i881[1]
  var i882 = []
  for(var i = 0; i < i883.length; i += 1) {
    i882.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i883[i + 0]) );
  }
  i880.frames = i882
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i884 = root || new pc.UnityMaterial()
  var i885 = data
  i884.name = i885[0]
  request.r(i885[1], i885[2], 0, i884, 'shader')
  i884.renderQueue = i885[3]
  i884.enableInstancing = !!i885[4]
  var i887 = i885[5]
  var i886 = []
  for(var i = 0; i < i887.length; i += 1) {
    i886.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i887[i + 0]) );
  }
  i884.floatParameters = i886
  var i889 = i885[6]
  var i888 = []
  for(var i = 0; i < i889.length; i += 1) {
    i888.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i889[i + 0]) );
  }
  i884.colorParameters = i888
  var i891 = i885[7]
  var i890 = []
  for(var i = 0; i < i891.length; i += 1) {
    i890.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i891[i + 0]) );
  }
  i884.vectorParameters = i890
  var i893 = i885[8]
  var i892 = []
  for(var i = 0; i < i893.length; i += 1) {
    i892.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i893[i + 0]) );
  }
  i884.textureParameters = i892
  var i895 = i885[9]
  var i894 = []
  for(var i = 0; i < i895.length; i += 1) {
    i894.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i895[i + 0]) );
  }
  i884.materialFlags = i894
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i899 = data
  i898.name = i899[0]
  i898.value = i899[1]
  return i898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i903 = data
  i902.name = i903[0]
  i902.value = new pc.Color(i903[1], i903[2], i903[3], i903[4])
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i907 = data
  i906.name = i907[0]
  i906.value = new pc.Vec4( i907[1], i907[2], i907[3], i907[4] )
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i911 = data
  i910.name = i911[0]
  request.r(i911[1], i911[2], 0, i910, 'value')
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i915 = data
  i914.name = i915[0]
  i914.enabled = !!i915[1]
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i916 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i917 = data
  i916.name = i917[0]
  i916.width = i917[1]
  i916.height = i917[2]
  i916.mipmapCount = i917[3]
  i916.anisoLevel = i917[4]
  i916.filterMode = i917[5]
  i916.hdr = !!i917[6]
  i916.format = i917[7]
  i916.wrapMode = i917[8]
  i916.alphaIsTransparency = !!i917[9]
  i916.alphaSource = i917[10]
  i916.graphicsFormat = i917[11]
  i916.sRGBTexture = !!i917[12]
  i916.desiredColorSpace = i917[13]
  i916.wrapU = i917[14]
  i916.wrapV = i917[15]
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i918 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i919 = data
  i918.position = new pc.Vec3( i919[0], i919[1], i919[2] )
  i918.scale = new pc.Vec3( i919[3], i919[4], i919[5] )
  i918.rotation = new pc.Quat(i919[6], i919[7], i919[8], i919[9])
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i921 = data
  i920.mass = i921[0]
  i920.drag = i921[1]
  i920.angularDrag = i921[2]
  i920.useGravity = !!i921[3]
  i920.isKinematic = !!i921[4]
  i920.constraints = i921[5]
  i920.maxAngularVelocity = i921[6]
  i920.collisionDetectionMode = i921[7]
  i920.interpolation = i921[8]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i923 = data
  i922.center = new pc.Vec3( i923[0], i923[1], i923[2] )
  i922.radius = i923[3]
  i922.height = i923[4]
  i922.direction = i923[5]
  i922.enabled = !!i923[6]
  i922.isTrigger = !!i923[7]
  request.r(i923[8], i923[9], 0, i922, 'material')
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i925 = data
  request.r(i925[0], i925[1], 0, i924, 'animatorController')
  request.r(i925[2], i925[3], 0, i924, 'avatar')
  i924.updateMode = i925[4]
  i924.hasTransformHierarchy = !!i925[5]
  i924.applyRootMotion = !!i925[6]
  var i927 = i925[7]
  var i926 = []
  for(var i = 0; i < i927.length; i += 2) {
  request.r(i927[i + 0], i927[i + 1], 2, i926, '')
  }
  i924.humanBones = i926
  i924.enabled = !!i925[8]
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i931 = data
  i930.name = i931[0]
  i930.tagId = i931[1]
  i930.enabled = !!i931[2]
  i930.isStatic = !!i931[3]
  i930.layer = i931[4]
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i933 = data
  request.r(i933[0], i933[1], 0, i932, 'sharedMesh')
  var i935 = i933[2]
  var i934 = []
  for(var i = 0; i < i935.length; i += 2) {
  request.r(i935[i + 0], i935[i + 1], 2, i934, '')
  }
  i932.bones = i934
  i932.updateWhenOffscreen = !!i933[3]
  i932.localBounds = i933[4]
  request.r(i933[5], i933[6], 0, i932, 'rootBone')
  var i937 = i933[7]
  var i936 = []
  for(var i = 0; i < i937.length; i += 1) {
    i936.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i937[i + 0]) );
  }
  i932.blendShapesWeights = i936
  i932.enabled = !!i933[8]
  request.r(i933[9], i933[10], 0, i932, 'sharedMaterial')
  var i939 = i933[11]
  var i938 = []
  for(var i = 0; i < i939.length; i += 2) {
  request.r(i939[i + 0], i939[i + 1], 2, i938, '')
  }
  i932.sharedMaterials = i938
  i932.receiveShadows = !!i933[12]
  i932.shadowCastingMode = i933[13]
  i932.sortingLayerID = i933[14]
  i932.sortingOrder = i933[15]
  i932.lightmapIndex = i933[16]
  i932.lightmapSceneIndex = i933[17]
  i932.lightmapScaleOffset = new pc.Vec4( i933[18], i933[19], i933[20], i933[21] )
  i932.lightProbeUsage = i933[22]
  i932.reflectionProbeUsage = i933[23]
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i943 = data
  i942.weight = i943[0]
  return i942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i947 = data
  i946.pivot = new pc.Vec2( i947[0], i947[1] )
  i946.anchorMin = new pc.Vec2( i947[2], i947[3] )
  i946.anchorMax = new pc.Vec2( i947[4], i947[5] )
  i946.sizeDelta = new pc.Vec2( i947[6], i947[7] )
  i946.anchoredPosition3D = new pc.Vec3( i947[8], i947[9], i947[10] )
  i946.rotation = new pc.Quat(i947[11], i947[12], i947[13], i947[14])
  i946.scale = new pc.Vec3( i947[15], i947[16], i947[17] )
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i949 = data
  request.r(i949[0], i949[1], 0, i948, 'additionalVertexStreams')
  i948.enabled = !!i949[2]
  request.r(i949[3], i949[4], 0, i948, 'sharedMaterial')
  var i951 = i949[5]
  var i950 = []
  for(var i = 0; i < i951.length; i += 2) {
  request.r(i951[i + 0], i951[i + 1], 2, i950, '')
  }
  i948.sharedMaterials = i950
  i948.receiveShadows = !!i949[6]
  i948.shadowCastingMode = i949[7]
  i948.sortingLayerID = i949[8]
  i948.sortingOrder = i949[9]
  i948.lightmapIndex = i949[10]
  i948.lightmapSceneIndex = i949[11]
  i948.lightmapScaleOffset = new pc.Vec4( i949[12], i949[13], i949[14], i949[15] )
  i948.lightProbeUsage = i949[16]
  i948.reflectionProbeUsage = i949[17]
  return i948
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i952 = root || request.c( 'TMPro.TextMeshPro' )
  var i953 = data
  i952._SortingLayer = i953[0]
  i952._SortingLayerID = i953[1]
  i952._SortingOrder = i953[2]
  i952.m_hasFontAssetChanged = !!i953[3]
  request.r(i953[4], i953[5], 0, i952, 'm_renderer')
  i952.m_maskType = i953[6]
  i952.m_text = i953[7]
  i952.m_isRightToLeft = !!i953[8]
  request.r(i953[9], i953[10], 0, i952, 'm_fontAsset')
  request.r(i953[11], i953[12], 0, i952, 'm_sharedMaterial')
  var i955 = i953[13]
  var i954 = []
  for(var i = 0; i < i955.length; i += 2) {
  request.r(i955[i + 0], i955[i + 1], 2, i954, '')
  }
  i952.m_fontSharedMaterials = i954
  request.r(i953[14], i953[15], 0, i952, 'm_fontMaterial')
  var i957 = i953[16]
  var i956 = []
  for(var i = 0; i < i957.length; i += 2) {
  request.r(i957[i + 0], i957[i + 1], 2, i956, '')
  }
  i952.m_fontMaterials = i956
  i952.m_fontColor32 = UnityEngine.Color32.ConstructColor(i953[17], i953[18], i953[19], i953[20])
  i952.m_fontColor = new pc.Color(i953[21], i953[22], i953[23], i953[24])
  i952.m_enableVertexGradient = !!i953[25]
  i952.m_colorMode = i953[26]
  i952.m_fontColorGradient = request.d('TMPro.VertexGradient', i953[27], i952.m_fontColorGradient)
  request.r(i953[28], i953[29], 0, i952, 'm_fontColorGradientPreset')
  request.r(i953[30], i953[31], 0, i952, 'm_spriteAsset')
  i952.m_tintAllSprites = !!i953[32]
  request.r(i953[33], i953[34], 0, i952, 'm_StyleSheet')
  i952.m_TextStyleHashCode = i953[35]
  i952.m_overrideHtmlColors = !!i953[36]
  i952.m_faceColor = UnityEngine.Color32.ConstructColor(i953[37], i953[38], i953[39], i953[40])
  i952.m_fontSize = i953[41]
  i952.m_fontSizeBase = i953[42]
  i952.m_fontWeight = i953[43]
  i952.m_enableAutoSizing = !!i953[44]
  i952.m_fontSizeMin = i953[45]
  i952.m_fontSizeMax = i953[46]
  i952.m_fontStyle = i953[47]
  i952.m_HorizontalAlignment = i953[48]
  i952.m_VerticalAlignment = i953[49]
  i952.m_textAlignment = i953[50]
  i952.m_characterSpacing = i953[51]
  i952.m_characterHorizontalScale = i953[52]
  i952.m_wordSpacing = i953[53]
  i952.m_lineSpacing = i953[54]
  i952.m_lineSpacingMax = i953[55]
  i952.m_paragraphSpacing = i953[56]
  i952.m_charWidthMaxAdj = i953[57]
  i952.m_TextWrappingMode = i953[58]
  i952.m_wordWrappingRatios = i953[59]
  i952.m_overflowMode = i953[60]
  request.r(i953[61], i953[62], 0, i952, 'm_linkedTextComponent')
  request.r(i953[63], i953[64], 0, i952, 'parentLinkedComponent')
  i952.m_enableKerning = !!i953[65]
  var i959 = i953[66]
  var i958 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i959.length; i += 1) {
    i958.add(i959[i + 0]);
  }
  i952.m_ActiveFontFeatures = i958
  i952.m_enableExtraPadding = !!i953[67]
  i952.checkPaddingRequired = !!i953[68]
  i952.m_isRichText = !!i953[69]
  i952.m_parseCtrlCharacters = !!i953[70]
  i952.m_isOrthographic = !!i953[71]
  i952.m_isCullingEnabled = !!i953[72]
  i952.m_horizontalMapping = i953[73]
  i952.m_verticalMapping = i953[74]
  i952.m_uvLineOffset = i953[75]
  i952.m_geometrySortingOrder = i953[76]
  i952.m_IsTextObjectScaleStatic = !!i953[77]
  i952.m_VertexBufferAutoSizeReduction = !!i953[78]
  i952.m_useMaxVisibleDescender = !!i953[79]
  i952.m_pageToDisplay = i953[80]
  i952.m_margin = new pc.Vec4( i953[81], i953[82], i953[83], i953[84] )
  i952.m_isUsingLegacyAnimationComponent = !!i953[85]
  i952.m_isVolumetricText = !!i953[86]
  request.r(i953[87], i953[88], 0, i952, 'm_Material')
  i952.m_EmojiFallbackSupport = !!i953[89]
  i952.m_Maskable = !!i953[90]
  i952.m_Color = new pc.Color(i953[91], i953[92], i953[93], i953[94])
  i952.m_RaycastTarget = !!i953[95]
  i952.m_RaycastPadding = new pc.Vec4( i953[96], i953[97], i953[98], i953[99] )
  return i952
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i960 = root || request.c( 'TMPro.VertexGradient' )
  var i961 = data
  i960.topLeft = new pc.Color(i961[0], i961[1], i961[2], i961[3])
  i960.topRight = new pc.Color(i961[4], i961[5], i961[6], i961[7])
  i960.bottomLeft = new pc.Color(i961[8], i961[9], i961[10], i961[11])
  i960.bottomRight = new pc.Color(i961[12], i961[13], i961[14], i961[15])
  return i960
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i965 = data
  var i967 = i965[0]
  var i966 = []
  for(var i = 0; i < i967.length; i += 3) {
    i966.push( new pc.Vec3( i967[i + 0], i967[i + 1], i967[i + 2] ) );
  }
  i964.positions = i966
  i964.positionCount = i965[1]
  i964.time = i965[2]
  i964.startWidth = i965[3]
  i964.endWidth = i965[4]
  i964.widthMultiplier = i965[5]
  i964.autodestruct = !!i965[6]
  i964.emitting = !!i965[7]
  i964.numCornerVertices = i965[8]
  i964.numCapVertices = i965[9]
  i964.minVertexDistance = i965[10]
  i964.colorGradient = i965[11] ? new pc.ColorGradient(i965[11][0], i965[11][1], i965[11][2]) : null
  i964.startColor = new pc.Color(i965[12], i965[13], i965[14], i965[15])
  i964.endColor = new pc.Color(i965[16], i965[17], i965[18], i965[19])
  i964.generateLightingData = !!i965[20]
  i964.textureMode = i965[21]
  i964.alignment = i965[22]
  i964.widthCurve = new pc.AnimationCurve( { keys_flow: i965[23] } )
  i964.enabled = !!i965[24]
  request.r(i965[25], i965[26], 0, i964, 'sharedMaterial')
  var i969 = i965[27]
  var i968 = []
  for(var i = 0; i < i969.length; i += 2) {
  request.r(i969[i + 0], i969[i + 1], 2, i968, '')
  }
  i964.sharedMaterials = i968
  i964.receiveShadows = !!i965[28]
  i964.shadowCastingMode = i965[29]
  i964.sortingLayerID = i965[30]
  i964.sortingOrder = i965[31]
  i964.lightmapIndex = i965[32]
  i964.lightmapSceneIndex = i965[33]
  i964.lightmapScaleOffset = new pc.Vec4( i965[34], i965[35], i965[36], i965[37] )
  i964.lightProbeUsage = i965[38]
  i964.reflectionProbeUsage = i965[39]
  return i964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i973 = data
  i972.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i973[0], i972.main)
  i972.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i973[1], i972.colorBySpeed)
  i972.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i973[2], i972.colorOverLifetime)
  i972.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i973[3], i972.emission)
  i972.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i973[4], i972.rotationBySpeed)
  i972.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i973[5], i972.rotationOverLifetime)
  i972.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i973[6], i972.shape)
  i972.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i973[7], i972.sizeBySpeed)
  i972.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i973[8], i972.sizeOverLifetime)
  i972.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i973[9], i972.textureSheetAnimation)
  i972.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i973[10], i972.velocityOverLifetime)
  i972.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i973[11], i972.noise)
  i972.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i973[12], i972.inheritVelocity)
  i972.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i973[13], i972.forceOverLifetime)
  i972.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i973[14], i972.limitVelocityOverLifetime)
  i972.useAutoRandomSeed = !!i973[15]
  i972.randomSeed = i973[16]
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i974 = root || new pc.ParticleSystemMain()
  var i975 = data
  i974.duration = i975[0]
  i974.loop = !!i975[1]
  i974.prewarm = !!i975[2]
  i974.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[3], i974.startDelay)
  i974.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[4], i974.startLifetime)
  i974.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[5], i974.startSpeed)
  i974.startSize3D = !!i975[6]
  i974.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[7], i974.startSizeX)
  i974.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[8], i974.startSizeY)
  i974.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[9], i974.startSizeZ)
  i974.startRotation3D = !!i975[10]
  i974.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[11], i974.startRotationX)
  i974.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[12], i974.startRotationY)
  i974.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[13], i974.startRotationZ)
  i974.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i975[14], i974.startColor)
  i974.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i975[15], i974.gravityModifier)
  i974.simulationSpace = i975[16]
  request.r(i975[17], i975[18], 0, i974, 'customSimulationSpace')
  i974.simulationSpeed = i975[19]
  i974.useUnscaledTime = !!i975[20]
  i974.scalingMode = i975[21]
  i974.playOnAwake = !!i975[22]
  i974.maxParticles = i975[23]
  i974.emitterVelocityMode = i975[24]
  i974.stopAction = i975[25]
  return i974
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i976 = root || new pc.MinMaxCurve()
  var i977 = data
  i976.mode = i977[0]
  i976.curveMin = new pc.AnimationCurve( { keys_flow: i977[1] } )
  i976.curveMax = new pc.AnimationCurve( { keys_flow: i977[2] } )
  i976.curveMultiplier = i977[3]
  i976.constantMin = i977[4]
  i976.constantMax = i977[5]
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i978 = root || new pc.MinMaxGradient()
  var i979 = data
  i978.mode = i979[0]
  i978.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i979[1], i978.gradientMin)
  i978.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i979[2], i978.gradientMax)
  i978.colorMin = new pc.Color(i979[3], i979[4], i979[5], i979[6])
  i978.colorMax = new pc.Color(i979[7], i979[8], i979[9], i979[10])
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i980 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i981 = data
  i980.mode = i981[0]
  var i983 = i981[1]
  var i982 = []
  for(var i = 0; i < i983.length; i += 1) {
    i982.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i983[i + 0]) );
  }
  i980.colorKeys = i982
  var i985 = i981[2]
  var i984 = []
  for(var i = 0; i < i985.length; i += 1) {
    i984.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i985[i + 0]) );
  }
  i980.alphaKeys = i984
  return i980
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i986 = root || new pc.ParticleSystemColorBySpeed()
  var i987 = data
  i986.enabled = !!i987[0]
  i986.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i987[1], i986.color)
  i986.range = new pc.Vec2( i987[2], i987[3] )
  return i986
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i991 = data
  i990.color = new pc.Color(i991[0], i991[1], i991[2], i991[3])
  i990.time = i991[4]
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i995 = data
  i994.alpha = i995[0]
  i994.time = i995[1]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i996 = root || new pc.ParticleSystemColorOverLifetime()
  var i997 = data
  i996.enabled = !!i997[0]
  i996.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i997[1], i996.color)
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i998 = root || new pc.ParticleSystemEmitter()
  var i999 = data
  i998.enabled = !!i999[0]
  i998.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i999[1], i998.rateOverTime)
  i998.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i999[2], i998.rateOverDistance)
  var i1001 = i999[3]
  var i1000 = []
  for(var i = 0; i < i1001.length; i += 1) {
    i1000.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1001[i + 0]) );
  }
  i998.bursts = i1000
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1004 = root || new pc.ParticleSystemBurst()
  var i1005 = data
  i1004.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1005[0], i1004.count)
  i1004.cycleCount = i1005[1]
  i1004.minCount = i1005[2]
  i1004.maxCount = i1005[3]
  i1004.repeatInterval = i1005[4]
  i1004.time = i1005[5]
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1006 = root || new pc.ParticleSystemRotationBySpeed()
  var i1007 = data
  i1006.enabled = !!i1007[0]
  i1006.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1007[1], i1006.x)
  i1006.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1007[2], i1006.y)
  i1006.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1007[3], i1006.z)
  i1006.separateAxes = !!i1007[4]
  i1006.range = new pc.Vec2( i1007[5], i1007[6] )
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1008 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1009 = data
  i1008.enabled = !!i1009[0]
  i1008.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1009[1], i1008.x)
  i1008.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1009[2], i1008.y)
  i1008.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1009[3], i1008.z)
  i1008.separateAxes = !!i1009[4]
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1010 = root || new pc.ParticleSystemShape()
  var i1011 = data
  i1010.enabled = !!i1011[0]
  i1010.shapeType = i1011[1]
  i1010.randomDirectionAmount = i1011[2]
  i1010.sphericalDirectionAmount = i1011[3]
  i1010.randomPositionAmount = i1011[4]
  i1010.alignToDirection = !!i1011[5]
  i1010.radius = i1011[6]
  i1010.radiusMode = i1011[7]
  i1010.radiusSpread = i1011[8]
  i1010.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[9], i1010.radiusSpeed)
  i1010.radiusThickness = i1011[10]
  i1010.angle = i1011[11]
  i1010.length = i1011[12]
  i1010.boxThickness = new pc.Vec3( i1011[13], i1011[14], i1011[15] )
  i1010.meshShapeType = i1011[16]
  request.r(i1011[17], i1011[18], 0, i1010, 'mesh')
  request.r(i1011[19], i1011[20], 0, i1010, 'meshRenderer')
  request.r(i1011[21], i1011[22], 0, i1010, 'skinnedMeshRenderer')
  i1010.useMeshMaterialIndex = !!i1011[23]
  i1010.meshMaterialIndex = i1011[24]
  i1010.useMeshColors = !!i1011[25]
  i1010.normalOffset = i1011[26]
  i1010.arc = i1011[27]
  i1010.arcMode = i1011[28]
  i1010.arcSpread = i1011[29]
  i1010.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[30], i1010.arcSpeed)
  i1010.donutRadius = i1011[31]
  i1010.position = new pc.Vec3( i1011[32], i1011[33], i1011[34] )
  i1010.rotation = new pc.Vec3( i1011[35], i1011[36], i1011[37] )
  i1010.scale = new pc.Vec3( i1011[38], i1011[39], i1011[40] )
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1012 = root || new pc.ParticleSystemSizeBySpeed()
  var i1013 = data
  i1012.enabled = !!i1013[0]
  i1012.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1013[1], i1012.x)
  i1012.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1013[2], i1012.y)
  i1012.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1013[3], i1012.z)
  i1012.separateAxes = !!i1013[4]
  i1012.range = new pc.Vec2( i1013[5], i1013[6] )
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1014 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1015 = data
  i1014.enabled = !!i1015[0]
  i1014.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[1], i1014.x)
  i1014.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[2], i1014.y)
  i1014.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[3], i1014.z)
  i1014.separateAxes = !!i1015[4]
  return i1014
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1016 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1017 = data
  i1016.enabled = !!i1017[0]
  i1016.mode = i1017[1]
  i1016.animation = i1017[2]
  i1016.numTilesX = i1017[3]
  i1016.numTilesY = i1017[4]
  i1016.useRandomRow = !!i1017[5]
  i1016.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1017[6], i1016.frameOverTime)
  i1016.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1017[7], i1016.startFrame)
  i1016.cycleCount = i1017[8]
  i1016.rowIndex = i1017[9]
  i1016.flipU = i1017[10]
  i1016.flipV = i1017[11]
  i1016.spriteCount = i1017[12]
  var i1019 = i1017[13]
  var i1018 = []
  for(var i = 0; i < i1019.length; i += 2) {
  request.r(i1019[i + 0], i1019[i + 1], 2, i1018, '')
  }
  i1016.sprites = i1018
  return i1016
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1022 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1023 = data
  i1022.enabled = !!i1023[0]
  i1022.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[1], i1022.x)
  i1022.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[2], i1022.y)
  i1022.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[3], i1022.z)
  i1022.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[4], i1022.radial)
  i1022.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[5], i1022.speedModifier)
  i1022.space = i1023[6]
  i1022.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[7], i1022.orbitalX)
  i1022.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[8], i1022.orbitalY)
  i1022.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[9], i1022.orbitalZ)
  i1022.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[10], i1022.orbitalOffsetX)
  i1022.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[11], i1022.orbitalOffsetY)
  i1022.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[12], i1022.orbitalOffsetZ)
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1024 = root || new pc.ParticleSystemNoise()
  var i1025 = data
  i1024.enabled = !!i1025[0]
  i1024.separateAxes = !!i1025[1]
  i1024.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[2], i1024.strengthX)
  i1024.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[3], i1024.strengthY)
  i1024.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[4], i1024.strengthZ)
  i1024.frequency = i1025[5]
  i1024.damping = !!i1025[6]
  i1024.octaveCount = i1025[7]
  i1024.octaveMultiplier = i1025[8]
  i1024.octaveScale = i1025[9]
  i1024.quality = i1025[10]
  i1024.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[11], i1024.scrollSpeed)
  i1024.scrollSpeedMultiplier = i1025[12]
  i1024.remapEnabled = !!i1025[13]
  i1024.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[14], i1024.remapX)
  i1024.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[15], i1024.remapY)
  i1024.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[16], i1024.remapZ)
  i1024.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[17], i1024.positionAmount)
  i1024.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[18], i1024.rotationAmount)
  i1024.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[19], i1024.sizeAmount)
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1026 = root || new pc.ParticleSystemInheritVelocity()
  var i1027 = data
  i1026.enabled = !!i1027[0]
  i1026.mode = i1027[1]
  i1026.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[2], i1026.curve)
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1028 = root || new pc.ParticleSystemForceOverLifetime()
  var i1029 = data
  i1028.enabled = !!i1029[0]
  i1028.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[1], i1028.x)
  i1028.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[2], i1028.y)
  i1028.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[3], i1028.z)
  i1028.space = i1029[4]
  i1028.randomized = !!i1029[5]
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1030 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1031 = data
  i1030.enabled = !!i1031[0]
  i1030.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[1], i1030.limit)
  i1030.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[2], i1030.limitX)
  i1030.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[3], i1030.limitY)
  i1030.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[4], i1030.limitZ)
  i1030.dampen = i1031[5]
  i1030.separateAxes = !!i1031[6]
  i1030.space = i1031[7]
  i1030.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[8], i1030.drag)
  i1030.multiplyDragByParticleSize = !!i1031[9]
  i1030.multiplyDragByParticleVelocity = !!i1031[10]
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1032 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1033 = data
  request.r(i1033[0], i1033[1], 0, i1032, 'mesh')
  i1032.meshCount = i1033[2]
  i1032.activeVertexStreamsCount = i1033[3]
  i1032.alignment = i1033[4]
  i1032.renderMode = i1033[5]
  i1032.sortMode = i1033[6]
  i1032.lengthScale = i1033[7]
  i1032.velocityScale = i1033[8]
  i1032.cameraVelocityScale = i1033[9]
  i1032.normalDirection = i1033[10]
  i1032.sortingFudge = i1033[11]
  i1032.minParticleSize = i1033[12]
  i1032.maxParticleSize = i1033[13]
  i1032.pivot = new pc.Vec3( i1033[14], i1033[15], i1033[16] )
  request.r(i1033[17], i1033[18], 0, i1032, 'trailMaterial')
  i1032.applyActiveColorSpace = !!i1033[19]
  i1032.enabled = !!i1033[20]
  request.r(i1033[21], i1033[22], 0, i1032, 'sharedMaterial')
  var i1035 = i1033[23]
  var i1034 = []
  for(var i = 0; i < i1035.length; i += 2) {
  request.r(i1035[i + 0], i1035[i + 1], 2, i1034, '')
  }
  i1032.sharedMaterials = i1034
  i1032.receiveShadows = !!i1033[24]
  i1032.shadowCastingMode = i1033[25]
  i1032.sortingLayerID = i1033[26]
  i1032.sortingOrder = i1033[27]
  i1032.lightmapIndex = i1033[28]
  i1032.lightmapSceneIndex = i1033[29]
  i1032.lightmapScaleOffset = new pc.Vec4( i1033[30], i1033[31], i1033[32], i1033[33] )
  i1032.lightProbeUsage = i1033[34]
  i1032.reflectionProbeUsage = i1033[35]
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1036 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1037 = data
  request.r(i1037[0], i1037[1], 0, i1036, 'sharedMesh')
  return i1036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1039 = data
  i1038.center = new pc.Vec3( i1039[0], i1039[1], i1039[2] )
  i1038.size = new pc.Vec3( i1039[3], i1039[4], i1039[5] )
  i1038.enabled = !!i1039[6]
  i1038.isTrigger = !!i1039[7]
  request.r(i1039[8], i1039[9], 0, i1038, 'material')
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1040 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1041 = data
  i1040.center = new pc.Vec3( i1041[0], i1041[1], i1041[2] )
  i1040.radius = i1041[3]
  i1040.enabled = !!i1041[4]
  i1040.isTrigger = !!i1041[5]
  request.r(i1041[6], i1041[7], 0, i1040, 'material')
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1043 = data
  i1042.planeDistance = i1043[0]
  i1042.referencePixelsPerUnit = i1043[1]
  i1042.isFallbackOverlay = !!i1043[2]
  i1042.renderMode = i1043[3]
  i1042.renderOrder = i1043[4]
  i1042.sortingLayerName = i1043[5]
  i1042.sortingOrder = i1043[6]
  i1042.scaleFactor = i1043[7]
  request.r(i1043[8], i1043[9], 0, i1042, 'worldCamera')
  i1042.overrideSorting = !!i1043[10]
  i1042.pixelPerfect = !!i1043[11]
  i1042.targetDisplay = i1043[12]
  i1042.overridePixelPerfect = !!i1043[13]
  i1042.enabled = !!i1043[14]
  return i1042
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1044 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1045 = data
  i1044.m_UiScaleMode = i1045[0]
  i1044.m_ReferencePixelsPerUnit = i1045[1]
  i1044.m_ScaleFactor = i1045[2]
  i1044.m_ReferenceResolution = new pc.Vec2( i1045[3], i1045[4] )
  i1044.m_ScreenMatchMode = i1045[5]
  i1044.m_MatchWidthOrHeight = i1045[6]
  i1044.m_PhysicalUnit = i1045[7]
  i1044.m_FallbackScreenDPI = i1045[8]
  i1044.m_DefaultSpriteDPI = i1045[9]
  i1044.m_DynamicPixelsPerUnit = i1045[10]
  i1044.m_PresetInfoIsWorld = !!i1045[11]
  return i1044
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1046 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1047 = data
  i1046.m_IgnoreReversedGraphics = !!i1047[0]
  i1046.m_BlockingObjects = i1047[1]
  i1046.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1047[2] )
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1049 = data
  i1048.cullTransparentMesh = !!i1049[0]
  return i1048
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i1050 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i1051 = data
  i1050.m_hasFontAssetChanged = !!i1051[0]
  request.r(i1051[1], i1051[2], 0, i1050, 'm_baseMaterial')
  i1050.m_maskOffset = new pc.Vec4( i1051[3], i1051[4], i1051[5], i1051[6] )
  i1050.m_text = i1051[7]
  i1050.m_isRightToLeft = !!i1051[8]
  request.r(i1051[9], i1051[10], 0, i1050, 'm_fontAsset')
  request.r(i1051[11], i1051[12], 0, i1050, 'm_sharedMaterial')
  var i1053 = i1051[13]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 2) {
  request.r(i1053[i + 0], i1053[i + 1], 2, i1052, '')
  }
  i1050.m_fontSharedMaterials = i1052
  request.r(i1051[14], i1051[15], 0, i1050, 'm_fontMaterial')
  var i1055 = i1051[16]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 2) {
  request.r(i1055[i + 0], i1055[i + 1], 2, i1054, '')
  }
  i1050.m_fontMaterials = i1054
  i1050.m_fontColor32 = UnityEngine.Color32.ConstructColor(i1051[17], i1051[18], i1051[19], i1051[20])
  i1050.m_fontColor = new pc.Color(i1051[21], i1051[22], i1051[23], i1051[24])
  i1050.m_enableVertexGradient = !!i1051[25]
  i1050.m_colorMode = i1051[26]
  i1050.m_fontColorGradient = request.d('TMPro.VertexGradient', i1051[27], i1050.m_fontColorGradient)
  request.r(i1051[28], i1051[29], 0, i1050, 'm_fontColorGradientPreset')
  request.r(i1051[30], i1051[31], 0, i1050, 'm_spriteAsset')
  i1050.m_tintAllSprites = !!i1051[32]
  request.r(i1051[33], i1051[34], 0, i1050, 'm_StyleSheet')
  i1050.m_TextStyleHashCode = i1051[35]
  i1050.m_overrideHtmlColors = !!i1051[36]
  i1050.m_faceColor = UnityEngine.Color32.ConstructColor(i1051[37], i1051[38], i1051[39], i1051[40])
  i1050.m_fontSize = i1051[41]
  i1050.m_fontSizeBase = i1051[42]
  i1050.m_fontWeight = i1051[43]
  i1050.m_enableAutoSizing = !!i1051[44]
  i1050.m_fontSizeMin = i1051[45]
  i1050.m_fontSizeMax = i1051[46]
  i1050.m_fontStyle = i1051[47]
  i1050.m_HorizontalAlignment = i1051[48]
  i1050.m_VerticalAlignment = i1051[49]
  i1050.m_textAlignment = i1051[50]
  i1050.m_characterSpacing = i1051[51]
  i1050.m_characterHorizontalScale = i1051[52]
  i1050.m_wordSpacing = i1051[53]
  i1050.m_lineSpacing = i1051[54]
  i1050.m_lineSpacingMax = i1051[55]
  i1050.m_paragraphSpacing = i1051[56]
  i1050.m_charWidthMaxAdj = i1051[57]
  i1050.m_TextWrappingMode = i1051[58]
  i1050.m_wordWrappingRatios = i1051[59]
  i1050.m_overflowMode = i1051[60]
  request.r(i1051[61], i1051[62], 0, i1050, 'm_linkedTextComponent')
  request.r(i1051[63], i1051[64], 0, i1050, 'parentLinkedComponent')
  i1050.m_enableKerning = !!i1051[65]
  var i1057 = i1051[66]
  var i1056 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1057.length; i += 1) {
    i1056.add(i1057[i + 0]);
  }
  i1050.m_ActiveFontFeatures = i1056
  i1050.m_enableExtraPadding = !!i1051[67]
  i1050.checkPaddingRequired = !!i1051[68]
  i1050.m_isRichText = !!i1051[69]
  i1050.m_parseCtrlCharacters = !!i1051[70]
  i1050.m_isOrthographic = !!i1051[71]
  i1050.m_isCullingEnabled = !!i1051[72]
  i1050.m_horizontalMapping = i1051[73]
  i1050.m_verticalMapping = i1051[74]
  i1050.m_uvLineOffset = i1051[75]
  i1050.m_geometrySortingOrder = i1051[76]
  i1050.m_IsTextObjectScaleStatic = !!i1051[77]
  i1050.m_VertexBufferAutoSizeReduction = !!i1051[78]
  i1050.m_useMaxVisibleDescender = !!i1051[79]
  i1050.m_pageToDisplay = i1051[80]
  i1050.m_margin = new pc.Vec4( i1051[81], i1051[82], i1051[83], i1051[84] )
  i1050.m_isUsingLegacyAnimationComponent = !!i1051[85]
  i1050.m_isVolumetricText = !!i1051[86]
  request.r(i1051[87], i1051[88], 0, i1050, 'm_Material')
  i1050.m_EmojiFallbackSupport = !!i1051[89]
  i1050.m_Maskable = !!i1051[90]
  i1050.m_Color = new pc.Color(i1051[91], i1051[92], i1051[93], i1051[94])
  i1050.m_RaycastTarget = !!i1051[95]
  i1050.m_RaycastPadding = new pc.Vec4( i1051[96], i1051[97], i1051[98], i1051[99] )
  return i1050
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1058 = root || request.c( 'UnityEngine.UI.Image' )
  var i1059 = data
  request.r(i1059[0], i1059[1], 0, i1058, 'm_Sprite')
  i1058.m_Type = i1059[2]
  i1058.m_PreserveAspect = !!i1059[3]
  i1058.m_FillCenter = !!i1059[4]
  i1058.m_FillMethod = i1059[5]
  i1058.m_FillAmount = i1059[6]
  i1058.m_FillClockwise = !!i1059[7]
  i1058.m_FillOrigin = i1059[8]
  i1058.m_UseSpriteMesh = !!i1059[9]
  i1058.m_PixelsPerUnitMultiplier = i1059[10]
  request.r(i1059[11], i1059[12], 0, i1058, 'm_Material')
  i1058.m_Maskable = !!i1059[13]
  i1058.m_Color = new pc.Color(i1059[14], i1059[15], i1059[16], i1059[17])
  i1058.m_RaycastTarget = !!i1059[18]
  i1058.m_RaycastPadding = new pc.Vec4( i1059[19], i1059[20], i1059[21], i1059[22] )
  return i1058
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1060 = root || request.c( 'UnityEngine.UI.Button' )
  var i1061 = data
  i1060.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1061[0], i1060.m_OnClick)
  i1060.m_Navigation = request.d('UnityEngine.UI.Navigation', i1061[1], i1060.m_Navigation)
  i1060.m_Transition = i1061[2]
  i1060.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1061[3], i1060.m_Colors)
  i1060.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1061[4], i1060.m_SpriteState)
  i1060.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1061[5], i1060.m_AnimationTriggers)
  i1060.m_Interactable = !!i1061[6]
  request.r(i1061[7], i1061[8], 0, i1060, 'm_TargetGraphic')
  return i1060
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1062 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1063 = data
  i1062.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1063[0], i1062.m_PersistentCalls)
  return i1062
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1064 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1065 = data
  var i1067 = i1065[0]
  var i1066 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1067.length; i += 1) {
    i1066.add(request.d('UnityEngine.Events.PersistentCall', i1067[i + 0]));
  }
  i1064.m_Calls = i1066
  return i1064
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1070 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1071 = data
  request.r(i1071[0], i1071[1], 0, i1070, 'm_Target')
  i1070.m_TargetAssemblyTypeName = i1071[2]
  i1070.m_MethodName = i1071[3]
  i1070.m_Mode = i1071[4]
  i1070.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1071[5], i1070.m_Arguments)
  i1070.m_CallState = i1071[6]
  return i1070
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1072 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1073 = data
  i1072.m_Mode = i1073[0]
  i1072.m_WrapAround = !!i1073[1]
  request.r(i1073[2], i1073[3], 0, i1072, 'm_SelectOnUp')
  request.r(i1073[4], i1073[5], 0, i1072, 'm_SelectOnDown')
  request.r(i1073[6], i1073[7], 0, i1072, 'm_SelectOnLeft')
  request.r(i1073[8], i1073[9], 0, i1072, 'm_SelectOnRight')
  return i1072
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1074 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1075 = data
  i1074.m_NormalColor = new pc.Color(i1075[0], i1075[1], i1075[2], i1075[3])
  i1074.m_HighlightedColor = new pc.Color(i1075[4], i1075[5], i1075[6], i1075[7])
  i1074.m_PressedColor = new pc.Color(i1075[8], i1075[9], i1075[10], i1075[11])
  i1074.m_SelectedColor = new pc.Color(i1075[12], i1075[13], i1075[14], i1075[15])
  i1074.m_DisabledColor = new pc.Color(i1075[16], i1075[17], i1075[18], i1075[19])
  i1074.m_ColorMultiplier = i1075[20]
  i1074.m_FadeDuration = i1075[21]
  return i1074
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1076 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1077 = data
  request.r(i1077[0], i1077[1], 0, i1076, 'm_HighlightedSprite')
  request.r(i1077[2], i1077[3], 0, i1076, 'm_PressedSprite')
  request.r(i1077[4], i1077[5], 0, i1076, 'm_SelectedSprite')
  request.r(i1077[6], i1077[7], 0, i1076, 'm_DisabledSprite')
  return i1076
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1078 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1079 = data
  i1078.m_NormalTrigger = i1079[0]
  i1078.m_HighlightedTrigger = i1079[1]
  i1078.m_PressedTrigger = i1079[2]
  i1078.m_SelectedTrigger = i1079[3]
  i1078.m_DisabledTrigger = i1079[4]
  return i1078
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i1080 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i1081 = data
  i1080.m_StartCorner = i1081[0]
  i1080.m_StartAxis = i1081[1]
  i1080.m_CellSize = new pc.Vec2( i1081[2], i1081[3] )
  i1080.m_Spacing = new pc.Vec2( i1081[4], i1081[5] )
  i1080.m_Constraint = i1081[6]
  i1080.m_ConstraintCount = i1081[7]
  i1080.m_Padding = UnityEngine.RectOffset.FromPaddings(i1081[8], i1081[9], i1081[10], i1081[11])
  i1080.m_ChildAlignment = i1081[12]
  return i1080
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i1082 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i1083 = data
  i1082.m_Spacing = i1083[0]
  i1082.m_ChildForceExpandWidth = !!i1083[1]
  i1082.m_ChildForceExpandHeight = !!i1083[2]
  i1082.m_ChildControlWidth = !!i1083[3]
  i1082.m_ChildControlHeight = !!i1083[4]
  i1082.m_ChildScaleWidth = !!i1083[5]
  i1082.m_ChildScaleHeight = !!i1083[6]
  i1082.m_ReverseArrangement = !!i1083[7]
  i1082.m_Padding = UnityEngine.RectOffset.FromPaddings(i1083[8], i1083[9], i1083[10], i1083[11])
  i1082.m_ChildAlignment = i1083[12]
  return i1082
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i1084 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i1085 = data
  i1084.m_HorizontalFit = i1085[0]
  i1084.m_VerticalFit = i1085[1]
  return i1084
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i1086 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i1087 = data
  request.r(i1087[0], i1087[1], 0, i1086, 'm_Content')
  i1086.m_Horizontal = !!i1087[2]
  i1086.m_Vertical = !!i1087[3]
  i1086.m_MovementType = i1087[4]
  i1086.m_Elasticity = i1087[5]
  i1086.m_Inertia = !!i1087[6]
  i1086.m_DecelerationRate = i1087[7]
  i1086.m_ScrollSensitivity = i1087[8]
  request.r(i1087[9], i1087[10], 0, i1086, 'm_Viewport')
  request.r(i1087[11], i1087[12], 0, i1086, 'm_HorizontalScrollbar')
  request.r(i1087[13], i1087[14], 0, i1086, 'm_VerticalScrollbar')
  i1086.m_HorizontalScrollbarVisibility = i1087[15]
  i1086.m_VerticalScrollbarVisibility = i1087[16]
  i1086.m_HorizontalScrollbarSpacing = i1087[17]
  i1086.m_VerticalScrollbarSpacing = i1087[18]
  i1086.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i1087[19], i1086.m_OnValueChanged)
  return i1086
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i1088 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i1089 = data
  i1088.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1089[0], i1088.m_PersistentCalls)
  return i1088
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i1090 = root || request.c( 'UnityEngine.UI.Mask' )
  var i1091 = data
  i1090.m_ShowMaskGraphic = !!i1091[0]
  return i1090
}

Deserializers["UnityEngine.UI.Scrollbar"] = function (request, data, root) {
  var i1092 = root || request.c( 'UnityEngine.UI.Scrollbar' )
  var i1093 = data
  request.r(i1093[0], i1093[1], 0, i1092, 'm_HandleRect')
  i1092.m_Direction = i1093[2]
  i1092.m_Value = i1093[3]
  i1092.m_Size = i1093[4]
  i1092.m_NumberOfSteps = i1093[5]
  i1092.m_OnValueChanged = request.d('UnityEngine.UI.Scrollbar+ScrollEvent', i1093[6], i1092.m_OnValueChanged)
  i1092.m_Navigation = request.d('UnityEngine.UI.Navigation', i1093[7], i1092.m_Navigation)
  i1092.m_Transition = i1093[8]
  i1092.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1093[9], i1092.m_Colors)
  i1092.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1093[10], i1092.m_SpriteState)
  i1092.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1093[11], i1092.m_AnimationTriggers)
  i1092.m_Interactable = !!i1093[12]
  request.r(i1093[13], i1093[14], 0, i1092, 'm_TargetGraphic')
  return i1092
}

Deserializers["UnityEngine.UI.Scrollbar+ScrollEvent"] = function (request, data, root) {
  var i1094 = root || request.c( 'UnityEngine.UI.Scrollbar+ScrollEvent' )
  var i1095 = data
  i1094.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1095[0], i1094.m_PersistentCalls)
  return i1094
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i1096 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i1097 = data
  i1096.m_Alpha = i1097[0]
  i1096.m_Interactable = !!i1097[1]
  i1096.m_BlocksRaycasts = !!i1097[2]
  i1096.m_IgnoreParentGroups = !!i1097[3]
  i1096.enabled = !!i1097[4]
  return i1096
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1098 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1099 = data
  i1098.name = i1099[0]
  i1098.index = i1099[1]
  i1098.startup = !!i1099[2]
  return i1098
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1100 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1101 = data
  i1100.type = i1101[0]
  i1100.color = new pc.Color(i1101[1], i1101[2], i1101[3], i1101[4])
  i1100.cullingMask = i1101[5]
  i1100.intensity = i1101[6]
  i1100.range = i1101[7]
  i1100.spotAngle = i1101[8]
  i1100.shadows = i1101[9]
  i1100.shadowNormalBias = i1101[10]
  i1100.shadowBias = i1101[11]
  i1100.shadowStrength = i1101[12]
  i1100.shadowResolution = i1101[13]
  i1100.lightmapBakeType = i1101[14]
  i1100.renderMode = i1101[15]
  request.r(i1101[16], i1101[17], 0, i1100, 'cookie')
  i1100.cookieSize = i1101[18]
  i1100.shadowNearPlane = i1101[19]
  i1100.occlusionMaskChannel = i1101[20]
  i1100.isBaked = !!i1101[21]
  i1100.mixedLightingMode = i1101[22]
  i1100.enabled = !!i1101[23]
  return i1100
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1102 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1103 = data
  request.r(i1103[0], i1103[1], 0, i1102, 'clip')
  request.r(i1103[2], i1103[3], 0, i1102, 'outputAudioMixerGroup')
  i1102.playOnAwake = !!i1103[4]
  i1102.loop = !!i1103[5]
  i1102.time = i1103[6]
  i1102.volume = i1103[7]
  i1102.pitch = i1103[8]
  i1102.enabled = !!i1103[9]
  return i1102
}

Deserializers["PlayableSpatialAudio"] = function (request, data, root) {
  var i1104 = root || request.c( 'PlayableSpatialAudio' )
  var i1105 = data
  request.r(i1105[0], i1105[1], 0, i1104, 'listener')
  request.r(i1105[2], i1105[3], 0, i1104, 'source')
  i1104.volume = i1105[4]
  i1104.minDistance = i1105[5]
  i1104.maxDistance = i1105[6]
  i1104.linear = !!i1105[7]
  return i1104
}

Deserializers["StealEggGame"] = function (request, data, root) {
  var i1106 = root || request.c( 'StealEggGame' )
  var i1107 = data
  var i1109 = i1107[0]
  var i1108 = []
  for(var i = 0; i < i1109.length; i += 1) {
    i1108.push( request.d('StealEggGame+PetInfo', i1109[i + 0]) );
  }
  i1106.petCatalog = i1108
  var i1111 = i1107[1]
  var i1110 = []
  for(var i = 0; i < i1111.length; i += 1) {
    i1110.push( request.d('StealEggGame+TrailInfo', i1111[i + 0]) );
  }
  i1106.trails = i1110
  var i1113 = i1107[2]
  var i1112 = []
  for(var i = 0; i < i1113.length; i += 1) {
    i1112.push( request.d('StealEggGame+BoostInfo', i1113[i + 0]) );
  }
  i1106.luckyEggRewards = i1112
  request.r(i1107[3], i1107[4], 0, i1106, 'playerHair')
  var i1115 = i1107[5]
  var i1114 = []
  for(var i = 0; i < i1115.length; i += 2) {
  request.r(i1115[i + 0], i1115[i + 1], 2, i1114, '')
  }
  i1106.outfitHairs = i1114
  var i1117 = i1107[6]
  var i1116 = []
  for(var i = 0; i < i1117.length; i += 2) {
  request.r(i1117[i + 0], i1117[i + 1], 2, i1116, '')
  }
  i1106.outfitFaces = i1116
  var i1119 = i1107[7]
  var i1118 = []
  for(var i = 0; i < i1119.length; i += 2) {
  request.r(i1119[i + 0], i1119[i + 1], 2, i1118, '')
  }
  i1106.outfitShirts = i1118
  var i1121 = i1107[8]
  var i1120 = []
  for(var i = 0; i < i1121.length; i += 2) {
  request.r(i1121[i + 0], i1121[i + 1], 2, i1120, '')
  }
  i1106.outfitPants = i1120
  var i1123 = i1107[9]
  var i1122 = []
  for(var i = 0; i < i1123.length; i += 2) {
  request.r(i1123[i + 0], i1123[i + 1], 2, i1122, '')
  }
  i1106.rarityMaterials = i1122
  var i1125 = i1107[10]
  var i1124 = []
  for(var i = 0; i < i1125.length; i += 2) {
  request.r(i1125[i + 0], i1125[i + 1], 2, i1124, '')
  }
  i1106.rarityWorldMaterials = i1124
  request.r(i1107[11], i1107[12], 0, i1106, 'rarityFont')
  var i1127 = i1107[13]
  var i1126 = []
  for(var i = 0; i < i1127.length; i += 2) {
  request.r(i1127[i + 0], i1127[i + 1], 2, i1126, '')
  }
  i1106.rarityFrames = i1126
  request.r(i1107[14], i1107[15], 0, i1106, 'batIcon')
  request.r(i1107[16], i1107[17], 0, i1106, 'nightIcon')
  request.r(i1107[18], i1107[19], 0, i1106, 'dayIcon')
  request.r(i1107[20], i1107[21], 0, i1106, 'trainBoostIcon')
  request.r(i1107[22], i1107[23], 0, i1106, 'incubateBoostIcon')
  request.r(i1107[24], i1107[25], 0, i1106, 'batPrefab')
  request.r(i1107[26], i1107[27], 0, i1106, 'luckyEggPrefab')
  request.r(i1107[28], i1107[29], 0, i1106, 'incubateTimerPrefab')
  request.r(i1107[30], i1107[31], 0, i1106, 'floatingTextPrefab')
  request.r(i1107[32], i1107[33], 0, i1106, 'npcTemplate')
  request.r(i1107[34], i1107[35], 0, i1106, 'footstepSound')
  request.r(i1107[36], i1107[37], 0, i1106, 'clickSound')
  request.r(i1107[38], i1107[39], 0, i1106, 'closeSound')
  request.r(i1107[40], i1107[41], 0, i1106, 'rewardSound')
  request.r(i1107[42], i1107[43], 0, i1106, 'upgradeSound')
  request.r(i1107[44], i1107[45], 0, i1106, 'trainSound')
  request.r(i1107[46], i1107[47], 0, i1106, 'equipSound')
  request.r(i1107[48], i1107[49], 0, i1106, 'fuseSound')
  request.r(i1107[50], i1107[51], 0, i1106, 'frogSound')
  request.r(i1107[52], i1107[53], 0, i1106, 'progressSound')
  request.r(i1107[54], i1107[55], 0, i1106, 'warningSound')
  request.r(i1107[56], i1107[57], 0, i1106, 'crackSound')
  request.r(i1107[58], i1107[59], 0, i1106, 'popupSound')
  i1106.coopPrices = i1107[60]
  i1106.coopModelByLevel = i1107[61]
  i1106.coopBaseSlots = i1107[62]
  i1106.treadmillPrices = i1107[63]
  i1106.treadmillTrainValues = i1107[64]
  i1106.priceMultiplier = i1107[65]
  i1106.dayDuration = i1107[66]
  i1106.nightDuration = i1107[67]
  i1106.nightIncubateMultiplier = i1107[68]
  i1106.dayLightIntensity = i1107[69]
  i1106.lightTransition = i1107[70]
  i1106.incomeMultiplierBySize = i1107[71]
  i1106.sellPriceMultiplier = i1107[72]
  i1106.luckyFrogFeedMultiplier = i1107[73]
  i1106.trainTick = i1107[74]
  i1106.hatchDuration = i1107[75]
  i1106.luckyEggOpenDuration = i1107[76]
  i1106.fuseDuration = i1107[77]
  i1106.npcCount = i1107[78]
  i1106.npcCoopSmallPets = i1107[79]
  i1106.npcCoopBigPetSize = i1107[80]
  i1106.npcMinSpeed = i1107[81]
  i1106.npcMaxSpeed = i1107[82]
  i1106.batCooldown = i1107[83]
  i1106.batForce = i1107[84]
  var i1129 = i1107[85]
  var i1128 = []
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.push( request.d('StealEggGame+House', i1129[i + 0]) );
  }
  i1106.houses = i1128
  request.r(i1107[86], i1107[87], 0, i1106, 'fuseMachine')
  request.r(i1107[88], i1107[89], 0, i1106, 'exchangeShop')
  request.r(i1107[90], i1107[91], 0, i1106, 'luckyFrog')
  request.r(i1107[92], i1107[93], 0, i1106, 'luckyEggSpawn')
  request.r(i1107[94], i1107[95], 0, i1106, 'luckyEggTarget')
  request.r(i1107[96], i1107[97], 0, i1106, 'teleportPoint')
  request.r(i1107[98], i1107[99], 0, i1106, 'lobbyCenter')
  request.r(i1107[100], i1107[101], 0, i1106, 'originalUI')
  i1106.lobbySize = new pc.Vec3( i1107[102], i1107[103], i1107[104] )
  request.r(i1107[105], i1107[106], 0, i1106, 'combatArea')
  request.r(i1107[107], i1107[108], 0, i1106, 'nightGraphic')
  request.r(i1107[109], i1107[110], 0, i1106, 'nightText')
  request.r(i1107[111], i1107[112], 0, i1106, 'sun')
  var i1131 = i1107[113]
  var i1130 = []
  for(var i = 0; i < i1131.length; i += 2) {
  request.r(i1131[i + 0], i1131[i + 1], 2, i1130, '')
  }
  i1106.npcModels = i1130
  var i1133 = i1107[114]
  var i1132 = []
  for(var i = 0; i < i1133.length; i += 1) {
    i1132.push( request.d('StealEggGame+Zone', i1133[i + 0]) );
  }
  i1106.zones = i1132
  request.r(i1107[115], i1107[116], 0, i1106, 'player')
  request.r(i1107[117], i1107[118], 0, i1106, 'home')
  request.r(i1107[119], i1107[120], 0, i1106, 'safePoint')
  request.r(i1107[121], i1107[122], 0, i1106, 'rightHandSlot')
  request.r(i1107[123], i1107[124], 0, i1106, 'playerCoopArea')
  request.r(i1107[125], i1107[126], 0, i1106, 'trainingPoint')
  request.r(i1107[127], i1107[128], 0, i1106, 'gameCamera')
  request.r(i1107[129], i1107[130], 0, i1106, 'playerAnimator')
  request.r(i1107[131], i1107[132], 0, i1106, 'ragdoll')
  request.r(i1107[133], i1107[134], 0, i1106, 'uiFont')
  request.r(i1107[135], i1107[136], 0, i1106, 'guideMaterial')
  request.r(i1107[137], i1107[138], 0, i1106, 'roundedSprite')
  request.r(i1107[139], i1107[140], 0, i1106, 'circleSprite')
  request.r(i1107[141], i1107[142], 0, i1106, 'moneyIcon')
  request.r(i1107[143], i1107[144], 0, i1106, 'speedIcon')
  request.r(i1107[145], i1107[146], 0, i1106, 'stealSound')
  request.r(i1107[147], i1107[148], 0, i1106, 'deliverSound')
  request.r(i1107[149], i1107[150], 0, i1106, 'hatchSound')
  request.r(i1107[151], i1107[152], 0, i1106, 'caughtSound')
  request.r(i1107[153], i1107[154], 0, i1106, 'eggBreakEffect')
  request.r(i1107[155], i1107[156], 0, i1106, 'sourceHud')
  i1106.capturesForEndCard = i1107[157]
  i1106.moveSpeed = i1107[158]
  i1106.incubationSeconds = i1107[159]
  i1106.jumpHeight = i1107[160]
  i1106.gravity = i1107[161]
  i1106.baseMoveSpeed = i1107[162]
  i1106.speedPowerMultiplier = i1107[163]
  i1106.trainingPowerPerTick = i1107[164]
  i1106.startingMoney = i1107[165]
  i1106.slowMode = !!i1107[166]
  i1106.hitWindup = i1107[167]
  i1106.knockdownDuration = i1107[168]
  i1106.getUpDuration = i1107[169]
  request.r(i1107[170], i1107[171], 0, i1106, 'guide')
  i1106.hudUI = request.d('StealEggGame+HudUI', i1107[172], i1106.hudUI)
  i1106.petsUI = request.d('StealEggGame+PetsPopupUI', i1107[173], i1106.petsUI)
  i1106.incubateUI = request.d('StealEggGame+IncubatePopupUI', i1107[174], i1106.incubateUI)
  i1106.inventoryUI = request.d('StealEggGame+InventoryUI', i1107[175], i1106.inventoryUI)
  i1106.rewardUI = request.d('StealEggGame+RewardUI', i1107[176], i1106.rewardUI)
  i1106.dialogUI = request.d('StealEggGame+DialogUI', i1107[177], i1106.dialogUI)
  request.r(i1107[178], i1107[179], 0, i1106, 'warningPanel')
  i1106.treadmillUI = request.d('StealEggGame+TreadmillPanelUI', i1107[180], i1106.treadmillUI)
  i1106.indexUI = request.d('StealEggGame+IndexUI', i1107[181], i1106.indexUI)
  i1106.settingsUI = request.d('StealEggGame+LockedPanelUI', i1107[182], i1106.settingsUI)
  i1106.coopUI = request.d('StealEggGame+LockedPanelUI', i1107[183], i1106.coopUI)
  i1106.fuseUI = request.d('StealEggGame+LockedPanelUI', i1107[184], i1106.fuseUI)
  i1106.frogUI = request.d('StealEggGame+LockedPanelUI', i1107[185], i1106.frogUI)
  i1106.shopUI = request.d('StealEggGame+LockedPanelUI', i1107[186], i1106.shopUI)
  i1106.trailUI = request.d('StealEggGame+LockedPanelUI', i1107[187], i1106.trailUI)
  request.r(i1107[188], i1107[189], 0, i1106, 'jumpButton')
  request.r(i1107[190], i1107[191], 0, i1106, 'safeUI')
  request.r(i1107[192], i1107[193], 0, i1106, 'hintHand')
  request.r(i1107[194], i1107[195], 0, i1106, 'cameraHint')
  request.r(i1107[196], i1107[197], 0, i1106, 'jumpHint')
  request.r(i1107[198], i1107[199], 0, i1106, 'tutorialText')
  request.r(i1107[200], i1107[201], 0, i1106, 'joystick')
  return i1106
}

Deserializers["StealEggGame+PetInfo"] = function (request, data, root) {
  var i1136 = root || request.c( 'StealEggGame+PetInfo' )
  var i1137 = data
  i1136.name = i1137[0]
  i1136.rarity = i1137[1]
  i1136.zone = i1137[2]
  i1136.income = i1137[3]
  request.r(i1137[4], i1137[5], 0, i1136, 'thumbnail')
  request.r(i1137[6], i1137[7], 0, i1136, 'prefab')
  return i1136
}

Deserializers["StealEggGame+TrailInfo"] = function (request, data, root) {
  var i1140 = root || request.c( 'StealEggGame+TrailInfo' )
  var i1141 = data
  i1140.name = i1141[0]
  i1140.rarity = i1141[1]
  i1140.multiplier = i1141[2]
  i1140.price = i1141[3]
  request.r(i1141[4], i1141[5], 0, i1140, 'thumbnail')
  request.r(i1141[6], i1141[7], 0, i1140, 'frame')
  request.r(i1141[8], i1141[9], 0, i1140, 'prefab')
  return i1140
}

Deserializers["StealEggGame+BoostInfo"] = function (request, data, root) {
  var i1144 = root || request.c( 'StealEggGame+BoostInfo' )
  var i1145 = data
  i1144.name = i1145[0]
  i1144.type = i1145[1]
  i1144.value = i1145[2]
  i1144.duration = i1145[3]
  i1144.weight = i1145[4]
  request.r(i1145[5], i1145[6], 0, i1144, 'icon')
  return i1144
}

Deserializers["StealEggGame+House"] = function (request, data, root) {
  var i1150 = root || request.c( 'StealEggGame+House' )
  var i1151 = data
  request.r(i1151[0], i1151[1], 0, i1150, 'root')
  request.r(i1151[2], i1151[3], 0, i1150, 'coopPad')
  request.r(i1151[4], i1151[5], 0, i1150, 'treadmillPad')
  request.r(i1151[6], i1151[7], 0, i1150, 'petContainer')
  var i1153 = i1151[8]
  var i1152 = []
  for(var i = 0; i < i1153.length; i += 2) {
  request.r(i1153[i + 0], i1153[i + 1], 2, i1152, '')
  }
  i1150.coopModels = i1152
  var i1155 = i1151[9]
  var i1154 = []
  for(var i = 0; i < i1155.length; i += 2) {
  request.r(i1155[i + 0], i1155[i + 1], 2, i1154, '')
  }
  i1150.treadmills = i1154
  return i1150
}

Deserializers["StealEggGame+Zone"] = function (request, data, root) {
  var i1160 = root || request.c( 'StealEggGame+Zone' )
  var i1161 = data
  i1160.name = i1161[0]
  request.r(i1161[1], i1161[2], 0, i1160, 'root')
  request.r(i1161[3], i1161[4], 0, i1160, 'guardian')
  var i1163 = i1161[5]
  var i1162 = []
  for(var i = 0; i < i1163.length; i += 2) {
  request.r(i1163[i + 0], i1163[i + 1], 2, i1162, '')
  }
  i1160.nests = i1162
  var i1165 = i1161[6]
  var i1164 = []
  for(var i = 0; i < i1165.length; i += 2) {
  request.r(i1165[i + 0], i1165[i + 1], 2, i1164, '')
  }
  i1160.eggPrefabs = i1164
  var i1167 = i1161[7]
  var i1166 = []
  for(var i = 0; i < i1167.length; i += 2) {
  request.r(i1167[i + 0], i1167[i + 1], 2, i1166, '')
  }
  i1160.petPrefabs = i1166
  var i1169 = i1161[8]
  var i1168 = []
  for(var i = 0; i < i1169.length; i += 1) {
    i1168.push( request.d('PlayableEggRules', i1169[i + 0]) );
  }
  i1160.eggRules = i1168
  request.r(i1161[9], i1161[10], 0, i1160, 'bounds')
  request.r(i1161[11], i1161[12], 0, i1160, 'thumbnail')
  i1160.attackDistance = i1161[13]
  i1160.guardianSpeed = i1161[14]
  request.r(i1161[15], i1161[16], 0, i1160, 'sleepSound')
  request.r(i1161[17], i1161[18], 0, i1160, 'runSound')
  request.r(i1161[19], i1161[20], 0, i1160, 'catchSound')
  return i1160
}

Deserializers["PlayableEggRules"] = function (request, data, root) {
  var i1172 = root || request.c( 'PlayableEggRules' )
  var i1173 = data
  i1172.name = i1173[0]
  request.r(i1173[1], i1173[2], 0, i1172, 'thumbnail')
  i1172.petIds = i1173[3]
  i1172.spawnWeight = i1173[4]
  i1172.incubationTime = i1173[5]
  var i1175 = i1173[6]
  var i1174 = []
  for(var i = 0; i < i1175.length; i += 2) {
    i1174.push( new pc.Vec2( i1175[i + 0], i1175[i + 1] ) );
  }
  i1172.sizeRanges = i1174
  i1172.sizeWeights = i1173[7]
  var i1177 = i1173[8]
  var i1176 = []
  for(var i = 0; i < i1177.length; i += 2) {
  request.r(i1177[i + 0], i1177[i + 1], 2, i1176, '')
  }
  i1172.pets = i1176
  i1172.petWeights = i1173[9]
  i1172.petIncome = i1173[10]
  return i1172
}

Deserializers["StealEggGame+HudUI"] = function (request, data, root) {
  var i1180 = root || request.c( 'StealEggGame+HudUI' )
  var i1181 = data
  request.r(i1181[0], i1181[1], 0, i1180, 'functions')
  var i1183 = i1181[2]
  var i1182 = []
  for(var i = 0; i < i1183.length; i += 2) {
  request.r(i1183[i + 0], i1183[i + 1], 2, i1182, '')
  }
  i1180.actionButtons = i1182
  request.r(i1181[3], i1181[4], 0, i1180, 'incubateTapHint')
  request.r(i1181[5], i1181[6], 0, i1180, 'hatchTapHint')
  request.r(i1181[7], i1181[8], 0, i1180, 'equipTapHint')
  request.r(i1181[9], i1181[10], 0, i1180, 'trainTapHint')
  request.r(i1181[11], i1181[12], 0, i1180, 'attack')
  request.r(i1181[13], i1181[14], 0, i1180, 'settings')
  request.r(i1181[15], i1181[16], 0, i1180, 'trailShop')
  request.r(i1181[17], i1181[18], 0, i1180, 'index')
  request.r(i1181[19], i1181[20], 0, i1180, 'speedMode')
  request.r(i1181[21], i1181[22], 0, i1180, 'speedOn')
  request.r(i1181[23], i1181[24], 0, i1180, 'speedOff')
  request.r(i1181[25], i1181[26], 0, i1180, 'money')
  request.r(i1181[27], i1181[28], 0, i1180, 'speed')
  request.r(i1181[29], i1181[30], 0, i1180, 'time')
  request.r(i1181[31], i1181[32], 0, i1180, 'moneyIcon')
  request.r(i1181[33], i1181[34], 0, i1180, 'speedIcon')
  request.r(i1181[35], i1181[36], 0, i1180, 'timeIcon')
  request.r(i1181[37], i1181[38], 0, i1180, 'indexHighlight')
  request.r(i1181[39], i1181[40], 0, i1180, 'incubateHighlight')
  request.r(i1181[41], i1181[42], 0, i1180, 'right')
  request.r(i1181[43], i1181[44], 0, i1180, 'equipMonster')
  request.r(i1181[45], i1181[46], 0, i1180, 'incubateEgg')
  request.r(i1181[47], i1181[48], 0, i1180, 'boostContainer')
  request.r(i1181[49], i1181[50], 0, i1180, 'boostTemplate')
  request.r(i1181[51], i1181[52], 0, i1180, 'zoneBanner')
  request.r(i1181[53], i1181[54], 0, i1180, 'zoneFrame')
  request.r(i1181[55], i1181[56], 0, i1180, 'zoneName')
  request.r(i1181[57], i1181[58], 0, i1180, 'incomeTemplate')
  return i1180
}

Deserializers["StealEggGame+PetsPopupUI"] = function (request, data, root) {
  var i1184 = root || request.c( 'StealEggGame+PetsPopupUI' )
  var i1185 = data
  request.r(i1185[0], i1185[1], 0, i1184, 'root')
  request.r(i1185[2], i1185[3], 0, i1184, 'content')
  request.r(i1185[4], i1185[5], 0, i1184, 'template')
  request.r(i1185[6], i1185[7], 0, i1184, 'close')
  request.r(i1185[8], i1185[9], 0, i1184, 'equipBest')
  request.r(i1185[10], i1185[11], 0, i1184, 'upgradeSlot')
  request.r(i1185[12], i1185[13], 0, i1184, 'slots')
  request.r(i1185[14], i1185[15], 0, i1184, 'upgradePrice')
  request.r(i1185[16], i1185[17], 0, i1184, 'upgradeUnavailable')
  return i1184
}

Deserializers["StealEggGame+IncubatePopupUI"] = function (request, data, root) {
  var i1186 = root || request.c( 'StealEggGame+IncubatePopupUI' )
  var i1187 = data
  request.r(i1187[0], i1187[1], 0, i1186, 'root')
  request.r(i1187[2], i1187[3], 0, i1186, 'content')
  request.r(i1187[4], i1187[5], 0, i1186, 'template')
  request.r(i1187[6], i1187[7], 0, i1186, 'close')
  return i1186
}

Deserializers["StealEggGame+InventoryUI"] = function (request, data, root) {
  var i1188 = root || request.c( 'StealEggGame+InventoryUI' )
  var i1189 = data
  var i1191 = i1189[0]
  var i1190 = []
  for(var i = 0; i < i1191.length; i += 2) {
  request.r(i1191[i + 0], i1191[i + 1], 2, i1190, '')
  }
  i1188.quickSlots = i1190
  request.r(i1189[1], i1189[2], 0, i1188, 'bag')
  request.r(i1189[3], i1189[4], 0, i1188, 'bagClose')
  request.r(i1189[5], i1189[6], 0, i1188, 'bagPopup')
  request.r(i1189[7], i1189[8], 0, i1188, 'bagContent')
  request.r(i1189[9], i1189[10], 0, i1188, 'bagTemplate')
  request.r(i1189[11], i1189[12], 0, i1188, 'petInfo')
  request.r(i1189[13], i1189[14], 0, i1188, 'petThumbnail')
  request.r(i1189[15], i1189[16], 0, i1188, 'petName')
  request.r(i1189[17], i1189[18], 0, i1188, 'petIncome')
  request.r(i1189[19], i1189[20], 0, i1188, 'petRarity')
  request.r(i1189[21], i1189[22], 0, i1188, 'petEquip')
  request.r(i1189[23], i1189[24], 0, i1188, 'petDrop')
  request.r(i1189[25], i1189[26], 0, i1188, 'eggInfo')
  request.r(i1189[27], i1189[28], 0, i1188, 'eggThumbnail')
  request.r(i1189[29], i1189[30], 0, i1188, 'eggName')
  request.r(i1189[31], i1189[32], 0, i1188, 'eggWeight')
  request.r(i1189[33], i1189[34], 0, i1188, 'eggIncubate')
  request.r(i1189[35], i1189[36], 0, i1188, 'eggDrop')
  return i1188
}

Deserializers["StealEggGame+RewardUI"] = function (request, data, root) {
  var i1194 = root || request.c( 'StealEggGame+RewardUI' )
  var i1195 = data
  request.r(i1195[0], i1195[1], 0, i1194, 'root')
  request.r(i1195[2], i1195[3], 0, i1194, 'title')
  request.r(i1195[4], i1195[5], 0, i1194, 'content')
  request.r(i1195[6], i1195[7], 0, i1194, 'template')
  request.r(i1195[8], i1195[9], 0, i1194, 'close')
  request.r(i1195[10], i1195[11], 0, i1194, 'tapToClose')
  return i1194
}

Deserializers["StealEggGame+DialogUI"] = function (request, data, root) {
  var i1196 = root || request.c( 'StealEggGame+DialogUI' )
  var i1197 = data
  request.r(i1197[0], i1197[1], 0, i1196, 'root')
  request.r(i1197[2], i1197[3], 0, i1196, 'message')
  return i1196
}

Deserializers["StealEggGame+TreadmillPanelUI"] = function (request, data, root) {
  var i1198 = root || request.c( 'StealEggGame+TreadmillPanelUI' )
  var i1199 = data
  request.r(i1199[0], i1199[1], 0, i1198, 'root')
  request.r(i1199[2], i1199[3], 0, i1198, 'close')
  request.r(i1199[4], i1199[5], 0, i1198, 'upgrade')
  request.r(i1199[6], i1199[7], 0, i1198, 'level')
  request.r(i1199[8], i1199[9], 0, i1198, 'train')
  request.r(i1199[10], i1199[11], 0, i1198, 'price')
  request.r(i1199[12], i1199[13], 0, i1198, 'max')
  return i1198
}

Deserializers["StealEggGame+IndexUI"] = function (request, data, root) {
  var i1200 = root || request.c( 'StealEggGame+IndexUI' )
  var i1201 = data
  request.r(i1201[0], i1201[1], 0, i1200, 'root')
  request.r(i1201[2], i1201[3], 0, i1200, 'close')
  request.r(i1201[4], i1201[5], 0, i1200, 'claim')
  request.r(i1201[6], i1201[7], 0, i1200, 'zones')
  request.r(i1201[8], i1201[9], 0, i1200, 'zoneTemplate')
  request.r(i1201[10], i1201[11], 0, i1200, 'lockedZone')
  request.r(i1201[12], i1201[13], 0, i1200, 'progressFill')
  request.r(i1201[14], i1201[15], 0, i1200, 'progress')
  request.r(i1201[16], i1201[17], 0, i1200, 'information')
  request.r(i1201[18], i1201[19], 0, i1200, 'rewardFrame')
  request.r(i1201[20], i1201[21], 0, i1200, 'claimed')
  request.r(i1201[22], i1201[23], 0, i1200, 'infoImage')
  request.r(i1201[24], i1201[25], 0, i1200, 'infoName')
  request.r(i1201[26], i1201[27], 0, i1200, 'infoIncome')
  request.r(i1201[28], i1201[29], 0, i1200, 'infoRarity')
  request.r(i1201[30], i1201[31], 0, i1200, 'rewardContent')
  request.r(i1201[32], i1201[33], 0, i1200, 'rewardTemplate')
  return i1200
}

Deserializers["StealEggGame+LockedPanelUI"] = function (request, data, root) {
  var i1202 = root || request.c( 'StealEggGame+LockedPanelUI' )
  var i1203 = data
  request.r(i1203[0], i1203[1], 0, i1202, 'root')
  request.r(i1203[2], i1203[3], 0, i1202, 'close')
  return i1202
}

Deserializers["PlayableRagdoll"] = function (request, data, root) {
  var i1204 = root || request.c( 'PlayableRagdoll' )
  var i1205 = data
  request.r(i1205[0], i1205[1], 0, i1204, 'player')
  request.r(i1205[2], i1205[3], 0, i1204, 'animator')
  request.r(i1205[4], i1205[5], 0, i1204, 'hips')
  var i1207 = i1205[6]
  var i1206 = []
  for(var i = 0; i < i1207.length; i += 2) {
  request.r(i1207[i + 0], i1207[i + 1], 2, i1206, '')
  }
  i1204.bodies = i1206
  var i1209 = i1205[7]
  var i1208 = []
  for(var i = 0; i < i1209.length; i += 2) {
  request.r(i1209[i + 0], i1209[i + 1], 2, i1208, '')
  }
  i1204.bodyColliders = i1208
  return i1204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i1214 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i1215 = data
  i1214.textureMode = i1215[0]
  i1214.alignment = i1215[1]
  i1214.widthCurve = new pc.AnimationCurve( { keys_flow: i1215[2] } )
  i1214.colorGradient = i1215[3] ? new pc.ColorGradient(i1215[3][0], i1215[3][1], i1215[3][2]) : null
  var i1217 = i1215[4]
  var i1216 = []
  for(var i = 0; i < i1217.length; i += 3) {
    i1216.push( new pc.Vec3( i1217[i + 0], i1217[i + 1], i1217[i + 2] ) );
  }
  i1214.positions = i1216
  i1214.positionCount = i1215[5]
  i1214.widthMultiplier = i1215[6]
  i1214.startWidth = i1215[7]
  i1214.endWidth = i1215[8]
  i1214.numCornerVertices = i1215[9]
  i1214.numCapVertices = i1215[10]
  i1214.useWorldSpace = !!i1215[11]
  i1214.loop = !!i1215[12]
  i1214.startColor = new pc.Color(i1215[13], i1215[14], i1215[15], i1215[16])
  i1214.endColor = new pc.Color(i1215[17], i1215[18], i1215[19], i1215[20])
  i1214.generateLightingData = !!i1215[21]
  i1214.enabled = !!i1215[22]
  request.r(i1215[23], i1215[24], 0, i1214, 'sharedMaterial')
  var i1219 = i1215[25]
  var i1218 = []
  for(var i = 0; i < i1219.length; i += 2) {
  request.r(i1219[i + 0], i1219[i + 1], 2, i1218, '')
  }
  i1214.sharedMaterials = i1218
  i1214.receiveShadows = !!i1215[26]
  i1214.shadowCastingMode = i1215[27]
  i1214.sortingLayerID = i1215[28]
  i1214.sortingOrder = i1215[29]
  i1214.lightmapIndex = i1215[30]
  i1214.lightmapSceneIndex = i1215[31]
  i1214.lightmapScaleOffset = new pc.Vec4( i1215[32], i1215[33], i1215[34], i1215[35] )
  i1214.lightProbeUsage = i1215[36]
  i1214.reflectionProbeUsage = i1215[37]
  return i1214
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i1220 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i1221 = data
  i1220.enabled = !!i1221[0]
  i1220.center = new pc.Vec3( i1221[1], i1221[2], i1221[3] )
  i1220.radius = i1221[4]
  i1220.height = i1221[5]
  i1220.minMoveDistance = i1221[6]
  i1220.skinWidth = i1221[7]
  i1220.enableOverlapRecovery = !!i1221[8]
  return i1220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i1222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i1223 = data
  i1222.swingAxis = new pc.Vec3( i1223[0], i1223[1], i1223[2] )
  i1222.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i1223[3], i1222.twistLimitSpring)
  i1222.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i1223[4], i1222.swingLimitSpring)
  i1222.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i1223[5], i1222.lowTwistLimit)
  i1222.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i1223[6], i1222.highTwistLimit)
  i1222.swing1Limit = request.d('UnityEngine.SoftJointLimit', i1223[7], i1222.swing1Limit)
  i1222.swing2Limit = request.d('UnityEngine.SoftJointLimit', i1223[8], i1222.swing2Limit)
  request.r(i1223[9], i1223[10], 0, i1222, 'connectedBody')
  i1222.axis = new pc.Vec3( i1223[11], i1223[12], i1223[13] )
  i1222.anchor = new pc.Vec3( i1223[14], i1223[15], i1223[16] )
  i1222.connectedAnchor = new pc.Vec3( i1223[17], i1223[18], i1223[19] )
  i1222.autoConfigureConnectedAnchor = !!i1223[20]
  i1222.massScale = i1223[21]
  i1222.connectedMassScale = i1223[22]
  i1222.enableCollision = !!i1223[23]
  i1222.breakForce = i1223[24]
  i1222.breakTorque = i1223[25]
  return i1222
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1224 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1225 = data
  request.r(i1225[0], i1225[1], 0, i1224, 'm_FirstSelected')
  i1224.m_sendNavigationEvents = !!i1225[2]
  i1224.m_DragThreshold = i1225[3]
  return i1224
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1226 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1227 = data
  i1226.m_HorizontalAxis = i1227[0]
  i1226.m_VerticalAxis = i1227[1]
  i1226.m_SubmitButton = i1227[2]
  i1226.m_CancelButton = i1227[3]
  i1226.m_InputActionsPerSecond = i1227[4]
  i1226.m_RepeatDelay = i1227[5]
  i1226.m_ForceModuleActive = !!i1227[6]
  i1226.m_SendPointerHoverToParent = !!i1227[7]
  return i1226
}

Deserializers["PlayableCameraDrag"] = function (request, data, root) {
  var i1228 = root || request.c( 'PlayableCameraDrag' )
  var i1229 = data
  request.r(i1229[0], i1229[1], 0, i1228, 'cameraController')
  return i1228
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i1230 = root || request.c( 'PlayableJoystick' )
  var i1231 = data
  request.r(i1231[0], i1231[1], 0, i1230, 'knob')
  return i1230
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i1232 = root || request.c( 'UnityEngine.UI.Outline' )
  var i1233 = data
  i1232.m_EffectColor = new pc.Color(i1233[0], i1233[1], i1233[2], i1233[3])
  i1232.m_EffectDistance = new pc.Vec2( i1233[4], i1233[5] )
  i1232.m_UseGraphicAlpha = !!i1233[6]
  return i1232
}

Deserializers["TapHintView"] = function (request, data, root) {
  var i1234 = root || request.c( 'TapHintView' )
  var i1235 = data
  request.r(i1235[0], i1235[1], 0, i1234, 'hand')
  request.r(i1235[2], i1235[3], 0, i1234, 'shine')
  request.r(i1235[4], i1235[5], 0, i1234, 'shineGraphic')
  return i1234
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1236 = root || request.c( 'LunaController' )
  var i1237 = data
  i1236.LimitTimePlay = !!i1237[0]
  i1236.TimePlay = i1237[1]
  request.r(i1237[2], i1237[3], 0, i1236, 'BGM')
  i1236.LimitCountClick = !!i1237[4]
  i1236.MaxCountClick = i1237[5]
  i1236.LimitCountIncubate = !!i1237[6]
  i1236.MaxCountIncubate = i1237[7]
  i1236.LimitCountHatch = !!i1237[8]
  i1236.MaxCountHatch = i1237[9]
  request.r(i1237[10], i1237[11], 0, i1236, 'musicSource')
  var i1239 = i1237[12]
  var i1238 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i1239.length; i += 2) {
  request.r(i1239[i + 0], i1239[i + 1], 1, i1238, '')
  }
  i1236.CTA = i1238
  request.r(i1237[13], i1237[14], 0, i1236, 'endCard')
  return i1236
}

Deserializers["IconAmountView"] = function (request, data, root) {
  var i1242 = root || request.c( 'IconAmountView' )
  var i1243 = data
  request.r(i1243[0], i1243[1], 0, i1242, 'icon')
  request.r(i1243[2], i1243[3], 0, i1242, 'amount')
  return i1242
}

Deserializers["PlayableHoldButton"] = function (request, data, root) {
  var i1244 = root || request.c( 'PlayableHoldButton' )
  var i1245 = data
  i1244.duration = i1245[0]
  request.r(i1245[1], i1245[2], 0, i1244, 'fill')
  i1244.onHold = request.d('System.Action', i1245[3], i1244.onHold)
  return i1244
}

Deserializers["System.Action"] = function (request, data, root) {
  var i1246 = root || request.c( 'System.Action' )
  var i1247 = data
  return i1246
}

Deserializers["PetRowView"] = function (request, data, root) {
  var i1248 = root || request.c( 'PetRowView' )
  var i1249 = data
  request.r(i1249[0], i1249[1], 0, i1248, 'content')
  request.r(i1249[2], i1249[3], 0, i1248, 'thumbnail')
  request.r(i1249[4], i1249[5], 0, i1248, 'unequip')
  return i1248
}

Deserializers["IncubateRowView"] = function (request, data, root) {
  var i1250 = root || request.c( 'IncubateRowView' )
  var i1251 = data
  request.r(i1251[0], i1251[1], 0, i1250, 'thumbnail')
  request.r(i1251[2], i1251[3], 0, i1250, 'progressFill')
  request.r(i1251[4], i1251[5], 0, i1250, 'content')
  request.r(i1251[6], i1251[7], 0, i1250, 'open')
  request.r(i1251[8], i1251[9], 0, i1250, 'opening')
  return i1250
}

Deserializers["BagCellView"] = function (request, data, root) {
  var i1252 = root || request.c( 'BagCellView' )
  var i1253 = data
  request.r(i1253[0], i1253[1], 0, i1252, 'button')
  request.r(i1253[2], i1253[3], 0, i1252, 'thumbnail')
  request.r(i1253[4], i1253[5], 0, i1252, 'highlight')
  request.r(i1253[6], i1253[7], 0, i1252, 'exposeMark')
  request.r(i1253[8], i1253[9], 0, i1252, 'amount')
  return i1252
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i1254 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i1255 = data
  i1254.m_Spacing = i1255[0]
  i1254.m_ChildForceExpandWidth = !!i1255[1]
  i1254.m_ChildForceExpandHeight = !!i1255[2]
  i1254.m_ChildControlWidth = !!i1255[3]
  i1254.m_ChildControlHeight = !!i1255[4]
  i1254.m_ChildScaleWidth = !!i1255[5]
  i1254.m_ChildScaleHeight = !!i1255[6]
  i1254.m_ReverseArrangement = !!i1255[7]
  i1254.m_Padding = UnityEngine.RectOffset.FromPaddings(i1255[8], i1255[9], i1255[10], i1255[11])
  i1254.m_ChildAlignment = i1255[12]
  return i1254
}

Deserializers["QuickSlotView"] = function (request, data, root) {
  var i1256 = root || request.c( 'QuickSlotView' )
  var i1257 = data
  request.r(i1257[0], i1257[1], 0, i1256, 'button')
  request.r(i1257[2], i1257[3], 0, i1256, 'thumbnail')
  request.r(i1257[4], i1257[5], 0, i1256, 'highlight')
  request.r(i1257[6], i1257[7], 0, i1256, 'content')
  return i1256
}

Deserializers["IndexZoneView"] = function (request, data, root) {
  var i1258 = root || request.c( 'IndexZoneView' )
  var i1259 = data
  request.r(i1259[0], i1259[1], 0, i1258, 'zoneName')
  request.r(i1259[2], i1259[3], 0, i1258, 'progress')
  request.r(i1259[4], i1259[5], 0, i1258, 'thumbnail')
  request.r(i1259[6], i1259[7], 0, i1258, 'progressFill')
  request.r(i1259[8], i1259[9], 0, i1258, 'petContent')
  request.r(i1259[10], i1259[11], 0, i1258, 'petTemplate')
  return i1258
}

Deserializers["IndexPetCellView"] = function (request, data, root) {
  var i1260 = root || request.c( 'IndexPetCellView' )
  var i1261 = data
  request.r(i1261[0], i1261[1], 0, i1260, 'button')
  request.r(i1261[2], i1261[3], 0, i1260, 'frame')
  request.r(i1261[4], i1261[5], 0, i1260, 'thumbnail')
  request.r(i1261[6], i1261[7], 0, i1260, 'petName')
  request.r(i1261[8], i1261[9], 0, i1260, 'selected')
  request.r(i1261[10], i1261[11], 0, i1260, 'mark')
  return i1260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1262 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1263 = data
  i1262.aspect = i1263[0]
  i1262.orthographic = !!i1263[1]
  i1262.orthographicSize = i1263[2]
  i1262.backgroundColor = new pc.Color(i1263[3], i1263[4], i1263[5], i1263[6])
  i1262.nearClipPlane = i1263[7]
  i1262.farClipPlane = i1263[8]
  i1262.fieldOfView = i1263[9]
  i1262.depth = i1263[10]
  i1262.clearFlags = i1263[11]
  i1262.cullingMask = i1263[12]
  i1262.rect = i1263[13]
  request.r(i1263[14], i1263[15], 0, i1262, 'targetTexture')
  i1262.usePhysicalProperties = !!i1263[16]
  i1262.focalLength = i1263[17]
  i1262.sensorSize = new pc.Vec2( i1263[18], i1263[19] )
  i1262.lensShift = new pc.Vec2( i1263[20], i1263[21] )
  i1262.gateFit = i1263[22]
  i1262.commandBufferCount = i1263[23]
  i1262.cameraType = i1263[24]
  i1262.enabled = !!i1263[25]
  return i1262
}

Deserializers["CameraController"] = function (request, data, root) {
  var i1264 = root || request.c( 'CameraController' )
  var i1265 = data
  request.r(i1265[0], i1265[1], 0, i1264, 'target')
  request.r(i1265[2], i1265[3], 0, i1264, 'controlledCamera')
  request.r(i1265[4], i1265[5], 0, i1264, 'cameraManager')
  request.r(i1265[6], i1265[7], 0, i1264, 'game')
  i1264.distance = i1265[8]
  i1264.initialVerticalAngle = i1265[9]
  i1264.initialHorizontalAngle = i1265[10]
  return i1264
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1267 = data
  i1266.ambientIntensity = i1267[0]
  i1266.reflectionIntensity = i1267[1]
  i1266.ambientMode = i1267[2]
  i1266.ambientLight = new pc.Color(i1267[3], i1267[4], i1267[5], i1267[6])
  i1266.ambientSkyColor = new pc.Color(i1267[7], i1267[8], i1267[9], i1267[10])
  i1266.ambientGroundColor = new pc.Color(i1267[11], i1267[12], i1267[13], i1267[14])
  i1266.ambientEquatorColor = new pc.Color(i1267[15], i1267[16], i1267[17], i1267[18])
  i1266.fogColor = new pc.Color(i1267[19], i1267[20], i1267[21], i1267[22])
  i1266.fogEndDistance = i1267[23]
  i1266.fogStartDistance = i1267[24]
  i1266.fogDensity = i1267[25]
  i1266.fog = !!i1267[26]
  request.r(i1267[27], i1267[28], 0, i1266, 'skybox')
  i1266.fogMode = i1267[29]
  var i1269 = i1267[30]
  var i1268 = []
  for(var i = 0; i < i1269.length; i += 1) {
    i1268.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1269[i + 0]) );
  }
  i1266.lightmaps = i1268
  i1266.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1267[31], i1266.lightProbes)
  i1266.lightmapsMode = i1267[32]
  i1266.mixedBakeMode = i1267[33]
  i1266.environmentLightingMode = i1267[34]
  i1266.ambientProbe = new pc.SphericalHarmonicsL2(i1267[35])
  request.r(i1267[36], i1267[37], 0, i1266, 'customReflection')
  request.r(i1267[38], i1267[39], 0, i1266, 'defaultReflection')
  i1266.defaultReflectionMode = i1267[40]
  i1266.defaultReflectionResolution = i1267[41]
  i1266.sunLightObjectId = i1267[42]
  i1266.pixelLightCount = i1267[43]
  i1266.defaultReflectionHDR = !!i1267[44]
  i1266.hasLightDataAsset = !!i1267[45]
  i1266.hasManualGenerate = !!i1267[46]
  return i1266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1273 = data
  request.r(i1273[0], i1273[1], 0, i1272, 'lightmapColor')
  request.r(i1273[2], i1273[3], 0, i1272, 'lightmapDirection')
  request.r(i1273[4], i1273[5], 0, i1272, 'shadowMask')
  return i1272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1274 = root || new UnityEngine.LightProbes()
  var i1275 = data
  return i1274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1280 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1281 = data
  var i1283 = i1281[0]
  var i1282 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1283.length; i += 1) {
    i1282.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1283[i + 0]));
  }
  i1280.ShaderCompilationErrors = i1282
  i1280.name = i1281[1]
  i1280.guid = i1281[2]
  var i1285 = i1281[3]
  var i1284 = []
  for(var i = 0; i < i1285.length; i += 1) {
    i1284.push( i1285[i + 0] );
  }
  i1280.shaderDefinedKeywords = i1284
  var i1287 = i1281[4]
  var i1286 = []
  for(var i = 0; i < i1287.length; i += 1) {
    i1286.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1287[i + 0]) );
  }
  i1280.passes = i1286
  var i1289 = i1281[5]
  var i1288 = []
  for(var i = 0; i < i1289.length; i += 1) {
    i1288.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1289[i + 0]) );
  }
  i1280.usePasses = i1288
  var i1291 = i1281[6]
  var i1290 = []
  for(var i = 0; i < i1291.length; i += 1) {
    i1290.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1291[i + 0]) );
  }
  i1280.defaultParameterValues = i1290
  request.r(i1281[7], i1281[8], 0, i1280, 'unityFallbackShader')
  i1280.readDepth = !!i1281[9]
  i1280.hasDepthOnlyPass = !!i1281[10]
  i1280.isCreatedByShaderGraph = !!i1281[11]
  i1280.disableBatching = !!i1281[12]
  i1280.compiled = !!i1281[13]
  return i1280
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1295 = data
  i1294.shaderName = i1295[0]
  i1294.errorMessage = i1295[1]
  return i1294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1300 = root || new pc.UnityShaderPass()
  var i1301 = data
  i1300.id = i1301[0]
  i1300.subShaderIndex = i1301[1]
  i1300.name = i1301[2]
  i1300.passType = i1301[3]
  i1300.grabPassTextureName = i1301[4]
  i1300.usePass = !!i1301[5]
  i1300.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[6], i1300.zTest)
  i1300.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[7], i1300.zWrite)
  i1300.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[8], i1300.culling)
  i1300.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1301[9], i1300.blending)
  i1300.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1301[10], i1300.alphaBlending)
  i1300.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[11], i1300.colorWriteMask)
  i1300.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[12], i1300.offsetUnits)
  i1300.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[13], i1300.offsetFactor)
  i1300.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[14], i1300.stencilRef)
  i1300.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[15], i1300.stencilReadMask)
  i1300.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1301[16], i1300.stencilWriteMask)
  i1300.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1301[17], i1300.stencilOp)
  i1300.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1301[18], i1300.stencilOpFront)
  i1300.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1301[19], i1300.stencilOpBack)
  var i1303 = i1301[20]
  var i1302 = []
  for(var i = 0; i < i1303.length; i += 1) {
    i1302.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1303[i + 0]) );
  }
  i1300.tags = i1302
  var i1305 = i1301[21]
  var i1304 = []
  for(var i = 0; i < i1305.length; i += 1) {
    i1304.push( i1305[i + 0] );
  }
  i1300.passDefinedKeywords = i1304
  var i1307 = i1301[22]
  var i1306 = []
  for(var i = 0; i < i1307.length; i += 1) {
    i1306.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1307[i + 0]) );
  }
  i1300.passDefinedKeywordGroups = i1306
  var i1309 = i1301[23]
  var i1308 = []
  for(var i = 0; i < i1309.length; i += 1) {
    i1308.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1309[i + 0]) );
  }
  i1300.variants = i1308
  var i1311 = i1301[24]
  var i1310 = []
  for(var i = 0; i < i1311.length; i += 1) {
    i1310.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1311[i + 0]) );
  }
  i1300.excludedVariants = i1310
  i1300.hasDepthReader = !!i1301[25]
  return i1300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1313 = data
  i1312.val = i1313[0]
  i1312.name = i1313[1]
  return i1312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1314 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1315 = data
  i1314.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1315[0], i1314.src)
  i1314.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1315[1], i1314.dst)
  i1314.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1315[2], i1314.op)
  return i1314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1316 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1317 = data
  i1316.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1317[0], i1316.pass)
  i1316.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1317[1], i1316.fail)
  i1316.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1317[2], i1316.zFail)
  i1316.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1317[3], i1316.comp)
  return i1316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1321 = data
  i1320.name = i1321[0]
  i1320.value = i1321[1]
  return i1320
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1324 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1325 = data
  var i1327 = i1325[0]
  var i1326 = []
  for(var i = 0; i < i1327.length; i += 1) {
    i1326.push( i1327[i + 0] );
  }
  i1324.keywords = i1326
  i1324.hasDiscard = !!i1325[1]
  return i1324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1331 = data
  i1330.passId = i1331[0]
  i1330.subShaderIndex = i1331[1]
  var i1333 = i1331[2]
  var i1332 = []
  for(var i = 0; i < i1333.length; i += 1) {
    i1332.push( i1333[i + 0] );
  }
  i1330.keywords = i1332
  i1330.vertexProgram = i1331[3]
  i1330.fragmentProgram = i1331[4]
  i1330.exportedForWebGl2 = !!i1331[5]
  i1330.readDepth = !!i1331[6]
  return i1330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1336 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1337 = data
  request.r(i1337[0], i1337[1], 0, i1336, 'shader')
  i1336.pass = i1337[2]
  return i1336
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1340 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1341 = data
  i1340.name = i1341[0]
  i1340.type = i1341[1]
  i1340.value = new pc.Vec4( i1341[2], i1341[3], i1341[4], i1341[5] )
  i1340.textureValue = i1341[6]
  i1340.shaderPropertyFlag = i1341[7]
  return i1340
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1343 = data
  i1342.name = i1343[0]
  request.r(i1343[1], i1343[2], 0, i1342, 'texture')
  i1342.aabb = i1343[3]
  i1342.vertices = i1343[4]
  i1342.triangles = i1343[5]
  i1342.textureRect = UnityEngine.Rect.MinMaxRect(i1343[6], i1343[7], i1343[8], i1343[9])
  i1342.packedRect = UnityEngine.Rect.MinMaxRect(i1343[10], i1343[11], i1343[12], i1343[13])
  i1342.border = new pc.Vec4( i1343[14], i1343[15], i1343[16], i1343[17] )
  i1342.transparency = i1343[18]
  i1342.bounds = i1343[19]
  i1342.pixelsPerUnit = i1343[20]
  i1342.textureWidth = i1343[21]
  i1342.textureHeight = i1343[22]
  i1342.nativeSize = new pc.Vec2( i1343[23], i1343[24] )
  i1342.pivot = new pc.Vec2( i1343[25], i1343[26] )
  i1342.textureRectOffset = new pc.Vec2( i1343[27], i1343[28] )
  return i1342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1344 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1345 = data
  i1344.name = i1345[0]
  return i1344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1347 = data
  i1346.name = i1347[0]
  i1346.wrapMode = i1347[1]
  i1346.isLooping = !!i1347[2]
  i1346.length = i1347[3]
  var i1349 = i1347[4]
  var i1348 = []
  for(var i = 0; i < i1349.length; i += 1) {
    i1348.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1349[i + 0]) );
  }
  i1346.curves = i1348
  var i1351 = i1347[5]
  var i1350 = []
  for(var i = 0; i < i1351.length; i += 1) {
    i1350.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1351[i + 0]) );
  }
  i1346.events = i1350
  i1346.halfPrecision = !!i1347[6]
  i1346._frameRate = i1347[7]
  i1346.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1347[8], i1346.localBounds)
  i1346.hasMuscleCurves = !!i1347[9]
  var i1353 = i1347[10]
  var i1352 = []
  for(var i = 0; i < i1353.length; i += 1) {
    i1352.push( i1353[i + 0] );
  }
  i1346.clipMuscleConstant = i1352
  i1346.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1347[11], i1346.clipBindingConstant)
  return i1346
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1356 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1357 = data
  i1356.path = i1357[0]
  i1356.hash = i1357[1]
  i1356.componentType = i1357[2]
  i1356.property = i1357[3]
  i1356.keys = i1357[4]
  var i1359 = i1357[5]
  var i1358 = []
  for(var i = 0; i < i1359.length; i += 1) {
    i1358.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1359[i + 0]) );
  }
  i1356.objectReferenceKeys = i1358
  return i1356
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1363 = data
  i1362.time = i1363[0]
  request.r(i1363[1], i1363[2], 0, i1362, 'value')
  return i1362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1366 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1367 = data
  i1366.functionName = i1367[0]
  i1366.floatParameter = i1367[1]
  i1366.intParameter = i1367[2]
  i1366.stringParameter = i1367[3]
  request.r(i1367[4], i1367[5], 0, i1366, 'objectReferenceParameter')
  i1366.time = i1367[6]
  return i1366
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1369 = data
  i1368.center = new pc.Vec3( i1369[0], i1369[1], i1369[2] )
  i1368.extends = new pc.Vec3( i1369[3], i1369[4], i1369[5] )
  return i1368
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1373 = data
  var i1375 = i1373[0]
  var i1374 = []
  for(var i = 0; i < i1375.length; i += 1) {
    i1374.push( i1375[i + 0] );
  }
  i1372.genericBindings = i1374
  var i1377 = i1373[1]
  var i1376 = []
  for(var i = 0; i < i1377.length; i += 1) {
    i1376.push( i1377[i + 0] );
  }
  i1372.pptrCurveMapping = i1376
  return i1372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1378 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1379 = data
  i1378.name = i1379[0]
  i1378.ascent = i1379[1]
  i1378.originalLineHeight = i1379[2]
  i1378.fontSize = i1379[3]
  var i1381 = i1379[4]
  var i1380 = []
  for(var i = 0; i < i1381.length; i += 1) {
    i1380.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1381[i + 0]) );
  }
  i1378.characterInfo = i1380
  request.r(i1379[5], i1379[6], 0, i1378, 'texture')
  i1378.originalFontSize = i1379[7]
  return i1378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1385 = data
  i1384.index = i1385[0]
  i1384.advance = i1385[1]
  i1384.bearing = i1385[2]
  i1384.glyphWidth = i1385[3]
  i1384.glyphHeight = i1385[4]
  i1384.minX = i1385[5]
  i1384.maxX = i1385[6]
  i1384.minY = i1385[7]
  i1384.maxY = i1385[8]
  i1384.uvBottomLeftX = i1385[9]
  i1384.uvBottomLeftY = i1385[10]
  i1384.uvBottomRightX = i1385[11]
  i1384.uvBottomRightY = i1385[12]
  i1384.uvTopLeftX = i1385[13]
  i1384.uvTopLeftY = i1385[14]
  i1384.uvTopRightX = i1385[15]
  i1384.uvTopRightY = i1385[16]
  return i1384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1387 = data
  i1386.name = i1387[0]
  var i1389 = i1387[1]
  var i1388 = []
  for(var i = 0; i < i1389.length; i += 1) {
    i1388.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1389[i + 0]) );
  }
  i1386.layers = i1388
  var i1391 = i1387[2]
  var i1390 = []
  for(var i = 0; i < i1391.length; i += 1) {
    i1390.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1391[i + 0]) );
  }
  i1386.parameters = i1390
  i1386.animationClips = i1387[3]
  i1386.avatarUnsupported = i1387[4]
  return i1386
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1395 = data
  i1394.name = i1395[0]
  i1394.defaultWeight = i1395[1]
  i1394.blendingMode = i1395[2]
  i1394.avatarMask = i1395[3]
  i1394.syncedLayerIndex = i1395[4]
  i1394.syncedLayerAffectsTiming = !!i1395[5]
  i1394.syncedLayers = i1395[6]
  i1394.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1395[7], i1394.stateMachine)
  return i1394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1397 = data
  i1396.id = i1397[0]
  i1396.name = i1397[1]
  i1396.path = i1397[2]
  var i1399 = i1397[3]
  var i1398 = []
  for(var i = 0; i < i1399.length; i += 1) {
    i1398.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1399[i + 0]) );
  }
  i1396.states = i1398
  var i1401 = i1397[4]
  var i1400 = []
  for(var i = 0; i < i1401.length; i += 1) {
    i1400.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1401[i + 0]) );
  }
  i1396.machines = i1400
  var i1403 = i1397[5]
  var i1402 = []
  for(var i = 0; i < i1403.length; i += 1) {
    i1402.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1403[i + 0]) );
  }
  i1396.entryStateTransitions = i1402
  var i1405 = i1397[6]
  var i1404 = []
  for(var i = 0; i < i1405.length; i += 1) {
    i1404.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1405[i + 0]) );
  }
  i1396.exitStateTransitions = i1404
  var i1407 = i1397[7]
  var i1406 = []
  for(var i = 0; i < i1407.length; i += 1) {
    i1406.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1407[i + 0]) );
  }
  i1396.anyStateTransitions = i1406
  i1396.defaultStateId = i1397[8]
  return i1396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1411 = data
  i1410.id = i1411[0]
  i1410.name = i1411[1]
  i1410.cycleOffset = i1411[2]
  i1410.cycleOffsetParameter = i1411[3]
  i1410.cycleOffsetParameterActive = !!i1411[4]
  i1410.mirror = !!i1411[5]
  i1410.mirrorParameter = i1411[6]
  i1410.mirrorParameterActive = !!i1411[7]
  i1410.motionId = i1411[8]
  i1410.nameHash = i1411[9]
  i1410.fullPathHash = i1411[10]
  i1410.speed = i1411[11]
  i1410.speedParameter = i1411[12]
  i1410.speedParameterActive = !!i1411[13]
  i1410.tag = i1411[14]
  i1410.tagHash = i1411[15]
  i1410.writeDefaultValues = !!i1411[16]
  var i1413 = i1411[17]
  var i1412 = []
  for(var i = 0; i < i1413.length; i += 2) {
  request.r(i1413[i + 0], i1413[i + 1], 2, i1412, '')
  }
  i1410.behaviours = i1412
  var i1415 = i1411[18]
  var i1414 = []
  for(var i = 0; i < i1415.length; i += 1) {
    i1414.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1415[i + 0]) );
  }
  i1410.transitions = i1414
  return i1410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1420 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1421 = data
  i1420.fullPath = i1421[0]
  i1420.canTransitionToSelf = !!i1421[1]
  i1420.duration = i1421[2]
  i1420.exitTime = i1421[3]
  i1420.hasExitTime = !!i1421[4]
  i1420.hasFixedDuration = !!i1421[5]
  i1420.interruptionSource = i1421[6]
  i1420.offset = i1421[7]
  i1420.orderedInterruption = !!i1421[8]
  i1420.destinationStateId = i1421[9]
  i1420.isExit = !!i1421[10]
  i1420.mute = !!i1421[11]
  i1420.solo = !!i1421[12]
  var i1423 = i1421[13]
  var i1422 = []
  for(var i = 0; i < i1423.length; i += 1) {
    i1422.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1423[i + 0]) );
  }
  i1420.conditions = i1422
  return i1420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1426 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1427 = data
  i1426.mode = i1427[0]
  i1426.parameter = i1427[1]
  i1426.threshold = i1427[2]
  return i1426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1432 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1433 = data
  i1432.destinationStateId = i1433[0]
  i1432.isExit = !!i1433[1]
  i1432.mute = !!i1433[2]
  i1432.solo = !!i1433[3]
  var i1435 = i1433[4]
  var i1434 = []
  for(var i = 0; i < i1435.length; i += 1) {
    i1434.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1435[i + 0]) );
  }
  i1432.conditions = i1434
  return i1432
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1439 = data
  i1438.defaultBool = !!i1439[0]
  i1438.defaultFloat = i1439[1]
  i1438.defaultInt = i1439[2]
  i1438.name = i1439[3]
  i1438.nameHash = i1439[4]
  i1438.type = i1439[5]
  return i1438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController"] = function (request, data, root) {
  var i1440 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController' )
  var i1441 = data
  i1440.name = i1441[0]
  request.r(i1441[1], i1441[2], 0, i1440, '_runtimeAnimatorController')
  var i1443 = i1441[3]
  var i1442 = []
  for(var i = 0; i < i1443.length; i += 2) {
  request.r(i1443[i + 0], i1443[i + 1], 2, i1442, '')
  }
  i1440._originalAnimationClips = i1442
  var i1445 = i1441[4]
  var i1444 = []
  for(var i = 0; i < i1445.length; i += 2) {
  request.r(i1445[i + 0], i1445[i + 1], 2, i1444, '')
  }
  i1440._overrideAnimationClips = i1444
  var i1447 = i1441[5]
  var i1446 = []
  for(var i = 0; i < i1447.length; i += 2) {
  request.r(i1447[i + 0], i1447[i + 1], 2, i1446, '')
  }
  i1440._animationClips = i1446
  var i1449 = i1441[6]
  var i1448 = []
  for(var i = 0; i < i1449.length; i += 1) {
    i1448.push( request.d('UnityEngine.AnimationClipPair', i1449[i + 0]) );
  }
  i1440._animationClipPairs = i1448
  return i1440
}

Deserializers["UnityEngine.AnimationClipPair"] = function (request, data, root) {
  var i1454 = root || request.c( 'UnityEngine.AnimationClipPair' )
  var i1455 = data
  request.r(i1455[0], i1455[1], 0, i1454, 'originalClip')
  request.r(i1455[2], i1455[3], 0, i1454, 'overrideClip')
  return i1454
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1456 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1457 = data
  i1456.name = i1457[0]
  i1456.bytes64 = i1457[1]
  i1456.data = i1457[2]
  return i1456
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1458 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1459 = data
  i1458.normalStyle = i1459[0]
  i1458.normalSpacingOffset = i1459[1]
  i1458.boldStyle = i1459[2]
  i1458.boldSpacing = i1459[3]
  i1458.italicStyle = i1459[4]
  i1458.tabSize = i1459[5]
  request.r(i1459[6], i1459[7], 0, i1458, 'atlas')
  i1458.m_SourceFontFileGUID = i1459[8]
  i1458.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1459[9], i1458.m_CreationSettings)
  request.r(i1459[10], i1459[11], 0, i1458, 'm_SourceFontFile')
  i1458.m_SourceFontFilePath = i1459[12]
  i1458.m_AtlasPopulationMode = i1459[13]
  i1458.InternalDynamicOS = !!i1459[14]
  var i1461 = i1459[15]
  var i1460 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1461.length; i += 1) {
    i1460.add(request.d('UnityEngine.TextCore.Glyph', i1461[i + 0]));
  }
  i1458.m_GlyphTable = i1460
  var i1463 = i1459[16]
  var i1462 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1463.length; i += 1) {
    i1462.add(request.d('TMPro.TMP_Character', i1463[i + 0]));
  }
  i1458.m_CharacterTable = i1462
  var i1465 = i1459[17]
  var i1464 = []
  for(var i = 0; i < i1465.length; i += 2) {
  request.r(i1465[i + 0], i1465[i + 1], 2, i1464, '')
  }
  i1458.m_AtlasTextures = i1464
  i1458.m_AtlasTextureIndex = i1459[18]
  i1458.m_IsMultiAtlasTexturesEnabled = !!i1459[19]
  i1458.m_GetFontFeatures = !!i1459[20]
  i1458.m_ClearDynamicDataOnBuild = !!i1459[21]
  i1458.m_AtlasWidth = i1459[22]
  i1458.m_AtlasHeight = i1459[23]
  i1458.m_AtlasPadding = i1459[24]
  i1458.m_AtlasRenderMode = i1459[25]
  var i1467 = i1459[26]
  var i1466 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1467.length; i += 1) {
    i1466.add(request.d('UnityEngine.TextCore.GlyphRect', i1467[i + 0]));
  }
  i1458.m_UsedGlyphRects = i1466
  var i1469 = i1459[27]
  var i1468 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1469.length; i += 1) {
    i1468.add(request.d('UnityEngine.TextCore.GlyphRect', i1469[i + 0]));
  }
  i1458.m_FreeGlyphRects = i1468
  i1458.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1459[28], i1458.m_FontFeatureTable)
  i1458.m_ShouldReimportFontFeatures = !!i1459[29]
  var i1471 = i1459[30]
  var i1470 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1471.length; i += 2) {
  request.r(i1471[i + 0], i1471[i + 1], 1, i1470, '')
  }
  i1458.m_FallbackFontAssetTable = i1470
  var i1473 = i1459[31]
  var i1472 = []
  for(var i = 0; i < i1473.length; i += 1) {
    i1472.push( request.d('TMPro.TMP_FontWeightPair', i1473[i + 0]) );
  }
  i1458.m_FontWeightTable = i1472
  var i1475 = i1459[32]
  var i1474 = []
  for(var i = 0; i < i1475.length; i += 1) {
    i1474.push( request.d('TMPro.TMP_FontWeightPair', i1475[i + 0]) );
  }
  i1458.fontWeights = i1474
  i1458.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1459[33], i1458.m_fontInfo)
  var i1477 = i1459[34]
  var i1476 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1477.length; i += 1) {
    i1476.add(request.d('TMPro.TMP_Glyph', i1477[i + 0]));
  }
  i1458.m_glyphInfoList = i1476
  i1458.m_KerningTable = request.d('TMPro.KerningTable', i1459[35], i1458.m_KerningTable)
  var i1479 = i1459[36]
  var i1478 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1479.length; i += 2) {
  request.r(i1479[i + 0], i1479[i + 1], 1, i1478, '')
  }
  i1458.fallbackFontAssets = i1478
  i1458.m_Version = i1459[37]
  i1458.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1459[38], i1458.m_FaceInfo)
  request.r(i1459[39], i1459[40], 0, i1458, 'm_Material')
  return i1458
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1480 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1481 = data
  i1480.sourceFontFileName = i1481[0]
  i1480.sourceFontFileGUID = i1481[1]
  i1480.faceIndex = i1481[2]
  i1480.pointSizeSamplingMode = i1481[3]
  i1480.pointSize = i1481[4]
  i1480.padding = i1481[5]
  i1480.paddingMode = i1481[6]
  i1480.packingMode = i1481[7]
  i1480.atlasWidth = i1481[8]
  i1480.atlasHeight = i1481[9]
  i1480.characterSetSelectionMode = i1481[10]
  i1480.characterSequence = i1481[11]
  i1480.referencedFontAssetGUID = i1481[12]
  i1480.referencedTextAssetGUID = i1481[13]
  i1480.fontStyle = i1481[14]
  i1480.fontStyleModifier = i1481[15]
  i1480.renderMode = i1481[16]
  i1480.includeFontFeatures = !!i1481[17]
  return i1480
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1484 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1485 = data
  i1484.m_Index = i1485[0]
  i1484.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1485[1], i1484.m_Metrics)
  i1484.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1485[2], i1484.m_GlyphRect)
  i1484.m_Scale = i1485[3]
  i1484.m_AtlasIndex = i1485[4]
  i1484.m_ClassDefinitionType = i1485[5]
  return i1484
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1486 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1487 = data
  i1486.m_Width = i1487[0]
  i1486.m_Height = i1487[1]
  i1486.m_HorizontalBearingX = i1487[2]
  i1486.m_HorizontalBearingY = i1487[3]
  i1486.m_HorizontalAdvance = i1487[4]
  return i1486
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1488 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1489 = data
  i1488.m_X = i1489[0]
  i1488.m_Y = i1489[1]
  i1488.m_Width = i1489[2]
  i1488.m_Height = i1489[3]
  return i1488
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1492 = root || request.c( 'TMPro.TMP_Character' )
  var i1493 = data
  i1492.m_ElementType = i1493[0]
  i1492.m_Unicode = i1493[1]
  i1492.m_GlyphIndex = i1493[2]
  i1492.m_Scale = i1493[3]
  return i1492
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1498 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1499 = data
  var i1501 = i1499[0]
  var i1500 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1501.length; i += 1) {
    i1500.add(request.d('TMPro.MultipleSubstitutionRecord', i1501[i + 0]));
  }
  i1498.m_MultipleSubstitutionRecords = i1500
  var i1503 = i1499[1]
  var i1502 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1503.length; i += 1) {
    i1502.add(request.d('TMPro.LigatureSubstitutionRecord', i1503[i + 0]));
  }
  i1498.m_LigatureSubstitutionRecords = i1502
  var i1505 = i1499[2]
  var i1504 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1505.length; i += 1) {
    i1504.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1505[i + 0]));
  }
  i1498.m_GlyphPairAdjustmentRecords = i1504
  var i1507 = i1499[3]
  var i1506 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1507.length; i += 1) {
    i1506.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1507[i + 0]));
  }
  i1498.m_MarkToBaseAdjustmentRecords = i1506
  var i1509 = i1499[4]
  var i1508 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1509.length; i += 1) {
    i1508.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1509[i + 0]));
  }
  i1498.m_MarkToMarkAdjustmentRecords = i1508
  return i1498
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1512 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1513 = data
  i1512.m_TargetGlyphID = i1513[0]
  i1512.m_SubstituteGlyphIDs = i1513[1]
  return i1512
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1516 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1517 = data
  i1516.m_ComponentGlyphIDs = i1517[0]
  i1516.m_LigatureGlyphID = i1517[1]
  return i1516
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1520 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1521 = data
  i1520.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1521[0], i1520.m_FirstAdjustmentRecord)
  i1520.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1521[1], i1520.m_SecondAdjustmentRecord)
  i1520.m_FeatureLookupFlags = i1521[2]
  return i1520
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1522 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1523 = data
  i1522.m_GlyphIndex = i1523[0]
  i1522.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1523[1], i1522.m_GlyphValueRecord)
  return i1522
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1524 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1525 = data
  i1524.m_XPlacement = i1525[0]
  i1524.m_YPlacement = i1525[1]
  i1524.m_XAdvance = i1525[2]
  i1524.m_YAdvance = i1525[3]
  return i1524
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1528 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1529 = data
  i1528.m_BaseGlyphID = i1529[0]
  i1528.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1529[1], i1528.m_BaseGlyphAnchorPoint)
  i1528.m_MarkGlyphID = i1529[2]
  i1528.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1529[3], i1528.m_MarkPositionAdjustment)
  return i1528
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1530 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1531 = data
  i1530.m_XCoordinate = i1531[0]
  i1530.m_YCoordinate = i1531[1]
  return i1530
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1532 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1533 = data
  i1532.m_XPositionAdjustment = i1533[0]
  i1532.m_YPositionAdjustment = i1533[1]
  return i1532
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1536 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1537 = data
  i1536.m_BaseMarkGlyphID = i1537[0]
  i1536.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1537[1], i1536.m_BaseMarkGlyphAnchorPoint)
  i1536.m_CombiningMarkGlyphID = i1537[2]
  i1536.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1537[3], i1536.m_CombiningMarkPositionAdjustment)
  return i1536
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1542 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1543 = data
  request.r(i1543[0], i1543[1], 0, i1542, 'regularTypeface')
  request.r(i1543[2], i1543[3], 0, i1542, 'italicTypeface')
  return i1542
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1544 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1545 = data
  i1544.Name = i1545[0]
  i1544.PointSize = i1545[1]
  i1544.Scale = i1545[2]
  i1544.CharacterCount = i1545[3]
  i1544.LineHeight = i1545[4]
  i1544.Baseline = i1545[5]
  i1544.Ascender = i1545[6]
  i1544.CapHeight = i1545[7]
  i1544.Descender = i1545[8]
  i1544.CenterLine = i1545[9]
  i1544.SuperscriptOffset = i1545[10]
  i1544.SubscriptOffset = i1545[11]
  i1544.SubSize = i1545[12]
  i1544.Underline = i1545[13]
  i1544.UnderlineThickness = i1545[14]
  i1544.strikethrough = i1545[15]
  i1544.strikethroughThickness = i1545[16]
  i1544.TabWidth = i1545[17]
  i1544.Padding = i1545[18]
  i1544.AtlasWidth = i1545[19]
  i1544.AtlasHeight = i1545[20]
  return i1544
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1548 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1549 = data
  i1548.id = i1549[0]
  i1548.x = i1549[1]
  i1548.y = i1549[2]
  i1548.width = i1549[3]
  i1548.height = i1549[4]
  i1548.xOffset = i1549[5]
  i1548.yOffset = i1549[6]
  i1548.xAdvance = i1549[7]
  i1548.scale = i1549[8]
  return i1548
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1550 = root || request.c( 'TMPro.KerningTable' )
  var i1551 = data
  var i1553 = i1551[0]
  var i1552 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1553.length; i += 1) {
    i1552.add(request.d('TMPro.KerningPair', i1553[i + 0]));
  }
  i1550.kerningPairs = i1552
  return i1550
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1556 = root || request.c( 'TMPro.KerningPair' )
  var i1557 = data
  i1556.xOffset = i1557[0]
  i1556.m_FirstGlyph = i1557[1]
  i1556.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1557[2], i1556.m_FirstGlyphAdjustments)
  i1556.m_SecondGlyph = i1557[3]
  i1556.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1557[4], i1556.m_SecondGlyphAdjustments)
  i1556.m_IgnoreSpacingAdjustments = !!i1557[5]
  return i1556
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1558 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1559 = data
  i1558.m_FaceIndex = i1559[0]
  i1558.m_FamilyName = i1559[1]
  i1558.m_StyleName = i1559[2]
  i1558.m_PointSize = i1559[3]
  i1558.m_Scale = i1559[4]
  i1558.m_UnitsPerEM = i1559[5]
  i1558.m_LineHeight = i1559[6]
  i1558.m_AscentLine = i1559[7]
  i1558.m_CapLine = i1559[8]
  i1558.m_MeanLine = i1559[9]
  i1558.m_Baseline = i1559[10]
  i1558.m_DescentLine = i1559[11]
  i1558.m_SuperscriptOffset = i1559[12]
  i1558.m_SuperscriptSize = i1559[13]
  i1558.m_SubscriptOffset = i1559[14]
  i1558.m_SubscriptSize = i1559[15]
  i1558.m_UnderlineOffset = i1559[16]
  i1558.m_UnderlineThickness = i1559[17]
  i1558.m_StrikethroughOffset = i1559[18]
  i1558.m_StrikethroughThickness = i1559[19]
  i1558.m_TabWidth = i1559[20]
  return i1558
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1560 = root || request.c( 'TMPro.TMP_Settings' )
  var i1561 = data
  i1560.assetVersion = i1561[0]
  i1560.m_TextWrappingMode = i1561[1]
  i1560.m_enableKerning = !!i1561[2]
  var i1563 = i1561[3]
  var i1562 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1563.length; i += 1) {
    i1562.add(i1563[i + 0]);
  }
  i1560.m_ActiveFontFeatures = i1562
  i1560.m_enableExtraPadding = !!i1561[4]
  i1560.m_enableTintAllSprites = !!i1561[5]
  i1560.m_enableParseEscapeCharacters = !!i1561[6]
  i1560.m_EnableRaycastTarget = !!i1561[7]
  i1560.m_GetFontFeaturesAtRuntime = !!i1561[8]
  i1560.m_missingGlyphCharacter = i1561[9]
  i1560.m_ClearDynamicDataOnBuild = !!i1561[10]
  i1560.m_warningsDisabled = !!i1561[11]
  request.r(i1561[12], i1561[13], 0, i1560, 'm_defaultFontAsset')
  i1560.m_defaultFontAssetPath = i1561[14]
  i1560.m_defaultFontSize = i1561[15]
  i1560.m_defaultAutoSizeMinRatio = i1561[16]
  i1560.m_defaultAutoSizeMaxRatio = i1561[17]
  i1560.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1561[18], i1561[19] )
  i1560.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1561[20], i1561[21] )
  i1560.m_autoSizeTextContainer = !!i1561[22]
  i1560.m_IsTextObjectScaleStatic = !!i1561[23]
  var i1565 = i1561[24]
  var i1564 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1565.length; i += 2) {
  request.r(i1565[i + 0], i1565[i + 1], 1, i1564, '')
  }
  i1560.m_fallbackFontAssets = i1564
  i1560.m_matchMaterialPreset = !!i1561[25]
  i1560.m_HideSubTextObjects = !!i1561[26]
  request.r(i1561[27], i1561[28], 0, i1560, 'm_defaultSpriteAsset')
  i1560.m_defaultSpriteAssetPath = i1561[29]
  i1560.m_enableEmojiSupport = !!i1561[30]
  i1560.m_MissingCharacterSpriteUnicode = i1561[31]
  var i1567 = i1561[32]
  var i1566 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1567.length; i += 2) {
  request.r(i1567[i + 0], i1567[i + 1], 1, i1566, '')
  }
  i1560.m_EmojiFallbackTextAssets = i1566
  i1560.m_defaultColorGradientPresetsPath = i1561[33]
  request.r(i1561[34], i1561[35], 0, i1560, 'm_defaultStyleSheet')
  i1560.m_StyleSheetsResourcePath = i1561[36]
  request.r(i1561[37], i1561[38], 0, i1560, 'm_leadingCharacters')
  request.r(i1561[39], i1561[40], 0, i1560, 'm_followingCharacters')
  i1560.m_UseModernHangulLineBreakingRules = !!i1561[41]
  return i1560
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1570 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1571 = data
  request.r(i1571[0], i1571[1], 0, i1570, 'spriteSheet')
  var i1573 = i1571[2]
  var i1572 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1573.length; i += 1) {
    i1572.add(request.d('TMPro.TMP_Sprite', i1573[i + 0]));
  }
  i1570.spriteInfoList = i1572
  var i1575 = i1571[3]
  var i1574 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1575.length; i += 2) {
  request.r(i1575[i + 0], i1575[i + 1], 1, i1574, '')
  }
  i1570.fallbackSpriteAssets = i1574
  var i1577 = i1571[4]
  var i1576 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1577.length; i += 1) {
    i1576.add(request.d('TMPro.TMP_SpriteCharacter', i1577[i + 0]));
  }
  i1570.m_SpriteCharacterTable = i1576
  var i1579 = i1571[5]
  var i1578 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1579.length; i += 1) {
    i1578.add(request.d('TMPro.TMP_SpriteGlyph', i1579[i + 0]));
  }
  i1570.m_GlyphTable = i1578
  i1570.m_Version = i1571[6]
  i1570.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1571[7], i1570.m_FaceInfo)
  request.r(i1571[8], i1571[9], 0, i1570, 'm_Material')
  return i1570
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1582 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1583 = data
  i1582.name = i1583[0]
  i1582.hashCode = i1583[1]
  i1582.unicode = i1583[2]
  i1582.pivot = new pc.Vec2( i1583[3], i1583[4] )
  request.r(i1583[5], i1583[6], 0, i1582, 'sprite')
  i1582.id = i1583[7]
  i1582.x = i1583[8]
  i1582.y = i1583[9]
  i1582.width = i1583[10]
  i1582.height = i1583[11]
  i1582.xOffset = i1583[12]
  i1582.yOffset = i1583[13]
  i1582.xAdvance = i1583[14]
  i1582.scale = i1583[15]
  return i1582
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1588 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1589 = data
  i1588.m_Name = i1589[0]
  i1588.m_ElementType = i1589[1]
  i1588.m_Unicode = i1589[2]
  i1588.m_GlyphIndex = i1589[3]
  i1588.m_Scale = i1589[4]
  return i1588
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1592 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1593 = data
  request.r(i1593[0], i1593[1], 0, i1592, 'sprite')
  i1592.m_Index = i1593[2]
  i1592.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1593[3], i1592.m_Metrics)
  i1592.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1593[4], i1592.m_GlyphRect)
  i1592.m_Scale = i1593[5]
  i1592.m_AtlasIndex = i1593[6]
  i1592.m_ClassDefinitionType = i1593[7]
  return i1592
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1594 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1595 = data
  var i1597 = i1595[0]
  var i1596 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1597.length; i += 1) {
    i1596.add(request.d('TMPro.TMP_Style', i1597[i + 0]));
  }
  i1594.m_StyleList = i1596
  return i1594
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1600 = root || request.c( 'TMPro.TMP_Style' )
  var i1601 = data
  i1600.m_Name = i1601[0]
  i1600.m_HashCode = i1601[1]
  i1600.m_OpeningDefinition = i1601[2]
  i1600.m_ClosingDefinition = i1601[3]
  i1600.m_OpeningTagArray = i1601[4]
  i1600.m_ClosingTagArray = i1601[5]
  return i1600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1603 = data
  var i1605 = i1603[0]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1605[i + 0]) );
  }
  i1602.files = i1604
  i1602.componentToPrefabIds = i1603[1]
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1609 = data
  i1608.path = i1609[0]
  request.r(i1609[1], i1609[2], 0, i1608, 'unityObject')
  return i1608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1611 = data
  var i1613 = i1611[0]
  var i1612 = []
  for(var i = 0; i < i1613.length; i += 1) {
    i1612.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1613[i + 0]) );
  }
  i1610.scriptsExecutionOrder = i1612
  var i1615 = i1611[1]
  var i1614 = []
  for(var i = 0; i < i1615.length; i += 1) {
    i1614.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1615[i + 0]) );
  }
  i1610.sortingLayers = i1614
  var i1617 = i1611[2]
  var i1616 = []
  for(var i = 0; i < i1617.length; i += 1) {
    i1616.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1617[i + 0]) );
  }
  i1610.cullingLayers = i1616
  i1610.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1611[3], i1610.timeSettings)
  i1610.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1611[4], i1610.physicsSettings)
  i1610.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1611[5], i1610.physics2DSettings)
  i1610.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1611[6], i1610.qualitySettings)
  i1610.enableRealtimeShadows = !!i1611[7]
  i1610.enableAutoInstancing = !!i1611[8]
  i1610.enableStaticBatching = !!i1611[9]
  i1610.enableDynamicBatching = !!i1611[10]
  i1610.usePreservativeDynamicBatching = !!i1611[11]
  i1610.lightmapEncodingQuality = i1611[12]
  i1610.desiredColorSpace = i1611[13]
  var i1619 = i1611[14]
  var i1618 = []
  for(var i = 0; i < i1619.length; i += 1) {
    i1618.push( i1619[i + 0] );
  }
  i1610.allTags = i1618
  return i1610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1623 = data
  i1622.name = i1623[0]
  i1622.value = i1623[1]
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1627 = data
  i1626.id = i1627[0]
  i1626.name = i1627[1]
  i1626.value = i1627[2]
  return i1626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1631 = data
  i1630.id = i1631[0]
  i1630.name = i1631[1]
  return i1630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1633 = data
  i1632.fixedDeltaTime = i1633[0]
  i1632.maximumDeltaTime = i1633[1]
  i1632.timeScale = i1633[2]
  i1632.maximumParticleTimestep = i1633[3]
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1634 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1635 = data
  i1634.gravity = new pc.Vec3( i1635[0], i1635[1], i1635[2] )
  i1634.defaultSolverIterations = i1635[3]
  i1634.bounceThreshold = i1635[4]
  i1634.autoSyncTransforms = !!i1635[5]
  i1634.autoSimulation = !!i1635[6]
  var i1637 = i1635[7]
  var i1636 = []
  for(var i = 0; i < i1637.length; i += 1) {
    i1636.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1637[i + 0]) );
  }
  i1634.collisionMatrix = i1636
  return i1634
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1641 = data
  i1640.enabled = !!i1641[0]
  i1640.layerId = i1641[1]
  i1640.otherLayerId = i1641[2]
  return i1640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1643 = data
  request.r(i1643[0], i1643[1], 0, i1642, 'material')
  i1642.gravity = new pc.Vec2( i1643[2], i1643[3] )
  i1642.positionIterations = i1643[4]
  i1642.velocityIterations = i1643[5]
  i1642.velocityThreshold = i1643[6]
  i1642.maxLinearCorrection = i1643[7]
  i1642.maxAngularCorrection = i1643[8]
  i1642.maxTranslationSpeed = i1643[9]
  i1642.maxRotationSpeed = i1643[10]
  i1642.baumgarteScale = i1643[11]
  i1642.baumgarteTOIScale = i1643[12]
  i1642.timeToSleep = i1643[13]
  i1642.linearSleepTolerance = i1643[14]
  i1642.angularSleepTolerance = i1643[15]
  i1642.defaultContactOffset = i1643[16]
  i1642.autoSimulation = !!i1643[17]
  i1642.queriesHitTriggers = !!i1643[18]
  i1642.queriesStartInColliders = !!i1643[19]
  i1642.callbacksOnDisable = !!i1643[20]
  i1642.reuseCollisionCallbacks = !!i1643[21]
  i1642.autoSyncTransforms = !!i1643[22]
  var i1645 = i1643[23]
  var i1644 = []
  for(var i = 0; i < i1645.length; i += 1) {
    i1644.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1645[i + 0]) );
  }
  i1642.collisionMatrix = i1644
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1649 = data
  i1648.enabled = !!i1649[0]
  i1648.layerId = i1649[1]
  i1648.otherLayerId = i1649[2]
  return i1648
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1650 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1651 = data
  var i1653 = i1651[0]
  var i1652 = []
  for(var i = 0; i < i1653.length; i += 1) {
    i1652.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1653[i + 0]) );
  }
  i1650.qualityLevels = i1652
  var i1655 = i1651[1]
  var i1654 = []
  for(var i = 0; i < i1655.length; i += 1) {
    i1654.push( i1655[i + 0] );
  }
  i1650.names = i1654
  i1650.shadows = i1651[2]
  i1650.anisotropicFiltering = i1651[3]
  i1650.antiAliasing = i1651[4]
  i1650.lodBias = i1651[5]
  i1650.shadowCascades = i1651[6]
  i1650.shadowDistance = i1651[7]
  i1650.shadowmaskMode = i1651[8]
  i1650.shadowProjection = i1651[9]
  i1650.shadowResolution = i1651[10]
  i1650.softParticles = !!i1651[11]
  i1650.softVegetation = !!i1651[12]
  i1650.activeColorSpace = i1651[13]
  i1650.desiredColorSpace = i1651[14]
  i1650.masterTextureLimit = i1651[15]
  i1650.maxQueuedFrames = i1651[16]
  i1650.particleRaycastBudget = i1651[17]
  i1650.pixelLightCount = i1651[18]
  i1650.realtimeReflectionProbes = !!i1651[19]
  i1650.shadowCascade2Split = i1651[20]
  i1650.shadowCascade4Split = new pc.Vec3( i1651[21], i1651[22], i1651[23] )
  i1650.streamingMipmapsActive = !!i1651[24]
  i1650.vSyncCount = i1651[25]
  i1650.asyncUploadBufferSize = i1651[26]
  i1650.asyncUploadTimeSlice = i1651[27]
  i1650.billboardsFaceCameraPosition = !!i1651[28]
  i1650.shadowNearPlaneOffset = i1651[29]
  i1650.streamingMipmapsMemoryBudget = i1651[30]
  i1650.maximumLODLevel = i1651[31]
  i1650.streamingMipmapsAddAllCameras = !!i1651[32]
  i1650.streamingMipmapsMaxLevelReduction = i1651[33]
  i1650.streamingMipmapsRenderersPerFrame = i1651[34]
  i1650.resolutionScalingFixedDPIFactor = i1651[35]
  i1650.streamingMipmapsMaxFileIORequests = i1651[36]
  i1650.currentQualityLevel = i1651[37]
  return i1650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i1658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i1659 = data
  i1658.name = i1659[0]
  var i1661 = i1659[1]
  var i1660 = []
  for(var i = 0; i < i1661.length; i += 1) {
    i1660.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i1661[i + 0]) );
  }
  i1658.tos = i1660
  var i1663 = i1659[2]
  var i1662 = []
  for(var i = 0; i < i1663.length; i += 1) {
    i1662.push( i1663[i + 0] );
  }
  i1658.constant = i1662
  i1658.isValid = !!i1659[3]
  i1658.isHuman = !!i1659[4]
  i1658.hasRootMotion = !!i1659[5]
  return i1658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i1666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i1667 = data
  i1666.hash = i1667[0]
  i1666.path = i1667[1]
  return i1666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1671 = data
  i1670.weight = i1671[0]
  i1670.vertices = i1671[1]
  i1670.normals = i1671[2]
  i1670.tangents = i1671[3]
  return i1670
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1672 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1673 = data
  request.r(i1673[0], i1673[1], 0, i1672, 'm_ObjectArgument')
  i1672.m_ObjectArgumentAssemblyTypeName = i1673[2]
  i1672.m_IntArgument = i1673[3]
  i1672.m_FloatArgument = i1673[4]
  i1672.m_StringArgument = i1673[5]
  i1672.m_BoolArgument = !!i1673[6]
  return i1672
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1674 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1675 = data
  i1674.xPlacement = i1675[0]
  i1674.yPlacement = i1675[1]
  i1674.xAdvance = i1675[2]
  i1674.yAdvance = i1675[3]
  return i1674
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Rigidbody":{"mass":0,"drag":1,"angularDrag":2,"useGravity":3,"isKinematic":4,"constraints":5,"maxAngularVelocity":6,"collisionDetectionMode":7,"interpolation":8},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TrailRenderer":{"positions":0,"positionCount":1,"time":2,"startWidth":3,"endWidth":4,"widthMultiplier":5,"autodestruct":6,"emitting":7,"numCornerVertices":8,"numCapVertices":9,"minVertexDistance":10,"colorGradient":11,"startColor":12,"endColor":16,"generateLightingData":20,"textureMode":21,"alignment":22,"widthCurve":23,"enabled":24,"sharedMaterial":25,"sharedMaterials":27,"receiveShadows":28,"shadowCastingMode":29,"sortingLayerID":30,"sortingOrder":31,"lightmapIndex":32,"lightmapSceneIndex":33,"lightmapScaleOffset":34,"lightProbeUsage":38,"reflectionProbeUsage":39},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.LineRenderer":{"textureMode":0,"alignment":1,"widthCurve":2,"colorGradient":3,"positions":4,"positionCount":5,"widthMultiplier":6,"startWidth":7,"endWidth":8,"numCornerVertices":9,"numCapVertices":10,"useWorldSpace":11,"loop":12,"startColor":13,"endColor":17,"generateLightingData":21,"enabled":22,"sharedMaterial":23,"sharedMaterials":25,"receiveShadows":26,"shadowCastingMode":27,"sortingLayerID":28,"sortingOrder":29,"lightmapIndex":30,"lightmapSceneIndex":31,"lightmapScaleOffset":32,"lightProbeUsage":36,"reflectionProbeUsage":37},"Luna.Unity.DTO.UnityEngine.Components.CharacterController":{"enabled":0,"center":1,"radius":4,"height":5,"minMoveDistance":6,"skinWidth":7,"enableOverlapRecovery":8},"Luna.Unity.DTO.UnityEngine.Components.CharacterJoint":{"swingAxis":0,"twistLimitSpring":3,"swingLimitSpring":4,"lowTwistLimit":5,"highTwistLimit":6,"swing1Limit":7,"swing2Limit":8,"connectedBody":9,"axis":11,"anchor":14,"connectedAnchor":17,"autoConfigureConnectedAnchor":20,"massScale":21,"connectedMassScale":22,"enableCollision":23,"breakForce":24,"breakTorque":25},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController":{"name":0,"_runtimeAnimatorController":1,"_originalAnimationClips":3,"_overrideAnimationClips":4,"_animationClips":5,"_animationClipPairs":6},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"75":[76],"77":[76],"78":[76],"79":[76],"80":[76],"81":[76],"82":[7],"83":[46],"59":[3],"84":[3],"85":[3],"86":[3],"87":[3],"88":[3],"89":[90],"91":[90],"92":[90],"93":[90],"94":[90],"95":[90],"96":[90],"97":[90],"98":[90],"99":[90],"100":[90],"101":[90],"102":[90],"103":[46],"104":[11],"105":[106],"107":[106],"21":[10],"40":[37],"108":[10],"109":[24,10],"110":[11],"111":[24,10],"112":[10],"113":[10],"13":[11,10],"25":[10,24],"114":[115],"116":[115],"117":[115],"118":[10],"119":[10],"23":[21],"26":[24,10],"120":[10],"22":[21],"31":[10],"29":[10],"67":[10],"121":[10],"122":[10],"123":[10],"30":[10],"34":[10],"124":[10],"125":[24,10],"126":[10],"32":[10],"33":[10],"127":[10],"128":[24,10],"129":[10],"130":[60],"131":[60],"61":[60],"132":[60],"133":[46],"134":[46]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Rigidbody","UnityEngine.CapsuleCollider","UnityEngine.Animator","UnityEngine.AnimatorOverrideController","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Material","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.TrailRenderer","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","UnityEngine.MeshFilter","UnityEngine.BoxCollider","UnityEngine.SphereCollider","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","TMPro.TextMeshProUGUI","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Mask","UnityEngine.CanvasGroup","UnityEngine.Light","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.MonoBehaviour","PlayableSpatialAudio","UnityEngine.AI.NavMeshObstacle","UnityEditor.Animations.AnimatorController","UnityEngine.Avatar","StealEggGame","UnityEngine.GameObject","UnityEngine.Camera","PlayableRagdoll","UnityEngine.Font","UnityEngine.LineRenderer","TapHintView","IconAmountView","PetRowView","IncubateRowView","QuickSlotView","BagCellView","IndexZoneView","PlayableJoystick","UnityEngine.CharacterController","UnityEngine.CharacterJoint","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","PlayableCameraDrag","CameraController","UnityEngine.UI.Outline","LunaController","PlayableHoldButton","UnityEngine.UI.HorizontalLayoutGroup","IndexPetCellView","UnityEngine.AudioListener","UnityEngine.AnimationClip","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "TE_V06";

Deserializers.lunaInitializationTime = "10/27/2026 10:33:07";

Deserializers.lunaDaysRunning = "7.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2611_TamNTM_TE_V05_DungNV";

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

Deserializers.buildID = "238cbef7-af41-4ab1-88e5-3ce5ddf625bd";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

