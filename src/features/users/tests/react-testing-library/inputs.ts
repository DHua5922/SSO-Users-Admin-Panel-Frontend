import {
	findSearchBox,
	getLabel,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	SEARCH_USERS_ARIA_LABEL,
	UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_PASSWORD_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
} from "../../constants/input";

export function getUsernameLabel(container?: HTMLElement) {
	return getLabel(UPSERT_USER_FORM_USERNAME_LABEL, container);
}
export function getRoleLabel(container?: HTMLElement) {
	return getLabel(UPSERT_USER_FORM_ROLE_LABEL, container);
}
export function getEmailLabel(container?: HTMLElement) {
	return getLabel(UPSERT_USER_FORM_EMAIL_LABEL, container);
}

export function getConfirmPasswordLabel(container?: HTMLElement) {
	return getLabel(UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL, container);
}

export function getPasswordInput() {
	return getLabel(UPSERT_USER_FORM_PASSWORD_LABEL);
}

export function findSearchBar() {
	return findSearchBox(SEARCH_USERS_ARIA_LABEL);
}
