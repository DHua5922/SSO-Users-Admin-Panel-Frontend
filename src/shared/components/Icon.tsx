import { type LucideProps, SquarePen, Trash } from "lucide-react";

const icons = {
	edit: SquarePen,
	delete: Trash,
};

interface Props extends LucideProps {
	name: keyof typeof icons;
}
export default function Icon({ name, className = "", ...props }: Props) {
	const Icon = icons[name];
	const formattedClassName = `text-dark ${className}`.trim();
	return Icon ? (
		<Icon
			aria-hidden="true"
			focusable="false"
			className={formattedClassName}
			{...props}
		/>
	) : null;
}
