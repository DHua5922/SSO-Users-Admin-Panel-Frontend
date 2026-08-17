import { renderApp } from "../../../../../shared/tests/react-testing-library/app";
import {
	findTableRow,
	findText,
	queryTableRow,
} from "../../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../../auth/tests/integrations/server/me";
import { ROLES_PATH } from "../../../constants/general";
import { CANNOT_LOAD_ROLES_ERROR_MESSAGE } from "../../../constants/message";
import { findSearchBar } from "../../react-testing-library/input";
import { mockGetRolesFailureApi, mockGetRolesSuccessApi } from "../../server";

beforeEach(() => {
	mockGetMeSuccessApi();
});

test("should show error message when failing to load roles", async () => {
	mockGetRolesFailureApi();
	renderApp(ROLES_PATH);

	expect(await findText(CANNOT_LOAD_ROLES_ERROR_MESSAGE)).toBeTruthy();
});

test("should filter roles by name and description from search bar (case insensitive)", async () => {
	const roles = [
		{ _id: "admin-role-id", name: "Admin", description: "Administrators" },
		{ _id: "user-role-id", name: "User", description: "Standard users" },
	];

	mockGetRolesSuccessApi(roles);

	const { event } = renderApp(ROLES_PATH);
	await event.type(await findSearchBar(), "adm");

	const matchingRow = await findTableRow(roles[0].name);
	expect(await findText(roles[0].name, matchingRow)).toBeTruthy();
	expect(await findText(roles[0].description, matchingRow)).toBeTruthy();
	expect(queryTableRow(roles[1].name)).toBeNull();
});
