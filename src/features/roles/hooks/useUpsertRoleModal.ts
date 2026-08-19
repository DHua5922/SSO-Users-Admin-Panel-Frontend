import { useShallow } from "zustand/react/shallow";
import { ADD_ROLE_MODAL_TITLE } from "../constants";
import useRoleManagementStore from "../store/useRoleManagementStore";

export default function useUpsertRoleModal() {
	const { selectedRole, showUpsertRoleModal, setShowUpsertRoleModal } =
		useRoleManagementStore(
			useShallow((state) => ({
				selectedRole: state.selectedRole,
				showUpsertRoleModal: state.showUpsertRoleModal,
				setShowUpsertRoleModal: state.setShowUpsertRoleModal,
			})),
		);

	return {
		title: selectedRole ? `Edit ${selectedRole.name}` : ADD_ROLE_MODAL_TITLE,
		open: showUpsertRoleModal,
		onOpenChange: (show: boolean) => setShowUpsertRoleModal(show),
	};
}
