import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
		statsErrorMessage:
			axios.isAxiosError(error) && typeof error.response?.data === "string"
				? error.response.data
				: error?.message,
		isLoadingStats: isLoading,
	};
}
