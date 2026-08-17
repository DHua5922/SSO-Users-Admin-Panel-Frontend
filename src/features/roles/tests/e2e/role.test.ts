import { expect, type Page, test } from "@playwright/test";
import { OPEN_NAVIGATION_MENU_TEXT } from "../../../../shared/constants";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	getButton,
	getDialog,
	getLink,
	getTableRow,
	getText,
} from "../../../../shared/tests/playwright/locator";
import { logInTest } from "../../../auth/tests/e2e/support";
import {
	ADD_ROLE_BUTTON_TEXT,
	CONFIRM_DELETE_ROLE_BUTTON_TEXT,
	UPDATE_ROLE_BUTTON_TEXT,
} from "../../constants/button";
import { ADD_ROLE_MODAL_TITLE } from "../../constants/general";
import {
	UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
	UPSERT_ROLE_FORM_NAME_LABEL,
} from "../../constants/input";

const newRole = {
	name: `new role ${Date.now()}`,
	description: `Description for new role ${Date.now()}`,
};
const updatedRole = {
	name: `updated role ${Date.now()}`,
	description: `Description for updated role ${Date.now()}`,
};

test("edit role", async ({ page }) => {
	await setup(page);
	await addRole(page);
	await editRole(page);
	await deleteRole(page);
});

async function setup(page: Page) {
	await logInTest(page);

	const mobileMenuButton = getButton(page, OPEN_NAVIGATION_MENU_TEXT);
	const usesMobileNavigation = await page.evaluate(
		() => window.matchMedia("(max-width: 767px)").matches,
	);
	if (usesMobileNavigation) {
		await mobileMenuButton.click();
	}

	const usersLink = getLink(page, "roles");
	await expect(usersLink).toBeVisible();

	const getRolesResponse = waitForApiResponse({
		page,
		apiEndpoint: "/api/v1/roles",
	});
	await Promise.all([getRolesResponse, usersLink.click()]);
}

async function addRole(page: Page) {
	const addRoleButton = getButton(page, ADD_ROLE_BUTTON_TEXT);
	await expect(addRoleButton).toBeVisible();
	await addRoleButton.click();

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
			apiEndpoint: "/api/v1/roles",
			method: "PUT",
		}),
		waitForApiResponse({
			page,
			apiEndpoint: "/api/v1/roles",
			method: "GET",
		}),
		getButton(addRoleDialog, ADD_ROLE_BUTTON_TEXT).click(),
	]);

	await expect(getText(page, newRole.name)).toBeVisible();
	await expect(getText(page, newRole.description)).toBeVisible();
}

async function editRole(page: Page) {
	const editRoleButton = getButton(
		page,
		`button that show popup for editing ${newRole.name}`,
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
			apiEndpoint: "/api/v1/roles",
			method: "PUT",
		}),
		waitForApiResponse({
			page,
			apiEndpoint: "/api/v1/roles",
			method: "GET",
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
		`button that show popup for deleting ${updatedRole.name}`,
	);
	await expect(deleteRoleButton).toBeVisible();
	await deleteRoleButton.click();

	const deleteRoleDialog = getDialog(page, `delete ${updatedRole.name}`);
	await expect(deleteRoleDialog).toBeVisible();
	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: "/api/v1/roles",
			method: "DELETE",
		}),
		waitForApiResponse({
			page,
			apiEndpoint: "/api/v1/roles",
			method: "GET",
		}),
		getButton(deleteRoleDialog, CONFIRM_DELETE_ROLE_BUTTON_TEXT).click(),
	]);

	const updatedRow = getTableRow(
		page,
		`${updatedRole.name} ${updatedRole.description}`,
	);
	await expect(updatedRow).toHaveCount(0);
}
