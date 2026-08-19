import { MoveRight } from "lucide-react";
import { type ReactNode, useId } from "react";
import styles from "./StatView.module.css";

interface StatViewProps {
	label: string;
	value: number;
	isError: boolean;
	errorMessage: string;
	isLoading: boolean;
	href: string;
	linkLabel: string;
}

const valueClassName = "text-5xl font-bold text-center";

export default function StatView({
	label,
	value,
	isError,
	errorMessage,
	isLoading,
	href,
	linkLabel,
}: StatViewProps) {
	const statCardProps = {
		label,
		linkLabel,
		href,
	};

	if (isLoading)
		return (
			<StatCard {...statCardProps}>
				<div
					className="skeleton h-8"
					role="status"
					aria-label={`Loading ${label}`}
				/>
			</StatCard>
		);

	if (isError)
		return (
			<StatCard {...statCardProps}>
				<p role="alert" className={`${valueClassName} text-xl! text-red-500`}>
					{errorMessage}
				</p>
			</StatCard>
		);

	return (
		<StatCard {...statCardProps}>
			<p className={valueClassName}>{value}</p>
		</StatCard>
	);
}

interface StatCardProps {
	label: string;
	linkLabel: string;
	href: string;
	children: ReactNode;
}
function StatCard({ label, linkLabel, href, children }: StatCardProps) {
	const headingId = useId();

	return (
		<section
			className="card flex flex-col gap-6 p-4"
			aria-labelledby={headingId}
		>
			<h3 className="text-xl" id={headingId}>
				{label}
			</h3>

			{children}

			<div className="flex items-center justify-end gap-2">
				<a className={styles.link} href={href}>
					{linkLabel}
					<MoveRight aria-hidden="true" size={20} />
				</a>
			</div>
		</section>
	);
}
