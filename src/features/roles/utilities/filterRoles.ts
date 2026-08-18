import type { Role } from "../schemas";

export function filterRoles(list: Role[], searchInput: string) {
	return list.filter((role) => {
		const formattedName = role.name.toLowerCase().trim();
		const formattedDescription = role.description.toLowerCase().trim();
		const formattedSearchInput = searchInput.toLowerCase().trim();

		const hasName = formattedName.includes(formattedSearchInput);
		const hasDescription = formattedDescription.includes(formattedSearchInput);

		return hasName || hasDescription;
	});
}
