import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../shared/tests/react-testing-library/locator";
import { SYSTEM_MANAGED_USER_DELETE_ARIA_LABEL_PREFIX } from "../constants";
import { testUser } from "../tests/fixtures";
import UserTable from "./UserTable";

test("disables deletion for a system-managed user", () => {
	const systemManagedUser = { ...testUser, systemManaged: true };

	render(
		<UserTable
			list={[systemManagedUser]}
			onClickEditUser={vi.fn()}
			onClickDeleteUser={vi.fn()}
		/>,
	);

	const deleteButton = getButton(
		`${SYSTEM_MANAGED_USER_DELETE_ARIA_LABEL_PREFIX} ${systemManagedUser.username}`,
	);
	expect(deleteButton.hasAttribute("disabled")).toBe(true);
});

test("user table has no automatically detectable accessibility violations", async () => {
	render(
		<UserTable
			list={[testUser]}
			onClickEditUser={vi.fn()}
			onClickDeleteUser={vi.fn()}
		/>,
	);

	await expectNoAccessibilityViolations();
});
