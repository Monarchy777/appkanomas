import React from 'react';

/**
 * High-definition, colorful 3D SVG Icons for Kanomas App
 * Designed with realistic lighting, specular highlights, rich multi-stop gradients,
 * and 3D depth to deliver a tactile, premium modern look.
 */

// 1. 3D DOA MANASIK (Holy Book / Quran with Golden Calligraphy & Emerald Ribbon)
export function Icon3DDoa({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="doaBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <linearGradient id="doaGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="doaRibbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <filter id="doaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#b45309" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#doaBg)" filter="url(#doaShadow)" />
      {/* Top Specular Highlight */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* 3D Book Base Spine */}
      <path d="M16 43C22 41 28 41 32 44C36 41 42 41 48 43L48 23C42 21 36 21 32 24C28 21 22 21 16 23Z" fill="#78350f" opacity="0.4" transform="translate(0, 3)" />
      {/* Book Pages 3D Body */}
      <path d="M16 41C22 39 28 39 32 42C36 39 42 39 48 41L48 21C42 19 36 19 32 22C28 19 22 19 16 21Z" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Page Inset Shadows */}
      <path d="M32 22V42" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 26C24 25 28 25 30 27" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 30C24 29 28 29 30 31" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 27C36 25 40 25 44 26" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 31C36 29 40 29 44 30" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      {/* Emerald Ribbon Bookmark */}
      <path d="M31 22V47L33.5 44L36 47V22H31Z" fill="url(#doaRibbon)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      {/* 3D Star Sparkle */}
      <path d="M47 13L48.5 16.5L52 18L48.5 19.5L47 23L45.5 19.5L42 18L45.5 16.5Z" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))" />
    </svg>
  );
}

// 2. 3D ARAH KIBLAT (3D Golden Emerald Compass with 3D Floating Needle)
export function Icon3DKiblat({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="kiblatBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="35%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <linearGradient id="needleRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="needleGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <filter id="kiblatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#047857" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#kiblatBg)" filter="url(#kiblatShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Compass Outer Golden Bezel */}
      <circle cx="32" cy="32" r="18" fill="#064e3b" stroke="#fde047" strokeWidth="2.5" />
      {/* Dial Ticks */}
      <circle cx="32" cy="32" r="14" fill="#022c22" stroke="#34d399" strokeWidth="0.8" strokeDasharray="2 3" />
      {/* North / Ka'bah Golden Marker */}
      <polygon points="32,15 35,21 29,21" fill="#fde047" />
      {/* 3D Compass Needle */}
      <polygon points="32,17 36,32 32,30" fill="url(#needleRed)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.5))" />
      <polygon points="32,17 28,32 32,30" fill="#dc2626" />
      <polygon points="32,47 36,32 32,34" fill="#e2e8f0" />
      <polygon points="32,47 28,32 32,34" fill="#94a3b8" />
      {/* Center Pivot 3D Dome */}
      <circle cx="32" cy="32" r="3.5" fill="url(#needleGold)" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))" />
      <circle cx="31.2" cy="31.2" r="1.2" fill="#ffffff" />
    </svg>
  );
}

// 3. 3D HITUNG TAWAF & SA'I (3D Ka'bah with Orbiting Gyro Counter Ring)
export function Icon3DTawaf({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="tawafBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
        <linearGradient id="goldKiswah" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <filter id="tawafShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#tawafBg)" filter="url(#tawafShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* 3D Ka'bah Isometric Cube */}
      {/* Top Roof */}
      <polygon points="32,18 43,23 32,28 21,23" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      {/* Right Wall */}
      <polygon points="43,23 43,39 32,44 32,28" fill="#0f172a" />
      {/* Left Wall */}
      <polygon points="21,23 32,28 32,44 21,39" fill="#1e293b" />
      {/* Golden Kiswah Belt */}
      <polygon points="21,27 32,32 32,34 21,29" fill="url(#goldKiswah)" />
      <polygon points="43,27 32,32 32,34 43,29" fill="url(#goldKiswah)" />
      {/* Orbiting Counter Arrow (7 Putaran) */}
      <path d="M15 34 C12 24, 52 24, 49 34 C47 41, 17 41, 15 34" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="32 8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
      <polygon points="16,36 12,32 18,30" fill="#fde047" />
      {/* Counter "7" Badge */}
      <circle cx="46" cy="18" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      <text x="46" y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="sans-serif">7</text>
    </svg>
  );
}

// 4. 3D TASBIH DIGITAL (Vibrant Violet with 3D Glossy Prayer Beads & Tassel)
export function Icon3DTasbih({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="tasbihBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="40%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#6b21a8" />
        </radialGradient>
        <radialGradient id="pearlBead" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fef08a" />
          <stop offset="85%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <filter id="tasbihShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#7e22ce" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#tasbihBg)" filter="url(#tasbihShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Beads Ring in 3D Perspective */}
      {/* Top beads */}
      <circle cx="32" cy="18" r="4" fill="url(#pearlBead)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />
      <circle cx="39" cy="20" r="3.8" fill="url(#pearlBead)" />
      <circle cx="25" cy="20" r="3.8" fill="url(#pearlBead)" />
      {/* Side beads */}
      <circle cx="44" cy="25" r="3.8" fill="url(#pearlBead)" />
      <circle cx="20" cy="25" r="3.8" fill="url(#pearlBead)" />
      <circle cx="46" cy="32" r="3.8" fill="url(#pearlBead)" />
      <circle cx="18" cy="32" r="3.8" fill="url(#pearlBead)" />
      <circle cx="43" cy="39" r="3.8" fill="url(#pearlBead)" />
      <circle cx="21" cy="39" r="3.8" fill="url(#pearlBead)" />
      {/* Bottom Joining Imam Bead */}
      <circle cx="32" cy="42" r="5" fill="#fde047" stroke="#ca8a04" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
      {/* Tassel */}
      <path d="M32 46V53" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 53H34L33 58H31L30 53Z" fill="#f59e0b" />
      {/* 33 Count Sparkle */}
      <circle cx="46" cy="46" r="6.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.2" />
      <text x="46" y="49.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">33</text>
    </svg>
  );
}

// 5. 3D PAKET UMRAH (Coral Orange with 3D Plane & Crescent Flight Path)
export function Icon3DPaket({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="paketBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <linearGradient id="planeBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id="paketShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#c2410c" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#paketBg)" filter="url(#paketShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Golden Clouds & Crescent */}
      <path d="M42 16A8 8 0 1 0 46 30A10 10 0 0 1 42 16Z" fill="#fde047" opacity="0.8" />
      <ellipse cx="23" cy="44" rx="11" ry="5" fill="#fed7aa" opacity="0.6" />
      <ellipse cx="37" cy="46" rx="13" ry="5" fill="#ffedd5" opacity="0.8" />
      {/* Airplane Vapor Trail */}
      <path d="M16 46C22 42, 28 36, 36 29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.9" />
      {/* 3D Airplane Flying Upwards */}
      <g transform="translate(18, 12) rotate(15)">
        {/* Shadow */}
        <path d="M12 28L18 20L28 20L21 28Z" fill="#9a3412" opacity="0.3" />
        {/* Left Wing */}
        <polygon points="12,18 2,26 6,28 17,21" fill="#e2e8f0" />
        {/* Fuselage */}
        <path d="M26 10C29 11 31 13 30 15L8 27C6 28 4 27 5 25L23 11C24 10 25 10 26 10Z" fill="url(#planeBody)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))" />
        {/* Cockpit Glass */}
        <path d="M24 12C26 13 28 14 27 15L23 15Z" fill="#0284c7" />
        {/* Right Wing */}
        <polygon points="18,17 26,4 30,5 23,17" fill="#cbd5e1" />
        {/* Tail Fin */}
        <polygon points="6,26 3,21 6,21 9,25" fill="#ea580c" />
      </g>
    </svg>
  );
}

// 6. 3D TABUNGAN BSI (Mint Emerald with 3D Islamic Gold Coins & Bank Vault)
export function Icon3DTabungan({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="bsiBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="40%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#115e59" />
        </radialGradient>
        <linearGradient id="goldCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <filter id="bsiShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0d9488" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#bsiBg)" filter="url(#bsiShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* 3D Bank Pillar Base */}
      <rect x="15" y="38" width="34" height="6" rx="2" fill="#042f2e" />
      <polygon points="13,38 32,22 51,38" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
      {/* Pillars */}
      <rect x="19" y="30" width="4" height="8" rx="1" fill="#ccfbf1" />
      <rect x="26" y="30" width="4" height="8" rx="1" fill="#ccfbf1" />
      <rect x="34" y="30" width="4" height="8" rx="1" fill="#ccfbf1" />
      <rect x="41" y="30" width="4" height="8" rx="1" fill="#ccfbf1" />
      {/* 3D Gold Dinar Coin Popping Out */}
      <g transform="translate(24, 13)">
        <ellipse cx="14" cy="14" rx="11" ry="8" fill="#78350f" transform="rotate(-15 14 14)" />
        <ellipse cx="13" cy="12" rx="11" ry="8" fill="url(#goldCoin)" transform="rotate(-15 13 12)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
        <ellipse cx="13" cy="12" rx="8" ry="6" fill="#ca8a04" stroke="#fef08a" strokeWidth="0.8" transform="rotate(-15 13 12)" />
        <text x="13" y="15" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Rp</text>
      </g>
    </svg>
  );
}

// 7. 3D IZIN NUSUK (Royal Amber Gold with Saudi Palm & Verification Shield)
export function Icon3DNusuk({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="nusukBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
        <linearGradient id="shieldGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <filter id="nusukShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#a16207" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#nusukBg)" filter="url(#nusukShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.3" />
      {/* 3D Saudi Shield Inset */}
      <path d="M32 17C40 17 44 21 44 29C44 38 36 44 32 47C28 44 20 38 20 29C20 21 24 17 32 17Z" fill="#14532d" stroke="url(#shieldGold)" strokeWidth="2" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.35))" />
      {/* Palm Tree Leaves */}
      <path d="M32 23V35" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 26C35 24 38 25 39 27" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 26C29 24 26 25 25 27" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 29C36 28 39 30 39 32" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 29C28 28 25 30 25 32" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      {/* Checkmark of Authenticity */}
      <circle cx="41" cy="40" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.3))" />
      <path d="M38.5 40L40.5 42L44 38.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 8. 3D CEK STATUS JAMAAH (Sapphire Cobalt with 3D Magnifier & Passport Card)
export function Icon3DStatus({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="statusBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <linearGradient id="lensGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
        </linearGradient>
        <filter id="statusShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#1e3a8a" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Squircle Base */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#statusBg)" filter="url(#statusShadow)" />
      {/* Top Gloss */}
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Passport / ID Card */}
      <rect x="16" y="20" width="28" height="20" rx="3" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
      <rect x="19" y="24" width="7" height="9" rx="1" fill="#94a3b8" />
      <line x1="28" y1="25" x2="40" y2="25" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="29" x2="38" y2="29" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="33" x2="35" y2="33" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      {/* 3D Magnifying Glass */}
      <circle cx="34" cy="30" r="10" fill="url(#lensGlass)" stroke="#fde047" strokeWidth="2.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
      <circle cx="31" cy="27" r="2.5" fill="#ffffff" fillOpacity="0.6" />
      <path d="M41 37L48 45" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M41 37L48 45" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 9. 3D JADWAL SHOLAT (Golden Dome & Crescent Mosque Clock)
export function Icon3DSholat({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="sholatBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <filter id="sholatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#78350f" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#sholatBg)" filter="url(#sholatShadow)" />
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.3" />
      {/* Mosque Dome */}
      <path d="M32 17C26 21 23 26 23 33H41C41 26 38 21 32 17Z" fill="#14532d" stroke="#fde047" strokeWidth="1" />
      {/* Crescent Finial */}
      <path d="M32 13V17" stroke="#fde047" strokeWidth="1.5" />
      <circle cx="32" cy="13" r="1.5" fill="#fde047" />
      {/* Clock Face in Entrance Arch */}
      <rect x="25" y="33" width="14" height="14" rx="2" fill="#052e16" />
      <circle cx="32" cy="40" r="5" fill="#ffffff" />
      <line x1="32" y1="40" x2="32" y2="37" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="40" x2="34.5" y2="40" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// 10. 3D WHATSAPP RESMI KANOMAS (3D Glowing Emerald Bubble with Phone)
export function Icon3DWhatsApp({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="waBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="40%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
        <filter id="waShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#15803d" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#waBg)" filter="url(#waShadow)" />
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Speech Bubble Tail */}
      <path d="M32 17C23.7 17 17 23.7 17 32C17 34.8 17.8 37.4 19.1 39.7L17.5 45.5L23.6 43.9C26 45.3 28.9 46.1 32 46.1C40.3 46.1 47 39.4 47 31.1C47 22.8 40.3 17 32 17Z" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
      {/* WhatsApp Phone Glyph */}
      <path d="M26.5 25.5C26 24.3 25.5 24.3 25 24.3C24.6 24.3 24.1 24.3 23.6 24.8C23.1 25.3 22 26.3 22 28.5C22 30.7 23.6 32.8 23.8 33.1C24.1 33.4 27 38.1 31.5 39.9C35.2 41.4 36 40.9 36.8 40.8C37.6 40.7 39.3 39.7 39.6 38.8C40 37.8 40 37 39.8 36.8C39.6 36.6 39.2 36.4 38.5 36C37.8 35.7 34.7 34.1 34.1 33.9C33.6 33.7 33.2 33.6 32.8 34.2C32.4 34.8 31.3 36.1 31 36.5C30.6 36.9 30.3 36.9 29.6 36.6C29 36.3 26.8 35.5 24.3 33.2C22.3 31.4 21 29.2 20.6 28.5C20.3 27.8 20.6 27.5 20.9 27.2C21.2 26.9 21.6 26.4 22 26C22.3 25.6 22.4 25.3 22.6 24.9C22.8 24.5 22.7 24.2 22.5 23.9C22.4 23.6 21.4 21.1 21 20.2" fill="#16a34a" />
    </svg>
  );
}

// 11. 3D CETAK DOKUMEN & KUITANSI (Modern Laser Printer with Golden Seal)
export function Icon3DCetak({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="printBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <filter id="printShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#334155" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#printBg)" filter="url(#printShadow)" />
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.3" />
      {/* Paper In */}
      <rect x="22" y="15" width="20" height="12" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="26" y1="19" x2="38" y2="19" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="23" x2="34" y2="23" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Printer Body */}
      <rect x="15" y="24" width="34" height="16" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))" />
      <circle cx="42" cy="29" r="1.8" fill="#22c55e" />
      <circle cx="42" cy="34" r="1.8" fill="#38bdf8" />
      {/* Printed Paper Out with Golden Stamp */}
      <rect x="20" y="34" width="24" height="15" rx="2" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
      <line x1="24" y1="38" x2="36" y2="38" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="42" x2="32" y2="42" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="38" cy="42" r="3" fill="#f59e0b" />
    </svg>
  );
}

// 12. 3D KAJIAN TASIKMALAYA (3D Golden Pod Microphone / Speaker)
export function Icon3DKajian({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="kajianBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="40%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
        <filter id="kajianShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#9d174d" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#kajianBg)" filter="url(#kajianShadow)" />
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* 3D Mic Capsule */}
      <rect x="26" y="16" width="12" height="18" rx="6" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
      <line x1="26" y1="23" x2="38" y2="23" stroke="#ca8a04" strokeWidth="1" />
      <line x1="26" y1="27" x2="38" y2="27" stroke="#ca8a04" strokeWidth="1" />
      {/* Mic U-Stand */}
      <path d="M21 28C21 34 26 38 32 38C38 38 43 34 43 28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="38" x2="32" y2="47" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25" y1="47" x2="39" y2="47" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      {/* Broadcast Waves */}
      <path d="M47 22C49 25 49 29 47 32" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 22C15 25 15 29 17 32" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 13. 3D KOPER & PERLENGKAPAN (3D Luggage with Checklist)
export function Icon3DKoper({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="koperBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#075985" />
        </radialGradient>
        <filter id="koperShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#075985" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#koperBg)" filter="url(#koperShadow)" />
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Suitcase Telescopic Handle */}
      <path d="M27 19V14C27 13 28 12 29 12H35C36 12 37 13 37 14V19" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      {/* Suitcase Body */}
      <rect x="19" y="19" width="26" height="32" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
      {/* Suitcase Grooves */}
      <line x1="25" y1="24" x2="25" y2="46" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="24" x2="32" y2="46" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="39" y1="24" x2="39" y2="46" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      {/* Wheels */}
      <circle cx="23" cy="52" r="2.5" fill="#fde047" />
      <circle cx="41" cy="52" r="2.5" fill="#fde047" />
    </svg>
  );
}

// 14. 3D PETA MANASIK (Folded Map with 3D GPS Pin)
export function Icon3DPeta({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="petaBg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="40%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </radialGradient>
        <filter id="petaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#14532d" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#petaBg)" filter="url(#petaShadow)" />
      <rect x="4.5" y="4.5" width="55" height="26" rx="15" fill="white" fillOpacity="0.25" />
      {/* Folded Map Segments */}
      <polygon points="15,22 26,18 26,44 15,48" fill="#fef08a" />
      <polygon points="26,18 37,22 37,48 26,44" fill="#fde047" />
      <polygon points="37,22 48,18 48,44 37,48" fill="#fef08a" />
      {/* 3D Golden/Red Location Pin */}
      <g transform="translate(26, 17)">
        <path d="M6 0C2.7 0 0 2.7 0 6C0 10.5 6 17 6 17C6 17 12 10.5 12 6C12 2.7 9.3 0 6 0Z" fill="#ef4444" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
        <circle cx="6" cy="6" r="2.5" fill="#ffffff" />
      </g>
    </svg>
  );
}
