import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../tests/react-testing-library/accessibility";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

test("delete confirmation modal has no automatically detectable accessibility violations", async () => {
	render(
		<DeleteConfirmationModal
			title="Delete user"
			open
			onOpenChange={vi.fn()}
			onClickDelete={vi.fn()}
			question="Are you sure?"
			heroText="Example user"
			isDeleting={false}
			loadingButtonText="Deleting..."
			deleteButtonText="Delete user"
		/>,
	);

	await expectNoAccessibilityViolations();
});
