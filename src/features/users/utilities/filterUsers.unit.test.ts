import type { User } from "../schemas";
import { filterUsers } from "./filterUsers";

const users: User[] = [
	{
		_id: "1",
		username: "Alice",
		email: "alice@example.com",
		role: "admin",
		systemManaged: true,
	},
	{
		_id: "2",
		username: "Bob",
		email: "bob@example.com",
		role: "user",
		systemManaged: false,
	},
	{
		_id: "3",
		username: "Charlie",
		email: "charlie@example.com",
		role: "admin",
		systemManaged: false,
	},
];

test("filterUsers filters by search input and selected role", () => {
	expect(filterUsers(users, "alice", "")).toEqual([users[0]]);
	expect(filterUsers(users, "", "admin")).toEqual([users[0], users[2]]);
	expect(filterUsers(users, "bob", "user")).toEqual([users[1]]);
	expect(filterUsers(users, "bob", "admin")).toEqual([]);
});

test("filterUsers returns empty array when no users match", () => {
	expect(filterUsers(users, "nonexistent", "")).toEqual([]);
});

test("filterUsers returns array when filtering by username", () => {
	expect(filterUsers(users, "alice", "")).toEqual([users[0]]);
});

test("filterUsers returns array when filtering by email", () => {
	expect(filterUsers(users, "alice@example.com", "")).toEqual([users[0]]);
});

test("filterUsers returns array when filtering by role", () => {
	expect(filterUsers(users, "", "admin")).toEqual([users[0], users[2]]);
});
