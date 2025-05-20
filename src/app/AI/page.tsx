/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/button/button";
import UserInfo from "@/components/modals/user-info/user-info";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import { useUserInfo } from "@/store/useUserInfo";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LuScanFace } from "react-icons/lu";
const Ai = () => {
  const { selfie } = useTakeSelfieStore();
  const { openUserModal } = useUserInfo();
  const [loading, setLoading] = useState(true);
  const sendSelfieToAI = useCallback(async () => {
    if (!selfie) return;
    setLoading(true);

    try {
      const blob = await (await fetch(selfie)).blob();
      const file = new File([blob], "selfie.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("face", file);

      const res = await fetch("/api/process-glasses", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to process image");
      }

      const { uuid, recommendations, face_analysis } = result.data;

      useRecommendetGlassStore.getState().setGlassesData({
        uuid,
        recommendations,
        faceShape: face_analysis?.face_shape || "",
      });
    } catch (err) {
      console.error("Error processing AI selfie:", err);
    } finally {
      setLoading(false);
      openUserModal();
    }
  }, [selfie, openUserModal]);

  useEffect(() => {
    sendSelfieToAI();
  }, [sendSelfieToAI]);

  return (
    <div className="bg-white h-screen w-full flex flex-col justify-between items-center p-16">
      <p className="text-center font-bold text-[60px] text-grayscale600 left-10">
        Finding Your Match
      </p>
      <p className="text-center font-bold text-3xl text-grayscale600 left-10">
        Our AI is analyzing your face for the perfect fit
      </p>

      <div className="w-full h-full relative flex items-center justify-center mt-12 mb-16">
        {selfie && (
          <Image
            src={selfie}
            alt="Selfie Image"
            layout="fill"
            objectFit="cover"
            className="rounded-56px"
          />
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <img
              src="/spinner.gif"
              alt="Loading"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      <Button
        variant="secondary"
        label="    Processing..."
        rounded
        leftIcon={<LuScanFace size={48} />}
        className="font-bold   text-black py-12 px-12 text-4xl"
      />
      <UserInfo purpose="user-info" buttonlabel='Save and continue' />
    </div>
  );
};

export default Ai;
