import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../tests/react-testing-library/accessibility";
import Collapsible from "./Collapsible";

test.each([false, true])(
	"collapsible has no automatically detectable accessibility violations",
	async (expanded) => {
		render(
			<Collapsible expanded={expanded}>
				<button type="button">Menu item</button>
			</Collapsible>,
		);

		await expectNoAccessibilityViolations();
	},
);
