# Research: Luna theme dropdown
Status: RESEARCH READY

Request: Expose the theme selection field in Luna as a dropdown.

Observed: No theme-named field was found in Assets C# source. The closest selection field is NoelSkinSelector._skin, exposed as Character Skin in the Character section. It already uses enum NoelSkin: ChristmasElf=1, PufferJacket=2, SantaClaus=4, default SantaClaus. Runtime Apply selects mesh/material data and Update detects changes.

Unresolved: Confirm whether theme means Character Skin or another Luna field. Existing enum declaration alone is not evidence of the generated Playground control. Inspect the installed SDK export metadata and actual Playground before deciding a fix.

No scripts, scenes, prefabs or assets changed. Claude planning and exact user approval are required before implementation. Verification should include compilation/Console, exported control type, all option labels/value mappings and switching each selection in Playground. No runtime or build-size result is claimed.
