import { useEmailModalStore } from "@/store/useEmailModal";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Banner from "../../../../public/banner.png";
import Mainimage from "../../../../public/image 3.jpg";
import EmailModalFooter from "./email-modal-footer.tsx/email-modal-footer";
import Product from "./product/product";
const EmailModal = () => {
  const { isEmailModalOpen, closeEmailModal } = useEmailModalStore();
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <Transition show={isEmailModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeEmailModal}
        className="fixed inset-0 flex items-center justify-center pt-10 pb-40 px-10"
      >
        <button
          className="absolute bottom-10 p-3 rounded-full bg-grayscale600"
          onClick={closeEmailModal}
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
          <DialogPanel className="bg-white w-full h-full   flex flex-col justify-between   rounded-40px shadow-lg overflow-hidden ">
            <div className="bg-primaryL2 h-[55vh] rounded-b-40px relative">
              <p className="font-bold text-5xl text-center text-gray-900 pt-10">
                Email your look!
              </p>
              <p className="text-center text-gray-700 text-2xl pt-4">
              Get the vibe right with your fave sunnies!
              </p>
            </div>
            <div
              className={` absolute w-[55vh]  h-[45vh]  bg-white shadow-md left-1/2 -translate-x-1/2 top-56 rounded-40px flex justify-center `}
            >
              {selectedGlasses?.triedOnUrl ? (
                <Image
                  src={selectedGlasses.triedOnUrl}
                  alt="22"
                  width={400}
                  height={340}
                  className="absolute top-[-25px] w-[44vh] h-[40vh] rounded-56px"
                />
              ) : (
                <Image
                  src={Mainimage}
                  alt="22"
                  className="absolute top-[-25px] w-[30vh] h-[42vh] rounded-56px"
                />
              )}

              <div className={`absolute flex-1 self-end pb-4  w-[46vh]`}>
                <Product />
              </div>
            </div>
            <div className=" px-24 pb-40 ">
              <EmailModalFooter />
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

export default EmailModal;
