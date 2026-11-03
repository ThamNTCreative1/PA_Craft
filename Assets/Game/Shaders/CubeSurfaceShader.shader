Shader "Custom/CubeSurfaceShader"
{
 Properties {
        _MainTex ("Texture", 2D) = "white" {}
        _ForwardTex ("Texture Forward", 2D) = "black" {}
        _BackTex ("Texture Back", 2D) = "white" {}
        _LeftTex ("Texture Left", 2D) = "white" {}
        _RightTex ("Texture Right", 2D) = "black" {}
        _TopTex ("Texture Top", 2D) = "white" {}   
        _BottomTex ("Texture Bottom", 2D) = "white" {}
		_GlowColor ("Glow Color", Color) =  (1,1,1,1)
		_Glow ("Glow", Range(0,1)) = 1
    }

    SubShader {
        Tags {"RenderType"="Opaque"}
        LOD 100

        Pass {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            struct appdata {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
                float2 uv : TEXCOORD0;
            };

            struct v2f {
                float2 uv : TEXCOORD0;
                float3 normal : TEXCOORD1;
                float4 vertex : SV_POSITION;
            };

            sampler2D _MainTex;
            sampler2D _ForwardTex;
            sampler2D _BackTex;
            sampler2D _LeftTex;
            sampler2D _RightTex;
            sampler2D _TopTex;
            sampler2D _BottomTex;
            float _Glow;
            float4 _GlowColor;

            v2f vert (appdata v) {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                o.normal = v.normal;
                return o;
            }

            float4 frag (v2f i) : SV_Target {
                float4 col;
                if (i.normal.z < 0) {
                     //flipping face 3 texture so that it is orientated the same as sides 1,2&4
                    float2 uv = i.uv; 
                    uv.x = 1.0 - uv.x; //flip texture in the X
                    uv.y = 1.0 - uv.y; //flip texture in the Y
                    col = tex2D(_BackTex, uv);
                }
                else if(i.normal.x > 0) col = tex2D(_RightTex, i.uv);
                else if(i.normal.x < 0) col = tex2D(_LeftTex, i.uv);
                else if(i.normal.y > 0) col = tex2D(_TopTex, i.uv);
                else if(i.normal.y < 0) col = tex2D(_BottomTex, i.uv);
                else col = tex2D(_ForwardTex, i.uv);
                
                col =  col + _Glow * _GlowColor;

                return col;
            }
        ENDCG
        }
    }
    FallBack "Diffuse"
}