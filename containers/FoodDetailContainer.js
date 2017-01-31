import React from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Panel, OverlayTrigger, Popover} from 'react-bootstrap';

import FoodListComponent from '../components/FoodList'
import {getFoodDetail} from '../actions/canteenActions';
import {availabilityMapper, tasteMapper, imageUrlMapper, nutritionColorLabeller} from '../constants/Utility';
import {restaurantList, deliverySpeed, cuisineType, averageIntake} from '../constants/StaticData';
import StarRatingComponent from 'react-star-rating-component';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import {lightGreen200} from 'material-ui/styles/colors';

import Info from 'material-ui/svg-icons/action/info-outline';

var _ = require('underscore');

class FoodDetailContainer extends React.Component {
    componentWillMount() {
        console.log(this.props.params.foodid);
        this.props.getFoodDetail(this.props.params.foodid);
    }

    constructor(props){
        super(props);
    }

    render() {
        const {foodDetail, isFetching} = this.props;
        var nutritionInfo;
        let tagArray = [];

        if(foodDetail.nutritioninformation!=null){
            nutritionInfo = JSON.parse(foodDetail.nutritioninformation);
            if(nutritionInfo.W)
                tagArray.push('Weight Loss');
            if(nutritionInfo.M)
                tagArray.push('Muscle Gain');
            if(nutritionInfo.I)
                tagArray.push('Immunity Enhancement');
            if(nutritionInfo.H)
                tagArray.push('Heart Health');
            if(nutritionInfo.E)
                tagArray.push('Energy Giving');

            console.log(tagArray);
        }

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
            <div style={styles.foodDetailStyle}>
                <Row>
                    <Col mdOffset={1} md={10}>
                        <Paper zDepth={1}>
                            <Panel header="FOOD DETAIL">
                                <Col md={6}>
                                    <img width="100%" style={{marginTop:70}} src={imageUrlMapper(foodDetail.picture_url, true)}/>
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
                                    <Col md={12}>
                                        <p>
                                            <b>Nutrition Information</b> <font style={{fontSize: 12}}>authorized by TetraHK </font>
                                            <OverlayTrigger trigger="click" placement="right" overlay={nutritionInfoUsage}>
                                                <Info style={{height:'18px', width: '18px'}} />
                                            </OverlayTrigger>
                                        </p>

                                        <Col md={11} xs={11} style={{paddingLeft:0}}>
                                            <Col md={2} xs={2} style={{paddingLeft:0}}>
                                                <IngredientDisplay label={'Calories'} value={nutritionInfo.calories} unit={'kcal'} averageTotalIntake={averageIntake.calories}/>
                                            </Col>
                                            <Col md={8} xs={10}>
                                                <IngredientDisplay label={'Carbohydrate'} value={nutritionInfo.carbohydrate} color={'red'} unit={'g'} averageTotalIntake={averageIntake.carbohydrates}/>
                                                <IngredientDisplay label={'Protein'} value={nutritionInfo.protein} color={'orange'} unit={'g'} averageTotalIntake={averageIntake.protein}/>
                                                <IngredientDisplay label={'Fat'} value={nutritionInfo.fat} color={'green'} unit={'g'} averageTotalIntake={averageIntake.fat}/>
                                                <IngredientDisplay label={'Fibre'} value={nutritionInfo.fibre} color={'green'} unit={'g'} averageTotalIntake={averageIntake.fibre} />
                                                <IngredientDisplay label={'Sugar'} value={nutritionInfo.sugar} color={'orange'} unit={'g'} averageTotalIntake={averageIntake.sugar} />
                                                <IngredientDisplay label={'Sodium'} value={nutritionInfo.sodium} color={'red'} unit={'mg'} averageTotalIntake={averageIntake.sodium} />
                                            </Col>
                                        </Col>
                                    </Col>
                                        <Col md={12} xs={12} style={{marginTop:10}}>
                                            <p>
                                                <b>Health Labels </b>
                                                <OverlayTrigger trigger="click" placement="top" overlay={healthLabel}>
                                                    <Info style={{height:'18px', width: '18px'}} />
                                                </OverlayTrigger>
                                            </p>
                                            <Col md={12} xs={12} style={{paddingLeft:0}}>
                                                {
                                                    tagArray.map(function(tagContent){
                                                        return (
                                                            <Chip backgroundColor={lightGreen200} style={styles.chip}>
                                                                {tagContent}
                                                            </Chip>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Col>
                                </Col>
                            </Panel>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}

function IngredientDisplay(props){
    console.warn(props.value/props.averageTotalIntake);
    if(props.label=='Calories'){
        return (
            <div style={styles.caloriesCircle}>
                <p style={styles.label}>{props.label}</p>
                <p style={styles.unitLabel}>{props.unit}</p>
                <div style={styles.innerCircle}>
                    <b style={styles.value}>{props.value}</b>
                    <font style={styles.value}>{Math.round(props.value/props.averageTotalIntake*100)} %</font>
                </div>
            </div>
        )

    }else{
        const red = '#DC352A', orange = '#EFAB34', green = '#8EC047';
        const percentageVal = Math.round(props.value/ props.averageTotalIntake *100);
        
        var newStyle = _.extend({},styles.outerCircle);
        newStyle['backgroundColor'] = nutritionColorLabeller(props.label, percentageVal);//props.color=='red'?red:props.color=='orange'? orange: green;

        return (
            <div style={newStyle}>
                <p style={styles.label}>{props.label}</p>
                <p style={styles.unitLabel}>{props.unit}</p>
                <div style={styles.innerCircle}>
                    <b style={styles.value}>{props.value}</b>
                    <font style={styles.value}>{percentageVal} %</font>
                </div>
            </div>
        )
    }
}

const nutritionInfoUsage = (
    <Popover id="popover-positioned-top" title="Nutrition Info Guide">
        <p>Based on the recommended daily intake to achieve balanced and healthy diet for an average adult, we color labeled each nutrient. </p>
        <p>What do the colors mean?</p>
        <p><strong>RED</strong>: It’s fine to have this occasionally, or in small amounts, just make sure you don’t have these products too often.</p>
        <p><strong>ORANGE</strong>: The product is neither high nor low in this nutrient, so it’s an OK choice most of the time.</p>
        <p><strong>GREEN</strong>: The more green lights, the healthier the choice. </p>
        {/*<p>(*) http://www.mydailyintake.net/daily-intake-levels/</p>*/}
    </Popover>
);

const healthLabel = (
    <Popover id="popover-positioned-top2" title="Health Label Guide">
        <p><b>Health category labels classified by a group of professional Nutritionists (TetraHK).</b></p>
        <p>5 labels: Weight Loss, Muscle Gain, Immunity Enhancement, Heart Health, Energy Giving</p>
    </Popover>
);

export default connect(
    state => ({
        foodDetail: state.canteens.foodDetail,
        isFetching: state.canteens.isFetching
    }),
    {
        getFoodDetail
    }
)(FoodDetailContainer)



const styles = {
    chip: {
        marginRight: 2,
        display: 'inline-block',
    },
    outerCircle: {
        width: 70,
        height: 70,
        borderRadius: 30/2,
        textAlign: 'center',
        display: 'inline-block'
    },
    label: {
        paddingTop: 5,
        marginBottom: 0,
        color: 'black',
        fontSize: '10px',
        fontWeight: 'bold',
    },
    unitLabel: {
        marginTop: -2,
        marginBottom: 3,
        color: 'black',
        fontSize: '10px',
    },
    innerCircle: {
        marginLeft:5,
        width: 60,
        height: 30,
        borderRadius: 20/2,
        backgroundColor: 'white',
        textAlign: 'center'
    },
    value: {
        fontSize: '10px',
        paddingTop: 10,
        display: 'block',
        padding:0,
    },
    caloriesCircle: {
        marginTop: 30,
        width: 70,
        height: 70,
        borderRadius: 30/2,
        textAlign: 'center',
        display: 'inline-block',
        backgroundColor: '#D3D3D3'
    },
    foodDetailStyle: {
        marginTop: 20
    }
}