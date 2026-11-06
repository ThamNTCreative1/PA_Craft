var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2842 = root || request.c( 'UnityEngine.JointSpring' )
  var i2843 = data
  i2842.spring = i2843[0]
  i2842.damper = i2843[1]
  i2842.targetPosition = i2843[2]
  return i2842
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2844 = root || request.c( 'UnityEngine.JointMotor' )
  var i2845 = data
  i2844.m_TargetVelocity = i2845[0]
  i2844.m_Force = i2845[1]
  i2844.m_FreeSpin = i2845[2]
  return i2844
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2846 = root || request.c( 'UnityEngine.JointLimits' )
  var i2847 = data
  i2846.m_Min = i2847[0]
  i2846.m_Max = i2847[1]
  i2846.m_Bounciness = i2847[2]
  i2846.m_BounceMinVelocity = i2847[3]
  i2846.m_ContactDistance = i2847[4]
  i2846.minBounce = i2847[5]
  i2846.maxBounce = i2847[6]
  return i2846
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2848 = root || request.c( 'UnityEngine.JointDrive' )
  var i2849 = data
  i2848.m_PositionSpring = i2849[0]
  i2848.m_PositionDamper = i2849[1]
  i2848.m_MaximumForce = i2849[2]
  i2848.m_UseAcceleration = i2849[3]
  return i2848
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2850 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2851 = data
  i2850.m_Spring = i2851[0]
  i2850.m_Damper = i2851[1]
  return i2850
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2852 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2853 = data
  i2852.m_Limit = i2853[0]
  i2852.m_Bounciness = i2853[1]
  i2852.m_ContactDistance = i2853[2]
  return i2852
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2854 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2855 = data
  i2854.m_ExtremumSlip = i2855[0]
  i2854.m_ExtremumValue = i2855[1]
  i2854.m_AsymptoteSlip = i2855[2]
  i2854.m_AsymptoteValue = i2855[3]
  i2854.m_Stiffness = i2855[4]
  return i2854
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2856 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2857 = data
  i2856.m_LowerAngle = i2857[0]
  i2856.m_UpperAngle = i2857[1]
  return i2856
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2858 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2859 = data
  i2858.m_MotorSpeed = i2859[0]
  i2858.m_MaximumMotorTorque = i2859[1]
  return i2858
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2860 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2861 = data
  i2860.m_DampingRatio = i2861[0]
  i2860.m_Frequency = i2861[1]
  i2860.m_Angle = i2861[2]
  return i2860
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2862 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2863 = data
  i2862.m_LowerTranslation = i2863[0]
  i2862.m_UpperTranslation = i2863[1]
  return i2862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2865 = data
  i2864.name = i2865[0]
  i2864.width = i2865[1]
  i2864.height = i2865[2]
  i2864.mipmapCount = i2865[3]
  i2864.anisoLevel = i2865[4]
  i2864.filterMode = i2865[5]
  i2864.hdr = !!i2865[6]
  i2864.format = i2865[7]
  i2864.wrapMode = i2865[8]
  i2864.alphaIsTransparency = !!i2865[9]
  i2864.alphaSource = i2865[10]
  i2864.graphicsFormat = i2865[11]
  i2864.sRGBTexture = !!i2865[12]
  i2864.desiredColorSpace = i2865[13]
  i2864.wrapU = i2865[14]
  i2864.wrapV = i2865[15]
  return i2864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i2866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i2867 = data
  i2866.name = i2867[0]
  i2866.halfPrecision = !!i2867[1]
  i2866.useSimplification = !!i2867[2]
  i2866.useUInt32IndexFormat = !!i2867[3]
  i2866.vertexCount = i2867[4]
  i2866.aabb = i2867[5]
  var i2869 = i2867[6]
  var i2868 = []
  for(var i = 0; i < i2869.length; i += 1) {
    i2868.push( !!i2869[i + 0] );
  }
  i2866.streams = i2868
  i2866.vertices = i2867[7]
  var i2871 = i2867[8]
  var i2870 = []
  for(var i = 0; i < i2871.length; i += 1) {
    i2870.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i2871[i + 0]) );
  }
  i2866.subMeshes = i2870
  var i2873 = i2867[9]
  var i2872 = []
  for(var i = 0; i < i2873.length; i += 16) {
    i2872.push( new pc.Mat4().setData(i2873[i + 0], i2873[i + 1], i2873[i + 2], i2873[i + 3],  i2873[i + 4], i2873[i + 5], i2873[i + 6], i2873[i + 7],  i2873[i + 8], i2873[i + 9], i2873[i + 10], i2873[i + 11],  i2873[i + 12], i2873[i + 13], i2873[i + 14], i2873[i + 15]) );
  }
  i2866.bindposes = i2872
  var i2875 = i2867[10]
  var i2874 = []
  for(var i = 0; i < i2875.length; i += 1) {
    i2874.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i2875[i + 0]) );
  }
  i2866.blendShapes = i2874
  return i2866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i2880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i2881 = data
  i2880.triangles = i2881[0]
  return i2880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i2886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i2887 = data
  i2886.name = i2887[0]
  var i2889 = i2887[1]
  var i2888 = []
  for(var i = 0; i < i2889.length; i += 1) {
    i2888.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i2889[i + 0]) );
  }
  i2886.frames = i2888
  return i2886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2890 = root || new pc.UnityMaterial()
  var i2891 = data
  i2890.name = i2891[0]
  request.r(i2891[1], i2891[2], 0, i2890, 'shader')
  i2890.renderQueue = i2891[3]
  i2890.enableInstancing = !!i2891[4]
  var i2893 = i2891[5]
  var i2892 = []
  for(var i = 0; i < i2893.length; i += 1) {
    i2892.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2893[i + 0]) );
  }
  i2890.floatParameters = i2892
  var i2895 = i2891[6]
  var i2894 = []
  for(var i = 0; i < i2895.length; i += 1) {
    i2894.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2895[i + 0]) );
  }
  i2890.colorParameters = i2894
  var i2897 = i2891[7]
  var i2896 = []
  for(var i = 0; i < i2897.length; i += 1) {
    i2896.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2897[i + 0]) );
  }
  i2890.vectorParameters = i2896
  var i2899 = i2891[8]
  var i2898 = []
  for(var i = 0; i < i2899.length; i += 1) {
    i2898.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2899[i + 0]) );
  }
  i2890.textureParameters = i2898
  var i2901 = i2891[9]
  var i2900 = []
  for(var i = 0; i < i2901.length; i += 1) {
    i2900.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2901[i + 0]) );
  }
  i2890.materialFlags = i2900
  return i2890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2905 = data
  i2904.name = i2905[0]
  i2904.value = i2905[1]
  return i2904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2908 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2909 = data
  i2908.name = i2909[0]
  i2908.value = new pc.Color(i2909[1], i2909[2], i2909[3], i2909[4])
  return i2908
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2913 = data
  i2912.name = i2913[0]
  i2912.value = new pc.Vec4( i2913[1], i2913[2], i2913[3], i2913[4] )
  return i2912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2916 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2917 = data
  i2916.name = i2917[0]
  request.r(i2917[1], i2917[2], 0, i2916, 'value')
  return i2916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2921 = data
  i2920.name = i2921[0]
  i2920.enabled = !!i2921[1]
  return i2920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i2922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i2923 = data
  i2922.position = new pc.Vec3( i2923[0], i2923[1], i2923[2] )
  i2922.scale = new pc.Vec3( i2923[3], i2923[4], i2923[5] )
  i2922.rotation = new pc.Quat(i2923[6], i2923[7], i2923[8], i2923[9])
  return i2922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i2924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i2925 = data
  request.r(i2925[0], i2925[1], 0, i2924, 'sharedMesh')
  return i2924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i2926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i2927 = data
  request.r(i2927[0], i2927[1], 0, i2926, 'additionalVertexStreams')
  i2926.enabled = !!i2927[2]
  request.r(i2927[3], i2927[4], 0, i2926, 'sharedMaterial')
  var i2929 = i2927[5]
  var i2928 = []
  for(var i = 0; i < i2929.length; i += 2) {
  request.r(i2929[i + 0], i2929[i + 1], 2, i2928, '')
  }
  i2926.sharedMaterials = i2928
  i2926.receiveShadows = !!i2927[6]
  i2926.shadowCastingMode = i2927[7]
  i2926.sortingLayerID = i2927[8]
  i2926.sortingOrder = i2927[9]
  i2926.lightmapIndex = i2927[10]
  i2926.lightmapSceneIndex = i2927[11]
  i2926.lightmapScaleOffset = new pc.Vec4( i2927[12], i2927[13], i2927[14], i2927[15] )
  i2926.lightProbeUsage = i2927[16]
  i2926.reflectionProbeUsage = i2927[17]
  return i2926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2933 = data
  i2932.name = i2933[0]
  i2932.tagId = i2933[1]
  i2932.enabled = !!i2933[2]
  i2932.isStatic = !!i2933[3]
  i2932.layer = i2933[4]
  return i2932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i2934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i2935 = data
  i2934.name = i2935[0]
  i2934.atlasId = i2935[1]
  i2934.mipmapCount = i2935[2]
  i2934.hdr = !!i2935[3]
  i2934.size = i2935[4]
  i2934.anisoLevel = i2935[5]
  i2934.filterMode = i2935[6]
  var i2937 = i2935[7]
  var i2936 = []
  for(var i = 0; i < i2937.length; i += 4) {
    i2936.push( UnityEngine.Rect.MinMaxRect(i2937[i + 0], i2937[i + 1], i2937[i + 2], i2937[i + 3]) );
  }
  i2934.rects = i2936
  i2934.wrapU = i2935[8]
  i2934.wrapV = i2935[9]
  return i2934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2941 = data
  i2940.name = i2941[0]
  i2940.index = i2941[1]
  i2940.startup = !!i2941[2]
  return i2940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2943 = data
  i2942.aspect = i2943[0]
  i2942.orthographic = !!i2943[1]
  i2942.orthographicSize = i2943[2]
  i2942.backgroundColor = new pc.Color(i2943[3], i2943[4], i2943[5], i2943[6])
  i2942.nearClipPlane = i2943[7]
  i2942.farClipPlane = i2943[8]
  i2942.fieldOfView = i2943[9]
  i2942.depth = i2943[10]
  i2942.clearFlags = i2943[11]
  i2942.cullingMask = i2943[12]
  i2942.rect = i2943[13]
  request.r(i2943[14], i2943[15], 0, i2942, 'targetTexture')
  i2942.usePhysicalProperties = !!i2943[16]
  i2942.focalLength = i2943[17]
  i2942.sensorSize = new pc.Vec2( i2943[18], i2943[19] )
  i2942.lensShift = new pc.Vec2( i2943[20], i2943[21] )
  i2942.gateFit = i2943[22]
  i2942.commandBufferCount = i2943[23]
  i2942.cameraType = i2943[24]
  i2942.enabled = !!i2943[25]
  return i2942
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i2944 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i2945 = data
  i2944.m_RenderShadows = !!i2945[0]
  i2944.m_RequiresDepthTextureOption = i2945[1]
  i2944.m_RequiresOpaqueTextureOption = i2945[2]
  i2944.m_CameraType = i2945[3]
  var i2947 = i2945[4]
  var i2946 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i2947.length; i += 2) {
  request.r(i2947[i + 0], i2947[i + 1], 1, i2946, '')
  }
  i2944.m_Cameras = i2946
  i2944.m_RendererIndex = i2945[5]
  i2944.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i2945[6] )
  request.r(i2945[7], i2945[8], 0, i2944, 'm_VolumeTrigger')
  i2944.m_VolumeFrameworkUpdateModeOption = i2945[9]
  i2944.m_RenderPostProcessing = !!i2945[10]
  i2944.m_Antialiasing = i2945[11]
  i2944.m_AntialiasingQuality = i2945[12]
  i2944.m_StopNaN = !!i2945[13]
  i2944.m_Dithering = !!i2945[14]
  i2944.m_ClearDepth = !!i2945[15]
  i2944.m_AllowXRRendering = !!i2945[16]
  i2944.m_AllowHDROutput = !!i2945[17]
  i2944.m_UseScreenCoordOverride = !!i2945[18]
  i2944.m_ScreenSizeOverride = new pc.Vec4( i2945[19], i2945[20], i2945[21], i2945[22] )
  i2944.m_ScreenCoordScaleBias = new pc.Vec4( i2945[23], i2945[24], i2945[25], i2945[26] )
  i2944.m_RequiresDepthTexture = !!i2945[27]
  i2944.m_RequiresColorTexture = !!i2945[28]
  i2944.m_Version = i2945[29]
  i2944.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i2945[30], i2944.m_TaaSettings)
  return i2944
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i2950 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i2951 = data
  i2950.m_Quality = i2951[0]
  i2950.m_FrameInfluence = i2951[1]
  i2950.m_JitterScale = i2951[2]
  i2950.m_MipBias = i2951[3]
  i2950.m_VarianceClampScale = i2951[4]
  i2950.m_ContrastAdaptiveSharpening = i2951[5]
  return i2950
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i2952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i2953 = data
  i2952.type = i2953[0]
  i2952.color = new pc.Color(i2953[1], i2953[2], i2953[3], i2953[4])
  i2952.cullingMask = i2953[5]
  i2952.intensity = i2953[6]
  i2952.range = i2953[7]
  i2952.spotAngle = i2953[8]
  i2952.shadows = i2953[9]
  i2952.shadowNormalBias = i2953[10]
  i2952.shadowBias = i2953[11]
  i2952.shadowStrength = i2953[12]
  i2952.shadowResolution = i2953[13]
  i2952.lightmapBakeType = i2953[14]
  i2952.renderMode = i2953[15]
  request.r(i2953[16], i2953[17], 0, i2952, 'cookie')
  i2952.cookieSize = i2953[18]
  i2952.shadowNearPlane = i2953[19]
  i2952.occlusionMaskChannel = i2953[20]
  i2952.isBaked = !!i2953[21]
  i2952.mixedLightingMode = i2953[22]
  i2952.enabled = !!i2953[23]
  return i2952
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i2954 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i2955 = data
  i2954.m_Version = i2955[0]
  i2954.m_UsePipelineSettings = !!i2955[1]
  i2954.m_AdditionalLightsShadowResolutionTier = i2955[2]
  i2954.m_LightLayerMask = i2955[3]
  i2954.m_RenderingLayers = i2955[4]
  i2954.m_CustomShadowLayers = !!i2955[5]
  i2954.m_ShadowLayerMask = i2955[6]
  i2954.m_ShadowRenderingLayers = i2955[7]
  i2954.m_LightCookieSize = new pc.Vec2( i2955[8], i2955[9] )
  i2954.m_LightCookieOffset = new pc.Vec2( i2955[10], i2955[11] )
  i2954.m_SoftShadowQuality = i2955[12]
  return i2954
}

Deserializers["UnityEngine.Rendering.Volume"] = function (request, data, root) {
  var i2956 = root || request.c( 'UnityEngine.Rendering.Volume' )
  var i2957 = data
  i2956.priority = i2957[0]
  i2956.blendDistance = i2957[1]
  i2956.weight = i2957[2]
  request.r(i2957[3], i2957[4], 0, i2956, 'sharedProfile')
  i2956.m_IsGlobal = !!i2957[5]
  return i2956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2959 = data
  request.r(i2959[0], i2959[1], 0, i2958, 'clip')
  request.r(i2959[2], i2959[3], 0, i2958, 'outputAudioMixerGroup')
  i2958.playOnAwake = !!i2959[4]
  i2958.loop = !!i2959[5]
  i2958.time = i2959[6]
  i2958.volume = i2959[7]
  i2958.pitch = i2959[8]
  i2958.enabled = !!i2959[9]
  return i2958
}

Deserializers["CEBB.Playable.LivingRoomPlayable"] = function (request, data, root) {
  var i2960 = root || request.c( 'CEBB.Playable.LivingRoomPlayable' )
  var i2961 = data
  var i2963 = i2961[0]
  var i2962 = []
  for(var i = 0; i < i2963.length; i += 1) {
    i2962.push( request.d('CEBB.Playable.DecorCatalogEntry', i2963[i + 0]) );
  }
  i2960.catalog = i2962
  i2960.firstEntry = i2961[1]
  i2960.guideEntry = i2961[2]
  request.r(i2961[3], i2961[4], 0, i2960, 'lookGuide')
  i2960.lookGuideRadius = new pc.Vec2( i2961[5], i2961[6] )
  i2960.lookTutorialDegrees = i2961[7]
  request.r(i2961[8], i2961[9], 0, i2960, 'roomRoot')
  request.r(i2961[10], i2961[11], 0, i2960, 'placedRoot')
  request.r(i2961[12], i2961[13], 0, i2960, 'ghostMaterial')
  request.r(i2961[14], i2961[15], 0, i2960, 'ghostInvalidMaterial')
  request.r(i2961[16], i2961[17], 0, i2960, 'deleteMarker')
  request.r(i2961[18], i2961[19], 0, i2960, 'footprintMarker')
  i2960.roomMin = new pc.Vec2( i2961[20], i2961[21] )
  i2960.roomMax = new pc.Vec2( i2961[22], i2961[23] )
  i2960.roomHeight = i2961[24]
  i2960.snap = i2961[25]
  i2960.buildReach = i2961[26]
  request.r(i2961[27], i2961[28], 0, i2960, 'player')
  request.r(i2961[29], i2961[30], 0, i2960, 'luna')
  request.r(i2961[31], i2961[32], 0, i2960, 'promptText')
  request.r(i2961[33], i2961[34], 0, i2960, 'countText')
  request.r(i2961[35], i2961[36], 0, i2960, 'buildLabel')
  request.r(i2961[37], i2961[38], 0, i2960, 'hand')
  request.r(i2961[39], i2961[40], 0, i2960, 'buildButton')
  request.r(i2961[41], i2961[42], 0, i2960, 'trashButton')
  request.r(i2961[43], i2961[44], 0, i2960, 'rotateButton')
  request.r(i2961[45], i2961[46], 0, i2960, 'ctaButton')
  request.r(i2961[47], i2961[48], 0, i2960, 'trashImage')
  request.r(i2961[49], i2961[50], 0, i2960, 'reticle')
  request.r(i2961[51], i2961[52], 0, i2960, 'buildFill')
  i2960.firstPrompt = i2961[53]
  i2960.selectPrompt = i2961[54]
  i2960.lookPrompt = i2961[55]
  i2960.aimPrompt = i2961[56]
  i2960.buildPrompt = i2961[57]
  i2960.freePrompt = i2961[58]
  i2960.deletePrompt = i2961[59]
  i2960.emptyPrompt = i2961[60]
  i2960.overlapPrompt = i2961[61]
  i2960.playerPrompt = i2961[62]
  i2960.wallPrompt = i2961[63]
  i2960.heightPrompt = i2961[64]
  i2960.revealSeconds = i2961[65]
  request.r(i2961[66], i2961[67], 0, i2960, 'placementAudio')
  request.r(i2961[68], i2961[69], 0, i2960, 'placementSfx')
  i2960.placementVolume = i2961[70]
  request.r(i2961[71], i2961[72], 0, i2960, 'bgmSource')
  request.r(i2961[73], i2961[74], 0, i2960, 'bgmClip')
  i2960.bgmVolume = i2961[75]
  i2960.bgmEnabled = !!i2961[76]
  request.r(i2961[77], i2961[78], 0, i2960, 'logoImage')
  request.r(i2961[79], i2961[80], 0, i2960, 'logoTexture')
  i2960.onGameStarted = request.d('UnityEngine.Events.UnityEvent', i2961[81], i2960.onGameStarted)
  i2960.onGameEnded = request.d('UnityEngine.Events.UnityEvent', i2961[82], i2960.onGameEnded)
  i2960.onCtaClicked = request.d('UnityEngine.Events.UnityEvent', i2961[83], i2960.onCtaClicked)
  i2960.onFurniturePlaced = request.d('UnityEngine.Events.UnityEvent', i2961[84], i2960.onFurniturePlaced)
  i2960.stage = i2961[85]
  i2960.interactionCount = i2961[86]
  i2960.builtCount = i2961[87]
  i2960.placementsTotal = i2961[88]
  i2960.selected = i2961[89]
  return i2960
}

Deserializers["CEBB.Playable.DecorCatalogEntry"] = function (request, data, root) {
  var i2966 = root || request.c( 'CEBB.Playable.DecorCatalogEntry' )
  var i2967 = data
  request.r(i2967[0], i2967[1], 0, i2966, 'item')
  request.r(i2967[2], i2967[3], 0, i2966, 'button')
  request.r(i2967[4], i2967[5], 0, i2966, 'frame')
  request.r(i2967[6], i2967[7], 0, i2966, 'icon')
  request.r(i2967[8], i2967[9], 0, i2966, 'quantityText')
  request.r(i2967[10], i2967[11], 0, i2966, 'nameText')
  request.r(i2967[12], i2967[13], 0, i2966, 'emptyBadge')
  return i2966
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i2968 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i2969 = data
  i2968.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2969[0], i2968.m_PersistentCalls)
  return i2968
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2970 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2971 = data
  var i2973 = i2971[0]
  var i2972 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2973.length; i += 1) {
    i2972.add(request.d('UnityEngine.Events.PersistentCall', i2973[i + 0]));
  }
  i2970.m_Calls = i2972
  return i2970
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2976 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2977 = data
  request.r(i2977[0], i2977[1], 0, i2976, 'm_Target')
  i2976.m_TargetAssemblyTypeName = i2977[2]
  i2976.m_MethodName = i2977[3]
  i2976.m_Mode = i2977[4]
  i2976.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2977[5], i2976.m_Arguments)
  i2976.m_CallState = i2977[6]
  return i2976
}

Deserializers["CEBB.Playable.LunaController"] = function (request, data, root) {
  var i2978 = root || request.c( 'CEBB.Playable.LunaController' )
  var i2979 = data
  i2978.timeLimit = i2979[0]
  i2978.itemsToEnd = i2979[1]
  i2978.clicksToEnd = i2979[2]
  request.r(i2979[3], i2979[4], 0, i2978, 'game')
  request.r(i2979[5], i2979[6], 0, i2978, 'ctaOverlay')
  request.r(i2979[7], i2979[8], 0, i2978, 'timerText')
  return i2978
}

Deserializers["CEBB.Playable.BedroomLayout"] = function (request, data, root) {
  var i2980 = root || request.c( 'CEBB.Playable.BedroomLayout' )
  var i2981 = data
  request.r(i2981[0], i2981[1], 0, i2980, 'roomCamera')
  request.r(i2981[2], i2981[3], 0, i2980, 'canvas')
  request.r(i2981[4], i2981[5], 0, i2980, 'catalog')
  request.r(i2981[6], i2981[7], 0, i2980, 'grid')
  request.r(i2981[8], i2981[9], 0, i2980, 'header')
  request.r(i2981[10], i2981[11], 0, i2980, 'prompt')
  request.r(i2981[12], i2981[13], 0, i2980, 'cta')
  request.r(i2981[14], i2981[15], 0, i2980, 'progress')
  request.r(i2981[16], i2981[17], 0, i2980, 'stats')
  request.r(i2981[18], i2981[19], 0, i2980, 'movePad')
  i2980.firstPersonMode = !!i2981[20]
  i2980.lookTarget = new pc.Vec3( i2981[21], i2981[22], i2981[23] )
  i2980.viewOffset = new pc.Vec3( i2981[24], i2981[25], i2981[26] )
  i2980.respectSafeArea = !!i2981[27]
  return i2980
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2983 = data
  i2982.pivot = new pc.Vec2( i2983[0], i2983[1] )
  i2982.anchorMin = new pc.Vec2( i2983[2], i2983[3] )
  i2982.anchorMax = new pc.Vec2( i2983[4], i2983[5] )
  i2982.sizeDelta = new pc.Vec2( i2983[6], i2983[7] )
  i2982.anchoredPosition3D = new pc.Vec3( i2983[8], i2983[9], i2983[10] )
  i2982.rotation = new pc.Quat(i2983[11], i2983[12], i2983[13], i2983[14])
  i2982.scale = new pc.Vec3( i2983[15], i2983[16], i2983[17] )
  return i2982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2985 = data
  i2984.planeDistance = i2985[0]
  i2984.referencePixelsPerUnit = i2985[1]
  i2984.isFallbackOverlay = !!i2985[2]
  i2984.renderMode = i2985[3]
  i2984.renderOrder = i2985[4]
  i2984.sortingLayerName = i2985[5]
  i2984.sortingOrder = i2985[6]
  i2984.scaleFactor = i2985[7]
  request.r(i2985[8], i2985[9], 0, i2984, 'worldCamera')
  i2984.overrideSorting = !!i2985[10]
  i2984.pixelPerfect = !!i2985[11]
  i2984.targetDisplay = i2985[12]
  i2984.overridePixelPerfect = !!i2985[13]
  i2984.enabled = !!i2985[14]
  return i2984
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2986 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2987 = data
  i2986.m_UiScaleMode = i2987[0]
  i2986.m_ReferencePixelsPerUnit = i2987[1]
  i2986.m_ScaleFactor = i2987[2]
  i2986.m_ReferenceResolution = new pc.Vec2( i2987[3], i2987[4] )
  i2986.m_ScreenMatchMode = i2987[5]
  i2986.m_MatchWidthOrHeight = i2987[6]
  i2986.m_PhysicalUnit = i2987[7]
  i2986.m_FallbackScreenDPI = i2987[8]
  i2986.m_DefaultSpriteDPI = i2987[9]
  i2986.m_DynamicPixelsPerUnit = i2987[10]
  i2986.m_PresetInfoIsWorld = !!i2987[11]
  return i2986
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2988 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2989 = data
  i2988.m_IgnoreReversedGraphics = !!i2989[0]
  i2988.m_BlockingObjects = i2989[1]
  i2988.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2989[2] )
  return i2988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2991 = data
  i2990.cullTransparentMesh = !!i2991[0]
  return i2990
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2992 = root || request.c( 'UnityEngine.UI.Image' )
  var i2993 = data
  request.r(i2993[0], i2993[1], 0, i2992, 'm_Sprite')
  i2992.m_Type = i2993[2]
  i2992.m_PreserveAspect = !!i2993[3]
  i2992.m_FillCenter = !!i2993[4]
  i2992.m_FillMethod = i2993[5]
  i2992.m_FillAmount = i2993[6]
  i2992.m_FillClockwise = !!i2993[7]
  i2992.m_FillOrigin = i2993[8]
  i2992.m_UseSpriteMesh = !!i2993[9]
  i2992.m_PixelsPerUnitMultiplier = i2993[10]
  request.r(i2993[11], i2993[12], 0, i2992, 'm_Material')
  i2992.m_Maskable = !!i2993[13]
  i2992.m_Color = new pc.Color(i2993[14], i2993[15], i2993[16], i2993[17])
  i2992.m_RaycastTarget = !!i2993[18]
  i2992.m_RaycastPadding = new pc.Vec4( i2993[19], i2993[20], i2993[21], i2993[22] )
  return i2992
}

Deserializers["CEBB.Playable.LivingRoomLookSurface"] = function (request, data, root) {
  var i2994 = root || request.c( 'CEBB.Playable.LivingRoomLookSurface' )
  var i2995 = data
  request.r(i2995[0], i2995[1], 0, i2994, 'player')
  return i2994
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2996 = root || request.c( 'UnityEngine.UI.Button' )
  var i2997 = data
  i2996.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2997[0], i2996.m_OnClick)
  i2996.m_Navigation = request.d('UnityEngine.UI.Navigation', i2997[1], i2996.m_Navigation)
  i2996.m_Transition = i2997[2]
  i2996.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2997[3], i2996.m_Colors)
  i2996.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2997[4], i2996.m_SpriteState)
  i2996.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2997[5], i2996.m_AnimationTriggers)
  i2996.m_Interactable = !!i2997[6]
  request.r(i2997[7], i2997[8], 0, i2996, 'm_TargetGraphic')
  return i2996
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2998 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2999 = data
  i2998.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2999[0], i2998.m_PersistentCalls)
  return i2998
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i3000 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i3001 = data
  i3000.m_Mode = i3001[0]
  i3000.m_WrapAround = !!i3001[1]
  request.r(i3001[2], i3001[3], 0, i3000, 'm_SelectOnUp')
  request.r(i3001[4], i3001[5], 0, i3000, 'm_SelectOnDown')
  request.r(i3001[6], i3001[7], 0, i3000, 'm_SelectOnLeft')
  request.r(i3001[8], i3001[9], 0, i3000, 'm_SelectOnRight')
  return i3000
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i3002 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i3003 = data
  i3002.m_NormalColor = new pc.Color(i3003[0], i3003[1], i3003[2], i3003[3])
  i3002.m_HighlightedColor = new pc.Color(i3003[4], i3003[5], i3003[6], i3003[7])
  i3002.m_PressedColor = new pc.Color(i3003[8], i3003[9], i3003[10], i3003[11])
  i3002.m_SelectedColor = new pc.Color(i3003[12], i3003[13], i3003[14], i3003[15])
  i3002.m_DisabledColor = new pc.Color(i3003[16], i3003[17], i3003[18], i3003[19])
  i3002.m_ColorMultiplier = i3003[20]
  i3002.m_FadeDuration = i3003[21]
  return i3002
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i3004 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i3005 = data
  request.r(i3005[0], i3005[1], 0, i3004, 'm_HighlightedSprite')
  request.r(i3005[2], i3005[3], 0, i3004, 'm_PressedSprite')
  request.r(i3005[4], i3005[5], 0, i3004, 'm_SelectedSprite')
  request.r(i3005[6], i3005[7], 0, i3004, 'm_DisabledSprite')
  return i3004
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i3006 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i3007 = data
  i3006.m_NormalTrigger = i3007[0]
  i3006.m_HighlightedTrigger = i3007[1]
  i3006.m_PressedTrigger = i3007[2]
  i3006.m_SelectedTrigger = i3007[3]
  i3006.m_DisabledTrigger = i3007[4]
  return i3006
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i3008 = root || request.c( 'UnityEngine.UI.Text' )
  var i3009 = data
  i3008.m_FontData = request.d('UnityEngine.UI.FontData', i3009[0], i3008.m_FontData)
  i3008.m_Text = i3009[1]
  request.r(i3009[2], i3009[3], 0, i3008, 'm_Material')
  i3008.m_Maskable = !!i3009[4]
  i3008.m_Color = new pc.Color(i3009[5], i3009[6], i3009[7], i3009[8])
  i3008.m_RaycastTarget = !!i3009[9]
  i3008.m_RaycastPadding = new pc.Vec4( i3009[10], i3009[11], i3009[12], i3009[13] )
  return i3008
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i3010 = root || request.c( 'UnityEngine.UI.FontData' )
  var i3011 = data
  request.r(i3011[0], i3011[1], 0, i3010, 'm_Font')
  i3010.m_FontSize = i3011[2]
  i3010.m_FontStyle = i3011[3]
  i3010.m_BestFit = !!i3011[4]
  i3010.m_MinSize = i3011[5]
  i3010.m_MaxSize = i3011[6]
  i3010.m_Alignment = i3011[7]
  i3010.m_AlignByGeometry = !!i3011[8]
  i3010.m_RichText = !!i3011[9]
  i3010.m_HorizontalOverflow = i3011[10]
  i3010.m_VerticalOverflow = i3011[11]
  i3010.m_LineSpacing = i3011[12]
  return i3010
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i3012 = root || request.c( 'UnityEngine.UI.Outline' )
  var i3013 = data
  i3012.m_EffectColor = new pc.Color(i3013[0], i3013[1], i3013[2], i3013[3])
  i3012.m_EffectDistance = new pc.Vec2( i3013[4], i3013[5] )
  i3012.m_UseGraphicAlpha = !!i3013[6]
  return i3012
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i3014 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i3015 = data
  i3014.m_StartCorner = i3015[0]
  i3014.m_StartAxis = i3015[1]
  i3014.m_CellSize = new pc.Vec2( i3015[2], i3015[3] )
  i3014.m_Spacing = new pc.Vec2( i3015[4], i3015[5] )
  i3014.m_Constraint = i3015[6]
  i3014.m_ConstraintCount = i3015[7]
  i3014.m_Padding = UnityEngine.RectOffset.FromPaddings(i3015[8], i3015[9], i3015[10], i3015[11])
  i3014.m_ChildAlignment = i3015[12]
  return i3014
}

Deserializers["UnityEngine.UI.LayoutElement"] = function (request, data, root) {
  var i3016 = root || request.c( 'UnityEngine.UI.LayoutElement' )
  var i3017 = data
  i3016.m_IgnoreLayout = !!i3017[0]
  i3016.m_MinWidth = i3017[1]
  i3016.m_MinHeight = i3017[2]
  i3016.m_PreferredWidth = i3017[3]
  i3016.m_PreferredHeight = i3017[4]
  i3016.m_FlexibleWidth = i3017[5]
  i3016.m_FlexibleHeight = i3017[6]
  i3016.m_LayoutPriority = i3017[7]
  return i3016
}

Deserializers["CEBB.Playable.RoomMovePad"] = function (request, data, root) {
  var i3018 = root || request.c( 'CEBB.Playable.RoomMovePad' )
  var i3019 = data
  request.r(i3019[0], i3019[1], 0, i3018, 'thumbRect')
  i3018.demo = !!i3019[2]
  i3018.demoPull = i3019[3]
  i3018.demoCycleSeconds = i3019[4]
  return i3018
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i3020 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i3021 = data
  request.r(i3021[0], i3021[1], 0, i3020, 'm_FirstSelected')
  i3020.m_sendNavigationEvents = !!i3021[2]
  i3020.m_DragThreshold = i3021[3]
  return i3020
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i3022 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i3023 = data
  i3022.m_HorizontalAxis = i3023[0]
  i3022.m_VerticalAxis = i3023[1]
  i3022.m_SubmitButton = i3023[2]
  i3022.m_CancelButton = i3023[3]
  i3022.m_InputActionsPerSecond = i3023[4]
  i3022.m_RepeatDelay = i3023[5]
  i3022.m_ForceModuleActive = !!i3023[6]
  i3022.m_SendPointerHoverToParent = !!i3023[7]
  return i3022
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i3024 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i3025 = data
  i3024.center = new pc.Vec3( i3025[0], i3025[1], i3025[2] )
  i3024.size = new pc.Vec3( i3025[3], i3025[4], i3025[5] )
  i3024.enabled = !!i3025[6]
  i3024.isTrigger = !!i3025[7]
  request.r(i3025[8], i3025[9], 0, i3024, 'material')
  return i3024
}

Deserializers["CEBB.Playable.PlacementSurface"] = function (request, data, root) {
  var i3026 = root || request.c( 'CEBB.Playable.PlacementSurface' )
  var i3027 = data
  i3026.allowWallItems = !!i3027[0]
  return i3026
}

Deserializers["CEBB.Playable.LivingRoomPlayer"] = function (request, data, root) {
  var i3028 = root || request.c( 'CEBB.Playable.LivingRoomPlayer' )
  var i3029 = data
  request.r(i3029[0], i3029[1], 0, i3028, 'game')
  request.r(i3029[2], i3029[3], 0, i3028, 'playerCamera')
  request.r(i3029[4], i3029[5], 0, i3028, 'movePad')
  i3028.spawnPosition = new pc.Vec3( i3029[6], i3029[7], i3029[8] )
  i3028.eyeHeight = i3029[9]
  i3028.walkSpeed = i3029[10]
  i3028.lookSensitivity = i3029[11]
  i3028.yaw = i3029[12]
  i3028.pitch = i3029[13]
  i3028.bodyRadius = i3029[14]
  return i3028
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i3030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i3031 = data
  i3030.ambientIntensity = i3031[0]
  i3030.reflectionIntensity = i3031[1]
  i3030.ambientMode = i3031[2]
  i3030.ambientLight = new pc.Color(i3031[3], i3031[4], i3031[5], i3031[6])
  i3030.ambientSkyColor = new pc.Color(i3031[7], i3031[8], i3031[9], i3031[10])
  i3030.ambientGroundColor = new pc.Color(i3031[11], i3031[12], i3031[13], i3031[14])
  i3030.ambientEquatorColor = new pc.Color(i3031[15], i3031[16], i3031[17], i3031[18])
  i3030.fogColor = new pc.Color(i3031[19], i3031[20], i3031[21], i3031[22])
  i3030.fogEndDistance = i3031[23]
  i3030.fogStartDistance = i3031[24]
  i3030.fogDensity = i3031[25]
  i3030.fog = !!i3031[26]
  request.r(i3031[27], i3031[28], 0, i3030, 'skybox')
  i3030.fogMode = i3031[29]
  var i3033 = i3031[30]
  var i3032 = []
  for(var i = 0; i < i3033.length; i += 1) {
    i3032.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i3033[i + 0]) );
  }
  i3030.lightmaps = i3032
  i3030.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i3031[31], i3030.lightProbes)
  i3030.lightmapsMode = i3031[32]
  i3030.mixedBakeMode = i3031[33]
  i3030.environmentLightingMode = i3031[34]
  i3030.ambientProbe = new pc.SphericalHarmonicsL2(i3031[35])
  request.r(i3031[36], i3031[37], 0, i3030, 'customReflection')
  request.r(i3031[38], i3031[39], 0, i3030, 'defaultReflection')
  i3030.defaultReflectionMode = i3031[40]
  i3030.defaultReflectionResolution = i3031[41]
  i3030.sunLightObjectId = i3031[42]
  i3030.pixelLightCount = i3031[43]
  i3030.defaultReflectionHDR = !!i3031[44]
  i3030.hasLightDataAsset = !!i3031[45]
  i3030.hasManualGenerate = !!i3031[46]
  return i3030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i3036 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i3037 = data
  request.r(i3037[0], i3037[1], 0, i3036, 'lightmapColor')
  request.r(i3037[2], i3037[3], 0, i3036, 'lightmapDirection')
  request.r(i3037[4], i3037[5], 0, i3036, 'shadowMask')
  return i3036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i3038 = root || new UnityEngine.LightProbes()
  var i3039 = data
  return i3038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset"] = function (request, data, root) {
  var i3046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset' )
  var i3047 = data
  i3046.AdditionalLightsRenderingMode = i3047[0]
  i3046.LightRenderingMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode', i3047[1], i3046.LightRenderingMode)
  i3046.MainLightRenderingModeValue = i3047[2]
  i3046.SupportsMainLightShadows = !!i3047[3]
  i3046.MixedLightingSupported = !!i3047[4]
  i3046.MainLightShadowmapResolutionValue = i3047[5]
  i3046.SupportsSoftShadows = !!i3047[6]
  i3046.SoftShadowQualityValue = i3047[7]
  i3046.ShadowDistance = i3047[8]
  i3046.ShadowCascadeCount = i3047[9]
  i3046.Cascade2Split = i3047[10]
  i3046.Cascade3Split = new pc.Vec2( i3047[11], i3047[12] )
  i3046.Cascade4Split = new pc.Vec3( i3047[13], i3047[14], i3047[15] )
  i3046.CascadeBorder = i3047[16]
  i3046.ShadowDepthBias = i3047[17]
  i3046.ShadowNormalBias = i3047[18]
  i3046.RequireDepthTexture = !!i3047[19]
  i3046.RequireOpaqueTexture = !!i3047[20]
  i3046.scriptableRendererData = request.d('Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData', i3047[21], i3046.scriptableRendererData)
  return i3046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode"] = function (request, data, root) {
  var i3048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode' )
  var i3049 = data
  i3048.Disabled = i3049[0]
  i3048.PerVertex = i3049[1]
  i3048.PerPixel = i3049[2]
  return i3048
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData"] = function (request, data, root) {
  var i3050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData' )
  var i3051 = data
  i3050.opaqueLayerMask = i3051[0]
  i3050.transparentLayerMask = i3051[1]
  var i3053 = i3051[2]
  var i3052 = []
  for(var i = 0; i < i3053.length; i += 1) {
    i3052.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects', i3053[i + 0]) );
  }
  i3050.RenderObjectsFeatures = i3052
  i3050.name = i3051[3]
  return i3050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects"] = function (request, data, root) {
  var i3056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects' )
  var i3057 = data
  i3056.settings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings', i3057[0], i3056.settings)
  i3056.name = i3057[1]
  i3056.typeName = i3057[2]
  return i3056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i3058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i3059 = data
  var i3061 = i3059[0]
  var i3060 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i3061.length; i += 1) {
    i3060.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i3061[i + 0]));
  }
  i3058.ShaderCompilationErrors = i3060
  i3058.name = i3059[1]
  i3058.guid = i3059[2]
  var i3063 = i3059[3]
  var i3062 = []
  for(var i = 0; i < i3063.length; i += 1) {
    i3062.push( i3063[i + 0] );
  }
  i3058.shaderDefinedKeywords = i3062
  var i3065 = i3059[4]
  var i3064 = []
  for(var i = 0; i < i3065.length; i += 1) {
    i3064.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i3065[i + 0]) );
  }
  i3058.passes = i3064
  var i3067 = i3059[5]
  var i3066 = []
  for(var i = 0; i < i3067.length; i += 1) {
    i3066.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i3067[i + 0]) );
  }
  i3058.usePasses = i3066
  var i3069 = i3059[6]
  var i3068 = []
  for(var i = 0; i < i3069.length; i += 1) {
    i3068.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i3069[i + 0]) );
  }
  i3058.defaultParameterValues = i3068
  request.r(i3059[7], i3059[8], 0, i3058, 'unityFallbackShader')
  i3058.readDepth = !!i3059[9]
  i3058.hasDepthOnlyPass = !!i3059[10]
  i3058.isCreatedByShaderGraph = !!i3059[11]
  i3058.disableBatching = !!i3059[12]
  i3058.compiled = !!i3059[13]
  return i3058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i3072 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i3073 = data
  i3072.shaderName = i3073[0]
  i3072.errorMessage = i3073[1]
  return i3072
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i3078 = root || new pc.UnityShaderPass()
  var i3079 = data
  i3078.id = i3079[0]
  i3078.subShaderIndex = i3079[1]
  i3078.name = i3079[2]
  i3078.passType = i3079[3]
  i3078.grabPassTextureName = i3079[4]
  i3078.usePass = !!i3079[5]
  i3078.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[6], i3078.zTest)
  i3078.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[7], i3078.zWrite)
  i3078.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[8], i3078.culling)
  i3078.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i3079[9], i3078.blending)
  i3078.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i3079[10], i3078.alphaBlending)
  i3078.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[11], i3078.colorWriteMask)
  i3078.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[12], i3078.offsetUnits)
  i3078.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[13], i3078.offsetFactor)
  i3078.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[14], i3078.stencilRef)
  i3078.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[15], i3078.stencilReadMask)
  i3078.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3079[16], i3078.stencilWriteMask)
  i3078.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3079[17], i3078.stencilOp)
  i3078.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3079[18], i3078.stencilOpFront)
  i3078.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3079[19], i3078.stencilOpBack)
  var i3081 = i3079[20]
  var i3080 = []
  for(var i = 0; i < i3081.length; i += 1) {
    i3080.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i3081[i + 0]) );
  }
  i3078.tags = i3080
  var i3083 = i3079[21]
  var i3082 = []
  for(var i = 0; i < i3083.length; i += 1) {
    i3082.push( i3083[i + 0] );
  }
  i3078.passDefinedKeywords = i3082
  var i3085 = i3079[22]
  var i3084 = []
  for(var i = 0; i < i3085.length; i += 1) {
    i3084.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i3085[i + 0]) );
  }
  i3078.passDefinedKeywordGroups = i3084
  var i3087 = i3079[23]
  var i3086 = []
  for(var i = 0; i < i3087.length; i += 1) {
    i3086.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i3087[i + 0]) );
  }
  i3078.variants = i3086
  var i3089 = i3079[24]
  var i3088 = []
  for(var i = 0; i < i3089.length; i += 1) {
    i3088.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i3089[i + 0]) );
  }
  i3078.excludedVariants = i3088
  i3078.hasDepthReader = !!i3079[25]
  return i3078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i3090 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i3091 = data
  i3090.val = i3091[0]
  i3090.name = i3091[1]
  return i3090
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i3092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i3093 = data
  i3092.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3093[0], i3092.src)
  i3092.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3093[1], i3092.dst)
  i3092.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3093[2], i3092.op)
  return i3092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i3094 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i3095 = data
  i3094.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3095[0], i3094.pass)
  i3094.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3095[1], i3094.fail)
  i3094.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3095[2], i3094.zFail)
  i3094.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3095[3], i3094.comp)
  return i3094
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i3098 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i3099 = data
  i3098.name = i3099[0]
  i3098.value = i3099[1]
  return i3098
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i3102 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i3103 = data
  var i3105 = i3103[0]
  var i3104 = []
  for(var i = 0; i < i3105.length; i += 1) {
    i3104.push( i3105[i + 0] );
  }
  i3102.keywords = i3104
  i3102.hasDiscard = !!i3103[1]
  return i3102
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i3108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i3109 = data
  i3108.passId = i3109[0]
  i3108.subShaderIndex = i3109[1]
  var i3111 = i3109[2]
  var i3110 = []
  for(var i = 0; i < i3111.length; i += 1) {
    i3110.push( i3111[i + 0] );
  }
  i3108.keywords = i3110
  i3108.vertexProgram = i3109[3]
  i3108.fragmentProgram = i3109[4]
  i3108.exportedForWebGl2 = !!i3109[5]
  i3108.readDepth = !!i3109[6]
  return i3108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i3114 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i3115 = data
  request.r(i3115[0], i3115[1], 0, i3114, 'shader')
  i3114.pass = i3115[2]
  return i3114
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i3118 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i3119 = data
  i3118.name = i3119[0]
  i3118.type = i3119[1]
  i3118.value = new pc.Vec4( i3119[2], i3119[3], i3119[4], i3119[5] )
  i3118.textureValue = i3119[6]
  i3118.shaderPropertyFlag = i3119[7]
  return i3118
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i3120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i3121 = data
  i3120.name = i3121[0]
  request.r(i3121[1], i3121[2], 0, i3120, 'texture')
  i3120.aabb = i3121[3]
  i3120.vertices = i3121[4]
  i3120.triangles = i3121[5]
  i3120.textureRect = UnityEngine.Rect.MinMaxRect(i3121[6], i3121[7], i3121[8], i3121[9])
  i3120.packedRect = UnityEngine.Rect.MinMaxRect(i3121[10], i3121[11], i3121[12], i3121[13])
  i3120.border = new pc.Vec4( i3121[14], i3121[15], i3121[16], i3121[17] )
  i3120.transparency = i3121[18]
  i3120.bounds = i3121[19]
  i3120.pixelsPerUnit = i3121[20]
  i3120.textureWidth = i3121[21]
  i3120.textureHeight = i3121[22]
  i3120.nativeSize = new pc.Vec2( i3121[23], i3121[24] )
  i3120.pivot = new pc.Vec2( i3121[25], i3121[26] )
  i3120.textureRectOffset = new pc.Vec2( i3121[27], i3121[28] )
  return i3120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i3122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i3123 = data
  i3122.name = i3123[0]
  return i3122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i3124 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i3125 = data
  i3124.name = i3125[0]
  i3124.ascent = i3125[1]
  i3124.originalLineHeight = i3125[2]
  i3124.fontSize = i3125[3]
  var i3127 = i3125[4]
  var i3126 = []
  for(var i = 0; i < i3127.length; i += 1) {
    i3126.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i3127[i + 0]) );
  }
  i3124.characterInfo = i3126
  request.r(i3125[5], i3125[6], 0, i3124, 'texture')
  i3124.originalFontSize = i3125[7]
  return i3124
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i3130 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i3131 = data
  i3130.index = i3131[0]
  i3130.advance = i3131[1]
  i3130.bearing = i3131[2]
  i3130.glyphWidth = i3131[3]
  i3130.glyphHeight = i3131[4]
  i3130.minX = i3131[5]
  i3130.maxX = i3131[6]
  i3130.minY = i3131[7]
  i3130.maxY = i3131[8]
  i3130.uvBottomLeftX = i3131[9]
  i3130.uvBottomLeftY = i3131[10]
  i3130.uvBottomRightX = i3131[11]
  i3130.uvBottomRightY = i3131[12]
  i3130.uvTopLeftX = i3131[13]
  i3130.uvTopLeftY = i3131[14]
  i3130.uvTopRightX = i3131[15]
  i3130.uvTopRightY = i3131[16]
  return i3130
}

Deserializers["UnityEngine.Rendering.VolumeProfile"] = function (request, data, root) {
  var i3132 = root || request.c( 'UnityEngine.Rendering.VolumeProfile' )
  var i3133 = data
  var i3135 = i3133[0]
  var i3134 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Rendering.VolumeComponent')))
  for(var i = 0; i < i3135.length; i += 2) {
  request.r(i3135[i + 0], i3135[i + 1], 1, i3134, '')
  }
  i3132.components = i3134
  return i3132
}

Deserializers["UnityEngine.Rendering.Universal.Tonemapping"] = function (request, data, root) {
  var i3138 = root || request.c( 'UnityEngine.Rendering.Universal.Tonemapping' )
  var i3139 = data
  i3138.mode = request.d('UnityEngine.Rendering.Universal.TonemappingModeParameter', i3139[0], i3138.mode)
  i3138.neutralHDRRangeReductionMode = request.d('UnityEngine.Rendering.Universal.NeutralRangeReductionModeParameter', i3139[1], i3138.neutralHDRRangeReductionMode)
  i3138.acesPreset = request.d('UnityEngine.Rendering.Universal.HDRACESPresetParameter', i3139[2], i3138.acesPreset)
  i3138.hueShiftAmount = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3139[3], i3138.hueShiftAmount)
  i3138.detectPaperWhite = request.d('UnityEngine.Rendering.BoolParameter', i3139[4], i3138.detectPaperWhite)
  i3138.paperWhite = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3139[5], i3138.paperWhite)
  i3138.detectBrightnessLimits = request.d('UnityEngine.Rendering.BoolParameter', i3139[6], i3138.detectBrightnessLimits)
  i3138.minNits = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3139[7], i3138.minNits)
  i3138.maxNits = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3139[8], i3138.maxNits)
  i3138.active = !!i3139[9]
  return i3138
}

Deserializers["UnityEngine.Rendering.Universal.TonemappingModeParameter"] = function (request, data, root) {
  var i3140 = root || request.c( 'UnityEngine.Rendering.Universal.TonemappingModeParameter' )
  var i3141 = data
  i3140.m_Value = i3141[0]
  i3140.m_OverrideState = !!i3141[1]
  return i3140
}

Deserializers["UnityEngine.Rendering.Universal.NeutralRangeReductionModeParameter"] = function (request, data, root) {
  var i3142 = root || request.c( 'UnityEngine.Rendering.Universal.NeutralRangeReductionModeParameter' )
  var i3143 = data
  i3142.m_Value = i3143[0]
  i3142.m_OverrideState = !!i3143[1]
  return i3142
}

Deserializers["UnityEngine.Rendering.Universal.HDRACESPresetParameter"] = function (request, data, root) {
  var i3144 = root || request.c( 'UnityEngine.Rendering.Universal.HDRACESPresetParameter' )
  var i3145 = data
  i3144.m_Value = i3145[0]
  i3144.m_OverrideState = !!i3145[1]
  return i3144
}

Deserializers["UnityEngine.Rendering.ClampedFloatParameter"] = function (request, data, root) {
  var i3146 = root || request.c( 'UnityEngine.Rendering.ClampedFloatParameter' )
  var i3147 = data
  i3146.m_Value = i3147[0]
  i3146.m_OverrideState = !!i3147[1]
  return i3146
}

Deserializers["UnityEngine.Rendering.BoolParameter"] = function (request, data, root) {
  var i3148 = root || request.c( 'UnityEngine.Rendering.BoolParameter' )
  var i3149 = data
  i3148.m_Value = !!i3149[0]
  i3148.m_OverrideState = !!i3149[1]
  return i3148
}

Deserializers["UnityEngine.Rendering.Universal.Bloom"] = function (request, data, root) {
  var i3150 = root || request.c( 'UnityEngine.Rendering.Universal.Bloom' )
  var i3151 = data
  i3150.skipIterations = request.d('UnityEngine.Rendering.ClampedIntParameter', i3151[0], i3150.skipIterations)
  i3150.threshold = request.d('UnityEngine.Rendering.MinFloatParameter', i3151[1], i3150.threshold)
  i3150.intensity = request.d('UnityEngine.Rendering.MinFloatParameter', i3151[2], i3150.intensity)
  i3150.scatter = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3151[3], i3150.scatter)
  i3150.clamp = request.d('UnityEngine.Rendering.MinFloatParameter', i3151[4], i3150.clamp)
  i3150.tint = request.d('UnityEngine.Rendering.ColorParameter', i3151[5], i3150.tint)
  i3150.highQualityFiltering = request.d('UnityEngine.Rendering.BoolParameter', i3151[6], i3150.highQualityFiltering)
  i3150.downscale = request.d('UnityEngine.Rendering.Universal.DownscaleParameter', i3151[7], i3150.downscale)
  i3150.maxIterations = request.d('UnityEngine.Rendering.ClampedIntParameter', i3151[8], i3150.maxIterations)
  i3150.dirtTexture = request.d('UnityEngine.Rendering.TextureParameter', i3151[9], i3150.dirtTexture)
  i3150.dirtIntensity = request.d('UnityEngine.Rendering.MinFloatParameter', i3151[10], i3150.dirtIntensity)
  i3150.active = !!i3151[11]
  return i3150
}

Deserializers["UnityEngine.Rendering.ClampedIntParameter"] = function (request, data, root) {
  var i3152 = root || request.c( 'UnityEngine.Rendering.ClampedIntParameter' )
  var i3153 = data
  i3152.m_Value = i3153[0]
  i3152.m_OverrideState = !!i3153[1]
  return i3152
}

Deserializers["UnityEngine.Rendering.MinFloatParameter"] = function (request, data, root) {
  var i3154 = root || request.c( 'UnityEngine.Rendering.MinFloatParameter' )
  var i3155 = data
  i3154.m_Value = i3155[0]
  i3154.m_OverrideState = !!i3155[1]
  return i3154
}

Deserializers["UnityEngine.Rendering.ColorParameter"] = function (request, data, root) {
  var i3156 = root || request.c( 'UnityEngine.Rendering.ColorParameter' )
  var i3157 = data
  i3156.m_Value = new pc.Color(i3157[0], i3157[1], i3157[2], i3157[3])
  i3156.m_OverrideState = !!i3157[4]
  return i3156
}

Deserializers["UnityEngine.Rendering.Universal.DownscaleParameter"] = function (request, data, root) {
  var i3158 = root || request.c( 'UnityEngine.Rendering.Universal.DownscaleParameter' )
  var i3159 = data
  i3158.m_Value = i3159[0]
  i3158.m_OverrideState = !!i3159[1]
  return i3158
}

Deserializers["UnityEngine.Rendering.TextureParameter"] = function (request, data, root) {
  var i3160 = root || request.c( 'UnityEngine.Rendering.TextureParameter' )
  var i3161 = data
  i3160.dimension = i3161[0]
  request.r(i3161[1], i3161[2], 0, i3160, 'm_Value')
  i3160.m_OverrideState = !!i3161[3]
  return i3160
}

Deserializers["UnityEngine.Rendering.Universal.MotionBlur"] = function (request, data, root) {
  var i3162 = root || request.c( 'UnityEngine.Rendering.Universal.MotionBlur' )
  var i3163 = data
  i3162.mode = request.d('UnityEngine.Rendering.Universal.MotionBlurModeParameter', i3163[0], i3162.mode)
  i3162.quality = request.d('UnityEngine.Rendering.Universal.MotionBlurQualityParameter', i3163[1], i3162.quality)
  i3162.intensity = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3163[2], i3162.intensity)
  i3162.clamp = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3163[3], i3162.clamp)
  i3162.active = !!i3163[4]
  return i3162
}

Deserializers["UnityEngine.Rendering.Universal.MotionBlurModeParameter"] = function (request, data, root) {
  var i3164 = root || request.c( 'UnityEngine.Rendering.Universal.MotionBlurModeParameter' )
  var i3165 = data
  i3164.m_Value = i3165[0]
  i3164.m_OverrideState = !!i3165[1]
  return i3164
}

Deserializers["UnityEngine.Rendering.Universal.MotionBlurQualityParameter"] = function (request, data, root) {
  var i3166 = root || request.c( 'UnityEngine.Rendering.Universal.MotionBlurQualityParameter' )
  var i3167 = data
  i3166.m_Value = i3167[0]
  i3166.m_OverrideState = !!i3167[1]
  return i3166
}

Deserializers["UnityEngine.Rendering.Universal.Vignette"] = function (request, data, root) {
  var i3168 = root || request.c( 'UnityEngine.Rendering.Universal.Vignette' )
  var i3169 = data
  i3168.color = request.d('UnityEngine.Rendering.ColorParameter', i3169[0], i3168.color)
  i3168.center = request.d('UnityEngine.Rendering.Vector2Parameter', i3169[1], i3168.center)
  i3168.intensity = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3169[2], i3168.intensity)
  i3168.smoothness = request.d('UnityEngine.Rendering.ClampedFloatParameter', i3169[3], i3168.smoothness)
  i3168.rounded = request.d('UnityEngine.Rendering.BoolParameter', i3169[4], i3168.rounded)
  i3168.active = !!i3169[5]
  return i3168
}

Deserializers["UnityEngine.Rendering.Vector2Parameter"] = function (request, data, root) {
  var i3170 = root || request.c( 'UnityEngine.Rendering.Vector2Parameter' )
  var i3171 = data
  i3170.m_Value = new pc.Vec2( i3171[0], i3171[1] )
  i3170.m_OverrideState = !!i3171[2]
  return i3170
}

Deserializers["CEBB.Playable.DecorItem"] = function (request, data, root) {
  var i3172 = root || request.c( 'CEBB.Playable.DecorItem' )
  var i3173 = data
  i3172.itemId = i3173[0]
  i3172.displayName = i3173[1]
  request.r(i3173[2], i3173[3], 0, i3172, 'prefab')
  request.r(i3173[4], i3173[5], 0, i3172, 'icon')
  i3172.mount = i3173[6]
  i3172.walkableSurface = !!i3173[7]
  i3172.topSurface = !!i3173[8]
  i3172.quantity = i3173[9]
  i3172.boundsSize = new pc.Vec3( i3173[10], i3173[11], i3173[12] )
  return i3172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i3174 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i3175 = data
  var i3177 = i3175[0]
  var i3176 = []
  for(var i = 0; i < i3177.length; i += 1) {
    i3176.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i3177[i + 0]) );
  }
  i3174.files = i3176
  i3174.componentToPrefabIds = i3175[1]
  return i3174
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i3180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i3181 = data
  i3180.path = i3181[0]
  request.r(i3181[1], i3181[2], 0, i3180, 'unityObject')
  return i3180
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i3182 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i3183 = data
  var i3185 = i3183[0]
  var i3184 = []
  for(var i = 0; i < i3185.length; i += 1) {
    i3184.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i3185[i + 0]) );
  }
  i3182.scriptsExecutionOrder = i3184
  var i3187 = i3183[1]
  var i3186 = []
  for(var i = 0; i < i3187.length; i += 1) {
    i3186.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i3187[i + 0]) );
  }
  i3182.sortingLayers = i3186
  var i3189 = i3183[2]
  var i3188 = []
  for(var i = 0; i < i3189.length; i += 1) {
    i3188.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i3189[i + 0]) );
  }
  i3182.cullingLayers = i3188
  i3182.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i3183[3], i3182.timeSettings)
  i3182.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i3183[4], i3182.physicsSettings)
  i3182.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i3183[5], i3182.physics2DSettings)
  i3182.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i3183[6], i3182.qualitySettings)
  i3182.enableRealtimeShadows = !!i3183[7]
  i3182.enableAutoInstancing = !!i3183[8]
  i3182.enableStaticBatching = !!i3183[9]
  i3182.enableDynamicBatching = !!i3183[10]
  i3182.usePreservativeDynamicBatching = !!i3183[11]
  i3182.lightmapEncodingQuality = i3183[12]
  i3182.desiredColorSpace = i3183[13]
  var i3191 = i3183[14]
  var i3190 = []
  for(var i = 0; i < i3191.length; i += 1) {
    i3190.push( i3191[i + 0] );
  }
  i3182.allTags = i3190
  return i3182
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i3194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i3195 = data
  i3194.name = i3195[0]
  i3194.value = i3195[1]
  return i3194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i3198 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i3199 = data
  i3198.id = i3199[0]
  i3198.name = i3199[1]
  i3198.value = i3199[2]
  return i3198
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i3202 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i3203 = data
  i3202.id = i3203[0]
  i3202.name = i3203[1]
  return i3202
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i3204 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i3205 = data
  i3204.fixedDeltaTime = i3205[0]
  i3204.maximumDeltaTime = i3205[1]
  i3204.timeScale = i3205[2]
  i3204.maximumParticleTimestep = i3205[3]
  return i3204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i3206 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i3207 = data
  i3206.gravity = new pc.Vec3( i3207[0], i3207[1], i3207[2] )
  i3206.defaultSolverIterations = i3207[3]
  i3206.bounceThreshold = i3207[4]
  i3206.autoSyncTransforms = !!i3207[5]
  i3206.autoSimulation = !!i3207[6]
  var i3209 = i3207[7]
  var i3208 = []
  for(var i = 0; i < i3209.length; i += 1) {
    i3208.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i3209[i + 0]) );
  }
  i3206.collisionMatrix = i3208
  return i3206
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i3212 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i3213 = data
  i3212.enabled = !!i3213[0]
  i3212.layerId = i3213[1]
  i3212.otherLayerId = i3213[2]
  return i3212
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i3214 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i3215 = data
  request.r(i3215[0], i3215[1], 0, i3214, 'material')
  i3214.gravity = new pc.Vec2( i3215[2], i3215[3] )
  i3214.positionIterations = i3215[4]
  i3214.velocityIterations = i3215[5]
  i3214.velocityThreshold = i3215[6]
  i3214.maxLinearCorrection = i3215[7]
  i3214.maxAngularCorrection = i3215[8]
  i3214.maxTranslationSpeed = i3215[9]
  i3214.maxRotationSpeed = i3215[10]
  i3214.baumgarteScale = i3215[11]
  i3214.baumgarteTOIScale = i3215[12]
  i3214.timeToSleep = i3215[13]
  i3214.linearSleepTolerance = i3215[14]
  i3214.angularSleepTolerance = i3215[15]
  i3214.defaultContactOffset = i3215[16]
  i3214.autoSimulation = !!i3215[17]
  i3214.queriesHitTriggers = !!i3215[18]
  i3214.queriesStartInColliders = !!i3215[19]
  i3214.callbacksOnDisable = !!i3215[20]
  i3214.reuseCollisionCallbacks = !!i3215[21]
  i3214.autoSyncTransforms = !!i3215[22]
  var i3217 = i3215[23]
  var i3216 = []
  for(var i = 0; i < i3217.length; i += 1) {
    i3216.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i3217[i + 0]) );
  }
  i3214.collisionMatrix = i3216
  return i3214
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i3220 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i3221 = data
  i3220.enabled = !!i3221[0]
  i3220.layerId = i3221[1]
  i3220.otherLayerId = i3221[2]
  return i3220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i3222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i3223 = data
  var i3225 = i3223[0]
  var i3224 = []
  for(var i = 0; i < i3225.length; i += 1) {
    i3224.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i3225[i + 0]) );
  }
  i3222.qualityLevels = i3224
  var i3227 = i3223[1]
  var i3226 = []
  for(var i = 0; i < i3227.length; i += 1) {
    i3226.push( i3227[i + 0] );
  }
  i3222.names = i3226
  i3222.shadows = i3223[2]
  i3222.anisotropicFiltering = i3223[3]
  i3222.antiAliasing = i3223[4]
  i3222.lodBias = i3223[5]
  i3222.shadowCascades = i3223[6]
  i3222.shadowDistance = i3223[7]
  i3222.shadowmaskMode = i3223[8]
  i3222.shadowProjection = i3223[9]
  i3222.shadowResolution = i3223[10]
  i3222.softParticles = !!i3223[11]
  i3222.softVegetation = !!i3223[12]
  i3222.activeColorSpace = i3223[13]
  i3222.desiredColorSpace = i3223[14]
  i3222.masterTextureLimit = i3223[15]
  i3222.maxQueuedFrames = i3223[16]
  i3222.particleRaycastBudget = i3223[17]
  i3222.pixelLightCount = i3223[18]
  i3222.realtimeReflectionProbes = !!i3223[19]
  i3222.shadowCascade2Split = i3223[20]
  i3222.shadowCascade4Split = new pc.Vec3( i3223[21], i3223[22], i3223[23] )
  i3222.streamingMipmapsActive = !!i3223[24]
  i3222.vSyncCount = i3223[25]
  i3222.asyncUploadBufferSize = i3223[26]
  i3222.asyncUploadTimeSlice = i3223[27]
  i3222.billboardsFaceCameraPosition = !!i3223[28]
  i3222.shadowNearPlaneOffset = i3223[29]
  i3222.streamingMipmapsMemoryBudget = i3223[30]
  i3222.maximumLODLevel = i3223[31]
  i3222.streamingMipmapsAddAllCameras = !!i3223[32]
  i3222.streamingMipmapsMaxLevelReduction = i3223[33]
  i3222.streamingMipmapsRenderersPerFrame = i3223[34]
  i3222.resolutionScalingFixedDPIFactor = i3223[35]
  i3222.streamingMipmapsMaxFileIORequests = i3223[36]
  i3222.currentQualityLevel = i3223[37]
  return i3222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i3232 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i3233 = data
  i3232.weight = i3233[0]
  i3232.vertices = i3233[1]
  i3232.normals = i3233[2]
  i3232.tangents = i3233[3]
  return i3232
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i3234 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i3235 = data
  request.r(i3235[0], i3235[1], 0, i3234, 'm_ObjectArgument')
  i3234.m_ObjectArgumentAssemblyTypeName = i3235[2]
  i3234.m_IntArgument = i3235[3]
  i3234.m_FloatArgument = i3235[4]
  i3234.m_StringArgument = i3235[5]
  i3234.m_BoolArgument = !!i3235[6]
  return i3234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings"] = function (request, data, root) {
  var i3236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings' )
  var i3237 = data
  i3236.Event = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3237[0], i3236.Event)
  i3236.filterSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings', i3237[1], i3236.filterSettings)
  i3236.overrideMaterialId = i3237[2]
  i3236.overrideMaterialPassIndex = i3237[3]
  i3236.overrideShaderId = i3237[4]
  i3236.overrideShaderPassIndex = i3237[5]
  i3236.overrideMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3237[6], i3236.overrideMode)
  i3236.overrideDepthState = !!i3237[7]
  i3236.depthCompareFunction = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3237[8], i3236.depthCompareFunction)
  i3236.enableWrite = !!i3237[9]
  i3236.stencilSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.StencilStateData', i3237[10], i3236.stencilSettings)
  i3236.cameraSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings', i3237[11], i3236.cameraSettings)
  return i3236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.EnumDescription"] = function (request, data, root) {
  var i3238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.EnumDescription' )
  var i3239 = data
  i3238.Value = i3239[0]
  return i3238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings"] = function (request, data, root) {
  var i3240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings' )
  var i3241 = data
  i3240.RenderQueueType = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3241[0], i3240.RenderQueueType)
  i3240.LayerMask = i3241[1]
  var i3243 = i3241[2]
  var i3242 = []
  for(var i = 0; i < i3243.length; i += 1) {
    i3242.push( i3243[i + 0] );
  }
  i3240.PassNames = i3242
  return i3240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.StencilStateData"] = function (request, data, root) {
  var i3244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.StencilStateData' )
  var i3245 = data
  i3244.overrideStencilState = !!i3245[0]
  i3244.stencilReference = i3245[1]
  i3244.stencilCompareFunctionValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3245[2], i3244.stencilCompareFunctionValue)
  i3244.passOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3245[3], i3244.passOperationValue)
  i3244.failOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3245[4], i3244.failOperationValue)
  i3244.zFailOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i3245[5], i3244.zFailOperationValue)
  return i3244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings"] = function (request, data, root) {
  var i3246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings' )
  var i3247 = data
  i3246.overrideCamera = !!i3247[0]
  i3246.restoreCamera = !!i3247[1]
  i3246.offset = new pc.Vec4( i3247[2], i3247[3], i3247[4], i3247[5] )
  i3246.cameraFieldOfView = i3247[6]
  return i3246
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset":{"AdditionalLightsRenderingMode":0,"LightRenderingMode":1,"MainLightRenderingModeValue":2,"SupportsMainLightShadows":3,"MixedLightingSupported":4,"MainLightShadowmapResolutionValue":5,"SupportsSoftShadows":6,"SoftShadowQualityValue":7,"ShadowDistance":8,"ShadowCascadeCount":9,"Cascade2Split":10,"Cascade3Split":11,"Cascade4Split":13,"CascadeBorder":16,"ShadowDepthBias":17,"ShadowNormalBias":18,"RequireDepthTexture":19,"RequireOpaqueTexture":20,"scriptableRendererData":21},"Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode":{"Disabled":0,"PerVertex":1,"PerPixel":2},"Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData":{"opaqueLayerMask":0,"transparentLayerMask":1,"RenderObjectsFeatures":2,"name":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects":{"settings":0,"name":1,"typeName":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings":{"Event":0,"filterSettings":1,"overrideMaterialId":2,"overrideMaterialPassIndex":3,"overrideShaderId":4,"overrideShaderPassIndex":5,"overrideMode":6,"overrideDepthState":7,"depthCompareFunction":8,"enableWrite":9,"stencilSettings":10,"cameraSettings":11},"Luna.Unity.DTO.UnityEngine.Assets.EnumDescription":{"Value":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings":{"RenderQueueType":0,"LayerMask":1,"PassNames":2},"Luna.Unity.DTO.UnityEngine.Assets.StencilStateData":{"overrideStencilState":0,"stencilReference":1,"stencilCompareFunctionValue":2,"passOperationValue":3,"failOperationValue":4,"zFailOperationValue":5},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings":{"overrideCamera":0,"restoreCamera":1,"offset":2,"cameraFieldOfView":6}}

Deserializers.requiredComponents = {"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[56],"57":[7],"58":[59],"60":[59],"61":[59],"62":[59],"63":[59],"64":[59],"65":[66],"67":[66],"68":[66],"69":[66],"70":[66],"71":[66],"72":[66],"73":[66],"74":[66],"75":[66],"76":[66],"77":[66],"78":[66],"79":[7],"80":[5],"81":[82],"83":[82],"27":[22],"84":[22],"85":[7],"10":[7],"12":[11],"86":[22],"87":[32,22],"88":[5],"89":[32,22],"90":[22],"91":[22],"92":[5,22],"93":[22,32],"94":[95],"96":[95],"97":[95],"98":[18],"99":[22],"100":[22],"31":[27],"19":[32,22],"101":[22],"30":[27],"102":[22],"28":[22],"103":[22],"104":[22],"37":[22],"105":[22],"106":[22],"107":[22],"108":[22],"109":[32,22],"110":[22],"111":[22],"112":[22],"113":[22],"20":[32,22],"114":[22],"115":[39],"116":[39],"40":[39],"117":[39],"118":[7],"119":[7]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","UnityEngine.Rendering.Volume","UnityEngine.Rendering.VolumeProfile","UnityEngine.AudioSource","CEBB.Playable.LivingRoomPlayable","CEBB.Playable.DecorItem","UnityEngine.UI.Button","UnityEngine.UI.Image","UnityEngine.UI.Text","UnityEngine.GameObject","UnityEngine.RectTransform","CEBB.Playable.LivingRoomPlayer","CEBB.Playable.LunaController","UnityEngine.AudioClip","CEBB.Playable.BedroomLayout","UnityEngine.Canvas","UnityEngine.UI.GridLayoutGroup","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","CEBB.Playable.LivingRoomLookSurface","UnityEngine.Font","UnityEngine.UI.Outline","UnityEngine.Sprite","UnityEngine.UI.LayoutElement","CEBB.Playable.RoomMovePad","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.BoxCollider","CEBB.Playable.PlacementSurface","UnityEngine.Cubemap","UnityEngine.Rendering.Universal.Tonemapping","UnityEngine.Rendering.Universal.Bloom","UnityEngine.Rendering.Universal.MotionBlur","UnityEngine.Rendering.Universal.Vignette","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Rendering.UI.UIFoldout","UnityEngine.Rendering.Universal.PixelPerfectCamera","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.Purchasing.IAPButton","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CEBB_V16";

Deserializers.lunaInitializationTime = "10/28/2026 09:40:07";

Deserializers.lunaDaysRunning = "4.8";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_DatDV_CEBB_V16_NgocNDL";

Deserializers.lunaAppID = "35800";

Deserializers.projectId = "3c72c65a16f0acb438eed22b8b16c24a";

Deserializers.packagesInfo = "com.unity.render-pipelines.universal: 17.0.4\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1760";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3726";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system, reflection, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "Unity Technologies";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.UnityTechnologies.com.unity.template.urpblank";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "eaefe6e8-f575-4c83-8181-eb5c514a0a87";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Purchasing","CodelessIAPStoreListener","InitializeCodelessPurchasingOnLoad"],["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","Purchasing","Registration","IapCoreInitializeCallback","Register"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Unity","Services","Core","Editor","StatusInitializer","InitializeOnLoad"],["Ua2CoreInitializeCallback","Register"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"],["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

