import { create } from "zustand";
import { AlgoliaProduct } from "@/types/algoliaTypes";
interface GlassesStore {
  uuid: string;
  recommendations: AlgoliaProduct[];
  faceShape: string;
  setGlassesData: (data: {
    uuid: string;
    recommendations: AlgoliaProduct[];
    faceShape: string;
  }) => void;
}

export const useRecommendetGlassStore = create<GlassesStore>((set) => ({
  uuid: "",
  recommendations: [],
  faceShape: "",
  setGlassesData: ({ uuid, recommendations, faceShape }) =>
    set({ uuid, recommendations, faceShape }),
}));
