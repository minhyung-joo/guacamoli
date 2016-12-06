/**
 * Created by nylee on 5/12/2016.
 */
var _ = require('underscore');
import { hashHistory } from 'react-router'

const initialState = {
    isFetching: false,
    foodArray: [],
    foodDetail: null,
};

export default function adminMenu(state = initialState, action) {
    switch(action.type){
        case 'ADMIN_FETCHING_DATA':
            return {...state, isFetching:true};

        case 'ADMIN_RECIEVED_CANTEEN_DATA':
            return {...state, foodArray: action.data, isFetching: false};

        case 'ADMIN_RECIEVED_FOOD_DETAIL_DATA':
            return {...state, foodDetail: action.data, isFetching: false};

        case 'ADMIN_REQUEST_ERROR':
            return {...state};
        case 'CLICK_MENU_UPDATE':
            hashHistory.push("/" + action.canteenName + '/menu_update/'+action.menuid);
        case 'CLICK_DELETE_MENU':

        case 'UPDATE_MENU':
            console.log("update menu");
            return state;
        default:
            return state;
    }
}