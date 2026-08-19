import { findText } from "../../../../shared/tests/react-testing-library/locator";
import { REQUIRED_NAME_ERROR_MESSAGE } from "../../constants";

export function findNameErrorMessage() {
	return findText(REQUIRED_NAME_ERROR_MESSAGE);
}
