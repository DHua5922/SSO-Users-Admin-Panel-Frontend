import { type ChangeEvent, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useUserManagementStore from "../store/useUserManagementStore";

export default function useUserTableControls() {
	const [searchInput, setSearchInput] = useState("");
	const [chosenRoleId, setChosenRoleId] = useState("");

	const { resetChosenUser, setShowUpsertUserModal } = useUserManagementStore(
		useShallow((state) => ({
			resetChosenUser: state.resetChosenUser,
			setShowUpsertUserModal: state.setShowUpsertUserModal,
		})),
	);

	return {
		searchBarProps: {
			value: searchInput,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setSearchInput(e.target.value),
		},
		roleSelectControlProps: {
			value: chosenRoleId,
			onChange: (e: ChangeEvent<HTMLSelectElement>) =>
				setChosenRoleId(e.target.value),
		},
		onClickAddUser: () => {
			resetChosenUser();
			setShowUpsertUserModal(true);
		},
	};
}
