/**
 * Created by nylee on 1/12/2016.
 */
var _ = require('underscore');

const DEFAULT_INGREDIENT_DESCRIPTION = {
    calories:'',
    carbohydrate:'',
    protein:'',
    fat:'',
    fibre:'',
    sugar:'',
    sodium:'',
    W:false,
    M:false,
    I:false,
    E:false,
    H:false,
};

const DEFAULT_OPTIONS = {
    id:null,
    mealName: "",
    mealNameChinese:"",
    price: null,
    password: "",

    restaurant: 0,
    cuisineType: 0,
    deliverySpeed: 0,

    offeredTime: [],
    tasteType: [],
    ingredient: [],
    sauceType: [],

    ingredientsDescription: "",
    nutritionInformation: {
        calories:'',
        carbohydrate:'',
        protein:'',
        fat:'',
        fibre:'',
        sugar:'',
        sodium:'',
        W:false,
        M:false,
        I:false,
        E:false,
        H:false,
    },
    isUpload: false,
};

const initialState = {
    id:null,
    mealName: "",
    mealNameChinese:"",
    price: null,
    password: "",

    restaurant: 0,
    cuisineType: 0,
    deliverySpeed: 0,

    offeredTime: [],
    tasteType: [],
    ingredient: [],
    sauceType: [],

    ingredientsDescription: "",
    nutritionInformation: {
        calories:'',
        carbohydrate:'',
        protein:'',
        fat:'',
        fibre:'',
        sugar:'',
        sodium:'',
        W:false,
        M:false,
        I:false,
        E:false,
        H:false,
    },
    isUpload: false,
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

        case 'INPUT_NUTRITION_OPTION':
            var newState = _.extend({},state);
            var newNutritionObj = _.extend({}, state.nutritionInformation);
            newNutritionObj[action.title] = action.value;

            newState['nutritionInformation'] = newNutritionObj;

            console.log(newState);

            return newState;

        case 'ADMIN_INPUT_FILTER_CHECKBOX_OPTIONS':
            var newState = updateFilterOption(state, action.isChecked, action.filterTitle, action.filterValue);
            return newState;

        case 'ADMIN_RESET_INPUT_OPTIONS':
            var defaultState = _.extend({},DEFAULT_OPTIONS);
            console.log(defaultState);
            return defaultState;

        case 'LOAD_UPDATE_PAGE_DATA':
            var data = action.data;
            // console.log("data");
            // console.log(data);

            let descriptionVal = null;

            if(data.nutritioninformation==null){
                descriptionVal = DEFAULT_INGREDIENT_DESCRIPTION;
            }else{
                descriptionVal = JSON.parse(data.nutritioninformation);
            }

            return {...state,
                mealName: data.name,
                mealNameChinese: data.chinesename,
                price: data.price,

                restaurant: data.restaurantid,
                cuisineType: data.cuisinetypeid,
                deliverySpeed: data.deliveryspeedid,

                offeredTime: data.offeredtimesid,
                tasteType: data.tastetypesid,
                ingredient: data.ingredienttypesid,
                sauceType: data.saucetypesid,

                ingredientsDescription: data.ingredientsdescription,
                nutritionInformation: descriptionVal,
            };

        case 'IDENTIFY_PAGE_TYPE':
            console.log(action.foodid);
            if(action.foodid==null)
                return {...state, isUpload: true, id:action.foodid};
            else
                return {...state, isUpload: false, id:action.foodid};

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
            return 'ingredientsDescription'
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

function indexToTextMapperForCheckbox(){

}