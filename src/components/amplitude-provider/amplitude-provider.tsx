"use client";

import { initAmplitude } from "@/utils/analytics";
import { useEffect } from "react";

export default function AmplitudeProvider() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return null;
}
