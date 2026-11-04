Shader "Playable/Hotbar Clip"
{
    Properties
    {
        [PerRendererData] _MainTex ("Sprite Texture", 2D) = "white" {}
        _Color ("Tint", Color) = (1,1,1,1)
        _HotbarClip ("Screen Clip", Vector) = (0,0,1,1)
    }
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" "IgnoreProjector"="True" "CanUseSpriteAtlas"="True" }
        Cull Off
        Lighting Off
        ZWrite Off
        ZTest [unity_GUIZTestMode]
        Blend SrcAlpha OneMinusSrcAlpha
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            struct appdata { float4 vertex : POSITION; float4 color : COLOR; float2 uv : TEXCOORD0; };
            struct v2f { float4 vertex : SV_POSITION; float4 color : COLOR; float2 uv : TEXCOORD0; float4 screen : TEXCOORD1; };
            sampler2D _MainTex;
            float4 _Color;
            float4 _HotbarClip;
            v2f vert(appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.screen = ComputeScreenPos(o.vertex);
                o.uv = v.uv;
                o.color = v.color * _Color;
                return o;
            }
            fixed4 frag(v2f i) : SV_Target
            {
                float2 p = i.screen.xy / i.screen.w;
                float2 inside = step(_HotbarClip.xy, p) * step(p, _HotbarClip.zw);
                return tex2D(_MainTex, i.uv) * i.color * inside.x * inside.y;
            }
            ENDCG
        }
    }
}
