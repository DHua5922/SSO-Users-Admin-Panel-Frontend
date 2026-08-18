import { defineConfig, devices } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
	...baseConfig,
	testMatch: "**/tests/accessibility/**/*.test.ts",
	projects: [
		{
			name: "accessibility",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	workers: 1,
});
