import { create } from "zustand";

interface ModalState {
  isTermsModalOpen: boolean;
  openTermsModal: () => void;
  closeTermsModal: () => void;
}

export const useTermsModalStore = create<ModalState>((set) => ({
  isTermsModalOpen: false,
  openTermsModal: () => set({ isTermsModalOpen: true }),
  closeTermsModal: () => set({ isTermsModalOpen: false }),
}));
