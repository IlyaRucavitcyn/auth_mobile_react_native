/**@flow */
import { ACTIONS_NAMES } from '../../config/action-names';

export type ActionLogging = {
    type: string,
    payload: boolean
};

export function loginAction(isLoggedIn: boolean): ActionLogging {
    return {
        type: ACTIONS_NAMES.LOG_IN,
        payload: isLoggedIn
    }
}