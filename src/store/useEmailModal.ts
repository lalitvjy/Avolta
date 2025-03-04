import { create } from "zustand";

interface ModalState {
  isEmailModalOpen: boolean;
  openEmailModal: () => void;
  closeEmailModal: () => void;
}

export const useEmailModalStore = create<ModalState>((set) => ({
  isEmailModalOpen: false,
  openEmailModal: () => set({ isEmailModalOpen: true }),
  closeEmailModal: () => set({ isEmailModalOpen: false }),
}));
