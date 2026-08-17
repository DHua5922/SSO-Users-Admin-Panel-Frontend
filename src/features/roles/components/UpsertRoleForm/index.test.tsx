import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LOADING_TEXT } from "../../../../shared/constants";
import { getButton } from "../../../../shared/tests/react-testing-library/locator";
import {
	getDescriptionLabel,
	getNameLabel,
} from "../../tests/react-testing-library/input";
import { findNameErrorMessage } from "../../tests/react-testing-library/message";
import UpsertRoleForm from ".";

const submitButtonText = "submit";
const roleName = "Admin";

test("shows loading state", async () => {
	const { submitButton } = await renderForm({
		isLoading: true,
		submitButtonText: LOADING_TEXT,
	});

	expect(submitButton).toHaveProperty("disabled", true);
});

test("shows validation errors", async () => {
	const { event, submitButton } = await renderForm({
		submitButtonText,
	});

	await event.click(submitButton);

	expect(await findNameErrorMessage()).toBeTruthy();
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

	render(
		<UpsertRoleForm
			isSubmitting={isLoading}
			onSubmit={onSubmit}
			name=""
			description=""
			submitButtonText={submitButtonText}
		/>,
	);

	if (fillInForm) {
		const roles = [{ description: "test", name: roleName, _id: "1" }];

		await event.type(getNameLabel(), roles[0].name);
		await event.type(getDescriptionLabel(), roles[0].description);
	}

	return {
		event,
		onSubmit,
		submitButton: getButton(submitButtonText),
	};
}
