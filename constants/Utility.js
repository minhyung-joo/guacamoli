import {defaultFilterOptions, advancedFilterOptions} from './StaticData';
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

export function imageUrlMapper(relativePath){
    const absoluteBasePath = 'http://guacamolistorage-hkust25.appcloud.ust.hk/uploads/imageurl';
    return absoluteBasePath.replace('imageurl', relativePath);
}

export function mapFilterOptionToBodyOption(filterOption){
    var body = {restaurantId:0, deliveryTime:0, offeredTime:0, cuisine:0};

    if(filterOption["Restaurant"] != 'Default')
        body.restaurantId = defaultFilterOptions["Restaurant"].indexOf(filterOption["Restaurant"]);
    if(filterOption["Delivery Speed"] != 'Default')
        body.deliveryTime = defaultFilterOptions["Delivery Speed"].indexOf(filterOption["Delivery Speed"]);
    if(filterOption["Offered Time"] != 'Default')
        body.offeredTime = defaultFilterOptions["Offered Time"].indexOf(filterOption["Offered Time"]);
    if(filterOption["Cuisine Type"] != 'Default')
        body.cuisine = defaultFilterOptions["Cuisine Type"].indexOf(filterOption["Cuisine Type"]);

    if(filterOption["Taste Type"].length > 0){
        body.tasteType = [];
        filterOption["Taste Type"].map(function(option){
            body.tasteType.push(advancedFilterOptions["Taste Type"].indexOf(option));
        });
    }

    if(filterOption["Sauce Type"].length > 0){
        body.sauceType = [];
        filterOption["Sauce Type"].map(function(option){
            body.sauceType.push(advancedFilterOptions["Sauce Type"].indexOf(option));
        });
    }

    if(filterOption["Ingredients"].length > 0){
        body.ingredientsType = [];
        filterOption["Ingredients"].map(function(option){
            body.ingredientsType.push(advancedFilterOptions["Ingredients"].indexOf(option));
        });
    }

    console.log(body);
    return body;
}
