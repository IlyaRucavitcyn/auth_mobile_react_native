/**@flow */
import type {ActionLogging } from '../actions/log-in-action';
import { ACTIONS_NAMES } from '../../config/action-names';
export type StateLogging = boolean | null;

export default function loggingReducer(state: StateLogging = null, action: ActionLogging) {
    switch (action.type) {
        case ACTIONS_NAMES.LOG_IN: {
            return action.payload
        }
        default: {
            return state
        }
    }
}