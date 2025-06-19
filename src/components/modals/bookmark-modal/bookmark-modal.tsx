"use client";
import Button from "@/components/button/button";
import BookmarkCard from "@/components/card/bookmark-card";
import { useBookmarkModalStore } from "@/store/useBookmarkModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useUserInfo } from "@/store/useUserInfo";
import { logWishlistClose, logWishlistReceiveEmail } from "@/utils/analytics";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import UserInfo from "../user-info/user-info";
const BookmarkModal = () => {
  const { isBookmarkModalOpen, closeBookmarkModal } = useBookmarkModalStore();
  const { selectedGlasses } = useSelectedGlassesStore();
  const { favorites } = useFavoriteGlassesStore();
  const { openUserModal, email, name } = useUserInfo();
  const handelOpenUserModal = () => {
    openUserModal();
    if (selectedGlasses)
      logWishlistReceiveEmail(selectedGlasses?.sku, email, name);
  };
  const handleClose = () => {
    logWishlistClose(email, name);
    closeBookmarkModal();
  };
  return (
    <Transition show={isBookmarkModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeBookmarkModal}
        className="fixed inset-0 flex flex-col items-center pt-40 pb-10 px-20"
      >
        <button
          className="absolute right-20 top-10  p-4 rounded-full bg-grayscale600"
          onClick={handleClose}
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
          <DialogPanel className="flex-1 px-16 py-16 bg-white w-full rounded-56px flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold text-[60px]">Your wishlist</h1>
                </div>
                <div className="flex items-center gap-8">
                  <FaHeart
                    className={`${favorites.length > 0 ? "text-red " : " "}`}
                    size={40}
                  />
                </div>
              </div>
              <div className=" grid grid-cols-1  gap-y-4 pt-16 ">
                {favorites.map((item) => (
                  <BookmarkCard
                    key={item.objectID}
                    data={{
                      name: item.name,
                      imageUrlBase: item.imageUrlBase,
                      brand: item.brand,
                      priceDutyFree: item.priceDutyFree,
                      currency: item.currency,
                      objectID: item.objectID,
                      sku: item.sku,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-10 ">
              <Button
                label="Receive via email"
                rounded
                onClick={handelOpenUserModal}
                leftIcon={<MdOutlineEmail size={48} />}
                className="w-full bg-transparent border-2 border-gray400 py-12  text-4xl"
              />
            </div>
            <UserInfo purpose="wishlist" buttonlabel="Send Email" />
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default BookmarkModal;
