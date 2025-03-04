"use client";
import Image from "next/image";
import MainImage from "../../public/image 1.png";
import Button from "../components/button/button";
import TermsAndPrivacy from "../components/modals/terms-and-privacy/terms-and-privacy";
import { useTermsModalStore } from "../store/useTermsModal";

export default function Home() {
  const { openTermsModal } = useTermsModalStore();

  return (
    <div className="h-screen w-full bg-primaryAvolta flex flex-col items-center justify-center ">
      <p className=" text-white text-center font-bold text-5xl mb-9">
        Club Avolta
      </p>

      <div className="relative w-full max-w-[700px] h-[80vh] bg-black rounded-3xl overflow-hidden">
        <Image
          src={MainImage}
          alt="Main image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center text-white w-full px-6">
          <p className="font-bold text-3xl">Step into the World of Style!</p>
          <p className="font-medium text-sm mt-2">
            Find sunglasses that fit your vibe perfectly.
          </p>

          <Button
            onClick={openTermsModal}
            label="Get Started!"
            rounded
            variant="secondary"
            className="mt-4 w-auto"
          />
        </div>
      </div>

      <TermsAndPrivacy />
    </div>
  );
}
