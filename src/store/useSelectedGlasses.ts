import { create } from "zustand";
import { AlgoliaProduct } from "@/types/algoliaTypes";

interface SelectedGlassesState {
  selectedGlasses: AlgoliaProduct | null;
  setSelectedGlasses: (glasses: AlgoliaProduct) => void;
}

export const useSelectedGlassesStore = create<SelectedGlassesState>((set) => ({
  selectedGlasses: null,
  setSelectedGlasses: (glasses) => set({ selectedGlasses: glasses }),
}));
