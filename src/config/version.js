/**
 * Single source of truth for Kanomas Application Build Version
 */
export const APP_BUILD_VERSION = '2026.1.3';
export const APP_BUILD_CODE = 2027;
export const APP_RELEASE_DATE = '28 September 2026';

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
