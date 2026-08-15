import { filterUsers } from "../../utilities";
import type { User } from "../../schemas";

const users: User[] = [
  { _id: "1", username: "Alice", email: "alice@example.com", role: "admin" },
  { _id: "2", username: "Bob", email: "bob@example.com", role: "user" },
  {
    _id: "3",
    username: "Charlie",
    email: "charlie@example.com",
    role: "admin",
  },
];

test("filterUsers filters by search input and chosen role", () => {
  expect(filterUsers(users, "alice", "")).toEqual([users[0]]);
  expect(filterUsers(users, "", "admin")).toEqual([users[0], users[2]]);
  expect(filterUsers(users, "bob", "user")).toEqual([users[1]]);
  expect(filterUsers(users, "bob", "admin")).toEqual([]);
});

test("filterUsers returns empty array when no users match", () => {
  const value = filterUsers(users, "nonexistent", "");
  expect(value).toEqual([]);
});

test("filterUsers returns array when filtering by username", () => {
  const value = filterUsers(users, "alice", "");
  expect(value).toEqual([users[0]]);
});

test("filterUsers returns array when filtering by email", () => {
  const value = filterUsers(users, "alice@example.com", "");
  expect(value).toEqual([users[0]]);
});

test("filterUsers returns array when filtering by role", () => {
  const value = filterUsers(users, "", "admin");
  const expectedResult = [users[0], users[2]];

  expect(value).toEqual(expectedResult);
});
