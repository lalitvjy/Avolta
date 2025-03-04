"use client";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useDetailModalStore } from "@/store/useDetailModal";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Button from "../../button/button";

export default function Detail() {
  const { selectedGlasses } = useSelectedGlassesStore();
  const { isDetailModalOpen, closeDetailModal } = useDetailModalStore();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const { width, height } = useWindowDimensions();
  return (
    <Transition show={isDetailModalOpen}>
      <Dialog
        onClose={closeDetailModal}
        className="fixed inset-0 flex flex-col items-center pt-10 pb-40 px-10"
      >
        <button
          className="absolute bottom-10 p-3 rounded-full bg-grayscale600"
          onClick={closeDetailModal}
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
          <DialogPanel className="bg-white w-full h-full flex flex-col justify-between rounded-40px shadow-lg  ">
            <div className="relative   flex justify-center rounded-t-40px ">
              <Image
                src={selectedGlasses?.image ?? ""}
                alt="glasses-image"
                width={width * 0.8}
                height={height * 0.6}
                className="object-contain"
              />
            </div>

            <div className="text-start px-16 pb-16 bg-white rounded-b-40px">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">
                  {selectedGlasses?.name}
                </p>
                <FaRegBookmark size={14} />
              </div>

              <p>{selectedGlasses?.name}</p>
              <p className="font-semibold text-gray-700">
                {selectedGlasses?.price}
              </p>
              <hr className="my-2" />

              <p className="text-xl font-semibold text-gray-700">
                Product Details
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {showFullDetails
                  ? selectedGlasses?.description
                  : `${selectedGlasses?.description.substring(0, 120)}...`}
              </p>

              <button
                onClick={() => setShowFullDetails(!showFullDetails)}
                className="text-sm underline"
              >
                {showFullDetails ? "See Less" : "See More"}
              </button>

              <div className="flex items-center justify-between gap-2 pt-4 ">
                <Button
                  label="Email"
                  leftIcon={<CiMail />}
                  variant="primary"
                  className="w-full border font-bold"
                  rounded
                />
                <Button
                  label="Try Now"
                  leftIcon={<MdOutlinePersonOutline />}
                  variant="secondary"
                  className="w-full font-bold"
                  rounded
                />
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
