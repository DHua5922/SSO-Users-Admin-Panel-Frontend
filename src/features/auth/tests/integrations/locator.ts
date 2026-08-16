import {
	findButton,
	findLabel,
	getLabel,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	CURRENT_USER_TOGGLE_ARIA_LABEL,
	LOGIN_EMAIL_INPUT_LABEL,
	LOGIN_PASSWORD_INPUT_LABEL,
	LOGIN_TEXT,
} from "../../constants";

export function findLoginButton() {
	return findButton(LOGIN_TEXT);
}

export function findCurrentUserMenuToggleButton() {
	return findButton(CURRENT_USER_TOGGLE_ARIA_LABEL);
}

export function getEmailLabel() {
	return getLabel(LOGIN_EMAIL_INPUT_LABEL);
}

export function findEmailLabel() {
	return findLabel(LOGIN_EMAIL_INPUT_LABEL);
}

export function getPasswordLabel() {
	return getLabel(LOGIN_PASSWORD_INPUT_LABEL);
}

export function findPasswordLabel() {
	return findLabel(LOGIN_PASSWORD_INPUT_LABEL);
}
