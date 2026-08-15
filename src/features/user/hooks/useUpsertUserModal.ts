import useUserStore from "../store";
import { useShallow } from "zustand/react/shallow";

export default function useUpsertUserModal() {
  const { chosenUser, showUpsertUserModal, setShowUpsertUserModal } =
    useUserStore(
      useShallow((state) => ({
        chosenUser: state.chosenUser,
        showUpsertUserModal: state.showUpsertUserModal,
        setShowUpsertUserModal: state.setShowUpsertUserModal,
      })),
    );

  return {
    title: chosenUser._id ? `Edit ${chosenUser.username}` : "Add User",
    open: showUpsertUserModal,
    onOpenChange: (show: boolean) => setShowUpsertUserModal(show),
  };
}
