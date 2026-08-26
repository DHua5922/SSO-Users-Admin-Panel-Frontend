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
	ADD_ROLE_BUTTON_TEXT,
	ADD_ROLE_MODAL_TITLE,
	ROLES_API_ROUTE,
} from "../../constants";

export async function goToRolesPage(page: Page) {
	await openMobileMenu(page);

	const rolesLink = getLink(page, "roles");
	await expect(rolesLink).toBeVisible();

	const rolesResponsePromise = waitForApiResponse({
		page,
		apiEndpoint: ROLES_API_ROUTE,
	});
	await Promise.all([rolesResponsePromise, rolesLink.click()]);
}

export async function openAddRoleDialog(page: Page) {
	const addRoleButton = getButton(page, ADD_ROLE_BUTTON_TEXT);
	await expect(addRoleButton).toBeVisible();
	await addRoleButton.click();

	const dialog = getDialog(page, ADD_ROLE_MODAL_TITLE);
	await waitForDialogToFinishOpening(dialog);
}
