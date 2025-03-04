import { create } from "zustand";

interface ModalState {
  isDetailModalOpen: boolean;
  openDetailModal: () => void;
  closeDetailModal: () => void;
}

export const useDetailModalStore = create<ModalState>((set) => ({
  isDetailModalOpen: false,
  openDetailModal: () => set({ isDetailModalOpen: true }),
  closeDetailModal: () => set({ isDetailModalOpen: false }),
}));
