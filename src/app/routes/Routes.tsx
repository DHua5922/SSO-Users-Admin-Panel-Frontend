import { lazy, Suspense } from "react";
import { Routes as DefaultRoutes, Route } from "react-router";
import { LOGIN_PATH, LoginPage } from "../../features/auth";
import { ROLES_PATH, RolesManagementPage } from "../../features/roles";
import { USERS_PATH, UsersManagementPage } from "../../features/users";
import { AlertList, PageLoader } from "../../shared/components";
import { HOME_PATH } from "../../shared/constants";
import { useAlertStore } from "../../shared/store";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const DashboardPage = lazy(() =>
	import("../../features/dashboard").then(({ DashboardPage }) => ({
		default: DashboardPage,
	})),
);

export default function Routes() {
	const alerts = useAlertStore((state) => state.pageAlerts);
	const removePageAlert = useAlertStore((state) => state.removePageAlert);

	return (
		<Suspense fallback={<PageLoader>Loading Page...</PageLoader>}>
			<AlertList list={alerts} onRemoveAlert={removePageAlert} />

			<DefaultRoutes>
				<Route element={<PrivateRoute />}>
					<Route path={HOME_PATH} element={<DashboardPage />} />
					<Route path={USERS_PATH} element={<UsersManagementPage />} />
					<Route path={ROLES_PATH} element={<RolesManagementPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>

				<Route element={<PublicRoute />}>
					<Route path={LOGIN_PATH} element={<LoginPage />} />
				</Route>
			</DefaultRoutes>
		</Suspense>
	);
}
