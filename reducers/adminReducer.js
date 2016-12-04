/**
 * Created by nylee on 1/12/2016.
 */
var _ = require('underscore');

// const initialState = {
//     'Meal Name': "",
//     'Meal Name Chinese': "",
//     'Price': null,
//     'Ingredient Description': "",
//
//     'Restaurant':'Default',
//     'Delivery Speed':'Default',
//     'Cuisine Type':'Default',
//
//     'Offered Time':[],
//     'Taste Type':[],
//     'Ingredients':[],
//     'Sauce Type':[],
// };

const initialState = {
    mealName: "",
    mealNameChinese:"",
    price: null,

    restaurant: 0,
    cuisineType: 0,
    deliverySpeed: 0,

    offeredTime: [],
    tasteType: [],
    ingredient: [],
    sauceType: [],

    ingredientDescription: "",
};

export default function admin(state = initialState, action) {
    switch(action.type){
        case 'INPUT_SINGLE_TEXT_OPTION':
            var newState = _.extend({},state);
            newState[action.title] = action.value;
            return newState;

        case 'INPUT_SELECT_OPTION':
            var newState = _.extend({},state);
            newState[action.name] = action.value;
            return newState;

        case 'ADMIN_INPUT_FILTER_CHECKBOX_OPTIONS':
            var newState = updateFilterOption(state, action.isChecked, action.filterTitle, action.filterValue);
            console.log(newState);

            return newState;

        default:
            return state;
    }
}

function updateFilterOption(state, isChecked, title, value){
    const mappedTitle = titleMapper(title);

    var newOptionArray = state[mappedTitle].slice();
    if(isChecked){  //add new filter option
        newOptionArray.push(value);
    }else{  //remove filter option
        _.without(newOptionArray, value);
    }
    var newFilterOptionObject = _.extend({},state);
    newFilterOptionObject[mappedTitle] = newOptionArray;

    return newFilterOptionObject;
}

function titleMapper(filterTitle){
    switch(filterTitle){
        case 'Meal Name':
            return 'mealName';
        case 'Meal Name Chinese':
            return 'mealNameChinese';
        case 'Price':
            return 'price';
        case 'Ingredient Description':
            return 'ingredientDescription'
        case 'Restaurant':
            return 'restaurant';
        case 'Delivery Speed':
            return 'deliverySpeed';
        case 'Cuisine Type':
            return 'cuisineType';
        case 'Offered Time':
            return 'offeredTime';
        case 'Taste Type':
            return 'tasteType';
        case 'Ingredients':
            return 'ingredient';
        case 'Sauce Type':
            return 'sauceType';
    }
}