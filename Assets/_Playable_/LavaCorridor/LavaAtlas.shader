Shader "Playable/LavaCorridorAtlas"
{
    Properties { _MainTex ("Minecraft lava animation", 2D) = "white" {} _Color ("Tint", Color) = (1,1,1,1) }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            sampler2D _MainTex; float4 _MainTex_TexelSize; fixed4 _Color;
            struct v2f { float4 pos:SV_POSITION; float3 world:TEXCOORD0; };
            v2f vert(appdata_base v) { v2f o; o.pos=UnityObjectToClipPos(v.vertex); o.world=mul(unity_ObjectToWorld,v.vertex).xyz; return o; }
            fixed4 frag(v2f i):SV_Target
            {
                float frames=max(1,_MainTex_TexelSize.w/_MainTex_TexelSize.z);
                float frame=fmod(floor(_Time.y*8),frames);
                float2 uv=frac(i.world.xz*.5+float2(0,_Time.y*.025));
                uv=clamp(uv,.5*_MainTex_TexelSize.x,1-.5*_MainTex_TexelSize.x);
                uv.y=(uv.y+frame)/frames;
                return tex2D(_MainTex,uv)*_Color;
            }
            ENDCG
        }
    }
}
