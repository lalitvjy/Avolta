"use client";
import * as deepar from "deepar";
import { useEffect, useRef } from "react";

interface DeepArCanvasProps {
  activeTab: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DeepARCanvas = ({
  activeTab,
  isLoading,
  setIsLoading,
}: DeepArCanvasProps) => {
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const instanceRef = useRef<deepar.DeepAR | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeDeepAR = async () => {
      try {
        if (!previewRef.current) {
          console.error("Canvas not found!");
          return;
        }
        setIsLoading(true);
        instanceRef.current = await deepar.initialize({
          licenseKey:
            "afb812e0fdfd1a60225657be0339502bd5d2b06735593f1f8e6e3adcd619b5a8fa72a963db0200a6",
          canvas: previewRef.current,
          effect: "https://cdn.jsdelivr.net/npm/deepar/effects/aviators",
        });

        await instanceRef.current.startCamera();

        const deepARCanvas = instanceRef.current.getCanvas();
        if (deepARCanvas && previewRef.current?.parentElement) {
          const containerWidth = previewRef.current.parentElement.clientWidth;
          const containerHeight = previewRef.current.parentElement.clientHeight;
          deepARCanvas.width = containerWidth;
          deepARCanvas.height = containerHeight;
        }

        instanceRef.current.setZoom(0.8);
        setIsLoading(instanceRef.current.isSegmentationInitialized());
      } catch (error) {
        console.error("DeepAR initialization failed:", error);
      }
    };

    if (activeTab === "Live") {
      initializeDeepAR();
    } else {
      instanceRef.current?.shutdown();
      instanceRef.current = null;
    }

    return () => {
      instanceRef.current?.shutdown();
      instanceRef.current = null;
    };
  }, [activeTab, setIsLoading]);

  return (
    <canvas
      ref={previewRef}
      className={`rounded-56px w-full h-full object-cover ${
        isLoading ? "opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
    />
  );
};

export default DeepARCanvas;
