import type { Alert as AlertType } from "../../../types/status";
import Alert from "../Alert";

interface Props {
	list: AlertType[];
	onRemoveAlert: (id: string) => void;
}

export default function Alerts({ list, onRemoveAlert }: Props) {
	return (
		<div className="fixed top-4 flex flex-col gap-2 z-50">
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
