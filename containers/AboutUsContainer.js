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

                <Panel header='Guacamoli Team'>
                    <p>Guacamoli was made possible by three founding members who dedicated a lot of time and effort in making of the website: </p>

                    <ul>
                        <li><b>Jaeook Lee</b> (GBUS) - Project Manager</li>
                        <li><b>Nayeon Lee</b> (CSE) - Front-end Developer</li>
                        <li><b>Hongjoon Choi</b> (CSE) - Back-end Developer</li>
                    </ul>

                    <p> The Guacamoli Project was supported by our highly motivated team members: </p>
                    <ul>
                        <li><b>Harin Lee</b> (MECH)</li>
                        <li><b>Hyunjong Min</b> (ECOF)</li>
                        <li><b>Jiyong Kim</b> (ECON)</li>
                        <li><b>Katy Park</b> (BBA)</li>
                        <li><b>See Gyeong Moon</b> (BBA)</li>
                        <li><b>Yunhee Ji</b> (CBME)</li>
                        <li><b>So Yeon Kang</b> (GCS)</li>
                    </ul>
                </Panel>

                <Panel header="Acknowledgements">
                    <p>Sincere thanks to individuals who kindly assisted our project:</p>
                    <p><b>Mr. Alex Yiu</b> and <b>Mr. Keith Chan</b> from itsc, for technical support in webpage creation and server issues, </p>
                    <p><b>Mr. Stanley</b> from CSO, for providing insights and connecting us to canteen managers, </p>
                    <p><b>Ms. Windy </b> (APC), <b>Mr. Jack</b> (Milano), <b>Mr. Simon </b> (Maxim), and <b>Mr. Tai</b> (GRB) for canteen support,</p>
                    <p><b>Mr. Shek</b> (CMZ) for support in photoshoots including lending lighting equipments,</p>
                    <p><b>Prof. Emily Nason</b> for generous support in advice and connection,</p>
                    <p><b>Mr. Kelvin Leung</b> (GBUS) for all the translations for his poor foreign friend,</p>
                    <p>Last, but definitely not least,</p>
                    <p><b>Mr. Gavin Kwok</b> and <b>Ms. Jenny Leung</b> from DAO for all the support in the making of Guacamoli with HKUST 25 Projects, funds, connections, videos, and many more.</p>
                </Panel>
            </div>
        );
    }
}
