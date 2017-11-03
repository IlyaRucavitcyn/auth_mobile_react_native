/**@flow */
import { ERROR_MESSAGES } from '../config/error-messages';
import ValidationService from './validation.service';

export default class ErrorMessageGenerationService {

    static generateRequireMessage(value: string) {
        return ValidationService.isNotEmpty(value)
            ? null
            : ERROR_MESSAGES.REQUIRED
    }

    static generateShouldBeNumberMessage(value: string) {
        return ValidationService.isNumber(value)
            ? null
            : ERROR_MESSAGES.NOT_A_NUMBER
    }
}