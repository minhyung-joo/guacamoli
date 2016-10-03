import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {Pagination} from 'react-bootstrap';

export default class PaginationBar extends React.Component {
    render() {
        const activePage = 1;

        function handleSelect(eventKey) {
            // this.setState({
            //     activePage: eventKey
            // });
        }

        return (
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={20}
                maxButtons={5}
                activePage={activePage}
                onSelect={()=>handleSelect()} />
        );
    }
}
