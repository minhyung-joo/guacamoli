import React from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList'
import {getFoodDetail} from '../actions/canteenActions';

class FoodDetailContainer extends React.Component {
    componentDidMount() {
        this.props.getFoodDetail(this.props.params.foodid);
        console.log(this.props.foodDetail);
    }

    constructor(props){
        super(props);
        this.state = {
            foodDetail: {
                price: 23,
                availability: 'lunch',
                restaurant: 'LG1',
                deliverySpeed: 'Ticket No.',
                cuisineType: 'Chinese',
                tasteType:'normal',
                ingredient:'seafood'
            }
        }
    }

    render() {
        return (
            <div style={foodDetailStyle}>
                <Row>
                    <Col mdOffset={1} md={10}>
                        <Panel header="FOOD DETAIL">
                            <Col md={6}>
                                <img width="100%" src="http://www.seriouseats.com/images/20110417-dim-sum-har-gau.jpg"/>
                            </Col>
                            <Col md={6}>
                                <Col md={12}>
                                    <h3>Shrimp dimsum</h3>
                                    <h5>Chinese name</h5>
                                </Col>
                                <Col md={12}><span><p> </p></span></Col>

                                <Col md={6}><b>Price</b>: {this.state.foodDetail.price} HKD</Col>
                                <Col md={6}><b>Availability</b>: {this.state.foodDetail.availability}</Col>
                                <Col md={6}><b>Restaurant</b>: {this.state.foodDetail.restaurant}</Col>
                                <Col md={6}><b>Delivery Speed</b>: {this.state.foodDetail.deliverySpeed}</Col>
                                <Col md={6}><b>Cuisine Type</b>: {this.state.foodDetail.cuisineType}</Col>
                                <Col md={6}><b>Taste Type</b>: {this.state.foodDetail.tasteType}</Col>
                                <Col md={6}><b>Ingredient Type</b>: {this.state.foodDetail.ingredient}</Col>
                            </Col>
                            <Col md={6}>
                                <Panel style={{marginTop:30}} header='Nutrition Information' bsStyle="success">
                                    Nutrition information
                                </Panel>
                            </Col>
                        </Panel>
                        <Panel header="FOOD RECOMMENDATION">
                            <FoodListComponent foodArray={foodArray}/>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        foodDetail: state.canteens.foodDetail
    }),
    {
        getFoodDetail
    }
)(FoodDetailContainer)


const foodArray=[
    {
        id: 1,
        imageUrl:"http://www.fastfoodmenunutrition.com/wp-content/uploads/2015/03/fast-food.jpg",
        foodName:"Hot Dog",
        price:35
    },
    {
        id: 2,
        imageUrl:"http://pngimg.com/upload/burger_sandwich_PNG4150.png",
        foodName:"Sandwich",
        price:25
    }
];

const foodDetailStyle ={ marginTop: 20};
