import { screen, render } from "@testing-library/react";
import RoleSelect from ".";
import type { Role } from "../../schemas/role";
import {
  DEFAULT_ROLE_SELECT_OPTION,
  LOADING_ROLES_TEXT,
} from "../../constants";

test("renders loading state", () => {
  renderRoleSelect(true, false, "");
  expect(screen.getByText(LOADING_ROLES_TEXT)).toBeTruthy();
});

test("renders error state", () => {
  const errorMessage = "Error loading roles";

  renderRoleSelect(false, true, errorMessage);

  expect(screen.getByText(errorMessage)).toBeTruthy();
});

test("renders list of roles", () => {
  const roles: Role[] = [
    { _id: "1", name: "Admin", description: "Admin role" },
    { _id: "2", name: "User", description: "User role" },
  ];
  const roleNames = roles.map((role) => role.name);

  renderRoleSelect(false, false, "", roles);

  [DEFAULT_ROLE_SELECT_OPTION, ...roleNames].forEach((text) => {
    expect(screen.getByText(text)).toBeTruthy();
  });
});

function renderRoleSelect(
  isLoading: boolean,
  isError: boolean,
  errorMessage: string,
  list?: Role[],
) {
  render(
    <RoleSelect
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      list={list}
    />,
  );
}
