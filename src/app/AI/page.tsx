"use client";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuScanFace } from "react-icons/lu";
import Button from "../../components/button/button";

const Ai = () => {
  // const router = useRouter();

  const { selfie } = useTakeSelfieStore();

  const [processedImage, setProcessedImage] = useState<string | null>(null);

  // const handelAiButtonClick = () => {
  //   router.push("avolta");
  // };
  const handleApplyGlasses = async () => {
    if (!selfie) {
      console.error("No selfie available!");
      return;
    }

    const glassesUrl =
      "https://images.shopdutyfree.com/image/upload/c_pad,f_auto,h_1000,w_1000/v1685095787/4001225/4001225_1_en_GB.jpg";

    try {
      const formData = new FormData();

      const byteCharacters = atob(selfie.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const selfieBlob = new Blob([byteArray], { type: "image/png" });

      formData.append("face", selfieBlob, "selfie.png");

      const glassesResponse = await fetch(glassesUrl);
      const glassesBlob = await glassesResponse.blob();
      formData.append("glasses", glassesBlob, "glasses.png");

      const response = await fetch("/api/proxy/apply-glasses", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to apply glasses: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      if (responseData.data && responseData.data.image_url) {
        setProcessedImage(responseData.data.image_url);
      } else {
        throw new Error("No image URL returned from backend");
      }
    } catch (error) {
      console.error("Error applying glasses:", error);
    }
  };

  return (
    <div className="bg-gradient-avolta h-screen w-full flex flex-col justify-between items-center p-16">
      <p className="text-center font-bold text-4xl text-grayscale600 left-10">
        Hang tight! We&apos;re letting our AI work <br /> its magic on your
        photo.
      </p>

      <div className="w-full h-full relative flex items-center justify-center mt-12 mb-16">
        {processedImage ? (
          <img
            src={processedImage}
            alt="Processed Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "56px",
            }}
          />
        ) : selfie ? (
          <Image
            src={selfie}
            alt="Selfie Image"
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
          label="Apply Glasses"
          rounded
          onClick={handleApplyGlasses} // Call function when button is clicked
          className="font-bold py-6 px-16 text-2xl"
          leftIcon={<LuScanFace />}
        />
      </div>
    </div>
  );
};

export default Ai;
