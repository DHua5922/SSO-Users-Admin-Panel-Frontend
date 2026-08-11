import type { HTMLAttributes } from "react";

export default function PageLoader({
	children,
	className = "",
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const formattedClassName = `flex items-center ${className}`.trim();
	return (
		<div className={formattedClassName} {...props}>
			<svg className="size-5 animate-spin" viewBox="0 0 24 24" />
			{children}
		</div>
	);
}
