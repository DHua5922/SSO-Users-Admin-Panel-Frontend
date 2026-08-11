import { expect, type Page } from "@playwright/test";
import { z } from "zod";

export async function logInTest(page: Page) {
	const testEnvSchema = z.object({
		VITE_FRONTEND_BASE_URL: z.url(),
		VITE_TEST_EMAIL: z.email(),
		VITE_TEST_PASSWORD: z.string(),
	});
	const testEnv = testEnvSchema.parse({
		VITE_FRONTEND_BASE_URL: process.env.VITE_FRONTEND_BASE_URL,
		VITE_TEST_EMAIL: process.env.VITE_TEST_EMAIL,
		VITE_TEST_PASSWORD: process.env.VITE_TEST_PASSWORD,
	});

	await page.goto(testEnv.VITE_FRONTEND_BASE_URL);

	await page.getByLabel("Email").fill(testEnv.VITE_TEST_EMAIL);
	await page.getByLabel("Password").fill(testEnv.VITE_TEST_PASSWORD);
	const [response] = await Promise.all([
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/auth/login") &&
				response.status() === 200,
		),
		page.getByRole("button", { name: "Login" }).click(),
	]);
	const responseBody = await response.json();

	expect(responseBody).toMatchObject({
		_id: expect.any(String),
		email: testEnv.VITE_TEST_EMAIL,
		username: expect.any(String),
		role: expect.any(String),
	});
}
