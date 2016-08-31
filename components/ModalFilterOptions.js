import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';

import {defaultFilterOptions} from '../constants/StaticData';

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
                            <Row style={filterDropdownStyle}>
                                <FilterDropdown key={key} filterName={key} selectOptionList={defaultFilterOptions[key]}/>
                            </Row>
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
                <Col md={3}><label>{this.props.filterName}</label></Col>
                <Col md={9}>
                    <select className="form-control">
                        {
                            this.props.selectOptionList.map(function (option) {
                                return (
                                    <option key={option} value={option}>{option}</option>
                                )
                            })
                        }
                    </select>
                </Col>
            </div>
        )
    }
}

const filterDropdownStyle = {
    marginBottom:10
};

/**
 * Advanced Search Options
 */
export class AdvancedSearchOption extends React.Component {
    render() {
        return (
            <div>
                {
                    Object.keys(defaultFilterOptions).map(function(key){
                        return (
                            <Row>
                                <FilterCheckbox key={key} filterName={key} checkboxOptionList={defaultFilterOptions[key]}/>
                            </Row>
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
                <Col md={3}><label>{this.props.filterName}</label></Col>
                <Col md={9}>
                    <Panel>
                        {
                            this.props.checkboxOptionList.map(function (option) {
                                return (
                                    <input type="checkbox" key={option} value={option}> {option} &nbsp; </input>
                                )
                            })
                        }
                    </Panel>
                </Col>
            </div>
        )
    }
}