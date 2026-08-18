import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../shared/tests/react-testing-library/locator";
import {
	getConfirmPasswordLabel,
	getEmailLabel,
	getPasswordInput,
	getRoleLabel,
	getUsernameLabel,
} from "../tests/react-testing-library/input";
import {
	findEmailErrorMessage,
	findRoleErrorMessage,
	findUsernameErrorMessage,
	queryNoMatchingPasswordsErrorMessage,
} from "../tests/react-testing-library/message";
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

	expect(await findUsernameErrorMessage()).toBeTruthy();
	expect(await findRoleErrorMessage()).toBeTruthy();
	expect(await findEmailErrorMessage()).toBeTruthy();
	expect(queryNoMatchingPasswordsErrorMessage()).not.toBeTruthy();
	expect(getUsernameLabel().getAttribute("aria-invalid")).toBe("true");
	expect(getUsernameLabel().getAttribute("aria-describedby")).toBe(
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

	await event.type(getPasswordInput(), "{enter}");

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
	const roles = [{ description: "", name: roleName, _id: "1" }];
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
		await event.type(getUsernameLabel(), "testuser");
		await event.selectOptions(getRoleLabel(), roles[0].name);
		await event.type(getEmailLabel(), "test@example.com");
		await event.type(getPasswordInput(), password);
		await event.type(getConfirmPasswordLabel(), password);
	}

	return {
		event,
		onSubmit,
		submitButton: getButton(isLoading ? loadingButtonText : submitButtonText),
	};
}
