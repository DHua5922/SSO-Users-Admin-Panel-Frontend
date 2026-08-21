import {
	expect,
	test,
} from "../../../../shared/tests/playwright/accessibility";
import { getButton } from "../../../../shared/tests/playwright/locator";
import { LOGIN_TEXT } from "../../constants";
import { loadPage } from "../playwright/environment";

test("should not have any automatically detectable WCAG A or AA violations", async ({
	page,
	makeAxeBuilder,
}) => {
	await loadPage(page);
	await expect(getButton(page, LOGIN_TEXT)).toBeVisible();

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});
