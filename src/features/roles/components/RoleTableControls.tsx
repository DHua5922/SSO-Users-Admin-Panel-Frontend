import { type HTMLAttributes, useId } from "react";
import Button from "../../../shared/components/Button";
import Field from "../../../shared/components/Field";
import { ADD_ROLE_BUTTON_TEXT } from "../constants/button";
import { SEARCH_ROLES_ARIA_LABEL } from "../constants/input";

interface Props extends HTMLAttributes<HTMLDivElement> {
	searchBarProps: HTMLAttributes<HTMLInputElement>;
	onClickAddRole: () => void;
}

export default function RoleTableControls({
	className = "",
	searchBarProps,
	onClickAddRole,
	...props
}: Props) {
	const formattedClassName = `border-b border-gray-300 p-8 ${className}`.trim();
	const searchBarId = useId();

	return (
		<div className={formattedClassName} {...props}>
			<div className="flex flex-col! sm:flex-row! justify-between items-stretch gap-8">
				<Field className="flex-4" htmlFor={searchBarId}>
					<input
						aria-label={SEARCH_ROLES_ARIA_LABEL}
						placeholder="Search roles..."
						{...searchBarProps}
						type="search"
						id={searchBarId}
					/>
				</Field>

				<Button className="flex-1" onClick={onClickAddRole}>
					{ADD_ROLE_BUTTON_TEXT}
				</Button>
			</div>
		</div>
	);
}
