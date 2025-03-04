import { create } from "zustand";

interface ModalState {
  isReceiveSelfieModalOpen: boolean;
  openReceiveSelfieModal: () => void;
  closeReceiveSelfieModal: () => void;
}

export const useReceiveSelfieModalStore = create<ModalState>((set) => ({
  isReceiveSelfieModalOpen: false,
  openReceiveSelfieModal: () => set({ isReceiveSelfieModalOpen: true }),
  closeReceiveSelfieModal: () => set({ isReceiveSelfieModalOpen: false }),
}));
