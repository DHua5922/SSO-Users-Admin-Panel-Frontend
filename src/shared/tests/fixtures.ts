export function regexMatch(text: string, flag?: string, exact = false) {
	const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(exact ? `^${escapedText}$` : escapedText, flag || "i");
}
