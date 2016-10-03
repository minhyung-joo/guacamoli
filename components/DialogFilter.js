import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


import {DefaultSearchOption, AdvancedSearchOption} from './DialogFilterOptions';
import {submitFilterSearch} from '../actions/uiActions';

class DialogFilter extends React.Component {
    render() {

        function onClickHandler(submitCallback){
            submitCallback();
        }

        const {isShow, onHide, isAdvancedFilter, onClickAdvanced} = this.props;


        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={onHide}
            />,
            <FlatButton
                label="Search"
                primary={true}
                onTouchTap={onHide}
                onClick={()=>onClickHandler(this.props.submitFilterSearch)}
            />,
        ];

        return (

            <div>
                <Dialog
                    title="Filter Search"
                    actions={actions}
                    modal={true}
                    open={isShow}
                    onRequestClose={onHide}
                    autoScrollBodyContent={true}
                >
                    <Row>
                        <DefaultSearchOption/>
                        <Col mdOffset={9}>
                            <Toggle
                                label="Advanced Filter"
                                labelPosition="right"
                                style={styles.toggle}
                                onToggle={onClickAdvanced}
                            />
                        </Col>
                        {
                            isAdvancedFilter?<AdvancedSearchOption />:null
                        }
                    </Row>
                </Dialog>
            </div>
        );

    }
}

export default connect(
    state=>({

    }),
    {
        submitFilterSearch
    }
)(DialogFilter)

const styles = {
    toggle:{
        paddingTop: 30,

    }
}