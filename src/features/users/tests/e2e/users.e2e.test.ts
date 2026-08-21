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

type UserFields = {
	username: string;
	email: string;
	role: string;
};

test("manages a user", async ({ page }) => {
	const password = "password123";
	const uniqueId = crypto.randomUUID();
	const newUser = {
		username: `new user ${uniqueId}`,
		email: `newuser-${uniqueId}@example.com`,
		role: "admin",
	};
	const updatedUser = {
		...newUser,
		username: `updated user ${uniqueId}`,
		email: `updateduser-${uniqueId}@example.com`,
	};

	await logInTest(page);
	await goToUsersPage(page);
	await addUser(page, newUser, password);
	await updateUser(page, newUser, updatedUser);
	await deleteUser(page, updatedUser);
});

async function addUser(page: Page, newUser: UserFields, password: string) {
	await openAddUserModal(page);

	const addUserDialog = getDialog(page, ADD_USER_MODAL_TITLE);
	await expect(addUserDialog).toBeVisible();

	await getLabel(UPSERT_USER_FORM_USERNAME_LABEL, addUserDialog).fill(
		newUser.username,
	);
	await getLabel(UPSERT_USER_FORM_EMAIL_LABEL, addUserDialog).fill(
		newUser.email,
	);
	await getLabel(UPSERT_USER_FORM_ROLE_LABEL, addUserDialog).selectOption(
		newUser.role,
	);
	await getLabel(UPSERT_USER_FORM_PASSWORD_LABEL, addUserDialog).fill(password);
	await getLabel(UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL, addUserDialog).fill(
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
		getButton(addUserDialog, ADD_USER_BUTTON_TEXT).click(),
	]);

	await expect(getText(page, newUser.username)).toBeVisible();
	await expect(getText(page, newUser.email)).toBeVisible();
}

async function updateUser(
	page: Page,
	existingUser: UserFields,
	updatedUser: UserFields,
) {
	const editUserButton = getButton(
		page,
		`${EDIT_USER_BUTTON_ARIA_LABEL_PREFIX} ${existingUser.username}`,
	);
	await expect(editUserButton).toBeVisible();
	await editUserButton.click();

	const updateUserDialog = getDialog(page, `edit ${existingUser.username}`);
	await expect(updateUserDialog).toBeVisible();
	await getLabel(UPSERT_USER_FORM_USERNAME_LABEL, updateUserDialog).fill(
		updatedUser.username,
	);
	await getLabel(UPSERT_USER_FORM_EMAIL_LABEL, updateUserDialog).fill(
		updatedUser.email,
	);

	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
			method: METHOD_PUT,
		}),
		getButton(updateUserDialog, UPDATE_USER_BUTTON_TEXT).click(),
	]);

	const updatedUserRow = getTableRow(
		page,
		`${updatedUser.username} ${updatedUser.email}`,
	);
	await expect(updatedUserRow).toBeVisible();
	await expect(getText(updatedUserRow, updatedUser.username)).toBeVisible();
	await expect(getText(updatedUserRow, updatedUser.email)).toBeVisible();
}

async function deleteUser(page: Page, userToDelete: UserFields) {
	const deleteUserButton = getButton(
		page,
		`${DELETE_USER_BUTTON_ARIA_LABEL_PREFIX} ${userToDelete.username}`,
	);
	await expect(deleteUserButton).toBeVisible();
	await deleteUserButton.click();

	const deleteUserDialog = getDialog(page, `delete ${userToDelete.username}`);
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

	const deletedUserRow = getTableRow(
		page,
		`${userToDelete.username} ${userToDelete.email}`,
	);
	await expect(deletedUserRow).toHaveCount(0);
}
