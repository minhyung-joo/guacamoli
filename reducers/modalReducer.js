
const initialState = {
    isShowFilterModal: false,
    isAdvancedFilter: false
};

export default function modal(state = initialState, action) {
    switch(action.type){
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