
const initialState = {
    foodArray: [],
    foodDetail:{}
};

export default function canteens(state = initialState, action) {
    switch(action.type){
        case 'RECIEVE_CANTEEN_DATA':
            return {...state, foodArray: action.data};
        case 'RECIEVE_FOOD_DETAIL_DATA':
            console.log(action.data);
            return {...state, foodArray: [], foodDetail: action.data};
        case 'REQUEST_ERROR':
            return {...state};
        default:
            return state;
    }
}