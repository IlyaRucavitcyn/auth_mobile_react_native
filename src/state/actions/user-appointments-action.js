/**@flow */
import { ACTIONS_NAMES } from '../../config/action-names';
import FirebaseClient from '../../services/firebase-client';
import type { 
    UserAppointmentType
} from '../../services/database-client.interface.flow';

const firebaseClient = FirebaseClient.getClient();

export type ActionSetUserAppointment = {
    type: string,
    payload: UserAppointmentType[]
};

export function setUserAppointmentsAction(
    appointments: UserAppointmentType[]): ActionSetUserAppointment {
    return {
        type: ACTIONS_NAMES.SET_USER_APPOINTMENTS,
        payload: appointments
    }
}

function createAddUserAppointment(appointment: UserAppointmentType) {
    return {
        type: ACTIONS_NAMES.ADD_USER_APPOINTMENTS,
        payload: appointment
    }
}

export function addUserAppointmentsAction(
    uid: string,
    appointment: UserAppointmentType): any {
    return (dispatch) => {
        firebaseClient.pushValue(`${uid}/appointments`, appointment)
            .then(() => dispatch(createAddUserAppointment(appointment)))
            .catch(() => dispatch(undefined))
    }
}