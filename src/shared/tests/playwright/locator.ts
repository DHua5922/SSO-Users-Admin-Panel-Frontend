import type { Page } from "@playwright/test";
import { regexMatch } from "../fixtures";

export function getLink(page: Page, linkText: string) {
  return page.getByRole("link", { name: linkText });
}

export function getHeader(page: Page, headerText: string, options = {}) {
  return page.getByRole("heading", {
    name: regexMatch(headerText),
    exact: true,
    ...options,
  });
}

export function getButton(page: Page, labelText: string) {
  return page.getByRole("button", { name: regexMatch(labelText), exact: true });
}

export function getText(page: Page, text: string) {
  return page.getByText(regexMatch(text), { exact: true });
}