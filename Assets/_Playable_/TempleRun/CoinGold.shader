Shader "Playable/Coin Gold"
{
    Properties
    {
        _Color ("Gold", Color) = (1, 0.78, 0.16, 1)
        _ShadowColor ("Gold shadow", Color) = (0.48, 0.23, 0.025, 1)
        _HighlightColor ("Gold highlight", Color) = (1, 0.95, 0.65, 1)
        _Shininess ("Shininess", Range(8, 64)) = 32
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        Pass
        {
            Cull Back
            ZWrite On
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 2.0
            #include "UnityCG.cginc"
            fixed4 _Color, _ShadowColor, _HighlightColor;
            half _Shininess;
            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
            };
            struct v2f
            {
                float4 pos : SV_POSITION;
                float3 worldPos : TEXCOORD0;
                half3 normal : TEXCOORD1;
            };
            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
                o.normal = UnityObjectToWorldNormal(v.normal);
                return o;
            }
            fixed4 frag(v2f i) : SV_Target
            {
                // One fixed key light: no scene lights, reflection probes or keyword variants.
                half3 n = normalize(i.normal);
                half3 lightDir = normalize(half3(-0.4, 0.8, -0.6));
                half3 viewDir = normalize(_WorldSpaceCameraPos.xyz - i.worldPos);
                half diffuse = saturate(dot(n, lightDir));
                half3 halfway = normalize(lightDir + viewDir);
                half specular = pow(saturate(dot(n, halfway)), _Shininess) * diffuse;
                half3 gold = lerp(_ShadowColor.rgb, _Color.rgb, 0.35h + 0.65h * diffuse);
                gold = lerp(gold, _HighlightColor.rgb, saturate(specular * 0.85h));
                return fixed4(gold, 1);
            }
            ENDCG
        }
    }
    Fallback Off
}
