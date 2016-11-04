import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';

import {defaultFilterOptions, advancedFilterOptions} from '../constants/StaticData';
import FilterDropdown from './FilterDropdown';
import FilterCheckbox from './FilterCheckbox';

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

/**
 * Advanced Search Options
 */
export class AdvancedSearchOption extends React.Component {
    render() {
        const isAdmin = this.props.isAdmin;

        return (
            <div>
                {
                    Object.keys(advancedFilterOptions).map(function(key){
                        return (key=='Without' && isAdmin=="true")?null:<FilterCheckbox key={key} filterName={key} checkboxOptionList={advancedFilterOptions[key]}/>;
                    })
                }
            </div>
        );
    }
}