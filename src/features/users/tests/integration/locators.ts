import {
	findButton,
	getButton,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	ADD_USER_BUTTON_TEXT,
	CONFIRM_DELETE_USER_BUTTON_TEXT,
	DELETE_USER_BUTTON_ARIA_LABEL_PREFIX,
	EDIT_USER_BUTTON_ARIA_LABEL_PREFIX,
} from "../../constants/button";

export function getAddUserButton(container?: HTMLElement) {
	return getButton(ADD_USER_BUTTON_TEXT, container);
}

export function findShowEditUserModalButton(
	username: string,
	container?: HTMLElement,
) {
	return findButton(
		`${EDIT_USER_BUTTON_ARIA_LABEL_PREFIX} ${username}`,
		container,
	);
}
export function findShowDeleteUserModalButton(
	username: string,
	container?: HTMLElement,
) {
	return findButton(
		`${DELETE_USER_BUTTON_ARIA_LABEL_PREFIX} ${username}`,
		container,
	);
}

export function getConfirmDeleteUserButton(container?: HTMLElement) {
	return getButton(CONFIRM_DELETE_USER_BUTTON_TEXT, container);
}
