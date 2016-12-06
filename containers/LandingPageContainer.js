/**
 * Created by nylee on 1/12/2016.
 */
import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {guacamoliTheme} from '../constants/guacamoliTheme';

import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';
import {homeBackgroundImage} from '../constants/ImageHandler';

import RaisedButton from 'material-ui/RaisedButton';

var axios = require('axios');
const muiTheme = getMuiTheme(guacamoliTheme);

import {firebaseApp, firebaseConfig} from '../firebase_init';
import * as firebase from 'firebase';

import {setUserData} from '../actions/userAction';

class LandingPage extends React.Component {

    render() {
        // Check if User is Logged in
        this.props.setUserData();
        if (this.props.user) {
            hashHistory.push('/home/');
        }

        var _loginFunction = () => {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebaseApp.auth().signInWithRedirect(provider);
            hashHistory.push('/loading/');
        };

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.homeDiv}>
                    <Row>
                        <Col md={12} style={styles.greeting}>
                            <p style={styles.greetingMessage}>Nutritionalize HKUST</p>
                            <p style={styles.sloganMessage}>Use Guacamoli | Become Healthy</p>
                            <RaisedButton label="Login" secondary={true} style={styles.button} onClick={_loginFunction}/>
                        </Col>
                    </Row>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(
    state => ({
        user: state.users.user,
    }),
    {
        setUserData
    }
)(LandingPage)

const styles = {
    homeDiv:{
        backgroundImage: 'url(' + homeBackgroundImage + ')',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    greeting:{
        textAlign: 'center',
        color: 'white',
        marginTop:140
    },
    greetingMessage:{
        fontSize: 60, fontWeight: 'bold', marginTop:20
    },
    sloganMessage:{
        fontSize: 20, fontWeight: 'bold', marginTop:20
    },
    button:{
        margin: 12,
    }
}