import { create } from "zustand";
import { GlassesItem } from "@/types/glasses";

interface FavoriteGlassesState {
  favorites: GlassesItem[];
  toggleFavorite: (glasses: GlassesItem) => void;
}

export const useFavoriteGlassesStore = create<FavoriteGlassesState>(
  (set, get) => ({
    favorites: [],
    toggleFavorite: (glasses) => {
      const { favorites } = get();
      const isAlreadyFavorite = favorites.some(
        (item) => item.id === glasses.id
      );

      set({
        favorites: isAlreadyFavorite
          ? favorites.filter((item) => item.id !== glasses.id)
          : [...favorites, glasses],
      });
    },
  })
);
