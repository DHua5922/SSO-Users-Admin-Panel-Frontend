import axe, { type ElementContext } from "axe-core";
import { expect } from "vitest";

export async function expectNoAccessibilityViolations(
	context: ElementContext = document.body,
) {
	const results = await axe.run(context, {
		runOnly: {
			type: "tag",
			values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
		},
		// JSDOM does not calculate layout or computed colors. Playwright covers
		// color contrast in a real browser.
		rules: { "color-contrast": { enabled: false } },
	});

	expect(results.violations).toEqual([]);
}
