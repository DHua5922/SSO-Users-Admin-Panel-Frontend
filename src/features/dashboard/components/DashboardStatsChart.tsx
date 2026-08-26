import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { DASHBOARD_CHART_TITLE } from "../constants";

interface Props {
	totalUsers: number;
	totalRoles: number;
}

export default function DashboardStatsChart({ totalUsers, totalRoles }: Props) {
	const data = [
		{ name: "Users", total: totalUsers, fill: "#2563eb" },
		{ name: "Roles", total: totalRoles, fill: "#16a34a" },
	];

	return (
		<figure className="card flex flex-col gap-4 p-4">
			<figcaption className="text-xl font-bold">
				{DASHBOARD_CHART_TITLE}
			</figcaption>

			<p className="sr-only">
				Users: {totalUsers}. Roles: {totalRoles}.
			</p>

			<div className="h-80 w-full" aria-hidden="true">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} margin={{ top: 16, right: 16, left: 0 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Bar dataKey="total" name="Total" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</figure>
	);
}
