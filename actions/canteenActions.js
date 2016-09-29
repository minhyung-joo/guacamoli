var axios = require('axios');
const getFoodDetailRoute = '/api/menu/(foodid)';
const getCanteenDataRoute = 'api/getCanteenList?restaurantId=(p1)';
const getSearchReultRoute = '/api/query_search?query=(queryString)';

function fetchingData(){
    return{
        type:'FETCHING_DATA'
    }
}

function recieveFoodDetailData(json){
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
function recieveSearchData(json){
    return{
        type: 'RECIEVED_SEARCH_DATA',
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
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(recieveFoodDetailData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

export function getCanteenData(canteenid){
    const api = getCanteenDataRoute.replace('(p1)',canteenid);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(recieveCanteenData(json))).catch(err=>dispatch(requestFail(err)))
    }
}

export function getSearchReult(query){
    const api = getSearchReultRoute.replace('(queryString)',query);
    console.log(api);
    return dispatch=>{
        dispatch(fetchingData());
        return axios.get(api).then(json=>dispatch(recieveSearchData(json))).catch(err=>dispatch(requestFail(err)))
    }
}