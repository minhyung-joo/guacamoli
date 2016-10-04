import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {imageUrlMapper} from '../constants/Utility';


export default class RankingItem extends React.Component {
    render() {
        const food = this.props.food;
        return (
            <Row md={12} style={styles.rankingItemStyle}>
                <Col md={1} style={styles.defaultStyle}>{food.rank}</Col>
                <Col md={3}><img src={imageUrlMapper(food.picture_url)} style={styles.rankingDetailStyle} height="100%" width="100%"/></Col>
                <Col md={6}>
                    <p style={styles.rankingDetailStyle}><b>{food.name}</b></p>
                    <p style={styles.rankingDetailStyle}>{food.price + "HKD"}</p>
                </Col>
            </Row>
        );
    }
};

const styles = {
    defaultStyle:{
        fontSize:25, color:'black'
    },
    rankingDetailStyle:{
        margin:0, padding:0, color:'black'
    },
    rankingItemStyle:{
        marginTop:20
    }
};