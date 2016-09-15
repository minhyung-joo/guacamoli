
const initialState = {
    isShowDrawer:false,
    isShowCanteenList:true,
};

export default function uiStates(state = initialState, action) {
    switch(action.type){
        case 'TOGGLE_NAV_DRAWER':
            return {...state, isShowDrawer: !state.isShowDrawer};
        case 'CLICK_CANTEEN_LIST':
            return {...state, isShowCanteenList: !state.isShowCanteenList};
        default:
            return state;
    }
}