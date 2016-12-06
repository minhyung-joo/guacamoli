import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import NavigationDrawer from './NavigationDrawer';
import {toggleNavDrawer} from '../actions/uiActions';
import {resetUserData} from '../actions/userAction';
import {firebaseApp, firebaseConfig} from '../firebase_init';

class NavigationComponent extends React.Component {
    render() {
        const {
            toggleNavDrawer
        } = this.props;

        var _logoutFunction = () => {
            // Logout from Faebook
            this.props.resetUserData();
            firebaseApp.auth().signOut().then(function() {
                // Sign-out successful.
                // Clear store
                var firebaseKey = firebaseConfig.apiKey;
                // Clear local storage
                localStorage.removeItem("firebase:authUser:"+firebaseKey+":[DEFAULT]");
                // Redirect to welcome
                hashHistory.push('/welcome/');
            }, function(error) {
                // An error happened.
                console.error(error);
            });
        }

        return (
            <div>
                <AppBar style={styles.mainAppbar} onLeftIconButtonTouchTap={toggleNavDrawer} iconElementRight={<FlatButton label="LOGOUT" onTouchTap={_logoutFunction} />}/>
                <NavigationDrawer/>
            </div>
        )
    }
}

export default connect(
    state => ({
    }),
    {
        toggleNavDrawer, resetUserData
    }
)(NavigationComponent)


const styles = {
    mainAppbar:{
        backgroundColor:'#424242'
    }
}