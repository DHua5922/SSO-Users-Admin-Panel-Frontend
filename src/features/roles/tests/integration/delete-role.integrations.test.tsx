import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { EMPTY_ROLES_MESSAGE, ROLES_PATH } from "../../constants";
import {
	mockDeleteRoleSuccessApi,
	mockGetRolesSuccessApi,
} from "../mocks/roleHandlers";
import {
	findShowDeleteRoleModalButton,
	getConfirmDeleteRoleButton,
} from "./locators";

test("should delete role", async () => {
	const role = {
		_id: "role-to-delete-id",
		name: "role-to-delete",
		description: "Role to delete",
		systemManaged: false,
	};

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi([role]);
	mockDeleteRoleSuccessApi();

	const { event } = renderApp(ROLES_PATH);

	const deleteButton = await findShowDeleteRoleModalButton(role.name);
	await event.click(deleteButton);

	const dialog = await findDialog(`Delete ${role.name}`);
	mockGetRolesSuccessApi([]);
	await event.click(getConfirmDeleteRoleButton(dialog));
	expect(await findText(EMPTY_ROLES_MESSAGE)).toBeTruthy();
});
