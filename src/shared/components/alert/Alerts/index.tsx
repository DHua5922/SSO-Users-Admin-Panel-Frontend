import type { HTMLAttributes } from "react";
import type { Alert as AlertType } from "../../../types";
import Alert from "../Alert";

interface Props extends HTMLAttributes<HTMLDivElement> {
	list: AlertType[];
	onRemoveAlert: (id: string) => void;
}

export default function Alerts({
	list,
	onRemoveAlert,
	className = "",
	...props
}: Props) {
	const formattedClassName =
		`fixed top-4 left-1/2 -translate-x-1/2 max-w-[400px] w-full flex flex-col gap-2 z-50 ${className}`.trim();

	return (
		<div className={formattedClassName} {...props}>
			{list.length > 0
				? list.map((alert) => (
						<Alert
							key={alert.id}
							variant={alert.variant}
							onRemoveAlert={() => onRemoveAlert(alert.id)}
						>
							{alert.message}
						</Alert>
					))
				: null}
		</div>
	);
}
