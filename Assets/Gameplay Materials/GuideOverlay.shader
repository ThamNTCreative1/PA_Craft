Shader "Craft/GuideOverlay"
{
    Properties { _Color ("Color", Color) = (1,1,1,1) }
    SubShader
    {
        Tags { "Queue"="Overlay" "RenderType"="Transparent" }
        Pass
        {
            Name "GuideOverlay"
            Tags { "LightMode"="SRPDefaultUnlit" }
            ZTest Always
            ZWrite Off
            Cull Off
            Blend SrcAlpha OneMinusSrcAlpha
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 2.0
            #include "UnityCG.cginc"
            fixed4 _Color;
            struct Output { float4 position : SV_POSITION; };
            Output vert(float4 position : POSITION)
            {
                Output o;
                o.position = UnityObjectToClipPos(position);
                return o;
            }
            fixed4 frag(Output input) : SV_Target { return _Color; }
            ENDCG
        }
    }
}
