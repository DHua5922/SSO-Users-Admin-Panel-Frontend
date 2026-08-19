import { useShallow } from "zustand/react/shallow";
import useUserManagementStore from "../store/useUserManagementStore";

export default function useUpsertUserModal() {
	const { chosenUser, showUpsertUserModal, setShowUpsertUserModal } =
		useUserManagementStore(
			useShallow((state) => ({
				chosenUser: state.chosenUser,
				showUpsertUserModal: state.showUpsertUserModal,
				setShowUpsertUserModal: state.setShowUpsertUserModal,
			})),
		);

	return {
		title: chosenUser ? `Edit ${chosenUser.username}` : "Add User",
		open: showUpsertUserModal,
		onOpenChange: (show: boolean) => setShowUpsertUserModal(show),
	};
}
