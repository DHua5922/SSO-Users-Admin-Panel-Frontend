import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Role } from "../schemas";

interface Store {
	showUpsertRoleModal: boolean;
	showDeleteRoleModal: boolean;
	chosenRole: Role | null;
	setShowUpsertRoleModal: (show: boolean) => void;
	setShowDeleteRoleModal: (show: boolean) => void;
	setChosenRole: (role: Role) => void;
	resetChosenRole: () => void;
}

const useRoleManagementStore = create<Store>()(
	devtools((set) => ({
		showUpsertRoleModal: false,
		showDeleteRoleModal: false,
		chosenRole: null,
		setShowUpsertRoleModal: (show) => set({ showUpsertRoleModal: show }),
		setShowDeleteRoleModal: (show) => set({ showDeleteRoleModal: show }),
		setChosenRole: (role) => set({ chosenRole: role }),
		resetChosenRole: () =>
			set({
				chosenRole: null,
			}),
	})),
);

export default useRoleManagementStore;
