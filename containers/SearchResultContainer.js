import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Button, Row, Col} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList';
import SearchStatusBar from '../components/SearchStatusBar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import DialogFilter from '../components/DialogFilter';

import {mapFilterOptionToBodyOption} from '../constants/Utility';

import {showModalFilter, hideModalFilter, clickAdvancedFilter,
    toggleSearchButton,
} from '../actions/uiActions';

import {
    getSearchReult, getFilterResult
}from '../actions/canteenActions';

class SearchResultContainer extends Component {
    componentWillMount(){
        if(this.props.isSearch){
            this.props.getSearchReult(this.props.params.query);
        }else{
            const body = mapFilterOptionToBodyOption(this.props.filterOptions);
            this.props.getFilterResult(body);
        }
    }

    render () {
        const {
            isFetching,
            searchResultArray,
            isSearch
        } = this.props;

        return (
            isFetching?
                <div>
                    <Row>
                        <Col mdOffset={5} md={7}>
                            <RefreshIndicator
                                size={50}
                                left={70}
                                top={0}
                                primary={true}
                                status="loading"
                            />
                        </Col>
                    </Row>
                </div>
                :
                <div>
                    <Row>
                        <Col md={12}>
                            {
                                isSearch?<p>Your Search Query: {this.props.params.query} </p>:<SearchStatusBar filterOptions={this.props.filterOptions}/>
                            }
                        </Col>
                        <Col md={12} style={{paddingTop: 10}}>
                            <FoodListComponent foodArray={searchResultArray}/>
                        </Col>
                        {/*<DialogFilter isShow={isShowFilterModal} onHide={hideModalFilter} isAdvancedFilter={isAdvancedFilter} onClickAdvanced={clickAdvancedFilter}/>*/}
                    </Row>
                </div>


        );
    }
}

export default connect(
    state => ({
        isFetching: state.canteens.isFetching,
        searchResultArray: state.canteens.searchResultArray,
        isSearch: state.uiStates.isSearch,
        filterOptions: state.uiStates.filterOptions,
    }),
    {
        getSearchReult, getFilterResult,
    }
)(SearchResultContainer)