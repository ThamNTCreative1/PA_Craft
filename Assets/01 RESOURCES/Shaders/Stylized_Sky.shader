// Rewritten from the AssetRipper dummy: procedural stylized skybox (Built-in RP, no keywords).
// Works as the skybox material and on a sphere mesh centred on the camera (SkyDome, for Luna).
// Sky gradient by view height + sun disc/halo from the main directional light + horizon line.
Shader "Stylized/Sky" {
	Properties {
		[Header(Sun Disc)] _SunDiscColor ("Color", Color) = (1,1,1,1)
		_SunDiscMultiplier ("Multiplier", Float) = 25
		_SunDiscExponent ("Exponent", Float) = 125000
		[Header(Sun Halo)] _SunHaloColor ("Color", Color) = (0.8970588,0.7760561,0.6661981,1)
		_SunHaloExponent ("Exponent", Float) = 125
		_SunHaloContribution ("Contribution", Range(0, 1)) = 0.75
		[Header(Horizon Line)] _HorizonLineColor ("Color", Color) = (0.9044118,0.8872592,0.7913603,1)
		_HorizonLineExponent ("Exponent", Float) = 4
		_HorizonLineContribution ("Contribution", Range(0, 1)) = 0.25
		[Header(Sky Gradient)] _SkyGradientTop ("Top", Color) = (0.172549,0.5686274,0.6941177,1)
		_SkyGradientBottom ("Bottom", Color) = (0.764706,0.8156863,0.8509805,1)
		_SkyGradientExponent ("Exponent", Float) = 2.5
	}
	SubShader {
		Tags { "Queue"="Background" "RenderType"="Background" "PreviewType"="Skybox" }
		Cull Off
		ZWrite Off

		Pass {
			// ForwardBase so _WorldSpaceLightPos0 (sun) is set when drawn on the sky dome mesh (Luna has no skybox)
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "UnityCG.cginc"

			fixed4 _SunDiscColor;
			float _SunDiscMultiplier;
			float _SunDiscExponent;
			fixed4 _SunHaloColor;
			float _SunHaloExponent;
			float _SunHaloContribution;
			fixed4 _HorizonLineColor;
			float _HorizonLineExponent;
			float _HorizonLineContribution;
			fixed4 _SkyGradientTop;
			fixed4 _SkyGradientBottom;
			float _SkyGradientExponent;

			struct appdata { float4 vertex : POSITION; };
			struct v2f {
				float4 pos : SV_POSITION;
				float3 dir : TEXCOORD0;
			};

			v2f vert (appdata v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.dir = v.vertex.xyz;
				return o;
			}

			fixed4 frag (v2f i) : SV_Target {
				float3 dir = normalize(i.dir);

				// Sky gradient: bottom at the horizon, top overhead.
				float h = saturate(dir.y);
				float g = pow(h, 1.0 / max(_SkyGradientExponent, 0.0001));
				float3 col = lerp(_SkyGradientBottom.rgb, _SkyGradientTop.rgb, g);

				// Sun from the main directional light (fallback straight up-forward if none).
				float3 sunDir = _WorldSpaceLightPos0.xyz;
				sunDir = dot(sunDir, sunDir) > 0.0001 ? normalize(sunDir) : normalize(float3(0, 0.5, 1));
				float sd = saturate(dot(dir, sunDir));

				// Halo.
				float halo = pow(sd, max(_SunHaloExponent, 0.0001));
				col = lerp(col, _SunHaloColor.rgb, saturate(halo * _SunHaloContribution));

				// Horizon line.
				float horizon = pow(saturate(1.0 - abs(dir.y)), max(_HorizonLineExponent, 0.0001));
				col = lerp(col, _HorizonLineColor.rgb, saturate(horizon * _HorizonLineContribution));

				// Sun disc.
				float disc = saturate(pow(sd, max(_SunDiscExponent, 0.0001)) * _SunDiscMultiplier);
				col = lerp(col, _SunDiscColor.rgb, disc);

				return fixed4(col, 1);
			}
			ENDCG
		}
	}
	Fallback Off
}
