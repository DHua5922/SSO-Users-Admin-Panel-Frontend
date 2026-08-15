import type { User } from "../schemas";

export function filterUsers(
	list: User[],
	searchInput: string,
	chosenRoleId: string,
) {
	return list.filter((user) => {
		const formattedUsername = user.username.toLowerCase().trim();
		const formattedEmail = user.email.toLowerCase().trim();
		const formattedSearchInput = searchInput.toLowerCase().trim();

		const hasRole = !chosenRoleId || user.role === chosenRoleId;
		const hasUsername = formattedUsername.includes(formattedSearchInput);
		const hasEmail = formattedEmail.includes(formattedSearchInput);

		return (hasUsername || hasEmail) && hasRole;
	});
}
