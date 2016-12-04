// import { push } from 'react-router-redux';
import { hashHistory } from 'react-router'
var _ = require('underscore');

const DEFAULT_OPTIONS = {
    'Restaurant':'Default',
    'Delivery Speed':'Default',
    'Cuisine Type':'Default',
    'Offered Time':'Default',
    'Taste Type':[],
    'Ingredients':[],
    'Sauce Type':[],
    'Without':[],
};

const initialState = {
    isShowDrawer:false,
    isShowCanteenList:true,
    isSearch:false,
    isShowFilterModal: false,
    isAdvancedFilter: false,
    searchQuery:'',
    filterOptions:_.extend({},DEFAULT_OPTIONS),
    stepIndex:0,
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
            return {...state, isSearch:true};

        case 'INPUT_FILTER_OPTIONS':
            var newFilterOption = _.extend({},state.filterOptions);
            newFilterOption[action.filterTitle] = action.filterValue;
            return {...state, filterOptions: newFilterOption};
        case 'INPUT_FILTER_CHECKBOX_OPTIONS':
            var newFilterOption = updateFilterOption(state.filterOptions, action.isChecked, action.filterTitle, action.filterValue);
            return {...state, filterOptions: newFilterOption};

        case 'RESET_FILTER_OPTIONS':
            return {...state, filterOptions: _.extend({},DEFAULT_OPTIONS)};
        case 'SUBMIT_FILTER_SEARCH':
            hashHistory.push('/filterResult/');
            return {...state, isSearch:false};

        case 'STEPPER_CHANGE_INDEX':
            return {...state, stepIndex: action.newIndex};
        case 'STEPPER_HANDLE_NEXT':
            if(state.stepIndex<4)
                return {...state, stepIndex: state.stepIndex+1};
            else
                return {...state};
        case 'STEPPER_HANDLE_PREV':
            if(state.stepIndex>0)
                return {...state, stepIndex: state.stepIndex-1};
            else
                return {...state};
        default:
            return state;
    }
}