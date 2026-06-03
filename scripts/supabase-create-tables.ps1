$DbUrl = $env:SUPABASE_DB_URL
if (-not $DbUrl) {
  $envFilePath = Join-Path $PSScriptROOT "..\.env.local"
  if (Test-Path $envFilePath) {
    Get-Content $envFilePath | ForEach-Object {
      $line = $_.Trim()
      if ($line -and -not $line.StartsWith('#') -and $line -match '^[^=]+=') {
        $parts = $line -split '=', 2
        $key = $parts[0].Trim()
        $value = $parts[1].Trim()
        if ($value.StartsWith('"') -and $value.EndsWith('"')) {
          $value = $value.Substring(1, $value.Length - 2)
        }
        if (-not [string]::IsNullOrEmpty($value)) {
          Set-Item -Path "Env:$key" -Value $value
        }
      }
    }
    $DbUrl = $env:SUPABASE_DB_URL
  }
}

if (-not $DbUrl) {
  Write-Error "SUPABASE_DB_URL is not set. Set it in your environment or in .env.local before running this script."
  exit 1
}

function Get-HostFromDbUrl {
  param([string]$url)
  if ($url -match '^[^:]+://[^@]+@([^:/]+)') {
    return $matches[1]
  }
  return $null
}

function Test-DbHostResolution {
  param([string]$targetHost)
  try {
    Resolve-DnsName -Name $targetHost -ErrorAction Stop | Out-Null
    return $true
  } catch {
    return $false
  }
}

$DbHost = Get-HostFromDbUrl $DbUrl
if ($DbHost -and -not (Test-DbHostResolution $DbHost)) {
  Write-Error "Unable to resolve Supabase DB host '$DbHost' from this shell. This may indicate an IPv6-only host or local DNS/network restrictions."
  exit 1
}

$files = @(
  "supabase/ddl/create_contact_messages.sql",
  "supabase/ddl/create_blog_posts.sql",
  "supabase/ddl/create_events.sql",
  "supabase/ddl/create_press_releases.sql",
  "supabase/ddl/create_roles.sql",
  "supabase/ddl/create_testimonials.sql"
)

$resolvers = @("native", "https")

function Invoke-SupabaseQuery {
  param(
    [string]$file,
    [string]$dbUrl
  )

  foreach ($resolver in $resolvers) {
    Write-Host "Using DNS resolver: $resolver"
    npx --yes supabase db query --file $file --db-url $dbUrl --dns-resolver $resolver
    if ($LASTEXITCODE -eq 0) {
      return $true
    }
    Write-Host "Resolver '$resolver' failed with exit code $LASTEXITCODE"
  }

  return $false
}

foreach ($file in $files) {
  Write-Host "\n=== Running $file ==="
  if (-not (Invoke-SupabaseQuery -file $file -dbUrl $DbUrl)) {
    Write-Error "Failed to execute $file. If you see a hostname resolving or unreachable network error, your machine may not be able to reach the Supabase Postgres endpoint over IPv6 or the configured DNS resolver."
    exit 1
  }
}

Write-Host "\nAll Supabase table creation files executed successfully."
