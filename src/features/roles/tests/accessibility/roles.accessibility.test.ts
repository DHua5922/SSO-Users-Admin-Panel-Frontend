import { logInTest } from "../../../../features/auth/tests/e2e/support";
import {
	expect,
	test,
} from "../../../../shared/tests/playwright/accessibility";
import { goToRolesPage, openAddRoleDialog } from "../playwright/navigation";

test("should not have any automatically detectable WCAG A or AA violations", async ({
	page,
	makeAxeBuilder,
}) => {
	await logInTest(page);
	await goToRolesPage(page);

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});

test("should not have any detectable WCAG A or AA violations when showing popup", async ({
	page,
	makeAxeBuilder,
}) => {
	await logInTest(page);
	await goToRolesPage(page);

	await openAddRoleDialog(page);

	const accessibilityScanResults = await makeAxeBuilder().analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});
