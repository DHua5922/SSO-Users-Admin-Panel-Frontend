import type { Role } from "../schemas";
import { filterRoles } from "./filterRoles";

const roles: Role[] = [
	{
		_id: "1",
		name: "super",
		description: "Administrator role",
		systemManaged: true,
	},
	{
		_id: "2",
		name: "user",
		description: "Regular user role",
		systemManaged: false,
	},
	{
		_id: "3",
		name: "admin",
		description: "just for testing",
		systemManaged: false,
	},
];

test("filterRoles returns empty array when no roles match", () => {
	expect(filterRoles(roles, "nonexistent")).toEqual([]);
});

test("filterRoles returns array when filtering by name or description", () => {
	expect(filterRoles(roles, "admin")).toEqual([roles[0], roles[2]]);
});
