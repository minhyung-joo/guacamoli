import React from 'react';
import {Thumbnail, Button} from 'react-bootstrap';

export default class FoodThumbnailComponent extends React.Component {
    render() {
        const food = this.props.foodDetail;
        return (
            <Thumbnail>
                <div>
                    <img src={food.image_url} height="175" width="100%"/>
                    <h4>{food.name}</h4>
                    <p>{food.price} HKD</p>
                </div>
            </Thumbnail>
        );
    }
};