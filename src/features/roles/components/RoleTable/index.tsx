import type { HTMLAttributes } from "react";
import Button from "../../../../shared/components/Button";
import Icon from "../../../../shared/components/Icon";
import type { Role } from "../../../../shared/schemas";
import RoleTableHeaders from "../RoleTableHeaders";

interface Props extends HTMLAttributes<HTMLTableElement> {
	list: Role[];
	onClickEditRole: (role: Role) => void;
	onClickDeleteRole: (role: Role) => void;
}

export default function RoleTable({
	list,
	onClickEditRole,
	onClickDeleteRole,
	...props
}: Props) {
	return (
		<table {...props}>
			<RoleTableHeaders />

			<tbody>
				{list?.map((role) => (
					<tr key={role._id}>
						{[
							role.name,
							role.description,

							<Button
								className="bg-transparent!"
								onClick={() => onClickEditRole(role)}
								aria-label={`Edit role ${role.name}`}
							>
								<Icon name="edit" />
							</Button>,

							<Button
								className="bg-transparent!"
								onClick={() => onClickDeleteRole(role)}
								aria-label={`Delete role ${role.name}`}
							>
								<Icon name="delete" />
							</Button>,
						].map((children, index) => (
							<td key={index} className="text-center text-lg">
								{children}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
