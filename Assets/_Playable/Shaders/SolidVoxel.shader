Shader "CEBB/Solid Voxel"
{
    Properties { _Color ("Color", Color) = (1,1,1,1) }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        Cull Off
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            fixed4 _Color;
            struct appdata { float4 vertex : POSITION; float3 normal : NORMAL; };
            struct v2f { float4 position : SV_POSITION; fixed3 shade : COLOR; };
            v2f vert(appdata v)
            {
                v2f o;
                o.position=UnityObjectToClipPos(v.vertex);
                float3 n=UnityObjectToWorldNormal(v.normal);
                float light=.76+.24*saturate(dot(normalize(n),normalize(float3(-.4,.8,-.3))));
                o.shade=_Color.rgb*light;
                return o;
            }
            fixed4 frag(v2f i) : SV_Target { return fixed4(i.shade,1); }
            ENDCG
        }
    }
    FallBack Off
}
