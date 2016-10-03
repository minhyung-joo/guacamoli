import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Pagination,Col} from 'react-bootstrap';

export default class PaginationBar extends React.Component {
    render() {
        const {activePage, lastPage, onClickHandler}= this.props;

        function handleSelect(eventKey, callback) {
            callback(eventKey);
        }

        return (
            <Col mdOffset={4}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={lastPage}
                    maxButtons={5}
                    activePage={activePage}
                    onSelect={(eventKey)=>handleSelect(eventKey, onClickHandler)} />
            </Col>
        );
    }
}
