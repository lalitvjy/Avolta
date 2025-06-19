"use client";
import { fetchFacets } from "@/helpers/algolia/algolia";
import { useFilterStore } from "@/store/useFilter";
import { logFilterApply, logFilterReset } from "@/utils/analytics";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import Accordion from "../accordion/accordion";
import Button from "../button/button";
interface FilterProps {
  location: "catalogue" | "try-on";
}
const Filter = ({ location }: FilterProps) => {
  const {
    isOpen,
    closeFilter,
    setFilters,
    setSortOrder,
    resetFilters,
    addAppliedFilter,
  } = useFilterStore();
  const [brands, setBrands] = useState<{ name: string; count: number }[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLoadingFacets, setIsLoadingFacets] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("Sort");
  const [selectedSort, setSelectedSort] = useState<string>("");
  useEffect(() => {
    if (isOpen) {
      setIsLoadingFacets(true);
      fetchFacets("avolta-glasses").then(({ brands, prices }) => {
        setBrands(brands);

        if (prices.length > 1) {
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);
        }

        setIsLoadingFacets(false);
      });
    }
  }, [isOpen]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };
  const handleSortChange = (sortOrder: string) => {
    setSelectedSort((prevSort) => (prevSort === sortOrder ? "" : sortOrder));
  };
  const handleApplyFilters = () => {
    const brandFilter =
      selectedBrands.length > 0
        ? `(${selectedBrands.map((brand) => `brand:"${brand}"`).join(" OR ")})`
        : "";

    const priceFilter = `priceDutyFree:${priceRange[0]} TO ${priceRange[1]}`;

    const filters = [brandFilter, priceFilter].filter(Boolean).join(" AND ");
    setFilters(filters);
    setSortOrder(selectedSort);
    addAppliedFilter(filters, selectedSort);
    logFilterApply(location, `${filters} ${selectedSort}`);
    closeFilter();
  };

  const handleApplyReset = () => {
    const brandFilter =
      selectedBrands.length > 0
        ? `(${selectedBrands.map((brand) => `brand:"${brand}"`).join(" OR ")})`
        : "";

    const priceFilter = `priceDutyFree:${priceRange[0]} TO ${priceRange[1]}`;

    const filterString =
      [brandFilter, priceFilter].filter(Boolean).join(" AND ") +
      (selectedSort ? ` ${selectedSort}` : "");

    logFilterReset(location, filterString);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedSort("");
    resetFilters();
    closeFilter();
  };

  return (
    <Transition show={isOpen}>
      <Dialog onClose={closeFilter} className="fixed inset-0 z-50 flex">
        <TransitionChild
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-50" />
        </TransitionChild>

        <TransitionChild
          enter="transition-transform duration-500"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <DialogPanel className="w-[700px] bg-white shadow-lg p-8 absolute left-6 top-4 bottom-4 rounded-3xl flex flex-col justify-between">
            <h2 className="text-5xl font-bold leading-10 text-grayscale600 pb-10">
              Filter
            </h2>
            <div className="h-full ">
              <Accordion
                title="Sort By"
                isOpen={openAccordion === "Sort"}
                onClick={() =>
                  setOpenAccordion(openAccordion === "Sort" ? null : "Sort")
                }
              >
                <div className="flex flex-col gap-2 p-2">
                  <label
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleSortChange("lowToHigh")}
                  >
                    <div
                      className={`w-8 h-8 flex justify-center items-center border-2 rounded-full cursor-pointer ${
                        selectedSort === "lowToHigh"
                          ? "bg-primaryAvolta border-primaryAvolta"
                          : "border-gray-500"
                      }`}
                    >
                      {selectedSort === "lowToHigh" && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>Price: Low to High</span>
                  </label>

                  <label
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleSortChange("highToLow")}
                  >
                    <div
                      className={`w-8 h-8 flex justify-center items-center border-2 rounded-full cursor-pointer ${
                        selectedSort === "highToLow"
                          ? "bg-primaryAvolta border-primaryAvolta"
                          : "border-gray-500"
                      }`}
                    >
                      {selectedSort === "highToLow" && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>Price: High to Low</span>
                  </label>
                </div>
              </Accordion>

              <Accordion
                title="Price"
                isOpen={openAccordion === "Price"}
                onClick={() =>
                  setOpenAccordion(openAccordion === "Price" ? null : "Price")
                }
              >
                {isLoadingFacets ? (
                  <p>Loading Prices...</p>
                ) : (
                  <div className=" px-2">
                    <p className="text-gray-500 text-center mb-2  ">
                      CHF {priceRange[0]} - CHF {priceRange[1]}
                    </p>

                    <Slider
                      range
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(newRange) =>
                        setPriceRange(newRange as [number, number])
                      }
                      styles={{
                        track: { backgroundColor: "black", height: 4 },
                        handle: {
                          backgroundColor: "white",
                          border: "3px solid black",
                          width: 16,
                          height: 16,
                        },
                      }}
                    />
                  </div>
                )}
              </Accordion>
              <Accordion
                title="Brands"
                isOpen={openAccordion === "Brands"}
                onClick={() =>
                  setOpenAccordion(openAccordion === "Brands" ? null : "Brands")
                }
              >
                {isLoadingFacets ? (
                  <p>Loading brands...</p>
                ) : (
                  brands.map((brand, index) => (
                    <label key={index} className="block">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center ">
                          <input
                            type="checkbox"
                            className="mr-2 w-8 h-10"
                            checked={selectedBrands.includes(brand.name)}
                            onChange={(e) =>
                              handleBrandChange(brand.name, e.target.checked)
                            }
                          />

                          {brand.name}
                        </div>
                        {/* <p className="text-gray-500 pr-2">({brand.count})</p> */}
                      </div>
                    </label>
                  ))
                )}
              </Accordion>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Button
                label="Reset"
                rounded
                onClick={handleApplyReset}
                variant="secondary"
                className="bg-black font-bold py-6 w-full text-3xl"
              />
              <Button
                label="Apply"
                rounded
                onClick={handleApplyFilters}
                variant="secondary"
                className="font-bold py-6 w-full text-3xl"
              />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Filter;
