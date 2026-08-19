import type { Role } from "../schemas";
import { filterRoles } from "./filterRoles";

const roles: Role[] = [
	{ _id: "1", name: "super", description: "Administrator role" },
	{ _id: "2", name: "user", description: "Regular user role" },
	{ _id: "3", name: "admin", description: "just for testing" },
];

test("filterRoles returns empty array when no roles match", () => {
	const value = filterRoles(roles, "nonexistent");
	expect(value).toEqual([]);
});

test("filterRoles returns array when filtering by name or description", () => {
	const value = filterRoles(roles, "admin");
	expect(value).toEqual([roles[0], roles[2]]);
});
