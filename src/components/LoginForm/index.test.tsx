import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

const loginText = "Login";

test("shows loading state", async () => {
	const { button } = await renderLoginForm(true, "Logging in...");
	expect(button).toBeTruthy();
});

test("submit by pressing enter on keyboard", async () => {
	const { event, onSubmit, button } = await renderLoginForm(false, loginText);

	await event.type(screen.getByLabelText(/password/i), "password123{enter}");
	expect(onSubmit).toHaveBeenCalled();
	expect(button).toBeTruthy();
});

test("submit by clicking on button with mouse", async () => {
	const { event, onSubmit, button } = await renderLoginForm(false, loginText);

	await event.click(button);
	expect(onSubmit).toHaveBeenCalled();
	expect(button).toBeTruthy();
});

async function renderLoginForm(isLoading: boolean, buttonText: string) {
	const event = userEvent.setup();
	const onSubmit = vi.fn();
	const onChangeEmail = vi.fn();
	const onChangePassword = vi.fn();

	render(
		<LoginForm
			isLoading={isLoading}
			onSubmit={onSubmit}
			email=""
			onChangeEmail={onChangeEmail}
			password=""
			onChangePassword={onChangePassword}
		/>,
	);
	await event.type(screen.getByLabelText(/email/i), "test@example.com");

	return {
		event,
		onSubmit,
		button: screen.getByRole("button", { name: new RegExp(buttonText, "i") }),
	};
}
