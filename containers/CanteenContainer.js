import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {Button, Row, Col} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList';
import {logoLG1,logoapc,logogrb,logomilano} from '../constants/ImageHandler';

import {
    getFoodListData
}from '../actions/canteenActions';

class CanteenPage extends Component {
    componentWillMount(){
       this.props.getFoodListData();
        //TODO pass this.props.canteenType as param, and get corresponding food data
    }

    determineCanteenName(canteenType){
        const height = 50;
        switch (canteenType){
            case 'lg1':
                return <span><img src={logoLG1} height={height}/> LG1</span>;
            case 'apc':
                return <span><img src={logoapc} height={height}/> APC</span>;
            case 'grb':
                return <span><img src={logogrb} height={height}/> GRB</span>;
            case 'milano':
                return <span><img src={logomilano} height={height}/> Milano</span>;
        }
    }

    render () {
        const {
            foodArray,
            canteenType
        } = this.props;

        return (
            <div>
                <Row>
                    <Col mdOffset={5} md={4}>
                        <h1>
                            {this.determineCanteenName(canteenType)}
                        </h1>
                    </Col>
                    <Col md={12} style={{paddingTop: 10}}>
                        <FoodListComponent foodArray={foodArray}/>
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
        foodArray: state.canteens.foodArray
    }),
    {
        getFoodListData
    }
)(CanteenPage)