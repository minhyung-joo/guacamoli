import React from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-bootstrap';

import FoodThumbnailComponent from './FoodThumbnail.js';

export default class FoodListComponent extends React.Component {
    render() {
        return (
            <Row>
                {
                    this.props.foodArray.map(function(food){
                        return(
                            <Col md={3} xs={12}>
                                <Link to={`/food/${1}`}>
                                    <FoodThumbnailComponent key={food.id} foodDetail={food}/>
                                </Link>
                            </Col>
                        )
                    })
                }
            </Row>
        );
    }
};