// Calculation of Islamic Prayer Times and Qibla Direction
export const CITIES = [
  { id: 'tasikmalaya', name: 'Tasikmalaya', country: 'Indonesia', lat: -7.3274, lng: 108.2207, timezone: 7, qibla: 295.2 },
  { id: 'makkah', name: 'Makkah Al-Mukarramah', country: 'Arab Saudi', lat: 21.4225, lng: 39.8262, timezone: 3, qibla: 0 },
  { id: 'madinah', name: 'Madinah Al-Munawwarah', country: 'Arab Saudi', lat: 24.4672, lng: 39.6111, timezone: 3, qibla: 175.0 },
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 7, qibla: 295.1 },
  { id: 'bandung', name: 'Bandung', country: 'Indonesia', lat: -6.9175, lng: 107.6191, timezone: 7, qibla: 295.3 }
];

// Helper: Format double hours into "HH:MM"
function formatTime(h) {
  const normalized = (h + 24) % 24;
  const hours = Math.floor(normalized);
  const minutes = Math.floor((normalized - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Astronomical calculation for solar position & prayer times
export function calculatePrayerTimes(cityId = 'tasikmalaya', date = new Date()) {
  const city = CITIES.find(c => c.id === cityId) || CITIES[0];
  const { lat, lng, timezone } = city;

  // Day of year calculation
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Approximate solar declination & equation of time
  const B = (2 * Math.PI * (dayOfYear - 81)) / 365;
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // in minutes
  const declination = 23.45 * Math.sin(B) * (Math.PI / 180); // in radians
  const latRad = lat * (Math.PI / 180);

  // Solar noon
  const solarNoon = 12 + (timezone * 15 - lng) / 15 - eot / 60;

  // Hour angles for specific sun altitudes
  const calcHourAngle = (angleDeg) => {
    const angleRad = angleDeg * (Math.PI / 180);
    const cosHA = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(declination)) /
                  (Math.cos(latRad) * Math.cos(declination));
    if (cosHA > 1 || cosHA < -1) return null;
    return Math.acos(cosHA) * (180 / Math.PI) / 15;
  };

  // Sun angles:
  // Fajr: -20° (Kemenag standard)
  // Sunrise: -0.833°
  // Asr: Shadow length = object length + noon shadow
  // Maghrib: -0.833°
  // Isha: -18° (Kemenag standard)
  const fajrHA = calcHourAngle(-20) || 6.2;
  const sunriseHA = calcHourAngle(-0.833) || 6.0;
  
  // Asr shadow angle
  const noonSunAlt = Math.asin(Math.sin(latRad) * Math.sin(declination) + Math.cos(latRad) * Math.cos(declination));
  const asrAlt = Math.atan(1 / (1 + Math.tan(Math.abs(latRad - declination)))) * (180 / Math.PI);
  const asrHA = calcHourAngle(asrAlt) || 3.5;

  const maghribHA = sunriseHA;
  const ishaHA = calcHourAngle(-18) || 6.1;

  const subuh = solarNoon - fajrHA;
  const terbit = solarNoon - sunriseHA;
  const dzuhur = solarNoon + 0.05; // 3 minutes safety margin
  const ashar = solarNoon + asrHA;
  const maghrib = solarNoon + maghribHA;
  const isya = solarNoon + ishaHA;

  const list = [
    { name: 'Subuh', time: formatTime(subuh), raw: subuh },
    { name: 'Terbit', time: formatTime(terbit), raw: terbit },
    { name: 'Dzuhur', time: formatTime(dzuhur), raw: dzuhur },
    { name: 'Ashar', time: formatTime(ashar), raw: ashar },
    { name: 'Maghrib', time: formatTime(maghrib), raw: maghrib },
    { name: 'Isya', time: formatTime(isya), raw: isya }
  ];

  // Determine current and next prayer
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60) + (now.getSeconds() / 3600);

  let nextIndex = list.findIndex(p => p.raw > currentHour);
  if (nextIndex === -1) {
    nextIndex = 0; // Subuh tomorrow
  }
  const nextPrayer = list[nextIndex];

  return {
    city,
    dateStr: date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    prayers: list,
    nextPrayer,
    qiblaDegree: city.qibla
  };
}

// Calculate precise Qibla bearing from any GPS coordinates to Ka'bah (Makkah)
export function calculateQiblaDirection(latitude, longitude) {
  const lat1 = (latitude * Math.PI) / 180;
  const lng1 = (longitude * Math.PI) / 180;
  const lat2 = (21.422487 * Math.PI) / 180; // Ka'bah Latitude: 21° 25' 20.95" N
  const lng2 = (39.826206 * Math.PI) / 180; // Ka'bah Longitude: 39° 49' 34.34" E

  const dLng = lng2 - lng1;
  const y = Math.sin(dLng);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  return Number(((qibla + 360) % 360).toFixed(1));
}
