import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/auth";

export default function PublicRoute() {
	const me = useAuthStore((state) => state.me);
	return me._id ? <Navigate to="/" /> : <Outlet />;
}
