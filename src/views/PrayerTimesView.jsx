import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  MapPin,
  Compass,
  Sparkles,
  Navigation,
  Globe,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Sliders,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Volume2,
  LocateFixed
} from 'lucide-react';
import { CITIES, calculatePrayerTimes, calculateQiblaDirection } from '../services/prayerTimes';
import { sounds } from '../services/soundEffects';

export default function PrayerTimesView() {
  const [selectedCityId, setSelectedCityId] = useState('tasikmalaya');
  const [prayerData, setPrayerData] = useState(() => calculatePrayerTimes('tasikmalaya'));
  const [currentTime, setCurrentTime] = useState(new Date());

  // GPS Auto-location
  const [userLocation, setUserLocation] = useState(null);
  const [customQibla, setCustomQibla] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Compass Heading & Sensor State
  const [deviceHeading, setDeviceHeading] = useState(0); // Heading in degrees (0-360)
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [permissionState, setPermissionState] = useState('unknown'); // 'unknown' | 'prompt' | 'granted' | 'denied'
  const [isAutoScanning, setIsAutoScanning] = useState(false);
  const [manualHeading, setManualHeading] = useState(0);
  const [useManualMode, setUseManualMode] = useState(false);

  const lastVibratedRef = useRef(false);
  const autoScanTimerRef = useRef(null);

  // Clock & Prayer calculation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setPrayerData(calculatePrayerTimes(selectedCityId, new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedCityId]);

  // 1. Otomatis Minta GPS di Latar Belakang (Auto Location)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const calculatedQibla = calculateQiblaDirection(lat, lng);
          setUserLocation({ lat, lng });
          setCustomQibla(calculatedQibla);
        },
        (err) => {
          // GPS silent fallback to city
          console.log('GPS auto-detect skipped, using default city');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  }, []);

  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    setPrayerData(calculatePrayerTimes(cityId, new Date()));
    setCustomQibla(null); // Reset to city standard
  };

  const city = prayerData.city;
  const nextPrayer = prayerData.nextPrayer;
  const targetQibla = customQibla !== null ? customQibla : (city.qibla || 295.2);

  // 2. Sensor Gyroscope & Magnetometer Smartphone (Android & iOS)
  const hasReceivedAbsoluteRef = useRef(false);
  const sensorTestedRef = useRef(false);
  const [sensorUnsupported, setSensorUnsupported] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check if iOS 13+ permission dialog is needed
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      setPermissionState('prompt');
    } else {
      setPermissionState('granted');
    }

    const calculateTiltCompensatedHeading = (alpha, beta, gamma) => {
      if (alpha === null || typeof alpha === 'undefined') return null;
      if (beta === null || gamma === null) {
        return (360 - alpha) % 360;
      }
      const rad = Math.PI / 180;
      const _x = (beta || 0) * rad;
      const _y = (gamma || 0) * rad;
      const _z = (alpha || 0) * rad;

      const cX = Math.cos(_x);
      const cY = Math.cos(_y);
      const cZ = Math.cos(_z);
      const sX = Math.sin(_x);
      const sY = Math.sin(_y);
      const sZ = Math.sin(_z);

      const Vx = -cZ * sY - sZ * sX * cY;
      const Vy = -sZ * sY + cZ * sX * cY;

      let heading = Math.atan2(Vx, Vy) * (180 / Math.PI);
      if (heading < 0) heading += 360;
      return heading;
    };

    const handleAbsoluteOrientation = (e) => {
      if (!isMounted || useManualMode || isAutoScanning) return;
      hasReceivedAbsoluteRef.current = true;

      let heading = null;
      if (typeof e.webkitCompassHeading !== 'undefined' && e.webkitCompassHeading !== null) {
        heading = e.webkitCompassHeading;
      } else if (typeof e.alpha === 'number' && e.alpha !== null) {
        heading = calculateTiltCompensatedHeading(e.alpha, e.beta, e.gamma);
      }

      if (heading !== null && !isNaN(heading)) {
        setIsSensorActive(true);
        setSensorUnsupported(false);
        setDeviceHeading(Math.round(heading));
      }
    };

    const handleStandardOrientation = (e) => {
      if (!isMounted || useManualMode || isAutoScanning) return;
      // If absolute orientation is already active, ignore relative orientation
      if (hasReceivedAbsoluteRef.current) return;

      let heading = null;
      if (typeof e.webkitCompassHeading !== 'undefined' && e.webkitCompassHeading !== null) {
        heading = e.webkitCompassHeading;
      } else if (e.absolute && typeof e.alpha === 'number' && e.alpha !== null) {
        heading = calculateTiltCompensatedHeading(e.alpha, e.beta, e.gamma);
      } else if (typeof e.alpha === 'number' && e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        setIsSensorActive(true);
        setSensorUnsupported(false);
        setDeviceHeading(Math.round(heading));
      }
    };

    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
    }
    if ('ondeviceorientation' in window) {
      window.addEventListener('deviceorientation', handleStandardOrientation, true);
    }

    // Diagnostic check after 3 seconds: if no sensor fired, notify user gently
    const sensorTimer = setTimeout(() => {
      if (isMounted && !hasReceivedAbsoluteRef.current && !isSensorActive && permissionState !== 'prompt') {
        setSensorUnsupported(true);
      }
    }, 3500);

    return () => {
      isMounted = false;
      clearTimeout(sensorTimer);
      if ('ondeviceorientationabsolute' in window) {
        window.removeEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
      }
      if ('ondeviceorientation' in window) {
        window.removeEventListener('deviceorientation', handleStandardOrientation, true);
      }
    };
  }, [useManualMode, isAutoScanning, permissionState]);

  // Request Permission (untuk pengguna iPhone Safari & Android touch trigger)
  const requestCompassPermission = async () => {
    sounds.playIntroTone();
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionState('granted');
          setUseManualMode(false);
          setIsSensorActive(true);
        } else {
          setPermissionState('denied');
        }
      } catch (err) {
        console.warn('Orientation permission error:', err);
      }
    } else {
      setUseManualMode(false);
      setIsSensorActive(true);
    }
  };

  // 3. Fitur Pindai / Putar Otomatis ke Arah Kiblat (Bagi User yang Tidak Tahu Arah / Device Tanpa Gyro)
  const handleAutoScanToQibla = () => {
    setIsAutoScanning(true);
    setUseManualMode(true);
    sounds.playIntroTone();

    let start = currentHeading;
    const target = Math.round(targetQibla);
    let step = 0;
    const totalSteps = 45;

    if (autoScanTimerRef.current) clearInterval(autoScanTimerRef.current);

    autoScanTimerRef.current = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Smooth ease-out cubic interpolation
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (start + (target - start) * eased + 360) % 360;
      setManualHeading(Math.round(current));

      if (step >= totalSteps) {
        clearInterval(autoScanTimerRef.current);
        setManualHeading(target);
        setIsAutoScanning(false);
        sounds.playRoundComplete();
      }
    }, 20);
  };

  // Request GPS Location Manually
  const handleDetectGPS = () => {
    if (!('geolocation' in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const qibla = calculateQiblaDirection(lat, lng);
        setUserLocation({ lat, lng });
        setCustomQibla(qibla);
        sounds.playIntroTone();
      },
      (err) => {
        setIsLocating(false);
        alert('Tidak dapat mendeteksi lokasi GPS. Pastikan izin lokasi aktif di browser Anda.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Effective current heading of the phone
  const currentHeading = useManualMode || !isSensorActive ? manualHeading : deviceHeading;

  // Relative angle from top of phone to Ka'bah (0° = Ka'bah straight ahead)
  const relativeAngle = (targetQibla - currentHeading + 360) % 360;

  // Difference in degrees (-180 to 180)
  let diffAngle = relativeAngle;
  if (diffAngle > 180) diffAngle -= 360;

  // Locked condition (aligned within ±4 degrees)
  const isFacingQibla = Math.abs(diffAngle) <= 4;

  // Haptic chime & vibration when locked onto Qibla
  useEffect(() => {
    if (isFacingQibla && !lastVibratedRef.current) {
      if (navigator.vibrate) {
        navigator.vibrate([60, 40, 80]);
      }
      sounds.playIntroTone();
      lastVibratedRef.current = true;
    } else if (!isFacingQibla) {
      lastVibratedRef.current = false;
    }
  }, [isFacingQibla]);

  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3">
      {/* 1. Header Card with City Selector & GPS Auto Detection */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#101b25] border border-amber-900/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/70 text-emerald-400 border border-emerald-600/30 inline-block">
                Waktu Sholat & Arah Kiblat Otomatis
              </span>
              {customQibla !== null && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#b45309] text-white">
                  📍 Posisi GPS Akurat
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-serif">
              Jadwal Sholat {customQibla !== null ? 'Lokasi Anda (GPS)' : city.name}
            </h2>
            <p className="text-xs text-slate-300">
              {prayerData.dateStr}
            </p>
          </div>

          {/* City switcher + GPS button */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={handleDetectGPS}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border ${
                customQibla !== null
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-[#182836] text-emerald-300 border-emerald-500/30 hover:bg-emerald-950'
              }`}
            >
              <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Mencari...' : 'Deteksi GPS Saya'}</span>
            </button>

            {CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCityChange(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCityId === c.id && customQibla === null
                    ? 'bg-[#b45309] text-white shadow-md'
                    : 'bg-[#0b141d] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Next Prayer Highlight Banner */}
        <div className="p-4 rounded-2xl bg-[#0b141d] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Waktu Sholat Berikutnya
              </span>
              <h3 className="text-xl font-black text-amber-300 font-mono">
                {nextPrayer?.name} : {nextPrayer?.time} WIB
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium">
                Akurasi astronomis posisi matahari resmi
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">Jam Digital Saat Ini</span>
            <span className="text-2xl font-black text-white font-mono">
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid of 6 Prayer Times */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {prayerData.prayers.map((prayer) => {
          const isNext = nextPrayer?.name === prayer.name;

          return (
            <div
              key={prayer.name}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all text-center space-y-1 ${
                isNext
                  ? 'bg-[#1b2b20] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-[1.02]'
                  : 'bg-[#101b25] border-amber-900/20 hover:border-amber-500/30'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider block ${isNext ? 'text-emerald-400' : 'text-slate-400'}`}>
                {prayer.name}
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                {prayer.time}
              </span>
              {isNext ? (
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white inline-block">
                  Akan Tiba
                </span>
              ) : (
                <span className="text-[9px] text-slate-500 font-mono">WIB</span>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. KOMPAS KIBLAT GYRO OTOMATIS: PANDUAN LANGSUNG UNTUK USER YANG TIDAK TAHU ARAH */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#101b25] border border-amber-900/30 shadow-xl space-y-5">
        {/* Header Kompas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/70 text-amber-400 border border-amber-600/30">
                Kompas Kiblat Cerdas
              </span>
              {isSensorActive && !useManualMode ? (
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-600/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Gyro HP Aktif Bergerak</span>
                </span>
              ) : (
                <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-600/30">
                  Mode Panduan Otomatis
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Arah Kiblat Baitullah Makkah</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoScanToQibla}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#b45309] to-[#d97706] hover:from-[#c2410c] hover:to-[#ea580c] text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition active:scale-95 border border-amber-400/30"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              <span>Pindai Otomatis ke Kiblat</span>
            </button>
          </div>
        </div>

        {/* 📲 TOMBOL UTAMA AKTIVASI GYROSCOPE (Sangat Jelas & Terlihat di Layar HP) */}
        {(!isSensorActive || permissionState === 'prompt') && (
          <button
            onClick={requestCompassPermission}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2.5 transition active:scale-98 animate-pulse border border-amber-300/50"
          >
            <Smartphone className="w-5 h-5 text-white" />
            <span>Aktifkan Kompas Gyro Otomatis (Ketuk untuk Izinkan Sensor HP)</span>
          </button>
        )}

        {/* Catatan jika perangkat tidak punya chip magnetik fisik */}
        {sensorUnsupported && !isSensorActive && (
          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Info Sensor:</strong> Jika kompas tidak berputar saat HP digerakkan, kemungkinan ponsel Anda tidak memiliki chip magnetik kompas fisik. Jangan khawatir, silakan gunakan tombol <strong>"Pindai Otomatis ke Kiblat"</strong> di atas atau tombol patokan ruangan di bawah.
            </div>
          </div>
        )}

        {/* 🌟 PANDUAN ARAH JELAS & BESAR: "USER GA TAU ARAH" LANGSUNG PAHAM */}
        <div
          className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 text-center space-y-2 ${
            isFacingQibla
              ? 'bg-[#123324] border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)]'
              : 'bg-[#0b141d] border-amber-900/40'
          }`}
        >
          {isFacingQibla ? (
            <div className="space-y-1.5 py-2 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-emerald-300 tracking-wide font-serif">
                STOP! ANDA TEPAT MENGHADAP KIBLAT!
              </h4>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                Posisi smartphone Anda saat ini tepat sejajar lurus menghadap Ka'bah Baitullah di Makkah Al-Mukarramah ({Math.round(targetQibla)}° Baratlaut).
              </p>
            </div>
          ) : (
            <div className="space-y-3 py-1">
              <div className="flex items-center justify-center gap-3">
                {diffAngle > 0 ? (
                  <div className="flex items-center gap-3 bg-amber-950/80 border-2 border-amber-500/60 px-5 py-3.5 rounded-2xl shadow-lg w-full max-w-md">
                    <span className="text-3xl sm:text-4xl animate-pulse">👉</span>
                    <div className="text-left flex-1">
                      <span className="text-xs uppercase font-extrabold text-amber-400 block tracking-wider">
                        Instruksi Putar Badan:
                      </span>
                      <strong className="text-base sm:text-lg font-black text-white block">
                        PUTAR TUBUH KE ARAH KANAN
                      </strong>
                      <span className="text-xs text-amber-300 font-mono font-bold">
                        Putar sekitar {Math.abs(Math.round(diffAngle))}° lagi
                      </span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-amber-400 animate-bounce ml-auto flex-shrink-0" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 bg-amber-950/80 border-2 border-amber-500/60 px-5 py-3.5 rounded-2xl shadow-lg w-full max-w-md">
                    <ArrowLeft className="w-6 h-6 text-amber-400 animate-bounce mr-auto flex-shrink-0" />
                    <div className="text-right flex-1">
                      <span className="text-xs uppercase font-extrabold text-amber-400 block tracking-wider">
                        Instruksi Putar Badan:
                      </span>
                      <strong className="text-base sm:text-lg font-black text-white block">
                        PUTAR TUBUH KE ARAH KIRI
                      </strong>
                      <span className="text-xs text-amber-300 font-mono font-bold">
                        Putar sekitar {Math.abs(Math.round(diffAngle))}° lagi
                      </span>
                    </div>
                    <span className="text-3xl sm:text-4xl animate-pulse">👈</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-300">
                Pegang HP mendatar di telapak tangan, putar badan Anda perlahan hingga tanda panah di atas pas sejajar dengan Ka'bah dan layar menyala hijau.
              </p>
            </div>
          )}
        </div>

        {/* 4. VISUAL INSTRUMEN KOMPAS BERGERAK */}
        <div className="flex flex-col items-center justify-center py-2 space-y-4">
          {/* Top Direction Indicator of Phone */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Arah Depan Ponsel Anda
            </span>
            <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] transition-colors ${
              isFacingQibla ? 'border-b-emerald-400 animate-bounce' : 'border-b-amber-500'
            }`} />
          </div>

          {/* Compass Dial Outer Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Ring & Bezel with Dynamic Glow when locked */}
            <div
              className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                isFacingQibla
                  ? 'border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)]'
                  : 'border-slate-700/80 shadow-[0_0_25px_rgba(0,0,0,0.6)]'
              }`}
            />

            {/* Rotating Dial (Rotates opposite to device heading so North aligns with true Earth North) */}
            <div
              className="absolute inset-2 rounded-full bg-[#070d13] transition-transform duration-300 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${-currentHeading}deg)` }}
            >
              {/* Cardinal Markers */}
              <span className="absolute top-2 text-xs font-black text-rose-500 font-mono">U (0°)</span>
              <span className="absolute bottom-2 text-xs font-black text-slate-400 font-mono">S (180°)</span>
              <span className="absolute right-2 text-xs font-black text-slate-400 font-mono">T (90°)</span>
              <span className="absolute left-2 text-xs font-black text-slate-400 font-mono">B (270°)</span>

              {/* Tick Rings */}
              <div className="absolute inset-6 rounded-full border border-dashed border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/5" />

              {/* Fixed Ka'bah Marker on the Earth Dial (at targetQibla degrees) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none"
                style={{ transform: `rotate(${targetQibla}deg)` }}
              >
                <div className="flex flex-col items-center -mt-2.5">
                  <span className="text-lg select-none">🕋</span>
                  <span className="text-[8px] font-black uppercase text-amber-300 bg-black/90 px-1.5 py-0.5 rounded shadow border border-amber-500/40">
                    KIBLAT
                  </span>
                </div>
              </div>
            </div>

            {/* Pointer Needle to Ka'bah (relative to top of device screen) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${relativeAngle}deg)` }}
            >
              {/* Pointer Tip */}
              <div className="flex flex-col items-center -mt-3.5">
                <div className={`w-5 h-7 transition-colors ${
                  isFacingQibla ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  <Navigation className="w-6 h-6 fill-current transform rotate-0 drop-shadow-md" />
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono shadow ${
                  isFacingQibla ? 'bg-emerald-600 text-white' : 'bg-[#b45309] text-white'
                }`}>
                  Ka'bah
                </span>
              </div>

              {/* Counterweight Tail */}
              <div className="w-3 h-3 rounded-full bg-slate-600 -mb-1 opacity-70" />
            </div>

            {/* Center Pivot */}
            <div className={`w-7 h-7 rounded-full border-2 border-white shadow-lg z-30 flex items-center justify-center transition-colors ${
              isFacingQibla ? 'bg-emerald-500' : 'bg-[#b45309]'
            }`}>
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
          </div>

          {/* 5. PATOKAN NYATA ARAH KIBLAT (UNTUK DI DALAM KAMAR / RUANGAN) */}
          <div className="w-full max-w-lg p-4 rounded-2xl bg-[#0b141d] border border-amber-900/30 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <strong className="text-white">Patokan Praktis Jika di Dalam Ruangan:</strong>
            </div>

            <p className="text-[11px] leading-relaxed">
              Bagi wilayah Tasikmalaya & Jawa Barat, arah Kiblat ({Math.round(targetQibla)}°) adalah <strong>sedikit menyerong ke kanan dari arah tempat Matahari Terbenam (Barat)</strong> sekitar 25 derajat ke arah Barat Laut.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1 font-medium">
              <button
                onClick={() => {
                  setUseManualMode(true);
                  setManualHeading(90);
                }}
                className="p-2.5 rounded-xl bg-black/50 hover:bg-amber-950/40 border border-white/10 space-y-0.5 text-left transition"
              >
                <span className="text-amber-400 block font-bold">Matahari Terbit</span>
                <span className="text-slate-400 block text-[9px]">Kiblat di Belakang Kanan</span>
              </button>
              <button
                onClick={() => {
                  setUseManualMode(true);
                  setManualHeading(Math.round(targetQibla));
                }}
                className="p-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 space-y-0.5 text-left text-emerald-300 font-bold transition shadow-sm"
              >
                <span className="block text-emerald-200">🕋 Ka'bah / Kiblat</span>
                <span className="block text-[9px] text-emerald-300/80">Lurus ({Math.round(targetQibla)}°)</span>
              </button>
              <button
                onClick={() => {
                  setUseManualMode(true);
                  setManualHeading(270);
                }}
                className="p-2.5 rounded-xl bg-black/50 hover:bg-orange-950/40 border border-white/10 space-y-0.5 text-left transition"
              >
                <span className="text-orange-400 block font-bold">Matahari Terbenam</span>
                <span className="text-slate-400 block text-[9px]">Kiblat Serong Kanan 25°</span>
              </button>
            </div>
          </div>

          {/* 6. Slider Pengatur Manual (Untuk Uji Coba di PC / Laptop) */}
          <div className="w-full max-w-lg space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#0b141d] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Uji Coba Putar Manual (Laptop / PC)</span>
                </span>
                <span className="text-[10px] text-amber-300 font-mono font-bold">
                  {Math.round(currentHeading)}°
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="360"
                value={currentHeading}
                onChange={(e) => {
                  setUseManualMode(true);
                  setManualHeading(Number(e.target.value));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-slate-400">
                  Geser untuk melihat instruksi putar badan berubah otomatis
                </span>
                <button
                  onClick={() => {
                    setUseManualMode(true);
                    setManualHeading(Math.round(targetQibla));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-600/40 hover:bg-emerald-900 transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Kunci Kiblat ({Math.round(targetQibla)}°)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
