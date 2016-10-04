
const initialState = {
    isFetching:false,
    foodArray: [],
    foodDetail:{},
    searchResultArray:[],
    activePage:1,
};

export default function canteens(state = initialState, action) {
    switch(action.type){
        case 'FETCHING_DATA':
            return {...state, isFetching: true};
        case 'RECIEVED_CANTEEN_DATA':
            return {...state, foodArray: action.data, isFetching: false};
        case 'RECIEVED_FOOD_DETAIL_DATA':
            return {...state, foodArray: [], foodDetail: action.data, isFetching: false};
        case 'RECIEVED_SEARCH_DATA':
            return {...state, searchResultArray: action.data, isFetching: false};
        case 'RECEIVED_FILTER_DATA':
            return {...state, searchResultArray: action.data, isFetching: true};
        case 'CHANGE_PAGINATION_ACTIVE_PAGE':
            return {...state, activePage: action.pageNo};
        case 'RESET_PAGINATION_ACTIVE_PAGE':
            return {...state, activePage: 1};
        case 'REQUEST_ERROR':
            return {...state};
        default:
            return state;
    }
}