import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { LOADING_TEXT } from "../../constants";
import {
	getButton,
	getText,
	queryButton,
} from "../../tests/react-testing-library/locator";
import Button from ".";

const buttonText = "Click me";

test("renders button with children", () => {
	renderButton({});
	expect(getButton(buttonText)).toBeTruthy();
});

test("renders button with loading state", async () => {
	const { event, onClick } = renderButton({
		isLoading: true,
		loadingText: LOADING_TEXT,
	});

	expect(getText(LOADING_TEXT)).toBeTruthy();
	expect(queryButton(buttonText)).not.toBeTruthy();

	await event.click(getButton(LOADING_TEXT));
	expect(onClick).not.toHaveBeenCalled();
});

test("renders button with disabled state", async () => {
	const { event, onClick } = renderButton({ disabled: true });

	await event.click(getButton(buttonText));
	expect(onClick).not.toHaveBeenCalled();
	expect(getButton(buttonText)).toHaveProperty("disabled", true);
});

function renderButton(props: ComponentProps<typeof Button>) {
	const event = userEvent.setup();
	const onClick = vi.fn();

	render(
		<Button {...props} onClick={onClick}>
			{buttonText}
		</Button>,
	);

	return { event, onClick };
}
