import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';

import NavigationDrawer from './NavigationDrawer';
import {toggleNavDrawer} from '../actions/uiActions';

class NavigationComponent extends React.Component {
    render() {
        const {
            toggleNavDrawer
        } = this.props;

        return (
            <div>
                <AppBar style={styles.mainAppbar} onLeftIconButtonTouchTap={toggleNavDrawer}/>
                <NavigationDrawer/>
            </div>
        )
    }
}

export default connect(
    state => ({
    }),
    {
        toggleNavDrawer
    }
)(NavigationComponent)


const styles = {
    mainAppbar:{
        backgroundColor:'#424242'
    }
}