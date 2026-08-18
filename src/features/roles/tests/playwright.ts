import { expect, type Page } from "@playwright/test";
import { waitForApiResponse } from "../../../shared/tests/playwright/api";
import {
	openMobileMenu,
	waitForDialogToFinishOpening,
} from "../../../shared/tests/playwright/behavior";
import {
	getButton,
	getDialog,
	getLink,
} from "../../../shared/tests/playwright/locator";
import { ADD_ROLE_BUTTON_TEXT } from "../constants/button";
import { ADD_ROLE_MODAL_TITLE, ROLES_API_ROUTE } from "../constants/general";

export async function goToRolesPage(page: Page) {
	await openMobileMenu(page);

	const rolesLink = getLink(page, "roles");
	await expect(rolesLink).toBeVisible();

	const getRolesResponse = waitForApiResponse({
		page,
		apiEndpoint: ROLES_API_ROUTE,
	});
	await Promise.all([getRolesResponse, rolesLink.click()]);
}

export async function openAddRoleDialog(page: Page) {
	const addRoleButton = getButton(page, ADD_ROLE_BUTTON_TEXT);
	await expect(addRoleButton).toBeVisible();
	await addRoleButton.click();

	const dialog = getDialog(page, ADD_ROLE_MODAL_TITLE);
	await waitForDialogToFinishOpening(dialog);
}
