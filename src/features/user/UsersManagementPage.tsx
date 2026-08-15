import useRoles from "../../hooks/useRoles.ts";
import {
  CONFIRM_DELETE_USER_BUTTON_TEXT,
  EMPTY_USERS_MESSAGE,
} from "./constants.ts";
import useUserTableControls from "./hooks/useUserTableControls.ts";
import useUpsertUserModal from "./hooks/useUpsertUserModal.ts";
import useDeleteUserModal from "./hooks/useDeleteUserModal.ts";
import useUpsertUserForm from "./hooks/useUpsertUserForm.ts";
import Modal from "../../components/modal/Modal.tsx";
import UpsertUserForm from "./components/UpsertUserForm.tsx/index.tsx";
import DeleteConfirmationModal from "../../components/modal/DeleteConfirmationModal.tsx";
import ListView from "../../components/ListView/index.tsx";
import UserTable from "./components/UserTable.tsx";
import UserTableSkeleton from "./components/UserTableSkeleton.tsx";
import UserTableControls from "./components/UserTableControls.tsx";
import useUsers from "./hooks/useUsers.ts";

export default function UsersManagementPage() {
  const roles = useRoles();
  const { searchBarProps, roleSelectControlProps, onClickAddUser } =
    useUserTableControls();
  const { listViewProps, userTableProps } = useUsers(
    searchBarProps.value,
    roleSelectControlProps.value,
  );
  const upsertUserModal = useUpsertUserModal();
  const deleteUserModal = useDeleteUserModal();
  const upsertUserForm = useUpsertUserForm();

  return (
    <div className="py-8 px-12">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <div className="card">
        <UserTableControls
          searchBarProps={searchBarProps}
          roleSelectProps={{ ...roles, ...roleSelectControlProps }}
          onClickAddUser={onClickAddUser}
        />

        <div className="p-8 overflow-x-auto">
          <ListView
            {...listViewProps}
            emptyListMessage={EMPTY_USERS_MESSAGE}
            loadingChildren={<UserTableSkeleton />}
          >
            <UserTable {...userTableProps} className="w-full" />
          </ListView>
        </div>
      </div>

      <Modal {...upsertUserModal}>
        <UpsertUserForm {...upsertUserForm} roleSelectProps={roles} />
      </Modal>

      <DeleteConfirmationModal
        {...deleteUserModal}
        question="Are you sure you want to delete this user? This action cannot be undone."
        deleteButtonText={CONFIRM_DELETE_USER_BUTTON_TEXT}
      />
    </div>
  );
}
