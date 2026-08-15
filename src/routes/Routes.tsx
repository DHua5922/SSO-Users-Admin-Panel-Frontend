import { Routes as DefaultRoutes, Route } from "react-router";
import { LOGIN_PATH } from "../features/auth/constants";
import { USERS_PATH } from "../features/user/constants";
import UsersManagementPage from "../features/user/UsersManagementPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Alerts from "../shared/components/alert/Alerts";
import { HOME_PATH } from "../shared/constants";
import useStatusStore from "../shared/store/status";
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
          <Route path={HOME_PATH} element={<HomePage />} />
          <Route path={USERS_PATH} element={<UsersManagementPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path={LOGIN_PATH} element={<LoginPage />} />
        </Route>
      </DefaultRoutes>
    </>
  );
}
