import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import AdminFoodThumbnail from '../components/AdminFoodThumbnail';

import {clickMenuUpdate, clickMenuDelete, getAdminCanteenData} from '../actions/adminMenuAction';

var foods = [
    {
        "restaurantid": 1,
        "name": "Dim Sum",
        "price": 30,
        "picture_url": "http://www.seriouseats.com/assets_c/2011/04/20110417-dim-sum-primary-thumb-625xauto-154451.jpg"
    }  ,
    {
        "restaurantid": 2,
        "name": "Dim Sum 2",
        "price": 20,
        "picture_url": "http://www8.gmanews.tv/webpics/v3/2012/08/chee_cheong_fun.jpg"
    }
];

class AdminMenuListContainer extends React.Component {
    componentWillMount(){
        this.props.getAdminCanteenData(this.props.params.canteenid);
    }

    render () {
        return (
            <div>
                <Row>
                    {
                        !this.props.isFetching?
                            this.props.foodArray.map(function(food){
                                return (
                                    <Col md={3} xs={4}>
                                        <AdminFoodThumbnail foodDetail={food} onUpdate={this.props.clickMenuUpdate} onDelete={this.props.clickMenuDelete}/>
                                    </Col>
                                )
                            }, this)
                            :
                            null
                    }
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        foodArray: state.adminMenu.foodArray,
        isFetching: state.adminMenu.isFetching,
    }),
    {
        clickMenuUpdate, clickMenuDelete,
        getAdminCanteenData
    }
)(AdminMenuListContainer)