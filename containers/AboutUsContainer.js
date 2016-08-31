import React from 'react';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';
import {whatIsGuacamoli, whatWeWant} from '../constants/AboutUsDescriptions'

export default class AboutUsContainer extends React.Component {
    render () {
        return (
            <div>
                <Panel header='What is Guacamoli' bsStyle="success">
                    {whatIsGuacamoli}
                </Panel>

                <Panel header='What we want'>
                    {whatWeWant}
                </Panel>
            </div>
        );
    }
}
