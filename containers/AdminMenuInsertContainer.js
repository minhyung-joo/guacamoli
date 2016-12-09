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
import {deliverySpeed, cuisineType, advancedFilterOptions} from '../constants/StaticData';
import {valueStringToIndexConverter} from '../constants/Utility';

import {inputSingleTextOption, inputSelectOption, adminResetInputOptions} from '../actions/adminAction';
import {updateMenu, getAdminFoodDetail} from '../actions/adminMenuAction';

var filepickerCSS = require('react-dropzone-component/styles/filepicker.css');
var dropzoneCSS = require('dropzone/dist/min/dropzone.min.css');

class AdminMenuInsertContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReadyForImage: false
        }

        this.djsConfig = {
            autoProcessQueue: false,
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            params: {}
        }

        this.componentConfig = {
            postUrl: 'uploadHandler',
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
        };

        this.myDropzone;
        this.eventHandlers = {
            init: (dropzone) => {this.myDropzone = dropzone},
            complete: (file) => { if (this.myDropzone) {this.myDropzone.removeFile(file)} }
    }
    }

    componentWillMount(){
        this.props.adminResetInputOptions();
    }

    render () {
        const {inputSingleTextOption, inputSelectOption,
        } = this.props;

        var extractUserInputAsParam = () => {
            var x = {
                "restaurant_name": this.props.params.canteenid,
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

        var readyForImage = () => {
            extractUserInputAsParam();
            this.setState({isReadyForImage:true});
        }
        var resetFunction = () => {
            this.props.adminResetInputOptions();
        }

        var postAndResetInputOptions = () => {
            this.myDropzone.processQueue();
            cancelFunction();
        };
        var cancelFunction = () => {
            this.props.adminResetInputOptions();
            this.setState({isReadyForImage:false});
        }

        return (
            <div>
                <Row>
                    <Col mdOffset={2} md={8} xsOffset={2} xs={8}>
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
                            <Col md={3}><label style={styles.label}>Details:</label></Col>
                            <Col md={9}>
                                <SelectRow label="Cuisine Type (菜品種類)" name="cuisineType" onChangeHandler={inputSelectOption} value={this.props.cuisineType} itemArray={cuisineType}/>
                                <SelectRow label="Delivery Speed (上菜速度)" name="deliverySpeed" onChangeHandler={inputSelectOption} value={this.props.deliverySpeed} itemArray={deliverySpeed}/>
                            </Col>
                        </Row>
                        <Row><AdvancedSearchOption isAdmin={true} /></Row>
                        <Row><IngredientTextarea label="Detailed Ingredients (詳細成分)" value={this.props.ingredientDescription} onChange={(e)=>inputSingleTextOption("ingredientDescription",e.target.value)} /></Row>
                        <Row>
                            <Col md={3} xs={3}><label style={styles.label}>{"Password (密碼)"}</label></Col>
                            <Col md={9} xs={9}>
                                <TextField fullWidth="true" style={styles.textRow} value={this.props.password} onChange={(e)=>inputSingleTextOption("password",e.target.value)}/>
                            </Col>
                        </Row>
                        {
                            this.state.isReadyForImage?
                                <Row>
                                    <DropzoneComponent config={this.componentConfig} eventHandlers={this.eventHandlers} djsConfig={this.djsConfig} />
                                </Row>:null
                        }

                    </Col>
                </Row>
                <Row md={12}>
                    {
                        !this.state.isReadyForImage?
                            <Col mdOffset={5} xsOffset={5}>
                                <RaisedButton label="Upload Image 上傳圖片" primary={true} style={styles.raisedButton} onMouseDown={readyForImage} />
                                <RaisedButton label="Reset 重設" primary={true} style={styles.raisedButton} onClick={resetFunction} />
                            </Col>
                            :
                            <Col mdOffset={5} xsOffset={5}>
                                <RaisedButton label="Create Menu 創建菜單" primary={true} style={styles.raisedButton} onMouseDown={postAndResetInputOptions} />
                                <RaisedButton label="Cancel 取消" primary={true} style={styles.raisedButton} onClick={cancelFunction}/>
                            </Col>
                    }
                </Row>
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
        marginTop:20
    },
    raisedButton: {
        margin: 12,
        marginTop:22
    }
}

export default connect(
    state => ({
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
        inputSingleTextOption, inputSelectOption, adminResetInputOptions,
        updateMenu, getAdminFoodDetail
    }
)(AdminMenuInsertContainer)