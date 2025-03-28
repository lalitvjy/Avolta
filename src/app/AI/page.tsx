/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/button/button";
import UserInfo from "@/components/modals/user-info/user-info";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import { useUserInfo } from "@/store/useUserInfo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuScanFace } from "react-icons/lu";
const Ai = () => {
  const { selfie } = useTakeSelfieStore();
  const { openUserModal } = useUserInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      openUserModal();
      setLoading(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [openUserModal]);

  return (
    <div className="bg-white h-screen w-full flex flex-col justify-between items-center p-16">
      <p className="text-center font-bold text-4xl text-grayscale600 left-10">
        Finding Your Match
      </p>
      <p className="text-center font-bold text-2xl text-grayscale600 left-10">
        Our Ai is analyzing your face fro the perfect fit.
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
      <UserInfo />
    </div>
  );
};

export default Ai;
