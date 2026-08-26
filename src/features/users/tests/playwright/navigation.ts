import { expect, type Page } from "@playwright/test";
import {
	getButton,
	getDialog,
	getLink,
	openMobileMenu,
	waitForApiResponse,
	waitForDialogToFinishOpening,
} from "../../../../shared/tests/playwright";
import {
	ADD_USER_BUTTON_TEXT,
	ADD_USER_MODAL_TITLE,
	USERS_API_ROUTE,
} from "../../constants";

export async function goToUsersPage(page: Page) {
	await openMobileMenu(page);

	const usersLink = getLink(page, "users");
	await expect(usersLink).toBeVisible();

	const usersResponsePromise = waitForApiResponse({
		page,
		apiEndpoint: USERS_API_ROUTE,
	});
	await Promise.all([usersResponsePromise, usersLink.click()]);
}

export async function openAddUserModal(page: Page) {
	const addUserButton = getButton(page, ADD_USER_BUTTON_TEXT);
	await expect(addUserButton).toBeVisible();
	await addUserButton.click();

	const dialog = getDialog(page, ADD_USER_MODAL_TITLE);
	await waitForDialogToFinishOpening(dialog);
}
