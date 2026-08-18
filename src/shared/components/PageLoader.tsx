import type { HTMLAttributes } from "react";

export default function PageLoader({
	children,
	className = "",
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const formattedClassName =
		`h-screen justify-center flex-1 flex items-center gap-6 ${className}`.trim();
	return (
		<div
			role="status"
			aria-live="polite"
			className={formattedClassName}
			{...props}
		>
			<div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
			<span className="text-3xl">{children}</span>
		</div>
	);
}
