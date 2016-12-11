var axios = require('axios');
const getFoodDetailRoute = '/api/menu/(foodid)';
const getCanteenDataRoute = 'api/getCanteenList?restaurantId=(p1)';
const adminDeleteMealRoute = '/deleteMeal';
const adminUpdateMealRoute = '/updateMeal';

const adminAuthRoute = '/api/auth/(canteen)';

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

function deletingData(){
    return{
        type:'ADMIN_DELETING_DATA'
    }
}
function successDeletingData(){
    return{
        type:'ADMIN_DELETING_SUCCESS'
    }
}
function deleteRequestFail(error){
    return {
        type: 'ADMIN_MEAL_DELETE_ERROR',
        error: error
    }
}

function updatingData(){
    return {
        type: 'ADMIN_UPDATE_DATA',
    }
}
function successUpdatingData(json){
    return {
        type: 'ADMIN_UPDATING_SUCCESS',
        success: json.data.success,
    }
}

export function dismissSuccessModal(){
    return {
        type: 'DISMISS_ADMIN_SUCCESS_MODAL'
    }
}

function authSuccess (json){
    return {
        type: 'ADMIN_AUTH_SUCCESS',
        success: json.data.success,
    }
}

function authFail (){
    return {
        type: 'ADMIN_AUTH_FAIL',
    }
}

export function redirectInsertPage(canteenString, canteenId){
    return {
        type: 'ADMIN_REDIRECT_TO_INSERT',
        canteenString: canteenString,
        canteenId: canteenId
    }
}

export function redirectListPage(canteenString, canteenId){
    return {
        type: 'ADMIN_REDIRECT_TO_LIST',
        canteenString: canteenString,
        canteenId: canteenId
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

export function clickMenuUpdate(canteenId, foodid) {
    return {
        type: 'CLICK_MENU_UPDATE',
        canteenName: restaurantMapper(canteenId),
        foodid: foodid,
    }
}

export function clickMenuDelete(foodid, password) {
    return dispatch=> {
        dispatch(deletingData());
        return axios.post(adminDeleteMealRoute, {id: foodid, password: password})
            .then(()=>dispatch(successDeletingData))
            .catch(err=>dispatch(deleteRequestFail(err)))
    }
}

export function updateMenu(menuJson) {
    console.log(menuJson);

    return dispatch=> {
        dispatch(updatingData());
        return axios.post(adminUpdateMealRoute, menuJson)
            .then((json)=>dispatch(successUpdatingData(json)))
            .catch(err=>dispatch(requestFail(err)))
    }
}

export function checkCanteenAuthentication(canteen, password){
    const api = adminAuthRoute.replace('(canteen)',canteen);
    console.log("auth api is " + api);
    console.log("successfully recieved password "+password);

    return dispatch=>{
        return axios.post(api, { password: password})
            .then((json)=>dispatch(authSuccess(json)))
            .catch(err=>dispatch(authFail(err)))
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
