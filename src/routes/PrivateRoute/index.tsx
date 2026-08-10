import { Navigate, Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import useAuthStore from "../../store/auth";

export default function PrivateRoute() {
	const me = useAuthStore((state) => state.me);
	return me._id ? (
		<>
			<Navbar />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" />
	);
}
