# Approved change
Status: APPROVED
Approved by: user ("oke" in this conversation after the proposed scope)
Approved scope: Rename Panda to Gugugaga in the hero enum, tooltips and scene display name; expose Flood as a separate Luna bool; allow Rain and Flood simultaneously; verify compilation and all four Rain/Flood combinations.

Files: Assets/_Playable_/Scripts/Heroes/HeroSlotOption.cs, HeroRoster.cs; Scripts/GameController.cs; Scripts/Weather/WeatherPreset.cs, WeatherPresetController.cs; Assets/_Playable_/Scenes/Gameplay.unity.
Design: Keep hero enum value 4. GameController owns the exported Weather and Flood settings and passes both into WeatherPresetController.Initialize. The weather controller owns independent rain/flood activation, retaining existing disable/re-enable cleanup. No new classes, interfaces, packages, shaders or gameplay outcomes.
Verification: Unity compilation/Console; hero ID/display-name checks; actual scene component initialization for Day/Rain x Flood false/true, including water active state and rain emission; confirm re-enable state and restore edit mode. Luna build/browser checks if available; report unverified items explicitly.
