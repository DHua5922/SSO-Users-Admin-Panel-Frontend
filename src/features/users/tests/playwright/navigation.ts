import { expect, type Page } from "@playwright/test";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	openMobileMenu,
	waitForDialogToFinishOpening,
} from "../../../../shared/tests/playwright/behavior";
import {
	getButton,
	getDialog,
	getLink,
} from "../../../../shared/tests/playwright/locator";
import { ADD_USER_BUTTON_TEXT } from "../../constants/button";
import { ADD_USER_MODAL_TITLE, USERS_API_ROUTE } from "../../constants/general";

export async function goToUsersPage(page: Page) {
	await openMobileMenu(page);

	const usersLink = getLink(page, "users");
	await expect(usersLink).toBeVisible();

	const getUsersResponse = waitForApiResponse({
		page,
		apiEndpoint: USERS_API_ROUTE,
	});
	await Promise.all([getUsersResponse, usersLink.click()]);
}

export async function openAddUserModal(page: Page) {
	const addUserButton = getButton(page, ADD_USER_BUTTON_TEXT);
	await expect(addUserButton).toBeVisible();
	await addUserButton.click();

	const dialog = getDialog(page, ADD_USER_MODAL_TITLE);
	await waitForDialogToFinishOpening(dialog);
}
