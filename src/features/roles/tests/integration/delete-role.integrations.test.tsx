import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { ROLES_PATH } from "../../constants/general";
import { EMPTY_ROLES_MESSAGE } from "../../constants/message";
import { testRoles } from "../fixtures";
import { mockGetRolesSuccessApi } from "../mocks/roleHandlers";
import {
	findShowDeleteRoleModalButton,
	getConfirmDeleteRoleButton,
} from "./locators";
import { mockDeleteRoleSuccessApi } from "./mocks/roleHandlers";

test("should delete role", async () => {
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi(testRoles);
	mockDeleteRoleSuccessApi();

	const { event } = renderApp(ROLES_PATH);

	const deleteButton = await findShowDeleteRoleModalButton(testRoles[0].name);
	await event.click(deleteButton);

	const dialog = await findDialog(`Delete ${testRoles[0].name}`);
	mockGetRolesSuccessApi([]);
	await event.click(getConfirmDeleteRoleButton(dialog));
	expect(await findText(EMPTY_ROLES_MESSAGE)).toBeTruthy();
});
