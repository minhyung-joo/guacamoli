import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import {defaultFilterOptions, advancedFilterOptions} from '../constants/StaticData';

/**
 * Default Search Option
 */
export class DefaultSearchOption extends React.Component {
    render() {
        return (
            <div>
                {
                    Object.keys(defaultFilterOptions).map(function(key){
                        return (
                            <FilterDropdown key={key} filterName={key} selectOptionList={defaultFilterOptions[key]}/>
                        )
                    })
                }
            </div>
        );
    }
}

class FilterDropdown extends React.Component {
    render() {
        return (
            <div>
                <Col md={3}><label style={style.label}>{this.props.filterName} :</label></Col>
                <Col md={3}>
                    <DropDownMenu value={"Default"}>
                        {
                            this.props.selectOptionList.map(function (option) {
                                return (
                                    <MenuItem value={option} primaryText={option} />
                                )
                            })
                        }
                    </DropDownMenu>
                </Col>
            </div>
        )
    }
}

/**
 * Advanced Search Options
 */
export class AdvancedSearchOption extends React.Component {
    render() {
        return (
            <div>
                {
                    Object.keys(advancedFilterOptions).map(function(key){
                        return (
                            <FilterCheckbox key={key} filterName={key} checkboxOptionList={advancedFilterOptions[key]}/>
                        )
                    })
                }
            </div>
        );
    }
}

class FilterCheckbox extends React.Component {
    render() {
        return (
            <div>
                <Col md={3}><label style={style.label}>{this.props.filterName} :</label></Col>
                <Col md={9}>
                    <Paper style={style.paper} zDepth={1}>
                        <Row>
                            {
                                this.props.checkboxOptionList.map(function (option) {
                                    return (
                                        <Col md={4}>
                                            <Checkbox
                                                label={option}
                                                style={style.checkbox}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Paper>
                </Col>
            </div>
        )
    }
}


const style = {
    paper:{
        width: '90%',
        margin: 20,
        paddingTop:15,
        textAlign: 'center',
        display: 'inline-block',
    },
    checkbox: {
        marginBottom: 16, width:20
    },
    label: {
        paddingTop:20
    },
    filterDropdown:{
        marginBottom:10
    }
};