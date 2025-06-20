"use client";
import { useTermsModalStore } from "@/store/useTermsModal";
import { useUserInfo } from "@/store/useUserInfo";
import { logAgreementAccepted } from "@/utils/analytics";
import { useRouter } from "next/navigation";
import Button from "../../../button/button";
const TermsAndPrivacyFooter = () => {
  const router = useRouter();
  const { closeTermsModal } = useTermsModalStore();

  const { isChecked, setIsChecked } = useUserInfo();
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
        <label htmlFor="terms-checkbox" className="text-xl text-gray600 ">
          By continuing, you agree to our brand program.
        </label>
      </div>
      <Button
        label="Accept and proceed"
        rounded
        variant={`${isChecked ? "secondary" : "disable"}`}
        className="w-full font-bold text-3xl py-10"
        onClick={() => {
          if (isChecked) {
            logAgreementAccepted();
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
