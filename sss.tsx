"use client";
import UserInfo from "@/components/modals/user-info/user-info";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import { useUserInfo } from "@/store/useUserInfo";
import * as deepar from "deepar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoCameraOutline, IoFlashSharp } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import Button from "../../components/button/button";
const TakeSelfie = () => {
  const { setSelfie, selfie } = useTakeSelfieStore();
  const { openUserModal } = useUserInfo();
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const [deepARInstance, setDeepARInstance] = useState<deepar.DeepAR | null>(
    null
  );

  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        if (!previewRef.current) {
          console.error("Canvas not found!");
          return;
        }
        console.log("Initializing DeepAR...");
        const instance = await deepar.initialize({
          licenseKey:
            "afb812e0fdfd1a60225657be0339502bd5d2b06735593f1f8e6e3adcd619b5a8fa72a963db0200a6",

          canvas: previewRef.current,
          // effect: "https://cdn.jsdelivr.net/npm/deepar/effects/aviators",
        });
        setDeepARInstance(instance);
        console.log(instance);
        await instance.startCamera();
      } catch (error) {
        console.error("DeepAR initialization failed:", error);
      }
    };

    initializeDeepAR();
  }, []);
  const handleTakeSelfie = async () => {
    if (!deepARInstance) return;

    try {
      const image = await deepARInstance.takeScreenshot();
      setSelfie(image);

      deepARInstance.setPaused(true);
    } catch (error) {
      console.error("Failed to take selfie:", error);
    }
  };

  const handelRetakeSelfie = async () => {
    setSelfie("");

    if (deepARInstance) {
      console.log("Resuming camera...");
      deepARInstance.setPaused(false);
    }
  };
  const handelOpenUserModal = () => {
    openUserModal();
  };

  return (
    <div className=" bg-gradient-avolta h-screen w-full flex flex-col justify-between p-14  font-bold text-center text-grayscale600">
      {selfie ? (
        <div>
          <p className=" text-4xl  left-10">Preview Your Style</p>
          <p className="font-medium text-base pt-4">
            Our AI is analyzing your face for the perfect fit.
          </p>
        </div>
      ) : (
        <div>
          <p className=" text-4xl  ">Say Cheese!</p>
          <p className="font-medium text-base pt-4">
            Our AI is analyzing your face for the perfect fit.
          </p>
        </div>
      )}

      <div className="  flex justify-center overflow-hidden   ">
        {selfie ? (
          <div className="relative w-full h-screen flex justify-center items-center overflow-hidden rounded-56px pt-14 pb-[380px]">
            <Image
              src={selfie}
              alt="Selfie Preview"
              width={1600}
              height={2560}
              className="w-full h-full rounded-56px"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full  ">
            <canvas
              ref={previewRef}
              id="ar-screen"
              className="w-full h-full rounded-56px object-cover"
            />
          </div>
        )}
      </div>

      {selfie ? (
        <div className="flex justify-between ">
          <div className="flex flex-col gap-2">
            <Button
              label="Retake a selfie"
              leftIcon={<LuRefreshCw size={24} />}
              rounded
              onClick={handelRetakeSelfie}
              className="font-bold py-6 px-8 text-black"
            />
            <p className="text-white text-sm text-center ">
              Not satisfied? try again.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              label="Looks Great! Continue"
              leftIcon={<IoFlashSharp size={24} />}
              rounded
              onClick={handelOpenUserModal}
              className="font-bold  py-6 px-8 text-black"
            />
            <p className="text-white text-sm text-center ">
              Move ahead with this stylish choice.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center ">
          <Button
            label="Take a Selfie"
            rounded
            onClick={handleTakeSelfie}
            className="font-bold text-black py-6 px-[70px]"
            leftIcon={<IoCameraOutline size={24} />}
          />
        </div>
      )}

      <UserInfo />
    </div>
  );
};

export default TakeSelfie;
