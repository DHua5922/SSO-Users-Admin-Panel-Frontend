import { type HTMLAttributes, useId } from "react";
import Button from "../../../shared/components/Button/Button";
import Field from "../../../shared/components/Field";
import RoleSelect from "../../roles/components/RoleSelect";
import type { Role } from "../../roles/schemas";
import { SEARCH_USERS_ARIA_LABEL } from "../constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
	searchBarProps: HTMLAttributes<HTMLInputElement>;
	roleSelect: {
		isLoading: boolean;
		isError: boolean;
		errorMessage: string;
		list: Role[];
	};
	onClickAddUser: () => void;
}

export default function UserTableControls({
	className = "",
	searchBarProps,
	roleSelect,
	onClickAddUser,
	...props
}: Props) {
	const formattedClassName = `border-b border-gray-300 p-8 ${className}`.trim();
	const searchBarId = useId();
	const roleSelectId = useId();

	return (
		<div className={formattedClassName} {...props}>
			<div className="flex flex-col! sm:flex-row! justify-between items-stretch gap-8">
				<Field className="flex-4" htmlFor={searchBarId}>
					<input
						aria-label={SEARCH_USERS_ARIA_LABEL}
						placeholder="Search users..."
						{...searchBarProps}
						type="search"
						id={searchBarId}
					/>
				</Field>

				<Field
					className="flex-1"
					htmlFor={roleSelectId}
					errorMessage={roleSelect.isError ? roleSelect.errorMessage : ""}
				>
					<RoleSelect
						aria-label="Filter users by role"
						isLoading={roleSelect.isLoading}
						list={roleSelect.list}
						id={roleSelectId}
					/>
				</Field>

				<Button className="flex-1" onClick={onClickAddUser}>
					Add User
				</Button>
			</div>
		</div>
	);
}
