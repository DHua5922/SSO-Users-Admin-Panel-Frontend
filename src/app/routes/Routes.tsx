import { lazy, Suspense } from "react";
import { Routes as DefaultRoutes, Route } from "react-router";
import { LOGIN_PATH } from "../../features/auth/constants";
import { ROLES_PATH } from "../../features/roles/constants/general";
import { USERS_PATH } from "../../features/users/constants/general";
import Alerts from "../../shared/components/Alerts";
import PageLoader from "../../shared/components/PageLoader";
import { HOME_PATH } from "../../shared/constants";
import useStatusStore from "../../shared/useStatusStore";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));
const DashboardPage = lazy(
	() => import("../../features/dashboard/pages/DashboardPage"),
);
const UsersManagementPage = lazy(
	() => import("../../features/users/pages/UsersManagementPage"),
);
const RolesManagementPage = lazy(
	() => import("../../features/roles/pages/RolesManagementPage"),
);

export default function Routes() {
	const alerts = useStatusStore((state) => state.pageAlerts);
	const removePageAlert = useStatusStore((state) => state.removePageAlert);

	return (
		<Suspense fallback={<PageLoader>Loading Page...</PageLoader>}>
			<Alerts list={alerts} onRemoveAlert={removePageAlert} />

			<DefaultRoutes>
				<Route element={<PrivateRoute />}>
					<Route path={HOME_PATH} element={<DashboardPage />} />
					<Route path={USERS_PATH} element={<UsersManagementPage />} />
					<Route path={ROLES_PATH} element={<RolesManagementPage />} />
				</Route>

				<Route element={<PublicRoute />}>
					<Route path={LOGIN_PATH} element={<LoginPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</DefaultRoutes>
		</Suspense>
	);
}
