import { useFilterStore } from "@/store/useFilter";
// import { useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";

import Button from "../button/button";
const CatalogHeadder = () => {
  const { openFilter } = useFilterStore();
  // const { appliedFilters, applyStoredFilter } = useFilterStore();

  // const sliderRef = useRef<HTMLDivElement>(null);
  // const scrollLeft = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  //   }
  // };
  // const scrollRight = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
  //   }
  // };
  // const handleScroll = () => {
  //   if (!sliderRef.current) return;
  // };
  return (
    <div className="mt-12 flex gap-4">
      <Button
        label="Filter"
        rounded
        variant="secondary"
        className="bg-black font-bold py-3 px-8 text-2xl"
        onClick={openFilter}
        leftIcon={<LuSettings2 size={32} />}
      />
      {/* <button
        onClick={scrollLeft}
        className="hidden  absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full"
      >
        <FaChevronLeft className="text-white" />
      </button>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide  "
      >
        {appliedFilters.length > 0 && (
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap px-2">
              {appliedFilters.map((filter) => (
                <button
                  key={filter.id}
                  className="py-6 px-8 text-white font-bold bg-primaryAvolta rounded-[88px] flex-shrink-0 text-4xl"
                  onClick={() => applyStoredFilter(filter.id)}
                >
                  Quick filter {filter.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={scrollRight}
        className="hidden  absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full"
      >
        <FaChevronRight className="text-white" />
      </button> */}
    </div>
  );
};

export default CatalogHeadder;
