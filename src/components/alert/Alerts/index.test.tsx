import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Alert } from "../../../types/status";
import Alerts from ".";

test("shows alerts", () => {
	const alerts: Alert[] = [
		{ id: "1", variant: "success", message: "Success alert" },
		{ id: "2", variant: "danger", message: "Danger alert" },
	];

	renderAlerts(alerts);

	alerts.forEach((alert) => {
		expect(screen.getByText(alert.message)).toBeTruthy();
	});
});

test("does not show alerts when list is empty", () => {
	renderAlerts([]);
	expect(screen.queryByRole("alert")).toBeFalsy();
});

test("calls onRemoveAlert when clicking on the close button", async () => {
	const alerts: Alert[] = [
		{ id: "1", variant: "danger", message: "danger alert" },
	];
	const { onRemoveAlert, event } = renderAlerts(alerts);

	const removeButton = screen.getByRole("button", { name: /close alert/i });
	await event.click(removeButton);

	expect(onRemoveAlert).toHaveBeenCalledWith(alerts[0].id);
});

function renderAlerts(alerts: Alert[]) {
	const event = userEvent.setup();
	const onRemoveAlert = vi.fn();
	render(<Alerts list={alerts} onRemoveAlert={onRemoveAlert} />);
	return { onRemoveAlert, event };
}
