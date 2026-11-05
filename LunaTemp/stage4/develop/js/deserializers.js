var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i854 = root || request.c( 'UnityEngine.JointSpring' )
  var i855 = data
  i854.spring = i855[0]
  i854.damper = i855[1]
  i854.targetPosition = i855[2]
  return i854
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i856 = root || request.c( 'UnityEngine.JointMotor' )
  var i857 = data
  i856.m_TargetVelocity = i857[0]
  i856.m_Force = i857[1]
  i856.m_FreeSpin = i857[2]
  return i856
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i858 = root || request.c( 'UnityEngine.JointLimits' )
  var i859 = data
  i858.m_Min = i859[0]
  i858.m_Max = i859[1]
  i858.m_Bounciness = i859[2]
  i858.m_BounceMinVelocity = i859[3]
  i858.m_ContactDistance = i859[4]
  i858.minBounce = i859[5]
  i858.maxBounce = i859[6]
  return i858
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i860 = root || request.c( 'UnityEngine.JointDrive' )
  var i861 = data
  i860.m_PositionSpring = i861[0]
  i860.m_PositionDamper = i861[1]
  i860.m_MaximumForce = i861[2]
  i860.m_UseAcceleration = i861[3]
  return i860
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i862 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i863 = data
  i862.m_Spring = i863[0]
  i862.m_Damper = i863[1]
  return i862
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i864 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i865 = data
  i864.m_Limit = i865[0]
  i864.m_Bounciness = i865[1]
  i864.m_ContactDistance = i865[2]
  return i864
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i866 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i867 = data
  i866.m_ExtremumSlip = i867[0]
  i866.m_ExtremumValue = i867[1]
  i866.m_AsymptoteSlip = i867[2]
  i866.m_AsymptoteValue = i867[3]
  i866.m_Stiffness = i867[4]
  return i866
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i868 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i869 = data
  i868.m_LowerAngle = i869[0]
  i868.m_UpperAngle = i869[1]
  return i868
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i870 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i871 = data
  i870.m_MotorSpeed = i871[0]
  i870.m_MaximumMotorTorque = i871[1]
  return i870
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i872 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i873 = data
  i872.m_DampingRatio = i873[0]
  i872.m_Frequency = i873[1]
  i872.m_Angle = i873[2]
  return i872
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i874 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i875 = data
  i874.m_LowerTranslation = i875[0]
  i874.m_UpperTranslation = i875[1]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i877 = data
  i876.name = i877[0]
  i876.halfPrecision = !!i877[1]
  i876.useSimplification = !!i877[2]
  i876.useUInt32IndexFormat = !!i877[3]
  i876.vertexCount = i877[4]
  i876.aabb = i877[5]
  var i879 = i877[6]
  var i878 = []
  for(var i = 0; i < i879.length; i += 1) {
    i878.push( !!i879[i + 0] );
  }
  i876.streams = i878
  i876.vertices = i877[7]
  var i881 = i877[8]
  var i880 = []
  for(var i = 0; i < i881.length; i += 1) {
    i880.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i881[i + 0]) );
  }
  i876.subMeshes = i880
  var i883 = i877[9]
  var i882 = []
  for(var i = 0; i < i883.length; i += 16) {
    i882.push( new pc.Mat4().setData(i883[i + 0], i883[i + 1], i883[i + 2], i883[i + 3],  i883[i + 4], i883[i + 5], i883[i + 6], i883[i + 7],  i883[i + 8], i883[i + 9], i883[i + 10], i883[i + 11],  i883[i + 12], i883[i + 13], i883[i + 14], i883[i + 15]) );
  }
  i876.bindposes = i882
  var i885 = i877[10]
  var i884 = []
  for(var i = 0; i < i885.length; i += 1) {
    i884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i885[i + 0]) );
  }
  i876.blendShapes = i884
  return i876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i891 = data
  i890.triangles = i891[0]
  return i890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i896 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i897 = data
  i896.name = i897[0]
  var i899 = i897[1]
  var i898 = []
  for(var i = 0; i < i899.length; i += 1) {
    i898.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i899[i + 0]) );
  }
  i896.frames = i898
  return i896
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i900 = root || new pc.UnityMaterial()
  var i901 = data
  i900.name = i901[0]
  request.r(i901[1], i901[2], 0, i900, 'shader')
  i900.renderQueue = i901[3]
  i900.enableInstancing = !!i901[4]
  var i903 = i901[5]
  var i902 = []
  for(var i = 0; i < i903.length; i += 1) {
    i902.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i903[i + 0]) );
  }
  i900.floatParameters = i902
  var i905 = i901[6]
  var i904 = []
  for(var i = 0; i < i905.length; i += 1) {
    i904.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i905[i + 0]) );
  }
  i900.colorParameters = i904
  var i907 = i901[7]
  var i906 = []
  for(var i = 0; i < i907.length; i += 1) {
    i906.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i907[i + 0]) );
  }
  i900.vectorParameters = i906
  var i909 = i901[8]
  var i908 = []
  for(var i = 0; i < i909.length; i += 1) {
    i908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i909[i + 0]) );
  }
  i900.textureParameters = i908
  var i911 = i901[9]
  var i910 = []
  for(var i = 0; i < i911.length; i += 1) {
    i910.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i911[i + 0]) );
  }
  i900.materialFlags = i910
  return i900
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i915 = data
  i914.name = i915[0]
  i914.value = i915[1]
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i918 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i919 = data
  i918.name = i919[0]
  i918.value = new pc.Color(i919[1], i919[2], i919[3], i919[4])
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i923 = data
  i922.name = i923[0]
  i922.value = new pc.Vec4( i923[1], i923[2], i923[3], i923[4] )
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i927 = data
  i926.name = i927[0]
  request.r(i927[1], i927[2], 0, i926, 'value')
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i931 = data
  i930.name = i931[0]
  i930.enabled = !!i931[1]
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i933 = data
  i932.name = i933[0]
  i932.width = i933[1]
  i932.height = i933[2]
  i932.mipmapCount = i933[3]
  i932.anisoLevel = i933[4]
  i932.filterMode = i933[5]
  i932.hdr = !!i933[6]
  i932.format = i933[7]
  i932.wrapMode = i933[8]
  i932.alphaIsTransparency = !!i933[9]
  i932.alphaSource = i933[10]
  i932.graphicsFormat = i933[11]
  i932.sRGBTexture = !!i933[12]
  i932.desiredColorSpace = i933[13]
  i932.wrapU = i933[14]
  i932.wrapV = i933[15]
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i935 = data
  i934.position = new pc.Vec3( i935[0], i935[1], i935[2] )
  i934.scale = new pc.Vec3( i935[3], i935[4], i935[5] )
  i934.rotation = new pc.Quat(i935[6], i935[7], i935[8], i935[9])
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i937 = data
  i936.mass = i937[0]
  i936.drag = i937[1]
  i936.angularDrag = i937[2]
  i936.useGravity = !!i937[3]
  i936.isKinematic = !!i937[4]
  i936.constraints = i937[5]
  i936.maxAngularVelocity = i937[6]
  i936.collisionDetectionMode = i937[7]
  i936.interpolation = i937[8]
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i939 = data
  i938.center = new pc.Vec3( i939[0], i939[1], i939[2] )
  i938.radius = i939[3]
  i938.height = i939[4]
  i938.direction = i939[5]
  i938.enabled = !!i939[6]
  i938.isTrigger = !!i939[7]
  request.r(i939[8], i939[9], 0, i938, 'material')
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i941 = data
  request.r(i941[0], i941[1], 0, i940, 'animatorController')
  request.r(i941[2], i941[3], 0, i940, 'avatar')
  i940.updateMode = i941[4]
  i940.hasTransformHierarchy = !!i941[5]
  i940.applyRootMotion = !!i941[6]
  var i943 = i941[7]
  var i942 = []
  for(var i = 0; i < i943.length; i += 2) {
  request.r(i943[i + 0], i943[i + 1], 2, i942, '')
  }
  i940.humanBones = i942
  i940.enabled = !!i941[8]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i947 = data
  i946.name = i947[0]
  i946.tagId = i947[1]
  i946.enabled = !!i947[2]
  i946.isStatic = !!i947[3]
  i946.layer = i947[4]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i949 = data
  request.r(i949[0], i949[1], 0, i948, 'sharedMesh')
  var i951 = i949[2]
  var i950 = []
  for(var i = 0; i < i951.length; i += 2) {
  request.r(i951[i + 0], i951[i + 1], 2, i950, '')
  }
  i948.bones = i950
  i948.updateWhenOffscreen = !!i949[3]
  i948.localBounds = i949[4]
  request.r(i949[5], i949[6], 0, i948, 'rootBone')
  var i953 = i949[7]
  var i952 = []
  for(var i = 0; i < i953.length; i += 1) {
    i952.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i953[i + 0]) );
  }
  i948.blendShapesWeights = i952
  i948.enabled = !!i949[8]
  request.r(i949[9], i949[10], 0, i948, 'sharedMaterial')
  var i955 = i949[11]
  var i954 = []
  for(var i = 0; i < i955.length; i += 2) {
  request.r(i955[i + 0], i955[i + 1], 2, i954, '')
  }
  i948.sharedMaterials = i954
  i948.receiveShadows = !!i949[12]
  i948.shadowCastingMode = i949[13]
  i948.sortingLayerID = i949[14]
  i948.sortingOrder = i949[15]
  i948.lightmapIndex = i949[16]
  i948.lightmapSceneIndex = i949[17]
  i948.lightmapScaleOffset = new pc.Vec4( i949[18], i949[19], i949[20], i949[21] )
  i948.lightProbeUsage = i949[22]
  i948.reflectionProbeUsage = i949[23]
  return i948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i959 = data
  i958.weight = i959[0]
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i963 = data
  i962.pivot = new pc.Vec2( i963[0], i963[1] )
  i962.anchorMin = new pc.Vec2( i963[2], i963[3] )
  i962.anchorMax = new pc.Vec2( i963[4], i963[5] )
  i962.sizeDelta = new pc.Vec2( i963[6], i963[7] )
  i962.anchoredPosition3D = new pc.Vec3( i963[8], i963[9], i963[10] )
  i962.rotation = new pc.Quat(i963[11], i963[12], i963[13], i963[14])
  i962.scale = new pc.Vec3( i963[15], i963[16], i963[17] )
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i965 = data
  request.r(i965[0], i965[1], 0, i964, 'additionalVertexStreams')
  i964.enabled = !!i965[2]
  request.r(i965[3], i965[4], 0, i964, 'sharedMaterial')
  var i967 = i965[5]
  var i966 = []
  for(var i = 0; i < i967.length; i += 2) {
  request.r(i967[i + 0], i967[i + 1], 2, i966, '')
  }
  i964.sharedMaterials = i966
  i964.receiveShadows = !!i965[6]
  i964.shadowCastingMode = i965[7]
  i964.sortingLayerID = i965[8]
  i964.sortingOrder = i965[9]
  i964.lightmapIndex = i965[10]
  i964.lightmapSceneIndex = i965[11]
  i964.lightmapScaleOffset = new pc.Vec4( i965[12], i965[13], i965[14], i965[15] )
  i964.lightProbeUsage = i965[16]
  i964.reflectionProbeUsage = i965[17]
  return i964
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i968 = root || request.c( 'TMPro.TextMeshPro' )
  var i969 = data
  i968._SortingLayer = i969[0]
  i968._SortingLayerID = i969[1]
  i968._SortingOrder = i969[2]
  i968.m_hasFontAssetChanged = !!i969[3]
  request.r(i969[4], i969[5], 0, i968, 'm_renderer')
  i968.m_maskType = i969[6]
  i968.m_text = i969[7]
  i968.m_isRightToLeft = !!i969[8]
  request.r(i969[9], i969[10], 0, i968, 'm_fontAsset')
  request.r(i969[11], i969[12], 0, i968, 'm_sharedMaterial')
  var i971 = i969[13]
  var i970 = []
  for(var i = 0; i < i971.length; i += 2) {
  request.r(i971[i + 0], i971[i + 1], 2, i970, '')
  }
  i968.m_fontSharedMaterials = i970
  request.r(i969[14], i969[15], 0, i968, 'm_fontMaterial')
  var i973 = i969[16]
  var i972 = []
  for(var i = 0; i < i973.length; i += 2) {
  request.r(i973[i + 0], i973[i + 1], 2, i972, '')
  }
  i968.m_fontMaterials = i972
  i968.m_fontColor32 = UnityEngine.Color32.ConstructColor(i969[17], i969[18], i969[19], i969[20])
  i968.m_fontColor = new pc.Color(i969[21], i969[22], i969[23], i969[24])
  i968.m_enableVertexGradient = !!i969[25]
  i968.m_colorMode = i969[26]
  i968.m_fontColorGradient = request.d('TMPro.VertexGradient', i969[27], i968.m_fontColorGradient)
  request.r(i969[28], i969[29], 0, i968, 'm_fontColorGradientPreset')
  request.r(i969[30], i969[31], 0, i968, 'm_spriteAsset')
  i968.m_tintAllSprites = !!i969[32]
  request.r(i969[33], i969[34], 0, i968, 'm_StyleSheet')
  i968.m_TextStyleHashCode = i969[35]
  i968.m_overrideHtmlColors = !!i969[36]
  i968.m_faceColor = UnityEngine.Color32.ConstructColor(i969[37], i969[38], i969[39], i969[40])
  i968.m_fontSize = i969[41]
  i968.m_fontSizeBase = i969[42]
  i968.m_fontWeight = i969[43]
  i968.m_enableAutoSizing = !!i969[44]
  i968.m_fontSizeMin = i969[45]
  i968.m_fontSizeMax = i969[46]
  i968.m_fontStyle = i969[47]
  i968.m_HorizontalAlignment = i969[48]
  i968.m_VerticalAlignment = i969[49]
  i968.m_textAlignment = i969[50]
  i968.m_characterSpacing = i969[51]
  i968.m_characterHorizontalScale = i969[52]
  i968.m_wordSpacing = i969[53]
  i968.m_lineSpacing = i969[54]
  i968.m_lineSpacingMax = i969[55]
  i968.m_paragraphSpacing = i969[56]
  i968.m_charWidthMaxAdj = i969[57]
  i968.m_TextWrappingMode = i969[58]
  i968.m_wordWrappingRatios = i969[59]
  i968.m_overflowMode = i969[60]
  request.r(i969[61], i969[62], 0, i968, 'm_linkedTextComponent')
  request.r(i969[63], i969[64], 0, i968, 'parentLinkedComponent')
  i968.m_enableKerning = !!i969[65]
  var i975 = i969[66]
  var i974 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i975.length; i += 1) {
    i974.add(i975[i + 0]);
  }
  i968.m_ActiveFontFeatures = i974
  i968.m_enableExtraPadding = !!i969[67]
  i968.checkPaddingRequired = !!i969[68]
  i968.m_isRichText = !!i969[69]
  i968.m_parseCtrlCharacters = !!i969[70]
  i968.m_isOrthographic = !!i969[71]
  i968.m_isCullingEnabled = !!i969[72]
  i968.m_horizontalMapping = i969[73]
  i968.m_verticalMapping = i969[74]
  i968.m_uvLineOffset = i969[75]
  i968.m_geometrySortingOrder = i969[76]
  i968.m_IsTextObjectScaleStatic = !!i969[77]
  i968.m_VertexBufferAutoSizeReduction = !!i969[78]
  i968.m_useMaxVisibleDescender = !!i969[79]
  i968.m_pageToDisplay = i969[80]
  i968.m_margin = new pc.Vec4( i969[81], i969[82], i969[83], i969[84] )
  i968.m_isUsingLegacyAnimationComponent = !!i969[85]
  i968.m_isVolumetricText = !!i969[86]
  request.r(i969[87], i969[88], 0, i968, 'm_Material')
  i968.m_EmojiFallbackSupport = !!i969[89]
  i968.m_Maskable = !!i969[90]
  i968.m_Color = new pc.Color(i969[91], i969[92], i969[93], i969[94])
  i968.m_RaycastTarget = !!i969[95]
  i968.m_RaycastPadding = new pc.Vec4( i969[96], i969[97], i969[98], i969[99] )
  return i968
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i976 = root || request.c( 'TMPro.VertexGradient' )
  var i977 = data
  i976.topLeft = new pc.Color(i977[0], i977[1], i977[2], i977[3])
  i976.topRight = new pc.Color(i977[4], i977[5], i977[6], i977[7])
  i976.bottomLeft = new pc.Color(i977[8], i977[9], i977[10], i977[11])
  i976.bottomRight = new pc.Color(i977[12], i977[13], i977[14], i977[15])
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i980 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i981 = data
  var i983 = i981[0]
  var i982 = []
  for(var i = 0; i < i983.length; i += 3) {
    i982.push( new pc.Vec3( i983[i + 0], i983[i + 1], i983[i + 2] ) );
  }
  i980.positions = i982
  i980.positionCount = i981[1]
  i980.time = i981[2]
  i980.startWidth = i981[3]
  i980.endWidth = i981[4]
  i980.widthMultiplier = i981[5]
  i980.autodestruct = !!i981[6]
  i980.emitting = !!i981[7]
  i980.numCornerVertices = i981[8]
  i980.numCapVertices = i981[9]
  i980.minVertexDistance = i981[10]
  i980.colorGradient = i981[11] ? new pc.ColorGradient(i981[11][0], i981[11][1], i981[11][2]) : null
  i980.startColor = new pc.Color(i981[12], i981[13], i981[14], i981[15])
  i980.endColor = new pc.Color(i981[16], i981[17], i981[18], i981[19])
  i980.generateLightingData = !!i981[20]
  i980.textureMode = i981[21]
  i980.alignment = i981[22]
  i980.widthCurve = new pc.AnimationCurve( { keys_flow: i981[23] } )
  i980.enabled = !!i981[24]
  request.r(i981[25], i981[26], 0, i980, 'sharedMaterial')
  var i985 = i981[27]
  var i984 = []
  for(var i = 0; i < i985.length; i += 2) {
  request.r(i985[i + 0], i985[i + 1], 2, i984, '')
  }
  i980.sharedMaterials = i984
  i980.receiveShadows = !!i981[28]
  i980.shadowCastingMode = i981[29]
  i980.sortingLayerID = i981[30]
  i980.sortingOrder = i981[31]
  i980.lightmapIndex = i981[32]
  i980.lightmapSceneIndex = i981[33]
  i980.lightmapScaleOffset = new pc.Vec4( i981[34], i981[35], i981[36], i981[37] )
  i980.lightProbeUsage = i981[38]
  i980.reflectionProbeUsage = i981[39]
  return i980
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i989 = data
  i988.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i989[0], i988.main)
  i988.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i989[1], i988.colorBySpeed)
  i988.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i989[2], i988.colorOverLifetime)
  i988.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i989[3], i988.emission)
  i988.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i989[4], i988.rotationBySpeed)
  i988.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i989[5], i988.rotationOverLifetime)
  i988.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i989[6], i988.shape)
  i988.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i989[7], i988.sizeBySpeed)
  i988.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i989[8], i988.sizeOverLifetime)
  i988.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i989[9], i988.textureSheetAnimation)
  i988.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i989[10], i988.velocityOverLifetime)
  i988.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i989[11], i988.noise)
  i988.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i989[12], i988.inheritVelocity)
  i988.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i989[13], i988.forceOverLifetime)
  i988.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i989[14], i988.limitVelocityOverLifetime)
  i988.useAutoRandomSeed = !!i989[15]
  i988.randomSeed = i989[16]
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i990 = root || new pc.ParticleSystemMain()
  var i991 = data
  i990.duration = i991[0]
  i990.loop = !!i991[1]
  i990.prewarm = !!i991[2]
  i990.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[3], i990.startDelay)
  i990.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[4], i990.startLifetime)
  i990.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[5], i990.startSpeed)
  i990.startSize3D = !!i991[6]
  i990.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[7], i990.startSizeX)
  i990.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[8], i990.startSizeY)
  i990.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[9], i990.startSizeZ)
  i990.startRotation3D = !!i991[10]
  i990.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[11], i990.startRotationX)
  i990.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[12], i990.startRotationY)
  i990.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[13], i990.startRotationZ)
  i990.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i991[14], i990.startColor)
  i990.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i991[15], i990.gravityModifier)
  i990.simulationSpace = i991[16]
  request.r(i991[17], i991[18], 0, i990, 'customSimulationSpace')
  i990.simulationSpeed = i991[19]
  i990.useUnscaledTime = !!i991[20]
  i990.scalingMode = i991[21]
  i990.playOnAwake = !!i991[22]
  i990.maxParticles = i991[23]
  i990.emitterVelocityMode = i991[24]
  i990.stopAction = i991[25]
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i992 = root || new pc.MinMaxCurve()
  var i993 = data
  i992.mode = i993[0]
  i992.curveMin = new pc.AnimationCurve( { keys_flow: i993[1] } )
  i992.curveMax = new pc.AnimationCurve( { keys_flow: i993[2] } )
  i992.curveMultiplier = i993[3]
  i992.constantMin = i993[4]
  i992.constantMax = i993[5]
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i994 = root || new pc.MinMaxGradient()
  var i995 = data
  i994.mode = i995[0]
  i994.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i995[1], i994.gradientMin)
  i994.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i995[2], i994.gradientMax)
  i994.colorMin = new pc.Color(i995[3], i995[4], i995[5], i995[6])
  i994.colorMax = new pc.Color(i995[7], i995[8], i995[9], i995[10])
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i997 = data
  i996.mode = i997[0]
  var i999 = i997[1]
  var i998 = []
  for(var i = 0; i < i999.length; i += 1) {
    i998.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i999[i + 0]) );
  }
  i996.colorKeys = i998
  var i1001 = i997[2]
  var i1000 = []
  for(var i = 0; i < i1001.length; i += 1) {
    i1000.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i1001[i + 0]) );
  }
  i996.alphaKeys = i1000
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1002 = root || new pc.ParticleSystemColorBySpeed()
  var i1003 = data
  i1002.enabled = !!i1003[0]
  i1002.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1003[1], i1002.color)
  i1002.range = new pc.Vec2( i1003[2], i1003[3] )
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1007 = data
  i1006.color = new pc.Color(i1007[0], i1007[1], i1007[2], i1007[3])
  i1006.time = i1007[4]
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1011 = data
  i1010.alpha = i1011[0]
  i1010.time = i1011[1]
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1012 = root || new pc.ParticleSystemColorOverLifetime()
  var i1013 = data
  i1012.enabled = !!i1013[0]
  i1012.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1013[1], i1012.color)
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1014 = root || new pc.ParticleSystemEmitter()
  var i1015 = data
  i1014.enabled = !!i1015[0]
  i1014.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[1], i1014.rateOverTime)
  i1014.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1015[2], i1014.rateOverDistance)
  var i1017 = i1015[3]
  var i1016 = []
  for(var i = 0; i < i1017.length; i += 1) {
    i1016.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1017[i + 0]) );
  }
  i1014.bursts = i1016
  return i1014
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1020 = root || new pc.ParticleSystemBurst()
  var i1021 = data
  i1020.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1021[0], i1020.count)
  i1020.cycleCount = i1021[1]
  i1020.minCount = i1021[2]
  i1020.maxCount = i1021[3]
  i1020.repeatInterval = i1021[4]
  i1020.time = i1021[5]
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1022 = root || new pc.ParticleSystemRotationBySpeed()
  var i1023 = data
  i1022.enabled = !!i1023[0]
  i1022.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[1], i1022.x)
  i1022.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[2], i1022.y)
  i1022.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[3], i1022.z)
  i1022.separateAxes = !!i1023[4]
  i1022.range = new pc.Vec2( i1023[5], i1023[6] )
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1024 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1025 = data
  i1024.enabled = !!i1025[0]
  i1024.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[1], i1024.x)
  i1024.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[2], i1024.y)
  i1024.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[3], i1024.z)
  i1024.separateAxes = !!i1025[4]
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1026 = root || new pc.ParticleSystemShape()
  var i1027 = data
  i1026.enabled = !!i1027[0]
  i1026.shapeType = i1027[1]
  i1026.randomDirectionAmount = i1027[2]
  i1026.sphericalDirectionAmount = i1027[3]
  i1026.randomPositionAmount = i1027[4]
  i1026.alignToDirection = !!i1027[5]
  i1026.radius = i1027[6]
  i1026.radiusMode = i1027[7]
  i1026.radiusSpread = i1027[8]
  i1026.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[9], i1026.radiusSpeed)
  i1026.radiusThickness = i1027[10]
  i1026.angle = i1027[11]
  i1026.length = i1027[12]
  i1026.boxThickness = new pc.Vec3( i1027[13], i1027[14], i1027[15] )
  i1026.meshShapeType = i1027[16]
  request.r(i1027[17], i1027[18], 0, i1026, 'mesh')
  request.r(i1027[19], i1027[20], 0, i1026, 'meshRenderer')
  request.r(i1027[21], i1027[22], 0, i1026, 'skinnedMeshRenderer')
  i1026.useMeshMaterialIndex = !!i1027[23]
  i1026.meshMaterialIndex = i1027[24]
  i1026.useMeshColors = !!i1027[25]
  i1026.normalOffset = i1027[26]
  i1026.arc = i1027[27]
  i1026.arcMode = i1027[28]
  i1026.arcSpread = i1027[29]
  i1026.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[30], i1026.arcSpeed)
  i1026.donutRadius = i1027[31]
  i1026.position = new pc.Vec3( i1027[32], i1027[33], i1027[34] )
  i1026.rotation = new pc.Vec3( i1027[35], i1027[36], i1027[37] )
  i1026.scale = new pc.Vec3( i1027[38], i1027[39], i1027[40] )
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1028 = root || new pc.ParticleSystemSizeBySpeed()
  var i1029 = data
  i1028.enabled = !!i1029[0]
  i1028.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[1], i1028.x)
  i1028.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[2], i1028.y)
  i1028.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[3], i1028.z)
  i1028.separateAxes = !!i1029[4]
  i1028.range = new pc.Vec2( i1029[5], i1029[6] )
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1030 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1031 = data
  i1030.enabled = !!i1031[0]
  i1030.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[1], i1030.x)
  i1030.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[2], i1030.y)
  i1030.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1031[3], i1030.z)
  i1030.separateAxes = !!i1031[4]
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1032 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1033 = data
  i1032.enabled = !!i1033[0]
  i1032.mode = i1033[1]
  i1032.animation = i1033[2]
  i1032.numTilesX = i1033[3]
  i1032.numTilesY = i1033[4]
  i1032.useRandomRow = !!i1033[5]
  i1032.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[6], i1032.frameOverTime)
  i1032.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1033[7], i1032.startFrame)
  i1032.cycleCount = i1033[8]
  i1032.rowIndex = i1033[9]
  i1032.flipU = i1033[10]
  i1032.flipV = i1033[11]
  i1032.spriteCount = i1033[12]
  var i1035 = i1033[13]
  var i1034 = []
  for(var i = 0; i < i1035.length; i += 2) {
  request.r(i1035[i + 0], i1035[i + 1], 2, i1034, '')
  }
  i1032.sprites = i1034
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1038 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1039 = data
  i1038.enabled = !!i1039[0]
  i1038.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[1], i1038.x)
  i1038.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[2], i1038.y)
  i1038.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[3], i1038.z)
  i1038.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[4], i1038.radial)
  i1038.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[5], i1038.speedModifier)
  i1038.space = i1039[6]
  i1038.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[7], i1038.orbitalX)
  i1038.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[8], i1038.orbitalY)
  i1038.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[9], i1038.orbitalZ)
  i1038.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[10], i1038.orbitalOffsetX)
  i1038.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[11], i1038.orbitalOffsetY)
  i1038.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[12], i1038.orbitalOffsetZ)
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1040 = root || new pc.ParticleSystemNoise()
  var i1041 = data
  i1040.enabled = !!i1041[0]
  i1040.separateAxes = !!i1041[1]
  i1040.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[2], i1040.strengthX)
  i1040.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[3], i1040.strengthY)
  i1040.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[4], i1040.strengthZ)
  i1040.frequency = i1041[5]
  i1040.damping = !!i1041[6]
  i1040.octaveCount = i1041[7]
  i1040.octaveMultiplier = i1041[8]
  i1040.octaveScale = i1041[9]
  i1040.quality = i1041[10]
  i1040.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[11], i1040.scrollSpeed)
  i1040.scrollSpeedMultiplier = i1041[12]
  i1040.remapEnabled = !!i1041[13]
  i1040.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[14], i1040.remapX)
  i1040.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[15], i1040.remapY)
  i1040.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[16], i1040.remapZ)
  i1040.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[17], i1040.positionAmount)
  i1040.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[18], i1040.rotationAmount)
  i1040.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[19], i1040.sizeAmount)
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1042 = root || new pc.ParticleSystemInheritVelocity()
  var i1043 = data
  i1042.enabled = !!i1043[0]
  i1042.mode = i1043[1]
  i1042.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[2], i1042.curve)
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1044 = root || new pc.ParticleSystemForceOverLifetime()
  var i1045 = data
  i1044.enabled = !!i1045[0]
  i1044.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[1], i1044.x)
  i1044.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[2], i1044.y)
  i1044.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1045[3], i1044.z)
  i1044.space = i1045[4]
  i1044.randomized = !!i1045[5]
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1046 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1047 = data
  i1046.enabled = !!i1047[0]
  i1046.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[1], i1046.limit)
  i1046.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[2], i1046.limitX)
  i1046.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[3], i1046.limitY)
  i1046.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[4], i1046.limitZ)
  i1046.dampen = i1047[5]
  i1046.separateAxes = !!i1047[6]
  i1046.space = i1047[7]
  i1046.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1047[8], i1046.drag)
  i1046.multiplyDragByParticleSize = !!i1047[9]
  i1046.multiplyDragByParticleVelocity = !!i1047[10]
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1049 = data
  request.r(i1049[0], i1049[1], 0, i1048, 'mesh')
  i1048.meshCount = i1049[2]
  i1048.activeVertexStreamsCount = i1049[3]
  i1048.alignment = i1049[4]
  i1048.renderMode = i1049[5]
  i1048.sortMode = i1049[6]
  i1048.lengthScale = i1049[7]
  i1048.velocityScale = i1049[8]
  i1048.cameraVelocityScale = i1049[9]
  i1048.normalDirection = i1049[10]
  i1048.sortingFudge = i1049[11]
  i1048.minParticleSize = i1049[12]
  i1048.maxParticleSize = i1049[13]
  i1048.pivot = new pc.Vec3( i1049[14], i1049[15], i1049[16] )
  request.r(i1049[17], i1049[18], 0, i1048, 'trailMaterial')
  i1048.applyActiveColorSpace = !!i1049[19]
  i1048.enabled = !!i1049[20]
  request.r(i1049[21], i1049[22], 0, i1048, 'sharedMaterial')
  var i1051 = i1049[23]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 2) {
  request.r(i1051[i + 0], i1051[i + 1], 2, i1050, '')
  }
  i1048.sharedMaterials = i1050
  i1048.receiveShadows = !!i1049[24]
  i1048.shadowCastingMode = i1049[25]
  i1048.sortingLayerID = i1049[26]
  i1048.sortingOrder = i1049[27]
  i1048.lightmapIndex = i1049[28]
  i1048.lightmapSceneIndex = i1049[29]
  i1048.lightmapScaleOffset = new pc.Vec4( i1049[30], i1049[31], i1049[32], i1049[33] )
  i1048.lightProbeUsage = i1049[34]
  i1048.reflectionProbeUsage = i1049[35]
  return i1048
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1052 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1053 = data
  request.r(i1053[0], i1053[1], 0, i1052, 'sharedMesh')
  return i1052
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1055 = data
  i1054.center = new pc.Vec3( i1055[0], i1055[1], i1055[2] )
  i1054.size = new pc.Vec3( i1055[3], i1055[4], i1055[5] )
  i1054.enabled = !!i1055[6]
  i1054.isTrigger = !!i1055[7]
  request.r(i1055[8], i1055[9], 0, i1054, 'material')
  return i1054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1057 = data
  i1056.center = new pc.Vec3( i1057[0], i1057[1], i1057[2] )
  i1056.radius = i1057[3]
  i1056.enabled = !!i1057[4]
  i1056.isTrigger = !!i1057[5]
  request.r(i1057[6], i1057[7], 0, i1056, 'material')
  return i1056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1059 = data
  i1058.planeDistance = i1059[0]
  i1058.referencePixelsPerUnit = i1059[1]
  i1058.isFallbackOverlay = !!i1059[2]
  i1058.renderMode = i1059[3]
  i1058.renderOrder = i1059[4]
  i1058.sortingLayerName = i1059[5]
  i1058.sortingOrder = i1059[6]
  i1058.scaleFactor = i1059[7]
  request.r(i1059[8], i1059[9], 0, i1058, 'worldCamera')
  i1058.overrideSorting = !!i1059[10]
  i1058.pixelPerfect = !!i1059[11]
  i1058.targetDisplay = i1059[12]
  i1058.overridePixelPerfect = !!i1059[13]
  i1058.enabled = !!i1059[14]
  return i1058
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1060 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1061 = data
  i1060.m_UiScaleMode = i1061[0]
  i1060.m_ReferencePixelsPerUnit = i1061[1]
  i1060.m_ScaleFactor = i1061[2]
  i1060.m_ReferenceResolution = new pc.Vec2( i1061[3], i1061[4] )
  i1060.m_ScreenMatchMode = i1061[5]
  i1060.m_MatchWidthOrHeight = i1061[6]
  i1060.m_PhysicalUnit = i1061[7]
  i1060.m_FallbackScreenDPI = i1061[8]
  i1060.m_DefaultSpriteDPI = i1061[9]
  i1060.m_DynamicPixelsPerUnit = i1061[10]
  i1060.m_PresetInfoIsWorld = !!i1061[11]
  return i1060
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1062 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1063 = data
  i1062.m_IgnoreReversedGraphics = !!i1063[0]
  i1062.m_BlockingObjects = i1063[1]
  i1062.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1063[2] )
  return i1062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1064 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1065 = data
  i1064.cullTransparentMesh = !!i1065[0]
  return i1064
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i1066 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i1067 = data
  i1066.m_hasFontAssetChanged = !!i1067[0]
  request.r(i1067[1], i1067[2], 0, i1066, 'm_baseMaterial')
  i1066.m_maskOffset = new pc.Vec4( i1067[3], i1067[4], i1067[5], i1067[6] )
  i1066.m_text = i1067[7]
  i1066.m_isRightToLeft = !!i1067[8]
  request.r(i1067[9], i1067[10], 0, i1066, 'm_fontAsset')
  request.r(i1067[11], i1067[12], 0, i1066, 'm_sharedMaterial')
  var i1069 = i1067[13]
  var i1068 = []
  for(var i = 0; i < i1069.length; i += 2) {
  request.r(i1069[i + 0], i1069[i + 1], 2, i1068, '')
  }
  i1066.m_fontSharedMaterials = i1068
  request.r(i1067[14], i1067[15], 0, i1066, 'm_fontMaterial')
  var i1071 = i1067[16]
  var i1070 = []
  for(var i = 0; i < i1071.length; i += 2) {
  request.r(i1071[i + 0], i1071[i + 1], 2, i1070, '')
  }
  i1066.m_fontMaterials = i1070
  i1066.m_fontColor32 = UnityEngine.Color32.ConstructColor(i1067[17], i1067[18], i1067[19], i1067[20])
  i1066.m_fontColor = new pc.Color(i1067[21], i1067[22], i1067[23], i1067[24])
  i1066.m_enableVertexGradient = !!i1067[25]
  i1066.m_colorMode = i1067[26]
  i1066.m_fontColorGradient = request.d('TMPro.VertexGradient', i1067[27], i1066.m_fontColorGradient)
  request.r(i1067[28], i1067[29], 0, i1066, 'm_fontColorGradientPreset')
  request.r(i1067[30], i1067[31], 0, i1066, 'm_spriteAsset')
  i1066.m_tintAllSprites = !!i1067[32]
  request.r(i1067[33], i1067[34], 0, i1066, 'm_StyleSheet')
  i1066.m_TextStyleHashCode = i1067[35]
  i1066.m_overrideHtmlColors = !!i1067[36]
  i1066.m_faceColor = UnityEngine.Color32.ConstructColor(i1067[37], i1067[38], i1067[39], i1067[40])
  i1066.m_fontSize = i1067[41]
  i1066.m_fontSizeBase = i1067[42]
  i1066.m_fontWeight = i1067[43]
  i1066.m_enableAutoSizing = !!i1067[44]
  i1066.m_fontSizeMin = i1067[45]
  i1066.m_fontSizeMax = i1067[46]
  i1066.m_fontStyle = i1067[47]
  i1066.m_HorizontalAlignment = i1067[48]
  i1066.m_VerticalAlignment = i1067[49]
  i1066.m_textAlignment = i1067[50]
  i1066.m_characterSpacing = i1067[51]
  i1066.m_characterHorizontalScale = i1067[52]
  i1066.m_wordSpacing = i1067[53]
  i1066.m_lineSpacing = i1067[54]
  i1066.m_lineSpacingMax = i1067[55]
  i1066.m_paragraphSpacing = i1067[56]
  i1066.m_charWidthMaxAdj = i1067[57]
  i1066.m_TextWrappingMode = i1067[58]
  i1066.m_wordWrappingRatios = i1067[59]
  i1066.m_overflowMode = i1067[60]
  request.r(i1067[61], i1067[62], 0, i1066, 'm_linkedTextComponent')
  request.r(i1067[63], i1067[64], 0, i1066, 'parentLinkedComponent')
  i1066.m_enableKerning = !!i1067[65]
  var i1073 = i1067[66]
  var i1072 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1073.length; i += 1) {
    i1072.add(i1073[i + 0]);
  }
  i1066.m_ActiveFontFeatures = i1072
  i1066.m_enableExtraPadding = !!i1067[67]
  i1066.checkPaddingRequired = !!i1067[68]
  i1066.m_isRichText = !!i1067[69]
  i1066.m_parseCtrlCharacters = !!i1067[70]
  i1066.m_isOrthographic = !!i1067[71]
  i1066.m_isCullingEnabled = !!i1067[72]
  i1066.m_horizontalMapping = i1067[73]
  i1066.m_verticalMapping = i1067[74]
  i1066.m_uvLineOffset = i1067[75]
  i1066.m_geometrySortingOrder = i1067[76]
  i1066.m_IsTextObjectScaleStatic = !!i1067[77]
  i1066.m_VertexBufferAutoSizeReduction = !!i1067[78]
  i1066.m_useMaxVisibleDescender = !!i1067[79]
  i1066.m_pageToDisplay = i1067[80]
  i1066.m_margin = new pc.Vec4( i1067[81], i1067[82], i1067[83], i1067[84] )
  i1066.m_isUsingLegacyAnimationComponent = !!i1067[85]
  i1066.m_isVolumetricText = !!i1067[86]
  request.r(i1067[87], i1067[88], 0, i1066, 'm_Material')
  i1066.m_EmojiFallbackSupport = !!i1067[89]
  i1066.m_Maskable = !!i1067[90]
  i1066.m_Color = new pc.Color(i1067[91], i1067[92], i1067[93], i1067[94])
  i1066.m_RaycastTarget = !!i1067[95]
  i1066.m_RaycastPadding = new pc.Vec4( i1067[96], i1067[97], i1067[98], i1067[99] )
  return i1066
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1074 = root || request.c( 'UnityEngine.UI.Image' )
  var i1075 = data
  request.r(i1075[0], i1075[1], 0, i1074, 'm_Sprite')
  i1074.m_Type = i1075[2]
  i1074.m_PreserveAspect = !!i1075[3]
  i1074.m_FillCenter = !!i1075[4]
  i1074.m_FillMethod = i1075[5]
  i1074.m_FillAmount = i1075[6]
  i1074.m_FillClockwise = !!i1075[7]
  i1074.m_FillOrigin = i1075[8]
  i1074.m_UseSpriteMesh = !!i1075[9]
  i1074.m_PixelsPerUnitMultiplier = i1075[10]
  request.r(i1075[11], i1075[12], 0, i1074, 'm_Material')
  i1074.m_Maskable = !!i1075[13]
  i1074.m_Color = new pc.Color(i1075[14], i1075[15], i1075[16], i1075[17])
  i1074.m_RaycastTarget = !!i1075[18]
  i1074.m_RaycastPadding = new pc.Vec4( i1075[19], i1075[20], i1075[21], i1075[22] )
  return i1074
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1076 = root || request.c( 'UnityEngine.UI.Button' )
  var i1077 = data
  i1076.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1077[0], i1076.m_OnClick)
  i1076.m_Navigation = request.d('UnityEngine.UI.Navigation', i1077[1], i1076.m_Navigation)
  i1076.m_Transition = i1077[2]
  i1076.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1077[3], i1076.m_Colors)
  i1076.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1077[4], i1076.m_SpriteState)
  i1076.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1077[5], i1076.m_AnimationTriggers)
  i1076.m_Interactable = !!i1077[6]
  request.r(i1077[7], i1077[8], 0, i1076, 'm_TargetGraphic')
  return i1076
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1078 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1079 = data
  i1078.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1079[0], i1078.m_PersistentCalls)
  return i1078
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1080 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1081 = data
  var i1083 = i1081[0]
  var i1082 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1083.length; i += 1) {
    i1082.add(request.d('UnityEngine.Events.PersistentCall', i1083[i + 0]));
  }
  i1080.m_Calls = i1082
  return i1080
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1086 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1087 = data
  request.r(i1087[0], i1087[1], 0, i1086, 'm_Target')
  i1086.m_TargetAssemblyTypeName = i1087[2]
  i1086.m_MethodName = i1087[3]
  i1086.m_Mode = i1087[4]
  i1086.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1087[5], i1086.m_Arguments)
  i1086.m_CallState = i1087[6]
  return i1086
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1088 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1089 = data
  i1088.m_Mode = i1089[0]
  i1088.m_WrapAround = !!i1089[1]
  request.r(i1089[2], i1089[3], 0, i1088, 'm_SelectOnUp')
  request.r(i1089[4], i1089[5], 0, i1088, 'm_SelectOnDown')
  request.r(i1089[6], i1089[7], 0, i1088, 'm_SelectOnLeft')
  request.r(i1089[8], i1089[9], 0, i1088, 'm_SelectOnRight')
  return i1088
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1090 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1091 = data
  i1090.m_NormalColor = new pc.Color(i1091[0], i1091[1], i1091[2], i1091[3])
  i1090.m_HighlightedColor = new pc.Color(i1091[4], i1091[5], i1091[6], i1091[7])
  i1090.m_PressedColor = new pc.Color(i1091[8], i1091[9], i1091[10], i1091[11])
  i1090.m_SelectedColor = new pc.Color(i1091[12], i1091[13], i1091[14], i1091[15])
  i1090.m_DisabledColor = new pc.Color(i1091[16], i1091[17], i1091[18], i1091[19])
  i1090.m_ColorMultiplier = i1091[20]
  i1090.m_FadeDuration = i1091[21]
  return i1090
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1092 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1093 = data
  request.r(i1093[0], i1093[1], 0, i1092, 'm_HighlightedSprite')
  request.r(i1093[2], i1093[3], 0, i1092, 'm_PressedSprite')
  request.r(i1093[4], i1093[5], 0, i1092, 'm_SelectedSprite')
  request.r(i1093[6], i1093[7], 0, i1092, 'm_DisabledSprite')
  return i1092
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1094 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1095 = data
  i1094.m_NormalTrigger = i1095[0]
  i1094.m_HighlightedTrigger = i1095[1]
  i1094.m_PressedTrigger = i1095[2]
  i1094.m_SelectedTrigger = i1095[3]
  i1094.m_DisabledTrigger = i1095[4]
  return i1094
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i1096 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i1097 = data
  i1096.m_StartCorner = i1097[0]
  i1096.m_StartAxis = i1097[1]
  i1096.m_CellSize = new pc.Vec2( i1097[2], i1097[3] )
  i1096.m_Spacing = new pc.Vec2( i1097[4], i1097[5] )
  i1096.m_Constraint = i1097[6]
  i1096.m_ConstraintCount = i1097[7]
  i1096.m_Padding = UnityEngine.RectOffset.FromPaddings(i1097[8], i1097[9], i1097[10], i1097[11])
  i1096.m_ChildAlignment = i1097[12]
  return i1096
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i1098 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i1099 = data
  i1098.m_Spacing = i1099[0]
  i1098.m_ChildForceExpandWidth = !!i1099[1]
  i1098.m_ChildForceExpandHeight = !!i1099[2]
  i1098.m_ChildControlWidth = !!i1099[3]
  i1098.m_ChildControlHeight = !!i1099[4]
  i1098.m_ChildScaleWidth = !!i1099[5]
  i1098.m_ChildScaleHeight = !!i1099[6]
  i1098.m_ReverseArrangement = !!i1099[7]
  i1098.m_Padding = UnityEngine.RectOffset.FromPaddings(i1099[8], i1099[9], i1099[10], i1099[11])
  i1098.m_ChildAlignment = i1099[12]
  return i1098
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i1100 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i1101 = data
  i1100.m_HorizontalFit = i1101[0]
  i1100.m_VerticalFit = i1101[1]
  return i1100
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i1102 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i1103 = data
  request.r(i1103[0], i1103[1], 0, i1102, 'm_Content')
  i1102.m_Horizontal = !!i1103[2]
  i1102.m_Vertical = !!i1103[3]
  i1102.m_MovementType = i1103[4]
  i1102.m_Elasticity = i1103[5]
  i1102.m_Inertia = !!i1103[6]
  i1102.m_DecelerationRate = i1103[7]
  i1102.m_ScrollSensitivity = i1103[8]
  request.r(i1103[9], i1103[10], 0, i1102, 'm_Viewport')
  request.r(i1103[11], i1103[12], 0, i1102, 'm_HorizontalScrollbar')
  request.r(i1103[13], i1103[14], 0, i1102, 'm_VerticalScrollbar')
  i1102.m_HorizontalScrollbarVisibility = i1103[15]
  i1102.m_VerticalScrollbarVisibility = i1103[16]
  i1102.m_HorizontalScrollbarSpacing = i1103[17]
  i1102.m_VerticalScrollbarSpacing = i1103[18]
  i1102.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i1103[19], i1102.m_OnValueChanged)
  return i1102
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i1104 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i1105 = data
  i1104.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1105[0], i1104.m_PersistentCalls)
  return i1104
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i1106 = root || request.c( 'UnityEngine.UI.Mask' )
  var i1107 = data
  i1106.m_ShowMaskGraphic = !!i1107[0]
  return i1106
}

Deserializers["UnityEngine.UI.Scrollbar"] = function (request, data, root) {
  var i1108 = root || request.c( 'UnityEngine.UI.Scrollbar' )
  var i1109 = data
  request.r(i1109[0], i1109[1], 0, i1108, 'm_HandleRect')
  i1108.m_Direction = i1109[2]
  i1108.m_Value = i1109[3]
  i1108.m_Size = i1109[4]
  i1108.m_NumberOfSteps = i1109[5]
  i1108.m_OnValueChanged = request.d('UnityEngine.UI.Scrollbar+ScrollEvent', i1109[6], i1108.m_OnValueChanged)
  i1108.m_Navigation = request.d('UnityEngine.UI.Navigation', i1109[7], i1108.m_Navigation)
  i1108.m_Transition = i1109[8]
  i1108.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1109[9], i1108.m_Colors)
  i1108.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1109[10], i1108.m_SpriteState)
  i1108.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1109[11], i1108.m_AnimationTriggers)
  i1108.m_Interactable = !!i1109[12]
  request.r(i1109[13], i1109[14], 0, i1108, 'm_TargetGraphic')
  return i1108
}

Deserializers["UnityEngine.UI.Scrollbar+ScrollEvent"] = function (request, data, root) {
  var i1110 = root || request.c( 'UnityEngine.UI.Scrollbar+ScrollEvent' )
  var i1111 = data
  i1110.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1111[0], i1110.m_PersistentCalls)
  return i1110
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i1112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i1113 = data
  i1112.m_Alpha = i1113[0]
  i1112.m_Interactable = !!i1113[1]
  i1112.m_BlocksRaycasts = !!i1113[2]
  i1112.m_IgnoreParentGroups = !!i1113[3]
  i1112.enabled = !!i1113[4]
  return i1112
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1114 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1115 = data
  i1114.name = i1115[0]
  i1114.index = i1115[1]
  i1114.startup = !!i1115[2]
  return i1114
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1116 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1117 = data
  i1116.type = i1117[0]
  i1116.color = new pc.Color(i1117[1], i1117[2], i1117[3], i1117[4])
  i1116.cullingMask = i1117[5]
  i1116.intensity = i1117[6]
  i1116.range = i1117[7]
  i1116.spotAngle = i1117[8]
  i1116.shadows = i1117[9]
  i1116.shadowNormalBias = i1117[10]
  i1116.shadowBias = i1117[11]
  i1116.shadowStrength = i1117[12]
  i1116.shadowResolution = i1117[13]
  i1116.lightmapBakeType = i1117[14]
  i1116.renderMode = i1117[15]
  request.r(i1117[16], i1117[17], 0, i1116, 'cookie')
  i1116.cookieSize = i1117[18]
  i1116.shadowNearPlane = i1117[19]
  i1116.occlusionMaskChannel = i1117[20]
  i1116.isBaked = !!i1117[21]
  i1116.mixedLightingMode = i1117[22]
  i1116.enabled = !!i1117[23]
  return i1116
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1118 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1119 = data
  request.r(i1119[0], i1119[1], 0, i1118, 'clip')
  request.r(i1119[2], i1119[3], 0, i1118, 'outputAudioMixerGroup')
  i1118.playOnAwake = !!i1119[4]
  i1118.loop = !!i1119[5]
  i1118.time = i1119[6]
  i1118.volume = i1119[7]
  i1118.pitch = i1119[8]
  i1118.enabled = !!i1119[9]
  return i1118
}

Deserializers["PlayableSpatialAudio"] = function (request, data, root) {
  var i1120 = root || request.c( 'PlayableSpatialAudio' )
  var i1121 = data
  request.r(i1121[0], i1121[1], 0, i1120, 'listener')
  request.r(i1121[2], i1121[3], 0, i1120, 'source')
  i1120.volume = i1121[4]
  i1120.minDistance = i1121[5]
  i1120.maxDistance = i1121[6]
  i1120.linear = !!i1121[7]
  return i1120
}

Deserializers["StealEggGame"] = function (request, data, root) {
  var i1122 = root || request.c( 'StealEggGame' )
  var i1123 = data
  var i1125 = i1123[0]
  var i1124 = []
  for(var i = 0; i < i1125.length; i += 1) {
    i1124.push( request.d('StealEggGame+PetInfo', i1125[i + 0]) );
  }
  i1122.petCatalog = i1124
  var i1127 = i1123[1]
  var i1126 = []
  for(var i = 0; i < i1127.length; i += 1) {
    i1126.push( request.d('StealEggGame+TrailInfo', i1127[i + 0]) );
  }
  i1122.trails = i1126
  var i1129 = i1123[2]
  var i1128 = []
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.push( request.d('StealEggGame+BoostInfo', i1129[i + 0]) );
  }
  i1122.luckyEggRewards = i1128
  request.r(i1123[3], i1123[4], 0, i1122, 'playerHair')
  var i1131 = i1123[5]
  var i1130 = []
  for(var i = 0; i < i1131.length; i += 2) {
  request.r(i1131[i + 0], i1131[i + 1], 2, i1130, '')
  }
  i1122.outfitHairs = i1130
  var i1133 = i1123[6]
  var i1132 = []
  for(var i = 0; i < i1133.length; i += 2) {
  request.r(i1133[i + 0], i1133[i + 1], 2, i1132, '')
  }
  i1122.outfitFaces = i1132
  var i1135 = i1123[7]
  var i1134 = []
  for(var i = 0; i < i1135.length; i += 2) {
  request.r(i1135[i + 0], i1135[i + 1], 2, i1134, '')
  }
  i1122.outfitShirts = i1134
  var i1137 = i1123[8]
  var i1136 = []
  for(var i = 0; i < i1137.length; i += 2) {
  request.r(i1137[i + 0], i1137[i + 1], 2, i1136, '')
  }
  i1122.outfitPants = i1136
  var i1139 = i1123[9]
  var i1138 = []
  for(var i = 0; i < i1139.length; i += 2) {
  request.r(i1139[i + 0], i1139[i + 1], 2, i1138, '')
  }
  i1122.rarityMaterials = i1138
  var i1141 = i1123[10]
  var i1140 = []
  for(var i = 0; i < i1141.length; i += 2) {
  request.r(i1141[i + 0], i1141[i + 1], 2, i1140, '')
  }
  i1122.rarityWorldMaterials = i1140
  request.r(i1123[11], i1123[12], 0, i1122, 'rarityFont')
  var i1143 = i1123[13]
  var i1142 = []
  for(var i = 0; i < i1143.length; i += 2) {
  request.r(i1143[i + 0], i1143[i + 1], 2, i1142, '')
  }
  i1122.rarityFrames = i1142
  request.r(i1123[14], i1123[15], 0, i1122, 'batIcon')
  request.r(i1123[16], i1123[17], 0, i1122, 'nightIcon')
  request.r(i1123[18], i1123[19], 0, i1122, 'dayIcon')
  request.r(i1123[20], i1123[21], 0, i1122, 'trainBoostIcon')
  request.r(i1123[22], i1123[23], 0, i1122, 'incubateBoostIcon')
  request.r(i1123[24], i1123[25], 0, i1122, 'batPrefab')
  request.r(i1123[26], i1123[27], 0, i1122, 'luckyEggPrefab')
  request.r(i1123[28], i1123[29], 0, i1122, 'incubateTimerPrefab')
  request.r(i1123[30], i1123[31], 0, i1122, 'floatingTextPrefab')
  request.r(i1123[32], i1123[33], 0, i1122, 'npcTemplate')
  request.r(i1123[34], i1123[35], 0, i1122, 'footstepSound')
  request.r(i1123[36], i1123[37], 0, i1122, 'clickSound')
  request.r(i1123[38], i1123[39], 0, i1122, 'closeSound')
  request.r(i1123[40], i1123[41], 0, i1122, 'rewardSound')
  request.r(i1123[42], i1123[43], 0, i1122, 'upgradeSound')
  request.r(i1123[44], i1123[45], 0, i1122, 'trainSound')
  request.r(i1123[46], i1123[47], 0, i1122, 'equipSound')
  request.r(i1123[48], i1123[49], 0, i1122, 'fuseSound')
  request.r(i1123[50], i1123[51], 0, i1122, 'frogSound')
  request.r(i1123[52], i1123[53], 0, i1122, 'progressSound')
  request.r(i1123[54], i1123[55], 0, i1122, 'warningSound')
  request.r(i1123[56], i1123[57], 0, i1122, 'crackSound')
  request.r(i1123[58], i1123[59], 0, i1122, 'popupSound')
  i1122.coopPrices = i1123[60]
  i1122.coopModelByLevel = i1123[61]
  i1122.coopBaseSlots = i1123[62]
  i1122.treadmillPrices = i1123[63]
  i1122.treadmillTrainValues = i1123[64]
  i1122.priceMultiplier = i1123[65]
  i1122.dayDuration = i1123[66]
  i1122.nightDuration = i1123[67]
  i1122.nightIncubateMultiplier = i1123[68]
  i1122.dayLightIntensity = i1123[69]
  i1122.lightTransition = i1123[70]
  i1122.incomeMultiplierBySize = i1123[71]
  i1122.sellPriceMultiplier = i1123[72]
  i1122.luckyFrogFeedMultiplier = i1123[73]
  i1122.trainTick = i1123[74]
  i1122.hatchDuration = i1123[75]
  i1122.luckyEggOpenDuration = i1123[76]
  i1122.fuseDuration = i1123[77]
  i1122.npcCount = i1123[78]
  i1122.npcCoopSmallPets = i1123[79]
  i1122.npcCoopBigPetSize = i1123[80]
  i1122.npcMinSpeed = i1123[81]
  i1122.npcMaxSpeed = i1123[82]
  i1122.batCooldown = i1123[83]
  i1122.batForce = i1123[84]
  var i1145 = i1123[85]
  var i1144 = []
  for(var i = 0; i < i1145.length; i += 1) {
    i1144.push( request.d('StealEggGame+House', i1145[i + 0]) );
  }
  i1122.houses = i1144
  request.r(i1123[86], i1123[87], 0, i1122, 'fuseMachine')
  request.r(i1123[88], i1123[89], 0, i1122, 'exchangeShop')
  request.r(i1123[90], i1123[91], 0, i1122, 'luckyFrog')
  request.r(i1123[92], i1123[93], 0, i1122, 'luckyEggSpawn')
  request.r(i1123[94], i1123[95], 0, i1122, 'luckyEggTarget')
  request.r(i1123[96], i1123[97], 0, i1122, 'teleportPoint')
  request.r(i1123[98], i1123[99], 0, i1122, 'lobbyCenter')
  request.r(i1123[100], i1123[101], 0, i1122, 'originalUI')
  i1122.lobbySize = new pc.Vec3( i1123[102], i1123[103], i1123[104] )
  request.r(i1123[105], i1123[106], 0, i1122, 'combatArea')
  request.r(i1123[107], i1123[108], 0, i1122, 'nightGraphic')
  request.r(i1123[109], i1123[110], 0, i1122, 'nightText')
  request.r(i1123[111], i1123[112], 0, i1122, 'sun')
  var i1147 = i1123[113]
  var i1146 = []
  for(var i = 0; i < i1147.length; i += 2) {
  request.r(i1147[i + 0], i1147[i + 1], 2, i1146, '')
  }
  i1122.npcModels = i1146
  var i1149 = i1123[114]
  var i1148 = []
  for(var i = 0; i < i1149.length; i += 1) {
    i1148.push( request.d('StealEggGame+Zone', i1149[i + 0]) );
  }
  i1122.zones = i1148
  request.r(i1123[115], i1123[116], 0, i1122, 'player')
  request.r(i1123[117], i1123[118], 0, i1122, 'home')
  request.r(i1123[119], i1123[120], 0, i1122, 'safePoint')
  request.r(i1123[121], i1123[122], 0, i1122, 'rightHandSlot')
  request.r(i1123[123], i1123[124], 0, i1122, 'playerCoopArea')
  request.r(i1123[125], i1123[126], 0, i1122, 'trainingPoint')
  request.r(i1123[127], i1123[128], 0, i1122, 'gameCamera')
  request.r(i1123[129], i1123[130], 0, i1122, 'playerAnimator')
  request.r(i1123[131], i1123[132], 0, i1122, 'ragdoll')
  request.r(i1123[133], i1123[134], 0, i1122, 'uiFont')
  request.r(i1123[135], i1123[136], 0, i1122, 'guideMaterial')
  request.r(i1123[137], i1123[138], 0, i1122, 'roundedSprite')
  request.r(i1123[139], i1123[140], 0, i1122, 'circleSprite')
  request.r(i1123[141], i1123[142], 0, i1122, 'moneyIcon')
  request.r(i1123[143], i1123[144], 0, i1122, 'speedIcon')
  request.r(i1123[145], i1123[146], 0, i1122, 'stealSound')
  request.r(i1123[147], i1123[148], 0, i1122, 'deliverSound')
  request.r(i1123[149], i1123[150], 0, i1122, 'hatchSound')
  request.r(i1123[151], i1123[152], 0, i1122, 'caughtSound')
  request.r(i1123[153], i1123[154], 0, i1122, 'eggBreakEffect')
  request.r(i1123[155], i1123[156], 0, i1122, 'sourceHud')
  i1122.capturesForEndCard = i1123[157]
  i1122.moveSpeed = i1123[158]
  i1122.incubationSeconds = i1123[159]
  i1122.jumpHeight = i1123[160]
  i1122.gravity = i1123[161]
  i1122.baseMoveSpeed = i1123[162]
  i1122.speedPowerMultiplier = i1123[163]
  i1122.trainingPowerPerTick = i1123[164]
  i1122.startingMoney = i1123[165]
  i1122.slowMode = !!i1123[166]
  i1122.hitWindup = i1123[167]
  i1122.knockdownDuration = i1123[168]
  i1122.getUpDuration = i1123[169]
  request.r(i1123[170], i1123[171], 0, i1122, 'guide')
  i1122.hudUI = request.d('StealEggGame+HudUI', i1123[172], i1122.hudUI)
  i1122.petsUI = request.d('StealEggGame+PetsPopupUI', i1123[173], i1122.petsUI)
  i1122.incubateUI = request.d('StealEggGame+IncubatePopupUI', i1123[174], i1122.incubateUI)
  i1122.inventoryUI = request.d('StealEggGame+InventoryUI', i1123[175], i1122.inventoryUI)
  i1122.rewardUI = request.d('StealEggGame+RewardUI', i1123[176], i1122.rewardUI)
  i1122.dialogUI = request.d('StealEggGame+DialogUI', i1123[177], i1122.dialogUI)
  request.r(i1123[178], i1123[179], 0, i1122, 'warningPanel')
  i1122.treadmillUI = request.d('StealEggGame+TreadmillPanelUI', i1123[180], i1122.treadmillUI)
  i1122.indexUI = request.d('StealEggGame+IndexUI', i1123[181], i1122.indexUI)
  i1122.settingsUI = request.d('StealEggGame+LockedPanelUI', i1123[182], i1122.settingsUI)
  i1122.coopUI = request.d('StealEggGame+LockedPanelUI', i1123[183], i1122.coopUI)
  i1122.fuseUI = request.d('StealEggGame+LockedPanelUI', i1123[184], i1122.fuseUI)
  i1122.frogUI = request.d('StealEggGame+LockedPanelUI', i1123[185], i1122.frogUI)
  i1122.shopUI = request.d('StealEggGame+LockedPanelUI', i1123[186], i1122.shopUI)
  i1122.trailUI = request.d('StealEggGame+LockedPanelUI', i1123[187], i1122.trailUI)
  request.r(i1123[188], i1123[189], 0, i1122, 'jumpButton')
  request.r(i1123[190], i1123[191], 0, i1122, 'safeUI')
  request.r(i1123[192], i1123[193], 0, i1122, 'hintHand')
  request.r(i1123[194], i1123[195], 0, i1122, 'cameraHint')
  request.r(i1123[196], i1123[197], 0, i1122, 'jumpHint')
  request.r(i1123[198], i1123[199], 0, i1122, 'tutorialText')
  request.r(i1123[200], i1123[201], 0, i1122, 'joystick')
  return i1122
}

Deserializers["StealEggGame+PetInfo"] = function (request, data, root) {
  var i1152 = root || request.c( 'StealEggGame+PetInfo' )
  var i1153 = data
  i1152.name = i1153[0]
  i1152.rarity = i1153[1]
  i1152.zone = i1153[2]
  i1152.income = i1153[3]
  request.r(i1153[4], i1153[5], 0, i1152, 'thumbnail')
  request.r(i1153[6], i1153[7], 0, i1152, 'prefab')
  return i1152
}

Deserializers["StealEggGame+TrailInfo"] = function (request, data, root) {
  var i1156 = root || request.c( 'StealEggGame+TrailInfo' )
  var i1157 = data
  i1156.name = i1157[0]
  i1156.rarity = i1157[1]
  i1156.multiplier = i1157[2]
  i1156.price = i1157[3]
  request.r(i1157[4], i1157[5], 0, i1156, 'thumbnail')
  request.r(i1157[6], i1157[7], 0, i1156, 'frame')
  request.r(i1157[8], i1157[9], 0, i1156, 'prefab')
  return i1156
}

Deserializers["StealEggGame+BoostInfo"] = function (request, data, root) {
  var i1160 = root || request.c( 'StealEggGame+BoostInfo' )
  var i1161 = data
  i1160.name = i1161[0]
  i1160.type = i1161[1]
  i1160.value = i1161[2]
  i1160.duration = i1161[3]
  i1160.weight = i1161[4]
  request.r(i1161[5], i1161[6], 0, i1160, 'icon')
  return i1160
}

Deserializers["StealEggGame+House"] = function (request, data, root) {
  var i1166 = root || request.c( 'StealEggGame+House' )
  var i1167 = data
  request.r(i1167[0], i1167[1], 0, i1166, 'root')
  request.r(i1167[2], i1167[3], 0, i1166, 'coopPad')
  request.r(i1167[4], i1167[5], 0, i1166, 'treadmillPad')
  request.r(i1167[6], i1167[7], 0, i1166, 'petContainer')
  var i1169 = i1167[8]
  var i1168 = []
  for(var i = 0; i < i1169.length; i += 2) {
  request.r(i1169[i + 0], i1169[i + 1], 2, i1168, '')
  }
  i1166.coopModels = i1168
  var i1171 = i1167[9]
  var i1170 = []
  for(var i = 0; i < i1171.length; i += 2) {
  request.r(i1171[i + 0], i1171[i + 1], 2, i1170, '')
  }
  i1166.treadmills = i1170
  return i1166
}

Deserializers["StealEggGame+Zone"] = function (request, data, root) {
  var i1176 = root || request.c( 'StealEggGame+Zone' )
  var i1177 = data
  i1176.name = i1177[0]
  request.r(i1177[1], i1177[2], 0, i1176, 'root')
  request.r(i1177[3], i1177[4], 0, i1176, 'guardian')
  var i1179 = i1177[5]
  var i1178 = []
  for(var i = 0; i < i1179.length; i += 2) {
  request.r(i1179[i + 0], i1179[i + 1], 2, i1178, '')
  }
  i1176.nests = i1178
  var i1181 = i1177[6]
  var i1180 = []
  for(var i = 0; i < i1181.length; i += 2) {
  request.r(i1181[i + 0], i1181[i + 1], 2, i1180, '')
  }
  i1176.eggPrefabs = i1180
  var i1183 = i1177[7]
  var i1182 = []
  for(var i = 0; i < i1183.length; i += 2) {
  request.r(i1183[i + 0], i1183[i + 1], 2, i1182, '')
  }
  i1176.petPrefabs = i1182
  var i1185 = i1177[8]
  var i1184 = []
  for(var i = 0; i < i1185.length; i += 1) {
    i1184.push( request.d('PlayableEggRules', i1185[i + 0]) );
  }
  i1176.eggRules = i1184
  request.r(i1177[9], i1177[10], 0, i1176, 'bounds')
  request.r(i1177[11], i1177[12], 0, i1176, 'thumbnail')
  i1176.attackDistance = i1177[13]
  i1176.guardianSpeed = i1177[14]
  request.r(i1177[15], i1177[16], 0, i1176, 'sleepSound')
  request.r(i1177[17], i1177[18], 0, i1176, 'runSound')
  request.r(i1177[19], i1177[20], 0, i1176, 'catchSound')
  return i1176
}

Deserializers["PlayableEggRules"] = function (request, data, root) {
  var i1188 = root || request.c( 'PlayableEggRules' )
  var i1189 = data
  i1188.name = i1189[0]
  request.r(i1189[1], i1189[2], 0, i1188, 'thumbnail')
  i1188.petIds = i1189[3]
  i1188.spawnWeight = i1189[4]
  i1188.incubationTime = i1189[5]
  var i1191 = i1189[6]
  var i1190 = []
  for(var i = 0; i < i1191.length; i += 2) {
    i1190.push( new pc.Vec2( i1191[i + 0], i1191[i + 1] ) );
  }
  i1188.sizeRanges = i1190
  i1188.sizeWeights = i1189[7]
  var i1193 = i1189[8]
  var i1192 = []
  for(var i = 0; i < i1193.length; i += 2) {
  request.r(i1193[i + 0], i1193[i + 1], 2, i1192, '')
  }
  i1188.pets = i1192
  i1188.petWeights = i1189[9]
  i1188.petIncome = i1189[10]
  return i1188
}

Deserializers["StealEggGame+HudUI"] = function (request, data, root) {
  var i1196 = root || request.c( 'StealEggGame+HudUI' )
  var i1197 = data
  request.r(i1197[0], i1197[1], 0, i1196, 'functions')
  var i1199 = i1197[2]
  var i1198 = []
  for(var i = 0; i < i1199.length; i += 2) {
  request.r(i1199[i + 0], i1199[i + 1], 2, i1198, '')
  }
  i1196.actionButtons = i1198
  request.r(i1197[3], i1197[4], 0, i1196, 'incubateTapHint')
  request.r(i1197[5], i1197[6], 0, i1196, 'hatchTapHint')
  request.r(i1197[7], i1197[8], 0, i1196, 'equipTapHint')
  request.r(i1197[9], i1197[10], 0, i1196, 'trainTapHint')
  request.r(i1197[11], i1197[12], 0, i1196, 'attack')
  request.r(i1197[13], i1197[14], 0, i1196, 'settings')
  request.r(i1197[15], i1197[16], 0, i1196, 'trailShop')
  request.r(i1197[17], i1197[18], 0, i1196, 'index')
  request.r(i1197[19], i1197[20], 0, i1196, 'speedMode')
  request.r(i1197[21], i1197[22], 0, i1196, 'speedOn')
  request.r(i1197[23], i1197[24], 0, i1196, 'speedOff')
  request.r(i1197[25], i1197[26], 0, i1196, 'money')
  request.r(i1197[27], i1197[28], 0, i1196, 'speed')
  request.r(i1197[29], i1197[30], 0, i1196, 'time')
  request.r(i1197[31], i1197[32], 0, i1196, 'moneyIcon')
  request.r(i1197[33], i1197[34], 0, i1196, 'speedIcon')
  request.r(i1197[35], i1197[36], 0, i1196, 'timeIcon')
  request.r(i1197[37], i1197[38], 0, i1196, 'indexHighlight')
  request.r(i1197[39], i1197[40], 0, i1196, 'incubateHighlight')
  request.r(i1197[41], i1197[42], 0, i1196, 'right')
  request.r(i1197[43], i1197[44], 0, i1196, 'equipMonster')
  request.r(i1197[45], i1197[46], 0, i1196, 'incubateEgg')
  request.r(i1197[47], i1197[48], 0, i1196, 'boostContainer')
  request.r(i1197[49], i1197[50], 0, i1196, 'boostTemplate')
  request.r(i1197[51], i1197[52], 0, i1196, 'zoneBanner')
  request.r(i1197[53], i1197[54], 0, i1196, 'zoneFrame')
  request.r(i1197[55], i1197[56], 0, i1196, 'zoneName')
  request.r(i1197[57], i1197[58], 0, i1196, 'incomeTemplate')
  return i1196
}

Deserializers["StealEggGame+PetsPopupUI"] = function (request, data, root) {
  var i1200 = root || request.c( 'StealEggGame+PetsPopupUI' )
  var i1201 = data
  request.r(i1201[0], i1201[1], 0, i1200, 'root')
  request.r(i1201[2], i1201[3], 0, i1200, 'content')
  request.r(i1201[4], i1201[5], 0, i1200, 'template')
  request.r(i1201[6], i1201[7], 0, i1200, 'close')
  request.r(i1201[8], i1201[9], 0, i1200, 'equipBest')
  request.r(i1201[10], i1201[11], 0, i1200, 'upgradeSlot')
  request.r(i1201[12], i1201[13], 0, i1200, 'slots')
  request.r(i1201[14], i1201[15], 0, i1200, 'upgradePrice')
  request.r(i1201[16], i1201[17], 0, i1200, 'upgradeUnavailable')
  return i1200
}

Deserializers["StealEggGame+IncubatePopupUI"] = function (request, data, root) {
  var i1202 = root || request.c( 'StealEggGame+IncubatePopupUI' )
  var i1203 = data
  request.r(i1203[0], i1203[1], 0, i1202, 'root')
  request.r(i1203[2], i1203[3], 0, i1202, 'content')
  request.r(i1203[4], i1203[5], 0, i1202, 'template')
  request.r(i1203[6], i1203[7], 0, i1202, 'close')
  return i1202
}

Deserializers["StealEggGame+InventoryUI"] = function (request, data, root) {
  var i1204 = root || request.c( 'StealEggGame+InventoryUI' )
  var i1205 = data
  var i1207 = i1205[0]
  var i1206 = []
  for(var i = 0; i < i1207.length; i += 2) {
  request.r(i1207[i + 0], i1207[i + 1], 2, i1206, '')
  }
  i1204.quickSlots = i1206
  request.r(i1205[1], i1205[2], 0, i1204, 'bag')
  request.r(i1205[3], i1205[4], 0, i1204, 'bagClose')
  request.r(i1205[5], i1205[6], 0, i1204, 'bagPopup')
  request.r(i1205[7], i1205[8], 0, i1204, 'bagContent')
  request.r(i1205[9], i1205[10], 0, i1204, 'bagTemplate')
  request.r(i1205[11], i1205[12], 0, i1204, 'petInfo')
  request.r(i1205[13], i1205[14], 0, i1204, 'petThumbnail')
  request.r(i1205[15], i1205[16], 0, i1204, 'petName')
  request.r(i1205[17], i1205[18], 0, i1204, 'petIncome')
  request.r(i1205[19], i1205[20], 0, i1204, 'petRarity')
  request.r(i1205[21], i1205[22], 0, i1204, 'petEquip')
  request.r(i1205[23], i1205[24], 0, i1204, 'petDrop')
  request.r(i1205[25], i1205[26], 0, i1204, 'eggInfo')
  request.r(i1205[27], i1205[28], 0, i1204, 'eggThumbnail')
  request.r(i1205[29], i1205[30], 0, i1204, 'eggName')
  request.r(i1205[31], i1205[32], 0, i1204, 'eggWeight')
  request.r(i1205[33], i1205[34], 0, i1204, 'eggIncubate')
  request.r(i1205[35], i1205[36], 0, i1204, 'eggDrop')
  return i1204
}

Deserializers["StealEggGame+RewardUI"] = function (request, data, root) {
  var i1210 = root || request.c( 'StealEggGame+RewardUI' )
  var i1211 = data
  request.r(i1211[0], i1211[1], 0, i1210, 'root')
  request.r(i1211[2], i1211[3], 0, i1210, 'title')
  request.r(i1211[4], i1211[5], 0, i1210, 'content')
  request.r(i1211[6], i1211[7], 0, i1210, 'template')
  request.r(i1211[8], i1211[9], 0, i1210, 'close')
  request.r(i1211[10], i1211[11], 0, i1210, 'tapToClose')
  return i1210
}

Deserializers["StealEggGame+DialogUI"] = function (request, data, root) {
  var i1212 = root || request.c( 'StealEggGame+DialogUI' )
  var i1213 = data
  request.r(i1213[0], i1213[1], 0, i1212, 'root')
  request.r(i1213[2], i1213[3], 0, i1212, 'message')
  return i1212
}

Deserializers["StealEggGame+TreadmillPanelUI"] = function (request, data, root) {
  var i1214 = root || request.c( 'StealEggGame+TreadmillPanelUI' )
  var i1215 = data
  request.r(i1215[0], i1215[1], 0, i1214, 'root')
  request.r(i1215[2], i1215[3], 0, i1214, 'close')
  request.r(i1215[4], i1215[5], 0, i1214, 'upgrade')
  request.r(i1215[6], i1215[7], 0, i1214, 'level')
  request.r(i1215[8], i1215[9], 0, i1214, 'train')
  request.r(i1215[10], i1215[11], 0, i1214, 'price')
  request.r(i1215[12], i1215[13], 0, i1214, 'max')
  return i1214
}

Deserializers["StealEggGame+IndexUI"] = function (request, data, root) {
  var i1216 = root || request.c( 'StealEggGame+IndexUI' )
  var i1217 = data
  request.r(i1217[0], i1217[1], 0, i1216, 'root')
  request.r(i1217[2], i1217[3], 0, i1216, 'close')
  request.r(i1217[4], i1217[5], 0, i1216, 'claim')
  request.r(i1217[6], i1217[7], 0, i1216, 'zones')
  request.r(i1217[8], i1217[9], 0, i1216, 'zoneTemplate')
  request.r(i1217[10], i1217[11], 0, i1216, 'lockedZone')
  request.r(i1217[12], i1217[13], 0, i1216, 'progressFill')
  request.r(i1217[14], i1217[15], 0, i1216, 'progress')
  request.r(i1217[16], i1217[17], 0, i1216, 'information')
  request.r(i1217[18], i1217[19], 0, i1216, 'rewardFrame')
  request.r(i1217[20], i1217[21], 0, i1216, 'claimed')
  request.r(i1217[22], i1217[23], 0, i1216, 'infoImage')
  request.r(i1217[24], i1217[25], 0, i1216, 'infoName')
  request.r(i1217[26], i1217[27], 0, i1216, 'infoIncome')
  request.r(i1217[28], i1217[29], 0, i1216, 'infoRarity')
  request.r(i1217[30], i1217[31], 0, i1216, 'rewardContent')
  request.r(i1217[32], i1217[33], 0, i1216, 'rewardTemplate')
  return i1216
}

Deserializers["StealEggGame+LockedPanelUI"] = function (request, data, root) {
  var i1218 = root || request.c( 'StealEggGame+LockedPanelUI' )
  var i1219 = data
  request.r(i1219[0], i1219[1], 0, i1218, 'root')
  request.r(i1219[2], i1219[3], 0, i1218, 'close')
  return i1218
}

Deserializers["PlayableRagdoll"] = function (request, data, root) {
  var i1220 = root || request.c( 'PlayableRagdoll' )
  var i1221 = data
  request.r(i1221[0], i1221[1], 0, i1220, 'player')
  request.r(i1221[2], i1221[3], 0, i1220, 'animator')
  request.r(i1221[4], i1221[5], 0, i1220, 'hips')
  var i1223 = i1221[6]
  var i1222 = []
  for(var i = 0; i < i1223.length; i += 2) {
  request.r(i1223[i + 0], i1223[i + 1], 2, i1222, '')
  }
  i1220.bodies = i1222
  var i1225 = i1221[7]
  var i1224 = []
  for(var i = 0; i < i1225.length; i += 2) {
  request.r(i1225[i + 0], i1225[i + 1], 2, i1224, '')
  }
  i1220.bodyColliders = i1224
  return i1220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.LineRenderer"] = function (request, data, root) {
  var i1230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.LineRenderer' )
  var i1231 = data
  i1230.textureMode = i1231[0]
  i1230.alignment = i1231[1]
  i1230.widthCurve = new pc.AnimationCurve( { keys_flow: i1231[2] } )
  i1230.colorGradient = i1231[3] ? new pc.ColorGradient(i1231[3][0], i1231[3][1], i1231[3][2]) : null
  var i1233 = i1231[4]
  var i1232 = []
  for(var i = 0; i < i1233.length; i += 3) {
    i1232.push( new pc.Vec3( i1233[i + 0], i1233[i + 1], i1233[i + 2] ) );
  }
  i1230.positions = i1232
  i1230.positionCount = i1231[5]
  i1230.widthMultiplier = i1231[6]
  i1230.startWidth = i1231[7]
  i1230.endWidth = i1231[8]
  i1230.numCornerVertices = i1231[9]
  i1230.numCapVertices = i1231[10]
  i1230.useWorldSpace = !!i1231[11]
  i1230.loop = !!i1231[12]
  i1230.startColor = new pc.Color(i1231[13], i1231[14], i1231[15], i1231[16])
  i1230.endColor = new pc.Color(i1231[17], i1231[18], i1231[19], i1231[20])
  i1230.generateLightingData = !!i1231[21]
  i1230.enabled = !!i1231[22]
  request.r(i1231[23], i1231[24], 0, i1230, 'sharedMaterial')
  var i1235 = i1231[25]
  var i1234 = []
  for(var i = 0; i < i1235.length; i += 2) {
  request.r(i1235[i + 0], i1235[i + 1], 2, i1234, '')
  }
  i1230.sharedMaterials = i1234
  i1230.receiveShadows = !!i1231[26]
  i1230.shadowCastingMode = i1231[27]
  i1230.sortingLayerID = i1231[28]
  i1230.sortingOrder = i1231[29]
  i1230.lightmapIndex = i1231[30]
  i1230.lightmapSceneIndex = i1231[31]
  i1230.lightmapScaleOffset = new pc.Vec4( i1231[32], i1231[33], i1231[34], i1231[35] )
  i1230.lightProbeUsage = i1231[36]
  i1230.reflectionProbeUsage = i1231[37]
  return i1230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterController"] = function (request, data, root) {
  var i1236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterController' )
  var i1237 = data
  i1236.enabled = !!i1237[0]
  i1236.center = new pc.Vec3( i1237[1], i1237[2], i1237[3] )
  i1236.radius = i1237[4]
  i1236.height = i1237[5]
  i1236.minMoveDistance = i1237[6]
  i1236.skinWidth = i1237[7]
  i1236.enableOverlapRecovery = !!i1237[8]
  return i1236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i1238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i1239 = data
  i1238.swingAxis = new pc.Vec3( i1239[0], i1239[1], i1239[2] )
  i1238.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i1239[3], i1238.twistLimitSpring)
  i1238.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i1239[4], i1238.swingLimitSpring)
  i1238.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i1239[5], i1238.lowTwistLimit)
  i1238.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i1239[6], i1238.highTwistLimit)
  i1238.swing1Limit = request.d('UnityEngine.SoftJointLimit', i1239[7], i1238.swing1Limit)
  i1238.swing2Limit = request.d('UnityEngine.SoftJointLimit', i1239[8], i1238.swing2Limit)
  request.r(i1239[9], i1239[10], 0, i1238, 'connectedBody')
  i1238.axis = new pc.Vec3( i1239[11], i1239[12], i1239[13] )
  i1238.anchor = new pc.Vec3( i1239[14], i1239[15], i1239[16] )
  i1238.connectedAnchor = new pc.Vec3( i1239[17], i1239[18], i1239[19] )
  i1238.autoConfigureConnectedAnchor = !!i1239[20]
  i1238.massScale = i1239[21]
  i1238.connectedMassScale = i1239[22]
  i1238.enableCollision = !!i1239[23]
  i1238.breakForce = i1239[24]
  i1238.breakTorque = i1239[25]
  return i1238
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1240 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1241 = data
  request.r(i1241[0], i1241[1], 0, i1240, 'm_FirstSelected')
  i1240.m_sendNavigationEvents = !!i1241[2]
  i1240.m_DragThreshold = i1241[3]
  return i1240
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1242 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1243 = data
  i1242.m_HorizontalAxis = i1243[0]
  i1242.m_VerticalAxis = i1243[1]
  i1242.m_SubmitButton = i1243[2]
  i1242.m_CancelButton = i1243[3]
  i1242.m_InputActionsPerSecond = i1243[4]
  i1242.m_RepeatDelay = i1243[5]
  i1242.m_ForceModuleActive = !!i1243[6]
  i1242.m_SendPointerHoverToParent = !!i1243[7]
  return i1242
}

Deserializers["PlayableCameraDrag"] = function (request, data, root) {
  var i1244 = root || request.c( 'PlayableCameraDrag' )
  var i1245 = data
  request.r(i1245[0], i1245[1], 0, i1244, 'cameraController')
  return i1244
}

Deserializers["PlayableJoystick"] = function (request, data, root) {
  var i1246 = root || request.c( 'PlayableJoystick' )
  var i1247 = data
  request.r(i1247[0], i1247[1], 0, i1246, 'knob')
  return i1246
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i1248 = root || request.c( 'UnityEngine.UI.Outline' )
  var i1249 = data
  i1248.m_EffectColor = new pc.Color(i1249[0], i1249[1], i1249[2], i1249[3])
  i1248.m_EffectDistance = new pc.Vec2( i1249[4], i1249[5] )
  i1248.m_UseGraphicAlpha = !!i1249[6]
  return i1248
}

Deserializers["TapHintView"] = function (request, data, root) {
  var i1250 = root || request.c( 'TapHintView' )
  var i1251 = data
  request.r(i1251[0], i1251[1], 0, i1250, 'hand')
  request.r(i1251[2], i1251[3], 0, i1250, 'shine')
  request.r(i1251[4], i1251[5], 0, i1250, 'shineGraphic')
  return i1250
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1252 = root || request.c( 'LunaController' )
  var i1253 = data
  i1252.LimitTimePlay = !!i1253[0]
  i1252.TimePlay = i1253[1]
  request.r(i1253[2], i1253[3], 0, i1252, 'BGM')
  i1252.LimitCountClick = !!i1253[4]
  i1252.MaxCountClick = i1253[5]
  i1252.LimitCountIncubate = !!i1253[6]
  i1252.MaxCountIncubate = i1253[7]
  i1252.LimitCountHatch = !!i1253[8]
  i1252.MaxCountHatch = i1253[9]
  i1252.IAPVersion = i1253[10]
  i1252.IAPDistance = i1253[11]
  request.r(i1253[12], i1253[13], 0, i1252, 'musicSource')
  var i1255 = i1253[14]
  var i1254 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i1255.length; i += 2) {
  request.r(i1255[i + 0], i1255[i + 1], 1, i1254, '')
  }
  i1252.CTA = i1254
  request.r(i1253[15], i1253[16], 0, i1252, 'endCard')
  request.r(i1253[17], i1253[18], 0, i1252, 'iapPopup')
  return i1252
}

Deserializers["IconAmountView"] = function (request, data, root) {
  var i1258 = root || request.c( 'IconAmountView' )
  var i1259 = data
  request.r(i1259[0], i1259[1], 0, i1258, 'icon')
  request.r(i1259[2], i1259[3], 0, i1258, 'amount')
  return i1258
}

Deserializers["PlayableHoldButton"] = function (request, data, root) {
  var i1260 = root || request.c( 'PlayableHoldButton' )
  var i1261 = data
  i1260.duration = i1261[0]
  request.r(i1261[1], i1261[2], 0, i1260, 'fill')
  i1260.onHold = request.d('System.Action', i1261[3], i1260.onHold)
  return i1260
}

Deserializers["System.Action"] = function (request, data, root) {
  var i1262 = root || request.c( 'System.Action' )
  var i1263 = data
  return i1262
}

Deserializers["PetRowView"] = function (request, data, root) {
  var i1264 = root || request.c( 'PetRowView' )
  var i1265 = data
  request.r(i1265[0], i1265[1], 0, i1264, 'content')
  request.r(i1265[2], i1265[3], 0, i1264, 'thumbnail')
  request.r(i1265[4], i1265[5], 0, i1264, 'unequip')
  return i1264
}

Deserializers["IncubateRowView"] = function (request, data, root) {
  var i1266 = root || request.c( 'IncubateRowView' )
  var i1267 = data
  request.r(i1267[0], i1267[1], 0, i1266, 'thumbnail')
  request.r(i1267[2], i1267[3], 0, i1266, 'progressFill')
  request.r(i1267[4], i1267[5], 0, i1266, 'content')
  request.r(i1267[6], i1267[7], 0, i1266, 'open')
  request.r(i1267[8], i1267[9], 0, i1266, 'opening')
  return i1266
}

Deserializers["BagCellView"] = function (request, data, root) {
  var i1268 = root || request.c( 'BagCellView' )
  var i1269 = data
  request.r(i1269[0], i1269[1], 0, i1268, 'button')
  request.r(i1269[2], i1269[3], 0, i1268, 'thumbnail')
  request.r(i1269[4], i1269[5], 0, i1268, 'highlight')
  request.r(i1269[6], i1269[7], 0, i1268, 'exposeMark')
  request.r(i1269[8], i1269[9], 0, i1268, 'amount')
  return i1268
}

Deserializers["UnityEngine.UI.HorizontalLayoutGroup"] = function (request, data, root) {
  var i1270 = root || request.c( 'UnityEngine.UI.HorizontalLayoutGroup' )
  var i1271 = data
  i1270.m_Spacing = i1271[0]
  i1270.m_ChildForceExpandWidth = !!i1271[1]
  i1270.m_ChildForceExpandHeight = !!i1271[2]
  i1270.m_ChildControlWidth = !!i1271[3]
  i1270.m_ChildControlHeight = !!i1271[4]
  i1270.m_ChildScaleWidth = !!i1271[5]
  i1270.m_ChildScaleHeight = !!i1271[6]
  i1270.m_ReverseArrangement = !!i1271[7]
  i1270.m_Padding = UnityEngine.RectOffset.FromPaddings(i1271[8], i1271[9], i1271[10], i1271[11])
  i1270.m_ChildAlignment = i1271[12]
  return i1270
}

Deserializers["QuickSlotView"] = function (request, data, root) {
  var i1272 = root || request.c( 'QuickSlotView' )
  var i1273 = data
  request.r(i1273[0], i1273[1], 0, i1272, 'button')
  request.r(i1273[2], i1273[3], 0, i1272, 'thumbnail')
  request.r(i1273[4], i1273[5], 0, i1272, 'highlight')
  request.r(i1273[6], i1273[7], 0, i1272, 'content')
  return i1272
}

Deserializers["IndexZoneView"] = function (request, data, root) {
  var i1274 = root || request.c( 'IndexZoneView' )
  var i1275 = data
  request.r(i1275[0], i1275[1], 0, i1274, 'zoneName')
  request.r(i1275[2], i1275[3], 0, i1274, 'progress')
  request.r(i1275[4], i1275[5], 0, i1274, 'thumbnail')
  request.r(i1275[6], i1275[7], 0, i1274, 'progressFill')
  request.r(i1275[8], i1275[9], 0, i1274, 'petContent')
  request.r(i1275[10], i1275[11], 0, i1274, 'petTemplate')
  return i1274
}

Deserializers["IndexPetCellView"] = function (request, data, root) {
  var i1276 = root || request.c( 'IndexPetCellView' )
  var i1277 = data
  request.r(i1277[0], i1277[1], 0, i1276, 'button')
  request.r(i1277[2], i1277[3], 0, i1276, 'frame')
  request.r(i1277[4], i1277[5], 0, i1276, 'thumbnail')
  request.r(i1277[6], i1277[7], 0, i1276, 'petName')
  request.r(i1277[8], i1277[9], 0, i1276, 'selected')
  request.r(i1277[10], i1277[11], 0, i1276, 'mark')
  return i1276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1279 = data
  i1278.aspect = i1279[0]
  i1278.orthographic = !!i1279[1]
  i1278.orthographicSize = i1279[2]
  i1278.backgroundColor = new pc.Color(i1279[3], i1279[4], i1279[5], i1279[6])
  i1278.nearClipPlane = i1279[7]
  i1278.farClipPlane = i1279[8]
  i1278.fieldOfView = i1279[9]
  i1278.depth = i1279[10]
  i1278.clearFlags = i1279[11]
  i1278.cullingMask = i1279[12]
  i1278.rect = i1279[13]
  request.r(i1279[14], i1279[15], 0, i1278, 'targetTexture')
  i1278.usePhysicalProperties = !!i1279[16]
  i1278.focalLength = i1279[17]
  i1278.sensorSize = new pc.Vec2( i1279[18], i1279[19] )
  i1278.lensShift = new pc.Vec2( i1279[20], i1279[21] )
  i1278.gateFit = i1279[22]
  i1278.commandBufferCount = i1279[23]
  i1278.cameraType = i1279[24]
  i1278.enabled = !!i1279[25]
  return i1278
}

Deserializers["CameraController"] = function (request, data, root) {
  var i1280 = root || request.c( 'CameraController' )
  var i1281 = data
  request.r(i1281[0], i1281[1], 0, i1280, 'target')
  request.r(i1281[2], i1281[3], 0, i1280, 'controlledCamera')
  request.r(i1281[4], i1281[5], 0, i1280, 'cameraManager')
  request.r(i1281[6], i1281[7], 0, i1280, 'game')
  i1280.distance = i1281[8]
  i1280.initialVerticalAngle = i1281[9]
  i1280.initialHorizontalAngle = i1281[10]
  return i1280
}

Deserializers["IAPPopupView"] = function (request, data, root) {
  var i1282 = root || request.c( 'IAPPopupView' )
  var i1283 = data
  request.r(i1283[0], i1283[1], 0, i1282, 'buy10')
  request.r(i1283[2], i1283[3], 0, i1282, 'buy1')
  request.r(i1283[4], i1283[5], 0, i1282, 'label10')
  request.r(i1283[6], i1283[7], 0, i1282, 'label1')
  request.r(i1283[8], i1283[9], 0, i1282, 'caption10')
  request.r(i1283[10], i1283[11], 0, i1282, 'caption1')
  request.r(i1283[12], i1283[13], 0, i1282, 'hint10')
  request.r(i1283[14], i1283[15], 0, i1282, 'hint1')
  i1282.price10 = i1283[16]
  i1282.price1 = i1283[17]
  i1282.eggs10 = i1283[18]
  i1282.eggs1 = i1283[19]
  request.r(i1283[20], i1283[21], 0, i1282, 'sound')
  request.r(i1283[22], i1283[23], 0, i1282, 'openSound')
  request.r(i1283[24], i1283[25], 0, i1282, 'clickSound')
  return i1282
}

Deserializers["PlayableUISparkle"] = function (request, data, root) {
  var i1284 = root || request.c( 'PlayableUISparkle' )
  var i1285 = data
  var i1287 = i1285[0]
  var i1286 = []
  for(var i = 0; i < i1287.length; i += 2) {
  request.r(i1287[i + 0], i1287[i + 1], 2, i1286, '')
  }
  i1284.stars = i1286
  var i1289 = i1285[1]
  var i1288 = []
  for(var i = 0; i < i1289.length; i += 2) {
  request.r(i1289[i + 0], i1289[i + 1], 2, i1288, '')
  }
  i1284.rays = i1288
  i1284.color = new pc.Color(i1285[2], i1285[3], i1285[4], i1285[5])
  i1284.radius = i1285[6]
  i1284.minSize = i1285[7]
  i1284.maxSize = i1285[8]
  i1284.minLife = i1285[9]
  i1284.maxLife = i1285[10]
  i1284.spin = i1285[11]
  i1284.rayLife = i1285[12]
  i1284.raySize = i1285[13]
  return i1284
}

Deserializers["PlayableImageCycle"] = function (request, data, root) {
  var i1292 = root || request.c( 'PlayableImageCycle' )
  var i1293 = data
  request.r(i1293[0], i1293[1], 0, i1292, 'image')
  i1292.transitionDuration = i1293[2]
  i1292.showDuration = i1293[3]
  var i1295 = i1293[4]
  var i1294 = []
  for(var i = 0; i < i1295.length; i += 2) {
  request.r(i1295[i + 0], i1295[i + 1], 2, i1294, '')
  }
  i1292.sprites = i1294
  return i1292
}

Deserializers["PlayableUIPulse"] = function (request, data, root) {
  var i1296 = root || request.c( 'PlayableUIPulse' )
  var i1297 = data
  i1296.scale = i1297[0]
  i1296.duration = i1297[1]
  return i1296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1299 = data
  i1298.ambientIntensity = i1299[0]
  i1298.reflectionIntensity = i1299[1]
  i1298.ambientMode = i1299[2]
  i1298.ambientLight = new pc.Color(i1299[3], i1299[4], i1299[5], i1299[6])
  i1298.ambientSkyColor = new pc.Color(i1299[7], i1299[8], i1299[9], i1299[10])
  i1298.ambientGroundColor = new pc.Color(i1299[11], i1299[12], i1299[13], i1299[14])
  i1298.ambientEquatorColor = new pc.Color(i1299[15], i1299[16], i1299[17], i1299[18])
  i1298.fogColor = new pc.Color(i1299[19], i1299[20], i1299[21], i1299[22])
  i1298.fogEndDistance = i1299[23]
  i1298.fogStartDistance = i1299[24]
  i1298.fogDensity = i1299[25]
  i1298.fog = !!i1299[26]
  request.r(i1299[27], i1299[28], 0, i1298, 'skybox')
  i1298.fogMode = i1299[29]
  var i1301 = i1299[30]
  var i1300 = []
  for(var i = 0; i < i1301.length; i += 1) {
    i1300.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1301[i + 0]) );
  }
  i1298.lightmaps = i1300
  i1298.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1299[31], i1298.lightProbes)
  i1298.lightmapsMode = i1299[32]
  i1298.mixedBakeMode = i1299[33]
  i1298.environmentLightingMode = i1299[34]
  i1298.ambientProbe = new pc.SphericalHarmonicsL2(i1299[35])
  request.r(i1299[36], i1299[37], 0, i1298, 'customReflection')
  request.r(i1299[38], i1299[39], 0, i1298, 'defaultReflection')
  i1298.defaultReflectionMode = i1299[40]
  i1298.defaultReflectionResolution = i1299[41]
  i1298.sunLightObjectId = i1299[42]
  i1298.pixelLightCount = i1299[43]
  i1298.defaultReflectionHDR = !!i1299[44]
  i1298.hasLightDataAsset = !!i1299[45]
  i1298.hasManualGenerate = !!i1299[46]
  return i1298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1305 = data
  request.r(i1305[0], i1305[1], 0, i1304, 'lightmapColor')
  request.r(i1305[2], i1305[3], 0, i1304, 'lightmapDirection')
  request.r(i1305[4], i1305[5], 0, i1304, 'shadowMask')
  return i1304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1306 = root || new UnityEngine.LightProbes()
  var i1307 = data
  return i1306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1313 = data
  var i1315 = i1313[0]
  var i1314 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1315.length; i += 1) {
    i1314.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1315[i + 0]));
  }
  i1312.ShaderCompilationErrors = i1314
  i1312.name = i1313[1]
  i1312.guid = i1313[2]
  var i1317 = i1313[3]
  var i1316 = []
  for(var i = 0; i < i1317.length; i += 1) {
    i1316.push( i1317[i + 0] );
  }
  i1312.shaderDefinedKeywords = i1316
  var i1319 = i1313[4]
  var i1318 = []
  for(var i = 0; i < i1319.length; i += 1) {
    i1318.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1319[i + 0]) );
  }
  i1312.passes = i1318
  var i1321 = i1313[5]
  var i1320 = []
  for(var i = 0; i < i1321.length; i += 1) {
    i1320.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1321[i + 0]) );
  }
  i1312.usePasses = i1320
  var i1323 = i1313[6]
  var i1322 = []
  for(var i = 0; i < i1323.length; i += 1) {
    i1322.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1323[i + 0]) );
  }
  i1312.defaultParameterValues = i1322
  request.r(i1313[7], i1313[8], 0, i1312, 'unityFallbackShader')
  i1312.readDepth = !!i1313[9]
  i1312.hasDepthOnlyPass = !!i1313[10]
  i1312.isCreatedByShaderGraph = !!i1313[11]
  i1312.disableBatching = !!i1313[12]
  i1312.compiled = !!i1313[13]
  return i1312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1327 = data
  i1326.shaderName = i1327[0]
  i1326.errorMessage = i1327[1]
  return i1326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1332 = root || new pc.UnityShaderPass()
  var i1333 = data
  i1332.id = i1333[0]
  i1332.subShaderIndex = i1333[1]
  i1332.name = i1333[2]
  i1332.passType = i1333[3]
  i1332.grabPassTextureName = i1333[4]
  i1332.usePass = !!i1333[5]
  i1332.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[6], i1332.zTest)
  i1332.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[7], i1332.zWrite)
  i1332.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[8], i1332.culling)
  i1332.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1333[9], i1332.blending)
  i1332.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1333[10], i1332.alphaBlending)
  i1332.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[11], i1332.colorWriteMask)
  i1332.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[12], i1332.offsetUnits)
  i1332.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[13], i1332.offsetFactor)
  i1332.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[14], i1332.stencilRef)
  i1332.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[15], i1332.stencilReadMask)
  i1332.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1333[16], i1332.stencilWriteMask)
  i1332.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1333[17], i1332.stencilOp)
  i1332.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1333[18], i1332.stencilOpFront)
  i1332.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1333[19], i1332.stencilOpBack)
  var i1335 = i1333[20]
  var i1334 = []
  for(var i = 0; i < i1335.length; i += 1) {
    i1334.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1335[i + 0]) );
  }
  i1332.tags = i1334
  var i1337 = i1333[21]
  var i1336 = []
  for(var i = 0; i < i1337.length; i += 1) {
    i1336.push( i1337[i + 0] );
  }
  i1332.passDefinedKeywords = i1336
  var i1339 = i1333[22]
  var i1338 = []
  for(var i = 0; i < i1339.length; i += 1) {
    i1338.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1339[i + 0]) );
  }
  i1332.passDefinedKeywordGroups = i1338
  var i1341 = i1333[23]
  var i1340 = []
  for(var i = 0; i < i1341.length; i += 1) {
    i1340.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1341[i + 0]) );
  }
  i1332.variants = i1340
  var i1343 = i1333[24]
  var i1342 = []
  for(var i = 0; i < i1343.length; i += 1) {
    i1342.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1343[i + 0]) );
  }
  i1332.excludedVariants = i1342
  i1332.hasDepthReader = !!i1333[25]
  return i1332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1344 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1345 = data
  i1344.val = i1345[0]
  i1344.name = i1345[1]
  return i1344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1347 = data
  i1346.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1347[0], i1346.src)
  i1346.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1347[1], i1346.dst)
  i1346.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1347[2], i1346.op)
  return i1346
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1348 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1349 = data
  i1348.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1349[0], i1348.pass)
  i1348.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1349[1], i1348.fail)
  i1348.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1349[2], i1348.zFail)
  i1348.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1349[3], i1348.comp)
  return i1348
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1352 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1353 = data
  i1352.name = i1353[0]
  i1352.value = i1353[1]
  return i1352
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1356 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1357 = data
  var i1359 = i1357[0]
  var i1358 = []
  for(var i = 0; i < i1359.length; i += 1) {
    i1358.push( i1359[i + 0] );
  }
  i1356.keywords = i1358
  i1356.hasDiscard = !!i1357[1]
  return i1356
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1363 = data
  i1362.passId = i1363[0]
  i1362.subShaderIndex = i1363[1]
  var i1365 = i1363[2]
  var i1364 = []
  for(var i = 0; i < i1365.length; i += 1) {
    i1364.push( i1365[i + 0] );
  }
  i1362.keywords = i1364
  i1362.vertexProgram = i1363[3]
  i1362.fragmentProgram = i1363[4]
  i1362.exportedForWebGl2 = !!i1363[5]
  i1362.readDepth = !!i1363[6]
  return i1362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1369 = data
  request.r(i1369[0], i1369[1], 0, i1368, 'shader')
  i1368.pass = i1369[2]
  return i1368
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1373 = data
  i1372.name = i1373[0]
  i1372.type = i1373[1]
  i1372.value = new pc.Vec4( i1373[2], i1373[3], i1373[4], i1373[5] )
  i1372.textureValue = i1373[6]
  i1372.shaderPropertyFlag = i1373[7]
  return i1372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1375 = data
  i1374.name = i1375[0]
  request.r(i1375[1], i1375[2], 0, i1374, 'texture')
  i1374.aabb = i1375[3]
  i1374.vertices = i1375[4]
  i1374.triangles = i1375[5]
  i1374.textureRect = UnityEngine.Rect.MinMaxRect(i1375[6], i1375[7], i1375[8], i1375[9])
  i1374.packedRect = UnityEngine.Rect.MinMaxRect(i1375[10], i1375[11], i1375[12], i1375[13])
  i1374.border = new pc.Vec4( i1375[14], i1375[15], i1375[16], i1375[17] )
  i1374.transparency = i1375[18]
  i1374.bounds = i1375[19]
  i1374.pixelsPerUnit = i1375[20]
  i1374.textureWidth = i1375[21]
  i1374.textureHeight = i1375[22]
  i1374.nativeSize = new pc.Vec2( i1375[23], i1375[24] )
  i1374.pivot = new pc.Vec2( i1375[25], i1375[26] )
  i1374.textureRectOffset = new pc.Vec2( i1375[27], i1375[28] )
  return i1374
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1377 = data
  i1376.name = i1377[0]
  return i1376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1378 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1379 = data
  i1378.name = i1379[0]
  i1378.wrapMode = i1379[1]
  i1378.isLooping = !!i1379[2]
  i1378.length = i1379[3]
  var i1381 = i1379[4]
  var i1380 = []
  for(var i = 0; i < i1381.length; i += 1) {
    i1380.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1381[i + 0]) );
  }
  i1378.curves = i1380
  var i1383 = i1379[5]
  var i1382 = []
  for(var i = 0; i < i1383.length; i += 1) {
    i1382.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1383[i + 0]) );
  }
  i1378.events = i1382
  i1378.halfPrecision = !!i1379[6]
  i1378._frameRate = i1379[7]
  i1378.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1379[8], i1378.localBounds)
  i1378.hasMuscleCurves = !!i1379[9]
  var i1385 = i1379[10]
  var i1384 = []
  for(var i = 0; i < i1385.length; i += 1) {
    i1384.push( i1385[i + 0] );
  }
  i1378.clipMuscleConstant = i1384
  i1378.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1379[11], i1378.clipBindingConstant)
  return i1378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1388 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1389 = data
  i1388.path = i1389[0]
  i1388.hash = i1389[1]
  i1388.componentType = i1389[2]
  i1388.property = i1389[3]
  i1388.keys = i1389[4]
  var i1391 = i1389[5]
  var i1390 = []
  for(var i = 0; i < i1391.length; i += 1) {
    i1390.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1391[i + 0]) );
  }
  i1388.objectReferenceKeys = i1390
  return i1388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1395 = data
  i1394.time = i1395[0]
  request.r(i1395[1], i1395[2], 0, i1394, 'value')
  return i1394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1398 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1399 = data
  i1398.functionName = i1399[0]
  i1398.floatParameter = i1399[1]
  i1398.intParameter = i1399[2]
  i1398.stringParameter = i1399[3]
  request.r(i1399[4], i1399[5], 0, i1398, 'objectReferenceParameter')
  i1398.time = i1399[6]
  return i1398
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1400 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1401 = data
  i1400.center = new pc.Vec3( i1401[0], i1401[1], i1401[2] )
  i1400.extends = new pc.Vec3( i1401[3], i1401[4], i1401[5] )
  return i1400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1405 = data
  var i1407 = i1405[0]
  var i1406 = []
  for(var i = 0; i < i1407.length; i += 1) {
    i1406.push( i1407[i + 0] );
  }
  i1404.genericBindings = i1406
  var i1409 = i1405[1]
  var i1408 = []
  for(var i = 0; i < i1409.length; i += 1) {
    i1408.push( i1409[i + 0] );
  }
  i1404.pptrCurveMapping = i1408
  return i1404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1411 = data
  i1410.name = i1411[0]
  i1410.ascent = i1411[1]
  i1410.originalLineHeight = i1411[2]
  i1410.fontSize = i1411[3]
  var i1413 = i1411[4]
  var i1412 = []
  for(var i = 0; i < i1413.length; i += 1) {
    i1412.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1413[i + 0]) );
  }
  i1410.characterInfo = i1412
  request.r(i1411[5], i1411[6], 0, i1410, 'texture')
  i1410.originalFontSize = i1411[7]
  return i1410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1417 = data
  i1416.index = i1417[0]
  i1416.advance = i1417[1]
  i1416.bearing = i1417[2]
  i1416.glyphWidth = i1417[3]
  i1416.glyphHeight = i1417[4]
  i1416.minX = i1417[5]
  i1416.maxX = i1417[6]
  i1416.minY = i1417[7]
  i1416.maxY = i1417[8]
  i1416.uvBottomLeftX = i1417[9]
  i1416.uvBottomLeftY = i1417[10]
  i1416.uvBottomRightX = i1417[11]
  i1416.uvBottomRightY = i1417[12]
  i1416.uvTopLeftX = i1417[13]
  i1416.uvTopLeftY = i1417[14]
  i1416.uvTopRightX = i1417[15]
  i1416.uvTopRightY = i1417[16]
  return i1416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1418 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1419 = data
  i1418.name = i1419[0]
  var i1421 = i1419[1]
  var i1420 = []
  for(var i = 0; i < i1421.length; i += 1) {
    i1420.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1421[i + 0]) );
  }
  i1418.layers = i1420
  var i1423 = i1419[2]
  var i1422 = []
  for(var i = 0; i < i1423.length; i += 1) {
    i1422.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1423[i + 0]) );
  }
  i1418.parameters = i1422
  i1418.animationClips = i1419[3]
  i1418.avatarUnsupported = i1419[4]
  return i1418
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1426 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1427 = data
  i1426.name = i1427[0]
  i1426.defaultWeight = i1427[1]
  i1426.blendingMode = i1427[2]
  i1426.avatarMask = i1427[3]
  i1426.syncedLayerIndex = i1427[4]
  i1426.syncedLayerAffectsTiming = !!i1427[5]
  i1426.syncedLayers = i1427[6]
  i1426.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1427[7], i1426.stateMachine)
  return i1426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1429 = data
  i1428.id = i1429[0]
  i1428.name = i1429[1]
  i1428.path = i1429[2]
  var i1431 = i1429[3]
  var i1430 = []
  for(var i = 0; i < i1431.length; i += 1) {
    i1430.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1431[i + 0]) );
  }
  i1428.states = i1430
  var i1433 = i1429[4]
  var i1432 = []
  for(var i = 0; i < i1433.length; i += 1) {
    i1432.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1433[i + 0]) );
  }
  i1428.machines = i1432
  var i1435 = i1429[5]
  var i1434 = []
  for(var i = 0; i < i1435.length; i += 1) {
    i1434.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1435[i + 0]) );
  }
  i1428.entryStateTransitions = i1434
  var i1437 = i1429[6]
  var i1436 = []
  for(var i = 0; i < i1437.length; i += 1) {
    i1436.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1437[i + 0]) );
  }
  i1428.exitStateTransitions = i1436
  var i1439 = i1429[7]
  var i1438 = []
  for(var i = 0; i < i1439.length; i += 1) {
    i1438.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1439[i + 0]) );
  }
  i1428.anyStateTransitions = i1438
  i1428.defaultStateId = i1429[8]
  return i1428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1443 = data
  i1442.id = i1443[0]
  i1442.name = i1443[1]
  i1442.cycleOffset = i1443[2]
  i1442.cycleOffsetParameter = i1443[3]
  i1442.cycleOffsetParameterActive = !!i1443[4]
  i1442.mirror = !!i1443[5]
  i1442.mirrorParameter = i1443[6]
  i1442.mirrorParameterActive = !!i1443[7]
  i1442.motionId = i1443[8]
  i1442.nameHash = i1443[9]
  i1442.fullPathHash = i1443[10]
  i1442.speed = i1443[11]
  i1442.speedParameter = i1443[12]
  i1442.speedParameterActive = !!i1443[13]
  i1442.tag = i1443[14]
  i1442.tagHash = i1443[15]
  i1442.writeDefaultValues = !!i1443[16]
  var i1445 = i1443[17]
  var i1444 = []
  for(var i = 0; i < i1445.length; i += 2) {
  request.r(i1445[i + 0], i1445[i + 1], 2, i1444, '')
  }
  i1442.behaviours = i1444
  var i1447 = i1443[18]
  var i1446 = []
  for(var i = 0; i < i1447.length; i += 1) {
    i1446.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1447[i + 0]) );
  }
  i1442.transitions = i1446
  return i1442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1453 = data
  i1452.fullPath = i1453[0]
  i1452.canTransitionToSelf = !!i1453[1]
  i1452.duration = i1453[2]
  i1452.exitTime = i1453[3]
  i1452.hasExitTime = !!i1453[4]
  i1452.hasFixedDuration = !!i1453[5]
  i1452.interruptionSource = i1453[6]
  i1452.offset = i1453[7]
  i1452.orderedInterruption = !!i1453[8]
  i1452.destinationStateId = i1453[9]
  i1452.isExit = !!i1453[10]
  i1452.mute = !!i1453[11]
  i1452.solo = !!i1453[12]
  var i1455 = i1453[13]
  var i1454 = []
  for(var i = 0; i < i1455.length; i += 1) {
    i1454.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1455[i + 0]) );
  }
  i1452.conditions = i1454
  return i1452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1459 = data
  i1458.mode = i1459[0]
  i1458.parameter = i1459[1]
  i1458.threshold = i1459[2]
  return i1458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1465 = data
  i1464.destinationStateId = i1465[0]
  i1464.isExit = !!i1465[1]
  i1464.mute = !!i1465[2]
  i1464.solo = !!i1465[3]
  var i1467 = i1465[4]
  var i1466 = []
  for(var i = 0; i < i1467.length; i += 1) {
    i1466.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1467[i + 0]) );
  }
  i1464.conditions = i1466
  return i1464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1471 = data
  i1470.defaultBool = !!i1471[0]
  i1470.defaultFloat = i1471[1]
  i1470.defaultInt = i1471[2]
  i1470.name = i1471[3]
  i1470.nameHash = i1471[4]
  i1470.type = i1471[5]
  return i1470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController"] = function (request, data, root) {
  var i1472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorOverrideController' )
  var i1473 = data
  i1472.name = i1473[0]
  request.r(i1473[1], i1473[2], 0, i1472, '_runtimeAnimatorController')
  var i1475 = i1473[3]
  var i1474 = []
  for(var i = 0; i < i1475.length; i += 2) {
  request.r(i1475[i + 0], i1475[i + 1], 2, i1474, '')
  }
  i1472._originalAnimationClips = i1474
  var i1477 = i1473[4]
  var i1476 = []
  for(var i = 0; i < i1477.length; i += 2) {
  request.r(i1477[i + 0], i1477[i + 1], 2, i1476, '')
  }
  i1472._overrideAnimationClips = i1476
  var i1479 = i1473[5]
  var i1478 = []
  for(var i = 0; i < i1479.length; i += 2) {
  request.r(i1479[i + 0], i1479[i + 1], 2, i1478, '')
  }
  i1472._animationClips = i1478
  var i1481 = i1473[6]
  var i1480 = []
  for(var i = 0; i < i1481.length; i += 1) {
    i1480.push( request.d('UnityEngine.AnimationClipPair', i1481[i + 0]) );
  }
  i1472._animationClipPairs = i1480
  return i1472
}

Deserializers["UnityEngine.AnimationClipPair"] = function (request, data, root) {
  var i1486 = root || request.c( 'UnityEngine.AnimationClipPair' )
  var i1487 = data
  request.r(i1487[0], i1487[1], 0, i1486, 'originalClip')
  request.r(i1487[2], i1487[3], 0, i1486, 'overrideClip')
  return i1486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1489 = data
  i1488.name = i1489[0]
  i1488.bytes64 = i1489[1]
  i1488.data = i1489[2]
  return i1488
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1490 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1491 = data
  i1490.normalStyle = i1491[0]
  i1490.normalSpacingOffset = i1491[1]
  i1490.boldStyle = i1491[2]
  i1490.boldSpacing = i1491[3]
  i1490.italicStyle = i1491[4]
  i1490.tabSize = i1491[5]
  request.r(i1491[6], i1491[7], 0, i1490, 'atlas')
  i1490.m_SourceFontFileGUID = i1491[8]
  i1490.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1491[9], i1490.m_CreationSettings)
  request.r(i1491[10], i1491[11], 0, i1490, 'm_SourceFontFile')
  i1490.m_SourceFontFilePath = i1491[12]
  i1490.m_AtlasPopulationMode = i1491[13]
  i1490.InternalDynamicOS = !!i1491[14]
  var i1493 = i1491[15]
  var i1492 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1493.length; i += 1) {
    i1492.add(request.d('UnityEngine.TextCore.Glyph', i1493[i + 0]));
  }
  i1490.m_GlyphTable = i1492
  var i1495 = i1491[16]
  var i1494 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1495.length; i += 1) {
    i1494.add(request.d('TMPro.TMP_Character', i1495[i + 0]));
  }
  i1490.m_CharacterTable = i1494
  var i1497 = i1491[17]
  var i1496 = []
  for(var i = 0; i < i1497.length; i += 2) {
  request.r(i1497[i + 0], i1497[i + 1], 2, i1496, '')
  }
  i1490.m_AtlasTextures = i1496
  i1490.m_AtlasTextureIndex = i1491[18]
  i1490.m_IsMultiAtlasTexturesEnabled = !!i1491[19]
  i1490.m_GetFontFeatures = !!i1491[20]
  i1490.m_ClearDynamicDataOnBuild = !!i1491[21]
  i1490.m_AtlasWidth = i1491[22]
  i1490.m_AtlasHeight = i1491[23]
  i1490.m_AtlasPadding = i1491[24]
  i1490.m_AtlasRenderMode = i1491[25]
  var i1499 = i1491[26]
  var i1498 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1499.length; i += 1) {
    i1498.add(request.d('UnityEngine.TextCore.GlyphRect', i1499[i + 0]));
  }
  i1490.m_UsedGlyphRects = i1498
  var i1501 = i1491[27]
  var i1500 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1501.length; i += 1) {
    i1500.add(request.d('UnityEngine.TextCore.GlyphRect', i1501[i + 0]));
  }
  i1490.m_FreeGlyphRects = i1500
  i1490.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1491[28], i1490.m_FontFeatureTable)
  i1490.m_ShouldReimportFontFeatures = !!i1491[29]
  var i1503 = i1491[30]
  var i1502 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1503.length; i += 2) {
  request.r(i1503[i + 0], i1503[i + 1], 1, i1502, '')
  }
  i1490.m_FallbackFontAssetTable = i1502
  var i1505 = i1491[31]
  var i1504 = []
  for(var i = 0; i < i1505.length; i += 1) {
    i1504.push( request.d('TMPro.TMP_FontWeightPair', i1505[i + 0]) );
  }
  i1490.m_FontWeightTable = i1504
  var i1507 = i1491[32]
  var i1506 = []
  for(var i = 0; i < i1507.length; i += 1) {
    i1506.push( request.d('TMPro.TMP_FontWeightPair', i1507[i + 0]) );
  }
  i1490.fontWeights = i1506
  i1490.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1491[33], i1490.m_fontInfo)
  var i1509 = i1491[34]
  var i1508 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1509.length; i += 1) {
    i1508.add(request.d('TMPro.TMP_Glyph', i1509[i + 0]));
  }
  i1490.m_glyphInfoList = i1508
  i1490.m_KerningTable = request.d('TMPro.KerningTable', i1491[35], i1490.m_KerningTable)
  var i1511 = i1491[36]
  var i1510 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1511.length; i += 2) {
  request.r(i1511[i + 0], i1511[i + 1], 1, i1510, '')
  }
  i1490.fallbackFontAssets = i1510
  i1490.m_Version = i1491[37]
  i1490.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1491[38], i1490.m_FaceInfo)
  request.r(i1491[39], i1491[40], 0, i1490, 'm_Material')
  return i1490
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1512 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1513 = data
  i1512.sourceFontFileName = i1513[0]
  i1512.sourceFontFileGUID = i1513[1]
  i1512.faceIndex = i1513[2]
  i1512.pointSizeSamplingMode = i1513[3]
  i1512.pointSize = i1513[4]
  i1512.padding = i1513[5]
  i1512.paddingMode = i1513[6]
  i1512.packingMode = i1513[7]
  i1512.atlasWidth = i1513[8]
  i1512.atlasHeight = i1513[9]
  i1512.characterSetSelectionMode = i1513[10]
  i1512.characterSequence = i1513[11]
  i1512.referencedFontAssetGUID = i1513[12]
  i1512.referencedTextAssetGUID = i1513[13]
  i1512.fontStyle = i1513[14]
  i1512.fontStyleModifier = i1513[15]
  i1512.renderMode = i1513[16]
  i1512.includeFontFeatures = !!i1513[17]
  return i1512
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1516 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1517 = data
  i1516.m_Index = i1517[0]
  i1516.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1517[1], i1516.m_Metrics)
  i1516.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1517[2], i1516.m_GlyphRect)
  i1516.m_Scale = i1517[3]
  i1516.m_AtlasIndex = i1517[4]
  i1516.m_ClassDefinitionType = i1517[5]
  return i1516
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1518 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1519 = data
  i1518.m_Width = i1519[0]
  i1518.m_Height = i1519[1]
  i1518.m_HorizontalBearingX = i1519[2]
  i1518.m_HorizontalBearingY = i1519[3]
  i1518.m_HorizontalAdvance = i1519[4]
  return i1518
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1520 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1521 = data
  i1520.m_X = i1521[0]
  i1520.m_Y = i1521[1]
  i1520.m_Width = i1521[2]
  i1520.m_Height = i1521[3]
  return i1520
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1524 = root || request.c( 'TMPro.TMP_Character' )
  var i1525 = data
  i1524.m_ElementType = i1525[0]
  i1524.m_Unicode = i1525[1]
  i1524.m_GlyphIndex = i1525[2]
  i1524.m_Scale = i1525[3]
  return i1524
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1530 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1531 = data
  var i1533 = i1531[0]
  var i1532 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1533.length; i += 1) {
    i1532.add(request.d('TMPro.MultipleSubstitutionRecord', i1533[i + 0]));
  }
  i1530.m_MultipleSubstitutionRecords = i1532
  var i1535 = i1531[1]
  var i1534 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1535.length; i += 1) {
    i1534.add(request.d('TMPro.LigatureSubstitutionRecord', i1535[i + 0]));
  }
  i1530.m_LigatureSubstitutionRecords = i1534
  var i1537 = i1531[2]
  var i1536 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1537.length; i += 1) {
    i1536.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1537[i + 0]));
  }
  i1530.m_GlyphPairAdjustmentRecords = i1536
  var i1539 = i1531[3]
  var i1538 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1539.length; i += 1) {
    i1538.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1539[i + 0]));
  }
  i1530.m_MarkToBaseAdjustmentRecords = i1538
  var i1541 = i1531[4]
  var i1540 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1541.length; i += 1) {
    i1540.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1541[i + 0]));
  }
  i1530.m_MarkToMarkAdjustmentRecords = i1540
  return i1530
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1544 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1545 = data
  i1544.m_TargetGlyphID = i1545[0]
  i1544.m_SubstituteGlyphIDs = i1545[1]
  return i1544
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1548 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1549 = data
  i1548.m_ComponentGlyphIDs = i1549[0]
  i1548.m_LigatureGlyphID = i1549[1]
  return i1548
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1552 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1553 = data
  i1552.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1553[0], i1552.m_FirstAdjustmentRecord)
  i1552.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1553[1], i1552.m_SecondAdjustmentRecord)
  i1552.m_FeatureLookupFlags = i1553[2]
  return i1552
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1554 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1555 = data
  i1554.m_GlyphIndex = i1555[0]
  i1554.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1555[1], i1554.m_GlyphValueRecord)
  return i1554
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1556 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1557 = data
  i1556.m_XPlacement = i1557[0]
  i1556.m_YPlacement = i1557[1]
  i1556.m_XAdvance = i1557[2]
  i1556.m_YAdvance = i1557[3]
  return i1556
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1560 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1561 = data
  i1560.m_BaseGlyphID = i1561[0]
  i1560.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1561[1], i1560.m_BaseGlyphAnchorPoint)
  i1560.m_MarkGlyphID = i1561[2]
  i1560.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1561[3], i1560.m_MarkPositionAdjustment)
  return i1560
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1562 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1563 = data
  i1562.m_XCoordinate = i1563[0]
  i1562.m_YCoordinate = i1563[1]
  return i1562
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1564 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1565 = data
  i1564.m_XPositionAdjustment = i1565[0]
  i1564.m_YPositionAdjustment = i1565[1]
  return i1564
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1568 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1569 = data
  i1568.m_BaseMarkGlyphID = i1569[0]
  i1568.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1569[1], i1568.m_BaseMarkGlyphAnchorPoint)
  i1568.m_CombiningMarkGlyphID = i1569[2]
  i1568.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1569[3], i1568.m_CombiningMarkPositionAdjustment)
  return i1568
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1574 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1575 = data
  request.r(i1575[0], i1575[1], 0, i1574, 'regularTypeface')
  request.r(i1575[2], i1575[3], 0, i1574, 'italicTypeface')
  return i1574
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1576 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1577 = data
  i1576.Name = i1577[0]
  i1576.PointSize = i1577[1]
  i1576.Scale = i1577[2]
  i1576.CharacterCount = i1577[3]
  i1576.LineHeight = i1577[4]
  i1576.Baseline = i1577[5]
  i1576.Ascender = i1577[6]
  i1576.CapHeight = i1577[7]
  i1576.Descender = i1577[8]
  i1576.CenterLine = i1577[9]
  i1576.SuperscriptOffset = i1577[10]
  i1576.SubscriptOffset = i1577[11]
  i1576.SubSize = i1577[12]
  i1576.Underline = i1577[13]
  i1576.UnderlineThickness = i1577[14]
  i1576.strikethrough = i1577[15]
  i1576.strikethroughThickness = i1577[16]
  i1576.TabWidth = i1577[17]
  i1576.Padding = i1577[18]
  i1576.AtlasWidth = i1577[19]
  i1576.AtlasHeight = i1577[20]
  return i1576
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1580 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1581 = data
  i1580.id = i1581[0]
  i1580.x = i1581[1]
  i1580.y = i1581[2]
  i1580.width = i1581[3]
  i1580.height = i1581[4]
  i1580.xOffset = i1581[5]
  i1580.yOffset = i1581[6]
  i1580.xAdvance = i1581[7]
  i1580.scale = i1581[8]
  return i1580
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1582 = root || request.c( 'TMPro.KerningTable' )
  var i1583 = data
  var i1585 = i1583[0]
  var i1584 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1585.length; i += 1) {
    i1584.add(request.d('TMPro.KerningPair', i1585[i + 0]));
  }
  i1582.kerningPairs = i1584
  return i1582
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1588 = root || request.c( 'TMPro.KerningPair' )
  var i1589 = data
  i1588.xOffset = i1589[0]
  i1588.m_FirstGlyph = i1589[1]
  i1588.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1589[2], i1588.m_FirstGlyphAdjustments)
  i1588.m_SecondGlyph = i1589[3]
  i1588.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1589[4], i1588.m_SecondGlyphAdjustments)
  i1588.m_IgnoreSpacingAdjustments = !!i1589[5]
  return i1588
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1590 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1591 = data
  i1590.m_FaceIndex = i1591[0]
  i1590.m_FamilyName = i1591[1]
  i1590.m_StyleName = i1591[2]
  i1590.m_PointSize = i1591[3]
  i1590.m_Scale = i1591[4]
  i1590.m_UnitsPerEM = i1591[5]
  i1590.m_LineHeight = i1591[6]
  i1590.m_AscentLine = i1591[7]
  i1590.m_CapLine = i1591[8]
  i1590.m_MeanLine = i1591[9]
  i1590.m_Baseline = i1591[10]
  i1590.m_DescentLine = i1591[11]
  i1590.m_SuperscriptOffset = i1591[12]
  i1590.m_SuperscriptSize = i1591[13]
  i1590.m_SubscriptOffset = i1591[14]
  i1590.m_SubscriptSize = i1591[15]
  i1590.m_UnderlineOffset = i1591[16]
  i1590.m_UnderlineThickness = i1591[17]
  i1590.m_StrikethroughOffset = i1591[18]
  i1590.m_StrikethroughThickness = i1591[19]
  i1590.m_TabWidth = i1591[20]
  return i1590
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1592 = root || request.c( 'TMPro.TMP_Settings' )
  var i1593 = data
  i1592.assetVersion = i1593[0]
  i1592.m_TextWrappingMode = i1593[1]
  i1592.m_enableKerning = !!i1593[2]
  var i1595 = i1593[3]
  var i1594 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1595.length; i += 1) {
    i1594.add(i1595[i + 0]);
  }
  i1592.m_ActiveFontFeatures = i1594
  i1592.m_enableExtraPadding = !!i1593[4]
  i1592.m_enableTintAllSprites = !!i1593[5]
  i1592.m_enableParseEscapeCharacters = !!i1593[6]
  i1592.m_EnableRaycastTarget = !!i1593[7]
  i1592.m_GetFontFeaturesAtRuntime = !!i1593[8]
  i1592.m_missingGlyphCharacter = i1593[9]
  i1592.m_ClearDynamicDataOnBuild = !!i1593[10]
  i1592.m_warningsDisabled = !!i1593[11]
  request.r(i1593[12], i1593[13], 0, i1592, 'm_defaultFontAsset')
  i1592.m_defaultFontAssetPath = i1593[14]
  i1592.m_defaultFontSize = i1593[15]
  i1592.m_defaultAutoSizeMinRatio = i1593[16]
  i1592.m_defaultAutoSizeMaxRatio = i1593[17]
  i1592.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1593[18], i1593[19] )
  i1592.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1593[20], i1593[21] )
  i1592.m_autoSizeTextContainer = !!i1593[22]
  i1592.m_IsTextObjectScaleStatic = !!i1593[23]
  var i1597 = i1593[24]
  var i1596 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1597.length; i += 2) {
  request.r(i1597[i + 0], i1597[i + 1], 1, i1596, '')
  }
  i1592.m_fallbackFontAssets = i1596
  i1592.m_matchMaterialPreset = !!i1593[25]
  i1592.m_HideSubTextObjects = !!i1593[26]
  request.r(i1593[27], i1593[28], 0, i1592, 'm_defaultSpriteAsset')
  i1592.m_defaultSpriteAssetPath = i1593[29]
  i1592.m_enableEmojiSupport = !!i1593[30]
  i1592.m_MissingCharacterSpriteUnicode = i1593[31]
  var i1599 = i1593[32]
  var i1598 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1599.length; i += 2) {
  request.r(i1599[i + 0], i1599[i + 1], 1, i1598, '')
  }
  i1592.m_EmojiFallbackTextAssets = i1598
  i1592.m_defaultColorGradientPresetsPath = i1593[33]
  request.r(i1593[34], i1593[35], 0, i1592, 'm_defaultStyleSheet')
  i1592.m_StyleSheetsResourcePath = i1593[36]
  request.r(i1593[37], i1593[38], 0, i1592, 'm_leadingCharacters')
  request.r(i1593[39], i1593[40], 0, i1592, 'm_followingCharacters')
  i1592.m_UseModernHangulLineBreakingRules = !!i1593[41]
  return i1592
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1602 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1603 = data
  request.r(i1603[0], i1603[1], 0, i1602, 'spriteSheet')
  var i1605 = i1603[2]
  var i1604 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.add(request.d('TMPro.TMP_Sprite', i1605[i + 0]));
  }
  i1602.spriteInfoList = i1604
  var i1607 = i1603[3]
  var i1606 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1607.length; i += 2) {
  request.r(i1607[i + 0], i1607[i + 1], 1, i1606, '')
  }
  i1602.fallbackSpriteAssets = i1606
  var i1609 = i1603[4]
  var i1608 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.add(request.d('TMPro.TMP_SpriteCharacter', i1609[i + 0]));
  }
  i1602.m_SpriteCharacterTable = i1608
  var i1611 = i1603[5]
  var i1610 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1611.length; i += 1) {
    i1610.add(request.d('TMPro.TMP_SpriteGlyph', i1611[i + 0]));
  }
  i1602.m_GlyphTable = i1610
  i1602.m_Version = i1603[6]
  i1602.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1603[7], i1602.m_FaceInfo)
  request.r(i1603[8], i1603[9], 0, i1602, 'm_Material')
  return i1602
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1614 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1615 = data
  i1614.name = i1615[0]
  i1614.hashCode = i1615[1]
  i1614.unicode = i1615[2]
  i1614.pivot = new pc.Vec2( i1615[3], i1615[4] )
  request.r(i1615[5], i1615[6], 0, i1614, 'sprite')
  i1614.id = i1615[7]
  i1614.x = i1615[8]
  i1614.y = i1615[9]
  i1614.width = i1615[10]
  i1614.height = i1615[11]
  i1614.xOffset = i1615[12]
  i1614.yOffset = i1615[13]
  i1614.xAdvance = i1615[14]
  i1614.scale = i1615[15]
  return i1614
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1620 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1621 = data
  i1620.m_Name = i1621[0]
  i1620.m_ElementType = i1621[1]
  i1620.m_Unicode = i1621[2]
  i1620.m_GlyphIndex = i1621[3]
  i1620.m_Scale = i1621[4]
  return i1620
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1624 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1625 = data
  request.r(i1625[0], i1625[1], 0, i1624, 'sprite')
  i1624.m_Index = i1625[2]
  i1624.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1625[3], i1624.m_Metrics)
  i1624.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1625[4], i1624.m_GlyphRect)
  i1624.m_Scale = i1625[5]
  i1624.m_AtlasIndex = i1625[6]
  i1624.m_ClassDefinitionType = i1625[7]
  return i1624
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1626 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1627 = data
  var i1629 = i1627[0]
  var i1628 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1629.length; i += 1) {
    i1628.add(request.d('TMPro.TMP_Style', i1629[i + 0]));
  }
  i1626.m_StyleList = i1628
  return i1626
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1632 = root || request.c( 'TMPro.TMP_Style' )
  var i1633 = data
  i1632.m_Name = i1633[0]
  i1632.m_HashCode = i1633[1]
  i1632.m_OpeningDefinition = i1633[2]
  i1632.m_ClosingDefinition = i1633[3]
  i1632.m_OpeningTagArray = i1633[4]
  i1632.m_ClosingTagArray = i1633[5]
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1634 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1635 = data
  var i1637 = i1635[0]
  var i1636 = []
  for(var i = 0; i < i1637.length; i += 1) {
    i1636.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1637[i + 0]) );
  }
  i1634.files = i1636
  i1634.componentToPrefabIds = i1635[1]
  return i1634
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1641 = data
  i1640.path = i1641[0]
  request.r(i1641[1], i1641[2], 0, i1640, 'unityObject')
  return i1640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1643 = data
  var i1645 = i1643[0]
  var i1644 = []
  for(var i = 0; i < i1645.length; i += 1) {
    i1644.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1645[i + 0]) );
  }
  i1642.scriptsExecutionOrder = i1644
  var i1647 = i1643[1]
  var i1646 = []
  for(var i = 0; i < i1647.length; i += 1) {
    i1646.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1647[i + 0]) );
  }
  i1642.sortingLayers = i1646
  var i1649 = i1643[2]
  var i1648 = []
  for(var i = 0; i < i1649.length; i += 1) {
    i1648.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1649[i + 0]) );
  }
  i1642.cullingLayers = i1648
  i1642.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1643[3], i1642.timeSettings)
  i1642.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1643[4], i1642.physicsSettings)
  i1642.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1643[5], i1642.physics2DSettings)
  i1642.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1643[6], i1642.qualitySettings)
  i1642.enableRealtimeShadows = !!i1643[7]
  i1642.enableAutoInstancing = !!i1643[8]
  i1642.enableStaticBatching = !!i1643[9]
  i1642.enableDynamicBatching = !!i1643[10]
  i1642.usePreservativeDynamicBatching = !!i1643[11]
  i1642.lightmapEncodingQuality = i1643[12]
  i1642.desiredColorSpace = i1643[13]
  var i1651 = i1643[14]
  var i1650 = []
  for(var i = 0; i < i1651.length; i += 1) {
    i1650.push( i1651[i + 0] );
  }
  i1642.allTags = i1650
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1655 = data
  i1654.name = i1655[0]
  i1654.value = i1655[1]
  return i1654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1659 = data
  i1658.id = i1659[0]
  i1658.name = i1659[1]
  i1658.value = i1659[2]
  return i1658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1663 = data
  i1662.id = i1663[0]
  i1662.name = i1663[1]
  return i1662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1664 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1665 = data
  i1664.fixedDeltaTime = i1665[0]
  i1664.maximumDeltaTime = i1665[1]
  i1664.timeScale = i1665[2]
  i1664.maximumParticleTimestep = i1665[3]
  return i1664
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1667 = data
  i1666.gravity = new pc.Vec3( i1667[0], i1667[1], i1667[2] )
  i1666.defaultSolverIterations = i1667[3]
  i1666.bounceThreshold = i1667[4]
  i1666.autoSyncTransforms = !!i1667[5]
  i1666.autoSimulation = !!i1667[6]
  var i1669 = i1667[7]
  var i1668 = []
  for(var i = 0; i < i1669.length; i += 1) {
    i1668.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1669[i + 0]) );
  }
  i1666.collisionMatrix = i1668
  return i1666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1672 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1673 = data
  i1672.enabled = !!i1673[0]
  i1672.layerId = i1673[1]
  i1672.otherLayerId = i1673[2]
  return i1672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1674 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1675 = data
  request.r(i1675[0], i1675[1], 0, i1674, 'material')
  i1674.gravity = new pc.Vec2( i1675[2], i1675[3] )
  i1674.positionIterations = i1675[4]
  i1674.velocityIterations = i1675[5]
  i1674.velocityThreshold = i1675[6]
  i1674.maxLinearCorrection = i1675[7]
  i1674.maxAngularCorrection = i1675[8]
  i1674.maxTranslationSpeed = i1675[9]
  i1674.maxRotationSpeed = i1675[10]
  i1674.baumgarteScale = i1675[11]
  i1674.baumgarteTOIScale = i1675[12]
  i1674.timeToSleep = i1675[13]
  i1674.linearSleepTolerance = i1675[14]
  i1674.angularSleepTolerance = i1675[15]
  i1674.defaultContactOffset = i1675[16]
  i1674.autoSimulation = !!i1675[17]
  i1674.queriesHitTriggers = !!i1675[18]
  i1674.queriesStartInColliders = !!i1675[19]
  i1674.callbacksOnDisable = !!i1675[20]
  i1674.reuseCollisionCallbacks = !!i1675[21]
  i1674.autoSyncTransforms = !!i1675[22]
  var i1677 = i1675[23]
  var i1676 = []
  for(var i = 0; i < i1677.length; i += 1) {
    i1676.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1677[i + 0]) );
  }
  i1674.collisionMatrix = i1676
  return i1674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1680 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1681 = data
  i1680.enabled = !!i1681[0]
  i1680.layerId = i1681[1]
  i1680.otherLayerId = i1681[2]
  return i1680
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1683 = data
  var i1685 = i1683[0]
  var i1684 = []
  for(var i = 0; i < i1685.length; i += 1) {
    i1684.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1685[i + 0]) );
  }
  i1682.qualityLevels = i1684
  var i1687 = i1683[1]
  var i1686 = []
  for(var i = 0; i < i1687.length; i += 1) {
    i1686.push( i1687[i + 0] );
  }
  i1682.names = i1686
  i1682.shadows = i1683[2]
  i1682.anisotropicFiltering = i1683[3]
  i1682.antiAliasing = i1683[4]
  i1682.lodBias = i1683[5]
  i1682.shadowCascades = i1683[6]
  i1682.shadowDistance = i1683[7]
  i1682.shadowmaskMode = i1683[8]
  i1682.shadowProjection = i1683[9]
  i1682.shadowResolution = i1683[10]
  i1682.softParticles = !!i1683[11]
  i1682.softVegetation = !!i1683[12]
  i1682.activeColorSpace = i1683[13]
  i1682.desiredColorSpace = i1683[14]
  i1682.masterTextureLimit = i1683[15]
  i1682.maxQueuedFrames = i1683[16]
  i1682.particleRaycastBudget = i1683[17]
  i1682.pixelLightCount = i1683[18]
  i1682.realtimeReflectionProbes = !!i1683[19]
  i1682.shadowCascade2Split = i1683[20]
  i1682.shadowCascade4Split = new pc.Vec3( i1683[21], i1683[22], i1683[23] )
  i1682.streamingMipmapsActive = !!i1683[24]
  i1682.vSyncCount = i1683[25]
  i1682.asyncUploadBufferSize = i1683[26]
  i1682.asyncUploadTimeSlice = i1683[27]
  i1682.billboardsFaceCameraPosition = !!i1683[28]
  i1682.shadowNearPlaneOffset = i1683[29]
  i1682.streamingMipmapsMemoryBudget = i1683[30]
  i1682.maximumLODLevel = i1683[31]
  i1682.streamingMipmapsAddAllCameras = !!i1683[32]
  i1682.streamingMipmapsMaxLevelReduction = i1683[33]
  i1682.streamingMipmapsRenderersPerFrame = i1683[34]
  i1682.resolutionScalingFixedDPIFactor = i1683[35]
  i1682.streamingMipmapsMaxFileIORequests = i1683[36]
  i1682.currentQualityLevel = i1683[37]
  return i1682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i1690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i1691 = data
  i1690.name = i1691[0]
  var i1693 = i1691[1]
  var i1692 = []
  for(var i = 0; i < i1693.length; i += 1) {
    i1692.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i1693[i + 0]) );
  }
  i1690.tos = i1692
  var i1695 = i1691[2]
  var i1694 = []
  for(var i = 0; i < i1695.length; i += 1) {
    i1694.push( i1695[i + 0] );
  }
  i1690.constant = i1694
  i1690.isValid = !!i1691[3]
  i1690.isHuman = !!i1691[4]
  i1690.hasRootMotion = !!i1691[5]
  return i1690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i1698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i1699 = data
  i1698.hash = i1699[0]
  i1698.path = i1699[1]
  return i1698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1703 = data
  i1702.weight = i1703[0]
  i1702.vertices = i1703[1]
  i1702.normals = i1703[2]
  i1702.tangents = i1703[3]
  return i1702
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1704 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1705 = data
  request.r(i1705[0], i1705[1], 0, i1704, 'm_ObjectArgument')
  i1704.m_ObjectArgumentAssemblyTypeName = i1705[2]
  i1704.m_IntArgument = i1705[3]
  i1704.m_FloatArgument = i1705[4]
  i1704.m_StringArgument = i1705[5]
  i1704.m_BoolArgument = !!i1705[6]
  return i1704
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1706 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1707 = data
  i1706.xPlacement = i1707[0]
  i1706.yPlacement = i1707[1]
  i1706.xAdvance = i1707[2]
  i1706.yAdvance = i1707[3]
  return i1706
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

Deserializers.buildID = "29901b7b-735a-4d3b-ab13-47d53f1fd573";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

