import ListView from "../../../shared/components/ListView/index.tsx";
import DeleteConfirmationModal from "../../../shared/components/Modal/DeleteConfirmationModal/index.tsx";
import Modal from "../../../shared/components/Modal/Modal/index.tsx";
import RoleTable from "../components/RoleTable/index.tsx";
import RoleTableControls from "../components/RoleTableControls/index.tsx";
import RoleTableSkeleton from "../components/RoleTableSkeleton.tsx";
import UpsertRoleForm from "../components/UpsertRoleForm/index.tsx";
import { CONFIRM_DELETE_ROLE_BUTTON_TEXT } from "../constants/button.ts";
import { EMPTY_ROLES_MESSAGE } from "../constants/message.ts";
import useDeleteRoleModal from "../hooks/useDeleteRoleModal.ts";
import useRoleListView from "../hooks/useRoleListView.ts";
import useRoleTableControls from "../hooks/useRoleTableControls.ts";
import useUpsertRoleForm from "../hooks/useUpsertRoleForm.ts";
import useUpsertRoleModal from "../hooks/useUpsertRoleModal.ts";

export default function RolesManagementPage() {
	const tableControls = useRoleTableControls();
	const roles = useRoleListView(tableControls.searchBarProps.value);
	const upsertRoleModal = useUpsertRoleModal();
	const deleteRoleModal = useDeleteRoleModal();
	const upsertRoleForm = useUpsertRoleForm();

	return (
		<div className="py-8 px-12">
			<h1 className="text-3xl font-bold mb-4">Roles</h1>

			<div className="card">
				<RoleTableControls {...tableControls} />

				<div className="p-8 overflow-x-auto">
					<ListView
						{...roles.listViewProps}
						emptyListMessage={EMPTY_ROLES_MESSAGE}
						loadingChildren={<RoleTableSkeleton />}
					>
						<RoleTable {...roles.roleTableProps} className="w-full" />
					</ListView>
				</div>
			</div>

			<Modal {...upsertRoleModal}>
				<UpsertRoleForm {...upsertRoleForm} />
			</Modal>

			<DeleteConfirmationModal
				{...deleteRoleModal}
				loadingButtonText="Deleting Role..."
				question="Are you sure you want to delete this role? This action cannot be undone."
				deleteButtonText={CONFIRM_DELETE_ROLE_BUTTON_TEXT}
			/>
		</div>
	);
}
