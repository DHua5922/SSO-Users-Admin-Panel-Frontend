import {
	expect,
	test,
} from "../../../../shared/tests/playwright/accessibility";
import { loadPage } from "../playwright/environment";

test("should not have any automatically detectable WCAG A or AA violations", async ({
	page,
	makeAxeBuilder,
}) => {
	await loadPage(page);

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});
