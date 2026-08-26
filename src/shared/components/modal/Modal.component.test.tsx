import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAlertStore from "../../store/useAlertStore";
import { expectNoAccessibilityViolations } from "../../tests/react-testing-library/accessibility";
import { getButton } from "../../tests/react-testing-library/locator";
import Modal from "./Modal";

test("modal has no automatically detectable accessibility violations", async () => {
	render(
		<Modal title="Example modal" open onOpenChange={vi.fn()}>
			<p>Modal content</p>
		</Modal>,
	);

	await expectNoAccessibilityViolations();
});

test("clears modal alerts when closed", async () => {
	const event = userEvent.setup();
	useAlertStore.getState().addModalAlert({
		id: "modal-error-id",
		variant: "danger",
		message: "Could not save",
	});

	render(
		<Modal title="Example modal" open onOpenChange={vi.fn()}>
			<p>Modal content</p>
		</Modal>,
	);

	await event.click(getButton("close"));

	expect(useAlertStore.getState().modalAlerts).toEqual([]);
});
