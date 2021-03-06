import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import {inputFilterCheckboxOptions} from '../actions/uiActions';
import {adminInputFilterCheckboxOptions} from '../actions/adminAction';

class FilterCheckbox extends React.Component {
    render() {
        var self = this;
        var callbackFunction;
        if(this.props.isAdmin){
            callbackFunction = this.props.adminInputFilterCheckboxOptions;
        }
        else{
            callbackFunction = this.props.inputFilterCheckboxOptions;
        }

        return (
            <div>
                <Col md={3}><label style={style.label}>{this.props.filterName} :</label></Col>
                <Col md={9}>
                    <Paper style={style.paper} zDepth={1}>
                        <Row>
                            {
                            this.props.checkboxOptionList.map(function (option) {
                                return (
                                    <Col md={4} xs={4}>
                                        <Checkbox
                                            label={option}
                                            style={style.checkbox}
                                            onCheck={(event, isInputChecked)=>handleChange(option, isInputChecked, self.props.filterName, callbackFunction)}
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

        function handleChange(option, isChecked, filterName, callback) {
            callback(filterName, option, isChecked);
        }
    }
}

export default connect(
    state => ({
        filterOptions: state.uiStates.filterOptions,
    }),
    {
        inputFilterCheckboxOptions, adminInputFilterCheckboxOptions
    }
)(FilterCheckbox)

const style = {
    paper:{
        width: '100%',
        marginBottom: 20,
        paddingTop: 15,
        textAlign: 'center',
        display: 'inline-block',
        padding: 20
    },
    checkbox: {
        marginBottom: 16, width: '100%', textAlign: 'left'
    },
    filterDropdown:{
        marginBottom: 10
    }
};