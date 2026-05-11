import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher;

const REVERB_CONFIG = {
  appKey: import.meta.env.VITE_REVERB_APP_KEY || 'local_key',
  host: import.meta.env.VITE_REVERB_HOST || '127.0.0.1',
  port: import.meta.env.VITE_REVERB_PORT || '8080',
};

let echoInstance: Echo | null = null;

export const getEchoInstance = (): Echo => {
  if (!echoInstance) {
    const token = localStorage.getItem('access_token');
    
    echoInstance = new Echo({
      broadcaster: 'reverb',
      key: REVERB_CONFIG.appKey,
      wsHost: REVERB_CONFIG.host,
      wsPort: REVERB_CONFIG.port,
      wssPort: REVERB_CONFIG.port,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    });
  }
  
  return echoInstance;
};

export const disconnectEcho = (): void => {
  if (echoInstance) {
    echoInstance.disconnect();
    echoInstance = null;
  }
};

// Channel names
export const CHANNELS = {
  NOTIFICATIONS: (userId: string) => `notifications.${userId}`,
  LISTING_UPDATES: (listingId: string) => `listing.${listingId}`,
  DASHBOARD_STATS: (userId: string) => `dashboard.${userId}`,
} as const;
