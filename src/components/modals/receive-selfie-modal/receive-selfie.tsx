import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
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
        className="fixed inset-0 flex items-center justify-center pt-10 pb-40 px-10"
      >
        <button
          className="absolute bottom-10 p-3 rounded-full bg-grayscale600"
          onClick={closeReceiveSelfieModal}
        >
          <RxCross2 className="text-white" size={30} />
        </button>
        <TransitionChild
          enter="transition-transform duration-500"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <DialogPanel className="bg-white w-full h-full flex flex-col justify-between     rounded-40px shadow-lg overflow-hidden ">
            <div className="bg-primaryAvolta h-[70vh] rounded-b-40px relative flex flex-col items-center justify-center">
              <p className="font-bold text-5xl text-center text-white pt-20">
                Your style
              </p>
              <p className="text-center text-white text-base pt-4 ">
                Lorem ipsum simply dummy text
              </p>

              <div className="flex items-center justify-center flex-grow">
                <ReceiveSelfieSlider />
              </div>
            </div>

            <div className=" px-20 pt-7">
              <p className="text-center font-bold text-xl  text-gray600">
                Receive your style on your mobile via QR code / Email
              </p>
              <SelfieModalFooter />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default ReceiveSelfie;
