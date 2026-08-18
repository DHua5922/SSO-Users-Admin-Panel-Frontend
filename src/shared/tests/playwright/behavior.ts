import { expect, type Locator, type Page } from "@playwright/test";
import { OPEN_NAVIGATION_MENU_TEXT } from "../../constants";
import { getButton } from "./locator";

export async function openMobileMenu(page: Page) {
	const mobileMenuButton = getButton(page, OPEN_NAVIGATION_MENU_TEXT);
	const usesMobileNavigation = await page.evaluate(
		() => window.matchMedia("(max-width: 767px)").matches,
	);
	if (usesMobileNavigation) {
		await mobileMenuButton.click();
	}
}

export async function waitForDialogToFinishOpening(dialog: Locator) {
	await expect(dialog).toBeVisible();
	// The dialog fades in. Wait until it is fully opaque before axe measures
	// computed color contrast; this synchronizes with the UI, not its styling.
	await expect(dialog).toHaveCSS("opacity", "1");
}
