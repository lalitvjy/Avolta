import { useTakeSelfieStore } from "@/store/useTakeSelfie";
import { useUserInfo } from "@/store/useUserInfo";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";

export const resetUserFlow = () => {
  useTakeSelfieStore.getState().setSelfie("");
  useUserInfo.getState().setIsChecked(false);
  useUserInfo.getState().setName("");
  useUserInfo.getState().setEmail("");
  useSelectedGlassesStore.getState().setSelectedGlasses(null);
  useSelectedGlassesStore.getState().setTryOnGlasses(null);
  useRecommendetGlassStore.getState().setGlassesData({
    uuid: "",
    recommendations: [],
    faceShape: "",
  });
  useFavoriteGlassesStore.getState().clearFavorites?.();
};
