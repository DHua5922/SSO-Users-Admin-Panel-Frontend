import { useQuery } from "@tanstack/react-query";
import { parseError } from "../../../shared/utilities/parseError";
import { getAllRolesApi } from "../api.ts";
import { ROLES_QUERY_KEY } from "../constants";

export default function useRoles() {
	const {
		isPending,
		data: roles,
		isError,
		error,
	} = useQuery({
		queryKey: [ROLES_QUERY_KEY],
		queryFn: getAllRolesApi,
		retry: false,
	});

	return {
		isLoading: isPending,
		list: roles || [],
		isError,
		errorMessage: error ? parseError(error) : "",
	};
}
