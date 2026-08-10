import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { paths } from "../../constants";
import { mockLoginFailureApi, mockLoginSuccessApi } from "./server/auth";
import { renderApp } from "./ui/app";

test("Submit login form with valid credentials", async () => {
	const { event } = renderApp(paths.login);

	mockLoginSuccessApi();
	submitForm(event);

	expect(await screen.findByText(/Home Page/i)).toBeTruthy();
});

test("show error message on login failure", async () => {
	const { event } = renderApp(paths.login);

	mockLoginFailureApi();
	submitForm(event);

	expect(await screen.findByRole("alert")).toBeTruthy();
	expect(await screen.findByText(/Invalid credentials/i)).toBeTruthy();
});

async function submitForm(event: UserEvent) {
	await event.type(screen.getByLabelText(/email/i), "admin@example.com");
	await event.type(screen.getByLabelText(/password/i), "password123");
	await event.click(screen.getByRole("button", { name: /login/i }));
}
