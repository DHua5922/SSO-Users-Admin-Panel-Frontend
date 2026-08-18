import { render } from "@testing-library/react";
import {
	DEFAULT_ROLE_SELECT_OPTION,
	LOADING_ROLES_TEXT,
} from "../../../../shared/constants";
import { expectNoAccessibilityViolations } from "../../../../shared/tests/react-testing-library/accessibility";
import {
	getSelect,
	getText,
} from "../../../../shared/tests/react-testing-library/locator";
import RoleSelect from ".";

const roles = [
	{ _id: "1", name: "Admin", description: "Admin role" },
	{ _id: "2", name: "User", description: "User role" },
];

test("renders loading state", () => {
	render(<RoleSelect isLoading={true} list={[]} />);

	const select = getSelect("") as HTMLSelectElement;
	expect(select.disabled).toBe(true);
	expect(select.textContent).toContain(LOADING_ROLES_TEXT);
});

test("renders list of roles", () => {
	const roleNames = roles.map((role) => role.name);

	render(<RoleSelect isLoading={false} list={roles} />);

	[DEFAULT_ROLE_SELECT_OPTION, ...roleNames].forEach((text) => {
		expect(getText(text)).toBeTruthy();
	});
});

test.each([true, false])(
	"has no automatically detectable accessibility violations",
	async (isLoading) => {
		render(
			<RoleSelect
				aria-label="Choose role"
				isLoading={isLoading}
				list={isLoading ? [] : roles}
			/>,
		);
		await expectNoAccessibilityViolations();
	},
);
