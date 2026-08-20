import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findTableRow,
	findText,
	getButton,
	getLabel,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { mockGetRolesSuccessApi } from "../../../roles/tests/mocks/roleHandlers";
import {
	UPDATE_USER_BUTTON_TEXT,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
	USERS_PATH,
} from "../../constants";
import {
	findShowDeleteUserModalButton,
	findShowEditUserModalButton,
} from "./locators";
import {
	mockGetUsersSuccessApi,
	mockUpsertUserSuccessApi,
} from "./mocks/userHandlers";

test("should update user", async () => {
	const user = {
		_id: "user-to-update-id",
		email: "user-to-update@example.com",
		username: "user-to-update",
		role: "admin-role-id",
		systemManaged: false,
	};
	const updatedUser = {
		...user,
		username: "updateduser",
		email: "updateduser@example.com",
	};

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersSuccessApi([user]);
	mockUpsertUserSuccessApi();

	const { event } = renderApp(USERS_PATH);

	const showEditUserModalButton = await findShowEditUserModalButton(
		user.username,
	);
	await event.click(showEditUserModalButton);

	const editUserDialog = await findDialog(`Edit ${user.username}`);
	const usernameInput = getLabel(
		UPSERT_USER_FORM_USERNAME_LABEL,
		editUserDialog,
	) as HTMLInputElement;
	const emailInput = getLabel(
		UPSERT_USER_FORM_EMAIL_LABEL,
		editUserDialog,
	) as HTMLInputElement;
	const roleSelect = getLabel(
		UPSERT_USER_FORM_ROLE_LABEL,
		editUserDialog,
	) as HTMLSelectElement;

	expect(usernameInput.value).toBe(user.username);
	expect(emailInput.value).toBe(user.email);
	expect(roleSelect.value).toBe(user.role);

	await event.clear(usernameInput);
	await event.clear(emailInput);

	await event.type(usernameInput, updatedUser.username);
	await event.type(emailInput, updatedUser.email);
	await event.selectOptions(roleSelect, updatedUser.role);

	mockGetUsersSuccessApi([updatedUser]);
	await event.click(getButton(UPDATE_USER_BUTTON_TEXT, editUserDialog));

	const updatedUsersTable = await findTableRow(updatedUser.username);
	expect(await findText(updatedUser.username, updatedUsersTable)).toBeTruthy();
	expect(await findText(updatedUser.email, updatedUsersTable)).toBeTruthy();
	expect(await findText(updatedUser.role, updatedUsersTable)).toBeTruthy();
	expect(
		findShowEditUserModalButton(updatedUser.username, updatedUsersTable),
	).toBeTruthy();
	expect(
		findShowDeleteUserModalButton(updatedUser.username, updatedUsersTable),
	).toBeTruthy();
});
