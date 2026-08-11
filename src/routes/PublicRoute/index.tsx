import { Navigate, Outlet } from "react-router";
import PageLoader from "../../components/PageLoader";
import { LOADING_USER_TEXT, paths } from "../../constants";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function PublicRoute() {
	const { isLoggedIn, isLoading } = useCurrentUser();

	if (isLoading) return <PageLoader>{LOADING_USER_TEXT}</PageLoader>;

	return isLoggedIn ? (
		<Navigate to={paths.home} />
	) : (
		<main>
			<Outlet />
		</main>
	);
}
