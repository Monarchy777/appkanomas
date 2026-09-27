import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  MapPin,
  Compass,
  Sparkles,
  Globe,
  RotateCcw,
  Smartphone,
  LocateFixed,
  X,
  HelpCircle
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

  const isSaudi = prayerData.isSaudi || selectedCityId === 'makkah' || selectedCityId === 'madinah';
  const timeZoneCode = isSaudi ? 'WAS' : (prayerData.timeZoneCode || 'WIB');

  // Format digital clock with WAS / WIB
  const formatDigitalClock = (date, saudi) => {
    try {
      const timeStr = date.toLocaleTimeString('id-ID', {
        timeZone: saudi ? 'Asia/Riyadh' : undefined,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\./g, ':');
      return `${timeStr} ${saudi ? 'WAS' : 'WIB'}`;
    } catch (e) {
      const hours = (date.getUTCHours() + (saudi ? 3 : 7) + 24) % 24;
      const mins = String(date.getUTCMinutes()).padStart(2, '0');
      const secs = String(date.getUTCSeconds()).padStart(2, '0');
      return `${String(hours).padStart(2, '0')}:${mins}:${secs} ${saudi ? 'WAS' : 'WIB'}`;
    }
  };

  // Clock & Prayer calculation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (selectedCityId === 'gps' && userLocation) {
        setPrayerData(calculatePrayerTimes({
          id: 'gps',
          name: 'Lokasi Anda (GPS)',
          country: 'Indonesia',
          lat: userLocation.lat,
          lng: userLocation.lng,
          qibla: customQibla
        }, now));
      } else {
        setPrayerData(calculatePrayerTimes(selectedCityId, now));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedCityId, userLocation, customQibla]);

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
    setCustomQibla(null); // Reset to city standard
    setPrayerData(calculatePrayerTimes(cityId, new Date()));
    sounds.playIntroTone();
  };

  const city = prayerData.city;
  const nextPrayer = prayerData.nextPrayer;
  const targetQibla = customQibla !== null ? customQibla : (city.qibla !== undefined ? city.qibla : 295.2);

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
    if (!('geolocation' in navigator)) {
      alert('Fitur GPS tidak didukung di browser ini.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const qibla = calculateQiblaDirection(lat, lng);
        setUserLocation({ lat, lng });
        setCustomQibla(qibla);
        setSelectedCityId('gps');
        setPrayerData(calculatePrayerTimes({
          id: 'gps',
          name: 'Lokasi Anda (GPS)',
          country: 'Indonesia',
          lat,
          lng,
          qibla
        }, new Date()));
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
    <div className="space-y-6 sm:space-y-7 pb-28 mx-3 sm:mx-6 mt-4 max-w-4xl mx-auto">
      {/* 1. KARTU JADWAL SHOLAT & LOKASI (Putih Bersih, Proporsional & Lega) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
        {/* Header & Location Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs inline-flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Waktu Sholat & Arah Kiblat</span>
              </span>
              {customQibla !== null ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs flex items-center gap-1">
                  <LocateFixed className="w-3 h-3" /> Lokasi GPS Saya
                </span>
              ) : isSaudi ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                  🕋 Waktu Arab Saudi (WAS)
                </span>
              ) : null}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight leading-snug">
              Jadwal Sholat {customQibla !== null ? 'Lokasi GPS Anda' : city.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {prayerData.dateStr}
            </p>
          </div>

          {/* Location switcher buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* 1. Tombol Deteksi GPS */}
            <button
              onClick={handleDetectGPS}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border shadow-xs ${
                selectedCityId === 'gps' || customQibla !== null
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Mencari...' : 'Deteksi GPS Saya'}</span>
            </button>

            {/* 2. Tombol Makkah */}
            <button
              onClick={() => handleCityChange('makkah')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border shadow-xs ${
                selectedCityId === 'makkah' && customQibla === null
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 ring-2 ring-amber-300'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span>🕋 Makkah</span>
            </button>

            {/* 3. Tombol Madinah */}
            <button
              onClick={() => handleCityChange('madinah')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border shadow-xs ${
                selectedCityId === 'madinah' && customQibla === null
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 ring-2 ring-emerald-300'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span>🕌 Madinah</span>
            </button>

            {/* 4. Tombol Tasikmalaya */}
            <button
              onClick={() => handleCityChange('tasikmalaya')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition border shadow-xs ${
                selectedCityId === 'tasikmalaya' && customQibla === null
                  ? 'bg-slate-800 text-white border-slate-700 ring-2 ring-slate-400'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Tasikmalaya
            </button>

            {/* Kota Tambahan */}
            {['jakarta', 'bandung'].map((cid) => {
              const c = CITIES.find((item) => item.id === cid);
              if (!c) return null;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCityChange(c.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition border shadow-xs ${
                    selectedCityId === c.id && customQibla === null
                      ? 'bg-slate-800 text-white border-slate-700'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Prayer Highlight Banner with WAS/WIB Clock */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-amber-800 uppercase font-bold tracking-wider block">
                Waktu Sholat Berikutnya ({timeZoneCode})
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-700 font-mono tracking-tight leading-snug">
                {nextPrayer?.name} : {nextPrayer?.time} {timeZoneCode}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {isSaudi ? 'Waktu lokal Tanah Suci (Arab Saudi / UTC+3)' : 'Jadwal resmi Kementerian Agama Republik Indonesia'}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-amber-200/70 space-y-1 flex-shrink-0">
            <span className="text-[11px] text-slate-500 block uppercase font-bold tracking-wider">
              {isSaudi ? 'Jam Sekarang di Madinah & Makkah' : 'Jam Digital Saat Ini'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight block">
              {formatDigitalClock(currentTime, isSaudi)}
            </span>
          </div>
        </div>

        {/* Jadwal Sholat 6 Waktu dalam 1 Baris Kompak & Proporsional */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Jadwal 6 Waktu Sholat Hari Ini ({timeZoneCode})
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {customQibla !== null ? 'Lokasi GPS' : city.name}
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
            <div className="grid grid-cols-6 gap-2 sm:gap-2.5 min-w-[340px]">
              {prayerData.prayers.map((prayer) => {
                const isNext = nextPrayer?.name === prayer.name;

                return (
                  <div
                    key={prayer.name}
                    className={`py-3 px-1 sm:px-2.5 text-center rounded-2xl transition-all flex flex-col items-center justify-center space-y-1 ${
                      isNext
                        ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white font-bold shadow-md shadow-amber-500/20 ring-2 ring-amber-300'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider block ${
                      isNext ? 'text-amber-100' : 'text-slate-500'
                    }`}>
                      {prayer.name}
                    </span>

                    <span className={`text-sm sm:text-lg font-black font-mono block leading-none py-0.5 ${
                      isNext ? 'text-white' : 'text-slate-900'
                    }`}>
                      {prayer.time}
                    </span>

                    <span className={`text-[9px] sm:text-[10px] font-mono block ${
                      isNext ? 'text-amber-100 font-bold' : 'text-slate-400'
                    }`}>
                      {timeZoneCode}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. KOMPAS KIBLAT: PENANDA BULATAN, ARAH ANGIN & GAMBAR KA'BAH */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        {/* Header Kompas & Keterangan Kalibrasi (tanpa logo) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 inline-block">
                Kompas Kiblat Presisi
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans flex items-center gap-2 mt-1">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>Arah Kiblat Baitullah Makkah</span>
              </h3>
            </div>

            {/* Tombol Panduan Kalibrasi (tanpa logo) */}
            <button
              onClick={() => setShowCalibrationModal(true)}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition active:scale-95 text-left sm:text-center shadow-xs self-start sm:self-center"
            >
              Panduan Kalibrasi Angka 8
            </button>
          </div>

          {/* Kotak Tips Kalibrasi Lega & Proporsional */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1">
            <span className="font-bold text-slate-800 block">💡 Panduan Penggunaan:</span>
            <p>
              Pegang smartphone mendatar di telapak tangan, lalu putar badan perlahan hingga penanda gambar Ka'bah berada di posisi atas (arah depan ponsel). Jika kompas belum presisi, ayunkan ponsel di udara membentuk pola angka 8 (∞) untuk kalibrasi sensor magnetik.
            </p>
          </div>
        </div>

        {/* Tombol izin sensor jika diperlukan browser (iOS / Safari) */}
        {permissionState === 'prompt' && (
          <button
            onClick={requestCompassPermission}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-98"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>Ketuk untuk Mengaktifkan Sensor Kompas HP</span>
          </button>
        )}

        {/* Visual Kompas Bulatan & Arah Angin */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          {/* Penunjuk Depan Ponsel (12 o'clock cursor) */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Arah Depan Ponsel
            </span>
            <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] transition-colors ${
              isFacingQibla ? 'border-b-emerald-500 animate-bounce' : 'border-b-amber-500'
            }`} />
          </div>

          {/* Bulatan Kompas Dial */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Bezel Luar dengan Efek Cahaya Hijau saat Menghadap Kiblat */}
            <div
              className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                isFacingQibla
                  ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]'
                  : 'border-slate-300 shadow-md'
              }`}
            />

            {/* Dial Kompas Berputar dengan Arah Angin */}
            <div
              className="absolute inset-2 rounded-full bg-[#0f172a] flex items-center justify-center pointer-events-none"
              style={{
                transform: `rotate(${-continuousHeading}deg)`,
                willChange: 'transform'
              }}
            >
              {/* Garis / Ticks Lingkaran Kompas */}
              <div className="absolute inset-6 rounded-full border border-dashed border-white/20" />
              <div className="absolute inset-12 rounded-full border border-white/10" />

              {/* Ticks Derajat (Setiap 15 Derajat) */}
              {Array.from({ length: 24 }).map((_, i) => {
                const deg = i * 15;
                const isMajor = deg % 45 === 0;
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-start justify-center pointer-events-none"
                    style={{ transform: `rotate(${deg}deg)` }}
                  >
                    <div
                      className={`w-0.5 rounded-full ${
                        isMajor ? 'h-3 bg-white/40' : 'h-1.5 bg-white/20'
                      }`}
                    />
                  </div>
                );
              })}

              {/* 8 Arah Mata Angin (U, TL, T, TG, S, BD, B, BL) */}
              {[
                { label: 'U', deg: 0, color: 'text-rose-500 font-black' },
                { label: 'TL', deg: 45, color: 'text-slate-400 font-bold' },
                { label: 'T', deg: 90, color: 'text-slate-300 font-black' },
                { label: 'TG', deg: 135, color: 'text-slate-400 font-bold' },
                { label: 'S', deg: 180, color: 'text-slate-300 font-black' },
                { label: 'BD', deg: 225, color: 'text-slate-400 font-bold' },
                { label: 'B', deg: 270, color: 'text-slate-300 font-black' },
                { label: 'BL', deg: 315, color: 'text-slate-400 font-bold' }
              ].map((pt) => (
                <div
                  key={pt.label}
                  className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none"
                  style={{ transform: `rotate(${pt.deg}deg)` }}
                >
                  <div className="flex flex-col items-center pt-2">
                    <span className={`text-[11px] font-mono leading-none ${pt.color}`}>
                      {pt.label}
                    </span>
                    {pt.deg % 90 === 0 && (
                      <span className="text-[8px] text-slate-500 font-mono scale-90">
                        {pt.deg}°
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Penanda Gambar Ka'bah di Arah Kiblat */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none z-10"
                style={{ transform: `rotate(${targetQibla}deg)` }}
              >
                <div className="flex flex-col items-center -mt-3.5 sm:-mt-4">
                  {/* Ilustrasi 3D Ka'bah */}
                  <div className={`transition-all duration-300 ${
                    isFacingQibla ? 'scale-125 filter drop-shadow-[0_0_15px_#10b981]' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                  }`}>
                    <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="kbRoof" x1="24" y1="4" x2="24" y2="18" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#475569" />
                          <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                        <linearGradient id="kbLeft" x1="8" y1="14" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="kbRight" x1="24" y1="14" x2="40" y2="38" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#0f172a" />
                          <stop offset="100%" stopColor="#020617" />
                        </linearGradient>
                        <linearGradient id="kbGold" x1="8" y1="18" x2="40" y2="18" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#fef08a" />
                          <stop offset="50%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#ca8a04" />
                        </linearGradient>
                      </defs>
                      {/* Atap Ka'bah */}
                      <polygon points="24,4 40,12 24,20 8,12" fill="url(#kbRoof)" stroke="#64748b" strokeWidth="0.8" />
                      {/* Dinding Kiri */}
                      <polygon points="8,12 24,20 24,40 8,32" fill="url(#kbLeft)" stroke="#334155" strokeWidth="0.5" />
                      {/* Dinding Kanan */}
                      <polygon points="40,12 24,20 24,40 40,32" fill="url(#kbRight)" stroke="#1e293b" strokeWidth="0.5" />
                      {/* Sabuk Kiswah Emas */}
                      <polygon points="8,16.5 24,24.5 24,27 8,19" fill="url(#kbGold)" />
                      <polygon points="40,16.5 24,24.5 24,27 40,19" fill="url(#kbGold)" />
                      {/* Pintu Ka'bah (Bab ar-Rahman) */}
                      <polygon points="27,24.5 34,21 34,32 27,35.5" fill="url(#kbGold)" opacity="0.95" />
                    </svg>
                  </div>

                  {/* Label Penanda Kiblat */}
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md border tracking-wider -mt-0.5 transition-colors ${
                    isFacingQibla
                      ? 'bg-emerald-500 text-white border-emerald-300 shadow-[0_0_12px_#10b981]'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-300'
                  }`}>
                    KIBLAT {Math.round(targetQibla)}°
                  </span>
                </div>
              </div>
            </div>

            {/* Titik Poros Tengah dengan Waterpass */}
            <div
              title={isLevel ? "Posisi HP Mendatar" : "Miring: Letakkan HP mendatar di telapak tangan"}
              className={`relative w-11 h-11 rounded-full border-2 shadow-xl z-30 flex items-center justify-center transition-colors ${
                isLevel
                  ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'border-amber-400/80 bg-[#141f2b]/95 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Garis Bidik */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-white/20" />
                <div className="h-full w-[1px] bg-white/20 absolute" />
              </div>

              {/* Lingkaran Target Tengah */}
              <div className={`w-4 h-4 rounded-full border border-dashed transition-colors ${
                isLevel ? 'border-emerald-400' : 'border-amber-400/50'
              }`} />

              {/* Gelembung Waterpass */}
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

          {/* Kartu Derajat Proporsional & Lega */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-lg text-center pt-2">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 min-w-0 shadow-xs">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-500 block tracking-wider leading-tight">
                Arah Kiblat
              </span>
              <span className="text-base sm:text-lg font-black text-amber-700 font-mono block">
                {selectedCityId === 'makkah' && customQibla === null ? 'Pusat' : `${Math.round(targetQibla)}°`}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium leading-tight">
                {selectedCityId === 'makkah' && customQibla === null
                  ? 'Baitullah Makkah'
                  : selectedCityId === 'madinah' && customQibla === null
                  ? 'Selatan (S)'
                  : 'Barat Laut (BL)'}
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 min-w-0 shadow-xs">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-500 block tracking-wider leading-tight">
                Arah Ponsel
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">
                {Math.round(currentHeading)}°
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium leading-tight">
                Derajat Hadap
              </span>
            </div>

            <div className={`p-3 sm:p-3.5 rounded-2xl border space-y-1.5 transition-colors min-w-0 shadow-xs ${
              isFacingQibla
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                : 'bg-slate-50 border-slate-200/90 text-amber-700'
            }`}>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-500 block tracking-wider leading-tight">
                Selisih Sudut
              </span>
              <span className="text-base sm:text-lg font-black font-mono block">
                {selectedCityId === 'makkah' && customQibla === null ? '0°' : `${Math.abs(Math.round(diffAngle))}°`}
              </span>
              <span className="text-[10px] sm:text-[11px] block font-bold leading-tight">
                {selectedCityId === 'makkah' && customQibla === null
                  ? 'Di Tanah Suci'
                  : isFacingQibla
                  ? 'TEPAT KIBLAT'
                  : `${Math.abs(Math.round(diffAngle))}° ke Ka'bah`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Panduan Kalibrasi Sensor Angka 8 (Standar MyQuran) */}
      {showCalibrationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Panduan Kalibrasi Angka 8
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
