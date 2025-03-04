"use client";
import UserInfo from "@/components/modals/user-info/user-info";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import { useUserInfo } from "@/store/useUserInfo";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoCameraOutline, IoFlashSharp } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import Button from "../../components/button/button";
const TakeSelfie = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { setSelfie, selfie } = useTakeSelfieStore();
  const { openUserModal } = useUserInfo();
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
  const handelOpenUserModal = () => {
    openUserModal();
  };

  return (
    <div className=" bg-gradient-avolta h-screen w-full flex flex-col justify-between pt-14 pb-14 px-14">
      {selfie ? (
        <div className="text-center">
          <p className="font-bold text-4xl text-grayscale600 left-10">
            Preview Your Style
          </p>
          <p className="font-medium text-base leading-5 text-grayscale600">
            Our AI is analyzing your face for the perfect fit.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-bold text-4xl text-grayscale600 left-10">
            Say Cheese!
          </p>
          <p className="font-medium text-base leading-5 text-grayscale600">
            Our AI is analyzing your face for the perfect fit.
          </p>
        </div>
      )}

      <div className=" h-auto  flex justify-center overflow-hidden  ">
        {selfie ? (
          <div className=" rounded-3xl  overflow-hidden  ">
            <Image
              src={selfie}
              alt="Selfie Preview"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className=" rounded-3xl "
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>

      {selfie ? (
        <div className="flex justify-between ">
          <div>
            <Button
              label="Retake a selfie"
              leftIcon={<LuRefreshCw />}
              rounded
              onClick={handelRetakeSelfie}
              className="font-bold py-3 px-8 text-black"
            />
            <p className="text-white text-sm text-center ">
              Not satisfied? try again.
            </p>
          </div>
          <div>
            <Button
              label="Looks Great! Continue"
              leftIcon={<IoFlashSharp />}
              rounded
              onClick={handelOpenUserModal}
              className="font-bold  py-3 px-8 text-black"
            />
            <p className="text-white text-sm text-center">
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
            className="font-bold text-black"
            leftIcon={<IoCameraOutline />}
          />
        </div>
      )}

      <UserInfo />
    </div>
  );
};

export default TakeSelfie;
