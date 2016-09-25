
const initialState = {
    isShowDrawer:false,
    isShowCanteenList:true,
    isSearch:false,
    // isFilter:false,
    isShowFilterModal: false,
    isAdvancedFilter: false,
};

export default function uiStates(state = initialState, action) {
    switch(action.type){
        case 'TOGGLE_NAV_DRAWER':
            return {...state, isShowDrawer: !state.isShowDrawer};
        case 'CLICK_CANTEEN_LIST':
            return {...state, isShowCanteenList: !state.isShowCanteenList};
        case 'TOGGLE_SEARCH_BUTTON':
            return {...state, isSearch: !state.isSearch};
        // case 'TOGGLE_FILTER_BUTTON':
        //     return {...state, isFilter: !state.isFilter};
        case 'SHOW_MODAL_FILTER':
            return {...state, isShowFilterModal: true};
        case 'HIDE_MODAL_FILTER':
            return {...state, isShowFilterModal: false};
        case 'CLICK_ADVANCED_FILTER':
            return {...state, isAdvancedFilter: !state.isAdvancedFilter};
        default:
            return state;
    }
}