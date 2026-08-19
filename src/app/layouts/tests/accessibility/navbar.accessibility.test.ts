import { logInTest } from "../../../../features/auth/tests/e2e/support";
import {
	MOBILE_NAVIGATION_ID,
	OPEN_NAVIGATION_MENU_TEXT,
} from "../../../../shared/constants";
import {
	expect,
	test,
} from "../../../../shared/tests/playwright/accessibility";

test("mobile navigation exposes links to the keyboard only when expanded", async ({
	page,
}) => {
	await page.setViewportSize({ width: 375, height: 667 });
	await logInTest(page);

	const toggle = page.locator(
		`button[aria-controls="${MOBILE_NAVIGATION_ID}"]`,
	);
	await expect(toggle).toHaveAccessibleName(OPEN_NAVIGATION_MENU_TEXT);
	const mobileNavigation = page.locator(`#${MOBILE_NAVIGATION_ID}`);
	const mobileHomeLink = mobileNavigation.getByRole("link", {
		name: "Home",
		includeHidden: true,
	});

	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	await expect(mobileNavigation).toHaveAttribute("aria-hidden", "true");
	await expect(mobileNavigation).toHaveAttribute("inert", "");

	await toggle.focus();
	await page.keyboard.press("Tab");
	await expect(mobileHomeLink).not.toBeFocused();

	await toggle.click();
	await expect(toggle).toHaveAttribute("aria-expanded", "true");
	await expect(mobileNavigation).toHaveAttribute("aria-hidden", "false");
	await expect(mobileNavigation).not.toHaveAttribute("inert", "");

	await toggle.focus();
	await page.keyboard.press("Tab");
	await expect(mobileHomeLink).toBeFocused();
});
