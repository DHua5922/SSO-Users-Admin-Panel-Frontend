import { Routes as DefaultRoutes, Route } from "react-router";
import Alerts from "../components/alert/Alerts";
import { paths } from "../constants";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import useStatusStore from "../store/status";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UsersManagementPage from "../features/user/UsersManagementPage";

export default function Routes() {
  const alerts = useStatusStore((state) => state.pageAlerts);
  const removePageAlert = useStatusStore((state) => state.removePageAlert);

  return (
    <>
      <Alerts list={alerts} onRemoveAlert={removePageAlert} />

      <DefaultRoutes>
        <Route element={<PrivateRoute />}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.users} element={<UsersManagementPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path={paths.login} element={<LoginPage />} />
        </Route>
      </DefaultRoutes>
    </>
  );
}
