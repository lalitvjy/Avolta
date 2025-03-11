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
import Accordion from "../accordion/accordion";
import Button from "../button/button";

const Filter = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: string) => void;
}) => {
  const { isOpen, closeFilter } = useFilterStore();
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [isLoadingFacets, setIsLoadingFacets] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null); // Track which accordion is open

  useEffect(() => {
    if (isOpen) {
      setIsLoadingFacets(true);
      fetchFacets("avolta-glasses").then(({ brands, prices }) => {
        setBrands(brands);
        setPrices(prices.map(Number));
        setIsLoadingFacets(false);
      });
    }
  }, [isOpen]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const handlePriceChange = (price: number, checked: boolean) => {
    setSelectedPrices((prev) =>
      checked ? [...prev, price] : prev.filter((b) => b !== price)
    );
  };

  const handleApplyFilters = () => {
    const brandFilter =
      selectedBrands.length > 0
        ? `(${selectedBrands.map((brand) => `brand:"${brand}"`).join(" OR ")})`
        : "";

    const priceFilter =
      selectedPrices.length > 0
        ? `priceDutyFree:${Math.min(...selectedPrices)} TO ${Math.max(
            ...selectedPrices
          )}`
        : "";

    const filters = [brandFilter, priceFilter].filter(Boolean).join(" AND ");

    onApplyFilters(filters);
    closeFilter();
  };

  const handleApplyReset = () => {
    setSelectedBrands([]);
    setSelectedPrices([]);
    onApplyFilters("");
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
            <h2 className="text-4xl font-bold leading-10">Filter</h2>
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
                  brands.map((brand) => (
                    <label key={brand} className="block">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) =>
                          handleBrandChange(brand, e.target.checked)
                        }
                      />
                      {brand}
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
                  prices.map((price) => (
                    <label key={price} className="block">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedPrices.includes(price)}
                        onChange={(e) =>
                          handlePriceChange(price, e.target.checked)
                        }
                      />
                      CHF {price}
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
