Shader "Craft/LeavesCutout"
{
    Properties
    {
        [MainTexture] _BaseMap("Leaves atlas", 2D) = "white" {}
        [MainColor] _BaseColor("Tint", Color) = (1,1,1,1)
        _Smoothness("Smoothness", Range(0,1)) = 0
        _Metallic("Metallic", Range(0,1)) = 0
        _BumpScale("Normal scale", Float) = 1
        _OcclusionStrength("Occlusion", Range(0,1)) = 1
        _EmissionColor("Emission", Color) = (0,0,0,0)
        _Cutoff("Alpha cutoff", Float) = 0.5
        _RecolorPetals("Recolor yellow petals", Range(0,1)) = 0
        _PetalColor("Petal color", Color) = (1,1,1,1)
    }
    SubShader
    {
        Tags { "RenderPipeline"="UniversalPipeline" "Queue"="AlphaTest" "RenderType"="TransparentCutout" }
        Pass
        {
            Name "ForwardLit"
            Tags { "LightMode"="UniversalForward" }
            Cull Off
            ZWrite On
            HLSLPROGRAM
            #pragma target 2.0
            #pragma vertex LitPassVertex
            #pragma fragment LeavesFragment
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile _ _ADDITIONAL_LIGHTS_VERTEX _ADDITIONAL_LIGHTS
            #pragma multi_compile_fog
            // Matte foliage: retain diffuse lighting without glossy highlights/reflections.
            #define _SPECULARHIGHLIGHTS_OFF 1
            #define _ENVIRONMENTREFLECTIONS_OFF 1
            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitInput.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitForwardPass.hlsl"
            half _RecolorPetals;
            half4 _PetalColor;
            void LeavesFragment(Varyings input, out half4 color : SV_Target0)
            {
                // Genuine alpha gaps: darker green leaves remain visible.
                half4 leaf = SAMPLE_TEXTURE2D(_BaseMap, sampler_BaseMap, input.uv);
                clip(leaf.a - _Cutoff);
                LitPassFragment(input, color);
                // Darkening only: even overlapping lights cannot wash out the leaf albedo.
                half3 albedo = leaf.rgb * _BaseColor.rgb;
                color.rgb = min(max(color.rgb, 0.0h), albedo);
                // Yellow-only mask preserves green stems, alpha, and existing pixel shading.
                half petalMask=step(leaf.g*.9h,leaf.r)*step(leaf.b+.2h,leaf.r)*_RecolorPetals;
                half lighting=saturate(dot(color.rgb,half3(.3,.6,.1))/max(dot(albedo,half3(.3,.6,.1)),.001h));
                half3 petals=_PetalColor.rgb*max(leaf.r,leaf.g)*lighting;
                color.rgb=lerp(color.rgb,petals,petalMask);
            }
            ENDHLSL
        }
    }
}
