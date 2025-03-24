"use client";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { LuScanFace } from "react-icons/lu";

const Ai = () => {
  const router = useRouter();
  const { selfie } = useTakeSelfieStore();
  const [loading, setLoading] = useState(false);

  const sendSelfieToAI = async () => {
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

      router.push("/avolta");
    } catch (err) {
      console.error("Error processing AI selfie:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendSelfieToAI();
  }, [selfie]);

  return (
    <div className="bg-gradient-avolta h-screen w-full flex flex-col justify-between items-center p-16">
      <p className="text-center font-bold text-4xl text-grayscale600 left-10">
        Hang tight! We&apos;re letting our AI work <br /> its magic on your
        photo.
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
      </div>

      <div className="flex justify-center text-grayscale600">
        <div className="bg-white flex items-center rounded-full font-bold py-6 px-16 text-2xl gap-2">
          <LuScanFace size={24} />
          Processing...
          {loading && (
            <Spinner animation="grow" className="bg-primaryAvolta h-10 w-10" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ai;
