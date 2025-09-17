# publish.ps1
param(
  [string]$RepoName = "KaliLinuxTerminalExtension",
  [string]$Visibility = "public"
)

# Check tools
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git not installed or not in PATH"
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI (gh) not installed or not in PATH"
}

# Init repo if not exists
if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}

# Commit
git add .
git commit -m "Initial commit" -ErrorAction SilentlyContinue

# Create repo on GitHub if not exists
$owner = gh api user --jq .login
$repoFull = "$owner/$RepoName"
if (-not (gh repo view $repoFull 2>$null)) {
  gh repo create $repoFull --$Visibility --source "." --remote origin --push
} else {
  git remote add origin https://github.com/$repoFull.git -ErrorAction SilentlyContinue
  git push -u origin main
}

# Tag version
$version = "v1.0.0"
git tag -a $version -m $version -ErrorAction SilentlyContinue
git push origin $version

# Build zip
New-Item -ItemType Directory -Force dist | Out-Null
Compress-Archive -Path manifest.json,newtab.*.html,newtab.*.css,newtab.*.js,icon*.png -DestinationPath "dist/$RepoName.zip" -Force

# Release
if (-not (gh release view $version 2>$null)) {
  gh release create $version "dist/$RepoName.zip" --title $version --generate-notes
} else {
  gh release upload $version "dist/$RepoName.zip" --clobber
}
