import { create } from "zustand";

interface UserInfoState {
  isUserModalOpen: boolean;
  name: string;
  email: string;
  openUserModal: () => void;
  closeUserModal: () => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  resetUserInfo: () => void;
}

export const useUserInfo = create<UserInfoState>((set) => ({
  isUserModalOpen: false,
  name: "",
  email: "",
  openUserModal: () => set({ isUserModalOpen: true }),
  closeUserModal: () => set({ isUserModalOpen: false }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  resetUserInfo: () => set({ name: "", email: "" }),
}));
