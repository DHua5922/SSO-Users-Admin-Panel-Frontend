import {
	findButton,
	getButton,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	ADD_USER_BUTTON_TEXT,
	CONFIRM_DELETE_USER_BUTTON_TEXT,
} from "../../constants/button";

export function getAddUserButton(container?: HTMLElement) {
	return getButton(ADD_USER_BUTTON_TEXT, container);
}

export function findShowEditUserModalButton(
	username: string,
	container?: HTMLElement,
) {
	return findButton(
		`button that show popup for editing ${username}`,
		container,
	);
}
export function findShowDeleteUserModalButton(
	username: string,
	container?: HTMLElement,
) {
	return findButton(
		`button that show popup for deleting ${username}`,
		container,
	);
}

export function getConfirmDeleteUserButton(container?: HTMLElement) {
	return getButton(CONFIRM_DELETE_USER_BUTTON_TEXT, container);
}
