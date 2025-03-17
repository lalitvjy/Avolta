"use client";
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
// import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import mainImage from "../../../public/image 2.png";
import Button from "../../components/button/button";
import DetailModal from "../../components/modals/detail-modal/detail";
import Slider from "../../components/slider/slider";
// const DeepARCanvas = dynamic(
//   () => import("@/components/deepar-canvas/deepar-canvas"),
//   {
//     ssr: false,
//   }
// );

const Avolta = () => {
  const { openDetailModal } = useDetailModalStore();
  const { openEmailModal } = useEmailModalStore();
  const [activeTab, setActiveTab] = useState("Static");
  const { selectedGlasses } = useSelectedGlassesStore();
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const isFavorite = favorites.some(
    (item) => item.objectID === selectedGlasses?.objectID
  );
  const { selfie } = useTakeSelfieStore();
  // const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="bg-gradient-avolta   pt-8  min-h-screen">
      <div className="px-9">
        <Header />
      </div>
      <div className="flex justify-center w-full pt-8 px-6 ">
        <div className="relative w-full   h-[80vh] shadow-lg rounded-56px overflow-hidden">
          {activeTab === "Live" ? (
            <div className="flex items-center justify-center h-full relative">
              {/* {activeTab === "Live" ? (
                <DeepARCanvas
                  activeTab={activeTab}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              ) : (   )} */}
                <Image
                  src={mainImage}
                  alt="Main image"
                  fill
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  className="rounded-56px"
                />
           
            </div>
          ) : (
            <Image
              src={selfie ?? mainImage}
              alt="Main image"
              fill
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className="rounded-56px"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute  bottom-7 left-6 flex  ">
            <GlassesInfo />
          </div>
          <TabSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // isLoading={isLoading}
          />
          <div className="absolute bottom-6 right-6 flex gap-14 ">
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
      <Footer  />
      <DetailModal />
      <EmailModal />
      <ReceiveSelfie />
      <BookmarkModal />
    </div>
  );
};

export default Avolta;
