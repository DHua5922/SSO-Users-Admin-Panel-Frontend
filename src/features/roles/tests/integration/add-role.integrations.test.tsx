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
import {
	ADD_ROLE_MODAL_TITLE,
	CANNOT_UPSERT_ROLE_ERROR_MESSAGE,
	EMPTY_ROLES_MESSAGE,
	ROLES_PATH,
} from "../../constants";
import { testRoles } from "../fixtures";
import {
	mockGetRolesSuccessApi,
	mockUpsertRoleFailureApi,
	mockUpsertRoleSuccessApi,
} from "../mocks/roleHandlers";
import {
	getDescriptionLabel,
	getNameLabel,
} from "../react-testing-library/inputs";
import {
	findShowDeleteRoleModalButton,
	findShowEditRoleModalButton,
	getAddRoleButton,
} from "./locators";

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
