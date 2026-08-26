import { Navigate, Outlet } from "react-router";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
	useCurrentUser,
} from "../../features/auth";
import { PageLoader } from "../../shared/components";
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
