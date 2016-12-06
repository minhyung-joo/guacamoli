import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DropzoneComponent from 'react-dropzone-component';

import {AdvancedSearchOption} from '../components/DialogFilterOptions';
import {restaurantList, deliverySpeed, cuisineType, advancedFilterOptions} from '../constants/StaticData';

import {inputSingleTextOption, inputSelectOption, loadUpdatePageData, adminResetInputOptions} from '../actions/adminAction';
import {updateMenu, getAdminFoodDetail} from '../actions/adminMenuAction';
const ratingArray = ['Please select one', 1,2,3,4,5];

var filepickerCSS = require('react-dropzone-component/styles/filepicker.css');
var dropzoneCSS = require('dropzone/dist/min/dropzone.min.css');

class AdminMenuInsertContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            showImageUploadBox:false,
        };

        this.djsConfig = {
            autoProcessQueue: false,
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            params: {lala:"testing"}
        }

        this.componentConfig = {
            postUrl: 'uploadHandler',
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
        };

        this.myDropzone;
        this.eventHandlers = {
            init: (dropzone) => {this.myDropzone = dropzone},
            addedfile: (file) => console.log(file)
        }

    }

    componentWillMount(){
        this.props.adminResetInputOptions();
        const foodId = this.props.params.foodid;
        if(foodId != null){
            this.props.getAdminFoodDetail(foodId);
        }
    }

    render () {
        const {inputSingleTextOption, inputSelectOption, loadUpdatePageData,
            isFetching, foodDetail,
        } = this.props;
        const foodId = this.props.params.foodid;

        var valueStringToIndexConverter = (title, valueArray) =>{
            var resultArray = [];
            if(valueArray.length > 0) {
                switch (title) {
                    case 'offeredTimes':
                        valueArray.map(function (option) {
                            resultArray.push(advancedFilterOptions["Offered Time"].indexOf(option) + 1);
                        });
                        break;
                    case 'tasteTypes':
                        valueArray.map(function (option) {
                            resultArray.push(advancedFilterOptions["Taste Type"].indexOf(option) + 1);
                        });
                        break;
                    case 'foodTypes':
                        valueArray.map(function (option) {
                            resultArray.push(advancedFilterOptions["Ingredients"].indexOf(option) + 1);
                        });
                        break;
                    case 'sauceTypes':
                        valueArray.map(function (option) {
                            resultArray.push(advancedFilterOptions["Sauce Type"].indexOf(option) + 1);
                        });
                        break;
                }
            }
            return resultArray;
        }
        var extractUserInputAsParam = () => {
            this.setState({showImageUploadBox:true});
            var x = {
                "restaurant_name": this.props.restaurant,
                "name": this.props.mealName,
                "chineseMealName": this.props.mealNameChinese,
                "ingredientsDescription": this.props.ingredientDescription,
                "password": this.props.password,
                "price": this.props.price,

                "cuisineType": this.props.cuisineType,
                "deliverySpeed": this.props.deliverySpeed,

                "offeredTimes": valueStringToIndexConverter("offeredTimes",this.props.offeredTime),
                "tasteTypes": valueStringToIndexConverter("tasteTypes",this.props.tasteType),
                "foodTypes": valueStringToIndexConverter("foodTypes",this.props.ingredient),
                "sauceTypes": valueStringToIndexConverter("sauceTypes", this.props.sauceType),
            };

            this.djsConfig.params = x;
        }

        var postAndResetInputOptions = () => {
            this.myDropzone.processQueue();
            this.props.adminResetInputOptions();
            alert("Menu creation was successful");
        };

        var updateMenu = () => {
            this.props.updateMenu();
            alert("Menu update was successful");
            // TODO ideally move back
        };

        if(foodDetail!=null && !isFetching){
            loadUpdatePageData(foodDetail);
        }

        return (
            <div>
                <Row>
                    <Col mdOffset={2} md={8}>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Meal Name *:"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.mealName} onChange={(e)=>inputSingleTextOption("mealName",e.target.value)}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Meal Name Chinese:"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.mealNameChinese} onChange={(e)=>inputSingleTextOption("mealNameChinese",e.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Price:"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.price} onChange={(e)=>inputSingleTextOption("price",e.target.value)}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={3}><label style={styles.label}>Details:</label></Col>
                            <Col md={9}>
                                <SelectRow label="Restaurant" name="restaurant" onChangeHandler={inputSelectOption} value={this.props.restaurant} itemArray={restaurantList}/>
                                <SelectRow label="Cuisine Type" name="cuisineType" onChangeHandler={inputSelectOption} value={this.props.cuisineType} itemArray={cuisineType}/>
                                <SelectRow label="Delivery Speed" name="deliverySpeed" onChangeHandler={inputSelectOption} value={this.props.deliverySpeed} itemArray={deliverySpeed}/>
                            </Col>
                        </Row>
                        {
                            foodId==null?
                                <Row><AdvancedSearchOption isAdmin={true}/></Row>
                                :null
                        }

                        <Row><IngredientTextarea label="Detailed Ingredients" value={this.props.ingredientDescription} onChange={(e)=>inputSingleTextOption("ingredientDescription",e.target.value)} /></Row>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Password:"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.password} onChange={(e)=>inputSingleTextOption("password",e.target.value)}/>
                            </Col>
                        </Row>
                        {
                            foodId==null?
                                <Row>
                                    <DropzoneComponent config={this.componentConfig} eventHandlers={this.eventHandlers} djsConfig={this.djsConfig} />
                                </Row>:null
                        }
                    </Col>
                </Row>

                {
                    foodId==null?
                        <Row md={12}>
                            <Col mdOffset={5} xsOffset={5}>
                                <RaisedButton label="Add Menu" primary={true} style={styles.raisedButton} onMouseDown={extractUserInputAsParam} onMouseUp={postAndResetInputOptions} />
                            </Col>
                        </Row>
                        :
                        <Row md={12} xs={12}>
                            <Col mdOffset={5} xsOffset={5}>
                                <RaisedButton label="Update Menu" primary={true} style={styles.raisedButton} onClick={updateMenu}/>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}


function SelectRow(props){
    return (
        <Col md={4}>
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
        inputSingleTextOption, inputSelectOption, loadUpdatePageData, adminResetInputOptions,
        updateMenu, getAdminFoodDetail
    }
)(AdminMenuInsertContainer)