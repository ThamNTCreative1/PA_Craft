Shader "Craft/RainUnlit"
{
    Properties { _Color ("Rain color", Color) = (.28,.61,.91,.65) }
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" "IgnoreProjector"="True" }
        Pass
        {
            Name "RainUnlit"
            Tags { "LightMode"="SRPDefaultUnlit" }
            ZTest LEqual
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
                o.position=UnityObjectToClipPos(position);
                return o;
            }
            fixed4 frag(Output input) : SV_Target { return _Color; }
            ENDCG
        }
    }
}
