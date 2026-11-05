# Hero selection UI

Planner: Claude CLI, read-only response recorded by Codex.
Status: PENDING APPROVAL

Goals: transparent selection background with gameplay raycast blocking retained; narrower portrait-fitting cards; hand visiting4cards with DOScale; make existing four Luna HeroRoster selectors discoverable through tooltips. Existing defaults0,1,5,7 and field labels/ownership preserved.

Non-goals: weather, HUD/joystick, flow, resolver, combat tutorial, existing Fire Hand/Objective hint, endcards, new packages/shaders/textures. No HeroCardView public API changes. Separate view-only HeroSelectionHandHint owns tweens; panel owns layout and hint lifecycle. No new interfaces, inheritance or design patterns.

Existing risk outside scope: if PlayerSkinSwitcher.Apply rejects an id, existing panel chosen guard remains set and selection cannot retry. Leave current behavior untouched and document; a rejection-rearm API/Flow change would require separate approval. Valid roster selections are acceptance path here.
