import { Navigate, Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import PageLoader from "../../components/PageLoader";
import { LOADING_USER_TEXT, paths } from "../../constants";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function PrivateRoute() {
	const { isLoggedIn, isLoading, currentUser } = useCurrentUser();

	if (isLoading) return <PageLoader>{LOADING_USER_TEXT}</PageLoader>;
	if (!isLoggedIn) return <Navigate to={paths.login} />;

	return (
		<>
			<Navbar username={currentUser?.username || ""} />

			<main>
				<Outlet />
			</main>
		</>
	);
}
