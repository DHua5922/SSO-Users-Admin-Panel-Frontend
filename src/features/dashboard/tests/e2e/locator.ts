import type { Page } from "@playwright/test";
import { getHeader } from "../../../../shared/tests/playwright/locator";
import { DASHBOARD_HEADER } from "../../constants";

export function getDashboardHeader(page: Page) {
  return getHeader(page, DASHBOARD_HEADER, {
    level: 1,
  });
}
