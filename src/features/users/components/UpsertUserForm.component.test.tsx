import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import {
	findText,
	getButton,
	getLabel,
	queryText,
} from "../../../shared/tests/react-testing-library/locator";
import {
	INVALID_EMAIL_ERROR_MESSAGE,
	NO_MATCHING_PASSWORDS_ERROR_MESSAGE,
	REQUIRED_ROLE_ERROR_MESSAGE,
	REQUIRED_USERNAME_ERROR_MESSAGE,
	UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_PASSWORD_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
} from "../constants";
import UpsertUserForm from "./UpsertUserForm";

const submitButtonText = "submit";
const roleName = "Admin";

test("shows loading state", async () => {
	const { submitButton } = await renderForm({
		isLoading: true,
		fillInForm: false,
	});

	expect(submitButton).toHaveProperty("disabled", true);
});

test("shows validation errors", async () => {
	const { event, submitButton } = await renderForm({
		isLoading: false,
		fillInForm: false,
	});

	await event.click(submitButton);

	expect(await findText(REQUIRED_USERNAME_ERROR_MESSAGE)).toBeTruthy();
	expect(await findText(REQUIRED_ROLE_ERROR_MESSAGE)).toBeTruthy();
	expect(await findText(INVALID_EMAIL_ERROR_MESSAGE)).toBeTruthy();
	expect(queryText(NO_MATCHING_PASSWORDS_ERROR_MESSAGE)).not.toBeTruthy();
	const usernameInput = getLabel(UPSERT_USER_FORM_USERNAME_LABEL);
	expect(usernameInput.getAttribute("aria-invalid")).toBe("true");
	expect(usernameInput.getAttribute("aria-describedby")).toBe(
		"username-input-error",
	);
	await expectNoAccessibilityViolations();
});

test("has no automatically detectable accessibility violations", async () => {
	await renderForm({ isLoading: false, fillInForm: false });
	await expectNoAccessibilityViolations();
});

test("submit by pressing enter on keyboard", async () => {
	const { event, onSubmit } = await renderForm({
		isLoading: false,
		fillInForm: true,
	});

	await event.type(getLabel(UPSERT_USER_FORM_PASSWORD_LABEL), "{enter}");

	expect(onSubmit).toHaveBeenCalled();
});

test("submit by clicking on button with mouse", async () => {
	const { event, onSubmit, submitButton } = await renderForm({
		isLoading: false,
		fillInForm: true,
	});

	await event.click(submitButton);

	expect(onSubmit).toHaveBeenCalled();
});

async function renderForm({
	isLoading,
	fillInForm,
}: {
	isLoading: boolean;
	fillInForm: boolean;
}) {
	const event = userEvent.setup();
	const onSubmit = vi.fn();
	const roles = [
		{
			description: "",
			name: roleName,
			_id: "1",
			systemManaged: false,
		},
	];
	const password = "password123";
	const loadingButtonText = "Submitting User...";

	render(
		<UpsertUserForm
			isEditing={false}
			isSubmitting={isLoading}
			onSubmit={onSubmit}
			username=""
			email=""
			initialRole=""
			roleSelect={{
				isLoading: false,
				isError: false,
				errorMessage: "",
				list: roles,
			}}
			loadingButtonText={loadingButtonText}
			submitButtonText={submitButtonText}
		/>,
	);

	if (fillInForm) {
		await event.type(getLabel(UPSERT_USER_FORM_USERNAME_LABEL), "testuser");
		await event.selectOptions(
			getLabel(UPSERT_USER_FORM_ROLE_LABEL),
			roles[0].name,
		);
		await event.type(
			getLabel(UPSERT_USER_FORM_EMAIL_LABEL),
			"test@example.com",
		);
		await event.type(getLabel(UPSERT_USER_FORM_PASSWORD_LABEL), password);
		await event.type(
			getLabel(UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL),
			password,
		);
	}

	return {
		event,
		onSubmit,
		submitButton: getButton(isLoading ? loadingButtonText : submitButtonText),
	};
}
