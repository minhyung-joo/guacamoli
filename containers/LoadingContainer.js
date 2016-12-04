/**
 * Created by nylee on 1/12/2016.
 */
import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router'

import {firebaseApp, firebaseConfig} from '../firebase_init';

class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // this.props.getUserData();
        if (!this.props.user) {
            firebaseApp.auth().getRedirectResult().then(function(result) {
                //this.setState({isLoading: false});
                console.log(result);
                var user = result.user;
                if (user) {
                    hashHistory.push('/home/');
                }
            })
            .catch(function(error) {
                console.error(error);
            });
        }
        else {
            hashHistory.push('/home/');
        }


        return (
            <p>Loading....</p>
        );
    }
}

export default connect(
    state => ({
        user: state.users.user,
    }),
    {
        // getUserData
    }
)(LoadingPage)