import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "../schemas";

interface Store {
	showUpsertUserModal: boolean;
	showDeleteUserModal: boolean;
	selectedUser: User | null;
	setShowUpsertUserModal: (show: boolean) => void;
	setShowDeleteUserModal: (show: boolean) => void;
	setChosenUser: (user: User) => void;
	resetChosenUser: () => void;
}

const useUserManagementStore = create<Store>()(
	devtools((set) => ({
		showUpsertUserModal: false,
		showDeleteUserModal: false,
		selectedUser: null,
		setShowUpsertUserModal: (show) => set({ showUpsertUserModal: show }),
		setShowDeleteUserModal: (show) => set({ showDeleteUserModal: show }),
		setChosenUser: (user) => set({ selectedUser: user }),
		resetChosenUser: () =>
			set({
				selectedUser: null,
			}),
	})),
);

export default useUserManagementStore;
