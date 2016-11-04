import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {DefaultSearchOption, AdvancedSearchOption} from '../components/DialogFilterOptions';
import {restaurantList, deliverySpeed, cuisineType, offeredTime} from '../constants/StaticData';

const ratingArray = ['Please select one', 1,2,3,4,5];

class AdminMenuInsertContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: 0,
            cuisine: 0,
            delivery: 0,
            offered: 0,
            rating:0,
        };
    }

    render () {
        var self = this;

        function onChangeHandler(value, name){
            var temp = {};
            temp[name] = value;
            self.setState(temp);
        }

        return (
            <div>
                <Row>

                    <Col mdOffset={2} md={8}>
                        <InsertTextRow label="Meal Name *"/>
                        <InsertTextRow label="Meal Name (Chinese)"/>
                        <InsertTextRow label="Category (if any)"/>
                        <InsertTextRow label="Price"/>

                        <Col md={3}><label style={styles.label}>Details:</label></Col>
                        <Col md={9}>
                            <SelectRow label="Restaurant" name="restaurant" onChangeHandler={onChangeHandler} value={this.state.restaurant} itemArray={restaurantList}/>
                            <SelectRow label="Cuisine Type" name="cuisine" onChangeHandler={onChangeHandler} value={this.state.cuisine} itemArray={cuisineType}/>
                            <SelectRow label="Offered Time" name="offered" onChangeHandler={onChangeHandler} value={this.state.delivery} itemArray={deliverySpeed}/>
                            <SelectRow label="Delivery Speed" name="delivery" onChangeHandler={onChangeHandler} value={this.state.offered} itemArray={offeredTime}/>
                        </Col>

                        <AdvancedSearchOption isAdmin="true"/>
                        <IngredientTextarea label="Detailed Ingredients"/>
                        <Col md={3}><label style={styles.label}>Rating:</label></Col>
                        <Col md={9}><SelectRow label="" name="rating" onChangeHandler={onChangeHandler} value={this.state.rating} itemArray={ratingArray}/></Col>

                    </Col>
                </Row>
            </div>
        );
    }
}

function InsertTextRow(props){
    return (
        <div>
            <Col md={3} xs={3}><label style={styles.label}>{props.label} :</label></Col>
            <Col md={9} xs={9}>
                <TextField fullWidth="true" style={styles.textRow} />
            </Col>
        </div>
    )
}

function SelectRow(props){
    return (
        <Col md={6}>
            <SelectField
                floatingLabelText={props.label}
                value={props.value}
                onChange={(event, index, value)=>props.onChangeHandler(value, props.name)}
                style={styles.selectRow}
            >
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
    <div>
        <Col md={3} xs={3}><label>{props.label} :</label></Col>
        <Col md={9} xs={9}>
            <textarea className="form-control"></textarea>
        </Col>
    </div>
    )
}

const styles ={
    textRow: {
      marginBottom:10
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
    }
}

export default connect(
    state => ({
        rankingResults: state.canteens.rankingResults,
        isFetching: state.canteens.isFetching,
    }),
    {
    }
)(AdminMenuInsertContainer)