import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import {AdminAdvancedSearchOption} from '../components/DialogFilterOptions';
import {chineseDeliverySpeed, chineseCuisineType, boolOptions} from '../constants/StaticData';
import {valueStringToIndexConverter} from '../constants/Utility';

import {inputSingleTextOption, inputSelectOption, inputNutritionOption, loadUpdatePageData, adminResetInputOptions, identifyPageType} from '../actions/adminAction';
import {updateMenu, getAdminFoodDetail, dismissSuccessModal} from '../actions/adminMenuAction';

class AdminMenuUpdateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstTime:true,
            isChinese: false,
            isSuccess: false,
        };
    }

    componentWillMount(){
        const foodId = this.props.params.foodid;
        this.props.identifyPageType(foodId);

        this.props.getAdminFoodDetail(foodId);
    }

    render () {
        const {inputSingleTextOption, inputSelectOption, inputNutritionOption, loadUpdatePageData,
            isFetching, foodDetail,
        } = this.props;
        const foodId = this.props.params.foodid;
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={()=>this.props.dismissSuccessModal()}
            />,
        ];

        if(this.props.foodDetail!=null && this.state.isFirstTime){
            loadUpdatePageData(this.props.foodDetail);
            this.setState({isFirstTime:false});
        }

        if(this.props.isUpdateSuccess && this.state.isFirstTime){
            loadUpdatePageData(this.props.foodDetail);
            this.setState({isFirstTime:false});
        }

        var updateMenu = () => {
            var x = {
                "menuId": foodId,
                "restaurant_name": this.props.restaurant,
                "name": this.props.mealName,
                "chineseMealName": this.props.mealNameChinese,
                "ingredientsDescription": this.props.ingredientsDescription,
                "nutritionInformation": this.props.nutritionInformation,
                "password": this.props.password,
                "price": this.props.price,

                "cuisineType": this.props.cuisineType,
                "deliverySpeed": this.props.deliverySpeed,

                "offeredTimes": this.props.offeredTime,
                "tasteTypes": this.props.tasteType,
                "ingredienttypesid": this.props.ingredient,
                "sauceTypes": this.props.sauceType,
                // "offeredTimes": valueStringToIndexConverter("offeredTimes",this.props.offeredTime),
                // "tasteTypes": valueStringToIndexConverter("tasteTypes",this.props.tasteType),
                // "ingredienttypesid": valueStringToIndexConverter("ingredientTypes",this.props.ingredient),
                // "sauceTypes": valueStringToIndexConverter("sauceTypes", this.props.sauceType),
            };
            this.props.updateMenu(x);
        };

        console.log(this.props.nutritionInformation);
        console.log(this.props.nutritionInformation.calories);
        console.log(this.props.nutritionInformation.protein);

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

                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Details"}</label></Col>
                            <Col mdOffset={3} md={9}>
                                <SelectRow label="Cuisine Type (菜品種類)" name="cuisineType" onChangeHandler={inputSelectOption} value={this.props.cuisineType} itemArray={chineseCuisineType}/>
                                <SelectRow label="Delivery Speed (上菜速度)" name="deliverySpeed" onChangeHandler={inputSelectOption} value={this.props.deliverySpeed} itemArray={chineseDeliverySpeed}/>
                            </Col>
                        </Row>
                        {/*<Row><AdminAdvancedSearchOption isAdmin={true} isChinese={false} /></Row>*/}
                        {/*<Row><IngredientTextarea label="Detailed Ingredients (詳細成分)" value={this.props.ingredientsDescription} onChange={(e)=>inputSingleTextOption("ingredientsDescription",e.target.value)} /></Row>*/}

                        {
                            this.props.nutritionInformation!=null?
                                <div>
                                    <Row>
                                        <Col md={3} xs={3}><label style={styles.label}>{"Nutrition"}</label></Col>
                                        <Col md={9} xs={9}>
                                            <NutritionInfoTextarea label={"calories"} value={this.props.nutritionInformation.calories} onChange={(e)=>{inputNutritionOption("calories", e.target.value)}}/>
                                            <NutritionInfoTextarea label={"carbohydrate"} value={this.props.nutritionInformation.carbohydrate} onChange={(e)=>{inputNutritionOption("carbohydrate", e.target.value)}}/>
                                            <NutritionInfoTextarea label={"protein"} value={this.props.nutritionInformation.protein} onChange={(e)=>{inputNutritionOption("protein", e.target.value)}}/>
                                            <NutritionInfoTextarea label={"fat"} value={this.props.nutritionInformation.fat} onChange={(e)=>{inputNutritionOption("fat", e.target.value)}}/>
                                            <NutritionInfoTextarea label={"fibre"} value={this.props.nutritionInformation.fibre} onChange={(e)=>{inputNutritionOption("fibre", e.target.value)}}/>
                                            <NutritionInfoTextarea label={"sugar"} value={this.props.nutritionInformation.sugar} onChange={(e)=>{inputNutritionOption("sugar", e.target.value)}}/>
                                            <NutritionInfoTextarea label={"sodium"} value={this.props.nutritionInformation.sodium} onChange={(e)=>{inputNutritionOption("sodium", e.target.value)}}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3} xs={3}><label style={styles.label}>{"Nutrition Label"}</label></Col>
                                        <Col md={9} xs={9}>
                                            <SelectRowNutrition label="W" name="W" onChangeHandler={inputNutritionOption} value={this.props.nutritionInformation.W} itemArray={boolOptions}/>
                                            <SelectRowNutrition label="M" name="M" onChangeHandler={inputNutritionOption} value={this.props.nutritionInformation.M} itemArray={boolOptions}/>
                                            <SelectRowNutrition label="I" name="I" onChangeHandler={inputNutritionOption} value={this.props.nutritionInformation.I} itemArray={boolOptions}/>
                                            <SelectRowNutrition label="E" name="E" onChangeHandler={inputNutritionOption} value={this.props.nutritionInformation.E} itemArray={boolOptions}/>
                                            <SelectRowNutrition label="H" name="H" onChangeHandler={inputNutritionOption} value={this.props.nutritionInformation.H} itemArray={boolOptions}/>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                null
                        }

                        <IngredientTextarea label="Detailed Ingredients (詳細成分)" value={this.props.ingredientsDescription} onChange={(e)=>inputSingleTextOption("ingredientsDescription",e.target.value)} />
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
                <Dialog
                    title="Confirmation Message"
                    actions={actions}
                    modal={false}
                    open={this.props.isUpdateSuccess}
                >
                    <p> Successfully updated <b>"{this.props.mealName}"</b> from the menu list. </p>
                </Dialog>
            </div>
        );
    }
}

function SelectRow(props){
    return (
        <Col md={6}>
            <SelectField
                floatingLabelText={props.label}
                value={props.value}
                onChange={(event, index, value)=>props.onChangeHandler(props.name, value)}
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

function SelectRowNutrition(props){
    return (
        <Col md={4} xs={4}>
            <SelectField
                floatingLabelText={props.label}
                value={props.value}
                onChange={(event, index, value)=>props.onChangeHandler(props.name, value)}
                style={styles.selectRow} >
                {
                    props.itemArray.map(function(item, index){
                        return <MenuItem value={item} primaryText={item.toString()} />
                    })
                }
            </SelectField>
        </Col>
    )
}

function NutritionInfoTextarea(props){
    let labelSize = 4;
    let textSize = 8;
    let wrapperSize = 4;//props.label=='carbohydrate'?6:4;
    return (
    <Col md={wrapperSize} xs={wrapperSize} style={styles.textRow}>
        <Col md={labelSize} xs={labelSize}><label>{props.label}: </label></Col>
        <Col md={textSize} xs={textSize}>
            <TextField value={props.value} fullWidth="true" style={styles.textRow} onChange={props.onChange} />
        </Col>
    </Col>
    )
}

function IngredientTextarea(props){
    return (
        <Row style={styles.textRow}>
            <Col md={3} xs={3}><label>{props.label} :</label></Col>
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
        ingredientsDescription: state.admin.ingredientsDescription,
        nutritionInformation: state.admin.nutritionInformation,

        restaurant: state.admin.restaurant,
        cuisineType: state.admin.cuisineType,
        deliverySpeed: state.admin.deliverySpeed,

        offeredTime: state.admin.offeredTime,
        tasteType: state.admin.tasteType,
        ingredient: state.admin.ingredient,
        sauceType: state.admin.sauceType,

        isUpdateSuccess: state.adminMenu.isUpdateSuccess,
    }),
    {
        inputSingleTextOption, inputSelectOption, inputNutritionOption, loadUpdatePageData, adminResetInputOptions, identifyPageType,
        updateMenu, getAdminFoodDetail, dismissSuccessModal
    }
)(AdminMenuUpdateContainer)