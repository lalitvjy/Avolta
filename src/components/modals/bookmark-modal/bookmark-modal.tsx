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
import { FaBookmark } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
const BookmarkModal = () => {
  const { isBookmarkModalOpen, closeBookmarkModal } = useBookmarkModalStore();
  const { favorites } = useFavoriteGlassesStore();
  return (
    <Transition show={isBookmarkModalOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog
        onClose={closeBookmarkModal}
        className="fixed inset-0 flex flex-col items-center pt-10 pb-40 px-20"
      >
        <button
          className="absolute bottom-10 p-4 rounded-full bg-grayscale600"
          onClick={closeBookmarkModal}
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
          <DialogPanel className="flex-1 px-16 py-16 bg-white w-full rounded-56px flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold text-4xl">Your Bookmars</h1>
                  <p className="font-medium text-base mt-2">
                    Lorem ipsum simply dummy text
                  </p>
                </div>
                <FaBookmark size={48} className="text-primaryAvolta" />
              </div>
              <div className=" grid grid-cols-1  gap-y-4 pt-16 ">
                {favorites.map((item) => (
                  <BookmarkCard
                    key={item.id}
                    data={{
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image: item.image,
                      id: item.id,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-10 ">
              <Button
                label="Email"
                rounded
                leftIcon={<MdOutlineEmail size={24} />}
                className="w-full bg-transparent border border-gray400 py-6 text-lg"
              />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default BookmarkModal;
