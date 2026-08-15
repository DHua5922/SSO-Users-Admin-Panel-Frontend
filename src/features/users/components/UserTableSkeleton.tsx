import Icon from "../../../shared/components/Icon";
import UserTableHeaders from "./UserTableHeaders";

export default function UserTableSkeleton() {
	return (
		<table className="w-full">
			<UserTableHeaders />

			<tbody>
				<tr>
					<td>
						<div className="skeleton skeleton-text" />
					</td>

					<td>
						<div className="skeleton skeleton-text" />
					</td>

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
