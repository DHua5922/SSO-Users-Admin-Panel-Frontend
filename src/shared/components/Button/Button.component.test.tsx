import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { LOADING_TEXT } from "../../constants";
import { expectNoAccessibilityViolations } from "../../tests/react-testing-library/accessibility";
import {
	getButton,
	queryButton,
} from "../../tests/react-testing-library/locator";
import Button from "./Button";

const buttonText = "Click me";

test("renders button with children", () => {
	renderButton({});
	expect(getButton(buttonText)).toBeTruthy();
});

test("renders button with loading state", async () => {
	const { event, onClick } = renderButton({
		isLoading: true,
	});
	const button = getButton(LOADING_TEXT);

	expect(button).toBeTruthy();
	expect(queryButton(buttonText)).not.toBeTruthy();

	await event.click(button);
	expect(onClick).not.toHaveBeenCalled();
});

test("renders button with disabled state", async () => {
	const { event, onClick } = renderButton({ disabled: true });

	await event.click(getButton(buttonText));
	expect(onClick).not.toHaveBeenCalled();
	expect(getButton(buttonText)).toHaveProperty("disabled", true);
});

test.each([{}, { isLoading: true }, { disabled: true }])(
	"has no automatically detectable accessibility violations",
	async (props) => {
		renderButton(props);
		await expectNoAccessibilityViolations();
	},
);

function renderButton({
	isLoading = false,
	...props
}: Partial<ComponentProps<typeof Button>>) {
	const event = userEvent.setup();
	const onClick = vi.fn();
	render(
		<Button
			{...props}
			isLoading={isLoading}
			loadingText={LOADING_TEXT}
			onClick={onClick}
		>
			{buttonText}
		</Button>,
	);

	return { event, onClick };
}
