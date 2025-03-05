"use client";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useDetailModalStore } from "@/store/useDetailModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { CiHeart, CiMail } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Button from "../../button/button";
export default function Detail() {
  const { isDetailModalOpen, closeDetailModal } = useDetailModalStore();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const { width, height } = useWindowDimensions();
  const { selectedGlasses } = useSelectedGlassesStore();
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const isFavorite = favorites.some((item) => item.id === selectedGlasses?.id);
  return (
    <Transition show={isDetailModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeDetailModal}
        className="fixed inset-0 flex flex-col items-center pt-10 pb-40 px-10"
      >
        <button
          className="absolute bottom-10 p-6 rounded-full bg-grayscale600"
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
          <DialogPanel className="bg-white w-full h-full flex flex-col   rounded-40px shadow-lg  ">
            <div className="flex justify-center items-center h-full">
              <Image
                src={selectedGlasses?.image ?? ""}
                alt="glasses-image"
                width={width * 0.8}
                height={height * 0.6}
                className="object-contain"
              />
            </div>

            <div className="text-start px-20 pb-16 bg-white rounded-b-40px text-grayscale600">
              <div className="flex items-center justify-between pb-4">
                <p className="font-semibold text-xl">{selectedGlasses?.name}</p>
                <Button
                  rounded
                  label=""
                  onClick={() => {
                    if (selectedGlasses) {
                      toggleFavorite(selectedGlasses);
                    }
                  }}
                  leftIcon={
                    isFavorite ? (
                      <>
                        <FaHeart size={40} className="text-red" />
                      </>
                    ) : (
                      <>
                        <CiHeart className="text-gray400" size={40} />
                      </>
                    )
                  }
                  className="text-grayscale500 font-bold py-4 px-6 text-lg"
                />
              </div>

              <h6 className="text-2xl pb-4">
                {selectedGlasses?.description} {selectedGlasses?.id}
              </h6>
              <p className="font-bold text-xl ">CHF {selectedGlasses?.price}</p>
              <hr className="my-6" />

              <p className="text-lg font-medium ">Product Details</p>
              <p
                className={`text-sm text-gray-600 mt-2 ${
                  showFullDetails ? "" : "line-clamp-3"
                }`}
              >
                {selectedGlasses?.productDetail}
              </p>

              <button
                onClick={() => setShowFullDetails(!showFullDetails)}
                className="text-xl text-primaryAvolta"
              >
                {showFullDetails ? "See Less" : "See More"}
              </button>
              <hr className="mt-6 pb-12" />
              <div className="flex items-center justify-between gap-4 pt-4 ">
                <Button
                  label="Email"
                  leftIcon={<CiMail size={24} />}
                  variant="primary"
                  className="w-full font-bold py-6 text-lg border"
                  rounded
                />
                <Button
                  label="Try Now"
                  leftIcon={<MdOutlinePersonOutline size={24} />}
                  variant="secondary"
                  className="w-full font-bold py-6 text-lg"
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
