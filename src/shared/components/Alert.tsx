import type { HTMLAttributes } from "react";
import { CLOSE_ALERT_BUTTON_TEXT } from "../constants";
import Button from "./Button";

interface Props extends HTMLAttributes<HTMLDivElement> {
	variant: keyof typeof variants;
	onRemoveAlert: () => void;
}

const variants = {
	danger: "bg-red-500 text-white",
	success: "bg-green-500 text-white",
};

export default function Alert({
	children,
	className = "",
	variant,
	onRemoveAlert,
	...props
}: Props) {
	const formattedClassName =
		`p-3 flex items-center justify-between ${variants[variant]} ${className}`.trim();

	return (
		<div role="alert" className={formattedClassName} {...props}>
			<p>{children}</p>

			<Button
				aria-label={CLOSE_ALERT_BUTTON_TEXT}
				className="bg-transparent!"
				onClick={onRemoveAlert}
			>
				X
			</Button>
		</div>
	);
}
