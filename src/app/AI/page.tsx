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
    <div className=" bg-gradient-avolta h-screen w-full flex flex-col justify-between items-center pt-14 pb-8 px-14">
      <div className="text-center">
        <p className="font-bold text-4xl text-grayscale600 left-10">
          Hang tight! We&apos;re letting our AI work its magic on your photo.
        </p>
      </div>
      <div>
        {selfie ? (
          <Image
            src={selfie}
            alt="Main image"
            width={700}
            height={900}
            objectFit="cover"
            className="rounded-3xl"
          />
        ) : (
          <div className=" w-full max-w-[700px] h-[80vh] bg-black rounded-3xl overflow-hidden"></div>
        )}
      </div>
      <div className="flex justify-center ">
        <Button
          label="Ai Scanning..."
          rounded
          onClick={handelAiButtonClick}
          className="font-bold"
          leftIcon={<LuScanFace />}
        />
      </div>
    </div>
  );
};

export default Ai;
