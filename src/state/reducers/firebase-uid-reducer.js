/**@flow */
import type {ActionUid } from '../actions/firebase-uid-action';
import { ACTIONS_NAMES } from '../../config/action-names';
export type StateLogging = string | null;

export default function firebaseUidReducer(state: StateLogging = null, action: ActionUid) {
    switch (action.type) {
        case ACTIONS_NAMES.FIREBASE_UID: {
            return action.payload
        }
        default: {
            return state
        }
    }
}