import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useShallow } from "zustand/react/shallow";
import type { Role } from "../../../shared/schemas";
import { getAllRolesApi } from "../api";
import { ROLES_QUERY_KEY } from "../constants/general";
import useRoleStore from "../useRoleStore";
import { filterRoles } from "../utilities/filterRoles";

export default function useRoleListView(searchInput: string) {
	const { setShowUpsertRoleModal, setShowDeleteRoleModal, setChosenRole } =
		useRoleStore(
			useShallow((state) => ({
				setShowUpsertRoleModal: state.setShowUpsertRoleModal,
				setShowDeleteRoleModal: state.setShowDeleteRoleModal,
				setChosenRole: state.setChosenRole,
			})),
		);

	const {
		isPending,
		isError,
		data: users,
		error,
	} = useQuery({
		queryKey: [ROLES_QUERY_KEY],
		queryFn: getAllRolesApi,
		retry: false,
	});

	const filteredRoles = filterRoles(users || [], searchInput);

	const onClickEditRole = (role: Role) => {
		setShowUpsertRoleModal(true);
		setChosenRole(role);
	};

	const onClickDeleteRole = (role: Role) => {
		setShowDeleteRoleModal(true);
		setChosenRole(role);
	};

	return {
		listViewProps: {
			isLoading: isPending,
			isEmpty: !filteredRoles?.length,
			isError,
			errorMessage:
				axios.isAxiosError(error) && typeof error.response?.data === "string"
					? error.response.data
					: error?.message,
		},
		roleTableProps: {
			list: filteredRoles || [],
			onClickEditRole,
			onClickDeleteRole,
		},
	};
}
