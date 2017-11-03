
export default class ValidationService {
    static isNotEmpty(value) {
        if (!value) {
            return false;
        }
        return true;
    }

    static isNumber(value) {
        if (!value || isNaN(value)) {
            return false
        }
        return true;
    }
}