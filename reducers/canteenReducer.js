
const initialState = {
    foodArray: []
};

export default function canteens(state = initialState, action) {
    switch(action.type){
        case 'GET_FOOD_LIST_DATA':
            var newFoodArray = state.foodArray.concat(action.value);
            return {...state, foodArray: newFoodArray};
        default:
            return state;
    }
}