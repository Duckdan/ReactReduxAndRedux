import { INCREMENT, DECREMENT } from "./action-types";
import { combineReducers } from "../lib/redux"

function count(state = 0, action) {
    console.log('count-reducer', action, state);
    switch (action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}
let initUser = {}
function user(state = initUser, action) {
    console.log('user-reducer', action, state);
    switch (action.type) {
        default:
            return state
    }
}

export default combineReducers({ count, user })