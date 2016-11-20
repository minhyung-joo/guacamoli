import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect} from 'react-router'

import Appp from './components/Appp';
import HomeContainer from './containers/HomeContainer';
import CanteenPage from './containers/CanteenContainer';
import RankingContainer from './containers/RankingContainer';
import AboutUsContainer from './containers/AboutUsContainer';
import FoodDetailContainer from './containers/FoodDetailContainer';
import SearchResultContainer from './containers/SearchResultContainer';
import AdminMenuListContainer from './containers/AdminMenuListContainer';
import AdminMenuInsertContainer from './containers/AdminMenuInsertContainer';

import {restaurantList} from './constants/StaticData';

function canteenNameToIdMapping(canteenName){
    return restaurantList.indexOf(canteenName);
}

const NotFound = () => (
    <h1>404.. This page is not found!</h1>);

const NoPermission = () => (
    <h1>You have no permission to access this page</h1>
)

const lg1CanteenWrapper = () => (
    <CanteenPage canteenType={canteenNameToIdMapping('LG1')}/>
);
const apcCanteenWrapper = () => (
    <CanteenPage canteenType={canteenNameToIdMapping('APC')}/>
);
const grbCanteenWrapper = () => (
    <CanteenPage canteenType={canteenNameToIdMapping('GRB')}/>
);
const milanoCanteenWrapper = () => (
    <CanteenPage canteenType={canteenNameToIdMapping('Milano')}/>
);

function authentication(nextState, replace){
    const correctPwd = 'correct';
    var attempt = 0;

    var pwd = prompt("Please enter password");
    while(attempt <3){
        var pwd = prompt("Oops! Wrong password. Please try entering password again.");
        if (pwd == correctPwd) {
            console.log("correct");
            return;
        }
        attempt=attempt+1;
    }
    replace('/error');
}

export default (
    <Route path='/'>
        <IndexRedirect to='home'/>
        <Route path='home' components={HomeContainer}/>
        <Route path='' component={Appp}>
            <Route path='ranking' component={RankingContainer} />
            <Route path='canteens'>
                <Route path='lg1' component={lg1CanteenWrapper} />
                <Route path='apc' component={apcCanteenWrapper} />
                <Route path='grb' component={grbCanteenWrapper} />
                <Route path='milano' component={milanoCanteenWrapper} />
            </Route>
            <Route path='about' component={AboutUsContainer} />
            <Route path='food/:foodid' component={FoodDetailContainer}/>
            <Route path='searchResult/:query' component={SearchResultContainer} />
            <Route path='filterResult/' component={SearchResultContainer} />
            <Route path='admin/list' component={AdminMenuListContainer} onEnter={authentication}/>
            <Route path='admin/insert' component={AdminMenuInsertContainer} />
            <Route path='error' component={NoPermission} />
            <Route path='*' component={NotFound} />
        </Route>
    </Route>
)