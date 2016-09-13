import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {logoImage} from '../constants/ImageHandler';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';



export default class NavigationComponent extends React.Component{
    // handleTouchTap() {
    //     alert('onTouchTap triggered on the title component');
    // }
    //
    // render(){
    //     return(
    //         <div>
    //             <AppBar
    //             title={<span>Title</span>}
    //             onTitleTouchTap={this.handleTouchTap}
    //             iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    //             iconElementRight={<FlatButton label="Save" />}
    //             />
    //             <Drawer open={this.state.open}>
    //                 <MenuItem>Menu Item</MenuItem>
    //                 <MenuItem>Menu Item 2</MenuItem>
    //             </Drawer>
    //         </div>
    //
    //     )
    // }

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
    }
}

const logoStyle = {display:'inline-block', height:20};