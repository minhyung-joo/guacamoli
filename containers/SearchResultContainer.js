import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Button, Row, Col} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList';
import SearchStatusBar from '../components/SearchStatusBar';
import RefreshIndicator from 'material-ui/RefreshIndicator';


import {
    getSearchReult
}from '../actions/canteenActions';

class SearchResultContainer extends Component {
    componentWillMount(){
        this.props.getSearchReult(this.props.params.query);
    }

    render () {
        const {
            isFetching,
            searchResultArray,
            isSearch
        } = this.props;

        const filterOptions = {
            restaurant:1,
            deliveryTime:2,
            offeredTime:3,
            cuisine:4,
            tasteType:[2, 3],
            offeredTime:[],
            ingredient:[],
            sauceType:[],
            without:[],
            filterArray:['LG1','Pickup','Lunch','spicy','pork','vegetable']
        };

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
                                isSearch?<p>Your Search Query: {this.props.params.query} </p>:<SearchStatusBar filterOptions={filterOptions.filterArray}/>
                            }
                        </Col>
                        <Col md={12} style={{paddingTop: 10}}>
                            <FoodListComponent foodArray={searchResultArray}/>
                        </Col>
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
    }),
    {
        getSearchReult
    }
)(SearchResultContainer)