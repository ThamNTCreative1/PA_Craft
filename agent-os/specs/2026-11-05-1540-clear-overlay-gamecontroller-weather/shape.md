# Shape
Status: PENDING APPROVAL
Assumption awaiting approval: remove Day WorldTint and hero-selection background darkening, preserve intentional Night tint with adjustable intensity. Rain/Sunny retain current behavior. No removal of modal panel/controls. GameController exposes all user-facing weather configuration using the existing Luna attribute pattern. Existing GameBrightness unchanged.
Plain composition of existing GameController and WeatherPresetController; no new class/interface/pattern,shader,material,asset orpackage. Weather owns effect application; GameController owns config/change detection. Weather Canvas sort-1 preserves mainHUD above tint.
