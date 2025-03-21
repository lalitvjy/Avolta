import { create } from "zustand";

interface UserInfoState {
  isUserModalOpen: boolean;
  name: string;
  email: string;
  isChecked: boolean;
  openUserModal: () => void;
  closeUserModal: () => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  resetUserInfo: () => void;
  setIsChecked: (checked: boolean) => void;
}

export const useUserInfo = create<UserInfoState>((set) => ({
  isUserModalOpen: false,
  name: "",
  email: "",
  isChecked: false,
  openUserModal: () => set({ isUserModalOpen: true }),
  closeUserModal: () => set({ isUserModalOpen: false }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  resetUserInfo: () => set({ name: "", email: "" }),
  setIsChecked: (checked) => set({ isChecked: checked }),
}));
