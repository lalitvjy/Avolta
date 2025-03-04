"use client";
import { useFilterStore } from "@/store/useFilter";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { GlassesItem } from "@/types/glasses";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FIlterIcon from "../../../public/ic-filter.svg";
import catalog from "../../utils/glasses.json";
function Slider() {
  const glassesCatalog: GlassesItem[] = catalog;
  const { openFilter } = useFilterStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { selectedGlasses, setSelectedGlasses } = useSelectedGlassesStore();
  const recommendedIds = [
    "ac16aaf7-1df1-4453-b1e7-fd1a6b0ba76c",
    "cd9abfcb-f7a4-4ff8-86dd-f6696ddd5d42",
    "47b7d22a-ca16-41ee-b965-6759b2317178",
    "425b6732-5850-4510-ab24-25085baf1aed",
  ];
  useEffect(() => {
    if (!selectedGlasses && glassesCatalog.length > 0) {
      setSelectedGlasses(glassesCatalog[0]);
    }
  }, [selectedGlasses, setSelectedGlasses, glassesCatalog]);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  const handleSelectGlasses = (glasses: GlassesItem) => {
    setSelectedGlasses(glasses);
  };
  return (
    <div className="relative w-full pt-10 flex  ">
      <button
        onClick={openFilter}
        className="flex gap-2 absolute z-90 left-[-50px] top-20  pb-2 pt-2 px-4 rounded-t-3xl bg-black rotate-90 text-white text-lg font-bold"
      >
        <Image src={FIlterIcon} alt="filter" width={20} height={20} />
        Filters
      </button>

      <button
        onClick={scrollLeft}
        className="hidden  absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full"
      >
        <FaChevronLeft className="text-white" />
      </button>

      <div
        ref={sliderRef}
        className="flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide pl-16 py-2"
      >
        {glassesCatalog.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectGlasses(item)}
            className={`relative min-w-[120px] h-[120px] rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300
      ${
        selectedGlasses?.id === item.id
          ? "border-4 border-primaryAvolta scale-105 shadow-lg"
          : "border-2 border-transparent"
      }`}
          >
            {recommendedIds.includes(item.id) && (
              <div className="absolute top-0  left-0 w-full bg-primaryAvolta text-white text-sm font-bold rounded-t-lg text-center py-1">
                Recommended
              </div>
            )}
            <div className="flex items-center justify-center h-full">
              <Image
                src={item.image}
                alt={item.name}
                width={144}
                height={144}
                objectFit="contain"
                className="h-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="hidden  absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full"
      >
        <FaChevronRight className="text-white" />
      </button>
    </div>
  );
}

export default Slider;
