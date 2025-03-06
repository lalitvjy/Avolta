"use client";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuScanFace } from "react-icons/lu";
import Button from "../../components/button/button";

const Ai = () => {
  const router = useRouter();
  const { selfie } = useTakeSelfieStore();
  const handelAiButtonClick = () => {
    router.push("avolta");
  };

  return (
    <div className="bg-gradient-avolta h-screen w-full flex flex-col justify-between items-center p-16">
      <p className="text-center font-bold text-4xl text-grayscale600 left-10">
        Hang tight! We&apos;re letting our AI work <br /> its magic on your
        photo.
      </p>

      <div className="w-full h-full relative flex items-center justify-center mt-12 mb-16">
        {selfie ? (
          <Image
            src={selfie}
            alt="Main image"
            layout="fill"
            objectFit="cover"
            className="rounded-56px"
          />
        ) : (
          <div className="w-full h-full bg-black rounded-56px"></div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          label="Ai Scanning..."
          rounded
          onClick={handelAiButtonClick}
          className="font-bold py-6 px-16 text-2xl"
          leftIcon={<LuScanFace />}
        />
      </div>
    </div>
  );
};

export default Ai;
