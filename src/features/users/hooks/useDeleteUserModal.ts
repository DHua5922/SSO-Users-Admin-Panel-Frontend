import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import useModalErrorHandler from "../../../shared/hooks/useModalErrorHandler";
import { deleteUserApi } from "../api";
import { USERS_QUERY_KEY } from "../constants/general";
import useUserStore from "../useUserStore";

export default function useDeleteUserModal() {
	const { chosenUser, showDeleteUserModal, setShowDeleteUserModal } =
		useUserStore(
			useShallow((state) => ({
				chosenUser: state.chosenUser,
				showDeleteUserModal: state.showDeleteUserModal,
				setShowDeleteUserModal: state.setShowDeleteUserModal,
			})),
		);
	const queryClient = useQueryClient();

	const { mutate: deleteUser, isPending } = useMutation({
		mutationFn: deleteUserApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
			setShowDeleteUserModal(false);
		},
		onError: useModalErrorHandler(),
		retry: false,
	});

	return {
		isDeleting: isPending,
		title: `Delete ${chosenUser.username}`,
		heroText: chosenUser.username,
		open: showDeleteUserModal,
		onOpenChange: (show: boolean) => setShowDeleteUserModal(show),
		onClickDelete: () => {
			deleteUser(chosenUser._id);
		},
	};
}
