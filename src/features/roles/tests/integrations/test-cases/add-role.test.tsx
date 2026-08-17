import type { UserEvent } from "@testing-library/user-event";
import { renderApp } from "../../../../../shared/tests/react-testing-library/app";
import {
	findAlert,
	findDialog,
	findTable,
	findText,
	getText,
} from "../../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../../auth/tests/integrations/server/me";
import { ADD_ROLE_MODAL_TITLE, ROLES_PATH } from "../../../constants/general";
import {
	CANNOT_UPSERT_ROLE_ERROR_MESSAGE,
	EMPTY_ROLES_MESSAGE,
} from "../../../constants/message";
import { testRoles } from "../../fixtures";
import {
	getDescriptionLabel,
	getNameLabel,
} from "../../react-testing-library/input";
import { mockGetRolesSuccessApi } from "../../server";
import {
	findShowDeleteRoleModalButton,
	findShowEditRoleModalButton,
	getAddRoleButton,
} from "../locator";
import { mockUpsertRoleFailureApi, mockUpsertRoleSuccessApi } from "../server";

beforeEach(() => {
	mockGetMeSuccessApi();
	mockGetRolesSuccessApi([]);
});

test("should add role", async () => {
	mockUpsertRoleSuccessApi();
	const { event } = renderApp(ROLES_PATH);

	const dialog = await commonProcess(event);
	mockGetRolesSuccessApi(testRoles);
	await event.click(getAddRoleButton(dialog));

	const rolesTable = await findTable("");
	expect(await findText(testRoles[0].name, rolesTable)).toBeTruthy();
	expect(await findText(testRoles[0].description, rolesTable)).toBeTruthy();
	expect(
		await findShowEditRoleModalButton(testRoles[0].name, rolesTable),
	).toBeTruthy();
	expect(
		await findShowDeleteRoleModalButton(testRoles[0].name, rolesTable),
	).toBeTruthy();
});

test("should show error when failing to add role", async () => {
	mockUpsertRoleFailureApi();
	const { event } = renderApp(ROLES_PATH);

	const dialog = await commonProcess(event);
	await event.click(getAddRoleButton(dialog));

	const alert = await findAlert("", dialog);
	expect(getText(CANNOT_UPSERT_ROLE_ERROR_MESSAGE, alert)).toBeTruthy();
});

async function commonProcess(event: UserEvent) {
	expect(await findText(EMPTY_ROLES_MESSAGE)).toBeTruthy();

	const showAddRoleModalButton = getAddRoleButton();
	expect(showAddRoleModalButton).toBeTruthy();
	await event.click(showAddRoleModalButton);

	const dialog = await findDialog(ADD_ROLE_MODAL_TITLE);
	expect(dialog).toBeTruthy();

	await event.type(getNameLabel(dialog), testRoles[0].name);
	await event.type(getDescriptionLabel(dialog), testRoles[0].description);

	return dialog;
}
