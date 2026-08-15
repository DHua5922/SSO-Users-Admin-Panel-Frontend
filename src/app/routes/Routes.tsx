import { Routes as DefaultRoutes, Route } from "react-router";
import { LOGIN_PATH } from "../../features/auth/constants";
import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardPage from "../../features/dashboard/DashboardPage";
import { USERS_PATH } from "../../features/users/constants";
import UsersManagementPage from "../../features/users/pages/UsersManagementPage";
import Alerts from "../../shared/components/Alerts";
import { HOME_PATH } from "../../shared/constants";
import useStatusStore from "../../shared/useStatusStore";
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
					<Route path={HOME_PATH} element={<DashboardPage />} />
					<Route path={USERS_PATH} element={<UsersManagementPage />} />
				</Route>

				<Route element={<PublicRoute />}>
					<Route path={LOGIN_PATH} element={<LoginPage />} />
				</Route>
			</DefaultRoutes>
		</>
	);
}
