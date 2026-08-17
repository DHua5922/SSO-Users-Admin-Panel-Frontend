import Icon from "../../../shared/components/Icon";
import RoleTableHeaders from "./RoleTableHeaders";

export default function RoleTableSkeleton() {
	return (
		<table className="w-full">
			<RoleTableHeaders />

			<tbody>
				<tr>
					<td>
						<div className="skeleton skeleton-text" />
					</td>

					<td>
						<div className="center">
							<Icon name="edit" />
						</div>
					</td>

					<td>
						<div className="center">
							<Icon name="delete" />
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
