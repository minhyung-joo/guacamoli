import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Button, Row, Col} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList';
import SearchStatusBar from '../components/SearchStatusBar';
import RefreshIndicator from 'material-ui/RefreshIndicator';


import {
    getCanteenData
}from '../actions/canteenActions';

class SearchResultContainer extends Component {
    componentWillMount(){
        this.props.getCanteenData(1);
    }

    render () {
        const {
            isFetching,
            foodArray,
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
                            <SearchStatusBar filterOptions={filterOptions.filterArray}/>
                        </Col>
                        <Col md={12} style={{paddingTop: 10}}>

                            <FoodListComponent foodArray={foodArray}/>
                        </Col>
                    </Row>
                </div>
        );
    }
}

SearchResultContainer.propTypes = {
    foodArray: PropTypes.array.isRequired
};


export default connect(
    state => ({
        foodArray: state.canteens.foodArray,
        isFetching: state.canteens.isFetching
    }),
    {
        getCanteenData
    }
)(SearchResultContainer)