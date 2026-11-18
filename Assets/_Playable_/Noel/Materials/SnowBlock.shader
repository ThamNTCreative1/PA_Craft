// Tuyet dang khoi voxel (SnowGridChunk) - ban Built-in RP cho playable.
// Unlit (giong material map cua PA_Craft) de tuyet trang nhu ban goc: mat tren trang tinh,
// vach dung hoi toi theo mau dinh (vertex color .r = AO: tren 1.0, mat ranh 0.9, vach 0.85).
Shader "Playable/Noel/SnowBlock"
{
    Properties
    {
        _BaseColor ("Snow Color", Color) = (1, 1, 1, 1)
        _AOStrength ("Vertex AO Strength", Range(0, 1)) = 1
        _Brightness ("Brightness", Range(0.5, 1.5)) = 1
    }

    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" }

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "UnityCG.cginc"

            fixed4 _BaseColor;
            half _AOStrength;
            half _Brightness;

            struct appdata
            {
                float4 vertex : POSITION;
                fixed4 color : COLOR;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                fixed3 color : COLOR0;
                UNITY_FOG_COORDS(1)
            };

            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                half ao = lerp(1.0, v.color.r, _AOStrength);
                o.color = saturate(_BaseColor.rgb * ao * _Brightness);
                UNITY_TRANSFER_FOG(o, o.pos);
                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                fixed4 c = fixed4(i.color, 1);
                UNITY_APPLY_FOG(i.fogCoord, c);
                return c;
            }
            ENDCG
        }
    }

    FallBack Off
}
