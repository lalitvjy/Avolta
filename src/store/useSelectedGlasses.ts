import { create } from "zustand";
import { AlgoliaProduct } from "@/types/algoliaTypes";

interface SelectedGlassesState {
  selectedGlasses: AlgoliaProduct | null;
  setSelectedGlasses: (glasses: AlgoliaProduct | null) => void;

  tryOnGlasses: AlgoliaProduct | null;
  setTryOnGlasses: (glasses: AlgoliaProduct | null) => void;
}

export const useSelectedGlassesStore = create<SelectedGlassesState>((set) => ({
  selectedGlasses: null,
  setSelectedGlasses: (glasses) => set({ selectedGlasses: glasses }),

  tryOnGlasses: null,
  setTryOnGlasses: (glasses) => set({ tryOnGlasses: glasses }),
}));
