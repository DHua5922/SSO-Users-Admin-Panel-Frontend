import { screen, within } from "@testing-library/react";

export function element(element?: HTMLElement) {
	return element ? within(element) : screen;
}

export function regexMatch(text: string, flag?: string, exact = false) {
	const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(exact ? `^${escapedText}$` : escapedText, flag || "i");
}
