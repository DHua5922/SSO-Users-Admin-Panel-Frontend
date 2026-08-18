import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAccessibilityViolations } from "../../../../shared/tests/react-testing-library/accessibility";
import { getButton } from "../../../../shared/tests/react-testing-library/locator";
import { LOGIN_LOADING_TEXT, LOGIN_TEXT } from "../../constants";
import {
	getEmailLabel,
	getPasswordLabel,
} from "../../tests/integrations/locator";
import LoginForm from ".";

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
	await event.type(getEmailLabel(), "test@example.com");

	return {
		event,
		onSubmit,
		button: getButton(buttonText),
	};
}
