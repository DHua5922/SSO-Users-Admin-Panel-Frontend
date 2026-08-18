import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../shared/tests/react-testing-library/locator";
import {
	getDescriptionLabel,
	getNameLabel,
} from "../tests/react-testing-library/inputs";
import { findNameErrorMessage } from "../tests/react-testing-library/messages";
import UpsertRoleForm from "./UpsertRoleForm";

const submitButtonText = "submit";
const roleName = "Admin";

test("shows loading state", async () => {
	const { submitButton } = await renderForm({
		isLoading: true,
		submitButtonText,
	});

	expect(submitButton).toHaveProperty("disabled", true);
});

test("shows validation errors", async () => {
	const { event, submitButton } = await renderForm({
		submitButtonText,
	});

	await event.click(submitButton);

	expect(await findNameErrorMessage()).toBeTruthy();
	expect(getNameLabel().getAttribute("aria-invalid")).toBe("true");
	expect(getNameLabel().getAttribute("aria-describedby")).toBe(
		"name-input-error",
	);
	await expectNoAccessibilityViolations();
});

test("has no automatically detectable accessibility violations", async () => {
	await renderForm({ submitButtonText });
	await expectNoAccessibilityViolations();
});

test("submit by pressing enter on keyboard", async () => {
	const { event, onSubmit } = await renderForm({
		submitButtonText,
		fillInForm: true,
	});

	await event.type(getNameLabel(), `${roleName}{enter}`);

	expect(onSubmit).toHaveBeenCalled();
});

test("submit by clicking on button with mouse", async () => {
	const { event, onSubmit, submitButton } = await renderForm({
		submitButtonText,
		fillInForm: true,
	});

	await event.click(submitButton);

	expect(onSubmit).toHaveBeenCalled();
});

async function renderForm({
	isLoading = false,
	submitButtonText = "",
	fillInForm = false,
}) {
	const event = userEvent.setup();
	const onSubmit = vi.fn();
	const loadingButtonText = "Submitting Role...";

	render(
		<UpsertRoleForm
			isSubmitting={isLoading}
			onSubmit={onSubmit}
			name=""
			description=""
			loadingButtonText={loadingButtonText}
			submitButtonText={submitButtonText}
		/>,
	);

	if (fillInForm) {
		const formValues = {
			name: roleName,
			description: "test",
		};

		await event.type(getNameLabel(), formValues.name);
		await event.type(getDescriptionLabel(), formValues.description);
	}

	return {
		event,
		onSubmit,
		submitButton: getButton(isLoading ? loadingButtonText : submitButtonText),
	};
}
