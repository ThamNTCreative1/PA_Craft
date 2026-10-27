Shader "Craft/WetGrass"
{
    Properties
    {
        [MainTexture] _BaseMap("Grass",2D)="white" {}
        [MainColor] _BaseColor("Wet tint",Color)=(.72,.82,.72,1)
        _Smoothness("Wet smoothness",Range(0,1))=.78
        _Metallic("Metallic",Range(0,1))=0
        _BumpScale("Normal scale",Float)=1
        _OcclusionStrength("Occlusion",Float)=1
        _EmissionColor("Emission",Color)=(0,0,0,0)
        _Cutoff("Cutoff",Float)=.5
        _ReflectionTex("Planar reflection",2D)="black" {}
        _ReflectionStrength("Reflection strength",Range(0,1))=.35
        _ReflectionHeight("Flat ground height",Float)=0
        [HideInInspector] _ReflectionReady("Ready",Float)=0
    }
    SubShader
    {
        Tags { "RenderPipeline"="UniversalPipeline" "RenderType"="Opaque" "Queue"="Geometry" }
        Pass
        {
            Name "ForwardLit"
            Tags { "LightMode"="UniversalForward" }
            ZWrite On
            HLSLPROGRAM
            #pragma target 3.0
            #pragma vertex LitPassVertex
            #pragma fragment WetFragment
            #pragma multi_compile _ _ADDITIONAL_LIGHTS_VERTEX _ADDITIONAL_LIGHTS
            #pragma multi_compile_fog
            #define REQUIRES_WORLD_SPACE_POS_INTERPOLATOR 1
            #define _ENVIRONMENTREFLECTIONS_OFF 1
            // Keep diffuse illumination and object reflections, but never draw light-source glints.
            #define _SPECULARHIGHLIGHTS_OFF 1
            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitInput.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitForwardPass.hlsl"
            TEXTURE2D(_ReflectionTex); SAMPLER(sampler_ReflectionTex);
            float4x4 _ReflectionVP;
            float _ReflectionStrength, _ReflectionHeight, _ReflectionReady;
            void WetFragment(Varyings input, out half4 color : SV_Target0)
            {
                LitPassFragment(input,color);
                float4 projected=mul(_ReflectionVP,float4(input.positionWS,1));
                float2 uv=projected.xy/max(projected.w,.0001)*.5+.5;
                #if UNITY_UV_STARTS_AT_TOP
                    uv.y=1-uv.y;
                #endif
                float valid=step(.001,projected.w)*step(0,uv.x)*step(uv.x,1)*step(0,uv.y)*step(uv.y,1);
                // One reflection plane only: elevated hills retain wet lighting, not false reflections.
                float flat=1-saturate(abs(input.positionWS.y-_ReflectionHeight)*50);
                float3 view=normalize(_WorldSpaceCameraPos-input.positionWS);
                float fresnel=.35+.65*pow(1-saturate(abs(view.y)),2);
                half4 reflection=SAMPLE_TEXTURE2D(_ReflectionTex,sampler_ReflectionTex,uv);
                color.rgb=lerp(color.rgb,reflection.rgb,saturate(reflection.a*_ReflectionStrength*fresnel*flat*valid*_ReflectionReady));
                color.a=1;
            }
            ENDHLSL
        }
    }
}
