import { create } from "zustand";

type FilterState = {
  isOpen: boolean;
  openFilter: () => void;
  closeFilter: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  isOpen: false,
  openFilter: () => set({ isOpen: true }),
  closeFilter: () => set({ isOpen: false }),
}));
