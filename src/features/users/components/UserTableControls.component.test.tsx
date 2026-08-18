import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { testRoles } from "../../roles/tests/fixtures";
import UserTableControls from "./UserTableControls";

test("user table controls have no automatically detectable accessibility violations", async () => {
	render(
		<UserTableControls
			searchBarProps={{ onChange: vi.fn() }}
			roleSelect={{
				isLoading: false,
				isError: false,
				errorMessage: "",
				list: testRoles,
			}}
			onClickAddUser={vi.fn()}
		/>,
	);

	await expectNoAccessibilityViolations();
});
