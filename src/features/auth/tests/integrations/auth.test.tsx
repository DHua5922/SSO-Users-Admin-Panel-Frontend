import type { UserEvent } from "@testing-library/user-event";
import { HOME_PATH } from "../../../../shared/constants";
import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findAlert,
	findButton,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import { testUser } from "../../../users/tests/fixtures";
import { LOGIN_PATH, LOGOUT_BUTTON_TEXT } from "../../constants";
import {
	findCurrentUserMenuToggleButton,
	findEmailLabel,
	findGuestLoginButton,
	findLoginButton,
	findPasswordLabel,
} from "./locator";
import {
	mockGuestLoginSuccessApi,
	mockLoginFailureApi,
	mockLoginSuccessApi,
	mockLogoutSuccessApi,
} from "./server/auth";
import { mockGetMeFailureApi, mockGetMeSuccessApi } from "./server/me";

test("Submit login form with valid credentials", async () => {
	mockLoginSuccessApi();

	const { event } = renderApp(LOGIN_PATH);
	await findLoginButton();

	mockGetMeSuccessApi();
	await submitForm(event);

	expect(await findCurrentUserMenuToggleButton()).toBeTruthy();
});

test("log in as a guest", async () => {
	mockGuestLoginSuccessApi();

	const { event } = renderApp(LOGIN_PATH);
	await event.click(await findGuestLoginButton());

	mockGetMeSuccessApi();
	expect(await findCurrentUserMenuToggleButton()).toBeTruthy();
});

test("show error message on login failure", async () => {
	mockLoginFailureApi();

	const { event } = renderApp(LOGIN_PATH);
	await findLoginButton();

	await submitForm(event);
	expect(await findAlert("")).toBeTruthy();
	expect(await findText("Invalid credentials")).toBeTruthy();
});

test("log out user", async () => {
	mockGetMeSuccessApi();
	mockLogoutSuccessApi();

	const { event } = renderApp(HOME_PATH);
	await event.click(await findCurrentUserMenuToggleButton());

	mockGetMeFailureApi();
	await event.click(await findButton(LOGOUT_BUTTON_TEXT));

	expect(await findLoginButton()).toBeTruthy();
});

async function submitForm(event: UserEvent) {
	await event.type(await findEmailLabel(), testUser.email);
	await event.type(await findPasswordLabel(), "password123");
	await event.click(await findLoginButton());
}
