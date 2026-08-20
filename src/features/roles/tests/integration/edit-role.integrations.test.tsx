import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findTableRow,
	findText,
	getButton,
	getLabel,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import {
	ROLES_PATH,
	UPDATE_ROLE_BUTTON_TEXT,
	UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
	UPSERT_ROLE_FORM_NAME_LABEL,
} from "../../constants";
import {
	mockGetRolesSuccessApi,
	mockUpsertRoleSuccessApi,
} from "../mocks/roleHandlers";
import {
	findShowDeleteRoleModalButton,
	findShowEditRoleModalButton,
} from "./locators";

test("should update role", async () => {
	const existingRole = {
		_id: "role-to-update-id",
		name: "role-to-update",
		description: "Role to update",
		systemManaged: false,
	};
	const updatedRole = {
		...existingRole,
		name: "updatedrole",
		description: "Updated role description",
	};

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi([existingRole]);
	mockUpsertRoleSuccessApi();

	const { event } = renderApp(ROLES_PATH);

	const showEditRoleModalButton = await findShowEditRoleModalButton(
		existingRole.name,
	);
	await event.click(showEditRoleModalButton);

	const editRoleDialog = await findDialog(`Edit ${existingRole.name}`);
	const nameInput = getLabel(
		UPSERT_ROLE_FORM_NAME_LABEL,
		editRoleDialog,
	) as HTMLInputElement;
	const descriptionInput = getLabel(
		UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
		editRoleDialog,
	) as HTMLInputElement;

	expect(nameInput.value).toBe(existingRole.name);
	expect(descriptionInput.value).toBe(existingRole.description);

	await event.clear(nameInput);
	await event.clear(descriptionInput);
	await event.type(nameInput, updatedRole.name);
	await event.type(descriptionInput, updatedRole.description);

	mockGetRolesSuccessApi([updatedRole]);
	await event.click(getButton(UPDATE_ROLE_BUTTON_TEXT, editRoleDialog));

	const updatedRoleRow = await findTableRow(updatedRole.name);
	expect(await findText(updatedRole.name, updatedRoleRow)).toBeTruthy();
	expect(await findText(updatedRole.description, updatedRoleRow)).toBeTruthy();
	expect(
		await findShowEditRoleModalButton(updatedRole.name, updatedRoleRow),
	).toBeTruthy();
	expect(
		await findShowDeleteRoleModalButton(updatedRole.name, updatedRoleRow),
	).toBeTruthy();
});
