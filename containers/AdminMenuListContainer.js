import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import AdminFoodThumbnail from '../components/AdminFoodThumbnail';

import {clickMenuUpdate, clickMenuDelete, getAdminCanteenData} from '../actions/adminMenuAction';

class AdminMenuListContainer extends React.Component {
    componentWillMount(){
        this.props.getAdminCanteenData(this.props.params.canteenid);
    }

    render () {
        const {isFetching, foodArray, clickMenuUpdate, clickMenuDelete} = this.props;
        return (
            <div>
                <Row>
                    {
                        !isFetching?
                            foodArray.map(function(food){
                                return (
                                    <Col md={3} xs={4}>
                                        <AdminFoodThumbnail foodDetail={food}
                                                            onUpdate={clickMenuUpdate}
                                                            onDelete={clickMenuDelete}/>
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