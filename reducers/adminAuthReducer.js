var _ = require('underscore');
import { hashHistory } from 'react-router'

const initialState = {
    isFetching: false,
};

export default function adminAuth(state = initialState, action) {
    switch(action.type){
        case 'ADMIN_FETCHING_DATA':
            return {...state, isFetching:true};
        case 'ADMIN_RECIEVED_CANTEEN_DATA':
            return {...state, foodArray: action.data, isFetching: false};

        default:
            return state;
    }
}