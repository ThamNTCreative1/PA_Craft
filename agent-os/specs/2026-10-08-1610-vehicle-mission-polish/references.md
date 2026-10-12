# Current-source references

- Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs: OnGoPressed, shared mission launch.
- Assets/_Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs: IsSupportedMission and IsMotorbikeMission.
- Assets/_Playable_/Scripts/Controller/PlayerAction.cs: Awake arrays, FindNearest, tutorial and ordinary mount paths, OnDisable arrow cleanup.
- Assets/_Playable_/Scripts/Arrow.cs: SetTarget and existing guide animation.
- Assets/_Playable_/Scripts/GameController.cs: RideUIState.SetActive/Tick, SetRiding, SetDrivingCar.
- Assets/_Playable_/Scripts/Controller/CarController.cs: ReadDriveInput, Update, GroundAt, FixedUpdate, TryStep and mount lifecycle.
- Assets/_Playable_/Scripts/Controller/DriveHoldButton.cs: pointer ownership and release on exit.
- Assets/_Playable_/Scenes/Gameplay.unity: First Car Ride Tutorial (527513978), First Ride Tutorial (1307206192), Motorbike Guide Arrow, vehicle bindings.
- Assets/Game/Resources/UI/UICarController.prefab: car button layout to align with tutorial labels.

All implementation evidence comes from the current project. No external project logic or previous plan artifacts were used.
