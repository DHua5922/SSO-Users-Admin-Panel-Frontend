import type { Page } from "@playwright/test";
import { getHeading } from "../../../../shared/tests/playwright/locator";
import { DASHBOARD_HEADER } from "../../constants";

export function getDashboardHeader(page: Page) {
	return getHeading(page, DASHBOARD_HEADER, {
		level: 1,
	});
}
