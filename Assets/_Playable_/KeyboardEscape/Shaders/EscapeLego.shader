Shader "Playable/KeyboardEscape/Lego" {
Properties { _BaseMap("Original baked texture",2D)="white"{} _BaseColor("Color",Color)=(1,1,1,1) _WorldTiling("World Tiling",Float)=1 _WorldOffset("Offset",Vector)=(0,0,0,0) _AutoWorldAlign("Align to pivot",Float)=1 }
SubShader { Tags {"RenderType"="Opaque"} Pass { CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"
struct appdata{float4 vertex:POSITION;float3 normal:NORMAL;};
struct v2f{float4 pos:SV_POSITION;float3 world:TEXCOORD0;float3 normal:TEXCOORD1;float3 align:TEXCOORD2;};
sampler2D _BaseMap;float4 _BaseColor,_WorldOffset;float _WorldTiling,_AutoWorldAlign;
v2f vert(appdata v){v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.world=mul(unity_ObjectToWorld,v.vertex).xyz;o.normal=UnityObjectToWorldNormal(v.normal);float3 pivot=mul(unity_ObjectToWorld,float4(0,0,0,1)).xyz;o.align=frac(pivot*_WorldTiling+_WorldOffset.xyz)*_AutoWorldAlign;return o;}
fixed4 frag(v2f i):SV_Target{float3 uv=i.world*_WorldTiling+_WorldOffset.xyz-i.align;float3 w=max(abs(i.normal),.00001);w/=w.x+w.y+w.z;fixed3 c=tex2D(_BaseMap,uv.zy).rgb*w.x+tex2D(_BaseMap,uv.xz).rgb*w.y+tex2D(_BaseMap,uv.xy).rgb*w.z;return fixed4(c*_BaseColor.rgb,_BaseColor.a);}
ENDCG } } }
