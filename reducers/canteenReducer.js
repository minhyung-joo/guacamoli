
const initialState = {
    isFetching:false,
    foodArray: [],
    foodDetail:{}
};

export default function canteens(state = initialState, action) {
    switch(action.type){

        case 'FETCHING_DATA':
            console.log("fetching data");
            return {...state, isFetching: true};
        case 'RECIEVED_CANTEEN_DATA':
            console.log("recieved canteen data");
            return {...state, foodArray: action.data, isFetching: false};
        case 'RECIEVED_FOOD_DETAIL_DATA':
            console.log(action.data);
            return {...state, foodArray: [], foodDetail: action.data, isFetching: false};
        case 'REQUEST_ERROR':
            return {...state};
        default:
            return state;
    }
}