var axios = require('axios');
const getFoodDetailRoute = '/api/menu/(foodid)';
const getCanteenDataRoute = 'api/getCanteenList?restaurantId=(p1)';

function fetchingData(){
    return{
        type:'ADMIN_FETCHING_DATA'
    }
}

function receiveAdminFoodDetailData(json){
    return{
        type: 'ADMIN_RECIEVED_FOOD_DETAIL_DATA',
        data: json.data
    }
}
function receiveAdminCanteenData(json){
    return{
        type: 'ADMIN_RECIEVED_CANTEEN_DATA',
        data: json.data
    }
}

function requestFail(error){
    return{
        type: 'ADMIN_REQUEST_ERROR',
        error: error
    }
}

//  for admin update page
export function getAdminFoodDetail(foodid) {
    const api = getFoodDetailRoute.replace('(foodid)',foodid);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(receiveAdminFoodDetailData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

//  for adminList page
export function getAdminCanteenData(canteenid){
    const api = getCanteenDataRoute.replace('(p1)',canteenid);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(receiveAdminCanteenData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

export function clickMenuUpdate(canteenId, menuid) {
    return {
        type: 'CLICK_MENU_UPDATE',
        canteenName: restaurantMapper(canteenId),
        menuid: menuid,
    }
}

export function clickMenuDelete(menuid) {
    return {
        type: 'CLICK_DELETE_MENU',
        canteenId: menuid,
    }
}

export function updateMenu() {
    return {
        type: 'UPDATE_MENU',
        // value: menuDataToSend,
    }
}


function restaurantMapper(canteenId){
    switch(canteenId){
        case 1:
            return 'lg1';
        case 3:
            return 'grb';
        case 4:
            return 'apc';
        case 5:
            return 'milano';
    }
}
