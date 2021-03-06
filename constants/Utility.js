import {defaultFilterOptions, advancedFilterOptions, restaurantListForMapping} from './StaticData';
export function availabilityMapper(ids){
    if(ids==null)
        return null;

    var availabilityString="";
    ids.forEach(
        id=>{
            switch(id){
                case 1:
                    availabilityString = availabilityString.concat("Morning, ");
                    break;
                case 2:
                    availabilityString = availabilityString.concat("Lunch, ");
                    break;
                case 3:
                    availabilityString = availabilityString.concat('Tea Time, ');
                    break;
                case 4:
                    availabilityString = availabilityString.concat('Dinner, ');
                    break;
            }
        }
    );
    return availabilityString.substring(0, availabilityString.length-2);
}

export function tasteMapper(ids){
    if(ids==null)
        return null;
    else{
        var tasteString="";
        ids.forEach(
            id=>{
                switch(id){
                    case 1:
                        tasteString = tasteString.concat("spicy, ");
                        break;
                    case 2:
                        tasteString = tasteString.concat("sweet, ");
                        break;
                    case 3:
                        tasteString = tasteString.concat('salty, ');
                        break;
                    case 4:
                        tasteString = tasteString.concat('sour, ');
                        break;
                    case 5:
                        tasteString = tasteString.concat('oily, ');
                        break;
                }
            }
        );
        return tasteString.substring(0, tasteString.length-2);
    }
}

export function imageUrlMapper(relativePath, isOriginal){
    const absoluteBasePath = 'http://guacamolistorage-hkust25.appcloud.ust.hk/uploads/imageurl';

    var newAbsoluteBasePath = absoluteBasePath.replace('imageurl', relativePath);
    if(relativePath!=undefined) {
        if(isOriginal){
            newAbsoluteBasePath = newAbsoluteBasePath.replace('.jpg','_L.jpg');
        }else{
            newAbsoluteBasePath = newAbsoluteBasePath.replace('.jpg','_S.jpg');
        }
    }
    return newAbsoluteBasePath;
}

export function mapFilterOptionToBodyOption(filterOption){
    var body = {restaurantId:0, deliveryTime:0, offeredTime:0, cuisine:0, tasteType: [], sauceType: [], ingredientsType:[], without:[]};

    if(filterOption["Restaurant"] != 'Default')
        body.restaurantId = defaultFilterOptions["Restaurant"].indexOf(filterOption["Restaurant"]);
    if(filterOption["Delivery Speed"] != 'Default')
        body.deliveryTime = defaultFilterOptions["Delivery Speed"].indexOf(filterOption["Delivery Speed"]);
    if(filterOption["Offered Time"] != 'Default')
        body.offeredTime = defaultFilterOptions["Offered Time"].indexOf(filterOption["Offered Time"]);
    if(filterOption["Cuisine Type"] != 'Default')
        body.cuisine = defaultFilterOptions["Cuisine Type"].indexOf(filterOption["Cuisine Type"]);

    if(filterOption["Taste Type"].length > 0){
        filterOption["Taste Type"].map(function(option){
            body.tasteType.push(advancedFilterOptions["Taste Type"].indexOf(option)+1);
        });
    }

    if(filterOption["Sauce Type"].length > 0){
        filterOption["Sauce Type"].map(function(option){
            body.sauceType.push(advancedFilterOptions["Sauce Type"].indexOf(option)+1);
        });
    }

    if(filterOption["Ingredients"].length > 0){
        filterOption["Ingredients"].map(function(option){
            body.ingredientsType.push(advancedFilterOptions["Ingredients"].indexOf(option)+1);
        });
    }

    if(filterOption["Without"].length > 0){
        filterOption["Without"].map(function(option){
            body.without.push(advancedFilterOptions["Without"].indexOf(option)+1);
        });
    }

    console.log(body);

    // var jsonBody = JSON.stringify(body);
    return body;
}

export function valueStringToIndexConverter(title, valueArray) {
    var resultArray = [];
    if(valueArray.length > 0) {
        switch (title) {
            case 'offeredTimes':
                valueArray.map(function (option) {
                    resultArray.push(advancedFilterOptions["Offered Time"].indexOf(option) + 1);
                });
                break;
            case 'tasteTypes':
                valueArray.map(function (option) {
                    resultArray.push(advancedFilterOptions["Taste Type"].indexOf(option) + 1);
                });
                break;
            case 'ingredientTypes':
                valueArray.map(function (option) {
                    resultArray.push(advancedFilterOptions["Ingredients"].indexOf(option) + 1);
                });
                break;
            case 'sauceTypes':
                valueArray.map(function (option) {
                    resultArray.push(advancedFilterOptions["Sauce Type"].indexOf(option) + 1);
                });
                break;
        }
    }
    return resultArray;
}

export function restaurantNameToIdMapper(restaurantName){
    return restaurantListForMapping.indexOf(restaurantName);
}

export function nutritionColorLabeller(type, percentage){

    if(type.localeCompare('Fibre')==0 || type.localeCompare('Protein')==0){   //little = bad
        if(percentage<33)
            return 'red'
        else if(percentage<66)
            return 'orange'
        else
            return 'green'
    }else{  //little = good
        if(percentage<33)
            return 'green'
        else if(percentage<66)
            return 'orange'
        else
            return 'red'

    }
}