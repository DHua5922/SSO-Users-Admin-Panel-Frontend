import { render, screen } from "@testing-library/react";
import Field from ".";

const label = "text field";

test("renders field with label and input", () => {
	renderField(false);
	expect(screen.getByLabelText(label)).toBeTruthy();
});

test("renders field with required indicator", () => {
	renderField(true);
	expect(screen.getByText("*")).toBeTruthy();
});

function renderField(required: boolean) {
	render(
		<Field label={label} inputProps={{ id: "input" }} required={required} />,
	);
}
