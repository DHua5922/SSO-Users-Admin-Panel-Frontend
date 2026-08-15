import useUserStore from "../store";
import { useShallow } from "zustand/react/shallow";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserApi } from "../api";
import useModalErrorHandler from "../../../hooks/useModalErrorHandler";
import { USERS_QUERY_KEY } from "../constants";

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
