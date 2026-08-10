import { Routes as DefaultRoutes, Route } from "react-router";
import Alerts from "../components/alert/Alerts";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import useStatusStore from "../store/status";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function Routes() {
	const alerts = useStatusStore((state) => state.pageAlerts);
	const removePageAlert = useStatusStore((state) => state.removePageAlert);
	return (
		<>
			<Alerts list={alerts} onRemoveAlert={removePageAlert} />

			<DefaultRoutes>
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<HomePage />} />
				</Route>

				<Route element={<PublicRoute />}>
					<Route path="login" element={<LoginPage />} />
				</Route>
			</DefaultRoutes>
		</>
	);
}
