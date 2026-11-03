Shader "Hidden/ModelToPNG/XRayUnlit"
{
    Properties
    {
        _MainTex ("MainTex", 2D) = "white" {}
        _BaseMap ("BaseMap", 2D) = "white" {}
        _Color ("Color", Color) = (1,1,1,1)
        _BaseColor ("BaseColor", Color) = (1,1,1,1)
        _Cutoff ("Cutoff", Range(0,1)) = 0.5
    }

    SubShader
    {
        Tags { "Queue" = "Transparent+100" "RenderType" = "Transparent" }

        Pass
        {
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            sampler2D _MainTex;
            float4 _MainTex_ST;
            fixed4 _Color;
            fixed _Cutoff;

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                float2 uv : TEXCOORD0;
            };

            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                fixed4 col = tex2D(_MainTex, i.uv) * _Color;
                clip(col.a - _Cutoff);
                return col;
            }
            ENDCG
        }
    }
    Fallback Off
}