
export const restaurantList =['Default', 'LG1','MCDonald','GRB', 'APC', 'Milano','Einstein Cafe', 'Ebeenezer', 'LSK'];
export const deliverySpeed = ['Default','Pickup','Wait Ticket No.'];
export const offeredTime = ['Default','Morning','Lunch','Tea Time','Dinner'];
export const cuisineType = ['Default','Chinese','Japanese','Italian','Thai','Vietnamese','Indian/Turkey'];
export const defaultFilterOptions = {
    'Restaurant':restaurantList, 'Delivery Speed':deliverySpeed, 'Offered Time':offeredTime, 'Cuisine Type':cuisineType
};

const tasteType = ['spicy','sweet','salty','sour','oily'];
const foodTypeGeneral = ['noodle','rice','soup','bread','dimsum'];
const foodTypeIngredient = ['pork','beef','chicken','lamb','fish','duck', 'vegetable'];
const sauceType = ['tomato','cream','black pepper','mayonnaise','curry','soy sauce','oyster sauce','teriyaki'];
const without = ['vegetable','pork','chicken','beef','lamb','fish'];
export const advancedFilterOptions = {
    'Taste Type':tasteType, 'Ingredients':foodTypeIngredient, 'Sauce Type':sauceType, 'Without':without
};