import type { Page } from "@playwright/test";
import { SUCCESS_STATUS_CODE } from "../../constants";

export function waitForApiResponse({
	page,
	apiEndpoint,
	status = SUCCESS_STATUS_CODE,
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
