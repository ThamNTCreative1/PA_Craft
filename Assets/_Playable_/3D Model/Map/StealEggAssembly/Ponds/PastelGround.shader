Shader "Playable/Pastel Ground"
{
    Properties
    {
        _MainTex ("Original ground pattern", 2D) = "white" {}
        _Color ("Pastel pink", Color) = (1, 0.68, 0.79, 1)
        _PatternBrightness ("Pattern brightness", Float) = 0.31
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 200
        CGPROGRAM
        #pragma surface surf Standard fullforwardshadows
        #pragma target 3.0
        sampler2D _MainTex;
        fixed4 _Color;
        half _PatternBrightness;
        struct Input { float2 uv_MainTex; };
        void surf(Input IN, inout SurfaceOutputStandard o)
        {
            fixed3 pattern = tex2D(_MainTex, IN.uv_MainTex).rgb;
            half shade = saturate(dot(pattern, half3(0.299, 0.587, 0.114)) / max(_PatternBrightness, 0.001));
            o.Albedo = _Color.rgb * shade;
            o.Metallic = 0;
            o.Smoothness = 0;
            o.Alpha = 1;
        }
        ENDCG
    }
    FallBack "Diffuse"
}
