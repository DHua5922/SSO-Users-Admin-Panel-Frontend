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
	const role = {
		_id: "new-role-id",
		name: "new-role",
		description: "New role description",
		systemManaged: false,
	};
	mockUpsertRoleSuccessApi();
	const { event } = renderApp(ROLES_PATH);

	const dialog = await openAndFillAddRoleForm(event, role);
	mockGetRolesSuccessApi([role]);
	await event.click(getAddRoleButton(dialog));

	const rolesTable = await findTable("");
	expect(await findText(role.name, rolesTable)).toBeTruthy();
	expect(await findText(role.description, rolesTable)).toBeTruthy();
	expect(await findShowEditRoleModalButton(role.name, rolesTable)).toBeTruthy();
	expect(
		await findShowDeleteRoleModalButton(role.name, rolesTable),
	).toBeTruthy();
});

test("should show error when failing to add role", async () => {
	const role = {
		name: "rejected-role",
		description: "Role rejected by the API",
	};
	mockUpsertRoleFailureApi();
	const { event } = renderApp(ROLES_PATH);

	const dialog = await openAndFillAddRoleForm(event, role);
	await event.click(getAddRoleButton(dialog));

	const alert = await findAlert("", dialog);
	expect(getText(CANNOT_UPSERT_ROLE_ERROR_MESSAGE, alert)).toBeTruthy();
});

async function openAndFillAddRoleForm(
	event: UserEvent,
	role: { name: string; description: string },
) {
	expect(await findText(EMPTY_ROLES_MESSAGE)).toBeTruthy();

	const showAddRoleModalButton = getAddRoleButton();
	expect(showAddRoleModalButton).toBeTruthy();
	await event.click(showAddRoleModalButton);

	const dialog = await findDialog(ADD_ROLE_MODAL_TITLE);
	expect(dialog).toBeTruthy();

	await event.type(getNameLabel(dialog), role.name);
	await event.type(getDescriptionLabel(dialog), role.description);

	return dialog;
}
