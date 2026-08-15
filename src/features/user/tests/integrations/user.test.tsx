import { renderApp } from "../../../../shared/utilities/react-testing-library/app";
import { paths } from "../../../../constants";
import {
  EMPTY_USERS_MESSAGE,
  ADD_USER_MODAL_TITLE,
  testUser,
  ADD_USER_BUTTON_TEXT,
  UPDATE_USER_BUTTON_TEXT,
  CONFIRM_DELETE_USER_BUTTON_TEXT,
} from "../../constants";
import { fillInPasswordInput, getAddUserButton } from "./ui";
import { mockGetMeSuccessApi } from "../../../../tests/integrations/server/me";
import { mockGetRolesSuccessApi } from "../../../../tests/integrations/server/role";
import {
  mockUpsertUserSuccessApi,
  mockDeleteUserSuccessApi,
  mockGetUsersSuccessApi,
  mockDeleteUserFailureApi,
  mockUpsertUserFailureApi,
} from "./server";
import { screen, within } from "@testing-library/react";

describe("Add User", () => {
  test("should add user", async () => {
    const password = "password123";

    mockGetMeSuccessApi();
    mockGetRolesSuccessApi();
    mockGetUsersSuccessApi([]);
    mockUpsertUserSuccessApi();

    const { event } = renderApp(paths.users);

    expect(await screen.findByText(EMPTY_USERS_MESSAGE)).toBeTruthy();
    expect(getAddUserButton()).toBeTruthy();
    await event.click(getAddUserButton());

    const dialog = await screen.findByRole("dialog", {
      name: ADD_USER_MODAL_TITLE,
    });
    expect(dialog).toBeTruthy();

    await event.type(
      within(dialog).getByLabelText(/username/i),
      testUser.username,
    );
    await event.selectOptions(
      within(dialog).getByLabelText(/role/i),
      testUser.role,
    );
    await event.type(within(dialog).getByLabelText(/email/i), testUser.email);
    await fillInPasswordInput(event, password);
    await event.type(
      within(dialog).getByLabelText(/confirm password/i),
      password,
    );

    const submitButton = within(dialog).getByRole("button", {
      name: new RegExp(ADD_USER_BUTTON_TEXT, "i"),
    });
    mockGetUsersSuccessApi([testUser]);
    await event.click(submitButton);

    const usersTable = await screen.findByRole("table");
    expect(await within(usersTable).findByText(testUser.username)).toBeTruthy();
    expect(await within(usersTable).findByText(testUser.email)).toBeTruthy();
    expect(await within(usersTable).findByText(testUser.role)).toBeTruthy();
    expect(
      await within(usersTable).findByRole("button", {
        name: new RegExp(
          `button that show popup for editing ${testUser.username}`,
          "i",
        ),
      }),
    ).toBeTruthy();
    expect(
      await within(usersTable).findByRole("button", {
        name: new RegExp(
          `button that show popup for deleting ${testUser.username}`,
          "i",
        ),
      }),
    ).toBeTruthy();
  });

  test("should show error when failing to add user", async () => {
    const password = "password123";

    mockGetMeSuccessApi();
    mockGetRolesSuccessApi();
    mockGetUsersSuccessApi([]);
    mockUpsertUserFailureApi();

    const { event } = renderApp(paths.users);

    expect(await screen.findByText(EMPTY_USERS_MESSAGE)).toBeTruthy();
    expect(getAddUserButton()).toBeTruthy();
    await event.click(getAddUserButton());

    const dialog = await screen.findByRole("dialog", {
      name: ADD_USER_MODAL_TITLE,
    });
    expect(dialog).toBeTruthy();

    await event.type(
      within(dialog).getByLabelText(/username/i),
      testUser.username,
    );
    await event.selectOptions(
      within(dialog).getByLabelText(/role/i),
      testUser.role,
    );
    await event.type(within(dialog).getByLabelText(/email/i), testUser.email);
    await fillInPasswordInput(event, password);
    await event.type(
      within(dialog).getByLabelText(/confirm password/i),
      password,
    );

    const submitButton = within(dialog).getByRole("button", {
      name: new RegExp(ADD_USER_BUTTON_TEXT, "i"),
    });
    await event.click(submitButton);

    const alert = await within(dialog).findByRole("alert");
    expect(within(alert).getByText(/cannot upsert user/i)).toBeTruthy();
  });
});

test("should update user", async () => {
  const updatedUser = {
    ...testUser,
    username: "updateduser",
    email: "updateduser@example.com",
  };

  mockGetMeSuccessApi();
  mockGetRolesSuccessApi();
  mockGetUsersSuccessApi([testUser]);
  mockUpsertUserSuccessApi();

  const { event } = renderApp(paths.users);

  const editButton = await screen.findByRole("button", {
    name: new RegExp(
      `button that show popup for editing ${testUser.username}`,
      "i",
    ),
  });
  await event.click(editButton);

  const dialog = await screen.findByRole("dialog", {
    name: new RegExp(`Edit ${testUser.username}`, "i"),
  });

  const usernameInput = within(dialog).getByLabelText(
    /username/i,
  ) as HTMLInputElement;
  const emailInput = within(dialog).getByLabelText(
    /email/i,
  ) as HTMLInputElement;
  const roleSelect = within(dialog).getByLabelText(
    /role/i,
  ) as HTMLSelectElement;

  expect(usernameInput.value).toBe(testUser.username);
  expect(emailInput.value).toBe(testUser.email);
  expect(roleSelect.value).toBe(testUser.role);

  await event.clear(usernameInput);
  await event.clear(emailInput);

  await event.type(usernameInput, updatedUser.username);
  await event.type(emailInput, updatedUser.email);
  await event.selectOptions(roleSelect, updatedUser.role);

  mockGetUsersSuccessApi([updatedUser]);

  await event.click(
    within(dialog).getByRole("button", {
      name: new RegExp(UPDATE_USER_BUTTON_TEXT, "i"),
    }),
  );

  const updatedUsersTable = await screen.findByRole("row", {
    name: new RegExp(updatedUser.username, "i"),
  });
  expect(
    await within(updatedUsersTable).findByText(updatedUser.username),
  ).toBeTruthy();
  expect(
    await within(updatedUsersTable).findByText(updatedUser.email),
  ).toBeTruthy();
  expect(
    await within(updatedUsersTable).findByText(updatedUser.role),
  ).toBeTruthy();
  expect(
    await within(updatedUsersTable).findByRole("button", {
      name: new RegExp(
        `button that show popup for editing ${updatedUser.username}`,
        "i",
      ),
    }),
  ).toBeTruthy();
  expect(
    await within(updatedUsersTable).findByRole("button", {
      name: new RegExp(
        `button that show popup for deleting ${updatedUser.username}`,
        "i",
      ),
    }),
  ).toBeTruthy();
});

describe("Delete User", () => {
  test("should delete user", async () => {
    mockGetMeSuccessApi();
    mockGetRolesSuccessApi();
    mockGetUsersSuccessApi([testUser]);
    mockDeleteUserSuccessApi();

    const { event } = renderApp(paths.users);

    const deleteButton = await screen.findByRole("button", {
      name: new RegExp(
        `button that show popup for deleting ${testUser.username}`,
        "i",
      ),
    });
    await event.click(deleteButton);

    const dialog = await screen.findByRole("dialog", {
      name: new RegExp(`Delete ${testUser.username}`, "i"),
    });
    mockGetUsersSuccessApi([]);
    await event.click(
      within(dialog).getByRole("button", {
        name: new RegExp(CONFIRM_DELETE_USER_BUTTON_TEXT, "i"),
      }),
    );
    expect(await screen.findByText(EMPTY_USERS_MESSAGE)).toBeTruthy();
  });

  test("should show error message when failing to delete user", async () => {
    mockGetMeSuccessApi();
    mockGetRolesSuccessApi();
    mockGetUsersSuccessApi([testUser]);
    mockDeleteUserFailureApi();

    const { event } = renderApp(paths.users);

    const deleteButton = await screen.findByRole("button", {
      name: new RegExp(
        `button that show popup for deleting ${testUser.username}`,
        "i",
      ),
    });
    await event.click(deleteButton);

    const dialog = await screen.findByRole("dialog", {
      name: new RegExp(`Delete ${testUser.username}`, "i"),
    });
    const confirmDeleteButton = within(dialog).getByRole("button", {
      name: new RegExp(CONFIRM_DELETE_USER_BUTTON_TEXT, "i"),
    });
    await event.click(confirmDeleteButton);

    const alert = await within(dialog).findByRole("alert");
    expect(within(alert).getByText(/cannot delete user/i)).toBeTruthy();
  });
});

describe("Filter Users", () => {
  const roles = [
    { _id: "admin-role-id", name: "Admin", description: "Administrators" },
    { _id: "user-role-id", name: "User", description: "Standard users" },
  ];
  const users = [
    {
      _id: "john-user-id",
      username: "John Doe",
      email: "johndoe@example.com",
      role: roles[0]._id,
    },
    {
      _id: "jane-user-id",
      username: "Jane Smith",
      email: "janesmith@example.com",
      role: roles[1]._id,
    },
  ];

  beforeEach(() => {
    mockGetMeSuccessApi();
    mockGetRolesSuccessApi(roles);
    mockGetUsersSuccessApi(users);
  });

  test("should filter users by username and email from search bar (case insensitive)", async () => {
    const { event } = renderApp(paths.users);

    await event.type(
      await screen.findByRole("searchbox", { name: /search users/i }),
      "smi",
    );

    const matchingRow = await screen.findByRole("row", {
      name: new RegExp(users[1].username, "i"),
    });
    expect(within(matchingRow).getByText(users[1].email)).toBeTruthy();
    expect(within(matchingRow).getByText(users[1].role)).toBeTruthy();

    expect(
      screen.queryByRole("row", {
        name: new RegExp(users[0].username, "i"),
      }),
    ).toBeNull();
  });

  test("should filter users by role from role select", async () => {
    const { event } = renderApp(paths.users);

    await event.selectOptions(
      await screen.findByRole("combobox", { name: /filter users by role/i }),
      roles[0]._id,
    );

    const matchingRow = await screen.findByRole("row", {
      name: new RegExp(users[0].username, "i"),
    });
    expect(within(matchingRow).getByText(users[0].email)).toBeTruthy();
    expect(within(matchingRow).getByText(users[0].role)).toBeTruthy();

    expect(
      screen.queryByRole("row", {
        name: new RegExp(users[1].username, "i"),
      }),
    ).toBeNull();
  });
});
