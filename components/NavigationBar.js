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
                        <MenuItem onTouchTap={toggleNavDrawer}>Home</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/ranking">
                        <MenuItem onTouchTap={toggleNavDrawer}>Ranking</MenuItem>
                    </LinkContainer>
                    <MenuItem primaryText="Canteens" onTouchTap={clickCanteenListButton} rightIcon={isShowCanteenList? <ExpandLess /> : <ExpandMore/>}/>
                    {
                        isShowCanteenList?
                            <Menu>
                                <LinkContainer to="/canteens/lg1">
                                    <MenuItem primaryText="LG1 - Maxims" insetChildren={true}/>
                                </LinkContainer>
                                <LinkContainer to="/canteens/apc">
                                    <MenuItem primaryText="LG7 - APC" insetChildren={true}/>
                                </LinkContainer>
                                <LinkContainer to="/canteens/grb">
                                    <MenuItem primaryText="LG7 - GRB" insetChildren={true}/>
                                </LinkContainer>
                                <LinkContainer to="/canteens/milano">
                                    <MenuItem primaryText="LG7 - Milano" insetChildren={true}/>
                                </LinkContainer>
                            </Menu>
                            :null
                    }

                    <LinkContainer to="/about">
                        <MenuItem onTouchTap={toggleNavDrawer}>About Us</MenuItem>
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

const logoStyle = {display: 'inline-block', height: 20};
/*

 render() {
 return (
 <Navbar inverse>
 <Navbar.Header>
 <LinkContainer to="/">
 <Navbar.Brand><img src={logoImage} style={logoStyle}/> Guacamoli</Navbar.Brand>
 </LinkContainer>
 </Navbar.Header>

 <Nav pullRight>
 <LinkContainer to="/home">
 <NavItem eventKey={1}>Home</NavItem>
 </LinkContainer>
 <LinkContainer to="/ranking">
 <NavItem eventKey={2}>Ranking</NavItem>
 </LinkContainer>
 <NavDropdown eventKey={3} title="Canteens" id="basic-nav-dropdown">
 <LinkContainer to="/canteens/lg1">
 <MenuItem eventKey={3.1}>LG1</MenuItem>
 </LinkContainer>
 <LinkContainer to="/canteens/apc">
 <MenuItem eventKey={3.2}>LG7 - APC</MenuItem>
 </LinkContainer>
 <LinkContainer to="/canteens/grb">
 <MenuItem eventKey={3.3}>LG7 - GRB</MenuItem>
 </LinkContainer>
 <LinkContainer to="/canteens/milano">
 <MenuItem eventKey={3.4}>LG7 - Milano</MenuItem>
 </LinkContainer>
 </NavDropdown>
 <LinkContainer to="/about">
 <MenuItem eventKey={4}>About Us</MenuItem>
 </LinkContainer>
 </Nav>
 </Navbar>
 );
 }*/
