Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Desktop\.gemini\antigravity\brain\ff63607c-fe79-4756-a256-9a007b4b484c\logo_kanomas_3d_1790523191224.jpg"
if (-not (Test-Path $srcPath)) {
    Write-Error "Source file not found: $srcPath"
    exit 1
}

$srcImg = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Source image size: $($srcImg.Width) x $($srcImg.Height)"

function Save-ResizedPng {
    param(
        [System.Drawing.Image]$Image,
        [int]$Width,
        [int]$Height,
        [string]$DestPath,
        [bool]$AddPadding = $false
    )

    $bmp = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($AddPadding) {
        # Maskable icon safe area in Android: padding 15% so circles/squircle won't crop the logo
        $padX = [int]($Width * 0.12)
        $padY = [int]($Height * 0.12)
        $destW = $Width - ($padX * 2)
        $destH = $Height - ($padY * 2)
        $destRect = New-Object System.Drawing.Rectangle($padX, $padY, $destW, $destH)
        
        # Background fill matching the 3D logo's dark luxury navy background
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(15, 23, 42))
        $g.FillRectangle($brush, 0, 0, $Width, $Height)
        $brush.Dispose()
    } else {
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
    }

    $g.DrawImage($Image, $destRect, 0, 0, $Image.Width, $Image.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $bmp.Save($DestPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved: $DestPath ($Width x $Height)"
}

# 1. Full 3D PNG
Save-ResizedPng -Image $srcImg -Width 1024 -Height 1024 -DestPath "public\assets\logo-kanomas-3d.png"

# 2. 512x512
Save-ResizedPng -Image $srcImg -Width 512 -Height 512 -DestPath "public\assets\logo-kanomas-3d-512.png"

# 3. 192x192
Save-ResizedPng -Image $srcImg -Width 192 -Height 192 -DestPath "public\assets\logo-kanomas-3d-192.png"

# 4. Maskable icon for Android adaptive icons
Save-ResizedPng -Image $srcImg -Width 512 -Height 512 -DestPath "public\assets\logo-kanomas-3d-maskable.png" -AddPadding $true

$srcImg.Dispose()
Write-Host "Semua icon 3D berhasil dibuat!"
