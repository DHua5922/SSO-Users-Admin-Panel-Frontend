import { expect, test } from "@playwright/test";
import {
	METHOD_DELETE,
	METHOD_PUT,
	OPEN_NAVIGATION_MENU_TEXT,
} from "../../../../shared/constants";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	getButton,
	getDialog,
	getLabel,
	getLink,
	getTableRow,
	getText,
} from "../../../../shared/tests/playwright/locator";
import { logInTest } from "../../../auth/tests/e2e/support";
import {
	ADD_USER_BUTTON_TEXT,
	CONFIRM_DELETE_USER_BUTTON_TEXT,
	UPDATE_USER_BUTTON_TEXT,
} from "../../constants/button";
import { ADD_USER_MODAL_TITLE, USERS_API_ROUTE } from "../../constants/general";
import {
	UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_PASSWORD_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
} from "../../constants/input";

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

	const mobileMenuButton = getButton(page, OPEN_NAVIGATION_MENU_TEXT);
	const usesMobileNavigation = await page.evaluate(
		() => window.matchMedia("(max-width: 767px)").matches,
	);
	if (usesMobileNavigation) {
		await mobileMenuButton.click();
	}

	const usersLink = getLink(page, "users");
	await expect(usersLink).toBeVisible();

	await Promise.all([
		waitForApiResponse({
			page,
			apiEndpoint: USERS_API_ROUTE,
		}),
		usersLink.click(),
	]);

	const addUserButton = getButton(page, ADD_USER_BUTTON_TEXT);
	await expect(addUserButton).toBeVisible();
	await addUserButton.click();

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

	const editUserButton = getButton(
		page,
		`button that show popup for editing ${newUser.username}`,
	);
	await expect(editUserButton).toBeVisible();
	await editUserButton.click();

	const updateUserDialog = getDialog(page, `edit ${newUser.username}`);
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

	const row = getTableRow(page, `${updatedUser.username} ${updatedUser.email}`);
	await expect(row).toBeVisible();
	await expect(getText(row, updatedUser.username)).toBeVisible();
	await expect(getText(row, updatedUser.email)).toBeVisible();

	const deleteUserButton = getButton(
		page,
		`button that show popup for deleting ${updatedUser.username}`,
	);
	await expect(deleteUserButton).toBeVisible();
	await deleteUserButton.click();

	const deleteUserDialog = getDialog(page, `delete ${updatedUser.username}`);
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

	const updatedRow = getTableRow(
		page,
		`${updatedUser.username} ${updatedUser.email}`,
	);
	await expect(updatedRow).toHaveCount(0);
});
