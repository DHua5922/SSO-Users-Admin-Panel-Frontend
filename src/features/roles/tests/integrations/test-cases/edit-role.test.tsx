import { renderApp } from "../../../../../shared/tests/react-testing-library/app";
import {
	findDialog,
	findTableRow,
	findText,
	getButton,
	getLabel,
} from "../../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../../auth/tests/integrations/server/me";
import { UPDATE_ROLE_BUTTON_TEXT } from "../../../constants/button";
import { ROLES_PATH } from "../../../constants/general";
import {
	UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
	UPSERT_ROLE_FORM_NAME_LABEL,
} from "../../../constants/input";
import { testRoles } from "../../fixtures";
import { mockGetRolesSuccessApi } from "../../server";
import {
	findShowDeleteRoleModalButton,
	findShowEditRoleModalButton,
} from "../locator";
import { mockUpsertRoleSuccessApi } from "../server";

test("should update role", async () => {
	const updatedRole = {
		_id: testRoles[0]._id,
		name: "updatedrole",
		description: "Updated role description",
	};

	mockGetMeSuccessApi();
	mockGetRolesSuccessApi(testRoles);
	mockUpsertRoleSuccessApi();

	const { event } = renderApp(ROLES_PATH);

	const showEditRoleModalButton = await findShowEditRoleModalButton(
		testRoles[0].name,
	);
	await event.click(showEditRoleModalButton);

	const editRoleDialog = await findDialog(`Edit ${testRoles[0].name}`);
	const nameInput = getLabel(
		UPSERT_ROLE_FORM_NAME_LABEL,
		editRoleDialog,
	) as HTMLInputElement;
	const descriptionInput = getLabel(
		UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
		editRoleDialog,
	) as HTMLInputElement;

	expect(nameInput.value).toBe(testRoles[0].name);
	expect(descriptionInput.value).toBe(testRoles[0].description);

	await event.clear(nameInput);
	await event.clear(descriptionInput);
	await event.type(nameInput, updatedRole.name);
	await event.type(descriptionInput, updatedRole.description);

	mockGetRolesSuccessApi([updatedRole]);
	await event.click(getButton(UPDATE_ROLE_BUTTON_TEXT, editRoleDialog));

	const updatedRolesTable = await findTableRow(updatedRole.name);
	expect(await findText(updatedRole.name, updatedRolesTable)).toBeTruthy();
	expect(
		await findText(updatedRole.description, updatedRolesTable),
	).toBeTruthy();
	expect(
		findShowEditRoleModalButton(updatedRole.name, updatedRolesTable),
	).toBeTruthy();
	expect(
		findShowDeleteRoleModalButton(updatedRole.name, updatedRolesTable),
	).toBeTruthy();
});
