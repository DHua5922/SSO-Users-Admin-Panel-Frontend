import { expect, type Page, test } from "@playwright/test";
import {
	LOGOUT_BUTTON_TEXT,
	OPEN_NAVIGATION_MENU_TEXT,
	USER_MENU_TOGGLE_ARIA_LABEL,
} from "../../constants";
import { logInTest } from "./support/auth";
import { getLoginButton } from "./support/locator";

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
	const logoutResponse = page.waitForResponse(
		(response) =>
			response.url().includes("/api/v1/auth/logout") &&
			response.status() === 200,
	);

	await logInTest(page);
	await expect(getLogo(page)).toBeVisible();

	const mobileMenuButton = page.getByRole("button", {
		name: new RegExp(OPEN_NAVIGATION_MENU_TEXT, "i"),
	});
	if (await mobileMenuButton.isVisible()) {
		await mobileMenuButton.click();
	}

	const userMenuButton = page.getByRole("button", {
		name: new RegExp(USER_MENU_TOGGLE_ARIA_LABEL, "i"),
	});
	await expect(userMenuButton).toBeVisible();
	await userMenuButton.click();

	await Promise.all([
		logoutResponse,
		page
			.getByRole("button", {
				name: new RegExp(LOGOUT_BUTTON_TEXT, "i"),
			})
			.click(),
	]);

	await expect(getLoginButton(page)).toBeVisible();
});

function getLogo(page: Page) {
	return page.getByAltText(/logo/i);
}
