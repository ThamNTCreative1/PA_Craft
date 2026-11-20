// Terrain baked to a mesh (Luna has no Terrain runtime): up to 4 tiled layers blended by the mesh VERTEX COLOUR
// (R,G,B,A = layer 0..3 weight, from TerrainData alphamaps). A control texture came out white in Luna, so the weights
// live in the vertices. uv0 = 0..1 over the terrain; each layer's tiling/offset (_LayerN_ST) = terrain size / tileSize.
// Built-in RP, Lambert, no keywords.
Shader "Playable/TerrainSplat" {
	Properties {
		_Layer0 ("Layer 0 (vertex R)", 2D) = "black" {}
		_Layer1 ("Layer 1 (vertex G)", 2D) = "black" {}
		_Layer2 ("Layer 2 (vertex B)", 2D) = "black" {}
		_Layer3 ("Layer 3 (vertex A)", 2D) = "black" {}
		_Saturation ("Saturation", Range(0,1.5)) = 1
		_Brightness ("Brightness", Range(0,1.5)) = 1
		_GrassTint ("Grass Tint (layer 0)", Color) = (0.23,0.62,0.44,1)
		_GrassTintAmount ("Grass Tint Amount", Range(0,1)) = 0
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200

		CGPROGRAM
		#pragma surface surf Lambert vertex:vert
		#pragma target 3.0

		sampler2D _Layer0;
		sampler2D _Layer1;
		sampler2D _Layer2;
		sampler2D _Layer3;
		float4 _Layer0_ST;
		float4 _Layer1_ST;
		float4 _Layer2_ST;
		float4 _Layer3_ST;
		half _Saturation;
		half _Brightness;
		fixed4 _GrassTint;
		half _GrassTintAmount;

		struct Input {
			float2 terrainUV;
			float4 weights;
		};

		void vert (inout appdata_full v, out Input o) {
			UNITY_INITIALIZE_OUTPUT(Input, o);
			o.terrainUV = v.texcoord.xy;
			o.weights = v.color;
		}

		void surf (Input IN, inout SurfaceOutput o) {
			float2 uv = IN.terrainUV;
			float4 w = IN.weights;
			float sum = max(w.r + w.g + w.b + w.a, 0.0001);
			// Layer 0 (grass) recoloured: its light/dark pattern x the tint colour (2x so mid grey = the tint)
			fixed3 g0 = tex2D(_Layer0, uv * _Layer0_ST.xy + _Layer0_ST.zw).rgb;
			half l0 = dot(g0, half3(0.299, 0.587, 0.114));
			g0 = lerp(g0, saturate(l0 * 2.0 * _GrassTint.rgb), _GrassTintAmount);
			fixed3 c = g0 * w.r
			         + tex2D(_Layer1, uv * _Layer1_ST.xy + _Layer1_ST.zw).rgb * w.g
			         + tex2D(_Layer2, uv * _Layer2_ST.xy + _Layer2_ST.zw).rgb * w.b
			         + tex2D(_Layer3, uv * _Layer3_ST.xy + _Layer3_ST.zw).rgb * w.a;
			c /= sum;
			half grey = dot(c, half3(0.299, 0.587, 0.114));
			o.Albedo = lerp(grey.xxx, c, _Saturation) * _Brightness;
			o.Alpha = 1;
		}
		ENDCG
	}
	Fallback "Diffuse"
}
