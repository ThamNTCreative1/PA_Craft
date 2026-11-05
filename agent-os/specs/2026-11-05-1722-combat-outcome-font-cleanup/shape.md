# Combat outcome and font cleanup

Claude planning output recorded by Codex. Status PENDING APPROVAL.

Goals: reduce redundant playable font dependencies, organize existing Luna controls, player death on fifth landed monster hit, continuous attacks until valid outcome, visible Win/Fail panels and one outcome sound. No new interface/framework or outcome type. Preserve separate Win/Lose handlers and existing gameplay UI.

Source facts differ from hypothesis: early timer/Freeze, panel order and25damage are confirmed. Whether timeout explains user's interrupted attacks must be reproduced before modifying combat flow. If a different cause needs another solution/file, stop and report cause/impact/options.

Routine choices for approval of this plan: expose existing Auto CTA Delay in EndCard group, scene5seconds; sound only Win/Fail as requested; leave existing frozen monster death-animation behavior outside scope; Ammo currently default clone material so rebind canonical default, no new material; absent clarification treat monster stopping as bug, keep monster stationary while swinging and chasing afterwards.
