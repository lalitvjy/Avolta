"use client";
import Filter from "@/components/filter/filter";
import Footer from "@/components/footer/footer";
import GlassesInfo from "@/components/glasses-info/glasses-info";
import Header from "@/components/header/header";
import BookmarkModal from "@/components/modals/bookmark-modal/bookmark-modal";
import EmailModal from "@/components/modals/email-modal/email-modal";
import ReceiveSelfie from "@/components/modals/receive-selfie-modal/receive-selfie";
import TabSelector from "@/components/tab-selector/tab-selector";
import { useDetailModalStore } from "@/store/useDetailModal";
import { useEmailModalStore } from "@/store/useEmailModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../../components/button/button";
import DetailModal from "../../components/modals/detail-modal/detail";
import Slider from "../../components/slider/slider";
const Avolta = () => {
  const { openDetailModal } = useDetailModalStore();
  const { openEmailModal } = useEmailModalStore();
  const [activeTab, setActiveTab] = useState("Live");
  const { selectedGlasses } = useSelectedGlassesStore();
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const isFavorite = favorites.some((item) => item.id === selectedGlasses?.id);
  const { selfie } = useTakeSelfieStore();
  return (
    <div className="bg-gradient-avolta bg-opacity-50  pt-8 h-screen flex-1">
      <Header />
      <div className="flex   justify-center w-full pt-8 px-6 ">
        <div className="relative w-full   h-[79vh] shadow-lg rounded-56px overflow-hidden">
          <Image
            src={selfie ?? ""}
            alt="Main image"
            layout="fill"
            objectFit="cover"
            className="rounded-56px"
          />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute  bottom-7 left-6 flex  ">
            <GlassesInfo />
          </div>
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="absolute bottom-6 right-6 flex gap-2.5 ">
            <Button
              rounded
              onClick={openDetailModal}
              label="See Details"
              className="text-grayscale500 font-bold py-4 px-6 text-lg"
            />
            <Button
              rounded
              onClick={openEmailModal}
              label="Email"
              leftIcon={<MdOutlineMailOutline />}
              className="text-grayscale500 font-bold py-4 px-6 text-lg"
            />
            <Button
              rounded
              label="Wishlit"
              onClick={() => {
                if (selectedGlasses) {
                  toggleFavorite(selectedGlasses);
                }
              }}
              leftIcon={
                isFavorite ? (
                  <>
                    <FaHeart size={20} className="text-red" />
                  </>
                ) : (
                  <>
                    <CiHeart className="text-gray400" size={20} />
                  </>
                )
              }
              className="text-grayscale500 font-bold py-4 px-6 text-lg"
            />
          </div>
        </div>
      </div>

      <Slider />
      <Footer />
      <Filter />
      <DetailModal />
      <EmailModal />
      <ReceiveSelfie />
      <BookmarkModal />
    </div>
  );
};

export default Avolta;
