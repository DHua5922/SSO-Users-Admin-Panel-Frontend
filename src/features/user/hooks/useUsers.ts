import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useShallow } from "zustand/react/shallow";
import { getUsersApi } from "../api";
import { USERS_QUERY_KEY } from "../constants";
import type { User } from "../schemas";
import useUserStore from "../store";
import { filterUsers } from "../utilities";

export default function useUsers(searchInput: string, chosenRoleId: string) {
	const { setShowUpsertUserModal, setShowDeleteUserModal, setChosenUser } =
		useUserStore(
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

	const filteredUsers = filterUsers(users || [], searchInput, chosenRoleId);

	const onClickEditUser = (user: User) => {
		setShowUpsertUserModal(true);
		setChosenUser(user);
	};

	const onClickDeleteUser = (user: User) => {
		setShowDeleteUserModal(true);
		setChosenUser(user);
	};

	return {
		listViewProps: {
			isLoading: isPending,
			isEmpty: !filteredUsers?.length,
			isError,
			errorMessage:
				axios.isAxiosError(error) && typeof error.response?.data === "string"
					? error.response.data
					: error?.message,
		},
		userTableProps: {
			list: filteredUsers || [],
			onClickEditUser,
			onClickDeleteUser,
		},
	};
}
