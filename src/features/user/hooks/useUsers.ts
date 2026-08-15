import useUserStore from "../store";
import { useShallow } from "zustand/react/shallow";
import { USERS_QUERY_KEY } from "../constants";
import { getUsersApi } from "../api";
import type { User } from "../schemas";
import { useQuery } from "@tanstack/react-query";
import { filterUsers } from "../utilities";

export default function useUsers(searchInput: string, chosenRoleId: string) {
  const { setShowUpsertUserModal, setShowDeleteUserModal, setChosenUser } =
    useUserStore(
      useShallow((state) => ({
        setShowUpsertUserModal: state.setShowUpsertUserModal,
        setShowDeleteUserModal: state.setShowDeleteUserModal,
        setChosenUser: state.setChosenUser,
      })),
    );

  const {
    isPending,
    isError,
    data: users,
    error,
  } = useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: getUsersApi,
    retry: false,
  });

  const filteredUsers = filterUsers(users || [], searchInput, chosenRoleId);

  const onClickEditUser = (user: User) => {
    setShowUpsertUserModal(true);
    setChosenUser(user);
  };

  const onClickDeleteUser = (user: User) => {
    setShowDeleteUserModal(true);
    setChosenUser(user);
  };

  return {
    listViewProps: {
      isLoading: isPending,
      isEmpty: !filteredUsers?.length,
      isError,
      errorMessage: error?.message,
    },
    userTableProps: {
      list: filteredUsers || [],
      onClickEditUser,
      onClickDeleteUser,
    },
  };
}
