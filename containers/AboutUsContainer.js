import React from 'react';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';
import {whatIsGuacamoli, whatWeWant, howWeDoIt} from '../constants/AboutUsDescriptions'

export default class AboutUsContainer extends React.Component {
    render () {
        return (
            <div>
                <Panel header='What is Guacamoli'>
                    {whatIsGuacamoli}
                </Panel>

                <Panel header='What we want'>
                    {whatWeWant}
                </Panel>

                <Panel header='How we do it'>
                    {howWeDoIt}
                </Panel>
            </div>
        );
    }
}
