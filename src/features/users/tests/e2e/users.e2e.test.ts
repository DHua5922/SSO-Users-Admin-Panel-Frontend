import { expect, type Page, test } from "@playwright/test";
import { METHOD_DELETE, METHOD_PUT } from "../../../../shared/constants";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	getButton,
	getDialog,
	getLabel,
	getTableRow,
	getText,
} from "../../../../shared/tests/playwright/locator";
import { logInTest } from "../../../auth/tests/e2e/support";
import {
	ADD_USER_BUTTON_TEXT,
	ADD_USER_MODAL_TITLE,
	CONFIRM_DELETE_USER_BUTTON_TEXT,
	DELETE_USER_BUTTON_ARIA_LABEL_PREFIX,
	EDIT_USER_BUTTON_ARIA_LABEL_PREFIX,
	UPDATE_USER_BUTTON_TEXT,
	UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_PASSWORD_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
	USERS_API_ROUTE,
} from "../../constants";
import { goToUsersPage, openAddUserModal } from "../playwright/navigation";

test("edit user", async ({ page }) => {
	const password = "password123";

	const newUser = {
		username: `new user ${Date.now()}`,
		email: `newuser${Date.now()}@example.com`,
		role: "admin",
	};
	const updatedUser = {
		...newUser,
		username: `updated user ${Date.now()}`,
		email: `updateduser${Date.now()}@example.com`,
	};

	await logInTest(page);
	await goToUsersPage(page);
	await addUser(page, newUser, password);
	await updateUser(
		page,
		newUser.username,
		updatedUser.username,
		updatedUser.email,
	);
	await deleteUser(page, updatedUser.username, updatedUser.email);
});

async function addUser(
	page: Page,
	newUser: { username: string; email: string; role: string },
	password: string,
) {
	await openAddUserModal(page);

	const dialog = getDialog(page, ADD_USER_MODAL_TITLE);
	await expect(dialog).toBeVisible();

	await getLabel(UPSERT_USER_FORM_USERNAME_LABEL, dialog).fill(
		newUser.username,
	);
	await getLabel(UPSERT_USER_FORM_EMAIL_LABEL, dialog).fill(newUser.email);
	await getLabel(UPSERT_USER_FORM_ROLE_LABEL, dialog).selectOption(
		newUser.role,
	);
	await getLabel(UPSERT_USER_FORM_PASSWORD_LABEL, dialog).fill(password);
	await getLabel(UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL, dialog).fill(
		password,
	);

	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
			method: METHOD_PUT,
		}),
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
		}),
		getButton(dialog, ADD_USER_BUTTON_TEXT).click(),
	]);

	await expect(getText(page, newUser.username)).toBeVisible();
	await expect(getText(page, newUser.email)).toBeVisible();
}

async function updateUser(
	page: Page,
	newUsername: string,
	updatedUsername: string,
	updatedEmail: string,
) {
	const editUserButton = getButton(
		page,
		`${EDIT_USER_BUTTON_ARIA_LABEL_PREFIX} ${newUsername}`,
	);
	await expect(editUserButton).toBeVisible();
	await editUserButton.click();

	const updateUserDialog = getDialog(page, `edit ${newUsername}`);
	await expect(updateUserDialog).toBeVisible();
	await getLabel(UPSERT_USER_FORM_USERNAME_LABEL, updateUserDialog).fill(
		updatedUsername,
	);
	await getLabel(UPSERT_USER_FORM_EMAIL_LABEL, updateUserDialog).fill(
		updatedEmail,
	);

	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
			method: METHOD_PUT,
		}),
		getButton(updateUserDialog, UPDATE_USER_BUTTON_TEXT).click(),
	]);

	const row = getTableRow(page, `${updatedUsername} ${updatedEmail}`);
	await expect(row).toBeVisible();
	await expect(getText(row, updatedUsername)).toBeVisible();
	await expect(getText(row, updatedEmail)).toBeVisible();
}

async function deleteUser(
	page: Page,
	updatedUsername: string,
	updatedEmail: string,
) {
	const deleteUserButton = getButton(
		page,
		`${DELETE_USER_BUTTON_ARIA_LABEL_PREFIX} ${updatedUsername}`,
	);
	await expect(deleteUserButton).toBeVisible();
	await deleteUserButton.click();

	const deleteUserDialog = getDialog(page, `delete ${updatedUsername}`);
	await expect(deleteUserDialog).toBeVisible();
	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
			method: METHOD_DELETE,
		}),
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
		}),
		getButton(deleteUserDialog, CONFIRM_DELETE_USER_BUTTON_TEXT).click(),
	]);

	const updatedRow = getTableRow(page, `${updatedUsername} ${updatedEmail}`);
	await expect(updatedRow).toHaveCount(0);
}
