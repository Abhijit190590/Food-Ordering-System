npm install -g "@angular/cli"
if ($LASTEXITCODE -eq 0) {
    Set-Location "D:\BTech\4th sem\FSD 2\Project"
    ng new frontend --routing=true --style=css --skip-git=true --skip-tests=true --defaults
} else {
    Write-Host "npm install failed. Trying locally..."
    npm install "@angular/cli"
    .\node_modules\.bin\ng new frontend --routing=true --style=css --skip-git=true --skip-tests=true --defaults
}
