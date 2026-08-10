import { Menu as MenuComponent } from "@dhua5922/react-kit";
import { ChevronDown, Menu } from "lucide-react";
import { type HTMLAttributes, useState } from "react";
import logo from "../../assets/logo.svg";
import { paths } from "../../constants";
import useAuthStore from "../../store/auth";
import Collapsible from "../Collapsible";

const collapsibleId = "mobile-navigation";

export default function Navbar() {
	const [expanded, setExpanded] = useState(false);

	return (
		<nav className="p-6 border-b border-gray-200">
			<div className="flex items-center justify-between">
				<a href={paths.home}>
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
						expanded ? "Close navigation menu" : "Open navigation menu"
					}
				>
					<Menu />
				</button>

				<Links className="hidden md:flex items-center gap-8" />
			</div>

			<Collapsible
				expanded={expanded}
				aria-hidden={!expanded}
				id={collapsibleId}
				aria-label="Mobile navigation menu"
			>
				<Links className="py-2 flex flex-col items-center gap-6" />
			</Collapsible>
		</nav>
	);
}

function Links(props: HTMLAttributes<HTMLUListElement>) {
	const me = useAuthStore((state) => state.me);

	return (
		<ul {...props}>
			<li>
				<a href={paths.home}>Home</a>
			</li>

			<li>
				<MenuComponent>
					<MenuComponent.Toggle className="flex items-center gap-2 cursor-pointer">
						{me.username}
						<ChevronDown />
					</MenuComponent.Toggle>

					<MenuComponent.Content>
						<MenuComponent.Item>Log out</MenuComponent.Item>
					</MenuComponent.Content>
				</MenuComponent>
			</li>
		</ul>
	);
}
