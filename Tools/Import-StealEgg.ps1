param([switch]$Import)
$ErrorActionPreference = 'Stop'
$source = 'F:\GAME\StealEgg\steal-an-egg-main'
$destination = 'F:\UnityProjects\TE_V06'
$index = @{}
Get-ChildItem -LiteralPath "$source\Assets" -Filter '*.meta' -Recurse -File | ForEach-Object {
    $match = [regex]::Match([IO.File]::ReadAllText($_.FullName), '(?m)^guid: ([a-f0-9]{32})')
    if ($match.Success) { $index[$match.Groups[1].Value] = $_.FullName.Substring(0,$_.FullName.Length-5) }
}
$queue = New-Object 'System.Collections.Generic.Queue[string]'
$queue.Enqueue("$source\Assets\MiniGames\StealAnEgg\StealAnEgg.unity")
foreach($asset in @('Assets\MiniGames\StealAnEgg\Prefabs\UI\SAEGamePlayPanel.prefab','Assets\MiniGames\StealAnEgg\Prefabs\UI\SAEWarningPanel.prefab','Assets\Game\Assets\Characters\Imports\Model\Base_Character.fbx')) { $queue.Enqueue((Join-Path $source $asset)) }
$queue.Enqueue("$source\Assets\Game\Models\BasePlayer\Squid_Game.mat")
foreach($sound in @('Collect1.mp3','Collect2.mp3','EggOpen1.mp3','SAE_hurt-4.mp3')){$queue.Enqueue("$source\Assets\MiniGames\StealAnEgg\Sounds\$sound")}
foreach($folder in @('Prefabs\Eggs','Prefabs\Monsters','Prefabs\ProtectMonster','Animation\Character','Sprites')) {
    Get-ChildItem -LiteralPath "$source\Assets\MiniGames\StealAnEgg\$folder" -Recurse -File | Where-Object {$_.Extension -ne '.meta'} | ForEach-Object { $queue.Enqueue($_.FullName) }
}
$visited = @{}; $total = 0L; $stripped = 0
Write-Output "Indexed $($index.Count) asset GUIDs. Resolving visual dependencies..."
$textExtensions = @('.prefab','.unity','.asset','.mat','.controller','.overrideController','.shader','.shadergraph','.shadersubgraph','.anim','.mask')
while($queue.Count -gt 0) {
    $path = $queue.Dequeue()
    if($visited.ContainsKey($path) -or !(Test-Path -LiteralPath $path -PathType Leaf)) { continue }
    $visited[$path] = $true
    $extension = [IO.Path]::GetExtension($path)
    if($extension -in @('.cs','.dll','.asmdef','.asmref','.js','.rsp')) {continue}
    $relative = $path.Substring($source.Length+1)
    $target = Join-Path $destination $relative
    $body = $null
    if($extension -in $textExtensions) {
        $raw = [IO.File]::ReadAllText($path)
        if($raw.StartsWith('%YAML')) {
            $removed = New-Object 'System.Collections.Generic.List[string]'
            $body = [regex]::Replace($raw, '(?ms)^--- !u!114 &(-?\d+)[^\r\n]*\r?\n.*?(?=^--- !u!|\z)', {
                param($block)
                $script = [regex]::Match($block.Value, 'm_Script:.*?guid: ([a-f0-9]{32})')
                if($script.Success -and $index.ContainsKey($script.Groups[1].Value)) {
                    $removed.Add($block.Groups[1].Value)
                    return ''
                }
                return $block.Value
            })
            foreach($id in $removed) { $body = [regex]::Replace($body,"(?m)^  - component: \{fileID: $id\}\r?\n",'') }
            $stripped += $removed.Count
        } elseif($extension -ne '.asset') { $body = $raw }
        foreach($match in [regex]::Matches($body, 'guid: ([a-f0-9]{32})')) {
            $guid = $match.Groups[1].Value
            if($index.ContainsKey($guid)) { $queue.Enqueue($index[$guid]) }
        }
    }
    $meta = "$path.meta"
    if(Test-Path -LiteralPath $meta) {
        foreach($match in [regex]::Matches([IO.File]::ReadAllText($meta), 'guid: ([a-f0-9]{32})')) {
            if($index.ContainsKey($match.Groups[1].Value)) {$queue.Enqueue($index[$match.Groups[1].Value])}
        }
    }
    $total += (Get-Item -LiteralPath $path).Length
    if($Import) {
        if(Test-Path -LiteralPath $target) {
            $existingGuid = if(Test-Path -LiteralPath "$target.meta") { [regex]::Match([IO.File]::ReadAllText("$target.meta"),'(?m)^guid: (\w+)').Groups[1].Value } else { '' }
            $sourceGuid = [regex]::Match([IO.File]::ReadAllText($meta),'(?m)^guid: (\w+)').Groups[1].Value
            if($existingGuid -eq $sourceGuid) {continue}
            $target = Join-Path "$destination\Assets\StealEggSource" $relative.Substring(7)
            if(Test-Path -LiteralPath $target) {continue}
        }
        [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target)) | Out-Null
        if($null -ne $body) {[IO.File]::WriteAllText($target,$body,(New-Object Text.UTF8Encoding($false)))} else {Copy-Item -LiteralPath $path -Destination $target}
        if(Test-Path -LiteralPath $meta) {Copy-Item -LiteralPath $meta -Destination "$target.meta"}
    }
}
"Assets visited: $($visited.Count); source MB: $([math]::Round($total/1MB,1)); stripped framework components: $stripped; imported: $Import"
