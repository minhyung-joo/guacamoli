import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect} from 'react-router'

import Appp from './components/Appp';
import HomeContainer from './containers/HomeContainer';
import LandingPage from './containers/LandingPageContainer';
import CanteenPage from './containers/CanteenContainer';
import RankingContainer from './containers/RankingContainer';
import AboutUsContainer from './containers/AboutUsContainer';
import FoodDetailContainer from './containers/FoodDetailContainer';
import SearchResultContainer from './containers/SearchResultContainer';
import AdminMenuListContainer from './containers/AdminMenuListContainer';
import AdminMenuInsertContainer from './containers/AdminMenuInsertContainer';
import AdminMenuUpdateContainer from './containers/AdminMenuUpdateContainer';
import AdminMainContainer from './containers/AdminMainContainer';
import LoadingContainer from './containers/LoadingContainer';

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

// function lg1Authentication(nextState, replace){
//     errorCheckingAndRouting('lg1', replace);
// }
// function apcAuthentication(nextState, replace){
//     errorCheckingAndRouting('apc', replace);
// }
// function grbAuthentication(nextState, replace){
//     errorCheckingAndRouting('grb', replace);
// }
// function milanoAuthentication(nextState, replace){
//     errorCheckingAndRouting('milano', replace);
// }

function errorCheckingAndRouting(pwd, replace){
    const correctPwd = pwd;
    var attempt = 0;

    while(attempt <3){
        var pwd;
        if(attempt==0)
            pwd = prompt("Please enter password");
        else
            pwd = prompt("Oops! Wrong password. Please try entering password again.");

        if (pwd == correctPwd) {
            return;
        }
        attempt=attempt+1;
    }
    replace('/error');
}

export default (
    <Route path='/'>
        <IndexRedirect to='welcome'/>
        <Route path='home' components={HomeContainer}/>
        <Route path='welcome' components={LandingPage}/>
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
            <Route path='admin' component={AdminMainContainer} />

            {/*<Route path='lg1' onEnter={lg1Authentication}>*/}
            <Route path='lg1'>
                <Route path='menu_list/:canteenid' component={AdminMenuListContainer}/>
                <Route path='menu_insert/:canteenid' component={AdminMenuInsertContainer} />
                <Route path='menu_update/:foodid' component={AdminMenuUpdateContainer}/>
            </Route>
            {/*<Route path='apc' onEnter={apcAuthentication}>*/}
            <Route path='apc'>
                <Route path='menu_list/:canteenid' component={AdminMenuListContainer}/>
                <Route path='menu_insert/:canteenid' component={AdminMenuInsertContainer} />
                <Route path='menu_update/:foodid' component={AdminMenuUpdateContainer}/>
            </Route>
            {/*<Route path='grb' onEnter={grbAuthentication}>*/}
            <Route path='grb'>
                <Route path='menu_list/:canteenid' component={AdminMenuListContainer}/>
                <Route path='menu_insert/:canteenid' component={AdminMenuInsertContainer} />
                <Route path='menu_update/:foodid' component={AdminMenuUpdateContainer}/>
            </Route>
            {/*<Route path='milano' onEnter={milanoAuthentication}>*/}
            <Route path='milano'>
                <Route path='menu_list/:canteenid' component={AdminMenuListContainer}/>
                <Route path='menu_insert/:canteenid' component={AdminMenuInsertContainer} />
                <Route path='menu_update/:foodid' component={AdminMenuUpdateContainer}/>
            </Route>

            <Route path='error' component={NoPermission} />
            <Route path='loading' component={LoadingContainer} />
            <Route path='*' component={NotFound} />
        </Route>
    </Route>
)