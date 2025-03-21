import { create } from "zustand";
import { AlgoliaProduct } from "@/types/algoliaTypes";

interface FavoriteGlassesState {
  favorites: AlgoliaProduct[];
  toggleFavorite: (glasses: AlgoliaProduct) => void;
}

export const useFavoriteGlassesStore = create<FavoriteGlassesState>(
  (set, get) => ({
    favorites: [],
    toggleFavorite: (glasses) => {
      const { favorites } = get();
      const isAlreadyFavorite = favorites.some(
        (item) => item.objectID === glasses.objectID
      );

      set({
        favorites: isAlreadyFavorite
          ? favorites.filter((item) => item.objectID !== glasses.objectID)
          : [...favorites, glasses],
      });
    },
  })
);
