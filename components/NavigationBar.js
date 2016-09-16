import React from 'react';
// import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {logoImage} from '../constants/ImageHandler';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Ranking from 'material-ui/svg-icons/editor/format-list-numbered';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import ArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import Info from 'material-ui/svg-icons/action/info-outline';

import {toggleNavDrawer,clickCanteenListButton} from '../actions/uiActions';

class NavigationComponent extends React.Component {
    render() {
        const {
            isShowDrawer,isShowCanteenList,
            toggleNavDrawer, clickCanteenListButton
        } = this.props;

        return (
            <div>
                <AppBar onLeftIconButtonTouchTap={toggleNavDrawer}/>
                <Drawer open={isShowDrawer} docked={false} onRequestChange={toggleNavDrawer}>
                    <LinkContainer to="/home">
                        <AppBar title="Guacamoli" iconElementLeft={<img src={logoImage} onTouchTap={toggleNavDrawer} style={logoStyle}/>} />
                    </LinkContainer>
                    <LinkContainer to="/ranking">
                        <MenuItem primaryText="Ranking" leftIcon={<Ranking/>} onTouchTap={toggleNavDrawer}/>
                    </LinkContainer>
                    <MenuItem primaryText="Canteens" leftIcon={<Restaurant/>} onTouchTap={clickCanteenListButton} rightIcon={isShowCanteenList? <ExpandLess /> : <ExpandMore/>}/>
                    {
                        isShowCanteenList?
                            <Menu>
                                <LinkContainer to="/canteens/lg1">
                                    <MenuItem primaryText="LG1 - Maxims" leftIcon={<ArrowRight/>} onTouchTap={clickCanteenListButton} insetChildren={true}/>
                                </LinkContainer>
                                <LinkContainer to="/canteens/apc">
                                    <MenuItem primaryText="LG7 - APC" leftIcon={<ArrowRight/>} onTouchTap={clickCanteenListButton} insetChildren={true}/>
                                </LinkContainer>
                                <LinkContainer to="/canteens/grb">
                                    <MenuItem primaryText="LG7 - GRB" leftIcon={<ArrowRight/>} onTouchTap={clickCanteenListButton} insetChildren={true}/>
                                </LinkContainer>
                                <LinkContainer to="/canteens/milano">
                                    <MenuItem primaryText="LG7 - Milano" leftIcon={<ArrowRight/>} onTouchTap={clickCanteenListButton} insetChildren={true}/>
                                </LinkContainer>
                            </Menu>
                            :null
                    }

                    <LinkContainer to="/about">
                        <MenuItem primaryText="About Us" leftIcon={<Info/>} onTouchTap={toggleNavDrawer}/>
                    </LinkContainer>
                </Drawer>
            </div>
        )
    }
}

export default connect(
    state => ({
        isShowDrawer: state.uiStates.isShowDrawer,
        isShowCanteenList: state.uiStates.isShowCanteenList
    }),
    {
        toggleNavDrawer,clickCanteenListButton
    }
)(NavigationComponent)

const logoStyle = {display: 'inline-block', height: 40};