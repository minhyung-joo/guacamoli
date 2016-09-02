import React from 'react';
import {Row,Col} from 'react-bootstrap';

export default class RankingItem extends React.Component {
    render() {
        const food = this.props.food;
        return (
            <Row md={12} style={rankingItemStyle}>
                <Col md={1} style={defaultStyle}>{food.rank}</Col>
                <Col md={3}><img src={food.imageUrl} style={rankingDetailStyle} height="100%" width="100%"/></Col>
                <Col md={8}>
                    <p style={rankingDetailStyle}><b>{food.foodName}</b></p>
                    <p style={rankingDetailStyle}>{food.price + "HKD"}</p>
                </Col>
            </Row>
        );
    }
};

const defaultStyle = {fontSize:25, color:'black'};
const rankingDetailStyle = {margin:0, padding:0, color:'black'};
const rankingItemStyle = {marginTop:20};