import type { Screen } from "@testing-library/react";
import { findButton } from "./support/locator";

export function findLoginButton(screen: Screen) {
	return findButton(screen, "login");
}
