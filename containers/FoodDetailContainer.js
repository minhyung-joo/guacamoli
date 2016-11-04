import React from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList'
import {getFoodDetail} from '../actions/canteenActions';
import {availabilityMapper, tasteMapper, imageUrlMapper} from '../constants/Utility';
import {restaurantList, deliverySpeed, cuisineType} from '../constants/StaticData';
import StarRatingComponent from 'react-star-rating-component';


import RefreshIndicator from 'material-ui/RefreshIndicator';
import Paper from 'material-ui/Paper';

class FoodDetailContainer extends React.Component {
    componentDidMount() {
        this.props.getFoodDetail(this.props.params.foodid);
    }

    constructor(props){
        super(props);
    }

    render() {
        const {foodDetail, isFetching} = this.props;
        console.log("food detail");
        console.log(foodDetail);

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
            <div style={foodDetailStyle}>
                <Row>
                    <Col mdOffset={1} md={10}>
                        <Paper zDepth={1}>
                            <Panel header="FOOD DETAIL">
                                <Col md={6}>
                                    <img width="100%" src={foodDetail.picture_url}/>
                                </Col>
                                <Col md={6}>
                                    <Col md={12}>
                                        <h3>{foodDetail.name}</h3>
                                        <h5>{foodDetail.chinesename}</h5>
                                    </Col>
                                    <Col md={12}><span><p> </p></span></Col>

                                    <Col md={6}><b>Price</b>: {foodDetail.price} HKD</Col>
                                    <Col md={6}><b>Availability</b>: {availabilityMapper(foodDetail.offeredtimesid)}</Col>
                                    <Col md={6}><b>Restaurant</b>: {restaurantList[foodDetail.restaurantid]}</Col>
                                    <Col md={6}><b>Delivery Speed</b>: {deliverySpeed[foodDetail.deliveryspeedid]}</Col>
                                    <Col md={6}><b>Cuisine Type</b>: {cuisineType[foodDetail.cuisinetypeid]}</Col>
                                    <Col md={6}><b>Taste Type</b>: {tasteMapper(foodDetail.tastetypesid)}</Col>
                                    {/*<Col md={6}><b>Sauce Type</b>: {foodDetail.saucetypesid}</Col>*/}
                                    <Col md={12}><b>Ingredient Description</b>: {foodDetail.ingredientsdescription}</Col>
                                    <Col md={12}>
                                        <p><b>Rating:</b></p>
                                        <StarRatingComponent name="starRating" starCount={5} value={foodDetail.rating} />
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Panel style={{marginTop:30}} header='Nutrition Information' bsStyle="success">
                                        Coming Soon
                                    </Panel>
                                </Col>
                            </Panel>
                        </Paper>
                        <Paper>
                            <Panel header="FOOD RECOMMENDATION">
                                <FoodListComponent foodArray={foodArray}/>
                            </Panel>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        foodDetail: state.canteens.foodDetail,
        isFetching: state.canteens.isFetching
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
