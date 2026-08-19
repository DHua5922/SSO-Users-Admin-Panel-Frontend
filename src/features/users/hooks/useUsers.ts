import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { parseError } from "../../../shared/utilities/parseError";
import { getUsersApi } from "../api";
import { USERS_QUERY_KEY } from "../constants";
import type { User } from "../schemas";
import useUserManagementStore from "../store/useUserManagementStore";
import { filterUsers } from "../utilities/filterUsers";

export default function useUsers(searchInput: string, selectedRoleId: string) {
	const { setShowUpsertUserModal, setShowDeleteUserModal, setChosenUser } =
		useUserManagementStore(
			useShallow((state) => ({
				setShowUpsertUserModal: state.setShowUpsertUserModal,
				setShowDeleteUserModal: state.setShowDeleteUserModal,
				setChosenUser: state.setChosenUser,
			})),
		);

	const {
		isPending,
		isError,
		data: users,
		error,
	} = useQuery({
		queryKey: [USERS_QUERY_KEY],
		queryFn: getUsersApi,
		retry: false,
	});

	const filteredUsers = filterUsers(users || [], searchInput, selectedRoleId);

	const onClickEditUser = (user: User) => {
		setShowUpsertUserModal(true);
		setChosenUser(user);
	};

	const onClickDeleteUser = (user: User) => {
		if (user.systemManaged) return;
		setShowDeleteUserModal(true);
		setChosenUser(user);
	};

	return {
		listViewProps: {
			isLoading: isPending,
			isEmpty: !filteredUsers?.length,
			isError,
			errorMessage: error ? parseError(error) : "",
		},
		userTableProps: {
			list: filteredUsers || [],
			onClickEditUser,
			onClickDeleteUser,
		},
	};
}
