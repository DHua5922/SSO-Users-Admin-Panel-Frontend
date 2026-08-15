import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { HOME_PATH } from "../../../../shared/constants";
import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import { findButton } from "../../../../shared/tests/react-testing-library/locator";
import { testUser } from "../../../users/tests/fixtures";
import { LOGIN_PATH, LOGOUT_BUTTON_TEXT } from "../../constants";
import {
	mockLoginFailureApi,
	mockLoginSuccessApi,
	mockLogoutSuccessApi,
} from "./server/auth";
import { mockGetMeFailureApi, mockGetMeSuccessApi } from "./server/me";
import { findLoginButton, findUserMenuToggleButton } from "./ui";

test("Submit login form with valid credentials", async () => {
	mockLoginSuccessApi();

	const { event } = renderApp(LOGIN_PATH);
	await findLoginButton(screen);

	mockGetMeSuccessApi();
	await submitForm(event);

	expect(await findUserMenuToggleButton(screen)).toBeTruthy();
});

test("show error message on login failure", async () => {
	mockLoginFailureApi();

	const { event } = renderApp(LOGIN_PATH);
	await findLoginButton(screen);

	await submitForm(event);
	expect(await screen.findByRole("alert")).toBeTruthy();
	expect(await screen.findByText(/Invalid credentials/i)).toBeTruthy();
});

test("log out user", async () => {
	mockGetMeSuccessApi();
	mockLogoutSuccessApi();

	const { event } = renderApp(HOME_PATH);
	await event.click(await findUserMenuToggleButton(screen));

	mockGetMeFailureApi();
	await event.click(await findButton(screen, LOGOUT_BUTTON_TEXT));

	expect(await findLoginButton(screen)).toBeTruthy();
});

async function submitForm(event: UserEvent) {
	await event.type(await screen.findByLabelText(/email/i), testUser.email);
	await event.type(await screen.findByLabelText(/password/i), "password123");
	await event.click(await findLoginButton(screen));
}
