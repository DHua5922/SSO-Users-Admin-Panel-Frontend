import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import UserTableControls from "./UserTableControls";

test("user table controls have no automatically detectable accessibility violations", async () => {
	const role = {
		_id: "role-id",
		name: "admin",
		description: "Administrator role",
		systemManaged: false,
	};

	render(
		<UserTableControls
			searchBarProps={{ onChange: vi.fn() }}
			roleSelect={{
				isLoading: false,
				isError: false,
				errorMessage: "",
				list: [role],
			}}
			onClickAddUser={vi.fn()}
		/>,
	);

	await expectNoAccessibilityViolations();
});
