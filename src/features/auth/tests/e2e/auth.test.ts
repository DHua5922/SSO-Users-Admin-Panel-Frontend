import { expect, type Page, test } from "@playwright/test";
import {
	AUTH_BASE_API_ROUTE,
	CURRENT_USER_TOGGLE_ARIA_LABEL,
	LOGOUT_BUTTON_TEXT,
} from "../../../../features/auth/constants";
import {
	APP_LOGO_ALT_TEXT,
	METHOD_POST,
	OPEN_NAVIGATION_MENU_TEXT,
} from "../../../../shared/constants";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import { getButton } from "../../../../shared/tests/playwright/locator";
import { getLoginButton } from "./locator";
import { logInTest } from "./support";

test("authenticates user", async ({ page }) => {
	await logInTest(page);
	await expect(getLogo(page)).toBeVisible();
});

test("persistent login after refresh", async ({ page }) => {
	await logInTest(page);
	await page.reload();
	await expect(getLogo(page)).toBeVisible();
});

test("redirects to login page when logging out", async ({ page }) => {
	const logoutResponse = waitForApiResponse({
		page,
		apiEndpoint: `${AUTH_BASE_API_ROUTE}/logout`,
		method: METHOD_POST,
	});
	await logInTest(page);
	await expect(getLogo(page)).toBeVisible();

	const mobileMenuToggleButton = getButton(page, OPEN_NAVIGATION_MENU_TEXT);
	if (await mobileMenuToggleButton.isVisible()) {
		await mobileMenuToggleButton.click();
	}

	const userMenuButton = getButton(page, CURRENT_USER_TOGGLE_ARIA_LABEL);
	await expect(userMenuButton).toBeVisible();
	await userMenuButton.click();

	await Promise.all([
		logoutResponse,
		getButton(page, LOGOUT_BUTTON_TEXT).click(),
	]);

	await expect(getLoginButton(page)).toBeVisible();
});

function getLogo(page: Page) {
	return page.getByAltText(APP_LOGO_ALT_TEXT);
}
