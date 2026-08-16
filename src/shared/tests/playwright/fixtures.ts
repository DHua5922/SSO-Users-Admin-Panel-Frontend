import type { Page } from "@playwright/test";

export function waitForApiResponse(page: Page, apiEndpoint: string) {
	return page.waitForResponse((response) => {
		return response.url().includes(apiEndpoint) && response.status() === 200;
	});
}
