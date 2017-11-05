
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    static isEmail(value){
        return EMAIL_REGEXP.test(value);
    }
}