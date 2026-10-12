---
name: analyze-luna-project
description: Inspect a Unity/Luna project and create read-only research artifacts for a Claude planning handoff. Use before feature planning or controlled cross-project logic reuse.
---

# Analyze Luna Project

Operate read-only. Do not edit scripts, scenes, prefabs, assets, packages, settings or Git state.

## Isolated work-item research

Treat every request—new feature, change, bug fix or extension—as a new isolated work item:

- Do not require the user to name the feature or provide a slug.
- Derive a short lowercase hyphenated slug from the request and create a unique folder named `YYYY-MM-DD-HHmm-<slug>`. Add a numeric suffix if the folder already exists.
- Use only `AGENTS.md`, `agent-os/product/`, `agent-os/standards/index.yml`, standards selected from that index, the user's current scenario and current project source.
- Do not read, summarize, inherit or reuse artifacts from any other spec folder. If current source reveals a dependency on earlier work and its old plan is genuinely required, identify the exact old file/section and stop for user approval before reading it.
- Do not carry assumptions, class choices, architecture decisions, approval state or unresolved tasks from a previous feature/chat.
- Reset means context isolation, not deletion. Preserve previous feature folders as project history.
- Create or replace `agent-os/specs/current.md` with the new spec folder path, the user's request summary and `Status: RESEARCH READY`. This pointer is the only file intentionally replaced for each new request.

1. Read `AGENTS.md`, `agent-os/product/`, relevant standards and the user's scenario.
2. Trace only relevant entry points, classes, events, serialized references, scenes/prefabs and assets.
3. Flag Luna incompatibilities, build-size risks, old Input handling constraints, Built-in/Unlit material rules and `LunaController`/Service Locator dependencies.
4. For cross-project reuse, identify the smallest source logic and explicitly exclude unrelated UI, analytics, state, assets and project-specific dependencies.
5. Create the timestamped spec folder and write only its `research.md` and `references.md`, then update `agent-os/specs/current.md`.
6. Stop for user confirmation when source logic must be validated. Do not propose that approval has already been granted.

Research must distinguish observed facts, inference, unresolved questions and risks.
