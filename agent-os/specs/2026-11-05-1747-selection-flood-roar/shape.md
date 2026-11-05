# Selection feedback, named hero options and fixed Flood

Status: PENDING APPROVAL
Planner: Claude CLI, including final water-material correction recorded by Codex.

Source logic confirmed by user oke. Adapt only flood activation/rise/sound; no source framework/shader/asset copying. Four goals: current card pulses with hand; four named Luna hero dropdowns; fixed Flood weather; roar once at selection entry.

Composition only: WeatherPresetController delegates visual rise to FloodWeatherView; HeroRoster retains existing resolver; hint owns all tutorial tweens. No new interface/pattern, swimming/damage/buoyancy/CTA/outcome changes.

Intentional visual adaptation: RGB target water texture has no alpha, so allowlisted Unlit/Texture opaque Minecraft-style surface replaces original URP translucent water. Do not use particle-only shader on mesh. One new small material references existing texture; no texture generation/import changes. Other behavior follows confirmed source slice and target fixed-weather requirement.
