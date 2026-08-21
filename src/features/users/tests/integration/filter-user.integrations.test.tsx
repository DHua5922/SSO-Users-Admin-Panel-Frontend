import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findLabel,
	findSearchBox,
	findTableRow,
	findText,
	queryTableRow,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { mockGetRolesSuccessApi } from "../../../roles/tests/integration/roleHandlers";
import {
	CANNOT_LOAD_USERS_ERROR_MESSAGE,
	SEARCH_USERS_ARIA_LABEL,
	USERS_PATH,
} from "../../constants";
import { mockGetUsersFailureApi, mockGetUsersSuccessApi } from "./userHandlers";

test("should show error message when failing to load users", async () => {
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersFailureApi();
	renderApp(USERS_PATH);

	expect(await findText(CANNOT_LOAD_USERS_ERROR_MESSAGE)).toBeTruthy();
});

test("should filter users by search input and role", async () => {
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

	const searchInput = await findSearchBox(SEARCH_USERS_ARIA_LABEL);
	await event.type(searchInput, "smi");

	const matchingRow = await findTableRow(users[1].username);
	expect(await findText(users[1].username, matchingRow)).toBeTruthy();
	expect(await findText(users[1].email, matchingRow)).toBeTruthy();
	expect(await findText(users[1].role, matchingRow)).toBeTruthy();

	expect(queryTableRow(users[0].username)).toBeNull();

	await event.clear(searchInput);
	await event.selectOptions(
		await findLabel("Filter users by role"),
		roles[0]._id,
	);

	expect(await findTableRow(users[0].username)).toBeTruthy();
	expect(queryTableRow(users[1].username)).toBeNull();
});
