import { screen } from "@testing-library/react";
import { paths } from "../../constants";
import { mockGetMeSuccessApi } from "./server/me";
import { findUserButton } from "./ui/home";
import { renderApp } from "./ui/support/app";

test("Load home page", async () => {
	mockGetMeSuccessApi();
	renderApp(paths.home);

	expect(await findUserButton(screen)).toBeTruthy();
});
