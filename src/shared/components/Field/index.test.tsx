import { render } from "@testing-library/react";
import {
	getLabel,
	getText,
	queryText,
} from "../../tests/react-testing-library/locator";
import Field from ".";

const label = "text field";
const requiredIndicator = "*";

test("renders field with label and input", () => {
	renderField(false);
	expect(getLabel(label)).toBeTruthy();
	expect(queryText(requiredIndicator)).not.toBeTruthy();
});

test("renders field with required indicator", () => {
	renderField(true);
	expect(getText(requiredIndicator)).toBeTruthy();
});

function renderField(required: boolean) {
	const inputId = "input";
	render(
		<Field label={label} htmlFor={inputId} required={required}>
			<input id={inputId} />
		</Field>,
	);
}
