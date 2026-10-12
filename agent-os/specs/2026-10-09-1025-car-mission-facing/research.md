# Car mission facing
User requests player face the car on entering its driving mission. Journal OnGoPressed calls PlayerAction.ActivateVehicleForMission; it currently only toggles vehicles and arrows. PlayerController.Teleport synchronizes body and transform at a supplied pose. First-person camera controls player yaw each frame.
References: MissionsJournalController.OnGoPressed; PlayerAction.ActivateVehicleForMission; PlayerController.Teleport/StopFollowingCameraYaw; CameraController.LookAtPoint/UpdateCamera.
No external project logic needed.
