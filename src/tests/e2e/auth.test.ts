/// <reference types="node" />

import { expect, test } from "@playwright/test";
import { z } from "zod";

test("authenticates user", async ({ page }) => {
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
	await page.getByRole("button", { name: "Login" }).click();

	await expect(page.getByText(/Home Page/i)).toBeVisible();
});
