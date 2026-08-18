import type { HTMLAttributes } from "react";

export default function PageLoader({
	children,
	className = "",
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const formattedClassName = `flex items-center ${className}`.trim();
	return (
		<div
			role="status"
			aria-live="polite"
			className={formattedClassName}
			{...props}
		>
			<svg
				aria-hidden="true"
				className="size-5 animate-spin"
				viewBox="0 0 24 24"
			/>
			{children}
		</div>
	);
}
