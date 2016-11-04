import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import AdminFoodThumbnail from '../components/AdminFoodThumbnail';

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

    }

    render () {
        return (
            <div>
                <Row>
                    {
                        foods.map(function(food){
                            return (
                                <Col md={3} xs={4}>
                                    <AdminFoodThumbnail foodDetail={food}/>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        rankingResults: state.canteens.rankingResults,
        isFetching: state.canteens.isFetching,
    }),
    {
    }
)(AdminMenuListContainer)