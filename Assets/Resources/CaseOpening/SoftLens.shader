Shader "UI/CaseOpening/SoftLens"
{
    Properties
    {
        [PerRendererData] _MainTex ("Sprite Texture", 2D) = "white" {}
        _Color ("Tint", Color) = (1,1,1,1)
        _LensRadius ("Radius", Float) = 215
        _LensSoftness ("Edge Softness", Float) = 6
        _OutsideBlur ("Outside Reel Mode", Float) = 0
        _BlurRadius ("Blur Radius Pixels", Float) = 0
        _StencilComp ("Stencil Comparison", Float) = 8
        _Stencil ("Stencil ID", Float) = 0
        _StencilOp ("Stencil Operation", Float) = 0
        _StencilWriteMask ("Stencil Write Mask", Float) = 255
        _StencilReadMask ("Stencil Read Mask", Float) = 255
        _ColorMask ("Color Mask", Float) = 15
    }
    SubShader
    {
        Tags { "Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent" "PreviewType"="Plane" "CanUseSpriteAtlas"="True" }
        Stencil
        {
            Ref [_Stencil]
            Comp [_StencilComp]
            Pass [_StencilOp]
            ReadMask [_StencilReadMask]
            WriteMask [_StencilWriteMask]
        }
        Cull Off
        Lighting Off
        ZWrite Off
        ZTest [unity_GUIZTestMode]
        Blend SrcAlpha OneMinusSrcAlpha
        ColorMask [_ColorMask]
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 3.0
            #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
            #include "UnityCG.cginc"
            #include "UnityUI.cginc"
            struct appdata
            {
                float4 vertex : POSITION;
                fixed4 color : COLOR;
                float2 uv : TEXCOORD0;
            };
            struct v2f
            {
                float4 vertex : SV_POSITION;
                fixed4 color : COLOR;
                float2 uv : TEXCOORD0;
                float4 screenPosition : TEXCOORD1;
                float2 localPosition : TEXCOORD2;
            };
            sampler2D _MainTex;
            fixed4 _Color;
            fixed4 _TextureSampleAdd;
            float4 _ClipRect;
            float4 _LensCenter;
            float _LensRadius;
            float _LensSoftness;
            float _OutsideBlur;
            float _BlurRadius;
            v2f vert(appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                o.color = v.color * _Color;
                o.localPosition = v.vertex.xy;
                o.screenPosition = ComputeScreenPos(o.vertex);
                return o;
            }
            fixed4 frag(v2f i) : SV_Target
            {
                fixed4 sampleColor = tex2D(_MainTex, i.uv);
                // Convert a screen-space blur radius into the UV space of
                // each UI graphic, so icon resolution does not affect blur.
                float2 dx = ddx(i.uv) * _BlurRadius;
                float2 dy = ddy(i.uv) * _BlurRadius;
                if (_OutsideBlur > 0.5 && _BlurRadius > 0.01)
                {
                    float4 total = 0;
                    // Separable Gaussian weights evaluated in one UI pass.
                    [unroll] for (int y = -2; y <= 2; y++)
                    {
                        [unroll] for (int x = -2; x <= 2; x++)
                        {
                            float wx = x == 0 ? 6.0 : (abs(x) == 1 ? 4.0 : 1.0);
                            float wy = y == 0 ? 6.0 : (abs(y) == 1 ? 4.0 : 1.0);
                            total += tex2D(_MainTex, i.uv + (dx * x + dy * y) * 0.5) * wx * wy;
                        }
                    }
                    sampleColor = total / 256.0;
                }
                fixed4 color = (sampleColor + _TextureSampleAdd) * i.color;
                float2 screenUV = i.screenPosition.xy / i.screenPosition.w;
                float distanceFromCenter = length((screenUV - _LensCenter.xy) * _ScreenParams.xy);
                float edgeWidth = max(_LensSoftness, max(fwidth(distanceFromCenter), 0.001));
                if (_OutsideBlur < 0.5)
                    color.a *= 1.0 - smoothstep(_LensRadius - edgeWidth, _LensRadius, distanceFromCenter);
                else
                    color.a *= smoothstep(_LensRadius, _LensRadius + edgeWidth, distanceFromCenter);
                #ifdef UNITY_UI_CLIP_RECT
                color.a *= UnityGet2DClipping(i.localPosition, _ClipRect);
                #endif
                return color;
            }
            ENDCG
        }
    }
}
