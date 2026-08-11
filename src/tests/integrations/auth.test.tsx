import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { LOGOUT_BUTTON_TEXT, paths, testUser } from "../../constants";
import {
	mockLoginFailureApi,
	mockLoginSuccessApi,
	mockLogoutSuccessApi,
} from "./server/auth";
import { mockGetMeFailureApi, mockGetMeSuccessApi } from "./server/me";
import { findLoginButton } from "./ui/auth";
import { findUserMenuToggleButton } from "./ui/home";
import { renderApp } from "./ui/support/app";
import { findButton } from "./ui/support/locator";

test("Submit login form with valid credentials", async () => {
	mockLoginSuccessApi();

	const { event } = renderApp(paths.login);
	await findLoginButton(screen);

	mockGetMeSuccessApi();
	await submitForm(event);

	expect(await findUserMenuToggleButton(screen)).toBeTruthy();
});

test("show error message on login failure", async () => {
	mockLoginFailureApi();

	const { event } = renderApp(paths.login);
	await findLoginButton(screen);

	await submitForm(event);
	expect(await screen.findByRole("alert")).toBeTruthy();
	expect(await screen.findByText(/Invalid credentials/i)).toBeTruthy();
});

test("log out user", async () => {
	mockGetMeSuccessApi();
	mockLogoutSuccessApi();

	const { event } = renderApp(paths.home);
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
