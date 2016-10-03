import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {inputFilterOptions} from '../actions/uiActions';

class FilterDropdown extends React.Component {
    render() {
        const filtername = this.props.filterName;
        const selectFieldValue = this.props.filterOptions[filtername];

        return (
            <div>
                <Col md={3}><label style={styles.label}>{this.props.filterName} :</label></Col>
                <Col md={3}>
                    <SelectField value={selectFieldValue} onChange={(event, index, value)=>handleChange(value, filtername, this.props.inputFilterOptions)} style={styles.selectField}>
                        {
                            this.props.selectOptionList.map(function (option) {
                                return (
                                    <MenuItem value={option} primaryText={option} />
                                )
                            })
                        }
                    </SelectField>
                </Col>
            </div>
        )

        function handleChange(value,title, callback) {
            callback(title, value);
            console.log(value);
            console.log(title);
        }
    }
}

export default connect(
    state => ({
        filterOptions: state.uiStates.filterOptions,
    }),
    {
        inputFilterOptions
    }
)(FilterDropdown)

const styles = {
    label: {
        paddingTop:20
    },
    selectField: {
        width:160
    }
}