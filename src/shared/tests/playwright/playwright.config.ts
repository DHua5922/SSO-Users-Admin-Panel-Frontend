import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const frontendBaseUrl = z.url().parse(process.env.VITE_FRONTEND_BASE_URL);

export default defineConfig({
	testDir: "../../../",
	testMatch: "**/*.e2e.test.{ts,tsx}",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 7"] },
		},
		{
			name: "mobile-safari",
			use: { ...devices["iPhone 12"] },
		},
	],
	webServer: {
		command: "pnpm run dev",
		url: frontendBaseUrl,
		reuseExistingServer: !process.env.CI,
	},
});
