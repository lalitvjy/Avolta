import { create } from "zustand";

interface ModalState {
  isBookmarkModalOpen: boolean;
  openBookmarkModal: () => void;
  closeBookmarkModal: () => void;
}

export const useBookmarkModalStore = create<ModalState>((set) => ({
  isBookmarkModalOpen: false,
  openBookmarkModal: () => set({ isBookmarkModalOpen: true }),
  closeBookmarkModal: () => set({ isBookmarkModalOpen: false }),
}));
