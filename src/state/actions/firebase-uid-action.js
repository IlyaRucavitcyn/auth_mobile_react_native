/**@flow */
import { ACTIONS_NAMES } from '../../config/action-names';

export type ActionUid = {
    type: string,
    payload: string
};

export function firebaseUidAction(uid: string): ActionUid {
    return {
        type: ACTIONS_NAMES.FIREBASE_UID,
        payload: uid
    }
}