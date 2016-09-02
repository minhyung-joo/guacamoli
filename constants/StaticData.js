
export const restaurantList =['Default', 'LG1','GRB', 'APC', 'Milano' /*,'Chinese Garden', 'MCDonald', 'Einstein Cafe', 'Ebeenezer', 'LSK'*/];
const deliverySpeed = ['Default','Pickup','Wait Ticket No.'];
const offeredTime = ['Default','Morning','Lunch','Tea Time','Dinner'];
const cuisineType = ['Default','Chinese','Japanese','Italian','Thai','Vietnamese','Indian/Turkey'];
export const defaultFilterOptions = {
    'Restaurant':restaurantList, 'Delivery Speed':deliverySpeed, 'Offered Time':offeredTime, 'Cuisine Type':cuisineType
};

const tasteType = ['spicy','sweet','salty','sour','oily'];
const foodTypeGeneral = ['noodle','rice','soup','bread','dimsum'];
const foodTypeIngredient = ['pork','beef','chicken','lamb','fish','duck', 'vegetable'];
const sauceType = ['tomato','cream','black pepper','mayonnaise','curry','soy sauce','oyster sauce','teriyaki'];
const withoutList = ['vegetable','pork','chicken','beef','lamb','fish'];
export const advancedFilterOptions = {
    'Taste Type':tasteType, 'Ingredients':foodTypeIngredient, 'Sauce Type':sauceType, 'Without':withoutList
};