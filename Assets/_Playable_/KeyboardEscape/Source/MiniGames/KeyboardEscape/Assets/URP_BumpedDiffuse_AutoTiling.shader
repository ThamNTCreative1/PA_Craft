Shader "URP/BumpedDiffuse_AutoTiling"
{
    Properties
    {
        _Color ("Color", Color) = (1,1,1,1)
        _MainTex ("Base Map", 2D) = "white" {}
        _BumpMap ("Normal Map", 2D) = "bump" {}
        _BumpScale ("Normal Scale", Range(0,2)) = 1
        _TexelsPerUnit ("Texels Per Unit", Float) = 1
        _AutoTileScale ("Auto Tile Scale", Float) = 1
        [Toggle] _EnableShadow ("Enable Shadow", Float) = 1
        [Toggle] _EnableEmission ("Enable Emission", Float) = 0
        [HDR] _EmissionColor ("Emission Color", Color) = (0,0,0,1)
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

            sampler2D _MainTex;
            sampler2D _BumpMap;
            float4 _MainTex_ST;
            float4 _Color;
            float _BumpScale;
            float _TexelsPerUnit;
            float _AutoTileScale;
            float _EnableEmission;
            float4 _EmissionColor;

            Varyings vert(Attributes IN)
            {
                Varyings OUT;
                OUT.positionWS = TransformObjectToWorld(IN.positionOS.xyz);
                OUT.positionHCS = TransformWorldToHClip(OUT.positionWS);
                OUT.uv = TRANSFORM_TEX(IN.uv, _MainTex);

                OUT.normalWS = normalize(TransformObjectToWorldNormal(IN.normalOS));
                float3 tangentWS = normalize(TransformObjectToWorldDir(IN.tangentOS.xyz));
                float3 bitangentWS = cross(OUT.normalWS, tangentWS) * IN.tangentOS.w;
                OUT.tangentWS = tangentWS;
                OUT.bitangentWS = bitangentWS;
                return OUT;
            }

            half4 frag(Varyings IN) : SV_Target
            {
                // Auto tiling
                float2 uv = IN.uv * _TexelsPerUnit * _AutoTileScale;

                half4 baseColor = tex2D(_MainTex, uv) * _Color;

                // Normal map
                half3 normalTS = UnpackNormal(tex2D(_BumpMap, uv)) * _BumpScale;
                half3x3 TBN = half3x3(IN.tangentWS, IN.bitangentWS, IN.normalWS);
                half3 normalWS = normalize(mul(normalTS, TBN));

                // Lighting
                Light mainLight = GetMainLight();
                half3 lightDir = normalize(mainLight.direction);
                half NdotL = saturate(dot(normalWS, lightDir));
                half3 diffuse = baseColor.rgb * mainLight.color * NdotL;

                // Emission
                if (_EnableEmission > 0.5)
                {
                    diffuse += _EmissionColor.rgb;
                }

                return half4(diffuse, baseColor.a);
            }
            ENDHLSL
        }
    }
}