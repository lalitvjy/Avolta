'use client';

import Script from 'next/script';

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