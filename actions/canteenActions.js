var axios = require('axios');
const getFoodDetailRoute = '/api/menu/(foodid)';
const getCanteenDataRoute = 'api/getCanteenList?restaurantId=(p1)';

function fetchingData(){
    return{
        type:'FETCHING_DATA'
    }
}

function recieveFoodDetailData(json){
    console.log(json);
    return{
        type: 'RECIEVED_FOOD_DETAIL_DATA',
        data: json.data
    }
}
function recieveCanteenData(json){
    return{
        type: 'RECIEVED_CANTEEN_DATA',
        data: json.data
    }
}
function requestFail(error){
    return{
        type: 'REQUEST_ERROR',
        error: error
    }
}

export function getFoodDetail(foodid) {
    const api = getFoodDetailRoute.replace('(foodid)',foodid);
    console.log(api);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(recieveFoodDetailData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

export function getCanteenData(canteenid){
    const api = getCanteenDataRoute.replace('(p1)',canteenid);
    console.log(api);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(recieveCanteenData(json))).catch(err=>dispatch(requestFail(err)))
    }
}