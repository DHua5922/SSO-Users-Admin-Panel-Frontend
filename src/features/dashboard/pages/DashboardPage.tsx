import { USERS_PATH } from "../../users/constants/general";
import StatView from "../components/StatView";
import {
	DASHBOARD_HEADER,
	DASHBOARD_VIEW_ROLES_LINK_TEXT,
	DASHBOARD_VIEW_USERS_LINK_TEXT,
} from "../constants";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function DashboardPage() {
	const { stats, isStatsError, statsErrorMessage, isLoadingStats } =
		useDashboardStats();

	return (
		<div className="flex flex-col max-w-[1000px] w-full mx-auto py-8 px-4 gap-4">
			<h1 className="text-4xl font-bold">{DASHBOARD_HEADER}</h1>
			<h3 className="text-lg">
				Welcome to the dashboard! This is where you can manage your users and
				view important information.
			</h3>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<StatView
					label="Total Users"
					value={stats?.totalUsers || 0}
					isError={isStatsError}
					errorMessage={statsErrorMessage}
					isLoading={isLoadingStats}
					href={USERS_PATH}
					linkLabel={DASHBOARD_VIEW_USERS_LINK_TEXT}
				/>

				<StatView
					label="Total Roles"
					value={stats?.totalRoles || 0}
					isError={isStatsError}
					errorMessage={statsErrorMessage}
					isLoading={isLoadingStats}
					href=""
					linkLabel={DASHBOARD_VIEW_ROLES_LINK_TEXT}
				/>
			</div>
		</div>
	);
}
