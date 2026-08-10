import logo from "../../assets/logo.svg";
import { paths } from "../../constants";

export default function Navbar() {
	return (
		<nav className="p-6 border-b border-gray-200">
			<div className="flex items-center justify-between">
				<a href={paths.home}>
					<figure className="w-32">
						<img src={logo} alt="Logo" className="max-w-full" />
					</figure>
				</a>

				<ul>
					<li>
						<a className="text-white" href={paths.home}>
							Home
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
