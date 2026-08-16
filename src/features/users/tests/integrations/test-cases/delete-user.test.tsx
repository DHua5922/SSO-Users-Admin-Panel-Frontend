import { renderApp } from "../../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findText,
} from "../../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../../auth/tests/integrations/server/me";
import { mockGetRolesSuccessApi } from "../../../../roles/tests/server";
import { USERS_PATH } from "../../../constants/general";
import { EMPTY_USERS_MESSAGE } from "../../../constants/message";
import { testUser } from "../../fixtures";
import {
	findShowDeleteUserModalButton,
	getConfirmDeleteUserButton,
} from "../locator";
import { mockDeleteUserSuccessApi, mockGetUsersSuccessApi } from "../server";

test("should delete user", async () => {
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi();
	mockGetUsersSuccessApi([testUser]);
	mockDeleteUserSuccessApi();

	const { event } = renderApp(USERS_PATH);

	const deleteButton = await findShowDeleteUserModalButton(testUser.username);
	await event.click(deleteButton);

	const dialog = await findDialog(`Delete ${testUser.username}`);
	mockGetUsersSuccessApi([]);
	await event.click(getConfirmDeleteUserButton(dialog));
	expect(await findText(EMPTY_USERS_MESSAGE)).toBeTruthy();
});
