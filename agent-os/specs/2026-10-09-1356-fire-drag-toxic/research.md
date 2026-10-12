# Fire drag and Toxic projectile gaps

Status: RESEARCH ONLY

Confirmed target defect: DriveHoldButton has no IDragHandler and releases its pointer on OnPointerExit. Fire uses this driving control. TouchController owns only gestures beginning on its own look surface; dragging a pointer that began on Fire does not forward look deltas to it. Consequently dragging off Fire stops firing/zoom and does not rotate the camera, so the player's camera-follow facing cannot produce the requested movement.

Source references: Game/Scripts/OpsiveCustom/Input/VirtualButtonAttack.cs emits down/drag/up events and inherits pressed-until-up behavior from Opsive VirtualButton. Assets/Scripts/InputEvent/AdditionalButtonAttackInputEventHandler.cs couples attack to Aim for a configured item, but its drag callback is empty. The full source look-input route remains to be traced; do not claim that this empty callback rotates the player.

Confirmed projectile gap: target PaintballProjectile uses simple visual and impact objects, despite adapting movement/collision rules. Source Game/Prefabs/Weapon/Bullets/[Projectile] Toxic.prefab combines GameAsset/Model/Weapons/ToxicGun/ammo.fbx, Archanor/Projectile.prefab particle visual, and ToxicBullet/ToxicBulletHit.prefab impact. Source gravity is zero, damping 0.1, lifespan 4, destroy-on-collision enabled. Target already has ammo.fbx but does not have these source VFX prefabs at the inspected paths.

Feasible correction: dedicated Fire gesture control owning its pointer from press until release/cancel, forwarding drag delta to camera while preserving held-fire and zoom even outside the button. Preserve driving-button release behavior. Keep multitouch joystick independent and clear state on focus loss, pause and mission exit. Player follows camera yaw while firing; reticle determines projectile direction.

Projectile correction: reuse the specific Toxic mesh and adapt required trail/impact visuals into the existing pool, retaining swept collision and NPC retaliation. Audit source particle materials/textures for Built-in Unlit/Luna compatibility before choosing the exact asset conversion. Do not copy Opsive runtime components or assume shader compatibility.

Before implementation, provide exact new input component/modified field types, prefab/scene/asset list and verification plan. Required tests: press-drag outside-release with same finger, simultaneous joystick, focus loss, pause/exit cancellation; Toxic muzzle origin, flight/trail/impact, thin wall blocking, NPC response and pool reset. No gameplay changes made in this research turn.
