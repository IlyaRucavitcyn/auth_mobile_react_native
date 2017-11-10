/**@flow */
import type { ActionSetUserInfo, UserInfo } from '../actions/user-info-action';
import { ACTIONS_NAMES } from '../../config/action-names';
export type StateUserInfo = UserInfo;

const defaultUserInfo: UserInfo = {
    firstName: '',
    lastName: '',
    age: null
}

export default function setUserInfoReducer(
    state: StateUserInfo = defaultUserInfo,
    action: ActionSetUserInfo
) {
    switch (action.type) {
        case ACTIONS_NAMES.SET_USERINFO: {
            return action.payload
        }
        case ACTIONS_NAMES.UPDATE_USERINFO: {
            return action.payload
        }
        default: {
            return state
        }
    }
}