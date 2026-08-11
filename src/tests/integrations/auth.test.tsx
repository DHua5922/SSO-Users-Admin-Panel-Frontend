import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { paths, testUser } from "../../constants";
import { mockLoginFailureApi, mockLoginSuccessApi } from "./server/auth";
import { mockGetMeSuccessApi } from "./server/me";
import { findLoginButton } from "./ui/auth";
import { findUserButton } from "./ui/home";
import { renderApp } from "./ui/support/app";

test("Submit login form with valid credentials", async () => {
	mockLoginSuccessApi();

	const { event } = renderApp(paths.login);
	await findLoginButton(screen);

	mockGetMeSuccessApi();
	await submitForm(event);

	expect(await findUserButton(screen)).toBeTruthy();
});

test("show error message on login failure", async () => {
	mockLoginFailureApi();

	const { event } = renderApp(paths.login);
	await findLoginButton(screen);

	await submitForm(event);
	expect(await screen.findByRole("alert")).toBeTruthy();
	expect(await screen.findByText(/Invalid credentials/i)).toBeTruthy();
});

async function submitForm(event: UserEvent) {
	await event.type(await screen.findByLabelText(/email/i), testUser.email);
	await event.type(await screen.findByLabelText(/password/i), "password123");
	await event.click(await findLoginButton(screen));
}
