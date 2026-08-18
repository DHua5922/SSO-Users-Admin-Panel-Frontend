import { Menu, Moon, Sun } from "lucide-react";
import { type HTMLAttributes, useState } from "react";
import logo from "../../assets/logo.svg";
import Button from "../../shared/components/Button/Button";
import Collapsible from "../../shared/components/Collapsible/Collapsible";
import {
	APP_LOGO_ALT_TEXT,
	CLOSE_NAVIGATION_MENU_TEXT,
	HOME_PATH,
	MOBILE_NAVIGATION_ARIA_LABEL,
	MOBILE_NAVIGATION_ID,
	OPEN_NAVIGATION_MENU_TEXT,
} from "../../shared/constants";
import { DARK_MODE_TEXT, DARK_THEME } from "../constants";
import { useTheme } from "../hooks/useTheme";
import NavbarNavigation from "./NavbarNavigation/NavbarNavigation";

interface Props extends HTMLAttributes<HTMLElement> {
	username: string;
}

export default function Navbar({ username, className = "", ...props }: Props) {
	const [expanded, setExpanded] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const formattedClassName = `p-6 border-b border-gray-200 ${className}`.trim();
	const isDarkTheme = theme === DARK_THEME;

	return (
		<nav className={formattedClassName} {...props}>
			<div className="flex items-center justify-between">
				<a href={HOME_PATH}>
					<figure className="w-32">
						<img
							src={logo}
							alt={APP_LOGO_ALT_TEXT}
							className="max-w-full"
							width={128}
							height={128}
						/>
					</figure>
				</a>

				<div className="flex items-center gap-4">
					<Button
						type="button"
						className="cursor-pointer bg-transparent!"
						aria-label={DARK_MODE_TEXT}
						aria-pressed={isDarkTheme}
						onClick={toggleTheme}
					>
						{isDarkTheme ? (
							<Sun aria-hidden="true" className="text-dark" />
						) : (
							<Moon aria-hidden="true" className="text-dark" />
						)}
					</Button>

					<Button
						type="button"
						className="md:hidden cursor-pointer bg-transparent!"
						aria-expanded={expanded}
						aria-controls={MOBILE_NAVIGATION_ID}
						onClick={() => setExpanded((prev) => !prev)}
						aria-label={
							expanded ? CLOSE_NAVIGATION_MENU_TEXT : OPEN_NAVIGATION_MENU_TEXT
						}
					>
						<Menu aria-hidden="true" className="text-dark" />
					</Button>

					<NavbarNavigation
						username={username}
						className="hidden md:flex items-center gap-8"
					/>
				</div>
			</div>

			<Collapsible
				expanded={expanded}
				aria-hidden={!expanded}
				inert={!expanded}
				id={MOBILE_NAVIGATION_ID}
				aria-label={MOBILE_NAVIGATION_ARIA_LABEL}
			>
				<NavbarNavigation
					username={username}
					className="py-2 flex flex-col items-center gap-6"
				/>
			</Collapsible>
		</nav>
	);
}
