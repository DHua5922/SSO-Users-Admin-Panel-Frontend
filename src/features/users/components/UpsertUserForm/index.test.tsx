import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { fillInPasswordInput } from "../../tests/integrations/ui";
import UpsertUserForm from ".";

test("shows loading state", async () => {
	const { button } = await renderForm(true, "Logging in...", false);
	expect(button).toBeTruthy();
});

test("shows validation errors", async () => {
	const { event, button } = await renderForm(false, "submit", false);

	clearInputs(event);

	expect(button).toBeTruthy();
	await event.click(button);

	expect(await screen.findByText(/username is required/i)).toBeTruthy();
	expect(await screen.findByText(/role is required/i)).toBeTruthy();
	expect(await screen.findByText(/Invalid email address/i)).toBeTruthy();
	expect(screen.queryByText(/Passwords do not match/i)).not.toBeTruthy();

	await event.type(screen.getByLabelText(/username/i), "testuser");
	await event.selectOptions(screen.getByLabelText(/role/i), "Admin");
	await event.type(screen.getByLabelText(/email/i), "test@example.com");
	await fillInPasswordInput(event, "test123{enter}");

	expect(screen.queryByText(/username is required/i)).not.toBeTruthy();
	expect(screen.queryByText(/role is required/i)).not.toBeTruthy();
	expect(screen.queryByText(/Invalid email address/i)).not.toBeTruthy();
	expect(await screen.findByText(/Passwords do not match/i)).toBeTruthy();
});

test("submit by pressing enter on keyboard", async () => {
	const { event, onSubmit } = await renderForm(false, "submit", true);

	await fillInPasswordInput(event, "{enter}");

	expect(onSubmit).toHaveBeenCalled();
});

test("submit by clicking on button with mouse", async () => {
	const { event, onSubmit, button } = await renderForm(false, "submit", true);

	expect(button).toBeTruthy();
	await event.click(button);

	expect(onSubmit).toHaveBeenCalled();
});

async function renderForm(
	isLoading: boolean,
	buttonText: string,
	fillInForm: boolean,
) {
	const event = userEvent.setup();
	const onSubmit = vi.fn();
	const roles = [{ description: "", name: "Admin", _id: "1" }];
	const password = "password123";

	render(
		<UpsertUserForm
			isEditing={false}
			isSubmitting={isLoading}
			onSubmit={onSubmit}
			username=""
			email=""
			role=""
			roleSelectProps={{
				isLoading,
				isError: false,
				errorMessage: undefined,
				list: roles,
			}}
			submitButtonText={buttonText}
		/>,
	);

	if (fillInForm) {
		await event.type(screen.getByLabelText(/username/i), "testuser");
		await event.selectOptions(screen.getByLabelText(/role/i), roles[0].name);
		await event.type(screen.getByLabelText(/email/i), "test@example.com");
		await fillInPasswordInput(event, password);
		await event.type(screen.getByLabelText(/confirm password/i), password);
	}

	return {
		event,
		onSubmit,
		button: screen.getByRole("button", { name: new RegExp(buttonText, "i") }),
	};
}

async function clearInputs(event: UserEvent) {
	const inputs = screen.getAllByRole("textbox");
	for (const input of inputs) {
		await event.clear(input);
	}

	const passwordInputs = screen.getAllByLabelText(/password/i, { exact: true });
	for (const input of passwordInputs) {
		await event.clear(input);
	}
}
