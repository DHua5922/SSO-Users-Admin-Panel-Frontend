import { expect, type Page, test } from "@playwright/test";
import { METHOD_DELETE, METHOD_PUT } from "../../../../shared/constants";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	getButton,
	getDialog,
	getTableRow,
	getText,
} from "../../../../shared/tests/playwright/locator";
import { logInTest } from "../../../auth/tests/e2e/support";
import {
	ADD_ROLE_BUTTON_TEXT,
	ADD_ROLE_MODAL_TITLE,
	CONFIRM_DELETE_ROLE_BUTTON_TEXT,
	DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX,
	EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX,
	ROLES_API_ROUTE,
	UPDATE_ROLE_BUTTON_TEXT,
	UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
	UPSERT_ROLE_FORM_NAME_LABEL,
} from "../../constants";
import { goToRolesPage, openAddRoleDialog } from "../playwright/navigation";

type RoleFields = {
	name: string;
	description: string;
};

test("manages a role", async ({ page }) => {
	const uniqueId = crypto.randomUUID();
	const newRole = {
		name: `new role ${uniqueId}`,
		description: `Description for new role ${uniqueId}`,
	};
	const updatedRole = {
		name: `updated role ${uniqueId}`,
		description: `Description for updated role ${uniqueId}`,
	};

	await setup(page);
	await addRole(page, newRole);
	await editRole(page, newRole, updatedRole);
	await deleteRole(page, updatedRole);
});

async function setup(page: Page) {
	await logInTest(page);
	await goToRolesPage(page);
}

async function addRole(page: Page, newRole: RoleFields) {
	await openAddRoleDialog(page);

	const addRoleDialog = getDialog(page, ADD_ROLE_MODAL_TITLE);
	await expect(addRoleDialog).toBeVisible();

	await addRoleDialog
		.getByLabel(UPSERT_ROLE_FORM_NAME_LABEL)
		.fill(newRole.name);
	await addRoleDialog
		.getByLabel(UPSERT_ROLE_FORM_DESCRIPTION_LABEL)
		.fill(newRole.description);

	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: ROLES_API_ROUTE,
			method: METHOD_PUT,
		}),
		waitForApiResponse({
			page,
			apiEndpoint: ROLES_API_ROUTE,
		}),
		getButton(addRoleDialog, ADD_ROLE_BUTTON_TEXT).click(),
	]);

	await expect(getText(page, newRole.name)).toBeVisible();
	await expect(getText(page, newRole.description)).toBeVisible();
}

async function editRole(
	page: Page,
	existingRole: RoleFields,
	updatedRole: RoleFields,
) {
	const editRoleButton = getButton(
		page,
		`${EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${existingRole.name}`,
	);
	await expect(editRoleButton).toBeVisible();
	await editRoleButton.click();

	const updateRoleDialog = getDialog(page, `edit ${existingRole.name}`);
	await expect(updateRoleDialog).toBeVisible();
	await updateRoleDialog
		.getByLabel(UPSERT_ROLE_FORM_NAME_LABEL)
		.fill(updatedRole.name);
	await updateRoleDialog
		.getByLabel(UPSERT_ROLE_FORM_DESCRIPTION_LABEL)
		.fill(updatedRole.description);

	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: ROLES_API_ROUTE,
			method: METHOD_PUT,
		}),
		waitForApiResponse({
			page,
			apiEndpoint: ROLES_API_ROUTE,
		}),
		getButton(updateRoleDialog, UPDATE_ROLE_BUTTON_TEXT).click(),
	]);

	const updatedRoleRow = getTableRow(
		page,
		`${updatedRole.name} ${updatedRole.description}`,
	);
	await expect(updatedRoleRow).toBeVisible();
	await expect(getText(updatedRoleRow, updatedRole.name)).toBeVisible();
	await expect(getText(updatedRoleRow, updatedRole.description)).toBeVisible();
}

async function deleteRole(page: Page, roleToDelete: RoleFields) {
	const deleteRoleButton = getButton(
		page,
		`${DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${roleToDelete.name}`,
	);
	await expect(deleteRoleButton).toBeVisible();
	await deleteRoleButton.click();

	const deleteRoleDialog = getDialog(page, `delete ${roleToDelete.name}`);
	await expect(deleteRoleDialog).toBeVisible();
	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: ROLES_API_ROUTE,
			method: METHOD_DELETE,
		}),
		waitForApiResponse({
			page,
			apiEndpoint: ROLES_API_ROUTE,
		}),
		getButton(deleteRoleDialog, CONFIRM_DELETE_ROLE_BUTTON_TEXT).click(),
	]);

	const deletedRoleRow = getTableRow(
		page,
		`${roleToDelete.name} ${roleToDelete.description}`,
	);
	await expect(deletedRoleRow).toHaveCount(0);
}
