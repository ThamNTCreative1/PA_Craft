var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i720 = root || request.c( 'UnityEngine.JointSpring' )
  var i721 = data
  i720.spring = i721[0]
  i720.damper = i721[1]
  i720.targetPosition = i721[2]
  return i720
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i722 = root || request.c( 'UnityEngine.JointMotor' )
  var i723 = data
  i722.m_TargetVelocity = i723[0]
  i722.m_Force = i723[1]
  i722.m_FreeSpin = i723[2]
  return i722
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i724 = root || request.c( 'UnityEngine.JointLimits' )
  var i725 = data
  i724.m_Min = i725[0]
  i724.m_Max = i725[1]
  i724.m_Bounciness = i725[2]
  i724.m_BounceMinVelocity = i725[3]
  i724.m_ContactDistance = i725[4]
  i724.minBounce = i725[5]
  i724.maxBounce = i725[6]
  return i724
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i726 = root || request.c( 'UnityEngine.JointDrive' )
  var i727 = data
  i726.m_PositionSpring = i727[0]
  i726.m_PositionDamper = i727[1]
  i726.m_MaximumForce = i727[2]
  i726.m_UseAcceleration = i727[3]
  return i726
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i728 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i729 = data
  i728.m_Spring = i729[0]
  i728.m_Damper = i729[1]
  return i728
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i730 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i731 = data
  i730.m_Limit = i731[0]
  i730.m_Bounciness = i731[1]
  i730.m_ContactDistance = i731[2]
  return i730
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i732 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i733 = data
  i732.m_ExtremumSlip = i733[0]
  i732.m_ExtremumValue = i733[1]
  i732.m_AsymptoteSlip = i733[2]
  i732.m_AsymptoteValue = i733[3]
  i732.m_Stiffness = i733[4]
  return i732
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i734 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i735 = data
  i734.m_LowerAngle = i735[0]
  i734.m_UpperAngle = i735[1]
  return i734
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i736 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i737 = data
  i736.m_MotorSpeed = i737[0]
  i736.m_MaximumMotorTorque = i737[1]
  return i736
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i738 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i739 = data
  i738.m_DampingRatio = i739[0]
  i738.m_Frequency = i739[1]
  i738.m_Angle = i739[2]
  return i738
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i740 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i741 = data
  i740.m_LowerTranslation = i741[0]
  i740.m_UpperTranslation = i741[1]
  return i740
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i742 = root || new pc.UnityMaterial()
  var i743 = data
  i742.name = i743[0]
  request.r(i743[1], i743[2], 0, i742, 'shader')
  i742.renderQueue = i743[3]
  i742.enableInstancing = !!i743[4]
  var i745 = i743[5]
  var i744 = []
  for(var i = 0; i < i745.length; i += 1) {
    i744.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i745[i + 0]) );
  }
  i742.floatParameters = i744
  var i747 = i743[6]
  var i746 = []
  for(var i = 0; i < i747.length; i += 1) {
    i746.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i747[i + 0]) );
  }
  i742.colorParameters = i746
  var i749 = i743[7]
  var i748 = []
  for(var i = 0; i < i749.length; i += 1) {
    i748.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i749[i + 0]) );
  }
  i742.vectorParameters = i748
  var i751 = i743[8]
  var i750 = []
  for(var i = 0; i < i751.length; i += 1) {
    i750.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i751[i + 0]) );
  }
  i742.textureParameters = i750
  var i753 = i743[9]
  var i752 = []
  for(var i = 0; i < i753.length; i += 1) {
    i752.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i753[i + 0]) );
  }
  i742.materialFlags = i752
  return i742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i756 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i757 = data
  i756.name = i757[0]
  i756.value = i757[1]
  return i756
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i760 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i761 = data
  i760.name = i761[0]
  i760.value = new pc.Color(i761[1], i761[2], i761[3], i761[4])
  return i760
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i764 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i765 = data
  i764.name = i765[0]
  i764.value = new pc.Vec4( i765[1], i765[2], i765[3], i765[4] )
  return i764
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i769 = data
  i768.name = i769[0]
  request.r(i769[1], i769[2], 0, i768, 'value')
  return i768
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i773 = data
  i772.name = i773[0]
  i772.enabled = !!i773[1]
  return i772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i775 = data
  i774.name = i775[0]
  i774.width = i775[1]
  i774.height = i775[2]
  i774.mipmapCount = i775[3]
  i774.anisoLevel = i775[4]
  i774.filterMode = i775[5]
  i774.hdr = !!i775[6]
  i774.format = i775[7]
  i774.wrapMode = i775[8]
  i774.alphaIsTransparency = !!i775[9]
  i774.alphaSource = i775[10]
  i774.graphicsFormat = i775[11]
  i774.sRGBTexture = !!i775[12]
  i774.desiredColorSpace = i775[13]
  i774.wrapU = i775[14]
  i774.wrapV = i775[15]
  return i774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i777 = data
  i776.name = i777[0]
  i776.halfPrecision = !!i777[1]
  i776.useSimplification = !!i777[2]
  i776.useUInt32IndexFormat = !!i777[3]
  i776.vertexCount = i777[4]
  i776.aabb = i777[5]
  var i779 = i777[6]
  var i778 = []
  for(var i = 0; i < i779.length; i += 1) {
    i778.push( !!i779[i + 0] );
  }
  i776.streams = i778
  i776.vertices = i777[7]
  var i781 = i777[8]
  var i780 = []
  for(var i = 0; i < i781.length; i += 1) {
    i780.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i781[i + 0]) );
  }
  i776.subMeshes = i780
  var i783 = i777[9]
  var i782 = []
  for(var i = 0; i < i783.length; i += 16) {
    i782.push( new pc.Mat4().setData(i783[i + 0], i783[i + 1], i783[i + 2], i783[i + 3],  i783[i + 4], i783[i + 5], i783[i + 6], i783[i + 7],  i783[i + 8], i783[i + 9], i783[i + 10], i783[i + 11],  i783[i + 12], i783[i + 13], i783[i + 14], i783[i + 15]) );
  }
  i776.bindposes = i782
  var i785 = i777[10]
  var i784 = []
  for(var i = 0; i < i785.length; i += 1) {
    i784.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i785[i + 0]) );
  }
  i776.blendShapes = i784
  return i776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i791 = data
  i790.triangles = i791[0]
  return i790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i797 = data
  i796.name = i797[0]
  var i799 = i797[1]
  var i798 = []
  for(var i = 0; i < i799.length; i += 1) {
    i798.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i799[i + 0]) );
  }
  i796.frames = i798
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i801 = data
  i800.position = new pc.Vec3( i801[0], i801[1], i801[2] )
  i800.scale = new pc.Vec3( i801[3], i801[4], i801[5] )
  i800.rotation = new pc.Quat(i801[6], i801[7], i801[8], i801[9])
  return i800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i803 = data
  request.r(i803[0], i803[1], 0, i802, 'sharedMesh')
  return i802
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i805 = data
  request.r(i805[0], i805[1], 0, i804, 'additionalVertexStreams')
  i804.enabled = !!i805[2]
  request.r(i805[3], i805[4], 0, i804, 'sharedMaterial')
  var i807 = i805[5]
  var i806 = []
  for(var i = 0; i < i807.length; i += 2) {
  request.r(i807[i + 0], i807[i + 1], 2, i806, '')
  }
  i804.sharedMaterials = i806
  i804.receiveShadows = !!i805[6]
  i804.shadowCastingMode = i805[7]
  i804.sortingLayerID = i805[8]
  i804.sortingOrder = i805[9]
  i804.lightmapIndex = i805[10]
  i804.lightmapSceneIndex = i805[11]
  i804.lightmapScaleOffset = new pc.Vec4( i805[12], i805[13], i805[14], i805[15] )
  i804.lightProbeUsage = i805[16]
  i804.reflectionProbeUsage = i805[17]
  return i804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i811 = data
  i810.name = i811[0]
  i810.tagId = i811[1]
  i810.enabled = !!i811[2]
  i810.isStatic = !!i811[3]
  i810.layer = i811[4]
  return i810
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i813 = data
  i812.center = new pc.Vec3( i813[0], i813[1], i813[2] )
  i812.size = new pc.Vec3( i813[3], i813[4], i813[5] )
  i812.enabled = !!i813[6]
  i812.isTrigger = !!i813[7]
  request.r(i813[8], i813[9], 0, i812, 'material')
  return i812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i815 = data
  i814.center = new pc.Vec3( i815[0], i815[1], i815[2] )
  i814.radius = i815[3]
  i814.enabled = !!i815[4]
  i814.isTrigger = !!i815[5]
  request.r(i815[6], i815[7], 0, i814, 'material')
  return i814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i817 = data
  i816.mass = i817[0]
  i816.drag = i817[1]
  i816.angularDrag = i817[2]
  i816.useGravity = !!i817[3]
  i816.isKinematic = !!i817[4]
  i816.constraints = i817[5]
  i816.maxAngularVelocity = i817[6]
  i816.collisionDetectionMode = i817[7]
  i816.interpolation = i817[8]
  return i816
}

Deserializers["Playable.PaintballNpcMotor"] = function (request, data, root) {
  var i818 = root || request.c( 'Playable.PaintballNpcMotor' )
  var i819 = data
  request.r(i819[0], i819[1], 0, i818, '_body')
  request.r(i819[2], i819[3], 0, i818, '_capsule')
  var i821 = i819[4]
  var i820 = []
  for(var i = 0; i < i821.length; i += 2) {
  request.r(i821[i + 0], i821[i + 1], 2, i820, '')
  }
  i818._route = i820
  i818._worldMask = UnityEngine.LayerMask.FromIntegerValue( i819[5] )
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i825 = data
  request.r(i825[0], i825[1], 0, i824, 'animatorController')
  request.r(i825[2], i825[3], 0, i824, 'avatar')
  i824.updateMode = i825[4]
  i824.hasTransformHierarchy = !!i825[5]
  i824.applyRootMotion = !!i825[6]
  var i827 = i825[7]
  var i826 = []
  for(var i = 0; i < i827.length; i += 2) {
  request.r(i827[i + 0], i827[i + 1], 2, i826, '')
  }
  i824.humanBones = i826
  i824.enabled = !!i825[8]
  return i824
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i829 = data
  i828.center = new pc.Vec3( i829[0], i829[1], i829[2] )
  i828.radius = i829[3]
  i828.height = i829[4]
  i828.direction = i829[5]
  i828.enabled = !!i829[6]
  i828.isTrigger = !!i829[7]
  request.r(i829[8], i829[9], 0, i828, 'material')
  return i828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i831 = data
  request.r(i831[0], i831[1], 0, i830, 'clip')
  request.r(i831[2], i831[3], 0, i830, 'outputAudioMixerGroup')
  i830.playOnAwake = !!i831[4]
  i830.loop = !!i831[5]
  i830.time = i831[6]
  i830.volume = i831[7]
  i830.pitch = i831[8]
  i830.enabled = !!i831[9]
  return i830
}

Deserializers["Playable.MonsterController"] = function (request, data, root) {
  var i832 = root || request.c( 'Playable.MonsterController' )
  var i833 = data
  request.r(i833[0], i833[1], 0, i832, '_motor')
  request.r(i833[2], i833[3], 0, i832, '_animator')
  request.r(i833[4], i833[5], 0, i832, '_healthBar')
  request.r(i833[6], i833[7], 0, i832, '_collider')
  request.r(i833[8], i833[9], 0, i832, '_aimPoint')
  request.r(i833[10], i833[11], 0, i832, '_audio')
  request.r(i833[12], i833[13], 0, i832, '_attackSound')
  request.r(i833[14], i833[15], 0, i832, '_hitSound')
  request.r(i833[16], i833[17], 0, i832, '_deathSound')
  i832._maxHealth = i833[18]
  i832._moveSpeed = i833[19]
  i832._attackRange = i833[20]
  i832._attackDamage = i833[21]
  i832._attackHitTime = i833[22]
  i832._attackDuration = i833[23]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i835 = data
  i834.pivot = new pc.Vec2( i835[0], i835[1] )
  i834.anchorMin = new pc.Vec2( i835[2], i835[3] )
  i834.anchorMax = new pc.Vec2( i835[4], i835[5] )
  i834.sizeDelta = new pc.Vec2( i835[6], i835[7] )
  i834.anchoredPosition3D = new pc.Vec3( i835[8], i835[9], i835[10] )
  i834.rotation = new pc.Quat(i835[11], i835[12], i835[13], i835[14])
  i834.scale = new pc.Vec3( i835[15], i835[16], i835[17] )
  return i834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i837 = data
  i836.planeDistance = i837[0]
  i836.referencePixelsPerUnit = i837[1]
  i836.isFallbackOverlay = !!i837[2]
  i836.renderMode = i837[3]
  i836.renderOrder = i837[4]
  i836.sortingLayerName = i837[5]
  i836.sortingOrder = i837[6]
  i836.scaleFactor = i837[7]
  request.r(i837[8], i837[9], 0, i836, 'worldCamera')
  i836.overrideSorting = !!i837[10]
  i836.pixelPerfect = !!i837[11]
  i836.targetDisplay = i837[12]
  i836.overridePixelPerfect = !!i837[13]
  i836.enabled = !!i837[14]
  return i836
}

Deserializers["Playable.WorldHealthBar"] = function (request, data, root) {
  var i838 = root || request.c( 'Playable.WorldHealthBar' )
  var i839 = data
  request.r(i839[0], i839[1], 0, i838, '_fill')
  request.r(i839[2], i839[3], 0, i838, '_camera')
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i841 = data
  i840.cullTransparentMesh = !!i841[0]
  return i840
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.UI.Image' )
  var i843 = data
  request.r(i843[0], i843[1], 0, i842, 'm_Sprite')
  i842.m_Type = i843[2]
  i842.m_PreserveAspect = !!i843[3]
  i842.m_FillCenter = !!i843[4]
  i842.m_FillMethod = i843[5]
  i842.m_FillAmount = i843[6]
  i842.m_FillClockwise = !!i843[7]
  i842.m_FillOrigin = i843[8]
  i842.m_UseSpriteMesh = !!i843[9]
  i842.m_PixelsPerUnitMultiplier = i843[10]
  request.r(i843[11], i843[12], 0, i842, 'm_Material')
  i842.m_Maskable = !!i843[13]
  i842.m_Color = new pc.Color(i843[14], i843[15], i843[16], i843[17])
  i842.m_RaycastTarget = !!i843[18]
  i842.m_RaycastPadding = new pc.Vec4( i843[19], i843[20], i843[21], i843[22] )
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i845 = data
  i844.name = i845[0]
  i844.atlasId = i845[1]
  i844.mipmapCount = i845[2]
  i844.hdr = !!i845[3]
  i844.size = i845[4]
  i844.anisoLevel = i845[5]
  i844.filterMode = i845[6]
  var i847 = i845[7]
  var i846 = []
  for(var i = 0; i < i847.length; i += 4) {
    i846.push( UnityEngine.Rect.MinMaxRect(i847[i + 0], i847[i + 1], i847[i + 2], i847[i + 3]) );
  }
  i844.rects = i846
  i844.wrapU = i845[8]
  i844.wrapV = i845[9]
  return i844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i851 = data
  i850.name = i851[0]
  i850.index = i851[1]
  i850.startup = !!i851[2]
  return i850
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i852 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i853 = data
  i852.m_UiScaleMode = i853[0]
  i852.m_ReferencePixelsPerUnit = i853[1]
  i852.m_ScaleFactor = i853[2]
  i852.m_ReferenceResolution = new pc.Vec2( i853[3], i853[4] )
  i852.m_ScreenMatchMode = i853[5]
  i852.m_MatchWidthOrHeight = i853[6]
  i852.m_PhysicalUnit = i853[7]
  i852.m_FallbackScreenDPI = i853[8]
  i852.m_DefaultSpriteDPI = i853[9]
  i852.m_DynamicPixelsPerUnit = i853[10]
  i852.m_PresetInfoIsWorld = !!i853[11]
  return i852
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i854 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i855 = data
  i854.m_IgnoreReversedGraphics = !!i855[0]
  i854.m_BlockingObjects = i855[1]
  i854.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i855[2] )
  return i854
}

Deserializers["Playable.ResponsiveCanvasScaler"] = function (request, data, root) {
  var i856 = root || request.c( 'Playable.ResponsiveCanvasScaler' )
  var i857 = data
  i856._referenceResolution = new pc.Vec2( i857[0], i857[1] )
  i856._portraitMatch = i857[2]
  i856._landscapeMatch = i857[3]
  i856._squareMatch = i857[4]
  i856._portraitAspectThreshold = i857[5]
  i856._landscapeAspectThreshold = i857[6]
  return i856
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i858 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i859 = data
  i858.m_AspectMode = i859[0]
  i858.m_AspectRatio = i859[1]
  return i858
}

Deserializers["Playable.SafeAreaRectTransform"] = function (request, data, root) {
  var i860 = root || request.c( 'Playable.SafeAreaRectTransform' )
  var i861 = data
  i860._applyHorizontal = !!i861[0]
  i860._applyVertical = !!i861[1]
  i860._fallbackTopInset = i861[2]
  i860._fallbackLeftInset = i861[3]
  i860._notchAspectThreshold = i861[4]
  return i860
}

Deserializers["Playable.TouchController"] = function (request, data, root) {
  var i862 = root || request.c( 'Playable.TouchController' )
  var i863 = data
  i862._fillRightHalfOfParent = !!i863[0]
  i862._dragSensitivity = i863[1]
  return i862
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i864 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i865 = data
  i864.m_hasFontAssetChanged = !!i865[0]
  request.r(i865[1], i865[2], 0, i864, 'm_baseMaterial')
  i864.m_maskOffset = new pc.Vec4( i865[3], i865[4], i865[5], i865[6] )
  i864.m_text = i865[7]
  i864.m_isRightToLeft = !!i865[8]
  request.r(i865[9], i865[10], 0, i864, 'm_fontAsset')
  request.r(i865[11], i865[12], 0, i864, 'm_sharedMaterial')
  var i867 = i865[13]
  var i866 = []
  for(var i = 0; i < i867.length; i += 2) {
  request.r(i867[i + 0], i867[i + 1], 2, i866, '')
  }
  i864.m_fontSharedMaterials = i866
  request.r(i865[14], i865[15], 0, i864, 'm_fontMaterial')
  var i869 = i865[16]
  var i868 = []
  for(var i = 0; i < i869.length; i += 2) {
  request.r(i869[i + 0], i869[i + 1], 2, i868, '')
  }
  i864.m_fontMaterials = i868
  i864.m_fontColor32 = UnityEngine.Color32.ConstructColor(i865[17], i865[18], i865[19], i865[20])
  i864.m_fontColor = new pc.Color(i865[21], i865[22], i865[23], i865[24])
  i864.m_enableVertexGradient = !!i865[25]
  i864.m_colorMode = i865[26]
  i864.m_fontColorGradient = request.d('TMPro.VertexGradient', i865[27], i864.m_fontColorGradient)
  request.r(i865[28], i865[29], 0, i864, 'm_fontColorGradientPreset')
  request.r(i865[30], i865[31], 0, i864, 'm_spriteAsset')
  i864.m_tintAllSprites = !!i865[32]
  request.r(i865[33], i865[34], 0, i864, 'm_StyleSheet')
  i864.m_TextStyleHashCode = i865[35]
  i864.m_overrideHtmlColors = !!i865[36]
  i864.m_faceColor = UnityEngine.Color32.ConstructColor(i865[37], i865[38], i865[39], i865[40])
  i864.m_fontSize = i865[41]
  i864.m_fontSizeBase = i865[42]
  i864.m_fontWeight = i865[43]
  i864.m_enableAutoSizing = !!i865[44]
  i864.m_fontSizeMin = i865[45]
  i864.m_fontSizeMax = i865[46]
  i864.m_fontStyle = i865[47]
  i864.m_HorizontalAlignment = i865[48]
  i864.m_VerticalAlignment = i865[49]
  i864.m_textAlignment = i865[50]
  i864.m_characterSpacing = i865[51]
  i864.m_wordSpacing = i865[52]
  i864.m_lineSpacing = i865[53]
  i864.m_lineSpacingMax = i865[54]
  i864.m_paragraphSpacing = i865[55]
  i864.m_charWidthMaxAdj = i865[56]
  i864.m_TextWrappingMode = i865[57]
  i864.m_wordWrappingRatios = i865[58]
  i864.m_overflowMode = i865[59]
  request.r(i865[60], i865[61], 0, i864, 'm_linkedTextComponent')
  request.r(i865[62], i865[63], 0, i864, 'parentLinkedComponent')
  i864.m_enableKerning = !!i865[64]
  var i871 = i865[65]
  var i870 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i871.length; i += 1) {
    i870.add(i871[i + 0]);
  }
  i864.m_ActiveFontFeatures = i870
  i864.m_enableExtraPadding = !!i865[66]
  i864.checkPaddingRequired = !!i865[67]
  i864.m_isRichText = !!i865[68]
  i864.m_parseCtrlCharacters = !!i865[69]
  i864.m_isOrthographic = !!i865[70]
  i864.m_isCullingEnabled = !!i865[71]
  i864.m_horizontalMapping = i865[72]
  i864.m_verticalMapping = i865[73]
  i864.m_uvLineOffset = i865[74]
  i864.m_geometrySortingOrder = i865[75]
  i864.m_IsTextObjectScaleStatic = !!i865[76]
  i864.m_VertexBufferAutoSizeReduction = !!i865[77]
  i864.m_useMaxVisibleDescender = !!i865[78]
  i864.m_pageToDisplay = i865[79]
  i864.m_margin = new pc.Vec4( i865[80], i865[81], i865[82], i865[83] )
  i864.m_isUsingLegacyAnimationComponent = !!i865[84]
  i864.m_isVolumetricText = !!i865[85]
  request.r(i865[86], i865[87], 0, i864, 'm_Material')
  i864.m_EmojiFallbackSupport = !!i865[88]
  i864.m_Maskable = !!i865[89]
  i864.m_Color = new pc.Color(i865[90], i865[91], i865[92], i865[93])
  i864.m_RaycastTarget = !!i865[94]
  i864.m_RaycastPadding = new pc.Vec4( i865[95], i865[96], i865[97], i865[98] )
  return i864
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i872 = root || request.c( 'TMPro.VertexGradient' )
  var i873 = data
  i872.topLeft = new pc.Color(i873[0], i873[1], i873[2], i873[3])
  i872.topRight = new pc.Color(i873[4], i873[5], i873[6], i873[7])
  i872.bottomLeft = new pc.Color(i873[8], i873[9], i873[10], i873[11])
  i872.bottomRight = new pc.Color(i873[12], i873[13], i873[14], i873[15])
  return i872
}

Deserializers["UltimateJoystick"] = function (request, data, root) {
  var i876 = root || request.c( 'UltimateJoystick' )
  var i877 = data
  i876.uniqueId = i877[0]
  request.r(i877[1], i877[2], 0, i876, 'joystickBase')
  request.r(i877[3], i877[4], 0, i876, 'joystick')
  i876.anchor = i877[5]
  i876.activationRange = i877[6]
  i876.customActivationRange = !!i877[7]
  i876.activationWidth = i877[8]
  i876.activationHeight = i877[9]
  i876.activationPositionHorizontal = i877[10]
  i876.activationPositionVertical = i877[11]
  i876.joystickSize = i877[12]
  i876.joystickRadius = i877[13]
  i876.positionHorizontal = i877[14]
  i876.positionVertical = i877[15]
  request.r(i877[16], i877[17], 0, i876, 'relativeTransform')
  i876.centerAngle = i877[18]
  i876.orbitDistance = i877[19]
  i876.overridePositioning = !!i877[20]
  i876.repositionConstraintMin = new pc.Vec2( i877[21], i877[22] )
  i876.repositionConstraintMax = new pc.Vec2( i877[23], i877[24] )
  i876.applyConstraintDuringOverride = !!i877[25]
  i876.saveAsPlayerPrefs = !!i877[26]
  i876.inputHandling = i877[27]
  i876.dynamicPositioning = !!i877[28]
  i876.gravity = i877[29]
  i876.extendRadius = !!i877[30]
  i876.axis = i877[31]
  i876.deadZone = i877[32]
  i876.tapDecayRate = i877[33]
  i876.transmitEventData = !!i877[34]
  i876.disableVisuals = !!i877[35]
  i876.inputTransition = !!i877[36]
  i876.transitionUntouchedDuration = i877[37]
  i876.transitionTouchedDuration = i877[38]
  i876.useFade = !!i877[39]
  i876.fadeUntouched = i877[40]
  i876.fadeTouched = i877[41]
  i876.useScale = !!i877[42]
  i876.scaleTouched = i877[43]
  i876.showHighlight = !!i877[44]
  i876.highlightColor = new pc.Color(i877[45], i877[46], i877[47], i877[48])
  request.r(i877[49], i877[50], 0, i876, 'highlightBase')
  request.r(i877[51], i877[52], 0, i876, 'highlightJoystick')
  i876.showTension = !!i877[53]
  i876.tensionColorNone = new pc.Color(i877[54], i877[55], i877[56], i877[57])
  i876.tensionColorFull = new pc.Color(i877[58], i877[59], i877[60], i877[61])
  i876.tensionType = i877[62]
  i876.rotationOffset = i877[63]
  i876.tensionDeadZone = i877[64]
  var i879 = i877[65]
  var i878 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Image')))
  for(var i = 0; i < i879.length; i += 2) {
  request.r(i879[i + 0], i879[i + 1], 1, i878, '')
  }
  i876.TensionAccents = i878
  i876.joystickName = i877[66]
  i876.radiusModifier = i877[67]
  return i876
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i882 = root || request.c( 'UnityEngine.UI.Button' )
  var i883 = data
  i882.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i883[0], i882.m_OnClick)
  i882.m_Navigation = request.d('UnityEngine.UI.Navigation', i883[1], i882.m_Navigation)
  i882.m_Transition = i883[2]
  i882.m_Colors = request.d('UnityEngine.UI.ColorBlock', i883[3], i882.m_Colors)
  i882.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i883[4], i882.m_SpriteState)
  i882.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i883[5], i882.m_AnimationTriggers)
  i882.m_Interactable = !!i883[6]
  request.r(i883[7], i883[8], 0, i882, 'm_TargetGraphic')
  return i882
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i884 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i885 = data
  i884.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i885[0], i884.m_PersistentCalls)
  return i884
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i886 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i887 = data
  var i889 = i887[0]
  var i888 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i889.length; i += 1) {
    i888.add(request.d('UnityEngine.Events.PersistentCall', i889[i + 0]));
  }
  i886.m_Calls = i888
  return i886
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i892 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i893 = data
  request.r(i893[0], i893[1], 0, i892, 'm_Target')
  i892.m_TargetAssemblyTypeName = i893[2]
  i892.m_MethodName = i893[3]
  i892.m_Mode = i893[4]
  i892.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i893[5], i892.m_Arguments)
  i892.m_CallState = i893[6]
  return i892
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i894 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i895 = data
  i894.m_Mode = i895[0]
  i894.m_WrapAround = !!i895[1]
  request.r(i895[2], i895[3], 0, i894, 'm_SelectOnUp')
  request.r(i895[4], i895[5], 0, i894, 'm_SelectOnDown')
  request.r(i895[6], i895[7], 0, i894, 'm_SelectOnLeft')
  request.r(i895[8], i895[9], 0, i894, 'm_SelectOnRight')
  return i894
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i896 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i897 = data
  i896.m_NormalColor = new pc.Color(i897[0], i897[1], i897[2], i897[3])
  i896.m_HighlightedColor = new pc.Color(i897[4], i897[5], i897[6], i897[7])
  i896.m_PressedColor = new pc.Color(i897[8], i897[9], i897[10], i897[11])
  i896.m_SelectedColor = new pc.Color(i897[12], i897[13], i897[14], i897[15])
  i896.m_DisabledColor = new pc.Color(i897[16], i897[17], i897[18], i897[19])
  i896.m_ColorMultiplier = i897[20]
  i896.m_FadeDuration = i897[21]
  return i896
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i898 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i899 = data
  request.r(i899[0], i899[1], 0, i898, 'm_HighlightedSprite')
  request.r(i899[2], i899[3], 0, i898, 'm_PressedSprite')
  request.r(i899[4], i899[5], 0, i898, 'm_SelectedSprite')
  request.r(i899[6], i899[7], 0, i898, 'm_DisabledSprite')
  return i898
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i900 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i901 = data
  i900.m_NormalTrigger = i901[0]
  i900.m_HighlightedTrigger = i901[1]
  i900.m_PressedTrigger = i901[2]
  i900.m_SelectedTrigger = i901[3]
  i900.m_DisabledTrigger = i901[4]
  return i900
}

Deserializers["UnityEngine.UI.Shadow"] = function (request, data, root) {
  var i902 = root || request.c( 'UnityEngine.UI.Shadow' )
  var i903 = data
  i902.m_EffectColor = new pc.Color(i903[0], i903[1], i903[2], i903[3])
  i902.m_EffectDistance = new pc.Vec2( i903[4], i903[5] )
  i902.m_UseGraphicAlpha = !!i903[6]
  return i902
}

Deserializers["Playable.PaintballFireButton"] = function (request, data, root) {
  var i904 = root || request.c( 'Playable.PaintballFireButton' )
  var i905 = data
  request.r(i905[0], i905[1], 0, i904, '_camera')
  i904._dragSensitivity = i905[2]
  return i904
}

Deserializers["Playable.ScaleHandHint"] = function (request, data, root) {
  var i906 = root || request.c( 'Playable.ScaleHandHint' )
  var i907 = data
  i906._pulseScale = i907[0]
  i906._duration = i907[1]
  return i906
}

Deserializers["Playable.WinPanel"] = function (request, data, root) {
  var i908 = root || request.c( 'Playable.WinPanel' )
  var i909 = data
  request.r(i909[0], i909[1], 0, i908, '_button')
  request.r(i909[2], i909[3], 0, i908, '_gameManager')
  i908._buttonPulseScale = i909[4]
  i908._buttonPulseDuration = i909[5]
  return i908
}

Deserializers["Playable.AuraUI"] = function (request, data, root) {
  var i910 = root || request.c( 'Playable.AuraUI' )
  var i911 = data
  return i910
}

Deserializers["FailPanel"] = function (request, data, root) {
  var i912 = root || request.c( 'FailPanel' )
  var i913 = data
  request.r(i913[0], i913[1], 0, i912, '_button')
  request.r(i913[2], i913[3], 0, i912, '_gameManager')
  i912._buttonPulseScale = i913[4]
  i912._buttonPulseDuration = i913[5]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i915 = data
  i914.m_Alpha = i915[0]
  i914.m_Interactable = !!i915[1]
  i914.m_BlocksRaycasts = !!i915[2]
  i914.m_IgnoreParentGroups = !!i915[3]
  i914.enabled = !!i915[4]
  return i914
}

Deserializers["Playable.HeroSelectionPanel"] = function (request, data, root) {
  var i916 = root || request.c( 'Playable.HeroSelectionPanel' )
  var i917 = data
  var i919 = i917[0]
  var i918 = []
  for(var i = 0; i < i919.length; i += 2) {
  request.r(i919[i + 0], i919[i + 1], 2, i918, '')
  }
  i916._cards = i918
  request.r(i917[1], i917[2], 0, i916, '_grid')
  return i916
}

Deserializers["UnityEngine.UI.GridLayoutGroup"] = function (request, data, root) {
  var i922 = root || request.c( 'UnityEngine.UI.GridLayoutGroup' )
  var i923 = data
  i922.m_StartCorner = i923[0]
  i922.m_StartAxis = i923[1]
  i922.m_CellSize = new pc.Vec2( i923[2], i923[3] )
  i922.m_Spacing = new pc.Vec2( i923[4], i923[5] )
  i922.m_Constraint = i923[6]
  i922.m_ConstraintCount = i923[7]
  i922.m_Padding = UnityEngine.RectOffset.FromPaddings(i923[8], i923[9], i923[10], i923[11])
  i922.m_ChildAlignment = i923[12]
  return i922
}

Deserializers["Playable.HeroCardView"] = function (request, data, root) {
  var i924 = root || request.c( 'Playable.HeroCardView' )
  var i925 = data
  request.r(i925[0], i925[1], 0, i924, '_button')
  request.r(i925[2], i925[3], 0, i924, '_portrait')
  request.r(i925[4], i925[5], 0, i924, '_label')
  return i924
}

Deserializers["Playable.GameManager"] = function (request, data, root) {
  var i926 = root || request.c( 'Playable.GameManager' )
  var i927 = data
  i926._endTime = i927[0]
  request.r(i927[1], i927[2], 0, i926, '_backgroundMusic')
  request.r(i927[3], i927[4], 0, i926, '_backgroundTexture')
  request.r(i927[5], i927[6], 0, i926, '_background')
  request.r(i927[7], i927[8], 0, i926, '_btnBlock')
  request.r(i927[9], i927[10], 0, i926, '_winPanel')
  request.r(i927[11], i927[12], 0, i926, '_failPanel')
  request.r(i927[13], i927[14], 0, i926, '_timeoutPanel')
  i926._autoCtaDelay = i927[15]
  return i926
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i928 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i929 = data
  request.r(i929[0], i929[1], 0, i928, 'm_FirstSelected')
  i928.m_sendNavigationEvents = !!i929[2]
  i928.m_DragThreshold = i929[3]
  return i928
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i930 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i931 = data
  i930.m_HorizontalAxis = i931[0]
  i930.m_VerticalAxis = i931[1]
  i930.m_SubmitButton = i931[2]
  i930.m_CancelButton = i931[3]
  i930.m_InputActionsPerSecond = i931[4]
  i930.m_RepeatDelay = i931[5]
  i930.m_ForceModuleActive = !!i931[6]
  i930.m_SendPointerHoverToParent = !!i931[7]
  return i930
}

Deserializers["Playable.AudioManager"] = function (request, data, root) {
  var i932 = root || request.c( 'Playable.AudioManager' )
  var i933 = data
  request.r(i933[0], i933[1], 0, i932, '_audioMusic')
  request.r(i933[2], i933[3], 0, i932, '_audioSound')
  return i932
}

Deserializers["Playable.GameController"] = function (request, data, root) {
  var i934 = root || request.c( 'Playable.GameController' )
  var i935 = data
  i934._gameBrightness = i935[0]
  return i934
}

Deserializers["Playable.CameraController"] = function (request, data, root) {
  var i936 = root || request.c( 'Playable.CameraController' )
  var i937 = data
  request.r(i937[0], i937[1], 0, i936, '_target')
  request.r(i937[2], i937[3], 0, i936, '_touchController')
  request.r(i937[4], i937[5], 0, i936, '_yawPivot')
  request.r(i937[6], i937[7], 0, i936, '_pitchPivot')
  request.r(i937[8], i937[9], 0, i936, '_followTarget')
  request.r(i937[10], i937[11], 0, i936, '_targetCamera')
  i936._viewMode = i937[12]
  i936._thirdPersonOffset = new pc.Vec3( i937[13], i937[14], i937[15] )
  i936._firstPersonOffset = new pc.Vec3( i937[16], i937[17], i937[18] )
  i936._followSmooth = i937[19]
  i936._lookSensitivity = i937[20]
  i936._initialYawOffset = i937[21]
  i936._initialPitch = i937[22]
  i936._pitchMin = i937[23]
  i936._pitchMax = i937[24]
  i936._collisionMask = UnityEngine.LayerMask.FromIntegerValue( i937[25] )
  i936._collisionRadius = i937[26]
  i936._bikeOffset = new pc.Vec3( i937[27], i937[28], i937[29] )
  i936._bikeInitialPitch = i937[30]
  i936._speedPullback = i937[31]
  i936._paintballZoomFov = i937[32]
  i936._paintballZoomDistance = i937[33]
  i936._paintballZoomShoulder = i937[34]
  i936._paintballZoomRate = i937[35]
  i936._paintballPortraitZoomFov = i937[36]
  i936._paintballPortraitZoomDistance = i937[37]
  i936._paintballPortraitZoomShoulder = i937[38]
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i939 = data
  i938.aspect = i939[0]
  i938.orthographic = !!i939[1]
  i938.orthographicSize = i939[2]
  i938.backgroundColor = new pc.Color(i939[3], i939[4], i939[5], i939[6])
  i938.nearClipPlane = i939[7]
  i938.farClipPlane = i939[8]
  i938.fieldOfView = i939[9]
  i938.depth = i939[10]
  i938.clearFlags = i939[11]
  i938.cullingMask = i939[12]
  i938.rect = i939[13]
  request.r(i939[14], i939[15], 0, i938, 'targetTexture')
  i938.usePhysicalProperties = !!i939[16]
  i938.focalLength = i939[17]
  i938.sensorSize = new pc.Vec2( i939[18], i939[19] )
  i938.lensShift = new pc.Vec2( i939[20], i939[21] )
  i938.gateFit = i939[22]
  i938.commandBufferCount = i939[23]
  i938.cameraType = i939[24]
  i938.enabled = !!i939[25]
  return i938
}

Deserializers["Playable.PlayerController"] = function (request, data, root) {
  var i940 = root || request.c( 'Playable.PlayerController' )
  var i941 = data
  i940._isWorking = !!i941[0]
  request.r(i941[1], i941[2], 0, i940, '_rigidbody')
  request.r(i941[3], i941[4], 0, i940, '_capsuleCollider')
  request.r(i941[5], i941[6], 0, i940, '_moveJoystick')
  request.r(i941[7], i941[8], 0, i940, '_cameraController')
  request.r(i941[9], i941[10], 0, i940, '_animator')
  request.r(i941[11], i941[12], 0, i940, '_btnJump')
  i940._isJumpParam = i941[13]
  i940._speedParam = i941[14]
  i940._airborneAnimationDelay = i941[15]
  i940._moveRate = i941[16]
  i940._rotationSmooth = i941[17]
  i940._acceleration = i941[18]
  i940._deceleration = i941[19]
  i940._airControlMultiplier = i941[20]
  i940._inputDeadZone = i941[21]
  i940._stepHeight = i941[22]
  i940._jumpHeight = i941[23]
  i940._gravity = i941[24]
  i940._fallGravityMultiplier = i941[25]
  i940._maxFallRate = i941[26]
  i940._jumpGroundIgnoreDuration = i941[27]
  i940._jumpBufferDuration = i941[28]
  i940._coyoteTime = i941[29]
  i940._groundMask = UnityEngine.LayerMask.FromIntegerValue( i941[30] )
  i940._groundCheckDistance = i941[31]
  i940._maxSlope = i941[32]
  return i940
}

Deserializers["Playable.PlayerPaintballController"] = function (request, data, root) {
  var i942 = root || request.c( 'Playable.PlayerPaintballController' )
  var i943 = data
  request.r(i943[0], i943[1], 0, i942, '_player')
  request.r(i943[2], i943[3], 0, i942, '_camera')
  request.r(i943[4], i943[5], 0, i942, '_animator')
  request.r(i943[6], i943[7], 0, i942, '_armedAnimator')
  request.r(i943[8], i943[9], 0, i942, '_weapon')
  request.r(i943[10], i943[11], 0, i942, '_heroWeaponSocket')
  request.r(i943[12], i943[13], 0, i942, '_muzzle')
  request.r(i943[14], i943[15], 0, i942, '_crosshair')
  i942._portraitCrosshairScale = i943[16]
  i942._portraitCrosshairHeightOffset = i943[17]
  request.r(i943[18], i943[19], 0, i942, '_flash')
  request.r(i943[20], i943[21], 0, i942, '_hud')
  request.r(i943[22], i943[23], 0, i942, '_hint')
  request.r(i943[24], i943[25], 0, i942, '_fire')
  request.r(i943[26], i943[27], 0, i942, '_ammoLabel')
  request.r(i943[28], i943[29], 0, i942, '_hitOverlay')
  request.r(i943[30], i943[31], 0, i942, '_audio')
  request.r(i943[32], i943[33], 0, i942, '_shotSound')
  request.r(i943[34], i943[35], 0, i942, '_reloadSound')
  var i945 = i943[36]
  var i944 = []
  for(var i = 0; i < i945.length; i += 2) {
  request.r(i945[i + 0], i945[i + 1], 2, i944, '')
  }
  i942._projectiles = i944
  i942._useRate = i943[37]
  i942._infiniteAmmo = !!i943[38]
  i942._magazineSize = i943[39]
  i942._reserveRounds = i943[40]
  i942._equipCompleteTime = i943[41]
  i942._shotEventTime = i943[42]
  i942._reloadRefillTime = i943[43]
  i942._reloadCompleteTime = i943[44]
  return i942
}

Deserializers["Playable.HeroRoster"] = function (request, data, root) {
  var i948 = root || request.c( 'Playable.HeroRoster' )
  var i949 = data
  var i951 = i949[0]
  var i950 = []
  for(var i = 0; i < i951.length; i += 1) {
    i950.push( request.d('Playable.HeroRoster+HeroEntry', i951[i + 0]) );
  }
  i948._heroes = i950
  i948._slot1 = i949[1]
  i948._slot2 = i949[2]
  i948._slot3 = i949[3]
  i948._slot4 = i949[4]
  return i948
}

Deserializers["Playable.HeroRoster+HeroEntry"] = function (request, data, root) {
  var i954 = root || request.c( 'Playable.HeroRoster+HeroEntry' )
  var i955 = data
  i954._id = i955[0]
  i954._displayName = i955[1]
  request.r(i955[2], i955[3], 0, i954, '_portrait')
  request.r(i955[4], i955[5], 0, i954, '_skinRoot')
  request.r(i955[6], i955[7], 0, i954, '_controller')
  request.r(i955[8], i955[9], 0, i954, '_weaponSocket')
  return i954
}

Deserializers["Playable.PlayerSkinSwitcher"] = function (request, data, root) {
  var i956 = root || request.c( 'Playable.PlayerSkinSwitcher' )
  var i957 = data
  request.r(i957[0], i957[1], 0, i956, '_roster')
  request.r(i957[2], i957[3], 0, i956, '_weapon')
  request.r(i957[4], i957[5], 0, i956, '_defaultVisual')
  return i956
}

Deserializers["Playable.PlayerHealth"] = function (request, data, root) {
  var i958 = root || request.c( 'Playable.PlayerHealth' )
  var i959 = data
  i958._maxHealth = i959[0]
  request.r(i959[1], i959[2], 0, i958, '_weapon')
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CharacterJoint"] = function (request, data, root) {
  var i960 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CharacterJoint' )
  var i961 = data
  i960.swingAxis = new pc.Vec3( i961[0], i961[1], i961[2] )
  i960.twistLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i961[3], i960.twistLimitSpring)
  i960.swingLimitSpring = request.d('UnityEngine.SoftJointLimitSpring', i961[4], i960.swingLimitSpring)
  i960.lowTwistLimit = request.d('UnityEngine.SoftJointLimit', i961[5], i960.lowTwistLimit)
  i960.highTwistLimit = request.d('UnityEngine.SoftJointLimit', i961[6], i960.highTwistLimit)
  i960.swing1Limit = request.d('UnityEngine.SoftJointLimit', i961[7], i960.swing1Limit)
  i960.swing2Limit = request.d('UnityEngine.SoftJointLimit', i961[8], i960.swing2Limit)
  request.r(i961[9], i961[10], 0, i960, 'connectedBody')
  i960.axis = new pc.Vec3( i961[11], i961[12], i961[13] )
  i960.anchor = new pc.Vec3( i961[14], i961[15], i961[16] )
  i960.connectedAnchor = new pc.Vec3( i961[17], i961[18], i961[19] )
  i960.autoConfigureConnectedAnchor = !!i961[20]
  i960.massScale = i961[21]
  i960.connectedMassScale = i961[22]
  i960.enableCollision = !!i961[23]
  i960.breakForce = i961[24]
  i960.breakTorque = i961[25]
  return i960
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i963 = data
  request.r(i963[0], i963[1], 0, i962, 'sharedMesh')
  var i965 = i963[2]
  var i964 = []
  for(var i = 0; i < i965.length; i += 2) {
  request.r(i965[i + 0], i965[i + 1], 2, i964, '')
  }
  i962.bones = i964
  i962.updateWhenOffscreen = !!i963[3]
  i962.localBounds = i963[4]
  request.r(i963[5], i963[6], 0, i962, 'rootBone')
  var i967 = i963[7]
  var i966 = []
  for(var i = 0; i < i967.length; i += 1) {
    i966.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i967[i + 0]) );
  }
  i962.blendShapesWeights = i966
  i962.enabled = !!i963[8]
  request.r(i963[9], i963[10], 0, i962, 'sharedMaterial')
  var i969 = i963[11]
  var i968 = []
  for(var i = 0; i < i969.length; i += 2) {
  request.r(i969[i + 0], i969[i + 1], 2, i968, '')
  }
  i962.sharedMaterials = i968
  i962.receiveShadows = !!i963[12]
  i962.shadowCastingMode = i963[13]
  i962.sortingLayerID = i963[14]
  i962.sortingOrder = i963[15]
  i962.lightmapIndex = i963[16]
  i962.lightmapSceneIndex = i963[17]
  i962.lightmapScaleOffset = new pc.Vec4( i963[18], i963[19], i963[20], i963[21] )
  i962.lightProbeUsage = i963[22]
  i962.reflectionProbeUsage = i963[23]
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i973 = data
  i972.weight = i973[0]
  return i972
}

Deserializers["Playable.LunaController"] = function (request, data, root) {
  var i974 = root || request.c( 'Playable.LunaController' )
  var i975 = data
  return i974
}

Deserializers["Playable.PaintballProjectile"] = function (request, data, root) {
  var i976 = root || request.c( 'Playable.PaintballProjectile' )
  var i977 = data
  i976._speed = i977[0]
  i976._lifeTime = i977[1]
  i976._damage = i977[2]
  i976._radius = i977[3]
  i976._hitMask = UnityEngine.LayerMask.FromIntegerValue( i977[4] )
  request.r(i977[5], i977[6], 0, i976, '_visual')
  request.r(i977[7], i977[8], 0, i976, '_impact')
  var i979 = i977[9]
  var i978 = []
  for(var i = 0; i < i979.length; i += 2) {
  request.r(i979[i + 0], i979[i + 1], 2, i978, '')
  }
  i976._flightParticles = i978
  var i981 = i977[10]
  var i980 = []
  for(var i = 0; i < i981.length; i += 2) {
  request.r(i981[i + 0], i981[i + 1], 2, i980, '')
  }
  i976._impactParticles = i980
  i976._impactLifetime = i977[11]
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i985 = data
  i984.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i985[0], i984.main)
  i984.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i985[1], i984.colorBySpeed)
  i984.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i985[2], i984.colorOverLifetime)
  i984.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i985[3], i984.emission)
  i984.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i985[4], i984.rotationBySpeed)
  i984.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i985[5], i984.rotationOverLifetime)
  i984.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i985[6], i984.shape)
  i984.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i985[7], i984.sizeBySpeed)
  i984.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i985[8], i984.sizeOverLifetime)
  i984.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i985[9], i984.textureSheetAnimation)
  i984.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i985[10], i984.velocityOverLifetime)
  i984.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i985[11], i984.noise)
  i984.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i985[12], i984.inheritVelocity)
  i984.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i985[13], i984.forceOverLifetime)
  i984.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i985[14], i984.limitVelocityOverLifetime)
  i984.useAutoRandomSeed = !!i985[15]
  i984.randomSeed = i985[16]
  return i984
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i986 = root || new pc.ParticleSystemMain()
  var i987 = data
  i986.duration = i987[0]
  i986.loop = !!i987[1]
  i986.prewarm = !!i987[2]
  i986.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[3], i986.startDelay)
  i986.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[4], i986.startLifetime)
  i986.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[5], i986.startSpeed)
  i986.startSize3D = !!i987[6]
  i986.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[7], i986.startSizeX)
  i986.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[8], i986.startSizeY)
  i986.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[9], i986.startSizeZ)
  i986.startRotation3D = !!i987[10]
  i986.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[11], i986.startRotationX)
  i986.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[12], i986.startRotationY)
  i986.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[13], i986.startRotationZ)
  i986.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i987[14], i986.startColor)
  i986.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i987[15], i986.gravityModifier)
  i986.simulationSpace = i987[16]
  request.r(i987[17], i987[18], 0, i986, 'customSimulationSpace')
  i986.simulationSpeed = i987[19]
  i986.useUnscaledTime = !!i987[20]
  i986.scalingMode = i987[21]
  i986.playOnAwake = !!i987[22]
  i986.maxParticles = i987[23]
  i986.emitterVelocityMode = i987[24]
  i986.stopAction = i987[25]
  return i986
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i988 = root || new pc.MinMaxCurve()
  var i989 = data
  i988.mode = i989[0]
  i988.curveMin = new pc.AnimationCurve( { keys_flow: i989[1] } )
  i988.curveMax = new pc.AnimationCurve( { keys_flow: i989[2] } )
  i988.curveMultiplier = i989[3]
  i988.constantMin = i989[4]
  i988.constantMax = i989[5]
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i990 = root || new pc.MinMaxGradient()
  var i991 = data
  i990.mode = i991[0]
  i990.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i991[1], i990.gradientMin)
  i990.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i991[2], i990.gradientMax)
  i990.colorMin = new pc.Color(i991[3], i991[4], i991[5], i991[6])
  i990.colorMax = new pc.Color(i991[7], i991[8], i991[9], i991[10])
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i993 = data
  i992.mode = i993[0]
  var i995 = i993[1]
  var i994 = []
  for(var i = 0; i < i995.length; i += 1) {
    i994.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i995[i + 0]) );
  }
  i992.colorKeys = i994
  var i997 = i993[2]
  var i996 = []
  for(var i = 0; i < i997.length; i += 1) {
    i996.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i997[i + 0]) );
  }
  i992.alphaKeys = i996
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1001 = data
  i1000.color = new pc.Color(i1001[0], i1001[1], i1001[2], i1001[3])
  i1000.time = i1001[4]
  return i1000
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1005 = data
  i1004.alpha = i1005[0]
  i1004.time = i1005[1]
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1006 = root || new pc.ParticleSystemColorBySpeed()
  var i1007 = data
  i1006.enabled = !!i1007[0]
  i1006.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1007[1], i1006.color)
  i1006.range = new pc.Vec2( i1007[2], i1007[3] )
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1008 = root || new pc.ParticleSystemColorOverLifetime()
  var i1009 = data
  i1008.enabled = !!i1009[0]
  i1008.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1009[1], i1008.color)
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1010 = root || new pc.ParticleSystemEmitter()
  var i1011 = data
  i1010.enabled = !!i1011[0]
  i1010.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[1], i1010.rateOverTime)
  i1010.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1011[2], i1010.rateOverDistance)
  var i1013 = i1011[3]
  var i1012 = []
  for(var i = 0; i < i1013.length; i += 1) {
    i1012.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1013[i + 0]) );
  }
  i1010.bursts = i1012
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1016 = root || new pc.ParticleSystemBurst()
  var i1017 = data
  i1016.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1017[0], i1016.count)
  i1016.cycleCount = i1017[1]
  i1016.minCount = i1017[2]
  i1016.maxCount = i1017[3]
  i1016.repeatInterval = i1017[4]
  i1016.time = i1017[5]
  return i1016
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1018 = root || new pc.ParticleSystemRotationBySpeed()
  var i1019 = data
  i1018.enabled = !!i1019[0]
  i1018.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1019[1], i1018.x)
  i1018.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1019[2], i1018.y)
  i1018.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1019[3], i1018.z)
  i1018.separateAxes = !!i1019[4]
  i1018.range = new pc.Vec2( i1019[5], i1019[6] )
  return i1018
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1020 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1021 = data
  i1020.enabled = !!i1021[0]
  i1020.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1021[1], i1020.x)
  i1020.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1021[2], i1020.y)
  i1020.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1021[3], i1020.z)
  i1020.separateAxes = !!i1021[4]
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1022 = root || new pc.ParticleSystemShape()
  var i1023 = data
  i1022.enabled = !!i1023[0]
  i1022.shapeType = i1023[1]
  i1022.randomDirectionAmount = i1023[2]
  i1022.sphericalDirectionAmount = i1023[3]
  i1022.randomPositionAmount = i1023[4]
  i1022.alignToDirection = !!i1023[5]
  i1022.radius = i1023[6]
  i1022.radiusMode = i1023[7]
  i1022.radiusSpread = i1023[8]
  i1022.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[9], i1022.radiusSpeed)
  i1022.radiusThickness = i1023[10]
  i1022.angle = i1023[11]
  i1022.length = i1023[12]
  i1022.boxThickness = new pc.Vec3( i1023[13], i1023[14], i1023[15] )
  i1022.meshShapeType = i1023[16]
  request.r(i1023[17], i1023[18], 0, i1022, 'mesh')
  request.r(i1023[19], i1023[20], 0, i1022, 'meshRenderer')
  request.r(i1023[21], i1023[22], 0, i1022, 'skinnedMeshRenderer')
  i1022.useMeshMaterialIndex = !!i1023[23]
  i1022.meshMaterialIndex = i1023[24]
  i1022.useMeshColors = !!i1023[25]
  i1022.normalOffset = i1023[26]
  i1022.arc = i1023[27]
  i1022.arcMode = i1023[28]
  i1022.arcSpread = i1023[29]
  i1022.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1023[30], i1022.arcSpeed)
  i1022.donutRadius = i1023[31]
  i1022.position = new pc.Vec3( i1023[32], i1023[33], i1023[34] )
  i1022.rotation = new pc.Vec3( i1023[35], i1023[36], i1023[37] )
  i1022.scale = new pc.Vec3( i1023[38], i1023[39], i1023[40] )
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1024 = root || new pc.ParticleSystemSizeBySpeed()
  var i1025 = data
  i1024.enabled = !!i1025[0]
  i1024.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[1], i1024.x)
  i1024.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[2], i1024.y)
  i1024.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1025[3], i1024.z)
  i1024.separateAxes = !!i1025[4]
  i1024.range = new pc.Vec2( i1025[5], i1025[6] )
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1026 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1027 = data
  i1026.enabled = !!i1027[0]
  i1026.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[1], i1026.x)
  i1026.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[2], i1026.y)
  i1026.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1027[3], i1026.z)
  i1026.separateAxes = !!i1027[4]
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1028 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1029 = data
  i1028.enabled = !!i1029[0]
  i1028.mode = i1029[1]
  i1028.animation = i1029[2]
  i1028.numTilesX = i1029[3]
  i1028.numTilesY = i1029[4]
  i1028.useRandomRow = !!i1029[5]
  i1028.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[6], i1028.frameOverTime)
  i1028.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1029[7], i1028.startFrame)
  i1028.cycleCount = i1029[8]
  i1028.rowIndex = i1029[9]
  i1028.flipU = i1029[10]
  i1028.flipV = i1029[11]
  i1028.spriteCount = i1029[12]
  var i1031 = i1029[13]
  var i1030 = []
  for(var i = 0; i < i1031.length; i += 2) {
  request.r(i1031[i + 0], i1031[i + 1], 2, i1030, '')
  }
  i1028.sprites = i1030
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1034 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1035 = data
  i1034.enabled = !!i1035[0]
  i1034.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[1], i1034.x)
  i1034.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[2], i1034.y)
  i1034.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[3], i1034.z)
  i1034.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[4], i1034.radial)
  i1034.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[5], i1034.speedModifier)
  i1034.space = i1035[6]
  i1034.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[7], i1034.orbitalX)
  i1034.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[8], i1034.orbitalY)
  i1034.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[9], i1034.orbitalZ)
  i1034.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[10], i1034.orbitalOffsetX)
  i1034.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[11], i1034.orbitalOffsetY)
  i1034.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1035[12], i1034.orbitalOffsetZ)
  return i1034
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1036 = root || new pc.ParticleSystemNoise()
  var i1037 = data
  i1036.enabled = !!i1037[0]
  i1036.separateAxes = !!i1037[1]
  i1036.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[2], i1036.strengthX)
  i1036.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[3], i1036.strengthY)
  i1036.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[4], i1036.strengthZ)
  i1036.frequency = i1037[5]
  i1036.damping = !!i1037[6]
  i1036.octaveCount = i1037[7]
  i1036.octaveMultiplier = i1037[8]
  i1036.octaveScale = i1037[9]
  i1036.quality = i1037[10]
  i1036.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[11], i1036.scrollSpeed)
  i1036.scrollSpeedMultiplier = i1037[12]
  i1036.remapEnabled = !!i1037[13]
  i1036.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[14], i1036.remapX)
  i1036.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[15], i1036.remapY)
  i1036.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[16], i1036.remapZ)
  i1036.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[17], i1036.positionAmount)
  i1036.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[18], i1036.rotationAmount)
  i1036.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1037[19], i1036.sizeAmount)
  return i1036
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1038 = root || new pc.ParticleSystemInheritVelocity()
  var i1039 = data
  i1038.enabled = !!i1039[0]
  i1038.mode = i1039[1]
  i1038.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1039[2], i1038.curve)
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1040 = root || new pc.ParticleSystemForceOverLifetime()
  var i1041 = data
  i1040.enabled = !!i1041[0]
  i1040.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[1], i1040.x)
  i1040.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[2], i1040.y)
  i1040.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1041[3], i1040.z)
  i1040.space = i1041[4]
  i1040.randomized = !!i1041[5]
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1042 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1043 = data
  i1042.enabled = !!i1043[0]
  i1042.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[1], i1042.limit)
  i1042.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[2], i1042.limitX)
  i1042.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[3], i1042.limitY)
  i1042.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[4], i1042.limitZ)
  i1042.dampen = i1043[5]
  i1042.separateAxes = !!i1043[6]
  i1042.space = i1043[7]
  i1042.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1043[8], i1042.drag)
  i1042.multiplyDragByParticleSize = !!i1043[9]
  i1042.multiplyDragByParticleVelocity = !!i1043[10]
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1045 = data
  request.r(i1045[0], i1045[1], 0, i1044, 'mesh')
  i1044.meshCount = i1045[2]
  i1044.activeVertexStreamsCount = i1045[3]
  i1044.alignment = i1045[4]
  i1044.renderMode = i1045[5]
  i1044.sortMode = i1045[6]
  i1044.lengthScale = i1045[7]
  i1044.velocityScale = i1045[8]
  i1044.cameraVelocityScale = i1045[9]
  i1044.normalDirection = i1045[10]
  i1044.sortingFudge = i1045[11]
  i1044.minParticleSize = i1045[12]
  i1044.maxParticleSize = i1045[13]
  i1044.pivot = new pc.Vec3( i1045[14], i1045[15], i1045[16] )
  request.r(i1045[17], i1045[18], 0, i1044, 'trailMaterial')
  i1044.applyActiveColorSpace = !!i1045[19]
  i1044.enabled = !!i1045[20]
  request.r(i1045[21], i1045[22], 0, i1044, 'sharedMaterial')
  var i1047 = i1045[23]
  var i1046 = []
  for(var i = 0; i < i1047.length; i += 2) {
  request.r(i1047[i + 0], i1047[i + 1], 2, i1046, '')
  }
  i1044.sharedMaterials = i1046
  i1044.receiveShadows = !!i1045[24]
  i1044.shadowCastingMode = i1045[25]
  i1044.sortingLayerID = i1045[26]
  i1044.sortingOrder = i1045[27]
  i1044.lightmapIndex = i1045[28]
  i1044.lightmapSceneIndex = i1045[29]
  i1044.lightmapScaleOffset = new pc.Vec4( i1045[30], i1045[31], i1045[32], i1045[33] )
  i1044.lightProbeUsage = i1045[34]
  i1044.reflectionProbeUsage = i1045[35]
  return i1044
}

Deserializers["Playable.CombatTutorialController"] = function (request, data, root) {
  var i1048 = root || request.c( 'Playable.CombatTutorialController' )
  var i1049 = data
  request.r(i1049[0], i1049[1], 0, i1048, '_camera')
  request.r(i1049[2], i1049[3], 0, i1048, '_touch')
  request.r(i1049[4], i1049[5], 0, i1048, '_player')
  request.r(i1049[6], i1049[7], 0, i1048, '_weapon')
  request.r(i1049[8], i1049[9], 0, i1048, '_lookCue')
  request.r(i1049[10], i1049[11], 0, i1048, '_moveCue')
  request.r(i1049[12], i1049[13], 0, i1048, '_fireCue')
  request.r(i1049[14], i1049[15], 0, i1048, '_joystick')
  request.r(i1049[16], i1049[17], 0, i1048, '_fireButton')
  i1048._lookThresholdDegrees = i1049[18]
  return i1048
}

Deserializers["Playable.MonsterHeroFlowController"] = function (request, data, root) {
  var i1050 = root || request.c( 'Playable.MonsterHeroFlowController' )
  var i1051 = data
  request.r(i1051[0], i1051[1], 0, i1050, '_roster')
  request.r(i1051[2], i1051[3], 0, i1050, '_selection')
  request.r(i1051[4], i1051[5], 0, i1050, '_skins')
  request.r(i1051[6], i1051[7], 0, i1050, '_player')
  request.r(i1051[8], i1051[9], 0, i1050, '_touch')
  request.r(i1051[10], i1051[11], 0, i1050, '_weapon')
  request.r(i1051[12], i1051[13], 0, i1050, '_camera')
  request.r(i1051[14], i1051[15], 0, i1050, '_tutorial')
  request.r(i1051[16], i1051[17], 0, i1050, '_monster')
  request.r(i1051[18], i1051[19], 0, i1050, '_health')
  request.r(i1051[20], i1051[21], 0, i1050, '_game')
  request.r(i1051[22], i1051[23], 0, i1050, '_objective')
  request.r(i1051[24], i1051[25], 0, i1050, '_hud')
  return i1050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1052 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1053 = data
  i1052.ambientIntensity = i1053[0]
  i1052.reflectionIntensity = i1053[1]
  i1052.ambientMode = i1053[2]
  i1052.ambientLight = new pc.Color(i1053[3], i1053[4], i1053[5], i1053[6])
  i1052.ambientSkyColor = new pc.Color(i1053[7], i1053[8], i1053[9], i1053[10])
  i1052.ambientGroundColor = new pc.Color(i1053[11], i1053[12], i1053[13], i1053[14])
  i1052.ambientEquatorColor = new pc.Color(i1053[15], i1053[16], i1053[17], i1053[18])
  i1052.fogColor = new pc.Color(i1053[19], i1053[20], i1053[21], i1053[22])
  i1052.fogEndDistance = i1053[23]
  i1052.fogStartDistance = i1053[24]
  i1052.fogDensity = i1053[25]
  i1052.fog = !!i1053[26]
  request.r(i1053[27], i1053[28], 0, i1052, 'skybox')
  i1052.fogMode = i1053[29]
  var i1055 = i1053[30]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 1) {
    i1054.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1055[i + 0]) );
  }
  i1052.lightmaps = i1054
  i1052.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1053[31], i1052.lightProbes)
  i1052.lightmapsMode = i1053[32]
  i1052.mixedBakeMode = i1053[33]
  i1052.environmentLightingMode = i1053[34]
  i1052.ambientProbe = new pc.SphericalHarmonicsL2(i1053[35])
  request.r(i1053[36], i1053[37], 0, i1052, 'customReflection')
  request.r(i1053[38], i1053[39], 0, i1052, 'defaultReflection')
  i1052.defaultReflectionMode = i1053[40]
  i1052.defaultReflectionResolution = i1053[41]
  i1052.sunLightObjectId = i1053[42]
  i1052.pixelLightCount = i1053[43]
  i1052.defaultReflectionHDR = !!i1053[44]
  i1052.hasLightDataAsset = !!i1053[45]
  i1052.hasManualGenerate = !!i1053[46]
  return i1052
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1059 = data
  request.r(i1059[0], i1059[1], 0, i1058, 'lightmapColor')
  request.r(i1059[2], i1059[3], 0, i1058, 'lightmapDirection')
  request.r(i1059[4], i1059[5], 0, i1058, 'shadowMask')
  return i1058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1060 = root || new UnityEngine.LightProbes()
  var i1061 = data
  return i1060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1069 = data
  i1068.type = i1069[0]
  i1068.color = new pc.Color(i1069[1], i1069[2], i1069[3], i1069[4])
  i1068.cullingMask = i1069[5]
  i1068.intensity = i1069[6]
  i1068.range = i1069[7]
  i1068.spotAngle = i1069[8]
  i1068.shadows = i1069[9]
  i1068.shadowNormalBias = i1069[10]
  i1068.shadowBias = i1069[11]
  i1068.shadowStrength = i1069[12]
  i1068.shadowResolution = i1069[13]
  i1068.lightmapBakeType = i1069[14]
  i1068.renderMode = i1069[15]
  request.r(i1069[16], i1069[17], 0, i1068, 'cookie')
  i1068.cookieSize = i1069[18]
  i1068.shadowNearPlane = i1069[19]
  i1068.occlusionMaskChannel = i1069[20]
  i1068.isBaked = !!i1069[21]
  i1068.mixedLightingMode = i1069[22]
  i1068.enabled = !!i1069[23]
  return i1068
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i1070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i1071 = data
  request.r(i1071[0], i1071[1], 0, i1070, 'sharedMesh')
  i1070.convex = !!i1071[2]
  i1070.enabled = !!i1071[3]
  i1070.isTrigger = !!i1071[4]
  request.r(i1071[5], i1071[6], 0, i1070, 'material')
  return i1070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1072 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1073 = data
  var i1075 = i1073[0]
  var i1074 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1075.length; i += 1) {
    i1074.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1075[i + 0]));
  }
  i1072.ShaderCompilationErrors = i1074
  i1072.name = i1073[1]
  i1072.guid = i1073[2]
  var i1077 = i1073[3]
  var i1076 = []
  for(var i = 0; i < i1077.length; i += 1) {
    i1076.push( i1077[i + 0] );
  }
  i1072.shaderDefinedKeywords = i1076
  var i1079 = i1073[4]
  var i1078 = []
  for(var i = 0; i < i1079.length; i += 1) {
    i1078.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1079[i + 0]) );
  }
  i1072.passes = i1078
  var i1081 = i1073[5]
  var i1080 = []
  for(var i = 0; i < i1081.length; i += 1) {
    i1080.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1081[i + 0]) );
  }
  i1072.usePasses = i1080
  var i1083 = i1073[6]
  var i1082 = []
  for(var i = 0; i < i1083.length; i += 1) {
    i1082.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1083[i + 0]) );
  }
  i1072.defaultParameterValues = i1082
  request.r(i1073[7], i1073[8], 0, i1072, 'unityFallbackShader')
  i1072.readDepth = !!i1073[9]
  i1072.hasDepthOnlyPass = !!i1073[10]
  i1072.isCreatedByShaderGraph = !!i1073[11]
  i1072.disableBatching = !!i1073[12]
  i1072.compiled = !!i1073[13]
  return i1072
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1087 = data
  i1086.shaderName = i1087[0]
  i1086.errorMessage = i1087[1]
  return i1086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1092 = root || new pc.UnityShaderPass()
  var i1093 = data
  i1092.id = i1093[0]
  i1092.subShaderIndex = i1093[1]
  i1092.name = i1093[2]
  i1092.passType = i1093[3]
  i1092.grabPassTextureName = i1093[4]
  i1092.usePass = !!i1093[5]
  i1092.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[6], i1092.zTest)
  i1092.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[7], i1092.zWrite)
  i1092.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[8], i1092.culling)
  i1092.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1093[9], i1092.blending)
  i1092.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1093[10], i1092.alphaBlending)
  i1092.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[11], i1092.colorWriteMask)
  i1092.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[12], i1092.offsetUnits)
  i1092.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[13], i1092.offsetFactor)
  i1092.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[14], i1092.stencilRef)
  i1092.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[15], i1092.stencilReadMask)
  i1092.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1093[16], i1092.stencilWriteMask)
  i1092.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1093[17], i1092.stencilOp)
  i1092.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1093[18], i1092.stencilOpFront)
  i1092.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1093[19], i1092.stencilOpBack)
  var i1095 = i1093[20]
  var i1094 = []
  for(var i = 0; i < i1095.length; i += 1) {
    i1094.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1095[i + 0]) );
  }
  i1092.tags = i1094
  var i1097 = i1093[21]
  var i1096 = []
  for(var i = 0; i < i1097.length; i += 1) {
    i1096.push( i1097[i + 0] );
  }
  i1092.passDefinedKeywords = i1096
  var i1099 = i1093[22]
  var i1098 = []
  for(var i = 0; i < i1099.length; i += 1) {
    i1098.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1099[i + 0]) );
  }
  i1092.passDefinedKeywordGroups = i1098
  var i1101 = i1093[23]
  var i1100 = []
  for(var i = 0; i < i1101.length; i += 1) {
    i1100.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1101[i + 0]) );
  }
  i1092.variants = i1100
  var i1103 = i1093[24]
  var i1102 = []
  for(var i = 0; i < i1103.length; i += 1) {
    i1102.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1103[i + 0]) );
  }
  i1092.excludedVariants = i1102
  i1092.hasDepthReader = !!i1093[25]
  return i1092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1104 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1105 = data
  i1104.val = i1105[0]
  i1104.name = i1105[1]
  return i1104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1107 = data
  i1106.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1107[0], i1106.src)
  i1106.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1107[1], i1106.dst)
  i1106.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1107[2], i1106.op)
  return i1106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1109 = data
  i1108.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1109[0], i1108.pass)
  i1108.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1109[1], i1108.fail)
  i1108.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1109[2], i1108.zFail)
  i1108.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1109[3], i1108.comp)
  return i1108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1113 = data
  i1112.name = i1113[0]
  i1112.value = i1113[1]
  return i1112
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1116 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1117 = data
  var i1119 = i1117[0]
  var i1118 = []
  for(var i = 0; i < i1119.length; i += 1) {
    i1118.push( i1119[i + 0] );
  }
  i1116.keywords = i1118
  i1116.hasDiscard = !!i1117[1]
  return i1116
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1123 = data
  i1122.passId = i1123[0]
  i1122.subShaderIndex = i1123[1]
  var i1125 = i1123[2]
  var i1124 = []
  for(var i = 0; i < i1125.length; i += 1) {
    i1124.push( i1125[i + 0] );
  }
  i1122.keywords = i1124
  i1122.vertexProgram = i1123[3]
  i1122.fragmentProgram = i1123[4]
  i1122.exportedForWebGl2 = !!i1123[5]
  i1122.readDepth = !!i1123[6]
  return i1122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1128 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1129 = data
  request.r(i1129[0], i1129[1], 0, i1128, 'shader')
  i1128.pass = i1129[2]
  return i1128
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1132 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1133 = data
  i1132.name = i1133[0]
  i1132.type = i1133[1]
  i1132.value = new pc.Vec4( i1133[2], i1133[3], i1133[4], i1133[5] )
  i1132.textureValue = i1133[6]
  i1132.shaderPropertyFlag = i1133[7]
  return i1132
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1134 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1135 = data
  i1134.name = i1135[0]
  request.r(i1135[1], i1135[2], 0, i1134, 'texture')
  i1134.aabb = i1135[3]
  i1134.vertices = i1135[4]
  i1134.triangles = i1135[5]
  i1134.textureRect = UnityEngine.Rect.MinMaxRect(i1135[6], i1135[7], i1135[8], i1135[9])
  i1134.packedRect = UnityEngine.Rect.MinMaxRect(i1135[10], i1135[11], i1135[12], i1135[13])
  i1134.border = new pc.Vec4( i1135[14], i1135[15], i1135[16], i1135[17] )
  i1134.transparency = i1135[18]
  i1134.bounds = i1135[19]
  i1134.pixelsPerUnit = i1135[20]
  i1134.textureWidth = i1135[21]
  i1134.textureHeight = i1135[22]
  i1134.nativeSize = new pc.Vec2( i1135[23], i1135[24] )
  i1134.pivot = new pc.Vec2( i1135[25], i1135[26] )
  i1134.textureRectOffset = new pc.Vec2( i1135[27], i1135[28] )
  return i1134
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1136 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1137 = data
  i1136.name = i1137[0]
  return i1136
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1138 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1139 = data
  i1138.name = i1139[0]
  i1138.wrapMode = i1139[1]
  i1138.isLooping = !!i1139[2]
  i1138.length = i1139[3]
  var i1141 = i1139[4]
  var i1140 = []
  for(var i = 0; i < i1141.length; i += 1) {
    i1140.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1141[i + 0]) );
  }
  i1138.curves = i1140
  var i1143 = i1139[5]
  var i1142 = []
  for(var i = 0; i < i1143.length; i += 1) {
    i1142.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1143[i + 0]) );
  }
  i1138.events = i1142
  i1138.halfPrecision = !!i1139[6]
  i1138._frameRate = i1139[7]
  i1138.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1139[8], i1138.localBounds)
  i1138.hasMuscleCurves = !!i1139[9]
  var i1145 = i1139[10]
  var i1144 = []
  for(var i = 0; i < i1145.length; i += 1) {
    i1144.push( i1145[i + 0] );
  }
  i1138.clipMuscleConstant = i1144
  i1138.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1139[11], i1138.clipBindingConstant)
  return i1138
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1148 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1149 = data
  i1148.path = i1149[0]
  i1148.hash = i1149[1]
  i1148.componentType = i1149[2]
  i1148.property = i1149[3]
  i1148.keys = i1149[4]
  var i1151 = i1149[5]
  var i1150 = []
  for(var i = 0; i < i1151.length; i += 1) {
    i1150.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1151[i + 0]) );
  }
  i1148.objectReferenceKeys = i1150
  return i1148
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1155 = data
  i1154.time = i1155[0]
  request.r(i1155[1], i1155[2], 0, i1154, 'value')
  return i1154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1158 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1159 = data
  i1158.functionName = i1159[0]
  i1158.floatParameter = i1159[1]
  i1158.intParameter = i1159[2]
  i1158.stringParameter = i1159[3]
  request.r(i1159[4], i1159[5], 0, i1158, 'objectReferenceParameter')
  i1158.time = i1159[6]
  return i1158
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1160 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1161 = data
  i1160.center = new pc.Vec3( i1161[0], i1161[1], i1161[2] )
  i1160.extends = new pc.Vec3( i1161[3], i1161[4], i1161[5] )
  return i1160
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1164 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1165 = data
  var i1167 = i1165[0]
  var i1166 = []
  for(var i = 0; i < i1167.length; i += 1) {
    i1166.push( i1167[i + 0] );
  }
  i1164.genericBindings = i1166
  var i1169 = i1165[1]
  var i1168 = []
  for(var i = 0; i < i1169.length; i += 1) {
    i1168.push( i1169[i + 0] );
  }
  i1164.pptrCurveMapping = i1168
  return i1164
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1170 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1171 = data
  i1170.name = i1171[0]
  var i1173 = i1171[1]
  var i1172 = []
  for(var i = 0; i < i1173.length; i += 1) {
    i1172.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1173[i + 0]) );
  }
  i1170.layers = i1172
  var i1175 = i1171[2]
  var i1174 = []
  for(var i = 0; i < i1175.length; i += 1) {
    i1174.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1175[i + 0]) );
  }
  i1170.parameters = i1174
  i1170.animationClips = i1171[3]
  i1170.avatarUnsupported = i1171[4]
  return i1170
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1179 = data
  i1178.name = i1179[0]
  i1178.defaultWeight = i1179[1]
  i1178.blendingMode = i1179[2]
  i1178.avatarMask = i1179[3]
  i1178.syncedLayerIndex = i1179[4]
  i1178.syncedLayerAffectsTiming = !!i1179[5]
  i1178.syncedLayers = i1179[6]
  i1178.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1179[7], i1178.stateMachine)
  return i1178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1181 = data
  i1180.id = i1181[0]
  i1180.name = i1181[1]
  i1180.path = i1181[2]
  var i1183 = i1181[3]
  var i1182 = []
  for(var i = 0; i < i1183.length; i += 1) {
    i1182.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1183[i + 0]) );
  }
  i1180.states = i1182
  var i1185 = i1181[4]
  var i1184 = []
  for(var i = 0; i < i1185.length; i += 1) {
    i1184.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1185[i + 0]) );
  }
  i1180.machines = i1184
  var i1187 = i1181[5]
  var i1186 = []
  for(var i = 0; i < i1187.length; i += 1) {
    i1186.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1187[i + 0]) );
  }
  i1180.entryStateTransitions = i1186
  var i1189 = i1181[6]
  var i1188 = []
  for(var i = 0; i < i1189.length; i += 1) {
    i1188.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1189[i + 0]) );
  }
  i1180.exitStateTransitions = i1188
  var i1191 = i1181[7]
  var i1190 = []
  for(var i = 0; i < i1191.length; i += 1) {
    i1190.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1191[i + 0]) );
  }
  i1180.anyStateTransitions = i1190
  i1180.defaultStateId = i1181[8]
  return i1180
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1195 = data
  i1194.id = i1195[0]
  i1194.name = i1195[1]
  i1194.cycleOffset = i1195[2]
  i1194.cycleOffsetParameter = i1195[3]
  i1194.cycleOffsetParameterActive = !!i1195[4]
  i1194.mirror = !!i1195[5]
  i1194.mirrorParameter = i1195[6]
  i1194.mirrorParameterActive = !!i1195[7]
  i1194.motionId = i1195[8]
  i1194.nameHash = i1195[9]
  i1194.fullPathHash = i1195[10]
  i1194.speed = i1195[11]
  i1194.speedParameter = i1195[12]
  i1194.speedParameterActive = !!i1195[13]
  i1194.tag = i1195[14]
  i1194.tagHash = i1195[15]
  i1194.writeDefaultValues = !!i1195[16]
  var i1197 = i1195[17]
  var i1196 = []
  for(var i = 0; i < i1197.length; i += 2) {
  request.r(i1197[i + 0], i1197[i + 1], 2, i1196, '')
  }
  i1194.behaviours = i1196
  var i1199 = i1195[18]
  var i1198 = []
  for(var i = 0; i < i1199.length; i += 1) {
    i1198.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1199[i + 0]) );
  }
  i1194.transitions = i1198
  return i1194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1204 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1205 = data
  i1204.fullPath = i1205[0]
  i1204.canTransitionToSelf = !!i1205[1]
  i1204.duration = i1205[2]
  i1204.exitTime = i1205[3]
  i1204.hasExitTime = !!i1205[4]
  i1204.hasFixedDuration = !!i1205[5]
  i1204.interruptionSource = i1205[6]
  i1204.offset = i1205[7]
  i1204.orderedInterruption = !!i1205[8]
  i1204.destinationStateId = i1205[9]
  i1204.isExit = !!i1205[10]
  i1204.mute = !!i1205[11]
  i1204.solo = !!i1205[12]
  var i1207 = i1205[13]
  var i1206 = []
  for(var i = 0; i < i1207.length; i += 1) {
    i1206.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1207[i + 0]) );
  }
  i1204.conditions = i1206
  return i1204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1212 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1213 = data
  i1212.destinationStateId = i1213[0]
  i1212.isExit = !!i1213[1]
  i1212.mute = !!i1213[2]
  i1212.solo = !!i1213[3]
  var i1215 = i1213[4]
  var i1214 = []
  for(var i = 0; i < i1215.length; i += 1) {
    i1214.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1215[i + 0]) );
  }
  i1212.conditions = i1214
  return i1212
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1218 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1219 = data
  i1218.defaultBool = !!i1219[0]
  i1218.defaultFloat = i1219[1]
  i1218.defaultInt = i1219[2]
  i1218.name = i1219[3]
  i1218.nameHash = i1219[4]
  i1218.type = i1219[5]
  return i1218
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1223 = data
  i1222.mode = i1223[0]
  i1222.parameter = i1223[1]
  i1222.threshold = i1223[2]
  return i1222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1224 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1225 = data
  i1224.name = i1225[0]
  i1224.bytes64 = i1225[1]
  i1224.data = i1225[2]
  return i1224
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1226 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1227 = data
  i1226.normalStyle = i1227[0]
  i1226.normalSpacingOffset = i1227[1]
  i1226.boldStyle = i1227[2]
  i1226.boldSpacing = i1227[3]
  i1226.italicStyle = i1227[4]
  i1226.tabSize = i1227[5]
  request.r(i1227[6], i1227[7], 0, i1226, 'atlas')
  i1226.m_SourceFontFileGUID = i1227[8]
  i1226.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1227[9], i1226.m_CreationSettings)
  request.r(i1227[10], i1227[11], 0, i1226, 'm_SourceFontFile')
  i1226.m_SourceFontFilePath = i1227[12]
  i1226.m_AtlasPopulationMode = i1227[13]
  i1226.InternalDynamicOS = !!i1227[14]
  var i1229 = i1227[15]
  var i1228 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1229.length; i += 1) {
    i1228.add(request.d('UnityEngine.TextCore.Glyph', i1229[i + 0]));
  }
  i1226.m_GlyphTable = i1228
  var i1231 = i1227[16]
  var i1230 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1231.length; i += 1) {
    i1230.add(request.d('TMPro.TMP_Character', i1231[i + 0]));
  }
  i1226.m_CharacterTable = i1230
  var i1233 = i1227[17]
  var i1232 = []
  for(var i = 0; i < i1233.length; i += 2) {
  request.r(i1233[i + 0], i1233[i + 1], 2, i1232, '')
  }
  i1226.m_AtlasTextures = i1232
  i1226.m_AtlasTextureIndex = i1227[18]
  i1226.m_IsMultiAtlasTexturesEnabled = !!i1227[19]
  i1226.m_GetFontFeatures = !!i1227[20]
  i1226.m_ClearDynamicDataOnBuild = !!i1227[21]
  i1226.m_AtlasWidth = i1227[22]
  i1226.m_AtlasHeight = i1227[23]
  i1226.m_AtlasPadding = i1227[24]
  i1226.m_AtlasRenderMode = i1227[25]
  var i1235 = i1227[26]
  var i1234 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1235.length; i += 1) {
    i1234.add(request.d('UnityEngine.TextCore.GlyphRect', i1235[i + 0]));
  }
  i1226.m_UsedGlyphRects = i1234
  var i1237 = i1227[27]
  var i1236 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1237.length; i += 1) {
    i1236.add(request.d('UnityEngine.TextCore.GlyphRect', i1237[i + 0]));
  }
  i1226.m_FreeGlyphRects = i1236
  i1226.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1227[28], i1226.m_FontFeatureTable)
  i1226.m_ShouldReimportFontFeatures = !!i1227[29]
  var i1239 = i1227[30]
  var i1238 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1239.length; i += 2) {
  request.r(i1239[i + 0], i1239[i + 1], 1, i1238, '')
  }
  i1226.m_FallbackFontAssetTable = i1238
  var i1241 = i1227[31]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('TMPro.TMP_FontWeightPair', i1241[i + 0]) );
  }
  i1226.m_FontWeightTable = i1240
  var i1243 = i1227[32]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( request.d('TMPro.TMP_FontWeightPair', i1243[i + 0]) );
  }
  i1226.fontWeights = i1242
  i1226.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1227[33], i1226.m_fontInfo)
  var i1245 = i1227[34]
  var i1244 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1245.length; i += 1) {
    i1244.add(request.d('TMPro.TMP_Glyph', i1245[i + 0]));
  }
  i1226.m_glyphInfoList = i1244
  i1226.m_KerningTable = request.d('TMPro.KerningTable', i1227[35], i1226.m_KerningTable)
  var i1247 = i1227[36]
  var i1246 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1247.length; i += 2) {
  request.r(i1247[i + 0], i1247[i + 1], 1, i1246, '')
  }
  i1226.fallbackFontAssets = i1246
  i1226.m_Version = i1227[37]
  i1226.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1227[38], i1226.m_FaceInfo)
  request.r(i1227[39], i1227[40], 0, i1226, 'm_Material')
  return i1226
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1248 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1249 = data
  i1248.sourceFontFileName = i1249[0]
  i1248.sourceFontFileGUID = i1249[1]
  i1248.faceIndex = i1249[2]
  i1248.pointSizeSamplingMode = i1249[3]
  i1248.pointSize = i1249[4]
  i1248.padding = i1249[5]
  i1248.paddingMode = i1249[6]
  i1248.packingMode = i1249[7]
  i1248.atlasWidth = i1249[8]
  i1248.atlasHeight = i1249[9]
  i1248.characterSetSelectionMode = i1249[10]
  i1248.characterSequence = i1249[11]
  i1248.referencedFontAssetGUID = i1249[12]
  i1248.referencedTextAssetGUID = i1249[13]
  i1248.fontStyle = i1249[14]
  i1248.fontStyleModifier = i1249[15]
  i1248.renderMode = i1249[16]
  i1248.includeFontFeatures = !!i1249[17]
  return i1248
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1252 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1253 = data
  i1252.m_Index = i1253[0]
  i1252.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1253[1], i1252.m_Metrics)
  i1252.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1253[2], i1252.m_GlyphRect)
  i1252.m_Scale = i1253[3]
  i1252.m_AtlasIndex = i1253[4]
  i1252.m_ClassDefinitionType = i1253[5]
  return i1252
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1254 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1255 = data
  i1254.m_Width = i1255[0]
  i1254.m_Height = i1255[1]
  i1254.m_HorizontalBearingX = i1255[2]
  i1254.m_HorizontalBearingY = i1255[3]
  i1254.m_HorizontalAdvance = i1255[4]
  return i1254
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1256 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1257 = data
  i1256.m_X = i1257[0]
  i1256.m_Y = i1257[1]
  i1256.m_Width = i1257[2]
  i1256.m_Height = i1257[3]
  return i1256
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1260 = root || request.c( 'TMPro.TMP_Character' )
  var i1261 = data
  i1260.m_ElementType = i1261[0]
  i1260.m_Unicode = i1261[1]
  i1260.m_GlyphIndex = i1261[2]
  i1260.m_Scale = i1261[3]
  return i1260
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1266 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1267 = data
  var i1269 = i1267[0]
  var i1268 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1269.length; i += 1) {
    i1268.add(request.d('TMPro.MultipleSubstitutionRecord', i1269[i + 0]));
  }
  i1266.m_MultipleSubstitutionRecords = i1268
  var i1271 = i1267[1]
  var i1270 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1271.length; i += 1) {
    i1270.add(request.d('TMPro.LigatureSubstitutionRecord', i1271[i + 0]));
  }
  i1266.m_LigatureSubstitutionRecords = i1270
  var i1273 = i1267[2]
  var i1272 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1273.length; i += 1) {
    i1272.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1273[i + 0]));
  }
  i1266.m_GlyphPairAdjustmentRecords = i1272
  var i1275 = i1267[3]
  var i1274 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1275.length; i += 1) {
    i1274.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1275[i + 0]));
  }
  i1266.m_MarkToBaseAdjustmentRecords = i1274
  var i1277 = i1267[4]
  var i1276 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1277.length; i += 1) {
    i1276.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1277[i + 0]));
  }
  i1266.m_MarkToMarkAdjustmentRecords = i1276
  return i1266
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1280 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1281 = data
  i1280.m_TargetGlyphID = i1281[0]
  i1280.m_SubstituteGlyphIDs = i1281[1]
  return i1280
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1284 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1285 = data
  i1284.m_ComponentGlyphIDs = i1285[0]
  i1284.m_LigatureGlyphID = i1285[1]
  return i1284
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1288 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1289 = data
  i1288.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1289[0], i1288.m_FirstAdjustmentRecord)
  i1288.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1289[1], i1288.m_SecondAdjustmentRecord)
  i1288.m_FeatureLookupFlags = i1289[2]
  return i1288
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1290 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1291 = data
  i1290.m_GlyphIndex = i1291[0]
  i1290.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1291[1], i1290.m_GlyphValueRecord)
  return i1290
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1292 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1293 = data
  i1292.m_XPlacement = i1293[0]
  i1292.m_YPlacement = i1293[1]
  i1292.m_XAdvance = i1293[2]
  i1292.m_YAdvance = i1293[3]
  return i1292
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1296 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1297 = data
  i1296.m_BaseGlyphID = i1297[0]
  i1296.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1297[1], i1296.m_BaseGlyphAnchorPoint)
  i1296.m_MarkGlyphID = i1297[2]
  i1296.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1297[3], i1296.m_MarkPositionAdjustment)
  return i1296
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1300 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1301 = data
  i1300.m_BaseMarkGlyphID = i1301[0]
  i1300.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1301[1], i1300.m_BaseMarkGlyphAnchorPoint)
  i1300.m_CombiningMarkGlyphID = i1301[2]
  i1300.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1301[3], i1300.m_CombiningMarkPositionAdjustment)
  return i1300
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1306 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1307 = data
  request.r(i1307[0], i1307[1], 0, i1306, 'regularTypeface')
  request.r(i1307[2], i1307[3], 0, i1306, 'italicTypeface')
  return i1306
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1308 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1309 = data
  i1308.Name = i1309[0]
  i1308.PointSize = i1309[1]
  i1308.Scale = i1309[2]
  i1308.CharacterCount = i1309[3]
  i1308.LineHeight = i1309[4]
  i1308.Baseline = i1309[5]
  i1308.Ascender = i1309[6]
  i1308.CapHeight = i1309[7]
  i1308.Descender = i1309[8]
  i1308.CenterLine = i1309[9]
  i1308.SuperscriptOffset = i1309[10]
  i1308.SubscriptOffset = i1309[11]
  i1308.SubSize = i1309[12]
  i1308.Underline = i1309[13]
  i1308.UnderlineThickness = i1309[14]
  i1308.strikethrough = i1309[15]
  i1308.strikethroughThickness = i1309[16]
  i1308.TabWidth = i1309[17]
  i1308.Padding = i1309[18]
  i1308.AtlasWidth = i1309[19]
  i1308.AtlasHeight = i1309[20]
  return i1308
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1312 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1313 = data
  i1312.id = i1313[0]
  i1312.x = i1313[1]
  i1312.y = i1313[2]
  i1312.width = i1313[3]
  i1312.height = i1313[4]
  i1312.xOffset = i1313[5]
  i1312.yOffset = i1313[6]
  i1312.xAdvance = i1313[7]
  i1312.scale = i1313[8]
  return i1312
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1314 = root || request.c( 'TMPro.KerningTable' )
  var i1315 = data
  var i1317 = i1315[0]
  var i1316 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1317.length; i += 1) {
    i1316.add(request.d('TMPro.KerningPair', i1317[i + 0]));
  }
  i1314.kerningPairs = i1316
  return i1314
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1320 = root || request.c( 'TMPro.KerningPair' )
  var i1321 = data
  i1320.xOffset = i1321[0]
  i1320.m_FirstGlyph = i1321[1]
  i1320.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1321[2], i1320.m_FirstGlyphAdjustments)
  i1320.m_SecondGlyph = i1321[3]
  i1320.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1321[4], i1320.m_SecondGlyphAdjustments)
  i1320.m_IgnoreSpacingAdjustments = !!i1321[5]
  return i1320
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1322 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1323 = data
  i1322.m_FaceIndex = i1323[0]
  i1322.m_FamilyName = i1323[1]
  i1322.m_StyleName = i1323[2]
  i1322.m_PointSize = i1323[3]
  i1322.m_Scale = i1323[4]
  i1322.m_UnitsPerEM = i1323[5]
  i1322.m_LineHeight = i1323[6]
  i1322.m_AscentLine = i1323[7]
  i1322.m_CapLine = i1323[8]
  i1322.m_MeanLine = i1323[9]
  i1322.m_Baseline = i1323[10]
  i1322.m_DescentLine = i1323[11]
  i1322.m_SuperscriptOffset = i1323[12]
  i1322.m_SuperscriptSize = i1323[13]
  i1322.m_SubscriptOffset = i1323[14]
  i1322.m_SubscriptSize = i1323[15]
  i1322.m_UnderlineOffset = i1323[16]
  i1322.m_UnderlineThickness = i1323[17]
  i1322.m_StrikethroughOffset = i1323[18]
  i1322.m_StrikethroughThickness = i1323[19]
  i1322.m_TabWidth = i1323[20]
  return i1322
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1324 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1325 = data
  i1324.useSafeMode = !!i1325[0]
  i1324.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1325[1], i1324.safeModeOptions)
  i1324.timeScale = i1325[2]
  i1324.unscaledTimeScale = i1325[3]
  i1324.useSmoothDeltaTime = !!i1325[4]
  i1324.maxSmoothUnscaledTime = i1325[5]
  i1324.rewindCallbackMode = i1325[6]
  i1324.showUnityEditorReport = !!i1325[7]
  i1324.logBehaviour = i1325[8]
  i1324.drawGizmos = !!i1325[9]
  i1324.defaultRecyclable = !!i1325[10]
  i1324.defaultAutoPlay = i1325[11]
  i1324.defaultUpdateType = i1325[12]
  i1324.defaultTimeScaleIndependent = !!i1325[13]
  i1324.defaultEaseType = i1325[14]
  i1324.defaultEaseOvershootOrAmplitude = i1325[15]
  i1324.defaultEasePeriod = i1325[16]
  i1324.defaultAutoKill = !!i1325[17]
  i1324.defaultLoopType = i1325[18]
  i1324.debugMode = !!i1325[19]
  i1324.debugStoreTargetId = !!i1325[20]
  i1324.showPreviewPanel = !!i1325[21]
  i1324.storeSettingsLocation = i1325[22]
  i1324.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1325[23], i1324.modules)
  i1324.createASMDEF = !!i1325[24]
  i1324.showPlayingTweens = !!i1325[25]
  i1324.showPausedTweens = !!i1325[26]
  return i1324
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1326 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1327 = data
  i1326.logBehaviour = i1327[0]
  i1326.nestedTweenFailureBehaviour = i1327[1]
  return i1326
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1328 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1329 = data
  i1328.showPanel = !!i1329[0]
  i1328.audioEnabled = !!i1329[1]
  i1328.physicsEnabled = !!i1329[2]
  i1328.physics2DEnabled = !!i1329[3]
  i1328.spriteEnabled = !!i1329[4]
  i1328.uiEnabled = !!i1329[5]
  i1328.textMeshProEnabled = !!i1329[6]
  i1328.tk2DEnabled = !!i1329[7]
  i1328.deAudioEnabled = !!i1329[8]
  i1328.deUnityExtendedEnabled = !!i1329[9]
  i1328.epoOutlineEnabled = !!i1329[10]
  return i1328
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1330 = root || request.c( 'TMPro.TMP_Settings' )
  var i1331 = data
  i1330.assetVersion = i1331[0]
  i1330.m_TextWrappingMode = i1331[1]
  i1330.m_enableKerning = !!i1331[2]
  var i1333 = i1331[3]
  var i1332 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1333.length; i += 1) {
    i1332.add(i1333[i + 0]);
  }
  i1330.m_ActiveFontFeatures = i1332
  i1330.m_enableExtraPadding = !!i1331[4]
  i1330.m_enableTintAllSprites = !!i1331[5]
  i1330.m_enableParseEscapeCharacters = !!i1331[6]
  i1330.m_EnableRaycastTarget = !!i1331[7]
  i1330.m_GetFontFeaturesAtRuntime = !!i1331[8]
  i1330.m_missingGlyphCharacter = i1331[9]
  i1330.m_ClearDynamicDataOnBuild = !!i1331[10]
  i1330.m_warningsDisabled = !!i1331[11]
  request.r(i1331[12], i1331[13], 0, i1330, 'm_defaultFontAsset')
  i1330.m_defaultFontAssetPath = i1331[14]
  i1330.m_defaultFontSize = i1331[15]
  i1330.m_defaultAutoSizeMinRatio = i1331[16]
  i1330.m_defaultAutoSizeMaxRatio = i1331[17]
  i1330.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1331[18], i1331[19] )
  i1330.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1331[20], i1331[21] )
  i1330.m_autoSizeTextContainer = !!i1331[22]
  i1330.m_IsTextObjectScaleStatic = !!i1331[23]
  var i1335 = i1331[24]
  var i1334 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1335.length; i += 2) {
  request.r(i1335[i + 0], i1335[i + 1], 1, i1334, '')
  }
  i1330.m_fallbackFontAssets = i1334
  i1330.m_matchMaterialPreset = !!i1331[25]
  i1330.m_HideSubTextObjects = !!i1331[26]
  request.r(i1331[27], i1331[28], 0, i1330, 'm_defaultSpriteAsset')
  i1330.m_defaultSpriteAssetPath = i1331[29]
  i1330.m_enableEmojiSupport = !!i1331[30]
  i1330.m_MissingCharacterSpriteUnicode = i1331[31]
  var i1337 = i1331[32]
  var i1336 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1337.length; i += 2) {
  request.r(i1337[i + 0], i1337[i + 1], 1, i1336, '')
  }
  i1330.m_EmojiFallbackTextAssets = i1336
  i1330.m_defaultColorGradientPresetsPath = i1331[33]
  request.r(i1331[34], i1331[35], 0, i1330, 'm_defaultStyleSheet')
  i1330.m_StyleSheetsResourcePath = i1331[36]
  request.r(i1331[37], i1331[38], 0, i1330, 'm_leadingCharacters')
  request.r(i1331[39], i1331[40], 0, i1330, 'm_followingCharacters')
  i1330.m_UseModernHangulLineBreakingRules = !!i1331[41]
  return i1330
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1340 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1341 = data
  request.r(i1341[0], i1341[1], 0, i1340, 'spriteSheet')
  var i1343 = i1341[2]
  var i1342 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1343.length; i += 1) {
    i1342.add(request.d('TMPro.TMP_Sprite', i1343[i + 0]));
  }
  i1340.spriteInfoList = i1342
  var i1345 = i1341[3]
  var i1344 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1345.length; i += 2) {
  request.r(i1345[i + 0], i1345[i + 1], 1, i1344, '')
  }
  i1340.fallbackSpriteAssets = i1344
  var i1347 = i1341[4]
  var i1346 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1347.length; i += 1) {
    i1346.add(request.d('TMPro.TMP_SpriteCharacter', i1347[i + 0]));
  }
  i1340.m_SpriteCharacterTable = i1346
  var i1349 = i1341[5]
  var i1348 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1349.length; i += 1) {
    i1348.add(request.d('TMPro.TMP_SpriteGlyph', i1349[i + 0]));
  }
  i1340.m_GlyphTable = i1348
  i1340.m_Version = i1341[6]
  i1340.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1341[7], i1340.m_FaceInfo)
  request.r(i1341[8], i1341[9], 0, i1340, 'm_Material')
  return i1340
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1352 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1353 = data
  i1352.name = i1353[0]
  i1352.hashCode = i1353[1]
  i1352.unicode = i1353[2]
  i1352.pivot = new pc.Vec2( i1353[3], i1353[4] )
  request.r(i1353[5], i1353[6], 0, i1352, 'sprite')
  i1352.id = i1353[7]
  i1352.x = i1353[8]
  i1352.y = i1353[9]
  i1352.width = i1353[10]
  i1352.height = i1353[11]
  i1352.xOffset = i1353[12]
  i1352.yOffset = i1353[13]
  i1352.xAdvance = i1353[14]
  i1352.scale = i1353[15]
  return i1352
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1358 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1359 = data
  i1358.m_Name = i1359[0]
  i1358.m_ElementType = i1359[1]
  i1358.m_Unicode = i1359[2]
  i1358.m_GlyphIndex = i1359[3]
  i1358.m_Scale = i1359[4]
  return i1358
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1362 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1363 = data
  request.r(i1363[0], i1363[1], 0, i1362, 'sprite')
  i1362.m_Index = i1363[2]
  i1362.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1363[3], i1362.m_Metrics)
  i1362.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1363[4], i1362.m_GlyphRect)
  i1362.m_Scale = i1363[5]
  i1362.m_AtlasIndex = i1363[6]
  i1362.m_ClassDefinitionType = i1363[7]
  return i1362
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1364 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1365 = data
  var i1367 = i1365[0]
  var i1366 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1367.length; i += 1) {
    i1366.add(request.d('TMPro.TMP_Style', i1367[i + 0]));
  }
  i1364.m_StyleList = i1366
  return i1364
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1370 = root || request.c( 'TMPro.TMP_Style' )
  var i1371 = data
  i1370.m_Name = i1371[0]
  i1370.m_HashCode = i1371[1]
  i1370.m_OpeningDefinition = i1371[2]
  i1370.m_ClosingDefinition = i1371[3]
  i1370.m_OpeningTagArray = i1371[4]
  i1370.m_ClosingTagArray = i1371[5]
  return i1370
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1373 = data
  var i1375 = i1373[0]
  var i1374 = []
  for(var i = 0; i < i1375.length; i += 1) {
    i1374.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1375[i + 0]) );
  }
  i1372.files = i1374
  i1372.componentToPrefabIds = i1373[1]
  return i1372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1378 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1379 = data
  i1378.path = i1379[0]
  request.r(i1379[1], i1379[2], 0, i1378, 'unityObject')
  return i1378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1381 = data
  var i1383 = i1381[0]
  var i1382 = []
  for(var i = 0; i < i1383.length; i += 1) {
    i1382.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1383[i + 0]) );
  }
  i1380.scriptsExecutionOrder = i1382
  var i1385 = i1381[1]
  var i1384 = []
  for(var i = 0; i < i1385.length; i += 1) {
    i1384.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1385[i + 0]) );
  }
  i1380.sortingLayers = i1384
  var i1387 = i1381[2]
  var i1386 = []
  for(var i = 0; i < i1387.length; i += 1) {
    i1386.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1387[i + 0]) );
  }
  i1380.cullingLayers = i1386
  i1380.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1381[3], i1380.timeSettings)
  i1380.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1381[4], i1380.physicsSettings)
  i1380.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1381[5], i1380.physics2DSettings)
  i1380.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1381[6], i1380.qualitySettings)
  i1380.enableRealtimeShadows = !!i1381[7]
  i1380.enableAutoInstancing = !!i1381[8]
  i1380.enableStaticBatching = !!i1381[9]
  i1380.enableDynamicBatching = !!i1381[10]
  i1380.usePreservativeDynamicBatching = !!i1381[11]
  i1380.lightmapEncodingQuality = i1381[12]
  i1380.desiredColorSpace = i1381[13]
  var i1389 = i1381[14]
  var i1388 = []
  for(var i = 0; i < i1389.length; i += 1) {
    i1388.push( i1389[i + 0] );
  }
  i1380.allTags = i1388
  return i1380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1393 = data
  i1392.name = i1393[0]
  i1392.value = i1393[1]
  return i1392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1397 = data
  i1396.id = i1397[0]
  i1396.name = i1397[1]
  i1396.value = i1397[2]
  return i1396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1400 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1401 = data
  i1400.id = i1401[0]
  i1400.name = i1401[1]
  return i1400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1403 = data
  i1402.fixedDeltaTime = i1403[0]
  i1402.maximumDeltaTime = i1403[1]
  i1402.timeScale = i1403[2]
  i1402.maximumParticleTimestep = i1403[3]
  return i1402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1405 = data
  i1404.gravity = new pc.Vec3( i1405[0], i1405[1], i1405[2] )
  i1404.defaultSolverIterations = i1405[3]
  i1404.bounceThreshold = i1405[4]
  i1404.autoSyncTransforms = !!i1405[5]
  i1404.autoSimulation = !!i1405[6]
  var i1407 = i1405[7]
  var i1406 = []
  for(var i = 0; i < i1407.length; i += 1) {
    i1406.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1407[i + 0]) );
  }
  i1404.collisionMatrix = i1406
  return i1404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1411 = data
  i1410.enabled = !!i1411[0]
  i1410.layerId = i1411[1]
  i1410.otherLayerId = i1411[2]
  return i1410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1412 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1413 = data
  request.r(i1413[0], i1413[1], 0, i1412, 'material')
  i1412.gravity = new pc.Vec2( i1413[2], i1413[3] )
  i1412.positionIterations = i1413[4]
  i1412.velocityIterations = i1413[5]
  i1412.velocityThreshold = i1413[6]
  i1412.maxLinearCorrection = i1413[7]
  i1412.maxAngularCorrection = i1413[8]
  i1412.maxTranslationSpeed = i1413[9]
  i1412.maxRotationSpeed = i1413[10]
  i1412.baumgarteScale = i1413[11]
  i1412.baumgarteTOIScale = i1413[12]
  i1412.timeToSleep = i1413[13]
  i1412.linearSleepTolerance = i1413[14]
  i1412.angularSleepTolerance = i1413[15]
  i1412.defaultContactOffset = i1413[16]
  i1412.autoSimulation = !!i1413[17]
  i1412.queriesHitTriggers = !!i1413[18]
  i1412.queriesStartInColliders = !!i1413[19]
  i1412.callbacksOnDisable = !!i1413[20]
  i1412.reuseCollisionCallbacks = !!i1413[21]
  i1412.autoSyncTransforms = !!i1413[22]
  var i1415 = i1413[23]
  var i1414 = []
  for(var i = 0; i < i1415.length; i += 1) {
    i1414.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1415[i + 0]) );
  }
  i1412.collisionMatrix = i1414
  return i1412
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1418 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1419 = data
  i1418.enabled = !!i1419[0]
  i1418.layerId = i1419[1]
  i1418.otherLayerId = i1419[2]
  return i1418
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1420 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1421 = data
  var i1423 = i1421[0]
  var i1422 = []
  for(var i = 0; i < i1423.length; i += 1) {
    i1422.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1423[i + 0]) );
  }
  i1420.qualityLevels = i1422
  var i1425 = i1421[1]
  var i1424 = []
  for(var i = 0; i < i1425.length; i += 1) {
    i1424.push( i1425[i + 0] );
  }
  i1420.names = i1424
  i1420.shadows = i1421[2]
  i1420.anisotropicFiltering = i1421[3]
  i1420.antiAliasing = i1421[4]
  i1420.lodBias = i1421[5]
  i1420.shadowCascades = i1421[6]
  i1420.shadowDistance = i1421[7]
  i1420.shadowmaskMode = i1421[8]
  i1420.shadowProjection = i1421[9]
  i1420.shadowResolution = i1421[10]
  i1420.softParticles = !!i1421[11]
  i1420.softVegetation = !!i1421[12]
  i1420.activeColorSpace = i1421[13]
  i1420.desiredColorSpace = i1421[14]
  i1420.masterTextureLimit = i1421[15]
  i1420.maxQueuedFrames = i1421[16]
  i1420.particleRaycastBudget = i1421[17]
  i1420.pixelLightCount = i1421[18]
  i1420.realtimeReflectionProbes = !!i1421[19]
  i1420.shadowCascade2Split = i1421[20]
  i1420.shadowCascade4Split = new pc.Vec3( i1421[21], i1421[22], i1421[23] )
  i1420.streamingMipmapsActive = !!i1421[24]
  i1420.vSyncCount = i1421[25]
  i1420.asyncUploadBufferSize = i1421[26]
  i1420.asyncUploadTimeSlice = i1421[27]
  i1420.billboardsFaceCameraPosition = !!i1421[28]
  i1420.shadowNearPlaneOffset = i1421[29]
  i1420.streamingMipmapsMemoryBudget = i1421[30]
  i1420.maximumLODLevel = i1421[31]
  i1420.streamingMipmapsAddAllCameras = !!i1421[32]
  i1420.streamingMipmapsMaxLevelReduction = i1421[33]
  i1420.streamingMipmapsRenderersPerFrame = i1421[34]
  i1420.resolutionScalingFixedDPIFactor = i1421[35]
  i1420.streamingMipmapsMaxFileIORequests = i1421[36]
  i1420.currentQualityLevel = i1421[37]
  return i1420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1430 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1431 = data
  i1430.weight = i1431[0]
  i1430.vertices = i1431[1]
  i1430.normals = i1431[2]
  i1430.tangents = i1431[3]
  return i1430
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1433 = data
  request.r(i1433[0], i1433[1], 0, i1432, 'm_ObjectArgument')
  i1432.m_ObjectArgumentAssemblyTypeName = i1433[2]
  i1432.m_IntArgument = i1433[3]
  i1432.m_FloatArgument = i1433[4]
  i1432.m_StringArgument = i1433[5]
  i1432.m_BoolArgument = !!i1433[6]
  return i1432
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1434 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1435 = data
  i1434.m_XCoordinate = i1435[0]
  i1434.m_YCoordinate = i1435[1]
  return i1434
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1436 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1437 = data
  i1436.m_XPositionAdjustment = i1437[0]
  i1436.m_YPositionAdjustment = i1437[1]
  return i1436
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1438 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1439 = data
  i1438.xPlacement = i1439[0]
  i1438.yPlacement = i1439[1]
  i1438.xAdvance = i1439[2]
  i1438.yAdvance = i1439[3]
  return i1438
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.Rigidbody":{"mass":0,"drag":1,"angularDrag":2,"useGravity":3,"isKinematic":4,"constraints":5,"maxAngularVelocity":6,"collisionDetectionMode":7,"interpolation":8},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.CharacterJoint":{"swingAxis":0,"twistLimitSpring":3,"swingLimitSpring":4,"lowTwistLimit":5,"highTwistLimit":6,"swing1Limit":7,"swing2Limit":8,"connectedBody":9,"axis":11,"anchor":14,"connectedAnchor":17,"autoConfigureConnectedAnchor":20,"massScale":21,"connectedMassScale":22,"enableCollision":23,"breakForce":24,"breakTorque":25},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"75":[76],"77":[76],"78":[76],"79":[76],"80":[76],"81":[76],"82":[62],"83":[21],"61":[9],"84":[9],"85":[9],"86":[9],"87":[9],"88":[9],"89":[90],"91":[90],"92":[90],"93":[90],"94":[90],"95":[90],"96":[90],"97":[90],"98":[90],"99":[90],"100":[90],"101":[90],"102":[90],"103":[21],"104":[5],"105":[106],"107":[106],"20":[19],"108":[109],"54":[9,12],"32":[19],"29":[27],"31":[19],"110":[19],"111":[9],"112":[9],"113":[114],"115":[21],"116":[117],"118":[19],"119":[5,19],"33":[19,23],"120":[19],"121":[23,19],"122":[5],"123":[23,19],"124":[19],"125":[19],"126":[19],"28":[20],"22":[23,19],"30":[19],"27":[20],"127":[19],"48":[19],"128":[19],"129":[19],"130":[19],"131":[19],"132":[19],"133":[19],"134":[19],"135":[23,19],"136":[19],"137":[19],"138":[19],"139":[19],"140":[23,19],"141":[19],"142":[50],"143":[50],"51":[50],"144":[50],"145":[21],"146":[21]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.BoxCollider","UnityEngine.SphereCollider","UnityEngine.Rigidbody","UnityEngine.MonoBehaviour","Playable.PaintballNpcMotor","UnityEngine.CapsuleCollider","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.AudioSource","Playable.MonsterController","Playable.WorldHealthBar","UnityEngine.AudioClip","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.Camera","UnityEngine.UI.Image","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.Sprite","UnityEngine.Cubemap","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","Playable.ResponsiveCanvasScaler","UnityEngine.UI.AspectRatioFitter","Playable.SafeAreaRectTransform","Playable.TouchController","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UltimateJoystick","UnityEngine.UI.Button","UnityEngine.UI.Shadow","Playable.PaintballFireButton","Playable.CameraController","Playable.ScaleHandHint","Playable.WinPanel","Playable.GameManager","Playable.AuraUI","FailPanel","UnityEngine.CanvasGroup","Playable.HeroSelectionPanel","Playable.HeroCardView","UnityEngine.UI.GridLayoutGroup","UnityEngine.GameObject","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Playable.AudioManager","Playable.GameController","Playable.PlayerController","UnityEngine.AudioListener","Playable.PlayerPaintballController","Playable.PaintballProjectile","Playable.HeroRoster","Playable.PlayerSkinSwitcher","Playable.PlayerHealth","UnityEngine.CharacterJoint","UnityEngine.SkinnedMeshRenderer","Playable.LunaController","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","Playable.CombatTutorialController","Playable.MonsterHeroFlowController","UnityEngine.Light","UnityEngine.MeshCollider","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","SetupMaterialTiling","UnityEngine.Renderer","Playable.SwipeHandHint","TankAndHealerStudioAssets.RelativeCameraRotationExample","TankAndHealerStudioAssets.TapCountExample","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.60f1";

Deserializers.productName = "Minecraft Clone";

Deserializers.lunaInitializationTime = "";

Deserializers.lunaDaysRunning = "111.3";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "C1_2610_HuyNQ_CCPW_V03_AnhPP";

Deserializers.lunaAppID = "42155";

Deserializers.projectId = "e0c7d7b99f381904ba55b26de53e9500";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.9\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "True";

Deserializers.isRuntimeAnalysisEnabledForCode = "True";

Deserializers.runtimeAnalysisExcludedClassesCount = "1584";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5082";

Deserializers.runtimeAnalysisExcludedModules = "";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "True";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.Minecraft-Clone";

Deserializers.disableAntiAliasing = false;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "97c1f9fc-a468-4527-a048-f4bdea331a6f";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["Unity","AI","Assistant","Utils","MainThread","InitializeOnRuntime"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["Unity","AI","Toolkit","Accounts","Services","Core","HttpClientManager","Initialize"],["GLTFast","Export","MetaMaterialExportBuiltIn","ResetStaticsOnLoad"],["GLTFast","Export","NormalImageExport","ResetStaticsOnLoad"],["GLTFast","Export","OrmImageExport","ResetStaticsOnLoad"],["GLTFast","Export","MaterialExport","ResetStaticsOnLoad"],["GLTFast","Export","ImageExport","ResetStaticsOnLoad"],["GLTFast","RenderPipelineUtils","ResetStaticsOnLoad"],["GLTFast","GltfImportBase","ResetStaticsOnLoad"],["GLTFast","Materials","MaterialGenerator","ResetStaticsOnLoad"],["GLTFast","Addons","ImportAddonRegistry","ResetStaticsOnLoad"],["GLTFast","GltfImport","ResetStaticsOnLoad"],["GLTFast","Materials","BuiltInMaterialGenerator","ResetStaticsOnLoad"],["GLTFast","Jobs","CachedFunction","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

