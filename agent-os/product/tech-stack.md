# Tech Stack

- Unity version:
- Luna/playable SDK version:
- Render pipeline: Built-in
- Material policy: Unlit, no custom shader; brightness exposed through approved material/property approach
- Input: old Input handling compatible with Luna
- Outcome flow: project-specific and approval-gated. Supported shapes include Win, Lose, direct EndCard, gameplay-complete → EndCard, and CTA → EndCard/store.
- Outcome policy: do not assume or create Win, Lose, EndCard, CTA, restart, or replay flows unless the approved scenario requires them.
- Outcome architecture: keep each approved outcome responsibility separate; `LunaController` only exposes/maps approved Luna calls and does not choose the scenario flow.
- Source control:
- Unity MCP server/config name:
- Rider version/integration:
- Build and size measurement method:
