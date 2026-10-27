Shader "Craft/UprightCubeSoil"
{
    Properties
    {
        [MainTexture] _BaseMap("Soil", 2D) = "white" {}
        [MainColor] _BaseColor("Color", Color) = (1,1,1,1)
        _Smoothness("Smoothness", Range(0,1)) = 0
        _Metallic("Metallic", Range(0,1)) = 0
        _BumpScale("Normal scale", Float) = 1
        _OcclusionStrength("Occlusion", Range(0,1)) = 1
        _EmissionColor("Emission", Color) = (0,0,0,0)
        _Cutoff("Cutoff", Float) = 0.5
    }
    SubShader
    {
        Tags { "RenderPipeline"="UniversalPipeline" "RenderType"="Opaque" "DisableBatching"="True" }
        Pass
        {
            Name "ForwardLit"
            Tags { "LightMode"="UniversalForward" }
            HLSLPROGRAM
            #pragma target 2.0
            #pragma vertex UprightVertex
            #pragma fragment LitPassFragment
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile _ _ADDITIONAL_LIGHTS_VERTEX _ADDITIONAL_LIGHTS
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitInput.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitForwardPass.hlsl"
            Varyings UprightVertex(Attributes input)
            {
                // Keep the built-in mesh. Its back-face UV.y runs upside down.
                if (abs(input.normalOS.y) < 0.5)
                    input.texcoord.y = input.positionOS.y + 0.5;
                else
                    input.texcoord.y = input.normalOS.y > 0 ? 0.99 : 0.01;
                input.texcoord = clamp(input.texcoord, 0.004, 0.996);
                return LitPassVertex(input);
            }
            ENDHLSL
        }
    }
}
