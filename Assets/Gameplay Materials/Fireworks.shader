Shader "Craft/Fireworks"
{
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" }
        Pass
        {
            Tags { "LightMode"="SRPDefaultUnlit" }
            ZWrite Off
            ZTest LEqual
            Cull Off
            Blend SrcAlpha One
            CGPROGRAM
            #pragma target 2.0
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            struct Input {float4 position:POSITION;fixed4 color:COLOR;};
            struct Output {float4 position:SV_POSITION;fixed4 color:COLOR;};
            Output vert(Input v){Output o;o.position=UnityObjectToClipPos(v.position);o.color=v.color;return o;}
            fixed4 frag(Output i):SV_Target{return i.color;}
            ENDCG
        }
    }
}
