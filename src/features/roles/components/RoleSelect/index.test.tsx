import { render } from "@testing-library/react";
import {
	DEFAULT_ROLE_SELECT_OPTION,
	LOADING_ROLES_TEXT,
} from "../../../../shared/constants";
import type { Role } from "../../../../shared/schemas";
import { getText } from "../../../../shared/tests/react-testing-library/locator";
import RoleSelect from ".";

test("renders loading state", () => {
	renderRoleSelect(true, false, "");
	expect(getText(LOADING_ROLES_TEXT)).toBeTruthy();
});

test("renders error state", () => {
	const errorMessage = "Error loading roles";

	renderRoleSelect(false, true, errorMessage);

	expect(getText(errorMessage)).toBeTruthy();
});

test("renders list of roles", () => {
	const roles: Role[] = [
		{ _id: "1", name: "Admin", description: "Admin role" },
		{ _id: "2", name: "User", description: "User role" },
	];
	const roleNames = roles.map((role) => role.name);

	renderRoleSelect(false, false, "", roles);

	[DEFAULT_ROLE_SELECT_OPTION, ...roleNames].forEach((text) => {
		expect(getText(text)).toBeTruthy();
	});
});

function renderRoleSelect(
	isLoading: boolean,
	isError: boolean,
	errorMessage: string,
	list?: Role[],
) {
	render(
		<RoleSelect
			isLoading={isLoading}
			isError={isError}
			errorMessage={errorMessage}
			list={list}
		/>,
	);
}
