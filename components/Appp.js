import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import NavigationComponent from './NavigationBar.js';


export default function App({children}){
    return (
        <div>
            <NavigationComponent />
            <div style={containerDivStyle}>
                {children}
            </div>
        </div>
    )
}


const containerDivStyle = {
    margin:20
};