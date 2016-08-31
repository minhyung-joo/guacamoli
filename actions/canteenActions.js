const foodArray= [
    {
        id: 1,
        imageUrl:"http://www.fastfoodmenunutrition.com/wp-content/uploads/2015/03/fast-food.jpg",
        foodName:"Hot Dog",
        price:35
    },
    {
        id: 2,
        imageUrl:"http://pngimg.com/upload/burger_sandwich_PNG4150.png",
        foodName:"Sandwich",
        price:25
    },
    {
        id: 3,
        imageUrl:"http://www.seriouseats.com/images/20110417-dim-sum-har-gau.jpg",
        foodName:"Shrimp Dimsum",
        price:15
    },
    {
        id: 4,
        imageUrl:"https://s3.amazonaws.com/Menu_Pic/c20c3ce3-eef0-4b87-abb4-3909a3c5a246_N1_House_Special_Noodles.jpg",
        foodName:"Chinese Fried Noodles",
        price:30
    }
];

export function getFoodListData() {
    return {
        type: 'GET_FOOD_LIST_DATA',
        value: foodArray
    }
}