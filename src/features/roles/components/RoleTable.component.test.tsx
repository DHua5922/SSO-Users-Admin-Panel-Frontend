import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../shared/tests/react-testing-library/locator";
import { SYSTEM_MANAGED_ROLE_DELETE_ARIA_LABEL_PREFIX } from "../constants";
import { testRoles } from "../tests/fixtures";
import RoleTable from "./RoleTable";

test("disables deletion for a system-managed role", () => {
	const systemManagedRole = { ...testRoles[0], systemManaged: true };

	render(
		<RoleTable
			list={[systemManagedRole]}
			onClickEditRole={vi.fn()}
			onClickDeleteRole={vi.fn()}
		/>,
	);

	const deleteButton = getButton(
		`${SYSTEM_MANAGED_ROLE_DELETE_ARIA_LABEL_PREFIX} ${systemManagedRole.name}`,
	);
	expect(deleteButton.hasAttribute("disabled")).toBe(true);
});

test("role table has no automatically detectable accessibility violations", async () => {
	render(
		<RoleTable
			list={testRoles}
			onClickEditRole={vi.fn()}
			onClickDeleteRole={vi.fn()}
		/>,
	);

	await expectNoAccessibilityViolations();
});
