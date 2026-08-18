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
import { ADD_USER_MODAL_TITLE, USERS_PATH } from "../../constants/general";
import {
	CANNOT_UPSERT_USER_ERROR_MESSAGE,
	EMPTY_USERS_MESSAGE,
} from "../../constants/message";
import { testUser } from "../fixtures";
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
	mockUpsertUserSuccessApi();
	const { event } = renderApp(USERS_PATH);

	const dialog = await openAndFillAddUserForm(event);
	mockGetUsersSuccessApi([testUser]);
	await event.click(getAddUserButton(dialog));

	const usersTable = await findTable("");
	expect(await findText(testUser.username, usersTable)).toBeTruthy();
	expect(await findText(testUser.email, usersTable)).toBeTruthy();
	expect(await findText(testUser.role, usersTable)).toBeTruthy();
	expect(
		await findShowEditUserModalButton(testUser.username, usersTable),
	).toBeTruthy();
	expect(
		await findShowDeleteUserModalButton(testUser.username, usersTable),
	).toBeTruthy();
});

test("should show error when failing to add user", async () => {
	mockUpsertUserFailureApi();
	const { event } = renderApp(USERS_PATH);

	const dialog = await openAndFillAddUserForm(event);
	await event.click(getAddUserButton(dialog));

	const alert = await findAlert("", dialog);
	expect(getText(CANNOT_UPSERT_USER_ERROR_MESSAGE, alert)).toBeTruthy();
});

async function openAndFillAddUserForm(event: UserEvent) {
	expect(await findText(EMPTY_USERS_MESSAGE)).toBeTruthy();

	const showAddUserModalButton = getAddUserButton();
	expect(showAddUserModalButton).toBeTruthy();
	await event.click(showAddUserModalButton);

	const dialog = await findDialog(ADD_USER_MODAL_TITLE);
	expect(dialog).toBeTruthy();

	await event.type(getUsernameLabel(dialog), testUser.username);
	await event.selectOptions(getRoleLabel(dialog), testUser.role);
	await event.type(getEmailLabel(dialog), testUser.email);
	await event.type(getPasswordInput(), password);
	await event.type(getConfirmPasswordLabel(dialog), password);

	return dialog;
}
