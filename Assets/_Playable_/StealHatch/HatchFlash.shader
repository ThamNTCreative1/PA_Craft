Shader "Playable/Hatch Flash"
{
    Properties
    {
        _TintColor ("Tint", Color) = (1, 0.96, 0.78, 1)
        _RayStrength ("Ray brightness", Float) = 1
        _GlowStrength ("Core brightness", Float) = 1
        _RayWidth ("Ray width multiplier", Float) = 2
    }
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" "IgnoreProjector"="True" }
        Blend SrcAlpha One
        Cull Off Lighting Off ZWrite Off
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            fixed4 _TintColor;
            half _RayStrength, _GlowStrength, _RayWidth;
            struct appdata { float4 vertex : POSITION; fixed4 color : COLOR; float2 uv : TEXCOORD0; };
            struct v2f { float4 pos : SV_POSITION; fixed4 color : COLOR; float2 uv : TEXCOORD0; };
            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                o.color = v.color * _TintColor;
                return o;
            }
            fixed4 frag(v2f i) : SV_Target
            {
                float2 p = (i.uv - .5) * 2;
                float radius = length(p);
                // Shafts widen away from the core, with softly fading outer ends.
                float sector = (atan2(p.y, p.x) + 3.14159265) * (16.0 / 6.2831853);
                float index = floor(sector);
                float offset = abs(frac(sector) - .5);
                float variation = frac(sin(index * 37.17 + 1.7) * 43758.5);
                float rayLength = lerp(.56, .96, variation);
                float progress = saturate(radius / rayLength);
                float width = lerp(.07, .19, variation) * _RayWidth * lerp(.35, 1, progress);
                float ray = saturate(1 - offset / max(.001, width));
                ray = ray * ray * (1 - smoothstep(.78, 1, progress));
                float core = exp(-radius * radius * 38);
                float glow = exp(-radius * radius * 7) * .14;
                float brightness = ray * _RayStrength + (core + glow) * _GlowStrength;
                return fixed4(i.color.rgb * brightness, i.color.a * saturate(1 - radius));
            }
            ENDCG
        }
    }
    Fallback Off
}
