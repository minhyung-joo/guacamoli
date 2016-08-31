import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';
import {homeBackgroundImage} from '../constants/ImageHandler';
import NavigationComponent from '../components/NavigationBar';
import ModalFilter from '../components/ModalFilter';
import {showModalFilter, hideModalFilter, clickAdvancedFilter} from '../actions/modalActions';

class HomePage extends React.Component {
    render() {
        const {isShowFilterModal, isAdvancedFilter, showModalFilter, hideModalFilter, clickAdvancedFilter} = this.props;
        return (
                <div style={homeDivStyle}>
                    <NavigationComponent />
                    <Row>
                        <Col md={12} style={greetingStyle}>
                            <p style={greetingMessage}>Nutritionalize HKUST</p>
                            <p style={sloganMessage}>Use Guacamoli, Become Healthy</p>
                        </Col>
                        <Col mdOffset={2} md={8}>
                            <input type="text" className="form-control" style={queryInputStyle} placeholder="Search"/>
                        </Col>
                        <Col mdOffset={5} md={1}>
                            <Button style={filterButtonStyle} onClick={showModalFilter}>Filter</Button>
                        </Col>
                    </Row>
                    <ModalFilter isShow={isShowFilterModal} onHide={hideModalFilter} isAdvancedFilter={isAdvancedFilter} onClickAdvanced={clickAdvancedFilter}/>
                </div>
        );
    }
}

export default connect(
    state => ({
        isShowFilterModal: state.modal.isShowFilterModal,
        isAdvancedFilter: state.modal.isAdvancedFilter
    }),
    {
        showModalFilter, hideModalFilter,
        clickAdvancedFilter
    }
)(HomePage)

/**
 * filters
 */
const homeDivStyle = {
    backgroundImage: 'url(' + homeBackgroundImage + ')',
    backgroundSize: 'cover',
    height: 650,
    fontWeight: 'bold'
};

const greetingStyle = {
    textAlign: 'center',
    color: 'white',
    marginTop:80
};

const greetingMessage = {fontSize: 60};
const sloganMessage = {fontSize: 20};

const queryInputStyle = {
    height: 40
};
const filterButtonStyle = {
    textAlign: 'center',
    marginTop: 10,
    // backgroundColor:'#5f7b1b',
    // borderColor:'#5f7b1b',
    color: '#5f7b1b',
    fontWeight: 'bold',
    width: '100%'
};