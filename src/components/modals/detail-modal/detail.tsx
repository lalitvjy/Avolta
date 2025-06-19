"use client";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useDetailModalStore } from "@/store/useDetailModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useUserInfo } from "@/store/useUserInfo";
import {
  logViewCatalogueSkuLess,
  logViewCatalogueSkuMore,
  logWishlistAdd,
  logWishlistRemove,
} from "@/utils/analytics";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiHeart, CiMail } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Button from "../../button/button";
import UserInfo from "../user-info/user-info";
export default function Detail() {
  const router = useRouter();
  const { isDetailModalOpen, closeDetailModal } = useDetailModalStore();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const { width, height } = useWindowDimensions();
  const { email, name } = useUserInfo();
  const { selectedGlasses, tryOnGlasses } = useSelectedGlassesStore();
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const { openUserModal } = useUserInfo();
  const handelOpenUserModal = () => {
    openUserModal();
  };
  const isFavorite = favorites.some(
    (item) => item.objectID === selectedGlasses?.objectID
  );
  const handelNavigateMainPage = () => {
    router.push("/avolta");
    closeDetailModal();
  };
  const handleToggleDetails = () => {
    if (tryOnGlasses?.sku) {
      if (!showFullDetails) {
        logViewCatalogueSkuMore(tryOnGlasses.sku, email, name);
      } else {
        logViewCatalogueSkuLess(tryOnGlasses.sku, email, name);
      }
    }
    setShowFullDetails(!showFullDetails);
  };
  return (
    <Transition show={isDetailModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeDetailModal}
        className="fixed inset-0 flex flex-col items-center pt-40 pb-10 px-10"
      >
        <button
          className="absolute  right-10 top-10 p-4 rounded-full bg-grayscale600"
          onClick={closeDetailModal}
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
          <DialogPanel className="bg-white w-full h-full flex flex-col   rounded-40px shadow-lg  ">
            <div className="flex justify-center items-center h-full">
              <Image
                src={tryOnGlasses?.imageUrlBase ?? ""}
                alt="glasses-image"
                width={width * 0.8}
                height={height * 0.3}
                className="object-contain"
              />
            </div>

            <div className="text-start px-20 pb-16 bg-white rounded-b-40px text-grayscale600">
              <div className="flex items-center justify-between pb-4">
                <p className="font-semibold text-[60px]">
                  {tryOnGlasses?.brand}
                </p>
                <Button
                  rounded
                  label=""
                  onClick={() => {
                    if (selectedGlasses) {
                      toggleFavorite(selectedGlasses);
                      if (isFavorite) {
                        logWishlistRemove("catalogue-pdp");
                      } else {
                        logWishlistAdd("catalogue-pdp");
                      }
                    }
                  }}
                  leftIcon={
                    isFavorite ? (
                      <>
                        <FaHeart size={60} className="text-red" />
                      </>
                    ) : (
                      <>
                        <CiHeart className="text-gray400" size={60} />
                      </>
                    )
                  }
                  className="text-grayscale500 font-bold py-4 px-6 text-lg"
                />
              </div>

              <h6 className="text-4xl pb-4">{tryOnGlasses?.name}</h6>
              <p className="font-bold text-3xl ">
                {tryOnGlasses?.currency} {tryOnGlasses?.priceDutyFree}
              </p>
              <hr className="my-6" />

              <p className="text-4xl font-medium ">Product Details</p>
              <p
                className={`text-3xl text-gray-600 mt-2 ${
                  showFullDetails ? "" : "line-clamp-3"
                }`}
              >
                {tryOnGlasses?.description}
              </p>

              <button
                onClick={handleToggleDetails}
                className="text-2xl text-primaryAvolta"
              >
                {showFullDetails ? "See Less" : "See More"}
              </button>
              <hr className="mt-6 pb-12" />
              <div className="flex items-center justify-between gap-4 pt-4 ">
                <Button
                  label="Email"
                  leftIcon={<CiMail size={48} />}
                  variant="primary"
                  onClick={handelOpenUserModal}
                  className="w-full font-bold py-6 text-4xl border"
                  rounded
                />
                <Button
                  label="Try Now"
                  leftIcon={<MdOutlinePersonOutline size={48} />}
                  variant="secondary"
                  className="w-full font-bold py-6 text-4xl"
                  onClick={handelNavigateMainPage}
                  rounded
                />
              </div>
            </div>
            <UserInfo purpose="product-details" buttonlabel="Send Email" />
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
