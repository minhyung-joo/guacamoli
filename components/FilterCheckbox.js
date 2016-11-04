import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import {inputFilterCheckboxOptions} from '../actions/uiActions';

class FilterCheckbox extends React.Component {
    render() {
        var self = this;
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
                                                onCheck={(event, isInputChecked)=>handleChange(option, isInputChecked, self.props.filterName, self.props.inputFilterCheckboxOptions)}
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
        inputFilterCheckboxOptions
    }
)(FilterCheckbox)

const style = {
    paper:{
        width: '100%',
        marginBottom: 20,
        paddingTop:15,
        textAlign: 'center',
        display: 'inline-block',
    },
    checkbox: {
        marginBottom: 16, width:20
    },
    filterDropdown:{
        marginBottom:10
    }
};