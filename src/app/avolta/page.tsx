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
import * as deepar from "deepar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import mainImage from "../../../public/image 2.png";
import Button from "../../components/button/button";
import DetailModal from "../../components/modals/detail-modal/detail";
import Slider from "../../components/slider/slider";
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
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const instanceRef = useRef<deepar.DeepAR | null>(null);

  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        if (!previewRef.current) {
          console.error("Canvas not found!");
          return;
        }
        setIsLoading(true);
        instanceRef.current = await deepar.initialize({
          licenseKey:
            "afb812e0fdfd1a60225657be0339502bd5d2b06735593f1f8e6e3adcd619b5a8fa72a963db0200a6",
          canvas: previewRef.current,
          effect: "https://cdn.jsdelivr.net/npm/deepar/effects/aviators",
        });

        await instanceRef.current.startCamera();

        const deepARCanvas = instanceRef.current.getCanvas();

        if (deepARCanvas && previewRef.current?.parentElement) {
          const containerWidth = previewRef.current.parentElement.clientWidth;
          const containerHeight = previewRef.current.parentElement.clientHeight;
          deepARCanvas.width = containerWidth;
          deepARCanvas.height = containerHeight;
        }

        instanceRef.current.setZoom(0.8);

        setIsLoading(instanceRef.current.isSegmentationInitialized());
      } catch (error) {
        console.error("DeepAR initialization failed:", error);
      }
    };

    if (activeTab === "Live") {
      initializeDeepAR();
    } else {
      instanceRef.current?.shutdown();
      instanceRef.current = null;
    }
    return () => {
      instanceRef.current?.shutdown();
      instanceRef.current = null;
    };
  }, [activeTab]);

  return (
    <div className="bg-gradient-avolta bg-opacity-50  pt-8 h-screen flex-1">
      <Header />
      <div className="flex   justify-center w-full pt-8 px-6 ">
        <div className="relative w-full   h-[79vh] shadow-lg rounded-56px overflow-hidden">
          {activeTab === "Live" ? (
            <div className="flex items-center justify-center h-full relative">
              <canvas
                ref={previewRef}
                className={`rounded-56px w-full h-full object-cover ${
                  isLoading ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
              />

              {isLoading && (
                <div className="absolute text-4xl font-bold text-white">
                  <Spinner
                    animation="grow"
                    className="text-primaryAvolta w-16 h-16"
                  />
                </div>
              )}
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
            isLoading={isLoading}
          />
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
      <Footer isLoading={isLoading} />
      <DetailModal />
      <EmailModal />
      <ReceiveSelfie />
      <BookmarkModal />
    </div>
  );
};

export default Avolta;
