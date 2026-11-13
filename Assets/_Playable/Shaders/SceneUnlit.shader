Shader "CEBB/Scene Unlit"
{
    Properties
    {
        _Saturation ("Saturation", Float) = 1
        _PastelMix ("Pastel Mix", Range(0,1)) = 0
        _Brightness ("Brightness", Float) = 1
        _MainTex ("Texture", 2D) = "white" {}
        _Color ("Color", Color) = (1,1,1,1)
        _AlphaClip ("Alpha Clip", Float) = 0
        _Cutoff ("Alpha Cutoff", Range(0,1)) = 0.5
        [Enum(UnityEngine.Rendering.CullMode)] _Cull ("Cull", Float) = 2
        [Enum(UnityEngine.Rendering.BlendMode)] _SrcBlend ("Source Blend", Float) = 1
        [Enum(UnityEngine.Rendering.BlendMode)] _DstBlend ("Destination Blend", Float) = 0
        [Toggle] _ZWrite ("Depth Write", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" "IgnoreProjector"="True" }
        Cull [_Cull]
        Blend [_SrcBlend] [_DstBlend]
        ZWrite [_ZWrite]
        Lighting Off
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            sampler2D _MainTex;
            float4 _MainTex_ST;
            fixed4 _Color;
            float _Saturation, _PastelMix, _Brightness;
            float _AlphaClip;
            float _Cutoff;
            struct appdata { float4 vertex : POSITION; float2 uv : TEXCOORD0; };
            struct v2f { float4 position : SV_POSITION; float2 uv : TEXCOORD0; };
            v2f vert(appdata input)
            {
                v2f output;
                output.position = UnityObjectToClipPos(input.vertex);
                output.uv = TRANSFORM_TEX(input.uv, _MainTex);
                return output;
            }
            fixed4 frag(v2f input) : SV_Target
            {
                fixed4 color = tex2D(_MainTex, input.uv) * _Color;
                clip(lerp(1.0, color.a - _Cutoff, _AlphaClip));
                float luma = dot(color.rgb, float3(.299,.587,.114));
                color.rgb = saturate(lerp(luma.xxx, color.rgb, _Saturation) * _Brightness);
                color.rgb = lerp(color.rgb, float3(1,.98,.95), _PastelMix);
                return color;
            }
            ENDCG
        }
    }
    FallBack Off
}
