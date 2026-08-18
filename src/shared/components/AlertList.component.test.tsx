import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CLOSE_ALERT_BUTTON_TEXT } from "../constants";
import { expectNoAccessibilityViolations } from "../tests/react-testing-library/accessibility";
import {
	getButton,
	getText,
	queryAlert,
} from "../tests/react-testing-library/locator";
import type { Alert } from "../types";
import AlertList from "./AlertList";

const alerts: Alert[] = [
	{ id: "1", variant: "success", message: "Saved successfully" },
	{ id: "2", variant: "danger", message: "Could not save" },
];

test("shows alerts", () => {
	renderAlerts(alerts);

	alerts.forEach((alert) => {
		expect(getText(alert.message)).toBeTruthy();
	});
});

test("has no automatically detectable accessibility violations", async () => {
	renderAlerts(alerts);
	await expectNoAccessibilityViolations();
});

test("does not show alerts when list is empty", () => {
	renderAlerts([]);
	expect(queryAlert("")).toBeFalsy();
});

test("calls onRemoveAlert when clicking on the close button", async () => {
	const { onRemoveAlert, event } = renderAlerts([alerts[1]]);

	await event.click(getButton(CLOSE_ALERT_BUTTON_TEXT));

	expect(onRemoveAlert).toHaveBeenCalledWith(alerts[1].id);
});

function renderAlerts(alerts: Alert[]) {
	const event = userEvent.setup();
	const onRemoveAlert = vi.fn();

	render(<AlertList list={alerts} onRemoveAlert={onRemoveAlert} />);

	return { onRemoveAlert, event };
}
