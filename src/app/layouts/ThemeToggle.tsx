import { Moon, Sun } from "lucide-react";
import { Button } from "../../shared/components";
import { DARK_MODE_TEXT, DARK_THEME } from "../constants";
import { useTheme } from "../providers/ThemeProvider";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isDarkTheme = theme === DARK_THEME;

	return (
		<Button
			type="button"
			className="fixed right-6 bottom-6 z-50 cursor-pointer shadow-lg"
			aria-label={DARK_MODE_TEXT}
			aria-pressed={isDarkTheme}
			onClick={toggleTheme}
		>
			{isDarkTheme ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
		</Button>
	);
}
