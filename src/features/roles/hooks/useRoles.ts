import { useQuery } from "@tanstack/react-query";
import { parseError } from "../../../shared/utilities/parseError";
import { getAllRolesApi } from "../api.ts";

export default function useRoles() {
	const {
		isPending,
		data: roles,
		isError,
		error,
	} = useQuery({
		queryKey: ["roles"],
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
