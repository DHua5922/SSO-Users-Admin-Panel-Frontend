import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { testRoles } from "../tests/fixtures";
import RoleTable from "./RoleTable";

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
