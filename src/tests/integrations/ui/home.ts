import type { Screen } from "@testing-library/react";
import { testUser } from "../../../constants";

export function findUserButton(screen: Screen) {
	return screen.findByRole("button", {
		name: new RegExp("User menu", "i"),
	});
}
