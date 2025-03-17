"use client";
import { useFilterStore } from "@/store/useFilter";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FIlterIcon from "../../../public/ic-filter.svg";
import { fetchGlasses } from "../../helpers/algolia/algolia";
import Filter from "../filter/filter";

function Slider() {
  const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;
  const { openFilter } = useFilterStore();
  const [glasses, setGlasses] = useState<AlgoliaProduct[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState("");
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGlasses<AlgoliaProduct>(
          ALGOLIA_INDEX_NAME,
          "",
          page,
          activeFilters
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
      }
    };

    loadData();
  }, [ALGOLIA_INDEX_NAME, activeFilters, page]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const { selectedGlasses, setSelectedGlasses } = useSelectedGlassesStore();
  const recommendedIds = useMemo(
    () => ["VAN-4001225", "889652205076", "889652203638", "889652188621"],
    []
  );

  const sortedGlassesCatalog = useMemo(() => {
    return [...glasses].sort((a, b) => {
      const isARecommended = recommendedIds.includes(a.objectID);
      const isBRecommended = recommendedIds.includes(b.objectID);
      return Number(isBRecommended) - Number(isARecommended);
    });
  }, [glasses, recommendedIds]);
  useEffect(() => {
    if (!selectedGlasses && sortedGlassesCatalog.length > 0) {
      setSelectedGlasses(sortedGlassesCatalog[0]);
    }
  }, [selectedGlasses, setSelectedGlasses, sortedGlassesCatalog]);

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
  const applyFilters = (filters: string) => {
    setActiveFilters(filters);
    setPage(0);
  };
  return (
    <div className="relative w-full pt-10 flex  ">
      <button
        onClick={openFilter}
        className="flex gap-2 absolute z-90 left-[-52px] top-20  pb-4 pt-4 px-8 rounded-t-[32px] bg-black rotate-90 text-white text-lg font-bold"
      >
        <Image
          src={FIlterIcon}
          alt="Filter Icon"
          width={20}
          height={20}
          style={{ width: "auto", height: "auto" }}
        />
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
        className="flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide pl-20 py-2"
      >
        {sortedGlassesCatalog.map((item) => (
          <div
            key={item.objectID}
            onClick={() => handleSelectGlasses(item)}
            className={`relative min-w-[144px] h-[144px] rounded-3xl overflow-hidden  cursor-pointer transition-all duration-300
      ${
        selectedGlasses?.objectID === item.objectID
          ? "border-4 border-primaryAvolta scale-105 shadow-lg"
          : "border-2 border-transparent"
      }`}
          >
            {recommendedIds.includes(item.objectID) && (
              <div className="absolute top-0  left-0 w-full bg-primaryAvolta text-white text-[11px] font-bold rounded-t-lg text-center py-1">
                Recommended
              </div>
            )}
            <div className=" flex items-center justify-center h-full bg-white">
              <Image
                src={item.imageUrlBase ?? ""}
                alt={item.name}
                width={144}
                height={144}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
                priority={true}
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
      <Filter onApplyFilters={applyFilters} />
    </div>
  );
}

export default Slider;
