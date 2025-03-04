import { create } from "zustand";

interface TakeSelfieState {
  selfie: string | null;
  setSelfie: (image: string | null) => void;
}

export const useTakeSelfieStore = create<TakeSelfieState>((set) => ({
  selfie: null,
  setSelfie: (image) => set({ selfie: image }),
}));
