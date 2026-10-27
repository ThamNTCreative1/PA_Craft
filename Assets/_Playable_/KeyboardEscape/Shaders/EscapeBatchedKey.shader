Shader "Playable/KeyboardEscape/BatchedKey" {
Properties { _keyMap("Original alphabet atlas",2D)="white"{} _PressPoint("Player foot",Vector)=(0,-1000,0,0) }
SubShader {Tags {"RenderType"="Opaque"} Cull Back ZWrite On
Pass { CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"
struct appdata {float4 vertex:POSITION;float3 normal:NORMAL;float2 uv:TEXCOORD0;float2 pivotXZ:TEXCOORD1;float2 pivotY:TEXCOORD2;fixed4 color:COLOR;};
struct v2f {float4 pos:SV_POSITION;float2 uv:TEXCOORD0;fixed4 color:COLOR;float top:TEXCOORD1;};
sampler2D _keyMap;float4 _PressPoint;
v2f vert(appdata v){v2f o;float3 pivot=float3(v.pivotXZ.x,v.pivotY.x,v.pivotXZ.y);float press=(1-smoothstep(.35,.95,distance(pivot.xz,_PressPoint.xz)))*(1-step(1.4,abs(pivot.y-_PressPoint.y)));v.vertex.xyz=lerp(v.vertex.xyz,pivot+(v.vertex.xyz-pivot)*float3(.7,.1,.7),press);o.pos=UnityObjectToClipPos(v.vertex);o.uv=v.uv;o.color=v.color;o.top=saturate(v.normal.y);return o;}
fixed4 frag(v2f i):SV_Target{fixed4 letter=tex2D(_keyMap,i.uv);fixed3 color=i.color.rgb*(1-letter.r*letter.a*i.top);return fixed4(color*lerp(.72,1,i.top),1);}
ENDCG } } }
