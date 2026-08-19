import { type HTMLAttributes } from "react";
import styles from "./Collapsible.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	expanded: boolean;
}

export default function Collapsible({
	children,
	className = "",
	expanded,
	...props
}: Props) {
	const formattedClassName =
		`grid md:hidden ${styles.container} ${expanded ? styles.expanded : ""} ${className}`.trim();

	return (
		<div className={formattedClassName} {...props}>
			<div className="overflow-hidden">{children}</div>
		</div>
	);
}
