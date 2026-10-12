# Mission separation research
Gameplay scene has car and motorcycle and guide arrows as independent root objects. PlayerAction owns vehicle activation and hardcoded car facing. MissionsJournalController switches through MissionRowView string-derived booleans. Paintball row exists but is unsupported; no paintball gameplay objects or scripts found in Assets/_Playable_/Scripts.
Shared Player, Camera_Controller, city, HUD and journal must stay shared. Preserve world poses and serialized links when reparenting vehicles/arrows.
References: PlayerAction.ActivateVehicleForMission/FaceMissionCar/Awake; MissionsJournalController.OnGoPressed; MissionRowView.IsSupportedMission/IsMotorbikeMission; PlayerController.Teleport; CameraController.LookAtPoint/FollowPlayer.
