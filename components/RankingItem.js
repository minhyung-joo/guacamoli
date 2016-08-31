import React from 'react';
import {Row,Col} from 'react-bootstrap';

export default class RankingItem extends React.Component {
    render() {
        const food = this.props.food;
        return (
            <Row md={12}>
                <Col md={1} style={food.rank==1? rank1Style: food.rank==2? rank2Style: food.rank==3? rank3Style: defaultStyle}>{food.rank}</Col>
                <Col md={3}><img src={food.imageUrl} style={rankingDetailStyle} height="100%" width="100%"/></Col>
                <Col md={8}>
                    <p style={rankingDetailStyle}><b>{food.foodName}</b></p>
                    <p style={rankingDetailStyle}>{food.price + "HKD"}</p>
                </Col>
            </Row>
        );
    }
};

const rank1Style = {fontSize:35, color:'red'};
const rank2Style = {fontSize:30, color:'orange'};
const rank3Style = {fontSize:25, color:'#5f7b1b'};
const defaultStyle = {fontSize:25, color:'black'};
const rankingDetailStyle = {margin:0, padding:0};