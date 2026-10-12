---
name: luna-cross-project-reuse
description: Extract and adapt only approved logic from another Unity project without copying unrelated code or dependencies. Use whenever a feature is sourced from an existing project.
---

# Luna Cross-Project Reuse

Operate read-only in the source project until the user confirms the exact logic.

1. Identify source file/class/method and trace inputs, outputs, state, events and required dependencies.
2. Separate essential algorithm/rules from UI, analytics, SDK calls, assets, project globals and incidental architecture.
3. Present the smallest logic slice, excluded code and evidence that the behavior matches the request.
4. Stop for the user's confirmation: “đúng logic cần lấy”.
5. Design a target-native adaptation using the target standards, OOP/SOLID boundaries and Luna constraints.
6. Present target classes/files/patterns/tests and stop for separate implementation approval.

Never copy whole classes/folders because they are convenient. Do not preserve source naming or dependencies when they do not fit the target. After implementation, compare behavioral cases rather than line similarity and report intentional differences.
