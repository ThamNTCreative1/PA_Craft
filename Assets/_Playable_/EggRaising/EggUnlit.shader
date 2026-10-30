Shader "Playable/Egg Unlit"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Color ("Color", Color) = (1,1,1,1)
        _ShapeShading ("Soft shape shading", Range(0,1)) = 0.22
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            sampler2D _MainTex;
            float4 _MainTex_ST;
            fixed4 _Color;
            half _ShapeShading;
            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                float2 uv : TEXCOORD0;
            };
            struct v2f
            {
                float4 pos : SV_POSITION;
                float2 uv : TEXCOORD0;
                half shade : TEXCOORD1;
            };
            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                // Fixed local shading preserves shape without scene lights or gray specular.
                half facing = saturate(dot(normalize(v.normal), normalize(float3(-0.4,0.8,0.45))));
                o.shade = lerp(1.0h, 0.65h + 0.35h * facing, _ShapeShading);
                return o;
            }
            fixed4 frag(v2f i) : SV_Target
            {
                fixed4 color = tex2D(_MainTex, i.uv) * _Color;
                return fixed4(color.rgb * i.shade, 1);
            }
            ENDCG
        }
    }
    Fallback Off
}
