$ErrorActionPreference='Stop'
# Mechanical cleanup of orphaned local references left by removed framework components.
# Only the newly imported assets are scanned; external GUID references are preserved.
$count=0
foreach($folder in @('Assets/MiniGames','Assets/Game','Assets/ECM2','Assets/Joystick Pack')) {
    Get-ChildItem -LiteralPath $folder -Recurse -File | Where-Object {$_.Extension -in @('.prefab','.unity')} | ForEach-Object {
        $body=[IO.File]::ReadAllText($_.FullName)
        $ids=New-Object 'System.Collections.Generic.HashSet[string]'
        foreach($match in [regex]::Matches($body,'(?m)^--- !u!\d+ &(-?\d+)')){[void]$ids.Add($match.Groups[1].Value)}
        $fixed=[regex]::Replace($body,'\{fileID: (-?\d+)\}',{param($m) if($m.Groups[1].Value -ne '0' -and !$ids.Contains($m.Groups[1].Value)){'{fileID: 0}'}else{$m.Value}})
        if($fixed -ne $body){[IO.File]::WriteAllText($_.FullName,$fixed,(New-Object Text.UTF8Encoding($false)));$count++}
    }
}
"Repaired $count imported YAML files."
