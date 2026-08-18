import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../../shared/tests/react-testing-library/accessibility";
import RoleTableControls from ".";

test("role table controls have no automatically detectable accessibility violations", async () => {
	render(
		<RoleTableControls
			searchBarProps={{ onChange: vi.fn() }}
			onClickAddRole={vi.fn()}
		/>,
	);

	await expectNoAccessibilityViolations();
});
