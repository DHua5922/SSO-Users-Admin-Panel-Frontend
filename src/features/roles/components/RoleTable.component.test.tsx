import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../shared/tests/react-testing-library/locator";
import { SYSTEM_MANAGED_ROLE_DELETE_ARIA_LABEL_PREFIX } from "../constants";
import RoleTable from "./RoleTable";

test("disables deletion for a system-managed role", () => {
	const systemManagedRole = {
		_id: "system-role-id",
		name: "system-role",
		description: "System-managed role",
		systemManaged: true,
	};

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
	const role = {
		_id: "role-id",
		name: "admin",
		description: "Administrator role",
		systemManaged: false,
	};

	render(
		<RoleTable
			list={[role]}
			onClickEditRole={vi.fn()}
			onClickDeleteRole={vi.fn()}
		/>,
	);

	await expectNoAccessibilityViolations();
});
