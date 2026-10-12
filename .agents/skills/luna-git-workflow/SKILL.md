---
name: luna-git-workflow
description: Apply safe Git practices for Unity/Luna projects, including reviewable changes, branches, commits and large asset handling. Use for implementation preparation, handoff or delivery.
---

# Luna Git Workflow

- Inspect status/diff before work; preserve unrelated user changes.
- Do not reset, discard, clean, rewrite history, force-push or delete branches without explicit authorization.
- Keep Unity `.meta` files paired with assets and avoid moving assets outside Unity when GUID preservation matters.
- Exclude generated `Library`, `Temp`, `Logs`, build outputs and local MCP credentials/configuration.
- Use Git LFS only when repository policy approves it; do not silently migrate existing files.
- One agent owns a scene/prefab/file at a time; parallel agents use separate worktrees/branches when authorized.

Before commit, review diff, unexpected binary/scene changes, credentials, generated files, Console/tests and size evidence. Commit messages describe one approved logical change. Handoff lists base/branch, changed files, tests, uncommitted work and known risks. Creating commits, branches or remote changes requires the user's request or established project workflow.
