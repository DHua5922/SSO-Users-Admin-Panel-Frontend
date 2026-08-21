import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { parseError } from "../../../shared/utilities/parseError";
import { getAllRolesApi } from "../api";
import { ROLES_QUERY_KEY } from "../constants";
import type { Role } from "../schemas";
import useRoleManagementStore from "../store/useRoleManagementStore";
import { filterRoles } from "../utilities/filterRoles";

export default function useRoleListView(searchInput: string) {
	const { setShowUpsertRoleModal, setShowDeleteRoleModal, setChosenRole } =
		useRoleManagementStore(
			useShallow((state) => ({
				setShowUpsertRoleModal: state.setShowUpsertRoleModal,
				setShowDeleteRoleModal: state.setShowDeleteRoleModal,
				setChosenRole: state.setChosenRole,
			})),
		);

	const {
		isPending,
		isError,
		data: roles,
		error,
	} = useQuery({
		queryKey: [ROLES_QUERY_KEY],
		queryFn: getAllRolesApi,
		retry: false,
	});

	const filteredRoles = filterRoles(roles || [], searchInput);

	const onClickEditRole = (role: Role) => {
		setChosenRole(role);
		setShowUpsertRoleModal(true);
	};

	const onClickDeleteRole = (role: Role) => {
		if (role.systemManaged) return;

		setChosenRole(role);
		setShowDeleteRoleModal(true);
	};

	return {
		listViewProps: {
			isLoading: isPending,
			isEmpty: !filteredRoles?.length,
			isError,
			errorMessage: error ? parseError(error) : "",
		},
		roleTableProps: {
			list: filteredRoles || [],
			onClickEditRole,
			onClickDeleteRole,
		},
	};
}
