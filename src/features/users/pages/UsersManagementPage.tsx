import ListView from "../../../shared/components/ListView/index.tsx";
import DeleteConfirmationModal from "../../../shared/components/Modal/DeleteConfirmationModal.tsx";
import Modal from "../../../shared/components/Modal/Modal.tsx";
import useRoles from "../../roles/hooks/useRoles.ts";
import UpsertUserForm from "../components/UpsertUserForm/index.tsx";
import UserTable from "../components/UserTable.tsx";
import UserTableControls from "../components/UserTableControls.tsx";
import UserTableSkeleton from "../components/UserTableSkeleton.tsx";
import { CONFIRM_DELETE_USER_BUTTON_TEXT } from "../constants/button";
import { EMPTY_USERS_MESSAGE } from "../constants/message";
import useDeleteUserModal from "../hooks/useDeleteUserModal.ts";
import useUpsertUserForm from "../hooks/useUpsertUserForm.ts";
import useUpsertUserModal from "../hooks/useUpsertUserModal.ts";
import useUsers from "../hooks/useUsers.ts";
import useUserTableControls from "../hooks/useUserTableControls.ts";

export default function UsersManagementPage() {
	const roles = useRoles();
	const tableControls = useUserTableControls();
	const users = useUsers(
		tableControls.searchBarProps.value,
		tableControls.roleSelectControlProps.value,
	);
	const upsertUserModal = useUpsertUserModal();
	const deleteUserModal = useDeleteUserModal();
	const upsertUserForm = useUpsertUserForm();

	return (
		<div className="py-8 px-12">
			<h1 className="text-3xl font-bold mb-4">Users</h1>

			<div className="card">
				<UserTableControls
					{...tableControls}
					roleSelectProps={{
						...roles,
						...tableControls.roleSelectControlProps,
					}}
				/>

				<div className="p-8 overflow-x-auto">
					<ListView
						{...users.listViewProps}
						emptyListMessage={EMPTY_USERS_MESSAGE}
						loadingChildren={<UserTableSkeleton />}
					>
						<UserTable {...users.userTableProps} className="w-full" />
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
