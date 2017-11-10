/**@flow */
import type { 
    ActionSetUserAppointment
} from '../actions/user-appointments-action.js';
import type { 
    UserAppointmentType
} from '../../services/database-client.interface.flow'
import { ACTIONS_NAMES } from '../../config/action-names';
export type StateUserAppointments = UserAppointmentType[];


export default function setUserAppointments(
    state: UserAppointmentType[] = [],
    action: ActionSetUserAppointment
) {
    switch (action.type) {
        case ACTIONS_NAMES.SET_USER_APPOINTMENTS: {
            return action.payload
        }
        case ACTIONS_NAMES.ADD_USER_APPOINTMENTS: {
            return [...state, action.payload]
        }
        default: {
            return state
        }
    }
}