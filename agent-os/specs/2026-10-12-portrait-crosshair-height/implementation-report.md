# Portrait crosshair height

Request: raise the portrait paintball crosshair away from the player head.

Changed Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs only for runtime behavior. Added a serialized portrait height offset (0.12 of parent UI height), cached initial anchored position, and blended the offset by camera aspect alongside existing scale. Landscape restores the initial position. Existing aim ray follows the crosshair center.

Verification: Unity compilation completed; Console returned zero errors. Play Mode screenshot: agent-os/captures/paintball-portrait-crosshair-raised.png. Portrait vertical offset 319.8321 matched expected 319.8321; landscape position restored; projected aim ray differed from reticle center by 0.000856 pixels. Exited Play Mode. Scoped git diff --check passed. Luna build/device verification not performed.
