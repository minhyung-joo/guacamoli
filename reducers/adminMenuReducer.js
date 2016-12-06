/**
 * Created by nylee on 5/12/2016.
 */
var _ = require('underscore');
import { hashHistory } from 'react-router'

const initialState = {
    isFetching: false,
    isDeleting: false,
    isUpdating: false,
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
            hashHistory.push("/" + action.canteenName + '/menu_update/'+action.foodid);
            return state;
        case 'ADMIN_DELETING_DATA':
            return {...state, isDeleting:true};
        case 'ADMIN_DELETING_SUCCESS':
            return {...state, isDeleting: false};
        case 'UPDATE_MENU':
            console.log("update menu" + action.foodid);
            return state;
        case 'ADMIN_UPDATE_DATA':
            return {...state, isUpdating: true};

        case 'ADMIN_UPDATING_SUCCESS':
            return {...state, isUpdating: false};

        default:
            return state;
    }
}