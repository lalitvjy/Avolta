import { useTermsModalStore } from "@/store/useTermsModal";
import { IoLockClosedOutline } from "react-icons/io5";
// import { MdClose } from "react-icons/md";
const TermsAndPrivacyHeader = () => {
  const { closeTermsModal } = useTermsModalStore();
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="bg-primaryL  px-6 py-5 rounded-2xl h-6 flex justify-center items-center">
          <IoLockClosedOutline size={40} className="text-black" />
        </div>
        <div>
          <h3 className="text-4xl font-bold  text-grayscale600">
            Privacy Matters
          </h3>
          <p className="text-gray500 text-base font-medium ">
            Your data is safe with us.
          </p>
        </div>
      </div>
      <button
        onClick={closeTermsModal}
        className=" absolute right-0 top-[-130px]  bg-black rounded-full p-4 shadow-lg"
      >
        {/* <MdClose size={48} className="text-white" /> */}
      </button>
    </div>
  );
};

export default TermsAndPrivacyHeader;
