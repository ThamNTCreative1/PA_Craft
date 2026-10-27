Shader "Playable/KeyboardEscape/Unlit" {
Properties { _MainTex("Texture",2D)="white"{} _Color("Color",Color)=(1,1,1,1) _Cull("Cull",Float)=2 _ZWrite("ZWrite",Float)=1 _SrcBlend("Source blend",Float)=1 _DstBlend("Destination blend",Float)=0 _Cutoff("Alpha cutoff",Range(0,1))=0 }
SubShader { Tags { "RenderType"="Opaque" } Cull [_Cull] ZWrite [_ZWrite] Blend [_SrcBlend] [_DstBlend]
Pass { CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"
struct appdata {float4 vertex:POSITION;float2 uv:TEXCOORD0;fixed4 color:COLOR;};
struct v2f {float4 pos:SV_POSITION;float2 uv:TEXCOORD0;fixed4 color:COLOR;};
sampler2D _MainTex;float4 _MainTex_ST;fixed4 _Color;float _Cutoff;
v2f vert(appdata v){v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.uv=TRANSFORM_TEX(v.uv,_MainTex);o.color=v.color*_Color;return o;}
fixed4 frag(v2f i):SV_Target{fixed4 c=tex2D(_MainTex,i.uv)*i.color;clip(c.a-_Cutoff);return c;}
ENDCG } } }
