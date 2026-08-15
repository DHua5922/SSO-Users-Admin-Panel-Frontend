import type { ComponentProps, HTMLAttributes } from "react";
import Button from "../../../shared/components/Button";
import Field from "../../../shared/components/Field";
import RoleSelect from "../../../shared/components/RoleSelect";

interface Props extends HTMLAttributes<HTMLDivElement> {
	searchBarProps: HTMLAttributes<HTMLInputElement>;
	roleSelectProps: ComponentProps<typeof RoleSelect>;
	onClickAddUser: () => void;
}

export default function UserTableControls({
	className = "",
	searchBarProps,
	roleSelectProps,
	onClickAddUser,
	...props
}: Props) {
	const formattedClassName = `border-b border-gray-300 p-8 ${className}`.trim();

	return (
		<div className={formattedClassName} {...props}>
			<div className="flex flex-col! sm:flex-row! justify-between items-stretch gap-8">
				<Field className="flex-4">
					<input
						type="search"
						aria-label="Search users"
						placeholder="Search users..."
						{...searchBarProps}
					/>
				</Field>

				<Field className="flex-1">
					<RoleSelect aria-label="Filter users by role" {...roleSelectProps} />
				</Field>

				<Button className="flex-1" onClick={onClickAddUser}>
					Add User
				</Button>
			</div>
		</div>
	);
}
