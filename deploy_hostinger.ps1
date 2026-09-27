$ErrorActionPreference = 'Stop'
$temp = Join-Path $env:TEMP "kanomas-hostinger-deploy"
if (Test-Path $temp) {
    Remove-Item -Recurse -Force $temp
}
New-Item -ItemType Directory -Path $temp | Out-Null
Copy-Item -Recurse -Force "dist\*" $temp

Push-Location $temp
try {
    git init
    git config user.name "Kanomas Dev"
    git config user.email "dev@kanomas.com"
    git branch -M hostinger
    git remote add origin https://github.com/Monarchy777/appkanomas.git
    git add .
    git commit -m "deploy: Hostinger live production build ready for public_html"
    git push -u origin hostinger --force
    Write-Output "SUCCESS: Hostinger branch pushed to GitHub successfully!"
} finally {
    Pop-Location
    Remove-Item -Recurse -Force $temp
}
