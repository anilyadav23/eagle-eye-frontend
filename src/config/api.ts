// Centralized API and WebSocket URL configuration for Eagle Eye - Smart Class Attendance & Activity Intelligence
// Works seamlessly on localhost, Local Area Network (Wi-Fi), and public internet tunnels.

export const getApiBase = (): string => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // If running on a static remote host (e.g. Netlify), connect directly to the live cloud backend tunnel
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    return 'https://hans-quick-once-stock.trycloudflare.com';
  }
  return '';
};

export const getWsUrl = (): string => {
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    return 'wss://hans-quick-once-stock.trycloudflare.com/ws';
  }
  const isHttps = window.location.protocol === 'https:';
  const wsProtocol = isHttps ? 'wss:' : 'ws:';
  return `${wsProtocol}//${window.location.host}/ws`;
};

export const getCameraLiveStreamUrl = (cameraId: string, key?: number | string): string => {
  const base = getApiBase();
  const query = key !== undefined ? `?t=${key}` : '';
  return `${base}/api/cameras/${encodeURIComponent(cameraId)}/live-feed${query}`;
};

export const getCameraCaptureUrl = (cameraId: string): string => {
  const base = getApiBase();
  return `${base}/api/cameras/${encodeURIComponent(cameraId)}/capture-person`;
};
