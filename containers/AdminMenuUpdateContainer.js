import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {AdminAdvancedSearchOption} from '../components/DialogFilterOptions';
import {chineseDeliverySpeed, chineseCuisineType} from '../constants/StaticData';
import {valueStringToIndexConverter} from '../constants/Utility';

import {inputSingleTextOption, inputSelectOption, loadUpdatePageData, adminResetInputOptions, identifyPageType} from '../actions/adminAction';
import {updateMenu, getAdminFoodDetail} from '../actions/adminMenuAction';

class AdminMenuUpdateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstTime:true,
            isChinese: false,
        };
    }

    componentWillMount(){
        const foodId = this.props.params.foodid;
        this.props.identifyPageType(foodId);

        this.props.getAdminFoodDetail(foodId);
    }

    componentWillUnmount(){
        //     this.props.identifyPageType("random")
    }

    render () {
        const {inputSingleTextOption, inputSelectOption, loadUpdatePageData,
            isFetching, foodDetail,
        } = this.props;
        const foodId = this.props.params.foodid;

        if(this.props.foodDetail!=null && this.state.isFirstTime){
            loadUpdatePageData(this.props.foodDetail);
            this.setState({isFirstTime:false});
        }

        var updateMenu = () => {
            var x = {
                "restaurant_name": this.props.restaurant,
                "name": this.props.mealName,
                "chineseMealName": this.props.mealNameChinese,
                "ingredientsDescription": this.props.ingredientDescription,
                "password": this.props.password,
                "price": this.props.price,

                "cuisineType": this.props.cuisineType,
                "deliverySpeed": this.props.deliverySpeed,
                //
                // "offeredTimes": valueStringToIndexConverter("offeredTimes",this.props.offeredTime),
                // "tasteTypes": valueStringToIndexConverter("tasteTypes",this.props.tasteType),
                // "foodTypes": valueStringToIndexConverter("foodTypes",this.props.ingredient),
                // "sauceTypes": valueStringToIndexConverter("sauceTypes", this.props.sauceType),
            };
            this.props.updateMenu(x);
        };

        return (
            <div>
                <Row>
                    <Col mdOffset={2} md={8}>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Meal Name (英文餐名)"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.mealName} onChange={(e)=>inputSingleTextOption("mealName",e.target.value)}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Chinese Name (中文餐名)"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.mealNameChinese} onChange={(e)=>inputSingleTextOption("mealNameChinese",e.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Price (價格)"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.price} onChange={(e)=>inputSingleTextOption("price",e.target.value)}/>
                            </Col>
                        </Row>

                        <Col mdOffset={3} md={9}>
                            <SelectRow label="Cuisine Type (菜品種類)" name="cuisineType" onChangeHandler={inputSelectOption} value={this.props.cuisineType} itemArray={chineseCuisineType}/>
                            <SelectRow label="Delivery Speed (上菜速度)" name="deliverySpeed" onChangeHandler={inputSelectOption} value={this.props.deliverySpeed} itemArray={chineseDeliverySpeed}/>
                        </Col>
                        <Row><AdminAdvancedSearchOption isAdmin={true} isChinese={false} /></Row>
                        <Row><IngredientTextarea label="Detailed Ingredients (詳細成分)" value={this.props.ingredientDescription} onChange={(e)=>inputSingleTextOption("ingredientDescription",e.target.value)} /></Row>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Password (密碼)"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.password} onChange={(e)=>inputSingleTextOption("password",e.target.value)}/>
                            </Col>
                        </Row>
                        <Row md={12} xs={12}>
                            <Col mdOffset={5} xsOffset={5}>
                                <RaisedButton label="Update (更新)" primary={true} style={styles.raisedButton} onClick={updateMenu}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}


function SelectRow(props){
    return (
        <Col md={6} xs={6}>
            <SelectField
                floatingLabelText={props.label}
                value={props.value}
                onChange={(event, index, value)=>props.onChangeHandler(value, props.name)}
                style={styles.selectRow} >
                {
                    props.itemArray.map(function(item, index){
                        return <MenuItem value={index} primaryText={item} />
                    })
                }
            </SelectField>
        </Col>
    )
}

function IngredientTextarea(props){
    return (
    <Row style={styles.textRow}>
        <Col md={3} xs={3}><label>{props.label}</label></Col>
        <Col md={9} xs={9}>
            <textarea className="form-control" value={props.value} onChange={props.onChange} />
        </Col>
    </Row>
    )
}

const styles ={
    textRow: {
      marginBottom:20
    },
    selectRow: {
        width:  "100%",
        marginBottom:15,
        marginTop:15
    },
    rating: {
        marginTop:30
    },
    label:{
        marginTop:15
    },
    raisedButton: {
        margin: 12,
        marginTop:22
    }
}

export default connect(
    state => ({
        foodDetail: state.adminMenu.foodDetail,
        isFetching: state.adminMenu.isFetching,

        mealName: state.admin.mealName,
        mealNameChinese: state.admin.mealNameChinese,
        price: state.admin.price,
        password: state.admin.password,
        ingredientDescription: state.admin.ingredientDescription,

        restaurant: state.admin.restaurant,
        cuisineType: state.admin.cuisineType,
        deliverySpeed: state.admin.deliverySpeed,

        offeredTime: state.admin.offeredTime,
        tasteType: state.admin.tasteType,
        ingredient: state.admin.ingredient,
        sauceType: state.admin.sauceType,
    }),
    {
        inputSingleTextOption, inputSelectOption, loadUpdatePageData, adminResetInputOptions, identifyPageType,
        updateMenu, getAdminFoodDetail
    }
)(AdminMenuUpdateContainer)