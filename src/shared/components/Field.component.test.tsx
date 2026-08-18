import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../tests/react-testing-library/accessibility";
import {
	getLabel,
	getText,
	queryText,
} from "../tests/react-testing-library/locator";
import Field from "./Field";

const label = "text field";
const requiredIndicator = "*";

test("renders field with label and input", () => {
	renderField(false, "");
	expect(getLabel(label)).toBeTruthy();
	expect(queryText(requiredIndicator)).not.toBeTruthy();
});

test("renders field with required indicator", () => {
	renderField(true, "");
	expect(getText(requiredIndicator)).toBeTruthy();
});

test("renders field with error message", () => {
	const errorMessage = "error field";

	renderField(true, errorMessage);
	expect(getText(requiredIndicator)).toBeTruthy();
	expect(getText(errorMessage)).toBeTruthy();
});

test.each([
	{ required: false, errorMessage: "" },
	{ required: true, errorMessage: "This field is required" },
])(
	"has no automatically detectable accessibility violations",
	async ({ required, errorMessage }) => {
		renderField(required, errorMessage);
		await expectNoAccessibilityViolations();
	},
);

function renderField(required: boolean, errorMessage: string) {
	const inputId = "input";
	render(
		<Field
			label={label}
			htmlFor={inputId}
			required={required}
			errorMessage={errorMessage}
		>
			<input id={inputId} />
		</Field>,
	);
}
