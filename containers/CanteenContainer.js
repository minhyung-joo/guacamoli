import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Button, Row, Col} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList';
import PaginationBar from '../components/PaginationBar';

import {logoLG1,logoAPC,logoGRB,logoMilano} from '../constants/ImageHandler';
import {restaurantList} from '../constants/StaticData';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import {
    getCanteenData, changePaginationActivePage, resetPaginationActivePage
}from '../actions/canteenActions';

class CanteenPage extends Component {
    componentWillMount(){
        this.props.getCanteenData(this.props.canteenType);
    }

    componentWillUnmount(){
        this.props.resetPaginationActivePage();
    }

    determineCanteenName(canteenType){
        const canteenName = restaurantList[canteenType];
        return <span><img src={canteenName=='LG1'?logoLG1:canteenName=='APC'?logoAPC: canteenName=='logoGRB'?logoGRB:logoMilano} height='50'/> {canteenName} </span>;
    }

    render () {
        const {
            isFetching,
            foodArray,
            canteenType,
            activePage,
            changePaginationActivePage
        } = this.props;
        const dataLimit = 16;
        var slicedData = foodArray.slice((activePage-1)*dataLimit,activePage*dataLimit);
        var lastPage = Math.ceil(this.props.foodArray.length/dataLimit);

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
                        <Col mdOffset={5} md={4}>
                            <h1>
                                {this.determineCanteenName(canteenType)}
                            </h1>
                        </Col>
                        <Col md={12} style={{paddingTop: 10}}>

                            <FoodListComponent foodArray={slicedData}/>
                            {
                                foodArray.length > dataLimit?
                                    <PaginationBar activePage={activePage} lastPage={lastPage} onClickHandler={changePaginationActivePage}/>: null
                            }
                        </Col>
                    </Row>
                </div>
        );
    }
}

const canteenTitleStyle={
    color:'#5f7b1b'
}

CanteenPage.propTypes = {
    foodArray: PropTypes.array.isRequired
};


export default connect(
    state => ({
        foodArray: state.canteens.foodArray,
        isFetching: state.canteens.isFetching,
        activePage: state.canteens.activePage,
    }),
    {
        getCanteenData, changePaginationActivePage, resetPaginationActivePage
    }
)(CanteenPage)