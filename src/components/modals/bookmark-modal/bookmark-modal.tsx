"use client";
import { useBookmarkModalStore } from "@/store/useBookmarkModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";

import Button from "@/components/button/button";
import BookmarkCard from "@/components/card/bookmark-card";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useUserInfo } from "@/store/useUserInfo";
import { FaHeart } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import UserInfo from "../user-info/user-info";
const BookmarkModal = () => {
  const { isBookmarkModalOpen, closeBookmarkModal } = useBookmarkModalStore();
  const { favorites } = useFavoriteGlassesStore();
  const { openUserModal } = useUserInfo();
  const handelOpenUserModal = () => {
    openUserModal();
  };

  return (
    <Transition show={isBookmarkModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeBookmarkModal}
        className="fixed inset-0 flex flex-col items-center pt-10 pb-40 px-20"
      >
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
                  <h1 className="font-bold text-[60px]">Your Wishlist</h1>
                </div>
                <div className="flex items-center gap-8">
                  <FaHeart
                    className={`${favorites.length > 0 ? "text-red " : " "}`}
                    size={40}
                  />
                  <button
                    className="  p-4 rounded-full bg-grayscale600"
                    onClick={closeBookmarkModal}
                  >
                    <RxCross2 className="text-white" size={48} />
                  </button>
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
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-10 ">
              <Button
                label="Email"
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
