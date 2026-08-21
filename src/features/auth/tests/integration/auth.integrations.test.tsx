import type { UserEvent } from "@testing-library/user-event";
import { HOME_PATH } from "../../../../shared/constants";
import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findAlert,
	findButton,
	findLabel,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	CURRENT_USER_TOGGLE_ARIA_LABEL,
	GUEST_LOGIN_TEXT,
	LOGIN_EMAIL_INPUT_LABEL,
	LOGIN_PASSWORD_INPUT_LABEL,
	LOGIN_PATH,
	LOGIN_TEXT,
	LOGOUT_BUTTON_TEXT,
} from "../../constants";
import {
	mockGuestLoginSuccessApi,
	mockLoginFailureApi,
	mockLoginSuccessApi,
	mockLogoutSuccessApi,
} from "./mocks/authHandlers";
import {
	mockGetMeFailureApi,
	mockGetMeSuccessApi,
} from "./mocks/currentUserHandlers";

test("Submit login form with valid credentials", async () => {
	mockLoginSuccessApi();

	const { event } = renderApp(LOGIN_PATH);
	await findButton(LOGIN_TEXT);

	mockGetMeSuccessApi();
	await submitForm(event);

	expect(await findButton(CURRENT_USER_TOGGLE_ARIA_LABEL)).toBeTruthy();
});

test("log in as a guest", async () => {
	mockGuestLoginSuccessApi();

	const { event } = renderApp(LOGIN_PATH);
	await event.click(await findButton(GUEST_LOGIN_TEXT));

	mockGetMeSuccessApi();
	expect(await findButton(CURRENT_USER_TOGGLE_ARIA_LABEL)).toBeTruthy();
});

test("show error message on login failure", async () => {
	mockLoginFailureApi();

	const { event } = renderApp(LOGIN_PATH);
	await findButton(LOGIN_TEXT);

	await submitForm(event);
	expect(await findAlert("")).toBeTruthy();
	expect(await findText("Invalid credentials")).toBeTruthy();
});

test("log out user", async () => {
	mockGetMeSuccessApi();
	mockLogoutSuccessApi();

	const { event } = renderApp(HOME_PATH);
	await event.click(await findButton(CURRENT_USER_TOGGLE_ARIA_LABEL));

	mockGetMeFailureApi();
	await event.click(await findButton(LOGOUT_BUTTON_TEXT));

	expect(await findButton(LOGIN_TEXT)).toBeTruthy();
});

async function submitForm(event: UserEvent) {
	await event.type(
		await findLabel(LOGIN_EMAIL_INPUT_LABEL),
		"test@example.com",
	);
	await event.type(await findLabel(LOGIN_PASSWORD_INPUT_LABEL), "password123");
	await event.click(await findButton(LOGIN_TEXT));
}
