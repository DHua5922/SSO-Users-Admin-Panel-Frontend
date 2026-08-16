import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import { findText } from "../../../../shared/tests/react-testing-library/locator";
import { DASHBOARD_PATH, DASHBOARD_STATS_ERROR_MESSAGE } from "../../constants";
import {
  mockGetDashboardStatsSuccessApi,
  mockGetDashboardStatsFailureApi,
} from "./server";

test("should show dashboard stats", () => {
  mockGetDashboardStatsSuccessApi();
  renderApp(DASHBOARD_PATH);

  expect(findText("10")).toBeTruthy();
  expect(findText("5")).toBeTruthy();
});

test("should show error when failing to get dashboard stats", () => {
  mockGetDashboardStatsFailureApi();
  renderApp(DASHBOARD_PATH);

  expect(findText(DASHBOARD_STATS_ERROR_MESSAGE)).toBeTruthy();
});
