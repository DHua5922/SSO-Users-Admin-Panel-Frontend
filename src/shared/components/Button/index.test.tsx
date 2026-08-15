import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import Button from ".";

const buttonText = "Click me";
const buttonTextRegex = new RegExp(buttonText, "i");

test("renders button with children", () => {
	renderButton({});
	expect(screen.getByRole("button", { name: buttonTextRegex })).toBeTruthy();
});

test("renders button with loading state", async () => {
	const loadingTextRegex = new RegExp("Loading...", "i");
	const { event, onClick } = renderButton({
		isLoading: true,
		loadingText: loadingTextRegex.source,
	});

	expect(screen.getByText(loadingTextRegex)).toBeTruthy();
	expect(screen.queryByRole("button", { name: buttonTextRegex })).toBeFalsy();

	await event.click(screen.getByRole("button", { name: loadingTextRegex }));
	expect(onClick).not.toHaveBeenCalled();
});

test("renders button with disabled state", async () => {
	const { event, onClick } = renderButton({ disabled: true });

	await event.click(screen.getByRole("button", { name: buttonTextRegex }));
	expect(onClick).not.toHaveBeenCalled();
	expect(screen.getByRole("button", { name: buttonTextRegex })).toHaveProperty(
		"disabled",
		true,
	);
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
