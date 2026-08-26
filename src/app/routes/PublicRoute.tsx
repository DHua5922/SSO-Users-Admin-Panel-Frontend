import { Navigate, Outlet } from "react-router";
import { LOADING_CURRENT_USER_TEXT, useCurrentUser } from "../../features/auth";
import { PageLoader } from "../../shared/components";
import { HOME_PATH } from "../../shared/constants";

export default function PublicRoute() {
	const { isLoggedIn, isLoading } = useCurrentUser();

	if (isLoading) return <PageLoader>{LOADING_CURRENT_USER_TEXT}</PageLoader>;

	return isLoggedIn ? (
		<Navigate to={HOME_PATH} />
	) : (
		<main>
			<Outlet />
		</main>
	);
}
