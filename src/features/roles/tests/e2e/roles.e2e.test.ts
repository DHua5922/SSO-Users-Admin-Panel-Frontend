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

const id = crypto.randomUUID();

const newRole = {
	name: `new role ${id}`,
	description: `Description for new role ${id}`,
};

const updatedRole = {
	name: `updated role ${id}`,
	description: `Description for updated role ${id}`,
};

test("manages a role", async ({ page }) => {
	await setup(page);
	await addRole(page);
	await editRole(page);
	await deleteRole(page);
});

async function setup(page: Page) {
	await logInTest(page);
	await goToRolesPage(page);
}

async function addRole(page: Page) {
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

async function editRole(page: Page) {
	const editRoleButton = getButton(
		page,
		`${EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${newRole.name}`,
	);
	await expect(editRoleButton).toBeVisible();
	await editRoleButton.click();

	const updateRoleDialog = getDialog(page, `edit ${newRole.name}`);
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

	const row = getTableRow(
		page,
		`${updatedRole.name} ${updatedRole.description}`,
	);
	await expect(row).toBeVisible();
	await expect(getText(row, updatedRole.name)).toBeVisible();
	await expect(getText(row, updatedRole.description)).toBeVisible();
}

async function deleteRole(page: Page) {
	const deleteRoleButton = getButton(
		page,
		`${DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${updatedRole.name}`,
	);
	await expect(deleteRoleButton).toBeVisible();
	await deleteRoleButton.click();

	const deleteRoleDialog = getDialog(page, `delete ${updatedRole.name}`);
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

	const updatedRow = getTableRow(
		page,
		`${updatedRole.name} ${updatedRole.description}`,
	);
	await expect(updatedRow).toHaveCount(0);
}
