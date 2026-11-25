// Simple transparent unlit shader for build-preview ghosts and their outlines.
// Written in plain CG (no URP keywords/includes) so Luna can convert it reliably.
Shader "CEBB/Ghost Unlit"
{
    Properties
    {
        _Color ("Color", Color) = (0.25, 0.9, 1, 0.23)
        _UseVertexColor ("Use Vertex Color", Float) = 0
    }
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" "IgnoreProjector"="True" }
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite Off
        Cull Off
        Lighting Off

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            fixed4 _Color;
            float _UseVertexColor;

            struct appdata
            {
                float4 vertex : POSITION;
                fixed4 color : COLOR;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                fixed4 color : COLOR;
            };

            v2f vert (appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.color = lerp(fixed4(1,1,1,1), v.color, _UseVertexColor) * _Color;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                return i.color;
            }
            ENDCG
        }
    }
    FallBack Off
}
