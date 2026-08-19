import { type ChangeEvent, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useRoleManagementStore from "../store/useRoleManagementStore";

export default function useRoleTableControls() {
	const [searchInput, setSearchInput] = useState("");

	const { resetChosenRole, setShowUpsertRoleModal } = useRoleManagementStore(
		useShallow((state) => ({
			resetChosenRole: state.resetChosenRole,
			setShowUpsertRoleModal: state.setShowUpsertRoleModal,
		})),
	);

	return {
		searchBarProps: {
			value: searchInput,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setSearchInput(e.target.value),
		},
		onClickAddRole: () => {
			resetChosenRole();
			setShowUpsertRoleModal(true);
		},
	};
}
