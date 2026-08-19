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
import useUserManagementStore from "../store/useUserManagementStore";

export default function useUpsertUserForm() {
	const { setShowUpsertUserModal, chosenUser, resetChosenUser } =
		useUserManagementStore(
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
		isEditing: chosenUser !== null,
		isSubmitting: isPending,
		username: chosenUser?.username ?? "",
		email: chosenUser?.email ?? "",
		initialRole: chosenUser?.role ?? "",
		loadingButtonText: chosenUser ? "Updating User..." : "Adding User...",
		submitButtonText: chosenUser
			? UPDATE_USER_BUTTON_TEXT
			: ADD_USER_BUTTON_TEXT,
		onSubmit: (formValues: UpsertUserFormData) => {
			mutate({
				...formValues,
				...(chosenUser && { _id: chosenUser._id }),
			});
		},
	};
}
