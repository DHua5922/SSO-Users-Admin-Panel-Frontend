import type { Page } from "@playwright/test";

export function waitForApiResponse({
	page,
	apiEndpoint,
	status = 200,
	method = "GET",
}: {
	page: Page;
	apiEndpoint: string;
	status?: number;
	method?: string;
}) {
	return page.waitForResponse((response) => {
		return (
			response.url().includes(apiEndpoint) &&
			response.status() === status &&
			response.request().method() === method
		);
	});
}
