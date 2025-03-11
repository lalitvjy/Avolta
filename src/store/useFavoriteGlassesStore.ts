import { create } from "zustand";
import { AlgoliaProduct } from "@/types/algoliaTypes";

interface FavoriteGlassesState {
  favorites: AlgoliaProduct[]; // ✅ Make this an array instead of `null`
  toggleFavorite: (glasses: AlgoliaProduct) => void;
}

export const useFavoriteGlassesStore = create<FavoriteGlassesState>(
  (set, get) => ({
    favorites: [], // ✅ Initialize with an empty array, not `null`
    toggleFavorite: (glasses) => {
      const { favorites } = get();
      const isAlreadyFavorite = favorites.some(
        (item) => item.objectID === glasses.objectID // ✅ Corrected property name
      );

      set({
        favorites: isAlreadyFavorite
          ? favorites.filter((item) => item.objectID !== glasses.objectID)
          : [...favorites, glasses],
      });
    },
  })
);
