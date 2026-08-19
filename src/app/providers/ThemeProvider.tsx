import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	DARK_THEME,
	LIGHT_THEME,
	THEME_ATTRIBUTE_NAME,
	THEME_STORAGE_KEY,
	type Theme,
} from "../constants";

interface ThemeContextValue {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((currentTheme) =>
			currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME,
		);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
}

function getInitialTheme(): Theme {
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
	if (storedTheme === DARK_THEME || storedTheme === LIGHT_THEME) {
		return storedTheme;
	}

	return typeof window.matchMedia === "function" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
		? DARK_THEME
		: LIGHT_THEME;
}
