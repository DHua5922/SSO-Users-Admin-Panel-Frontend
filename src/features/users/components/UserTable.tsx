import type { HTMLAttributes } from "react";
import Button from "../../../shared/components/Button/Button";
import Icon from "../../../shared/components/Icon";
import {
	DELETE_USER_BUTTON_ARIA_LABEL_PREFIX,
	EDIT_USER_BUTTON_ARIA_LABEL_PREFIX,
	SYSTEM_MANAGED_USER_DELETE_ARIA_LABEL_PREFIX,
	USERS_TABLE_ARIA_LABEL,
} from "../constants";
import type { User } from "../schemas";
import UserTableHeaders from "./UserTableHeaders";

interface Props extends HTMLAttributes<HTMLTableElement> {
	list: User[];
	onClickEditUser: (user: User) => void;
	onClickDeleteUser: (user: User) => void;
}

export default function UserTable({
	list,
	onClickEditUser,
	onClickDeleteUser,
	...props
}: Props) {
	return (
		<table aria-label={USERS_TABLE_ARIA_LABEL} {...props}>
			<UserTableHeaders />

			<tbody>
				{list?.map((user) => (
					<tr key={user._id}>
						{[
							user.username,
							user.email,
							user.role,
							<Button
								className="bg-transparent!"
								onClick={() => onClickEditUser(user)}
								aria-label={`${EDIT_USER_BUTTON_ARIA_LABEL_PREFIX} ${user.username}`}
							>
								<Icon name="edit" />
							</Button>,
							<Button
								className="bg-transparent!"
								onClick={() => onClickDeleteUser(user)}
								disabled={user.systemManaged}
								aria-label={`${
									user.systemManaged
										? SYSTEM_MANAGED_USER_DELETE_ARIA_LABEL_PREFIX
										: DELETE_USER_BUTTON_ARIA_LABEL_PREFIX
								} ${user.username}`}
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
