Shader "Universal Render Pipeline/CustomLit"
{
    Properties
    {
        _BaseMap ("Albedo", 2D) = "white" {}
        _BaseColor ("Color", Color) = (1,1,1,1)
        _Cutoff ("Alpha Cutoff", Range(0,1)) = 0.5
        _Smoothness ("Smoothness", Range(0,1)) = 0.5
        _Metallic ("Metallic", Range(0,1)) = 0
        _BumpMap ("Normal Map", 2D) = "bump" {}
        _BumpScale ("Normal Scale", Range(0,2)) = 1
        [HDR] _EmissionColor ("Emission Color", Color) = (0,0,0,1)
        _EmissionMap ("Emission", 2D) = "white" {}
    }

    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        LOD 200

        Pass
        {
            Name "ForwardLit"
            Tags { "LightMode"="UniversalForward" }

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS
            #pragma multi_compile _ _ADDITIONAL_LIGHTS

            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"

            struct Attributes
            {
                float4 positionOS : POSITION;
                float2 uv : TEXCOORD0;
                float3 normalOS : NORMAL;
                float4 tangentOS : TANGENT;
            };

            struct Varyings
            {
                float4 positionHCS : SV_POSITION;
                float2 uv : TEXCOORD0;
                float3 normalWS : TEXCOORD1;
                float3 tangentWS : TEXCOORD2;
                float3 bitangentWS : TEXCOORD3;
                float3 positionWS : TEXCOORD4;
            };

            sampler2D _BaseMap;
            sampler2D _BumpMap;
            sampler2D _EmissionMap;
            float4 _BaseMap_ST;
            float4 _BaseColor;
            float _BumpScale;
            float _Metallic;
            float _Smoothness;
            float4 _EmissionColor;

            Varyings vert(Attributes IN)
            {
                Varyings OUT;
                OUT.positionWS = TransformObjectToWorld(IN.positionOS.xyz);
                OUT.positionHCS = TransformWorldToHClip(OUT.positionWS);
                OUT.uv = TRANSFORM_TEX(IN.uv, _BaseMap);

                OUT.normalWS = normalize(TransformObjectToWorldNormal(IN.normalOS));
                float3 tangentWS = normalize(TransformObjectToWorldDir(IN.tangentOS.xyz));
                float3 bitangentWS = cross(OUT.normalWS, tangentWS) * IN.tangentOS.w;
                OUT.tangentWS = tangentWS;
                OUT.bitangentWS = bitangentWS;
                return OUT;
            }

            half4 frag(Varyings IN) : SV_Target
            {
                half4 albedo = tex2D(_BaseMap, IN.uv) * _BaseColor;

                // Normal map
                half3 normalTS = UnpackNormal(tex2D(_BumpMap, IN.uv)) * _BumpScale;
                half3x3 TBN = half3x3(IN.tangentWS, IN.bitangentWS, IN.normalWS);
                half3 normalWS = normalize(mul(normalTS, TBN));

                // Lighting
                Light mainLight = GetMainLight();
                half3 lightDir = normalize(mainLight.direction);
                half NdotL = saturate(dot(normalWS, lightDir));
                half3 diffuse = albedo.rgb * mainLight.color * NdotL;

                // Simple metallic/smoothness effect
                half3 specular = pow(NdotL, 32) * _Smoothness * mainLight.color;

                // Emission
                half3 emission = tex2D(_EmissionMap, IN.uv).rgb * _EmissionColor.rgb;

                return half4(diffuse + specular + emission, albedo.a);
            }
            ENDHLSL
        }

        Pass
        {
            Name "ShadowCaster"
            Tags { "LightMode"="ShadowCaster" }
            ZWrite On
            ColorMask 0

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            struct Attributes
            {
                float4 positionOS : POSITION;
            };

            struct Varyings
            {
                float4 positionHCS : SV_POSITION;
            };

            Varyings vert(Attributes IN)
            {
                Varyings OUT;
                float3 positionWS = TransformObjectToWorld(IN.positionOS.xyz);
                OUT.positionHCS = TransformWorldToHClip(positionWS);
                return OUT;
            }

            half4 frag(Varyings IN) : SV_Target
            {
                return 0;
            }
            ENDHLSL
        }
    }

    Fallback "Hidden/Universal RenderPipeline/FallbackError"
}