// Rewritten from the AssetRipper dummy: lit diffuse texture tiled in WORLD space (triplanar),
// so stretched/scaled cubes keep a constant texel size. uv = worldPos * _Scale * tiling + offset.
// Built-in RP, Lambert, no keywords.
Shader "Custom/TillingCustom" {
	Properties {
		_MainTex ("Texture", 2D) = "white" {}
		_Scale ("Scale", Float) = 1
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200

		CGPROGRAM
		#pragma surface surf Lambert
		#pragma target 2.0

		sampler2D _MainTex;
		float4 _MainTex_ST;
		float _Scale;

		struct Input {
			float3 worldPos;
			float3 worldNormal;
		};

		void surf (Input IN, inout SurfaceOutput o) {
			// Triplanar: each face samples the world plane it faces, so scaled cubes tile evenly on all sides.
			float3 p = IN.worldPos * _Scale;
			float3 w = abs(normalize(IN.worldNormal));
			w = w * w * w;
			w /= (w.x + w.y + w.z);
			fixed4 cx = tex2D(_MainTex, p.zy * _MainTex_ST.xy + _MainTex_ST.zw);
			fixed4 cy = tex2D(_MainTex, p.xz * _MainTex_ST.xy + _MainTex_ST.zw);
			fixed4 cz = tex2D(_MainTex, p.xy * _MainTex_ST.xy + _MainTex_ST.zw);
			fixed4 c = cx * w.x + cy * w.y + cz * w.z;
			o.Albedo = c.rgb;
			o.Alpha = 1;
		}
		ENDCG
	}
	Fallback "Diffuse"
}
