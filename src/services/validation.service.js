import { ERROR_MESSAGES } from '../config/error-messages';

export default class ValidationService {
    static isEmpty(value) {
        if (!value) {
            return ERROR_MESSAGES.REQUIRED;
        }
        return null;
    }

    static isNumber(value) {
        if (!value || isNaN(value)) {
            return ERROR_MESSAGES.NOT_A_NUMBER
        }
        return null;
    }
}