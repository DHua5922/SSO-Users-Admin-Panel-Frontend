import { Navigate, Outlet } from "react-router";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
} from "../../../features/auth/constants";
import useCurrentUser from "../../../features/auth/hooks/useCurrentUser";
import PageLoader from "../../../shared/components/PageLoader";
import {
	MAIN_CONTENT_ID,
	SKIP_TO_MAIN_CONTENT_TEXT,
} from "../../../shared/constants";
import Navbar from "../../layouts/Navbar";

export default function PrivateRoute() {
	const { isLoggedIn, isLoading, currentUser } = useCurrentUser();

	if (isLoading) return <PageLoader>{LOADING_CURRENT_USER_TEXT}</PageLoader>;
	if (!isLoggedIn) return <Navigate to={LOGIN_PATH} />;

	return (
		<>
			<a
				href={`#${MAIN_CONTENT_ID}`}
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3"
			>
				{SKIP_TO_MAIN_CONTENT_TEXT}
			</a>

			<Navbar username={currentUser?.username || ""} />

			<main id={MAIN_CONTENT_ID} tabIndex={-1}>
				<Outlet />
			</main>
		</>
	);
}
