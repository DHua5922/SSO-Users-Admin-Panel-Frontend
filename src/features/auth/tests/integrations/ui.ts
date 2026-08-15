import type { Screen } from "@testing-library/react";
import { findButton } from "../../../../shared/tests/react-testing-library/locator";
import { CURRENT_USER_TOGGLE_ARIA_LABEL } from "../../constants";

export function findLoginButton(screen: Screen) {
	return findButton(screen, "login");
}

export function findUserMenuToggleButton(screen: Screen) {
	return screen.findByRole("button", {
		name: new RegExp(CURRENT_USER_TOGGLE_ARIA_LABEL, "i"),
	});
}
