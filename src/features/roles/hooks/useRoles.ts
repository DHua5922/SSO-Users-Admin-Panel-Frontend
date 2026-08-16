import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAllRolesApi } from "../api/role.ts";

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
		errorMessage:
			axios.isAxiosError(error) && typeof error.response?.data === "string"
				? error.response.data
				: error?.message,
	};
}
