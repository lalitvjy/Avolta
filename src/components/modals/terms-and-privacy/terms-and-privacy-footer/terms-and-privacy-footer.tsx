"use client";
import { useTermsModalStore } from "@/store/useTermsModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../../button/button";

const TermsAndPrivacyFooter = () => {
  const router = useRouter();
  const { closeTermsModal } = useTermsModalStore();

  const [isChecked, setIsChecked] = useState(false);
  const handelNavigateTakeSelfie = () => {
    router.push("take-selfie");
  };
  return (
    <>
      <div className="flex items-center gap-2  py-6 ">
        <input
          id="terms-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-5 h-5  cursor-pointer"
        />
        <label htmlFor="terms-checkbox" className="text-base ">
          By continuing, you agree to our brand program, lorem ipsum simply
          dummy text.
        </label>
      </div>
      <Button
        label="Accept and Proceed with Confidence"
        rounded
        variant={`${isChecked ? "secondary" : "disable"}`}
        className="w-full font-bold text-lg py-6"
        onClick={() => {
          if (isChecked) {
            closeTermsModal();
            setTimeout(() => {
              handelNavigateTakeSelfie();
            }, 300);
          }
        }}
      />
    </>
  );
};

export default TermsAndPrivacyFooter;
