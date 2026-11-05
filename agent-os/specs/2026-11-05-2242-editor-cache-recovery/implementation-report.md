# Editor cache recovery

User requested repair of current errors.

Observed: Unity Package Manager access-denied error extracting com.unity.ai.assistant; package DLLs unavailable. Client.Resolve restored dependencies without manifest edits. Subsequent SDK NullReferenceException stack pointed to LunaScriptsState comparison reading a null LunaDataCache. Read-only reflection identified LunaTemp/luna-cache.json; file existed with length0.

Repair: moved only empty cache to LunaTemp/luna-cache.empty-backup-20261105.json. Reloaded scripts; SDK regenerated valid3145-byte cache. Second clean reload verified no Console errors. No gameplay source, scene/prefab data, SDK DLL, manifest or Luna project configuration manually edited.

Verification: loaded saved Gameplay from clean untitled scene; entered PlayMode; HeroSelectionPanel active, four cards, hint present, slots0/1/5/7. Console errors0. Stopped PlayMode. Full Luna build and complete combat regression not performed. Cause of original cache truncation/access denial remains unknown.
