Shader "Playable/KeyboardEscape/Shield" {
Properties { _Color("Shield color",Color)=(.15,.8,1,.55) }
SubShader { Tags { "Queue"="Transparent" "RenderType"="Transparent" } Blend SrcAlpha OneMinusSrcAlpha ZWrite Off Cull Back
Pass { CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"
struct appdata {float4 vertex:POSITION;float3 normal:NORMAL;};
struct v2f {float4 pos:SV_POSITION;float3 normal:TEXCOORD0;float3 view:TEXCOORD1;float height:TEXCOORD2;};
fixed4 _Color;
v2f vert(appdata v){v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.normal=UnityObjectToWorldNormal(v.normal);o.view=_WorldSpaceCameraPos-mul(unity_ObjectToWorld,v.vertex).xyz;o.height=v.vertex.y;return o;}
fixed4 frag(v2f i):SV_Target{float rim=pow(1-saturate(dot(normalize(i.normal),normalize(i.view))),2);float band=pow(.5+.5*sin(i.height*25-_Time.y*3),8);return fixed4(_Color.rgb,_Color.a*(.08+rim*.8+band*.18));}
ENDCG } } }
