import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {stepperChangeIndex, stepperHandlePrev, stepperHandleNext} from '../actions/uiActions';

class AboutUsContainer extends React.Component {
    componentWillUnmount(){
        this.props.stepperChangeIndex(0);
    }

    renderStepActions(step, handlePrev, handleNext) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label="Next"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {
            stepIndex,
            stepperChangeIndex, stepperHandlePrev, stepperHandleNext,
        } = this.props;

        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <Stepper
                    activeStep={stepIndex}
                    linear={false}
                    orientation="vertical"
                >
                    <Step>
                        <StepButton onTouchTap={() => stepperChangeIndex(0)}>
                            What is Guacamoli
                        </StepButton>
                        <StepContent>
                            <p>
                                Guacamoli is a student project sponsored by <i>HKUST 25 Projects</i>, an effort made by University to promote student life quality in celebration of its 25th anniversary.
                            </p>
                            <p>The team name ‘Guacamoli’ was inspired by a popular Mexican cuisine called guacamole, which is not only tasty—but also healthy.</p>
                            <p>Namely, we wish to bring a healthy and tasty life style to our fellow UST students and staffs by promoting awareness of what we eat at University. </p>
                            {this.renderStepActions(0,stepperHandlePrev,stepperHandleNext)}
                        </StepContent>
                    </Step>

                    <Step>
                        <StepButton onTouchTap={() => stepperChangeIndex(1)}>
                            What We Want
                        </StepButton>
                        <StepContent>
                            <p>We want to <i> nutritionalize UST </i></p>
                            <p>While food constitutes a big part of our University life, only minority of people take time to know more about what they eat every day. Guacamoli will be the first to facilitate such movement.</p>
                            <ul>
                                <li>We want people to eat tasty and healthy food.</li>
                                <li>We aim to act as information provider to facilitate USTers to make better food choices.</li>
                                <li>We want easier communication between students and canteens.</li>
                            </ul>
                            <p>Guacamoli will be a platform, where students can actively give feedbacks on menus, and where canteens can use the platform to improve their services and marketing.</p>
                            {this.renderStepActions(1,stepperHandlePrev,stepperHandleNext)}
                        </StepContent>
                    </Step>

                    <Step>
                        <StepButton onTouchTap={() => stepperChangeIndex(2)}>
                            How We Do It
                        </StepButton>
                        <StepContent>
                            <p>We provide:</p>
                            <ul>
                                <li>photos for every single menu for easier recognition of the food. <font style={{fontSize:10}}>People previously confused by menu names directly translated from Chinese (i.e. Shanghai Grandma Style Pork) can check the photos to see if a menu would fit their preference.</font></li>
                                <li>ingredient information for vegetarians and people allergic to certain ingredients</li>
                                <li>food information of any new menus - we aim provide most up-to-date information</li>
                                <li>nutrition information of each menus (in preparation)</li>
                            </ul>
                            <p style={{color:'red', fontSize:9}}>*disclaimer: information provided in the website may not be up-to-date due to seasonal nature of canteen menu updates, price increase, etc. Information is not completely error-free as all the information was manually inserted. Vegetarians or people with allergies may use the website as a reference, but are advised to double check themselves.</p>
                            {this.renderStepActions(2,stepperHandlePrev,stepperHandleNext)}
                        </StepContent>
                    </Step>

                    <Step>
                        <StepButton onTouchTap={() => stepperChangeIndex(3)}>
                            Guacamoli Team
                        </StepButton>
                        <StepContent>
                            <p>Guacamoli was made possible by three founding members who dedicated a lot of time and effort in making of the website: </p>

                            <ul>
                                <li><b>Jaeook Lee</b> (GBUS) - Project Lead</li>
                                <li><b>Nayeon Lee</b> (CSE) - Front-end Developer</li>
                                <li><b>Hongjoon Choi</b> (CSE) - Back-end Developer</li>
                            </ul>

                            <p> The Guacamoli Project was supported by our highly motivated team members: </p>
                            <ul>
                                <li><b>Harin Lee</b> (MECH)</li>
                                <li><b>Hyunjong Min</b> (ECOF)</li>
                                <li><b>Jiyong Kim</b> (ECON)</li>
                                <li><b>Katy Park</b> (BBA)</li>
                                <li><b>Seo Gyeong Moon</b> (BBA)</li>
                                <li><b>Yunhee Ji</b> (CBME)</li>
                                <li><b>So Yeon Kang</b> (GCS)</li>
                            </ul>
                            {this.renderStepActions(3,stepperHandlePrev,stepperHandleNext)}
                        </StepContent>
                    </Step>

                    <Step>
                        <StepButton onTouchTap={() => stepperChangeIndex(4)}>
                            Acknowledgements
                        </StepButton>
                        <StepContent>
                            <p>Sincere thanks to individuals who kindly assisted our project:</p>
                            <ul>
                                <li><b>Mr. Alex Yiu</b> and <b>Mr. Keith Chan</b> from itsc, for technical support in webpage creation and server issues, </li>
                                <li><b>Mr. Stanley</b> from CSO, for providing insights and connecting us to canteen managers, </li>
                                <li><b>Ms. Windy </b> (APC), <b>Mr. Jack</b> (Milano), <b>Mr. Simon </b> (Maxim), and <b>Mr. Tai</b> (GRB) for canteen support,</li>
                                <li><b>Mr. Shek</b> (CMZ) for support in photoshoots including lending lighting equipments,</li>
                                <li><b>Prof. Emily Nason</b> for generous support in advice and connection,</li>
                                <li><b>Mr. Kelvin Leung</b> (GBUS) for all the translations for his poor foreign friend,</li>
                                <li><b>Mr. Gavin Kwok</b> and <b>Ms. Jenny Leung</b> from DAO for all the support in the making of Guacamoli with HKUST 25 Projects, funds, connections, videos, and many more.</li>
                            </ul>
                            {this.renderStepActions(4,stepperHandlePrev,stepperHandleNext)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default connect(
    states => ({
        stepIndex: states.uiStates.stepIndex,
    }),
    {
        stepperChangeIndex, stepperHandlePrev, stepperHandleNext
    }
)(AboutUsContainer)