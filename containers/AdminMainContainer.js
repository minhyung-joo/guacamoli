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

class AdminMainContainer extends React.Component {
    render () {
        return (
            <div>
                <Row>
                    <Col mdOffset={1} md={10} style={styles.container}>
                        <Col md={3}>
                            <Panel header="LG1" bsStyle="success">
                                <LinkContainer to="/lg1/menu_insert/1">
                                    <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                                <LinkContainer to="/lg1/menu_list/1">
                                    <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="APC" bsStyle="success">
                                <LinkContainer to="/apc/menu_insert/4">
                                    <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                                <LinkContainer to="/apc/menu_list/4">
                                    <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="GRB" bsStyle="success">
                                <LinkContainer to="/grb/menu_insert/3">
                                    <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                                <LinkContainer to="/grb/menu_list/3">
                                    <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="Milano" bsStyle="success">
                                <LinkContainer to="/milano/menu_insert/5">
                                    <RaisedButton label="Add Menu 添加菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                                <LinkContainer to="/milano/menu_list/5">
                                    <RaisedButton label="Show Menu 顯示菜單" primary={true} style={styles.raisedButton} />
                                </LinkContainer>
                            </Panel>
                        </Col>

                    </Col>
                </Row>
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