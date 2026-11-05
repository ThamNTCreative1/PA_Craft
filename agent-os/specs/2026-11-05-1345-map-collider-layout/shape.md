# Shape
Status: APPROVED — user approved plan v1
User explicitly waived the Claude planning step for this work item. Codex prepares this plan; implementation still requires user approval.

Goal: Fit the current Gameplay map collision to its visible cropped footprint, use one ground box, omit crossing paint collisions, and prevent player escape.
Approach: Scene-only BoxCollider edits and prefab instance overrides. No new runtime classes, interfaces, patterns or event flows. CameraController remains an existing consumer of physics obstruction.
Scope: Ground, obsolete colliders, crossing/flat ground decoration colliders and four perimeter walls under CityMap. Preserve substantial building, vegetation and elevated platform collision within the map.
Assumptions: Current visual footprint is the intended playable perimeter. Ground top remains at existing Y=13.46; it is not raised to grass/platform height. Perimeter is a rectangle. Confirm all three through approval and verification.

