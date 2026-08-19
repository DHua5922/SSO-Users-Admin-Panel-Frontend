import { testRoles } from "../../roles/tests/fixtures";

export const testUser = {
	_id: "2w3192hed1e",
	email: "test@example.com",
	username: "testadmin",
	role: testRoles[0]._id,
	systemManaged: false,
};
