import { create } from "zustand";
import { GlassesItem } from "@/types/glasses";

interface SelectedGlassesState {
  selectedGlasses: GlassesItem | null;
  setSelectedGlasses: (glasses: GlassesItem) => void;
}

export const useSelectedGlassesStore = create<SelectedGlassesState>((set) => ({
  selectedGlasses: null,
  setSelectedGlasses: (glasses) => set({ selectedGlasses: glasses }),
}));
