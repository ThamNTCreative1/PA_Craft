Shader "MinecraftImageMesh/VertexColorLit"
{
    Properties
    {
        _Color ("Tint", Color) = (1, 1, 1, 1)
    }

    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            Tags { "LightMode"="ForwardBase" }

            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fwdbase

            #include "UnityCG.cginc"
            #include "Lighting.cginc"

            fixed4 _Color;

            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                fixed4 color : COLOR;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                fixed4 color : COLOR;
                fixed3 diffuse : TEXCOORD0;
            };

            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);

                fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);
                fixed ndotl = saturate(dot(worldNormal, _WorldSpaceLightPos0.xyz));
                o.diffuse = UNITY_LIGHTMODEL_AMBIENT.rgb + (_LightColor0.rgb * ndotl);
                o.color = v.color * _Color;
                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                return fixed4(i.color.rgb * i.diffuse, i.color.a);
            }
            ENDCG
        }
    }

    FallBack "Diffuse"
}
