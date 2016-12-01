import {combineReducers} from 'redux'
import canteens from './canteenReducer'
import uiStates from './uiReducer'
import users from './userReducer'

export default combineReducers({
    canteens,
    uiStates,
    users,
});
