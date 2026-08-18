import { logInTest } from "../../../../features/auth/tests/e2e/support";
import { expect, test } from "../../../../shared/tests/accessibility";

test("should not have any automatically detectable WCAG A or AA violations", async ({
	page,
	makeAxeBuilder,
}) => {
	await logInTest(page);

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});
