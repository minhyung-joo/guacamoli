// import { push } from 'react-router-redux';
import { hashHistory } from 'react-router'

const initialState = {
    isShowDrawer:false,
    isShowCanteenList:true,
    isSearch:false,
    // isFilter:false,
    isShowFilterModal: false,
    isAdvancedFilter: false,
    searchQuery:'',
};

export default function uiStates(state = initialState, action) {
    switch(action.type){
        case 'TOGGLE_NAV_DRAWER':
            return {...state, isShowDrawer: !state.isShowDrawer};
        case 'CLICK_CANTEEN_LIST':
            return {...state, isShowCanteenList: !state.isShowCanteenList};
        case 'TOGGLE_SEARCH_BUTTON':
            return {...state, isSearch: !state.isSearch};
        case 'SHOW_MODAL_FILTER':
            return {...state, isShowFilterModal: true};
        case 'HIDE_MODAL_FILTER':
            return {...state, isShowFilterModal: false};
        case 'CLICK_ADVANCED_FILTER':
            return {...state, isAdvancedFilter: !state.isAdvancedFilter};
        case 'INPUT_SEARCH_QUERY':
            return {...state, searchQuery: action.query};
        case 'SUBMIT_SEARCH_QUERY':
            // this.props.dispatch(push('/searchResult'));
            // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
            hashHistory.push('/searchResult/'+state.searchQuery);

            //  TODO need to reset Search Query & status somewhere
            return {...state, isSearch:true};
        default:
            return state;
    }
}