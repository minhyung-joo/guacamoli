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
    authStatus: false,
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
            return state;
        case 'ADMIN_UPDATE_DATA':
            return {...state, isUpdating: true};
        case 'ADMIN_UPDATING_SUCCESS':
            return {...state, isUpdating: false};
        case 'ADMIN_AUTH_SUCCESS':
            // console.log(action.success);
            if(action.success){
                const newState = {...state, authStatus: true};
                return newState
            }else{
                return {...state, authStatus: false};
            }
        case 'ADMIN_AUTH_FAIL':
            return {...state, authStatus: false};

        case 'ADMIN_REDIRECT_TO_INSERT':
            if(action.canteenString!="" && action.canteenId != -1){
                var insertRoute = '/(canteenString)/menu_insert/(canteenId)';
                const newInsertRoute = insertRoute.replace('(canteenString)', action.canteenString).replace('(canteenId)', action.canteenId);
                console.log(newInsertRoute);
                hashHistory.push(newInsertRoute);
            }
            return {...state, authStatus: false};

        case 'ADMIN_REDIRECT_TO_LIST':
            if(action.canteenString!="" && action.canteenId != -1) {
                var listRoute = '/(canteenString)/menu_list/(canteenId)';
                const newListRoute = listRoute.replace('(canteenString)', action.canteenString).replace('(canteenId)', action.canteenId);
                console.log(newListRoute);
                hashHistory.push(newListRoute);
            }
            return {...state, authStatus: false};

        default:
            return state;
    }
}