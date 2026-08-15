import { Navigate, Outlet } from "react-router";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
} from "../../features/auth/constants";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import Navbar from "../../shared/components/navbar/Navbar";
import PageLoader from "../../shared/components/PageLoader";

export default function PrivateRoute() {
	const { isLoggedIn, isLoading, currentUser } = useCurrentUser();

	if (isLoading) return <PageLoader>{LOADING_CURRENT_USER_TEXT}</PageLoader>;
	if (!isLoggedIn) return <Navigate to={LOGIN_PATH} />;

	return (
		<>
			<Navbar username={currentUser?.username || ""} />

			<main>
				<Outlet />
			</main>
		</>
	);
}
