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
    toggleSearchButton,
    inputSearchQuery, submitSearchQuery
} from '../actions/uiActions';

var axios = require('axios');
const muiTheme = getMuiTheme(guacamoliTheme);

class HomePage extends React.Component {
    render() {
        const {isShowFilterModal, isAdvancedFilter, showModalFilter, hideModalFilter, clickAdvancedFilter, inputSearchQuery, submitSearchQuery} = this.props;
        function _handleKeyPress(e) {
            if (e.key === 'Enter') {
                submitSearchQuery();
            }
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.homeDiv}>
                    <NavigationComponent />
                    <Row>
                        <Col md={12} style={styles.greeting}>
                            <p style={styles.greetingMessage}>Nutritionalize HKUST</p>
                            <p style={styles.sloganMessage}>Use Guacamoli | Become Healthy</p>
                        </Col>
                        {
                            this.props.isSearch?
                                <Col mdOffset={2} md={8}>
                                    <input type="text" className="form-control" onChange={(event)=>inputSearchQuery(event.target.value)} onKeyPress={(event)=>_handleKeyPress(event)} style={styles.queryInput} placeholder="Search"/>
                                </Col>
                                :null
                        }
                        <Col mdOffset={5} xsOffset={4}>
                            <FloatingActionButton secondary={true} style={styles.filterButton} onClick={showModalFilter}>
                                <FilterList />
                            </FloatingActionButton>
                            <FloatingActionButton secondary={true} style={styles.filterButton} onClick={this.props.toggleSearchButton}>
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
        toggleSearchButton,
        inputSearchQuery, submitSearchQuery
    }
)(HomePage)

/**
 * styles
 */

const styles = {
    homeDiv:{
        backgroundImage: 'url(' + homeBackgroundImage + ')',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    greeting:{
        textAlign: 'center',
        color: 'white',
        marginTop:80
    },
    greetingMessage:{
        fontSize: 60, fontWeight: 'bold', marginTop:20
    },
    sloganMessage:{
        fontSize: 20, fontWeight: 'bold', marginTop:20
    },
    queryInput:{
        height: 40, marginTop:20
    },
    filterButton:{
        margin: 10,
        marginTop:20,
        backgroundColor:'#1B5E20'
    }
}