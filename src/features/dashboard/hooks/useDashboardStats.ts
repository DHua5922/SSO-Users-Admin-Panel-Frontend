import { useQuery } from "@tanstack/react-query";
import { parseError } from "../../../shared/utilities/parseError";
import { getDashboardStatsApi } from "../api";

export function useDashboardStats() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["dashboardStats"],
		queryFn: getDashboardStatsApi,
		retry: false,
	});

	return {
		stats: data,
		isStatsError: isError,
		statsErrorMessage: error ? parseError(error) : "",
		isLoadingStats: isLoading,
	};
}
