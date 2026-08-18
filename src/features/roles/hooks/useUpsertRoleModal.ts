import { useShallow } from "zustand/react/shallow";
import { ADD_ROLE_MODAL_TITLE } from "../constants/general";
import useRoleManagementStore from "../store/useRoleManagementStore";

export default function useUpsertRoleModal() {
	const { chosenRole, showUpsertRoleModal, setShowUpsertRoleModal } =
		useRoleManagementStore(
			useShallow((state) => ({
				chosenRole: state.chosenRole,
				showUpsertRoleModal: state.showUpsertRoleModal,
				setShowUpsertRoleModal: state.setShowUpsertRoleModal,
			})),
		);

	return {
		title: chosenRole._id ? `Edit ${chosenRole.name}` : ADD_ROLE_MODAL_TITLE,
		open: showUpsertRoleModal,
		onOpenChange: (show: boolean) => setShowUpsertRoleModal(show),
	};
}
