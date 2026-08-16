import { Menu } from "lucide-react";
import { type HTMLAttributes, useState } from "react";
import logo from "../../assets/logo.svg";
import Collapsible from "../../shared/components/Collapsible";
import { HOME_PATH, OPEN_NAVIGATION_MENU_TEXT } from "../../shared/constants";
import NavbarLinks from "./NavbarLinks";

interface Props extends HTMLAttributes<HTMLElement> {
	username: string;
}

const collapsibleId = "mobile-navigation";

export default function Navbar({ username, className = "", ...props }: Props) {
	const [expanded, setExpanded] = useState(false);
	const formattedClassName = `p-6 border-b border-gray-200 ${className}`.trim();

	return (
		<nav className={formattedClassName} {...props}>
			<div className="flex items-center justify-between">
				<a href={HOME_PATH}>
					<figure className="w-32">
						<img src={logo} alt="Logo" className="max-w-full" />
					</figure>
				</a>

				<button
					type="button"
					className="md:hidden cursor-pointer bg-transparent"
					aria-expanded={expanded}
					aria-controls={collapsibleId}
					onClick={() => setExpanded((prev) => !prev)}
					aria-label={
						expanded ? "Close navigation menu" : OPEN_NAVIGATION_MENU_TEXT
					}
				>
					<Menu />
				</button>

				<NavbarLinks
					username={username}
					className="hidden md:flex items-center gap-8"
				/>
			</div>

			<Collapsible
				expanded={expanded}
				aria-hidden={!expanded}
				id={collapsibleId}
				aria-label="Mobile navigation menu"
			>
				<NavbarLinks
					username={username}
					className="py-2 flex flex-col items-center gap-6"
				/>
			</Collapsible>
		</nav>
	);
}
