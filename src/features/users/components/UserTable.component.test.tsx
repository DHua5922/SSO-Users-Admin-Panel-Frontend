import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { testUser } from "../tests/fixtures";
import UserTable from "./UserTable";

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
