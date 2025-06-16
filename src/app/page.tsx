"use client";
import Image from "next/image";
import Banner from "../../public/club_avolta_banner_e2e_black.png";
import MainImage from "../../public/image 1.png";
import Button from "../components/button/button";
import TermsAndPrivacy from "../components/modals/terms-and-privacy/terms-and-privacy";
import { useTermsModalStore } from "../store/useTermsModal";

// Add type declaration for window.amplitude
declare global {
  interface Window {
    amplitude: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export default function Home() {
  const { openTermsModal } = useTermsModalStore();

  const handleGetStarted = () => {
    // Open terms modal
    openTermsModal();
    
    // Track event using window.amplitude
    if (typeof window !== 'undefined' && window.amplitude) {
      window.amplitude.track('get_started', {
        button_location: 'hero',
        button_text: 'Get Started'
      });
    }
  };

  return (
    <div className="relative w-full h-[100vh] bg-white overflow-hidden">
      <Image src={MainImage} alt="Main image" fill className="object-cover " />

      <div className="absolute bottom-100 left-0 w-full h-[30%] bg-gradient-main-img z-20"></div>

      <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center text-white w-full px-[60px] z-30">
        <p className="font-bold text-8xl  pb-10">
          Step into the World of Style!
        </p>
        <p className="font-bold text-3xl mt-2 pb-10">
          Find sunglasses that fit your vibe perfectly
        </p>

        <Button
          onClick={handleGetStarted}
          label="Get started"
          rounded
          variant="secondary"
          className="w-auto px-5 py-4 text-2xl font-bold "
        />
      </div>
      <div className="absolute bottom-0   h-[10vh]  z-10 flex justify-center items-start ">
        <Image
          src={Banner}
          alt="Banner"
          className="object-contain w-screen"
          priority
        />
      </div>
      <TermsAndPrivacy />
    </div>
  );
}
