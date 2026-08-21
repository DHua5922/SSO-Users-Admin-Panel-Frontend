import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findTableRow,
	findText,
	getButton,
	getLabel,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { mockGetRolesSuccessApi } from "../../../roles/tests/integration/roleHandlers";
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
} from "./userHandlers";

test("should update user", async () => {
	const existingUser = {
		_id: "user-to-update-id",
		email: "user-to-update@example.com",
		username: "user-to-update",
		role: { _id: "admin-role-id", name: "admin" },
		systemManaged: false,
	};
	const updatedUser = {
		...existingUser,
		username: "updateduser",
		email: "updateduser@example.com",
	};

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersSuccessApi([existingUser]);
	mockUpsertUserSuccessApi();

	const { event } = renderApp(USERS_PATH);

	const showEditUserModalButton = await findShowEditUserModalButton(
		existingUser.username,
	);
	await event.click(showEditUserModalButton);

	const editUserDialog = await findDialog(`Edit ${existingUser.username}`);
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

	expect(usernameInput.value).toBe(existingUser.username);
	expect(emailInput.value).toBe(existingUser.email);
	expect(roleSelect.value).toBe(existingUser.role._id);

	await event.clear(usernameInput);
	await event.clear(emailInput);

	await event.type(usernameInput, updatedUser.username);
	await event.type(emailInput, updatedUser.email);
	await event.selectOptions(roleSelect, updatedUser.role._id);

	mockGetUsersSuccessApi([updatedUser]);
	await event.click(getButton(UPDATE_USER_BUTTON_TEXT, editUserDialog));

	const updatedUserRow = await findTableRow(updatedUser.username);
	expect(await findText(updatedUser.username, updatedUserRow)).toBeTruthy();
	expect(await findText(updatedUser.email, updatedUserRow)).toBeTruthy();
	expect(await findText(updatedUser.role.name, updatedUserRow)).toBeTruthy();
	expect(
		await findShowEditUserModalButton(updatedUser.username, updatedUserRow),
	).toBeTruthy();
	expect(
		await findShowDeleteUserModalButton(updatedUser.username, updatedUserRow),
	).toBeTruthy();
});
