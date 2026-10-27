var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1704 = root || request.c( 'UnityEngine.JointSpring' )
  var i1705 = data
  i1704.spring = i1705[0]
  i1704.damper = i1705[1]
  i1704.targetPosition = i1705[2]
  return i1704
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1706 = root || request.c( 'UnityEngine.JointMotor' )
  var i1707 = data
  i1706.m_TargetVelocity = i1707[0]
  i1706.m_Force = i1707[1]
  i1706.m_FreeSpin = i1707[2]
  return i1706
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1708 = root || request.c( 'UnityEngine.JointLimits' )
  var i1709 = data
  i1708.m_Min = i1709[0]
  i1708.m_Max = i1709[1]
  i1708.m_Bounciness = i1709[2]
  i1708.m_BounceMinVelocity = i1709[3]
  i1708.m_ContactDistance = i1709[4]
  i1708.minBounce = i1709[5]
  i1708.maxBounce = i1709[6]
  return i1708
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1710 = root || request.c( 'UnityEngine.JointDrive' )
  var i1711 = data
  i1710.m_PositionSpring = i1711[0]
  i1710.m_PositionDamper = i1711[1]
  i1710.m_MaximumForce = i1711[2]
  i1710.m_UseAcceleration = i1711[3]
  return i1710
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1712 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1713 = data
  i1712.m_Spring = i1713[0]
  i1712.m_Damper = i1713[1]
  return i1712
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1714 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1715 = data
  i1714.m_Limit = i1715[0]
  i1714.m_Bounciness = i1715[1]
  i1714.m_ContactDistance = i1715[2]
  return i1714
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1716 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1717 = data
  i1716.m_ExtremumSlip = i1717[0]
  i1716.m_ExtremumValue = i1717[1]
  i1716.m_AsymptoteSlip = i1717[2]
  i1716.m_AsymptoteValue = i1717[3]
  i1716.m_Stiffness = i1717[4]
  return i1716
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1718 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1719 = data
  i1718.m_LowerAngle = i1719[0]
  i1718.m_UpperAngle = i1719[1]
  return i1718
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1720 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1721 = data
  i1720.m_MotorSpeed = i1721[0]
  i1720.m_MaximumMotorTorque = i1721[1]
  return i1720
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1722 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1723 = data
  i1722.m_DampingRatio = i1723[0]
  i1722.m_Frequency = i1723[1]
  i1722.m_Angle = i1723[2]
  return i1722
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1724 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1725 = data
  i1724.m_LowerTranslation = i1725[0]
  i1724.m_UpperTranslation = i1725[1]
  return i1724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1726 = root || new pc.UnityMaterial()
  var i1727 = data
  i1726.name = i1727[0]
  request.r(i1727[1], i1727[2], 0, i1726, 'shader')
  i1726.renderQueue = i1727[3]
  i1726.enableInstancing = !!i1727[4]
  var i1729 = i1727[5]
  var i1728 = []
  for(var i = 0; i < i1729.length; i += 1) {
    i1728.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1729[i + 0]) );
  }
  i1726.floatParameters = i1728
  var i1731 = i1727[6]
  var i1730 = []
  for(var i = 0; i < i1731.length; i += 1) {
    i1730.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1731[i + 0]) );
  }
  i1726.colorParameters = i1730
  var i1733 = i1727[7]
  var i1732 = []
  for(var i = 0; i < i1733.length; i += 1) {
    i1732.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1733[i + 0]) );
  }
  i1726.vectorParameters = i1732
  var i1735 = i1727[8]
  var i1734 = []
  for(var i = 0; i < i1735.length; i += 1) {
    i1734.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1735[i + 0]) );
  }
  i1726.textureParameters = i1734
  var i1737 = i1727[9]
  var i1736 = []
  for(var i = 0; i < i1737.length; i += 1) {
    i1736.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1737[i + 0]) );
  }
  i1726.materialFlags = i1736
  return i1726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1740 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1741 = data
  i1740.name = i1741[0]
  i1740.value = i1741[1]
  return i1740
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1745 = data
  i1744.name = i1745[0]
  i1744.value = new pc.Color(i1745[1], i1745[2], i1745[3], i1745[4])
  return i1744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1748 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1749 = data
  i1748.name = i1749[0]
  i1748.value = new pc.Vec4( i1749[1], i1749[2], i1749[3], i1749[4] )
  return i1748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1752 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1753 = data
  i1752.name = i1753[0]
  request.r(i1753[1], i1753[2], 0, i1752, 'value')
  return i1752
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1756 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1757 = data
  i1756.name = i1757[0]
  i1756.enabled = !!i1757[1]
  return i1756
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i1758 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i1759 = data
  i1758.position = new pc.Vec3( i1759[0], i1759[1], i1759[2] )
  i1758.scale = new pc.Vec3( i1759[3], i1759[4], i1759[5] )
  i1758.rotation = new pc.Quat(i1759[6], i1759[7], i1759[8], i1759[9])
  return i1758
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i1760 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i1761 = data
  request.r(i1761[0], i1761[1], 0, i1760, 'animatorController')
  request.r(i1761[2], i1761[3], 0, i1760, 'avatar')
  i1760.updateMode = i1761[4]
  i1760.hasTransformHierarchy = !!i1761[5]
  i1760.applyRootMotion = !!i1761[6]
  var i1763 = i1761[7]
  var i1762 = []
  for(var i = 0; i < i1763.length; i += 2) {
  request.r(i1763[i + 0], i1763[i + 1], 2, i1762, '')
  }
  i1760.humanBones = i1762
  i1760.enabled = !!i1761[8]
  return i1760
}

Deserializers["BuildPlayerVisual"] = function (request, data, root) {
  var i1766 = root || request.c( 'BuildPlayerVisual' )
  var i1767 = data
  request.r(i1767[0], i1767[1], 0, i1766, 'animator')
  var i1769 = i1767[2]
  var i1768 = []
  for(var i = 0; i < i1769.length; i += 2) {
  request.r(i1769[i + 0], i1769[i + 1], 2, i1768, '')
  }
  i1766.body = i1768
  return i1766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1773 = data
  i1772.name = i1773[0]
  i1772.tagId = i1773[1]
  i1772.enabled = !!i1773[2]
  i1772.isStatic = !!i1773[3]
  i1772.layer = i1773[4]
  return i1772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i1774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i1775 = data
  request.r(i1775[0], i1775[1], 0, i1774, 'sharedMesh')
  var i1777 = i1775[2]
  var i1776 = []
  for(var i = 0; i < i1777.length; i += 2) {
  request.r(i1777[i + 0], i1777[i + 1], 2, i1776, '')
  }
  i1774.bones = i1776
  i1774.updateWhenOffscreen = !!i1775[3]
  i1774.localBounds = i1775[4]
  request.r(i1775[5], i1775[6], 0, i1774, 'rootBone')
  var i1779 = i1775[7]
  var i1778 = []
  for(var i = 0; i < i1779.length; i += 1) {
    i1778.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i1779[i + 0]) );
  }
  i1774.blendShapesWeights = i1778
  i1774.enabled = !!i1775[8]
  request.r(i1775[9], i1775[10], 0, i1774, 'sharedMaterial')
  var i1781 = i1775[11]
  var i1780 = []
  for(var i = 0; i < i1781.length; i += 2) {
  request.r(i1781[i + 0], i1781[i + 1], 2, i1780, '')
  }
  i1774.sharedMaterials = i1780
  i1774.receiveShadows = !!i1775[12]
  i1774.shadowCastingMode = i1775[13]
  i1774.sortingLayerID = i1775[14]
  i1774.sortingOrder = i1775[15]
  i1774.lightmapIndex = i1775[16]
  i1774.lightmapSceneIndex = i1775[17]
  i1774.lightmapScaleOffset = new pc.Vec4( i1775[18], i1775[19], i1775[20], i1775[21] )
  i1774.lightProbeUsage = i1775[22]
  i1774.reflectionProbeUsage = i1775[23]
  return i1774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i1784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i1785 = data
  i1784.weight = i1785[0]
  return i1784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1788 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1789 = data
  i1788.name = i1789[0]
  i1788.width = i1789[1]
  i1788.height = i1789[2]
  i1788.mipmapCount = i1789[3]
  i1788.anisoLevel = i1789[4]
  i1788.filterMode = i1789[5]
  i1788.hdr = !!i1789[6]
  i1788.format = i1789[7]
  i1788.wrapMode = i1789[8]
  i1788.alphaIsTransparency = !!i1789[9]
  i1788.alphaSource = i1789[10]
  i1788.graphicsFormat = i1789[11]
  i1788.sRGBTexture = !!i1789[12]
  i1788.desiredColorSpace = i1789[13]
  i1788.wrapU = i1789[14]
  i1788.wrapV = i1789[15]
  return i1788
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1791 = data
  i1790.name = i1791[0]
  i1790.halfPrecision = !!i1791[1]
  i1790.useSimplification = !!i1791[2]
  i1790.useUInt32IndexFormat = !!i1791[3]
  i1790.vertexCount = i1791[4]
  i1790.aabb = i1791[5]
  var i1793 = i1791[6]
  var i1792 = []
  for(var i = 0; i < i1793.length; i += 1) {
    i1792.push( !!i1793[i + 0] );
  }
  i1790.streams = i1792
  i1790.vertices = i1791[7]
  var i1795 = i1791[8]
  var i1794 = []
  for(var i = 0; i < i1795.length; i += 1) {
    i1794.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1795[i + 0]) );
  }
  i1790.subMeshes = i1794
  var i1797 = i1791[9]
  var i1796 = []
  for(var i = 0; i < i1797.length; i += 16) {
    i1796.push( new pc.Mat4().setData(i1797[i + 0], i1797[i + 1], i1797[i + 2], i1797[i + 3],  i1797[i + 4], i1797[i + 5], i1797[i + 6], i1797[i + 7],  i1797[i + 8], i1797[i + 9], i1797[i + 10], i1797[i + 11],  i1797[i + 12], i1797[i + 13], i1797[i + 14], i1797[i + 15]) );
  }
  i1790.bindposes = i1796
  var i1799 = i1791[10]
  var i1798 = []
  for(var i = 0; i < i1799.length; i += 1) {
    i1798.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1799[i + 0]) );
  }
  i1790.blendShapes = i1798
  return i1790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1805 = data
  i1804.triangles = i1805[0]
  return i1804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1811 = data
  i1810.name = i1811[0]
  var i1813 = i1811[1]
  var i1812 = []
  for(var i = 0; i < i1813.length; i += 1) {
    i1812.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1813[i + 0]) );
  }
  i1810.frames = i1812
  return i1810
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1815 = data
  request.r(i1815[0], i1815[1], 0, i1814, 'sharedMesh')
  return i1814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i1816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i1817 = data
  request.r(i1817[0], i1817[1], 0, i1816, 'additionalVertexStreams')
  i1816.enabled = !!i1817[2]
  request.r(i1817[3], i1817[4], 0, i1816, 'sharedMaterial')
  var i1819 = i1817[5]
  var i1818 = []
  for(var i = 0; i < i1819.length; i += 2) {
  request.r(i1819[i + 0], i1819[i + 1], 2, i1818, '')
  }
  i1816.sharedMaterials = i1818
  i1816.receiveShadows = !!i1817[6]
  i1816.shadowCastingMode = i1817[7]
  i1816.sortingLayerID = i1817[8]
  i1816.sortingOrder = i1817[9]
  i1816.lightmapIndex = i1817[10]
  i1816.lightmapSceneIndex = i1817[11]
  i1816.lightmapScaleOffset = new pc.Vec4( i1817[12], i1817[13], i1817[14], i1817[15] )
  i1816.lightProbeUsage = i1817[16]
  i1816.reflectionProbeUsage = i1817[17]
  return i1816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.RenderTexture"] = function (request, data, root) {
  var i1820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.RenderTexture' )
  var i1821 = data
  i1820.name = i1821[0]
  i1820.width = i1821[1]
  i1820.height = i1821[2]
  i1820.anisoLevel = i1821[3]
  i1820.filterMode = i1821[4]
  i1820.hdr = !!i1821[5]
  i1820.colorFormat = i1821[6]
  i1820.depthStencilFormat = i1821[7]
  i1820.renderTextureFormat = i1821[8]
  i1820.depth = i1821[9]
  i1820.wrapU = i1821[10]
  i1820.wrapV = i1821[11]
  return i1820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1823 = data
  i1822.name = i1823[0]
  i1822.atlasId = i1823[1]
  i1822.mipmapCount = i1823[2]
  i1822.hdr = !!i1823[3]
  i1822.size = i1823[4]
  i1822.anisoLevel = i1823[5]
  i1822.filterMode = i1823[6]
  var i1825 = i1823[7]
  var i1824 = []
  for(var i = 0; i < i1825.length; i += 4) {
    i1824.push( UnityEngine.Rect.MinMaxRect(i1825[i + 0], i1825[i + 1], i1825[i + 2], i1825[i + 3]) );
  }
  i1822.rects = i1824
  i1822.wrapU = i1823[8]
  i1822.wrapV = i1823[9]
  return i1822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1829 = data
  i1828.name = i1829[0]
  i1828.index = i1829[1]
  i1828.startup = !!i1829[2]
  return i1828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1831 = data
  i1830.aspect = i1831[0]
  i1830.orthographic = !!i1831[1]
  i1830.orthographicSize = i1831[2]
  i1830.backgroundColor = new pc.Color(i1831[3], i1831[4], i1831[5], i1831[6])
  i1830.nearClipPlane = i1831[7]
  i1830.farClipPlane = i1831[8]
  i1830.fieldOfView = i1831[9]
  i1830.depth = i1831[10]
  i1830.clearFlags = i1831[11]
  i1830.cullingMask = i1831[12]
  i1830.rect = i1831[13]
  request.r(i1831[14], i1831[15], 0, i1830, 'targetTexture')
  i1830.usePhysicalProperties = !!i1831[16]
  i1830.focalLength = i1831[17]
  i1830.sensorSize = new pc.Vec2( i1831[18], i1831[19] )
  i1830.lensShift = new pc.Vec2( i1831[20], i1831[21] )
  i1830.gateFit = i1831[22]
  i1830.commandBufferCount = i1831[23]
  i1830.cameraType = i1831[24]
  i1830.enabled = !!i1831[25]
  return i1830
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalCameraData"] = function (request, data, root) {
  var i1832 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalCameraData' )
  var i1833 = data
  i1832.m_RenderShadows = !!i1833[0]
  i1832.m_RequiresDepthTextureOption = i1833[1]
  i1832.m_RequiresOpaqueTextureOption = i1833[2]
  i1832.m_CameraType = i1833[3]
  var i1835 = i1833[4]
  var i1834 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Camera')))
  for(var i = 0; i < i1835.length; i += 2) {
  request.r(i1835[i + 0], i1835[i + 1], 1, i1834, '')
  }
  i1832.m_Cameras = i1834
  i1832.m_RendererIndex = i1833[5]
  i1832.m_VolumeLayerMask = UnityEngine.LayerMask.FromIntegerValue( i1833[6] )
  request.r(i1833[7], i1833[8], 0, i1832, 'm_VolumeTrigger')
  i1832.m_VolumeFrameworkUpdateModeOption = i1833[9]
  i1832.m_RenderPostProcessing = !!i1833[10]
  i1832.m_Antialiasing = i1833[11]
  i1832.m_AntialiasingQuality = i1833[12]
  i1832.m_StopNaN = !!i1833[13]
  i1832.m_Dithering = !!i1833[14]
  i1832.m_ClearDepth = !!i1833[15]
  i1832.m_AllowXRRendering = !!i1833[16]
  i1832.m_AllowHDROutput = !!i1833[17]
  i1832.m_UseScreenCoordOverride = !!i1833[18]
  i1832.m_ScreenSizeOverride = new pc.Vec4( i1833[19], i1833[20], i1833[21], i1833[22] )
  i1832.m_ScreenCoordScaleBias = new pc.Vec4( i1833[23], i1833[24], i1833[25], i1833[26] )
  i1832.m_RequiresDepthTexture = !!i1833[27]
  i1832.m_RequiresColorTexture = !!i1833[28]
  i1832.m_Version = i1833[29]
  i1832.m_TaaSettings = request.d('UnityEngine.Rendering.Universal.TemporalAA+Settings', i1833[30], i1832.m_TaaSettings)
  return i1832
}

Deserializers["UnityEngine.Rendering.Universal.TemporalAA+Settings"] = function (request, data, root) {
  var i1838 = root || request.c( 'UnityEngine.Rendering.Universal.TemporalAA+Settings' )
  var i1839 = data
  i1838.m_Quality = i1839[0]
  i1838.m_FrameInfluence = i1839[1]
  i1838.m_JitterScale = i1839[2]
  i1838.m_MipBias = i1839[3]
  i1838.m_VarianceClampScale = i1839[4]
  i1838.m_ContrastAdaptiveSharpening = i1839[5]
  return i1838
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1840 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1841 = data
  request.r(i1841[0], i1841[1], 0, i1840, 'm_FirstSelected')
  i1840.m_sendNavigationEvents = !!i1841[2]
  i1840.m_DragThreshold = i1841[3]
  return i1840
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1842 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1843 = data
  i1842.m_HorizontalAxis = i1843[0]
  i1842.m_VerticalAxis = i1843[1]
  i1842.m_SubmitButton = i1843[2]
  i1842.m_CancelButton = i1843[3]
  i1842.m_InputActionsPerSecond = i1843[4]
  i1842.m_RepeatDelay = i1843[5]
  i1842.m_ForceModuleActive = !!i1843[6]
  i1842.m_SendPointerHoverToParent = !!i1843[7]
  return i1842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1845 = data
  i1844.type = i1845[0]
  i1844.color = new pc.Color(i1845[1], i1845[2], i1845[3], i1845[4])
  i1844.cullingMask = i1845[5]
  i1844.intensity = i1845[6]
  i1844.range = i1845[7]
  i1844.spotAngle = i1845[8]
  i1844.shadows = i1845[9]
  i1844.shadowNormalBias = i1845[10]
  i1844.shadowBias = i1845[11]
  i1844.shadowStrength = i1845[12]
  i1844.shadowResolution = i1845[13]
  i1844.lightmapBakeType = i1845[14]
  i1844.renderMode = i1845[15]
  request.r(i1845[16], i1845[17], 0, i1844, 'cookie')
  i1844.cookieSize = i1845[18]
  i1844.shadowNearPlane = i1845[19]
  i1844.occlusionMaskChannel = i1845[20]
  i1844.isBaked = !!i1845[21]
  i1844.mixedLightingMode = i1845[22]
  i1844.enabled = !!i1845[23]
  return i1844
}

Deserializers["UnityEngine.Rendering.Universal.UniversalAdditionalLightData"] = function (request, data, root) {
  var i1846 = root || request.c( 'UnityEngine.Rendering.Universal.UniversalAdditionalLightData' )
  var i1847 = data
  i1846.m_Version = i1847[0]
  i1846.m_UsePipelineSettings = !!i1847[1]
  i1846.m_AdditionalLightsShadowResolutionTier = i1847[2]
  i1846.m_LightLayerMask = i1847[3]
  i1846.m_RenderingLayers = i1847[4]
  i1846.m_CustomShadowLayers = !!i1847[5]
  i1846.m_ShadowLayerMask = i1847[6]
  i1846.m_ShadowRenderingLayers = i1847[7]
  i1846.m_LightCookieSize = new pc.Vec2( i1847[8], i1847[9] )
  i1846.m_LightCookieOffset = new pc.Vec2( i1847[10], i1847[11] )
  i1846.m_SoftShadowQuality = i1847[12]
  return i1846
}

Deserializers["PointLightReflectionExclusion"] = function (request, data, root) {
  var i1848 = root || request.c( 'PointLightReflectionExclusion' )
  var i1849 = data
  request.r(i1849[0], i1849[1], 0, i1848, 'source')
  return i1848
}

Deserializers["GameController"] = function (request, data, root) {
  var i1850 = root || request.c( 'GameController' )
  var i1851 = data
  var i1853 = i1851[0]
  var i1852 = new (System.Collections.Generic.List$1(Bridge.ns('BuildingPart')))
  for(var i = 0; i < i1853.length; i += 1) {
    i1852.add(request.d('BuildingPart', i1853[i + 0]));
  }
  i1850.parts = i1852
  i1850.createSampleBlueprintWhenEmpty = !!i1851[1]
  request.r(i1851[2], i1851[3], 0, i1850, 'buildingOrigin')
  request.r(i1851[4], i1851[5], 0, i1850, 'playerCamera')
  request.r(i1851[6], i1851[7], 0, i1850, 'cameraController')
  request.r(i1851[8], i1851[9], 0, i1850, 'blockPlacer')
  request.r(i1851[10], i1851[11], 0, i1850, 'progressUI')
  request.r(i1851[12], i1851[13], 0, i1850, 'adjacentPreviews')
  request.r(i1851[14], i1851[15], 0, i1850, 'completionFireworks')
  return i1850
}

Deserializers["BuildingPart"] = function (request, data, root) {
  var i1856 = root || request.c( 'BuildingPart' )
  var i1857 = data
  i1856.name = i1857[0]
  var i1859 = i1857[1]
  var i1858 = new (System.Collections.Generic.List$1(Bridge.ns('BuildBlock')))
  for(var i = 0; i < i1859.length; i += 1) {
    i1858.add(request.d('BuildBlock', i1859[i + 0]));
  }
  i1856.blocks = i1858
  return i1856
}

Deserializers["BuildCameraController"] = function (request, data, root) {
  var i1860 = root || request.c( 'BuildCameraController' )
  var i1861 = data
  i1860.lookSensitivity = i1861[0]
  i1860.playerMotor = request.d('BuildPlayerMotor', i1861[1], i1860.playerMotor)
  i1860.turnToBlockSeconds = i1861[2]
  i1860.tapMovementLimit = i1861[3]
  i1860.collisionRadius = i1861[4]
  request.r(i1861[5], i1861[6], 0, i1860, 'collisionWorld')
  request.r(i1861[7], i1861[8], 0, i1860, 'playerVisual')
  i1860.thirdPersonDistance = i1861[9]
  request.r(i1861[10], i1861[11], 0, i1860, 'controls')
  return i1860
}

Deserializers["BuildPlayerMotor"] = function (request, data, root) {
  var i1862 = root || request.c( 'BuildPlayerMotor' )
  var i1863 = data
  i1862.walkSpeed = i1863[0]
  i1862.flySpeed = i1863[1]
  i1862.movementSharpness = i1863[2]
  i1862.airAcceleration = i1863[3]
  i1862.gravity = i1863[4]
  i1862.jumpSpeed = i1863[5]
  i1862.eyeHeight = i1863[6]
  i1862.bodyHeight = i1863[7]
  i1862.maxFlyHeight = i1863[8]
  i1862.autoJump = !!i1863[9]
  return i1862
}

Deserializers["BuildBlockPlacer"] = function (request, data, root) {
  var i1864 = root || request.c( 'BuildBlockPlacer' )
  var i1865 = data
  request.r(i1865[0], i1865[1], 0, i1864, 'placementFlash')
  return i1864
}

Deserializers["BuildProgressUI"] = function (request, data, root) {
  var i1866 = root || request.c( 'BuildProgressUI' )
  var i1867 = data
  request.r(i1867[0], i1867[1], 0, i1866, 'canvasRoot')
  request.r(i1867[2], i1867[3], 0, i1866, 'logo')
  request.r(i1867[4], i1867[5], 0, i1866, 'install')
  request.r(i1867[6], i1867[7], 0, i1866, 'bar')
  request.r(i1867[8], i1867[9], 0, i1866, 'fill')
  request.r(i1867[10], i1867[11], 0, i1866, 'building')
  request.r(i1867[12], i1867[13], 0, i1866, 'inventory')
  request.r(i1867[14], i1867[15], 0, i1866, 'title')
  request.r(i1867[16], i1867[17], 0, i1866, 'count')
  var i1869 = i1867[18]
  var i1868 = []
  for(var i = 0; i < i1869.length; i += 2) {
  request.r(i1869[i + 0], i1869[i + 1], 2, i1868, '')
  }
  i1866.slots = i1868
  var i1871 = i1867[19]
  var i1870 = []
  for(var i = 0; i < i1871.length; i += 2) {
  request.r(i1871[i + 0], i1871[i + 1], 2, i1870, '')
  }
  i1866.blockImages = i1870
  var i1873 = i1867[20]
  var i1872 = []
  for(var i = 0; i < i1873.length; i += 1) {
    i1872.push( request.d('BuildProgressUI+BlockItem', i1873[i + 0]) );
  }
  i1866.blockItems = i1872
  var i1875 = i1867[21]
  var i1874 = []
  for(var i = 0; i < i1875.length; i += 2) {
  request.r(i1875[i + 0], i1875[i + 1], 2, i1874, '')
  }
  i1866.amounts = i1874
  return i1866
}

Deserializers["BuildProgressUI+BlockItem"] = function (request, data, root) {
  var i1882 = root || request.c( 'BuildProgressUI+BlockItem' )
  var i1883 = data
  i1882.label = i1883[0]
  var i1885 = i1883[1]
  var i1884 = []
  for(var i = 0; i < i1885.length; i += 1) {
    i1884.push( i1885[i + 0] );
  }
  i1882.types = i1884
  return i1882
}

Deserializers["AdjacentBlockPreviews"] = function (request, data, root) {
  var i1890 = root || request.c( 'AdjacentBlockPreviews' )
  var i1891 = data
  i1890.opacity = i1891[0]
  return i1890
}

Deserializers["GameplayMaterials"] = function (request, data, root) {
  var i1892 = root || request.c( 'GameplayMaterials' )
  var i1893 = data
  request.r(i1893[0], i1893[1], 0, i1892, 'solid')
  request.r(i1893[2], i1893[3], 0, i1892, 'transparent')
  request.r(i1893[4], i1893[5], 0, i1892, 'unlit')
  request.r(i1893[6], i1893[7], 0, i1892, 'guideOverlay')
  return i1892
}

Deserializers["AudioController"] = function (request, data, root) {
  var i1894 = root || request.c( 'AudioController' )
  var i1895 = data
  request.r(i1895[0], i1895[1], 0, i1894, 'placementSource')
  request.r(i1895[2], i1895[3], 0, i1894, 'placementClip')
  i1894.placementVolume = i1895[4]
  return i1894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1896 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1897 = data
  request.r(i1897[0], i1897[1], 0, i1896, 'clip')
  request.r(i1897[2], i1897[3], 0, i1896, 'outputAudioMixerGroup')
  i1896.playOnAwake = !!i1897[4]
  i1896.loop = !!i1897[5]
  i1896.time = i1897[6]
  i1896.volume = i1897[7]
  i1896.pitch = i1897[8]
  i1896.enabled = !!i1897[9]
  return i1896
}

Deserializers["WetGroundReflection"] = function (request, data, root) {
  var i1898 = root || request.c( 'WetGroundReflection' )
  var i1899 = data
  request.r(i1899[0], i1899[1], 0, i1898, 'viewCamera')
  request.r(i1899[2], i1899[3], 0, i1898, 'reflectionCamera')
  request.r(i1899[4], i1899[5], 0, i1898, 'groundMaterial')
  i1898.groundHeight = i1899[6]
  i1898.updateEveryFrames = i1899[7]
  return i1898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1900 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1901 = data
  i1900.pivot = new pc.Vec2( i1901[0], i1901[1] )
  i1900.anchorMin = new pc.Vec2( i1901[2], i1901[3] )
  i1900.anchorMax = new pc.Vec2( i1901[4], i1901[5] )
  i1900.sizeDelta = new pc.Vec2( i1901[6], i1901[7] )
  i1900.anchoredPosition3D = new pc.Vec3( i1901[8], i1901[9], i1901[10] )
  i1900.rotation = new pc.Quat(i1901[11], i1901[12], i1901[13], i1901[14])
  i1900.scale = new pc.Vec3( i1901[15], i1901[16], i1901[17] )
  return i1900
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1903 = data
  i1902.planeDistance = i1903[0]
  i1902.referencePixelsPerUnit = i1903[1]
  i1902.isFallbackOverlay = !!i1903[2]
  i1902.renderMode = i1903[3]
  i1902.renderOrder = i1903[4]
  i1902.sortingLayerName = i1903[5]
  i1902.sortingOrder = i1903[6]
  i1902.scaleFactor = i1903[7]
  request.r(i1903[8], i1903[9], 0, i1902, 'worldCamera')
  i1902.overrideSorting = !!i1903[10]
  i1902.pixelPerfect = !!i1903[11]
  i1902.targetDisplay = i1903[12]
  i1902.overridePixelPerfect = !!i1903[13]
  i1902.enabled = !!i1903[14]
  return i1902
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1904 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1905 = data
  i1904.m_UiScaleMode = i1905[0]
  i1904.m_ReferencePixelsPerUnit = i1905[1]
  i1904.m_ScaleFactor = i1905[2]
  i1904.m_ReferenceResolution = new pc.Vec2( i1905[3], i1905[4] )
  i1904.m_ScreenMatchMode = i1905[5]
  i1904.m_MatchWidthOrHeight = i1905[6]
  i1904.m_PhysicalUnit = i1905[7]
  i1904.m_FallbackScreenDPI = i1905[8]
  i1904.m_DefaultSpriteDPI = i1905[9]
  i1904.m_DynamicPixelsPerUnit = i1905[10]
  i1904.m_PresetInfoIsWorld = !!i1905[11]
  return i1904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1907 = data
  i1906.cullTransparentMesh = !!i1907[0]
  return i1906
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1908 = root || request.c( 'UnityEngine.UI.Image' )
  var i1909 = data
  request.r(i1909[0], i1909[1], 0, i1908, 'm_Sprite')
  i1908.m_Type = i1909[2]
  i1908.m_PreserveAspect = !!i1909[3]
  i1908.m_FillCenter = !!i1909[4]
  i1908.m_FillMethod = i1909[5]
  i1908.m_FillAmount = i1909[6]
  i1908.m_FillClockwise = !!i1909[7]
  i1908.m_FillOrigin = i1909[8]
  i1908.m_UseSpriteMesh = !!i1909[9]
  i1908.m_PixelsPerUnitMultiplier = i1909[10]
  request.r(i1909[11], i1909[12], 0, i1908, 'm_Material')
  i1908.m_Maskable = !!i1909[13]
  i1908.m_Color = new pc.Color(i1909[14], i1909[15], i1909[16], i1909[17])
  i1908.m_RaycastTarget = !!i1909[18]
  i1908.m_RaycastPadding = new pc.Vec4( i1909[19], i1909[20], i1909[21], i1909[22] )
  return i1908
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1910 = root || request.c( 'UnityEngine.UI.Text' )
  var i1911 = data
  i1910.m_FontData = request.d('UnityEngine.UI.FontData', i1911[0], i1910.m_FontData)
  i1910.m_Text = i1911[1]
  request.r(i1911[2], i1911[3], 0, i1910, 'm_Material')
  i1910.m_Maskable = !!i1911[4]
  i1910.m_Color = new pc.Color(i1911[5], i1911[6], i1911[7], i1911[8])
  i1910.m_RaycastTarget = !!i1911[9]
  i1910.m_RaycastPadding = new pc.Vec4( i1911[10], i1911[11], i1911[12], i1911[13] )
  return i1910
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1912 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1913 = data
  request.r(i1913[0], i1913[1], 0, i1912, 'm_Font')
  i1912.m_FontSize = i1913[2]
  i1912.m_FontStyle = i1913[3]
  i1912.m_BestFit = !!i1913[4]
  i1912.m_MinSize = i1913[5]
  i1912.m_MaxSize = i1913[6]
  i1912.m_Alignment = i1913[7]
  i1912.m_AlignByGeometry = !!i1913[8]
  i1912.m_RichText = !!i1913[9]
  i1912.m_HorizontalOverflow = i1913[10]
  i1912.m_VerticalOverflow = i1913[11]
  i1912.m_LineSpacing = i1913[12]
  return i1912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasGroup"] = function (request, data, root) {
  var i1914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasGroup' )
  var i1915 = data
  i1914.m_Alpha = i1915[0]
  i1914.m_Interactable = !!i1915[1]
  i1914.m_BlocksRaycasts = !!i1915[2]
  i1914.m_IgnoreParentGroups = !!i1915[3]
  i1914.enabled = !!i1915[4]
  return i1914
}

Deserializers["BuildTapTutorial"] = function (request, data, root) {
  var i1916 = root || request.c( 'BuildTapTutorial' )
  var i1917 = data
  request.r(i1917[0], i1917[1], 0, i1916, 'controller')
  request.r(i1917[2], i1917[3], 0, i1916, 'view')
  request.r(i1917[4], i1917[5], 0, i1916, 'container')
  request.r(i1917[6], i1917[7], 0, i1916, 'hand')
  request.r(i1917[8], i1917[9], 0, i1916, 'visuals')
  i1916.idleSeconds = i1917[10]
  return i1916
}

Deserializers["BuildTouchControls"] = function (request, data, root) {
  var i1918 = root || request.c( 'BuildTouchControls' )
  var i1919 = data
  request.r(i1919[0], i1919[1], 0, i1918, 'stick')
  request.r(i1919[2], i1919[3], 0, i1918, 'knob')
  request.r(i1919[4], i1919[5], 0, i1918, 'fly')
  request.r(i1919[6], i1919[7], 0, i1918, 'up')
  request.r(i1919[8], i1919[9], 0, i1918, 'down')
  request.r(i1919[10], i1919[11], 0, i1918, 'exit')
  request.r(i1919[12], i1919[13], 0, i1918, 'viewButton')
  return i1918
}

Deserializers["BuildCompleteFireworks"] = function (request, data, root) {
  var i1920 = root || request.c( 'BuildCompleteFireworks' )
  var i1921 = data
  request.r(i1921[0], i1921[1], 0, i1920, 'meshFilter')
  request.r(i1921[2], i1921[3], 0, i1920, 'meshRenderer')
  i1920.burstHeight = i1921[4]
  i1920.launchInterval = i1921[5]
  var i1923 = i1921[6]
  var i1922 = []
  for(var i = 0; i < i1923.length; i += 2) {
  request.r(i1923[i + 0], i1923[i + 1], 2, i1922, '')
  }
  i1920.launchAudio = i1922
  var i1925 = i1921[7]
  var i1924 = []
  for(var i = 0; i < i1925.length; i += 2) {
  request.r(i1925[i + 0], i1925[i + 1], 2, i1924, '')
  }
  i1920.flightAudio = i1924
  var i1927 = i1921[8]
  var i1926 = []
  for(var i = 0; i < i1927.length; i += 2) {
  request.r(i1927[i + 0], i1927[i + 1], 2, i1926, '')
  }
  i1920.burstAudio = i1926
  return i1920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1931 = data
  i1930.center = new pc.Vec3( i1931[0], i1931[1], i1931[2] )
  i1930.size = new pc.Vec3( i1931[3], i1931[4], i1931[5] )
  i1930.enabled = !!i1931[6]
  i1930.isTrigger = !!i1931[7]
  request.r(i1931[8], i1931[9], 0, i1930, 'material')
  return i1930
}

Deserializers["BuildCollisionWorld"] = function (request, data, root) {
  var i1932 = root || request.c( 'BuildCollisionWorld' )
  var i1933 = data
  i1932.mapBoxData = i1933[0]
  request.r(i1933[1], i1933[2], 0, i1932, 'limitRoot')
  return i1932
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1934 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1935 = data
  i1934.m_IgnoreReversedGraphics = !!i1935[0]
  i1934.m_BlockingObjects = i1935[1]
  i1934.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1935[2] )
  return i1934
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1936 = root || request.c( 'UnityEngine.UI.Button' )
  var i1937 = data
  i1936.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1937[0], i1936.m_OnClick)
  i1936.m_Navigation = request.d('UnityEngine.UI.Navigation', i1937[1], i1936.m_Navigation)
  i1936.m_Transition = i1937[2]
  i1936.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1937[3], i1936.m_Colors)
  i1936.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1937[4], i1936.m_SpriteState)
  i1936.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1937[5], i1936.m_AnimationTriggers)
  i1936.m_Interactable = !!i1937[6]
  request.r(i1937[7], i1937[8], 0, i1936, 'm_TargetGraphic')
  return i1936
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1938 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1939 = data
  i1938.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1939[0], i1938.m_PersistentCalls)
  return i1938
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1940 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1941 = data
  var i1943 = i1941[0]
  var i1942 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1943.length; i += 1) {
    i1942.add(request.d('UnityEngine.Events.PersistentCall', i1943[i + 0]));
  }
  i1940.m_Calls = i1942
  return i1940
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1946 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1947 = data
  request.r(i1947[0], i1947[1], 0, i1946, 'm_Target')
  i1946.m_TargetAssemblyTypeName = i1947[2]
  i1946.m_MethodName = i1947[3]
  i1946.m_Mode = i1947[4]
  i1946.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1947[5], i1946.m_Arguments)
  i1946.m_CallState = i1947[6]
  return i1946
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1948 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1949 = data
  i1948.m_Mode = i1949[0]
  i1948.m_WrapAround = !!i1949[1]
  request.r(i1949[2], i1949[3], 0, i1948, 'm_SelectOnUp')
  request.r(i1949[4], i1949[5], 0, i1948, 'm_SelectOnDown')
  request.r(i1949[6], i1949[7], 0, i1948, 'm_SelectOnLeft')
  request.r(i1949[8], i1949[9], 0, i1948, 'm_SelectOnRight')
  return i1948
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1950 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1951 = data
  i1950.m_NormalColor = new pc.Color(i1951[0], i1951[1], i1951[2], i1951[3])
  i1950.m_HighlightedColor = new pc.Color(i1951[4], i1951[5], i1951[6], i1951[7])
  i1950.m_PressedColor = new pc.Color(i1951[8], i1951[9], i1951[10], i1951[11])
  i1950.m_SelectedColor = new pc.Color(i1951[12], i1951[13], i1951[14], i1951[15])
  i1950.m_DisabledColor = new pc.Color(i1951[16], i1951[17], i1951[18], i1951[19])
  i1950.m_ColorMultiplier = i1951[20]
  i1950.m_FadeDuration = i1951[21]
  return i1950
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1952 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1953 = data
  request.r(i1953[0], i1953[1], 0, i1952, 'm_HighlightedSprite')
  request.r(i1953[2], i1953[3], 0, i1952, 'm_PressedSprite')
  request.r(i1953[4], i1953[5], 0, i1952, 'm_SelectedSprite')
  request.r(i1953[6], i1953[7], 0, i1952, 'm_DisabledSprite')
  return i1952
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1954 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1955 = data
  i1954.m_NormalTrigger = i1955[0]
  i1954.m_HighlightedTrigger = i1955[1]
  i1954.m_PressedTrigger = i1955[2]
  i1954.m_SelectedTrigger = i1955[3]
  i1954.m_DisabledTrigger = i1955[4]
  return i1954
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i1956 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i1957 = data
  request.r(i1957[0], i1957[1], 0, i1956, 'm_Texture')
  i1956.m_UVRect = UnityEngine.Rect.MinMaxRect(i1957[2], i1957[3], i1957[4], i1957[5])
  request.r(i1957[6], i1957[7], 0, i1956, 'm_Material')
  i1956.m_Maskable = !!i1957[8]
  i1956.m_Color = new pc.Color(i1957[9], i1957[10], i1957[11], i1957[12])
  i1956.m_RaycastTarget = !!i1957[13]
  i1956.m_RaycastPadding = new pc.Vec4( i1957[14], i1957[15], i1957[16], i1957[17] )
  return i1956
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1958 = root || request.c( 'LunaController' )
  var i1959 = data
  i1958.YPosCTA = i1959[0]
  i1958.TimePlay = i1959[1]
  i1958.Count = i1959[2]
  request.r(i1959[3], i1959[4], 0, i1958, 'Logo')
  request.r(i1959[5], i1959[6], 0, i1958, 'CTA')
  request.r(i1959[7], i1959[8], 0, i1958, 'BackgroundMusic')
  i1958.Intensity = i1959[9]
  request.r(i1959[10], i1959[11], 0, i1958, 'game')
  request.r(i1959[12], i1959[13], 0, i1958, 'hud')
  request.r(i1959[14], i1959[15], 0, i1958, 'controls')
  var i1961 = i1959[16]
  var i1960 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i1961.length; i += 2) {
  request.r(i1961[i + 0], i1961[i + 1], 1, i1960, '')
  }
  i1958.ctaButton = i1960
  request.r(i1959[17], i1959[18], 0, i1958, 'logoImage')
  request.r(i1959[19], i1959[20], 0, i1958, 'musicSource')
  request.r(i1959[21], i1959[22], 0, i1958, 'tutorial')
  request.r(i1959[23], i1959[24], 0, i1958, 'directionalLight')
  request.r(i1959[25], i1959[26], 0, i1958, 'endCard')
  return i1958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1965 = data
  i1964.ambientIntensity = i1965[0]
  i1964.reflectionIntensity = i1965[1]
  i1964.ambientMode = i1965[2]
  i1964.ambientLight = new pc.Color(i1965[3], i1965[4], i1965[5], i1965[6])
  i1964.ambientSkyColor = new pc.Color(i1965[7], i1965[8], i1965[9], i1965[10])
  i1964.ambientGroundColor = new pc.Color(i1965[11], i1965[12], i1965[13], i1965[14])
  i1964.ambientEquatorColor = new pc.Color(i1965[15], i1965[16], i1965[17], i1965[18])
  i1964.fogColor = new pc.Color(i1965[19], i1965[20], i1965[21], i1965[22])
  i1964.fogEndDistance = i1965[23]
  i1964.fogStartDistance = i1965[24]
  i1964.fogDensity = i1965[25]
  i1964.fog = !!i1965[26]
  request.r(i1965[27], i1965[28], 0, i1964, 'skybox')
  i1964.fogMode = i1965[29]
  var i1967 = i1965[30]
  var i1966 = []
  for(var i = 0; i < i1967.length; i += 1) {
    i1966.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1967[i + 0]) );
  }
  i1964.lightmaps = i1966
  i1964.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1965[31], i1964.lightProbes)
  i1964.lightmapsMode = i1965[32]
  i1964.mixedBakeMode = i1965[33]
  i1964.environmentLightingMode = i1965[34]
  i1964.ambientProbe = new pc.SphericalHarmonicsL2(i1965[35])
  request.r(i1965[36], i1965[37], 0, i1964, 'customReflection')
  request.r(i1965[38], i1965[39], 0, i1964, 'defaultReflection')
  i1964.defaultReflectionMode = i1965[40]
  i1964.defaultReflectionResolution = i1965[41]
  i1964.sunLightObjectId = i1965[42]
  i1964.pixelLightCount = i1965[43]
  i1964.defaultReflectionHDR = !!i1965[44]
  i1964.hasLightDataAsset = !!i1965[45]
  i1964.hasManualGenerate = !!i1965[46]
  return i1964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1970 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1971 = data
  request.r(i1971[0], i1971[1], 0, i1970, 'lightmapColor')
  request.r(i1971[2], i1971[3], 0, i1970, 'lightmapDirection')
  request.r(i1971[4], i1971[5], 0, i1970, 'shadowMask')
  return i1970
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1972 = root || new UnityEngine.LightProbes()
  var i1973 = data
  return i1972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset"] = function (request, data, root) {
  var i1980 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset' )
  var i1981 = data
  i1980.AdditionalLightsRenderingMode = i1981[0]
  i1980.LightRenderingMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode', i1981[1], i1980.LightRenderingMode)
  i1980.MainLightRenderingModeValue = i1981[2]
  i1980.SupportsMainLightShadows = !!i1981[3]
  i1980.MixedLightingSupported = !!i1981[4]
  i1980.MainLightShadowmapResolutionValue = i1981[5]
  i1980.SupportsSoftShadows = !!i1981[6]
  i1980.SoftShadowQualityValue = i1981[7]
  i1980.ShadowDistance = i1981[8]
  i1980.ShadowCascadeCount = i1981[9]
  i1980.Cascade2Split = i1981[10]
  i1980.Cascade3Split = new pc.Vec2( i1981[11], i1981[12] )
  i1980.Cascade4Split = new pc.Vec3( i1981[13], i1981[14], i1981[15] )
  i1980.CascadeBorder = i1981[16]
  i1980.ShadowDepthBias = i1981[17]
  i1980.ShadowNormalBias = i1981[18]
  i1980.RequireDepthTexture = !!i1981[19]
  i1980.RequireOpaqueTexture = !!i1981[20]
  i1980.scriptableRendererData = request.d('Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData', i1981[21], i1980.scriptableRendererData)
  return i1980
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode"] = function (request, data, root) {
  var i1982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode' )
  var i1983 = data
  i1982.Disabled = i1983[0]
  i1982.PerVertex = i1983[1]
  i1982.PerPixel = i1983[2]
  return i1982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData"] = function (request, data, root) {
  var i1984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData' )
  var i1985 = data
  i1984.opaqueLayerMask = i1985[0]
  i1984.transparentLayerMask = i1985[1]
  var i1987 = i1985[2]
  var i1986 = []
  for(var i = 0; i < i1987.length; i += 1) {
    i1986.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects', i1987[i + 0]) );
  }
  i1984.RenderObjectsFeatures = i1986
  i1984.name = i1985[3]
  return i1984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects"] = function (request, data, root) {
  var i1990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects' )
  var i1991 = data
  i1990.settings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings', i1991[0], i1990.settings)
  i1990.name = i1991[1]
  i1990.typeName = i1991[2]
  return i1990
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1993 = data
  var i1995 = i1993[0]
  var i1994 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1995.length; i += 1) {
    i1994.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1995[i + 0]));
  }
  i1992.ShaderCompilationErrors = i1994
  i1992.name = i1993[1]
  i1992.guid = i1993[2]
  var i1997 = i1993[3]
  var i1996 = []
  for(var i = 0; i < i1997.length; i += 1) {
    i1996.push( i1997[i + 0] );
  }
  i1992.shaderDefinedKeywords = i1996
  var i1999 = i1993[4]
  var i1998 = []
  for(var i = 0; i < i1999.length; i += 1) {
    i1998.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1999[i + 0]) );
  }
  i1992.passes = i1998
  var i2001 = i1993[5]
  var i2000 = []
  for(var i = 0; i < i2001.length; i += 1) {
    i2000.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2001[i + 0]) );
  }
  i1992.usePasses = i2000
  var i2003 = i1993[6]
  var i2002 = []
  for(var i = 0; i < i2003.length; i += 1) {
    i2002.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2003[i + 0]) );
  }
  i1992.defaultParameterValues = i2002
  request.r(i1993[7], i1993[8], 0, i1992, 'unityFallbackShader')
  i1992.readDepth = !!i1993[9]
  i1992.hasDepthOnlyPass = !!i1993[10]
  i1992.isCreatedByShaderGraph = !!i1993[11]
  i1992.disableBatching = !!i1993[12]
  i1992.compiled = !!i1993[13]
  return i1992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2007 = data
  i2006.shaderName = i2007[0]
  i2006.errorMessage = i2007[1]
  return i2006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2010 = root || new pc.UnityShaderPass()
  var i2011 = data
  i2010.id = i2011[0]
  i2010.subShaderIndex = i2011[1]
  i2010.name = i2011[2]
  i2010.passType = i2011[3]
  i2010.grabPassTextureName = i2011[4]
  i2010.usePass = !!i2011[5]
  i2010.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[6], i2010.zTest)
  i2010.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[7], i2010.zWrite)
  i2010.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[8], i2010.culling)
  i2010.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2011[9], i2010.blending)
  i2010.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2011[10], i2010.alphaBlending)
  i2010.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[11], i2010.colorWriteMask)
  i2010.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[12], i2010.offsetUnits)
  i2010.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[13], i2010.offsetFactor)
  i2010.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[14], i2010.stencilRef)
  i2010.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[15], i2010.stencilReadMask)
  i2010.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2011[16], i2010.stencilWriteMask)
  i2010.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2011[17], i2010.stencilOp)
  i2010.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2011[18], i2010.stencilOpFront)
  i2010.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2011[19], i2010.stencilOpBack)
  var i2013 = i2011[20]
  var i2012 = []
  for(var i = 0; i < i2013.length; i += 1) {
    i2012.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2013[i + 0]) );
  }
  i2010.tags = i2012
  var i2015 = i2011[21]
  var i2014 = []
  for(var i = 0; i < i2015.length; i += 1) {
    i2014.push( i2015[i + 0] );
  }
  i2010.passDefinedKeywords = i2014
  var i2017 = i2011[22]
  var i2016 = []
  for(var i = 0; i < i2017.length; i += 1) {
    i2016.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2017[i + 0]) );
  }
  i2010.passDefinedKeywordGroups = i2016
  var i2019 = i2011[23]
  var i2018 = []
  for(var i = 0; i < i2019.length; i += 1) {
    i2018.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2019[i + 0]) );
  }
  i2010.variants = i2018
  var i2021 = i2011[24]
  var i2020 = []
  for(var i = 0; i < i2021.length; i += 1) {
    i2020.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2021[i + 0]) );
  }
  i2010.excludedVariants = i2020
  i2010.hasDepthReader = !!i2011[25]
  return i2010
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2022 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2023 = data
  i2022.val = i2023[0]
  i2022.name = i2023[1]
  return i2022
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2024 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2025 = data
  i2024.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2025[0], i2024.src)
  i2024.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2025[1], i2024.dst)
  i2024.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2025[2], i2024.op)
  return i2024
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2027 = data
  i2026.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2027[0], i2026.pass)
  i2026.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2027[1], i2026.fail)
  i2026.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2027[2], i2026.zFail)
  i2026.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2027[3], i2026.comp)
  return i2026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2031 = data
  i2030.name = i2031[0]
  i2030.value = i2031[1]
  return i2030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2034 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2035 = data
  var i2037 = i2035[0]
  var i2036 = []
  for(var i = 0; i < i2037.length; i += 1) {
    i2036.push( i2037[i + 0] );
  }
  i2034.keywords = i2036
  i2034.hasDiscard = !!i2035[1]
  return i2034
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2040 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2041 = data
  i2040.passId = i2041[0]
  i2040.subShaderIndex = i2041[1]
  var i2043 = i2041[2]
  var i2042 = []
  for(var i = 0; i < i2043.length; i += 1) {
    i2042.push( i2043[i + 0] );
  }
  i2040.keywords = i2042
  i2040.vertexProgram = i2041[3]
  i2040.fragmentProgram = i2041[4]
  i2040.exportedForWebGl2 = !!i2041[5]
  i2040.readDepth = !!i2041[6]
  return i2040
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2047 = data
  request.r(i2047[0], i2047[1], 0, i2046, 'shader')
  i2046.pass = i2047[2]
  return i2046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2051 = data
  i2050.name = i2051[0]
  i2050.type = i2051[1]
  i2050.value = new pc.Vec4( i2051[2], i2051[3], i2051[4], i2051[5] )
  i2050.textureValue = i2051[6]
  i2050.shaderPropertyFlag = i2051[7]
  return i2050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2052 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2053 = data
  i2052.name = i2053[0]
  request.r(i2053[1], i2053[2], 0, i2052, 'texture')
  i2052.aabb = i2053[3]
  i2052.vertices = i2053[4]
  i2052.triangles = i2053[5]
  i2052.textureRect = UnityEngine.Rect.MinMaxRect(i2053[6], i2053[7], i2053[8], i2053[9])
  i2052.packedRect = UnityEngine.Rect.MinMaxRect(i2053[10], i2053[11], i2053[12], i2053[13])
  i2052.border = new pc.Vec4( i2053[14], i2053[15], i2053[16], i2053[17] )
  i2052.transparency = i2053[18]
  i2052.bounds = i2053[19]
  i2052.pixelsPerUnit = i2053[20]
  i2052.textureWidth = i2053[21]
  i2052.textureHeight = i2053[22]
  i2052.nativeSize = new pc.Vec2( i2053[23], i2053[24] )
  i2052.pivot = new pc.Vec2( i2053[25], i2053[26] )
  i2052.textureRectOffset = new pc.Vec2( i2053[27], i2053[28] )
  return i2052
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2055 = data
  i2054.name = i2055[0]
  return i2054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i2056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i2057 = data
  i2056.name = i2057[0]
  i2056.wrapMode = i2057[1]
  i2056.isLooping = !!i2057[2]
  i2056.length = i2057[3]
  var i2059 = i2057[4]
  var i2058 = []
  for(var i = 0; i < i2059.length; i += 1) {
    i2058.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i2059[i + 0]) );
  }
  i2056.curves = i2058
  var i2061 = i2057[5]
  var i2060 = []
  for(var i = 0; i < i2061.length; i += 1) {
    i2060.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i2061[i + 0]) );
  }
  i2056.events = i2060
  i2056.halfPrecision = !!i2057[6]
  i2056._frameRate = i2057[7]
  i2056.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i2057[8], i2056.localBounds)
  i2056.hasMuscleCurves = !!i2057[9]
  var i2063 = i2057[10]
  var i2062 = []
  for(var i = 0; i < i2063.length; i += 1) {
    i2062.push( i2063[i + 0] );
  }
  i2056.clipMuscleConstant = i2062
  i2056.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i2057[11], i2056.clipBindingConstant)
  return i2056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i2066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i2067 = data
  i2066.path = i2067[0]
  i2066.hash = i2067[1]
  i2066.componentType = i2067[2]
  i2066.property = i2067[3]
  i2066.keys = i2067[4]
  var i2069 = i2067[5]
  var i2068 = []
  for(var i = 0; i < i2069.length; i += 1) {
    i2068.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i2069[i + 0]) );
  }
  i2066.objectReferenceKeys = i2068
  return i2066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i2072 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i2073 = data
  i2072.time = i2073[0]
  request.r(i2073[1], i2073[2], 0, i2072, 'value')
  return i2072
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i2076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i2077 = data
  i2076.functionName = i2077[0]
  i2076.floatParameter = i2077[1]
  i2076.intParameter = i2077[2]
  i2076.stringParameter = i2077[3]
  request.r(i2077[4], i2077[5], 0, i2076, 'objectReferenceParameter')
  i2076.time = i2077[6]
  return i2076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i2078 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i2079 = data
  i2078.center = new pc.Vec3( i2079[0], i2079[1], i2079[2] )
  i2078.extends = new pc.Vec3( i2079[3], i2079[4], i2079[5] )
  return i2078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i2082 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i2083 = data
  var i2085 = i2083[0]
  var i2084 = []
  for(var i = 0; i < i2085.length; i += 1) {
    i2084.push( i2085[i + 0] );
  }
  i2082.genericBindings = i2084
  var i2087 = i2083[1]
  var i2086 = []
  for(var i = 0; i < i2087.length; i += 1) {
    i2086.push( i2087[i + 0] );
  }
  i2082.pptrCurveMapping = i2086
  return i2082
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i2088 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i2089 = data
  i2088.name = i2089[0]
  i2088.ascent = i2089[1]
  i2088.originalLineHeight = i2089[2]
  i2088.fontSize = i2089[3]
  var i2091 = i2089[4]
  var i2090 = []
  for(var i = 0; i < i2091.length; i += 1) {
    i2090.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i2091[i + 0]) );
  }
  i2088.characterInfo = i2090
  request.r(i2089[5], i2089[6], 0, i2088, 'texture')
  i2088.originalFontSize = i2089[7]
  return i2088
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i2094 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i2095 = data
  i2094.index = i2095[0]
  i2094.advance = i2095[1]
  i2094.bearing = i2095[2]
  i2094.glyphWidth = i2095[3]
  i2094.glyphHeight = i2095[4]
  i2094.minX = i2095[5]
  i2094.maxX = i2095[6]
  i2094.minY = i2095[7]
  i2094.maxY = i2095[8]
  i2094.uvBottomLeftX = i2095[9]
  i2094.uvBottomLeftY = i2095[10]
  i2094.uvBottomRightX = i2095[11]
  i2094.uvBottomRightY = i2095[12]
  i2094.uvTopLeftX = i2095[13]
  i2094.uvTopLeftY = i2095[14]
  i2094.uvTopRightX = i2095[15]
  i2094.uvTopRightY = i2095[16]
  return i2094
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i2096 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i2097 = data
  i2096.name = i2097[0]
  var i2099 = i2097[1]
  var i2098 = []
  for(var i = 0; i < i2099.length; i += 1) {
    i2098.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i2099[i + 0]) );
  }
  i2096.layers = i2098
  var i2101 = i2097[2]
  var i2100 = []
  for(var i = 0; i < i2101.length; i += 1) {
    i2100.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i2101[i + 0]) );
  }
  i2096.parameters = i2100
  i2096.animationClips = i2097[3]
  i2096.avatarUnsupported = i2097[4]
  return i2096
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i2104 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i2105 = data
  i2104.name = i2105[0]
  i2104.defaultWeight = i2105[1]
  i2104.blendingMode = i2105[2]
  i2104.avatarMask = i2105[3]
  i2104.syncedLayerIndex = i2105[4]
  i2104.syncedLayerAffectsTiming = !!i2105[5]
  i2104.syncedLayers = i2105[6]
  i2104.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i2105[7], i2104.stateMachine)
  return i2104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i2106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i2107 = data
  i2106.id = i2107[0]
  i2106.name = i2107[1]
  i2106.path = i2107[2]
  var i2109 = i2107[3]
  var i2108 = []
  for(var i = 0; i < i2109.length; i += 1) {
    i2108.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i2109[i + 0]) );
  }
  i2106.states = i2108
  var i2111 = i2107[4]
  var i2110 = []
  for(var i = 0; i < i2111.length; i += 1) {
    i2110.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i2111[i + 0]) );
  }
  i2106.machines = i2110
  var i2113 = i2107[5]
  var i2112 = []
  for(var i = 0; i < i2113.length; i += 1) {
    i2112.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i2113[i + 0]) );
  }
  i2106.entryStateTransitions = i2112
  var i2115 = i2107[6]
  var i2114 = []
  for(var i = 0; i < i2115.length; i += 1) {
    i2114.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i2115[i + 0]) );
  }
  i2106.exitStateTransitions = i2114
  var i2117 = i2107[7]
  var i2116 = []
  for(var i = 0; i < i2117.length; i += 1) {
    i2116.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i2117[i + 0]) );
  }
  i2106.anyStateTransitions = i2116
  i2106.defaultStateId = i2107[8]
  return i2106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i2120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i2121 = data
  i2120.id = i2121[0]
  i2120.name = i2121[1]
  i2120.cycleOffset = i2121[2]
  i2120.cycleOffsetParameter = i2121[3]
  i2120.cycleOffsetParameterActive = !!i2121[4]
  i2120.mirror = !!i2121[5]
  i2120.mirrorParameter = i2121[6]
  i2120.mirrorParameterActive = !!i2121[7]
  i2120.motionId = i2121[8]
  i2120.nameHash = i2121[9]
  i2120.fullPathHash = i2121[10]
  i2120.speed = i2121[11]
  i2120.speedParameter = i2121[12]
  i2120.speedParameterActive = !!i2121[13]
  i2120.tag = i2121[14]
  i2120.tagHash = i2121[15]
  i2120.writeDefaultValues = !!i2121[16]
  var i2123 = i2121[17]
  var i2122 = []
  for(var i = 0; i < i2123.length; i += 2) {
  request.r(i2123[i + 0], i2123[i + 1], 2, i2122, '')
  }
  i2120.behaviours = i2122
  var i2125 = i2121[18]
  var i2124 = []
  for(var i = 0; i < i2125.length; i += 1) {
    i2124.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i2125[i + 0]) );
  }
  i2120.transitions = i2124
  return i2120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i2130 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i2131 = data
  i2130.fullPath = i2131[0]
  i2130.canTransitionToSelf = !!i2131[1]
  i2130.duration = i2131[2]
  i2130.exitTime = i2131[3]
  i2130.hasExitTime = !!i2131[4]
  i2130.hasFixedDuration = !!i2131[5]
  i2130.interruptionSource = i2131[6]
  i2130.offset = i2131[7]
  i2130.orderedInterruption = !!i2131[8]
  i2130.destinationStateId = i2131[9]
  i2130.isExit = !!i2131[10]
  i2130.mute = !!i2131[11]
  i2130.solo = !!i2131[12]
  var i2133 = i2131[13]
  var i2132 = []
  for(var i = 0; i < i2133.length; i += 1) {
    i2132.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i2133[i + 0]) );
  }
  i2130.conditions = i2132
  return i2130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i2138 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i2139 = data
  i2138.destinationStateId = i2139[0]
  i2138.isExit = !!i2139[1]
  i2138.mute = !!i2139[2]
  i2138.solo = !!i2139[3]
  var i2141 = i2139[4]
  var i2140 = []
  for(var i = 0; i < i2141.length; i += 1) {
    i2140.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i2141[i + 0]) );
  }
  i2138.conditions = i2140
  return i2138
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i2144 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i2145 = data
  i2144.defaultBool = !!i2145[0]
  i2144.defaultFloat = i2145[1]
  i2144.defaultInt = i2145[2]
  i2144.name = i2145[3]
  i2144.nameHash = i2145[4]
  i2144.type = i2145[5]
  return i2144
}

Deserializers["UnityEditor.Rendering.Universal.AssetVersion"] = function (request, data, root) {
  var i2146 = root || request.c( 'UnityEditor.Rendering.Universal.AssetVersion' )
  var i2147 = data
  i2146.version = i2147[0]
  return i2146
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2148 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2149 = data
  var i2151 = i2149[0]
  var i2150 = []
  for(var i = 0; i < i2151.length; i += 1) {
    i2150.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2151[i + 0]) );
  }
  i2148.files = i2150
  i2148.componentToPrefabIds = i2149[1]
  return i2148
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2155 = data
  i2154.path = i2155[0]
  request.r(i2155[1], i2155[2], 0, i2154, 'unityObject')
  return i2154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2157 = data
  var i2159 = i2157[0]
  var i2158 = []
  for(var i = 0; i < i2159.length; i += 1) {
    i2158.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2159[i + 0]) );
  }
  i2156.scriptsExecutionOrder = i2158
  var i2161 = i2157[1]
  var i2160 = []
  for(var i = 0; i < i2161.length; i += 1) {
    i2160.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2161[i + 0]) );
  }
  i2156.sortingLayers = i2160
  var i2163 = i2157[2]
  var i2162 = []
  for(var i = 0; i < i2163.length; i += 1) {
    i2162.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2163[i + 0]) );
  }
  i2156.cullingLayers = i2162
  i2156.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2157[3], i2156.timeSettings)
  i2156.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2157[4], i2156.physicsSettings)
  i2156.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2157[5], i2156.physics2DSettings)
  i2156.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2157[6], i2156.qualitySettings)
  i2156.enableRealtimeShadows = !!i2157[7]
  i2156.enableAutoInstancing = !!i2157[8]
  i2156.enableStaticBatching = !!i2157[9]
  i2156.enableDynamicBatching = !!i2157[10]
  i2156.usePreservativeDynamicBatching = !!i2157[11]
  i2156.lightmapEncodingQuality = i2157[12]
  i2156.desiredColorSpace = i2157[13]
  var i2165 = i2157[14]
  var i2164 = []
  for(var i = 0; i < i2165.length; i += 1) {
    i2164.push( i2165[i + 0] );
  }
  i2156.allTags = i2164
  return i2156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2168 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2169 = data
  i2168.name = i2169[0]
  i2168.value = i2169[1]
  return i2168
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2173 = data
  i2172.id = i2173[0]
  i2172.name = i2173[1]
  i2172.value = i2173[2]
  return i2172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2177 = data
  i2176.id = i2177[0]
  i2176.name = i2177[1]
  return i2176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2179 = data
  i2178.fixedDeltaTime = i2179[0]
  i2178.maximumDeltaTime = i2179[1]
  i2178.timeScale = i2179[2]
  i2178.maximumParticleTimestep = i2179[3]
  return i2178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2181 = data
  i2180.gravity = new pc.Vec3( i2181[0], i2181[1], i2181[2] )
  i2180.defaultSolverIterations = i2181[3]
  i2180.bounceThreshold = i2181[4]
  i2180.autoSyncTransforms = !!i2181[5]
  i2180.autoSimulation = !!i2181[6]
  var i2183 = i2181[7]
  var i2182 = []
  for(var i = 0; i < i2183.length; i += 1) {
    i2182.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2183[i + 0]) );
  }
  i2180.collisionMatrix = i2182
  return i2180
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2186 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2187 = data
  i2186.enabled = !!i2187[0]
  i2186.layerId = i2187[1]
  i2186.otherLayerId = i2187[2]
  return i2186
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2188 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2189 = data
  request.r(i2189[0], i2189[1], 0, i2188, 'material')
  i2188.gravity = new pc.Vec2( i2189[2], i2189[3] )
  i2188.positionIterations = i2189[4]
  i2188.velocityIterations = i2189[5]
  i2188.velocityThreshold = i2189[6]
  i2188.maxLinearCorrection = i2189[7]
  i2188.maxAngularCorrection = i2189[8]
  i2188.maxTranslationSpeed = i2189[9]
  i2188.maxRotationSpeed = i2189[10]
  i2188.baumgarteScale = i2189[11]
  i2188.baumgarteTOIScale = i2189[12]
  i2188.timeToSleep = i2189[13]
  i2188.linearSleepTolerance = i2189[14]
  i2188.angularSleepTolerance = i2189[15]
  i2188.defaultContactOffset = i2189[16]
  i2188.autoSimulation = !!i2189[17]
  i2188.queriesHitTriggers = !!i2189[18]
  i2188.queriesStartInColliders = !!i2189[19]
  i2188.callbacksOnDisable = !!i2189[20]
  i2188.reuseCollisionCallbacks = !!i2189[21]
  i2188.autoSyncTransforms = !!i2189[22]
  var i2191 = i2189[23]
  var i2190 = []
  for(var i = 0; i < i2191.length; i += 1) {
    i2190.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2191[i + 0]) );
  }
  i2188.collisionMatrix = i2190
  return i2188
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2195 = data
  i2194.enabled = !!i2195[0]
  i2194.layerId = i2195[1]
  i2194.otherLayerId = i2195[2]
  return i2194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2196 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2197 = data
  var i2199 = i2197[0]
  var i2198 = []
  for(var i = 0; i < i2199.length; i += 1) {
    i2198.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2199[i + 0]) );
  }
  i2196.qualityLevels = i2198
  var i2201 = i2197[1]
  var i2200 = []
  for(var i = 0; i < i2201.length; i += 1) {
    i2200.push( i2201[i + 0] );
  }
  i2196.names = i2200
  i2196.shadows = i2197[2]
  i2196.anisotropicFiltering = i2197[3]
  i2196.antiAliasing = i2197[4]
  i2196.lodBias = i2197[5]
  i2196.shadowCascades = i2197[6]
  i2196.shadowDistance = i2197[7]
  i2196.shadowmaskMode = i2197[8]
  i2196.shadowProjection = i2197[9]
  i2196.shadowResolution = i2197[10]
  i2196.softParticles = !!i2197[11]
  i2196.softVegetation = !!i2197[12]
  i2196.activeColorSpace = i2197[13]
  i2196.desiredColorSpace = i2197[14]
  i2196.masterTextureLimit = i2197[15]
  i2196.maxQueuedFrames = i2197[16]
  i2196.particleRaycastBudget = i2197[17]
  i2196.pixelLightCount = i2197[18]
  i2196.realtimeReflectionProbes = !!i2197[19]
  i2196.shadowCascade2Split = i2197[20]
  i2196.shadowCascade4Split = new pc.Vec3( i2197[21], i2197[22], i2197[23] )
  i2196.streamingMipmapsActive = !!i2197[24]
  i2196.vSyncCount = i2197[25]
  i2196.asyncUploadBufferSize = i2197[26]
  i2196.asyncUploadTimeSlice = i2197[27]
  i2196.billboardsFaceCameraPosition = !!i2197[28]
  i2196.shadowNearPlaneOffset = i2197[29]
  i2196.streamingMipmapsMemoryBudget = i2197[30]
  i2196.maximumLODLevel = i2197[31]
  i2196.streamingMipmapsAddAllCameras = !!i2197[32]
  i2196.streamingMipmapsMaxLevelReduction = i2197[33]
  i2196.streamingMipmapsRenderersPerFrame = i2197[34]
  i2196.resolutionScalingFixedDPIFactor = i2197[35]
  i2196.streamingMipmapsMaxFileIORequests = i2197[36]
  i2196.currentQualityLevel = i2197[37]
  return i2196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i2204 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i2205 = data
  i2204.name = i2205[0]
  var i2207 = i2205[1]
  var i2206 = []
  for(var i = 0; i < i2207.length; i += 1) {
    i2206.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i2207[i + 0]) );
  }
  i2204.tos = i2206
  var i2209 = i2205[2]
  var i2208 = []
  for(var i = 0; i < i2209.length; i += 1) {
    i2208.push( i2209[i + 0] );
  }
  i2204.constant = i2208
  i2204.isValid = !!i2205[3]
  i2204.isHuman = !!i2205[4]
  i2204.hasRootMotion = !!i2205[5]
  return i2204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i2212 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i2213 = data
  i2212.hash = i2213[0]
  i2212.path = i2213[1]
  return i2212
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i2216 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i2217 = data
  i2216.weight = i2217[0]
  i2216.vertices = i2217[1]
  i2216.normals = i2217[2]
  i2216.tangents = i2217[3]
  return i2216
}

Deserializers["BuildBlock"] = function (request, data, root) {
  var i2220 = root || request.c( 'BuildBlock' )
  var i2221 = data
  i2220.type = i2221[0]
  i2220.localPosition = new pc.Vec3( i2221[1], i2221[2], i2221[3] )
  request.r(i2221[4], i2221[5], 0, i2220, 'prefab')
  i2220.localRotation = new pc.Quat(i2221[6], i2221[7], i2221[8], i2221[9])
  i2220.hasCustomBounds = !!i2221[10]
  i2220.visualStyle = i2221[11]
  i2220.replacementKey = i2221[12]
  i2220.color = new pc.Color(i2221[13], i2221[14], i2221[15], i2221[16])
  return i2220
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2222 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2223 = data
  request.r(i2223[0], i2223[1], 0, i2222, 'm_ObjectArgument')
  i2222.m_ObjectArgumentAssemblyTypeName = i2223[2]
  i2222.m_IntArgument = i2223[3]
  i2222.m_FloatArgument = i2223[4]
  i2222.m_StringArgument = i2223[5]
  i2222.m_BoolArgument = !!i2223[6]
  return i2222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings"] = function (request, data, root) {
  var i2224 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings' )
  var i2225 = data
  i2224.Event = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2225[0], i2224.Event)
  i2224.filterSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings', i2225[1], i2224.filterSettings)
  i2224.overrideMaterialId = i2225[2]
  i2224.overrideMaterialPassIndex = i2225[3]
  i2224.overrideShaderId = i2225[4]
  i2224.overrideShaderPassIndex = i2225[5]
  i2224.overrideMode = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2225[6], i2224.overrideMode)
  i2224.overrideDepthState = !!i2225[7]
  i2224.depthCompareFunction = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2225[8], i2224.depthCompareFunction)
  i2224.enableWrite = !!i2225[9]
  i2224.stencilSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.StencilStateData', i2225[10], i2224.stencilSettings)
  i2224.cameraSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings', i2225[11], i2224.cameraSettings)
  return i2224
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i2228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i2229 = data
  i2228.mode = i2229[0]
  i2228.parameter = i2229[1]
  i2228.threshold = i2229[2]
  return i2228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.EnumDescription"] = function (request, data, root) {
  var i2230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.EnumDescription' )
  var i2231 = data
  i2230.Value = i2231[0]
  return i2230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings"] = function (request, data, root) {
  var i2232 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings' )
  var i2233 = data
  i2232.RenderQueueType = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2233[0], i2232.RenderQueueType)
  i2232.LayerMask = i2233[1]
  var i2235 = i2233[2]
  var i2234 = []
  for(var i = 0; i < i2235.length; i += 1) {
    i2234.push( i2235[i + 0] );
  }
  i2232.PassNames = i2234
  return i2232
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.StencilStateData"] = function (request, data, root) {
  var i2236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.StencilStateData' )
  var i2237 = data
  i2236.overrideStencilState = !!i2237[0]
  i2236.stencilReference = i2237[1]
  i2236.stencilCompareFunctionValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2237[2], i2236.stencilCompareFunctionValue)
  i2236.passOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2237[3], i2236.passOperationValue)
  i2236.failOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2237[4], i2236.failOperationValue)
  i2236.zFailOperationValue = request.d('Luna.Unity.DTO.UnityEngine.Assets.EnumDescription', i2237[5], i2236.zFailOperationValue)
  return i2236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings"] = function (request, data, root) {
  var i2238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings' )
  var i2239 = data
  i2238.overrideCamera = !!i2239[0]
  i2238.restoreCamera = !!i2239[1]
  i2238.offset = new pc.Vec4( i2239[2], i2239[3], i2239[4], i2239[5] )
  i2238.cameraFieldOfView = i2239[6]
  return i2238
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Textures.RenderTexture":{"name":0,"width":1,"height":2,"anisoLevel":3,"filterMode":4,"hdr":5,"colorFormat":6,"depthStencilFormat":7,"renderTextureFormat":8,"depth":9,"wrapU":10,"wrapV":11},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CanvasGroup":{"m_Alpha":0,"m_Interactable":1,"m_BlocksRaycasts":2,"m_IgnoreParentGroups":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.UniversalRenderPipelineAsset":{"AdditionalLightsRenderingMode":0,"LightRenderingMode":1,"MainLightRenderingModeValue":2,"SupportsMainLightShadows":3,"MixedLightingSupported":4,"MainLightShadowmapResolutionValue":5,"SupportsSoftShadows":6,"SoftShadowQualityValue":7,"ShadowDistance":8,"ShadowCascadeCount":9,"Cascade2Split":10,"Cascade3Split":11,"Cascade4Split":13,"CascadeBorder":16,"ShadowDepthBias":17,"ShadowNormalBias":18,"RequireDepthTexture":19,"RequireOpaqueTexture":20,"scriptableRendererData":21},"Luna.Unity.DTO.UnityEngine.Assets.LightRenderingMode":{"Disabled":0,"PerVertex":1,"PerPixel":2},"Luna.Unity.DTO.UnityEngine.Assets.ScriptableRendererData":{"opaqueLayerMask":0,"transparentLayerMask":1,"RenderObjectsFeatures":2,"name":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects":{"settings":0,"name":1,"typeName":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+RenderObjectsSettings":{"Event":0,"filterSettings":1,"overrideMaterialId":2,"overrideMaterialPassIndex":3,"overrideShaderId":4,"overrideShaderPassIndex":5,"overrideMode":6,"overrideDepthState":7,"depthCompareFunction":8,"enableWrite":9,"stencilSettings":10,"cameraSettings":11},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Assets.EnumDescription":{"Value":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+FilterSettings":{"RenderQueueType":0,"LayerMask":1,"PassNames":2},"Luna.Unity.DTO.UnityEngine.Assets.StencilStateData":{"overrideStencilState":0,"stencilReference":1,"stencilCompareFunctionValue":2,"passOperationValue":3,"failOperationValue":4,"zFailOperationValue":5},"Luna.Unity.DTO.UnityEngine.Assets.RenderObjects+CustomCameraSettings":{"overrideCamera":0,"restoreCamera":1,"offset":2,"cameraFieldOfView":6}}

Deserializers.requiredComponents = {"54":[55],"56":[55],"57":[55],"58":[55],"59":[55],"60":[55],"61":[7],"62":[14],"63":[64],"65":[64],"66":[64],"67":[64],"68":[64],"69":[64],"70":[71],"72":[71],"73":[71],"74":[71],"75":[71],"76":[71],"77":[71],"78":[71],"79":[71],"80":[71],"81":[71],"82":[71],"83":[71],"84":[14],"85":[12],"86":[87],"88":[87],"39":[31],"89":[31],"90":[14],"16":[14],"21":[20],"91":[31],"92":[41,31],"93":[12],"94":[41,31],"95":[31],"96":[31],"97":[12,31],"98":[31,41],"99":[100],"101":[100],"102":[100],"103":[31],"104":[31],"48":[39],"33":[41,31],"105":[31],"40":[39],"106":[31],"107":[31],"108":[31],"109":[31],"110":[31],"111":[31],"112":[31],"113":[31],"114":[31],"50":[41,31],"115":[31],"116":[31],"117":[31],"118":[31],"32":[41,31],"119":[31],"120":[18],"121":[18],"19":[18],"122":[18],"123":[14],"124":[14]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.Avatar","UnityEngine.MonoBehaviour","BuildPlayerVisual","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Material","UnityEngine.Texture2D","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","UnityEngine.RenderTexture","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.Rendering.Universal.UniversalAdditionalCameraData","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.Light","UnityEngine.Rendering.Universal.UniversalAdditionalLightData","PointLightReflectionExclusion","GameController","BuildCameraController","AdjacentBlockPreviews","BuildCompleteFireworks","BuildCollisionWorld","BuildTouchControls","BuildBlockPlacer","BuildProgressUI","UnityEngine.RectTransform","UnityEngine.UI.Text","UnityEngine.UI.Image","GameplayMaterials","AudioController","UnityEngine.AudioSource","UnityEngine.AudioClip","WetGroundReflection","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.CanvasRenderer","UnityEngine.Sprite","UnityEngine.Font","UnityEngine.CanvasGroup","BuildTapTutorial","UnityEngine.BoxCollider","UnityEngine.GameObject","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Button","UnityEngine.UI.RawImage","LunaController","UnityEngine.Cubemap","UnityEditor.Rendering.Universal.AssetVersion","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Rendering.UI.UIFoldout","UnityEngine.Rendering.Universal.PixelPerfectCamera","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CEBB_V13";

Deserializers.lunaInitializationTime = "10/23/2026 02:35:11";

Deserializers.lunaDaysRunning = "3.0";

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

Deserializers.buildID = "871b0e0c-0531-4f29-a932-105ac7d0ae35";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Rendering","DebugUpdater","RuntimeInit"],["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["UnityEngine","Experimental","Rendering","XRSystem","XRSystemInit"]],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

