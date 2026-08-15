import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import useModalErrorHandler from "../../../shared/hooks/useModalErrorHandler";
import { upsertUserApi } from "../api";
import {
	ADD_USER_BUTTON_TEXT,
	UPDATE_USER_BUTTON_TEXT,
	USERS_QUERY_KEY,
} from "../constants";
import type { UpsertUserFormData } from "../schemas";
import useUserStore from "../useUserStore";

export default function useUpsertUserForm() {
	const { setShowUpsertUserModal, chosenUser, resetChosenUser } = useUserStore(
		useShallow((state) => ({
			setShowUpsertUserModal: state.setShowUpsertUserModal,
			chosenUser: state.chosenUser,
			resetChosenUser: state.resetChosenUser,
		})),
	);
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: upsertUserApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
			setShowUpsertUserModal(false);
			resetChosenUser();
		},
		onError: useModalErrorHandler(),
		retry: false,
	});

	return {
		isEditing: !!chosenUser._id,
		isSubmitting: isPending,
		username: chosenUser.username,
		email: chosenUser.email,
		role: chosenUser.role,
		submitButtonText: chosenUser._id
			? UPDATE_USER_BUTTON_TEXT
			: ADD_USER_BUTTON_TEXT,
		onSubmit: (formValues: UpsertUserFormData) => {
			mutate({ ...formValues, _id: chosenUser._id });
		},
	};
}
