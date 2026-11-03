// Built-in port of the original URP shader graph SAE_Treadmil_Arrow:
// arrows tiled and scrolled by time, alpha shaped by an untiled mask, tinted by an HDR color.
Shader "SAE/Scroll Arrow"
{
    Properties
    {
        _mainTexture ("Arrows", 2D) = "white" {}
        _mask ("Mask", 2D) = "white" {}
        [HDR] _color ("Color", Color) = (1,1,1,1)
        _scrollDirection ("Scroll Direction", Vector) = (-2,0,0,0)
        _tiling ("Tiling", Vector) = (1,1,0,0)
    }
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" "IgnoreProjector"="True" }
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite Off
        Cull Back
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            sampler2D _mainTexture;
            sampler2D _mask;
            half4 _color;
            float4 _scrollDirection;
            float4 _tiling;

            struct appdata { float4 vertex : POSITION; float2 uv : TEXCOORD0; fixed4 color : COLOR; };
            struct v2f { float4 pos : SV_POSITION; float2 uv : TEXCOORD0; fixed4 color : COLOR; };

            v2f vert (appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                o.color = v.color;
                return o;
            }

            half4 frag (v2f i) : SV_Target
            {
                float2 scrolled = i.uv * _tiling.xy + _Time.y * _scrollDirection.xy;
                half4 arrows = tex2D(_mainTexture, scrolled);
                half mask = tex2D(_mask, i.uv).a;
                half4 c = arrows * mask * _color * i.color;
                return c;
            }
            ENDCG
        }
    }
}
