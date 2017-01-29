
export const restaurantList =['Default', 'LG1','MCDonald','GRB', 'APC', 'Milano','Einstein Cafe', 'Ebeenezer', 'LSK'];
export const restaurantListForMapping =['Default', 'lg1','MCDonald','grb', 'apc', 'milano','Einstein Cafe', 'Ebeenezer', 'LSK'];
export const deliverySpeed = ['Default','Pickup','Wait Ticket No.'];
export const offeredTime = ['Default','Morning','Lunch','Tea Time','Dinner'];
export const cuisineType = ['Default','Chinese','Japanese','Italian','Thai','Vietnamese','Indian/Turkey'];
export const defaultFilterOptions = {
    'Restaurant':restaurantList, 'Delivery Speed':deliverySpeed, 'Offered Time':offeredTime, 'Cuisine Type':cuisineType
};

// const foodTypeGeneral = ['noodle','rice','soup','bread','dimsum'];

const offeredtime = ['Morning','Lunch','Tea Time','Dinner'];
const tasteType = ['spicy','sweet','salty','sour','oily'];
const foodTypeIngredient = ['pork','beef','chicken','lamb','fish','duck', 'vegetable'];
const sauceType = ['tomato','cream','black pepper','mayonnaise','curry','soy sauce','oyster sauce','teriyaki', 'mala'];
const without = ['vegetable','pork','chicken','beef','lamb','fish'];

export const chineseDeliverySpeed = ['Default','Pickup 自取','Wait Ticket No. 等號'];
export const chineseCuisineType = ['Default','Chinese 中國菜','Japanese 日本菜','Italian 意大利菜','Thai 泰國菜','Vietnamese 越南菜','Indian/Turkey 印度/土耳其菜'];

const chineseOfferedTime = ['Morning 早餐','Lunch 午餐','Tea Time 下午茶','Dinner 晚餐'];
const chineseTasteType = ['spicy 辣','sweet 甜','salty 咸','sour 酸','oily 多油'];
const chineseFoodTypeIngredient = ['pork 豬肉','beef 牛肉','chicken 雞肉','lamb 羊肉','fish 魚','duck 鴨肉', 'vegetable 蔬菜'];


const chineseSauceType = ['tomato 番茄醬','cream 忌廉醬','black pepper 黑椒醬','mayonnaise 蛋黃醬','curry 咖喱','soy 豉油', 'oyster 蠔油','teriyaki 燒汁', 'mala 麻辣醬'];
const chineseWithout = ['vegetable 蔬菜','pork 豬肉','chicken 雞肉','beef 牛肉','lamb 羊肉','fish 魚'];

export const advancedFilterOptions = {
    'Offered Time':offeredtime, 'Taste Type':tasteType, 'Ingredients':foodTypeIngredient, 'Sauce Type':sauceType, 'Without':without
};

export const chineseAdvancedFilterOptions = {
    'Offered Time (供應時間)':chineseOfferedTime, 'Taste Type (口味)':chineseTasteType, 'Ingredients (成分)':chineseFoodTypeIngredient, 'Sauce Type (醬料)':chineseSauceType, 'Without':chineseWithout
};


export const boolOptions = [true, false];