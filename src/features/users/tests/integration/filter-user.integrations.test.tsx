import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findTableRow,
	findText,
	queryTableRow,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { mockGetRolesSuccessApi } from "../../../roles/tests/mocks/roleHandlers";
import { CANNOT_LOAD_USERS_ERROR_MESSAGE, USERS_PATH } from "../../constants";
import { findSearchBar } from "../react-testing-library/inputs";
import {
	mockGetUsersFailureApi,
	mockGetUsersSuccessApi,
} from "./mocks/userHandlers";

test("should show error message when failing to load users", async () => {
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersFailureApi();
	renderApp(USERS_PATH);

	expect(await findText(CANNOT_LOAD_USERS_ERROR_MESSAGE)).toBeTruthy();
});

test("should filter users by username and email from search bar (case insensitive)", async () => {
	const roles = [
		{
			_id: "admin-role-id",
			name: "Admin",
			description: "Administrators",
			systemManaged: true,
		},
		{
			_id: "user-role-id",
			name: "User",
			description: "Standard users",
			systemManaged: false,
		},
	];
	const users = [
		{
			_id: "john-user-id",
			username: "John Doe",
			email: "johndoe@example.com",
			role: roles[0]._id,
			systemManaged: true,
		},
		{
			_id: "jane-user-id",
			username: "Jane Smith",
			email: "janesmith@example.com",
			role: roles[1]._id,
			systemManaged: false,
		},
	];

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi(roles);
	mockGetUsersSuccessApi(users);

	const { event } = renderApp(USERS_PATH);

	await event.type(await findSearchBar(), "smi");

	const matchingRow = await findTableRow(users[1].username);
	expect(await findText(users[1].username, matchingRow)).toBeTruthy();
	expect(await findText(users[1].email, matchingRow)).toBeTruthy();
	expect(await findText(users[1].role, matchingRow)).toBeTruthy();

	expect(queryTableRow(users[0].username)).toBeNull();
});
