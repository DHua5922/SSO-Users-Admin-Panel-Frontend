import { logInTest } from "../../../../features/auth/tests/e2e/support";
import { expect, test } from "../../../../shared/tests/accessibility";
import { goToUsersPage, openAddUserModal } from "../playwright";

test("should not have any automatically detectable WCAG A or AA violations", async ({
	page,
	makeAxeBuilder,
}) => {
	await logInTest(page);
	await goToUsersPage(page);

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});

test("should not have any detectable WCAG A or AA violations when showing popup", async ({
	page,
	makeAxeBuilder,
}) => {
	await logInTest(page);
	await goToUsersPage(page);

	await openAddUserModal(page);

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});
