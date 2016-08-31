import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';

export default class ModalFoodDetail extends React.Component {
    render() {
        const {} = this.props;

        return (
            <div>
                <Modal show={isShow} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter Search</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>lalalalaal</p>
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