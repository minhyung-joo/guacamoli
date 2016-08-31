import {combineReducers} from 'redux'
import todos from './todos'
import canteens from './canteenReducer'
import modal from './modalReducer'

export default combineReducers({
    todos,
    canteens,
    modal
});
