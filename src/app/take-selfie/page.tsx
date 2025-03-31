"use client";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import { useUserInfo } from "@/store/useUserInfo";
import { resetUserFlow } from "@/utils/resetUserFlow";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoCameraOutline, IoFlashSharp } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import Button from "../../components/button/button";
const TakeSelfie = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { setSelfie, selfie } = useTakeSelfieStore();
  const { isChecked } = useUserInfo();
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const captureSelfie = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const imageData = canvasRef.current.toDataURL("image/png");
    setSelfie(imageData);
    stopCamera();
  };

  useEffect(() => {
    startCamera();
  }, []);

  const handelRetakeSelfie = () => {
    setSelfie("");
    startCamera();
  };
  const handelNavigateAIpage = () => {
    router.push("/AI");
  };
  const handelBackToHomePage = () => {
    router.push("/");
    resetUserFlow();
  };
  if (!isChecked) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-avolta text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          Terms Not Accepted
        </h1>
        <p className="text-white text-lg max-w-xl mb-10">
          You need to accept the Terms and Conditions before proceeding to take
          a selfie. Please return and review them to continue.
        </p>
        <Button
          variant="secondary"
          label="Go to Terms & Conditions"
          onClick={handelBackToHomePage}
          rounded
          className="px-10 py-6 text-xl font-bold"
        />
      </div>
    );
  }
  return (
    <div className=" bg-white h-screen  w-full flex flex-col justify-between p-14  font-bold text-center text-grayscale600">
      {selfie ? (
        <div>
          <p className="  text-[60px]   ">Preview Your Style</p>
          <p className="font-medium text-3xl pt-4">
            Review your look before moving forward
          </p>
        </div>
      ) : (
        <div>
          <p className=" text-[60px] ">Say Cheese!</p>
          <p className="font-medium text-3xl pt-4">
            Capture you best look for better results.
          </p>
        </div>
      )}

      <div className="flex justify-center h-full  py-[55px] ">
        {selfie ? (
          <div className="w-full h-full relative flex items-center justify-center">
            {selfie && (
              <>
                <Image
                  src={selfie}
                  alt="Main image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-60px"
                />
              </>
            )}
          </div>
        ) : (
          <div className="relative flex flex-col justify-center items-center w-full flex-grow">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full rounded-60px object-cover"
            />

            <div className="absolute z-10 w-[40vh] h-[45vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 border-t-8 border-r-8 border-white " />
              <div className="absolute bottom-0 left-0 w-80 h-80 border-b-8 border-l-8 border-white " />
            </div>

            <canvas ref={canvasRef} className="hidden" />
            <p className="text-3xl pt-4">
              For optimal results, keep your face centered within the guidelines
              and remove any glasses.
            </p>
          </div>
        )}
      </div>

      {selfie ? (
        <div className="flex justify-between ">
          <div className="flex flex-col gap-2">
            <Button
              label="Retake a selfie"
              leftIcon={<LuRefreshCw size={40} />}
              rounded
              onClick={handelRetakeSelfie}
              variant="secondary"
              className="font-bold  text-black py-12 px-12 text-4xl"
            />
            <p className="text-black text-2xl text-center ">
              Not satisfied? try again.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              label="Looks Great! Continue"
              leftIcon={<IoFlashSharp size={40} />}
              rounded
              variant="secondary"
              onClick={handelNavigateAIpage}
              className="font-bold   text-black py-12 px-12 text-4xl"
            />
            <p className="text-black text-2xl text-center ">
              Move ahead with this stylish choice.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center ">
          <Button
            label="Take a Selfie"
            rounded
            onClick={captureSelfie}
            variant="secondary"
            className="font-bold text-black py-12 px-12 text-4xl"
            leftIcon={<IoCameraOutline size={48} />}
          />
        </div>
      )}
    </div>
  );
};

export default TakeSelfie;
