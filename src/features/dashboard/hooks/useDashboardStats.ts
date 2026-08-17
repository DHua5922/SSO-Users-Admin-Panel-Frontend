import { useQuery } from "@tanstack/react-query";
import { ApiError, DefaultError } from "js-ts-kit";
import { getDashboardStatsApi } from "../api";

export function useDashboardStats() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["dashboardStats"],
		queryFn: getDashboardStatsApi,
		retry: false,
	});

	const errorMessage = ApiError.isApiError(error)
		? ApiError.default(error)
		: DefaultError.message(error);

	return {
		stats: data,
		isStatsError: isError,
		statsErrorMessage: errorMessage || "",
		isLoadingStats: isLoading,
	};
}
