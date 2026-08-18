import { useEffect, useState } from "react";
import {
	DARK_THEME,
	LIGHT_THEME,
	THEME_ATTRIBUTE_NAME,
	THEME_STORAGE_KEY,
	type Theme,
} from "../constants";

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((currentTheme) => {
			const nextTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
			localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
			return nextTheme;
		});
	};

	return { theme, toggleTheme };
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
