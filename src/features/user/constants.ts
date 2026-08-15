import { testRoles } from "../../constants";

export const USERS_QUERY_KEY = "users";

export const ADD_USER_BUTTON_TEXT = "Add User";
export const UPDATE_USER_BUTTON_TEXT = "Update User";

export const testUser = {
  _id: "2w3192hed1e",
  email: "test@example.com",
  username: "testadmin",
  role: testRoles[0]._id,
};

export const EMPTY_USERS_MESSAGE = "No users.";

export const ADD_USER_MODAL_TITLE = "Add User";

export const CONFIRM_DELETE_USER_BUTTON_TEXT =
  "I accept the consequences. Delete User.";