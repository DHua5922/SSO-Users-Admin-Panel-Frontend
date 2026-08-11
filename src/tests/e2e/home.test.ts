import { expect, type Page, test } from "@playwright/test";
import { logInTest } from "./support/auth";

test("authenticates user", async ({ page }) => {
	await logInTest(page);
	await expect(getLogo(page)).toBeVisible();
});

test("persistent login after refresh", async ({ page }) => {
	await logInTest(page);
	await page.reload();
	await expect(getLogo(page)).toBeVisible();
});

function getLogo(page: Page) {
	return page.getByAltText(/logo/i);
}
