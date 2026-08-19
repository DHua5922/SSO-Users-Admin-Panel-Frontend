import { Navigate, Outlet } from "react-router";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
} from "../../features/auth/constants";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import PageLoader from "../../shared/components/PageLoader";
import { MAIN_CONTENT_ID } from "../constants";
import Navbar from "../layouts/Navbar";
import SkipLink from "../layouts/SkipLink";

export default function PrivateRoute() {
	const { isLoggedIn, isLoading, currentUser } = useCurrentUser();

	if (isLoading) return <PageLoader>{LOADING_CURRENT_USER_TEXT}</PageLoader>;
	if (!isLoggedIn) return <Navigate to={LOGIN_PATH} />;

	return (
		<>
			<SkipLink />
			<Navbar username={currentUser?.username || ""} />

			<main id={MAIN_CONTENT_ID} tabIndex={-1}>
				<Outlet />
			</main>
		</>
	);
}
