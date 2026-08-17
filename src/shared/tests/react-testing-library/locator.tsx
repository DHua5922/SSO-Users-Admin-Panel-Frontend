import { regexMatch } from "../fixtures";
import { element } from "./fixtures";

const buttonRole = "button";
const alertRole = "alert";
const rowRole = "row";

export function getText(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text, undefined, true);
	return element(boundary).getByText(regex);
}
export function findText(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text, undefined, true);
	return element(boundary).findByText(regex);
}
export function findAllText(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text, undefined, true);
	return element(boundary).findAllByText(regex);
}
export function queryText(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text, undefined, true);
	return element(boundary).queryByText(regex);
}

export function getLabel(text: string, boundary?: HTMLElement) {
	const regex = new RegExp(`^${regexMatch(text).source}(?:\\s*\\*)?$`, "i");
	return element(boundary).getByLabelText(regex);
}
export function findLabel(text: string, boundary?: HTMLElement) {
	const regex = new RegExp(`^${regexMatch(text).source}(?:\\s*\\*)?$`, "i");
	return element(boundary).findByLabelText(regex);
}

export function findButton(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).findByRole(buttonRole, {
		name: regex,
	});
}

export function getButton(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).getByRole(buttonRole, {
		name: regex,
	});
}
export function queryButton(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).queryByRole(buttonRole, {
		name: regex,
	});
}

export function findAlert(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).findByRole(alertRole, {
		name: regex,
	});
}
export function queryAlert(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).queryByRole(alertRole, {
		name: regex,
	});
}

export function findDialog(title: string, boundary?: HTMLElement) {
	const regex = regexMatch(title);
	return element(boundary).findByRole("dialog", {
		name: regex,
	});
}

export function findTable(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).findByRole("table", {
		name: regex,
	});
}

export function findTableRow(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).findByRole(rowRole, {
		name: regex,
	});
}
export function queryTableRow(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).queryByRole(rowRole, {
		name: regex,
	});
}

export function findSearchBox(label: string, boundary?: HTMLElement) {
	const regex = regexMatch(label);
	return element(boundary).findByRole("searchbox", {
		name: regex,
	});
}

export function getStatus(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).getByRole("status", {
		name: regex,
	});
}

export function getSelect(text: string, boundary?: HTMLElement) {
	const regex = regexMatch(text);
	return element(boundary).getByRole("combobox", {
		name: regex,
	});
}
