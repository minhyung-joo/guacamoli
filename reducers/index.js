import {combineReducers} from 'redux'
import todos from './todos'
import canteens from './canteenReducer'
import uiStates from './uiReducer'

export default combineReducers({
    todos,
    canteens,
    uiStates,
});
