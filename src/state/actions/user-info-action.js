/**@flow */
import { ACTIONS_NAMES } from '../../config/action-names';
import FirebaseClient from '../../services/firebase-client';

const firebaseClient = FirebaseClient.getClient();
export type UserInfo = {
    firstName: string,
    lastName: string,
    age: number | null
}

export type ActionSetUserInfo = {
    type: string,
    payload: UserInfo
};

export function setUserInfoAction(userInfo: UserInfo) {
    return {
        type: ACTIONS_NAMES.SET_USERINFO,
        payload: userInfo
    }
}

function createUpdateUserInfoAction(userInfo: UserInfo) {
    return {
        type: ACTIONS_NAMES.UPDATE_USERINFO,
        payload: userInfo
    }
}

export function updateUserInfoAction(uid: string, userInfo: UserInfo): any {
    return (dispatch) => {
        firebaseClient.addOrUpdateValue(uid, userInfo)
            .then(() => dispatch(createUpdateUserInfoAction(userInfo)))
            .catch(() => dispatch(undefined))
    }
}