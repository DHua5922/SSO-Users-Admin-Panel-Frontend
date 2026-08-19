import { useShallow } from "zustand/react/shallow";
import useUserManagementStore from "../store/useUserManagementStore";

export default function useUpsertUserModal() {
	const { selectedUser, showUpsertUserModal, setShowUpsertUserModal } =
		useUserManagementStore(
			useShallow((state) => ({
				selectedUser: state.selectedUser,
				showUpsertUserModal: state.showUpsertUserModal,
				setShowUpsertUserModal: state.setShowUpsertUserModal,
			})),
		);

	return {
		title: selectedUser ? `Edit ${selectedUser.username}` : "Add User",
		open: showUpsertUserModal,
		onOpenChange: (show: boolean) => setShowUpsertUserModal(show),
	};
}
