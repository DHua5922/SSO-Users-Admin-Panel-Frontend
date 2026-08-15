import { useState, type ChangeEvent } from "react";
import useUserStore from "../store";
import { useShallow } from "zustand/react/shallow";

export default function useUserTableControls() {
  const [searchInput, setSearchInput] = useState("");
  const [chosenRoleId, setChosenRoleId] = useState("");

  const { resetChosenUser, setShowUpsertUserModal } = useUserStore(
    useShallow((state) => ({
      resetChosenUser: state.resetChosenUser,
      setShowUpsertUserModal: state.setShowUpsertUserModal,
    })),
  );

  return {
    searchBarProps: {
      value: searchInput,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setSearchInput(e.target.value),
    },
    roleSelectControlProps: {
      value: chosenRoleId,
      onChange: (e: ChangeEvent<HTMLSelectElement>) =>
        setChosenRoleId(e.target.value),
    },
    onClickAddUser: () => {
      resetChosenUser();
      setShowUpsertUserModal(true);
    },
  };
}
