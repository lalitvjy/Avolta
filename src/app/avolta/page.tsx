"use client";
import Footer from "@/components/footer/footer";
import GlassesInfo from "@/components/glasses-info/glasses-info";
import Header from "@/components/header/header";
import BookmarkModal from "@/components/modals/bookmark-modal/bookmark-modal";
import EmailModal from "@/components/modals/email-modal/email-modal";
import ReceiveSelfie from "@/components/modals/receive-selfie-modal/receive-selfie";
import TabSelector from "@/components/tab-selector/tab-selector";
import { applyGlasses } from "@/helpers/apply-glasses/applyGlasses";
import { useDetailModalStore } from "@/store/useDetailModal";

import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import mainImage from "../../../public/image 2.png";
import Button from "../../components/button/button";
import DetailModal from "../../components/modals/detail-modal/detail";
import Slider from "../../components/slider/slider";

const DeepARCanvas = dynamic(
  () => import("@/components/deepar-canvas/deepar-canvas"),
  {
    ssr: false,
  }
);

const Avolta = () => {
  const { openDetailModal } = useDetailModalStore();
  // const { openEmailModal } = useEmailModalStore();
  const [activeTab, setActiveTab] = useState("Static");
  const { selectedGlasses, setSelectedGlasses } = useSelectedGlassesStore();
  const { uuid } = useRecommendetGlassStore();
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const isFavorite = favorites.some(
    (item) => item.objectID === selectedGlasses?.objectID
  );
  const { selfie } = useTakeSelfieStore();
  const [appliedImage, setAppliedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplyingGlasses, setIsApplyingGlasses] = useState(false);

  useEffect(() => {
    const generateTryOnImage = async () => {
      if (!uuid || !selectedGlasses) return;

      if (selectedGlasses.triedOnUrl) {
        if (appliedImage !== selectedGlasses.triedOnUrl) {
          setAppliedImage(selectedGlasses.triedOnUrl);
        }
        return;
      }

      setIsApplyingGlasses(true);

      try {
        const asset2DUrl = selectedGlasses.asset2DUrl;
        if (!asset2DUrl) {
          console.warn("No asset2DUrl found for selected glasses.");
          setIsApplyingGlasses(false);
          return;
        }
        console.log("uuid", uuid);
        const result = await applyGlasses(uuid, {
          [selectedGlasses.objectID]: asset2DUrl,
        });

        const firstImageUrl = result?.tryon_outputs
          ? (Object.values(result.tryon_outputs)[0] as string)
          : null;

        if (firstImageUrl) {
          setSelectedGlasses({
            ...selectedGlasses,
            triedOnUrl: firstImageUrl,
          });

          setAppliedImage(firstImageUrl);
        }
      } catch (error) {
        console.error("Failed to apply glasses:", error);
      } finally {
        setIsApplyingGlasses(false);
      }
    };

    generateTryOnImage();
  }, [uuid, selectedGlasses, appliedImage, setSelectedGlasses]);

  return (
    <div className="bg-white   pt-8  min-h-screen">
      <div className="px-9">
        <Header />
      </div>
      <div className="flex justify-center w-full pt-8 px-6 ">
        <div className="relative w-full   h-[75vh] shadow-lg rounded-56px overflow-hidden">
          {activeTab === "Live" ? (
            <div className="flex items-center justify-center h-full relative">
              {activeTab === "Live" ? (
                <DeepARCanvas
                  activeTab={activeTab}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              ) : (
                <Image
                  src={mainImage}
                  alt="Main image"
                  fill
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  className="rounded-56px"
                />
              )}
            </div>
          ) : (
            <>
              <Image
                src={
                  selectedGlasses?.triedOnUrl ||
                  appliedImage ||
                  selfie ||
                  mainImage
                }
                alt="Selected Glasses"
                fill
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                className="rounded-56px"
              />

              {isApplyingGlasses && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner
                    animation="border"
                    className="text-primaryAvolta h-20 w-20"
                  />
                </div>
              )}
            </>
          )}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute  bottom-12 left-12 flex  ">
            <GlassesInfo />
          </div>
          <TabSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoading={isLoading}
          />
          <div className="absolute bottom-12 right-12 flex gap-14 ">
            <Button
              rounded
              onClick={openDetailModal}
              label="See Details"
              className="text-grayscale500 font-bold py-4 px-6 text-4xl"
            />
            {/* <Button
              rounded
              onClick={openEmailModal}
              label="Email"
              leftIcon={<MdOutlineMailOutline size={40} />}
              className="text-grayscale500 font-bold py-4 px-6 text-3xl"
            /> */}
            <Button
              rounded
              label="Wishlit"
              disabled={isApplyingGlasses}
              onClick={() => {
                if (selectedGlasses) {
                  toggleFavorite(selectedGlasses);
                }
              }}
              leftIcon={
                isFavorite ? (
                  <>
                    <FaHeart className="text-red" size={40} />
                  </>
                ) : (
                  <>
                    <CiHeart className="text-gray400" size={40} />
                  </>
                )
              }
              className="text-grayscale500 font-bold py-4 px-6 text-4xl"
            />
          </div>
        </div>
      </div>

      <Slider />
      <Footer isLoading={isLoading} isApplyingGlasses={isApplyingGlasses} />
      <DetailModal />
      <EmailModal />
      <ReceiveSelfie />
      <BookmarkModal />
    </div>
  );
};

export default Avolta;
