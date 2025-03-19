"use client";
import { fetchFacets } from "@/helpers/algolia/algolia";
import { useFilterStore } from "@/store/useFilter";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import Accordion from "../accordion/accordion";
import Button from "../button/button";
const Filter = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: string) => void;
}) => {
  const { isOpen, closeFilter } = useFilterStore();
  const [brands, setBrands] = useState<{ name: string; count: number }[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLoadingFacets, setIsLoadingFacets] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
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
    setSelectedSort(sortOrder);
  };
  const handleApplyFilters = () => {
    const brandFilter =
      selectedBrands.length > 0
        ? `(${selectedBrands.map((brand) => `brand:"${brand}"`).join(" OR ")})`
        : "";

    const priceFilter = `priceDutyFree:${priceRange[0]} TO ${priceRange[1]}`;

    const filters = [brandFilter, priceFilter].filter(Boolean).join(" AND ");

    onApplyFilters(filters);
    closeFilter();
  };

  const handleApplyReset = () => {
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    onApplyFilters("");
    setSelectedSort("");
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
          <DialogPanel className="w-[500px] bg-white shadow-lg p-8 absolute left-6 top-4 bottom-4 rounded-3xl flex flex-col justify-between">
            <h2 className="text-4xl font-bold leading-10 text-grayscale600">
              Filter
            </h2>
            <div className="h-full ">
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
                        <div className="flex ">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedBrands.includes(brand.name)}
                            onChange={(e) =>
                              handleBrandChange(brand.name, e.target.checked)
                            }
                          />

                          {brand.name}
                        </div>
                        <p className="text-gray-500 pr-2">({brand.count})</p>
                      </div>
                    </label>
                  ))
                )}
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
                  <div className=" ">
                    <p className="text-gray-500 text-center mb-2">
                      CHF {priceRange[0]} - CHF {priceRange[1]}
                    </p>

                    <ReactSlider
                      className=" h-2 "
                      trackClassName="bg-black h-1 rounded-full"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(newRange) =>
                        setPriceRange(newRange as [number, number])
                      }
                      pearling
                      minDistance={5}
                      ariaLabel={["Lower price", "Upper price"]}
                      renderThumb={(props) => {
                        const { key, ...restProps } = props;
                        return (
                          <div
                            key={key}
                            {...restProps}
                            className="text-white bg-white border-4 border-black rounded-full cursor-pointer bottom-[-2px]  p-1"
                          ></div>
                        );
                      }}
                    />
                  </div>
                )}
              </Accordion>
              <Accordion
                title="Sort By"
                isOpen={openAccordion === "Sort"}
                onClick={() =>
                  setOpenAccordion(openAccordion === "Sort" ? null : "Sort")
                }
              >
                <div className="flex flex-col gap-2 p-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sort"
                      value="lowToHigh"
                      checked={selectedSort === "lowToHigh"}
                      onChange={() => handleSortChange("lowToHigh")}
                    />
                    <span>Price: Low to High</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sort"
                      value="highToLow"
                      checked={selectedSort === "highToLow"}
                      onChange={() => handleSortChange("highToLow")}
                    />
                    <span>Price: High to Low</span>
                  </label>
                </div>
              </Accordion>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Button
                label="Reset"
                rounded
                onClick={handleApplyReset}
                variant="secondary"
                className="bg-black font-bold py-6 w-full"
              />
              <Button
                label="Apply"
                rounded
                onClick={handleApplyFilters}
                variant="secondary"
                className="font-bold py-6 w-full"
              />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Filter;
