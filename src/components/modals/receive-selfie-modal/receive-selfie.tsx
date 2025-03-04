import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Mainimage from "../../../../public/image 3.jpg";
import SelfieModalFooter from "./selfie-modal-footer/selfie-modal-footer";
const ReceiveSelfie = () => {
  const { isReceiveSelfieModalOpen, closeReceiveSelfieModal } =
    useReceiveSelfieModalStore();
  return (
    <Transition show={isReceiveSelfieModalOpen}>
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
          <DialogPanel className="bg-white w-full h-full      rounded-40px shadow-lg overflow-hidden ">
            <div className="bg-primaryAvolta h-[50vh] rounded-b-40px relative flex flex-col items-center">
              <p className="font-bold text-3xl text-center text-white pt-10">
                Your style
              </p>
              <p className="text-center text-white text-sm pb-10">
                Lorem ipsum simply dummy text
              </p>
              <Image
                src={Mainimage}
                alt="main image"
                width={250}
                height={300}
                className="rounded-40px"
              />
            </div>
            <div className=" px-20 pt-16">
              <p className="text-center font-bold text-xl leading-7 mb-4">
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
