/**
 * Created by nylee on 20/11/16.
 */
import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import {restaurantNameToIdMapper} from '../constants/Utility';
import {checkCanteenAuthentication,redirectListPage, redirectInsertPage} from '../actions/adminMenuAction'

class AdminMainContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            password: '',
            canteen: '',
            isAdd: false,
        }
    };

    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={()=>handleClose()}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={()=>handleSubmit()}
            />,
        ];

        var handleOpen = (canteenName, isAdd) => {
            this.setState({open: true, canteen: canteenName, isAdd: isAdd});
        };

        var handleClose = () => {
            this.setState({open: false});
        };

        var handleSubmit = () => {
            console.log(this.state.canteen + " " + this.state.password );
            this.props.checkCanteenAuthentication(this.state.canteen, this.state.password);
            handleClose();
        };

        console.log("auth status " + this.props.authStatus);
        if(this.state.isAdd && this.props.authStatus){  //  redirect to insert page
            this.props.redirectInsertPage(this.state.canteen, restaurantNameToIdMapper(this.state.canteen));
        }else if(!this.state.isAdd && this.props.authStatus){   //  redirect to list page
            this.props.redirectListPage(this.state.canteen, restaurantNameToIdMapper(this.state.canteen));
        }

        return (
            <div>
                <Row>
                    <Col mdOffset={1} md={10} style={styles.container}>
                        <Col md={3}>
                            <Panel header="LG1" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('lg1', true)}/>
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('lg1', false)}/>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="APC" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('apc', true)}/>
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('apc', false)}/>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="GRB" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('grb', true)}/>
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('grb', false)}/>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="Milano" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('milano', true)}/>
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen('milano', false)}/>
                            </Panel>
                        </Col>




                    </Col>
                </Row>
                <Dialog
                    title="Enter Password"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                >
                    <TextField fullWidth={true} value={this.props.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                </Dialog>
            </div>
        );
    }
}

export default connect(
    state => ({
        authStatus: state.adminMenu.authStatus,
    }),
    {
        checkCanteenAuthentication, redirectListPage, redirectInsertPage
    }
)(AdminMainContainer)

const styles ={
    container:{
        paddingTop:180
    },
    raisedButton: {
        margin:10,
        padding:10
    }
}