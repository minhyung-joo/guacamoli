import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {logoImage} from '../constants/ImageHandler';


export default class NavigationComponent extends React.Component{
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