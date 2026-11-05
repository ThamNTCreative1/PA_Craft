# Fixed weather

Claude planning output, recorded by Codex because Claude CLI Write permission was unavailable. Gameplay implementation untouched.

Goal: one selected weather preset captured at game start, unchanged through selection/tutorial/combat/outcomes. Preserve existing HUD/player UI and brightness behavior. Remove only weather World Tint. Adapt confirmed source visual intent to existing Built-in skybox material and rain ParticleSystem/audio.

Non-goals: automatic time, random rain, source URP shader/VFX Graph, wet map shader, Noel, light/fog/lens-flare changes, UI redesign. Visual limit: map Unlit brightness remains independent; nighttime sky does not darken map surfaces. No new architecture or interfaces.
