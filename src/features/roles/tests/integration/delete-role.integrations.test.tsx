import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { EMPTY_ROLES_MESSAGE, ROLES_PATH } from "../../constants";
import {
	findShowDeleteRoleModalButton,
	getConfirmDeleteRoleButton,
} from "./locators";
import {
	mockDeleteRoleSuccessApi,
	mockGetRolesSuccessApi,
} from "./roleHandlers";

test("should delete role", async () => {
	const roleToDelete = {
		_id: "role-to-delete-id",
		name: "role-to-delete",
		description: "Role to delete",
		systemManaged: false,
	};

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi([roleToDelete]);
	mockDeleteRoleSuccessApi();

	const { event } = renderApp(ROLES_PATH);

	const deleteButton = await findShowDeleteRoleModalButton(roleToDelete.name);
	await event.click(deleteButton);

	const deleteRoleDialog = await findDialog(`Delete ${roleToDelete.name}`);
	mockGetRolesSuccessApi([]);
	await event.click(getConfirmDeleteRoleButton(deleteRoleDialog));
	expect(await findText(EMPTY_ROLES_MESSAGE)).toBeTruthy();
});
