import { Capacitor, CapacitorHttp } from '@capacitor/core';

/**
 * Single source of truth for Kanomas Application Build Version
 */
export const APP_BUILD_VERSION = '2026.2.1';
export const APP_BUILD_CODE = 2032;
export const APP_RELEASE_DATE = '29 September 2026';

/**
 * Compare two semver-like version strings (e.g., '2026.1.3' vs '2026.1.1').
 * Returns true if remoteVer is strictly newer than localVer.
 */
export function isRemoteVersionNewer(remoteVer, localVer = APP_BUILD_VERSION) {
  if (!remoteVer || !localVer) return false;
  if (remoteVer === localVer) return false;

  const clean = (v) => String(v).replace(/^v/i, '').split('.').map((n) => parseInt(n, 10) || 0);
  const rParts = clean(remoteVer);
  const lParts = clean(localVer);
  const maxLen = Math.max(rParts.length, lParts.length);

  for (let i = 0; i < maxLen; i++) {
    const r = rParts[i] || 0;
    const l = lParts[i] || 0;
    if (r > l) return true;
    if (r < l) return false;
  }
  return false;
}

/**
 * Robust version checker supporting Native Capacitor (CORS-free) and Web
 */
export async function fetchRemoteVersionInfo() {
  const remoteUrl = `https://appkanomas.mediasosial.net/version.json?t=${Date.now()}`;

  // 1. Jika native Android / iOS, gunakan CapacitorHttp (Bypass CORS WebView sepenuhnya)
  if (Capacitor.isNativePlatform()) {
    try {
      const res = await CapacitorHttp.get({
        url: remoteUrl,
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      if (res && res.data) {
        return typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
      }
    } catch (e) {
      console.warn('CapacitorHttp native fetch error, trying web fetch fallback:', e);
    }
  }

  // 2. Fetch browser standard
  try {
    const res = await fetch(remoteUrl, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Remote fetch error, trying local version:', e);
  }

  // 3. Fallback lokal
  try {
    const localRes = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (localRes.ok) return await localRes.json();
  } catch {}

  return null;
}
