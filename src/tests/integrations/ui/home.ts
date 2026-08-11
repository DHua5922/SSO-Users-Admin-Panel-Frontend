import type { Screen } from "@testing-library/react";
import { USER_MENU_TOGGLE_ARIA_LABEL } from "../../../constants";

export function findUserMenuToggleButton(screen: Screen) {
	return screen.findByRole("button", {
		name: new RegExp(USER_MENU_TOGGLE_ARIA_LABEL, "i"),
	});
}
