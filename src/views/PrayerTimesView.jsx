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
  LocateFixed,
  X,
  HelpCircle,
  RefreshCw
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

  // Compass Heading & Sensor State (MyQuran Standard Engine)
  const [deviceHeading, setDeviceHeading] = useState(0); // Displayed integer heading (0-360)
  const [continuousHeading, setContinuousHeading] = useState(0); // 60 FPS smoothly interpolated continuous angle
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [permissionState, setPermissionState] = useState('unknown'); // 'unknown' | 'prompt' | 'granted' | 'denied'
  const [isAutoScanning, setIsAutoScanning] = useState(false);
  const [manualHeading, setManualHeading] = useState(0);
  const [useManualMode, setUseManualMode] = useState(false);
  const [sensorUnsupported, setSensorUnsupported] = useState(false);

  // Phone Tilt & Waterpass Level (Like MyQuran Flatness Detection)
  const [isTilted, setIsTilted] = useState(false);
  const [tiltAngles, setTiltAngles] = useState({ beta: 0, gamma: 0 });
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);

  // Engine Refs
  const continuousTargetRef = useRef(0);
  const continuousRenderedRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const lastStateUpdateRef = useRef(0);
  const hasReceivedAbsoluteRef = useRef(false);
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

  // Helper: Shortest angular difference between two angles (-180 to 180)
  const getShortestAngleDelta = (target, current) => {
    let diff = (target - current) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return diff;
  };

  // 2. 60 FPS Continuous Rotation Damping Loop (Low-Pass Filter)
  useEffect(() => {
    let lastTimestamp = performance.now();

    const updateRenderFrame = (now) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      const target = continuousTargetRef.current;
      const current = continuousRenderedRef.current;

      const delta = target - current;
      const lerpSpeed = 12.0;
      continuousRenderedRef.current = current + delta * Math.min(1, dt * lerpSpeed);

      if (now - lastStateUpdateRef.current > 16) {
        setContinuousHeading(continuousRenderedRef.current);
        const norm = ((continuousRenderedRef.current % 360) + 360) % 360;
        setDeviceHeading(Math.round(norm));
        lastStateUpdateRef.current = now;
      }

      animFrameIdRef.current = requestAnimationFrame(updateRenderFrame);
    };

    animFrameIdRef.current = requestAnimationFrame(updateRenderFrame);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // 3. Sensor Gyroscope Handler
  useEffect(() => {
    let isMounted = true;

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      setPermissionState('prompt');
    }

    const processOrientation = (e, isAbsolute = false) => {
      if (!isMounted || useManualMode || isAutoScanning) return;

      const beta = e.beta || 0;
      const gamma = e.gamma || 0;
      const tiltMagnitude = Math.max(Math.abs(beta), Math.abs(gamma));
      setTiltAngles({ beta, gamma });
      setIsTilted(tiltMagnitude > 22);

      let heading = null;

      if (typeof e.webkitCompassHeading !== 'undefined' && e.webkitCompassHeading !== null) {
        heading = e.webkitCompassHeading;
      } else if (e.alpha !== null && typeof e.alpha !== 'undefined') {
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        if (!isSensorActive) setIsSensorActive(true);
        if (isAbsolute) hasReceivedAbsoluteRef.current = true;

        const currentTarget = continuousTargetRef.current;
        const normalizedTarget = ((currentTarget % 360) + 360) % 360;
        const shortestDelta = getShortestAngleDelta(heading, normalizedTarget);

        continuousTargetRef.current = currentTarget + shortestDelta;
      }
    };

    const handleAbsoluteOrientation = (e) => processOrientation(e, true);
    const handleStandardOrientation = (e) => {
      if (hasReceivedAbsoluteRef.current) return;
      processOrientation(e, false);
    };

    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
    }
    if ('ondeviceorientation' in window) {
      window.addEventListener('deviceorientation', handleStandardOrientation, true);
    }

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

  // Request Permission
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

  // 4. Fitur Pindai / Putar Otomatis ke Arah Kiblat
  const handleAutoScanToQibla = () => {
    setIsAutoScanning(true);
    setUseManualMode(true);
    sounds.playIntroTone();

    const start = continuousRenderedRef.current;
    const startNorm = ((start % 360) + 360) % 360;
    const delta = getShortestAngleDelta(targetQibla, startNorm);
    const targetContinuous = start + delta;

    let step = 0;
    const totalSteps = 45;

    if (autoScanTimerRef.current) clearInterval(autoScanTimerRef.current);

    autoScanTimerRef.current = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (targetContinuous - start) * eased;
      setManualHeading(current);
      continuousTargetRef.current = current;

      if (step >= totalSteps) {
        clearInterval(autoScanTimerRef.current);
        setManualHeading(targetContinuous);
        continuousTargetRef.current = targetContinuous;
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

  // Effective current heading of the phone (normalized 0-360)
  const currentHeading = useManualMode ? manualHeading : ((continuousHeading % 360) + 360) % 360;

  // Shortest angular difference to Ka'bah (-180 to 180)
  const diffAngle = getShortestAngleDelta(targetQibla, currentHeading);

  // Locked condition (aligned within ±3.5 degrees)
  const isFacingQibla = Math.abs(diffAngle) <= 3.5;

  // Waterpass Bubble coordinates for center level indicator
  const bubbleX = Math.max(-10, Math.min(10, (tiltAngles.gamma / 25) * 10));
  const bubbleY = Math.max(-10, Math.min(10, (tiltAngles.beta / 25) * 10));
  const isLevel = Math.abs(tiltAngles.beta) < 12 && Math.abs(tiltAngles.gamma) < 12;

  // Haptic chime & vibration when locked onto Qibla
  useEffect(() => {
    if (isFacingQibla && !lastVibratedRef.current) {
      if (navigator.vibrate) {
        navigator.vibrate([50, 40, 60]);
      }
      sounds.playIntroTone();
      lastVibratedRef.current = true;
    } else if (!isFacingQibla) {
      lastVibratedRef.current = false;
    }
  }, [isFacingQibla]);

  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3 max-w-4xl mx-auto">
      {/* 1. Header Card with City Selector & GPS Auto Detection (Putih Bersih) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                Waktu Sholat & Arah Kiblat Otomatis
              </span>
              {customQibla !== null && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                  📍 Posisi GPS Akurat
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              Jadwal Sholat {customQibla !== null ? 'Lokasi Anda (GPS)' : city.name}
            </h2>
            <p className="text-xs text-slate-500">
              {prayerData.dateStr}
            </p>
          </div>

          {/* City switcher + GPS button */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={handleDetectGPS}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border ${
                customQibla !== null
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Next Prayer Highlight Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider">
                Waktu Sholat Berikutnya
              </span>
              <h3 className="text-xl font-black text-amber-700 font-mono">
                {nextPrayer?.name} : {nextPrayer?.time} WIB
              </h3>
              <span className="text-[11px] text-slate-600 font-medium">
                Akurasi astronomis posisi matahari resmi
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-200/60">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Jam Digital Saat Ini</span>
            <span className="text-2xl font-black text-slate-900 font-mono">
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid of 6 Prayer Times (Putih Bersih) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {prayerData.prayers.map((prayer) => {
          const isNext = nextPrayer?.name === prayer.name;

          return (
            <div
              key={prayer.name}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all text-center space-y-1 ${
                isNext
                  ? 'bg-amber-50 border-amber-400 shadow-md ring-1 ring-amber-400 scale-[1.02]'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider block ${isNext ? 'text-amber-800' : 'text-slate-500'}`}>
                {prayer.name}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono block">
                {prayer.time}
              </span>
              {isNext ? (
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white inline-block shadow-xs">
                  Akan Tiba
                </span>
              ) : (
                <span className="text-[9px] text-slate-400 font-mono">WIB</span>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. KOMPAS KIBLAT GYRO OTOMATIS: PANDUAN LANGSUNG UNTUK USER YANG TIDAK TAHU ARAH */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        {/* Header Kompas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                Kompas Kiblat Cerdas
              </span>
              {isSensorActive && !useManualMode ? (
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Gyro HP Aktif Bergerak</span>
                </span>
              ) : (
                <span className="text-[10px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Mode Panduan Otomatis
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              <span>Arah Kiblat Baitullah Makkah</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCalibrationModal(true)}
              className="px-3 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition active:scale-95 shadow-xs"
              title="Panduan Kalibrasi Angka 8 (Standar MyQuran)"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Kalibrasi Angka 8</span>
            </button>
            <button
              onClick={handleAutoScanToQibla}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-100 animate-spin" />
              <span>Pindai Otomatis ke Kiblat</span>
            </button>
          </div>
        </div>

        {/* 📲 TOMBOL UTAMA AKTIVASI GYROSCOPE */}
        {(!isSensorActive || permissionState === 'prompt') && (
          <button
            onClick={requestCompassPermission}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2.5 transition active:scale-98 animate-pulse"
          >
            <Smartphone className="w-5 h-5 text-white" />
            <span>Aktifkan Kompas Gyro Otomatis (Ketuk untuk Izinkan Sensor HP)</span>
          </button>
        )}

        {/* Peringatan Kemiringan HP */}
        {isSensorActive && isTilted && !useManualMode && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between gap-3 animate-in fade-in shadow-xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 animate-bounce" />
              <div className="text-[11px] leading-tight">
                <strong>Posisikan HP Lebih Rata:</strong> Kemiringan ponsel saat ini ({Math.max(Math.abs(tiltAngles.beta), Math.abs(tiltAngles.gamma))}°). Mohon letakkan HP mendatar di telapak tangan agar kompas membaca kiblat dengan 100% presisi.
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1.5 rounded-xl flex-shrink-0 border border-amber-200">
              Ratakan HP
            </span>
          </div>
        )}

        {/* Catatan jika perangkat tidak punya chip magnetik fisik */}
        {sensorUnsupported && !isSensorActive && (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Info Sensor:</strong> Jika kompas tidak berputar saat HP digerakkan, kemungkinan ponsel Anda tidak memiliki chip sensor magnetik kompas fisik. Silakan gunakan tombol <strong>"Pindai Otomatis ke Kiblat"</strong> di atas.
            </div>
          </div>
        )}

        {/* 🌟 PANDUAN ARAH JELAS & BESAR */}
        <div
          className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 text-center space-y-2 ${
            isFacingQibla
              ? 'bg-emerald-50 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          {isFacingQibla ? (
            <div className="space-y-1.5 py-2 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-emerald-800 tracking-wide font-serif">
                STOP! ANDA TEPAT MENGHADAP KIBLAT!
              </h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Posisi smartphone Anda saat ini tepat sejajar lurus menghadap Ka'bah Baitullah di Makkah Al-Mukarramah ({Math.round(targetQibla)}° Baratlaut).
              </p>
            </div>
          ) : (
            <div className="space-y-3 py-1">
              <div className="flex items-center justify-center gap-3">
                {diffAngle > 0 ? (
                  <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-400 px-5 py-3.5 rounded-2xl shadow-sm w-full max-w-md">
                    <span className="text-3xl sm:text-4xl animate-pulse">👉</span>
                    <div className="text-left flex-1">
                      <span className="text-xs uppercase font-extrabold text-amber-800 block tracking-wider">
                        Instruksi Putar Badan:
                      </span>
                      <strong className="text-base sm:text-lg font-black text-slate-900 block">
                        PUTAR TUBUH KE ARAH KANAN
                      </strong>
                      <span className="text-xs text-amber-700 font-mono font-bold">
                        Putar sekitar {Math.abs(Math.round(diffAngle))}° lagi
                      </span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-amber-600 animate-bounce ml-auto flex-shrink-0" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-400 px-5 py-3.5 rounded-2xl shadow-sm w-full max-w-md">
                    <ArrowLeft className="w-6 h-6 text-amber-600 animate-bounce mr-auto flex-shrink-0" />
                    <div className="text-right flex-1">
                      <span className="text-xs uppercase font-extrabold text-amber-800 block tracking-wider">
                        Instruksi Putar Badan:
                      </span>
                      <strong className="text-base sm:text-lg font-black text-slate-900 block">
                        PUTAR TUBUH KE ARAH KIRI
                      </strong>
                      <span className="text-xs text-amber-700 font-mono font-bold">
                        Putar sekitar {Math.abs(Math.round(diffAngle))}° lagi
                      </span>
                    </div>
                    <span className="text-3xl sm:text-4xl animate-pulse">👈</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500">
                Pegang HP mendatar di telapak tangan, putar badan Anda perlahan hingga tanda panah di atas sejajar dengan Ka'bah dan layar menyala hijau.
              </p>
            </div>
          )}
        </div>

        {/* 4. VISUAL INSTRUMEN KOMPAS BERGERAK */}
        <div className="flex flex-col items-center justify-center py-2 space-y-4">
          {/* Top Direction Indicator of Phone */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Arah Depan Ponsel Anda
            </span>
            <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] transition-colors ${
              isFacingQibla ? 'border-b-emerald-500 animate-bounce' : 'border-b-amber-500'
            }`} />
          </div>

          {/* Compass Dial Outer Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Ring & Bezel with Dynamic Glow when locked */}
            <div
              className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                isFacingQibla
                  ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]'
                  : 'border-slate-300 shadow-md'
              }`}
            />

            {/* Rotating Dial */}
            <div
              className="absolute inset-2 rounded-full bg-[#0f172a] flex items-center justify-center pointer-events-none"
              style={{
                transform: `rotate(${-continuousHeading}deg)`,
                willChange: 'transform'
              }}
            >
              {/* Cardinal Markers */}
              <span className="absolute top-2 text-xs font-black text-rose-400 font-mono">U (0°)</span>
              <span className="absolute bottom-2 text-xs font-black text-slate-400 font-mono">S (180°)</span>
              <span className="absolute right-2 text-xs font-black text-slate-400 font-mono">T (90°)</span>
              <span className="absolute left-2 text-xs font-black text-slate-400 font-mono">B (270°)</span>

              {/* Tick Rings */}
              <div className="absolute inset-6 rounded-full border border-dashed border-white/20" />
              <div className="absolute inset-12 rounded-full border border-white/10" />

              {/* Fixed Ka'bah Marker on the Earth Dial */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none"
                style={{ transform: `rotate(${targetQibla}deg)` }}
              >
                <div className="flex flex-col items-center -mt-2.5">
                  <span className="text-lg select-none">🕋</span>
                  <span className="text-[8px] font-black uppercase text-amber-300 bg-black/90 px-1.5 py-0.5 rounded shadow border border-amber-500/50">
                    KIBLAT
                  </span>
                </div>
              </div>
            </div>

            {/* Pointer Needle to Ka'bah */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none z-20"
              style={{
                transform: `rotate(${targetQibla - continuousHeading}deg)`,
                willChange: 'transform'
              }}
            >
              {/* Pointer Tip */}
              <div className="flex flex-col items-center -mt-3.5">
                <div className={`w-5 h-7 transition-colors duration-200 ${
                  isFacingQibla ? 'text-emerald-400 drop-shadow-[0_0_12px_#34d399]' : 'text-amber-400 drop-shadow-md'
                }`}>
                  <Navigation className="w-6 h-6 fill-current transform rotate-0" />
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono shadow ${
                  isFacingQibla ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  Ka'bah
                </span>
              </div>

              {/* Counterweight Tail */}
              <div className="w-3 h-3 rounded-full bg-slate-500 -mb-1 opacity-70" />
            </div>

            {/* Center Pivot with Integrated MyQuran-style Waterpass */}
            <div
              title={isLevel ? "Posisi HP Mendatar Sempurna" : "Miring: Luruskan HP mendatar di telapak tangan"}
              className={`relative w-11 h-11 rounded-full border-2 shadow-xl z-30 flex items-center justify-center transition-colors ${
                isLevel
                  ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'border-amber-400/80 bg-[#141f2b]/95 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Crosshair guidelines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-white/20" />
                <div className="h-full w-[1px] bg-white/20 absolute" />
              </div>

              {/* Center Target Ring */}
              <div className={`w-4 h-4 rounded-full border border-dashed transition-colors ${
                isLevel ? 'border-emerald-400' : 'border-amber-400/50'
              }`} />

              {/* Floating Bubble Level */}
              <div
                className={`absolute w-3 h-3 rounded-full shadow transition-transform duration-100 ease-out ${
                  isLevel ? 'bg-emerald-400 ring-2 ring-emerald-300 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 ring-1 ring-amber-200'
                }`}
                style={{
                  transform: `translate(${bubbleX}px, ${bubbleY}px)`,
                }}
              />
            </div>
          </div>

          {/* Kartu Derajat & Status Sensor */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-lg text-center pt-1">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider">Arah Kiblat</span>
              <span className="text-base font-black text-amber-700 font-mono">
                {Math.round(targetQibla)}°
              </span>
              <span className="text-[9px] text-slate-500 block font-medium">Barat Laut (BBU)</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider">Arah Ponsel</span>
              <span className="text-base font-black text-slate-900 font-mono">
                {Math.round(currentHeading)}°
              </span>
              <span className="text-[9px] text-emerald-600 block font-medium">
                {isSensorActive ? 'Sensitif Halus' : 'Manual'}
              </span>
            </div>

            <div className={`p-2.5 rounded-2xl border space-y-0.5 transition-colors ${
              isFacingQibla
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-amber-700'
            }`}>
              <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider">Selisih Sudut</span>
              <span className="text-base font-black font-mono">
                {Math.abs(Math.round(diffAngle))}°
              </span>
              <span className="text-[9px] block font-bold">
                {isFacingQibla ? 'TEPAT KIBLAT' : diffAngle > 0 ? 'Putar Kanan' : 'Putar Kiri'}
              </span>
            </div>
          </div>

          {/* 5. PATOKAN NYATA ARAH KIBLAT (UNTUK DI DALAM KAMAR / RUANGAN) */}
          <div className="w-full max-w-lg p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <strong className="text-slate-900">Patokan Praktis Jika di Dalam Ruangan:</strong>
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
                className="p-2.5 rounded-xl bg-white hover:bg-amber-100/50 border border-slate-200 space-y-0.5 text-left transition shadow-xs"
              >
                <span className="text-amber-700 block font-bold">Matahari Terbit</span>
                <span className="text-slate-500 block text-[9px]">Kiblat di Belakang Kanan</span>
              </button>
              <button
                onClick={() => {
                  setUseManualMode(true);
                  setManualHeading(Math.round(targetQibla));
                }}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 space-y-0.5 text-left text-emerald-800 font-bold transition shadow-xs"
              >
                <span className="block text-emerald-900">🕋 Ka'bah / Kiblat</span>
                <span className="block text-[9px] text-emerald-700">Lurus ({Math.round(targetQibla)}°)</span>
              </button>
              <button
                onClick={() => {
                  setUseManualMode(true);
                  setManualHeading(270);
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-orange-100/50 border border-slate-200 space-y-0.5 text-left transition shadow-xs"
              >
                <span className="text-orange-700 block font-bold">Matahari Terbenam</span>
                <span className="text-slate-500 block text-[9px]">Kiblat Serong Kanan 25°</span>
              </button>
            </div>
          </div>

          {/* 6. Slider Pengatur Manual (Untuk Uji Coba di PC / Laptop) */}
          <div className="w-full max-w-lg space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  <span>Uji Coba Putar Manual (Laptop / PC)</span>
                </span>
                <span className="text-[10px] text-amber-700 font-mono font-bold">
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
                <span className="text-[10px] text-slate-500">
                  Geser untuk melihat instruksi putar badan berubah otomatis
                </span>
                <button
                  onClick={() => {
                    setUseManualMode(true);
                    setManualHeading(Math.round(targetQibla));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-300 hover:bg-emerald-100 transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Kunci Kiblat ({Math.round(targetQibla)}°)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Panduan Kalibrasi Sensor Angka 8 (Standar MyQuran) */}
      {showCalibrationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Kalibrasi Magnetometer</span>
              </span>
              <button
                onClick={() => setShowCalibrationModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Infinity / Figure-8 Graphic */}
            <div className="py-4 relative flex items-center justify-center">
              <div className="w-32 h-16 rounded-full border-4 border-dashed border-amber-400 relative flex items-center justify-center bg-amber-50">
                <span className="text-4xl text-amber-600 font-black animate-pulse">∞</span>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <h4 className="text-base font-bold text-slate-900 text-center">Ayunkan HP Membentuk Angka 8</h4>
              <p className="text-xs text-slate-600 leading-relaxed text-center">
                Pegang smartphone Anda lalu ayunkan perlahan di udara membentuk <strong>pola angka 8 (tak hingga / ∞)</strong> sebanyak 2–3 kali.
              </p>
              <div className="text-[11px] text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200 leading-relaxed">
                <strong>Mengapa perlu kalibrasi?</strong> Sama seperti di aplikasi MyQuran, gerakan angka 8 ini mengembalikan kalibrasi chip kompas fisik dari gangguan medan magnet (misal casing magnet, barang elektronik, atau rangka besi di dalam ruangan).
              </div>
            </div>

            <button
              onClick={() => {
                setShowCalibrationModal(false);
                sounds.playIntroTone();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs shadow-md transition active:scale-95"
            >
              Saya Sudah Mengayunkan HP (Selesai)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
