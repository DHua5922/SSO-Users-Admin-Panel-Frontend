import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import useModalErrorHandler from "../../../shared/hooks/useModalErrorHandler";
import { deleteRoleApi } from "../api";
import { ROLES_QUERY_KEY } from "../constants/general";
import useRoleManagementStore from "../store/useRoleManagementStore";

export default function useDeleteRoleModal() {
	const { chosenRole, showDeleteRoleModal, setShowDeleteRoleModal } =
		useRoleManagementStore(
			useShallow((state) => ({
				chosenRole: state.chosenRole,
				showDeleteRoleModal: state.showDeleteRoleModal,
				setShowDeleteRoleModal: state.setShowDeleteRoleModal,
			})),
		);
	const queryClient = useQueryClient();

	const { mutate: deleteRole, isPending } = useMutation({
		mutationFn: deleteRoleApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] });
			setShowDeleteRoleModal(false);
		},
		onError: useModalErrorHandler(),
		retry: false,
	});

	return {
		isDeleting: isPending,
		title: `Delete ${chosenRole.name}`,
		heroText: chosenRole.name,
		open: showDeleteRoleModal,
		onOpenChange: (show: boolean) => setShowDeleteRoleModal(show),
		onClickDelete: () => {
			deleteRole(chosenRole._id);
		},
	};
}
