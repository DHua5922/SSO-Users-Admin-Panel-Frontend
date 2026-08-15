import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { ADD_USER_BUTTON_TEXT } from "../../constants";

export function getAddUserButton() {
	return screen.getByRole("button", {
		name: new RegExp(ADD_USER_BUTTON_TEXT, "i"),
	});
}

export function fillInPasswordInput(event: UserEvent, password: string) {
	return event.type(
		screen.getAllByLabelText(/password/i, { exact: true })[0],
		password,
	);
}
