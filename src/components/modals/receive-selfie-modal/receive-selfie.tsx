import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Banner from "../../../../public/banner.png";
import ReceiveSelfieSlider from "./receive-selfie-slider/receive-selfie-slider";
import SelfieModalFooter from "./selfie-modal-footer/selfie-modal-footer";
const ReceiveSelfie = () => {
  const { isReceiveSelfieModalOpen, closeReceiveSelfieModal } =
    useReceiveSelfieModalStore();
  return (
    <Transition show={isReceiveSelfieModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeReceiveSelfieModal}
        className="fixed inset-0 flex items-center justify-center pt-40 pb-10 px-10"
      >
        <button
          className="absolute  right-10 top-10 p-4 rounded-full bg-grayscale600 flex justify-center items-center z-10"
          onClick={closeReceiveSelfieModal}
        >
          <RxCross2 className="text-white" size={48} />
        </button>
        <TransitionChild
          enter="transition-transform duration-500"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <DialogPanel className="bg-white w-full h-full flex flex-col  justify-between    rounded-40px shadow-lg overflow-hidden ">
            <div className=" h-[60vh] rounded-b-40px relative flex flex-col items-center justify-center">
              <div className="flex items-center justify-center pt-20">
                <p className="font-bold text-[48px] text-center text-black ">
                Receive recommendations via QR code or email
                </p>
              </div>

              <div className="flex items-center justify-center flex-grow pl-10 ">
                <ReceiveSelfieSlider />
              </div>
            </div>

            <div>
              {/* <p className="text-center font-bold text-4xl  text-gray600">
                Receive recommendations via QR code or email
              </p> */}
              <SelfieModalFooter />
            </div>
            <Image
              src={Banner}
              alt="Banner"
              className="object-contain w-screen border-none"
              priority
            />
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default ReceiveSelfie;
