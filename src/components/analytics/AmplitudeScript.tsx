'use client';

import Script from 'next/script';

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

export function AmplitudeScript() {
  return (
    <>
      <Script
        src="https://cdn.eu.amplitude.com/script/f8fcec71340528bf123a031c2f640f4a.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize Amplitude after the script is loaded
          if (typeof window !== 'undefined' && window.amplitude) {
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
            window.amplitude.init('f8fcec71340528bf123a031c2f640f4a', {
              fetchRemoteConfig: true,
              serverZone: 'EU',
              autocapture: true
            });
          }
        }}
      />
    </>
  );
} 