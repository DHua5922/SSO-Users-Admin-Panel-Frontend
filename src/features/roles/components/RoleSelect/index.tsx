import type { SelectHTMLAttributes } from "react";
import {
	DEFAULT_ROLE_SELECT_OPTION,
	LOADING_ROLES_TEXT,
} from "../../../../shared/constants";
import type { Role } from "../../../../shared/schemas";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	isLoading: boolean;
	list: Role[];
}

export default function RoleSelect({ isLoading, list, ...props }: Props) {
	return (
		<select
			{...props}
			disabled={isLoading || props.disabled}
			aria-busy={isLoading}
		>
			<option value="">
				{isLoading ? LOADING_ROLES_TEXT : DEFAULT_ROLE_SELECT_OPTION}
			</option>

			{list.map((role) => (
				<option key={role._id} value={role._id}>
					{role.name}
				</option>
			))}
		</select>
	);
}
