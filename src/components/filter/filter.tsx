"use client";
import { useFilterStore } from "@/store/useFilter";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Accordion from "../accordion/accordion";
import Button from "../button/button";
const Filter = () => {
  const { isOpen, closeFilter } = useFilterStore();
  const handelClose = () => {
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
          <DialogPanel className="w-96  bg-white shadow-lg p-8 absolute left-6 top-4 bottom-4 rounded-3xl flex flex-col justify-between">
            <h2 className="text-4xl font-bold leading-10">Filter</h2>
            <div className="h-full space-y-4">
              <Accordion title="Sort by">
                <label className="block">
                  <input type="radio" name="price" className="mr-2" /> Low to
                  High
                </label>
                <label className="block">
                  <input type="radio" name="price" className="mr-2" /> High to
                  Low
                </label>
              </Accordion>

              <Accordion title="Brands">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Brand A
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Brand B
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Brand C
                </label>
              </Accordion>

              <Accordion title="More Filters">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> New Arrivals
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Best Sellers
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Discounted
                </label>
              </Accordion>
            </div>
            <div className="flex  items-center justify-between gap-4">
              <Button
                label="Reset"
                rounded
                onClick={handelClose}
                variant="secondary"
                className="bg-black font-bold py-6 w-full"
              />
              <Button
                label="Apply"
                rounded
                variant="secondary"
                className=" font-bold py-6 w-full"
              />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Filter;
