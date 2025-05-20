import { IoLockClosedOutline } from "react-icons/io5";

const TermsAndPrivacyHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 px-4 py-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="bg-primaryL px-4 sm:px-6 py-4 sm:py-5 rounded-2xl flex justify-center items-center">
          <IoLockClosedOutline size={32} className="text-black sm:w-10 sm:h-10 w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-grayscale600">
            Privacy matters
          </h3>
          <p className="text-gray500 text-base sm:text-lg font-medium ">
            Your data is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacyHeader;
