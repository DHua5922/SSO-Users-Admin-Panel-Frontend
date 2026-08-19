import type { User } from "../schemas";

export function filterUsers(
	list: User[],
	searchInput: string,
	selectedRoleId: string,
) {
	return list.filter((user) => {
		const formattedUsername = user.username.toLowerCase().trim();
		const formattedEmail = user.email.toLowerCase().trim();
		const formattedSearchInput = searchInput.toLowerCase().trim();

		const hasRole = !selectedRoleId || user.role === selectedRoleId;
		const hasUsername = formattedUsername.includes(formattedSearchInput);
		const hasEmail = formattedEmail.includes(formattedSearchInput);

		return (hasUsername || hasEmail) && hasRole;
	});
}
