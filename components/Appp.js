import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import NavigationComponent from './NavigationBar.js';

export default function App({children}){
    return (
        <MuiThemeProvider>
        <div>
            <NavigationComponent />
            <div style={containerDivStyle}>
                {children}
            </div>
        </div>
        </MuiThemeProvider>
    )
}

const containerDivStyle = {
    margin:20
};