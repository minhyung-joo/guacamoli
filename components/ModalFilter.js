import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';

import {DefaultSearchOption, AdvancedSearchOption} from './ModalFilterOptions';


export default class ModalFilter extends React.Component {
    render() {
        const {isShow, onHide, isAdvancedFilter, onClickAdvanced} = this.props;
        return (
            <div>
                <Modal show={isShow} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter Search</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <DefaultSearchOption />
                        {
                            isAdvancedFilter?<AdvancedSearchOption />:null
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={onClickAdvanced}>{isAdvancedFilter?'Default Search':'Advanced Search'}</Button>
                        <Button bsStyle="success">Search</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}