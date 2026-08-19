import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "../schemas";

interface Store {
	showUpsertUserModal: boolean;
	showDeleteUserModal: boolean;
	chosenUser: User | null;
	setShowUpsertUserModal: (show: boolean) => void;
	setShowDeleteUserModal: (show: boolean) => void;
	setChosenUser: (user: User) => void;
	resetChosenUser: () => void;
}

const useUserManagementStore = create<Store>()(
	devtools((set) => ({
		showUpsertUserModal: false,
		showDeleteUserModal: false,
		chosenUser: null,
		setShowUpsertUserModal: (show) => set({ showUpsertUserModal: show }),
		setShowDeleteUserModal: (show) => set({ showDeleteUserModal: show }),
		setChosenUser: (user) => set({ chosenUser: user }),
		resetChosenUser: () =>
			set({
				chosenUser: null,
			}),
	})),
);

export default useUserManagementStore;
