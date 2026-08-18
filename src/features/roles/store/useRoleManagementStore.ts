import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Role } from "../schemas";

interface Store {
	showUpsertRoleModal: boolean;
	showDeleteRoleModal: boolean;
	chosenRole: Role;
	setShowUpsertRoleModal: (show: boolean) => void;
	setShowDeleteRoleModal: (show: boolean) => void;
	setChosenRole: (role: Role) => void;
	resetChosenRole: () => void;
}

const defaultChosenRole: Role = {
	_id: "",
	name: "",
	description: "",
};

const useRoleManagementStore = create<Store>()(
	devtools((set) => ({
		showUpsertRoleModal: false,
		showDeleteRoleModal: false,
		chosenRole: defaultChosenRole,
		setShowUpsertRoleModal: (show) => set({ showUpsertRoleModal: show }),
		setShowDeleteRoleModal: (show) => set({ showDeleteRoleModal: show }),
		setChosenRole: (role) => set({ chosenRole: role }),
		resetChosenRole: () =>
			set({
				chosenRole: defaultChosenRole,
			}),
	})),
);

export default useRoleManagementStore;
