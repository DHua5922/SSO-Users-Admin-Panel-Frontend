import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/auth";

export default function PrivateRoute() {
	const me = useAuthStore((state) => state.me);
	return me._id ? <Outlet /> : <Navigate to="/login" />;
}
