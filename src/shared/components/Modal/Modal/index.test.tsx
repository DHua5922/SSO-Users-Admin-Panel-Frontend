import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../tests/react-testing-library/accessibility";
import Modal from ".";

test("modal has no automatically detectable accessibility violations", async () => {
	render(
		<Modal title="Example modal" open onOpenChange={vi.fn()}>
			<p>Modal content</p>
		</Modal>,
	);

	await expectNoAccessibilityViolations();
});
