import type { HTMLAttributes } from "react";
import Button from "../../../shared/components/Button";
import Icon from "../../../shared/components/Icon";
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
		<table {...props}>
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
								aria-label={`button that show popup for editing ${user.username}`}
							>
								<Icon name="edit" />
							</Button>,
							<Button
								className="bg-transparent!"
								onClick={() => onClickDeleteUser(user)}
								aria-label={`button that show popup for deleting ${user.username}`}
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
