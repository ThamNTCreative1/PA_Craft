Shader "Playable/KeyboardEscape/Key" {
Properties { _keyMap("Original alphabet atlas",2D)="white"{} _mainTex("Skin",2D)="white"{} _mainColor("Key color",Color)=(1,1,1,1) _charactersColor("Letter color",Color)=(0,0,0,1) _gridSize("Atlas grid",Vector)=(6,5,0,0) _keyOffset("Letter cell",Vector)=(0,0,0,0) _keyTiling("Letter tiling",Float)=0.18 _useTexture("Use skin",Float)=0 _tile("Skin scale",Float)=0.06 _scroll("Skin scroll",Vector)=(0,0,0,0) _alpha("Alpha",Range(0,1))=1 }
SubShader {Tags {"RenderType"="Transparent" "Queue"="Transparent"} Blend SrcAlpha OneMinusSrcAlpha ZWrite On
Pass { CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"
struct appdata{float4 vertex:POSITION;float3 normal:NORMAL;float2 uv:TEXCOORD0;};
struct v2f{float4 pos:SV_POSITION;float2 uv:TEXCOORD0;float3 normal:TEXCOORD1;float3 world:TEXCOORD2;};
sampler2D _keyMap,_mainTex;float4 _mainColor,_charactersColor,_gridSize,_keyOffset,_scroll;float _keyTiling,_useTexture,_tile,_alpha;
v2f vert(appdata v){v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.uv=v.uv;o.normal=v.normal;o.world=mul(unity_ObjectToWorld,v.vertex).xyz;return o;}
fixed4 frag(v2f i):SV_Target{float2 cell=(i.uv+_keyOffset.xy)/max(_gridSize.xy,float2(1,1));fixed4 a=tex2D(_keyMap,cell);fixed3 baseColor=lerp(_mainColor.rgb,tex2D(_mainTex,i.world.xz*_tile+_scroll.xy*_Time.y).rgb,saturate(_useTexture));float top=saturate(i.normal.y);float letter=a.r*a.a*top;fixed3 c=lerp(baseColor,_charactersColor.rgb,letter);c*=lerp(0.72,1.0,top);return fixed4(c,_alpha);}
ENDCG } } }
