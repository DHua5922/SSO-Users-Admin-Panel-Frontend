import type { UserEvent } from "@testing-library/user-event";
import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findAlert,
	findDialog,
	findTable,
	findText,
	getText,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { mockGetRolesSuccessApi } from "../../../roles/tests/mocks/roleHandlers";
import {
	ADD_USER_MODAL_TITLE,
	CANNOT_UPSERT_USER_ERROR_MESSAGE,
	EMPTY_USERS_MESSAGE,
	USERS_PATH,
} from "../../constants";
import {
	getConfirmPasswordLabel,
	getEmailLabel,
	getPasswordInput,
	getRoleLabel,
	getUsernameLabel,
} from "../react-testing-library/inputs";
import {
	findShowDeleteUserModalButton,
	findShowEditUserModalButton,
	getAddUserButton,
} from "./locators";
import {
	mockGetUsersSuccessApi,
	mockUpsertUserFailureApi,
	mockUpsertUserSuccessApi,
} from "./mocks/userHandlers";

const password = "password123";

beforeEach(() => {
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersSuccessApi([]);
});

test("should add user", async () => {
	const newUser = {
		_id: "new-user-id",
		email: "new-user@example.com",
		username: "new-user",
		role: "admin-role-id",
		systemManaged: false,
	};
	mockUpsertUserSuccessApi();
	const { event } = renderApp(USERS_PATH);

	const addUserDialog = await openAndFillAddUserForm(event, newUser);
	mockGetUsersSuccessApi([newUser]);
	await event.click(getAddUserButton(addUserDialog));

	const usersTable = await findTable("");
	expect(await findText(newUser.username, usersTable)).toBeTruthy();
	expect(await findText(newUser.email, usersTable)).toBeTruthy();
	expect(await findText(newUser.role, usersTable)).toBeTruthy();
	expect(
		await findShowEditUserModalButton(newUser.username, usersTable),
	).toBeTruthy();
	expect(
		await findShowDeleteUserModalButton(newUser.username, usersTable),
	).toBeTruthy();
});

test("should show error when failing to add user", async () => {
	const rejectedUser = {
		username: "rejected-user",
		role: "admin-role-id",
		email: "rejected-user@example.com",
	};
	mockUpsertUserFailureApi();
	const { event } = renderApp(USERS_PATH);

	const addUserDialog = await openAndFillAddUserForm(event, rejectedUser);
	await event.click(getAddUserButton(addUserDialog));

	const alert = await findAlert("", addUserDialog);
	expect(getText(CANNOT_UPSERT_USER_ERROR_MESSAGE, alert)).toBeTruthy();
});

async function openAndFillAddUserForm(
	event: UserEvent,
	userFields: { username: string; role: string; email: string },
) {
	expect(await findText(EMPTY_USERS_MESSAGE)).toBeTruthy();

	const openAddUserDialogButton = getAddUserButton();
	await event.click(openAddUserDialogButton);

	const dialog = await findDialog(ADD_USER_MODAL_TITLE);
	expect(dialog).toBeTruthy();

	await event.type(getUsernameLabel(dialog), userFields.username);
	await event.selectOptions(getRoleLabel(dialog), userFields.role);
	await event.type(getEmailLabel(dialog), userFields.email);
	await event.type(getPasswordInput(), password);
	await event.type(getConfirmPasswordLabel(dialog), password);

	return dialog;
}
