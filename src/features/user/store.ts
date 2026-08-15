import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "./schemas";

interface Store {
  showUpsertUserModal: boolean;
  showDeleteUserModal: boolean;
  chosenUser: User;
  setShowUpsertUserModal: (show: boolean) => void;
  setShowDeleteUserModal: (show: boolean) => void;
  setChosenUser: (user: User) => void;
  resetChosenUser: () => void;
}

const defaultChosenUser: User = {
  _id: "",
  username: "",
  email: "",
  role: "",
};

const useUserStore = create<Store>()(
  devtools((set) => ({
    showUpsertUserModal: false,
    showDeleteUserModal: false,
    chosenUser: defaultChosenUser,
    setShowUpsertUserModal: (show) => set({ showUpsertUserModal: show }),
    setShowDeleteUserModal: (show) => set({ showDeleteUserModal: show }),
    setChosenUser: (user) => set({ chosenUser: user }),
    resetChosenUser: () =>
      set({
        chosenUser: defaultChosenUser,
      }),
  })),
);

export default useUserStore;
