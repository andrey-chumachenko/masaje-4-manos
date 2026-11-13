$ErrorActionPreference = 'Stop'
$secretsPath = Join-Path (Split-Path -Parent $PSScriptRoot) '.dev.vars'
if (-not (Test-Path -LiteralPath $secretsPath)) { throw 'First copy .dev.vars.example to .dev.vars.' }
$secret = Read-Host 'GitHub fine-grained token (input hidden)' -AsSecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
try {
    $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    if ($token -notmatch '^github_pat_[A-Za-z0-9_]+$') { throw 'Expected a fine-grained GitHub token.' }
    $lines = @(Get-Content -LiteralPath $secretsPath -Encoding utf8 | Where-Object { $_ -notmatch '^GITHUB_TOKEN=' })
    $lines += 'GITHUB_TOKEN=' + $token
    [IO.File]::WriteAllLines($secretsPath, $lines, [Text.UTF8Encoding]::new($false))
    Write-Output 'GitHub token saved locally. Its value is not displayed.'
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    $token = $null
}
