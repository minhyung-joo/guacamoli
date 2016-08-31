import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect} from 'react-router'

import Appp from './components/Appp';
import HomeContainer from './containers/HomeContainer';
import CanteenPage from './containers/CanteenContainer';
import RankingContainer from './containers/RankingContainer';
import AboutUsContainer from './containers/AboutUsContainer';
import FoodDetailContainer from './containers/FoodDetailContainer';

const NotFound = () => (
    <h1>404.. This page is not found!</h1>);

const lg1CanteenWrapper = () => (
    <CanteenPage canteenType='lg1'/>
);
const apcCanteenWrapper = () => (
    <CanteenPage canteenType='apc'/>
);
const grbCanteenWrapper = () => (
    <CanteenPage canteenType='grb'/>
);
const milanoCanteenWrapper = () => (
    <CanteenPage canteenType='milano'/>
);

export default (
    <Route path='/'>
        <IndexRedirect to='home'/>
        <Route path='home' components={HomeContainer}/>
        <Route path='' component={Appp}>
            <Route path='ranking' component={RankingContainer} />
            <Route path='canteens'>
                <Route path='lg1' component={lg1CanteenWrapper} testing='lala'/>
                <Route path='apc' component={apcCanteenWrapper} />
                <Route path='grb' component={grbCanteenWrapper} />
                <Route path='milano' component={milanoCanteenWrapper} />
            </Route>
            <Route path='about' component={AboutUsContainer} />
            <Route path='food/:foodid' component={FoodDetailContainer}/>
            <Route path='*' component={NotFound} />
        </Route>
    </Route>
)