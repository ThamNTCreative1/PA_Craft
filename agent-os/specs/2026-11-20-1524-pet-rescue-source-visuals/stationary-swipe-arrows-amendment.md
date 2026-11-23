# Stationary swipe arrows - v3.4
Status: APPROVED BY DIRECT USER REQUEST
Two swipe arrows remain stationary while only the hand moves. Existing TutorialView/scene builder/scene/UI test only; no new class, asset or dependency.
Reparent arrows to the fixed tutorial panel, aligned with hand's resting vertical center; compute positions from fixed hand origin and visible sprite size, independent of animated translation/rotation. Reduce hand stroke to +/-30 UI units so it remains between close stationary brackets with a small gap at each end. Responsive layout may adapt on a viewport resize, but arrows do not animate with the hand. Keep headline DOScale, caption, gameplay 15s/global 30s behavior unchanged.
Verify compile/Console, existing focused UI test for unchanged arrow position/rotation during hand motion, and Play Mode observation. Other proposals remain pending.

Result: IMPLEMENTED. Focused UI check passed and Play Mode confirms arrows remain fixed while hand moves.
