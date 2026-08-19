import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import useModalErrorHandler from "../../../shared/hooks/useModalErrorHandler";
import { upsertRoleApi } from "../api";
import {
	ADD_ROLE_BUTTON_TEXT,
	ROLES_QUERY_KEY,
	UPDATE_ROLE_BUTTON_TEXT,
} from "../constants";
import type { UpsertRoleFormData } from "../schemas";
import useRoleManagementStore from "../store/useRoleManagementStore";

export default function useUpsertRoleForm() {
	const { setShowUpsertRoleModal, chosenRole, resetChosenRole } =
		useRoleManagementStore(
			useShallow((state) => ({
				setShowUpsertRoleModal: state.setShowUpsertRoleModal,
				chosenRole: state.chosenRole,
				resetChosenRole: state.resetChosenRole,
			})),
		);
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: upsertRoleApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] });
			setShowUpsertRoleModal(false);
			resetChosenRole();
		},
		onError: useModalErrorHandler(),
		retry: false,
	});

	return {
		isSubmitting: isPending,
		name: chosenRole?.name ?? "",
		description: chosenRole?.description ?? "",
		loadingButtonText: chosenRole ? "Updating Role..." : "Adding Role...",
		submitButtonText: chosenRole
			? UPDATE_ROLE_BUTTON_TEXT
			: ADD_ROLE_BUTTON_TEXT,
		onSubmit: (formValues: UpsertRoleFormData) => {
			mutate({
				...formValues,
				...(chosenRole && { _id: chosenRole._id }),
			});
		},
	};
}
