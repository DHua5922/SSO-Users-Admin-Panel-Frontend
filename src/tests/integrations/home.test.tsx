import { screen } from "@testing-library/react";
import { paths } from "../../constants";
import { mockGetMeSuccessApi } from "./server/me";
import { findUserMenuToggleButton } from "./ui/home";
import { renderApp } from "./ui/support/app";

test("Load home page", async () => {
	mockGetMeSuccessApi();
	renderApp(paths.home);

	expect(await findUserMenuToggleButton(screen)).toBeTruthy();
});
