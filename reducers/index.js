import {combineReducers} from 'redux'
import todos from './todos'
import canteens from './canteenReducer'
import modal from './modalReducer'
import uiStates from './uiReducer'

export default combineReducers({
    todos,
    canteens,
    modal,
    uiStates,
});
