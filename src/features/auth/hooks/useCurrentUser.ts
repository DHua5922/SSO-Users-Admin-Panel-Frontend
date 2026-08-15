import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/me";
import { ME_QUERY_KEY } from "../constants";

export default function useCurrentUser() {
	const { data: currentUser, isPending } = useQuery({
		queryKey: [ME_QUERY_KEY],
		queryFn: getMeApi,
		retry: false,
	});

	return { isLoading: isPending, isLoggedIn: currentUser?._id, currentUser };
}
