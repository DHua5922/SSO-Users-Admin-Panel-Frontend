import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CLOSE_ALERT_BUTTON_TEXT } from "../../constants";
import {
	getButton,
	getText,
	queryAlert,
} from "../../tests/react-testing-library/locator";
import type { Alert } from "../../types";
import Alerts from ".";

test("shows alerts", () => {
	const alerts: Alert[] = [
		{ id: "1", variant: "success", message: "Success alert" },
		{ id: "2", variant: "danger", message: "Danger alert" },
	];

	renderAlerts(alerts);

	alerts.forEach((alert) => {
		expect(getText(alert.message)).toBeTruthy();
	});
});

test("does not show alerts when list is empty", () => {
	renderAlerts([]);
	expect(queryAlert("")).toBeFalsy();
});

test("calls onRemoveAlert when clicking on the close button", async () => {
	const alerts: Alert[] = [
		{ id: "1", variant: "danger", message: "danger alert" },
	];
	const { onRemoveAlert, event } = renderAlerts(alerts);

	await event.click(getButton(CLOSE_ALERT_BUTTON_TEXT));

	expect(onRemoveAlert).toHaveBeenCalledWith(alerts[0].id);
});

function renderAlerts(alerts: Alert[]) {
	const event = userEvent.setup();
	const onRemoveAlert = vi.fn();

	render(<Alerts list={alerts} onRemoveAlert={onRemoveAlert} />);

	return { onRemoveAlert, event };
}
