# Current PetRescue Luna build regressions
User reports degraded materials, no swipe steering and missing Luna fields. Read-only findings before repair:
- luna.json now correctly selects PetRescue.unity; generated rootPaths include PetRescue scripts. This is an actual correct-scene build, not prior old Gameplay output.
- Generated playground.json fields/assets empty. Existing gameplay types have SerializeField but no LunaPlaygroundField attributes.
- User explicitly wants ONLY End Time and Player Speed. End Time maps to existing hidden overall _endGameTime30, not separate gameplay _duration15; speed remains3.5.
- Existing texture default quantSize65 converts native16x16 block PNGs and128x128 pets to JPEG. Grass stage1 PNG pixels differ over entire16x16 from stage2 JPEG. FFFFORWA native1024 atlas resized512. Source pixel bytes are intact; export introduces degradation.
- Input polling owns mouse/touch separately, cancels on source transitions, requires Began/GetMouseButtonDown to acquire, and derives viewport from RectTransform scale. If runtime coalesces initial phase or switches between simulated mouse and touch, ownership resets and deltas can be lost. Standard stable input path has not yet been reproduced in a real browser; do not claim unique proven cause. Repair stays old Input, retains contact across equivalent source transitions, acquires active contacts after missed Begin, and normalizes using Screen.width.
- Baseline files and representative build artifacts saved under Temp/PetRescueBuildFixBaseline. No source project changes planned.
