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

class AdminMainContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            password: '',
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

        var handleOpen = (canteenName) => {
            this.setState({open: true});
        };

        var handleClose = () => {
            this.setState({open: false});
        };

        var handleSubmit = () => {
            console.log(this.state.password);
            handleClose();
        }

        return (
            <div>
                <Row>
                    <Col mdOffset={1} md={10} style={styles.container}>
                        {/*<Col md={3}>*/}
                            {/*<Panel header="LG1" bsStyle="success">*/}
                                {/*<LinkContainer to="/lg1/menu_insert/1">*/}
                                    {/*<RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                                {/*<LinkContainer to="/lg1/menu_list/1">*/}
                                    {/*<RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                            {/*</Panel>*/}
                        {/*</Col>*/}
                        {/*<Col md={3}>*/}
                            {/*<Panel header="APC" bsStyle="success">*/}
                                {/*<LinkContainer to="/apc/menu_insert/4">*/}
                                    {/*<RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                                {/*<LinkContainer to="/apc/menu_list/4">*/}
                                    {/*<RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                            {/*</Panel>*/}
                        {/*</Col>*/}
                        {/*<Col md={3}>*/}
                            {/*<Panel header="GRB" bsStyle="success">*/}
                                {/*<LinkContainer to="/grb/menu_insert/3">*/}
                                    {/*<RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                                {/*<LinkContainer to="/grb/menu_list/3">*/}
                                    {/*<RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                            {/*</Panel>*/}
                        {/*</Col>*/}
                        {/*<Col md={3}>*/}
                            {/*<Panel header="Milano" bsStyle="success">*/}
                                {/*<LinkContainer to="/milano/menu_insert/5">*/}
                                    {/*<RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                                {/*<LinkContainer to="/milano/menu_list/5">*/}
                                    {/*<RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />*/}
                                {/*</LinkContainer>*/}
                            {/*</Panel>*/}
                        {/*</Col>*/}
                        <Col md={3}>
                            <Panel header="LG1" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen()}/>
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} onClick={()=>handleOpen()}/>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="APC" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="GRB" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="Milano" bsStyle="success">
                                <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
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

    }),
    {
    }
)(AdminMainContainer)

const styles ={
    container:{
        paddingTop:180
    },
    raisedButton: {
        margin:22,
    }
}