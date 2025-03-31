"use client";
import { useFilterStore } from "@/store/useFilter";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { fetchGlasses } from "../../helpers/algolia/algolia";
import Filter from "../filter/filter";
import SkeletonGlassesCard from "../skeleton/slider-skeleton";

function Slider() {
  const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;
  const { openFilter, filters, sortOrder } = useFilterStore();
  const [glasses, setGlasses] = useState<AlgoliaProduct[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { recommendations } = useRecommendetGlassStore();
  const { selectedGlasses, setSelectedGlasses, tryOnGlasses } =
    useSelectedGlassesStore();

  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchGlasses<AlgoliaProduct>(
          ALGOLIA_INDEX_NAME,
          "",
          page,
          filters,
          sortOrder || undefined
        );
        setGlasses((prevGlasses) => {
          if (page === 0) {
            return data.hits;
          }
          const newItems = data.hits.filter(
            (item) =>
              !prevGlasses.some(
                (existing) => existing.objectID === item.objectID
              )
          );
          return [...prevGlasses, ...newItems];
        });
        setHasMore(data.hits.length > 0);
      } catch (error) {
        console.error("Error fetching glasses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ALGOLIA_INDEX_NAME, filters, page, sortOrder]);

  const sortedGlassesCatalog = useMemo(() => {
    const allGlassesMap = new Map();
    if (tryOnGlasses) {
      allGlassesMap.set(tryOnGlasses.objectID, tryOnGlasses);
    }
    for (const item of recommendations) {
      if (!allGlassesMap.has(item.objectID)) {
        allGlassesMap.set(item.objectID, item);
      }
    }

    for (const item of glasses) {
      if (!allGlassesMap.has(item.objectID)) {
        allGlassesMap.set(item.objectID, item);
      }
    }

    return Array.from(allGlassesMap.values());
  }, [glasses, recommendations, tryOnGlasses]);

  useEffect(() => {
    if (tryOnGlasses) {
      setSelectedGlasses(tryOnGlasses);
    }
  }, [tryOnGlasses, setSelectedGlasses]);

  useEffect(() => {
    if (!selectedGlasses && !tryOnGlasses && sortedGlassesCatalog.length > 0) {
      setSelectedGlasses(sortedGlassesCatalog[0]);
    }
  }, [selectedGlasses, tryOnGlasses, setSelectedGlasses, sortedGlassesCatalog]);

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

  const handleSelectGlasses = (glasses: AlgoliaProduct) => {
    setSelectedGlasses(glasses);
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 10 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="relative w-full pt-10 flex  pl-28">
      <button
        onClick={openFilter}
        className="flex gap-2 absolute z-90 left-[-52px] top-20  pb-4 pt-4 px-8 rounded-t-[32px] bg-black rotate-90 text-white text-3xl font-bold items-center"
      >
        <LuSettings2 size={40} />
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
        onScroll={handleScroll}
        className="flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide  py-2 pl-2"
      >
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonGlassesCard key={index} />
            ))
          : sortedGlassesCatalog.map((item) => (
              <div
                key={item.objectID}
                onClick={() => handleSelectGlasses(item)}
                className={`relative min-w-[200px] h-[200px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 
          ${
            selectedGlasses?.objectID === item.objectID
              ? "border-4 border-primaryAvolta scale-105"
              : "border border-transparent"
          }`}
              >
                {recommendations.some(
                  (rec) => rec.objectID === item.objectID
                ) && (
                  <div className="absolute top-0 left-0 w-full bg-primaryAvolta text-white text-[15px] font-bold rounded-t-lg text-center py-1">
                    Recommended
                  </div>
                )}
                <div className="flex items-center justify-center h-full bg-white">
                  {item.imageUrlBase ? (
                    <Image
                      src={item.imageUrlBase}
                      alt={item.name}
                      width={144}
                      height={144}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "auto",
                      }}
                      priority={true}
                    />
                  ) : (
                    <div>No Image</div>
                  )}
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
      <Filter />
    </div>
  );
}

export default Slider;
