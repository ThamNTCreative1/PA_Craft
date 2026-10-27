Shader "Playable/KeyboardEscape/Direction" {
Properties { _mainTexture("Original arrow",2D)="white"{} _Color("Color",Color)=(1,1,1,1) _Direction("Scroll",Vector)=(-1.63,0,0,0) _Tiling("Tiling",Vector)=(10.89,1,0,0) }
SubShader {Tags {"RenderType"="Transparent" "Queue"="Transparent"} Cull Off ZWrite Off Blend SrcAlpha OneMinusSrcAlpha
Pass { CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"
struct appdata{float4 vertex:POSITION;float2 uv:TEXCOORD0;fixed4 color:COLOR;};struct v2f{float4 pos:SV_POSITION;float2 uv:TEXCOORD0;fixed4 color:COLOR;};
sampler2D _mainTexture;float4 _Color,_Direction,_Tiling;
v2f vert(appdata v){v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.uv=v.uv*_Tiling.xy+_Direction.xy*_Time.y;o.color=v.color*_Color;return o;}
fixed4 frag(v2f i):SV_Target{return tex2D(_mainTexture,i.uv)*i.color;}
ENDCG } } }
