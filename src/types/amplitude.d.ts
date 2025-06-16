// Define types for Amplitude
interface AmplitudePlugin {
  name: string;
  setup: () => void;
}

interface AmplitudeOptions {
  fetchRemoteConfig?: boolean;
  serverZone?: 'EU' | 'US';
  autocapture?: boolean;
}

// Add type declarations for Amplitude
declare global {
  interface Window {
    amplitude: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
      add: (plugin: AmplitudePlugin) => void;
      init: (apiKey: string, options?: AmplitudeOptions) => void;
    };
    sessionReplay: {
      plugin: (options: { sampleRate: number }) => AmplitudePlugin;
    };
  }
} 