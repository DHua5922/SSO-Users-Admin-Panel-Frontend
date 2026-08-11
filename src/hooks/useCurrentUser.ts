import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/me";

export default function useCurrentUser() {
	const { data: currentUser, isPending } = useQuery({
		queryKey: ["me"],
		queryFn: getMeApi,
		retry: false,
	});

	return { isLoading: isPending, isLoggedIn: currentUser?._id, currentUser };
}
