"use client";
import { useModalStore } from "@/app/store/useDetailModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { MdClose, MdOutlinePersonOutline } from "react-icons/md";
import Glasses from "../../../../../public/glasses.jpg";
import Button from "../../button/button";

const product = {
  id: 1,
  brand: "Carrera",
  name: "Sunglasses 1045 S 61-13-140",
  price: "CHF 182.00",
  image: Glasses,
  details:
    "A true standout pair – these aviator sunglasses take the classic Carrera style into a new realm. Designed with a distinctive double nose bridge, they're shaped from lightweight injection-molded polyamide to an oversized teardrop.",
};

export default function DetailModal() {
  const { isDetailModalOpen, closeDetailModal } = useModalStore();
  const [showFullDetails, setShowFullDetails] = useState(false);
  return (
    <Transition show={isDetailModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={closeDetailModal}
      >
        <button
          onClick={closeDetailModal}
          className="absolute bottom-2 bg-black z-50 rounded-full p-4 shadow-lg "
        >
          <MdClose size={24} className="text-white" />
        </button>

        <TransitionChild
          as={Fragment}
          enter="transition-transform duration-500 ease-in-out"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition-transform duration-300 ease-in-out"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-full opacity-0"
        >
          <DialogPanel className="bg-white w-full max-w-lg  rounded-3xl shadow-lg relative text ack text-xl">
            <div className="w-full  max-h-72 flex justify-center">
              <Image
                src={product.image}
                alt="glasses-image"
                objectFit="cover"
                className="rounded-t-3xl"
              />
            </div>

            <div className="text-start  px-10 py-6">
              <div className="flex items-center justify-between ">
                <p className=" font-semibold text-gray-700">{product.brand}</p>
                <FaRegBookmark size={14} />
              </div>

              <p>{product.name}</p>
              <p className="font-semibold text-gray-700">{product.price}</p>
              <hr className="my-2" />
              <p className="text-xl font-semibold text-gray-700">
                Product Details
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {showFullDetails
                  ? product.details
                  : `${product.details.substring(0, 120)}...`}
              </p>

              <button
                onClick={() => setShowFullDetails(!showFullDetails)}
                className="text-sm underline"
              >
                {showFullDetails ? "See Less" : "See More"}
              </button>

              <div className="flex items-center justify-between gap-1 mt-10 ">
                <Button
                  label="Email"
                  icon={<CiMail />}
                  variant="primary"
                  className="w-full"
                  rounded
                />
                <Button
                  label="Try Now"
                  icon={<MdOutlinePersonOutline />}
                  variant="secondary"
                  rounded
                  className="w-full"
                />
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
