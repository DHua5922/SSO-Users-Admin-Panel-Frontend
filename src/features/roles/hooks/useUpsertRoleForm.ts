import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import useModalErrorHandler from "../../../shared/hooks/useModalErrorHandler";
import { upsertRoleApi } from "../api";
import {
	ADD_ROLE_BUTTON_TEXT,
	UPDATE_ROLE_BUTTON_TEXT,
} from "../constants/button";
import { ROLES_QUERY_KEY } from "../constants/general";
import type { UpsertRoleFormData } from "../schemas";
import useRoleStore from "../useRoleStore";

export default function useUpsertRoleForm() {
	const { setShowUpsertRoleModal, chosenRole, resetChosenRole } = useRoleStore(
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
		isEditing: !!chosenRole._id,
		isSubmitting: isPending,
		name: chosenRole.name,
		description: chosenRole.description,
		submitButtonText: chosenRole._id
			? UPDATE_ROLE_BUTTON_TEXT
			: ADD_ROLE_BUTTON_TEXT,
		onSubmit: (formValues: UpsertRoleFormData) => {
			mutate({ ...formValues, _id: chosenRole._id });
		},
	};
}
