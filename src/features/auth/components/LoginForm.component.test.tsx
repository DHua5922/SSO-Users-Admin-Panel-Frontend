import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import {
	getButton,
	getLabel,
} from "../../../shared/tests/react-testing-library/locator";
import {
	GUEST_LOGIN_TEXT,
	LOGIN_EMAIL_INPUT_LABEL,
	LOGIN_LOADING_TEXT,
	LOGIN_PASSWORD_INPUT_LABEL,
	LOGIN_TEXT,
} from "../constants";
import LoginForm from "./LoginForm";

test("shows loading state", async () => {
	const { button } = await renderLoginForm(true, LOGIN_LOADING_TEXT);
	expect(button).toBeTruthy();
});

test("has no automatically detectable accessibility violations", async () => {
	await renderLoginForm(false, LOGIN_TEXT);
	await expectNoAccessibilityViolations();
});

test("requires email and password", async () => {
	await renderLoginForm(false, LOGIN_TEXT);

	expect(getLabel(LOGIN_EMAIL_INPUT_LABEL)).toHaveProperty("required", true);
	expect(getLabel(LOGIN_PASSWORD_INPUT_LABEL)).toHaveProperty("required", true);
});

test("submit by pressing enter on keyboard", async () => {
	const { event, onSubmit, button } = await renderLoginForm(false, LOGIN_TEXT);

	await event.type(getLabel(LOGIN_PASSWORD_INPUT_LABEL), "{enter}");

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
			email="test@example.com"
			onChangeEmail={onChangeEmail}
			password="password123"
			onChangePassword={onChangePassword}
		/>,
	);
	return {
		event,
		onSubmit,
		onGuestLogin,
		button: getButton(buttonText),
	};
}
