import {combineReducers} from 'redux'
import canteens from './canteenReducer'
import uiStates from './uiReducer'
import users from './userReducer'
import admin from './adminReducer'
import adminMenu from './adminMenuReducer'

export default combineReducers({
    canteens,
    uiStates,
    users,
    admin,
    adminMenu,
});
