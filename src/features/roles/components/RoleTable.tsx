import type { HTMLAttributes } from "react";
import Button from "../../../shared/components/Button/Button";
import Icon from "../../../shared/components/Icon";
import {
	DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX,
	EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX,
	ROLES_TABLE_ARIA_LABEL,
} from "../constants";
import type { Role } from "../schemas";
import RoleTableHeaders from "./RoleTableHeaders";

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
		<table aria-label={ROLES_TABLE_ARIA_LABEL} {...props}>
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
								aria-label={`${EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${role.name}`}
							>
								<Icon name="edit" />
							</Button>,

							<Button
								className="bg-transparent!"
								onClick={() => onClickDeleteRole(role)}
								aria-label={`${DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${role.name}`}
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
