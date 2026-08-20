import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { mockGetRolesSuccessApi } from "../../../roles/tests/mocks/roleHandlers";
import { EMPTY_USERS_MESSAGE, USERS_PATH } from "../../constants";
import {
	findShowDeleteUserModalButton,
	getConfirmDeleteUserButton,
} from "./locators";
import {
	mockDeleteUserSuccessApi,
	mockGetUsersSuccessApi,
} from "./mocks/userHandlers";

test("should delete user", async () => {
	const user = {
		_id: "user-to-delete-id",
		email: "delete@example.com",
		username: "user-to-delete",
		role: "admin-role-id",
		systemManaged: false,
	};
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersSuccessApi([user]);
	mockDeleteUserSuccessApi();

	const { event } = renderApp(USERS_PATH);

	const deleteButton = await findShowDeleteUserModalButton(user.username);
	await event.click(deleteButton);

	const dialog = await findDialog(`Delete ${user.username}`);
	mockGetUsersSuccessApi([]);
	await event.click(getConfirmDeleteUserButton(dialog));
	expect(await findText(EMPTY_USERS_MESSAGE)).toBeTruthy();
});
