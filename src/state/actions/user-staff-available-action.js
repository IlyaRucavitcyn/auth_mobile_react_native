/**@flow */
import { ACTIONS_NAMES } from '../../config/action-names';

export type ActionStaff = {
    type: string,
    payload: string[]
};

export function setAvailableStaffAction(staff: string[]): ActionStaff {
    return {
        type: ACTIONS_NAMES.SET_AVAILABLE_STAFF,
        payload: staff
    }
}