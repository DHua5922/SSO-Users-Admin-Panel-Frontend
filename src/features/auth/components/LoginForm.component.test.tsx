import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../shared/tests/react-testing-library/locator";
import { GUEST_LOGIN_TEXT, LOGIN_LOADING_TEXT, LOGIN_TEXT } from "../constants";
import { getEmailLabel, getPasswordLabel } from "../tests/integration/locators";
import LoginForm from "./LoginForm";

test("shows loading state", async () => {
	const { button } = await renderLoginForm(true, LOGIN_LOADING_TEXT);
	expect(button).toBeTruthy();
});

test("has no automatically detectable accessibility violations", async () => {
	await renderLoginForm(false, LOGIN_TEXT);
	await expectNoAccessibilityViolations();
});

test("submit by pressing enter on keyboard", async () => {
	const { event, onSubmit, button } = await renderLoginForm(false, LOGIN_TEXT);

	await event.type(getPasswordLabel(), "password123{enter}");

	expect(onSubmit).toHaveBeenCalled();
	expect(button).toBeTruthy();
});

test("submit by clicking on button with mouse", async () => {
	const { event, onSubmit, button } = await renderLoginForm(false, LOGIN_TEXT);

	await event.click(button);

	expect(onSubmit).toHaveBeenCalled();
	expect(button).toBeTruthy();
});

test("login as guest by clicking the guest button", async () => {
	const { event, onGuestLogin } = await renderLoginForm(false, LOGIN_TEXT);

	await event.click(getButton(GUEST_LOGIN_TEXT));

	expect(onGuestLogin).toHaveBeenCalledOnce();
});

async function renderLoginForm(isLoading: boolean, buttonText: string) {
	const event = userEvent.setup();
	const onSubmit = vi.fn();
	const onChangeEmail = vi.fn();
	const onChangePassword = vi.fn();
	const onGuestLogin = vi.fn();

	render(
		<LoginForm
			isLoading={isLoading}
			isGuestLoginLoading={false}
			onGuestLogin={onGuestLogin}
			onSubmit={onSubmit}
			email=""
			onChangeEmail={onChangeEmail}
			password=""
			onChangePassword={onChangePassword}
		/>,
	);
	await event.type(getEmailLabel(), "test@example.com");

	return {
		event,
		onSubmit,
		onGuestLogin,
		button: getButton(buttonText),
	};
}
