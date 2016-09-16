import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {guacamoliTheme} from '../constants/guacamoliTheme';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import Search from 'material-ui/svg-icons/action/search';

import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';
import {homeBackgroundImage} from '../constants/ImageHandler';
import NavigationComponent from '../components/NavigationBar';
import DialogFilter from '../components/DialogFilter';
import {showModalFilter, hideModalFilter, clickAdvancedFilter,
    toggleSearchButton} from '../actions/uiActions';

var axios = require('axios');
const muiTheme = getMuiTheme(guacamoliTheme);

class HomePage extends React.Component {
    render() {
        const {isShowFilterModal, isAdvancedFilter, showModalFilter, hideModalFilter, clickAdvancedFilter} = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={homeDivStyle}>
                    <NavigationComponent />
                    <Row>
                        <Col md={12} style={greetingStyle}>
                            <p style={greetingMessage}>Nutritionalize HKUST</p>
                            <p style={sloganMessage}>Use Guacamoli, Become Healthy</p>
                        </Col>
                        {
                            this.props.isSearch?
                                <Col mdOffset={2} md={8}>
                                    <input type="text" className="form-control" style={queryInputStyle} placeholder="Search"/>
                                </Col>
                                :null
                        }
                        <Col mdOffset={5} xsOffset={4}>
                            <FloatingActionButton secondary={true} style={filterButtonStyle} onClick={showModalFilter}>
                                <FilterList />
                            </FloatingActionButton>
                            <FloatingActionButton secondary={true} style={filterButtonStyle} onClick={this.props.toggleSearchButton}>
                                <Search />
                            </FloatingActionButton>
                        </Col>
                    </Row>
                    <DialogFilter isShow={isShowFilterModal} onHide={hideModalFilter} isAdvancedFilter={isAdvancedFilter} onClickAdvanced={clickAdvancedFilter}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(
    state => ({
        isShowFilterModal: state.uiStates.isShowFilterModal,
        isAdvancedFilter: state.uiStates.isAdvancedFilter,
        isSearch: state.uiStates.isSearch,
        isFilter: state.uiStates.isFilter
    }),
    {
        showModalFilter, hideModalFilter, clickAdvancedFilter,
        toggleSearchButton
    }
)(HomePage)

/**
 * styles
 */
const homeDivStyle = {
    backgroundImage: 'url(' + homeBackgroundImage + ')',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const greetingStyle = {
    textAlign: 'center',
    color: 'white',
    marginTop:80
};

const greetingMessage = {fontSize: 60, fontWeight: 'bold', marginTop:20};
const sloganMessage = {fontSize: 20, fontWeight: 'bold', marginTop:20};

const queryInputStyle = {
    height: 40, marginTop:20
};
const filterButtonStyle = {
    margin: 10,
    marginTop:20
};