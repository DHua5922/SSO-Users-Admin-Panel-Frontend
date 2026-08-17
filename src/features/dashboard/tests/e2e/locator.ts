import type { Page } from "@playwright/test";
import {
	getHeading,
	getSection,
} from "../../../../shared/tests/playwright/locator";
import {
	DASHBOARD_HEADER,
	DASHBOARD_ROLE_STATS_HEADER,
	DASHBOARD_USER_STATS_HEADER,
} from "../../constants";

export function getDashboardHeader(page: Page) {
	return getHeading(page, DASHBOARD_HEADER, {
		level: 1,
	});
}

export function getDashboardUserStatsSection(page: Page) {
	return getSection(page, DASHBOARD_USER_STATS_HEADER);
}

export function getDashboardRoleStatsSection(page: Page) {
	return getSection(page, DASHBOARD_ROLE_STATS_HEADER);
}
