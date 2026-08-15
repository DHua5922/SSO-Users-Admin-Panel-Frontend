import type { Screen } from "@testing-library/react";

export function findButton(screen: Screen, text: string) {
	return screen.findByRole("button", { name: new RegExp(text, "i") });
}
