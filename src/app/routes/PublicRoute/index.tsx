import { Navigate, Outlet } from "react-router";
import { LOADING_CURRENT_USER_TEXT } from "../../../features/auth/constants";
import useCurrentUser from "../../../features/auth/hooks/useCurrentUser";
import PageLoader from "../../../shared/components/PageLoader";
import { HOME_PATH } from "../../../shared/constants";

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
