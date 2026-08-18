import { Menu } from "lucide-react";
import { type HTMLAttributes, useState } from "react";
import logo from "../../assets/logo.svg";
import Button from "../../shared/components/Button";
import Collapsible from "../../shared/components/Collapsible";
import {
	APP_LOGO_ALT_TEXT,
	CLOSE_NAVIGATION_MENU_TEXT,
	HOME_PATH,
	MOBILE_NAVIGATION_ARIA_LABEL,
	MOBILE_NAVIGATION_ID,
	OPEN_NAVIGATION_MENU_TEXT,
} from "../../shared/constants";
import NavbarLinks from "./NavbarLinks";

interface Props extends HTMLAttributes<HTMLElement> {
	username: string;
}

export default function Navbar({ username, className = "", ...props }: Props) {
	const [expanded, setExpanded] = useState(false);
	const formattedClassName = `p-6 border-b border-gray-200 ${className}`.trim();

	return (
		<nav className={formattedClassName} {...props}>
			<div className="flex items-center justify-between">
				<a href={HOME_PATH}>
					<figure className="w-32">
						<img src={logo} alt={APP_LOGO_ALT_TEXT} className="max-w-full" />
					</figure>
				</a>

				<Button
					type="button"
					className="md:hidden cursor-pointer bg-transparent"
					aria-expanded={expanded}
					aria-controls={MOBILE_NAVIGATION_ID}
					onClick={() => setExpanded((prev) => !prev)}
					aria-label={
						expanded ? CLOSE_NAVIGATION_MENU_TEXT : OPEN_NAVIGATION_MENU_TEXT
					}
				>
					<Menu aria-hidden="true" />
				</Button>

				<NavbarLinks
					username={username}
					className="hidden md:flex items-center gap-8"
				/>
			</div>

			<Collapsible
				expanded={expanded}
				aria-hidden={!expanded}
				inert={!expanded}
				id={MOBILE_NAVIGATION_ID}
				aria-label={MOBILE_NAVIGATION_ARIA_LABEL}
			>
				<NavbarLinks
					username={username}
					className="py-2 flex flex-col items-center gap-6"
				/>
			</Collapsible>
		</nav>
	);
}
