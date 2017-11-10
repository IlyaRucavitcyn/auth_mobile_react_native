/**@flow */
import type { ActionStaff } from '../actions/user-staff-available-action';
import { ACTIONS_NAMES } from '../../config/action-names';
export type StateStaffAvailable = string[];

export default function setAvailableStaffReducer(state: StateStaffAvailable = [], action: ActionStaff) {
    switch (action.type) {
        case ACTIONS_NAMES.SET_AVAILABLE_STAFF: {
            return action.payload
        }
        default: {
            return state
        }
    }
}